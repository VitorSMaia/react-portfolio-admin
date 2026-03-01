import { supabase } from '@/lib/supabase';
import type { SkillCategory, SkillCategoryInput } from '@/types/skill';

export const skillCategoryService = {
    async getCategories() {
        const { data, error } = await supabase
            .from('skill_categories')
            .select('*')
            .order('label_pt', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }

        return data as SkillCategory[];
    },

    async createCategory(category: SkillCategoryInput) {
        const { data, error } = await supabase
            .from('skill_categories')
            .insert([category])
            .select()
            .single();

        if (error) {
            console.error('Error creating category:', error);
            throw error;
        }

        return data as SkillCategory;
    },

    async updateCategory(id: string, category: Partial<SkillCategoryInput>) {
        const { data, error } = await supabase
            .from('skill_categories')
            .update(category)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating category:', error);
            throw error;
        }

        return data as SkillCategory;
    },

    async deleteCategory(id: string) {
        const { error } = await supabase
            .from('skill_categories')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
};
