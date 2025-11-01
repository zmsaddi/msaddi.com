'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, localeConfig } from '@/i18n';
import { Box, Button, ButtonGroup } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const getLocalizedPath = (newLocale: string) => {
    return pathname.replace(`/${currentLocale}`, `/${newLocale}`);
  };

  const handleLocaleChange = (newLocale: string) => {
    // Update cookie before navigation
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;

    // Navigate to new locale
    router.push(getLocalizedPath(newLocale));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LanguageIcon
        sx={{
          fontSize: { xs: 20, md: 24 },
          color: 'primary.main',
          display: { xs: 'none', sm: 'block' }
        }}
      />
      <ButtonGroup
        variant="outlined"
        size="large"
        sx={{
          '& .MuiButton-root': {
            minWidth: { xs: '50px', sm: '70px', md: '90px' },
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
            fontWeight: 600,
            borderColor: 'divider',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          },
        }}
      >
        {locales.map((locale) => {
          const isActive = locale === currentLocale;
          const config = localeConfig[locale];

          return (
            <Button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              sx={{
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'white' : 'text.primary',
                position: 'relative',
                direction: config.dir, // Apply RTL/LTR per language
                '&:hover': {
                  backgroundColor: isActive
                    ? 'primary.dark'
                    : 'rgba(37, 99, 235, 0.08)',
                },
                '&.MuiButton-outlined': {
                  borderColor: isActive ? 'primary.main' : 'divider',
                },
              }}
              startIcon={
                isActive ? (
                  <CheckCircleIcon sx={{ fontSize: '1.2rem !important' }} />
                ) : undefined
              }
            >
              {config.name}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
}
