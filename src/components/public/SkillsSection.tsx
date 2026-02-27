import type { Skill } from '@/types/skill';

interface SkillsSectionProps {
    skills: Skill[];
    loading: boolean;
}

const categories = [
    {
        key: 'frontend',
        label: 'FRONTEND_TECH',
        icon: 'data_object',
        color: 'text-accent-cyan',
        description:
            'Desenvolvimento de interfaces reativas e de alta fidelidade utilizando Tailwind CSS, Alpine.js e Blade, com implementações especializadas em Three.js para visualização de dados.',
    },
    {
        key: 'backend',
        label: 'BACKEND_ARCH',
        icon: 'dns',
        color: 'text-primary',
        description:
            'Arquitetura de sistemas robustos com ecossistema Laravel, orquestração de microsserviços em Node.js e automações/scripts em Python para processamento de dados.',
    },
    {
        key: 'tools',
        label: 'DEVOPS_SEC',
        icon: 'security',
        color: 'text-purple-500',
        description:
            'Provisionamento de infraestrutura escalável com Terraform e automação completa de pipelines de CI/CD via GitHub Actions, para deploys resilientes e seguros.',
    },
];


export default function SkillsSection({ loading }: SkillsSectionProps) {
    return (
        <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-background-light">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12 sm:mb-20">
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-4 text-slate-900 font-display">
                        // CORE_CAPABILITIES
                    </h2>
                    <div className="w-32 h-1 bg-primary mx-auto mb-4" />
                    <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                        Modular skill matrix calibrated for 2024 tech stack
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-primary font-mono text-sm animate-pulse py-16">
                        [CALIBRATING_SKILL_MATRIX] ACCESSING_DATABASE...
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
                        {/* Left — category description cards */}
                        <div className="flex-1 space-y-8">
                            {categories.map((cat) => (
                                <div
                                    key={cat.key}
                                    className="p-6 bg-white border border-slate-200 border-r-4 rounded-lg shadow-sm"
                                >
                                    <h3 className={`font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${cat.color}`}>
                                        <span className="material-symbols-outlined">{cat.icon}</span>
                                        {cat.label}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{cat.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Right — hex grid */}
                        
                    </div>
                )}
            </div>
        </section>
    );
}
