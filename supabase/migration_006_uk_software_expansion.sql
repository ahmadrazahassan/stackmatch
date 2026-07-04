-- ============================================================================
-- Stackmatch — Migration 006: UK software expansion + human reviews
-- Run this in the Supabase SQL Editor AFTER the earlier migrations.
-- Safe to run once; idempotent (software upserts on slug, reviews guard on
-- reviewer_name + review_title so a re-run never duplicates).
--
-- Adds 2 famous, genuinely UK-focused products to every category (12 total),
-- each with real-world GBP pricing and MTD / HMRC / RTI / auto-enrolment
-- features, plus 2 human-style UK reviews each (24 reviews). Ratings roll up
-- to each product automatically via the existing trigger.
--
-- Categories are resolved by slug (not hardcoded UUID) so this works whatever
-- IDs your environment assigned.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- SOFTWARE
-- ----------------------------------------------------------------------------
INSERT INTO software (
  id, name, slug, tagline, description_short, description_full,
  category_id, starting_price, price_currency, billing_period,
  free_trial, free_version, pricing_plans, features, top_features,
  affiliate_url, vendor_website, vendor_name, founded_year,
  support_types, countries_available, languages,
  meta_title, meta_description, status, featured, logo_url, brand_color
) VALUES

-- ===================== ACCOUNTING =====================
(
  'b0000000-0000-0000-0000-000000000001',
  'FreeAgent', 'freeagent',
  'Accounting software made for UK freelancers and small businesses',
  'UK-built cloud accounting with Making Tax Digital for VAT and Income Tax, Self Assessment filing and HMRC-recognised submissions.',
  '<h2>What is FreeAgent?</h2><p>FreeAgent is an Edinburgh-built cloud accounting platform aimed squarely at UK freelancers, contractors and small businesses. It handles invoicing, expenses, bank feeds, VAT and Self Assessment, and files directly to HMRC.</p><p>It is fully recognised by HMRC for Making Tax Digital (MTD) for VAT and is one of the software packages listed for MTD for Income Tax Self Assessment. NatWest, Royal Bank of Scotland and Mettle customers can often get FreeAgent free with a business current account.</p>',
  (SELECT id FROM categories WHERE slug = 'accounting-software'), 19, 'GBP', 'month',
  TRUE, FALSE,
  '[{"name":"Sole Trader","price":19,"currency":"GBP","billing":"month","features":["Self Assessment filing","MTD for VAT","Invoicing","Bank feeds"]},{"name":"Limited Company","price":33,"currency":"GBP","billing":"month","features":["Corporation Tax forecasting","Payroll for up to 10","Dividend vouchers","Project management"]}]',
  '["Making Tax Digital for VAT","Self Assessment filing","Corporation Tax forecasting","Invoicing & estimates","Bank feeds & reconciliation","Expense tracking","Time tracking & projects","Free with select bank accounts"]',
  '["Making Tax Digital for VAT","Self Assessment filing","Free with NatWest/RBS"]',
  'https://example.com/track/freeagent', 'https://www.freeagent.com/',
  'FreeAgent', 2007,
  '["Email","Phone","Knowledge Base"]',
  '["United Kingdom"]',
  '["English"]',
  'FreeAgent Review 2026 — MTD Accounting for UK Small Businesses',
  'FreeAgent review for UK freelancers and small businesses: MTD for VAT & Income Tax, Self Assessment, pricing in GBP, pros and cons.',
  'published', TRUE, '/logos/freeagent.png', '#FB5A2D'
),
(
  'b0000000-0000-0000-0000-000000000002',
  'QuickFile', 'quickfile',
  'Free online accounting software for UK small businesses',
  'Popular free UK accounting platform with invoicing, bank feeds, VAT returns and MTD bridging for smaller businesses.',
  '<h2>What is QuickFile?</h2><p>QuickFile is a UK accounting platform that is free for smaller businesses (based on annual account activity), which has made it a favourite among sole traders, landlords and micro-businesses. It covers invoicing, purchase management, bank tagging, VAT returns and multi-currency.</p><p>QuickFile supports Making Tax Digital for VAT submissions directly and via bridging, and offers a low-cost Power User Subscription for higher-volume accounts.</p>',
  (SELECT id FROM categories WHERE slug = 'accounting-software'), 0, 'GBP', 'month',
  FALSE, TRUE,
  '[{"name":"Free (XS/S)","price":0,"currency":"GBP","billing":"month","features":["Invoicing","Bank tagging","VAT returns","MTD submissions"]},{"name":"Power User Subscription","price":5,"currency":"GBP","billing":"month","features":["Higher account activity","Priority support","Extra backups","No account cap"]}]',
  '["Making Tax Digital for VAT","Free for smaller accounts","Invoicing & estimates","Bank feeds & tagging","Purchase & supplier management","Multi-currency","Client portal","Automated backups"]',
  '["Free for smaller businesses","Making Tax Digital for VAT","Bank feeds & tagging"]',
  'https://example.com/track/quickfile', 'https://www.quickfile.co.uk/',
  'QuickFile', 2010,
  '["Email","Community Forum","Knowledge Base"]',
  '["United Kingdom"]',
  '["English"]',
  'QuickFile Review 2026 — Free UK Accounting Software Tested',
  'QuickFile review for UK small businesses: genuinely free accounting, MTD for VAT, invoicing and bank feeds, pros and cons.',
  'published', FALSE, '/logos/quickfile.png', '#2E7DB2'
),

