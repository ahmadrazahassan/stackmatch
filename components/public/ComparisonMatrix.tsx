import Link from "next/link";
import { Check, Minus, Star, Trophy } from "lucide-react";
import { SoftwareLogo } from "./SoftwareLogo";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { ScoreMeter } from "./CompareCharts";
import { StarRating } from "./StarRating";
import { brandColorFor } from "@/lib/brandColors";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";

const SUB_RATINGS = [
  ["Ease of Use", "ease_of_use_rating"],
  ["Value for Money", "value_for_money_rating"],
  ["Customer Service", "customer_service_rating"],
  ["Functionality", "functionality_rating"],
] as const;

const GRID = "grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[240px_1fr_1fr]";

function SectionBand({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-50/80 dark:bg-zinc-900/40 px-5 sm:px-8 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
      {children}
    </div>
  );
}

/** A label + two value cells, with an optional winner side highlighted. */
function Row({
  label,
  a,
  b,
  winner,
}: {
  label: string;
  a: React.ReactNode;
  b: React.ReactNode;
  winner?: "a" | "b" | null;
}) {
  return (
    <div className={`${GRID} items-center border-t border-zinc-100 dark:border-zinc-800/70`}>
      <div className="px-5 sm:px-8 py-5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</div>
      <div className={`flex items-center justify-center px-3 py-5 text-center ${winner === "a" ? "bg-emerald-50/40 dark:bg-emerald-950/15" : ""}`}>
        {a}
      </div>
      <div className={`flex items-center justify-center px-3 py-5 text-center ${winner === "b" ? "bg-emerald-50/40 dark:bg-emerald-950/15" : ""}`}>
        {b}
      </div>
    </div>
  );
}

function MiniBar({ value, color, lead }: { value: number; color: string; lead: boolean }) {
  return (
    <div className="flex w-full max-w-[200px] flex-col items-center gap-1.5">
      <div className="flex items-center gap-1.5">
        <span
          className={`text-base font-bold tabular-nums ${lead ? "" : "text-zinc-900 dark:text-zinc-50"}`}
          style={lead ? { color } : undefined}
        >
          {formatRating(value)}
        </span>
        {lead && <Trophy className="h-3.5 w-3.5" style={{ color }} />}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full animate-fill-bar"
          style={{ width: `${(value / 5) * 100}%`, backgroundColor: color, opacity: lead ? 1 : 0.55 }}
        />
      </div>
    </div>
  );
}

function YesNo({ on, color }: { on: boolean; color: string }) {
  return on ? (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
      style={{ backgroundColor: color }}
    >
      <Check className="h-5 w-5" />
    </span>
  ) : (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
      <Minus className="h-5 w-5" />
    </span>
  );
}

