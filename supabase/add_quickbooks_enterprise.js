// ============================================================================
// Adds QuickBooks Desktop Enterprise as a new product in the Accounting
// category with full editorial content and a ~130 review set (anchors +
// seeded generator). Safe to re-run: updates the row and replaces its own
// reviews only. Does not touch any other product.
//
//   node supabase/add_quickbooks_enterprise.js
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

const SOFTWARE = {
  name: 'QuickBooks Enterprise',
  slug: 'quickbooks-enterprise',
  tagline: 'The most powerful desktop QuickBooks, built for larger businesses with serious inventory and reporting needs',
  description_short:
    'The top tier desktop QuickBooks product for larger and more complex businesses, with advanced inventory, up to forty users, industry specific editions, deep reporting and role based security. Priced per year.',
  description_full: `<h2>What is QuickBooks Enterprise?</h2><p>QuickBooks Enterprise is the most powerful product in the QuickBooks family, a desktop based accounting and light business management system built for companies that have outgrown QuickBooks Online and the standard desktop editions but are not ready for, or do not need, a full mid market ERP. It is the product Intuit points larger, more complex businesses toward, particularly those in manufacturing, wholesale, distribution, construction and retail whose inventory and reporting needs go well beyond what cloud small business accounting can handle. With support for a large number of simultaneous users and the ability to hold enormous lists of customers, vendors and inventory items, it sits at the top of the QuickBooks range for a reason.</p><h2>Advanced inventory, the headline reason businesses choose it</h2><p>The single biggest draw is inventory. Enterprise, particularly with its Advanced Inventory capability, handles the kind of stock complexity that lighter products simply cannot, tracking inventory across multiple warehouses, using bin location tracking so staff know exactly where an item sits, barcode scanning to speed up picking and receiving, and serial or lot number tracking for businesses that need to trace individual units. For a wholesaler, distributor or manufacturer, this depth is not a nice extra, it is the specific capability that keeps them on Enterprise rather than forcing an expensive move to a dedicated system.</p><h2>Scale, users and industry specific editions</h2><p>Enterprise scales far beyond the standard QuickBooks products, supporting up to forty simultaneous users with granular, role based permissions so you can control precisely what each person can see and do across a larger team. It also ships in industry specific editions, contractor, manufacturing and wholesale, nonprofit, retail, professional services, each tuned with reports, terminology and workflows built for that sector rather than a generic template. For a business that has always felt general accounting software did not quite speak its language, an edition built for its industry is a genuine advantage.</p><h2>Reporting and analysis with real depth</h2><p>The reporting in Enterprise goes well beyond the standard QuickBooks pack, with advanced reporting tools, more than a hundred and fifty built in reports across the industry editions, and the ability to build custom reports tuned to how the business actually runs. Combined with the capacity to hold far more historical data than the online products, this gives a larger finance team the depth of analysis they need for genuine management reporting rather than constant exports to a spreadsheet. Job costing, class and location tracking and detailed profitability analysis are all part of the picture.</p><h2>Desktop foundation with cloud access options</h2><p>Enterprise is a desktop product at heart, which is precisely why it delivers the speed and depth it does, but Intuit offers hosting options that put it in the cloud for remote access, giving businesses the choice between running it on their own network or accessing it from anywhere. This flexibility matters for a larger business with multiple sites or remote finance staff who need the depth of Enterprise without being tied to a single office machine.</p><h2>What it costs</h2><p>QuickBooks Enterprise is sold as an annual subscription rather than a low monthly fee, priced by edition and by the number of users, with the more advanced tiers and the Advanced Inventory and hosting options adding to the cost. It sits well above the online products in price, reflecting its far greater capability and capacity, and for a larger business the honest comparison is not against cheap cloud accounting but against the mid market ERP systems it competes with, where Enterprise frequently comes out considerably cheaper while covering the specific needs, especially inventory, that matter most. Businesses should price the specific edition, user count and add ons they need rather than anchoring on a base figure.</p><h2>Where it falls short</h2><p>Enterprise is powerful but it is not a full ERP, and businesses with genuinely complex multi entity consolidation, sophisticated manufacturing resource planning or advanced financial requirements will eventually find its ceiling. Being desktop based, it asks more of a business around installation, updates and, unless hosted, backups and remote access than a pure cloud product does. The interface, while continually maintained, is recognisably a professional desktop application rather than a modern web app, and there is a genuine learning curve, this is a serious tool for people who run a serious finance and operations function. The annual cost is significant, and businesses that do not genuinely use the inventory and scale features can find themselves paying for capability they do not need.</p><h2>Who should choose it</h2><p>QuickBooks Enterprise is the right choice for a larger small or mid sized business, particularly in wholesale, distribution, manufacturing, construction or retail, that needs advanced inventory across multiple locations, wants more users and deeper reporting than the online products offer, and values an industry specific edition tuned to how it actually works. It is especially strong as a step up for a business that has outgrown standard QuickBooks but wants to stay in a familiar ecosystem rather than take on a full ERP implementation. Businesses with true multi entity or advanced manufacturing planning needs should evaluate a dedicated ERP, and smaller or simpler businesses are far better served by QuickBooks Online.</p>`,

  starting_price: 1922,
  price_currency: 'USD',
  billing_period: 'year',
  free_trial: true,
  free_version: false,

  pricing_plans: [
    {
      name: 'Gold',
      price: 1922,
      currency: 'USD',
      billing: 'year',
      features: [
        'Priced per year, scales by users',
        'Core Enterprise accounting',
        'Up to 40 users',
        'Advanced reporting',
        'Role based security',
        'Industry specific edition',
        'Enhanced Payroll included',
        'Priority Circle support',
      ],
    },
    {
      name: 'Platinum',
      price: 2363,
      currency: 'USD',
      billing: 'year',
      features: [
        'Everything in Gold',
        'Advanced Inventory',
        'Multiple warehouse tracking',
        'Bin location and barcode scanning',
        'Serial and lot number tracking',
        'Advanced Pricing',
        'Bill and PO workflow approvals',
        'Landed cost tracking',
      ],
    },
    {
      name: 'Diamond',
      price: 4668,
      currency: 'USD',
      billing: 'year',
      features: [
        'Everything in Platinum',
        'QuickBooks Time Elite included',
        'Assisted Payroll included',
        'Salesforce CRM connector option',
        'Highest capacity and support',
        'Cloud hosting option',
        'Dedicated customer success',
        'Priced for larger operations',
      ],
    },
  ],

  features: [
    'Advanced inventory management',
    'Multiple warehouse tracking',
    'Bin location tracking',
    'Barcode scanning',
    'Serial and lot number tracking',
    'Up to 40 simultaneous users',
    'Role based user permissions',
    'Industry specific editions',
    'Advanced reporting',
    '150+ built in reports',
    'Custom report building',
    'Job costing',
    'Class and location tracking',
    'Advanced Pricing rules',
    'Bill and purchase order approvals',
    'Landed cost tracking',
    'Batch invoicing and transactions',
    'Cloud hosting option',
    'Audit trail',
    'Payroll ready',
  ],
  top_features: ['Advanced inventory management', 'Up to 40 users with role based security', 'Industry specific editions'],
  integrations: [
    'Salesforce',
    'Shopify',
    'Bill',
    'Expensify',
    'Amazon',
    'Square',
    'Zapier',
    'Microsoft 365',
  ],

  affiliate_url: 'https://quickbooks.intuit.com/desktop/enterprise/',
  vendor_website: 'https://quickbooks.intuit.com/desktop/enterprise/',
  vendor_name: 'Intuit',
  founded_year: 1983,
  support_types: ['Phone', 'Email', 'Live Chat', 'Knowledge Base', 'Community Forum', 'Webinars', '24/7 (Live rep)'],
  countries_available: ['United States', 'Canada'],
  languages: ['English'],

  meta_title: 'QuickBooks Enterprise Review 2026: Pricing, Features, Pros & Cons',
  meta_description:
    'Independent QuickBooks Enterprise review: advanced inventory, up to 40 users, industry editions, deep reporting, annual pricing, real user pros and cons, and the best alternatives.',
  status: 'published',
  featured: false,
  logo_url: '/Intuit_QuickBooks_idH8urRJxv_1.svg',
  brand_color: '#108000',
};

