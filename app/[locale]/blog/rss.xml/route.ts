/**
 * RSS Feed Endpoint
 *
 * Generates RSS feed for blog posts by locale
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateRSSFeed } from '@/lib/blog/rss';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;

    // Generate RSS feed for the locale
    const rssFeed = await generateRSSFeed(locale);

    // Return RSS XML with proper content type
    return new NextResponse(rssFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[RSS] Error generating feed:', error);

    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Generate static RSS feeds at build time for all active locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
    { locale: 'tr' },
  ];
}
