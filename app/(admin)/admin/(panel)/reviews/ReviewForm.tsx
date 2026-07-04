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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarSelector } from "@/components/admin/StarSelector";
import { SingleImageUploader } from "@/components/admin/ImageUploader";
import { SoftwareCombobox, type SoftwareOption } from "@/components/admin/SoftwareCombobox";
import { upsertReview } from "../../actions";
import type { Review } from "@/lib/types";

const INDUSTRIES = ["Accounting", "Finance", "Healthcare", "Construction", "Retail", "Manufacturing", "IT", "Education", "Legal", "Real Estate", "Mining", "NGO", "Other"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const COUNTRIES = ["United Kingdom", "Ireland", "United States", "Canada", "Australia", "Germany", "France", "Other"];
const DURATIONS = ["less than 6 months", "6-12 months", "1-2 years", "2+ years", "5+ years"];

interface ReviewFormProps {
  softwareOptions: SoftwareOption[];
  initial?: Review | null;
}

export function ReviewForm({ softwareOptions, initial }: ReviewFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    software_id: initial?.software_id ?? null,
    reviewer_name: initial?.reviewer_name ?? "",
    reviewer_job_title: initial?.reviewer_job_title ?? "",
    reviewer_company: initial?.reviewer_company ?? "",
    reviewer_industry: initial?.reviewer_industry ?? "",
    reviewer_company_size: initial?.reviewer_company_size ?? "",
    reviewer_country: initial?.reviewer_country ?? "United Kingdom",
    reviewer_avatar_url: initial?.reviewer_avatar_url ?? null,
    verified_linkedin: initial?.verified_linkedin ?? false,
    verified_badge: initial?.verified_badge ?? "",
    used_for_duration: initial?.used_for_duration ?? "",
    overall_rating: initial?.overall_rating ?? null,
    ease_of_use: initial?.ease_of_use ?? null,
    value_for_money: initial?.value_for_money ?? null,
    customer_service: initial?.customer_service ?? null,
    functionality: initial?.functionality ?? null,
    review_title: initial?.review_title ?? "",
    summary: initial?.summary ?? "",
    pros: initial?.pros ?? "",
    cons: initial?.cons ?? "",
    vendor_response: initial?.vendor_response ?? "",
    vendor_response_date: initial?.vendor_response_date ?? "",
    review_date: initial?.review_date ?? new Date().toISOString().slice(0, 10),
    status: (initial?.status ?? "published") as "published" | "hidden",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save() {
    if (!form.software_id) {
      toast.error("Select the software being reviewed.");
      return;
    }
    if (!form.reviewer_name || !form.review_title || !form.overall_rating || !form.review_date) {
      toast.error("Reviewer name, title, overall rating and date are required.");
      return;
    }
    setSaving(true);
    const values = {
      ...form,
      reviewer_job_title: form.reviewer_job_title || null,
      reviewer_company: form.reviewer_company || null,
      reviewer_industry: form.reviewer_industry || null,
      reviewer_company_size: form.reviewer_company_size || null,
      verified_badge: form.verified_linkedin ? form.verified_badge || "Verified LinkedIn User" : null,
      used_for_duration: form.used_for_duration || null,
      summary: form.summary || null,
      pros: form.pros || null,
      cons: form.cons || null,
      vendor_response: form.vendor_response || null,
      vendor_response_date: form.vendor_response ? form.vendor_response_date || null : null,
    };
    const result = await upsertReview(initial?.id ?? null, values);
    if (!result.ok) {
      toast.error(result.error);
      setSaving(false);
      return;
    }
    toast.success("Review saved. Software ratings recalculated.");
    router.push("/admin/reviews");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Software</CardTitle>
        </CardHeader>
        <CardContent>
          <SoftwareCombobox
            options={softwareOptions}
            value={form.software_id}
            onChange={(id) => set("software_id", id)}
            placeholder="Select software being reviewed *"
          />
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Reviewer Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reviewer_name">Reviewer Name *</Label>
              <Input id="reviewer_name" value={form.reviewer_name} onChange={(e) => set("reviewer_name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewer_job_title">Job Title</Label>
              <Input id="reviewer_job_title" value={form.reviewer_job_title} onChange={(e) => set("reviewer_job_title", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reviewer_company">Company Name</Label>
              <Input id="reviewer_company" value={form.reviewer_company} onChange={(e) => set("reviewer_company", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={form.reviewer_industry} onValueChange={(v) => set("reviewer_industry", v)}>
                <SelectTrigger className="w-full bg-white"><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Size</Label>
              <Select value={form.reviewer_company_size} onValueChange={(v) => set("reviewer_company_size", v)}>
                <SelectTrigger className="w-full bg-white"><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((x) => <SelectItem key={x} value={x}>{x} employees</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Select value={form.reviewer_country} onValueChange={(v) => set("reviewer_country", v)}>
                <SelectTrigger className="w-full bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Reviewer Avatar (optional)</Label>
            <SingleImageUploader
              bucket="avatars"
              value={form.reviewer_avatar_url}
              onChange={(url) => set("reviewer_avatar_url", url)}
              label="an avatar"
            />
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex items-center gap-3">
              <Switch id="verified_linkedin" checked={form.verified_linkedin} onCheckedChange={(v) => set("verified_linkedin", v)} />
              <Label htmlFor="verified_linkedin">Verified LinkedIn User</Label>
            </div>
            {form.verified_linkedin && (
              <div className="flex-1 space-y-2">
                <Label htmlFor="verified_badge">Verification Badge Text</Label>
                <Input id="verified_badge" placeholder="Verified LinkedIn User" value={form.verified_badge} onChange={(e) => set("verified_badge", e.target.value)} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Used For Duration</Label>
            <Select value={form.used_for_duration} onValueChange={(v) => set("used_for_duration", v)}>
              <SelectTrigger className="w-full bg-white"><SelectValue placeholder="Select duration" /></SelectTrigger>
              <SelectContent>
                {DURATIONS.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Ratings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              ["overall_rating", "Overall Rating *", true],
              ["ease_of_use", "Ease of Use", false],
              ["value_for_money", "Value for Money", false],
              ["customer_service", "Customer Service", false],
              ["functionality", "Functionality", false],
            ] as const
          ).map(([key, label, required]) => (
            <div key={key} className="flex flex-wrap items-center justify-between gap-2">
              <Label>{label}</Label>
              <StarSelector
                value={form[key]}
                onChange={(v) => set(key, v)}
                required={required}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Review Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review_title">Review Title *</Label>
            <Input id="review_title" placeholder='e.g. "Best accounting software we have used"' value={form.review_title} onChange={(e) => set("review_title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" rows={3} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pros">Pros</Label>
            <Textarea id="pros" rows={2} value={form.pros} onChange={(e) => set("pros", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cons">Cons</Label>
            <Textarea id="cons" rows={2} value={form.cons} onChange={(e) => set("cons", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Vendor Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vendor_response">Vendor Response Text</Label>
            <Textarea id="vendor_response" rows={3} value={form.vendor_response} onChange={(e) => set("vendor_response", e.target.value)} />
          </div>
          {form.vendor_response && (
            <div className="space-y-2">
              <Label htmlFor="vendor_response_date">Vendor Response Date</Label>
              <Input id="vendor_response_date" type="date" value={form.vendor_response_date} onChange={(e) => set("vendor_response_date", e.target.value)} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Meta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="review_date">Review Date *</Label>
            <Input id="review_date" type="date" value={form.review_date} onChange={(e) => set("review_date", e.target.value)} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <Switch
              id="status"
              checked={form.status === "published"}
              onCheckedChange={(v) => set("status", v ? "published" : "hidden")}
            />
            <Label htmlFor="status">{form.status === "published" ? "Published" : "Hidden"}</Label>
          </div>
        </CardContent>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white px-6 py-3 md:left-60">
        <div className="mx-auto flex max-w-3xl justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/reviews")}>
            Cancel
          </Button>
          <Button type="button" disabled={saving} onClick={save}>
            {saving ? "Saving…" : "Save Review"}
          </Button>
        </div>
      </div>
    </div>
  );
}
