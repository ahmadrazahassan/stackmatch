"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Pencil, Trash2, Star, BadgeCheck } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/utils/formatDate";
import { deleteReview } from "../../actions";
import type { Review } from "@/lib/types";

export function ReviewsTable({ data }: { data: Review[] }) {
  const router = useRouter();

  const columns: ColumnDef<Review>[] = [
    {
      id: "software",
      header: "Software",
      accessorFn: (row) => row.software?.name ?? "—",
      cell: ({ row }) => <span className="font-medium">{row.original.software?.name ?? "—"}</span>,
    },
    {
      accessorKey: "reviewer_name",
      header: "Reviewer",
      cell: ({ row }) => (
        <div>
          <p className="flex items-center gap-1 font-medium">
            {row.original.reviewer_name}
            {row.original.verified_linkedin && <BadgeCheck className="h-3.5 w-3.5 text-brand" />}
          </p>
          <p className="text-xs text-muted-foreground">{row.original.reviewer_job_title}</p>
        </div>
      ),
    },
    {
      accessorKey: "overall_rating",
      header: "Rating",
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-star text-star" />
          {row.original.overall_rating}
        </span>
      ),
    },
    { accessorKey: "reviewer_country", header: "Country" },
    { accessorKey: "reviewer_industry", header: "Industry" },
    {
      accessorKey: "review_date",
      header: "Date",
      cell: ({ row }) => formatDateShort(row.original.review_date),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Edit">
            <Link href={`/admin/reviews/${row.original.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon" aria-label="Delete">
                <Trash2 className="h-4 w-4 text-error" />
              </Button>
            }
            title="Delete this review?"
            description={`Review "${row.original.review_title}" by ${row.original.reviewer_name} will be permanently removed and ratings recalculated.`}
            onConfirm={async () => {
              const result = await deleteReview(row.original.id);
              if (result.ok) {
                toast.success("Review deleted.");
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
      searchPlaceholder="Search reviews…"
      toolbar={
        <Button asChild className="ml-auto">
          <Link href="/admin/reviews/new">+ Add New Review</Link>
        </Button>
      }
    />
  );
}
