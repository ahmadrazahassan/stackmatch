"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Comparison } from "@/lib/types";
import { brandColorFor } from "@/lib/brandColors";
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

function SideHeader({
  software,
  isPick,
  color,
}: {
  software: NonNullable<Comparison["software_a"]>;
  isPick: boolean;
  color: string;
}) {
  const s = software as NonNullable<Comparison["software_a"]> & {
    overall_rating: number;
    review_count: number;
    logo_url: string | null;
  };
  return (
    <div className="flex w-[45%] flex-col items-center text-center">
      <SoftwareLogo src={s.logo_url} name={s.name} size={56} className="mb-4" />
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">{s.name}</h3>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-zinc-900 dark:text-zinc-50">{formatRating(Number(s.overall_rating))}</span>
        <span>({s.review_count})</span>
      </div>
      <span
        className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-opacity ${
          isPick ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: `${color}14`, color }}
        aria-hidden={!isPick}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        Our pick
      </span>
    </div>
  );
}

function DataRow({
  label,
  left,
  right,
}: {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[40%]">{left}</div>
      <div className="w-[20%] text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        {label}
      </div>
      <div className="w-[40%]">{right}</div>
    </div>
  );
}

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  const a = comparison.software_a;
  const b = comparison.software_b;

  if (!a || !b) return null;

  const colorA = brandColorFor(a, "var(--color-brand)");
  const colorB = brandColorFor(b, "var(--color-navy)");

  const ratingA = Number(a.overall_rating) || 0;
  const ratingB = Number(b.overall_rating) || 0;
  const pickA = ratingA >= ratingB + 0.1;
  const pickB = ratingB >= ratingA + 0.1;

  return (
    <Link
      href={`/compare/${a.slug}-vs-${b.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-[0_14px_36px_-22px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-20px_rgba(0,0,0,0.3)] font-sans"
    >
      {/* brand hairline that fades in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: `linear-gradient(to right, ${colorA}, ${colorB})` }}
      />

      {/* Top Section: Logos and Names */}
      <div className="relative flex justify-between pt-2 pb-7">
        {/* VS Divider badge */}
        <div className="absolute left-1/2 top-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-[10px] font-bold text-zinc-400 uppercase tracking-wider shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          vs
        </div>

        <SideHeader software={a} isPick={pickA} color={colorA} />
        <SideHeader software={b} isPick={pickB} color={colorB} />
      </div>

      {/* Data Rows */}
      <div className="flex flex-col gap-4 px-1">
        <DataRow
          label="Price"
          left={
            <span className="block truncate text-left text-xs font-bold text-zinc-900 dark:text-zinc-50">
              {formatPrice(a.starting_price, a.price_currency, a.billing_period)}
            </span>
          }
          right={
            <span className="block truncate text-right text-xs font-bold text-zinc-900 dark:text-zinc-50">
              {formatPrice(b.starting_price, b.price_currency, b.billing_period)}
            </span>
          }
        />
        <DataRow
          label="Features"
          left={<ScoreBar value={Number(a.functionality_rating) || 0} color={colorA} align="left" />}
          right={<ScoreBar value={Number(b.functionality_rating) || 0} color={colorB} align="right" />}
        />
        <DataRow
          label="Ease of Use"
          left={<ScoreBar value={Number(a.ease_of_use_rating) || 0} color={colorA} align="left" />}
          right={<ScoreBar value={Number(b.ease_of_use_rating) || 0} color={colorB} align="right" />}
        />
        <DataRow
          label="Value"
          left={<ScoreBar value={Number(a.value_for_money_rating) || 0} color={colorA} align="left" />}
          right={<ScoreBar value={Number(b.value_for_money_rating) || 0} color={colorB} align="right" />}
        />
      </div>

      {/* Footer CTA */}
      <div className="mt-6 flex items-center justify-center">
        <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-900 group-hover:bg-brand group-hover:text-navy group-hover:border-transparent transition-all duration-300">
          View Comparison <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
