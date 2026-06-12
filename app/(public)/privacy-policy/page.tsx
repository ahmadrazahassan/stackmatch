import type { Metadata } from "next";
import { Breadcrumb } from "@/components/public/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CloudPayZA collects, uses and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-site pb-12">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <div className="mx-auto max-w-3xl py-6">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <div className="prose-content mt-6">
          <p>
            <em>Last updated: June 2026</em>
          </p>
          <p>
            CloudPayZA (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
            explains what information we collect when you use cloudpayza.com and how we use it,
            in line with the Protection of Personal Information Act (POPIA).
          </p>
          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Usage data</strong> — pages visited, referring site and approximate
              location, collected via analytics cookies to improve the site.
            </li>
            <li>
              <strong>Click data</strong> — when you click a &ldquo;Visit Website&rdquo; button we
              record the click with a hashed (anonymised) IP address, browser user-agent and
              referring page so we can measure partner traffic. We cannot identify you from this
              data.
            </li>
            <li>
              <strong>Correspondence</strong> — if you email us, we keep the correspondence to
              respond to you.
            </li>
          </ul>
          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We do not sell personal information.</li>
            <li>We do not run public accounts — there is nothing to sign up for.</li>
            <li>We do not store raw IP addresses with click events.</li>
          </ul>
          <h2>Affiliate disclosure</h2>
          <p>
            Some outbound links are affiliate links. If you purchase software after clicking one,
            we may earn a commission at no cost to you. This never affects ratings, which are
            computed from user reviews.
          </p>
          <h2>Cookies</h2>
          <p>
            We use essential cookies for site functionality and analytics cookies (Google
            Analytics) to understand usage. You can block cookies in your browser settings.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy or your data? Email us via the contact page and we will
            respond within a reasonable time.
          </p>
        </div>
      </div>
    </div>
  );
}
