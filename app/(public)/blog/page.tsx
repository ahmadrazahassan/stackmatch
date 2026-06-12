import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { Pagination } from "@/components/public/Pagination";
import { getArticles } from "@/lib/supabase/queries";
import { formatDateShort } from "@/lib/utils/formatDate";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expert Guides & Software Reviews Blog",
  description:
    "Expert guides, in-depth reviews and comparisons to help South African businesses choose the right software.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const { items, total } = await getArticles(page, 9);

  return (
    <div className="container-site py-12">
      {/* Header card container with dashed border and soft light blue gradient */}
      <div className="mb-12 rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
        {/* Soft background glow circles for high-end feel */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 z-0" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 z-0" />

        {/* Background 3D Shape Cover */}
        <Image
          src="/pages/blog.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-90 pointer-events-none z-0"
        />

        {/* Translucent glass backdrop overlay for high text readability */}
        <div className="absolute inset-0 bg-white/75 dark:bg-zinc-950/80 backdrop-blur-[2px] z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <span className="mt-6 inline-flex items-center rounded-full bg-brand/10 dark:bg-brand/20 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider">
            Resources
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl font-heading leading-tight animate-fade-in">
            Expert Guides &amp; Reviews
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base font-sans leading-relaxed">
            In-depth analysis, comparisons, and step-by-step guides to help South African businesses make smarter software choices.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center text-zinc-500 dark:text-zinc-400 shadow-sm font-sans animate-fade-in">
          Articles will appear here once published from the admin panel.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {items.map((a) => (
            <Link
              key={a.id}
              href={`/blog/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md h-full font-sans"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850">
                {a.featured_image_url ? (
                  <Image
                    src={a.featured_image_url}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-555 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">📰</div>
                )}
              </div>
              <div className="flex flex-1 flex-col pt-5">
                {a.category_tag && (
                  <span className="self-start inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 px-3 py-1 text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    {a.category_tag}
                  </span>
                )}
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug group-hover:text-brand transition-colors line-clamp-2">
                  {a.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {a.excerpt}
                </p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-dashed border-zinc-100 dark:border-zinc-900 text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                  <span>{a.author_name}</span>
                  <span>{formatDateShort(a.published_date)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / 9)}
          buildHref={(p) => (p > 1 ? `/blog?page=${p}` : "/blog")}
        />
      </div>
    </div>
  );
}
