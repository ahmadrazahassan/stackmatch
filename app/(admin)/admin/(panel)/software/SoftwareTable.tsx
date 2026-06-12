"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Pencil, Trash2, Star, ExternalLink } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { deleteSoftware } from "../../actions";
import type { Software } from "@/lib/types";

export function SoftwareTable({ data }: { data: Software[] }) {
  const router = useRouter();

  const columns: ColumnDef<Software>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.original.logo_url}
              alt=""
              className="h-9 w-9 rounded-md border bg-white object-contain p-0.5"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-light text-sm font-semibold text-brand">
              {row.original.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">/{row.original.slug}</p>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      accessorFn: (row) => row.category?.name ?? "—",
    },
    {
      accessorKey: "overall_rating",
      header: "Rating",
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-star text-star" />
          {Number(row.original.overall_rating) > 0
            ? Number(row.original.overall_rating).toFixed(1)
            : "—"}
        </span>
      ),
    },
    { accessorKey: "review_count", header: "Reviews" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "featured",
      header: "Featured",
      cell: ({ row }) => (row.original.featured ? "★ Yes" : "—"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="View on site">
            <Link href={`/software/${row.original.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Edit">
            <Link href={`/admin/software/${row.original.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon" aria-label="Delete">
                <Trash2 className="h-4 w-4 text-error" />
              </Button>
            }
            title={`Delete ${row.original.name}?`}
            description="This permanently removes the software and all of its reviews. This cannot be undone."
            onConfirm={async () => {
              const result = await deleteSoftware(row.original.id);
              if (result.ok) {
                toast.success("Software deleted.");
                router.refresh();
              } else {
                toast.error(result.error);
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search software…"
      toolbar={
        <Button asChild className="ml-auto">
          <Link href="/admin/software/new">+ Add New Software</Link>
        </Button>
      }
    />
  );
}
