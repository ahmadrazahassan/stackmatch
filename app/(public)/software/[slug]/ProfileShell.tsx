import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { StarRating } from "@/components/public/StarRating";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { formatRating, reviewCountLabel } from "@/lib/utils/formatRating";
import { softwareBrandColors } from "@/lib/brandColors";
import { ProfileNav, type ProfileNavItem } from "./ProfileNav";
import type { Software } from "@/lib/types";

export type ProfileTab = "overview" | "alternatives" | "reviews";

const OVERVIEW_SECTIONS: ProfileNavItem[] = [
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
  const brandColor = softwareBrandColors[software.slug] ?? "#00A86B";

  const navItems: ProfileNavItem[] =
    activeTab === "overview"
      ? [...OVERVIEW_SECTIONS, { label: `Reviews (${software.review_count})`, anchor: "#reviews" }]
      : [
          { label: "Overview", href: base, active: false },
          { label: "Alternatives", href: `${base}/alternatives`, active: activeTab === "alternatives" },
          { label: `Reviews (${software.review_count})`, href: `${base}/reviews`, active: activeTab === "reviews" },
        ];

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
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {software.name}
            </h1>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm"
              style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
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
            <Link
              href={`${base}/reviews`}
              className="text-sm underline-offset-2 hover:underline"
              style={{ color: brandColor }}
            >
              Based on {reviewCountLabel(software.review_count)}
            </Link>
          </div>
        </div>
      </div>

      <ProfileNav items={navItems} brandColor={brandColor} />

      <div className="pt-8">{children}</div>
    </div>
  );
}
