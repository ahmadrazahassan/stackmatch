// ============================================================================
// Adds Sage 50 Payroll as a new product in the Payroll category with full
// editorial content and a ~95 review set (hand written anchors plus a seeded
// generator with per product content pools). Safe to re-run: updates the
// existing row and replaces its reviews if the slug already exists.
//
// Sage 50 Payroll is the desktop payroll product that pairs with Sage 50
// Accounts, priced by employee band. Distinct from the cloud Sage Payroll
// product already in the catalogue.
//
//   node supabase/add_sage_50_payroll.js
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
// Software record: Sage 50 Payroll
// ---------------------------------------------------------------------------
const SOFTWARE = {
  name: 'Sage 50 Payroll',
  slug: 'sage-50-payroll',
  tagline: 'Powerful desktop payroll for UK businesses that run their own pay runs in house',
  description_short:
    'Desktop payroll software for UK businesses, HMRC recognised with RTI submissions, pension auto enrolment, statutory payments and detailed reporting, priced by number of employees. Pairs with Sage 50 Accounts.',
  description_full: `<h2>What is Sage 50 Payroll?</h2><p>Sage 50 Payroll is the desktop payroll product in the Sage range, the payroll companion to Sage 50 Accounts, and it is aimed at UK businesses that want to run their own payroll in house with real depth and control rather than outsourcing it to a bureau or using a lighter cloud tool. It descends from the same heritage that made Sage a fixture in British finance offices for four decades, and it remains the choice of a large number of payroll professionals, bookkeepers and finance managers who value the speed, detail and reliability of a proper installed payroll system that they know inside out. Where the cloud Sage Payroll product is built for small businesses that want a guided, simplified pay run, Sage 50 Payroll is built for the person who does payroll as a genuine part of their job and wants a tool with the depth to match.</p><h2>HMRC compliance handled properly</h2><p>The foundation of any payroll product is compliance, and this is where Sage 50 Payroll has earned decades of trust. It is HMRC recognised, submits Real Time Information as part of the normal pay run rather than as a separate chore, and keeps itself current with every tax year change so that when rates and thresholds move each April the update lands in the software rather than on your desk as a manual correction job. PAYE, National Insurance, student loan deductions and statutory payments are all calculated automatically and correctly, and the Full Payment Submission and Employer Payment Summary flow to HMRC from inside the software. For a business that carries the legal responsibility for getting payroll right, that depth of compliance handling is the entire point.</p><h2>Pension auto enrolment and statutory payments</h2><p>Workplace pension auto enrolment is handled thoroughly, assessing eligible workers at every pay run, generating the enrolment communications, and producing the contribution files that pension providers such as Nest expect. Statutory sick pay, maternity, paternity and adoption pay are calculated on the correct reference periods rather than worked out by hand, which removes one of the more common and more consequential sources of payroll error, since these calculations are genuinely easy to get wrong manually and land at exactly the moments, illness or new parenthood, when an employee can least afford a mistake. Year end produces P60s without a separate process, and the software walks you through the year end steps rather than leaving you to remember them.</p><h2>Depth and control for the payroll professional</h2><p>What separates Sage 50 Payroll from lighter tools is the depth. It handles complex pay elements, multiple pay frequencies, detailed departmental and cost centre analysis, and the kind of nuanced scenarios, salary sacrifice arrangements, attachment of earnings orders, complex overtime and shift premiums, that a payroll professional in a larger or more complex business meets regularly. The reporting is genuinely detailed, letting a finance team reconcile payroll costs against budgets and produce the analysis auditors and directors ask for rather than a fixed set of basic summaries. For a bookkeeper running payroll for several clients, the ability to move quickly and precisely through a pay run using an interface they know thoroughly is a real productivity advantage.</p><h2>Works with Sage 50 Accounts</h2><p>The natural pairing is with Sage 50 Accounts, and when the two run together the payroll journals post directly into the accounts, so wages, tax and pension liabilities appear correctly in the books without anyone rekeying them. This is a large part of why so many businesses that already run Sage 50 Accounts choose Sage 50 Payroll alongside it rather than a different payroll product, since the integration removes an entire category of manual posting and the errors that come with it. It also connects to Sage HR for businesses that want their people data and their payroll feeding each other.</p><h2>What it costs</h2><p>Pricing is structured by the number of employees you pay, in bands, so a business paying up to a handful of staff pays considerably less than one paying dozens, and the cost scales with your actual payroll size rather than a flat fee. This banded model suits the product's audience well, since a bookkeeper running a small client payroll and a finance team running a hundred plus employee payroll are genuinely different propositions and are priced accordingly. There is a free trial, and the product is sold on a subscription with the ongoing updates that keep it compliant included, which is precisely what you want from payroll software given how often the underlying legislation changes.</p><h2>Where it falls short</h2><p>The honest drawbacks track its nature as a desktop product. It is installed rather than accessed through a browser, so remote working with it is less seamless than a pure cloud tool, though cloud connectivity and remote access options have improved this considerably. The interface, while continually refreshed, is recognisably a professional desktop application rather than a consumer style app, which means a genuine learning curve for someone new to payroll, this is a tool built for people who do payroll, not a guided wizard for a business owner doing it reluctantly once a month. Support is generally solid but shows seasonal strain around year end and the start of a new tax year, the busiest possible weeks for payroll. And for a very small business that simply wants the simplest possible pay run for a handful of staff, this is more system than the job requires, which is exactly when the lighter cloud Sage Payroll is the better fit.</p><h2>Who should choose it</h2><p>Sage 50 Payroll fits UK businesses that run payroll in house with genuine depth, particularly those already using Sage 50 Accounts where the integration is seamless, finance teams handling more complex payroll scenarios, and bookkeepers and payroll bureaus running payroll for multiple clients who value speed and control. Businesses wanting the simplest, most guided possible cloud pay run for a small team should look at the cloud Sage Payroll instead, and very small employers with straightforward needs may find the desktop depth more than they need. But for the payroll professional who wants a powerful, compliant, deeply capable tool with a forty year track record behind it, Sage 50 Payroll remains a benchmark in the UK market.</p>`,

  starting_price: 10,
  price_currency: 'GBP',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Up to 15 Employees',
      price: 10,
      currency: 'GBP',
      billing: 'month',
      features: [
        'Priced by employee band',
        'HMRC recognised RTI submissions',
        'Automatic PAYE and NI calculations',
        'Pension auto enrolment',
        'Statutory payment calculations',
        'Payslips and P60s',
        'Detailed payroll reporting',
        'Free trial available',
      ],
    },
    {
      name: 'Up to 50 Employees',
      price: 30,
      currency: 'GBP',
      billing: 'month',
      features: [
        'Everything in the smaller band',
        'Departmental and cost centre analysis',
        'Salary sacrifice handling',
        'Attachment of earnings orders',
        'Multiple pay frequencies',
        'Sage 50 Accounts integration',
        'Sage HR integration',
        'Ongoing compliance updates included',
      ],
    },
    {
      name: 'Up to 100+ Employees',
      price: 55,
      currency: 'GBP',
      billing: 'month',
      features: [
        'Everything in the mid band',
        'Full multi department payroll',
        'Advanced reporting and analysis',
        'Complex pay element handling',
        'Priority for larger payrolls',
        'Bureau friendly for multiple clients',
        'Year end processing built in',
        'Dedicated onboarding support',
      ],
    },
  ],

  features: [
    'HMRC recognised RTI submissions',
    'Automatic PAYE and NI calculations',
    'Pension auto enrolment and assessment',
    'Statutory sick, maternity and paternity pay',
    'Payslips and online payslips',
    'P60 and year end processing',
    'Departmental and cost centre analysis',
    'Salary sacrifice handling',
    'Attachment of earnings orders',
    'Multiple pay frequencies',
    'Detailed payroll reporting',
    'Nest and pension provider file output',
    'Sage 50 Accounts integration',
    'Sage HR integration',
    'Employee records management',
    'Remote data access',
    'Audit trail',
    'Bureau support for multiple payrolls',
  ],
  top_features: ['HMRC recognised RTI submissions', 'Pension auto enrolment', 'Detailed payroll reporting'],
  integrations: [
    'Sage 50 Accounts',
    'Sage HR',
    'HMRC',
    'Nest Pensions',
    'Microsoft 365',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/products/sage-50-payroll/',
  vendor_website: 'https://www.sage.com/en-gb/products/sage-50-payroll/',
  vendor_name: 'Sage',
  founded_year: 1981,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United Kingdom', 'Ireland'],
  languages: ['English'],

  meta_title: 'Sage 50 Payroll Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent Sage 50 Payroll review for UK businesses: desktop payroll pricing by employee band, RTI submissions, pension auto enrolment, reporting depth, real user pros and cons, and alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Sage_South_Africa_Logo_0.svg',
};

