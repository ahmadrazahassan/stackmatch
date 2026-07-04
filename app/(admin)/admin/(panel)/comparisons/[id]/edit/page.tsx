import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ComparisonForm, type ComparisonSoftware } from "../../ComparisonForm";
import type { Comparison } from "@/lib/types";

export default async function EditComparisonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [comparisonRes, softwareRes] = await Promise.all([
    supabase.from("comparisons").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("software")
      .select("id, name, slug, logo_url, overall_rating, review_count, category:categories(name)")
      .order("name"),
  ]);

  const comparison = comparisonRes.data as Comparison | null;
  if (!comparison) notFound();

  return (
    <ComparisonForm
      software={(softwareRes.data as unknown as ComparisonSoftware[]) ?? []}
      initial={comparison}
    />
  );
}
