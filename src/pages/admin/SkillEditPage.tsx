import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getSkills, saveSkills } from '@/services/mockData';
import type { Skill } from '@/types';

export default function SkillEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const { register, handleSubmit, reset } = useForm<Skill>();

    useEffect(() => {
        if (isEditing && id) {
            const skills = getSkills();
            const skill = skills.find((s) => s.id === id);
            if (skill) {
                reset(skill);
            }
        }
    }, [id, isEditing, reset]);

    const onSubmit = (data: Skill) => {
        const skillData: Skill = {
            ...data,
            // ensure number type for proficiency
            proficiency: Number(data.proficiency),
            id: isEditing && id ? id : crypto.randomUUID(),
        };

        const skills = getSkills();
        let newSkills;
        if (isEditing) {
            newSkills = skills.map(s => s.id === id ? skillData : s);
        } else {
            newSkills = [...skills, skillData];
        }
        saveSkills(newSkills);

        navigate('/admin/skills');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/skills')}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditing ? 'Edit Skill' : 'New Skill'}
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Skill Name</label>
                        <input
                            {...register('name', { required: true })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. React"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                            {...register('category', { required: true })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="tools">Tools</option>
                            <option value="soft-skills">Soft Skills</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Proficiency (0-100)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            {...register('proficiency', { required: true, min: 0, max: 100 })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/skills')}
                            className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Save size={18} />
                            Save Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
