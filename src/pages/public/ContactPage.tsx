import ContactForm from '@/components/public/ContactForm';
import { Mail, MapPin, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContextCore';

export default function ContactPage() {
    const { lang } = useLanguage();
    return (
        <div className="py-24 px-6 bg-slate-100 min-h-screen relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black uppercase tracking-widest mb-4 text-slate-900">
                       {lang === 'pt' ? 'INICIAR_CONTATO' : 'INITIATE_CONTACT'}
                    </h1>
                    <p className="text-slate-500 font-mono text-sm uppercase">
                        {lang === 'pt' ? 'Canal seguro de ponta a ponta' : 'Secure end-to-end encrypted channel'}
                    </p>
                </div>

                {/* Info strip above form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                        <div className="p-3 bg-slate-100 rounded-lg text-primary">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                                {lang == 'pt' ? 'ENDEREÇO DE EMAIL' : 'EMAIL_ADDRESS'}
                            </p>
                            <a
                                href="mailto:hello@devportfolio.com"
                                className="text-slate-700 hover:text-primary transition-colors font-mono text-sm"
                            >
                                hello@devportfolio.com
                            </a>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                        <div className="p-3 bg-slate-100 rounded-lg text-purple-500">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                                PHYSICAL_NODE
                            </p>
                            <p className="text-slate-700 font-mono text-sm">San Francisco, CA_</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <ContactForm />
            </div>

            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Decorative terminal icon */}
            <div className="absolute bottom-12 right-12 opacity-5 pointer-events-none hidden lg:block">
                <Terminal size={160} />
            </div>
        </div>
    );
}
