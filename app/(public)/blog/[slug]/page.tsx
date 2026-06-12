import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LinkedInIcon, WhatsAppIcon, XTwitterIcon } from "@/components/public/SocialIcons";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { StarRating } from "@/components/public/StarRating";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { getArticleBySlug, getArticles } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/utils/formatDate";
import { formatRating, reviewCountLabel } from "@/lib/utils/formatRating";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudpayza.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  const title = article.meta_title ?? article.title;
  const description = article.meta_description ?? article.excerpt ?? "";
  return {
    title,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title,
      description,
      locale: "en_ZA",
      type: "article",
      images: [
        article.og_image_url ??
          article.featured_image_url ??
          `/api/og?title=${encodeURIComponent(article.title)}`,
      ],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { items: related } = await getArticles(1, 4);
  const relatedArticles = related.filter((a) => a.id !== article.id).slice(0, 3);
  const articleUrl = `${siteUrl}/blog/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url ?? undefined,
    datePublished: article.published_date,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: article.author_name },
    publisher: { "@type": "Organization", name: "CloudPayZA" },
  };

  return (
    <div className="container-site pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: article.title }]} />

      <div className="grid gap-10 lg:grid-cols-12">
        <article className="lg:col-span-8">
          {article.featured_image_url && (
            <div className="relative mb-6 aspect-video overflow-hidden rounded-lg border">
              <Image
                src={article.featured_image_url}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          )}
          {article.category_tag && (
            <span className="text-xs font-semibold tracking-wide text-brand uppercase">
              {article.category_tag}
            </span>
          )}
          <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-4xl">{article.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{article.author_name}</span>
            {article.author_title && <span>· {article.author_title}</span>}
            <span>· {formatDate(article.published_date)}</span>
            <span>· {article.read_time_minutes} min read</span>
          </div>

          <div
            className="prose-content mt-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share */}
          <div className="mt-10 flex items-center gap-3 border-t pt-6">
            <span className="text-sm font-semibold">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter / X"
              className="rounded-md border p-2 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <XTwitterIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="rounded-md border p-2 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${articleUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="rounded-md border p-2 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Author bio */}
          <div className="mt-8 flex items-start gap-4 rounded-lg border bg-muted p-6">
            {article.author_avatar_url ? (
              <Image
                src={article.author_avatar_url}
                alt=""
                width={56}
                height={56}
                className="rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-light text-lg font-bold text-brand">
                {article.author_name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-foreground">{article.author_name}</p>
              {article.author_title && (
                <p className="text-sm text-muted-foreground">{article.author_title}</p>
              )}
              {article.author_bio && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{article.author_bio}</p>
              )}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          {article.related_software && (
            <div className="rounded-lg border bg-white p-5 card-shadow">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Related Software
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <SoftwareLogo
                  src={article.related_software.logo_url}
                  name={article.related_software.name}
                  size={48}
                />
                <div>
                  <Link
                    href={`/software/${article.related_software.slug}`}
                    className="font-semibold hover:text-brand"
                  >
                    {article.related_software.name}
                  </Link>
                  <div className="flex items-center gap-1.5 text-sm">
                    <StarRating rating={Number(article.related_software.overall_rating)} size="sm" />
                    <span className="font-medium">
                      {formatRating(Number(article.related_software.overall_rating))}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({reviewCountLabel(article.related_software.review_count)})
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                {article.related_software.description_short}
              </p>
              <Link
                href={`/software/${article.related_software.slug}`}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Read Full Review
              </Link>
            </div>
          )}

          {relatedArticles.length > 0 && (
            <div className="rounded-lg border bg-white p-5 card-shadow">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Related Articles
              </h2>
              <ul className="mt-3 space-y-4">
                {relatedArticles.map((a) => (
                  <li key={a.id}>
                    <Link href={`/blog/${a.slug}`} className="group block">
                      <p className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-brand">
                        {a.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(a.published_date)} · {a.read_time_minutes} min read
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
