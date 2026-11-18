/* ==========================================================================
   APP STATE MANAGER & ROUTER - MULTI-LANGUAGE VSTEP LEARNING HUB
   ========================================================================== */

// ====== Error Boundary System ======
window.ErrorBoundary = {
  handlers: [],
  
  // Register an error handler for a specific view/component
  register: function (viewName, handler) {
    this.handlers[viewName] = handler;
  },
  
  // Handle error with fallback UI
  handle: function (viewName, error, containerId) {
    console.error('Error in ' + viewName + ':', error);
    console.log('AppState.currentView at error time:', AppState.currentView);
    
    var container = document.getElementById(containerId || 'main-content');
    if (!container) return;
    
    var handler = this.handlers[viewName];
    var fallbackHtml = handler ? handler(error) : this.defaultFallback(viewName, error);
    
    container.innerHTML = fallbackHtml;
    
    // Re-attach event listeners for retry buttons
    container.querySelectorAll('[data-retry-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = this.getAttribute('data-retry-view');
        console.log('Retry button clicked, navigating to:', view);
        window.App && App.navigate(view);
      });
    });
  },
  
  defaultFallback: function (viewName, error) {
    var isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return (
      '<div class="glass-card" style="padding:2rem;text-align:center;max-width:600px;margin:2rem auto;">' +
      '<div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>' +
      '<h2 style="margin-bottom:0.5rem;">Đã xảy ra lỗi</h2>' +
      '<p style="color:var(--text-muted);margin-bottom:1.5rem;">Không thể tải <strong>' + viewName + '</strong></p>' +
      (isDev ? 
        '<details style="text-align:left;background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:1rem;font-size:0.8rem;">' +
        '<summary>Chi tiết lỗi (dev)</summary>' +
        '<pre style="white-space:pre-wrap;overflow:auto;">' + (error.stack || error.message) + '</pre>' +
        '</details>' : ''
      ) +
      '<button class="btn btn-primary" data-retry-view="' + viewName + '">🔄 Thử lại</button>' +
      '<button class="btn btn-secondary" style="margin-left:0.5rem;" onclick="App.navigate(\'dashboard\')">🏠 Về trang chủ</button>' +
      '</div>'
    );
  },
  
  // Wrap a render function with error boundary
  wrap: function (viewName, renderFn) {
    return function () {
      try {
        console.log('ErrorBoundary.wrap rendering view:', viewName, 'AppState.currentView:', AppState.currentView);
        return renderFn.apply(this, arguments);
      } catch (e) {
        console.log('Error caught in ErrorBoundary.wrap for view:', viewName, 'error:', e);
        ErrorBoundary.handle(viewName, e);
        // Return empty string to prevent overwriting the fallback HTML
        return '';
      }
    };
  },
};

// Global error handler for uncaught errors
window.addEventListener('error', function (e) {
  // Don't handle errors from browser extensions etc.
  if (e.filename && e.filename.includes('extension')) return;
  
  var currentView = window.AppState && AppState.currentView || 'unknown';
  console.log('Global error caught, currentView:', currentView, 'error:', e.error);
  ErrorBoundary.handle(currentView, e.error || new Error(e.message), 'main-content');
  return true; // Prevent default browser handler
});

window.addEventListener('unhandledrejection', function (e) {
  var currentView = window.AppState && AppState.currentView || 'unknown';
  ErrorBoundary.handle(currentView, e.reason, 'main-content');
  return true;
});

window.AppState = {
  currentView: "dashboard",
  theme: StorageManager.getTheme(),
  voiceSpeed: parseFloat(StorageManager.get(StorageManager.KEYS.SPEED) || "1.0"),
  voicePitch: parseFloat(StorageManager.get(StorageManager.KEYS.PITCH) || "1.0"),
  streak: StorageManager.getStreak(),
  xp: StorageManager.getXp(),
  progress: StorageManager.getProgress(),
  selectedTopic: "greetings",
  learnTab: "vocabulary",
  chatHistory: [],
  fontSize: StorageManager.getFontSize(),
  frameSize: StorageManager.getFrameSize(),
};

