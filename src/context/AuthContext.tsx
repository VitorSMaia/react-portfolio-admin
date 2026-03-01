import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types/auth';
import { AuthContext } from './AuthContextCore';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                fetchProfile(session.user.id, session.user.email!);
            } else {
                setIsLoading(false);
            }
        });

        // 2. Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchProfile(session.user.id, session.user.email!);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string, email: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
            }

            if (data) {
                setUser({
                    id: userId,
                    email,
                    name: data.name || 'User',
                    role: (data.role as 'ADMIN' | 'EDITOR') || 'EDITOR',
                    avatar: data.avatar_url,
                    github_url: data.github_url,
                    linkedin_url: data.linkedin_url,
                    professional_bio_pt: data.professional_bio_pt,
                    professional_bio_en: data.professional_bio_en,
                });
            } else {
                // Fallback if no profile exists yet
                setUser({
                    id: userId,
                    email,
                    name: 'User',
                    role: 'EDITOR',
                });
            }
        } catch (error) {
            console.error('Unexpected error fetching profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error.message);
            setIsLoading(false);
            return false;
        }

        return true;
    };

    const logout = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        setIsLoading(false);
    };

    const updateProfile = async (data: Partial<User>): Promise<boolean> => {
        if (!user) return false;

        try {
            // Prepare only the fields provided in data
            const updates: any = {
                updated_at: new Date(),
            };

            if (data.name !== undefined) updates.name = data.name;
            if (data.avatar !== undefined) updates.avatar_url = data.avatar;
            if (data.github_url !== undefined) updates.github_url = data.github_url;
            if (data.linkedin_url !== undefined) updates.linkedin_url = data.linkedin_url;
            if (data.professional_bio_pt !== undefined) updates.professional_bio_pt = data.professional_bio_pt;
            if (data.professional_bio_en !== undefined) updates.professional_bio_en = data.professional_bio_en;

            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) {
                console.error('Error updating profile:', error);
                return false;
            }

            // Update local state
            setUser(prev => prev ? { ...prev, ...data } : null);
            return true;

        } catch (error) {
            console.error('Error updating profile:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,

            login,
            logout,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

