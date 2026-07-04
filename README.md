# Stack Match

Stack Match is an independent business-software review and comparison platform for the United Kingdom market. It helps UK businesses choose accounting, payroll, HR, CRM, ERP and project-management software through verified user reviews, side-by-side comparisons, expert editorial content and transparent, unbiased ratings.

The platform is a server-rendered web application backed by a managed Postgres database, with a public-facing site and a private administrative content-management interface in a single codebase.

- Live domain: https://stackmatch.uk
- Repository: https://github.com/ahmadrazahassan/stackmatch

---

## Table of contents

- [Overview](#overview)
- [Key features](#key-features)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Database and migrations](#database-and-migrations)
- [Available scripts](#available-scripts)
- [Content administration](#content-administration)
- [Coding conventions](#coding-conventions)
- [Deployment](#deployment)
- [Legal and compliance](#legal-and-compliance)
- [License](#license)

---

## Overview

Stack Match presents software products across defined categories, each with a detailed profile page covering pricing, features, integrations, screenshots and aggregated ratings. Ratings are derived from verified reviews submitted by real users and are recalculated automatically at the database level. Editorial guides and head-to-head comparisons support the buyer's decision, and outbound vendor links are tracked for affiliate attribution.

The application is designed around the specifics of the UK market: Making Tax Digital and HMRC recognition, pound-based pricing, UK GDPR and PECR compliance, and British English throughout.

## Key features

Public site:

- Categorised software directory with search, filtering, sorting and pagination.
- Rich product profile pages: pricing tiers, feature lists, integrations, screenshots, rating breakdowns and frequently asked questions.
- Verified user reviews with per-dimension scores (ease of use, value for money, customer service, functionality), pros and cons, and optional vendor responses.
- Side-by-side product comparisons with radar charts and comparison matrices.
- Editorial blog with author attribution, related-software cross-linking and structured data.
- Newsletter subscription with UK GDPR and PECR consent handling and one-click unsubscribe.
- Affiliate click tracking with anonymised (hashed) IP capture.
- Server-rendered SEO: dynamic metadata, Open Graph image generation, sitemap and robots endpoints, and JSON-LD structured data.
- Complete legal suite: privacy policy, cookie policy, terms, affiliate disclosure, editorial policy and accessibility statement.

Administration:

- Single-administrator, authenticated content-management interface.
- Full create, read, update and delete operations for software, reviews, categories, comparisons, articles and static pages.
- Newsletter subscriber management with statistics, status control and CSV export.
- Site-wide settings, analytics dashboard and media handling.

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI runtime | React 19 |
| Styling | Tailwind CSS v4 with CSS design tokens |
| Component primitives | Radix UI, shadcn-style components |
| Data and authentication | Supabase (PostgreSQL, Row Level Security, Storage, Auth) |
| Data grids | TanStack Table |
| Charts | Recharts |
| Rich text | Tiptap |
| Notifications | Sonner |
| Icons | Lucide, with in-house SVG brand marks |

## Architecture

Stack Match is a single Next.js application that serves two route groups from one deployment:

- The public route group renders marketing and directory pages using server components with incremental static regeneration for cache efficiency.
- The admin route group is authenticated and renders the content-management interface.

Data access is separated by trust boundary:

- Browser and server components read published content through the Supabase client constrained by Row Level Security.
- Privileged writes (review submission, newsletter subscription, affiliate tracking, all administrative mutations) run in server actions and route handlers using a service-role client that is never exposed to the browser.

Aggregate product ratings are maintained by a database trigger that recalculates a product's scores whenever its reviews change, keeping read paths simple and consistent.

## Project structure

```
app/
  (public)/            Public marketing and directory pages
  (admin)/admin/       Authenticated administration interface
  api/                 Route handlers (Open Graph image, click tracking)
  icon.svg             Application icon and favicon (transparent brand mark)
  layout.tsx           Root layout, fonts and global metadata
  globals.css          Design tokens and global styles
components/
  public/              Public site components (cards, logo, badges, forms)
  admin/               Administration components (tables, forms, uploaders)
  ui/                  Reusable UI primitives
lib/
  supabase/            Client, server, admin and query helpers
  utils/               Formatting and helper utilities
supabase/              SQL schema and sequential migrations
public/                Static assets, including product logos
```

## Getting started

Prerequisites:

- Node.js 20 or later
- npm
- A Supabase project (see [Database and migrations](#database-and-migrations))

Installation:

```bash
git clone https://github.com/ahmadrazahassan/stackmatch.git
cd stackmatch
npm install
```

Configure environment variables by copying the example file and populating it with your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Start the development server:

```bash
npm run dev
```

The application runs at http://localhost:3000.

## Environment variables

All environment variables are read from `.env.local`, which is excluded from version control. Values prefixed with `NEXT_PUBLIC_` are exposed to the browser; the service-role key must remain server-only.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anonymous key, constrained by Row Level Security |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service-role key for privileged server-side operations. Keep secret |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL used for metadata, sitemap and Open Graph |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement identifier |

## Database and migrations

The database schema is defined as a sequence of SQL files in the `supabase/` directory. Apply them in order through the Supabase dashboard under SQL Editor, or through the Supabase CLI. Detailed setup instructions are in [`supabase/README.md`](./supabase/README.md).

| File | Purpose |
| --- | --- |
| `migrations.sql` | Core schema: categories, software, reviews, articles, comparisons, affiliate click tracking, site settings, the rating roll-up trigger, Row Level Security policies and storage buckets |
| `migration_002_pages_and_settings.sql` | Editable static pages and additional site settings |
| `migration_003_enterprise_additions.sql` | Audit log, redirects and media library |
| `migration_004_software_brand_color.sql` | Per-product accent colour and integrations |
| `migration_005_newsletter.sql` | Newsletter subscribers with consent audit trail |
| `migration_006_uk_software_expansion.sql` | Additional UK products with reviews and local product logos |

Each migration is written to be idempotent. Inserts use conflict handling on unique keys, and repeatable data operations are guarded so a migration can be re-run safely.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the codebase |

## Content administration

The administrative interface is available at `/admin` and is protected by Supabase authentication. It provides management of software listings, reviews, categories, comparisons, articles, static pages, newsletter subscribers and site settings, along with an analytics dashboard. Media uploads are stored in Supabase Storage public buckets.

## Coding conventions

- TypeScript throughout, with shared domain types defined in `lib/types.ts`.
- Server components and server actions are the default; client components are used only where interactivity requires them.
- Privileged database access is confined to server-side code using the service-role client.
- Styling uses Tailwind utility classes with design tokens declared in `app/globals.css`; brand colours are centralised and reused by the logo, badges and charts.
- New code follows the naming, structure and formatting of the surrounding files.

## Deployment

The application is optimised for deployment on Vercel:

1. Import the repository into Vercel.
2. Configure the environment variables listed above in the project settings.
3. Ensure the production Supabase project has all migrations applied.
4. Deploy. Static and incrementally regenerated pages are cached at the edge; server actions and route handlers run as serverless functions.

The application can also be self-hosted with `npm run build` followed by `npm run start` behind a reverse proxy.

## Legal and compliance

Stack Match is built for the UK market and its data handling is designed around UK GDPR and PECR. The newsletter uses explicit opt-in consent and records a consent audit trail, and every subscriber can unsubscribe in one step. Personal data collection is minimised and documented in the on-site privacy and cookie policies. Product names, logos and trademarks referenced on the platform remain the property of their respective owners and are used for identification and editorial purposes only.

## License

Copyright (c) Stack Match. All rights reserved. This repository is proprietary and is not licensed for redistribution without prior written permission.
