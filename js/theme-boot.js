/* ==========================================================================
   THEME BOOT - runs before any stylesheet is parsed
   Restores the saved colour theme immediately so a dark page never flashes
   white (or the other way round) while css/*.css is still loading.
   Keep this file tiny and dependency-free: it is render blocking on purpose.
   ========================================================================== */
(function () {
  "use strict";

  var theme = "dark";
  try {
    theme = localStorage.getItem("vstep_theme") || "dark";
  } catch (e) {
    // localStorage can throw in private mode / when cookies are blocked
  }

  document.documentElement.setAttribute("data-theme", theme);

  // Restore the drag-resized sidebar width before the first layout so the
  // shell never paints at 240px and then jumps. Must mirror the clamp used by
  // Navbar.js (200–420px); it cannot be imported here because this file runs
  // before anything else.
  try {
    var navWidth = parseInt(localStorage.getItem("vstep_nav_width"), 10);
    if (navWidth >= 200 && navWidth <= 420) {
      document.documentElement.style.setProperty("--navbar-width", navWidth + "px");
    }
  } catch (e2) {
    // ignore: same private-mode fallback as the theme above
  }
})();
