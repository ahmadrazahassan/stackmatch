"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatRating } from "@/lib/utils/formatRating";

interface SideMini {
  name: string;
  slug: string;
  logo_url: string | null;
  overall_rating: number;
}

interface NavItem {
  label: string;
  anchor: string;
}

/**
 * Floating, centred dark-glass comparison bar that fades in once the versus
 * hero scrolls out of view. Matches the software profile nav: a rounded pill
 * with a blurred dark background, showing both products either side of a "vs"
 * and scroll-spied section anchors.
 */
export function CompareStickyBar({
  a,
  b,
  navItems,
}: {
  a: SideMini;
  b: SideMini;
  navItems: NavItem[];
}) {
  const [shown, setShown] = useState(false);
  const anchors = navItems.map((i) => i.anchor.slice(1));
  const [activeId, setActiveId] = useState<string | null>(anchors[0] ?? null);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 460);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (anchors.length === 0) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        if (visible.size > 0) {
          const top = [...visible.entries()].sort((x, y) => x[1] - y[1])[0][0];
          setActiveId(top);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    );
    for (const id of anchors) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems.map((i) => i.anchor).join(",")]);

  function ProductMini({ side }: { side: SideMini }) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/95 p-0.5">
          <SoftwareLogo src={side.logo_url} name={side.name} size={22} />
        </span>
        <div className="hidden leading-none sm:block">
          <p className="text-[12.5px] font-semibold text-zinc-100">{side.name}</p>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-medium text-zinc-400">
              {formatRating(Number(side.overall_rating))}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-[72px] z-30 flex justify-center px-3 transition-all duration-300 ${
        shown ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-2 rounded-[18px] border border-zinc-800 bg-zinc-950/85 p-2 pl-3 shadow-xl shadow-black/30 ring-1 ring-white/10 backdrop-blur-md">
        {/* Products */}
        <div className="flex shrink-0 items-center gap-3">
          <ProductMini side={a} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">vs</span>
          <ProductMini side={b} />
        </div>

        {/* Divider */}
        <span aria-hidden className="mx-0.5 hidden h-8 w-px bg-zinc-800 lg:block" />

        {/* Anchor nav */}
        <nav
          aria-label="Comparison sections"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {navItems.map((item) => {
            const active = activeId === item.anchor.slice(1);
            return (
              <a
                key={item.anchor}
                href={item.anchor}
                className={`rounded-[10px] px-3 py-2 text-[12.5px] font-semibold whitespace-nowrap transition-colors ${
                  active ? "bg-brand/15 text-brand" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
