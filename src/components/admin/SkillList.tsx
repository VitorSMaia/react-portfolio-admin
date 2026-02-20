
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { skillService } from '@/services/skillService';
import type { Skill } from '@/types/skill';
import SkillBadge from '@/components/public/SkillBadge';

export default function SkillList() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            setLoading(true);
            const data = await skillService.getSkills();
            setSkills(data);
        } catch (err) {
            setError('Failed to load skills');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            await skillService.deleteSkill(id);
            setSkills(skills.filter(s => s.id !== id));
        } catch (err) {
            console.error('Failed to delete skill', err);
            alert('Failed to delete skill');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
            </div>
        );
    }

    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden text-slate-300">
            <table className="w-full text-left">
                <thead className="bg-[#1e293b] text-slate-400 font-mono text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4 font-semibold">Skill Name</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Proficiency</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {skills.map((skill) => (
                        <tr key={skill.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-200">{skill.name}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-mono uppercase border ${skill.category === 'frontend' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                        skill.category === 'backend' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            skill.category === 'tools' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {skill.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <SkillBadge skill={skill} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        to={`/admin/skills/${skill.id}/edit`}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {skills.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-mono">
                                NO SKILLS FOUND. INITIATE NEW SKILL PROTOCOL.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
