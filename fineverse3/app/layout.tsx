import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";
import { SkipLink } from "@/components/layout/skip-link";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { getSearchIndex } from "@/lib/data";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    ...(siteConfig.seo.twitterHandle ? { creator: siteConfig.seo.twitterHandle } : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const searchEntries = await getSearchIndex();

  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Without JavaScript, scroll-reveal content must stay visible. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <SkipLink />
        <Providers searchEntries={searchEntries}>
          <div className="flex min-h-dvh flex-col">
            <AnnouncementBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}