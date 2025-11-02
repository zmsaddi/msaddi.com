# Quick Image Download Guide

## Immediate Solution: Free Stock Images

I recommend these FREE high-quality images from Unsplash:

### Option 1: Quick Download Links (Unsplash - Free for Commercial Use)

Visit these direct links and download:

1. **Home Page Hero** - Metal fabrication workshop
   - Search: https://unsplash.com/s/photos/metal-workshop
   - Suggested: Look for images showing workshop floor with equipment
   - Save as: `msaddi-metal-fabrication-workshop-hero.jpg`

2. **Services Page** - Laser cutting operation
   - Search: https://unsplash.com/s/photos/laser-cutting
   - Suggested: Images with visible laser/cutting operation
   - Save as: `msaddi-services-industrial-workshop.jpg`

3. **About Page** - Company facility
   - Search: https://unsplash.com/s/photos/industrial-factory
   - Suggested: Broad workshop view or team shots
   - Save as: `msaddi-about-company-history.jpg`

4. **Contact Page** - Workshop facility
   - Search: https://unsplash.com/s/photos/metal-factory
   - Suggested: Professional, inviting workshop view
   - Save as: `msaddi-contact-workshop-facility.jpg`

## How to Add Images

### Step 1: Download Images
1. Visit the Unsplash links above
2. Download images at highest resolution (usually "Download free" button)
3. Images will download to your Downloads folder

### Step 2: Optimize Images (Optional but Recommended)

**Online Tool (Easiest):**
1. Go to https://squoosh.app
2. Upload each image
3. Set quality to 85%
4. Resize to 1920px width
5. Download optimized version

**Or use TinyPNG:**
1. Go to https://tinypng.com
2. Upload images
3. Download compressed versions

### Step 3: Copy to Project
Copy all 4 images to: `D:\msaddi\msaddi-website\public\images\`

The final structure should be:
```
public/
  images/
    msaddi-metal-fabrication-workshop-hero.jpg
    msaddi-services-industrial-workshop.jpg
    msaddi-about-company-history.jpg
    msaddi-contact-workshop-facility.jpg
```

## Alternative: Use MSADDI.EST Real Photos

If you have access to MSADDI.EST facility photos:

1. **Transfer photos** from phone/camera to computer
2. **Rename** according to the names above
3. **Optimize** using Squoosh or TinyPNG
4. **Copy** to `public/images/` folder

## Temporary: Website Works Without Images

The website will work fine without images! The MD3 dark overlay will still display with the gradient background. But for the best visual experience, add the images when you can.

## After Adding Images

No code changes needed! The images will automatically appear once you:
1. Add them to the `public/images/` folder
2. Refresh your browser

The website checks these paths:
- `/images/msaddi-metal-fabrication-workshop-hero.jpg` (Home)
- `/images/msaddi-services-industrial-workshop.jpg` (Services)
- `/images/msaddi-about-company-history.jpg` (About)
- `/images/msaddi-contact-workshop-facility.jpg` (Contact)
