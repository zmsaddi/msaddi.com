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
    // Customer confirmation email
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
    footer: "© 2025 MSADDI.EST - Leading Metal Fabrication in Syria",
    contact: "Aleppo, Syria | info@msaddi.com | www.msaddi.com",
    whatsappButton: "Contact us on WhatsApp",
    whatsappMessage: "Hello, I'm interested in your metal fabrication services.",
    mapButton: "View our location",
    // Company notification email
    companyTitle: "New Contact Form Submission",
    companyContactDetails: "Contact Details",
    companyName: "Name",
    companyEmail: "Email",
    companyPhone: "Phone",
    companySubject: "Subject",
    companyLanguage: "Language",
    companyMessage: "Message",
    companyFooter: "This message was sent from the contact form on msaddi.com",
    companyTime: "Time"
  },
  ar: {
    // Customer confirmation email
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
    footer: "© 2025 MSADDI.EST - الريادة في التصنيع المعدني في سوريا",
    contact: "حلب، سوريا | info@msaddi.com | www.msaddi.com",
    whatsappButton: "تواصل معنا عبر واتساب",
    whatsappMessage: "مرحباً، أنا مهتم بخدمات تصنيع المعادن الخاصة بكم.",
    mapButton: "عرض موقعنا",
    // Company notification email
    companyTitle: "طلب تواصل جديد من الموقع",
    companyContactDetails: "بيانات التواصل",
    companyName: "الاسم",
    companyEmail: "البريد الإلكتروني",
    companyPhone: "الهاتف",
    companySubject: "الموضوع",
    companyLanguage: "اللغة",
    companyMessage: "الرسالة",
    companyFooter: "تم إرسال هذه الرسالة من نموذج التواصل على msaddi.com",
    companyTime: "الوقت"
  },
  tr: {
    // Customer confirmation email
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
    footer: "© 2025 MSADDI.EST - Suriye'de Önde Gelen Metal İşleme",
    contact: "Halep, Suriye | info@msaddi.com | www.msaddi.com",
    whatsappButton: "WhatsApp'tan iletişime geçin",
    whatsappMessage: "Merhaba, metal fabrikasyon hizmetlerinizle ilgileniyorum.",
    mapButton: "Konumumuzu görüntüleyin",
    // Company notification email
    companyTitle: "Yeni İletişim Formu Gönderimi",
    companyContactDetails: "İletişim Bilgileri",
    companyName: "İsim",
    companyEmail: "E-posta",
    companyPhone: "Telefon",
    companySubject: "Konu",
    companyLanguage: "Dil",
    companyMessage: "Mesaj",
    companyFooter: "Bu mesaj msaddi.com'daki iletişim formundan gönderildi",
    companyTime: "Zaman"
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
        <div style="background: #fafafa; padding: 30px 20px; border-radius: 8px 8px 0 0; border-bottom: 3px solid #0066cc;">
          <div style="text-align: center;">
            <img src="https://www.msaddi.com/logo.png" alt="MSADDI.EST" style="height: 54px; width: auto;" />
          </div>
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

          <div style="display: flex; gap: 10px; margin: 30px 0; flex-wrap: wrap;">
            <a href="https://wa.me/963944244604?text=${encodeURIComponent(t.whatsappMessage)}" style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; display: inline-block; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.3);">
              📱 ${t.whatsappButton}
            </a>
            <a href="https://www.google.com/maps?q=36.25730305,37.16812130" style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; display: inline-block; box-shadow: 0 4px 6px rgba(0, 102, 204, 0.3);">
              📍 ${t.mapButton}
            </a>
          </div>

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
  const t = translations[data.locale] || translations.en;
  const isRTL = data.locale === 'ar';

  return {
    subject: `${t.companyTitle}: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ${isRTL ? 'rtl' : 'ltr'};">
        <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
          ${t.companyTitle}
        </h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0066cc; margin-top: 0;">${t.companyContactDetails}</h3>
          <p><strong>${t.companyName}:</strong> ${data.name}</p>
          <p><strong>${t.companyEmail}:</strong> ${data.email}</p>
          <p><strong>${t.companyPhone}:</strong> ${data.phone}</p>
          <p><strong>${t.companySubject}:</strong> ${data.subject}</p>
          <p><strong>${t.companyLanguage}:</strong> ${data.locale.toUpperCase()}</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h3 style="color: #0066cc; margin-top: 0;">${t.companyMessage}</h3>
          <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
          <p>${t.companyFooter}</p>
          <p>${t.companyTime}: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };
}
