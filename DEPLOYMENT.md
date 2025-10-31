# 🚀 Vercel Deployment Guide for Msaddi Website

## Automatic Deployment Setup

This project is configured for automatic deployment to Vercel with `vercel.json`.

## Quick Deploy (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zmsaddi/msaddi&env=NEXT_PUBLIC_SITE_URL&project-name=msaddi&repository-name=msaddi)

---

## Manual Deployment Steps

### 1. Deploy to Vercel

#### Option A: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import Git Repository: `zmsaddi/msaddi`
3. Vercel will auto-detect Next.js settings ✅
4. Add Environment Variable:
   ```
   NEXT_PUBLIC_SITE_URL=https://www.msaddi.com
   ```
5. Click **Deploy**

#### Option B: Using Vercel CLI
```bash
npm i -g vercel
cd company-website
vercel login
vercel --prod
```

---

### 2. Configure Custom Domain

#### In Vercel Dashboard:
1. Go to: **Project Settings** > **Domains**
2. Add domains:
   - `msaddi.com`
   - `www.msaddi.com`
3. Set `www.msaddi.com` as **Primary Domain**

#### In Namecheap DNS:
Already configured ✅:
```
A Record:    @     → 76.76.21.21
CNAME:       www   → cname.vercel-dns.com.
```

---

### 3. Environment Variables

Set in Vercel Dashboard > Settings > Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.msaddi.com` | Production |

---

### 4. Automatic Features Enabled

✅ **Auto-deployed from GitHub** (on every push to master)
✅ **SSL Certificate** (automatic via Let's Encrypt)
✅ **Security Headers** (configured in vercel.json)
✅ **Redirects** (msaddi.com → www.msaddi.com)
✅ **Preview Deployments** (for PRs)
✅ **Edge Network** (Global CDN)

---

## Build Settings (Auto-detected)

The `vercel.json` file configures:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

---

## Post-Deployment Checklist

- [ ] Verify all 3 languages work (ar, en, tr)
- [ ] Test RTL/LTR switching
- [ ] Check SSL certificate (https://)
- [ ] Test contact form
- [ ] Verify redirects (msaddi.com → www.msaddi.com)
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Check Security Headers: https://securityheaders.com/?q=www.msaddi.com

---

## DNS Propagation

After adding domains in Vercel:
- **Minimum**: 30-60 minutes (TTL = 30 min)
- **Maximum**: 24-48 hours (rare)
- **Typical**: 1-2 hours

Check DNS propagation:
- https://www.whatsmydns.net/#A/msaddi.com
- https://www.whatsmydns.net/#CNAME/www.msaddi.com

---

## Monitoring & Analytics

Enable in Vercel Dashboard:
- **Analytics**: Track page views, performance
- **Speed Insights**: Monitor Core Web Vitals
- **Logs**: View function logs and errors

---

## Troubleshooting

### Domain not working?
1. Check DNS records in Namecheap
2. Verify domain added in Vercel
3. Wait for DNS propagation (30-60 min)
4. Clear browser cache

### Build failing?
1. Check build logs in Vercel
2. Test locally: `npm run build`
3. Verify all dependencies installed

### SSL not working?
1. Wait 5-10 minutes after domain setup
2. Vercel auto-generates SSL certificates
3. Force refresh: Vercel > Domains > Refresh

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/zmsaddi/msaddi/issues

---

**Last Updated**: 2025-01-11
**Version**: 1.0.0
