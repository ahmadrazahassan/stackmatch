import { createPublicClient, isSupabaseConfigured } from "./public";
import type { Article, Category, Comparison, Review, Software } from "@/lib/types";

// All public-page fetchers degrade to empty results when Supabase is not
// configured or unreachable, so the site builds and renders with placeholders.

async function safe<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export const SOFTWARE_CARD_COLUMNS =
  "id, name, slug, tagline, description_short, logo_url, starting_price, price_currency, billing_period, free_trial, free_version, top_features, overall_rating, ease_of_use_rating, value_for_money_rating, customer_service_rating, functionality_rating, review_count, category_id, featured, status, affiliate_url, category:categories(id, name, slug)";

export async function getCategories(limit?: number): Promise<Category[]> {
  return safe([], async () => {
    const supabase = createPublicClient();
    let query = supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data } = await query;
    return (data as Category[]) ?? [];
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safe(null, async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return data as Category | null;
  });
}

export async function getFeaturedSoftware(limit = 8): Promise<Software[]> {
  return safe([], async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("software")
      .select(SOFTWARE_CARD_COLUMNS)
      .eq("status", "published")
      .eq("featured", true)
      .order("overall_rating", { ascending: false })
      .limit(limit);
    return (data as unknown as Software[]) ?? [];
  });
}

export async function getTopRatedSoftware(limit = 8): Promise<Software[]> {
  return safe([], async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("software")
      .select(SOFTWARE_CARD_COLUMNS)
      .eq("status", "published")
      .gt("review_count", 0)
      .order("overall_rating", { ascending: false })
      .order("review_count", { ascending: false })
      .limit(limit);
    return (data as unknown as Software[]) ?? [];
  });
}

export async function getRecentlyUpdatedSoftware(limit = 6): Promise<Software[]> {
  return safe([], async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("software")
      .select(SOFTWARE_CARD_COLUMNS)
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(limit);
    return (data as unknown as Software[]) ?? [];
  });
}

export async function getSoftwareBySlug(slug: string): Promise<Software | null> {
  return safe(null, async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("software")
      .select("*, category:categories(id, name, slug)")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return data as Software | null;
  });
}

export interface SoftwareListFilters {
  categoryId?: string;
  minRating?: number;
  freeTrial?: boolean;
  freeVersion?: boolean;
  paidOnly?: boolean;
  sort?: "reviews" | "rating" | "recent";
  page?: number;
  perPage?: number;
}

export async function getSoftwareList(
  filters: SoftwareListFilters = {}
): Promise<{ items: Software[]; total: number }> {
  return safe({ items: [], total: 0 }, async () => {
    const supabase = createPublicClient();
    const perPage = filters.perPage ?? 10;
    const page = Math.max(1, filters.page ?? 1);
    const from = (page - 1) * perPage;

    let query = supabase
      .from("software")
      .select(SOFTWARE_CARD_COLUMNS, { count: "exact" })
      .eq("status", "published");

    if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
    if (filters.minRating) query = query.gte("overall_rating", filters.minRating);
    if (filters.freeTrial) query = query.eq("free_trial", true);
    if (filters.freeVersion) query = query.eq("free_version", true);
    if (filters.paidOnly) query = query.eq("free_version", false);

    switch (filters.sort) {
      case "rating":
        query = query.order("overall_rating", { ascending: false });
        break;
      case "recent":
        query = query.order("updated_at", { ascending: false });
        break;
      default:
        query = query.order("review_count", { ascending: false });
    }

    const { data, count } = await query.range(from, from + perPage - 1);
    return { items: (data as unknown as Software[]) ?? [], total: count ?? 0 };
  });
}

export interface ReviewFilters {
  country?: string;
  industry?: string;
  companySize?: string;
  duration?: string;
  sort?: "helpful" | "recent";
  page?: number;
  perPage?: number;
}

export async function getReviewsForSoftware(
  softwareId: string,
  filters: ReviewFilters = {}
): Promise<{ items: Review[]; total: number }> {
  return safe({ items: [], total: 0 }, async () => {
    const supabase = createPublicClient();
    const perPage = filters.perPage ?? 10;
    const page = Math.max(1, filters.page ?? 1);
    const from = (page - 1) * perPage;

    let query = supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .eq("software_id", softwareId)
      .eq("status", "published");

    if (filters.country) query = query.eq("reviewer_country", filters.country);
    if (filters.industry) query = query.eq("reviewer_industry", filters.industry);
    if (filters.companySize) query = query.eq("reviewer_company_size", filters.companySize);
    if (filters.duration) query = query.eq("used_for_duration", filters.duration);

    if (filters.sort === "helpful") {
      query = query.order("helpful_count", { ascending: false });
    } else {
      query = query.order("review_date", { ascending: false });
    }

    const { data, count } = await query.range(from, from + perPage - 1);
    return { items: (data as Review[]) ?? [], total: count ?? 0 };
  });
}

