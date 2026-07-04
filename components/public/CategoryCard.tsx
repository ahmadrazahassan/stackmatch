import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 font-sans shadow-[0_10px_30px_-18px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(0,0,0,0.28)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-brand transition-colors text-base truncate pr-4">
          {category.name}
        </h3>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
          <ArrowRight className="h-4 w-4" />
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
