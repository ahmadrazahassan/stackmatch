"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  initialQuery?: string;
  size?: "default" | "lg";
  className?: string;
}

export function SearchBar({ initialQuery = "", size = "default", className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
          size === "lg" ? "left-4 h-5 w-5" : "left-3 h-4 w-4"
        )}
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search software, category, or keyword..."
        suppressHydrationWarning
        className={cn(
          "w-full rounded-md border bg-white text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none",
          size === "lg" ? "py-3.5 pr-32 pl-12 text-base" : "py-2 pr-4 pl-9 text-sm"
        )}
      />
      {size === "lg" && (
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Search
        </button>
      )}
    </form>
  );
}
