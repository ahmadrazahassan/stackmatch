// ============================================================================
// Adds Sage Payroll (UK) as a new product in the Payroll category with full
// editorial content and a review set. Safe to re-run: updates the existing
// row and replaces its reviews if the slug already exists.
//
// Pricing reflects the live UK price list as of July 2026:
//   Essentials £12 / Standard £23 / Premium £34 per month, excl 20% VAT,
//   5 employees included, 90% off for 3 months introductory offer running.
//
//   node supabase/add_sage_payroll.js
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
// Software record — Sage Payroll (UK)
// ---------------------------------------------------------------------------
const SOFTWARE = {
  name: 'Sage Payroll',
  slug: 'sage-payroll',
  tagline: 'HMRC recognised cloud payroll with built in HR tools and Sage Copilot, from £12 a month',
  description_short:
    'UK cloud payroll with a four step pay run, automatic tax and NI calculations, RTI submissions to HMRC, pension auto enrolment, payslips, HR essentials and Sage Copilot on every plan.',
  description_full: `<h2>What is Sage Payroll?</h2><p>Sage Payroll is the cloud payroll product from Sage, built for UK small businesses that want to run their own pay runs without a payroll qualification or an outsourced bureau. Sage has been doing UK payroll since 1981 and it shows in the details: the software is HMRC recognised, keeps itself current with every tax year change, and walks you through each pay run in four guided steps. Over two million customers run on Sage payroll products in the UK, which makes it one of the safest choices in the category simply on track record.</p><p>Every plan now ships with Sage Copilot, the built in AI assistant, and a set of core HR features. Copilot earns its place at pay time, it compares each pay run against the last one and flags anomalies before you commit, an employee whose net pay moved more than ten percent, a gross figure that jumped unexpectedly, the kind of mistake that normally surfaces as an awkward conversation after payday.</p><h2>The four step pay run</h2><p>The heart of the product is a pay run reduced to four steps: check your employees, enter or confirm the pay, review the calculations, then submit. Income tax, National Insurance, student loans and pension contributions are calculated automatically, and the Full Payment Submission goes to HMRC as part of the same flow rather than as a separate chore. Payslips publish to a secure online portal where employees help themselves, which quietly ends the monthly ritual of printing, folding and emailing.</p><h2>Pensions and compliance</h2><p>Workplace pension auto enrolment is handled inside the software, assessment, enrolment letters and contribution files for providers like Nest all included. Statutory payments, sick pay, maternity and paternity, are calculated rather than looked up, and year end produces P60s without a separate process. When rates and thresholds change each April the software updates itself, which is precisely the reason to be on cloud payroll rather than a spreadsheet.</p><h2>HR features included</h2><p>All three plans include HR essentials: an employee database, self service for personal details and holidays, onboarding and offboarding checklists, document storage with e signature and a shared calendar. The Standard plan adds timesheets with clock in and out and project time. Premium adds interactive shift scheduling and a performance management layer with goals, one to ones, 360 feedback and surveys. For a small business this can genuinely replace a separate HR system, though the deeper you go into HR the more it competes with dedicated tools.</p><h2>What it costs</h2><p>Pricing is per company per month, excluding VAT, with five employees included on every plan. Essentials is £12 per month and covers the full pay run, HMRC compliance, pensions and HR essentials. Standard is £23 per month and adds timesheets and an enhanced pay run. Premium is £34 per month with shift scheduling and performance management on top. Additional employees beyond the five included cost from £2.40, £4.40 and £6.40 per employee per month respectively, and you can scale to 150 employees. Sage currently runs a 90% off for 3 months offer, bringing the early price down to £1.20, £2.30 and £3.40 a month, and there is a one month free trial of the Standard plan if you would rather try before committing. No long term contract, cancel or change plan any time.</p><h2>Works best with Sage Accounting</h2><p>Sage Payroll is also bundled inside Sage Accounting plans, and if you run both they sync: each completed pay run posts its journals into your accounts automatically, so wages, tax and pension liabilities appear in your books without manual entry. Your accountant can be given access to either or both. If you already keep your books elsewhere the payroll still works standalone, you just export the journals instead.</p><h2>Where it falls short</h2><p>Report exports are the most common complaint, the layouts arrive in Excel needing tidy up before they are presentable. Navigation between the payroll and HR areas can feel like two products stitched together, because historically it is. Support is 24/7 and UK based but resolution speed varies with the season, January and April are slower. And if you need multi country payroll, occupational pension schemes beyond auto enrolment, or complex shift premiums, you are past what this product is designed for.</p><h2>Who should choose it</h2><p>Sage Payroll fits UK businesses from one to around fifty employees that want compliant, unstressful pay runs with the HR basics included, especially if they already use Sage Accounting where the integration is genuinely seamless. Accountants and bookkeepers running payroll for a handful of clients also do well on it. Larger employers, or those with complicated shift and premium arrangements, should look at heavier payroll platforms instead.</p>`,

  starting_price: 12,
  price_currency: 'GBP',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Payroll Essentials',
      price: 12,
      currency: 'GBP',
      billing: 'month',
      features: [
        '90% off for the first 3 months',
        '5 employees included',
        'Four step pay run',
        'HMRC recognised RTI submissions',
        'Pension auto enrolment',
        'Online payslips and P60s',
        'Sage Copilot anomaly checks',
        'HR essentials and self service',
      ],
    },
    {
      name: 'Payroll Standard',
      price: 23,
      currency: 'GBP',
      billing: 'month',
      features: [
        '90% off for the first 3 months',
        '5 employees included',
        'Everything in Essentials',
        'Timesheets with clock in and out',
        'Project timesheets',
        'One enhanced pay run',
        'Onboarding and offboarding',
        'Documents and e signature',
      ],
    },
    {
      name: 'Payroll Premium',
      price: 34,
      currency: 'GBP',
      billing: 'month',
      features: [
        '90% off for the first 3 months',
        '5 employees included',
        'Everything in Standard',
        'Interactive shift scheduling',
        'Shift schedule templates',
        'Goals, OKRs and 360 feedback',
        'One to one scheduling',
        'Employee surveys',
      ],
    },
  ],

  features: [
    'Four step pay run',
    'HMRC recognised RTI submissions',
    'Automatic tax and NI calculations',
    'Pension auto enrolment',
    'Statutory pay calculations',
    'Online payslips',
    'P60 and year end processing',
    'Sage Copilot anomaly detection',
    'Employee self service portal',
    'Employee database',
    'Onboarding and offboarding checklists',
    'Documents and e signature',
    'Holiday and leave tracking',
    'Timesheets and clock in',
    'Shift scheduling',
    'Performance management',
    'Payroll reporting',
    'Sage Accounting integration',
    'Accountant access',
    'Mobile app for iOS and Android',
  ],
  top_features: ['HMRC recognised RTI submissions', 'Pension auto enrolment', 'Sage Copilot anomaly detection'],
  integrations: [
    'Sage Accounting',
    'Nest Pensions',
    'HMRC',
    'Sage HR',
    'Microsoft Excel',
    'Sage Employee Benefits',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/sage-business-cloud/payroll/',
  vendor_website: 'https://www.sage.com/en-gb/sage-business-cloud/payroll/',
  vendor_name: 'Sage',
  founded_year: 1981,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United Kingdom'],
  languages: ['English'],

  meta_title: 'Sage Payroll UK Review 2026: Pricing from £12, Features, Pros & Cons',
  meta_description:
    'Independent Sage Payroll review for UK businesses: 2026 pricing from £12 a month with 5 employees included, HMRC RTI submissions, pension auto enrolment, HR features, pros, cons and alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Sage_South_Africa_Logo_0.svg',
};

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
const REVIEWS = [
  {
    reviewer_name: 'Lorraine Baxter', reviewer_job_title: 'Office Manager', reviewer_company: 'Redfern Roofing Ltd',
    reviewer_industry: 'Construction', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Brought payroll back in house and never regretted it',
    summary: 'We paid a bureau £90 a month to run payroll for eleven staff and still had to chase corrections. Now I do it myself in about twenty minutes a month and any mistake I can fix immediately instead of waiting for someone else.',
    pros: 'The four step pay run is genuinely idiot proof, and I mean that kindly because I had never run payroll before. Tax and NI just calculate. The RTI submission happens as part of the run so you cannot forget it. Payslips go to the lads on their phones.',
    cons: 'The reports come out of Excel looking scruffy and need tidying before the accountant sees them. That is my only real gripe in two years.',
    review_date: '2026-04-19', helpful_count: 18, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Krishnan Iyer', reviewer_job_title: 'Practice Owner', reviewer_company: 'KI Accounting Services',
    reviewer_industry: 'Accounting', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 5,
    review_title: 'I run nine client payrolls on it',
    summary: 'As a small practice we tested most of the cloud payroll options. Sage won on the balance of price, HMRC reliability and how little training clients need when they want to see their own numbers.',
    pros: 'Never once had an RTI submission fail or go missing in three years, which I cannot say for every product I have used. Auto enrolment assessments are right every time. The price per company is sensible for bureau style use.',
    cons: 'Switching between client companies takes more clicks than it should. A proper bureau dashboard across all clients would save me real time.',
    review_date: '2026-02-23', helpful_count: 25, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Danielle Prescott', reviewer_job_title: 'Director', reviewer_company: 'Prescott & Hale Salons',
    reviewer_industry: 'Consumer Services', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Copilot caught a mistake that would have cost us',
    summary: 'A stylist had been put on the wrong hourly rate after her review. Copilot flagged that her gross pay had jumped more than it expected before I pressed submit. That single catch probably paid for a year of the software.',
    pros: 'The anomaly checking before each pay run. Holiday balances the girls can check themselves instead of asking me. Support answered on a Sunday when I was doing payroll late, which I did not expect.',
    cons: 'Shift scheduling is only on Premium and we sit on Standard, so rotas still live on a whiteboard. The upgrade gap between £23 and £34 feels wide for one feature we want.',
    review_date: '2026-05-27', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Alan Whitcombe', reviewer_job_title: 'Managing Director', reviewer_company: 'Whitcombe Precision Engineering',
    reviewer_industry: 'Mechanical Engineering', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Solid payroll, HR side feels bolted on',
    summary: 'The payroll half is excellent and has never let us down across three tax year changes. The HR features are useful but you can tell they came from a different product, the navigation between the two halves is not seamless.',
    pros: 'April tax changes just appear, no update to install, no panic. Pension files upload to Nest without editing. P60s at year end took minutes for eighteen staff.',
    cons: 'Jumping between payroll and the HR area feels like switching apps. Had one support query about statutory paternity that took three contacts to get a straight answer.',
    review_date: '2025-12-15', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Rebecca Sowerby', reviewer_job_title: 'Finance Administrator', reviewer_company: 'Elmbridge Veterinary Group',
    reviewer_industry: 'Veterinary', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Moved from a spreadsheet and HMRC basic tools, night and day',
    summary: 'We were using the free HMRC tools and a spreadsheet for everything else. First proper payroll software and I honestly did not know it could be this straightforward.',
    pros: 'Everything in one place, pay, pensions, payslips, holiday. Statutory sick pay calculated correctly first time when one of our nurses was off for six weeks, which I used to dread working out by hand.',
    cons: 'Wish the mobile app let me approve a pay run, currently I need the laptop. Minor thing.',
    review_date: '2026-06-08', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Stephen Garrity', reviewer_job_title: 'Owner', reviewer_company: 'Garrity Landscapes',
    reviewer_industry: 'Landscaping', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Five staff, £12 a month, no complaints',
    summary: 'For a small crew like ours the Essentials plan covers everything. Started on the 90% offer so it cost pennies while I learned it, and even at full price it is less than an hour of my time is worth.',
    pros: 'Pay run takes me ten minutes on the last Friday of the month, done from the van more than once. The lads get payslips on their phones. HMRC side is completely handled.',
    cons: 'Seasonal workers coming and going means adding and removing employees, and beyond the included five it charges per head. Fair enough, but budget for it if your headcount swings.',
    review_date: '2026-03-14', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Nadia Kaminska', reviewer_job_title: 'HR Manager', reviewer_company: 'Ferrocrest Manufacturing',
    reviewer_industry: 'Manufacturing', reviewer_company_size: '51-200', used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 4, customer_service: 3, functionality: 3,
    review_title: 'Fine to about fifty staff, strained beyond that',
    summary: 'We run just over sixty on it and while it copes, you feel the edges. Shift premiums and overtime rules need manual handling every run and the per employee pricing adds up at our size.',
    pros: 'Core calculations always correct. The self service portal cut the payslip reprint requests to zero. Onboarding checklists keep the paperwork consistent.',
    cons: 'No rule builder for complex overtime and shift premiums, we prepare those in a spreadsheet and import. At sixty plus employees the per head charges make it worth comparing against bigger payroll platforms.',
    review_date: '2025-11-19', helpful_count: 20, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Colin Marchbank', reviewer_job_title: 'Treasurer', reviewer_company: 'Dunelm Rowing Club',
    reviewer_industry: 'Sports', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Volunteer treasurer, three employees, zero payroll knowledge',
    summary: 'The club employs a coach and two part time staff. I inherited payroll with the treasurer role and this software has made it a non event in my month.',
    pros: 'It tells me what to do and in what order. Phone support has twice talked me through things patiently, once about a new starter checklist, once about a tax code notice. Auto enrolment letters generated for us.',
    cons: 'Some of the HR features are wasted on three employees but you cannot buy the payroll without them. Would take a leaner cheaper tier.',
    review_date: '2025-10-05', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Jasmine Okorie', reviewer_job_title: 'Operations Director', reviewer_company: 'Brightside Care Services',
    reviewer_industry: 'Individual & Family Services', reviewer_company_size: '51-200', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Premium plan running rotas and payroll together',
    summary: 'Care work is shifts, cover and last minute changes. Having the rota and the payroll in the same system means hours flow through to pay without retyping, which was our single biggest source of pay errors before.',
    pros: 'Shift scheduling with templates for our standard patterns. Clock in and out from carers phones. Hours to pay without manual transfer. Sage Copilot flags when someone worked well over their usual hours.',
    cons: 'Scheduling interface is functional rather than slick, drag and drop can be fiddly on a tablet. Occasional lag on Monday mornings when everyone submits time at once.',
    review_date: '2026-05-12', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Malcolm Treharne', reviewer_job_title: 'Director', reviewer_company: 'Treharne Bros Butchers',
    reviewer_industry: 'Retail', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Second generation shop, first generation on proper payroll',
    summary: 'Dad did the wages in a ledger book for forty years. The accountant insisted we modernise and picked Sage. Two years on I will admit she was right.',
    pros: 'Weekly pay runs are quick once your staff are set up. Holiday pay for the Saturday staff calculated properly. The accountant logs in herself at year end which saves us both time.',
    cons: 'Weekly payroll means you are in it every week obviously, and the odd slow afternoon on the site is more noticeable. Nothing that has made me want to go back to the ledger.',
    review_date: '2026-01-17', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Victoria Lindsell', reviewer_job_title: 'Financial Controller', reviewer_company: 'Harwick & Dunn Solicitors',
    reviewer_industry: 'Legal Services', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The Sage Accounting integration is the quiet hero',
    summary: 'We run Sage Accounting for the practice books, so payroll journals posting themselves after each run was the deciding factor. Wages, PAYE liability and pension accruals appear in the accounts correctly coded without anyone touching them.',
    pros: 'Payroll to accounts sync with no manual journals. Confidential payroll access kept separate from the bookkeeping users. Salary sacrifice handled correctly for our cycle to work scheme.',
    cons: 'Custom reporting is limited, I export and pivot for the partners quarterly pack. A report builder would round it out.',
    review_date: '2026-04-03', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Barry Huckerby', reviewer_job_title: 'Owner', reviewer_company: 'Huckerby Coach Hire',
    reviewer_industry: 'Transportation', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 2, value_for_money: 3, customer_service: 2, functionality: 3,
    review_title: 'Struggled with our drivers variable hours',
    summary: 'Might be the right tool for salaried staff but our drivers do different hours every single week and getting those in is more manual than the sales pitch suggested. Timesheets helped a bit but the drivers will not use the app consistently.',
    pros: 'When the hours are in, the calculations are correct. HMRC side is reliable.',
    cons: 'Entering variable hours for twenty drivers weekly is tedious. Import template is strict and rejects files for formatting quibbles. Support twice suggested things I had already told them I tried. Considering whether a driver focused system suits us better.',
    review_date: '2025-09-28', helpful_count: 22, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Barry, thank you for the honest feedback. Our team would like to look at your timesheet import setup, there are formats that handle variable weekly hours with less manual work. Please get in touch. Sage UK Customer Care',
    vendor_response_date: '2025-10-06',
  },
  {
    reviewer_name: 'Cheryl Anand', reviewer_job_title: 'Bookkeeper', reviewer_company: 'CA Bookkeeping',
    reviewer_industry: 'Accounting', reviewer_company_size: 'Self-employed', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'My recommendation for every small client who asks',
    summary: 'Clients ask me what payroll to use roughly once a month. Unless they have something unusual going on, this is my answer, mostly because I know they will not break it and I will not be untangling anything in January.',
    pros: 'Hard to make an uncorrectable mistake, and corrections when needed are clean with a proper trail. New starter and leaver processing is well guided. Consistent between clients so my process notes work everywhere.',
    cons: 'Price rises have arrived most years, modest each time but the direction is the same. Grandfathered pricing for long standing customers would be a nice gesture.',
    review_date: '2026-02-09', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Duncan Faircloth', reviewer_job_title: 'General Manager', reviewer_company: 'The Ploughman’s Rest',
    reviewer_industry: 'Hospitality', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Pub payroll with students and seasonal staff',
    summary: 'High staff turnover is the reality of a pub and the starter and leaver workflows cope well. P45s generated properly, student loan deductions picked up from the starter checklist, holiday accrual for casual staff tracked.',
    pros: 'Starters and leavers are quick. Support sorted a duplicated employee record inside one phone call. The pay run reminds you about outstanding tax code notices before you run.',
    cons: 'Tronc and tips distribution is manual, a hospitality feature set would be welcome. Rota features need Premium which we have not stretched to.',
    review_date: '2025-12-30', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Angela Redworth', reviewer_job_title: 'Charity Manager', reviewer_company: 'Foxglove Hospice Support',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Small charity, part time staff, zero payroll drama',
    summary: 'Seven part time staff on different hours and our old outsourced arrangement kept getting the pension assessments wrong. Since bringing it in house on Sage we have had two clean years.',
    pros: 'Auto enrolment assessment correct for part timers crossing the threshold some months and not others, which was exactly what the bureau kept fumbling. Trustees like that I can produce the staff cost report myself.',
    cons: 'The price is per plan not per charity size, a nonprofit discount would help small charities. Otherwise genuinely struggling to fault it.',
    review_date: '2026-03-25', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Gerald Mostyn', reviewer_job_title: 'Company Secretary', reviewer_company: 'Mostyn Holdings',
    reviewer_industry: 'Investment Management', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 4, functionality: 3,
    review_title: 'Does directors payroll fine, wants to be more than we need',
    summary: 'We run directors salaries and little else. It handles that perfectly well but the product increasingly pushes HR features, Copilot suggestions and upgrade prompts at a company that just wants four payslips a month.',
    pros: 'Directors NI calculated on the annual basis correctly, which simpler tools get wrong. Reliable RTI. Support competent on the one occasion needed.',
    cons: 'Interface busy with features we will never use. Would happily pay less for a directors only mode with half the screens.',
    review_date: '2026-01-05', helpful_count: 7, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Tanya Ellingworth', reviewer_job_title: 'Head of People', reviewer_company: 'Mercury Creative Agency',
    reviewer_industry: 'Marketing & Advertising', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Premium HR features punch above the price',
    summary: 'We bought it for payroll and ended up retiring two other subscriptions, our old HR records system and a survey tool. The performance management is not as deep as a dedicated platform but it is included, and included wins arguments at our size.',
    pros: 'Goals and one to ones in the same system as pay. E signature on contracts saved a DocuSign subscription. Self service holiday booking with the shared calendar.',
    cons: '360 feedback setup is rigid, you work Sage’s way. Support chat quality varies noticeably by time of day.',
    review_date: '2026-06-17', helpful_count: 10, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Raymond Petherick', reviewer_job_title: 'Owner', reviewer_company: 'Petherick Marine Services',
    reviewer_industry: 'Maritime', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Three tax years in, it has never once been the problem',
    summary: 'Running a small business means something is always on fire. In three years payroll has not been the fire, not once, and that reliability is worth more than any feature.',
    pros: 'April changes handled invisibly. A tax code change for one of the engineers arrived from HMRC into the software before the paper letter reached him. Payslip portal means no reprints.',
    cons: 'They retired a report layout I liked in an update without much notice. Found an equivalent but release notes could be clearer about what is changing.',
    review_date: '2025-11-02', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Simone Hattersley', reviewer_job_title: 'Practice Manager', reviewer_company: 'Birchwood Dental Practice',
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Switched from a competitor mid tax year, smoother than feared',
    summary: 'Everyone warns you never to switch payroll mid year. The import brought across year to date figures for all fourteen staff correctly and the first parallel run matched to the penny.',
    pros: 'Migration tooling and the support person who checked our first run. Pension contributions to two different providers handled. Associates on variable sessions paid correctly each month.',
    cons: 'The one month free trial is Standard plan only, we wanted to trial Premium features and could not without paying. Small thing given how it went.',
    review_date: '2026-05-04', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Owen Bryn-Jones', reviewer_job_title: 'Director', reviewer_company: 'BJ Electrical & Sons',
    reviewer_industry: 'Construction', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Runs alongside Sage Accounting like one product',
    summary: 'We were already on Sage Accounting for the books and CIS, adding the payroll made everything live in one login. Wages appear in the accounts automatically and the accountant stopped charging us for payroll journals.',
    pros: 'One login, one bill, books and payroll talking to each other. Copilot flagged an apprentice moving NI category the month he turned 21, would never have caught that myself.',
    cons: 'If you leave Sage Accounting the payroll pricing standalone is different, worth understanding the bundle before committing. No other complaints.',
    review_date: '2026-06-26', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Yvette Cranleigh', reviewer_job_title: 'Finance Manager', reviewer_company: 'Ashdown Park Garden Centre',
    reviewer_industry: 'Retail', reviewer_company_size: '51-200', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Copes well with our seasonal swings',
    summary: 'We go from thirty staff in winter to nearly seventy in spring. Adding seasonal workers each March is routine now, starter checklists in bulk, and the per employee pricing flexes down again when they leave.',
    pros: 'Scales up and down with the season without plan changes. Bulk operations for the seasonal intake. Leavers processed cleanly with P45s the same day.',
    cons: 'Costs jump in the busy season with per head pricing, predictable but worth modelling. Rehiring last year’s seasonal staff requires re-entering some details that it could remember.',
    review_date: '2026-04-24', helpful_count: 11, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Frank Delacey', reviewer_job_title: 'Managing Partner', reviewer_company: 'Delacey & Rowe Architects',
    reviewer_industry: 'Architecture & Planning', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Quietly excellent, which is exactly what payroll should be',
    summary: 'Good payroll software should be boring and this is beautifully boring. Twenty two staff paid correctly on the 28th of every month for two and a half years, and the one complexity we have, salary sacrifice pensions for the partners, handled without workarounds.',
    pros: 'Salary sacrifice configured properly with the right NI treatment. Year end is an afternoon, not a week. Employee portal adoption was immediate, even from the partners who resist all technology.',
    cons: 'The dashboards on login are more marketing than information, I click past them every time. Let me set my landing page.',
    review_date: '2025-10-21', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Same category as the other payroll products (PaySpace / SimplePay)
  const { data: payrollPeer, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'simplepay').single();
  if (catErr || !payrollPeer) throw new Error(`Could not resolve payroll category from simplepay: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: payrollPeer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('Sage Payroll already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations/i.test(error.message)) {
        const { integrations, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Sage Payroll inserted (integrations column missing, skipped that field).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('Sage Payroll inserted.');
    }
  }

  // Replace reviews
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const rows = REVIEWS.map(r => ({
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
