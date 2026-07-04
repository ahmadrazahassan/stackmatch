// Maps an integration name (as stored per-software in `software.integrations`)
// to a real brand logo in /public/integrations. Logos are official brand SVGs
// sourced from Simple Icons (CC0). Names are matched case/space-insensitively
// so admin-entered variants ("QuickBooks Online", "quickbooks online") resolve
// to the same file. Unknown integrations fall back to a generic icon in the UI.

const LOGO_BY_KEY: Record<string, string> = {
  stripe: "/integrations/stripe.svg",
  zapier: "/integrations/zapier.svg",
  paypal: "/integrations/paypal.svg",
  shopify: "/integrations/shopify.svg",
  "microsoft 365": "/integrations/microsoft-365.svg",
  "microsoft365": "/integrations/microsoft-365.svg",
  "office 365": "/integrations/microsoft-365.svg",
  "microsoft teams": "/integrations/microsoft-teams.svg",
  teams: "/integrations/microsoft-teams.svg",
  square: "/integrations/square.svg",
  gusto: "/integrations/gusto.svg",
  xero: "/integrations/xero.svg",
  "quickbooks online": "/integrations/quickbooks-online.svg",
  quickbooks: "/integrations/quickbooks-online.svg",
  "quickbooks time": "/integrations/quickbooks-online.svg",
  "quickbooks payroll": "/integrations/quickbooks-online.svg",
  "quickbooks desktop": "/integrations/quickbooks-online.svg",
  "quickbooks payments": "/integrations/quickbooks-online.svg",
  tsheets: "/integrations/quickbooks-online.svg",
  "sage accounting": "/integrations/sage-accounting.svg",
  sage: "/integrations/sage-accounting.svg",
  "zoho books": "/integrations/zoho-books.svg",
  "zoho desk": "/integrations/zoho-desk.svg",
  zoho: "/integrations/zoho-books.svg",
  "whatsapp business": "/integrations/whatsapp-business.svg",
  whatsapp: "/integrations/whatsapp-business.svg",
  mailchimp: "/integrations/mailchimp.svg",
  slack: "/integrations/slack.svg",
  greenhouse: "/integrations/greenhouse.svg",
  amazon: "/integrations/amazon.svg",
  ebay: "/integrations/ebay.svg",
  woocommerce: "/integrations/woocommerce.svg",

  // Payments, banking & finance ops
  gocardless: "/integrations/gocardless.png",
  bill: "/integrations/bill.png",
  "bill.com": "/integrations/bill.png",
  ramp: "/integrations/ramp.png",
  avalara: "/integrations/avalara.png",
  satago: "/integrations/satago.png",

  // Document / data capture & reporting
  autoentry: "/integrations/autoentry.png",
  hubdoc: "/integrations/hubdoc.png",
  "syft analytics": "/integrations/syft-analytics.png",
  syft: "/integrations/syft-analytics.png",
  docusign: "/integrations/docusign.png",

  // CRM & platforms
  salesforce: "/integrations/salesforce.png",
  "salesforce sales cloud": "/integrations/salesforce.png",

  // HR, payroll & expenses
  "adp workforce now": "/integrations/adp.svg",
  adp: "/integrations/adp.svg",
  "paychex flex": "/integrations/paychex.svg",
  paychex: "/integrations/paychex.svg",
  "sap concur": "/integrations/sap-concur.svg",
  concur: "/integrations/sap-concur.svg",
  expensify: "/integrations/expensify.svg",
  talentlms: "/integrations/talentlms.png",
  quinyx: "/integrations/quinyx.png",
  broadbean: "/integrations/broadbean.png",
  own: "/integrations/own.png",

  // UK statutory & pensions
  hmrc: "/integrations/hmrc.png",
  "nest pensions": "/integrations/nest-pensions.png",
  nest: "/integrations/nest-pensions.png",

  // Microsoft product family
  "microsoft excel": "/integrations/microsoft-365.svg",
  excel: "/integrations/microsoft-365.svg",
  "microsoft outlook": "/integrations/microsoft-365.svg",
  outlook: "/integrations/microsoft-365.svg",

  // Sage product family (official Sage brand mark)
  "sage 50 payroll": "/integrations/sage-accounting.svg",
  "sage 50 accounts": "/integrations/sage-accounting.svg",
  "sage 50": "/integrations/sage-accounting.svg",
  "sage hr": "/integrations/sage-accounting.svg",
  "sage payroll": "/integrations/sage-accounting.svg",
  "sage people": "/integrations/sage-accounting.svg",
  "sage intacct": "/integrations/sage-accounting.svg",
  "sage employee benefits": "/integrations/sage-accounting.svg",
};

/** Resolve a real brand logo path for an integration name, or null if none. */
export function integrationLogo(name: string): string | null {
  const key = name.trim().toLowerCase().replace(/\s+/g, " ");
  return LOGO_BY_KEY[key] ?? null;
}
