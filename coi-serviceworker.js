// Cross-origin isolation shim for static hosting (for SharedArrayBuffer / WASM threads).
(() => {
  if (typeof window === "undefined") {
    self.addEventListener("install", () => self.skipWaiting());

    self.addEventListener("activate", (event) => {
      event.waitUntil(self.clients.claim());
    });

    self.addEventListener("fetch", (event) => {
      const { request } = event;

      // Skip requests that cannot be intercepted by fetch in this context.
      if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
        return;
      }

      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.status === 0) {
              return response;
            }

            const headers = new Headers(response.headers);
            headers.set("Cross-Origin-Embedder-Policy", "require-corp");
            headers.set("Cross-Origin-Opener-Policy", "same-origin");

            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers,
            });
          })
          .catch(() => fetch(request))
      );
    });

    return;
  }

  if (window.crossOriginIsolated || !window.isSecureContext) {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    return;
  }

  const scriptUrl = document.currentScript?.src;
  if (!scriptUrl) {
    return;
  }

  navigator.serviceWorker
    .register(scriptUrl)
    .then((registration) => {
      if (!navigator.serviceWorker.controller) {
        window.location.reload();
      }

      registration.addEventListener("updatefound", () => {
        window.location.reload();
      });
    })
    .catch((error) => {
      console.error("COI service worker registration failed:", error);
    });
})();
