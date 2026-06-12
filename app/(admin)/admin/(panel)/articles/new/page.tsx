import { createClient } from "@/lib/supabase/server";
import { ArticleForm } from "../ArticleForm";
import type { SoftwareOption } from "@/components/admin/SoftwareCombobox";

export default async function NewArticlePage() {
  let softwareOptions: SoftwareOption[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("software").select("id, name").order("name");
    softwareOptions = (data as SoftwareOption[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ArticleForm softwareOptions={softwareOptions} />;
}
