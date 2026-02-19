import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, Terminal, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/admin');
            } else {
                setError('Invalid credentials. Try alex@dev.com / admin123');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    const handleForgotPassword = () => {
        alert("Mock: Password reset link sent to your email!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 p-8 relative z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-6 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Terminal size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-mono tracking-tight">System Access</h1>
                    <p className="text-slate-400 text-sm mt-2 font-mono">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-500 uppercase font-medium ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full bg-[#1e293b] text-white px-12 py-3.5 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-mono text-slate-500 uppercase font-medium">Password</label>
                            <button type="button" onClick={handleForgotPassword} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                                Forgot Password?
                            </button>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-[#1e293b] text-white px-12 py-3.5 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <span>Authenticate</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-[10px] text-slate-400 font-mono">
                        <span>Hint:</span>
                        <code className="text-indigo-400">alex@dev.com</code>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <code className="text-indigo-400">admin123</code>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 text-slate-600 text-[10px] font-mono uppercase tracking-widest">
                Secured by DevAuth v2.0
            </div>
        </div>
    );
}
