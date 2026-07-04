// ============================================================================
// Adds 5 editorial comparisons with analyst grade verdicts. Safe to re-run:
// if a pair already exists (in either direction) the verdict and meta fields
// are updated instead of duplicated.
//
//   node supabase/add_comparisons.js
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

const COMPARISONS = [
  {
    a: 'sage-accounting',
    b: 'quickbooks-online',
    verdict:
      'This is the closest fight in small business accounting and the honest answer depends on what your week looks like. Sage Accounting wins on the total package for a UK style compliance workload: VAT submissions are native rather than bolted on, payroll for a small team is bundled into every plan instead of sold as a second subscription, and the £20 entry price covers a genuinely usable product rather than a teaser tier. QuickBooks Online wins on reporting and familiarity. Its report builder slices profit, cash flow and project profitability in ways Sage cannot match without exports, its receipt capture is the most polished in the category, and there is barely an accountant alive who has not used it, which shortens every handover. Watch the tier structure though, the features you actually want on QuickBooks often live one plan higher than the price you first saw. Choose Sage Accounting if bundled payroll and tax compliance with the least friction matter most. Choose QuickBooks Online if reporting depth and working with an accountant who already lives in it outweigh the extra subscription arithmetic.',
    meta_title: 'Sage Accounting vs QuickBooks Online 2026: Which Should Your Business Pick?',
    meta_description:
      'Sage Accounting vs QuickBooks Online compared on pricing, bundled payroll, VAT compliance, reporting depth and support, with a clear verdict on which suits your business.',
  },
  {
    a: 'sage-accounting',
    b: 'sage-50-accounts',
    verdict:
      'The most common question Sage customers ask is which side of this fence to sit on, and the deciding factor is depth, not brand. Sage Accounting is the modern cloud product: £20 to £59 a month, payroll included, bank feeds, MTD submissions and an interface your least technical employee can learn in an afternoon, accessible from anywhere with nothing to install. Sage 50 Accounts costs from £115 a month and earns that premium only if you use what it carries: real stock control with reorder levels and bills of materials, sales and purchase order processing, project costing, multi company accounts with consolidated reporting, and batch entry speed that experienced bookkeepers refuse to give up. If you read that list and shrugged, you are a Sage Accounting customer and the extra spend buys you nothing but complexity. If you read it nodding, no cloud product at this price replaces Sage 50 yet, and businesses that migrate down on cost grounds usually meet their stock and order requirements again within the year. Choose by feature necessity, not by which product Sage markets harder.',
    meta_title: 'Sage Accounting vs Sage 50 Accounts 2026: Cloud or Desktop?',
    meta_description:
      'Sage Accounting vs Sage 50 Accounts compared: pricing from £20 vs £115 a month, stock and order depth, multi company, payroll and who should choose which, with a clear verdict.',
  },
  {
    a: 'sage-50-accounts',
    b: 'xero',
    verdict:
      'These two products embody opposite philosophies and the choice is rarely close once you frame it honestly. Xero is the accessibility play: unlimited users on every plan, the largest app marketplace in the category, bank reconciliation pleasant enough that people stop dreading it, and a browser interface that needs no training budget. Sage 50 Accounts is the depth play: proper inventory with bills of materials, sales and purchase order processing, project costing, multi company consolidation and a report designer that will reproduce any board pack, all installed on your own machine with keyboard speed cloud software has never matched. The costs reflect the positioning, Xero undercuts Sage 50 substantially at every tier, and Sage 50 answers with functionality Xero simply does not have at any price. Choose Xero if your operation runs on invoicing, reconciliation and collaboration between several people including your accountant. Choose Sage 50 if stock, orders or group structures are load bearing parts of your business, and treat anyone who recommends it without asking about those three things with suspicion.',
    meta_title: 'Sage 50 Accounts vs Xero 2026: Depth or Accessibility?',
    meta_description:
      'Sage 50 Accounts vs Xero compared: desktop power with stock, orders and multi company against cloud simplicity with unlimited users and a huge app store. Our verdict on which fits.',
  },
  {
    a: 'sage-intacct',
    b: 'quickbooks-online',
    verdict:
      'This is not really a head to head, it is a question about what stage your finance function has reached, and buying the wrong stage is expensive in both directions. QuickBooks Online is the right answer for a single entity business with a small finance team: it is a fraction of the cost, implementation is measured in days, and its reporting covers everything a straightforward operation needs. Sage Intacct exists for the problems QuickBooks cannot solve: multiple legal entities that need consolidating with intercompany eliminations, dimensional reporting across departments, locations, projects or funds, revenue recognition under IFRS 15 and ASC 606, and audit grade controls with approval workflows. The tell that you have outgrown QuickBooks is the spreadsheet layer, when consolidation, deferrals and board reporting all happen in Excel after the books close, you are running a mid market finance function on small business software. Expect Intacct to cost five figures annually plus a partner led implementation, and expect that to be cheaper than the analyst hours the spreadsheet layer quietly consumes. Choose QuickBooks until the spreadsheets appear. Choose Intacct once they multiply.',
    meta_title: 'Sage Intacct vs QuickBooks Online 2026: When to Move Up Market',
    meta_description:
      'Sage Intacct vs QuickBooks Online compared: multi entity consolidation, dimensional reporting and revenue recognition against small business simplicity and price. Our verdict on when to switch.',
  },
  {
    a: 'sage-people',
    b: 'bamboohr',
    verdict:
      'Both are excellent HR systems that would each be a disaster bought for the other one’s customer. BambooHR is the product people actually enjoy: onboarding, self service, time off and performance in an interface that needs no explaining, priced per employee at a level a 60 person single country company can defend, and deployable in weeks without a consultant. Sage People is built for a different shape of problem, the 200 to 3000 employee organisation spread across several countries that needs one employee record with localised policies per territory, workforce analytics on the Salesforce platform, compensation cycles in multiple currencies and clean feeds into payrolls everywhere it operates. That capability costs real money, arrives through a partner led implementation and demands a trained administrator, which is exactly why smaller companies that buy it tend to regret it. The decision rule is blunt: count your countries and your headcount. One country and under a couple of hundred staff, BambooHR wins on every axis that will matter to you. Multiple countries, multiple entities or serious people analytics requirements, Sage People is playing a game BambooHR does not enter.',
    meta_title: 'Sage People vs BambooHR 2026: Global Depth or Everyday Ease?',
    meta_description:
      'Sage People vs BambooHR compared: global multi country HR on the Salesforce platform against the friendliest SMB HRIS on the market. Our verdict on which fits your headcount.',
  },
];

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: sw, error: swErr } = await supabase.from('software').select('id, slug');
  if (swErr) throw new Error(swErr.message);
  const idBySlug = Object.fromEntries(sw.map(s => [s.slug, s.id]));

  for (const c of COMPARISONS) {
    const aId = idBySlug[c.a];
    const bId = idBySlug[c.b];
    if (!aId || !bId) { console.log(`SKIP ${c.a} vs ${c.b}: missing product`); continue; }

    // Look for the pair in either direction
    const { data: existing } = await supabase
      .from('comparisons')
      .select('id')
      .or(`and(software_a_id.eq.${aId},software_b_id.eq.${bId}),and(software_a_id.eq.${bId},software_b_id.eq.${aId})`)
      .maybeSingle();

    const fields = {
      custom_verdict: c.verdict,
      meta_title: c.meta_title,
      meta_description: c.meta_description,
      status: 'published',
    };

    if (existing) {
      const { error } = await supabase.from('comparisons').update(fields).eq('id', existing.id);
      if (error) throw new Error(`Update failed for ${c.a} vs ${c.b}: ${error.message}`);
      console.log(`UPDATED ${c.a} vs ${c.b}`);
    } else {
      const { error } = await supabase.from('comparisons').insert({
        software_a_id: aId,
        software_b_id: bId,
        ...fields,
      });
      if (error) throw new Error(`Insert failed for ${c.a} vs ${c.b}: ${error.message}`);
      console.log(`INSERTED ${c.a} vs ${c.b}`);
    }
  }

  const { data: all } = await supabase
    .from('comparisons')
    .select('status, software_a:software_a_id(slug), software_b:software_b_id(slug)');
  console.log(`\nComparisons now in DB: ${all.length}`);
  for (const x of all) console.log(` - ${x.software_a.slug} vs ${x.software_b.slug} (${x.status})`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
