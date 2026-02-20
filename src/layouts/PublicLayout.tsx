import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Github, Linkedin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/public/AnimatedBackground';
import { cn } from '@/utils/cn';

export default function PublicLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profile, setProfile] = useState<any>(null); // simplified type for now
    const location = useLocation();

    useEffect(() => {
        // Dynamic import to avoid circular dependencies if any, though service is clean
        import('@/services/profileService').then(({ profileService }) => {
            profileService.getOwnerProfile().then(setProfile);
        });
    }, []);

    const navLinks = [
        { name: 'ABOUT', path: '/' },
        { name: 'PROJECTS', path: '/projects' },
        { name: 'SKILLS', path: '/#skills' }, // Anchor link for now, or separate page
        { name: 'CONTACT', path: '/contact' },
    ];

    return (
        <div className="min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30">
            <AnimatedBackground />

            {/* Tech Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
                            <Terminal size={24} className="text-cyan-400" />
                        </div>
                        <span className="font-mono font-bold text-lg tracking-wider text-slate-100">
                            DEV_PORTFOLIO<span className="text-cyan-500 animate-blink">_</span>v2.0
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "text-sm font-mono tracking-widest hover:text-cyan-400 transition-colors relative py-1",
                                    location.pathname === link.path ? "text-cyan-400" : "text-slate-400"
                                )}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <span className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                )}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="px-6 py-2 bg-cyan-500/10 text-cyan-400 font-mono text-sm border border-cyan-500/50 hover:bg-cyan-500/20 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-sm"
                        >
                            SECURE_HIRE
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#020617] border-b border-white/10">
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-mono text-slate-300 hover:text-cyan-400"
                                >
                                    {'>'} {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <main className="pt-24 pb-12 min-h-screen">
                <Outlet />
            </main>

            <footer className="border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm mt-auto">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-xs text-slate-500">
                        SYSTEM_STATUS: <span className="text-green-500">OPERATIONAL</span>
                    </div>
                    <div className="flex gap-6">
                        {profile?.github_url && (
                            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        {profile?.linkedin_url && (
                            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        )}
                        {/* Twitter/X is not yet in DB, keeping as mock or hiding if you prefer. I'll hide for consistency */}
                    </div>
                    <div className="font-mono text-xs text-slate-600">
                        © 2024 {profile?.name || 'DEV_NODE'}. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
