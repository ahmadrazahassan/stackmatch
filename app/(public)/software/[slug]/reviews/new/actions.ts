"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitReview(
  slug: string,
  data: {
    reviewer_name: string;
    reviewer_job_title?: string;
    reviewer_company?: string;
    reviewer_industry?: string;
    reviewer_company_size?: string;
    reviewer_country?: string;
    used_for_duration?: string;
    overall_rating: number;
    ease_of_use?: number | null;
    value_for_money?: number | null;
    customer_service?: number | null;
    functionality?: number | null;
    review_title: string;
    summary: string;
    pros?: string;
    cons?: string;
  }
): Promise<SubmitResult> {
  try {
    if (!slug) {
      return { ok: false, error: "Software slug is required." };
    }
    if (!data.reviewer_name?.trim()) {
      return { ok: false, error: "Your name is required." };
    }
    if (!data.review_title?.trim()) {
      return { ok: false, error: "Review title is required." };
    }
    if (!data.summary?.trim()) {
      return { ok: false, error: "Review summary is required." };
    }
    if (!data.overall_rating || data.overall_rating < 1 || data.overall_rating > 5) {
      return { ok: false, error: "Overall rating must be between 1 and 5." };
    }

    const supabase = createAdminClient();

    // 1. Resolve software ID by slug
    const { data: software, error: swError } = await supabase
      .from("software")
      .select("id")
      .eq("slug", slug)
      .single();

    if (swError || !software) {
      return { ok: false, error: `Software with slug "${slug}" not found.` };
    }

    // 2. Prepare database values
    const insertValues = {
      software_id: software.id,
      reviewer_name: data.reviewer_name.trim(),
      reviewer_job_title: data.reviewer_job_title?.trim() || null,
      reviewer_company: data.reviewer_company?.trim() || null,
      reviewer_industry: data.reviewer_industry || null,
      reviewer_company_size: data.reviewer_company_size || null,
      reviewer_country: data.reviewer_country || "South Africa",
      used_for_duration: data.used_for_duration || null,
      overall_rating: Math.round(data.overall_rating),
      ease_of_use: data.ease_of_use ? Math.round(data.ease_of_use) : null,
      value_for_money: data.value_for_money ? Math.round(data.value_for_money) : null,
      customer_service: data.customer_service ? Math.round(data.customer_service) : null,
      functionality: data.functionality ? Math.round(data.functionality) : null,
      review_title: data.review_title.trim(),
      summary: data.summary.trim(),
      pros: data.pros?.trim() || null,
      cons: data.cons?.trim() || null,
      status: "published", // Auto-publish for immediate demonstration on the website
      review_date: new Date().toISOString().slice(0, 10),
    };

    // 3. Insert into DB
    const { error: insertError } = await supabase
      .from("reviews")
      .insert(insertValues);

    if (insertError) {
      return { ok: false, error: insertError.message };
    }

    // 4. Revalidate paths to clear static page caching
    revalidatePath("/");
    revalidatePath(`/software/${slug}`);
    revalidatePath(`/software/${slug}/reviews`);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || "An unexpected error occurred." };
  }
}
