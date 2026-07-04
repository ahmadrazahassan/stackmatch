import { Check } from "lucide-react";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { formatPrice } from "@/lib/utils/formatRating";

export interface PricingCard {
  /** stable key */
  id: string;
  name: string;
  tagline?: string | null;
  /** number/string price, or null for custom / contact-sales */
  price: number | string | null;
  currency: string;
  period: string;
  features: string[];
  badgeLabel?: string | null;
  highlighted: boolean;
  accentColor: string;
  ctaSoftwareId: string;
  ctaLabel?: string;
}

/** Small decorative pixel-grid motif (top-right of the highlighted card). */
function PixelMotif({ color }: { color: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute right-6 top-6 flex flex-col items-end gap-1.5">
      <div className="flex gap-1.5">
        <span className="h-5 w-5 rounded-[5px]" style={{ backgroundColor: color, opacity: 0.35 }} />
        <span className="h-7 w-7 rounded-[6px]" style={{ backgroundColor: color }} />
      </div>
      <div className="flex gap-1.5">
        <span className="h-4 w-4 rounded-[4px]" style={{ backgroundColor: color, opacity: 0.6 }} />
        <span className="h-5 w-5 rounded-[5px]" style={{ backgroundColor: color, opacity: 0.85 }} />
      </div>
    </div>
  );
}

function Badge({ label, accent, dark }: { label: string; accent: string; dark: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ${
        dark ? "text-zinc-100" : "text-zinc-700"
      }`}
      style={{ backgroundColor: dark ? "rgba(255,255,255,0.08)" : `${accent}1A` }}
    >
      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: accent }} />
      {label}
    </span>
  );
}

function FeatureItem({ label, accent, dark }: { label: string; accent: string; dark: boolean }) {
  return (
    <li className="flex items-center gap-2.5 text-sm">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: dark ? "rgba(255,255,255,0.12)" : `${accent}1F` }}
      >
        <Check className="h-3 w-3" style={{ color: dark ? "#fff" : accent }} strokeWidth={3} />
      </span>
      <span className={dark ? "text-zinc-200" : "text-zinc-700 dark:text-zinc-300"}>{label}</span>
    </li>
  );
}

function Card({ card }: { card: PricingCard }) {
  const { highlighted, accentColor, features, price } = card;
  const isCustom = price === null || price === undefined || price === "";
  const numericFree = !isCustom && Number(price) === 0;

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 sm:p-9 ${
        highlighted
          ? "bg-zinc-900 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
          : "border border-zinc-200/80 bg-white text-zinc-900 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.25)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
      }`}
    >
      {/* faint grid texture + pixel motif on the highlighted card */}
      {highlighted && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              maskImage: "radial-gradient(120% 90% at 80% 0%, black 25%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(120% 90% at 80% 0%, black 25%, transparent 75%)",
            }}
          />
          <PixelMotif color={accentColor} />
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        {/* header */}
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-bold font-heading">{card.name}</h3>
          {card.badgeLabel && <Badge label={card.badgeLabel} accent={accentColor} dark={highlighted} />}
        </div>
        {card.tagline && (
          <p
            className={`mt-4 max-w-sm text-xl font-bold leading-snug font-heading ${
              highlighted ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {card.tagline}
          </p>
        )}

        {/* price + CTA */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold tracking-tight font-heading sm:text-5xl">
              {isCustom ? "Custom" : numericFree ? "Free" : formatPrice(price as number, card.currency)}
            </span>
            {!isCustom && !numericFree && (
              <span className={`text-sm font-medium ${highlighted ? "text-zinc-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                / {card.period}
              </span>
            )}
          </div>
          <AffiliateCTAButton
            softwareId={card.ctaSoftwareId}
            label={card.ctaLabel ?? "Get Started"}
            brandColor={accentColor}
            size="lg"
          />
        </div>

        {/* divider */}
        <div className={`my-7 border-t border-dotted ${highlighted ? "border-white/15" : "border-zinc-300/70 dark:border-zinc-700"}`} />

        {/* features — two columns */}
        {features.length > 0 ? (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {features.filter(Boolean).slice(0, 8).map((f) => (
              <FeatureItem key={f} label={f} accent={accentColor} dark={highlighted} />
            ))}
          </ul>
        ) : (
          <p className={`text-sm ${highlighted ? "text-zinc-400" : "text-muted-foreground"}`}>
            Contact the vendor for a tailored quote and full feature list.
          </p>
        )}
      </div>
    </div>
  );
}

export function PricingCards({ cards, columns = 2 }: { cards: PricingCard[]; columns?: 2 | 3 }) {
  if (cards.length === 0) return null;
  const cols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : cards.length === 1
        ? "max-w-xl"
        : "md:grid-cols-2";
  return (
    <div className={`grid gap-6 ${cols}`}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
