-- Create visitor_logs table
create table public.visitor_logs (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    ip_address text,
    country text,
    city text,
    latitude numeric,
    longitude numeric,
    session_id text,
    user_agent text,
    raw_data jsonb default '{}'::jsonb
);

-- Turn on Row Level Security
alter table public.visitor_logs enable row level security;

-- Create policy that allows anyone to insert (track guest visits)
create policy "Allow public insert access"
  on public.visitor_logs
  for insert
  to public
  with check (true);

-- Create policy that allows authenticated users to read
create policy "Allow authenticated select access"
  on public.visitor_logs
  for select
  to authenticated
  using (true);
