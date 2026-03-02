import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types';

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description_en: z.string().min(1, 'Description (EN) is required'),
    description_pt: z.string().min(1, 'Description (PT) is required'),
    imageUrl: z.string().url('Invalid image URL'),
    createdAt: z.string().optional(),
    demoUrl: z.string().url('Invalid demo URL').optional().or(z.literal('')),
    githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    technologiesString: z.string().min(1, 'At least one technology is required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectEditPage() {
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
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const loadProject = useCallback(async (projectId: string) => {
        try {
            setIsLoading(true);
            const project = await projectService.getById(projectId);
            if (project) {
                reset({
                    ...project,
                    technologiesString: project.technologies.join(', '),
                });
            }
        } catch (error) {
            console.error('Failed to load project:', error)
            alert('Failed to load project details');
            navigate('/admin/projects');
        } finally {
            setIsLoading(false);
        }
    }, [navigate, reset]);

    useEffect(() => {
        if (isEditing && id) {
            loadProject(id);
        }
    }, [id, loadProject, isEditing]);

    const onSubmit = async (data: ProjectFormData) => {
        try {
            setIsSaving(true);
            const technologies = data.technologiesString
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);

            // Prepare the project object for submission
            const projectToSubmitBase = {
                title: data.title,
                description: data.description_en, // Main description field required by type Omit<Project, 'id' | 'createdAt'>
                description_en: data.description_en,
                description_pt: data.description_pt,
                imageUrl: data.imageUrl,
                createdAt: data.createdAt,
                demoUrl: data.demoUrl || undefined,
                githubUrl: data.githubUrl || undefined,
                technologies,
            };

            if (isEditing && id) {
                await projectService.update(id, projectToSubmitBase);
            } else {
                await projectService.create(projectToSubmitBase as Omit<Project, 'id' | 'createdAt'>);
            }
            navigate('/admin/projects');
        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Failed to save project');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

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
                                {...register('title')}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="Project Name"
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                        </div>

                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description (EN)</label>
                                <textarea
                                    {...register('description_en')}
                                    rows={4}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.description_en ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                    placeholder="Project description in English..."
                                />
                                {errors.description_en && <p className="text-xs text-red-500 mt-1">{errors.description_en.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição (PT)</label>
                                <textarea
                                    {...register('description_pt')}
                                    rows={4}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.description_pt ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                    placeholder="Descrição do projeto em Português..."
                                />
                                {errors.description_pt && <p className="text-xs text-red-500 mt-1">{errors.description_pt.message}</p>}
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                            <input
                                {...register('imageUrl')}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.imageUrl ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="https://..."
                            />
                            {errors.imageUrl && <p className="text-xs text-red-500 mt-1">{errors.imageUrl.message}</p>}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Created At</label>
                            <input
                                type="date"
                                {...register('createdAt')}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Demo URL</label>
                            <input
                                {...register('demoUrl')}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.demoUrl ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="https://..."
                            />
                            {errors.demoUrl && <p className="text-xs text-red-500 mt-1">{errors.demoUrl.message}</p>}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">GitHub URL</label>
                            <input
                                {...register('githubUrl')}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.githubUrl ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="https://github.com/..."
                            />
                            {errors.githubUrl && <p className="text-xs text-red-500 mt-1">{errors.githubUrl.message}</p>}
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Technologies (comma separated)</label>
                            <input
                                {...register('technologiesString')}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.technologiesString ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="React, TypeScript, Tailwind CSS"
                            />
                            {errors.technologiesString && <p className="text-xs text-red-500 mt-1">{errors.technologiesString.message}</p>}
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
                            disabled={isSaving}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {isSaving ? 'Saving...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
