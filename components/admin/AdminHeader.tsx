"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/software": "Software",
  "/admin/reviews": "Reviews",
  "/admin/articles": "Articles",
  "/admin/categories": "Categories",
  "/admin/comparisons": "Comparisons",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

function pageTitle(pathname: string): string {
  if (titles[pathname]) return titles[pathname];
  const base = Object.keys(titles)
    .filter((k) => k !== "/admin" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  if (!base) return "Admin";
  if (pathname.endsWith("/new")) return `New ${titles[base].replace(/s$/, "")}`;
  if (pathname.endsWith("/edit")) return `Edit ${titles[base].replace(/s$/, "")}`;
  return titles[base];
}

export function AdminHeader() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold text-foreground">{pageTitle(pathname)}</h1>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" />
            View site
          </Link>
        </Button>
        {user?.email && (
          <span className="hidden text-sm text-muted-foreground lg:inline">{user.email}</span>
        )}
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
