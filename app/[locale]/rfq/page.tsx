import { getTranslations } from 'next-intl/server';
import { Container, Typography, Box, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { RFQFormWrapper } from '@/components/LazyComponents';

interface RFQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RFQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rfq' });

  return {
    title: `${t('title')} | MSADDI EST.`,
    description: t('subtitle'),
  };
}

export default async function RFQPage({ params }: RFQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rfq' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href={`/${locale}`} passHref legacyBehavior>
            <MuiLink
              sx={{
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {tCommon('home')}
            </MuiLink>
          </Link>
          <Typography color="text.primary">
            {t('title')}
          </Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            {t('subtitle')}
          </Typography>
        </Box>

        {/* RFQ Form */}
        <RFQFormWrapper />

        {/* Additional Information */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {tCommon('contact_info')}
          </Typography>
          <Typography variant="body1" paragraph>
            For urgent inquiries or questions, please contact us directly:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">
              <strong>{tCommon('phone')}:</strong> +963 944 244 604
            </Typography>
            <Typography variant="body2">
              <strong>{tCommon('email')}:</strong> Sales@msaddi.com
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> Alshqaeef, Aleppo, Syria
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
