'use client';

import { Box, Paper, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function GoogleMap() {
  const t = useTranslations('common');

  // Exact coordinates for MSADDI EST. in Alshqaeef, Aleppo, Syria
  // Source: https://maps.app.goo.gl/rMCedXqi6vPJTRck6
  const latitude = 36.253684;
  const longitude = 37.1688932;

  // Open Google Maps with direct navigation from user's current location
  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=ChIJD94vLyb5LxURUhxDsrEM1iY`;
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={{ position: 'relative' }}>
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
          src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3323.8!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDEyJzIzLjQiTiAzN8KwMDgnMjMuMyJF!5e0!3m2!1sen!2s!4v1730484000000!5m2!1sen!2s&q=${latitude},${longitude}&z=17`}
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

      {/* Get Directions Button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DirectionsIcon />}
          onClick={handleGetDirections}
          sx={{
            backgroundColor: '#ef4444',
            boxShadow: 3,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#dc2626',
              boxShadow: 6,
            },
          }}
        >
          {t('get_directions')}
        </Button>
      </Box>
    </Box>
  );
}
