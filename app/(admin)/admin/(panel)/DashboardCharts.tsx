"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardChartsProps {
  monthlyClicks: { month: string; clicks: number }[];
  topSoftware: { name: string; clicks: number }[];
}

export function DashboardCharts({ monthlyClicks, topSoftware }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-base">Affiliate clicks — last 6 months</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyClicks} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#00A86B" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-base">Top 5 software by clicks</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {topSoftware.length === 0 ? (
            <p className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No clicks recorded yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSoftware} layout="vertical" margin={{ top: 4, right: 8, bottom: 0, left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={110} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#00A86B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
