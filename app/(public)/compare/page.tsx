import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { getPublishedComparisons } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { ComparisonCard } from "@/components/public/ComparisonCard";
import { CompareSelector } from "@/components/public/CompareSelector";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Compare Business Software Side by Side",
  description:
    "Head-to-head software comparisons for South African businesses — pricing, ratings, features and expert verdicts.",
  alternates: { canonical: "/compare" },
};

export default async function CompareIndexPage() {
  const comparisons = await getPublishedComparisons();

  // Fetch software for the CompareSelector
  const supabase = await createClient();
  const { data: software } = await supabase
    .from("software")
    .select("id, name, slug, logo_url")
    .eq("status", "published")
    .order("name");

  const softwareList = software || [];

  return (
    <div className="pb-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Hero Section Card Container */}
      <section className="container-site py-12">
        <div className="rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-10 sm:p-16 text-center shadow-sm relative overflow-hidden">
          {/* Soft background glow circles for high-end feel */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 z-0" />

          {/* Background 3D Shape Cover */}
          <Image
            src="/pages/compare.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover opacity-90 pointer-events-none z-0"
          />

          {/* Translucent glass backdrop overlay for high text readability */}
          <div className="absolute inset-0 bg-white/75 dark:bg-zinc-950/80 backdrop-blur-[2px] z-0" />

          <div className="relative z-10 flex flex-col items-center">
            <Breadcrumb items={[{ label: "Compare" }]} />
            <span className="mt-6 inline-flex items-center rounded-full bg-brand/10 dark:bg-brand/20 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider">
              Product Comparisons
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl font-heading leading-tight max-w-4xl">
              Start a comprehensive <span className="relative inline-block text-zinc-900 dark:text-zinc-50 after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-3 after:w-full after:bg-brand/30">head to head</span> comparison
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base leading-relaxed">
              Compare features, ratings, prices, and side-by-side specs to choose the perfect tool for your business.
            </p>
            <div className="mt-10 w-full max-w-2xl">
              <CompareSelector softwareList={softwareList} />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Comparisons Grid */}
      <section className="container-site py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-3xl font-heading">
              Popular Comparisons
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Browse top trending head-to-head comparisons analyzed for South African businesses.
            </p>
          </div>
        </div>

        {comparisons.length === 0 ? (
          <p className="rounded-[24px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center text-zinc-500 dark:text-zinc-400 shadow-sm font-sans">
            Comparisons will appear here once published from the admin panel.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {comparisons.map((c) => (
              <ComparisonCard key={c.id} comparison={c} />
            ))}
          </div>
        )}
      </section>

      {/* Bento Grid Editorial & Newsletter Section */}
      <section className="container-site py-16 border-t border-dashed border-zinc-200 dark:border-zinc-800">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left side: Editorial (Bento Card) */}
          <div className="lg:col-span-7 rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Soft background glow circles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <span className="inline-flex self-start items-center rounded-full bg-brand/10 dark:bg-brand/20 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider mb-6">
              Why Compare?
            </span>
            
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight font-heading">
              Compare software easily with CloudPayZA
            </h2>
            <div className="mt-6 space-y-6 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              <p>
                Choosing software is critical for SMBs—but challenging. With hundreds of options,
                comparing features, pricing, and deployment can be overwhelming. CloudPayZA's free
                comparison tool puts everything in one view.
              </p>
              
              <div className="rounded-[20px] bg-white dark:bg-zinc-900 p-6 shadow-sm border border-dashed border-zinc-200 dark:border-zinc-800 my-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand"></div>
                <p className="text-base text-zinc-800 dark:text-zinc-200 font-semibold leading-relaxed">
                  Nearly <span className="text-brand font-bold text-lg">48%</span> of SMBs say regrettable software purchases increased costs—the most common negative outcome cited in a recent survey.
                </p>
              </div>
              
              <p>
                Choosing the wrong software doesn't just waste time—it can lead to higher expenses,
                missed opportunities, and operational inefficiencies. We help you avoid these mistakes by making evaluations simple and transparent.
              </p>
            </div>
          </div>

          {/* Right side: Newsletter Bento Card */}
          <div className="lg:col-span-5 rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 md:p-12 shadow-sm flex flex-col justify-center text-center relative overflow-hidden">
            {/* Subtle Brand Accent Gradient */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand/5 dark:from-brand/10 to-transparent -z-10"></div>
            
            <div className="mx-auto w-12 h-12 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mb-6 border border-dashed border-brand/35">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight font-heading mb-3">Stay in the loop</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-sans">
              Join thousands of South African SMBs. Get the latest software reviews, comparisons, and exclusive discounts delivered to your inbox.
            </p>
            
            <form className="w-full max-w-sm mx-auto space-y-3">
              <input
                type="email"
                required
                className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-5 py-3.5 text-xs font-semibold text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all shadow-inner"
                placeholder="name@company.com"
              />
              <button
                type="button"
                className="w-full rounded-full bg-brand py-3.5 text-xs font-bold text-navy transition-all duration-300 hover:bg-brand-dark hover:shadow-md hover:-translate-y-0.5"
              >
                Subscribe Now
              </button>
            </form>
            <p className="mt-4 text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
              No spam. Unsubscribe at any time.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
