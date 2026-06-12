-- ============================================================================
-- CloudPayZA — Database schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to run once on a fresh project.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- CATEGORIES
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  software_count INT DEFAULT 0,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOFTWARE
CREATE TABLE software (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description_short TEXT NOT NULL,
  description_full TEXT NOT NULL,
  logo_url TEXT,
  screenshots JSONB DEFAULT '[]',
  category_id UUID REFERENCES categories(id),

  -- Pricing
  starting_price NUMERIC,
  price_currency TEXT DEFAULT 'ZAR',
  billing_period TEXT DEFAULT 'month',
  free_trial BOOLEAN DEFAULT FALSE,
  free_version BOOLEAN DEFAULT FALSE,
  pricing_plans JSONB DEFAULT '[]',

  -- Features
  features JSONB DEFAULT '[]',
  top_features JSONB DEFAULT '[]',

  -- Affiliate
  affiliate_url TEXT,
  vendor_website TEXT,

  -- Vendor Info
  vendor_name TEXT,
  founded_year INT,
  support_types JSONB DEFAULT '[]',
  countries_available JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',

  -- Ratings (auto-calculated by trigger)
  overall_rating NUMERIC(3,1) DEFAULT 0,
  ease_of_use_rating NUMERIC(3,1) DEFAULT 0,
  value_for_money_rating NUMERIC(3,1) DEFAULT 0,
  customer_service_rating NUMERIC(3,1) DEFAULT 0,
  functionality_rating NUMERIC(3,1) DEFAULT 0,
  review_count INT DEFAULT 0,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Full-text search (generated)
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(name, '') || ' ' ||
      coalesce(tagline, '') || ' ' ||
      coalesce(description_short, '') || ' ' ||
      coalesce(vendor_name, '')
    )
  ) STORED
);

CREATE INDEX idx_software_search ON software USING GIN (search_vector);
CREATE INDEX idx_software_category ON software (category_id) WHERE status = 'published';
CREATE INDEX idx_software_status ON software (status);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_id UUID REFERENCES software(id) ON DELETE CASCADE,

  -- Reviewer
  reviewer_name TEXT NOT NULL,
  reviewer_job_title TEXT,
  reviewer_company TEXT,
  reviewer_industry TEXT,
  reviewer_company_size TEXT,
  reviewer_country TEXT DEFAULT 'South Africa',
  reviewer_avatar_url TEXT,
  verified_linkedin BOOLEAN DEFAULT FALSE,
  verified_badge TEXT,

  -- Usage
  used_for_duration TEXT,

  -- Ratings
  overall_rating INT NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  ease_of_use INT CHECK (ease_of_use BETWEEN 1 AND 5),
  value_for_money INT CHECK (value_for_money BETWEEN 1 AND 5),
  customer_service INT CHECK (customer_service BETWEEN 1 AND 5),
  functionality INT CHECK (functionality BETWEEN 1 AND 5),

  -- Content
  review_title TEXT NOT NULL,
  summary TEXT,
  pros TEXT,
  cons TEXT,

  -- Vendor Response
  vendor_response TEXT,
  vendor_response_date DATE,

  -- Meta
  review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  helpful_count INT DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'hidden')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_software ON reviews (software_id) WHERE status = 'published';
CREATE INDEX idx_reviews_date ON reviews (review_date DESC);

-- ARTICLES
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category_tag TEXT,
  related_software_id UUID REFERENCES software(id) ON DELETE SET NULL,

  -- Author
  author_name TEXT NOT NULL,
  author_bio TEXT,
  author_avatar_url TEXT,
  author_title TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  read_time_minutes INT DEFAULT 5,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  featured BOOLEAN DEFAULT FALSE,
  published_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Full-text search (generated)
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' || coalesce(excerpt, '')
    )
  ) STORED
);

CREATE INDEX idx_articles_search ON articles USING GIN (search_vector);
CREATE INDEX idx_articles_status ON articles (status, published_date DESC);

-- SOFTWARE ALTERNATIVES (many-to-many)
CREATE TABLE software_alternatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_id UUID REFERENCES software(id) ON DELETE CASCADE,
  alternative_id UUID REFERENCES software(id) ON DELETE CASCADE,
  display_order INT DEFAULT 0,
  UNIQUE(software_id, alternative_id)
);

-- COMPARISONS
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_a_id UUID REFERENCES software(id) ON DELETE CASCADE,
  software_b_id UUID REFERENCES software(id) ON DELETE CASCADE,
  custom_verdict TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AFFILIATE CLICK TRACKING
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_id UUID REFERENCES software(id) ON DELETE SET NULL,
  software_name TEXT,
  affiliate_url TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT,
  user_agent TEXT,
  referrer TEXT,
  country_code TEXT
);

