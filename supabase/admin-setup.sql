-- Admin Dashboard: Site Images Table
-- This table stores all dynamic images used across the website
-- Shara can update these from the admin dashboard

CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE, -- e.g., 'homepage_hero', 'vip_hostess_card', 'brand_ambassador_card'
  image_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_site_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_images_updated_at
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  EXECUTE FUNCTION update_site_images_updated_at();

-- Enable Row Level Security
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for website visitors)
CREATE POLICY "Public read access for site images"
  ON site_images
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert/update/delete (admin only via service role key)
CREATE POLICY "Admin write access for site images"
  ON site_images
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Seed initial data with current homepage images
INSERT INTO site_images (section, image_url, alt_text) VALUES
  ('homepage_hero', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070', 'Elegant model in luxury setting'),
  ('vip_hostess_card', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070', 'Professional VIP hostess'),
  ('brand_ambassador_card', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887', 'Elegant brand ambassador'),
  ('event_hostess_card', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071', 'Professional event hostess'),
  ('portfolio_preview_1', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070', 'Portfolio preview 1'),
  ('portfolio_preview_2', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070', 'Portfolio preview 2'),
  ('portfolio_preview_3', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887', 'Portfolio preview 3')
ON CONFLICT (section) DO NOTHING;

-- Update storage bucket policies for admin uploads
-- Note: Run this after creating 'website-images' bucket in Supabase dashboard

-- Allow public read access to website-images bucket
CREATE POLICY "Public read access for website images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'website-images');

-- Allow authenticated users to upload to website-images bucket
CREATE POLICY "Admin upload access for website images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update website images
CREATE POLICY "Admin update access for website images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete website images
CREATE POLICY "Admin delete access for website images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'website-images' AND auth.role() = 'authenticated');
