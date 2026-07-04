import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSoftwareBySlug } from "@/lib/supabase/queries";
import { ProfileShell } from "../../ProfileShell";
import { ReviewFormClient } from "./ReviewFormClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) return { title: "Software Not Found" };
  return {
    title: `Write a Review for ${software.name} — Stack Match`,
    description: `Submit your verified review and share your experience with ${software.name} for UK businesses.`,
    alternates: { canonical: `/software/${software.slug}/reviews/new` },
  };
}

export default async function WriteReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const software = await getSoftwareBySlug(slug);
  if (!software) notFound();

  return (
    <ProfileShell software={software} activeTab="reviews">
      <ReviewFormClient software={software} />
    </ProfileShell>
  );
}
