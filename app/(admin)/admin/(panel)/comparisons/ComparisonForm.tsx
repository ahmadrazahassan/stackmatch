"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star, Swords, ExternalLink, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SoftwareCombobox } from "@/components/admin/SoftwareCombobox";
import { upsertComparison } from "../../actions";
import type { Comparison } from "@/lib/types";

export interface ComparisonSoftware {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  overall_rating: number;
  review_count: number;
  category?: { name: string } | null;
}

interface ComparisonFormProps {
  software: ComparisonSoftware[];
  initial?: Comparison | null;
}

function ProductPreview({
  s,
  accent,
  placeholder,
}: {
  s?: ComparisonSoftware;
  accent: string;
  placeholder: string;
}) {
  if (!s) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-muted/30 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed bg-white text-muted-foreground">
          <Swords className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">{placeholder}</p>
      </div>
    );
  }
  return (
    <div
      className="flex flex-1 flex-col items-center gap-2 rounded-2xl border bg-white p-6 text-center"
      style={{ boxShadow: `inset 0 3px 0 ${accent}` }}
    >
      {s.logo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={s.logo_url}
          alt={s.name}
          className="h-16 w-16 rounded-xl object-contain"
        />
      ) : (
        <span
          className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-extrabold text-white"
          style={{ backgroundColor: accent }}
        >
          {s.name.charAt(0)}
        </span>
      )}
      <p className="mt-1 font-bold leading-tight">{s.name}</p>
      {s.category?.name && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {s.category.name}
        </span>
      )}
      <div className="mt-1 flex items-center gap-1.5 text-sm">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="font-bold">{Number(s.overall_rating).toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">
          ({s.review_count.toLocaleString("en-GB")})
        </span>
      </div>
    </div>
  );
}

export function ComparisonForm({ software, initial }: ComparisonFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    software_a_id: initial?.software_a_id ?? (null as string | null),
    software_b_id: initial?.software_b_id ?? (null as string | null),
    custom_verdict: initial?.custom_verdict ?? "",
    meta_title: initial?.meta_title ?? "",
    meta_description: initial?.meta_description ?? "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const a = useMemo(() => software.find((s) => s.id === form.software_a_id), [software, form.software_a_id]);
  const b = useMemo(() => software.find((s) => s.id === form.software_b_id), [software, form.software_b_id]);
  const sameProduct = Boolean(form.software_a_id && form.software_a_id === form.software_b_id);
  const previewUrl = a && b ? `/compare/${a.slug}-vs-${b.slug}` : null;

  const swap = () =>
    setForm((f) => ({ ...f, software_a_id: f.software_b_id, software_b_id: f.software_a_id }));

  async function save(status: "published" | "draft") {
    if (!form.software_a_id || !form.software_b_id) {
      toast.error("Select both software products.");
      return;
    }
    if (sameProduct) {
      toast.error("Pick two different products.");
      return;
    }
    setSaving(true);
    const result = await upsertComparison(initial?.id ?? null, {
      software_a_id: form.software_a_id,
      software_b_id: form.software_b_id,
      custom_verdict: form.custom_verdict.trim() || null,
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      status,
    });
    if (!result.ok) {
      toast.error(result.error);
      setSaving(false);
      return;
    }
    toast.success(status === "published" ? "Comparison published." : "Draft saved.");
    router.push("/admin/comparisons");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-24">
      {/* Matchup */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Matchup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div className="space-y-2">
              <Label>Software A *</Label>
              <SoftwareCombobox
                options={software}
                value={form.software_a_id}
                onChange={(id) => set("software_a_id", id)}
              />
            </div>
            <div className="hidden pb-1 sm:block">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Swap A and B"
                onClick={swap}
                disabled={!form.software_a_id && !form.software_b_id}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Software B *</Label>
              <SoftwareCombobox
                options={software}
                value={form.software_b_id}
                onChange={(id) => set("software_b_id", id)}
              />
            </div>
          </div>

          {sameProduct && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
              Software A and B must be different products.
            </p>
          )}

          {/* Live preview */}
          <div className="relative flex items-stretch gap-4">
            <ProductPreview s={a} accent="var(--color-brand)" placeholder="Choose Software A" />
            <div className="flex items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md">
                VS
              </span>
            </div>
            <ProductPreview s={b} accent="var(--color-navy, #1E3A5F)" placeholder="Choose Software B" />
          </div>

          {previewUrl && (
            <p className="text-sm text-muted-foreground">
              Public URL:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{previewUrl}</code>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Editorial & SEO */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Editorial &amp; SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verdict">Custom Verdict</Label>
            <Textarea
              id="verdict"
              rows={5}
              placeholder="Your editorial take — which product wins, for whom, and why. Leave blank to auto-generate a verdict from the ratings."
              value={form.custom_verdict}
              onChange={(e) => set("custom_verdict", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Shown in the “Our final verdict” section. Plain text.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta_title">Meta Title (max 60 chars)</Label>
            <Input
              id="meta_title"
              maxLength={60}
              placeholder={a && b ? `${a.name} vs ${b.name} (2026 Comparison)` : "Auto-generated"}
              value={form.meta_title}
              onChange={(e) => set("meta_title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description (max 160 chars)</Label>
            <Textarea
              id="meta_description"
              maxLength={160}
              rows={2}
              value={form.meta_description}
              onChange={(e) => set("meta_description", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">{form.meta_description.length}/160</p>
          </div>
        </CardContent>
      </Card>

      {/* Sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white px-6 py-3 md:left-60">
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3">
          {previewUrl && initial && (
            <Button
              type="button"
              variant="ghost"
              asChild
              className="mr-auto text-muted-foreground"
            >
              <a href={previewUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Preview
              </a>
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/comparisons")}>
            Cancel
          </Button>
          <Button type="button" variant="outline" disabled={saving} onClick={() => save("draft")}>
            Save as Draft
          </Button>
          <Button type="button" disabled={saving} onClick={() => save("published")}>
            {saving ? "Saving…" : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
