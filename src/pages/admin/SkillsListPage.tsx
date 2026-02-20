import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SkillList from '@/components/admin/SkillList';

export default function SkillsListPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Skills Matrix</h1>
                    <p className="text-slate-400 font-mono text-sm">MANAGE CORE CAPABILITIES & TECH STACK</p>
                </div>
                <Link
                    to="/admin/skills/new"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 font-bold text-sm tracking-wide uppercase"
                >
                    <Plus size={18} /> Add New Skill
                </Link>
            </div>

            <SkillList />
        </div>
    );
}

