# Vercel KV Setup Guide

## Overview
This project uses **Vercel KV** (Redis) for distributed rate limiting across serverless functions. This ensures that rate limits persist across deployments and work correctly in multi-server environments.

## Why Vercel KV?
- ✅ **Distributed**: Works across all serverless function instances
- ✅ **Persistent**: Survives server restarts and redeployments
- ✅ **Fast**: Redis-backed with <10ms latency
- ✅ **Integrated**: Native Vercel integration, auto-injected environment variables
- ✅ **Scalable**: Handles high traffic without memory leaks

## Setup Instructions

### 1. Create Vercel KV Database

**Option A: Via Vercel Dashboard** (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis)
6. Choose a name (e.g., `msaddi-rate-limit`)
7. Select region closest to your users (e.g., `Frankfurt, Germany` for EU/Middle East)
8. Click **Create**

**Option B: Via Vercel CLI**
```bash
vercel kv create msaddi-rate-limit
vercel link # Connect to your project
```

### 2. Connect KV to Your Project
1. In Storage tab, click on your KV database
2. Go to **Settings** → **Connect Project**
3. Select your `msaddi-website` project
4. Click **Connect**

✅ **Done!** Vercel automatically injects these environment variables:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. Verify Connection
After connecting, redeploy your project:
```bash
vercel --prod
```

Check logs to confirm KV is working:
```bash
vercel logs --follow
```

You should see no "Rate limiter unavailable" errors.

## Local Development

### Option 1: Use Vercel KV Locally (Recommended)
Pull environment variables from Vercel:
```bash
vercel env pull .env.local
```

This downloads KV credentials to your local `.env.local`.

### Option 2: Graceful Fallback (No Setup)
The rate limiter includes a fallback mechanism. If KV is unavailable:
- Requests are allowed (prevents denial of service)
- Warning is logged
- Still provides some protection via reCAPTCHA

For local testing, you can skip KV setup. The contact form will still work.

## Rate Limit Configuration

### Current Limits
| Endpoint | Limit | Window |
|----------|-------|--------|
| Contact Form | 3 requests | 1 hour |
| General API | 60 requests | 1 minute |
| Suspicious Activity | 1 request | 5 minutes |

### Customizing Limits
Edit `lib/rate-limiter.ts`:

```typescript
export async function rateLimitContactForm(ip: string) {
  return rateLimit(ip, "contact-form", {
    maxRequests: 5,        // Change limit
    windowMs: 30 * 60 * 1000, // Change window (30 min)
  });
}
```

## Monitoring

### View Rate Limit Data
**Via Vercel Dashboard:**
1. Go to Storage → Your KV Database
2. Click **Data Browser**
3. Search for keys starting with `ratelimit:`

**Via Vercel CLI:**
```bash
vercel kv keys "ratelimit:*"
vercel kv get "ratelimit:contact-form:123.456.789.0"
```

### Check Logs
```bash
vercel logs --follow
```

Look for:
- ✅ `Rate limit check passed`
- ⚠️ `Rate limit exceeded for IP: xxx.xxx.xxx.xxx`
- ❌ `Rate limiter error: ...`

## Troubleshooting

### Error: "KV_REST_API_URL is not defined"
**Solution:** Connect KV database to your project in Vercel Dashboard

### Error: "Rate limiter unavailable"
**Causes:**
1. KV database not created
2. KV not connected to project
3. Network issue

**Solution:**
1. Check Vercel Dashboard → Storage
2. Verify KV is connected
3. Redeploy project

### Local Development Issues
**Problem:** Rate limiting doesn't work locally

**Solutions:**
1. Pull env vars: `vercel env pull .env.local`
2. Or accept fallback mode (allows all requests)

## Security Best Practices

### 1. IP Detection
The rate limiter uses `x-forwarded-for` header:
```typescript
const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
```

This is secure on Vercel (trusted proxy).

### 2. Multiple Layers
Rate limiting is ONE layer:
- ✅ Rate limiting (KV)
- ✅ reCAPTCHA v3 (Google)
- ✅ Input validation (Zod)
- ✅ Email verification (Resend)

### 3. Monitoring
Set up alerts for rate limit violations:
```typescript
if (!rateLimitResult.success) {
  // Send alert to monitoring service
  console.warn(`Rate limit exceeded for IP: ${ip}`);
}
```

## Cost

### Vercel KV Pricing (as of 2024)
- **Hobby**: 256MB storage, 100K requests/month - **FREE**
- **Pro**: 512MB storage, 500K requests/month - Included in Pro plan
- **Enterprise**: Custom

### Estimated Usage
- Contact form: ~100 submissions/month
- Rate limit checks: ~100 reads/month
- **Cost: $0** (within free tier)

## Advanced: Redis Commands

Access KV directly via Redis CLI:

```bash
# Install Redis CLI
npm install -g redis-cli

# Connect to Vercel KV
redis-cli -h <KV_HOST> -p <KV_PORT> -a <KV_PASSWORD>

# View all rate limit keys
KEYS ratelimit:*

# Check specific IP
ZRANGE ratelimit:contact-form:123.456.789.0 0 -1 WITHSCORES

# Clear rate limit for testing
DEL ratelimit:contact-form:123.456.789.0
```

## Migration from In-Memory to KV

**Before:**
```typescript
const requestCounts = new Map<string, { count: number; resetTime: number }>();
```
❌ Lost on restart
❌ Doesn't work with multiple servers

**After:**
```typescript
import { rateLimitContactForm } from "@/lib/rate-limiter";
const result = await rateLimitContactForm(ip);
```
✅ Persistent
✅ Distributed
✅ Production-ready

## Support

If you encounter issues:
1. Check [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
2. View Vercel logs: `vercel logs`
3. Check this project's issues on GitHub

---

**Last Updated:** 2025-01-01
**Vercel KV Version:** Latest
**Project:** MSADDI.EST Website
