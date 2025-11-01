/**
 * ProcessBadge Component Tests
 *
 * Unit tests for industrial ProcessBadge component
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { ProcessBadge } from '@/components/ui/ProcessBadge';

describe('ProcessBadge Component', () => {
  describe('Process Types', () => {
    it('renders cutting process', () => {
      render(<ProcessBadge process="cutting" />);
      expect(screen.getByText('Laser Cutting')).toBeInTheDocument();
    });

    it('renders bending process', () => {
      render(<ProcessBadge process="bending" />);
      expect(screen.getByText('Bending & Forming')).toBeInTheDocument();
    });

    it('renders welding process', () => {
      render(<ProcessBadge process="welding" />);
      expect(screen.getByText('Welding')).toBeInTheDocument();
    });

    it('renders finishing process', () => {
      render(<ProcessBadge process="finishing" />);
      expect(screen.getByText('Finishing')).toBeInTheDocument();
    });

    it('renders assembly process', () => {
      render(<ProcessBadge process="assembly" />);
      expect(screen.getByText('Assembly')).toBeInTheDocument();
    });
  });

  describe('Custom Labels', () => {
    it('renders custom label when provided', () => {
      render(<ProcessBadge process="welding" label="TIG Welding" />);
      expect(screen.getByText('TIG Welding')).toBeInTheDocument();
    });

    it('uses default label when not provided', () => {
      render(<ProcessBadge process="cutting" />);
      expect(screen.getByText('Laser Cutting')).toBeInTheDocument();
    });

    it('overrides default label with custom label', () => {
      render(<ProcessBadge process="bending" label="CNC Bending" />);
      expect(screen.getByText('CNC Bending')).toBeInTheDocument();
      expect(screen.queryByText('Bending & Forming')).not.toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('shows icon by default', () => {
      const { container } = render(<ProcessBadge process="cutting" />);
      expect(container.textContent).toContain('✂');
    });

    it('shows correct icon for cutting', () => {
      const { container } = render(<ProcessBadge process="cutting" />);
      expect(container.textContent).toContain('✂');
    });

    it('shows correct icon for bending', () => {
      const { container } = render(<ProcessBadge process="bending" />);
      expect(container.textContent).toContain('⟲');
    });

    it('shows correct icon for welding', () => {
      const { container } = render(<ProcessBadge process="welding" />);
      expect(container.textContent).toContain('⚡');
    });

    it('shows correct icon for finishing', () => {
      const { container } = render(<ProcessBadge process="finishing" />);
      expect(container.textContent).toContain('✨');
    });

    it('shows correct icon for assembly', () => {
      const { container } = render(<ProcessBadge process="assembly" />);
      expect(container.textContent).toContain('⚙');
    });

    it('hides icon when showIcon is false', () => {
      const { container } = render(<ProcessBadge process="welding" showIcon={false} />);
      expect(container.textContent).not.toContain('⚡');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<ProcessBadge process="cutting" size="sm" />);
      expect(screen.getByText('Laser Cutting')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<ProcessBadge process="cutting" size="md" />);
      expect(screen.getByText('Laser Cutting')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<ProcessBadge process="cutting" size="lg" />);
      expect(screen.getByText('Laser Cutting')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('supports custom className', () => {
      const { container } = render(
        <ProcessBadge process="welding" className="custom-process" />
      );
      expect(container.firstChild).toHaveClass('custom-process');
    });

    it('supports custom style', () => {
      const { container } = render(
        <ProcessBadge process="assembly" style={{ marginLeft: '12px' }} />
      );
      expect(container.firstChild).toHaveStyle({
        marginLeft: '12px',
      });
    });
  });

  describe('Process Colors', () => {
    it('applies color styling', () => {
      const { container } = render(<ProcessBadge process="cutting" />);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);
      expect(styles.backgroundColor).toBeTruthy();
    });
  });
});
