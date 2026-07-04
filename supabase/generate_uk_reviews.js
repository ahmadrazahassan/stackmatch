// ============================================================================
// UK review generator for the 12 products added in migration_006.
//   FreeAgent, QuickFile, BrightPay, Moorepay, Breathe HR, CharlieHR,
//   Capsule CRM, HubSpot CRM, Sage 200, Dynamics 365 Business Central,
//   monday.com, Asana.
//
// House style: a natural British business voice, no stylistic dashes, UK
// spelling, references to MTD / HMRC / RTI / auto-enrolment where relevant,
// ratings that spread rather than cluster, per-dimension offsets so each
// category average lands on its own value, and occasional vendor responses.
// Exports buildReviews(product) and the 12 product definitions.
// ============================================================================

let seed = 1;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const FIRST = [
  'Emma', 'Tom', 'Sarah', 'James', 'Olivia', 'Daniel', 'Charlotte', 'Jack', 'Sophie',
  'Ben', 'Hannah', 'Ryan', 'Megan', 'Chris', 'Rachel', 'Andrew', 'Lucy', 'Mark',
  'Katie', 'David', 'Laura', 'Gareth', 'Rebecca', 'Ian', 'Fiona', 'Callum', 'Nadia',
  'Priya', 'Daniel', 'Louise', 'Helen', 'Adam', 'Chloe', 'Michael', 'Amy', 'Ross',
  'Jodie', 'Nathan', 'Sian', 'Owen', 'Bethan', 'Liam', 'Grace', 'Harry', 'Ellie',
  'Scott', 'Natalie', 'Paul', 'Danielle', 'Craig', 'Jessica', 'Aaron', 'Holly',
  'Sofia', 'Zara', 'Elliot', 'Freya', 'Josh', 'Amara', 'Kieran', 'Naomi', 'Dominic',
];
const SUR = [
  'Whitfield', 'Hargreaves', 'Bennett', 'Caldwell', 'Turner', 'Osei', 'Fraser', 'Nair',
  'Docherty', 'Marsh', 'Pople', 'Lloyd', 'Grant', 'Carter', 'Rahman', 'Fielding',
  'Simmons', 'Adeyemi', 'Kavanagh', 'Pemberton', 'Campbell', 'Price', 'Blackwood',
  'Foster', 'Bailey', 'Sharma', 'Clarke', 'Hughes', 'Patel', 'Robinson', 'Ahmed',
  'Coates', 'Nolan', 'Wren', 'Ashworth', 'Mercer', 'Beckett', 'Holt', 'Vaughan',
];
const LAST_INIT = 'ABCDEFGHJKLMNPRSTVWY'.split('');
function makeName() {
  const f = pick(FIRST);
  if (chance(0.45)) return `${f} ${pick(SUR)}`;
  return `${f} ${pick(LAST_INIT)}.`;
}
const CO_STEMS = ['Northgate', 'Pennine', 'Thames', 'Kingsway', 'Albion', 'Camden', 'Bramley',
  'Whitfield', 'Harborne', 'Cotswold', 'Mersey', 'Clyde', 'Fenwick', 'Ashcroft', 'Blackwood',
  'Redgate', 'Hollybush', 'Marlow', 'Selby', 'Danebridge', 'Oakwell', 'Farrow', 'Linden',
  'Prospect', 'Meridian', 'Carrick', 'Brindley', 'Waverley', 'Hartley', 'Stonebridge'];
const CO_SUF = ['Ltd', 'Group', '& Co', 'Consulting', 'Studio', 'Solutions', 'Partners',
  'Services', 'Trading', 'Associates', 'Digital', ''];
function makeCompany() {
  if (chance(0.15)) return null;
  const suf = pick(CO_SUF);
  return `${pick(CO_STEMS)}${suf ? ' ' + suf : ''}`.trim();
}
const UK = ['United Kingdom'];
const SIZES = ['1', '2-10', '11-50', '51-200', '201-500', '501-1000'];
const DURATIONS = ['Less than 6 months', '6-12 months', '1-2 years', '2+ years'];

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
// Product definitions
// ---------------------------------------------------------------------------
const ACC_IND = ['Accounting', 'Information Technology and Services', 'Marketing and Advertising',
  'Construction', 'Retail', 'Professional Services', 'Hospitality', 'Design', 'E-commerce',
  'Consulting', 'Media Production', 'Photography', 'Real Estate'];
const HR_IND = ['Information Technology and Services', 'Marketing and Advertising', 'Recruitment',
  'Professional Services', 'Retail', 'Hospitality', 'Charity/Non-Profit', 'Design', 'Healthcare',
  'Education', 'Construction', 'Financial Services', 'Manufacturing'];
const PAY_IND = ['Accounting', 'Manufacturing', 'Construction', 'Healthcare', 'Retail', 'Hospitality',
  'Transportation and Logistics', 'Professional Services', 'Care Services', 'Facilities Management'];
const CRM_IND = ['Marketing and Advertising', 'Information Technology and Services', 'Professional Services',
  'Financial Services', 'Real Estate', 'Recruitment', 'Wholesale', 'Consulting', 'Manufacturing',
  'Insurance', 'Media Production', 'Construction'];
const ERP_IND = ['Manufacturing', 'Wholesale', 'Retail', 'Construction', 'Food and Beverage',
  'Distribution', 'Engineering', 'Import and Export', 'Professional Services', 'Automotive'];
const PM_IND = ['Marketing and Advertising', 'Information Technology and Services', 'Design',
  'Media Production', 'Construction', 'Professional Services', 'Education', 'Charity/Non-Profit',
  'Events', 'Architecture', 'Consulting', 'Software'];

