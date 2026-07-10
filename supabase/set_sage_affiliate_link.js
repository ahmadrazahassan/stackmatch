// ============================================================================
// Points every Sage product's affiliate_url at the Sage UK affiliate/referral
// link, so all "Visit Website" / pricing CTAs and /api/track-click resolve to
// the tracked link instead of the plain sage.com marketing pages.
//
// Referral link: https://sageuklimited.sjv.io/c/7457480/2240326/29089
//
// Targets every software row with vendor_name = 'Sage' (case-insensitive),
// plus any row whose slug/name looks like a Sage product, as a safety net.
//
// Idempotent: safe to re-run.
//
//   node supabase/set_sage_affiliate_link.js
// ============================================================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const AFFILIATE_LINK = 'https://sageuklimited.sjv.io/c/7457480/2240326/29089';

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

function isSage(s) {
  return /sage/i.test(s.vendor_name || '') || /sage/i.test(s.slug || '') || /sage/i.test(s.name || '');
}

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: rows, error } = await supabase
    .from('software')
    .select('id, name, slug, vendor_name, affiliate_url')
    .order('name');
  if (error) throw error;

  const sage = rows.filter(isSage);
  if (sage.length === 0) {
    console.log('No Sage products found. Nothing to do.');
    return;
  }

  let changed = 0, already = 0;
  for (const s of sage) {
    if (s.affiliate_url === AFFILIATE_LINK) {
      already++;
      console.log(`= ${s.name} [${s.slug}] already set`);
      continue;
    }
    const { error: upErr } = await supabase
      .from('software')
      .update({ affiliate_url: AFFILIATE_LINK })
      .eq('id', s.id);
    if (upErr) throw upErr;
    changed++;
    console.log(`~ ${s.name} [${s.slug}]  ${s.affiliate_url ?? 'NULL'} -> ${AFFILIATE_LINK}`);
  }

  console.log(`\nDone. ${sage.length} Sage products; ${changed} updated, ${already} already correct.`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
