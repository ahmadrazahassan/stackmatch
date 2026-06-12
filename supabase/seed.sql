-- ============================================================================
-- CloudPayZA — DEMO SEED DATA
-- Run AFTER migrations.sql.
--
-- ⚠️  All reviews, ratings, quotes and verdicts below are PLACEHOLDER DEMO
-- content for development/layout purposes only. Replace with real, verified
-- content via the admin panel before going live.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- CATEGORIES
-- ----------------------------------------------------------------------------
INSERT INTO categories (id, name, slug, icon, description, display_order) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Accounting Software', 'accounting-software', '🧮', 'Bookkeeping, invoicing, VAT and financial reporting tools for South African businesses.', 1),
  ('c0000000-0000-0000-0000-000000000002', 'Payroll Software', 'payroll-software', '💰', 'Payroll processing, payslips, SARS submissions, UIF and compliance for SA employers.', 2),
  ('c0000000-0000-0000-0000-000000000003', 'HR Software', 'hr-software', '👥', 'Human resources, leave management, performance and employee self-service platforms.', 3),
  ('c0000000-0000-0000-0000-000000000004', 'CRM Software', 'crm-software', '🤝', 'Customer relationship management, sales pipelines and contact management tools.', 4),
  ('c0000000-0000-0000-0000-000000000005', 'ERP Software', 'erp-software', '🏭', 'Enterprise resource planning suites covering finance, inventory and operations.', 5),
  ('c0000000-0000-0000-0000-000000000006', 'Project Management', 'project-management', '📋', 'Task tracking, team collaboration and project planning software.', 6);

