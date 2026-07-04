"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { unsubscribeFromNewsletter } from "@/app/(public)/newsletter/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterUnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setFieldError("Enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setFieldError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    const result = await unsubscribeFromNewsletter(trimmed);
    setLoading(false);

    if (!result.ok) {
      setFieldError(result.error);
      toast.error(result.error);
      return;
    }

    if (result.alreadyUnsubscribed) {
      toast.info("That email is already unsubscribed.");
    } else {
      toast.success("You've been unsubscribed. Sorry to see you go.");
    }
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="text-[14.5px] leading-7 text-zinc-500 dark:text-zinc-400">
        You're unsubscribed — you won't hear from us again unless you subscribe again. Changed your
        mind?{" "}
        <button
          type="button"
          onClick={() => setDone(false)}
          className="font-medium text-brand underline underline-offset-2"
        >
          Unsubscribe a different email
        </button>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm">
      <label
        htmlFor="unsubscribe-email"
        className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500"
      >
        Email address
      </label>
      <input
        id="unsubscribe-email"
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
          "mt-2 h-12 w-full rounded-full border bg-white px-5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600",
          fieldError ? "border-red-400" : "border-zinc-200 dark:border-zinc-800"
        )}
      />
      {fieldError && <p className="mt-2 text-xs font-medium text-red-500">{fieldError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-700"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unsubscribe"}
      </button>
    </form>
  );
}
