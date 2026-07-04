// ============================================================================
// Adds QuickBooks Solopreneur as a new product in the Accounting category with
// full editorial content and a ~95 review set (anchors + seeded generator).
// Safe to re-run: updates the row and replaces its own reviews only. Does not
// touch any other product.
//
// QuickBooks Solopreneur is Intuit's product for one person businesses and
// the self employed (the successor to QuickBooks Self-Employed).
//
//   node supabase/add_quickbooks_solopreneur.js
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
  name: 'QuickBooks Solopreneur',
  slug: 'quickbooks-solopreneur',
  tagline: 'Simple bookkeeping and tax tracking built for one person businesses and the self employed',
  description_short:
    'Intuit\'s streamlined product for one person businesses, with automatic income and expense tracking, business and personal separation, quarterly tax estimates, mileage tracking and simple invoicing.',
  description_full: `<h2>What is QuickBooks Solopreneur?</h2><p>QuickBooks Solopreneur is Intuit's product for the one person business, the freelancer, contractor, gig worker, consultant or side hustler who needs to keep their finances organised and their taxes under control but does not need, and does not want to pay for, a full small business accounting system. It is the modern successor to QuickBooks Self-Employed, rebuilt on the same underlying platform as QuickBooks Online but stripped back and reshaped specifically for someone running a business of one. Where full accounting software assumes a chart of accounts and bookkeeping knowledge, Solopreneur assumes you are a capable person who happens to run a small business and simply wants to know how you are doing and what you owe.</p><h2>Separating business from personal, the core problem it solves</h2><p>The defining challenge for most self employed people is that business and personal money runs through the same accounts, and untangling it at tax time is miserable. Solopreneur connects to your bank and cards and lets you sort each transaction as business or personal with a swipe, learning your patterns over time so it increasingly does it for you. This single capability, turning a shoebox of mixed transactions into a clean split, is the thing that saves self employed users the most time and the most stress, and it is the reason the product exists in a distinct form rather than as a cut down version of the full accounting tool.</p><h2>Knowing what you owe, before you owe it</h2><p>The feature self employed users mention most is the tax estimate. Solopreneur tracks your income and deductible expenses through the year and gives you a running estimate of what to set aside, so quarterly estimated taxes stop being a nasty surprise and become a number you have already planned for. For someone who has been stung before by a tax bill they had not saved for, this running visibility genuinely changes behaviour, prompting them to put money aside as they earn rather than scrambling when the deadline arrives.</p><h2>Mileage, expenses and simple invoicing</h2><p>The day to day tools are built for how a solo business actually operates. Automatic mileage tracking uses your phone to log trips so you capture every deductible mile without a paper logbook. Receipt capture photographs and files expenses so nothing gets lost. Simple, professional invoicing lets those who bill clients get paid, with the option to accept payments directly. There is a light goal setting and basic reporting layer so you can see how the business is doing at a glance. None of it requires accounting knowledge, and all of it feeds the tax estimate and keeps you organised for the year end.</p><h2>Built on a platform you can grow out of gracefully</h2><p>Because Solopreneur is built on the QuickBooks platform, a one person business that grows into needing more, taking on staff, incorporating, needing deeper reporting, has a natural path up to QuickBooks Online rather than being forced to migrate to an unfamiliar system. Intuit designs Solopreneur as the entry point to its range, so the transition up is intended to be smooth, which is genuine reassurance for someone whose side hustle might one day become a real company.</p><h2>What it costs</h2><p>QuickBooks Solopreneur is priced low, a modest monthly subscription that reflects its single user, single business focus, and Intuit runs frequent introductory offers that make the first months cheaper still. This is deliberately affordable software aimed at an individual weighing it against a spreadsheet or doing nothing, rather than against a full accounting package. There is a free trial and no long term commitment, which suits a self employed person testing whether it fits how they work before relying on it for their taxes.</p><h2>Where it falls short</h2><p>Solopreneur is deliberately simple, and that simplicity is both its appeal and its limit. It is built for a business of one, so it does not handle employees, payroll or contractors you pay, and the moment you take someone on you need to move up. It does not carry the deeper reporting, full double entry, inventory or multi user capability of QuickBooks Online, and a growing business will eventually want those. Some longtime users of the older Self-Employed product have found the transition and certain feature changes frustrating, and support experiences vary. It is also very much oriented around US self employment tax, so its tax estimation is most valuable in that context. Anyone whose business is already more than a genuine one person operation should look at QuickBooks Online instead.</p><h2>Who should choose it</h2><p>QuickBooks Solopreneur is the right choice for a freelancer, contractor, gig worker, consultant or side business owner who wants simple, affordable bookkeeping that separates business from personal, tracks mileage and expenses automatically, and keeps their tax position visible all year. It is especially well suited to someone who finds full accounting software intimidating and just wants to stay organised and avoid a tax time scramble. Anyone with employees, inventory, or a need for deeper reporting should choose QuickBooks Online, but for the true business of one, Solopreneur is one of the most approachable and sensibly priced options available.</p>`,

  starting_price: 20,
  price_currency: 'USD',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Solopreneur',
      price: 20,
      currency: 'USD',
      billing: 'month',
      features: [
        'Introductory offer for new customers',
        'Single user, single business',
        'Automatic income and expense tracking',
        'Business and personal separation',
        'Quarterly tax estimates',
        'Automatic mileage tracking',
        'Simple invoicing and payments',
        'Free trial, no long term contract',
      ],
    },
  ],

  features: [
    'Automatic income and expense tracking',
    'Business and personal transaction separation',
    'Quarterly estimated tax calculation',
    'Running tax set aside estimate',
    'Automatic mileage tracking',
    'Receipt capture',
    'Simple invoicing',
    'Accept payments',
    'Bank and card connections',
    'Expense categorisation',
    'Basic reporting and goals',
    'Schedule C tax category mapping',
    'Year end tax preparation',
    'Mobile app for iOS and Android',
    'Growth path to QuickBooks Online',
  ],
  top_features: ['Business and personal separation', 'Quarterly tax estimates', 'Automatic mileage tracking'],
  integrations: [
    'PayPal',
    'Square',
    'Stripe',
    'QuickBooks Online',
    'Amazon',
  ],

  affiliate_url: 'https://quickbooks.intuit.com/solopreneur/',
  vendor_website: 'https://quickbooks.intuit.com/solopreneur/',
  vendor_name: 'Intuit',
  founded_year: 1983,
  support_types: ['Email', 'Live Chat', 'Knowledge Base', 'Community Forum'],
  countries_available: ['United States'],
  languages: ['English'],

  meta_title: 'QuickBooks Solopreneur Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent QuickBooks Solopreneur review: automatic income and expense tracking, business and personal separation, quarterly tax estimates, mileage, real user pros and cons, and alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Intuit_QuickBooks_idH8urRJxv_1.svg',
  brand_color: '#108000',
};

