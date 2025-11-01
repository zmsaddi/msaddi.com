'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Build as BuildIcon,
  Bolt as BoltIcon,
  Loop as LoopIcon,
  Category as CategoryIcon,
  Science as ScienceIcon,
  Factory as FactoryIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function ServicesPage() {
  const t = useTranslations('services');

  const services = [
    {
      icon: <BoltIcon sx={{ fontSize: 60 }} />,
      title: t('service_1_title'),
      desc: t('service_1_desc'),
      features: t('service_1_features'),
      color: '#ef4444',
    },
    {
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      title: t('service_2_title'),
      desc: t('service_2_desc'),
      features: t('service_2_features'),
      color: '#3b82f6',
    },
    {
      icon: <LoopIcon sx={{ fontSize: 60 }} />,
      title: t('service_3_title'),
      desc: t('service_3_desc'),
      features: t('service_3_features'),
      color: '#10b981',
    },
    {
      icon: <CategoryIcon sx={{ fontSize: 60 }} />,
      title: t('service_4_title'),
      desc: t('service_4_desc'),
      features: '',
      color: '#8b5cf6',
    },
    {
      icon: <ScienceIcon sx={{ fontSize: 60 }} />,
      title: t('service_5_title'),
      desc: t('service_5_desc'),
      features: '',
      color: '#f59e0b',
    },
    {
      icon: <FactoryIcon sx={{ fontSize: 60 }} />,
      title: t('service_6_title'),
      desc: t('service_6_desc'),
      features: '',
      color: '#06b6d4',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

        {/* Services Grid */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 12,
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: service.color,
                      color: 'white',
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    {service.icon}
                    <Typography variant="h5" fontWeight={700}>
                      {service.title}
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      mb={2}
                      lineHeight={1.8}
                    >
                      {service.desc}
                    </Typography>

                    {service.features && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <List dense disablePadding>
                          {service.features.split('\n').map((feature: string, i: number) => (
                            <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature.replace('• ', '')}
                                primaryTypographyProps={{
                                  fontSize: '0.95rem',
                                  fontWeight: 500,
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Materials Section */}
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
                {t('materials_title')}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 4,
                }}
              >
                {t('materials')
                  .split('\n')
                  .map((material: string, index: number) => (
                    <Chip
                      key={index}
                      label={material.replace('• ', '')}
                      sx={{
                        bgcolor: 'white',
                        px: 2,
                        py: 3,
                        fontSize: '1rem',
                        fontWeight: 600,
                        border: '2px solid',
                        borderColor: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                        },
                        transition: 'all 0.3s',
                      }}
                    />
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
              Ready to Start Your Project?
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Get a free consultation and quote for your metal fabrication needs
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
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
              Contact Us Today
            </Button>
          </MotionBox>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
