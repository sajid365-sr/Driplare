
-- Create function to create blogs table
CREATE OR REPLACE FUNCTION public.create_blogs_table_function()
RETURNS void AS $$
BEGIN
    -- Create blogs table if it doesn't exist
    CREATE TABLE IF NOT EXISTS public.blogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        cover_image TEXT,
        tags TEXT[] DEFAULT '{}',
        category TEXT DEFAULT 'Uncategorized',
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        published_at TIMESTAMP WITH TIME ZONE,
        is_archived BOOLEAN NOT NULL DEFAULT false
    );
    
    -- Enable Row Level Security
    ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
    
    -- Create policies for different roles
    CREATE POLICY "Enable read access for all users" ON public.blogs
        FOR SELECT
        USING (true);
    
    CREATE POLICY "Enable edit for authenticated users only" ON public.blogs
        FOR UPDATE
        USING (auth.role() = 'authenticated');
    
    CREATE POLICY "Enable insert for authenticated users only" ON public.blogs
        FOR INSERT
        WITH CHECK (auth.role() = 'authenticated');
    
    CREATE POLICY "Enable delete for authenticated users only" ON public.blogs
        FOR DELETE
        USING (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql;

-- Function to be called directly via RPC
CREATE OR REPLACE FUNCTION public.create_blogs_table()
RETURNS void AS $$
BEGIN
    PERFORM public.create_blogs_table_function();
END;
$$ LANGUAGE plpgsql;
