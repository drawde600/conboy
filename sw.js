const CACHE_NAME = 'convoy-cache-v1';
const urlsToCache = [
  '/index.html',
  '/creategroup-chatgpt.html',
  '/creategroup-uxpilot.html',
  '/joingroup-chatgpt.html',
  '/joingroup-uxpilot.html',
  '/landingpage-chatgpt.html',
  '/landingpage-uxpilot.html',
  '/mapview-chatgpt.html',
  '/mapview-uxpilot.html',
  '/trackgroup-chatgpt.html',
  '/trackgroup-uxpilot.html',
  '/convoy.pdf',
  '/creategroup.jpg',
  '/joingroup.jpg',
  '/landingpage.jpg',
  '/mapview.jpg',
  '/trackgroup.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