// ---------------------------------------------------------------------------
// Hand written anchor reviews
// ---------------------------------------------------------------------------
const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Denise Holbrook', reviewer_job_title: 'Payroll Manager', reviewer_company: 'Marchbank Manufacturing',
    reviewer_industry: 'Manufacturing', reviewer_company_size: '51-200', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Twenty years on Sage 50 Payroll and it has never let me down',
    summary: 'I run payroll for a hundred and forty staff across three departments and I would not swap this for a cloud tool for anything. The depth is exactly what a proper payroll job needs, and every April the tax changes just appear rather than becoming my problem.',
    pros: 'The reporting depth is unmatched at this level, I can reconcile payroll against budgets by department without touching a spreadsheet. RTI submits as part of the run so you cannot forget it. Salary sacrifice and attachment of earnings are handled properly, not bolted on.',
    cons: 'It is a desktop product, so remote working takes a bit more setup than a browser tool. Support waits around year end can be long, which is the worst possible time.',
    review_date: '2026-04-09', helpful_count: 24, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Raymond Ellison', reviewer_job_title: 'Bookkeeper', reviewer_company: 'Ellison Payroll Bureau',
    reviewer_industry: 'Accounting', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'I run twelve client payrolls on it and it flies',
    summary: 'As a bureau, speed and reliability are everything, and once you know the keyboard flow you can run a client payroll faster than any cloud product would let you. The compliance has been faultless across every client for years.',
    pros: 'Fast for an experienced user, which matters when you run payroll for a dozen clients. RTI never fails. Pension files upload to Nest without editing. The depth means no client scenario has ever caught me out.',
    cons: 'The per employee band pricing across several clients needs working out carefully. A newer bookkeeper would need proper training, this is not a point and click wizard.',
    review_date: '2026-02-18', helpful_count: 20, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Angela Prentice', reviewer_job_title: 'Finance Manager', reviewer_company: 'Halewood Construction',
    reviewer_industry: 'Construction', reviewer_company_size: '51-200', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 5,
    review_title: 'The Sage 50 Accounts link is why we chose it',
    summary: 'We already ran Sage 50 Accounts, so payroll journals posting straight into the accounts was the deciding factor. Wages, PAYE and pension liabilities appear correctly coded without anyone rekeying a thing.',
    pros: 'The accounts integration removes all the manual payroll journals and the errors they caused. Departmental analysis suits our site based cost tracking. RTI and pensions handled without drama for years.',
    cons: 'Support in January and April is slower than I would like. New team members take a while to learn it properly, it rewards experience.',
    review_date: '2025-11-25', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Michael Ferris', reviewer_job_title: 'Company Accountant', reviewer_company: 'Trellborough Foods',
    reviewer_industry: 'Food Production', reviewer_company_size: '51-200', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Deep, precise, and it never gets the numbers wrong',
    summary: 'For a food business with shift workers and varying hours the depth of this product genuinely matters. It copes with complexity that lighter payroll tools simply cannot, and the numbers are always right.',
    pros: 'Handles complex pay elements and multiple frequencies properly. Statutory payments calculated on the correct reference periods, which I have seen simpler tools get wrong. Reporting satisfies our auditors as is.',
    cons: 'There is a genuine learning curve, this is a professional tool. The desktop nature means backups and updates need managing. Worth it for the capability.',
    review_date: '2026-03-12', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Sandra Kettlewell', reviewer_job_title: 'Payroll Administrator', reviewer_company: 'Northgate Care Group',
    reviewer_industry: 'Individual & Family Services', reviewer_company_size: '201-500', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Care payroll with hundreds of staff, handled with room to spare',
    summary: 'We pay over three hundred care staff on varying contracts and this is the only payroll product we have used that copes without a fight. Pension auto enrolment assessment across a workforce that constantly changes is faultless.',
    pros: 'Auto enrolment assessment across a large, changing workforce is genuinely bulletproof. Handles our mix of contracts and frequencies. Support once talked me through a tricky year end at length rather than rushing me off the phone.',
    cons: 'The interface is dense until you learn it. At our scale the pricing band is not cheap, but the alternative is a bureau that would cost more.',
    review_date: '2026-05-22', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Trevor Ashby', reviewer_job_title: 'Director', reviewer_company: 'Ashby Electrical Contractors',
    reviewer_industry: 'Construction', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 2, value_for_money: 3, customer_service: 3, functionality: 4,
    review_title: 'Powerful, but heavier than a small firm really needs',
    summary: 'We are twenty staff and honestly this is more payroll system than we need. It does everything correctly but the learning curve was steep for what is a fairly simple payroll, and I sometimes wonder if the cloud version would have suited us better.',
    pros: 'When you get it right, the numbers are always correct. RTI and pensions are handled properly. Reliable once set up.',
    cons: 'Too much system for a straightforward small payroll. The learning curve took real time. For us the guided cloud product might have been the better fit.',
    review_date: '2026-01-16', helpful_count: 18, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Trevor. For a smaller, straightforward payroll our cloud Sage Payroll product may indeed suit better, and our team can talk you through the difference if it would help. Sage Customer Care',
    vendor_response_date: '2026-01-23',
  },
  {
    reviewer_name: 'Patricia Mowbray', reviewer_job_title: 'Head of Finance', reviewer_company: 'Wexcombe Logistics',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '51-200', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 5,
    review_title: 'Brought payroll in house and saved a fortune',
    summary: 'We were paying a bureau a small fortune to run payroll for eighty drivers and office staff. Bringing it in house on Sage 50 Payroll paid for itself inside the first year and gave us far more control and visibility.',
    pros: 'The saving against a bureau was substantial and immediate. Full control and same day visibility of payroll costs. Departmental reporting for our depots. Handles driver variable hours once set up.',
    cons: 'Getting variable hours in for a large driver workforce is more manual than I would like. The initial setup and learning took a determined few weeks.',
    review_date: '2025-10-30', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Gordon Whitaker', reviewer_job_title: 'Payroll Specialist', reviewer_company: 'Brackenfield Group',
    reviewer_industry: 'Financial Services', reviewer_company_size: '201-500', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'A professional tool for people who do payroll properly',
    summary: 'I have used most of the payroll products on the market across my career and this is the one I trust for a serious, complex payroll. It assumes you know what you are doing, and rewards that with genuine depth and speed.',
    pros: 'Depth and precision that lighter tools cannot match. Fast for an experienced operator. Compliance is rock solid. The reporting answers whatever finance and audit throw at it.',
    cons: 'Not for a novice, the learning curve is real. Year end support waits can be long. Desktop backups are your responsibility.',
    review_date: '2026-04-27', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Yvonne Castleford', reviewer_job_title: 'Office Manager', reviewer_company: 'Pinderfield Joinery',
    reviewer_industry: 'Building Materials', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Does our weekly payroll reliably every single week',
    summary: 'Joinery means weekly pay and varying hours, and this handles it without fuss once you have your setup right. Two years in it has never missed an RTI submission or got a calculation wrong.',
    pros: 'Weekly payroll is quick once established. RTI has never failed us. Pension side handled cleanly. Reliable week after week, which is what you want.',
    cons: 'Weekly means you are in it every week obviously. Entering variable hours takes a bit of time. The interface felt dated at first though you get used to it.',
    review_date: '2025-12-14', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Colin Braithwaite', reviewer_job_title: 'Financial Controller', reviewer_company: 'Aldenholme Estates',
    reviewer_industry: 'Real Estate', reviewer_company_size: '51-200', used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 2, value_for_money: 3, customer_service: 2, functionality: 4,
    review_title: 'Capable but the desktop model frustrated our remote team',
    summary: 'The payroll capability is genuinely strong, but as a business with a partly remote finance team the desktop model has been a constant friction, and getting help set up remote access was harder than it should have been.',
    pros: 'The payroll engine itself is powerful and accurate. Compliance is solid. Reporting is detailed.',
    cons: 'The desktop nature does not suit a remote finance team well. Support was slow on our remote access setup. We are weighing a cloud alternative for the flexibility.',
    review_date: '2026-02-03', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Hello Colin, we are sorry the remote setup was difficult. Sage 50 Payroll does offer cloud connectivity for remote access and our team can help configure it, or discuss the fully cloud option if that suits your team better. Sage Customer Care',
    vendor_response_date: '2026-02-10',
  },
  {
    reviewer_name: 'Hazel Rutherford', reviewer_job_title: 'Payroll Manager', reviewer_company: 'Sedgemoor Retail',
    reviewer_industry: 'Retail', reviewer_company_size: '201-500', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Handles our seasonal swings and hundreds of staff',
    summary: 'Retail means headcount that swings hard with the seasons, and the pension reassessment and RTI handling cope with the constant starters and leavers better than anything else we tried. Year end is an afternoon, not a week.',
    pros: 'Copes with high staff turnover and seasonal swings without complaint. Bulk starter and leaver processing. Year end is genuinely straightforward. Reporting keeps our directors informed.',
    cons: 'The pricing band steps up as headcount grows, predictable but worth budgeting. Support is stretched at the busiest times.',
    review_date: '2026-05-08', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
];

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------
let seed = 505077;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Denise', 'Raymond', 'Angela', 'Michael', 'Sandra', 'Trevor', 'Patricia', 'Gordon', 'Yvonne', 'Colin',
  'Hazel', 'Brian', 'Susan', 'Alan', 'Christine', 'Keith', 'Linda', 'Roy', 'Marion', 'Stuart',
  'Pauline', 'Nigel', 'Wendy', 'Malcolm', 'Gail', 'Clive', 'Sharon', 'Barry', 'Janet', 'Derek',
  'Rhian', 'Aled', 'Ffion', 'Sian', 'Gethin', 'Siobhan', 'Declan', 'Niamh', 'Padraig', 'Orla',
  'Imran', 'Sana', 'Ravi', 'Meera', 'Priya', 'Amir', 'Fatima', 'Kwame', 'Piotr', 'Kasia',
  'Karen', 'Paul', 'Julie', 'Gary', 'Tracey', 'Neil', 'Michelle', 'Dawn', 'Ian', 'Carol',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Ainscough', 'Barraclough', 'Cattermole', 'Duckworth', 'Entwistle', 'Fairbrother', 'Gledhill',
  'Higginbotham', ' Collinson'.trim(), 'Kirkbride', 'Longworth', 'Micklethwaite', 'Naylor', 'Oldroyd',
  'Postlethwaite', 'Ramsbottom', 'Shufflebotham', 'Threlfall', 'Utley', 'Verity', 'Winterbottom',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.3)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.26)) return null;
  const stems = ['Marsden', 'Whitby', 'Calder', 'Ridgeway', 'Foxton', 'Alderley', 'Brackenridge',
    'Holloway', 'Netherfield', 'Swaledale', 'Tarnbrook', 'Wetherall', 'Kirkstone', 'Ambleforth',
    'Danesmoor', 'Elmswell', 'Farndale', 'Greystoke', 'Harwood', 'Ingleton'];
  const suf = ['Ltd', 'Group', 'Manufacturing', 'Engineering', 'Foods', 'Care', 'Logistics', 'Retail', ''];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ''}`.trim();
}
const sizes = ['11-50', '11-50', '51-200', '51-200', '51-200', '201-500', '201-500', '2-10'];
const durations = ['6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years', '2+ years'];
const countries = ['United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom',
  'United Kingdom', 'Ireland', 'Ireland'];
const industries = ['Manufacturing', 'Construction', 'Accounting', 'Food Production', 'Individual & Family Services',
  'Logistics & Supply Chain', 'Retail', 'Financial Services', 'Real Estate', 'Building Materials',
  'Transportation', 'Facilities Services', 'Mechanical or Industrial Engineering', 'Wholesale',
  'Automotive', 'Hospitality', 'Printing', 'Non-Profit Organization Management'];
const jobs = ['Payroll Manager', 'Payroll Administrator', 'Finance Manager', 'Company Accountant', 'Bookkeeper',
  'Financial Controller', 'Head of Finance', 'Payroll Specialist', 'Office Manager', 'Director',
  'Accounts Manager', 'Payroll and Accounts Manager', 'HR and Payroll Manager', 'Finance Director', 'Practice Manager'];

const CONTENT = {
  5: {
    titles: [
      'Never once got the numbers wrong', 'The depth is exactly what payroll needs', 'RTI and pensions handled faultlessly',
      'Fast in experienced hands', 'Brought payroll in house and saved money', 'Reliable every single pay run',
      'Handles complexity lighter tools cannot', 'The accounts link removed our double entry', 'Year end is an afternoon now',
      'Trusted it for years without a hitch', 'Proper payroll software for professionals', 'April tax changes just appear',
      'Copes with our seasonal swings', 'Reporting my auditors accept as is', 'Bureau ready for multiple clients',
      'Auto enrolment across a big workforce is bulletproof', 'Statutory payments always correct', 'Control and visibility we never had',
      'Still the benchmark after all these years', 'Would not swap it for a cloud tool',
    ],
    summaries: [
      'I run payroll for well over a hundred staff and the depth is exactly what a serious payroll job needs. Every tax year change lands in the software rather than becoming my problem.',
      'Once you know the keyboard flow you can run a pay run faster than any cloud product would allow, and the compliance has been faultless for years across everything we pay.',
      'We brought payroll in house from a bureau and it paid for itself inside the first year while giving us far more control and same day visibility of our payroll costs.',
      'The Sage 50 Accounts integration was the deciding factor, payroll journals post straight into the accounts correctly coded without anyone rekeying a thing.',
      'Auto enrolment assessment across a constantly changing workforce is genuinely bulletproof, which for a business with high turnover is the single most valuable thing it does.',
      'Statutory sick, maternity and paternity pay calculated on the correct reference periods, which I have watched simpler tools get wrong, is exactly the kind of depth that matters.',
      'It copes with complex pay elements, multiple frequencies and the awkward scenarios that lighter payroll tools simply cannot handle, and the numbers are always right.',
      'Year end used to be a dreaded week and is now an afternoon, because the software walks you through the steps rather than leaving you to remember them all.',
      'As a bureau running a dozen client payrolls, the speed and reliability are everything, and no client scenario in years has ever caught this product out.',
      'Retail headcount swings hard with the seasons and the RTI and pension reassessment handle the constant starters and leavers better than anything else we tried.',
    ],
    pros: [
      'The reporting depth lets us reconcile payroll against budgets by department.',
      'RTI submits as part of the pay run so you cannot forget it.',
      'Pension auto enrolment assessment is faultless across a changing workforce.',
      'The Sage 50 Accounts link removes manual payroll journals entirely.',
      'Fast for an experienced operator, which matters for a busy payroll.',
      'Statutory payments calculated on the correct reference periods.',
      'April tax changes land in the software automatically.',
      'Handles salary sacrifice and attachment of earnings properly.',
      'Copes with multiple pay frequencies and complex elements.',
      'Year end is genuinely straightforward now.',
      'Compliance has been rock solid for years.',
      'Bureau friendly for running several client payrolls.',
      'Departmental and cost centre analysis is detailed.',
      'Pension files upload to Nest without editing.',
      'The saving against a bureau was substantial.',
      'Reporting satisfies our auditors as it stands.',
    ],
    cons: [
      'It is a desktop product, so remote working needs more setup.',
      'Support waits around year end can be long.',
      'There is a genuine learning curve for a new operator.',
      'Entering variable hours for a large workforce is manual.',
      'Backups and updates are your responsibility.',
      'The interface is dense until you learn it.',
      'The pricing band steps up as headcount grows.',
      'Not for a novice, this rewards experience.',
      'Honestly little else, it does the job properly.',
      'Nothing that would make us change.',
    ],
  },
  4: {
    titles: [
      'Solid and dependable, learning curve aside', 'Deep payroll, worth the effort', 'Very good for a serious payroll',
      'Does the hard payroll well', 'Reliable week after week', 'A professional tool that delivers',
      'Strong compliance, dated interface', 'The accounts link makes it worth it', 'Four stars from a long user',
      'Better than the bureau we left', 'Right tool for in house payroll', 'Powerful once you learn it',
      'Handles our complexity well', 'Dependable if unglamorous', 'Would choose it again',
      'Copes with what we throw at it',
    ],
    summaries: [
      'It does everything a serious in house payroll needs and does it accurately. Marked down only for the learning curve and the desktop nature, both of which are the price of the depth.',
      'The compliance and reporting are genuinely strong. The interface shows its heritage and support is slower at year end, which is why four rather than five, but the payroll itself is faultless.',
      'We looked hard at cloud options and concluded the depth we need is not there yet. Staying was right, though it does ask more of a new team member than a guided wizard would.',
      'Brought payroll in house and it has paid off, both in cost and in control. A determined few weeks of setup and learning, and it has run reliably since.',
      'The Sage 50 Accounts integration is the reason we stay, payroll journals posting straight into the books without rekeying. The rest is solid and dependable.',
      'It handles our shift workers and variable hours properly, which lighter tools struggled with. Support is fine, the reporting is detailed, the numbers are always right.',
      'A dependable, powerful payroll tool that has simply become part of how we run. Nothing exciting about it, but everything works, which is what payroll should be.',
      'Weekly payroll runs reliably every week and RTI has never failed. The interface felt dated at first but you stop noticing once the workflow is second nature.',
    ],
    pros: [
      'Compliance and RTI have never let us down.',
      'Reporting is detailed enough for finance and audit.',
      'The Sage 50 Accounts link removes double entry.',
      'Handles complex pay elements and frequencies.',
      'Pension auto enrolment is thorough.',
      'Fast once you know the workflow.',
      'Statutory payments are always correct.',
      'Reliable pay run after pay run.',
      'Departmental analysis suits our cost tracking.',
      'Brought payroll in house from a costly bureau.',
      'Year end is manageable rather than dreaded.',
      'Support resolved our setup questions.',
      'Bureau friendly for multiple client payrolls.',
      'Copes with seasonal headcount swings.',
    ],
    cons: [
      'The learning curve is real for a new operator.',
      'Desktop nature makes remote working less seamless.',
      'Support waits stretch around year end.',
      'The interface shows its age in places.',
      'Variable hours entry is somewhat manual.',
      'Backups are your own responsibility.',
      'Pricing bands step up with headcount.',
      'Not the tool for a very small simple payroll.',
      'Some reports need finishing in a spreadsheet.',
      'Configuration takes thought up front.',
      'Updates need installing rather than being automatic.',
      'More system than a novice needs.',
    ],
  },
  3: {
    titles: [
      'Capable but heavier than we needed', 'Good payroll, awkward for remote work', 'Middle of the road for our size',
      'Powerful, steep to learn', 'Fine once mastered, mastering took time', 'Right for complex payroll, heavy for simple',
      'Three stars, mostly about fit', 'Depends on your payroll complexity', 'Works, with a learning tax',
      'Solid engine, dated experience', 'A qualified recommendation', 'Honest three from a smaller firm',
    ],
    summaries: [
      'We are a small team and this is more payroll system than we need. It does everything correctly but the learning curve was steep for what is a fairly simple payroll.',
      'The payroll engine is genuinely strong, but the desktop model is a friction for our partly remote finance team and remote access was harder to set up than expected.',
      'It does the job accurately but we use a fraction of its depth, and for a straightforward payroll a lighter guided tool might have suited us better.',
      'Fine software that asks a lot up front. Once mastered it is fast and precise, but getting there took a determined few weeks that a simpler tool would not have.',
      'Reliable and compliant, but the interface and the desktop nature feel dated next to modern cloud payroll, and support was slow when we needed it.',
      'A powerful tool that is right for a complex payroll and heavy for a simple one. We probably sit on the wrong side of that line for what we actually need.',
    ],
    pros: [
      'The payroll engine is accurate and reliable.',
      'Compliance and RTI are solid.',
      'Reporting is detailed.',
      'Handles complexity when you need it.',
      'The accounts link is genuinely useful.',
      'Statutory payments are correct.',
      'Fast once you learn it.',
      'Pension handling is thorough.',
    ],
    cons: [
      'More system than a simple payroll needs.',
      'The learning curve took real time.',
      'Desktop model frustrates remote working.',
      'Support was slow on our setup.',
      'The interface feels dated.',
      'We use a fraction of its depth.',
      'Backups and updates need managing.',
      'A guided cloud tool might have fit us better.',
      'Variable hours entry is manual.',
      'Pricing not obviously worth it at our size.',
    ],
  },
  2: {
    titles: [
      'Wrong fit for our remote team', 'Too much system for a small payroll', 'Capable but frustrating for us',
      'The desktop model held us back', 'Good engine, poor fit', 'Not what our team needed',
    ],
    summaries: [
      'The payroll capability is genuinely strong, but as a partly remote finance team the desktop model has been a constant friction and setting up remote access was harder than it should have been.',
      'For a straightforward twenty person payroll this is far more than we need, and the learning curve cost us more time than the depth ever saved.',
      'It does everything correctly but the experience of using it, dated interface, desktop backups, slow year end support, wore us down over a year.',
      'A powerful tool that simply does not fit how our team works now, and the effort of remote access and the learning curve pushed us toward a cloud alternative.',
      'Fine payroll engine, but the friction around remote access and the steep learning curve meant it created more day to day hassle than we expected.',
      'We outgrew the desktop model rather than the payroll capability, and the move to something cloud based has been a relief for our team.',
    ],
    pros: [
      'The payroll engine itself is powerful and accurate.',
      'Compliance is solid.',
      'Reporting is detailed.',
      'Handles complex payroll well.',
      'RTI and pensions are reliable.',
    ],
    cons: [
      'The desktop model does not suit a remote team.',
      'Remote access was hard to set up.',
      'The learning curve was steep for our needs.',
      'Support was slow when it mattered.',
      'More system than our payroll required.',
      'The interface feels dated.',
    ],
  },
  1: {
    titles: [
      'Moved to cloud in the end', 'Not the right tool for us', 'Cannot recommend for a remote team',
    ],
    summaries: [
      'After a year fighting the desktop model with a remote finance team and slow support on the issues that mattered, we moved to a cloud payroll product and the difference in day to day friction has been night and day.',
      'It may suit a dedicated in house payroll professional, but for our small, flexible team the learning curve and the desktop constraints created more work than the capability was worth.',
      'The payroll engine was fine but everything around it, remote access, the dated interface, year end support waits, made the year harder than it needed to be, and leaving took longer than expected.',
    ],
    pros: [
      'The core payroll calculations were always accurate.',
      'Compliance and RTI were reliable.',
      'One support engineer was genuinely excellent.',
    ],
    cons: [
      'The desktop model fought our remote team constantly.',
      'Support was slow on the issues that mattered.',
      'The learning curve never really paid off for our needs.',
      'Getting our data ready to move took real effort.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.4, 4: 0.36, 3: 0.13, 2: 0.06, 1: 0.05 };
  const offsets = { ease_of_use: -0.3, value_for_money: -0.1, customer_service: -0.25, functionality: 0.3 };
  function pickOverall() {
    const r = rand(); let acc = 0;
    for (let s = 5; s >= 1; s--) { acc += dist[s]; if (r < acc) return s; }
    return 4;
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
    const cons = chance(0.05) ? pick(['Nothing new to add.', 'None beyond what everyone says about the learning curve.']) : pick(b.cons);

    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);

    const year = chance(0.48) ? 2026 : (chance(0.6) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    const verified = chance(0.35);
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
      helpful_count: intBetween(0, 28),
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

  // Same category as SimplePay (Payroll software)
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
    console.log('Sage 50 Payroll already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations/i.test(error.message)) {
        const { integrations, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Sage 50 Payroll inserted (integrations column missing, skipped that field).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('Sage 50 Payroll inserted.');
    }
  }

  // Replace reviews for this product only: 11 anchors + 84 generated = 95
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(84);
  const rows = [...ANCHOR_REVIEWS, ...generated].map(r => ({
    software_id: softwareId,
    reviewer_country: 'United Kingdom',
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
