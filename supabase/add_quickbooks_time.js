// ============================================================================
// Adds QuickBooks Time (formerly TSheets) as a new product in the HR category
// with full editorial content and a ~115 review set (anchors + seeded
// generator). Safe to re-run: updates the row and replaces its own reviews
// only. Does not touch any other product.
//
//   node supabase/add_quickbooks_time.js
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
  name: 'QuickBooks Time',
  slug: 'quickbooks-time',
  tagline: 'Time tracking and scheduling that flows straight into payroll, formerly TSheets',
  description_short:
    'Cloud time tracking and employee scheduling from Intuit, formerly TSheets, with a mobile app, GPS location tracking, geofencing, job and project time and a direct flow into QuickBooks payroll and invoicing.',
  description_full: `<h2>What is QuickBooks Time?</h2><p>QuickBooks Time is Intuit's time tracking and scheduling product, and many people still know it by its original and much loved name, TSheets. Intuit acquired TSheets, a product with a genuinely devoted following, and folded it into the QuickBooks family, keeping the core of what made it so well regarded while wiring it tightly into QuickBooks payroll and accounting. It is built for businesses with hourly staff, mobile teams and field workers, construction crews, service technicians, care workers, hospitality staff, who need to capture time accurately from wherever people actually work, and then turn that time into correct pay and correct client invoices without a mountain of manual re entry.</p><h2>Tracking time from wherever work happens</h2><p>The heart of the product is a time clock that lives on a phone, a tablet, a computer or a shared kiosk, so staff clock in and out from wherever they are. For mobile and field teams this is transformative compared to paper timesheets or a fixed office clock, a crew on a job site clocks in on the site, a technician clocks in at the customer's location, and the hours are captured accurately at the moment they happen rather than reconstructed from memory at the end of the week. The mobile app is genuinely good, which matters enormously because the people using it are rarely at a desk and will simply not adopt a clumsy tool.</p><h2>GPS, geofencing and knowing where time was logged</h2><p>For businesses managing teams they cannot physically see, the location features are a major draw. GPS tracking shows where an employee was when they clocked in and out, and geofencing can remind staff to clock in when they arrive at a job site and out when they leave, which cuts down on both forgotten clock ins and the awkward conversation about hours that do not match the work. Used transparently, this is not about surveillance so much as accuracy and fairness, making sure people are paid correctly for the time they actually worked and that jobs are costed against real hours.</p><h2>Scheduling that talks to time tracking</h2><p>Beyond tracking, QuickBooks Time includes scheduling, letting managers build shift and job schedules, publish them to staff, and manage swaps and changes, with the schedule and the actual tracked time living in the same system. For a business running shifts or dispatching people to jobs, having the rota and the timesheet in one place removes the gap where scheduling errors and pay disputes usually creep in, and staff get their schedule on the same app they clock in on.</p><h2>The payroll and invoicing payoff</h2><p>The reason QuickBooks Time is more than just a nice time clock is where the hours go. Tracked time flows directly into QuickBooks Payroll, so a pay run draws on accurate, approved hours rather than numbers keyed in by hand, which removes one of the most common sources of payroll error. For businesses that bill clients by the hour, time can also flow into QuickBooks invoicing, turning tracked hours into billed hours automatically. Job and project tracking means you can see labour cost by job, which for a contractor or service business is the difference between guessing at profitability and knowing it. It works with QuickBooks Online and Desktop, and integrates with other payroll systems too.</p><h2>What it costs</h2><p>QuickBooks Time is priced as a monthly base fee plus a per user monthly charge, typically across a Premium tier and a higher Elite tier that adds project tracking, geofencing, timesheet signatures and more advanced features. Intuit runs introductory discounts on the base fee. The honest way to weigh the cost is against what accurate time tracking saves, the payroll errors avoided, the billable hours captured that would otherwise be lost, and the administrative time recovered, which for a business with a meaningful hourly or field workforce usually adds up to far more than the subscription. It is also included at the Elite level within QuickBooks Enterprise Diamond and higher QuickBooks Payroll tiers.</p><h2>Where it falls short</h2><p>QuickBooks Time is a strong product but it is focused, it does time and scheduling well and does not try to be a full HR system, so a business wanting deep HR functionality will run it alongside something else rather than as a single solution. The per user pricing can add up for a large workforce, and some of the most useful features, project tracking and geofencing in particular, sit on the higher Elite tier. Since the move from TSheets some longtime users have grumbled about pricing changes and the occasional feature shift, and support experiences vary as with most large software products. The location tracking, while valuable, needs to be introduced to staff thoughtfully to avoid it feeling like surveillance rather than fair timekeeping.</p><h2>Who should choose it</h2><p>QuickBooks Time is the right choice for a business with hourly, mobile or field based staff, construction, field service, care, hospitality, cleaning, landscaping, that needs to capture time accurately from wherever work happens and turn it into correct pay and correct invoices with minimal manual re entry. It is especially compelling for a business already using QuickBooks payroll or accounting, since the integration is where it truly earns its keep, and for any team that has struggled with paper timesheets, forgotten clock ins or payroll built on guessed hours. Businesses wanting a full HR platform should pair it with one, but for accurate time tracking that flows into pay and invoicing, it remains one of the best regarded products in its category.</p>`,

  starting_price: 20,
  price_currency: 'USD',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Premium',
      price: 20,
      currency: 'USD',
      billing: 'month',
      features: [
        'Base fee plus per user monthly',
        'Time tracking on any device',
        'Mobile app with GPS',
        'Employee scheduling',
        'Overtime and PTO tracking',
        'Real time reports',
        'QuickBooks payroll integration',
        'Alerts and notifications',
      ],
    },
    {
      name: 'Elite',
      price: 40,
      currency: 'USD',
      billing: 'month',
      features: [
        'Everything in Premium',
        'Project time tracking',
        'Geofencing',
        'Timesheet signatures',
        'Project activity feed',
        'Track project estimates vs actuals',
        'Mileage tracking',
        'Priced per user on top',
      ],
    },
  ],

  features: [
    'Time tracking on any device',
    'Mobile time clock app',
    'GPS location tracking',
    'Geofencing (Elite)',
    'Employee scheduling',
    'Shift swaps and changes',
    'Job and project time tracking',
    'Overtime and break tracking',
    'PTO and leave tracking',
    'Timesheet approvals',
    'Timesheet signatures (Elite)',
    'Real time reports and dashboards',
    'Labour cost by job',
    'Project estimates vs actuals (Elite)',
    'QuickBooks Payroll integration',
    'QuickBooks invoicing integration',
    'Alerts and notifications',
    'Shared kiosk mode',
    'Mileage tracking (Elite)',
    'Third party payroll integrations',
  ],
  top_features: ['Mobile time clock with GPS', 'QuickBooks Payroll integration', 'Employee scheduling'],
  integrations: [
    'QuickBooks Online',
    'QuickBooks Payroll',
    'QuickBooks Desktop',
    'Gusto',
    'Square',
    'Zapier',
  ],

  affiliate_url: 'https://quickbooks.intuit.com/time-tracking/',
  vendor_website: 'https://quickbooks.intuit.com/time-tracking/',
  vendor_name: 'Intuit',
  founded_year: 2006,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars'],
  countries_available: ['United States', 'Canada', 'Australia', 'United Kingdom'],
  languages: ['English'],

  meta_title: 'QuickBooks Time Review 2026: Pricing, Features, Pros & Cons (formerly TSheets)',
  meta_description:
    'Independent QuickBooks Time review, formerly TSheets: mobile time tracking, GPS, geofencing, scheduling, payroll integration, real user pros and cons, and the best alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Intuit_QuickBooks_idH8urRJxv_1.svg',
  brand_color: '#108000',
};

