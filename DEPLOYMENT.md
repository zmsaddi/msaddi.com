# دليل النشر - MSADDI Website

## الطريقة 1: Vercel (الأسهل)

### 1. التحضير
```bash
npm run build  # اختبار البناء محلياً
```

### 2. النشر
```bash
npx vercel
npx vercel --prod
```

### 3. Environment Variables
أضف في Vercel Dashboard:
```
NEXT_PUBLIC_SITE_URL=https://www.msaddi.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@msaddi.com
EMAIL_TO=info@msaddi.com
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## الطريقة 2: Netlify

### 1. Build Settings
```
Build command: npm run build
Publish directory: .next
```

### 2. next.config.ts
أضف:
```typescript
output: 'standalone'
```

## الطريقة 3: Docker

### 1. إنشاء Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### 2. البناء
```bash
docker build -t msaddi-website .
docker run -p 3000:3000 msaddi-website
```

## ✅ Checklist قبل النشر

- [ ] تم اختبار البناء محلياً
- [ ] جميع الاختبارات تعمل
- [ ] Environment variables محدثة
- [ ] SMTP مُعد بشكل صحيح
- [ ] Google Analytics مُعد
- [ ] Sentry مُعد (اختياري)
- [ ] Domain متصل بشكل صحيح

## 🔧 بعد النشر

1. اختبر جميع الصفحات
2. اختبر نموذج RFQ
3. تحقق من Analytics
4. تحقق من RSS feeds
5. اختبر PWA installation

---

**النشر جاهز! 🚀**
