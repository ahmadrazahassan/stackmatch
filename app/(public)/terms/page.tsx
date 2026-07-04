import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/public/LegalLayout";

export const revalidate = 3600;

const UPDATED = "4 July 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of the Stack Match website, including acceptable use, affiliate links, intellectual property and liability.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          These terms and conditions (&quot;Terms&quot;) govern your use of the Stack Match website and
          the content and services we provide through it. By accessing or using the site, you agree to
          be bound by these Terms. If you do not agree with them, please do not use the site.
        </p>
        <p>
          We may update these Terms from time to time. The version published on this page is the one
          that applies, and continued use of the site after any change means you accept the revised
          Terms.
        </p>
      </>
    ),
  },
  {
    id: "about-content",
    title: "About our content",
    body: (
      <>
        <p>
          Stack Match publishes independent reviews, comparisons, ratings and guides about business
          software. Our content is provided for general information only. While we take real care to be
          accurate and fair, we make no guarantee that everything on the site is complete, current or
          free from error.
        </p>
        <ul>
          <li>
            Pricing, features and availability of the software we cover are set by the vendors and can
            change without notice. Always confirm the details directly with the vendor before making a
            purchase.
          </li>
          <li>
            Our reviews and verdicts are editorial opinion, formed in good faith. They are not
            professional, financial, legal or accounting advice.
          </li>
          <li>
            You are responsible for deciding whether any product is suitable for your own business
            needs.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "affiliate",
    title: "Affiliate relationships",
    body: (
      <>
        <p>
          Some of the links on Stack Match are affiliate links. If you click one and go on to buy a
          product, we may earn a commission from the vendor, at no additional cost to you. This is how
          we fund the site.
        </p>
        <p>
          Earning a commission never changes our editorial verdict. We rate and rank products on their
          merits, and our reviews are written independently of any commercial arrangement. You can read
          more in our <a href="/affiliate-disclosure">Affiliate Disclosure</a> and{" "}
          <a href="/editorial-policy">Editorial Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using the site, you agree not to:</p>
        <ul>
          <li>use it in any way that breaches applicable UK laws or regulations;</li>
          <li>
            attempt to gain unauthorised access to the site, its servers or any connected system;
          </li>
          <li>
            scrape, copy, republish or redistribute our content at scale without our written
            permission;
          </li>
          <li>
            introduce any malicious code, or otherwise interfere with the proper working of the site;
          </li>
          <li>
            submit false, misleading or defamatory information, including in any review or enquiry.
          </li>
        </ul>
        <p>
          We reserve the right to restrict or withdraw access to anyone who breaches these Terms.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          All content on Stack Match, including our written reviews, comparisons, guides, design,
          layout and branding, is owned by us or our licensors and is protected by intellectual
          property law. Product names, logos and trademarks belonging to the vendors we cover remain
          the property of their respective owners and are used for identification and editorial
          purposes only.
        </p>
        <p>
          You may view and share our content for your own personal, non-commercial use, and you may
          quote short extracts with clear attribution and a link back to the original page. Any other
          use requires our prior written consent.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third party websites",
    body: (
      <>
        <p>
          The site contains links to third party websites, including the vendors we review. We do not
          control those sites and are not responsible for their content, their products, or their
          privacy and security practices. Following a link to a third party site is at your own risk,
          and their terms and policies will apply to your use of them.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          The site and its content are provided on an &quot;as is&quot; and &quot;as available&quot;
          basis. To the fullest extent permitted by law, we exclude all warranties, express or
          implied, in relation to the site and its content.
        </p>
        <p>
          We will not be liable for any loss or damage arising from your use of, or reliance on, the
          site or its content, including any decision to purchase or not to purchase a product.
          Nothing in these Terms limits or excludes our liability where it would be unlawful to do so,
          including for death or personal injury caused by negligence, or for fraud.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <>
        <p>
          These Terms, and any dispute or claim arising out of or in connection with them, are governed
          by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction
          of the courts of England and Wales.
        </p>
        <p>
          If any part of these Terms is found to be unenforceable, the rest will continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>
          If you have any questions about these Terms, please get in touch at{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a> or through our{" "}
          <a href="/contact">contact page</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      breadcrumbLabel="Terms of Service"
      title="Terms of Service"
      subtitle="These terms set out the rules for using Stack Match, how our content should be treated, and the basis on which we provide our reviews and comparisons."
      updated={UPDATED}
      sections={sections}
    />
  );
}
