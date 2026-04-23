import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Hash-based anchors (#device, #compare, …) are sections of ONE page.
// Listing them as separate URLs confuses Google and causes "not indexed" errors.
// Only the canonical root URL belongs in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wildlink.ca",
      lastModified: new Date("2026-04-23"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
