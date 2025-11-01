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
  CardContent,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Architecture as PrecisionIcon,
  FlashOn as SpeedIcon,
  VerifiedUser as CertifiedIcon,
  Engineering as EngineeringIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function CapabilitiesPage() {
  const t = useTranslations('capabilities');

  // Equipment specifications
  const equipment = [
    {
      id: 'laser',
      icon: <PrecisionIcon sx={{ fontSize: 48 }} />,
      nameKey: 'eq_1_name',
      specsKey: 'eq_1_specs',
      color: '#ef4444',
    },
    {
      id: 'bending',
      icon: <EngineeringIcon sx={{ fontSize: 48 }} />,
      nameKey: 'eq_2_name',
      specsKey: 'eq_2_specs',
      color: '#3b82f6',
    },
    {
      id: 'spinning',
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      nameKey: 'eq_3_name',
      specsKey: 'eq_3_specs',
      color: '#10b981',
    },
    {
      id: 'quality',
      icon: <CertifiedIcon sx={{ fontSize: 48 }} />,
      nameKey: 'eq_4_name',
      specsKey: 'eq_4_specs',
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageStructuredData pageType="capabilities" />
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

        {/* Equipment Capabilities */}
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
              {t('equipment_title')}
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {equipment.map((item, index) => (
              <Grid item xs={12} md={6} key={item.id}>
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
                  <Box
                    sx={{
                      bgcolor: item.color,
                      color: 'white',
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    {item.icon}
                    <Typography variant="h4" fontWeight={700}>
                      {t(item.nameKey)}
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {t(item.specsKey)
                        .split('\n')
                        .map((spec: string, i: number) => (
                          <Box
                            key={i}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1,
                              bgcolor: 'grey.50',
                              p: 2,
                              borderRadius: 2,
                            }}
                          >
                            <Typography
                              variant="body1"
                              color="text.primary"
                              fontWeight={600}
                            >
                              {spec.replace('• ', '')}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Material Capabilities Table */}
        <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
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
                mb={4}
                color="primary.main"
                sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                {t('materials_title')}
              </Typography>
            </MotionBox>

            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ borderRadius: 3, overflow: 'hidden' }}
            >
              <Table>
                <TableHead sx={{ bgcolor: 'primary.main' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                      {t('table_material')}
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                      {t('table_thickness')}
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                      {t('table_processes')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t('materials_table')
                    .split('\n')
                    .map((row: string, index: number) => {
                      const [material, thickness, processes] = row.split('|');
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            '&:nth-of-type(odd)': { bgcolor: 'grey.50' },
                            '&:hover': { bgcolor: 'primary.50' },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600 }}>{material}</TableCell>
                          <TableCell>{thickness}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {processes.split(',').map((proc: string, i: number) => (
                                <Chip
                                  key={i}
                                  label={proc.trim()}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>

        {/* Production Capacity */}
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
              mb={4}
              color="primary.main"
              sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              {t('capacity_title')}
            </Typography>
          </MotionBox>

          <Grid container spacing={3}>
            {t('capacity_stats')
              .split('\n')
              .map((stat: string, index: number) => {
                const [label, value] = stat.split(':');
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <MotionBox
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          borderRadius: 3,
                          bgcolor: 'primary.main',
                          color: 'white',
                          height: '100%',
                        }}
                      >
                        <Typography variant="h3" fontWeight={800} mb={1}>
                          {value.trim()}
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {label.trim()}
                        </Typography>
                      </Card>
                    </MotionBox>
                  </Grid>
                );
              })}
          </Grid>
        </Container>

        {/* Quality Certifications */}
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
                {t('certifications_title')}
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
                {t('certifications_list')
                  .split('\n')
                  .map((cert: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        textAlign: 'left',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'primary.50',
                      }}
                    >
                      <CertifiedIcon color="primary" sx={{ fontSize: 32 }} />
                      <Typography variant="body1" fontWeight={600}>
                        {cert.replace('• ', '')}
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
