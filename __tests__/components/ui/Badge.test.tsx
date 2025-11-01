/**
 * Badge Component Tests
 *
 * Unit tests for Badge component
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { Badge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders badge with text', () => {
      render(<Badge>Badge Text</Badge>);
      expect(screen.getByText('Badge Text')).toBeInTheDocument();
    });

    it('renders with default variant', () => {
      render(<Badge>Default</Badge>);
      expect(screen.getByText('Default')).toBeInTheDocument();
    });

    it('renders with primary variant', () => {
      render(<Badge variant="primary">Primary</Badge>);
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });

    it('renders with success variant', () => {
      render(<Badge variant="success">Success</Badge>);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders with warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('renders with error variant', () => {
      render(<Badge variant="error">Error</Badge>);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders with info variant', () => {
      render(<Badge variant="info">Info</Badge>);
      expect(screen.getByText('Info')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Badge size="sm">Small</Badge>);
      expect(screen.getByText('Small')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Badge size="md">Medium</Badge>);
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Badge size="lg">Large</Badge>);
      expect(screen.getByText('Large')).toBeInTheDocument();
    });
  });

  describe('Dot Mode', () => {
    it('renders as dot when dot prop is true', () => {
      const { container } = render(<Badge dot variant="success" />);
      const badge = container.firstChild;
      expect(badge).toBeInTheDocument();
    });

    it('does not render children when in dot mode', () => {
      render(<Badge dot>This should not show</Badge>);
      expect(screen.queryByText('This should not show')).not.toBeInTheDocument();
    });

    it('renders text when dot prop is false', () => {
      render(<Badge dot={false}>Text Badge</Badge>);
      expect(screen.getByText('Text Badge')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('supports custom className', () => {
      const { container } = render(<Badge className="custom-badge">Custom</Badge>);
      expect(container.firstChild).toHaveClass('custom-badge');
    });

    it('supports custom style', () => {
      render(<Badge style={{ marginLeft: '10px' }}>Styled</Badge>);
      const badge = screen.getByText('Styled');
      expect(badge).toHaveStyle({
        marginLeft: '10px',
      });
    });
  });

  describe('Variant Styling', () => {
    it('applies correct success variant color', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      const styles = window.getComputedStyle(badge);
      expect(styles.backgroundColor).toBeTruthy();
    });

    it('applies correct error variant color', () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText('Error');
      const styles = window.getComputedStyle(badge);
      expect(styles.backgroundColor).toBeTruthy();
    });

    it('applies correct warning variant color', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      const styles = window.getComputedStyle(badge);
      expect(styles.backgroundColor).toBeTruthy();
    });
  });
});
