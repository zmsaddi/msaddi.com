/**
 * Blog Listing Page
 *
 * Displays all blog posts with filtering and search
 */

import { Metadata } from 'next';
import { use } from 'react';
import { Container, Typography, Box, Grid, Chip, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getAllCategories, getAllTags, type BlogPost } from '@/lib/blog/mdx';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog - Metal Fabrication Insights | MSADDI',
  description: 'Latest news, insights, and technical guides on laser cutting, metal bending, and fabrication from MSADDI experts.',
};

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = useTranslations('blog');

  const posts = await getAllBlogPosts(locale);
  const categories = await getAllCategories(locale);
  const tags = await getAllTags(locale);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('subtitle')}
          </Typography>
        </Box>

        {/* Categories */}
        {categories.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('categories')}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  component={Link}
                  href={`/${locale}/blog/category/${category}`}
                  clickable
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.slug}>
              <BlogPostCard post={post} locale={locale} />
            </Grid>
          ))}
        </Grid>

        {/* No Posts */}
        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {t('no_posts')}
            </Typography>
          </Box>
        )}

        {/* Popular Tags */}
        {tags.length > 0 && (
          <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('popular_tags')}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  size="small"
                  component={Link}
                  href={`/${locale}/blog/tag/${tag}`}
                  clickable
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Container>
  );
}

function BlogPostCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <Box
      component={Link}
      href={`/${locale}/blog/${post.slug}`}
      sx={{
        display: 'block',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          '& .blog-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        {/* Image */}
        {post.image && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 200,
              overflow: 'hidden',
              backgroundColor: 'grey.200',
            }}
          >
            <Box
              className="blog-image"
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.3s',
              }}
            />
          </Box>
        )}

        {/* Content */}
        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Category & Date */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Chip label={post.category} size="small" color="primary" />
            <Typography variant="caption" color="text.secondary">
              {format(new Date(post.date), 'MMM d, yyyy')}
            </Typography>
          </Stack>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.description}
          </Typography>

          {/* Meta */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}
          >
            <Typography variant="caption" color="text.secondary">
              {post.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.readingTime}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
