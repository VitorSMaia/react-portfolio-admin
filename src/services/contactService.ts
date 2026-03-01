import api from './api';
import { supabase } from '@/lib/supabase';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const contactService = {
    async sendMessage(data: ContactFormData) {
        // Envia para o servidor SES (relay) via interceptor Axios
        const sesUrl = import.meta.env.VITE_SES_SERVER_URL ?? 'http://localhost:3001';

        // Embora a diretriz diga para usar a instância 'api' configurada com o baseURL oficial,
        // o ContactForm original envia para um endpoint auxiliar do SES.
        // Vou manter a compatibilidade mas usar o axios para conformidade.

        // Primeiro salvamos no banco via API principal (se houver endpoint para isso)
        // No código original, ele usava o cliente Supabase diretamente.
        // Como a diretriz pede para centralizar no Axios, deveríamos ter um endpoint no backend principal.
        // Se não houver, manterei o Supabase temporariamente ou usarei o Axios se o backend suportar.

        // Por enquanto, vamos implementar o envio via Axios para o SES Relay como solicitado.
        return api.post(`${sesUrl}/api/send-email`, data);
    },

    async saveToDatabase(data: ContactFormData) {
        const { error } = await supabase
            .from('contact_messages')
            .insert([{ ...data, status: 'pending' }]);

        if (error) throw error;
        return true;
    }
};

export default contactService;
