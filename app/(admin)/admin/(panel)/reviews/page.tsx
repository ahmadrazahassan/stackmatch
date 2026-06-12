import { createClient } from "@/lib/supabase/server";
import { ReviewsTable } from "./ReviewsTable";
import type { Review } from "@/lib/types";

export default async function AdminReviewsPage() {
  let data: Review[] = [];
  try {
    const supabase = await createClient();
    const { data: rows } = await supabase
      .from("reviews")
      .select("*, software(id, name, slug, logo_url)")
      .order("review_date", { ascending: false });
    data = (rows as unknown as Review[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ReviewsTable data={data} />;
}
