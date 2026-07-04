// ============================================================================
// Loads PaySpace (135) and SimplePay (97) reviews into Supabase.
//   node supabase/load_payroll_reviews.js
// ============================================================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { buildReviews, PAYSPACE, SIMPLEPAY } = require('./generate_payroll_reviews.js');

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
  if (swErr || !sw) throw new Error(`No software for slug '${product.slug}': ${swErr && swErr.message}`);

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
    .from('software').select('overall_rating, review_count').eq('id', sw.id).single();
  console.log(`${sw.name}: deleted ${delCount ?? 0}, inserted ${inserted}. Aggregate now`, agg);
}

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } });
  for (const product of [PAYSPACE, SIMPLEPAY]) {
    await loadProduct(supabase, product);
  }
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
