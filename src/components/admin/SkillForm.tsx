
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import { skillService } from '@/services/skillService';
import type { Skill, SkillInput } from '@/types/skill';

export default function SkillForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset } = useForm<SkillInput>();

    useEffect(() => {
        if (isEditing && id) {
            const loadSkill = async () => {
                try {
                    const skills = await skillService.getSkills();
                    const skill = skills.find(s => s.id === id);
                    if (skill) {
                        reset(skill);
                    } else {
                        setError('Skill not found');
                    }
                } catch (err) {
                    setError('Failed to load skill details');
                    console.error(err);
                } finally {
                    setFetching(false);
                }
            };
            loadSkill();
        }
    }, [id, isEditing, reset]);

    const onSubmit = async (data: SkillInput) => {
        try {
            setLoading(true);
            setError(null);

            // Ensure numbers
            const payload = {
                ...data,
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
                            {...register('category', { required: true })}
                            className="w-full bg-[#1e293b] text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all appearance-none"
                        >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="tools">Tools</option>
                            <option value="soft-skills">Soft Skills</option>
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
