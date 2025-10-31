import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.msaddi.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/about`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/services`,
          en: `${baseUrl}/en/services`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/contact`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
  ];
}
