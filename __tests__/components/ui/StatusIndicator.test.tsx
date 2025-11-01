/**
 * StatusIndicator Component Tests
 *
 * Unit tests for industrial StatusIndicator component
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

describe('StatusIndicator Component', () => {
  describe('Rendering', () => {
    it('renders with approved status', () => {
      render(<StatusIndicator status="approved" />);
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });

    it('renders with pending status', () => {
      render(<StatusIndicator status="pending" />);
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('renders with rejected status', () => {
      render(<StatusIndicator status="rejected" />);
      expect(screen.getByText('Rejected')).toBeInTheDocument();
    });

    it('renders with inProgress status', () => {
      render(<StatusIndicator status="inProgress" />);
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });
  });

  describe('Custom Labels', () => {
    it('renders custom label when provided', () => {
      render(<StatusIndicator status="approved" label="Quality Check Passed" />);
      expect(screen.getByText('Quality Check Passed')).toBeInTheDocument();
    });

    it('uses default label when not provided', () => {
      render(<StatusIndicator status="pending" />);
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('shows icon by default', () => {
      const { container } = render(<StatusIndicator status="approved" />);
      expect(container.textContent).toContain('✓');
    });

    it('shows correct icon for approved status', () => {
      const { container } = render(<StatusIndicator status="approved" />);
      expect(container.textContent).toContain('✓');
    });

    it('shows correct icon for pending status', () => {
      const { container } = render(<StatusIndicator status="pending" />);
      expect(container.textContent).toContain('◷');
    });

    it('shows correct icon for rejected status', () => {
      const { container } = render(<StatusIndicator status="rejected" />);
      expect(container.textContent).toContain('✗');
    });

    it('shows correct icon for inProgress status', () => {
      const { container } = render(<StatusIndicator status="inProgress" />);
      expect(container.textContent).toContain('◐');
    });

    it('hides icon when showIcon is false', () => {
      const { container } = render(<StatusIndicator status="approved" showIcon={false} />);
      expect(container.textContent).not.toContain('✓');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<StatusIndicator status="approved" size="sm" />);
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<StatusIndicator status="approved" size="md" />);
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<StatusIndicator status="approved" size="lg" />);
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('supports custom className', () => {
      const { container } = render(
        <StatusIndicator status="approved" className="custom-status" />
      );
      expect(container.firstChild).toHaveClass('custom-status');
    });

    it('supports custom style', () => {
      const { container } = render(
        <StatusIndicator status="approved" style={{ margin: '20px' }} />
      );
      expect(container.firstChild).toHaveStyle({
        margin: '20px',
      });
    });
  });

  describe('Industry Colors', () => {
    it('applies approved color (green)', () => {
      const { container } = render(<StatusIndicator status="approved" />);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);
      expect(styles.color).toBeTruthy();
    });

    it('applies pending color (yellow)', () => {
      const { container } = render(<StatusIndicator status="pending" />);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);
      expect(styles.color).toBeTruthy();
    });

    it('applies rejected color (red)', () => {
      const { container } = render(<StatusIndicator status="rejected" />);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);
      expect(styles.color).toBeTruthy();
    });

    it('applies inProgress color (blue)', () => {
      const { container } = render(<StatusIndicator status="inProgress" />);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);
      expect(styles.color).toBeTruthy();
    });
  });
});
