const CACHE = 'offline-fallback-v1';
const cacheUrls = ['/', '/bundle.js', '/static/pics/logo.svg', '/static/fonts/Montserrat-Bold.woff2!static',
  '/static/fonts/Montserrat-Regular.woff2!static'];
const cacheReq = 'https://film4u.club/api/collections/getCollections';
const fallback = '/cache/api/';

self.addEventListener('install', (event) => {
  event.waitUntil(
      fetch(cacheReq + '?skip=0&limit=12', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      }).then(async (response) => {
        const cache = await caches.open(CACHE);
        await cache.put(fallback, response.clone());
        const parsedJson = await response.json();
        const imagesUrls = parsedJson.body.collections_list.map(
            (collection) => `https://film4u.club${collection.picture_url}`);
        const responses = await Promise.all(imagesUrls.map(function(urlToPrefetch) {
          return fetch(urlToPrefetch, {mode: 'no-cors'});
        }));
        await Promise.all(responses.map((response, i) => {
          return cache.put(imagesUrls[i], response.clone());
        },
        ));
        await cache.addAll(cacheUrls);
      }));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then((resp) => {
        return resp || fetch(event.request).then((response) => {
          return caches.open(CACHE).then((cache) => {
            return response;
          });
        });
      }).catch(() => {
        if (event.request.url.startsWith(cacheReq)) {
          return caches.match(fallback);
        }
        return caches.match('/static/pics/logo.svg');
      }),
  );
});
