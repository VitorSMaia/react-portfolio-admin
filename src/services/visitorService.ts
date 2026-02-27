
import { supabase } from '@/lib/supabase';
import type { VisitorLog } from '@/types/visitor';

export const visitorService = {
    async logVisitor(data: Partial<VisitorLog>) {
        const { data: log, error } = await supabase
            .from('visitor_logs')
            .insert([data])
            .select()
            .single();

        if (error) throw error;
        return log;
    },

    async getVisitorLogs(page = 1, perPage = 10, filters: any = {}) {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        let query = supabase
            .from('visitor_logs')
            .select('*', { count: 'exact' });

        if (filters.country) {
            query = query.ilike('country', `%${filters.country}%`);
        }
        if (filters.city) {
            query = query.ilike('city', `%${filters.city}%`);
        }

        const { data, error, count } = await query
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) throw error;

        return {
            data: data as VisitorLog[],
            total: count || 0
        };
    }
};
