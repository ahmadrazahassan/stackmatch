"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DataTable } from "@/components/admin/DataTable";
import { SoftwareCombobox } from "@/components/admin/SoftwareCombobox";
import { upsertComparison, deleteComparison, deleteComparisonBulk } from "../../actions";
import type { Comparison } from "@/lib/types";

interface SoftwareLite {
  id: string;
  name: string;
  slug: string;
}

interface ComparisonsManagerProps {
  data: Comparison[];
  software: SoftwareLite[];
}

const emptyForm = {
  software_a_id: null as string | null,
  software_b_id: null as string | null,
  custom_verdict: "",
  meta_title: "",
  meta_description: "",
  status: "published",
};

export function ComparisonsManager({ data, software }: ComparisonsManagerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Comparison | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const bySlug = (id: string | null) => software.find((s) => s.id === id);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (c: Comparison) => {
    setEditing(c);
    setForm({
      software_a_id: c.software_a_id,
      software_b_id: c.software_b_id,
      custom_verdict: c.custom_verdict ?? "",
      meta_title: c.meta_title ?? "",
      meta_description: c.meta_description ?? "",
      status: c.status,
    });
    setOpen(true);
  };

  async function save() {
    if (!form.software_a_id || !form.software_b_id) {
      toast.error("Select both software products.");
      return;
    }
    if (form.software_a_id === form.software_b_id) {
      toast.error("Pick two different products.");
      return;
    }
    setSaving(true);
    const result = await upsertComparison(editing?.id ?? null, {
      software_a_id: form.software_a_id,
      software_b_id: form.software_b_id,
      custom_verdict: form.custom_verdict || null,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      status: form.status,
    });
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Comparison saved.");
    setOpen(false);
    router.refresh();
  }

  const columns: ColumnDef<Comparison>[] = [
    {
      id: "software_a",
      header: "Software A",
      accessorFn: (row) => bySlug(row.software_a_id)?.name ?? "—",
    },
    {
      id: "software_b",
      header: "Software B",
      accessorFn: (row) => bySlug(row.software_b_id)?.name ?? "—",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const c = row.original;
        const a = bySlug(c.software_a_id);
        const b = bySlug(c.software_b_id);
        return (
          <div className="flex justify-end gap-1">
            {a && b && (
              <Button variant="ghost" size="icon" asChild aria-label="View on site">
                <Link href={`/compare/${a.slug}-vs-${b.slug}`} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => startEdit(c)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <ConfirmDialog
              trigger={
                <Button variant="ghost" size="icon" aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              }
              title="Delete this comparison?"
              description="The comparison page will fall back to auto-generated content."
              onConfirm={async () => {
                const result = await deleteComparison(c.id);
                if (result.ok) {
                  toast.success("Comparison deleted.");
                  router.refresh();
                } else {
                  toast.error(result.error);
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Comparison" : "New Comparison"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Software A *</Label>
                <SoftwareCombobox
                  options={software}
                  value={form.software_a_id}
                  onChange={(id) => setForm((f) => ({ ...f, software_a_id: id }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Software B *</Label>
                <SoftwareCombobox
                  options={software}
                  value={form.software_b_id}
                  onChange={(id) => setForm((f) => ({ ...f, software_b_id: id }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cmp-verdict">Custom Verdict (editorial opinion)</Label>
              <Textarea
                id="cmp-verdict"
                rows={4}
                value={form.custom_verdict}
                onChange={(e) => setForm((f) => ({ ...f, custom_verdict: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cmp-title">Meta Title</Label>
              <Input
                id="cmp-title"
                maxLength={60}
                value={form.meta_title}
                onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cmp-desc">Meta Description</Label>
              <Textarea
                id="cmp-desc"
                rows={2}
                maxLength={160}
                value={form.meta_description}
                onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="cmp-status"
                checked={form.status === "published"}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, status: v ? "published" : "draft" }))
                }
              />
              <Label htmlFor="cmp-status">
                {form.status === "published" ? "Published" : "Draft"}
              </Label>
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

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search comparisons…"
        onDeleteSelected={deleteComparisonBulk}
        toolbar={
          <Button onClick={startCreate} className="ml-auto">
            <Plus className="h-4 w-4 mr-2" /> Add Comparison
          </Button>
        }
      />
    </div>
  );
}
