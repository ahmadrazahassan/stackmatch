// ============================================================================
// Second pass UK scrub: catches remaining "rand" usages and cleans SA terms
// out of review text (the payroll/accounting reviews that were written for the
// SA market). Idempotent.
//
//   node supabase/uk_localisation_pass2.js
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

function scrub(text) {
  if (!text) return text;
  let t = text;
  const map = [
    [/South African Revenue Service \(SARS\)/g, 'HM Revenue and Customs (HMRC)'],
    [/South African Revenue Service/g, 'HM Revenue and Customs'],
    [/\bSARS\b/g, 'HMRC'],
    [/VAT201-ready/g, 'MTD-ready'],
    [/VAT201 returns/g, 'VAT returns'],
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
    [/South African small businesses/g, 'UK small businesses'],
    [/South African SMBs/g, 'UK SMBs'],
    [/South African businesses/g, 'UK businesses'],
    [/South African business/g, 'UK business'],
    [/South African employers/g, 'UK employers'],
    [/South African employer/g, 'UK employer'],
    [/South African/g, 'UK'],
    [/businesses in South Africa/g, 'businesses in the UK'],
    [/based in South Africa/g, 'based in the UK'],
    [/across South Africa/g, 'across the UK'],
    [/South Africa's/g, "the UK's"],
    [/in South Africa/g, 'in the UK'],
    [/South Africa/g, 'the United Kingdom'],
    // rand money references
    [/predictable rand pricing/g, 'predictable GBP pricing'],
    [/rand pricing/g, 'GBP pricing'],
    [/your rand cost/g, 'your monthly cost'],
    [/rand cost/g, 'monthly cost'],
    [/watching every rand/g, 'watching every pound'],
    [/every rand/g, 'every pound'],
    [/spending a rand/g, 'spending a pound'],
    [/a single rand/g, 'a single pound'],
    [/rand[- ]based/g, 'pound based'],
    [/priced in rand/g, 'priced in pounds'],
    [/pricing in rand/g, 'pricing in pounds'],
    [/in rand\b/g, 'in pounds'],
    [/the rand\b/g, 'the pound'],
    [/\bZAR\b/g, 'GBP'],
    [/\brand\b/g, 'pound'],
  ];
  for (const [re, to] of map) t = t.replace(re, to);
  return t;
}

async function scrubTable(supabase, table, fields, extraSelect = '') {
  const sel = ['id', ...fields, ...(extraSelect ? [extraSelect] : [])].join(', ');
  let updated = 0, from = 0;
  const PAGE = 1000;
  while (true) {
    const { data, error } = await supabase.from(table).select(sel).range(from, from + PAGE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const row of data) {
      const upd = {};
      for (const f of fields) {
        const scrubbed = scrub(row[f]);
        if (scrubbed !== row[f]) upd[f] = scrubbed;
      }
      if (Object.keys(upd).length) {
        const { error: uErr } = await supabase.from(table).update(upd).eq('id', row.id);
        if (uErr) throw new Error(`${table} update: ${uErr.message}`);
        updated++;
      }
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return updated;
}

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const sw = await scrubTable(supabase, 'software', ['description_full', 'description_short', 'tagline', 'meta_title', 'meta_description']);
  console.log(`software: scrubbed ${sw}`);
  const ar = await scrubTable(supabase, 'articles', ['content', 'title', 'excerpt', 'meta_title', 'meta_description']);
  console.log(`articles: scrubbed ${ar}`);
  const cp = await scrubTable(supabase, 'comparisons', ['custom_verdict', 'meta_title', 'meta_description']);
  console.log(`comparisons: scrubbed ${cp}`);
  const rv = await scrubTable(supabase, 'reviews', ['summary', 'pros', 'cons', 'review_title', 'vendor_response']);
  console.log(`reviews: scrubbed ${rv}`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
