
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

export const projectService = {
    async getAll() {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                id,
                title,
                description:description_en,
                description_en,
                description_pt,
                imageUrl:image_url,
                technologies,
                demoUrl:demo_url,
                githubUrl:github_url,
                createdAt:created_at
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Project[];
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                id,
                title,
                description:description_en,
                description_en,
                description_pt,
                imageUrl:image_url,
                technologies,
                demoUrl:demo_url,
                githubUrl:github_url,
                createdAt:created_at
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Project;
    },

    async create(project: Omit<Project, 'id' | 'createdAt'>) {
        const dbPayload = {
            title: project.title,
            description_en: project.description_en,
            description_pt: project.description_pt,
            image_url: project.imageUrl,
            technologies: project.technologies,
            demo_url: project.demoUrl,
            github_url: project.githubUrl,
        };

        const { data, error } = await supabase
            .from('projects')
            .insert(dbPayload)
            .select(`
                id,
                title,
                description:description_en,
                description_en,
                description_pt,
                imageUrl:image_url,
                technologies,
                demoUrl:demo_url,
                githubUrl:github_url,
                createdAt:created_at
            `)
            .single();

        if (error) throw error;
        return data as Project;
    },

    async update(id: string, project: Partial<Project>) {
        const dbPayload: {
            title?: string;
            description_en?: string;
            description_pt?: string;
            image_url?: string;
            technologies?: string[];
            demo_url?: string;
            github_url?: string;
        } = {};
        if (project.title !== undefined) dbPayload.title = project.title;
        if (project.description_en !== undefined) dbPayload.description_en = project.description_en;
        if (project.description_pt !== undefined) dbPayload.description_pt = project.description_pt;
        if (project.imageUrl !== undefined) dbPayload.image_url = project.imageUrl;
        if (project.technologies !== undefined) dbPayload.technologies = project.technologies;
        if (project.demoUrl !== undefined) dbPayload.demo_url = project.demoUrl;
        if (project.githubUrl !== undefined) dbPayload.github_url = project.githubUrl;

        const { data, error } = await supabase
            .from('projects')
            .update(dbPayload)
            .eq('id', id)
            .select(`
                id,
                title,
                description:description_en,
                description_en,
                description_pt,
                imageUrl:image_url,
                technologies,
                demoUrl:demo_url,
                githubUrl:github_url,
                createdAt:created_at
            `)
            .single();

        if (error) throw error;

        return data as Project;
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
