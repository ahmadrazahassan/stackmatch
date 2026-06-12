"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Monitor,
  Star,
  FileText,
  FolderOpen,
  GitCompareArrows,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  counts: { software: number; reviews: number; articles: number };
}

const navItems = (counts: AdminSidebarProps["counts"]) => [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/software", label: "Software", icon: Monitor, count: counts.software },
  { href: "/admin/reviews", label: "Reviews", icon: Star, count: counts.reviews },
  { href: "/admin/articles", label: "Articles", icon: FileText, count: counts.articles },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/comparisons", label: "Comparisons", icon: GitCompareArrows },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ counts }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-navy text-white md:flex">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="text-lg font-bold">
          CloudPay<span className="text-brand">ZA</span>
          <span className="ml-2 text-xs font-medium text-white/50">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems(counts).map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {typeof item.count === "number" && item.count > 0 && (
                <Badge
                  variant="secondary"
                  className="h-5 min-w-5 justify-center bg-white/15 px-1.5 text-[11px] text-white"
                >
                  {item.count}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-white/40">
        © {new Date().getFullYear()} CloudPayZA
      </div>
    </aside>
  );
}
