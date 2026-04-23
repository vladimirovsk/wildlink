import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://wildlink.ca";
const OG_IMAGE = `${SITE_URL}/images/peyto-lake.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "WildLink — Stay Connected Off the Grid | Canadian Rockies",
    template: "%s | WildLink",
  },
  description:
    "WildLink is a LoRa mesh tracking device for hikers, skiers, and families in the Canadian Rockies. Real-time group tracking on offline maps — no cell service, no monthly fees.",
  keywords: [
    "LoRa tracker",
    "offline GPS",
    "mesh network tracker",
    "backcountry safety",
    "Canadian Rockies hiking",
    "off-grid communication",
    "satellite alternative",
    "family tracking device",
    "WildLink",
  ],
  authors: [{ name: "WildLink", url: SITE_URL }],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "WildLink",
    title: "WildLink — Stay Connected Off the Grid",
    description:
      "Real-time group tracking on offline maps. No monthly fees. No cell service required. LoRa mesh tracking for hikers and families in the Canadian Rockies.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 800,
        alt: "Peyto Lake, Banff National Park — WildLink tracking territory",
      },
    ],
    locale: "en_CA",
  },

  twitter: {
    card: "summary_large_image",
    title: "WildLink — Stay Connected Off the Grid",
    description:
      "LoRa mesh tracker for the Canadian Rockies. No cell service required.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "WildLink",
      description:
        "LoRa mesh tracking device for off-grid adventures in the Canadian Rockies.",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "WildLink",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
      sameAs: [],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "WildLink — Stay Connected Off the Grid",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
      },
      description:
        "Real-time group tracking on offline maps with WildLink LoRa mesh device. No monthly fees. No cell service required.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
    },
    {
      "@type": "Product",
      name: "WildLink LoRa Mesh Tracker",
      description:
        "A compact LoRa mesh tracking device for hikers, skiers, and families. Enables real-time location sharing on offline maps without cell service or monthly fees.",
      brand: { "@type": "Brand", name: "WildLink" },
      url: SITE_URL,
      image: OG_IMAGE,
      category: "GPS & Navigation",
      audience: {
        "@type": "Audience",
        audienceType: "Hikers, skiers, backcountry travelers, families",
      },
      areaServed: {
        "@type": "Place",
        name: "Canadian Rockies",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-forest text-alpine">
        {children}
      </body>
    </html>
  );
}
