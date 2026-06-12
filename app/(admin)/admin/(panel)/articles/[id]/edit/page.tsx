import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleForm } from "../../ArticleForm";
import type { Article } from "@/lib/types";
import type { SoftwareOption } from "@/components/admin/SoftwareCombobox";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [articleRes, optionsRes] = await Promise.all([
    supabase.from("articles").select("*").eq("id", id).maybeSingle(),
    supabase.from("software").select("id, name").order("name"),
  ]);

  const article = articleRes.data as Article | null;
  if (!article) notFound();

  return (
    <ArticleForm
      softwareOptions={(optionsRes.data as SoftwareOption[]) ?? []}
      initial={article}
    />
  );
}
