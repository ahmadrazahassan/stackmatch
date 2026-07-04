// ============================================================================
// Replaces the last CloudPayUK-era values in site_settings with Stack Match
// branding: site_name, contact_email (now on our own domain) and footer_text.
// Idempotent: safe to re-run.
//
//   node supabase/update_site_branding.js
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

const SETTINGS = {
  site_name: 'Stack Match',
  contact_email: 'hello@stackmatch.uk',
  footer_text:
    'Stack Match helps UK businesses find the right software through honest reviews and expert comparisons.',
  footer_tagline:
    'Independent reviews and side-by-side comparisons of the UK’s best business software.',
  years_active: '4',
};

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

  for (const [key, value] of Object.entries(SETTINGS)) {
    const { data: existing, error: readErr } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();
    if (readErr) throw readErr;

    if (existing && JSON.stringify(existing.value) === JSON.stringify(value)) {
      console.log(`${key}: already correct, skipped`);
      continue;
    }

    const { error } = await supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' });
    if (error) throw error;
    console.log(`${key}: ${existing ? JSON.stringify(existing.value) : '(missing)'} -> ${JSON.stringify(value)}`);
  }

  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
