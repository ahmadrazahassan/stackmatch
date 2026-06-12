interface SentimentBarProps {
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

/** Sentiment derived from star ratings: 4-5★ positive, 3★ neutral, 1-2★ negative. */
export function SentimentBar({ distribution }: SentimentBarProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const positive = Math.round(((distribution[4] + distribution[5]) / total) * 100);
  const negative = Math.round(((distribution[1] + distribution[2]) / total) * 100);
  const neutral = 100 - positive - negative;

  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full">
        <div className="bg-success" style={{ width: `${positive}%` }} />
        <div className="bg-border" style={{ width: `${neutral}%` }} />
        <div className="bg-error" style={{ width: `${negative}%` }} />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-success">Positive {positive}%</span>
        </span>
        <span>Neutral {neutral}%</span>
        <span>
          <span className="font-semibold text-error">Negative {negative}%</span>
        </span>
      </div>
    </div>
  );
}
