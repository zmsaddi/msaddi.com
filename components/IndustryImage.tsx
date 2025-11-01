'use client';

import { Box, Typography } from '@mui/material';
import {
  Settings as PrecisionIcon,
  Engineering as EngineeringIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

interface IndustryImageProps {
  type: 'laser' | 'bending' | 'spinning' | 'fabrication' | 'quality';
  title: string;
  height?: number | string;
}

export default function IndustryImage({ type, title, height = 400 }: IndustryImageProps) {
  const imageConfig = {
    laser: {
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
      icon: <PrecisionIcon sx={{ fontSize: 120, color: 'white', opacity: 0.3 }} />,
      pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
    },
    bending: {
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
      icon: <BuildIcon sx={{ fontSize: 120, color: 'white', opacity: 0.3 }} />,
      pattern: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,.05) 15px, rgba(255,255,255,.05) 30px)',
    },
    spinning: {
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
      icon: <EngineeringIcon sx={{ fontSize: 120, color: 'white', opacity: 0.3 }} />,
      pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.05) 0%, transparent 50%)',
    },
    fabrication: {
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
      icon: <BuildIcon sx={{ fontSize: 120, color: 'white', opacity: 0.3 }} />,
      pattern: 'repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,.05) 20px, rgba(255,255,255,.05) 40px)',
    },
    quality: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
      icon: <PrecisionIcon sx={{ fontSize: 120, color: 'white', opacity: 0.3 }} />,
      pattern: 'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,.05) 15deg, transparent 30deg)',
    },
  };

  const config = imageConfig[type];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        background: config.gradient,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 4,
      }}
    >
      {/* Pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: config.pattern,
        }}
      />

      {/* Icon */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {config.icon}
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 80,
            height: 3,
            bgcolor: 'white',
            opacity: 0.7,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Metallic effect overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        }}
      />
    </Box>
  );
}
