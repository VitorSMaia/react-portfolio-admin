import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden bg-background-light">
            {/* Radial gradient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,72,229,0.08),transparent_70%)] pointer-events-none" />

            <div className="w-full max-w-4xl relative z-20">
                <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    {/* Terminal Header Bar */}
                    <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center justify-between overflow-x-auto">
                        <div className="flex gap-2">
                            <div className="size-3 rounded-full bg-red-500/50" />
                            <div className="size-3 rounded-full bg-yellow-500/50" />
                            <div className="size-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            session_main: bash --zsh
                        </div>
                        <div className="size-3" />
                    </div>

                    {/* Terminal Content */}
                    <div className="p-5 sm:p-8 font-mono space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-slate-800 font-bold">visitor@dv_portfolio:~$</span>
                            <span className="text-slate-400">./init_introduction.sh</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight text-slate-900 uppercase">
                                <span className="text-accent-cyan">&gt;</span> {t('hero.title')}<br />
                                <span className="terminal-cursor text-primary">{t('hero.subtitle')}</span>
                            </h1>

                            <p className="text-base sm:text-lg max-w-2xl border-l-2 border-slate-300 pl-4 text-slate-600">
                                [Status: ONLINE]<br />
                                {t('skills.frontend.desc')}
                            </p>
                        </div>

                        <div className="pt-6 flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="bg-slate-900 hover:bg-slate-700 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all text-white"
                            >
                                {t('hero.cta')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Hex SVG */}
            <div className="absolute right-[-8%] top-[20%] opacity-10 pointer-events-none hidden lg:block">
                <svg
                    className="fill-none stroke-primary"
                    strokeWidth="0.5"
                    width="400"
                    height="400"
                    viewBox="0 0 100 100"
                >
                    <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
                    <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
                </svg>
            </div>
        </section>
    );
}
