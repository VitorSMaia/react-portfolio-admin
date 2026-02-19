import { ArrowRight, Download, Terminal, Cpu, Globe, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/public/ProjectCard';
import SkillBadge from '@/components/public/SkillBadge';
import { getProjects, getSkills } from '@/services/mockData';

export default function HomePage() {
    const featuredProjects = getProjects().slice(0, 3);
    const skills = getSkills();
    const categories = ['frontend', 'backend', 'tools', 'soft-skills'] as const;

    return (
        <div className="flex flex-col gap-24 pb-20">
            {/* Hero Section - Terminal Style */}
            <section className="container mx-auto px-6 h-[calc(100vh-80px)] flex flex-col justify-center">
                <div className="w-full max-w-3xl bg-[#0f172a]/90 border border-slate-700 rounded-lg shadow-2xl backdrop-blur-sm overflow-hidden animate-fade-in-up">
                    {/* Terminal Header */}
                    <div className="bg-slate-800/80 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="ml-4 text-xs font-mono text-slate-400">visitor@portfolio: ~ /init_introduction.sh</div>
                    </div>
                    {/* Terminal Body */}
                    <div className="p-8 font-mono">
                        <div className="text-cyan-400 mb-2">
                            {'>'} INITIALIZING SYSTEM...
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-4 tracking-tight">
                            I BUILD SCALABLE <br />
                            ARCHITECTURES<span className="animate-blink">_</span>
                        </h1>
                        <div className="text-slate-400 mb-8 border-l-2 border-slate-700 pl-4 py-2">
                            [Status: ONLINE] <br />
                            Senior Software Engineer specialized in high-frequency
                            neural interfaces, distributed cloud systems, and encrypted data tunnels.
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/projects"
                                className="px-6 py-3 bg-cyan-500 text-[#020617] font-bold text-sm tracking-wider hover:bg-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            >
                                VIEW_SOURCE_LOG
                            </Link>
                            <button className="px-6 py-3 border border-slate-600 text-slate-300 font-bold text-sm tracking-wider hover:bg-white/5 transition-all flex items-center gap-2">
                                <Download size={18} /> DOWNLOAD_MANIFEST
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-3xl font-mono font-bold text-slate-100 mb-2">
                            // PROJECT_ARCHIVE
                        </h2>
                        <p className="font-mono text-sm text-cyan-500">SELECTED REPOSITORIES FROM CURRENT CYCLE</p>
                    </div>
                    <Link to="/projects" className="hidden md:flex font-mono text-xs text-slate-500 hover:text-cyan-400 items-center gap-1 group">
                        SCANNING_DATABASE...
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>

            {/* Core Capabilities */}
            <section id="skills" className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-mono font-bold text-slate-100 mb-2">
                        // CORE_CAPABILITIES
                    </h2>
                    <p className="font-mono text-sm text-cyan-500">MODULAR SKILL MATRIX CALIBRATED FOR 2024 TECH STACK</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div key={category} className="bg-[#0f172a]/50 p-6 border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <div className="flex items-center gap-3 mb-6">
                                {category === 'frontend' && <Globe className="text-cyan-400" />}
                                {category === 'backend' && <Database className="text-purple-400" />}
                                {category === 'tools' && <Cpu className="text-emerald-400" />}
                                {category === 'soft-skills' && <Terminal className="text-yellow-400" />}
                                <h3 className="font-mono uppercase font-bold text-slate-200 text-lg">
                                    {category.replace('-', '_')}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {skills
                                    .filter((skill) => skill.category === category)
                                    .map((skill) => (
                                        <SkillBadge key={skill.id} skill={skill} />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl font-mono font-bold text-slate-100 mb-8">
                    INITIATE_CONTACT
                </h2>
                <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-mono font-bold text-lg tracking-widest hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all"
                >
                    SECURE END-TO-END ENCRYPTED CHANNEL
                    <ArrowRight size={20} />
                </Link>
            </section>
        </div>
    );
}

