/* ==========================================================================
   PWA BOOTSTRAP - manifest injection + service worker registration
   Loaded from <head>; every listener waits for the window "load" event, so
   moving this file does not change when the worker is registered.

   Both features are HTTP(S) only: file:// requests for a manifest and a
   service worker are blocked by browser security.
   ========================================================================== */
(function () {
  "use strict";

  var isHttp =
    window.location.protocol === "http:" || window.location.protocol === "https:";

  // ---- Web app manifest ---------------------------------------------------
  if (isHttp) {
    var manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = "./manifest.json";
    document.head.appendChild(manifest);
  } else {
    console.info(
      "[PWA] Manifest disabled for file:// mode; run `npm start` for full PWA support."
    );
  }

  // ---- Service worker -----------------------------------------------------
  if (!("serviceWorker" in navigator) || !isHttp) return;

  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then(function (registration) {
        console.log("[PWA] Service Worker registered:", registration.scope);

        // Ask the new worker to take over as soon as it is ready.
        registration.addEventListener("updatefound", function () {
          var newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", function () {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              newWorker.postMessage("skipWaiting");
              console.log("[PWA] New service worker version detected; skipWaiting sent.");
            }
          });
        });
      })
      .catch(function (error) {
        console.warn("[PWA] Service Worker registration failed:", error);
      });

    // Reload once when the new worker takes control (fresh assets on screen).
    var refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (refreshing) return;
      refreshing = true;
      console.log("[PWA] Controller changed; reloading page...");
      window.location.reload();
    });
  });
})();
