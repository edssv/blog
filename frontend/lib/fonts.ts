import { Inter, Roboto_Mono } from 'next/font/google';

export const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  fallback: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
});

export const fontHeading = Roboto_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-heading'
});
