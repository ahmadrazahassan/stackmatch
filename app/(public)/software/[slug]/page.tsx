import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Minus, Plus, X, Globe, Headphones, Pencil, Puzzle } from "lucide-react";
import {
  getAlternatives,
  getCategoryPeers,
  getRatingDistribution,
  getReviewsForSoftware,
  getSiteSettings,
  getSoftwareBySlug,
} from "@/lib/supabase/queries";
import { ProfileShell } from "./ProfileShell";
import { SoftwareSidebar } from "@/components/public/SoftwareSidebar";
import { ScreenshotCarousel } from "@/components/public/ScreenshotCarousel";
import { StarRating } from "@/components/public/StarRating";
import { SentimentBar } from "@/components/public/SentimentBar";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { CircularRating } from "@/components/public/CircularRating";
import { DonutChart } from "@/components/public/DonutChart";
import { ReviewCard } from "@/components/public/ReviewCard";
import { softwareBrandColors } from "@/lib/brandColors";
import { formatPrice, formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import type { Review, Software } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Software Not Found" };
  const title =
    software.meta_title ??
    `${software.name} Review ${new Date().getFullYear()}: Features, Pricing, Pros & Cons`;
  const description = software.meta_description ?? software.description_short;
  return {
    title,
    description,
    alternates: { canonical: `/software/${software.slug}` },
    openGraph: {
      title,
      description,
      locale: "en_ZA",
      type: "website",
      images: [
        software.og_image_url ??
          `/api/og?title=${encodeURIComponent(software.name)}&subtitle=${encodeURIComponent(`★ ${software.overall_rating} · ${software.review_count} reviews`)}`,
      ],
    },
  };
}

/* ---------------------------------- helpers ---------------------------------- */

function percentAbove4(dist: Record<1 | 2 | 3 | 4 | 5, number>): number {
  const total = Object.values(dist).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return ((dist[4] + dist[5]) / total) * 100;
}

/**
 * Editorial copy usually opens with its own "<h2>What is X?</h2>" — drop it
 * so the page heading isn't duplicated.
 */
function stripLeadingHeading(html: string): string {
  return html.replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>/i, "");
}

function firstSentence(text: string, max = 90): string {
  const s = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return s.length > max ? `${s.slice(0, max).trimEnd()}…` : s;
}

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

function SideRatingCard({
  software,
  label,
  value,
  reviewCount,
}: {
  software: Software;
  label: string;
  value: number;
  reviewCount: number;
}) {
  return (
    <div className="h-fit rounded-2xl border bg-white p-5 card-shadow lg:sticky lg:top-36">
      <div className="flex items-center gap-2.5">
        <SoftwareLogo src={software.logo_url} name={software.name} size={32} />
        <span className="font-bold">{label}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <StarRating rating={value} />
        <span className="text-2xl font-extrabold">{formatRating(value)}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Based on {reviewCount.toLocaleString("en-ZA")} reviews
      </p>
    </div>
  );
}

function PricingOptions({ software }: { software: Software }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <span className="inline-flex items-center gap-1">
        {software.free_trial ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <X className="h-4 w-4 text-muted-foreground" />
        )}
        Free Trial
      </span>
      <span className="inline-flex items-center gap-1">
        {software.free_version ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <X className="h-4 w-4 text-muted-foreground" />
        )}
        Free Version
      </span>
    </div>
  );
}