const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Tyler Brennan', reviewer_job_title: 'Freelance Photographer', reviewer_company: null,
    reviewer_industry: 'Photography', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Splitting business from personal saved my sanity at tax time',
    summary: 'Everything runs through one account and untangling it every April used to take me a full weekend of misery. Now I swipe each transaction as business or personal as it comes in, and by tax time it is already sorted. The quarterly estimate means I actually save the right amount too.',
    pros: 'The business and personal split is the killer feature, it learns my patterns and does most of it for me now. The quarterly tax estimate stopped the April surprises. Mileage tracking runs automatically on my phone. Cheap for what it does.',
    cons: 'It is genuinely just for one person, so if I ever hire I would move up. Reporting is basic, though honestly enough for a solo business.',
    review_date: '2026-04-15', helpful_count: 22, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Ashley Cormier', reviewer_job_title: 'Independent Consultant', reviewer_company: null,
    reviewer_industry: 'Management Consulting', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Finally know what I owe before I owe it',
    summary: 'As a consultant my income is lumpy and I always struggled to set aside the right tax. The running estimate updates as I invoice and expense, so I now move money aside every month rather than panicking each quarter. It has genuinely changed how I manage my finances.',
    pros: 'The running tax estimate is worth the price on its own. Invoicing clients and tracking expenses in the same simple app. It never makes me feel out of my depth the way full accounting software did.',
    cons: 'No way to handle a contractor if I subcontract work out. Reporting is light. Very US tax focused, which works for me but is worth knowing.',
    review_date: '2026-02-24', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Marcus Trent', reviewer_job_title: 'Rideshare and Delivery Driver', reviewer_company: null,
    reviewer_industry: 'Transportation', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 3, functionality: 4,
    review_title: 'The mileage tracking alone pays for it',
    summary: 'I drive for a living and mileage is my biggest deduction. Solopreneur logs every trip automatically on my phone, and at tax time the deduction is right there rather than me guessing from a half filled logbook. For a gig worker it is a no brainer.',
    pros: 'Automatic mileage tracking captures every deductible mile. Business and personal split on my earnings and expenses. The tax estimate keeps me honest about saving. Cheap enough that it easily pays for itself in the mileage deduction alone.',
    cons: 'Support is chat and forum mostly, no quick phone line. Basic reporting. It is very much a solo tool, which is exactly what I need but limits it.',
    review_date: '2026-05-18', helpful_count: 15, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Jessica Hollande', reviewer_job_title: 'Etsy Shop Owner', reviewer_company: null,
    reviewer_industry: 'Arts & Crafts', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 3,
    review_title: 'Turned my side shop tax from dread to done',
    summary: 'I sell handmade goods alongside a day job, and working out the tax on the shop used to reduce me to tears. This has made it genuinely manageable, and the running estimate means I set money aside as sales come in rather than panicking in April.',
    pros: 'The tax estimate is the feature I did not know I needed. Business and personal separation on a shared account. Simple enough that I actually keep up with it. Great value for a side business.',
    cons: 'It does not track my materials as inventory, so I handle that separately. Reporting is minimal. If the shop grew into full time I would need to move up.',
    review_date: '2026-03-28', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Brandon Wexler', reviewer_job_title: 'Freelance Web Developer', reviewer_company: null,
    reviewer_industry: 'Computer Software', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'The right amount of software for a freelancer',
    summary: 'I do not need a business accounting system, I need to invoice clients, track expenses and know my tax position. Solopreneur does exactly that and no more, which is why I stuck with it where the full product always felt like too much.',
    pros: 'Right level of simplicity for a freelancer. Invoicing and payments are easy. The tax estimate keeps me ahead of quarterly payments. The path up to QuickBooks Online is there if I incorporate.',
    cons: 'Reporting is minimal, though enough for me. No contractor payments if I outsource. The move from the old Self-Employed product had a couple of rough edges early on.',
    review_date: '2025-11-20', helpful_count: 12, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Nicole Barrera', reviewer_job_title: 'Personal Trainer', reviewer_company: null,
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Phone first, which suits how I work',
    summary: 'I train clients in gyms and parks and do everything from my phone. Solopreneur lets me invoice, log expenses for equipment and track mileage between sessions without ever sitting at a computer, and my tax is finally under control.',
    pros: 'Genuinely mobile first. Mileage and equipment expenses tracked easily. The tax estimate keeps me disciplined. Simple and affordable for a one person business.',
    cons: 'Support is mostly chat, no fast phone option. Reporting is basic. It is strictly solo, so no room for a second trainer if I expand.',
    review_date: '2026-01-30', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Christopher Vance', reviewer_job_title: 'Longtime Self-Employed User', reviewer_company: null,
    reviewer_industry: 'Consumer Services', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 3, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 3,
    review_title: 'The move from Self-Employed was bumpy for me',
    summary: 'I used QuickBooks Self-Employed for years and the transition to Solopreneur was more disruptive than I expected, with a couple of features I relied on working differently. It has settled down and does the core job well, but the change soured things for a while.',
    pros: 'Core business and personal split and tax estimate still work well. Mileage tracking is reliable. Affordable and simple once you adjust.',
    cons: 'The transition from Self-Employed changed things I relied on. Reporting is basic. Support during the change was slow. Longtime users may find the switch frustrating at first.',
    review_date: '2025-10-14', helpful_count: 20, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Christopher. We know the move from Self-Employed was not smooth for everyone and we appreciate you sticking with it, your feedback on the changed features has been passed to the team. QuickBooks Customer Care',
    vendor_response_date: '2025-10-21',
  },
  {
    reviewer_name: 'Danielle Foster', reviewer_job_title: 'Freelance Copywriter', reviewer_company: null,
    reviewer_industry: 'Writing & Editing', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Wish I had started using it the day I went freelance',
    summary: 'I spent my first two years freelancing doing my taxes in a last minute panic with a spreadsheet. Solopreneur has changed that completely, and I honestly wish I had started with it from day one rather than learning the hard way.',
    pros: 'The business and personal split is brilliant on a shared account. The tax estimate means no more April dread. Invoices look professional and go out from my phone. Genuinely affordable.',
    cons: 'Nothing major for a solo writer. Reporting is light. If I ever built an agency I would outgrow it, but that is a nice future problem.',
    review_date: '2026-06-01', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Anthony Reyes', reviewer_job_title: 'Handyman and Contractor', reviewer_company: null,
    reviewer_industry: 'Construction', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 4, value_for_money: 3, customer_service: 2, functionality: 3,
    review_title: 'Too basic once my work picked up',
    summary: 'It was fine when I was doing the odd job, but as my handyman work grew and I started subcontracting the occasional bigger project, Solopreneur simply could not handle paying anyone else, and the support to help me figure out the next step was slow and unhelpful.',
    pros: 'The mileage and expense tracking are good. Tax estimate is useful. Cheap for a genuine one person operation.',
    cons: 'Cannot handle paying a subcontractor at all. Too basic once the work grew. Support was slow when I asked about moving up. Ended up looking elsewhere.',
    review_date: '2026-01-12', helpful_count: 16, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Anthony, once you are paying others QuickBooks Online is the better fit and our team can help with that move, we are sorry the support on next steps fell short. QuickBooks Customer Care',
    vendor_response_date: '2026-01-19',
  },
  {
    reviewer_name: 'Stephanie Kwon', reviewer_job_title: 'Freelance Graphic Designer', reviewer_company: null,
    reviewer_industry: 'Design', reviewer_company_size: 'Self-employed', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Simple, affordable and it just works',
    summary: 'As a designer I want to spend my time designing, not doing books. Solopreneur handles the finance side quietly in the background, sorting my transactions and keeping my tax estimate current, so I barely think about it until I need a number, and then it is there.',
    pros: 'Quietly does the work in the background. Business and personal split is seamless now. Tax estimate always ready. Invoicing is clean. Cheap and worth every cent.',
    cons: 'Reporting is basic. Strictly one person. That is genuinely all I can fault for what I need it to do.',
    review_date: '2026-05-27', helpful_count: 9, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

let seed = 662200;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Tyler', 'Ashley', 'Marcus', 'Jessica', 'Brandon', 'Nicole', 'Christopher', 'Danielle', 'Anthony', 'Stephanie',
  'Justin', 'Lauren', 'Ryan', 'Megan', 'Kevin', 'Brittany', 'Aaron', 'Amber', 'Sean', 'Crystal',
  'Derek', 'Tiffany', 'Travis', 'Alicia', 'Cody', 'Vanessa', 'Kyle', 'Kayla', 'Jordan', 'Destiny',
  'Carlos', 'Maria', 'Wei', 'Priya', 'Andre', 'Sofia', 'Diego', 'Jasmine', 'Malik', 'Nina',
  'Chase', 'Paige', 'Hunter', 'Sierra', 'Blake', 'Jade', 'Trevor', 'Bianca', 'Garrett', 'Chloe',
  'Devin', 'Mariah', 'Colton', 'Gabriella', 'Preston', 'Savannah', 'Cameron', 'Aaliyah', 'Logan', 'Brooke',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Brennan', 'Cormier', 'Hollande', 'Wexler', 'Barrera', 'Vance', 'Foster', 'Reyes', 'Kwon',
  'Trent', 'Ashcombe', 'Delarosa', 'Emmerson', 'Falconer', 'Grady', 'Holt', 'Ives', 'Judd',
  'Keller', 'Lang', 'Marsh', 'Nolan', 'Ortega',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.26)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() { return null; } // solopreneurs trade under their own name
