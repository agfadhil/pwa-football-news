const CACHE_NAME = "trycache";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/portfolio.html",
  "/css/materialize.min.css",
  "/css/fadhilstyle.css",
  "/js/api.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/images/devvsdesigner.gif",
  "/images/saitama2.jpg",
  "/manifest.json"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches
//       .match(event.request, { cacheName: CACHE_NAME })
//       .then(function(response) {
//         if (response) {
//           console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//           return response;
//         }
//         console.log(
//           "ServiceWorker: Memuat aset dari server: ",
//           event.request.url
//         );
//         return fetch(event.request);
//       })
//   );
// });

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
      })
    )
  }

});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            // console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
