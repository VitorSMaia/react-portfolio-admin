export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'EDITOR';
    avatar?: string;
    github_url?: string;
    linkedin_url?: string;
    professional_bio_pt?: string;
    professional_bio_en?: string;
}
