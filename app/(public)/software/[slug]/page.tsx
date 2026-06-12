import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Minus, Plus, X, Globe, Headphones, Pencil, Puzzle, Flame, ArrowUpRight } from "lucide-react";
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
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { FeaturesSection } from "@/components/public/FeaturesSection";
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
    <div className="rounded-[16px] bg-zinc-50/50 dark:bg-zinc-900/20 p-5">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-555 dark:text-zinc-405 text-sm">
            {review.reviewer_name.charAt(0)}
          </div>
          <span
            className={`absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-white ${positive ? "bg-emerald-500" : "bg-rose-500"}`}
          >
            {positive ? (
              <Plus className="h-2 w-2 text-white" />
            ) : (
              <Minus className="h-2 w-2 text-white" />
            )}
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">{review.reviewer_name}</p>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-555 font-medium">
            {[review.reviewer_job_title, review.reviewer_company_size && `${review.reviewer_company_size} employees`]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

function getFallbackDescription(name: string, index: number): string {
  const lower = name.toLowerCase();
  if (lower.includes("start") || lower.includes("lite") || lower.includes("free") || index === 0) {
    return "Ideal for businesses ready to explore and get started with basic operations";
  }
  if (lower.includes("standard") || lower.includes("pro") || lower.includes("essential") || index === 1) {
    return "Built for companies that want to gain an edge with advanced features and automation";
  }
  return "For businesses aiming to scale their operations with full capability and custom integration";
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
      getReviewsForSoftware(software.id, { perPage: 30, sort: "recent" }),
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
      <section id="description" className="reveal-on-scroll scroll-mt-32">
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
                            className="h-full rounded-full animate-fill-bar"
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
                            className="h-full rounded-full bg-navy animate-fill-bar"
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
      <section id="faqs" className="reveal-on-scroll mt-20 scroll-mt-32 border-t border-black/[0.06] dark:border-white/[0.06] pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Heading and Support contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between py-1">
            <div className="space-y-6">
              <span
                className="inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400"
              >
                FAQ
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl font-heading leading-tight">
                Frequently Asked<br />Questions
              </h2>
            </div>
            
            <div className="space-y-5 mt-12 lg:mt-0">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-sans">
                  Still have a question?
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans">
                  <Link
                    href="/contact"
                    className="font-bold text-zinc-900 dark:text-zinc-50 hover:underline"
                  >
                    Contact us!
                  </Link>{" "}
                  We&apos;ll be happy to help you.
                </p>
              </div>
              
              {/* Overlapping support avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Support team member"
                    className="h-12 w-12 rounded-full border-2 border-white dark:border-zinc-950 object-cover shadow-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Support team member"
                    className="h-12 w-12 rounded-full border-2 border-white dark:border-zinc-950 object-cover shadow-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Support team member"
                    className="h-12 w-12 rounded-full border-2 border-white dark:border-zinc-950 object-cover shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <FaqAccordion items={faqs} brandColor={brandColor} />
          </div>
        </div>
      </section>

      {/* ============ USERS ============ */}
      <section id="users" className="reveal-on-scroll mt-20 scroll-mt-32 border-t border-black/[0.06] dark:border-white/[0.06] pt-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">
              <span className="h-1.5 w-3.5" style={{ backgroundColor: brandColor }} />
              USERS
            </div>
            <h2 className="text-3xl font-bold font-heading tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Who uses {software.name}?
            </h2>
            <p className="text-sm text-muted-foreground leading-6">
              Typical company sizes, industries, and job titles based on verified CloudPayZA reviews.
            </p>
          </div>
          <div className="shrink-0 lg:w-72">
            <SideRatingCard
              software={software}
              label="Ease of use"
              value={Number(software.ease_of_use_rating)}
              reviewCount={software.review_count}
            />
          </div>
        </div>

        <div className="mt-10">
          {reviews.length === 0 ? (
            <p className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-10 text-center text-zinc-500 dark:text-zinc-400 font-sans">
              User demographics will appear once reviews are published.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {/* Company size */}
              <div className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm flex flex-col justify-between min-h-[320px]">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-550 text-lg">Company size</h3>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    Based on {reviews.length} reviews
                  </span>
                </div>
                <div className="mt-8 flex h-44 items-end justify-around gap-4">
                  {Object.entries(sizeBuckets).map(([label, count]) => {
                    const pct = sizeTotal ? Math.round((count / sizeTotal) * 100) : 0;
                    return (
                      <div key={label} className="flex h-full w-16 flex-col items-center justify-end gap-2">
                        <span className="text-sm font-bold text-zinc-850 dark:text-zinc-150">{pct}%</span>
                        <div
                          className="w-7 rounded-t-full transition-all duration-500"
                          style={{
                            height: `${Math.max(4, pct)}%`,
                            backgroundColor: count === Math.max(...Object.values(sizeBuckets)) ? brandColor : "var(--border)",
                          }}
                        />
                        <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 leading-4">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top job functions */}
              <div className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm flex flex-col justify-between min-h-[320px]">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-550 text-lg">Top job functions</h3>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    Based on {reviews.length} reviews
                  </span>
                </div>
                {jobData.length > 0 ? (
                  <div className="flex flex-col justify-between h-full pt-6">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-150">{jobData[0].label}</p>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
                      >
                        ↗ {topJobPct}%
                      </span>
                    </div>
                    <div className="mt-6">
                      <DonutChart data={jobData} color={brandColor} size={110} />
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 py-6 font-sans">Not enough data yet.</p>
                )}
              </div>

              {/* Top industries */}
              <div className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm flex flex-col justify-between min-h-[320px]">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-550 text-lg">Top industries</h3>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    Based on {reviews.length} reviews
                  </span>
                </div>
                {industryData.length > 0 ? (
                  <div className="flex flex-col justify-between h-full pt-6">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-150">{industryData[0].label}</p>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
                      >
                        Top Sector
                      </span>
                    </div>
                    <div className="mt-6">
                      <DonutChart data={industryData} color={brandColor} size={110} />
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 py-6 font-sans">Not enough data yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ PROS AND CONS ============ */}
      <section id="pros-cons" className="reveal-on-scroll mt-20 scroll-mt-32 border-t border-black/[0.06] dark:border-white/[0.06] pt-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">
              <span className="h-1.5 w-3.5" style={{ backgroundColor: brandColor }} />
              PROS & CONS
            </div>
            <h2 className="text-3xl font-bold font-heading tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Pros & Cons in Reviews
            </h2>
            <p className="text-sm text-muted-foreground leading-6">
              Real advantages and drawbacks of {software.name} highlighted by verified users.
            </p>
          </div>
          <div className="shrink-0 lg:w-72">
            <SideRatingCard
              software={software}
              label="Overall sentiment"
              value={Number(software.overall_rating)}
              reviewCount={software.review_count}
            />
          </div>
        </div>

        <div className="mt-10">
          {!proReview && !conReview ? (
            <p className="rounded-[20px] bg-white dark:bg-zinc-950 p-10 text-center text-zinc-500 dark:text-zinc-400 font-sans shadow-sm">
              Pros and cons will appear here once reviews are published.
            </p>
          ) : (
            <div>
              <div className="grid gap-6 md:grid-cols-2">
                {proReview && (
                  <div className="rounded-[20px] bg-white dark:bg-zinc-950 p-8 shadow-sm flex flex-col h-full justify-between gap-6">
                    <div className="space-y-4">
                      <h3 className="flex items-start gap-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50 leading-snug font-sans">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                          <Plus className="h-3.5 w-3.5" />
                        </span>
                        {firstSentence(proReview.pros as string)}
                      </h3>
                      <p className="text-xs text-zinc-400 dark:text-zinc-555 font-medium font-sans">
                        {positivePct}% positive reviews out of {totalRated}
                      </p>
                      {proReview.summary && (
                        <p className="text-sm leading-relaxed text-zinc-650 dark:text-zinc-400 font-sans">{proReview.summary}</p>
                      )}
                    </div>
                    <div className="pt-2">
                      <QuoteCard review={proReview} positive />
                    </div>
                  </div>
                )}
                {conReview && (
                  <div className="rounded-[20px] bg-white dark:bg-zinc-950 p-8 shadow-sm flex flex-col h-full justify-between gap-6">
                    <div className="space-y-4">
                      <h3 className="flex items-start gap-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50 leading-snug font-sans">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-455">
                          <Minus className="h-3.5 w-3.5" />
                        </span>
                        {firstSentence(conReview.cons as string)}
                      </h3>
                      <p className="text-xs text-zinc-400 dark:text-zinc-555 font-medium font-sans">
                        {negativePct}% negative reviews out of {totalRated}
                      </p>
                      {conReview.summary && (
                        <p className="text-sm leading-relaxed text-zinc-650 dark:text-zinc-400 font-sans">{conReview.summary}</p>
                      )}
                    </div>
                    <div className="pt-2">
                      <QuoteCard review={conReview} positive={false} />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/software/${software.slug}/reviews`}
                  className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-85 transition-opacity"
                  style={{ color: brandColor }}
                >
                  Expand to view all &darr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="reveal-on-scroll mt-16 scroll-mt-32">
        <FeaturesSection
          slug={software.slug}
          softwareName={software.name}
          rawFeatures={software.features as string[]}
          brandColor={brandColor}
          sideCard={
            <SideRatingCard
              software={software}
              label="Features"
              value={Number(software.functionality_rating)}
              reviewCount={software.review_count}
            />
          }
        />
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="reveal-on-scroll mt-20 scroll-mt-32 border-t border-black/[0.06] dark:border-white/[0.06] pt-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">
              <span className="h-1.5 w-3.5" style={{ backgroundColor: brandColor }} />
              PRICING PLANS
            </div>
            <h2 className="text-3xl font-bold font-heading tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {software.name} Pricing
            </h2>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground pt-1">
              {software.free_trial ? (
                <span className="inline-flex items-center gap-1.5 text-success">
                  <Check className="h-4 w-4" /> Free Trial Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <X className="h-4 w-4" /> No free trial
                </span>
              )}
              {software.free_version && (
                <span className="inline-flex items-center gap-1.5 text-success before:content-['•'] before:mr-2 before:text-muted-foreground">
                  Free Version Available
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 lg:w-72">
            <SideRatingCard
              software={software}
              label="Value for money"
              value={Number(software.value_for_money_rating)}
              reviewCount={software.review_count}
            />
          </div>
        </div>

        <div className="mt-10 w-full">
          {(software.pricing_plans?.length ?? 0) > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 w-full">
              {software.pricing_plans.map((plan, i) => {
                // Highlight the middle card when there are 3, or the second when there are 2.
                const isPopular =
                  software.pricing_plans.length > 1 &&
                  (software.pricing_plans.length === 3 ? i === 1 : i === software.pricing_plans.length - 1);
                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col rounded-[28px] border bg-zinc-50/40 dark:bg-zinc-900/10 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                      isPopular
                        ? "border-zinc-350 dark:border-zinc-700 shadow-md shadow-zinc-250/25 bg-white dark:bg-zinc-950"
                        : "border-zinc-200 dark:border-zinc-800 shadow-sm"
                    }`}
                  >
                    {/* Card Header: Title and Popular Badge */}
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-heading">
                        {plan.name}
                      </h3>
                      {isPopular && (
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-3 py-1 text-[11px] font-bold text-white shadow-md dark:bg-zinc-800"
                        >
                          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0 mr-1" />
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Price Section */}
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                        {Number(plan.price) === 0
                          ? "Free"
                          : formatPrice(plan.price, plan.currency)}
                      </span>
                      <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                        /{plan.billing}
                      </span>
                    </div>

                    {/* Fallback Description */}
                    <p className="mt-4 text-sm leading-relaxed text-zinc-650 dark:text-zinc-400 font-sans min-h-[44px]">
                      {getFallbackDescription(plan.name, i)}
                    </p>

                    {/* Call to Action Button */}
                    <div className="mt-6">
                      <Link
                        href={software.affiliate_url ?? "#"}
                        style={isPopular ? { backgroundColor: brandColor } : undefined}
                        className={`w-full rounded-[16px] py-3.5 px-4 font-semibold flex items-center justify-center gap-1.5 transition-all text-sm font-sans cursor-pointer ${
                          isPopular
                            ? "text-white shadow-lg shadow-zinc-950/10 hover:opacity-90"
                            : "bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-850"
                        }`}
                      >
                        Get Started <ArrowUpRight className="h-4.5 w-4.5 shrink-0" />
                      </Link>
                    </div>

                    {/* Dotted Divider */}
                    <div className="border-t border-dotted border-zinc-300 dark:border-zinc-700 my-6" />

                    {/* Features List */}
                    <ul className="space-y-4 flex-1">
                      {plan.features.filter(Boolean).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-snug">
                          <Check className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/10 p-8 shadow-sm max-w-md">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-heading">
                Standard Plan
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                  {software.starting_price !== null
                    ? formatPrice(software.starting_price, software.price_currency)
                    : "Custom"}
                </span>
                {software.starting_price !== null && (
                  <span className="text-sm font-medium text-zinc-400 dark:text-zinc-505">
                    /{software.billing_period}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-650 dark:text-zinc-400 font-sans">
                Contact the vendor directly to get custom pricing options tailored to your business needs.
              </p>
              
              <div className="mt-6">
                <Link
                  href={software.affiliate_url ?? "#"}
                  className="w-full rounded-[16px] py-3.5 px-4 font-semibold flex items-center justify-center gap-1.5 transition-all text-sm font-sans bg-zinc-950 text-white shadow-lg shadow-zinc-950/25 hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-none cursor-pointer"
                >
                  Contact Vendor <ArrowUpRight className="h-4.5 w-4.5 shrink-0" />
                </Link>
              </div>
              
              <div className="border-t border-dotted border-zinc-300 dark:border-zinc-700 my-6" />
              
              <div className="mt-3">
                <PricingOptions software={software} />
              </div>
            </div>
          )}
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
                        className="block h-full rounded-full animate-fill-bar"
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

            {/* Average Sub-ratings Breakdown (Framer inspired) */}
            <div className="mt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-6 space-y-4">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-heading tracking-wider uppercase">
                Average Ratings
              </h4>
              <div className="space-y-3.5">
                {(
                  [
                    ["Ease of Use", software.ease_of_use_rating],
                    ["Value for Money", software.value_for_money_rating],
                    ["Customer Service", software.customer_service_rating],
                    ["Functionality", software.functionality_rating],
                  ] as const
                ).map(([label, val]) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-zinc-500 dark:text-zinc-400 font-sans">{label}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-50 font-sans">{formatRating(Number(val))}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden">
                      <div
                        className="h-full rounded-full animate-fill-bar"
                        style={{
                          width: `${(Number(val) / 5) * 100}%`,
                          backgroundColor: brandColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                  <ReviewCard key={r.id} review={r} vendorName={software.vendor_name} brandColor={brandColor} />
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
