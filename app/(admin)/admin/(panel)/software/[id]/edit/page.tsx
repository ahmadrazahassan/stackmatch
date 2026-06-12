import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SoftwareForm } from "../../SoftwareForm";
import type { Category, Software } from "@/lib/types";
import type { SoftwareOption } from "@/components/admin/SoftwareCombobox";

export default async function EditSoftwarePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [softwareRes, categoriesRes, optionsRes, altsRes] = await Promise.all([
    supabase.from("software").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("software").select("id, name").order("name"),
    supabase
      .from("software_alternatives")
      .select("alternative_id, display_order")
      .eq("software_id", id)
      .order("display_order"),
  ]);

  const software = softwareRes.data as Software | null;
  if (!software) notFound();

  return (
    <SoftwareForm
      categories={(categoriesRes.data as Category[]) ?? []}
      softwareOptions={(optionsRes.data as SoftwareOption[]) ?? []}
      initial={software}
      initialAlternatives={(altsRes.data ?? []).map((a) => a.alternative_id)}
    />
  );
}
