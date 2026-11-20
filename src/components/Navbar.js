window.Navbar = {
  _mobileBound: false,
  _resizeBound: false,
  _stateLoaded: false,
  _expandedSubmenus: { learn: false, tools: false },
  _lastSeedView: null,
  _resizeTimeout: null,

  // Clamp for the drag-to-resize handle (desktop only, px).
  NAV_WIDTH_MIN: 200,
  NAV_WIDTH_MAX: 420,
  NAV_WIDTH_DEFAULT: 240,

  // ======================================================================
  // SUBMENU EXPAND — _expandedSubmenus is the SINGLE source of truth.
  // render() and update() both read it; nothing derives expansion from the
  // current view any more (that split state is what used to desync the two
  // submenus and made the "Học toggle" a dead click).
  // ======================================================================
  _groupOf: function (view) {
    if (view === "learn" || view === "vstep" || view === "thithu") return "learn";
    if (view === "translator" || view === "notes") return "tools";
    return null;
  },

  _loadExpandState: function () {
    if (this._stateLoaded) return;
    this._stateLoaded = true;
    try {
      var raw = localStorage.getItem("vstep_nav_expand");
      if (raw) {
        var saved = JSON.parse(raw);
        if (saved && typeof saved === "object") {
          this._expandedSubmenus.learn = !!saved.learn;
          this._expandedSubmenus.tools = !!saved.tools;
        }
      }
    } catch (e) {
      // Corrupted or unavailable storage: keep the defaults.
    }
  },

  _saveExpandState: function () {
    try {
      localStorage.setItem("vstep_nav_expand", JSON.stringify(this._expandedSubmenus));
    } catch (e) {
      // Quota/private mode: state still works for this session.
    }
  },

  // Entering a section opens its submenu so the active item is always visible.
  // Only runs on a REAL view change, so collapsing while staying on the same
  // view sticks (the old code re-derived this on every update() call).
  _syncExpandWithView: function () {
    var view = AppState.currentView;
    if (view === this._lastSeedView) return;
    this._lastSeedView = view;
    var group = this._groupOf(view);
    if (group) this._expandedSubmenus[group] = true;
  },

  toggleSubmenu: function (group) {
    if (group !== "learn" && group !== "tools") return;
    // ALWAYS flip: a header click must be able to close the submenu from any
    // view. (The first draft forced it open when outside the group, which made
    // an open submenu impossible to dismiss from the dashboard.)
    this._expandedSubmenus[group] = !this._expandedSubmenus[group];
    this._saveExpandState();

    var opened = this._expandedSubmenus[group];
    if (opened && group === "learn" && this._groupOf(AppState.currentView) !== "learn") {
      // "Học tập" just opened from outside its section: land on its default
      // view (the historical behaviour). "Công cụ" has NO view of its own —
      // the old code called App.navigate('tools') here, which broke the shell
      // (unknown view: stale content, no active nav item) — so it only opens.
      App.navigate("learn");
    }
    this.update();
  },

  _ensureMobileChrome: function () {
    if (!document.getElementById("mobile-topbar")) {
      var topbar = document.createElement("div");
      topbar.id = "mobile-topbar";
      topbar.className = "mobile-topbar";
      topbar.innerHTML =
        '<div class="mobile-topbar-left">' +
        '  <button class="mobile-menu-btn" type="button" aria-label="Mở menu" onclick="Navbar.toggleMobile()">' +
        '    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
        "  </button>" +
        '  <span class="mobile-topbar-mark" aria-hidden="true">' +
        '    <svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26C9.37 28 4 22.63 4 16S9.37 4 16 4s12 5.37 12 12-5.37 12-12 12z"/><path d="M16 8c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><circle cx="16" cy="16" r="3"/></svg>' +
        "  </span>" +
        '  <span class="mobile-topbar-title">miumiuiuem</span>' +
        "</div>" +
        '<div class="mobile-topbar-actions">' +
        '  <span class="mobile-stat" title="Chuỗi ngày học"><span id="mobile-streak-value">' +
        AppState.streak +
        "</span></span>" +
        '  <span class="mobile-stat" title="Điểm kinh nghiệm"><span id="mobile-xp-value">' +
        App.formatNumber(AppState.xp) +
        "</span> XP</span>" +
        "</div>";
      document.body.appendChild(topbar);
    }
    if (!document.getElementById("mobile-overlay")) {
      var overlay = document.createElement("div");
      overlay.id = "mobile-overlay";
      overlay.className = "mobile-overlay";
      overlay.setAttribute("aria-hidden", "true");
      overlay.addEventListener("click", function () {
        Navbar.closeMobile();
      });
      document.body.appendChild(overlay);
    }
    if (!this._mobileBound) {
      this._mobileBound = true;
      window.addEventListener("resize", function () {
        if (Navbar._resizeTimeout) clearTimeout(Navbar._resizeTimeout);
        Navbar._resizeTimeout = setTimeout(function () {
          var nav = document.getElementById("navbar");
          if (!nav) return;
          if (window.innerWidth > 1024) {
            Navbar.closeMobile();
            nav.classList.remove("mobile-hidden");
          } else {
            nav.classList.remove("open");
          }
        }, 250);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") Navbar.closeMobile();
      });
      document.addEventListener("click", function (e) {
        // Robust fallback for the two Thi thử category buttons. It works even if
        // an older cached HTML version has a broken inline onclick handler.
        var categoryTarget = e.target.closest && e.target.closest('.nav-subitem[data-category]');
        if (categoryTarget) {
          var category = categoryTarget.getAttribute('data-category');
          if (category && typeof ThithuView !== 'undefined') {
            e.preventDefault();
            e.stopPropagation();
            if (AppState.currentView !== 'thithu') {
              App.navigate('thithu', function () { ThithuView.setCategory(category); });
            } else {
              ThithuView.setCategory(category);
            }
            if (window.innerWidth <= 1024) setTimeout(function () { Navbar.closeMobile(); }, 80);
            return;
          }
        }

        if (window.innerWidth > 1024) return;
        var nav = document.getElementById("navbar");
        if (!nav || !nav.classList.contains("open")) return;
        var target = e.target.closest(".nav-item, .nav-subitem");
        if (target && nav.contains(target)) {
          setTimeout(function () { Navbar.closeMobile(); }, 80);
        }
      });
    }
  },

  toggleMobile: function () {
    var nav = document.getElementById("navbar");
    if (!nav) return;
    if (nav.classList.contains("open")) this.closeMobile();
    else this.openMobile();
  },

  openMobile: function () {
    var nav = document.getElementById("navbar");
    var overlay = document.getElementById("mobile-overlay");
    if (nav) nav.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = window.innerWidth <= 1024 ? "hidden" : "";
    var btn = document.querySelector(".mobile-menu-btn");
    if (btn) btn.setAttribute("aria-label", "Đóng menu");
  },

  closeMobile: function () {
    var nav = document.getElementById("navbar");
    var overlay = document.getElementById("mobile-overlay");
    if (nav) nav.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
    var btn = document.querySelector(".mobile-menu-btn");
    if (btn) btn.setAttribute("aria-label", "Mở menu");
  },

  render: function () {
    var navbarEl = document.getElementById("navbar");
    if (!navbarEl) return;

    this._loadExpandState();
    this._syncExpandWithView();

    var vstepSection = AppState.currentView === "vstep";
    var thithuSection = AppState.currentView === "thithu";
    var learnSection = AppState.currentView === "learn";

    var html = '';

    // === LOGO ===
    html += '<div class="logo-section">';
    html += '<span class="logo-mark" aria-hidden="true">';
    html += '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">';
    html += '<path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26C9.37 28 4 22.63 4 16S9.37 4 16 4s12 5.37 12 12-5.37 12-12 12z"/>';
    html += '<path d="M16 8c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>';
    html += '<circle cx="16" cy="16" r="3"/>';
    html += '</svg>';
    html += '</span>';
    html += '<span class="logo-text">';
    html += '<span class="logo-title">miumiuiuem</span>';
    html += '<span class="logo-sub">Học ngoại ngữ · VSTEP</span>';
    html += '</span>';
    html += '</div>';

    // === NAV LINKS ===
    html += '<nav class="nav-links" role="navigation" aria-label="Điều hướng chính">';

    // --- Dashboard ---
    html += '<button id="nav-dashboard" class="nav-item" onclick="App.navigate(\'dashboard\')" aria-label="Trang chủ">';
    html += '<span class="nav-ico" aria-hidden="true"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg></span>';
    html += '<span>Trang chủ</span>';
    html += '</button>';

    // === HỌC TẬP (merged: Learn + VSTEP + Thi thử) ===
    html += '<button id="nav-learn" class="nav-item' + (this._expandedSubmenus.learn ? " expanded" : "") + '" onclick="Navbar.toggleSubmenu(\'learn\')" aria-label="Học tập" aria-controls="learn-submenu" aria-expanded="' + (this._expandedSubmenus.learn ? "true" : "false") + '">';
    html += '<span class="nav-ico" aria-hidden="true"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg></span>';
    html += '<span>Học tập</span>';
    html += '<svg class="nav-arrow" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>';
    html += '</button>';

    html += '<div class="nav-submenu ' + (this._expandedSubmenus.learn ? 'expanded' : '') + '" id="learn-submenu">';
    html += '<div class="nav-submenu-inner">';

    // -- Học tập basics --
    var vocabOnclick = "if(AppState.currentView!=='learn'){App.navigate('learn');setTimeout(function(){LearnView.setSection('vocab-grammar')},350)}else{LearnView.setSection('vocab-grammar')}";
    html += '<button class="nav-subitem' + (learnSection && LearnView && LearnView.currentSection === 'vocab-grammar' ? ' active' : '') + '" onclick="' + vocabOnclick + '" data-section="vocab-grammar">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>';
    html += '<span>Từ vựng & Ngữ pháp</span>';
    html += '</button>';

    var planOnclick = "if(AppState.currentView!=='learn'){App.navigate('learn');setTimeout(function(){LearnView.setSection('plan')},350)}else{LearnView.setSection('plan')}";
    html += '<button class="nav-subitem' + (learnSection && LearnView && LearnView.currentSection === 'plan' ? ' active' : '') + '" onclick="' + planOnclick + '" data-section="plan">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>';
    html += '<span>Kế hoạch học tập</span>';
    html += '</button>';

    // -- VSTEP Skills --
    html += '<div class="nav-divider"></div>';
    html += '<span class="nav-group-label">Luyện thi VSTEP</span>';

    var vstepSkills = [
      { key: 'roadmap', label: 'Lộ trình' },
      { key: 'reading', label: 'Đọc' },
      { key: 'listening', label: 'Nghe' },
      { key: 'writing', label: 'Viết' },
      { key: 'speaking', label: 'Nói' }
    ];
    var skillIcons = {
      roadmap: 'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z',
      reading: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
      listening: 'M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z',
      writing: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
      speaking: 'M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z'
    };
    for (var i = 0; i < vstepSkills.length; i++) {
      var sk = vstepSkills[i];
      var skActive = vstepSection && VstepView && VstepView.currentSection === sk.key;
      var skOnclick = "if(AppState.currentView!=='vstep'){App.navigate('vstep');setTimeout(function(){VstepView.setSection('" + sk.key + "')},350)}else{VstepView.setSection('" + sk.key + "')}";
      html += '<button class="nav-subitem' + (skActive ? ' active' : '') + '" onclick="' + skOnclick + '" data-section="' + sk.key + '">';
      html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="' + skillIcons[sk.key] + '"/></svg>';
      html += '<span>' + sk.label + '</span>';
      html += '</button>';
    }

    // -- VSTEP Resources --
    html += '<div class="nav-divider"></div>';
    html += '<span class="nav-group-label">Tài liệu VSTEP</span>';

    var vstepResources = [
      { key: 'vstepVocab', label: 'Từ vựng VSTEP' },
      { key: 'essayVocab', label: 'Essay Vocabulary' },
      { key: 'khac', label: 'Khác' }
    ];
    var resourceIcons = {
      vstepVocab: 'M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 .83-.67 1.5-1.5 1.5S12 13.33 12 12.5s.67-1.5 1.5-1.5c.23 0 .45.05.65.14V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z',
      essayVocab: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
      khac: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z'
    };
    for (var j = 0; j < vstepResources.length; j++) {
      var res = vstepResources[j];
      var resActive = vstepSection && VstepView && VstepView.currentSection === res.key;
      var resOnclick = "if(AppState.currentView!=='vstep'){App.navigate('vstep');setTimeout(function(){VstepView.setSection('" + res.key + "')},350)}else{VstepView.setSection('" + res.key + "')}";
      html += '<button class="nav-subitem' + (resActive ? ' active' : '') + '" onclick="' + resOnclick + '" data-section="' + res.key + '">';
      html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="' + resourceIcons[res.key] + '"/></svg>';
      html += '<span>' + res.label + '</span>';
      html += '</button>';
    }

    // -- Thi thử --
    html += '<div class="nav-divider"></div>';
    html += '<span class="nav-group-label">Thi thử</span>';

    var schoolOnclick = "if(typeof ThithuView==='undefined')return; if(AppState.currentView!=='thithu'){App.navigate('thithu', function(){ThithuView.setCategory('school');});}else{ThithuView.setCategory('school');}";
    html += '<button class="nav-subitem' + (thithuSection && ThithuView && ThithuView.currentCategory === 'school' ? ' active' : '') + '" onclick="' + schoolOnclick + '" data-category="school">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>';
    html += '<span>Đề thi thử các trường</span>';
    html += '</button>';

    var bookOnclick = "if(typeof ThithuView==='undefined')return; if(AppState.currentView!=='thithu'){App.navigate('thithu', function(){ThithuView.setCategory('book');});}else{ThithuView.setCategory('book');}";
    html += '<button class="nav-subitem' + (thithuSection && ThithuView && ThithuView.currentCategory === 'book' ? ' active' : '') + '" onclick="' + bookOnclick + '" data-category="book">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-2 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>';
    html += '<span>Đề 7 test theo sách</span>';
    html += '</button>';

    var writingOnclick = "if(typeof ThithuView==='undefined')return; if(AppState.currentView!=='thithu'){App.navigate('thithu', function(){ThithuView.setCategory('writing');});}else{ThithuView.setCategory('writing');}";
    html += '<button class="nav-subitem' + (thithuSection && ThithuView && ThithuView.currentCategory === 'writing' ? ' active' : '') + '" onclick="' + writingOnclick + '" data-category="writing">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
    html += '<span>TEST WRITING</span>';
    html += '</button>';

    html += '</div>'; // end nav-submenu-inner
    html += '</div>'; // end learn-submenu

    // === CÔNG CỤ (Tools: Translator + Notes) ===
    html += '<button id="nav-tools" class="nav-item' + (this._expandedSubmenus.tools ? " expanded" : "") + '" onclick="Navbar.toggleSubmenu(\'tools\')" aria-label="Công cụ" aria-controls="tools-submenu" aria-expanded="' + (this._expandedSubmenus.tools ? "true" : "false") + '">';
    html += '<span class="nav-ico" aria-hidden="true"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3h7zM7 9H4V5h3v4zm10 6h3v4h-3v-4zm0-10h3v4h-3V5z"/></svg></span>';
    html += '<span>Công cụ</span>';
    html += '<svg class="nav-arrow" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>';
    html += '</button>';

    html += '<div class="nav-submenu ' + (this._expandedSubmenus.tools ? 'expanded' : '') + '" id="tools-submenu">';
    html += '<div class="nav-submenu-inner">';

    html += '<button id="nav-translator" class="nav-subitem" onclick="App.navigate(\'translator\')" aria-label="Dịch thuật">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>';
    html += '<span>Dịch thuật</span>';
    html += '</button>';

    html += '<button id="nav-notes" class="nav-subitem" onclick="App.navigate(\'notes\')" aria-label="Ghi chú">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h7v-2H6V4h12v8h2V4c0-1.1-.9-2-2-2zm0 12l-4 4h4v-4zM16 6H8v2h8V6zm0 4H8v2h8v-2zm4 4v6h-4l6-6z"/></svg>';
    html += '<span>Ghi chú</span>';
    html += '</button>';

    html += '</div>'; // end nav-submenu-inner
    html += '</div>'; // end tools-submenu

    // === CÀI ĐẶT ===
    html += '<button id="nav-settings" class="nav-item" onclick="App.navigate(\'settings\')" aria-label="Cài đặt">';
    html += '<span class="nav-ico" aria-hidden="true"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg></span>';
    html += '<span>Cài đặt</span>';
    html += '</button>';

    html += '</nav>'; // end nav-links

    // === USER STATUS ===
    html += '<div class="user-status-section">';
    html += '<div class="streak-counter" title="Chuỗi ngày học">';
    html += '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M13.5 .67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>';
    html += '<span><span id="streak-value">' + AppState.streak + '</span> ngày học</span>';
    html += '</div>';
    html += '<div class="xp-counter" title="Điểm kinh nghiệm (XP)">';
    html += '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
    html += '<span><span id="xp-value">' + App.formatNumber(AppState.xp) + '</span> XP</span>';
    html += '</div>';
    html += '</div>';

    navbarEl.innerHTML = html;
    this._ensureMobileChrome();
    this._ensureResizeHandle();
  },

  update: function () {
    this._loadExpandState();
    this._syncExpandWithView();

    // Update counters
    var streakEl = document.getElementById("streak-value");
    var xpEl = document.getElementById("xp-value");
    if (streakEl) streakEl.textContent = AppState.streak;
    if (xpEl) xpEl.textContent = App.formatNumber(AppState.xp);
    var mStreak = document.getElementById("mobile-streak-value");
    var mXp = document.getElementById("mobile-xp-value");
    if (mStreak) mStreak.textContent = AppState.streak;
    if (mXp) mXp.textContent = App.formatNumber(AppState.xp);

    // Update nav-item active states
    document.querySelectorAll(".nav-item").forEach(function (el) {
      el.classList.remove("active");
    });

    // Determine which top-level nav is active
    var activeView = AppState.currentView;
    var topNavId = null;
    if (activeView === "dashboard") topNavId = "nav-dashboard";
    else if (activeView === "learn" || activeView === "vstep" || activeView === "thithu") topNavId = "nav-learn";
    else if (activeView === "translator" || activeView === "notes") topNavId = "nav-tools";
    else if (activeView === "settings") topNavId = "nav-settings";

    if (topNavId) {
      var el = document.getElementById(topNavId);
      if (el) el.classList.add("active");
    }

    // Update submenu expanded states — read ONLY from _expandedSubmenus
    // (single source of truth, see toggleSubmenu).
    var learnExpanded = this._expandedSubmenus.learn;
    var toolsExpanded = this._expandedSubmenus.tools;

    var learnSubmenu = document.getElementById("learn-submenu");
    if (learnSubmenu) learnSubmenu.classList.toggle("expanded", learnExpanded);

    var toolsSubmenu = document.getElementById("tools-submenu");
    if (toolsSubmenu) toolsSubmenu.classList.toggle("expanded", toolsExpanded);

    // Open/closed class + aria on the group headers. NOTE: .active stays the
    // "you are here" flag (set above via topNavId) and is NOT touched here.
    var learnNav = document.getElementById("nav-learn");
    if (learnNav) {
      learnNav.classList.toggle("expanded", learnExpanded);
      learnNav.setAttribute("aria-expanded", learnExpanded ? "true" : "false");
    }
    var toolsNav = document.getElementById("nav-tools");
    if (toolsNav) {
      toolsNav.classList.toggle("expanded", toolsExpanded);
      toolsNav.setAttribute("aria-expanded", toolsExpanded ? "true" : "false");
    }

    // Update subitem active states
    document.querySelectorAll(".nav-subitem").forEach(function (el) {
      el.classList.remove("active");
    });

    if (activeView === "vstep" && typeof VstepView !== "undefined") {
      var activeSection = VstepView.currentSection;
      var activeSubitem = document.querySelector('.nav-subitem[data-section="' + activeSection + '"]');
      if (activeSubitem) activeSubitem.classList.add("active");
    }

    if (activeView === "learn" && typeof LearnView !== "undefined") {
      var activeLearnSection = LearnView.currentSection;
      var activeLearnSubitem = document.querySelector('.nav-subitem[data-section="' + activeLearnSection + '"]');
      if (activeLearnSubitem) activeLearnSubitem.classList.add("active");
    }

    if (activeView === "thithu" && typeof ThithuView !== "undefined") {
      var activeCategory = ThithuView.currentCategory;
      var activeThithuSubitem = document.querySelector('.nav-subitem[data-category="' + activeCategory + '"]');
      if (activeThithuSubitem) activeThithuSubitem.classList.add("active");
    }

    if (activeView === "translator") {
      var translatorItem = document.getElementById("nav-translator");
      if (translatorItem) translatorItem.classList.add("active");
    }
    if (activeView === "notes") {
      var notesItem = document.getElementById("nav-notes");
      if (notesItem) notesItem.classList.add("active");
    }
  },

  // ======================================================================
  // DRAG-TO-RESIZE — a fixed handle on <body> (never inside .navbar, whose
  // overflow-y:auto would clip it). It writes --navbar-width, the same var
  // used by .navbar and the layout grid, so every pane moves together.
  // Disabled <=1023px where the navbar is an overlay drawer.
  // ======================================================================
  _ensureResizeHandle: function () {
    var handle = document.getElementById("navbar-resize-handle");
    if (!handle) {
      handle = document.createElement("div");
      handle.id = "navbar-resize-handle";
      handle.className = "navbar-resize-handle";
      handle.setAttribute("role", "separator");
      handle.setAttribute("tabindex", "0");
      handle.setAttribute("aria-orientation", "vertical");
      handle.setAttribute("aria-controls", "navbar");
      handle.setAttribute("aria-label", "Kéo để đổi chiều rộng thanh điều hướng");
      handle.setAttribute("aria-valuemin", String(this.NAV_WIDTH_MIN));
      handle.setAttribute("aria-valuemax", String(this.NAV_WIDTH_MAX));
      handle.title = "Kéo để đổi chiều rộng · nhấp đúp để về mặc định";
      handle.setAttribute("aria-valuenow", String(this._getNavWidth()));
      document.body.appendChild(handle);
    }
    this._bindResizeHandle(handle);
  },

  _getNavWidth: function () {
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--navbar-width");
    var w = parseInt(raw, 10);
    if (!w) w = this.NAV_WIDTH_DEFAULT;
    return Math.min(this.NAV_WIDTH_MAX, Math.max(this.NAV_WIDTH_MIN, w));
  },

  _setNavWidth: function (w, persist) {
    w = Math.min(this.NAV_WIDTH_MAX, Math.max(this.NAV_WIDTH_MIN, Math.round(w)));
    document.documentElement.style.setProperty("--navbar-width", w + "px");
    var handle = document.getElementById("navbar-resize-handle");
    if (handle) handle.setAttribute("aria-valuenow", String(w));
    if (persist) {
      try {
        localStorage.setItem("vstep_nav_width", String(w));
      } catch (e) { /* private mode: width still applies for this session */ }
    }
    return w;
  },

  _bindResizeHandle: function (handle) {
    if (this._resizeBound) return;
    this._resizeBound = true;
    var self = this;
    var dragging = false;
    var startX = 0;
    var startWidth = 0;
    var lastWidth = this._getNavWidth();
    var rafId = null;

    // Coalesce pointer moves to one style write per frame.
    var applyLive = function (w) {
      lastWidth = w;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(function () {
        rafId = null;
        self._setNavWidth(lastWidth, false);
      });
    };

    handle.addEventListener("pointerdown", function (e) {
      if (window.innerWidth <= 1024) return; // drawer mode: nothing to resize
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startWidth = self._getNavWidth();
      lastWidth = startWidth;
      handle.classList.add("dragging");
      document.body.classList.add("navbar-resizing");
      try { handle.setPointerCapture(e.pointerId); } catch (err) { /* synthetic event */ }
    });

    handle.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      applyLive(startWidth + (e.clientX - startX));
    });

    var endDrag = function (e) {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove("dragging");
      document.body.classList.remove("navbar-resizing");
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      try { handle.releasePointerCapture(e.pointerId); } catch (err) { /* synthetic event */ }
      self._setNavWidth(lastWidth, true);
    };
    handle.addEventListener("pointerup", endDrag);
    handle.addEventListener("pointercancel", endDrag);

    handle.addEventListener("dblclick", function () {
      self._setNavWidth(self.NAV_WIDTH_DEFAULT, true);
    });

    handle.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 24 : 8;
      if (e.key === "ArrowLeft") {
        self._setNavWidth(self._getNavWidth() - step, true);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        self._setNavWidth(self._getNavWidth() + step, true);
        e.preventDefault();
      } else if (e.key === "Home" || e.key === "Enter") {
        self._setNavWidth(self.NAV_WIDTH_DEFAULT, true);
        e.preventDefault();
      }
    });
  }
};
