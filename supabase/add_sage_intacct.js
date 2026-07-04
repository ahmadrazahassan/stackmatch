// ============================================================================
// Adds Sage Intacct as a new product in the Accounting category with full
// editorial content and a review set. Safe to re-run: updates the existing
// row and replaces its reviews if the slug already exists.
//
//   node supabase/add_sage_intacct.js
// ============================================================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const raw = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[t.slice(0, i).trim()] = v;
  }
  return env;
}

// ---------------------------------------------------------------------------
// Software record — Sage Intacct
// ---------------------------------------------------------------------------
const SOFTWARE = {
  name: 'Sage Intacct',
  slug: 'sage-intacct',
  tagline: 'Cloud financial management for mid sized organisations that have outgrown small business accounting',
  description_short:
    'Mid market cloud financial management platform with a dimensional general ledger, multi entity consolidation, real time dashboards, AP automation and revenue recognition. Quote based pricing.',
  description_full: `<h2>What is Sage Intacct?</h2><p>Sage Intacct is the mid market financial management platform in the Sage range, sitting well above Sage Accounting and aimed at organisations whose finance team has genuinely outgrown small business software. It started life as an independent US company, was acquired by Sage in 2017, and has since become one of the most widely deployed cloud finance systems among nonprofits, healthcare groups, professional services firms and subscription businesses. Where Sage Accounting is a bookkeeping tool an owner runs themselves, Intacct is a system a finance team lives in all day, with the controls, audit trail and reporting depth that auditors and boards expect.</p><h2>The dimensional general ledger</h2><p>The heart of the product, and the reason finance people get evangelical about it, is the dimensional general ledger. Instead of building a sprawling chart of accounts with a separate code for every department, location, project and fund, you keep a short clean chart and tag every transaction with dimensions such as entity, department, location, project, customer or grant. Reports can then slice the same numbers any way you like without a single spreadsheet export. For a charity tracking restricted funds, a clinic group reporting by site, or an agency measuring profitability by client, this one design decision removes most of the month end spreadsheet gymnastics that plague growing finance teams.</p><h2>Multi entity consolidation</h2><p>Intacct handles multiple legal entities natively. Each entity keeps its own books, base currency and tax registration, and consolidation runs automatically, including intercompany eliminations and currency translation. Groups that used to spend the first two weeks of every month stitching entity accounts together in Excel routinely report closing in a few days instead. Adding a new entity is configuration rather than a new implementation, which matters to acquisitive businesses.</p><h2>Reporting and dashboards</h2><p>Reporting is the other pillar. Role based dashboards show live figures rather than last month's, with drill down from a board level number all the way to the underlying invoice. The report writer is powerful, and it is fair to say it has a learning curve, most teams get their implementation partner to build the core pack and then learn to maintain it. Once built, the monthly board pack largely produces itself.</p><h2>Automation and integrations</h2><p>Accounts payable automation covers capture, approval workflows and payment runs, and the platform handles recurring and subscription billing with proper revenue recognition under IFRS 15 and ASC 606, which is why SaaS businesses show up so often in its customer base. The integration story is strong: a native Salesforce connector keeps orders and invoicing in sync, an open API is well documented, and the marketplace covers payroll (ADP, Paychex), expenses (Concur, Expensify), billing and tax tools. In the UK it is MTD compliant for VAT group submissions.</p><h2>What it costs</h2><p>There is no public price list and no free trial, pricing is quote based and depends on the modules you take, the number of entities and the number of users. As a rough guide, UK organisations should expect annual subscriptions starting in the low five figures, plus a one off implementation project through a Sage partner that often costs as much as the first year's subscription. This is a considered purchase with a proper selection process, not a credit card signup. Renewal increases are the most common complaint from long term customers, so negotiate multi year terms up front.</p><h2>Where it falls short</h2><p>Intacct is not a full ERP. Inventory and light order management exist, but manufacturers and stock heavy distributors usually end up on NetSuite or a dedicated system instead. The interface is functional rather than beautiful and some screens feel dated. Success depends heavily on the implementation partner you choose, a rushed implementation shows up as reporting problems for years. And smaller organisations are sometimes sold up into it before they need it, if Sage Accounting or Xero still fits your complexity, the extra spend buys little.</p><h2>Who should choose it</h2><p>Choose Sage Intacct when you have multiple entities, funds or locations to consolidate, when the board wants reporting your current system cannot produce without spreadsheets, or when revenue recognition rules are becoming a genuine burden. It is consistently rated among the strongest mid market finance platforms for nonprofits and services businesses. If you are a product business needing deep stock control, or a small business that just wants easy books, look elsewhere in the range.</p>`,

  starting_price: null,
  price_currency: 'GBP',
  billing_period: 'year',
  free_trial: false,
  free_version: false,

  pricing_plans: [
    {
      name: 'Sage Intacct',
      price: null,
      currency: 'GBP',
      billing: 'year',
      features: [
        'Quote based annual subscription',
        'Priced by modules, entities and users',
        'Core financials and dimensional ledger',
        'Multi entity consolidation',
        'Dashboards and report writer',
        'AP automation and approvals',
        'Partner led implementation',
        'Personalised demo before purchase',
      ],
    },
  ],

  features: [
    'Dimensional general ledger',
    'Multi entity consolidation',
    'Intercompany eliminations',
    'Multi currency with translation',
    'Real time dashboards',
    'Custom report writer',
    'Accounts payable automation',
    'Approval workflows',
    'Accounts receivable and collections',
    'Recurring and subscription billing',
    'Revenue recognition (IFRS 15 / ASC 606)',
    'Project accounting and costing',
    'Fund and grant accounting',
    'Fixed asset management',
    'Cash management and bank feeds',
    'Purchasing and requisitions',
    'Audit trail and granular permissions',
    'Open API and Salesforce connector',
    'MTD compliant VAT submissions',
    'Time and expense management',
  ],
  top_features: ['Dimensional general ledger', 'Multi entity consolidation', 'Real time dashboards'],
  integrations: [
    'Salesforce',
    'ADP Workforce Now',
    'SAP Concur',
    'Expensify',
    'Paychex Flex',
    'BILL',
    'Avalara',
    'Ramp',
    'Microsoft Excel',
    'PayPal',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/sage-business-cloud/intacct/',
  vendor_website: 'https://www.sage.com/en-gb/sage-business-cloud/intacct/',
  vendor_name: 'Sage',
  founded_year: 1999,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia', 'South Africa'],
  languages: ['English'],

  meta_title: 'Sage Intacct Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent Sage Intacct review: quote based pricing explained, dimensional ledger, multi entity consolidation, reporting, integrations, real user pros and cons, and the best alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Sage_South_Africa_Logo_0.svg',
};

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
const REVIEWS = [
  {
    reviewer_name: 'Alison Pemberton', reviewer_job_title: 'Head of Finance', reviewer_company: 'Rowanfield Care Group',
    reviewer_industry: 'Hospital & Health Care', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Month end went from twelve days to four',
    summary: 'We run nine care homes as separate entities and consolidation used to be a fortnight of spreadsheets. Intacct does it overnight with the intercompany eliminations handled automatically. That alone justified the project.',
    pros: 'Consolidation across entities is effortless once configured. Dimensions mean one clean chart of accounts instead of the coding monster we had before. Drill down from any board report number straight to the invoice behind it.',
    cons: 'The report writer took our management accountant a good three months to get comfortable with. Budget the partner time for report building because you will not do it well yourself in week one.',
    review_date: '2026-05-14', helpful_count: 24, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Marcus Delaney', reviewer_job_title: 'Finance Director', reviewer_company: 'Harbourview Hospitality Ltd',
    reviewer_industry: 'Hospitality', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 5,
    review_title: 'Powerful system, watch the renewal quote',
    summary: 'Functionally it has been excellent across our restaurant group. Commercially, our first renewal came in well above what we expected and it took a firm conversation to land somewhere sensible.',
    pros: 'Site level P&Ls through location dimensions with zero extra bookkeeping effort. AP automation handles hundreds of supplier invoices a week. Bank feeds and matching rules are reliable.',
    cons: 'Renewal pricing. Get increases capped in the contract up front, in writing. Also the mobile experience is an afterthought.',
    review_date: '2026-03-22', helpful_count: 29, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Thank you Marcus. We understand pricing predictability matters and your account team can discuss multi year agreements that fix renewal terms. Sage Customer Care',
    vendor_response_date: '2026-03-30',
  },
  {
    reviewer_name: 'Ruth Calloway', reviewer_job_title: 'Director of Finance', reviewer_company: 'Brightpath Children’s Charity',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Restricted fund reporting finally without spreadsheets',
    summary: 'We track over forty restricted funds and grants. Tagging every transaction with a fund dimension means I can produce a funder report in minutes that used to take a day of Excel reconciliation. Our auditors commented on the improvement.',
    pros: 'Fund and grant accounting is genuinely first class for a UK charity. Dashboards for budget holders mean programme managers see their own spend without asking finance. Support has been responsive and knowledgeable.',
    cons: 'It is a significant cost for a charity and we had to make the case carefully to trustees. Gift aid and fundraising CRM still live in separate systems.',
    review_date: '2026-04-09', helpful_count: 31, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'James Okonkwo', reviewer_job_title: 'Financial Controller', reviewer_company: 'Vantage Point Software',
    reviewer_industry: 'Computer Software', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Revenue recognition for SaaS done properly',
    summary: 'We moved off Xero when deferred revenue schedules became unmanageable. Intacct recognises revenue against contract terms automatically and the deferred revenue balance just reconciles now.',
    pros: 'IFRS 15 revenue recognition without spreadsheet schedules. The Salesforce connector means closed won opportunities become contracts and invoices without rekeying. Investor reporting pack runs itself.',
    cons: 'Implementation took five months against a three month plan, mostly our data cleanliness to be fair. The UI looks a decade older than the price tag suggests.',
    review_date: '2026-02-18', helpful_count: 22, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Patricia Volkov', reviewer_job_title: 'VP Finance', reviewer_company: 'Meridian Health Partners',
    reviewer_industry: 'Hospital & Health Care', reviewer_company_size: '501-1000', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Solid backbone for a multi site healthcare group',
    summary: 'Three years in across fourteen clinics. The system scales fine, our frustrations are mostly with support response times on complex tickets rather than the product itself.',
    pros: 'Clinic level reporting through dimensions. Purchasing approvals stopped the maverick spend problem we had. Uptime has been excellent, I can recall two brief outages in three years.',
    cons: 'Tier one support reads from scripts, you have to fight to reach someone who can discuss an intercompany issue properly. Some admin screens require too many clicks for routine tasks.',
    review_date: '2025-11-30', helpful_count: 18, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Howard Bexley', reviewer_job_title: 'Chief Financial Officer', reviewer_company: 'Bexley & Partner Advisory',
    reviewer_industry: 'Financial Services', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The reporting sold it, the close process keeps it',
    summary: 'I have implemented four finance systems in my career and this was the least painful. We close in three working days and the partners get live dashboards instead of a PDF three weeks after month end.',
    pros: 'Report writer is the most capable I have used at this level of the market once mastered. Checklists and task management inside the close process. Granular permissions that satisfy our compliance team.',
    cons: 'Training new joiners takes longer than it would on QuickBooks or Xero, this is a professional tool with professional depth. Price it against the headcount it saves, not against small business software.',
    review_date: '2026-01-26', helpful_count: 20, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Sinead Gallagher', reviewer_job_title: 'Finance Manager', reviewer_company: 'Atlantic Coast Renewables',
    reviewer_industry: 'Renewables & Environment', reviewer_company_size: '51-200', reviewer_country: 'Ireland',
    used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Steep first quarter, worth it by the second',
    summary: 'Honest assessment: the first three months were hard. Different logic from anything the team had used, and the training material assumes more accounting systems experience than most people have. Then it clicked and nobody would go back.',
    pros: 'Project accounting tracks each wind site development as its own dimension with committed costs visible. Multi currency between our euro and sterling entities is handled cleanly. The API let us connect our asset monitoring platform.',
    cons: 'Onboarding materials are very US centric, VAT and Irish specifics needed our partner to fill the gaps. Search within the application is weak, you learn where things live rather than finding them.',
    review_date: '2026-04-28', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Derek Mansfield', reviewer_job_title: 'President', reviewer_company: 'Mansfield Logistics Inc',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 2, ease_of_use: 3, value_for_money: 1, customer_service: 2, functionality: 3,
    review_title: 'Costs have climbed every single year',
    summary: 'The software works. The commercial relationship does not. Every renewal brings a price increase well above inflation and every conversation with the account manager turns into an upsell attempt.',
    pros: 'Reliable core accounting, reporting is good when you invest the setup time.',
    cons: 'We are paying nearly double our year one price for the same modules and user count. Extra charges appeared for things we understood were included. For a company our size the value equation has stopped working and we are evaluating alternatives.',
    review_date: '2025-10-17', helpful_count: 45, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Derek, we are sorry to read this. Please contact our customer success team so we can review your subscription and module fit for your current size. Sage Customer Care',
    vendor_response_date: '2025-10-24',
  },
  {
    reviewer_name: 'Katherine Lindqvist', reviewer_job_title: 'Group Financial Controller', reviewer_company: 'Northgale Media Group',
    reviewer_industry: 'Media Production', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Consolidating seven entities in three currencies, finally sane',
    summary: 'We acquired our way to seven entities across the UK, Ireland and the US and the old consolidation model was a 40 tab workbook only one person understood. Intacct consolidates with currency translation nightly.',
    pros: 'Intercompany transactions post both sides automatically. Currency translation adjustments calculated properly. Adding our latest acquisition took the partner two weeks, not a new project.',
    cons: 'Intercompany reconciliation reports could be clearer when something does break. You need a disciplined dimension governance policy from day one or people invent their own tags.',
    review_date: '2026-06-11', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Raymond Chu', reviewer_job_title: 'Director of Finance', reviewer_company: 'Silverline Medical Practice Group',
    reviewer_industry: 'Medical Practice', reviewer_company_size: '201-500', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 5, functionality: 5,
    review_title: 'Done QuickBooks, done NetSuite, staying here',
    summary: 'I have run finance on QuickBooks Enterprise, a painful NetSuite implementation and now Intacct. This is the right sized tool for a business between those two worlds.',
    pros: 'Far deeper than QuickBooks without NetSuite implementation trauma. Dashboards our physician partners actually look at. Support tickets get answered by people who know accounting, not just the software.',
    cons: 'Payroll is via integration rather than native, which adds one more vendor to manage. Occasional slow performance at quarter end peak times.',
    review_date: '2026-02-27', helpful_count: 19, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Fiona Aldercott', reviewer_job_title: 'Head of Finance', reviewer_company: 'The Wexford Theatre Trust',
    reviewer_industry: 'Performing Arts', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Moving up from Sage 50 was the right call',
    summary: 'We outgrew Sage 50 years before we admitted it. The implementation partner was superb, the data migration landed cleanly and our first year end on Intacct was the smoothest anyone here remembers.',
    pros: 'Production level profitability through project dimensions, each show is now a P&L. Board pack that used to take a week is a dashboard. Approval workflows ended the paper invoice folders.',
    cons: 'Some Sage 50 muscle memory does not transfer and two of the team needed extra training. Ticketing system integration needed custom API work.',
    review_date: '2026-05-29', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Gordon Strachan', reviewer_job_title: 'Finance Systems Manager', reviewer_company: 'Caledonia Facilities Group',
    reviewer_industry: 'Facilities Services', reviewer_company_size: '501-1000', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Good platform if you invest in an admin who knows it',
    summary: 'My whole job is looking after Intacct and the systems around it, which tells you something about the depth. Well administered it hums along. Neglected, the dimension structure decays and reports stop being trusted.',
    pros: 'The API is properly documented and stable, we integrate five systems into it. Smart rules let us enforce data quality at entry. Quarterly releases add real features rather than cosmetics.',
    cons: 'Release notes sometimes bury changes that break saved reports. Support escalation beyond first line is slow unless you push through your partner instead.',
    review_date: '2025-12-09', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Melissa Grantham', reviewer_job_title: 'CFO', reviewer_company: 'Lattice Learning Technologies',
    reviewer_industry: 'E-Learning', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Our Series B diligence ran off Intacct reports directly',
    summary: 'Investors asked for cohort revenue, deferred revenue walk and entity level statements during our raise. Everything came out of Intacct as built reports. The data room took days rather than weeks and our CEO noticed.',
    pros: 'SaaS metrics dashboards on live data. Revenue recognition that survives auditor scrutiny. Salesforce sync means finance and sales argue about strategy now instead of about whose numbers are right.',
    cons: 'Contract module configuration is sensitive, get the setup right first time because changing recognition templates later is delicate work.',
    review_date: '2026-03-15', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Terence Mowbray', reviewer_job_title: 'Head of Finance', reviewer_company: 'Kingsbridge Housing Association',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 3, functionality: 4,
    review_title: 'Capable but our implementation still haunts us',
    summary: 'The product is good, I want to be clear about that. But we chose a partner on price, the dimension design was wrong from the start, and three years later we are paying a better partner to redo it.',
    pros: 'Flexible enough that even our flawed setup produces workable accounts. Audit trail and permissions are strong. The system itself has never lost us data or gone down at a bad moment.',
    cons: 'Everything depends on implementation quality and nobody warns you loudly enough. Choose your partner on references from organisations like yours, not on day rate. Rebuilding dimensions on a live system is slow, careful work.',
    review_date: '2025-09-25', helpful_count: 27, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Angela Ferraro', reviewer_job_title: 'Controller', reviewer_company: 'Beacon Ridge Senior Living',
    reviewer_industry: 'Hospital & Health Care', reviewer_company_size: '501-1000', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Steady, dependable, occasionally quirky',
    summary: 'Four years across twelve facilities. It does what a system at this level should do and the quirks are learnable. I would buy it again, with a slightly harder negotiation.',
    pros: 'Facility level reporting without extra bookkeeping. Fixed asset module handles our depreciation across hundreds of assets. Year end audit support exports save our team days.',
    cons: 'Some screens time out on very large journals and you learn to split them. The AP OCR capture misreads certain vendor invoice layouts every single time, we gave up and template matched those vendors manually.',
    review_date: '2026-01-13', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Callum Brice', reviewer_job_title: 'Management Accountant', reviewer_company: 'Fernhollow Estates',
    reviewer_industry: 'Real Estate', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Property portfolio accounting that scales',
    summary: 'Each property is a location dimension, each development a project. Rent rolls, service charges and development costs all sit in one system and the partners get portfolio dashboards.',
    pros: 'Dimension structure maps naturally to property portfolios. Recurring invoicing for rents and service charges. Bank matching rules handle high volume rent receipts well.',
    cons: 'No property specific features like tenancy or lease event tracking, we run a separate property management system alongside. Fine, but budget for the integration.',
    review_date: '2026-06-19', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Yusuf Rahman', reviewer_job_title: 'Finance Director', reviewer_company: 'Crescent Community Foundation',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Grant reporting used to be my whole January',
    summary: 'Twenty three active grants, each with its own funder report format and period. Dimension tagging plus saved report templates means each funder report is now under an hour. In January I did something else for the first time in years.',
    pros: 'Grant dimension tracking with budget versus actual per funder. Report templates per funder saved and rerun each period. Approval workflows keep our trustees comfortable on controls.',
    cons: 'The learning curve for our part time finance officers was real, allow proper training budget. Price reviews annually need watching.',
    review_date: '2026-04-21', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Brian Kowalczyk', reviewer_job_title: 'VP of Finance', reviewer_company: 'TrailStone Outdoor Brands',
    reviewer_industry: 'Consumer Goods', reviewer_company_size: '201-500', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 4, functionality: 3,
    review_title: 'Great ledger, do not buy it for inventory',
    summary: 'We knew inventory was not the strength and bought it anyway because the financial reporting was so much better than the competition. The reporting has delivered. Inventory has been a constant workaround.',
    pros: 'Financial reporting and consolidation genuinely excellent. AP automation solid. Our partner has been responsive when things get complicated.',
    cons: 'Inventory costing across warehouses required customisation that a distribution focused system would do out of the box. Landed cost handling is weak. If stock is your business, evaluate that module hands on with your own data before signing anything.',
    review_date: '2025-11-06', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Deborah Winstanley', reviewer_job_title: 'Chief Operating Officer', reviewer_company: 'Elmsworth Independent Schools Trust',
    reviewer_industry: 'Education Management', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Three schools, one finance team, one system',
    summary: 'Centralising finance across our schools only became practical with a system that keeps each school as its own entity while giving the trust a consolidated view. Bursars see their school, I see everything.',
    pros: 'Entity per school with trust level consolidation. Budget holder dashboards for heads of department reduced the queries to finance noticeably. Purchase requisitions with approval routing per school.',
    cons: 'Parent billing has to be handled in a separate school fee system. The two implementations of a UK academic year budget calendar took some persuasion to configure.',
    review_date: '2025-08-30', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Nathan Petrakis', reviewer_job_title: 'Senior Accountant', reviewer_company: 'Ironbridge Insurance Services',
    reviewer_industry: 'Insurance', reviewer_company_size: '201-500', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'From the person doing the daily work, not the buyer',
    summary: 'Reviews are usually written by directors. From the seat where journals actually get posted: it is good, logical and occasionally infuriating in small ways.',
    pros: 'Recurring journals and allocations run themselves. Import templates for anything bulk. Once you learn the keyboard flow, entry is fast. The audit trail has saved me twice when a director asked who changed something.',
    cons: 'Screen layouts waste space and important buttons live in odd corners. Error messages sometimes name internal field IDs rather than telling a human what is wrong. Small things, but you meet them daily.',
    review_date: '2026-02-05', helpful_count: 26, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Victoria Ashcombe', reviewer_job_title: 'Group CFO', reviewer_company: 'Pennant Marine Holdings',
    reviewer_industry: 'Maritime', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Survived an acquisition, an audit and a refinancing in one year',
    summary: 'In twelve months we bought a company, changed auditors and refinanced. Intacct absorbed all three. The new entity was live in a month, the new auditors got read only access and self served, and the lender reporting pack runs monthly without drama.',
    pros: 'Speed of onboarding a new entity. Auditor access without exporting a single file. Custom lender covenant reports built once and scheduled.',
    cons: 'We push the currency features hard and triangulated FX between three currencies occasionally needs a manual true up journal. Documented workaround exists but it should be native by now.',
    review_date: '2026-06-24', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Samantha Odum', reviewer_job_title: 'Accounting Manager', reviewer_company: 'GreenGate Community Health',
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Five years, still no regrets',
    summary: 'Longest I have stayed on one finance system without campaigning to change it. It gets meaningfully better every year with the quarterly releases and the community forum usually has an answer before support does.',
    pros: 'Reliability above all. Quarterly releases that add useful things. The user community is active and Sage staff actually participate in it. Dashboards our executive director checks herself.',
    cons: 'Wish list items sit in the ideas portal for years with hundreds of votes before landing. The AI features so far are more demo than daily value.',
    review_date: '2025-10-02', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Edward Rushworth', reviewer_job_title: 'Finance Director', reviewer_company: 'Copperfield Construction Group',
    reviewer_industry: 'Construction', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 3, functionality: 3,
    review_title: 'Fine generally, stretched by construction specifics',
    summary: 'For group consolidation and reporting it is a clear upgrade on what we had. For construction operations, applications for payment, retentions, CIS at our scale, it needed more customisation than the sales process suggested.',
    pros: 'Group reporting and intercompany handling strong. Project cost tracking works once configured. Board reporting transformed.',
    cons: 'Applications for payment and retentions needed partner built customisation. CIS handling at volume is clunkier than dedicated construction systems. Evaluate against a construction specific ERP if that is your core business.',
    review_date: '2026-05-08', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Lauren McTavish', reviewer_job_title: 'Head of Finance Operations', reviewer_company: 'Bluewater Professional Services',
    reviewer_industry: 'Management Consulting', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Time and billing integration finally coherent',
    summary: 'Consultant timesheets flow through project accounting into client invoices with the right rates and the right VAT. Realisation and utilisation reporting comes from the same data so partners stopped keeping their own shadow spreadsheets.',
    pros: 'Project accounting built for services firms. WIP tracking and revenue recognition on long engagements. Utilisation dashboards by practice area.',
    cons: 'Timesheet entry screen is tolerated rather than liked by consultants. Rate card changes mid engagement need care to apply correctly.',
    review_date: '2025-12-21', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Colin Drummond', reviewer_job_title: 'Treasurer', reviewer_company: 'Highland Heritage Preservation Society',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '11-50', reviewer_country: 'United Kingdom',
    used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 4,
    review_title: 'Probably a size too big for us, but growing into it',
    summary: 'Honestly we bought ahead of our needs on the strength of a major lottery grant that requires detailed reporting. It is more system than a charity our size normally runs, and the grant reporting it produces is exactly why we did it.',
    pros: 'The lottery funder accepted our Intacct reports without a single query, which never happened with our old system. Multi year grant budget tracking. Our accountants can access it directly.',
    cons: 'Cost is heavy for a small charity even with nonprofit pricing. Some features we pay for will sit unused for years.',
    review_date: '2026-03-06', helpful_count: 7, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Rebecca Stanhope', reviewer_job_title: 'Director of Financial Planning', reviewer_company: 'Oakhaven University Foundation',
    reviewer_industry: 'Higher Education', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Endowment and fund accounting handled with room to spare',
    summary: 'A university foundation is fund accounting at its most demanding, hundreds of endowed funds each with spending rules. Intacct tracks them all with the dimension model and our investment committee reporting is finally timely.',
    pros: 'Fund level tracking at scale. Allocations engine distributes investment returns across funds by formula. Board and committee dashboards with drill down.',
    cons: 'Initial fund dimension design took real planning, measure twice cut once applies strongly here. Occasional report performance lag when spanning many years of history.',
    review_date: '2026-01-31', helpful_count: 11, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Graham Tilbury', reviewer_job_title: 'Interim Finance Director', reviewer_company: 'GT Interim Solutions',
    reviewer_industry: 'Accounting', reviewer_company_size: 'Self-employed', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 5,
    review_title: 'The system I hope to find when I walk into a new engagement',
    summary: 'As an interim FD I inherit whatever the last person chose. When it is Intacct, I know I can trust the numbers by day three. When it is not, week one is archaeology.',
    pros: 'Consistent logic across every implementation I have seen. Audit trail tells the full story of any balance. A well built Intacct site hands over cleanly between finance leaders, which owners underestimate the value of.',
    cons: 'Badly implemented sites are hard to untangle precisely because the flexibility lets people build strange things. Support will not help with what are effectively design faults, you need a partner for that.',
    review_date: '2025-09-11', helpful_count: 18, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Monica Reyes-Fulton', reviewer_job_title: 'Controller', reviewer_company: 'Archway Senior Care Partners',
    reviewer_industry: 'Hospital & Health Care', reviewer_company_size: '1001-5000', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Scaled with us from six locations to twenty two',
    summary: 'We tripled in size on the same system without a reimplementation, which is the strongest endorsement I can give any finance platform. New locations are a configuration task measured in days.',
    pros: 'Genuine scalability. Standardised close checklist across all locations. Regional controllers see their region, corporate sees everything, permissions make it effortless.',
    cons: 'At our transaction volume some batch processes need scheduling overnight. Per user licensing costs add up as you grow, plan the seat count honestly.',
    review_date: '2026-04-14', helpful_count: 15, verified_linkedin: false, verified_badge: null,
  },
];

// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Same category as Sage Accounting (Accounting Software)
  const { data: sage, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'sage-accounting').single();
  if (catErr || !sage) throw new Error(`Could not resolve category from sage-accounting: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: sage.category_id };

  // Insert or update by slug
  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('Sage Intacct already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations/i.test(error.message)) {
        const { integrations, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Sage Intacct inserted (integrations column missing, skipped that field).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('Sage Intacct inserted.');
    }
  }

  // Replace reviews
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const rows = REVIEWS.map(r => ({
    software_id: softwareId,
    status: 'published',
    helpful_count: 0,
    vendor_response: null,
    vendor_response_date: null,
    ...r,
  }));

  const CHUNK = 50;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from('reviews').insert(batch);
    if (error) throw new Error(`Review insert failed at row ${i}: ${error.message}`);
    inserted += batch.length;
  }

  const { data: agg } = await supabase
    .from('software')
    .select('overall_rating, review_count, ease_of_use_rating, value_for_money_rating, customer_service_rating, functionality_rating')
    .eq('id', softwareId).single();

  console.log(`Reviews: deleted ${delCount ?? 0}, inserted ${inserted}.`);
  console.log('Aggregate ratings now:', agg);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
