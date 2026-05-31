// Blueprint Discipleship Institute — Service Worker
// Cache strategy:
//   - Static assets (fonts, images, JS/CSS): cache-first
//   - Navigation (HTML pages): network-first with offline fallback
//   - API routes: network-only (never cache authenticated data)

const CACHE_NAME = 'blueprint-v1'
const OFFLINE_PAGE = '/offline'

const STATIC_PRECACHE = [
  '/',
  '/offline',
  '/manifest.json',
]

// ── Install: precache shell ──────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_PRECACHE))
  )
  self.skipWaiting()
})

// ── Activate: purge old caches ───────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 1. Never intercept non-GET or cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  // 2. Never cache API routes or Supabase requests (auth-sensitive)
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
    return
  }

  // 3. Static assets (Next.js chunks, fonts, images) — cache-first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|woff2?|ttf|otf)$/)
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone()
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
            }
            return response
          })
      )
    )
    return
  }

  // 4. Navigation requests — network-first, fall back to offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_PAGE).then(
          (cached) => cached || new Response('You are offline.', { status: 503 })
        )
      )
    )
    return
  }
})

// ── Background Sync placeholder (for future offline reflection drafts) ────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reflection-drafts') {
    // Future: flush queued offline reflection drafts to API
    event.waitUntil(Promise.resolve())
  }
})
