import { createClient } from "@/lib/supabase/server";
import { CategoriesManager } from "./CategoriesManager";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  let data: Category[] = [];
  try {
    const supabase = await createClient();
    const { data: rows } = await supabase
      .from("categories")
      .select("*")
      .order("display_order");
    data = (rows as Category[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <CategoriesManager data={data} />;
}
