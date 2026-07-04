import type { Metadata } from "next";
import { Mail, Scale, TrendingUp, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { NewsletterForm } from "@/components/public/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the Stack Match newsletter for new UK business software reviews, comparison guides and pricing changes — no spam, unsubscribe any time.",
  alternates: { canonical: "/newsletter" },
};

const benefits = [
  {
    icon: Mail,
    title: "New reviews, as they publish",
    body: "Verified reviews from UK business owners on the accounting, payroll, HR and CRM tools you're evaluating.",
  },
  {
    icon: Scale,
    title: "Comparison guides",
    body: "Head-to-head breakdowns with a clear verdict, so you can shortlist faster instead of reading ten tabs.",
  },
  {
    icon: TrendingUp,
    title: "Pricing changes & deals",
    body: "We flag it when a vendor changes pricing, tiers or trial terms, so you're never caught out mid-contract.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="pb-28">
      <div className="container-site">
        <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
          <Breadcrumb items={[{ label: "Newsletter" }]} />
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            Newsletter
          </p>
          <h1 className="mt-3 max-w-2xl text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
            Software decisions, made easier
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            One newsletter, written for UK businesses choosing software. Pick what you want to hear
            about below — we'll only send what you ask for.
          </p>
        </div>
      </div>

      <div className="container-site mt-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-16 xl:gap-24">
          {/* Benefits */}
          <div className="max-w-[560px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              What you'll get
            </p>
            <div className="mt-6 space-y-8">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light">
                    <b.icon className="h-[18px] w-[18px] text-brand" />
                  </div>
                  <div>
                    <h2 className="text-[1.05rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                      {b.title}
                    </h2>
                    <p className="mt-1.5 text-[14.5px] leading-7 text-zinc-500 dark:text-zinc-400">
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="text-[13.5px] leading-6 text-zinc-500 dark:text-zinc-400">
                We only ever use your email to send what you've opted into. No third-party sharing, no
                selling data, no surprise marketing. Full detail in our{" "}
                <a href="/privacy-policy" className="font-medium text-brand underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Form card */}
          <aside className="mt-14 lg:mt-0">
            <div className="rounded-[24px] border border-zinc-200 bg-white p-8 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.22)] dark:border-zinc-800 dark:bg-zinc-950">
              <NewsletterForm variant="full" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
