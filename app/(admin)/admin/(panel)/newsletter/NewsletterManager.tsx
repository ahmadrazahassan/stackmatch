"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, UserCheck, UserX, Download, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { formatDateShort } from "@/lib/utils/formatDate";
import {
  deleteNewsletterSubscriber,
  deleteNewsletterSubscriberBulk,
  updateNewsletterSubscriberStatus,
} from "../../actions";
import type { NewsletterSubscriber } from "@/lib/types";

const STATUS_VARIANT: Record<NewsletterSubscriber["status"], "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  unsubscribed: "destructive",
};

function toCsv(rows: NewsletterSubscriber[]) {
  const header = ["email", "status", "interests", "subscribed_at"];
  const lines = rows.map((r) =>
    [r.email, r.status, (r.interests ?? []).join("|"), r.created_at]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

export function NewsletterManager({ data }: { data: NewsletterSubscriber[] }) {
  const router = useRouter();

  const stats = useMemo(() => {
    const confirmed = data.filter((s) => s.status === "confirmed").length;
    const unsubscribed = data.filter((s) => s.status === "unsubscribed").length;
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const thisMonth = data.filter((s) => new Date(s.created_at) >= monthStart).length;
    return { confirmed, unsubscribed, thisMonth };
  }, [data]);

  function exportCsv() {
    const csv = toCsv(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stackmatch-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function toggleStatus(row: NewsletterSubscriber) {
    const next = row.status === "unsubscribed" ? "confirmed" : "unsubscribed";
    const result = await updateNewsletterSubscriberStatus(row.id, next);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(next === "unsubscribed" ? "Marked as unsubscribed." : "Marked as confirmed.");
    router.refresh();
  }

  const columns: ColumnDef<NewsletterSubscriber>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="font-medium">{row.original.email}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "interests",
      header: "Interests",
      cell: ({ row }) => {
        const interests = row.original.interests ?? [];
        return interests.length ? (
          <span className="text-muted-foreground">{interests.join(", ")}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Subscribed",
      cell: ({ row }) => formatDateShort(row.original.created_at),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const s = row.original;
        return (
          <div className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={s.status === "unsubscribed" ? "Resubscribe" : "Mark unsubscribed"}
              onClick={() => toggleStatus(s)}
            >
              {s.status === "unsubscribed" ? (
                <RotateCcw className="h-4 w-4" />
              ) : (
                <UserX className="h-4 w-4" />
              )}
            </Button>
            <ConfirmDialog
              trigger={
                <Button variant="ghost" size="icon" aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              }
              title={`Delete ${s.email}?`}
              description="This permanently removes the subscriber and their consent record."
              onConfirm={async () => {
                const result = await deleteNewsletterSubscriber(s.id);
                if (result.ok) {
                  toast.success("Subscriber deleted.");
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
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="card-shadow">
          <CardContent className="flex items-center gap-4 pt-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light">
              <UserCheck className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.confirmed.toLocaleString("en-GB")}</p>
              <p className="text-sm text-muted-foreground">Active subscribers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="flex items-center gap-4 pt-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light">
              <Mail className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.thisMonth.toLocaleString("en-GB")}</p>
              <p className="text-sm text-muted-foreground">New this month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="flex items-center gap-4 pt-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light">
              <UserX className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.unsubscribed.toLocaleString("en-GB")}</p>
              <p className="text-sm text-muted-foreground">Unsubscribed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search subscribers…"
        onDeleteSelected={deleteNewsletterSubscriberBulk}
        toolbar={
          <Button variant="outline" onClick={exportCsv} className="ml-auto">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        }
      />
    </div>
  );
}
