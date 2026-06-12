import type { Metadata } from "next";
import { Inter, Inter_Tight, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudpayza.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CloudPayZA — South Africa's #1 Business Software Reviews Platform",
    template: "%s — CloudPayZA",
  },
  description:
    "Discover verified reviews, expert comparisons, and unbiased ratings to make confident software decisions for your South African business.",
  openGraph: {
    siteName: "CloudPayZA",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${interTight.variable} ${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