-- ===================== PAYROLL =====================
(
  'b0000000-0000-0000-0000-000000000003',
  'BrightPay', 'brightpay',
  'Award-winning UK payroll and auto-enrolment software',
  'HMRC-recognised UK payroll with full RTI submissions, automatic enrolment and a cloud employee portal, trusted by thousands of employers and bureaus.',
  '<h2>What is BrightPay?</h2><p>BrightPay is one of the most widely used payroll packages in the UK and Ireland, popular with both small employers and payroll bureaus. It handles the full RTI cycle — FPS and EPS submissions to HMRC — alongside automatic enrolment, statutory pay and CIS.</p><p>BrightPay Connect adds a cloud dashboard, online payslips and an employee self-service app. It is HMRC recognised and supports all major UK pension providers for auto-enrolment.</p>',
  (SELECT id FROM categories WHERE slug = 'payroll-software'), 10, 'GBP', 'month',
  TRUE, FALSE,
  '[{"name":"Cloud (Small)","price":10,"currency":"GBP","billing":"month","features":["RTI submissions","Auto-enrolment","Online payslips","Up to 10 employees"]},{"name":"Cloud (Standard)","price":24,"currency":"GBP","billing":"month","features":["Unlimited employees","Employee app","Bureau features","Client dashboards"]}]',
  '["RTI submissions (FPS & EPS)","Automatic enrolment","Statutory pay (SSP, SMP, SPP)","CIS support","Online payslips & portal","Employee self-service app","HMRC recognised","Pension provider integrations"]',
  '["RTI submissions to HMRC","Automatic enrolment","Employee self-service app"]',
  'https://example.com/track/brightpay', 'https://www.brightpay.co.uk/',
  'Bright (Thesaurus Software)', 2013,
  '["Phone","Email","Knowledge Base","Live Chat"]',
  '["United Kingdom","Ireland"]',
  '["English"]',
  'BrightPay Review 2026 — UK Payroll & Auto-Enrolment Software',
  'BrightPay review for UK employers and bureaus: RTI submissions, automatic enrolment, pricing in GBP, pros and cons.',
  'published', TRUE, '/logos/brightpay.png', '#1E9BD7'
),
(
  'b0000000-0000-0000-0000-000000000004',
  'Moorepay', 'moorepay',
  'UK payroll software and managed payroll services',
  'Long-established UK payroll and HR provider offering software plus fully managed payroll, with RTI, auto-enrolment and CIPP-backed compliance support.',
  '<h2>What is Moorepay?</h2><p>Moorepay is one of the UK''s oldest payroll and HR providers, operating since 1966 and now part of the Zellis group. It offers both payroll software and a fully managed payroll bureau service, aimed at small businesses through to large employers.</p><p>Alongside RTI submissions, automatic enrolment and statutory pay, Moorepay bundles HR tools and expert compliance support, with pricing typically quoted based on headcount and service level.</p>',
  (SELECT id FROM categories WHERE slug = 'payroll-software'), NULL, 'GBP', 'month',
  FALSE, FALSE,
  '[{"name":"Payroll Software","price":0,"currency":"GBP","billing":"month","features":["RTI submissions","Auto-enrolment","Online payslips","Quoted per headcount"]},{"name":"Managed Payroll","price":0,"currency":"GBP","billing":"month","features":["Fully managed service","Dedicated support","HR add-ons","Compliance guidance"]}]',
  '["RTI submissions","Automatic enrolment","Managed payroll service","Statutory pay & CIS","Online payslips & portal","HR software add-on","Legislation & compliance support","Dedicated account support"]',
  '["Fully managed payroll option","RTI & auto-enrolment","UK compliance support"]',
  'https://example.com/track/moorepay', 'https://www.moorepay.co.uk/',
  'Moorepay', 1966,
  '["Phone","Email","Dedicated Account Manager","Knowledge Base"]',
  '["United Kingdom"]',
  '["English"]',
  'Moorepay Review 2026 — UK Payroll Software & Managed Service',
  'Moorepay review for UK businesses: payroll software vs managed payroll, RTI, auto-enrolment, pricing and pros and cons.',
  'published', FALSE, '/logos/moorepay.png', '#00857C'
),

