const cacheName = "v1";

self.addEventListener("fetch", (event) => {
  event.respondWith(
    event.request.mode === "navigate" ||
      (event.request.method === "GET" &&
        event.request.headers.get("accept").includes("text/css"))
      ? fetch(event.request)
          .catch((err) => caches.match(event.request))
          .then(async (res) => {
            const cache = await caches.open(cacheName);
            cache.put(event.request.url, res.clone());
            return res;
          })
      : fetch(event.request)
  );
});
