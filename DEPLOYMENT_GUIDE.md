# Deployment Guide

Complete step-by-step guide to deploy the MSADDI website to production.

---

## 🎯 Pre-Deployment Requirements

### Required Accounts

1. ✅ **Hosting Provider** (Vercel recommended)
2. ⏳ **Google Analytics 4**
3. ⏳ **Google Tag Manager**
4. ⏳ **Google Search Console**
5. ⏳ **SMTP Email Service** (Gmail or SendGrid)
6. ⏳ **Domain** (msaddi.com)

---

## 📋 Step-by-Step Deployment

### Step 1: Create Analytics Accounts

#### 1.1 Google Analytics 4 (GA4)

1. Go to: https://analytics.google.com/
2. Click "Admin" → "Create Property"
3. Property name: `MSADDI Metal Fabrication`
4. Timezone: `Damascus (Syria)`
5. Currency: `USD`
6. Industry: `Manufacturing`
7. Business size: `Small` or appropriate size
8. Create property
9. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

#### 1.2 Google Tag Manager (GTM)

1. Go to: https://tagmanager.google.com/
2. Click "Create Account"
3. Account name: `MSADDI EST`
4. Country: `Syria`
5. Container name: `msaddi.com`
6. Target platform: `Web`
7. Create container
8. **Copy your Container ID** (format: `GTM-XXXXXXX`)

#### 1.3 Google Search Console (GSC)

1. Go to: https://search.google.com/search-console
2. Click "Add Property"
3. Choose "URL prefix": `https://www.msaddi.com`
4. Add property
5. Choose verification method: "HTML tag"
6. **Copy verification code** (the long string after `content=`)

---

### Step 2: Configure SMTP Email

#### Option A: Gmail (Easiest for Testing)

1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to: https://myaccount.google.com/apppasswords
4. Create App Password:
   - App: `Mail`
   - Device: `Other (Custom name)` → `MSADDI Website`
5. **Copy the 16-character password**

Your SMTP settings:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App Password
```

#### Option B: SendGrid (Recommended for Production)

1. Go to: https://sendgrid.com/
2. Create free account (100 emails/day)
3. Go to Settings → API Keys
4. Create API Key
5. **Copy API Key**

Your SMTP settings:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxx  # API Key
```

---

### Step 3: Configure Environment Variables

1. **Copy the example file:**
   ```bash
   cd d:\msaddi\company-website
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your real values:

```env
# ============================================================================
# SMTP Configuration
# ============================================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
SMTP_FROM="MSADDI EST. <noreply@msaddi.com>"

RFQ_EMAIL=Sales@msaddi.com

# ============================================================================
# Google Analytics 4 (GA4)
# ============================================================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Replace with your ID

# ============================================================================
# Google Tag Manager (GTM)
# ============================================================================
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Replace with your ID

# ============================================================================
# Google Search Console (GSC)
# ============================================================================
NEXT_PUBLIC_GSC_VERIFICATION=abc123xyz456  # Replace with your code

# ============================================================================
# Production Domain
# ============================================================================
NEXT_PUBLIC_DOMAIN=msaddi.com
NEXT_PUBLIC_SITE_URL=https://www.msaddi.com

# ============================================================================
# Contact Information
# ============================================================================
NEXT_PUBLIC_PHONE=+963 944 244 604
NEXT_PUBLIC_EMAIL_SALES=Sales@msaddi.com
NEXT_PUBLIC_EMAIL_INFO=info@msaddi.com
NEXT_PUBLIC_ADDRESS=Alshqaeef, Aleppo, Syria

# ============================================================================
# WhatsApp
# ============================================================================
NEXT_PUBLIC_WHATSAPP=+963944244604
```

3. **Save the file**

---

### Step 4: Test Locally

1. **Build the project:**
   ```bash
   cd d:\msaddi\company-website
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Test in browser:**
   - Open: http://localhost:3000/en
   - Test RFQ form submission
   - Check console for analytics events
   - Verify WhatsApp button works
   - Test language switching
   - Try all pages

4. **Check email delivery:**
   - Submit RFQ form
   - Check if email received at `Sales@msaddi.com`
   - Check if customer confirmation sent

5. **Verify analytics:**
   - Open GA4 → Realtime
   - Should see your test visit
   - Submit RFQ → Check for `rfq_conversion` event

---

### Step 5: Deploy to Vercel

#### 5.1 Create Vercel Account

1. Go to: https://vercel.com/signup
2. Sign up with GitHub (recommended)
3. Authorize Vercel

#### 5.2 Push Code to GitHub

