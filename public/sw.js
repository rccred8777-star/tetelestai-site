/* Service Worker — Tetelestai Missões
 *
 * Objetivo: abrir o app OFFLINE (casca do app em cache) e manter os arquivos
 * estáticos rápidos. Os dados (Firestore) têm cache próprio no app.
 *
 * Estratégia conservadora:
 *  - Navegação (HTML): NETWORK-FIRST, com fallback para a casca em cache.
 *    Assim uma atualização sempre chega quando há internet, e offline abre.
 *  - Arquivos /assets/* (com hash, imutáveis): CACHE-FIRST.
 *  - Firebase / Google / APIs: NUNCA passam pelo SW (vão direto à rede).
 */
const CACHE = 'ttl-v1';
const SHELL = ['/', '/index.html', '/manifest.webmanifest',
  '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Só cuidamos do próprio domínio. Firebase, Google Fonts, APIs → direto à rede.
  if (url.origin !== self.location.origin) return;

  // Navegação (abrir uma página): rede primeiro, cache como reserva (offline).
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          caches.open(CACHE).then((c) => c.put('/', res.clone())).catch(() => {});
          return res;
        })
        .catch(() => caches.match('/').then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  // Arquivos estáticos com hash: cache primeiro, atualiza em segundo plano.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          caches.open(CACHE).then((c) => c.put(req, res.clone())).catch(() => {});
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Demais GET do domínio (imagens, pdf, ícones): tenta cache, senão rede.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      caches.open(CACHE).then((c) => c.put(req, res.clone())).catch(() => {});
      return res;
    }).catch(() => cached))
  );
});