const FREEAGENT = {
  slug: 'freeagent', count: 78, seed: 4101, vendor: 'FreeAgent',
  dist: { 5: 0.55, 4: 0.28, 3: 0.10, 2: 0.04, 1: 0.03 },
  offsets: { ease_of_use: 0.35, value_for_money: 0.2, customer_service: 0.0, functionality: -0.15 },
  industries: ACC_IND,
  jobs: ['Director', 'Freelance Consultant', 'Sole Trader', 'Owner', 'Contractor', 'Founder',
    'Company Director', 'Bookkeeper', 'Accountant', 'Managing Director'],
  content: {
    5: {
      titles: ['Finally, MTD without the headache', 'Perfect for a limited company director',
        'Self Assessment sorted in an afternoon', 'Made me confident with my own books',
        'Free with my bank and brilliant', 'The tax forecast is a lifesaver', 'Ideal for contractors',
        'No more dreading VAT quarter', 'Everything a freelancer needs', 'Genuinely easy accounting'],
      summaries: [
        'As a limited company director I used to dread the VAT return. FreeAgent files straight to HMRC and tells me what I owe well ahead of time.',
        'I contract through my own company and it handles dividends, expenses and Self Assessment without me needing an accountant.',
        'The Corporation Tax and Self Assessment forecasting takes the fear out of the whole thing. I always know roughly what is coming.',
        'I got it free through my NatWest business account and it does far more than I expected for nothing.',
        'Invoicing, bank feeds and VAT all sit in one tidy place. My accountant just logs in at year end and it is done.',
        'I am not an accountant and it still made sense to me within a week. The tax timeline is the feature I did not know I needed.',
      ],
      pros: [
        'The tax timeline shows exactly what is due and when, so nothing sneaks up on me.',
        'MTD for VAT just works. I press submit and it goes to HMRC without any faff.',
        'Getting it free with my bank account makes it unbeatable value for a small business.',
        'The self employed and Self Assessment side is far friendlier than anything else I tried.',
        'Bank feeds pull everything in and the guesses at categories are usually right.',
        'The mobile app is genuinely useful for logging expenses on the move.',
      ],
      cons: [
        'Stock and inventory is basically not there, so it does not suit a product business.',
        'Phone support has limited hours and month end can get busy.',
        'It is aimed at smaller businesses, so you can outgrow it if you scale quickly.',
        'A few of the reports are quite basic compared with the bigger packages.',
        'Not much really, it does what I need.',
        'Multi currency is a bit limited if you invoice abroad a lot.',
      ],
    },
    4: {
      titles: ['Great for contractors, minor gaps', 'Really happy with it', 'Does the job beautifully',
        'Ideal first accounting system', 'Solid and easy to learn', 'Recommend for freelancers',
        'Tidy and reliable', 'Good value, especially free with a bank'],
      summaries: [
        'It handles my company accounts and Self Assessment without an accountant. I just wish the reporting went a little deeper.',
        'Lovely to use day to day. Support can lag at busy times but the software itself is excellent.',
        'Covers invoicing, expenses and VAT really well. Inventory is the one thing it does not do for me.',
        'A year in and it runs smoothly. Getting it free with the bank makes the value a no brainer.',
      ],
      pros: [
        'The MTD submissions are painless and the tax estimates keep me calm.',
        'Genuinely easy to learn for someone who is not a numbers person.',
        'Bank feeds and reconciliation save me a lot of manual work.',
        'The Self Assessment flow is the best I have used.',
      ],
      cons: [
        'Reporting is a bit light if you want to dig into the detail.',
        'No real stock management for product sellers.',
        'Support hours could be longer around deadlines.',
      ],
    },
    3: {
      titles: ['Good but outgrew it', 'Fine for very simple books', 'Nice software, some limits', 'Decent but basic reporting'],
      summaries: [
        'It was perfect when I started out, but as the business grew I hit the limits on reporting and stock.',
        'Easy to use and the tax side is good, but I found the reports too simple once I needed more detail.',
      ],
      pros: ['The tax timeline and MTD filing are genuinely good.', 'Very easy to pick up.', 'Free with my bank account.'],
      cons: ['Reporting is too basic for a growing business.', 'No stock control.', 'You can outgrow it.'],
    },
    2: {
      titles: ['Too basic once you grow', 'Not for product businesses'],
      summaries: ['The tax features are nice but the lack of proper inventory and deeper reporting meant we had to move on.'],
      pros: ['The MTD and Self Assessment filing worked well.'],
      cons: ['No stock management at all.', 'Reporting is too shallow for anything beyond a very small business.'],
    },
    1: {
      titles: ['Did not suit our shop', 'Outgrew it too fast'],
      summaries: ['We sell physical products and the complete lack of inventory made it unworkable for us.'],
      pros: ['The invoicing looked smart.'],
      cons: ['No inventory or stock control whatsoever.', 'We had to migrate within months as we grew.'],
    },
  },
};

const QUICKFILE = {
  slug: 'quickfile', count: 54, seed: 5210, vendor: 'QuickFile',
  dist: { 5: 0.48, 4: 0.30, 3: 0.13, 2: 0.06, 1: 0.03 },
  offsets: { ease_of_use: 0.0, value_for_money: 0.5, customer_service: 0.1, functionality: -0.1 },
  industries: ACC_IND.concat(['Landlord/Property', 'Sole Trader Services']),
  jobs: ['Owner', 'Sole Trader', 'Landlord', 'Director', 'Bookkeeper', 'Freelancer', 'Founder', 'Contractor'],
  content: {
    5: {
      titles: ['Genuinely free and does the job', 'Perfect for a small business budget', 'Cannot fault the value',
        'Great for my property accounts', 'Free and surprisingly capable', 'Ideal for a sole trader',
        'Everything I need for nothing', 'The community forum is gold', 'Sorted my VAT with no fuss',
        'Best free accounting I found'],
      summaries: [
        'I run a small trade business and QuickFile costs me nothing. The invoices look professional and bank tagging saves hours.',
        'I manage a few rental properties and it keeps everything tidy for Self Assessment without a monthly subscription.',
        'For a business my size it is free, which is remarkable given how much it actually does.',
        'The VAT returns submit fine under MTD and the bank tagging is quick once you set the rules up.',
        'When I got stuck the community forum had an answer within the hour. You do not expect that from free software.',
        'It quietly does invoicing, purchases and VAT for my one man band without ever asking for a penny.',
      ],
      pros: [
        'It is genuinely free for a business my size, which is almost unheard of.',
        'Bank tagging with saved rules makes reconciliation really quick.',
        'The invoices and client portal look professional.',
        'MTD VAT submissions go through without any trouble.',
        'The community forum is active and genuinely helpful.',
        'Multi currency is handy for the odd overseas invoice.',
      ],
      cons: [
        'The interface looks a little dated next to the paid names.',
        'You need the Power User Subscription once your account activity grows, though it is cheap.',
        'There is a bit of a learning curve at the very start.',
        'Support is community and email led rather than phone.',
        'Nothing major for the price.',
        'Some of the deeper features are not as polished as the big players.',
      ],
    },
    4: {
      titles: ['Great value with a dated look', 'Happy for the price', 'Does far more than free should',
        'Solid for a small business', 'Recommend for sole traders', 'Good once you learn it',
        'Tidy accounts for nothing', 'Worth it despite the interface'],
      summaries: [
        'Hard to argue with free. The interface is a bit old fashioned but it does everything a small business needs.',
        'Been using it a couple of years for my rentals. Great value, the learning curve at the start was the only hurdle.',
        'It handles invoicing and VAT well. You move onto the small paid tier as you get busier, which is fair.',
        'Really capable for the money. Support is email and forum only but the answers are good.',
      ],
      pros: [
        'You get a proper accounting package for nothing at the small end.',
        'Bank tagging rules speed reconciliation right up.',
        'VAT returns under MTD are straightforward.',
        'The forum usually solves anything you get stuck on.',
      ],
      cons: [
        'The look and feel is dated.',
        'The Power User Subscription kicks in as activity grows.',
        'It takes a little time to find your way around at first.',
      ],
    },
    3: {
      titles: ['Cheap and cheerful', 'Fine but shows its age', 'Good value, clunky in places', 'Does the basics for free'],
      summaries: [
        'The price is unbeatable and it works, but the interface feels old and some tasks take more clicks than they should.',
        'It keeps my books in order and it is free, I just find bits of it fiddly compared with the paid options.',
      ],
      pros: ['Free for small accounts.', 'VAT and invoicing do the job.', 'The forum is helpful.'],
      cons: ['Dated interface.', 'Fiddly in places.', 'No phone support.'],
    },
    2: {
      titles: ['Too clunky for me', 'Free but frustrating'],
      summaries: ['The price drew me in but I found the older interface and the extra clicks more hassle than it was worth.'],
      pros: ['It is free at the small end.'],
      cons: ['The interface feels dated and awkward.', 'Support is slow when you actually need a person.'],
    },
    1: {
      titles: ['Not for me', 'Gave up on it'],
      summaries: ['I could not get on with how dated it felt and there was no one to call when I got stuck.'],
      pros: ['It did not cost anything to try.'],
      cons: ['Dated and awkward to use.', 'No phone support at all.'],
    },
  },
};

