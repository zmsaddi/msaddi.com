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
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
          @media only screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              padding: 0 !important;
            }
            .email-content {
              padding: 20px 15px !important;
            }
            .button-container {
              display: block !important;
            }
            .email-button {
              display: block !important;
              width: 100% !important;
              margin: 10px 0 !important;
              min-width: auto !important;
              box-sizing: border-box !important;
            }
            .logo-img {
              height: 48px !important;
              max-width: 90% !important;
            }
            h2 {
              font-size: 20px !important;
            }
            h3 {
              font-size: 16px !important;
            }
            .message-box, .next-steps-box {
              padding: 15px !important;
              margin: 15px 0 !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
        <div class="email-container" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ${isRTL ? 'rtl' : 'ltr'}; background-color: #ffffff;">
          <div style="background: #fafafa; padding: 30px 20px; border-radius: 8px 8px 0 0; border-bottom: 3px solid #0066cc;">
            <div style="text-align: center;">
              <img src="https://www.msaddi.com/logo.png" alt="MSADDI.EST" class="logo-img" style="height: 54px; width: auto; max-width: 200px;" />
            </div>
          </div>

          <div class="email-content" style="padding: 40px 20px; background-color: #ffffff;">
            <h2 style="color: #333; margin-top: 0; font-size: 24px;">${t.thankYou}</h2>

            <p style="color: #666; line-height: 1.6; font-size: 15px;">
              ${t.greeting} ${data.name},
            </p>

            <p style="color: #666; line-height: 1.6; font-size: 15px;">
              ${t.received}
            </p>

            <div class="message-box" style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">${t.messageDetails}</h3>
              <p style="font-size: 15px; margin: 10px 0;"><strong>${isRTL ? 'الموضوع' : locale === 'tr' ? 'Konu' : 'Subject'}:</strong> ${data.subject}</p>
              <p style="font-size: 15px; margin: 10px 0;"><strong>${isRTL ? 'الرسالة' : locale === 'tr' ? 'Mesaj' : 'Message'}:</strong></p>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${data.message}</p>
            </div>

            <div class="next-steps-box" style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-${isRTL ? 'right' : 'left'}: 4px solid #0066cc;">
              <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">${t.whatNext}</h3>
              <ul style="color: #666; line-height: 1.8; font-size: 15px; margin: 10px 0; padding-${isRTL ? 'right' : 'left'}: 20px;">
                ${t.steps.map(step => `<li style="margin: 8px 0;">${step}</li>`).join('')}
              </ul>
            </div>

            <p style="color: #666; line-height: 1.6; font-size: 15px; text-align: center; background-color: #fff9e6; padding: 15px; border-radius: 8px; border: 1px solid #ffd700;">
              ${t.urgent}
              <br><strong style="font-size: 18px; color: #0066cc;">+963 944 244 604</strong>
            </p>

            <div class="button-container" style="margin: 30px 0;">
              <a href="https://wa.me/963944244604?text=${encodeURIComponent(t.whatsappMessage)}" class="email-button" style="display: inline-block; width: calc(50% - 5px); min-width: 200px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white !important; padding: 16px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.3); font-size: 15px; margin: 5px 0; box-sizing: border-box;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                ${t.whatsappButton}
              </a>
              <a href="https://maps.app.goo.gl/fJug9ePVizwekFcJA" class="email-button" style="display: inline-block; width: calc(50% - 5px); min-width: 200px; background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white !important; padding: 16px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; box-shadow: 0 4px 6px rgba(0, 102, 204, 0.3); font-size: 15px; margin: 5px 0; box-sizing: border-box;">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M24 4C15.2 4 8 11.2 8 20c0 11.4 14.4 23.2 15.2 23.8.4.4 1.2.4 1.6 0C25.6 43.2 40 31.4 40 20c0-8.8-7.2-16-16-16zm0 22c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="#EA4335"/>
                  <path d="M24 14c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#FBBC04"/>
                  <path d="M39.6 20.6c-.1-1-.3-2-.6-2.9l-7.2 2.9c.1.6.2 1.3.2 2 0 1.2-.3 2.3-.7 3.4l7 3c.8-2 1.3-4.2 1.3-6.4 0-.7-.1-1.3-.1-2z" fill="#34A853"/>
                  <path d="M9 20c0-.7 0-1.3.1-2l7.2 2.9c-.1.7-.2 1.4-.2 2.1 0 1.2.3 2.3.7 3.4l-7 3C9 27.4 9 23.7 9 20z" fill="#4285F4"/>
                </svg>
                ${t.mapButton}
              </a>
            </div>

            <p style="color: #666; line-height: 1.6; font-size: 15px; margin-top: 30px;">
              ${t.regards}<br>
              <strong>${t.team}</strong>
            </p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px 15px; text-align: center; color: #666; font-size: 12px; line-height: 1.6;">
            <p style="margin: 5px 0;">${t.footer}</p>
            <p style="margin: 5px 0;">${t.contact}</p>
          </div>
        </div>
      </body>
      </html>
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
