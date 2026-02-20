
import { supabase } from '@/lib/supabase';
import type { Skill, SkillInput } from '@/types/skill';

export const skillService = {
    async getSkills() {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('category', { ascending: true })
            .order('proficiency', { ascending: false });

        if (error) {
            console.error('Error fetching skills:', error);
            throw error;
        }

        return data as Skill[];
    },

    async createSkill(skill: SkillInput) {
        const { data, error } = await supabase
            .from('skills')
            .insert([skill])
            .select()
            .single();

        if (error) {
            console.error('Error creating skill:', error);
            throw error;
        }

        return data as Skill;
    },

    async updateSkill(id: string, skill: Partial<SkillInput>) {
        const { data, error } = await supabase
            .from('skills')
            .update(skill)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating skill:', error);
            throw error;
        }

        return data as Skill;
    },

    async deleteSkill(id: string) {
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting skill:', error);
            throw error;
        }
    }
};
