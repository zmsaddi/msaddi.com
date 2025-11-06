import { NextResponse } from "next/server";
import { env } from "@/lib/env";

/**
 * Sitemap Index - Points to language-specific sitemaps
 * This improves crawl efficiency for multi-language sites
 *
 * Google recommends using sitemap index for sites with:
 * - Multiple languages
 * - Large number of URLs
 * - Logical grouping of content
 */
export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const languages = ["en", "ar", "tr", "fr", "de", "es", "it", "nl", "pt"];
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main comprehensive sitemap (all languages) -->
  <sitemap>
    <loc>${baseUrl}/api/sitemap</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>

  <!-- Language-specific sitemaps for better crawl efficiency -->
  ${languages
    .map(
      (lang) => `
  <sitemap>
    <loc>${baseUrl}/api/sitemap/${lang}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
    )
    .join("")}
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
