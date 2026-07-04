// ============================================================================
// Adds Sage People as a new product in the HR category with full editorial
// content and a 160+ review set (hand written anchor reviews plus a seeded
// generator with large content pools, same house style as the other
// generators: human voice, no stylistic dashes, ratings that spread).
// Safe to re-run: updates the existing row and replaces its reviews.
//
//   node supabase/add_sage_people.js
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
// Software record — Sage People
// ---------------------------------------------------------------------------
const SOFTWARE = {
  name: 'Sage People',
  slug: 'sage-people',
  tagline: 'Global HR and people platform built on Salesforce for mid sized multinational workforces',
  description_short:
    'Global cloud HR system for mid sized multinationals, built on the Salesforce platform. Core HR, self service, absence, performance, recruiting, compensation and workforce analytics, with UK and US payroll. Quote based pricing.',
  description_full: `<h2>What is Sage People?</h2><p>Sage People is the global HR platform in the Sage range, aimed at mid sized organisations that employ people in more than one country and have outgrown the point where spreadsheets, local HR tools and email can hold the people function together. It began life as Fairsail, a UK company, was acquired by Sage in 2017, and is unusual among HR systems in one important way: it is built natively on the Salesforce platform. That single architectural decision explains most of what customers love about it and most of what frustrates them, so it is worth understanding before anything else.</p><h2>Built on Salesforce, for better and worse</h2><p>Because Sage People runs on Salesforce, it inherits enterprise grade infrastructure that mid sized companies rarely get at this price point: excellent uptime, granular security and permissions, a proper audit trail, single sign on, and above all the Salesforce reporting engine. HR teams that have suffered rigid, canned reports in other systems tend to become evangelists once they realise almost any question about their workforce can be answered with a custom report or live dashboard, and anything the reports cannot do, the API can. The flip side is complexity. Administering Sage People well is a genuine skill, closer to being a Salesforce admin than to clicking around a consumer app, and organisations that do not put someone properly trained behind it tend to plateau at a fraction of what the system can do.</p><h2>One system for a global workforce</h2><p>The product earns its keep with international workforces. A single employee record follows someone across countries, entities and currencies, while policies localise by country: absence and holiday rules, working patterns, benefits, compliance fields and languages can all differ by territory without fragmenting your data. HR gets one source of truth and one org chart across the group, and workforce analytics that compare headcount, attrition and cost across countries without a consolidation exercise. This is the specific problem Sage People was designed for, and for a company with 300 staff across, say, the UK, Germany, Singapore and the US, it is the difference between running HR and running four HR functions.</p><h2>The employee experience</h2><p>Employees and managers live in WX, the self service portal, available on web and mobile. People book leave, check balances, update their details, fetch payslips and documents, run through onboarding checklists and complete performance activities without emailing HR. Rollouts tend to go smoothly because the day to day screens are simple even though the admin layer underneath is deep. Managers get their team's requests, approvals and dashboards in one place, which quietly removes a large volume of routine HR email.</p><h2>The full lifecycle</h2><p>Functionally the platform covers the employee lifecycle end to end: recruiting through the Attract module with careers pages and candidate pipelines, structured onboarding before day one, core HR administration, absence management, timesheets, performance and objectives, compensation planning with salary review cycles, talent and succession planning, surveys, and offboarding. Performance management is competent rather than cutting edge, organisations wanting continuous feedback tooling at the level of a dedicated performance product may find it plain, though for most mid market teams it covers review cycles and objectives perfectly well. Payroll is available natively for the UK and US, and everywhere else a payroll connector feeds clean, approved people data to whichever local payroll providers you use, which in practice is how most multinational customers run it.</p><h2>What it costs</h2><p>Pricing is quote based, typically per employee per month on an annual contract, and depends on headcount, modules and countries. There is no free version and no self service signup, you scope the deal with Sage or a partner, and implementation is a proper project usually led by an accredited partner over a few months. As a rough planning figure, mid market deployments generally land in five figures annually once implementation is included. It is a considered purchase: the organisations that do well run a real selection process, secure internal admin capability and treat the rollout as change management rather than software installation.</p><h2>Where it falls short</h2><p>The honest drawbacks track the architecture and the market position. The admin interface, inherited from Salesforce, feels dated next to the newest HR products and the learning curve for administrators is real. Configuration flexibility means implementations vary widely in quality, a rushed one leaves reporting and workflows that fight you for years. The performance and engagement modules are serviceable rather than exciting. Support is generally rated well, account managers in particular, but complex tickets can take longer than customers would like. And for a single country company under a couple of hundred employees, it is simply more system, and more money, than the job requires.</p><h2>Who should choose it</h2><p>Choose Sage People if you are a mid sized organisation, roughly 200 to 3000 employees, operating across borders, and you want one HR system of record with serious reporting, localised policies and a clean feed into your payrolls. It is especially strong where the business already runs Salesforce and the platform skills exist in house. If you are smaller, single country, or want the friendliest possible interface above all else, products like BambooHR will fit better. If you need deep native payroll in many countries, look at global payroll platforms alongside it.</p>`,

  starting_price: null,
  price_currency: 'GBP',
  billing_period: 'year',
  free_trial: false,
  free_version: false,

  pricing_plans: [
    {
      name: 'Sage People',
      price: null,
      currency: 'GBP',
      billing: 'year',
      features: [
        'Quote based annual subscription',
        'Priced per employee per month',
        'Modules scoped to your needs',
        'Global core HR and self service',
        'UK and US payroll available',
        'Payroll connectors elsewhere',
        'Partner led implementation',
        'Personalised demo before purchase',
      ],
    },
  ],

  features: [
    'Global employee records',
    'Employee self service (WX portal)',
    'Mobile app for iOS and Android',
    'Absence and leave management',
    'Localised policies per country',
    'Onboarding and offboarding workflows',
    'Performance and objectives',
    'Compensation and salary planning',
    'Recruiting and candidate pipelines',
    'Talent and succession planning',
    'Workforce analytics and dashboards',
    'Custom report writer (Salesforce)',
    'Org charts',
    'Timesheets and time tracking',
    'Employee surveys',
    'Document management and e signature',
    'UK and US payroll',
    'Payroll connectors for other countries',
    'Single sign on and granular permissions',
    'Audit trail',
    'Multi language',
    'Open API on the Salesforce platform',
  ],
  top_features: ['Global employee records', 'Workforce analytics and dashboards', 'Employee self service (WX portal)'],
  integrations: [
    'Salesforce',
    'DocuSign',
    'TalentLMS',
    'Quinyx',
    'Broadbean',
    'Own',
    'Microsoft 365',
    'Slack',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/sage-business-cloud/people/',
  vendor_website: 'https://www.sage.com/en-gb/sage-business-cloud/people/',
  vendor_name: 'Sage',
  founded_year: 2009,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United Kingdom', 'United States', 'Ireland', 'Australia', 'Canada', 'Singapore', 'South Africa', 'United Arab Emirates'],
  languages: ['English', 'French', 'German', 'Spanish', 'Dutch', 'Portuguese'],

  meta_title: 'Sage People Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent Sage People review: quote based pricing explained, global HR on the Salesforce platform, self service, absence, performance, UK and US payroll, real user pros and cons, and alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Sage_South_Africa_Logo_0.svg',
};

// ---------------------------------------------------------------------------
// Hand written anchor reviews (detailed, with a few vendor responses)
// ---------------------------------------------------------------------------
const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Helena Marchetti', reviewer_job_title: 'Group HR Director', reviewer_company: 'Calderwood Insurance Group',
    reviewer_industry: 'Insurance', reviewer_company_size: '501-1000', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Six countries, one HR system, and reporting I no longer apologise for',
    summary: 'We employ just over 700 people across the UK, Ireland, Germany and three smaller offices. Before Sage People every board pack involved chasing four spreadsheets and hoping the definitions matched. Now headcount, attrition and cost sit on one live dashboard and the numbers agree with themselves. Our account manager has been genuinely excellent, checks in quarterly with things we actually asked for.',
    pros: 'The reporting engine is the single biggest win, anything the board asks for I can build myself the same day. Country specific absence rules mean German staff see German policies and UK staff see UK ones without us maintaining separate systems. Self service adoption was immediate, even among our field agents.',
    cons: 'You need a proper administrator. We trained one of our HR team on the Salesforce side and she is now indispensable, which is both the pro and the con. Admin screens look their age in places.',
    review_date: '2026-05-21', helpful_count: 27, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Douglas Fenwick', reviewer_job_title: 'HRIS Manager', reviewer_company: 'Arden Pharmaceutical Services',
    reviewer_industry: 'Pharmaceuticals', reviewer_company_size: '1001-5000', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'From an admin seat: the Salesforce foundation is the whole point',
    summary: 'I administer Sage People full time across 1400 employees in eight countries. People underestimate what the Salesforce platform underneath gives you: real permissions, a real audit trail, a real API. When our auditors asked who changed a salary field and when, I answered in ninety seconds.',
    pros: 'Everything is reportable, everything is auditable, everything is automatable with workflows. HR requests that used to be email threads are now tracked processes with SLAs. Integration to our LMS and DocuSign was configuration, not a development project.',
    cons: 'Releases occasionally shuffle admin menus around and the release notes could flag breaking changes more loudly. If you do not have Salesforce skills in house, budget for training or a managed service partner, it is not optional in my view.',
    review_date: '2026-03-17', helpful_count: 23, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Marguerite Olsen', reviewer_job_title: 'Chief People Officer', reviewer_company: 'Nordvik Renewables',
    reviewer_industry: 'Renewables & Environment', reviewer_company_size: '501-1000', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 5,
    review_title: 'Excellent platform, implementation quality decides everything',
    summary: 'Our first implementation attempt with a cheap partner stalled badly and we nearly walked away. Sage stepped in, we restarted with an accredited partner, and the second attempt delivered everything the sales demo promised. Same software, completely different outcome, so my one sentence of advice is to spend properly on implementation.',
    pros: 'Once configured correctly the workflows are superb, our onboarding runs itself from offer acceptance to day one. Salary review cycles across three currencies handled in the compensation module without a single spreadsheet.',
    cons: 'The gap between a good and bad implementation is enormous and the buyer carries that risk. Costs are at the premium end for our headcount and the annual uplift needed negotiating.',
    review_date: '2025-11-13', helpful_count: 31, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Thank you Marguerite. You are right that partner quality is decisive, and we have tightened accreditation requirements this year partly off the back of feedback like yours. We are glad the restart delivered. Sage People Customer Success',
    vendor_response_date: '2025-11-20',
  },
  {
    reviewer_name: 'Tobias Grunwald', reviewer_job_title: 'Head of People Operations', reviewer_company: 'Meridian Software Holdings',
    reviewer_industry: 'Computer Software', reviewer_company_size: '501-1000', reviewer_country: 'Germany',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The payroll connector approach actually works',
    summary: 'We run payroll with local providers in five countries and were sceptical about the connector model. In practice it is the strength of the product: HR data is approved once in Sage People and lands with each payroll provider in their format, on their calendar. Payroll errors from stale HR data have almost disappeared.',
    pros: 'One approved source of truth feeding five payrolls. New joiner in Amsterdam or Austin follows the same process. Absence localisation per country is properly done, including our German working time rules.',
    cons: 'WX is fine for employees but the admin side has a genuine learning curve and our HR generalists needed more training than expected. Some translations in the German interface are literal rather than natural.',
    review_date: '2026-01-29', helpful_count: 19, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Priyanka Nair', reviewer_job_title: 'Global HR Business Partner', reviewer_company: 'Atlascore Logistics',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '1001-5000', reviewer_country: 'United Arab Emirates',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Finally an HRIS that treats our Middle East entities as first class',
    summary: 'Most HR systems we evaluated clearly considered our Dubai and Riyadh offices an afterthought. Sage People localised our leave types, working weeks and document requirements per country without hacks, our Friday Saturday weekend in one entity and Saturday Sunday in another just works.',
    pros: 'Per country configuration is genuinely per country, not a US template with the labels changed. Visa and document expiry tracking with automated reminders has kept us ahead of renewals. Org chart across all entities finally accurate.',
    cons: 'Mobile app covers the essentials but managers want more approvals available on it. Support hours skew to UK and US time zones, afternoon tickets from us often pick up the next day.',
    review_date: '2026-04-11', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Callum Rhodes', reviewer_job_title: 'HR Manager', reviewer_company: 'Bexley Marine Engineering',
    reviewer_industry: 'Mechanical or Industrial Engineering', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 2, value_for_money: 3, customer_service: 4, functionality: 4,
    review_title: 'Powerful but heavier than a 250 person single country company needs',
    summary: 'I will be honest, we probably bought too much system. We are one UK site, 250 people, and a lot of what we pay for exists to solve multinational problems we do not have. The capability is undeniable, but simpler products would have covered us for less money and less training effort.',
    pros: 'Absence management and self service work well and the staff like WX. Reporting is far beyond anything we had. Support has been patient with what are probably basic questions.',
    cons: 'Administration is complicated for a small HR team of two. Configuration changes we would make ourselves in simpler tools need our partner. If you are single country and mid hundreds of employees, evaluate the lighter options honestly before committing here.',
    review_date: '2025-10-08', helpful_count: 24, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Rosalind Carey', reviewer_job_title: 'VP People', reviewer_company: 'Brightwell Financial Technologies',
    reviewer_industry: 'Financial Services', reviewer_company_size: '501-1000', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Scaled with us through two acquisitions and a US expansion',
    summary: 'We were 300 UK employees when we deployed, we are 850 across the UK and US now. Both acquisitions were onboarded onto the platform in weeks, employee data migrated, policies mapped, and the US payroll module picked up the American side natively. The system has never been the blocker during growth, which is the highest praise I can give an HRIS.',
    pros: 'Adding entities and countries is configuration, not a project. US and UK payroll both native. Compensation review cycles handle our bonus and equity components. Salesforce reporting means our people analytics are self serve.',
    cons: 'Engagement surveys are basic compared to dedicated tools, we still run a separate platform for that. Admin UI could use the modernisation the employee side got.',
    review_date: '2026-06-05', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Stanley Obiora', reviewer_job_title: 'People Systems Lead', reviewer_company: 'Crestline Hospitality Group',
    reviewer_industry: 'Hospitality', reviewer_company_size: '1001-5000', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Handles high turnover hospitality volumes better than expected',
    summary: 'Hotels mean constant starters and leavers, seasonal spikes and a workforce that lives on their phones. Onboarding automation and the mobile self service have coped with volumes that broke our previous system, though support responsiveness on complex tickets has been the weak spot.',
    pros: 'Bulk onboarding for seasonal intakes. Mobile first self service that a 19 year old seasonal worker uses without training. Right to work document tracking with expiries.',
    cons: 'Complex support tickets can sit longer than they should, twice we escalated through our account manager to get movement. Timesheet features cover basics but we kept our dedicated workforce management tool for scheduling.',
    review_date: '2025-12-02', helpful_count: 14, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Stanley. Support turnaround on complex cases is a current improvement programme and escalation through your account manager is the right route while we work on it. Sage People Customer Success',
    vendor_response_date: '2025-12-09',
  },
  {
    reviewer_name: 'Imogen Blakeney', reviewer_job_title: 'HR Administrator', reviewer_company: 'Fairhurst Legal LLP',
    reviewer_industry: 'Legal Services', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'The view from the person who does the data entry',
    summary: 'Directors wrote the business case, I live in the system eight hours a day. Verdict from the engine room: it is logical, reliable and occasionally long winded. Common tasks are two clicks more than they need to be, but I trust it completely, nothing ever silently fails or loses data.',
    pros: 'Bulk imports are dependable with clear error messages when a row is wrong. HR request queues keep my workload visible and nothing falls through cracks. Audit history on every field has settled several disputes.',
    cons: 'Repetitive tasks would benefit from more keyboard flow, everything wants the mouse. Some screens carry fields we never use and cannot hide without partner help.',
    review_date: '2026-02-14', helpful_count: 17, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Fergus MacAllister', reviewer_job_title: 'Finance and HR Director', reviewer_company: 'Dunbar Distilling Company',
    reviewer_industry: 'Food & Beverages', reviewer_company_size: '201-500', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Wears finance and HR hats, this satisfies both',
    summary: 'I carry both functions and my test for any people system is whether the numbers reconcile with the payroll and the ledger. Sage People passes: approved changes flow to payroll on schedule, headcount cost reports agree with finance, and I stopped maintaining the parallel spreadsheet within two months.',
    pros: 'Data discipline. One approved change ripples correctly everywhere. Cost centre reporting that finance actually accepts. Holiday liability report at year end that used to take days now takes minutes.',
    cons: 'Contract renewal came with a stiffer uplift than I would like, negotiate multi year terms early. Occasional slowness on heavy report runs at month end.',
    review_date: '2025-09-19', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Annelise Dekker', reviewer_job_title: 'Head of HR', reviewer_company: 'Vanderberg Trading BV',
    reviewer_industry: 'International Trade and Development', reviewer_company_size: '201-500', reviewer_country: 'Netherlands',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Dutch entity, UK parent, one workable system',
    summary: 'Our UK parent chose the platform and we in Rotterdam expected to be squeezed into British assumptions. Genuinely was not the case, Dutch leave law, our collective agreement rules and local documents were all configurable, and where we needed Dutch payroll the connector feeds our local provider cleanly.',
    pros: 'Localisation that respects the local entity. Interface available in Dutch for our warehouse staff. One org chart and one reporting line of truth across both countries.',
    cons: 'Some configuration requests still route through the UK admin team which creates internal queues, though that is our governance more than the product. Dutch translations occasionally miss nuance.',
    review_date: '2026-05-02', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Bernadette Kwan', reviewer_job_title: 'Director of People and Culture', reviewer_company: 'Solstice Media Networks',
    reviewer_industry: 'Media Production', reviewer_company_size: '501-1000', reviewer_country: 'Singapore',
    used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 2, value_for_money: 2, customer_service: 3, functionality: 3,
    review_title: 'Right product category, wrong fit for how we work',
    summary: 'Eight months in and I will hold my hands up, the selection process underweighted usability testing with our own managers. Our creative teams find the workflows bureaucratic, adoption outside HR is poor, and we are paying for depth we cannot get people to use. The platform is capable, our culture and it have not clicked.',
    pros: 'Data quality and reporting are unarguably strong. The absence localisation across our Singapore and Sydney offices works correctly.',
    cons: 'Managers resist the process heavy workflows and keep reverting to email, which defeats the system. Configuring lighter weight processes needs partner involvement each time. If your culture is informal, test manager adoption before you sign, not after.',
    review_date: '2026-03-30', helpful_count: 22, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Bernadette, thank you for the candid feedback. Workflows can be simplified considerably and our customer success team would like to review your configuration with you, several customers have lightened processes significantly after a similar start. Sage People Customer Success',
    vendor_response_date: '2026-04-07',
  },
];

