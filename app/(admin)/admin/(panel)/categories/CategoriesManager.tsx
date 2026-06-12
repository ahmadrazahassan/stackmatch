"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { slugify } from "@/lib/utils/slugify";
import { upsertCategory, deleteCategory } from "../../actions";
import type { Category } from "@/lib/types";

const emptyForm = { name: "", slug: "", icon: "", description: "", display_order: "0" };

export function CategoriesManager({ data }: { data: Category[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (c: Category) => {
    setEditing(c);
    setForm({
      name: c.name,
      slug: c.slug,
      icon: c.icon ?? "",
      description: c.description ?? "",
      display_order: String(c.display_order),
    });
    setOpen(true);
  };

  async function save() {
    if (!form.name || !form.slug) {
      toast.error("Name and slug are required.");
      return;
    }
    setSaving(true);
    const result = await upsertCategory(editing?.id ?? null, {
      name: form.name,
      slug: form.slug,
      icon: form.icon || null,
      description: form.description || null,
      display_order: Number(form.display_order) || 0,
    });
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Category saved.");
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate}>
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? `Edit ${editing.name}` : "New Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cat-name">Name *</Label>
                  <Input
                    id="cat-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        name: e.target.value,
                        slug: editing ? f.slug : slugify(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-slug">Slug *</Label>
                  <Input
                    id="cat-slug"
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cat-icon">Icon (emoji)</Label>
                  <Input
                    id="cat-icon"
                    placeholder="🧮"
                    value={form.icon}
                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat-order">Display Order</Label>
                  <Input
                    id="cat-order"
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm((f) => ({ ...f, display_order: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-desc">Description</Label>
                <Textarea
                  id="cat-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={save} disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-white card-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Software</TableHead>
              <TableHead>Order</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No categories yet.
                </TableCell>
              </TableRow>
            )}
            {data.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">/{c.slug}</TableCell>
                <TableCell>{c.icon}</TableCell>
                <TableCell>{c.software_count}</TableCell>
                <TableCell>{c.display_order}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => startEdit(c)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <ConfirmDialog
                      trigger={
                        <Button variant="ghost" size="icon" aria-label="Delete">
                          <Trash2 className="h-4 w-4 text-error" />
                        </Button>
                      }
                      title={`Delete ${c.name}?`}
                      description="Software in this category will become uncategorised."
                      onConfirm={async () => {
                        const result = await deleteCategory(c.id);
                        if (result.ok) {
                          toast.success("Category deleted.");
                          router.refresh();
                        } else {
                          toast.error(result.error);
                        }
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
