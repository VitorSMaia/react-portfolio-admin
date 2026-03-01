
import { supabase } from '@/lib/supabase';

export interface PublicProfile {
    id: string;
    name: string;
    avatar_url?: string;
    github_url?: string;
    linkedin_url?: string;
    professional_bio_pt?: string;
    professional_bio_en?: string;
    role: string;
}

export const profileService = {
    async getOwnerProfile(): Promise<PublicProfile | null> {
        try {
            // Fetch profiles prioritized by ADMIN role and then by bio existence
            const { data, error } = await supabase
                .from('profiles')
                .select('id, name, avatar_url, github_url, linkedin_url, professional_bio_pt, professional_bio_en, role')
                .order('role', { ascending: true }) // ADMIN usually comes first
                .limit(1);

            if (error) {
                console.error('Error fetching profiles:', error);
                return null;
            }

            if (data && data.length > 0) {
                return data[0] as PublicProfile;
            }

            return null;
        } catch (error) {
            console.error('Unexpected error fetching profile:', error);
            return null;
        }
    }
};