-- ===================== HR =====================
(
  'b0000000-0000-0000-0000-000000000005',
  'Breathe HR', 'breathe-hr',
  'Simple HR software for UK small businesses',
  'UK-built HR platform for SMEs covering holiday booking, absence, documents and performance, with GDPR-friendly data hosting.',
  '<h2>What is Breathe HR?</h2><p>Breathe is a UK HR software company based in Horsham, built specifically for small and medium businesses that are outgrowing spreadsheets. It centralises holiday and absence management, employee records, documents, rotas and performance reviews.</p><p>Data is hosted in the UK/EU and the platform is designed around UK employment practices, making it a popular first HR system for growing British teams.</p>',
  (SELECT id FROM categories WHERE slug = 'hr-software'), 18, 'GBP', 'month',
  TRUE, FALSE,
  '[{"name":"Micro (up to 10)","price":18,"currency":"GBP","billing":"month","features":["Holiday & absence","Employee records","Documents","Unlimited support"]},{"name":"Regular (up to 50)","price":80,"currency":"GBP","billing":"month","features":["Performance management","Rotas","1-to-1s","Company announcements"]}]',
  '["Holiday & absence management","Employee records & documents","Performance reviews & 1-to-1s","Rotas & scheduling","Company announcements","GDPR-friendly UK/EU hosting","Employee self-service","Reporting & analytics"]',
  '["Holiday & absence management","Performance reviews","Built for UK SMEs"]',
  'https://example.com/track/breathe-hr', 'https://www.breathehr.com/',
  'Breathe', 2012,
  '["Email","Knowledge Base","Live Chat"]',
  '["United Kingdom"]',
  '["English"]',
  'Breathe HR Review 2026 — HR Software for UK Small Businesses',
  'Breathe HR review for UK SMEs: holiday and absence management, performance, GDPR-friendly hosting, pricing and pros and cons.',
  'published', TRUE, '/logos/breathe-hr.png', '#8A4F9E'
),
(
  'b0000000-0000-0000-0000-000000000006',
  'CharlieHR', 'charliehr',
  'HR software built for small UK companies',
  'London-built HR platform for startups and small teams, covering onboarding, time off, documents and reviews, with a free tier for very small teams.',
  '<h2>What is CharlieHR?</h2><p>CharlieHR is a London-based HR platform built for startups and small businesses. It brings together onboarding, time-off booking, employee records, org charts, feedback and reviews in a deliberately simple, modern interface.</p><p>Charlie is designed around UK working patterns and employment practices, with a free plan for the smallest teams and affordable per-employee pricing as you scale.</p>',
  (SELECT id FROM categories WHERE slug = 'hr-software'), 4, 'GBP', 'user/month',
  TRUE, TRUE,
  '[{"name":"Free (up to 5)","price":0,"currency":"GBP","billing":"month","features":["Time off","Employee records","Org chart","Onboarding"]},{"name":"Standard","price":4,"currency":"GBP","billing":"user/month","features":["Reviews & feedback","Advanced onboarding","Custom fields","Priority support"]}]',
  '["Time-off management","Onboarding workflows","Employee records","Org charts","Feedback & performance reviews","eNPS & engagement","Document storage","Free tier for small teams"]',
  '["Simple onboarding","Free tier for small teams","Built in London for UK teams"]',
  'https://example.com/track/charliehr', 'https://www.charliehr.com/',
  'CharlieHR', 2015,
  '["Email","Knowledge Base","Live Chat"]',
  '["United Kingdom"]',
  '["English"]',
  'CharlieHR Review 2026 — HR Software for UK Startups',
  'CharlieHR review for UK startups and small teams: onboarding, time off, reviews, free tier, pricing and pros and cons.',
  'published', FALSE, '/logos/charliehr.png', '#2B2B6B'
),

-- ===================== CRM =====================
(
  'b0000000-0000-0000-0000-000000000007',
  'Capsule CRM', 'capsule-crm',
  'Simple, effective CRM built in Manchester',
  'Easy-to-use UK-built CRM for managing contacts, sales pipelines and tasks, with a free tier and strong integrations for small businesses.',
  '<h2>What is Capsule CRM?</h2><p>Capsule is a CRM built in Manchester by Zestia, designed for small and medium businesses that want a straightforward, well-organised way to manage contacts, opportunities and follow-ups. It keeps a full history of every relationship and offers customisable sales pipelines.</p><p>Capsule integrates with popular UK small-business tools such as Xero, FreeAgent, Sage and Mailchimp, and offers a free plan for up to 250 contacts.</p>',
  (SELECT id FROM categories WHERE slug = 'crm-software'), 18, 'GBP', 'user/month',
  TRUE, TRUE,
  '[{"name":"Free","price":0,"currency":"GBP","billing":"month","features":["Up to 250 contacts","Contact management","Basic pipeline","2 users"]},{"name":"Starter","price":18,"currency":"GBP","billing":"user/month","features":["30,000 contacts","Sales pipeline","Email integration","Custom fields"]}]',
  '["Contact & relationship management","Customisable sales pipelines","Task & activity tracking","Email integration","Xero & FreeAgent integrations","Custom fields & tags","Sales analytics","Free tier for small teams"]',
  '["Easy to use","Xero & FreeAgent integrations","Built in the UK"]',
  'https://example.com/track/capsule-crm', 'https://capsulecrm.com/',
  'Capsule (Zestia)', 2009,
  '["Email","Knowledge Base"]',
  '["United Kingdom","Global"]',
  '["English"]',
  'Capsule CRM Review 2026 — Simple CRM for UK Small Businesses',
  'Capsule CRM review for UK SMEs: contact management, sales pipelines, Xero & FreeAgent integrations, pricing and pros and cons.',
  'published', TRUE, '/logos/capsule-crm.png', '#3DA5D9'
),
(
  'b0000000-0000-0000-0000-000000000008',
  'HubSpot CRM', 'hubspot-crm',
  'The customer platform with a genuinely free CRM',
  'Popular all-in-one CRM with free contact management plus paid sales, marketing and service hubs used widely by UK scale-ups.',
  '<h2>What is HubSpot CRM?</h2><p>HubSpot is a customer platform combining a free core CRM with paid Sales, Marketing, Service and Content hubs. Its free tier — unlimited users and up to a million contacts — has made it hugely popular with UK startups and scale-ups.</p><p>Paid tiers add automation, sequences, reporting and marketing tools. HubSpot operates EU data hosting options and is widely supported by UK agencies and partners.</p>',
  (SELECT id FROM categories WHERE slug = 'crm-software'), 15, 'GBP', 'user/month',
  TRUE, TRUE,
  '[{"name":"Free Tools","price":0,"currency":"GBP","billing":"month","features":["Contact management","Deals & tasks","Email tracking","Unlimited users"]},{"name":"Sales Hub Starter","price":15,"currency":"GBP","billing":"user/month","features":["Sales automation","Sequences","Goals","Simple reporting"]}]',
  '["Free core CRM","Deal pipelines","Email tracking & templates","Sales automation & sequences","Marketing tools","Reporting dashboards","Meeting scheduler","EU data hosting option"]',
  '["Genuinely free core CRM","All-in-one sales & marketing","Strong UK partner network"]',
  'https://example.com/track/hubspot', 'https://www.hubspot.com/products/crm',
  'HubSpot', 2006,
  '["Email","Live Chat","Knowledge Base","Community"]',
  '["United Kingdom","Global"]',
  '["English"]',
  'HubSpot CRM Review 2026 — Free CRM for UK Businesses Tested',
  'HubSpot CRM review for UK businesses: free core CRM, Sales Hub pricing, automation and reporting, pros and cons.',
  'published', FALSE, '/logos/hubspot-crm.png', '#FF7A59'
),

