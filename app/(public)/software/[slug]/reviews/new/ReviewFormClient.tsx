"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronRight, PenTool, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { softwareBrandColors } from "@/lib/brandColors";
import { submitReview } from "./actions";
import type { Software } from "@/lib/types";

const INDUSTRIES = ["Accounting", "Finance", "Healthcare", "Construction", "Retail", "Manufacturing", "IT", "Education", "Legal", "Real Estate", "Mining", "NGO", "Other"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const COUNTRIES = ["South Africa", "Kenya", "Nigeria", "Ghana", "Egypt", "Other Africa", "United Kingdom", "United States"];
const DURATIONS = ["less than 6 months", "6-12 months", "1-2 years", "2+ years", "5+ years"];

interface ReviewFormClientProps {
  software: Software;
}

export function ReviewFormClient({ software }: ReviewFormClientProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const brandColor = softwareBrandColors[software.slug] ?? "#00A86B";

  const [form, setForm] = useState({
    reviewer_name: "",
    reviewer_job_title: "",
    reviewer_company: "",
    reviewer_industry: "",
    reviewer_company_size: "",
    reviewer_country: "South Africa",
    used_for_duration: "",
    overall_rating: 0,
    ease_of_use: null as number | null,
    value_for_money: null as number | null,
    customer_service: null as number | null,
    functionality: null as number | null,
    review_title: "",
    summary: "",
    pros: "",
    cons: "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.overall_rating < 1) {
      toast.error("Please provide an overall rating.");
      return;
    }
    if (!form.reviewer_name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!form.review_title.trim()) {
      toast.error("Please enter a review title.");
      return;
    }
    if (!form.summary.trim()) {
      toast.error("Please enter your review summary.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitReview(software.slug, form);
      if (result.ok) {
        setSuccess(true);
        toast.success("Review submitted and published successfully!");
      } else {
        toast.error(result.error || "Failed to submit review.");
      }
    } catch (err) {
      toast.error("An error occurred during submission.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-500 mb-8 animate-float">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-4xl">
          Thank you for your review!
        </h2>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-md mx-auto">
          Your verified review for <span className="font-semibold text-zinc-800 dark:text-zinc-200">{software.name}</span> has been successfully published on CloudPayZA.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/software/${software.slug}/reviews`}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform duration-200 active:scale-95 cursor-pointer font-sans"
            style={{
              backgroundColor: brandColor,
              boxShadow: `0 10px 20px -8px ${brandColor}77`,
            }}
          >
            View all {software.name} reviews
          </Link>
          <Link
            href={`/software/${software.slug}`}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-95 cursor-pointer font-sans"
          >
            Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 font-sans">
      {/* Breadcrumb Back Link */}
      <Link
        href={`/software/${software.slug}/reviews`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to reviews
      </Link>

      <div className="space-y-2 mb-8">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
        >
          <PenTool className="h-3.5 w-3.5" /> Write a review
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl font-heading">
          Share your experience with {software.name}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
          Help other South African businesses find the right software. Your review takes less than 3 minutes and must be based on your honest experiences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: RATINGS */}
        <div className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold">1</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg leading-none font-heading">Ratings breakdown</h3>
          </div>

          <div className="space-y-1">
            <PublicStarSelector
              label="Overall Rating"
              value={form.overall_rating}
              onChange={(v) => set("overall_rating", v || 0)}
              required
              brandColor={brandColor}
            />
            <PublicStarSelector
              label="Ease of Use (Optional)"
              value={form.ease_of_use}
              onChange={(v) => set("ease_of_use", v)}
              brandColor={brandColor}
            />
            <PublicStarSelector
              label="Value for Money (Optional)"
              value={form.value_for_money}
              onChange={(v) => set("value_for_money", v)}
              brandColor={brandColor}
            />
            <PublicStarSelector
              label="Customer Service (Optional)"
              value={form.customer_service}
              onChange={(v) => set("customer_service", v)}
              brandColor={brandColor}
            />
            <PublicStarSelector
              label="Functionality (Optional)"
              value={form.functionality}
              onChange={(v) => set("functionality", v)}
              brandColor={brandColor}
            />
          </div>
        </div>

        {/* SECTION 2: CONTENT */}
        <div className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold">2</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg leading-none font-heading">Review details</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review_title" className="font-bold text-zinc-800 dark:text-zinc-200">
              Review Title <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="review_title"
              placeholder='e.g., "Best cloud payroll platform for small business"'
              value={form.review_title}
              onChange={(e) => set("review_title", e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="font-bold text-zinc-800 dark:text-zinc-200">
              Review Summary <span className="text-rose-500">*</span>
            </Label>
            <Textarea
              id="summary"
              rows={4}
              placeholder="Provide a detailed description of your experience using this software. What did you use it for? How did it help your workflow?"
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 min-h-[120px] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pros" className="font-bold text-zinc-800 dark:text-zinc-200">Pros (Optional)</Label>
              <Textarea
                id="pros"
                rows={3}
                placeholder="What did you like most about the software?"
                value={form.pros}
                onChange={(e) => set("pros", e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 min-h-[90px] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cons" className="font-bold text-zinc-800 dark:text-zinc-200">Cons (Optional)</Label>
              <Textarea
                id="cons"
                rows={3}
                placeholder="What limitations or drawbacks did you encounter?"
                value={form.cons}
                onChange={(e) => set("cons", e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 min-h-[90px] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: REVIEWER DETAILS */}
        <div className="rounded-[20px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold">3</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg leading-none font-heading">About you</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reviewer_name" className="font-bold text-zinc-800 dark:text-zinc-200">
                Your Full Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="reviewer_name"
                placeholder="John Doe"
                value={form.reviewer_name}
                onChange={(e) => set("reviewer_name", e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewer_job_title" className="font-bold text-zinc-800 dark:text-zinc-200">Job Title (Optional)</Label>
              <Input
                id="reviewer_job_title"
                placeholder="e.g., Finance Manager"
                value={form.reviewer_job_title}
                onChange={(e) => set("reviewer_job_title", e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reviewer_company" className="font-bold text-zinc-800 dark:text-zinc-200">Company (Optional)</Label>
              <Input
                id="reviewer_company"
                placeholder="e.g., Acme Corp"
                value={form.reviewer_company}
                onChange={(e) => set("reviewer_company", e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-zinc-800 dark:text-zinc-200">Industry (Optional)</Label>
              <Select value={form.reviewer_industry} onValueChange={(v) => set("reviewer_industry", v)}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((x) => (
                    <SelectItem key={x} value={x}>{x}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-bold text-zinc-800 dark:text-zinc-200">Company Size (Optional)</Label>
              <Select value={form.reviewer_company_size} onValueChange={(v) => set("reviewer_company_size", v)}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((x) => (
                    <SelectItem key={x} value={x}>{x} employees</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-zinc-800 dark:text-zinc-200">Country (Optional)</Label>
              <Select value={form.reviewer_country} onValueChange={(v) => set("reviewer_country", v)}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((x) => (
                    <SelectItem key={x} value={x}>{x}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-zinc-800 dark:text-zinc-200 font-sans">How long have you used it? (Optional)</Label>
            <Select value={form.used_for_duration} onValueChange={(v) => set("used_for_duration", v)}>
              <SelectTrigger className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-auto focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-zinc-400 focus-visible:border-zinc-400">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((x) => (
                  <SelectItem key={x} value={x}>{x}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href={`/software/${software.slug}/reviews`}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-zinc-550 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors font-sans"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full text-white font-bold px-8 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer shadow-lg font-sans border-0"
            style={{
              backgroundColor: brandColor,
              boxShadow: `0 10px 20px -8px ${brandColor}77`,
            }}
          >
            {submitting ? "Submitting..." : (
              <>
                Submit Review <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function PublicStarSelector({
  value,
  onChange,
  label,
  required = false,
  brandColor = "#00a86b",
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  label: string;
  required?: boolean;
  brandColor?: string;
}) {
  const [hover, setHover] = useState<number>(0);
  const displayValue = hover || value || 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-dashed border-zinc-100 dark:border-zinc-900/40 last:border-0 gap-3">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200 font-sans">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
      </div>
      <div className="flex items-center gap-1 select-none">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(value === n && !required ? null : n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="p-1 transition-transform active:scale-95 cursor-pointer"
          >
            <Star
              className={cn(
                "h-6 w-6 transition-all duration-150",
                n <= displayValue 
                  ? "fill-star text-star scale-110 drop-shadow-[0_0_4px_rgba(245,166,35,0.4)]"
                  : "text-zinc-200 dark:text-zinc-800 hover:text-zinc-400 dark:hover:text-zinc-650"
              )}
            />
          </button>
        ))}
        {value ? (
          <span 
            className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-bold font-sans border"
            style={{ 
              borderColor: `${brandColor}20`,
              backgroundColor: `${brandColor}08`,
              color: brandColor
            }}
          >
            {value}/5
          </span>
        ) : (
          <span className="ml-3 text-xs text-zinc-400 dark:text-zinc-550 font-medium font-sans">
            Click to rate
          </span>
        )}
      </div>
    </div>
  );
}
