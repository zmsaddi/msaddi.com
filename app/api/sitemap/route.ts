import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const languages = ["en", "ar", "tr", "fr", "de", "es", "it", "nl", "pt"];

  // Pages with their priorities and change frequencies for better SEO
  const pages = [
    { path: "", priority: "1.0", changefreq: "daily" },
    { path: "/services", priority: "0.9", changefreq: "weekly" },
    { path: "/about", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" }
  ];

  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${languages
    .map((lang) =>
      pages
        .map(
          (page) => `
  <url>
    <loc>${baseUrl}/${lang}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.path === "" ? `
    <image:image>
      <image:loc>${baseUrl}/logo.png</image:loc>
      <image:title>MSADDI.EST Logo</image:title>
      <image:caption>MSADDI.EST - Leading Sheet Metal Fabrication in Syria</image:caption>
    </image:image>` : ""}
    ${languages
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
        .join("")
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