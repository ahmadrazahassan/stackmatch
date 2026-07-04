import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Star, Trophy, ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { ComparisonMatrix } from "@/components/public/ComparisonMatrix";
import { PricingCards } from "@/components/public/PricingCards";
import { RatingsBarChart, PriceBarChart, CategoryGauges, SentimentWaffle } from "@/components/public/CompareCharts";
import { AffiliateCTAButton } from "@/components/public/AffiliateCTAButton";
import { AffiliateDisclosureNote } from "@/components/public/AffiliateDisclosureNote";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { CompareStickyBar } from "@/components/public/CompareStickyBar";
import {
  getComparisonRecord,
  getRatingDistribution,
  getReviewsForSoftware,
  getSoftwareBySlug,
} from "@/lib/supabase/queries";
import type { Review, Software } from "@/lib/types";
import { brandColorFor } from "@/lib/brandColors";
import { formatRating, formatPrice } from "@/lib/utils/formatRating";

export const revalidate = 3600;

const SAGE_SLUG = "sage-accounting";

async function resolvePair(pair: string): Promise<[Software, Software] | null> {
  const parts = pair.split("-vs-");
  if (parts.length < 2) return null;
  for (let i = 1; i < parts.length; i++) {
    const slugA = parts.slice(0, i).join("-vs-");
    const slugB = parts.slice(i).join("-vs-");
    const [a, b] = await Promise.all([getSoftwareBySlug(slugA), getSoftwareBySlug(slugB)]);
    if (a && b) return [a, b];
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const resolved = await resolvePair(pair);
  if (!resolved) return { title: "Comparison Not Found" };
  const [a, b] = resolved;
  const comparison = await getComparisonRecord(a.id, b.id);
  const title =
    comparison?.meta_title ?? `${a.name} vs ${b.name} ${new Date().getFullYear()} — Which Is Better?`;
  const description =
    comparison?.meta_description ??
    `${a.name} vs ${b.name} compared for UK SMBs: pricing, ratings, features and our verdict.`;
  return {
    title,
    description,
    alternates: { canonical: `/compare/${a.slug}-vs-${b.slug}` },
    openGraph: {
      title,
      description,
      locale: "en_GB",
      type: "website",
      images: [
        `/api/og?title=${encodeURIComponent(`${a.name} vs ${b.name}`)}&subtitle=${encodeURIComponent("Head-to-head comparison")}`,
      ],
    },
  };
}

/* ---------------------------------- helpers ---------------------------------- */

const RATING_KEYS = [
  ["Ease of Use", "ease_of_use_rating"],
  ["Value for Money", "value_for_money_rating"],
  ["Customer Service", "customer_service_rating"],
  ["Functionality", "functionality_rating"],
] as const;

type Distribution = Record<1 | 2 | 3 | 4 | 5, number>;

/** Editorial section header: eyebrow + heading + optional subtitle. */
function SectionHead({
  id,
  eyebrow,
  title,
  subtitle,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="mt-2.5 text-[1.7rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Clean bordered panel (replaces the dashed card). */
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

/** Two columns split by a hairline centre rule. */
function SplitColumns({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-800">
      <div className="md:pr-10">{left}</div>
      <div className="md:pl-10">{right}</div>
    </div>
  );
}

function QuoteCard({ review, positive }: { review: Review; positive: boolean }) {
  const quote = positive ? review.pros : review.cons;
  if (!quote) return null;
  return (
    <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {review.reviewer_name.charAt(0)}
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-white ${positive ? "bg-emerald-500" : "bg-rose-500"}`}
          >
            {positive ? <Plus className="h-2 w-2" /> : <Minus className="h-2 w-2" />}
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-50">
            {review.reviewer_name}
          </p>
          <p className="truncate text-xs font-medium text-zinc-400 dark:text-zinc-500">
            {[review.reviewer_job_title, review.reviewer_company_size && `${review.reviewer_company_size} employees`]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </div>
      <p className="mt-3.5 line-clamp-4 text-[14px] leading-7 text-zinc-600 dark:text-zinc-300">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default async function ComparePage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const resolved = await resolvePair(pair);
  if (!resolved) notFound();
  const [a, b] = resolved;

  const [comparison, distA, distB, reviewsA, reviewsB] = await Promise.all([
    getComparisonRecord(a.id, b.id),
    getRatingDistribution(a.id),
    getRatingDistribution(b.id),
    getReviewsForSoftware(a.id, { perPage: 20, sort: "helpful" }),
    getReviewsForSoftware(b.id, { perPage: 20, sort: "helpful" }),
  ]);

  const colorA = brandColorFor(a);
  const colorB = brandColorFor(b, "#1E3A5F");

  const sides = [
    { s: a, color: colorA, other: b, dist: distA, reviews: reviewsA.items },
    { s: b, color: colorB, other: a, dist: distB, reviews: reviewsB.items },
  ];

  const totals = (d: Distribution) => Object.values(d).reduce((x, y) => x + y, 0);

  const quotesFor = (reviews: Review[]) => {
    const pro = reviews.filter((r) => r.pros).sort((x, y) => y.overall_rating - x.overall_rating)[0] ?? null;
    const con =
      reviews.filter((r) => r.cons && r.id !== pro?.id).sort((x, y) => x.overall_rating - y.overall_rating)[0] ?? null;
    return { pro, con };
  };

  const SCORE_KEYS = [["Overall Rating", "overall_rating"], ...RATING_KEYS] as const;

  const scoreRows = SCORE_KEYS.map(([label, key]) => {
    const va = Number(a[key]);
    const vb = Number(b[key]);
    const winner = Math.abs(va - vb) < 0.05 ? "tie" : va > vb ? "a" : "b";
    return { label, key, va, vb, winner };
  });

  const winsA = scoreRows.filter((r) => r.winner === "a").length;
  const winsB = scoreRows.filter((r) => r.winner === "b").length;
  const leader = winsA > winsB ? sides[0] : winsB > winsA ? sides[1] : null;
  const leaderWins = Math.max(winsA, winsB);

  const sageSide = sides.find((side) => side.s.slug === SAGE_SLUG) ?? null;
  const sageOther = sageSide?.other ?? null;
  const sageWins = sageSide
    ? scoreRows.filter((r) => Number(sageSide.s[r.key]) >= Number(sageSide.other[r.key]) + 0.05).length
    : 0;

  const verdictLine = (() => {
    if (sageSide && sageOther) {
      if (sageWins >= 3) {
        return `Across the ${scoreRows.length} categories we score, ${sageSide.s.name} leads ${sageOther.name} in ${sageWins} — making it our pick for UK small businesses that want compliant, locally supported accounting without the overhead.`;
      }
      return `${sageSide.s.name} and ${sageOther.name} are closely matched, but ${sageSide.s.name}'s local VAT compliance, HMRC-ready reporting and UK support give it a meaningful edge for UK-based teams.`;
    }
    if (leader) {
      return `On the data we track, ${leader.s.name} leads in ${leaderWins} of ${scoreRows.length} categories. Weigh that against your budget and the features that matter most to your team.`;
    }
    return `These two products are evenly matched on our ratings — your choice will come down to pricing, local support and the specific features your team relies on.`;
  })();

  const highlightedId = sageSide?.s.id ?? (Number(a.overall_rating) >= Number(b.overall_rating) ? a.id : b.id);
  const pricingCards = sides.map(({ s, color }) => {
    const top = (s.top_features as string[]) ?? [];
    const feats = top.length ? top : (s.features as string[]) ?? [];
    return {
      id: s.id,
      name: s.name,
      tagline: s.description_short,
      price: s.starting_price,
      currency: s.price_currency,
      period: s.billing_period,
      features: feats,
      badgeLabel: s.free_trial ? "Free trial" : "Available now",
      highlighted: s.id === highlightedId,
      accentColor: color,
      ctaSoftwareId: s.id,
      ctaLabel: "Get Started",
    };
  });

  const updated = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  const navItems = [
    { label: "Scorecard", anchor: "#scorecard" },
    { label: "Ratings", anchor: "#ratings" },
    { label: "Sentiment", anchor: "#sentiment" },
    { label: "Pricing", anchor: "#pricing" },
    { label: "Features", anchor: "#features" },
    { label: "Reviews", anchor: "#reviews" },
    { label: "Verdict", anchor: "#verdict" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${a.name} vs ${b.name}`,
    description: `Side-by-side comparison of ${a.name} and ${b.name}: pricing, ratings, features and verdict.`,
  };

  return (
    <div className="pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CompareStickyBar
        a={{ name: a.name, slug: a.slug, logo_url: a.logo_url, overall_rating: Number(a.overall_rating) }}
        b={{ name: b.name, slug: b.slug, logo_url: b.logo_url, overall_rating: Number(b.overall_rating) }}
        navItems={navItems}
      />

      {/* ---------- Header ---------- */}
      <div className="container-site pt-6">
        <Breadcrumb items={[{ label: "Compare", href: "/compare" }, { label: `${a.name} vs ${b.name}` }]} />
        <div className="mt-9 border-b border-zinc-200 pb-10 dark:border-zinc-800">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            Comparison
          </p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.75rem]">
            {a.name} <span className="text-zinc-300 dark:text-zinc-600">vs</span> {b.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            A data-driven, side-by-side comparison for UK businesses. Provider data is verified by our
            research team and every review is moderated before publishing.
          </p>
          <p className="mt-6 text-[13px] font-medium text-zinc-400 dark:text-zinc-500">Updated {updated}</p>
          <AffiliateDisclosureNote className="mt-3" />
        </div>
      </div>

      {/* ---------- Versus hero ---------- */}
      <div className="container-site mt-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative grid overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 md:grid-cols-2">
            {/* centre VS badge */}
            <span className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-[11px] font-bold uppercase tracking-wider text-zinc-400 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:flex">
              vs
            </span>
            {sides.map(({ s, color }, i) => (
              <div
                key={s.id}
                className={`p-8 sm:p-9 ${i === 0 ? "md:border-r md:border-zinc-200 dark:md:border-zinc-800" : "border-t border-zinc-200 dark:border-zinc-800 md:border-t-0"}`}
                style={{ borderTop: `3px solid ${color}` }}
              >
                <div className="flex items-start gap-4">
                  <SoftwareLogo src={s.logo_url} name={s.name} size={52} />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/software/${s.slug}`}
                      className="text-[1.15rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:text-brand dark:text-zinc-50 font-heading"
                    >
                      {s.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                        {formatRating(Number(s.overall_rating))}
                      </span>
                      <span className="text-[12px] text-zinc-400 dark:text-zinc-500">
                        ({s.review_count.toLocaleString("en-GB")} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
                      Starting price
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                      {s.starting_price !== null
                        ? formatPrice(s.starting_price, s.price_currency, s.billing_period)
                        : "Custom"}
                    </p>
                  </div>
                  <AffiliateCTAButton softwareId={s.id} label="Visit website" brandColor={color} radius="rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Sections ---------- */}
      <div className="container-site mt-20">
        <div className="mx-auto max-w-5xl space-y-24">
          {/* SCORECARD */}
          <section>
            <SectionHead
              id="scorecard"
              eyebrow="At a glance"
              title="Who wins, category by category"
              subtitle="Category-by-category winners based on verified user ratings, each scored out of 5."
            />
            <Panel className="mt-8">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="flex items-center gap-3">
                  <SoftwareLogo src={sides[0].s.logo_url} name={sides[0].s.name} size={40} />
                  <p className="hidden text-[15px] font-semibold text-zinc-900 dark:text-zinc-50 sm:block">
                    {sides[0].s.name}
                  </p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 dark:text-zinc-600">
                  vs
                </span>
                <div className="flex items-center justify-end gap-3 text-right">
                  <p className="hidden text-[15px] font-semibold text-zinc-900 dark:text-zinc-50 sm:block">
                    {sides[1].s.name}
                  </p>
                  <SoftwareLogo src={sides[1].s.logo_url} name={sides[1].s.name} size={40} />
                </div>
              </div>

              <div className="mt-7 space-y-4 border-t border-zinc-100 pt-7 dark:border-zinc-900">
                {scoreRows.map(({ label, va, vb, winner }) => (
                  <div key={label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm sm:gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-9 text-right font-semibold tabular-nums ${winner === "a" ? "" : "text-zinc-400 dark:text-zinc-500"}`}
                        style={winner === "a" ? { color: colorA } : undefined}
                      >
                        {formatRating(va)}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div className="h-full rounded-full" style={{ width: `${(va / 5) * 100}%`, backgroundColor: colorA, opacity: winner === "b" ? 0.4 : 1 }} />
                      </div>
                    </div>
                    <div className="flex w-24 flex-col items-center sm:w-36">
                      <span className="text-center text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">{label}</span>
                      {winner !== "tie" && (
                        <span
                          className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ backgroundColor: `${winner === "a" ? colorA : colorB}14`, color: winner === "a" ? colorA : colorB }}
                        >
                          <Trophy className="h-2.5 w-2.5" />
                          {winner === "a" ? a.name : b.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div className="h-full rounded-full" style={{ width: `${(vb / 5) * 100}%`, backgroundColor: colorB, opacity: winner === "a" ? 0.4 : 1 }} />
                      </div>
                      <span
                        className={`w-9 font-semibold tabular-nums ${winner === "b" ? "" : "text-zinc-400 dark:text-zinc-500"}`}
                        style={winner === "b" ? { color: colorB } : undefined}
                      >
                        {formatRating(vb)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          {/* RATINGS ANALYTICS */}
          <section>
            <SectionHead
              id="ratings"
              eyebrow="Analytics"
              title="Ratings, visualised"
              subtitle="The four dimensions every reviewer rates, shown two ways — bars for side-by-side magnitude, gauges for the head-to-head on each."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Panel>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                  Rating by category
                </h3>
                <RatingsBarChart
                  a={{ name: a.name, color: colorA, ratings: ratingsOf(a) }}
                  b={{ name: b.name, color: colorB, ratings: ratingsOf(b) }}
                />
              </Panel>
              <Panel>
                <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                  Head to head by category
                </h3>
                <CategoryGauges
                  a={{ name: a.name, color: colorA, ratings: ratingsOf(a) }}
                  b={{ name: b.name, color: colorB, ratings: ratingsOf(b) }}
                />
              </Panel>
            </div>
          </section>

          {/* SENTIMENT */}
          <section>
            <SectionHead
              id="sentiment"
              eyebrow="Sentiment"
              title="How reviewers feel"
              subtitle="Positive (4 to 5 stars), neutral (3 stars) and negative (1 to 2 stars) sentiment across all verified reviews."
            />
            <Panel className="mt-8">
              <SplitColumns
                left={<SentimentColumn side={sides[0]} total={totals(distA)} />}
                right={<SentimentColumn side={sides[1]} total={totals(distB)} />}
              />
            </Panel>
          </section>

          {/* PRICING */}
          <section>
            <SectionHead
              id="pricing"
              eyebrow="Pricing"
              title="Pricing compared"
              subtitle="Entry price, free plans and trials at a glance. A lower starting price is not everything, but it is where most UK businesses begin."
            />
            <Panel className="mt-8">
              <PriceBarChart
                a={{ name: a.name, color: colorA, price: a.starting_price, currency: a.price_currency, period: a.billing_period }}
                b={{ name: b.name, color: colorB, price: b.starting_price, currency: b.price_currency, period: b.billing_period }}
              />
            </Panel>
            <div className="mt-6">
              <PricingCards cards={pricingCards} />
            </div>
          </section>

          {/* FEATURES */}
          <section>
            <SectionHead
              id="features"
              eyebrow="Features"
              title="Full feature comparison"
              subtitle={`Every data point we track for ${a.name} and ${b.name}, side by side.`}
            />
            <div className="mt-8">
              <ComparisonMatrix a={a} b={b} />
            </div>
          </section>

          {/* USER REVIEWS */}
          <section>
            <SectionHead
              id="reviews"
              eyebrow="Voices"
              title="What real users say"
              subtitle="The strongest praise and the most common complaint, pulled from verified reviews of each product."
            />
            <Panel className="mt-8">
              <SplitColumns
                left={<ReviewsColumn side={sides[0]} quotes={quotesFor(reviewsA.items)} />}
                right={<ReviewsColumn side={sides[1]} quotes={quotesFor(reviewsB.items)} />}
              />
            </Panel>
          </section>

          {/* VERDICT */}
          <section id="verdict" className="scroll-mt-28">
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/20 sm:p-11">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  Our verdict
                </p>
                {leader && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: `${leader.color}14`, color: leader.color }}
                  >
                    <Trophy className="h-3 w-3" />
                    {leader.s.name} leads {leaderWins}/{scoreRows.length}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-[1.7rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2rem]">
                Which should you choose?
              </h2>
              <div className="mt-6 max-w-3xl">
                {comparison?.custom_verdict ? (
                  <div className="article-content">
                    {comparison.custom_verdict.split(/\n\s*\n/).map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[17px] leading-[1.85] text-zinc-700 dark:text-zinc-300">{verdictLine}</p>
                )}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {(sageSide ? [sageSide.s, sageSide.other] : [a, b]).map((s) => (
                  <AffiliateCTAButton
                    key={s.id}
                    softwareId={s.id}
                    label={`Visit ${s.name}`}
                    size="lg"
                    brandColor={brandColorFor(s, colorA)}
                    radius="rounded"
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  /* ------------------------- column renderers (closures) ------------------------- */

  type Side = (typeof sides)[number];

  function ratingsOf(s: Software) {
    return {
      easeOfUse: Number(s.ease_of_use_rating),
      valueForMoney: Number(s.value_for_money_rating),
      customerService: Number(s.customer_service_rating),
      functionality: Number(s.functionality_rating),
    };
  }

  function SentimentColumn({ side, total }: { side: Side; total: number }) {
    const { s, color, dist } = side;
    return (
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <SoftwareLogo src={s.logo_url} name={s.name} size={30} />
            <span className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">{s.name}</span>
          </div>
          <Link
            href={`/software/${s.slug}/reviews`}
            className="text-xs font-semibold underline-offset-2 hover:underline"
            style={{ color }}
          >
            {total.toLocaleString("en-GB")} reviews
          </Link>
        </div>
        {total > 0 ? (
          <div className="mt-5">
            <SentimentWaffle distribution={dist} total={total} />
          </div>
        ) : (
          <p className="mt-5 text-sm text-zinc-400 dark:text-zinc-500">No reviews published yet.</p>
        )}
      </div>
    );
  }

  function ReviewsColumn({
    side,
    quotes,
  }: {
    side: Side;
    quotes: { pro: Review | null; con: Review | null };
  }) {
    const { s, color } = side;
    return (
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <SoftwareLogo src={s.logo_url} name={s.name} size={30} />
          <span className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">{s.name}</span>
        </div>
        {!quotes.pro && !quotes.con ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-500">No reviews published yet.</p>
        ) : (
          <>
            {quotes.pro && <QuoteCard review={quotes.pro} positive />}
            {quotes.con && <QuoteCard review={quotes.con} positive={false} />}
          </>
        )}
        <div className="mt-auto pt-1">
          <Link
            href={`/software/${s.slug}/reviews`}
            className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-2 hover:underline"
            style={{ color }}
          >
            View {s.name} reviews
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }
}
