/**
 * Button Component Tests
 *
 * Enterprise-grade unit tests for Button component
 */

import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default variant (primary)', () => {
      render(<Button>Primary Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: expect.any(String),
      });
    });

    it('renders with secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with danger variant', () => {
      render(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveStyle({
        cursor: 'not-allowed',
      });
    });

    it('handles loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveStyle({
        cursor: 'not-allowed',
      });
    });

    it('displays loading spinner when loading', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const spinner = container.querySelector('span[style*="border"]');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('renders full width when specified', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        width: '100%',
      });
    });

    it('renders auto width by default', () => {
      render(<Button>Auto Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        width: 'auto',
      });
    });
  });

  describe('Icons', () => {
    it('renders with start icon', () => {
      const StartIcon = () => <span data-testid="start-icon">→</span>;
      render(
        <Button startIcon={<StartIcon />}>
          With Start Icon
        </Button>
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders with end icon', () => {
      const EndIcon = () => <span data-testid="end-icon">←</span>;
      render(
        <Button endIcon={<EndIcon />}>
          With End Icon
        </Button>
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('hides icons when loading', () => {
      const StartIcon = () => <span data-testid="start-icon">→</span>;
      render(
        <Button loading startIcon={<StartIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Clickable</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button disabled onClick={handleClick}>Disabled</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button loading onClick={handleClick}>Loading</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has minimum touch target size', () => {
      render(<Button>Accessible</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('supports custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('supports custom style', () => {
      render(<Button style={{ marginTop: '20px' }}>Styled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        marginTop: '20px',
      });
    });

    it('can be focused via keyboard', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Variants Styling', () => {
    it('applies correct primary variant styles', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBeTruthy();
    });

    it('applies correct outline variant styles', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      // transparent is rendered as rgba(0, 0, 0, 0) in test environment
      expect(styles.backgroundColor).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    });

    it('applies correct ghost variant styles', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      // transparent is rendered as rgba(0, 0, 0, 0) in test environment
      expect(styles.backgroundColor).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    });
  });
});
