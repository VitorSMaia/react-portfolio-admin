import ProjectCard from '@/components/public/ProjectCard';
import { getProjects } from '@/services/mockData';

export default function ProjectsPage() {
    const projects = getProjects();
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="mb-12 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-px bg-cyan-500 w-12" />
                    <h1 className="text-4xl font-mono font-bold text-slate-100 tracking-tight">
                        SYSTEM_ARCHIVE
                    </h1>
                </div>
                <p className="font-mono text-cyan-500/70 text-sm ml-16">
                    [DIR: /root/projects] LOADED {projects.length} ITEMS_
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
