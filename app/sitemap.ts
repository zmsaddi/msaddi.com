import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.msaddi.com';

  // Define pages with specific priorities and change frequencies
  const pageConfig: Array<{
    path: string;
    priority: number;
    changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }> = [
    { path: '', priority: 1.0, changeFreq: 'daily' },
    { path: '/services', priority: 0.9, changeFreq: 'weekly' },
    { path: '/contact', priority: 0.9, changeFreq: 'monthly' },
    { path: '/about', priority: 0.8, changeFreq: 'monthly' },
  ];

  const urls: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pageConfig.forEach(({ path, priority, changeFreq }) => {
      urls.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority: priority,
      });
    });
  });

  return urls;
}
