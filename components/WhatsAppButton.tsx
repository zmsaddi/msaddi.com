'use client';

import { Fab, Tooltip, Zoom } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '963944244604'; // Phone number without + or spaces

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // WhatsApp click-to-chat URL that works on all devices
    const message = encodeURIComponent(t('whatsapp_message'));
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Zoom in={isVisible}>
      <Tooltip title={t('whatsapp_chat')} placement="left" arrow>
        <Fab
          color="success"
          aria-label="whatsapp"
          onClick={handleClick}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            bgcolor: '#25D366',
            color: 'white',
            width: { xs: 56, md: 64 },
            height: { xs: 56, md: 64 },
            '&:hover': {
              bgcolor: '#128C7E',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
            zIndex: 1000,
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 32, md: 36 } }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