-- ----------------------------------------------------------------------------
-- SOFTWARE (8 demo entries)
-- ----------------------------------------------------------------------------
INSERT INTO software (
  id, name, slug, tagline, description_short, description_full,
  category_id, starting_price, price_currency, billing_period,
  free_trial, free_version, pricing_plans, features, top_features,
  affiliate_url, vendor_website, vendor_name, founded_year,
  support_types, countries_available, languages,
  meta_title, meta_description, status, featured
) VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'Sage Accounting', 'sage-accounting',
  'Cloud accounting built for South African small businesses',
  'Cloud-based accounting software with invoicing, VAT returns, bank feeds and reporting designed for SA SMBs.',
  '<h2>What is Sage Accounting?</h2><p>Sage Accounting is a cloud accounting solution aimed at small and medium businesses in South Africa. It covers invoicing, quotes, bank reconciliation, VAT201-ready reporting and inventory tracking.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000001', 299, 'ZAR', 'month',
  TRUE, FALSE,
  '[{"name":"Accounting Start","price":299,"currency":"ZAR","billing":"month","features":["Invoicing","Bank feeds","VAT reporting"]},{"name":"Accounting Standard","price":499,"currency":"ZAR","billing":"month","features":["Everything in Start","Inventory","Multi-user","Advanced reports"]}]',
  '["Invoicing & quotes","Bank feeds & reconciliation","VAT201 reporting","Inventory tracking","Multi-currency","Mobile app","Customer statements","Audit trail"]',
  '["VAT201 reporting","Bank feeds","Invoicing & quotes"]',
  'https://example.com/track/sage-demo', 'https://www.sage.com/en-za/',
  'Sage', 1981,
  '["Phone","Email","Knowledge Base","Live Chat"]',
  '["South Africa","Kenya","Nigeria","United Kingdom"]',
  '["English","Afrikaans"]',
  'Sage Accounting Review 2026 — Pricing, Features & Alternatives',
  'In-depth Sage Accounting review for South African SMBs: pricing in ZAR, VAT features, pros and cons, and top alternatives.',
  'published', TRUE
),
(
  'a0000000-0000-0000-0000-000000000002',
  'Xero', 'xero',
  'Beautiful cloud accounting for growing businesses',
  'Global cloud accounting platform with strong bank feeds, app marketplace and unlimited users on every plan.',
  '<h2>What is Xero?</h2><p>Xero is a global cloud accounting platform popular with accountants and growing SMBs. It offers unlimited users, a large app ecosystem and strong automation around bank reconciliation.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000001', 20, 'USD', 'month',
  TRUE, FALSE,
  '[{"name":"Starter","price":20,"currency":"USD","billing":"month","features":["20 invoices","5 bills","Bank reconciliation"]},{"name":"Standard","price":32,"currency":"USD","billing":"month","features":["Unlimited invoices","Unlimited bills","Bulk reconcile"]}]',
  '["Unlimited users","Bank reconciliation","Invoicing","App marketplace (1000+)","Projects & time tracking","Multi-currency","Payroll integrations","Fixed assets"]',
  '["Unlimited users","Bank reconciliation","App marketplace"]',
  'https://example.com/track/xero-demo', 'https://www.xero.com/za/',
  'Xero', 2006,
  '["Email","Knowledge Base","Forum"]',
  '["South Africa","United Kingdom","United States","Australia","New Zealand"]',
  '["English"]',
  'Xero Review 2026 — Is It Right for South African Businesses?',
  'Xero review for SA businesses: USD pricing, features, integrations, and how it compares to Sage and QuickBooks.',
  'published', TRUE
),
(
  'a0000000-0000-0000-0000-000000000003',
  'QuickBooks Online', 'quickbooks-online',
  'The world''s most popular small business accounting software',
  'Feature-rich cloud accounting with powerful reporting, receipt capture and a large accountant network.',
  '<h2>What is QuickBooks Online?</h2><p>QuickBooks Online is Intuit''s cloud accounting product, known for deep reporting, receipt capture and a vast ecosystem of advisors and integrations.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000001', 38, 'ZAR', 'month',
  TRUE, FALSE,
  '[{"name":"Simple Start","price":38,"currency":"ZAR","billing":"month","features":["Income & expenses","Invoicing","Reports"]},{"name":"Essentials","price":58,"currency":"ZAR","billing":"month","features":["Bill management","Multi-user","Time tracking"]}]',
  '["Invoicing","Expense tracking","Receipt capture","Custom reports","Inventory","Project profitability","Mileage tracking","Tax categorisation"]',
  '["Custom reports","Receipt capture","Invoicing"]',
  'https://example.com/track/qbo-demo', 'https://quickbooks.intuit.com/za/',
  'Intuit', 1983,
  '["Phone","Live Chat","Knowledge Base"]',
  '["South Africa","United States","United Kingdom","Canada"]',
  '["English"]',
  'QuickBooks Online Review 2026 — Pricing & Features for SA',
  'QuickBooks Online review for South African SMBs: local pricing, features, pros and cons, and the best alternatives.',
  'published', TRUE
),
(
  'a0000000-0000-0000-0000-000000000004',
  'PaySpace', 'payspace',
  'Cloud payroll & HR built for Africa',
  'South African cloud payroll with native SARS e@syFile integration, multi-country compliance and employee self-service.',
  '<h2>What is PaySpace?</h2><p>PaySpace (now part of Deel) is a cloud-native payroll and HR platform built in South Africa, with statutory compliance across 40+ African countries, SARS submissions and employee self-service.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000002', 55, 'ZAR', 'user/month',
  TRUE, FALSE,
  '[{"name":"Lite","price":55,"currency":"ZAR","billing":"user/month","features":["Payslips","Leave","ESS"]},{"name":"Premier","price":85,"currency":"ZAR","billing":"user/month","features":["Everything in Lite","Workflows","Advanced reporting"]}]',
  '["SARS e@syFile integration","EMP201 / EMP501","UIF & SDL compliance","Employee self-service","Leave management","Multi-country payroll","Payslip distribution","Audit trail"]',
  '["SARS compliance","Employee self-service","Multi-country payroll"]',
  'https://example.com/track/payspace-demo', 'https://payspace.com/za/',
  'PaySpace by Deel', 2000,
  '["Phone","Email","Knowledge Base","Live Chat"]',
  '["South Africa","Kenya","Nigeria","Ghana","Egypt"]',
  '["English"]',
  'PaySpace Review 2026 — SA Payroll Software Tested',
  'PaySpace review: SARS-compliant cloud payroll for South African businesses. Pricing, features, pros & cons.',
  'published', TRUE
),
(
  'a0000000-0000-0000-0000-000000000005',
  'SimplePay', 'simplepay',
  'Painless online payroll for South Africa',
  'Straightforward SA payroll with automatic tax calculations, SARS filing season exports and a clean interface.',
  '<h2>What is SimplePay?</h2><p>SimplePay is an online payroll system focused on simplicity for South African SMBs: automatic PAYE/UIF/SDL calculations, leave, and filing season exports.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000002', 39, 'ZAR', 'user/month',
  TRUE, FALSE,
  '[{"name":"Standard","price":39,"currency":"ZAR","billing":"user/month","features":["Full payroll","Leave","Self-service","Support"]}]',
  '["Automatic PAYE/UIF/SDL","Payslips & IRP5s","Leave management","Employee self-service","Accounting integrations","Bulk payments file","EMP201 returns","Custom items"]',
  '["Automatic tax calculations","IRP5 generation","Accounting integrations"]',
  'https://example.com/track/simplepay-demo', 'https://www.simplepay.co.za/',
  'SimplePay', 2009,
  '["Email","Knowledge Base"]',
  '["South Africa"]',
  '["English"]',
  'SimplePay Review 2026 — Simple SA Payroll, Tested',
  'SimplePay review for South African employers: ZAR pricing, SARS compliance features, pros and cons, alternatives.',
  'published', FALSE
),
(
  'a0000000-0000-0000-0000-000000000006',
  'Zoho CRM', 'zoho-crm',
  'Sell smarter, better, faster',
  'Affordable, customisable CRM with sales automation, omnichannel communication and a generous free tier.',
  '<h2>What is Zoho CRM?</h2><p>Zoho CRM is a flexible customer relationship management platform with strong automation, customisation and an affordable price point for SMBs.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000004', 14, 'USD', 'user/month',
  TRUE, TRUE,
  '[{"name":"Free","price":0,"currency":"USD","billing":"month","features":["3 users","Leads & deals","Basic automation"]},{"name":"Standard","price":14,"currency":"USD","billing":"user/month","features":["Scoring rules","Workflows","Custom dashboards"]}]',
  '["Lead management","Deal pipelines","Workflow automation","Email integration","Omnichannel inbox","Custom modules","Analytics","Mobile app"]',
  '["Workflow automation","Deal pipelines","Free tier"]',
  'https://example.com/track/zoho-demo', 'https://www.zoho.com/crm/',
  'Zoho Corporation', 1996,
  '["Email","Live Chat","Knowledge Base","Phone"]',
  '["South Africa","Global"]',
  '["English"]',
  'Zoho CRM Review 2026 — Best Value CRM for SA SMBs?',
  'Zoho CRM review for South African small businesses: free plan, pricing, automation features and alternatives.',
  'published', TRUE
),
(
  'a0000000-0000-0000-0000-000000000007',
  'BambooHR', 'bamboohr',
  'HR software with heart',
  'People-first HR platform covering hiring, onboarding, leave, performance and employee records.',
  '<h2>What is BambooHR?</h2><p>BambooHR is an HR information system for SMBs covering the employee lifecycle: applicant tracking, onboarding, time off, performance and reporting.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000003', 250, 'ZAR', 'user/month',
  TRUE, FALSE,
  '[{"name":"Core","price":250,"currency":"ZAR","billing":"user/month","features":["Employee records","Time off","Reporting"]},{"name":"Pro","price":420,"currency":"ZAR","billing":"user/month","features":["Performance","Surveys","Advanced workflows"]}]',
  '["Employee database","Applicant tracking","Onboarding checklists","Leave management","Performance reviews","eNPS surveys","Org chart","Reporting"]',
  '["Applicant tracking","Onboarding","Leave management"]',
  'https://example.com/track/bamboohr-demo', 'https://www.bamboohr.com/',
  'BambooHR', 2008,
  '["Email","Phone","Knowledge Base"]',
  '["South Africa","Global"]',
  '["English"]',
  'BambooHR Review 2026 — HR Software for Growing SA Teams',
  'BambooHR review: features, ZAR-equivalent pricing, pros and cons for South African HR teams, plus alternatives.',
  'published', FALSE
),
(
  'a0000000-0000-0000-0000-000000000008',
  'Odoo', 'odoo',
  'All your business on one platform',
  'Open-source modular ERP: accounting, inventory, CRM, eCommerce and 40+ apps that work together.',
  '<h2>What is Odoo?</h2><p>Odoo is a modular open-source ERP. Start with one app (accounting, inventory, CRM) and add modules as you grow — all sharing one database.</p><p>[Demo description — replace with full editorial copy in the admin panel.]</p>',
  'c0000000-0000-0000-0000-000000000005', 11, 'USD', 'user/month',
  TRUE, TRUE,
  '[{"name":"One App Free","price":0,"currency":"USD","billing":"month","features":["One app","Unlimited users"]},{"name":"Standard","price":11,"currency":"USD","billing":"user/month","features":["All apps","Odoo Online hosting"]}]',
  '["Modular apps","Accounting","Inventory & MRP","CRM & sales","eCommerce","POS","Studio customisation","Open source"]',
  '["Modular apps","All-in-one ERP","Open source"]',
  'https://example.com/track/odoo-demo', 'https://www.odoo.com/',
  'Odoo S.A.', 2005,
  '["Email","Knowledge Base","Forum"]',
  '["South Africa","Global"]',
  '["English","French","Dutch"]',
  'Odoo Review 2026 — The Modular ERP for SA SMBs',
  'Odoo review: modular open-source ERP for South African businesses. Free plan, pricing, modules and alternatives.',
  'published', FALSE
);

