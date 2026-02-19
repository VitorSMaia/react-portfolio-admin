-- Create a table for public profiles
-- NOTE: Passwords and Emails are stored securely in Supabase's internal 'auth.users' table.
-- This 'profiles' table is only for extra public information like name and avatar.
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  name text,
  role text default 'EDITOR', -- 'ADMIN' or 'EDITOR'
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Turn on Row Level Security
alter table public.profiles enable row level security;

-- Policy: Anyone can read profiles (needed for showing author info if we had it)
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

-- Policy: Users can update their own profile
create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, role, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    'EDITOR', -- Default role
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id
  );
  return new;
end;
$$;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
