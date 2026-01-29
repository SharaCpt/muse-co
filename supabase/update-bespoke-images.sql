-- ============================================
-- UPDATE BESPOKE EXPERIENCE IMAGES
-- ============================================
-- Run this in Supabase SQL Editor
-- Curated luxury images for each bespoke experience
-- ============================================

-- Temporarily allow updates (bypasses RLS for this script)
DROP POLICY IF EXISTS "temp_public_update" ON bespoke_experiences;
CREATE POLICY "temp_public_update" ON bespoke_experiences FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Update images for each experience
-- WEEKEND ESCAPE - Luxury coastal villa with ocean view
UPDATE bespoke_experiences
SET image_url = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
    updated_at = NOW()
WHERE experience_name = 'WEEKEND ESCAPE';

-- YACHT EXPERIENCE - Luxury yacht on pristine waters  
UPDATE bespoke_experiences
SET image_url = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200',
    updated_at = NOW()
WHERE experience_name = 'YACHT EXPERIENCE';

-- INTERNATIONAL TRAVEL - Private jet luxury travel
UPDATE bespoke_experiences
SET image_url = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200',
    updated_at = NOW()
WHERE experience_name = 'INTERNATIONAL TRAVEL';

-- EXCLUSIVE DINNER DATE - Fine dining elegance
UPDATE bespoke_experiences
SET image_url = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200',
    updated_at = NOW()
WHERE experience_name = 'EXCLUSIVE DINNER DATE';

-- Remove temporary policy
DROP POLICY IF EXISTS "temp_public_update" ON bespoke_experiences;

-- Verify the updates
SELECT experience_name, 
       CASE 
         WHEN image_url IS NOT NULL THEN '✅ Image Set'
         ELSE '❌ No Image'
       END as status,
       display_order
FROM bespoke_experiences
ORDER BY display_order;
