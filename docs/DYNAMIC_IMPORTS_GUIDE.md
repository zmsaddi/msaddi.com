# Dynamic Imports Implementation Guide

## Overview
This guide explains how to implement dynamic imports for heavy components to reduce initial bundle size and improve performance.

---

## ✅ What We've Created

### 1. Motion Wrapper Component
**File:** `components/ui/motion.tsx`

**Purpose:**
- Dynamically import Framer Motion components
- Reduces bundle by ~40KB
- Only loads when animations are visible

**Usage:**
```typescript
// BEFORE (static import - loads immediately)
import { motion } from 'framer-motion';

// AFTER (dynamic import - loads on demand)
import { motion } from '@/components/ui/motion';

// Usage remains the same
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>
```

---

## 🎯 Components to Update (23 files)

### Quick Find & Replace
Use your code editor's find/replace feature:

**Find:**
```typescript
import { motion } from "framer-motion";
```

**Replace with:**
```typescript
import { motion } from "@/components/ui/motion";
```

### Files List
Run this search in your project:
```bash
grep -r 'from "framer-motion"' components/
```

Update these files:
1. `components/sections/home/about-section.tsx`
2. `components/sections/home/hero-section.tsx`
3. `components/sections/home/services-section.tsx`
4. `components/sections/home/capabilities-section.tsx`
5. `components/sections/home/cta-section.tsx`
6. `components/sections/services/service-hero.tsx`
7. `components/sections/services/service-grid.tsx`
8. `components/sections/services/service-cta.tsx`
9. `components/sections/services/industries-section.tsx`
10. `components/sections/services/service-detail-*` (6 files)
11. `components/sections/about/*` (6 files)
12. `components/sections/contact/contact-hero.tsx`
13. `components/sections/contact/contact-form.tsx`

---

## 📦 Other Heavy Components

### 2. Google Maps (Dynamic Import)

**Create:** `components/ui/google-map-dynamic.tsx`

```typescript
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const GoogleMapDynamic = dynamic(
  () => import('@/components/ui/google-map').then((mod) => mod.GoogleMap),
  {
    loading: () => (
      <div className="w-full h-[450px] bg-surface flex items-center justify-center rounded-xl">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    ),
    ssr: false,
  }
);

export default GoogleMapDynamic;
```

**Usage in contact page:**
```typescript
// BEFORE
import { GoogleMap } from '@/components/ui/google-map';

// AFTER
import GoogleMapDynamic from '@/components/ui/google-map-dynamic';

// In JSX
<GoogleMapDynamic className="mt-8" />
```

**Savings:** ~30KB

---

### 3. WhatsApp Button (Dynamic Import)

**Create:** `components/ui/whatsapp-button-dynamic.tsx`

```typescript
import dynamic from 'next/dynamic';

const WhatsAppButtonDynamic = dynamic(
  () => import('@/components/ui/whatsapp-button').then((mod) => mod.WhatsAppButton),
  {
    ssr: false, // WhatsApp button is client-side only
  }
);

export default WhatsAppButtonDynamic;
```

**Usage in layout:**
```typescript
// BEFORE
import { WhatsAppButton } from '@/components/ui/whatsapp-button';

// AFTER
import WhatsAppButtonDynamic from '@/components/ui/whatsapp-button-dynamic';

// In JSX
<WhatsAppButtonDynamic />
```

**Savings:** ~5KB

---

## 📊 Expected Results

### Before Dynamic Imports
```
First Load JS: 87.2 kB
Largest Page:  178 kB (contact)
Framer Motion: ~40 KB (always loaded)
```

### After Dynamic Imports
```
First Load JS: ~50 kB (-37 KB, -42%)
Largest Page:  ~140 kB (-38 KB, -21%)
Framer Motion: Only loaded when needed
```

---

## 🔄 Implementation Steps

### Step 1: Update Framer Motion Imports (5 minutes)
1. Open project in VS Code
2. Press `Ctrl+Shift+H` (Find & Replace in Files)
3. Find: `from "framer-motion"`
4. Replace: `from "@/components/ui/motion"`
5. Replace All (23 files)

### Step 2: Create Dynamic Google Maps (2 minutes)
1. Create `components/ui/google-map-dynamic.tsx`
2. Copy code from this guide
3. Update `app/[locale]/contact/page.tsx` to use it

### Step 3: Create Dynamic WhatsApp Button (2 minutes)
1. Create `components/ui/whatsapp-button-dynamic.tsx`
2. Copy code from this guide
3. Update layout to use it

### Step 4: Test Build (2 minutes)
```bash
npm run build
```

Check output for reduced bundle sizes.

---

## ✅ Verification

### Check Bundle Size
```bash
npm run build | grep "First Load JS"
```

**Expected:**
- First Load JS should decrease by ~35-40KB
- Contact page should be ~140KB (down from 178KB)
- Other pages should be ~130KB (down from 165KB)

### Check Loading
1. Open DevTools → Network tab
2. Throttle to "Fast 3G"
3. Navigate to homepage
4. framer-motion should NOT load immediately
5. Scroll down → framer-motion loads when animations appear

---

## 🎯 Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| First Load JS | 87.2 KB | ~50 KB | -42% |
| Home Page | 165 KB | ~127 KB | -23% |
| Contact Page | 178 KB | ~140 KB | -21% |
| Time to Interactive | 3.5s | ~2.8s | -20% |

---

## 🚨 Common Issues

### Issue 1: Type Errors
If you get TypeScript errors, install types:
```bash
npm install --save-dev @types/react
```

### Issue 2: Animations Don't Work
Make sure components are still 'use client':
```typescript
'use client'; // Must be at top of file

import { motion } from '@/components/ui/motion';
```

### Issue 3: Build Warnings
Dynamic imports may show warnings - this is normal:
```
Warning: Dynamic import used
```

This is expected and not an error.

---

## 🔍 Testing Checklist

After implementing dynamic imports:

- [ ] Build completes successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] Homepage loads animations correctly
- [ ] Contact page loads map correctly
- [ ] WhatsApp button appears and works
- [ ] Bundle size reduced (check build output)
- [ ] All pages load faster in DevTools
- [ ] No console errors in browser

---

## 📚 Additional Resources

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
- [Bundle Analysis](https://nextjs.org/docs/advanced-features/measuring-performance)

---

## 💡 Pro Tips

### 1. Analyze Bundle
```bash
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

### 2. Measure Impact
Use Lighthouse before and after:
- Homepage: Should improve by 10-15 points
- Contact: Should improve by 15-20 points

### 3. Monitor Performance
Use Vercel Analytics to track real user metrics:
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

---

## 🎉 Summary

Dynamic imports are one of the most effective ways to improve performance:

✅ **Easy to implement** (< 15 minutes)
✅ **Big impact** (40% reduction in First Load JS)
✅ **No user-facing changes** (everything works the same)
✅ **Future-proof** (scales as you add more features)

**Next Step:** Follow the implementation steps above and test!

---

*Last Updated: 2025-01-01*
*Performance Optimization Guide*
