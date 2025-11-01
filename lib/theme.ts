'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { designTokens } from './design-tokens';

const { colors, typography, spacing, borderRadius, shadows, transitions } = designTokens;

/**
 * MSADDI Theme Factory
 *
 * Creates Material-UI theme based on design tokens
 * Supports RTL/LTR and follows design system
 */
export const getTheme = (direction: 'ltr' | 'rtl') => {
  const themeOptions: ThemeOptions = {
    direction,

    // ========================================
    // COLOR PALETTE
    // ========================================
    palette: {
      mode: 'light',
      primary: {
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[700],
        contrastText: colors.neutral.white,
      },
      secondary: {
        main: colors.secondary[600],
        light: colors.secondary[400],
        dark: colors.secondary[800],
        contrastText: colors.neutral.white,
      },
      error: {
        main: colors.error[500],
        light: colors.error[400],
        dark: colors.error[700],
        contrastText: colors.neutral.white,
      },
      warning: {
        main: colors.warning[500],
        light: colors.warning[400],
        dark: colors.warning[700],
        contrastText: colors.neutral[900],
      },
      info: {
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[700],
        contrastText: colors.neutral.white,
      },
      success: {
        main: colors.success[500],
        light: colors.success[400],
        dark: colors.success[700],
        contrastText: colors.neutral.white,
      },
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
      },
      divider: colors.neutral[300],
    },

    // ========================================
    // TYPOGRAPHY
    // ========================================
    typography: {
      fontFamily: typography.fontFamily.primary,
      fontSize: 16,
      fontWeightLight: typography.fontWeight.light,
      fontWeightRegular: typography.fontWeight.regular,
      fontWeightMedium: typography.fontWeight.medium,
      fontWeightBold: typography.fontWeight.bold,

      h1: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
        '@media (min-width:600px)': {
          fontSize: typography.fontSize['5xl'],
        },
        '@media (min-width:900px)': {
          fontSize: typography.fontSize['6xl'],
        },
      },
      h2: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
        '@media (min-width:600px)': {
          fontSize: typography.fontSize['4xl'],
        },
      },
      h3: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
      },
      h4: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.snug,
      },
      h5: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
      },
      h6: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
      },
      subtitle1: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
      },
      subtitle2: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        lineHeight: typography.lineHeight.normal,
      },
      body1: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.relaxed,
      },
      body2: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
      },
      button: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
        textTransform: 'none',
        letterSpacing: typography.letterSpacing.wide,
      },
      caption: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
      },
      overline: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wider,
      },
    },

    // ========================================
    // SPACING
    // ========================================
    spacing: 8, // Base unit (8px)

    // ========================================
    // SHAPE
    // ========================================
    shape: {
      borderRadius: parseInt(borderRadius.lg), // 8px default
    },

    // ========================================
    // SHADOWS
    // ========================================
    shadows: [
      'none',
      shadows.sm,
      shadows.base,
      shadows.md,
      shadows.md,
      shadows.lg,
      shadows.lg,
      shadows.lg,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
    ],

    // ========================================
    // TRANSITIONS
    // ========================================
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: transitions.easing.easeInOut,
        easeOut: transitions.easing.easeOut,
        easeIn: transitions.easing.easeIn,
        sharp: transitions.easing.sharp,
      },
    },

    // ========================================
    // COMPONENT OVERRIDES
    // ========================================
    components: {
      // Button
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            padding: `${spacing[3]} ${spacing[6]}`,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            boxShadow: 'none',
            transition: transitions.common.fast,
            '&:hover': {
              boxShadow: shadows.md,
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          sizeSmall: {
            padding: `${spacing[2]} ${spacing[4]}`,
            fontSize: typography.fontSize.sm,
          },
          sizeLarge: {
            padding: `${spacing[4]} ${spacing[8]}`,
            fontSize: typography.fontSize.lg,
          },
          contained: {
            '&:hover': {
              boxShadow: shadows.lg,
            },
          },
        },
      },

      // Card
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.xl,
            boxShadow: shadows.md,
            border: `1px solid ${colors.neutral[200]}`,
            transition: transitions.common.base,
            '&:hover': {
              boxShadow: shadows.xl,
              transform: 'translateY(-2px)',
            },
          },
        },
      },

      // App Bar
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: shadows.sm,
            borderBottom: `1px solid ${colors.neutral[200]}`,
          },
        },
      },

      // TextField / Input
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.md,
              backgroundColor: colors.neutral.white,
              transition: transitions.common.fast,
              '&:hover': {
                backgroundColor: colors.neutral[50],
              },
              '&.Mui-focused': {
                backgroundColor: colors.neutral.white,
                boxShadow: `0 0 0 3px ${colors.primary[100]}`,
              },
            },
          },
        },
      },

      // Paper
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: borderRadius.lg,
          },
          elevation1: {
            boxShadow: shadows.sm,
          },
          elevation2: {
            boxShadow: shadows.base,
          },
          elevation3: {
            boxShadow: shadows.md,
          },
          elevation4: {
            boxShadow: shadows.lg,
          },
        },
      },

      // Chip
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            fontWeight: typography.fontWeight.medium,
          },
        },
      },

      // Dialog
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: borderRadius['2xl'],
            boxShadow: shadows['2xl'],
          },
        },
      },

      // Tooltip
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: colors.neutral[900],
            fontSize: typography.fontSize.sm,
            borderRadius: borderRadius.md,
            padding: `${spacing[2]} ${spacing[3]}`,
          },
          arrow: {
            color: colors.neutral[900],
          },
        },
      },

      // Link
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            transition: transitions.common.fast,
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },

      // Divider
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: colors.neutral[200],
          },
        },
      },

      // Container
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              paddingLeft: spacing[4],
              paddingRight: spacing[4],
            },
            '@media (min-width:600px)': {
              paddingLeft: spacing[6],
              paddingRight: spacing[6],
            },
            '@media (min-width:900px)': {
              paddingLeft: spacing[8],
              paddingRight: spacing[8],
            },
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};
