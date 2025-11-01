import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    { path: '/blog', priority: 0.9, changeFreq: 'daily' },
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
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

  // Add blog posts for each locale
  for (const locale of locales) {
    try {
      const posts = await getAllBlogPosts(locale);
      const categories = await getAllCategories(locale);
      const tags = await getAllTags(locale);

      // Add individual blog posts
      posts.forEach((post) => {
        urls.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });

      // Add category pages
      categories.forEach((category) => {
        urls.push({
          url: `${baseUrl}/${locale}/blog/category/${category}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      });

      // Add tag pages
      tags.forEach((tag) => {
        urls.push({
          url: `${baseUrl}/${locale}/blog/tag/${tag}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        });
      });

      // Add RSS feed
      urls.push({
        url: `${baseUrl}/${locale}/blog/rss.xml`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    } catch (error) {
      console.error(`Error generating sitemap for locale ${locale}:`, error);
    }
  }

  return urls;
}
