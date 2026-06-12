import { createClient } from "@/lib/supabase/server";
import { ComparisonsManager } from "./ComparisonsManager";
import type { Comparison } from "@/lib/types";

export default async function AdminComparisonsPage() {
  let data: Comparison[] = [];
  let software: { id: string; name: string; slug: string }[] = [];
  try {
    const supabase = await createClient();
    const [c, s] = await Promise.all([
      supabase.from("comparisons").select("*").order("created_at", { ascending: false }),
      supabase.from("software").select("id, name, slug").order("name"),
    ]);
    data = (c.data as Comparison[]) ?? [];
    software = s.data ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ComparisonsManager data={data} software={software} />;
}
