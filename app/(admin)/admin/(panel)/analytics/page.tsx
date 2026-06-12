import Link from "next/link";
import { formatDistanceToNow, startOfDay, startOfMonth, startOfWeek, subDays } from "date-fns";
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
import { cn } from "@/lib/utils";

interface ClickRow {
  software_id: string | null;
  software_name: string | null;
  clicked_at: string;
  country_code: string | null;
}

const RANGES = [
  { key: "7", label: "Last 7 days", days: 7 },
  { key: "30", label: "Last 30 days", days: 30 },
  { key: "90", label: "Last 90 days", days: 90 },
  { key: "all", label: "All time", days: null },
] as const;

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range = "30" } = await searchParams;
  const selected = RANGES.find((r) => r.key === range) ?? RANGES[1];

  let rows: ClickRow[] = [];
  try {
    const supabase = await createClient();
    let query = supabase
      .from("affiliate_clicks")
      .select("software_id, software_name, clicked_at, country_code")
      .order("clicked_at", { ascending: false })
      .limit(20000);
    if (selected.days) {
      query = query.gte("clicked_at", subDays(new Date(), selected.days).toISOString());
    }
    const { data } = await query;
    rows = (data as ClickRow[]) ?? [];
  } catch {
    // Supabase not configured yet.
  }

  const now = new Date();
  const dayStart = startOfDay(now).getTime();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }).getTime();
  const monthStart = startOfMonth(now).getTime();

  interface Agg {
    name: string;
    today: number;
    week: number;
    month: number;
    total: number;
    lastClick: string;
  }
  const bySoftware = new Map<string, Agg>();
  const byCountry = new Map<string, number>();

  for (const row of rows) {
    const key = row.software_name ?? "Unknown";
    const t = new Date(row.clicked_at).getTime();
    const agg = bySoftware.get(key) ?? {
      name: key,
      today: 0,
      week: 0,
      month: 0,
      total: 0,
      lastClick: row.clicked_at,
    };
    agg.total += 1;
    if (t >= dayStart) agg.today += 1;
    if (t >= weekStart) agg.week += 1;
    if (t >= monthStart) agg.month += 1;
    if (row.clicked_at > agg.lastClick) agg.lastClick = row.clicked_at;
    bySoftware.set(key, agg);

    const country = row.country_code ?? "Unknown";
    byCountry.set(country, (byCountry.get(country) ?? 0) + 1);
  }

  const softwareAggs = [...bySoftware.values()].sort((a, b) => b.total - a.total);
  const countryAggs = [...byCountry.entries()].sort((a, b) => b[1] - a[1]);
  const totalClicks = rows.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {totalClicks.toLocaleString("en-ZA")} affiliate clicks · {selected.label.toLowerCase()}
        </p>
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <Button
              key={r.key}
              asChild
              size="sm"
              variant={r.key === selected.key ? "default" : "outline"}
            >
              <Link href={`/admin/analytics?range=${r.key}`}>{r.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-base">Clicks by software</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Software</TableHead>
                <TableHead className="text-right">Today</TableHead>
                <TableHead className="text-right">This Week</TableHead>
                <TableHead className="text-right">This Month</TableHead>
                <TableHead className="text-right">Total ({selected.label.toLowerCase()})</TableHead>
                <TableHead>Last Click</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {softwareAggs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No clicks recorded yet. Clicks are tracked when visitors use the
                    &quot;Visit Website&quot; buttons.
                  </TableCell>
                </TableRow>
              )}
              {softwareAggs.map((s, i) => (
                <TableRow key={s.name}>
                  <TableCell className={cn("font-medium", i === 0 && "text-brand")}>
                    {s.name}
                  </TableCell>
                  <TableCell className="text-right">{s.today}</TableCell>
                  <TableCell className="text-right">{s.week}</TableCell>
                  <TableCell className="text-right">{s.month}</TableCell>
                  <TableCell className="text-right font-semibold">{s.total}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(s.lastClick), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="card-shadow max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Geographic breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {countryAggs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet.</p>
          ) : (
            <ul className="space-y-2">
              {countryAggs.map(([country, count]) => (
                <li key={country} className="flex items-center gap-3 text-sm">
                  <span className="w-20 font-medium">{country}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${Math.round((count / totalClicks) * 100)}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-muted-foreground">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
