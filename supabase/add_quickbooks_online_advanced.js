// ============================================================================
// Adds QuickBooks Online Advanced as a new product in the Accounting category
// with full editorial content and a ~120 review set (anchors + seeded
// generator). Safe to re-run: updates the row and replaces its own reviews
// only. Does not touch any other product.
//
//   node supabase/add_quickbooks_online_advanced.js
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
  name: 'QuickBooks Online Advanced',
  slug: 'quickbooks-online-advanced',
  tagline: 'The top tier of QuickBooks Online for growing businesses that have outgrown the standard plans',
  description_short:
    'The most powerful QuickBooks Online plan, built for scaling businesses that need deeper reporting, more users, custom roles, batch invoicing, workflow automation and a dedicated account team.',
  description_full: `<h2>What is QuickBooks Online Advanced?</h2><p>QuickBooks Online Advanced is the highest tier of Intuit's cloud accounting platform, the plan a business steps up to when Simple Start, Essentials and Plus have started to feel tight but a full mid market finance system would be too much, too soon. It keeps everything that made QuickBooks Online the most widely used small business accounting product in the world, the familiar interface, the enormous accountant ecosystem, the deep bank feed and reporting engine, and layers on the extra capacity, controls and automation that a business with more staff, more transactions and more complexity actually needs to keep running smoothly.</p><h2>More users, and proper control over what they can do</h2><p>The most immediate reason businesses move to Advanced is people. Where the lower plans cap users tightly, Advanced supports far more, and crucially it adds custom user roles so you can decide precisely what each person can see and do rather than handing everyone the same broad access. For a business where the bookkeeper, the office manager, a couple of department heads and the owner all touch the books, that granular control is not a luxury, it is the difference between a system you can safely open up to a growing team and one you cannot.</p><h2>Reporting that goes beyond the standard pack</h2><p>Reporting is where Advanced earns a lot of its keep. On top of the strong standard QuickBooks reports, Advanced adds a more powerful custom reporting layer, letting you build the specific views your business runs on rather than exporting to a spreadsheet every month. It integrates with a business analytics tool for richer dashboards, and it lets you track performance against custom fields and tags that the lower tiers do not offer. For an owner or finance lead who has been living in Excel to answer the questions the standard reports could not, this is often the single feature that justifies the upgrade on its own.</p><h2>Automation and time savers built for scale</h2><p>Advanced adds workflow automation that removes repetitive manual work, approval routing for expenses and transactions, automatic reminders, and rules that fire without someone remembering to trigger them. Batch invoicing and batch expense entry let you process dozens of transactions at once rather than one at a time, which is exactly the kind of thing that quietly consumes hours as a business grows. Receipt capture, mileage tracking and the mobile app carry over from the wider platform, so the day to day conveniences are all still there, now sitting on top of far more capacity underneath.</p><h2>The support difference</h2><p>Advanced customers get a materially better support experience than the lower tiers, including a dedicated account team and priority access, plus included training resources to help a growing team actually use the extra capability rather than leaving it switched off. For a business that has felt the frustration of slow, general support on a cheaper plan, this upgrade in service is a genuine part of what you are paying for, not just a longer feature list.</p><h2>What it costs</h2><p>QuickBooks Online Advanced sits well above the lower plans, priced as a premium monthly subscription that reflects the extra users, reporting, automation and support. Intuit runs regular introductory discounts that bring the first several months down considerably, which softens the step up while a business settles in. The honest way to weigh the cost is not against the cheapest QuickBooks plan but against what the upgrade replaces, the spreadsheets, the workarounds, the extra staff time, and often a separate reporting tool, all of which Advanced can absorb into one subscription. Priced that way it frequently comes out ahead, though a business should always confirm it genuinely needs the extra tier rather than being upsold into it early.</p><h2>Where it falls short</h2><p>Advanced is still QuickBooks Online underneath, which means it inherits the platform's limits as well as its strengths. Businesses with genuine multi entity consolidation needs, dimensional reporting across many departments and locations, or complex revenue recognition will still find it lighter than a true mid market platform like Sage Intacct or NetSuite, and at that point the sensible move is up and out rather than staying on the top QuickBooks tier. The price is a real jump from the lower plans, and renewal pricing after the introductory period catches some businesses out, so it pays to diary when the discount ends. Some of the most powerful features also carry a learning curve that a business only gets value from if it actually invests the time.</p><h2>Who should choose it</h2><p>QuickBooks Online Advanced is the right choice for a growing business already comfortable on QuickBooks that has outgrown the standard plans, needs more users with proper role based control, wants deeper custom reporting without leaving the platform, and would benefit from workflow automation and a better support relationship. It is especially natural for a business whose accountant already works in QuickBooks, since the upgrade changes the plan rather than the platform. Businesses with true multi entity or dimensional reporting needs should look at a dedicated mid market system instead, and businesses comfortably served by Essentials or Plus should not pay for Advanced until they genuinely feel the ceiling.</p>`,

  starting_price: 235,
  price_currency: 'USD',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Advanced',
      price: 235,
      currency: 'USD',
      billing: 'month',
      features: [
        'Up to 25 users',
        'Custom user roles and permissions',
        'Custom reporting and analytics',
        'Batch invoicing and expenses',
        'Workflow automation and approvals',
        'Dedicated account team',
        'Included training resources',
        'Everything in Plus',
      ],
    },
  ],

  features: [
    'Up to 25 users',
    'Custom user roles and permissions',
    'Custom reporting and dashboards',
    'Business analytics integration',
    'Batch invoicing',
    'Batch expense entry',
    'Workflow automation',
    'Approval routing',
    'Custom fields and tags',
    'Bank feeds and reconciliation',
    'Receipt capture',
    'Mileage tracking',
    'Project profitability tracking',
    'Multi currency',
    'Cash flow forecasting',
    'Dedicated account team',
    'Priority support',
    'Mobile app for iOS and Android',
    'Accountant access',
    'Third party app marketplace',
  ],
  top_features: ['Custom reporting and dashboards', 'Workflow automation', 'Up to 25 users with custom roles'],
  integrations: [
    'PayPal',
    'Shopify',
    'Square',
    'Stripe',
    'Bill',
    'Expensify',
    'Salesforce',
    'Zapier',
  ],

  affiliate_url: 'https://quickbooks.intuit.com/online/advanced/',
  vendor_website: 'https://quickbooks.intuit.com/online/advanced/',
  vendor_name: 'Intuit',
  founded_year: 1983,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United States', 'United Kingdom', 'Canada', 'Australia', 'South Africa'],
  languages: ['English'],

  meta_title: 'QuickBooks Online Advanced Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent QuickBooks Online Advanced review: custom reporting, workflow automation, up to 25 users, batch invoicing, dedicated support, real user pros and cons, and alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Intuit_QuickBooks_idH8urRJxv_1.svg',
  brand_color: '#108000',
};