-- ===================== ERP =====================
(
  'b0000000-0000-0000-0000-000000000009',
  'Sage 200', 'sage-200',
  'Mid-market ERP for growing UK businesses',
  'Established UK ERP covering finance, supply chain and CRM for businesses that have outgrown small-business accounting, with strong VAT and MTD support.',
  '<h2>What is Sage 200?</h2><p>Sage 200 is a mid-market ERP from Sage aimed at UK businesses — typically 50 to 500 staff — that have outgrown Sage 50 or small-business accounting. It combines financials, supply chain, manufacturing, project accounting and CRM in one connected system.</p><p>Sage 200 is built around UK accounting and VAT requirements, including Making Tax Digital, and is usually delivered and priced through Sage business partners based on modules and users.</p>',
  (SELECT id FROM categories WHERE slug = 'erp-software'), NULL, 'GBP', 'month',
  TRUE, FALSE,
  '[{"name":"Standard","price":0,"currency":"GBP","billing":"month","features":["Financials","Making Tax Digital","Cash flow & VAT","Quoted per requirement"]},{"name":"Professional","price":0,"currency":"GBP","billing":"month","features":["Supply chain","Manufacturing","Project accounting","Multi-company"]}]',
  '["UK financial management","Making Tax Digital for VAT","Supply chain & stock","Manufacturing (BOM)","Project accounting","Built-in CRM","Multi-company & multi-currency","Delivered via Sage partners"]',
  '["Built for UK VAT & MTD","Scales beyond Sage 50","Financials + supply chain + CRM"]',
  'https://example.com/track/sage-200', 'https://www.sage.com/en-gb/products/sage-200/',
  'Sage', 1981,
  '["Phone","Email","Business Partner","Knowledge Base"]',
  '["United Kingdom"]',
  '["English"]',
  'Sage 200 Review 2026 — Mid-Market ERP for UK Businesses',
  'Sage 200 review for growing UK businesses: financials, MTD, supply chain and CRM, partner-led pricing, pros and cons.',
  'published', TRUE, '/logos/sage-200.png', '#00DC06'
),
(
  'b0000000-0000-0000-0000-000000000010',
  'Microsoft Dynamics 365 Business Central', 'dynamics-365-business-central',
  'Cloud ERP for small and mid-sized UK businesses',
  'Microsoft''s cloud ERP connecting finance, sales, supply chain and operations, with deep Microsoft 365 integration and UK localisation.',
  '<h2>What is Dynamics 365 Business Central?</h2><p>Microsoft Dynamics 365 Business Central is a cloud ERP for small and mid-sized businesses, connecting finance, sales, service, supply chain and operations in one platform. It integrates tightly with Microsoft 365 (Outlook, Excel, Teams) and Power BI.</p><p>Business Central has a UK localisation covering VAT and Making Tax Digital, and is delivered through Microsoft partners, with per-user monthly licensing.</p>',
  (SELECT id FROM categories WHERE slug = 'erp-software'), 52, 'GBP', 'user/month',
  TRUE, FALSE,
  '[{"name":"Essentials","price":52,"currency":"GBP","billing":"user/month","features":["Financials","Sales & purchasing","Inventory","Project management"]},{"name":"Premium","price":75,"currency":"GBP","billing":"user/month","features":["Service management","Manufacturing","Everything in Essentials","Advanced operations"]}]',
  '["Financial management","Making Tax Digital for VAT","Sales & supply chain","Inventory & warehousing","Project management","Microsoft 365 integration","Power BI reporting","UK localisation"]',
  '["Deep Microsoft 365 integration","UK VAT & MTD localisation","Scales from finance to full ERP"]',
  'https://example.com/track/business-central', 'https://www.microsoft.com/en-gb/dynamics-365/products/business-central',
  'Microsoft', 1975,
  '["Email","Phone","Microsoft Partner","Knowledge Base"]',
  '["United Kingdom","Global"]',
  '["English"]',
  'Dynamics 365 Business Central Review 2026 — UK Cloud ERP',
  'Microsoft Dynamics 365 Business Central review for UK businesses: cloud ERP, MTD, Microsoft 365 integration, pricing and pros and cons.',
  'published', FALSE, '/logos/dynamics-365-business-central.png', '#0078D4'
),

