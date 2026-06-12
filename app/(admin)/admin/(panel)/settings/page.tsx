import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  let initial: Record<string, string> = {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    for (const row of data ?? []) {
      if (row.value !== null) initial[row.key] = row.value;
    }
  } catch {
    initial = {};
  }

  return <SettingsForm initial={initial} />;
}
