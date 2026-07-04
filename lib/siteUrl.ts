const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://stackmatch.uk";

// Env var may be entered as a bare domain; new URL() requires a scheme.
const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

export const siteUrl = withScheme.replace(/\/+$/, "");
