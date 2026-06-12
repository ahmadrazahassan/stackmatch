# CloudPayZA — Supabase setup

## 1. Create the project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Pick a region close to your users (e.g. `eu-west` — closest to ZA at time of writing).
3. Once provisioned, open **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)
4. Paste these into `.env.local` (copy from `.env.local.example`).

## 2. Run the schema

Dashboard → **SQL Editor** → New query → paste the full contents of
[`migrations.sql`](./migrations.sql) → **Run**.

This creates all tables, indexes, the rating roll-up trigger, RLS policies,
the four public storage buckets (`logos`, `screenshots`, `avatars`, `articles`)
and default site settings.

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
