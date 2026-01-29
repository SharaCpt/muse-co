-- Update Homepage Hero Image
-- Run this in Supabase SQL Editor

UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1623039497550-c4f2ccc7b875?q=80&w=2400', 
    updated_at = NOW() 
WHERE id = 'homepage_hero';

-- Verify the update
SELECT id, label, image_url, updated_at 
FROM site_images 
WHERE id = 'homepage_hero';
