import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { getSiteSettings } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Stack Match team about software listings, review verification, corrections, partnerships or press enquiries.",
  alternates: { canonical: "/contact" },
};

const reasons = [
  {
    tag: "Vendors",
    title: "List your software",
    body: "Run a business software product and want it reviewed and listed on Stack Match? Tell us about it and we will take a look.",
  },
  {
    tag: "Readers",
    title: "Submit a review",
    body: "Share your first-hand experience with a product for editorial verification. Genuine, honest reviews only.",
  },
  {
    tag: "Accuracy",
    title: "Corrections",
    body: "Spotted a price, feature or detail that is out of date? Let us know and we will check it and put it right.",
  },
  {
    tag: "Business",
    title: "Partnerships & press",
    body: "Advertising, partnership and media enquiries are all welcome. We reply to every genuine request we receive.",
  },
];

const details = [
  { label: "Response time", value: "Within two working days" },
  { label: "Based in", value: "London, United Kingdom" },
  { label: "Hours", value: "Monday to Friday, 9am to 5pm" },
];

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const email = settings.contact_email ?? "hello@stackmatch.uk";

  return (
    <div className="pb-28">
      {/* ---------- Header ---------- */}
      <div className="container-site">
        <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            Contact
          </p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
            Get in touch
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            Stack Match is editorially managed, so we handle everything by email. Choose the reason that
            fits and drop us a line, and a real person will get back to you.
          </p>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="container-site mt-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16 xl:gap-24">
          {/* Reasons */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              What can we help with
            </p>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="bg-white p-7 transition-colors hover:bg-zinc-50/70 dark:bg-zinc-950 dark:hover:bg-zinc-900/40"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {r.tag}
                  </span>
                  <h2 className="mt-3 text-[1.05rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                    {r.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-7 text-zinc-500 dark:text-zinc-400">{r.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13.5px] leading-7 text-zinc-400 dark:text-zinc-500">
              Please note we do not provide software support. For help with a specific product, contact
              the vendor directly. For how we handle your data, see our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Email + details */}
          <aside className="mt-12 lg:mt-0">
            <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                Email us
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-3 block break-words text-[1.3rem] font-semibold tracking-tight text-zinc-900 underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand dark:text-zinc-50 font-heading"
              >
                {email}
              </a>
              <p className="mt-3 text-[14px] leading-7 text-zinc-500 dark:text-zinc-400">
                One inbox for everything. We read every message.
              </p>

              <dl className="mt-8 space-y-5 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                {details.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
                      {d.label}
                    </dt>
                    <dd className="text-right text-[14px] font-medium text-zinc-700 dark:text-zinc-300">
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-zinc-900 transition-colors hover:text-brand dark:text-zinc-100"
              >
                About Stack Match
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
