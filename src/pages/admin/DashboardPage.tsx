export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium mb-1">Total Projects</div>
                    <div className="text-3xl font-bold text-slate-900">12</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium mb-1">Total Skills</div>
                    <div className="text-3xl font-bold text-slate-900">24</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium mb-1">Messages</div>
                    <div className="text-3xl font-bold text-slate-900">5</div>
                </div>
            </div>
        </div>
    );
}