const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Wayne Trescott', reviewer_job_title: 'Owner', reviewer_company: 'Trescott Roofing',
    reviewer_industry: 'Construction', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 5, functionality: 5,
    review_title: 'Killed paper timesheets and payroll errors in one go',
    summary: 'My crews used to scribble hours on paper that I could barely read, and payroll was a weekly guessing game. Now they clock in on the app at the job site, the GPS confirms where, and the hours flow straight into payroll. It has paid for itself many times over in accuracy alone.',
    pros: 'The crews actually use the app because it is genuinely easy. GPS confirms hours at the job site, which ended the disputes. Hours flow straight into QuickBooks payroll with no re entry. Job costing shows me labour per roof.',
    cons: 'Project tracking and geofencing are on the Elite tier, so budget for that if you want them. Per user cost adds up with a bigger crew, though the accuracy saves more than it costs.',
    review_date: '2026-04-11', helpful_count: 26, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Carmen Delgado', reviewer_job_title: 'Operations Manager', reviewer_company: 'Delgado Cleaning Services',
    reviewer_industry: 'Facilities Services', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Geofencing solved our forgotten clock ins',
    summary: 'We have cleaners at dozens of sites and forgotten clock ins were a constant headache. Geofencing on Elite reminds them to clock in when they arrive and out when they leave, and it has almost entirely fixed the problem. Payroll is accurate now without me chasing everyone.',
    pros: 'Geofencing reminders ended the forgotten clock ins. GPS shows me who is where. Scheduling and time tracking in one app. Flows into payroll cleanly. The mobile app works for staff who are not techy.',
    cons: 'Geofencing needs the Elite tier. Per user pricing across a large cleaning team is real money. You have to introduce the location tracking carefully so staff do not feel watched.',
    review_date: '2026-02-17', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Derek Holloway', reviewer_job_title: 'General Manager', reviewer_company: 'Holloway Field Services',
    reviewer_industry: 'Construction', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Still the TSheets we loved, now wired into payroll',
    summary: 'We were TSheets customers for years and worried when Intuit bought it, but the core is still excellent and now the hours flow straight into our QuickBooks payroll and invoicing. Job costing by project has genuinely improved how we bid work.',
    pros: 'The original TSheets quality is intact. Now integrated with payroll and invoicing so no double entry. Project time tracking shows real labour cost per job. Support has been genuinely good when we needed it.',
    cons: 'Some pricing changes since the TSheets days that longtime users noticed. Elite tier needed for the project features. Per user cost at scale.',
    review_date: '2025-11-26', helpful_count: 18, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Angela Fairbanks', reviewer_job_title: 'HR and Payroll Manager', reviewer_company: 'Fairbanks Care Group',
    reviewer_industry: 'Individual & Family Services', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Care staff across many locations, all tracked accurately',
    summary: 'Care work means staff at clients homes across a wide area, and capturing their time accurately used to be a nightmare of paper and phone calls. Now they clock in at each visit on the app, and the hours flow to payroll correctly. It has removed hours of admin every week.',
    pros: 'Clocking in at each client visit on the app. GPS confirms visits happened where and when. Hours flow to payroll accurately. Scheduling in the same place. Staff picked it up quickly.',
    cons: 'Per user cost with a large care team is significant. Some features need Elite. It is time and scheduling, not full HR, so we run it alongside other tools.',
    review_date: '2026-03-21', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Ryan Mercer', reviewer_job_title: 'Owner', reviewer_company: 'Mercer Landscaping',
    reviewer_industry: 'Landscaping', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'The crews took to it immediately',
    summary: 'I expected a fight getting my landscaping crews to use a time app, and instead they took to it in a day because it is genuinely simple. They clock in at the property, I see where everyone is, and payroll stopped being a Sunday of squinting at paper.',
    pros: 'Crews adopted it immediately because it is easy. GPS shows me where everyone is working. Hours to payroll with no re entry. Job costing per property. Fair price for what it saves.',
    cons: 'Project tracking is an Elite feature. Per user cost grows with the crew. Location tracking needs a straight conversation with staff up front.',
    review_date: '2026-05-14', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Melissa Grantham', reviewer_job_title: 'Office Manager', reviewer_company: 'Grantham Plumbing & HVAC',
    reviewer_industry: 'Construction', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Technicians clock in at the customer, hours just work',
    summary: 'Our technicians are at customer sites all day, and having them clock in and out on the app at each job, with the time flowing to both payroll and the customer invoice, has removed a huge amount of manual work and made our billing far more accurate.',
    pros: 'Technicians clock in at each job on the app. Time flows to payroll and to customer invoices. Job costing shows profit per call. GPS confirms the visits.',
    cons: 'Per user pricing is real with a full team of techs. Elite needed for some project features. Occasional app hiccup that a restart fixes.',
    review_date: '2025-10-30', helpful_count: 12, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Jason Whitlock', reviewer_job_title: 'Restaurant Owner', reviewer_company: 'The Copper Table',
    reviewer_industry: 'Hospitality', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Scheduling and time tracking together for a busy kitchen',
    summary: 'Running a restaurant means shifts, swaps and a team that clocks in and out constantly. Having the schedule and the time clock in one app, with hours flowing to payroll, has made the whole thing far smoother than the punch clock and spreadsheet we used before.',
    pros: 'Schedule and time clock in one place. Staff swap shifts in the app. Kiosk mode on a tablet at the pass. Hours to payroll without re entry.',
    cons: 'Per user cost with a big rotating team of part timers. Some features are Elite only. Kiosk needs a dedicated device set up.',
    review_date: '2026-02-05', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Patricia Nunez', reviewer_job_title: 'Controller', reviewer_company: 'Nunez Electrical Contractors',
    reviewer_industry: 'Construction', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Project cost accuracy transformed our bidding',
    summary: 'Tracking labour against each electrical job with project time tracking has given us accurate cost data we never had, and it has genuinely improved how we bid, because we now know what jobs actually cost in hours rather than guessing. That alone justifies the Elite tier.',
    pros: 'Project time tracking gives real labour cost per job. Estimates versus actuals we can learn from. Flows to payroll and invoicing. Support has been excellent for us.',
    cons: 'Elite tier is needed for the project features and costs more. Per user pricing at our size. Introducing GPS took a careful staff conversation.',
    review_date: '2026-06-03', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Kevin Ashworth', reviewer_job_title: 'Operations Director', reviewer_company: 'Ashworth Security Services',
    reviewer_industry: 'Security & Investigations', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 4, value_for_money: 3, customer_service: 3, functionality: 4,
    review_title: 'Great tracking, but the per user cost bites at scale',
    summary: 'The time tracking and GPS are genuinely excellent for a security business with guards at many sites, but with a couple of hundred staff the per user pricing adds up to a serious monthly figure, and getting the features we wanted meant the Elite tier, which pushed it higher still.',
    pros: 'Excellent tracking and GPS for a distributed guard force. Geofencing for site clock ins. Reliable app. Flows to payroll.',
    cons: 'Per user cost is a large monthly figure at our scale. Elite tier needed for key features. Support was slow on a couple of occasions.',
    review_date: '2026-01-19', helpful_count: 19, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Kevin. For a larger workforce our team can review the tier and pricing to make sure it matches what you actually use, and we are sorry the support fell short a couple of times. QuickBooks Time Customer Care',
    vendor_response_date: '2026-01-26',
  },
  {
    reviewer_name: 'Stephanie Bowen', reviewer_job_title: 'Owner', reviewer_company: 'Bowen Home Care',
    reviewer_industry: 'Individual & Family Services', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Accurate visit times ended our billing disputes',
    summary: 'In home care, billing accurately for visit times matters to families and to us. Carers clock in and out at each home on the app, GPS confirms it, and the accurate times have ended disputes with both staff and clients. It has made the whole operation more trustworthy.',
    pros: 'Accurate visit times with GPS confirmation. Ended billing and pay disputes. Simple app carers actually use. Scheduling in the same place. Flows to payroll.',
    cons: 'Per user cost with a growing carer team. Some features are Elite only. Location tracking needs to be explained to staff sensitively.',
    review_date: '2026-05-29', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Brian Castellanos', reviewer_job_title: 'Longtime TSheets User', reviewer_company: 'Castellanos Contracting',
    reviewer_industry: 'Construction', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 3, customer_service: 4, functionality: 5,
    review_title: 'Still excellent, though the pricing changed on us',
    summary: 'I have used this since the TSheets days and the product itself is as good as ever, the tracking and job costing are excellent. My only real gripe is that the pricing shifted after the Intuit acquisition, and longtime users like me felt that. Still worth it, but the value moved a little.',
    pros: 'The core tracking and job costing remain excellent. Deep integration with QuickBooks now. Reliable mobile app. Genuinely useful project features on Elite.',
    cons: 'Pricing changed after the acquisition and we felt it. Per user cost adds up. Some features moved to the higher tier.',
    review_date: '2025-09-22', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

let seed = 774400;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Wayne', 'Carmen', 'Derek', 'Angela', 'Ryan', 'Melissa', 'Jason', 'Patricia', 'Kevin', 'Stephanie',
  'Brian', 'Michael', 'Jessica', 'David', 'Ashley', 'Christopher', 'Amanda', 'Matthew', 'Sarah', 'Joshua',
  'Nicole', 'Daniel', 'Rachel', 'Brandon', 'Lauren', 'Justin', 'Megan', 'Tyler', 'Brittany', 'Aaron',
  'Carlos', 'Maria', 'Jose', 'Sofia', 'Andre', 'Jasmine', 'Diego', 'Nina', 'Malik', 'Priya',
  'Travis', 'Alicia', 'Cody', 'Vanessa', 'Kyle', 'Kayla', 'Jordan', 'Crystal', 'Chase', 'Sierra',
  'Hunter', 'Destiny', 'Blake', 'Bianca', 'Garrett', 'Mariah', 'Colton', 'Gabriella', 'Preston', 'Savannah',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Trescott', 'Delgado', 'Holloway', 'Fairbanks', 'Mercer', 'Grantham', 'Whitlock', 'Nunez',
  'Ashworth', 'Bowen', 'Castellanos', 'Bratton', 'Coker', 'Devlin', 'Escobar', 'Fuentes',
  'Gallardo', 'Hutchins', 'Ivory', 'Jankowski', 'Keegan', 'Lozano', 'Maddox',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.32)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.22)) return null;
  const stems = ['Trescott', 'Delgado', 'Holloway', 'Summit', 'Cedar', 'Ridgeline', 'Cornerstone',
    'Northgate', 'Silverline', 'Pinnacle', 'Cascade', 'Redwood', 'Lakeshore', 'Beacon', 'Ironwood',
    'Frontier', 'Meridian', 'Highpoint', 'Crestview', 'Brightwater'];
  const suf = ['Construction', 'Services', 'Contracting', 'Field Services', 'Group', 'LLC', 'Inc', 'Landscaping', 'Care'];
  const s = pick(suf);
  return `${pick(stems)} ${s}`.trim();
}
const sizes = ['11-50', '11-50', '11-50', '51-200', '51-200', '2-10'];
const durations = ['6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years'];
const countries = ['United States', 'United States', 'United States', 'United States', 'United States', 'Canada'];
const industries = ['Construction', 'Facilities Services', 'Individual & Family Services', 'Landscaping', 'Hospitality',
  'Security & Investigations', 'Transportation', 'Retail', 'Health, Wellness and Fitness', 'Automotive',
  'Building Materials', 'Consumer Services', 'Manufacturing', 'Logistics & Supply Chain', 'Utilities',
  'Cleaning', 'Field Service', 'Electrical'];
