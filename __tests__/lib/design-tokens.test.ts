/**
 * Design Tokens Tests
 *
 * Unit tests for design token system
 */

import { designTokens } from '@/lib/design-tokens';

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('exports primary colors', () => {
      expect(designTokens.colors.primary).toBeDefined();
      expect(designTokens.colors.primary[500]).toBe('#2196F3');
    });

    it('exports secondary colors', () => {
      expect(designTokens.colors.secondary).toBeDefined();
      expect(designTokens.colors.secondary[600]).toBeDefined();
    });

    it('exports accent colors', () => {
      expect(designTokens.colors.accent).toBeDefined();
      expect(designTokens.colors.accent[500]).toBeDefined();
    });

    it('exports semantic colors', () => {
      expect(designTokens.colors.success).toBeDefined();
      expect(designTokens.colors.warning).toBeDefined();
      expect(designTokens.colors.error).toBeDefined();
    });

    it('exports neutral colors', () => {
      expect(designTokens.colors.neutral).toBeDefined();
      expect(designTokens.colors.neutral.white).toBe('#FFFFFF');
      expect(designTokens.colors.neutral.black).toBe('#000000');
    });
  });

  describe('Industry Colors', () => {
    it('exports material colors', () => {
      expect(designTokens.industry.materials).toBeDefined();
      expect(designTokens.industry.materials.steel).toBeDefined();
      expect(designTokens.industry.materials.stainless).toBeDefined();
      expect(designTokens.industry.materials.aluminum).toBeDefined();
      expect(designTokens.industry.materials.copper).toBeDefined();
      expect(designTokens.industry.materials.brass).toBeDefined();
      expect(designTokens.industry.materials.bronze).toBeDefined();
    });

    it('exports process colors', () => {
      expect(designTokens.industry.processes).toBeDefined();
      expect(designTokens.industry.processes.cutting).toBeDefined();
      expect(designTokens.industry.processes.bending).toBeDefined();
      expect(designTokens.industry.processes.welding).toBeDefined();
      expect(designTokens.industry.processes.finishing).toBeDefined();
      expect(designTokens.industry.processes.assembly).toBeDefined();
    });

    it('exports quality indicators', () => {
      expect(designTokens.industry.quality).toBeDefined();
      expect(designTokens.industry.quality.approved).toBeDefined();
      expect(designTokens.industry.quality.pending).toBeDefined();
      expect(designTokens.industry.quality.rejected).toBeDefined();
      expect(designTokens.industry.quality.inProgress).toBeDefined();
    });
  });

  describe('Typography', () => {
    it('exports font families', () => {
      expect(designTokens.typography.fontFamily).toBeDefined();
      expect(designTokens.typography.fontFamily.primary).toContain('Inter');
    });

    it('exports font sizes', () => {
      expect(designTokens.typography.fontSize).toBeDefined();
      expect(designTokens.typography.fontSize.base).toBe('1rem');
      expect(designTokens.typography.fontSize.lg).toBe('1.125rem');
    });

    it('exports font weights', () => {
      expect(designTokens.typography.fontWeight).toBeDefined();
      expect(designTokens.typography.fontWeight.regular).toBe(400);
      expect(designTokens.typography.fontWeight.bold).toBe(700);
    });

    it('exports line heights', () => {
      expect(designTokens.typography.lineHeight).toBeDefined();
      expect(designTokens.typography.lineHeight.normal).toBe(1.5);
    });
  });

  describe('Spacing', () => {
    it('exports spacing scale', () => {
      expect(designTokens.spacing).toBeDefined();
      expect(designTokens.spacing[0]).toBe('0');
      expect(designTokens.spacing[4]).toBe('1rem');
      expect(designTokens.spacing[8]).toBe('2rem');
    });

    it('follows 8px grid', () => {
      expect(designTokens.spacing[2]).toBe('0.5rem'); // 8px
      expect(designTokens.spacing[4]).toBe('1rem');   // 16px
      expect(designTokens.spacing[6]).toBe('1.5rem'); // 24px
    });
  });

  describe('Border Radius', () => {
    it('exports border radius scale', () => {
      expect(designTokens.borderRadius).toBeDefined();
      expect(designTokens.borderRadius.none).toBe('0');
      expect(designTokens.borderRadius.full).toBe('9999px');
    });
  });

  describe('Shadows', () => {
    it('exports shadow scale', () => {
      expect(designTokens.shadows).toBeDefined();
      expect(designTokens.shadows.none).toBe('none');
      expect(designTokens.shadows.sm).toBeDefined();
      expect(designTokens.shadows.lg).toBeDefined();
    });
  });

  describe('Breakpoints', () => {
    it('exports responsive breakpoints', () => {
      expect(designTokens.breakpoints).toBeDefined();
      expect(designTokens.breakpoints.xs).toBe('0px');
      expect(designTokens.breakpoints.sm).toBe('600px');
      expect(designTokens.breakpoints.md).toBe('900px');
      expect(designTokens.breakpoints.lg).toBe('1200px');
      expect(designTokens.breakpoints.xl).toBe('1536px');
    });
  });

  describe('Z-Index', () => {
    it('exports z-index scale', () => {
      expect(designTokens.zIndex).toBeDefined();
      expect(designTokens.zIndex.base).toBe(0);
      expect(designTokens.zIndex.modal).toBe(1300);
      expect(designTokens.zIndex.notification).toBe(1600);
    });
  });

  describe('Transitions', () => {
    it('exports transition durations', () => {
      expect(designTokens.transitions.duration).toBeDefined();
      expect(designTokens.transitions.duration.fast).toBe('150ms');
      expect(designTokens.transitions.duration.base).toBe('250ms');
    });

    it('exports easing functions', () => {
      expect(designTokens.transitions.easing).toBeDefined();
      expect(designTokens.transitions.easing.easeInOut).toBeDefined();
    });
  });

  describe('Component Tokens', () => {
    it('exports button tokens', () => {
      expect(designTokens.button).toBeDefined();
      expect(designTokens.button.size).toBeDefined();
      expect(designTokens.button.size.md.height).toBe('40px');
    });

    it('exports input tokens', () => {
      expect(designTokens.input).toBeDefined();
      expect(designTokens.input.size).toBeDefined();
    });

    it('exports card tokens', () => {
      expect(designTokens.card).toBeDefined();
      expect(designTokens.card.borderRadius).toBeDefined();
    });

    it('exports container tokens', () => {
      expect(designTokens.container).toBeDefined();
      expect(designTokens.container.maxWidth).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('exports accessibility tokens', () => {
      expect(designTokens.accessibility).toBeDefined();
      expect(designTokens.accessibility.minTouchTarget).toBe('44px');
    });

    it('exports focus ring tokens', () => {
      expect(designTokens.accessibility.focusRing).toBeDefined();
      expect(designTokens.accessibility.focusRing.width).toBe('2px');
    });

    it('exports contrast ratios', () => {
      expect(designTokens.accessibility.contrast).toBeDefined();
      expect(designTokens.accessibility.contrast.normal).toBe(4.5);
    });
  });
});
