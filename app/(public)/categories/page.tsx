import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { CategoryCard } from "@/components/public/CategoryCard";
import { getCategories } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Software Categories",
  description:
    "Browse every business software category on CloudPayZA — accounting, payroll, HR, CRM, ERP and more, reviewed for South African businesses.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container-site py-12">
      {/* Header card container with dashed border and soft light blue gradient */}
      <div className="mb-12 rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
        {/* Soft background glow circles for high-end feel */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 z-0" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 z-0" />

        {/* Background 3D Shape Cover */}
        <Image
          src="/pages/categories.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-90 pointer-events-none z-0"
        />

        {/* Translucent glass backdrop overlay for high text readability */}
        <div className="absolute inset-0 bg-white/75 dark:bg-zinc-950/80 backdrop-blur-[2px] z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <Breadcrumb items={[{ label: "Categories" }]} />
          <span className="mt-6 inline-flex items-center rounded-full bg-brand/10 dark:bg-brand/20 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider">
            Explore Categories
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl font-heading leading-tight animate-fade-in">
            All Software Categories
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base font-sans leading-relaxed">
            Browse through all business software categories on CloudPayZA. Find verified software solutions analyzed for South African SMBs.
          </p>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center text-zinc-500 dark:text-zinc-400 shadow-sm font-sans">
          Categories will appear here once created in the admin panel.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
