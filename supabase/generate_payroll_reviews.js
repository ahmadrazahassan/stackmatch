// ============================================================================
// Generator for PaySpace (135) and SimplePay (97) reviews.
//
// Written to read like real South African payroll users: casual voice, varied
// length, no stylistic dashes, and ratings that genuinely spread rather than
// clustering on one value. Exports buildReviews(productKey) and, when run
// directly, writes insert_payspace_reviews.sql / insert_simplepay_reviews.sql.
// ============================================================================

const fs = require('fs');
const path = require('path');

// -- Deterministic RNG (per product) -----------------------------------------
let seed = 1;
function rand() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

// -- Shared identity pools ----------------------------------------------------
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
  'Aisha', 'Braam', 'Cindy', 'Dineo', 'Ethan', 'Faith', 'Gareth', 'Heather',
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

const industries = [
  'Accounting', 'Construction', 'Retail', 'Non-Profit Organization Management',
  'Financial Services', 'Information Technology and Services', 'Manufacturing',
  'Hospital & Health Care', 'Health, Wellness and Fitness', 'Legal Services',
  'Consumer Services', 'Logistics and Supply Chain', 'Automotive', 'Education Management',
  'Transportation/Trucking/Railroad', 'Hospitality', 'Food & Beverages', 'Mining & Metals',
  'Staffing and Recruiting', 'Human Resources', 'Wholesale', 'Facilities Services',
  'Restaurants', 'Security and Investigations', 'Farming', 'Marketing and Advertising',
];
const jobTitles = [
  'Payroll Administrator', 'HR Manager', 'Owner', 'Bookkeeper', 'Financial Manager',
  'Office Manager', 'HR and Payroll Officer', 'Accountant', 'Director', 'Operations Manager',
  'Payroll Manager', 'Managing Director', 'HR Business Partner', 'Financial Controller',
  'People Manager', 'Founder', 'Admin Manager', 'HR Administrator', 'CFO', 'Practice Manager',
];
const sizes = ['2-10', '11-50', '51-200', '1', '201-500', '501-1000'];
const durations = ['Less than 6 months', '6-12 months', '1-2 years', '2+ years'];

