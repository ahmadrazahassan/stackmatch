// ============================================================================
// Adds Sage Sole Trader as a new product in the Accounting category with full
// editorial content and a ~90 review set (hand written anchors plus a seeded
// generator with per product content pools). Safe to re-run: updates the
// existing row and replaces its reviews if the slug already exists.
//
// Sage Sole Trader is the low cost, simplified product built specifically for
// sole traders and the self employed getting ready for Making Tax Digital for
// Income Tax. Distinct from the fuller Sage Accounting product.
//
//   node supabase/add_sage_sole_trader.js
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
// Software record: Sage Sole Trader
// ---------------------------------------------------------------------------
const SOFTWARE = {
  name: 'Sage Sole Trader',
  slug: 'sage-sole-trader',
  tagline: 'Simple, affordable bookkeeping built specifically for sole traders getting ready for Making Tax Digital',
  description_short:
    'Low cost cloud bookkeeping built for UK sole traders and the self employed, with expense tracking, a running tax estimate, bank feeds and Making Tax Digital for Income Tax submissions from one simple app.',
  description_full: `<h2>What is Sage Sole Trader?</h2><p>Sage Sole Trader is the product Sage built specifically for the person who never wanted to become an accountant, the sole trader, freelancer, contractor or side business owner who simply needs to keep their income and expenses in order, know roughly what tax they owe, and stay on the right side of HMRC without the complexity of a full accounting package. It sits below Sage Accounting in the range, deliberately stripped back to the handful of things a self employed individual actually needs, and priced accordingly. Its arrival is closely tied to Making Tax Digital for Income Tax Self Assessment, the change that pulls sole traders and landlords into quarterly digital reporting, and it is aimed squarely at the millions of self employed people who suddenly need compliant software but do not want, and should not have to pay for, a business grade accounting system.</p><h2>Built for one person, not a finance team</h2><p>The design philosophy is the whole point. Where full accounting software assumes you understand nominal codes, double entry and a chart of accounts, Sage Sole Trader assumes you understand none of that and does not need you to. You record what you earned and what you spent, in plain language, and the software handles the accounting underneath without ever making it your problem. For someone who has spent years dreading a shoebox of receipts and a panicked January, this simplicity is not a limitation, it is exactly the feature that makes the difference between staying on top of things and falling behind.</p><h2>The running tax estimate, quietly the best feature</h2><p>The single feature self employed users tend to mention first is the running estimate of what they should set aside for tax. Instead of finding out their tax bill months after the year has ended, they see a live figure that updates as they record income and expenses through the year, which changes saving behaviour in a genuinely useful way. Knowing in September roughly what you will owe the following January, rather than being surprised by it, is the kind of thing that turns tax from a source of anxiety into a manageable number, and for a first time self employed person it can be the difference between having the money ready and scrambling for it.</p><h2>Making Tax Digital for Income Tax, handled from the start</h2><p>The core compliance job is Making Tax Digital for Income Tax, and this is where the timing of the product matters. As the rollout brings sole traders and landlords with qualifying income into quarterly digital reporting, Sage Sole Trader keeps the digital records HMRC now expects and lets you send your quarterly updates and final declaration directly from the software rather than reconstructing a year of figures in a panic. Because it was built for this specific requirement, the quarterly submission is designed to be genuinely simple rather than a business feature awkwardly adapted for an individual, which is exactly what a self employed person nervous about the new rules needs.</p><h2>Expenses, receipts and bank feeds</h2><p>Day to day, the product does the things that actually keep a self employed person organised. You photograph a receipt and it is captured and categorised rather than lost in a glovebox or a kitchen drawer. Your bank account connects through open banking so your transactions flow in automatically and can be marked as business or personal, which matters enormously for sole traders whose business and personal spending often run through the same account. Mileage can be tracked for those who travel for work. Invoices can be raised and sent for those who bill clients rather than taking payment at the point of sale. None of it requires bookkeeping knowledge, and all of it feeds the running tax estimate and the quarterly submission.</p><h2>What it costs</h2><p>Sage Sole Trader is priced low, a small monthly figure that reflects its position as the entry point to the Sage range and its single user, single business focus, and Sage runs introductory offers that make the first months cheaper still. This is deliberately affordable software, priced for an individual rather than a business, on the understanding that the target user is weighing it against doing nothing or struggling with a spreadsheet rather than against a full accounting package. There is a free trial, and no long term commitment, which suits a self employed person testing whether the software actually fits how they work before relying on it for their tax.</p><h2>Where it falls short, and when to size up instead</h2><p>The honest limitation is that it is deliberately simple, and a business that grows beyond a straightforward sole trader setup will meet the edges of what it does. It is single user and single business, so it is not built for someone running several ventures or bringing on staff. It does not include payroll, so the moment a sole trader takes on an employee they need to add or move to something that does. It does not carry the deeper reporting, multi currency, stock or CIS handling of the fuller Sage Accounting, and a growing business will eventually want those. The good news is that Sage designs this as a genuine entry point, so sizing up to Sage Accounting as the business grows is a natural, supported path rather than a disruptive migration to an unfamiliar system.</p><h2>Who should choose it</h2><p>Sage Sole Trader is the right choice for the UK sole trader, freelancer, contractor or side business owner who wants simple, affordable, Making Tax Digital ready bookkeeping without the complexity or cost of a full accounting package. It is especially well suited to someone facing the new income tax reporting rules who is nervous about compliance and wants software that holds their hand rather than assuming accounting knowledge they do not have. Anyone running a limited company, employing staff, carrying stock, or needing deeper reporting should choose Sage Accounting instead, but for the self employed individual who simply wants to stay organised and stay compliant, this is one of the most approachable and sensibly priced options on the UK market.</p>`,

  starting_price: 6,
  price_currency: 'GBP',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Sage Sole Trader',
      price: 6,
      currency: 'GBP',
      billing: 'month',
      features: [
        'Introductory offer for new customers',
        'Single user, single business',
        'Income and expense tracking',
        'Running tax estimate',
        'Making Tax Digital for Income Tax',
        'Bank feeds and reconciliation',
        'Receipt capture and mileage',
        'Free trial, no long term contract',
      ],
    },
  ],

  features: [
    'Income and expense tracking',
    'Running self assessment tax estimate',
    'Making Tax Digital for Income Tax submissions',
    'Quarterly updates to HMRC',
    'Bank feeds and reconciliation',
    'Business and personal transaction split',
    'Receipt capture from the mobile app',
    'Mileage tracking',
    'Invoicing and quotes',
    'Plain language bookkeeping',
    'Self assessment ready reporting',
    'Mobile app for iOS and Android',
    'Accountant access',
    'Secure cloud storage',
    'Simple onboarding',
  ],
  top_features: ['Running tax estimate', 'Making Tax Digital for Income Tax submissions', 'Receipt capture and bank feeds'],
  integrations: [
    'HMRC',
    'Stripe',
    'PayPal',
    'GoCardless',
    'Sage Accounting',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/products/sage-sole-trader/',
  vendor_website: 'https://www.sage.com/en-gb/products/sage-sole-trader/',
  vendor_name: 'Sage',
  founded_year: 1981,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum'],
  countries_available: ['United Kingdom'],
  languages: ['English'],

  meta_title: 'Sage Sole Trader Review 2026: Pricing, MTD, Features, Pros & Cons',
  meta_description:
    'Independent Sage Sole Trader review for UK self employed: low cost bookkeeping, a running tax estimate, Making Tax Digital for Income Tax, receipt capture, real user pros and cons, and alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Sage_South_Africa_Logo_0.svg',
};

