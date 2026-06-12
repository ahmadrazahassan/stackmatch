"use client";

import { useEffect, useRef, useState } from "react";

interface DonutChartProps {
  data: { label: string; value: number }[];
  /** Base hex color — segments are rendered in descending shades of it. */
  color: string;
  size?: number;
}

const SHADE_OPACITY = [1, 0.75, 0.55, 0.4, 0.28, 0.18];
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

/** Counts from 0 to `target` once `run` flips true. */
function CountUpPct({ target, run, delay }: { target: number; run: boolean; delay: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const duration = 800;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, target, delay]);
  return <>{run ? value : 0}%</>;
}

/**
 * Capterra-style donut chart with legend. Animates into view on scroll:
 * segments sweep in sequentially, legend percentages count up, and
 * hovering a legend row highlights its segment (and vice versa).
 */
export function DonutChart({ data, color, size = 150 }: DonutChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const animate = inView || reduceMotion;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = data.reduce((a, d) => a + d.value, 0);
  if (total === 0) return null;

  const stroke = size * 0.16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;
  const segments = data.slice(0, 6).map((d, i) => {
    const frac = d.value / total;
    const seg = {
      ...d,
      pct: Math.round(frac * 100),
      dash: `${frac * c} ${c}`,
      offset: -offset,
      opacity: SHADE_OPACITY[i] ?? 0.15,
    };
    offset += frac * c;
    return seg;
  });

  return (
    <div ref={rootRef} className="flex items-center gap-5 min-w-0 w-full">
      <svg width={size} height={size} className="-rotate-90 shrink-0 overflow-visible">
        {segments.map((s, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;
          return (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={color}
              strokeOpacity={isDimmed ? s.opacity * 0.35 : s.opacity}
              strokeWidth={isHovered ? stroke * 1.18 : stroke}
              strokeDasharray={animate ? s.dash : `0 ${c}`}
              strokeDashoffset={s.offset}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "default",
                transition: reduceMotion
                  ? "stroke-opacity 0.2s ease, stroke-width 0.2s ease"
                  : `stroke-dasharray 0.9s ${EASE} ${i * 110}ms, stroke-opacity 0.25s ease, stroke-width 0.25s ${EASE}`,
              }}
            />
          );
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((s, i) => {
          const isDimmed = hovered !== null && hovered !== i;
          return (
            <li
              key={s.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-start gap-2 text-xs font-semibold"
              style={{
                opacity: animate ? (isDimmed ? 0.45 : 1) : 0,
                transform: animate
                  ? hovered === i
                    ? "translateX(3px)"
                    : "none"
                  : "translateX(8px)",
                transition: reduceMotion
                  ? "opacity 0.2s ease, transform 0.2s ease"
                  : `opacity 0.5s ease ${i * 110 + 200}ms, transform 0.5s ${EASE} ${hovered !== null ? "0ms" : `${i * 110 + 200}ms`}`,
              }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full mt-1.5"
                style={{ backgroundColor: color, opacity: s.opacity }}
              />
              <span className="min-w-0 flex-1 text-zinc-600 dark:text-zinc-300 leading-snug">{s.label}</span>
              <span className="font-bold text-zinc-950 dark:text-zinc-50 shrink-0 ml-1 tabular-nums">
                {reduceMotion ? (
                  <>{s.pct}%</>
                ) : (
                  <CountUpPct target={s.pct} run={animate} delay={i * 110 + 200} />
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
