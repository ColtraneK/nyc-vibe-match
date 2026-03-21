import type { Metadata } from "next";
import "./globals.css";
import NeighborhoodTicker from "@/components/NeighborhoodTicker";

export const metadata: Metadata = {
  title: "NYC Vibe Match - Find Your Perfect Neighborhood",
  description: "7 questions. Under a minute. Backed by real city data. Find your NYC neighborhood match.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "var(--bg)", color: "var(--t1)" }}>
        <NeighborhoodTicker />
        <div id="app-root" style={{ paddingTop: "28px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
