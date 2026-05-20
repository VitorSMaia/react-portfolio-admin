import { supabase } from '@/lib/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  async sendMessage(data: ContactFormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? 'Failed to send message');
    }
    return res.json();
  },

  async saveToDatabase(data: ContactFormData) {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ ...data, status: 'pending' }]);
    if (error) throw error;
    return true;
  },
};

export default contactService;
