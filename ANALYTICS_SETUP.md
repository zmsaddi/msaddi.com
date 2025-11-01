# Analytics Setup Guide

Complete guide to setting up Google Analytics 4, Google Tag Manager, and Google Search Console for the MSADDI website.

---

## 📊 Overview

The website includes comprehensive analytics tracking:
- **Google Analytics 4 (GA4)**: Page views, events, conversions
- **Google Tag Manager (GTM)**: Centralized tag management
- **Google Search Console (GSC)**: Search performance tracking
- **Event Tracking**: RFQ submissions, WhatsApp clicks, file uploads, etc.

---

## 🚀 Quick Setup

### Step 1: Create Accounts

1. **Google Analytics 4**
   - Go to: https://analytics.google.com/
   - Create new property
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Google Tag Manager**
   - Go to: https://tagmanager.google.com/
   - Create new container
   - Copy your Container ID (format: `GTM-XXXXXXX`)

3. **Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add property: `https://www.msaddi.com`
   - Choose verification method

---

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your IDs:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Search Console
NEXT_PUBLIC_GSC_VERIFICATION=your-verification-code

# Optional: Enable analytics in development
NEXT_PUBLIC_GA_DEBUG=true
NEXT_PUBLIC_GTM_DEBUG=true
```

---

### Step 3: Verify Installation

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Test in browser**:
   - Open: http://localhost:3000/en
   - Open DevTools Console
   - Check for: `[GA4 Event]` logs (if debug enabled)

4. **Verify in GA4 Realtime**:
   - Go to GA4 → Reports → Realtime
   - You should see your visit

---

## 📈 Tracked Events

### RFQ Events
- `rfq_start`: User starts filling RFQ form
- `rfq_submit`: User submits RFQ form
- `rfq_success`: RFQ successfully processed
- `rfq_error`: RFQ submission failed

**Data tracked:**
- Service type
- Material selected
- Quantity
- Timeline
- Value (quantity as proxy)

### Contact Events
- `whatsapp_click`: WhatsApp button clicked
- `phone_click`: Phone number clicked
- `email_click`: Email address clicked
- `contact_form_submit`: Contact form submitted

### File Events
- `file_upload`: CAD/PDF file uploaded
  - File name
  - File size
  - File type

### Navigation Events
- `language_change`: User changes language
  - From language
  - To language

### Engagement Events
- `service_view`: User views service page
- `product_view`: User views product page
- `scroll_depth`: User scrolls to depth milestone

---

## 🎯 Conversion Tracking

### RFQ Conversion (Primary Goal)

**Event**: `rfq_conversion`

**Data Layer Push**:
```javascript
{
  event: 'rfq_conversion',
  rfq_id: 'RFQ-1234567890',
  service: 'laser-cutting',
  material: 'stainless-304',
  quantity: 100,
  value: 100,
  currency: 'USD'
}
```

**To track as conversion in GA4:**
1. Go to GA4 → Configure → Events
2. Find `rfq_conversion` event
3. Click "Mark as conversion"

---

## 🏷️ Google Tag Manager Setup

### Recommended GTM Tags

1. **GA4 Configuration Tag**
   - Type: Google Analytics: GA4 Configuration
   - Measurement ID: `{{GA4 Measurement ID}}` (variable)
   - Trigger: All Pages

2. **RFQ Conversion Tag**
   - Type: Google Analytics: GA4 Event
   - Event Name: `rfq_conversion`
   - Trigger: Custom Event = `rfq_conversion`

3. **Facebook Pixel** (Optional)
   - Type: Custom HTML
   - Add Facebook Pixel code
   - Trigger: All Pages

4. **LinkedIn Insight** (Optional)
   - Type: LinkedIn Insight
   - Partner ID: Your LinkedIn ID
   - Trigger: All Pages

### GTM Variables

Create these variables:

| Variable Name | Type | Value |
|--------------|------|-------|
| GA4 Measurement ID | Constant | `G-XXXXXXXXXX` |
| GTM Container ID | Constant | `GTM-XXXXXXX` |
| Page URL | Built-in | Page URL |
| Page Path | Built-in | Page Path |

---

## 🔍 Google Search Console Verification

### Method 1: HTML Meta Tag (Recommended)

Already configured! Just add verification code to `.env.local`:

```env
NEXT_PUBLIC_GSC_VERIFICATION=abc123xyz456
```

The meta tag is automatically added to all pages:
```html
<meta name="google-site-verification" content="abc123xyz456" />
```

### Method 2: HTML File Upload

1. Download verification file from GSC
2. Save to: `public/google[xxxxx].html`
3. Verify in GSC

### Method 3: DNS TXT Record

1. Go to your domain registrar
2. Add TXT record:
   ```
   google-site-verification=abc123xyz456
   ```
3. Verify in GSC

---

## 📊 Custom Dimensions (Optional)

### Recommended User Properties

Set up these in GA4:

1. **User Language**
   - Name: `user_language`
   - Scope: User
   - Values: `ar`, `en`, `tr`

2. **User Industry** (from RFQ)
   - Name: `user_industry`
   - Scope: User
   - Values: Free text

3. **User Type**
   - Name: `user_type`
   - Scope: User
   - Values: `new`, `returning`

### Recommended Event Parameters

1. **Service Type**
   - Name: `service`
   - Values: `laser-cutting`, `bending-forming`, etc.

2. **Material Type**
   - Name: `material`
   - Values: `stainless-304`, `aluminum-5052`, etc.

3. **RFQ Value**
   - Name: `value`
   - Type: Number

---

## 🛠️ Custom Event Tracking

### Example: Track Custom Button Click

```typescript
import { trackEvent, GA_EVENTS } from '@/components/analytics/GoogleAnalytics';

