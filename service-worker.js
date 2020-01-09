importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox ? console.log(`Workbox success loaded`) : console.log(`Workbox failed`);

const CACHE_NAME = "pwaFootballNews";

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/team.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/fadhilstyle.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/base.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/notif.js', revision: '1' },
  { url: '/images/favicons/favicon.ico', revision: '1' },
  { url: '/images/favicons/my-icon-192.png', revision: '1' },
  { url: '/manifest.json', revision: '1' },
]);

// from CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// for fonts file within 30d
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30days
        maxEntries: 30,
      }),
    ],
  })
);

// for images type
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('/css'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'apiFootballData'
  })
);

// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.football-data.org/v2/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//           return response || fetch (event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification from Service Worker dude!', options)
  );
});

