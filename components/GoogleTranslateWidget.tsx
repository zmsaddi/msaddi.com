'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Box, Alert, IconButton, Tooltip } from '@mui/material';
import { Close as CloseIcon, Translate as TranslateIcon } from '@mui/icons-material';

/**
 * Google Translate Widget Component
 *
 * Provides optional overlay translation for unsupported languages.
 * - Only activates when user manually enables it
 * - SEO-safe with rel="nofollow" to prevent indexing
 * - Shows "machine translation" warning badge
 *
 * Per Arabic specification:
 * - This is for UNSUPPORTED languages only
 * - Official languages (ar, en, tr) use human translations
 * - Google Translate is overlay-only, not replacement
 */

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            layout: number;
            autoDisplay: boolean;
            multilanguagePage?: boolean;
          },
          elementId: string
        ) => void;
        Element: {
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

interface GoogleTranslateWidgetProps {
  enabledByDefault?: boolean;
}

export default function GoogleTranslateWidget({
  enabledByDefault = false,
}: GoogleTranslateWidgetProps) {
  const [isEnabled, setIsEnabled] = useState(enabledByDefault);
  const [showNotice, setShowNotice] = useState(true);
  const currentLocale = useLocale();
  const t = useTranslations('common');

  useEffect(() => {
    if (!isEnabled) return;

    // Load Google Translate script
    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.setAttribute('rel', 'nofollow'); // SEO-safe: prevent indexing

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: currentLocale,
            // Include additional languages not officially supported
            includedLanguages: 'es,fr,de,it,pt,ru,zh-CN,ja,ko,hi,bn,ur,fa,he',
            layout: window.google.translate.Element.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
          },
          'google_translate_element'
        );
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
  }, [isEnabled, currentLocale]);

  // Official languages don't need Google Translate overlay
  const officialLanguages = ['ar', 'en', 'tr'];
  if (officialLanguages.includes(currentLocale)) {
    return null;
  }

  if (!isEnabled) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 90, md: 100 },
          right: { xs: 16, md: 24 },
          zIndex: 999,
        }}
      >
        <Tooltip title="Enable Auto-Translation (Machine)" placement="left">
          <IconButton
            onClick={() => setIsEnabled(true)}
            sx={{
              bgcolor: 'info.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'info.dark',
              },
              boxShadow: 3,
            }}
            aria-label={t('enable_translation')}
          >
            <TranslateIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <>
      {/* Machine Translation Warning Badge */}
      {showNotice && (
        <Alert
          severity="warning"
          sx={{
            position: 'fixed',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1100,
            maxWidth: 600,
            width: '90%',
          }}
          action={
            <IconButton
              aria-label={t('close')}
              color="inherit"
              size="small"
              onClick={() => setShowNotice(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <strong>Machine Translation Active:</strong> This is an automated
          translation and may contain errors. For the best experience, please
          use our official languages: العربية (Arabic), English, or Türkçe.
        </Alert>
      )}

      {/* Google Translate Widget Container */}
      <Box
        id="google_translate_element"
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          zIndex: 1000,
          bgcolor: 'white',
          p: 1,
          borderRadius: 2,
          boxShadow: 3,
        }}
      />

      {/* Disable Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 90, md: 100 },
          right: { xs: 16, md: 24 },
          zIndex: 999,
        }}
      >
        <Tooltip title="Disable Auto-Translation" placement="left">
          <IconButton
            onClick={() => {
              setIsEnabled(false);
              window.location.reload(); // Reload to remove translations
            }}
            sx={{
              bgcolor: 'grey.600',
              color: 'white',
              '&:hover': {
                bgcolor: 'grey.800',
              },
              boxShadow: 3,
            }}
            aria-label={t('disable_translation')}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}
