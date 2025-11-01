/**
 * RSS Feed Generator
 *
 * Generates RSS feeds for blog posts
 */

import RSS from 'rss';
import { getAllBlogPosts, BlogPost } from './mdx';

export async function generateRSSFeed(locale: string): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msaddi.com';
  const posts = await getAllBlogPosts(locale);

  const feed = new RSS({
    title: 'MSADDI Blog - Metal Fabrication Insights',
    description: 'Latest news, insights, and updates from MSADDI metal fabrication',
    feed_url: `${siteUrl}/${locale}/blog/rss.xml`,
    site_url: `${siteUrl}/${locale}`,
    language: locale,
    pubDate: new Date().toUTCString(),
    copyright: `All rights reserved ${new Date().getFullYear()}, MSADDI EST.`,
    generator: 'Next.js RSS Feed Generator',
  });

  posts.forEach((post: BlogPost) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      date: post.date,
      author: post.author,
      categories: [post.category, ...post.tags],
      enclosure: post.image
        ? {
            url: `${siteUrl}${post.image}`,
            type: 'image/jpeg',
          }
        : undefined,
    });
  });

  return feed.xml({ indent: true });
}
