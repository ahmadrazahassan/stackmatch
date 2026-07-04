import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { getSiteStats } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Stack Match",
  description:
    "Stack Match helps UK businesses find the right software through verified reviews, expert comparisons and genuinely independent ratings.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Independent by design",
    body: "We earn affiliate commissions, but they never buy a verdict. Products are rated on their merits, with honest drawbacks and clear guidance on who each one suits.",
  },
  {
    title: "Built on real evidence",
    body: "Our reviews draw on hands-on use and the experiences of real users, weighted toward the issues that come up again and again rather than one-off opinions.",
  },
  {
    title: "Kept up to date",
    body: "Software changes constantly, so we revisit pricing, features and verdicts as products evolve. Where a product improves we say so, and where it slips we say that too.",
  },
  {
    title: "Written for UK businesses",
    body: "From Making Tax Digital and HMRC recognition to pound based pricing, we focus on the details that actually matter to a business operating in the United Kingdom.",
  },
];

export default async function AboutPage() {
  const stats = await getSiteStats().catch(() => ({ software: 0, reviews: 0, categories: 0 }));

  const numbers = [
    { value: stats.software > 0 ? `${stats.software.toLocaleString("en-GB")}+` : "20+", label: "Products reviewed" },
    { value: stats.reviews > 0 ? `${stats.reviews.toLocaleString("en-GB")}+` : "1,000+", label: "Verified reviews" },
    { value: stats.categories > 0 ? `${stats.categories}` : "6", label: "Software categories" },
  ];

  return (
    <div className="pb-28">
      {/* ---------- Header ---------- */}
      <div className="container-site">
        <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
          <Breadcrumb items={[{ label: "About" }]} />
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            About us
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
            Helping UK businesses choose software with confidence
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            Stack Match is an independent review and comparison platform for business software. We cut
            through the marketing so you can find the accounting, payroll, HR and CRM tools that
            genuinely fit your business.
          </p>
        </div>
      </div>

      {/* ---------- Stats ---------- */}
      <div className="container-site">
        <dl className="grid grid-cols-1 divide-y divide-zinc-200 border-b border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {numbers.map((n) => (
            <div key={n.label} className="py-9 sm:px-8 sm:first:pl-0">
              <dd className="text-[2.4rem] font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                {n.value}
              </dd>
              <dt className="mt-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                {n.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- Body ---------- */}
      <div className="container-site mt-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <div className="hidden lg:block">
            <p className="sticky top-28 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Our approach
            </p>
          </div>

          <div className="max-w-[680px]">
            {/* Founder */}
            <div>
              <h2 className="text-[1.4rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                Who&apos;s behind Stack Match
              </h2>
              <div className="mt-5 flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-xl font-bold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                  ZU
                </div>
                <div className="space-y-4 text-[14.5px] leading-7 text-zinc-500 dark:text-zinc-400">
                  <p>
                    Stack Match is founded and run by{" "}
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-50">Zaid Umar</strong>.
                    Zaid has spent years working at the intersection of business operations and
                    software, helping UK companies choose, migrate to and get the most out of the tools
                    they run on. That work meant living inside accounting, payroll, HR and CRM platforms
                    day to day &mdash; and seeing, again and again, how much of the buying advice online is
                    thinly veiled marketing rather than honest guidance.
                  </p>
                  <p>
                    He started Stack Match to fix that: a genuinely independent place where a UK business
                    owner can compare software on the details that actually matter here &mdash; Making Tax
                    Digital, HMRC recognition, pound-based pricing and real user experience &mdash; without
                    wading through vendor spin. Zaid sets the site&apos;s editorial standards and
                    independence policy personally, and stands behind every review, rating and comparison
                    we publish.
                  </p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="legal-content mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800">
              <h2 className="mb-5 text-[1.4rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                Why we exist
              </h2>
              <p>
                Choosing business software is one of those decisions that quietly shapes how much time a
                company spends on admin for years afterwards. Get it right and it becomes invisible
                infrastructure you barely think about. Get it wrong and you are looking at a disruptive
                migration a year or two later.
              </p>
              <p>
                The trouble is that almost every product looks great in its own marketing. The
                differences that actually matter to your business are quieter, and they are hard to see
                from a pricing page. Stack Match exists to surface those differences, honestly and in
                plain language, so a UK business owner can make a confident choice without spending days
                on research.
              </p>
              <p>
                We are funded by affiliate commissions, and we are completely open about it. What that
                money never buys is a verdict. You will find genuine criticism, lower ratings and clear
                guidance to look elsewhere throughout our content, including for products we have a
                commercial relationship with. That independence is the whole point.
              </p>
            </div>

            {/* Values */}
            <div className="mt-14">
              <h2 className="text-[1.4rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                What we stand for
              </h2>
              <div className="mt-6 divide-y divide-zinc-100 dark:divide-zinc-900">
                {values.map((v, i) => (
                  <div key={v.title} className="flex gap-5 py-7 first:pt-0">
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                        {v.title}
                      </h3>
                      <p className="mt-2 text-[14.5px] leading-7 text-zinc-500 dark:text-zinc-400">
                        {v.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800">
              <h2 className="text-[1.4rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                Ready to find your next tool?
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
                Browse our reviews and side-by-side comparisons, or read more about how we work.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Link
                  href="/software"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Browse software reviews
                </Link>
                <Link
                  href="/editorial-policy"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-brand dark:text-zinc-100"
                >
                  How we review
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
