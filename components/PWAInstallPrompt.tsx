'use client';

/**
 * PWA Install Prompt
 *
 * Displays an install prompt for Progressive Web App functionality
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAInstallPrompt() {
  const t = useTranslations('pwa');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    setIsStandalone(standalone);

    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Check if prompt was dismissed recently
    const dismissedAt = localStorage.getItem('pwa-prompt-dismissed');
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentlyDismissed = dismissedAt && parseInt(dismissedAt) > oneWeekAgo;

    // Don't show if already installed or recently dismissed
    if (standalone || recentlyDismissed) {
      return;
    }

    // Show iOS instructions after a delay
    if (ios && !standalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }

    // Handle beforeinstallprompt event for Android/Desktop
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
      localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Don't render if standalone or no prompt
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <Slide direction="up" in={showPrompt} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 'auto' },
          zIndex: 1400,
          maxWidth: { xs: '100%', sm: 400 },
        }}
      >
        <Card
          elevation={8}
          sx={{
            borderRadius: 2,
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
            {/* Close Button */}
            <IconButton
              onClick={handleDismiss}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'text.secondary',
              }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>

            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <PhoneIphoneIcon
                sx={{
                  fontSize: 40,
                  color: 'primary.main',
                  mr: 1.5,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('install_title')}
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2.5,
                lineHeight: 1.6,
              }}
            >
              {isIOS ? t('install_description_ios') : t('install_description')}
            </Typography>

            {/* iOS Instructions */}
            {isIOS && (
              <Box
                sx={{
                  backgroundColor: 'background.default',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  {t('ios_instructions_title')}
                </Typography>
                <Typography variant="caption" component="ol" sx={{ pl: 2, m: 0 }}>
                  <li>{t('ios_step_1')}</li>
                  <li>{t('ios_step_2')}</li>
                  <li>{t('ios_step_3')}</li>
                </Typography>
              </Box>
            )}

            {/* Install Button (non-iOS) */}
            {!isIOS && deferredPrompt && (
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<GetAppIcon />}
                onClick={handleInstall}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {t('install_button')}
              </Button>
            )}

            {/* Dismiss Link */}
            <Button
              variant="text"
              fullWidth
              size="small"
              onClick={handleDismiss}
              sx={{
                mt: 1,
                textTransform: 'none',
                color: 'text.secondary',
              }}
            >
              {t('maybe_later')}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
}
