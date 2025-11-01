/**
 * Material Chip - Industrial Component
 *
 * Visual indicator for material types in metal fabrication
 * Uses industry-specific color palette
 */

'use client';

import { HTMLAttributes } from 'react';
import { designTokens } from '@/lib/design-tokens';

const { industry, typography, spacing, borderRadius } = designTokens;

export type MaterialType = 'steel' | 'stainless' | 'aluminum' | 'copper' | 'brass' | 'bronze';

export interface MaterialChipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Material type
   */
  material: MaterialType;

  /**
   * Material specification (e.g., "304", "316", "6061")
   */
  specification?: string;

  /**
   * Show material color indicator
   */
  showColorDot?: boolean;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

export function MaterialChip({
  material,
  specification,
  showColorDot = true,
  size = 'md',
  className = '',
  style,
  ...props
}: MaterialChipProps) {
  const materialColor = industry.materials[material];

  // Material labels
  const materialLabels: Record<MaterialType, string> = {
    steel: 'Steel',
    stainless: 'Stainless Steel',
    aluminum: 'Aluminum',
    copper: 'Copper',
    brass: 'Brass',
    bronze: 'Bronze',
  };

  // Size styles
  const sizeStyles: Record<string, { fontSize: string; padding: string; dotSize: string }> = {
    sm: {
      fontSize: typography.fontSize.xs,
      padding: `${spacing[1]} ${spacing[2]}`,
      dotSize: '8px',
    },
    md: {
      fontSize: typography.fontSize.sm,
      padding: `${spacing[2]} ${spacing[3]}`,
      dotSize: '10px',
    },
    lg: {
      fontSize: typography.fontSize.base,
      padding: `${spacing[2]} ${spacing[4]}`,
      dotSize: '12px',
    },
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: sizeStyles[size].padding,
    fontSize: sizeStyles[size].fontSize,
    fontWeight: typography.fontWeight.medium,
    color: '#000',
    backgroundColor: `${materialColor}25`,
    border: `1px solid ${materialColor}`,
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
      {showColorDot && (
        <span
          style={{
            width: sizeStyles[size].dotSize,
            height: sizeStyles[size].dotSize,
            borderRadius: '50%',
            backgroundColor: materialColor,
            border: '1px solid rgba(0,0,0,0.2)',
          }}
        />
      )}
      <span>
        {materialLabels[material]}
        {specification && <span style={{ fontWeight: typography.fontWeight.semibold }}> {specification}</span>}
      </span>
    </div>
  );
}

export default MaterialChip;
