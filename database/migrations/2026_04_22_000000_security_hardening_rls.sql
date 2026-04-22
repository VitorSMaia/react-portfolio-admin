-- =============================================================================
-- Endurecimento de segurança (RLS, grants, view)
-- Aplica no Supabase: SQL Editor > colar e executar (ou supabase db push).
--
-- Requisitos operacionais:
-- 1) O perfil público do site deve ter role = 'ADMIN' (homepage lê só ADMIN).
-- 2) Se ainda tiveres a política antiga "qualquer autenticado lê tudo", este
--    script remove e substitui por acesso apenas a staff (ADMIN/EDITOR).
-- 3) Desativa inscrições públicas em Auth se não quiseres que qualquer conta
--    com role EDITOR aceda ao CMS (o modelo actual trata EDITOR como staff).
-- =============================================================================

-- Função auxiliar: bypassa RLS em profiles apenas para ler o teu papel.
CREATE OR REPLACE FUNCTION public.is_portfolio_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT p.role IN ('ADMIN', 'EDITOR')
      FROM public.profiles AS p
      WHERE p.id = auth.uid()
    ),
    false
  );
$$;

REVOKE ALL ON FUNCTION public.is_portfolio_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_portfolio_staff() TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- projects: remove escrita anónima (política "Allow all access").
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access" ON public.projects;
DROP POLICY IF EXISTS "Allow all access" ON public.projects;
DROP POLICY IF EXISTS "projects_public_read" ON public.projects;
DROP POLICY IF EXISTS "projects_staff_insert" ON public.projects;
DROP POLICY IF EXISTS "projects_staff_update" ON public.projects;
DROP POLICY IF EXISTS "projects_staff_delete" ON public.projects;

CREATE POLICY "projects_public_read"
  ON public.projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "projects_staff_insert"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_portfolio_staff());

CREATE POLICY "projects_staff_update"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (public.is_portfolio_staff())
  WITH CHECK (public.is_portfolio_staff());

CREATE POLICY "projects_staff_delete"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (public.is_portfolio_staff());

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access" ON public.skills;
DROP POLICY IF EXISTS "Allow authenticated CRUD" ON public.skills;
DROP POLICY IF EXISTS "skills_public_read" ON public.skills;
DROP POLICY IF EXISTS "skills_staff_insert" ON public.skills;
DROP POLICY IF EXISTS "skills_staff_update" ON public.skills;
DROP POLICY IF EXISTS "skills_staff_delete" ON public.skills;

CREATE POLICY "skills_public_read"
  ON public.skills
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "skills_staff_insert"
  ON public.skills
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_portfolio_staff());

CREATE POLICY "skills_staff_update"
  ON public.skills
  FOR UPDATE
  TO authenticated
  USING (public.is_portfolio_staff())
  WITH CHECK (public.is_portfolio_staff());

CREATE POLICY "skills_staff_delete"
  ON public.skills
  FOR DELETE
  TO authenticated
  USING (public.is_portfolio_staff());

-- ---------------------------------------------------------------------------
-- skill_categories
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access" ON public.skill_categories;
DROP POLICY IF EXISTS "Allow authenticated CRUD" ON public.skill_categories;
DROP POLICY IF EXISTS "skill_categories_public_read" ON public.skill_categories;
DROP POLICY IF EXISTS "skill_categories_staff_insert" ON public.skill_categories;
DROP POLICY IF EXISTS "skill_categories_staff_update" ON public.skill_categories;
DROP POLICY IF EXISTS "skill_categories_staff_delete" ON public.skill_categories;

CREATE POLICY "skill_categories_public_read"
  ON public.skill_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "skill_categories_staff_insert"
  ON public.skill_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_portfolio_staff());

CREATE POLICY "skill_categories_staff_update"
  ON public.skill_categories
  FOR UPDATE
  TO authenticated
  USING (public.is_portfolio_staff())
  WITH CHECK (public.is_portfolio_staff());

CREATE POLICY "skill_categories_staff_delete"
  ON public.skill_categories
  FOR DELETE
  TO authenticated
  USING (public.is_portfolio_staff());

-- ---------------------------------------------------------------------------
-- profiles: leitura pública só ADMIN; utilizador vê o próprio; staff vê lista.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_scoped" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

CREATE POLICY "profiles_select_scoped"
  ON public.profiles
  FOR SELECT
  TO public
  USING (
    role = 'ADMIN'
    OR auth.uid() = id
    OR public.is_portfolio_staff()
  );

CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- contact_messages: inserção pública; leitura só staff.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public insertion" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_public_insert" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_staff_select" ON public.contact_messages;

CREATE POLICY "contact_messages_public_insert"
  ON public.contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "contact_messages_staff_select"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_portfolio_staff());

-- ---------------------------------------------------------------------------
-- visitor_logs: inserção pública (tracking); leitura só staff.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public insert access" ON public.visitor_logs;
DROP POLICY IF EXISTS "Allow authenticated select access" ON public.visitor_logs;
DROP POLICY IF EXISTS "visitor_logs_public_insert" ON public.visitor_logs;
DROP POLICY IF EXISTS "visitor_logs_staff_select" ON public.visitor_logs;

CREATE POLICY "visitor_logs_public_insert"
  ON public.visitor_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "visitor_logs_staff_select"
  ON public.visitor_logs
  FOR SELECT
  TO authenticated
  USING (public.is_portfolio_staff());

-- Anon não deve ler IPs / logs brutos (migration antiga concedia SELECT).
REVOKE SELECT ON public.visitor_logs FROM anon;
GRANT INSERT ON public.visitor_logs TO anon;

-- ---------------------------------------------------------------------------
-- visitor_stats: view com security_invoker para aplicar RLS em visitor_logs.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS public.visitor_stats;

CREATE VIEW public.visitor_stats WITH (security_invoker = true) AS
SELECT
  min(id::text) AS id,
  ip_address,
  max(created_at) AS created_at,
  count(*) AS total_visits,
  coalesce(max(country), 'Unknown') AS country,
  coalesce(max(city), 'Unknown') AS city,
  coalesce(max(latitude), 0) AS latitude,
  coalesce(max(longitude), 0) AS longitude,
  max(session_id) AS session_id,
  max(user_agent) AS user_agent
FROM public.visitor_logs
GROUP BY ip_address;

REVOKE ALL ON public.visitor_stats FROM PUBLIC;
GRANT SELECT ON public.visitor_stats TO authenticated;