```bash
cd d:\msaddi\company-website

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Phase 1 completion - Production ready"

# Create GitHub repository
# Go to: https://github.com/new
# Repository name: msaddi-website
# Make it private
# Create repository

# Add remote
git remote add origin https://github.com/YOUR-USERNAME/msaddi-website.git

# Push
git push -u origin main
```

#### 5.3 Import to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./company-website`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

5. **Add Environment Variables:**
   Click "Environment Variables" → Add each variable from `.env.local`:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxxxxxxxxxx
   SMTP_FROM="MSADDI EST. <noreply@msaddi.com>"
   RFQ_EMAIL=Sales@msaddi.com

   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_GSC_VERIFICATION=abc123xyz456

   NEXT_PUBLIC_DOMAIN=msaddi.com
   NEXT_PUBLIC_SITE_URL=https://www.msaddi.com

   NEXT_PUBLIC_PHONE=+963 944 244 604
   NEXT_PUBLIC_EMAIL_SALES=Sales@msaddi.com
   NEXT_PUBLIC_EMAIL_INFO=info@msaddi.com
   NEXT_PUBLIC_ADDRESS=Alshqaeef, Aleppo, Syria
   NEXT_PUBLIC_WHATSAPP=+963944244604
   ```

6. Click "Deploy"

7. **Wait for deployment** (~3-5 minutes)

---

### Step 6: Configure Custom Domain

#### 6.1 Add Domain to Vercel

1. Go to Project Settings → Domains
2. Add domain: `msaddi.com`
3. Add domain: `www.msaddi.com`
4. Vercel will provide DNS records

#### 6.2 Configure DNS

Go to your domain registrar (where you bought msaddi.com):

**For Cloudflare:**
1. Go to DNS → Records
2. Add A record:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21  # Vercel's IP
   Proxy: DNS only (gray cloud)
   ```
3. Add CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   Proxy: DNS only (gray cloud)
   ```

**For other registrars:**
Follow the DNS instructions provided by Vercel.

#### 6.3 Wait for DNS Propagation

- Usually takes 10 minutes to 48 hours
- Check status at: https://www.whatsmydns.net/

---

### Step 7: Verify Google Search Console

1. Go to: https://search.google.com/search-console
2. Select your property: `https://www.msaddi.com`
3. Click "Verify"
4. Verification method: "HTML tag" (already in code)
5. Click "Verify" button
6. ✅ Should show "Ownership verified"

---

### Step 8: Configure Google Tag Manager

1. Go to: https://tagmanager.google.com/
2. Select your container
3. Add Tags:

#### Tag 1: GA4 Configuration

- Type: `Google Analytics: GA4 Configuration`
- Measurement ID: `G-XXXXXXXXXX` (your GA4 ID)
- Trigger: `All Pages`
- Save

#### Tag 2: RFQ Conversion

- Type: `Google Analytics: GA4 Event`
- Configuration Tag: Select your GA4 Configuration tag
- Event Name: `rfq_conversion`
- Trigger: Custom Event → Event name equals `rfq_conversion`
- Save

4. **Submit Container:**
   - Click "Submit" (top right)
   - Version name: `Initial Launch`
   - Description: `GA4 + RFQ Conversion tracking`
   - Publish

---

### Step 9: Post-Deployment Testing

#### 9.1 Functional Testing

- [ ] Site loads: https://www.msaddi.com
- [ ] All pages accessible
- [ ] Language switcher works (ar/en/tr)
- [ ] RFQ form loads
- [ ] RFQ submission works
- [ ] Email received (Sales@msaddi.com)
- [ ] Customer confirmation email received
- [ ] WhatsApp button opens chat
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SSL certificate active (https)

#### 9.2 Analytics Testing

1. **GA4 Realtime:**
   - Go to: GA4 → Reports → Realtime
   - Visit your site
   - Should see 1 active user
   - Submit RFQ → Should see `rfq_conversion` event

2. **GTM Preview:**
   - Go to: GTM → Preview
   - Enter: https://www.msaddi.com
   - Connect
   - Check tags firing:
     - ✅ GA4 Configuration (All Pages)
     - ✅ RFQ Conversion (after form submission)

3. **GSC Status:**
   - Go to: GSC → Overview
   - Should show "Verified"
   - Submit sitemap: `https://www.msaddi.com/sitemap.xml`

#### 9.3 Performance Testing

1. **Lighthouse (Chrome DevTools):**
   ```
   1. Open site in Chrome
   2. Press F12 (DevTools)
   3. Go to Lighthouse tab
   4. Select "Mobile"
   5. Select all categories
   6. Click "Analyze page load"
   ```

   **Expected Scores:**
   - Performance: ≥95
   - Accessibility: ≥95
   - Best Practices: ≥95
   - SEO: ≥90

