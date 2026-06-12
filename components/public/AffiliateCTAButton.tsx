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
 * Modern pill-shaped affiliate CTA tinted with the product's brand color.
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
    <div className={cn("flex flex-col items-stretch gap-1.5", className)}>
      <a
        href={`/api/track-click?id=${softwareId}`}
        target="_blank"
        rel="nofollow sponsored noopener"
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer shadow-sm font-sans",
          size === "lg" ? "px-6 py-3.5 text-xs tracking-wider uppercase" : "px-4 py-2 text-[11px] tracking-wider uppercase"
        )}
        style={{
          backgroundColor: color,
        }}
      >
        {label}
        <ExternalLink
          className={cn(
            "transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            size === "lg" ? "h-3.5 w-3.5" : "h-3 w-3"
          )}
        />
      </a>
      {subtext && <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium font-sans mt-0.5">{subtext}</p>}
    </div>
  );
}

