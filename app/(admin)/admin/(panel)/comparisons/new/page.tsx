import { createClient } from "@/lib/supabase/server";
import { ComparisonForm, type ComparisonSoftware } from "../ComparisonForm";

export default async function NewComparisonPage() {
  let software: ComparisonSoftware[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("software")
      .select("id, name, slug, logo_url, overall_rating, review_count, category:categories(name)")
      .order("name");
    software = (data as unknown as ComparisonSoftware[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ComparisonForm software={software} />;
}
