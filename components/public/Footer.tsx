import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedInIcon, XTwitterIcon } from "./SocialIcons";
import type { Category, Software } from "@/lib/types";

interface FooterProps {
  categories: Category[];
  popularSoftware: Pick<Software, "id" | "name" | "slug">[];
  settings: Record<string, string>;
}

/* Subtle film-grain noise, inlined so there's no extra request. */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

export function Footer({ categories, popularSoftware, settings }: FooterProps) {
  const socials = [
    { href: settings.social_facebook, icon: FacebookIcon, label: "Facebook" },
    { href: settings.social_linkedin, icon: LinkedInIcon, label: "LinkedIn" },
    { href: settings.social_twitter, icon: XTwitterIcon, label: "Twitter / X" },
  ].filter((s) => s.href);

  const contactEmail = settings.contact_email ?? "hello@cloudpayza.com";
  const contactPhone = settings.contact_phone;

  const columns: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: "Quick menu",
      links: [
        { href: "/", label: "Home" },
        { href: "/software", label: "Software Reviews" },
        { href: "/categories", label: "Categories" },
        { href: "/compare", label: "Compare" },
        { href: "/blog", label: "Blog" },
      ],
    },
    {
      title: "Top categories",
      links: categories.slice(0, 5).map((c) => ({
        href: `/category/${c.slug}`,
        label: c.name,
      })),
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
    <footer className="relative mt-24 overflow-hidden bg-[#222426] text-zinc-300">
      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: NOISE }}
      />

      <div className="container-site relative">
        {/* Link columns */}
        <div className="grid gap-x-8 gap-y-12 pt-20 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-heading text-lg font-semibold text-brand">{col.title}</h3>
              <ul className="mt-7 space-y-5 text-[15px]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-zinc-200 transition-colors duration-150 hover:text-brand"
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
            <h3 className="font-heading text-lg font-semibold text-brand">Contact us</h3>
            <ul className="mt-7 space-y-5 text-[15px]">
              {contactPhone && (
                <li>
                  <a
                    href={`tel:${contactPhone.replace(/\s/g, "")}`}
                    className="group flex items-center gap-3 text-zinc-200 transition-colors hover:text-brand"
                  >
                    <Phone className="h-[18px] w-[18px] shrink-0 text-brand" />
                    {contactPhone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="group flex items-center gap-3 text-zinc-200 transition-colors hover:text-brand"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-brand" />
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3 text-zinc-200">
                <MapPin className="h-[18px] w-[18px] shrink-0 text-brand" />
                South Africa
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Brand row */}
        <div className="flex flex-col gap-10 py-14 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-5">
            <img
              src="/logo.png"
              alt="CloudPayZA Logo"
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
            <span className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl">
              CloudPay<span className="text-brand">ZA</span>
            </span>
          </Link>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-zinc-500 transition-colors duration-150 hover:border-white/30 hover:text-white"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
            <p className="text-[15px] text-zinc-400">
              © {new Date().getFullYear()} CloudPayZA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
