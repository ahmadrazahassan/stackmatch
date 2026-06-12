"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

function useFilterNav(basePath: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return {
    searchParams,
    toggle(param: string, value: string) {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(param) === value) params.delete(param);
      else params.set(param, value);
      params.delete("page");
      const qs = params.toString();
      router.push(`${basePath}${qs ? `?${qs}` : ""}`);
    },
    set(param: string, value: string) {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(param, value);
      else params.delete(param);
      params.delete("page");
      const qs = params.toString();
      router.push(`${basePath}${qs ? `?${qs}` : ""}`);
    },
  };
}

export function FilterSidebar({ basePath }: { basePath: string }) {
  const { searchParams, toggle, set } = useFilterNav(basePath);

  return (
    <div className="space-y-6 rounded-lg border bg-white p-5 card-shadow">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Filter by Rating</h3>
        <ul className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const active = searchParams.get("rating") === String(stars);
            return (
              <li key={stars}>
                <button
                  type="button"
                  onClick={() => toggle("rating", String(stars))}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    active ? "bg-brand-light font-semibold text-brand-dark" : "hover:bg-muted"
                  )}
                >
                  <span className="flex">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-star text-star" />
                    ))}
                  </span>
                  <span className="text-muted-foreground">&amp; up</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Pricing</h3>
        <ul className="space-y-1.5">
          {[
            { key: "trial", label: "Free Trial" },
            { key: "free", label: "Free Version" },
            { key: "paid", label: "Paid Only" },
          ].map((opt) => {
            const active = searchParams.get("pricing") === opt.key;
            return (
              <li key={opt.key}>
                <label className="flex cursor-pointer items-center gap-2 px-2 py-1 text-sm">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggle("pricing", opt.key)}
                    className="h-4 w-4 rounded border-border accent-[#00A86B]"
                  />
                  {opt.label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Sort by</h3>
        <select
          aria-label="Sort by"
          value={searchParams.get("sort") ?? "reviews"}
          onChange={(e) => set("sort", e.target.value === "reviews" ? "" : e.target.value)}
          className="w-full rounded-md border bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
        >
          <option value="reviews">Most Reviews</option>
          <option value="rating">Highest Rated</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>
    </div>
  );
}
