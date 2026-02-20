
export interface Skill {
    id: string;
    name: string;
    category: string;
    proficiency: number;
    icon?: string;
    created_at?: string;
}

export type SkillInput = Omit<Skill, 'id' | 'created_at'>;
