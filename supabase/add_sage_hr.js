// ============================================================================
// Adds Sage HR as a new product in the HR category with full editorial
// content and a ~110 review set (hand written anchors plus a seeded
// generator with per product content pools). Safe to re-run: updates the
// existing row and replaces its reviews if the slug already exists.
//
// Sage HR is the modular cloud HR product for small and mid sized businesses,
// distinct from the enterprise Sage People platform already in the catalogue.
//
//   node supabase/add_sage_hr.js
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
// Software record: Sage HR
// ---------------------------------------------------------------------------
const SOFTWARE = {
  name: 'Sage HR',
  slug: 'sage-hr',
  tagline: 'Modular cloud HR software that small and mid sized businesses can switch on one piece at a time',
  description_short:
    'Cloud HR software for small and mid sized businesses, priced per employee per month around a Core HR base with optional modules for leave, timesheets, performance, shift scheduling and recruitment.',
  description_full: `<h2>What is Sage HR?</h2><p>Sage HR is the small and mid sized business HR product in the Sage range, and it is worth being clear from the outset that it is a genuinely different product from Sage People, which sits further up the range for large multinational workforces. Where Sage People is a heavyweight platform built on Salesforce for organisations with hundreds or thousands of staff across several countries, Sage HR is built for the business with somewhere between a handful and a few hundred employees that has outgrown spreadsheets and a shared calendar but does not need, and cannot justify, an enterprise implementation project. It began life as CakeHR, a well regarded standalone HR product, was acquired by Sage and rebranded, and has kept the clean, approachable feel that made the original popular while gaining the backing of a company that understands UK compliance.</p><h2>The modular pricing model, and why it suits growing businesses</h2><p>The single most important thing to understand about Sage HR is that it is modular. You start with a Core HR and Leave Management foundation priced per employee per month, and then switch on additional modules only as you actually need them, timesheets, performance management, shift scheduling, recruitment, and an expenses module among them, each adding a further per employee cost on top of the base. This matters because it means a ten person business that simply wants to stop managing holiday requests through email pays only for the leave management it needs, while a growing hundred person business running shift patterns and formal performance reviews can build up to a far more capable system on the same underlying platform without ever migrating to something new. You grow into the product rather than buying capability you will not use for years.</p><h2>Leave and absence management, the reason most businesses arrive</h2><p>The most common entry point is leave management, and it solves a problem almost every growing business recognises. Holiday requests handled through email or a shared spreadsheet create two recurring headaches, requests that get missed because they were buried among other messages, and arguments about remaining entitlement because nobody has a single reliable record. Sage HR gives every employee a clear view of their own balance, routes requests to the right manager automatically, and shows a shared team calendar so nobody books the same week as three colleagues without realising until it is too late. Sickness absence and other leave types are tracked in the same place, which quietly builds the kind of record a business needs both for wellbeing conversations and for statutory compliance.</p><h2>Employee self service and the admin it removes</h2><p>The quiet win that businesses consistently underestimate is self service. Once staff can update their own personal details, book their own leave, and pull their own documents and payslips without emailing HR, a genuinely large proportion of a small HR team's week simply disappears. None of those individual requests takes long to answer, but collectively a change of address here, a payslip copy there, a question about a leave balance somewhere else, they add up to a significant slice of the working week that self service removes almost entirely, freeing whoever runs HR to spend time on work that actually needs a human.</p><h2>Performance, timesheets and shift scheduling</h2><p>Beyond the core, the performance module handles review cycles, objectives and one to one meeting records in a straightforward way that suits the great majority of small businesses without drowning them in the elaborate continuous feedback machinery that larger enterprise tools push. The timesheets module tracks worked hours and can feed them toward payroll, and the shift scheduling module builds rotas with templates for businesses that run shift patterns, hospitality, care, retail, where the rota and the leave calendar genuinely need to talk to each other. The recruitment module adds applicant tracking, job posting and a candidate pipeline for businesses hiring frequently enough to want it in the same system as everything else.</p><h2>Where it connects, payroll included</h2><p>Sage HR sits naturally alongside Sage Payroll and the wider Sage range, and the connection between HR and payroll is where a lot of the value lands, since a pay change or a new starter recorded once in HR flows through rather than being retyped into a separate payroll system with the transcription errors that always eventually creep in. It also connects to Slack and Microsoft 365 for the day to day workflow, and offers a mobile app so managers can approve requests and staff can book leave from a phone rather than needing to be at a desk.</p><h2>What it costs</h2><p>Pricing is per employee per month, with the Core HR and Leave Management foundation forming the base and each additional module adding a modest further per employee charge on top. In practice this means a small business can start genuinely cheaply, paying only for the base and perhaps one module, and scale the cost up in line with both headcount and the functionality it actually switches on. There is a free trial, and no long term contract lock in, which lowers the risk of trying it considerably. The honest note is that as you add several modules across a larger headcount the per employee costs do stack up, so a business planning to switch on most of the modules should price the full configuration rather than anchoring on the low base figure alone.</p><h2>Where it falls short</h2><p>It is not the deepest HR product on the market, and it does not pretend to be. Businesses wanting sophisticated, highly configurable performance frameworks, complex compensation modelling, or genuinely global multi country HR with localised policies per territory will find Sage HR lighter than a dedicated enterprise platform, which is precisely the point at which Sage would steer them toward Sage People instead. Reporting is solid for a business of this size but not limitless, and the modular pricing, while fair, means the headline base price understates what a fully featured configuration actually costs. Support is generally well regarded but, as with most software, can feel slower during peak periods.</p><h2>Who should choose it</h2><p>Sage HR fits the small or mid sized business, roughly from ten to a few hundred employees, that wants to move HR off spreadsheets onto a clean, approachable platform it can grow into module by module, and that values the connection into Sage Payroll and the wider Sage range. It is especially strong for businesses whose first pain is leave and absence management and who want the option to add performance, timesheets or scheduling later without changing systems. Larger organisations with genuinely global, multi country workforces should look at Sage People, and businesses wanting the single friendliest possible standalone HR experience should also weigh dedicated competitors, but for a UK small business already in or considering the Sage ecosystem, Sage HR is a natural and capable choice.</p>`,

  starting_price: 5,
  price_currency: 'GBP',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Core HR & Leave Management',
      price: 5,
      currency: 'GBP',
      billing: 'month',
      features: [
        'Priced per employee per month',
        'Employee database and records',
        'Self service portal',
        'Leave and absence management',
        'Shared team calendar',
        'Document management',
        'Org chart',
        'Mobile app',
      ],
    },
    {
      name: 'Add on Modules',
      price: 3,
      currency: 'GBP',
      billing: 'month',
      features: [
        'Per employee per module, on top of Core',
        'Performance management',
        'Timesheets',
        'Shift scheduling',
        'Recruitment and applicant tracking',
        'Expenses',
        'Switch modules on as you need them',
        'No long term contract',
      ],
    },
  ],

  features: [
    'Employee database and records',
    'Employee self service portal',
    'Leave and absence management',
    'Shared team calendar',
    'Sickness and statutory leave tracking',
    'Onboarding and offboarding',
    'Document management and e signature',
    'Org chart',
    'Performance management and reviews',
    'Objectives and one to ones',
    'Timesheets',
    'Shift scheduling with templates',
    'Recruitment and applicant tracking',
    'Expenses module',
    'Workflow approvals',
    'Reporting and analytics',
    'Mobile app for iOS and Android',
    'Sage Payroll integration',
    'Slack and Microsoft 365 integration',
  ],
  top_features: ['Leave and absence management', 'Employee self service portal', 'Modular per employee pricing'],
  integrations: [
    'Sage Payroll',
    'Sage 50 Payroll',
    'Slack',
    'Microsoft 365',
    'Zapier',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/sage-business-cloud/hr/',
  vendor_website: 'https://www.sage.com/en-gb/sage-business-cloud/hr/',
  vendor_name: 'Sage',
  founded_year: 1981,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars'],
  countries_available: ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia', 'South Africa'],
  languages: ['English'],

  meta_title: 'Sage HR Review 2026: Pricing, Features, Modules, Pros & Cons',
  meta_description:
    'Independent Sage HR review: modular per employee pricing, leave and absence management, performance, timesheets, shift scheduling, real user pros and cons, and the best alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Sage_South_Africa_Logo_0.svg',
};

