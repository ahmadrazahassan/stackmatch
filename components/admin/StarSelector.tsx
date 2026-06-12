"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarSelectorProps {
  value: number | null;
  onChange: (value: number | null) => void;
  required?: boolean;
}

export function StarSelector({ value, onChange, required }: StarSelectorProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(value === n && !required ? null : n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className="p-0.5"
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              n <= display ? "fill-star text-star" : "text-border"
            )}
          />
        </button>
      ))}
      {value ? (
        <span className="ml-2 text-sm text-muted-foreground">{value}/5</span>
      ) : (
        <span className="ml-2 text-sm text-muted-foreground">Not rated</span>
      )}
    </div>
  );
}
