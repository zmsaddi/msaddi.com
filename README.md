# MSADDI EST. - موقع الشركة الإلكتروني

موقع احترافي متعدد اللغات لشركة MSADDI المتخصصة في تصنيع المعادن.

## ✨ المميزات الرئيسية

- 🌐 **8 لغات** (عربي، إنجليزي، تركي + 5 مخفية)
- 📱 **PWA** - يعمل offline وقابل للتثبيت
- 📬 **نموذج RFQ** - مع rate limiting و validation
- 🔒 **أمان عالي** - CSRF, XSS protection
- 🚀 **أداء ممتاز** - 70 صفحة static
- 📊 **SEO محسّن** - Sitemap, Schema.org
- 🧪 **اختبارات شاملة** - Unit, E2E, A11y

## 🚀 البداية السريعة

\`\`\`bash
npm install
npm run dev
\`\`\`

افتح http://localhost:3000

## 📦 البناء

\`\`\`bash
npm run build
npm start
\`\`\`

## 🧪 الاختبار

\`\`\`bash
npm test           # Unit tests
npm run test:e2e   # E2E tests
npm run test:all   # All tests
\`\`\`

## 📁 البنية

\`\`\`
app/[locale]/     # صفحات متعددة اللغات
components/       # مكونات React
lib/              # Utilities
messages/         # ترجمات (261 مفتاح × 8 لغات)
public/           # ملفات ثابتة + PWA
\`\`\`

## 🌍 النشر

انظر [DEPLOYMENT.md](./DEPLOYMENT.md) للتفاصيل الكاملة.

### Vercel (سريع)

\`\`\`bash
vercel --prod
\`\`\`

## ⚙️ Environment Variables

\`\`\`env
NEXT_PUBLIC_SITE_URL=https://www.msaddi.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@msaddi.com
EMAIL_TO=info@msaddi.com
\`\`\`

## 📊 الإحصائيات

- ✅ 70 صفحة
- ✅ 8 لغات
- ✅ 2,088 ترجمة
- ✅ اختبارات شاملة
- ✅ 100% نسبة نجاح
- ✅ Lighthouse 95+

## 🛠 التقنيات

- Next.js 16 + React 19
- TypeScript + Material-UI + Tailwind
- next-intl + Sentry
- Jest + Playwright

## 📞 الاتصال

- **الموقع**: www.msaddi.com
- **البريد**: info@msaddi.com
- **العنوان**: الشقايف، حلب، سوريا

---

**بُني بـ ❤️ لـ MSADDI EST.**

*آخر تحديث: نوفمبر 2025*
