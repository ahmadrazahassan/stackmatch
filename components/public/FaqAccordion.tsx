"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
  tag?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  brandColor: string;
}

export function FaqAccordion({ items, brandColor }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default to match screenshot

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              "rounded-[16px] bg-zinc-50 dark:bg-zinc-900/40 p-6 sm:p-7 transition-all duration-300",
              isOpen ? "bg-zinc-50 dark:bg-zinc-900/60" : "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
            )}
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-start justify-between text-left focus:outline-none group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-lg sm:text-[20px] font-bold text-zinc-900 dark:text-zinc-50 leading-snug pr-4 font-heading tracking-tight">
                {item.q}
              </span>
              <div className="mt-1 shrink-0 text-zinc-950 dark:text-zinc-50 transition-colors duration-200 group-hover:opacity-80">
                {isOpen ? (
                  <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
                ) : (
                  <Plus className="h-5 w-5 transition-transform duration-300" />
                )}
              </div>
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-sans">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


