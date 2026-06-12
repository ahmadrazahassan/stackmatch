
import { AdminHeader } from "@/components/admin/AdminHeader";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function getCounts() {
  try {
    const supabase = await createClient();
    const [s, r, a] = await Promise.all([
      supabase.from("software").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("articles").select("id", { count: "exact", head: true }),
    ]);
    return { software: s.count ?? 0, reviews: r.count ?? 0, articles: a.count ?? 0 };
  } catch {
    return { software: 0, reviews: 0, articles: 0 };
  }
}

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const counts = await getCounts();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex w-full flex-col">
        <AdminHeader counts={counts} />
        <main className="w-full p-4 pt-28 sm:p-8 sm:pt-32">
          {children}
        </main>
      </div>
    </div>
  );
}
