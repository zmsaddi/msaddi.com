/**
 * Test Utilities
 *
 * Custom render functions and test helpers
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '@/lib/theme';

// Create a custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  direction?: 'ltr' | 'rtl';
}

export function renderWithProviders(
  ui: ReactElement,
  {
    locale = 'en',
    direction = 'ltr',
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  const theme = getTheme(direction);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Export custom render as default
export { renderWithProviders as render };
