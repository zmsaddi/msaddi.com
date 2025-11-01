'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageStructuredData from '@/components/PageStructuredData';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const services = [
    t('laser_cutting'),
    t('bending_forming'),
    t('metal_spinning'),
    t('custom_fabrication'),
    t('other'),
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageStructuredData pageType="contact" />
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

        {/* Contact Form and Info */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <MotionPaper
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                elevation={4}
                sx={{ p: 5, borderRadius: 3 }}
              >
                <Typography variant="h4" fontWeight={700} mb={4} color="primary.main">
                  {t('form_title')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label={t('name')}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label={t('email')}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('phone')}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('company')}
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label={t('service')}
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        variant="outlined"
                      >
                        <MenuItem value="">
                          <em>{t('select_service')}</em>
                        </MenuItem>
                        {services.map((service) => (
                          <MenuItem key={service} value={service}>
                            {service}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        multiline
                        rows={5}
                        label={t('message')}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={status === 'loading'}
                        endIcon={<SendIcon />}
                        sx={{
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: 2,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        {status === 'loading' ? t('sending') : t('send')}
                      </Button>
                    </Grid>

                    {status === 'success' && (
                      <Grid item xs={12}>
                        <Alert severity="success" sx={{ borderRadius: 2 }}>
                          {t('success')}
                        </Alert>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </MotionPaper>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h4" fontWeight={700} mb={4} color="primary.main">
                  {t('info_title')}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 3 }}>
                      <LocationIcon sx={{ fontSize: 32, color: 'primary.main', mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                          {t('location')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {t('address')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 3 }}>
                      <EmailIcon sx={{ fontSize: 32, color: 'primary.main', mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                          Email
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={0.5}>
                          {t('email_info')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {t('email_sales')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 3 }}>
                      <PhoneIcon sx={{ fontSize: 32, color: 'primary.main', mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                          {t('phone')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {t('phone_number')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 3 }}>
                      <AccessTimeIcon sx={{ fontSize: 32, color: 'primary.main', mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                          {t('working_hours')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {t('hours')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
