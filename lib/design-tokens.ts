/**
 * Design Tokens - MSADDI Design System
 *
 * Single Source of Truth for all design values
 * Industry-grade metal fabrication aesthetic
 *
 * Philosophy:
 * - Professional, industrial, trustworthy
 * - Clean, modern, precision-focused
 * - Metal/steel color palette
 * - High contrast for manufacturing environments
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

/**
 * Core Brand Colors - Industrial Modern Design
 * Dark, sophisticated, metal fabrication aesthetic
 */
export const colors = {
  // Primary - Dark Slate (Industry, Professional, Modern)
  primary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',  // Mid slate
    600: '#475569',
    700: '#334155',  // Main brand color - Dark professional
    800: '#1E293B',  // Very dark slate
    900: '#0F172A',  // Almost black
  },

  // Secondary - Steel Blue (Technology, Trust, Precision)
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',  // Main steel blue
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Accent - Industrial Orange (Energy, Action, CTA)
  accent: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',  // Main industrial orange
    600: '#EA580C',  // Vibrant action color
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },

  // Success - Industry Green (Quality, Approved)
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',  // Main success
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Warning - Caution Yellow
  warning: {
    50: '#FFFDE7',
    100: '#FFF9C4',
    200: '#FFF59D',
    300: '#FFF176',
    400: '#FFEE58',
    500: '#FFEB3B',  // Main warning
    600: '#FDD835',
    700: '#FBC02D',
    800: '#F9A825',
    900: '#F57F17',
  },

  // Error - Alert Red (Errors, Critical)
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',  // Main error
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },

  // Neutral - Gray scale
  neutral: {
    white: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    black: '#000000',
  },

  // Background colors - Industrial palette
  background: {
    default: '#F8FAFC',           // Very light slate background
    paper: '#FFFFFF',              // White cards/panels
    dark: '#0F172A',               // Very dark slate background
    darkSecondary: '#1E293B',      // Dark secondary background
    overlay: 'rgba(15, 23, 42, 0.75)',  // Dark overlay
    lightOverlay: 'rgba(248, 250, 252, 0.95)',  // Light overlay
  },

  // Text colors - High contrast
  text: {
    primary: '#0F172A',        // Very dark text
    secondary: '#475569',      // Medium gray text
    disabled: '#94A3B8',       // Light gray disabled
    inverse: '#FFFFFF',        // Text on dark backgrounds
    accent: '#EA580C',         // Orange accent text
  },

  // Gradient colors - Industrial design
  gradients: {
    primary: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    secondary: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    accent: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    dark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    hero: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.90) 100%)',
    overlay: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)',
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Typography Scale
 * Professional, readable, industry-appropriate
 */
export const typography = {
  // Font Families
  fontFamily: {
    primary: 'var(--font-inter, var(--font-cairo, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif))',
    arabic: 'var(--font-cairo, "Segoe UI", "Roboto", sans-serif)',
    latin: 'var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif)',
    mono: '"Roboto Mono", "Courier New", monospace',
  },

  // Font Sizes (rem units)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

/**
 * Spacing Scale (8px base unit)
 * Consistent spacing throughout the application
 */
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

/**
 * Border Radius Scale
 * Modern, clean, professional
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // Circular
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

/**
 * Box Shadow Scale - Industrial Design
 * Strong depth, professional elevation with industrial feel
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.08)',
  base: '0 2px 4px 0 rgba(15, 23, 42, 0.10), 0 1px 2px 0 rgba(15, 23, 42, 0.06)',
  md: '0 4px 8px -2px rgba(15, 23, 42, 0.12), 0 2px 4px -1px rgba(15, 23, 42, 0.08)',
  lg: '0 12px 24px -4px rgba(15, 23, 42, 0.14), 0 4px 8px -2px rgba(15, 23, 42, 0.10)',
  xl: '0 20px 40px -8px rgba(15, 23, 42, 0.16), 0 8px 16px -4px rgba(15, 23, 42, 0.12)',
  '2xl': '0 32px 64px -12px rgba(15, 23, 42, 0.20), 0 12px 24px -6px rgba(15, 23, 42, 0.14)',
  '3xl': '0 40px 80px -16px rgba(15, 23, 42, 0.25), 0 16px 32px -8px rgba(15, 23, 42, 0.18)',
  inner: 'inset 0 2px 4px 0 rgba(15, 23, 42, 0.08)',
  glow: '0 0 20px rgba(14, 165, 233, 0.3)',  // Blue glow effect
  glowOrange: '0 0 20px rgba(249, 115, 22, 0.3)',  // Orange glow effect
} as const;

// ============================================================================
// BREAKPOINT TOKENS
// ============================================================================

/**
 * Responsive Breakpoints
 * Mobile-first approach
 */
export const breakpoints = {
  xs: '0px',
  sm: '600px',    // Mobile
  md: '900px',    // Tablet
  lg: '1200px',   // Desktop
  xl: '1536px',   // Large Desktop
} as const;

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

/**
 * Z-Index Scale
 * Layering system for overlays
 */
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  notification: 1600,
} as const;

