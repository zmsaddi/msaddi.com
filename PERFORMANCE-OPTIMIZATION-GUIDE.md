# Performance Optimization Guide - MSADDI.EST Website
## Lighthouse Analysis & Action Plan

**Date:** 2025-11-02
**Current Performance Issues:** LCP 5.1s, FCP 2.8s, Unused JavaScript 76 KiB

---

## 🔴 Critical Issues (Fix Immediately)

### 1. Largest Contentful Paint (LCP): 5.1 seconds
**Target:** <2.5 seconds
**Current:** 5.1 seconds
**Impact:** Users see blank screen for 5+ seconds

**Root Causes:**
- Render-blocking CSS (150ms delay)
- Google Tag Manager loading (54.9 KiB unused)
- Server response time
- Font loading

**Solutions:**

#### A. Optimize Google Analytics Loading
**Current issue:** Google Tag Manager loads 138.9 KiB but only uses 84 KiB

**Action 1:** Replace heavy GTM with lightweight Google Analytics script
```typescript
// In components/analytics/google-analytics.tsx
// BEFORE (Heavy):
import Script from 'next/script'

export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-9F1ZWNTMF2`} />
      <Script id="google-analytics">
        ...
      </Script>
    </>
  )
}

// AFTER (Lightweight):
import Script from 'next/script'

export function GoogleAnalytics() {
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=G-9F1ZWNTMF2`}
      strategy="lazyOnload"  // Load after page is interactive
    />
  )
}
```

**Expected improvement:** -300ms LCP, -54.9 KiB unused JavaScript

#### B. Add Resource Hints (Preconnect)
**Action 2:** Add preconnect hints for faster third-party connections

Add to `app/layout.tsx` in the `<head>`:
```html
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

**Expected improvement:** -150ms LCP

#### C. Optimize CSS Loading
**Current issue:** CSS blocks initial render for 150ms

**Action 3:** Add critical CSS inline and defer non-critical CSS

**Expected improvement:** -150ms LCP

---

### 2. Render-Blocking Resources: 150ms delay

**Files blocking render:**
- `a4c69c096ddd4e6c.css` (12.1 KiB, 450ms)
- `b941d1f5210a2983.css` (2.1 KiB, 150ms)

**Solutions:**

#### Option A: Use Next.js Compiler Optimization
Update `next.config.mjs`:
```javascript
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,  // Enable CSS optimization
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    ...
  },
}
```

#### Option B: Split CSS by Route
Next.js should do this automatically, but verify in production build.

---

### 3. Unused JavaScript: 76 KiB wasted

**Breakdown:**
- Google Tag Manager: 54.9 KiB unused
- Next.js chunks/810: 21.1 KiB unused

**Solutions:**

#### A. Defer Analytics Loading
Change Google Analytics strategy from `afterInteractive` to `lazyOnload`:

```typescript
// File: components/analytics/google-analytics.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
  strategy="lazyOnload"  // Change from 'afterInteractive'
