/**
 * SEO Metadata Configuration
 *
 * Centralized metadata for all pages per Arabic SEO specification:
 * - Each page targets ONE specific keyword
 * - Meta title ≤60 characters
 * - Meta description ≤155 characters
 * - Technical/engineering language
 * - Industrial B2B focus
 */

export interface PageMetadata {
  title: string; // ≤60 chars
  description: string; // ≤155 chars
  keywords: string[];
}

export const pageMetadata: Record<string, Record<string, PageMetadata>> = {
  home: {
    en: {
      title: 'MSADDI - Sheet Metal Fabrication | Laser & CNC Bending',
      description: 'Industrial metal fabrication in Aleppo, Syria. Laser cutting ±0.127mm precision, CNC bending, metal spinning. Stainless steel, aluminum, custom parts.',
      keywords: [
        'sheet metal fabrication',
        'laser cutting Syria',
        'CNC bending',
        'metal fabrication Aleppo',
        'precision metal parts',
      ],
    },
    ar: {
      title: 'مسدي - تصنيع الصفائح المعدنية | قص ليزر وثني CNC',
      description: 'تصنيع معادن صناعي في حلب، سوريا. قص ليزر بدقة ±0.127 مم، ثني CNC، دوران معادن. فولاذ مقاوم للصدأ، ألمنيوم، قطع مخصصة.',
      keywords: [
        'تصنيع الصفائح المعدنية',
        'القص بالليزر',
        'ثني CNC',
        'تصنيع المعادن حلب',
        'قطع معدنية دقيقة',
      ],
    },
    tr: {
      title: 'MSADDI - Sac Metal İşleme | Lazer Kesim ve CNC Bükme',
      description: 'Halep, Suriye\'de endüstriyel metal fabrikasyonu. ±0.127mm hassasiyetli lazer kesim, CNC bükme, metal döndürme. Paslanmaz çelik, alüminyum.',
      keywords: [
        'sac metal işleme',
        'lazer kesim',
        'CNC bükme',
        'metal fabrikasyon',
        'hassas metal parçalar',
      ],
    },
  },

  about: {
    en: {
      title: 'About MSADDI | ISO 9001 Metal Fabrication Facility',
      description: 'MSADDI EST. in Aleppo: ISO 9001:2015 certified metal fabrication. 3000W fiber laser, 125-ton press brake. Serving Syria and Middle East since 2020.',
      keywords: [
        'metal fabrication company',
        'ISO 9001 certified',
        'Aleppo manufacturing',
        'industrial metal shop',
        'sheet metal facility',
      ],
    },
    ar: {
      title: 'عن مسدي | منشأة تصنيع معادن ISO 9001',
      description: 'مؤسسة مسدي في حلب: معتمدة ISO 9001:2015 لتصنيع المعادن. ليزر ألياف 3000 واط، مكبس 125 طن. نخدم سوريا والشرق الأوسط منذ 2020.',
      keywords: [
        'شركة تصنيع معادن',
        'معتمد ISO 9001',
        'تصنيع حلب',
        'ورشة معادن صناعية',
        'منشأة صفائح معدنية',
      ],
    },
    tr: {
      title: 'MSADDI Hakkında | ISO 9001 Metal Fabrikasyon Tesisi',
      description: 'Halep\'teki MSADDI EST.: ISO 9001:2015 sertifikalı metal fabrikasyon. 3000W fiber lazer, 125 ton abkant. 2020\'den beri Suriye ve Ortadoğu\'ya hizmet.',
      keywords: [
        'metal fabrikasyon şirketi',
        'ISO 9001 sertifikalı',
        'Halep üretim',
        'endüstriyel metal atölye',
        'sac metal tesisi',
      ],
    },
  },

  services: {
    en: {
      title: 'Metal Fabrication Services | Laser, Bending - MSADDI',
      description: 'Professional metal services: Laser cutting (25mm max), CNC bending (±0.5°), metal spinning. Stainless steel 304/316, aluminum, carbon steel. Syria.',
      keywords: [
        'laser cutting services',
        'CNC bending services',
        'metal spinning',
        'sheet metal services',
        'custom metal fabrication',
      ],
    },
    ar: {
      title: 'خدمات تصنيع المعادن | ليزر، ثني، دوران - مسدي',
      description: 'خدمات معادن احترافية: قص ليزر (حتى 25 مم)، ثني CNC (±0.5 درجة)، دوران معادن. فولاذ 304/316، ألمنيوم، فولاذ كربوني. سوريا.',
      keywords: [
        'خدمات القص بالليزر',
        'خدمات ثني CNC',
        'دوران المعادن',
        'خدمات الصفائح المعدنية',
        'تصنيع معادن مخصص',
      ],
    },
    tr: {
      title: 'Metal Fabrikasyon Hizmetleri | Lazer, Bükme - MSADDI',
      description: 'Profesyonel metal hizmetleri: Lazer kesim (25mm maks), CNC bükme (±0.5°), metal döndürme. Paslanmaz 304/316, alüminyum, karbon çelik. Suriye.',
      keywords: [
        'lazer kesim hizmetleri',
        'CNC bükme hizmetleri',
        'metal döndürme',
        'sac metal hizmetleri',
        'özel metal fabrikasyon',
      ],
    },
  },

  products: {
    en: {
      title: 'Metal Products | Enclosures, Brackets, Panels - MSADDI',
      description: 'Industrial metal products: IP65 enclosures, heavy-duty brackets (500kg capacity), architectural panels. Stainless steel, aluminum. Custom specifications.',
      keywords: [
        'metal enclosures',
        'industrial brackets',
        'metal panels',
        'custom metal products',
        'stainless steel parts',
      ],
    },
    ar: {
      title: 'منتجات معدنية | صناديق، حوامل، ألواح - مسدي',
      description: 'منتجات معدنية صناعية: صناديق IP65، حوامل قوية (سعة 500 كجم)، ألواح معمارية. فولاذ مقاوم للصدأ، ألمنيوم. مواصفات مخصصة.',
      keywords: [
        'صناديق معدنية',
        'حوامل صناعية',
        'ألواح معدنية',
        'منتجات معدنية مخصصة',
        'قطع فولاذ مقاوم للصدأ',
      ],
    },
    tr: {
      title: 'Metal Ürünler | Muhafazalar, Braketler, Paneller - MSADDI',
      description: 'Endüstriyel metal ürünler: IP65 muhafazalar, ağır hizmet braketler (500kg kapasite), mimari paneller. Paslanmaz çelik, alüminyum. Özel spesifikasyon.',
      keywords: [
        'metal muhafazalar',
        'endüstriyel braketler',
        'metal paneller',
        'özel metal ürünler',
        'paslanmaz çelik parçalar',
      ],
    },
  },

  capabilities: {
    en: {
      title: 'Manufacturing Capabilities | Equipment & Capacity - MSADDI',
      description: '3000W-6000W fiber laser, 125-ton CNC press brake, metal spinning lathe. Capacity: 500+ parts/day. ISO 9001:2015 certified. CMM inspection.',
      keywords: [
        'manufacturing capabilities',
        'fiber laser system',
        'CNC press brake',
        'production capacity',
        'quality control equipment',
      ],
    },
    ar: {
      title: 'القدرات التصنيعية | المعدات والطاقة الإنتاجية - مسدي',
      description: 'ليزر ألياف 3000-6000 واط، مكبس CNC 125 طن، مخرطة دوران معادن. طاقة: +500 قطعة/يوم. معتمد ISO 9001:2015. فحص CMM.',
      keywords: [
        'القدرات التصنيعية',
        'نظام ليزر ألياف',
        'مكبس CNC',
        'الطاقة الإنتاجية',
        'معدات مراقبة الجودة',
      ],
    },
    tr: {
      title: 'Üretim Yetenekleri | Ekipman ve Kapasite - MSADDI',
      description: '3000W-6000W fiber lazer, 125 ton CNC abkant, metal döndürme torna. Kapasite: 500+ parça/gün. ISO 9001:2015 sertifikalı. CMM muayene.',
      keywords: [
        'üretim yetenekleri',
        'fiber lazer sistemi',
        'CNC abkant',
        'üretim kapasitesi',
        'kalite kontrol ekipmanı',
      ],
    },
  },

  contact: {
    en: {
      title: 'Contact MSADDI | Get Quote for Metal Fabrication Services',
      description: 'Request quote for metal fabrication. Located in Alshqaeef, Aleppo, Syria. Email: sales@msaddi.com | Phone: +963 944 244 604. Free consultation.',
      keywords: [
        'metal fabrication quote',
        'contact metal shop',
        'Aleppo metal fabrication',
        'Syria manufacturing',
        'metal parts inquiry',
      ],
    },
    ar: {
      title: 'اتصل بمسدي | احصل على عرض سعر لخدمات تصنيع المعادن',
      description: 'طلب عرض سعر لتصنيع المعادن. الموقع: الشقيف، حلب، سوريا. البريد: sales@msaddi.com | الهاتف: +963 944 244 604. استشارة مجانية.',
      keywords: [
        'عرض سعر تصنيع معادن',
        'اتصل بورشة معادن',
        'تصنيع معادن حلب',
        'تصنيع سوريا',
        'استفسار قطع معدنية',
      ],
    },
    tr: {
      title: 'MSADDI İletişim | Metal Fabrikasyon Hizmetleri için Teklif',
      description: 'Metal fabrikasyon teklifi isteyin. Konum: Alshqaeef, Halep, Suriye. E-posta: sales@msaddi.com | Telefon: +963 944 244 604. Ücretsiz danışma.',
      keywords: [
        'metal fabrikasyon teklifi',
        'metal atölye iletişim',
        'Halep metal fabrikasyon',
        'Suriye üretim',
        'metal parça sorgusu',
      ],
    },
  },
};

/**
 * Get metadata for a specific page and locale
 */
export function getPageMetadata(
  page: keyof typeof pageMetadata,
  locale: string
): PageMetadata {
  const metadata = pageMetadata[page]?.[locale] || pageMetadata[page]?.['en'];

  if (!metadata) {
    // Fallback to generic metadata
    return {
      title: 'MSADDI EST.',
      description: 'Excellence in Metal Fabrication',
      keywords: ['metal fabrication'],
    };
  }

  return metadata;
}
