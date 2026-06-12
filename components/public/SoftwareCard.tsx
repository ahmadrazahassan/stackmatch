import Link from "next/link";
import { StarRating } from "./StarRating";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";

export function SoftwareCard({ software }: { software: Software }) {
  const brandColor = softwareBrandColors[software.slug] ?? "#00A86B";

  return (
    <div 
      className="group flex flex-col justify-between rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-all duration-350 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md h-full font-sans relative overflow-hidden"
    >
      <div className="space-y-4">
        {/* Top logo & Title row */}
        <div className="flex items-start gap-4">
          <SoftwareLogo src={software.logo_url} name={software.name} size={52} className="rounded-xl border bg-white shadow-sm shrink-0" />
          <div className="min-w-0">
            <Link href={`/software/${software.slug}`} className="block">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-brand transition-colors text-base truncate">
                {software.name}
              </h3>
            </Link>
            {software.category && (
              <Link href={`/category/${software.category.slug}`} className="inline-block mt-0.5">
                <span className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-250/20 dark:border-zinc-800 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider hover:text-brand transition-colors">
                  {software.category.name}
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-750 dark:text-zinc-300">
          <StarRating rating={Number(software.overall_rating)} size="sm" />
          <span className="text-zinc-900 dark:text-zinc-50">{formatRating(Number(software.overall_rating))}</span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
            ({reviewCountLabel(software.review_count)})
          </span>
        </div>

        {/* Short Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-550 dark:text-zinc-400">
          {software.description_short}
        </p>
      </div>

      {/* Starting Price & Free Trial Row */}
      <div className="mt-5 space-y-4">
        <div className="pt-4 border-t border-dashed border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-505 uppercase tracking-wider">Starting from</p>
            <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
              {software.starting_price !== null
                ? formatPrice(software.starting_price, software.price_currency, software.billing_period)
                : "Custom pricing"}
            </p>
          </div>
          {software.free_trial && (
            <span 
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ 
                backgroundColor: `${brandColor}15`, 
                color: brandColor 
              }}
            >
              Free Trial
            </span>
          )}
        </div>

        {/* CTA Link styled as a solid brand-colored button */}
        <Link
          href={`/software/${software.slug}`}
          className="flex w-full items-center justify-center rounded-full text-white py-2.5 text-xs font-bold tracking-wider hover:opacity-90 transition-all duration-200 active:scale-[0.98] text-center"
          style={{ backgroundColor: brandColor }}
        >
          VIEW PROFILE
        </Link>
      </div>
    </div>
  );
}