const BRIGHTPAY = {
  slug: 'brightpay', count: 66, seed: 6320, vendor: 'BrightPay Support',
  dist: { 5: 0.60, 4: 0.26, 3: 0.08, 2: 0.04, 1: 0.02 },
  offsets: { ease_of_use: 0.2, value_for_money: 0.35, customer_service: 0.3, functionality: 0.15 },
  industries: PAY_IND,
  jobs: ['Payroll Manager', 'Finance Director', 'Payroll Administrator', 'Accountant', 'Practice Owner',
    'Bookkeeper', 'HR and Payroll Lead', 'Office Manager', 'Managing Director', 'Payroll Bureau Manager'],
  content: {
    5: {
      titles: ['The best payroll software we have used', 'Handles auto-enrolment brilliantly',
        'RTI submissions just work', 'Perfect for our bureau', 'Takes the stress out of payroll',
        'Brilliant value for what it does', 'Support actually knows UK payroll', 'Made pensions painless',
        'Reliable every single month', 'Would not run payroll without it'],
      summaries: [
        'We run payroll for over 200 client companies on BrightPay. The RTI submissions are painless and auto-enrolment is fully handled.',
        'Switched from a manual process and it took the pain out of pensions and RTI. Statutory pay calculations are spot on.',
        'FPS and EPS to HMRC go through without a hitch every month. The employee app cut down on payslip queries too.',
        'As a small practice this is the tool that lets me offer payroll without a headache. Setup was quick and support is excellent.',
        'The pension provider integrations mean auto-enrolment basically runs itself now. It used to be my worst job of the month.',
        'It is HMRC recognised and never lets us down at year end. The value against the bigger names is remarkable.',
      ],
      pros: [
        'RTI submissions to HMRC are rock solid and I never worry about them.',
        'Automatic enrolment and the pension provider links save me hours every month.',
        'The bureau features make running many clients genuinely manageable.',
        'The employee app and online payslips cut down on questions from staff.',
        'Support actually understands UK payroll and gets back to you quickly.',
        'Excellent value compared with the bigger payroll names.',
      ],
      cons: [
        'BrightPay Connect is a separate add on you need to budget for.',
        'The move from desktop to cloud took a little getting used to.',
        'The interface is functional rather than flashy.',
        'Very large employers might want deeper HR features built in.',
        'Nothing significant, it does its job every month.',
        'Occasionally an update needs installing at a slightly awkward time.',
      ],
    },
    4: {
      titles: ['Reliable payroll with great support', 'Very happy overall', 'Does RTI and pensions well',
        'Solid choice for a small employer', 'Recommend for bureaus', 'Great value payroll',
        'Handles the statutory side nicely', 'Dependable month after month'],
      summaries: [
        'It handles RTI, auto-enrolment and statutory pay reliably. Connect being a separate add on is the only slight downside.',
        'We moved our clients across and have not looked back. The support team genuinely know their stuff.',
        'Payroll runs smoothly every month and year end is far less stressful than it used to be.',
        'Great value and very dependable. The desktop to cloud shift took a bit of adjusting.',
      ],
      pros: [
        'HMRC submissions are consistent and trouble free.',
        'Auto-enrolment handling is a real time saver.',
        'Support is knowledgeable and quick.',
        'The value for money is hard to beat.',
      ],
      cons: [
        'Connect costs extra on top.',
        'Some screens feel a bit dated.',
        'Not much built in for wider HR.',
      ],
    },
    3: {
      titles: ['Good payroll, some quirks', 'Does the job but dated in places', 'Fine once set up', 'Solid but add ons add up'],
      summaries: [
        'It handles the core payroll well but the add ons for the cloud features push the price up more than I expected.',
        'Reliable for submissions and pensions, though the interface feels a little behind the times.',
      ],
      pros: ['RTI and auto-enrolment work reliably.', 'Support is helpful.', 'Good core value.'],
      cons: ['Add ons increase the cost.', 'Interface feels dated.', 'Limited HR features.'],
    },
    2: {
      titles: ['Not the fit we hoped', 'Add ons pushed the price up'],
      summaries: ['The core is fine but once we added the cloud pieces the cost crept up and it felt less of a bargain.'],
      pros: ['The submissions themselves were reliable.'],
      cons: ['Costs climbed with the add ons.', 'We wanted more HR built in.'],
    },
    1: {
      titles: ['Wrong tool for our needs'],
      summaries: ['We needed payroll and HR together and ended up cobbling too much on top, so it did not work out for us.'],
      pros: ['Payroll submissions worked.'],
      cons: ['Too little HR built in for us.', 'The extras added up.'],
    },
  },
};

const MOOREPAY = {
  slug: 'moorepay', count: 41, seed: 7430, vendor: 'Moorepay',
  dist: { 5: 0.40, 4: 0.30, 3: 0.17, 2: 0.08, 1: 0.05 },
  offsets: { ease_of_use: -0.3, value_for_money: -0.2, customer_service: 0.4, functionality: 0.1 },
  industries: PAY_IND,
  jobs: ['HR and Payroll Lead', 'Finance Director', 'Operations Manager', 'HR Manager', 'Payroll Manager',
    'Managing Director', 'Head of Finance', 'Office Manager', 'Group Financial Controller'],
  content: {
    5: {
      titles: ['Managed payroll took a weight off', 'Their support is the real value', 'Compliance sorted for us',
        'Great when you want it handled', 'Reliable partner for years', 'Peace of mind every month',
        'Knowledgeable UK support team', 'Glad we outsourced to them'],
      summaries: [
        'With over 300 staff across sites, moving to the managed service means RTI, pensions and starters and leavers are handled for us.',
        'The value is in the people. Whenever legislation changes they guide us through it before we even ask.',
        'We hand over the payroll each month and it comes back right. That reliability is worth a lot to a busy finance team.',
        'A dedicated account manager who knows our business makes a real difference at year end.',
        'They have kept us compliant through every rule change for years without drama.',
        'When we had a tricky redundancy calculation their team walked us through it properly.',
      ],
      pros: [
        'The managed service genuinely takes payroll off our plate.',
        'You always get a knowledgeable person on the phone.',
        'Compliance and legislation support is excellent.',
        'The dedicated account manager understands our business.',
        'Reliable and accurate month after month.',
        'HR add ons tie in when you need them.',
      ],
      cons: [
        'The software portal feels a little dated.',
        'Onboarding took longer than we hoped.',
        'Pricing is quote based so it is not the cheapest.',
        'It is more than a very small employer needs.',
        'Nothing that outweighs the peace of mind.',
        'You do depend on them, which is the trade off with managed payroll.',
      ],
    },
    4: {
      titles: ['Solid and compliant', 'Good managed service', 'Reliable if not cheap', 'Support you can count on',
        'Handles it all for us', 'Recommend for larger teams', 'Dependable payroll partner'],
      summaries: [
        'Does everything we need and keeps us compliant, though you are paying for the managed service and it shows.',
        'The support team are excellent. The portal itself could do with a refresh.',
        'Reliable each month and the compliance guidance is genuinely useful for a stretched finance team.',
        'Good partner for a business our size. Onboarding was slower than quoted.',
      ],
      pros: [
        'Compliance support is first rate.',
        'You always reach a real person.',
        'Accurate and dependable payroll.',
        'HR options available alongside.',
      ],
      cons: [
        'Quote based pricing works out higher than software only rivals.',
        'The portal is dated.',
        'Onboarding can be slow.',
      ],
    },
    3: {
      titles: ['Reliable but pricey', 'Good service, dated software', 'Fine for larger employers', 'Mixed on value'],
      summaries: [
        'The service is solid and the people are good, but for our size the cost was harder to justify each year.',
        'Keeps us compliant and the support is strong, the software side just feels behind the times.',
      ],
      pros: ['Strong compliance support.', 'Helpful people on the phone.', 'Accurate payroll.'],
      cons: ['Pricing is on the higher side.', 'Dated portal.', 'More than a small firm needs.'],
    },
    2: {
      titles: ['Too much for a small firm', 'Priced beyond our needs'],
      summaries: ['The service was fine but for a small team it was more managed payroll than we needed at a price to match.'],
      pros: ['The support staff were helpful.'],
      cons: ['Expensive for a small employer.', 'The software felt dated.'],
    },
    1: {
      titles: ['Not right for a small team', 'Onboarding put us off'],
      summaries: ['The onboarding dragged and for our size the whole thing felt heavier and pricier than we needed.'],
      pros: ['The people we spoke to were pleasant.'],
      cons: ['Slow onboarding.', 'Too costly for a small business.'],
    },
  },
};

