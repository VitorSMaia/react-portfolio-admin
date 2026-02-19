import { Plus, Eye } from 'lucide-react';
import ProjectForm from '@/components/admin/dashboard/ProjectForm';
import UserTable from '@/components/admin/dashboard/UserTable';
import ProfileCard from '@/components/admin/dashboard/ProfileCard';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import ActivityLog from '@/components/admin/dashboard/ActivityLog';

export default function DashboardPage() {
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight font-mono">Console de Administração</h1>
                    <p className="text-slate-400">Gerencie seu portfólio técnico e acessos do sistema.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-slate-300 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors border border-slate-700">
                        <Eye size={16} />
                        Visualizar Site
                    </button>
                    <button className="px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors shadow-lg shadow-indigo-500/20">
                        <Plus size={16} />
                        Novo Projeto
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column (Main Content) - Takes 2/3 width on large screens */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Project Form */}
                    <ProjectForm />

                    {/* User Table */}
                    <UserTable />
                </div>

                {/* Right Column (Widgets) - Takes 1/3 width */}
                <div className="space-y-8">
                    {/* Profile Card */}
                    <ProfileCard />

                    {/* Stats */}
                    <StatsCards />

                    {/* Activity Log */}
                    <ActivityLog />
                </div>
            </div>
        </div>
    );
}
