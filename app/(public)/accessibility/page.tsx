import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/public/LegalLayout";

export const revalidate = 3600;

const UPDATED = "4 July 2026";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Stack Match is committed to making its website accessible to everyone, in line with WCAG 2.1 AA guidelines. Here is where we stand and how to give feedback.",
  alternates: { canonical: "/accessibility" },
};

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our commitment",
    body: (
      <>
        <p>
          Stack Match is committed to making its website usable by as many people as possible,
          regardless of ability or the technology they use. We believe good information about business
          software should be available to everyone, and accessibility is part of how we build the site,
          not an afterthought.
        </p>
        <p>
          We aim to meet the internationally recognised Web Content Accessibility Guidelines (WCAG) 2.1
          at level AA.
        </p>
      </>
    ),
  },
  {
    id: "what-we-do",
    title: "What we do to support accessibility",
    body: (
      <>
        <p>
          We design and build the site with accessibility in mind, including:
        </p>
        <ul>
          <li>clear, readable typography and comfortable spacing;</li>
          <li>sufficient colour contrast between text and its background;</li>
          <li>semantic, well-structured HTML that works with screen readers;</li>
          <li>keyboard navigability, so the site can be used without a mouse;</li>
          <li>descriptive text alternatives for meaningful images and logos;</li>
          <li>a responsive layout that adapts to different devices and zoom levels.</li>
        </ul>
      </>
    ),
  },
  {
    id: "known-limitations",
    title: "Known limitations",
    body: (
      <>
        <p>
          Accessibility is an ongoing effort rather than a finished state. Some areas of the site,
          particularly interactive charts and third party content we link to, may not yet fully meet
          every guideline. We are aware of this and continue to improve, and where a chart conveys
          important information we also present it in text.
        </p>
        <p>
          Please also note that when you follow a link to a software vendor, you leave our site and the
          accessibility of that destination is outside our control.
        </p>
      </>
    ),
  },
  {
    id: "feedback",
    title: "Feedback and help",
    body: (
      <>
        <p>
          If you encounter any barrier using our site, or you need information from Stack Match in a
          different format, we want to know. Your feedback helps us improve for everyone.
        </p>
        <p>
          Please contact us at{" "}
          <a href="mailto:hello@stackmatch.uk">hello@stackmatch.uk</a> with details of the issue
          and the page it relates to, and we will do our best to help and to put things right.
        </p>
      </>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalLayout
      eyebrow="Company"
      breadcrumbLabel="Accessibility"
      title="Accessibility Statement"
      subtitle="We want everyone to be able to use Stack Match. This statement explains our approach, where we stand against WCAG 2.1 AA, and how to give us feedback."
      updated={UPDATED}
      sections={sections}
    />
  );
}
