import type { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

const BADGES = [
    { label: 'LIVE', color: 'bg-primary/80' },
    { label: 'BETA', color: 'bg-accent-cyan/80' },
    { label: 'STABLE', color: 'bg-primary/80' },
];

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const badge = BADGES[index % BADGES.length];

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 transition-all hover:border-slate-400 hover:shadow-xl">
            {/* Image */}
            <div className="h-48 bg-slate-800 relative overflow-hidden">
                {project.imageUrl ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${project.imageUrl}')` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                    <span
                        className={`${badge.color} backdrop-blur-md text-[10px] text-white px-2 py-1 rounded font-bold uppercase tracking-widest`}
                    >
                        {badge.label}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors tracking-tight text-slate-900">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                    {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="text-[10px] bg-slate-900 border border-slate-700 text-accent-cyan px-2 py-1 rounded font-mono"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all text-slate-700"
                        >
                            Access Source{' '}
                            <span className="material-symbols-outlined text-sm">lock_open</span>
                        </a>
                    )}
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-accent-cyan hover:bg-cyan-700 text-white border border-accent-cyan py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                        >
                            Live Demo{' '}
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                    )}
                    {!project.githubUrl && !project.demoUrl && (
                        <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all text-slate-700">
                            Access Source{' '}
                            <span className="material-symbols-outlined text-sm">lock_open</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
