export default function ActivityLog() {
    const logs = [
        { type: 'SUCCESS', message: "Projeto 'API Gateway' atualizado.", time: '10:42:23', color: 'text-emerald-400' },
        { type: 'SYSTEM', message: "Backup diário concluído.", time: '04:00:00', color: 'text-blue-400' },
        { type: 'WARNING', message: "Novo login detectado: SP, Brasil.", time: '09:15:12', color: 'text-amber-400' },
    ];

    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-4 font-mono text-xs shadow-sm h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
                <span className="text-slate-500 ml-2 uppercase tracking-wide">ATIVIDADE_LOG</span>
            </div>

            <div className="space-y-3">
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                        <span className={`font-bold [${log.color}]`}>[{log.type}]</span>
                        <span className="text-slate-400">{log.message}</span>
                    </div>
                ))}
                <div className="mt-4 text-slate-600 animate-pulse">
                    &gt; aguardando novo comando...
                </div>
            </div>
        </div>
    );
}