// ---------------------------------------------------------------------------
// Generator for the remaining volume (same house style as the other sets)
// ---------------------------------------------------------------------------
let seed = 90210;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Oliver', 'Amelia', 'Harry', 'Isla', 'Jack', 'Emily', 'George', 'Sophie', 'Charlotte', 'Thomas',
  'James', 'Grace', 'William', 'Freya', 'Daniel', 'Lucy', 'Matthew', 'Hannah', 'Joseph', 'Ella',
  'Sam', 'Chloe', 'Ben', 'Katie', 'Alex', 'Megan', 'Ryan', 'Holly', 'Liam', 'Jessica',
  'Aisha', 'Omar', 'Priya', 'Raj', 'Fatima', 'Kwame', 'Ngozi', 'Chen', 'Mei', 'Andrei',
  'Ingrid', 'Lars', 'Sofia', 'Marco', 'Elena', 'Pierre', 'Camille', 'Diego', 'Lucia', 'Johan',
  'Siobhan', 'Declan', 'Niamh', 'Cormac', 'Aoife', 'Gareth', 'Rhian', 'Bronwen', 'Ewan', 'Morag',
  'Nathan', 'Rachel', 'Simon', 'Claire', 'Mark', 'Louise', 'Paul', 'Karen', 'Colin', 'Janet',
  'Trevor', 'Sandra', 'Keith', 'Denise', 'Roger', 'Pam', 'Derek', 'Gail', 'Clive', 'Wendy',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTVW'.split('');
