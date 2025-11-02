// Centralized environment variables with defaults
// These ensure the build always succeeds while allowing override in production

export const env = {
  // Public environment variables (accessible in client)
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lfp1P4rAAAAADCVpBBigSb7EeYc0uO69EwD8fMv",
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-9F1ZWNTMF2",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://www.msaddi.com",

  // Server-only environment variables
  RESEND_API_KEY: process.env.RESEND_API_KEY || "re_HrFdcUcy_QJaGPcN8qZuPEVKuJLdketis",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@msaddi.com",
  EMAIL_TO: process.env.EMAIL_TO || "info@msaddi.com",
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || "6Lfp1P4rAAAAAA3WrHYtZ-64iQEdkVixs5f18lWZ",
} as const;

// Type-safe environment variables
export type Env = typeof env;