import Script from "next/script";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import {
  getCategories,
  getSiteSettings,
  getTopRatedSoftware,
} from "@/lib/supabase/queries";

export const revalidate = 3600;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, popularSoftware, settings] = await Promise.all([
    getCategories(8),
    getTopRatedSoftware(5),
    getSiteSettings(),
  ]);

  const gaId = settings.ga_tracking_id || process.env.NEXT_PUBLIC_GA_ID;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar contactEmail={settings.contact_email} />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} popularSoftware={popularSoftware} settings={settings} />
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
    </div>
  );
}