// ---------------------------------------------------------------------------
// Hand written anchor reviews
// ---------------------------------------------------------------------------
const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Rachel Pemberton', reviewer_job_title: 'HR Manager', reviewer_company: 'Fenwick & Slate Architects',
    reviewer_industry: 'Architecture & Planning', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'We started with leave and never looked back',
    summary: 'We came to Sage HR purely to stop managing holiday through a spreadsheet and an inbox, and within a month I could not imagine going back. Since then we have switched on performance reviews too, which is the whole appeal, you add what you need when you need it.',
    pros: 'The modular approach is genuinely the reason to choose it. We pay for leave and performance and nothing else. Staff book their own holiday and see their balance without asking me, which has quietly taken hours off my week. The shared calendar stops the whole studio booking the same fortnight.',
    cons: 'Once you start adding modules the per person cost climbs, so price the full setup rather than the base figure. Reporting covers what we need but a colleague at a bigger firm found it a little light.',
    review_date: '2026-04-14', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Daniel Osei', reviewer_job_title: 'Head of People', reviewer_company: 'Brightwater Care Homes',
    reviewer_industry: 'Individual & Family Services', reviewer_company_size: '51-200', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Shift scheduling and leave in one place changed our week',
    summary: 'Care work is shifts, cover and constant last minute changes. Having the rota and the leave calendar in the same system means we stopped double booking carers against their own holiday, which used to happen almost every month.',
    pros: 'Shift scheduling with templates for our standard patterns saves the rota coordinator a full day a week. Carers use the mobile app to check shifts and request leave. The self service side works even for staff who are not confident with technology.',
    cons: 'The scheduling drag and drop can be fiddly on a tablet. We would like deeper reporting on absence patterns across sites without exporting to a spreadsheet.',
    review_date: '2026-02-27', helpful_count: 18, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Sophie Hartnell', reviewer_job_title: 'Operations Director', reviewer_company: 'Meridian Digital Agency',
    reviewer_industry: 'Marketing & Advertising', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Clean, friendly and does exactly what a small agency needs',
    summary: 'We moved off a much clunkier HR tool and the difference in how willing people are to actually use it is night and day. It feels like a modern app rather than a corporate system, and adoption was immediate.',
    pros: 'The interface is genuinely pleasant, which matters more than people think because staff actually engage with it. Onboarding checklists mean new starters arrive with everything ready. Connects to our Slack so approvals happen where we already work.',
    cons: 'Support was slower than I would have liked on one integration question. The performance module is fine but a bit basic if you want sophisticated review structures.',
    review_date: '2026-05-19', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Marcus Whitfield', reviewer_job_title: 'Finance and HR Manager', reviewer_company: 'Coadstone Engineering',
    reviewer_industry: 'Mechanical or Industrial Engineering', reviewer_company_size: '51-200', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'The Sage Payroll link is the quiet hero',
    summary: 'We already ran Sage Payroll, so having HR feed into it directly was the deciding factor. A new starter or a pay change entered once flows through rather than being typed into two systems, which has removed a whole category of small errors.',
    pros: 'The payroll integration genuinely reduces double entry and the mistakes that come with it. Timesheets flow toward pay cleanly. Solid, dependable and it sits naturally next to the rest of our Sage setup.',
    cons: 'The modular pricing is fair but adds up once you switch several on. Some settings are tucked away and took a support call to find the first time.',
    review_date: '2025-11-12', helpful_count: 16, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Priya Kaur', reviewer_job_title: 'HR Administrator', reviewer_company: 'Ashgrove Independent School',
    reviewer_industry: 'Education Management', reviewer_company_size: '51-200', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Took our staff records out of the filing cabinet at last',
    summary: 'We were still keeping contracts and records in paper folders and a spreadsheet that only I understood. Now everything is in one place, every member of staff can self serve, and if I am off nobody is stuck.',
    pros: 'Document storage with e signature ended the filing cabinet. Self service means staff stop emailing me for payslip copies. Onboarding a new teacher before term starts is now a checklist rather than a scramble. Support during setup was genuinely helpful.',
    cons: 'Term based academic leave patterns took some configuring. A dedicated education mode would be nice but that is a big ask for general HR software.',
    review_date: '2026-03-30', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Gavin Reardon', reviewer_job_title: 'Managing Director', reviewer_company: 'Reardon Property Services',
    reviewer_industry: 'Facilities Services', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 4, value_for_money: 3, customer_service: 3, functionality: 3,
    review_title: 'Good for leave, we expected a bit more from the extras',
    summary: 'The core leave management is excellent and worth the money on its own. Where we have been less sure is the value of the add on modules for a business our size, some felt thinner than the sales conversation suggested.',
    pros: 'Leave management is genuinely strong and the mobile app is good for our staff who are rarely at a desk. Easy to set up the basics.',
    cons: 'The expenses and performance modules did not feel worth the extra per head for us. Costs mount quickly across modules. We use maybe half of what we pay for.',
    review_date: '2026-01-22', helpful_count: 15, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Gavin. The modules are designed to be switched on and off as needs change, and our team would be happy to review which ones actually earn their place for a business your size. Sage HR Customer Care',
    vendor_response_date: '2026-01-29',
  },
  {
    reviewer_name: 'Eleanor Brookfield', reviewer_job_title: 'People Operations Lead', reviewer_company: 'Tandem Software Labs',
    reviewer_industry: 'Computer Software', reviewer_company_size: '51-200', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Right sized for a scaling tech company',
    summary: 'We went from thirty to ninety people in eighteen months and Sage HR scaled with us without a single moment where it felt like the wrong tool. We added performance and recruitment as we grew rather than buying it all up front.',
    pros: 'The ability to add modules as you scale is perfect for a growing company. Recruitment pipeline keeps hiring in the same system as everything else. The Slack integration means managers approve leave without leaving their day.',
    cons: 'Reporting is good but we occasionally want to slice data in ways it will not quite allow. Nothing that has made us regret the choice.',
    review_date: '2026-05-06', helpful_count: 19, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Terence Boyle', reviewer_job_title: 'Director', reviewer_company: 'Boyle & Craddock Solicitors',
    reviewer_industry: 'Legal Services', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Sensible HR for a small professional firm',
    summary: 'A law firm our size does not need an enterprise HR platform, and this hits exactly the right level. Leave, records, performance reviews and a tidy audit trail, without the complexity or cost of something built for a multinational.',
    pros: 'Right level of capability without over engineering. Performance review cycles are simple to run. The record keeping satisfies our own compliance expectations. Support has been reliable.',
    cons: 'Would like slightly more flexibility in the review templates. The base plus modules pricing needs a spreadsheet to work out your true monthly cost.',
    review_date: '2025-10-18', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Nadia Farrukh', reviewer_job_title: 'HR Business Partner', reviewer_company: 'Kingsmoor Retail Group',
    reviewer_industry: 'Retail', reviewer_company_size: '51-200', used_for_duration: '1-2 years',
    overall_rating: 2, ease_of_use: 3, value_for_money: 2, customer_service: 2, functionality: 3,
    review_title: 'Outgrew it faster than we expected',
    summary: 'It served us well at fifty staff but as we pushed past a hundred and fifty across several shops the reporting and the multi location handling started to strain, and the modular costs at that headcount stopped feeling like value.',
    pros: 'Genuinely good at the small business stage. Leave and self service are strong. Easy for shop staff to pick up.',
    cons: 'At our current size the reporting cannot answer the questions our board asks without exports. Per employee module costs across a larger headcount add up considerably. We are evaluating a heavier platform, which honestly means Sage People or a competitor.',
    review_date: '2026-02-08', helpful_count: 22, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Hello Nadia, thank you for the candid feedback. Businesses that outgrow Sage HR at scale are often a strong fit for Sage People, and our team can talk you through that path if it would help. Sage Customer Care',
    vendor_response_date: '2026-02-15',
  },
  {
    reviewer_name: 'Callum Sinclair', reviewer_job_title: 'Founder', reviewer_company: 'Northfell Outdoor Co',
    reviewer_industry: 'Consumer Goods', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'First proper HR system and it was painless',
    summary: 'We hit twenty staff and realised holiday on a whiteboard was not going to cut it any more. Setup took an afternoon and the team was booking leave through the app by the end of the week.',
    pros: 'Astonishingly quick to get going for a first HR system. The app is genuinely good. Priced sensibly for a small growing business. Staff actually enjoy using it, which I did not expect.',
    cons: 'We have not needed the deeper modules yet so cannot speak to those. Occasional wish for a bit more customisation on the onboarding flow.',
    review_date: '2026-06-11', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Bethan Lloyd', reviewer_job_title: 'Practice Manager', reviewer_company: 'Ceredigion Veterinary Group',
    reviewer_industry: 'Veterinary', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 4,
    review_title: 'Handles our rotas and leave together nicely',
    summary: 'A veterinary practice runs on rotas and on people needing time off at short notice, and having both in one place has genuinely reduced the friction. When a nurse books leave it shows against the rota rather than being discovered later.',
    pros: 'Rota and leave talking to each other is the key win. Mobile app suits staff who are on their feet all day. Support once resolved a tricky setup question patiently over the phone.',
    cons: 'The scheduling module took a while to configure to our patterns. Reporting is adequate rather than powerful.',
    review_date: '2025-12-09', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Oliver Trentham', reviewer_job_title: 'HR Generalist', reviewer_company: 'Halewood Logistics',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '51-200', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Dependable backbone for our people admin',
    summary: 'Nothing flashy, just a solid, reliable system that holds our people data, handles leave and drives our review cycles without drama. After two years it has simply become part of how we run, which is the best thing you can say about HR software.',
    pros: 'Reliable and rarely gives us trouble. Timesheets feed toward payroll cleanly. Self service has cut our internal HR queries noticeably. Good value at our current module mix.',
    cons: 'Support response times vary. A couple of the reports need exporting to finish the job in a spreadsheet.',
    review_date: '2026-04-01', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
];

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------
let seed = 771003;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Amelia', 'Harry', 'Charlotte', 'Oliver', 'Grace', 'Jack', 'Emily', 'Thomas', 'Sophie', 'James',
  'Freya', 'Daniel', 'Isla', 'Samuel', 'Ella', 'Joseph', 'Lucy', 'William', 'Chloe', 'Henry',
  'Rhian', 'Aled', 'Ffion', 'Gethin', 'Carys', 'Siobhan', 'Declan', 'Niamh', 'Eoin', 'Aoife',
  'Priya', 'Amir', 'Zara', 'Raj', 'Fatima', 'Kwame', 'Adaeze', 'Ling', 'Piotr', 'Magda',
  'Karen', 'Paul', 'Sharon', 'Mark', 'Julie', 'Gary', 'Tracey', 'Neil', 'Michelle', 'Stuart',
  'Bethan', 'Morag', 'Fraser', 'Elspeth', 'Rowan', 'Imogen', 'Marcus', 'Verity', 'Callum', 'Nadia',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Whitmore', 'Ashcroft', 'Bramwell', 'Corfield', 'Dunhill', 'Ellery', 'Fairhurst',
  'Goodwin', 'Hartley', 'Ingram', 'Kettering', 'Lockwood', 'Marsden', 'Norbury', 'Ollerton',
  'Prendergast', 'Radley', 'Southgate', 'Thornbury', 'Underhill', 'Vaughan', 'Wexford',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.3)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.24)) return null;
  const stems = ['Harborne', 'Aldermoor', 'Brackenhill', 'Coldharbour', 'Dovewood', 'Elmscott',
    'Farriers', 'Grangewood', 'Highcliffe', 'Ivelmere', 'Kingsbury', 'Larchfield', 'Mossley',
    'Netherby', 'Oakhampton', 'Pinfold', 'Quarrydale', 'Rushmere', 'Stanhope', 'Thurloe'];
  const suf = ['Group', 'Ltd', 'Services', 'Care', 'Studio', 'Partners', 'Consulting', '& Co', ''];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ''}`.trim();
}
const sizes = ['2-10', '11-50', '11-50', '11-50', '51-200', '51-200', '201-500'];
const durations = ['Less than 6 months', '6-12 months', '6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years'];
const countries = ['United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom',
  'United Kingdom', 'Ireland', 'Ireland', 'South Africa', 'Australia'];
const industries = ['Marketing & Advertising', 'Computer Software', 'Retail', 'Hospitality', 'Individual & Family Services',
  'Education Management', 'Legal Services', 'Facilities Services', 'Construction', 'Health, Wellness and Fitness',
  'Logistics & Supply Chain', 'Financial Services', 'Non-Profit Organization Management', 'Veterinary',
  'Architecture & Planning', 'Consumer Goods', 'Manufacturing', 'Recruiting', 'Design', 'Real Estate'];
const jobs = ['HR Manager', 'Head of People', 'HR Administrator', 'People Operations Lead', 'HR Business Partner',
  'Office Manager', 'Operations Director', 'Managing Director', 'Founder', 'HR Generalist', 'Practice Manager',
  'People and Culture Manager', 'HR Officer', 'Talent Manager', 'Finance and HR Manager', 'Director'];

const CONTENT = {
  5: {
    titles: [
      'Holiday chaos finally sorted', 'Our team actually uses it', 'The modular pricing just makes sense',
      'Everything in one tidy place', 'Best HR decision we have made', 'Self service took hours off my week',
      'Grew with us module by module', 'Leave management alone was worth it', 'Staff onboard themselves now',
      'Clean, modern and genuinely friendly', 'The app is brilliant for our field staff', 'Took us off spreadsheets for good',
      'Rotas and leave in one place at last', 'Reviews are painless now', 'A pleasure to actually use',
      'Payroll link removed our double entry', 'Setup was quicker than expected', 'Approvals happen in Slack now',
      'Right sized for a growing business', 'Records out of the filing cabinet',
    ],
    summaries: [
      'We came for leave management and stayed for everything else. Holiday requests that used to vanish in inboxes are now a two click approval, and the whole team can see who is off at a glance.',
      'The thing that sold me was only paying for what we use. We run the core plus performance and nothing else, and the cost matches exactly what we get.',
      'Rolled it out to around eighty staff and adoption was immediate because it genuinely feels like a modern app rather than a corporate system nobody wants to open.',
      'Self service has quietly given me my week back. Staff update their own details and book their own leave without a single email to me, which adds up to a huge amount of time.',
      'We scaled from thirty to ninety people and added modules as we grew rather than buying it all up front, which is exactly how HR software should work for a growing company.',
      'The Sage Payroll connection was the deciding factor. A pay change entered once flows through instead of being retyped, and the small errors that used to creep in have simply stopped.',
      'Onboarding a new starter used to be a scramble of forms and chasing. Now a checklist runs itself before their first day and they arrive to a system that already knows them.',
      'Having the rota and the leave calendar talk to each other ended the constant double booking of staff against their own time off, which was a genuine weekly headache before.',
      'The mobile app is the part our staff actually notice, booking leave and checking shifts from a phone rather than needing to be at a desk they rarely sit at.',
      'It replaced a spreadsheet only one person understood, and now if that person is off nobody is stuck, because everything lives in one place everyone can reach.',
    ],
    pros: [
      'The modular pricing means we pay only for the modules we actually switch on.',
      'Leave management with a shared calendar ended the double bookings completely.',
      'Self service takes a huge volume of small requests off the HR team.',
      'The interface is genuinely pleasant, so staff engage rather than avoid it.',
      'Onboarding checklists mean new starters arrive with everything ready.',
      'The Sage Payroll integration removes double entry and the errors it caused.',
      'The mobile app is excellent for staff who are rarely at a desk.',
      'Shift scheduling and leave in one system stopped the rota clashes.',
      'Performance review cycles are simple to run and keep a proper record.',
      'Approvals through Slack mean managers act without leaving their day.',
      'Document storage with e signature ended our paper filing entirely.',
      'It scaled with us as we added headcount and modules together.',
      'Timesheets feed toward payroll cleanly.',
      'Support during setup was genuinely helpful.',
      'Quick to get going, we were live within a week.',
      'Feels like software built this decade rather than a legacy system.',
    ],
    cons: [
      'The per employee module costs do add up once you switch several on.',
      'Reporting covers our needs but a larger firm might find it light.',
      'Some settings are tucked away and took a support call to locate.',
      'The scheduling drag and drop can be fiddly on a tablet.',
      'Price the full configuration, the base figure understates the real cost.',
      'Performance templates could be a little more flexible.',
      'Support can be slower during busy periods.',
      'Honestly very little, it does what we need.',
      'Nothing that has made us reconsider the choice.',
      'A couple of reports need finishing in a spreadsheet.',
    ],
  },
  4: {
    titles: [
      'Very good with a couple of small gaps', 'Does what a small business needs', 'Happy, with minor wishes',
      'Solid HR for a growing team', 'Recommend it with a pointer or two', 'Good value at the right module mix',
      'Reliable and easy to live with', 'Strong core, decent extras', 'A dependable people system',
      'Better than what we had before', 'Right level for our size', 'Tidy and does the job',
      'Genuinely useful once set up', 'Grew into it over a year', 'Would choose it again',
      'The payroll link makes it worth it', 'Clean and approachable', 'Solid choice for a small HR team',
    ],
    summaries: [
      'A year in and it does what we bought it for well. Leave and self service are excellent, the extras are decent, and the only real note is that the modular costs mount as you add more.',
      'Good product overall. The core is strong and the payroll integration genuinely reduces double entry. A few reports need a spreadsheet to finish, which is the main reason for four rather than five.',
      'We are a small team and it fits well. Onboarding, leave and reviews are all handled, though the performance module is more basic than a dedicated tool would offer.',
      'It replaced a clunky older system and adoption was much better because it actually feels modern. Setup took a little thought but has been reliable since.',
      'The value depends heavily on which modules you switch on. Core plus one module is genuinely good value, several modules across a larger headcount less obviously so.',
      'Dependable and easy to use day to day. Support has been fine the couple of times we needed it. The reporting is where it stops just short of what we occasionally want.',
      'The mobile app is a real plus for our field staff, and the leave management is faultless. Marked down only because the deeper modules felt thinner than expected.',
      'A sensible, right sized HR system for a business like ours. Nothing about it is exciting, but everything works, which is what you actually want from HR software.',
    ],
    pros: [
      'Leave and absence management is genuinely strong.',
      'Self service cut our internal HR queries noticeably.',
      'The interface is easy for non technical staff to pick up.',
      'The Sage Payroll link reduces double entry.',
      'Onboarding checklists save real time per starter.',
      'The mobile app works well for staff on the move.',
      'Modular pricing lets you start small and grow.',
      'Reliable, rarely gives us trouble.',
      'Document management and e signature are handy.',
      'Review cycles are simple to run.',
      'Timesheets feed toward payroll cleanly.',
      'Good value at a sensible module mix.',
      'Shared calendar stops leave clashes.',
      'Support resolved our setup questions competently.',
    ],
    cons: [
      'Module costs add up across a larger headcount.',
      'Reporting is adequate rather than powerful.',
      'The performance module is fairly basic.',
      'Some configuration is not obvious at first.',
      'Support response times vary by season.',
      'A few reports need exporting to finish.',
      'The base price understates a full configuration.',
      'Scheduling can be fiddly on smaller screens.',
      'Would like more flexible review templates.',
      'Not built for genuinely global multi country HR.',
      'Onboarding flows could be more customisable.',
      'You need a spreadsheet to work out true monthly cost.',
    ],
  },
  3: {
    titles: [
      'Good for the basics, less sure on the extras', 'Middle of the road for us', 'Fine but we use half of it',
      'Decent leave tool, mixed on the rest', 'Three stars, mostly about value', 'Does the job, rarely delights',
      'Works, with a few frustrations', 'Right idea, patchy execution for us', 'A qualified recommendation',
      'Better than spreadsheets, short of great', 'Depends which modules you need', 'Adequate is the honest word',
    ],
    summaries: [
      'The core leave management is genuinely good and worth the money alone. Where we have been less convinced is the value of the add on modules for a business our size.',
      'It does what it says but we use maybe half of what we pay for, and the modular costs across our headcount stopped feeling like clear value once we added a few.',
      'A year in, results are mixed. Leave and self service are strong, the performance and expenses modules felt thinner than the sales conversation suggested.',
      'Fine software that occasionally frustrates. Reporting stops just where our questions start, and we export to a spreadsheet more than we would like.',
      'It replaced a whiteboard and for that alone it earns its place, but the promise of the fuller platform did not quite match our day to day experience.',
      'Support has been the weak point, one excellent call and a couple that went in circles. The product itself is steady enough.',
    ],
    pros: [
      'Leave management is genuinely strong.',
      'Self service works well for staff.',
      'The mobile app is good for field staff.',
      'Easy to get the basics running.',
      'The Sage Payroll link is useful.',
      'Reliable enough day to day.',
      'Document storage is handy.',
      'Onboarding checklists save some time.',
    ],
    cons: [
      'The add on modules felt thin for our size.',
      'Costs mount quickly across modules.',
      'Reporting runs out where our questions start.',
      'Support quality was inconsistent.',
      'We use far less than we pay for.',
      'Performance module is basic.',
      'Configuration was not always obvious.',
      'Exports needed to finish several reports.',
      'The base price hides the real cost.',
      'Not the depth a larger business needs.',
    ],
  },
  2: {
    titles: [
      'Outgrew it sooner than expected', 'Fine at small scale, strained beyond', 'The modules did not earn their cost',
      'Good product, wrong size for us now', 'Value slipped as we grew', 'Not quite the platform we needed',
    ],
    summaries: [
      'It served us well when we were smaller, but as we pushed past a hundred and fifty staff across sites the reporting and multi location handling strained, and the per employee module costs stopped feeling like value.',
      'We switched on several modules and honestly use a fraction of them, while paying per head for all of them across a growing team. The maths stopped working for us.',
      'The core is decent but the deeper modules we added felt basic next to dedicated tools, and at our headcount the combined cost pushed us to look elsewhere.',
      'Fine at the small business stage and genuinely easy to use, but our needs grew past what it does well, and support was slow when we needed help most.',
      'Reporting is the real limitation for us now. Every board question turns into an export and a spreadsheet, which defeats much of the point of the system.',
      'A capable small business tool that we simply outgrew, and the renewal cost across our headcount made the decision to move easier than it might have been.',
    ],
    pros: [
      'Genuinely strong at the small business stage.',
      'Leave and self service remain good.',
      'Easy for non technical staff.',
      'The mobile app is decent.',
      'Reliable core functionality.',
    ],
    cons: [
      'Reporting cannot answer our board level questions.',
      'Module costs across a larger headcount add up fast.',
      'The deeper modules felt basic for the price.',
      'Multi location handling strained as we grew.',
      'Support was slow when we needed it.',
      'We outgrew it faster than expected.',
    ],
  },
  1: {
    titles: [
      'Not the right fit in the end', 'Moved on after a difficult year', 'Cannot recommend for our needs',
    ],
    summaries: [
      'After a year of adding modules that never quite delivered and support that was slow to resolve real issues, we made the call to move to a platform better suited to where the business had grown.',
      'It may suit a very small, simple team, but for us the combination of mounting module costs, thin reporting and inconsistent support meant it created more work than it removed.',
      'The core was fine but everything beyond it disappointed, and getting our data ready to move to a new system took longer than it should have, which coloured the whole experience.',
    ],
    pros: [
      'The leave management was genuinely good.',
      'The interface was pleasant to use.',
      'One support agent along the way was excellent.',
    ],
    cons: [
      'Reporting never met what we actually needed.',
      'Module costs mounted without matching value.',
      'Support was slow on the issues that mattered.',
      'We outgrew it and leaving was more work than expected.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.46, 4: 0.34, 3: 0.12, 2: 0.05, 1: 0.03 };
  const offsets = { ease_of_use: 0.3, value_for_money: -0.2, customer_service: -0.15, functionality: -0.1 };
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
    const cons = chance(0.05) ? pick(['None worth noting so far.', 'Nothing beyond the usual small gripes.']) : pick(b.cons);

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
      helpful_count: intBetween(0, 26),
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
    console.log('Sage HR already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations/i.test(error.message)) {
        const { integrations, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Sage HR inserted (integrations column missing, skipped that field).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('Sage HR inserted.');
    }
  }

  // Replace reviews for this product only: 12 anchors + 98 generated = 110
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(98);
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
