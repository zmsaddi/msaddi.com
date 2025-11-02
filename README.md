# MSADDI.EST - Professional Metal Fabrication Website

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

Modern, multilingual website for MSADDI.EST metal fabrication company specializing in laser cutting, CNC bending, and custom metal fabrication services in Aleppo, Syria.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Internationalization](#internationalization)
- [Security](#security)
- [Performance](#performance)
- [Contributing](#contributing)

---

## Features

### Core Functionality
- **9 Language Support**: English, Arabic, Turkish, French, German, Spanish, Italian, Portuguese, Dutch
- **RTL Support**: Full right-to-left layout for Arabic
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive Design**: Mobile-first approach, optimized for all devices
- **SEO Optimized**: Schema.org structured data, meta tags, sitemap, robots.txt
- **Contact Form**: Spam-protected with Google reCAPTCHA v3
- **Email Integration**: Automated email delivery via Resend
- **Analytics**: Google Analytics 4 with custom event tracking

### Services Showcased
- Laser cutting up to 40mm (6000×2500mm)
- CNC bending 135T/3200mm
- Flanging & dishing services
- Custom metal fabrication

### Technical Highlights
- **Server-Side Security**: Environment variables properly segregated (server-only vs. public)
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Zero Hard-Coded Text**: All content in i18n JSON files
- **Performance**: Lazy loading, code splitting, optimized images
- **Modern Stack**: Next.js 14 App Router, Server Components, Server Actions

---

## Technology Stack

### Frontend
- **Framework**: [Next.js 14.2.16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) - Static typing
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS
- **Animations**: [Framer Motion 11.11](https://www.framer.com/motion/) - React animation library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon set

### Backend & Services
- **Email**: [Resend](https://resend.com/) - Modern email API
- **Spam Protection**: [Google reCAPTCHA v3](https://www.google.com/recaptcha/)
- **Analytics**: [Google Analytics 4](https://analytics.google.com/)
- **Monitoring**: [Vercel Analytics & Speed Insights](https://vercel.com/analytics)

### Development Tools
- **Form Management**: React Hook Form + Zod validation
- **Internationalization**: next-intl - Type-safe i18n
- **Theme Management**: next-themes - Dark mode support
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript compiler

---

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm** or **yarn** or **pnpm**
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zmsaddi/msaddi.com.git
   cd msaddi-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local

   # Edit .env.local and add your API keys
   # See Environment Variables section below
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

This project uses environment variables for API keys and configuration. **All sensitive keys are required** and the build will fail if they're missing.

#### Required Variables

Create a `.env.local` file (never commit this file):

```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=info@yourdomain.com

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

#### Getting API Keys

1. **Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys → Create API Key
   - Verify your domain for production use

2. **Google reCAPTCHA**
   - Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Register a new site (v3)
   - Copy Site Key (public) and Secret Key (private)

3. **Google Analytics**
   - Create property at [Google Analytics](https://analytics.google.com)
   - Copy Measurement ID (format: G-XXXXXXXXXX)

#### Security Notes

- Environment variables are split into two categories:
  - **Server-only** (`lib/env.ts`): Contains sensitive API keys, protected with `server-only` package
  - **Public** (`lib/env-public.ts`): Contains NEXT_PUBLIC_* variables safe for client-side use
- Build will **fail** if required server variables are missing
- Never commit `.env.local` or `.env.production` to version control
- For production deployment, set variables in Vercel Dashboard

---

## Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking without emitting files
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Start production server (after build)
npm start
```

### Development Workflow

1. **Adding new features**: Create components in `/components`, use TypeScript
2. **Updating content**: Edit JSON files in `/locales/[language]/`
3. **Styling**: Use Tailwind utility classes, extend theme in `tailwind.config.ts`
4. **New pages**: Add to `/app/[locale]/` directory
5. **API routes**: Add to `/app/api/` directory

### Code Quality

- **TypeScript strict mode** enforced
- **ESLint** rules from Next.js
- **No hard-coded text** - all strings in i18n files
- **Server-only protection** for sensitive code
- **Type-safe environment variables**

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   - Go to Project → Settings → Environment Variables
   - Add all 7 variables from `.env.example`
   - Select: Production + Preview + Development

4. **Deploy**
   - Click Deploy
   - Your site will be live at `your-project.vercel.app`

5. **Custom Domain**
   - Go to Project → Settings → Domains
   - Add `www.msaddi.com`
   - Update DNS records as instructed

### Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy the .next folder to your hosting provider
```

---

## Project Structure

```
msaddi-website/
├── app/
│   ├── [locale]/               # Locale-based routing
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About page
│   │   ├── services/           # Services pages
│   │   └── contact/            # Contact page
│   ├── api/
│   │   ├── contact/route.ts    # Contact form API endpoint
│   │   └── sitemap/route.ts    # Dynamic sitemap generation
│   ├── layout.tsx              # Root HTML layout
│   ├── globals.css             # Global styles
│   ├── sitemap.ts              # Sitemap configuration
│   └── robots.ts               # Robots.txt configuration
├── components/
│   ├── analytics/
│   │   └── google-analytics.tsx   # GA4 tracking component
│   ├── layout/
│   │   ├── header.tsx             # Site header with navigation
│   │   ├── footer.tsx             # Site footer
│   │   └── language-switcher.tsx  # Language dropdown
│   ├── sections/
│   │   ├── home/                  # Home page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── services-section.tsx
│   │   │   ├── capabilities-section.tsx
│   │   │   ├── why-choose-section.tsx
│   │   │   └── cta-section.tsx
│   │   ├── services/
│   │   │   └── service-grid.tsx   # Services grid component
│   │   └── contact/
│   │       └── contact-form.tsx   # Contact form with reCAPTCHA
│   ├── ui/
│   │   └── theme-switcher.tsx     # Dark mode toggle
│   └── providers/
│       └── theme-provider.tsx     # Theme context provider
├── config/
│   ├── locales.ts              # Locale configuration (9 languages)
│   ├── navigation.ts           # Navigation menu items
│   └── seo.ts                  # SEO metadata and keywords
├── lib/
│   ├── env.ts                  # Server-only environment variables
│   ├── env-public.ts           # Public environment variables
│   ├── gtag.ts                 # Google Analytics utilities
│   └── utils.ts                # Utility functions
├── locales/
│   ├── en/                     # English translations
│   ├── ar/                     # Arabic translations
│   ├── tr/                     # Turkish translations
│   ├── fr/                     # French translations
│   ├── de/                     # German translations
│   ├── es/                     # Spanish translations
│   ├── it/                     # Italian translations
│   ├── pt/                     # Portuguese translations
│   └── nl/                     # Dutch translations
│       └── (common.json, home.json, about.json, services.json, contact.json)
├── public/
│   ├── images/                 # Image assets
│   ├── flags/                  # Country flags for language switcher
│   └── favicon.ico
├── types/
│   └── index.ts                # TypeScript type definitions
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## Internationalization

### Supported Languages

| Code | Language   | Direction | Status      |
|------|------------|-----------|-------------|
| en   | English    | LTR       | Main        |
| ar   | العربية    | RTL       | Main        |
| tr   | Türkçe     | LTR       | Main        |
| fr   | Français   | LTR       | SEO-only    |
| de   | Deutsch    | LTR       | SEO-only    |
| es   | Español    | LTR       | SEO-only    |
| it   | Italiano   | LTR       | SEO-only    |
| pt   | Português  | LTR       | SEO-only    |
| nl   | Nederlands | LTR       | SEO-only    |

**Main languages** appear in the navigation menu.
**SEO-only languages** are accessible via direct URL for search engine indexing.

### Adding/Updating Translations

1. Navigate to `/locales/[language]/`
2. Edit the appropriate JSON file:
   - `common.json` - Navigation, footer, buttons
   - `home.json` - Home page content
   - `about.json` - About page content
   - `services.json` - Services and capabilities
   - `contact.json` - Contact page and form
3. Save and refresh - changes are immediate in development

### RTL Support

Arabic language automatically triggers:
- Right-to-left text direction
- Mirrored layout components
- RTL-aware animations
- Properly oriented icons

---

## Security

### Environment Variable Protection

This project implements strict security for API keys:

1. **Server-Only Module**: `lib/env.ts` uses `server-only` package
   - Prevents client-side imports of server secrets
   - Build fails if imported in client components
   - Contains: RESEND_API_KEY, RECAPTCHA_SECRET_KEY, EMAIL_FROM, EMAIL_TO

2. **Public Module**: `lib/env-public.ts` for client-safe variables
   - Contains only NEXT_PUBLIC_* variables
   - Safe to use in client components
   - Contains: NEXT_PUBLIC_RECAPTCHA_SITE_KEY, NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_SITE_URL

3. **Build-Time Validation**: Build fails if required server variables are missing

### Best Practices

- Never commit `.env.local` or `.env.production`
- Always use environment variables, never hardcode secrets
- Use `lib/env-public.ts` in client components
- Use `lib/env.ts` only in server components and API routes
- Rotate API keys if accidentally exposed

### XSS Prevention

- HTML entity encoding with `he` library
- Form input sanitization
- Content Security Policy headers
- TypeScript strict mode

---

## Performance

### Optimization Features

- **Server Components**: Default rendering strategy
- **Lazy Loading**: Images and heavy components
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: Next.js font optimization
- **Image Optimization**: Next.js Image component with WebP
- **Bundle Analysis**: Tree shaking and minification

### Performance Targets

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### Monitoring

- Vercel Analytics for real user metrics
- Vercel Speed Insights for performance tracking
- Google Analytics 4 for user behavior

---

## Contributing

This is a private commercial project for MSADDI.EST.

### For Team Members

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes with descriptive commits
   ```bash
   git commit -m "Add: new service page component"
   ```

3. Push and create a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

4. Wait for review and approval

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Keep components small and focused
- Write descriptive variable names
- Add comments for complex logic
- Update translations when adding UI text

---

## License

Copyright © 2025 MSADDI.EST. All rights reserved.

This is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

---

## Contact

**MSADDI.EST**
Al-Shaqeef Industrial Zone
Aleppo, Syria

- **Phone**: +963 944 244 604
- **WhatsApp**: +963 944 244 604
- **Email**: info@msaddi.com
- **Website**: [www.msaddi.com](https://www.msaddi.com)

---

**Built with Next.js 14, TypeScript, and Tailwind CSS**
**Deployed on Vercel**
