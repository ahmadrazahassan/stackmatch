import { createClient } from "@/lib/supabase/server";
import { ComparisonsTable } from "./ComparisonsTable";
import type { Comparison } from "@/lib/types";
import type { ComparisonSoftware } from "./ComparisonForm";

export default async function AdminComparisonsPage() {
  let data: Comparison[] = [];
  let software: ComparisonSoftware[] = [];
  try {
    const supabase = await createClient();
    const [c, s] = await Promise.all([
      supabase.from("comparisons").select("*").order("created_at", { ascending: false }),
      supabase
        .from("software")
        .select("id, name, slug, logo_url, overall_rating, review_count, category:categories(name)")
        .order("name"),
    ]);
    data = (c.data as Comparison[]) ?? [];
    software = (s.data as unknown as ComparisonSoftware[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ComparisonsTable data={data} software={software} />;
}
