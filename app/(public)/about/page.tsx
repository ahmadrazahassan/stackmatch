import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/public/Breadcrumb";

export const metadata: Metadata = {
  title: "About CloudPayZA",
  description:
    "CloudPayZA helps South African businesses find the right software through verified reviews, expert comparisons and unbiased ratings.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "About" }]} />
      <div className="mx-auto max-w-3xl py-6">
        <h1 className="text-3xl font-bold text-foreground">About CloudPayZA</h1>
        <div className="prose-content mt-6">
          <p>
            CloudPayZA is South Africa&apos;s business software review and comparison platform.
            We help SMB owners, accountants, payroll managers, HR professionals and finance
            directors make confident software decisions through verified reviews, expert
            comparisons and unbiased ratings.
          </p>
          <h2>What we do</h2>
          <ul>
            <li>
              <strong>In-depth software profiles</strong> — features, ZAR pricing, screenshots and
              vendor information for the tools South African businesses actually use.
            </li>
            <li>
              <strong>Verified user reviews</strong> — real experiences from real businesses,
              covering ease of use, value for money, support quality and functionality.
            </li>
            <li>
              <strong>Side-by-side comparisons</strong> — head-to-head breakdowns with clear
              verdicts, so you can shortlist faster.
            </li>
            <li>
              <strong>Expert guides</strong> — practical, SA-specific content on compliance,
              pricing and choosing software.
            </li>
          </ul>
          <h2>How we make money</h2>
          <p>
            Some links on CloudPayZA are affiliate links: if you visit a vendor through our site
            and sign up, we may earn a commission at no extra cost to you. Affiliate
            relationships never influence our ratings, which are calculated directly from user
            reviews.
          </p>
          <h2>List your software</h2>
          <p>
            Are you a software vendor serving the South African market?{" "}
            <Link href="/contact">Get in touch</Link> to list your product on CloudPayZA.
          </p>
        </div>
      </div>
    </div>
  );
}
