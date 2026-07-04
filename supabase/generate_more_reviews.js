// ============================================================================
// Generator for the remaining products: BambooHR, Odoo, Zoho CRM.
//
// Same house style as the payroll generator: human South African voice, no
// stylistic dashes, ratings that spread rather than cluster, and per-category
// offsets so each of the four category averages lands on its own value.
// Exports buildReviews(product) and writes one SQL file per product when run.
// ============================================================================

const fs = require('fs');
const path = require('path');

let seed = 1;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Thandeka', 'Sipho', 'Lerato', 'Johan', 'Anika', 'Pieter', 'Nomvula', 'Riaan',
  'Michelle', 'David', 'Sarah', 'Andrew', 'Bongani', 'Chantelle', 'Naledi', 'Willem',
  'Kabelo', 'Emily', 'Jason', 'Rebecca', 'Tebogo', 'Marius', 'Priya', 'Ashwin',
  'Zanele', 'Grant', 'Lindiwe', 'Ruan', 'Megan', 'Sizwe', 'Carla', 'Themba',
  'Nadia', 'Dumisani', 'Kayla', 'Nomsa', 'Francois', 'Amahle', 'Devon', 'Yolanda',
  'Keegan', 'Refilwe', 'Simone', 'Tumelo', 'Bianca', 'Musa', 'Charlene', 'Elandri',
  'Jared', 'Palesa', 'Neil', 'Karabo', 'Vanessa', 'Ahmed', 'Fatima', 'Gugu',
  'Hendrik', 'Ilse', 'Katlego', 'Leonie', 'Mpho', 'Owethu', 'Quinton', 'Rethabile',
  'Stefan', 'Tasneem', 'Unathi', 'Vusi', 'Wesley', 'Xolani', 'Yusuf', 'Zaid',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTVWZ'.split('');
