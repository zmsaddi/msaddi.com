'use client';

import { Box, Paper } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function GoogleMap() {
  const t = useTranslations('common');

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        height: { xs: 300, md: 400 },
        width: '100%',
      }}
    >
      <Box
        component="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.234!2d37.1398!3d36.2065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDEyJzIzLjQiTiAzN8KwMDgnMjMuMyJF!5e0!3m2!1sen!2s!4v1234567890"
        sx={{
          border: 0,
          width: '100%',
          height: '100%',
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t('map_title')}
      />
    </Paper>
  );
}
