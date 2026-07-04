import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { getCategories } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Software Categories",
  description:
    "Browse every business software category on Stack Match — accounting, payroll, HR, CRM, ERP and more, reviewed for UK businesses.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const totalSoftware = categories.reduce((sum, c) => sum + (c.software_count ?? 0), 0);

  return (
    <div className="pb-28">
      {/* ---------- Header ---------- */}
      <div className="container-site">
        <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
          <Breadcrumb items={[{ label: "Categories" }]} />
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            Browse
          </p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
            Software categories
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            Every category we cover, from accounting and payroll to HR and CRM. Each one is reviewed
            and rated for UK businesses, with verified user feedback and side-by-side comparisons.
          </p>
          {categories.length > 0 && (
            <p className="mt-7 text-[13px] font-medium text-zinc-400 dark:text-zinc-500">
              {categories.length} categories · {totalSoftware} products reviewed
            </p>
          )}
        </div>
      </div>

      {/* ---------- Grid ---------- */}
      <div className="container-site mt-14">
        {categories.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-12 text-center text-[15px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Categories will appear here once created in the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="group relative flex flex-col bg-white p-8 transition-colors hover:bg-zinc-50/80 dark:bg-zinc-950 dark:hover:bg-zinc-900/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[13px] font-semibold tabular-nums text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand dark:text-zinc-600" />
                </div>
                <h2 className="mt-5 text-[1.15rem] font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-brand dark:text-zinc-50 font-heading">
                  {c.name}
                </h2>
                {c.description && (
                  <p className="mt-2.5 line-clamp-2 text-[14px] leading-7 text-zinc-500 dark:text-zinc-400">
                    {c.description}
                  </p>
                )}
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
                  {c.software_count} {c.software_count === 1 ? "product" : "products"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
