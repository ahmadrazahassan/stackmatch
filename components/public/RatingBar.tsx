import { formatRating } from "@/lib/utils/formatRating";

interface RatingBarProps {
  label: string;
  value: number;
}

export function RatingBar({ label, value }: RatingBarProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-36 shrink-0 text-muted-foreground">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand"
          style={{ width: `${Math.min(100, (value / 5) * 100)}%` }}
        />
      </div>
      <span className="w-8 text-right font-semibold">{formatRating(value)}</span>
    </div>
  );
}
