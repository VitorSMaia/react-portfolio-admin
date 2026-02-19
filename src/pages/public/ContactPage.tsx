import { Mail, MapPin, Send, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('TRANSMISSION_INITIATED: Data packet sent to local relay.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-mono font-bold text-slate-100 mb-4 tracking-tight">
            // INITIATE_CONTACT
                    </h1>
                    <p className="text-slate-400 font-mono">
                        ESTABLISH SECURE CONNECTION PROTOCOL
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info (Left Panel) */}
                    <div className="bg-[#0f172a]/50 border border-white/5 p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                            <Terminal size={100} />
                        </div>

                        <h2 className="text-xl font-mono font-bold text-slate-200 mb-8 border-b border-white/5 pb-4">
                            COMMUNICATION_CHANNELS
                        </h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs text-slate-500 mb-1">EMAIL_ADDRESS</h3>
                                    <a href="mailto:hello@devportfolio.com" className="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm">
                                        hello@devportfolio.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs text-slate-500 mb-1">PHYSICAL_NODE</h3>
                                    <p className="text-slate-300 text-sm font-mono">San Francisco, CA_</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Terminal Input) */}
                    <div className="bg-[#0f172a] border border-slate-700 p-1 relative">
                        <div className="bg-slate-800/50 px-3 py-1 text-[10px] font-mono text-slate-400 flex justify-between items-center mb-4">
                            <span>msg_composer.exe</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-cyan-500 mb-2">
                                    {'>'} INPUT_NAME
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#020617] border border-slate-700 text-slate-300 font-mono text-sm px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700"
                                    placeholder="Enter alias..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-cyan-500 mb-2">
                                    {'>'} INPUT_EMAIL
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#020617] border border-slate-700 text-slate-300 font-mono text-sm px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700"
                                    placeholder="Enter frequency..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-cyan-500 mb-2">
                                    {'>'} INPUT_MESSAGE
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#020617] border border-slate-700 text-slate-300 font-mono text-sm px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700 resize-none"
                                    placeholder="Enter data packet..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-cyan-600/10 border border-cyan-500 text-cyan-400 font-mono font-bold tracking-widest hover:bg-cyan-500 hover:text-[#020617] transition-all flex items-center justify-center gap-2 group"
                            >
                                TRANSMIT_DATA <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
