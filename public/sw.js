// YoungFire Ministry Service Worker
const CACHE_NAME = 'youngfire-v1-' + Date.now();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Network first strategy with fallback for online dynamic experience
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