window.App = {
  // ====== Khởi tạo ứng dụng ======
  init: function () {
    console.log('[DEBUG] App.init() started');

    // Áp dụng theme đã lưu
    document.documentElement.setAttribute("data-theme", AppState.theme);
    console.log('[DEBUG] Theme applied:', AppState.theme);

    // Áp dụng cỡ chữ đã lưu
    document.documentElement.style.setProperty('--base-font-size', AppState.fontSize + 'px');
    console.log('[DEBUG] Font size applied:', AppState.fontSize);

    // Áp dụng kích thước khung đã lưu
    document.documentElement.style.setProperty('--frame-size', AppState.frameSize + '%');
    console.log('[DEBUG] Frame size applied:', AppState.frameSize);

    // Init UI sound effects (global click delegate)
    if (typeof SoundManager !== "undefined" && SoundManager.init) {
      SoundManager.init();
      console.log('[DEBUG] SoundManager initialized');
    } else {
      console.warn('[DEBUG] SoundManager not available');
    }

    // Render Navbar
    Navbar.render();
    console.log('[DEBUG] Navbar rendered');

    // Render AI Sidebar
    AISidebar.render();
    console.log('[DEBUG] AISidebar rendered');

    // Render Clock Bubble
    ClockBubble.render();
    console.log('[DEBUG] ClockBubble rendered');

    // Render Notes Bubble
    NotesBubble.render();
    console.log('[DEBUG] NotesBubble rendered');

    // Init floating hub (bottom-right corner + quarter-arc bubbles)
    App.initFloatingMenu();
    console.log('[DEBUG] Floating menu initialized');

    // Start study timer
    if (typeof DashboardView !== "undefined" && DashboardView.startStudyTimer) {
      DashboardView.startStudyTimer();
      console.log('[DEBUG] Study timer started');
    } else {
      console.warn('[DEBUG] DashboardView not available');
    }

    // Điều hướng đến view ban đầu
    console.log('[DEBUG] Navigating to initial view:', AppState.currentView);
    App.navigate(AppState.currentView);
    console.log('[DEBUG] Initial navigation completed');

    // Dismiss preloader after successful render
    if (typeof window.dismissPreloader === 'function') {
      console.log('[DEBUG] Calling dismissPreloader');
      window.dismissPreloader();
    } else {
      console.error('[DEBUG] dismissPreloader function not available!');
    }

    // Kiểm tra streak hàng ngày
    App.checkDailyStreak();
    console.log('[DEBUG] App.init() completed');

    // Save study time when closing app
    window.addEventListener("beforeunload", function () {
      if (typeof DashboardView !== "undefined" && DashboardView.stopStudyTimer) {
        DashboardView.stopStudyTimer();
      }
    });

    // Cross-tab sync: refresh state when ANOTHER document (tab/iframe) writes
    // to storage. This handler must stay cheap and must NOT run the animated
    // navigation: the old guard compared AppState.currentView against
    // KEYS.CURRENT_VIEW, which was never persisted, so it was always true and
    // every storage event replayed the full fade-out/fade-in transition —
    // the visible screen flicker.
    var syncTimeout = null;
    window.addEventListener("vstep-data-changed", function () {
      if (syncTimeout) clearTimeout(syncTimeout);
      syncTimeout = setTimeout(function() {
        var prevTheme = AppState.theme;
        var prevXp = AppState.xp;
        var prevStreak = AppState.streak;
        var prevProgress = JSON.stringify(AppState.progress);

        AppState.theme = StorageManager.getTheme();
        AppState.voiceSpeed = parseFloat(StorageManager.get(StorageManager.KEYS.SPEED) || "1.0");
        AppState.voicePitch = parseFloat(StorageManager.get(StorageManager.KEYS.PITCH) || "1.0");
        AppState.streak = StorageManager.getStreak();
        AppState.xp = StorageManager.getXp();
        AppState.progress = StorageManager.getProgress();

        if (AppState.theme !== prevTheme) {
          document.documentElement.setAttribute("data-theme", AppState.theme);
        }
        Navbar.update();

        var storedView = StorageManager.get(StorageManager.KEYS.CURRENT_VIEW);
        var knownViews = { dashboard: 1, learn: 1, vstep: 1, thithu: 1, translator: 1, notes: 1, settings: 1 };

        if (storedView && storedView !== AppState.currentView && knownViews[storedView]) {
          // Another document switched views — follow it (single navigation,
          // which persists CURRENT_VIEW again with the same value, so the
          // storage event does not fire and the ping-pong stops here).
          App.navigate(storedView);
        } else if (
          AppState.currentView === "dashboard" &&
          (AppState.xp !== prevXp || AppState.streak !== prevStreak || JSON.stringify(AppState.progress) !== prevProgress)
        ) {
          // Progress data changed elsewhere: repaint the dashboard in place,
          // without the fade animation, so nothing flashes on screen.
          var mc = document.getElementById("main-content");
          if (mc && typeof DashboardView !== "undefined") {
            var keepScroll = window.scrollY;
            try {
              mc.innerHTML = ErrorBoundary.wrap("dashboard", DashboardView.render.bind(DashboardView))();
              DashboardView.bindEvents();
              window.scrollTo(0, keepScroll);
            } catch (err) {
              ErrorBoundary.handle("dashboard", err);
            }
          }
        }
      }, 100);
    });

    console.log("✅ App đã khởi tạo xong.");
  },

  // ====== Floating Menu (Mobile/Tablet) ======
  // ====== Floating hub (bottom-right corner) + quarter-arc bubbles ======
  // The hub (+) is always visible. Hovering it with a real mouse, focusing
  // it from the keyboard or tapping it (touch) toggles `arc-open` on <html>,
  // which fans the AI / Clock / Notes bubbles out along a quarter-circle arc.
  initFloatingMenu: function () {
    var root = document.documentElement;
    var container = document.getElementById('floating-menu-container');
    var toggle = document.getElementById('floating-menu-toggle');
    var arcButtons = ['ai-toggle-btn', 'clock-toggle-btn', 'notes-toggle-btn']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!container || !toggle) {
      console.warn('[DEBUG] Floating menu elements not found');
      return;
    }

    var closeTimer = null;
    var hovering = false;          // a mouse pointer sits on the hub or a bubble
    var pointerModality = 'mouse'; // 'mouse' | 'touch' | 'pen' of latest input
    var suppressFocusOpen = false; // set while close() moves focus to the hub

    function isOpen() {
      return root.classList.contains('arc-open');
    }

    function hasOpenPanel() {
      return !!document.querySelector('.floating-panel.open');
    }

    function inCluster(el) {
      if (!el) return false;
      if (container === el || container.contains(el)) return true;
      return arcButtons.some(function (btn) { return btn === el || btn.contains(el); });
    }

    function open() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (isOpen()) return;
      root.classList.add('arc-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function close() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (!isOpen()) return;
      root.classList.remove('arc-open');
      toggle.setAttribute('aria-expanded', 'false');
      // A bubble that turns visibility:hidden would drop keyboard focus to
      // <body>; hand it back to the hub instead.
      var active = document.activeElement;
      if (active && active !== toggle && inCluster(active)) {
        suppressFocusOpen = true;
        toggle.focus();
        suppressFocusOpen = false;
      }
    }

    function scheduleClose(delay) {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(function () {
        closeTimer = null;
        if (hovering || inCluster(document.activeElement)) {
          scheduleClose(600);
          return;
        }
        // Keep the arc open while a bubble panel is in use, so its toggle
        // bubble stays reachable. Touch retracts instead: the panel must
        // never be covered by the arc.
        if (hasOpenPanel() && pointerModality !== 'touch') {
          scheduleClose(700);
          return;
        }
        close();
      }, delay || 400);
    }

    // --- Hover: only a real mouse pointer opens the arc (touch taps would
    //     otherwise open it and immediately close it again on click). ---
    [toggle].concat(arcButtons).forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        pointerModality = 'mouse';
        hovering = true;
        open();
      });
      el.addEventListener('pointerleave', function () {
        hovering = false;
        if (pointerModality !== 'touch') scheduleClose();
      });
      // Remember how the next click originated (touch taps must toggle).
      el.addEventListener('pointerdown', function (e) {
        if (e.pointerType) pointerModality = e.pointerType;
      });
    });

    // --- Hub activation: touch + keyboard (detail 0) toggle; a mouse click
    //     only confirms the arc (hover already owns open/close). ---
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pointerModality === 'touch' || e.detail === 0) {
        if (isOpen()) close(); else open();
      } else {
        open();
      }
    });

    // --- Touch: retract the arc after picking a bubble, so the panel that
    //     just opened is not covered by the remaining bubbles. ---
    arcButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (pointerModality === 'touch') scheduleClose(150);
      });
    });

    // --- Keyboard: keep the arc in sync with focus. ---
    document.addEventListener('focusin', function (e) {
      if (suppressFocusOpen) return;
      if (inCluster(e.target)) { open(); return; }
      if (isOpen()) scheduleClose(300);
    });

    // --- Arrow keys fan focus out from the hub along the arc. ---
    toggle.addEventListener('keydown', function (e) {
      var target = {
        ArrowUp: 'ai-toggle-btn',
        ArrowLeft: 'notes-toggle-btn',
        ArrowDown: 'clock-toggle-btn',
        ArrowRight: 'clock-toggle-btn'
      }[e.key];
      if (!target) return;
      var btn = document.getElementById(target);
      if (!btn) return;
      e.preventDefault();
      open();
      btn.focus();
    });

    // --- Escape closes the arc and returns focus to the hub. ---
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !isOpen()) return;
      if (inCluster(document.activeElement)) close();
    });

    // --- Clicking anywhere else closes the arc (touch & keyboard states;
    //     hover states are closed by pointerleave instead). ---
    document.addEventListener('click', function (e) {
      if (!isOpen() || inCluster(e.target)) return;
      if (e.target && e.target.closest && e.target.closest('.floating-panel')) return;
      scheduleClose(0);
    });
  },

  // ====== Router điều hướng View ======
  navigate: function (viewName, onReady) {
    console.log('App.navigate called with viewName:', viewName, 'currentView before:', AppState.currentView);

    // Re-entrancy guard: a second navigate() while one is still animating
    // would stack two fade cycles (double flash). Supersede the old one.
    var self = this;
    var navToken = (this._navToken = (this._navToken || 0) + 1);

    if (typeof Navbar !== "undefined" && Navbar.closeMobile) {
      try { if (window.innerWidth <= 768) Navbar.closeMobile(); } catch (e) {}
    }

    AppState.currentView = viewName;
    // Persist the active view so cross-tab sync can detect a REAL view change
    // (and so the sync handler never treats every storage event as one).
    try {
      if (StorageManager.get(StorageManager.KEYS.CURRENT_VIEW) !== viewName) {
        StorageManager.set(StorageManager.KEYS.CURRENT_VIEW, viewName);
      }
    } catch (e) { /* non-fatal */ }
    var mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    var viewLabels = { dashboard: "Trang chủ", learn: "Học từ vựng", vstep: "Luyện thi VSTEP", thithu: "Thi thử", translator: "Dịch thuật", notes: "Ghi chú", settings: "Cài đặt" };
    var label = viewLabels[viewName] || viewName;
    if (typeof DashboardView !== "undefined" && DashboardView.saveLastActivity) {
      DashboardView.saveLastActivity(viewName, "", label);
    }

    document.querySelectorAll(".nav-item").forEach(function(el) { el.classList.remove("active"); });
    var activeNav = document.getElementById("nav-" + viewName);
    if (activeNav) activeNav.classList.add("active");

    mainContent.classList.add('view-loading');
    mainContent.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    mainContent.style.opacity = "0";
    mainContent.style.transform = "translateY(10px)";

    var finished = false;
    var finishNavigation = function () {
      if (finished) return;
      finished = true;
      mainContent.removeEventListener('transitionend', onTransitionEnd);

      // Superseded by a newer navigate(): let the newer call own the content,
      // otherwise an old timer would repaint a stale view (screen flash).
      if (navToken !== self._navToken) return;

      var renderView = function () {
        switch (viewName) {
          case "dashboard":
            mainContent.innerHTML = ErrorBoundary.wrap('dashboard', DashboardView.render.bind(DashboardView))();
            DashboardView.bindEvents(); break;
          case "learn":
            mainContent.innerHTML = ErrorBoundary.wrap('learn', LearnView.render.bind(LearnView))();
            LearnView.bindEvents(); break;
          case "vstep":
            mainContent.innerHTML = ErrorBoundary.wrap('vstep', VstepView.render.bind(VstepView))();
            VstepView.bindEvents(); break;
          case "thithu":
            mainContent.innerHTML = ErrorBoundary.wrap('thithu', ThithuView.render.bind(ThithuView))();
            ThithuView.bindEvents(); break;
          case "translator":
            mainContent.innerHTML = ErrorBoundary.wrap('translator', TranslatorView.render.bind(TranslatorView))();
            TranslatorView.bindEvents(); break;
          case "notes":
            NotesView.load();
            mainContent.innerHTML = ErrorBoundary.wrap('notes', NotesView.render.bind(NotesView))();
            NotesView.bindEvents(); break;
          case "settings":
            mainContent.innerHTML = ErrorBoundary.wrap('settings', SettingsView.render.bind(SettingsView))();
            SettingsView.bindEvents(); break;
          default:
            mainContent.innerHTML = ErrorBoundary.wrap('dashboard', DashboardView.render.bind(DashboardView))();
            DashboardView.bindEvents();
        }
      };

      try {
        console.log('About to render view:', viewName, 'AppState.currentView:', AppState.currentView);
        renderView();
        console.log('Successfully rendered view:', viewName);
      } catch (e) {
        console.error('Error during renderView for:', viewName, e);
        ErrorBoundary.handle(viewName, e);
      }

      mainContent.classList.remove('view-loading');
      mainContent.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0)";
      mainContent.style.pointerEvents = "auto";

      if (typeof Navbar !== "undefined" && Navbar.update) Navbar.update();
      if (typeof onReady === "function") {
        try { onReady(); } catch (callbackError) { console.error("Navigation callback error:", callbackError); }
      }
    };

    var onTransitionEnd = function(e) {
      if (e.target === mainContent && e.propertyName === 'opacity') finishNavigation();
    };
    mainContent.addEventListener('transitionend', onTransitionEnd);

    // Always finish even when transitionend is suppressed by the browser/WebView.
    setTimeout(finishNavigation, 380);
  },

  // ====== Lưu cài đặt người dùng (theme, giọng đọc, âm lượng...) ======
  // Used by SettingsView (theme buttons, speed/pitch/volume sliders).
  saveSettings: function (partial) {
    if (!partial || typeof partial !== "object") return false;

    // Theme: persist + apply immediately so the whole UI repaints.
    if (partial.theme) {
      AppState.theme = partial.theme;
      StorageManager.setTheme(partial.theme);
      document.documentElement.setAttribute("data-theme", partial.theme);
    }

    if (typeof partial.voiceSpeed === "number" && isFinite(partial.voiceSpeed)) {
      AppState.voiceSpeed = partial.voiceSpeed;
      StorageManager.set(StorageManager.KEYS.SPEED, partial.voiceSpeed);
    }

    if (typeof partial.voicePitch === "number" && isFinite(partial.voicePitch)) {
      AppState.voicePitch = partial.voicePitch;
      StorageManager.set(StorageManager.KEYS.PITCH, partial.voicePitch);
    }

    if (typeof partial.soundVolume === "number" && isFinite(partial.soundVolume)) {
      if (window.SoundManager && typeof window.SoundManager.setVolume === "function") {
        window.SoundManager.setVolume(partial.soundVolume); // persists as well
      } else {
        StorageManager.set(StorageManager.KEYS.SOUND_VOLUME, partial.soundVolume);
      }
    }

    if (typeof partial.fontSize !== "undefined" && window.SettingsView) {
      SettingsView.setFontSize(partial.fontSize);
    }

    if (typeof partial.frameSize !== "undefined" && window.SettingsView) {
      SettingsView.setFrameSize(partial.frameSize);
    }

    return true;
  },

  // ====== Phát âm TTS ======
  speak: function (text, lang) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const langCodeMap = { en: "en-US", vi: "vi-VN" };

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCodeMap[lang] || "en-US";
    utter.rate = AppState.voiceSpeed;
    utter.pitch = AppState.voicePitch;

    const voices = speechSynthesis.getVoices();
    const targetLang = langCodeMap[lang] || "en-US";
    const matchedVoice = voices.find(v => v.lang.startsWith(targetLang.split("-")[0]));
    if (matchedVoice) utter.voice = matchedVoice;
    window.speechSynthesis.speak(utter);
  },

  // ====== Tăng XP và tiến độ ======
  addXp: function (amount) {
    AppState.xp += amount;
    StorageManager.setXp(AppState.xp);
    Navbar.update();
    if (typeof SoundManager !== "undefined" && SoundManager.play) {
      SoundManager.play("success");
    }
  },

  updateProgress: function (lang, amount) {
    AppState.progress[lang] = Math.min(100, AppState.progress[lang] + amount);
    StorageManager.setProgress(AppState.progress);
  },

  // ====== Kiểm tra streak hàng ngày ======
  checkDailyStreak: function () {
    const lastDate = StorageManager.get(StorageManager.KEYS.LAST_DATE);
    const today = new Date().toDateString();

    if (lastDate !== today) {
      if (lastDate) {
        const last = new Date(lastDate);
        const now = new Date(today);
        const diff = (now - last) / (1000 * 60 * 60 * 24);
        if (diff <= 1) {
          AppState.streak += 1;
        } else {
          AppState.streak = 1; // Streak bị gián đoạn
        }
      } else {
        AppState.streak = 1; // Lần đầu
      }
      StorageManager.setStreak(AppState.streak);
      StorageManager.set(StorageManager.KEYS.LAST_DATE, today);
      if (typeof SoundManager !== "undefined" && SoundManager.play) {
        SoundManager.play("success");
      }
    }
  },

  // ====== Toggle AI Popup ======
  toggleAISidebar: function () {
    AISidebar.toggle();
  },

  // ====== Helper: Format số ======
  formatNumber: function (n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + "k";
    return n.toString();
  },

};
// ====== Tooltip Tap Handler for Mobile ======
(function () {
  var isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!isTouchDevice) return;

  document.addEventListener('click', function (e) {
    var target = e.target.closest('.zoom-term, .interactive-term');
    if (!target) {
      // Close any open tooltips when clicking elsewhere
      document.querySelectorAll('.zoom-term.show-tooltip, .interactive-term.show-tooltip').forEach(function (el) {
        el.classList.remove('show-tooltip');
      });
      return;
    }

    // Toggle tooltip on tap
    var wasOpen = target.classList.contains('show-tooltip');
    // Close all other tooltips first
    document.querySelectorAll('.zoom-term.show-tooltip, .interactive-term.show-tooltip').forEach(function (el) {
      if (el !== target) el.classList.remove('show-tooltip');
    });
    // Toggle current
    if (!wasOpen) {
      target.classList.add('show-tooltip');
    }
  }, true); // Use capture phase to handle before other click handlers
})();

