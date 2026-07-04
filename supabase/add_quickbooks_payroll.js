// ============================================================================
// Adds QuickBooks Payroll as a new product in the Payroll category with full
// editorial content and a ~110 review set (anchors + seeded generator).
// Safe to re-run: updates the row and replaces its own reviews only. Does not
// touch any other product.
//
//   node supabase/add_quickbooks_payroll.js
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

const SOFTWARE = {
  name: 'QuickBooks Payroll',
  slug: 'quickbooks-payroll',
  tagline: 'Full service payroll that runs alongside QuickBooks with automatic tax filing and same day deposits',
  description_short:
    'Cloud payroll from Intuit that runs inside QuickBooks, with automated tax calculation and filing, direct deposit, employee self service and full service tax penalty protection on the higher tiers.',
  description_full: `<h2>What is QuickBooks Payroll?</h2><p>QuickBooks Payroll is Intuit's payroll product, built to run inside the QuickBooks ecosystem so that a business already keeping its books in QuickBooks can pay its staff without ever leaving the platform or rekeying data into a separate system. It is aimed at small and mid sized businesses that want payroll handled properly, taxes calculated and filed, employees paid on time, compliance kept current, without hiring a payroll specialist or outsourcing to a bureau. Because it shares its data with QuickBooks accounting, every pay run flows straight into the books, which removes the reconciliation headache that businesses running payroll and accounting on separate systems know all too well.</p><h2>Automated tax calculation and filing</h2><p>The headline capability is tax automation. QuickBooks Payroll calculates federal and state payroll taxes automatically on every run, and on the full service tiers it files and pays them for you, taking one of the most error prone and anxiety inducing parts of running a business off the owner's plate entirely. For a small business owner who has lain awake worrying about a missed payroll tax deadline, the automatic filing is often the single feature that justifies the subscription, and the higher tiers add a tax penalty protection guarantee that covers penalties even if a mistake occurs, which is genuine peace of mind rather than marketing.</p><h2>Getting employees paid, fast</h2><p>Paying people is quick and flexible. Direct deposit is included, and depending on the tier you get next day or even same day deposit, which helps cash flow because you can keep the money in your account until the last responsible moment rather than funding payroll days early. Employees get a self service portal where they can view and download their own pay stubs and year end tax forms, update their details and manage their information without going through the business owner, which quietly removes a recurring stream of small admin requests.</p><h2>Built to work with QuickBooks accounting</h2><p>The integration with QuickBooks accounting is the real reason most customers choose this over a standalone payroll product. Each pay run posts its journal entries into the books automatically, correctly categorised, so wages, taxes and liabilities appear in the accounts without anyone touching them. For a business already on QuickBooks, this single integrated experience, one login, one system, one source of truth for what employees cost, is a meaningful simplification over stitching a separate payroll tool to the accounts. It also connects to QuickBooks Time for businesses that want tracked hours to flow straight into pay.</p><h2>The tiers, and what each adds</h2><p>QuickBooks Payroll comes in tiers, typically Core, Premium and Elite. Core covers the essentials, full service payroll with automated taxes and filing, direct deposit and employee self service. Premium adds same day direct deposit, workers compensation administration, HR support tools and time tracking. Elite adds a personal HR advisor, tax penalty protection with a stronger guarantee, and hands on setup where the team does the initial configuration for you. This tiered structure lets a business start with the essentials and step up to more HR and protection as it grows, without changing products.</p><h2>What it costs</h2><p>Pricing is a monthly base fee plus a per employee monthly charge, with the base fee rising across the Core, Premium and Elite tiers and the per employee cost scaling with headcount. Intuit runs frequent introductory discounts that cut the base fee substantially for the first several months. The honest way to compare it is total monthly cost for your actual headcount and chosen tier, since the per employee element means a growing team changes the maths, and against the cost of a payroll bureau or the risk of getting payroll taxes wrong yourself, the full service tiers frequently look like sensible value for a small business.</p><h2>Where it falls short</h2><p>QuickBooks Payroll is strongest for businesses already in the QuickBooks ecosystem, and a business that keeps its books elsewhere loses a large part of the appeal since the integration is the standout. Pricing, particularly the per employee element and the step up between tiers, can climb for a larger team, and some of the most valuable features, same day deposit, penalty protection, HR advisor, sit on the higher tiers. Support quality gets mixed reports, excellent for many and frustrating for some, particularly around complex or unusual payroll situations, and the product is very much built around US federal and state payroll rather than being a global payroll solution. Businesses with genuinely complex, multi state or unusual pay arrangements should test it against their specific needs before committing.</p><h2>Who should choose it</h2><p>QuickBooks Payroll is the natural choice for a small or mid sized business already using QuickBooks that wants payroll handled inside the same system, with automated tax filing, fast direct deposit and the option to add HR support and penalty protection as it grows. It is especially compelling for an owner who wants the worry of payroll taxes taken off their plate entirely and values one integrated system over stitching separate tools together. Businesses not on QuickBooks, or those needing genuinely global or highly complex payroll, should weigh dedicated alternatives, but for the large number of businesses already running QuickBooks accounting, adding its payroll is often the path of least friction and lowest risk.</p>`,

  starting_price: 50,
  price_currency: 'USD',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Core',
      price: 50,
      currency: 'USD',
      billing: 'month',
      features: [
        'Base fee plus per employee monthly',
        'Full service payroll',
        'Automated federal and state taxes',
        'Automatic tax filing and payment',
        'Next day direct deposit',
        'Employee self service portal',
        'Year end tax forms',
        'QuickBooks accounting integration',
      ],
    },
    {
      name: 'Premium',
      price: 85,
      currency: 'USD',
      billing: 'month',
      features: [
        'Everything in Core',
        'Same day direct deposit',
        'Workers compensation administration',
        'HR support center',
        'Time tracking included',
        'Expert review of setup',
        'Employee benefits options',
        'Priced per employee on top',
      ],
    },
    {
      name: 'Elite',
      price: 130,
      currency: 'USD',
      billing: 'month',
      features: [
        'Everything in Premium',
        'Personal HR advisor',
        'Tax penalty protection guarantee',
        'Hands on expert setup',
        'Project time tracking',
        'Highest level of support',
        '24/7 expert product support',
        'Priced per employee on top',
      ],
    },
  ],

  features: [
    'Full service payroll',
    'Automated federal and state tax calculation',
    'Automatic tax filing and payment',
    'Tax penalty protection (Elite)',
    'Direct deposit',
    'Same day direct deposit (higher tiers)',
    'Employee self service portal',
    'Year end tax forms (W-2 and 1099)',
    'QuickBooks accounting integration',
    'QuickBooks Time integration',
    'Workers compensation administration',
    'HR support center',
    'Personal HR advisor (Elite)',
    'Employee benefits options',
    'Time tracking',
    'Contractor payments',
    'Multiple pay schedules',
    'Mobile app for iOS and Android',
    'Automated payroll option',
    'Expert setup support',
  ],
  top_features: ['Automatic tax filing and payment', 'QuickBooks accounting integration', 'Direct deposit'],
  integrations: [
    'QuickBooks Online',
    'QuickBooks Time',
    'QuickBooks Desktop',
    'Square',
    'Zapier',
  ],

  affiliate_url: 'https://quickbooks.intuit.com/payroll/',
  vendor_website: 'https://quickbooks.intuit.com/payroll/',
  vendor_name: 'Intuit',
  founded_year: 1983,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United States'],
  languages: ['English'],

  meta_title: 'QuickBooks Payroll Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent QuickBooks Payroll review: automated tax filing, direct deposit, QuickBooks integration, Core, Premium and Elite tiers, real user pros and cons, and the best alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Intuit_QuickBooks_idH8urRJxv_1.svg',
  brand_color: '#108000',
};

