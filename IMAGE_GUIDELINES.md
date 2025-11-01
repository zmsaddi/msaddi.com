# Image Optimization Guidelines

## Overview
This document outlines image optimization requirements per the Arabic SEO specification for the MSADDI industrial website.

---

## **CRITICAL SEO Requirements**

### 1. Alt Text (MANDATORY)
- **ALL images MUST have descriptive alt text**
- Build will FAIL if images lack alt text
- Alt text must be descriptive (minimum 10 characters)
- Include relevant keywords naturally

**✅ GOOD Examples:**
```tsx
<OptimizedImage
  src="/products/laser-cutter.webp"
  alt="3000W Fiber Laser Cutting Machine for precision metal fabrication with ±0.127mm accuracy"
  width={800}
  height={600}
/>

<OptimizedImage
  src="/machinery/cnc-press.webp"
  alt="125 ton CNC hydraulic press brake for sheet metal bending operations"
  width={1200}
  height={800}
  priority={true} // Above the fold
/>
```

**❌ BAD Examples:**
```tsx
// TOO GENERIC - Build validation will warn
alt="machine"
alt="image"
alt="photo"
alt="img123"

// FILENAME AS ALT - Not descriptive
alt="DSC_1234.jpg"
alt="laser-cutter.webp"
```

---

## **Image Format Requirements**

### Recommended Format: WebP
- **Smaller file sizes** (25-35% smaller than JPEG)
- **Better quality** at same file size
- **Supported** by all modern browsers

### Fallback Support
Next.js Image component automatically handles fallbacks for older browsers.

### Format Guidelines:
| Image Type | Recommended Format | Notes |
|------------|-------------------|-------|
| Product Photos | WebP | Primary format |
| Machinery Images | WebP | High detail retained |
| Logos | SVG | Already optimized |
| Icons | SVG or PNG | Use SVG when possible |
| Diagrams | SVG or WebP | SVG for scalability |

---

## **Image Sizing & Performance**

### Responsive Sizes
Use the `sizes` attribute for responsive images:

```tsx
<OptimizedImage
  src="/products/product.webp"
  alt="Stainless steel enclosure with IP65 rating for industrial applications"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

### Priority Loading
Set `priority={true}` for:
- **Hero images** (above the fold)
- **LCP images** (Largest Contentful Paint)
- **Critical product images** on landing pages

```tsx
<OptimizedImage
  src="/hero/factory.webp"
  alt="MSADDI metal fabrication facility in Aleppo with advanced laser cutting equipment"
  width={1920}
  height={1080}
  priority={true} // ⬅️ Critical for LCP
/>
```

### Lazy Loading (Default)
All non-priority images use lazy loading automatically:
- **Improves initial page load**
- **Reduces bandwidth** for users
- **Better Lighthouse scores**

---

## **Image Organization**

### Directory Structure:
```
public/
├── products/
│   ├── enclosures/
│   │   ├── stainless-steel-cabinet.webp
│   │   ├── ip65-enclosure.webp
│   │   └── control-cabinet.webp
│   ├── brackets/
│   │   ├── l-bracket-heavy-duty.webp
│   │   └── z-bracket-mounting.webp
│   └── panels/
│       ├── decorative-panel.webp
│       └── perforated-screen.webp
├── machinery/
│   ├── laser-cutter-3000w.webp
│   ├── cnc-press-brake.webp
│   ├── metal-spinning-lathe.webp
│   └── quality-control-cmm.webp
├── facility/
│   ├── factory-exterior.webp
│   ├── production-floor.webp
│   └── quality-lab.webp
└── certifications/
    ├── iso-9001-certificate.webp
    └── material-test-reports.webp
```

### Naming Conventions:
- **Descriptive names** (not DSC_1234.jpg)
- **Lowercase with hyphens**
- **Include keywords** when relevant
- **Use WebP extension**

**Examples:**
- ✅ `fiber-laser-cutting-machine-3000w.webp`
- ✅ `stainless-steel-304-enclosure-ip65.webp`
- ✅ `cnc-press-brake-125-ton.webp`
- ❌ `IMG_20250101_123456.jpg`
- ❌ `photo1.png`

---

## **Technical Specifications**

### Recommended Image Dimensions:

| Use Case | Dimensions | Aspect Ratio | Max File Size |
|----------|-----------|--------------|---------------|
| Hero Images | 1920×1080 | 16:9 | 200 KB (WebP) |
| Product Cards | 800×600 | 4:3 | 80 KB (WebP) |
| Product Details | 1200×900 | 4:3 | 150 KB (WebP) |
| Machinery Photos | 1600×1200 | 4:3 | 180 KB (WebP) |
| Thumbnails | 400×300 | 4:3 | 30 KB (WebP) |
| Gallery Images | 1200×800 | 3:2 | 120 KB (WebP) |

### Quality Settings:
```tsx
<OptimizedImage
  quality={75} // Default - Good balance
  quality={85} // High quality for hero images
  quality={60} // Lower quality for thumbnails
/>
```

---

## **Converting Images to WebP**

### Using Command Line (ImageMagick):
```bash
# Single image
magick input.jpg -quality 75 output.webp

