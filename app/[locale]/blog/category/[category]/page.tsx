/**
 * Blog Category Filter Page
 *
 * Displays blog posts filtered by category
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Grid, Chip, Stack, Breadcrumbs } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getPostsByCategory, getAllCategories, type BlogPost } from '@/lib/blog/mdx';
import { format } from 'date-fns';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export async function generateStaticParams() {
  const locales = ['en', 'ar', 'tr'];
  const params = [];

  for (const locale of locales) {
    const categories = await getAllCategories(locale);
    for (const category of categories) {
      params.push({ locale, category });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `${category} - Blog | MSADDI`,
    description: `Browse ${category} articles from MSADDI metal fabrication blog`,
  };
}

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const t = useTranslations('blog');

  const posts = await getPostsByCategory(category, locale);

  if (posts.length === 0) {
    notFound();
  }

  const allCategories = await getAllCategories(locale);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 4 }}
        >
          <Link
            href={`/${locale}/blog`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              color="primary"
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              {t('title')}
            </Typography>
          </Link>
          <Typography color="text.secondary">{category}</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label={category}
            color="primary"
            sx={{ mb: 2, fontSize: '1.1rem', height: '40px', px: 2 }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('posts_in_category', { category })}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </Typography>
        </Box>

        {/* Other Categories */}
        {allCategories.length > 1 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('categories')}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {allCategories
                .filter((cat) => cat !== category)
                .map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    component={Link}
                    href={`/${locale}/blog/category/${cat}`}
                    clickable
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                ))}
              <Chip
                label={t('all_categories')}
                component={Link}
                href={`/${locale}/blog`}
                clickable
                variant="outlined"
                color="primary"
                sx={{ mb: 1 }}
              />
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
