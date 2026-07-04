import Link from "next/link";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One-line CAP-compliant affiliate disclosure shown at the point of
 * promotion (next to CTAs, pricing and review headers) — the full policy
 * lives at /affiliate-disclosure, this keeps it visible where clicks happen.
 */
export function AffiliateDisclosureNote({
  className,
  align = "left",
}: {
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-1.5 text-[12px] leading-5 text-zinc-400 dark:text-zinc-500 font-sans",
        align === "center" && "justify-center text-center",
        className
      )}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>
        We may earn a commission if you buy via links on this page. It never affects how we rate
        software —{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-brand hover:decoration-brand dark:decoration-zinc-700"
        >
          how we make money
        </Link>
        .
      </span>
    </p>
  );
}
