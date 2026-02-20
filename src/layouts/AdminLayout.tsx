import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, User as UserIcon, Terminal, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout() {
    const location = useLocation();
    const { user, logout } = useAuth();

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/projects', icon: <FolderKanban size={20} />, label: 'Projetos' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Usuários' },
        { path: '/admin/profile', icon: <UserIcon size={20} />, label: 'Perfil' },
    ];

    return (
        <div className="min-h-screen bg-[#020617] font-sans flex text-slate-300 selection:bg-indigo-500/30">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0f172a] border-r border-slate-800 fixed h-full flex flex-col z-50">
                {/* Logo Area */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 font-mono font-bold text-xl text-white tracking-tighter">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <Terminal size={20} className="text-white" />
                        </div>
                        DEV_ADM
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = item.path === '/admin'
                            ? location.pathname === '/admin'
                            : location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${active
                                    ? 'bg-indigo-600/10 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                {active && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"></div>
                                )}
                                <span className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}>
                                    {item.icon}
                                </span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info (Bottom) */}
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-slate-600 object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-lg border-2 border-slate-600 font-bold text-white">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div className="overflow-hidden">
                                <div className="text-sm font-bold text-white uppercase font-mono tracking-wider truncate max-w-[100px]">{user?.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono">{user?.role}</div>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 relative">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <Outlet />


                </div>
            </main>
        </div>
    );
}
