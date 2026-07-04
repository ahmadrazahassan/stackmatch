export function formatRating(rating: number | null | undefined): string {
  if (!rating || rating <= 0) return "—";
  return rating.toFixed(1);
}

const CURRENCY_PREFIX: Record<string, string> = {
  ZAR: "R",
  USD: "US$",
  EUR: "€",
  GBP: "£",
};

export function formatPrice(
  price: number | string | null | undefined,
  currency = "GBP",
  billingPeriod?: string | null
): string {
  if (price === null || price === undefined || price === "") return "Contact vendor";
  const num = typeof price === "string" ? Number(price) : price;
  if (num === 0) return "Free";
  const prefix = CURRENCY_PREFIX[currency] ?? `${currency} `;
  const amount = Number.isInteger(num) ? num.toString() : num.toFixed(2);
  const period = billingPeriod ? `/${billingPeriod === "month" ? "mo" : billingPeriod === "year" ? "yr" : billingPeriod}` : "";
  return `${prefix}${amount}${period}`;
}

export function reviewCountLabel(count: number): string {
  return `${count.toLocaleString("en-GB")} review${count === 1 ? "" : "s"}`;
}
