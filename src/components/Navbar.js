window.Navbar = {
  _mobileBound: false,
  _expandedSubmenus: { learn: false, tools: false },
  _resizeTimeout: null,

  toggleSubmenu: function (view) {
    if (AppState.currentView === view) {
      this._expandedSubmenus[view] = !this._expandedSubmenus[view];
    } else {
      this._expandedSubmenus[view] = true;
      App.navigate(view);
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
        '  <span class="mobile-topbar-title">miumiuiuem</span>' +
        "</div>" +
        '<div class="mobile-topbar-actions">' +
        '  <span style="font-size:0.75rem;color:var(--text-muted);display:flex;align-items:center;gap:0.35rem;"><span id="mobile-streak-value">' +
        AppState.streak +
        '</span> 🔥 &nbsp; <span id="mobile-xp-value">' +
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

    var vstepSection = AppState.currentView === "vstep";
    var thithuSection = AppState.currentView === "thithu";
    var learnSection = AppState.currentView === "learn";

    var html = '';

    // === LOGO ===
    html += '<div class="logo-section">';
    html += '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">';
    html += '<path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26C9.37 28 4 22.63 4 16S9.37 4 16 4s12 5.37 12 12-5.37 12-12 12z"/>';
    html += '<path d="M16 8c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>';
    html += '<circle cx="16" cy="16" r="3"/>';
    html += '</svg>';
    html += '<span class="logo-title">miumiuiuem</span>';
    html += '</div>';

    // === NAV LINKS ===
    html += '<nav class="nav-links" role="navigation" aria-label="Điều hướng chính">';

    // --- Dashboard ---
    html += '<button id="nav-dashboard" class="nav-item" onclick="App.navigate(\'dashboard\')" aria-label="Trang chủ">';
    html += '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>';
    html += '<span>Trang chủ</span>';
    html += '</button>';

    // === HỌC TẬP (merged: Learn + VSTEP + Thi thử) ===
    html += '<button id="nav-learn" class="nav-item" onclick="Navbar.toggleSubmenu(\'learn\')" aria-label="Học tập">';
    html += '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>';
    html += '<span>Học tập</span>';
    html += '<svg class="nav-arrow" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>';
    html += '</button>';

    html += '<div class="nav-submenu ' + (learnSection ? 'expanded' : '') + '" id="learn-submenu">';

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
      { key: 'roadmap', icon: '📋', label: 'Lộ trình' },
      { key: 'reading', icon: '📖', label: 'Đọc' },
      { key: 'listening', icon: '🎧', label: 'Nghe' },
      { key: 'writing', icon: '✍️', label: 'Viết' },
      { key: 'speaking', icon: '🎤', label: 'Nói' }
    ];
    for (var i = 0; i < vstepSkills.length; i++) {
      var sk = vstepSkills[i];
      var skActive = vstepSection && VstepView && VstepView.currentSection === sk.key;
      var skOnclick = "if(AppState.currentView!=='vstep'){App.navigate('vstep');setTimeout(function(){VstepView.setSection('" + sk.key + "')},350)}else{VstepView.setSection('" + sk.key + "')}";
      html += '<button class="nav-subitem' + (skActive ? ' active' : '') + '" onclick="' + skOnclick + '" data-section="' + sk.key + '">';
      html += '<span class="nav-icon-emoji">' + sk.icon + '</span>';
      html += '<span>' + sk.label + '</span>';
      html += '</button>';
    }

    // -- VSTEP Resources --
    html += '<div class="nav-divider"></div>';
    html += '<span class="nav-group-label">Tài liệu VSTEP</span>';

    var vstepResources = [
      { key: 'vstepVocab', icon: '🔤', label: 'Từ vựng VSTEP' },
      { key: 'essayVocab', icon: '📝', label: 'Essay Vocabulary' },
      { key: 'khac', icon: '📁', label: 'Khác' }
    ];
    for (var j = 0; j < vstepResources.length; j++) {
      var res = vstepResources[j];
      var resActive = vstepSection && VstepView && VstepView.currentSection === res.key;
      var resOnclick = "if(AppState.currentView!=='vstep'){App.navigate('vstep');setTimeout(function(){VstepView.setSection('" + res.key + "')},350)}else{VstepView.setSection('" + res.key + "')}";
      html += '<button class="nav-subitem' + (resActive ? ' active' : '') + '" onclick="' + resOnclick + '" data-section="' + res.key + '">';
      html += '<span class="nav-icon-emoji">' + res.icon + '</span>';
      html += '<span>' + res.label + '</span>';
      html += '</button>';
    }

    // -- Thi thử --
    html += '<div class="nav-divider"></div>';
    html += '<span class="nav-group-label">Thi thử</span>';

    var schoolOnclick = "if(typeof ThithuView==='undefined')return; if(AppState.currentView!=='thithu'){App.navigate('thithu', function(){ThithuView.setCategory('school');});}else{ThithuView.setCategory('school');}";
    html += '<button class="nav-subitem' + (thithuSection && ThithuView && ThithuView.currentCategory === 'school' ? ' active' : '') + '" onclick="' + schoolOnclick + '" data-category="school">';
    html += '<span class="nav-icon-emoji">🏫</span>';
    html += '<span>Đề thi thử các trường</span>';
    html += '</button>';

    var bookOnclick = "if(typeof ThithuView==='undefined')return; if(AppState.currentView!=='thithu'){App.navigate('thithu', function(){ThithuView.setCategory('book');});}else{ThithuView.setCategory('book');}";
    html += '<button class="nav-subitem' + (thithuSection && ThithuView && ThithuView.currentCategory === 'book' ? ' active' : '') + '" onclick="' + bookOnclick + '" data-category="book">';
    html += '<span class="nav-icon-emoji">📚</span>';
    html += '<span>Đề 7 test theo sách</span>';
    html += '</button>';

    var writingOnclick = "if(typeof ThithuView==='undefined')return; if(AppState.currentView!=='thithu'){App.navigate('thithu', function(){ThithuView.setCategory('writing');});}else{ThithuView.setCategory('writing');}";
    html += '<button class="nav-subitem' + (thithuSection && ThithuView && ThithuView.currentCategory === 'writing' ? ' active' : '') + '" onclick="' + writingOnclick + '" data-category="writing">';
    html += '<span class="nav-icon-emoji">✍️</span>';
    html += '<span>TEST WRITING</span>';
    html += '</button>';

    html += '</div>'; // end learn-submenu

    // === CÔNG CỤ (Tools: Translator + Notes) ===
    html += '<button id="nav-tools" class="nav-item" onclick="Navbar.toggleSubmenu(\'tools\')" aria-label="Công cụ">';
    html += '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3h7zM7 9H4V5h3v4zm10 6h3v4h-3v-4zm0-10h3v4h-3V5z"/></svg>';
    html += '<span>Công cụ</span>';
    html += '<svg class="nav-arrow" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>';
    html += '</button>';

    html += '<div class="nav-submenu ' + (this._expandedSubmenus.tools ? 'expanded' : '') + '" id="tools-submenu">';

    html += '<button id="nav-translator" class="nav-subitem" onclick="App.navigate(\'translator\')" aria-label="Dịch thuật">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>';
    html += '<span>Dịch thuật</span>';
    html += '</button>';

    html += '<button id="nav-notes" class="nav-subitem" onclick="App.navigate(\'notes\')" aria-label="Ghi chú">';
    html += '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h7v-2H6V4h12v8h2V4c0-1.1-.9-2-2-2zm0 12l-4 4h4v-4zM16 6H8v2h8V6zm0 4H8v2h8v-2zm4 4v6h-4l6-6z"/></svg>';
    html += '<span>Ghi chú</span>';
    html += '</button>';

    html += '</div>'; // end tools-submenu

    // === CÀI ĐẶT ===
    html += '<button id="nav-settings" class="nav-item" onclick="App.navigate(\'settings\')" aria-label="Cài đặt">';
    html += '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>';
    html += '<span>Cài đặt</span>';
    html += '</button>';

    html += '</nav>'; // end nav-links

    // === USER STATUS ===
    html += '<div class="user-status-section">';
    html += '<div class="streak-counter" title="Chuỗi ngày học">';
    html += '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M13.5 .67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>';
    html += '<span>🔥 <span id="streak-value">' + AppState.streak + '</span> ngày</span>';
    html += '</div>';
    html += '<div class="xp-counter" title="Điểm kinh nghiệm (XP)">';
    html += '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
    html += '<span>⭐ <span id="xp-value">' + App.formatNumber(AppState.xp) + '</span> XP</span>';
    html += '</div>';
    html += '</div>';

    navbarEl.innerHTML = html;
    this._ensureMobileChrome();
  },

  update: function () {
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

    // Update submenu expanded states
    var learnExpanded = activeView === "learn" || activeView === "vstep" || activeView === "thithu";
    var toolsExpanded = this._expandedSubmenus.tools || activeView === "translator" || activeView === "notes";

    var learnSubmenu = document.getElementById("learn-submenu");
    if (learnSubmenu) {
      if (learnExpanded) learnSubmenu.classList.add("expanded");
      else learnSubmenu.classList.remove("expanded");
    }

    var toolsSubmenu = document.getElementById("tools-submenu");
    if (toolsSubmenu) {
      if (toolsExpanded) toolsSubmenu.classList.add("expanded");
      else toolsSubmenu.classList.remove("expanded");
    }

    // Update nav-arrow rotation
    var learnNav = document.getElementById("nav-learn");
    if (learnNav) {
      if (learnExpanded) learnNav.classList.add("active");
      else learnNav.classList.remove("active");
    }
    var toolsNav = document.getElementById("nav-tools");
    if (toolsNav) {
      if (toolsExpanded) toolsNav.classList.add("active");
      else toolsNav.classList.remove("active");
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
  }
};
