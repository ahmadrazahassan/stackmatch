import Link from "next/link";
import { Check, Globe, Headphones, X, Puzzle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { formatPrice } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";

export function SoftwareSidebar({
  software,
  compareWith,
  contactEmail,
  brandColor,
}: {
  software: Software;
  compareWith?: Software | null;
  contactEmail?: string;
  brandColor?: string;
}) {
  const color = brandColor ?? "#00A86B";
  const formattedStartingPrice = software.starting_price !== null
    ? formatPrice(software.starting_price, software.price_currency).replace("US$", "$")
    : "Custom Pricing";

  return (
    <aside className="space-y-6 rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
      <AffiliateCTAButton
        softwareId={software.id}
        label={`Visit ${software.name} Website`}
        subtext={software.free_trial ? "Free trial available" : null}
        size="lg"
        brandColor={color}
      />

      <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 p-5 text-center font-sans">
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Starting from</p>
        <p className="text-2xl font-bold font-heading mt-1.5 leading-none" style={{ color: color }}>
          {formattedStartingPrice}
          {software.starting_price !== null && (
            <span className="text-xs font-normal text-zinc-400 dark:text-zinc-505">/{software.billing_period === "month" ? "mo" : software.billing_period}</span>
          )}
        </p>
      </div>

      <ul className="space-y-3 text-sm font-sans font-medium text-zinc-700 dark:text-zinc-300">
        <li className="flex items-center gap-2.5">
          {software.free_trial ? (
            <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
          ) : (
            <X className="h-4.5 w-4.5 text-rose-500 shrink-0" />
          )}
          Free Trial
        </li>
        <li className="flex items-center gap-2.5">
          {software.free_version ? (
            <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
          ) : (
            <X className="h-4.5 w-4.5 text-rose-500 shrink-0" />
          )}
          Free Version
        </li>
      </ul>

      <div className="border-t border-dashed border-zinc-200 dark:border-zinc-800 my-4" />

      <div className="space-y-3.5">
        <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-sans">About the Vendor</h3>
        <dl className="space-y-3 text-sm font-sans font-medium text-zinc-700 dark:text-zinc-300">
          {software.vendor_name && (
            <div className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-900/40 pb-2.5">
              <dt className="text-zinc-400 dark:text-zinc-500">Vendor</dt>
              <dd className="font-semibold text-zinc-850 dark:text-zinc-200 text-right">{software.vendor_name}</dd>
            </div>
          )}
          {software.founded_year && (
            <div className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-900/40 pb-2.5">
              <dt className="text-zinc-400 dark:text-zinc-500">Founded</dt>
              <dd className="font-semibold text-zinc-850 dark:text-zinc-200 text-right">{software.founded_year}</dd>
            </div>
          )}
          {(software.support_types as string[]).length > 0 && (
            <div className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-900/40 pb-2.5">
              <dt className="text-zinc-400 dark:text-zinc-500 shrink-0 pr-4">Support</dt>
              <dd className="font-semibold text-zinc-850 dark:text-zinc-200 text-right">
                {(software.support_types as string[]).join(", ")}
              </dd>
            </div>
          )}
          {(software.countries_available as string[]).length > 0 && (
            <div className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-900/40 pb-2.5">
              <dt className="text-zinc-400 dark:text-zinc-500 shrink-0 pr-4">Countries</dt>
              <dd className="font-semibold text-zinc-850 dark:text-zinc-200 text-right leading-snug">
                {(software.countries_available as string[]).join(", ")}
              </dd>
            </div>
          )}
          {(software.languages as string[]).length > 0 && (
            <div className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-900/40 pb-2.5">
              <dt className="text-zinc-400 dark:text-zinc-500 shrink-0 pr-4">Languages</dt>
              <dd className="font-semibold text-zinc-850 dark:text-zinc-200 text-right">
                {(software.languages as string[]).join(", ")}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="border-t border-dashed border-zinc-200 dark:border-zinc-800 my-4" />

      <Link
        href={`/software/${software.slug}/reviews/new`}
        className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 bg-white dark:bg-zinc-950 px-4 py-3 text-xs font-bold tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-[0.98] cursor-pointer font-sans"
      >
        WRITE A REVIEW
      </Link>

      {compareWith && (
        <div className="pt-1 text-center">
          <Link
            href={`/compare/${software.slug}-vs-${compareWith.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider hover:opacity-85 transition-opacity font-sans"
            style={{ color: color }}
          >
            Compare with {compareWith.name} &rarr;
          </Link>
        </div>
      )}
    </aside>
  );
}
