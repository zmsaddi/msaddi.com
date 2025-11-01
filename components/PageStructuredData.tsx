'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

/**
 * Page-Specific Structured Data Component
 *
 * Implements Schema.org markup for SEO optimization:
 * - Product schema for Products page
 * - Service schema for Services page
 * - BreadcrumbList for all pages (dynamic based on URL)
 *
 * Per Arabic SEO specification requirements:
 * - Only essential schemas (no bloat)
 * - Dynamic breadcrumbs
 * - Industrial B2B focus
 */

interface PageStructuredDataProps {
  pageType: 'home' | 'about' | 'services' | 'products' | 'capabilities' | 'contact';
}

export default function PageStructuredData({ pageType }: PageStructuredDataProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('common');

  // Generate dynamic breadcrumb based on current page
  const getBreadcrumbSchema = () => {
    const baseUrl = 'https://www.msaddi.com';
    const breadcrumbs: Array<{ position: number; name: string; item: string }> = [
      {
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : locale === 'tr' ? 'Ana Sayfa' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
    ];

    if (pageType !== 'home') {
      const pageNames: Record<string, Record<string, string>> = {
        about: { ar: 'من نحن', en: 'About', tr: 'Hakkımızda' },
        services: { ar: 'خدماتنا', en: 'Services', tr: 'Hizmetler' },
        products: { ar: 'المنتجات', en: 'Products', tr: 'Ürünler' },
        capabilities: { ar: 'القدرات', en: 'Capabilities', tr: 'Yetenekler' },
        contact: { ar: 'اتصل بنا', en: 'Contact', tr: 'İletişim' },
      };

      breadcrumbs.push({
        position: 2,
        name: pageNames[pageType]?.[locale] || pageNames[pageType]?.['en'] || pageType,
        item: `${baseUrl}/${locale}/${pageType}`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb) => ({
        '@type': 'ListItem',
        position: crumb.position,
        name: crumb.name,
        item: crumb.item,
      })),
    };
  };

  // Product Schema for Products Page
  const getProductsSchema = () => {
    if (pageType !== 'products') return null;

    const baseUrl = 'https://www.msaddi.com';

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${baseUrl}/${locale}/products#productlist`,
      name: locale === 'ar' ? 'منتجات الصفائح المعدنية' : 'Sheet Metal Products',
      description: locale === 'ar'
        ? 'مكونات معدنية هندسية عالية الدقة للتطبيقات الصناعية'
        : 'Precision-Engineered Metal Components for Industrial Applications',
      numberOfItems: 4,
      itemListElement: [
        {
          '@type': 'Product',
          '@id': `${baseUrl}/${locale}/products#enclosures`,
          name: locale === 'ar' ? 'صناديق وخزائن معدنية' : 'Metal Enclosures & Cabinets',
          description: locale === 'ar'
            ? 'صناديق كهربائية مخصصة، خزائن تحكم، وهياكل حماية مصنعة من الفولاذ المقاوم للصدأ'
            : 'Custom-designed electrical enclosures, control cabinets, and protective housings',
          category: 'Industrial Metal Products',
          material: 'Stainless Steel 304/316, Aluminum 5052/6061, Galvanized Steel',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'MSADDI EST.',
            },
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'MSADDI EST.',
            url: baseUrl,
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Thickness Range',
              value: '0.5mm - 6mm',
            },
            {
              '@type': 'PropertyValue',
              name: 'IP Rating',
              value: 'IP54, IP65, IP66',
            },
            {
              '@type': 'PropertyValue',
              name: 'Max Size',
              value: '1500×3000mm',
            },
          ],
        },
        {
          '@type': 'Product',
          '@id': `${baseUrl}/${locale}/products#brackets`,
          name: locale === 'ar' ? 'حوامل هيكلية ومعدات تثبيت' : 'Structural Brackets & Mounting Hardware',
          description: locale === 'ar'
            ? 'أقواس L، أقواس Z، ألواح تثبيت، ودعامات هيكلية للآلات الصناعية'
            : 'Heavy-duty L-brackets, Z-brackets, mounting plates for industrial machinery',
          category: 'Industrial Metal Products',
          material: 'Carbon Steel Q235/Q345, Stainless Steel 304, Aluminum 6061',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'MSADDI EST.',
            },
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'MSADDI EST.',
            url: baseUrl,
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Thickness Range',
              value: '1mm - 12mm',
            },
            {
              '@type': 'PropertyValue',
              name: 'Bending Accuracy',
              value: '±0.5°',
            },
            {
              '@type': 'PropertyValue',
              name: 'Load Capacity',
              value: 'Up to 500kg',
            },
          ],
        },
        {
          '@type': 'Product',
          '@id': `${baseUrl}/${locale}/products#panels`,
          name: locale === 'ar' ? 'ألواح زخرفية ومعمارية' : 'Decorative & Architectural Panels',
          description: locale === 'ar'
            ? 'ألواح زخرفية مقطوعة بالليزر، شاشات معدنية مثقبة، كسوة واجهات'
            : 'Laser-cut decorative panels, perforated metal screens, facade cladding',
          category: 'Architectural Metal Products',
          material: 'Stainless Steel 304/316, Aluminum 5052, Corten Steel',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'MSADDI EST.',
            },
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'MSADDI EST.',
            url: baseUrl,
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Thickness Range',
              value: '1mm - 4mm',
            },
            {
              '@type': 'PropertyValue',
              name: 'Finish Options',
              value: 'Brushed, Mirror, Powder Coated',
            },
          ],
        },
        {
          '@type': 'Product',
          '@id': `${baseUrl}/${locale}/products#components`,
          name: locale === 'ar' ? 'مكونات مصنعة حسب الطلب' : 'Custom Machined Components',
          description: locale === 'ar'
            ? 'قطع معدنية دقيقة مصنعة حسب مواصفات العميل'
            : 'Precision metal parts manufactured to customer specifications',
          category: 'Custom Metal Components',
          material: 'Stainless Steel, Aluminum, Brass, Copper, Titanium',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'MSADDI EST.',
            },
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'MSADDI EST.',
            url: baseUrl,
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Tolerance',
              value: '±0.127mm (laser cutting)',
            },
            {
              '@type': 'PropertyValue',
              name: 'Thickness Range',
              value: '0.5mm - 25mm',
            },
            {
              '@type': 'PropertyValue',
              name: 'Quality Control',
              value: '100% inspection',
            },
          ],
        },
      ],
    };
  };

  // Service Schema for Services Page
  const getServicesSchema = () => {
    if (pageType !== 'services') return null;

    const baseUrl = 'https://www.msaddi.com';

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${baseUrl}/${locale}/services#laser-cutting`,
        name: locale === 'ar' ? 'خدمات القص بالليزر' : 'Laser Cutting Services',
        description: locale === 'ar'
          ? 'قص دقيق بتقنية الليزر للمعادن المختلفة بدقة تصل إلى ±0.127 مم'
          : 'Precise laser cutting of various metals with tolerances up to ±0.127mm',
        serviceType: 'Metal Fabrication',
        provider: {
          '@type': 'Organization',
          '@id': 'https://www.msaddi.com/#organization',
          name: 'MSADDI EST.',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Syria',
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${baseUrl}/${locale}/services`,
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Precision',
            value: '±0.127mm',
          },
          {
            '@type': 'PropertyValue',
            name: 'Max Thickness',
            value: '25mm',
          },
          {
            '@type': 'PropertyValue',
            name: 'Max Size',
            value: '1500×3000mm',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${baseUrl}/${locale}/services#cnc-bending`,
        name: locale === 'ar' ? 'خدمات الثني والتشكيل' : 'CNC Bending & Forming Services',
        description: locale === 'ar'
          ? 'ثني وتشكيل الصفائح المعدنية باستخدام مكابس CNC حديثة بدقة زاوية ±0.5 درجة'
          : 'CNC bending and forming of sheet metal with angular precision ±0.5°',
        serviceType: 'Metal Fabrication',
        provider: {
          '@type': 'Organization',
          '@id': 'https://www.msaddi.com/#organization',
          name: 'MSADDI EST.',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Syria',
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${baseUrl}/${locale}/services`,
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Angular Accuracy',
            value: '±0.5°',
          },
          {
            '@type': 'PropertyValue',
            name: 'Thickness Range',
            value: '0.5mm - 12mm',
          },
          {
            '@type': 'PropertyValue',
            name: 'Bending Length',
            value: '3000mm',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${baseUrl}/${locale}/services#metal-spinning`,
        name: locale === 'ar' ? 'خدمات دوران المعادن' : 'Metal Spinning Services',
        description: locale === 'ar'
          ? 'تشكيل دقيق للقطع الأسطوانية والمخروطية باستخدام تقنيات الدوران'
          : 'Precise forming of cylindrical and conical parts using spinning techniques',
        serviceType: 'Metal Fabrication',
        provider: {
          '@type': 'Organization',
          '@id': 'https://www.msaddi.com/#organization',
          name: 'MSADDI EST.',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Syria',
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${baseUrl}/${locale}/services`,
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Diameter Capacity',
            value: 'Up to 1200mm',
          },
          {
            '@type': 'PropertyValue',
            name: 'Thickness Range',
            value: '0.5mm - 50mm',
          },
        ],
      },
    ];
  };

  // Capabilities Schema
  const getCapabilitiesSchema = () => {
    if (pageType !== 'capabilities') return null;

    const baseUrl = 'https://www.msaddi.com';

    return {
      '@context': 'https://schema.org',
      '@type': 'ManufacturingFacility',
      '@id': `${baseUrl}/${locale}/capabilities#facility`,
      name: 'MSADDI EST. Manufacturing Facility',
      description: locale === 'ar'
        ? 'معدات متقدمة وخبرة تقنية عالية في تصنيع المعادن الدقيق'
        : 'Advanced Equipment & Technical Expertise for Precision Metal Fabrication',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alshqaeef Industrial Zone',
        addressLocality: 'Aleppo',
        addressCountry: 'SY',
      },
      manufacturer: {
        '@type': 'Organization',
        '@id': 'https://www.msaddi.com/#organization',
        name: 'MSADDI EST.',
      },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Quality Management',
          name: 'ISO 9001:2015 Quality Management System',
        },
      ],
    };
  };

  const breadcrumbSchema = getBreadcrumbSchema();
  const productsSchema = getProductsSchema();
  const servicesSchema = getServicesSchema();
  const capabilitiesSchema = getCapabilitiesSchema();

  const schemas = [
    breadcrumbSchema,
    productsSchema,
    ...(Array.isArray(servicesSchema) ? servicesSchema : servicesSchema ? [servicesSchema] : []),
    capabilitiesSchema,
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`page-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
