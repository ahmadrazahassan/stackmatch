"use client";

import { useRouter, useSearchParams } from "next/navigation";

const COUNTRIES = ["South Africa", "Kenya", "Nigeria", "Ghana", "Egypt", "Other Africa", "United Kingdom", "United States"];
const INDUSTRIES = ["Accounting", "Finance", "Healthcare", "Construction", "Retail", "Manufacturing", "IT", "Education", "Legal", "Real Estate", "Mining", "NGO", "Other"];
const SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const DURATIONS = ["less than 6 months", "6-12 months", "1-2 years", "2+ years", "5+ years"];

function FilterSelect({
  label,
  param,
  options,
  basePath,
}: {
  label: string;
  param: string;
  options: string[];
  basePath: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get(param) ?? "";

  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) params.set(param, e.target.value);
        else params.delete(param);
        params.delete("page");
        router.push(`${basePath}?${params.toString()}`);
      }}
      className="rounded-md border bg-white px-3 py-1.5 text-sm text-foreground focus:border-brand focus:outline-none"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SortSelect({ basePath }: { basePath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get("sort") ?? "recent";

  return (
    <select
      aria-label="Sort reviews"
      value={value}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value === "helpful") params.set("sort", "helpful");
        else params.delete("sort");
        params.delete("page");
        router.push(`${basePath}?${params.toString()}`);
      }}
      className="ml-auto rounded-md border bg-white px-3 py-1.5 text-sm text-foreground focus:border-brand focus:outline-none"
    >
      <option value="recent">Sort: Most Recent</option>
      <option value="helpful">Sort: Most Helpful</option>
    </select>
  );
}

export function ReviewFilters({ basePath }: { basePath: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <FilterSelect label="Country" param="country" options={COUNTRIES} basePath={basePath} />
      <FilterSelect label="Industry" param="industry" options={INDUSTRIES} basePath={basePath} />
      <FilterSelect label="Company Size" param="size" options={SIZES} basePath={basePath} />
      <FilterSelect label="Length of Use" param="duration" options={DURATIONS} basePath={basePath} />
      <SortSelect basePath={basePath} />
    </div>
  );
}
