import { cn } from "@/lib/utils";

/**
 * Stack Match brand mark — two overlapping rounded tiles: a navy tile (the
 * "stack") and a brand-green tile (the "match") clicking into it. Transparent
 * background, works on light and dark surfaces, scales cleanly to a favicon.
 * Colours are pulled from the site scheme in globals.css (--color-navy /
 * --color-brand) and hardcoded here so the mark is self-contained (favicon,
 * OG image, emails all render identically without CSS).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Stack Match"
    >
      {/* Back tile — navy (the stack) */}
      <rect x="4.5" y="9.5" width="15" height="15" rx="4.6" fill="#1b1f3b" />
      {/* Front tile — brand green (the match), overlapping the stack */}
      <rect x="12.5" y="4.5" width="15" height="15" rx="4.6" fill="#00a86b" />
      {/* Joint — the overlap where the two tiles meet, a darker green "click" */}
      <path d="M12.5 9.5 H19.5 V19.5 H16.5 A4 4 0 0 1 12.5 15.5 Z" fill="#00733f" />
    </svg>
  );
}

/**
 * Full lockup: mark + "Stack Match" wordmark. `Match` picks up the brand
 * colour to echo the logo. Used in the navbar, footer and admin header.
 */
export function BrandLockup({
  className,
  markClassName,
  textClassName,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span className={textClassName}>
        Stack <span className="text-brand">Match</span>
      </span>
    </span>
  );
}
