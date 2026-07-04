"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Pencil, Trash2, ExternalLink, Swords } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { deleteComparison, deleteComparisonBulk } from "../../actions";
import type { Comparison } from "@/lib/types";
import type { ComparisonSoftware } from "./ComparisonForm";

interface ComparisonsTableProps {
  data: Comparison[];
  software: ComparisonSoftware[];
}

function Logo({ s }: { s?: ComparisonSoftware }) {
  if (!s) return <span className="text-muted-foreground">—</span>;
  return (
    <span className="flex items-center gap-2.5">
      {s.logo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={s.logo_url}
          alt=""
          className="h-8 w-8 shrink-0 rounded-md object-contain"
        />
      ) : (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-bold">
          {s.name.charAt(0)}
        </span>
      )}
      <span className="font-medium">{s.name}</span>
    </span>
  );
}

export function ComparisonsTable({ data, software }: ComparisonsTableProps) {
  const router = useRouter();
  const byId = (id: string | null) => software.find((s) => s.id === id);

  const columns: ColumnDef<Comparison>[] = [
    {
      id: "software_a",
      header: "Software A",
      accessorFn: (row) => byId(row.software_a_id)?.name ?? "",
      cell: ({ row }) => <Logo s={byId(row.original.software_a_id)} />,
    },
    {
      id: "vs",
      header: "",
      cell: () => (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-black text-muted-foreground">
          VS
        </span>
      ),
    },
    {
      id: "software_b",
      header: "Software B",
      accessorFn: (row) => byId(row.software_b_id)?.name ?? "",
      cell: ({ row }) => <Logo s={byId(row.original.software_b_id)} />,
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
        const a = byId(c.software_a_id);
        const b = byId(c.software_b_id);
        return (
          <div className="flex justify-end gap-1">
            {a && b && (
              <Button variant="ghost" size="icon" asChild aria-label="View on site">
                <Link href={`/compare/${a.slug}-vs-${b.slug}`} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" asChild aria-label="Edit">
              <Link href={`/admin/comparisons/${c.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
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
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search comparisons…"
      onDeleteSelected={deleteComparisonBulk}
      toolbar={
        <Button asChild className="ml-auto">
          <Link href="/admin/comparisons/new">
            <Swords className="mr-2 h-4 w-4" /> New Comparison
          </Link>
        </Button>
      }
    />
  );
}
