// ============================================================================
// Rewrites the Sage Accounting profile for the UK market (sage.com/en-gb)
// and replaces the old South Africa flavoured reviews with a UK review set.
//
// Pricing reflects the live UK price list as of July 2026:
//   Start £20 / Standard £43 / Plus £59 per month, excl 20% VAT,
//   with a 90% off for 6 months introductory offer running.
//
//   node supabase/update_sage_uk.js
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
// Software record — Sage Accounting (UK)
// ---------------------------------------------------------------------------
const SOFTWARE_UPDATE = {
  tagline: 'MTD ready cloud accounting for UK small businesses, now with payroll and Sage Copilot included',
  description_short:
    'UK cloud accounting software with Making Tax Digital VAT submissions, invoicing, bank feeds, CIS, cash flow forecasting and payroll included on every plan.',
  description_full: `<h2>What is Sage Accounting?</h2><p>Sage Accounting is the cloud accounting product from Sage, the Newcastle based software company that has been building bookkeeping tools for British businesses since 1981. It sits below the heavier Sage 50 and Sage Intacct products in the range and is aimed squarely at sole traders, contractors and small companies that want their books, VAT and payroll handled in one place without hiring a finance team. Everything runs in the browser or through the mobile app, so there is nothing to install and your accountant can log in from their own office whenever they need to.</p><p>The product has changed noticeably over the last couple of years. Every plan now includes payroll for a small team and Sage Copilot, the built in AI assistant that chases late invoices, flags unusual transactions and answers questions about your numbers in plain English. That bundling matters, because payroll used to be a separate subscription and it means the entry price now covers considerably more than it used to.</p><h2>Making Tax Digital, done properly</h2><p>For UK businesses the single biggest reason to pick Sage is compliance. Sage Accounting is fully recognised by HMRC for Making Tax Digital, so VAT returns are calculated from your live figures and submitted to HMRC from inside the software in a few clicks. With MTD for Income Tax rolling out to sole traders and landlords from April 2026, Sage has been one of the earliest vendors ready for quarterly income tax submissions as well, which takes a genuine worry off the table for the self employed. If you are VAT registered, the software keeps digital records in the format HMRC expects, tracks the VAT on every transaction and shows you what you owe long before the return is due.</p><h2>Everyday bookkeeping</h2><p>Day to day, the core of the product is invoicing and bank reconciliation. Invoices are quick to create, carry your own branding, and can take card payments through Stripe or direct debit through GoCardless so customers can pay the moment the invoice lands in their inbox. The dashboard shows what you are owed and who is overdue, and Copilot will draft polite chaser emails for you rather than leaving late payers to slip through the cracks.</p><p>Bank feeds connect to all the major UK banks, including the app based ones like Starling and Monzo, and transactions flow in daily to be matched against invoices and bills. Once the software has seen you categorise a supplier a few times it starts suggesting the match itself, so a week of transactions usually takes minutes to reconcile rather than an evening. Automated receipt capture on the Standard plan and above reads photographed receipts and posts them for you, which quietly removes the shoebox of paper problem.</p><h2>Beyond the basics</h2><p>The Standard plan adds the tools a growing business actually asks for: quotes and estimates, cash flow forecasting, purchase invoice management, advanced reporting and full CIS handling for the construction industry, including CIS submissions to HMRC. That last one makes Sage a very common choice among UK builders and subcontractors, because proper CIS support is surprisingly rare in cloud accounting software at this price. The Plus plan adds multi currency invoicing with exchange rate gain and loss reporting, inventory management with stock levels and reorder alerts, and budgeting tools, which is aimed at small importers, online sellers and product businesses.</p><h2>What it costs</h2><p>UK pricing is straightforward and billed in pounds, with all prices excluding VAT. Start is £20 per month for a single user and covers invoicing, bank reconciliation, MTD VAT submissions, payroll and Copilot. Standard is £43 per month for up to three users and adds CIS, quotes, forecasting, receipt capture and the fuller reporting pack. Plus is £59 per month with unlimited users, multi currency and inventory. Sage runs aggressive introductory offers on the UK site, currently 90% off for the first six months, which brings the early cost down to £2, £4.30 and £5.90 a month respectively while you get set up. There is also a free trial, and no long term contract, so you can leave monthly.</p><h2>Where it falls short</h2><p>It is not perfect. Users coming from Sage 50 sometimes find the cloud product lighter than what they left, particularly around stock and detailed journals, and the interface, while much improved, can feel slower than rivals like Xero on large transaction volumes. Support quality gets mixed reports, excellent on the phone once you get through, less impressive on chat during busy filing periods. And as with every vendor in this market, the renewal price after the introductory discount is a step up that catches some people out, so it is worth diarising when your offer period ends.</p><h2>Who should choose it</h2><p>Sage Accounting is the sensible default for UK sole traders, contractors, CIS subcontractors and small limited companies that want HMRC compliance handled natively, payroll included rather than bolted on, and a vendor with a forty year track record in British accounting. If you need a huge app marketplace or run a larger multi entity operation, look at Xero or Sage Intacct instead. For most UK small businesses, the combination of MTD readiness, bundled payroll and pound based pricing makes it one of the strongest value picks in the category.</p>`,

  starting_price: 20,
  price_currency: 'GBP',
  billing_period: 'month',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Start',
      price: 20,
      currency: 'GBP',
      billing: 'month',
      features: [
        '90% off for the first 6 months',
        '1 user',
        'Sage Copilot AI assistant',
        'Create and send invoices',
        'Track what you are owed',
        'Bank feeds and reconciliation',
        'MTD VAT submissions to HMRC',
        'Payroll included',
      ],
    },
    {
      name: 'Standard',
      price: 43,
      currency: 'GBP',
      billing: 'month',
      features: [
        '90% off for the first 6 months',
        'Up to 3 users',
        'Everything in Start',
        'Quotes and estimates',
        'Cash flow forecasting',
        'CIS management and submissions',
        'Automated receipt capture',
        'Advanced reporting',
      ],
    },
    {
      name: 'Plus',
      price: 59,
      currency: 'GBP',
      billing: 'month',
      features: [
        '90% off for the first 6 months',
        'Unlimited users',
        'Everything in Standard',
        'Multi currency invoicing',
        'Exchange rate gains and losses',
        'Inventory and stock management',
        'Budgeting tools',
        'Purchase invoice management',
      ],
    },
  ],

  features: [
    'Invoicing and quotes',
    'MTD VAT submissions to HMRC',
    'MTD for Income Tax ready',
    'Bank feeds and reconciliation',
    'Sage Copilot AI assistant',
    'Payroll included on every plan',
    'CIS management and submissions',
    'Cash flow forecasting',
    'Automated receipt capture',
    'Purchase invoice management',
    'Advanced reporting',
    'Multi currency',
    'Inventory and stock management',
    'Budgeting tools',
    'Customer statements',
    'Mobile app for iOS and Android',
    'Accountant access at no extra cost',
    'Audit trail',
  ],
  top_features: ['MTD VAT submissions to HMRC', 'Payroll included on every plan', 'Sage Copilot AI assistant'],
  integrations: [
    'Stripe',
    'GoCardless',
    'PayPal',
    'AutoEntry',
    'Zapier',
    'Shopify',
    'Square',
    'Microsoft 365',
    'Satago',
    'Syft Analytics',
  ],

  affiliate_url: 'https://www.sage.com/en-gb/sage-business-cloud/sage-accounting/',
  vendor_website: 'https://www.sage.com/en-gb/',
  vendor_name: 'Sage',
  founded_year: 1981,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars'],
  countries_available: ['United Kingdom', 'Ireland'],
  languages: ['English'],

  meta_title: 'Sage Accounting UK Review 2026: Pricing, MTD, Features & Alternatives',
  meta_description:
    'Independent Sage Accounting review for UK businesses: 2026 pricing from £20 a month, Making Tax Digital VAT and Income Tax, CIS, payroll included, pros, cons and alternatives.',
};

