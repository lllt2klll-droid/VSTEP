/* ==========================================================================
   SHELL CONTROLS
   Wires the floating buttons (AI / Clock / Notes) and the mobile quick menu.
   index.html contains no inline event handlers - everything lives here so the
   markup stays declarative and the behaviour is easy to change in one place.
   Loaded at the end of <body>, after every application script.
   ========================================================================== */
(function () {
  "use strict";

  /** Drag support (the buttons can be repositioned by dragging them around). */
  function bindDrag(el, withTouch) {
    if (!el) return;
    el.addEventListener("mousedown", function (e) {
      if (window.App && App.startDrag) App.startDrag(e, el.id);
    });
    if (withTouch) {
      el.addEventListener("touchstart", function (e) {
        if (window.App && App.startDrag) App.startDrag(e, el.id);
      }, { passive: false });
    }
  }

  /**
   * Notes bubble button: drag + click-to-toggle.
   * NoteDragDrop replaces this node with a clone (to drop stale listeners), so
   * it calls VstepShell.bindNotesButton() again after the swap - see
   * src/services/NoteDragDrop.js.
   */
  function bindNotesButton(btn) {
    if (!btn) return;
    bindDrag(btn, true);
    btn.addEventListener("click", function () {
      if (window.App && App._wasDragged) return;
      if (window.NotesBubble) NotesBubble.toggle();
    });
  }

  function bindToggle(el, toggle) {
    if (!el) return;
    // No stopPropagation: the original inline handlers let the event bubble to
    // the document-level listeners (menu auto-close, click sounds, ...).
    el.addEventListener("click", function () {
      toggle();
    });
  }

  function init() {
    // Floating action buttons ------------------------------------------------
    bindDrag(document.getElementById("ai-toggle-btn"), false);
    bindDrag(document.getElementById("clock-toggle-btn"), false);
    bindNotesButton(document.getElementById("notes-toggle-btn"));

    // Mobile / tablet quick menu --------------------------------------------
    bindToggle(document.getElementById("floating-menu-ai"), function () {
      if (window.AISidebar) AISidebar.toggle();
    });
    bindToggle(document.getElementById("floating-menu-clock"), function () {
      if (window.ClockBubble) ClockBubble.toggle();
    });
    bindToggle(document.getElementById("floating-menu-notes"), function () {
      if (window.NotesBubble) NotesBubble.toggle();
    });
  }

  // Exposed so NoteDragDrop can re-bind after it clones the notes button.
  window.VstepShell = { bindNotesButton: bindNotesButton, init: init };

  init();
})();
