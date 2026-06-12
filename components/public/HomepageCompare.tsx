"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { StarRating } from "./StarRating";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";

interface HomepageCompareProps {
  compareSoftware: Software[];
}

export function HomepageCompare({ compareSoftware }: HomepageCompareProps) {
  // Take up to 4 items for side-by-side comparisons
  const items = compareSoftware.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section id="compare-choices" className="container-site py-24 border-t border-dashed border-zinc-200 dark:border-zinc-800">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span
          className="inline-flex items-center rounded-full border border-dashed px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-sm"
          style={{
            borderColor: `rgba(0, 168, 107, 0.25)`,
            boxShadow: `0 2px 10px -2px rgba(0, 168, 107, 0.1)`,
          }}
        >
          Compare
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl font-sans">
          Compare Popular Choices
        </h2>
        <p className="text-sm text-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
          Evaluate side-by-side each product's starting pricing, features, and verified rating dimensions.
        </p>
      </div>

      {/* Comparison tags */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-zinc-500">
        <span>Comparison:</span>
        {items.map((item) => {
          const brandColor = softwareBrandColors[item.slug] ?? "#00A86B";
          return (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-1.5 text-zinc-800 dark:text-zinc-200 shadow-sm"
            >
              <SoftwareLogo src={item.logo_url} name={item.name} size={16} className="rounded" />
              {item.name}
            </span>
          );
        })}
        <Link
          href="/compare"
          className="text-brand hover:text-brand-dark transition-colors font-bold underline underline-offset-2 ml-2"
        >
          See full comparison &rarr;
        </Link>
      </div>

      {/* Side-by-Side Grid */}
      <div className="mt-10 overflow-x-auto pb-4">
        <div className="min-w-[768px] grid grid-cols-4 gap-6">
          {items.map((s) => {
            const brandColor = softwareBrandColors[s.slug] ?? "#00A86B";

            return (
              <div
                key={s.id}
                className="flex flex-col justify-between rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 h-full font-sans"
              >
                {/* Product Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <SoftwareLogo src={s.logo_url} name={s.name} size={40} className="rounded-lg border bg-white shadow-sm shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm truncate">{s.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-zinc-500 font-medium">
                        <span className="text-zinc-900 dark:text-zinc-50 font-bold">★ {formatRating(Number(s.overall_rating))}</span>
                        <span>({s.review_count})</span>
                      </div>
                    </div>
                  </div>

                  {/* Starting Price row */}
                  <div className="pt-4 border-t border-dashed border-zinc-150 dark:border-zinc-800 flex justify-between items-center text-xs">
                    <span className="text-zinc-400 dark:text-zinc-550 font-bold uppercase tracking-wider text-[9px]">Starting Price</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-50 text-right">
                      {s.starting_price !== null
                        ? formatPrice(s.starting_price, s.price_currency, s.billing_period)
                        : "Custom price"}
                    </span>
                  </div>

                  {/* Rating dimensions */}
                  <div className="pt-4 border-t border-dashed border-zinc-150 dark:border-zinc-800 space-y-4">
                    {(
                      [
                        ["Value for Money", "value_for_money_rating"],
                        ["Functionality", "functionality_rating"],
                        ["Ease of Use", "ease_of_use_rating"],
                        ["Customer Service", "customer_service_rating"],
                      ] as const
                    ).map(([label, key]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          <span>{label}</span>
                          <span className="text-zinc-900 dark:text-zinc-50">{formatRating(Number(s[key]))}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(Number(s[key]) / 5) * 100}%`,
                              backgroundColor: brandColor,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile CTA */}
                <div className="mt-8 pt-4 border-t border-dashed border-zinc-150 dark:border-zinc-800">
                  <Link
                    href={`/software/${s.slug}`}
                    className="flex w-full items-center justify-center rounded-full text-white py-2 text-xs font-bold tracking-wider hover:opacity-90 transition-all duration-200 active:scale-[0.98] text-center"
                    style={{ backgroundColor: brandColor }}
                  >
                    View profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Banner Callout */}
      <div className="mt-12 rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm font-sans">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 dark:bg-white">
            <BarChart3 className="h-6 w-6 text-white dark:text-zinc-950" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">Select top products and build your comparison</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Compare features, ratings, and pricing side-by-side instantly.</p>
          </div>
        </div>
        <Link
          href="/compare"
          className="w-full md:w-auto shrink-0 inline-flex justify-center items-center rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-8 py-3 text-xs font-bold tracking-wider hover:opacity-90 transition-all duration-200 active:scale-[0.98]"
        >
          Create your comparison
        </Link>
      </div>
    </section>
  );
}
