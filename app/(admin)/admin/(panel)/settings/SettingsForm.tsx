"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveSettings } from "../../actions";

const FIELDS: { key: string; label: string; type: "text" | "textarea"; section: string; hint?: string }[] = [
  { key: "site_name", label: "Site Name", type: "text", section: "General" },
  { key: "tagline", label: "Tagline", type: "text", section: "General" },
  { key: "contact_email", label: "Contact Email", type: "text", section: "General" },
  { key: "contact_phone", label: "Contact Phone", type: "text", section: "General", hint: "Shown in the footer if set" },
  { key: "footer_text", label: "Footer Text", type: "textarea", section: "General" },
  { key: "footer_tagline", label: "Footer Tagline", type: "textarea", section: "General", hint: "Short line under the logo in the footer" },
  { key: "social_twitter", label: "Twitter / X URL", type: "text", section: "Social Links" },
  { key: "social_linkedin", label: "LinkedIn URL", type: "text", section: "Social Links" },
  { key: "social_facebook", label: "Facebook URL", type: "text", section: "Social Links" },
  {
    key: "years_active",
    label: "Years of Advice (homepage stat)",
    type: "text",
    section: "Homepage & Compare",
    hint: "e.g. 7 — shown as \"7 Years\" in the homepage stats bar",
  },
  {
    key: "compare_stat_percentage",
    label: "Compare Page — Highlighted Stat",
    type: "text",
    section: "Homepage & Compare",
    hint: "e.g. 48%",
  },
  {
    key: "compare_stat_text",
    label: "Compare Page — Stat Text",
    type: "textarea",
    section: "Homepage & Compare",
    hint: "Text shown after the highlighted stat, e.g. \"of SMBs say...\"",
  },
  { key: "ga_tracking_id", label: "Google Analytics ID", type: "text", section: "Tracking", hint: "e.g. G-XXXXXXXXXX" },
  { key: "items_per_page", label: "Items Per Page", type: "text", section: "Display", hint: "Listings pagination size" },
];

export function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    for (const f of FIELDS) v[f.key] = initial[f.key] ?? "";
    return v;
  });
  const [saving, setSaving] = useState(false);

  const sections = [...new Set(FIELDS.map((f) => f.section))];

  async function save() {
    setSaving(true);
    const result = await saveSettings(values);
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Settings saved.");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {sections.map((section) => (
        <Card key={section} className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">{section}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {FIELDS.filter((f) => f.section === section).map((f) => (
              <div key={f.key} className="space-y-2">
                <Label htmlFor={f.key}>{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.key}
                    rows={3}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  />
                ) : (
                  <Input
                    id={f.key}
                    placeholder={f.hint}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  />
                )}
                {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