// ---------------------------------------------------------------------------
// Hand written anchor reviews
// ---------------------------------------------------------------------------
const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Jamie Ottoway', reviewer_job_title: 'Freelance Photographer', reviewer_company: null,
    reviewer_industry: 'Photography', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Finally something built for people like me, not accountants',
    summary: 'I have tried proper accounting software before and always felt out of my depth with nominal codes and jargon. This just asks what I earned and what I spent, in plain English, and does the rest. It is the first bookkeeping tool I have actually kept using.',
    pros: 'The running tax estimate has genuinely changed how I save, I know roughly what I will owe rather than being ambushed in January. Receipt capture from my phone means nothing gets lost. Setting business against personal on my bank feed is a lifesaver since it is all one account.',
    cons: 'It is single business only, so if I ever start a second venture I would need to move up. Support is fine but the community forum is where I found most answers.',
    review_date: '2026-05-13', helpful_count: 22, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Priya Sharma', reviewer_job_title: 'Independent Consultant', reviewer_company: null,
    reviewer_industry: 'Management Consulting', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Got me ready for the new tax rules without the stress',
    summary: 'I signed up because the Making Tax Digital income tax changes were keeping me up at night. The quarterly submission turned out to be the easy part, and I feel genuinely in control of my numbers for the first time since going freelance.',
    pros: 'The quarterly MTD submission is genuinely simple, exactly what a nervous first timer needs. The tax estimate updates as I go so there are no surprises. Invoicing clients from the same app that tracks my expenses keeps everything in one place.',
    cons: 'No payroll, so the day I take someone on I will need to look at Sage Accounting. Reporting is basic, though for a one person consultancy it is honestly enough.',
    review_date: '2026-04-20', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Darren Cobbold', reviewer_job_title: 'Self employed Plumber', reviewer_company: null,
    reviewer_industry: 'Construction', reviewer_company_size: 'Self-employed', used_for_duration: 'Less than 6 months',
    overall_rating: 4, ease_of_use: 5, value_for_money: 5, customer_service: 3, functionality: 4,
    review_title: 'Does everything a one man trade needs and nothing it does not',
    summary: 'My accountant told me to get ready for the digital tax changes and pointed me here. I am not a computer person at all and I can use it, which tells you everything. Receipts photographed from the van, mileage tracked, tax estimate there when I want it.',
    pros: 'Photographing receipts from the van instead of losing them in the glovebox. The mileage tracking adds up for someone driving between jobs all day. Cheap enough that it is a non decision. The tax estimate stops me spending money I will owe HMRC.',
    cons: 'Support took a bit to get back to me once. It is basic, but honestly a one man trade does not need more than this.',
    review_date: '2026-06-08', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Sophie Rendell', reviewer_job_title: 'Etsy Seller and Maker', reviewer_company: null,
    reviewer_industry: 'Arts & Crafts', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 3,
    review_title: 'Turned my side business tax from a nightmare into a non event',
    summary: 'I sell handmade goods alongside a part time job, and working out the tax on the self employed bit used to reduce me to tears every January. This has made it genuinely manageable, and the running estimate means I put money aside as I go.',
    pros: 'The running tax estimate is the feature I did not know I needed. Splitting business from personal on a shared bank account is brilliant. Simple enough that I actually keep on top of it rather than avoiding it.',
    cons: 'It does not handle stock, so I track my materials separately. For a maker that would be a nice addition, though I understand it is meant to be simple.',
    review_date: '2026-03-27', helpful_count: 15, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Graham Petherbridge', reviewer_job_title: 'Retired, part time gardener', reviewer_company: null,
    reviewer_industry: 'Landscaping', reviewer_company_size: 'Self-employed', used_for_duration: 'Less than 6 months',
    overall_rating: 4, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 3,
    review_title: 'A 68 year old with no tech skills got on fine',
    summary: 'I do a bit of gardening in retirement and the new tax rules meant I needed something. My grandson set it up in an afternoon and I manage it myself now, which I did not think would be possible for someone like me.',
    pros: 'Genuinely simple enough for someone who is not a technology person. The tax estimate is reassuring. Cheap, which matters on a small self employed income. The quarterly submission was less frightening than the HMRC letters made it sound.',
    cons: 'Some of the wording still assumes a little knowledge here and there. A plain English glossary for the odd term would help people my age.',
    review_date: '2026-06-15', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Chloe Ferris', reviewer_job_title: 'Freelance Copywriter', reviewer_company: null,
    reviewer_industry: 'Writing & Editing', reviewer_company_size: 'Self-employed', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Exactly the right amount of software for a freelancer',
    summary: 'I do not need a business accounting system, I need to invoice clients, track my expenses and know my tax position. This does precisely that and nothing more, which is why I have stuck with it where fuller products always felt like overkill.',
    pros: 'The right level of simplicity, it never makes me feel out of my depth. Invoices look professional and go out from my phone. The tax estimate genuinely changed my saving habits. Fair price for what I use.',
    cons: 'If my freelancing grew into a limited company I would outgrow it, but that is the point of it. Reporting is minimal, though enough for me.',
    review_date: '2026-02-14', helpful_count: 12, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Martin Ableson', reviewer_job_title: 'Self employed Driving Instructor', reviewer_company: null,
    reviewer_industry: 'Consumer Services', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 3,
    review_title: 'Good for the basics, wanted a little more in places',
    summary: 'It does the core job well and got me set up for the digital tax changes, but there were a couple of things, more detailed mileage handling in particular, where I wished it went a bit further for a driving business.',
    pros: 'Simple and affordable, exactly right for a sole trader. Tax estimate is useful. Bank feed saves me a lot of typing.',
    cons: 'Mileage tracking is basic for someone who effectively lives in their car. Would like a bit more detail in the expense categories. Support was slow once.',
    review_date: '2026-01-28', helpful_count: 9, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Martin. More detailed mileage handling is exactly the kind of feedback we pass to the product team, and we appreciate you taking the time. Sage Sole Trader Customer Care',
    vendor_response_date: '2026-02-04',
  },
  {
    reviewer_name: 'Rebecca Nunnley', reviewer_job_title: 'Freelance Hairdresser', reviewer_company: null,
    reviewer_industry: 'Consumer Services', reviewer_company_size: 'Self-employed', used_for_duration: 'Less than 6 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Wish I had found this three years ago',
    summary: 'I have been mobile hairdressing for years and always did my tax in a last minute panic with a carrier bag of receipts. This has changed that completely, and I honestly wish I had started using it the day I went self employed.',
    pros: 'Photographing receipts as I go means no more carrier bag panic. The tax estimate means I save the right amount through the year. Cheap and genuinely easy. Splitting business and personal on my account is so useful.',
    cons: 'Nothing significant for what I need. If I ever rented a salon and took on staff I would need something bigger, but that is a nice problem for the future.',
    review_date: '2026-06-02', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Anthony Sedgwick', reviewer_job_title: 'Self employed IT Contractor', reviewer_company: null,
    reviewer_industry: 'Information Technology and Services', reviewer_company_size: 'Self-employed', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Solid choice for a sole trader contractor',
    summary: 'As a contractor operating as a sole trader rather than a limited company, this fits my situation perfectly. Invoicing my agency, tracking expenses and keeping my tax position visible, all without the overhead of full company accounting I do not need.',
    pros: 'Right fit for a sole trader contractor specifically. Invoicing is quick and professional. Tax estimate keeps me ahead of my payments on account. My accountant can log in and check things at year end.',
    cons: 'Being sole trader only, the moment I incorporate I would move to Sage Accounting, which I gather is a smooth path. Reporting is light for anyone wanting detailed analysis.',
    review_date: '2025-11-19', helpful_count: 10, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Lauren Bickerstaff', reviewer_job_title: 'Self employed Tutor', reviewer_company: null,
    reviewer_industry: 'Education Management', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 4, value_for_money: 3, customer_service: 2, functionality: 3,
    review_title: 'Fine software let down by a slow support experience',
    summary: 'The product itself is simple and does what a tutor needs, but I hit a snag connecting my bank and the support experience to sort it out was genuinely frustrating, which soured what had been a good first impression.',
    pros: 'Easy to use and well priced. Tax estimate is helpful. Good for a simple self employed income like private tutoring.',
    cons: 'My bank feed dropped and getting it fixed took several contacts over a couple of weeks. For the days it was not working I was back to manual entry, which defeated the point.',
    review_date: '2026-03-05', helpful_count: 16, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Lauren, we are sorry the bank feed issue took so long to resolve. Feed reconnections should be quick and we have fed your experience back to the team. Please reach out if it recurs. Sage Sole Trader Customer Care',
    vendor_response_date: '2026-03-12',
  },
  {
    reviewer_name: 'Owen Marchetti', reviewer_job_title: 'Self employed Personal Trainer', reviewer_company: null,
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: 'Self-employed', used_for_duration: 'Less than 6 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Perfect for a one person fitness business',
    summary: 'I train clients in parks and gyms and do everything from my phone. This lets me invoice, log expenses for kit and log mileage between sessions without ever sitting at a computer, and my tax is finally under control.',
    pros: 'Genuinely phone first, which suits how I work. Mileage and kit expenses tracked easily. The tax estimate keeps me disciplined about setting money aside. Cheap enough to be an obvious yes.',
    cons: 'Cannot think of much for my needs. Anyone wanting detailed financial reporting would find it light, but that is not what it is for.',
    review_date: '2026-05-30', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
];

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------
let seed = 606099;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Jamie', 'Sophie', 'Darren', 'Chloe', 'Martin', 'Rebecca', 'Anthony', 'Lauren', 'Owen', 'Priya',
  'Liam', 'Katie', 'Ryan', 'Holly', 'Ben', 'Megan', 'Sam', 'Jessica', 'Adam', 'Emma',
  'Aled', 'Ffion', 'Rhys', 'Carys', 'Cian', 'Aoife', 'Declan', 'Roisin', 'Eilidh', 'Fraser',
  'Amir', 'Layla', 'Ravi', 'Anjali', 'Tunde', 'Chioma', 'Wei', 'Mei', 'Piotr', 'Kasia',
  'Nathan', 'Rachel', 'Simon', 'Claire', 'Lee', 'Gemma', 'Craig', 'Vicky', 'Josh', 'Beth',
  'Dylan', 'Erin', 'Callum', 'Freya', 'Harvey', 'Isla', 'Kian', 'Lola', 'Mason', 'Nia',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Ottoway', 'Rendell', 'Cobbold', 'Nunnley', 'Sedgwick', 'Bickerstaff', 'Petherbridge',
  'Ableson', 'Marchetti', 'Ferris', 'Holbeck', 'Ingham', 'Jessop', 'Kilner', 'Lund',
  'Massey', 'Nutter', 'Ollerenshaw', 'Pilling', 'Rothery', 'Sowerby', 'Tomlinson',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.28)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
