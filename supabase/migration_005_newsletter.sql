-- ============================================================================
-- Stackmatch — Migration 005: newsletter subscribers
-- Run this in the Supabase SQL Editor after the earlier migrations.
-- Safe to run once; idempotent.
--
-- status stays 'confirmed' at signup for now (no email provider wired up
-- yet, so there is no double opt-in confirmation step). confirm_token and
-- confirmed_at are already in place so a double opt-in flow can be turned on
-- later without a schema change: set new signups to 'pending', mail out a
-- confirm link, then flip to 'confirmed' when clicked.
-- ============================================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  interests JSONB DEFAULT '[]',

  -- Double opt-in (ready for later; unused while status defaults to 'confirmed')
  confirm_token TEXT,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,

  -- Consent audit trail (UK GDPR / PECR accountability)
  consent_ip_hash TEXT,
  consent_source TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers (status);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscribers (created_at DESC);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- No public policies: all reads/writes go through the service-role client
-- (server actions), exactly like the reviews submission flow. Only the
-- authenticated admin user can query this table directly.
DROP POLICY IF EXISTS "Admin all newsletter_subscribers" ON newsletter_subscribers;
CREATE POLICY "Admin all newsletter_subscribers" ON newsletter_subscribers
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
