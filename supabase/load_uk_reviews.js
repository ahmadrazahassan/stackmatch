// ============================================================================
// Loads generated UK reviews for the 12 migration_006 products into Supabase.
//   node supabase/load_uk_reviews.js
//
// For each product it deletes any existing reviews (so re-running is
// idempotent) and inserts a fresh batch. Aggregate ratings and review_count
// update automatically via the database trigger.
// ============================================================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { buildReviews, PRODUCTS } = require('./generate_uk_reviews.js');

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

async function loadProduct(supabase, product) {
  const { data: sw, error: swErr } = await supabase
    .from('software').select('id, name').eq('slug', product.slug).single();
  if (swErr || !sw) {
    console.warn(`SKIP ${product.slug}: not found in database (${swErr && swErr.message}). Run migration_006 first.`);
    return;
  }

  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', sw.id);
  if (delErr) throw new Error(`Delete failed for ${product.slug}: ${delErr.message}`);

  const rows = buildReviews(product).map(r => ({ software_id: sw.id, status: 'published', ...r }));

  const CHUNK = 100;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from('reviews').insert(batch);
    if (error) throw new Error(`Insert failed for ${product.slug} at row ${i}: ${error.message}`);
    inserted += batch.length;
  }

  const { data: agg } = await supabase
    .from('software')
    .select('overall_rating, review_count')
    .eq('id', sw.id).single();
  console.log(`${sw.name.padEnd(34)} deleted ${String(delCount ?? 0).padStart(3)}, inserted ${String(inserted).padStart(3)}  ->  avg ${agg && agg.overall_rating}, count ${agg && agg.review_count}`);
}

async function main() {
  const env = loadEnv();
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } });

  let total = 0;
  for (const product of PRODUCTS) {
    const before = product.count;
    await loadProduct(supabase, product);
    total += before;
  }
  console.log(`\nDone. Up to ${total} reviews generated across ${PRODUCTS.length} products.`);
}

main().catch(err => { console.error('ERROR:', err.message || err); process.exit(1); });