const BREATHE = {
  slug: 'breathe-hr', count: 72, seed: 8540, vendor: 'Breathe',
  dist: { 5: 0.56, 4: 0.28, 3: 0.10, 2: 0.04, 1: 0.02 },
  offsets: { ease_of_use: 0.35, value_for_money: 0.15, customer_service: 0.2, functionality: -0.2 },
  industries: HR_IND,
  jobs: ['Operations Director', 'HR Manager', 'Office Manager', 'Managing Director', 'People Lead',
    'Founder', 'Practice Manager', 'HR Administrator', 'Head of Operations', 'Owner'],
  content: {
    5: {
      titles: ['Got us off spreadsheets at last', 'Simple HR my team actually uses', 'Holiday tracking finally sorted',
        'Ideal for a small business', 'Cleared out our HR admin', 'Easy to roll out to everyone',
        'Perfect first HR system', 'Staff love booking their own leave', 'Tidy, simple and UK based',
        'Wish we had moved sooner'],
      summaries: [
        'Breathe replaced a messy holiday spreadsheet and endless email requests. Everyone books their own leave now and I can see it at a glance.',
        'As a non HR person I needed something obvious. It handles holidays, documents and reviews without a manual.',
        'We rolled it out to the whole team in an afternoon and adoption was instant. Sickness and holiday tracking is spot on.',
        'Having every record, contract and absence in one place has tidied up our admin no end.',
        'The self service means people stop coming to my desk for every little thing. That alone was worth it.',
        'It is clearly built for a UK small business and the support team are based here and helpful.',
      ],
      pros: [
        'Holiday and absence tracking is clear and everyone can see their own balance.',
        'It was genuinely quick to set up and roll out.',
        'Self service takes a load of small requests off my plate.',
        'Storing documents and records in one place has been a big tidy up.',
        'UK based support that actually helps.',
        'Great value for a small team.',
      ],
      cons: [
        'The reporting is fairly basic if you want to dig into the numbers.',
        'Rotas and scheduling are a bit limited for shift patterns.',
        'The performance features are lighter than a dedicated tool.',
        'You may outgrow it as you head past a couple of hundred staff.',
        'Nothing that bothers us day to day.',
        'A few settings took a moment to find.',
      ],
    },
    4: {
      titles: ['Simple HR that works', 'Happy with it overall', 'Great for people admin', 'Tidy and easy to use',
        'Recommend for small teams', 'Does the core really well', 'Good value HR', 'Cleared our admin up'],
      summaries: [
        'The staff side is lovely and easy. I just wish the reporting went a bit deeper.',
        'Clean interface, quick to set up and good value. Scheduling felt a touch limited for our shifts.',
        'Handles holidays, documents and reviews nicely. It is clearly aimed at businesses our size.',
        'Rolled it out with no training needed. Reporting is the one area I would like more from.',
      ],
      pros: [
        'Really easy for non technical staff to pick up.',
        'Holiday and sickness tracking is spot on.',
        'Everything in one tidy place.',
        'Helpful UK support.',
      ],
      cons: [
        'Reporting is a little basic.',
        'Rotas are limited for complex shifts.',
        'Performance tools are light.',
      ],
    },
    3: {
      titles: ['Good for basics, light on depth', 'Simple but limited', 'Fine for a very small team', 'Does the job, just'],
      summaries: [
        'It is easy and tidy but we quickly wanted more from the reporting and the performance side.',
        'Good for holidays and records, though the scheduling did not really cope with our shift patterns.',
      ],
      pros: ['Very easy to use.', 'Holiday tracking is good.', 'Cheap for a small team.'],
      cons: ['Basic reporting.', 'Weak scheduling.', 'Light on performance management.'],
    },
    2: {
      titles: ['Outgrew it quickly', 'Too light for us'],
      summaries: ['It was fine to start but we needed deeper reporting and better rotas than it could offer.'],
      pros: ['The holiday booking was easy.'],
      cons: ['Reporting was too basic.', 'Scheduling did not suit our shifts.'],
    },
    1: {
      titles: ['Not enough for our needs'],
      summaries: ['We needed proper rotas and reporting and it just could not stretch that far for us.'],
      pros: ['Simple to set up.'],
      cons: ['Too basic on reporting.', 'Scheduling was not up to our shift patterns.'],
    },
  },
};

const CHARLIEHR = {
  slug: 'charliehr', count: 48, seed: 9650, vendor: 'CharlieHR',
  dist: { 5: 0.52, 4: 0.30, 3: 0.11, 2: 0.05, 1: 0.02 },
  offsets: { ease_of_use: 0.4, value_for_money: 0.25, customer_service: 0.05, functionality: -0.25 },
  industries: HR_IND,
  jobs: ['People Lead', 'Co-founder', 'Operations Manager', 'Founder', 'Head of People', 'Office Manager',
    'Managing Director', 'People and Culture Manager', 'Team Lead'],
  content: {
    5: {
      titles: ['Ideal first HR system for a startup', 'Does exactly what a small team needs', 'Onboarding is a breeze now',
        'Clean and easy to adopt', 'Free tier got us started', 'Perfect for a growing startup',
        'Modern and lovely to use', 'Sorted our people admin', 'Simple, no nonsense HR', 'Team picked it up instantly'],
      summaries: [
        'We went from Google Sheets to Charlie in an afternoon. Onboarding new starters is now a proper checklist rather than a scramble.',
        'No frills, just clean time off and records. Setup was quick and the team adopted it without any training.',
        'The free tier let us trial it properly before we grew into the paid plan. Lovely modern interface throughout.',
        'It is clearly built for small UK companies and it shows in how simple everything is.',
        'Booking leave and finding documents is effortless now, and new starters get a real welcome flow.',
        'For a team our size it covers everything we need without the bloat of a big HR suite.',
      ],
      pros: [
        'The interface is modern and genuinely nice to use.',
        'Onboarding new starters is smooth and organised.',
        'The free tier is a real way to get going.',
        'Time off and records are simple and clear.',
        'Perfect fit for a small, growing company.',
        'Quick to set up with no training needed.',
      ],
      cons: [
        'Reporting is light if you want to analyse the data.',
        'You can outgrow some features as you approach fifty staff.',
        'Support is email led so answers are not instant.',
        'Integrations are fairly limited.',
        'Nothing that gets in our way day to day.',
        'A couple of features sit only on the paid plan.',
      ],
    },
    4: {
      titles: ['Great for a small team', 'Simple and modern', 'Happy with it', 'Good first HR tool',
        'Recommend for startups', 'Easy to live with', 'Tidy people admin', 'Does the essentials well'],
      summaries: [
        'Clean and easy and the team adopted it without a fuss. Reporting is the one thing I would like more of.',
        'The free tier sold us and the paid plan is fair. We have outgrown a couple of bits as we approach fifty people.',
        'Onboarding and time off are handled nicely. Support being email only means the odd wait.',
        'No nonsense HR for a startup. It does the essentials cleanly.',
      ],
      pros: [
        'Modern, simple interface.',
        'Smooth onboarding flow.',
        'Free tier to start on.',
        'Clear time off management.',
      ],
      cons: [
        'Light reporting.',
        'Limited integrations.',
        'Email only support.',
      ],
    },
    3: {
      titles: ['Good but basic', 'Fine for the essentials', 'Simple, outgrew it', 'Okay for a tiny team'],
      summaries: [
        'It is clean and simple but we wanted deeper reporting and more integrations as we grew.',
        'Does time off and records well, though it started to feel thin once we passed thirty staff.',
      ],
      pros: ['Very easy to use.', 'Nice onboarding.', 'Free tier to try.'],
      cons: ['Basic reporting.', 'Few integrations.', 'You outgrow it.'],
    },
    2: {
      titles: ['Too light as we grew', 'Needed more depth'],
      summaries: ['It was lovely and simple but we hit its limits on reporting and integrations sooner than expected.'],
      pros: ['The onboarding flow was nice.'],
      cons: ['Reporting was too basic.', 'Not enough integrations for us.'],
    },
    1: {
      titles: ['Outgrew it fast'],
      summaries: ['Good to start but we needed a lot more than it offered once the team grew past a certain point.'],
      pros: ['Easy to set up.'],
      cons: ['Too basic on reporting.', 'Limited integrations.'],
    },
  },
};

