// ============================================================================
// Loads the 300 generated QuickBooks Online reviews into Supabase.
//
// Uses the service-role key (bypasses RLS) to delete existing reviews for the
// target software and bulk-insert fresh ones. Reads credentials from .env.local.
//
//   node supabase/load_quickbooks_reviews.js
// ============================================================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { buildReviews, TARGET_SLUG } = require('./generate_quickbooks_reviews.js');

// -- Minimal .env.local parser ------------------------------------------------
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const raw = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function main() {
  const env = loadEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Resolve the software id.
  const { data: sw, error: swErr } = await supabase
    .from('software')
    .select('id, name')
    .eq('slug', TARGET_SLUG)
    .single();
  if (swErr || !sw) {
    throw new Error(`Could not find software with slug '${TARGET_SLUG}': ${swErr && swErr.message}`);
  }
  console.log(`Target: ${sw.name} (${sw.id})`);

  // 2. Remove existing reviews for a clean reload.
  const { error: delErr, count: delCount } = await supabase
    .from('reviews')
    .delete({ count: 'exact' })
    .eq('software_id', sw.id);
  if (delErr) throw new Error(`Delete failed: ${delErr.message}`);
  console.log(`Deleted ${delCount ?? 0} existing reviews.`);

  // 3. Build rows.
  const reviews = buildReviews();
  const rows = reviews.map(r => ({
    software_id: sw.id,
    reviewer_name: r.reviewer_name,
    reviewer_job_title: r.reviewer_job_title,
    reviewer_company: r.reviewer_company,
    reviewer_industry: r.reviewer_industry,
    reviewer_company_size: r.reviewer_company_size,
    reviewer_country: r.reviewer_country,
    verified_linkedin: r.verified_linkedin,
    verified_badge: r.verified_badge,
    used_for_duration: r.used_for_duration,
    overall_rating: r.overall_rating,
    ease_of_use: r.ease_of_use,
    value_for_money: r.value_for_money,
    customer_service: r.customer_service,
    functionality: r.functionality,
    review_title: r.review_title,
    summary: r.summary,
    pros: r.pros,
    cons: r.cons,
    vendor_response: r.vendor_response,
    vendor_response_date: r.vendor_response_date,
    review_date: r.review_date,
    helpful_count: r.helpful_count,
    status: 'published',
  }));

  // 4. Insert in chunks.
  const CHUNK = 100;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK);
    const { error: insErr } = await supabase.from('reviews').insert(batch);
    if (insErr) throw new Error(`Insert failed at row ${i}: ${insErr.message}`);
    inserted += batch.length;
    console.log(`Inserted ${inserted}/${rows.length}...`);
  }

  // 5. Read back the aggregate the DB trigger recalculated.
  const { data: agg } = await supabase
    .from('software')
    .select('overall_rating, review_count')
    .eq('id', sw.id)
    .single();
  console.log('Done. Software aggregate now:', agg);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
