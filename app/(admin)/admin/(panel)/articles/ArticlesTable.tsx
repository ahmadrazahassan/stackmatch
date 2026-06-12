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
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/utils/formatDate";
import { deleteArticle, deleteArticleBulk } from "../../actions";
import type { Article } from "@/lib/types";

export function ArticlesTable({ data }: { data: Article[] }) {
  const router = useRouter();

  const columns: ColumnDef<Article>[] = [
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
      accessorKey: "category_tag",
      header: "Tag",
      cell: ({ row }) =>
        row.original.category_tag ? (
          <Badge variant="secondary" className="bg-muted text-foreground">
            {row.original.category_tag}
          </Badge>
        ) : (
          "—"
        ),
    },
    { accessorKey: "author_name", header: "Author" },
    {
      accessorKey: "published_date",
      header: "Published",
      cell: ({ row }) => formatDateShort(row.original.published_date),
    },
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
            <Link href={`/blog/${row.original.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Edit">
            <Link href={`/admin/articles/${row.original.id}/edit`}>
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
            description="This permanently removes the article. This cannot be undone."
            onConfirm={async () => {
              const result = await deleteArticle(row.original.id);
              if (result.ok) {
                toast.success("Article deleted.");
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
      searchPlaceholder="Search articles…"
      onDeleteSelected={deleteArticleBulk}
      toolbar={
        <Button asChild className="ml-auto">
          <Link href="/admin/articles/new">+ Add New Article</Link>
        </Button>
      }
    />
  );
}
