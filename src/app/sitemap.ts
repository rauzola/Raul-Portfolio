import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-16");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
