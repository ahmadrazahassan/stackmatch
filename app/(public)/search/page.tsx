import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/public/SearchBar";
import { SoftwareCard } from "@/components/public/SoftwareCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchContent } from "@/lib/supabase/queries";
import { formatDateShort } from "@/lib/utils/formatDate";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const { software, articles } = await searchContent(q);
  const total = software.length + articles.length;

  return (
    <div className="container-site pb-12">
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="text-center text-2xl font-bold text-foreground">Search Stack Match</h1>
        <div className="mt-5">
          <SearchBar initialQuery={q} size="lg" />
        </div>
      </div>

      {q && (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            {total} result{total === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-foreground">&ldquo;{q}&rdquo;</span>
          </p>

          {total === 0 ? (
            <div className="rounded-lg border bg-white p-12 text-center card-shadow">
              <p className="text-lg font-semibold text-foreground">No results found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different keyword, or browse by category:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["accounting-software", "payroll-software", "hr-software", "crm-software"].map(
                  (slug) => (
                    <Link
                      key={slug}
                      href={`/category/${slug}`}
                      className="rounded-full border px-3 py-1 text-sm font-medium hover:border-brand hover:text-brand"
                    >
                      {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  )
                )}
              </div>
            </div>
          ) : (
            <Tabs defaultValue={software.length > 0 ? "software" : "articles"}>
              <TabsList>
                <TabsTrigger value="software">Software ({software.length})</TabsTrigger>
                <TabsTrigger value="articles">Articles ({articles.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="software" className="mt-6">
                {software.length === 0 ? (
                  <p className="text-muted-foreground">No software matched this search.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {software.map((s) => (
                      <SoftwareCard key={s.id} software={s} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="articles" className="mt-6">
                {articles.length === 0 ? (
                  <p className="text-muted-foreground">No articles matched this search.</p>
                ) : (
                  <ul className="space-y-4">
                    {articles.map((a) => (
                      <li key={a.id} className="rounded-lg border bg-white p-5 card-shadow">
                        <Link href={`/blog/${a.slug}`} className="group block">
                          {a.category_tag && (
                            <span className="text-xs font-semibold tracking-wide text-brand uppercase">
                              {a.category_tag}
                            </span>
                          )}
                          <h2 className="mt-0.5 font-semibold text-foreground group-hover:text-brand">
                            {a.title}
                          </h2>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {a.excerpt}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {a.author_name} · {formatDateShort(a.published_date)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
            </Tabs>
          )}
        </>
      )}
    </div>
  );
}
