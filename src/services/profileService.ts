
import { supabase } from '@/lib/supabase';

export interface PublicProfile {
    id: string;
    name: string;
    avatar_url?: string;
    github_url?: string;
    linkedin_url?: string;
    role: string;
}

export const profileService = {
    async getOwnerProfile(): Promise<PublicProfile | null> {
        try {
            // Fetch the first profile with ADMIN role
            const { data, error } = await supabase
                .from('profiles')
                .select('id, name, avatar_url, github_url, linkedin_url, role')
                .eq('role', 'ADMIN')
                .limit(1)
                .single();

            if (error) {
                // If no admin found, or error, try fetching ANY profile as fallback (for single user apps)
                console.warn('Error fetching admin profile:', error);

                const { data: fallbackData, error: fallbackError } = await supabase
                    .from('profiles')
                    .select('id, name, avatar_url, github_url, linkedin_url, role')
                    .limit(1)
                    .single();

                if (fallbackError) {
                    console.error('Error fetching fallback profile:', fallbackError);
                    return null;
                }
                return fallbackData;
            }

            return data;
        } catch (error) {
            console.error('Unexpected error fetching profile:', error);
            return null;
        }
    }
};
