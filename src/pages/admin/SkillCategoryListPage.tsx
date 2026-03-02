import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Tags, Edit, Trash2 } from 'lucide-react';
import { skillCategoryService } from '@/services/skillCategoryService';
import type { SkillCategory } from '@/types/skill';
import DynamicTable from '@/components/admin/DynamicTable';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export default function SkillCategoryListPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const loadCategories = useCallback(async () => {
        try {
            setLoading(true);
            const data = await skillCategoryService.getCategories();
            setCategories(data);
            setTotal(data.length);
        } catch (error) {
            console.error('Failed to load categories:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await skillCategoryService.deleteCategory(id);
            loadCategories();
        } catch (error) {
            console.error('Failed to delete category:', error);
            alert('Failed to delete category');
        }
    };

    const columns = [
        {
            label: 'Categoria',
            field: 'label_pt',
            view: ({ value, item }: { value: unknown; item: SkillCategory }) => {
                const IconComponent = (Icons as unknown as Record<string, LucideIcon>)[item.icon || 'Tags'] || Icons.Tags;
                return (
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-[#1e293b] border border-slate-700/50 ${item.color || 'text-indigo-400'}`}>
                            <IconComponent size={18} />
                        </div>
                        <div>
                            <div className="font-bold text-white tracking-tight">{value as string}</div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.key}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            label: 'Descrição',
            field: 'description_pt',
            view: ({ value }: { value: unknown }) => (
                <span className="text-xs text-slate-400 max-w-xs block truncate leading-relaxed font-medium">
                    {value as string || 'Sem descrição.'}
                </span>
            )
        },
        {
            label: 'Ações',
            field: 'id',
            view: ({ value }: { value: unknown }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(`/admin/skill-categories/${value}/skills`)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20"
                    >
                        <Icons.Layers size={14} />
                        Gerenciar Skills
                    </button>
                    <button
                        onClick={() => navigate(`/admin/skill-categories/edit/${value}`)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
                        title="Editar"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(value as string)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                        title="Excluir"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <Tags className="text-indigo-500" />
                        Categorias de Skills
                    </h1>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
                        Gestão de taxonomia técnica
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/skill-categories/new')}
                    className="bg-white hover:bg-slate-200 text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-white/5 active:scale-95"
                >
                    <Plus size={18} />
                    Nova Categoria
                </button>
            </div>

            <DynamicTable
                data={categories}
                columns={columns}
                loading={loading}
                total={total}
                searchPlaceholder="Filtrar categorias..."
            />
        </div>
    );
}
