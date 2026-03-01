-- 1. Add bilingual professional_bio columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS professional_bio_pt text,
ADD COLUMN IF NOT EXISTS professional_bio_en text;

-- 2. Migrate existing data if available
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='professional_bio') THEN
        UPDATE public.profiles 
        SET professional_bio_en = professional_bio 
        WHERE professional_bio_en IS NULL AND professional_bio IS NOT NULL;
        
        -- After migration, safely drop the old column
        ALTER TABLE public.profiles DROP COLUMN professional_bio;
    END IF;
END $$;

-- 3. Create a view for visitor statistics
DROP VIEW IF EXISTS public.visitor_stats;

CREATE OR REPLACE VIEW public.visitor_stats AS
SELECT 
    MIN(id::text) as id,
    ip_address,
    MAX(created_at) as created_at,
    COUNT(*) as total_visits,
    COALESCE(MAX(country), 'Unknown') as country,
    COALESCE(MAX(city), 'Unknown') as city,
    COALESCE(MAX(latitude), 0) as latitude,
    COALESCE(MAX(longitude), 0) as longitude,
    MAX(session_id) as session_id,
    MAX(user_agent) as user_agent
FROM public.visitor_logs
GROUP BY ip_address;

GRANT SELECT ON public.visitor_stats TO authenticated;
GRANT SELECT ON public.visitor_stats TO anon;
GRANT SELECT ON public.visitor_logs TO authenticated;
GRANT SELECT ON public.visitor_logs TO anon;
