import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const { error: dbError } = await supabase
                .from('contact_messages')
                .insert([{ name: formData.name, email: formData.email, message: formData.message, status: 'pending' }]);

            if (dbError) throw dbError;

            // Attempt email dispatch via SES backend (non-blocking)
            try {
                const sesUrl = import.meta.env.VITE_SES_SERVER_URL ?? 'http://localhost:3001';
                await fetch(`${sesUrl}/api/send-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } catch {
                console.warn('Email dispatch failed, but DB record saved.');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: unknown) {
            console.error('Contact protocol error:', error);
            setStatus('error');
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : t('contact.error')
            );
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                        {t('contact.name')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.name.placeholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-sm"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                        {t('contact.email')}
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.email.placeholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-sm"
                    />
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                        {t('contact.message')}
                    </label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('contact.message.placeholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-sm resize-none"
                    />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-primary hover:bg-slate-800 font-black py-4 rounded-lg uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all group text-white disabled:opacity-60 disabled:cursor-wait"
                    >
                        {status === 'loading' ? (
                            <>
                                {t('contact.sending')}
                                <Loader2 size={16} className="animate-spin" />
                            </>
                        ) : (
                            <>
                                {t('contact.send')}
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">
                                    send
                                </span>
                            </>
                        )}
                    </button>
                </div>

                {/* Feedback */}
                {status === 'success' && (
                    <div className="md:col-span-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs flex items-center gap-3 animate-fade-in rounded-lg">
                        <CheckCircle size={16} />
                        <span>{t('contact.success')}</span>
                    </div>
                )}
                {status === 'error' && (
                    <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 text-red-700 font-mono text-xs flex items-center gap-3 animate-fade-in rounded-lg">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                    </div>
                )}
            </form>
        </div>
    );
}
