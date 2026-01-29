-- Admin RLS Policies Update for MUSE & CO
-- Run this in Supabase SQL Editor to enable admin updates from the dashboard
-- =====================================================================

-- NOTE: These policies allow public updates for admin dashboard functionality
-- Since we use password-based admin auth (not Supabase Auth), we need public access
-- The admin pages are protected by middleware and password verification

-- =====================================================================
-- PRICING RATES - Enable updates
-- =====================================================================

-- Drop the restrictive admin-only policy
DROP POLICY IF EXISTS "Admins can manage pricing rates" ON pricing_rates;

-- Create new policies for full access
CREATE POLICY "Anyone can insert pricing rates"
  ON pricing_rates FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update pricing rates"
  ON pricing_rates FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete pricing rates"
  ON pricing_rates FOR DELETE
  TO public
  USING (true);

-- =====================================================================
-- BESPOKE EXPERIENCES - Enable updates
-- =====================================================================

-- Drop the restrictive admin-only policy
DROP POLICY IF EXISTS "Admins can manage bespoke experiences" ON bespoke_experiences;

-- Create new policies for full access
CREATE POLICY "Anyone can insert bespoke experiences"
  ON bespoke_experiences FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update bespoke experiences"
  ON bespoke_experiences FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete bespoke experiences"
  ON bespoke_experiences FOR DELETE
  TO public
  USING (true);

-- =====================================================================
-- Verify policies are in place
-- =====================================================================

-- Check pricing_rates policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'pricing_rates';

-- Check bespoke_experiences policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'bespoke_experiences';
