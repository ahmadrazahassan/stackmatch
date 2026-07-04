"use client";

import { useState } from "react";
import { SoftwareLogo } from "./SoftwareLogo";
import { GlossyButton } from "./GlossyButton";
import { AffiliateDisclosureNote } from "./AffiliateDisclosureNote";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Category, Software } from "@/lib/types";
import { brandColorFor } from "@/lib/brandColors";

interface HomepageExploreProps {
  explorerData: {
    category: Category;
    software: Software[];
  }[];
}

export function HomepageExplore({ explorerData }: HomepageExploreProps) {
  const [activeTab, setActiveTab] = useState(explorerData[0]?.category.id || "");

  const activeData = explorerData.find((d) => d.category.id === activeTab);
  const activeSoftware = activeData?.software || [];
  const activeCategory = activeData?.category;

  return (
    <section id="explore" className="container-site py-24 border-t border-dashed border-zinc-200 dark:border-zinc-800">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span
          className="inline-flex items-center rounded-full border border-dashed px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-sm"
          style={{
            borderColor: `rgba(0, 168, 107, 0.25)`,
            boxShadow: `0 2px 10px -2px rgba(0, 168, 107, 0.1)`,
          }}
        >
          Explore Software
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl font-sans">
          Explore Popular Software Categories
        </h2>
        <p className="text-sm text-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
          Filter through the top business tools listed by category and check ratings, review sentiment, and pricing details.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-6">
        {explorerData.map((d) => {
          const isActive = d.category.id === activeTab;
          return (
            <button
              key={d.category.id}
              onClick={() => setActiveTab(d.category.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isActive
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent"
                }`}
            >
              {d.category.name}
            </button>
          );
        })}
      </div>

      {/* Software Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeSoftware.map((s) => {
          const brandColor = brandColorFor(s);

          // Determine highest rating factor for highlight text
          const ratings = [
            { label: "Value for Money", val: Number(s.value_for_money_rating) },
            { label: "Functionality", val: Number(s.functionality_rating) },
            { label: "Ease of Use", val: Number(s.ease_of_use_rating) },
            { label: "Customer Service", val: Number(s.customer_service_rating) },
          ];
          const bestRating = ratings.reduce((prev, current) => (prev.val > current.val ? prev : current), ratings[0]);
          const ratingFactor = bestRating.val > 0 ? bestRating.label : "overall satisfaction";

          // Simulate sentiment based on overall rating
          const r = Number(s.overall_rating) || 4.5;
          const positivePct = Math.round(Math.max(0, Math.min(100, (r - 1) * 25)));
          const negativePct = Math.round(Math.max(0, Math.min(100, (5 - r) * 5)));
          const neutralPct = 100 - positivePct - negativePct;

          return (
            <div
              key={s.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 font-sans shadow-[0_10px_30px_-18px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(0,0,0,0.28)]"
            >
              <div className="space-y-4">
                {/* Header: Logo, Name, Rating stars & badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <SoftwareLogo src={s.logo_url} name={s.name} size={60} className="rounded-xl shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-base truncate">{s.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-zinc-500 font-medium">
                        <span className="text-zinc-900 dark:text-zinc-50 font-bold">★ {formatRating(Number(s.overall_rating))}</span>
                        <span>({s.review_count})</span>
                      </div>
                    </div>
                  </div>
                  {Number(s.overall_rating) >= 4.5 && (
                    <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 px-2.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider shrink-0">
                      Top Rated
                    </span>
                  )}
                </div>

                {/* Highlight text */}
                <div className="bg-zinc-50/60 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-3.5">
                  <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-wider">Rating Highlight</p>
                  <p className="text-xs font-semibold text-zinc-705 dark:text-zinc-300 mt-1">
                    Highly rated for {ratingFactor} based on {s.review_count.toLocaleString("en-GB")} reviews.
                  </p>
                </div>

                {/* Sentiment Bar */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-650 dark:text-zinc-400">
                    <span>Review Sentiment</span>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <img className="inline-block h-5 w-5 rounded-full border border-white dark:border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=32&h=32&q=80" alt="" />
                      <img className="inline-block h-5 w-5 rounded-full border border-white dark:border-zinc-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32&q=80" alt="" />
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full flex bg-zinc-100 dark:bg-zinc-900">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${positivePct}%` }} />
                    <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${neutralPct}%` }} />
                    <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${negativePct}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                    <span>Positive {positivePct}%</span>
                    <span>Neutral {neutralPct}%</span>
                    <span>Negative {negativePct}%</span>
                  </div>
                </div>
              </div>

              {/* Price & Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-505 uppercase tracking-wider">Starting from</p>
                    <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
                      {s.starting_price !== null
                        ? formatPrice(s.starting_price, s.price_currency, s.billing_period)
                        : "Custom pricing"}
                    </p>
                  </div>
                  {s.free_trial && (
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${brandColor}15`,
                        color: brandColor
                      }}
                    >
                      Free Trial
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <GlossyButton href={`/software/${s.slug}`} label="View profile" variant="neutral" />
                  <GlossyButton
                    href={`/api/track-click?id=${s.id}`}
                    label="Visit Website"
                    variant="brand"
                    brandColor={brandColor}
                    external
                    rel="nofollow sponsored noopener"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeCategory && (
        <div className="mt-10 flex justify-center">
          <GlossyButton
            href={`/category/${activeCategory.slug}`}
            label={`Discover more ${activeCategory.name} solutions`}
            variant="neutral"
            fullWidth={false}
          />
        </div>
      )}

      <AffiliateDisclosureNote align="center" className="mt-8" />
    </section>
  );
}
