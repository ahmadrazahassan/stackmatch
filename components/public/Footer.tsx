import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FacebookIcon, LinkedInIcon, XTwitterIcon } from "./SocialIcons";
import { NewsletterForm } from "./NewsletterForm";
import { LogoMark } from "./BrandLogo";
import type { Category, Software } from "@/lib/types";

interface FooterProps {
  categories: Category[];
  popularSoftware: Pick<Software, "id" | "name" | "slug">[];
  settings: Record<string, string>;
}

export function Footer({ categories, popularSoftware, settings }: FooterProps) {
  const socials = [
    { href: settings.social_facebook, icon: FacebookIcon, label: "Facebook" },
    { href: settings.social_linkedin, icon: LinkedInIcon, label: "LinkedIn" },
    { href: settings.social_twitter, icon: XTwitterIcon, label: "Twitter / X" },
  ].filter((s) => s.href);

  const contactEmail = settings.contact_email ?? "hello@stackmatch.uk";
  const contactPhone = settings.contact_phone;
  const year = new Date().getFullYear();

  const columns: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: "Explore",
      links: [
        { href: "/", label: "Home" },
        { href: "/software", label: "Software Reviews" },
        { href: "/categories", label: "Categories" },
        { href: "/compare", label: "Compare" },
        { href: "/blog", label: "Blog" },
        { href: "/newsletter", label: "Newsletter" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About us" },
        { href: "/editorial-policy", label: "How we review" },
        { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
        { href: "/contact", label: "Contact" },
        { href: "/accessibility", label: "Accessibility" },
      ],
    },
    {
      title: "Popular software",
      links: popularSoftware.slice(0, 5).map((s) => ({
        href: `/software/${s.slug}`,
        label: s.name,
      })),
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-3xl bg-zinc-950 text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_-16px_48px_-28px_rgba(0,0,0,0.6)]">
      {/* glossy top highlight — a hairline sheen, no background gradient */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />
      <div className="container-site">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 border-b border-zinc-800 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-sm shrink-0">
            <h3 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
              Stay ahead on UK business software
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">
              New reviews, comparison guides and pricing changes — straight to your inbox. No spam,
              ever.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {/* Top: brand + navigation */}
        <div className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <LogoMark className="h-11 w-11 sm:h-12 sm:w-12" />
              <span className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Stack <span className="text-brand">Match</span>
              </span>
            </Link>

            <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-zinc-400">
              {settings.footer_tagline ??
                "Independent reviews and side-by-side comparisons of the UK's best business software."}
            </p>

            {socials.length > 0 && (
              <div className="mt-8 flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <s.icon className="h-[15px] w-[15px]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3.5 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-zinc-300 transition-colors duration-150 hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Contact column */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Get in touch
              </h3>
              <ul className="mt-5 space-y-3.5 text-[15px]">
                {contactPhone && (
                  <li>
                    <a
                      href={`tel:${contactPhone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 text-zinc-300 transition-colors hover:text-white"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-zinc-500" />
                      {contactPhone}
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center gap-2.5 text-zinc-300 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-zinc-500" />
                    {contactEmail}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-zinc-300">
                  <MapPin className="h-4 w-4 shrink-0 text-zinc-500" />
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-zinc-800 py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">
            © {year} Stack Match. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/privacy-policy" className="text-zinc-400 transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="text-zinc-400 transition-colors hover:text-white">
              Cookies
            </Link>
            <Link href="/terms" className="text-zinc-400 transition-colors hover:text-white">
              Terms
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex items-center gap-1 font-medium text-white transition-colors hover:text-brand"
            >
              Suggest software
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
