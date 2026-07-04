"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/public/BrandLogo";
import {
  LogOut,
  ExternalLink,
  LayoutDashboard,
  Monitor,
  Star,
  FileText,
  FolderOpen,
  GitCompareArrows,
  BarChart3,
  Settings,
  Layout,
  Mail,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  counts?: { software: number; reviews: number; articles: number };
}

const navItems = (counts: AdminHeaderProps["counts"] = { software: 0, reviews: 0, articles: 0 }) => [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/software", label: "Software", icon: Monitor, count: counts.software },
  { href: "/admin/reviews", label: "Reviews", icon: Star, count: counts.reviews },
  { href: "/admin/articles", label: "Articles", icon: FileText, count: counts.articles },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/comparisons", label: "Comparisons", icon: GitCompareArrows },
  { href: "/admin/pages", label: "Pages", icon: Layout },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminHeader({ counts }: AdminHeaderProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down past 60px, hide header
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
        setMobileMenuOpen(false); // Close menu on scroll down
      } else {
        // Scrolling up or at the top
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const items = navItems(counts);

  return (
    <>
      <div 
        className={cn(
          "fixed left-0 right-0 top-6 z-50 w-full px-4 transition-transform duration-500 ease-out sm:px-8",
          isVisible ? "translate-y-0" : "-translate-y-[200%]"
        )}
      >
        <header 
          className="flex h-16 w-full items-center justify-between rounded-full border border-white/60 bg-white/40 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-3xl supports-[backdrop-filter]:bg-white/40 dark:border-white/10 dark:bg-black/40"
        >
          <div className="flex items-center gap-2 sm:gap-6">
            <Link href="/admin" className="flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
              <LogoMark className="h-7 w-7" />
              <span>Stack <span className="text-brand">Match</span></span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {items.map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all",
                      active 
                        ? "bg-foreground text-background shadow-md" 
                        : "text-foreground/70 hover:bg-black/5 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {typeof item.count === "number" && item.count > 0 && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "ml-1 h-5 min-w-5 justify-center px-1.5 text-[10px]",
                          active ? "bg-background/20 text-background" : "bg-foreground/10 text-foreground"
                        )}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex rounded-full text-foreground/70 hover:text-foreground hover:bg-black/5">
              <Link href="/" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
            
            <div className="hidden items-center gap-3 sm:flex">
              <div className="h-5 w-px bg-foreground/10" />
              <Button variant="ghost" size="sm" onClick={signOut} className="rounded-full text-foreground/70 hover:text-foreground hover:bg-black/5">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="xl:hidden rounded-full hover:bg-black/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm xl:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm border-l bg-background p-6 shadow-lg animate-in slide-in-from-right-full">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {items.map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      active 
                        ? "bg-foreground text-background" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {typeof item.count === "number" && item.count > 0 && (
                      <Badge variant="secondary">{item.count}</Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 border-t pt-8 flex flex-col gap-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Public Site
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