-- ----------------------------------------------------------------------------
-- REVIEWS (demo — ratings auto-roll-up to software via trigger)
-- ----------------------------------------------------------------------------
INSERT INTO reviews (
  software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry,
  reviewer_company_size, reviewer_country, verified_linkedin, verified_badge,
  used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service,
  functionality, review_title, summary, pros, cons,
  vendor_response, vendor_response_date, review_date, helpful_count
) VALUES
-- Sage Accounting
('a0000000-0000-0000-0000-000000000001', 'Thandi M. (Demo)', 'Financial Manager', 'Demo Trading Co', 'Retail', '11-50', 'South Africa', TRUE, 'Verified LinkedIn User', '2+ years', 4, 4, 4, 3, 4,
 'Solid choice for VAT-registered businesses',
 'We moved from spreadsheets to Sage Accounting two years ago and the VAT201 reporting alone has been worth it.',
 'VAT reporting is excellent, bank feeds from FNB work reliably, easy for our bookkeeper to use.',
 'Support response times can be slow during filing season. Mobile app is limited.',
 'Thank you for the feedback, Thandi. We have expanded our SA support team for filing season. — Sage Customer Care', '2026-02-10', '2026-01-28', 14),
('a0000000-0000-0000-0000-000000000001', 'Pieter V. (Demo)', 'Owner', 'Demo Auto Repairs', 'Construction', '1-10', 'South Africa', FALSE, NULL, '6-12 months', 3, 3, 3, 3, 4,
 'Good features but takes time to learn',
 'Powerful once set up, but the initial chart of accounts setup was confusing for a non-accountant.',
 'Quotes-to-invoice flow is great. Inventory tracking works well for our parts.',
 'Steep learning curve if you have no bookkeeping background. Wish there were more video tutorials.',
 NULL, NULL, '2026-03-15', 6),
