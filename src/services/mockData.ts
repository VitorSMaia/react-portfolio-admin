import type { Project, Skill } from '@/types';

// Initial data
const initialProjects: Project[] = [
    {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-featured online store built with React and Node.js.',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
        demoUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        createdAt: '2023-01-15',
    },
    {
        id: '2',
        title: 'Task Management App',
        description: 'A productivity tool for teams to manage tasks and projects.',
        imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80',
        technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        createdAt: '2023-03-22',
    },
    {
        id: '3',
        title: 'Portfolio Website',
        description: 'A personal portfolio website to showcase work and skills.',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        createdAt: '2023-05-10',
    },
];

const initialSkills: Skill[] = [
    { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
    { id: '2', name: 'TypeScript', category: 'frontend', proficiency: 85 },
    { id: '3', name: 'Node.js', category: 'backend', proficiency: 80 },
    { id: '4', name: 'Python', category: 'backend', proficiency: 75 },
    { id: '5', name: 'Docker', category: 'tools', proficiency: 70 },
    { id: '6', name: 'Git', category: 'tools', proficiency: 95 },
    { id: '7', name: 'Communication', category: 'soft-skills', proficiency: 90 },
];

// Helper to load/save from localStorage
const loadData = <T,>(key: string, initial: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
};

// We export mutable arrays to simulate a DB. 
// In a real app we'd use async methods, but for this mock we'll use direct access + sync updates.
export let mockProjects: Project[] = loadData('projects', initialProjects);
export let mockSkills: Skill[] = loadData('skills', initialSkills);

// Simple observer pattern to notify components of changes (optional enhancement)
// or we just reload page. For simplicity, we just update the exports.
// NOTE: This "live" update won't work perfectly with ES modules import.
// A better approach for the components is to use a hook or context, 
// but given the restrictions, we'll keep it simple: Components should re-fetch 
// (or in our case, re-read) data when they mount or update.
// We will export functions to modify data.

export const getProjects = () => loadData<Project[]>('projects', initialProjects);
export const saveProjects = (projects: Project[]) => {
    localStorage.setItem('projects', JSON.stringify(projects));
    mockProjects = projects;
};

export const getSkills = () => loadData<Skill[]>('skills', initialSkills);
export const saveSkills = (skills: Skill[]) => {
    localStorage.setItem('skills', JSON.stringify(skills));
    mockSkills = skills;
};
