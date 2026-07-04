import { cn } from "@/lib/utils";
import { LinkedInIcon } from "./SocialIcons";

/**
 * Verified tick — an original blue "seal" mark that reads like the verified
 * badges on X / Instagram / Facebook without copying any trademarked path.
 * The seal silhouette is built from two overlapping rounded squares (one
 * rotated 45°) to form an 8-point scalloped disc, with a white check on top.
 * Transparent — no background container.
 */
export function VerifiedTick({ className, title = "Verified reviewer" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <g fill="#1D9BF0">
        <rect x="4.5" y="4.5" width="15" height="15" rx="5" />
        <rect x="4.5" y="4.5" width="15" height="15" rx="5" transform="rotate(45 12 12)" />
      </g>
      <path
        d="M8.6 12.2l2.3 2.3 4.5-4.7"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * "Verified LinkedIn user" indicator — the genuine LinkedIn "in" glyph in the
 * official brand blue, with a small label. No background container.
 */
export function LinkedInVerified({ className, label = "LinkedIn verified" }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400", className)}>
      <LinkedInIcon className="h-[15px] w-[15px] text-[#0A66C2]" />
      {label}
    </span>
  );
}
