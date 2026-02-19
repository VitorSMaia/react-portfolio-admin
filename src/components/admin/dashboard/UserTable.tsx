import { Edit2, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Profile {
    id: string;
    name: string;
    email?: string; // profiles table might not have email, but we can try to join or just show name/role
    role: string;
    avatar_url: string;
}

export default function UserTable() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            // Note: profiles table doesn't have email by default in our schema, 
            // but for this view we might want it. 
            // Since we can't easily join auth.users from client, we'll just show what we have in profiles.
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .limit(5); // Show only recent 5 on dashboard

            if (!error && data) {
                setUsers(data);
            }
            setLoading(false);
        }
        fetchUsers();
    }, []);

    if (loading) {
        return <div className="p-6 text-slate-500 text-center">Loading users...</div>;
    }

    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="text-indigo-400">
                        <Users size={20} />
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
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-slate-800/30 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        {user.avatar_url ? (
                                            <img src={user.avatar_url} alt={user.name} className="w-10 h-10 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl shrink-0">
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-bold text-white">{user.name || 'Sem Nome'}</div>
                                            {/* Email is not in public.profiles, so we omit or need a way to get it */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wide ${user.role === 'ADMIN'
                                            ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                                            : 'bg-slate-700/30 border border-slate-700 text-slate-400'
                                        }`}>
                                        {user.role}
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
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-slate-500 text-sm">
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
