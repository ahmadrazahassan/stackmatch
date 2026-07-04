import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/public/LegalLayout";

export const revalidate = 3600;

const UPDATED = "4 July 2026";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How Stack Match earns money through affiliate links, and our commitment that commercial relationships never influence our independent reviews and ratings.",
  alternates: { canonical: "/affiliate-disclosure" },
};

const sections: LegalSection[] = [
  {
    id: "the-short-version",
    title: "The short version",
    body: (
      <>
        <p>
          Stack Match is free to use, and we keep it that way through affiliate commissions. When you
          click a link to a software vendor on our site and go on to sign up or buy, we may receive a
          referral fee. It costs you nothing extra, and it never buys a better review.
        </p>
        <p>
          We believe in being completely open about this, because trust is the only thing that makes a
          review platform worth reading.
        </p>
      </>
    ),
  },
  {
    id: "how-it-works",
    title: "How affiliate links work",
    body: (
      <>
        <p>
          Many of the vendors we cover run affiliate or referral programmes. When we link to a product,
          that link may carry a code that tells the vendor the visit came from us. If you then take an
          action the vendor rewards, such as starting a paid subscription, they pay us a commission.
        </p>
        <ul>
          <li>You always pay the same price you would pay going to the vendor directly.</li>
          <li>You are never charged anything by Stack Match.</li>
          <li>
            Whether or not a vendor has an affiliate programme has no bearing on whether we cover them
            or how we rate them.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "independence",
    title: "Our editorial independence",
    body: (
      <>
        <p>
          This is the part that matters most. Our reviews, ratings and verdicts are formed on the
          merits of each product, full stop. A commission does not move a product up a ranking, soften
          a criticism, or hide a weakness.
        </p>
        <p>
          You will find genuine drawbacks, honest &quot;who should look elsewhere&quot; guidance, and
          lower ratings throughout our content, including for products we have an affiliate
          relationship with. If a product is not the right fit for a particular business, we say so.
          Our commercial team and our editorial team work to that firewall deliberately.
        </p>
        <p>
          You can read more about how we research and score products in our{" "}
          <a href="/editorial-policy">Editorial Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "where-they-appear",
    title: "Where affiliate links appear",
    body: (
      <>
        <p>
          Affiliate links generally appear on the buttons and calls to action that take you to a
          vendor&apos;s website, such as &quot;Visit website&quot; or a pricing plan&apos;s sign up
          button. Ordinary links within our articles, and links between our own pages, are not
          affiliate links.
        </p>
        <p>
          Where a link is an affiliate link, it does not change your experience in any way beyond the
          referral being recorded.
        </p>
      </>
    ),
  },
  {
    id: "your-choice",
    title: "Your choice",
    body: (
      <>
        <p>
          You are never obliged to use our links. If you would prefer, you are completely free to
          navigate to any vendor directly. We are grateful when you do use our links, because it is what
          keeps our research free and independent, but the choice is always yours.
        </p>
        <p>
          If you have any questions about our affiliate relationships, we are happy to answer them at{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a>.
        </p>
      </>
    ),
  },
];

export default function AffiliateDisclosurePage() {
  return (
    <LegalLayout
      eyebrow="Transparency"
      breadcrumbLabel="Affiliate Disclosure"
      title="Affiliate Disclosure"
      subtitle="We make money through affiliate commissions, and we want you to know exactly how, so you can trust that our reviews are written for you and not for the vendors."
      updated={UPDATED}
      sections={sections}
    />
  );
}
