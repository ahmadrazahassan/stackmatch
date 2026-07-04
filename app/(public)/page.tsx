import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/public/SearchBar";
import { SoftwareCard } from "@/components/public/SoftwareCard";
import { CategoryCard } from "@/components/public/CategoryCard";
import { HomepageExplore } from "@/components/public/HomepageExplore";
import { HomepageCompare } from "@/components/public/HomepageCompare";
import { NewsletterSection } from "@/components/public/NewsletterSection";
import { GlossyButton } from "@/components/public/GlossyButton";
import { formatDateShort } from "@/lib/utils/formatDate";
import {
  getCategories,
  getFeaturedSoftware,
  getLatestArticles,
  getRecentlyUpdatedSoftware,
  getSiteSettings,
  getSiteStats,
  getTopRatedSoftware,
  getSoftwareList,
} from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Stack Match — Find the Right Business Software in the UK",
  description:
    "Discover verified reviews, expert comparisons, and unbiased ratings to make confident software decisions for your UK business.",
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
  const [stats, settings, categories, featured, topRated, recent, articles] = await Promise.all([
    getSiteStats(),
    getSiteSettings(),
    getCategories(8),
    getFeaturedSoftware(4),
    getTopRatedSoftware(4),
    getRecentlyUpdatedSoftware(4),
    getLatestArticles(4),
  ]);

  const yearsActive = settings.years_active || "4";

  const heroSoftware = featured.length > 0 ? featured : topRated;

  // Query software for Category tabs explorer
  const explorerCategories = await getCategories(5);
  const explorerData = await Promise.all(
    explorerCategories.map(async (cat) => {
      const { items } = await getSoftwareList({ categoryId: cat.id, perPage: 6 });
      return {
        category: cat,
        software: items,
      };
    })
  );

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="container-site">
          <div className="rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-10 sm:p-16 text-center shadow-sm relative overflow-hidden">
            {/* Background image cover */}
            <Image
              src="/hero.png"
              alt="Hero background"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover opacity-50 dark:opacity-15 pointer-events-none z-0"
            />
            {/* Soft background glow circles for high-end feel */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 z-0" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 z-0" />

            {/* Decorative Floating 3D Shapes */}
            <div className="absolute left-6 top-8 w-20 h-20 opacity-70 dark:opacity-30 pointer-events-none z-0 hidden md:block animate-float">
              <Image
                src="/Random/y2xlq1h3icZ4jgx95T5M5Jv9fhg.png"
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
            <div className="absolute right-6 bottom-10 w-24 h-24 opacity-80 dark:opacity-30 pointer-events-none z-0 hidden md:block animate-float-delayed">
              <Image
                src="/Random/F95XtBuIu9yRJpVFOQe6khYgo.png"
                alt=""
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <div className="absolute right-12 top-6 w-16 h-16 opacity-75 dark:opacity-20 pointer-events-none z-0 hidden lg:block animate-float">
              <Image
                src="/Random/fTvRR9UO6UHLEJxbKleRMkrgzgo.png"
                alt=""
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div className="absolute left-16 bottom-6 w-18 h-18 opacity-70 dark:opacity-20 pointer-events-none z-0 hidden lg:block animate-float-delayed">
              <Image
                src="/Random/mS28QhWcSped7JSQ7vltnisa5c8.png"
                alt=""
                fill
                sizes="72px"
                className="object-contain"
              />
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl font-heading relative z-10 leading-tight">
              Find the right software
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-400 sm:text-lg font-sans leading-relaxed relative z-10">
              Easily explore, compare, and choose the best fit tailored to your business.
            </p>
            
            <div className="mx-auto mt-10 max-w-2xl relative z-10">
              <SearchBar size="lg" className="shadow-lg rounded-full" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 relative z-10">
              <span className="text-xs font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider font-sans">Popular:</span>
              {popularTags.map((tag) => (
                <Link
                  key={tag.href}
                  href={tag.href}
                  className="inline-flex items-center rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-zinc-855 dark:text-zinc-200 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Bar card below the hero card */}
          <div className="mt-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.22)]">
            <div className="grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                {
                  value: stats.reviews > 0 ? stats.reviews.toLocaleString("en-GB") : "0",
                  label: "Verified Reviews",
                  img: "/Random/B0V3gNPI0mHpDUqWHR41pDhDfMs.png",
                },
                {
                  value: stats.software > 0 ? `${stats.software.toLocaleString("en-GB")}+` : "0",
                  label: "Software Listed",
                  img: "/Random/CoAe1eW9S1x6kWgYfFZw038Bw.png",
                },
                { value: `${yearsActive} Years`, label: "Years of Advice", img: "/Random/QBkCPoeejpECqrXOviZdvDrmKws.png" },
              ].map((s, idx) => (
                <div key={s.label} className="flex items-center justify-center gap-4 py-6 px-6 sm:px-0">
                  <div className={`relative w-12 h-12 shrink-0 ${idx % 2 === 0 ? "animate-float" : "animate-float-delayed"}`}>
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-xs font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-wider font-sans leading-none">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explorer section */}
      <HomepageExplore explorerData={explorerData} />

      {/* Side-by-side comparisons section */}
      <HomepageCompare compareSoftware={topRated} />

      {/* Top rated */}
      <section id="top-rated" className="container-site py-20 border-t border-dashed border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">
              <span className="h-1.5 w-3.5 bg-brand" />
              TOP RATED
            </div>
            <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
              Top Rated Software in the UK
            </h2>
            <p className="text-sm text-muted-foreground leading-6">
              The highest-rated business software solutions as rated by verified UK business owners and managers.
            </p>
          </div>
        </div>

        {heroSoftware.length === 0 ? (
          <p className="mt-10 rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-10 text-center text-zinc-500 dark:text-zinc-400 font-sans">
            Software listings will appear here once published from the admin panel.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroSoftware.map((s) => (
              <SoftwareCard key={s.id} software={s} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter — roughly the midpoint of the homepage */}
      <NewsletterSection />

      {/* Recently reviewed */}
      {recent.length > 0 && (
        <section id="recent-reviews" className="container-site py-20 border-t border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">
                <span className="h-1.5 w-3.5 bg-brand" />
                RECENT REVIEWS
              </div>
              <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
                Recently Reviewed Software
              </h2>
              <p className="text-sm text-muted-foreground leading-6">
                See the software applications that were recently evaluated by UK business users.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((s) => (
              <SoftwareCard key={s.id} software={s} />
            ))}
          </div>
        </section>
      )}

      {/* Blog preview */}
      {articles.length > 0 && (
        <section id="blog" className="container-site py-20 border-t border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">
                <span className="h-1.5 w-3.5 bg-brand" />
                BLOG &amp; GUIDES
              </div>
              <h2 className="text-3xl font-bold font-heading tracking-tight text-foreground sm:text-4xl">
                Expert Guides &amp; Reviews
              </h2>
              <p className="text-sm text-muted-foreground leading-6">
                Browse our articles, expert guides, and comparison reports to help you navigate software procurement.
              </p>
            </div>
            <div className="shrink-0">
              <GlossyButton href="/blog" label="View all articles" variant="neutral" fullWidth={false} />
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 font-sans shadow-[0_10px_30px_-18px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(0,0,0,0.28)]"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-[16px] border bg-muted">
                    {a.featured_image_url ? (
                      <Image
                        src={a.featured_image_url}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl">ðŸ“°</div>
                    )}
                  </div>
                  <div>
                    {a.category_tag && (
                      <span className="text-[10px] font-bold tracking-wider text-brand uppercase">
                        {a.category_tag}
                      </span>
                    )}
                    <h3 className="mt-1 font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-brand transition-colors line-clamp-2 text-base leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {a.excerpt}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                  <span>By {a.author_name}</span>
                  <span>{formatDateShort(a.published_date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
