-- Pricing Tables for MUSE & CO
-- This file creates tables for standard pricing rates and bespoke luxury experiences

-- 1. Standard Pricing Rates (Hourly/Daily packages)
CREATE TABLE IF NOT EXISTS pricing_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_name TEXT NOT NULL,
  duration TEXT NOT NULL, -- e.g., "1 Hour", "2 Hours", "5 Hours", "Full Day"
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  features JSONB, -- Array of feature strings
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bespoke Luxury Experiences (Custom packages)
CREATE TABLE IF NOT EXISTS bespoke_experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price DECIMAL(10, 2), -- NULL if "POA" (Price on Application)
  price_label TEXT DEFAULT 'POA', -- "POA" or custom text like "From R50,000"
  image_url TEXT,
  features JSONB, -- Array of feature strings
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pricing_rates_active ON pricing_rates(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_bespoke_experiences_active ON bespoke_experiences(is_active, display_order);

-- Enable Row Level Security
ALTER TABLE pricing_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bespoke_experiences ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view pricing)
CREATE POLICY "Public can view active pricing rates"
  ON pricing_rates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view active bespoke experiences"
  ON bespoke_experiences FOR SELECT
  USING (is_active = true);

-- Admin full access (authenticated users with admin role)
CREATE POLICY "Admins can manage pricing rates"
  ON pricing_rates FOR ALL
  USING (auth.jwt()->>'role' = 'admin');

CREATE POLICY "Admins can manage bespoke experiences"
  ON bespoke_experiences FOR ALL
  USING (auth.jwt()->>'role' = 'admin');

-- Insert default pricing rates
INSERT INTO pricing_rates (package_name, duration, price, description, features, display_order) VALUES
(
  'EXCLUSIVE HOUR',
  '1 Hour',
  8000.00,
  'Perfect for intimate gatherings and brief exclusive events',
  '["Elite model or hostess", "Professional presentation", "Absolute discretion", "Premium service"]',
  1
),
(
  'PREMIUM EXPERIENCE',
  '2 Hours',
  15000.00,
  'Ideal for sophisticated dinner parties and private functions',
  '["Premium model or VIP hostess", "Extended professional service", "Elegant presence", "Discretion guaranteed"]',
  2
),
(
  'ELITE PACKAGE',
  '5 Hours',
  20000.00,
  'Comprehensive coverage for exclusive events and luxury occasions',
  '["Top-tier model or hostess", "Full event support", "VIP treatment", "Complete professionalism"]',
  3
),
(
  'FULL DAY LUXURY',
  'Full Day',
  30000.00,
  'Ultimate luxury experience for all-day events and private engagements',
  '["Elite companion or VIP staffing", "Complete day coverage", "Luxury service excellence", "Unmatched discretion"]',
  4
);

-- Insert default bespoke experiences
INSERT INTO bespoke_experiences (experience_name, tagline, description, price_label, features, display_order) VALUES
(
  'RIVIERA ESCAPE',
  'Curated luxury coastal experiences',
  'Exclusive weekend getaways with South Africa''s most sophisticated companions. Private villas, yacht charters, and bespoke itineraries along the Cape coast.',
  'POA',
  '["Private villa accommodation", "Luxury yacht charter", "Elite companion", "Curated dining experiences", "Complete travel coordination"]',
  1
),
(
  'YACHT WEEKEND',
  'Ultimate maritime luxury',
  'Premium yacht experiences with professional companions. Multi-day charters featuring gourmet dining, water sports, and unforgettable coastal adventures.',
  'POA',
  '["Private yacht charter", "Professional crew", "VIP companions", "Gourmet catering", "Water sports & activities"]',
  2
),
(
  'SAFARI LUXURY',
  'Wilderness meets sophistication',
  'Exclusive safari experiences paired with elite companionship. Five-star lodges, private game drives, and curated bush experiences.',
  'POA',
  '["5-star safari lodge", "Private game drives", "Elite travel companion", "Fine dining", "Complete safari coordination"]',
  3
),
(
  'CORPORATE RETREAT',
  'Executive excellence redefined',
  'Bespoke corporate events and executive retreats with professional VIP staffing. From intimate boardroom meetings to luxury team-building experiences.',
  'POA',
  '["VIP event staffing", "Professional coordination", "Luxury venue arrangements", "Catering management", "Discretion guaranteed"]',
  4
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_pricing_rates_updated_at BEFORE UPDATE ON pricing_rates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bespoke_experiences_updated_at BEFORE UPDATE ON bespoke_experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
