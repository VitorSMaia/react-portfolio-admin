-- Add category_id to skills table and link to skill_categories
alter table public.skills 
add column category_id uuid references public.skill_categories(id) on delete set null;

-- Optional: If you want to migrate existing data, you'll need additional steps here. 
-- For now, we'll keep it simple as requested.
