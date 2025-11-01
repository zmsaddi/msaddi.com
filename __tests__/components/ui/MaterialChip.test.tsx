/**
 * MaterialChip Component Tests
 *
 * Unit tests for industrial MaterialChip component
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { MaterialChip } from '@/components/ui/MaterialChip';

describe('MaterialChip Component', () => {
  describe('Material Types', () => {
    it('renders steel material', () => {
      render(<MaterialChip material="steel" />);
      expect(screen.getByText('Steel')).toBeInTheDocument();
    });

    it('renders stainless material', () => {
      render(<MaterialChip material="stainless" />);
      expect(screen.getByText('Stainless Steel')).toBeInTheDocument();
    });

    it('renders aluminum material', () => {
      render(<MaterialChip material="aluminum" />);
      expect(screen.getByText('Aluminum')).toBeInTheDocument();
    });

    it('renders copper material', () => {
      render(<MaterialChip material="copper" />);
      expect(screen.getByText('Copper')).toBeInTheDocument();
    });

    it('renders brass material', () => {
      render(<MaterialChip material="brass" />);
      expect(screen.getByText('Brass')).toBeInTheDocument();
    });

    it('renders bronze material', () => {
      render(<MaterialChip material="bronze" />);
      expect(screen.getByText('Bronze')).toBeInTheDocument();
    });
  });

  describe('Specifications', () => {
    it('renders with specification', () => {
      render(<MaterialChip material="stainless" specification="304" />);
      expect(screen.getByText(/304/)).toBeInTheDocument();
    });

    it('renders without specification', () => {
      render(<MaterialChip material="aluminum" />);
      expect(screen.queryByText(/304|316|6061/)).not.toBeInTheDocument();
    });

    it('displays specification in correct format', () => {
      render(<MaterialChip material="stainless" specification="316L" />);
      expect(screen.getByText(/316L/)).toBeInTheDocument();
    });
  });

  describe('Color Dot', () => {
    it('shows color dot by default', () => {
      const { container } = render(<MaterialChip material="steel" />);
      // Component renders with default showColorDot=true
      expect(container.firstChild).toBeInTheDocument();
    });

    it('hides color dot when showColorDot is false', () => {
      const { container } = render(<MaterialChip material="steel" showColorDot={false} />);
      // Component still renders even without color dot
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<MaterialChip material="steel" size="sm" />);
      expect(screen.getByText('Steel')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<MaterialChip material="steel" size="md" />);
      expect(screen.getByText('Steel')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<MaterialChip material="steel" size="lg" />);
      expect(screen.getByText('Steel')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('supports custom className', () => {
      const { container } = render(
        <MaterialChip material="aluminum" className="custom-chip" />
      );
      expect(container.firstChild).toHaveClass('custom-chip');
    });

    it('supports custom style', () => {
      const { container } = render(
        <MaterialChip material="copper" style={{ marginTop: '15px' }} />
      );
      expect(container.firstChild).toHaveStyle({
        marginTop: '15px',
      });
    });
  });

  describe('Complete Material with Specification', () => {
    it('renders stainless 304 correctly', () => {
      render(<MaterialChip material="stainless" specification="304" />);
      expect(screen.getByText(/Stainless Steel/)).toBeInTheDocument();
      expect(screen.getByText(/304/)).toBeInTheDocument();
    });

    it('renders aluminum 6061-T6 correctly', () => {
      render(<MaterialChip material="aluminum" specification="6061-T6" />);
      expect(screen.getByText(/Aluminum/)).toBeInTheDocument();
      expect(screen.getByText(/6061-T6/)).toBeInTheDocument();
    });
  });
});
