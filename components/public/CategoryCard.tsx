import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col justify-between rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md h-full font-sans"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-brand transition-colors text-base truncate pr-4">
          {category.name}
        </h3>
        <span className="text-zinc-400 group-hover:translate-x-1 transition-all duration-200 shrink-0">
          &rarr;
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-250/20 dark:border-zinc-800 px-3 py-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          {category.software_count} {category.software_count === 1 ? "software" : "software items"}
        </span>
      </div>
    </Link>
  );
}
