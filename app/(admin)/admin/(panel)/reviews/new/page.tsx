import { createClient } from "@/lib/supabase/server";
import { ReviewForm } from "../ReviewForm";
import type { SoftwareOption } from "@/components/admin/SoftwareCombobox";

export default async function NewReviewPage() {
  let softwareOptions: SoftwareOption[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("software").select("id, name").order("name");
    softwareOptions = (data as SoftwareOption[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <ReviewForm softwareOptions={softwareOptions} />;
}
