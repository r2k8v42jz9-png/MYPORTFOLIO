import type { MetadataRoute } from "next";

const BASE = "https://saburov.site";
const LOCALES = ["ru", "en", "uz"];
const PAGES = ["", "/about", "/projects", "/projects/legalmasters", "/services", "/ai-agents", "/telegram-bots", "/pricing", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
