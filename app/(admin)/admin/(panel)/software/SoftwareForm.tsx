"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SingleImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { SoftwareCombobox, type SoftwareOption } from "@/components/admin/SoftwareCombobox";
import { slugify } from "@/lib/utils/slugify";
import { upsertSoftware, setSoftwareAlternatives } from "../../actions";
import { DEFAULT_BRAND_COLOR } from "@/lib/brandColors";
import type { Category, PricingPlan, Software } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

const SUPPORT_TYPES = ["Phone", "Live Chat", "Email", "Knowledge Base", "Forum"];
const CURRENCIES = ["GBP", "USD", "EUR", "ZAR"];
const BILLING = ["month", "year", "one-time", "user/month"];

interface SoftwareFormProps {
  categories: Category[];
  softwareOptions: SoftwareOption[];
  initial?: Software | null;
  initialAlternatives?: string[];
}

export function SoftwareForm({
  categories,
  softwareOptions,
  initial,
  initialAlternatives = [],
}: SoftwareFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    tagline: initial?.tagline ?? "",
    category_id: initial?.category_id ?? "",
    featured: initial?.featured ?? false,
    description_short: initial?.description_short ?? "",
    description_full: initial?.description_full ?? "",
    logo_url: initial?.logo_url ?? null,
    brand_color: initial?.brand_color ?? "",
    screenshots: (initial?.screenshots as string[]) ?? [],
    starting_price: initial?.starting_price?.toString() ?? "",
    price_currency: initial?.price_currency ?? "GBP",
    billing_period: initial?.billing_period ?? "month",
    free_trial: initial?.free_trial ?? false,
    free_version: initial?.free_version ?? false,
    pricing_plans: (initial?.pricing_plans as PricingPlan[]) ?? [],
    features: (initial?.features as string[]) ?? [],
    top_features: (initial?.top_features as string[]) ?? [],
    integrations: (initial?.integrations as string[]) ?? [],
    affiliate_url: initial?.affiliate_url ?? "",
    vendor_website: initial?.vendor_website ?? "",
    vendor_name: initial?.vendor_name ?? "",
    founded_year: initial?.founded_year?.toString() ?? "",
    support_types: (initial?.support_types as string[]) ?? [],
    countries_available: (initial?.countries_available as string[]) ?? [],
    languages: (initial?.languages as string[]) ?? [],
    meta_title: initial?.meta_title ?? "",
    meta_description: initial?.meta_description ?? "",
    og_image_url: initial?.og_image_url ?? null,
  });
  const [alternatives, setAlternatives] = useState<string[]>(initialAlternatives);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save(status: "published" | "draft") {
    if (!form.name || !form.slug || !form.description_short || !form.description_full) {
      toast.error("Name, slug and both descriptions are required.");
      return;
    }
    if (status === "published" && !form.affiliate_url && !form.vendor_website) {
      toast.error("Add an affiliate URL or vendor website before publishing.");
      return;
    }
    setSaving(true);
    const values = {
      ...form,
      category_id: form.category_id || null,
      brand_color: form.brand_color.trim() || null,
      starting_price: form.starting_price === "" ? null : Number(form.starting_price),
      founded_year: form.founded_year === "" ? null : Number(form.founded_year),
      affiliate_url: form.affiliate_url || null,
      vendor_website: form.vendor_website || null,
      vendor_name: form.vendor_name || null,
      tagline: form.tagline || null,
      meta_title: form.meta_title || form.name,
      meta_description: form.meta_description || form.description_short,
      status,
    };
    const result = await upsertSoftware(initial?.id ?? null, values);
    if (!result.ok) {
      toast.error(result.error);
      setSaving(false);
      return;
    }
    if (result.id) {
      const altResult = await setSoftwareAlternatives(result.id, alternatives);
      if (!altResult.ok) toast.error(`Saved, but alternatives failed: ${altResult.error}`);
    }
    toast.success(status === "published" ? "Software published." : "Draft saved.");
    router.push("/admin/software");
    router.refresh();
  }

  const altOptions = softwareOptions.filter((o) => o.id !== initial?.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      {/* Basic Info */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Software Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => {
                  set("name", e.target.value);
                  if (!slugTouched) set("slug", slugify(e.target.value));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              maxLength={80}
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={form.category_id} onValueChange={(v) => set("category_id", v)}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(v) => set("featured", v)}
              />
              <Label htmlFor="featured">Featured on homepage</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description_short">Short Description * (max 160 chars)</Label>
            <Textarea
              id="description_short"
              maxLength={160}
              rows={2}
              value={form.description_short}
              onChange={(e) => set("description_short", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">{form.description_short.length}/160</p>
          </div>
          <div className="space-y-2">
            <Label>Full Description *</Label>
            <RichTextEditor
              value={form.description_full}
              onChange={(html) => set("description_full", html)}
              placeholder="What is this software? Who is it for?"
            />
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Logo</Label>
            <SingleImageUploader
              bucket="logos"
              value={form.logo_url}
              onChange={(url) => set("logo_url", url)}
              label="a logo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand_color">Brand Colour</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                aria-label="Brand colour picker"
                value={form.brand_color || DEFAULT_BRAND_COLOR}
                onChange={(e) => set("brand_color", e.target.value)}
                className="h-10 w-14 shrink-0 cursor-pointer rounded-md border bg-white p-1"
              />
              <Input
                id="brand_color"
                placeholder={`${DEFAULT_BRAND_COLOR} (default)`}
                value={form.brand_color}
                onChange={(e) => set("brand_color", e.target.value)}
                className="max-w-40 font-mono"
              />
              {form.brand_color && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => set("brand_color", "")}
                >
                  Reset to auto
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Accent colour used across this product&apos;s profile, card, pricing plans and
              charts. Leave blank to use the site default.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Screenshots (up to 10)</Label>
            <MultiImageUploader
              bucket="screenshots"
              values={form.screenshots}
              onChange={(urls) => set("screenshots", urls)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="starting_price">Starting Price</Label>
              <Input
                id="starting_price"
                type="number"
                min="0"
                step="0.01"
                value={form.starting_price}
                onChange={(e) => set("starting_price", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={form.price_currency} onValueChange={(v) => set("price_currency", v)}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Billing Period</Label>
              <Select value={form.billing_period} onValueChange={(v) => set("billing_period", v)}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BILLING.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Switch
                id="free_trial"
                checked={form.free_trial}
                onCheckedChange={(v) => set("free_trial", v)}
              />
              <Label htmlFor="free_trial">Free Trial</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="free_version"
                checked={form.free_version}
                onCheckedChange={(v) => set("free_version", v)}
              />
              <Label htmlFor="free_version">Free Version</Label>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Pricing Plans</Label>
            {form.pricing_plans.map((plan, i) => (
              <div key={i} className="grid gap-2 rounded-lg border bg-muted/40 p-3 sm:grid-cols-[1fr_90px_90px_110px_1fr_36px]">
                <Input
                  placeholder="Plan name"
                  value={plan.name}
                  onChange={(e) => {
                    const plans = [...form.pricing_plans];
                    plans[i] = { ...plan, name: e.target.value };
                    set("pricing_plans", plans);
                  }}
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={plan.price}
                  onChange={(e) => {
                    const plans = [...form.pricing_plans];
                    plans[i] = { ...plan, price: e.target.value };
                    set("pricing_plans", plans);
                  }}
                />
                <Select
                  value={plan.currency}
                  onValueChange={(v) => {
                    const plans = [...form.pricing_plans];
                    plans[i] = { ...plan, currency: v };
                    set("pricing_plans", plans);
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={plan.billing}
                  onValueChange={(v) => {
                    const plans = [...form.pricing_plans];
                    plans[i] = { ...plan, billing: v };
                    set("pricing_plans", plans);
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BILLING.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Features (comma-separated)"
                  value={plan.features.join(", ")}
                  onChange={(e) => {
                    const plans = [...form.pricing_plans];
                    plans[i] = {
                      ...plan,
                      features: e.target.value.split(",").map((s) => s.trimStart()),
                    };
                    set("pricing_plans", plans);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Remove plan"
                  onClick={() =>
                    set("pricing_plans", form.pricing_plans.filter((_, idx) => idx !== i))
                  }
                >
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                set("pricing_plans", [
                  ...form.pricing_plans,
                  { name: "", price: "", currency: form.price_currency, billing: form.billing_period, features: [] },
                ])
              }
            >
              <Plus className="h-4 w-4" /> Add Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Key Features</Label>
            <TagInput
              values={form.features}
              onChange={(v) => set("features", v)}
              placeholder="e.g. Bank reconciliation — press Enter"
            />
          </div>
          <div className="space-y-2">
            <Label>Top Features (shown in comparisons, max 3)</Label>
            <TagInput
              values={form.top_features}
              onChange={(v) => set("top_features", v)}
              max={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Integrations (shown on the profile page)</Label>
            <TagInput
              values={form.integrations}
              onChange={(v) => set("integrations", v)}
              placeholder="e.g. Stripe — press Enter"
            />
          </div>
        </CardContent>
      </Card>

      {/* Affiliate & Vendor */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Affiliate &amp; Vendor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="affiliate_url">Affiliate URL (tracking link)</Label>
            <Input
              id="affiliate_url"
              type="url"
              placeholder="https://…"
              value={form.affiliate_url}
              onChange={(e) => set("affiliate_url", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor_website">Vendor Website</Label>
              <Input
                id="vendor_website"
                type="url"
                value={form.vendor_website}
                onChange={(e) => set("vendor_website", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor_name">Vendor Name</Label>
              <Input
                id="vendor_name"
                value={form.vendor_name}
                onChange={(e) => set("vendor_name", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="founded_year">Founded Year</Label>
              <Input
                id="founded_year"
                type="number"
                min="1900"
                max="2100"
                value={form.founded_year}
                onChange={(e) => set("founded_year", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Support Types</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                {SUPPORT_TYPES.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.support_types.includes(s)}
                      onCheckedChange={(checked) =>
                        set(
                          "support_types",
                          checked
                            ? [...form.support_types, s]
                            : form.support_types.filter((x) => x !== s)
                        )
                      }
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Countries Available</Label>
              <TagInput
                values={form.countries_available}
                onChange={(v) => set("countries_available", v)}
                placeholder="e.g. United Kingdom"
              />
            </div>
            <div className="space-y-2">
              <Label>Languages</Label>
              <TagInput
                values={form.languages}
                onChange={(v) => set("languages", v)}
                placeholder="e.g. English"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Alternatives (shown on the Alternatives tab)</Label>
            <div className="space-y-2">
              {alternatives.map((altId, i) => (
                <div key={altId} className="flex items-center gap-2">
                  <span className="flex-1 rounded-md border bg-white px-3 py-2 text-sm">
                    {altOptions.find((o) => o.id === altId)?.name ?? altId}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Remove alternative"
                    onClick={() => setAlternatives(alternatives.filter((_, idx) => idx !== i))}
                  >
                    <Trash2 className="h-4 w-4 text-error" />
                  </Button>
                </div>
              ))}
              <SoftwareCombobox
                options={altOptions.filter((o) => !alternatives.includes(o.id))}
                value={null}
                onChange={(id) => id && setAlternatives([...alternatives, id])}
                placeholder="Add an alternative…"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta_title">Meta Title (max 60 chars)</Label>
            <Input
              id="meta_title"
              maxLength={60}
              placeholder={form.name ? `${form.name} Review 2026` : ""}
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
              placeholder={form.description_short}
              value={form.meta_description}
              onChange={(e) => set("meta_description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>OG Image (defaults to auto-generated)</Label>
            <SingleImageUploader
              bucket="screenshots"
              value={form.og_image_url}
              onChange={(url) => set("og_image_url", url)}
              label="an OG image"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white px-6 py-3 md:left-60">
        <div className="mx-auto flex max-w-3xl justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/software")}>
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
