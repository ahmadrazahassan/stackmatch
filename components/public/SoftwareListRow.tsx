import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { SoftwareLogo } from "./SoftwareLogo";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { formatPrice, formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";

export function SoftwareListRow({ software }: { software: Software }) {
  const brandColor = softwareBrandColors[software.slug];
  
  return (
    <div 
      className="group flex flex-col gap-5 rounded-xl border bg-white p-6 card-shadow transition-all hover:-translate-y-1 hover:shadow-xl md:flex-row relative overflow-hidden"
    >
      <SoftwareLogo src={software.logo_url} name={software.name} size={80} className="hidden md:block" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 md:hidden">
          <SoftwareLogo src={software.logo_url} name={software.name} size={56} />
          <Link href={`/software/${software.slug}`}>
            <h3 className="text-lg font-bold text-foreground hover:text-brand">{software.name}</h3>
          </Link>
        </div>
        <Link href={`/software/${software.slug}`} className="hidden md:block">
          <h3 className="text-lg font-bold text-foreground hover:text-brand">{software.name}</h3>
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          <StarRating rating={Number(software.overall_rating)} size="sm" />
          <span className="font-semibold">{formatRating(Number(software.overall_rating))}</span>
          <span className="text-muted-foreground">({reviewCountLabel(software.review_count)})</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {software.description_short}
        </p>
        {(software.top_features as string[]).length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {(software.top_features as string[]).slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-sm text-foreground">
                <Check className="h-3.5 w-3.5" style={{ color: brandColor || 'var(--color-brand)' }} /> {f}
              </li>
            ))}
          </ul>
        )}
        <p 
          className="mt-3 text-sm font-semibold"
          style={{ color: brandColor || 'var(--color-foreground)' }}
        >
          {software.starting_price !== null
            ? `From ${formatPrice(software.starting_price, software.price_currency, software.billing_period)}`
            : "Custom pricing"}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-stretch justify-center gap-2 md:w-44">
        <div className="flex flex-wrap justify-center gap-1.5">
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
          {software.free_version && (
            <Badge 
              className="border-transparent text-xs"
              style={{ 
                backgroundColor: brandColor ? `${brandColor}15` : 'var(--color-brand-light)', 
                color: brandColor || 'var(--color-brand-dark)' 
              }}
            >
              Free Version
            </Badge>
          )}
        </div>
        <AffiliateCTAButton softwareId={software.id} label="Visit Website" brandColor={brandColor} />
        <Link
          href={`/software/${software.slug}`}
          className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
          style={{ color: brandColor || 'var(--color-foreground)', borderColor: brandColor ? `${brandColor}40` : undefined }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
