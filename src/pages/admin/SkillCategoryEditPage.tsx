import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, Tags } from 'lucide-react';
import { skillCategoryService } from '@/services/skillCategoryService';
import type { SkillCategoryInput } from '@/types/skill';

const categorySchema = z.object({
    key: z.string().min(2, 'Slug muito curto').regex(/^[a-z0-9-]+$/, 'Use apenas letras minúsculas, números e hífens'),
    label_en: z.string().min(2, 'Nome em inglês muito curto'),
    label_pt: z.string().min(2, 'Nome em português muito curto'),
    description_en: z.string().optional(),
    description_pt: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function SkillCategoryEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    });

    const loadCategory = useCallback(async (categoryId: string) => {
        try {
            setIsLoading(true);
            const data = await skillCategoryService.getCategories();
            const category = data.find(c => c.id === categoryId);
            if (category) {
                reset({
                    key: category.key,
                    label_en: category.label_en,
                    label_pt: category.label_pt,
                    description_en: category.description_en || '',
                    description_pt: category.description_pt || '',
                    icon: category.icon || '',
                    color: category.color || '',
                });
            }
        } catch (error) {
            console.error('Failed to load category:', error);
            navigate('/admin/skill-categories');
        } finally {
            setIsLoading(false);
        }
    }, [navigate, reset]);

    useEffect(() => {
        if (isEditing && id) {
            loadCategory(id);
        }
    }, [id, loadCategory, isEditing]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            setIsSaving(true);
            if (isEditing && id) {
                await skillCategoryService.updateCategory(id, data);
            } else {
                await skillCategoryService.createCategory(data as SkillCategoryInput);
            }
            navigate('/admin/skill-categories');
        } catch (error) {
            console.error('Failed to save category:', error);
            alert('Failed to save category');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/skill-categories')}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <Tags className="text-indigo-500" />
                    {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
                </h1>
            </div>

            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Label (EN)</label>
                            <input
                                {...register('label_en')}
                                className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="ex: Frontend Tech"
                            />
                            {errors.label_en && <p className="mt-1 text-red-500 text-[10px] font-mono">{errors.label_en.message}</p>}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Label (PT)</label>
                            <input
                                {...register('label_pt')}
                                className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="ex: Tecnologias Frontend"
                            />
                            {errors.label_pt && <p className="mt-1 text-red-500 text-[10px] font-mono">{errors.label_pt.message}</p>}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Category_Slug (unique_key)</label>
                            <input
                                {...register('key')}
                                className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 font-mono"
                                placeholder="ex: frontend-tech"
                            />
                            {errors.key && <p className="mt-1 text-red-500 text-[10px] font-mono">{errors.key.message}</p>}
                        </div>

                        <div className="col-span-2 text-indigo-400">
                            <p className="text-[10px] font-mono uppercase italic">Note: The slug is used for system identification and internal routing.</p>
                        </div>

                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Description (EN)</label>
                                <textarea
                                    {...register('description_en')}
                                    rows={4}
                                    className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Describe in English..."
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Descrição (PT)</label>
                                <textarea
                                    {...register('description_pt')}
                                    rows={4}
                                    className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Descreva em Português..."
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Icon_Ref (Lucide/Material)</label>
                            <input
                                {...register('icon')}
                                className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="ex: data_object"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">Color_Class (Tailwind)</label>
                            <input
                                {...register('color')}
                                className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 font-mono"
                                placeholder="ex: text-accent-cyan"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/skill-categories')}
                            className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-8 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {isSaving ? 'Salvando...' : 'Salvar Categoria'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
