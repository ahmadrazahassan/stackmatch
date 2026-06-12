import Link from "next/link";
import { Check, Globe, Headphones, MessageSquare, Phone, X, BookOpen, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { formatPrice } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";

const supportIcons: Record<string, typeof Phone> = {
  Phone: Phone,
  "Live Chat": MessageSquare,
  Email: Headphones,
  "Knowledge Base": BookOpen,
  Forum: Users,
};

export function SoftwareSidebar({
  software,
  compareWith,
  contactEmail,
  brandColor,
}: {
  software: Software;
  compareWith?: Software | null;
  contactEmail?: string;
  brandColor?: string;
}) {
  return (
    <aside className="space-y-5 rounded-lg border bg-white p-6 card-shadow">
      <AffiliateCTAButton
        softwareId={software.id}
        label={`Visit ${software.name} Website`}
        subtext={software.free_trial ? "Free trial available" : null}
        size="lg"
        brandColor={brandColor}
      />

      <div className="rounded-md bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="text-xl font-bold" style={{ color: brandColor || 'var(--color-foreground)' }}>
          {software.starting_price !== null
            ? formatPrice(software.starting_price, software.price_currency, software.billing_period)
            : "Custom pricing"}
        </p>
      </div>

      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          {software.free_trial ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <X className="h-4 w-4 text-error" />
          )}
          Free Trial
        </li>
        <li className="flex items-center gap-2">
          {software.free_version ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <X className="h-4 w-4 text-error" />
          )}
          Free Version
        </li>
      </ul>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-foreground">About the Vendor</h3>
        <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
          {software.vendor_name && (
            <div className="flex justify-between">
              <dt>Vendor</dt>
              <dd className="font-medium text-foreground">{software.vendor_name}</dd>
            </div>
          )}
          {software.founded_year && (
            <div className="flex justify-between">
              <dt>Founded</dt>
              <dd className="font-medium text-foreground">{software.founded_year}</dd>
            </div>
          )}
        </dl>
      </div>

      {(software.support_types as string[]).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground">Support</h3>
          <ul className="mt-2 space-y-1.5">
            {(software.support_types as string[]).map((s) => {
              const Icon = supportIcons[s] ?? Headphones;
              return (
                <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4" style={{ color: brandColor || 'var(--color-brand)' }} />
                  {s}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {(software.countries_available as string[]).length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Globe className="h-4 w-4" style={{ color: brandColor || 'var(--color-brand)' }} /> Countries
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {(software.countries_available as string[]).join(", ")}
          </p>
        </div>
      )}

      {(software.languages as string[]).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground">Languages</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {(software.languages as string[]).join(", ")}
          </p>
        </div>
      )}

      <Separator />

      <a
        href={`mailto:${contactEmail ?? "hello@cloudpayza.com"}?subject=Review%20submission%20for%20${encodeURIComponent(software.name)}`}
        className="inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        style={{ color: brandColor || 'var(--color-foreground)' }}
      >
        Write a Review
      </a>
      {compareWith && (
        <Link
          href={`/compare/${software.slug}-vs-${compareWith.slug}`}
          className="block text-center text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: brandColor || 'var(--color-brand)' }}
        >
          Compare with {compareWith.name} →
        </Link>
      )}
    </aside>
  );
}
