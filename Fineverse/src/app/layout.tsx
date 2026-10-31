import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Fineverse — Electronics, Fashion & Toys",
    template: "%s | Fineverse",
  },
  description:
    "Fineverse is a premium destination for electronics, fashion, and toys — curated quality, fast delivery, and prices you'll love.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        {/*
          No server-fetched session here on purpose: auth() reads cookies(),
          which would force every page under this layout (including the
          static/ISR homepage) into fully dynamic rendering. SessionProvider
          bootstraps client-side instead — AccountMenu already renders a
          neutral placeholder during that brief "loading" status.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            <NuqsAdapter>
              <TooltipProvider delayDuration={150}>
                {children}
                <Toaster position="bottom-right" richColors closeButton />
              </TooltipProvider>
            </NuqsAdapter>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
