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
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SingleImageUploader } from "@/components/admin/ImageUploader";
import { SoftwareCombobox, type SoftwareOption } from "@/components/admin/SoftwareCombobox";
import { slugify } from "@/lib/utils/slugify";
import { upsertArticle } from "../../actions";
import type { Article } from "@/lib/types";

const CATEGORY_TAGS = ["Review", "Comparison", "Guide", "News", "Tutorial"];

function estimateReadTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

interface ArticleFormProps {
  softwareOptions: SoftwareOption[];
  initial?: Article | null;
}

export function ArticleForm({ softwareOptions, initial }: ArticleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [readTimeTouched, setReadTimeTouched] = useState(Boolean(initial));

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    category_tag: initial?.category_tag ?? "",
    excerpt: initial?.excerpt ?? "",
    featured_image_url: initial?.featured_image_url ?? null,
    related_software_id: initial?.related_software_id ?? null,
    content: initial?.content ?? "",
    author_name: initial?.author_name ?? "",
    author_title: initial?.author_title ?? "",
    author_bio: initial?.author_bio ?? "",
    author_avatar_url: initial?.author_avatar_url ?? null,
    read_time_minutes: initial?.read_time_minutes?.toString() ?? "5",
    meta_title: initial?.meta_title ?? "",
    meta_description: initial?.meta_description ?? "",
    og_image_url: initial?.og_image_url ?? null,
    featured: initial?.featured ?? false,
    published_date: initial?.published_date ?? new Date().toISOString().slice(0, 10),
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save(status: "published" | "draft") {
    if (!form.title || !form.slug || !form.excerpt || !form.content || !form.author_name) {
      toast.error("Title, slug, excerpt, content and author name are required.");
      return;
    }
    setSaving(true);
    const result = await upsertArticle(initial?.id ?? null, {
      ...form,
      category_tag: form.category_tag || null,
      author_title: form.author_title || null,
      author_bio: form.author_bio || null,
      read_time_minutes: Number(form.read_time_minutes) || 5,
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description || form.excerpt,
      published_date: form.published_date || null,
      status,
    });
    if (!result.ok) {
      toast.error(result.error);
      setSaving(false);
      return;
    }
    toast.success(status === "published" ? "Article published." : "Draft saved.");
    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Article</CardTitle>
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
          <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="space-y-2">
              <Label>Category Tag</Label>
              <Select value={form.category_tag} onValueChange={(v) => set("category_tag", v)}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_TAGS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt * (max 160 chars)</Label>
            <Textarea
              id="excerpt"
              maxLength={160}
              rows={2}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">{form.excerpt.length}/160</p>
          </div>
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <SingleImageUploader
              bucket="articles"
              value={form.featured_image_url}
              onChange={(url) => set("featured_image_url", url)}
              label="a featured image"
            />
          </div>
          <div className="space-y-2">
            <Label>Related Software (optional)</Label>
            <SoftwareCombobox
              options={softwareOptions}
              value={form.related_software_id}
              onChange={(id) => set("related_software_id", id)}
              placeholder="Link a software profile…"
              allowClear
            />
          </div>
          <div className="space-y-2">
            <Label>Full Content *</Label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => {
                set("content", html);
                if (!readTimeTouched) set("read_time_minutes", String(estimateReadTime(html)));
              }}
              placeholder="Write the article…"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="read_time">Read Time (minutes, auto-calculated)</Label>
            <Input
              id="read_time"
              type="number"
              min="1"
              className="max-w-32"
              value={form.read_time_minutes}
              onChange={(e) => {
                setReadTimeTouched(true);
                set("read_time_minutes", e.target.value);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name *</Label>
              <Input id="author_name" value={form.author_name} onChange={(e) => set("author_name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author_title">Author Title</Label>
              <Input id="author_title" value={form.author_title} onChange={(e) => set("author_title", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author_bio">Author Bio</Label>
            <Textarea id="author_bio" rows={2} value={form.author_bio} onChange={(e) => set("author_bio", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Author Avatar</Label>
            <SingleImageUploader
              bucket="avatars"
              value={form.author_avatar_url}
              onChange={(url) => set("author_avatar_url", url)}
              label="an avatar"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>SEO &amp; Publishing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta_title">Meta Title (max 60 chars)</Label>
            <Input id="meta_title" maxLength={60} placeholder={form.title} value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description (max 160 chars)</Label>
            <Textarea id="meta_description" maxLength={160} rows={2} placeholder={form.excerpt} value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>OG Image</Label>
            <SingleImageUploader
              bucket="articles"
              value={form.og_image_url}
              onChange={(url) => set("og_image_url", url)}
              label="an OG image"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="published_date">Published Date (schedule or backdate)</Label>
              <Input id="published_date" type="date" value={form.published_date} onChange={(e) => set("published_date", e.target.value)} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch id="featured" checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white px-6 py-3 md:left-60">
        <div className="mx-auto flex max-w-3xl justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/articles")}>
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
