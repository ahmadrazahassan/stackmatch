import { createClient } from "@/lib/supabase/server";
import { NewsletterManager } from "./NewsletterManager";
import type { NewsletterSubscriber } from "@/lib/types";

export default async function AdminNewsletterPage() {
  let data: NewsletterSubscriber[] = [];
  try {
    const supabase = await createClient();
    const { data: rows } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    data = (rows as NewsletterSubscriber[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  return <NewsletterManager data={data} />;
}
