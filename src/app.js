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

    // Init Floating Menu (Mobile/Tablet)
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

    // Cross-tab sync: reload state and re-render current view when another
    // tab writes to storage (debounced to prevent infinite loops)
    var syncTimeout = null;
    window.addEventListener("vstep-data-changed", function () {
      if (syncTimeout) clearTimeout(syncTimeout);
      syncTimeout = setTimeout(function() {
        AppState.theme = StorageManager.getTheme();
        AppState.voiceSpeed = parseFloat(StorageManager.get(StorageManager.KEYS.SPEED) || "1.0");
        AppState.voicePitch = parseFloat(StorageManager.get(StorageManager.KEYS.PITCH) || "1.0");
        AppState.streak = StorageManager.getStreak();
        AppState.xp = StorageManager.getXp();
        AppState.progress = StorageManager.getProgress();
        document.documentElement.setAttribute("data-theme", AppState.theme);
        Navbar.update();
        // Only navigate if the view actually changed
        if (AppState.currentView !== StorageManager.get(StorageManager.KEYS.CURRENT_VIEW)) {
          App.navigate(AppState.currentView);
        }
      }, 100);
    });

    console.log("✅ App đã khởi tạo xong.");
  },

  // ====== Floating Menu (Mobile/Tablet) ======
  initFloatingMenu: function () {
    var menuContainer = document.getElementById('floating-menu-container');
    var menuToggle = document.getElementById('floating-menu-toggle');
    var menuItems = document.getElementById('floating-menu-items');
    
    if (!menuContainer || !menuToggle || !menuItems) {
      console.warn('[DEBUG] Floating menu elements not found');
      return;
    }

    // Check screen size and show/hide menu accordingly
    var checkScreenSize = function () {
      if (window.innerWidth <= 1024) {
        menuContainer.style.display = 'block';
      } else {
        menuContainer.style.display = 'none';
        menuItems.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    };

    // Initial check
    checkScreenSize();

    // Listen for resize
    window.addEventListener('resize', checkScreenSize);

    // Toggle menu open/close
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menuItems.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!menuContainer.contains(e.target)) {
        menuItems.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    });
  },

  // ====== Router điều hướng View ======
  navigate: function (viewName, onReady) {
    console.log('App.navigate called with viewName:', viewName, 'currentView before:', AppState.currentView);

    if (typeof Navbar !== "undefined" && Navbar.closeMobile) {
      try { if (window.innerWidth <= 768) Navbar.closeMobile(); } catch (e) {}
    }

    AppState.currentView = viewName;
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

  // ====== Drag functionality (mouse + touch) ======
  startDrag: function (e, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Prevent default behavior for touch events to avoid scrolling while dragging
    if (e.type === 'touchstart') {
      e.preventDefault();
    }

    // Support both mouse and touch
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === undefined) return;

    // Chuyển ngay sang dùng left/top tuyệt đối để tránh xung đột với right/bottom
    const rect = el.getBoundingClientRect();
    el.style.left = rect.left + "px";
    el.style.top = rect.top + "px";
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.transform = "none";

    this._dragElement = el;
    this._isDragging = false;
    this._dragMoved = false;
    // Lưu offset từ chuột/touch đến góc trái-trên của element
    this._dragOffsetX = clientX - rect.left;
    this._dragOffsetY = clientY - rect.top;

    // Add both mouse and touch listeners
    document.addEventListener("mousemove", this._boundDrag = this.drag.bind(this), { passive: false });
    document.addEventListener("mouseup", this._boundStopDrag = this.stopDrag.bind(this));
    document.addEventListener("touchmove", this._boundDrag, { passive: false });
    document.addEventListener("touchend", this._boundStopDrag);
    document.addEventListener("touchcancel", this._boundStopDrag);
  },

  drag: function (e) {
    if (!this._dragElement) return;
    e.preventDefault();

    // Support both mouse and touch
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === undefined) return;

    const dx = Math.abs(clientX - (this._dragOffsetX + parseFloat(this._dragElement.style.left || 0)));
    const dy = Math.abs(clientY - (this._dragOffsetY + parseFloat(this._dragElement.style.top || 0)));

    if (!this._isDragging && (dx > 3 || dy > 3)) {
      this._isDragging = true;
      this._dragMoved = true;
      this._dragElement.classList.add("dragging");
      this._dragElement.style.transition = "none";
      // Prevent scrolling on mobile while dragging
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    if (!this._isDragging) return;

    // Di chuyển button bằng left/top tuyệt đối — không dùng transform
    const newLeft = clientX - this._dragOffsetX;
    const newTop = clientY - this._dragOffsetY;

    // Giới hạn trong màn hình
    const elW = this._dragElement.offsetWidth;
    const elH = this._dragElement.offsetHeight;
    const maxLeft = window.innerWidth - elW;
    const maxTop = window.innerHeight - elH;

    this._dragElement.style.left = Math.max(0, Math.min(maxLeft, newLeft)) + "px";
    this._dragElement.style.top = Math.max(0, Math.min(maxTop, newTop)) + "px";
    this._dragMoved = true;
  },

  stopDrag: function () {
    if (!this._dragElement) return;

    const el = this._dragElement;
    const wasDragging = this._isDragging && this._dragMoved;

    if (wasDragging) {
      el.style.transition = "box-shadow 0.2s ease";
      el.classList.remove("dragging");
      // Đặt flag để onclick biết là vừa kéo xong
      this._wasDragged = true;
      setTimeout(() => { this._wasDragged = false; }, 100);
      // Restore body scrolling on mobile
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    this._isDragging = false;
    this._dragElement = null;
    this._dragMoved = false;
    document.removeEventListener("mousemove", this._boundDrag);
    document.removeEventListener("mouseup", this._boundStopDrag);
    document.removeEventListener("touchmove", this._boundDrag);
    document.removeEventListener("touchend", this._boundStopDrag);
    document.removeEventListener("touchcancel", this._boundStopDrag);
  }
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
      mainContent.innerHTML = '<div class="glass-card" style="padding:2rem;text-align:center;"><h3 style="color:#ef4444;">Lỗi khởi tạo ứng dụng</h3><p style="color:var(--text-muted);">Vui lòng tải lại trang hoặc liên hệ hỗ trợ.</p><button class="btn btn-primary" onclick="location.reload()">Tải lại trang</button></div>';
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
