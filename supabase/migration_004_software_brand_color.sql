-- ============================================================================
-- Stackmatch — Migration 004: per-software brand colour (admin-editable)
-- Run this in the Supabase SQL Editor after the earlier migrations.
-- Safe to run once; idempotent.
--
-- Why: the profile page, homepage cards, pricing cards, charts and compare
-- bars all render a per-product accent colour. Until now that colour lived in
-- a hardcoded map (lib/brandColors.ts) keyed by slug, so any software added
-- through the admin panel fell back to a generic green. This makes it a real
-- column an admin can set from the Software form.
-- ============================================================================

-- Accent colour (hex, e.g. #13B5EA). NULL = fall back to lib/brandColors.ts
-- then to the site default.
ALTER TABLE software ADD COLUMN IF NOT EXISTS brand_color TEXT;

-- Integrations list used by the profile "Integrations" section. Previously
-- lived in the standalone add_integrations.sql — folded in here so a fresh
-- environment set up from these migrations alone still has the column.
ALTER TABLE software ADD COLUMN IF NOT EXISTS integrations JSONB DEFAULT '[]';

-- Backfill the eight seeded products with their existing brand colours so the
-- site looks identical after this migration; only NULLs are touched.
UPDATE software SET brand_color = '#E36C24' WHERE slug = 'simplepay' AND brand_color IS NULL;
UPDATE software SET brand_color = '#00D639' WHERE slug = 'sage-accounting' AND brand_color IS NULL;
UPDATE software SET brand_color = '#108000' WHERE slug = 'quickbooks-online' AND brand_color IS NULL;
UPDATE software SET brand_color = '#73C41D' WHERE slug = 'bamboohr' AND brand_color IS NULL;
UPDATE software SET brand_color = '#714B67' WHERE slug = 'odoo' AND brand_color IS NULL;
UPDATE software SET brand_color = '#13B5EA' WHERE slug = 'xero' AND brand_color IS NULL;
UPDATE software SET brand_color = '#004F9F' WHERE slug = 'payspace' AND brand_color IS NULL;
UPDATE software SET brand_color = '#F0483E' WHERE slug = 'zoho-crm' AND brand_color IS NULL;
