export interface SkillCategory {
    id: string;
    key: string;
    label_en: string;
    label_pt: string;
    icon?: string;
    color?: string;
    description_en?: string;
    description_pt?: string;
    created_at?: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string; // Keep for backward compatibility or direct label
    category_id?: string;
    proficiency: number;
    icon?: string;
    created_at?: string;
    skill_categories?: SkillCategory;
}

export type SkillInput = Omit<Skill, 'id' | 'created_at'>;
export type SkillCategoryInput = Omit<SkillCategory, 'id' | 'created_at'>;
