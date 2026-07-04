"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { slugify } from "@/lib/utils/slugify";
import { upsertPage } from "../../actions";
import type { Page } from "@/lib/types";

export function PageForm({ initial }: { initial?: Page | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    content: initial?.content ?? "",
    meta_title: initial?.meta_title ?? "",
    meta_description: initial?.meta_description ?? "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save(status: "published" | "draft") {
    if (!form.title || !form.slug || !form.content) {
      toast.error("Title, slug and content are required.");
      return;
    }
    setSaving(true);
    const result = await upsertPage(initial?.id ?? null, {
      title: form.title,
      slug: form.slug,
      content: form.content,
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description || null,
      status,
    });
    if (!result.ok) {
      toast.error(result.error);
      setSaving(false);
      return;
    }
    toast.success(status === "published" ? "Page published." : "Draft saved.");
    router.push("/admin/pages");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!slugTouched) set("slug", slugify(e.target.value));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug * <span className="font-normal text-muted-foreground">— controls the URL, e.g. /{form.slug || "your-slug"}</span>
            </Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => set("content", html)}
              placeholder="Write the page content…"
            />
          </div>
        </CardContent>
      </Card>

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
              placeholder={form.title}
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
          </div>
        </CardContent>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white px-6 py-3 md:left-60">
        <div className="mx-auto flex max-w-3xl justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/pages")}>
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
