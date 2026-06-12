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

/** Sticky glass pill nav with scroll-spy for in-page anchors. */
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
    <div className="sticky top-16 z-30 -mx-4 border-b border-border/60 bg-white/75 px-4 backdrop-blur-xl">
      <nav
        className="flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Profile sections"
      >
        {items.map((item) => {
          const isActive = item.anchor ? activeId === item.anchor.slice(1) : Boolean(item.active);
          const pill = (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-300",
                isActive
                  ? "shadow-sm"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              style={
                isActive
                  ? {
                      color: brandColor,
                      backgroundColor: `${brandColor}12`,
                      borderColor: `${brandColor}35`,
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
  );
}