('a0000000-0000-0000-0000-000000000001', 'Lerato K. (Demo)', 'Accountant', 'Demo Advisory', 'Accounting', '11-50', 'South Africa', TRUE, 'Verified LinkedIn User', '5+ years', 5, 5, 4, 4, 5,
 'My go-to recommendation for SMB clients',
 'As a practising accountant I manage 30+ client books on Sage. Reliable, compliant, and clients find it easy.',
 'Accountant edition is superb. Reliable VAT and audit trail. Clients rarely need training.',
 'Pricing has crept up year on year.',
 NULL, NULL, '2025-11-02', 31),

-- Xero
('a0000000-0000-0000-0000-000000000002', 'James O. (Demo)', 'CFO', 'Demo Logistics', 'IT', '51-200', 'South Africa', TRUE, 'Verified LinkedIn User', '2+ years', 5, 5, 4, 4, 5,
 'Best-in-class reconciliation',
 'Bank reconciliation is genuinely enjoyable. The app ecosystem means we automated almost everything.',
 'Unlimited users on all plans. Reconciliation suggestions are scarily accurate. Great API.',
 'USD pricing hurts with the exchange rate. No phone support.',
 NULL, NULL, '2026-04-02', 22),
('a0000000-0000-0000-0000-000000000002', 'Anika P. (Demo)', 'Bookkeeper', 'Demo Books', 'Accounting', '1-10', 'South Africa', FALSE, NULL, '1-2 years', 4, 5, 3, 3, 4,
 'Lovely to use, pricey in rand',
 'The interface is the best I have used, but the monthly cost in rand keeps climbing.',
 'Clean UI, fast, brilliant find-and-recode feature.',
 'Value for money suffers at current exchange rates. Support is email-only and slow.',
 NULL, NULL, '2026-02-20', 9),

