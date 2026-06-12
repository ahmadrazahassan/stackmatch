import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { getSiteSettings } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the CloudPayZA team — vendor listings, review submissions, corrections and partnership enquiries.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const email = settings.contact_email ?? "hello@cloudpayza.com";

  return (
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "Contact" }]} />
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          We don&apos;t accept public review submissions through the website — all content is
          editorially managed. For any of the following, email us directly and we&apos;ll get
          back to you:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Listing your software on CloudPayZA</li>
          <li>Submitting a review for editorial verification</li>
          <li>Corrections to pricing or product information</li>
          <li>Partnership and advertising enquiries</li>
        </ul>
        <a
          href={`mailto:${email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <Mail className="h-4 w-4" />
          {email}
        </a>
      </div>
    </div>
  );
}
