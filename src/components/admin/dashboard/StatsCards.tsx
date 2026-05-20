'use client';

import { Layers } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    icon: React.ReactNode;
}

function StatCard({ title, value, trend, icon }: StatCardProps) {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
            <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">{title}</div>
            <div className="text-3xl font-bold text-white mb-2">{value}</div>
            {trend && <div className="text-emerald-400 text-xs font-mono">{trend}</div>}
        </div>
    );
}

export default function StatsCards() {
    const [projectCount, setProjectCount] = useState<number | string>('-');

    useEffect(() => {
        async function fetchStats() {
            const { count: pCount, error: pError } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true });

            if (!pError && pCount !== null) {
                setProjectCount(pCount);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            <StatCard
                title="Projetos"
                value={projectCount}
                trend="Total cadastrado"
                icon={<Layers size={48} />}
            />
        </div>
    );
}
