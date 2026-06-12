import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

export function StarRating({ rating, size = "md", className }: StarRatingProps) {
  const cls = sizes[size];
  return (
    <span className={cn("inline-flex items-center", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        if (rating >= n - 0.25) {
          return <Star key={n} className={cn(cls, "fill-star text-star")} />;
        }
        if (rating >= n - 0.75) {
          return (
            <span key={n} className="relative inline-flex">
              <Star className={cn(cls, "text-border")} />
              <StarHalf className={cn(cls, "absolute inset-0 fill-star text-star")} />
            </span>
          );
        }
        return <Star key={n} className={cn(cls, "text-border")} />;
      })}
    </span>
  );
}
