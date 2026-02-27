-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public contact form)
CREATE POLICY "Allow public insertion" 
ON public.contact_messages 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view messages
CREATE POLICY "Allow authenticated read" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (true);
