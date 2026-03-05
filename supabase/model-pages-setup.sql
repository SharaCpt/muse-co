-- =====================================================
-- PHASE 2: Individual Model Pages Setup
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Add slug column to portfolio_images
ALTER TABLE portfolio_images ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 2. Generate slugs for existing models (lowercase, hyphenated)
UPDATE portfolio_images 
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(name, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL;

-- 3. Create model_gallery table for additional images
CREATE TABLE IF NOT EXISTS model_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID NOT NULL REFERENCES portfolio_images(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable RLS on model_gallery
ALTER TABLE model_gallery ENABLE ROW LEVEL SECURITY;

-- 5. Public read access for model_gallery
CREATE POLICY "Public can view gallery images" ON model_gallery
  FOR SELECT USING (true);

-- 6. Authenticated users can manage gallery images
CREATE POLICY "Authenticated users can insert gallery" ON model_gallery
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery" ON model_gallery
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete gallery" ON model_gallery
  FOR DELETE USING (true);

-- 7. Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_model_gallery_model_id ON model_gallery(model_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_images_slug ON portfolio_images(slug);

-- 8. Add bio column for longer model descriptions on individual pages
ALTER TABLE portfolio_images ADD COLUMN IF NOT EXISTS bio TEXT;

-- Done! Now individual model pages can work.
-- Slugs are auto-generated from names.
