import type { Metadata } from "next";
import "./globals.css";
import NeighborhoodTicker from "@/components/NeighborhoodTicker";
import ThemeToggle from "@/components/ThemeToggle";
import AmbientGlow from "@/components/AmbientGlow";

export const metadata: Metadata = {
  title: "NYC Vibe Match - Find Your Perfect Neighborhood",
  description: "7 questions. Under a minute. Backed by real city data. Find your NYC neighborhood match.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('nyc-theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ background: "var(--bg)", color: "var(--t1)" }}>
        <AmbientGlow />
        <NeighborhoodTicker />
        <div id="app-root" style={{ paddingTop: "28px" }}>
          {children}
        </div>
        <ThemeToggle />
      </body>
    </html>
  );
}
