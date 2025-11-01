/**
 * Offline Page
 *
 * Displayed when user is offline and requested page is not cached
 */

import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';

export const metadata: Metadata = {
  title: 'Offline - MSADDI',
  description: 'You are currently offline. Please check your internet connection.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  const t = useTranslations('offline');

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        {/* Icon */}
        <WifiOffIcon
          sx={{
            fontSize: 120,
            color: 'error.main',
            mb: 4,
            opacity: 0.8,
          }}
        />

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
          }}
        >
          {t('title')}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: 'text.secondary',
            mb: 4,
            maxWidth: 600,
          }}
        >
          {t('description')}
        </Typography>

        {/* Suggestions */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 3,
            mb: 4,
            maxWidth: 500,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            {t('suggestions.title')}
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t('suggestions.checkConnection')}
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t('suggestions.tryAgain')}
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t('suggestions.returnHome')}
              </Typography>
            </li>
          </ul>
        </Box>

        {/* Actions */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
            sx={{
              minWidth: 200,
            }}
          >
            {t('actions.retry')}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<HomeIcon />}
            component={Link}
            href="/"
            sx={{
              minWidth: 200,
            }}
          >
            {t('actions.home')}
          </Button>
        </Stack>

        {/* Additional Info */}
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 4,
            maxWidth: 600,
          }}
        >
          {t('info')}
        </Typography>
      </Box>
    </Container>
  );
}
