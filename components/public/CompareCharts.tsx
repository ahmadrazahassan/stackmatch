"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPrice } from "@/lib/utils/formatRating";

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

/** Fires once when the element scrolls into view — used to defer chart mount so
 * Recharts' entrance animation plays exactly when the user reaches it. */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/** Counts up to `value` on mount (i.e. when its chart scrolls into view). */
function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const duration = 900;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return (
    <>
      {n.toFixed(decimals)}
      {suffix}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared theming                                                      */
/* ------------------------------------------------------------------ */

/**
 * Recharts renders to SVG with literal color props, so it can't read Tailwind
 * dark: classes. We resolve a small palette from the active theme instead and
 * re-render when it flips.
 */
function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return {
    mounted,
    grid: dark ? "#27272a" : "#e5e7eb", // zinc-800 / zinc-200
    axis: dark ? "#a1a1aa" : "#52525b", // zinc-400 / zinc-600
    tick: dark ? "#71717a" : "#9ca3af", // zinc-500 / gray-400
    tooltipBg: dark ? "#18181b" : "#ffffff",
    tooltipBorder: dark ? "#27272a" : "#e5e7eb",
    tooltipText: dark ? "#fafafa" : "#18181b",
  };
}

interface SidePair {
  name: string;
  color: string;
  ratings: {
    easeOfUse: number;
    valueForMoney: number;
    customerService: number;
    functionality: number;
  };
}

const DIMENSIONS = [
  ["Ease of Use", "easeOfUse"],
  ["Value for Money", "valueForMoney"],
  ["Customer Service", "customerService"],
  ["Functionality", "functionality"],
] as const;

/** Short axis labels so four categories fit on a phone; full names stay in the tooltip/legend. */
const AXIS_LABEL: Record<string, string> = {
  "Ease of Use": "Ease",
  "Value for Money": "Value",
  "Customer Service": "Support",
  Functionality: "Features",
};

function tooltipStyle(t: ReturnType<typeof useChartTheme>) {
  return {
    contentStyle: {
      borderRadius: 12,
      border: `1px solid ${t.tooltipBorder}`,
      backgroundColor: t.tooltipBg,
      color: t.tooltipText,
      boxShadow: "0 8px 24px -8px rgba(0,0,0,0.18)",
      fontWeight: 600,
      fontSize: 13,
    },
    labelStyle: { color: t.tooltipText, fontWeight: 700, marginBottom: 4 },
    itemStyle: { color: t.tooltipText },
  };
}

/* ------------------------------------------------------------------ */
/* Grouped ratings bar chart                                           */
/* ------------------------------------------------------------------ */

export function RatingsBarChart({ a, b }: { a: SidePair; b: SidePair }) {
  const t = useChartTheme();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const data = DIMENSIONS.map(([label, key]) => ({
    dimension: label,
    [a.name]: Number(a.ratings[key].toFixed(1)),
    [b.name]: Number(b.ratings[key].toFixed(1)),
  }));

  const ready = t.mounted && inView;

  return (
    <div
      ref={ref}
      className="h-[340px] w-full"
      role="img"
      aria-label={`Bar chart comparing ${a.name} and ${b.name} across four rating dimensions, each out of 5`}
    >
      {ready && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }} barGap={6} barCategoryGap="22%">
            <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
            <XAxis
              dataKey="dimension"
              tick={{ fill: t.axis, fontSize: 12, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: t.grid }}
              tickFormatter={(v: string) => AXIS_LABEL[v] ?? v}
              interval={0}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fill: t.tick, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: t.grid, opacity: 0.3 }} {...tooltipStyle(t)} />
            <Legend wrapperStyle={{ paddingTop: 12, fontSize: 13, fontWeight: 600 }} />
            <Bar
              dataKey={a.name}
              fill={a.color}
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
              isAnimationActive
              animationBegin={120}
              animationDuration={1100}
              animationEasing="ease-out"
              activeBar={{ stroke: a.color, strokeWidth: 2, fillOpacity: 0.85 }}
            >
              <LabelList dataKey={a.name} position="top" fontSize={11} fontWeight={700} fill={t.axis} />
            </Bar>
            <Bar
              dataKey={b.name}
              fill={b.color}
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
              isAnimationActive
              animationBegin={320}
              animationDuration={1100}
              animationEasing="ease-out"
              activeBar={{ stroke: b.color, strokeWidth: 2, fillOpacity: 0.85 }}
            >
              <LabelList dataKey={b.name} position="top" fontSize={11} fontWeight={700} fill={t.axis} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Starting-price comparison bar chart                                 */
