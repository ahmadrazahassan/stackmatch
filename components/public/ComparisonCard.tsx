"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Comparison } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";
import { useEffect, useState } from "react";

function ScoreBar({ value, color, align = "left" }: { value: number; color: string; align?: "left" | "right" }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth((value / 5) * 100);
    }, 150);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={`flex w-full items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{formatRating(value)}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${align === "right" ? "ml-auto" : ""}`} 
          style={{ width: `${width}%`, backgroundColor: color }} 
        />
      </div>
    </div>
  );
}

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  const a = comparison.software_a;
  const b = comparison.software_b;

  if (!a || !b) return null;

  const colorA = softwareBrandColors[a.slug] || "var(--color-brand)";
  const colorB = softwareBrandColors[b.slug] || "var(--color-navy)";

  return (
    <Link
      href={`/compare/${a.slug}-vs-${b.slug}`}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-350 dark:hover:border-zinc-700 hover:shadow-md h-full font-sans"
    >
      {/* Top Section: Logos and Names */}
      <div className="relative flex justify-between pt-2 pb-8">
        {/* VS Divider badge */}
        <div className="absolute left-1/2 top-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-zinc-200 bg-white text-[10px] font-bold text-zinc-400 uppercase tracking-wider shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          vs
        </div>

        {/* Software A */}
        <div className="flex w-[45%] flex-col items-center text-center">
          <SoftwareLogo src={a.logo_url} name={a.name} size={44} className="mb-4" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">{a.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{formatRating(Number(a.overall_rating))}</span>
            <span>({a.review_count})</span>
          </div>
        </div>

        {/* Software B */}
        <div className="flex w-[45%] flex-col items-center text-center">
          <SoftwareLogo src={b.logo_url} name={b.name} size={44} className="mb-4" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">{b.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{formatRating(Number(b.overall_rating))}</span>
            <span>({b.review_count})</span>
          </div>
        </div>
      </div>

      {/* Data Rows */}
      <div className="flex flex-col gap-4 px-1">
        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="w-[40%] text-xs font-bold text-zinc-900 dark:text-zinc-50 text-left truncate">
            {formatPrice(a.starting_price, a.price_currency, a.billing_period)}
          </div>
          <div className="w-[20%] text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Price
          </div>
          <div className="w-[40%] text-xs font-bold text-zinc-900 dark:text-zinc-50 text-right truncate">
            {formatPrice(b.starting_price, b.price_currency, b.billing_period)}
          </div>
        </div>

        {/* Features Row */}
        <div className="flex items-center justify-between">
          <div className="w-[40%]">
            <ScoreBar value={Number(a.functionality_rating) || 0} color={colorA} align="left" />
          </div>
          <div className="w-[20%] text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Features
          </div>
          <div className="w-[40%]">
            <ScoreBar value={Number(b.functionality_rating) || 0} color={colorB} align="right" />
          </div>
        </div>

        {/* Ease of Use Row */}
        <div className="flex items-center justify-between">
          <div className="w-[40%]">
            <ScoreBar value={Number(a.ease_of_use_rating) || 0} color={colorA} align="left" />
          </div>
          <div className="w-[20%] text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Ease of Use
          </div>
          <div className="w-[40%]">
            <ScoreBar value={Number(b.ease_of_use_rating) || 0} color={colorB} align="right" />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 flex items-center justify-center">
        <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-900 group-hover:bg-brand group-hover:text-navy group-hover:border-transparent transition-all duration-300">
          View Comparison <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
