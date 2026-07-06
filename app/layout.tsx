import type { Metadata } from "next";
import { Inter, Inter_Tight, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stack Match — The UK's #1 Business Software Reviews Platform",
    template: "%s — Stack Match",
  },
  description:
    "Discover verified reviews, expert comparisons, and unbiased ratings to make confident software decisions for your UK business.",
  openGraph: {
    siteName: "Stack Match",
    locale: "en_GB",
    type: "website",
  },
  other: {
    "impact-site-verification": "7f618d94-5ff0-4763-bb59-559f0fd353de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${interTight.variable} ${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        {/* impact.com site verification expects their exact nonstandard value= attribute;
            React 19 hoists this into <head> during SSR. */}
        <meta name="impact-site-verification" {...{ value: "7f618d94-5ff0-4763-bb59-559f0fd353de" }} />
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}

