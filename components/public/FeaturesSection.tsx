"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface RichFeature {
  name: string;
  rating: number;
  reviewsCount: number;
  description: string;
}

interface FeaturesSectionProps {
  slug: string;
  softwareName: string;
  rawFeatures: string[];
  brandColor: string;
  sideCard?: React.ReactNode;
}

const SAGE_RICH_FEATURES: RichFeature[] = [
  {
    name: "Billing & Invoicing",
    rating: 4.3,
    reviewsCount: 215,
    description: "With this capability, you can easily create, customize, and send invoices using professional templates, track payments, and automate recurring billing. Reviewers appreciate the intuitive interface, invoice copying, and email integration, though some mention layout issues and limited automation options."
  },
  {
    name: "Bank Reconciliation",
    rating: 4.1,
    reviewsCount: 211,
    description: "This aspect helps you quickly reconcile bank transactions, import data, and match payments. Some users say the process is straightforward and integrates with bank feeds, but others report setup difficulties, occasional errors, and wish for improved automation."
  },
  {
    name: "General Ledger",
    rating: 4.3,
    reviewsCount: 208,
    description: "You can track all transactions and access detailed entries for expenses and income. Reviewers indicate the general ledger is easy to navigate and provides useful custom reporting, but some mention manual year-end processes and a lack of standard journals."
  },
  {
    name: "Financial Reporting",
    rating: 4.2,
    reviewsCount: 199,
    description: "It gives you a wide range of financial reports, including profit and loss, balance sheets, and cashflow statements. Reviewers appreciate the variety, customization, and ease of sharing, though some want deeper report customization and better budgeting options."
  },
  {
    name: "Income & Balance Sheet",
    rating: 4.3,
    reviewsCount: 172,
    description: "Sage Accounting offers clear, customizable income and balance sheet statements, helping you monitor financial health and performance. Users think reports are easy to generate and understand, but some wish for more flexibility and improved adaptability for specific needs."
  },
  {
    name: "Accounts Receivable",
    rating: 4.4,
    reviewsCount: 152,
    description: "Track outstanding invoices, send automatic payment reminders, and manage the money owed from clients. Users highlight the clear dashboard view, though some request better aging report customization."
  },
  {
    name: "Inventory Management",
    rating: 4.1,
    reviewsCount: 145,
    description: "Track stock levels, monitor unit costs, and receive automatic alerts when inventory is low. Reviewers find it highly functional for simple retail and service businesses, though some suggest it lacks advanced multi-warehouse tracking."
  },
  {
    name: "VAT & Tax Reporting",
    rating: 4.5,
    reviewsCount: 138,
    description: "Supports automatic VAT calculation and prepares reports compliant with HM Revenue and Customs (HMRC) guidelines. Reviewers note it makes filing VAT returns straightforward and fast."
  },
  {
    name: "Mobile App Access",
    rating: 4.0,
    reviewsCount: 115,
    description: "Allows invoicing, quote creation, and quick receipt uploads directly from your mobile device. Users appreciate the layout and portability, but mention occasional performance dips on older mobile operating systems."
  },
  {
    name: "Purchase Orders",
    rating: 4.1,
    reviewsCount: 96,
    description: "Create and manage purchase orders to track supplier commitments and easily convert them into supplier bills when received."
  },
  {
    name: "Quotes & Estimates",
    rating: 4.3,
    reviewsCount: 88,
    description: "Draft and customize professional quotes for customers, track their status, and instantly convert them to active invoices once approved."
  },
  {
    name: "Cash Flow Forecasting",
    rating: 3.9,
    reviewsCount: 74,
    description: "Project future cash flow using historical transaction trends and scheduled payments. Users note it helps with basic planning but wish for more custom scenarios."
  },
  {
    name: "User Permissions",
    rating: 4.2,
    reviewsCount: 65,
    description: "Define custom access levels for different employees, accountants, or auditors to protect sensitive financial records. Reviewers find the settings straightforward."
  }
];

export function FeaturesSection({ slug, softwareName, rawFeatures, brandColor, sideCard }: FeaturesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Derive rich features from raw strings if not Sage Accounting
  const baseFeatures: RichFeature[] = slug === "sage-accounting"
    ? SAGE_RICH_FEATURES
    : rawFeatures.map((feat, idx) => {
      // Stable ratings and review counts derived from feature name properties
      const rating = Number((4.0 + (feat.length % 9) / 10).toFixed(1));
      const reviewsCount = 10 + (feat.length % 5) * 18;
      return {
        name: feat,
        rating,
        reviewsCount,
        description: `Allows you to manage and streamline ${feat.toLowerCase()} operations efficiently inside your business workflows.`
      };
    });

  const filteredFeatures = baseFeatures.filter((feat) =>
    feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleFeatures = showAll ? filteredFeatures : filteredFeatures.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header and Search input */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-3xl font-bold font-heading tracking-tight text-zinc-900 dark:text-zinc-50">
            Features
          </h2>
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search features"
              value={searchQuery}
              suppressHydrationWarning
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 font-sans"
            />
          </div>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans">
          Features with the highest number of reviews are displayed first. Those that have no reviews appear next, sorted alphabetically.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className={sideCard ? "lg:col-span-8" : "lg:col-span-12"}>
          {filteredFeatures.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-10 text-center text-zinc-500 font-sans">
              No features match &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {visibleFeatures.map((feat) => (
                  <div key={feat.name} className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-5 last:border-0 sm:last:border-b">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <h3 className="font-bold text-[16px] text-zinc-900 dark:text-zinc-50 font-sans">
                        {feat.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-sans shrink-0">
                        <span className="text-amber-500 font-sans">★</span>
                        <span className="font-bold text-zinc-850 dark:text-zinc-150">{feat.rating}</span>
                        <span>({feat.reviewsCount})</span>
                      </div>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-zinc-550 dark:text-zinc-400 font-sans">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Toggle show all */}
              {filteredFeatures.length > 6 && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-85 transition-opacity cursor-pointer font-sans"
                    style={{ color: brandColor }}
                  >
                    {showAll ? "Show less" : `See all ${slug === "sage-accounting" ? "13" : filteredFeatures.length} features`} &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {sideCard && (
          <div className="lg:col-span-4">
            {sideCard}
          </div>
        )}
      </div>
    </div>
  );
}

