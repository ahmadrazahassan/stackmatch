import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateCTAButtonProps {
  softwareId: string;
  label: string;
  subtext?: string | null;
  size?: "default" | "lg";
  className?: string;
  brandColor?: string;
}

/**
 * Glassmorphism affiliate CTA tinted with the product's brand color.
 * Routes through /api/track-click which records the click and 302-redirects
 * to the affiliate URL (or vendor site).
 */
export function AffiliateCTAButton({
  softwareId,
  label,
  subtext,
  size = "default",
  className,
  brandColor,
}: AffiliateCTAButtonProps) {
  const color = brandColor ?? "#00A86B";
  return (
    <div className={cn("flex flex-col items-stretch gap-1", className)}>
      <a
        href={`/api/track-click?id=${softwareId}`}
        target="_blank"
        rel="nofollow sponsored noopener"
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
          size === "lg" ? "px-6 py-3.5 text-base" : "px-4 py-2 text-sm"
        )}
        style={{
          backgroundColor: `${color}E0`,
          borderColor: "rgba(255,255,255,0.25)",
          boxShadow: `0 8px 24px -6px ${color}66, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* glass sheen sweep */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        {label}
        <ExternalLink
          className={cn(
            "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"
          )}
        />
      </a>
      {subtext && <p className="text-center text-xs text-muted-foreground">{subtext}</p>}
    </div>
  );
}
