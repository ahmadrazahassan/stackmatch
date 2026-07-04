// ============================================================================
// Appends 240 additional UK reviews to Sage Accounting (10 hand written
// anchors plus 230 from a seeded generator with fresh content pools that do
// not repeat the existing hand written set). APPEND ONLY: existing reviews
// are kept. Also points vendor_website at the real product page.
//
// House style: human voice, no stylistic dashes, ratings that spread,
// aggregate lands near the product's real world 4.1.
//
//   node supabase/add_sage_accounting_reviews.js
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
// Hand written anchor reviews (fresh scenarios, none repeat the existing set)
// ---------------------------------------------------------------------------
const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Graham Netherwood', reviewer_job_title: 'Landlord and retired teacher', reviewer_company: null,
    reviewer_industry: 'Real Estate', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'A 67 year old landlord got himself ready for digital tax, so anyone can',
    summary: 'Four rental properties and forty years of paper records. My daughter set me up on Sage one Sunday afternoon because of the new quarterly tax rules and I honestly expected to hate it. Six months on I do the quarter myself and the figures for each house are a button press.',
    pros: 'Each property tracked separately so I can see which flat actually makes money. The bank feed picks up the rents on its own. The quarterly submission is far less frightening than the letters from HMRC made it sound.',
    cons: 'Some of the accounting words assume knowledge I do not have, a beginner glossary would help people like me. My daughter had to explain what a nominal code was.',
    review_date: '2026-05-16', helpful_count: 19, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Saoirse Brennan', reviewer_job_title: 'Owner', reviewer_company: 'The Copper Kettle Tearoom',
    reviewer_industry: 'Hospitality', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Flat rate VAT and a busy tearoom, it copes with both',
    summary: 'We are on the flat rate scheme and our old software kept calculating VAT the standard way, which meant quarterly corrections. Sage handles the flat rate percentage properly and the return agrees with what the accountant expects first time.',
    pros: 'Flat rate VAT configured once and correct ever since. Till takings entered in two minutes each morning. Staff payroll for our four part timers included in the price rather than another subscription.',
    cons: 'The reports section takes some digging to find the one you want. Would like a favourites list for the three reports I actually use.',
    review_date: '2025-11-22', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Dominic Fairbrother', reviewer_job_title: 'Founder', reviewer_company: 'Fairbrother & Vine',
    reviewer_industry: 'Retail', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Wine merchant with margins that finally make sense',
    summary: 'We import and sell wine, so duty, mixed VAT treatments and supplier invoices in euros. I expected to need something far more expensive to cope with that combination and was told twice by other merchants to just get a bookkeeper. Sage on the Plus plan handles the currency side and the margins per product line are visible for the first time.',
    pros: 'Euro supplier invoices with the exchange handled and the gain or loss posted. Stock levels that warn me before we run out of the good sellers. VAT on mixed rate hampers calculated correctly at Christmas, which was my big fear.',
    cons: 'Duty tracking is manual through expense categories, a bonded goods feature is probably too niche to hope for. Search across old invoices could be faster.',
    review_date: '2026-01-19', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Lesley Ashcroft', reviewer_job_title: 'Treasurer', reviewer_company: 'Ferndale Village Hall Committee',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '1-10', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 3, customer_service: 4, functionality: 3,
    review_title: 'Village hall accounts a volunteer can hand over',
    summary: 'The last treasurer kept everything in a notebook only she understood and handover took three months. When I retire from this role next year my successor gets a login and an afternoon of tea and training, and every hire fee and grant for the past two years is in there with a receipt attached.',
    pros: 'Simple enough for a rotating cast of volunteers. Attach the invoice photo to each payment so the annual inspection is painless. The independent examiner said it was the tidiest set of village hall accounts she sees.',
    cons: 'It is priced for businesses, a community group rate would be kind. We do not need invoicing or payroll so we pay for features that sit unused.',
    review_date: '2025-09-08', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Marcus Delahaye', reviewer_job_title: 'IT Contractor', reviewer_company: 'Delahaye Digital Ltd',
    reviewer_industry: 'Information Technology and Services', reviewer_company_size: 'Self-employed', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Contractor limited company running lean and compliant',
    summary: 'One director, one client at a time, dividends and a salary. I ran it through the accountant for years at £120 a month until I realised most of that fee was them typing my data into their software. Now I keep the books in Sage, they review quarterly, and my accounting bill dropped by more than half.',
    pros: 'Director payroll and dividends handled without drama. The accountant logs in rather than me emailing spreadsheets. VAT returns take ten minutes each quarter including the checking.',
    cons: 'Support chat could not answer an IR35 related bookkeeping question and I had to work it out with the accountant, which is fair enough but the chat agent should have said so sooner rather than guessing.',
    review_date: '2026-03-27', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Bridie Callaghan', reviewer_job_title: 'Partner', reviewer_company: 'Callaghan Family Farm Shop',
    reviewer_industry: 'Farming', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 3, value_for_money: 4, customer_service: 3, functionality: 3,
    review_title: 'Farm shop books improved, farm books still elsewhere',
    summary: 'We took it on for the shop side, cafe takings and retail. That part works well. We hoped to bring the farm itself on too but the subsidy schemes, livestock movements and contracting income do not map neatly, so we run two systems which was not the plan.',
    pros: 'Shop and cafe income reconciles against the card machine deposits neatly. Zero rated and standard rated sales split correctly for the VAT return.',
    cons: 'Not built for agricultural specifics and I do not blame it for that, but the sales call was optimistic about it. Support did their best but farm accounting questions went beyond them quickly.',
    review_date: '2025-10-30', helpful_count: 11, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Thank you Bridie. Dedicated agricultural features are not currently on the roadmap and we are sorry if expectations were set otherwise. For the farm entity, many customers work with an agricultural specialist accountant alongside Sage for the retail side. Sage UK Customer Care',
    vendor_response_date: '2025-11-06',
  },
  {
    reviewer_name: 'Theo Blanchard', reviewer_job_title: 'Managing Director', reviewer_company: 'Blanchard Courier Services',
    reviewer_industry: 'Transportation', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 5, functionality: 4,
    review_title: 'Thirty drivers invoiced weekly and the office goes home on time',
    summary: 'Courier work means hundreds of small invoices and self billed driver statements every week. The recurring invoice templates and imports mean Friday invoicing that used to run into the evening is done by three. Support deserve a mention, a VAT registration change mid year was handled on one call.',
    pros: 'Invoice templates and imports built for volume. Customer statements emailed automatically on the first of the month, and the chasing emails have measurably improved our debtor days. Phone support with UK staff who know what a self billing agreement is.',
    cons: 'Would love proper self billing support natively rather than our template workaround. Minor grumble in an otherwise strong two years.',
    review_date: '2026-06-12', helpful_count: 16, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Anoushka Ferreira', reviewer_job_title: 'Practice Manager', reviewer_company: 'Whitegate Dental',
    reviewer_industry: 'Health, Wellness and Fitness', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Dental practice finances without the year end scramble',
    summary: 'NHS payments, private treatment income and associate splits used to meet in one dreadful spreadsheet every month. Categorised properly in Sage, the associates get their statements on time and the principal sees the practice position weekly instead of quarterly.',
    pros: 'Analysis categories split NHS from private income cleanly. Associate payment calculations supported by clear reports. The month end pack for the principal takes an hour now.',
    cons: 'No integration with our practice management software so treatment income is a manual import, tolerable but an integration would be lovely. Occasional bank feed hiccup with our building society account.',
    review_date: '2026-02-20', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Russell Grimshaw', reviewer_job_title: 'Director', reviewer_company: 'Grimshaw & Sons Taxis',
    reviewer_industry: 'Consumer Services', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 2, ease_of_use: 2, value_for_money: 3, customer_service: 2, functionality: 3,
    review_title: 'Taxi firm with cash and card chaos, this did not tame it',
    summary: 'Maybe no software fixes a taxi office, in fairness. Cash jobs, card jobs, account customers and forty self employed drivers settling weekly. We wanted the account customer invoicing and driver settlements in one place and we ended up with workarounds for both, plus a support experience that kept pointing me at help articles I had already read.',
    pros: 'Account customer invoicing itself is fine and the statements go out on time. Bank feed works.',
    cons: 'Driver settlements do not fit any of the built in concepts so we bodge it with credit notes. Chat support pastes article links instead of reading the question. We may persist another six months but the honeymoon is over.',
    review_date: '2025-12-14', helpful_count: 21, verified_linkedin: false, verified_badge: null,
    vendor_response: 'Hello Russell, we are sorry the fit has been poor for your settlement model. Our team would like to look at whether supplier accounts per driver would serve better than the credit note approach. Please contact us and reference this review. Sage UK Customer Care',
    vendor_response_date: '2025-12-21',
  },
  {
    reviewer_name: 'Camilla Rothwell', reviewer_job_title: 'Founder', reviewer_company: 'Rothwell PR & Communications',
    reviewer_industry: 'Public Relations and Communications', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Retainers, project fees and expenses in one tidy place',
    summary: 'An agency lives and dies on retainer billing and recharged expenses. The recurring invoices go out on the first without me thinking, client expenses get photographed and recharged with the receipts attached, and at review time I can see each client relationship in profit terms rather than gut feel.',
    pros: 'Recurring retainer invoicing that never forgets. Recharged expenses with the receipt photo attached to the client invoice, which has ended every quibble. Profit per client visible when renegotiating retainers.',
    cons: 'Time tracking is not built in so we log hours in a separate tool. A simple built in timesheet would complete the picture for agencies.',
    review_date: '2026-04-25', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

// ---------------------------------------------------------------------------
// Generator with fresh pools (distinct from the existing hand written set)
// ---------------------------------------------------------------------------
let seed = 20260702;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Oliver', 'Charlotte', 'Harry', 'Amelia', 'Jack', 'Isla', 'George', 'Emily', 'Noah', 'Sophie',
  'Leo', 'Grace', 'Arthur', 'Lily', 'Oscar', 'Freya', 'Archie', 'Evie', 'Henry', 'Poppy',
  'Paul', 'Susan', 'Mark', 'Julie', 'Gary', 'Karen', 'Wayne', 'Tracey', 'Darren', 'Michelle',
  'Kevin', 'Sharon', 'Barry', 'Donna', 'Clive', 'Pauline', 'Nigel', 'Wendy', 'Malcolm', 'Janet',
  'Rhys', 'Ffion', 'Callum', 'Eilidh', 'Cian', 'Aoife', 'Declan', 'Roisin', 'Fraser', 'Kirsty',
  'Amir', 'Layla', 'Hassan', 'Zainab', 'Dev', 'Anjali', 'Tunde', 'Chioma', 'Filip', 'Kasia',
  'Stefan', 'Ana', 'Luca', 'Nadia', 'Tomas', 'Eva', 'Marek', 'Lena', 'Jonas', 'Petra',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Whitehouse', 'Garside', 'Appleton', 'Bannister', 'Crowther', 'Dewhurst', 'Eastwood',
  'Fothergill', 'Greenhalgh', 'Hollingworth', 'Illingworth', 'Kershaw', 'Longbottom', 'Middleton',
  'Nuttall', 'Ogden', 'Postlethwaite', 'Ramsbottom', 'Sutcliffe', 'Thackeray', 'Umpleby', 'Varley', 'Winterburn',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.3)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.3)) return null;
  const stems = ['Bramblewood', 'Chalkhill', 'Dovecote', 'Elderfield', 'Foxglove', 'Gorsebank',
    'Hawthorn', 'Ivybridge', 'Juniper', 'Kestrel', 'Larkspur', 'Mistletoe', 'Nettlebed',
    'Orchard', 'Pippin', 'Quarry Lane', 'Rowanberry', 'Saltmarsh', 'Thistledown', 'Wagtail'];
  const suf = ['Ltd', 'Trading', 'Studio', 'Consulting', 'Services', 'Workshop', '& Co', 'Supplies', ''];
  const s = pick(suf);
  return `${pick(stems)}${s ? ' ' + s : ''}`.trim();
}
const sizes = ['Self-employed', 'Self-employed', '2-10', '2-10', '2-10', '11-50', '11-50', '51-200'];
const durations = ['Less than 6 months', '6-12 months', '6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years'];
const countries = ['United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom', 'United Kingdom',
  'United Kingdom', 'United Kingdom', 'Ireland', 'Ireland'];
