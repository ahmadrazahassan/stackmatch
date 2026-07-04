"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

async function requireAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/admin/login");
  return supabase;
}

function revalidatePublic() {
  // Content changes affect most public pages; revalidate the public tree.
  revalidatePath("/", "layout");
}

// ----------------------------------------------------------------------------
// SOFTWARE
// ----------------------------------------------------------------------------

export async function upsertSoftware(
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const query = id
    ? supabase.from("software").update(values).eq("id", id).select("id").single()
    : supabase.from("software").insert(values).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/software");
  revalidatePublic();
  return { ok: true, id: data.id };
}

export async function deleteSoftware(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("software").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/software");
  revalidatePublic();
  return { ok: true };
}

export async function deleteSoftwareBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("software").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/software");
  revalidatePublic();
  return { ok: true };
}

export async function setSoftwareAlternatives(
  softwareId: string,
  alternativeIds: string[]
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error: delError } = await supabase
    .from("software_alternatives")
    .delete()
    .eq("software_id", softwareId);
  if (delError) return { ok: false, error: delError.message };

  if (alternativeIds.length > 0) {
    const rows = alternativeIds.map((alternative_id, i) => ({
      software_id: softwareId,
      alternative_id,
      display_order: i,
    }));
    const { error } = await supabase.from("software_alternatives").insert(rows);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// REVIEWS
// ----------------------------------------------------------------------------

export async function upsertReview(
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const query = id
    ? supabase.from("reviews").update(values).eq("id", id).select("id").single()
    : supabase.from("reviews").insert(values).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/reviews");
  revalidatePublic();
  return { ok: true, id: data.id };
}

export async function deleteReview(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/reviews");
  revalidatePublic();
  return { ok: true };
}

export async function deleteReviewBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("reviews").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/reviews");
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// CATEGORIES
// ----------------------------------------------------------------------------

export async function upsertCategory(
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const query = id
    ? supabase.from("categories").update(values).eq("id", id).select("id").single()
    : supabase.from("categories").insert(values).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/categories");
  revalidatePublic();
  return { ok: true, id: data.id };
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/categories");
  revalidatePublic();
  return { ok: true };
}

export async function deleteCategoryBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("categories").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/categories");
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// ARTICLES
// ----------------------------------------------------------------------------

export async function upsertArticle(
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const query = id
    ? supabase.from("articles").update(values).eq("id", id).select("id").single()
    : supabase.from("articles").insert(values).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/articles");
  revalidatePublic();
  return { ok: true, id: data.id };
}

export async function deleteArticle(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/articles");
  revalidatePublic();
  return { ok: true };
}

export async function deleteArticleBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("articles").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/articles");
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// PAGES (static content: About, Privacy Policy, Terms, etc.)
// ----------------------------------------------------------------------------

export async function upsertPage(
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const query = id
    ? supabase.from("pages").update(values).eq("id", id).select("id").single()
    : supabase.from("pages").insert(values).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/pages");
  revalidatePublic();
  return { ok: true, id: data.id };
}

export async function deletePage(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/pages");
  revalidatePublic();
  return { ok: true };
}

export async function deletePageBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("pages").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/pages");
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// COMPARISONS
// ----------------------------------------------------------------------------

export async function upsertComparison(
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const query = id
    ? supabase.from("comparisons").update(values).eq("id", id).select("id").single()
    : supabase.from("comparisons").insert(values).select("id").single();
  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/comparisons");
  revalidatePublic();
  return { ok: true, id: data.id };
}

export async function deleteComparison(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("comparisons").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/comparisons");
  revalidatePublic();
  return { ok: true };
}

export async function deleteComparisonBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("comparisons").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/comparisons");
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// SETTINGS
// ----------------------------------------------------------------------------

export async function saveSettings(
  settings: Record<string, string>
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const rows = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from("site_settings")
    .upsert(rows, { onConflict: "key" });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/settings");
  revalidatePublic();
  return { ok: true };
}

// ----------------------------------------------------------------------------
// NEWSLETTER
// ----------------------------------------------------------------------------

export async function updateNewsletterSubscriberStatus(
  id: string,
  status: "confirmed" | "unsubscribed"
): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .update(
      status === "unsubscribed"
        ? { status, unsubscribed_at: new Date().toISOString() }
        : { status, confirmed_at: new Date().toISOString(), unsubscribed_at: null }
    )
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/newsletter");
  return { ok: true };
}

export async function deleteNewsletterSubscriber(id: string): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/newsletter");
  return { ok: true };
}

export async function deleteNewsletterSubscriberBulk(ids: string[]): Promise<ActionResult> {
  const supabase = await requireAuth();
  const { error } = await supabase.from("newsletter_subscribers").delete().in("id", ids);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/newsletter");
  return { ok: true };
}
