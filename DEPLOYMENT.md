# MSADDI Website - Deployment Guide

## Enterprise Multilingual Content System

**Version:** 1.0.0
**Last Updated:** 2025-11-01
**Status:** Production Ready

---

## 🎯 System Overview

This is an enterprise-grade multilingual website with:
- ✅ **Zero hardcoded strings** - All text from translation files
- ✅ **Build-time validation** - Automatic quality checks
- ✅ **3 Official languages** - Arabic, English, Turkish
- ✅ **Cookie-based preferences** - Persistent language selection
- ✅ **Google Translate overlay** - Optional for unsupported languages
- ✅ **Machine translation badges** - User warnings for auto-translation
- ✅ **SEO optimized** - Hreflang, canonical URLs, structured data

---

## 📋 Pre-Deployment Checklist

### 1. Translation Validation
```bash
npm run validate:translations
```
**Expected output:**
```
✅ All languages have identical key structure (107 keys)
✅ No hardcoded strings detected
✅ All translations passed quality checks
```

### 2. Build Test
```bash
npm run build
```
**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (16/16)
○ (Static) prerendered pages
ƒ (Dynamic) server-rendered pages
```

### 3. Development Test
```bash
npm run dev
```
Visit:
- `http://localhost:3000/ar` - Arabic (RTL)
- `http://localhost:3000/en` - English (LTR)
- `http://localhost:3000/tr` - Turkish (LTR)

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Step 1: Connect Repository**
```bash
# Login to Vercel
npm install -g vercel
vercel login

# Deploy
vercel
```

**Step 2: Configure Environment Variables**
No environment variables required for basic deployment.

**Step 3: Configure Domain**
```bash
vercel domains add msaddi.com
vercel domains add www.msaddi.com
```

**Vercel automatically handles:**
- ✅ SSL certificates
- ✅ CDN distribution
- ✅ Automatic deployments from Git
- ✅ Preview deployments for PRs

### Option 2: Netlify

**netlify.toml** configuration:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "https://msaddi.com/*"
  to = "https://www.msaddi.com/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Option 3: Docker

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Deploy:**
```bash
docker build -t msaddi-website .
docker run -p 3000:3000 msaddi-website
```

---

## 🌐 DNS Configuration

### Primary Domain: msaddi.com

**A Records:**
```
Type: A
Name: @
Value: [Your server IP]
TTL: 3600
```

**CNAME Records:**
```
Type: CNAME
Name: www
Value: msaddi.com
TTL: 3600
```

### Vercel-Specific DNS
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 🔧 Configuration

### Language Settings

**Priority Order (Middleware):**
1. **Cookie** (`NEXT_LOCALE`) - Highest priority
2. **Browser** (`Accept-Language` header)
3. **URL** (`/ar`, `/en`, `/tr`)
4. **Default** (Arabic for Syrian market)

**Cookie Configuration:**
- Name: `NEXT_LOCALE`
- Max Age: 1 year (31536000 seconds)
- Path: `/`
- SameSite: `lax`
- Secure: `true` (production only)
- HttpOnly: `false` (allow JS access for language switcher)

### Translation System

**Files Structure:**
```
messages/
  ├── ar.json (Arabic)
  ├── en.json (English)
  └── tr.json (Turkish)

translations/
  ├── glossary.json (Brand & technical terms)
  ├── translation-memory.json (Approved translations)
  └── README.md (Workflow documentation)
```

**Validation:**
- Runs automatically before every build (`prebuild` script)
- Fails build if violations detected
- Checks: structure, hardcoded strings, quality

---

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Google Analytics 4**
   Add to `app/[locale]/layout.tsx`:
   ```tsx
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```

2. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

3. **Language Usage Tracking**
   Monitor cookie values to understand language preferences

### SEO Verification

**Google Search Console:**
- Verify all language versions: `/ar`, `/en`, `/tr`
- Submit multilingual sitemap: `/sitemap.xml`
- Check hreflang implementation

**Checklist:**
```bash
# Verify hreflang tags
curl -I https://msaddi.com/ar | grep -i "link"
curl -I https://msaddi.com/en | grep -i "link"
curl -I https://msaddi.com/tr | grep -i "link"

# Verify canonical URLs
curl https://msaddi.com/ar | grep canonical
curl https://msaddi.com/en | grep canonical
curl https://msaddi.com/tr | grep canonical

# Verify structured data
curl https://msaddi.com/ar | grep -A 20 "application/ld+json"
```

---

## 🛠 Maintenance

### Adding New Languages

**Step 1: Create translation file**
```bash
cp messages/en.json messages/fr.json
# Translate all values in fr.json
```

**Step 2: Update i18n config**
```typescript
// i18n.ts
export const locales = ['ar', 'en', 'tr', 'fr'] as const;

export const localeConfig = {
  // ... existing configs
  fr: {
    label: 'Français',
    dir: 'ltr',
  },
};
```

**Step 3: Update glossary and TM**
Add French translations to:
- `translations/glossary.json`
- `translations/translation-memory.json`

**Step 4: Validate**
```bash
npm run validate:translations
npm run build
```

### Updating Translations

**Step 1: Edit translation files**
```json
// messages/en.json
{
  "services": {
    "new_service": "New Service Name"
  }
}
```

**Step 2: Ensure all languages match**
Add same key to `ar.json`, `tr.json`

**Step 3: Validate**
```bash
npm run validate:translations
```

### Translation Workflow

