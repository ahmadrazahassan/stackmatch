"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ProfileNavItem {
  label: string;
  /** in-page anchor like "#pricing" (scroll-spied) */
  anchor?: string;
  /** route link, used when anchor is absent */
  href?: string;
  active?: boolean;
}

interface ProfileNavProps {
  items: ProfileNavItem[];
  brandColor: string;
}

/** Sticky liquid iOS glassmorphic navbar with scroll-spy for in-page anchors. */
export function ProfileNav({ items, brandColor }: ProfileNavProps) {
  const anchors = items.filter((i) => i.anchor).map((i) => i.anchor!.slice(1));
  const [activeId, setActiveId] = useState<string | null>(anchors[0] ?? null);

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
          const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setActiveId(top);
        }
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 }
    );
    for (const id of anchors) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.anchor).join(",")]);

  return (
    <div className="sticky top-[76px] z-30 my-6 flex justify-center -mx-4 px-4 sm:mx-0">
      <div className="inline-flex max-w-full items-center rounded-full border border-zinc-800 bg-zinc-950/85 p-1.5 shadow-xl shadow-black/30 backdrop-blur-md ring-1 ring-white/10">
        <nav
          className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1.5 py-0.5"
          aria-label="Profile sections"
        >
          {items.map((item) => {
            const isActive = item.anchor ? activeId === item.anchor.slice(1) : Boolean(item.active);
            const pill = (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-4.5 py-2 text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
                style={
                  isActive
                    ? {
                        color: brandColor,
                        backgroundColor: `${brandColor}20`,
                        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px -1px ${brandColor}30`,
                      }
                    : undefined
                }
              >
                {item.label}
              </span>
            );
            return item.anchor ? (
              <a key={item.label} href={item.anchor} className="shrink-0">
                {pill}
              </a>
            ) : (
              <Link key={item.label} href={item.href!} className="shrink-0">
                {pill}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

