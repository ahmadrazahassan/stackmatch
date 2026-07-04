"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/utils/formatDate";
import { deletePage, deletePageBulk } from "../../actions";
import type { Page } from "@/lib/types";

export function PagesTable({ data }: { data: Page[] }) {
  const router = useRouter();

  const columns: ColumnDef<Page>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.title}</p>
          <p className="text-xs text-muted-foreground">/{row.original.slug}</p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => formatDateShort(row.original.updated_at),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="View on site">
            <Link href={`/${row.original.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Edit">
            <Link href={`/admin/pages/${row.original.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon" aria-label="Delete">
                <Trash2 className="h-4 w-4 text-error" />
              </Button>
            }
            title={`Delete "${row.original.title}"?`}
            description="The public URL for this page will 404 until a new page with the same slug is created."
            onConfirm={async () => {
              const result = await deletePage(row.original.id);
              if (result.ok) {
                toast.success("Page deleted.");
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
      searchPlaceholder="Search pages…"
      onDeleteSelected={deletePageBulk}
      toolbar={
        <Button asChild className="ml-auto">
          <Link href="/admin/pages/new">+ Add New Page</Link>
        </Button>
      }
    />
  );
}
