import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { StarRating } from "@/components/public/StarRating";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import { softwareBrandColors } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import type { Software } from "@/lib/types";

export type ProfileTab = "overview" | "alternatives" | "reviews";

const OVERVIEW_SECTIONS = [
  { label: "Description", anchor: "#description" },
  { label: "Alternatives", anchor: "#alternatives" },
  { label: "FAQs", anchor: "#faqs" },
  { label: "Users", anchor: "#users" },
  { label: "Pros and Cons", anchor: "#pros-cons" },
  { label: "Features", anchor: "#features" },
  { label: "Pricing", anchor: "#pricing" },
  { label: "Integrations", anchor: "#integrations" },
  { label: "Support", anchor: "#support" },
];

export function ProfileShell({
  software,
  activeTab,
  children,
}: {
  software: Software;
  activeTab: ProfileTab;
  children: React.ReactNode;
}) {
  const base = `/software/${software.slug}`;
  const brandColor = softwareBrandColors[software.slug] ?? "var(--color-brand)";

  return (
    <div className="container-site pb-12">
      <Breadcrumb
        items={[
          ...(software.category
            ? [{ label: software.category.name, href: `/category/${software.category.slug}` }]
            : []),
          { label: software.name },
        ]}
      />

      <div className="flex flex-wrap items-start gap-5 py-5">
        <SoftwareLogo
          src={software.logo_url}
          name={software.name}
          size={84}
          className="shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{software.name}</h1>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${softwareBrandColors[software.slug] ?? "#00A86B"}15`, color: brandColor }}
            >
              <BadgeCheck className="h-3.5 w-3.5" /> Verified Listing
            </span>
          </div>
          {software.tagline && <p className="mt-1 text-muted-foreground">{software.tagline}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              {formatRating(Number(software.overall_rating))}
            </span>
            <StarRating rating={Number(software.overall_rating)} size="lg" />
            <Link href={`${base}/reviews`} className="text-sm text-muted-foreground underline-offset-2 hover:underline" style={{ color: brandColor }}>
              Based on {reviewCountLabel(software.review_count)}
            </Link>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 -mx-4 border-b bg-white/95 px-4 backdrop-blur">
        <nav className="flex gap-1 overflow-x-auto" aria-label="Profile sections">
          {activeTab === "overview" ? (
            <>
              {OVERVIEW_SECTIONS.map((s, i) => (
                <a
                  key={s.anchor}
                  href={s.anchor}
                  className={cn(
                    "border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors",
                    i === 0
                      ? "border-current"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  style={i === 0 ? { color: brandColor } : undefined}
                >
                  {s.label}
                </a>
              ))}
              <a
                href="#reviews"
                className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
              >
                Reviews ({software.review_count})
              </a>
            </>
          ) : (
            (
              [
                { key: "overview", label: "Overview", href: base },
                { key: "alternatives", label: "Alternatives", href: `${base}/alternatives` },
                { key: "reviews", label: `Reviews (${software.review_count})`, href: `${base}/reviews` },
              ] as const
            ).map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                aria-current={tab.key === activeTab ? "page" : undefined}
                className={cn(
                  "border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors",
                  tab.key === activeTab
                    ? "border-current"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                style={tab.key === activeTab ? { color: brandColor } : undefined}
              >
                {tab.label}
              </Link>
            ))
          )}
        </nav>
      </div>

      <div className="pt-8">{children}</div>
    </div>
  );
}
