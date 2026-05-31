'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already installed (running as standalone PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) return
    // Don't show if dismissed in this session
    if (sessionStorage.getItem('pwa-prompt-dismissed')) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Brief delay so it doesn't pop immediately on page load
      setTimeout(() => setShow(true), 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShow(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem('pwa-prompt-dismissed', '1')
  }

  if (!show || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-80 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div
        className="rounded-2xl shadow-xl border border-[var(--bp-warm)] bg-white p-4"
        role="dialog"
        aria-label="Install Blueprint Institute app"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#1a120b] flex items-center justify-center flex-shrink-0">
            <span className="text-amber-400 text-sm font-bold">B</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--bp-text)]">Add to Home Screen</p>
            <p className="text-xs text-[var(--bp-muted)] mt-0.5 leading-snug">
              Install the Blueprint Institute for quick access to your formation journey.
            </p>
          </div>

          <button
            onClick={handleDismiss}
            className="text-[var(--bp-muted)] hover:text-[var(--bp-text)] flex-shrink-0 -mt-0.5"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleInstall}
            className="flex-1 bg-[#1a120b] text-amber-300 text-xs font-medium py-2 rounded-lg hover:bg-amber-900 transition-colors"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 bg-[var(--bp-warm)] text-[var(--bp-brown)] text-xs font-medium py-2 rounded-lg hover:bg-[var(--bp-sand)] transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}
