'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import { useState, useEffect } from 'react';

export default function ThemeRegistry({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 'ltr' | 'rtl';
}) {
  const [theme, setTheme] = useState(() => getTheme(direction));

  useEffect(() => {
    setTheme(getTheme(direction));
  }, [direction]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
