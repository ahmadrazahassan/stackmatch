import { createClient } from "@/lib/supabase/server";
import { SoftwareForm } from "../SoftwareForm";
import type { Category } from "@/lib/types";
import type { SoftwareOption } from "@/components/admin/SoftwareCombobox";

export default async function NewSoftwarePage() {
  let categories: Category[] = [];
  let softwareOptions: SoftwareOption[] = [];
  try {
    const supabase = await createClient();
    const [c, s] = await Promise.all([
      supabase.from("categories").select("*").order("display_order"),
      supabase.from("software").select("id, name").order("name"),
    ]);
    categories = (c.data as Category[]) ?? [];
    softwareOptions = (s.data as SoftwareOption[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <SoftwareForm categories={categories} softwareOptions={softwareOptions} />;
}
