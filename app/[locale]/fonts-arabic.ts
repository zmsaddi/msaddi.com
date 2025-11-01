import { Cairo } from 'next/font/google';

export const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  display: 'swap',
  preload: false,
});
