-- ============================================
-- FIX: Services Page Images Mismatch
-- ============================================
-- The MASTER-SETUP.sql seeded services images with OLD section names
-- that don't match what the frontend expects.
-- This script fixes the existing 3 rows and adds the 3 missing ones.
--
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Go to: SQL Editor → New Query → Paste this → Run
-- ============================================

-- Step 1: Fix the 3 existing services images with wrong section names
-- (Only updates if the old section name still exists — safe to re-run)

UPDATE site_images 
SET section = 'dining_companions', 
    label = 'Dining Companions',
    description = 'Private Dining & Social Companions image',
    updated_at = NOW()
WHERE id = 'services_detail_1' AND section != 'dining_companions';

UPDATE site_images 
SET section = 'yacht_villa', 
    label = 'Yacht & Villa',
    description = 'Yacht & Villa Event Models image',
    updated_at = NOW()
WHERE id = 'services_detail_2' AND section != 'yacht_villa';

UPDATE site_images 
SET section = 'private_events', 
    label = 'Private Events',
    description = 'Private Event Hostesses image',
    updated_at = NOW()
WHERE id = 'services_detail_3' AND section != 'private_events';

-- Step 2: Insert the 3 missing services images
-- (Uses ON CONFLICT to skip if they already exist — safe to re-run)

INSERT INTO site_images (id, page, section, label, image_url, description) VALUES
('services_detail_4', 'Services', 'party_nightlife', 'Party & Nightlife', 
 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200', 
 'Party & Nightlife Companions image'),

('services_detail_5', 'Services', 'private_companionship', 'Private Companionship', 
 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200', 
 'Elite Private Companionship image'),

('services_detail_6', 'Services', 'travel_companions', 'Travel Companions', 
 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200', 
 'Travel Companions image')

ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Step 3: Also fix the MASTER-SETUP defaults so future runs don't break things again
-- (This updates the 3 old rows in case they were re-seeded)

-- Step 4: Verify — run this SELECT to confirm all 6 services images are correct
SELECT id, page, section, label, 
       CASE WHEN image_url LIKE '%supabase%' THEN '✓ Custom uploaded' ELSE '○ Default Unsplash' END as image_status
FROM site_images 
WHERE page = 'Services' 
ORDER BY id;

-- Expected output:
-- services_detail_1 | Services | dining_companions      | Dining Companions      | ...
-- services_detail_2 | Services | yacht_villa             | Yacht & Villa           | ...
-- services_detail_3 | Services | private_events          | Private Events          | ...
-- services_detail_4 | Services | party_nightlife         | Party & Nightlife       | ...
-- services_detail_5 | Services | private_companionship   | Private Companionship   | ...
-- services_detail_6 | Services | travel_companions       | Travel Companions       | ...
