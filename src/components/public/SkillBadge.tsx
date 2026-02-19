import type { Skill } from '@/types';
import { cn } from '@/utils/cn';

interface SkillBadgeProps {
    skill: Skill;
    className?: string;
}

export default function SkillBadge({ skill, className }: SkillBadgeProps) {
    // Map categories to colors for tech theme
    const colors = {
        frontend: 'bg-cyan-500',
        backend: 'bg-purple-500',
        tools: 'bg-emerald-500',
        'soft-skills': 'bg-yellow-500',
    };

    const activeColor = colors[skill.category] || 'bg-slate-500';

    return (
        <div className={cn("w-full group", className)}>
            <div className="flex justify-between items-end mb-1">
                <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    {skill.name.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                    {skill.proficiency}%
                </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800/50 rounded-sm overflow-hidden border border-white/5">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out relative", activeColor)}
                    style={{ width: `${skill.proficiency}%` }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/50 shadow-[0_0_5px_white]" />
                </div>
            </div>
        </div>
    );
}
