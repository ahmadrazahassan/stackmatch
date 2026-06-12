import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { FilterSidebar } from "@/components/public/FilterSidebar";
import { SoftwareListRow } from "@/components/public/SoftwareListRow";
import { Pagination } from "@/components/public/Pagination";
import {
  getCategories,
  getCategoryBySlug,
  getSoftwareList,
} from "@/lib/supabase/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `Best ${category.name} in South Africa ${new Date().getFullYear()}`,
    description:
      category.description ??
      `Compare the best ${category.name.toLowerCase()} for South African businesses. Verified reviews, ZAR pricing and expert ratings.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; rating?: string; pricing?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Math.max(1, Number(sp.page) || 1);
  const { items, total } = await getSoftwareList({
    categoryId: category.id,
    minRating: sp.rating ? Number(sp.rating) : undefined,
    freeTrial: sp.pricing === "trial",
    freeVersion: sp.pricing === "free",
    paidOnly: sp.pricing === "paid",
    sort: sp.sort === "rating" ? "rating" : sp.sort === "recent" ? "recent" : "reviews",
    page,
    perPage: 10,
  });

  return (
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />

      <header className="py-4">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {category.icon} {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 max-w-3xl text-muted-foreground">{category.description}</p>
        )}
      </header>

      <div className="mt-4 grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <FilterSidebar basePath={`/category/${category.slug}`} />
        </div>

        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {items.length} of {total} software in {category.name}
          </p>
          {items.length === 0 ? (
            <div className="rounded-lg border bg-white p-12 text-center text-muted-foreground card-shadow">
              No software matches these filters yet.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((s) => (
                <SoftwareListRow key={s.id} software={s} />
              ))}
            </div>
          )}
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / 10)}
            buildHref={(p) => {
              const q = new URLSearchParams();
              if (sp.rating) q.set("rating", sp.rating);
              if (sp.pricing) q.set("pricing", sp.pricing);
              if (sp.sort) q.set("sort", sp.sort);
              if (p > 1) q.set("page", String(p));
              const qs = q.toString();
              return `/category/${category.slug}${qs ? `?${qs}` : ""}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}
