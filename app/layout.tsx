import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Msaddi - Your Trusted Partner for Success',
  description: 'Leading company providing integrated business solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
