import { useLocale } from 'next-intl';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service';
}

export default function StructuredData({ type = 'organization' }: StructuredDataProps) {
  const locale = useLocale();

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.msaddi.com/#organization',
    name: 'MSADDI EST.',
    legalName: 'MSADDI Establishment for Metal Fabrication',
    url: 'https://www.msaddi.com',
    logo: 'https://www.msaddi.com/logo.png',
    description: locale === 'ar'
      ? 'مؤسسة مسدي متخصصة في تصنيع الصفائح المعدنية، القص بالليزر، الثني والتشكيل، ودوران المعادن'
      : 'MSADDI EST. specializes in sheet metal fabrication, laser cutting, bending & forming, and metal spinning',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alshqaeef Industrial Zone',
      addressLocality: 'Aleppo',
      addressRegion: 'Aleppo Governorate',
      postalCode: '',
      addressCountry: 'SY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.2065,
      longitude: 37.1398,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+963-944-244-604',
        contactType: 'customer service',
        email: 'info@msaddi.com',
        availableLanguage: ['Arabic', 'English', 'Turkish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+963-944-244-604',
        email: 'sales@msaddi.com',
        contactType: 'sales',
        availableLanguage: ['Arabic', 'English', 'Turkish'],
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Syria',
    },
    slogan: locale === 'ar' ? 'التميز في تصنيع المعادن' : 'Excellence in Metal Fabrication',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Aleppo',
        addressCountry: 'SY',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Metal Fabrication Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Laser Cutting Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Precision Laser Cutting',
                description: 'High-precision laser cutting with tolerances up to ±0.127mm, thicknesses up to 25mm',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Bending & Forming Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'CNC Bending',
                description: 'CNC bending with angular precision ±0.5°, thicknesses from 0.5 to 12mm',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Metal Spinning Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Metal Spinning',
                description: 'Precise forming of cylindrical and conical parts, thicknesses from 0.5 to 50mm',
              },
            },
          ],
        },
      ],
    },
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.msaddi.com/#localbusiness',
    name: 'MSADDI EST.',
    image: 'https://www.msaddi.com/logo.png',
    description: 'Professional sheet metal fabrication services in Aleppo, Syria',
    url: 'https://www.msaddi.com',
    telephone: '+963-944-244-604',
    email: 'info@msaddi.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alshqaeef Industrial Zone',
      addressLocality: 'Aleppo',
      addressRegion: 'Aleppo Governorate',
      addressCountry: 'SY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.2065,
      longitude: 37.1398,
    },
    hasMap: 'https://maps.app.goo.gl/CvUXMKhsqQRdQSg8A',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '42',
    },
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.msaddi.com/#website',
    url: 'https://www.msaddi.com',
    name: 'MSADDI EST.',
    description: 'Precision Metal Fabrication Services',
    publisher: {
      '@id': 'https://www.msaddi.com/#organization',
    },
    inLanguage: ['ar', 'en', 'tr'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.msaddi.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://www.msaddi.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `https://www.msaddi.com/${locale}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'About',
        item: `https://www.msaddi.com/${locale}/about`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `https://www.msaddi.com/${locale}/contact`,
      },
    ],
  };

  const schemas = [organizationSchema, localBusinessSchema, websiteSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