// ====== Table Scroll Indicator ======
function checkTableScroll() {
  document.querySelectorAll('.prep-table-container, .exam-table-container, .collapsible-content table, .solution-table, .compare-table').forEach(function (container) {
    var table = container.tagName === 'TABLE' ? container : container.querySelector('table');
    if (!table) return;
    if (table.scrollWidth > table.clientWidth) {
      container.classList.add('scrollable');
    } else {
      container.classList.remove('scrollable');
    }
  });
}

// ====== Chip Strip Scroll Indicator ======
function checkChipStripScroll() {
  document.querySelectorAll('.khac-chip-strip, .khac-book-categories, .khac-book-topics, .khac-mindmap-topics, .khac-vocab-topics, .khac-idea-topics').forEach(function (strip) {
    if (strip.scrollWidth > strip.clientWidth) {
      strip.classList.add('has-scroll');
    } else {
      strip.classList.remove('has-scroll');
    }
  });
}

// Check on load and resize
window.addEventListener('load', function () {
  checkTableScroll();
  checkChipStripScroll();
});
window.addEventListener('resize', function () {
  checkTableScroll();
  checkChipStripScroll();
});

// Expose for manual triggering
window.checkTableScroll = checkTableScroll;
window.checkChipStripScroll = checkChipStripScroll;

