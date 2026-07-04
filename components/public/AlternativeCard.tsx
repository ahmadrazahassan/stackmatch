import Link from "next/link";
import { Check } from "lucide-react";
import { StarRating } from "./StarRating";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";

export function AlternativeCard({ software }: { software: Software }) {
  return (
    <div className="flex h-full flex-col rounded-lg border bg-white p-5 card-shadow transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <SoftwareLogo src={software.logo_url} name={software.name} size={56} />
        <div className="min-w-0">
          <Link href={`/software/${software.slug}`}>
            <h3 className="truncate font-semibold hover:text-brand">{software.name}</h3>
          </Link>
          <div className="flex items-center gap-1.5 text-sm">
            <StarRating rating={Number(software.overall_rating)} size="sm" />
            <span className="font-medium">{formatRating(Number(software.overall_rating))}</span>
            <span className="text-xs text-muted-foreground">
              ({reviewCountLabel(software.review_count)})
            </span>
          </div>
        </div>
      </div>
      {(software.top_features as string[]).length > 0 && (
        <ul className="mt-3 flex-1 space-y-1.5">
          {(software.top_features as string[]).slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              {f}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/software/${software.slug}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-light"
      >
        View Profile
      </Link>
    </div>
  );
}
