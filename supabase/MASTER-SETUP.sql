-- ============================================
-- MUSE & CO - MASTER SQL SETUP
-- ============================================
-- Run this ENTIRE file in your Supabase SQL Editor
-- This will set up/update all tables for the admin dashboard
-- ============================================

-- ============================================
-- 1. PORTFOLIO IMAGES - Add Stats Columns
-- ============================================

-- Add new columns to portfolio_images table (if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_images' AND column_name = 'age') THEN
    ALTER TABLE portfolio_images ADD COLUMN age INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_images' AND column_name = 'height') THEN
    ALTER TABLE portfolio_images ADD COLUMN height INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_images' AND column_name = 'weight') THEN
    ALTER TABLE portfolio_images ADD COLUMN weight INTEGER;
  END IF;
END $$;

-- ============================================
-- 2. SITE IMAGES TABLE (for page images)
-- ============================================

-- Drop and recreate to ensure correct schema
DROP TABLE IF EXISTS site_images CASCADE;

CREATE TABLE site_images (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  label TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_images
CREATE POLICY "Anyone can view site images" ON site_images FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert site images" ON site_images FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update site images" ON site_images FOR UPDATE TO public USING (true);
CREATE POLICY "Anyone can delete site images" ON site_images FOR DELETE TO public USING (true);

-- Indexes
CREATE INDEX idx_site_images_page ON site_images(page);
CREATE INDEX idx_site_images_section ON site_images(section);

-- ============================================
-- 3. SITE CONTENT TABLE (for editable text)
-- ============================================

DROP TABLE IF EXISTS site_content CASCADE;

CREATE TABLE site_content (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_content
CREATE POLICY "Anyone can view site content" ON site_content FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert site content" ON site_content FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update site content" ON site_content FOR UPDATE TO public USING (true);
CREATE POLICY "Anyone can delete site content" ON site_content FOR DELETE TO public USING (true);

-- Index
CREATE INDEX idx_site_content_page ON site_content(page);

-- ============================================
-- 4. INSERT DEFAULT EDITABLE CONTENT
-- ============================================

INSERT INTO site_content (id, page, section, content) VALUES
-- Homepage
('home_hero_tagline', 'Homepage', 'Hero Tagline', 'Elite Companions • VIP Experiences • Global Luxury'),
('home_hero_subtitle', 'Homepage', 'Hero Subtitle', 'Curating South Africa''s most beautiful models and sophisticated companions for luxury experiences worldwide. From intimate private encounters to exclusive international arrangements, we deliver unparalleled beauty, elegance, and absolute discretion to discerning clientele across the globe.'),

-- About Page
('about_intro', 'About', 'Introduction', 'MUSE & CO was founded on the principle that true luxury is found in beauty, elegance, and unforgettable moments.'),
('about_story', 'About', 'Our Story', 'With over a decade of experience curating elite companionship and sophisticated lifestyle experiences, we connect discerning clients worldwide with South Africa''s most beautiful and refined models, influencers, and private companions.'),
('about_shara', 'About', 'Meet Shara', 'Founder and curator of MUSE & CO, Shara brings over a decade of expertise in elite companionship curation and luxury lifestyle experiences. Her meticulous approach to connecting discerning clients with exceptional women has made MUSE & CO the premier choice for sophisticated companionship worldwide.'),

-- Services Page
('services_intro', 'Services', 'Introduction', 'From intimate gatherings to grand celebrations, we provide bespoke companionship and lifestyle services tailored to your exact preferences.'),
('services_luxury', 'Services', 'Luxury Lifestyle', 'Exquisite models and sophisticated companions for exclusive private experiences and luxury occasions. Our elite women deliver beauty, elegance, and impeccable presence with absolute discretion.'),
('services_private', 'Services', 'Private Arrangements', 'Bespoke long-term arrangements for discerning clients seeking sophisticated companionship. From ongoing business travel to extended private experiences, we curate exclusive relationships built on trust, elegance, and absolute discretion.'),
('services_nightlife', 'Services', 'VIP Nightlife', 'Elevate your evening with stunning models and charismatic companions. Our elite women bring sophistication, energy, and undeniable presence to exclusive clubs, private parties, and VIP experiences.'),

-- Portfolio Page  
('portfolio_intro', 'Portfolio', 'Introduction', 'Handpicked professionals for luxury events, sophisticated gatherings, and exclusive private experiences across Cape Town'),

-- Pricing Page
('pricing_intro', 'Pricing', 'Introduction', 'Transparent pricing for exceptional service. All rates are starting prices and may vary based on specific requirements and arrangements.'),

-- Contact Page
('contact_intro', 'Contact', 'Introduction', 'Ready to elevate your next event? Contact us for a personalized consultation and discover how MUSE & CO can bring your vision to life.')

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. INSERT DEFAULT SITE IMAGES
-- ============================================

INSERT INTO site_images (id, page, section, label, image_url, description) VALUES
-- Homepage Images
('homepage_hero', 'Homepage', 'hero', 'Hero Background', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2400', 'Main hero image on homepage'),
('homepage_service_1', 'Homepage', 'service_card_1', 'VIP Nightlife', 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200', 'VIP Nightlife card'),
('homepage_service_2', 'Homepage', 'service_card_2', 'Luxury Concierge', 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?q=80&w=1200', 'Luxury Concierge card'),
('homepage_service_3', 'Homepage', 'service_card_3', 'Travel Companion', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200', 'Travel Companionship card'),
('homepage_service_4', 'Homepage', 'service_card_4', 'Private Events', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200', 'Private Events card'),
('homepage_model_1', 'Homepage', 'model_card_1', 'Event Hostess', 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?q=80&w=800', 'Event Hostess model'),
('homepage_model_2', 'Homepage', 'model_card_2', 'Private Companion', 'https://images.unsplash.com/photo-1540316264016-aeb7538f4d6f?q=80&w=800', 'Private Companion model'),
('homepage_model_3', 'Homepage', 'model_card_3', 'VIP Hostess', 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=800', 'VIP Hostess model'),

-- Services Page Images
('services_detail_1', 'Services', 'luxury_lifestyle', 'Luxury Lifestyle', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200', 'Luxury Lifestyle section'),
('services_detail_2', 'Services', 'private_arrangements', 'Private Arrangements', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200', 'Private Arrangements section'),
('services_detail_3', 'Services', 'nightlife', 'VIP Nightlife', 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200', 'VIP Nightlife section'),

-- Page Headers
('header_portfolio', 'Headers', 'portfolio', 'Portfolio Header', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000', 'Portfolio page header'),
('header_services', 'Headers', 'services', 'Services Header', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000', 'Services page header'),
('header_pricing', 'Headers', 'pricing', 'Pricing Header', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000', 'Pricing page header'),
('header_contact', 'Headers', 'contact', 'Contact Header', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000', 'Contact page header'),
('header_about', 'Headers', 'about', 'About Header', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000', 'About page header')

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6. ENSURE PORTFOLIO_IMAGES TABLE EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS portfolio_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  age INTEGER,
  height INTEGER,
  weight INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on portfolio_images if not already
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Public can view active portfolio images" ON portfolio_images;
DROP POLICY IF EXISTS "Anyone can manage portfolio images" ON portfolio_images;

CREATE POLICY "Public can view active portfolio images" ON portfolio_images FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Anyone can manage portfolio images" ON portfolio_images FOR ALL TO public USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_images(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio_images(is_active);

-- ============================================
-- 7. STORAGE BUCKET SETUP REMINDER
-- ============================================
-- IMPORTANT: You also need to create these storage buckets manually in Supabase:
-- 
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create bucket: "portfolio" (make it PUBLIC)
-- 3. Create bucket: "website-images" (make it PUBLIC)
--
-- Then run these storage policies:

-- Storage policies for portfolio bucket
DROP POLICY IF EXISTS "Public portfolio read" ON storage.objects;
DROP POLICY IF EXISTS "Public portfolio write" ON storage.objects;

CREATE POLICY "Public portfolio read" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Public portfolio write" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Public portfolio update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio');
CREATE POLICY "Public portfolio delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');

-- Storage policies for website-images bucket
CREATE POLICY "Public website-images read" ON storage.objects FOR SELECT USING (bucket_id = 'website-images');
CREATE POLICY "Public website-images write" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-images');
CREATE POLICY "Public website-images update" ON storage.objects FOR UPDATE USING (bucket_id = 'website-images');
CREATE POLICY "Public website-images delete" ON storage.objects FOR DELETE USING (bucket_id = 'website-images');

-- ============================================
-- 8. UPDATE BESPOKE EXPERIENCE IMAGES
-- ============================================
-- Curated luxury images for each bespoke experience

-- Temporarily allow public updates to bypass RLS for this update
DROP POLICY IF EXISTS "temp_bespoke_update" ON bespoke_experiences;
CREATE POLICY "temp_bespoke_update" ON bespoke_experiences FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Update each bespoke experience with relevant luxury images
UPDATE bespoke_experiences SET image_url = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200', updated_at = NOW() WHERE experience_name = 'WEEKEND ESCAPE';
UPDATE bespoke_experiences SET image_url = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200', updated_at = NOW() WHERE experience_name = 'YACHT EXPERIENCE';
UPDATE bespoke_experiences SET image_url = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200', updated_at = NOW() WHERE experience_name = 'INTERNATIONAL TRAVEL';
UPDATE bespoke_experiences SET image_url = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200', updated_at = NOW() WHERE experience_name = 'EXCLUSIVE DINNER DATE';

-- Remove temporary policy
DROP POLICY IF EXISTS "temp_bespoke_update" ON bespoke_experiences;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- 
-- Next steps:
-- 1. Create storage buckets in Supabase Dashboard (portfolio, website-images)
-- 2. Make both buckets PUBLIC
-- 3. Test the admin dashboard
-- 4. Push to GitHub and deploy to Vercel
--
-- ============================================
