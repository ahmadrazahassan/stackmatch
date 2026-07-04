import type { MetadataRoute } from "next";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackmatch.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/software`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/compare`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  if (!isSupabaseConfigured()) return staticEntries;

  try {
    const supabase = createPublicClient();
    const [software, categories, articles, comparisons] = await Promise.all([
      supabase.from("software").select("slug, updated_at").eq("status", "published"),
      supabase.from("categories").select("slug"),
      supabase.from("articles").select("slug, updated_at").eq("status", "published"),
      supabase
        .from("comparisons")
        .select("software_a:software!comparisons_software_a_id_fkey(slug), software_b:software!comparisons_software_b_id_fkey(slug)")
        .eq("status", "published"),
    ]);

    const softwareEntries: MetadataRoute.Sitemap = (software.data ?? []).flatMap((s) => [
      {
        url: `${siteUrl}/software/${s.slug}`,
        lastModified: s.updated_at,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${siteUrl}/software/${s.slug}/reviews`,
        lastModified: s.updated_at,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `${siteUrl}/software/${s.slug}/alternatives`,
        lastModified: s.updated_at,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ]);

    const categoryEntries: MetadataRoute.Sitemap = (categories.data ?? []).map((c) => ({
      url: `${siteUrl}/category/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const articleEntries: MetadataRoute.Sitemap = (articles.data ?? []).map((a) => ({
      url: `${siteUrl}/blog/${a.slug}`,
      lastModified: a.updated_at,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const comparisonEntries: MetadataRoute.Sitemap = (comparisons.data ?? [])
      .map((c) => {
        const a = (c.software_a as unknown as { slug: string } | null)?.slug;
        const b = (c.software_b as unknown as { slug: string } | null)?.slug;
        if (!a || !b) return null;
        return {
          url: `${siteUrl}/compare/${a}-vs-${b}`,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        };
      })
      .filter((e): e is NonNullable<typeof e> => e !== null);

    return [
      ...staticEntries,
      ...softwareEntries,
      ...categoryEntries,
      ...articleEntries,
      ...comparisonEntries,
    ];
  } catch {
    return staticEntries;
  }
}