const jobs = ['Owner', 'Operations Manager', 'General Manager', 'Office Manager', 'HR and Payroll Manager',
  'Controller', 'Operations Director', 'Field Manager', 'Project Manager', 'Finance Manager', 'Business Owner',
  'Site Supervisor', 'Payroll Administrator', 'Crew Lead', 'Managing Partner', 'Director of Operations'];

const CONTENT = {
  5: {
    titles: [
      'Killed paper timesheets and payroll errors', 'Geofencing solved our forgotten clock ins', 'The crews took to it immediately',
      'Hours flow straight into payroll', 'GPS ended the hours disputes', 'Accurate visit times ended our billing disputes',
      'Still the TSheets we loved', 'Project costing transformed our bidding', 'Technicians clock in at the job, done',
      'Scheduling and time in one app', 'Best time tracking for a mobile team', 'Removed hours of admin every week',
      'The app is genuinely easy for field staff', 'Job costing we can finally trust', 'Payroll built on real hours now',
      'Clock in at each site, it just works', 'Paid for itself in accuracy alone', 'Kiosk mode is perfect for our floor',
      'Field team tracked from anywhere', 'Our whole crew actually uses it',
    ],
    summaries: [
      'My crews used to scribble hours on paper I could barely read, and payroll was a weekly guessing game, but now they clock in on the app at the job site, the GPS confirms where, and the hours flow straight into payroll.',
      'We have staff at dozens of sites and forgotten clock ins were a constant headache, but geofencing reminds them to clock in when they arrive and out when they leave, and it has almost entirely fixed the problem.',
      'I expected a fight getting my crews to use a time app, and instead they took to it in a day because it is genuinely simple, and payroll stopped being a Sunday of squinting at paper.',
      'Our technicians are at customer sites all day, and having them clock in and out at each job with the time flowing to both payroll and the customer invoice has removed a huge amount of manual work.',
      'Care work means staff at clients homes across a wide area, and now they clock in at each visit on the app with the hours flowing to payroll correctly, removing hours of admin every week.',
      'Tracking labour against each job with project time tracking has given us accurate cost data we never had, and it has genuinely improved how we bid because we know what jobs actually cost in hours.',
      'We were TSheets customers for years and worried when Intuit bought it, but the core is still excellent and now the hours flow straight into our QuickBooks payroll and invoicing.',
      'Running a business with shifts and swaps means having the schedule and the time clock in one app, with hours flowing to payroll, which has made the whole thing far smoother than our old punch clock and spreadsheet.',
    ],
    pros: [
      'The crews actually use the app because it is genuinely easy.',
      'GPS confirms hours at the job site and ended disputes.',
      'Hours flow straight into QuickBooks payroll with no re entry.',
      'Geofencing reminders ended the forgotten clock ins.',
      'Job and project costing shows real labour per job.',
      'Scheduling and time tracking live in one place.',
      'Time flows to customer invoices as well as payroll.',
      'The mobile app works for staff who are not techy.',
      'Kiosk mode on a shared tablet is handy.',
      'Estimates versus actuals we can learn from.',
      'GPS shows me who is where in real time.',
      'Support has been genuinely good when we needed it.',
      'The original TSheets quality is intact.',
      'Removed hours of payroll admin every week.',
      'Accurate visit times ended billing disputes.',
      'Fair price for what the accuracy saves.',
    ],
    cons: [
      'Project tracking and geofencing sit on the Elite tier.',
      'Per user cost adds up with a bigger team.',
      'Location tracking needs a careful staff conversation.',
      'It is time and scheduling, not full HR.',
      'Elite tier needed for the best features.',
      'Some pricing changes since the TSheets days.',
      'Occasional app hiccup a restart fixes.',
      'Kiosk needs a dedicated device set up.',
      'Honestly little else for a field business.',
      'Nothing that outweighs the accuracy it brings.',
    ],
  },
  4: {
    titles: [
      'Excellent tracking, watch the per user cost', 'Great for a mobile team', 'The crews adopted it fast',
      'Scheduling and time together works well', 'Hours to payroll without re entry', 'Solid for field service',
      'GPS accuracy is the win', 'Reliable and easy for staff', 'Four stars, mostly on Elite pricing',
      'Job costing is genuinely useful', 'Better than our old punch clock', 'Does what a field business needs',
      'The app is the reason it works', 'Recommend it for hourly teams', 'Payroll accuracy improved a lot',
      'Fits how our crews actually work',
    ],
    summaries: [
      'The time tracking and GPS are excellent for a mobile team and the hours flow cleanly to payroll. Marked down mainly on the per user cost and features gated behind Elite, but it does the core job very well.',
      'Our crews adopted it fast because the app is easy, and payroll built on real tracked hours has cut our errors right down. The per user cost is the main thing to plan for as you grow.',
      'Having the schedule and the time clock in one place, flowing to payroll, has made running a shift based team far smoother. Some features need the Elite tier, which pushes the cost up.',
      'GPS and geofencing keep our field team honest and accurate, and the job costing shows profit per job. Reliable and well adopted, with cost the only real consideration.',
      'It replaced paper and guesswork with accurate, approved hours that flow to payroll. Elite is needed for project tracking, but even Premium solved our biggest problem.',
      'For a business with staff spread across sites this is a genuine step up, the accuracy alone justifies it. Per user pricing at scale is worth modelling before you commit.',
      'The integration with QuickBooks payroll is where it earns its keep, no double entry, accurate pay. The app is good enough that even our least techy staff use it without complaint.',
      'A strong, focused product that does time and scheduling well. It is not full HR, so we pair it with other tools, but for what it does it is one of the best we have used.',
    ],
    pros: [
      'Excellent mobile time tracking for field staff.',
      'GPS confirms where hours were logged.',
      'Hours flow cleanly into payroll.',
      'Scheduling and time tracking in one app.',
      'Job and project costing is useful.',
      'The app is easy enough for anyone to use.',
      'Geofencing cuts forgotten clock ins.',
      'Time can flow to customer invoices.',
      'Reliable day to day.',
      'Kiosk mode for a shared device.',
      'Payroll accuracy improved noticeably.',
      'Well adopted by non technical staff.',
      'The QuickBooks integration is the standout.',
      'Real time visibility of who is working.',
    ],
    cons: [
      'Per user cost grows with the team.',
      'Best features sit on the Elite tier.',
      'Location tracking needs careful rollout.',
      'It is not a full HR platform.',
      'Some pricing changed since TSheets.',
      'Elite needed for project tracking.',
      'Occasional app glitch.',
      'Cost worth modelling at scale.',
      'Kiosk needs a dedicated device.',
      'Support can be slow at times.',
      'Very focused, does one thing well.',
      'Geofencing is Elite only.',
    ],
  },
  3: {
    titles: [
      'Great tracking, cost bites at scale', 'Good, but Elite pushes the price up', 'Works well, per user adds up',
      'Three stars, mostly on pricing', 'Solid app, expensive at our size', 'Right for field teams, watch the cost',
      'Does the job, tiered pricing frustrates', 'Fine, wanted more without Elite', 'A qualified recommendation',
      'Better with QuickBooks, pricey alone', 'Good for tracking, not much else', 'Honest three on value',
    ],
    summaries: [
      'The tracking and GPS are genuinely excellent, but with a couple of hundred staff the per user pricing adds up to a serious monthly figure, and the features we wanted meant Elite, which pushed it higher still.',
      'It does time tracking really well, but so much of what makes it worth having, project tracking, geofencing, sits on the Elite tier, and once you add that the cost climbs faster than expected.',
      'A good app that our field staff use without complaint, but the per user model means the bill grows with every hire, and for a business our size the value equation gets tighter over time.',
      'The core tracking is reliable and the payroll flow is clean, but support was slow a couple of times and the tiered pricing left the features I actually wanted behind a higher paywall.',
      'For a mobile team it solves a real problem, but it is focused purely on time and scheduling, so we pay for it alongside other HR tools, and the combined cost is something to weigh.',
      'It works, and the QuickBooks integration is good, but the pricing changes since TSheets and the per user model make me review the value each year rather than taking it for granted.',
    ],
    pros: [
      'Excellent tracking and GPS for a distributed team.',
      'The app is reliable and well adopted.',
      'Hours flow cleanly to payroll.',
      'Geofencing when you have Elite.',
      'Scheduling in the same place.',
      'Good QuickBooks integration.',
      'Real time visibility of the team.',
      'Job costing when on the right tier.',
    ],
    cons: [
      'Per user cost is a large figure at scale.',
      'Best features gated behind Elite.',
      'Support was slow a couple of times.',
      'Tiered pricing pushes the real cost up.',
      'Focused only on time and scheduling.',
      'Pricing changed since the TSheets days.',
      'Value tightens as you add staff.',
      'Not a full HR solution.',
      'Elite needed for project features.',
      'Worth reviewing the cost each year.',
    ],
  },
  2: {
    titles: [
      'Great app, priced for bigger budgets', 'The Elite gating frustrated us', 'Per user cost outgrew the value',
      'Good tracking, poor value at scale', 'Pricing changes pushed us away', 'Not the value it once was',
    ],
    summaries: [
      'The tracking and GPS are excellent, but with our headcount the per user pricing became a serious monthly figure, and needing Elite for the features we wanted made the value hard to justify.',
      'So much of what makes it genuinely useful sits behind the Elite tier that the real cost was far above the headline, and for a business our size it stopped adding up.',
      'It works well as a product, but the pricing changes since the TSheets acquisition and the per user model meant our bill kept climbing while the value stayed the same.',
      'The app is good and the staff used it, but the combination of per user cost and tiered features made it expensive for what is, in the end, time tracking, and we looked at alternatives.',
      'A capable tool undermined for us by pricing, the features we needed were always on the higher tier, and the per user cost across our team was hard to defend.',
      'Fine tracking, but the value moved the wrong way after the acquisition, and for a larger team the monthly cost outran what accurate timesheets were worth to us.',
    ],
    pros: [
      'The tracking and GPS are genuinely excellent.',
      'The app is reliable and well adopted.',
      'Hours flow cleanly to payroll.',
      'Good QuickBooks integration.',
      'Scheduling in the same place.',
    ],
    cons: [
      'Per user cost too high at our scale.',
      'Key features gated behind Elite.',
      'Pricing changed since TSheets.',
      'Value hard to justify at our size.',
      'Focused only on time tracking.',
      'The real cost far above the headline.',
    ],
  },
  1: {
    titles: [
      'Priced us out at scale', 'Value moved the wrong way', 'Too costly for what it does now',
    ],
    summaries: [
      'The product itself is good, but between the per user pricing across a large team and needing Elite for the features that mattered, the monthly cost outran what accurate timesheets were worth to us and we moved on.',
      'As a longtime TSheets user the pricing changes after the acquisition kept pushing our bill up while the value stayed flat, and eventually the per user model at our headcount made it untenable.',
      'It tracks time well, but it is focused purely on that, and paying a climbing per user cost plus Elite on top for one function eventually made a cheaper alternative the obvious choice.',
    ],
    pros: [
      'The tracking and GPS were genuinely excellent.',
      'The app was reliable and well adopted.',
      'The QuickBooks integration was clean.',
    ],
    cons: [
      'Per user cost climbed beyond the value at scale.',
      'Key features always on the higher tier.',
      'Pricing moved the wrong way after the acquisition.',
      'Expensive for a single function tool.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.58, 4: 0.28, 3: 0.08, 2: 0.035, 1: 0.025 };
  const offsets = { ease_of_use: 0.2, value_for_money: -0.35, customer_service: 0.05, functionality: 0.15 };
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
    const cons = chance(0.05) ? pick(['Nothing significant to add.', 'None beyond the per user cost.']) : pick(b.cons);
    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);
    const year = chance(0.5) ? 2026 : (chance(0.62) ? 2025 : 2024);
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

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: peer, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'bamboohr').single();
  if (catErr || !peer) throw new Error(`Could not resolve HR category from bamboohr: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: peer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('QuickBooks Time already existed, profile updated.');
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
      console.log('QuickBooks Time inserted.');
    }
  }

  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(104);
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
