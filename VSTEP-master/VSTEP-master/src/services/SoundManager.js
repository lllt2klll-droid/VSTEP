/* ==========================================================================
   SOUND MANAGER - UI SOUND EFFECTS VIA WEB AUDIO API
   (no audio files needed; tones are synthesized at runtime)
   ========================================================================== */

window.SoundManager = {
  _ctx: null,

  getEnabled: function () {
    try {
      return StorageManager.get(StorageManager.KEYS.SOUND_ENABLED) !== "false";
    } catch (e) {
      return true;
    }
  },

  getVolume: function () {
    try {
      var v = parseFloat(StorageManager.get(StorageManager.KEYS.SOUND_VOLUME));
      if (isNaN(v)) return 0.5;
      return Math.min(1, Math.max(0, v));
    } catch (e) {
      return 0.5;
    }
  },

  setEnabled: function (enabled) {
    return StorageManager.set(StorageManager.KEYS.SOUND_ENABLED, enabled);
  },

  setVolume: function (volume) {
    return StorageManager.set(StorageManager.KEYS.SOUND_VOLUME, volume);
  },

  _ensureContext: function () {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!this._ctx) {
      try {
        this._ctx = new AC();
      } catch (e) {
        return null;
      }
    }
    if (this._ctx.state === "suspended") {
      try {
        // Resume audio context on user interaction (required on mobile)
        this._ctx.resume();
      } catch (e) {}
    }
    return this._ctx;
  },

  _tone: function (ctx, freq, startTime, duration, type, gain, when) {
    var osc = ctx.createOscillator();
    var g = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, when);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(gain, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(when);
    osc.stop(when + duration + 0.05);
  },

  play: function (type) {
    if (!this.getEnabled()) return;
    var volume = this.getVolume();
    if (volume <= 0) return;

    var ctx = this._ensureContext();
    if (!ctx) return;
    var now = ctx.currentTime;
    var v = volume * 0.5;

    if (type === "success") {
      // Rising two-tone chime: C5 -> E5
      this._tone(ctx, 523.25, 0, 0.18, "sine", v, now);
      this._tone(ctx, 659.25, 0.12, 0.28, "sine", v, now + 0.12);
    } else if (type === "notify") {
      // Soft notification double-beep
      this._tone(ctx, 880, 0, 0.1, "sine", v * 0.8, now);
      this._tone(ctx, 880, 0.14, 0.12, "sine", v * 0.8, now + 0.14);
    } else {
      // Subtle click tick
      this._tone(ctx, 1200, 0, 0.06, "triangle", v * 0.35, now);
    }
  },

  // Global click delegate: plays a soft tick for interactive elements
  init: function () {
    document.addEventListener("click", function (e) {
      if (!e.target || !e.target.closest) return;
      var el = e.target.closest(
        "button, .nav-item, .theme-btn, .mode-card, .collapsible-header, .speaking-chip"
      );
      if (el) SoundManager.play("click");
    });
  }
};