function QuoteCard({ review, positive }: { review: Review; positive: boolean }) {
  const quote = positive ? review.pros : review.cons;
  return (
    <div className="rounded-xl bg-muted p-5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-muted-foreground">
            {review.reviewer_name.charAt(0)}
          </div>
          <span
            className={`absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full ${positive ? "bg-success" : "bg-error"}`}
          >
            {positive ? (
              <Plus className="h-3 w-3 text-white" />
            ) : (
              <Minus className="h-3 w-3 text-white" />
            )}
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{review.reviewer_name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {[review.reviewer_job_title, review.reviewer_company_size && `${review.reviewer_company_size} employees`]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-foreground">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default async function SoftwareOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  const [alternativesRaw, settings, distribution, reviewSample, recentReviews] =
    await Promise.all([
      getAlternatives(software.id, 4).then(async (alts) =>
        alts.length > 0 ? alts : getCategoryPeers(software.id, software.category_id, 4)
      ),
      getSiteSettings(),
      getRatingDistribution(software.id),
      getReviewsForSoftware(software.id, { perPage: 50, sort: "helpful" }),
      getReviewsForSoftware(software.id, { perPage: 3, sort: "recent" }),
    ]);

  const altDistributions = await Promise.all(
    alternativesRaw.map((alt) => getRatingDistribution(alt.id))
  );

  const compareWith = alternativesRaw[0] ?? null;
  const brandColor = softwareBrandColors[software.slug] ?? "#00A86B";
  const reviews = reviewSample.items;
  const totalRated = Object.values(distribution).reduce((a, b) => a + b, 0);
  const maxDist = Math.max(1, ...Object.values(distribution));
  const positivePct = totalRated ? Math.round(((distribution[4] + distribution[5]) / totalRated) * 100) : 0;
  const negativePct = totalRated ? Math.round(((distribution[1] + distribution[2]) / totalRated) * 100) : 0;

  // Pros & Cons — best-rated review with pros, worst-rated with cons.
  const proReview =
    reviews.filter((r) => r.pros).sort((a, b) => b.overall_rating - a.overall_rating)[0] ?? null;
  const conReview =
    reviews.filter((r) => r.cons).sort((a, b) => a.overall_rating - b.overall_rating)[0] ?? null;

  // Who uses it — aggregates from reviews.
  const sizeBuckets = { "Small business": 0, "Midsize business": 0, Enterprise: 0 };
  const jobCounts = new Map<string, number>();
  const industryCounts = new Map<string, number>();
  for (const r of reviews) {
    const s = r.reviewer_company_size;
    if (s === "1-10" || s === "11-50") sizeBuckets["Small business"] += 1;
    else if (s === "51-200") sizeBuckets["Midsize business"] += 1;
    else if (s) sizeBuckets.Enterprise += 1;
    if (r.reviewer_job_title)
      jobCounts.set(r.reviewer_job_title, (jobCounts.get(r.reviewer_job_title) ?? 0) + 1);
    if (r.reviewer_industry)
      industryCounts.set(r.reviewer_industry, (industryCounts.get(r.reviewer_industry) ?? 0) + 1);
  }
  const sizeTotal = Object.values(sizeBuckets).reduce((a, b) => a + b, 0);
  const jobData = [...jobCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));
  const industryData = [...industryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));
  const topJobPct = jobData.length && reviews.length
    ? Math.round((jobData[0].value / jobData.reduce((a, d) => a + d.value, 0)) * 100)
    : 0;

  const integrations = (software.integrations as string[] | undefined) ?? [];

  const faqs = [
    {
      tag: "Overview",
      q: `What is ${software.name} used for?`,
      a: `${software.description_short}${software.category ? ` It is listed under ${software.category.name} on CloudPayZA.` : ""}`,
    },
    {
      tag: "Pricing",
      q: `How much does ${software.name} cost?`,
      a:
        software.starting_price !== null
          ? `${software.name} starts from ${formatPrice(software.starting_price, software.price_currency, software.billing_period)}.${software.free_trial ? " A free trial is available." : ""}${software.free_version ? " A free version is also available." : ""}`
          : `${software.name} uses custom pricing — contact the vendor for a quote.${software.free_trial ? " A free trial is available." : ""}`,
    },
    {
      tag: "Features",
      q: `What are the key features of ${software.name}?`,
      a:
        (software.features as string[]).length > 0
          ? `Key features include: ${(software.features as string[]).slice(0, 6).join(", ")}.`
          : `See the features section above for the full list.`,
    },
    {
      tag: "Integrations",
      q: `Which tools does ${software.name} integrate with?`,
      a:
        integrations.length > 0
          ? `${software.name} integrates with ${integrations.join(", ")}.`
          : `Integration information has not been listed yet.`,
    },
    {
      tag: "Support",
      q: `What customer support does ${software.name} offer?`,
      a:
        (software.support_types as string[]).length > 0
          ? `${software.vendor_name ?? "The vendor"} offers support via ${(software.support_types as string[]).join(", ")}.`
          : `Support information has not been listed yet.`,
    },
    {
      tag: "Availability",
      q: `Is ${software.name} available in South Africa?`,
      a:
        (software.countries_available as string[]).length > 0
          ? `${software.name} is available in ${(software.countries_available as string[]).join(", ")}.`
          : `Availability information has not been listed yet.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: software.name,
    description: software.description_short,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    ...(software.review_count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Number(software.overall_rating),
        reviewCount: software.review_count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(software.starting_price !== null && {
      offers: {
        "@type": "Offer",
        price: software.starting_price,
        priceCurrency: software.price_currency,
      },
    }),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const screenshots = software.screenshots as string[];
  const standardSupport = ["Email", "Phone", "Live Chat", "Knowledge Base", "Forum"];
  const offeredSupport = software.support_types as string[];

  return (
    <ProfileShell software={software} activeTab="overview">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ============ DESCRIPTION + RIGHT RAIL ============ */}
      <section id="description" className="scroll-mt-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <div>
              <SectionHeading>What is {software.name}?</SectionHeading>
              <div
                className="prose-content mt-4"
                dangerouslySetInnerHTML={{ __html: stripLeadingHeading(software.description_full) }}
              />
              {screenshots.length > 0 && (
                <div className="mt-6">
                  <ScreenshotCarousel screenshots={screenshots} name={software.name} />
                </div>
              )}
            </div>

            {/* Compare with a popular alternative */}
            {compareWith && (
              <div className="rounded-2xl border bg-white p-7 card-shadow">
                <h3 className="text-xl font-bold">Compare with a popular alternative</h3>
                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-start gap-4">
                  {[software, compareWith].map((s, idx) => (
                    <div key={s.id} className={idx === 1 ? "order-3" : "order-1"}>
                      <div className="flex flex-col items-center gap-2 text-center">
                        <SoftwareLogo src={s.logo_url} name={s.name} size={64} />
                        <p className="font-bold">{s.name}</p>
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={Number(s.overall_rating)} size="sm" />
                          <span className="text-sm font-semibold">
                            {formatRating(Number(s.overall_rating))}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({s.review_count.toLocaleString("en-ZA")})
                          </span>
                        </div>
                        <p className="text-2xl font-extrabold">
                          {s.starting_price !== null
                            ? formatPrice(s.starting_price, s.price_currency)
                            : "Custom"}
                        </p>
                        {s.starting_price !== null && (
                          <p className="-mt-1 text-xs text-muted-foreground">
                            per {s.billing_period}
                          </p>
                        )}
                        <PricingOptions software={s} />
                      </div>
                    </div>
                  ))}
                  <div className="order-2 flex h-full items-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-sm font-black text-muted-foreground">
                      VS
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t pt-5">
                  {(
                    [
                      ["Ease of Use", "ease_of_use_rating"],
                      ["Value for Money", "value_for_money_rating"],
                      ["Customer Service", "customer_service_rating"],
                      ["Functionality", "functionality_rating"],
                    ] as const
                  ).map(([label, key]) => (
                    <div key={key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-9 font-semibold">
                          {formatRating(Number(software[key]))}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(Number(software[key]) / 5) * 100}%`,
                              backgroundColor: brandColor,
                            }}
                          />
                        </div>
                      </div>
                      <span className="w-36 text-center font-medium text-muted-foreground">
                        {label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-navy"
                            style={{ width: `${(Number(compareWith[key]) / 5) * 100}%` }}
                          />
                        </div>
                        <span className="w-9 text-right font-semibold">
                          {formatRating(Number(compareWith[key]))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href={`/compare/${software.slug}-vs-${compareWith.slug}`}
                    className="inline-flex rounded-xl border px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: `${brandColor}E0`,
                      borderColor: "rgba(255,255,255,0.25)",
                      boxShadow: `0 8px 24px -6px ${brandColor}66, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    }}
                  >
                    View Full Comparison
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right rail */}
          <div className="space-y-5 lg:col-span-4">
            <div className="rounded-2xl border bg-white p-6 card-shadow">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Overall rating</h3>
                <a
                  href="#reviews"
                  className="text-sm font-medium underline-offset-2 hover:underline"
                  style={{ color: brandColor }}
                >
                  See all reviews
                </a>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on {reviewCountLabel(software.review_count)}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <StarRating rating={Number(software.overall_rating)} size="lg" />
                <span className="text-3xl font-extrabold">
                  {formatRating(Number(software.overall_rating))}
                </span>
              </div>
              {totalRated > 0 && (
                <div className="mt-5">
                  <h4 className="mb-2 text-sm font-bold">Reviews sentiment</h4>
                  <SentimentBar distribution={distribution} />
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-36">
              <SoftwareSidebar
                software={software}
                compareWith={compareWith}
                contactEmail={settings.contact_email}
                brandColor={brandColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ ALTERNATIVES ============ */}
      <section id="alternatives" className="reveal-on-scroll mt-16 scroll-mt-32">
        <div className="flex items-center justify-between">
          <SectionHeading>{software.name} alternatives</SectionHeading>
          <Link
            href={`/software/${software.slug}/alternatives`}
            className="text-sm font-semibold underline-offset-2 hover:underline"
            style={{ color: brandColor }}
          >
            View all alternatives
          </Link>
        </div>
        {alternativesRaw.length === 0 ? (
          <p className="mt-6 rounded-2xl border bg-white p-10 text-center text-muted-foreground card-shadow">
            No alternatives listed yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {alternativesRaw.map((alt, i) => {
              const altColor = softwareBrandColors[alt.slug] ?? "#00A86B";
              const pct = percentAbove4(altDistributions[i]);
              return (
                <div
                  key={alt.id}
                  className="flex flex-col rounded-2xl border bg-white p-6 card-shadow transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <SoftwareLogo src={alt.logo_url} name={alt.name} size={52} />
                  <h3 className="mt-3 font-bold">
                    <Link href={`/software/${alt.slug}`} className="hover:underline">
                      {alt.name}
                    </Link>
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-sm">
                    <StarRating rating={Number(alt.overall_rating)} size="sm" />
                    <span className="font-semibold">{formatRating(Number(alt.overall_rating))}</span>
                    <span className="text-xs text-muted-foreground">
                      ({alt.review_count.toLocaleString("en-ZA")})
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Starting price
                  </p>
                  <p className="text-lg font-extrabold">
                    {alt.starting_price !== null
                      ? formatPrice(alt.starting_price, alt.price_currency, alt.billing_period)
                      : "Contact vendor"}
                  </p>

                  <div className="mt-3">
                    <PricingOptions software={alt} />
                  </div>

                  {alt.review_count > 0 && (
                    <div className="mt-4 flex items-center gap-3">
                      <CircularRating percent={pct} color={altColor} size={56} />
                      <p className="text-xs leading-5 text-muted-foreground">
                        of reviewers rated it
                        <br />
                        <span className="font-semibold text-foreground">4 stars or above</span>
                      </p>
                    </div>
                  )}

                  <Link
                    href={`/software/${alt.slug}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: `${altColor}E0`,
                      borderColor: "rgba(255,255,255,0.25)",
                      boxShadow: `0 8px 24px -6px ${altColor}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    }}
                  >
                    Learn More
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============ FAQs ============ */}
      <section id="faqs" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>FAQs about {software.name}</SectionHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group self-start rounded-2xl border bg-white p-5 card-shadow open:shadow-md"
            >
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold"
                  style={{ backgroundColor: `${brandColor}12`, color: brandColor }}
                >
                  {f.tag}
                </span>
                <span className="mt-2 flex items-start justify-between gap-3">
                  <span className="leading-6 font-semibold">{f.q}</span>
                  <Plus className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ USERS ============ */}
      <section id="users" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>Who uses {software.name}?</SectionHeading>
        <p className="mt-2 text-muted-foreground">Based on CloudPayZA reviews</p>
        {reviews.length === 0 ? (
          <p className="mt-6 rounded-2xl border bg-white p-10 text-center text-muted-foreground card-shadow">
            User demographics will appear once reviews are published.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {/* Company size */}
            <div className="rounded-2xl border bg-white p-6 card-shadow">
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold">Company size</h3>
                <span className="text-xs text-muted-foreground">
                  Based on {reviews.length} reviews
                </span>
              </div>
              <div className="mt-6 flex h-44 items-end justify-around gap-4">
                {Object.entries(sizeBuckets).map(([label, count]) => {
                  const pct = sizeTotal ? Math.round((count / sizeTotal) * 100) : 0;
                  return (
                    <div key={label} className="flex h-full w-16 flex-col items-center justify-end gap-2">
                      <span className="text-sm font-bold">{pct}%</span>
                      <div
                        className="w-7 rounded-t-md"
                        style={{
                          height: `${Math.max(3, pct)}%`,
                          backgroundColor: count === Math.max(...Object.values(sizeBuckets)) ? brandColor : "var(--color-border)",
                        }}
                      />
                      <span className="text-center text-xs leading-4 text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top job functions */}
            <div className="rounded-2xl border bg-white p-6 card-shadow">
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold">Top job functions</h3>
                <span className="text-xs text-muted-foreground">
                  Based on {reviews.length} reviews
                </span>
              </div>
              {jobData.length > 0 ? (
                <>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xl font-bold">{jobData[0].label}</p>
                    <span
                      className="rounded-md px-2 py-1 text-sm font-bold"
                      style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
                    >
                      ↗ {topJobPct}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <DonutChart data={jobData} color={brandColor} size={130} />
                  </div>
                </>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">Not enough data yet.</p>
              )}
            </div>

            {/* Top industries */}
            <div className="rounded-2xl border bg-white p-6 card-shadow">
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold">Top industries</h3>
                <span className="text-xs text-muted-foreground">
                  Based on {reviews.length} reviews
                </span>
              </div>
              {industryData.length > 0 ? (
                <div className="mt-4">
                  <DonutChart data={industryData} color={brandColor} size={130} />
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">Not enough data yet.</p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ============ PROS AND CONS ============ */}
      <section id="pros-cons" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>Pros and Cons</SectionHeading>
        {!proReview && !conReview ? (
          <p className="mt-6 rounded-2xl border bg-white p-10 text-center text-muted-foreground card-shadow">
            Pros and cons will appear here once reviews are published.
          </p>
        ) : (
          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:divide-x lg:divide-border">
            {proReview && (
              <div className="lg:pr-10">
                <h3 className="flex items-start gap-2.5 text-xl font-bold">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-success">
                    <Plus className="h-3 w-3 text-success" />
                  </span>
                  {firstSentence(proReview.pros as string)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {positivePct}% positive reviews out of {totalRated}
                </p>
                {proReview.summary && (
                  <p className="mt-3 leading-7 text-foreground">{proReview.summary}</p>
                )}
                <div className="mt-5">
                  <QuoteCard review={proReview} positive />
                </div>
              </div>
            )}
            {conReview && (
              <div>
                <h3 className="flex items-start gap-2.5 text-xl font-bold">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-error">
                    <Minus className="h-3 w-3 text-error" />
                  </span>
                  {firstSentence(conReview.cons as string)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {negativePct}% negative reviews out of {totalRated}
                </p>
                {conReview.summary && (
                  <p className="mt-3 leading-7 text-foreground">{conReview.summary}</p>
                )}
                <div className="mt-5">
                  <QuoteCard review={conReview} positive={false} />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            href={`/software/${software.slug}/reviews`}
            className="text-sm font-semibold underline-offset-2 hover:underline"
            style={{ color: brandColor }}
          >
            Expand to view all ↓
          </Link>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>Features</SectionHeading>
        <p className="mt-2 text-muted-foreground">
          The most important capabilities of {software.name}, as listed by the vendor.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {(software.features as string[]).length > 0 ? (
              <ul className="grid gap-x-12 sm:grid-cols-2">
                {(software.features as string[]).map((f) => (
                  <li
                    key={f}
                    className="flex items-center justify-between gap-3 border-b py-4 text-[15px] font-semibold"
                  >
                    {f}
                    <Check className="h-4 w-4 shrink-0" style={{ color: brandColor }} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl border bg-white p-10 text-center text-muted-foreground card-shadow">
                Feature list coming soon.
              </p>
            )}
          </div>
          <div className="lg:col-span-4">
            <SideRatingCard
              software={software}
              label="Features"
              value={Number(software.functionality_rating)}
              reviewCount={software.review_count}
            />
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>Pricing</SectionHeading>
        <div className="mt-3 flex items-center gap-2 text-sm font-medium">
          {software.free_trial ? (
            <>
              <Check className="h-4 w-4 text-success" /> Free Trial
            </>
          ) : (
            <>
              <X className="h-4 w-4 text-muted-foreground" /> No free trial
            </>
          )}
        </div>
        <div className="mt-5 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {(software.pricing_plans?.length ?? 0) > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {software.pricing_plans.map((plan, i) => {
                  // Highlight the last (most capable) plan when there are 2+.
                  const popular =
                    software.pricing_plans.length > 1 &&
                    i === software.pricing_plans.length - 1;
                  return (
                    <div
                      key={i}
                      className="group relative flex flex-col rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                      style={
                        popular
                          ? {
                              borderColor: `${brandColor}50`,
                              boxShadow: `0 12px 40px -12px ${brandColor}35`,
                              background: `linear-gradient(180deg, ${brandColor}08 0%, #ffffff 45%)`,
                            }
                          : undefined
                      }
                    >
                      {popular && (
                        <span
                          className="absolute -top-3 left-7 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide uppercase backdrop-blur-md"
                          style={{
                            backgroundColor: `${brandColor}E0`,
                            borderColor: "rgba(255,255,255,0.3)",
                            color: "#fff",
                            boxShadow: `0 4px 14px -2px ${brandColor}60`,
                          }}
                        >
                          Most popular
                        </span>
                      )}
                      <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                        {plan.name}
                      </p>
                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold tracking-tight">
                          {Number(plan.price) === 0
                            ? "Free"
                            : formatPrice(plan.price, plan.currency)}
                        </span>
                        <span className="text-sm text-muted-foreground">/ {plan.billing}</span>
                      </div>
                      <div
                        className="mt-5 h-px w-full"
                        style={{
                          background: `linear-gradient(90deg, ${brandColor}40, transparent)`,
                        }}
                      />
                      <p className="mt-5 text-xs font-bold tracking-wide text-muted-foreground uppercase">
                        It includes
                      </p>
                      <ul className="mt-3 flex-1 space-y-2.5">
                        {plan.features.filter(Boolean).map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <span
                              className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: `${brandColor}14` }}
                            >
                              <Check className="h-3 w-3" style={{ color: brandColor }} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border bg-white p-7 card-shadow">
                <p className="text-lg">
                  Starting from{" "}
                  <span className="font-extrabold" style={{ color: brandColor }}>
                    {software.starting_price !== null
                      ? formatPrice(software.starting_price, software.price_currency, software.billing_period)
                      : "custom pricing"}
                  </span>
                </p>
                <div className="mt-2">
                  <PricingOptions software={software} />
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-4">
            <SideRatingCard
              software={software}
              label="Value for money"
              value={Number(software.value_for_money_rating)}
              reviewCount={software.review_count}
            />
          </div>
        </div>
      </section>

      {/* ============ INTEGRATIONS ============ */}
      <section id="integrations" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>Integrations</SectionHeading>
        {integrations.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {integrations.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-2.5 rounded-xl border bg-white px-5 py-3 text-sm font-semibold card-shadow transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Puzzle className="h-4 w-4" style={{ color: brandColor }} />
                {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border bg-white p-10 text-center text-muted-foreground card-shadow">
            Integration information has not been listed yet.
          </p>
        )}
      </section>

      {/* ============ SUPPORT ============ */}
      <section id="support" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>Support, availability and typical users</SectionHeading>
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            <div>
              <h3 className="flex items-center gap-2 font-bold">
                <Headphones className="h-4 w-4" style={{ color: brandColor }} /> Support
              </h3>
              <ul className="mt-4 space-y-2.5">
                {standardSupport.map((s) => {
                  const offered = offeredSupport.includes(s);
                  return (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      {offered ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={offered ? "" : "text-muted-foreground"}>{s}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-bold">
                <Globe className="h-4 w-4" style={{ color: brandColor }} /> Availability
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold">Countries</dt>
                  <dd className="mt-1 leading-6 text-muted-foreground">
                    {(software.countries_available as string[]).join(", ") || "Not listed yet."}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Languages</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {(software.languages as string[]).join(", ") || "Not listed yet."}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-bold">Typical users</h3>
              <ul className="mt-4 space-y-2.5">
                {Object.entries(sizeBuckets).map(([label, count]) => (
                  <li key={label} className="flex items-center gap-2 text-sm">
                    {count > 0 ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={count > 0 ? "" : "text-muted-foreground"}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4">
            <SideRatingCard
              software={software}
              label="Customer Service"
              value={Number(software.customer_service_rating)}
              reviewCount={software.review_count}
            />
          </div>
        </div>
      </section>

      {/* ============ USER REVIEWS ============ */}
      <section id="reviews" className="reveal-on-scroll mt-16 scroll-mt-32">
        <SectionHeading>User reviews</SectionHeading>
        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Overall rating</h3>
              <a
                href={`mailto:${settings.contact_email ?? "hello@cloudpayza.com"}?subject=Review%20submission%20for%20${encodeURIComponent(software.name)}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-2 hover:underline"
                style={{ color: brandColor }}
              >
                Write a review <Pencil className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={Number(software.overall_rating)} size="lg" />
              <span className="text-3xl font-extrabold">
                {formatRating(Number(software.overall_rating))}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on {reviewCountLabel(software.review_count)}
            </p>

            <h4 className="mt-6 mb-3 text-sm font-bold">Filter by rating</h4>
            <ul className="space-y-2">
              {([5, 4, 3, 2, 1] as const).map((stars) => (
                <li key={stars}>
                  <Link
                    href={`/software/${software.slug}/reviews`}
                    className="flex items-center gap-3 text-sm hover:opacity-80"
                  >
                    <span className="w-10 shrink-0 text-muted-foreground">★ {stars}</span>
                    <span className="w-9 shrink-0 text-xs text-muted-foreground">
                      ({distribution[stars]})
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${(distribution[stars] / maxDist) * 100}%`,
                          backgroundColor: brandColor,
                        }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <h3 className="mb-4 text-lg font-bold">Sorted by most recent</h3>
            {recentReviews.items.length === 0 ? (
              <p className="rounded-2xl border bg-white p-10 text-center text-muted-foreground card-shadow">
                No reviews published yet.
              </p>
            ) : (
              <div className="space-y-5">
                {recentReviews.items.map((r) => (
                  <ReviewCard key={r.id} review={r} vendorName={software.vendor_name} />
                ))}
              </div>
            )}
            {software.review_count > 3 && (
              <div className="mt-6 text-center">
                <Link
                  href={`/software/${software.slug}/reviews`}
                  className="inline-flex rounded-xl border px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: `${brandColor}E0`,
                    borderColor: "rgba(255,255,255,0.25)",
                    boxShadow: `0 8px 24px -6px ${brandColor}66, inset 0 1px 0 rgba(255,255,255,0.25)`,
                  }}
                >
                  View all {software.review_count} reviews
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

    </ProfileShell>
  );
}
