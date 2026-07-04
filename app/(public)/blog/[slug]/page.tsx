import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { LinkedInIcon, WhatsAppIcon, XTwitterIcon } from "@/components/public/SocialIcons";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { NewsletterSection } from "@/components/public/NewsletterSection";
import { StarRating } from "@/components/public/StarRating";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { getArticleBySlug, getArticles } from "@/lib/supabase/queries";
import { formatDate, formatDateShort } from "@/lib/utils/formatDate";
import { formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import { siteUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

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
      locale: "en_GB",
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

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`,
      Icon: XTwitterIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
      Icon: LinkedInIcon,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${articleUrl}`)}`,
      Icon: WhatsAppIcon,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url ?? undefined,
    datePublished: article.published_date,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: article.author_name },
    publisher: { "@type": "Organization", name: "Stack Match" },
  };

  return (
    <div className="pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- Header ---------- */}
      <header className="container-site pt-6">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: article.title }]} />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          {article.category_tag && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              {article.category_tag}
            </span>
          )}
          <h1 className="mt-4 text-[2.1rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.9rem]">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-zinc-500 dark:text-zinc-400">
              {article.excerpt}
            </p>
          )}

          {/* Author row */}
          <div className="mt-8 flex items-center justify-center gap-3.5">
            {article.author_avatar_url ? (
              <Image
                src={article.author_avatar_url}
                alt={article.author_name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border border-zinc-200 object-cover dark:border-zinc-800"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                {article.author_name.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <p className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-50">
                {article.author_name}
              </p>
              <p className="text-[12.5px] text-zinc-400 dark:text-zinc-500">
                {formatDate(article.published_date)}
                {article.read_time_minutes ? ` · ${article.read_time_minutes} min read` : ""}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Hero image ---------- */}
      {article.featured_image_url && (
        <div className="container-site mt-12">
          <div className="relative mx-auto aspect-[16/8] w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={article.featured_image_url}
              alt=""
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ---------- Body ---------- */}
      <div className="container-site mt-16">
        <div className="relative mx-auto max-w-[720px]">
          {/* Floating share rail (xl+) */}
          <div className="pointer-events-none absolute right-full top-2 hidden pr-10 xl:block">
            <div className="pointer-events-auto sticky top-32 flex flex-col items-center gap-3">
              <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300 dark:text-zinc-600 [writing-mode:vertical-rl]">
                Share
              </span>
              {shareLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-brand hover:text-brand dark:border-zinc-800 dark:text-zinc-500"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>

          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Inline share (below xl) */}
          <div className="mt-14 flex items-center gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800 xl:hidden">
            <span className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400">
              Share this article
            </span>
            <div className="flex items-center gap-2">
              {shareLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-brand hover:text-brand dark:border-zinc-800 dark:text-zinc-500"
                >
                  <Icon className="h-[14px] w-[14px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-12 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              Written by
            </p>
            <div className="mt-4 flex items-start gap-4">
              {article.author_avatar_url ? (
                <Image
                  src={article.author_avatar_url}
                  alt={article.author_name}
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] rounded-full border border-zinc-200 object-cover dark:border-zinc-800"
                />
              ) : (
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-zinc-200 text-base font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  {article.author_name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">
                  {article.author_name}
                </p>
                {article.author_title && (
                  <p className="text-[13px] text-zinc-400 dark:text-zinc-500">{article.author_title}</p>
                )}
                {article.author_bio && (
                  <p className="mt-3 text-[14.5px] leading-7 text-zinc-500 dark:text-zinc-400">
                    {article.author_bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Related software callout */}
          {article.related_software && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <div className="border-b border-zinc-100 px-8 pt-7 dark:border-zinc-900">
                <p className="pb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                  Software mentioned in this article
                </p>
              </div>
              <div className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center">
                <SoftwareLogo
                  src={article.related_software.logo_url}
                  name={article.related_software.name}
                  size={56}
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/software/${article.related_software.slug}`}
                    className="text-[1.05rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:text-brand dark:text-zinc-50 font-heading"
                  >
                    {article.related_software.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-1.5 text-[13px]">
                    <StarRating rating={Number(article.related_software.overall_rating)} size="sm" />
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {formatRating(Number(article.related_software.overall_rating))}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500">
                      ({reviewCountLabel(article.related_software.review_count)})
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-zinc-500 dark:text-zinc-400">
                    {article.related_software.description_short}
                  </p>
                </div>
                <Link
                  href={`/software/${article.related_software.slug}`}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Read review
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <NewsletterSection
        title="Enjoyed this? Get more like it"
        description="New reviews, comparison guides and pricing changes from Stack Match, straight to your inbox."
      />

      {/* ---------- Keep reading ---------- */}
      {relatedArticles.length > 0 && (
        <section className="container-site mt-24 border-t border-zinc-200 pt-16 dark:border-zinc-800">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                Keep reading
              </p>
              <h2 className="mt-2 text-[1.6rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                More from the blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-brand dark:text-zinc-100 sm:inline-flex"
            >
              All articles
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
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
                  <h3 className="mt-2.5 line-clamp-2 text-[1.1rem] font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-brand dark:text-zinc-50 font-heading">
                    {a.title}
                  </h3>
                  <div className="mt-auto pt-5 text-[12px] font-medium text-zinc-400 dark:text-zinc-500">
                    {formatDateShort(a.published_date)}
                    {a.read_time_minutes ? ` · ${a.read_time_minutes} min read` : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All articles
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
