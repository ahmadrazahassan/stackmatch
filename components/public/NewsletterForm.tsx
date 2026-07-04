"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Mail, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { subscribeToNewsletter } from "@/app/(public)/newsletter/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTEREST_OPTIONS = [
  { value: "reviews", label: "New reviews & ratings" },
  { value: "comparisons", label: "Comparison guides" },
  { value: "pricing", label: "Pricing changes & deals" },
];

interface NewsletterFormProps {
  variant?: "compact" | "full";
  className?: string;
}

export function NewsletterForm({ variant = "compact", className }: NewsletterFormProps) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>(INTEREST_OPTIONS.map((o) => o.value));
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState(false);
  const [done, setDone] = useState(false);

  const toggleInterest = (value: string) => {
    setInterests((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldError(null);
    setConsentError(false);

    const trimmed = email.trim();
    if (!trimmed) {
      setFieldError("Enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setFieldError("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setConsentError(true);
      toast.error("Please agree to receive emails to subscribe.");
      return;
    }

    setLoading(true);
    const result = await subscribeToNewsletter({
      email: trimmed,
      interests,
      consent,
      source: pathname || "/",
    });
    setLoading(false);

    if (!result.ok) {
      setFieldError(result.error);
      toast.error(result.error);
      return;
    }

    if (result.status === "new") {
      toast.success("You're subscribed — welcome to Stack Match.");
    } else if (result.status === "resubscribed") {
      toast.success("Welcome back — you've been resubscribed.");
    } else {
      toast.info("You're already on our list.");
    }

    setEmail("");
    setConsent(false);
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  }

  const consentLabel = (
    <span>
      I agree to receive Stack Match newsletter emails about UK business software. Unsubscribe any time
      — see our{" "}
      <Link
        href="/privacy-policy"
        className="font-medium underline underline-offset-2 hover:text-brand"
      >
        Privacy Policy
      </Link>
      .
    </span>
  );

  if (variant === "full") {
    return (
      <form onSubmit={handleSubmit} noValidate className={cn("w-full max-w-md", className)}>
        <div className="space-y-2">
          <label
            htmlFor="newsletter-email-full"
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500"
          >
            Email address
          </label>
          <input
            id="newsletter-email-full"
            type="email"
            autoComplete="email"
            suppressHydrationWarning
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError(null);
            }}
            placeholder="you@company.co.uk"
            aria-invalid={!!fieldError}
            className={cn(
              "h-12 w-full rounded-full border bg-white px-5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600",
              fieldError ? "border-red-400" : "border-zinc-200 dark:border-zinc-800"
            )}
          />
          {fieldError && <p className="text-xs font-medium text-red-500">{fieldError}</p>}
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
            What do you want to hear about?
          </p>
          {INTEREST_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5 text-[14px] text-zinc-700 dark:text-zinc-300"
            >
              <Checkbox checked={interests.includes(opt.value)} onCheckedChange={() => toggleInterest(opt.value)} />
              {opt.label}
            </label>
          ))}
        </div>

        <label className="mt-6 flex items-start gap-2.5 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          <Checkbox
            checked={consent}
            onCheckedChange={(v) => {
              setConsent(!!v);
              setConsentError(false);
            }}
            aria-invalid={consentError}
            className="mt-0.5"
          />
          {consentLabel}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : done ? (
            <Check className="h-4 w-4" />
          ) : (
            "Subscribe to the newsletter"
          )}
        </button>

        <p className="mt-3 text-center text-[12px] text-zinc-400 dark:text-zinc-600">
          One email at a time. No spam, ever. Unsubscribe with one click.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="email"
            autoComplete="email"
            suppressHydrationWarning
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError(null);
            }}
            placeholder="you@company.co.uk"
            aria-invalid={!!fieldError}
            aria-label="Email address"
            className={cn(
              "h-11 w-full rounded-full border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30",
              fieldError ? "border-red-500/70" : "border-white/15"
            )}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : done ? (
            <Check className="h-4 w-4" />
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {fieldError && <p className="mt-2 text-xs font-medium text-red-400">{fieldError}</p>}

      <label className="mt-3 flex items-start gap-2 text-[12px] leading-relaxed text-zinc-500">
        <Checkbox
          checked={consent}
          onCheckedChange={(v) => {
            setConsent(!!v);
            setConsentError(false);
          }}
          aria-invalid={consentError}
          className="mt-0.5 border-zinc-600"
        />
        {consentLabel}
      </label>
    </form>
  );
}