const CAPSULE = {
  slug: 'capsule-crm', count: 58, seed: 10760, vendor: 'Capsule',
  dist: { 5: 0.53, 4: 0.29, 3: 0.11, 2: 0.05, 1: 0.02 },
  offsets: { ease_of_use: 0.35, value_for_money: 0.2, customer_service: 0.0, functionality: -0.25 },
  industries: CRM_IND,
  jobs: ['Sales Director', 'Business Owner', 'Sales Manager', 'Founder', 'Account Manager', 'Director',
    'Business Development Manager', 'Managing Director', 'Operations Manager', 'Head of Sales'],
  content: {
    5: {
      titles: ['The right amount of CRM', 'Keeps me organised without the bloat', 'Great value and easy to use',
        'Simple, and it syncs with Xero', 'Stopped us losing enquiries', 'Ideal for a small sales team',
        'Does what a CRM should', 'Set it up in an afternoon', 'A UK CRM that just fits', 'No more dropped follow ups'],
      summaries: [
        'We tried Salesforce and it was overkill. Capsule gives us pipelines and contact history without the complexity or the cost.',
        'I just needed to stop losing track of enquiries. The pipeline and tasks do exactly that and the free tier got me going.',
        'It syncs neatly with Xero and FreeAgent so our sales and books are not living in separate worlds.',
        'Contact history in one place means anyone can pick up a conversation and know where it stands.',
        'Being a UK company their support understands our context, and the tool is refreshingly simple.',
        'The customisable pipeline matches how we actually sell, and tasks keep the team on top of follow ups.',
      ],
      pros: [
        'It is genuinely easy to use without a load of setup.',
        'The Xero and FreeAgent integrations are a real plus for us.',
        'Contact and relationship history is clear and complete.',
        'The pipeline bends to our sales process.',
        'Great value against the bigger CRMs.',
        'Free tier makes it easy to start.',
      ],
      cons: [
        'Marketing features are basic, so we use a separate email tool.',
        'Reporting could go a bit deeper.',
        'The mobile app is functional rather than brilliant.',
        'Very large sales teams may want more automation.',
        'Nothing that slows us down.',
        'A few advanced features sit on the higher tiers.',
      ],
    },
    4: {
      titles: ['Simple CRM that works', 'Great value, keeps me on track', 'Happy with it', 'Good for a small team',
        'Recommend for SMEs', 'Easy and tidy', 'Does the core well', 'Xero sync is handy'],
      summaries: [
        'Easy to use and it syncs with our accounts. Marketing is basic so we pair it with something else.',
        'Simple and affordable and it stopped enquiries slipping through. Reporting could be richer.',
        'Covers our pipeline and tasks nicely. The mobile app is fine rather than great.',
        'The right size of CRM for us. Advanced automation sits on plans above ours.',
      ],
      pros: [
        'Very easy to pick up.',
        'Good integrations with UK accounting tools.',
        'Clear pipeline and contact history.',
        'Fair pricing.',
      ],
      cons: [
        'Basic marketing features.',
        'Reporting is a bit shallow.',
        'Mobile app is average.',
      ],
    },
    3: {
      titles: ['Good simple CRM, some limits', 'Fine for basics', 'Nice but light on reporting', 'Does the job'],
      summaries: [
        'It is easy and tidy but we wanted more from the reporting and the marketing side as we grew.',
        'Keeps our contacts and deals in order, though larger teams may find the automation thin.',
      ],
      pros: ['Easy to use.', 'Good accounting integrations.', 'Affordable.'],
      cons: ['Light reporting.', 'Basic marketing.', 'Limited automation.'],
    },
    2: {
      titles: ['Too simple for us', 'Wanted more automation'],
      summaries: ['It was easy but our growing team needed deeper automation and reporting than it offered.'],
      pros: ['The Xero sync was useful.'],
      cons: ['Not enough automation.', 'Reporting too basic.'],
    },
    1: {
      titles: ['Outgrew it'],
      summaries: ['Simple and pleasant to start with, but we needed a lot more automation and reporting as we scaled.'],
      pros: ['Easy to set up.'],
      cons: ['Limited automation.', 'Shallow reporting.'],
    },
  },
};