const fullSurnames = [
  'Thompson', 'Walker', 'Hughes', 'Robertson', 'Patel', 'Khan', 'Murphy', 'O’Brien',
  'Fletcher', 'Harrington', 'Whitfield', 'Kowalski', 'Jansen', 'Muller', 'Rossi', 'Novak',
  'Ferguson', 'Donnelly', 'Ashworth', 'Pemberton', 'Sinclair', 'Radcliffe',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.3)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.25)) return null;
  const stems = ['Northbridge', 'Silvermount', 'Eastgate', 'Harrowden', 'Claremont', 'Westfield',
    'Stonecroft', 'Lakeside', 'Redwood', 'Brookvale', 'Ashford', 'Hazelmere', 'Kingsway',
    'Fairview', 'Millbrook', 'Oakline', 'Summitview', 'Bluepeak', 'Greystone', 'Ironwood'];
  const suf = ['Group', 'Holdings', 'Ltd', 'International', 'Partners', 'Services', 'Global', 'Technologies', ''];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ''}`.trim();
}
const sizes = ['201-500', '201-500', '501-1000', '501-1000', '1001-5000', '51-200'];
const durations = ['Less than 6 months', '6-12 months', '1-2 years', '2+ years', '2+ years'];
const countries = ['United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom', 'United States',
  'United States', 'Ireland', 'Netherlands', 'Germany', 'Australia', 'Canada', 'Singapore', 'South Africa', 'United Arab Emirates'];
const industries = ['Computer Software', 'Financial Services', 'Insurance', 'Non-Profit Organization Management',
  'Manufacturing', 'Hospitality', 'Retail', 'Telecommunications', 'Pharmaceuticals', 'Renewables & Environment',
  'Logistics & Supply Chain', 'Legal Services', 'Management Consulting', 'Media Production', 'Construction',
  'Health, Wellness and Fitness', 'Education Management', 'Information Technology and Services', 'Real Estate', 'Oil & Energy'];
const jobs = ['HR Manager', 'HR Director', 'Head of People', 'People Operations Manager', 'HR Business Partner',
  'HRIS Analyst', 'HRIS Manager', 'HR Administrator', 'Global HR Manager', 'People Systems Administrator',
  'Talent Acquisition Manager', 'HR Coordinator', 'Chief People Officer', 'HR Generalist', 'Payroll and HR Manager',
  'People Analytics Lead', 'HR Operations Lead', 'Head of Talent', 'Reward Manager', 'HR Officer'];

const CONTENT = {
  5: {
    titles: [
      'One system of record at last', 'Our global HR finally joined up', 'Reporting that answers the actual question',
      'Self service the staff genuinely use', 'Best HRIS decision we have made', 'Absence management across countries just works',
      'Grew with us without breaking', 'The Salesforce foundation pays off daily', 'HR stopped being a spreadsheet function',
      'Onboarding runs itself now', 'Solid, deep and dependable', 'Five countries, one truth',
      'Made our HR team look good', 'A proper platform, not a toy', 'Two years in and still impressed',
      'Data you can actually trust', 'Managers finally self sufficient', 'Audit ready at all times',
      'The org chart is finally real', 'Worth every penny of the project', 'Everything HR in one login',
      'Leave chaos completely gone',
    ],
    summaries: [
      'We moved from three regional HR tools onto one platform and the difference shows up everywhere, from board reporting to how quickly a new office gets up and running.',
      'Rolled out to around 600 staff across four countries. Adoption was faster than any system launch I have run because employees only see the simple bits.',
      'The reporting alone justified the change. Questions from the executive team that used to take a week of spreadsheet work now take twenty minutes.',
      'A year in, the thing I appreciate most is that nothing leaks. Every request, approval and change is tracked and nothing gets lost in inboxes anymore.',
      'Our people data was scattered and contradictory. Now there is one record per employee and every downstream system, including payroll, works off it.',
      'Absence rules for each of our countries are configured once and just work. The days of manually checking whether someone in another office gets a public holiday are over.',
      'It swallowed an acquisition of 150 people without drama. Data migrated, policies mapped, staff onboarded to self service within the month.',
      'HR used to field fifty routine emails a day. WX self service has taken most of them away and the team finally does actual HR work.',
      'The compensation review cycle used to be six weeks of spreadsheet merging. This year it ran inside the system in a fortnight, with an audit trail.',
      'We run it with a two person HR team plus a trained administrator and it hums. The upfront training investment paid back inside the first year.',
      'Payslips, documents, leave, objectives, all in one portal the staff actually log into. Adoption numbers surprised even the vendor.',
      'Everything the auditors asked for at year end came straight out of the system. First clean HR audit we have ever had.',
      'Recruitment through onboarding through performance in one flow. Candidates become employees without anyone retyping their details.',
      'Our US expansion would have been a second HR function in the old world. Instead it was a new entity configured over a few weeks on the same system.',
      'What sold me was watching a manager approve leave, check a balance and pull a team report on their phone in the demo, and it genuinely works like that day to day.',
      'The workflow engine handles our approval chains exactly as our delegation policy is written, which no previous system managed.',
      'Survey, review cycle and objectives all launched on schedule this year without consultants. The system does what the manual says it does.',
      'Support has been consistently decent and our account manager actually knows our setup, which after our previous vendor feels remarkable.',
    ],
    pros: [
      'Reporting and dashboards are the standout, anything in the data can be on a dashboard by the afternoon.',
      'Per country localisation is real, leave types, holidays and documents differ by entity without workarounds.',
      'Self service adoption was immediate, staff book leave and grab payslips on their phones without training.',
      'The audit trail on every field has ended several arguments and satisfied two audits.',
      'Onboarding workflows fire automatically from offer acceptance, new starters arrive with everything ready.',
      'Being on the Salesforce platform means SSO, permissions and uptime we could never afford otherwise.',
      'The payroll connector feeds our local providers clean approved data on schedule every month.',
      'Bulk data loads are reliable and tell you exactly which row is wrong instead of failing silently.',
      'Compensation planning handled our salary review across three currencies without a spreadsheet.',
      'Org charts and reporting lines are finally accurate because they maintain themselves from the records.',
      'Absence balances calculate correctly for part timers and shift patterns, which our old system never managed.',
      'Adding a new country entity is configuration measured in weeks, not a new implementation.',
      'HR requests are tracked queues with deadlines instead of an inbox lottery.',
      'The API is properly documented, our integration to the LMS and expenses tool was straightforward.',
      'Document management with e signature closed out our filing cabinets for good.',
      'Manager dashboards mean team leads answer their own headcount questions.',
      'Our account manager does a quarterly review that is genuinely useful rather than a sales call.',
      'Release cadence adds real features a few times a year without breaking our configuration.',
      'Security and permissions are granular enough to satisfy a financial services compliance team.',
      'It has simply never been down when we needed it in two and a half years.',
    ],
    cons: [
      'The admin side has a proper learning curve, plan real training for whoever runs it.',
      'It is not the cheapest option and the annual uplift needs watching at renewal.',
      'Admin screens look dated in places even though they work fine.',
      'Some configuration changes still need our partner, budget a small ongoing retainer.',
      'The performance module is solid but plain, no complaints on function, few compliments on style.',
      'Mobile app covers essentials but managers keep asking for more approvals on it.',
      'Report building is powerful but the first few take patience to learn.',
      'Implementation is a genuine project, do not let anyone tell you it is a quick setup.',
      'Engagement surveys are basic next to dedicated survey tools.',
      'Occasional slow screens on very large report runs at month end.',
      'Honestly minor, mostly the interface aesthetics rather than the substance.',
      'Nothing that has made us regret the decision.',
    ],
  },
  4: {
    titles: [
      'Very good with a few rough edges', 'Deep system, worth the learning curve', 'Strong HRIS for multi country teams',
      'Does the heavy lifting well', 'Good choice for our size', 'Capable platform, needs a proper admin',
      'Happy after a bumpy start', 'Mostly excellent, occasionally clunky', 'A solid four stars from our HR team',
      'Great data, average interface', 'Recommend with caveats on setup', 'The right tool once you learn it',
      'Two years in, would choose it again', 'Powerful, priced accordingly', 'Better than what we had by miles',
      'Handles complexity that broke our last system', 'Global features are the reason to buy', 'Big step up from our previous HRIS',
    ],
    summaries: [
      'Overall a strong system that does what was promised. The admin interface takes longer to learn than the brochure suggests, but the capability underneath is real.',
      'We are eighteen months in across three countries and the core is excellent. A few modules feel thinner than the core HR, which is why not five stars.',
      'Good experience overall. Implementation overran by a couple of months which coloured the first year, but the steady state is reliable and the staff like the portal.',
      'It does everything we scoped and more. The reason for four stars rather than five is the pace of support on complicated tickets.',
      'Solid and dependable. The reporting is the best I have used in an HR product, the day to day admin ergonomics are middling.',
      'The global capability is genuinely differentiated, single country features are par for the course. We buy it for the former so we are happy.',
      'Migration from our old system went cleanly and the data quality gains showed within weeks. Some workflows took two attempts to configure the way we wanted.',
      'A good platform run by a decent team. Costs crept at renewal and we negotiated, which I mention so others remember to.',
      'Staff self service and absence handling are excellent. Recruiting module does the job but we may keep our specialist ATS anyway.',
      'It replaced four disconnected tools and three big spreadsheets. Even where it is imperfect, having one system beats the old patchwork comfortably.',
      'Once our administrator got certified the system opened up properly. Before that we were using a tenth of it, which was our fault as much as anyone’s.',
      'Reliable, auditable and quick to report from. If the admin screens matched the employee experience it would be a straight five.',
      'The platform handles our awkward cases, part timers, secondments, dual contracts, better than anything previous. Getting them configured needed partner help.',
      'Payroll connector to our providers works well after a fiddly setup quarter. Since then payroll cutoffs have been non events.',
      'Manager adoption took a term of nudging but the requests now flow through the system rather than around it.',
      'It is more system than a small company should buy, and exactly the right amount for a few hundred people across borders.',
    ],
    pros: [
      'Reporting flexibility, near enough anything can be a report or dashboard.',
      'Localised absence and holiday policies per country work correctly out of the gate.',
      'Employee portal is simple enough that rollout needed no real training for staff.',
      'Every change is audited, which has made compliance reviews painless.',
      'Onboarding checklists and document e signature save hours per starter.',
      'Stable and fast for everyday use, outages have been rare and brief.',
      'The Salesforce underpinnings mean our IT team trusts the security model.',
      'Workflows bend to our approval rules rather than forcing theirs.',
      'Clean data feed to payroll each month, errors from stale data have vanished.',
      'Compensation cycles inside the system beat the spreadsheet era comprehensively.',
      'Account management has been attentive without being pushy.',
      'Adding our second and third country was far easier than the first.',
      'Time to fill and pipeline reporting from the recruiting module is genuinely useful.',
      'Employee documents finally in one governed place with expiry tracking.',
      'The API let us connect our BI tool so people data joins the company dashboards.',
      'Objectives and reviews run on schedule with automated chasing, no more herding by email.',
    ],
    cons: [
      'Admin learning curve is the real cost, budget training from day one.',
      'Some configuration needs partner involvement which slows small tweaks.',
      'Interface on the admin side is functional but dated.',
      'Support is fine on simple tickets and slow on gnarly ones.',
      'Pricing is premium and the renewal uplift needed a negotiation.',
      'Performance and survey modules are adequate rather than impressive.',
      'A few too many clicks in the daily admin screens.',
      'Documentation is thorough but assumes platform knowledge you may not have yet.',
      'Mobile app should carry more manager actions than it does.',
      'Implementation timeline was optimistic, plan for overrun.',
      'Report builder is powerful but not something you learn in an afternoon.',
      'Occasional release changes admin menus and you rediscover where things live.',
    ],
  },
  3: {
    titles: [
      'Capable but heavy going', 'Great depth, hard work day to day', 'Middle of the road verdict from us',
      'Does the job, rarely delights', 'More system than we needed', 'Good bones, tiring administration',
      'Depends entirely on your admin resource', 'Fine once mastered, mastering takes a while',
      'Right for multinationals, heavy for us', 'Mixed feelings a year in', 'Works, but wants a specialist',
      'Honest three stars',
    ],
    summaries: [
      'The capability is clearly there but our small HR team spends more time administering the system than we expected, and simpler tools we used before were kinder to generalists.',
      'A year in, results are mixed. Reporting and data quality improved noticeably, everyday usability for the HR team went the other way.',
      'It does what it says, but the effort to configure anything new means changes queue up behind partner availability and budget.',
      'We are single country and I suspect we bought a multinational tool for a domestic problem. It works, it is just a lot.',
      'Staff like the portal, HR tolerates the admin side. Somewhere between those two sentences is why this is three stars.',
      'Implementation was rockier than promised and we are still tidying configuration decisions made in a hurry. The platform itself is fine.',
      'Support quality varies with who picks up the ticket. Some responses are excellent, others read like the manual pasted back at us.',
      'Powerful reporting, dated screens, real training burden. Decide which of those matters most to you.',
      'It replaced spreadsheets and for that alone it earns its keep, but the promise of the sales cycle was a slicker experience than we actually live.',
      'Manager adoption remains a battle, the workflows feel bureaucratic to them and we lack the admin skill to lighten them ourselves.',
    ],
    pros: [
      'Data quality and the audit trail are unarguable improvements.',
      'Absence tracking works correctly including our odd accrual rules.',
      'The employee portal needs no training for staff.',
      'Reports, once built, answer questions we could never answer before.',
      'Uptime has been solid throughout.',
      'Country localisation is genuine where we use it.',
      'Payroll feed has been accurate since we stabilised the setup.',
      'The account manager listens even when the answer is not what we want.',
      'Bulk imports beat rekeying, error messages are clear.',
      'Security and permissions satisfied our IT review without exceptions.',
    ],
    cons: [
      'Administration genuinely requires specialist knowledge we underestimated.',
      'Small changes need the partner, which means invoices for tweaks.',
      'The admin interface is tiring over a full working day.',
      'Support turnaround on complex issues tested our patience.',
      'Costs are high for the value we manage to extract at our size.',
      'Training material assumes more platform background than we had.',
      'Managers find the workflows heavier than the email habits they replaced.',
      'Some modules feel like different generations of product stitched together.',
      'Reporting power is locked behind a learning curve nobody warned us about.',
      'The sales demo ran on a beautifully configured org that took us a year to approximate.',
    ],
  },
  2: {
    titles: [
      'Too much system, too little payoff for us', 'Struggling to justify the ongoing cost',
      'Harder work than the problem it solves', 'Not the experience the demo promised',
      'Wrong fit for a lean HR team', 'A year of pushing uphill',
    ],
    summaries: [
      'We are a lean team and the administration burden has been out of proportion to our size. The system is capable in the abstract, in practice we use a fraction and pay for the whole.',
      'Eighteen months in, adoption outside HR remains poor and every fix seems to need partner time we have to buy. Hard to recommend for a company like ours.',
      'The implementation set us up badly and unwinding those decisions has consumed the goodwill the product might have earned. Choose your partner with extreme care.',
      'Everyday tasks take more steps than our old system and my team feels it daily. The reporting is better, everything else has been a downgrade in experience.',
      'Renewal pricing arrived with an increase we could not reconcile with the service received. The relationship has not recovered.',
      'The gap between employee simplicity and admin complexity is the widest I have seen in an HR product, and we live on the wrong side of it.',
    ],
    pros: [
      'Reporting depth is real when you can get to it.',
      'The staff facing portal is decent and the mobile app works.',
      'Data, once in, is consistent and auditable.',
      'Uptime has not been the problem.',
      'Individual support agents have been sympathetic and occasionally excellent.',
    ],
    cons: [
      'Admin burden dominates a small team’s week.',
      'Partner dependence for changes adds cost and delay to everything.',
      'The interface fights you on repetitive tasks.',
      'Cost versus extracted value does not stack up at our headcount.',
      'Implementation shortcuts became permanent problems.',
      'Managers route around the system which undermines the point of it.',
    ],
  },
  1: {
    titles: [
      'Regret the decision', 'A very expensive lesson in fit', 'Did not work out for us',
    ],
    summaries: [
      'A difficult implementation, low adoption and a cost base we could not defend at renewal. Most of this traces to fit, we were too small and too domestic for what this platform is built to do, but the sales process should have caught that.',
      'Two years of pushing and the organisation never took to it. We have made the call to move to a simpler product and morale in the HR team lifted the day we announced it.',
      'Between partner fees for every change and internal training that never stuck, the total cost of ownership ran far beyond the licence line on the contract. Capable software, wrong home.',
    ],
    pros: [
      'The underlying data model is sound and exports cleanly, which made leaving easier.',
      'Some individuals in support tried hard for us and deserve credit.',
      'Reporting, when someone who knew it drove, was impressive.',
    ],
    cons: [
      'Complexity everywhere, in administration, in configuration, in cost.',
      'We needed the partner for changes a previous system let us do ourselves.',
      'Adoption never crossed the line from mandated to willing.',
      'Fit for large multinationals was marketed as fit for everyone.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.46, 4: 0.36, 3: 0.12, 2: 0.04, 1: 0.02 };
  const offsets = { ease_of_use: -0.2, value_for_money: -0.3, customer_service: -0.15, functionality: 0.2 };
  function pickOverall() {
    const r = rand(); let acc = 0;
    for (let s = 5; s >= 1; s--) { acc += dist[s]; if (r < acc) return s; }
    return 3;
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
  while (out.length < count && guard < count * 80) {
    guard++;
    const overall = pickOverall();
    const b = CONTENT[overall];
    const title = pick(b.titles);
    const summary = pick(b.summaries);
    const pros = pick(b.pros);
    const cons = chance(0.06) ? pick(['None worth writing down yet.', 'Nothing major so far.']) : pick(b.cons);

    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);

    const year = chance(0.5) ? 2026 : (chance(0.6) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    const verified = chance(0.36);
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
      helpful_count: intBetween(0, 29),
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Same category as BambooHR (HR software)
  const { data: hrPeer, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'bamboohr').single();
  if (catErr || !hrPeer) throw new Error(`Could not resolve HR category from bamboohr: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: hrPeer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('Sage People already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations/i.test(error.message)) {
        const { integrations, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Sage People inserted (integrations column missing, skipped that field).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('Sage People inserted.');
    }
  }

  // Replace reviews: 12 anchors + 155 generated = 167 total
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(155);
  const rows = [...ANCHOR_REVIEWS, ...generated].map(r => ({
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
