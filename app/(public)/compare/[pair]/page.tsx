import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { ComparisonTable } from "@/components/public/ComparisonTable";
import { AffiliateCTAButton } from "@/components/public/AffiliateCTAButton";
import { getComparisonRecord, getSoftwareBySlug } from "@/lib/supabase/queries";
import type { Software } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";
import { SoftwareLogo } from "@/components/public/SoftwareLogo";

export const revalidate = 3600;

/**
 * URL shape: /compare/[slug-a]-vs-[slug-b].
 * Slugs can contain hyphens, so try every "-vs-" split point until both
 * sides resolve to published software.
 */
async function resolvePair(pair: string): Promise<[Software, Software] | null> {
  const parts = pair.split("-vs-");
  if (parts.length < 2) return null;
  for (let i = 1; i < parts.length; i++) {
    const slugA = parts.slice(0, i).join("-vs-");
    const slugB = parts.slice(i).join("-vs-");
    const [a, b] = await Promise.all([getSoftwareBySlug(slugA), getSoftwareBySlug(slugB)]);
    if (a && b) return [a, b];
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const resolved = await resolvePair(pair);
  if (!resolved) return { title: "Comparison Not Found" };
  const [a, b] = resolved;
  const comparison = await getComparisonRecord(a.id, b.id);
  const title =
    comparison?.meta_title ??
    `${a.name} vs ${b.name} ${new Date().getFullYear()} — Which Is Better?`;
  const description =
    comparison?.meta_description ??
    `${a.name} vs ${b.name} compared for South African SMBs: pricing, ratings, features and our verdict.`;
  return {
    title,
    description,
    alternates: { canonical: `/compare/${a.slug}-vs-${b.slug}` },
    openGraph: {
      title,
      description,
      locale: "en_ZA",
      type: "website",
      images: [
        `/api/og?title=${encodeURIComponent(`${a.name} vs ${b.name}`)}&subtitle=${encodeURIComponent("Head-to-head comparison")}`,
      ],
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const resolved = await resolvePair(pair);
  if (!resolved) notFound();
  const [a, b] = resolved;
  const comparison = await getComparisonRecord(a.id, b.id);
  const colorA = softwareBrandColors[a.slug] || "var(--color-brand)";
  const colorB = softwareBrandColors[b.slug] || "var(--color-navy)";

  return (
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "Compare", href: "/compare" }, { label: `${a.name} vs ${b.name}` }]} />

      <header className="py-10 text-center">
        <div className="mx-auto flex items-center justify-center gap-6 mb-6">
          <div className="flex flex-col items-center gap-3">
            <SoftwareLogo src={a.logo_url} name={a.name} size={90} className="shadow-lg" />
            <span className="font-bold text-lg" style={{ color: colorA }}>{a.name}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-black text-muted-foreground shadow-inner">
            VS
          </div>
          <div className="flex flex-col items-center gap-3">
            <SoftwareLogo src={b.logo_url} name={b.name} size={90} className="shadow-lg" />
            <span className="font-bold text-lg" style={{ color: colorB }}>{b.name}</span>
          </div>
        </div>

        <h1 className="mx-auto max-w-3xl text-2xl font-bold text-foreground sm:text-4xl">
          {a.name} vs {b.name}: Which is Better?
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          We compare pricing, ratings and features side by side so you can choose with
          confidence.
        </p>
      </header>

      <ComparisonTable a={a} b={b} />

      <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
        <AffiliateCTAButton softwareId={a.id} label={`Visit ${a.name}`} size="lg" brandColor={colorA} />
        <AffiliateCTAButton softwareId={b.id} label={`Visit ${b.name}`} size="lg" brandColor={colorB} />
      </div>

      {comparison?.custom_verdict && (
        <section className="mx-auto mt-16 max-w-4xl rounded-2xl border bg-gradient-to-br from-white to-muted p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground border-b pb-4 mb-4">Our Final Verdict</h2>
          <div className="prose-content leading-8 text-lg text-foreground/90">
            {comparison.custom_verdict}
          </div>
        </section>
      )}
    </div>
  );
}
