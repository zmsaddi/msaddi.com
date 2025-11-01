/**
 * MDX Blog Utilities
 *
 * Utilities for parsing and rendering MDX blog posts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  locale: string;
  readingTime: string;
  content?: string;
}

export interface BlogPostWithContent extends BlogPost {
  mdxSource: MDXRemoteSerializeResult;
}

/**
 * Get all blog posts for a locale
 */
export async function getAllBlogPosts(locale: string): Promise<BlogPost[]> {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const post = await getBlogPost(slug, locale);
      return post;
    })
  );

  // Sort by date (newest first)
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post
 */
export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_CONTENT_DIR, locale, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'MSADDI Team',
      category: data.category || 'general',
      tags: data.tags || [],
      image: data.image,
      locale,
      readingTime: readingTime(content).text,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get blog post with MDX content
 */
export async function getBlogPostWithMDX(
  slug: string,
  locale: string
): Promise<BlogPostWithContent | null> {
  const post = await getBlogPost(slug, locale);

  if (!post || !post.content) {
    return null;
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  return {
    ...post,
    mdxSource,
  };
}

/**
 * Get all blog post slugs for a locale
 */
export function getAllBlogSlugs(locale: string): string[] {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  category: string,
  locale: string
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(locale);
  return allPosts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(
  tag: string,
  locale: string
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(locale);
  return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique categories
 */
export async function getAllCategories(locale: string): Promise<string[]> {
  const allPosts = await getAllBlogPosts(locale);
  const categories = allPosts.map((post) => post.category);
  return Array.from(new Set(categories));
}

/**
 * Get all unique tags
 */
export async function getAllTags(locale: string): Promise<string[]> {
  const allPosts = await getAllBlogPosts(locale);
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(
  query: string,
  locale: string
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(locale);
  const lowercaseQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.description.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get related posts (same category, different slug)
 */
export async function getRelatedPosts(
  slug: string,
  locale: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const currentPost = await getBlogPost(slug, locale);

  if (!currentPost) {
    return [];
  }

  const categoryPosts = await getPostsByCategory(currentPost.category, locale);

  return categoryPosts
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

/**
 * Get recent posts
 */
export async function getRecentPosts(
  locale: string,
  limit: number = 5
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(locale);
  return allPosts.slice(0, limit);
}
