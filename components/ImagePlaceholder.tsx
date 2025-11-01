'use client';

import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface ImagePlaceholderProps {
  width: number;
  height: number;
  text: string;
  icon?: 'image' | 'camera';
  showDimensions?: boolean;
}

/**
 * Placeholder component for images not yet uploaded
 * Shows professional placeholder with instructions
 */
export default function ImagePlaceholder({
  width,
  height,
  text,
  icon = 'image',
  showDimensions = true,
}: ImagePlaceholderProps) {
  const Icon = icon === 'camera' ? CameraAltIcon : ImageIcon;

  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        border: '2px dashed rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)',
        },
      }}
    >
      <Icon
        sx={{
          fontSize: { xs: 48, md: 64 },
          color: 'rgba(0, 0, 0, 0.2)',
          mb: 2,
          zIndex: 1,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(0, 0, 0, 0.5)',
          fontWeight: 600,
          textAlign: 'center',
          px: 2,
          zIndex: 1,
        }}
      >
        {text}
      </Typography>
      {showDimensions && (
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(0, 0, 0, 0.3)',
            mt: 1,
            zIndex: 1,
          }}
        >
          {width}x{height}px recommended
        </Typography>
      )}
    </Box>
  );
}
