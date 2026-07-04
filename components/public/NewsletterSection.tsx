import { ShieldCheck, MousePointerClick, Landmark } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { cn } from "@/lib/utils";

const trustPoints = [
  { icon: ShieldCheck, label: "No spam, ever" },
  { icon: MousePointerClick, label: "One-click unsubscribe" },
  { icon: Landmark, label: "Built for UK businesses" },
];

interface NewsletterSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Standalone mid-page newsletter callout — deliberately distinct from the
 * Footer's newsletter row (centered, dashed-border navy band, not the
 * two-column dark strip) so the two don't read as the same block repeated.
 */
export function NewsletterSection({
  eyebrow = "NEWSLETTER",
  title = "Get the verdict before you buy",
  description = "Join UK business owners who get new reviews, comparison guides and pricing changes — before they make a software decision.",
  className,
}: NewsletterSectionProps) {
  return (
    <section className={cn("container-site py-20", className)}>
      <div className="rounded-[32px] border border-dashed border-white/15 bg-navy px-8 py-16 sm:px-16 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/45 uppercase">
            <span className="h-1.5 w-3.5 bg-brand" />
            {eyebrow}
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-zinc-400">{description}</p>

          <div className="mx-auto mt-10 max-w-md">
            <NewsletterForm variant="compact" />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustPoints.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-[13px] font-medium text-zinc-400">
                <t.icon className="h-4 w-4 text-brand" />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