const HUBSPOT = {
  slug: 'hubspot-crm', count: 91, seed: 11870, vendor: 'HubSpot',
  dist: { 5: 0.47, 4: 0.30, 3: 0.13, 2: 0.06, 1: 0.04 },
  offsets: { ease_of_use: 0.1, value_for_money: -0.45, customer_service: 0.15, functionality: 0.35 },
  industries: CRM_IND.concat(['SaaS', 'Agency']),
  jobs: ['Head of Growth', 'Marketing Manager', 'Sales Director', 'Founder', 'Revenue Operations Manager',
    'Marketing Director', 'Sales Manager', 'Managing Director', 'Demand Generation Manager', 'CRM Manager'],
  content: {
    5: {
      titles: ['The free tier hooked us, the platform kept us', 'Sales and marketing in one place', 'Transformed our reporting',
        'Brilliant all in one', 'Automation that actually saves time', 'Scaled with us beautifully', 'Free CRM is genuinely free',
        'Our whole funnel lives here', 'Powerful once you commit', 'Best platform for a scaling team'],
      summaries: [
        'We started on the free CRM and gradually added Sales Hub. Having marketing and sales in one place transformed our reporting.',
        'The free tier is a proper CRM, not a teaser. We ran on it for a year before we needed to pay a penny.',
        'Sequences and automation took a mountain of manual follow up off the team. The reporting is genuinely useful.',
        'Everything from first touch to closed deal sits in one system now, which our old stack never managed.',
        'There is a huge UK partner and template ecosystem, so there is always help and a head start.',
        'It grew with us from a two person startup to a proper sales team without us ever switching tools.',
      ],
      pros: [
        'The free core CRM is genuinely capable.',
        'Sales and marketing living together makes reporting so much clearer.',
        'Sequences and automation are excellent.',
        'Huge ecosystem of partners, templates and integrations.',
        'It scales from tiny to large without a migration.',
        'The reporting dashboards are properly useful.',
      ],
      cons: [
        'Costs ramp up quickly once you need the paid hubs.',
        'Contact tier pricing can bite as your database grows.',
        'Some tools are locked behind higher plans.',
        'It is a lot of platform if you only want a simple CRM.',
        'Nothing that made us regret it.',
        'Onboarding the advanced features takes time.',
      ],
    },
    4: {
      titles: ['Great features, watch the upgrade path', 'Powerful platform', 'Happy but mind the cost',
        'Excellent for sales and marketing', 'Recommend with a budget in mind', 'Does a huge amount',
        'Strong once you invest', 'Good, if pricey at scale'],
      summaries: [
        'HubSpot does almost everything, but the jump from free to paid is a big one for a small budget.',
        'The automation and reporting are excellent. Value dips as your contact count climbs.',
        'We run our whole funnel on it. Some tools you want sit on the pricier tiers.',
        'Brilliant platform overall. Just go in knowing the costs scale as you do.',
      ],
      pros: [
        'Sequences and automation are genuinely powerful.',
        'Reporting is clear and useful.',
        'Everything in one place.',
        'Strong UK partner network.',
      ],
      cons: [
        'Gets expensive as you scale.',
        'Contact based pricing adds up.',
        'Best features are on higher tiers.',
      ],
    },
    3: {
      titles: ['Powerful but pricey', 'Great tool, big jump to paid', 'Value dips at scale', 'Mixed on cost'],
      summaries: [
        'The free tier is superb but the leap to paid, and then the contact pricing, made us think hard about value.',
        'It does a lot, though for a small team a chunk of it went unused while the bill grew.',
      ],
      pros: ['Capable free tier.', 'Good automation.', 'Useful reporting.'],
      cons: ['Expensive as you grow.', 'Contact pricing stings.', 'Overkill for simple needs.'],
    },
    2: {
      titles: ['Too costly as we scaled', 'Priced us out'],
      summaries: ['We loved it at first but the costs climbed faster than the value as our contact list grew.'],
      pros: ['The free tier and automation were strong.'],
      cons: ['Costs escalated quickly.', 'Too much locked behind higher plans.'],
    },
    1: {
      titles: ['Bill grew too fast', 'Left over pricing'],
      summaries: ['The pricing crept up relentlessly as our database grew and we could not justify it for what we used.'],
      pros: ['The platform itself is powerful.'],
      cons: ['Costs escalated far too quickly.', 'Contact based pricing was punishing.'],
    },
  },
};

const SAGE200 = {
  slug: 'sage-200', count: 47, seed: 12980, vendor: 'Sage',
  dist: { 5: 0.38, 4: 0.32, 3: 0.17, 2: 0.08, 1: 0.05 },
  offsets: { ease_of_use: -0.35, value_for_money: -0.05, customer_service: 0.0, functionality: 0.4 },
  industries: ERP_IND,
  jobs: ['Financial Controller', 'Head of Finance', 'Finance Director', 'Finance Manager', 'IT Manager',
    'Operations Director', 'Managing Director', 'Systems Accountant', 'Group Accountant'],
  content: {
    5: {
      titles: ['The right step up from Sage 50', 'Proper stock control at last', 'Grew into our operations nicely',
        'Handles our whole finance function', 'Built for UK VAT and MTD', 'Scales where Sage 50 stopped',
        'Solid mid market ERP', 'Multi company reporting sorted', 'Reliable for compliance', 'Does what we outgrew 50 for'],
      summaries: [
        'We outgrew Sage 50 and this gave us the stock control and multi company reporting we needed without moving to something enormous.',
        'The financials and VAT handling are strong and MTD is built in. It felt familiar coming from Sage.',
        'Running finance and stock off one system has cut out a lot of the workarounds we used to rely on.',
        'With a good Sage partner we shaped it to our processes and it has been dependable since.',
        'Multi company consolidation used to be a nightmare in spreadsheets. Now it is just there.',
        'It handles our manufacturing and finance together and copes with the volume we throw at it.',
      ],
      pros: [
        'Strong UK financials with VAT and MTD built in.',
        'Proper supply chain and stock control.',
        'Multi company and multi currency handling.',
        'Familiar if you are coming from Sage 50.',
        'Scales with the business.',
        'Reliable for compliance and year end.',
      ],
      cons: [
        'You really need a good Sage partner to get the best from it.',
        'The interface is functional rather than modern.',
        'Pricing is partner led and can be opaque.',
        'Implementation is a proper project.',
        'Nothing that undoes the value for us.',
        'Upgrades need planning.',
      ],
    },
    4: {
      titles: ['Capable ERP, partner matters', 'Good step up', 'Solid for a growing business', 'Reliable finance system',
        'Does the heavy lifting', 'Recommend with the right partner', 'Strong on compliance', 'Handles complexity well'],
      summaries: [
        'It gave us the depth we needed beyond Sage 50. The interface is dated but it does the job.',
        'Runs our finance and manufacturing well, though the experience really depends on the implementation partner.',
        'Dependable for UK compliance and it scales with us. Pricing was a little hard to pin down.',
        'A proper mid market system. Getting it set up right took a partner and some planning.',
      ],
      pros: [
        'Deep functionality for finance and operations.',
        'Reliable UK VAT and MTD compliance.',
        'Scales with the business.',
        'Familiar Sage feel.',
      ],
      cons: [
        'Dated interface.',
        'Partner led pricing is opaque.',
        'Implementation takes planning.',
      ],
    },
    3: {
      titles: ['Powerful but dated', 'Good ERP, clunky UI', 'Fine with the right partner', 'Mixed experience'],
      summaries: [
        'The functionality is all there but the interface feels old and success really hinges on your partner.',
        'It does the job for finance and stock, though the setup and the look and feel show their age.',
      ],
      pros: ['Deep functionality.', 'Reliable compliance.', 'Scales well.'],
      cons: ['Dated interface.', 'Partner dependent.', 'Pricing is unclear.'],
    },
    2: {
      titles: ['Partner let us down', 'Harder than expected'],
      summaries: ['The software is capable but a poor implementation partner made the whole rollout painful for us.'],
      pros: ['The underlying functionality is strong.'],
      cons: ['Success depends heavily on the partner.', 'The interface feels dated.'],
    },
    1: {
      titles: ['Rollout was a struggle'],
      summaries: ['Our implementation dragged and the dated interface plus partner reliance made it a hard sell internally.'],
      pros: ['It is genuinely capable once working.'],
      cons: ['Difficult, partner dependent rollout.', 'Interface feels behind the times.'],
    },
  },
};

