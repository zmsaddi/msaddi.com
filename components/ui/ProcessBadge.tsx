/**
 * Process Badge - Industrial Component
 *
 * Visual indicator for manufacturing processes
 * Uses industry-specific color coding
 */

'use client';

import { HTMLAttributes } from 'react';
import { designTokens } from '@/lib/design-tokens';

const { industry, typography, spacing, borderRadius } = designTokens;

export type ProcessType = 'cutting' | 'bending' | 'welding' | 'finishing' | 'assembly';

export interface ProcessBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Process type
   */
  process: ProcessType;

  /**
   * Custom label (overrides default)
   */
  label?: string;

  /**
   * Show process icon
   */
  showIcon?: boolean;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

export function ProcessBadge({
  process,
  label,
  showIcon = true,
  size = 'md',
  className = '',
  style,
  ...props
}: ProcessBadgeProps) {
  const processColor = industry.processes[process];

  // Process configuration
  const processConfig: Record<ProcessType, { label: string; icon: string }> = {
    cutting: { label: 'Laser Cutting', icon: '✂' },
    bending: { label: 'Bending & Forming', icon: '⟲' },
    welding: { label: 'Welding', icon: '⚡' },
    finishing: { label: 'Finishing', icon: '✨' },
    assembly: { label: 'Assembly', icon: '⚙' },
  };

  const config = processConfig[process];

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
    color: '#fff',
    backgroundColor: processColor,
    borderRadius: borderRadius.md,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
          }}
        >
          {config.icon}
        </span>
      )}
      <span>{label || config.label}</span>
    </div>
  );
}

export default ProcessBadge;
