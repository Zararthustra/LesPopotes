const PREFIX = "V1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      cache.add(new Request("hey"));
    })()
  );
  console.log(`${PREFIX} Install`);
});

self.addEventListener("activate", (event) => {
  clients.claim();
  console.log(`${PREFIX} Activate`);
});

self.addEventListener("fetch", (event) => {
  //console.log(`Fetching : ${event.request.url}, Mode: ${event.request.mode}`);
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;
          return await fetch("/lapopote");
        } catch (error) {
          return new Response("error: ", error);
        }
      })()
    );
  }
});
