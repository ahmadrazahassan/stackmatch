import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageForm } from "../../PageForm";
import type { Page } from "@/lib/types";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase.from("pages").select("*").eq("id", id).maybeSingle();
  const page = data as Page | null;
  if (!page) notFound();

  return <PageForm initial={page} />;
}