**For New Content:**
1. Add English translation (source language)
2. Check glossary for standard terms
3. Check translation memory for similar content
4. Use multi-engine translation (Google + DeepL + Microsoft)
5. Human review by native speaker
6. Add approved translation to TM
7. Run validation

---

## 🐛 Troubleshooting

### Build Fails: Missing Translation

**Error:**
```
❌ ERROR: ar.json is missing 1 keys:
  - services.new_feature
```

**Solution:**
Add missing key to all language files.

### Language Not Switching

**Symptoms:** URL changes but content stays the same

**Solution:**
1. Clear browser cookies
2. Hard refresh (Ctrl+Shift+R)
3. Check middleware logs (development mode)

### Google Translate Not Working

**Symptoms:** Translation widget doesn't appear

**Solution:**
1. Check browser console for errors
2. Verify script loading: `//translate.google.com/translate_a/element.js`
3. Ensure `rel="nofollow"` is set for SEO safety

### RTL Layout Issues (Arabic)

**Symptoms:** Text direction incorrect

**Solution:**
1. Verify `dir="rtl"` in `<html>` tag
2. Check CSS for RTL-specific overrides
3. Use logical properties (`margin-inline-start` vs `margin-left`)

---

## 📈 Performance Optimization

### Current Performance

- **Build Time:** ~2-3 seconds (Turbopack)
- **Pages:** 16 static/dynamic pages
- **Languages:** 3 (ar, en, tr)
- **Translation Keys:** 107

### Optimization Tips

1. **Image Optimization**
   ```tsx
   import Image from 'next/image';
   <Image src="/logo.svg" width={200} height={60} alt="MSADDI" priority />
   ```

2. **Font Optimization**
   Already configured in layout.tsx with `preconnect`

3. **Code Splitting**
   Next.js automatic - components lazy loaded

4. **Caching Strategy**
   ```
   Cache-Control: public, max-age=31536000, immutable (static assets)
   Cache-Control: no-cache (dynamic pages)
   ```

---

## 🔐 Security

### Headers Configuration

**Next.js Config (middleware.ts):**
```typescript
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('X-XSS-Protection', '1; mode=block');
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
```

### Cookie Security

- **Production:** `secure: true` (HTTPS only)
- **SameSite:** `lax` (CSRF protection)
- **Path:** `/` (site-wide)

### Content Security Policy

Recommended CSP header:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://translate.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;
```

---

## 📞 Support & Contacts

### Technical Issues
- **Validation errors:** Check `/scripts/validate-translations.js`
- **Translation workflow:** See `/translations/README.md`
- **Build issues:** Review build logs

### Translation Updates
1. Create PR with translation changes
2. Validation runs automatically
3. Human review required
4. Deploy after approval

---

## 📝 Version History

### v1.0.0 (2025-11-01) - Production Release

**Features:**
- ✅ Zero hardcoded strings with build-time validation
- ✅ 3 official languages (ar, en, tr)
- ✅ Cookie-based language preference system
- ✅ Google Translate overlay for unsupported languages
- ✅ Machine translation warning badges
- ✅ Comprehensive translation infrastructure (Glossary + TM)
- ✅ SEO optimization (hreflang, canonical, structured data)
- ✅ Responsive design with RTL/LTR support
- ✅ WhatsApp integration
- ✅ Google Maps integration
- ✅ Contact form with validation

**Tech Stack:**
- Next.js 16.0.1 (App Router + Turbopack)
- TypeScript 5
- Material-UI 6
- next-intl 4.4.0
- Framer Motion 11
- Zod + React Hook Form

**Infrastructure:**
- Build-time translation validation
- Multi-engine translation workflow
- Language negotiation middleware
- Cookie persistence (1 year)

---

## 🎯 Next Steps After Deployment

1. **Week 1:**
   - Monitor analytics for language usage
   - Check Google Search Console for indexing
   - Test all language versions thoroughly
   - Gather user feedback

2. **Week 2:**
   - Review translation quality with native speakers
   - Update glossary with any new terms
   - Optimize based on performance metrics

3. **Month 1:**
   - Consider adding new languages based on traffic
   - Expand translation memory with more segments
   - Review and update SEO strategy

4. **Ongoing:**
   - Regular translation audits (quarterly)
   - Glossary updates (as needed)
   - Performance monitoring (continuous)

---

## ✅ Deployment Verification Checklist

```bash
# 1. Build passes
npm run build
# Status: ✅

# 2. Validation passes
npm run validate:translations
# Status: ✅

# 3. All routes work
# /ar, /ar/about, /ar/services, /ar/contact ✅
# /en, /en/about, /en/services, /en/contact ✅
# /tr, /tr/about, /tr/services, /tr/contact ✅

# 4. Language switching works
# Cookie persists ✅
# Middleware redirects correctly ✅

# 5. RTL/LTR switching
# Arabic RTL ✅
# English LTR ✅
# Turkish LTR ✅

# 6. SEO elements present
# Hreflang tags ✅
# Canonical URLs ✅
# Structured data ✅
# Sitemap ✅
# Robots.txt ✅

# 7. Components functional
# WhatsApp button ✅
# Google Maps ✅
# Contact form ✅
# Language switcher ✅
# Google Translate overlay ✅
# Machine translation badge ✅
```

---

**Ready for Production Deployment! 🚀**

All systems validated and operational. The website meets enterprise-grade multilingual content system requirements with zero-tolerance for hardcoded strings and comprehensive quality assurance.
