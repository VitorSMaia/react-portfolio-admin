import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getSkills, saveSkills } from '@/services/mockData';
import { useState, useEffect } from 'react';
import type { Skill } from '@/types';
import SkillBadge from '@/components/public/SkillBadge';

export default function SkillsListPage() {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        setSkills(getSkills());
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            const newSkills = skills.filter((s) => s.id !== id);
            setSkills(newSkills);
            saveSkills(newSkills);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Skills</h1>
                <Link
                    to="/admin/skills/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> Add New
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Skill Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Proficiency</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {skills.map((skill) => (
                            <tr key={skill.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{skill.name}</td>
                                <td className="px-6 py-4">
                                    <span className="capitalize px-2 py-1 bg-slate-100 rounded text-sm text-slate-600">
                                        {skill.category.replace('-', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-full max-w-xs">
                                        <SkillBadge skill={skill} />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            to={`/ admin / skills / ${skill.id}/edit`}
                                            className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </Link >
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div >
                                </td >
                            </tr >
                        ))}
                    </tbody >
                </table >
            </div >
        </div >
    );
}
