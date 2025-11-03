// Server-only environment variables
// ⚠️ This file can ONLY be imported in server-side code (API routes, Server Components)
// For client-side code, use @/lib/env-public instead
import 'server-only';

// Re-export public env for convenience in server code
export { envPublic } from './env-public';

/**
 * Validates that all required server environment variables are present
 * 🔒 SECURITY: Throws error in production, warns in development
 * This prevents deploying with missing or invalid configuration
 */
function validateServerEnv() {
  const isProduction = process.env.NODE_ENV === 'production';

  // Required environment variables
  const required = [
    'RESEND_API_KEY',
    'RECAPTCHA_SECRET_KEY',
    'EMAIL_FROM',
    'EMAIL_TO',
  ];

  // Find missing variables
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const errorMessage =
      `❌ Missing required server environment variables: ${missing.join(', ')}\n` +
      `\n` +
      `Contact form WILL NOT WORK until these are set.\n` +
      `\n` +
      `📝 Setup Instructions:\n` +
      `- Production (Vercel):\n` +
      `  → Go to Vercel Dashboard → Settings → Environment Variables\n` +
      `  → Add all missing variables\n` +
      `  → Redeploy the project\n` +
      `\n` +
      `- Local Development:\n` +
      `  → Copy .env.example to .env.local\n` +
      `  → Fill in all required values\n` +
      `  → Restart development server\n` +
      `\n` +
      `See .env.example for required format and values.`;

    if (isProduction) {
      // 🚨 Production: Throw error to prevent deployment
      throw new Error(errorMessage);
    } else {
      // ⚠️ Development: Warn but allow development to continue
      console.warn(errorMessage);
    }
  }

  // Validate email format (basic check)
  if (process.env.EMAIL_FROM && !process.env.EMAIL_FROM.includes('@')) {
    const emailError = `❌ Invalid EMAIL_FROM format: "${process.env.EMAIL_FROM}". Must be a valid email address.`;
    if (isProduction) {
      throw new Error(emailError);
    } else {
      console.warn(emailError);
    }
  }

  if (process.env.EMAIL_TO && !process.env.EMAIL_TO.includes('@')) {
    const emailError = `❌ Invalid EMAIL_TO format: "${process.env.EMAIL_TO}". Must be a valid email address.`;
    if (isProduction) {
      throw new Error(emailError);
    } else {
      console.warn(emailError);
    }
  }

  // Validate URL format for NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      if (!url.protocol.startsWith('https')) {
        const urlWarning = `⚠️  NEXT_PUBLIC_SITE_URL should use HTTPS in production: "${process.env.NEXT_PUBLIC_SITE_URL}"`;
        if (isProduction) {
          console.warn(urlWarning);
        }
      }
    } catch (_error) {
      const urlError = `❌ Invalid NEXT_PUBLIC_SITE_URL format: "${process.env.NEXT_PUBLIC_SITE_URL}". Must be a valid URL.`;
      if (isProduction) {
        throw new Error(urlError);
      } else {
        console.warn(urlError);
      }
    }
  }

  // Success message (only in development)
  if (!isProduction && missing.length === 0) {
    console.log('✅ All required environment variables are present');
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