function MyButton() {
  const handleClick = () => {
    trackEvent(GA_EVENTS.CLICK_BUTTON, {
      category: 'engagement',
      label: 'download_brochure',
      button_name: 'Download Brochure',
    });
  };

  return <button onClick={handleClick}>Download</button>;
}
```

### Example: Track Page Section View

```typescript
import { useEffect } from 'react';
import { trackEvent } from '@/components/analytics/GoogleAnalytics';

function ServicesSection() {
  useEffect(() => {
    trackEvent('section_view', {
      category: 'content',
      section_name: 'services',
    });
  }, []);

  return <div>...</div>;
}
```

---

## 🧪 Testing & Debugging

### Development Mode

Analytics are disabled in development by default. To enable:

```env
NEXT_PUBLIC_GA_DEBUG=true
NEXT_PUBLIC_GTM_DEBUG=true
```

Console will show:
```
[GA4 Event] rfq_submit { service: 'laser-cutting', ... }
[GTM DataLayer] { event: 'rfq_conversion', ... }
```

### Production Testing

1. **GA4 DebugView**
   - Go to: GA4 → Configure → DebugView
   - Install Chrome extension: "Google Analytics Debugger"
   - Enable extension
   - Visit site
   - See events in real-time

2. **GTM Preview Mode**
   - Go to GTM → Preview
   - Enter site URL
   - Click "Connect"
   - See all tags firing in real-time

3. **Chrome DevTools**
   - Open: DevTools → Network tab
   - Filter: `google-analytics.com` or `googletagmanager.com`
   - Check requests

---

## 🎯 Key Metrics to Monitor

### Daily Monitoring

1. **RFQ Conversions**
   - Target: 5-10 per week initially
   - Check: GA4 → Reports → Conversions

2. **WhatsApp Clicks**
   - Target: 10-20 per week
   - Check: GA4 → Reports → Events → `whatsapp_click`

3. **Page Views**
   - Most viewed: Home, Services, Products
   - Check: GA4 → Reports → Pages and screens

### Weekly Monitoring

1. **Traffic Sources**
   - Organic search %
   - Direct traffic %
   - Referral traffic
   - Check: GA4 → Reports → Acquisition

2. **User Engagement**
   - Average engagement time
   - Bounce rate
   - Pages per session
   - Check: GA4 → Reports → Engagement

3. **Search Performance** (GSC)
   - Impressions
   - Clicks
   - CTR
   - Average position
   - Check: GSC → Performance

---

## 🔒 Privacy & GDPR Compliance

### Current Implementation

✅ IP Anonymization enabled
✅ Cookie flags set (`SameSite=None;Secure`)
✅ 2-year cookie expiration
✅ No PII collected without consent

### For EU Users (Optional)

If targeting EU users, implement cookie consent:

1. **Install cookie consent library**:
   ```bash
   npm install react-cookie-consent
   ```

2. **Add consent banner**:
   ```tsx
   import CookieConsent from 'react-cookie-consent';

   <CookieConsent
     onAccept={() => {
       // Enable analytics
     }}
   >
     We use cookies for analytics...
   </CookieConsent>
   ```

---

## 📚 Additional Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GTM Documentation](https://support.google.com/tagmanager/answer/6102821)
- [GSC Documentation](https://support.google.com/webmasters/answer/9128668)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## ✅ Checklist

- [ ] Create GA4 property
- [ ] Create GTM container
- [ ] Add property to GSC
- [ ] Configure `.env.local` with all IDs
- [ ] Build and deploy site
- [ ] Verify GA4 receiving data (Realtime)
- [ ] Verify GTM tags firing (Preview mode)
- [ ] Verify GSC ownership
- [ ] Mark `rfq_conversion` as conversion in GA4
- [ ] Set up custom dimensions (optional)
- [ ] Configure conversion goals in GTM
- [ ] Test all tracked events
- [ ] Monitor first week of data
- [ ] Set up weekly reports/alerts

---

## 🆘 Troubleshooting

### Analytics not working

1. Check `.env.local` has correct IDs
2. Verify IDs format:
   - GA4: `G-XXXXXXXXXX`
   - GTM: `GTM-XXXXXXX`
3. Check browser console for errors
4. Disable ad blockers
5. Try incognito mode

### Events not showing in GA4

1. Wait 24-48 hours (processing delay)
2. Check DebugView (real-time)
3. Verify event names match exactly
4. Check if events are marked as conversions

### GTM tags not firing

1. Enter Preview mode
2. Check triggers configured correctly
3. Verify variables populated
4. Check tag firing order

---

**Need Help?**

Contact: [your-email@msaddi.com](mailto:your-email@msaddi.com)
