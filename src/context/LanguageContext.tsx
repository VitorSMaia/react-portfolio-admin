import React, { useState, useEffect } from 'react';
import type { Language } from '@/types/language';
import { LanguageContext } from './LanguageContextCore';

const translations = {
    en: {
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'hero.title': 'Full-Stack Developer',
        'hero.subtitle': 'Building digital experiences with precision and speed.',
        'hero.cta': 'View Projects',
        'skills.title': 'Core Capabilities',
        'skills.subtitle': 'A technical breakdown of my primary development stack and professional tools.',
        'skills.frontend.desc': 'Developing high-fidelity, reactive interfaces using Tailwind CSS, Alpine.js, and Blade, with specialized Three.js implementations for data visualization.',
        'skills.backend.desc': 'Building robust system architecture with Laravel ecosystem, Node.js microservices orchestration, and Python data processing automations.',
        'skills.tools.desc': 'Scaling infrastructure with Terraform and automated CI/CD pipelines via GitHub Actions for resilient and secure deployments.',
        'contact.title': 'Get In Touch',
        'contact.subtitle': 'Have a project in mind? Let\'s discuss how we can build something amazing.',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.success': 'Message sent successfully!',
        'contact.error': 'An error occurred. Please try again.',
        'footer.status': 'System Status',
        'footer.operational': 'Operational',
        'footer.links': 'Quick Links',
        'footer.social': 'Connect',
        'footer.cta': 'WANT_TO_CHAT?',
    },
    pt: {
        'nav.about': 'Sobre',
        'nav.projects': 'Projetos',
        'nav.skills': 'Habilidades',
        'nav.contact': 'Contato',
        'hero.title': 'Desenvolvedor Full-Stack',
        'hero.subtitle': 'Construindo experiências digitais com precisão e velocidade.',
        'hero.cta': 'Ver Projetos',
        'skills.title': 'Competências Principais',
        'skills.subtitle': 'Uma análise técnica da minha stack de desenvolvimento principal e ferramentas profissionais.',
        'skills.frontend.desc': 'Desenvolvimento de interfaces reativas e de alta fidelidade utilizando Tailwind CSS, Alpine.js e Blade, com implementações especializadas em Three.js para visualização de dados.',
        'skills.backend.desc': 'Arquitetura de sistemas robustos com ecossistema Laravel, orquestração de microsserviços em Node.js e automações/scripts em Python para processamento de dados.',
        'skills.tools.desc': 'Provisionamento de infraestrutura escalável com Terraform e automação completa de pipelines de CI/CD via GitHub Actions, para deploys resilientes e seguros.',
        'contact.title': 'Entre em Contato',
        'contact.subtitle': 'Tem um projeto em mente? Vamos discutir como podemos construir algo incrível.',
        'contact.name': 'Nome',
        'contact.email': 'E-mail',
        'contact.message': 'Mensagem',
        'contact.send': 'Enviar Mensagem',
        'contact.sending': 'Enviando...',
        'contact.success': 'Mensagem enviada com sucesso!',
        'contact.error': 'Ocorreu um erro. Tente novamente.',
        'footer.status': 'Status do Sistema',
        'footer.operational': 'Operacional',
        'footer.links': 'Links Rápidos',
        'footer.social': 'Conectar',
        'footer.cta': 'QUER_CONVERSAR?',
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>(() => {
        const saved = localStorage.getItem('dv_portfolio_lang');
        return (saved as Language) || 'pt';
    });

    useEffect(() => {
        localStorage.setItem('dv_portfolio_lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key: string) => {
        return translations[lang][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

