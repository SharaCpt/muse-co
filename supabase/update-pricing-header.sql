-- Update Pricing Header Image
-- Run this in Supabase SQL Editor

UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1611145434336-2324aa4079cd?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_pricing';

-- Verify the update
SELECT id, label, image_url 
FROM site_images 
WHERE id = 'header_pricing';
