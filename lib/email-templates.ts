// Email templates for contact form in multiple languages
export type EmailLocale = 'en' | 'ar' | 'tr';

interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const translations = {
  en: {
    greeting: "Dear",
    thankYou: "Thank You for Contacting Us!",
    received: "We have received your inquiry and appreciate your interest in MSADDI.EST's metal fabrication services. Our team will review your message and get back to you within 24 hours.",
    messageDetails: "Your Message Details:",
    whatNext: "What Happens Next?",
    steps: [
      "Our technical team will review your requirements",
      "We'll prepare a detailed quote based on your specifications",
      "A specialist will contact you to discuss your project"
    ],
    urgent: "If you have any urgent requirements, please feel free to call us directly at:",
    regards: "Best regards,",
    team: "MSADDI.EST Team",
    footer: "© 2024 MSADDI.EST - Leading Metal Fabrication in Syria",
    contact: "Aleppo, Syria | info@msaddi.com | www.msaddi.com"
  },
  ar: {
    greeting: "عزيزي",
    thankYou: "شكراً لتواصلك معنا!",
    received: "لقد استلمنا استفسارك ونقدر اهتمامك بخدمات التصنيع المعدني من MSADDI.EST. سيقوم فريقنا بمراجعة رسالتك والرد عليك خلال 24 ساعة.",
    messageDetails: "تفاصيل رسالتك:",
    whatNext: "ما الخطوات القادمة؟",
    steps: [
      "سيقوم فريقنا الفني بمراجعة متطلباتك",
      "سنقوم بإعداد عرض سعر مفصل بناءً على مواصفاتك",
      "سيتصل بك أحد المتخصصين لمناقشة مشروعك"
    ],
    urgent: "إذا كانت لديك أي متطلبات عاجلة، يرجى الاتصال بنا مباشرة على:",
    regards: "مع أطيب التحيات،",
    team: "فريق MSADDI.EST",
    footer: "© 2024 MSADDI.EST - الريادة في التصنيع المعدني في سوريا",
    contact: "حلب، سوريا | info@msaddi.com | www.msaddi.com"
  },
  tr: {
    greeting: "Sayın",
    thankYou: "Bize Ulaştığınız İçin Teşekkürler!",
    received: "Sorgunuzu aldık ve MSADDI.EST'in metal işleme hizmetlerine olan ilginize değer veriyoruz. Ekibimiz mesajınızı inceleyecek ve 24 saat içinde size geri dönecektir.",
    messageDetails: "Mesaj Detaylarınız:",
    whatNext: "Sırada Ne Var?",
    steps: [
      "Teknik ekibimiz gereksinimlerinizi inceleyecek",
      "Spesifikasyonlarınıza göre detaylı bir teklif hazırlayacağız",
      "Bir uzman projenizi görüşmek için sizinle iletişime geçecek"
    ],
    urgent: "Acil bir talebiniz varsa, lütfen bizi doğrudan aramaktan çekinmeyin:",
    regards: "Saygılarımızla,",
    team: "MSADDI.EST Ekibi",
    footer: "© 2024 MSADDI.EST - Suriye'de Önde Gelen Metal İşleme",
    contact: "Halep, Suriye | info@msaddi.com | www.msaddi.com"
  }
};

export function getUserConfirmationEmail(
  locale: EmailLocale,
  data: EmailData
): { subject: string; html: string } {
  const t = translations[locale] || translations.en;
  const isRTL = locale === 'ar';

  return {
    subject: t.thankYou,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ${isRTL ? 'rtl' : 'ltr'};">
        <div style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); padding: 40px 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">MSADDI.EST</h1>
          <p style="color: white; text-align: center; margin: 10px 0 0 0;">Metal Fabrication Excellence</p>
        </div>

        <div style="padding: 40px 20px; background-color: #ffffff;">
          <h2 style="color: #333; margin-top: 0;">${t.thankYou}</h2>

          <p style="color: #666; line-height: 1.6;">
            ${t.greeting} ${data.name},
          </p>

          <p style="color: #666; line-height: 1.6;">
            ${t.received}
          </p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">${t.messageDetails}</h3>
            <p><strong>${isRTL ? 'الموضوع' : locale === 'tr' ? 'Konu' : 'Subject'}:</strong> ${data.subject}</p>
            <p><strong>${isRTL ? 'الرسالة' : locale === 'tr' ? 'Mesaj' : 'Message'}:</strong></p>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-${isRTL ? 'right' : 'left'}: 4px solid #0066cc;">
            <h3 style="color: #0066cc; margin-top: 0;">${t.whatNext}</h3>
            <ul style="color: #666; line-height: 1.8;">
              ${t.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>

          <p style="color: #666; line-height: 1.6;">
            ${t.urgent}
            <br><strong>+963 944 244 604</strong>
          </p>

          <p style="color: #666; line-height: 1.6;">
            ${t.regards}<br>
            <strong>${t.team}</strong>
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>${t.footer}</p>
          <p>${t.contact}</p>
        </div>
      </div>
    `
  };
}

export function getCompanyNotificationEmail(
  data: EmailData & { locale: EmailLocale }
): { subject: string; html: string } {
  return {
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0066cc; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Language:</strong> ${data.locale.toUpperCase()}</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h3 style="color: #0066cc; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
          <p>This message was sent from the contact form on msaddi.com</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };
}
