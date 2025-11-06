import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { locales } from "@/config/locales";

/**
 * Language-specific sitemap generation
 * Generates a sitemap for a single language
 *
 * Benefits:
 * - Faster crawling (Google can parallelize)
 * - Better organization
 * - Easier debugging per language
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    return new NextResponse("Invalid locale", { status: 404 });
  }

  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  // Main pages
  const mainPages = [
    { path: "", priority: "1.0", changefreq: "daily" },
    { path: "/services", priority: "0.9", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/contact", priority: "0.9", changefreq: "monthly" },
    { path: "/privacy", priority: "0.5", changefreq: "yearly" },
    { path: "/terms", priority: "0.5", changefreq: "yearly" },
  ];

  // Service detail pages
  const servicePages = [
    { slug: "laser-cutting", priority: "0.9", changefreq: "weekly" },
    { slug: "cnc-bending", priority: "0.9", changefreq: "weekly" },
    { slug: "flanging-dishing", priority: "0.9", changefreq: "weekly" },
    { slug: "custom-fabrication", priority: "0.9", changefreq: "weekly" },
  ];

  // Generate all page URLs for this locale
  const allPages = [
    ...mainPages,
    ...servicePages.map((s) => ({ path: `/services/${s.slug}`, priority: s.priority, changefreq: s.changefreq })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Language: ${locale.toUpperCase()} - ${allPages.length} URLs -->
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}/${locale}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.path === "" ? `
    <image:image>
      <image:loc>${baseUrl}/logo.png</image:loc>
      <image:title>MSADDI.EST Logo</image:title>
      <image:caption>MSADDI.EST - Leading Sheet Metal Fabrication in Syria</image:caption>
    </image:image>` : ""}
    ${locales
      .map(
        (altLang) => `
    <xhtml:link
      rel="alternate"
      hreflang="${altLang}"
      href="${baseUrl}/${altLang}${page.path}" />`
      )
      .join("")}
    <xhtml:link
      rel="alternate"
      hreflang="x-default"
      href="${baseUrl}/en${page.path}" />
  </url>`
    )
    .join("")}

</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
