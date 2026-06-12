import Image from "next/image";
import { BadgeCheck, ThumbsUp, Plus, Minus } from "lucide-react";
import { StarRating } from "./StarRating";
import { formatDate } from "@/lib/utils/formatDate";
import type { Review } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ReviewCard({ review, vendorName, brandColor }: { review: Review; vendorName?: string | null; brandColor?: string }) {
  return (
    <article className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Side: Author and meta */}
        <div className="flex items-start gap-4">
          {review.reviewer_avatar_url ? (
            <Image
              src={review.reviewer_avatar_url}
              alt=""
              width={48}
              height={48}
              className="rounded-full border border-zinc-200 dark:border-zinc-800 object-cover shrink-0"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 font-bold text-zinc-500 text-lg">
              {review.reviewer_name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="flex flex-wrap items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-50">
              {review.reviewer_name}
              {review.verified_linkedin && (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200/80 dark:border-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:text-zinc-350">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                  {review.verified_badge ?? "Verified LinkedIn"}
                </span>
              )}
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              {[review.reviewer_job_title, review.reviewer_company].filter(Boolean).join(", ")}
            </p>
            
            {/* Metadata tags */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {review.reviewer_industry && (
                <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 font-sans">
                  {review.reviewer_industry}
                </span>
              )}
              {review.reviewer_company_size && (
                <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 font-sans">
                  {review.reviewer_company_size} employees
                </span>
              )}
              {review.reviewer_country && (
                <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 font-sans">
                  🇿🇦 {review.reviewer_country}
                </span>
              )}
              {review.used_for_duration && (
                <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 font-sans">
                  Used: {review.used_for_duration}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Rating scores */}
        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-4 md:p-3">
          <div className="flex items-center gap-2">
            <StarRating rating={review.overall_rating} size="md" />
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">{review.overall_rating}.0</span>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-505 font-medium">Reviewed on {formatDate(review.review_date)}</span>
        </div>
      </div>

      {/* Review Content */}
      <div className="mt-5 space-y-3">
        <h3 className="text-lg font-bold font-heading text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
          {review.review_title}
        </h3>
        {review.summary && (
          <p className="text-sm leading-relaxed text-zinc-650 dark:text-zinc-400 font-sans">
            {review.summary}
          </p>
        )}
      </div>

      {/* Detailed Ratings Breakdown */}
      {(review.ease_of_use || review.value_for_money || review.customer_service || review.functionality) && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 p-5 border border-zinc-200/50 dark:border-zinc-800/50">
          {review.ease_of_use && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-heading">Ease of use</span>
              <div className="flex items-center justify-between gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full animate-fill-bar"
                    style={{
                      width: `${(review.ease_of_use / 5) * 100}%`,
                      backgroundColor: brandColor || "#00A86B",
                    }}
                  />
                </div>
                <span className="text-xs font-black text-zinc-900 dark:text-zinc-100">{review.ease_of_use}.0</span>
              </div>
            </div>
          )}
          {review.customer_service && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-heading">Customer service</span>
              <div className="flex items-center justify-between gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full animate-fill-bar"
                    style={{
                      width: `${(review.customer_service / 5) * 100}%`,
                      backgroundColor: brandColor || "#00A86B",
                    }}
                  />
                </div>
                <span className="text-xs font-black text-zinc-900 dark:text-zinc-100">{review.customer_service}.0</span>
              </div>
            </div>
          )}
          {review.value_for_money && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-heading">Value for money</span>
              <div className="flex items-center justify-between gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full animate-fill-bar"
                    style={{
                      width: `${(review.value_for_money / 5) * 100}%`,
                      backgroundColor: brandColor || "#00A86B",
                    }}
                  />
                </div>
                <span className="text-xs font-black text-zinc-900 dark:text-zinc-100">{review.value_for_money}.0</span>
              </div>
            </div>
          )}
          {review.functionality && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-heading">Functionality</span>
              <div className="flex items-center justify-between gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full animate-fill-bar"
                    style={{
                      width: `${(review.functionality / 5) * 100}%`,
                      backgroundColor: brandColor || "#00A86B",
                    }}
                  />
                </div>
                <span className="text-xs font-black text-zinc-900 dark:text-zinc-100">{review.functionality}.0</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pros & Cons Section */}
      {(review.pros || review.cons) && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-5">
          {review.pros && (
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Plus className="h-3.5 w-3.5" /> Pros
              </span>
              <p className="text-sm leading-relaxed text-zinc-650 dark:text-zinc-300 font-sans">{review.pros}</p>
            </div>
          )}
          {review.cons && (
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                <Minus className="h-3.5 w-3.5" /> Cons
              </span>
              <p className="text-sm leading-relaxed text-zinc-650 dark:text-zinc-300 font-sans">{review.cons}</p>
            </div>
          )}
        </div>
      )}

      {/* Helpfulness Action */}
      <div className="mt-5 flex items-center justify-between border-t border-black/[0.04] dark:border-white/[0.04] pt-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          <ThumbsUp className="h-4 w-4 text-zinc-350" />
          Was this helpful? · {review.helpful_count}
        </div>
      </div>

      {/* Vendor Response */}
      {review.vendor_response && (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-5">
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2">
            <span className="h-1.5 w-3 bg-zinc-600 dark:bg-zinc-400" />
            {vendorName ?? "Vendor"} Response
            {review.vendor_response_date && (
              <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 normal-case">
                — responded on {formatDate(review.vendor_response_date)}
              </span>
            )}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-450 font-sans">{review.vendor_response}</p>
        </div>
      )}
    </article>
  );
}
