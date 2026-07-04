import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/public/LegalLayout";

export const revalidate = 3600;

const UPDATED = "4 July 2026";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Stack Match researches, reviews, rates and maintains its software reviews, and the standards that keep our content independent and trustworthy.",
  alternates: { canonical: "/editorial-policy" },
};

const sections: LegalSection[] = [
  {
    id: "our-mission",
    title: "Our mission",
    body: (
      <>
        <p>
          Choosing business software is a decision that quietly shapes how much time a company spends on
          admin for years. Stack Match exists to make that decision easier and better informed for UK
          businesses, through reviews and comparisons that are genuinely useful, honest about
          trade-offs, and written by people who understand the products.
        </p>
        <p>
          This policy sets out the standards we hold ourselves to. If you ever feel we have fallen short
          of them, we want to hear about it.
        </p>
      </>
    ),
  },
  {
    id: "how-we-research",
    title: "How we research a product",
    body: (
      <>
        <p>
          Before we publish a review, we build a rounded picture of the product from several angles:
        </p>
        <ul>
          <li>
            hands on time with the product where possible, and close study of its features, pricing and
            documentation;
          </li>
          <li>
            the experiences of real users, drawn from verified reviews across the market, weighted
            toward the issues that come up repeatedly rather than one-off complaints;
          </li>
          <li>
            the specifics that matter to UK businesses, such as Making Tax Digital compliance, HMRC
            recognition, payroll and pension handling, and pound based pricing;
          </li>
          <li>how the product actually behaves for the kind of business it is aimed at.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-rate",
    title: "How we rate and score",
    body: (
      <>
        <p>
          Our ratings reflect a product on its merits, across the dimensions businesses tell us they
          care about most: ease of use, value for money, functionality and customer support. We weigh
          these against who the product is built for, because the right tool for a sole trader is rarely
          the right tool for a two hundred person finance team.
        </p>
        <p>
          A high score is earned, and so is a low one. We are comfortable rating a well known product
          below a lesser known rival when the evidence points that way, and we always explain the
          reasoning rather than leaving you with a number alone.
        </p>
      </>
    ),
  },
  {
    id: "independence",
    title: "Independence from commercial interests",
    body: (
      <>
        <p>
          Stack Match earns affiliate commissions, and we are open about it in our{" "}
          <a href="/affiliate-disclosure">Affiliate Disclosure</a>. What that money never buys is a
          verdict. Our editorial judgements are made independently of any commercial relationship, and a
          vendor cannot pay to be featured, ranked higher, or have criticism removed.
        </p>
        <p>
          Every review includes honest drawbacks and clear guidance on who a product does not suit. If a
          product is weak in an area that matters, we say so plainly, whatever our commercial
          relationship with the vendor.
        </p>
      </>
    ),
  },
  {
    id: "keeping-current",
    title: "Keeping content current",
    body: (
      <>
        <p>
          Software changes constantly, so a review is only useful if it is kept up to date. We revisit
          our content as products evolve, prices change and new features launch, and we update pricing,
          features and verdicts accordingly. Where a product improves, we say so. Where it slips, we say
          that too.
        </p>
        <p>
          Pricing shown on our site is a guide. Vendors change their pricing, and we always recommend
          confirming the current figure directly with the vendor before you buy.
        </p>
      </>
    ),
  },
  {
    id: "corrections",
    title: "Accuracy and corrections",
    body: (
      <>
        <p>
          We work hard to get the details right, but no publication is perfect. If you spot something
          inaccurate or out of date, whether you are a reader or a vendor, please tell us and we will
          check it and put it right promptly.
        </p>
        <p>
          You can reach the editorial team at{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a>. Corrections are made on
          their merits, never as a favour.
        </p>
      </>
    ),
  },
];

export default function EditorialPolicyPage() {
  return (
    <LegalLayout
      eyebrow="How we work"
      breadcrumbLabel="Editorial Policy"
      title="Editorial Policy"
      subtitle="How we research, review, rate and maintain our content, and the standards that keep Stack Match independent, accurate and genuinely useful."
      updated={UPDATED}
      sections={sections}
    />
  );
}