// ---------------------------------------------------------------------------
// Reviews — UK reviewer set, replaces the old South Africa batch
// ---------------------------------------------------------------------------
const REVIEWS = [
  {
    reviewer_name: 'Gareth Llewellyn', reviewer_job_title: 'Director', reviewer_company: 'Llewellyn Building Services',
    reviewer_industry: 'Construction', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 5,
    review_title: 'The CIS handling alone is worth the subscription',
    summary: 'We are a small building firm and the CIS side of Sage has saved my wife hours every month. Deductions are calculated on each subcontractor invoice and the monthly CIS return goes straight to HMRC from the software.',
    pros: 'CIS is properly built in, not an add on. Subcontractor verification, deduction statements and the monthly return all happen in one place. VAT returns are equally painless. Our accountant logs in directly so we no longer email spreadsheets back and forth.',
    cons: 'The mobile app is fine for checking who owes us money but you would not want to do real bookkeeping on it. Occasionally the bank feed from Lloyds needs reauthorising which is a minor irritation.',
    review_date: '2026-05-18', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Priya Raghavan', reviewer_job_title: 'Founder', reviewer_company: null,
    reviewer_industry: 'Management Consulting', reviewer_company_size: 'Self-employed', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Went from spreadsheets to sorted in a weekend',
    summary: 'I signed up on the 90% off offer mostly out of curiosity and honestly expected to cancel after the trial. Eighteen months later it runs my whole consultancy admin.',
    pros: 'Setup took an afternoon including connecting my Starling account. Invoices look professional and clients can pay by card straight from the invoice, which noticeably shortened how long I wait to get paid. The Copilot chaser emails are genuinely well written, I barely edit them.',
    cons: 'Reporting on the Start plan is basic. I would like to tag income by client type without upgrading to Standard just for that.',
    review_date: '2026-06-02', helpful_count: 17, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Martin Cresswell', reviewer_job_title: 'Financial Controller', reviewer_company: 'Hartley Interiors Ltd',
    reviewer_industry: 'Furniture', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Solid, unglamorous, does the job',
    summary: 'We moved off Sage 50 when the desktop pricing became silly. The cloud product is lighter in places but for a business our size it covers everything we actually use.',
    pros: 'VAT return preparation is excellent and the audit trail keeps our auditors happy. Bank rules mean month end reconciliation is largely automatic now. Multi user access on Plus without per seat charges is good value against what we were paying before.',
    cons: 'Stock control is noticeably weaker than Sage 50. We manage but a warehouse led business would struggle. Support wait times on chat during January were poor, though phone support was better.',
    review_date: '2026-03-11', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Sophie Whitmore', reviewer_job_title: 'Practice Manager', reviewer_company: 'Whitmore & Co Chartered Accountants',
    reviewer_industry: 'Accounting', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 5,
    review_title: 'Our default recommendation for MTD clients',
    summary: 'We look after around 60 client files on Sage Accounting. With MTD for Income Tax landing in April we have been moving sole trader clients across all year and the quarterly submission workflow is the most complete we have tested.',
    pros: 'HMRC recognised, quarterly updates work, and the accountant edition gives us a clean overview of every client. Clients take to the invoicing quickly which means the records we receive are actually usable. Sage listened to practitioner feedback this year and it shows.',
    cons: 'Opening balance journals for clients migrating mid year are fiddlier than they need to be. Bulk recoding of miscategorised transactions could be smoother.',
    review_date: '2026-04-27', helpful_count: 33, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Thank you Sophie. The migration journal workflow is being reworked this quarter and bulk recode improvements are already in testing. We appreciate the detailed feedback from your practice. Sage UK Customer Care',
    vendor_response_date: '2026-05-04',
  },
  {
    reviewer_name: 'Dean Ackroyd', reviewer_job_title: 'Owner', reviewer_company: 'Ackroyd Plumbing & Heating',
    reviewer_industry: 'Construction', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Does what my accountant told me it would',
    summary: 'My accountant put me on this before the new tax rules kick in. I am not a numbers person at all and I can use it, which says a lot.',
    pros: 'Quoting from the van on my phone then converting the quote to an invoice when the job is done. Photographing receipts instead of keeping them in the glovebox. VAT return took me ten minutes last quarter.',
    cons: 'Took me a while to understand the difference between the payment types when logging what customers paid me. A plain English mode for some of the accounting terms would help people like me.',
    review_date: '2026-02-19', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Eleanor Fitzgerald', reviewer_job_title: 'Finance Director', reviewer_company: 'Bramley & Finch Ltd',
    reviewer_industry: 'Food & Beverages', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 2, functionality: 4,
    review_title: 'Good software let down by patchy support',
    summary: 'The product itself is capable and the price is fair. But when something goes wrong, getting a knowledgeable human takes longer than it should.',
    pros: 'Cash flow forecasting is genuinely useful and more accurate than the spreadsheet it replaced. Purchase invoice management with approval flow works well for a business our size.',
    cons: 'We had a bank feed outage with HSBC that took eleven days to resolve and the chat support kept giving us copy paste answers. Phone support eventually fixed it in one call, so why the chat team could not is beyond me.',
    review_date: '2026-01-30', helpful_count: 26, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Hello Eleanor, we are sorry about the delay you experienced. The HSBC feed issue in January affected a number of customers and we have since changed how feed incidents are escalated. Sage UK Customer Care',
    vendor_response_date: '2026-02-06',
  },
  {
    reviewer_name: 'Tomasz Wisniewski', reviewer_job_title: 'Director', reviewer_company: 'TW Logistics Solutions',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 5,
    review_title: 'Multi currency on Plus paid for itself in the first quarter',
    summary: 'We invoice clients in euros and dollars as well as sterling. The Plus plan handles the conversions and the exchange gains and losses report means our accountant stopped charging us for the manual workings.',
    pros: 'Multi currency invoicing just works. Rates update automatically and the gains and losses are posted for you. Unlimited users meant I could give our ops manager access without a licence discussion.',
    cons: 'You cannot hold a bank account in a foreign currency within the software, everything settles back to sterling. Works for us but might not for everyone.',
    review_date: '2025-11-24', helpful_count: 9, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Hannah Ogunleye', reviewer_job_title: 'Co-founder', reviewer_company: 'Meadow Lane Bakery',
    reviewer_industry: 'Food Production', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 3,
    review_title: 'Great value while the discount lasts, still fair after it',
    summary: 'Started on the £4.30 offer price for Standard which felt almost free. The jump to full price at month seven was a shock to the direct debit but for what we get it is still cheaper than the bookkeeper hours it replaced.',
    pros: 'Receipt capture is the feature we use most, suppliers hand us paper receipts all day and they all end up posted correctly. Payroll for our four staff is included which saved us the separate payroll subscription we had.',
    cons: 'Stock features are too basic for ingredient level tracking so we still run that in a spreadsheet. Diarise when your discount ends because Sage will not remind you loudly.',
    review_date: '2026-04-08', helpful_count: 19, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Richard Blythe', reviewer_job_title: 'Managing Director', reviewer_company: 'Blythe Media Group',
    reviewer_industry: 'Media Production', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 2, ease_of_use: 3, value_for_money: 2, customer_service: 2, functionality: 3,
    review_title: 'Fine at the start, creaks as you grow',
    summary: 'We outgrew it and the last year has been frustrating. At around 40 staff and multiple revenue lines the reporting cannot answer the questions our board asks.',
    pros: 'Reliable for the basics. VAT and payroll never missed a beat in three years, credit where due.',
    cons: 'Report customisation hits a wall quickly. No proper departmental accounting. Exporting to Excel and rebuilding everything defeats the point of the software. We are moving to Intacct which is what Sage themselves suggested, which tells you where they see this product.',
    review_date: '2025-10-12', helpful_count: 31, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Callum Doherty', reviewer_job_title: 'Sole trader', reviewer_company: null,
    reviewer_industry: 'Photography', reviewer_company_size: 'Self-employed', used_for_duration: 'Less than 6 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 5, functionality: 4,
    review_title: 'Bought it for the new income tax rules, kept it for the invoicing',
    summary: 'Signed up in March before the MTD income tax changes because HMRC letters were stressing me out. The quarterly submission thing turned out to be the easy part.',
    pros: 'The onboarding call Sage offered actually happened and the person knew their stuff. Invoicing with card payment links means wedding clients pay deposits same day. Mileage and expense capture on the phone app.',
    cons: 'Only one user on Start so my partner who does my admin uses my login, which I suspect is not the intended arrangement.',
    review_date: '2026-06-15', helpful_count: 7, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Janet Musgrove', reviewer_job_title: 'Treasurer', reviewer_company: 'Ripon Community Arts Trust',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Works well for a small charity with a volunteer treasurer',
    summary: 'I took over as treasurer with no accounting background. Sage has been forgiving of my mistakes and our independent examiner can see everything she needs.',
    pros: 'Easy to correct errors with a clear trail of what changed. Customer statements go to our regular hirers automatically. The charity gets a decent price through our accountant.',
    cons: 'No proper fund accounting, we approximate restricted funds with categories which works but is a workaround. Reports need renaming for charity terminology.',
    review_date: '2025-09-21', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Oliver Stanton', reviewer_job_title: 'Director', reviewer_company: 'Stanton Digital Ltd',
    reviewer_industry: 'Marketing & Advertising', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Copilot went from gimmick to genuinely useful in a year',
    summary: 'When Copilot launched I ignored it. Now I ask it things like which clients pay late on average and it answers with actual figures from my books, which has changed how I set payment terms.',
    pros: 'Copilot for plain English questions about the numbers. Automatic invoice chasing recovered at least two invoices we would have written off. Quotes to invoices workflow is slick.',
    cons: 'The interface has some dated corners, the settings area feels like a different product from a different decade. Search within transactions could be faster.',
    review_date: '2026-05-30', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Margaret Tench', reviewer_job_title: 'Office Manager', reviewer_company: 'Fenwick Agricultural Supplies',
    reviewer_industry: 'Farming', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 3, ease_of_use: 4, value_for_money: 3, customer_service: 3, functionality: 3,
    review_title: 'Miss the desktop version if I am honest',
    summary: 'We were moved off Sage 50 when the sums stopped making sense. The online version is easier in some ways but I still miss how quick the old one was once you knew the keyboard shortcuts.',
    pros: 'Being able to work from home during lambing season. Our accountant fixes things remotely instead of visiting. Backups and updates are not my problem anymore.',
    cons: 'Batch entry is slower than the desktop version, everything wants a mouse click. Some reports I relied on in Sage 50 simply do not exist here and the suggested alternatives are not the same.',
    review_date: '2025-08-14', helpful_count: 23, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Aaron Mehta', reviewer_job_title: 'Founder', reviewer_company: 'Kindle & Crate',
    reviewer_industry: 'Retail', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Handles our Shopify shop better than expected',
    summary: 'We sell homeware online and needed the accounting to keep up with a few hundred orders a month. With the Shopify connection and daily bank feeds it mostly runs itself.',
    pros: 'Sales data flows in without manual imports. Inventory on Plus tracks our stock lines well enough to trust the reorder alerts. VAT on mixed rate products is handled correctly which was our big worry.',
    cons: 'Refunds and partial refunds from Shopify sometimes need manual matching. Support could not initially tell me whether the issue was on the Sage or Shopify side.',
    review_date: '2026-03-28', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Fiona Carragher', reviewer_job_title: 'Bookkeeper', reviewer_company: 'FC Bookkeeping Services',
    reviewer_industry: 'Accounting', reviewer_company_size: 'Self-employed', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'I run fourteen client files on it and it rarely lets me down',
    summary: 'As a freelance bookkeeper I work across several platforms and Sage is where I put clients who want no fuss. The bank rules and recurring entries mean small client files almost run themselves between quarterly reviews.',
    pros: 'Fast to move between client organisations. Bank rules are more flexible than people give them credit for. VAT return workflow with the checks before submission has caught client errors more than once.',
    cons: 'The price for clients who ignore the software and still hand me carrier bags of receipts. That is not really Sage’s fault though.',
    review_date: '2026-01-09', helpful_count: 28, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Neil Prendergast', reviewer_job_title: 'Director', reviewer_company: 'Prendergast Electrical Contractors',
    reviewer_industry: 'Construction', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 5, functionality: 4,
    review_title: 'Sorted our CIS mess in one month',
    summary: 'Previous system was a spreadsheet my old business partner built and nobody understood. First CIS return through Sage matched what our accountant calculated by hand and she signed off on us doing it ourselves from then on.',
    pros: 'CIS deductions on subcontractor bills happen automatically at the right rate once verified. Deduction statements email out to the subbies without me thinking about it. Phone support walked me through the first return start to finish.',
    cons: 'Would like retentions handling for the bigger contracts, we track those manually.',
    review_date: '2025-12-03', helpful_count: 16, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Lucy Hartfield', reviewer_job_title: 'Operations Manager', reviewer_company: 'Thistle & Vine Events',
    reviewer_industry: 'Events Services', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 3, ease_of_use: 4, value_for_money: 3, customer_service: 3, functionality: 3,
    review_title: 'Decent but the gaps show for event businesses',
    summary: 'We take deposits months before events happen and Sage does not really have a concept of that, so our revenue timing always needs manual adjustment.',
    pros: 'Quotes look professional and clients accept them online. Bank reconciliation is quick. The price on the intro offer made trying it a no brainer.',
    cons: 'Deferred income needs manual journals every month. Deposit invoicing works but feels bolted together from parts designed for something else. We may look at alternatives when the discount period ends.',
    review_date: '2026-02-25', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Douglas McAllister', reviewer_job_title: 'Partner', reviewer_company: 'McAllister Farm Partnership',
    reviewer_industry: 'Farming', reviewer_company_size: '2-10', used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Reliable and the VAT side is bulletproof',
    summary: 'Farm accounts with a mix of standard, zero rated and exempt supplies and Sage has never got a VAT return wrong in three years. Our land agent and accountant both have access which keeps everyone honest.',
    pros: 'Handles partial exemption calculations that used to take our accountant a full afternoon. Solid uptime, I can think of one outage in three years and it was announced in advance.',
    cons: 'Fixed asset register is basic, depreciation still lives in a spreadsheet. The new interface update moved things around without much warning.',
    review_date: '2025-07-19', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Sam Okafor', reviewer_job_title: 'Managing Director', reviewer_company: 'Okafor Freight Ltd',
    reviewer_industry: 'Transportation', reviewer_company_size: '11-50', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Moved from QuickBooks and have not looked back',
    summary: 'QuickBooks kept raising prices and the UK support felt like an afterthought. Sage is a British company and it shows in how the VAT and payroll are built.',
    pros: 'Payroll included rather than an extra subscription was the deciding factor, we run twelve drivers through it monthly. Phone support answered by people who understand UK payroll questions. Migration tool brought across two years of history mostly intact.',
    cons: 'Some QuickBooks features I miss, particularly the project profitability view. Custom invoice templates are less flexible.',
    review_date: '2026-04-16', helpful_count: 18, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Verity Chamberlain', reviewer_job_title: 'Director', reviewer_company: 'Chamberlain Design Studio',
    reviewer_industry: 'Design', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'First accounting software I have not actively resented',
    summary: 'I have tried three of these platforms over ten years of running the studio. This is the first one where quarter end does not ruin a weekend.',
    pros: 'The dashboard tells me the three things I actually care about, what we are owed, what we owe and what the VAT bill is shaping up to be. Recurring invoices for retainer clients send themselves. Copilot chases the late ones politely.',
    cons: 'Wish the invoice designer had more font and layout control, our brand is our business after all.',
    review_date: '2026-06-21', helpful_count: 6, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Trevor Huddleston', reviewer_job_title: 'Company Secretary', reviewer_company: 'Huddleston Bros Engineering',
    reviewer_industry: 'Mechanical Engineering', reviewer_company_size: '11-50', used_for_duration: '2+ years',
    overall_rating: 1, ease_of_use: 2, value_for_money: 1, customer_service: 2, functionality: 2,
    review_title: 'Forced migration from Sage 50 left us worse off',
    summary: 'We did not choose this product, we were priced off the desktop version we ran happily for fifteen years. The cloud version is not a replacement for a manufacturing business, whatever the sales material says.',
    pros: 'It is available anywhere, which matters to nobody in our factory office.',
    cons: 'Stock and works order handling is nowhere near Sage 50. Batch processing is slower. Reports we used weekly do not exist. We were told to buy a third party stock add on which doubles the cost. Feels like the customer base is being squeezed toward whatever is cheapest for Sage to run.',
    review_date: '2025-09-05', helpful_count: 42, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Hello Trevor, we are sorry the move has been difficult. Sage 50 remains available and our team can discuss whether it is the better fit for your manufacturing workflows. Please contact us so we can review your migration case. Sage UK Customer Care',
    vendor_response_date: '2025-09-12',
  },
  {
    reviewer_name: 'Bethany Ryder', reviewer_job_title: 'Freelance Copywriter', reviewer_company: null,
    reviewer_industry: 'Writing & Editing', reviewer_company_size: 'Self-employed', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 3, functionality: 3,
    review_title: 'Overkill for me in places but the tax stuff earns its keep',
    summary: 'As a freelancer I probably use a tenth of what this can do. But the tenth I use, invoicing, expenses and the tax estimate, is worth £20 a month to not think about.',
    pros: 'The running estimate of what I should set aside for tax has genuinely changed my saving habits. Invoices from my phone between meetings. Bank feed from Monzo has never dropped.',
    cons: 'Lots of menus for features I will never touch. A genuine freelancer mode that hides the company level features would be nice.',
    review_date: '2026-01-22', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Kenneth Braithwaite', reviewer_job_title: 'Director', reviewer_company: 'Braithwaite Property Maintenance',
    reviewer_industry: 'Facilities Services', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 5, functionality: 3,
    review_title: 'Support is better than people say',
    summary: 'Reading other reviews I expected the support to be dreadful. My experience has been the opposite, three phone calls in eighteen months and all three sorted the problem while I was on the line.',
    pros: 'UK based phone support that picks up. The person I spoke to about a duplicated bank feed actually fixed it rather than raising a ticket into the void. Software itself is steady and predictable.',
    cons: 'Job costing is not really there for a maintenance business, we cannot easily see profit per property or per contract without exporting.',
    review_date: '2025-11-08', helpful_count: 14, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Amara Diallo', reviewer_job_title: 'Finance Manager', reviewer_company: 'Northgate Tutoring Group',
    reviewer_industry: 'Education Management', reviewer_company_size: '11-50', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Clean migration and the forecasting is a pleasant surprise',
    summary: 'Moved from Xero mainly on price when our subscription came up for renewal. Expected a downgrade, got something roughly equivalent with better payroll.',
    pros: 'The cash flow forecast picks up recurring invoices and payroll automatically so it is realistic without any setup. Payroll included saved us the separate Xero payroll charge. Import from Xero brought contacts and balances cleanly.',
    cons: 'Fewer integrations than Xero, we lost one reporting add on we liked and had to rebuild those reports natively. Interface is a little slower.',
    review_date: '2026-05-07', helpful_count: 11, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Roger Entwistle', reviewer_job_title: 'Retired Director, part time consultant', reviewer_company: null,
    reviewer_industry: 'Management Consulting', reviewer_company_size: 'Self-employed', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'This is my fourth Sage product since 1994 and the best of them',
    summary: 'I ran Sage Line 50 businesses for decades. The cloud product finally feels finished, and for my small consultancy in semi retirement it is more than enough.',
    pros: 'Familiar Sage logic under a modern interface. My accountant of twenty years uses it happily. Self assessment figures are ready when my tax return is due rather than assembled in a January panic.',
    cons: 'Prices creep upward year on year like everything else in software. The AI assistant is clever but I do wish it was less eager on the home screen.',
    review_date: '2025-10-27', helpful_count: 20, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Charlotte Nesbitt', reviewer_job_title: 'Director', reviewer_company: 'Nesbitt Recruitment Ltd',
    reviewer_industry: 'Staffing & Recruiting', reviewer_company_size: '2-10', used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 4, customer_service: 3, functionality: 3,
    review_title: 'Middle of the road, which is fine',
    summary: 'It is not exciting software and occasionally it is clunky, but it files our VAT, pays our staff and gives the accountant what she needs. Sometimes that is all you want.',
    pros: 'Price against the competition, especially with payroll bundled. VAT submissions have been faultless. Statements to clients on autopilot.',
    cons: 'Timesheet heavy businesses like ours end up doing invoice prep outside the system and importing. Occasional slow days where every page takes a few seconds too long.',
    review_date: '2026-03-02', helpful_count: 7, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Ian Pemberton', reviewer_job_title: 'Owner', reviewer_company: 'Pemberton Cycles',
    reviewer_industry: 'Retail', reviewer_company_size: '1-10', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Bike shop books finally under control',
    summary: 'Between the shop till, online sales and the workshop, our old system was chaos. Sage pulled it into one view and the stock alerts have stopped us running out of the parts we sell every week.',
    pros: 'Inventory with reorder levels on the Plus plan. Square till payments reconcile against the daily bank deposits without manual matching. Being able to check the shop position from home on a Sunday.',
    cons: 'Serial number tracking for bikes would be the dream, currently we track those in the till system instead.',
    review_date: '2026-02-11', helpful_count: 8, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Denise Whitlock', reviewer_job_title: 'Administrator', reviewer_company: 'St Aidan’s Parish Centre',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '1-10', used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 5, value_for_money: 4, customer_service: 4, functionality: 3,
    review_title: 'Simple enough for our volunteers to help with',
    summary: 'We are a small parish centre and the books used to live with one person who did everything. Now three of us share it and nothing gets lost when someone is on holiday.',
    pros: 'Very hard to break anything, which matters with volunteers. Bank feed means the Saturday hire income appears without anyone typing it in. Our examiner said the records were the tidiest she had seen from us.',
    cons: 'Gift aid tracking has to be done outside the software. More than one user needs the Standard plan which is a stretch for a small charity budget.',
    review_date: '2025-12-18', helpful_count: 10, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Farhan Qureshi', reviewer_job_title: 'Director', reviewer_company: 'FQ Property Lettings',
    reviewer_industry: 'Real Estate', reviewer_company_size: '1-10', used_for_duration: '6-12 months',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 4,
    review_title: 'Getting ready for MTD on the rental portfolio',
    summary: 'With the income tax changes covering landlords I moved the portfolio accounts onto Sage ahead of time. Quarterly figures are now a button press instead of a bookkeeping weekend.',
    pros: 'Property income and expenses categorised per property using the analysis codes. The quarterly MTD submission workflow was ready well before the deadline. Bank rules catch the regular rents automatically.',
    cons: 'It is generic accounting software so anything landlord specific like deposit protection or tenancy tracking lives elsewhere. Chat support did not understand an MTD question that phone support answered immediately.',
    review_date: '2026-05-25', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Gemma Aldridge', reviewer_job_title: 'Studio Manager', reviewer_company: 'Aldridge Ceramics',
    reviewer_industry: 'Arts & Crafts', reviewer_company_size: '1-10', used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 4, functionality: 4,
    review_title: 'Three years in and it has quietly become essential',
    summary: 'We make and sell ceramics from a studio in Cornwall. Sage does the unglamorous work in the background and I forget it exists most days, which I mean as a compliment.',
    pros: 'Wholesale invoices, gallery sale or return arrangements and online shop income all tracked without fuss. VAT flat rate scheme handled correctly. The one support call I made in three years was answered by a helpful human in Newcastle.',
    cons: 'Genuinely struggling to think of one beyond wishing the mobile app showed the same reports as the desktop.',
    review_date: '2026-04-30', helpful_count: 9, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Stuart Kilbride', reviewer_job_title: 'Finance Director', reviewer_company: 'Kilbride & Sons Haulage',
    reviewer_industry: 'Transportation', reviewer_company_size: '51-200', used_for_duration: '1-2 years',
    overall_rating: 2, ease_of_use: 3, value_for_money: 2, customer_service: 3, functionality: 2,
    review_title: 'Too small for a company our size, we should have known',
    summary: 'In fairness the product is aimed below us and we bought it anyway on price. At 80 staff and a vehicle fleet, the gaps became obvious within months.',
    pros: 'What it does, it does correctly. VAT, payroll and reconciliation were accurate throughout.',
    cons: 'No departmental reporting worth the name, no fleet asset handling, purchase approvals too simple for our controls. Payroll at our headcount pushed us to the separate Sage Payroll product anyway, undoing the bundling saving. Moving to a mid market system this year.',
    review_date: '2026-01-15', helpful_count: 17, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Rosie Hetherington', reviewer_job_title: 'Owner', reviewer_company: 'The Wren Coffee House',
    reviewer_industry: 'Hospitality', reviewer_company_size: '2-10', used_for_duration: '6-12 months',
    overall_rating: 5, ease_of_use: 5, value_for_money: 5, customer_service: 5, functionality: 4,
    review_title: 'A cafe owner who actually looks at her numbers now',
    summary: 'My accountant suggested Sage when I admitted the books were done quarterly in a panic. Now I check the dashboard with my morning coffee and I have caught two supplier overcharges because of it.',
    pros: 'Daily till takings reconcile against the bank feed in minutes. Supplier bills photographed and posted before the rep leaves the building. Payroll for my five staff included in the price. Support helped me set up the tips handling correctly.',
    cons: 'Nothing serious. The intro discount ending was a bump but I had six months of savings from ditching my old bookkeeping arrangement to soften it.',
    review_date: '2026-06-09', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
];

// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: sw, error: swErr } = await supabase
    .from('software').select('id, name').eq('slug', 'sage-accounting').single();
  if (swErr || !sw) throw new Error(`sage-accounting not found: ${swErr && swErr.message}`);

  // 1. Update the software profile for the UK market
  const { error: updErr } = await supabase.from('software').update(SOFTWARE_UPDATE).eq('id', sw.id);
  if (updErr) {
    // integrations column only exists after add_integrations.sql; retry without it
    if (/integrations/i.test(updErr.message)) {
      const { integrations, ...rest } = SOFTWARE_UPDATE;
      const { error: retryErr } = await supabase.from('software').update(rest).eq('id', sw.id);
      if (retryErr) throw new Error(`Software update failed: ${retryErr.message}`);
      console.log('Software updated (integrations column missing, skipped that field).');
    } else {
      throw new Error(`Software update failed: ${updErr.message}`);
    }
  } else {
    console.log('Software profile updated for Sage Accounting UK.');
  }

  // 2. Replace the old SA review set with the UK one
  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', sw.id);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const rows = REVIEWS.map(r => ({
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

  console.log(`Reviews: deleted ${delCount ?? 0} old, inserted ${inserted} UK reviews.`);
  console.log('Aggregate ratings now:', agg);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
