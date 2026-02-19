import { Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { projectService } from '@/services/projectService';
import { useNavigate } from 'react-router-dom';

export default function ProjectForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        technologies: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await projectService.create({
                title: formData.title,
                description: formData.description,
                imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', // Default placeholder
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
                demoUrl: '',
                githubUrl: ''
            });
            // Reset form
            setFormData({ title: '', description: '', imageUrl: '', technologies: '' });
            alert('Projeto criado com sucesso!');
            // Optional: refresh dashboard stats or list (would need context or reload)
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro ao criar projeto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="text-indigo-400">
                        <Save size={20} />
                    </div>
                    <h3 className="font-mono text-white text-lg font-bold uppercase tracking-wider">Quick Add: Novo Projeto</h3>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Título do Projeto</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: E-commerce Marketplace"
                        className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Imagem URL (Opcional)</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full bg-[#1e293b] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Descrição Curta</label>
                    <textarea
                        rows={3}
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descreva brevemente as funcionalidades..."
                        className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600 resize-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Stack (separada por vírgula)</label>
                    <input
                        type="text"
                        value={formData.technologies}
                        onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                        placeholder="React, Node.js, PostgreSQL"
                        className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
                    />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/projects/new')}
                        className="text-slate-400 hover:text-white px-4 py-2 text-xs font-mono uppercase tracking-wide transition-colors"
                    >
                        Formulário Completo
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm uppercase tracking-wide transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {loading ? 'Salvando...' : 'Salvar Rascunho'}
                    </button>
                </div>
            </form>
        </div>
    );
}
