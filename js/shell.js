/* ==========================================================================
   SHELL CONTROLS
   Wires the floating buttons (AI / Clock / Notes). index.html contains no
   inline event handlers - everything lives here so the markup stays
   declarative and the behaviour is easy to change in one place.
   Loaded at the end of <body>, after every application script.
   ========================================================================== */
(function () {
  "use strict";

  /**
   * Notes bubble button: click-to-toggle.
   * NoteDragDrop replaces this node with a clone (to drop stale listeners),
   * so it calls VstepShell.bindNotesButton() again after the swap - see
   * src/services/NoteDragDrop.js.
   */
  function bindNotesButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (window.NotesBubble) NotesBubble.toggle();
    });
  }

  function init() {
    // The arc open/close behaviour is owned by App.initFloatingMenu();
    // AI and Clock clicks are assigned by AISidebar.render() and
    // ClockBubble.render() - only the notes button is wired here.
    bindNotesButton(document.getElementById("notes-toggle-btn"));
  }

  // Exposed so NoteDragDrop can re-bind after it clones the notes button.
  window.VstepShell = { bindNotesButton: bindNotesButton, init: init };

  init();
})();