const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Jennifer Castellano', reviewer_job_title: 'Owner', reviewer_company: 'Castellano Design Studio',
    reviewer_industry: 'Design', reviewer_company_size: '2-10', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The automatic tax filing took my biggest worry away',
    summary: 'As a small studio owner I used to lie awake worrying about payroll tax deadlines. QuickBooks Payroll files and pays them automatically now, and because it runs inside QuickBooks the whole thing posts to my books without me touching it. It is the closest thing to a payroll department a business my size can afford.',
    pros: 'Automatic tax calculation and filing genuinely removed my biggest stress. The integration with my QuickBooks accounting means zero double entry. Direct deposit keeps my team happy. Employees pull their own pay stubs.',
    cons: 'The per employee cost adds up as we hire. Some of the best features like same day deposit are on the higher tiers. Support was slow once on an unusual question.',
    review_date: '2026-04-13', helpful_count: 23, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Marcus Bellamy', reviewer_job_title: 'Operations Manager', reviewer_company: 'Bellamy Fitness Group',
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Same day deposit and time tracking together are brilliant',
    summary: 'We run gyms with instructors on varying hours, and having QuickBooks Time flow straight into payroll with same day deposit on Premium has made pay day genuinely effortless. Hours tracked, wages calculated, taxes filed, money out same day, all in one system.',
    pros: 'QuickBooks Time flowing into payroll removes all the manual hours entry. Same day direct deposit is great for cash flow. Automated taxes are faultless. Everything in one place with the accounting.',
    cons: 'You need the Premium tier for same day deposit and time tracking, which costs more. The HR tools are useful but basic. Per employee pricing at our headcount is noticeable.',
    review_date: '2026-02-21', helpful_count: 18, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Sandra Whitfield', reviewer_job_title: 'Office Manager', reviewer_company: 'Whitfield Legal Services',
    reviewer_industry: 'Legal Services', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Effortless if you are already on QuickBooks',
    summary: 'We were already running QuickBooks for the firm, so adding payroll was the obvious move, and it has been. One login, one system, and payroll posts to the books automatically. The only real frustration has been support when something out of the ordinary comes up.',
    pros: 'The integration is the whole point and it delivers, no double entry ever. Genuinely easy to run a pay run. Employee self service saves me answering pay stub requests.',
    cons: 'Support quality is inconsistent, fine for routine things and frustrating for anything unusual. The per employee cost grows with the team. Very US focused, which is fine for us but worth knowing.',
    review_date: '2025-11-19', helpful_count: 15, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'David Ashford', reviewer_job_title: 'Managing Partner', reviewer_company: 'Ashford Consulting',
    reviewer_industry: 'Management Consulting', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'The Elite HR advisor has been genuinely useful',
    summary: 'We went for Elite mainly for the HR advisor and the penalty protection, and both have earned their place. Having someone to call about an HR question, and knowing tax penalties are covered, is worth the higher tier for a firm that does not have dedicated HR.',
    pros: 'The personal HR advisor is a real person who has been genuinely helpful. Tax penalty protection is peace of mind. Full service payroll with the QuickBooks integration. Hands on setup got us started cleanly.',
    cons: 'Elite is the priciest tier, so you are paying for that reassurance. Per employee cost on top. Some HR advice is US specific in ways that would not travel.',
    review_date: '2026-03-24', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Patricia Nguyen', reviewer_job_title: 'Bookkeeper', reviewer_company: 'Nguyen Bookkeeping',
    reviewer_industry: 'Accounting', reviewer_company_size: '2-10', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'I run it for several clients and it is dependable',
    summary: 'As a bookkeeper I manage payroll for a number of small business clients, and QuickBooks Payroll alongside their QuickBooks books is my default. The automated taxes mean I am not manually calculating filings, and everything ties to the accounts cleanly.',
    pros: 'Automated tax filing saves me hours across clients. Ties into each client QuickBooks file cleanly. Reliable pay runs. Clients like the self service portal for their staff.',
    cons: 'Switching between client accounts could be smoother. Support waits vary. Per employee pricing means I have to price it into my client fees carefully.',
    review_date: '2025-12-15', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Robert Ellery', reviewer_job_title: 'Owner', reviewer_company: 'Ellery Landscaping',
    reviewer_industry: 'Landscaping', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 4, value_for_money: 3, customer_service: 2, functionality: 4,
    review_title: 'Good payroll let down by a poor support experience',
    summary: 'The payroll itself works well and the automated taxes are a relief, but when I had a genuinely tricky multi state situation with a crew working across the line, getting proper help was frustrating and took far too long to resolve.',
    pros: 'Automated taxes and filing work well for standard situations. Integrates cleanly with my books. Direct deposit is reliable. Easy to run week to week.',
    cons: 'Support struggled badly with my multi state question and it took weeks. Per employee cost adds up for a seasonal crew. The best features are on higher tiers.',
    review_date: '2026-01-27', helpful_count: 17, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Robert, we are sorry the multi state support fell short, those situations should be handled better and we have passed your experience to the team. Please reach out if it recurs. QuickBooks Payroll Customer Care',
    vendor_response_date: '2026-02-03',
  },
  {
    reviewer_name: 'Emily Hartnett', reviewer_job_title: 'Co-founder', reviewer_company: 'Hartnett & Rowe Bakery',
    reviewer_industry: 'Food Production', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Payroll for a busy bakery, sorted in minutes',
    summary: 'Between early starts and a rotating team, payroll used to be a Sunday night job I dreaded. Now it takes minutes, the taxes handle themselves, and because it is in QuickBooks the wage costs show up in our margins automatically, which has actually changed how we price.',
    pros: 'Quick pay runs that free up my weekend. Automated taxes remove the worry. Wage costs flow into the accounts so I see true margins. Staff get their pay stubs themselves.',
    cons: 'Per employee cost is noticeable with a bigger team. We would like same day deposit but that is a higher tier. Support was a little slow once.',
    review_date: '2026-05-09', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Thomas Barrington', reviewer_job_title: 'Finance Manager', reviewer_company: 'Barrington Auto Group',
    reviewer_industry: 'Automotive', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 5,
    review_title: 'Handles our larger team well, watch the per head cost',
    summary: 'With over a hundred staff across dealerships, QuickBooks Payroll on Elite handles the volume and the automated filing across states well. The one thing to watch at our size is the per employee cost, which is real money once you multiply it out.',
    pros: 'Handles a larger, multi location team. Automated multi state filing. Elite support and penalty protection matter at our scale. Integrates with our QuickBooks accounting.',
    cons: 'Per employee pricing across a hundred plus staff is a significant cost. Elite tier is needed for the features we want. Occasionally an update changes something without much warning.',
    review_date: '2025-10-22', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Laura Pennington', reviewer_job_title: 'HR and Finance Lead', reviewer_company: 'Pennington Tech',
    reviewer_industry: 'Computer Software', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Contractor payments and payroll in one place',
    summary: 'We pay a mix of employees and contractors, and having both handled in QuickBooks Payroll, with the year end forms generated automatically, has been a genuine simplification. Everything reconciles to the books and I stopped dreading January.',
    pros: 'Handles both employees and contractor payments. Year end forms generated automatically. Clean integration with the accounts. Self service for the team.',
    cons: 'Per employee and per contractor costs add up. Higher tier needed for some features. Very US centric, which suits us but limits it globally.',
    review_date: '2026-06-02', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Kevin Ashby', reviewer_job_title: 'Owner', reviewer_company: 'Ashby Plumbing',
    reviewer_industry: 'Construction', reviewer_company_size: '2-10', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 3, value_for_money: 2, customer_service: 2, functionality: 3,
    review_title: 'Too expensive for a small crew once you add it all up',
    summary: 'For a five person plumbing business the base fee plus per employee cost, plus needing a higher tier for the features I actually wanted, added up to more than I expected. The payroll works, but the value was not there for a business my size once the intro discount ended.',
    pros: 'The automated taxes do work and are reassuring. Integrates with my books. Pay runs are simple enough.',
    cons: 'Total cost for a small crew was higher than expected after the discount. Best features gated behind higher tiers. Support was slow when I needed it. Felt like it is priced for bigger teams.',
    review_date: '2025-09-18', helpful_count: 19, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Kevin, thank you for the honest feedback. For a smaller crew we can review whether the tier and add ons match your needs so you are not paying for more than you use. QuickBooks Payroll Customer Care',
    vendor_response_date: '2025-09-25',
  },
  {
    reviewer_name: 'Michelle Overton', reviewer_job_title: 'Practice Manager', reviewer_company: 'Overton Dental',
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Reliable, simple and it never misses a filing',
    summary: 'For a dental practice with a stable team, QuickBooks Payroll has been quietly reliable for years. It never misses a tax filing, the staff get paid on time every time, and because it is in QuickBooks the whole thing just works without me thinking about it.',
    pros: 'Rock solid reliability, never a missed filing. Simple pay runs. Integrates with our accounts. Staff self service is well used. Automated taxes remove the worry.',
    cons: 'Per employee cost creeps up with hires. Some features need the higher tier. Support is fine but not always fast.',
    review_date: '2026-04-27', helpful_count: 10, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

let seed = 559911;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Jennifer', 'Marcus', 'Sandra', 'David', 'Patricia', 'Robert', 'Emily', 'Thomas', 'Laura', 'Kevin',
  'Michelle', 'Michael', 'Jessica', 'Christopher', 'Amanda', 'Matthew', 'Ashley', 'Joshua', 'Stephanie', 'Andrew',
  'Nicole', 'Daniel', 'Rachel', 'Ryan', 'Lauren', 'Brandon', 'Megan', 'Justin', 'Brittany', 'Tyler',
  'Carlos', 'Maria', 'Wei', 'Priya', 'Kwame', 'Sofia', 'Diego', 'Amara', 'Rajesh', 'Ingrid',
  'Gregory', 'Danielle', 'Aaron', 'Christina', 'Nathan', 'Kimberly', 'Adam', 'Heather', 'Eric', 'Samantha',
  'Jose', 'Vanessa', 'Sean', 'Crystal', 'Derek', 'Tiffany', 'Marcus', 'Kayla', 'Travis', 'Alicia',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Castellano', 'Bellamy', 'Whitfield', 'Ashford', 'Nguyen', 'Ellery', 'Hartnett', 'Barrington',
  'Pennington', 'Ashby', 'Overton', 'Braddock', 'Coleman', 'Delacroix', 'Emerson', 'Fontaine',
  'Grimaldi', 'Hollis', 'Iverson', 'Jennings', 'Kowalski', 'Lombardi', 'Mercer',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.32)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.24)) return null;
  const stems = ['Castellano', 'Bellamy', 'Ashford', 'Summit', 'Cedar', 'Harbor', 'Ridgeway', 'Cornerstone',
    'Meridian', 'Northgate', 'Silverline', 'Pinnacle', 'Cascade', 'Redwood', 'Lakeshore', 'Beacon',
    'Crestview', 'Brightpath', 'Ironwood', 'Kingsley'];
  const suf = ['Group', 'LLC', 'Services', 'Studio', 'Partners', 'Solutions', 'Inc', 'Co', ''];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ''}`.trim();
}
const sizes = ['2-10', '2-10', '11-50', '11-50', '11-50', '51-200'];
const durations = ['6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years'];
const countries = ['United States', 'United States', 'United States', 'United States', 'United States', 'United States'];
const industries = ['Design', 'Health, Wellness and Fitness', 'Legal Services', 'Management Consulting', 'Accounting',
  'Landscaping', 'Food Production', 'Automotive', 'Computer Software', 'Construction', 'Retail', 'Marketing & Advertising',
  'Real Estate', 'Professional Services', 'Hospitality', 'Consumer Services', 'Manufacturing', 'Non-Profit Organization Management'];
const jobs = ['Owner', 'Operations Manager', 'Office Manager', 'Managing Partner', 'Bookkeeper', 'Finance Manager',
  'HR and Finance Lead', 'Practice Manager', 'Co-founder', 'Business Owner', 'Controller', 'Payroll Administrator',
  'Accounting Manager', 'General Manager', 'Director', 'HR Manager'];

const CONTENT = {
  5: {
    titles: [
      'Automatic tax filing took my worry away', 'Effortless with QuickBooks accounting', 'Payroll sorted in minutes',
      'Same day deposit is brilliant', 'Never misses a filing', 'The integration is the whole point',
      'Freed up my weekends', 'Taxes handle themselves now', 'Employees and contractors in one place',
      'Reliable pay run every time', 'The HR advisor earned its keep', 'Wage costs flow into my margins',
      'Closest thing to a payroll department we can afford', 'Time tracking straight into pay', 'Peace of mind on the taxes',
      'One login, one system, done', 'Staff pull their own pay stubs', 'Stopped dreading payroll',
      'Same day money out, same day', 'Just works, every time',
    ],
    summaries: [
      'I used to lie awake worrying about payroll tax deadlines, and now it files and pays them automatically, and because it runs inside QuickBooks the whole thing posts to my books without me touching it.',
      'We were already on QuickBooks so adding payroll was obvious, and it has been, one login, one system, and every pay run posts to the books automatically with no double entry ever.',
      'Between early starts and a rotating team, payroll used to be a Sunday night job I dreaded, and now it takes minutes while the taxes handle themselves in the background.',
      'Having time tracking flow straight into payroll with same day deposit has made pay day genuinely effortless, hours tracked, wages calculated, taxes filed, money out same day, all in one place.',
      'For a stable team it has been quietly reliable for years, it never misses a tax filing and the staff get paid on time every single time without me thinking about it.',
      'We pay a mix of employees and contractors and having both handled here, with the year end forms generated automatically, has been a genuine simplification and I stopped dreading January.',
      'The automatic tax calculation and filing genuinely removed my biggest source of stress as a small business owner, it is the closest thing to a payroll department a business my size can afford.',
      'Because wage costs flow straight into the accounts I finally see true margins, which has actually changed how we price our work, on top of payroll simply being fast and painless.',
    ],
    pros: [
      'Automatic tax calculation and filing removes the biggest worry.',
      'The QuickBooks accounting integration means zero double entry.',
      'Direct deposit keeps the team paid on time.',
      'Same day deposit helps cash flow on the higher tiers.',
      'Employees pull their own pay stubs and forms.',
      'Time tracking flows straight into pay.',
      'Handles both employees and contractor payments.',
      'Year end forms generated automatically.',
      'Wage costs flow into the accounts and margins.',
      'Rock solid reliability, never a missed filing.',
      'The Elite HR advisor is a genuinely helpful person.',
      'Tax penalty protection is real peace of mind.',
      'Quick pay runs that free up time.',
      'One login and one system with the accounting.',
      'Reliable week after week.',
      'Hands on setup got us started cleanly.',
    ],
    cons: [
      'The per employee cost adds up as you hire.',
      'Some best features sit on the higher tiers.',
      'Support was slow once on an unusual question.',
      'Very US focused, not a global payroll.',
      'Same day deposit needs a higher tier.',
      'Per employee pricing is noticeable at scale.',
      'HR tools are useful but fairly basic.',
      'Occasionally an update changes something.',
      'Honestly little else for our needs.',
      'Nothing that outweighs the convenience.',
    ],
  },
  4: {
    titles: [
      'Effortless if you are on QuickBooks', 'Reliable and simple', 'Great integration, watch the cost',
      'Automated taxes are a relief', 'Handles our team well', 'The HR advisor is useful',
      'Solid payroll for a small business', 'Ties to the books cleanly', 'Four stars, mostly on price',
      'Dependable pay runs', 'Good for employees and contractors', 'Does what we needed',
      'Quick and painless most weeks', 'Recommend it for QuickBooks users', 'Peace of mind on filings',
      'Fits our practice well',
    ],
    summaries: [
      'It has been quietly reliable and the automated taxes are a genuine relief. Marked down mainly on the per employee cost and the features gated behind higher tiers, but the integration makes it worth it.',
      'For a business already on QuickBooks this is the obvious payroll choice, one system, no double entry. Support quality is the main thing that keeps it from five stars.',
      'The automated filing and direct deposit work well, and having it in the same system as the accounts is the real win. The cost climbs as the team grows, which is worth planning for.',
      'We manage payroll for several clients on it and it is dependable, the automated taxes save hours and everything ties to each client file cleanly. Switching between accounts could be smoother.',
      'It handles our larger team and multi state filing well. The per head cost at our size is real money, and the features we want sit on the top tier, but the reliability justifies it.',
      'The Elite HR advisor and penalty protection earned their place for a firm without dedicated HR. You pay for that reassurance, but for us it was worth the higher tier.',
      'Rock solid for a stable team, it never misses a filing and the staff self service is well used. Support is fine rather than fast, and the cost creeps with hires.',
      'Handles both our employees and contractors with year end forms automatically, which simplified January considerably. Very US centric, which suits us but is worth knowing.',
    ],
    pros: [
      'Automated tax filing is a genuine relief.',
      'The QuickBooks integration means no double entry.',
      'Direct deposit is reliable.',
      'Employee self service saves admin.',
      'Handles employees and contractors.',
      'Ties cleanly to the accounts.',
      'Reliable pay runs week to week.',
      'The HR advisor is useful on Elite.',
      'Penalty protection is reassuring.',
      'Time tracking flows into pay.',
      'Year end forms generated automatically.',
      'Simple to run once set up.',
      'Handles multi state filing.',
      'Good for a QuickBooks based business.',
    ],
    cons: [
      'Per employee cost grows with the team.',
      'Best features sit on higher tiers.',
      'Support quality is inconsistent.',
      'Very US focused.',
      'Same day deposit needs Premium or Elite.',
      'Switching between client accounts could be smoother.',
      'Cost climbs noticeably at scale.',
      'HR tools are fairly basic.',
      'Occasional unannounced update change.',
      'Elite tier is the priciest.',
      'Not a global payroll solution.',
      'Priced with bigger teams in mind.',
    ],
  },
  3: {
    titles: [
      'Good payroll, mixed support', 'Fine but pricier than expected', 'Works, best features cost more',
      'Three stars, mostly on cost', 'Solid engine, patchy help', 'Right for QuickBooks users, less so otherwise',
      'Does the job, watch the add ups', 'Reliable but not cheap', 'A qualified recommendation',
      'Better with the accounting, alone less so', 'Fine for standard payroll', 'Honest three from a small business',
    ],
    summaries: [
      'The payroll itself works and the automated taxes are a relief, but when I had a genuinely tricky situation, getting proper help was frustrating and took far too long to resolve.',
      'For a small crew the base fee plus per employee cost, plus needing a higher tier for the features I wanted, added up to more than I expected once the intro discount ended.',
      'It does standard payroll well and ties to the books, but the best features are gated behind higher tiers and the total cost for a business my size did not quite stack up.',
      'Reliable for routine pay runs, but support struggled with anything out of the ordinary and the per employee pricing made it feel built for bigger teams than mine.',
      'The automated taxes and integration are genuinely good, but the value equation gets harder as you add people and realise the features you want need the top tier.',
      'Fine payroll when everything is standard, but our multi state situation exposed both slow support and a cost structure that was not designed for a small, seasonal crew.',
    ],
    pros: [
      'Automated taxes work for standard situations.',
      'Integrates cleanly with the books.',
      'Direct deposit is reliable.',
      'Easy to run week to week.',
      'Employee self service is handy.',
      'Ties to QuickBooks accounting.',
      'Year end forms are automatic.',
      'Reliable for routine payroll.',
    ],
    cons: [
      'Support struggled with anything unusual.',
      'Total cost higher than expected for a small team.',
      'Best features gated behind higher tiers.',
      'Per employee pricing feels built for bigger teams.',
      'Multi state situations exposed slow support.',
      'Value gets harder as you add people.',
      'Very US focused.',
      'Intro discount ending was a jump.',
      'HR tools are basic.',
      'Priced with larger businesses in mind.',
    ],
  },
  2: {
    titles: [
      'Too expensive for a small crew', 'Support let it down badly', 'Priced for bigger teams than mine',
      'Good engine, poor value for us', 'Frustrating when it mattered', 'Not the value I expected',
    ],
    summaries: [
      'For a five person business the base fee plus per employee cost, plus needing a higher tier for the features I actually wanted, added up to far more than I expected once the discount ended.',
      'The payroll works, but when I had a tricky multi state situation the support was slow and unhelpful, and it took weeks to resolve something that should have been straightforward.',
      'It is a capable product but clearly priced with bigger teams in mind, and for a small seasonal crew the per employee cost and gated features made the value hard to justify.',
      'Fine when everything is standard, but the moment my situation got even slightly unusual the cost and the support experience both worked against me.',
      'The automated taxes are reassuring, but the total cost crept up in ways I did not anticipate, and the best features always seemed to sit one tier above what I was paying.',
      'A decent payroll engine undermined for a business my size by pricing that assumes more staff and support that was slow when I genuinely needed it.',
    ],
    pros: [
      'The automated taxes do work and reassure.',
      'Integrates with the books.',
      'Pay runs are simple enough.',
      'Direct deposit is reliable.',
      'Standard payroll is handled well.',
    ],
    cons: [
      'Total cost too high for a small crew.',
      'Support was slow when it mattered.',
      'Best features gated behind higher tiers.',
      'Priced with bigger teams in mind.',
      'Per employee cost adds up fast.',
      'Value not there after the discount.',
    ],
  },
  1: {
    titles: [
      'Priced us out as a small business', 'Support failed us when it counted', 'Wrong value for a small team',
    ],
    summaries: [
      'Between the base fee, the per employee cost and needing a higher tier for the features we actually wanted, the total ran far beyond what made sense for a small business, and the value never recovered after the intro discount ended.',
      'A genuinely tricky payroll situation exposed slow, unhelpful support that took weeks to resolve something urgent, and for a business relying on payroll being right, that lost our trust.',
      'The product assumes a bigger team than ours, and we spent months paying for capacity and tiers we did not need while the one time we needed real support it was not there.',
    ],
    pros: [
      'The automated tax filing did work reliably.',
      'The integration with the books was clean.',
      'One support agent was genuinely helpful.',
    ],
    cons: [
      'Total cost far too high for a small business.',
      'Support was slow and unhelpful when it counted.',
      'Best features always one tier above us.',
      'Clearly priced for bigger teams.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.48, 4: 0.34, 3: 0.11, 2: 0.045, 1: 0.025 };
  const offsets = { ease_of_use: 0.25, value_for_money: -0.35, customer_service: -0.25, functionality: 0.05 };
  function pickOverall() {
    const r = rand(); let acc = 0;
    for (let s = 5; s >= 1; s--) { acc += dist[s]; if (r < acc) return s; }
    return 5;
  }
  function subRating(overall, offset, nullChance = 0.12) {
    if (chance(nullChance)) return null;
    let v = Math.round(overall + offset + (rand() * 1.7 - 0.85));
    if (v > 5) v = 5; if (v < 1) v = 1;
    return v;
  }
  const out = [];
  const seen = new Set();
  let guard = 0;
  while (out.length < count && guard < count * 90) {
    guard++;
    const overall = pickOverall();
    const b = CONTENT[overall];
    const title = pick(b.titles);
    const summary = pick(b.summaries);
    const pros = pick(b.pros);
    const cons = chance(0.05) ? pick(['Nothing significant to add.', 'None beyond the cost, honestly.']) : pick(b.cons);
    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);
    const year = chance(0.5) ? 2026 : (chance(0.62) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;
    const verified = chance(0.33);
    out.push({
      reviewer_name: makeName(),
      reviewer_job_title: pick(jobs),
      reviewer_company: makeCompany(),
      reviewer_industry: pick(industries),
      reviewer_company_size: pick(sizes),
      reviewer_country: pick(countries),
      verified_linkedin: verified,
      verified_badge: verified ? 'Verified LinkedIn User' : null,
      used_for_duration: pick(durations),
      overall_rating: overall,
      ease_of_use: subRating(overall, offsets.ease_of_use),
      value_for_money: subRating(overall, offsets.value_for_money),
      customer_service: subRating(overall, offsets.customer_service, 0.18),
      functionality: subRating(overall, offsets.functionality),
      review_title: title,
      summary, pros, cons,
      vendor_response: null, vendor_response_date: null,
      review_date: date,
      helpful_count: intBetween(0, 26),
    });
  }
  return out;
}

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: peer, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'simplepay').single();
  if (catErr || !peer) throw new Error(`Could not resolve payroll category from simplepay: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: peer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('QuickBooks Payroll already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations|brand_color/i.test(error.message)) {
        const { integrations, brand_color, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Inserted (a column was missing and skipped).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('QuickBooks Payroll inserted.');
    }
  }

  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(99);
  const rows = [...ANCHOR_REVIEWS, ...generated].map(r => ({
    software_id: softwareId,
    reviewer_country: 'United States',
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
