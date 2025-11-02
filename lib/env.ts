// Server-only environment variables
// ⚠️ This file can ONLY be imported in server-side code (API routes, Server Components)
// For client-side code, use @/lib/env-public instead
import 'server-only';

// Re-export public env for convenience in server code
export { envPublic } from './env-public';

/**
 * Validates that all required server environment variables are present
 * @throws {Error} if any required variables are missing
 */
function validateServerEnv() {
  const required = [
    'RESEND_API_KEY',
    'RECAPTCHA_SECRET_KEY',
    'EMAIL_FROM',
    'EMAIL_TO',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required server environment variables: ${missing.join(', ')}\n\n` +
      `Please add them to:\n` +
      `- Vercel Dashboard → Settings → Environment Variables\n` +
      `- Local development: .env.local file\n\n` +
      `See VERCEL_ENV_SETUP.md for the complete list of required variables.`
    );
  }
}

// Validate server environment variables
validateServerEnv();

/**
 * Server-only environment variables
 * These contain sensitive API keys and secrets that must NEVER be exposed to the client
 */
export const envServer = {
  // Email service configuration (Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  EMAIL_FROM: process.env.EMAIL_FROM!,
  EMAIL_TO: process.env.EMAIL_TO!,

  // reCAPTCHA server-side secret key
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY!,
} as const;

// Legacy export for backward compatibility (server-side only)
export const env = {
  ...envServer,
  // Public vars also available in server code
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-9F1ZWNTMF2',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.msaddi.com',
} as const;

// Type-safe environment variables
export type EnvServer = typeof envServer;
export type Env = typeof env;