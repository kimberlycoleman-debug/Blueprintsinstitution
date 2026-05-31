import type { Metadata, Viewport } from 'next'
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
  openGraph: {
    title: 'The Blueprint Discipleship Institute',
    description: 'You are becoming who you were always meant to be.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAFAF8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
