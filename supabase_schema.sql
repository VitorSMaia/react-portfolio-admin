-- Create the projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
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

-- Create a policy that allows authenticated users to insert/update/delete
-- For simplicity in this demo, we might allow public write if you don't have auth set up yet, 
-- BUT for security we'll restrict to authenticated or just allow all for now to make it work easily for you.
-- UNCOMMENT THE POLICY BELOW THAT MATCHES YOUR NEEDS:

-- OPTION A: Allow ALL access (Easiest for testing, NOT for production)
create policy "Allow all access"
  on public.projects
  for all
  to public
  using (true)
  with check (true);

-- OPTION B: Authenticated only for write (Recommended if you have Auth)
-- create policy "Allow authenticated upload"
--   on public.projects
--   for insert
--   to authenticated
--   with check (true);
