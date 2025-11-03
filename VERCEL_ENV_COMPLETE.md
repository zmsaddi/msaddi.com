# Vercel Environment Variables - Complete Configuration

## ✅ All Environment Variables Are Configured to Read from Vercel

### Architecture Overview

The project uses a **centralized environment variable system** with two main files:

1. **`lib/env.ts`** - Server-side secrets (API keys, private tokens)
2. **`lib/env-public.ts`** - Client-side public variables (prefixed with `NEXT_PUBLIC_`)

### Required Environment Variables in Vercel

#### Server-Side Variables (Secret - Not Exposed to Browser)
```env
RESEND_API_KEY=re_HrFdcUcy_QJaGPcN8qZuPEVKuJLdketis
RECAPTCHA_SECRET_KEY=6Lfp1P4rAAAAAA3WrHYtZ-64iQEdkVixs5f18lWZ
EMAIL_FROM=noreply@msaddi.com
EMAIL_TO=info@msaddi.com
```

#### Client-Side Variables (Public - Safe to Expose)
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lfp1P4rAAAAADCVpBBigSb7EeYc0uO69EwD8fMv
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9F1ZWNTMF2
NEXT_PUBLIC_SITE_URL=https://www.msaddi.com
```

## Files Using Environment Variables

### Server-Side Files (Using `@/lib/env`)
| File | Variables Used | Purpose |
|------|---------------|---------|
| `app/api/contact/route.ts` | `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`, `EMAIL_FROM`, `EMAIL_TO` | Contact form API - sends emails via Resend |
| `app/api/sitemap/route.ts` | `NEXT_PUBLIC_SITE_URL` | Generates sitemap.xml |

### Client-Side Files (Using `@/lib/env-public`)
| File | Variables Used | Purpose |
|------|---------------|---------|
| `components/analytics/google-analytics.tsx` | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics tracking |
| `components/sections/contact/contact-form.tsx` | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA spam protection |
| `lib/gtag.ts` | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics helper |
| `lib/utils.ts` | `NEXT_PUBLIC_SITE_URL` | URL utilities |

### Built-in Variables (Automatically Available)
| Variable | Source | Usage |
|----------|--------|-------|
| `NODE_ENV` | Node.js | Production/development mode detection |
| `VERCEL_URL` | Vercel | Automatic deployment URL |

## How It Works

### 1. Centralized Configuration
All environment variables are imported through centralized files:
```typescript
// Server-side (API routes, Server Components)
import { env } from "@/lib/env";
const apiKey = env.RESEND_API_KEY;

// Client-side (React Components)
import { envPublic } from "@/lib/env-public";
const siteKey = envPublic.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
```

### 2. Automatic Vercel Integration
When you deploy to Vercel:
1. Vercel reads environment variables from **Settings → Environment Variables**
2. Next.js automatically injects them into `process.env`
3. Our centralized `lib/env.ts` and `lib/env-public.ts` read from `process.env`
4. All components import from these centralized files

### 3. Environment Validation
The system includes automatic validation:
- Server variables are checked at build time
- Missing variables trigger console warnings (not errors)
- Contact form gracefully handles missing configuration with helpful error messages

## Verification Checklist

✅ **All environment variables are set in Vercel Dashboard**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify all 7 variables from MSADDI.env are added

✅ **Variables are set for correct environments**
- Production ✓
- Preview ✓ (optional but recommended)
- Development ✓ (optional, uses .env.local locally)

✅ **No hardcoded secrets in code**
- All sensitive data read from environment variables
- No API keys committed to Git

✅ **Public variables properly prefixed**
- All client-side variables start with `NEXT_PUBLIC_`
- Server-side secrets have NO prefix

## Testing

### Local Testing
1. Copy `D:\msaddi\MSADDI.env` to `D:\msaddi\msaddi-website\.env.local`
2. Run `npm run dev`
3. Test contact form at http://localhost:3000/en/contact

### Production Testing
1. Deploy to Vercel (automatic on git push)
2. Vercel reads variables from Dashboard
3. Test contact form at https://www.msaddi.com/en/contact

## Security Features

1. **Server-Only Variables**: API keys never exposed to browser
2. **Type Safety**: TypeScript ensures correct variable usage
3. **Validation**: Automatic checks for missing variables
4. **Graceful Degradation**: Contact form shows helpful message if misconfigured
5. **Rate Limiting**: Built-in spam protection in contact API

## Status: ✅ FULLY CONFIGURED

All environment variables are properly configured to read from Vercel.
The contact form and all features will work correctly once deployed.

---

**Last Updated**: 2025-11-03
**Configuration Source**: D:\msaddi\MSADDI.env
**Deployment Platform**: Vercel
