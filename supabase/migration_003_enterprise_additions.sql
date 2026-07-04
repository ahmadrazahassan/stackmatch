-- ============================================================================
-- Stackmatch — Migration 003: enterprise-grade additions
-- Run this in the Supabase SQL Editor AFTER migrations.sql and migration_002.
-- Safe to run once. Purely additive — does not change any existing table,
-- policy, or the single-admin auth model documented in README.md.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- AUDIT LOG
-- Who changed what, when. Populated by triggers on every content table so
-- edits/deletes are traceable even though every admin shares one role.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_by_email TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log (table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log (created_at DESC);

CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  actor UUID := auth.uid();
  actor_email TEXT;
BEGIN
  IF actor IS NOT NULL THEN
    SELECT email INTO actor_email FROM auth.users WHERE id = actor;
  END IF;

  INSERT INTO audit_log (table_name, record_id, action, changed_by, changed_by_email, old_data, new_data)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    lower(TG_OP),
    actor,
    actor_email,
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_audit_software ON software;
CREATE TRIGGER trigger_audit_software
AFTER INSERT OR UPDATE OR DELETE ON software
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

DROP TRIGGER IF EXISTS trigger_audit_articles ON articles;
CREATE TRIGGER trigger_audit_articles
AFTER INSERT OR UPDATE OR DELETE ON articles
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

DROP TRIGGER IF EXISTS trigger_audit_reviews ON reviews;
CREATE TRIGGER trigger_audit_reviews
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

DROP TRIGGER IF EXISTS trigger_audit_pages ON pages;
CREATE TRIGGER trigger_audit_pages
AFTER INSERT OR UPDATE OR DELETE ON pages
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

DROP TRIGGER IF EXISTS trigger_audit_comparisons ON comparisons;
CREATE TRIGGER trigger_audit_comparisons
AFTER INSERT OR UPDATE OR DELETE ON comparisons
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin read audit log" ON audit_log;
CREATE POLICY "Admin read audit log" ON audit_log
  FOR SELECT TO authenticated USING (TRUE);
-- No insert/update/delete policy: only the SECURITY DEFINER trigger writes here.

-- ----------------------------------------------------------------------------
-- REDIRECTS
-- 301/302 management for retired or renamed URLs — e.g. the /privacy →
-- /privacy-policy mismatch found in this audit. Enforce in middleware.ts by
-- looking up the incoming pathname before it 404s.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_path TEXT UNIQUE NOT NULL,
  destination_path TEXT NOT NULL,
  status_code INT DEFAULT 301 CHECK (status_code IN (301, 302)),
  hit_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_redirects_source ON redirects (source_path);

INSERT INTO redirects (source_path, destination_path, status_code) VALUES
  ('/privacy', '/privacy-policy', 301)
ON CONFLICT (source_path) DO NOTHING;

ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read redirects" ON redirects;
CREATE POLICY "Public read redirects" ON redirects
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin all redirects" ON redirects;
CREATE POLICY "Admin all redirects" ON redirects
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- ----------------------------------------------------------------------------
-- MEDIA LIBRARY
-- Tracks every asset uploaded through the admin ImageUploader so logos,
-- screenshots and avatars are searchable/reusable instead of re-uploaded
-- per record, and so orphaned storage objects can be found and cleaned up.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bucket TEXT NOT NULL CHECK (bucket IN ('logos', 'screenshots', 'avatars', 'articles')),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT,
  file_size_bytes INT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (bucket, storage_path)
);

CREATE INDEX IF NOT EXISTS idx_media_library_bucket ON media_library (bucket);

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read media library" ON media_library;
CREATE POLICY "Public read media library" ON media_library
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin all media library" ON media_library;
CREATE POLICY "Admin all media library" ON media_library
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
