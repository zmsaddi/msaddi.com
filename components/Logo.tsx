'use client';

import { Box, Typography } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'light' | 'dark';
}

export default function Logo({ size = 'medium', color = 'dark' }: LogoProps) {
  const sizes = {
    small: {
      icon: 28,
      fontSize: '1.2rem',
      subtitle: '0.65rem',
    },
    medium: {
      icon: 40,
      fontSize: '1.8rem',
      subtitle: '0.75rem',
    },
    large: {
      icon: 56,
      fontSize: '2.5rem',
      subtitle: '0.9rem',
    },
  };

  const colors = {
    light: {
      primary: 'white',
      accent: '#60a5fa',
      subtitle: 'rgba(255,255,255,0.9)',
    },
    dark: {
      primary: '#1e3a8a',
      accent: '#2563eb',
      subtitle: '#64748b',
    },
  };

  const s = sizes[size];
  const c = colors[color];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      {/* Logo Icon */}
      <Box
        sx={{
          position: 'relative',
          width: s.icon,
          height: s.icon,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Hexagon Background */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${c.accent} 0%, ${c.primary} 100%)`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            boxShadow: `0 4px 12px ${c.accent}33`,
          }}
        />

        {/* Gear Icon */}
        <SettingsIcon
          sx={{
            position: 'relative',
            fontSize: s.icon * 0.6,
            color: 'white',
            animation: 'rotate 8s linear infinite',
            '@keyframes rotate': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            },
          }}
        />
      </Box>

      {/* Logo Text */}
      <Box>
        <Typography
          sx={{
            fontSize: s.fontSize,
            fontWeight: 800,
            lineHeight: 1,
            color: c.primary,
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          MSADDI
        </Typography>
        <Typography
          sx={{
            fontSize: s.subtitle,
            fontWeight: 600,
            lineHeight: 1.2,
            color: c.subtitle,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            mt: 0.25,
          }}
        >
          Metal EST.
        </Typography>
      </Box>
    </Box>
  );
}