2. **PageSpeed Insights:**
   - Go to: https://pagespeed.web.dev/
   - Enter: https://www.msaddi.com
   - Analyze
   - Check Core Web Vitals

3. **WebPageTest:**
   - Go to: https://www.webpagetest.org/
   - Enter: https://www.msaddi.com
   - Location: Choose nearest
   - Run Test

---

### Step 10: Monitor & Maintain

#### Daily (First Week)

- [ ] Check GA4 Realtime for traffic
- [ ] Monitor RFQ submissions
- [ ] Check email delivery
- [ ] Review error logs (Vercel Dashboard)
- [ ] Test critical user flows

#### Weekly

- [ ] Review GA4 reports
- [ ] Check Core Web Vitals (GSC)
- [ ] Review RFQ conversions
- [ ] Test on different devices
- [ ] Check for console errors

#### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Review security advisories
- [ ] Run Lighthouse audit
- [ ] Check GSC performance
- [ ] Review analytics goals

---

## 🔥 Troubleshooting

### Issue: Build Fails on Vercel

**Solution:**
1. Check build logs in Vercel Dashboard
2. Ensure all environment variables are set
3. Try local build: `npm run build`
4. Check Node.js version (should be 18+)

### Issue: Analytics Not Tracking

**Solution:**
1. Check browser console for errors
2. Verify IDs in environment variables
3. Test in incognito mode (disable ad blockers)
4. Check GA4 Realtime (wait 24-48h for reports)

### Issue: Emails Not Sending

**Solution:**
1. Verify SMTP credentials in `.env.local`
2. Check spam folder
3. Test SMTP connection:
   ```javascript
   // Test in Node.js console
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({...});
   await transporter.verify();
   ```
4. Check Vercel logs for errors

### Issue: Domain Not Working

**Solution:**
1. Check DNS propagation: https://www.whatsmydns.net/
2. Wait 24-48 hours
3. Verify DNS records match Vercel's instructions
4. Clear browser cache
5. Try different browser/device

### Issue: Low Lighthouse Score

**Solution:**
1. Check Network tab (slow resources)
2. Test on fast connection
3. Clear cache and hard reload
4. Check for console errors
5. Review [PERFORMANCE_OPTIMIZATIONS.md](PERFORMANCE_OPTIMIZATIONS.md)

---

## 📊 Success Metrics

### Week 1 Targets

- [ ] Site uptime: 99.9%
- [ ] Lighthouse Performance: ≥90
- [ ] RFQ submissions: ≥1
- [ ] Zero critical errors
- [ ] Page load time: <3s

### Month 1 Targets

- [ ] Lighthouse Performance: ≥95
- [ ] RFQ submissions: ≥10
- [ ] Email delivery rate: 100%
- [ ] Core Web Vitals: All green
- [ ] GSC impressions: ≥100

### Quarter 1 Targets

- [ ] Monthly visitors: ≥1,000
- [ ] RFQ conversion rate: ≥2%
- [ ] Organic traffic: ≥30%
- [ ] Average engagement: ≥2min
- [ ] Return visitors: ≥20%

---

## 🆘 Getting Help

**Documentation:**
- [PHASE_1_COMPLETION.md](PHASE_1_COMPLETION.md) - Complete phase report
- [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) - Analytics configuration
- [PERFORMANCE_OPTIMIZATIONS.md](PERFORMANCE_OPTIMIZATIONS.md) - Performance guide

**External Resources:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GA4 Help: https://support.google.com/analytics
- GTM Help: https://support.google.com/tagmanager
- GSC Help: https://support.google.com/webmasters

**Support:**
- Vercel Support: https://vercel.com/support
- Technical Issues: [your-email@msaddi.com](mailto:your-email@msaddi.com)

---

## ✅ Deployment Checklist

### Pre-Deployment
- [x] Code complete and tested
- [x] Build succeeds locally
- [x] Documentation complete
- [ ] Analytics accounts created
- [ ] SMTP credentials obtained
- [ ] Environment variables prepared
- [ ] Domain DNS access confirmed

### Deployment
- [ ] `.env.local` configured
- [ ] Local testing passed
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Custom domain configured
- [ ] DNS records updated

### Post-Deployment
- [ ] Site accessible via domain
- [ ] SSL certificate active
- [ ] All pages load correctly
- [ ] RFQ form works
- [ ] Email delivery confirmed
- [ ] GA4 tracking verified
- [ ] GTM tags firing
- [ ] GSC ownership verified
- [ ] Sitemap submitted
- [ ] Lighthouse audit passed
- [ ] Monitoring set up

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Production URL:** https://www.msaddi.com
**Status:** [ ] Success [ ] Issues

---

**Good luck with your deployment!** 🚀

If you encounter any issues, refer to the troubleshooting section or contact support.
