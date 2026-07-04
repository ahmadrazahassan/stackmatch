// ============================================================================
// Fixes affiliate/vendor URLs so every "Visit Website" and pricing CTA lands
// on the vendor's real site instead of a seed-data placeholder.
//
//   1. Clears affiliate_url values still pointing at https://example.com/...
//      (12 seeded products). /api/track-click then falls back to the real
//      vendor_website, which was already correct for all of them.
//   2. Repoints the remaining South African regional pages (/za/) at the
//      UK equivalents to match the site's UK audience.
//
// Idempotent: safe to re-run.
//
//   node supabase/fix_vendor_urls.js
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

// slug → correct UK-market URLs (applied to both vendor_website and
// affiliate_url when affiliate_url mirrors the old vendor page).
const REGIONAL_FIXES = {
  'xero': 'https://www.xero.com/uk/',
  'quickbooks-online': 'https://quickbooks.intuit.com/uk/',
  'simplepay': 'https://www.simplepay.co.uk/',
  'payspace': 'https://payspace.com/',
};

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

  const { data: rows, error } = await supabase
    .from('software')
    .select('id, name, slug, vendor_website, affiliate_url')
    .order('name');
  if (error) throw error;

  let changed = 0;

  for (const s of rows) {
    const update = {};

    // 1. Placeholder affiliate links → clear so the real vendor site wins.
    if (s.affiliate_url && /^https?:\/\/(www\.)?example\.com\//i.test(s.affiliate_url)) {
      update.affiliate_url = null;
    }

    // 2. Regional corrections for the UK audience.
    const ukUrl = REGIONAL_FIXES[s.slug];
    if (ukUrl) {
      if (s.vendor_website !== ukUrl) update.vendor_website = ukUrl;
      // Keep affiliate_url mirrored only when it previously mirrored the
      // vendor page; a cleared or distinct value is left alone.
      if (s.affiliate_url && s.affiliate_url === s.vendor_website && update.affiliate_url === undefined) {
        update.affiliate_url = ukUrl;
      }
    }

    if (Object.keys(update).length === 0) continue;

    const { error: upErr } = await supabase.from('software').update(update).eq('id', s.id);
    if (upErr) throw upErr;
    changed++;

    for (const [col, val] of Object.entries(update)) {
      console.log(`${s.name} [${s.slug}]  ${col}: ${s[col] ?? 'NULL'} -> ${val ?? 'NULL'}`);
    }
  }

  console.log(`\nDone. ${changed} of ${rows.length} products updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
