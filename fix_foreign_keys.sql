-- Fix foreign key constraints to allow safe software deletion.

-- 1. Comparisons: If either software is deleted, the comparison is invalid, so CASCADE.
ALTER TABLE comparisons DROP CONSTRAINT IF EXISTS comparisons_software_a_id_fkey;
ALTER TABLE comparisons ADD CONSTRAINT comparisons_software_a_id_fkey 
  FOREIGN KEY (software_a_id) REFERENCES software(id) ON DELETE CASCADE;

ALTER TABLE comparisons DROP CONSTRAINT IF EXISTS comparisons_software_b_id_fkey;
ALTER TABLE comparisons ADD CONSTRAINT comparisons_software_b_id_fkey 
  FOREIGN KEY (software_b_id) REFERENCES software(id) ON DELETE CASCADE;

-- 2. Articles: If the related software is deleted, we don't want to delete the whole article. We just SET NULL.
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_related_software_id_fkey;
ALTER TABLE articles ADD CONSTRAINT articles_related_software_id_fkey 
  FOREIGN KEY (related_software_id) REFERENCES software(id) ON DELETE SET NULL;

-- 3. Affiliate Clicks: Retain analytics history even if software is deleted. We SET NULL.
ALTER TABLE affiliate_clicks DROP CONSTRAINT IF EXISTS affiliate_clicks_software_id_fkey;
ALTER TABLE affiliate_clicks ADD CONSTRAINT affiliate_clicks_software_id_fkey 
  FOREIGN KEY (software_id) REFERENCES software(id) ON DELETE SET NULL;
