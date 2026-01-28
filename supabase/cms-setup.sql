-- CMS Database Setup for MUSE & CO Admin Panel
-- Simple image management system for portfolio, homepage, and headers

-- Portfolio Images Table
CREATE TABLE IF NOT EXISTS portfolio_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Homepage Images Table
CREATE TABLE IF NOT EXISTS homepage_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- 'hero', 'service_card_1', 'service_card_2', etc.
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(section)
);

-- Page Headers Table
CREATE TABLE IF NOT EXISTS page_headers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL, -- 'about', 'services', 'pricing', 'portfolio', 'contact'
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(page_name)
);

-- Enable Row Level Security
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_headers ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access, authenticated write access
CREATE POLICY "Public can view active portfolio images"
  ON portfolio_images FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage portfolio images"
  ON portfolio_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view homepage images"
  ON homepage_images FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage homepage images"
  ON homepage_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view page headers"
  ON page_headers FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage page headers"
  ON page_headers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default homepage images (current Unsplash URLs)
INSERT INTO homepage_images (section, image_url, title, description) VALUES
('hero', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2400', 'Hero Background', 'Main homepage hero image'),
('service_card_1', 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200', 'VIP Nightlife', 'VIP Nightlife & Events card'),
('service_card_2', 'https://images.unsplash.com/photo-1540039155733-5cbe8a88f0cd?q=80&w=1200', 'Luxury Concierge', 'Luxury Concierge Services card'),
('service_card_3', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200', 'Travel Companionship', 'Elite Travel Companionship card'),
('service_card_4', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200', 'Bespoke Events', 'Bespoke Private Events card')
ON CONFLICT (section) DO NOTHING;

-- Insert default page headers
INSERT INTO page_headers (page_name, image_url) VALUES
('about', 'https://images.unsplash.com/photo-1519167758481-83f29da8c14c?q=80&w=2000'),
('services', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000'),
('pricing', 'https://images.unsplash.com/photo-1582719471137-c3967ffb0c42?q=80&w=2400'),
('portfolio', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000'),
('contact', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2000')
ON CONFLICT (page_name) DO NOTHING;

-- Insert default portfolio images (current homepage models)
INSERT INTO portfolio_images (name, category, description, image_url, display_order) VALUES
('Available on Request', 'Elite Model', 'Professional elegance for exclusive events', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800', 1),
('Available on Request', 'VIP Companion', 'Sophisticated companionship for luxury experiences', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800', 2),
('Available on Request', 'Executive Companion', 'Exclusive presence for high-profile occasions', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800', 3)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_images(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio_images(is_active);
CREATE INDEX IF NOT EXISTS idx_homepage_section ON homepage_images(section);
CREATE INDEX IF NOT EXISTS idx_headers_page ON page_headers(page_name);
