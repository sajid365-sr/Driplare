
-- Create storage bucket for blog images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('blog_images', 'blog_images', true, false)
ON CONFLICT (id) DO NOTHING;

-- Set up policy to allow public access to read
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog_images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Users Can Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog_images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated Users Can Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog_images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own images
CREATE POLICY "Authenticated Users Can Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog_images' AND auth.role() = 'authenticated');
