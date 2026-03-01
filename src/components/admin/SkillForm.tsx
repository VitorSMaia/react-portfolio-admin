import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import { skillService } from '@/services/skillService';
import { skillCategoryService } from '@/services/skillCategoryService';
import type { SkillInput, SkillCategory } from '@/types/skill';

export default function SkillForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<SkillCategory[]>([]);

    const { register, handleSubmit, reset } = useForm<SkillInput>();

    const loadData = useCallback(async () => {
        try {
            setFetching(true);
            const [categoriesData, skillsData] = await Promise.all([
                skillCategoryService.getCategories(),
                isEditing && id ? skillService.getSkills() : Promise.resolve([])
            ]);

            setCategories(categoriesData);

            if (isEditing && id) {
                const skill = skillsData.find(s => s.id === id);
                if (skill) {
                    reset(skill);
                } else {
                    setError('Skill not found');
                }
            }
        } catch (err) {
            setError('Failed to load form data');
            console.error(err);
        } finally {
            setFetching(false);
        }
    }, [id, isEditing, reset]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const onSubmit = async (data: SkillInput) => {
        try {
            setLoading(true);
            setError(null);

            // Find selected category to set the string 'category' field for legacy support
            const selectedCategory = categories.find(c => c.id === data.category_id);
            const payload = {
                ...data,
                category: selectedCategory?.label || data.category,
                proficiency: Number(data.proficiency)
            };

            if (isEditing && id) {
                await skillService.updateSkill(id, payload);
            } else {
                await skillService.createSkill(payload);
            }

            navigate('/admin/skills');
        } catch (err) {
            console.error('Failed to save skill', err);
            setError('Failed to save skill. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-8 shadow-lg">
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Skill Name</label>
                    <input
                        {...register('name', { required: true })}
                        className="w-full bg-[#1e293b] text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="e.g. React"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Category</label>
                        <select
                            {...register('category_id', { required: true })}
                            className="w-full bg-[#1e293b] text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Select a category...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Proficiency (0-100)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            {...register('proficiency', { required: true, min: 0, max: 100 })}
                            className="w-full bg-[#1e293b] text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/skills')}
                        className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-400 font-bold text-sm tracking-wide hover:bg-slate-800 transition-colors uppercase"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold text-sm tracking-wide hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {isEditing ? 'Update Skill' : 'Create Skill'}
                    </button>
                </div>
            </form>
        </div>
    );
}
