/**
 * Badge Component - Design System
 *
 * Status indicators and labels
 */

'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { designTokens } from '@/lib/design-tokens';

const { colors, typography, spacing, borderRadius } = designTokens;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge variant
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Badge size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Dot indicator instead of text
   */
  dot?: boolean;

  /**
   * Badge content
   */
  children?: ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className = '',
  style,
  ...props
}: BadgeProps) {
  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: colors.neutral[200],
      color: colors.neutral[800],
    },
    primary: {
      backgroundColor: colors.primary[100],
      color: colors.primary[700],
    },
    success: {
      backgroundColor: colors.success[100],
      color: colors.success[700],
    },
    warning: {
      backgroundColor: colors.warning[100],
      color: colors.warning[800],
    },
    error: {
      backgroundColor: colors.error[100],
      color: colors.error[700],
    },
    info: {
      backgroundColor: colors.primary[50],
      color: colors.primary[600],
    },
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: dot ? '4px' : `${spacing[1]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs,
    },
    md: {
      padding: dot ? '6px' : `${spacing[1]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
    },
    lg: {
      padding: dot ? '8px' : `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.base,
    },
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.fontWeight.medium,
    borderRadius: dot ? '50%' : borderRadius.md,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <span
      className={className}
      style={{
        ...baseStyles,
        ...style,
      }}
      {...props}
    >
      {!dot && children}
    </span>
  );
}

export default Badge;
