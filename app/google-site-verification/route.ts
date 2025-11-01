import { NextResponse } from 'next/server';

/**
 * Google Search Console Verification Endpoint
 *
 * This endpoint serves the Google Search Console verification meta tag
 * Alternative methods:
 * 1. Upload verification file (google[xxxxx].html)
 * 2. Add meta tag to homepage
 * 3. Use DNS TXT record
 * 4. Use Google Analytics
 * 5. Use Google Tag Manager
 *
 * Environment Variables:
 * - NEXT_PUBLIC_GSC_VERIFICATION: Your GSC verification code
 */

export async function GET() {
  const verificationCode = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  if (!verificationCode) {
    return NextResponse.json(
      { error: 'GSC verification code not configured' },
      { status: 404 }
    );
  }

  // Return verification file content
  return new NextResponse(
    `google-site-verification: google${verificationCode}.html`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  );
}