const industries = ['Construction', 'Retail', 'Hospitality', 'Accounting', 'Marketing & Advertising',
  'Information Technology and Services', 'Consumer Services', 'Health, Wellness and Fitness',
  'Real Estate', 'Photography', 'Design', 'Events Services', 'Non-Profit Organization Management',
  'Automotive', 'Legal Services', 'Education Management', 'Food & Beverages', 'Farming',
  'Transportation', 'Facilities Services', 'Sports', 'Writing & Editing', 'Music', 'Landscaping'];
const jobs = ['Owner', 'Director', 'Founder', 'Sole trader', 'Bookkeeper', 'Office Manager',
  'Finance Manager', 'Managing Director', 'Company Director', 'Freelancer', 'Practice Manager',
  'Accountant', 'Administrator', 'Co-founder', 'Partner', 'Operations Manager', 'Treasurer', 'Consultant'];

const CONTENT = {
  5: {
    titles: [
      'VAT quarters stopped being an event', 'The bank feed does the boring bit', 'Small business books without the bookkeeper',
      'Everything reconciled by Friday', 'My accountant approves, which says plenty', 'Invoices out, money in, faster',
      'From shoebox to sorted', 'Quiet, dependable and always right', 'The chasing emails earn their keep',
      'Payroll included sealed it for us', 'Made tax digital feel manageable', 'A proper system at a sensible price',
      'Receipts photographed, filed, forgotten', 'First software my whole family business agrees on', 'Late payers noticed the difference',
      'Set up on Saturday, invoicing on Monday', 'The dashboard tells me the truth daily', 'Copilot spots what I miss',
      'Switched from a rival and no regrets', 'Does the basics beautifully', 'Three year ends without a hitch',
      'Accountant fees down, accuracy up', 'The mobile app pulls its weight', 'Sole trader life got simpler',
    ],
    summaries: [
      'Two years in and the books are simply not a worry anymore. Transactions come in from the bank overnight, most match themselves, and the VAT return is checked rather than compiled.',
      'I run a small trade business and the evenings I used to spend on paperwork now happen inside twenty minutes with a cup of tea. That is the honest review.',
      'We moved off spreadsheets when the second employee started and I wish we had done it two years earlier. Everything since has been quicker and more accurate.',
      'The measure for me is the accountant bill. It has dropped every year since we started keeping proper records in here because they spend their hours advising instead of tidying.',
      'Customers pay from a link on the invoice and the difference in speed is visible in the bank balance. Getting paid inside a week used to be rare, now it is normal.',
      'The quarterly VAT submission goes to HMRC in minutes and the checking screens have twice caught mistakes I made before they became problems.',
      'Payroll for my small team is inside the same subscription, one login and one direct debit, and the pension file uploads without editing.',
      'Photographing receipts in the van between jobs means the paperwork mountain never forms in the first place. My other half calls it the marriage saver.',
      'It handled our change from sole trader to limited company without losing the history, which I had been dreading for months.',
      'The chasing emails are polite, persistent and automatic, and our overdue list is half what it was this time last year.',
      'I tried three of the big name products on trials and this was the one where I could find everything without watching tutorials.',
      'A year of flawless bank feeds from two banks and a credit card. The reconciliation screen suggestions are right nine times out of ten.',
      'My accountant recommended it for the new digital income tax rules and the quarterly updates have been genuinely painless so far.',
      'The dashboard showing what we are owed, what we owe and the VAT building up has changed how I run the week. No more surprises at quarter end.',
      'Copilot flagged a supplier invoice that had been keyed twice before payment went out. It has paid for itself several times over on that alone.',
      'We invoice from the app at the customer door and the professionalism has been commented on more than once. Small thing, real difference.',
      'Support answered on a Sunday morning during my first VAT return and stayed on until it was filed. That first impression has held up since.',
      'Cash flow view ahead of the month has stopped two overdraft moments this year because we saw them coming three weeks out.',
      'Every document, quote and invoice for four years is searchable in seconds. The filing cabinet went to the tip last spring.',
      'The price after the offer period is still less than one hour of my accountant time each month. The value argument is not close.',
    ],
    pros: [
      'Bank feeds that just work, day in day out, across our accounts.',
      'Invoices with a pay now button that customers actually use.',
      'VAT returns checked and submitted to HMRC in minutes.',
      'Payroll included in the plan instead of another subscription.',
      'Receipt capture from the phone with the amounts read correctly.',
      'Automatic chasing emails that recover late invoices politely.',
      'The dashboard shows owed, owing and VAT at a glance.',
      'Accountant access without emailing files back and forth.',
      'Recurring invoices for regular customers run themselves.',
      'Quarterly income tax updates ready ahead of the deadline.',
      'Copilot catching duplicates and odd entries before they cost money.',
      'Quotes converting to invoices in two clicks on site.',
      'Customer statements going out automatically each month.',
      'Clean handover between our old bookkeeper and the new one.',
      'Cash flow forecast that uses real invoice dates rather than guesses.',
      'Everything searchable, four years of records in seconds.',
      'The mobile app covers invoicing and receipts properly.',
      'Setup was one afternoon including the bank connections.',
      'Reliable through three price sensitive Januaries without drama.',
      'Support that picks up the phone and speaks plainly.',
      'Multiple VAT schemes handled correctly, we are on flat rate.',
      'The audit trail satisfied our accountant at year end without questions.',
    ],
    cons: [
      'The step up to Standard for a couple of features I wanted stung a little.',
      'Reports menu takes some learning to find your regulars.',
      'One user on the Start plan is tight for a husband and wife business.',
      'Bank feed needs reauthorising every few months, minor but recurring.',
      'The intro discount ending is a bump you should diary.',
      'Some screens feel a click longer than they need to be.',
      'Stock features are basic if you carry much inventory.',
      'Chat support is slower than the phone, use the phone.',
      'Honestly very little after this long with it.',
      'Nothing that would send me elsewhere.',
      'Occasional slow patch on Monday mornings, seconds not minutes.',
      'Would like more invoice template control for branding.',
      'CIS needs the Standard plan which caught us out at first.',
      'A couple of the newer AI features feel aimed at bigger firms.',
    ],
  },
  4: {
    titles: [
      'Very good with small niggles', 'Does the job for a small firm', 'Happy customer, minor wishes',
      'Solid choice for UK small business', 'Four stars, would recommend with pointers', 'Good software, decent value',
      'Almost everything we need', 'Dependable with rough corners', 'Works well once set up properly',
      'Better than the last two products we used', 'Recommend for VAT registered businesses', 'A safe pair of hands',
      'Strong core, average extras', 'Grew into it over a year', 'Right choice for our trades business',
      'Sensible software, sensible price', 'Keeps us compliant without fuss', 'The accountant suggested it and she was right',
      'Mostly excellent, occasionally puzzling', 'Comfortable and familiar now',
    ],
    summaries: [
      'A year in and it does what we bought it for. A few workflow quirks and a price step after the offer period, but the VAT and invoicing side has been faultless.',
      'Good product overall. The bank matching is the highlight, the reporting is fine, and support has been decent the twice we needed them.',
      'It replaced a spreadsheet and an old desktop package and the office runs smoother for it. Some features on the higher plan should really be standard.',
      'We are a small trades business and it fits well. Quotes, invoices and CIS handled, though the CIS needing the middle plan was an unwelcome discovery.',
      'Recommended by our accountant and it has worked out. The learning curve was a couple of weeks for my colleague who had never done bookkeeping.',
      'Migration from our previous software brought most things across cleanly. A handful of old invoices needed rekeying, after that it has been steady.',
      'The monthly cost is fair for what it does, especially with payroll included. Knock a star off for the occasional sluggish afternoon and limited invoice templates.',
      'Everything tax related has been spot on for six quarters. Everyday ergonomics could be kinder, some jobs take more clicks than they should.',
      'It does the boring things brilliantly and the clever things adequately. For a business our size that is the right way round.',
      'Solid and safe. When the bank feed hiccuped in the spring support sorted it inside two days, which I gather is not universal with these products.',
      'The app is genuinely useful for invoicing on the move. The desktop site is where the deeper work happens and it is fine, just not exciting.',
      'We came from a rival product after a price rise and the switch was less painful than feared. Sage matched most features and beat it on payroll.',
      'Copilot and the newer additions are nice to have though not why we stay. We stay because the VAT return has never once been wrong.',
      'Reports cover what a small business needs. When the accountant wanted something unusual we exported and she built it herself without complaint.',
      'It has quietly become part of the furniture, which is the best compliment for accounting software. The renewal price gets an annual raised eyebrow.',
      'For a first accounting product it strikes the right balance, enough guidance not to feel lost, enough depth not to outgrow it in a year.',
      'The cash flow view and chasing emails have measurably helped. Wish list is modest, better search and a quicker reports menu.',
      'Two of us use it daily without treading on each other. The three user limit on Standard is fine today and might pinch next year.',
    ],
    pros: [
      'Bank reconciliation suggestions that are usually right.',
      'VAT handled properly including our scheme change mid year.',
      'Payroll bundled in, one bill instead of two.',
      'Straightforward enough for a first time bookkeeper.',
      'Quotes to invoices without retyping.',
      'The accountant works in it directly at quarter end.',
      'Receipt photos attached to the right transactions.',
      'Chasing emails that recover money while we sleep.',
      'Statements and reminders on autopilot each month.',
      'Fair monthly price for the feature set.',
      'Clean migration from our previous product.',
      'Mobile app that covers the essentials well.',
      'The dashboard view of owed and owing.',
      'Recurring invoices dependable month after month.',
      'Support resolved our two issues within a couple of days.',
      'MTD submissions on time every quarter since we joined.',
    ],
    cons: [
      'Several useful features live on the plan above.',
      'Invoice design options are limited for brand conscious businesses.',
      'The reports menu could be organised more sensibly.',
      'Occasional slow spells at busy times of day.',
      'Bank feed reauthorisation comes around too often.',
      'Chat support quality depends who you get.',
      'The price after the introductory offer needs budgeting for.',
      'Search within transactions is adequate rather than good.',
      'Some accounting jargon could use plainer labels.',
      'Stock control is thin if you hold real inventory.',
      'User limits per plan feel a touch mean.',
      'A favourites shortcut for common reports would save time weekly.',
      'CSV import formatting is strict and unforgiving.',
      'No built in time tracking for service businesses.',
    ],
  },
  3: {
    titles: [
      'Decent but not effortless', 'Middle of the pack for us', 'Fine for the basics, stretched beyond',
      'Three stars with specific reasons', 'Good tax handling, average everything else', 'Does enough, delights rarely',
      'A qualified recommendation', 'Better than spreadsheets, short of great', 'Right price, rough edges',
      'Works, with workarounds', 'Mixed experience over the year', 'Somewhere in the middle',
      'Adequate is the honest word', 'Kept for the VAT, tolerated for the rest',
    ],
    summaries: [
      'It handles VAT and invoicing fine but our business has quirks and every quirk needs a workaround. Nothing broken, plenty slightly bent.',
      'The core is dependable. Beyond the core, features thin out quicker than the marketing suggests and the plan upgrades add up.',
      'Support has been the weak link for us, one excellent phone call and three chat sessions that went in circles. The software itself is steady.',
      'We use a fraction of it well and the rest not at all. Possibly our fault, but the product does little to lead you into the deeper features.',
      'Bank feed drops from our smaller building society account keep creating catch up work. The main bank connection has been fine throughout.',
      'It replaced a cheaper product and the honest verdict is mild improvement rather than transformation. The VAT side is better, the invoicing is a wash.',
      'A year in, my colleague loves it and I tolerate it, which averages to three stars. The difference is she does the simple tasks and I do the fiddly ones.',
      'Fine software wearing a price that keeps drifting up. Each rise makes the comparison shopping more tempting even though moving is a chore.',
      'Reporting stops short just where our questions start. We export to a spreadsheet weekly, which feels like the old days with extra steps.',
      'The mobile app promises more than it delivers, fine for photographing receipts, frustrating for anything else. Desktop is where everything really happens.',
      'Onboarding was quick but a few early setup mistakes cost us cleanup later. More guardrails in the first month would have saved hours in the sixth.',
      'It does what the tin says for a straightforward business. Ours stopped being straightforward and the cracks show at the edges.',
    ],
    pros: [
      'VAT returns have been accurate throughout.',
      'The main bank feed is reliable.',
      'Invoicing is quick once templates are set.',
      'Fair entry price on the offer period.',
      'The accountant can access it directly.',
      'Receipt capture works as advertised.',
      'Payroll included saves a separate tool.',
      'Statements go out on schedule.',
      'Data exports cleanly when we need a spreadsheet.',
      'Uptime has been good, slow sometimes but never down.',
    ],
    cons: [
      'Workarounds accumulate once your needs get specific.',
      'Support chat wastes time before the phone fixes it.',
      'Feature gaps push you toward plan upgrades.',
      'Smaller bank connections drop more than they should.',
      'Reporting depth runs out early.',
      'The mobile app is thinner than the adverts suggest.',
      'Setup mistakes are easy to make and slow to unwind.',
      'Price creep since the offer ended.',
      'Some screens need too many clicks for daily jobs.',
      'Search and filtering feel a generation behind.',
      'No time tracking without a third party tool.',
      'Occasional sluggish afternoons at month end.',
    ],
  },
  2: {
    titles: [
      'Frustrating more days than not', 'Below expectations after the switch', 'The demo wrote cheques the product struggles to cash',
      'Too many little battles', 'Support let the product down', 'Second thoughts a year in',
      'Not the upgrade we hoped', 'Wearing thin',
    ],
    summaries: [
      'Individually the problems are small, a dropped feed here, a stuck import there, a support chat that answers a different question. Together they make every month heavier than the product we left.',
      'We switched for the payroll bundle and stayed for the sunk cost. The accounting side is passable, the experience of getting help when something breaks is not.',
      'Three support contacts for the same bank feed fault, three different answers, fault still intermittent. The bookkeeping itself is fine when the data arrives.',
      'The price rose, the patience fell. Renewal is in four months and we are actively trialling two competitors on evenings and weekends.',
      'Fine for a simple sole trader I suspect. For a business with staff, stock and CIS it has been a squeeze at every corner and the plan upgrades feel like tolls.',
      'The import from our old system mangled customer balances and support took six weeks to make us whole. Hard to rebuild trust after a start like that.',
      'Every quarter something small goes wrong right before the VAT deadline, and every quarter I remember I am the one who chose this. The relationship is strained.',
      'It works just well enough that leaving feels like effort, and just poorly enough that staying feels like settling. Two stars is that feeling in number form.',
    ],
    pros: [
      'The VAT return itself has always been correct.',
      'Invoicing basics are perfectly usable.',
      'The price on the offer period was genuinely good.',
      'One support agent along the way was excellent and honest.',
      'Payroll being included remains the best part of the deal.',
      'Exports work, which we have tested for the obvious reason.',
    ],
    cons: [
      'Bank feed reliability on our accounts has been poor.',
      'Support quality is wildly inconsistent between contacts.',
      'Plan limits push costs up for features that feel basic.',
      'Imports and migrations need more care than advertised.',
      'Issues cluster around the worst possible times, quarter ends.',
      'The gap between marketing and daily reality is noticeable.',
      'Renewal pricing conversations start high and stay high.',
      'Little confidence anyone reads the feedback we submit.',
    ],
  },
  1: {
    titles: [
      'Gave up after eight months', 'Moving on, lesson learned', 'One star from a patient customer',
      'Wrong tool for us and hard work leaving', 'Cannot recommend after our year',
    ],
    summaries: [
      'Eight months of dropped feeds, double posted transactions after sync errors and support tickets that closed without fixes. The accountant now has a cleanup bill to rival the subscription. We moved and the new product has been drama free.',
      'It may suit tiny simple businesses. For ours it created work, the very thing it was bought to remove, and getting our data out took longer than getting it in.',
      'The final straw was payroll miscalculating a starter mid month and support insisting it had not until we sent screenshots. Everything after that was formality, we left at renewal.',
      'A year of small failures adds up to one big one. Each issue was minor, the pattern was not, and nobody at the company seemed empowered to break it.',
      'Cheap to join, costly to run, painful to leave. Read the cancellation and export process before you sign, we did not and paid for it in evenings.',
    ],
    pros: [
      'The interface looks pleasant, whatever else was happening underneath.',
      'One phone agent tried genuinely hard for us near the end.',
      'The data did eventually export in usable shape.',
    ],
    cons: [
      'Reliability problems that survived every support contact.',
      'Errors that appeared at deadlines and vanished at demos.',
      'Support that closes tickets rather than issues.',
      'A cancellation journey with too much friction.',
      'Total cost far beyond the subscription once cleanup is counted.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.45, 4: 0.34, 3: 0.12, 2: 0.05, 1: 0.04 };
  const offsets = { ease_of_use: 0.15, value_for_money: -0.25, customer_service: -0.3, functionality: -0.15 };
  function pickOverall() {
    const r = rand(); let acc = 0;
    for (let s = 5; s >= 1; s--) { acc += dist[s]; if (r < acc) return s; }
    return 3;
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
    const cons = chance(0.05) ? pick(['None yet worth noting.', 'Nothing beyond the usual small gripes.']) : pick(b.cons);

    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);

    const year = chance(0.5) ? 2026 : (chance(0.62) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;

    const verified = chance(0.33);
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

// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: sw, error: swErr } = await supabase
    .from('software').select('id, review_count').eq('slug', 'sage-accounting').single();
  if (swErr || !sw) throw new Error(`sage-accounting not found: ${swErr && swErr.message}`);
  console.log(`Existing reviews: ${sw.review_count} (kept, appending on top).`);

  // Point the Visit Website button at the real product page
  const { error: urlErr } = await supabase.from('software')
    .update({ vendor_website: 'https://www.sage.com/en-gb/sage-business-cloud/sage-accounting/' })
    .eq('id', sw.id);
  if (urlErr) throw new Error(`vendor_website update failed: ${urlErr.message}`);
  console.log('vendor_website set to the real Sage Accounting product page.');

  // APPEND: no delete
  const generated = buildGeneratedReviews(230);
  const rows = [...ANCHOR_REVIEWS, ...generated].map(r => ({
    software_id: sw.id,
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
    .eq('id', sw.id).single();

  console.log(`Appended ${inserted} new reviews.`);
  console.log('Aggregate ratings now:', agg);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
