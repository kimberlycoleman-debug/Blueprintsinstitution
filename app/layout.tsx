import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import InstallPrompt from '@/components/shared/InstallPrompt'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'The Blueprint Discipleship Institute',
    template: '%s — Blueprint Discipleship Institute',
  },
  description:
    'A 12-month intensive discipleship training program. Discover your God-given identity, develop Christ-like character, experience holistic healing, and activate your unique calling.',
  applicationName: 'Blueprint Discipleship Institute',
  authors: [{ name: 'The Blueprint Foundation' }],
  keywords: [
    'discipleship',
    'identity formation',
    'spiritual maturity',
    'Christian leadership',
    'inner healing',
    'kingdom activation',
    'Blueprint Discipleship',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Blueprint Institute',
  },
  openGraph: {
    title: 'The Blueprint Discipleship Institute',
    description: 'You are becoming who you were always meant to be.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a120b' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {children}
        <InstallPrompt />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(function (err) {
                    console.error('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
