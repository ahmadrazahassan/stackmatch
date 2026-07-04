-- ============================================================================
-- Stackmatch — Migration 002: static Pages CMS + extra site_settings keys
-- Run this in the Supabase SQL Editor AFTER migrations.sql has been applied.
-- Safe to run once.
-- ============================================================================

-- PAGES (About, Privacy Policy, Terms, and any future static content page)
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pages_status ON pages (status);

DROP TRIGGER IF EXISTS trigger_pages_updated_at ON pages;
CREATE TRIGGER trigger_pages_updated_at
BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published pages" ON pages;
CREATE POLICY "Public read published pages" ON pages
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admin all pages" ON pages;
CREATE POLICY "Admin all pages" ON pages
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- Seed the three pages that were previously hardcoded in the Next.js templates.
-- Safe re-run: only inserts if the slug doesn't already exist, so admin edits
-- made after the first run are never overwritten.
INSERT INTO pages (slug, title, content, meta_title, meta_description) VALUES
(
  'about',
  'About Stackmatch',
  '<p>Stackmatch is South Africa''s business software review and comparison platform. We help SMB owners, accountants, payroll managers, HR professionals and finance directors make confident software decisions through verified reviews, expert comparisons and unbiased ratings.</p>
<h2>What we do</h2>
<ul>
<li><strong>In-depth software profiles</strong> — features, ZAR pricing, screenshots and vendor information for the tools South African businesses actually use.</li>
<li><strong>Verified user reviews</strong> — real experiences from real businesses, covering ease of use, value for money, support quality and functionality.</li>
<li><strong>Side-by-side comparisons</strong> — head-to-head breakdowns with clear verdicts, so you can shortlist faster.</li>
<li><strong>Expert guides</strong> — practical, SA-specific content on compliance, pricing and choosing software.</li>
</ul>
<h2>How we make money</h2>
<p>Some links on Stackmatch are affiliate links: if you visit a vendor through our site and sign up, we may earn a commission at no extra cost to you. Affiliate relationships never influence our ratings, which are calculated directly from user reviews.</p>
<h2>List your software</h2>
<p>Are you a software vendor serving the South African market? Get in touch to list your product on Stackmatch.</p>',
  'About Stackmatch',
  'Stackmatch helps South African businesses find the right software through verified reviews, expert comparisons and unbiased ratings.'
),
(
  'privacy-policy',
  'Privacy Policy',
  '<p><em>Last updated: June 2026</em></p>
<p>Stackmatch ("we", "us") respects your privacy. This policy explains what information we collect when you use stackmatch.uk and how we use it, in line with the Protection of Personal Information Act (POPIA).</p>
<h2>Information we collect</h2>
<ul>
<li><strong>Usage data</strong> — pages visited, referring site and approximate location, collected via analytics cookies to improve the site.</li>
</ul>',
  'Privacy Policy',
  'How Stackmatch collects, uses and protects your information.'
),
(
  'terms',
  'Terms of Service',
  '<p><em>Last updated: June 2026</em></p>
<p>These terms govern your use of stackmatch.uk. By using the site you agree to these terms.</p>
<h2>Content and accuracy</h2>
<p>Stackmatch publishes software reviews, ratings and comparisons for informational purposes. While we strive for accuracy, pricing and features change frequently — always confirm details directly with the vendor before purchasing.</p>
<h2>Affiliate disclosure</h2>
<p>Some outbound links are affiliate links. See our <a href="/about">About page</a> for details.</p>',
  'Terms of Service',
  'The terms and conditions for using Stackmatch.'
)
ON CONFLICT (slug) DO NOTHING;

-- Extra site_settings keys used by the homepage stats bar, footer and compare page.
INSERT INTO site_settings (key, value) VALUES
  ('contact_phone', ''),
  ('years_active', '7'),
  ('footer_tagline', 'Independent reviews and side-by-side comparisons of South Africa''s best cloud, payments & accounting software.'),
  ('compare_stat_percentage', '48%'),
  ('compare_stat_text', 'of SMBs say regrettable software purchases increased costs—the most common negative outcome cited in a recent survey.')
ON CONFLICT (key) DO NOTHING;