# Batch conversion
magick mogrify -format webp -quality 75 *.jpg
```

### Using Online Tools:
- **Squoosh.app** (Google) - https://squoosh.app/
- **CloudConvert** - https://cloudconvert.com/jpg-to-webp
- **TinyPNG** - https://tinypng.com/ (also supports WebP)

### Using Node.js Script:
```javascript
// scripts/convert-to-webp.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP(inputPath, outputPath) {
  await sharp(inputPath)
    .webp({ quality: 75 })
    .toFile(outputPath);
  console.log(`✓ Converted: ${path.basename(outputPath)}`);
}

// Usage: node scripts/convert-to-webp.js input.jpg output.webp
```

---

## **SEO Optimization Checklist**

### Before Adding Images:
- [ ] Convert to WebP format
- [ ] Optimize file size (< 200 KB for large images)
- [ ] Use descriptive filenames
- [ ] Prepare descriptive alt text (min 10 chars)
- [ ] Determine if image is above-the-fold (priority)

### When Adding to Code:
- [ ] Use `<OptimizedImage>` component
- [ ] Include comprehensive alt text with keywords
- [ ] Set appropriate `priority` value
- [ ] Define responsive `sizes` attribute
- [ ] Use correct `objectFit` ('cover' for fills, 'contain' for full view)

### After Implementation:
- [ ] Run build validation (`npm run build`)
- [ ] Check Lighthouse performance score (target ≥95)
- [ ] Verify lazy loading works (Network tab)
- [ ] Test on mobile devices
- [ ] Validate alt text appears in source HTML

---

## **Build Validation**

The validation script checks for:
- ✅ Missing alt attributes on `<img>` tags
- ✅ Non-descriptive alt text (warnings)
- ✅ Images without proper loading attributes

**Build will FAIL if:**
- Any `<img>` tag lacks an `alt` attribute
- Images exceed maximum file size limits (future)
- Images use deprecated formats without WebP fallback (future)

---

## **Performance Targets**

Per Arabic SEO specification:
- **Load time:** ≤2 seconds
- **Lighthouse Performance:** ≥95
- **Lighthouse SEO:** ≥90
- **LCP (Largest Contentful Paint):** <2.5s
- **CLS (Cumulative Layout Shift):** <0.1

### Image Optimization Impact:
- WebP format: **-30% file size**
- Lazy loading: **-40% initial bandwidth**
- Responsive sizing: **-50% mobile bandwidth**
- Next.js optimization: **Automatic format selection**

---

## **Example Implementation**

### Product Page with Optimized Images:
```tsx
import OptimizedImage from '@/components/OptimizedImage';

export default function ProductPage() {
  return (
    <Container>
      {/* Hero Image - Priority */}
      <OptimizedImage
        src="/products/laser-cutter-hero.webp"
        alt="High-precision 3000W fiber laser cutting machine for industrial metal fabrication with ±0.127mm accuracy"
        width={1920}
        height={1080}
        priority={true}
        quality={85}
      />

      {/* Product Gallery - Lazy Loaded */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <OptimizedImage
            src="/products/laser-cutter-detail-1.webp"
            alt="Fiber laser cutting head with automatic focus adjustment for precise metal cutting"
            width={800}
            height={600}
            quality={75}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OptimizedImage
            src="/products/laser-cutter-detail-2.webp"
            alt="CNC control panel for laser cutting machine with touch screen interface"
            width={800}
            height={600}
            quality={75}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
```

---

## **Common Mistakes to Avoid**

❌ **Using plain `<img>` tags**
```tsx
// DON'T DO THIS
<img src="/product.jpg" alt="product" />
```

✅ **Use OptimizedImage component**
```tsx
// DO THIS
<OptimizedImage
  src="/product.webp"
  alt="Stainless steel 304 enclosure with IP65 rating for electrical control panels"
  width={800}
  height={600}
/>
```

❌ **Generic alt text**
```tsx
alt="image" // ❌
alt="photo" // ❌
alt="product" // ❌
```

✅ **Descriptive alt text**
```tsx
alt="Heavy-duty L-bracket made from Q235 carbon steel with 500kg load capacity" // ✅
```

❌ **Not setting priority for hero images**
```tsx
<OptimizedImage src="/hero.webp" ... /> // Lazy loaded by default
```

✅ **Set priority for LCP images**
```tsx
<OptimizedImage src="/hero.webp" priority={true} ... /> // Eager loaded
```

---

## **Future Enhancements**

Planned image optimization features:
- [ ] Automatic WebP conversion during build
- [ ] File size validation (fail build if >200 KB)
- [ ] Alt text keyword analysis
- [ ] Automatic responsive image generation
- [ ] Image CDN integration (Cloudflare/Vercel)
- [ ] AVIF format support (next-gen)

---

## **Resources**

- **Next.js Image Optimization:** https://nextjs.org/docs/app/building-your-application/optimizing/images
- **WebP Converter (Squoosh):** https://squoosh.app/
- **Lighthouse CI:** https://github.com/GoogleChrome/lighthouse-ci
- **WCAG Image Alt Text Guidelines:** https://www.w3.org/WAI/tutorials/images/

---

**Last Updated:** 2025-11-01
**Version:** 1.0.0
**Status:** Production Ready
