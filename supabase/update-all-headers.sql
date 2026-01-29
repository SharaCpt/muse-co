-- Update All Page Header Images
-- Run this in Supabase SQL Editor
-- =====================================================================

-- Update Pricing Header
UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1611145434336-2324aa4079cd?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_pricing';

-- Update About Header
UPDATE site_images 
SET image_url = 'https://images.unsplash.com/premium_photo-1683141440843-53f051bf4095?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_about';

-- Update Services Header
UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1585250047310-592b1805a8aa?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_services';

-- Update Contact Header
UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1647428028787-e004b0d00775?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_contact';

-- Update Portfolio Header
UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1557244056-ac3033d17d9a?q=80&w=2000', 
    updated_at = NOW() 
WHERE id = 'header_portfolio';

-- =====================================================================
-- Verify all updates
-- =====================================================================
SELECT id, label, image_url, updated_at 
FROM site_images 
WHERE page = 'Headers'
ORDER BY id;
