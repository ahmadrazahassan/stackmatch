import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/public/LegalLayout";

export const revalidate = 3600;

const UPDATED = "4 July 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Stack Match collects, uses, stores and protects your personal data, and your rights under UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Stack Match (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) operates this website as an
          independent business software review and comparison platform for the United Kingdom. We
          publish editorial reviews, comparisons and guides covering accounting, payroll, HR, CRM and
          related software.
        </p>
        <p>
          For the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data
          Protection Act 2018, Stack Match is the data controller responsible for your personal data.
          If you have any questions about this policy or how we handle your information, you can reach
          us at <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "The information we collect",
    body: (
      <>
        <p>
          We aim to collect as little personal data as possible. The information we do collect falls
          into a few clear categories.
        </p>
        <h3>Information you give us</h3>
        <ul>
          <li>
            Your name and email address when you contact us, submit a review for editorial
            verification, or enquire about listing your software.
          </li>
          <li>
            Your email address, chosen topics and marketing consent when you subscribe to our
            newsletter, along with a hashed IP address and timestamp so we can demonstrate that
            consent was freely given. You can unsubscribe at any time via the link in every email or
            our <a href="/newsletter/unsubscribe">unsubscribe page</a>.
          </li>
          <li>Any details you choose to include in the body of an email or enquiry.</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            Standard technical data such as your IP address, browser type, device information and the
            pages you visit, collected through cookies and similar technologies.
          </li>
          <li>
            Aggregated, anonymised analytics about how visitors use the site, which never identifies
            you personally.
          </li>
        </ul>
        <p>
          We do not knowingly collect special category data (such as health, ethnicity or political
          views), and we do not collect information from anyone we know to be under the age of 16.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How and why we use your data",
    body: (
      <>
        <p>
          We only process your personal data where we have a lawful basis to do so under UK GDPR.
          In practice, that means one of the following.
        </p>
        <ul>
          <li>
            <strong>To respond to you.</strong> When you email or contact us, we use your details to
            reply and to keep a record of the correspondence. Lawful basis: legitimate interests.
          </li>
          <li>
            <strong>To operate and improve the site.</strong> We use technical and analytics data to
            keep the platform secure, fast and relevant. Lawful basis: legitimate interests.
          </li>
          <li>
            <strong>To send updates, where you ask us to.</strong> If you opt in to a newsletter, we
            use your email to send the content you requested. Lawful basis: consent, which you can
            withdraw at any time.
          </li>
          <li>
            <strong>To meet our legal obligations.</strong> We may process data where the law requires
            it, for example to respond to a valid request from a regulator. Lawful basis: legal
            obligation.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "affiliate",
    title: "Affiliate links and third parties",
    body: (
      <>
        <p>
          Stack Match is funded in part by affiliate commissions. When you click through to a software
          vendor from our site and go on to purchase, we may earn a referral fee at no extra cost to
          you. Following one of these links takes you to a third party website that operates under its
          own privacy policy, which we encourage you to read.
        </p>
        <p>
          We use a small number of trusted third party processors to run the site, which may process
          limited data on our behalf, including our hosting and infrastructure provider, our analytics
          provider, and email delivery services. Each is bound by contract to handle data securely and
          only on our instructions.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          We use cookies and similar technologies to make the site work, to remember your
          preferences and to understand how the platform is used. You are always in control of
          non-essential cookies and can manage or refuse them through your browser settings.
        </p>
        <p>
          For full detail on the specific cookies we use and how to control them, please see our{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your data",
    body: (
      <>
        <p>
          We keep personal data only for as long as we genuinely need it. Correspondence is kept for
          as long as needed to handle your enquiry and for a reasonable period afterwards for our own
          records. Newsletter subscriptions are kept until you unsubscribe. Analytics data is retained
          in aggregated form and is not tied to you as an individual.
        </p>
        <p>
          When data is no longer needed, we delete it or irreversibly anonymise it.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          Under UK data protection law you have a number of rights over your personal data. You have
          the right to:
        </p>
        <ul>
          <li>be informed about how your data is used, which this policy is designed to do;</li>
          <li>access the personal data we hold about you;</li>
          <li>have inaccurate data corrected;</li>
          <li>have your data erased, where there is no compelling reason to keep it;</li>
          <li>restrict or object to certain processing;</li>
          <li>data portability, where applicable;</li>
          <li>withdraw consent at any time, where we rely on consent.</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a>. We will respond within
          one month. There is normally no charge, and we will never make you jump through hoops to
          exercise a right that is yours.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we keep your data safe",
    body: (
      <>
        <p>
          We take the security of your data seriously and use appropriate technical and organisational
          measures to protect it, including encryption in transit, access controls and reputable
          infrastructure providers. No system can be guaranteed completely secure, but we work to
          reduce risk and to respond promptly should an issue ever arise.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints and contact",
    body: (
      <>
        <p>
          If you are unhappy with how we have handled your personal data, we would always prefer the
          chance to put things right, so please contact us first at{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a>.
        </p>
        <p>
          You also have the right to lodge a complaint with the Information Commissioner&apos;s Office
          (ICO), the UK supervisory authority for data protection, at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          .
        </p>
        <p>
          We may update this policy from time to time. When we do, we will revise the date at the top
          of this page, and any significant changes will be made clear.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      breadcrumbLabel="Privacy Policy"
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains what data we collect, why we collect it, and the rights you have under UK GDPR and the Data Protection Act 2018."
      updated={UPDATED}
      sections={sections}
    />
  );
}
