import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ReviewForm } from "../../ReviewForm";
import type { Review } from "@/lib/types";
import type { SoftwareOption } from "@/components/admin/SoftwareCombobox";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [reviewRes, optionsRes] = await Promise.all([
    supabase.from("reviews").select("*").eq("id", id).maybeSingle(),
    supabase.from("software").select("id, name").order("name"),
  ]);

  const review = reviewRes.data as Review | null;
  if (!review) notFound();

  return (
    <ReviewForm
      softwareOptions={(optionsRes.data as SoftwareOption[]) ?? []}
      initial={review}
    />
  );
}
