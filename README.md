# MSADDI.EST Website

Professional metal fabrication company website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Project Status

### ✅ Completed
- Next.js 14 project setup with TypeScript
- Tailwind CSS configuration with brand colors
- Multi-language support (English, Arabic, Turkish) with separated i18n files
- Dark mode implementation with persistence
- Header and Footer components
- Project structure and essential configurations
- SEO setup in layout
- Google Analytics integration

### 🔄 In Progress
- Home page sections (Hero, About, Services, etc.)
- Service pages
- Contact form implementation
- Animations with Framer Motion

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Email Configuration
RESEND_API_KEY=re_HrFdcUcy_QJaGPcN8qZuPEVKuJLdketis
EMAIL_FROM=noreply@msaddi.com
EMAIL_TO=info@msaddi.com

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lfp1P4rAAAAADCVpBBigSb7EeYc0uO69EwD8fMv
RECAPTCHA_SECRET_KEY=6Lfp1P4rAAAAAA3WrHYtZ-64iQEdkVixs5f18lWZ

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9F1ZWNTMF2

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.msaddi.com
```

## 📁 Project Structure

```
msaddi-website/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Home)
│   │   ├── services/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── api/
│   │   ├── contact/route.ts
│   │   └── sitemap/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   └── home/
│   ├── ui/
│   │   ├── theme-switcher.tsx
│   │   └── language-switcher.tsx
│   └── providers/
│       └── theme-provider.tsx
├── locales/
│   ├── en/
│   ├── ar/
│   └── tr/
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── public/
    └── logo.png
```

## 🌐 Multi-language Support

All text content is stored in separate JSON files for easy modification:
- `/locales/en/` - English translations
- `/locales/ar/` - Arabic translations
- `/locales/tr/` - Turkish translations

Each page has its own translation file:
- `common.json` - Navigation, footer, buttons
- `home.json` - Home page content
- `services.json` - Services page content
- `about.json` - About page content
- `contact.json` - Contact page content

To modify text:
1. Navigate to `/locales/[language]/[page].json`
2. Edit the JSON values
3. Save and refresh

## 🎨 Brand Colors

- Primary (Laser Blue): `#0078D7`
- Metal Gray: `#5E5E5E`
- Metal Light: `#B0B0B0`
- Dark Base: `#23282A`
- Light Neutral: `#E9E9E9`
- Silver Accent: `#9FA3A7`

## 📝 Git Commands

```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit - MSADDI.EST website"
git branch -M main
git remote add origin https://github.com/zmsaddi/msaddi.com.git
git push -u origin main
```

## 🚀 Deployment to Vercel

1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## 📧 Contact Form Configuration

The contact form uses Resend for email delivery. Make sure to:
1. Verify your domain in Resend dashboard
2. Update the API key in environment variables
3. Test the contact form after deployment

## 🔧 Development Notes

- All components use TypeScript with strict mode
- Zero hard-coded texts - everything is in i18n files
- Responsive breakpoints: Mobile (320-767px), Tablet (768-1199px), Desktop (1200px+)
- Dark mode with system preference detection
- RTL support for Arabic language
- Performance optimized with lazy loading and code splitting

## 📱 Testing Checklist

- [ ] Test all pages in English, Arabic, and Turkish
- [ ] Verify dark mode toggle works
- [ ] Test responsive design on all devices
- [ ] Verify contact form sends emails
- [ ] Check all links work correctly
- [ ] Test RTL layout in Arabic
- [ ] Verify Google Analytics tracking
- [ ] Run Lighthouse audit (target: 95+ score)

## 🛠 Maintenance

To update content:
- Text: Edit files in `/locales/`
- Images: Replace files in `/public/`
- Styles: Modify `tailwind.config.ts` or `globals.css`
- Components: Edit files in `/components/`

## 📞 Support

For any issues or questions:
- Email: info@msaddi.com
- Phone: +963 944 244 604