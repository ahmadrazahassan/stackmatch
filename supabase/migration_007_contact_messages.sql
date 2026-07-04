-- ============================================================================
-- Stackmatch — Migration 007: contact form messages
-- Run this in the Supabase SQL Editor after the earlier migrations.
-- Safe to run once; idempotent.
--
-- Messages submitted from /contact land here via a server action (service
-- role), exactly like newsletter signups. Until this migration is run the
-- contact form degrades gracefully to a prefilled mailto link, so nothing
-- is lost either way.
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),

  -- Abuse / audit trail (same anonymised approach as newsletter_subscribers)
  ip_hash TEXT,
  user_agent TEXT,
  page_source TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages (created_at DESC);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- No public policies: writes go through the service-role client (server
-- action). Only the authenticated admin user can query this table directly.
DROP POLICY IF EXISTS "Admin all contact_messages" ON contact_messages;
CREATE POLICY "Admin all contact_messages" ON contact_messages
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
