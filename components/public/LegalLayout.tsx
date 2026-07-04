import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
  contactEmail?: string;
  breadcrumbLabel: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Editorial, document-style layout for policy and legal pages. Restrained
 * typography, a sticky numbered table of contents and hairline section rules,
 * in the manner of a serious finance company's legal centre. No decorative
 * backgrounds, gradients or icon chips.
 */
export function LegalLayout({
  eyebrow,
  title,
  subtitle,
  updated,
  sections,
  contactEmail = "hello@stackmatch.uk",
  breadcrumbLabel,
}: LegalLayoutProps) {
  return (
    <div className="pb-28">
      {/* ---------- Header ---------- */}
      <div className="container-site">
        <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
          <Breadcrumb items={[{ label: breadcrumbLabel }]} />
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
          <p className="mt-7 text-[13px] font-medium text-zinc-400 dark:text-zinc-500">
            Effective {updated}
          </p>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="container-site mt-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          {/* Contents */}
          <aside className="hidden lg:block">
            <nav aria-label="Contents" className="sticky top-28">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                Contents
              </p>
              <ol className="space-y-3.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex gap-3 text-[13.5px] leading-5 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      <span className="shrink-0 tabular-nums text-zinc-300 transition-colors group-hover:text-brand dark:text-zinc-600">
                        {pad(i + 1)}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Content column */}
          <div className="max-w-[680px]">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 py-11 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-brand">
                      {pad(i + 1)}
                    </span>
                    <h2 className="text-[1.4rem] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 font-heading">
                      {s.title}
                    </h2>
                  </div>
                  <div className="legal-content mt-5 sm:pl-9">{s.body}</div>
                </section>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-12 border-t border-zinc-200 pt-9 dark:border-zinc-800">
              <p className="text-[15px] leading-7 text-zinc-600 dark:text-zinc-300">
                Have a question about this page? Email{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
                >
                  {contactEmail}
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
                >
                  contact page
                </Link>
                . We reply within two working days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
