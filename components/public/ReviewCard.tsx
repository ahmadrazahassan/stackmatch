import Image from "next/image";
import { BadgeCheck, ThumbsUp } from "lucide-react";
import { StarRating } from "./StarRating";
import { formatDate } from "@/lib/utils/formatDate";
import type { Review } from "@/lib/types";

export function ReviewCard({ review, vendorName }: { review: Review; vendorName?: string | null }) {
  return (
    <article className="rounded-lg border bg-white p-6 card-shadow">
      <div className="flex items-start gap-4">
        {review.reviewer_avatar_url ? (
          <Image
            src={review.reviewer_avatar_url}
            alt=""
            width={44}
            height={44}
            className="rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light font-semibold text-brand">
            {review.reviewer_name.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
            {review.reviewer_name}
            {review.verified_linkedin && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2 py-0.5 text-xs font-medium text-brand-dark">
                <BadgeCheck className="h-3.5 w-3.5" />
                {review.verified_badge ?? "Verified LinkedIn User"}
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {[review.reviewer_job_title, review.reviewer_company].filter(Boolean).join(", ")}
          </p>
          <p className="text-xs text-muted-foreground">
            {[
              review.reviewer_industry,
              review.reviewer_company_size && `${review.reviewer_company_size} employees`,
              review.reviewer_country && `🇿🇦 ${review.reviewer_country}`.replace(
                "🇿🇦",
                review.reviewer_country === "South Africa" ? "🇿🇦" : "🌍"
              ),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {review.used_for_duration && (
            <p className="mt-1 text-xs text-muted-foreground">
              Used the software for: <span className="font-medium">{review.used_for_duration}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <StarRating rating={review.overall_rating} size="sm" />
        <span className="text-sm font-semibold">{review.overall_rating}.0</span>
        <span className="text-sm text-muted-foreground">{formatDate(review.review_date)}</span>
      </div>

      <h3 className="mt-2 text-lg font-bold text-foreground">{review.review_title}</h3>
      {review.summary && <p className="mt-2 text-sm leading-6 text-muted-foreground">{review.summary}</p>}

      {review.pros && (
        <p className="mt-3 text-sm leading-6">
          <span className="font-semibold text-success">✅ Pros: </span>
          <span className="text-foreground">{review.pros}</span>
        </p>
      )}
      {review.cons && (
        <p className="mt-2 text-sm leading-6">
          <span className="font-semibold text-warning">⚠️ Cons: </span>
          <span className="text-foreground">{review.cons}</span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <ThumbsUp className="h-4 w-4" />
        Was this helpful? · {review.helpful_count}
      </div>

      {review.vendor_response && (
        <div className="mt-4 rounded-md border-l-4 border-border bg-muted p-4">
          <p className="text-sm font-semibold text-foreground">
            {vendorName ?? "Vendor"} Response
            {review.vendor_response_date && (
              <span className="ml-2 font-normal text-muted-foreground">
                — {formatDate(review.vendor_response_date)}
              </span>
            )}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{review.vendor_response}</p>
        </div>
      )}
    </article>
  );
}
