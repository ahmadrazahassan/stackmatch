import { CheckCircle2 } from "lucide-react";

export function FeatureChecklist({ features, brandColor }: { features: string[], brandColor?: string }) {
  if (features.length === 0) return null;
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brandColor || 'var(--color-brand)' }} />
          {f}
        </li>
      ))}
    </ul>
  );
}
