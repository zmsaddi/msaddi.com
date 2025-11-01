'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleMap from '@/components/GoogleMap';
import PageStructuredData from '@/components/PageStructuredData';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  WorkHistory as WorkHistoryIcon,
  Visibility as VisibilityIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

export default function AboutPage() {
  const t = useTranslations('about');

  const capabilities = [
    {
      title: t('cap_1_title'),
      desc: t('cap_1_desc'),
      color: '#ef4444',
    },
    {
      title: t('cap_2_title'),
      desc: t('cap_2_desc'),
      color: '#3b82f6',
    },
    {
      title: t('cap_3_title'),
      desc: t('cap_3_desc'),
      color: '#10b981',
    },
    {
      title: t('cap_4_title'),
      desc: t('cap_4_desc'),
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageStructuredData pageType="about" />
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
                }}
              >
                {t('subtitle')}
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Description Section */}
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ lineHeight: 2, fontSize: { xs: '1.1rem', md: '1.3rem' } }}
            >
              {t('description')}
            </Typography>
          </MotionBox>
        </Container>

        {/* Mission and Vision */}
        <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <MotionCard
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <WorkHistoryIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                      <Typography variant="h4" fontWeight={700} color="primary.main">
                        {t('mission_title')}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.9, fontSize: '1.1rem' }}
                    >
                      {t('mission_description')}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <MotionCard
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'secondary.main',
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <VisibilityIcon sx={{ fontSize: 48, color: 'secondary.main' }} />
                      <Typography variant="h4" fontWeight={700} color="secondary.main">
                        {t('vision_title')}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.9, fontSize: '1.1rem' }}
                    >
                      {t('vision_description')}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Technical Capabilities */}
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
              color="primary.main"
              sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              {t('capabilities_title')}
            </Typography>
          </MotionBox>

          <Grid container spacing={3}>
            {capabilities.map((cap, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionPaper
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    borderTop: '4px solid',
                    borderColor: cap.color,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                    sx={{ color: cap.color }}
                  >
                    {cap.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                    {cap.desc}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Location Section */}
        <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="md">
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={4}
                  textAlign="center"
                  color="primary.main"
                >
                  {t('find_us_title')}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Typography variant="body1" fontSize="1.1rem">
                      Alshqaeef Industrial Zone, Aleppo, Syria
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body1" fontSize="1.1rem">
                        info@msaddi.com
                      </Typography>
                      <Typography variant="body1" fontSize="1.1rem">
                        sales@msaddi.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Typography variant="body1" fontSize="1.1rem">
                      +963 944 244 604
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WhatsAppIcon sx={{ fontSize: 32, color: '#25D366' }} />
                    <Button
                      variant="outlined"
                      color="success"
                      href="https://wa.me/963944244604"
                      target="_blank"
                      sx={{ fontWeight: 600 }}
                    >
                      {t('common.whatsapp_chat')}
                    </Button>
                  </Box>
                </Box>
              </Paper>

              {/* Google Map */}
              <Box sx={{ mt: 4 }}>
                <GoogleMap />
              </Box>
            </MotionBox>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
