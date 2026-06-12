import Link from "next/link";
import { Monitor, Star, FileText, MousePointerClick, Plus } from "lucide-react";
import { format, startOfMonth, subMonths } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateShort } from "@/lib/utils/formatDate";
import { DashboardCharts } from "./DashboardCharts";
import type { Article, Review } from "@/lib/types";

async function getDashboardData() {
  const empty = {
    stats: { software: 0, reviews: 0, articles: 0, clicksThisMonth: 0 },
    monthlyClicks: [] as { month: string; clicks: number }[],
    topSoftware: [] as { name: string; clicks: number }[],
    recentReviews: [] as Review[],
    recentArticles: [] as Article[],
  };
  try {
    const supabase = await createClient();
    const sixMonthsAgo = startOfMonth(subMonths(new Date(), 5)).toISOString();
    const monthStart = startOfMonth(new Date()).toISOString();

    const [s, r, a, clicksMonth, clickRows, recentReviews, recentArticles] = await Promise.all([
      supabase.from("software").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("articles").select("id", { count: "exact", head: true }),
      supabase
        .from("affiliate_clicks")
        .select("id", { count: "exact", head: true })
        .gte("clicked_at", monthStart),
      supabase
        .from("affiliate_clicks")
        .select("software_name, clicked_at")
        .gte("clicked_at", sixMonthsAgo)
        .limit(10000),
      supabase
        .from("reviews")
        .select("*, software(id, name, slug, logo_url)")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("articles")
        .select("id, title, slug, author_name, published_date, status, content, created_at, read_time_minutes, featured, updated_at, excerpt")
        .eq("status", "published")
        .order("published_date", { ascending: false })
        .limit(5),
    ]);

    // Aggregate clicks per month (last 6 months, zero-filled)
    const buckets = new Map<string, number>();
    for (let i = 5; i >= 0; i--) {
      buckets.set(format(subMonths(new Date(), i), "MMM"), 0);
    }
    const perSoftware = new Map<string, number>();
    for (const row of clickRows.data ?? []) {
      const key = format(new Date(row.clicked_at), "MMM");
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
      if (row.software_name) {
        perSoftware.set(row.software_name, (perSoftware.get(row.software_name) ?? 0) + 1);
      }
    }

    return {
      stats: {
        software: s.count ?? 0,
        reviews: r.count ?? 0,
        articles: a.count ?? 0,
        clicksThisMonth: clicksMonth.count ?? 0,
      },
      monthlyClicks: [...buckets.entries()].map(([month, clicks]) => ({ month, clicks })),
      topSoftware: [...perSoftware.entries()]
        .sort((x, y) => y[1] - x[1])
        .slice(0, 5)
        .map(([name, clicks]) => ({ name, clicks })),
      recentReviews: (recentReviews.data as unknown as Review[]) ?? [],
      recentArticles: (recentArticles.data as unknown as Article[]) ?? [],
    };
  } catch {
    return empty;
  }
}

const statCards = [
  { key: "software" as const, label: "Total Software", icon: Monitor },
  { key: "reviews" as const, label: "Total Reviews", icon: Star },
  { key: "articles" as const, label: "Total Articles", icon: FileText },
  { key: "clicksThisMonth" as const, label: "Clicks This Month", icon: MousePointerClick },
];

export default async function AdminDashboardPage() {
  const { stats, monthlyClicks, topSoftware, recentReviews, recentArticles } =
    await getDashboardData();

  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/admin/software/new">
            <Plus className="h-4 w-4" /> Add Software
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/reviews/new">
            <Plus className="h-4 w-4" /> Add Review
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/articles/new">
            <Plus className="h-4 w-4" /> Add Article
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.key} className="card-shadow">
            <CardContent className="flex items-center gap-4 pt-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light">
                <card.icon className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats[card.key].toLocaleString("en-ZA")}</p>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts monthlyClicks={monthlyClicks} topSoftware={topSoftware} />

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Latest reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Software</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReviews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-16 text-center text-muted-foreground">
                      No reviews yet.
                    </TableCell>
                  </TableRow>
                )}
                {recentReviews.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.software?.name ?? "—"}</TableCell>
                    <TableCell>{r.reviewer_name}</TableCell>
                    <TableCell>★ {r.overall_rating}</TableCell>
                    <TableCell>{formatDateShort(r.review_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-base">Latest published articles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentArticles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-16 text-center text-muted-foreground">
                      No articles yet.
                    </TableCell>
                  </TableRow>
                )}
                {recentArticles.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="max-w-64 truncate font-medium">
                      <Link href={`/admin/articles/${a.id}/edit`} className="hover:text-brand">
                        {a.title}
                      </Link>
                    </TableCell>
                    <TableCell>{a.author_name}</TableCell>
                    <TableCell>{formatDateShort(a.published_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
