import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { NewsletterSection } from "@/components/public/NewsletterSection";
import { Pagination } from "@/components/public/Pagination";
import { getArticles } from "@/lib/supabase/queries";
import { formatDateShort } from "@/lib/utils/formatDate";
import type { Article } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expert Guides & Software Reviews Blog",
  description:
    "Expert guides, in-depth reviews and comparisons to help UK businesses choose the right software.",
  alternates: { canonical: "/blog" },
};

function Meta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-400 dark:text-zinc-500">
      <span>{article.author_name}</span>
      <span aria-hidden>·</span>
      <span>{formatDateShort(article.published_date)}</span>
      {article.read_time_minutes ? (
        <>
          <span aria-hidden>·</span>
          <span>{article.read_time_minutes} min read</span>
        </>
      ) : null}
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const { items, total } = await getArticles(page, 10);

  // On page 1, promote the newest article to a featured lead.
  const featured = page === 1 ? items[0] : undefined;
  const rest = featured ? items.slice(1) : items;

  return (
    <div className="pb-28">
      {/* ---------- Header ---------- */}
      <div className="container-site">
        <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            Resources
          </p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
            Guides &amp; insights
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            In-depth guides, honest comparisons and practical advice to help UK businesses choose,
            switch and get the most from their software.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="container-site mt-14">
          <p className="rounded-2xl border border-zinc-200 bg-white p-12 text-center text-[15px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Articles will appear here once published from the admin panel.
          </p>
        </div>
      ) : (
        <div className="container-site mt-14">
          {/* Featured lead */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 lg:aspect-auto">
                {featured.featured_image_url ? (
                  <Image
                    src={featured.featured_image_url}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                    <span className="text-6xl">✦</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-9 sm:p-12">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    Featured
                  </span>
                  {featured.category_tag && (
                    <>
                      <span aria-hidden className="text-zinc-300 dark:text-zinc-700">
                        ·
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                        {featured.category_tag}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-zinc-900 transition-colors group-hover:text-brand dark:text-zinc-50 font-heading sm:text-[1.7rem]">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <Meta article={featured} />
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-zinc-900 transition-colors group-hover:text-brand dark:text-zinc-100">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_18px_44px_-28px_rgba(0,0,0,0.3)] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    {a.featured_image_url ? (
                      <Image
                        src={a.featured_image_url}
                        alt={a.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <span className="text-4xl">✦</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {a.category_tag && (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                        {a.category_tag}
                      </span>
                    )}
                    <h2 className="mt-2.5 line-clamp-2 text-[1.1rem] font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-brand dark:text-zinc-50 font-heading">
                      {a.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-7 text-zinc-500 dark:text-zinc-400">
                      {a.excerpt}
                    </p>
                    <div className="mt-auto border-t border-zinc-100 pt-5 dark:border-zinc-900">
                      <Meta article={a} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-14">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / 10)}
              buildHref={(p) => (p > 1 ? `/blog?page=${p}` : "/blog")}
            />
          </div>
        </div>
      )}

      {page === 1 && (
        <NewsletterSection
          title="Never miss a new guide"
          description="Get new reviews, comparison guides and pricing changes from Stack Match, straight to your inbox."
        />
      )}
    </div>
  );
}
