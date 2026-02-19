import { Save } from 'lucide-react';

export default function ProjectForm() {
    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="text-indigo-400">
                        <Save size={20} />
                    </div>
                    <h3 className="font-mono text-white text-lg font-bold uppercase tracking-wider">Registrar Novo Projeto</h3>
                </div>
                <div className="px-3 py-1 bg-slate-800/50 rounded text-[10px] font-mono text-slate-400 uppercase border border-slate-700">
                    Status: Rascunho
                </div>
            </div>

            <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Título do Projeto</label>
                        <input
                            type="text"
                            placeholder="Ex: E-commerce Marketplace"
                            className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Status</label>
                        <select className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none">
                            <option>Live</option>
                            <option>Em Desenvolvimento</option>
                            <option>Planejamento</option>
                            <option>Arquivado</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Descrição Curta</label>
                    <textarea
                        rows={3}
                        placeholder="Descreva brevemente as funcionalidades e o propósito do projeto..."
                        className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600 resize-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Stack Tecnológica</label>
                    <div className="bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-xs font-medium text-indigo-300">
                            React.js
                            <button className="hover:text-white">×</button>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-xs font-medium text-indigo-300">
                            Node.js
                            <button className="hover:text-white">×</button>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-xs font-medium text-indigo-300">
                            PostgreSQL
                            <button className="hover:text-white">×</button>
                        </span>
                        <input
                            type="text"
                            placeholder="Adicionar tag..."
                            className="bg-transparent text-sm text-white focus:outline-none min-w-[100px] placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button type="button" className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-indigo-500/20">
                        <Save size={18} />
                        Salvar Projeto
                    </button>
                </div>
            </form>
        </div>
    );
}
