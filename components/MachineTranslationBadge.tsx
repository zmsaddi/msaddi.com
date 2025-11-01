'use client';

import { useEffect, useState } from 'react';
import { Box, Alert, Typography, Button } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { useLocale } from 'next-intl';

/**
 * Machine Translation Badge Component
 *
 * Displays a prominent warning when Google Translate overlay is active.
 * Per Arabic specification requirements:
 * - Must show when machine translation is detected
 * - Warns users about potential inaccuracies
 * - Recommends switching to official languages
 * - SEO-safe (does not affect search indexing)
 */

export default function MachineTranslationBadge() {
  const [isMachineTranslation, setIsMachineTranslation] = useState(false);
  const currentLocale = useLocale();

  useEffect(() => {
    // Check if Google Translate is active
    const checkGoogleTranslate = () => {
      // Google Translate adds specific classes/elements when active
      const gtFrame = document.querySelector('.goog-te-banner-frame');
      const gtBody = document.body.classList.contains('translated-ltr') ||
                     document.body.classList.contains('translated-rtl');

      const isActive = !!(gtFrame || gtBody);
      setIsMachineTranslation(isActive);
    };

    // Check immediately
    checkGoogleTranslate();

    // Check periodically (Google Translate might load asynchronously)
    const interval = setInterval(checkGoogleTranslate, 1000);

    // Observer for DOM changes (when Google Translate injects elements)
    const observer = new MutationObserver(checkGoogleTranslate);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: false,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Don't show badge if not using machine translation
  if (!isMachineTranslation) {
    return null;
  }

  const handleSwitchToOfficial = () => {
    // Disable Google Translate and reload
    window.location.reload();
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        width: '100%',
      }}
    >
      <Alert
        severity="warning"
        icon={<WarningIcon />}
        sx={{
          borderRadius: 0,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleSwitchToOfficial}
            sx={{ fontWeight: 600 }}
          >
            Switch Language
          </Button>
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            ⚠️ Machine Translation Active
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            This is automated translation and may contain errors. For accurate
            information, use: <strong>العربية (Arabic)</strong>,{' '}
            <strong>English</strong>, or <strong>Türkçe</strong>.
          </Typography>
        </Box>
      </Alert>
    </Box>
  );
}
