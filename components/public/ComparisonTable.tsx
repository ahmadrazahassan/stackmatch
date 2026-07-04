"use client";

import { Check, X, Star, DollarSign, Activity, Users, Settings } from "lucide-react";
import { StarRating } from "./StarRating";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatPrice, formatRating } from "@/lib/utils/formatRating";
import type { Software } from "@/lib/types";
import { softwareBrandColors } from "@/lib/brandColors";
import Link from "next/link";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import React, { useEffect, useState } from "react";

function ScoreCell({ value, color }: { value: number; color?: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth((value / 5) * 100);
    }, 150);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-2">
      <span className="font-bold text-xl">{formatRating(value)}</span>
      <div className="h-2.5 w-32 overflow-hidden rounded-full bg-muted/60 shadow-inner">
        <div 
          className="h-full transition-all duration-1000 ease-out" 
          style={{ width: `${width}%`, backgroundColor: color || 'var(--color-brand)' }} 
        />
      </div>
    </div>
  );
}

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
      <Check className="h-5 w-5" />
    </span>
  ) : (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <X className="h-5 w-5" />
    </span>
  );
}

export function ComparisonTable({ a, b }: { a: Software; b: Software }) {
  const sections = [
    {
      title: "Overview",
      icon: <Activity className="h-5 w-5" />,
      rows: [
        {
          label: "Overall Rating",
          render: (s: Software) => (
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl font-black">{formatRating(Number(s.overall_rating))}</span>
              <StarRating rating={Number(s.overall_rating)} size="sm" />
              <span className="text-xs text-muted-foreground">{s.review_count.toLocaleString()} reviews</span>
            </div>
          ),
        },
        {
          label: "Best For",
          render: (s: Software) => (
            <span className="text-sm text-muted-foreground line-clamp-2 px-2">
              {s.description_short}
            </span>
          ),
        }
      ]
    },
    {
      title: "Pricing & Trials",
      icon: <DollarSign className="h-5 w-5" />,
      rows: [
        {
          label: "Starting Price",
          render: (s: Software) => (
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold" style={{ color: softwareBrandColors[s.slug] || 'var(--color-foreground)' }}>
                {s.starting_price !== null
                  ? formatPrice(s.starting_price, s.price_currency, s.billing_period)
                  : "Custom Quote"}
              </span>
            </div>
          ),
        },
        { label: "Free Trial", render: (s: Software) => <BoolCell value={s.free_trial} /> },
        { label: "Free Version", render: (s: Software) => <BoolCell value={s.free_version} /> },
      ]
    },
    {
      title: "User Ratings",
      icon: <Users className="h-5 w-5" />,
      rows: [
        { label: "Ease of Use", render: (s: Software) => <ScoreCell value={Number(s.ease_of_use_rating)} color={softwareBrandColors[s.slug]} /> },
        { label: "Value for Money", render: (s: Software) => <ScoreCell value={Number(s.value_for_money_rating)} color={softwareBrandColors[s.slug]} /> },
        { label: "Customer Service", render: (s: Software) => <ScoreCell value={Number(s.customer_service_rating)} color={softwareBrandColors[s.slug]} /> },
        { label: "Functionality", render: (s: Software) => <ScoreCell value={Number(s.functionality_rating)} color={softwareBrandColors[s.slug]} /> },
      ]
    },
    {
      title: "Features & Support",
      icon: <Settings className="h-5 w-5" />,
      rows: [
        {
          label: "Top Features",
          render: (s: Software) => (
            <ul className="space-y-2 text-left text-sm mx-auto max-w-[200px]">
              {(s.top_features as string[]).slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check 
                    className="mt-0.5 h-4 w-4 shrink-0" 
                    style={{ color: softwareBrandColors[s.slug] || 'var(--color-brand)' }} 
                  /> 
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>
          ),
        },
      ]
    }
  ];

  return (
    <div className="overflow-hidden rounded-2xl border bg-white card-shadow w-full mx-auto max-w-5xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-sm">
            <tr>
              <th className="w-[25%] px-8 py-8 text-left border-b border-r border-muted/50 align-bottom">
                <span className="text-xl font-bold text-foreground">Compare Features</span>
              </th>
              {[a, b].map((s) => {
                const color = softwareBrandColors[s.slug];
                return (
                  <th 
                    key={s.id} 
                    className="w-[37.5%] px-8 py-10 border-b border-t-4 bg-white/50 transition-colors hover:bg-white" 
                    style={{ borderTopColor: color || 'var(--color-muted)' }}
                  >
                    <div className="flex flex-col items-center gap-5">
                      <SoftwareLogo src={s.logo_url} name={s.name} size={96} className="shadow-md" />
                      <div className="text-center">
                        <Link href={`/software/${s.slug}`} className="font-extrabold text-2xl hover:underline transition-all" style={{ color: color }}>
                          {s.name}
                        </Link>
                      </div>
                      <AffiliateCTAButton softwareId={s.id} label="Visit Website" size="lg" brandColor={color} />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-muted/50">
            {sections.map((section) => (
              <React.Fragment key={section.title}>
                {/* Section Header */}
                <tr className="bg-muted/30">
                  <td colSpan={3} className="px-8 py-4 font-bold text-sm text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-2.5">
                      {section.icon} {section.title}
                    </div>
                  </td>
                </tr>
                {/* Section Rows */}
                {section.rows.map((row, index) => (
                  <tr key={row.label} className={`hover:bg-muted/10 transition-colors ${index === section.rows.length - 1 ? '' : 'border-b border-muted/30'}`}>
                    <td className="px-8 py-6 font-semibold text-foreground/80 border-r border-muted/50 align-middle text-base">
                      {row.label}
                    </td>
                    <td className="px-8 py-6 text-center align-middle border-r border-muted/50">
                      {row.render(a)}
                    </td>
                    <td className="px-8 py-6 text-center align-middle">
                      {row.render(b)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