function FeatureList({ features, color }: { features: string[]; color: string }) {
  if (features.length === 0) return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <ul className="mx-auto max-w-[240px] space-y-2 text-left">
      {features.slice(0, 5).map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
          <span className="leading-snug">{f}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Wide head-to-head comparison matrix: donut-led product headers, ratings with
 * mini bars and winner highlights, capability check/cross cells and feature lists.
 * Replaces the old dense table.
 */
export function ComparisonMatrix({ a, b }: { a: Software; b: Software }) {
  const colorA = brandColorFor(a);
  const colorB = brandColorFor(b, "#1E3A5F");

  const win = (va: number, vb: number): "a" | "b" | null =>
    Math.abs(va - vb) < 0.05 ? null : va > vb ? "a" : "b";

  const samePriceCurrency = a.price_currency === b.price_currency;
  const priceWinner =
    a.starting_price !== null && b.starting_price !== null && samePriceCurrency
      ? win(b.starting_price, a.starting_price) // lower price wins → invert
      : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      {/* ---- product header band ---- */}
      <div className={`${GRID} items-stretch bg-zinc-50/60 dark:bg-zinc-900/30`}>
        <div className="hidden sm:flex flex-col justify-end px-8 py-7">
          <p className="text-lg font-bold font-heading text-zinc-900 dark:text-zinc-50">Head to head</p>
          <p className="text-xs text-muted-foreground">Verified data &amp; user ratings</p>
        </div>
        {[a, b].map((s, i) => {
          const color = i === 0 ? colorA : colorB;
          return (
            <div
              key={s.id}
              className="flex flex-col items-center gap-3 border-l border-zinc-100 dark:border-zinc-800/70 px-4 py-7"
              style={{ borderTop: `3px solid ${color}` }}
            >
              <SoftwareLogo src={s.logo_url} name={s.name} size={64} className="shadow-sm" />
              <Link
                href={`/software/${s.slug}`}
                className="text-center text-lg font-extrabold font-heading hover:underline"
                style={{ color }}
              >
                {s.name}
              </Link>
              <ScoreMeter value={Number(s.overall_rating)} color={color} />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {s.review_count.toLocaleString("en-GB")} reviews
              </div>
              <AffiliateCTAButton softwareId={s.id} label="Visit Website" brandColor={color} radius="rounded" />
            </div>
          );
        })}
      </div>

      {/* ---- ratings ---- */}
      <SectionBand>User ratings</SectionBand>
      <Row
        label="Overall rating"
        winner={win(Number(a.overall_rating), Number(b.overall_rating))}
        a={
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black tabular-nums text-zinc-900 dark:text-zinc-50">{formatRating(Number(a.overall_rating))}</span>
            <StarRating rating={Number(a.overall_rating)} size="sm" />
          </div>
        }
        b={
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black tabular-nums text-zinc-900 dark:text-zinc-50">{formatRating(Number(b.overall_rating))}</span>
            <StarRating rating={Number(b.overall_rating)} size="sm" />
          </div>
        }
      />
      {SUB_RATINGS.map(([label, key]) => {
        const va = Number(a[key]);
        const vb = Number(b[key]);
        const w = win(va, vb);
        return (
          <Row
            key={key}
            label={label}
            winner={w}
            a={<MiniBar value={va} color={colorA} lead={w === "a"} />}
            b={<MiniBar value={vb} color={colorB} lead={w === "b"} />}
          />
        );
      })}

      {/* ---- pricing ---- */}
      <SectionBand>Pricing &amp; plans</SectionBand>
      <Row
        label="Starting price"
        winner={priceWinner}
        a={
          <span className="text-lg font-bold" style={{ color: colorA }}>
            {a.starting_price !== null ? formatPrice(a.starting_price, a.price_currency, a.billing_period) : "Custom"}
          </span>
        }
        b={
          <span className="text-lg font-bold" style={{ color: colorB }}>
            {b.starting_price !== null ? formatPrice(b.starting_price, b.price_currency, b.billing_period) : "Custom"}
          </span>
        }
      />
      <Row label="Free trial" a={<YesNo on={a.free_trial} color={colorA} />} b={<YesNo on={b.free_trial} color={colorB} />} />
      <Row label="Free version" a={<YesNo on={a.free_version} color={colorA} />} b={<YesNo on={b.free_version} color={colorB} />} />
      <Row
        label="Pricing plans"
        a={<span className="font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{a.pricing_plans?.length || "—"}</span>}
        b={<span className="font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{b.pricing_plans?.length || "—"}</span>}
      />

      {/* ---- features ---- */}
      <SectionBand>Top features</SectionBand>
      <Row
        label="Standout capabilities"
        a={<FeatureList features={(a.top_features as string[]) ?? []} color={colorA} />}
        b={<FeatureList features={(b.top_features as string[]) ?? []} color={colorB} />}
      />

      {/* ---- best for ---- */}
      <SectionBand>Best for</SectionBand>
      <Row
        label="Ideal customer"
        a={<span className="text-sm leading-6 text-muted-foreground">{a.description_short}</span>}
        b={<span className="text-sm leading-6 text-muted-foreground">{b.description_short}</span>}
      />
    </div>
  );
}
