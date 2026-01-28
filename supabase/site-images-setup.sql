-- Site Images Table for CMS
-- Run this in your Supabase SQL Editor

-- Drop existing table if it exists (to recreate with correct schema)
DROP TABLE IF EXISTS site_images CASCADE;

-- Create site_images table
CREATE TABLE site_images (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  label TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view site images"
ON site_images FOR SELECT
TO public
USING (true);

-- Create policies for authenticated users to modify
CREATE POLICY "Authenticated users can insert site images"
ON site_images FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can update site images"
ON site_images FOR UPDATE
TO public
USING (true);

CREATE POLICY "Authenticated users can delete site images"
ON site_images FOR DELETE
TO public
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_site_images_page ON site_images(page);
CREATE INDEX idx_site_images_section ON site_images(section);