function makeCompany() {
  if (chance(0.2)) return null;
  const stems = ['Cape', 'Highveld', 'Sandton', 'Umhlanga', 'Karoo', 'Aloe', 'Protea',
    'Sable', 'Kalahari', 'Drakensberg', 'Tygerberg', 'Vaal', 'Acacia', 'Marula',
    'Baobab', 'Summit', 'Anchor', 'Northgate', 'Silverline', 'Bluewater', 'Riverside'];
  const suf = ['', 'Group', 'Pty Ltd', 'Trading', 'Holdings', 'Services', 'Logistics', 'Foods'];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ' Trading'}`.trim();
}

// -- Rating helpers -----------------------------------------------------------
function pickOverall(dist) {
  const r = rand();
  let acc = 0;
  for (let star = 5; star >= 1; star--) {
    acc += dist[star];
    if (r < acc) return star;
  }
  return 1;
}
// Sub-ratings drift around (overall + a per-product category tendency) so each
// of the four category averages lands on its own characteristic value instead
// of every category collapsing to the same number. They are still occasionally
// left blank like real reviews.
function sub(overall, offset, nullChance = 0.12) {
  if (chance(nullChance)) return null;
  let v = Math.round(overall + offset + (rand() * 1.7 - 0.85));
  if (v > 5) v = 5;
  if (v < 1) v = 1;
  return v;
}

// -- Content pools ------------------------------------------------------------
const PAYSPACE = {
  slug: 'payspace',
  count: 135,
  seed: 771,
  dist: { 5: 0.40, 4: 0.30, 3: 0.15, 2: 0.08, 1: 0.07 },
  // Powerful and compliance strong, but a learning curve and patchy support.
  offsets: { ease_of_use: -0.25, value_for_money: -0.1, customer_service: -0.4, functionality: 0.3 },
  countries: ['South Africa', 'South Africa', 'South Africa', 'South Africa',
    'Namibia', 'Botswana', 'Kenya', 'Nigeria', 'Ghana', 'Zambia'],
  content: {
    5: {
      titles: [
        'Does exactly what we need', 'Payroll is a breeze now', 'Really happy with it',
        'Sorted our whole payroll', 'Takes the stress out of month end',
        'Love the self service portal', 'Best decision we made for payroll',
        'Solid system for a growing team', 'Cloud payroll done right',
        'Runs our payroll across three countries', 'Staff love the app',
        'Reliable every single month', 'Glad we switched', 'Handles our compliance for us',
      ],
      summaries: [
        'We moved our whole payroll onto PaySpace last year and honestly I do not know how we managed before. Payslips go out on time every month and staff can pull their own IRP5s without bugging me.',
        'Been using it for a couple of years now across our branches and it just works. The setup took some patience but the team walked us through all of it.',
        'Runs like clockwork. I do payroll for about 80 people and month end used to eat my whole week, now its a day at most.',
        'What sold me was the employee self service. Our people apply for leave and check payslips themselves so my inbox is a lot quieter.',
        'The tax updates come through automatically so I am not scrambling every time the budget changes. Big relief for a small HR team.',
        'Its cloud based so I can run the whole thing from home when I need to. No software to install, no backups to worry about.',
        'Solid product. We are a manufacturing business with weekly and monthly staff and it copes with all of it fine.',
        'Honestly one of the better payroll systems I have used in this country. Does the SARS side properly.',
      ],
      pros: [
        'The employee self service is the big one for me. Staff log in, check payslips, apply for leave and update their own details, which frees up so much of my time.',
        'It handles our EMP201 and the SARS submissions without me having to think too hard. Tax tables update on their own when treasury changes them.',
        'Being cloud based I can run payroll from anywhere. Office, home, on my phone when I am travelling, it does not matter.',
        'Leave management is built into the same system so I am not chasing spreadsheets around the office anymore.',
        'The support team actually understands payroll. When I log a query they know what I am talking about instead of reading off a script.',
        'We run staff in a few African countries and it deals with the different tax rules for each one, which is not easy to find.',
        'Payslips look professional and go out by email automatically. Staff stopped coming to ask for copies.',
        'Reporting is strong once you get the hang of it. I can pull a full cost to company breakdown in a minute or two.',
      ],
      cons: [
        'Took me a while to find my way around the reports section, but once you know where things live it is fine.',
        'The interface looks a bit dated in places. It does the job but a fresh coat of paint would not hurt.',
        'Nothing major honestly. Maybe the mobile app could load a touch quicker.',
        'The onboarding felt like a lot at the start, but thats payroll for you, not really their fault.',
        'I wish a few of the report layouts were easier to customise without asking support.',
        'Sometimes the system is a little slow first thing in the morning when everyone logs in.',
        'None that come to mind really. We are very happy.',
      ],
    },
    4: {
      titles: [
        'Good system, does what it says', 'Happy overall with a few niggles',
        'Reliable payroll for us', 'Solid but has a learning curve',
        'Works well once you get used to it', 'Decent value for a growing business',
        'Gets the job done', 'Would recommend with small caveats',
        'Strong on compliance', 'Good for medium sized teams',
      ],
      summaries: [
        'Overall a good experience. It does everything we need for payroll and the compliance side is handled well, I just found the setup a bit fiddly.',
        'We have been on it about a year. Once you learn where everything is it runs smoothly, but the first month or two was a steep climb.',
        'Reliable and it has not let us down on a pay run yet. Support can be slow at times but they get there.',
        'Good product for the money. Not the prettiest system out there but it is accurate and that matters more to me.',
        'It covers payroll and basic HR in one place which suits us. A few features feel like they need polishing.',
        'Happy with it on the whole. The self service portal saves time even if some staff needed help to get going.',
      ],
      pros: [
        'The compliance handling is the strong point. SARS submissions and statutory stuff are taken care of so I sleep easier.',
        'Self service for staff cuts down on admin. Leave, payslips and personal details are all on them now.',
        'Cloud access means I am not tied to one machine. That flexibility has been useful more than once.',
        'It scales with you. We added headcount and did not have to change anything about how we run payroll.',
        'Payslips email out automatically and look neat and professional.',
        'Reporting is fairly deep once you find your way around it.',
      ],
      cons: [
        'The learning curve is real. Give yourself a good few weeks before you feel comfortable.',
        'Support response times are hit and miss. Sometimes quick, sometimes I wait a day or two.',
        'Some of the screens feel cluttered and it is not always obvious where a setting lives.',
        'Pricing creeps up and the add on modules add to it.',
        'The mobile app is okay but it does less than the desktop version.',
        'Custom reports usually mean a support ticket, which is a bit frustrating.',
      ],
    },
    3: {
      titles: [
        'Okay but not perfect', 'Middle of the road for us', 'Does the basics fine',
        'Mixed feelings', 'Works but could be simpler', 'Fine once you fight through setup',
        'Average experience', 'Gets there in the end',
      ],
      summaries: [
        'It does what it needs to for payroll but I would not call it easy. There is a fair bit of clicking around to get simple things done.',
        'Fine overall. It is accurate and compliant which is the main thing, but the day to day feels clunky compared to what I expected.',
        'We use it because it works, not because we love it. Support is slow and the interface takes getting used to.',
        'Decent for compliance, average on usability. If you are not from a payroll background be ready to learn.',
        'It is okay. Not the worst, not the best. Ticks the boxes but nothing about it wows me.',
      ],
      pros: [
        'Payroll comes out accurate and the statutory submissions are handled, which is what I care about most.',
        'Being able to log in from anywhere is genuinely handy.',
        'It keeps payroll and leave in one place so I am not jumping between systems.',
        'Once it is set up it is stable and runs each month without drama.',
      ],
      cons: [
        'The setup and general navigation are not intuitive. Simple tasks take more steps than they should.',
        'Getting hold of support can take a while and the answers vary depending who you get.',
        'It feels built for bigger companies. As a smaller team a lot of it is overkill for us.',
        'The reporting takes real effort to configure the way you want.',
      ],
    },
    2: {
      titles: [
        'Frustrating more often than not', 'Expected more', 'Hard work to use',
        'Support let us down', 'Not for a small team', 'Struggled with it',
      ],
      summaries: [
        'It is powerful but so complicated that half the features go unused. When something goes wrong support takes forever to come back.',
        'We have battled with this since we moved over. The system is capable but getting it to do what you want is a fight.',
        'Too heavy for a business our size. We spend more time managing the software than doing payroll.',
        'Honestly disappointed. Billing queries dragged on and the support experience soured us on the whole thing.',
      ],
      pros: [
        'When it is set up correctly the actual pay run is accurate.',
        'The compliance side is thorough, I will give it that.',
        'Cloud access is useful, at least I can log in from anywhere.',
      ],
      cons: [
        'Far too complex for what we need. Simple changes require support or a consultant.',
        'Support is slow and you often get passed around before anyone helps.',
        'The pricing and the billing admin were a headache from the start.',
        'It is not friendly for someone without a payroll background at all.',
      ],
    },
    1: {
      titles: [
        'Would not recommend', 'Regret moving to it', 'All the frustration for none of the help',
        'Support is the worst part', 'Save yourself the trouble',
      ],
      summaries: [
        'Nothing but headaches since we onboarded. Queries sit open for weeks and nobody takes ownership. We are already looking to move.',
        'The system is overcomplicated and the support is basically absent when you actually need it. Not worth the money for us.',
        'We lost hours every month working around problems that should never happen in a payroll system. Cannot recommend it.',
      ],
      pros: [
        'The idea of everything in one place is good, the execution just was not there for us.',
        'It can run payroll, when it decides to cooperate.',
      ],
      cons: [
        'Support is slow to the point of being useless when you have a real problem.',
        'Overly complex, and small changes turn into big jobs.',
        'The cost does not match the experience you get, especially for a smaller business.',
        'We ran into glitches often enough that I stopped trusting it.',
      ],
    },
  },
};

const SIMPLEPAY = {
  slug: 'simplepay',
  count: 97,
  seed: 449,
  dist: { 5: 0.58, 4: 0.26, 3: 0.09, 2: 0.04, 1: 0.03 },
  // Very easy, affordable and support is the standout; functionality is lighter.
  offsets: { ease_of_use: 0.3, value_for_money: 0.15, customer_service: 0.35, functionality: -0.35 },
  countries: ['South Africa', 'South Africa', 'South Africa', 'South Africa',
    'South Africa', 'Namibia', 'Botswana'],
  content: {
    5: {
      titles: [
        'Perfect for small business', 'So easy to use', 'Payroll sorted in minutes',
        'Brilliant support', 'Exactly what a small business needs', 'Cannot fault it',
        'Wish I found it sooner', 'Simple by name and by nature', 'Best value payroll in SA',
        'Does everything we need', 'Makes payroll painless', 'Support goes above and beyond',
        'Switched and never looked back', 'Straightforward and affordable',
      ],
      summaries: [
        'I run a small business and needed payroll that would not take a whole course to learn. SimplePay was up and running the same afternoon and I have never looked back.',
        'The support is what wins it for me. I email a question and get a proper answer back the same day, usually within an hour.',
        'For the price it is unbeatable. Payslips email out on their own, the SARS side is handled and I barely have to think about it.',
        'We are only 12 people so I did not want anything heavy. This is exactly right, does the job without the bloat.',
        'Honestly the easiest software I have set up in years. The help guides are clear and you almost never need them.',
        'Been using it for three years for my little agency. It has grown with us and still costs next to nothing.',
        'Payroll used to fill me with dread. Now it is a fifteen minute job and I am done.',
        'Everything you need for SA payroll without paying for a load of features you will never touch.',
      ],
      pros: [
        'It is genuinely simple to use. I am not a payroll person and I had our staff loaded and paid on day one.',
        'The support team is fantastic. Quick, friendly and they actually solve the problem instead of stalling you.',
        'Great value. For a small business the pricing is honestly a pleasant surprise.',
        'Payslips go out by email automatically and the employee self service means staff sort their own leave and documents.',
        'The SARS and EMP201 side is handled properly so I am not stressing about compliance.',
        'Leave tracking is built in and easy to follow. No more spreadsheets.',
        'The help articles are so clear that I usually sort things out myself in a minute.',
        'Setup was quick and I did not need anyone to hold my hand through it.',
      ],
      cons: [
        'It is built for small business so if you wanted heavy HR features you would look elsewhere, but that is not what I need.',
        'The look is fairly plain, though I would rather it be plain and clear than pretty and confusing.',
        'A phone app would be a nice extra one day.',
        'Honestly I am struggling to think of one. It does what I need.',
        'Reporting is basic, but for my size business it is more than enough.',
        'Nothing really. Even the small niggles get fixed when I mention them.',
      ],
    },
    4: {
      titles: [
        'Great value, minor wishes', 'Really good for small teams', 'Easy and affordable',
        'Does the job nicely', 'Happy customer', 'Solid little payroll system',
        'Good for what it is', 'Recommend for small business',
      ],
      summaries: [
        'Very happy with it overall. Easy to use and cheap for a small business, I just wish the reporting was a bit richer.',
        'Been on it a year and it has been smooth. Support is good and the price is fair, a couple of features I would still like to see.',
        'It covers our small payroll well. Not fancy but reliable and that suits me fine.',
        'Good product. The self service and automatic payslips save me time each month.',
        'Does what a small business needs without fuss. A phone app would round it off nicely.',
      ],
      pros: [
        'Simple to learn and quick to run each month, which is exactly what I wanted.',
        'The support is helpful and responds fast when I get stuck.',
        'Really good value for a small business budget.',
        'Automatic payslips and self service take a load off my plate.',
        'Handles the SARS submissions without any drama.',
      ],
      cons: [
        'The reporting is a bit basic if you want to slice the numbers finely.',
        'No mobile app yet, which would be handy.',
        'It is deliberately simple so bigger companies might outgrow it.',
        'A few more customisation options on payslips would be welcome.',
        'The interface is functional rather than modern.',
      ],
    },
    3: {
      titles: [
        'Fine for the basics', 'Okay for a small setup', 'Does the job, nothing more',
        'Decent but limited', 'Middle of the road',
      ],
      summaries: [
        'It works for basic payroll and it is cheap, but the moment you want something a bit more advanced you hit the ceiling.',
        'Fine for a very small business. We started outgrowing it once we passed a certain size.',
        'Gets payroll out fine. The reporting and HR side are thin though.',
        'It is okay. Simple and affordable but do not expect it to do much beyond the basics.',
      ],
      pros: [
        'It is cheap and it does the core payroll job without fuss.',
        'Easy enough to pick up for a simple setup.',
        'Support is friendly when you reach out.',
      ],
      cons: [
        'Once you need more advanced reporting or HR features it falls short.',
        'We outgrew it as the team got bigger.',
        'The feature set is quite limited compared to bigger systems.',
      ],
    },
    2: {
      titles: [
        'Too basic for us', 'Outgrew it quickly', 'Not enough for our needs',
      ],
      summaries: [
        'It was fine when we were tiny but the lack of features became a problem fast. We needed proper reporting and it just was not there.',
        'Cheap but you get what you pay for. We ended up moving to something with more depth.',
      ],
      pros: [
        'The price is low and the basic pay run works.',
        'Setup was quick, I will give it that.',
      ],
      cons: [
        'Far too limited once your needs grow past the basics.',
        'Reporting and HR features are minimal.',
        'We had to switch systems within a year.',
      ],
    },
    1: {
      titles: [
        'Not the right fit for us', 'Left after a few months',
      ],
      summaries: [
        'It just did not have what our business needed and we spent more time working around it than using it. Moved on.',
      ],
      pros: [
        'It is inexpensive, which was the only reason we tried it.',
      ],
      cons: [
        'The features simply were not enough for a business like ours.',
        'We ended up moving to another provider within months.',
      ],
    },
  },
};

// -- Build ---------------------------------------------------------------------
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
    // ~10% of reviews have a very short or blank cons, like real ones.
    const cons = chance(0.1) ? pick(['None really.', 'Nothing so far.', null]) : pick(b.cons);

    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);

    const year = chance(0.55) ? 2026 : (chance(0.6) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    out.push({
      reviewer_name: makeName(),
      reviewer_job_title: pick(jobTitles),
      reviewer_company: makeCompany(),
      reviewer_industry: pick(industries),
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
      summary,
      pros,
      cons,
      vendor_response: null,
      vendor_response_date: null,
      review_date: date,
      helpful_count: intBetween(0, 34),
    });
  }
  return out;
}

module.exports = { buildReviews, PAYSPACE, SIMPLEPAY };

// -- SQL emission (only when run directly) -----------------------------------
function esc(s) {
  if (s === null || s === undefined) return 'NULL';
  return `$q$${s}$q$`;
}
function toSql(product, reviews) {
  let sql = `-- ${reviews.length} reviews for ${product.slug}\nBEGIN;\n\n` +
    `DELETE FROM reviews WHERE software_id = (SELECT id FROM software WHERE slug = '${product.slug}');\n\n` +
    `INSERT INTO reviews (software_id, reviewer_name, reviewer_job_title, reviewer_company, reviewer_industry, reviewer_company_size, reviewer_country, verified_linkedin, verified_badge, used_for_duration, overall_rating, ease_of_use, value_for_money, customer_service, functionality, review_title, summary, pros, cons, vendor_response, vendor_response_date, review_date, helpful_count, status) VALUES\n`;
  const rows = reviews.map(r => `(
  (SELECT id FROM software WHERE slug = '${product.slug}'),
  ${esc(r.reviewer_name)}, ${esc(r.reviewer_job_title)}, ${esc(r.reviewer_company)},
  ${esc(r.reviewer_industry)}, ${esc(r.reviewer_company_size)}, ${esc(r.reviewer_country)},
  ${r.verified_linkedin}, ${esc(r.verified_badge)}, ${esc(r.used_for_duration)},
  ${r.overall_rating}, ${r.ease_of_use === null ? 'NULL' : r.ease_of_use}, ${r.value_for_money === null ? 'NULL' : r.value_for_money}, ${r.customer_service === null ? 'NULL' : r.customer_service}, ${r.functionality === null ? 'NULL' : r.functionality},
  ${esc(r.review_title)}, ${esc(r.summary)}, ${esc(r.pros)}, ${esc(r.cons)},
  NULL, NULL, ${esc(r.review_date)}, ${r.helpful_count}, 'published'
)`);
  return sql + rows.join(',\n') + ';\n\nCOMMIT;\n';
}

if (require.main === module) {
  for (const product of [PAYSPACE, SIMPLEPAY]) {
    const reviews = buildReviews(product);
    const file = `insert_${product.slug}_reviews.sql`;
    fs.writeFileSync(path.join(__dirname, file), toSql(product, reviews), 'utf-8');
    console.log(`Generated ${reviews.length} reviews -> ${file}`);
  }
}
