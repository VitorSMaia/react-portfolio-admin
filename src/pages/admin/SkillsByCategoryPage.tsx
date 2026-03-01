import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Loader2, Tags } from 'lucide-react';
import { skillService } from '@/services/skillService';
import { skillCategoryService } from '@/services/skillCategoryService';
import type { Skill, SkillCategory } from '@/types/skill';
import SkillBadge from '@/components/public/SkillBadge';
import { Edit2, Trash2 } from 'lucide-react';

export default function SkillsByCategoryPage() {
    const { id: categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState<SkillCategory | null>(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        if (!categoryId) return;
        try {
            setLoading(true);
            // Load category info
            const categories = await skillCategoryService.getCategories();
            const foundCategory = categories.find(c => c.id === categoryId);
            if (foundCategory) {
                setCategory(foundCategory);
            }

            // Load skills and filter manually for now or use a filtered service call if available
            const allSkills = await skillService.getSkills();
            const filteredSkills = allSkills.filter(s => s.category_id === categoryId);
            setSkills(filteredSkills);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    }, [categoryId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        try {
            await skillService.deleteSkill(id);
            setSkills(skills.filter(s => s.id !== id));
        } catch (error) {
            console.error('Failed to delete skill:', error);
            alert('Failed to delete skill');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => navigate('/admin/skill-categories')}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <Tags className="text-indigo-500" />
                        Skills: {category?.label_pt || 'Categoria'}
                    </h1>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
                        Gerenciando habilidades da categoria <span className="text-indigo-400">{category?.key}</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-end mb-6">
                <Link
                    to="/admin/skills/new"
                    state={{ defaultCategoryId: categoryId }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 font-bold text-sm tracking-wide uppercase"
                >
                    <Plus size={18} /> Adicionar Skill
                </Link>
            </div>

            <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden text-slate-300">
                <table className="w-full text-left">
                    <thead className="bg-[#1e293b] text-slate-400 font-mono text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Nome</th>
                            <th className="px-6 py-4 font-semibold">Proficiência</th>
                            <th className="px-6 py-4 font-semibold text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {skills.map((skill) => (
                            <tr key={skill.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-200">{skill.name}</td>
                                <td className="px-6 py-4">
                                    <SkillBadge skill={skill} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            to={`/admin/skills/${skill.id}/edit`}
                                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Edit2 size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {skills.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-mono italic">
                                    Nenhuma skill encontrada nesta categoria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
