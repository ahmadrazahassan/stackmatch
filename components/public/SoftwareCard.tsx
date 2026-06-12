import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";

export function SoftwareCard({ software }: { software: Software }) {
  const brandColor = softwareBrandColors[software.slug];

  return (
    <div 
      className="group flex h-full flex-col rounded-xl border bg-white p-5 card-shadow transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
    >
      <div className="flex items-start gap-3">
        <SoftwareLogo src={software.logo_url} name={software.name} size={60} />
        <div className="min-w-0">
          <Link href={`/software/${software.slug}`} className="block">
            <h3 className="truncate font-semibold text-foreground hover:text-brand">
              {software.name}
            </h3>
          </Link>
          {software.category && (
            <Link href={`/category/${software.category.slug}`}>
              <Badge variant="secondary" className="mt-1 bg-muted text-xs font-medium text-muted-foreground hover:text-brand">
                {software.category.name}
              </Badge>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <StarRating rating={Number(software.overall_rating)} size="sm" />
        <span className="font-semibold">{formatRating(Number(software.overall_rating))}</span>
        <span className="text-muted-foreground">
          ({reviewCountLabel(software.review_count)})
        </span>
      </div>

      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
        {software.description_short}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span 
          className="text-sm font-semibold text-foreground"
        >
          {software.starting_price !== null
            ? `From ${formatPrice(software.starting_price, software.price_currency, software.billing_period)}`
            : "Custom pricing"}
        </span>
        {software.free_trial && (
          <Badge 
            className="border-transparent text-xs"
            style={{ 
              backgroundColor: brandColor ? `${brandColor}15` : 'var(--color-brand-light)', 
              color: brandColor || 'var(--color-brand-dark)' 
            }}
          >
            Free Trial
          </Badge>
        )}
      </div>

      <Link
        href={`/software/${software.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
        style={{ color: brandColor || 'var(--color-brand)' }}
      >
        View Profile <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