/>
```

**Expected improvement:** -54.9 KiB unused JavaScript

#### B. Code Splitting Optimization
Add to `next.config.mjs`:
```javascript
experimental: {
  optimizePackageImports: ['framer-motion', '@radix-ui/react-icons'],
}
```

---

### 4. Legacy JavaScript Features: 12 KiB polyfills

**Issue:** Next.js is including polyfills for old browsers

**Solution:** Update browserslist in `package.json`:
```json
{
  "browserslist": {
    "production": [
      ">0.5%",
      "not dead",
      "not op_mini all",
      "not IE 11"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

**Expected improvement:** -12 KiB JavaScript

---

## 🟡 Medium Priority Optimizations

### 5. Image Optimization
**Current:** Using AVIF and WebP ✅ (Good!)

**Additional optimizations:**
- Add `priority` prop to hero images
- Use `loading="lazy"` for below-the-fold images
- Optimize image sizes

Example:
```tsx
<Image
  src="/hero-image.jpg"
  width={1200}
  height={600}
  priority  // For LCP image
  alt="..."
/>
```

### 6. Font Optimization
**Current:** Using Google Fonts with `display: swap` ✅ (Good!)

**Additional optimization:** Self-host fonts for faster loading

### 7. Add Compression Headers
Update `next.config.mjs` headers:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
},
```

---

## ✅ Already Optimized (Keep These!)

1. **CLS: 0** - Perfect! No layout shifts ✅
2. **TBT: 50ms** - Good interactivity ✅
3. **Image formats:** AVIF, WebP ✅
4. **Font display:** swap ✅
5. **Strict Mode:** Enabled ✅

---

## 📋 Quick Action Checklist

### Immediate Actions (30 minutes):
- [ ] Change Google Analytics strategy to `lazyOnload`
- [ ] Add preconnect hints for Google services
- [ ] Add `priority` prop to hero/LCP images

### Short-term (1-2 hours):
- [ ] Enable CSS optimization in next.config.mjs
- [ ] Add browserslist to package.json
- [ ] Optimize largest images
- [ ] Add compression and caching headers

### Long-term (Future improvements):
- [ ] Consider self-hosting fonts
- [ ] Implement service worker for offline support
- [ ] Add resource priorities
- [ ] Consider replacing GTM with direct GA4 integration

---

## 🎯 Expected Results After Optimization

| Metric | Current | Target | Expected |
|--------|---------|--------|----------|
| **LCP** | 5.1s | <2.5s | 2.3s |
| **FCP** | 2.8s | <1.8s | 1.6s |
| **TBT** | 50ms | <200ms | 50ms ✅ |
| **CLS** | 0 | <0.1 | 0 ✅ |
| **Performance Score** | ~60 | >90 | 92+ |

---

## 🔧 Implementation Priority

### Priority 1: Critical (Do Today)
1. Change analytics loading strategy
2. Add preconnect hints
3. Mark LCP image as priority

**Expected time:** 15-30 minutes
**Expected improvement:** +25 performance score

### Priority 2: High (This Week)
1. Enable CSS optimization
2. Add compression headers
3. Update browserslist

**Expected time:** 1-2 hours
**Expected improvement:** +10 performance score

### Priority 3: Medium (This Month)
1. Self-host fonts
2. Optimize all images
3. Implement advanced caching

**Expected time:** 4-8 hours
**Expected improvement:** +5 performance score

---

## 📊 Monitoring & Testing

### Tools to Use:
1. **Google Lighthouse** - Run after each optimization
2. **WebPageTest** - Test from different locations
3. **Chrome DevTools** - Performance panel
4. **Google Search Console** - Core Web Vitals report

### Testing URLs:
- Homepage: https://www.msaddi.com/en
- Services: https://www.msaddi.com/en/services
- About: https://www.msaddi.com/en/about
- Contact: https://www.msaddi.com/en/contact

### Run tests on:
- Desktop (current: ~60 score)
- Mobile (current: shown in your screenshot)
- Both should be >90 after optimization

---

## 🚀 Quick Wins (Implement Now)

### 1. Optimize Google Analytics (2 minutes)
File: `components/analytics/google-analytics.tsx`

```typescript
// Change strategy from 'afterInteractive' to 'lazyOnload'
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-9F1ZWNTMF2`}
  strategy="lazyOnload"  // This one change saves 54.9 KiB!
/>
```

### 2. Add LCP Image Priority (1 minute)
Find your hero image component and add:
```tsx
<Image
  ...
  priority  // Add this prop
/>
```

### 3. Add Preconnect (1 minute)
These 3 lines can save 150ms:
```html
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

**Total time:** 4 minutes
**Expected LCP improvement:** -600ms (5.1s → 4.5s)
**Expected Performance score:** +15 points

---

## 📝 Notes

- Always test after each optimization
- Run Lighthouse in incognito mode
- Test on actual mobile devices, not just emulators
- Monitor real user metrics via Google Analytics
- Performance improvements also help SEO rankings

---

**Last Updated:** 2025-11-02
**Next Review:** After implementing Priority 1 optimizations
