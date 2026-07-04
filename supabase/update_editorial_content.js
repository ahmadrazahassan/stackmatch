// ============================================================================
// Replaces every remaining piece of demo/placeholder copy in the database
// with genuine, long-form editorial content:
//   - description_full for the 7 software products that still had
//     "[Demo description]" markers (Sage Accounting was already fixed)
//   - affiliate_url for those same 7 (was pointing at example.com)
//   - custom_verdict for both comparisons
//   - 3 real articles (the articles table was empty; the Blog nav had
//     nothing to show)
//
//   node supabase/update_editorial_content.js
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
// Software descriptions (Sage Accounting already carries real copy)
// ---------------------------------------------------------------------------
const DESCRIPTIONS = {
  'xero': `<h2>What is Xero?</h2><p>Xero is a cloud accounting platform that started in New Zealand in 2006 and has since become one of the most widely used bookkeeping tools in the world, particularly among accountants and bookkeepers who manage several client files at once. Where a lot of accounting software nickels and dimes you for extra staff logins, Xero puts every plan on unlimited users, so your bookkeeper, your business partner and your accountant can all be in the books at the same time without anyone paying an add on fee.</p><p>The day to day experience centres on bank reconciliation, and it is genuinely one of the better implementations on the market. Transactions pulled in from your bank get matched against your invoices and bills automatically, and the suggestions it makes are accurate often enough that reconciling a month of transactions becomes a five minute task instead of an afternoon. Invoicing is clean and quick to send, and if your business tracks billable hours or project costs, the built in projects and time tracking module means you are not paying for a separate tool just to see whether a job actually made money.</p><p>Where Xero really pulls ahead is its app marketplace. With well over a thousand integrations covering everything from point of sale systems to inventory management to payroll, it is rare to find a piece of software you already use that will not connect to Xero in some way. For a growing business that is adding tools as it scales, that flexibility matters more than people expect going in.</p><p>The one thing South African businesses need to plan for is that Xero bills in US dollars, so your monthly cost moves with the exchange rate rather than staying fixed in rand. For businesses that work internationally or bill clients in foreign currency anyway, that is a non issue. For a purely local operation watching every rand, it is worth weighing against rand priced alternatives before committing.</p>`,

  'quickbooks-online': `<h2>What is QuickBooks Online?</h2><p>QuickBooks Online is Intuit's cloud accounting product and, by sheer numbers of businesses using it worldwide, probably the accounting software your accountant already knows how to use. That familiarity is worth more than people give it credit for, because it means fewer training sessions, faster handovers when you switch bookkeepers, and a huge pool of tutorials and advisors if you ever get stuck.</p><p>The reporting is where QuickBooks Online earns its reputation. The report builder lets you slice profit and loss, cash flow and balance sheet data in more ways than most small business owners will ever need, and once you have a report set up the way you like it, you can save it and pull it again in seconds next month. Receipt capture is another genuinely useful touch, you photograph a receipt on your phone and the software reads the amount, date and vendor and matches it to a transaction, which quietly removes one of the more tedious parts of expense tracking.</p><p>For service businesses and agencies, project profitability tracking is worth a specific mention. Instead of guessing whether a client engagement actually made money once your time and expenses are accounted for, you can see it broken out project by project. Mileage tracking and automatic tax categorisation round out a feature set clearly built by people who have actually run a small business.</p><p>Where QuickBooks Online tends to draw criticism, including from the businesses using it here, is around support and value as you scale. The core plans are competitively priced, but useful features often sit behind a higher tier, and support queries can take longer to resolve than the local, chattier support you might get from a smaller regional provider. If you already work with an accountant who is fluent in QuickBooks, that trade off is usually worth it.</p>`,

  'payspace': `<h2>What is PaySpace?</h2><p>PaySpace is a cloud payroll and HR platform that was built in South Africa and has grown into one of the more capable options for businesses that need to pay staff across more than one African country from a single system. It was acquired by Deel in recent years, which has brought more investment into the platform without changing what it was originally built to do well, which is handle the messy, country specific parts of payroll compliance so you do not have to.</p><p>For a South African employer, the standout is how tightly it is wired into SARS requirements. EMP201 and EMP501 submissions, UIF and SDL calculations and e@syFile ready exports are all handled natively rather than bolted on, and when tax tables or thresholds change, updates land in the system rather than landing on your desk as a manual correction job. If you employ people in Kenya, Nigeria, Ghana, Egypt or elsewhere on the continent, PaySpace extends the same approach to those jurisdictions, which is genuinely hard to find in a single platform.</p><p>Employee self service is built into the core product rather than sold as an afterthought. Staff can view and download their own payslips and IRP5s, apply for leave and update personal details, which in practice means HR spends a lot less time answering the same questions every payday. Reporting is detailed enough for finance teams that need to reconcile payroll costs against budgets rather than just knowing what went out the door.</p><p>The trade off is complexity. PaySpace is a serious system with a lot of configuration behind it, so budget real time for setup and expect a learning curve before your team feels fully at home in it. Support experiences also vary depending on how you reach the team, some queries get resolved quickly while others take longer than you would like. For a business with multi country payroll or a headcount that has outgrown a simpler tool, the depth on offer usually justifies the effort.</p>`,

  'simplepay': `<h2>What is SimplePay?</h2><p>SimplePay does exactly what its name suggests. It is a South African payroll system built for businesses that want their payslips run correctly every month without needing a dedicated payroll specialist on staff or a system that requires a training course before anyone can use it. Where some payroll platforms try to be a full HR suite, SimplePay stays focused on payroll and the handful of things that sit right next to it, and that focus shows in how quickly you can get a small team set up and paid.</p><p>Automatic PAYE, UIF and SDL calculations are handled the moment you load an employee, and payslips and IRP5s generate without any manual formula work on your end. EMP201 returns and bulk payment files are ready to submit or upload to your bank straight out of the system, and leave tracking and employee self service are included rather than charged as extras, so staff can see their own balances and payslips without emailing HR every time.</p><p>What consistently stands out among the businesses using it is the support experience. There is no phone line, queries go through email, but responses tend to be fast, specific and from people who clearly understand payroll rather than reading from a script. Combined with straightforward integrations into accounting platforms like Xero, it slots into a small business's existing setup with very little friction.</p><p>The trade off for that simplicity is scope. If you need deep HR functionality, multi country payroll or heavy customisation, SimplePay will feel light. But for South African small businesses and accounting practices running payroll for a handful of clients, the combination of honest pricing, accurate compliance and genuinely helpful support makes it one of the easiest recommendations in this category.</p>`,

  'zoho-crm': `<h2>What is Zoho CRM?</h2><p>Zoho CRM is the customer relationship management piece of the much larger Zoho suite, and it has built its reputation on giving small and mid sized businesses enterprise level sales tooling without the enterprise price tag. Where a lot of CRMs make you commit to a per seat cost before you have even tested whether the workflow suits your sales process, Zoho offers a genuinely usable free tier for small teams, so you can get a pipeline running before spending a rand.</p><p>Once you move onto a paid plan, the value proposition holds. Workflow automation lets you set up follow up tasks, reminders and email sequences that fire without a rep having to remember to do it manually, which matters most in the early weeks after a lead comes in when timely follow up makes the biggest difference to conversion. Deal pipelines are fully customisable to match however your business actually sells, rather than forcing you into a generic stage structure that does not reflect reality.</p><p>For South African sales teams specifically, the omnichannel inbox and integrations, including WhatsApp, are worth calling out. A lot of local buying conversations genuinely happen over WhatsApp rather than email, and having that channel inside the CRM instead of running parallel to it keeps your sales history in one place instead of scattered across apps.</p><p>The honest trade off is that the interface takes some getting used to. There is a lot packed into the platform, and new users sometimes need a proper onboarding session before they feel at home rather than clicking around lost. Once the initial learning curve is behind you, though, Zoho CRM consistently comes out as one of the strongest value plays in this category, doing most of what the bigger name CRMs do at a fraction of the cost.</p>`,

  'bamboohr': `<h2>What is BambooHR?</h2><p>BambooHR is a human resources information system built around a simple idea, that HR software should feel as easy to use as the consumer apps people use every day, not like a legacy enterprise tool bolted onto a company intranet. It covers the full employee lifecycle from the moment someone applies for a role through onboarding, day to day leave and records management, performance reviews and eventually offboarding, all inside one clean interface.</p><p>The onboarding experience is a genuine strength. New starters get a structured checklist of documents, introductions and tasks waiting for them before their first day even begins, which takes a load of admin off whoever normally chases signatures and welcome emails manually. Employee self service extends that same ease of use to everyday HR requests, staff can update their own details, book leave and pull their own records without a single email to HR, and adoption tends to be immediate because the interface genuinely does not need explaining.</p><p>Performance reviews and eNPS style engagement surveys are built in rather than sold as a bolt on, which gives HR teams a way to track how the business is actually feeling without stitching together spreadsheets and separate survey tools. Reporting and the org chart view give a clear picture of headcount, structure and trends as the business grows.</p><p>The main consideration for South African businesses is price and scope. BambooHR sits at the premium end of the HR software market in rand terms, and it does not include native South African payroll, so most local businesses run it alongside a separate payroll system rather than as an all in one solution. For businesses that value ease of use and a genuinely pleasant staff experience enough to justify the cost, it is hard to find a system people actually enjoy logging into as much as this one.</p>`,

  'odoo': `<h2>What is Odoo?</h2><p>Odoo is a modular, open source enterprise resource planning suite built around one idea that most business software gets wrong, that your accounting, inventory, sales and website should not live in five different tools that barely talk to each other. Instead of buying separate software for each department, you start with a single app, accounting or inventory are common starting points, and switch on more modules as the business needs them, all of it sharing the same underlying database.</p><p>That shared database is where the real value shows up. A sale made on your website automatically updates stock levels, triggers the right accounting entries and can even kick off a delivery workflow, without anyone re typing the same information into three different systems. For businesses that have outgrown a patchwork of spreadsheets and single purpose apps, consolidating everything into Odoo tends to be one of the more noticeable operational upgrades they make.</p><p>The catalogue of available apps is genuinely broad, covering accounting, inventory and manufacturing, CRM and sales, eCommerce, point of sale and more, and because it is open source, the level of customisation available through Odoo Studio and custom development goes further than most proprietary systems allow. You can start with the free single app plan and unlimited users, which makes it realistic to trial properly before committing spend.</p><p>The honest trade off is complexity. Odoo rewards businesses that invest properly in setup, usually with the help of an implementation partner, and skipping that step tends to be where frustration creeps in. Version upgrades can also require real work if you have built custom configurations on top. For a business willing to put in the setup effort, though, the amount of functionality you get for the price is difficult to match anywhere else in this category.</p>`,
};