/* ------------------------------------------------------------------ */

interface PriceSide {
  name: string;
  color: string;
  /** null = custom / contact-sales (excluded from the bars). */
  price: number | null;
  currency: string;
  period: string;
}

export function PriceBarChart({ a, b }: { a: PriceSide; b: PriceSide }) {
  const t = useChartTheme();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const priced = [a, b].filter((s): s is PriceSide & { price: number } => s.price !== null);

  if (priced.length === 0) {
    return (
      <p className="flex h-[140px] items-center justify-center text-sm text-muted-foreground">
        Both products use custom pricing — contact the vendors for a quote.
      </p>
    );
  }

  const currencies = new Set(priced.map((s) => s.currency));
  const sameCurrency = currencies.size === 1;

  // Comparing bar lengths across currencies is meaningless, so only draw bars
  // when every priced side shares one currency. Otherwise show a fair, labelled
  // side-by-side with each vendor's own currency.
  if (!sameCurrency) {
    return (
      <div>
        <div className="grid gap-4 sm:grid-cols-2">
          {priced.map((s) => (
            <div key={s.name} className="rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/30 p-5">
              <p className="text-sm font-bold">{s.name}</p>
              <p className="mt-1 text-3xl font-extrabold font-heading tracking-tight" style={{ color: s.color }}>
                {formatPrice(s.price, s.currency)}
                <span className="ml-1 text-sm font-medium text-muted-foreground">/{s.period}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Prices are shown in each vendor&apos;s billing currency and aren&apos;t directly comparable —
          check the live exchange rate before deciding.
        </p>
      </div>
    );
  }

  const currency = priced[0].currency;
  const data = priced.map((s) => ({ name: s.name, price: s.price, color: s.color }));
  const ready = t.mounted && inView;

  return (
    <div
      ref={ref}
      className="h-[200px] w-full"
      role="img"
      aria-label={`Bar chart comparing starting price for ${priced.map((s) => s.name).join(" and ")}`}
    >
      {ready && (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 72, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid} horizontal={false} />
          <XAxis type="number" tick={{ fill: t.tick, fontSize: 11 }} tickLine={false} axisLine={{ stroke: t.grid }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: t.axis, fontSize: 13, fontWeight: 700 }}
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <Tooltip
            cursor={{ fill: t.grid, opacity: 0.3 }}
            formatter={(value: number) => [formatPrice(value, currency), "Starting price"]}
            {...tooltipStyle(t)}
          />
          <Bar dataKey="price" radius={[0, 8, 8, 0]} maxBarSize={48} isAnimationActive animationDuration={1000} animationEasing="ease-out">
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
            <LabelList
              dataKey="price"
              position="right"
              formatter={(v: number) => formatPrice(v, currency)}
              fontSize={12}
              fontWeight={700}
              fill={t.axis}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Category gauges (replaces the radar)                                */
/* ------------------------------------------------------------------ */

interface GaugeSide {
  name: string;
  color: string;
  ratings: { easeOfUse: number; valueForMoney: number; customerService: number; functionality: number };
}

/**
 * Dumbbell (connected-dot) comparison. Each rating dimension is a shared 0–5
 * track with a dot for each product joined by a segment — a clean, analyst-style
 * visual that reads the head-to-head at a glance. No chart library needed.
 */
export function CategoryGauges({ a, b }: { a: GaugeSide; b: GaugeSide }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const dims = DIMENSIONS.map(([label, key]) => ({ label, av: a.ratings[key], bv: b.ratings[key] }));

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Comparison of ${a.name} and ${b.name} across four rating dimensions on a 0 to 5 scale`}
    >
      {/* legend */}
      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold">
        {[a, b].map((s) => (
          <span key={s.name} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-zinc-600 dark:text-zinc-300">{s.name}</span>
          </span>
        ))}
      </div>

      <div className="space-y-[26px]">
        {dims.map((d, i) => {
          const aPct = (d.av / 5) * 100;
          const bPct = (d.bv / 5) * 100;
          const lo = Math.min(aPct, bPct);
          const hi = Math.max(aPct, bPct);
          return (
            <div key={d.label}>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">{d.label}</span>
                <span className="flex items-center gap-2 text-[12.5px] font-semibold tabular-nums">
                  <span style={{ color: a.color }}>{d.av.toFixed(1)}</span>
                  <span className="text-zinc-300 dark:text-zinc-700">/</span>
                  <span style={{ color: b.color }}>{d.bv.toFixed(1)}</span>
                </span>
              </div>
              <div className="relative h-4">
                {/* baseline track */}
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                {/* connecting segment */}
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-zinc-300 transition-all duration-700 ease-out dark:bg-zinc-600"
                  style={{ left: `${inView ? lo : 50}%`, width: `${inView ? hi - lo : 0}%` }}
                />
                {/* dot A */}
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-all duration-700 ease-out dark:border-zinc-950"
                  style={{ left: `${inView ? aPct : 50}%`, backgroundColor: a.color, transitionDelay: `${i * 70}ms` }}
                />
                {/* dot B */}
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-all duration-700 ease-out dark:border-zinc-950"
                  style={{ left: `${inView ? bPct : 50}%`, backgroundColor: b.color, transitionDelay: `${i * 70}ms` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* scale */}
      <div className="mt-5 flex justify-between border-t border-zinc-100 pt-2 text-[10px] font-medium tabular-nums text-zinc-300 dark:border-zinc-900 dark:text-zinc-600">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sentiment waffle (100% dot grid — a fresh take on the donut)        */
/* ------------------------------------------------------------------ */

const WAFFLE_CELLS = 50; // 5 rows × 10 cols, each cell = 2%

export function SentimentWaffle({
  distribution,
  total,
}: {
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  total: number;
}) {
  const t = useChartTheme();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const reduce = usePrefersReducedMotion();

  if (total === 0) {
    return <p className="flex h-[150px] items-center justify-center text-sm text-muted-foreground">No reviews yet.</p>;
  }

  const positive = Math.round(((distribution[4] + distribution[5]) / total) * 100);
  const negative = Math.round(((distribution[1] + distribution[2]) / total) * 100);
  const neutral = 100 - positive - negative;

  const POS = "#22c55e";
  const NEG = "#ef4444";
  const NEU = t.grid;

  // Build the cell sequence: positive first, then neutral, then negative.
  const posCells = Math.round((positive / 100) * WAFFLE_CELLS);
  const negCells = Math.round((negative / 100) * WAFFLE_CELLS);
  const neuCells = WAFFLE_CELLS - posCells - negCells;
  const cells = [
    ...Array(posCells).fill(POS),
    ...Array(Math.max(0, neuCells)).fill(NEU),
    ...Array(negCells).fill(NEG),
  ];

  const animate = inView || reduce;

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-extrabold font-heading tabular-nums text-emerald-500">
            {animate ? <CountUp value={positive} suffix="%" /> : `${positive}%`}
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Positive sentiment
          </p>
        </div>
        <ul className="flex flex-col gap-1 text-xs font-medium">
          {([
            ["Positive", positive, POS],
            ["Neutral", neutral, NEU],
            ["Negative", negative, NEG],
          ] as const).map(([label, value, color]) => (
            <li key={label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: color }} />
              <span className="text-muted-foreground">{label}</span>
              <span className="ml-1 font-bold tabular-nums">{value}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-1.5">
        {cells.map((color, i) => (
          <span
            key={i}
            className="aspect-square rounded-[4px]"
            style={{
              backgroundColor: color,
              opacity: animate ? 1 : 0,
              transform: animate ? "scale(1)" : "scale(0.4)",
              transition: reduce ? "none" : `opacity 0.4s ease ${i * 11}ms, transform 0.45s ${EASE} ${i * 11}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Score meter (single 0–5 score — a gradient bar, not a donut)        */
/* ------------------------------------------------------------------ */

export function ScoreMeter({ value, color, size }: { value: number; color: string; size?: number }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div ref={ref} className="w-full max-w-[150px]" style={size ? { maxWidth: size } : undefined}>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-2xl font-extrabold font-heading tabular-nums" style={{ color }}>
          {inView ? <CountUp value={value} decimals={1} /> : value.toFixed(1)}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">/5</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        {inView && (
          <div
            className="h-full rounded-full animate-fill-bar"
            style={{
              width: `${pct}%`,
              backgroundImage: `linear-gradient(90deg, color-mix(in srgb, ${color}, white 28%), ${color})`,
            }}
          />
        )}
      </div>
    </div>
  );
}
