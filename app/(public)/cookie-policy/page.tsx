import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/public/LegalLayout";

export const revalidate = 3600;

const UPDATED = "4 July 2026";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies Stack Match uses, why we use them, and how you can control or refuse cookies in line with UK PECR and GDPR requirements.",
  alternates: { canonical: "/cookie-policy" },
};

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    body: (
      <>
        <p>
          Cookies are small text files placed on your device when you visit a website. They are widely
          used to make sites work, to remember your preferences, and to give site owners information
          about how their pages are used. Similar technologies, such as pixels and local storage, work
          in comparable ways, and where we refer to &quot;cookies&quot; in this policy we mean all of
          them.
        </p>
        <p>
          This policy explains how Stack Match uses cookies, and how you can control them. It should be
          read alongside our <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "types",
    title: "The types of cookies we use",
    body: (
      <>
        <h3>Strictly necessary cookies</h3>
        <p>
          These make the site work and cannot be switched off. They handle things like page navigation,
          security and remembering your cookie choices. Because they are essential, they do not require
          your consent.
        </p>
        <h3>Preference cookies</h3>
        <p>
          These remember choices you make, such as your theme or display settings, so the site behaves
          the way you expect on your next visit.
        </p>
        <h3>Analytics cookies</h3>
        <p>
          These help us understand how visitors use the site, which pages are popular and where we can
          improve. The information is aggregated and does not identify you personally. We only set these
          with your consent.
        </p>
        <h3>Affiliate and referral cookies</h3>
        <p>
          When you click through to a software vendor from our site, that vendor may set a cookie so
          they can attribute a resulting sign up or purchase to us and pay any referral fee. These are
          set by the vendor, not by us, and are covered by the vendor&apos;s own cookie policy.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use cookies",
    body: (
      <>
        <p>We use cookies for a small number of clearly defined reasons:</p>
        <ul>
          <li>to keep the site secure and functioning correctly;</li>
          <li>to remember your preferences and settings;</li>
          <li>to measure and improve how the site performs;</li>
          <li>to support the affiliate model that funds our independent content.</li>
        </ul>
        <p>
          We do not use cookies to build advertising profiles about you, and we do not sell your data.
        </p>
      </>
    ),
  },
  {
    id: "control",
    title: "How to control cookies",
    body: (
      <>
        <p>
          You are always in control. When you first visit, you can accept or decline non-essential
          cookies, and you can change your mind at any time.
        </p>
        <p>
          You can also manage or delete cookies through your browser settings. Every major browser lets
          you view the cookies stored on your device, block cookies from specific sites, or clear them
          entirely. Please note that blocking strictly necessary cookies may stop parts of the site
          from working as intended.
        </p>
        <p>
          Guidance for the most common browsers is available in their own help centres, and the
          Information Commissioner&apos;s Office provides useful general guidance at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <>
        <p>
          As our site evolves, the cookies we use may change. We will keep this policy up to date and
          revise the date at the top of the page whenever we make a meaningful change. If you have any
          questions, contact us at{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a>.
        </p>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      breadcrumbLabel="Cookie Policy"
      title="Cookie Policy"
      subtitle="We use cookies sparingly and transparently. Here is exactly what we use, why, and how you stay in control of them."
      updated={UPDATED}
      sections={sections}
    />
  );
}
