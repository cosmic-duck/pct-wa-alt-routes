// Service worker: caches the app shell on install, and serves map tiles
// cache-first (falling back to network) so tiles downloaded via the
// "download current view" button work when offline later.

const APP_CACHE = 'pct-app-shell-v2';
const TILE_CACHE = 'pct-tiles-v1';

const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data/routes.js',
  './data/tracks.js',
  './data/fires.js',
  './data/pois.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== TILE_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function isTileRequest(url) {
  return (
    url.includes('tile.opentopomap.org') ||
    url.includes('tile.openstreetmap.org') ||
    url.includes('arcgisonline.com')
  );
}

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (isTileRequest(url)) {
    event.respondWith(
      caches.open(TILE_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request)
            .then((resp) => {
              if (resp.ok) cache.put(event.request, resp.clone());
              return resp;
            })
            .catch(() => cached); // if offline and not cached, this tile just won't load
        })
      )
    );
    return;
  }

  // App shell: network-first, so updates show up immediately on next visit
  // instead of getting stuck behind a stale cache-first response. Falls
  // back to cache only if the network request actually fails (i.e. offline).
  if (event.request.method === 'GET' && url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(APP_CACHE).then((cache) => cache.put(event.request, clone));
          }
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
