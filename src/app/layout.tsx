import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '@/context/AuthContext';
import GaListeners from '@/components/analytics/GaListeners';
import './globals.css';

export const metadata: Metadata = {
  title: 'DV Portfolio',
  description: 'Full-Stack Developer Portfolio',
};

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? 'ca-pub-6001125874185977';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AuthProvider>
          {children}
          <GaListeners />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
