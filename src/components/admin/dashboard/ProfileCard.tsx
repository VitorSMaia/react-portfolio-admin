
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Github, Linkedin, Loader2, Save, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContextCore';

const profileSchema = z.object({
    github_url: z.string().url('URL inválida').or(z.string().length(0)),
    linkedin_url: z.string().url('URL inválida').or(z.string().length(0)),
    professional_bio_pt: z.string().min(10, 'Bio (PT) muito curta').or(z.string().length(0)),
    professional_bio_en: z.string().min(10, 'Bio (EN) muito curta').or(z.string().length(0)),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileCard() {
    const { user, updateProfile } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            github_url: user?.github_url || '',
            linkedin_url: user?.linkedin_url || '',
            professional_bio_pt: user?.professional_bio_pt || '',
            professional_bio_en: user?.professional_bio_en || '',
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                github_url: user.github_url || '',
                linkedin_url: user.linkedin_url || '',
                professional_bio_pt: user.professional_bio_pt || '',
                professional_bio_en: user.professional_bio_en || '',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        setIsSaving(true);
        const success = await updateProfile({
            github_url: data.github_url,
            linkedin_url: data.linkedin_url,
            professional_bio_pt: data.professional_bio_pt,
            professional_bio_en: data.professional_bio_en
        });
        setIsSaving(false);
        if (success) {
            // Success feedback
        }
    };

    return (
        <div className="bg-[#1e1b4b] rounded-xl border border-indigo-500/20 p-6 shadow-lg shadow-indigo-500/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#ffedd5] mb-4 flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 overflow-hidden">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="font-bold text-slate-900 text-2xl">{user?.name?.charAt(0) || 'U'}</span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight font-mono">{user?.name}</h3>
                <p className="text-[10px] font-mono text-indigo-400 mb-6 tracking-[0.2em] uppercase">{user?.role === 'ADMIN' ? 'FULLSTACK ENGINEER' : user?.role}</p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    <div className="text-left space-y-4">
                        <div>
                            <label className="text-[10px] text-slate-500 font-mono mb-2 uppercase flex items-center gap-2">
                                <FileText size={12} />
                                Professional Bio (PT)
                            </label>
                            <textarea
                                {...register('professional_bio_pt')}
                                rows={2}
                                className="w-full bg-[#0f172a]/50 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 leading-relaxed focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 resize-none"
                                placeholder="Bio em Português..."
                            />
                            {errors.professional_bio_pt && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.professional_bio_pt.message}</p>}
                        </div>

                        <div>
                            <label className="text-[10px] text-slate-500 font-mono mb-2 uppercase flex items-center gap-2">
                                <FileText size={12} />
                                Professional Bio (EN)
                            </label>
                            <textarea
                                {...register('professional_bio_en')}
                                rows={2}
                                className="w-full bg-[#0f172a]/50 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 leading-relaxed focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 resize-none"
                                placeholder="Bio in English..."
                            />
                            {errors.professional_bio_en && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.professional_bio_en.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 hover:border-indigo-500 transition-colors">
                            <Github size={16} className="mr-3 text-slate-500" />
                            <input
                                {...register('github_url')}
                                type="text"
                                placeholder="Github URL"
                                className="bg-transparent border-none outline-none text-[11px] text-slate-300 font-mono w-full"
                            />
                        </div>
                        {errors.github_url && <p className="text-red-500 text-[10px] font-mono text-left">{errors.github_url.message}</p>}

                        <div className="flex items-center bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 hover:border-indigo-500 transition-colors">
                            <Linkedin size={16} className="mr-3 text-slate-500" />
                            <input
                                {...register('linkedin_url')}
                                type="text"
                                placeholder="Linkedin URL"
                                className="bg-transparent border-none outline-none text-[11px] text-slate-300 font-mono w-full"
                            />
                        </div>
                        {errors.linkedin_url && <p className="text-red-500 text-[10px] font-mono text-left">{errors.linkedin_url.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isSaving ? 'Saving...' : 'Update Protocol'}
                    </button>
                </form>
            </div>
        </div>
    );
}
