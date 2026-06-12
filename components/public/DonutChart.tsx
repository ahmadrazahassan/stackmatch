interface DonutChartProps {
  data: { label: string; value: number }[];
  /** Base hex color — segments are rendered in descending shades of it. */
  color: string;
  size?: number;
}

const SHADE_OPACITY = [1, 0.75, 0.55, 0.4, 0.28, 0.18];

/**
 * Capterra-style donut chart with legend. Pure SVG, server-renderable.
 * Values are normalised to percentages.
 */
export function DonutChart({ data, color, size = 150 }: DonutChartProps) {
  const total = data.reduce((a, d) => a + d.value, 0);
  if (total === 0) return null;

  const stroke = size * 0.16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;
  const segments = data.slice(0, 6).map((d, i) => {
    const frac = d.value / total;
    const seg = {
      ...d,
      pct: Math.round(frac * 100),
      dash: `${frac * c} ${c}`,
      offset: -offset,
      opacity: SHADE_OPACITY[i] ?? 0.15,
    };
    offset += frac * c;
    return seg;
  });

  return (
    <div className="flex items-center gap-5 min-w-0 w-full">
      <svg width={size} height={size} className="-rotate-90 shrink-0">
        {segments.map((s) => (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeOpacity={s.opacity}
            strokeWidth={stroke}
            strokeDasharray={s.dash}
            strokeDashoffset={s.offset}
          />
        ))}
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-start gap-2 text-xs font-semibold">
            <span
              className="h-2 w-2 shrink-0 rounded-full mt-1.5"
              style={{ backgroundColor: color, opacity: s.opacity }}
            />
            <span className="min-w-0 flex-1 text-zinc-600 dark:text-zinc-300 leading-snug">{s.label}</span>
            <span className="font-bold text-zinc-950 dark:text-zinc-50 shrink-0 ml-1">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
