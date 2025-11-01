'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * Optimized Image Component
 *
 * Enforces SEO best practices per Arabic specification:
 * - Mandatory descriptive alt text (build fails if missing)
 * - Automatic lazy loading for performance
 * - WebP format support with fallbacks
 * - Responsive sizing
 * - Loading skeletons for better UX
 *
 * Usage:
 * <OptimizedImage
 *   src="/products/laser-cutter.webp"
 *   alt="3000W Fiber Laser Cutting Machine - Industrial Metal Fabrication Equipment"
 *   width={800}
 *   height={600}
 *   priority={false} // Set true for above-the-fold images
 * />
 */

interface OptimizedImageProps {
  src: string;
  alt: string; // REQUIRED - descriptive alt text for SEO
  width: number;
  height: number;
  priority?: boolean; // Set true for LCP images (above the fold)
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number; // 1-100, default 75
  className?: string;
  onLoad?: () => void;
  sizes?: string; // Responsive sizes attribute
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  objectFit = 'cover',
  quality = 75,
  className = '',
  onLoad,
  sizes,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Validate alt text is descriptive (not just filename)
  if (process.env.NODE_ENV === 'development') {
    const invalidAltPatterns = [
      /^image$/i,
      /^img$/i,
      /^photo$/i,
      /^picture$/i,
      /^\d+$/,
      /\.(jpg|jpeg|png|webp|gif)$/i,
    ];

    const isInvalidAlt = invalidAltPatterns.some((pattern) => pattern.test(alt));
    if (isInvalidAlt || alt.length < 10) {
      console.warn(
        `⚠️ SEO Warning: Image "${src}" has insufficient alt text: "${alt}". ` +
          `Alt text should be descriptive (minimum 10 characters) and explain the image content.`
      );
    }
  }

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      className={className}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* Error Fallback */}
      {hasError ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            color: 'grey.500',
            fontSize: '0.875rem',
          }}
        >
          Image failed to load
        </Box>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes || `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </Box>
  );
}