CREATE INDEX idx_clicks_software ON affiliate_clicks (software_id, clicked_at DESC);
CREATE INDEX idx_clicks_date ON affiliate_clicks (clicked_at DESC);

-- SITE SETTINGS
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Recalculate software aggregate ratings whenever reviews change.
-- COALESCE(NEW, OLD) so DELETE (no NEW row) also recalculates.
CREATE OR REPLACE FUNCTION update_software_ratings()
RETURNS TRIGGER AS $$
DECLARE
  target_id UUID;
BEGIN
  target_id := COALESCE(NEW.software_id, OLD.software_id);

  UPDATE software SET
    overall_rating = COALESCE((SELECT ROUND(AVG(overall_rating)::numeric, 1) FROM reviews
                      WHERE software_id = target_id AND status = 'published'), 0),
    ease_of_use_rating = COALESCE((SELECT ROUND(AVG(ease_of_use)::numeric, 1) FROM reviews
                          WHERE software_id = target_id AND status = 'published'), 0),
    value_for_money_rating = COALESCE((SELECT ROUND(AVG(value_for_money)::numeric, 1) FROM reviews
                              WHERE software_id = target_id AND status = 'published'), 0),
    customer_service_rating = COALESCE((SELECT ROUND(AVG(customer_service)::numeric, 1) FROM reviews
                                WHERE software_id = target_id AND status = 'published'), 0),
    functionality_rating = COALESCE((SELECT ROUND(AVG(functionality)::numeric, 1) FROM reviews
                            WHERE software_id = target_id AND status = 'published'), 0),
    review_count = (SELECT COUNT(*) FROM reviews
                    WHERE software_id = target_id AND status = 'published'),
    updated_at = NOW()
  WHERE id = target_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ratings
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_software_ratings();

-- Keep categories.software_count in sync with published software.
CREATE OR REPLACE FUNCTION update_category_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE categories c SET software_count = (
    SELECT COUNT(*) FROM software s
    WHERE s.category_id = c.id AND s.status = 'published'
  )
  WHERE c.id IN (
    COALESCE(NEW.category_id, OLD.category_id),
    COALESCE(OLD.category_id, NEW.category_id)
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_category_counts
AFTER INSERT OR UPDATE OF category_id, status OR DELETE ON software
FOR EACH ROW EXECUTE FUNCTION update_category_counts();

-- updated_at maintenance
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_software_updated_at
BEFORE UPDATE ON software
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- Single-admin model: any authenticated user is the site admin.
-- Public (anon) can read published content only.
-- affiliate_clicks: no anon/auth access — written via service role only.
-- ============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE software ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE software_alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read published software" ON software
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published reviews" ON reviews
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read alternatives" ON software_alternatives
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read published comparisons" ON comparisons
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read settings" ON site_settings
  FOR SELECT USING (TRUE);

-- Admin (any authenticated user) full access
CREATE POLICY "Admin all categories" ON categories
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin all software" ON software
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin all reviews" ON reviews
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin all articles" ON articles
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin all alternatives" ON software_alternatives
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin all comparisons" ON comparisons
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin read clicks" ON affiliate_clicks
  FOR SELECT TO authenticated USING (TRUE);

CREATE POLICY "Admin all settings" ON site_settings
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- ============================================================================
-- STORAGE BUCKETS (public read; authenticated write)
-- ============================================================================

INSERT INTO storage.buckets (id, name, public) VALUES
  ('logos', 'logos', TRUE),
  ('screenshots', 'screenshots', TRUE),
  ('avatars', 'avatars', TRUE),
  ('articles', 'articles', TRUE)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media" ON storage.objects
  FOR SELECT USING (bucket_id IN ('logos', 'screenshots', 'avatars', 'articles'));

CREATE POLICY "Admin upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('logos', 'screenshots', 'avatars', 'articles'));

CREATE POLICY "Admin update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id IN ('logos', 'screenshots', 'avatars', 'articles'));

CREATE POLICY "Admin delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id IN ('logos', 'screenshots', 'avatars', 'articles'));

-- ============================================================================
-- DEFAULT SITE SETTINGS
-- ============================================================================

INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'CloudPayZA'),
  ('tagline', 'South Africa''s #1 Business Software Reviews Platform'),
  ('contact_email', 'hello@cloudpayza.com'),
  ('social_twitter', ''),
  ('social_linkedin', ''),
  ('social_facebook', ''),
  ('footer_text', 'CloudPayZA helps South African businesses find the right software through verified reviews and expert comparisons.'),
  ('ga_tracking_id', ''),
  ('items_per_page', '10')
ON CONFLICT (key) DO NOTHING;
