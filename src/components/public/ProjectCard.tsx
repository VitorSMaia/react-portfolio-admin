import type { Project } from '@/types';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative bg-[#0f172a]/50 border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="aspect-video w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-cyan-900/20 z-10 group-hover:bg-transparent transition-colors" />
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-white mb-4 text-center px-4">{project.title}</h3>
                <div className="flex gap-4">
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-cyan-400 transition-colors bg-white/5 px-4 py-2 hover:bg-cyan-500/10 w-full justify-center"
                        >
                            <ExternalLink size={14} /> DEMO
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 hover:bg-white/10 w-full justify-center"
                        >
                            <Github size={14} /> SOURCE
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
