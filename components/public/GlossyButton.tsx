import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "brand" | "neutral" | "dark";

interface GlossyButtonProps {
  href: string;
  label: string;
  variant?: Variant;
  /** required for variant="brand" */
  brandColor?: string;
  size?: "default" | "lg";
  /** render an <a target="_blank"> instead of an internal <Link> */
  external?: boolean;
  rel?: string;
  /** stretch to fill its container (default true — card CTAs) */
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
}

/**
 * Site-standard glossy button, matching AffiliateCTAButton's finish so every
 * CTA shares one shape, radius (rounded-2xl) and height. Works as an internal
 * link or an external/tracked anchor, in brand / neutral / dark variants.
 */
export function GlossyButton({
  href,
  label,
  variant = "brand",
  brandColor = "#00A86B",
  size = "default",
  external = false,
  rel,
  fullWidth = true,
  icon,
  className,
}: GlossyButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-bold font-sans tracking-wider uppercase transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer",
    size === "lg" ? "h-12 px-6 text-xs" : "h-11 px-5 text-[11px]",
    fullWidth && "w-full",
    variant === "neutral" &&
      "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-700",
    variant === "dark" &&
      "bg-zinc-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_22px_-10px_rgba(0,0,0,0.5)] hover:brightness-110 dark:bg-white dark:text-zinc-950 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_22px_-12px_rgba(0,0,0,0.3)]",
    variant === "brand" && "text-white hover:brightness-[1.04]",
    className
  );

  const brandStyle =
    variant === "brand"
      ? {
          backgroundColor: brandColor,
          backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${brandColor}, white 22%), ${brandColor} 46%, color-mix(in srgb, ${brandColor}, black 16%))`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 5px rgba(0,0,0,0.18), 0 10px 22px -8px ${brandColor}80, 0 2px 5px rgba(0,0,0,0.2)`,
        }
      : undefined;

  const inner = (
    <>
      {(variant === "brand" || variant === "dark") && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {label}
        {icon}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel={rel ?? "noopener noreferrer"} className={base} style={brandStyle}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={base} style={brandStyle}>
      {inner}
    </Link>
  );
}
