import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getProjects, saveProjects } from '@/services/mockData';
import type { Project } from '@/types';

// Extended type for the form to handle comma-separated string for technologies
interface ProjectForm extends Omit<Project, 'technologies'> {
    technologiesString: string;
}

export default function ProjectEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const { register, handleSubmit, reset } = useForm<ProjectForm>();

    useEffect(() => {
        if (isEditing && id) {
            const projects = getProjects();
            const project = projects.find((p) => p.id === id);
            if (project) {
                reset({
                    ...project,
                    technologiesString: project.technologies.join(', '),
                });
            }
        }
    }, [id, isEditing, reset]);

    const onSubmit = (data: ProjectForm) => {
        const projectData: Project = {
            ...data,
            id: isEditing && id ? id : crypto.randomUUID(), // simple ID generation
            technologies: data.technologiesString.split(',').map((t) => t.trim()).filter(Boolean),
            createdAt: data.createdAt || new Date().toISOString().split('T')[0],
        };
        // Remove the temporary string field
        // @ts-ignore
        delete projectData.technologiesString;

        const projects = getProjects();
        let newProjects;
        if (isEditing) {
            newProjects = projects.map(p => p.id === id ? projectData : p);
        } else {
            newProjects = [...projects, projectData];
        }
        saveProjects(newProjects);

        navigate('/admin/projects');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/projects')}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditing ? 'Edit Project' : 'New Project'}
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                            <input
                                {...register('title', { required: true })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Project Name"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                {...register('description', { required: true })}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Project description..."
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                            <input
                                {...register('imageUrl', { required: true })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Created At</label>
                            <input
                                type="date"
                                {...register('createdAt', { required: true })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Demo URL</label>
                            <input
                                {...register('demoUrl')}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">GitHub URL</label>
                            <input
                                {...register('githubUrl')}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Technologies (comma separated)</label>
                            <input
                                {...register('technologiesString')}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="React, TypeScript, Tailwind CSS"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/projects')}
                            className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Save size={18} />
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
