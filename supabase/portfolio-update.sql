-- Portfolio Images Update - Add Stats Fields
-- Run this in your Supabase SQL Editor

-- Add new columns to portfolio_images table
ALTER TABLE portfolio_images 
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS height INTEGER,  -- in cm
ADD COLUMN IF NOT EXISTS weight INTEGER;  -- in kg

-- Site Content Table for Editable Text Blurbs
-- This allows admin to edit key text across the website

CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view site content"
ON site_content FOR SELECT
TO public
USING (true);

-- Public write access (your cookie-based auth handles admin protection)
CREATE POLICY "Can insert site content"
ON site_content FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Can update site content"
ON site_content FOR UPDATE
TO public
USING (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_site_content_page ON site_content(page);

-- Insert default content (key editable text blurbs)
INSERT INTO site_content (id, page, section, content) VALUES
-- Homepage
('home_hero_tagline', 'Homepage', 'Hero Tagline', 'Cape Town''s Premier Elite Staffing & Lifestyle Experience Agency'),
('home_hero_subtitle', 'Homepage', 'Hero Subtitle', 'Curating exclusive moments with South Africa''s most refined professionals'),
('home_portfolio_intro', 'Homepage', 'Portfolio Intro', 'Discover our curated selection of elite professionals'),

-- About Page
('about_intro', 'About', 'Introduction', 'Since 2011, MUSE & CO has been Cape Town''s most trusted source for elite staffing and luxury lifestyle experiences.'),
('about_mission', 'About', 'Mission', 'We connect discerning clients with exceptional professionals for unforgettable experiences.'),

-- Services Page
('services_intro', 'Services', 'Introduction', 'From intimate gatherings to grand celebrations, we provide bespoke staffing solutions.'),

-- Portfolio Page  
('portfolio_intro', 'Portfolio', 'Introduction', 'Handpicked professionals for luxury events, sophisticated gatherings, and exclusive private experiences across Cape Town'),

-- Contact Page
('contact_intro', 'Contact', 'Introduction', 'Ready to elevate your next event? Let''s create something extraordinary together.'),

-- Pricing Page
('pricing_intro', 'Pricing', 'Introduction', 'Transparent pricing for exceptional service. All rates are starting prices and may vary based on requirements.')

ON CONFLICT (id) DO NOTHING;
