"use client";

import { useEffect, useRef, useState } from "react";

interface CompanySizeChartProps {
  data: { label: string; count: number; pct: number }[];
  brandColor: string;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

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
 * Vertical bar chart for the "Company size" card. Bars grow up with a
 * stagger when scrolled into view; percentages count up alongside.
 */
export function CompanySizeChart({ data, brandColor }: CompanySizeChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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

  const animate = inView || reduceMotion;
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div ref={rootRef} className="mt-8 flex h-44 items-end justify-around gap-4">
      {data.map((d, i) => {
        const isMax = d.count === maxCount;
        const isHovered = hovered === i;
        return (
          <div
            key={d.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex h-full w-16 flex-col items-center justify-end gap-2"
          >
            <span
              className="text-sm font-bold text-zinc-850 dark:text-zinc-150 tabular-nums"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "none" : "translateY(6px)",
                transition: reduceMotion
                  ? "none"
                  : `opacity 0.5s ease ${i * 130 + 250}ms, transform 0.5s ${EASE} ${i * 130 + 250}ms`,
              }}
            >
              {reduceMotion ? <>{d.pct}%</> : <CountUpPct target={d.pct} run={animate} delay={i * 130 + 250} />}
            </span>
            <div
              className="w-7 rounded-t-full"
              style={{
                height: animate ? `${Math.max(4, d.pct)}%` : "4%",
                backgroundColor: isMax ? brandColor : "var(--border)",
                boxShadow: isMax && isHovered ? `0 6px 18px -6px ${brandColor}80` : "none",
                transform: isHovered ? "scaleX(1.18)" : "none",
                transformOrigin: "bottom",
                transition: reduceMotion
                  ? "transform 0.2s ease, box-shadow 0.2s ease"
                  : `height 0.9s ${EASE} ${i * 130}ms, transform 0.25s ${EASE}, box-shadow 0.25s ease`,
              }}
            />
            <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 leading-4">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
