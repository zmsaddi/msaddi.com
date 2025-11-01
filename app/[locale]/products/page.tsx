'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageStructuredData from '@/components/PageStructuredData';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function ProductsPage() {
  const t = useTranslations('products');

  // الفئات الرئيسية للمنتجات المعدنية
  const productCategories = [
    {
      id: 'enclosures',
      titleKey: 'cat_1_title',
      descKey: 'cat_1_desc',
      materialsKey: 'cat_1_materials',
      specificationsKey: 'cat_1_specs',
      color: '#ef4444',
    },
    {
      id: 'brackets',
      titleKey: 'cat_2_title',
      descKey: 'cat_2_desc',
      materialsKey: 'cat_2_materials',
      specificationsKey: 'cat_2_specs',
      color: '#3b82f6',
    },
    {
      id: 'panels',
      titleKey: 'cat_3_title',
      descKey: 'cat_3_desc',
      materialsKey: 'cat_3_materials',
      specificationsKey: 'cat_3_specs',
      color: '#10b981',
    },
    {
      id: 'components',
      titleKey: 'cat_4_title',
      descKey: 'cat_4_desc',
      materialsKey: 'cat_4_materials',
      specificationsKey: 'cat_4_specs',
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageStructuredData pageType="products" />
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            color: 'white',
            py: { xs: 10, md: 14 },
          }}
        >
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              textAlign="center"
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                {t('title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  opacity: 0.95,
                  maxWidth: '800px',
                  mx: 'auto',
                }}
              >
                {t('subtitle')}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Product Categories */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            mb={6}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              mb={2}
              color="primary.main"
              sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              {t('categories_title')}
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {productCategories.map((category, index) => (
              <Grid item xs={12} md={6} key={category.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 12,
                    },
                  }}
                >
                  {/* Category Header */}
                  <Box
                    sx={{
                      bgcolor: category.color,
                      color: 'white',
                      p: 3,
                    }}
                  >
                    <Typography variant="h4" fontWeight={700}>
                      {t(category.titleKey)}
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    {/* Description */}
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      mb={3}
                      lineHeight={1.8}
                    >
                      {t(category.descKey)}
                    </Typography>

                    {/* Materials */}
                    <Box mb={3}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        mb={1.5}
                        color="text.primary"
                      >
                        {t('materials_label')}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {t(category.materialsKey)
                          .split(',')
                          .map((material: string, i: number) => (
                            <Chip
                              key={i}
                              label={material.trim()}
                              size="small"
                              sx={{
                                bgcolor: 'grey.100',
                                fontWeight: 600,
                              }}
                            />
                          ))}
                      </Box>
                    </Box>

                    {/* Specifications */}
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        mb={1.5}
                        color="text.primary"
                      >
                        {t('specifications_label')}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {t(category.specificationsKey)
                          .split('\n')
                          .map((spec: string, i: number) => (
                            <Box
                              key={i}
                              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                              <CheckIcon
                                sx={{ fontSize: 18, color: category.color }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                {spec.replace('• ', '')}
                              </Typography>
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Technical Standards */}
        <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="md">
            <MotionBox
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              textAlign="center"
            >
              <Typography
                variant="h3"
                fontWeight={700}
                mb={4}
                color="primary.main"
                sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                {t('standards_title')}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  bgcolor: 'white',
                  p: 4,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                {t('standards_list')
                  .split('\n')
                  .map((standard: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        textAlign: 'left',
                      }}
                    >
                      <CheckIcon color="primary" />
                      <Typography variant="body1" fontWeight={600}>
                        {standard.replace('• ', '')}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </MotionBox>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" fontWeight={700} mb={3} color="primary.main">
              {t('cta_title')}
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              {t('cta_description')}
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowIcon />}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: 4,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 8,
                },
                transition: 'all 0.3s',
              }}
            >
              {t('cta_button')}
            </Button>
          </MotionBox>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
