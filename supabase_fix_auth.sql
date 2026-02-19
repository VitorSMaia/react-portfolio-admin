-- 1. Cleaning up previous attempts to avoid conflicts
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 2. Ensure the profiles table exists (if it failed before)
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  name text,
  role text default 'EDITOR',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Ensure RLS is on
alter table public.profiles enable row level security;

-- 3. Reset policies to be sure
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 4. recreate function with MORE ROBUST logic
-- It now handles null metadata and catches errors so it doesn't block user creation.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  user_name text;
begin
  -- Get name from metadata or use default
  user_name := coalesce(new.raw_user_meta_data ->> 'name', 'Admin User');

  insert into public.profiles (id, name, role, avatar_url)
  values (
    new.id,
    user_name,
    'EDITOR', -- Default role
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id
  );
  return new;
exception
  when others then
    -- IMPORTANT: If profile creation fails, we logged it but we ALLOW the user creation.
    -- This prevents the "Database error" from blocking signup.
    raise warning 'Error in handle_new_user: %', SQLERRM;
    return new;
end;
$$;

-- 5. Re-attach the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
