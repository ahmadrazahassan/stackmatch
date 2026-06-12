import { createClient } from "@/lib/supabase/server";
import { SoftwareTable } from "./SoftwareTable";
import type { Software } from "@/lib/types";

export default async function AdminSoftwarePage() {
  let data: Software[] = [];
  try {
    const supabase = await createClient();
    const { data: rows } = await supabase
      .from("software")
      .select("*, category:categories(id, name, slug)")
      .order("created_at", { ascending: false });
    data = (rows as unknown as Software[]) ?? [];
  } catch {
    // Supabase not configured yet — render empty table.
  }

  return <SoftwareTable data={data} />;
}
