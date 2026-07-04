import { createClient } from "@/lib/supabase/server";
import { PagesTable } from "./PagesTable";
import type { Page } from "@/lib/types";

export default async function AdminPagesPage() {
  let data: Page[] = [];
  try {
    const supabase = await createClient();
    const { data: rows } = await supabase
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });
    data = (rows as Page[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <PagesTable data={data} />;
}
