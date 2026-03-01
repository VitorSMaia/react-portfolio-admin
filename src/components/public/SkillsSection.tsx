import { useEffect, useState } from 'react';
import type { Skill, SkillCategory } from '@/types/skill';
import { skillCategoryService } from '@/services/skillCategoryService';
import { useLanguage } from '@/context/LanguageContextCore';

interface SkillsSectionProps {
    skills: Skill[];
    loading: boolean;
}

export default function SkillsSection({ loading: skillsLoading }: SkillsSectionProps) {
    const { lang } = useLanguage();
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [catsLoading, setCatsLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await skillCategoryService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to load categories:', error);
            } finally {
                setCatsLoading(false);
            }
        };
        loadCategories();
    }, []);

    const isLoading = skillsLoading || catsLoading;

    return (
        <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-background-light">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12 sm:mb-20">
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-4 text-slate-900 font-display">
                        {lang === 'pt'
                            ? ('// ENGENHARIA DE SOLUÇÕES')
                            : ('// SOLUTIONS ENGINEERING')}
                    </h2>
                    <div className="w-32 h-1 bg-primary mx-auto mb-4" />
                    <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                        {lang === 'pt' ? 'Matriz de habilidades calibrada para o stack 2025' : 'Modular skill matrix calibrated for 2025 tech stack'}
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center text-primary font-mono text-sm animate-pulse py-16">
                        {lang === 'pt' ? '[CALIBRANDO_MATRIZ] ACESSANDO_BANCO...' : '[CALIBRATING_SKILL_MATRIX] ACCESSING_DATABASE...'}
                    </div>
                ) : (
                    <div className="">
                        {/* Left — category description cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="col-span-1 p-6 bg-white border border-slate-200 border-r-4 rounded-lg shadow-sm hover:scale-105 transition-all duration-300"
                                >
                                    <h3 className={`font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${cat.color || 'text-primary'}`}>
                                        <span className="material-symbols-outlined">{cat.icon || 'star'}</span>
                                        {lang === 'pt'
                                            ? (cat.label_pt || '')
                                            : (cat.label_en || '')}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {lang === 'pt'
                                            ? (cat.description_pt || '')
                                            : (cat.description_en || '')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