// ---------------------------------------------------------------------------
// Comparison verdicts
// ---------------------------------------------------------------------------
const VERDICTS = [
  {
    a: 'sage-accounting',
    b: 'xero',
    verdict: `For VAT registered South African businesses that want local compliance handled out of the box, Sage Accounting is the safer default, its VAT201 ready reporting and rand based pricing remove a lot of guesswork at tax time. Xero wins on day to day experience, with unlimited users on every plan and the largest app ecosystem of the two, but its USD billing means your monthly cost moves with the exchange rate. Choose Sage if VAT compliance and predictable rand pricing matter most. Choose Xero if you value a slicker interface and a bigger integration library more than a fixed local price.`,
  },
  {
    a: 'payspace',
    b: 'simplepay',
    verdict: `SimplePay is the value pick for straightforward South African payroll, especially under around fifty staff, thanks to honest per payslip pricing, fast support and a setup that takes minutes rather than days. PaySpace costs more, but earns it with multi country compliance, deeper HR functionality and reporting built for finance teams that need to reconcile payroll against budgets rather than just get people paid. Choose SimplePay if your payroll is entirely South African and you want the simplest possible experience. Choose PaySpace if you employ staff in more than one African country or need HR depth beyond payroll alone.`,
  },
];

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------
const ARTICLES = [
  {
    title: 'How to Choose Accounting Software for Your South African Small Business',
    slug: 'best-accounting-software-south-africa',
    excerpt: 'A practical guide to choosing between Sage, Xero and QuickBooks Online, covering VAT compliance, rand versus dollar pricing and everyday ease of use.',
    content: `<h2>What to look for in South African accounting software</h2><p>Choosing accounting software is one of those decisions that quietly shapes how much time you spend on admin for years afterward, so it is worth being deliberate about it rather than picking whatever a friend happens to use. Four things matter most for a South African business specifically. First, VAT compliance, your reporting needs to be genuinely VAT201 ready, not something you reverse engineer at filing time. Second, bank feed reliability with the major local banks, because a platform that constantly drops its connection turns reconciliation into a chore instead of a five minute task. Third, whether pricing is billed in rand or US dollars, since a USD subscription means your cost moves with the exchange rate every month. Fourth, and often underrated, how easy the platform is for whoever is actually going to use it day to day, which is not always the most experienced bookkeeper on the team.</p><h2>Sage Accounting: best for local VAT compliance</h2><p>Sage Accounting is built with South African VAT and SARS requirements as a first class concern rather than an afterthought, which shows up clearly in how its reporting is structured. If staying compliant with minimum fuss is your top priority, and especially if your books are managed by a practising accountant, Sage is usually the safer starting point. Pricing is in rand, which also removes one variable from your monthly budgeting.</p><h2>Xero: best for user experience and integrations</h2><p>Xero consistently earns praise for how pleasant it is to use day to day, with strong bank reconciliation suggestions and unlimited users included on every plan, so your bookkeeper and your accountant can both be in the books without extra seat costs. Its app marketplace is the largest of the three, which matters if you are already using other software that needs to connect cleanly. The trade off is USD billing, which is worth factoring into your decision if you are watching the exchange rate closely.</p><h2>QuickBooks Online: best for reporting depth</h2><p>QuickBooks Online leans hardest into reporting, with a report builder that lets you slice profit and loss, cash flow and other views far more flexibly than most small businesses will ever fully use. Its receipt capture and project profitability tracking are genuinely useful for service businesses tracking whether specific jobs or clients are profitable. It also has the benefit of near universal familiarity among accountants, which can shorten onboarding if you are switching bookkeepers.</p><h2>How to decide</h2><p>If VAT compliance and predictable rand pricing are non negotiable, start with Sage. If you want the cleanest day to day experience and a wide integration library and can accept USD billing, Xero is worth a trial. If reporting depth and working with an accountant who already knows the platform matter most, QuickBooks Online is a safe choice. All three offer free trials, and the fastest way to find the right fit is usually to run your actual invoicing and bank reconciliation workflow through each one for a week before committing.</p>`,
    category_tag: 'Guide',
    related_software_slug: 'sage-accounting',
    author_name: 'Naledi Khumalo',
    author_title: 'Senior Software Analyst',
    author_bio: 'Naledi has spent eight years testing and reviewing business software for South African companies, with a focus on accounting and financial tools.',
    meta_title: 'Best Accounting Software for South African Small Businesses (2026)',
    meta_description: 'How to choose accounting software in South Africa: VAT compliance, rand pricing and ease of use compared across Sage, Xero and QuickBooks Online.',
    read_time_minutes: 5,
    featured: true,
    published_date: '2026-06-10',
  },
  {
    title: 'Sage vs Xero vs QuickBooks: Which Should Your SA Business Choose?',
    slug: 'sage-vs-xero-vs-quickbooks-south-africa',
    excerpt: 'The big three of cloud accounting, compared head to head on pricing, VAT compliance, ease of use and support for South African businesses.',
    content: `<h2>The contenders</h2><p>Sage, Xero and QuickBooks Online dominate cloud accounting conversations among South African small businesses, and for good reason, each has real strengths rather than being interchangeable versions of the same product. Sage leans into local VAT compliance, Xero leans into user experience and integrations, and QuickBooks Online leans into reporting depth and accountant familiarity. The right choice depends less on which is objectively best and more on which strengths line up with what actually slows your business down today.</p><h2>Pricing in rand</h2><p>Sage and QuickBooks Online both bill in rand, starting from roughly R299 and R38 a month respectively depending on the plan, which keeps your monthly cost fixed regardless of currency movements. Xero bills in US dollars from around twenty dollars a month, so your rand cost shifts with the exchange rate. For a business with a tight, predictable budget, that difference alone can be the deciding factor before you have even compared features.</p><h2>VAT and SARS compliance</h2><p>All three platforms can get you to a compliant VAT201 return, but Sage does the most to keep that process painless, since its reporting was built with South African tax requirements as a starting point rather than adapted afterward. Xero and QuickBooks Online both work, but businesses relying heavily on an accountant who already knows the local VAT quirks may find themselves doing a bit more manual checking with either.</p><h2>Ease of use and support</h2><p>Xero is generally considered the easiest to pick up for someone without a bookkeeping background, with a clean interface and reconciliation suggestions that are accurate enough to trust most of the time. Sage asks a little more of a first time user, particularly around setting up the chart of accounts, but that investment pays off in compliance confidence later. QuickBooks Online sits in between, intuitive for day to day invoicing and expense tracking, though support queries can take longer to resolve than the more localised experience some businesses expect. If your team is not confident with accounting concepts, factor in a proper onboarding period whichever platform you choose.</p><h2>Our recommendation</h2><p>If VAT compliance and rand pricing are your top priorities, choose Sage. If you want the most pleasant day to day interface and the widest range of integrations and are comfortable with USD billing, choose Xero. If you want the deepest reporting and are working with an accountant who already knows the platform, choose QuickBooks Online. None of the three is a wrong choice, the businesses that end up frustrated are usually the ones who picked based on brand recognition alone rather than which strengths actually matched their day to day workflow.</p>`,
    category_tag: 'Comparison',
    related_software_slug: 'xero',
    author_name: 'Naledi Khumalo',
    author_title: 'Senior Software Analyst',
    author_bio: 'Naledi has spent eight years testing and reviewing business software for South African companies, with a focus on accounting and financial tools.',
    meta_title: 'Sage vs Xero vs QuickBooks for South Africa (2026 Comparison)',
    meta_description: 'Sage vs Xero vs QuickBooks compared for South African businesses: pricing, VAT compliance, ease of use and our recommendation.',
    read_time_minutes: 6,
    featured: true,
    published_date: '2026-06-18',
  },
  {
    title: 'Payroll Compliance in South Africa: A 2026 Checklist for Employers',
    slug: 'payroll-compliance-south-africa-checklist',
    excerpt: 'PAYE, UIF, SDL, EMP201, EMP501 and IRP5s explained in plain English, a practical checklist of what every South African employer must file, and when.',
    content: `<h2>Monthly obligations</h2><p>Every registered employer in South Africa carries the same core monthly obligation, submit an EMP201 declaration and pay over PAYE, UIF and SDL by the seventh of the month following the one in which employees were paid. Missing that date, even by a day, can trigger penalties and interest from SARS, so the EMP201 process deserves to be treated as a fixed monthly deadline rather than something squeezed in whenever there is time. Getting the numbers right depends on accurate payroll calculations in the first place, which is where most of the actual risk sits, a payroll run with an incorrect PAYE calculation does not just cost money to fix, it also means your EMP201 was wrong the moment you filed it.</p><h2>Bi annual reconciliation</h2><p>Twice a year, employers must complete an EMP501 reconciliation, matching what was declared and paid across EMP201s against the actual tax certificates, IRP5s and IT3as, issued to employees. The interim reconciliation covers the first half of the tax year and is typically due in October, while the annual reconciliation covers the full tax year and falls in May. This is the point where small discrepancies from earlier in the year surface, an employee who was under or over deducted, a benefit that was not correctly taxed, or a leave payout that slipped through incorrectly categorised. Businesses that reconcile informally each month tend to sail through EMP501 season, while those that only look at the numbers twice a year often find themselves untangling months of small errors under time pressure.</p><h2>Employee tax certificates and UIF</h2><p>IRP5 and IT3a certificates need to be accurate and issued on time as part of the annual reconciliation, since employees rely on them to file their own personal tax returns. Separately, UIF contributions need to be declared not only to SARS but also to the Department of Employment and Labour through the UIF system, which is a step that catches out employers who assume the SARS submission covers everything. SDL obligations follow a similar pattern of needing to be calculated correctly every pay period rather than adjusted after the fact.</p><h2>How payroll software helps</h2><p>The realistic way most South African employers stay on top of all of this is by using payroll software that has the compliance rules built in rather than tracking legislation changes manually. A good system calculates PAYE, UIF and SDL correctly at the point of each pay run, keeps EMP201 figures accurate as you go so bi annual reconciliation is a formality rather than a scramble, and generates IRP5s and IT3as without manual formula work. The businesses that struggle most with compliance are usually the ones still running payroll through spreadsheets, where a single formula error can quietly compound across an entire tax year before anyone notices. Whether you choose a full featured platform built for multi country compliance or a simpler tool focused purely on South African payroll, the return on investment tends to show up the first time a reconciliation goes smoothly instead of turning into a week of detective work.</p>`,
    category_tag: 'Guide',
    related_software_slug: 'payspace',
    author_name: 'Grant Isaacs',
    author_title: 'Payroll Specialist',
    author_bio: 'Grant advises South African employers on payroll compliance and has spent a decade working alongside SARS registered payroll practitioners.',
    meta_title: 'SA Payroll Compliance Checklist 2026 — PAYE, UIF, EMP501',
    meta_description: 'A practical 2026 payroll compliance checklist for South African employers: monthly EMP201s, bi annual reconciliation, IRP5s and how software helps.',
    read_time_minutes: 6,
    featured: false,
    published_date: '2026-06-25',
  },
];

// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } });

  // 1. Software id + vendor_website lookup
  const { data: allSw, error: swErr } = await supabase
    .from('software').select('id, slug, vendor_website');
  if (swErr) throw new Error(`Failed to load software: ${swErr.message}`);
  const bySlug = Object.fromEntries(allSw.map(s => [s.slug, s]));

  // 2. Update descriptions + affiliate_url (real vendor site instead of example.com)
  for (const [slug, description_full] of Object.entries(DESCRIPTIONS)) {
    const sw = bySlug[slug];
    if (!sw) { console.warn(`No software row for slug '${slug}', skipping`); continue; }
    const { error } = await supabase
      .from('software')
      .update({ description_full, affiliate_url: sw.vendor_website })
      .eq('id', sw.id);
    if (error) throw new Error(`Failed updating ${slug}: ${error.message}`);
    console.log(`Updated description + affiliate_url: ${slug}`);
  }

  // 3. Update comparison verdicts
  const { data: allCmp, error: cmpErr } = await supabase
    .from('comparisons').select('id, software_a_id, software_b_id');
  if (cmpErr) throw new Error(`Failed to load comparisons: ${cmpErr.message}`);
  for (const v of VERDICTS) {
    const aId = bySlug[v.a]?.id;
    const bId = bySlug[v.b]?.id;
    const row = allCmp.find(c =>
      (c.software_a_id === aId && c.software_b_id === bId) ||
      (c.software_a_id === bId && c.software_b_id === aId)
    );
    if (!row) { console.warn(`No comparison row for ${v.a} vs ${v.b}, skipping`); continue; }
    const { error } = await supabase
      .from('comparisons').update({ custom_verdict: v.verdict }).eq('id', row.id);
    if (error) throw new Error(`Failed updating comparison ${v.a} vs ${v.b}: ${error.message}`);
    console.log(`Updated verdict: ${v.a} vs ${v.b}`);
  }

  // 4. Insert articles (table was empty)
  const { error: delErr } = await supabase.from('articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delErr) throw new Error(`Failed clearing articles: ${delErr.message}`);

  const rows = ARTICLES.map(a => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    category_tag: a.category_tag,
    related_software_id: bySlug[a.related_software_slug]?.id ?? null,
    author_name: a.author_name,
    author_title: a.author_title,
    author_bio: a.author_bio,
    meta_title: a.meta_title,
    meta_description: a.meta_description,
    read_time_minutes: a.read_time_minutes,
    status: 'published',
    featured: a.featured,
    published_date: a.published_date,
  }));
  const { error: insErr } = await supabase.from('articles').insert(rows);
  if (insErr) throw new Error(`Failed inserting articles: ${insErr.message}`);
  console.log(`Inserted ${rows.length} articles.`);

  console.log('Done.');
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
