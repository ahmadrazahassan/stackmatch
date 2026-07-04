export const softwareBrandColors: Record<string, string> = {
  'simplepay': '#E36C24',      // Hot Cinnamon
  'sage-accounting': '#00D639', // Malachite
  'quickbooks-online': '#108000', // Japanese Laurel
  'bamboohr': '#73C41D',       // Lima
  'odoo': '#714B67',           // Eggplant (Purple)
  'xero': '#13B5EA',           // Xero Blue
  'payspace': '#004F9F',       // PaySpace Blue
  'zoho-crm': '#F0483E',       // Zoho Red
};

/** Site default accent when a product has no colour of its own. */
export const DEFAULT_BRAND_COLOR = "#00A86B";

/**
 * Resolve a product's accent colour. Precedence:
 *   1. the admin-set `brand_color` column,
 *   2. the legacy hardcoded map above (keeps the original seeded products
 *      pixel-identical even if their column is empty),
 *   3. the passed fallback (defaults to the site brand green).
 *
 * Accepts any object with a `slug` and optional `brand_color`, so it works
 * with both full Software rows and the lite shapes used in comparisons.
 */
export function brandColorFor(
  software: { slug: string; brand_color?: string | null },
  fallback: string = DEFAULT_BRAND_COLOR
): string {
  return software.brand_color || softwareBrandColors[software.slug] || fallback;
}
