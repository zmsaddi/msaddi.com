/**
 * Status Indicator - Industrial UX Component
 *
 * Specialized status indicators for manufacturing processes
 * Based on industry-specific design tokens
 */

'use client';

import { HTMLAttributes } from 'react';
import { designTokens } from '@/lib/design-tokens';

const { industry, typography, spacing, borderRadius } = designTokens;

export interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Status type
   */
  status: 'approved' | 'pending' | 'rejected' | 'inProgress';

  /**
   * Status label
   */
  label?: string;

  /**
   * Show icon
   */
  showIcon?: boolean;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

export function StatusIndicator({
  status,
  label,
  showIcon = true,
  size = 'md',
  className = '',
  style,
  ...props
}: StatusIndicatorProps) {
  // Status configuration
  const statusConfig = {
    approved: {
      color: industry.quality.approved,
      icon: '✓',
      defaultLabel: 'Approved',
    },
    pending: {
      color: industry.quality.pending,
      icon: '◷',
      defaultLabel: 'Pending',
    },
    rejected: {
      color: industry.quality.rejected,
      icon: '✗',
      defaultLabel: 'Rejected',
    },
    inProgress: {
      color: industry.quality.inProgress,
      icon: '◐',
      defaultLabel: 'In Progress',
    },
  };

  const config = statusConfig[status];

  // Size styles
  const sizeStyles: Record<string, { fontSize: string; padding: string; iconSize: string }> = {
    sm: {
      fontSize: typography.fontSize.xs,
      padding: `${spacing[1]} ${spacing[2]}`,
      iconSize: typography.fontSize.sm,
    },
    md: {
      fontSize: typography.fontSize.sm,
      padding: `${spacing[2]} ${spacing[3]}`,
      iconSize: typography.fontSize.base,
    },
    lg: {
      fontSize: typography.fontSize.base,
      padding: `${spacing[2]} ${spacing[4]}`,
      iconSize: typography.fontSize.lg,
    },
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: sizeStyles[size].padding,
    fontSize: sizeStyles[size].fontSize,
    fontWeight: typography.fontWeight.semibold,
    color: config.color,
    backgroundColor: `${config.color}15`,
    border: `2px solid ${config.color}`,
    borderRadius: borderRadius.md,
  };

  return (
    <div
      className={className}
      style={{
        ...baseStyles,
        ...style,
      }}
      {...props}
    >
      {showIcon && (
        <span
          style={{
            fontSize: sizeStyles[size].iconSize,
            fontWeight: typography.fontWeight.bold,
          }}
        >
          {config.icon}
        </span>
      )}
      <span>{label || config.defaultLabel}</span>
    </div>
  );
}

export default StatusIndicator;
