/**
 * Blog Post Detail Page
 *
 * Displays individual blog post with MDX content
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Chip, Stack, Divider } from '@mui/material';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogSlugs, getBlogPostWithMDX, getRelatedPosts } from '@/lib/blog/mdx';
import { format } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export async function generateStaticParams() {
  const locales = ['en', 'ar', 'tr'];
  const params = [];

  for (const locale of locales) {
    const slugs = getAllBlogSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostWithMDX(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | MSADDI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPostWithMDX(slug, locale);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, locale, 3);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        {/* Breadcrumbs */}
        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Link href={`/${locale}/blog`} style={{ textDecoration: 'none' }}>
            <Typography color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
              Blog
            </Typography>
          </Link>
          <Typography color="text.secondary">/</Typography>
          <Typography color="text.secondary">{post.title}</Typography>
        </Stack>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          {/* Category */}
          <Chip label={post.category} color="primary" sx={{ mb: 2 }} />

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </Typography>

          {/* Meta */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon fontSize="small" />
              <Typography variant="body2">{post.author}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">{format(new Date(post.date), 'MMMM d, yyyy')}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{post.readingTime}</Typography>
            </Stack>
          </Stack>

          {/* Description */}
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            {post.description}
          </Typography>
        </Box>

        {/* Featured Image */}
        {post.image && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 400,
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Box>
        )}

        {/* MDX Content */}
        <Box
          className="blog-content"
          sx={{
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              mt: 4,
              mb: 2,
              fontWeight: 600,
            },
            '& h2': {
              fontSize: '2rem',
              borderBottom: 1,
              borderColor: 'divider',
              pb: 1,
            },
            '& h3': {
              fontSize: '1.5rem',
            },
            '& p': {
              mb: 2,
              lineHeight: 1.8,
            },
            '& ul, & ol': {
              mb: 2,
              pl: 3,
            },
            '& li': {
              mb: 1,
            },
            '& code': {
              backgroundColor: 'grey.100',
              padding: '2px 6px',
              borderRadius: 1,
              fontSize: '0.9em',
            },
            '& pre': {
              backgroundColor: 'grey.100',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              mb: 2,
            },
            '& blockquote': {
              borderLeft: 4,
              borderColor: 'primary.main',
              pl: 2,
              ml: 0,
              fontStyle: 'italic',
              color: 'text.secondary',
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          }}
        >
          <MDXRemote source={post.mdxSource} />
        </Box>

        {/* Tags */}
        {post.tags.length > 0 && (
          <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tags
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  component={Link}
                  href={`/${locale}/blog/tag/${tag}`}
                  clickable
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
              Related Articles
            </Typography>
            <Stack spacing={3}>
              {relatedPosts.map((relatedPost) => (
                <Box
                  key={relatedPost.slug}
                  component={Link}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  sx={{
                    display: 'block',
                    p: 3,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 2,
                    },
                  }}
                >
                  <Chip label={relatedPost.category} size="small" color="primary" sx={{ mb: 1 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {relatedPost.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {relatedPost.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {format(new Date(relatedPost.date), 'MMM d, yyyy')} · {relatedPost.readingTime}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* CTA */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Ready to Start Your Project?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Get a quote for your metal fabrication needs today
          </Typography>
          <Box
            component={Link}
            href={`/${locale}/rfq`}
            sx={{
              display: 'inline-block',
              px: 4,
              py: 1.5,
              backgroundColor: 'white',
              color: 'primary.main',
              borderRadius: 1,
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            Request a Quote
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
