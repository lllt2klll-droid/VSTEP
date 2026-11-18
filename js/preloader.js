/* ==========================================================================
   PRELOADER - shows the boot screen until App.init() finishes rendering
   App.init() (src/app.js) calls window.dismissPreloader() when the first view
   is on screen; this file also guarantees the page never stays stuck behind
   the overlay, even when a script fails to load.
   Loaded at the end of <body>, after every application script.
   ========================================================================== */
(function () {
  "use strict";

  // Dismiss the preloader once the app has rendered.
  window.dismissPreloader = function () {
    var preloader = document.getElementById("app-preloader");
    if (!preloader) return;

    preloader.classList.add("fade-out");
    window.setTimeout(function () {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 700);
  };

  // Safety net: never leave the user on a blank screen for more than 10s.
  window.setTimeout(function () {
    var preloader = document.getElementById("app-preloader");
    if (!preloader || !preloader.parentNode) return;

    preloader.parentNode.removeChild(preloader);
    console.warn("[PWA] Preloader force-removed after 10s (app may have failed to initialize)");

    var mainContent = document.getElementById("main-content");
    if (!mainContent || mainContent.innerHTML.trim()) return;

    mainContent.innerHTML =
      '<div class="glass-card" style="padding:2.5rem 1.5rem;text-align:center;max-width:500px;margin:3rem auto;border-color:rgba(239,68,68,0.3);">' +
      '<div style="font-size:3.5rem;margin-bottom:1.25rem;">⚠️</div>' +
      '<h3 style="margin-bottom:0.75rem;font-weight:700;">Không thể khởi động ứng dụng</h3>' +
      '<p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:1.5rem;line-height:1.5;">' +
      "Hệ thống phát hiện tài nguyên cũ đang bị kẹt hoặc lỗi mạng. Vui lòng xóa cache hoặc thử lại.</p>" +
      '<div style="display:flex;flex-direction:column;gap:0.75rem;">' +
      '<button class="btn btn-primary" id="preloader-reload" style="width:100%;">🔄 Tải lại trang</button>' +
      '<button class="btn btn-secondary" id="preloader-reset" style="width:100%;color:#ef4444;background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.2);">' +
      "🧹 Xóa dữ liệu cũ &amp; Tải lại</button>" +
      "</div></div>";

    var reload = document.getElementById("preloader-reload");
    if (reload) reload.addEventListener("click", function () { location.reload(); });

    var reset = document.getElementById("preloader-reset");
    if (reset) {
      reset.addEventListener("click", function () {
        var clear = navigator.serviceWorker && navigator.serviceWorker.getRegistrations
          ? navigator.serviceWorker.getRegistrations().then(function (rs) {
              rs.forEach(function (r) { r.unregister(); });
            })
          : Promise.resolve();
        clear.then(function () {
          localStorage.clear();
          location.reload();
        });
      });
    }
  }, 10000);
})();
