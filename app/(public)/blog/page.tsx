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
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "Blog" }]} />
      <h1 className="py-4 text-2xl font-bold text-foreground sm:text-3xl">
        Expert Guides &amp; Reviews
      </h1>

      {items.length === 0 ? (
        <p className="rounded-lg border bg-white p-12 text-center text-muted-foreground card-shadow">
          Articles will appear here once published from the admin panel.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
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
                <h2 className="mt-1 line-clamp-2 font-semibold text-foreground group-hover:text-brand">
                  {a.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {a.author_name} · {formatDateShort(a.published_date)} · {a.read_time_minutes} min
                  read
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(total / 9)}
        buildHref={(p) => (p > 1 ? `/blog?page=${p}` : "/blog")}
      />
    </div>
  );
}
