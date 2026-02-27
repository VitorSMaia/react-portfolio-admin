import ProjectCard from '@/components/public/ProjectCard';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await projectService.getAll();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <div className="bg-background-light min-h-screen">
            <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 px-4 border-l-4 border-primary">
                        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2 text-slate-900">
                            // SYSTEM_ARCHIVE
                        </h1>
                        <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                            [DIR: /root/projects] LOADED{' '}
                            {loading ? '...' : `${projects.length} ITEMS_`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center text-primary font-mono text-sm animate-pulse">
                            [SCANNING_FILESYSTEM] PLEASE WAIT...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, idx) => (
                                <ProjectCard key={project.id} project={project} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
