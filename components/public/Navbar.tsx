"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { SearchBar } from "./SearchBar";

const navLinks = [
  { href: "/software", label: "Software Reviews" },
  { href: "/categories", label: "Categories" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Blog" },
];

export function Navbar({ contactEmail }: { contactEmail?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-bold text-navy">
          <img src="/logo.png" alt="CloudPayZA Logo" className="h-8 w-8 object-contain" />
          <span>CloudPay<span className="text-brand">ZA</span></span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href={`mailto:${contactEmail ?? "hello@cloudpayza.com"}?subject=List%20Your%20Software%20on%20CloudPayZA`}
            className="hidden rounded-md bg-amber px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-amber-dark sm:inline-flex"
          >
            List Your Software
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t bg-white py-3">
          <div className="container-site">
            <SearchBar />
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="border-t bg-white py-2 lg:hidden" aria-label="Mobile">
          <div className="container-site flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b py-3 text-sm font-medium last:border-0 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${contactEmail ?? "hello@cloudpayza.com"}`}
              className="py-3 text-sm font-semibold text-amber-dark"
            >
              List Your Software
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
