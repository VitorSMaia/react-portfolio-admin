-- 1. Criação da tabela de categorias de habilidades (Skill Categories)
create table public.skill_categories (
  id uuid default gen_random_uuid() primary key,
  key text not null unique,               -- Ex: 'frontend', 'backend', 'devops'
  label_en text not null,                 -- Nome em Inglês
  label_pt text not null,                 -- Nome em Português
  icon text,                              -- Nome do ícone (Lucide, FontAwesome, etc)
  color text,                             -- Código Hex ou classe CSS
  description_en text,                    -- Descrição em Inglês
  description_pt text,                    -- Descrição em Português
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Row Level Security (RLS)
alter table public.skill_categories enable row level security;

-- 3. Política para permitir leitura pública
create policy "Allow public read access"
  on public.skill_categories
  for select
  to public
  using (true);

-- 4. Política para permitir que usuários autenticados gerenciem as categorias
-- Nota: "for all" cobre INSERT, UPDATE e DELETE.
create policy "Allow authenticated CRUD"
  on public.skill_categories
  for all
  to authenticated
  using (true)
  with check (true);