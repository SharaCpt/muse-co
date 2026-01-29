-- Update Services Header Image
-- Run this in Supabase SQL Editor

UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1640947109541-ad13a917ba45?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_services';

-- Verify the update
SELECT id, label, image_url, updated_at 
FROM site_images 
WHERE id = 'header_services';