-- ===================== PROJECT MANAGEMENT =====================
(
  'b0000000-0000-0000-0000-000000000011',
  'monday.com', 'monday-com',
  'Work OS for planning and tracking any project',
  'Flexible, visual work platform used by UK teams to manage projects, tasks and workflows, with a free tier and highly customisable boards.',
  '<h2>What is monday.com?</h2><p>monday.com is a visual "Work OS" that UK teams use to plan and track projects, tasks, campaigns and operations. Its colourful, customisable boards, timelines and automations make it popular with marketing, operations and product teams.</p><p>It offers a free plan for individuals and small teams, with paid tiers adding automations, integrations, dashboards and time tracking. Data can be hosted in the EU.</p>',
  (SELECT id FROM categories WHERE slug = 'project-management'), 9, 'GBP', 'user/month',
  TRUE, TRUE,
  '[{"name":"Free","price":0,"currency":"GBP","billing":"month","features":["Up to 2 seats","Boards & items","iOS & Android apps","Templates"]},{"name":"Basic","price":9,"currency":"GBP","billing":"user/month","features":["Unlimited items","Unlimited viewers","5GB storage","Priority support"]}]',
  '["Customisable boards","Timelines & Gantt views","Workflow automations","Dashboards & reporting","Time tracking","Integrations (Slack, Teams, etc.)","Templates library","EU data hosting option"]',
  '["Highly visual & customisable","Powerful automations","Free tier to start"]',
  'https://example.com/track/monday', 'https://monday.com/',
  'monday.com', 2012,
  '["Email","Knowledge Base","Live Chat"]',
  '["United Kingdom","Global"]',
  '["English"]',
  'monday.com Review 2026 — Project Management for UK Teams',
  'monday.com review for UK teams: customisable boards, automations, dashboards, free tier, pricing and pros and cons.',
  'published', TRUE, '/logos/monday-com.png', '#FF3D57'
),
(
  'b0000000-0000-0000-0000-000000000012',
  'Asana', 'asana',
  'Manage projects, tasks and team workflows in one place',
  'Widely used work management tool for organising tasks, projects and goals, with a strong free tier and clean, structured views.',
  '<h2>What is Asana?</h2><p>Asana is a work management platform that UK teams use to organise tasks, projects, goals and cross-team workflows. It offers list, board, timeline and calendar views, along with automations, forms and reporting.</p><p>Asana has a generous free tier for small teams and scales to enterprise, with a focus on clarity and accountability rather than heavy customisation. EU data hosting is available.</p>',
  (SELECT id FROM categories WHERE slug = 'project-management'), 9, 'GBP', 'user/month',
  TRUE, TRUE,
  '[{"name":"Personal","price":0,"currency":"GBP","billing":"month","features":["Up to 10 collaborators","List/board/calendar","Basic workflows","Mobile apps"]},{"name":"Starter","price":9,"currency":"GBP","billing":"user/month","features":["Timeline view","Automations","Forms","Reporting dashboards"]}]',
  '["Task & project management","List, board & timeline views","Workflow automation rules","Goals & portfolios","Forms & intake","Reporting dashboards","Integrations (Slack, Teams, etc.)","Free tier for small teams"]',
  '["Clean, structured views","Strong free tier","Good for cross-team work"]',
  'https://example.com/track/asana', 'https://asana.com/',
  'Asana', 2008,
  '["Email","Knowledge Base","Community"]',
  '["United Kingdom","Global"]',
  '["English"]',
  'Asana Review 2026 — Work Management for UK Teams',
  'Asana review for UK teams: task and project management, timelines, automations, free tier, pricing and pros and cons.',
  'published', FALSE, '/logos/asana.png', '#F06A6A'
)
ON CONFLICT (slug) DO NOTHING;

