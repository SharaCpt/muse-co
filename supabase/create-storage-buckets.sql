-- Create Storage Buckets for CMS
-- Run this AFTER running cms-setup.sql

-- Create portfolio bucket (for model images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio',
  'portfolio',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create homepage bucket (for hero and service cards)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'homepage',
  'homepage',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create headers bucket (for page header backgrounds)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'headers',
  'headers',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Set storage policies to allow public access
CREATE POLICY "Public Access to Portfolio Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio');

CREATE POLICY "Anyone can upload to Portfolio"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Anyone can delete from Portfolio"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'portfolio');

CREATE POLICY "Public Access to Homepage Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'homepage');

CREATE POLICY "Anyone can upload to Homepage"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'homepage');

CREATE POLICY "Anyone can delete from Homepage"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'homepage');

CREATE POLICY "Public Access to Header Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'headers');

CREATE POLICY "Anyone can upload to Headers"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'headers');

CREATE POLICY "Anyone can delete from Headers"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'headers');
