// ============================================================================
// Generator for QuickBooks Online reviews (300 total).
//
// Content is adapted from real-world user feedback: reviewer identities are
// fresh, and every review is assembled from rating-consistent building blocks
// so a 5-star title never lands next to negative cons. Output is written to
// insert_quickbooks_reviews.sql and targets the software slug 'quickbooks-online'.
// ============================================================================

const fs = require('fs');
const path = require('path');

const TARGET_SLUG = 'quickbooks-online';
const TOTAL = 300;

// -- Deterministic RNG so re-runs produce the same file -----------------------
let seed = 20260701;
function rand() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

// -- Reviewer identity pools --------------------------------------------------
const firstNames = [
  'Thandeka', 'Sipho', 'Lerato', 'Johan', 'Anika', 'Pieter', 'Nomvula', 'Riaan',
  'Michelle', 'David', 'Sarah', 'Andrew', 'Bongani', 'Chantelle', 'Naledi', 'Willem',
  'Kabelo', 'Emily', 'Jason', 'Rebecca', 'Tebogo', 'Marius', 'Priya', 'Ashwin',
  'Zanele', 'Grant', 'Lindiwe', 'Ruan', 'Megan', 'Sizwe', 'Carla', 'Themba',
  'Nadia', 'Dumisani', 'Kayla', 'Ntcombi', 'Francois', 'Amahle', 'Devon', 'Yolanda',
  'Keegan', 'Refilwe', 'Simone', 'Tumelo', 'Bianca', 'Musa', 'Charlene', 'Elandri',
  'Jared', 'Palesa', 'Neil', 'Karabo', 'Vanessa', 'Ahmed', 'Fatima', 'Gugu',
  'Hendrik', 'Ilse', 'Katlego', 'Leonie', 'Mpho', 'Owethu', 'Quinton', 'Rethabile',
  'Stefan', 'Tasneem', 'Unathi', 'Vusi', 'Wesley', 'Xolani', 'Yusuf', 'Zaid',
  'Aisha', 'Braam', 'Cindy', 'Dineo', 'Ethan', 'Faith', 'Gareth', 'Heather',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTVWZ'.split('');
const fullSurnames = [
  'Nkosi', 'van der Merwe', 'Botha', 'Dlamini', 'Naidoo', 'Pillay', 'Khumalo',
  'du Toit', 'Mokoena', 'Pretorius', 'Jacobs', 'Ndlovu', 'Fourie', 'Adams',
];

function makeName() {
  const first = pick(firstNames);
  // Mostly "First L." style, occasionally a full surname.
  if (chance(0.22)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}

const industries = [
  'Accounting', 'Construction', 'Retail', 'Non-Profit Organization Management',
  'Real Estate', 'Information Technology and Services', 'Marketing and Advertising',
  'Hospital & Health Care', 'Health, Wellness and Fitness', 'Legal Services',
  'Consumer Services', 'Financial Services', 'Automotive', 'Education Management',
  'Transportation/Trucking/Railroad', 'Hospitality', 'Food & Beverages',
  'Computer Software', 'Management Consulting', 'Wholesale', 'Design',
  'Entertainment', 'Logistics and Supply Chain', 'Facilities Services',
  'Medical Practice', 'Law Practice', 'Alternative Medicine', 'Restaurants',
];
const companySuffix = ['', 'Holdings', 'Pty Ltd', 'Group', 'Consulting', 'Services', '& Associates', 'Solutions'];
const companyStems = [
  'Cape', 'Highveld', 'Sandton', 'Umhlanga', 'Karoo', 'Aloe', 'Protea', 'Sable',
  'Kalahari', 'Drakensberg', 'Tygerberg', 'Vaal', 'Zulu', 'Acacia', 'Marula',
  'Baobab', 'Summit', 'Anchor', 'Meridian', 'Northgate', 'Silverline', 'Bluewater',
];
function makeCompany() {
  if (chance(0.18)) return null; // some reviewers leave company blank
  const s = pick(companySuffix);
  return `${pick(companyStems)}${s ? ' ' + s : ' Trading'}`.trim();
}

const jobsByBucket = {
  common: [
    'Owner', 'Office Manager', 'Bookkeeper', 'Accountant', 'Director', 'CEO',
    'Controller', 'Administrator', 'Founder', 'Operations Manager', 'CFO',
    'Managing Director', 'Finance Manager', 'Admin Assistant', 'Practice Manager',
    'General Manager', 'Accounting Specialist', 'President', 'Project Manager',
    'HR Manager', 'Executive Director', 'Bookkeeping Firm Owner', 'Partner',
  ],
};
const sizes = ['2-10', '11-50', '51-200', '1', '201-500'];
const durations = ['Less than 6 months', '6-12 months', '1-2 years', '2+ years'];
const countries = ['South Africa', 'South Africa', 'South Africa', 'Namibia', 'Botswana', 'United Kingdom'];

// -- Rating-consistent content blocks (adapted from real user feedback) -------
// Each bucket key is the overall star rating.
const content = {
  5: {
    titles: [
      'Intuitive and approachable', 'Best accounting software for our business',
      'Great product, easy to use', 'Runs my firm and most of my clients books',
      'QuickBooks Online will always be number one', 'Excellent product for small business',
      'One place for all things business', 'Powerful software but easy to use',
      'Great for small business accounting', 'Handy tool I use daily',
      'Easy invoicing and reliable reporting', 'A must have for small business owners',
      'Seeing the whole picture easily', 'Great value for the features',
      'Solid cloud accounting for our team', 'The right solution for a mobile business',
      'Time saver during tax season', 'Love the accessibility',
      'Reliable and easy to use', 'Great software for bookkeepers and owners',
    ],
    summaries: [
      'Our team has benefited greatly from having all financial institutions, reporting and analysis in one easy to use hub. It is intuitive and the interface is friendly for first time users as well as our experienced accountants.',
      'I love QuickBooks and use it every day for the business. I have tried others over the years and always come back to QuickBooks.',
      'It makes it easy to manage business finances in one place, from tracking expenses and income to sending invoices and running reports. Being able to log in from anywhere helps me stay on top of things.',
      'I run my firm on it and put most new clients on it. It is not flashy and it is not perfect, but it handles the day to day books for me and my clients really well.',
      'From onboarding our data to using the system every day, we have been amazed at the ease of this program and could not be happier.',
      'Overall my experience has been excellent. From setup to daily use the platform is intuitive and well designed. It has significantly simplified my bookkeeping, saving time and reducing errors.',
      'A reliable, cloud based accounting system that handles core functions like invoicing, payments and bank reconciliation efficiently. The real time visibility into financials makes day to day work much more manageable.',
      'It is quick to add every record to just one app, and you can access records from years ago by date. It helped me a lot during tax season.',
      'We use it daily for all the accounting within the company, including payroll. The cost is economical for the amount we use it for.',
      'It has been a great experience. Everything I need is there at my fingertips and the reporting saves me so much time.',
    ],
    pros: [
      'User friendly and easy to use. The financial and operational reporting is robust and used constantly. Invoicing and receiving payments is simple and QuickBooks matches payments automatically.',
      'The direct bank and credit card feeds drastically reduce manual entry. Once rules are set, categorisation becomes semi automated and reconciliations move from a tedious task to something you maintain continuously.',
      'Cloud based accessibility is fantastic because I can manage my books from my desktop, tablet or phone anywhere with internet.',
      'The ability to snap receipt photos on the go and then match them to bank transactions is excellent, and the financial records are easy to find.',
      'Everything is in one place. It is simple to track income and expenses, send invoices and pull reports without a lot of extra steps.',
      'The invoicing feature is professional, customisable and quick to send. Financial reporting is thorough yet easy to understand.',
      'Real time collaboration means multiple users can work in the file at the same time, and the integration ecosystem connects easily with payroll and payment processors.',
      'It condenses good data into one spot, it is clean looking and helps a lot with payroll.',
      'Strong reporting. You can generate a Profit and Loss, Balance Sheet and Cash Flow in seconds, which is helpful when preparing for audits.',
      'Automation features like recurring invoices and auto categorisation save a ton of time, and the dashboard gives a clear snapshot of cash flow.',
      'It integrates seamlessly with our other business tools and keeps our books clean at year end.',
      'The mobile app lets me handle any invoicing need no matter where I am, and the value per rand is the best of any software we use.',
    ],
    cons: [
      'Certain tasks are hidden behind multiple levels of menus, so it helps to know exactly what you are looking for.',
      'There was a small learning curve at the beginning, but that is normal with any new platform.',
      'It can get a bit pricey over time and some features are only unlocked in higher tiers.',
      'Too many prompts when printing. Printing an invoice takes a few more clicks than it should.',
      'The interface changes now and then and it takes a little time to relearn where things are.',
      'Reports could offer a little more customisation without needing to export to a spreadsheet.',
      'Honestly not much. It does everything I need and they keep improving it.',
      'Occasionally the platform feels slightly slow to load during peak times.',
      'Some of the more advanced features take a little time to discover.',
      'I wish payroll was included rather than being a separate add on.',
    ],
  },
  4: {
    titles: [
      'Great product value for the price', 'Good value for the features and cost',
      'Powerful tool for small business', 'Reliable accounting software',
      'User friendly and does what it says', 'Great for beginners',
      'Easy to learn, robust enough for us', 'Solid choice for small business accounting',
      'Great all round accounting tool', 'Mixed bag but worth it',
      'Good suite of features, easy to use', 'Necessary product for the business',
      'Efficient and user friendly financial management', 'Strong remote access and support',
      'Longtime QuickBooks user', 'QuickBooks online works well for us',
      'Decent product, pricing could be better', 'Good platform for small businesses',
    ],
    summaries: [
      'Overall my experience has been positive. It is a reliable cloud based system that handles invoicing, payments and bank reconciliation efficiently, though I would like more reporting flexibility.',
      'My overall experience has been positive and it definitely accomplishes what I need for the money.',
      'Once you get past the initial learning curve and understand how everything works together, it becomes as powerful a tool as any business can get.',
      'It is a practical, reliable accounting tool that handles the core financial basics well without too much effort to maintain.',
      'Overall its been an ok product. The ease of use for beginners is something I would recommend as a starter product.',
      'It is a mixed bag; they change the software a lot, but their customer service is good and the ease of generating invoices and accepting payments outweighs the headaches.',
      'Good value for money against competitors, and generally easy to use. Invoices are easy to send and customise.',
      'QuickBooks Online has consistently delivered positive results for my business, and the invoicing system is user friendly for my clients.',
      'It helps us stay organised, track our finances and generate the reports we need, with a bit of a learning curve at the start.',
      'It is a useful tool for managing invoices, expenses, payments and reports and reduces manual paperwork.',
    ],
    pros: [
      'The bank feeds reduce manual entry and once rules are dialled in, categorisation becomes semi automated. Reconciliations move from a tedious monthly task to something you can maintain continuously.',
      'Value for money and ease of use. The invoicing is straightforward and I can navigate around the interface without much training.',
      'It integrates with our project management software and easily transfers data back and forth, which has reduced double entry and saved a lot of time.',
      'Cloud access from any device is the main reason we went with it, and reports are easy to run and export.',
      'The dashboard is functional and intuitive, and I can find most of what I need on the front page.',
      'It is relatively easy to learn and use, and there are plenty of online resources and videos to help.',
      'The financial reporting is consistent over the years, making historical reporting fairly simple.',
      'Being able to give my accountant access has been great and makes tax time much easier.',
      'It keeps all data organised in one place and lets me track income, expenses and payments in real time.',
      'Easy invoicing, bank feeds and expense tracking help keep our business organised and save us time each month.',
    ],
    cons: [
      'The constant changes to menus and layouts are frustrating. Features move without warning, which disrupts workflows.',
      'The pricing keeps increasing and the add ons make it more expensive as the business grows.',
      'Customer support can be hard to reach and does not always resolve complex issues quickly.',
      'The reporting is limited compared to the desktop version and often needs exporting to a spreadsheet.',
      'The bank feed occasionally disconnects or matches to the wrong transaction, which slows down reconciliation.',
      'There is a learning curve setting up advanced features and reports.',
      'Some job costing and inventory features could be more flexible for the way we work.',
      'The app is not fully in line with the desktop website and some functions are missing.',
      'It can feel a bit cluttered once you get deeper into reporting and reconciliation.',
      'The occasional glitch with credit card batch transactions can be tricky to fix.',
    ],
  },
  3: {
    titles: [
      'QuickBooks Online, ease of use vs cost', 'Simple, reliable but covers only the basics',
      'Okay, but not great', 'Good for small teams', 'Honest take on QBO',
      'Overall a decent software', 'Useful but not intuitive', 'Decent product',
      'Pros and cons', 'Good software for a smaller business', 'A fair review of QBO',
      'Too complex for non financial users', 'Necessary but often frustrating',
    ],
    summaries: [
      'Overall the tool has increased productivity, mainly through automated transaction imports. Otherwise it is a fairly pricey tool compared to the desktop version.',
      'It is a practical, reliable tool that handles the core basics, but it can become more complex as you move into deeper functions or larger datasets.',
      'When first developed it was strong. Lately the added AI in every window slows down the overall performance and speed of the platform.',
      'It is great for small businesses or teams without a dedicated finance person, and brings good value for what it costs, but it is limited for project based work.',
      'It has been ok. The cost goes up every year and the software is not getting better at the same pace.',
      'The software is fine for everyday bookkeeping, but customer support is inconsistent and some reports are hard to configure.',
      'Overall it is a good software for smaller businesses, but the larger the business the more issues we ran into.',
    ],
    pros: [
      'The ability to import transactions and reconcile accounts is generally a clean process.',
      'I like the invoice side quite a bit; the input and output of journal entries and transactions is pretty good.',
      'It is web based so reports are easy to run and export, and paying bills is user friendly.',
      'The user interface is easy on the eyes, there are many kinds of reports and invoices can be made from timesheets.',
      'Cloud access from anywhere and the ability to share with an accountant are the strongest points.',
      'It is adequate financial software for a small entity and can sync bank and credit card accounts.',
    ],
    cons: [
      'Navigation is messy. There is no one click option for many daily activities, so entering and paying bills is multiple clicks away.',
      'Too many pop ups and upsell prompts clutter the screen and there is no easy way to switch them off.',
      'Customer support is a weak spot; agents often know less about the product than the end user.',
      'The reports lack the customisation and formatting of the desktop version.',
      'It can feel glitchy and slow at times considering the price, and the cost keeps rising each year.',
      'The self employed tier is very limited on features and customisation.',
    ],
  },
  2: {
    titles: [
      'Powerful but held back by support and reliability', 'Not as expected',
      'QuickBooks can afford to do a bit better', 'Frustrating at times',
      'Necessary but frustrating', 'Good until it wasnt', 'I give up on QuickBooks online',
      'A step down from desktop',
    ],
    summaries: [
      'It provides the core accounting functions I need, but recurring connection issues, occasional glitches and poor support create unnecessary work. The platform works, but it feels like paying more every year without meaningful improvements.',
      'Severely disappointed knowing the strength of the desktop version. Everything feels restrictive and limited compared to what I was used to.',
      'It is frustrating because I use it all day and there are still features missing that I have asked about for a long time.',
      'When it is running smoothly it does make bookkeeping more convenient, but it has caused me to lose hours resolving glitches.',
      'It does the job but the reports do not do much for us; the desktop version had far better report options.',
    ],
    pros: [
      'It is widely accepted by accountants and integrates with many third party platforms, and it offers a solid set of core accounting features.',
      'Multiple people can access the accounting information regardless of location, and it is reasonably priced compared to the desktop version.',
      'The user interface is simple, it works consistently and there are many kinds of reports available.',
      'The sync with the bank for transactions is useful and it can be accessed from anywhere.',
    ],
    cons: [
      'Bank and credit card accounts frequently disconnect for no apparent reason and reconnecting them is time consuming and frustrating.',
      'Customer support is difficult to reach, gives inconsistent answers and rarely resolves technical issues quickly.',
      'The reports are limited and hard to customise, and support staff often do not know how to help.',
      'The scanning and auto review of receipts is poor, so I have to manually update amount, date and category even for repeat vendors.',
      'The platform feels surprisingly buggy at times considering its market position and price.',
    ],
  },
  1: {
    titles: [
      'Always have to upgrade to get service', 'An AI nightmare',
      'New interface makes it hard to use', 'The worst customer service experience',
      'Avoid until support improves', 'Buggy software and high pressure sales',
      'No real customer support', 'Too expensive for what it delivers',
      'I want my screen back',
    ],
    summaries: [
      'No matter what package we have or how many upgrades we do, we have to pay more to get any help. My time is valuable and every call turns into a sales pitch.',
      'After several days I finally reached a human and somehow the support got worse. Slow responses promise the issue is being reviewed, but nothing is ever fixed.',
      'The newest interface is glitchy and slow. A one minute process now takes several minutes, and everything involves pop up windows and side bars that push the working area off the screen.',
      'I have had issue after issue and nothing gets resolved. Getting a straight answer from support is almost impossible.',
      'The price increases are ridiculous and the constant upselling inside the app is exhausting. I just want to enter my bills and payments.',
    ],
    pros: [
      'The convenience of accessing it from anywhere is about the only positive I can point to.',
      'The bank sync for transactions is okay, and receipt snap works when it wants to.',
      'The Profit and Loss report format and drill down are helpful.',
      'It is a widely used product, so third party support is fairly easy to find.',
    ],
    cons: [
      'You cannot get help until you upgrade the upgrade you already upgraded, and every interaction costs more money.',
      'Customer support is an AI chat that is close to useless, and several transactions were lost when I upgraded devices.',
      'The relentless upselling and advertising clutters the screen and wastes time every single time I log in.',
      'The price keeps rising with no visible benefit and the software feels buggier than it should for the cost.',
      'Bank and credit card accounts disconnect constantly and reconnecting them is a nightmare.',
    ],
  },
};

// Rating distribution roughly matching a ~4.3 average product.
function pickOverall() {
  const r = rand();
  if (r < 0.52) return 5;
  if (r < 0.80) return 4;
  if (r < 0.90) return 3;
  if (r < 0.955) return 2;
  return 1;
}
// Each category has its own tendency so the four averages come out distinct
// and characteristic (QuickBooks: easy and capable, but weaker on support and
// value), instead of every category collapsing to the same number.
const CATEGORY_OFFSET = {
  ease_of_use: 0.2,
  value_for_money: -0.35,
  customer_service: -0.55,
  functionality: 0.15,
};
// Sub-rating drifts around (overall + category tendency), clamped 1..5.
function subRating(overall, category) {
  const off = CATEGORY_OFFSET[category] || 0;
  let v = Math.round(overall + off + (rand() * 1.7 - 0.85));
  if (v > 5) v = 5;
  if (v < 1) v = 1;
  return v;
}

function makeDate() {
  const year = chance(0.62) ? 2026 : 2025;
  const maxMonth = year === 2026 ? 6 : 12;
  const month = intBetween(1, maxMonth);
  const day = intBetween(1, 28);
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

// -- Build the review set -----------------------------------------------------
function buildReviews() {
  seed = 20260701; // reset RNG so SQL and DB loads stay identical
  const reviews = [];
  const usedFingerprints = new Set();

  let guard = 0;
  while (reviews.length < TOTAL && guard < TOTAL * 40) {
    guard++;
    const overall = pickOverall();
    const bucket = content[overall];

    const title = pick(bucket.titles);
    const summary = pick(bucket.summaries);
    const pros = pick(bucket.pros);
    const cons = pick(bucket.cons);

    // Avoid exact duplicate title+pros+cons combinations.
    const fp = `${title}|${pros}|${cons}`;
    if (usedFingerprints.has(fp)) continue;
    usedFingerprints.add(fp);

    reviews.push({
    reviewer_name: makeName(),
    reviewer_job_title: pick(jobsByBucket.common),
    reviewer_company: makeCompany(),
    reviewer_industry: pick(industries),
    reviewer_company_size: pick(sizes),
    reviewer_country: pick(countries),
    verified_linkedin: chance(0.4),
    verified_badge: chance(0.4) ? 'Verified LinkedIn User' : null,
    used_for_duration: pick(durations),
    overall_rating: overall,
    ease_of_use: subRating(overall, 'ease_of_use'),
    value_for_money: subRating(overall, 'value_for_money'),
    customer_service: subRating(overall, 'customer_service'),
    functionality: subRating(overall, 'functionality'),
    review_title: title,
    summary: summary,
    pros: pros,
    cons: cons,
    vendor_response: null,
    vendor_response_date: null,
    review_date: makeDate(),
    helpful_count: intBetween(0, 26),
    });
  }
  return reviews;
}

module.exports = { buildReviews, TARGET_SLUG, TOTAL };

// -- Emit SQL (only when run directly) ---------------------------------------
function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return `$q$${str}$q$`;
}

function writeSqlFile() {
  const reviews = buildReviews();

  let sql = `-- ============================================================================
-- SQL Seed File for QuickBooks Online Reviews (${reviews.length} Total Reviews)
-- Targets the software ID via subquery on slug '${TARGET_SLUG}'.
-- Removes any existing reviews for this software first to avoid duplicates.
-- ============================================================================

BEGIN;

DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = '${TARGET_SLUG}');

INSERT INTO reviews (
  software_id,
  reviewer_name,
  reviewer_job_title,
  reviewer_company,
  reviewer_industry,
  reviewer_company_size,
  reviewer_country,
  verified_linkedin,
  verified_badge,
  used_for_duration,
  overall_rating,
  ease_of_use,
  value_for_money,
  customer_service,
  functionality,
  review_title,
  summary,
  pros,
  cons,
  vendor_response,
  vendor_response_date,
  review_date,
  helpful_count,
  status
) VALUES
`;

const rows = reviews.map(r => `(
  (SELECT id FROM software WHERE slug = '${TARGET_SLUG}'),
  ${esc(r.reviewer_name)},
  ${esc(r.reviewer_job_title)},
  ${esc(r.reviewer_company)},
  ${esc(r.reviewer_industry)},
  ${esc(r.reviewer_company_size)},
  ${esc(r.reviewer_country)},
  ${r.verified_linkedin},
  ${esc(r.verified_badge)},
  ${esc(r.used_for_duration)},
  ${r.overall_rating},
  ${r.ease_of_use},
  ${r.value_for_money},
  ${r.customer_service},
  ${r.functionality},
  ${esc(r.review_title)},
  ${esc(r.summary)},
  ${esc(r.pros)},
  ${esc(r.cons)},
  ${esc(r.vendor_response)},
  ${esc(r.vendor_response_date)},
  ${esc(r.review_date)},
  ${r.helpful_count},
  'published'
)`);

  sql += rows.join(',\n') + ';\n\nCOMMIT;\n';

  fs.writeFileSync(path.join(__dirname, 'insert_quickbooks_reviews.sql'), sql, 'utf-8');
  console.log(`Generated ${reviews.length} QuickBooks Online reviews in insert_quickbooks_reviews.sql`);
}

if (require.main === module) {
  writeSqlFile();
}
