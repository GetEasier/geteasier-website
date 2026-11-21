import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { sans, mono } from '@/lib/fonts';
import { SITE_URL } from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }], apple: '/apple-icon.png' },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = { themeColor: '#F4F6F9' };

export default function QrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
