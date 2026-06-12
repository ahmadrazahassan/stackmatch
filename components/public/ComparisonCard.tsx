"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Comparison, Software } from "@/lib/types";
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
      <span className="text-sm font-semibold text-gray-800">{formatRating(value)}</span>
      <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-gray-100">
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
      className="group flex flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Top Section: Logos and Names */}
      <div className="relative flex justify-between pt-2 pb-8">
        {/* VS Text */}
        <div className="absolute left-1/2 top-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          vs
        </div>

        {/* Software A */}
        <div className="flex w-[45%] flex-col items-center text-center">
          <SoftwareLogo src={a.logo_url} name={a.name} size={44} className="mb-4" />
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1">{a.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
            <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
            <span className="font-semibold text-gray-900">{formatRating(Number(a.overall_rating))}</span>
            <span>({a.review_count})</span>
          </div>
        </div>

        {/* Software B */}
        <div className="flex w-[45%] flex-col items-center text-center">
          <SoftwareLogo src={b.logo_url} name={b.name} size={44} className="mb-4" />
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1">{b.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
            <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
            <span className="font-semibold text-gray-900">{formatRating(Number(b.overall_rating))}</span>
            <span>({b.review_count})</span>
          </div>
        </div>
      </div>

      {/* Data Rows */}
      <div className="flex flex-col gap-6 px-1">
        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="w-[40%] text-sm font-bold text-gray-900 text-left">
            {formatPrice(a.starting_price, a.price_currency, a.billing_period)}
          </div>
          <div className="w-[20%] text-center text-[11px] font-medium text-gray-400">
            Price
          </div>
          <div className="w-[40%] text-sm font-bold text-gray-900 text-right">
            {formatPrice(b.starting_price, b.price_currency, b.billing_period)}
          </div>
        </div>

        {/* Features Row */}
        <div className="flex items-center justify-between">
          <div className="w-[40%]">
            <ScoreBar value={Number(a.functionality_rating) || 0} color={colorA} align="left" />
          </div>
          <div className="w-[20%] text-center text-[11px] font-medium text-gray-400">
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
          <div className="w-[20%] text-center text-[11px] font-medium text-gray-400">
            Ease of Use
          </div>
          <div className="w-[40%]">
            <ScoreBar value={Number(b.ease_of_use_rating) || 0} color={colorB} align="right" />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-8 flex items-center justify-center">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2">
          View full comparison <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
