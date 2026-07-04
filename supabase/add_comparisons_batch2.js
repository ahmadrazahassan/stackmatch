// ============================================================================
// Batch 2 of editorial comparisons:
//   1. Rewrites the legacy Sage Accounting vs Xero verdict (was written for
//      the South African market) to match the UK focused Sage Accounting
//      profile now live on the site.
//   2. Adds 5 new comparisons with detailed multi paragraph verdicts.
//
// Safe to re-run: pairs are matched in either direction and updated in place.
//
//   node supabase/add_comparisons_batch2.js
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
  // ------------------------------------------------------------------ rewrite
  {
    a: 'sage-accounting',
    b: 'xero',
    verdict: `These two meet more often than any other pair on UK shortlists and the gap between them is smaller than either marketing department admits. Both are HMRC recognised for Making Tax Digital, both reconcile bank feeds well, both are priced for small businesses. The differences that actually decide the purchase sit one level down.

Sage Accounting wins the bundle. Every plan now includes payroll and Sage Copilot, so a business with a handful of staff gets its books, its pay run and its VAT in one subscription from £20 a month, and the current 90% off for 6 months offer makes trying it nearly free. CIS handling on the Standard plan is properly built in, which matters to the enormous number of UK trades businesses this product courts. Xero wins the experience and the ecosystem. Unlimited users on every plan removes the seat counting conversation entirely, the reconciliation flow remains the most pleasant in the category, and the app marketplace of over a thousand integrations means whatever software your business already runs probably connects. Its payroll, however, is a paid add on, and that difference compounds monthly.

Choose Sage Accounting if you employ people and want payroll, VAT and CIS handled inside one bill, or if your accountant is one of the thousands of UK practices built on Sage. Choose Xero if several people need to live in the books at once, if your business leans on connected apps, or if day to day usability is the thing your team will actually notice. Price the pair honestly with payroll included and Sage usually lands cheaper, which is the tiebreak most small businesses should respect.`,
    meta_title: 'Sage Accounting vs Xero 2026: The UK Small Business Decision',
    meta_description:
      'Sage Accounting vs Xero compared for UK businesses: MTD compliance, bundled payroll and CIS against unlimited users and the biggest app marketplace. A detailed verdict on which to pick.',
  },

  // ---------------------------------------------------------------- new pairs
  {
    a: 'xero',
    b: 'quickbooks-online',
    verdict: `This is the heavyweight title fight of small business accounting, and after years of watching both evolve, the honest summary is that they have converged on features and diverged on philosophy. Almost anything one does, the other does somewhere in its plan structure. What differs is how each behaves as your business and team grow.

Xero's defining decision is unlimited users on every plan. A founder, a bookkeeper, an accountant and an operations manager can all work in the file with no licence arithmetic, which is why accounting practices adore it and why collaborative businesses drift toward it. Its reconciliation remains best in class and its app marketplace is the largest in the category. QuickBooks Online counters with the strongest reporting engine at this price point, receipt capture that genuinely works, project profitability tracking that service businesses actually use, and the advantage of near universal accountant familiarity. Its weakness is the ladder: user limits and feature gates mean the plan you budgeted for is rarely the plan you end up on, and the renewal pricing after intro offers draws more complaints than the software itself.

Choose Xero if several people touch the books, if you value the connected app ecosystem, or if your accountant runs a Xero practice. Choose QuickBooks Online if reporting depth and project level profit visibility drive your decisions, and you are comfortable paying up a tier as you grow. Neither choice is wrong, one of them is simply wrong for how your particular business works, and the free trials exist to reveal which.`,
    meta_title: 'Xero vs QuickBooks Online 2026: The Definitive Small Business Verdict',
    meta_description:
      'Xero vs QuickBooks Online compared in depth: unlimited users and app ecosystem against reporting power and accountant familiarity. A detailed verdict on which fits your business.',
  },
  {
    a: 'sage-intacct',
    b: 'xero',
    verdict: `Nobody shortlists these two on the same day, and that is precisely why this comparison matters: it is really the question of when a growing business should leave Xero, asked out loud. Xero carried you from startup through your first few million of revenue. The question is whether it can carry the next stage.

The signals that you are outgrowing Xero are consistent across the businesses we track. Consolidation across two or more entities happens in spreadsheets after month end. Deferred revenue schedules live in a workbook only one person understands. The board asks for departmental or project reporting that requires exports and pivot tables. Approval controls are policy documents rather than system rules. Each of these is exactly what Sage Intacct was built for: a dimensional general ledger that slices reporting any way the board asks, native multi entity consolidation with intercompany eliminations, revenue recognition that satisfies IFRS 15 without spreadsheets, and audit grade permissions and workflows. The cost of that capability is real, quote based pricing that lands in five figures annually, a partner led implementation measured in months, and a system that expects a finance team rather than a founder with a spare hour.

Stay on Xero while it still fits, nothing at Intacct's price will reconcile a single entity's bank feed better than Xero already does. Move when the spreadsheet layer around Xero starts consuming analyst days every month, because at that point you are already paying mid market money in salaries, just not getting mid market software for it. Time the move for a financial year end, budget implementation properly, and the businesses that do this rarely look back.`,
    meta_title: 'Sage Intacct vs Xero 2026: When Has Your Business Outgrown Xero?',
    meta_description:
      'Sage Intacct vs Xero compared: the signals you have outgrown small business accounting, what dimensional reporting and consolidation cost, and exactly when the move pays for itself.',
  },
  {
    a: 'sage-accounting',
    b: 'odoo',
    verdict: `This pairing looks odd until you meet the businesses genuinely torn between them: companies that need accounting today but can see inventory, a webshop or a CRM on the horizon, and want to know whether to buy a focused tool or a platform. The products answer opposite questions, which makes the verdict unusually clean.

Sage Accounting is the focused answer. It does UK books exceptionally well, MTD VAT and income tax submissions to HMRC, bank feeds, bundled payroll, CIS for the trades, all from £20 a month with essentially no implementation. You can be invoicing the afternoon you sign up, and your accountant already knows it. What it will never do is run your warehouse, your website or your sales pipeline. Odoo is the platform answer. Its accounting app is competent rather than exceptional, but it shares a database with genuinely capable inventory, manufacturing, eCommerce, point of sale and CRM modules, so a sale on your website moves stock, raises the accounting entries and updates the customer record without anyone retyping. The trade offs are equally structural: UK payroll needs third party handling, localisation demands more setup care, and Odoo rewards businesses that invest in proper implementation, usually with a partner, in a way a simple bookkeeping tool never asks for.

Choose Sage Accounting if your need is books, payroll and compliance done impeccably with zero project risk. Choose Odoo if operations software is the real purchase and accounting is one module of it, and budget implementation time honestly. The expensive mistake is buying Odoo for bookkeeping alone or stretching Sage with a web of connectors into an ERP it never claimed to be.`,
    meta_title: 'Sage Accounting vs Odoo 2026: Focused Accounting or Business Platform?',
    meta_description:
      'Sage Accounting vs Odoo compared: best in class UK bookkeeping with bundled payroll against a modular ERP where accounting is one connected app. A detailed verdict on which to buy.',
  },
  {
    a: 'quickbooks-online',
    b: 'sage-50-accounts',
    verdict: `This comparison is really cloud versus desktop argued through its two most famous champions, and the argument has matured. Five years ago the honest answer was usually QuickBooks. Today it depends entirely on which of two kinds of business you run.

QuickBooks Online is the better product for the majority: service businesses, consultancies, agencies, retailers without serious stock, anyone whose accounting is invoices, expenses, bank reconciliation and reporting. It is cheaper, it needs no installation or IT, its mobile app is genuinely useful, and its reporting flexibility at the price is unmatched. Sage 50 Accounts exists for the minority with heavier requirements, and for them it is not a preference but a necessity: proper inventory with bills of materials and reorder management, sales and purchase order processing, project costing tied to the ledgers, multi company accounts with consolidated management reporting, and batch entry speed that experienced bookkeepers measure their productivity by. From £115 a month it is priced accordingly, and its desktop nature brings real costs, backups, updates and network performance are your problem in a way cloud software never is.

Choose QuickBooks Online unless you can name the specific Sage 50 capability your business cannot operate without. If you can name it, stock, orders, multi company, job costing, then choose Sage 50 and stop trying to force a lighter product to do heavy work through workarounds and add ons. The businesses that get this wrong in either direction pay for it monthly, in subscription fees one way and in staff hours the other.`,
    meta_title: 'QuickBooks Online vs Sage 50 Accounts 2026: Cloud Simplicity or Desktop Depth?',
    meta_description:
      'QuickBooks Online vs Sage 50 Accounts compared: cloud price and usability against desktop stock, orders and multi company power. A detailed verdict on which your business actually needs.',
  },
  {
    a: 'sage-people',
    b: 'payspace',
    verdict: `These two overlap just enough to appear on the same shortlists and differ enough that choosing wrongly hurts, because they approach the same multinational workforce from opposite ends. Sage People is HR first: a system of record for people, built on the Salesforce platform, with self service, performance, compensation and workforce analytics, treating payroll as something it feeds through connectors everywhere except the UK and US where it runs natively. PaySpace is payroll first: legislative payroll engines for over forty African countries kept current in house, with HR functionality layered on top, and it was acquired by Deel precisely because that payroll depth is so hard to replicate.

The geography of your headcount decides this. A business running operations across African markets, where in country statutory compliance is the hard problem, gets more from PaySpace than any global HR suite can offer, because localised gross to net calculation in Lagos, Nairobi and Johannesburg is the product. A business headquartered in the UK or US with a spread of international offices, where the hard problem is one employee record, consistent processes and board grade people analytics, is squarely Sage People territory, with payroll delegated to local providers through its connector.

Larger groups genuinely straddling both worlds sometimes run the pair together, Sage People as the HR system of record feeding PaySpace as the African payroll engine, and both vendors support that pattern. If you must pick one: count where your employees sit. Majority in Africa with compliance as the pain, PaySpace. Global spread with people data as the pain, Sage People. The overlap in their brochures is much larger than the overlap in what they are actually best at.`,
    meta_title: 'Sage People vs PaySpace 2026: Global HR or African Payroll Depth?',
    meta_description:
      'Sage People vs PaySpace compared: a Salesforce based global HR system of record against legislative payroll engines for 40+ African countries. A detailed verdict by workforce geography.',
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
      const { error } = await supabase.from('comparisons').insert({ software_a_id: aId, software_b_id: bId, ...fields });
      if (error) throw new Error(`Insert failed for ${c.a} vs ${c.b}: ${error.message}`);
      console.log(`INSERTED ${c.a} vs ${c.b}`);
    }
  }

  const { data: all } = await supabase
    .from('comparisons')
    .select('status, software_a:software_a_id(slug), software_b:software_b_id(slug)')
    .order('created_at', { ascending: false });
  console.log(`\nComparisons now in DB: ${all.length}`);
  for (const x of all) console.log(` - ${x.software_a.slug} vs ${x.software_b.slug} (${x.status})`);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
