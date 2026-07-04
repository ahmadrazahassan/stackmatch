import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAlternatives,
  getCategoryPeers,
  getSoftwareBySlug,
} from "@/lib/supabase/queries";
import { ProfileShell } from "../ProfileShell";
import { AlternativeCard } from "@/components/public/AlternativeCard";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import { Check, X } from "lucide-react";
import type { Software } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Software Not Found" };
  return {
    title: `Best ${software.name} Alternatives ${new Date().getFullYear()}`,
    description: `Looking for a ${software.name} alternative? Compare the top competitors on pricing, ratings and features for UK businesses.`,
    alternates: { canonical: `/software/${software.slug}/alternatives` },
  };
}

function MiniCompareRow({ label, a, b }: { label: string; a: React.ReactNode; b: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-center border-b py-3 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-center font-medium">{a}</span>
      <span className="text-center font-medium">{b}</span>
    </div>
  );
}

function ScoreBar({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
        <span className="block h-full bg-brand" style={{ width: `${(value / 5) * 100}%` }} />
      </span>
      {formatRating(value)}
    </span>
  );
}

export default async function SoftwareAlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  let alternatives = await getAlternatives(software.id, 6);
  if (alternatives.length === 0) {
    alternatives = await getCategoryPeers(software.id, software.category_id, 6);
  }
  const top: Software | undefined = alternatives[0];

  return (
    <ProfileShell software={software} activeTab="alternatives">
      <div className="space-y-12">
        {alternatives.length === 0 ? (
          <p className="rounded-lg border bg-white p-12 text-center text-muted-foreground card-shadow">
            No alternatives listed yet for {software.name}.
          </p>
        ) : (
          <>
            <section>
              <h2 className="mb-4 text-xl font-bold">Popular comparisons</h2>
              <ul className="flex flex-wrap gap-2">
                {alternatives.slice(0, 4).map((alt) => (
                  <li key={alt.id}>
                    <Link
                      href={`/compare/${software.slug}-vs-${alt.slug}`}
                      className="inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                    >
                      {software.name} vs {alt.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold">
                Other great alternatives to {software.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {alternatives.map((alt) => (
                  <AlternativeCard key={alt.id} software={alt} />
                ))}
              </div>
            </section>

            {top && (
              <section>
                <h2 className="mb-4 text-xl font-bold">Compare with a popular alternative</h2>
                <div className="rounded-lg border bg-white p-6 card-shadow">
                  <div className="grid grid-cols-3 items-center pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <SoftwareLogo src={software.logo_url} name={software.name} size={64} />
                      <span className="text-center font-bold">{software.name}</span>
                    </div>
                    <span className="text-center text-2xl font-extrabold text-muted-foreground">
                      VS
                    </span>
                    <div className="flex flex-col items-center gap-2">
                      <SoftwareLogo src={top.logo_url} name={top.name} size={64} />
                      <span className="text-center font-bold">{top.name}</span>
                    </div>
                  </div>
                  <MiniCompareRow
                    label="Starting Price"
                    a={
                      software.starting_price !== null
                        ? formatPrice(software.starting_price, software.price_currency, software.billing_period)
                        : "Custom"
                    }
                    b={
                      top.starting_price !== null
                        ? formatPrice(top.starting_price, top.price_currency, top.billing_period)
                        : "Custom"
                    }
                  />
                  <MiniCompareRow
                    label="Free Trial"
                    a={software.free_trial ? <Check className="inline h-4 w-4 text-success" /> : <X className="inline h-4 w-4 text-error" />}
                    b={top.free_trial ? <Check className="inline h-4 w-4 text-success" /> : <X className="inline h-4 w-4 text-error" />}
                  />
                  <MiniCompareRow
                    label="Ease of Use"
                    a={<ScoreBar value={Number(software.ease_of_use_rating)} />}
                    b={<ScoreBar value={Number(top.ease_of_use_rating)} />}
                  />
                  <MiniCompareRow
                    label="Value for Money"
                    a={<ScoreBar value={Number(software.value_for_money_rating)} />}
                    b={<ScoreBar value={Number(top.value_for_money_rating)} />}
                  />
                  <MiniCompareRow
                    label="Customer Service"
                    a={<ScoreBar value={Number(software.customer_service_rating)} />}
                    b={<ScoreBar value={Number(top.customer_service_rating)} />}
                  />
                  <div className="pt-5 text-center">
                    <Link
                      href={`/compare/${software.slug}-vs-${top.slug}`}
                      className="inline-flex rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      View Full Comparison
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </ProfileShell>
  );
}
