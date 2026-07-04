import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateCTAButtonProps {
  softwareId: string;
  label: string;
  subtext?: string | null;
  size?: "default" | "lg";
  className?: string;
  brandColor?: string;
  /** "rounded" (default, glossy rounded-rectangle) or "pill" (fully rounded, legacy). */
  radius?: "pill" | "rounded";
}

/**
 * Site-standard primary CTA: a glossy, dimensional button tinted with the
 * product's brand color. Uses one radius (rounded-2xl) and fixed heights so
 * every primary action across the site matches — a vertical gloss gradient, a
 * top sheen highlight and a soft brand-tinted shadow give it depth.
 */
export function AffiliateCTAButton({
  softwareId,
  label,
  subtext,
  size = "default",
  className,
  brandColor,
  radius = "rounded",
}: AffiliateCTAButtonProps) {
  const color = brandColor ?? "#00A86B";
  const rounded = radius === "pill" ? "rounded-full" : "rounded-2xl";
  return (
    <div className={cn("flex flex-col items-stretch gap-1.5", className)}>
      <a
        href={`/api/track-click?id=${softwareId}`}
        target="_blank"
        rel="nofollow sponsored noopener"
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-bold text-white transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-0 active:brightness-100 cursor-pointer font-sans",
          rounded,
          size === "lg" ? "h-12 px-6 text-xs tracking-wider uppercase" : "h-11 px-5 text-[11px] tracking-wider uppercase"
        )}
        style={{
          backgroundColor: color,
          backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${color}, white 22%), ${color} 46%, color-mix(in srgb, ${color}, black 16%))`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 5px rgba(0,0,0,0.18), 0 10px 22px -8px ${color}80, 0 2px 5px rgba(0,0,0,0.2)`,
        }}
      >
        {/* top sheen */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent",
            radius === "pill" ? "rounded-t-full" : "rounded-t-2xl"
          )}
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          {label}
          <ExternalLink
            className={cn(
              "transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              size === "lg" ? "h-3.5 w-3.5" : "h-3 w-3"
            )}
          />
        </span>
      </a>
      {subtext && (
        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium font-sans mt-0.5">
          {subtext}
        </p>
      )}
    </div>
  );
}
