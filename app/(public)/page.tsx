import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/public/SearchBar";
import { SoftwareCard } from "@/components/public/SoftwareCard";
import { CategoryCard } from "@/components/public/CategoryCard";
import { formatDateShort } from "@/lib/utils/formatDate";
import {
  getCategories,
  getFeaturedSoftware,
  getLatestArticles,
  getRecentlyUpdatedSoftware,
  getSiteStats,
  getTopRatedSoftware,
} from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "CloudPayZA — Find the Right Business Software in South Africa",
  description:
    "Discover verified reviews, expert comparisons, and unbiased ratings to make confident software decisions for your South African business.",
  alternates: { canonical: "/" },
};

const popularTags = [
  { label: "Accounting Software", href: "/category/accounting-software" },
  { label: "Payroll", href: "/category/payroll-software" },
  { label: "HR Software", href: "/category/hr-software" },
  { label: "CRM", href: "/category/crm-software" },
  { label: "ERP", href: "/category/erp-software" },
];

export default async function HomePage() {
  const [stats, categories, featured, topRated, recent, articles] = await Promise.all([
    getSiteStats(),
    getCategories(8),
    getFeaturedSoftware(4),
    getTopRatedSoftware(4),
    getRecentlyUpdatedSoftware(3),
    getLatestArticles(3),
  ]);

  const heroSoftware = featured.length > 0 ? featured : topRated;

  return (
    <>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="container-site max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Find the Right Business Software in{" "}
            <span className="text-brand">South Africa</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Discover verified reviews, expert comparisons, and unbiased ratings to make
            confident software decisions for your business.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <SearchBar size="lg" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="rounded-full border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y bg-background">
        <div className="container-site grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: stats.reviews, label: "Verified Reviews" },
            { value: stats.software, label: "Software Listed" },
            { value: stats.categories, label: "Categories" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-10">
              <p className="text-4xl font-extrabold tracking-tight text-foreground">
                {s.value.toLocaleString("en-ZA")}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-site py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Popular Software Categories</h2>
          <Link href="/categories" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/categories" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Top rated */}
      <section className="border-t bg-background py-20">
        <div className="container-site">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Top Rated Software in South Africa
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(heroSoftware.length > 0 ? heroSoftware : []).map((s) => (
              <SoftwareCard key={s.id} software={s} />
            ))}
          </div>
          {heroSoftware.length === 0 && (
            <p className="mt-8 rounded-xl border border-dashed p-12 text-center text-muted-foreground">
              Software listings will appear here once published from the admin panel.
            </p>
          )}
        </div>
      </section>

      {/* Recently reviewed */}
      {recent.length > 0 && (
        <section className="border-t bg-background py-20">
          <div className="container-site">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Recently Reviewed</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((s) => (
                <SoftwareCard key={s.id} software={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog preview */}
      {articles.length > 0 && (
        <section className="border-t bg-white py-14">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-foreground">Expert Guides &amp; Reviews</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="group overflow-hidden rounded-lg border bg-white card-shadow transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video bg-muted">
                    {a.featured_image_url ? (
                      <Image
                        src={a.featured_image_url}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl">📰</div>
                    )}
                  </div>
                  <div className="p-5">
                    {a.category_tag && (
                      <span className="text-xs font-semibold tracking-wide text-brand uppercase">
                        {a.category_tag}
                      </span>
                    )}
                    <h3 className="mt-1 line-clamp-2 font-semibold text-foreground group-hover:text-brand">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {a.author_name} · {formatDateShort(a.published_date)} ·{" "}
                      {a.read_time_minutes} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
