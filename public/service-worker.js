const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/index.js',
  '/indexedDb.js',
  '/manifest.webmanifest',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // '/dist/app.bundle.js',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
];
// group project ref ///////////////////////////////////////////////////////////////
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

// install ----------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache
      .addAll(FILES_TO_CACHE))

      // after finished - activate 
      (self.skipWaiting())
  );
});

// activate ----------------------------------------------------
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches
      .keys()
      .then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
  );

  self.clients.claim();
});

// fetch ----------------------------------------------------
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(evt.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            })
            .catch(err => {
              // error
              return cache.match(evt.request);
            });
        }).catch(err => console.log(err))
    );
    // return response if request was good - to cache 
    return;
  }

  evt.respondWith(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.match(evt.request).then(response => {
          return response || fetch(evt.request);
        });
      })
  );
});
// The activate handler takes care of cleaning up old caches.
// self.addEventListener('activate', (event) => {
//   const currentCaches = [CACHE_NAME, DATA_CACHE_NAME];
//   event.waitUntil(
//     caches
//       .keys()
//       .then((keyList) => {
//         return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
//       })
//       .then((cachesToDelete) => {
//         return Promise.all(
//           cachesToDelete.map((cacheToDelete) => {
//             return caches.delete(cacheToDelete);
//           })
//         );
//       })
//       .then(() => self.clients.claim())
//   );
// });

// self.addEventListener('fetch', (event) => {
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(DATA_CACHE_NAME).then((cache) => {
//           return fetch(event.request).then((response) => {
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });
