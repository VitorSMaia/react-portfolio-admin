import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, LogOut } from 'lucide-react';

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <aside className="w-64 bg-slate-900 text-white fixed h-full">
                <div className="p-6">
                    <div className="font-bold text-xl tracking-tight">Admin Panel</div>
                </div>
                <nav className="mt-6 px-4 flex flex-col gap-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        <FolderKanban size={20} />
                        <span>Projects</span>
                    </Link>
                </nav>
                <div className="absolute bottom-8 px-4 w-full">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main className="ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}
