# Stackmatch — Supabase setup

## 1. Create the project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Pick a region close to your users (e.g. `eu-west` — closest to ZA at time of writing).
3. Once provisioned, open **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)
4. Paste these into `.env.local` (copy from `.env.local.example`).

## 2. Run the schema

Run these in order, each as Dashboard → **SQL Editor** → New query → paste → **Run**:

1. [`migrations.sql`](./migrations.sql) — core schema: categories, software,
   reviews, articles, comparisons, affiliate click tracking, site settings,
   the rating roll-up trigger, RLS policies and the four public storage
   buckets (`logos`, `screenshots`, `avatars`, `articles`).
2. [`migration_002_pages_and_settings.sql`](./migration_002_pages_and_settings.sql) —
   adds the `pages` table (About/Privacy Policy/Terms, editable from
   **Admin → Pages**) and extra `site_settings` keys used by the homepage
   stats bar, footer tagline and compare page.
3. [`migration_003_enterprise_additions.sql`](./migration_003_enterprise_additions.sql) —
   `audit_log` (who changed what, auto-populated by triggers), `redirects`
   (301/302 table, pre-seeded with the `/privacy` → `/privacy-policy` fix)
   and `media_library` (asset tracking for uploaded files). All additive;
   nothing here changes the single-admin auth model below.
4. [`migration_004_software_brand_color.sql`](./migration_004_software_brand_color.sql) —
   adds `software.brand_color` (the per-product accent colour, now editable
   from the **Admin → Software** form instead of the hardcoded map) and
   ensures the `integrations` column exists. Backfills the eight seeded
   products with their existing colours so nothing changes visually.

Already ran `migrations.sql` on a live project? Just run 002–004 —
each is idempotent and safe to re-run. The app is written to keep working
*before* 004 is applied (it falls back to the built-in colour map), so run
order is not fragile; after applying 004, restart the dev server once so it
re-detects the new column.

## 3. (Optional) Load demo data

Paste [`seed.sql`](./seed.sql) into the SQL Editor and run it.

> ⚠️ All seeded reviews, ratings and verdicts are **placeholder demo content**
> (reviewer names are suffixed `(Demo)`). Replace them via the admin panel
> before going live.

## 4. Create the admin account

Dashboard → **Authentication → Users → Add user → Create new user**:

- Email: your admin email
- Password: a strong password
- Tick **Auto Confirm User**

Any authenticated user has full admin rights (single-admin model), so create
exactly one account and do not enable public sign-ups
(Authentication → Sign In / Up → disable "Allow new users to sign up").

## 5. Verify

- `select count(*) from software;` → 8 (with seed)
- `select name, overall_rating, review_count from software order by name;`
  → ratings populated by the trigger, not hardcoded.
- Log in at `/admin/login` with the account from step 4.