const DYNAMICS = {
  slug: 'dynamics-365-business-central', count: 63, seed: 14090, vendor: 'Microsoft',
  dist: { 5: 0.42, 4: 0.31, 3: 0.15, 2: 0.07, 1: 0.05 },
  offsets: { ease_of_use: -0.35, value_for_money: -0.1, customer_service: -0.05, functionality: 0.4 },
  industries: ERP_IND.concat(['Professional Services', 'Technology']),
  jobs: ['IT Director', 'Finance Manager', 'Financial Controller', 'Operations Director', 'IT Manager',
    'Head of Finance', 'Systems Manager', 'Managing Director', 'Project Manager', 'Group Financial Controller'],
  content: {
    5: {
      titles: ['Excellent if you live in Microsoft 365', 'Connected our whole operation', 'Power BI reporting is a win',
        'Cloud ERP done right', 'Slots into our Microsoft estate', 'Scales from finance to full ERP', 'Great with Teams and Excel',
        'Regular updates keep it fresh', 'Strong UK VAT localisation', 'One system for finance and ops'],
      summaries: [
        'Business Central slots into our Microsoft estate perfectly. The Excel and Teams integration and Power BI reporting are real strengths.',
        'Once it was configured it connected finance, sales and operations in a way our old tools never did.',
        'Living in Microsoft 365 already, having the ERP speak the same language saves us a huge amount of friction.',
        'The UK VAT and MTD localisation is solid and the cloud updates arrive without us managing servers.',
        'Power BI on top of the data gives our board the reporting they always wanted.',
        'With a capable Microsoft partner we got it shaped to us and it has scaled with the business.',
      ],
      pros: [
        'Deep Microsoft 365 integration with Excel, Outlook and Teams.',
        'Strong UK VAT and MTD localisation.',
        'Power BI reporting is genuinely powerful.',
        'Cloud delivery means no servers to manage.',
        'Scales from finance to full operations.',
        'Regular updates from Microsoft.',
      ],
      cons: [
        'There is a real learning curve for the team.',
        'You need a capable Microsoft partner to implement it well.',
        'Per user licensing adds up for a mid sized firm.',
        'Onboarding takes longer than you expect.',
        'Nothing that outweighs the benefits for us.',
        'Support routes through the partner.',
      ],
    },
    4: {
      titles: ['Powerful, budget the rollout', 'Great with Microsoft 365', 'Capable cloud ERP', 'Strong once configured',
        'Recommend with a partner', 'Does a lot well', 'Good for a Microsoft shop', 'Solid and scalable'],
      summaries: [
        'Once configured it is genuinely capable, but the per user licensing and implementation cost add up.',
        'Connects finance and operations well and the reporting is good. There is a learning curve to get there.',
        'Great fit because we already run Microsoft 365. Onboarding took longer than expected.',
        'A proper cloud ERP that keeps improving. You do need a good partner to land it.',
      ],
      pros: [
        'Tight Microsoft 365 integration.',
        'Good UK localisation.',
        'Useful, regular updates.',
        'Scales with the business.',
      ],
      cons: [
        'Learning curve for staff.',
        'Per user cost mounts up.',
        'Partner dependent.',
      ],
    },
    3: {
      titles: ['Capable but complex', 'Good ERP, steep learning', 'Fine with the right partner', 'Mixed on rollout'],
      summaries: [
        'The functionality is strong but getting the team comfortable and the setup right took real time and money.',
        'It does a lot, though for a mid sized firm the licensing and the learning curve were a hurdle.',
      ],
      pros: ['Strong functionality.', 'Good Microsoft integration.', 'Regular updates.'],
      cons: ['Steep learning curve.', 'Costs add up.', 'Partner dependent.'],
    },
    2: {
      titles: ['Rollout was heavy', 'More than we bargained for'],
      summaries: ['Powerful yes, but the implementation and the learning curve made it a long, costly project for us.'],
      pros: ['The Microsoft integration is a real strength.'],
      cons: ['Long, costly implementation.', 'Steep learning curve for staff.'],
    },
    1: {
      titles: ['Too much for our team'],
      summaries: ['We underestimated the implementation effort and the ongoing licensing, and it never fully bedded in for us.'],
      pros: ['It integrates well with Microsoft 365.'],
      cons: ['Implementation was heavy and costly.', 'Ongoing licensing was hard to justify.'],
    },
  },
};

const MONDAY = {
  slug: 'monday-com', count: 84, seed: 15200, vendor: 'monday.com',
  dist: { 5: 0.50, 4: 0.29, 3: 0.12, 2: 0.06, 1: 0.03 },
  offsets: { ease_of_use: 0.1, value_for_money: -0.2, customer_service: 0.05, functionality: 0.25 },
  industries: PM_IND,
  jobs: ['Head of Operations', 'Project Manager', 'Project Lead', 'Operations Manager', 'Marketing Manager',
    'Founder', 'Managing Director', 'Team Lead', 'Programme Manager', 'Creative Director'],
  content: {
    5: {
      titles: ['Runs our whole agency now', 'Flexible enough for anything', 'Killed our status meetings',
        'Visual and genuinely nice to use', 'Automations save us hours', 'Everything in one board', 'Perfect for our team',
        'Adaptable to how we work', 'Kept projects on track', 'Best work tool we have used'],
      summaries: [
        'We manage every client project, retainer and campaign on monday. The automations alone save us hours of status chasing each week.',
        'Powerful once you settle on a structure. We overbuilt boards at first then simplified, and now it runs beautifully.',
        'It is visual and flexible enough to fit marketing, operations and delivery all at once.',
        'The automations quietly move things along so nobody has to nag for updates.',
        'Our team on site actually use the mobile app, which never happened with our old tool.',
        'We shaped it to our exact workflow rather than bending our process to the software.',
      ],
      pros: [
        'Incredibly flexible and customisable to your workflow.',
        'The automations remove a lot of manual chasing.',
        'It is visual and genuinely pleasant to use.',
        'Good mobile app for people away from a desk.',
        'Dashboards give a clear view across projects.',
        'Easy for new team members to pick up.',
      ],
      cons: [
        'It can get messy without some discipline on structure.',
        'Per seat pricing adds up as the team grows.',
        'Notifications can be a lot until you tune them.',
        'The best features sit on higher tiers.',
        'Nothing that spoils it for us.',
        'Easy to over complicate your boards early on.',
      ],
    },
    4: {
      titles: ['Flexible, just rein in the setup', 'Great once structured', 'Happy with it', 'Visual and capable',
        'Recommend for teams', 'Does a lot well', 'Good for cross team work', 'Powerful and adaptable'],
      summaries: [
        'Powerful once you settle on how to use it. We over engineered our boards at first and had to simplify.',
        'Visual and customisable and the team took to it. Per seat pricing is the thing to watch.',
        'It keeps our projects moving and the automations are great. Some features sit on pricier plans.',
        'Really flexible for a mixed team. Just needs a bit of discipline to keep tidy.',
      ],
      pros: [
        'Very flexible and visual.',
        'Automations save real time.',
        'Good mobile app.',
        'Clear dashboards.',
      ],
      cons: [
        'Can get messy without structure.',
        'Per seat cost mounts up.',
        'Best features on higher tiers.',
      ],
    },
    3: {
      titles: ['Flexible but can get messy', 'Good, needs discipline', 'Capable but pricey at scale', 'Mixed feelings'],
      summaries: [
        'It is powerful but without discipline the boards sprawl and it gets noisy. Costs climb with seats too.',
        'Great for visual planning, though we found ourselves paying for tiers to unlock what we wanted.',
      ],
      pros: ['Very flexible.', 'Nice automations.', 'Good to look at.'],
      cons: ['Can sprawl and get noisy.', 'Per seat pricing adds up.', 'Features gated by tier.'],
    },
    2: {
      titles: ['Got too noisy for us', 'Pricey once we grew'],
      summaries: ['It started well but the boards grew unwieldy and the per seat cost climbed faster than the value.'],
      pros: ['The visual boards were appealing.'],
      cons: ['Became cluttered and noisy.', 'Per seat pricing got expensive.'],
    },
    1: {
      titles: ['Overwhelming and pricey'],
      summaries: ['We never tamed the notifications or the sprawl, and the cost per seat made it hard to justify.'],
      pros: ['It looked great at the start.'],
      cons: ['Cluttered and noisy in practice.', 'Expensive as the team grew.'],
    },
  },
};

