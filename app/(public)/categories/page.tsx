import type { Metadata } from "next";
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
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "Categories" }]} />
      <h1 className="py-4 text-2xl font-bold text-foreground sm:text-3xl">
        All Software Categories
      </h1>
      {categories.length === 0 ? (
        <p className="rounded-lg border bg-white p-12 text-center text-muted-foreground card-shadow">
          Categories will appear here once created in the admin panel.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
