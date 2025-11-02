// Public environment variables ONLY
// Safe to use in client-side components

/**
 * Public environment variables that are safe to expose to the client.
 * These variables are prefixed with NEXT_PUBLIC_ and are embedded in the client bundle.
 */
export const envPublic = {
  // Google reCAPTCHA Site Key (public - used in client-side forms)
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,

  // Google Analytics Measurement ID (public - used in client-side tracking)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-9F1ZWNTMF2',

  // Site URL (public - used for canonical URLs and metadata)
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.msaddi.com',
} as const;

// Type-safe public environment variables
export type EnvPublic = typeof envPublic;
