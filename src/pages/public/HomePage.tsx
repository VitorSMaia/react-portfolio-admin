import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/public/HeroSection';
import ProjectCard from '@/components/public/ProjectCard';
import SkillsSection from '@/components/public/SkillsSection';
import ContactForm from '@/components/public/ContactForm';
import { projectService } from '@/services/projectService';
import { skillService } from '@/services/skillService';
import type { Project } from '@/types';
import type { Skill } from '@/types/skill';
import { useLanguage } from '@/context/LanguageContextCore';

export default function HomePage() {
    const { lang } = useLanguage();
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loadingSkills, setLoadingSkills] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoadingProjects(true);
            setLoadingSkills(true);
            try {
                const [allProjects, allSkills] = await Promise.all([
                    projectService.getAll(),
                    skillService.getSkills(),
                ]);
                setFeaturedProjects(allProjects.slice(0, 3));
                setSkills(allSkills);
            } catch (error) {
                console.error('Error loading data', error);
            } finally {
                setLoadingProjects(false);
                setLoadingSkills(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="bg-background-light">
            {/* ── Hero ────────────────────────────── */}
            <HeroSection />

            {/* ── Featured Projects ───────────────── */}
            <section id="projects" className="py-24 px-6 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16 px-4 border-l-4 border-primary">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-slate-900">
                               {lang === 'pt' ? '// PROJETOS EM DESTAQUE' : '// FEATURED PROJECTS'}
                            </h2>
                            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                                {lang === 'pt' ? 'Repositórios descriptografados do ciclo atual' : 'Decrypted repositories from current cycle'}
                            </p>
                        </div>
                        <Link
                            to="/projects"
                            className="hidden md:block text-primary text-sm font-mono animate-pulse hover:no-underline"
                        >
                            {lang === 'pt' ? 'DIGITALIZANDO O BANCO DE DADOS...' : 'SCANNING_DATABASE...'}
                        </Link>
                    </div>

                    {loadingProjects ? (
                        <div className="py-20 text-center text-primary font-mono text-sm animate-pulse">
                            { lang === 'pt' ? '[DIGITALIZANDO O BANCO DE DADOS...] AGUARDE...' : '[SCANNING_FILESYSTEM] PLEASE WAIT...'}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProjects.map((project, idx) => (
                                <ProjectCard key={project.id} project={project} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Skills ──────────────────────────── */}
            <SkillsSection skills={skills} loading={loadingSkills} />

            {/* ── Contact ─────────────────────────── */}
            <section id="contact" className="py-24 px-6 bg-slate-100 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-slate-900">
                            {lang === 'pt' ? 'INICIAR_CONTATO' : 'INITIATE_CONTACT'}
                        </h2>
                        <p className="text-slate-500 font-mono text-sm uppercase">
                            {lang === 'pt' ? 'Canal seguro de ponta a ponta' : 'Secure end-to-end encrypted channel'}
                        </p>
                    </div>
                    <ContactForm />
                </div>
                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </section>
        </div>
    );
}