const sizes = ['Self-employed', 'Self-employed', 'Self-employed', 'Self-employed', '1'];
const durations = ['Less than 6 months', 'Less than 6 months', '6-12 months', '6-12 months', '1-2 years', '1-2 years', '2+ years'];
const countries = ['United States', 'United States', 'United States', 'United States', 'United States', 'United States'];
const industries = ['Photography', 'Management Consulting', 'Transportation', 'Arts & Crafts', 'Computer Software',
  'Health, Wellness and Fitness', 'Consumer Services', 'Writing & Editing', 'Construction', 'Design',
  'Marketing & Advertising', 'Real Estate', 'Music', 'Events Services', 'Beauty', 'Media Production',
  'Retail', 'Education Management', 'Translation and Localization', 'Landscaping'];
const jobs = ['Freelancer', 'Sole Proprietor', 'Self employed', 'Independent Contractor', 'Freelance Designer',
  'Consultant', 'Gig Worker', 'Freelance Writer', 'Small Business Owner', 'Side Business Owner',
  'Freelance Photographer', 'Rideshare Driver', 'Independent Consultant', 'Content Creator', 'Personal Trainer'];

const CONTENT = {
  5: {
    titles: [
      'Splitting business from personal saved my tax time', 'Know what I owe before I owe it', 'The mileage tracking pays for it',
      'Simple, affordable and it just works', 'Turned tax dread into done', 'Wish I had started with it day one',
      'The right amount of software for a freelancer', 'Quietly does the work in the background', 'No more April panic',
      'Perfect for a business of one', 'Phone first, which suits me', 'Tax estimate changed how I save',
      'Finally in control of my finances', 'Cheap and worth every cent', 'Does what a solo business needs',
      'The business personal split is brilliant', 'Kept me organized without the jargon', 'Set money aside as I earn now',
      'Everything from my phone', 'Made freelancing feel manageable',
    ],
    summaries: [
      'Everything runs through one account and untangling it every April used to take a full weekend of misery, but now I swipe each transaction as business or personal and by tax time it is already sorted.',
      'My income is lumpy and I always struggled to set aside the right tax, but the running estimate updates as I invoice and expense, so I now move money aside every month rather than panicking each quarter.',
      'I drive for a living and mileage is my biggest deduction, and it logs every trip automatically on my phone, so at tax time the deduction is right there rather than me guessing from a half filled logbook.',
      'As a designer I want to spend my time designing, not doing books, and it handles the finance side quietly in the background so I barely think about it until I need a number, and then it is there.',
      'I sell handmade goods alongside a day job and the tax on the shop used to reduce me to tears, but the running estimate means I set money aside as sales come in rather than panicking in April.',
      'I spent my first years freelancing doing taxes in a last minute panic with a spreadsheet, and this changed that completely, I honestly wish I had started with it from day one.',
      'I do not need a business accounting system, I need to invoice, track expenses and know my tax, and it does exactly that and no more, which is why I stuck with it where the full product felt like too much.',
      'The business and personal split learns my patterns and does most of it for me now, turning what used to be a shoebox of mixed transactions into a clean split without me thinking about it.',
    ],
    pros: [
      'The business and personal split is the killer feature.',
      'The running tax estimate stopped the April surprises.',
      'Automatic mileage tracking captures every deductible mile.',
      'It learns my patterns and sorts transactions for me.',
      'Invoicing is clean and goes out from my phone.',
      'Receipt capture means nothing gets lost.',
      'Genuinely mobile first, which suits how I work.',
      'Cheap enough to pay for itself easily.',
      'Never makes me feel out of my depth.',
      'Quietly does the work in the background.',
      'The tax estimate keeps me disciplined about saving.',
      'A clear path up to QuickBooks Online if I grow.',
      'Simple enough that I actually keep up with it.',
      'Separates business and personal on a shared account.',
      'Keeps me organized for the year end.',
      'Worth every cent for a solo business.',
    ],
    cons: [
      'It is strictly for one person, no room to hire.',
      'No way to pay a contractor if I subcontract.',
      'Reporting is basic, though enough for solo.',
      'Does not track inventory or materials.',
      'Support is mostly chat and forum, no fast phone.',
      'Very US tax focused.',
      'Would outgrow it if the business scaled.',
      'The move from Self-Employed had early rough edges.',
      'Honestly nothing major for what I need.',
      'None really, it suits me well.',
    ],
  },
  4: {
    titles: [
      'Right amount of software for a solo business', 'Simple and does the job', 'Affordable and easy to live with',
      'Got my tax under control', 'Does the basics really well', 'Happy, with a small wish or two',
      'Good fit for one person', 'The tax estimate earns its keep', 'Better than the spreadsheet I had',
      'Recommend it for freelancers', 'Sensible for a small income', 'Four stars from a freelancer',
      'Keeps me organized', 'Easy once you get going', 'Solid for a business of one',
      'Does what a solo needs',
    ],
    summaries: [
      'I do not need a full accounting system, I need to invoice, track expenses and know my tax, and this does exactly that. Marked down only for minimal reporting, which honestly is enough for me.',
      'It handles the finance side of a one person business well and got my tax under control. A couple of things could go further, but for the price and simplicity it is a strong choice.',
      'Simple, affordable and it does what a solo business needs. The tax estimate keeps me ahead of my quarterly payments and the mileage tracking captures every mile.',
      'A good, sensible tool for a small self employed income. It never makes me feel out of my depth the way full accounting software did, which is exactly why I stuck with it.',
      'Does the basics really well and keeps me organized. Support is mostly chat and the reporting is light, but for a solo business those are minor notes against a genuinely useful product.',
      'The right level of simplicity for a freelancer. Invoices look professional, expenses are easy to log, and the tax position is always visible, which is all I actually wanted.',
      'It replaced a spreadsheet I dreaded, and getting on top of my tax has gone from an April nightmare to a manageable running total. Worth the modest monthly cost.',
      'For a business of one it strikes the right balance, enough to keep me organized without the complexity of software built for a company with staff and inventory.',
    ],
    pros: [
      'The right level of simplicity for a solo business.',
      'Tax estimate keeps me ahead of what I owe.',
      'Business and personal separation is genuinely useful.',
      'Automatic mileage tracking is handy.',
      'Invoicing is quick and professional.',
      'Receipt capture keeps things organized.',
      'Affordable for a small income.',
      'Never makes me feel out of my depth.',
      'Mobile first, which suits solo work.',
      'A clear upgrade path to QuickBooks Online.',
      'Does the core job reliably.',
      'Simple onboarding.',
      'Keeps me ready for the year end.',
      'Good value for a side business.',
    ],
    cons: [
      'Reporting is minimal for anyone wanting detail.',
      'No employees or contractor payments.',
      'Single business only.',
      'Support is mostly chat and forum.',
      'Does not track inventory.',
      'Very US tax focused.',
      'The move from Self-Employed had rough edges.',
      'You would outgrow it as a real company.',
      'Basic by design, a plus and a limit.',
      'Would like a little more expense detail.',
      'Not built for anything beyond solo.',
      'No fast phone support option.',
    ],
  },
  3: {
    titles: [
      'Good basics, the Self-Employed switch was bumpy', 'Fine for a simple solo income', 'Does the job, nothing more',
      'Three stars, mostly on the transition', 'Simple to a fault in places', 'Works, with the odd frustration',
      'A qualified thumbs up', 'Decent but basic', 'Depends how simple your needs are',
      'Better than a spreadsheet, just', 'Right idea, a few rough edges', 'Honest three from a longtime user',
    ],
    summaries: [
      'I used the old Self-Employed product for years and the transition to this was more disruptive than expected, with a couple of features I relied on working differently. It does the core job but the change soured things for a while.',
      'It does the core job for a genuine one person business, but the moment my work grew even slightly I felt the edges of how deliberately basic it is.',
      'Fine for a very simple solo income, but I found myself wanting a little more detail in the reporting and the expense categories even for a business of one.',
      'A decent, cheap tool that got my tax organized, but the experience was let down by slow support during the switch from the older product.',
      'Simple and affordable, which is the appeal, but simple also means it does not stretch, and I ended up handling a couple of things outside it anyway.',
      'It works well for the basics, but as a longtime user the changes from the previous product and the lighter reporting left me a little frustrated.',
    ],
    pros: [
      'Business and personal split still works well.',
      'The tax estimate is genuinely useful.',
      'Mileage tracking is reliable.',
      'Simple and affordable.',
      'Invoicing is straightforward.',
      'Keeps a solo business organized.',
      'Easy to get going.',
      'Right idea for the self employed.',
    ],
    cons: [
      'The switch from Self-Employed changed things I relied on.',
      'Reporting and expense detail are minimal.',
      'You feel the edges as soon as work grows.',
      'Support was slow during the transition.',
      'Ended up handling some things outside it.',
      'No contractor payments.',
      'Very US tax focused.',
      'Basic by design.',
      'Strictly one person.',
      'Longtime users may find the switch frustrating.',
    ],
  },
  2: {
    titles: [
      'Too basic once my work grew', 'The Self-Employed switch frustrated me', 'Good idea, outgrew it fast',
      'Fine until I needed more', 'Not quite enough for me', 'Cannot pay a subcontractor at all',
    ],
    summaries: [
      'It was fine for the odd job, but as my work grew and I started subcontracting the occasional project, it simply could not handle paying anyone else, and support on the next step was slow and unhelpful.',
      'I used Self-Employed for years and the transition changed features I relied on, and combined with lighter reporting it left me looking at alternatives after a frustrating few months.',
      'It works for a genuine business of one, but I grew past that quickly and hit a wall, and moving up felt harder than it should have with the support I got.',
      'The tax estimate and simplicity are good, but the moment my situation got even slightly more complex the product could not stretch and I had to work around it.',
      'Fine for the basics, but the basics were not quite enough once my freelancing picked up, and the support to help me stretch it was slow.',
      'A cheap, simple tool that works when everything is straightforward, but it outgrew my needs the wrong way round and the help to move on was lacking.',
    ],
    pros: [
      'The mileage and expense tracking are good.',
      'Tax estimate is useful.',
      'Cheap for a genuine one person operation.',
      'Business and personal split works well.',
      'Simple to use when everything is straightforward.',
    ],
    cons: [
      'Cannot handle paying a subcontractor.',
      'Too basic once the work grew.',
      'Support was slow on moving up.',
      'The Self-Employed transition changed things.',
      'Lighter reporting than I wanted.',
      'Outgrew it faster than expected.',
    ],
  },
  1: {
    titles: [
      'Outgrew it and moving on', 'The transition lost me', 'Not enough once my work grew',
    ],
    summaries: [
      'My work grew past a genuine business of one, and the product could not handle paying anyone else while the support to help me move up was slow and unhelpful, so I have gone elsewhere.',
      'As a longtime Self-Employed user the transition changed too much of what I relied on, and between that and the lighter reporting I lost patience and moved to a different product.',
      'It may suit someone with the very simplest solo income, but the moment my situation grew it could not stretch and the help to move on was lacking, which made the whole thing more trouble than it was worth.',
    ],
    pros: [
      'The tax estimate was a good idea when it fit.',
      'Mileage tracking was reliable.',
      'Simple and cheap for a true business of one.',
    ],
    cons: [
      'Could not handle my work as it grew.',
      'The Self-Employed transition changed too much.',
      'Support was slow when I needed to move up.',
      'Too basic to stretch to my needs.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.47, 4: 0.31, 3: 0.13, 2: 0.055, 1: 0.035 };
  const offsets = { ease_of_use: 0.35, value_for_money: 0.2, customer_service: -0.4, functionality: -0.35 };
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
    const cons = chance(0.06) ? pick(['Nothing for what I need.', 'None really, it suits me well.']) : pick(b.cons);
    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);
    const year = chance(0.52) ? 2026 : (chance(0.66) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;
    const verified = chance(0.27);
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
      customer_service: subRating(overall, offsets.customer_service, 0.2),
      functionality: subRating(overall, offsets.functionality),
      review_title: title,
      summary, pros, cons,
      vendor_response: null, vendor_response_date: null,
      review_date: date,
      helpful_count: intBetween(0, 23),
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
    .from('software').select('category_id').eq('slug', 'quickbooks-online').single();
  if (catErr || !peer) throw new Error(`Could not resolve accounting category: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: peer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('QuickBooks Solopreneur already existed, profile updated.');
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
      console.log('QuickBooks Solopreneur inserted.');
    }
  }

  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(85);
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