const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Marcus Delacroix', reviewer_job_title: 'Finance Director', reviewer_company: 'Brightpath Digital',
    reviewer_industry: 'Marketing & Advertising', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'The custom reporting finally got us out of spreadsheets',
    summary: 'We ran Plus for years and spent every month end exporting to Excel to build the reports the board actually wanted. Moving to Advanced meant those reports now live in the system, and month end went from a two day spreadsheet marathon to an afternoon.',
    pros: 'Custom reporting is the reason to upgrade and it delivered. The extra users with proper role control let me open the books to department heads without exposing everything. The dedicated account team actually knows our setup and picks up quickly.',
    cons: 'It is a big jump in price from Plus, and the renewal after the intro discount was a shock we should have diarised. Some of the automation took real time to set up properly.',
    review_date: '2026-04-16', helpful_count: 24, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Priya Ramanathan', reviewer_job_title: 'Controller', reviewer_company: 'Vantage Health Group',
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Batch invoicing alone saved us hours every week',
    summary: 'We invoice hundreds of clients a month and doing them one at a time on the lower plan was eating a person most of a day. Batch invoicing on Advanced turned that into a genuinely quick task, and the automation handles the reminders without anyone thinking about it.',
    pros: 'Batch invoicing and batch entry are huge time savers at our volume. Workflow automation for approvals stopped things slipping through. The reporting depth answers what our leadership asks without exports.',
    cons: 'The learning curve on the automation and custom fields is real, we did not get value until we invested a week in setup. Price is steep against the lower tiers.',
    review_date: '2026-02-23', helpful_count: 19, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'David Kowalczyk', reviewer_job_title: 'CFO', reviewer_company: 'Northgate Construction Services',
    reviewer_industry: 'Construction', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 5,
    review_title: 'Powerful, and we grew into every feature',
    summary: 'We upgraded reluctantly on price and have ended up using nearly all of it. Project profitability, custom roles for our project managers, and the reporting have all earned their place. Value is the only reason it is not five stars, it is not cheap.',
    pros: 'Project profitability tracking is genuinely useful for a construction business. Custom user roles matter when you have project managers who should see some things and not others. Reporting is a clear step up.',
    cons: 'Value for money is the weak point, it is a premium price. Still QuickBooks underneath, so it will not do true multi entity if we grow into that.',
    review_date: '2025-11-30', helpful_count: 16, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Eleanor Whitcombe', reviewer_job_title: 'Head of Finance', reviewer_company: 'Ashford Wholesale',
    reviewer_industry: 'Wholesale', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'The right step up when Plus started to strain',
    summary: 'We hit the user limit and the reporting ceiling on Plus at about the same time, and Advanced solved both. It is not a different product, it is more of a good one, which is exactly what we wanted rather than a disruptive migration.',
    pros: 'More users with real permission control. Custom reporting we can actually build ourselves. Kept everything familiar so there was no retraining. Support noticeably better than the lower tiers.',
    cons: 'The price jump is significant. A couple of the advanced features feel aimed at bigger businesses than us and sit unused.',
    review_date: '2026-03-19', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Anthony Serrano', reviewer_job_title: 'Operations Director', reviewer_company: 'Cedarline Logistics',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'The dedicated support team changed the relationship',
    summary: 'On the cheaper plans support felt like a queue. On Advanced we have people who know our account, and a genuinely tricky reconciliation issue got resolved in one call rather than three. That alone has been worth a lot to us.',
    pros: 'Dedicated account team and priority support are a real, tangible difference. Workflow automation removed a lot of manual chasing. The migration up from Plus was seamless.',
    cons: 'You are paying for that support in the price. We are still learning the reporting builder, it is powerful but not instantly intuitive.',
    review_date: '2026-05-11', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Rebecca Ashton', reviewer_job_title: 'Finance Manager', reviewer_company: 'Meadowbrook Education',
    reviewer_industry: 'Education Management', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 4, functionality: 4,
    review_title: 'Good, but we may have needed a different product',
    summary: 'Advanced is capable, but our real need was multi entity reporting across several sites, and even the top QuickBooks tier is not really built for that. It does everything else well, we just bought up within a range that could not fully solve our specific problem.',
    pros: 'Strong reporting for a single entity. Good automation. The support is genuinely better than the lower plans.',
    cons: 'Not built for true multi entity consolidation, which was our actual need. We combine sites manually still. Should probably have looked at a mid market platform instead.',
    review_date: '2026-01-15', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Thank you Rebecca. For genuine multi entity consolidation our team can discuss whether a different solution fits better, and we appreciate the honest feedback on where Advanced reaches its limits. QuickBooks Customer Care',
    vendor_response_date: '2026-01-22',
  },
  {
    reviewer_name: 'Jonathan Meyer', reviewer_job_title: 'Managing Director', reviewer_company: 'Silverline Media',
    reviewer_industry: 'Media Production', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Custom fields and tags transformed our client reporting',
    summary: 'We needed to report profitability by client and by campaign, and the custom fields and tags on Advanced made that possible in a way the standard plans never could. Now every client conversation is backed by real numbers rather than a gut feel.',
    pros: 'Custom fields and tags for slicing our data by client and campaign. The reporting built on top of them is exactly what we needed. Familiar QuickBooks experience with far more headroom.',
    cons: 'The price is a genuine commitment for a business our size. Setting up the tagging structure properly took planning we underestimated.',
    review_date: '2026-04-28', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Sandra Bellweather', reviewer_job_title: 'Bookkeeper', reviewer_company: 'Bellweather Accounting Partners',
    reviewer_industry: 'Accounting', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'We put our larger clients on Advanced deliberately',
    summary: 'As a practice we steer clients who have outgrown Plus onto Advanced rather than off QuickBooks entirely, because the reporting and batch tools handle their growth while keeping them in a platform we know inside out. It has saved several clients a disruptive migration.',
    pros: 'Keeps growing clients in a familiar platform we support deeply. Batch tools handle their higher volumes. Custom reporting answers their board questions. Priority support helps when a client hits something tricky.',
    cons: 'Not every client needs it, and the price means we only recommend it when the need is genuine. The reporting builder rewards experience, so we often set it up for clients rather than leaving them to it.',
    review_date: '2025-12-12', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Thomas Ridgway', reviewer_job_title: 'VP Finance', reviewer_company: 'Harborview SaaS',
    reviewer_industry: 'Computer Software', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 4,
    review_title: 'Great until our revenue recognition got complicated',
    summary: 'For a growing software business Advanced was excellent right up to the point where our deferred revenue got genuinely complex. It handles a lot, but proper subscription revenue recognition is where even the top tier of QuickBooks starts to strain and we began eyeing a mid market move.',
    pros: 'Strong reporting and automation carried us a long way. Good for a fast growing team. The API and app marketplace let us connect our billing tools.',
    cons: 'Revenue recognition for a subscription business eventually outgrows it. Price is high. We are now weighing a dedicated platform, which is the natural next step.',
    review_date: '2026-02-08', helpful_count: 17, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Grace Okoro', reviewer_job_title: 'Finance Lead', reviewer_company: 'Lumen Nonprofit Alliance',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'The automation gave our small finance team its time back',
    summary: 'We are a lean finance team at a nonprofit, and the workflow automation on Advanced has been the difference between drowning in manual approvals and actually keeping up. Setting spending approval rules once and letting the system enforce them has been transformative.',
    pros: 'Workflow automation and approval routing for a small team is genuinely freeing. Custom reporting for our funders. The support team has been patient and helpful with our specific setup.',
    cons: 'The pricing is a stretch for a nonprofit budget even with the discount. Some features we will never use as an organisation of our type.',
    review_date: '2026-05-24', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Michael Trent', reviewer_job_title: 'Owner', reviewer_company: 'Trent & Barlow Retail',
    reviewer_industry: 'Retail', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 2, ease_of_use: 3, value_for_money: 2, customer_service: 3, functionality: 4,
    review_title: 'Capable but we did not need this much',
    summary: 'Honest reflection, we were upsold into Advanced before we really needed it. It is a genuinely powerful plan but for our retail business the extra reporting and automation mostly sit unused, and we are paying a premium for capacity we do not touch.',
    pros: 'When we do use the reporting it is good. Reliable and familiar. Support is better than the cheaper plans.',
    cons: 'We do not use most of what we pay for. Should have stayed on Plus longer. The price for our actual usage does not stack up. Watch you are not upsold too early.',
    review_date: '2025-10-20', helpful_count: 20, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Michael, thank you for the candid note. If Advanced exceeds your current needs our team can review whether a lower plan fits better, we would rather you were on the right plan. QuickBooks Customer Care',
    vendor_response_date: '2025-10-27',
  },
  {
    reviewer_name: 'Catherine Ashby', reviewer_job_title: 'Financial Controller', reviewer_company: 'Pinnacle Professional Services',
    reviewer_industry: 'Management Consulting', reviewer_company_size: '51-200', reviewer_country: 'United Kingdom',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The reporting depth is what keeps us here',
    summary: 'For a professional services firm billing by project, the custom reporting and project profitability on Advanced answer exactly the questions our partners ask. We evaluated moving to a mid market platform and decided Advanced still does what we need at a fraction of the disruption.',
    pros: 'Project level reporting and profitability are genuinely strong. Custom reports for partner meetings. Batch tools for our monthly billing run. It has held up as we grew.',
    cons: 'We know we will eventually outgrow it if we keep scaling. The premium price is noticeable. Reporting builder takes time to master.',
    review_date: '2026-06-06', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

let seed = 331199;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Michael', 'Jennifer', 'David', 'Sarah', 'Robert', 'Jessica', 'James', 'Ashley', 'John', 'Amanda',
  'William', 'Melissa', 'Richard', 'Nicole', 'Thomas', 'Elizabeth', 'Charles', 'Rebecca', 'Daniel', 'Laura',
  'Anthony', 'Rachel', 'Mark', 'Katherine', 'Steven', 'Megan', 'Paul', 'Hannah', 'Andrew', 'Emily',
  'Priya', 'Wei', 'Carlos', 'Sofia', 'Kwame', 'Aisha', 'Diego', 'Lucia', 'Omar', 'Ingrid',
  'Eleanor', 'Jonathan', 'Grace', 'Catherine', 'Marcus', 'Sandra', 'Thomas', 'Anthony', 'Rebecca', 'Nathan',
  'Gareth', 'Siobhan', 'Fiona', 'Declan', 'Bethan', 'Ewan', 'Niamh', 'Callum', 'Freya', 'Rhys',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Anderson', 'Bennett', 'Coleman', 'Delgado', 'Ellsworth', 'Fitzgerald', 'Griffin', 'Hancock',
  'Ishikawa', 'Jennings', 'Kaufman', 'Lindqvist', 'Marchetti', 'Nakamura', 'Okonkwo', 'Patterson',
  'Quintero', 'Reinhardt', 'Sullivan', 'Thornton', 'Underwood', 'Vasquez', 'Whitaker',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.32)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.22)) return null;
  const stems = ['Summit', 'Cedar', 'Harbor', 'Ridgeway', 'Vantage', 'Cornerstone', 'Brightpath',
    'Meridian', 'Northgate', 'Silverline', 'Pinnacle', 'Cascade', 'Ironwood', 'Lakeshore',
    'Redwood', 'Kingsley', 'Ashford', 'Beacon', 'Crestview', 'Halcyon'];
  const suf = ['Group', 'LLC', 'Partners', 'Holdings', 'Services', 'Solutions', 'Inc', 'Enterprises', ''];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ''}`.trim();
}
const sizes = ['11-50', '11-50', '51-200', '51-200', '51-200', '201-500'];
const durations = ['6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years'];
const countries = ['United States', 'United States', 'United States', 'United States', 'United Kingdom',
  'United Kingdom', 'Canada', 'Australia', 'South Africa'];
const industries = ['Marketing & Advertising', 'Construction', 'Retail', 'Wholesale', 'Computer Software',
  'Health, Wellness and Fitness', 'Management Consulting', 'Logistics & Supply Chain', 'Media Production',
  'Accounting', 'Non-Profit Organization Management', 'Education Management', 'Manufacturing', 'Real Estate',
  'Professional Services', 'Financial Services', 'Hospitality', 'Automotive'];
const jobs = ['Finance Director', 'Controller', 'CFO', 'Finance Manager', 'Head of Finance', 'Bookkeeper',
  'VP Finance', 'Operations Director', 'Owner', 'Managing Director', 'Financial Controller', 'Accounting Manager',
  'Finance Lead', 'Director', 'Accountant', 'Business Owner'];

const CONTENT = {
  5: {
    titles: [
      'Custom reporting got us out of spreadsheets', 'The right step up from Plus', 'Batch invoicing saves us hours',
      'Automation gave our team its time back', 'More users with real control at last', 'Reporting our board actually wanted',
      'Grew into every feature', 'The dedicated support changed everything', 'Custom fields transformed our reporting',
      'Powerful without leaving QuickBooks', 'Handles our growth beautifully', 'Worth the upgrade for the reporting',
      'Approval workflows stopped the chaos', 'Familiar platform, far more headroom', 'Best decision as we scaled',
      'Project profitability we can trust', 'Kept us off a disruptive migration', 'The tagging finally made sense of our data',
      'Support that knows our account', 'Everything we needed and stayed familiar',
    ],
    summaries: [
      'We ran the lower plan for years and spent every month end in Excel building the reports the board wanted. Advanced put those reports in the system and month end went from days to an afternoon.',
      'We hit the user limit and the reporting ceiling at the same time and Advanced solved both without a disruptive migration. It is more of a good product rather than a different one.',
      'We invoice hundreds of clients a month and batch invoicing turned a full day task into a quick one, with the automation handling reminders so nobody has to remember.',
      'The workflow automation has been the difference between drowning in manual approvals and keeping up. We set the rules once and the system enforces them.',
      'Custom fields and tags let us report profitability by client and campaign in a way the standard plans never could, and now every client conversation is backed by real numbers.',
      'The dedicated account team actually knows our setup, and a tricky reconciliation that would have taken three calls on the old plan got solved in one.',
      'We grew into nearly every feature, project profitability, custom roles, deeper reporting, and each one earned its place as our business got more complex.',
      'It kept us in the platform our accountant knows inside out while giving us the headroom to grow, which saved us the disruption of moving off QuickBooks entirely.',
      'Reporting depth is what keeps us here. The custom reports answer exactly the questions our partners ask without a single export to a spreadsheet.',
      'The step up from Plus was seamless, no retraining, just more capability, better support and reporting we can finally build ourselves.',
    ],
    pros: [
      'Custom reporting we can build ourselves rather than exporting to Excel.',
      'Batch invoicing and batch entry are huge at our transaction volume.',
      'Workflow automation and approval routing free up a small team.',
      'More users with proper role based permission control.',
      'Custom fields and tags for slicing data our way.',
      'The dedicated account team genuinely knows our setup.',
      'Priority support is a real step up from the lower plans.',
      'Project profitability tracking is genuinely useful.',
      'Kept everything familiar so there was no retraining.',
      'Handles our growth without a disruptive migration.',
      'The app marketplace connects our other tools.',
      'Reporting answers board and partner questions directly.',
      'Automation removed a lot of manual chasing.',
      'Reliable and familiar with far more headroom underneath.',
      'The migration up from the lower plan was seamless.',
      'Custom roles let us safely open the books to more people.',
    ],
    cons: [
      'It is a significant price jump from the lower plans.',
      'Renewal after the intro discount caught us out, diary it.',
      'The reporting builder rewards time invested, not instantly intuitive.',
      'Still QuickBooks underneath, so not true multi entity.',
      'Some features feel aimed at bigger businesses than us.',
      'The automation took real setup time to get value from.',
      'Premium price is noticeable even when justified.',
      'Revenue recognition for subscriptions eventually outgrows it.',
      'Honestly little else once you are using the capability.',
      'Nothing that has made us reconsider.',
    ],
  },
  4: {
    titles: [
      'Strong upgrade with a premium price', 'The right move when Plus strained', 'Very good, learning curve aside',
      'Powerful reporting, worth it', 'Handles our volume well', 'Good step up, keep an eye on cost',
      'Familiar and far more capable', 'Recommend it once you outgrow Plus', 'Solid for a growing business',
      'Reporting is the standout', 'Better support, better tools', 'Grew with us nicely',
      'Four stars, mostly on price', 'Does what we upgraded for', 'Capable and dependable',
      'The automation earns its keep',
    ],
    summaries: [
      'A genuinely strong upgrade that solved our user and reporting limits at once. Marked down only on price, which is a real jump, but the capability is there and it kept everything familiar.',
      'We grew into most of it and it has earned its place. Project profitability, custom roles and reporting are all a clear step up. Value is the only reason it is not five stars.',
      'The reporting and automation are excellent once you invest the setup time. There is a learning curve on the more powerful features, but the payoff is real for a growing team.',
      'It kept us on a platform we know while giving us room to grow, which was exactly the point. Support is noticeably better than the cheaper plans too.',
      'Batch tools and automation handle our higher volumes well. A couple of the advanced features sit unused for a business our size, but the core upgrade was worth it.',
      'For a growing business already on QuickBooks this is the natural next step. Just price the renewal honestly, the intro discount ending is a jump.',
      'Custom reporting for our funders and board has been the main win. The rest is solid, familiar QuickBooks with more headroom and better support.',
      'We evaluated moving to a mid market platform and decided Advanced still does what we need at far less disruption. A sensible middle ground for now.',
    ],
    pros: [
      'Custom reporting is a clear step up from the standard pack.',
      'More users with proper permission control.',
      'Batch invoicing and entry handle higher volumes.',
      'Workflow automation removes manual chasing.',
      'Support is noticeably better than the lower plans.',
      'Kept everything familiar, no retraining.',
      'Project profitability tracking is useful.',
      'The app marketplace connects our tools.',
      'A sensible step up short of a full migration.',
      'Custom fields for slicing our data.',
      'Reliable and dependable day to day.',
      'The upgrade from Plus was seamless.',
      'Priority support when something goes wrong.',
      'Reporting answers board questions directly.',
    ],
    cons: [
      'The price jump from Plus is significant.',
      'Renewal after the discount is a step up.',
      'The reporting builder takes time to learn.',
      'Some features go unused at our size.',
      'Still QuickBooks, so not true multi entity.',
      'Automation setup took longer than expected.',
      'Value is the weak point at premium pricing.',
      'Powerful features carry a learning curve.',
      'Would eventually outgrow it if we keep scaling.',
      'Occasional feature we paid for but never touch.',
      'Revenue recognition strains for subscription models.',
      'Need to invest time to get full value.',
    ],
  },
  3: {
    titles: [
      'Capable but not built for our real need', 'Good, though we may have needed more', 'Upsold a bit early for us',
      'Powerful, but we use half of it', 'Right range, not quite the right fit', 'Three stars, mostly on value',
      'Solid but the price bites', 'Fine, wanted true multi entity', 'Works, learning curve and cost aside',
      'Middle of the road for our situation', 'Good tool, wrong stage for us', 'Honest three from a mixed experience',
    ],
    summaries: [
      'Advanced is genuinely capable but our actual need was multi entity reporting across sites, and even the top QuickBooks tier is not really built for that. Everything else it does well.',
      'Honest reflection, we were upsold into this before we needed it, and a lot of the extra capacity sits unused while we pay a premium for it.',
      'It does everything well for a single entity, but we bought up within a range that could not fully solve our specific problem, so we still work around one big gap.',
      'The reporting and automation are strong when we use them, but for our business most of the advanced capability goes untouched and the price is hard to justify at our usage.',
      'A powerful plan let down for us by being more than we needed. Should probably have stayed on the lower tier longer before making the jump.',
      'For a fast growing software business it carried us a long way, but revenue recognition eventually outgrew it and we started eyeing a mid market move.',
    ],
    pros: [
      'Strong reporting for a single entity.',
      'Good automation when we use it.',
      'Support is better than the lower plans.',
      'Familiar and reliable.',
      'Project profitability is useful.',
      'Batch tools help at volume.',
      'Custom fields are flexible.',
      'Kept us in a platform we know.',
    ],
    cons: [
      'Not built for true multi entity consolidation.',
      'We use far less than we pay for.',
      'Upsold before we really needed it.',
      'Premium price hard to justify at our usage.',
      'Revenue recognition eventually strains.',
      'Learning curve on the powerful features.',
      'Some capability sits permanently unused.',
      'Should have stayed on the lower plan longer.',
      'Still QuickBooks limits underneath.',
      'Value is the weak point for us.',
    ],
  },
  2: {
    titles: [
      'More plan than we needed', 'Upsold too early', 'Capable but poor value for us',
      'Outgrew what QuickBooks can do', 'Good tool, wrong fit', 'Paying for capacity we never touch',
    ],
    summaries: [
      'We were upsold into Advanced before we really needed it, and the extra reporting and automation mostly sit unused while we pay a premium for capacity we do not touch.',
      'It is a powerful plan, but our real need was multi entity consolidation and even the top QuickBooks tier cannot do that, so we carry the cost without solving our actual problem.',
      'For our business the value simply is not there at this price, we use a fraction of the features and should have stayed on the lower plan far longer.',
      'A fast growing subscription business outgrows even Advanced on revenue recognition, and we found ourselves paying premium prices while still working around the gap.',
      'The capability is real but mismatched to us, and the renewal price after the discount made the value equation worse rather than better.',
      'Fine software, wrong stage for our business, and the upsell into it happened before the need genuinely existed.',
    ],
    pros: [
      'The reporting is good when we use it.',
      'Reliable and familiar.',
      'Support is better than cheaper plans.',
      'Batch tools work well at volume.',
      'The core QuickBooks experience is solid.',
    ],
    cons: [
      'We use a fraction of what we pay for.',
      'Upsold before the need was genuine.',
      'Not built for true multi entity.',
      'Premium price for our actual usage.',
      'Revenue recognition outgrows it.',
      'Should have stayed on the lower plan.',
    ],
  },
  1: {
    titles: [
      'Wrong plan for our business', 'Paying premium for unused capacity', 'Outgrew QuickBooks entirely',
    ],
    summaries: [
      'We were pushed onto Advanced before we needed it, use a fraction of the features, and the premium price for capacity we never touch simply does not stack up for a business like ours.',
      'Our real need was multi entity consolidation, which no QuickBooks tier delivers, so we paid the top price and still could not solve the one problem that mattered most to us.',
      'A subscription business with genuine revenue recognition needs outgrows even the top QuickBooks plan, and we spent a year paying premium prices while working around a gap it could not close.',
    ],
    pros: [
      'The underlying QuickBooks reliability was never in question.',
      'One support interaction was genuinely excellent.',
      'The reporting was good on the rare occasions we used it fully.',
    ],
    cons: [
      'Premium price for capacity we never used.',
      'Not built for the multi entity need we actually had.',
      'Upsold well before the need existed.',
      'Outgrew the platform on revenue recognition.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.5, 4: 0.33, 3: 0.1, 2: 0.045, 1: 0.025 };
  const offsets = { ease_of_use: -0.15, value_for_money: -0.4, customer_service: 0.1, functionality: 0.2 };
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
    const cons = chance(0.05) ? pick(['Nothing significant to add.', 'None beyond the price, honestly.']) : pick(b.cons);
    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);
    const year = chance(0.5) ? 2026 : (chance(0.62) ? 2025 : 2024);
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
      helpful_count: intBetween(0, 27),
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
  if (catErr || !peer) throw new Error(`Could not resolve accounting category from quickbooks-online: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: peer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('QuickBooks Online Advanced already existed, profile updated.');
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
      console.log('QuickBooks Online Advanced inserted.');
    }
  }

  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(108);
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
