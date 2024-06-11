const cacheName = "v1";

self.addEventListener("fetch", function (event) {
  event.respondWith(
    event.request.mode === "navigate" ||
      (event.request.method === "GET" &&
        event.request.headers.get("accept").includes("text/css"))
      ? fetch(event.request)
          .catch(function (err) {
            return caches.match(event.request);
          })
          .then(function (res) {
            return caches.open(cacheName).then(function (cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
      : fetch(event.request)
  );
});
