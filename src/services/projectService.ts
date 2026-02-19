
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

export const projectService = {
    async getAll() {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                id,
                title,
                description,
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
                description,
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
        // Map camelCase to snake_case for DB if needed, but for now assuming DB columns match or we map here
        // Our SQL schema used snake_case: image_url, demo_url, github_url
        // Type 'Project' likely uses camelCase. Let's check types.

        const dbPayload = {
            title: project.title,
            description: project.description,
            image_url: project.imageUrl,
            technologies: project.technologies,
            demo_url: project.demoUrl,
            github_url: project.githubUrl,
            // created_at is auto-handled by default or we can pass it
        };

        const { data, error } = await supabase
            .from('projects')
            .insert(dbPayload)
            .select(`
                id,
                title,
                description,
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
        const dbPayload: any = {};
        if (project.title !== undefined) dbPayload.title = project.title;
        if (project.description !== undefined) dbPayload.description = project.description;
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
                description,
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
