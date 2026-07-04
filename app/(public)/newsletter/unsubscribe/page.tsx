import type { Metadata } from "next";
import { Breadcrumb } from "@/components/public/Breadcrumb";
import { NewsletterUnsubscribeForm } from "@/components/public/NewsletterUnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Unsubscribe from the Stack Match newsletter in one step, no login required.",
  robots: { index: false },
  alternates: { canonical: "/newsletter/unsubscribe" },
};

export default function UnsubscribePage() {
  return (
    <div className="container-site pb-28">
      <div className="border-b border-zinc-200 pb-11 pt-6 dark:border-zinc-800">
        <Breadcrumb items={[{ label: "Newsletter", href: "/newsletter" }, { label: "Unsubscribe" }]} />
        <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
          Newsletter
        </p>
        <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 font-heading sm:text-[2.65rem]">
          Unsubscribe
        </h1>
        <p className="mt-5 max-w-xl text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
          Sorry to see you go. Enter the email address you subscribed with and we'll remove it
          straight away — no login, no waiting.
        </p>
      </div>

      <div className="mt-14">
        <NewsletterUnsubscribeForm />
      </div>
    </div>
  );
}
