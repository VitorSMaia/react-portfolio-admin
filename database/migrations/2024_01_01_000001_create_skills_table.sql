
-- Create the skills table
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null, -- e.g., 'Frontend', 'Backend', 'DevOps', 'Tools'
  proficiency integer not null default 50, -- 1 to 100
  icon text, -- URL or icon class name
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.skills enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.skills
  for select
  to public
  using (true);

-- Create policy to allow authenticated users to manage skills
create policy "Allow authenticated CRUD"
  on public.skills
  for all
  to authenticated
  using (true)
  with check (true);
