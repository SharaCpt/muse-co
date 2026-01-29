-- Update Yacht Experience Image
-- Run this in Supabase SQL Editor

UPDATE bespoke_experiences 
SET image_url = 'https://images.unsplash.com/photo-XZOO6QHub60?q=80&w=1200', 
    updated_at = NOW() 
WHERE experience_name = 'YACHT EXPERIENCE';

-- Verify the update
SELECT experience_name, image_url 
FROM bespoke_experiences 
WHERE experience_name = 'YACHT EXPERIENCE';