const ANCHOR_REVIEWS = [
  {
    reviewer_name: 'Raymond Kessler', reviewer_job_title: 'Operations Director', reviewer_company: 'Kessler Industrial Supply',
    reviewer_industry: 'Wholesale', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The advanced inventory is why we will never leave',
    summary: 'We distribute thousands of industrial parts across three warehouses, and Advanced Inventory with bin locations and barcode scanning is the specific reason we run Enterprise. We looked at moving to a full ERP twice and both times the cost and disruption sent us straight back, because Enterprise already does what we need.',
    pros: 'Multiple warehouse tracking with bin locations is exactly what a distributor needs. Barcode scanning sped up our picking dramatically. Serial number tracking for warranty items. Forty users covers our whole operation.',
    cons: 'It is a serious annual cost, and Advanced Inventory is a higher tier so budget for it. The desktop nature means our IT handles hosting and updates.',
    review_date: '2026-04-10', helpful_count: 26, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Linda Marchetti', reviewer_job_title: 'Controller', reviewer_company: 'Cornerstone Manufacturing',
    reviewer_industry: 'Manufacturing', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'The manufacturing edition speaks our language',
    summary: 'Generic accounting software always felt like it was built for someone else. The manufacturing and wholesale edition has the reports, terminology and workflows that actually match how we run, and it made a real difference to how quickly my team took to it.',
    pros: 'The industry edition is genuinely tailored, not just a relabel. Job costing ties material and labor to each job. Advanced reporting answers what ownership asks. Handles our transaction volume without slowing down.',
    cons: 'There is a real learning curve, this is a professional tool. Annual cost is significant. Not a full ERP, so complex production planning still lives partly outside it.',
    review_date: '2026-02-19', helpful_count: 21, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Gerald Ashworth', reviewer_job_title: 'CFO', reviewer_company: 'Ashworth Construction Group',
    reviewer_industry: 'Construction', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 3, functionality: 5,
    review_title: 'Job costing depth a construction business actually needs',
    summary: 'The contractor edition and its job costing are the reason we run Enterprise. Every project is costed properly against estimates, and the reporting lets me see profitability by job in a way our old system never could. It has paid for itself in better bidding alone.',
    pros: 'Contractor edition job costing is genuinely deep. Class and location tracking suits our multi site work. Role based security keeps project managers in their lane. Reporting we trust for the board.',
    cons: 'Support waits can be long at peak times. The desktop model means backups and hosting are our responsibility. Learning it took the team real time.',
    review_date: '2025-11-22', helpful_count: 18, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Patricia Nunley', reviewer_job_title: 'Finance Director', reviewer_company: 'Brightside Retail Group',
    reviewer_industry: 'Retail', reviewer_company_size: '201-500', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Handles our volume where the online product could not',
    summary: 'We moved up from QuickBooks Online when our transaction volume and inventory outgrew it, and Enterprise absorbed everything without complaint. The capacity difference is night and day, it simply does not strain where the online product started to.',
    pros: 'Enormous capacity for transactions and inventory items. Advanced Inventory across our stores. Far more users. The step up from Online kept us in a familiar ecosystem.',
    cons: 'The interface is a step back in polish from the online product, more powerful but less pretty. Learning curve was steep for staff used to the web version.',
    review_date: '2026-03-14', helpful_count: 15, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Douglas Pemberton', reviewer_job_title: 'IT and Finance Manager', reviewer_company: 'Halcyon Distribution',
    reviewer_industry: 'Logistics & Supply Chain', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'We host it in the cloud and get the best of both',
    summary: 'People assume desktop means tied to a desk, but with the hosting option our finance team accesses Enterprise from anywhere while keeping all the depth. It has been the right balance of power and flexibility for a distributor our size.',
    pros: 'Cloud hosting gives us remote access without losing the desktop depth. Advanced Inventory is excellent. Role based security across a bigger team. Reliable at our scale.',
    cons: 'Hosting is an added cost on top of the subscription. Updates and the hosting relationship need managing. It is a considered purchase, not a quick signup.',
    review_date: '2025-12-08', helpful_count: 13, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Susan Verhoeven', reviewer_job_title: 'Finance Manager', reviewer_company: 'Meridian Nonprofit Services',
    reviewer_industry: 'Non-Profit Organization Management', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 3, ease_of_use: 3, value_for_money: 3, customer_service: 4, functionality: 4,
    review_title: 'The nonprofit edition helps, but it is a lot of system',
    summary: 'The nonprofit edition has genuinely useful fund and donor reporting, but honestly Enterprise is more system than a nonprofit our size needs, and the annual cost is a real stretch for our budget. Capable, but we may have sized up too far.',
    pros: 'Nonprofit edition reporting suits our funder requirements. Handles our data comfortably. Support has been patient with our specific needs.',
    cons: 'More system than we truly need. Annual cost is a stretch for a nonprofit. The desktop learning curve was steep for our volunteers and part time staff.',
    review_date: '2026-01-17', helpful_count: 19, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
    vendor_response: 'Thank you Susan. For a nonprofit your size we can review whether the edition and tier match your needs, and discuss options if Enterprise is more than required. QuickBooks Customer Care',
    vendor_response_date: '2026-01-24',
  },
  {
    reviewer_name: 'Frank Delgado', reviewer_job_title: 'Owner', reviewer_company: 'Delgado Auto Parts',
    reviewer_industry: 'Automotive', reviewer_company_size: '11-50', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 5, customer_service: 4, functionality: 5,
    review_title: 'Cheaper than the ERP quotes and does what we need',
    summary: 'We got quotes for a proper ERP and nearly fell off our chairs. Enterprise does the inventory and reporting we actually need for a fraction of the cost, and I have never regretted staying with it rather than taking on a huge implementation project.',
    pros: 'Far cheaper than the ERP alternatives while covering our real needs. Advanced Inventory for thousands of parts. Barcode scanning at the counter. Reliable and well supported.',
    cons: 'Desktop means we manage backups and updates. There is a ceiling if we ever get much bigger, but we are nowhere near it yet.',
    review_date: '2026-05-06', helpful_count: 17, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Margaret Holloway', reviewer_job_title: 'Accounting Manager', reviewer_company: 'Holloway Wholesale Foods',
    reviewer_industry: 'Food Production', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Lot tracking for a food wholesaler is essential and it delivers',
    summary: 'In food distribution you have to be able to trace a lot number if there is ever a recall, and Enterprise handles that properly. That single capability makes it non negotiable for us, and everything else it does well is a bonus.',
    pros: 'Lot and serial tracking is essential for food and it works. Multiple warehouse handling. Advanced Pricing for our different customer tiers. Solid reporting for the owners.',
    cons: 'Annual cost is significant. Learning the advanced inventory features took time. Desktop backups are on us unless hosted.',
    review_date: '2025-10-28', helpful_count: 14, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Steven Ashby', reviewer_job_title: 'Financial Controller', reviewer_company: 'Ridgeline Equipment Rental',
    reviewer_industry: 'Machinery', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 3, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'Powerful, but respect the learning curve',
    summary: 'Enterprise is genuinely capable, but anyone expecting the ease of the online product will be surprised. It is a professional desktop tool that rewards people who invest in learning it, and once our team did, it became indispensable.',
    pros: 'Deep functionality once you learn it. Handles our equipment and parts inventory. Role based security for a bigger team. Advanced reporting.',
    cons: 'Steep learning curve compared to the online version. Desktop management overhead. Annual cost is a commitment. Not a full ERP if we keep growing.',
    review_date: '2026-02-26', helpful_count: 12, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Barbara Trentini', reviewer_job_title: 'CFO', reviewer_company: 'Trentini Building Products',
    reviewer_industry: 'Building Materials', reviewer_company_size: '201-500', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 2, ease_of_use: 2, value_for_money: 3, customer_service: 3, functionality: 4,
    review_title: 'We finally outgrew it and the move was overdue',
    summary: 'Enterprise served us well for years, but as we passed a few hundred staff and added entities, the lack of true multi entity consolidation and the desktop constraints started to hold us back. It is a strong product that we simply outgrew, and the migration to a real ERP was overdue by the time we made it.',
    pros: 'The inventory depth was excellent throughout. Reliable for a long time. Good value while it fit our size.',
    cons: 'No true multi entity consolidation, which we grew to need. Desktop constraints on a larger, multi site business. We outgrew it and should have moved sooner.',
    review_date: '2025-09-16', helpful_count: 22, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
  {
    reviewer_name: 'Richard Okonkwo', reviewer_job_title: 'Director of Finance', reviewer_company: 'Beacon Professional Group',
    reviewer_industry: 'Professional Services', reviewer_company_size: '51-200', reviewer_country: 'United States',
    used_for_duration: '1-2 years',
    overall_rating: 4, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 4,
    review_title: 'The professional services edition fits how we bill',
    summary: 'For a services firm the professional services edition handles our project billing and time tracking better than generic accounting ever did. Combined with the reporting depth, it gives our partners the visibility they want without a mid market implementation.',
    pros: 'Professional services edition suits project billing. Time and expense flows through cleanly. Reporting for partner meetings. More users than the online product allows.',
    cons: 'Desktop overhead around hosting and updates. Learning curve for new staff. The annual cost is a real line item.',
    review_date: '2026-06-04', helpful_count: 11, verified_linkedin: false, verified_badge: null,
  },
  {
    reviewer_name: 'Elizabeth Fairbanks', reviewer_job_title: 'Controller', reviewer_company: 'Fairbanks Textile Mills',
    reviewer_industry: 'Textiles', reviewer_company_size: '201-500', reviewer_country: 'United States',
    used_for_duration: '2+ years',
    overall_rating: 5, ease_of_use: 4, value_for_money: 4, customer_service: 4, functionality: 5,
    review_title: 'Advanced Pricing handles our customer tiers perfectly',
    summary: 'We sell to hundreds of customers on different pricing agreements, and Advanced Pricing in Enterprise manages that automatically where our old system needed constant manual overrides. That plus the inventory depth makes it exactly right for a textile wholesaler.',
    pros: 'Advanced Pricing rules for tiered customer pricing. Deep inventory across our warehouses. Handles enormous item lists. Reliable at real scale.',
    cons: 'Significant annual cost. Desktop management is our responsibility. It is a serious tool that expects a capable finance team.',
    review_date: '2026-04-30', helpful_count: 13, verified_linkedin: true, verified_badge: 'Verified LinkedIn User',
  },
];

let seed = 447722;
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function pick(a) { return a[Math.floor(rand() * a.length)]; }
function chance(p) { return rand() < p; }
function intBetween(a, b) { return a + Math.floor(rand() * (b - a + 1)); }

const firstNames = [
  'Robert', 'Linda', 'James', 'Patricia', 'Michael', 'Barbara', 'William', 'Susan', 'Richard', 'Margaret',
  'Charles', 'Elizabeth', 'Thomas', 'Sandra', 'Daniel', 'Nancy', 'Gerald', 'Deborah', 'Kenneth', 'Carol',
  'Steven', 'Sharon', 'Edward', 'Cynthia', 'Frank', 'Kathleen', 'Raymond', 'Donna', 'Douglas', 'Ruth',
  'Carlos', 'Maria', 'Wei', 'Ling', 'Rajesh', 'Priya', 'Kwame', 'Amara', 'Diego', 'Sofia',
  'Gerald', 'Barbara', 'Roger', 'Diane', 'Harold', 'Janet', 'Walter', 'Marilyn', 'Eugene', 'Frances',
  'Vincent', 'Gloria', 'Ralph', 'Teresa', 'Lawrence', 'Doris', 'Arthur', 'Judith', 'Roy', 'Beverly',
];
const lastInitials = 'ABCDEFGHJKLMNPRSTW'.split('');
const fullSurnames = [
  'Kessler', 'Marchetti', 'Ashworth', 'Nunley', 'Pemberton', 'Verhoeven', 'Delgado', 'Holloway',
  'Trentini', 'Okonkwo', 'Fairbanks', 'Brannigan', 'Castellano', 'Dunmore', 'Eberhardt', 'Falkner',
  'Grunewald', 'Hollister', 'Ironside', 'Kowalczyk', 'Lindstrom', 'Mercer', 'Nakashima',
];
function makeName() {
  const first = pick(firstNames);
  if (chance(0.34)) return `${first} ${pick(fullSurnames)}`;
  return `${first} ${pick(lastInitials)}.`;
}
function makeCompany() {
  if (chance(0.2)) return null;
  const stems = ['Kessler', 'Cornerstone', 'Halcyon', 'Ridgeline', 'Beacon', 'Trentini', 'Fairbanks',
    'Ironwood', 'Summit', 'Cascade', 'Redwood', 'Meridian', 'Northgate', 'Silverline', 'Pinnacle',
    'Harbor', 'Vantage', 'Crestview', 'Brightside', 'Ashford'];
  const suf = ['Industrial', 'Supply', 'Manufacturing', 'Distribution', 'Wholesale', 'Group', 'Inc', 'LLC', 'Products'];
  const s = pick(suf);
  return `${pick(stems)} ${s}`.trim();
}
const sizes = ['51-200', '51-200', '51-200', '201-500', '201-500', '11-50'];
const durations = ['6-12 months', '1-2 years', '1-2 years', '2+ years', '2+ years', '2+ years'];
const countries = ['United States', 'United States', 'United States', 'United States', 'United States', 'Canada'];
const industries = ['Wholesale', 'Manufacturing', 'Construction', 'Retail', 'Logistics & Supply Chain',
  'Food Production', 'Building Materials', 'Automotive', 'Machinery', 'Textiles', 'Non-Profit Organization Management',
  'Professional Services', 'Distribution', 'Consumer Goods', 'Industrial Automation', 'Furniture'];
const jobs = ['Controller', 'CFO', 'Operations Director', 'Finance Director', 'Accounting Manager', 'Owner',
  'Financial Controller', 'IT and Finance Manager', 'Director of Finance', 'Finance Manager', 'VP Finance',
  'Bookkeeper', 'Warehouse and Finance Manager', 'General Manager', 'Managing Partner', 'President'];

const CONTENT = {
  5: {
    titles: [
      'Advanced inventory is why we stay', 'The industry edition speaks our language', 'Cheaper than an ERP and does the job',
      'Handles our volume with room to spare', 'Lot tracking we cannot do without', 'Multiple warehouses handled properly',
      'Barcode scanning transformed our picking', 'Job costing a contractor actually needs', 'Advanced Pricing for our customer tiers',
      'Scaled with us where Online could not', 'The best desktop accounting for distribution', 'Reliable at real scale',
      'Serial tracking for warranty is essential', 'Reporting depth our owners trust', 'Forty users covers our whole team',
      'Kept us off a huge ERP project', 'The manufacturing edition fits us', 'Powerful once you learn it, then indispensable',
      'Capacity the online product just cannot match', 'Exactly right for a wholesaler',
    ],
    summaries: [
      'We distribute thousands of parts across multiple warehouses, and Advanced Inventory with bin locations and barcode scanning is the specific reason we run Enterprise rather than a full ERP.',
      'Generic accounting always felt built for someone else, but the industry edition has the reports, terminology and workflows that match how we actually run, and the team took to it fast.',
      'We got ERP quotes and nearly fell off our chairs, then realised Enterprise does the inventory and reporting we actually need for a fraction of the cost and disruption.',
      'We moved up from the online product when our volume and inventory outgrew it, and Enterprise absorbed everything without complaint. The capacity difference is night and day.',
      'In our industry you have to trace a lot number if there is ever a recall, and Enterprise handles that properly, which makes it non negotiable for a business like ours.',
      'The contractor edition and its job costing are the reason we run Enterprise, every project costed against estimates, and it has paid for itself in better bidding alone.',
      'We sell to hundreds of customers on different pricing agreements and Advanced Pricing manages that automatically where our old system needed constant manual overrides.',
      'With the hosting option our finance team accesses Enterprise from anywhere while keeping all the desktop depth, which has been the right balance of power and flexibility for us.',
      'Barcode scanning across our warehouses sped up picking and receiving dramatically, and combined with multiple location tracking it runs our distribution operation properly.',
      'It handles enormous item lists and transaction volumes without slowing down, which is exactly what a business at our scale needs and exactly where lighter products gave up.',
    ],
    pros: [
      'Advanced Inventory across multiple warehouses is exactly what we need.',
      'Bin location tracking so staff know where every item sits.',
      'Barcode scanning sped up picking and receiving.',
      'Serial and lot tracking for traceability.',
      'The industry specific edition genuinely fits our sector.',
      'Job costing ties material and labor to each job.',
      'Advanced Pricing handles our tiered customer pricing.',
      'Up to forty users covers our whole operation.',
      'Role based security keeps a bigger team in its lane.',
      'Far cheaper than the ERP alternatives we quoted.',
      'Handles enormous item and transaction volumes.',
      'Cloud hosting option gives remote access.',
      'Advanced reporting our owners trust.',
      'Reliable at genuine scale.',
      'Kept us in a familiar ecosystem as we grew.',
      'Landed cost tracking for our imports.',
    ],
    cons: [
      'It is a significant annual cost.',
      'Advanced Inventory sits in a higher tier, budget for it.',
      'The desktop model means we handle hosting and backups.',
      'There is a real learning curve versus the online product.',
      'Not a full ERP, so complex planning lives partly outside it.',
      'Interface is powerful but less polished than the web version.',
      'Updates and IT overhead need managing.',
      'A considered purchase, not a quick signup.',
      'Honestly little else for a business our size.',
      'Nothing that outweighs the capability.',
    ],
  },
  4: {
    titles: [
      'Powerful, respect the learning curve', 'The right step up from Online', 'Deep inventory, worth the cost',
      'Handles our scale well', 'Industry edition fits how we work', 'Strong for a distributor',
      'Cheaper than ERP, covers our needs', 'Reliable at volume', 'Good depth, desktop overhead aside',
      'The reporting is a clear step up', 'Fits our project billing', 'Grew with us nicely',
      'Four stars, mostly on the learning curve', 'Does what we upgraded for', 'Capable and dependable',
      'Advanced Pricing earns its keep',
    ],
    summaries: [
      'A genuinely capable step up from the online product that absorbed our growth in volume and inventory. Marked down only for the learning curve and desktop overhead, both the price of the depth.',
      'The industry edition and job costing fit our sector well, and the reporting is a clear step up. There is a real learning curve, but the payoff for a business our size is there.',
      'For a distributor the Advanced Inventory is the draw, and it delivers across our warehouses. The annual cost is significant but far below the ERP quotes we compared it against.',
      'It handles our transaction volume and item lists comfortably where the online product started to strain. The desktop management overhead is the main trade off.',
      'The professional services edition suits our project billing and gives partners the visibility they want. Solid, capable, and it kept us off a mid market implementation.',
      'We host it in the cloud and get remote access without losing the depth. A sensible balance for a larger business, though hosting adds cost on top of the subscription.',
      'Advanced Pricing manages our tiered customer agreements automatically, which alone saves a lot of manual work. The rest is dependable at our scale.',
      'A serious tool that rewards a business willing to learn it. Once our team invested the time it became indispensable, and the reporting depth justifies the price.',
    ],
    pros: [
      'Advanced Inventory across warehouses is excellent.',
      'The industry edition fits our sector.',
      'Handles high volume and large item lists.',
      'Job costing is genuinely deep.',
      'Advanced Pricing for tiered customers.',
      'More users than the online product allows.',
      'Cloud hosting gives remote access.',
      'Reporting is a clear step up.',
      'Role based security for a bigger team.',
      'Far cheaper than a full ERP.',
      'Reliable at real scale.',
      'Barcode scanning speeds up the warehouse.',
      'Kept us in a familiar ecosystem.',
      'Lot and serial tracking for traceability.',
    ],
    cons: [
      'Real learning curve versus the online product.',
      'Significant annual cost.',
      'Desktop overhead around hosting and backups.',
      'Not a full ERP for complex planning.',
      'Interface less polished than the web version.',
      'Advanced Inventory needs a higher tier.',
      'Support waits can be long at peak times.',
      'A considered purchase requiring a capable team.',
      'Updates need managing.',
      'Would outgrow it at genuine multi entity scale.',
      'Hosting adds cost on top of the subscription.',
      'Staff used to the web version take time to adjust.',
    ],
  },
  3: {
    titles: [
      'Capable but more system than we needed', 'Good, though we sized up too far', 'Powerful, steep to learn',
      'Right for bigger businesses than us', 'Three stars, mostly on fit and cost', 'Solid but the annual cost bites',
      'Works, desktop overhead and all', 'Fine, wanted true multi entity', 'Middle of the road for our situation',
      'Good tool, wrong stage for us', 'Depends how much inventory depth you need', 'Honest three from a mixed fit',
    ],
    summaries: [
      'The edition has genuinely useful reporting, but honestly Enterprise is more system than an organisation our size needs, and the annual cost is a real stretch for our budget.',
      'It is capable, but our real need was multi entity consolidation and even Enterprise cannot do that, so we combine entities manually and carry the cost of a big system regardless.',
      'Powerful once you learn it, but the learning curve was steep for our part time and volunteer staff, and we use a fraction of the inventory depth we pay for.',
      'A strong product aimed at bigger, more inventory heavy businesses than us. We bought up further than we needed and feel the cost against our actual usage.',
      'The reporting and inventory are good when we use them, but for our business most of the advanced capability goes untouched and the annual price is hard to justify.',
      'Enterprise served us fine but as we added entities the desktop constraints and lack of consolidation started to hold us back, and we began looking at a real ERP.',
    ],
    pros: [
      'The industry edition reporting is genuinely useful.',
      'Inventory depth is excellent when needed.',
      'Handles our data comfortably.',
      'Reliable at our scale.',
      'Support has been patient with our needs.',
      'Far cheaper than the ERP quotes.',
      'Role based security for a bigger team.',
      'Advanced reporting when we use it.',
    ],
    cons: [
      'More system than we truly need.',
      'Annual cost is a stretch for us.',
      'No true multi entity consolidation.',
      'Steep learning curve for part time staff.',
      'We use a fraction of the inventory depth.',
      'Desktop overhead around backups and updates.',
      'Sized up further than we needed.',
      'Hard to justify the cost against our usage.',
      'Would need an ERP if we keep growing.',
      'Interface less friendly than the online product.',
    ],
  },
  2: {
    titles: [
      'Outgrew it, move was overdue', 'More system than our budget justified', 'Capable but poor fit for us now',
      'The desktop constraints held us back', 'Good tool, wrong stage', 'Paying for depth we barely use',
    ],
    summaries: [
      'Enterprise served us well for years, but as we passed a few hundred staff and added entities the lack of true multi entity consolidation and the desktop constraints held us back, and the move to a real ERP was overdue.',
      'It is more system than our budget justified, and we use a fraction of the inventory depth while paying a significant annual cost for capacity that mostly sits idle.',
      'The capability is real but mismatched to us, a nonprofit our size did not need this much system, and the annual cost was a genuine strain on our budget.',
      'As a multi site business the desktop model became a constraint, and even the top edition could not consolidate our entities, so we carried the cost without solving our core need.',
      'Fine software, but we sized up far beyond what we needed on the advice of a reseller, and the value never matched the annual price for our actual usage.',
      'A powerful product that we simply outgrew on the multi entity side, and the desktop overhead made a larger, multi site operation harder than it needed to be.',
    ],
    pros: [
      'The inventory depth was excellent throughout.',
      'Reliable for a long time.',
      'Good value while it fit our size.',
      'The reporting was strong when used fully.',
      'Support tried hard for us.',
    ],
    cons: [
      'No true multi entity consolidation.',
      'Desktop constraints for a multi site business.',
      'More system than our budget justified.',
      'We used a fraction of what we paid for.',
      'Outgrew it and should have moved sooner.',
      'Annual cost was a real strain.',
    ],
  },
  1: {
    titles: [
      'Outgrew it and moved to an ERP', 'Wrong scale for our business', 'Paying premium for unused depth',
    ],
    summaries: [
      'We passed the point where a desktop product without true consolidation could serve a multi entity, multi site business, and spent too long paying a premium annual cost while working around a gap Enterprise could not close.',
      'A reseller sized us up far beyond our real needs, and we spent a year paying a significant annual cost for inventory depth and capacity that a business like ours barely touched.',
      'The lack of multi entity consolidation and the desktop constraints made Enterprise the wrong tool for where our business had grown, and the migration to a real ERP was overdue by the time we made it.',
    ],
    pros: [
      'The inventory capability was genuinely strong.',
      'Reliable while it fit our size.',
      'One support engineer was excellent.',
    ],
    cons: [
      'No multi entity consolidation for a growing group.',
      'Desktop constraints on a multi site operation.',
      'Premium annual cost for depth we barely used.',
      'Sized up well beyond our actual needs.',
    ],
  },
};

function buildGeneratedReviews(count) {
  const dist = { 5: 0.52, 4: 0.32, 3: 0.1, 2: 0.04, 1: 0.02 };
  const offsets = { ease_of_use: -0.3, value_for_money: -0.15, customer_service: -0.1, functionality: 0.3 };
  function pickOverall() {
    const r = rand(); let acc = 0;
    for (let s = 5; s >= 1; s--) { acc += dist[s]; if (r < acc) return s; }
    return 5;
  }
  function subRating(overall, offset, nullChance = 0.12) {
    if (chance(nullChance)) return null;
    let v = Math.round(overall + offset + (rand() * 1.7 - 0.85));
    if (v > 5) v = 5; if (v < 1) v = 1;
    return v;
  }
  const out = [];
  const seen = new Set();
  let guard = 0;
  while (out.length < count && guard < count * 90) {
    guard++;
    const overall = pickOverall();
    const b = CONTENT[overall];
    const title = pick(b.titles);
    const summary = pick(b.summaries);
    const pros = pick(b.pros);
    const cons = chance(0.05) ? pick(['Nothing significant to add.', 'None beyond the cost and learning curve.']) : pick(b.cons);
    const fp = `${title}|${summary}|${pros}`;
    if (seen.has(fp)) continue;
    seen.add(fp);
    const year = chance(0.48) ? 2026 : (chance(0.6) ? 2025 : 2024);
    const maxM = year === 2026 ? 6 : 12;
    const date = `${year}-${String(intBetween(1, maxM)).padStart(2, '0')}-${String(intBetween(1, 28)).padStart(2, '0')}`;
    const verified = chance(0.36);
    out.push({
      reviewer_name: makeName(),
      reviewer_job_title: pick(jobs),
      reviewer_company: makeCompany(),
      reviewer_industry: pick(industries),
      reviewer_company_size: pick(sizes),
      reviewer_country: pick(countries),
      verified_linkedin: verified,
      verified_badge: verified ? 'Verified LinkedIn User' : null,
      used_for_duration: pick(durations),
      overall_rating: overall,
      ease_of_use: subRating(overall, offsets.ease_of_use),
      value_for_money: subRating(overall, offsets.value_for_money),
      customer_service: subRating(overall, offsets.customer_service, 0.18),
      functionality: subRating(overall, offsets.functionality),
      review_title: title,
      summary, pros, cons,
      vendor_response: null, vendor_response_date: null,
      review_date: date,
      helpful_count: intBetween(0, 29),
    });
  }
  return out;
}

async function main() {
  const env = loadEnv();
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: peer, error: catErr } = await supabase
    .from('software').select('category_id').eq('slug', 'quickbooks-online').single();
  if (catErr || !peer) throw new Error(`Could not resolve accounting category: ${catErr && catErr.message}`);

  const record = { ...SOFTWARE, category_id: peer.category_id };

  const { data: existing } = await supabase
    .from('software').select('id').eq('slug', SOFTWARE.slug).maybeSingle();

  let softwareId;
  if (existing) {
    const { error } = await supabase.from('software').update(record).eq('id', existing.id);
    if (error) throw new Error(`Update failed: ${error.message}`);
    softwareId = existing.id;
    console.log('QuickBooks Enterprise already existed, profile updated.');
  } else {
    const { data: ins, error } = await supabase.from('software').insert(record).select('id').single();
    if (error) {
      if (/integrations|brand_color/i.test(error.message)) {
        const { integrations, brand_color, ...rest } = record;
        const { data: ins2, error: e2 } = await supabase.from('software').insert(rest).select('id').single();
        if (e2) throw new Error(`Insert failed: ${e2.message}`);
        softwareId = ins2.id;
        console.log('Inserted (a column was missing and skipped).');
      } else {
        throw new Error(`Insert failed: ${error.message}`);
      }
    } else {
      softwareId = ins.id;
      console.log('QuickBooks Enterprise inserted.');
    }
  }

  const { error: delErr, count: delCount } = await supabase
    .from('reviews').delete({ count: 'exact' }).eq('software_id', softwareId);
  if (delErr) throw new Error(`Review delete failed: ${delErr.message}`);

  const generated = buildGeneratedReviews(118);
  const rows = [...ANCHOR_REVIEWS, ...generated].map(r => ({
    software_id: softwareId,
    reviewer_country: 'United States',
    status: 'published',
    helpful_count: 0,
    vendor_response: null,
    vendor_response_date: null,
    ...r,
  }));

  const CHUNK = 50;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from('reviews').insert(batch);
    if (error) throw new Error(`Review insert failed at row ${i}: ${error.message}`);
    inserted += batch.length;
  }

  const { data: agg } = await supabase
    .from('software')
    .select('overall_rating, review_count, ease_of_use_rating, value_for_money_rating, customer_service_rating, functionality_rating')
    .eq('id', softwareId).single();

  console.log(`Reviews: deleted ${delCount ?? 0}, inserted ${inserted}.`);
  console.log('Aggregate ratings now:', agg);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
