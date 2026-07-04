import type { Metadata } from "next";
import { AffiliateDisclosureNote } from "@/components/public/AffiliateDisclosureNote";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { FilterSidebar } from "@/components/public/FilterSidebar";
import { SoftwareListRow } from "@/components/public/SoftwareListRow";
import { Pagination } from "@/components/public/Pagination";
import { getSoftwareList } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Business Software Reviews",
  description:
    "Browse every business software product reviewed on Stack Match. Verified ratings, GBP pricing and side-by-side comparisons for UK businesses.",
  alternates: { canonical: "/software" },
};

export default async function SoftwareListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; rating?: string; pricing?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const { items, total } = await getSoftwareList({
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
      <Breadcrumb items={[{ label: "Software Reviews" }]} />
      <h1 className="py-4 text-2xl font-bold text-foreground sm:text-3xl">
        All Business Software
      </h1>
      <AffiliateDisclosureNote className="-mt-1" />

      <div className="mt-2 grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <FilterSidebar basePath="/software" />
        </div>
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {items.length} of {total} software
          </p>
          {items.length === 0 ? (
            <div className="rounded-lg border bg-white p-12 text-center text-muted-foreground card-shadow">
              Software listings will appear here once published from the admin panel.
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
              return `/software${qs ? `?${qs}` : ""}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}
