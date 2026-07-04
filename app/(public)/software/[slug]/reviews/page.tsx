import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getRatingDistribution,
  getReviewsForSoftware,
  getSiteSettings,
  getSoftwareBySlug,
} from "@/lib/supabase/queries";
import { ProfileShell } from "../ProfileShell";
import { AffiliateDisclosureNote } from "@/components/public/AffiliateDisclosureNote";
import { ReviewCard } from "@/components/public/ReviewCard";
import { StarRating } from "@/components/public/StarRating";
import { SentimentBar } from "@/components/public/SentimentBar";
import { Pagination } from "@/components/public/Pagination";
import { ReviewFilters } from "./ReviewFilters";
import { formatRating } from "@/lib/utils/formatRating";
import { brandColorFor } from "@/lib/brandColors";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Software Not Found" };
  return {
    title: `${software.name} Reviews ${new Date().getFullYear()} — Verified User Ratings`,
    description: `Read ${software.review_count} verified user reviews of ${software.name}. Real ratings for ease of use, value for money and support from UK businesses.`,
    alternates: { canonical: `/software/${software.slug}/reviews` },
  };
}

export default async function SoftwareReviewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    country?: string;
    industry?: string;
    size?: string;
    duration?: string;
    sort?: string;
  }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  const brandColor = brandColorFor(software);

  const page = Math.max(1, Number(sp.page) || 1);
  const [{ items: reviews, total }, distribution, settings] = await Promise.all([
    getReviewsForSoftware(software.id, {
      page,
      perPage: 10,
      country: sp.country,
      industry: sp.industry,
      companySize: sp.size,
      duration: sp.duration,
      sort: sp.sort === "helpful" ? "helpful" : "recent",
    }),
    getRatingDistribution(software.id),
    getSiteSettings(),
  ]);

  const totalReviews = Object.values(distribution).reduce((a, b) => a + b, 0);
  const maxBar = Math.max(1, ...Object.values(distribution));

  const reviewsJsonLd = reviews.slice(0, 10).map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: software.name },
    author: { "@type": "Person", name: r.reviewer_name },
    datePublished: r.review_date,
    name: r.review_title,
    reviewBody: r.summary ?? undefined,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.overall_rating,
      bestRating: 5,
      worstRating: 1,
    },
  }));

  return (
    <ProfileShell software={software} activeTab="reviews">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <h2 className="mb-2 text-xl font-bold">Verified reviews for {software.name}</h2>
      <AffiliateDisclosureNote className="mb-6" />
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left rating panel */}
        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-lg border bg-white p-5 card-shadow">
            <p className="text-center text-5xl font-extrabold text-foreground">
              {formatRating(Number(software.overall_rating))}
            </p>
            <div className="mt-2 flex justify-center">
              <StarRating rating={Number(software.overall_rating)} size="lg" />
            </div>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              {totalReviews.toLocaleString("en-GB")} reviews
            </p>

            <ul className="mt-5 space-y-1.5">
              {([5, 4, 3, 2, 1] as const).map((stars) => (
                <li key={stars} className="flex items-center gap-2 text-sm">
                  <span className="w-7 shrink-0 text-muted-foreground">{stars} ★</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-star"
                      style={{ width: `${(distribution[stars] / maxBar) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs text-muted-foreground">
                    {distribution[stars]}
                  </span>
                </li>
              ))}
            </ul>

            {totalReviews > 0 && (
              <div className="mt-5">
                <SentimentBar distribution={distribution} />
              </div>
            )}

            <Link
              href={`/software/${software.slug}/reviews/new`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-light"
            >
              Write a Review
            </Link>
          </div>
        </div>

        {/* Main column */}
        <div className="lg:col-span-9">
          <ReviewFilters basePath={`/software/${software.slug}/reviews`} />

          {reviews.length === 0 ? (
            <div className="rounded-lg border bg-white p-12 text-center text-muted-foreground card-shadow">
              No reviews match these filters yet.{" "}
              <Link href={`/software/${software.slug}/reviews`} className="text-brand hover:underline">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} vendorName={software.vendor_name} brandColor={brandColor} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / 10)}
            buildHref={(p) => {
              const q = new URLSearchParams();
              if (sp.country) q.set("country", sp.country);
              if (sp.industry) q.set("industry", sp.industry);
              if (sp.size) q.set("size", sp.size);
              if (sp.duration) q.set("duration", sp.duration);
              if (sp.sort) q.set("sort", sp.sort);
              if (p > 1) q.set("page", String(p));
              const qs = q.toString();
              return `/software/${software.slug}/reviews${qs ? `?${qs}` : ""}`;
            }}
          />
        </div>
      </div>
    </ProfileShell>
  );
}
