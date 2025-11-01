/**
 * Button Component - Design System
 *
 * Enterprise-grade button component with variants, sizes, and states
 */

'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { designTokens } from '@/lib/design-tokens';

const { colors, button: buttonTokens, transitions, accessibility } = designTokens;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Icon before text
   */
  startIcon?: ReactNode;

  /**
   * Icon after text
   */
  endIcon?: ReactNode;

  /**
   * Button content
   */
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: colors.primary[500],
        color: colors.neutral.white,
        border: 'none',
      },
      secondary: {
        backgroundColor: colors.secondary[600],
        color: colors.neutral.white,
        border: 'none',
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary[600],
        border: `2px solid ${colors.primary[500]}`,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: colors.primary[600],
        border: 'none',
      },
      danger: {
        backgroundColor: colors.error[500],
        color: colors.neutral.white,
        border: 'none',
      },
    };

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        height: buttonTokens.size.sm.height,
        padding: buttonTokens.size.sm.padding,
        fontSize: buttonTokens.size.sm.fontSize,
      },
      md: {
        height: buttonTokens.size.md.height,
        padding: buttonTokens.size.md.padding,
        fontSize: buttonTokens.size.md.fontSize,
      },
      lg: {
        height: buttonTokens.size.lg.height,
        padding: buttonTokens.size.lg.padding,
        fontSize: buttonTokens.size.lg.fontSize,
      },
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: 600,
      borderRadius: buttonTokens.borderRadius,
      transition: buttonTokens.transition,
      cursor: loading || disabled ? 'not-allowed' : 'pointer',
      opacity: loading || disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
      minHeight: accessibility.minTouchTarget,
      position: 'relative',
      ...sizeStyles[size],
      ...variantStyles[variant],
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={className}
        style={{
          ...baseStyles,
          ...style,
        }}
        {...props}
      >
        {loading && (
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
        )}
        {!loading && startIcon && <span>{startIcon}</span>}
        <span>{children}</span>
        {!loading && endIcon && <span>{endIcon}</span>}

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
