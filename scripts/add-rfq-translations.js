/**
 * Add RFQ Form Translation Keys
 * Adds all required translation keys for the RFQ form component
 */

const fs = require('fs');
const path = require('path');

// RFQ translation keys
const RFQ_KEYS = {
  en: {
    title: 'Request for Quote',
    subtitle: 'Get a detailed quote for your metal fabrication project. Fill out the form below and our technical team will contact you within 24-48 hours.',
    contact_info: 'Contact Information',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    company: 'Company Name (Optional)',

    project_specs: 'Project Specifications',
    service: 'Required Service',
    material: 'Material Type',
    thickness: 'Material Thickness',
    length: 'Length (Optional)',
    width: 'Width (Optional)',
    quantity: 'Quantity',
    timeline: 'Required Timeline',

    // Service types
    service_laser_cutting: 'Laser Cutting',
    service_bending_forming: 'Bending & Forming',
    service_metal_spinning: 'Metal Spinning',
    service_custom_fabrication: 'Custom Fabrication',
    service_welding: 'Welding',
    service_finishing: 'Surface Finishing',
    service_assembly: 'Assembly',
    service_other: 'Other',

    // Timeline options
    timeline_urgent_1_week: 'Urgent (1 week)',
    timeline_standard_2_4_weeks: 'Standard (2-4 weeks)',
    timeline_flexible_4_8_weeks: 'Flexible (4-8 weeks)',
    timeline_long_term_8_weeks_plus: 'Long-term (8+ weeks)',

    additional_details: 'Additional Details',
    tolerance: 'Tolerance Requirements',
    tolerance_help: 'e.g., ±0.127mm, ±0.5°',
    surface_finish: 'Surface Finish',
    surface_finish_placeholder: 'e.g., Powder coating, Anodizing, Brushed',
    additional_requirements: 'Additional Requirements',
    additional_requirements_placeholder: 'Please provide any additional specifications, drawings references, or special requirements...',

    technical_files: 'Technical Files',
    file_upload_help: 'Upload CAD files, technical drawings, or specifications (PDF, DXF, DWG, STEP, STP, PNG, JPG - Max 10MB per file)',
    upload_files: 'Upload Files',

    submit: 'Submit RFQ',
    submitting: 'Submitting...',
    success: 'Your RFQ has been submitted successfully! Our team will contact you within 24-48 hours.',
    error: 'An error occurred while submitting your RFQ. Please try again or contact us directly at Sales@msaddi.com',
  },

  ar: {
    title: 'طلب عرض سعر',
    subtitle: 'احصل على عرض سعر مفصل لمشروع تصنيع المعادن الخاص بك. املأ النموذج أدناه وسيتواصل معك فريقنا الفني خلال 24-48 ساعة.',
    contact_info: 'معلومات التواصل',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    company: 'اسم الشركة (اختياري)',

    project_specs: 'مواصفات المشروع',
    service: 'الخدمة المطلوبة',
    material: 'نوع المادة',
    thickness: 'سماكة المادة',
    length: 'الطول (اختياري)',
    width: 'العرض (اختياري)',
    quantity: 'الكمية',
    timeline: 'الجدول الزمني المطلوب',

    // Service types
    service_laser_cutting: 'قص بالليزر',
    service_bending_forming: 'الثني والتشكيل',
    service_metal_spinning: 'الدوران المعدني',
    service_custom_fabrication: 'تصنيع حسب الطلب',
    service_welding: 'اللحام',
    service_finishing: 'التشطيبات السطحية',
    service_assembly: 'التجميع',
    service_other: 'أخرى',

    // Timeline options
    timeline_urgent_1_week: 'عاجل (أسبوع واحد)',
    timeline_standard_2_4_weeks: 'قياسي (2-4 أسابيع)',
    timeline_flexible_4_8_weeks: 'مرن (4-8 أسابيع)',
    timeline_long_term_8_weeks_plus: 'طويل الأجل (8+ أسابيع)',

    additional_details: 'تفاصيل إضافية',
    tolerance: 'متطلبات الدقة',
    tolerance_help: 'مثال: ±0.127مم، ±0.5°',
    surface_finish: 'التشطيب السطحي',
    surface_finish_placeholder: 'مثال: طلاء بالبودرة، أكسدة، صقل',
    additional_requirements: 'متطلبات إضافية',
    additional_requirements_placeholder: 'يرجى تقديم أي مواصفات إضافية أو مراجع للرسومات أو متطلبات خاصة...',

    technical_files: 'الملفات الفنية',
    file_upload_help: 'تحميل ملفات CAD، رسومات تقنية، أو مواصفات (PDF, DXF, DWG, STEP, STP, PNG, JPG - حد أقصى 10 ميجابايت لكل ملف)',
    upload_files: 'تحميل الملفات',

    submit: 'إرسال طلب العرض',
    submitting: 'جاري الإرسال...',
    success: 'تم إرسال طلب العرض بنجاح! سيتواصل معك فريقنا خلال 24-48 ساعة.',
    error: 'حدث خطأ أثناء إرسال طلب العرض. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على Sales@msaddi.com',
  },

  tr: {
    title: 'Fiyat Teklifi İste',
    subtitle: 'Metal imalat projeniz için detaylı bir teklif alın. Aşağıdaki formu doldurun, teknik ekibimiz 24-48 saat içinde sizinle iletişime geçecektir.',
    contact_info: 'İletişim Bilgileri',
    name: 'Ad Soyad',
    email: 'E-posta Adresi',
    phone: 'Telefon Numarası',
    company: 'Şirket Adı (Opsiyonel)',

    project_specs: 'Proje Özellikleri',
    service: 'İstenen Hizmet',
    material: 'Malzeme Türü',
    thickness: 'Malzeme Kalınlığı',
    length: 'Uzunluk (Opsiyonel)',
    width: 'Genişlik (Opsiyonel)',
    quantity: 'Miktar',
    timeline: 'İstenen Zaman Çizelgesi',

    // Service types
    service_laser_cutting: 'Lazer Kesim',
    service_bending_forming: 'Bükme ve Şekillendirme',
    service_metal_spinning: 'Metal Döndürme',
    service_custom_fabrication: 'Özel İmalat',
    service_welding: 'Kaynak',
    service_finishing: 'Yüzey İşleme',
    service_assembly: 'Montaj',
    service_other: 'Diğer',

    // Timeline options
    timeline_urgent_1_week: 'Acil (1 hafta)',
    timeline_standard_2_4_weeks: 'Standart (2-4 hafta)',
    timeline_flexible_4_8_weeks: 'Esnek (4-8 hafta)',
    timeline_long_term_8_weeks_plus: 'Uzun vadeli (8+ hafta)',

    additional_details: 'Ek Detaylar',
    tolerance: 'Tolerans Gereksinimleri',
    tolerance_help: 'örn., ±0.127mm, ±0.5°',
    surface_finish: 'Yüzey Kaplama',
    surface_finish_placeholder: 'örn., Toz boya, Eloksal, Fırçalanmış',
    additional_requirements: 'Ek Gereksinimler',
    additional_requirements_placeholder: 'Lütfen ek özellikler, çizim referansları veya özel gereksinimler sağlayın...',

    technical_files: 'Teknik Dosyalar',
    file_upload_help: 'CAD dosyaları, teknik çizimler veya özellikler yükleyin (PDF, DXF, DWG, STEP, STP, PNG, JPG - Dosya başına maks. 10MB)',
    upload_files: 'Dosya Yükle',

    submit: 'Teklif Gönder',
    submitting: 'Gönderiliyor...',
    success: 'Fiyat teklifiniz başarıyla gönderildi! Ekibimiz 24-48 saat içinde sizinle iletişime geçecektir.',
    error: 'Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya doğrudan Sales@msaddi.com adresinden bizimle iletişime geçin.',
  },
};

function addRfqKeys(locale) {
  const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);

  console.log(`\n📝 Processing ${locale}.json...`);

  // Read existing file
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add RFQ section
  if (!content.rfq) {
    content.rfq = {};
  }

  let keysAdded = 0;
  let keysUpdated = 0;

  Object.entries(RFQ_KEYS[locale]).forEach(([key, value]) => {
    if (!content.rfq[key]) {
      content.rfq[key] = value;
      keysAdded++;
    } else if (content.rfq[key] !== value) {
      content.rfq[key] = value;
      keysUpdated++;
    }
  });

  // Write back
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');

  console.log(`  ✅ Added ${keysAdded} keys`);
  if (keysUpdated > 0) {
    console.log(`  🔄 Updated ${keysUpdated} keys`);
  }
}

// Process all locales
console.log('🔧 Adding RFQ translation keys...');
['en', 'ar', 'tr'].forEach(addRfqKeys);
console.log('\n✅ Done!');