const fullSurnames = [
  'Nkosi', 'van der Merwe', 'Botha', 'Dlamini', 'Naidoo', 'Pillay', 'Khumalo',
  'du Toit', 'Mokoena', 'Pretorius', 'Jacobs', 'Ndlovu', 'Fourie', 'Adams', 'Mahlangu',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.25)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.2)) return null;
  const stems = ['Cape', 'Highveld', 'Sandton', 'Umhlanga', 'Karoo', 'Aloe', 'Protea',
    'Sable', 'Kalahari', 'Drakensberg', 'Tygerberg', 'Vaal', 'Acacia', 'Marula',
    'Baobab', 'Summit', 'Anchor', 'Northgate', 'Silverline', 'Bluewater', 'Riverside'];
  const suf = ['', 'Group', 'Pty Ltd', 'Trading', 'Holdings', 'Services', 'Digital', 'Labs'];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ' Trading'}`.trim();
}
const sizes = ['2-10', '11-50', '51-200', '1', '201-500', '501-1000'];
const durations = ['Less than 6 months', '6-12 months', '1-2 years', '2+ years'];

function pickOverall(dist) {
  const r = rand(); let acc = 0;
  for (let s = 5; s >= 1; s--) { acc += dist[s]; if (r < acc) return s; }
  return 1;
}
function sub(overall, offset, nullChance = 0.12) {
  if (chance(nullChance)) return null;
  let v = Math.round(overall + offset + (rand() * 1.7 - 0.85));
  if (v > 5) v = 5; if (v < 1) v = 1;
  return v;
}

// ---------------------------------------------------------------------------
const BAMBOOHR = {
  slug: 'bamboohr',
  count: 118,
  seed: 6021,
  dist: { 5: 0.58, 4: 0.26, 3: 0.09, 2: 0.04, 1: 0.03 },
  offsets: { ease_of_use: 0.3, value_for_money: -0.25, customer_service: 0.15, functionality: -0.05 },
  countries: ['South Africa', 'South Africa', 'South Africa', 'South Africa', 'Namibia', 'Kenya', 'United Kingdom'],
  industries: ['Information Technology and Services', 'Retail', 'Financial Services', 'Health, Wellness and Fitness',
    'Non-Profit Organization Management', 'Marketing and Advertising', 'Education Management', 'Hospitality',
    'Staffing and Recruiting', 'Consumer Services', 'Manufacturing', 'Legal Services', 'Computer Software'],
  jobs: ['HR Manager', 'People Operations Lead', 'HR Business Partner', 'Talent Manager', 'Office Manager',
    'HR Administrator', 'Head of People', 'Founder', 'Operations Manager', 'Managing Director', 'HR Generalist'],
  content: {
    5: {
      titles: ['Makes HR admin so much easier', 'Our team actually enjoys using it', 'Onboarding is a breeze now',
        'Everything in one place at last', 'Best HR system we have used', 'Staff love the self service',
        'Took the paperwork away', 'Simple and does what we need', 'Great for a small HR team',
        'Time off tracking finally sorted', 'Clean and easy to use', 'So glad we moved to it'],
      summaries: [
        'We used to keep everything in spreadsheets and folders. Now all our employee records, leave and documents sit in one place and the team can help themselves.',
        'Rolled it out to about 60 staff and the feedback has been great. People find it easy and I get my time back.',
        'The time off side alone was worth it. No more long email chains just to approve a day of leave.',
        'Onboarding a new starter used to eat a whole day of admin. Now most of it runs itself before they even walk in.',
        'It just feels friendly to use. Even the staff who normally hate software got the hang of it in a day.',
        'We are a growing business and this keeps all our people info tidy and in one place instead of scattered everywhere.',
      ],
      pros: [
        'The self service is the winner for me. Staff update their own details, book leave and grab their documents without coming to my desk.',
        'The onboarding workflows save me hours. New starters get their paperwork and welcome emails without me chasing anything.',
        'It is easy on the eye and easy to learn, which really matters when you roll it out to people who are not techy.',
        'Having every record, contract and review in one place has been a huge tidy up for us.',
        'Support has been quick and genuinely helpful the couple of times I needed them.',
        'Leave requests and approvals are simple and everyone can see their own balance at a glance.',
      ],
      cons: [
        'The reporting covers the basics but I sometimes want to slice the data in ways it will not let me.',
        'It sits at the pricier end and a few features are add ons on top.',
        'Payroll is not really built for South Africa so we run that side separately.',
        'A couple of the settings are tucked away and I had to ask support where to find them.',
        'Nothing major. It does what we need day to day.',
        'None really, we are very happy with it.',
      ],
    },
    4: {
      titles: ['Good HR system with a couple of gaps', 'Happy overall', 'Solid and easy to use',
        'Great for people admin', 'Does most of what we need', 'Recommend for small to mid teams',
        'Tidy and reliable', 'Worth it despite the price'],
      summaries: [
        'Overall a really good system. The staff side is lovely to use, I just wish the reporting went a bit deeper.',
        'We have been on it about a year and it runs well. The price is the only thing that makes me pause.',
        'It covers the core HR admin nicely. A few features are more built for the US than for us here.',
        'Happy with it. Self service and onboarding save real time even if setup took a bit of thought.',
      ],
      pros: [
        'The employee self service takes a load of little requests off my plate.',
        'It is genuinely easy for non technical staff to pick up.',
        'Keeping records, leave and documents together has cleaned up our admin.',
        'Onboarding new people is far smoother than it used to be.',
        'Support is helpful when I reach out.',
      ],
      cons: [
        'Reporting is a little thin if you want to dig into the numbers.',
        'It is not cheap and some bits are paid add ons.',
        'A few features assume a US setup and are not that useful to us.',
        'The occasional setting is hard to find without asking.',
      ],
    },
    3: {
      titles: ['Fine but pricey for what we use', 'Okay HR tool', 'Does the basics well enough', 'Mixed feelings on value'],
      summaries: [
        'It is a decent system and easy enough, but for our size we are paying for a lot we never touch.',
        'Works fine for records and leave. The reporting and some features feel limited for the price.',
        'Good on the day to day, but a chunk of it is aimed at bigger US companies and does not apply to us.',
      ],
      pros: [
        'Staff self service and leave tracking are the parts we actually use and they work well.',
        'It is easy to navigate for everyone on the team.',
        'Records are neatly kept in one place.',
      ],
      cons: [
        'For a small team the pricing is hard to justify against how much we use.',
        'Reporting does not go as deep as I would like.',
        'Several features are clearly built for the US market.',
      ],
    },
    2: {
      titles: ['Too costly for our needs', 'Expected more for the price', 'Not the right fit for a small SA team'],
      summaries: [
        'It looks great but we are paying a premium for features that do not suit a South African business.',
        'The system is fine, the value is not. We could not justify the renewal for what we actually use.',
      ],
      pros: ['The interface is nice and staff found it easy.', 'Leave and records are handled fine.'],
      cons: ['Pricing is steep for a small team.', 'A lot of it is built for the US and does not apply to us.',
        'Reporting is limited unless you pay more.'],
    },
    1: {
      titles: ['Not worth the money for us', 'Wrong tool for our market'],
      summaries: ['We paid a lot and used a fraction of it. Too much of the product assumes a US setup and support could not bridge the gap.'],
      pros: ['It looked polished, I will give it that.'],
      cons: ['Far too expensive for what a small business here actually uses.', 'Too much of it is irrelevant outside the US.'],
    },
  },
};

const ODOO = {
  slug: 'odoo',
  count: 138,
  seed: 8143,
  dist: { 5: 0.42, 4: 0.30, 3: 0.15, 2: 0.08, 1: 0.05 },
  offsets: { ease_of_use: -0.4, value_for_money: 0.3, customer_service: -0.4, functionality: 0.35 },
  countries: ['South Africa', 'South Africa', 'South Africa', 'Namibia', 'Botswana', 'Kenya', 'Nigeria'],
  industries: ['Manufacturing', 'Retail', 'Wholesale', 'Logistics and Supply Chain', 'Construction',
    'Information Technology and Services', 'Food & Beverages', 'Automotive', 'Consumer Goods',
    'Farming', 'Import and Export', 'E-commerce', 'Electrical/Electronic Manufacturing'],
  jobs: ['Owner', 'Operations Manager', 'Managing Director', 'IT Manager', 'Finance Manager',
    'Systems Administrator', 'General Manager', 'Founder', 'Supply Chain Manager', 'Project Manager', 'CEO'],
  content: {
    5: {
      titles: ['One system for the whole business', 'Replaced five different tools', 'Amazing value for what you get',
        'Runs our entire operation', 'Flexible enough for almost anything', 'Love that it is all connected',
        'Great once it is set up', 'Powerful and well worth the effort', 'Grows with the business',
        'Best value business software we found'],
      summaries: [
        'We were juggling separate tools for sales, stock and invoicing. Odoo pulled all of it into one place and the modules actually talk to each other.',
        'Yes it takes work to set up, but once it is running it does the job of software that costs many times more.',
        'We started with just CRM and inventory and kept switching on modules as we grew. That flexibility is the whole point for me.',
        'Our stock, sales and accounting finally live in one system and I can see the full picture instead of stitching reports together.',
        'It runs our manufacturing and our shop front off the same database. Took effort to get there but it was worth it.',
      ],
      pros: [
        'Everything is connected. A sale flows through to inventory and accounting without me re entering a thing.',
        'The value is hard to beat. You get a huge amount of functionality for what you pay.',
        'You switch on only the modules you need and add more later, so it fits a small business and a bigger one.',
        'It is very customisable. With a decent partner you can shape it to how you actually work.',
        'The community and documentation are large so there is usually an answer out there when you get stuck.',
      ],
      cons: [
        'The setup is a proper project. Budget the time and probably a partner to get it right.',
        'Support really depends on your partner. The official channel can be slow.',
        'Some modules feel more finished than others.',
        'Upgrading between versions can be a bit of a headache.',
        'There is a learning curve for staff, it is not something you just switch on and go.',
      ],
    },
    4: {
      titles: ['Powerful but needs setup', 'Great value once configured', 'Does a lot for the money',
        'Solid all in one, some rough edges', 'Recommend with a good partner', 'Flexible and capable',
        'Good ERP for a growing business', 'Worth the effort'],
      summaries: [
        'Loads of functionality for the price. Just go in knowing it is not plug and play, you need to invest in setup.',
        'We run most of the business on it now. Some modules are stronger than others but the core is solid.',
        'Great once it was configured to us. Getting there took a partner and a few months.',
        'The all in one idea works well for us. Support through the official line can drag though.',
      ],
      pros: [
        'Having sales, stock and accounting joined up has cut out a lot of double capturing.',
        'The price to functionality ratio is excellent.',
        'You can tailor it heavily to your own processes.',
        'Adding new modules as we grew was straightforward.',
      ],
      cons: [
        'It is not simple to set up and staff need training.',
        'Official support is slow, a good partner matters a lot.',
        'A few modules feel half finished.',
        'Version upgrades can break customisations.',
      ],
    },
    3: {
      titles: ['Capable but complex', 'Good on paper, hard in practice', 'Powerful but a lot of work', 'Mixed experience'],
      summaries: [
        'The functionality is all there but getting it to work the way you want takes real effort and usually money for a partner.',
        'It can do almost anything, which is also the problem. Simple tasks can end up complicated.',
        'We get value from it but the setup and the support have both been frustrating.',
      ],
      pros: [
        'When it is configured properly it is genuinely powerful.',
        'The value for the feature set is very good.',
        'Everything being in one database is a real plus.',
      ],
      cons: [
        'The complexity is a lot for a small team to manage.',
        'Support is slow unless you pay a partner.',
        'Upgrades and customisations do not always play nicely together.',
      ],
    },
    2: {
      titles: ['Too complex for us', 'More work than we bargained for', 'Setup nearly broke us'],
      summaries: [
        'The idea is great but we spent months and a lot of money getting it usable, and it still fights us on simple things.',
        'Powerful yes, but the complexity and the weak official support made it a slog for a small business.',
      ],
      pros: ['The breadth of features is genuinely impressive.', 'The pricing on the software itself is fair.'],
      cons: ['Implementation was long, painful and expensive.', 'Official support is close to useless without a partner.',
        'It is far too complex for a small team to run alone.'],
    },
    1: {
      titles: ['Regret the implementation', 'Not for a small business without a partner'],
      summaries: ['We underestimated how much work it would be. Months in and it still is not right, and getting help without a paid partner is a nightmare.'],
      pros: ['On paper it does everything, the reality was another story for us.'],
      cons: ['The setup effort and cost were far beyond what we were led to expect.', 'Support was slow and unhelpful when we were stuck.'],
    },
  },
};

const ZOHO_CRM = {
  slug: 'zoho-crm',
  count: 96,
  seed: 3307,
  dist: { 5: 0.50, 4: 0.28, 3: 0.13, 2: 0.06, 1: 0.03 },
  offsets: { ease_of_use: -0.05, value_for_money: 0.3, customer_service: -0.25, functionality: 0.15 },
  countries: ['South Africa', 'South Africa', 'South Africa', 'South Africa', 'Namibia', 'Kenya', 'Nigeria'],
  industries: ['Marketing and Advertising', 'Information Technology and Services', 'Financial Services',
    'Real Estate', 'Consumer Services', 'Retail', 'Wholesale', 'Professional Training & Coaching',
    'Insurance', 'Computer Software', 'Business Supplies and Equipment', 'Staffing and Recruiting'],
  jobs: ['Sales Manager', 'Owner', 'Marketing Manager', 'Sales Director', 'Founder', 'Business Development Manager',
    'Operations Manager', 'Account Manager', 'Managing Director', 'CRM Administrator', 'Head of Sales'],
  content: {
    5: {
      titles: ['Does everything our sales team needs', 'Brilliant value for a CRM', 'Customised it to fit us perfectly',
        'Our pipeline is finally organised', 'Great automation for the price', 'Runs our whole sales process',
        'So much for so little', 'Really happy with the switch', 'Powerful once you set it up',
        'Keeps the whole team on the same page'],
      summaries: [
        'We tried the big name CRMs and could not justify the cost. Zoho does everything we need for a fraction of the price.',
        'The automation has taken a lot of admin off my reps. Follow ups and reminders just happen now on their own.',
        'We spent a weekend setting up the layouts and fields and now it fits our sales process exactly.',
        'Being part of the wider Zoho suite means it plugs into our mail and books without much fuss.',
        'It gave our small sales team the structure we were missing. Everyone can see where every deal stands.',
      ],
      pros: [
        'The value is the standout. You get proper CRM features without the enterprise price tag.',
        'It is very customisable. Fields, layouts and pipelines all bend to how we actually work.',
        'The workflow automation handles the boring follow up tasks so the reps can focus on selling.',
        'It ties into the other Zoho tools we already use, so our data is not scattered.',
        'The dashboards give me a clear view of the pipeline at any moment.',
      ],
      cons: [
        'The interface can feel busy and it took the team a little while to warm to it.',
        'Support is a mixed bag, sometimes quick and sometimes slow to come back.',
        'There is a learning curve to get the customisation set up right.',
        'A few of the nicer features only show up on the higher plans.',
        'It can be a lot of clicking to get where you want.',
      ],
    },
    4: {
      titles: ['Great value CRM with a learning curve', 'Solid for the money', 'Powerful once configured',
        'Good for a small sales team', 'Happy overall', 'Does the job well', 'Recommend for the price',
        'Flexible and capable'],
      summaries: [
        'Really good value. It does far more than we expected for the price, you just have to put the setup time in.',
        'Been using it a year for our small team. The automation is the best part, the interface takes getting used to.',
        'It fits our process well after some customising. Support has been up and down.',
        'Covers our pipeline and follow ups nicely. A few features sit on plans above ours.',
      ],
      pros: [
        'You get a lot of CRM for very little money.',
        'The customisation lets us match it to our sales steps.',
        'Automation saves the reps a lot of manual follow up.',
        'It links up with the rest of the Zoho apps we use.',
      ],
      cons: [
        'The interface is a bit cluttered and takes time to learn.',
        'Support quality varies depending who you get.',
        'Some features are locked to the pricier tiers.',
        'Getting the customisation right takes patience.',
      ],
    },
    3: {
      titles: ['Good value but clunky', 'Decent CRM, busy interface', 'Fine once you learn it', 'Mixed but affordable'],
      summaries: [
        'The price is great and it can do a lot, but the interface feels dated and it takes real effort to set up.',
        'It works for tracking deals and it is cheap, I just find it fiddly to get around day to day.',
        'Plenty of features for the money, though support was slow when we needed it.',
      ],
      pros: [
        'It is affordable and the feature list is long for the price.',
        'Once set up it keeps our deals and contacts in order.',
        'The automation is handy when you get it going.',
      ],
      cons: [
        'The interface is busy and not the easiest to learn.',
        'Support can be slow and inconsistent.',
        'Setting it up the way you want takes time and effort.',
      ],
    },
    2: {
      titles: ['Clunky and hard to warm to', 'Cheap but frustrating', 'More effort than it was worth for us'],
      summaries: [
        'The price drew us in but the interface and the setup fought us the whole way. The team never really took to it.',
        'It can do a lot on paper, but between the clunky screens and slow support we struggled to get value out of it.',
      ],
      pros: ['It is inexpensive.', 'The feature set is broad for the money.'],
      cons: ['The interface is cluttered and dated.', 'Support was slow when we hit problems.',
        'The learning curve put the team off using it properly.'],
    },
    1: {
      titles: ['Could not get the team to use it', 'Too fiddly for us'],
      summaries: ['We liked the price but never got past how awkward it felt to use day to day, and support did not help us turn it around.'],
      pros: ['It was cheap to try.'],
      cons: ['The interface was too clunky for the team to adopt.', 'Support was slow and did not resolve our issues.'],
    },
  },
};

// ---------------------------------------------------------------------------
function buildReviews(product) {
  seed = product.seed;
  const out = [];
  const seen = new Set();
  let guard = 0;
  while (out.length < product.count && guard < product.count * 60) {
    guard++;
    const overall = pickOverall(product.dist);
    const b = product.content[overall];
    const title = pick(b.titles);
    const summary = pick(b.summaries);
    const pros = pick(b.pros);
    const cons = chance(0.1) ? pick(['None really.', 'Nothing so far.', null]) : pick(b.cons);

    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);

    const year = chance(0.55) ? 2026 : (chance(0.6) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    out.push({
      reviewer_name: makeName(),
      reviewer_job_title: pick(product.jobs),
      reviewer_company: makeCompany(),
      reviewer_industry: pick(product.industries),
      reviewer_company_size: pick(sizes),
      reviewer_country: pick(product.countries),
      verified_linkedin: chance(0.38),
      verified_badge: chance(0.35) ? 'Verified LinkedIn User' : null,
      used_for_duration: pick(durations),
      overall_rating: overall,
      ease_of_use: sub(overall, product.offsets.ease_of_use),
      value_for_money: sub(overall, product.offsets.value_for_money),
      customer_service: sub(overall, product.offsets.customer_service, 0.18),
      functionality: sub(overall, product.offsets.functionality),
      review_title: title,
      summary, pros, cons,
      vendor_response: null, vendor_response_date: null,
      review_date: date,
      helpful_count: intBetween(0, 34),
    });
  }
  return out;
}

module.exports = { buildReviews, BAMBOOHR, ODOO, ZOHO_CRM };

function esc(s) { return (s === null || s === undefined) ? 'NULL' : `$q$${s}$q$`; }
function toSql(product, reviews) {
  let sql = `-- ${reviews.length} reviews for ${product.slug}\nBEGIN;\n\n` +
    `DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = '${product.slug}');\n\n` +
    `INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES\n`;
  const rows = reviews.map(r => `(
  (SELECT id FROM software WHERE slug = '${product.slug}'),
  ${esc(r.reviewer_name)}, ${esc(r.reviewer_job_title)}, ${esc(r.reviewer_company)},
  ${esc(r.reviewer_industry)}, ${esc(r.reviewer_company_size)}, ${esc(r.reviewer_country)},
  ${r.verified_linkedin}, ${esc(r.verified_badge)}, ${esc(r.used_for_duration)},
  ${r.overall_rating}, ${r.ease_of_use ?? 'NULL'}, ${r.value_for_money ?? 'NULL'}, ${r.customer_service ?? 'NULL'}, ${r.functionality ?? 'NULL'},
  ${esc(r.review_title)}, ${esc(r.summary)}, ${esc(r.pros)}, ${esc(r.cons)},
  NULL, NULL, ${esc(r.review_date)}, ${r.helpful_count}, 'published'
)`);
  return sql + rows.join(',\n') + ';\n\nCOMMIT;\n';
}

if (require.main === module) {
  for (const product of [BAMBOOHR, ODOO, ZOHO_CRM]) {
    const reviews = buildReviews(product);
    const file = `insert_${product.slug}_reviews.sql`;
    fs.writeFileSync(path.join(__dirname, file), toSql(product, reviews), 'utf-8');
    console.log(`Generated ${reviews.length} reviews -> ${file}`);
  }
}