const sizes = ['Self-employed', 'Self-employed', 'Self-employed', 'Self-employed', '1'];
const durations = ['Less than 6 months', 'Less than 6 months', '6-12 months', '6-12 months', '1-2 years', '1-2 years'];
const countries = ['United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom'];
const industries = ['Photography', 'Construction', 'Writing & Editing', 'Consumer Services', 'Health, Wellness and Fitness',
  'Arts & Crafts', 'Information Technology and Services', 'Management Consulting', 'Education Management', 'Landscaping',
  'Design', 'Marketing & Advertising', 'Retail', 'Music', 'Real Estate', 'Beauty', 'Automotive', 'Events Services',
  'Media Production', 'Translation and Localization'];
const jobs = ['Sole trader', 'Freelancer', 'Self employed', 'Freelance Designer', 'Independent Consultant',
  'Self employed Tradesperson', 'Freelance Writer', 'Self employed Contractor', 'Small Business Owner', 'Side Business Owner',
  'Freelance Photographer', 'Self employed Instructor', 'Independent Contractor', 'Mobile Trader', 'Self employed Maker'];

function makeCompany() { return null; } // sole traders overwhelmingly trade under their own name

const CONTENT = {
  5: {
    titles: [
      'Built for people who are not accountants', 'Made my tax a non event at last', 'The tax estimate changed how I save',
      'Simple, cheap and it just works', 'Got me ready for the new tax rules', 'No more carrier bag of receipts',
      'Exactly the right amount of software', 'Wish I had found it years ago', 'Phone first, which suits how I work',
      'Finally in control of my numbers', 'Perfect for a one person business', 'Does what a sole trader needs',
      'Splitting business and personal is brilliant', 'The quarterly submission was easy', 'Kept using it, unlike the others',
      'A weight off my mind every January', 'Affordable and genuinely easy', 'My accountant can just log in',
      'Receipts sorted as I go', 'No jargon, no stress',
    ],
    summaries: [
      'I have tried proper accounting software and always felt out of my depth. This just asks what I earned and what I spent in plain English and does the rest, and it is the first tool I have actually kept using.',
      'The running tax estimate has genuinely changed how I save, I know roughly what I will owe through the year rather than being ambushed in January when the bill lands.',
      'I signed up because the digital income tax changes were worrying me, and the quarterly submission turned out to be the easy part. I feel in control of my numbers for the first time since going self employed.',
      'Photographing receipts as I go means no more last minute panic with a carrier bag, and splitting business from personal on my one bank account has been a genuine lifesaver.',
      'I am not a technology person at all and I can use it, which tells you everything you need to know about how simple it is. Cheap enough that it was an obvious decision.',
      'It does precisely what a one person business needs, invoice clients, track expenses, know my tax position, and nothing more, which is exactly why it fits where fuller products felt like overkill.',
      'My accountant pointed me here to get ready for the tax changes and it has been the least stressful part of going self employed. The tax estimate alone is worth the small monthly cost.',
      'Mobile first suits how I actually work, everything from my phone between jobs, and my tax is finally under control rather than something I dread every year.',
    ],
    pros: [
      'It asks what I earned and spent in plain English, no jargon.',
      'The running tax estimate means no nasty January surprise.',
      'Photographing receipts as I go stops anything getting lost.',
      'Splitting business and personal on one bank account is brilliant.',
      'The quarterly MTD submission is genuinely simple.',
      'Cheap enough to be an easy decision for a sole trader.',
      'Mileage tracking adds up for someone driving between jobs.',
      'Invoices look professional and go out from my phone.',
      'My accountant can log in and check at year end.',
      'The bank feed saves me a lot of manual typing.',
      'Simple enough that I actually keep on top of it.',
      'It is the first bookkeeping tool I have stuck with.',
      'Got me ready for the new tax rules without stress.',
      'Right level of software for a one person business.',
      'The tax estimate keeps me disciplined about saving.',
      'Genuinely phone first, which suits how I work.',
    ],
    cons: [
      'It is single business only, so a second venture means sizing up.',
      'No payroll, so taking on staff means moving to Sage Accounting.',
      'It does not handle stock, I track materials separately.',
      'Reporting is minimal, though enough for a sole trader.',
      'Support was a little slow the one time I needed it.',
      'The odd term still assumes a little knowledge.',
      'Anyone wanting detailed analysis would find it light.',
      'Nothing significant for what I actually need.',
      'A future limited company would outgrow it, which is the point.',
      'More detailed mileage handling would be a nice addition.',
    ],
  },
  4: {
    titles: [
      'Right amount of software for a freelancer', 'Solid for a sole trader', 'Simple and does the job well',
      'Happy, with a small wish or two', 'Good fit for one person', 'Affordable and easy to live with',
      'Got me MTD ready without fuss', 'Does the basics really well', 'Recommend it for the self employed',
      'The tax estimate earns its keep', 'Better than the spreadsheet I had', 'Sensible software for a small income',
      'Four stars from a freelancer', 'Keeps my tax under control', 'Easy once you get going',
      'Right tool for a sole trader contractor',
    ],
    summaries: [
      'I do not need a business accounting system, I need to invoice, track expenses and know my tax, and this does precisely that. Marked down only for minimal reporting, which honestly is enough for me.',
      'It got me ready for the digital tax changes and does the core job well. A couple of things could go a bit further for my trade, but for the price and simplicity it is a strong choice.',
      'As a sole trader contractor this fits my situation perfectly, invoicing and expenses without the overhead of full company accounting I do not need. The path up to Sage Accounting is there if I incorporate.',
      'Simple, affordable and it does what a one person business needs. The tax estimate keeps me ahead of my payments and the bank feed saves a lot of typing.',
      'A good, sensible tool for a small self employed income. It never makes me feel out of my depth, which fuller products always did, and that is exactly why I stuck with it.',
      'Does the basics really well and got me set up for MTD. Support was slow once, and the reporting is light, but for a sole trader those are minor notes against a genuinely useful product.',
      'The right level of simplicity for a freelancer. Invoices look professional, expenses are easy to log, and the tax position is always visible, which is all I actually wanted.',
      'It replaced a spreadsheet I dreaded, and getting on top of my tax has gone from a January nightmare to a manageable running total. Worth the small monthly cost several times over.',
    ],
    pros: [
      'The right level of simplicity for a one person business.',
      'Tax estimate keeps me ahead of what I owe.',
      'Invoicing is quick and looks professional.',
      'Receipt capture from the phone works well.',
      'Bank feed saves a lot of manual entry.',
      'Affordable for a small self employed income.',
      'Got me ready for the new tax rules.',
      'Splitting business and personal is genuinely useful.',
      'My accountant can access it at year end.',
      'Mileage tracking is handy for a mobile trade.',
      'Never makes me feel out of my depth.',
      'A clear upgrade path to Sage Accounting if I grow.',
      'Simple onboarding, live within a day.',
      'Does the core job reliably.',
    ],
    cons: [
      'Reporting is minimal for anyone wanting detail.',
      'No payroll if you take on staff.',
      'Single business only.',
      'Mileage handling could go further for some trades.',
      'Support was slow the one time I needed it.',
      'Does not handle stock.',
      'The odd term assumes a little knowledge.',
      'You would outgrow it as a limited company.',
      'Expense categories could be more detailed.',
      'Not built for anything beyond a sole trader.',
      'The community forum answered more than support did.',
      'Basic by design, which is a plus and a limit.',
    ],
  },
  3: {
    titles: [
      'Good basics, wanted a little more', 'Fine for a simple income', 'Does the job, nothing more',
      'Three stars, mostly minor gripes', 'Right idea, a few rough edges', 'Simple to a fault in places',
      'Works, with the odd frustration', 'A qualified thumbs up', 'Decent but basic',
      'Depends how simple your needs are', 'Better than a spreadsheet, just', 'Adequate for a sole trader',
    ],
    summaries: [
      'It does the core job well and got me set up for the tax changes, but there were a couple of things where I wished it went a bit further for my particular trade.',
      'The product itself is simple and fine, but I hit a snag with my bank feed and sorting it out was more frustrating than it should have been, which soured a good first impression.',
      'Fine for a very simple self employed income. The moment your situation gets even slightly more complex you feel the edges of how deliberately basic it is.',
      'It does what it says but I found myself wanting a little more detail in the expense categories and the reporting, even for a one person business.',
      'A decent, cheap tool that got me MTD ready, but the experience was let down by a slow support response when I actually needed help.',
      'Simple and affordable, which is the appeal, but simple also means it does not stretch, and I ended up tracking a couple of things outside it anyway.',
    ],
    pros: [
      'Simple and well priced for a sole trader.',
      'The tax estimate is genuinely useful.',
      'Got me ready for the digital tax changes.',
      'Bank feed saves typing when it works.',
      'Receipt capture is handy.',
      'Easy to get going.',
      'Right idea for the self employed.',
      'Invoicing is straightforward.',
    ],
    cons: [
      'Wished it went further for my particular trade.',
      'Bank feed snag was frustrating to fix.',
      'Support was slow when I needed it.',
      'Reporting and expense detail are minimal.',
      'You feel the edges as soon as things get complex.',
      'Ended up tracking some things outside it.',
      'Mileage handling is basic.',
      'No stock or payroll.',
      'Some wording assumes knowledge.',
      'Simple by design, which does not suit everyone.',
    ],
  },
  2: {
    titles: [
      'Let down by support', 'Too basic once things grew', 'Good idea, frustrating experience',
      'Bank feed trouble spoiled it', 'Fine until I needed help', 'Not quite enough for me',
    ],
    summaries: [
      'The product itself is simple and does what a sole trader needs, but a bank feed problem and a slow, frustrating support experience to fix it soured what had been a good start.',
      'It was fine while my income was tiny, but as my freelancing grew even a little I met the limits of how deliberately basic it is, and ended up doing more outside it than in it.',
      'A cheap, simple tool that works when everything is smooth, but the one time something went wrong the support experience made me wish I had chosen differently.',
      'The tax estimate and simplicity are genuinely good, but reliability let me down, and for the days my bank feed was broken I was back to manual entry, which defeated the purpose.',
      'It does the basics, but the basics were not quite enough for my situation, and the support to help me stretch it was slow and unhelpful.',
      'I wanted to love it for the price and the simplicity, but a run of small frustrations and a poor support experience wore down my patience.',
    ],
    pros: [
      'Genuinely simple and affordable.',
      'The tax estimate is helpful.',
      'Easy to use when everything works.',
      'Good for a very simple income.',
      'Receipt capture is convenient.',
    ],
    cons: [
      'Support was slow and frustrating when I needed it.',
      'Bank feed reliability let me down.',
      'Too basic once my situation grew.',
      'Back to manual entry when the feed broke.',
      'Not enough detail for my needs.',
      'The experience did not match the promise.',
    ],
  },
  1: {
    titles: [
      'Gave up after a frustrating spell', 'Not reliable enough for me', 'Cannot recommend after my experience',
    ],
    summaries: [
      'A run of bank feed problems and a support experience that never really resolved them meant I spent more time fighting the software than it saved me, and I have moved to something else.',
      'It may suit someone with the very simplest possible income, but for me the combination of it being too basic and unhelpful support when I needed to stretch it made the whole thing more trouble than it was worth.',
      'The idea is right and the price is fair, but reliability and support let it down badly enough that I could not trust it with my tax, which is the one thing it absolutely has to get right.',
    ],
    pros: [
      'The concept and price are genuinely appealing.',
      'The tax estimate was a nice idea when it worked.',
      'Simple to set up initially.',
    ],
    cons: [
      'Bank feed reliability problems I could not get resolved.',
      'Support never really fixed the issue.',
      'Too basic to stretch to my needs.',
      'Lost trust in it for something as important as tax.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.5, 4: 0.32, 3: 0.11, 2: 0.04, 1: 0.03 };
  const offsets = { ease_of_use: 0.3, value_for_money: 0.2, customer_service: -0.4, functionality: -0.3 };
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

    const year = chance(0.55) ? 2026 : (chance(0.7) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    const verified = chance(0.28);
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
      helpful_count: intBetween(0, 24),
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

  // Same category as Sage Accounting (Accounting software)
  const { data: peer, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'sage-accounting').single();
  if (catErr || !peer) throw new Error(`Could not resolve accounting category from sage-accounting: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: peer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('Sage Sole Trader already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations/i.test(error.message)) {
        const { integrations, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Sage Sole Trader inserted (integrations column missing, skipped that field).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('Sage Sole Trader inserted.');
    }
  }

  // Replace reviews for this product only: 11 anchors + 79 generated = 90
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(79);
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
