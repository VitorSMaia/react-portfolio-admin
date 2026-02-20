import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SkillForm from '@/components/admin/SkillForm';

export default function SkillEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/skills')}
                    className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isEditing ? 'Edit Skill Protocol' : 'Initialize New Skill'}
                    </h1>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">
                        {isEditing ? `UPDATING SKILL_ID: ${id}` : 'REGISTERING NEW CAPABILITY'}
                    </p>
                </div>
            </div>

            <SkillForm />
        </div>
    );
}

