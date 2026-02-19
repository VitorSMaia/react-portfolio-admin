import { Github, Linkedin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ProfileCard() {
    const { user } = useAuth();

    return (
        <div className="bg-[#1e1b4b] rounded-xl border border-indigo-500/20 p-6 shadow-lg shadow-indigo-500/10 relative overflow-hidden group">
            {/* Background glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#ffedd5] mb-4 flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="font-bold text-slate-900 text-2xl">{user?.name?.charAt(0) || 'U'}</span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{user?.name}</h3>
                <p className="text-xs font-mono text-indigo-400 mb-6 tracking-widest uppercase">{user?.role === 'ADMIN' ? 'FULLSTACK ENGINEER' : user?.role}</p>

                <div className="w-full text-left bg-[#0f172a]/50 p-4 rounded-lg border border-slate-800 mb-6 backdrop-blur-sm">
                    <p className="text-xs text-slate-500 font-mono mb-2 uppercase">Bio Profissional</p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Desenvolvedor focado em arquiteturas escaláveis e experiências de usuário fluidas. Entusiasta de Rust e WebGL.
                    </p>
                </div>

                <div className="w-full space-y-3 mb-6">
                    <div className="group/link flex items-center bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 hover:border-indigo-500/50 transition-colors cursor-pointer">
                        <Github size={16} className="text-slate-400 group-hover/link:text-white mr-3" />
                        <span className="text-sm text-slate-300 font-mono truncate">github.com/alexdev</span>
                    </div>
                    <div className="group/link flex items-center bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 hover:border-indigo-500/50 transition-colors cursor-pointer">
                        <Linkedin size={16} className="text-slate-400 group-hover/link:text-white mr-3" />
                        <span className="text-sm text-slate-300 font-mono truncate">linkedin.com/in/alexsilva</span>
                    </div>
                </div>

                <button className="w-full bg-white hover:bg-slate-200 text-slate-900 font-bold py-2.5 rounded-lg text-sm uppercase tracking-wide transition-colors">
                    Atualizar Perfil
                </button>
            </div>
        </div>
    );
}