// ============================================================================
// TRANSITION TOKENS
// ============================================================================

/**
 * Transition/Animation Tokens
 * Smooth, professional interactions
 */
export const transitions = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // Timing Functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // Common Transitions
  common: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

/**
 * Button Design Tokens
 */
export const button = {
  // Sizes
  size: {
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: '40px',
      padding: '0 16px',
      fontSize: typography.fontSize.base,
    },
    lg: {
      height: '48px',
      padding: '0 24px',
      fontSize: typography.fontSize.lg,
    },
  },

  // Border Radius
  borderRadius: borderRadius.md,

  // Transitions
  transition: transitions.common.fast,
} as const;

/**
 * Input/Form Design Tokens
 */
export const input = {
  // Sizes
  size: {
    sm: {
      height: '36px',
      padding: '0 12px',
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: '44px',
      padding: '0 16px',
      fontSize: typography.fontSize.base,
    },
    lg: {
      height: '52px',
      padding: '0 20px',
      fontSize: typography.fontSize.lg,
    },
  },

  // Border
  border: {
    width: '1px',
    color: colors.neutral[300],
    focusColor: colors.primary[500],
    errorColor: colors.error[500],
  },

  // Border Radius
  borderRadius: borderRadius.md,
} as const;

/**
 * Card Design Tokens
 */
export const card = {
  // Padding
  padding: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  },

  // Border
  border: `1px solid ${colors.neutral[200]}`,

  // Border Radius
  borderRadius: borderRadius.lg,

  // Shadow
  shadow: shadows.md,

  // Hover Shadow
  hoverShadow: shadows.lg,
} as const;

/**
 * Container Design Tokens
 */
export const container = {
  // Max Widths
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Padding
  padding: {
    mobile: spacing[4],
    tablet: spacing[6],
    desktop: spacing[8],
  },
} as const;

// ============================================================================
// INDUSTRY-SPECIFIC TOKENS
// ============================================================================

/**
 * Metal Fabrication Industry Colors
 * Special colors for industry-specific elements
 */
export const industry = {
  // Material Colors (for visualization)
  materials: {
    steel: '#8B9DC3',         // Steel blue-gray
    stainless: '#C0C0C0',     // Stainless steel silver
    aluminum: '#848789',      // Aluminum gray
    copper: '#B87333',        // Copper brown
    brass: '#B5A642',         // Brass gold
    bronze: '#CD7F32',        // Bronze
  },

  // Process Colors (for status indicators)
  processes: {
    cutting: colors.primary[600],
    bending: colors.accent[600],
    welding: colors.warning[700],
    finishing: colors.success[600],
    assembly: colors.secondary[600],
  },

  // Quality Indicators
  quality: {
    approved: colors.success[500],
    pending: colors.warning[500],
    rejected: colors.error[500],
    inProgress: colors.primary[500],
  },
} as const;

// ============================================================================
// ACCESSIBILITY TOKENS
// ============================================================================

/**
 * Accessibility Design Tokens
 * WCAG 2.1 Level AA compliance
 */
export const accessibility = {
  // Minimum Touch Target Size
  minTouchTarget: '44px',

  // Focus Ring
  focusRing: {
    width: '2px',
    offset: '2px',
    color: colors.primary[500],
    style: 'solid',
  },

  // Contrast Ratios (WCAG AA)
  contrast: {
    normal: 4.5,    // Normal text
    large: 3,       // Large text (18px+)
    ui: 3,          // UI components
  },
} as const;

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  button,
  input,
  card,
  container,
  industry,
  accessibility,
} as const;

export type DesignTokens = typeof designTokens;

export default designTokens;
