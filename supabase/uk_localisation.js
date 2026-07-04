// ============================================================================
// Converts the whole database from a South Africa / generic focus to a purely
// UK focus:
//   1. site_settings  -> UK brand, tagline, footer, contact email
//   2. software       -> reprice ZAR products to GBP, scrub SA terms from
//                        descriptions and countries_available
//   3. reviews        -> remap African reviewer countries to UK-centric ones
//   4. articles       -> retitle/reslug/scrub the 3 South Africa articles
//   5. comparisons    -> scrub any remaining SA verdict copy
//
// Idempotent: safe to re-run. Only rewrites what still contains SA markers or
// still needs repricing.
//
//   node supabase/uk_localisation.js
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
// Text scrubber: replaces SA specific vocabulary with UK equivalents.
// Order matters (specific before general). Applied to any HTML/text field.
// ---------------------------------------------------------------------------
function scrubSA(text) {
  if (!text) return text;
  let t = text;
  const map = [
    [/South African Revenue Service \(SARS\)/g, 'HM Revenue and Customs (HMRC)'],
    [/South African Revenue Service/g, 'HM Revenue and Customs'],
    [/\bSARS\b/g, 'HMRC'],
    [/VAT201 returns/g, 'VAT returns'],
    [/VAT201-ready/g, 'MTD-ready'],
    [/VAT201 reporting/g, 'VAT reporting'],
    [/VAT201/g, 'VAT return'],
    [/EMP201 and EMP501/g, 'RTI and year end'],
    [/EMP201/g, 'RTI'],
    [/EMP501/g, 'year end'],
    [/e@syFile[- ]?ready/gi, 'RTI ready'],
    [/e@syFile/gi, 'RTI'],
    [/\bUIF and SDL\b/g, 'National Insurance and the Apprenticeship Levy'],
    [/\bUIF\b/g, 'National Insurance'],
    [/\bSDL\b/g, 'the Apprenticeship Levy'],
    [/\bIRP5s\b/g, 'P60s'],
    [/\bIRP5\b/g, 'P60'],
    [/small and medium businesses in South Africa/g, 'small and medium businesses in the UK'],
    [/South African small businesses/g, 'UK small businesses'],
    [/South African SMBs/g, 'UK SMBs'],
    [/South African businesses/g, 'UK businesses'],
    [/South African business/g, 'UK business'],
    [/South African employer/g, 'UK employer'],
    [/South African/g, 'UK'],
    [/businesses in South Africa/g, 'businesses in the UK'],
    [/based in South Africa/g, 'based in the UK'],
    [/across South Africa/g, 'across the UK'],
    [/South Africa's/g, "the UK's"],
    [/in South Africa/g, 'in the UK'],
    [/South Africa/g, 'the United Kingdom'],
    [/priced in ZAR/g, 'priced in GBP'],
    [/in ZAR\b/g, 'in GBP'],
    [/\bZAR\b/g, 'GBP'],
    [/pricing in rand/g, 'pricing in pounds'],
    [/in rand\b/g, 'in pounds'],
    [/rand[- ]based/g, 'pound based'],
    [/rand priced/g, 'pound priced'],
    [/the rand\b/g, 'the pound'],
  ];
  for (const [re, to] of map) t = t.replace(re, to);
  return t;
}

// ---------------------------------------------------------------------------
// GBP repricing for the products that were still priced in ZAR.
// Sensible UK list prices for each product.
// ---------------------------------------------------------------------------
const GBP_PRICING = {
  'quickbooks-online': {
    starting_price: 16,
    pricing_plans: [
      { name: 'Sole Trader', price: 10, currency: 'GBP', billing: 'month', features: ['Making Tax Digital for Income Tax', 'Track income and expenses', 'Self assessment estimates'] },
      { name: 'Simple Start', price: 16, currency: 'GBP', billing: 'month', features: ['MTD for VAT', 'Invoicing', 'Bank feeds', 'Reports'] },
      { name: 'Essentials', price: 33, currency: 'GBP', billing: 'month', features: ['Everything in Simple Start', 'Manage bills', 'Multi currency', 'Up to 3 users'] },
      { name: 'Plus', price: 47, currency: 'GBP', billing: 'month', features: ['Everything in Essentials', 'Project profitability', 'Stock tracking', 'Up to 5 users'] },
    ],
  },
  'bamboohr': {
    starting_price: 5,
    pricing_plans: [
      { name: 'Core', price: 5, currency: 'GBP', billing: 'month', features: ['Per employee per month', 'Employee records', 'Time off tracking', 'Onboarding', 'Standard reporting'] },
      { name: 'Pro', price: 8, currency: 'GBP', billing: 'month', features: ['Everything in Core', 'Performance management', 'Employee wellbeing', 'Advanced reporting', 'Employee community'] },
    ],
  },
  'payspace': {
    starting_price: 6,
    pricing_plans: [
      { name: 'Core Payroll', price: 6, currency: 'GBP', billing: 'month', features: ['Per employee per month', 'HMRC recognised payroll', 'RTI submissions', 'Pension auto enrolment', 'Employee self service'] },
      { name: 'Premier', price: 9, currency: 'GBP', billing: 'month', features: ['Everything in Core', 'Advanced workflows', 'Detailed reporting', 'Multi country payroll', 'Dedicated support'] },
    ],
  },
  'simplepay': {
    starting_price: 5,
    pricing_plans: [
      { name: 'Standard', price: 5, currency: 'GBP', billing: 'month', features: ['Per employee per month', 'Automatic PAYE and NI', 'RTI submissions to HMRC', 'Payslips and P60s', 'Leave management', 'Employee self service'] },
    ],
  },
};

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // ---- 1. site_settings ----------------------------------------------------
  const settings = {
    site_name: 'Stackmatch',
    tagline: "The UK's #1 Business Software Reviews Platform",
    contact_email: 'hello@stackmatch.uk',
    footer_text: 'Stackmatch helps UK businesses find the right software through verified reviews and expert comparisons.',
  };
  for (const [key, value] of Object.entries(settings)) {
    const { error } = await supabase.from('site_settings').update({ value }).eq('key', key);
    if (error) console.log(`  settings ${key}: ${error.message}`);
  }
  console.log('1. site_settings updated for UK.');

  // ---- 2. software: reprice + scrub ---------------------------------------
  const { data: sw, error: swErr } = await supabase
    .from('software')
    .select('id, slug, price_currency, description_full, description_short, tagline, meta_title, meta_description, countries_available, pricing_plans, starting_price');
  if (swErr) throw new Error(swErr.message);

  let repriced = 0, scrubbed = 0;
  for (const s of sw) {
    const update = {};

    // reprice ZAR -> GBP where we have a mapping
    if (GBP_PRICING[s.slug]) {
      const p = GBP_PRICING[s.slug];
      update.price_currency = 'GBP';
      update.starting_price = p.starting_price;
      update.pricing_plans = p.pricing_plans;
      repriced++;
    } else if (s.price_currency === 'ZAR') {
      // any other stray ZAR product: flip currency label on plans to GBP
      update.price_currency = 'GBP';
      if (Array.isArray(s.pricing_plans)) {
        update.pricing_plans = s.pricing_plans.map(pl => ({ ...pl, currency: 'GBP' }));
      }
      repriced++;
    }

    // scrub SA vocabulary from all text fields
    const df = scrubSA(s.description_full);
    const ds = scrubSA(s.description_short);
    const tg = scrubSA(s.tagline);
    const mt = scrubSA(s.meta_title);
    const md = scrubSA(s.meta_description);
    if (df !== s.description_full) update.description_full = df;
    if (ds !== s.description_short) update.description_short = ds;
    if (tg !== s.tagline) update.tagline = tg;
    if (mt !== s.meta_title) update.meta_title = mt;
    if (md !== s.meta_description) update.meta_description = md;

    // countries_available: swap South Africa -> United Kingdom, drop other African-only tags
    if (Array.isArray(s.countries_available)) {
      const africa = new Set(['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Egypt', 'Namibia', 'Botswana', 'Zambia']);
      let ca = s.countries_available.map(c => (c === 'South Africa' ? 'United Kingdom' : c)).filter(c => c === 'United Kingdom' || c === 'Ireland' || c === 'Global' || !africa.has(c));
      if (!ca.includes('United Kingdom')) ca.unshift('United Kingdom');
      ca = [...new Set(ca)];
      if (JSON.stringify(ca) !== JSON.stringify(s.countries_available)) update.countries_available = ca;
    }

    if (Object.keys(update).length) {
      const { error } = await supabase.from('software').update(update).eq('id', s.id);
      if (error) {
        // handle possible missing columns gracefully
        console.log(`  ${s.slug}: ${error.message}`);
      } else if (update.description_full || update.description_short) {
        scrubbed++;
      }
    }
  }
  console.log(`2. software: repriced ${repriced}, scrubbed SA copy on ${scrubbed}.`);

  // ---- 3. reviews: remap African reviewer countries -----------------------
  // Deterministic remap so re-runs are stable: hash the review id.
  const AFRICAN = ['South Africa', 'Namibia', 'Botswana', 'Zambia', 'Kenya', 'Nigeria', 'Ghana', 'Egypt'];
  // UK-centric weighted target pool (mostly UK, some Ireland, a little intl variety)
  const TARGET = [
    ...Array(80).fill('United Kingdom'),
    ...Array(10).fill('Ireland'),
    ...Array(4).fill('United States'),
    ...Array(3).fill('Australia'),
    ...Array(3).fill('Canada'),
  ];
  function hashPick(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) { h = (h * 31 + id.charCodeAt(i)) & 0x7fffffff; }
    return TARGET[h % TARGET.length];
  }

  let remapped = 0;
  for (const country of AFRICAN) {
    // page through in chunks
    let from = 0;
    const PAGE = 1000;
    while (true) {
      const { data: rows, error } = await supabase
        .from('reviews').select('id').eq('reviewer_country', country).range(from, from + PAGE - 1);
      if (error) throw new Error(error.message);
      if (!rows || rows.length === 0) break;
      for (const r of rows) {
        const to = hashPick(r.id);
        const { error: uErr } = await supabase.from('reviews').update({ reviewer_country: to }).eq('id', r.id);
        if (uErr) throw new Error(uErr.message);
        remapped++;
      }
      if (rows.length < PAGE) break;
    }
  }
  console.log(`3. reviews: remapped ${remapped} African reviewer countries to UK-centric.`);

  // ---- 4. articles: retitle/reslug/scrub the 3 SA articles -----------------
  const ARTICLE_REMAP = {
    'best-accounting-software-south-africa': {
      slug: 'best-accounting-software-uk',
      title: 'How to Choose Accounting Software for Your UK Small Business',
      meta_title: 'Best Accounting Software for UK Small Business 2026',
      excerpt: 'A practical guide to choosing between Sage, Xero and QuickBooks Online for a UK business, covering Making Tax Digital, pricing and everyday ease of use.',
    },
    'sage-vs-xero-vs-quickbooks-south-africa': {
      slug: 'sage-vs-xero-vs-quickbooks-uk',
      title: 'Sage vs Xero vs QuickBooks: Which Should Your UK Business Choose?',
      meta_title: 'Sage vs Xero vs QuickBooks for the UK (2026 Comparison)',
      excerpt: 'Sage, Xero and QuickBooks compared for UK businesses: pricing, Making Tax Digital compliance, features and our verdict.',
    },
    'payroll-compliance-south-africa-checklist': {
      slug: 'payroll-compliance-uk-checklist',
      title: 'UK Payroll Compliance: A Practical Checklist for Employers',
      meta_title: 'UK Payroll Compliance Checklist 2026',
      excerpt: 'A practical payroll compliance checklist for UK employers, covering RTI submissions, PAYE, pension auto enrolment and year end.',
    },
  };
  const { data: arts, error: artErr } = await supabase
    .from('articles').select('id, slug, title, excerpt, content, meta_title, meta_description');
  if (artErr) throw new Error(artErr.message);
  let artUpdated = 0;
  for (const a of arts) {
    const update = {};
    const remap = ARTICLE_REMAP[a.slug];
    if (remap) {
      update.slug = remap.slug;
      update.title = remap.title;
      update.meta_title = remap.meta_title;
      update.excerpt = remap.excerpt;
    }
    const c = scrubSA(a.content);
    const t = scrubSA(a.title);
    const ex = scrubSA(a.excerpt);
    const mt = scrubSA(a.meta_title);
    const md = scrubSA(a.meta_description);
    if (c !== a.content) update.content = c;
    if (!remap && t !== a.title) update.title = t;
    if (!remap && ex !== a.excerpt) update.excerpt = ex;
    if (!remap && mt !== a.meta_title) update.meta_title = mt;
    if (md !== a.meta_description) update.meta_description = md;
    if (Object.keys(update).length) {
      const { error } = await supabase.from('articles').update(update).eq('id', a.id);
      if (error) console.log(`  article ${a.slug}: ${error.message}`);
      else artUpdated++;
    }
  }
  console.log(`4. articles: updated ${artUpdated} (including reslug of SA articles).`);

  // ---- 5. comparisons: scrub verdict copy ---------------------------------
  const { data: comps, error: cErr } = await supabase
    .from('comparisons').select('id, custom_verdict, meta_title, meta_description');
  if (cErr) throw new Error(cErr.message);
  let compUpdated = 0;
  for (const c of comps) {
    const update = {};
    const v = scrubSA(c.custom_verdict);
    const mt = scrubSA(c.meta_title);
    const md = scrubSA(c.meta_description);
    if (v !== c.custom_verdict) update.custom_verdict = v;
    if (mt !== c.meta_title) update.meta_title = mt;
    if (md !== c.meta_description) update.meta_description = md;
    if (Object.keys(update).length) {
      const { error } = await supabase.from('comparisons').update(update).eq('id', c.id);
      if (error) console.log(`  comparison ${c.id}: ${error.message}`);
      else compUpdated++;
    }
  }
  console.log(`5. comparisons: scrubbed ${compUpdated}.`);

  // ---- final report --------------------------------------------------------
  const { data: cur } = await supabase.from('software').select('slug, price_currency, starting_price');
  const byCur = {};
  for (const x of cur) byCur[x.price_currency] = (byCur[x.price_currency] || 0) + 1;
  console.log('\nCurrency distribution now:', byCur);
  const { data: rc } = await supabase.from('reviews').select('reviewer_country');
  const counts = {};
  for (const r of rc) counts[r.reviewer_country] = (counts[r.reviewer_country] || 0) + 1;
  console.log('Reviewer country distribution now:', Object.entries(counts).sort((a, b) => b[1] - a[1]));
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
