'use client';

import ThemeRegistry from '@/lib/ThemeRegistry';

export default function ClientLayout({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 'ltr' | 'rtl';
}) {
  return (
    <ThemeRegistry direction={direction}>
      {children}
    </ThemeRegistry>
  );
}
