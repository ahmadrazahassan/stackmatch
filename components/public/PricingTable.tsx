import { Check } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatRating";
import type { PricingPlan } from "@/lib/types";

export function PricingTable({ plans, freeTrial }: { plans: PricingPlan[]; freeTrial: boolean }) {
  if (plans.length === 0) return null;
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <div key={i} className="rounded-lg border bg-white p-5 card-shadow">
            <h3 className="font-semibold text-foreground">{plan.name}</h3>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {Number(plan.price) === 0
                ? "Free"
                : formatPrice(plan.price, plan.currency, plan.billing)}
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.filter(Boolean).map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {freeTrial && (
        <p className="mt-4 rounded-md bg-brand-light px-4 py-3 text-sm font-medium text-brand-dark">
          ✓ Free trial available — try before you buy.
        </p>
      )}
    </div>
  );
}
