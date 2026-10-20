// GitHub Pages-safe service worker for miumiuiuem VSTEP app.
// All URLs are resolved relative to this file, so repository subpaths work.
const CACHE_NAME = 'miumiuiuem-v5';
const STATIC_CACHE = 'miumiuiuem-static-v5';

const STATIC_ASSETS = [
  new URL('./', self.location.href).toString(),
  new URL('./index.html', self.location.href).toString(),
  new URL('./style.css', self.location.href).toString(),
  new URL('./manifest.json', self.location.href).toString()
];

// Helper to check if caches is available and functional
function isCacheAvailable() {
  return typeof caches !== 'undefined';
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      if (isCacheAvailable()) {
        try {
          const cache = await caches.open(STATIC_CACHE);
          await cache.addAll(STATIC_ASSETS);
        } catch (e) {
          console.warn('[PWA] Cache addAll failed during install:', e);
        }
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if (isCacheAvailable()) {
        try {
          const keys = await caches.keys();
          await Promise.all(
            keys.filter(key => key !== STATIC_CACHE).map(key => caches.delete(key))
          );
        } catch (e) {
          console.warn('[PWA] Cache cleanup failed during activate:', e);
        }
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  try {
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    const pathname = url.pathname;
    
    // Decide strategy based on file type:
    // - HTML, JS, CSS, Manifest/JSON: Network-first (keeps the app updated, prevents stale caching)
    // - Images, WebP, MP3, Fonts: Cache-first (rarely change, saves bandwidth)
    const isHtml = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
    const isCode = pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.json') || pathname.endsWith('.map');
    
    if (isHtml || isCode) {
      event.respondWith(networkFirst(request));
    } else {
      event.respondWith(cacheFirst(request));
    }
  } catch (err) {
    // Fallback if URL parsing or other things fail
    event.respondWith(fetch(request));
  }
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok && isCacheAvailable()) {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.put(request, response.clone());
      } catch (e) {
        console.warn('[PWA] Failed to write to cache in networkFirst:', e);
      }
    }
    return response;
  } catch (error) {
    console.warn('[PWA] networkFirst failed, falling back to cache:', error);
    if (isCacheAvailable()) {
      try {
        const cached = await caches.match(request);
        if (cached) return cached;
        
        // Fallback for navigation requests to index.html
        if (request.mode === 'navigate') {
          const fallback = await caches.match(new URL('./index.html', self.location.href).toString());
          if (fallback) return fallback;
        }
      } catch (e) {
        console.error('[PWA] Cache lookup failed in networkFirst fallback:', e);
      }
    }
    return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function cacheFirst(request) {
  if (isCacheAvailable()) {
    try {
      const cached = await caches.match(request);
      if (cached) return cached;
    } catch (e) {
      console.warn('[PWA] Cache lookup failed in cacheFirst:', e);
    }
  }

  try {
    const response = await fetch(request);
    if (response && response.ok && isCacheAvailable()) {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.put(request, response.clone());
      } catch (e) {
        console.warn('[PWA] Failed to write to cache in cacheFirst:', e);
      }
    }
    return response;
  } catch (error) {
    console.warn('[PWA] cacheFirst fetch failed:', error);
    return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data === 'clearCache') {
    if (isCacheAvailable()) {
      event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
      );
    }
  }
});