// ====== Keyboard Navigation & Focus Management ======
(function () {
  var lastFocusedElement = null;
  var focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Trap focus inside a modal/panel
  function trapFocus(element) {
    var focusableElements = element.querySelectorAll(focusableSelector);
    if (!focusableElements.length) return;

    var firstElement = focusableElements[0];
    var lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function handleTab(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Save/restore focus for modals
  window.saveFocus = function () {
    lastFocusedElement = document.activeElement;
  };

  window.restoreFocus = function () {
    if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  };

  // Global keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // Escape - close any open panel/modal
    if (e.key === 'Escape') {
      var aiPanel = document.getElementById('ai-popup');
      var clockPanel = document.getElementById('clock-popup');
      var writingFeedback = document.querySelector('.writing-feedback-popup');
      
      if (aiPanel && aiPanel.classList.contains('open')) {
        e.preventDefault();
        window.AISidebar && AISidebar.toggle();
        restoreFocus();
        return;
      }
      if (clockPanel && clockPanel.classList.contains('open')) {
        e.preventDefault();
        window.ClockBubble && ClockBubble.toggle();
        restoreFocus();
        return;
      }
      if (writingFeedback) {
        e.preventDefault();
        writingFeedback.remove();
        restoreFocus();
        return;
      }
      // Close mobile nav
      var nav = document.getElementById('navbar');
      if (nav && nav.classList.contains('open')) {
        e.preventDefault();
        window.Navbar && Navbar.closeMobile();
        return;
      }
    }

    // Ctrl+K - Focus search (Notes, Learn, etc.)
    if (e.ctrlKey && e.key === 'k') {
      var searchInput = document.getElementById('notes-search') || 
                        document.getElementById('vstep-vocab-search') ||
                        document.querySelector('.input-field[placeholder*="Tìm"]');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }

    // Ctrl+S - Save draft (writing, notes)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      // Trigger save in current view
      if (window.LearnView && LearnView.activeMode === 'typing') {
        // Save typing state
      }
      if (window.NotesView && NotesView.currentNoteId) {
        NotesView.saveNote();
      }
      if (window.VstepView && VstepView.writing && VstepView.writing.userText) {
        // Writing auto-save handled by view
      }
    }

    // Ctrl+/ - Toggle AI assistant
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      window.App && App.toggleAISidebar();
    }
  });

  // Keyboard support for floating toggle buttons
  document.addEventListener('keydown', function (e) {
    var target = e.target;
    if (target.id === 'ai-toggle-btn' || target.id === 'clock-toggle-btn') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        target.click();
      }
    }
  });

  // Add visible focus styles for keyboard navigation
  var style = document.createElement('style');
  style.id = 'focus-visible-styles';
  style.textContent = 
    '.btn:focus-visible, .nav-item:focus-visible, .nav-subitem:focus-visible, ' +
    '.topic-chip:focus-visible, .mode-card:focus-visible, .lesson-card:focus-visible, ' +
    '.vocab-filter-chip:focus-visible, .vstep-cat-btn:focus-visible, .vstep-test-btn:focus-visible, ' +
    '.speaking-part-btn:focus-visible, .option-btn:focus-visible, .ai-toggle-btn:focus-visible, ' +
    '.clock-toggle-btn:focus-visible, .mobile-menu-btn:focus-visible, .panel-close:focus-visible, ' +
    '.input-field:focus-visible, .select-dropdown:focus-visible { ' +
    'outline: 2px solid var(--primary) !important; outline-offset: 2px !important; }' +
    '.floating-panel:focus-within { z-index: 200; }' +
    '[aria-hidden="true"] { display: none; }';
  document.head.appendChild(style);

  // Make panels focusable and trap focus when open
  var observePanels = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        var panel = mutation.target;
        if (panel.classList.contains('floating-panel') && panel.classList.contains('open')) {
          panel.setAttribute('tabindex', '-1');
          trapFocus(panel);
          // Focus first focusable element
          var firstFocusable = panel.querySelector(focusableSelector);
          if (firstFocusable) firstFocusable.focus();
          saveFocus();
        } else if (panel.classList.contains('floating-panel') && !panel.classList.contains('open')) {
          panel.removeAttribute('tabindex');
        }
      }
    });
  });

  document.querySelectorAll('.floating-panel').forEach(function (panel) {
    observePanels.observe(panel, { attributes: true, attributeFilter: ['class'] });
  });
})();

