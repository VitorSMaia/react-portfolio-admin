import { Edit2, Trash2 } from 'lucide-react';

export default function UserTable() {
    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="text-indigo-400">
                        <UsersIcon />
                    </div>
                    <h3 className="font-mono text-white text-lg font-bold uppercase tracking-wider">Gerenciamento de Usuários</h3>
                </div>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 font-mono font-medium hover:underline">Ver todos</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800">
                            <th className="py-3 text-xs font-mono text-slate-500 uppercase font-medium tracking-wider">Usuário</th>
                            <th className="py-3 text-xs font-mono text-slate-500 uppercase font-medium tracking-wider">Nível</th>
                            <th className="py-3 text-xs font-mono text-slate-500 uppercase font-medium tracking-wider">Status</th>
                            <th className="py-3 text-xs font-mono text-slate-500 uppercase font-medium tracking-wider text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        <tr className="group hover:bg-slate-800/30 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#f0f9ff] flex items-center justify-center text-xl shrink-0">
                                        👨‍💼
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Lucas Henrique</div>
                                        <div className="text-xs text-slate-500 font-mono">lucas.h@dev.com</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wide">
                                    ADMIN
                                </span>
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-xs text-slate-300">Ativo</span>
                                </div>
                            </td>
                            <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-2 text-slate-500">
                                    <button className="p-1.5 hover:bg-slate-700 rounded transition-colors hover:text-white"><Edit2 size={14} /></button>
                                    <button className="p-1.5 hover:bg-slate-700 rounded transition-colors hover:text-red-400"><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>

                        <tr className="group hover:bg-slate-800/30 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#f0fdf4] flex items-center justify-center text-xl shrink-0">
                                        👩‍💻
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Ana Maria</div>
                                        <div className="text-xs text-slate-500 font-mono">ana.m@dev.com</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-slate-700/30 border border-slate-700 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">
                                    EDITOR
                                </span>
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-xs text-slate-300">Ativo</span>
                                </div>
                            </td>
                            <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-2 text-slate-500">
                                    <button className="p-1.5 hover:bg-slate-700 rounded transition-colors hover:text-white"><Edit2 size={14} /></button>
                                    <button className="p-1.5 hover:bg-slate-700 rounded transition-colors hover:text-red-400"><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function UsersIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    )
}
