
import { useEffect, useState, useCallback } from 'react';
import { MapPin, Activity } from 'lucide-react';
import { visitorService } from '@/services/visitorService';
import type { VisitorLog } from '@/types/visitor';
import DynamicTable from '@/components/admin/DynamicTable';

export default function VisitorLogsPage() {
    const [logs, setLogs] = useState<VisitorLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [totalHits, setTotalHits] = useState(0);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ country: '', city: '' });
    const perPage = 10;

    const loadLogs = useCallback(async () => {
        try {
            setLoading(true);
            const { data, total: count, totalHits: hits } = await visitorService.getVisitorLogs(page, perPage, filters);
            setLogs(data);
            setTotal(count);
            setTotalHits(hits);
        } catch (error) {
            console.error('Failed to load access logs:', error);
        } finally {
            setLoading(false);
        }
    }, [page, filters, perPage]);

    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    const columns = [
        {
            label: 'Timestamp',
            field: 'created_at',
            type: 'date' as const
        },
        {
            label: 'IP Address',
            field: 'ip_address',
            view: ({ value }: { value: unknown }) => (
                <span className="font-mono text-indigo-400">{value as string}</span>
            )
        },
        {
            label: 'Location',
            field: 'city',
            view: ({ item }: { item: VisitorLog }) => (
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-500" />
                    <span>{item.city}, {item.country}</span>
                </div>
            )
        },
        {
            label: 'Hits',
            field: 'total_visits',
            view: ({ value }: { value: unknown }) => (
                <span className="font-bold text-emerald-400">{value as number || 1}</span>
            )
        },
        {
            label: 'Session ID',
            field: 'session_id',
            view: ({ value }: { value: unknown }) => (
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[100px] block" title={value as string}>
                    {(value as string).slice(0, 8)}...
                </span>
            )
        },
        {
            label: 'User Agent',
            field: 'user_agent',
            view: ({ value }: { value: unknown }) => (
                <span className="text-[10px] text-slate-600 truncate max-w-[200px] block" title={value as string}>
                    {value as string}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="text-indigo-500" />
                        Acessos do Sistema
                    </h1>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
                        Monitoramento geográfico em tempo real
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl shadow-sm">
                    <div className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Total_Hits</div>
                    <div className="text-2xl font-black text-white tracking-tight">{totalHits.toLocaleString()}</div>
                </div>
                <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl shadow-sm">
                    <div className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Live_Protocol</div>
                    <div className="text-2xl font-black text-emerald-400 tracking-tight flex items-center gap-2">
                        <span className="size-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        ON
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <DynamicTable
                data={logs}
                columns={columns}
                loading={loading}
                total={total}
                perPage={perPage}
                currentPage={page}
                onPageChange={setPage}
                onSearchChange={(val) => setFilters(prev => ({ ...prev, city: val }))}
                searchPlaceholder="Filtrar por cidade..."
            />
        </div>
    );
}
