const CACHE='tamir-dive-launcher-v3';
const ASSETS=['./?v=3','./index.html?v=3','./manifest.json?v=3','./icon-192.png?v=2','./icon-512.png?v=2'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if (new URL(e.request.url).origin === self.location.origin) {
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  }
});
