import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Devtools Playground",
  description: "Regex, cron, JSON, Base64, JWT ve daha fazlasını canlı test et.",
};

export const viewport: Viewport = {
  themeColor: "#0a0e10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${jetbrainsMono.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-mono">
        <div className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
            <div aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-green" />
            </div>
            <Link
              href="/"
              className="font-display text-xs tracking-tight text-muted transition-colors hover:text-ink"
            >
              devtools@playground:~
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
