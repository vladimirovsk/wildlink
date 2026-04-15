import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WildLink.ca — Stay Connected Where Cell Towers Can't Reach",
  description:
    "Real-time group tracking on offline maps. No monthly fees. No cell service required. LoRa mesh tracking for hikers, skiers, and families in the Canadian Rockies.",
  keywords: "LoRa tracker, offline GPS, Canadian Rockies, hiking safety, mesh network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-forest text-alpine">{children}</body>
    </html>
  );
}
