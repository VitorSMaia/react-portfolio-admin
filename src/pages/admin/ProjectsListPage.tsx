import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { getProjects, saveProjects } from '@/services/mockData';
import { useState } from 'react';
import type { Project } from '@/types';

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>(() => getProjects());

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            const newProjects = projects.filter((p) => p.id !== id);
            setProjects(newProjects);
            saveProjects(newProjects);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                <Link
                    to="/admin/projects/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> Add New
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Project</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Tech Stack</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-12 h-12 rounded object-cover bg-slate-100"
                                        />
                                        <div>
                                            <div className="font-medium text-slate-900">{project.title}</div>
                                            <div className="text-sm text-slate-500 truncate max-w-xs">
                                                {project.description}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                                title="View Live"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                        <Link
                                            to={`/admin/projects/${project.id}/edit`}
                                            className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