const ASANA = {
  slug: 'asana', count: 69, seed: 16310, vendor: 'Asana',
  dist: { 5: 0.49, 4: 0.30, 3: 0.13, 2: 0.05, 1: 0.03 },
  offsets: { ease_of_use: 0.3, value_for_money: 0.05, customer_service: -0.1, functionality: 0.1 },
  industries: PM_IND,
  jobs: ['Programme Manager', 'Project Manager', 'Team Lead', 'Operations Manager', 'Marketing Manager',
    'Founder', 'Head of Delivery', 'Creative Director', 'Product Manager', 'Managing Director'],
  content: {
    5: {
      titles: ['Keeps cross team work honest', 'Clear ownership at last', 'Great free tier for a small team',
        'Structured and easy to adopt', 'Our work finally has one home', 'Perfect for mixed teams', 'Timeline view is brilliant',
        'Nothing slips through now', 'Simple to roll out', 'Best for keeping teams aligned'],
      summaries: [
        'Asana is where our editorial, design and marketing teams meet. Timeline view and clear ownership stopped things slipping through the cracks.',
        'For a team of eight the free plan covers almost everything. It is less fiddly than some rivals and people just get it.',
        'It gives every task a clear owner and due date, which quietly fixed our missed deadlines.',
        'The different views suit different people, so the whole team actually uses it rather than avoiding it.',
        'Rolling it out needed no real training. Everyone understood it within a day.',
        'Cross team projects used to fall between the gaps. Now there is one place that keeps everyone honest.',
      ],
      pros: [
        'Clean and structured, with clear task ownership.',
        'The free tier is genuinely generous for small teams.',
        'List, board and timeline views suit different people.',
        'Automation rules handle the repetitive steps.',
        'Very easy to adopt with little training.',
        'Good for keeping cross team work aligned.',
      ],
      cons: [
        'The best reporting and portfolios sit behind higher tiers.',
        'It is less customisable than some rivals.',
        'Support is mostly self serve.',
        'Notifications can pile up until you tune them.',
        'Nothing that gets in our way.',
        'Heavy customisation is not really its strength.',
      ],
    },
    4: {
      titles: ['Great free tier for a small team', 'Clean and structured', 'Happy with it', 'Good for cross team work',
        'Recommend for teams', 'Easy to adopt', 'Keeps us aligned', 'Solid work management'],
      summaries: [
        'The free plan covers a small team well and it is easy to adopt. Deeper reporting sits on paid tiers.',
        'Clean and structured and people took to it quickly. It is less customisable than some tools.',
        'Timeline and rules are genuinely useful. Support is mostly self serve which is fine for us.',
        'Good value at the free and starter tiers and it keeps our projects clear.',
      ],
      pros: [
        'Clean, structured interface.',
        'Generous free tier.',
        'Useful views and automation.',
        'Easy for teams to pick up.',
      ],
      cons: [
        'Best reporting is behind paid tiers.',
        'Limited deep customisation.',
        'Mostly self serve support.',
      ],
    },
    3: {
      titles: ['Good but reporting is gated', 'Fine for basics', 'Nice, less customisable', 'Does the job'],
      summaries: [
        'It is clean and easy but the reporting and portfolios we wanted were locked to higher plans.',
        'Keeps tasks in order and is easy to adopt, though it is less flexible than some rivals.',
      ],
      pros: ['Easy to use.', 'Good free tier.', 'Clear task ownership.'],
      cons: ['Reporting gated by tier.', 'Less customisable.', 'Self serve support.'],
    },
    2: {
      titles: ['Too limited for us', 'Wanted more depth'],
      summaries: ['It was tidy but we needed the reporting and customisation that only came on the pricier plans.'],
      pros: ['The free tier was useful to trial.'],
      cons: ['Reporting locked to higher tiers.', 'Not customisable enough for us.'],
    },
    1: {
      titles: ['Not flexible enough'],
      summaries: ['We needed heavier customisation and reporting than it offered without jumping up the tiers.'],
      pros: ['Easy to get started.'],
      cons: ['Limited customisation.', 'Key reporting behind paywalls.'],
    },
  },
};

const PRODUCTS = [FREEAGENT, QUICKFILE, BRIGHTPAY, MOOREPAY, BREATHE, CHARLIEHR,
  CAPSULE, HUBSPOT, SAGE200, DYNAMICS, MONDAY, ASANA];

const VENDOR_LINES = {
  freeagent: 'Thanks for the review. Delighted FreeAgent is making the tax side simpler for you.',
  quickfile: 'Thank you for the kind words and for being part of the QuickFile community.',
  brightpay: 'Thanks for the feedback. Really glad the payroll and auto-enrolment tools are working well for you.',
  moorepay: 'Thank you. It is great to hear the managed service is taking payroll off your plate.',
  'breathe-hr': 'Thanks for the review. Lovely to hear the team have taken to Breathe so quickly.',
  charliehr: 'Thank you. Glad onboarding and time off are running smoothly for your team.',
  'capsule-crm': 'Thanks for the review. Great to hear Capsule fits the way your team sells.',
  'hubspot-crm': 'Thank you for the feedback and for growing with HubSpot.',
  'sage-200': 'Thanks for the review. Pleased Sage 200 is scaling with your business.',
  'dynamics-365-business-central': 'Thank you for the feedback on Business Central.',
  'monday-com': 'Thanks for the review. Glad the automations are saving your team time.',
  asana: 'Thank you for the review. Great to hear Asana keeps your teams aligned.',
};

function buildReviews(product) {
  seed = product.seed;
  const out = [];
  const seen = new Set();
  let guard = 0;
  while (out.length < product.count && guard < product.count * 80) {
    guard++;
    const overall = pickOverall(product.dist);
    const b = product.content[overall];
    const title = pick(b.titles);
    const summary = pick(b.summaries);
    const pros = pick(b.pros);
    const cons = chance(0.08) ? pick(['None so far.', 'Nothing worth noting.', null]) : pick(b.cons);

    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);

    const year = chance(0.55) ? 2026 : (chance(0.6) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    const linkedin = chance(0.4);
    const hasVendor = overall >= 4 && chance(0.1);

    out.push({
      reviewer_name: makeName(),
      reviewer_job_title: pick(product.jobs),
      reviewer_company: makeCompany(),
      reviewer_industry: pick(product.industries),
      reviewer_company_size: pick(SIZES),
      reviewer_country: pick(UK),
      verified_linkedin: linkedin,
      verified_badge: linkedin && chance(0.85) ? 'Verified LinkedIn User' : null,
      used_for_duration: pick(DURATIONS),
      overall_rating: overall,
      ease_of_use: sub(overall, product.offsets.ease_of_use),
      value_for_money: sub(overall, product.offsets.value_for_money),
      customer_service: sub(overall, product.offsets.customer_service, 0.18),
      functionality: sub(overall, product.offsets.functionality),
      review_title: title,
      summary, pros, cons,
      vendor_response: hasVendor ? VENDOR_LINES[product.slug] : null,
      vendor_response_date: hasVendor ? date : null,
      review_date: date,
      helpful_count: intBetween(0, 46),
    });
  }
  return out;
}

module.exports = { buildReviews, PRODUCTS };
