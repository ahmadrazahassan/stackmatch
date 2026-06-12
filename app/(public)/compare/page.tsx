import type { Metadata } from "next";
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
    <div className="pb-16 bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 text-center border-b border-gray-100">
        <div className="container-site max-w-4xl">
          <Breadcrumb items={[{ label: "Compare" }]} />
          <h1 className="mt-8 text-4xl font-extrabold text-navy sm:text-5xl lg:text-6xl tracking-tight">
            Start a comprehensive <span className="relative inline-block text-navy after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-3 after:w-full after:bg-brand/30">head to head</span> product comparison
          </h1>
          <div className="mt-16">
            <CompareSelector softwareList={softwareList} />
          </div>
        </div>
      </section>

      {/* Popular Comparisons Grid */}
      <section className="container-site py-16">
        <h2 className="mb-10 text-3xl font-bold text-navy">Popular Comparisons</h2>
        {comparisons.length === 0 ? (
          <p className="rounded-[20px] border border-gray-200 bg-white p-12 text-center text-muted-foreground">
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

      {/* Framer-Inspired Editorial & Newsletter Section */}
      <section className="container-site py-20 border-t border-gray-100">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left side: Editorial (Bento Card) */}
          <div className="lg:col-span-7 rounded-[32px] bg-gray-50/50 p-10 md:p-14 border border-gray-100 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Compare software easily with CloudPayZA
            </h2>
            <div className="mt-8 space-y-6 text-[17px] text-gray-500 leading-relaxed font-light">
              <p>
                Choosing software is critical for SMBs—but challenging. With hundreds of options,
                comparing features, pricing, and deployment can be overwhelming. CloudPayZA's free
                comparison tool puts everything in one view.
              </p>
              
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 my-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand"></div>
                <p className="text-lg text-gray-800 font-medium leading-snug">
                  Nearly <span className="text-brand font-bold text-xl">48%</span> of SMBs say regrettable software purchases increased costs—the most common negative outcome cited in a recent survey.
                </p>
              </div>
              
              <p>
                Choosing the wrong software doesn't just waste time—it can lead to higher expenses,
                missed opportunities, and operational inefficiencies. We help you avoid these mistakes by making evaluations simple and transparent.
              </p>
            </div>
          </div>

          {/* Right side: Newsletter Bento Card */}
          <div className="lg:col-span-5 rounded-[32px] bg-white p-10 md:p-14 shadow-xl border border-gray-100 flex flex-col justify-center text-center relative overflow-hidden">
            {/* Subtle Brand Accent */}
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-br from-brand/5 to-transparent -z-10"></div>
            
            <div className="mx-auto w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Stay in the loop</h3>
            <p className="text-[17px] text-gray-500 mb-10 leading-relaxed font-light">
              Join thousands of South African SMBs. Get the latest software reviews, comparisons, and exclusive discounts delivered to your inbox.
            </p>
            
            <form className="w-full max-w-sm mx-auto space-y-4">
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                placeholder="name@company.com"
              />
              <button
                type="button"
                className="w-full rounded-2xl bg-brand py-4 text-[15px] font-bold text-navy transition-all hover:bg-brand-dark hover:shadow-lg hover:-translate-y-0.5"
              >
                Subscribe Now
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-400">
              No spam. Unsubscribe at any time.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
