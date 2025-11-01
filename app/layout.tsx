import './globals.css';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale from middleware headers
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  const dir = headersList.get('x-locale-dir') || 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
