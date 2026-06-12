import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="truncate font-semibold tracking-tight text-foreground group-hover:text-foreground">
          {category.name}
        </h3>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {category.software_count} software
      </p>
    </Link>
  );
}
