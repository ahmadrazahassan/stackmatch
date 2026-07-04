"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Loader2, MailQuestion, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendContactMessage, type ContactTopic } from "@/app/(public)/contact/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 2000;

const TOPICS: { value: ContactTopic; label: string; hint: string }[] = [
  {
    value: "vendor-listing",
    label: "List your software",
    hint: "Run a business software product? Tell us about it and we will take a look.",
  },
  {
    value: "review-submission",
    label: "Submit a review",
    hint: "Share your first-hand experience with a product. Genuine, honest reviews only.",
  },
  {
    value: "correction",
    label: "Report a correction",
    hint: "Spotted a price, feature or detail that is out of date? We will check it and put it right.",
  },
  {
    value: "partnership",
    label: "Partnerships & press",
    hint: "Advertising, partnership and media enquiries are all welcome.",
  },
  {
    value: "general",
    label: "Something else",
    hint: "Anything that does not fit the boxes above — a real person reads every message.",
  },
];

const inputStyles =
  "h-12 w-full rounded-xl border bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500"
    >
      {children}
    </label>
  );
}

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [topic, setTopic] = useState<ContactTopic>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const activeTopic = TOPICS.find((t) => t.value === topic)!;

  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `[${activeTopic.label}] Message from ${name || "the contact page"}`
  )}&body=${encodeURIComponent(message)}`;

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Tell us your name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (message.trim().length < 10) next.message = "Give us a little more detail — at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    let result: Awaited<ReturnType<typeof sendContactMessage>>;
    try {
      result = await sendContactMessage({
        name,
        email,
        topic,
        message,
        website,
        source: "/contact",
      });
    } catch {
      result = { ok: false, error: "Something went wrong sending your message.", mailtoFallback: true };
    } finally {
      setLoading(false);
    }

    if (!result.ok) {
      if (result.mailtoFallback) {
        setShowMailtoFallback(true);
        return;
      }
      toast.error(result.error);
      return;
    }

    toast.success("Message sent — we'll be in touch.");
    setSent(true);
  }

  /* ---------- Sent state ---------- */
  if (sent) {
    return (
      <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[28px] border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 ring-8 ring-brand/5">
          <Check className="h-7 w-7 text-brand" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-[1.45rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
          Message sent
        </h2>
        <p className="mt-2.5 max-w-sm text-[14.5px] leading-7 text-zinc-500 dark:text-zinc-400">
          Thanks {name.trim().split(" ")[0]} — a real person will reply to{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{email.trim()}</span> within
          two working days.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setMessage("");
          }}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-6 text-[13px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-9"
    >
      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        <span className="h-1.5 w-3.5 bg-brand" />
        Send a message
      </div>

      {/* ---------- Topic chips ---------- */}
      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
          What is it about?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = t.value === topic;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setTopic(t.value)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-[3px] transition-colors",
                    active ? "bg-brand" : "bg-zinc-200 dark:bg-zinc-800"
                  )}
                />
                {t.label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] leading-6 text-zinc-400 dark:text-zinc-500">{activeTopic.hint}</p>
      </div>

      {/* ---------- Fields ---------- */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="contact-name">Your name</FieldLabel>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: undefined }));
            }}
            placeholder="Alex Taylor"
            aria-invalid={!!errors.name}
            className={cn(inputStyles, errors.name ? "border-red-400" : "border-zinc-200 dark:border-zinc-800")}
          />
          {errors.name && <p className="text-xs font-medium text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="contact-email">Email address</FieldLabel>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            suppressHydrationWarning
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
            placeholder="you@company.co.uk"
            aria-invalid={!!errors.email}
            className={cn(inputStyles, errors.email ? "border-red-400" : "border-zinc-200 dark:border-zinc-800")}
          />
          {errors.email && <p className="text-xs font-medium text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-baseline justify-between">
          <FieldLabel htmlFor="contact-message">Your message</FieldLabel>
          <span
            className={cn(
              "text-[11px] font-medium tabular-nums",
              message.length > MESSAGE_MAX ? "text-red-500" : "text-zinc-300 dark:text-zinc-600"
            )}
          >
            {message.length.toLocaleString("en-GB")} / {MESSAGE_MAX.toLocaleString("en-GB")}
          </span>
        </div>
        <textarea
          id="contact-message"
          value={message}
          maxLength={MESSAGE_MAX}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((p) => ({ ...p, message: undefined }));
          }}
          placeholder="Hi Stack Match — tell us what's on your mind. The more detail, the faster we can help…"
          rows={5}
          aria-invalid={!!errors.message}
          className={cn(
            "w-full resize-none rounded-2xl border bg-white px-4 py-3.5 text-sm leading-6 text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600",
            errors.message ? "border-red-400" : "border-zinc-200 dark:border-zinc-800"
          )}
        />
        {errors.message && <p className="text-xs font-medium text-red-500">{errors.message}</p>}
      </div>

      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* ---------- Mailto fallback ---------- */}
      {showMailtoFallback && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
          <MailQuestion className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
          <p className="text-[13.5px] leading-6 text-zinc-600 dark:text-zinc-300">
            Our inbox form is briefly unavailable. Your message is ready to go —{" "}
            <a href={mailtoHref} className="font-semibold text-brand underline underline-offset-2">
              send it by email instead
            </a>{" "}
            and it will reach the same team.
          </p>
        </div>
      )}

      {/* ---------- Submit ---------- */}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={loading}
          className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-brand px-7 text-xs font-bold uppercase tracking-wider text-white transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.05] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in srgb, #00A86B, white 22%), #00A86B 46%, color-mix(in srgb, #00A86B, black 16%))",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 5px rgba(0,0,0,0.18), 0 10px 22px -8px #00A86B80, 0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/35 to-transparent"
          />
          <span className="relative z-10 inline-flex items-center gap-2.5">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Send className="h-3.5 w-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </span>
        </button>

        <p className="text-[12px] leading-5 text-zinc-400 dark:text-zinc-500">
          We only use your details to reply — see our{" "}
          <Link href="/privacy-policy" className="font-medium underline underline-offset-2 hover:text-brand">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
