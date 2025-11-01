'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import PageStructuredData from '@/components/PageStructuredData';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Engineering as EngineeringIcon,
  VerifiedUser as VerifiedIcon,
  Settings as PrecisionIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// Placeholder stock images - will be replaced with actual company photos
const stockImages = {
  services: {
    laserCutting: {
      url: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=2940',
      alt: 'Laser Cutting Service',
    },
    cncBending: {
      url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2940',
      alt: 'CNC Bending Service',
    },
    metalSpinning: {
      url: 'https://images.unsplash.com/photo-1590669152421-34036193e91c?q=80&w=2940',
      alt: 'Metal Spinning Service',
    },
  },
};

export default function HomePage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const features = [
    {
      icon: <PrecisionIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.feature_1_title'),
      desc: t('home.feature_1_desc'),
    },
    {
      icon: <EngineeringIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.feature_2_title'),
      desc: t('home.feature_2_desc'),
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.feature_3_title'),
      desc: t('home.feature_3_desc'),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.feature_4_title'),
      desc: t('home.feature_4_desc'),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageStructuredData pageType="home" />
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Hero locale={locale} />

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                color: 'primary.main',
              }}
            >
              {t('home.why_us_title')}
            </Typography>

            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}
            >
              {t('home.why_us_subtitle')}
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    transition: 'all 0.3s',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" fontWeight={700} mb={2}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Stats Section */}
        <Box sx={{ bgcolor: 'grey.50', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {[
                { number: '±0.127mm', label: t('home.stat_laser_precision_label') },
                { number: '±0.5°', label: t('home.stat_bending_accuracy_label') },
                { number: '25mm', label: t('home.stat_max_thickness_label') },
                { number: '1500×3000mm', label: t('home.stat_max_size_label') },
              ].map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <MotionPaper
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'white',
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      color="primary.main"
                      sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {stat.label}
                    </Typography>
                  </MotionPaper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Services Showcase with Images */}
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
              variant="h3"
              fontWeight={700}
              mb={2}
              color="primary.main"
              sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              {t('home.services_title')}
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {[
              {
                imageKey: 'laserCutting' as const,
                titleKey: 'services.service_1_title',
                delay: 0,
              },
              {
                imageKey: 'cncBending' as const,
                titleKey: 'services.service_2_title',
                delay: 0.1,
              },
              {
                imageKey: 'metalSpinning' as const,
                titleKey: 'services.service_3_title',
                delay: 0.2,
              },
            ].map((service, index) => {
              const serviceImage = stockImages.services[service.imageKey];
              return (
                <Grid item xs={12} md={4} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: service.delay }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: 300,
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: 4,
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 8,
                          transition: 'all 0.3s ease',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Image
                        src={serviceImage.url}
                        alt={serviceImage.alt}
                        fill
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                      {/* Gradient overlay for text */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: 3,
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            textAlign: 'center',
                          }}
                        >
                          {t(service.titleKey)}
                        </Typography>
                      </Box>
                    </Box>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            color: 'white',
            py: { xs: 8, md: 12 },
          }}
        >
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
                mb={2}
                sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
              >
                {t('home.cta_title')}
              </Typography>

              <Typography variant="h6" mb={5} sx={{ opacity: 0.95 }}>
                {t('home.cta_description')}
              </Typography>

              <Button
                component={Link}
                href="/contact"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 6,
                  py: 2.5,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                  transition: 'all 0.3s',
                }}
              >
                {t('common.contact_us')}
              </Button>
            </MotionBox>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
