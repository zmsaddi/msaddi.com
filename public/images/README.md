# Industrial Background Images for MSADDI.EST

This directory contains hero section background images for the website.

## Required Images

### 1. Home Page Hero
**Filename:** `msaddi-metal-fabrication-workshop-hero.jpg`
**Specifications:**
- Minimum width: 1920px
- Aspect ratio: 16:9 or wider
- Subject: Metal fabrication workshop floor with machinery
- Lighting: Good ambient lighting showing equipment
- Atmosphere: Professional, industrial, active workspace

### 2. Services Page Hero
**Filename:** `msaddi-services-industrial-workshop.jpg`
**Specifications:**
- Minimum width: 1920px
- Aspect ratio: 16:9 or wider
- Subject: Laser cutting machine in operation or CNC equipment
- Lighting: Focused on equipment with sparks/cutting visible
- Atmosphere: High-tech, precision manufacturing

### 3. About Page Hero
**Filename:** `msaddi-about-company-history.jpg`
**Specifications:**
- Minimum width: 1920px
- Aspect ratio: 16:9 or wider
- Subject: Workshop overview or team working with equipment
- Lighting: Natural or professional lighting
- Atmosphere: Established, professional, experienced

### 4. Contact Page Hero
**Filename:** `msaddi-contact-workshop-facility.jpg`
**Specifications:**
- Minimum width: 1920px
- Aspect ratio: 16:9 or wider
- Subject: Facility exterior/interior or welcoming workshop view
- Lighting: Bright, inviting
- Atmosphere: Accessible, professional, modern

## Image Requirements

### Technical Specifications
- **Format:** JPG (optimized for web)
- **Width:** Minimum 1920px (2560px recommended for retina displays)
- **File Size:** 100-300KB after optimization (use compression)
- **Quality:** High resolution, sharp focus
- **Color Profile:** sRGB

### Content Guidelines
- **Dark Background Areas:** Images should have darker areas suitable for white text overlay
- **Subject Position:** Main subject should allow for centered text overlay
- **No Text:** Images should not contain text or watermarks
- **Professional Quality:** Industrial photography quality, not stock photos
- **Relevant to Metal Fabrication:** Must show metalworking, fabrication, or industrial equipment

## Color Overlay
All images will have a dark MD3 overlay applied:
- Gradient: `from-secondary/90 via-secondary/85 to-primary/80`
- Colors: Black (#0D1116) to Blue (#007BFF)
- This ensures white text is readable regardless of background image

## Where to Find Images

### Option 1: Stock Photography (Free)
- **Unsplash:** https://unsplash.com/s/photos/metal-fabrication
- **Pexels:** https://www.pexels.com/search/industrial-workshop/
- **Pixabay:** https://pixabay.com/images/search/metal-workshop/

Search terms:
- "metal fabrication"
- "laser cutting workshop"
- "industrial metalwork"
- "CNC machining"
- "sheet metal factory"

### Option 2: Your Own Photos
- Take photos of MSADDI.EST facility
- Hire professional industrial photographer
- Use photos from company archives

### Option 3: Paid Stock Photography
- **Adobe Stock:** https://stock.adobe.com
- **Shutterstock:** https://www.shutterstock.com
- **iStock:** https://www.istockphoto.com

## Image Optimization

Before adding images, optimize them:

```bash
# Using ImageMagick (install: apt-get install imagemagick)
magick input.jpg -resize 1920x -quality 85 output.jpg

# Using online tools:
# - TinyPNG: https://tinypng.com
# - Squoosh: https://squoosh.app
# - Optimizilla: https://imagecompressor.com
```

## Current Status
- ⏳ **Home Page:** `msaddi-metal-fabrication-workshop-hero.jpg` - NEEDED
- ⏳ **Services:** `msaddi-services-industrial-workshop.jpg` - NEEDED
- ⏳ **About:** `msaddi-about-company-history.jpg` - NEEDED
- ⏳ **Contact:** `msaddi-contact-workshop-facility.jpg` - NEEDED

## Notes
- Images will display correctly even if files are missing (fallback to overlay only)
- Test images with dark overlay to ensure text readability
- Ensure images are properly licensed for commercial use
