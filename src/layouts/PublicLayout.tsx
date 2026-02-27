
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Globe, Terminal, ArrowRight, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';

export default function PublicLayout() {
    useVisitorTracking();

    return (
        <LanguageProvider>
            <PublicLayoutContent />
        </LanguageProvider>
    );
}

function PublicLayoutContent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { lang, setLang, t } = useLanguage();

    const navLinks = [
        { name: t('nav.about'), id: 'about', path: '/' },
        { name: t('nav.projects'), id: 'projects', path: '#projects' },
        { name: t('nav.skills'), id: 'skills', path: '#skills' },
        { name: t('nav.contact'), id: 'contact', path: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-background-light text-slate-900 font-display selection:bg-slate-200">
            {/* ── Scanline overlay ─────────────────────── */}
            <div className="scanline-overlay" />

            {/* ── Fixed Header ─────────────────────────── */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div
                            className="size-8 bg-primary rounded flex items-center justify-center text-white"
                            style={{ boxShadow: '0 0 10px rgba(15, 23, 42, 0.15)' }}
                        >
                            <Terminal size={20} />
                        </div>
                        <span className="text-lg font-black tracking-tighter uppercase">DV_PORTFOLIO_v2.0</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.path}
                                className={cn(
                                    'text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest',
                                    location.pathname === link.path && !link.path.startsWith('#')
                                        ? 'text-primary'
                                        : 'text-slate-600'
                                )}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors group"
                        >
                            <Globe size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="text-[10px] font-mono font-black tracking-widest uppercase">
                                {lang === 'en' ? 'PT' : 'EN'}
                            </span>
                        </button>

                        <a
                            href="#contact"
                            className="bg-primary hover:bg-slate-800 px-5 py-2 rounded-lg text-sm font-bold transition-all uppercase tracking-widest text-white flex items-center gap-2"
                            style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        >
                            {t('footer.cta')}
                            <ArrowRight size={14} />
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                        >
                            <Globe size={16} className="text-slate-400" />
                            <span className="text-[10px] font-mono font-black">{lang === 'en' ? 'PT' : 'EN'}</span>
                        </button>
                        <button
                            className="p-1"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-slate-700">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden">
                        <div className="flex flex-col px-6 py-6 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-black text-slate-800 hover:text-primary transition-colors uppercase tracking-widest text-lg font-display"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* ── Main Content ─────────────────────────── */}
            <main className="pt-16">
                <Outlet />
            </main>

            {/* ── Footer ───────────────────────────────── */}
            <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top row: 3 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
                        {/* Brand + status */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="size-7 bg-primary rounded flex items-center justify-center text-white">
                                    <Terminal size={14} />
                                </div>
                                <span className="text-sm font-black tracking-tighter uppercase">DV_PORTFOLIO_v2.0</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                                <span className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,1)]" />
                                {t('footer.status')}: <span className="text-slate-800 font-bold">{t('footer.operational')}</span>
                            </div>
                            <div className="font-mono text-[9px] uppercase text-slate-400 tracking-[0.2em]">
                                Build: v2.0.4.stable // 2024.05.22
                            </div>
                        </div>

                        {/* Quick links */}
                        <div className="flex flex-col gap-4">
                            <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400 mb-2">/ {t('footer.links')}</p>
                            <div className="grid grid-cols-2 gap-y-3">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.path}
                                        className="text-xs text-slate-600 hover:text-primary transition-colors font-bold uppercase tracking-widest"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex flex-col gap-4">
                            <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{t('footer.social')}</p>
                            <div className="flex gap-4">
                                <a href="https://github.com/vitorsmaia" target="_blank" className="size-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group" aria-label="GitHub">
                                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                                <a href="https://www.linkedin.com/in/vitorsmaia" className="size-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group" aria-label="LinkedIn">
                                    <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                                {/* <a href="#" className="size-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group" aria-label="Twitter">
                                    <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                                <a href="#" className="size-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group" aria-label="Message">
                                    <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                                </a> */}
                            </div>
                        </div>
                    </div>

                    {/* Bottom divider + copyright */}
                    <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 text-center sm:text-left">
                            © {new Date().getFullYear()} DESIGNED_BY_AI.DV // PROTOTYPE_SYSTEM_v2
                        </p>
                        <a
                            href="#contact"
                            className="bg-primary hover:bg-slate-800 px-6 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest text-white flex items-center gap-2"
                        >
                            <span className="size-1.5 bg-white rounded-full animate-ping" />
                            {t('footer.cta')}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
