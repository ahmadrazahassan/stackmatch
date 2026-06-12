import Link from "next/link";
import { FacebookIcon, LinkedInIcon, XTwitterIcon } from "./SocialIcons";
import type { Category, Software } from "@/lib/types";

interface FooterProps {
  categories: Category[];
  popularSoftware: Pick<Software, "id" | "name" | "slug">[];
  settings: Record<string, string>;
}

export function Footer({ categories, popularSoftware, settings }: FooterProps) {
  const socials = [
    { href: settings.social_twitter, icon: XTwitterIcon, label: "Twitter / X" },
    { href: settings.social_linkedin, icon: LinkedInIcon, label: "LinkedIn" },
    { href: settings.social_facebook, icon: FacebookIcon, label: "Facebook" },
  ].filter((s) => s.href);

  return (
    <footer className="mt-20 border-t bg-white">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground">
            <img src="/logo.png" alt="CloudPayZA Logo" className="h-8 w-8 object-contain" />
            <span>CloudPay<span className="text-brand">ZA</span></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {settings.tagline ?? "South Africa's #1 Business Software Reviews Platform"}
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">Software</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">Company</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/sitemap.xml", label: "Sitemap" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
            Popular Software
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            {popularSoftware.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link href={`/software/${s.slug}`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-site flex flex-col gap-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CloudPayZA. All rights reserved.</p>
          <p>
            Some links on this site are affiliate links — we may earn a commission at no cost to
            you.
          </p>
        </div>
      </div>
    </footer>
  );
}
