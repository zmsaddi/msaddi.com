import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 🔒 SECURITY HEADERS - Comprehensive Protection

          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Changed from SAMEORIGIN to DENY (more secure)
          },

          // Enable XSS filter in older browsers
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },

          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          // Disable unnecessary browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
          },

          // Force HTTPS connections (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },

          // 🛡️ Content Security Policy (CSP) - Comprehensive
          {
            key: 'Content-Security-Policy',
            value: [
              // Default: Only same origin
              "default-src 'self'",

              // Scripts: Allow self, inline styles (Tailwind), Google services, Vercel
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.recaptcha.net https://va.vercel-scripts.com",

              // Styles: Allow self, inline (required for Tailwind & styled-jsx), Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Images: Allow self, data URLs, Google services, Vercel
              "img-src 'self' data: https: blob:",

              // Fonts: Allow self, data URLs, Google Fonts
              "font-src 'self' data: https://fonts.gstatic.com",

              // Connect: Allow self, Google services, Vercel analytics
              "connect-src 'self' https://www.google.com https://www.gstatic.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.google-analytics.com https://region1.google-analytics.com https://ssl.google-analytics.com https://maps.googleapis.com https://www.googletagmanager.com https://www.recaptcha.net",

              // Frames: Allow Google services (Maps, ReCAPTCHA)
              "frame-src 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://maps.google.com https://www.google.com/maps/embed/",

              // Objects: Deny all (no plugins)
              "object-src 'none'",

              // Base URI: Only same origin
              "base-uri 'self'",

              // Form actions: Only same origin (prevent form hijacking)
              "form-action 'self'",

              // Upgrade insecure requests to HTTPS
              "upgrade-insecure-requests",

              // Block mixed content (HTTP content on HTTPS pages)
              "block-all-mixed-content",
            ].join('; '),
          },
        ],
      },
      // Cache static assets
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache logo and favicon
      {
        source: '/(logo.png|favicon.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      // Cache pages with revalidation
      {
        source: '/:locale(en|ar|tr|fr|de|es|it|pt|nl)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
  // ⚡ AUTO-DETECT: Redirects handled by middleware based on browser language
  // next-intl middleware will automatically redirect '/' to the user's preferred locale
  // Falls back to 'en' if browser language is not supported
  async redirects() {
    return [];
  },
};

export default withNextIntl(nextConfig);