-- QuickBooks Online
('a0000000-0000-0000-0000-000000000003', 'Sipho N. (Demo)', 'Director', 'Demo Consulting', 'Legal', '1-10', 'South Africa', FALSE, NULL, '1-2 years', 4, 4, 4, 3, 4,
 'Reports are the killer feature',
 'Customisable reports give me a clear monthly picture. Receipt capture saves hours.',
 'Report builder, receipt snap, projects profitability tracking.',
 'Local VAT handling needs manual tweaks. Occasional sync issues with local banks.',
 NULL, NULL, '2026-01-12', 11),
('a0000000-0000-0000-0000-000000000003', 'Maria S. (Demo)', 'Office Manager', 'Demo Medical', 'Healthcare', '11-50', 'South Africa', TRUE, 'Verified LinkedIn User', '6-12 months', 3, 3, 4, 2, 3,
 'Decent software, frustrating support',
 'Software does the job but every support interaction routes to international teams unfamiliar with SA specifics.',
 'Affordable entry plan. Easy invoicing.',
 'Support does not understand SARS requirements. Bank feed dropped twice this year.',
 NULL, NULL, '2026-03-30', 5),

-- PaySpace
('a0000000-0000-0000-0000-000000000004', 'Nomvula D. (Demo)', 'Payroll Manager', 'Demo Mining Services', 'Mining', '201-500', 'South Africa', TRUE, 'Verified LinkedIn User', '5+ years', 5, 4, 4, 5, 5,
 'SARS filing season is no longer a nightmare',
 'EMP501 reconciliation used to take us a week. With PaySpace it is two days, and e@syFile exports just work.',
 'Compliance is flawless. ESS reduced HR queries by half. Multi-country support for our Botswana branch.',
 'Initial implementation took longer than quoted.',
 'Thank you Nomvula! We have since streamlined onboarding to a 2-week standard track. — PaySpace Support', '2026-01-20', '2026-01-05', 27),
('a0000000-0000-0000-0000-000000000004', 'Kobus B. (Demo)', 'HR Director', 'Demo Manufacturing', 'Manufacturing', '51-200', 'South Africa', FALSE, NULL, '2+ years', 4, 4, 3, 4, 5,
 'Powerful but you pay for it',
 'Feature-wise nothing local comes close, though per-employee pricing adds up at our headcount.',
 'Statutory updates are always on time. Custom reports. Strong API.',
 'Costs scale steeply. Some screens feel dated.',
 NULL, NULL, '2026-02-14', 8),

-- SimplePay
('a0000000-0000-0000-0000-000000000005', 'Zanele T. (Demo)', 'Practice Owner', 'Demo Accounting Studio', 'Accounting', '1-10', 'South Africa', TRUE, 'Verified LinkedIn User', '2+ years', 5, 5, 5, 4, 4,
 'Does exactly what it promises',
 'I run payroll for 15 small clients on SimplePay. Setup takes minutes and IRP5s generate perfectly.',
 'Honest pricing. Zero-fuss SARS compliance. Xero integration is seamless.',
 'No phone support. Limited HR features beyond payroll.',
 NULL, NULL, '2025-12-10', 19),
('a0000000-0000-0000-0000-000000000005', 'Dineo M. (Demo)', 'Admin Manager', 'Demo NPO', 'NGO', '11-50', 'South Africa', FALSE, NULL, '1-2 years', 4, 5, 5, 3, 3,
 'Perfect for a small NPO budget',
 'Affordable and simple. We process 25 staff monthly without an outsourced bureau.',
 'Per-payslip pricing is fair. Leave tracking included.',
 'Reporting is basic. Email-only support can take a day.',
 NULL, NULL, '2026-04-18', 7),

