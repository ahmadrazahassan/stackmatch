"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { SearchBar } from "./SearchBar";

const navLinks = [
  { href: "/software", label: "Software Reviews" },
  { href: "/categories", label: "Categories" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Blog" },
];

type PillRect = { left: number; top: number; width: number; height: number } | null;

export function Navbar({ contactEmail }: { contactEmail?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [pill, setPill] = useState<PillRect>(null);
  const [pillHot, setPillHot] = useState(false); // true while a link is hovered

  const activeHref = navLinks.find(
    (l) => pathname === l.href || pathname.startsWith(l.href + "/")
  )?.href;

  const measure = useCallback((href: string | undefined): PillRect => {
    const nav = navRef.current;
    const el = href ? linkRefs.current.get(href) : undefined;
    if (!nav || !el) return null;
    const navBox = nav.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return {
      left: box.left - navBox.left,
      top: box.top - navBox.top,
      width: box.width,
      height: box.height,
    };
  }, []);

  // Rest the pill on the active route; re-measure on resize.
  useEffect(() => {
    const rest = () => setPill(measure(activeHref));
    rest();
    window.addEventListener("resize", rest);
    return () => window.removeEventListener("resize", rest);
  }, [activeHref, measure]);

  // Frosted chrome once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes overlays.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pillVisible = pill !== null && (pillHot || activeHref !== undefined);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-black/[0.06] bg-white/80 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70"
          : "border-b border-transparent bg-white"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between gap-4 px-4 transition-[height] duration-300 md:px-8 lg:px-12 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 text-xl font-bold text-navy"
        >
          <img
            src="/logo.png"
            alt="CloudPayZA Logo"
            className="h-8 w-8 object-contain transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105"
          />
          <span>
            CloudPay<span className="text-brand">ZA</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          aria-label="Main"
          className="relative hidden items-center lg:flex"
          onMouseLeave={() => {
            setPillHot(false);
            setPill(measure(activeHref));
          }}
        >
          {/* Sliding highlight — glides between links, rests on the active route */}
          <span
            aria-hidden
            className={`absolute left-0 top-0 rounded-full bg-navy/[0.05] transition-[transform,width,height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pillVisible ? "opacity-100" : "opacity-0"
            }`}
            style={
              pill
                ? {
                    width: pill.width,
                    height: pill.height,
                    transform: `translate(${pill.left}px, ${pill.top}px)`,
                  }
                : undefined
            }
          />
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el);
                  else linkRefs.current.delete(link.href);
                }}
                onMouseEnter={() => {
                  setPillHot(true);
                  setPill(measure(link.href));
                }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-navy" : "text-muted-foreground hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:text-navy ${
              searchOpen ? "bg-navy/[0.05] text-navy" : "hover:bg-navy/[0.05]"
            }`}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <a
            href={`mailto:${contactEmail ?? "hello@cloudpayza.com"}?subject=List%20Your%20Software%20on%20CloudPayZA`}
            className="hidden rounded-full bg-amber px-4 py-2 text-sm font-semibold text-navy shadow-[0_1px_2px_rgba(245,166,35,0.4),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-amber-dark hover:shadow-[0_4px_12px_-2px_rgba(245,166,35,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-[0.97] sm:inline-flex"
          >
            List Your Software
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v);
              setSearchOpen(false);
            }}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search panel — animates open via grid-rows, height auto-friendly */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          searchOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/[0.06] py-3">
            <div className="container-site">
              <SearchBar autoFocus={searchOpen} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu — same height-auto animation */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="border-t border-black/[0.06] py-2" aria-label="Mobile">
            <div className="container-site flex flex-col">
              {navLinks.map((link, i) => {
                const isActive = link.href === activeHref;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                    className={`border-b border-border/60 py-3 text-sm font-medium transition-[opacity,transform] duration-300 last:border-0 ${
                      isActive ? "text-navy" : "text-muted-foreground"
                    } ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={`mailto:${contactEmail ?? "hello@cloudpayza.com"}`}
                style={{ transitionDelay: mobileOpen ? `${navLinks.length * 40}ms` : "0ms" }}
                className={`py-3 text-sm font-semibold text-amber-dark transition-[opacity,transform] duration-300 ${
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                List Your Software
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