export async function getRatingDistribution(
  softwareId: string
): Promise<Record<1 | 2 | 3 | 4 | 5, number>> {
  const empty = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
  return safe(empty, async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("reviews")
      .select("overall_rating")
      .eq("software_id", softwareId)
      .eq("status", "published");
    const dist = { ...empty };
    for (const row of data ?? []) {
      const r = row.overall_rating as 1 | 2 | 3 | 4 | 5;
      if (r >= 1 && r <= 5) dist[r] += 1;
    }
    return dist;
  });
}

export async function getAlternatives(softwareId: string, limit = 6): Promise<Software[]> {
  return safe([], async () => {
    const supabase = createPublicClient();
    const { data: links } = await supabase
      .from("software_alternatives")
      .select("alternative_id, display_order")
      .eq("software_id", softwareId)
      .order("display_order", { ascending: true })
      .limit(limit);

    const ids = (links ?? []).map((l) => l.alternative_id);
    if (ids.length === 0) return [];

    const { data } = await supabase
      .from("software")
      .select(SOFTWARE_CARD_COLUMNS)
      .in("id", ids)
      .eq("status", "published");
    const items = (data as unknown as Software[]) ?? [];
    // preserve display_order
    return ids
      .map((id) => items.find((s) => s.id === id))
      .filter((s): s is Software => Boolean(s));
  });
}

/** Fallback: other published software in the same category. */
export async function getCategoryPeers(
  softwareId: string,
  categoryId: string | null,
  limit = 6
): Promise<Software[]> {
  if (!categoryId) return [];
  return safe([], async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("software")
      .select(SOFTWARE_CARD_COLUMNS)
      .eq("status", "published")
      .eq("category_id", categoryId)
      .neq("id", softwareId)
      .order("overall_rating", { ascending: false })
      .limit(limit);
    return (data as unknown as Software[]) ?? [];
  });
}

export async function getComparisonRecord(
  softwareAId: string,
  softwareBId: string
): Promise<Comparison | null> {
  return safe(null, async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("comparisons")
      .select("*")
      .or(
        `and(software_a_id.eq.${softwareAId},software_b_id.eq.${softwareBId}),and(software_a_id.eq.${softwareBId},software_b_id.eq.${softwareAId})`
      )
      .eq("status", "published")
      .maybeSingle();
    return data as Comparison | null;
  });
}

export async function getPublishedComparisons(): Promise<Comparison[]> {
  return safe([], async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("comparisons")
      .select(
        "*, software_a:software!comparisons_software_a_id_fkey(id, name, slug, logo_url, overall_rating, review_count), software_b:software!comparisons_software_b_id_fkey(id, name, slug, logo_url, overall_rating, review_count)"
      )
      .eq("status", "published")
      .order("created_at", { ascending: false });
    return (data as unknown as Comparison[]) ?? [];
  });
}

export async function getArticles(
  page = 1,
  perPage = 9
): Promise<{ items: Article[]; total: number }> {
  return safe({ items: [], total: 0 }, async () => {
    const supabase = createPublicClient();
    const from = (page - 1) * perPage;
    const { data, count } = await supabase
      .from("articles")
      .select(
        "id, title, slug, excerpt, featured_image_url, category_tag, author_name, author_avatar_url, read_time_minutes, published_date, featured, status, created_at",
        { count: "exact" }
      )
      .eq("status", "published")
      .order("published_date", { ascending: false })
      .range(from, from + perPage - 1);
    return { items: (data as unknown as Article[]) ?? [], total: count ?? 0 };
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return safe(null, async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("articles")
      .select(
        "*, related_software:software(id, name, slug, logo_url, overall_rating, review_count, description_short)"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return data as Article | null;
  });
}

export async function getLatestArticles(limit = 3): Promise<Article[]> {
  const { items } = await getArticles(1, limit);
  return items;
}

export async function getSiteStats(): Promise<{
  reviews: number;
  software: number;
  categories: number;
}> {
  return safe({ reviews: 0, software: 0, categories: 0 }, async () => {
    const supabase = createPublicClient();
    const [r, s, c] = await Promise.all([
      supabase.from("reviews").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("software").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("categories").select("id", { count: "exact", head: true }),
    ]);
    return { reviews: r.count ?? 0, software: s.count ?? 0, categories: c.count ?? 0 };
  });
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  return safe({}, async () => {
    const supabase = createPublicClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    const map: Record<string, string> = {};
    for (const row of data ?? []) {
      if (row.value !== null) map[row.key] = row.value;
    }
    return map;
  });
}
