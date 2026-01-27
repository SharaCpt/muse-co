-- ============================================
-- MUSE & CO - Supabase Database Setup
-- ============================================
-- Run this in your Supabase SQL Editor
-- This creates all tables, storage buckets, and security policies

-- ============================================
-- 1. STORAGE BUCKETS
-- ============================================

-- Create portfolio images bucket (public read, auth write)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Create gallery images bucket (public read, auth write)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. MODELS/TALENT TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Info
  name VARCHAR(255),
  category VARCHAR(100), -- 'VIP Hostess', 'Brand Ambassador', 'Yacht Staff', 'Event Hostess'
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'inactive', 'unavailable'
  featured BOOLEAN DEFAULT false,
  
  -- Profile Details
  bio TEXT,
  age INTEGER,
  height INTEGER, -- in cm
  languages TEXT[], -- array of languages
  
  -- Images
  profile_image_url TEXT,
  gallery_images TEXT[], -- array of image URLs
  
  -- Availability
  available_from DATE,
  available_until DATE,
  
  -- Tags
  tags TEXT[], -- 'luxury', 'yacht', 'nightlife', 'brand-launch', etc.
  
  -- Pricing (optional - can be handled privately)
  rate_type VARCHAR(50), -- 'hourly', 'daily', 'event'
  
  -- SEO
  slug VARCHAR(255) UNIQUE,
  
  -- Soft delete
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_models_category ON models(category);
CREATE INDEX IF NOT EXISTS idx_models_status ON models(status);
CREATE INDEX IF NOT EXISTS idx_models_featured ON models(featured);
CREATE INDEX IF NOT EXISTS idx_models_slug ON models(slug);

-- ============================================
-- 3. CONTACT FORM SUBMISSIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Form Data
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  event_type VARCHAR(100), -- 'Yacht Party', 'Brand Launch', 'VIP Event', 'Nightlife', 'Other'
  event_date DATE,
  guest_count INTEGER,
  budget_range VARCHAR(100),
  message TEXT,
  
  -- Status Tracking
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'quoted', 'booked', 'archived'
  priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  assigned_to VARCHAR(255), -- Staff member handling inquiry
  
  -- Follow-up
  notes TEXT,
  follow_up_date DATE,
  
  -- Source tracking
  source VARCHAR(100) DEFAULT 'website', -- 'website', 'whatsapp', 'referral'
  referrer TEXT,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_event_date ON contact_submissions(event_date);

-- ============================================
-- 4. BOOKINGS TABLE (Optional - for confirmed bookings)
-- ============================================

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Client Info
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  company_name VARCHAR(255),
  
  -- Event Details
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_start_time TIME,
  event_end_time TIME,
  event_location VARCHAR(500),
  guest_count INTEGER,
  
  -- Staffing
  staff_count INTEGER,
  model_ids UUID[], -- Array of model IDs assigned
  special_requirements TEXT,
  
  -- Financial
  total_amount DECIMAL(10, 2),
  deposit_amount DECIMAL(10, 2),
  deposit_paid BOOLEAN DEFAULT false,
  final_payment_paid BOOLEAN DEFAULT false,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  
  -- Notes
  internal_notes TEXT,
  client_notes TEXT,
  
  -- Contracts
  contract_signed BOOLEAN DEFAULT false,
  contract_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date DESC);

-- ============================================
-- 5. SERVICES TABLE (For CMS-style content management)
-- ============================================

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  features TEXT[], -- array of feature points
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Pricing (can be ranges or custom)
  pricing_info TEXT,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);

-- ============================================
-- 6. TESTIMONIALS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  quote TEXT NOT NULL,
  author_name VARCHAR(255),
  author_role VARCHAR(255),
  company VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Optional
  avatar_url TEXT,
  event_type VARCHAR(100) -- ties back to what service they used
);

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published);

-- ============================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view active models" ON models
  FOR SELECT USING (status = 'active' AND deleted_at IS NULL);

CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view published testimonials" ON testimonials
  FOR SELECT USING (is_published = true);

-- Anyone can submit contact forms
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Authenticated users full access to models" ON models
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access to contacts" ON contact_submissions
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access to bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access to services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access to testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 8. STORAGE POLICIES
-- ============================================

-- Portfolio bucket: public read, auth write
CREATE POLICY "Public can view portfolio images" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Authenticated can upload portfolio images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update portfolio images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete portfolio images" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Gallery bucket: public read, auth write
CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update gallery images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete gallery images" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- ============================================
-- 9. FUNCTIONS & TRIGGERS
-- ============================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to relevant tables
CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. SEED DATA (Optional initial services)
-- ============================================

INSERT INTO services (title, slug, description, features, display_order, is_active) VALUES
(
  'Yacht & Luxury Concierge',
  'yacht-concierge',
  'Exclusive staffing for luxury yacht experiences, private villas, and elite golf events.',
  ARRAY['Luxury yacht staff and hostesses', 'Golf cart ladies', 'Private villa event staff', 'VIP travel companions', 'Champagne service professionals'],
  1,
  true
),
(
  'Luxury Brand Launches',
  'brand-launches',
  'Elevate your brand with stunning female professionals for product launches and activations.',
  ARRAY['Brand activations', 'Fashion events', 'VIP corporate functions', 'Brand ambassador programs', 'Promotional models'],
  2,
  true
),
(
  'VIP Nightlife Staffing',
  'vip-nightlife',
  'Elite VIP hostesses and entertainment staff for upscale clubs and private parties.',
  ARRAY['VIP hostesses', 'Professional dancers', 'Bottle service models', 'Event coordination', 'Promotional teams'],
  3,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Run this script in Supabase SQL Editor
-- 2. Create your first admin user in Authentication
-- 3. Upload test images to storage buckets
-- 4. Add models via the tables or build an admin panel
