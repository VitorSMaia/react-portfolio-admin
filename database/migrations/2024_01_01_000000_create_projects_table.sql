-- Create the projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description_en text not null,
  description_pt text not null,
  image_url text not null,
  technologies text[] not null default '{}',
  demo_url text,
  github_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.projects enable row level security;

-- Create a policy that allows anyone to read projects
create policy "Allow public read access"
  on public.projects
  for select
  to public
  using (true);

-- Create a policy that allows all access for testing purposes
create policy "Allow all access"
  on public.projects
  for all
  to public
  using (true)
  with check (true);