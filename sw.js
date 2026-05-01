// Service Worker - Mi Álbum 2026
// Cachea archivos estáticos para uso offline. Los datos del álbum
// siempre van/vienen de Supabase (online), pero la app carga sin internet.

const CACHE_NAME = 'album-2026-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-167.png',
  './icon-152.png',
  './icon-120.png'
];

// Al instalar: cachear archivos core
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Al activar: limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Al hacer fetch: estrategia network-first para HTML, cache-first para assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Nunca interceptar requests a Supabase (siempre online)
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  // Nunca interceptar requests a Google Fonts o CDN externo
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('jsdelivr.net')) {
    // Cache-first para fuentes/CDN (raras veces cambian)
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((res) => {
          // Cachear respuesta para próxima vez
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        }).catch(() => cached); // Si falla red, usar caché
      })
    );
    return;
  }

  // Network-first para HTML (asegura tener última versión cuando hay internet)
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return res;
      }).catch(() => caches.match(event.request).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first para assets estáticos (íconos, etc.)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      });
    })
  );
});
