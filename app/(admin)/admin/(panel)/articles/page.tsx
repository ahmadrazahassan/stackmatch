import { createClient } from "@/lib/supabase/server";
import { ArticlesTable } from "./ArticlesTable";
import type { Article } from "@/lib/types";

export default async function AdminArticlesPage() {
  let data: Article[] = [];
  try {
    const supabase = await createClient();
    const { data: rows } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    data = (rows as Article[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ArticlesTable data={data} />;
}