-- Zoho CRM
('a0000000-0000-0000-0000-000000000006', 'Riaan E. (Demo)', 'Sales Manager', 'Demo Solar', 'Construction', '11-50', 'South Africa', FALSE, NULL, '1-2 years', 4, 3, 5, 3, 4,
 'Unbeatable value, busy interface',
 'We evaluated Salesforce and HubSpot; Zoho gave us 90% of the features at a fraction of the price.',
 'Price. Workflow automation. WhatsApp integration for our SA leads.',
 'UI is cluttered. Admin settings are a maze.',
 NULL, NULL, '2026-03-08', 12),
('a0000000-0000-0000-0000-000000000006', 'Fatima A. (Demo)', 'Founder', 'Demo Recruitment', 'Real Estate', '1-10', 'South Africa', TRUE, 'Verified LinkedIn User', 'less than 6 months', 3, 2, 4, 3, 3,
 'Powerful but overwhelming for a beginner',
 'There is a feature for everything, but finding it is the challenge. Free tier was great to start.',
 'Generous free plan. Email tracking.',
 'Onboarding is sink-or-swim. Some modules feel like separate products.',
 NULL, NULL, '2026-05-02', 4),

-- BambooHR
('a0000000-0000-0000-0000-000000000007', 'Grace W. (Demo)', 'HR Business Partner', 'Demo Fintech', 'Finance', '51-200', 'South Africa', TRUE, 'Verified LinkedIn User', '2+ years', 4, 5, 3, 4, 4,
 'Employees actually use it',
 'Leave requests, payslip access and reviews all happen in one place. Adoption was instant.',
 'Beautiful UX. Onboarding checklists. Great mobile app.',
 'Expensive in rand. No native SA payroll — we integrate separately.',
 NULL, NULL, '2026-02-25', 10),

-- Odoo
('a0000000-0000-0000-0000-000000000008', 'Johan R. (Demo)', 'Operations Director', 'Demo Distribution', 'Manufacturing', '51-200', 'South Africa', FALSE, NULL, '2+ years', 4, 3, 5, 3, 5,
 'One system replaced five subscriptions',
 'We consolidated accounting, inventory, CRM and our webshop into Odoo. Massive saving, some assembly required.',
 'Module breadth. Open source flexibility. One database for everything.',
 'You need a partner or in-house dev for serious customisation. Upgrades between versions are work.',
 NULL, NULL, '2026-01-22', 16),
('a0000000-0000-0000-0000-000000000008', 'Priya N. (Demo)', 'IT Manager', 'Demo Retail Group', 'Retail', '201-500', 'South Africa', TRUE, 'Verified LinkedIn User', '1-2 years', 3, 3, 4, 2, 4,
 'Great platform, partner quality varies',
 'The software is capable but our first implementation partner missed deadlines. Choose carefully.',
 'POS + inventory + accounting integration is genuinely seamless.',
 'Official support is distant; you depend on local partners. Studio customisations broke on upgrade.',
 NULL, NULL, '2026-04-11', 6);