-- Point the 12 products at locally hosted brand logos (public/logos/*.png).
-- Runs for both fresh and existing rows, so environments that already ran an
-- earlier version of this file (with the retired Clearbit URLs) are corrected.
UPDATE software SET logo_url = '/logos/freeagent.png'                      WHERE slug = 'freeagent';
UPDATE software SET logo_url = '/logos/quickfile.png'                      WHERE slug = 'quickfile';
UPDATE software SET logo_url = '/logos/brightpay.png'                      WHERE slug = 'brightpay';
UPDATE software SET logo_url = '/logos/moorepay.png'                       WHERE slug = 'moorepay';
UPDATE software SET logo_url = '/logos/breathe-hr.png'                     WHERE slug = 'breathe-hr';
UPDATE software SET logo_url = '/logos/charliehr.png'                      WHERE slug = 'charliehr';
UPDATE software SET logo_url = '/logos/capsule-crm.png'                    WHERE slug = 'capsule-crm';
UPDATE software SET logo_url = '/logos/hubspot-crm.png'                    WHERE slug = 'hubspot-crm';
UPDATE software SET logo_url = '/logos/sage-200.png'                       WHERE slug = 'sage-200';
UPDATE software SET logo_url = '/logos/dynamics-365-business-central.png'  WHERE slug = 'dynamics-365-business-central';
UPDATE software SET logo_url = '/logos/monday-com.png'                     WHERE slug = 'monday-com';
UPDATE software SET logo_url = '/logos/asana.png'                          WHERE slug = 'asana';

-- ----------------------------------------------------------------------------
-- REVIEWS — 2 human-style UK reviews per new product (24 total).
-- Each block joins to the product by slug and skips rows that already exist,
-- so re-running this file never creates duplicates. Ratings roll up via trigger.
-- ----------------------------------------------------------------------------

-- FreeAgent
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Emma Whitfield','Director','Whitfield Creative Ltd','Marketing & Advertising','1-10','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',5,5,4,4,5,'Finally, MTD without the headache','As a limited company director I dreaded VAT quarter. FreeAgent files straight to HMRC and tells me what I owe well in advance.','Corporation Tax forecast is brilliant, MTD for VAT just works, and it is free through my NatWest account.','The stock/inventory side is basically non-existent, so product businesses will struggle.',NULL::text,NULL::date,'2026-02-18'::date,23),
  ('Callum Fraser','Freelance Consultant','Self-employed','IT & Software','1-10','United Kingdom',FALSE,NULL::text,'1-2 years',4,5,5,3,4,'Perfect for contractors, support can lag','I contract through my own limited company and FreeAgent handles dividends, Self Assessment and expenses without an accountant.','Genuinely easy to learn, Self Assessment filing is smooth, free with my bank.','Live chat can take a while at month end and phone support hours are limited.',NULL::text,NULL::date,'2026-03-27'::date,11)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'freeagent'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- QuickFile
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('David Hargreaves','Owner','Hargreaves Joinery','Construction','1-10','United Kingdom',FALSE,NULL::text,'2+ years',5,4,5,4,4,'Genuinely free and does the job','I run a small joinery business and QuickFile costs me nothing. Invoicing looks professional and the bank tagging saves hours.','Free for a business my size, solid invoicing, VAT returns submit fine.','Interface looks a bit dated and the learning curve at the start was real.',NULL::text,NULL::date,'2026-01-30'::date,15),
  ('Priya Nair','Landlord','Nair Property','Real Estate','1-10','United Kingdom',TRUE,'Verified LinkedIn User','1-2 years',4,4,5,4,4,'Great value for a property portfolio','I manage a handful of rentals and QuickFile keeps my accounts tidy for Self Assessment without an expensive subscription.','Cost, multi-currency, and the community forum is genuinely helpful.','You have to add the Power User Subscription once activity picks up, which is fair but worth knowing.',NULL::text,NULL::date,'2026-03-09'::date,8)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'quickfile'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- BrightPay
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Sarah Bennett','Payroll Manager','Bennett & Clarke Accountants','Accounting','11-50','United Kingdom',TRUE,'Verified LinkedIn User','5+ years',5,5,5,5,5,'The best payroll software we have used','We run payroll for over 200 client companies on BrightPay. RTI submissions are painless and auto-enrolment is fully handled.','Rock-solid RTI, brilliant bureau features, and the support team actually know UK payroll.','The employee app is good but Connect is a separate add-on you need to budget for.','Thanks Sarah — really glad the bureau tools are working well for you. — BrightPay Support'::text,'2026-02-02'::date,'2026-01-19'::date,29),
  ('Mark Docherty','Finance Director','Thistle Manufacturing','Manufacturing','51-200','United Kingdom',FALSE,NULL::text,'2+ years',4,4,5,4,5,'Handles auto-enrolment brilliantly','Switched from a manual process and BrightPay took the pain out of pensions and RTI. Statutory pay calculations are spot on.','Excellent value, reliable HMRC submissions, pension provider integrations just work.','The desktop-to-cloud transition took some getting used to for our team.',NULL::text,NULL::date,'2026-03-14'::date,13)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'brightpay'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- Moorepay
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Helen Marsh','HR & Payroll Lead','Marsh Care Homes','Healthcare','201-500','United Kingdom',TRUE,'Verified LinkedIn User','5+ years',4,3,4,5,4,'Managed payroll took a weight off','With 300+ staff across sites, moving to Moorepay''s managed service means RTI, pensions and starters/leavers are handled for us.','Genuinely knowledgeable UK support, reliable compliance, dedicated account manager.','The software portal feels a little dated and initial onboarding was slow.',NULL::text,NULL::date,'2026-02-21'::date,10),
  ('Andrew Pople','Operations Manager','Pople Logistics','Transportation','51-200','United Kingdom',FALSE,NULL::text,'1-2 years',3,3,3,4,4,'Solid and compliant, priced for larger teams','Does everything we need for payroll and keeps us compliant, but you are paying for the managed service and it shows.','Compliance support is excellent and you always get a person on the phone.','Pricing is quote-based and worked out higher than pure software rivals for us.',NULL::text,NULL::date,'2026-04-06'::date,6)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'moorepay'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- Breathe HR
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Rachel Turner','Operations Director','Turner & Wells Recruitment','Staffing & Recruiting','11-50','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',5,5,4,4,4,'Got us off spreadsheets at last','Breathe replaced a messy holiday spreadsheet and endless email requests. Everyone books leave themselves now and I can see it at a glance.','Really easy to roll out, holiday and sickness tracking is spot on, UK-based support.','Reporting is a bit basic and we would like deeper performance features.',NULL::text,NULL::date,'2026-02-12'::date,18),
  ('Gareth Lloyd','Managing Director','Lloyd Interiors','Design','11-50','United Kingdom',FALSE,NULL::text,'1-2 years',4,5,4,4,3,'Simple HR that my team actually uses','As a non-HR person I needed something obvious. Breathe does holidays, documents and reviews without a manual.','Clean interface, quick to set up, good value for a small business.','Rota and scheduling felt a bit limited for our shift patterns.',NULL::text,NULL::date,'2026-03-20'::date,9)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'breathe-hr'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- CharlieHR
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Olivia Grant','People Lead','Northlight Studio','Design','11-50','United Kingdom',TRUE,'Verified LinkedIn User','1-2 years',5,5,5,4,4,'Ideal first HR system for a startup','We went from Google Sheets to Charlie in an afternoon. Onboarding new starters is now a proper checklist, not a scramble.','Lovely modern interface, easy onboarding, and the free tier let us trial it properly.','Reporting is light and we have outgrown some features as we approach 50 staff.',NULL::text,NULL::date,'2026-02-27'::date,14),
  ('Ben Carter','Co-founder','Carter Digital','IT & Software','1-10','United Kingdom',FALSE,NULL::text,'less than 6 months',4,5,5,3,4,'Does exactly what a small team needs','No frills, just clean time-off and records. Setup was genuinely quick and the team adopted it without training.','Free to start, simple, clearly built for small UK companies.','Support is email-led so answers are not instant, and integrations are limited.',NULL::text,NULL::date,'2026-04-15'::date,5)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'charliehr'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- Capsule CRM
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Nadia Rahman','Sales Director','Rahman Trade Supplies','Wholesale','11-50','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',5,5,4,4,4,'The right amount of CRM','We tried Salesforce and it was overkill. Capsule gives us pipelines and contact history without the complexity or the cost.','Genuinely easy to use, syncs with Xero, and it is a UK company so support gets our context.','Marketing features are basic, so we pair it with a separate email tool.',NULL::text,NULL::date,'2026-02-08'::date,16),
  ('Chris Fielding','Business Owner','Fielding Surveyors','Real Estate','1-10','United Kingdom',FALSE,NULL::text,'1-2 years',4,5,5,3,3,'Great value, keeps me organised','I just needed to stop losing track of enquiries. Capsule''s pipeline and tasks do that and the free tier got me started.','Simple, affordable, FreeAgent integration is handy for us.','Reporting could be richer and the mobile app is functional rather than great.',NULL::text,NULL::date,'2026-03-22'::date,7)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'capsule-crm'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- HubSpot CRM
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Jack Simmons','Head of Growth','Brightloop','IT & Software','51-200','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',5,4,4,4,5,'The free tier hooked us, the platform kept us','We started on the free CRM and gradually added Sales Hub. Having marketing and sales in one place transformed our reporting.','Powerful all-in-one, excellent free tier, huge UK partner and template ecosystem.','Costs ramp up quickly once you need Marketing Hub, and contacts pricing can bite.',NULL::text,NULL::date,'2026-02-16'::date,21),
  ('Sophie Adeyemi','Marketing Manager','Adeyemi Wellness','Health & Wellness','11-50','United Kingdom',FALSE,NULL::text,'1-2 years',4,4,3,4,5,'Brilliant features, watch the upgrade path','HubSpot does almost everything, but the jump from free to paid tiers is a big one for a small business budget.','Sequences and automation are excellent, reporting is genuinely useful.','Value for money dips as you scale contacts, and some tools are locked behind higher tiers.',NULL::text,NULL::date,'2026-03-31'::date,9)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'hubspot-crm'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- Sage 200
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Ian Kavanagh','Financial Controller','Kavanagh Foods','Food & Beverage','51-200','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',4,3,4,4,5,'The right step up from Sage 50','We outgrew Sage 50 and Sage 200 gave us the stock control and multi-company reporting we needed without moving to something enormous.','Strong UK financials and VAT/MTD, proper supply chain, familiar Sage feel.','You really need a good Sage partner, and the interface is functional rather than modern.',NULL::text,NULL::date,'2026-01-27'::date,12),
  ('Louise Pemberton','Head of Finance','Pemberton Engineering','Manufacturing','201-500','United Kingdom',FALSE,NULL::text,'5+ years',4,3,3,4,5,'Capable ERP, partner choice is everything','Sage 200 runs our finance and manufacturing well, but our experience lives and dies by the implementation partner.','Deep functionality, reliable for UK compliance, scales with the business.','Pricing is partner-led and can be opaque; upgrades need planning.',NULL::text,NULL::date,'2026-03-05'::date,8)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'sage-200'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- Dynamics 365 Business Central
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Daniel Osei','IT Director','Osei Retail Group','Retail','201-500','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',4,3,4,4,5,'Excellent if you live in Microsoft 365','Business Central slots into our Microsoft estate perfectly. Excel and Teams integration and Power BI reporting are real strengths.','Deep Microsoft 365 integration, strong UK VAT/MTD localisation, scales well.','There is a learning curve, and you need a capable Microsoft partner to implement it right.',NULL::text,NULL::date,'2026-02-19'::date,13),
  ('Fiona Campbell','Finance Manager','Campbell & Rose','Professional Services','51-200','United Kingdom',FALSE,NULL::text,'1-2 years',4,3,3,3,4,'Powerful, but budget for the rollout','Once configured it is genuinely capable, but the per-user licensing and implementation cost add up for a mid-sized firm.','Cloud ERP that connects finance and operations, good reporting, regular updates.','Onboarding took longer than expected and support routes through the partner.',NULL::text,NULL::date,'2026-04-01'::date,7)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'dynamics-365-business-central'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- monday.com
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Hannah Price','Head of Operations','Price & Partners','Marketing & Advertising','11-50','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',5,4,4,4,5,'Runs our whole agency now','We manage every client project, retainer and campaign on monday. The automations alone save us hours of status-chasing each week.','Incredibly flexible, great automations, genuinely nice to look at and use.','It can get messy without discipline, and costs climb as you add seats and features.',NULL::text,NULL::date,'2026-02-05'::date,19),
  ('Tom Blackwood','Project Lead','Blackwood Construction','Construction','51-200','United Kingdom',FALSE,NULL::text,'1-2 years',4,4,4,3,4,'Flexible, just rein in the setup','Powerful once you settle on a structure. We overbuilt boards at first and had to simplify, but now it works brilliantly for site tracking.','Visual, customisable, good mobile app for the team on site.','Easy to over-complicate, and per-seat pricing adds up for larger teams.',NULL::text,NULL::date,'2026-03-18'::date,10)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'monday-com'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- Asana
INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
SELECT s.id, v.* FROM (VALUES
  ('Megan Foster','Programme Manager','Foster Media','Media Production','11-50','United Kingdom',TRUE,'Verified LinkedIn User','2+ years',5,5,4,4,4,'Keeps cross-team work honest','Asana is where our editorial, design and marketing teams meet. Timeline view and clear ownership stopped things slipping through the cracks.','Clean and structured, great free tier, timeline and rules are genuinely useful.','The best reporting and portfolios sit behind higher tiers, which get pricey.',NULL::text,NULL::date,'2026-02-23'::date,15),
  ('Ryan Docherty','Team Lead','Docherty Software','IT & Software','1-10','United Kingdom',FALSE,NULL::text,'1-2 years',4,5,5,3,4,'Great free tier for a small team','For a team of eight the free plan covers almost everything. It is less fiddly than some rivals and people just get it.','Easy to adopt, good views, strong value at the free and starter tiers.','Support is mostly self-serve, and deep customisation is not really its thing.',NULL::text,NULL::date,'2026-04-09'::date,6)
) AS v(reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count)
CROSS JOIN software s WHERE s.slug = 'asana'
  AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.software_id = s.id AND r.reviewer_name = v.reviewer_name AND r.review_title = v.review_title);

-- ----------------------------------------------------------------------------
-- ALTERNATIVES — link new products to sensible same-category peers.
-- ----------------------------------------------------------------------------
INSERT INTO software_alternatives (software_id, alternative_id, display_order)
SELECT a.id, b.id, ord FROM (VALUES
  ('freeagent','quickfile',1),
  ('freeagent','xero',2),
  ('quickfile','freeagent',1),
  ('brightpay','moorepay',1),
  ('moorepay','brightpay',1),
  ('breathe-hr','charliehr',1),
  ('charliehr','breathe-hr',1),
  ('capsule-crm','hubspot-crm',1),
  ('hubspot-crm','capsule-crm',1),
  ('sage-200','dynamics-365-business-central',1),
  ('dynamics-365-business-central','sage-200',1),
  ('monday-com','asana',1),
  ('asana','monday-com',1)
) AS m(a_slug, b_slug, ord)
JOIN software a ON a.slug = m.a_slug
JOIN software b ON b.slug = m.b_slug
ON CONFLICT (software_id, alternative_id) DO NOTHING;
