export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
    createdAt: string;
}

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'tools' | 'soft-skills';
    proficiency: number; // 1-100
    icon?: string; // Lucide icon name or url
}