-- ----------------------------------------------------------------------------
-- ALTERNATIVES
-- ----------------------------------------------------------------------------
INSERT INTO software_alternatives (software_id, alternative_id, display_order) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 1),
  ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 2),
  ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 3),
  ('a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 1),
  ('a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 2),
  ('a0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 1),
  ('a0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 2),
  ('a0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005', 1),
  ('a0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000004', 1),
  ('a0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000008', 1),
  ('a0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000004', 1),
  ('a0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000006', 1);

-- ----------------------------------------------------------------------------
-- COMPARISONS
-- ----------------------------------------------------------------------------
INSERT INTO comparisons (software_a_id, software_b_id, custom_verdict, meta_title, meta_description, status) VALUES
(
  'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002',
  '[Demo verdict] For VAT-registered South African businesses that want local compliance out of the box, Sage Accounting edges ahead. Xero wins on user experience, unlimited users and its app ecosystem — if you can stomach USD pricing.',
  'Sage Accounting vs Xero 2026 — Which Is Better for SA SMBs?',
  'Sage Accounting vs Xero compared for South African businesses: pricing, VAT compliance, features and verdict.',
  'published'
),
(
  'a0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005',
  '[Demo verdict] SimplePay is the value pick for straightforward SA payroll under ~50 staff. PaySpace justifies its premium with multi-country compliance, deeper HR features and enterprise-grade reporting.',
  'PaySpace vs SimplePay 2026 — SA Payroll Head-to-Head',
  'PaySpace vs SimplePay for South African payroll: pricing per employee, SARS compliance, features and verdict.',
  'published'
);

-- ----------------------------------------------------------------------------
-- ARTICLES (demo)
-- ----------------------------------------------------------------------------
INSERT INTO articles (
  title, slug, excerpt, content, category_tag, related_software_id,
  author_name, author_title, author_bio,
  meta_title, meta_description, read_time_minutes,
  status, featured, published_date
) VALUES
(
  'The 8 Best Accounting Software for South African Small Businesses (2026)',
  'best-accounting-software-south-africa',
  'We compared the leading cloud accounting platforms on VAT compliance, ZAR pricing and ease of use. Here are our top picks for SA SMBs in 2026.',
  '<h2>How we chose</h2><p>[Demo article body] We evaluated each platform on five criteria: SARS/VAT compliance, total cost in rand, ease of use for non-accountants, bank feed reliability with major SA banks, and support quality.</p><h2>1. Sage Accounting — best for VAT compliance</h2><p>[Demo content — replace via admin panel.]</p><h2>2. Xero — best user experience</h2><p>[Demo content — replace via admin panel.]</p><h2>3. QuickBooks Online — best reporting</h2><p>[Demo content — replace via admin panel.]</p><h2>Verdict</h2><p>[Demo content — replace via admin panel.]</p>',
  'Guide', 'a0000000-0000-0000-0000-000000000001',
  'CloudPayZA Editorial (Demo)', 'Senior Software Analyst',
  'The CloudPayZA editorial team researches and tests business software for the South African market.',
  'Best Accounting Software in South Africa 2026 — Top 8 Compared',
  'The 8 best accounting software platforms for South African SMBs in 2026, compared on VAT compliance, pricing and features.',
  9, 'published', TRUE, '2026-05-20'
),
(
  'Sage vs Xero vs QuickBooks: Which Should Your SA Business Choose?',
  'sage-vs-xero-vs-quickbooks-south-africa',
  'The big three of cloud accounting, compared head-to-head on the things that matter to South African businesses.',
  '<h2>The contenders</h2><p>[Demo article body] Sage, Xero and QuickBooks dominate SA cloud accounting. Each has a distinct sweet spot.</p><h2>Pricing in rand</h2><p>[Demo content — replace via admin panel.]</p><h2>VAT &amp; SARS compliance</h2><p>[Demo content — replace via admin panel.]</p><h2>Our recommendation</h2><p>[Demo content — replace via admin panel.]</p>',
  'Comparison', 'a0000000-0000-0000-0000-000000000002',
  'CloudPayZA Editorial (Demo)', 'Senior Software Analyst',
  'The CloudPayZA editorial team researches and tests business software for the South African market.',
  'Sage vs Xero vs QuickBooks for South Africa (2026 Comparison)',
  'Sage vs Xero vs QuickBooks compared for South African businesses: pricing, VAT compliance, features and our verdict.',
  7, 'published', TRUE, '2026-05-28'
),
(
  'Payroll Compliance in South Africa: A 2026 Checklist for Employers',
  'payroll-compliance-south-africa-checklist',
  'PAYE, UIF, SDL, EMP201, EMP501, IRP5s — a plain-English checklist of what every SA employer must file, and when.',
  '<h2>Monthly obligations</h2><p>[Demo article body] Every registered employer must submit an EMP201 and pay PAYE, UIF and SDL by the 7th of the following month.</p><h2>Bi-annual reconciliation</h2><p>[Demo content — replace via admin panel.]</p><h2>How payroll software helps</h2><p>[Demo content — replace via admin panel.]</p>',
  'Guide', 'a0000000-0000-0000-0000-000000000004',
  'CloudPayZA Editorial (Demo)', 'Payroll Specialist',
  'The CloudPayZA editorial team researches and tests business software for the South African market.',
  'SA Payroll Compliance Checklist 2026 — PAYE, UIF, EMP501',
  'A practical 2026 payroll compliance checklist for South African employers: monthly EMP201s, filing season, IRP5s and more.',
  6, 'published', FALSE, '2026-06-03'
);
