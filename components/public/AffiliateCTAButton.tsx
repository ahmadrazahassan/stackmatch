import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateCTAButtonProps {
  softwareId: string;
  label: string;
  subtext?: string | null;
  size?: "default" | "lg";
  className?: string;
}

/**
 * Green affiliate CTA. Routes through /api/track-click which records the
 * click and 302-redirects to the affiliate URL (or vendor site).
 */
export function AffiliateCTAButton({
  softwareId,
  label,
  subtext,
  size = "default",
  className,
  brandColor,
}: AffiliateCTAButtonProps & { brandColor?: string }) {
  return (
    <div className={cn("flex flex-col items-stretch gap-1", className)}>
      <a
        href={`/api/track-click?id=${softwareId}`}
        target="_blank"
        rel="nofollow sponsored noopener"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md",
          !brandColor && "bg-brand hover:bg-brand-dark",
          size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
        )}
        style={brandColor ? { backgroundColor: brandColor, boxShadow: `0 4px 14px 0 ${brandColor}40` } : undefined}
      >
        {label}
        <ExternalLink className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
      </a>
      {subtext && <p className="text-center text-xs text-muted-foreground">{subtext}</p>}
    </div>
  );
}
