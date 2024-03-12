import type { Metadata } from 'next';

import '@/styles/globals.css';
import { siteConfig } from '@/config/site';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Бронница', 'Новгородский район'],
  authors: [
    {
      name: 'Eduard Sysoev',
      url: 'https://vk.com/sysoeev'
    }
  ],
  creator: 'Eduard Sysoev',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  verification: { yandex: '282653d3b5edbfe6' }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={cn(fontSans.className, fontSans.variable, fontMono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