// ====== Draft Auto-Save Manager ======
window.DraftManager = {
  STORAGE_PREFIX: 'vstep_draft_',
  DEBOUNCE_MS: 1500,
  timers: {},

  // Save draft with debounce
  save: function (key, data) {
    var fullKey = this.STORAGE_PREFIX + key;
    var timer = this.timers[key];
    if (timer) clearTimeout(timer);

    this.timers[key] = setTimeout(function () {
      try {
        localStorage.setItem(fullKey, JSON.stringify({
          data: data,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('Draft save failed:', e);
      }
    }, this.DEBOUNCE_MS);
  },

  // Load draft
  load: function (key) {
    var fullKey = this.STORAGE_PREFIX + key;
    try {
      var stored = localStorage.getItem(fullKey);
      if (stored) {
        var parsed = JSON.parse(stored);
        // Expire drafts older than 7 days
        if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
          return parsed.data;
        } else {
          localStorage.removeItem(fullKey);
        }
      }
    } catch (e) {}
    return null;
  },

  // Clear draft
  clear: function (key) {
    var fullKey = this.STORAGE_PREFIX + key;
    var timer = this.timers[key];
    if (timer) clearTimeout(timer);
    try { localStorage.removeItem(fullKey); } catch (e) {}
  },

  // Check if draft exists
  hasDraft: function (key) {
    return this.load(key) !== null;
  },

  // Get all drafts
  getAllDrafts: function () {
    var drafts = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith(this.STORAGE_PREFIX)) {
        var draftKey = key.replace(this.STORAGE_PREFIX, '');
        var data = this.load(draftKey);
        if (data) drafts[draftKey] = data;
      }
    }
    return drafts;
  }
};

// Khởi chạy app khi DOM sẵn sàng
var initApp = function () {
  try {
    // Initialize MutationObserver for dynamic table/chip-strip detection
    if (document.body) {
      var observer = new MutationObserver(function (mutations) {
        var shouldCheck = false;
        mutations.forEach(function (mutation) {
          if (mutation.addedNodes.length) {
            shouldCheck = true;
          }
        });
        if (shouldCheck) {
          checkTableScroll();
          checkChipStripScroll();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    App.init();
  } catch (e) {
    console.error("Error during app initialization:", e);
    // Show error message to user
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML = '<div class="glass-card" style="padding:2rem;text-align:center;"><h3 style="color:var(--text-red);">Lỗi khởi tạo ứng dụng</h3><p style="color:var(--text-muted);">Vui lòng tải lại trang hoặc liên hệ hỗ trợ.</p><button class="btn btn-primary" onclick="location.reload()">Tải lại trang</button></div>';
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
