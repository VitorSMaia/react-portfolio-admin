import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { contactService } from '@/services/contactService';
import { useLanguage } from '@/context/LanguageContextCore';

// Schema de validação Zod
const contactSchema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const { lang } = useLanguage();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setStatus('loading');
        setErrorMessage('');

        try {
            // Salva no banco via serviço
            await contactService.saveToDatabase(data);

            // Tenta disparar e-mail via serviço (non-blocking)
            try {
                await contactService.sendMessage(data);
            } catch (error) {
                console.warn('Email dispatch failed, but DB record saved.', error);
            }

            setStatus('success');
            reset();
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: unknown) {
            console.error('Contact protocol error:', error);
            setStatus('error');
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'TRANSMISSION_FAILED: Connection to relay lost.'
            );
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                        {lang == 'pt' ? 'IDENTIDADE_REMETENTE' : 'SENDER_IDENTITY'}
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder={lang == 'pt' ? 'NOME / ALIAS' : 'NAME / ALIAS'}
                        className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'
                            } rounded-lg p-3 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-sm`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[10px] font-mono">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                        {lang == 'pt' ? 'PROTOCOLO_DE_SINAL' : 'SIGNAL_PROTOCOL'}
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder={lang == 'pt' ? 'ENDEREÇO_DE_EMAIL' : 'EMAIL_ADDRESS'}
                        className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'
                            } rounded-lg p-3 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-sm`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-[10px] font-mono">{errors.email.message}</p>
                    )}
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                        {lang == 'pt' ? 'MENSAGEM_CRIPTOGRAFADA' : 'ENCRYPTED_MESSAGE'}
                    </label>
                    <textarea
                        {...register('message')}
                        rows={5}
                        placeholder={lang == 'pt' ? 'DIGITE_PACOTE_DE_DADOS_AQUI...' : 'ENTER_DATA_PACKET_HERE...'}
                        className={`w-full bg-slate-50 border ${errors.message ? 'border-red-500' : 'border-slate-200'
                            } rounded-lg p-3 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-sm resize-none`}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-[10px] font-mono">{errors.message.message}</p>
                    )}
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
                                {lang == 'pt' ? 'CRIPTOGRAFANDO_PACOTE...' : 'ENCRYPTING_PACKET...'}
                                <Loader2 size={16} className="animate-spin" />
                            </>
                        ) : (
                            <>
                                {lang == 'pt' ? 'TRANSMITIR_DADOS' : 'TRANSMIT_DATA'}
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
                        <span>{ lang == 'pt' ? 'TRANSMISSAO_CONCLUIDA: Pacote de dados reconhecido pelo relay central.' : 'TRANSMISSION_COMPLETE: Data packet acknowledged by central relay.'}</span>
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
