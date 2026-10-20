window.LearnView = {
  currentSection: "vocab-grammar",
  activeMode: null,
  activeLesson: null,
  activeSectionId: null,
  vocabLevel: "all",
  vocabTopic: "all",
  vocabSavedOnly: false,
  flashcardIndex: 0,
  matchState: { cards: [], flipped: [], matched: [], lock: false },
  practiceState: { currentQuestion: 0, score: 0, answered: false, questions: [] },
  typingState: { items: [], current: 0, score: 0, answered: false },
  listenState: { items: [], current: 0, score: 0, answered: false },
  shuffleState: { items: [], current: 0, score: 0, answered: false, picked: [] },
  lessonHighlights: {}, // Store highlights for each lesson
  _noteBubbleButtonAdded: false, // Track if button has been added
  
  // Highlight labels and effects (matching writing section)
  HL_LABELS: {
    "important": { icon: "⭐", text: "Quan trọng" },
    "fix": { icon: "✏️", text: "Cần sửa" },
    "good": { icon: "💡", text: "Ý hay" },
    "remember": { icon: "📌", text: "Cần nhớ" },
    "new": { icon: "🔤", text: "Từ mới" },
    "missing": { icon: "❗", text: "Thiếu ý" }
  },

  HL_EFFECTS: {
    "flash": "✨ Nhấp nháy",
    "dots": "⣿ Viền chấm"
  },

  // ===================== COLLAPSIBLE SECTIONS =====================
  
  toggleSection: function(headerElement) {
    var section = headerElement.closest('.collapsible-section');
    if (!section) return;
    
    var isExpanded = section.classList.contains('expanded');
    
    // Toggle current section
    if (isExpanded) {
      section.classList.remove('expanded');
    } else {
      section.classList.add('expanded');
    }
  },

  getCategoryColor: function(category) {
    var colors = {
      'speaking': { bg: 'rgba(46, 204, 113, 0.15)', text: '#2ECC71' },
      'reading': { bg: 'rgba(102, 94, 224, 0.15)', text: '#665EE0' },
      'listening': { bg: 'rgba(138, 99, 210, 0.15)', text: '#8A63D2' },
      'writing': { bg: 'rgba(245, 176, 65, 0.15)', text: '#F5B041' }
    };
    return colors[category.toLowerCase()] || { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' };
  },

  // ===================== STATE MANAGEMENT =====================

  saveLearnState: function (mode) {
    if (!mode) mode = this.activeMode;
    if (!mode) return;
    
    try {
      var state = {};
      switch (mode) {
        case "flashcard":
          state = { flashcardIndex: this.flashcardIndex };
          break;
        case "match":
          state = { matchState: this.matchState };
          break;
        case "quiz":
          state = { practiceState: this.practiceState };
          break;
        case "typing":
          state = { typingState: this.typingState };
          break;
        case "listening":
          state = { listenState: this.listenState };
          break;
        case "shuffle":
          state = { shuffleState: this.shuffleState };
          break;
        default:
          return;
      }
      localStorage.setItem("vstep_learn_state_" + mode, JSON.stringify(state));
    } catch (e) {
      console.error("Error saving Learn state for mode " + mode + ":", e);
    }
  },

  loadLearnState: function (mode) {
    if (!mode) return;
    
    try {
      var saved = localStorage.getItem("vstep_learn_state_" + mode);
      if (saved) {
        var state = JSON.parse(saved);
        switch (mode) {
          case "flashcard":
            if (state.flashcardIndex !== undefined) this.flashcardIndex = state.flashcardIndex;
            break;
          case "match":
            if (state.matchState) this.matchState = state.matchState;
            break;
          case "quiz":
            if (state.practiceState) this.practiceState = state.practiceState;
            break;
          case "typing":
            if (state.typingState) this.typingState = state.typingState;
            break;
          case "listening":
            if (state.listenState) this.listenState = state.listenState;
            break;
          case "shuffle":
            if (state.shuffleState) this.shuffleState = state.shuffleState;
            break;
        }
        return true;
      }
    } catch (e) {
      console.error("Error loading Learn state for mode " + mode + ":", e);
    }
    return false;
  },

  // ===================== LESSON HIGHLIGHT STATE =====================

  saveLessonHighlights: function(lessonId) {
    if (!lessonId) return;
    try {
      var highlights = this.lessonHighlights[lessonId] || [];
      localStorage.setItem("vstep_lesson_highlights_" + lessonId, JSON.stringify(highlights));
      console.log("Saved highlights for lesson " + lessonId + ":", highlights.length);
    } catch (e) {
      console.error("Error saving lesson highlights for " + lessonId + ":", e);
    }
  },

  loadLessonHighlights: function(lessonId) {
    if (!lessonId) return [];
    try {
      var saved = localStorage.getItem("vstep_lesson_highlights_" + lessonId);
      if (saved) {
        this.lessonHighlights[lessonId] = JSON.parse(saved);
        console.log("Loaded highlights for lesson " + lessonId + ":", this.lessonHighlights[lessonId].length);
        return this.lessonHighlights[lessonId];
      }
    } catch (e) {
      console.error("Error loading lesson highlights for " + lessonId + ":", e);
    }
    this.lessonHighlights[lessonId] = [];
    return [];
  },

  // ===================== LESSON HIGHLIGHT DRAG FUNCTIONALITY =====================

  // Begin tracking a potential drag-to-highlight on lesson content
  startLessonHighlight: function(e) {
    // Support both mouse and touch events
    if (e && e.button !== 0 && e.type !== 'touchstart') return;
    var t = e.target;
    while (t && t.nodeType === 3) t = t.parentNode;
    if (!t || !t.classList) return;
    var container = t.closest ? t.closest('.highlighted-essay') : null;
    if (!container) return;
    var self = this;
    
    // Get coordinates from either mouse or touch event
    var clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    var clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    // Drop any stale drag state + listener from a previous drag
    if (this._lessonHlOnUp) {
      document.removeEventListener('mouseup', this._lessonHlOnUp);
      document.removeEventListener('touchend', this._lessonHlOnUp);
      this._lessonHlOnUp = null;
    }
    
    this._lessonHlDrag = { container: container, startX: clientX, startY: clientY };
    var onUp = function(ue) {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
      self._lessonHlOnUp = null;
      if (ue && ue.button !== 0 && ue.type !== 'touchend') return;
      self._finishLessonHighlight(ue);
    };
    this._lessonHlOnUp = onUp;
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
  },

  // Calculate selection offsets in lesson content
  _lessonSelectionOffsets: function(container, startNode, startOffset, endNode, endOffset) {
    try {
      var walker = document.createTreeWalker(container, 4); // NodeFilter.SHOW_TEXT
      var texts = [];
      var acc = 0;
      var t;
      while ((t = walker.nextNode()) !== null) {
        texts.push({ node: t, base: acc });
        acc += t.data.length;
      }
      
      var posOf = function(boundaryNode, boundaryOffset) {
        if (boundaryNode.nodeType === 3) {
          for (var i = 0; i < texts.length; i++) {
            if (texts[i].node === boundaryNode) {
              return texts[i].base + Math.min(boundaryOffset, boundaryNode.data.length);
            }
          }
          return null;
        }
        if (boundaryNode.nodeType === 1) {
          var kids = boundaryNode.childNodes;
          var limit = Math.max(0, Math.min(boundaryOffset, kids.length));
          var beforeChild = limit < kids.length ? kids[limit] : null;
          var lastIdx = -1;
          for (var j = 0; j < texts.length; j++) {
            if (!beforeChild || (texts[j].node.compareDocumentPosition(beforeChild) & 2) !== 0) {
              lastIdx = j;
            } else {
              break;
            }
          }
          return lastIdx >= 0 ? texts[lastIdx].base + texts[lastIdx].node.data.length : 0;
        }
        return null;
      };
      
      var start = posOf(startNode, startOffset);
      var end = posOf(endNode, endOffset);
      if (start === null || end === null || start > end) return null;
      return { start: start, end: end };
    } catch (e) {
      console.error("_lessonSelectionOffsets error:", e);
      return null;
    }
  },

  // Finish lesson highlight on mouse up
  _finishLessonHighlight: function(e) {
    var drag = this._lessonHlDrag;
    this._lessonHlDrag = null;
    if (!drag) return;
    
    // Get coordinates from either mouse or touch event
    var clientX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
    var clientY = e.clientY || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0);
    
    // Check if it was a real drag (not just a click/tap)
    if (Math.abs(clientX - drag.startX) + Math.abs(clientY - drag.startY) < 8) return;

    var container = drag.container;
    if (!document.body || !document.body.contains(container)) return;

    var lessonId = container.getAttribute ? (container.getAttribute("data-lesson-id") || "") : "";
    if (!lessonId) return;

    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    var range = sel.getRangeAt(0);

    // Get the selected text
    var text = range.toString();
    if (!text || text.trim().length < 2) { sel.removeAllRanges(); return; }

    // Create highlight span and wrap the selection
    var id = 'lesson_hl_' + lessonId + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    var span = document.createElement('span');
    span.className = 'lesson-highlight writing-highlight user';
    span.id = id;
    span.setAttribute('onclick', "LearnView.showLessonNotePopup('" + id + "', event)");
    
    try {
      range.surroundContents(span);
    } catch (err) {
      // If surroundContents fails (selection crosses element boundaries), use alternative method
      sel.removeAllRanges();
      this.showToast('⚠️ Không thể highlight qua nhiều đoạn văn');
      return;
    }

    if (!this.lessonHighlights[lessonId]) this.lessonHighlights[lessonId] = [];
    
    this.lessonHighlights[lessonId].push({
      id: id,
      note: "",
      color: "", // Default purple
      label: "",
      effect: "",
      createdAt: Date.now(),
      original: text
    });
    
    sel.removeAllRanges();
    this.saveLessonHighlights(lessonId);
    // Update global notes bubble
    if (typeof NotesBubble !== 'undefined' && NotesBubble.refresh) {
      NotesBubble.refresh();
    }
    this.showToast('🟣 Đã tạo highlight – bấm vào để ghi chú');
  },

  // Render lesson content with highlights
  renderLessonContentWithHighlights: function(lessonId, content) {
    if (!lessonId || !content) return content;
    
    var highlights = this.lessonHighlights[lessonId] || [];
    if (highlights.length === 0) {
      // Still wrap in container for drag-to-highlight even if no highlights yet
      return '<div class="lesson-highlight-container highlighted-essay" data-lesson-id="' + lessonId + '" data-hl-region="lesson" onmousedown="LearnView.startLessonHighlight(event)">' + content + '</div>';
    }

    // For now, wrap the content in a highlightable container
    // The actual highlight rendering will be done when the content is displayed
    return '<div class="lesson-highlight-container highlighted-essay" data-lesson-id="' + lessonId + '" data-hl-region="lesson" onmousedown="LearnView.startLessonHighlight(event)">' + content + '</div>';
  },

  // Refresh lesson highlights display
  refreshLessonHighlights: function(lessonId) {
    if (!lessonId) return;
    
    var highlights = this.lessonHighlights[lessonId] || [];
    if (highlights.length === 0) {
      console.log("No highlights to refresh for lesson " + lessonId);
      return;
    }

    console.log("Refreshing highlights for lesson " + lessonId + ":", highlights.length);

    var colorHex = { purple: "#8b5cf6", pink: "#ec4899", blue: "#3b82f6", green: "#10b981", yellow: "#f59e0b", orange: "#f97316" };

    // Find all lesson highlight containers for this lesson
    var containers = document.querySelectorAll('.lesson-highlight-container[data-lesson-id="' + lessonId + '"]');
    if (containers.length === 0) {
      console.log("No containers found for lesson " + lessonId);
      return;
    }

    console.log("Found " + containers.length + " containers for lesson " + lessonId);

    // For each container, re-apply highlights by finding and wrapping text
    containers.forEach(function(container) {
      var containerHtml = container.innerHTML;
      
      highlights.forEach(function(hl) {
        if (!hl.original) return;
        
        // Escape the original text for regex
        var escapedText = hl.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp(escapedText, 'g');
        
        // Replace text with highlight span if not already highlighted
        var spanId = hl.id;
        var userCls = 'lesson-highlight writing-highlight user';
        if (hl.color && hl.color !== 'purple') userCls += ' u-' + hl.color;
        if (hl.effect) userCls += ' hl-effect-' + hl.effect;
        
        var chipAttr = '';
        if (hl.label) {
          var lb = LearnView.HL_LABELS[hl.label];
          if (lb && lb.text) chipAttr = ' data-hl-label-text="' + LearnView._escapeHtml(lb.icon + ' ' + lb.text) + '"';
        }
        
        var spanHtml = '<span class="' + userCls + '"' + chipAttr + ' id="' + spanId + '" onclick="LearnView.showLessonNotePopup(\'' + spanId + '\', event)">' + LearnView._escapeHtml(hl.original) + '</span>';
        
        // Only replace if the span doesn't already exist
        if (containerHtml.indexOf('id="' + spanId + '"') === -1) {
          containerHtml = containerHtml.replace(regex, spanHtml);
          console.log("Applied highlight for:", hl.original);
        }
      });
      
      container.innerHTML = containerHtml;
    });
    
    console.log("Finished refreshing highlights for lesson " + lessonId);
  },

  // Show note popup for lesson highlight
  showLessonNotePopup: function(hlId, event) {
    if (!hlId) return;
    if (event) event.stopPropagation();
    
    // Find the highlight data
    var highlightData = null;
    var lessonId = null;
    
    for (var lid in this.lessonHighlights) {
      var highlights = this.lessonHighlights[lid];
      for (var i = 0; i < highlights.length; i++) {
        if (highlights[i].id === hlId) {
          highlightData = highlights[i];
          lessonId = lid;
          break;
        }
      }
      if (highlightData) break;
    }
    
    if (!highlightData) return;

    // Create or update popup
    var popup = document.getElementById('lesson-note-popup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'lesson-note-popup';
      popup.className = 'note-popup';
      document.body.appendChild(popup);
    }

    // Build color swatches HTML
    var colors = ['purple', 'pink', 'blue', 'green', 'yellow', 'orange'];
    var colorSwatches = colors.map(function(color) {
      var isSelected = (highlightData.color || '') === color ? 'style="border:2px solid #fff"' : 'style="border:1px solid rgba(255,255,255,0.35)"';
      return '<div class="color-swatch" data-hl-color="' + color + '" ' + isSelected + ' onclick="LearnView.selectLessonHlColor(this, \'' + color + '\')"></div>';
    }).join('');

    // Build label chips HTML
    var labelChips = '';
    for (var labelKey in LearnView.HL_LABELS) {
      var label = LearnView.HL_LABELS[labelKey];
      var isSelected = (highlightData.label || '') === labelKey ? 'style="background:rgba(139,92,246,0.4);border-color:#8b5cf6"' : 'style="background:rgba(139,92,246,0.15);border-color:rgba(139,92,246,0.3)"';
      labelChips += '<div class="label-chip" data-hl-label="' + labelKey + '" ' + isSelected + ' onclick="LearnView.selectLessonHlLabel(this, \'' + labelKey + '\')">' + label.icon + ' ' + label.text + '</div>';
    }

    // Build effect chips HTML
    var effectChips = '';
    for (var effectKey in LearnView.HL_EFFECTS) {
      var effect = LearnView.HL_EFFECTS[effectKey];
      var isSelected = (highlightData.effect || '') === effectKey ? 'style="background:rgba(139,92,246,0.4);border-color:#8b5cf6"' : 'style="background:rgba(139,92,246,0.15);border-color:rgba(139,92,246,0.3)"';
      effectChips += '<div class="effect-chip" data-hl-effect="' + effectKey + '" ' + isSelected + ' onclick="LearnView.selectLessonHlEffect(this, \'' + effectKey + '\')">' + effect + '</div>';
    }

    popup.innerHTML = '\
      <div class="note-popup-content">\
        <div class="note-popup-header">\
          <h4>📝 Ghi chú & Tùy chỉnh</h4>\
          <button class="close-btn" onclick="LearnView.closeLessonNotePopup()">×</button>\
        </div>\
        <div class="note-popup-body">\
          <div class="highlighted-text">' + this._escapeHtml(highlightData.original) + '</div>\
          <textarea id="lesson-note-text" placeholder="Nhập ghi chú của bạn...">' + this._escapeHtml(highlightData.note || '') + '</textarea>\
          \
          <div class="decoration-section">\
            <div class="decoration-title">🎨 Màu sắc</div>\
            <div class="color-swatches">' + colorSwatches + '</div>\
          </div>\
          \
          <div class="decoration-section">\
            <div class="decoration-title">🏷️ Nhãn</div>\
            <div class="label-chips">' + labelChips + '</div>\
          </div>\
          \
          <div class="decoration-section">\
            <div class="decoration-title">✨ Hiệu ứng</div>\
            <div class="effect-chips">' + effectChips + '</div>\
          </div>\
          \
          <div class="note-popup-actions">\
            <button class="btn btn-secondary" onclick="LearnView.deleteLessonHighlight(\'' + hlId + '\')">🗑️ Xóa</button>\
            <button class="btn btn-primary" onclick="LearnView.saveLessonHighlightNote(\'' + hlId + '\')">💾 Lưu</button>\
          </div>\
        </div>\
      </div>\
    ';

    // Position popup in center of screen
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';

    popup.style.display = 'block';
  },

  // Close lesson note popup
  closeLessonNotePopup: function() {
    var popup = document.getElementById('lesson-note-popup');
    if (popup) popup.style.display = 'none';
  },

  // Save lesson highlight note
  saveLessonHighlightNote: function(hlId) {
    if (!hlId) return;
    
    var textarea = document.getElementById('lesson-note-text');
    if (!textarea) return;
    
    var note = textarea.value.trim();
    var color = window._lessonHlColor || "";
    var label = window._lessonHlLabel || "";
    var effect = window._lessonHlEffect || "";
    
    for (var lid in this.lessonHighlights) {
      var highlights = this.lessonHighlights[lid];
      for (var i = 0; i < highlights.length; i++) {
        if (highlights[i].id === hlId) {
          highlights[i].note = note;
          highlights[i].color = color;
          highlights[i].label = label;
          highlights[i].effect = effect;
          this.saveLessonHighlights(lid);
          this.refreshLessonHighlights(lid);
          this.showToast('💾 Đã lưu ghi chú');
          this.closeLessonNotePopup();
          // Update global notes bubble
          if (typeof NotesBubble !== 'undefined' && NotesBubble.refresh) {
            NotesBubble.refresh();
          }
          return;
        }
      }
    }
  },

  // Select color for lesson highlight
  selectLessonHlColor: function(btn, color) {
    window._lessonHlColor = color;
    var swatches = document.querySelectorAll('#lesson-note-popup .color-swatch');
    for (var i = 0; i < swatches.length; i++) {
      swatches[i].style.border = swatches[i].getAttribute('data-hl-color') === color
        ? '2px solid #fff'
        : '1px solid rgba(255,255,255,0.35)';
    }
  },

  // Select label for lesson highlight
  selectLessonHlLabel: function(btn, label) {
    window._lessonHlLabel = label;
    var chips = document.querySelectorAll('#lesson-note-popup .label-chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].style.background = chips[i].getAttribute('data-hl-label') === label
        ? 'rgba(139,92,246,0.4)'
        : 'rgba(139,92,246,0.15)';
      chips[i].style.borderColor = chips[i].getAttribute('data-hl-label') === label
        ? '#8b5cf6'
        : 'rgba(139,92,246,0.3)';
    }
  },

  // Select effect for lesson highlight
  selectLessonHlEffect: function(btn, effect) {
    window._lessonHlEffect = effect;
    var chips = document.querySelectorAll('#lesson-note-popup .effect-chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].style.background = chips[i].getAttribute('data-hl-effect') === effect
        ? 'rgba(139,92,246,0.4)'
        : 'rgba(139,92,246,0.15)';
      chips[i].style.borderColor = chips[i].getAttribute('data-hl-effect') === effect
        ? '#8b5cf6'
        : 'rgba(139,92,246,0.3)';
    }
  },

  // Delete lesson highlight
  deleteLessonHighlight: function(hlId) {
    if (!hlId) return;
    
    for (var lid in this.lessonHighlights) {
      var highlights = this.lessonHighlights[lid];
      for (var i = 0; i < highlights.length; i++) {
        if (highlights[i].id === hlId) {
          highlights.splice(i, 1);
          this.saveLessonHighlights(lid);
          this.refreshLessonHighlights(lid);
          this.showToast('🗑️ Đã xóa highlight');
          this.closeLessonNotePopup();
          // Update global notes bubble
          if (typeof NotesBubble !== 'undefined' && NotesBubble.refresh) {
            NotesBubble.refresh();
          }
          return;
        }
      }
    }
  },

  // Helper function to escape HTML
  _escapeHtml: function(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Helper function to setup lesson highlights
  setupLessonHighlights: function(lessonId) {
    this.addLessonHighlightStyles(); // Ensure CSS is loaded
    this.loadLessonHighlights(lessonId);
    
    // Re-render highlights after DOM is ready
    setTimeout(function() {
      LearnView.refreshLessonHighlights(lessonId);
    }, 300);
    
    return lessonId;
  },

  // Helper function to render lesson sections with highlights
  renderLessonSectionsWithHighlights: function(lessonId, lessonData) {
    if (!lessonData.sections || lessonData.sections.length === 0) return '';
    
    var sortedSections = lessonData.sections.slice().sort(function(a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    
    return sortedSections.map(function(section, index) {
      var sectionNumber = index + 1;
      var isExpanded = LearnView.activeSectionId === section.id || LearnView.activeSectionId === null;
      var highlightedContent = LearnView.renderLessonContentWithHighlights(lessonId, section.content);
      return '\n      <div class="collapsible-section ' + (isExpanded ? 'expanded' : '') + '" data-section-id="' + section.id + '">\n        <div class="collapsible-header" onclick="LearnView.toggleSection(this)">\n          <h3><span class="section-badge">' + sectionNumber + '</span>' + section.title + '</h3>\n          <div class="collapsible-icon">\n            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />\n            </svg>\n          </div>\n        </div>\n        <div class="collapsible-content">\n          ' + highlightedContent + '\n        </div>\n      </div>';
    }).join('');
  },

  // Helper function to finish lesson rendering with highlights
  finishLessonRendering: function(lessonId, html) {
    // Refresh highlights after rendering
    setTimeout(function() {
      LearnView.refreshLessonHighlights(lessonId);
    }, 100);
    return html;
  },

  // Show toast message
  showToast: function(message) {
    var toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(function() {
      toast.style.display = 'none';
    }, 3000);
  },

  // Add CSS styles for lesson highlights
  addLessonHighlightStyles: function() {
    if (this._lessonHighlightStylesAdded) return;
    
    var style = document.createElement('style');
    style.id = 'lesson-highlight-styles';
    style.textContent = `
      /* Lesson highlight popup */
      .note-popup {
        position: fixed;
        z-index: 10000;
        background: var(--card-bg, #1a1625);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        backdrop-filter: blur(12px);
        min-width: 320px;
        max-width: 400px;
        width: 90%;
        max-width: 90vw;
      }
      
      @media (max-width: 768px) {
        .note-popup {
          min-width: 280px;
          max-width: 95vw;
          width: 95%;
        }
      }
      
      .note-popup-content {
        padding: 1rem;
      }
      
      .note-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
      }
      
      .note-popup-header h4 {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      
      .close-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: background 0.2s;
      }
      
      .close-btn:hover {
        background: rgba(255,255,255,0.1);
      }
      
      .note-popup-body {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .highlighted-text {
        padding: 0.5rem;
        background: rgba(139,92,246,0.1);
        border-left: 3px solid #8b5cf6;
        border-radius: 6px;
        font-size: 0.85rem;
        color: var(--text-primary);
        line-height: 1.5;
      }
      
      #lesson-note-text {
        width: 100%;
        min-height: 80px;
        padding: 0.6rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--bg-input);
        color: var(--text-primary);
        font-size: 0.85rem;
        line-height: 1.5;
        resize: vertical;
        font-family: inherit;
      }
      
      #lesson-note-text:focus {
        outline: none;
        border-color: #8b5cf6;
        box-shadow: 0 0 0 3px rgba(139,92,246,0.2);
      }
      
      .decoration-section {
        margin-top: 0.25rem;
      }
      
      .decoration-title {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-muted);
        margin-bottom: 0.4rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .color-swatches {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      
      .color-swatch {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .color-swatch:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      
      .label-chips, .effect-chips {
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      
      .label-chip, .effect-chip {
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid;
      }
      
      .label-chip:hover, .effect-chip:hover {
        transform: translateY(-1px);
      }
      
      .note-popup-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
        justify-content: flex-end;
      }
      
      .note-popup-actions .btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
        border-radius: 8px;
      }
      
      /* Lesson highlight styles */
      .lesson-highlight {
        cursor: pointer;
        transition: all 0.2s;
        border-radius: 3px;
        padding: 1px 2px;
        background: rgba(139,92,246,0.25);
        color: #c4b5fd;
      }
      
      .lesson-highlight:hover {
        filter: brightness(1.1);
      }
      
      .lesson-highlight.active {
        filter: brightness(1.2);
        box-shadow: 0 0 0 2px rgba(139,92,246,0.5);
      }
      
      .hl-jump {
        animation: hlJump 1.8s ease-in-out;
      }
      
      @keyframes hlJump {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); background: rgba(139,92,246,0.5); }
      }
      
      /* Note bubble styles */
      .note-bubble {
        position: fixed;
        z-index: 9999;
        width: 280px;
        max-height: 400px;
        background: var(--card-bg, #1a1625);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        backdrop-filter: blur(12px);
        overflow: hidden;
      }
      
      @media (max-width: 768px) {
        .note-bubble {
          width: 90vw;
          max-width: 320px;
          max-height: 60vh;
          bottom: 80px;
          top: auto !important;
          left: 50% !important;
          transform: translateX(-50%);
        }
        
        .bubble-content {
          max-height: 40vh;
        }
      }
      
      .bubble-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        background: rgba(139,92,246,0.1);
        border-bottom: 1px solid var(--border-color);
        cursor: move;
        user-select: none;
      }
      
      .bubble-content {
        max-height: 280px;
        overflow-y: auto;
        padding: 0.5rem 0;
      }
      
      .bubble-highlight-item:hover {
        background: rgba(139,92,246,0.1);
      }
      
      .bubble-actions {
        display: flex;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--border-color);
      }
      
      /* Color variations */
      .lesson-highlight.u-pink {
        background: rgba(236,72,153,0.25);
        color: #fbcfe8;
      }
      
      .lesson-highlight.u-blue {
        background: rgba(59,130,246,0.25);
        color: #bfdbfe;
      }
      
      .lesson-highlight.u-green {
        background: rgba(16,185,129,0.25);
        color: #a7f3d0;
      }
      
      .lesson-highlight.u-yellow {
        background: rgba(245,158,11,0.25);
        color: #fde68a;
      }
      
      .lesson-highlight.u-orange {
        background: rgba(249,115,22,0.25);
        color: #fed7aa;
      }
      
      /* Effect animations */
      .hl-effect-flash {
        animation: flash 1.5s ease-in-out infinite;
      }
      
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .hl-effect-dots {
        background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
        background-size: 4px 4px;
      }
      
      /* Label chip rendering */
      .lesson-highlight[data-hl-label-text]::before {
        content: attr(data-hl-label-text);
        display: inline-block;
        font-size: 0.65rem;
        font-weight: 700;
        background: rgba(139,92,246,0.3);
        color: #c4b5fd;
        border-radius: 9999px;
        padding: 0.1rem 0.4rem;
        margin-right: 0.3rem;
        vertical-align: middle;
      }
      
      /* Toast message */
      .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--card-bg, #1a1625);
        color: var(--text-primary);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        z-index: 10001;
        font-size: 0.85rem;
        animation: slideUp 0.3s ease-out;
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
    `;
    
    document.head.appendChild(style);
    this._lessonHighlightStylesAdded = true;
  },

  // ===================== DATA HELPERS =====================

  getFilteredVocab: function () {
    var data = window.VstepVocabData || [];
    var filtered = data.filter(function (w) {
      if (LearnView.vocabLevel !== "all" && w.level !== LearnView.vocabLevel) return false;
      if (LearnView.vocabTopic !== "all" && w.topic !== LearnView.vocabTopic) return false;
      if (LearnView.vocabSavedOnly && !WordSaver.isSaved(w.word)) return false;
      return true;
    });
    if (window.WordSaver) {
      var saved = WordSaver.getSaved();
      saved.forEach(function (s) {
        var lower = s.word.toLowerCase();
        if ((window.VstepVocabData || []).some(function (v) { return v.word.toLowerCase() === lower; })) return;
        if (filtered.some(function (f) { return f.word.toLowerCase() === lower; })) return;
        if (!s.meaningVi && !s.ipa && !s.level && !s.topic && !s.example) return;
        if (LearnView.vocabLevel !== "all" && (s.level || "") !== LearnView.vocabLevel) return;
        if (LearnView.vocabTopic !== "all" && (s.topic || "") !== LearnView.vocabTopic) return;
        filtered.push({
          id: s.id || 'orphan_' + lower,
          word: s.word,
          ipa: s.ipa || '',
          meaningVi: s.meaningVi || '',
          level: s.level || '',
          topic: s.topic || '',
          example: s.example || '',
          _isOrphan: true
        });
      });
    }
    return filtered;
  },

  getLearned: function () {
    try {
      return StorageManager.getVstepLearnedWords();
    } catch (e) {
      return [];
    }
  },
  isLearned: function (id) {
    return this.getLearned().indexOf(id) >= 0;
  },
  toggleLearned: function (id) {
    var arr = this.getLearned();
    var idx = arr.indexOf(id);
    if (idx >= 0) { arr.splice(idx, 1); } else { arr.push(id); }
    StorageManager.setVstepLearnedWords(arr);
  },

  normalizeVi: function (str) {
    return (str || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "d");
  },

  escJs: function (str) {
    return (str || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
  },

  resetModeState: function () {
    this.flashcardIndex = 0;
    this.matchState = { cards: [], flipped: [], matched: [], lock: false };
    this.practiceState = { currentQuestion: 0, score: 0, answered: false, questions: [] };
    this.typingState = { items: [], current: 0, score: 0, answered: false };
    this.listenState = { items: [], current: 0, score: 0, answered: false };
    this.shuffleState = { items: [], current: 0, score: 0, answered: false, picked: [] };
    ["flashcard", "match", "quiz", "typing", "listening", "shuffle"].forEach(function (m) {
      try { localStorage.removeItem("vstep_learn_state_" + m); } catch (e) {}
    });
  },

  buildPracticeQuestions: function () {
    var pool = this.getFilteredVocab().slice();
    if (pool.length < 4) return [];
    var shuffled = pool.sort(function () { return Math.random() - 0.5; }).slice(0, 10);
    var questions = [];
    shuffled.forEach(function (item) {
      var wrongs = pool.filter(function (w) { return w.id !== item.id && w.meaningVi !== item.meaningVi; })
        .sort(function () { return Math.random() - 0.5; })
        .map(function (w) { return w.meaningVi; })
        .filter(function (m, i, arr) { return m && arr.indexOf(m) === i; })
        .slice(0, 3);
      var options = [item.meaningVi].concat(wrongs).sort(function () { return Math.random() - 0.5; });
      questions.push({
        question: 'T\u1eeb "<strong>' + item.word + '</strong>" c\xf3 ngh\u0129a l\xe0 g\xec?',
        options: options,
        correctAnswer: item.meaningVi,
        explanation: '"' + item.word + '" (' + item.ipa + ') l\xe0: <strong>' + item.meaningVi + '</strong>. V\xed d\u1ee5: "' + item.example + '".'
      });
    });
    return questions;
  },

  // ===================== RENDER =====================

  modes: [
    { id: "flashcard", icon: "\uD83D\uDCC7", title: "Flashcard", desc: "H\u1ecdc t\u1eeb v\u1ef1ng th\xf4ng qua th\u1ebb ghi nh\u1edb l\u1eadt." },
    { id: "quiz", icon: "\u2753", title: "Tr\u1eafc nghi\u1ec7m", desc: "\xD4n t\u1eeb v\u1ef1ng b\u1eb1ng c\xe2u h\u1ecfi tr\u1eafc nghi\u1ec7m 4 l\u1ef1a ch\u1ecdn." },
    { id: "match", icon: "\uD83E\uDDE9", title: "Gh\xe9p c\u1eb7p", desc: "L\u1eadt th\u1ebb v\xe0 t\xecm c\u1eb7p t\u1eeb Anh \u2013 Vi\u1ec7t." },
    { id: "wordlist", icon: "\uD83D\uDCD1", title: "Danh s\xe1ch t\u1eeb", desc: "Xem t\u1ea5t c\u1ea3 t\u1eeb v\u1ef1ng theo ch\u1ee7 \u0111\u1ec1 v\xe0 c\u1ea5p \u0111\u1ed9." },
    { id: "typing", icon: "\u2328\uFE0F", title: "\u0110i\u1ec1n t\u1eeb", desc: "Luy\u1ec7n \u0111i\u1ec1n t\u1eeb v\xe0o ch\u1ed7 tr\u1ed1ng trong c\xe2u." },
    { id: "listening", icon: "\uD83C\uDFA7", title: "Nghe - vi\u1ebft", desc: "Nghe v\xe0 vi\u1ebft l\u1ea1i t\u1eeb ti\u1ebfng Anh nghe \u0111\u01b0\u1ee3c." },
    { id: "shuffle", icon: "\uD83D\uDD00", title: "X\xe1o tr\u1ed9n", desc: "S\u1eafp x\u1ebfp c\xe1c t\u1eeb th\xe0nh c\xe2u ho\xe0n ch\u1ec9nh." }
  ],

  setSection: function (section) {
    this.currentSection = section;
    this.activeMode = null;
    Navbar.update();
    this.refreshView();
  },

  render: function () {
    if (this.currentSection === "plan") {
      return this.renderPlanSection();
    }
    
    if (this.currentSection === "lesson") {
      if (this.activeLesson === 1) {
        return this.renderLesson1();
      }
      if (this.activeLesson === 2) {
        return this.renderLesson2();
      }
      if (this.activeLesson === 3) {
        return this.renderLesson3();
      }
      if (this.activeLesson === 4) {
        return this.renderLesson4();
      }
      if (this.activeLesson === 5) {
        return this.renderLesson5();
      }
      if (this.activeLesson === 6) {
        return this.renderLesson6();
      }
      if (this.activeLesson === 7) {
        return this.renderLesson7();
      }
      if (this.activeLesson === 8) {
        return this.renderLesson8();
      }
      if (this.activeLesson === 9) {
        return this.renderLesson9();
      }
      if (this.activeLesson === 10) {
        return this.renderLesson10();
      }
      if (this.activeLesson === 11) {
        return this.renderLesson11();
      }
      if (this.activeLesson === 13) {
        return this.renderLesson13();
      }
      if (this.activeLesson === 14) {
        return this.renderLesson14();
      }
      if (this.activeLesson === 15) {
        return this.renderLesson15();
      }
      return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">Bài học này đang được phát triển.</div>';
    }
    
    // Default: vocab-grammar section
    return this.renderVocabGrammarSection();
  },

  renderVocabGrammarSection: function () {
    var data = window.VstepVocabData || [];
    var topics = [...new Set(data.map(function (w) { return w.topic; }))];
    var levels = ["all", "A2", "B1", "B2", "C1"];
    var filtered = this.getFilteredVocab();
    var learned = this.getLearned();

    var levelBtns = levels.map(function (l) {
      var cls = LearnView.vocabLevel === l ? "btn btn-accent" : "btn btn-secondary";
      return '<button class="' + cls + '" style="font-size:0.68rem;padding:0.26rem 0.58rem;border-radius:10px;" onclick="LearnView.vocabLevel=\'' + l + '\';LearnView.resetModeState();LearnView.refreshView()">' + (l === "all" ? "T\u1ea5t c\u1ea3" : l) + '</button>';
    }).join("");

    var topicBtns = '<button class="btn ' + (LearnView.vocabTopic === "all" ? "btn-accent" : "btn-secondary") + '" style="font-size:0.68rem;padding:0.26rem 0.58rem;border-radius:10px;" onclick="LearnView.vocabTopic=\'all\';LearnView.resetModeState();LearnView.refreshView()">T\u1ea5t c\u1ea3</button>' +
      topics.map(function (t) {
        var cls = LearnView.vocabTopic === t ? "btn btn-accent" : "btn btn-secondary";
        return '<button class="' + cls + '" style="font-size:0.68rem;padding:0.26rem 0.58rem;border-radius:10px;" onclick="LearnView.vocabTopic=\'' + t + '\';LearnView.resetModeState();LearnView.refreshView()">' + t.charAt(0).toUpperCase() + t.slice(1) + '</button>';
      }).join("");

    var learnedCount = learned.length;
    var totalCount = data.length;
    var learnedPct = totalCount > 0 ? Math.min(100, Math.round((learnedCount / totalCount) * 100)) : 0;
    var savedCount = window.WordSaver ? WordSaver.count() : 0;
    var savedBtn = '<button class="btn ' + (this.vocabSavedOnly ? 'btn-accent' : 'btn-secondary') + '" style="font-size:0.68rem;padding:0.26rem 0.58rem;border-radius:10px;" onclick="LearnView.vocabSavedOnly=!LearnView.vocabSavedOnly;LearnView.resetModeState();LearnView.refreshView()">' + (this.vocabSavedOnly ? '\u2B50' : '\u2606') + ' \u0110\xE3 l\u01B0u' + (savedCount > 0 ? ' (' + savedCount + ')' : '') + '</button>';

    var filterHtml = '\n      <div class="glass-card" style="margin-bottom:0.85rem;padding:0.7rem 1rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">\n          <span style="font-weight:600;font-size:0.88rem;">\uD83D\uDCDA Ti\u1ebfn \u0111\u1ed9: <strong style="color:var(--accent);">' + learnedCount + '/' + totalCount + '</strong> t\u1eeb (' + learnedPct + '%)</span>\n        </div>\n        <div class="progress-bar-container" style="margin-top:0.4rem;height:5px;">\n          <div style="height:100%;background:var(--accent);border-radius:9999px;width:' + learnedPct + '%;transition:width 0.5s ease;"></div>\n        </div>\n      </div>\n      <div class="glass-card" style="margin-bottom:0.85rem;padding:0.6rem 0.9rem;">\n        <div style="display:flex;gap:0.32rem;flex-wrap:wrap;margin-bottom:0.38rem;">' + levelBtns + '</div>\n        <div style="display:flex;gap:0.32rem;flex-wrap:wrap;margin-bottom:0.38rem;">' + topicBtns + '</div>\n        <div style="display:flex;gap:0.32rem;flex-wrap:wrap;">' + savedBtn + '</div>\n      </div>';

    // Add mode hints for new users
    var modeHintsHtml = '';
    if (!this.activeMode) {
      modeHintsHtml = '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem;background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.25);">\n        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">\n          <span style="font-size:1.2rem;">💡</span>\n          <h4 style="margin:0;font-size:0.95rem;color:var(--primary);">Chọn chế độ học tập:</h4>\n        </div>\n        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0.5rem;font-size:0.8rem;color:var(--text-muted);">\n          <div style="display:flex;align-items:center;gap:0.4rem;"><span>🃏</span> <strong>Flashcard:</strong> Lật thẻ ghi nhớ</div>\n          <div style="display:flex;align-items:center;gap:0.4rem;"><span>❓</span> <strong>Trắc nghiệm:</strong> Ôn tập 4 lựa chọn</div>\n          <div style="display:flex;align-items:center;gap:0.4rem;"><span>🧩</span> <strong>Ghép cặp:</strong> Ghép Anh - Việt</div>\n          <div style="display:flex;align-items:center;gap:0.4rem;"><span>📝</span> <strong>Điền từ:</strong> Luyện điền vào chỗ trống</div>\n          <div style="display:flex;align-items:center;gap:0.4rem;"><span>🎧</span> <strong>Nghe - viết:</strong> Nghe và viết lại</div>\n          <div style="display:flex;align-items:center;gap:0.4rem;"><span>🔀</span> <strong>Xáo trộn:</strong> Sắp xếp thành câu</div>\n        </div>\n      </div>';
    }

    var contentHtml = this.activeMode ? this.renderActiveMode() : this.renderCardGrid();

    return '\n      <div class="learn-header" style="margin-bottom:1rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">Trung t\xe2m H\u1ecdc t\u1eadp</h1>\n        <p style="color:var(--text-muted);">Ch\u1ecdn ph\u01b0\u01a1ng ph\xe1e1c h\u1ecdc t\u1eeb v\u1ef1ng ph\xf9 h\u1ee3p v\u1edbi b\u1ea1n.</p>\n      </div>\n      ' + filterHtml + '\n      ' + modeHintsHtml + '\n      <div id="learn-content">' + contentHtml + '</div>\n    ';
  },

  renderPlanSection: function () {
    var lessons = [];
    for (var i = 1; i <= 15; i++) {
      var lessonData = window['Lesson' + i + 'Data'];
      var title = lessonData ? lessonData.title : 'Lesson ' + i;
      var desc = lessonData ? lessonData.description : 'Bài học số ' + i + ' - Nội dung sẽ được phát triển sau';
      var category = lessonData && lessonData.category ? lessonData.category : '';
      var level = lessonData && lessonData.level ? lessonData.level : '';
      var duration = lessonData && lessonData.duration ? lessonData.duration : '';
      lessons.push({
        id: i,
        title: title,
        desc: desc,
        category: category,
        level: level,
        duration: duration
      });
    }
    
    var lessonCards = lessons.map(function (lesson) {
      var metadataHtml = '';
      if (lesson.category || lesson.level || lesson.duration) {
        var badges = [];
        if (lesson.category) {
          var categoryColor = LearnView.getCategoryColor(lesson.category);
          badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">' + lesson.category.toUpperCase() + '</span>');
        }
        if (lesson.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">' + lesson.level + '</span>');
        if (lesson.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">⏱ ' + lesson.duration + '</span>');
        metadataHtml = '<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.5rem;">' + badges.join('') + '</div>';
      }
      
      var isNew = lesson.id === 15;
      var badgeHtml = isNew ? '<div style="margin-top:0.4rem;"><span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">✨ Mới</span></div>' : '';
      var buttonClass = isNew ? 'btn-accent' : 'btn-primary';
      var buttonText = isNew ? '🆕 Mới' : 'Bắt đầu';
      
      return '\n        <div class="lesson-card" onclick="LearnView.openLesson(' + lesson.id + ')" oncontextmenu="LearnView.showLessonPopup(event, ' + lesson.id + ')">\n          <div class="lesson-card-number">' + lesson.id + '</div>\n          ' + metadataHtml + '\n          <div class="lesson-card-title">' + lesson.title + '</div>\n          <div class="lesson-card-desc">' + lesson.desc + '</div>\n          ' + badgeHtml + '\n          <button class="btn ' + buttonClass + '" style="margin-top:auto;width:100%;">' + buttonText + '</button>\n        </div>\n      ';
    }).join("");
    
    return '\n      <div class="learn-header" style="margin-bottom:1rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">Kế hoạch học tập</h1>\n        <p style="color:var(--text-muted);">Quản lý và theo dõi kế hoạch học tập của bạn.</p>\n      </div>\n      <div class="lesson-grid">\n        ' + lessonCards + '\n      </div>\n    ';
  },

  showLessonPopup: function(event, lessonId) {
    event.preventDefault();
    
    // Remove existing popups
    document.querySelectorAll(".lesson-popup").forEach(function(el) { el.remove(); });
    
    var lessonData = window['Lesson' + lessonId + 'Data'];
    if (!lessonData) return;
    
    // Determine popup position based on lesson number
    var showAbove = lessonId >= 9;
    var x = event.clientX;
    var y = event.clientY;
    
    // Create popup
    var popup = document.createElement("div");
    popup.className = "lesson-popup";
    popup.style.cssText =
      "position:fixed;z-index:99999;left:" + x + "px;" +
      (showAbove ? "bottom:" + (window.innerHeight - y + 10) + "px;" : "top:" + (y + 10) + "px;") +
      "min-width:320px;max-width:420px;background:var(--bg-card);" +
      "border:1px solid var(--border-color);border-radius:12px;padding:16px;" +
      "box-shadow:0 12px 34px rgba(0,0,0,0.32);font-size:0.9rem;backdrop-filter:blur(12px);";
    
    // Build popup content
    var contentHtml = '';
    
    // Title section
    contentHtml += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
    contentHtml += '<h4 style="margin:0;font-size:1rem;font-weight:700;color:var(--text-primary);">' + lessonData.title + '</h4>';
    contentHtml += '<span onclick="this.closest(\'.lesson-popup\').remove()" style="cursor:pointer;font-size:1.1rem;opacity:0.6;line-height:1;">✕</span>';
    contentHtml += '</div>';
    
    // Description
    if (lessonData.description) {
      contentHtml += '<div style="margin-bottom:12px;color:var(--text-muted);font-size:0.85rem;line-height:1.4;">' + lessonData.description + '</div>';
    }
    
    // Metadata badges
    if (lessonData.category || lessonData.level || lessonData.duration) {
      contentHtml += '<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:12px;">';
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        contentHtml += '<span style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>';
      }
      if (lessonData.level) {
        contentHtml += '<span style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">' + lessonData.level + '</span>';
      }
      if (lessonData.duration) {
        contentHtml += '<span style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>';
      }
      contentHtml += '</div>';
    }
    
    // Sections list
    if (lessonData.sections && lessonData.sections.length > 0) {
      contentHtml += '<div style="margin-bottom:12px;"><strong style="font-size:0.85rem;color:var(--accent);">Nội dung bài học:</strong></div>';
      contentHtml += '<div style="max-height:200px;overflow-y:auto;padding-right:4px;">';
      lessonData.sections.forEach(function(section) {
        contentHtml += '<div style="padding:6px 8px;margin-bottom:4px;background:var(--bg-input);border-radius:6px;font-size:0.8rem;color:var(--text-primary);cursor:pointer;transition:background 0.15s;" onclick="this.closest(\'.lesson-popup\').remove();LearnView.openLesson(' + lessonId + ', \'' + section.id + '\')" onmouseover="this.style.background=\'var(--bg-hover, rgba(255,255,255,0.08))\'" onmouseout="this.style.background=\'var(--bg-input)\'">';
        contentHtml += '<div style="font-weight:600;margin-bottom:2px;">' + section.title + '</div>';
        if (section.content) {
          // Strip HTML tags for preview
          var textContent = section.content.replace(/<[^>]*>/g, '').substring(0, 80);
          if (textContent.length >= 80) textContent += '...';
          contentHtml += '<div style="color:var(--text-muted);font-size:0.75rem;">' + textContent + '</div>';
        }
        contentHtml += '</div>';
      });
      contentHtml += '</div>';
    }
    
    // Open lesson button
    contentHtml += '<button class="btn btn-primary" style="width:100%;padding:8px 0;font-size:0.85rem;margin-top:8px;" onclick="this.closest(\'.lesson-popup\').remove();LearnView.openLesson(' + lessonId + ', null)">▶ Mở bài học</button>';
    
    popup.innerHTML = contentHtml;
    document.body.appendChild(popup);
    
    // Adjust position if popup goes off screen
    var rect = popup.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      popup.style.left = (window.innerWidth - rect.width - 12) + "px";
    }
    if (rect.left < 0) {
      popup.style.left = "12px";
    }
    
    // Close on click outside
    var closeHandler = function(e) {
      if (!popup.contains(e.target)) {
        popup.remove();
        document.removeEventListener("click", closeHandler);
      }
    };
    setTimeout(function() {
      document.addEventListener("click", closeHandler);
    }, 50);
  },

  // ===================== LESSON 1 =====================

  renderLesson1: function () {
    this.setupLessonHighlights(1);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson1Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(1, lessonData);
    
    return LearnView.finishLessonRendering(1, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L1: SPEAKING PART 1') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Chiến lược và kỹ năng cho phần thi Speaking Part 1 VSTEP') + '</p>\n        ' + metadataHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson2: function () {
    this.setupLessonHighlights(2);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson2Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = '';
    if (lessonData.sections && lessonData.sections.length > 0) {
      var sortedSections = lessonData.sections.slice().sort(function(a, b) {
        return (a.order || 0) - (b.order || 0);
      });
      sectionsHtml = sortedSections.map(function(section, index) {
        var sectionNumber = index + 1;
        var isExpanded = index === 0; // Mở section đầu tiên mặc định
        var highlightedContent = LearnView.renderLessonContentWithHighlights(2, section.content);
        return '\n      <div class="collapsible-section ' + (isExpanded ? 'expanded' : '') + '" data-section-id="' + section.id + '">\n        <div class="collapsible-header" onclick="LearnView.toggleSection(this)">\n          <h3><span class="section-badge">' + sectionNumber + '</span>' + section.title + '</h3>\n          <div class="collapsible-icon">\n            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />\n            </svg>\n          </div>\n        </div>\n        <div class="collapsible-content">\n          ' + highlightedContent + '\n        </div>\n      </div>';
      }).join('');
    }
    
    return LearnView.finishLessonRendering(2, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L2: SPEAKING PART 2 & 3') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Chiến lược và kỹ năng cho phần thi Speaking Part 2 và Part 3 VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson3: function () {
    this.setupLessonHighlights(3);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson3Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(3, lessonData);
    
    return LearnView.finishLessonRendering(3, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L3: WRITING - LETTER - INFORMAL') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng viết thư informal và ôn tập Speaking VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson4: function () {
    this.setupLessonHighlights(4);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson4Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(4, lessonData);
    
    return LearnView.finishLessonRendering(4, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L4: WRITING - LETTER - FORMAL') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng viết thư formal và ôn tập Speaking B2') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson5: function () {
    this.setupLessonHighlights(5);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson5Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(5, lessonData);
    
    return LearnView.finishLessonRendering(5, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L5: WRITING - LETTER - FORMAL 2') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng viết thư formal dạng xin việc và thư hỏi thông tin, cùng với Speaking Part 2') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson6: function () {
    this.setupLessonHighlights(6);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson6Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(6, lessonData);
    
    return LearnView.finishLessonRendering(6, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L6: LISTENING - KHÓA HỌC ÔN THI') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng nghe và chiến lược làm bài Listening VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson7: function () {
    this.setupLessonHighlights(7);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson7Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(7, lessonData);
    
    return LearnView.finishLessonRendering(7, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L7: READING') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng đọc hiểu và chiến lược làm bài Reading VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson8: function () {
    this.setupLessonHighlights(8);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson8Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(8, lessonData);
    
    return LearnView.finishLessonRendering(8, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L8: WRITING - ESSAY - DISCUSSION') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng viết bài luận Discussion và chiến lược làm bài Essay VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson9: function () {
    this.setupLessonHighlights(9);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson9Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(9, lessonData);
    
    return LearnView.finishLessonRendering(9, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L9: WRITING - ESSAY - OPINION') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng viết bài luận Opinion và chiến lược làm bài Essay VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson10: function () {
    this.setupLessonHighlights(10);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson10Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(10, lessonData);
    
    return LearnView.finishLessonRendering(10, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L10: DISCUSSION ĐẶC BIỆT') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Kỹ năng viết Discussion đặc biệt cho kỳ thi VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson11: function () {
    this.setupLessonHighlights(11);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson11Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(11, lessonData);
    
    return LearnView.finishLessonRendering(11, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L11: THI CUỐI KHOÁ - LETTER WRITING') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Ôn tập kỹ năng viết thư cho kỳ thi cuối khóa VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson13: function () {
    this.setupLessonHighlights(13);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson13Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(13, lessonData);
    
    return LearnView.finishLessonRendering(13, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L13: ESSAY PRACTICE') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Luyện viết bài luận (Essay) cho kỳ thi VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson14: function () {
    this.setupLessonHighlights(14);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson14Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(14, lessonData);
    
    return LearnView.finishLessonRendering(14, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L14: TỔNG KẾT') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Tổng kết và ôn tập cho kỳ thi VSTEP') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderLesson15: function () {
    this.setupLessonHighlights(15);
    
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.setSection(\'plan\')">← Quay lại</button>';
    var lessonData = window.Lesson15Data || {};
    
    var metadataHtml = '';
    if (lessonData.category || lessonData.level || lessonData.duration) {
      var badges = [];
      if (lessonData.category) {
        var categoryColor = LearnView.getCategoryColor(lessonData.category);
        badges.push('<span class="badge" style="background:' + categoryColor.bg + ';color:' + categoryColor.text + ';font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.category.toUpperCase() + '</span>');
      }
      if (lessonData.level) badges.push('<span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">' + lessonData.level + '</span>');
      if (lessonData.duration) badges.push('<span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;font-size:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;">⏱ ' + lessonData.duration + '</span>');
      metadataHtml = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">' + badges.join('') + '</div>';
    }
    
    var objectivesHtml = '';
    if (lessonData.objectives && lessonData.objectives.length > 0) {
      var objectivesList = lessonData.objectives.map(function(obj) {
        return '<li style="margin-bottom:0.35rem;">• ' + obj + '</li>';
      }).join('');
      objectivesHtml = '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.25rem;">\n        <h3 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--accent);">🎯 Mục tiêu bài học</h3>\n        <ul style="margin:0;padding-left:1.25rem;color:var(--text-muted);font-size:0.9rem;">' + objectivesList + '</ul>\n      </div>';
    }
    
    var prerequisitesHtml = '';
    if (lessonData.prerequisites && lessonData.prerequisites.length > 0) {
      var prereqNames = lessonData.prerequisites.map(function(id) {
        var prereqData = window['Lesson' + id + 'Data'];
        return prereqData ? prereqData.title : 'Lesson ' + id;
      }).join(', ');
      prerequisitesHtml = '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">⚠️ Yêu cầu trước: ' + prereqNames + '</div>';
    }
    
    var sectionsHtml = LearnView.renderLessonSectionsWithHighlights(15, lessonData);
    
    return LearnView.finishLessonRendering(15, '\n      ' + backBtn + '\n      <div class="learn-header" style="margin-bottom:1.5rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">' + (lessonData.title || 'L15: VSTEP B1 TEST TEMPLATE') + '</h1>\n        <p style="color:var(--text-muted);">' + (lessonData.description || 'Mẫu bài thi VSTEP B1 - Writing và Speaking templates') + '</p>\n        ' + metadataHtml + '\n        ' + prerequisitesHtml + '\n      </div>\n      ' + objectivesHtml + '\n      ' + sectionsHtml + '\n    ');
  },

  renderL1SpeakingOverview: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">2. TỔNG QUAN SPEAKING</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Các phần thi Speaking:</h3>\n          <div style="display:flex;flex-direction:column;gap:1rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #3b82f6;">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Part 1 - Tương tác xã hội (Social Interaction)</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Về bản thân (3 phút, không chuẩn bị)</div>\n              <div style="font-size:0.85rem;">6 câu hỏi = 2 chủ đề × 3 câu hỏi</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #10b981;">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Part 2 - Thảo luận giải pháp (Solution Discussion)</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Về bản thân (4 phút = 1 phút chuẩn bị + 3 phút nói)</div>\n              <div style="font-size:0.85rem;">1 tình huống + 3 giải pháp → chọn gì + vì sao</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #f59e0b;">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Part 3 - Phát triển chủ đề (Topic Development)</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Về xã hội (5 phút = 1 phút chuẩn bị + 4 phút nói)</div>\n              <div style="font-size:0.85rem;">Chính: 1 chủ đề + 3 ý tưởng → phát triển | Phụ: 3 câu hỏi thêm</div>\n            </div>\n          </div>\n        </div>\n\n        <div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:1rem;">\n          <div style="font-weight:600;margin-bottom:0.5rem;color:#3b82f6;">5 tiêu chí chấm Speaking:</div>\n          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">\n            <span class="interactive-term" data-explanation="Sử dụng từ vựng phong phú và chính xác theo chủ đề">Vocabulary</span>\n            <span class="interactive-term" data-explanation="Sử dụng cấu trúc ngữ pháp đúng và đa dạng">Grammar</span>\n            <span class="interactive-term" data-explanation="Phát âm rõ ràng, đúng trọng âm và ngữ điệu">Pronunciation</span>\n            <span class="interactive-term" data-explanation="Nói trôi chảy, tự nhiên, ít ngập ngừng">Fluency</span>\n            <span class="interactive-term" data-explanation="Nội dung logic, có sự liên kết giữa các ý">Discourse Management</span>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL1Strategy: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">3. CHIẾN LƯỢC SPEAKING PART 1 - <span class="zoom-term" data-zoom="A.R.E = Answer - Reason - Example">A.R.E</span></h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">3.1. CẤU TRÚC - A.R.E</h3>\n          \n          <div class="example-box" style="margin-bottom:1rem;">\n            <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Ví dụ câu hỏi:</div>\n            <div style="font-size:1.1rem;">Do you like sports?</div>\n            <div style="margin-top:0.5rem;color:var(--text-muted);font-size:0.9rem;">Yes, I like sports because sports are good for health. For example, I like playing badminton.</div>\n          </div>\n\n          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:1rem;">\n            <div style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(59,130,246,0.05));border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="ANSWER: Trả lời trực tiếp, bám sát câu hỏi" style="font-size:1.3rem;font-weight:700;color:#3b82f6;margin-bottom:0.5rem;">A - ANSWER</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Trả lời trực tiếp = BÁM SÁT câu hỏi</div>\n              <div style="font-size:0.85rem;">• you → I<br>• your → my</div>\n            </div>\n            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="REASON: Đưa ra lý do bằng cách tự hỏi WHY" style="font-size:1.3rem;font-weight:700;color:#10b981;margin-bottom:0.5rem;">R - REASON</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Đưa ra lý do = tự hỏi bản thân WHY</div>\n              <div style="font-size:0.85rem;">• because ... (cùng câu)<br>• This is because ... (khác câu)<br>• The reason why ... is that ... (khác câu)</div>\n            </div>\n            <div style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.05));border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="EXAMPLE: Đưa ra ví dụ mở rộng bằng cách tự hỏi WHAT/WHICH/WHO/WHEN/WHERE/HOW" style="font-size:1.3rem;font-weight:700;color:#f59e0b;margin-bottom:0.5rem;">E - EXAMPLE</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Đưa ra ví dụ mở rộng = tự hỏi bản thân WHAT/WHICH, WHO(M), WHEN, WHERE, HOW</div>\n              <div style="font-size:0.85rem;">• For example, ...<br>• For instance, ...</div>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">3.2. CÂU DẪN</h3>\n          <div class="example-box">\n            <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Câu dẫn cho mỗi chủ đề:</div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n              <div style="margin-bottom:0.5rem;"><span class="interactive-term" data-explanation="Dùng để giới thiệu chủ đề thứ nhất">I am going to talk about</span> + topic 1 → trả lời 3 câu hỏi của topic 1</div>\n              <div><span class="interactive-term" data-explanation="Dùng để giới thiệu chủ đề thứ hai">I am going to talk about</span> + topic 2 → trả lời 3 câu hỏi của topic 2</div>\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">3.3. BƯỚC LÀM</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:1rem;">\n            <div style="font-size:0.9rem;margin-bottom:0.5rem;"><strong>Thời gian:</strong> 3 phút = 30s-1 phút chuẩn bị + 2-2.5 phút nói</div>\n            <div style="font-size:0.9rem;color:var(--text-muted);">1 phút chuẩn bị: Kẻ bảng sau ra nháp</div>\n          </div>\n          \n          <div style="overflow-x:auto;">\n            <table class="compare-table" style="margin-top:1rem;">\n              <thead>\n                <tr>\n                  <th>A</th>\n                  <th>R</th>\n                  <th>E</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>1</td>\n                  <td>KEYWORD</td>\n                  <td></td>\n                </tr>\n                <tr>\n                  <td>2</td>\n                  <td>yes</td>\n                  <td>good for health</td>\n                  <td>with my family</td>\n                </tr>\n                <tr>\n                  <td>3</td>\n                  <td>2h</td>\n                  <td>interesting</td>\n                  <td>evening</td>\n                </tr>\n                <tr>\n                  <td>4</td>\n                  <td>went to DL</td>\n                  <td>beautiful city</td>\n                  <td>with friends</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL1Vocab: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">4. VOCAB ĐẠI CƯƠNG</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">4.1. 3 dạng câu hỏi hay gặp → Học thuộc REASON</h3>\n          \n          <div style="overflow-x:auto;margin-bottom:1rem;">\n            <table class="compare-table">\n              <thead>\n                <tr>\n                  <th>DẠNG CÂU HỎI</th>\n                  <th>ANSWER</th>\n                  <th>REASON (học thuộc)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>Liking</td>\n                  <td>yes</td>\n                  <td>\n                    <div style="margin-bottom:0.5rem;"><strong>Liking expression:</strong></div>\n                    <div style="font-size:0.85rem;">\n                      + adj: <span class="interactive-term" data-explanation="be into = thích, hứng thú với">be into</span> / <span class="interactive-term" data-explanation="interested in = quan tâm đến">interested in</span> / <span class="interactive-term" data-explanation="keen on = thích, mến">keen on</span> / <span class="interactive-term" data-explanation="engrossed in = say mê, đắm chìm">engrossed in</span> / <span class="interactive-term" data-explanation="passionate about = đam mê">passionate about</span> / <span class="interactive-term" data-explanation="enthusiastic about = nhiệt tình với">enthusiastic about</span> / <span class="interactive-term" data-explanation="crazy about = điên cuồng về">crazy about</span> / <span class="interactive-term" data-explanation="a big fan of = là fan hâm mộ lớn của">a big fan of</span> / <span class="interactive-term" data-explanation="fond of = yêu thích">fond of</span><br>\n                      + verb: <span class="interactive-term" data-explanation="love = yêu thích">love</span> / <span class="interactive-term" data-explanation="adore = sùng bái, yêu thích rất nhiều">adore</span> / <span class="interactive-term" data-explanation="enjoy = tận hưởng">enjoy</span> + Ving\n                    </div>\n                  </td>\n                </tr>\n                <tr>\n                  <td>Alone - Other people</td>\n                  <td>other people</td>\n                  <td>\n                    <div style="font-size:0.85rem;">\n                      - I feel comfortable and relaxed<br>\n                      - It makes me feel comfortable and relaxed<br>\n                      - it is interesting<br>\n                      - I love sharing moments with people/ my friends and family/ others<br>\n                      - and I want to spend quality time with my family/ friends\n                    </div>\n                  </td>\n                </tr>\n                <tr>\n                  <td>So sánh hiện tại - quá khứ</td>\n                  <td>ko thay đổi</td>\n                  <td>\n                    <div style="font-size:0.85rem;">\n                      because I still like/love ...\n                    </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">4.2. 3 khía cạnh phát triển ý tưởng REASON (liking/advantages)</h3>\n          <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:1rem;margin-bottom:0.5rem;">\n            <strong>Cấu trúc:</strong> It helps me V/ to V\n          </div>\n          \n          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:1rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #3b82f6;">\n              <div style="font-weight:600;margin-bottom:0.5rem;color:#3b82f6;">Physical Health</div>\n              <div style="font-size:0.85rem;">\n                <span class="interactive-term" data-explanation="keep fit = giữ dáng">keep fit</span>, <span class="interactive-term" data-explanation="get into shape = có vóc dáng đẹp">get into shape</span>, <span class="interactive-term" data-explanation="burn fat and calories = đốt cháy mỡ và calo">burn fat and calories</span>, <span class="interactive-term" data-explanation="lose weight = giảm cân">lose weight</span>, <span class="interactive-term" data-explanation="strengthen immune system = tăng cường hệ miễn dịch">strengthen immune system</span>, ...\n              </div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #10b981;">\n              <div style="font-weight:600;margin-bottom:0.5rem;color:#10b981;">Mental Health</div>\n              <div style="font-size:0.85rem;">\n                <strong>Vui một mình:</strong> <span class="interactive-term" data-explanation="relax = nghỉ ngơi">relax</span> = rest = <span class="interactive-term" data-explanation="recharge my battery = nạp lại năng lượng">recharge my battery</span>, <span class="interactive-term" data-explanation="boost energy = tăng năng lượng">boost energy</span>, feel + happy/ refreshed/ relaxed, <span class="interactive-term" data-explanation="reduce stress = giảm stress">reduce stress</span><br>\n                <strong>Vui nhiều mình:</strong> can meet a lot of <span class="zoom-term" data-zoom="LIKE-MINDED PEOPLE = những người có cùng sở thích">LIKE-MINDED PEOPLE</span> who share the same interests with me, make new friends\n              </div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #f59e0b;">\n              <div style="font-weight:600;margin-bottom:0.5rem;color:#f59e0b;">Knowledge</div>\n              <div style="font-size:0.85rem;">\n                <span class="interactive-term" data-explanation="increase knowledge = tăng kiến thức">increase</span> / <span class="interactive-term" data-explanation="gain knowledge = thu nhận kiến thức">gain</span> / <span class="interactive-term" data-explanation="broaden knowledge = mở rộng kiến thức">broaden knowledge</span><br>\n                <em>It helps me recharge my battery/ to reduce stress</em>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL1VocabSteps: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">4.3. BƯỚC LÀM</h2>\n        \n        <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-bottom:1rem;">\n          <div style="margin-bottom:0.5rem;"><strong>Thời gian:</strong> 3p = 30s-1p chuẩn bị + 2p-2p30s nói</div>\n          <div><strong>1 phút chuẩn bị:</strong> Kẻ bảng sau ra nháp</div>\n        </div>\n\n        <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n          <table style="width:100%;border-collapse:collapse;">\n            <thead>\n              <tr style="background:rgba(168,85,247,0.1);">\n                <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">A</th>\n                <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">R</th>\n                <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">E</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                <td style="padding:0.75rem 1rem;vertical-align:top;">1</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">KEYWORD</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;"></td>\n              </tr>\n              <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                <td style="padding:0.75rem 1rem;vertical-align:top;">2</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">yes</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">good for health</td>\n              </tr>\n              <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                <td style="padding:0.75rem 1rem;vertical-align:top;">3</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">2h</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">interesting</td>\n              </tr>\n              <tr>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">4</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">went to DL</td>\n                <td style="padding:0.75rem 1rem;vertical-align:top;">beautiful city</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">\n          <strong>Ví dụ:</strong> with my family / evening / with friends\n        </div>\n      </div>\n    ';
  },

  renderL1Grammar: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">5. BA CẤU TRÚC NGỮ PHÁP CƠ BẢN</h2>\n        \n        <div style="display:flex;flex-direction:column;gap:1.5rem;">\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc 1: S (Ving) + V</h3>\n            <div class="example-box">\n              <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-bottom:0.5rem;">\n                <strong>Quy tắc:</strong> S ít + Vs/es | S nhiều + V nguyên\n              </div>\n              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.5rem;font-size:0.9rem;">\n                <div>I like sports</div>\n                <div>She like<span class="interactive-term" data-explanation="Thêm s/es cho động từ khi chủ đề là số ít ở thì hiện tại đơn">S</span> sports</div>\n                <div>We like music</div>\n                <div>They go to school</div>\n              </div>\n            </div>\n          </div>\n\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc 2: S (Ving) + TOBE + adj</h3>\n            <div class="example-box">\n              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.5rem;font-size:0.9rem;">\n                <div>Sports are good for health</div>\n                <div>She is beautiful</div>\n                <div>Playing soccer is good for health</div>\n                <div>Learning English is easy</div>\n              </div>\n            </div>\n          </div>\n\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc 3: S + TOBE + (a/an/the) N</h3>\n            <div class="example-box">\n              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.5rem;font-size:0.9rem;">\n                <div>Dalat is a (beautiful) city</div>\n                <div>She is a teacher</div>\n                <div>They are doctors</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL1Examples: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">6. PART I: SOCIAL INTERACTION (~ 3 mins)</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Topic 1: Holidays</h3>\n          <div class="example-box">\n            <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Let\'s talk about holidays. ⇒ I am going to talk about + holidays</div>\n            \n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Question 1:</strong> What did you do on your last holiday?\n            </div>\n            <div style="margin-left:1rem;margin-bottom:1rem;">\n              <div><strong>A:</strong> I went to Dalat on my last holiday.</div>\n              <div><strong>R:</strong> This is because it is a beautiful city</div>\n              <div><strong>E:</strong> For example, I went there with my friends/ last month.</div>\n            </div>\n\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Question 2:</strong> Who do you prefer spending your holiday with? Relatives or friends?\n            </div>\n\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Question 3:</strong> Do you prefer going on holiday abroad?\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Topic 2: TV Programmes</h3>\n          <div class="example-box">\n            <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Now, let\'s talk about TV programmes. ⇒ I am going to talk about + TV programmes</div>\n            \n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Question 1:</strong> How many hours a day do you watch television?\n            </div>\n            <div style="margin-left:1rem;margin-bottom:1rem;">\n              <div><strong>A:</strong> I watch TV 1 hour/ 3 hour<span class="interactive-term" data-explanation="Thêm s cho số nhiều">S</span> a day</div>\n              <div><strong>R:</strong> This is because it/ watch<span class="interactive-term" data-explanation="Dùng Ving khi làm chủ ngữ">ING</span> TV helps me relax (v)</div>\n              <div><strong>E:</strong> For instance, I watch TV with my family</div>\n            </div>\n\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Question 2:</strong> Which programmes do you like?\n            </div>\n\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Question 3:</strong> Do you prefer watching television alone or with other people? Why?\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-top:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Ví dụ hoàn chỉnh:</h3>\n          <div class="example-box">\n            <div style="background:linear-gradient(135deg,rgba(59,130,246,0.05),rgba(16,185,129,0.05));border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:1.5rem;">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Question: Do you like sports?</div>\n              <div style="font-size:1.05rem;line-height:1.8;">\n                Yes, I am <span class="interactive-term" data-explanation="fond of = yêu thích">fond of</span> playing sports because it is good for health. It helps me to <span class="interactive-term" data-explanation="recharge my battery = nạp lại năng lượng">recharge my battery</span> and feel relaxed. Moreover, It also helps me <span class="interactive-term" data-explanation="burn fat and calories = đốt cháy mỡ và calo">burn fat and calories</span>. For example, I am <span class="interactive-term" data-explanation="a big fan of = là fan hâm mộ lớn của">a big fan of</span> playing soccer.\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL2Revision: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. SPEAKING PART 1 REVISION</h2>\n        \n        <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-bottom:1.5rem;">\n          <table style="width:100%;border-collapse:collapse;">\n            <thead>\n              <tr style="background:rgba(168,85,247,0.1);">\n                <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">PHẦN THI</th>\n                <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">CẤU TRÚC</th>\n                <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">TỪ VỰNG</th>\n                <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">BƯỚC LÀM</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                <td style="padding:1rem;vertical-align:top;"><strong>Part 1</strong></td>\n                <td style="padding:1rem;vertical-align:top;">\n                  <div><span class="zoom-term" data-zoom="A.R.E = Answer - Reason - Example">A-R-E</span></div>\n                </td>\n                <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                  <div style="margin-bottom:0.5rem;">• 3 dạng câu hỏi thường gặp - học thuộc phần Reason:</div>\n                  <div style="margin-left:0.5rem;margin-bottom:0.5rem;">\n                    <span class="interactive-term" data-explanation="Các câu hỏi về sở thích">liking</span>, <span class="interactive-term" data-explanation="Câu hỏi về việc một mình hay với người khác">alone/ other people</span>, <span class="interactive-term" data-explanation="So sánh quá khứ và hiện tại">so sánh quá khứ - hiện tại</span>\n                  </div>\n                  <div style="margin-bottom:0.5rem;">• 3 khía cạnh phát triển ý:</div>\n                  <div style="margin-left:0.5rem;margin-bottom:0.5rem;">\n                    <span class="interactive-term" data-explanation="Sức khỏe thể chất">physical health</span>, <span class="interactive-term" data-explanation="Sức khỏe tinh thần">mental health</span>, <span class="interactive-term" data-explanation="Kiến thức">knowledge</span>\n                  </div>\n                  <div>• Trước mỗi chủ đề cần câu dẫn: <span class="interactive-term" data-explanation="Câu dẫn giới thiệu chủ đề">I am going to talk about...</span></div>\n                </td>\n                <td style="padding:1rem;vertical-align:top;">\n                  <div style="font-size:0.85rem;">• Lý thuyết: 3p (ko có thời gian chuẩn bị)</div>\n                  <div style="font-size:0.85rem;">• Thực tế: 30s-1p để chuẩn bị (kẻ bảng ra nháp + 2p-2p30s nói)</div>\n                </td>\n              </tr>\n              <tr>\n                <td style="padding:1rem;vertical-align:top;"><strong>Speaking Part 3</strong></td>\n                <td style="padding:1rem;vertical-align:top;">\n                  <div><span class="zoom-term" data-zoom="Mở - Thân - Kết = Introduction - Body - Conclusion">mở - thân - kết</span></div>\n                </td>\n                <td style="padding:1rem;vertical-align:top;">\n                  <div style="font-size:0.85rem;">từ vựng của speak part 1+2</div>\n                </td>\n                <td style="padding:1rem;vertical-align:top;">\n                  <div style="font-size:0.85rem;">• LÝ THUYẾT: 1p chuẩn bị => 4p nói</div>\n                  <div style="font-size:0.85rem;">• THỰC TẾ: 2p chuẩn bị => 3p nói</div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    ';
  },

  renderL2Part2: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">2. SPEAKING PART 2</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Tổng quan:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n            <div style="margin-bottom:0.5rem;">• <strong>1 tình huống + 3 giải pháp</strong> => chọn gì + tại sao?</div>\n            <div style="margin-bottom:0.5rem;">• <strong>Thời gian:</strong> 4p = 1p chuẩn bị (TUYỆT ĐỐI KHÔNG NÓI GÌ) + 3p nói</div>\n            <div style="font-size:0.85rem;color:var(--text-muted);">=> Thực tế: 1p30s-2p chuẩn bị => 2p+2p30s</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc:</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(59,130,246,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Phần</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Ý chí</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Chi tiết / Cách làm</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>Introduction</strong></td>\n                  <td style="padding:1rem;vertical-align:top;">Giới thiệu tình huống lại</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;"><strong>CÁCH 1:</strong> I am going to talk about the situation... [Đọc nguyên đề bài phần giới thiệu tình huống]</div>\n                    <div style="margin-bottom:0.5rem;"><strong>CÁCH 2:</strong> I am given the situation that... [Đọc nguyên đề bài phần giới thiệu tình huống]</div>\n                    <div style="color:var(--text-muted);margin-top:0.5rem;">• Note: giới thiệu tình huống: nói từ đầu đến chuẩn bị đến 3 phương án thì dừng lại</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>Introduction</strong></td>\n                  <td style="padding:1rem;vertical-align:top;">Khen cả 3 phương án + Chọn phương án</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;"><strong>CÁCH 1:</strong> All three options [liệt kê 3 sự lựa chọn] are reasonable but when choosing among three options, I believe that [option A] is the best choice because of the following reasons.</div>\n                    <div style="margin-bottom:0.5rem;"><strong>CÁCH 2:</strong> I believe that all options have their own advantages and disadvantages; however, after considering three options, I would say that... is the best choice.</div>\n                    <div><strong>CÁCH 3:</strong> Choosing from the three available options [liệt kê 3 phương án], I believe that [Option A] is optimal/ the most suitable because it is supported by a number of following reasons.</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>Body</strong></td>\n                  <td style="padding:1rem;vertical-align:top;">Khen</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;"><strong>CÁCH 1:</strong></div>\n                    <div>• Firstly, it is convenient and suitable</div>\n                    <div>• Secondly, this option may bring me/him/them a wide range of benefits because khen PMK (optional)</div>\n                    <div>• Thirdly, I/He/She + like(s) + phương án chọn</div>\n                    <div>• Finally, it is + adj khen (mở rộng: R-E)</div>\n                    <div style="margin-top:0.5rem;">Therefore, they are the reasons why I agree with this solution.</div>\n                    <div style="margin-top:0.5rem;"><strong>CÁCH 2:</strong></div>\n                    <div>• In the first place, it is convenient and suitable because [KHEN 1]</div>\n                    <div>• Secondly, this option may bring me/him/them a wide range of benefits because [KHEN 2-PMK]</div>\n                    <div>• Furthermore, after making comparisons among three ideas, I think that I/she/he/they would prefer + [phương án em chọn] because of its merits</div>\n                    <div>• Finally, it is + adj khen [KHEN 3]</div>\n                    <div style="margin-top:0.5rem;">Therefore, they are the reasons why I agree with this solution.</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>Body</strong></td>\n                  <td style="padding:1rem;vertical-align:top;">Chê</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div><strong>CÁCH 1:</strong></div>\n                    <div>And there are some reasons why I don\'t choose the other options.</div>\n                    <div style="margin-top:0.5rem;">• [Option B] isn\'t my choice because it is boring and inconvenient. Moreover, I am not interested in/keen on + phương án B</div>\n                    <div>• Finally, it is + adj chê (mở rộng R-E)</div>\n                    <div style="margin-top:0.5rem;">• I don\'t think [option C] is the suitable choice because it lacks suitability and convenience. Moreover, I am not a big fan of + phương án C</div>\n                    <div>• Finally, it is + adj chê (mở rộng R-E)</div>\n                    <div style="margin-top:0.5rem;">Hence, they are the reasons why I do not agree with these solutions.</div>\n                    <div style="margin-top:0.5rem;"><strong>CÁCH 2:</strong></div>\n                    <div>Regarding the other options, they are not my choices because of their own drawbacks.</div>\n                    <div style="margin-top:0.5rem;">• I am not in favor of [Option B] because it is boring and inconvenient. On top of that, a second minus point could be that I am not interested in + [phương án]</div>\n                    <div>• Finally, it is + adj chê (mở rộng R-E)</div>\n                    <div style="margin-top:0.5rem;">• Similarly, although [option C] sounds interesting, I do not support this solution as it lacks convenience and suitability.</div>\n                    <div>• Additionally, I am not a big fan of + [phương án e k chọn] due to its demerits</div>\n                    <div>• Finally, it is + adj chê (mở rộng R-E)</div>\n                    <div style="margin-top:0.5rem;">Hence, they are the reasons why I do not agree with these solutions.</div>\n                    <div style="margin-top:0.5rem;color:var(--text-muted);font-style:italic;">Note: ý tưởng chê >< ý tưởng chê</div>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding:1rem;vertical-align:top;"><strong>Conclusion</strong></td>\n                  <td style="padding:1rem;vertical-align:top;">Kết luận</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div><strong>CÁCH 1:</strong> To sum up, if I were in the situation, I would go for [option A] because it is the most suitable.</div>\n                    <div style="margin-top:0.5rem;"><strong>CÁCH 2:</strong> To sum up, taking into consideration all factors, I would go for [Option A] as it appears to be the most appropriate choice.</div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Ví dụ minh họa:</h3>\n          <div class="example-box">\n            <div style="background:linear-gradient(135deg,rgba(59,130,246,0.05),rgba(16,185,129,0.05));border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:1.5rem;">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Situation: Your family is planning a trip from Danang to Hanoi. Three means of transport are suggested: The train, The plane and The coach. Which means of transport do you think is the best choice?</div>\n              \n              <div style="margin-top:1rem;background:var(--bg-input);border-radius:8px;overflow:hidden;">\n                <div style="background:rgba(59,130,246,0.1);padding:0.75rem 1rem;font-weight:600;color:#3b82f6;">Introduction</div>\n                <div style="padding:1rem;">\n                  <div style="margin-bottom:0.5rem;"><strong>Giới thiệu lại tình huống:</strong></div>\n                  <div style="margin-bottom:0.5rem;">• CÁCH 1: I am going to talk about the situation. My family is planning a trip from Danang to Hanoi. Three means of transport are suggested.</div>\n                  <div>• CÁCH 2: I am given the situation that... [Đọc nguyên đề bài phần giới thiệu tình huống]</div>\n                  <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">Note: giới thiệu tình huống: nói từ đầu đến chuẩn bị đến 3 phương án thì dừng lại</div>\n                  \n                  <div style="margin-top:0.5rem;"><strong>Khen cả 3 phương án + Chốt phương án chọn: the train, the plane, the coach</strong></div>\n                  <div style="margin-bottom:0.5rem;">• CÁCH 1: All three options the train, the plane, the coach are reasonable but when choosing among three options, I believe that the plane is the best choice because of the following reasons.</div>\n                  <div>• CÁCH 2: I believe that all options have their own advantages and disadvantages; however, after considering three options, I would say that ... is the best choice.</div>\n                </div>\n              </div>\n\n              <div style="margin-top:1rem;background:var(--bg-input);border-radius:8px;overflow:hidden;">\n                <div style="background:rgba(16,185,129,0.1);padding:0.75rem 1rem;font-weight:600;color:#10b981;">Body Khen (plane)</div>\n                <div style="padding:1rem;">\n                  <div style="margin-bottom:0.5rem;">• fast / time-saving</div>\n                  <div style="margin-bottom:0.5rem;">• convenient</div>\n                  <div style="margin-bottom:0.5rem;">• safe</div>\n                  <div style="margin-bottom:0.5rem;">• cheap</div>\n                  <div style="margin-bottom:0.5rem;">• comfortable</div>\n                  <div style="margin-top:0.5rem;">Firstly, it is convenient and suitable</div>\n                  <div>Secondly, this option may bring me a wide range of benefits because khen PMK (optional)</div>\n                  <div>Thirdly, I/He/She + like(s) + the plane</div>\n                  <div>Finally, it is + comfortable</div>\n                  <div>Therefore, they are the reasons why I agree with this solution.</div>\n                </div>\n              </div>\n\n              <div style="margin-top:1rem;background:var(--bg-input);border-radius:8px;overflow:hidden;">\n                <div style="background:rgba(245,158,11,0.1);padding:0.75rem 1rem;font-weight:600;color:#f59e0b;">Body Chê (train + coach)</div>\n                <div style="padding:1rem;">\n                  <div style="margin-bottom:0.5rem;"><strong>the train:</strong></div>\n                  <div style="margin-left:0.5rem;">+ slow/time-consuming</div>\n                  <div style="margin-left:0.5rem;">+ hot</div>\n                  <div style="margin-left:0.5rem;">+ inconvenient</div>\n                  <div style="margin-left:0.5rem;">+ noisy</div>\n                  \n                  <div style="margin-top:0.5rem;"><strong>the coach:</strong></div>\n                  <div style="margin-left:0.5rem;">+ unsafe</div>\n                  <div style="margin-left:0.5rem;">+ boring</div>\n                  <div style="margin-left:0.5rem;">+ travel-sick</div>\n                  \n                  <div style="margin-top:0.5rem;">And there are some reasons why I don\'t choose the other options.</div>\n                  <div style="margin-top:0.5rem;">The train isn\'t my choice because it is slow and inconvenient. Moreover, I am not interested in/keen on + the train</div>\n                  <div>Finally, it is + hot</div>\n                  <div style="margin-top:0.5rem;">I don\'t think the coach is the suitable choice because it lacks suitability and convenience. Moreover, I am not a big fan of + the coach</div>\n                  <div>Finally, it is + unsafe.</div>\n                  <div>Hence, they are the reasons why I do not agree with these solutions.</div>\n                </div>\n              </div>\n\n              <div style="margin-top:1rem;background:var(--bg-input);border-radius:8px;overflow:hidden;">\n                <div style="background:rgba(239,68,68,0.1);padding:0.75rem 1rem;font-weight:600;color:#ef4444;">Conclusion</div>\n                <div style="padding:1rem;">\n                  <div>CÁCH 1: To sum up, if I were in the situation, I would go for the plane because it is the most suitable.</div>\n                  <div>CÁCH 2: To sum up, taking into consideration all factors, I would go for [Option A] as it appears to be the most appropriate choice.</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Bước làm:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n            <div style="margin-bottom:0.5rem;">• <strong>B1:</strong> Học thuộc cấu trúc (phát âm chuẩn)</div>\n            <div style="margin-bottom:0.5rem;">• <strong>B2:</strong> Ý tưởng 1 KHEN - 2 CHÊ: 4.5 điểm (phát âm rất tốt)</div>\n            <div>• <strong>B3:</strong> KÉO DÀI CÂU TRẢ LỜI = tăng số lượng + tăng chất lượng</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Bảng mục tiêu điểm số:</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(168,85,247,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Level</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Mục tiêu điểm Speak</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Speaking part 2</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">B1 (4.0)</td>\n                  <td style="padding:1rem;vertical-align:top;">4.5-5.0</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">Cần nói thêm 3-4 ý</td>\n                </tr>\n                <tr>\n                  <td style="padding:1rem;vertical-align:top;">B2 (6.0)</td>\n                  <td style="padding:1rem;vertical-align:top;">6.5-7.0</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">Cần nói thêm 6-8 ý</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Tiêu chí tăng số lượng và chất lượng:</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(59,130,246,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Tiêu chí</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Nội dung chi tiết</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">Tăng số lượng</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>• It is safe</div>\n                    <div>• It is time-saving</div>\n                    <div>• It is comfortable</div>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding:1rem;vertical-align:top;">Tăng chất lượng (Reason - Example)</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div><strong>plane:</strong> It is comfortable because there are many services such as eating, drinking, and watching films.</div>\n                    <div><strong>train:</strong> time-consuming - For example, it takes us a whole day to travel from DN to HN.</div>\n                    <div><strong>coach:</strong> Uncomfortable because I am travel-sick.</div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n          <div style="margin-top:0.5rem;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:0.75rem;">\n            <div style="font-size:0.85rem;"><strong>chọn: A</strong> - ý tưởng khen</div>\n            <div style="font-size:0.85rem;"><strong>ko chọn: B, C</strong> - ý tưởng chê >< ý tưởng chê</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Từ vựng đại cương:</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(16,185,129,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(16,185,129,0.2);font-weight:600;color:#10b981;">KHEN</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(16,185,129,0.2);font-weight:600;color:#ef4444;">CHÊ</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Tiết kiệm thời gian">time-saving</span>: tiết kiệm thời gian</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Tốn thời gian">time-consuming</span>: tốn thời gian</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Nhanh">quick, fast</span>: nhanh</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Chậm">slow</span>: chậm</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Thuận lợi">convenient</span>: thuận lợi</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Bất lợi">inconvenient</span>: bất lợi</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Rẻ, giá cả phải chăng">cheap/ affordable</span>: rẻ, giá cả phải chăng</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Đắt">expensive/ costly</span>: đắt</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Dễ">easy</span>: dễ</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Khó">difficult</span>: khó</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Yên tĩnh">quiet</span>: yên tĩnh</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Ồn ào">noisy</span>: ồn ào</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Thú vị">interesting/fun</span>: thú vị</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Nhàm chán">boring</span>: nhàm chán</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Phổ biến">popular</span>: phổ biến</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Không phổ biến">unpopular</span>: không phổ biến</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Thoải mái">comfortable</span>: thoải mái</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Không thoải mái">uncomfortable</span>: không thoải mái</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Hiệu quả">effective</span>: hiệu quả</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Không hiệu quả">ineffective</span>: không hiệu quả</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Lành mạnh">healthy</span>: lành mạnh</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Không lành mạnh">unhealthy</span>: không lành mạnh</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="An toàn">safe</span>: an toàn</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Không an toàn">unsafe</span>: không an toàn</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Sạch, vệ sinh">clean/ hygienic</span>: sạch, vệ sinh</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Bẩn, không vệ sinh">dirty/ not hygienic</span>: bẩn, không vệ sinh</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="To">big/huge</span>: to</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Bé">small</span>: bé</td>\n                </tr>\n                <tr>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Thực tế">practical</span>: thực tế</td>\n                  <td style="padding:0.75rem 1rem;"><span class="interactive-term" data-explanation="Không thực tế">impractical</span>: không thực tế</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL2Part3: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">3. SPEAKING PART 3</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Tổng quan:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n            <div style="margin-bottom:0.5rem;">• <strong>Chính:</strong> 1 câu đầy đủ (topic) + 3 ý => Phát triển chủ đề dựa trên Mindmap</div>\n            <div style="margin-bottom:0.5rem;">• <strong>Phụ:</strong> 3 câu hỏi thêm về chính chủ đề bên trên</div>\n            <div style="margin-bottom:0.5rem;">• <strong>Thời gian:</strong> 5p = 1p chuẩn bị (TUYỆT ĐỐI KHÔNG NÓI GÌ) + 4p nói</div>\n            <div style="font-size:0.85rem;color:var(--text-muted);">=> thực tế: 2p chuẩn bị + 3p nói</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc:</h3>\n          \n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#3b82f6;">Introduction (hình phễu)</h4>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <div style="margin-bottom:0.5rem;"><strong>Chủ đề lớn:</strong> It is a fact that <span class="interactive-term" data-explanation="Chủ đề lớn hơn chủ đề thi, ví dụ: education, health, technology...">[topic lớn hơn chủ đề thi]</span> plays an important role in our lives.</div>\n              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">(Mẹo tìm chủ đề lớn: tách chủ đề thành từ vựng bé => tìm BỘ: education, health, technology, transportation, environment,.....)</div>\n              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">B1 (yếu): k tìm đc chủ đề lớn, có thể "chủ đề lớn = lõi mindmap"</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n              <div style="margin-bottom:0.5rem;"><strong>Chủ đề hôm đi thi:</strong> Nowadays, an increasing number of people are concerned about <span class="interactive-term" data-explanation="Chủ đề thi - lõi mindmap">[chủ đề hôm thi - lõi mindmap]</span></div>\n              <div><strong>Mục đích:</strong> Today, I am going to talk about the topic <span class="interactive-term" data-explanation="Nhắc lại topic nguyên của đề bài">[Nhắc lại topic nguyên của đề bài]</span></div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#10b981;">Body 1</h4>\n            <div class="example-box">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Ý chính 1 + lý do/ ví dụ 1]</div>\n              <div>Firstly, it is the fact that [hoàn thiện ý chính 1] because...</div>\n              <div>Therefore, it is good for/ bad for...</div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#f59e0b;">Body 2</h4>\n            <div class="example-box">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Ý chính 2 + lý do/ ví dụ 2]</div>\n              <div>Secondly, it is obvious that [hoàn thiện ý chính 2]</div>\n              <div>For example,...</div>\n              <div>Hence, it is beneficial to/ harmful to people</div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#ef4444;">Body 3</h4>\n            <div class="example-box">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Ý chính 3 + lý do/ ví dụ 3]</div>\n              <div>Finally, we cannot deny that [hoàn thiện ý chính 3]</div>\n              <div>This is because...</div>\n              <div>So/Thus, it has positive/negative effects on.......</div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#8b5cf6;">Your own idea</h4>\n            <div class="example-box">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Own idea]</div>\n              <div>+ I think that 3 ideas are comprehensive. I cannot think of other ideas</div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#ec4899;">Conclusion</h4>\n            <div class="example-box">\n              <div>To sum up, I strongly believe that <span class="interactive-term" data-explanation="Nhắc lại topic nguyên của đề bài">[Nhắc lại topic nguyên của đề bài]</span>.</div>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Ví dụ minh họa:</h3>\n          <div class="example-box">\n            <div style="background:linear-gradient(135deg,rgba(59,130,246,0.05),rgba(16,185,129,0.05));border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:1.5rem;">\n              <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Topic: Reading habits should be encouraged among teenagers.</div>\n              <div style="margin-bottom:1rem;"><strong>[Mindmap: Reduce stress | Improve memory | Increase knowledge | [Your own idea]]</strong></div>\n              \n              <div style="margin-top:1rem;margin-bottom:0.5rem;"><strong>Phần 2: Follow-up questions: A (RE)</strong></div>\n              <div style="font-size:0.9rem;">• What are the differences between the kinds of books read by your parents\' generation and those read by your generation?</div>\n              <div style="font-size:0.9rem;">• Do you think that the government should support free books for all people?</div>\n              <div style="font-size:0.9rem;">• In what ways can parents help children develop their interest in reading?</div>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Ví dụ hoàn chỉnh - Phần 1:</h3>\n          <div class="example-box">\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n              <div style="background:rgba(59,130,246,0.1);padding:0.75rem 1rem;font-weight:600;color:#3b82f6;">Introduction (hình phễu)</div>\n              <div style="padding:1rem;">\n                <div style="margin-bottom:0.5rem;"><strong>Chủ đề lớn:</strong> It is a fact that <span class="interactive-term" data-explanation="Giáo dục">education</span> plays an important role in our lives.</div>\n                <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">(Mẹo tìm chủ đề lớn: tách chủ đề thành từ vựng bé => tìm BỘ: education, health, technology, transportation, environment,....)</div>\n                <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">B1 (yếu): k tìm đc chủ đề lớn, có thể "chủ đề lớn = lõi mindmap"</div>\n                <div style="margin-top:0.5rem;"><strong>Chủ đề hôm đi thi:</strong> Nowadays, an increasing number of people are concerned about <span class="interactive-term" data-explanation="Đọc sách">reading</span>.</div>\n                <div><strong>Mục đích:</strong> Today, I am going to talk about the topic reading habits should be encouraged among teenagers.</div>\n              </div>\n            </div>\n\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-top:1rem;">\n              <div style="background:rgba(16,185,129,0.1);padding:0.75rem 1rem;font-weight:600;color:#10b981;">Thân 1</div>\n              <div style="padding:1rem;">\n                <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Ý chính 1 + lý do/ ví dụ 1]</div>\n                <div>Firstly, it is the fact that <span class="interactive-term" data-explanation="Đọc sách giúp mọi người giảm stress">[hoàn thiện ý chính 1 - Reading helps people reduce stress]</span> because when people read books, they can relax</div>\n                <div>Therefore, it is good for people</div>\n              </div>\n            </div>\n\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-top:1rem;">\n              <div style="background:rgba(245,158,11,0.1);padding:0.75rem 1rem;font-weight:600;color:#f59e0b;">Thân 2</div>\n              <div style="padding:1rem;">\n                <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Ý chính 2 + lý do/ ví dụ 2]</div>\n                <div>Secondly, it is obvious that <span class="interactive-term" data-explanation="Đọc sách giúp mọi người tăng kiến thức">[hoàn thiện ý chính 2 - Reading helps people increase knowledge]</span></div>\n                <div>For example, people can increase knowledge about different fields/ areas such as history, business and education</div>\n                <div>Hence, it is beneficial to people</div>\n              </div>\n            </div>\n\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-top:1rem;">\n              <div style="background:rgba(239,68,68,0.1);padding:0.75rem 1rem;font-weight:600;color:#ef4444;">Thân 3</div>\n              <div style="padding:1rem;">\n                <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Ý chính 3 + lý do/ ví dụ 3]</div>\n                <div>Finally, we cannot deny that <span class="interactive-term" data-explanation="Đọc sách giúp mọi người cải thiện trí nhớ">[reading books enables people to improve memory]</span></div>\n                <div>This is because when they read, their brains have to work to memorize things.</div>\n                <div>So/Thus, it has positive effects on people.</div>\n              </div>\n            </div>\n\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-top:1rem;">\n              <div style="background:rgba(139,92,246,0.1);padding:0.75rem 1rem;font-weight:600;color:#8b5cf6;">Your own idea</div>\n              <div style="padding:1rem;">\n                <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">[Own idea]</div>\n                <div>+ I think that 3 ideas are comprehensive. I cannot think of other ideas</div>\n              </div>\n            </div>\n\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-top:1rem;">\n              <div style="background:rgba(236,72,153,0.1);padding:0.75rem 1rem;font-weight:600;color:#ec4899;">Conclusion</div>\n              <div style="padding:1rem;">\n                <div>To sum up, I strongly believe that reading habits should be encouraged among teenagers.</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Bước làm:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n            <div style="margin-bottom:0.5rem;">• <strong>B1:</strong> cấu trúc học thuộc (phát âm đúng)</div>\n            <div>• <strong>B2:</strong> hoàn thiện ý: biến 3 từ thành 3 câu đầy đủ</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc biến từ ý thành câu đầy đủ:</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(168,85,247,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Từ loại</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Cấu trúc</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Ví dụ</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>V</strong></td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;">• increase knowledge</div>\n                    <div style="margin-bottom:0.5rem;">=> Topic + helps people + V</div>\n                    <div>=> People can + V</div>\n                  </td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>Reading helps people increase knowledge.</div>\n                    <div>People can increase their knowledge.</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>V</strong></td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;">• improve memory</div>\n                    <div>=> People can + V</div>\n                  </td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>People can improve their memory.</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>adj</strong></td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;">• fun</div>\n                    <div>=> Topic + be + adj</div>\n                  </td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>Reading is fun.</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;"><strong>N</strong></td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;">• relaxation</div>\n                    <div style="margin-bottom:0.5rem;">=> People can have + N</div>\n                    <div style="margin-bottom:0.5rem;">=> biến N thành V => dùng cấu trúc của V</div>\n                    <div style="margin-bottom:0.5rem;">relaxation => relax</div>\n                    <div>=> People can relax</div>\n                  </td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>People can have relaxation.</div>\n                    <div>People can relax.</div>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding:1rem;vertical-align:top;"><strong>adj + N</strong></td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div style="margin-bottom:0.5rem;">=> N + to be + adj</div>\n                    <div style="margin-bottom:0.5rem;">=> People can have + adj N</div>\n                    <div style="margin-bottom:0.5rem;">• fresh air</div>\n                  </td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>The air is fresh.</div>\n                    <div>People can have fresh air.</div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cách trả lời 3 câu hỏi thêm (Follow-up questions):</h3>\n          \n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#3b82f6;">A - Mở rộng (Tư duy đơn giản)</h4>\n            <div class="example-box">\n              <div><span class="zoom-term" data-zoom="Câu dẫn cho 3 câu hỏi thêm">I am going to answer 3 FOLLOW UP QUESTIONS:</span></div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#10b981;">Bảng cách trả lời theo level:</h4>\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n              <table style="width:100%;border-collapse:collapse;">\n                <thead>\n                  <tr style="background:rgba(16,185,129,0.1);">\n                    <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(16,185,129,0.2);font-weight:600;">Level</th>\n                    <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(16,185,129,0.2);font-weight:600;">Cách trả lời</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr style="border-bottom:1px solid rgba(16,185,129,0.1);">\n                    <td style="padding:1rem;vertical-align:top;"><strong>B1</strong></td>\n                    <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">trả lời đủ 3 câu phần A + mở rộng câu</td>\n                  </tr>\n                  <tr>\n                    <td style="padding:1rem;vertical-align:top;"><strong>B2</strong></td>\n                    <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">trả lời đủ 3 câu phần A + phải mở rộng được câu</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div style="margin-top:0.5rem;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:0.75rem;">\n              <div style="font-size:0.85rem;"><strong>Note:</strong> khi mở rộng: tư duy ý tưởng đơn giản</div>\n            </div>\n          </div>\n\n          <div style="margin-bottom:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.5rem;color:#f59e0b;">Dấu hiệu dạng câu hỏi thường gặp trong phần phụ/Speaking Part 3:</h4>\n            <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n              <table style="width:100%;border-collapse:collapse;">\n                <thead>\n                  <tr style="background:rgba(245,158,11,0.1);">\n                    <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(245,158,11,0.2);font-weight:600;">Dấu hiệu</th>\n                    <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(245,158,11,0.2);font-weight:600;">Cách trả lời PHẦN ANSWER</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td style="padding:1rem;vertical-align:top;"><strong>what</strong></td>\n                    <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                      <div style="margin-bottom:0.5rem;"><span class="interactive-term" data-explanation="Cấu trúc trả lời câu hỏi what">there are some + Ns</span></div>\n                      \n                      <div style="margin-top:0.5rem;background:rgba(59,130,246,0.05);padding:0.75rem;border-radius:6px;">\n                        <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">+ What is the difference between the kinds of books read by your parents\' generation and those read by your generation?</div>\n                        <div style="margin-bottom:0.5rem;">=> There are some + differences between the kinds of books read by my parents\' generation and those read by my generation.</div>\n                        <div>For example, my parents love reading novels, while I like reading comics.</div>\n                      </div>\n                      \n                      <div style="margin-top:0.5rem;background:rgba(59,130,246,0.05);padding:0.75rem;border-radius:6px;">\n                        <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">+ Do you think that the government should support free books for all people?</div>\n                        <div style="margin-bottom:0.5rem;">=> yes, i think + that the government should support free books for all people.</div>\n                        <div>because...</div>\n                      </div>\n                      \n                      <div style="margin-top:0.5rem;background:rgba(59,130,246,0.05);padding:0.75rem;border-radius:6px;">\n                        <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">+ In what ways can parents help children develop their interest in reading?</div>\n                        <div style="margin-bottom:0.5rem;">=> There are some + ways + parents can help children develop their interest in reading.</div>\n                        <div><strong>Cách 1:</strong> Firstly, parents should take children to the bookstores.</div>\n                      </div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Bảng hoàn thiện ý:</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(168,85,247,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Ý chính (Mindmap)</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Hoàn thiện ý (câu đầy đủ)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">Reduce stress</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">Reading helps people reduce stress</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">Improve memory</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">Reading books enables people to improve memory</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">Increase knowledge</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">Reading helps people increase knowledge</td>\n                </tr>\n                <tr>\n                  <td style="padding:1rem;vertical-align:top;">[Your own idea]</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">[Hoàn thiện ý của bạn]</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Phần 2: Follow-up questions</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(168,85,247,0.1);">\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Câu hỏi</th>\n                  <th style="padding:1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Cách trả lời</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">What are the differences between the kinds of books read by your parents\' generation and those read by your generation?</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>=> There are some + differences + between the kinds of books read by my parents\' generation and those read by my generation.</div>\n                    <div style="margin-top:0.5rem;">For example, my parents love reading novels, while I like reading comics.</div>\n                  </td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:1rem;vertical-align:top;">Do you think that the government should support free books for all people?</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>=> yes, i think + that the government should support free books for all people.</div>\n                    <div style="margin-top:0.5rem;">because...</div>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding:1rem;vertical-align:top;">In what ways can parents help children develop their interest in reading?</td>\n                  <td style="padding:1rem;vertical-align:top;font-size:0.85rem;">\n                    <div>=> There are some + ways + parents can help children develop their interest in reading.</div>\n                    <div style="margin-top:0.5rem;"><strong>Cách 1:</strong> Firstly, parents should take children to the bookstores.</div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  },

  // ===================== LESSON 3 =====================

  renderL3SpeakingReview: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. SPEAKING REVIEW + TỐI GIẢN B1</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Speaking Part 1 - <span class="zoom-term" data-zoom="A.R.E = Answer - Reason - Example">A.R.E</span></h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n            <div><strong>Answer:</strong> Trả lời trực tiếp, bám sát câu hỏi (like => love...)</div>\n            <div style="margin-top:0.5rem;"><strong>Reason:</strong> 1. it is fun and interesting</div>\n            <div style="margin-left:1rem;margin-bottom:0.5rem;">- physical health: it helps me to stay fit and healthy</div>\n            <div style="margin-left:1rem;margin-bottom:0.5rem;">- mental health:</div>\n            <div style="margin-left:2rem;">+ 3.1. i can relax after a day of hard work</div>\n            <div style="margin-left:2rem;">+ 3.2. it makes me feel relaxed and comfortable</div>\n            <div style="margin-left:2rem;">+ 3.3. it helps me to reduce stress</div>\n            <div style="margin-left:1rem;">- knowledge: it helps me to increase knowledge</div>\n          </div>\n          <div class="example-box">\n            <div style="font-style:italic;color:var(--text-muted);margin-bottom:0.5rem;">Ví dụ:</div>\n            <div>1. I ... with my friends and family</div>\n            <div style="font-style:italic;">ví dụ: I go shopping with my friends and family</div>\n            <div>2. I ... in my free time.</div>\n          </div>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-top:1rem;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(168,85,247,0.1);">\n                  <th style="padding:0.5rem 0.75rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">A</th>\n                  <th style="padding:0.5rem 0.75rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">R</th>\n                  <th style="padding:0.5rem 0.75rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">E</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.5rem 0.75rem;">1</td>\n                  <td style="padding:0.5rem 0.75rem;">Yes</td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.5rem 0.75rem;">2</td>\n                  <td style="padding:0.5rem 0.75rem;">2</td>\n                  <td style="padding:0.5rem 0.75rem;">Yes</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.5rem 0.75rem;">3</td>\n                  <td style="padding:0.5rem 0.75rem;">3.1</td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.5rem 0.75rem;">4</td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.5rem 0.75rem;">5</td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                </tr>\n                <tr>\n                  <td style="padding:0.5rem 0.75rem;">6</td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                  <td style="padding:0.5rem 0.75rem;"></td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Speaking Part 2</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-bottom:0.5rem;">\n            <div style="margin-bottom:0.5rem;"><strong>Bước 1:</strong> nhớ cấu trúc</div>\n            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">Intro, Body khen/chê, Kết luận</div>\n          </div>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n            <div style="font-weight:600;margin-bottom:0.5rem;"><strong>Intro:</strong></div>\n            <div>I am going to talk about the situation. [Đọc nguyên đề bài phần giới thiệu tình huống]</div>\n            <div style="margin-top:0.5rem;">All three options [liệt kê 3 sự lựa chọn] are reasonable but when choosing among three options, I believe that [option A] is the best choice because of the following reasons.</div>\n          </div>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n            <div style="font-weight:600;margin-bottom:0.5rem;"><strong>Body khen:</strong></div>\n            <div>- Firstly, it is convenient and suitable</div>\n            <div>- Secondly, it is good (for me/her/him/us)</div>\n            <div>- Thirdly, I/He/She like + phương án chọn</div>\n            <div>- Finally, it is + adj khen</div>\n            <div style="margin-top:0.5rem;">Therefore, they are the reasons why I agree with this solution.</div>\n          </div>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div style="font-weight:600;margin-bottom:0.5rem;"><strong>Body chê:</strong></div>\n            <div>And there are some reasons why I don\'t choose the other options.</div>\n            <div style="margin-top:0.5rem;">- [Option B] isn\'t my choice because it is boring and inconvenient. Moreover, I am not interested in + phương án B</div>\n            <div>- Finally, it is + adj chê</div>\n            <div style="margin-top:0.5rem;">- I don\'t think [option C] is the suitable choice because it lacks suitability and convenience. Moreover, I am not a big fan of + phương án C</div>\n            <div>- Finally, it is + adj chê</div>\n            <div style="margin-top:0.5rem;">Hence, (they are the reasons why) I do not agree with these solutions.</div>\n          </div>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n            <div style="font-weight:600;margin-bottom:0.5rem;"><strong>Kết luận:</strong></div>\n            <div>To sum up, if I were in the situation, I would go for [option A] because it is the most suitable.</div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Từ vựng đối lập</h3>\n          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;">\n            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:1rem;">\n              <div style="font-weight:700;color:#10b981;margin-bottom:0.5rem;">KHEN</div>\n              <div style="font-size:0.85rem;">\n                • <span class="interactive-term" data-explanation="tiết kiệm thời gian">time-saving</span><br>\n                • quick, fast<br>\n                • <span class="interactive-term" data-explanation="thuận lợi">convenient</span><br>\n                • cheap/ affordable<br>\n                • easy<br>\n                • quiet<br>\n                • interesting/fun<br>\n                • <span class="interactive-term" data-explanation="thông minh">smart</span><br>\n                • comfortable<br>\n                • effective<br>\n                • healthy<br>\n                • safe<br>\n                • clean/ hygienic<br>\n                • big/huge<br>\n                • practical\n              </div>\n            </div>\n            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.05));border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:1rem;">\n              <div style="font-weight:700;color:#ef4444;margin-bottom:0.5rem;">CHÊ</div>\n              <div style="font-size:0.85rem;">\n                • <span class="interactive-term" data-explanation="tốn thời gian">time-consuming</span><br>\n                • slow<br>\n                • <span class="interactive-term" data-explanation="bất lợi">inconvenient</span><br>\n                • expensive/ costly<br>\n                • difficult<br>\n                • noisy<br>\n                • boring<br>\n                • unpopular<br>\n                • uncomfortable<br>\n                • ineffective<br>\n                • unhealthy<br>\n                • unsafe<br>\n                • dirty/ not hygienic<br>\n                • small<br>\n                • impractical\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },


  renderL3WritingOverview: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. TỔNG QUAN VỀ WRITING - LETTER</h2>\n        \n        <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;margin-bottom:1.5rem;">\n          <table style="width:100%;border-collapse:collapse;">\n            <thead>\n              <tr style="background:rgba(59,130,246,0.1);">\n                <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Loại</th>\n                <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Thời lượng / Độ dài</th>\n                <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Chi tiết</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;"><strong>Letter</strong></td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">20 mins<br>120 words</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">\n                    <div style="margin-bottom:0.5rem;">• 2 dạng thư:</div>\n                    <div style="margin-left:0.5rem;">+ <span class="interactive-term" data-explanation="Thư thân mật, viết cho bạn bè">Informal</span> (Friend)</div>\n                    <div style="margin-left:0.5rem;">+ <span class="interactive-term" data-explanation="Thư trang trọng, viết cho người lạ hoặc cơ quan">Formal</span></div>\n                  </td>\n                </tr>\n                <tr>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;"><strong>Essay</strong></td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">40 mins<br>250 words</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">\n                    <div style="margin-bottom:0.5rem;">• 3 dạng luận:</div>\n                    <div style="margin-left:0.5rem;">+ Discussion bình thường</div>\n                    <div style="margin-left:0.5rem;">+ Opinion</div>\n                    <div style="margin-left:0.5rem;">+ Discussion đặc biệt</div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n        <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n          <div style="font-weight:600;margin-bottom:0.5rem;">Tiêu chí chấm Writing:</div>\n          <div>• Vocab</div>\n          <div>• Grammar</div>\n          <div>• Task fulfillment</div>\n          <div>• Organisation</div>\n        </div>\n      </div>\n    ';
  },

  renderL3InformalStructure: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. CẤU TRÚC THƯ INFORMAL - 5 PHẦN - SANDWICH</h2>\n        \n        <div style="display:flex;flex-direction:column;gap:1.5rem;">\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">1. Greeting</h3>\n            <div class="example-box">\n              <div>Dear + tên,</div>\n              <div style="font-style:italic;">Dear Jane, Dear Mary,</div>\n            </div>\n          </div>\n\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">2. Opening (hỏi han)</h3>\n            <div style="display:flex;flex-direction:column;gap:1rem;">\n              <div class="example-box">\n                <div style="font-weight:600;margin-bottom:0.5rem;">CÁCH 1:</div>\n                <div>I was very delighted to receive your letter. How have you been doing? I hope everything is going well with you. I am so sorry for not writing to you for so long because I have been working hard for the upcoming exam.</div>\n              </div>\n              <div class="example-box">\n                <div style="font-weight:600;margin-bottom:0.5rem;">CÁCH 2:</div>\n                <div>Getting your message made my day. How is life treating you? I trust everything is going smoothly. My apologies for the delay in writing; exam preparations have kept me occupied.</div>\n              </div>\n              <div class="example-box">\n                <div style="font-weight:600;margin-bottom:0.5rem;">CÁCH 3:</div>\n                <div>It brought me joy to hear from you. How have you been doing? I am sorry for not writing to you for a while due to the intense focus on preparing for the upcoming exams.</div>\n              </div>\n            </div>\n          </div>\n\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">3. Body</h3>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <div>- I am going to tell you about ...</div>\n              <div style="margin-top:0.5rem;"><strong>Trả lời các câu hỏi:</strong></div>\n              <div style="margin-left:0.5rem;">+ Hỏi chung chung: Tell me about your.../ Describe your => cấu trúc 5 câu: N - adj - V - important to me</div>\n              <div style="margin-left:0.5rem;">+ Hỏi chi tiết: Bám sát câu hỏi</div>\n            </div>\n          </div>\n\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">4. Ending (lý do dừng bút)</h3>\n            <div style="display:flex;flex-direction:column;gap:1rem;">\n              <div class="example-box">\n                <div style="font-weight:600;margin-bottom:0.5rem;">CÁCH 1:</div>\n                <div>That is all for now. Please give my love to your family and let them know I have been thinking of them. Drop me a line if you have a moment. I look forward to hearing from you.</div>\n              </div>\n              <div class="example-box">\n                <div style="font-weight:600;margin-bottom:0.5rem;">CÁCH 2:</div>\n                <div>That is it for now. Please send my regards to your family and tell them I have been remembering them. If you have a moment, send me a message. I cannot wait to hear from you.</div>\n              </div>\n              <div class="example-box">\n                <div style="font-weight:600;margin-bottom:0.5rem;">CÁCH 3:</div>\n                <div>That is the update from my side. Pass on my greetings to your family, and I\'m looking forward to catching up through your response.</div>\n              </div>\n            </div>\n          </div>\n\n          <div>\n            <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">5. Closing</h3>\n            <div class="example-box">\n              <div>Best regards,</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL3Topic1: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">ĐỀ 1: Write a letter to your friend to tell him/her about your hometown</h2>\n        <p style="color:var(--text-muted);margin-bottom:1rem;">= Tell me about your hometown. (Describe: mô tả)</p>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc 5 câu:</h3>\n          <div class="example-box">\n            <div>• I am going to tell you about my hometown.</div>\n            <div>• My hometown is a village.</div>\n            <div>• It is beautiful.</div>\n            <div>• You can visit famous places and enjoy delicious food.</div>\n            <div>• It is very important to me / I love it a lot / It means everything to me.</div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Mẫu câu trong bài</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(168,85,247,0.1);">\n                  <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Mẫu câu</th>\n                  <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(168,85,247,0.2);font-weight:600;">Cấu trúc ngữ pháp</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">I am going to tell you about my hometown.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">I am going to tell you about....</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">My hometown is a village.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">S + tobe + (a/an/the) N</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It is beautiful.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">S + tobe + adj</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(168,85,247,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">You can visit famous places and enjoy delicious food.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">You/People/It + can + V</td>\n                </tr>\n                <tr>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It is very important to me./ I love it a lot./ It means everything to me.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It is important to me./ It means everything to me./ I love it a lot.</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL3Topic2: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">ĐỀ 2: Thực hành - Tell me about your TV</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc 5 câu:</h3>\n          <div class="example-box">\n            <div>• I am going to tell you about my TV.</div>\n            <div>• It is a Samsung TV.</div>\n            <div>• It is modern.</div>\n            <div>• It can connect to the wifi.</div>\n            <div>• It is extremely important to me.</div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc ngữ pháp</h3>\n          <div style="background:var(--bg-input);border-radius:8px;overflow:hidden;">\n            <table style="width:100%;border-collapse:collapse;">\n              <thead>\n                <tr style="background:rgba(59,130,246,0.1);">\n                  <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Mẫu câu</th>\n                  <th style="padding:0.75rem 1rem;text-align:left;border-bottom:2px solid rgba(59,130,246,0.2);font-weight:600;">Cấu trúc</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">I am going to tell you about my TV.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">I am going to tell you about...</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It is a Samsung TV.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">S + tobe + (a/an/the) N</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It is modern.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">S + tobe + adj</td>\n                </tr>\n                <tr style="border-bottom:1px solid rgba(59,130,246,0.1);">\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It can connect to the wifi.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">S + can + V</td>\n                </tr>\n                <tr>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">It is extremely important to me.</td>\n                  <td style="padding:0.75rem 1rem;vertical-align:top;">S + tobe + <span class="interactive-term" data-explanation="adv quite, very, extremely dùng để nhấn mạnh tính từ">adv</span> + adj</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL3RealTest: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">ĐỀ 3: REAL TEST</h2>\n        <p style="color:var(--text-muted);margin-bottom:1rem;">You want to sell your television. You think a friend of yours might like to buy it from you.</p>\n        \n        <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-bottom:1.5rem;">\n          <div style="margin-bottom:0.5rem;"><strong>Write a letter to your friend, explain:</strong></div>\n          <div style="margin-left:0.5rem;">• Why you are selling the television</div>\n          <div style="margin-left:0.5rem;">• Describe the television</div>\n          <div style="margin-left:0.5rem;">• Suggest a date when your friend can come and see it.</div>\n          <div style="margin-top:0.5rem;color:var(--text-muted);font-size:0.85rem;">You should write at least 120 words.</div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Bước làm</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div>• <strong>B1:</strong> Informal</div>\n            <div>• <strong>B2:</strong> Viết học thuộc</div>\n            <div>• <strong>B3:</strong> Viết BODY ĐỦ - TRẢ LỜI HẾT CÂU HỎI</div>\n            <div>• <strong>B4:</strong> VIẾT BODY DÀI + HAY</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Chuỗi từ vựng</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div>• Thêm <span class="zoom-term" data-zoom="Reason - Example: đưa ra lý do và ví dụ để bài viết hay hơn">Reason - Example</span></div>\n            <div>• Thay từ rẻ = đắt</div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Chuỗi ngữ pháp</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div>• Bạn thân: adj + N, adv (quite, very, extremely) + adj, V + adv</div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Bài mẫu</h3>\n          <div class="example-box">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;"><strong>Greeting:</strong> Dear Linda,</div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;"><strong>Opening:</strong> I was very delighted to receive your letter. How have you been doing? I hope everything is going well with you.</div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;"><strong>Body:</strong> I am going to tell you about my TV.</div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Why you are selling the television:</strong> I am selling the television which I bought last year because it is <span class="zoom-term" data-zoom="quite = khá, dùng để nhấn mạnh tính từ">QUITE</span> small/ tiny.\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Describe the television:</strong> It is an <span class="zoom-term" data-zoom="expensive = đắt, từ vựng cao cấp hơn cheap">EXPENSIVE</span> Samsung TV. <span class="zoom-term" data-zoom="Moreover = Ngoài ra, liên từ nối câu">MOREOVER</span>, it is the most modern/ innovative/ cutting-edge TV that I have ever seen, <span class="zoom-term" data-zoom="SO = vì vậy, liên từ chỉ kết quả">SO</span> it can connect to the wifi <span class="zoom-term" data-zoom="QUICKLY = nhanh, dạng adv của quick">QUICKLY</span>.\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              You can watch YouTube and many programmes like Road to Olympia, the tennis face-off, and so on. By watching these programmes, I can broaden my horizons and perspectives about the world. <span class="zoom-term" data-zoom="MOREOVER = Ngoài ra">MOREOVER</span>, they also make me relaxed and comfortable after a day of hard work. You can watch online films. It is <span class="zoom-term" data-zoom="EXTREMELY = cực kỳ, dùng để nhấn mạnh tính từ">EXTREMELY</span> important/ vital to me.\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Suggest a date when your friend can come and see it:</strong> I suggest you come and see it on Sunday because we are both free/ available on that day. If you see it, I am sure that you will like it.\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;"><strong>Ending:</strong> That is all for now. Please give my love to your family and let them know I have been thinking of them. Drop me a line if you have a moment. I look forward to hearing from you.</div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;"><strong>Closing:</strong> Best regards,</div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL3WritingSteps: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. BƯỚC LÀM THƯ</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Các bước:</h3>\n          <div style="display:flex;flex-direction:column;gap:0.75rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #3b82f6;">\n              <div><strong>B1:</strong> Xác định dạng thư (Friend: Informal, Khác: Formal)</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #10b981;">\n              <div><strong>B2:</strong> Viết học thuộc (4/5: Greeting - Opening - Ending - Closing)</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #f59e0b;">\n              <div><strong>B3:</strong> Viết BODY ĐỦ - TRẢ LỜI HẾT CÂU HỎI => BÁM SÁT VÀO CÂU HỎI</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #ef4444;">\n              <div><strong>B4:</strong> VIẾT BODY DÀI + HAY</div>\n              <div style="margin-top:0.5rem;font-size:0.85rem;">\n                <div>+ Chuỗi từ vựng: Thêm Reason - Example, Thay từ rẻ = đắt</div>\n                <div>+ Chuỗi ngữ pháp:</div>\n                <div style="margin-left:0.5rem;">• Bạn thân: adj + N, adv (quite, very, extremely) + adj, V + adv</div>\n                <div style="margin-left:0.5rem;">• Liên từ: trong câu (and, but, so, because); ngoài câu (In addition, Moreover, Furthermore, To be more specific,...)</div>\n                <div style="margin-left:0.5rem;">• Đa dạng thì: QKD, HTĐ, TLĐ, HTHT (B1: 2 thì; B2: 4 thì)</div>\n                <div style="margin-left:0.5rem;">• Cấu trúc B2: Điều kiện, bị động, mệnh đề quan hệ, so sánh,...</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">TEST SPEAKING 3</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div style="color:var(--text-muted);">B4: FORMAL 1</div>\n            <div style="color:var(--text-muted);">L4: WRITING - LETTER - FORMAL</div>\n            <div style="color:var(--text-muted);">L5, L6, L7, L8, L9, L10...</div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL4FormalOverview: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. TỔNG QUAN THƯ FORMAL</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Thông tin cơ bản:</h3>\n          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Thời lượng</div>\n              <div style="font-size:1.2rem;color:var(--primary);">20 phút</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Độ dài</div>\n              <div style="font-size:1.2rem;color:var(--primary);">120 từ</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Tỷ lệ điểm</div>\n              <div style="font-size:1.2rem;color:var(--primary);">⅓ số điểm</div>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Tiêu chí chấm điểm:</h3>\n          <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">\n            <div style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(59,130,246,0.05));border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:0.75rem 1rem;">\n              <span class="zoom-term" data-zoom="VOCABULARY: Sử dụng từ vựng phong phú, chính xác và phù hợp với ngữ cảnh">Vocabulary</span>\n            </div>\n            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:0.75rem 1rem;">\n              <span class="zoom-term" data-zoom="GRAMMAR: Sử dụng ngữ pháp đúng, đa dạng cấu trúc câu">Grammar</span>\n            </div>\n            <div style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.05));border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:0.75rem 1rem;">\n              <span class="zoom-term" data-zoom="TASK FULFILLMENT: Trả lời đầy đủ và đúng yêu cầu của đề bài">Task Fulfillment</span>\n            </div>\n            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.05));border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:0.75rem 1rem;">\n              <span class="zoom-term" data-zoom="ORGANISATION: Cấu trúc bài viết logic,连贯, có liên kết tốt">Organisation</span>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Đặc điểm thư formal:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n            <div style="margin-bottom:0.5rem;"><strong>•</strong> Gửi cho <span class="interactive-term" data-explanation="Người lạ, không quen biết: người quản lý, khách hàng, nhà tuyển dụng...">người lạ</span></div>\n            <div style="margin-bottom:0.5rem;"><strong>•</strong> Ngôn ngữ trang trọng, lịch sự</div>\n            <div><strong>•</strong> Cấu trúc chuẩn mực, chuyên nghiệp</div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL4FormalStructure: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">2. CẤU TRÚC THƯ FORMAL - 5 PHẦN - SANDWICH</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Cấu trúc 5 phần:</h3>\n          <div style="display:flex;flex-direction:column;gap:1rem;">\n            <div style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(59,130,246,0.05));border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="GREETING: Phần chào hỏi đầu thư, sử dụng danh xưng trang trọng" style="font-size:1.2rem;font-weight:700;color:#3b82f6;margin-bottom:0.5rem;">1. Greeting</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Chào hỏi trang trọng</div>\n              <div style="font-size:0.85rem;">\n                <div>• Ko tên + Ko giới tính: <span class="interactive-term" data-explanation="Dùng khi không biết tên và giới tính người nhận">Dear Sir/Madam,</span></div>\n                <div>• Ko tên + biết giới tính: <span class="interactive-term" data-explanation="Dùng khi biết giới tính nhưng không biết tên">Dear Sir,</span> / <span class="interactive-term" data-explanation="Dùng khi biết giới tính nhưng không biết tên">Dear Madam,</span></div>\n                <div>• Có tên + giới tính: <span class="interactive-term" data-explanation="Dùng khi biết đầy đủ tên và giới tính">Dear Mr./ Ms. + danh xưng (họ tên),</span></div>\n              </div>\n            </div>\n            \n            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05));border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="OPENING: Phần mở đầu, giới thiệu bản thân và mục đích viết thư" style="font-size:1.2rem;font-weight:700;color:#10b981;margin-bottom:0.5rem;">2. Opening</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Giới thiệu bản thân + Mục đích viết thư</div>\n              <div style="font-size:0.85rem;">\n                <div style="margin-bottom:0.5rem;"><strong>Giới thiệu bản thân:</strong></div>\n                <div class="example-box" style="margin-bottom:0.5rem;">\n                  <div style="font-style:italic;">My name is Tony. I am 25 years old. I am from Hanoi, the capital city of Vietnam.</div>\n                </div>\n                <div style="margin-bottom:0.5rem;"><strong>Giới thiệu công việc:</strong></div>\n                <div class="example-box" style="margin-bottom:0.5rem;">\n                  <div style="font-style:italic;">I am a/an + job + working for.....</div>\n                  <div style="font-style:italic;">I am a teacher working for VSTEP EASY.</div>\n                </div>\n                <div style="margin-bottom:0.5rem;"><strong>Mục đích viết thư:</strong></div>\n                <div class="example-box">\n                  <div style="font-style:italic;">I am writing to V</div>\n                  <div style="font-style:italic;">• Thư trả lời thông tin: answer your questions / give you some information about...</div>\n                  <div style="font-style:italic;">• Thư phàn nàn: complain about... / express my dismay at...</div>\n                  <div style="font-style:italic;">• Thư xin việc: apply for the job / apply for the [Position Title] at [Company]</div>\n                </div>\n              </div>\n            </div>\n\n            <div style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.05));border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="BODY: Phần nội dung chính, trả lời các yêu cầu của đề bài" style="font-size:1.2rem;font-weight:700;color:#f59e0b;margin-bottom:0.5rem;">3. Body</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Nội dung chính - Trả lời yêu cầu đề bài</div>\n              <div style="font-size:0.85rem;">\n                <div>• <span class="interactive-term" data-explanation="Trả lời thông tin: Xác định câu hỏi - Trả lời chi tiết">Dạng 1: Trả lời thông tin</span></div>\n                <div>• <span class="interactive-term" data-explanation="Thư phàn nàn: Nêu lý do không hài lòng về service/products/staff/facilities">Dạng 2: Thư phàn nàn</span></div>\n                <div>• <span class="interactive-term" data-explanation="Thư xin việc: Giới thiệu bản thân, chứng minh suitability cho vị trí">Dạng 3: Thư xin việc</span></div>\n              </div>\n            </div>\n\n            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.05));border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="ENDING - THÔNG TIN LIÊN LẠC: Phần kết thúc, cung cấp thông tin liên lạc và mong nhận phản hồi" style="font-size:1.2rem;font-weight:700;color:#ef4444;margin-bottom:0.5rem;">4. Ending - Thông tin liên lạc</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Kết thúc + Thông tin liên lạc</div>\n              <div style="font-size:0.85rem;">\n                <div class="example-box" style="margin-bottom:0.5rem;">\n                  <div style="font-style:italic;">CÁCH 1:</div>\n                  <div style="font-style:italic;">If you have any questions or information, please contact me at [số điện thoại] or via [email]</div>\n                  <div style="font-style:italic;">I am looking forward to hearing from you. Please write to me soon.</div>\n                </div>\n                <div class="example-box">\n                  <div style="font-style:italic;">CÁCH 2:</div>\n                  <div style="font-style:italic;">Should you require any further information or have any questions, please do not hesitate to contact me at [số điện thoại] or via email at [email]</div>\n                  <div style="font-style:italic;">I am looking forward to hearing from you. Please write to me soon.</div>\n                </div>\n              </div>\n            </div>\n\n            <div style="background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(168,85,247,0.05));border:1px solid rgba(168,85,247,0.3);border-radius:8px;padding:1.25rem;">\n              <div class="zoom-term" data-zoom="CLOSING: Phần chào kết, dùng cụm từ trang trọng" style="font-size:1.2rem;font-weight:700;color:#a855f7;margin-bottom:0.5rem;">5. Closing</div>\n              <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Chào kết trang trọng</div>\n              <div class="example-box">\n                <div style="font-style:italic;">Best regards,</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL4FormalTypes: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">3. 3 DẠNG THƯ FORMAL</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Dạng 1: Thư trả lời thông tin</h3>\n          <div class="example-box" style="margin-bottom:1rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Đề bài:</strong> You got an email from a student asking about the summer language camps that you advertised in the last issue of NewsWeek. He asks you the following questions:\n            </div>\n            <div style="margin-left:1rem;">\n              <div>• How large are the groups of students?</div>\n              <div>• Are the students from different countries?</div>\n              <div>• Are the teachers native speakers?</div>\n              <div>• What activities are there in the programme?</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n              <strong>Đóng vai:</strong> <span class="interactive-term" data-explanation="Ban tổ chức trại hè ngôn ngữ">BTC trại hè ngôn ngữ</span> | <strong>Gửi cho:</strong> student\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n              <strong>Mục đích:</strong> trả lời thông tin\n            </div>\n          </div>\n\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-top:1rem;">\n            <div style="font-weight:600;margin-bottom:0.5rem;">Bước làm:</div>\n            <div style="font-size:0.85rem;">\n              <div>• <strong>B1:</strong> Formal - Thư trả lời thông tin (Đóng vai: BTC trại hè ngôn ngữ | Gửi cho: student)</div>\n              <div>• <strong>B2:</strong> Viết học thuộc</div>\n              <div>• <strong>B3:</strong> Viết BODY ĐỦ => XÁC ĐỊNH CÂU HỎI - TRẢ LỜI</div>\n            </div>\n          </div>\n\n          <div style="margin-top:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.75rem;">Chi tiết trả lời từng câu hỏi:</h4>\n            <div style="overflow-x:auto;">\n              <table class="compare-table">\n                <thead>\n                  <tr>\n                    <th>Câu hỏi trong đề</th>\n                    <th>Nội dung trả lời chi tiết</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td>How large are the groups of students?</td>\n                    <td>\n                      <div style="font-size:0.85rem;">\n                        There are 20 students in each group. To be more specific, they are <span class="interactive-term" data-explanation="freshmen = sinh viên năm nhất">freshmen</span>/ first-year students at Banking university.<br>\n                        They are <span class="zoom-term" data-zoom="VERY: intensifier nhấn mạnh, dùng để tăng mức độ tính từ">VERY</span> friendly and dynamic. They have been learning English for 3 years.\n                      </div>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>Are the students from different countries?</td>\n                    <td>\n                      <div style="font-size:0.85rem;">\n                        The students are from different countries. For example, they are Vietnamese, Korean, and Chinese. All of them like/ are <span class="interactive-term" data-explanation="keen on = thích, mến">keen on</span> learning English. They want/ desire to participate in the camps to <span class="interactive-term" data-explanation="improve = cải thiện, enhance = nâng cao">improve/ enhance</span> their English quickly.\n                      </div>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>Are the teachers native speakers?</td>\n                    <td>\n                      <div style="font-size:0.85rem;">\n                        The teachers are native speakers. For instance, they are from Ireland, America, and the UK. They are <span class="zoom-term" data-zoom="EXTREMELY: intensifier mạnh hơn VERY, nhấn mạnh mức độ cao nhất">EXTREMELY</span> helpful. They are <span class="interactive-term" data-explanation="willing/ eager = sẵn lòng, mong muốn">willing/ eager</span> to support students, and they have excellent/ good teaching methods.<br>\n                        They know how to motivate students to learn English better/ develop their English skills.\n                      </div>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>What activities are there in the programme?</td>\n                    <td>\n                      <div style="font-size:0.85rem;">\n                        There are many activities in the programme such as singing, dancing, and giving presentations. They are VERY/ EXTREMELY interesting and entertaining.<br>\n                        Participating in these activities is good for/ beneficial to students\' mental health. This is because/ this is due to the fact that they can <span class="interactive-term" data-explanation="reduce stress = giảm stress, recharge their batteries = nạp lại năng lượng">reduce stress/ recharge their batteries</span> and relax their mind. Additionally/ In addition/ Moreover, these activities also help students increase their knowledge. They can improve/ develop their English skills more effectively and quickly. If you take part in the camp, I am sure that you will like it.\n                      </div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n\n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Dạng 2: Thư phàn nàn</h3>\n          <div class="example-box" style="margin-bottom:1rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Đề bài:</strong> You and your friends recently had dinner in a restaurant and you were not satisfied with the food, service as well as the staff. Write a letter to the manager and explained:\n            </div>\n            <div style="margin-left:1rem;">\n              <div>• what you were not happy about</div>\n              <div>• whether you are going to ask for a refund</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n              <strong>Đóng vai:</strong> <span class="interactive-term" data-explanation="Khách hàng của nhà hàng">khách hàng</span> | <strong>Gửi cho:</strong> quản lý nhà hàng\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n              <strong>Mục đích:</strong> phàn nàn\n            </div>\n          </div>\n\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-top:1rem;">\n            <div style="font-weight:600;margin-bottom:0.5rem;">Bước làm:</div>\n            <div style="font-size:0.85rem;">\n              <div>• <strong>B1:</strong> Formal - Thư phàn nàn</div>\n              <div>• <strong>B2:</strong> Viết học thuộc</div>\n            </div>\n          </div>\n\n          <div style="margin-top:1.5rem;">\n            <h4 style="font-size:1rem;margin-bottom:0.75rem;">Chi tiết triển khai:</h4>\n            <div style="overflow-x:auto;">\n              <table class="compare-table">\n                <thead>\n                  <tr>\n                    <th>Nội dung yêu cầu</th>\n                    <th>Chi tiết triển khai</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td>what you were not happy about</td>\n                    <td>\n                      <div style="font-size:0.85rem;">\n                        I was not happy about the food, service as well as the staff.<br>\n                        <strong style="color:var(--accent);">• food:</strong> I was deeply dissatisfied with the food. The salad was not fresh. The soup was salty. I had a stomach ache after having dinner at your restaurant.<br>\n                        <strong style="color:var(--accent);">• service:</strong> Additionally, I was not satisfied with the service because it was bad/ terrible. To be more specific, the food was served 30 minutes after being ordered.<br>\n                        <strong style="color:var(--accent);">• staff:</strong> I was shocked to see that the staff was unfriendly and slow/ <span class="interactive-term" data-explanation="impolite = bất lịch sự">impolite</span>. This is because the waiter showed us the menu without saying anything. Besides, they spilled wine on my friend\'s T-shirt without saying sorry.<br>\n                        <strong style="color:var(--accent);">• facilities:</strong> I was not happy about the facilities. There was no wifi in your restaurant. It was not convenient for us. It was very hot because the air-conditioner was broken.\n                      </div>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>whether you are going to ask for a refund</td>\n                    <td>\n                      <div style="font-size:0.85rem;">\n                        <strong>C1.</strong> I am not going to ask for a refund. I just would like you to improve your service.<br>\n                        <strong>C2.</strong> I would like to request that you send me a replacement/ give a full refund.<br>\n                        <strong>CHÓT:</strong> I trust that you will use this feedback constructively to enhance customer satisfaction.\n                      </div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n          \n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);margin-top:1rem;">\n            <div style="font-weight:600;margin-bottom:0.5rem;">Tư duy thư phàn nàn:</div>\n            <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Nội dung BODY CHÊ - 3 mảng chê:</div>\n            <div style="font-size:0.85rem;">\n              <div>• <span class="interactive-term" data-explanation="Chê về chất lượng sản phẩm/dịch vụ">Service / Products</span></div>\n              <div>• <span class="interactive-term" data-explanation="Chê về thái độ nhân viên">Staff</span></div>\n              <div>• <span class="interactive-term" data-explanation="Chê về cơ sở vật chất">Facilities</span></div>\n            </div>\n            <div style="margin-top:0.75rem;font-size:0.85rem;">\n              <div style="font-weight:600;margin-bottom:0.5rem;">Cách chê:</div>\n              <div>+ I was not happy about ...</div>\n              <div>+ I was deeply dissatisfied with ...</div>\n              <div>+ I was shocked to see that ....</div>\n              <div>+ It is/was + adj chê</div>\n              <div>+ I was not satisfied with ...</div>\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Dạng 3: Thư xin việc</h3>\n          <div class="example-box" style="margin-bottom:1rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-bottom:0.5rem;">\n              <strong>Đề bài:</strong> You are looking for the position - vị trí of an English teacher. Write a letter to an English center manager and tell him:\n            </div>\n            <div style="margin-left:1rem;">\n              <div>• Introduce yourself</div>\n              <div>• Prove that you are suitable for the job</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n              <strong>Đóng vai:</strong> <span class="interactive-term" data-explanation="Người đang tìm việc làm">người xin việc</span> | <strong>Gửi cho:</strong> nhân sự\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:0.5rem;">\n              <strong>Mục đích:</strong> xin việc\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL4SpeakingSimplification: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. TỐI GIẢN B2 - SPEAKING</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Speaking Part 1:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div style="margin-bottom:0.5rem;"><strong>Answer:</strong> obviously/ absolutely yes, definitely no, of course, certainly, To be honest, Frankly speaking, honestly, well</div>\n            <div style="margin-bottom:0.5rem;"><strong>Like:</strong> be crazy about, be a big fan of, be passionate about, be interested in</div>\n            <div style="margin-bottom:0.5rem;"><strong>1. Physical health:</strong> This is because it is beneficial to my physical health. To be more specific, (topic) helps/ enables/ allows me to keep fit and stay healthy. Furthermore/ Moreover/ Additionally, I can strengthen my immune system and get into good shape.</div>\n            <div style="margin-bottom:0.5rem;"><strong>2. Mental health:</strong> Because it is advantageous to my mental health. It makes me feel refreshed and peaceful. In addition, I can recharge my batteries and elevate my mood after a day of hard work.</div>\n            <div style="margin-bottom:0.5rem;"><strong>3. Knowledge:</strong> Topic gives me the opportunity to increase knowledge and broaden my horizons and perspectives about the world. I am able to gain/obtain a deeper understanding of people/ culture/ tradition in different countries.</div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Speaking Part 2:</h3>\n          <div class="example-box">\n            <div style="font-style:italic;margin-bottom:0.5rem;"><strong>Intro:</strong> I am going to talk about the situation. Choosing from the three available options, I believe that [Option A] is the optimal because it is supported by a number of following reasons.</div>\n            <div style="font-style:italic;margin-bottom:0.5rem;"><strong>Body KHEN:</strong> In the first place, it is convenient and suitable because [KHEN 1]. Secondly, this option may bring me/him/them a wide range of benefits because [KHEN 2]. Furthermore, after making comparisons among three ideas, I think that I/she/he/they would prefer + phương án em chọn because of its merits. Finally, it is + adj khen [KHEN 3]. Therefore, they are the reasons why I agree with this solution.</div>\n            <div style="font-style:italic;"><strong>Body CHÊ:</strong> Regarding the other options, they are not my choices because of their own drawbacks. I am not in favor of [Option B] because it is boring and inconvenient. On top of that, a second minus point could be that I am not interested in + phương án. Finally, it is + adj chê (mở rộng R-E). Similarly, although [option C] sounds interesting, I do not support this solution as it lacks convenience and suitability. Additionally, I am not a big fan of + phương án e k chọn due to its demerits. Finally, it is + adj chê (mở rộng R-E). Hence, they are the reasons why I do not agree with these solutions.</div>\n          </div>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;margin-top:1rem;">\n            <div style="font-weight:600;">ĐỂ ĐẠT B2: cần 8 câu tự lên ý tưởng</div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL4Speaking3: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">Speaking 3</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">CẤU TRÚC BÀI NÓI HOÀN CHỈNH</h3>\n          <div style="overflow-x:auto;">\n            <table class="compare-table">\n              <thead>\n                <tr>\n                  <th>Phần</th>\n                  <th>Nội dung bài nói</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>Mở bài</td>\n                  <td style="font-size:0.85rem;">It is the fact that ... plays/play an important role in our lives. Nowadays, an increasing number of people are concerned about ... I am going to talk about the topics [Nhắc lại topic nguyên của đề bài]</td>\n                </tr>\n                <tr>\n                  <td>Thân bài</td>\n                  <td style="font-size:0.85rem;">[Ý chính 1 + lý do/ ví dụ 1] Firsty, It is obvious that [hoàn thiện ý chính 1] because ... Therefore, it is (not) good for......... [Ý chính 2 + lý do/ ví dụ 2] Secondly, it is the fact that [hoàn thiện ý chính 2] For example,....... Hence, it is beneficial to/ harmful to people [Ý chính 3 + lý do/ ví dụ 3] Finally, we cannot deny that ......... [hoàn thiện ý chính 3] This is because ... So/Thus, it has positive/negative effects on....... I think three ideas above are comprehensive, I cannot think of other ideas.</td>\n                </tr>\n                <tr>\n                  <td>Kết bài</td>\n                  <td style="font-size:0.85rem;">To sum up, I strongly believe that [Nhắc lại topic nguyên của đề bài]</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Hoàn thiện ý:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n            <div style="margin-bottom:0.5rem;"><strong>Câu kết sau phát triển ý:</strong></div>\n            <div style="margin-left:1rem;margin-bottom:0.25rem;">- People can + V + ()</div>\n            <div style="margin-left:1rem;margin-bottom:0.25rem;">- S + helps people + V</div>\n            <div style="margin-left:1rem;margin-bottom:0.25rem;">- People can have + adj + N.</div>\n            <div style="margin-left:1rem;margin-bottom:0.25rem;">- Biến N thành V</div>\n            <div style="margin-left:1rem;margin-bottom:0.25rem;">- Thêm V đi với N</div>\n            <div style="margin-left:1rem;margin-bottom:0.75rem;">- Topic + is + adj</div>\n            <div style="margin-bottom:0.5rem;">Therefore / It is (not) good for them/people</div>\n            <div style="margin-bottom:0.5rem;">Hence / It is beneficial to/ harmful to them.</div>\n            <div style="margin-bottom:0.5rem;">So / It has a positive/negative effect on people.</div>\n            <div style="margin-bottom:0.5rem;">- Phát triển ý 1: đưa REASON + EXAMPLE</div>\n            <div style="margin-bottom:0.5rem;">- Phát triển ý 2</div>\n            <div>- Phát triển ý 3</div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderL4InformalRevision: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">1. INFORMAL REVISION</h2>\n        <div style="background:var(--bg-input);padding:1rem;border-radius:8px;">\n          <div style="margin-bottom:0.5rem;"><strong>- Cấu trúc:</strong> 5 phần - SANDWICH</div>\n          <div style="margin-bottom:0.5rem;"><strong>- Greeting:</strong> Dear + tên,</div>\n          <div style="margin-bottom:0.5rem;"><strong>- Opening:</strong> hỏi han (3 cách: chọn 1/3 cách)</div>\n          <div style="margin-bottom:0.5rem;"><strong>- Body:</strong></div>\n          <div style="margin-left:1rem;margin-bottom:0.25rem;">I am going to tell you about....</div>\n          <div style="margin-left:1rem;margin-bottom:0.25rem;">- chung chung: áp dụng cấu trúc 5 câu</div>\n          <div style="margin-left:1rem;margin-bottom:0.5rem;">- chi tiết: bám sát vào câu hỏi => trả lời hết câu hỏi</div>\n          <div style="margin-bottom:0.5rem;"><strong>- Ending:</strong> lý do dừng bút (3 cách: chọn 1/3 cách)</div>\n          <div style="margin-bottom:0.5rem;"><strong>- Closing:</strong> Best regards,</div>\n          <div><strong>- Bước làm</strong></div>\n        </div>\n      </div>\n    ';
  },

  renderL4SpeakingFixB1: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">SPEAKING PART 3 - B1</h2>\n        <div style="overflow-x:auto;">\n          <table class="compare-table">\n            <thead>\n              <tr>\n                <th>Phần</th>\n                <th>CẤU TRÚC BÀI NÓI HOÀN CHỈNH</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Mở bài</td>\n                <td style="font-size:0.85rem;">It is the fact that living (alone) plays an important role in our lives. Nowadays, an increasing number of people are concerned about living alone. I am going to talk about the topic [There are some benefits of living alone for students].</td>\n              </tr>\n              <tr>\n                <td>Thân bài</td>\n                <td style="font-size:0.85rem;">Firstly, It is obvious that [Living alone is independent]. This is because when they live alone, they feel more comfortable. Therefore, it is good for students. Secondly, it is the fact that [Living alone is free]. It makes them happier. Hence, it is beneficial to people. Finally, we cannot deny that [Living alone is peaceful]. This is because when people live alone, it is quiet. Thus, it has positive effects on students. I think the three ideas above are comprehensive, I cannot think of other ideas.</td>\n              </tr>\n              <tr>\n                <td>Kết bài</td>\n                <td style="font-size:0.85rem;">To sum up, I strongly believe that [There are some benefits of living alone for students].</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    ';
  },

  renderL4FormalSteps: function () {
    return '\n      <div class="glass-card" style="margin-bottom:1.5rem;padding:1.5rem;">\n        <h2 style="font-size:1.3rem;margin-bottom:1rem;color:var(--accent);">4. BƯỚC LÀM THƯ</h2>\n        \n        <div style="margin-bottom:1.5rem;">\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Các bước:</h3>\n          <div style="display:flex;flex-direction:column;gap:0.75rem;">\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #3b82f6;">\n              <div><strong>B1:</strong> Xác định dạng thư (Người nhận)</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #10b981;">\n              <div><strong>B2:</strong> Viết học thuộc (⅔ phần)</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #f59e0b;">\n              <div><strong>B3:</strong> Viết BODY ĐỦ => TRẢ LỜI HẾT TẤT CẢ CÁC CÂU HỎI</div>\n            </div>\n            <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid #ef4444;">\n              <div><strong>B4:</strong> Viết BODY DÀI + HAY</div>\n              <div style="margin-top:0.5rem;font-size:0.85rem;">\n                <div>+ <span class="interactive-term" data-explanation="Chuốt từ vựng: Thêm Reason - Example để giải thích rõ hơn, thay từ đơn giản bằng từ cao cấp">Chuốt từ vựng</span>: Thêm R-E, Thay từ "rẻ" = "đắt"</div>\n                <div>+ <span class="interactive-term" data-explanation="Chuốt ngữ pháp: Sử dụng cấu trúc câu phức tạp hơn">Chuốt ngữ pháp</span>: Bạn thân (adj + N, adv + adj,...), Liên từ (trong/ ngoài), Đa dạng thì (QKĐ, HTĐ, TLĐ, HTHT; B1: 2 thì, B2: 4 thì), Cấu trúc B2 (Bị động, điều kiện, mệnh đề quan hệ,...)</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div>\n          <h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Lưu ý quan trọng:</h3>\n          <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border-left:3px solid var(--accent);">\n            <div style="margin-bottom:0.5rem;"><strong>•</strong> <span class="zoom-term" data-zoom="BÁM SÁT CÂU HỎI: Trả lời đúng và đủ những gì đề bài yêu cầu">BÁM SÁT CÂU HỎI</span> - Trả lời đúng và đủ yêu cầu</div>\n            <div style="margin-bottom:0.5rem;"><strong>•</strong> Giữ nguyên format bảng nếu có trong đề</div>\n            <div><strong>•</strong> LUÔN LUÔN XÓA số điện thoại, chữ "BẢNG VẼ XXX" khỏi bài viết</div>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderCardGrid: function () {
    var modeCards = this.modes.map(function (m) {
      return '\n        <div class="mode-card" onclick="LearnView.launchMode(\'' + m.id + '\')">\n          <div class="mode-card-icon">' + m.icon + '</div>\n          <div class="mode-card-title">' + m.title + '</div>\n          <div class="mode-card-desc">' + m.desc + '</div>\n          <button class="btn btn-primary" style="margin-top:auto;width:100%;">B\u1eaft \u0111\u1ea7u</button>\n        </div>\n      ';
    }).join("");

    return '\n      <div class="mode-grid">\n        ' + modeCards + '\n        <div class="mode-card" onclick="LearnView.launchMode(\'grammar\')" style="border-color:rgba(168,85,247,0.3);">\n          <div class="mode-card-icon" style="background:rgba(168,85,247,0.15);">\uD83D\uDCD0</div>\n          <div class="mode-card-title">Ng\u1eef ph\xe1p</div>\n          <div class="mode-card-desc">\xD4n t\u1eadp ng\u1eef ph\xe1p ti\u1ebfng Anh so s\xe1nh v\u1edbi ti\u1ebfng Vi\u1ec7t.</div>\n          <button class="btn btn-accent" style="margin-top:auto;width:100%;">Xem ngay</button>\n        </div>\n      </div>\n    ';
  },

  renderActiveMode: function () {
    var filtered = this.getFilteredVocab();
    if (filtered.length === 0 && this.activeMode !== "grammar") {
      return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">Kh\xf4ng t\xecm th\u1ea5y t\u1eeb v\u1ef1ng n\xe0o. Vui l\xf2ng ch\u1ecdn b\u1ed9 l\u1ecdc kh\xe1c.</div>';
    }
    var backBtn = '<button class="btn btn-secondary" style="margin-bottom:1rem;font-size:0.85rem;" onclick="LearnView.backToGrid()">\u2190 Quay l\u1ea1i</button>';
    var modeContent = "";
    switch (this.activeMode) {
      case "flashcard": modeContent = this.renderFlashcard(filtered); break;
      case "match": modeContent = this.renderMatchGame(filtered); break;
      case "quiz": modeContent = this.renderVocabQuiz(filtered); break;
      case "wordlist": modeContent = this.renderWordList(filtered); break;
      case "typing": modeContent = this.renderTyping(filtered); break;
      case "listening": modeContent = this.renderListening(filtered); break;
      case "shuffle": modeContent = this.renderShuffle(filtered); break;
      case "grammar": modeContent = this.renderGrammarTab(); break;
    }
    return backBtn + modeContent;
  },

  launchMode: function (mode) {
    // Save current mode's state before switching
    if (this.activeMode && this.activeMode !== mode) {
      this.saveLearnState(this.activeMode);
    }
    
    this.activeMode = mode;
    
    // Try to load saved state for the new mode
    var hasSavedState = this.loadLearnState(mode);
    
    // If no saved state, reset to default
    if (!hasSavedState) {
      switch (mode) {
        case "flashcard":
          this.flashcardIndex = 0;
          break;
        case "match":
          this.matchState = { cards: [], flipped: [], matched: [], lock: false };
          break;
        case "quiz":
          this.practiceState = { currentQuestion: 0, score: 0, answered: false, questions: [] };
          break;
        case "typing":
          this.typingState = { items: [], current: 0, score: 0, answered: false };
          break;
        case "listening":
          this.listenState = { items: [], current: 0, score: 0, answered: false };
          break;
        case "shuffle":
          this.shuffleState = { items: [], current: 0, score: 0, answered: false, picked: [] };
          break;
        case "grammar":
        case "wordlist":
          // No state to reset for these modes
          break;
      }
    }
    
    this.refreshView();
  },

  backToGrid: function () {
    if (this.activeMode) {
      this.saveLearnState(this.activeMode);
    }
    this.activeMode = null;
    this.refreshView();
  },

  refreshView: function () {
    var el = document.getElementById("main-content");
    if (el) el.innerHTML = this.render();
    this.bindEvents();
  },

  openLesson: function (lessonId, sectionId) {
    if (lessonId === 1 || lessonId === 2 || lessonId === 3 || lessonId === 4 || lessonId === 5 || lessonId === 6 || lessonId === 7 || lessonId === 8 || lessonId === 9 || lessonId === 10 || lessonId === 11 || lessonId === 13 || lessonId === 14 || lessonId === 15) {
      this.currentSection = "lesson";
      this.activeLesson = lessonId;
      this.activeSectionId = sectionId || null;
      Navbar.update();
      this.refreshView();
    } else {
      var lessonData = window['Lesson' + lessonId + 'Data'];
      this.showToast((lessonData ? lessonData.title : "Lesson " + lessonId) + " s\u1ebd \u0111\u01b0\u1ee3c ph\u00e1t tri\u1ec3n trong th\u1eddi gian t\u1edbi.");
    }
  },

  showToast: function (msg) {
    var existing = document.getElementById("learn-toast");
    if (existing) existing.remove();
    var t = document.createElement("div");
    t.id = "learn-toast";
    t.style.cssText =
      "position:fixed;z-index:99999;left:50%;bottom:2rem;transform:translateX(-50%);" +
      "background:var(--bg-panel-solid);border:1px solid var(--border-color);border-radius:10px;" +
      "padding:0.7rem 1.2rem;font-size:0.85rem;box-shadow:0 8px 30px rgba(0,0,0,0.35);max-width:90vw;";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 3000);
  },

  // ===================== FLASHCARD =====================

  renderFlashcard: function (filtered) {
    if (this.flashcardIndex >= filtered.length) this.flashcardIndex = 0;
    var item = filtered[this.flashcardIndex];
    if (!item) return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">Kh\xf4ng c\xf3 t\u1eeb v\u1ef1ng.</div>';
    var learned = this.isLearned(item.id);
    var learnedBtn = learned
      ? '<button class="btn" style="background:rgba(16,185,129,0.15);border:1px solid var(--accent);color:var(--accent);font-size:0.85rem;padding:0.5rem 1rem;" onclick="LearnView.toggleFlashcardLearned()">\u2705 \u0110\xe3 h\u1ecdc</button>'
      : '<button class="btn btn-secondary" style="font-size:0.85rem;padding:0.5rem 1rem;" onclick="LearnView.toggleFlashcardLearned()">\uD83D\uDCD6 \u0110\xe1nh d\u1ea5u \u0111\xe3 h\u1ecdc</button>';
    return '\n      <div style="text-align:center;margin-bottom:1rem;">\n        <span style="font-size:0.85rem;color:var(--text-muted);">' + (this.flashcardIndex + 1) + ' / ' + filtered.length + ' \u2022 <span class="badge badge-level" style="font-size:0.7rem;">' + item.level + '</span> \u2022 <span style="font-size:0.75rem;color:var(--text-muted);background:var(--bg-input);padding:0.15rem 0.5rem;border-radius:4px;">' + item.topic + '</span></span>\n      </div>\n      <div class="game-flashcard" id="learn-flashcard" onclick="LearnView.flipFlashcard()">\n        <div class="game-flashcard-inner" id="learn-fc-inner">\n          <div class="game-flashcard-front">\n            <div class="game-fc-badge">\uD83C\uDDFB\uD83C\uDDF3 Ti\u1ebfng Vi\u1ec7t</div>\n            <div class="game-fc-word">' + item.meaningVi + '</div>\n            <div class="game-fc-hint">\uD83D\uDC46 Nh\u1ea5n \u0111\u1ec3 xem ti\u1ebfng Anh</div>\n          </div>\n          <div class="game-flashcard-back">\n            <div class="game-fc-badge">\uD83C\uDDEC\uD83C\uDDE7 English</div>\n            <div class="game-fc-word">' + item.word + '</div>\n            <div class="game-fc-ipa">' + item.ipa + '</div>\n            <div class="game-fc-example">"' + item.example + '"</div>\n            <button class="pronounce-btn" style="margin-top:0.5rem;display:inline-flex;align-items:center;gap:0.3rem;" onclick="event.stopPropagation();App.speak(\'' + LearnView.escJs(item.word) + '\',\'en\')">\uD83D\uDD0A Nghe ph\xe1t \xe2m</button>\n          </div>\n        </div>\n      </div>\n      <div style="display:flex;justify-content:center;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">\n        <button class="btn btn-secondary" style="font-size:0.9rem;padding:0.6rem 1.2rem;" onclick="LearnView.navFlashcard(-1)">\u25C0 Tr\u01b0\u1edbc</button>\n        ' + learnedBtn + '\n        <button class="btn btn-primary" style="font-size:0.9rem;padding:0.6rem 1.2rem;" onclick="LearnView.navFlashcard(1)">Sau \u25B6</button>\n      </div>\n    ';
  },

  flipFlashcard: function () {
    var inner = document.getElementById("learn-fc-inner");
    if (inner) inner.classList.toggle("flipped");
  },

  navFlashcard: function (dir) {
    var filtered = this.getFilteredVocab();
    this.flashcardIndex = (this.flashcardIndex + dir + filtered.length) % filtered.length;
    this.saveLearnState('flashcard');
    this.refreshView();
  },

  toggleFlashcardLearned: function () {
    var filtered = this.getFilteredVocab();
    if (!filtered.length) return;
    var item = filtered[this.flashcardIndex];
    this.toggleLearned(item.id);
    this.refreshView();
  },

  // ===================== MATCHING =====================

  renderMatchGame: function (filtered) {
    if (!this.matchState.cards || this.matchState.cards.length === 0) {
      this.initMatchGame(filtered);
    }
    var cards = this.matchState.cards;
    var gridHtml = cards.map(function (c, i) {
      var flipped = c.flipped || c.matched;
      var matched = c.matched;
      var cls = "match-card";
      if (flipped) cls += " flipped";
      if (matched) cls += " matched";
      return '<div class="' + cls + '" id="mc-' + i + '" onclick="LearnView.flipMatchCard(' + i + ')"><div class="match-card-inner"><div class="match-card-front">\u2753</div><div class="match-card-back">' + c.text + '</div></div></div>';
    }).join("");
    var matchedCount = cards.filter(function (c) { return c.matched; }).length;
    var totalPairs = cards.length / 2;
    var matchedPairs = matchedCount / 2;
    return '\n      <div style="text-align:center;color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">\n        Gh\xe9p c\u1eb7p t\u1eeb v\u1ef1ng Vi\u1ec7t-Anh \u2022 \u0110\xe3 gh\xe9p: <strong style="color:var(--accent);">' + matchedPairs + '/' + totalPairs + '</strong>\n        ' + (matchedPairs === totalPairs ? '\u2022 <button class="btn btn-accent" style="font-size:0.8rem;padding:0.3rem 0.8rem;" onclick="LearnView.resetMatchGame()">\uD83D\uDD04 Ch\u01a1i l\u1ea1i</button>' : '') + '\n      </div>\n      <div class="match-grid" id="match-grid">' + gridHtml + '</div>\n    ';
  },

  initMatchGame: function (filtered) {
    var count = Math.min(filtered.length, 8);
    var picked = filtered.sort(function () { return Math.random() - 0.5; }).slice(0, count);
    var cards = [];
    picked.forEach(function (w) {
      cards.push({ id: w.id, pairId: w.id, text: w.meaningVi, type: "vi", flipped: false, matched: false });
      cards.push({ id: w.id + "-en", pairId: w.id, text: w.word, type: "en", flipped: false, matched: false });
    });
    cards = cards.sort(function () { return Math.random() - 0.5; });
    this.matchState = { cards: cards, flipped: [], matched: [], lock: false };
  },

  resetMatchGame: function () {
    this.matchState = { cards: [], flipped: [], matched: [], lock: false };
    this.refreshView();
  },

  renderMatchGrid: function () {
    var grid = document.getElementById("match-grid");
    if (!grid) return;
    var cards = this.matchState.cards;
    grid.innerHTML = cards.map(function (c, i) {
      var cls = "match-card";
      if (c.flipped) cls += " flipped";
      if (c.matched) cls += " matched";
      return '<div class="' + cls + '" onclick="LearnView.flipMatchCard(' + i + ')"><div class="match-card-inner"><div class="match-card-front">\u2753</div><div class="match-card-back">' + c.text + '</div></div></div>';
    }).join("");
  },

  flipMatchCard: function (idx) {
    var ms = this.matchState;
    if (ms.lock) return;
    var card = ms.cards[idx];
    if (card.flipped || card.matched) return;
    card.flipped = true;
    ms.flipped.push(idx);
    this.saveLearnState('match');
    if (ms.flipped.length === 2) {
      var c1 = ms.cards[ms.flipped[0]];
      var c2 = ms.cards[ms.flipped[1]];
      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        c1.matched = true; c2.matched = true; ms.flipped = []; App.addXp(5);
        var allMatched = ms.cards.every(function (c) { return c.matched; });
        if (allMatched) setTimeout(function () { alert("\uD83C\uDF89 Ho\xe0n th\xe0nh! +" + (ms.cards.length / 2 * 5) + " XP"); }, 300);
      } else {
        ms.lock = true;
        setTimeout(function () {
          if (ms.flipped[0] !== undefined && ms.cards[ms.flipped[0]]) ms.cards[ms.flipped[0]].flipped = false;
          if (ms.flipped[1] !== undefined && ms.cards[ms.flipped[1]]) ms.cards[ms.flipped[1]].flipped = false;
          ms.flipped = []; ms.lock = false;
          LearnView.renderMatchGrid();
        }, 800);
      }
    }
    this.renderMatchGrid();
  },

  // ===================== QUIZ =====================

  renderVocabQuiz: function (filtered) {
    var qs = this.practiceState;
    if (!qs.questions || qs.questions.length === 0) {
      qs.questions = this.buildPracticeQuestions();
      qs.currentQuestion = 0; qs.score = 0; qs.answered = false;
    }
    if (!qs.questions || qs.questions.length === 0) {
      return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">C\u1ea7n \xedt nh\u1ea5t 4 t\u1eeb ph\xf9 h\u1ee3p b\u1ed9 l\u1ecdc hi\u1ec7n t\u1ea1i. Vui l\xf2ng ch\u1ecdn b\u1ed9 l\u1ecdc kh\xe1c ho\u1eb7c l\u01b0u th\xeam t\u1eeb.</div>';
    }
    if (qs.currentQuestion >= qs.questions.length) {
      var pct = Math.round((qs.score / qs.questions.length) * 100);
      return '\n        <div class="practice-container">\n          <div class="glass-card practice-card text-center" style="align-items:center;">\n            <div style="font-size:4rem;">' + (pct >= 80 ? "\uD83C\uDF89" : pct >= 50 ? "\uD83D\uDC4D" : "\uD83D\uDCDA") + '</div>\n            <h2 style="font-size:1.8rem;">K\u1ebft qu\u1ea3</h2>\n            <div class="score-badge-circle" style="font-size:1.4rem;">' + qs.score + '/' + qs.questions.length + '</div>\n            <p style="color:var(--text-muted);">\u0110\u1ea1t <strong style="color:var(--primary);">' + pct + '%</strong> s\u1ed1 c\xe2u \u0111\xfang.</p>\n            <div style="display:flex;gap:1rem;margin-top:1rem;">\n              <button class="btn btn-primary" onclick="LearnView.restartQuiz()">\uD83D\uDD04 L\xe0m l\u1ea1i</button>\n              <button class="btn btn-secondary" onclick="LearnView.launchMode(\'flashcard\')">\uD83D\uDCC7 \xD4n Flashcard</button>\n            </div>\n          </div>\n        </div>';
    }
    var q = qs.questions[qs.currentQuestion];
    return '\n      <div class="practice-container">\n        <div class="glass-card practice-card">\n          <div class="practice-progress">C\xe2u ' + (qs.currentQuestion + 1) + ' / ' + qs.questions.length + ' \u2022 \u0110\xfang: ' + qs.score + '</div>\n          <div class="practice-question">' + q.question + '</div>\n          <div class="practice-options">\n            ' + q.options.map(function (opt, i) { return '<button class="option-btn" id="lq-opt-' + i + '" onclick="LearnView.checkPracticeAnswer(' + i + ')">' + opt + '</button>'; }).join("") + '\n          </div>\n          <div id="learn-practice-explain" style="margin-top:1rem;"></div>\n          <div style="display:flex;justify-content:flex-end;margin-top:1rem;">\n            <button id="learn-next-btn" class="btn btn-primary hidden" onclick="LearnView.nextPracticeQuestion()">C\xe2u ti\u1ebfp theo \u2192</button>\n          </div>\n        </div>\n      </div>\n    ';
  },

  checkPracticeAnswer: function (selectedIdx) {
    if (this.practiceState.answered) return;
    this.practiceState.answered = true;
    var q = this.practiceState.questions[this.practiceState.currentQuestion];
    var opts = document.querySelectorAll("#main-content .option-btn");
    var isCorrect = q.options[selectedIdx] === q.correctAnswer;
    if (isCorrect) { this.practiceState.score++; App.addXp(5); }
    opts.forEach(function (btn, i) {
      btn.disabled = true;
      if (q.options[i] === q.correctAnswer) btn.classList.add("correct");
      if (i === selectedIdx && !isCorrect) btn.classList.add("wrong");
    });
    var expl = document.getElementById("learn-practice-explain");
    if (expl) expl.innerHTML = '<div class="explanation-box">' + (isCorrect ? '\u2705 \u0110\xfang!' : '\u274C Sai. \u0110\xe1p \xe1n: <strong>' + q.correctAnswer + '</strong>') + '<br><br>' + q.explanation + '</div>';
    var nextBtn = document.getElementById("learn-next-btn");
    if (nextBtn) nextBtn.classList.remove("hidden");
  },

  nextPracticeQuestion: function () {
    this.practiceState.currentQuestion++;
    this.practiceState.answered = false;
    this.saveLearnState('quiz');
    this.refreshView();
  },

  restartQuiz: function () {
    this.practiceState = { currentQuestion: 0, score: 0, answered: false, questions: this.buildPracticeQuestions() };
    this.refreshView();
  },

  // ===================== WORD LIST =====================

  renderWordList: function (filtered) {
    var rows = filtered.map(function (w) {
      var isSaved = window.WordSaver && WordSaver.isSaved(w.word);
      var star = isSaved ? '<span class="saved-star">\u2B50</span> ' : '';
      var cls = '';
      if (w._isOrphan) cls = ' orphan-word-row';
        else if (isSaved) cls = ' saved-word-row';
      return '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td>' + star + '<strong>' + w.word + '</strong></td><td style="color:var(--text-muted);font-size:0.85rem;">' + (w.ipa || '') + '</td><td>' + (w.meaningVi || '') + '</td><td><span class="badge badge-level" style="font-size:0.7rem;">' + (w.level || '') + '</span></td><td style="font-size:0.85rem;color:var(--text-muted);">' + (w.topic || '') + '</td><td style="font-size:0.85rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + (w.example || '').replace(/"/g, '&quot;') + '">' + (w.example || '') + '</td><td style="text-align:center;"><button class="btn btn-secondary" style="padding:0.25rem 0.6rem;font-size:0.75rem;" title="L\u01b0u v\u00e0o ghi ch\u00fa" onclick="NotesView.saveFromLearnByWord(\'' + LearnView.escJs(w.word) + '\')">\uD83D\uDCDD</button></td></tr>';
    }).join("");

    var orphanSection = '';
    if (window.WordSaver) {
      var allOrphans = WordSaver.getOrphans();
      // Words with full data already appear in the table above (star + yellow row);
      // the chips below only list saved words still missing their meaning (need AI fill)
      var orphanWords = allOrphans.filter(function (s) { return !s.meaningVi; });
      if (orphanWords.length > 0) {
        var needFill = orphanWords.filter(function (s) { return !s.meaningVi; });
        var orphanItems = orphanWords.map(function (s) {
          var hasData = !!s.meaningVi;
          var fillBtn = hasData ? '' : '<button class="btn btn-secondary" style="font-size:0.7rem;padding:0.15rem 0.5rem;" onclick="LearnView.fillSingleOrphan(\'' + LearnView.escJs(s.word) + '\',this)">\uD83E\uDD16 Tra</button>';
          return '<div style="display:flex;align-items:center;gap:0.5rem;background:#fef9c3;border-radius:8px;padding:0.3rem 0.75rem;border:1px solid #facc15;"><span style="font-size:0.85rem;font-weight:600;">' + s.word + '</span><span style="font-size:0.75rem;color:var(--text-muted);">' + (s.meaningVi || '?') + '</span>' + fillBtn + '</div>';
        }).join("");
        var batchBtn = needFill.length > 0 ? '<button class="btn btn-accent" style="font-size:0.8rem;padding:0.3rem 0.8rem;" onclick="LearnView.fillAllOrphans()">\uD83E\uDD16 Tra t\u1ea5t c\u1ea3 (' + needFill.length + ')</button>' : '';
        orphanSection = '\n        <div style="padding:0.75rem 1.25rem;border-top:1px solid var(--border-color);">\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">\n            <div style="font-weight:600;color:var(--text-muted);font-size:0.85rem;">\u2B50 T\u1eeb \u0111\xE3 l\u01B0u ngo\xE0i danh s\xE1ch (' + orphanWords.length + ')</div>\n            ' + batchBtn + '\n          </div>\n          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" id="orphan-container">' + orphanItems + '</div>\n          <div id="orphan-progress" style="margin-top:0.5rem;"></div>\n        </div>\n      ';
      }
    }

    return '\n      <div class="glass-card" style="padding:0;overflow:hidden;">\n        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border-color);display:flex;gap:0.5rem;align-items:center;">\n          <input type="text" id="wordlist-search" class="input-field" placeholder="T\xecm ki\u1ebfm t\u1eeb..." style="width:100%;padding:0.6rem 1rem;flex:1;" oninput="LearnView.filterWordList()">\n          <button class="btn btn-accent" style="font-size:0.8rem;padding:0.5rem 0.8rem;white-space:nowrap;" onclick="LearnView.showAddWordPopup()" title="Th\u00eam t\u1eeb m\u1edbi t\u1eeb b\xean ngo\xe0i">\u2795 Th\xeam t\u1eeb</button>\n        </div>\n        <div style="overflow-x:auto;">\n          <table class="compare-table" id="wordlist-table">\n            <thead><tr><th>T\u1eeb</th><th>IPA</th><th>Ngh\u0129a</th><th>Level</th><th>Ch\u1ee7 \u0111\u1ec1</th><th>V\xed d\u1ee5</th><th>Ghi ch\xfa</th></tr></thead>\n            <tbody id="wordlist-body">' + rows + '</tbody>\n          </table>\n        </div>\n        ' + orphanSection + '\n        <div id="wordlist-count" style="padding:0.75rem 1.25rem;border-top:1px solid var(--border-color);font-size:0.85rem;color:var(--text-muted);text-align:center;">Hi\u1ec3n th\u1ecb ' + filtered.length + ' t\u1eeb</div>\n      </div>\n    ';
  },

  filterWordList: function () {
    var query = document.getElementById("wordlist-search").value.toLowerCase().trim();
    var filtered = this.getFilteredVocab();
    if (query) {
      var qNorm = LearnView.normalizeVi(query);
      filtered = filtered.filter(function (w) {
        if (w.word.toLowerCase().indexOf(query) >= 0) return true;
        if ((w.meaningVi || "").toLowerCase().indexOf(query) >= 0) return true;
        if ((w.ipa || "").toLowerCase().indexOf(query) >= 0) return true;
        if ((w.example || "").toLowerCase().indexOf(query) >= 0) return true;
        if (qNorm) {
          if (LearnView.normalizeVi(w.word).indexOf(qNorm) >= 0) return true;
          if (LearnView.normalizeVi(w.meaningVi).indexOf(qNorm) >= 0) return true;
          if (LearnView.normalizeVi(w.example).indexOf(qNorm) >= 0) return true;
        }
        return false;
      });
    }
    var tbody = document.getElementById("wordlist-body");
    if (tbody) {
      tbody.innerHTML = filtered.map(function (w) {
        var isSaved = window.WordSaver && WordSaver.isSaved(w.word);
        var star = isSaved ? '<span class="saved-star">\u2B50</span> ' : '';
        var cls = '';
        if (w._isOrphan) cls = ' orphan-word-row';
        else if (isSaved) cls = ' saved-word-row';
      return '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td>' + star + '<strong>' + w.word + '</strong></td><td style="color:var(--text-muted);font-size:0.85rem;">' + (w.ipa || '') + '</td><td>' + (w.meaningVi || '') + '</td><td><span class="badge badge-level" style="font-size:0.7rem;">' + (w.level || '') + '</span></td><td style="font-size:0.85rem;color:var(--text-muted);">' + (w.topic || '') + '</td><td style="font-size:0.85rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + (w.example || '').replace(/"/g, '&quot;') + '">' + (w.example || '') + '</td><td style="text-align:center;"><button class="btn btn-secondary" style="padding:0.25rem 0.6rem;font-size:0.75rem;" title="L\u01b0u v\u00e0o ghi ch\u00fa" onclick="NotesView.saveFromLearnByWord(\'' + LearnView.escJs(w.word) + '\')">\uD83D\uDCDD</button></td></tr>';
      }).join("");
    }
    var countEl = document.getElementById("wordlist-count");
    if (countEl) countEl.textContent = "Hi\u1ec3n th\u1ecb " + filtered.length + " t\u1eeb";
  },

  showAddWordPopup: function () {
    var existing = document.getElementById("add-word-popup");
    if (existing) { existing.remove(); return; }

    var popup = document.createElement("div");
    popup.id = "add-word-popup";
    popup.style.cssText = "position:fixed;z-index:10000;top:50%;left:50%;transform:translate(-50%,-50%);" +
      "width:min(520px,94vw);max-height:85vh;overflow-y:auto;background:var(--card-bg,#1a1625);" +
      "border:1px solid var(--border-color);border-radius:16px;" +
      "box-shadow:0 20px 60px rgba(0,0,0,0.7);padding:1.25rem 1.5rem;backdrop-filter:blur(12px);";

    popup.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">' +
      '<h3 style="margin:0;font-size:1.05rem;">\u2B50 Th\xEAm t\u1EEB m\u1EDBi t\u1EEB b\xEAn ngo\xE0i</h3>' +
      '<span onclick="document.getElementById(\'add-word-popup\').remove()" style="cursor:pointer;font-size:1.2rem;opacity:0.6;line-height:1;">\u2715</span>' +
      '</div>' +
      '<p style="font-size:0.85rem;color:var(--text-muted);margin:0 0 0.75rem;">Nh\u1EADp m\u1ED9t t\u1EEB ti\u1EBFng Anh, h\u1EC7 th\u1ED1ng s\u1EBD t\u1EF1 \u0111\u1ED9ng b\u1ED5 sung IPA, ngh\u0129a, level, ch\u1EE7 \u0111\u1EC1 v\xE0 v\xED d\u1EE5 (tra t\u1EEB \u0111i\u1EC3n c\u1EE5c b\u1ED9 tr\u01B0\u1EDBC, d\xF9ng AI Gemini n\u1EBFu ch\u01B0a c\xF3).</p>' +
      '<input type="text" id="add-word-input" class="input-field" placeholder="V\xED d\u1EE5: procrastinate" style="width:100%;padding:0.65rem 1rem;box-sizing:border-box;" onkeydown="if(event.key===\'Enter\')LearnView.submitAddWord()">' +
      '<div id="add-word-result" style="margin-top:0.75rem;"></div>' +
      '<div style="display:flex;gap:0.5rem;justify-content:flex-end;margin-top:0.9rem;">' +
      '<button class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.8rem;" onclick="document.getElementById(\'add-word-popup\').remove()">H\u1EE7y</button>' +
      '<button class="btn btn-accent" style="font-size:0.8rem;padding:0.4rem 0.8rem;" onclick="LearnView.submitAddWord()">\u2B50 Th\xEAm t\u1EEB</button>' +
      '</div>';

    document.body.appendChild(popup);
    var input = document.getElementById("add-word-input");
    if (input) input.focus();

    // Close on outside click
    setTimeout(function () {
      document.addEventListener("mousedown", function handler(e) {
        var p = document.getElementById("add-word-popup");
        if (p && !p.contains(e.target)) {
          p.remove();
          document.removeEventListener("mousedown", handler);
        }
      });
    }, 100);
  },

  submitAddWord: async function () {
    var input = document.getElementById("add-word-input");
    if (!input) return;
    var word = input.value.trim();
    if (!word || word.length < 2) return;

    var btn = document.querySelector('#add-word-popup .btn-accent');
    var resultEl = document.getElementById("add-word-result");
    if (btn) { btn.disabled = true; btn.textContent = "\u23F3 \u0110ang tra c\u1EE9u..."; }
    if (resultEl) resultEl.innerHTML = '<div style="font-size:0.85rem;color:var(--text-muted);">\u23F3 \u0110ang l\u01B0u v\xE0 tra c\u1EE9u <strong>"' + LearnView.escHtml(word) + '"</strong>...</div>';

    var entry = window.WordSaver ? await WordSaver.save(word) : null;

    if (resultEl) {
      if (!entry) {
        resultEl.innerHTML = '<div style="font-size:0.85rem;color:#f59e0b;">\u26A0\uFE0F T\u1EEB n\xE0y \u0111\xE3 c\xF3 trong danh s\xE1ch \u0111\xE3 l\u01B0u ho\u1EB7c kh\xF4ng h\u1EE3p l\u1EC7.</div>';
      } else {
        var hasAi = entry.meaningVi || entry.ipa || entry.example || entry.level || entry.topic;
        resultEl.innerHTML =
          '<div style="padding:0.75rem;border-radius:10px;' + (hasAi ? 'background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.35);' : 'background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.45);') + '">' +
          '<div style="font-weight:700;font-size:0.95rem;">\u2B50 ' + LearnView.escHtml(entry.word) + ' <span style="font-weight:400;font-size:0.75rem;color:var(--text-muted);">\u0111\xE3 \u0111\u01B0\u1EE3c th\xEAm</span></div>' +
          (entry.ipa ? '<div style="font-size:0.85rem;color:var(--accent);margin-top:0.2rem;">' + LearnView.escHtml(entry.ipa) + '</div>' : '') +
          (entry.meaningVi ? '<div style="font-size:0.9rem;margin-top:0.2rem;">' + LearnView.escHtml(entry.meaningVi) + '</div>' : '') +
          ((entry.level || entry.topic) ? '<div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.2rem;">' + (entry.level ? 'Level: ' + LearnView.escHtml(entry.level) : '') + (entry.level && entry.topic ? ' \u00B7 ' : '') + (entry.topic ? 'Ch\u1EE7 \u0111\u1EC1: ' + LearnView.escHtml(entry.topic) : '') + '</div>' : '') +
          (entry.example ? '<div style="font-size:0.82rem;color:var(--text-muted);font-style:italic;margin-top:0.3rem;">"' + LearnView.escHtml(entry.example) + '"</div>' : '') +
          (hasAi ? '' : '<div style="font-size:0.78rem;color:#f59e0b;margin-top:0.4rem;">\u26A0\uFE0F Ch\u01B0a c\xF3 \u0111\u1EE7 d\u1EEF li\u1EC7u (c\u1EA7n c\xE0i API Gemini trong C\xE0i \u0111\u1EB7t \u0111\u1EC3 t\u1EF1 \u0111\u1ED9ng tra \u0111\u1EA7y \u0111\u1EE7).</div>') +
          '</div>';
      }
    }

    if (btn) { btn.disabled = false; btn.textContent = "\u2B50 Th\xEAm t\u1EEB"; }
    if (input) input.value = "";

    // Refresh the word list so the new word appears immediately with its star
    this.refreshView();
  },

  escHtml: function (str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  fillSingleOrphan: async function (word, btn) {
    if (!window.WordSaver) return;
    if (btn) { btn.disabled = true; btn.textContent = '\u23F3'; }
    var ok = await WordSaver.fillOrphanWord(word);
    if (btn) { btn.textContent = ok ? '\u2705' : '\u274C'; btn.style.opacity = '0.5'; }
    if (ok) this.refreshView();
  },

  fillAllOrphans: async function () {
    if (!window.WordSaver) return;
    var container = document.getElementById('orphan-progress');
    if (container) container.innerHTML = '<div style="font-size:0.8rem;color:var(--text-muted);">\u23F3 \u0110ang tra t\u1eeb... <span id="orphan-count">0/0</span></div>';
    var filled = await WordSaver.fillOrphanWords(function (done, total, word) {
      var countEl = document.getElementById('orphan-count');
      if (countEl) countEl.textContent = done + '/' + total;
    });
    if (container) {
      container.innerHTML = '<div style="font-size:0.8rem;color:var(--accent);">\u2705 \u0110\xE3 tra xong ' + filled + ' t\u1eeb.</div>';
    }
    this.refreshView();
  },

  // ===================== TYPING =====================

  renderTyping: function (filtered) {
    var ts = this.typingState;
    if (ts.items.length === 0) {
      var candidates = filtered.filter(function (w) {
        return w.word && w.example && w.example.toLowerCase().indexOf(w.word.toLowerCase()) >= 0;
      });
      ts.items = candidates.sort(function () { return Math.random() - 0.5; }).slice(0, 10);
      ts.current = 0; ts.score = 0; ts.answered = false;
    }
    if (ts.items.length === 0) {
      return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">Kh\xf4ng c\xf3 c\xe2u v\xed d\u1ee5 n\xe0o ch\u1ee9a t\u1eeb c\u1ea7n \u0111i\u1ec1n cho b\u1ed9 l\u1ecdc n\xe0y. Vui l\xf2ng ch\u1ecdn b\u1ed9 l\u1ecdc kh\xe1c.</div>';
    }
    if (ts.current >= ts.items.length) {
      var pct = Math.round((ts.score / ts.items.length) * 100);
      return '\n        <div class="glass-card practice-card text-center" style="align-items:center;">\n          <div style="font-size:4rem;">' + (pct >= 80 ? "\uD83C\uDF89" : pct >= 50 ? "\uD83D\uDC4D" : "\uD83D\uDCDA") + '</div>\n          <h2 style="font-size:1.8rem;">K\u1ebft qu\u1ea3 \u0111i\u1ec1n t\u1eeb</h2>\n          <div class="score-badge-circle" style="font-size:1.4rem;">' + ts.score + '/' + ts.items.length + '</div>\n          <p style="color:var(--text-muted);">\u0110\u1ea1t <strong style="color:var(--primary);">' + pct + '%</strong> s\u1ed1 c\xe2u \u0111\xfang.</p>\n          <div style="display:flex;gap:1rem;margin-top:1rem;">\n            <button class="btn btn-primary" onclick="LearnView.restartTyping()">\uD83D\uDD04 L\xe0m l\u1ea1i</button>\n          </div>\n        </div>';
    }
    var item = ts.items[ts.current];
    var blanked = item.example.replace(new RegExp(item.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '______');
    return '\n      <div class="glass-card practice-card">\n        <div class="practice-progress">C\xe2u ' + (ts.current + 1) + ' / ' + ts.items.length + ' \u2022 \u0110\xfang: ' + ts.score + '</div>\n        <div style="text-align:center;padding:1.5rem;">\n          <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">\u0110i\u1ec1n t\u1eeb th\xedch h\u1ee3p v\xe0o ch\u1ed7 tr\u1ed1ng:</div>\n          <div style="font-size:1.15rem;line-height:1.8;background:var(--bg-input);padding:1.5rem;border-radius:12px;margin-bottom:1rem;">"' + blanked + '"</div>\n          <div style="font-size:0.9rem;color:var(--text-muted);">G\u1ee3i \xfd: <strong>' + item.meaningVi + '</strong> <span style="color:var(--text-muted);font-size:0.8rem;">(' + item.level + ')</span></div>\n        </div>\n        <div style="display:flex;gap:0.75rem;justify-content:center;align-items:center;flex-wrap:wrap;">\n          <input type="text" id="typing-input" class="input-field" placeholder="Nh\u1eadp t\u1eeb ti\u1ebfng Anh..." style="flex:1;max-width:350px;padding:0.65rem 1rem;text-align:center;font-size:1.1rem;" onkeydown="if(event.key===\'Enter\') LearnView.checkTypingAnswer()">\n          <button class="btn btn-primary" onclick="LearnView.checkTypingAnswer()">Ki\u1ec3m tra</button>\n        </div>\n        <div id="typing-feedback" style="margin-top:1rem;text-align:center;"></div>\n        <div id="typing-next-area" style="text-align:center;margin-top:1rem;"></div>\n      </div>\n    ';
  },

  checkTypingAnswer: function () {
    if (this.typingState.answered) return;
    this.typingState.answered = true;
    var item = this.typingState.items[this.typingState.current];
    var input = document.getElementById("typing-input");
    var feedback = document.getElementById("typing-feedback");
    var nextArea = document.getElementById("typing-next-area");
    if (!input || !feedback) return;
    var answer = input.value.trim().toLowerCase();
    var correct = item.word.toLowerCase();
    var isCorrect = answer === correct;
    if (isCorrect) { this.typingState.score++; App.addXp(5); }
    feedback.innerHTML = '<div class="explanation-box">' + (isCorrect ? '\u2705 \u0110\xfang! T\u1eeb \u0111\xfang l\xe0 <strong>' + item.word + '</strong>' : '\u274C Sai. \u0110\xe1p \xe1n: <strong>' + item.word + '</strong> (' + item.meaningVi + ')') + '<br><em>"' + item.example + '"</em></div>';
    input.disabled = true;
    nextArea.innerHTML = '<button class="btn btn-primary" onclick="LearnView.nextTypingQuestion()">C\xe2u ti\u1ebfp theo \u2192</button>';
  },

  nextTypingQuestion: function () {
    this.typingState.current++;
    this.typingState.answered = false;
    this.saveLearnState('typing');
    this.refreshView();
    setTimeout(function () {
      var inp = document.getElementById("typing-input");
      if (inp) { inp.disabled = false; inp.value = ""; inp.focus(); }
    }, 50);
  },

  restartTyping: function () {
    this.typingState = { items: [], current: 0, score: 0, answered: false };
    this.refreshView();
  },

  // ===================== LISTENING =====================

  renderListening: function (filtered) {
    var ls = this.listenState;
    if (ls.items.length === 0) {
      ls.items = filtered.sort(function () { return Math.random() - 0.5; }).slice(0, 10);
      ls.current = 0; ls.score = 0; ls.answered = false;
    }
    if (ls.current >= ls.items.length) {
      var pct = Math.round((ls.score / ls.items.length) * 100);
      return '\n        <div class="glass-card practice-card text-center" style="align-items:center;">\n          <div style="font-size:4rem;">' + (pct >= 80 ? "\uD83C\uDF89" : pct >= 50 ? "\uD83D\uDC4D" : "\uD83D\uDCDA") + '</div>\n          <h2 style="font-size:1.8rem;">K\u1ebft qu\u1ea3 nghe - vi\u1ebft</h2>\n          <div class="score-badge-circle" style="font-size:1.4rem;">' + ls.score + '/' + ls.items.length + '</div>\n          <p style="color:var(--text-muted);">\u0110\u1ea1t <strong style="color:var(--primary);">' + pct + '%</strong> s\u1ed1 t\u1eeb \u0111\xfang.</p>\n          <div style="display:flex;gap:1rem;margin-top:1rem;">\n            <button class="btn btn-primary" onclick="LearnView.restartListening()">\uD83D\uDD04 L\xe0m l\u1ea1i</button>\n          </div>\n        </div>';
    }
    var item = ls.items[ls.current];
    return '\n      <div class="glass-card practice-card">\n        <div class="practice-progress">C\xe2u ' + (ls.current + 1) + ' / ' + ls.items.length + ' \u2022 \u0110\xfang: ' + ls.score + '</div>\n        <div style="text-align:center;padding:1.5rem;">\n          <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;">Nghe t\u1eeb v\xe0 vi\u1ebft l\u1ea1i ch\xednh x\xe1c:</div>\n          <button class="btn btn-accent" style="font-size:1.2rem;padding:1rem 2rem;border-radius:9999px;" onclick="LearnView.speakListeningWord()">\uD83D\uDD0A Nghe t\u1eeb</button>\n          <div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">G\u1ee3i \xfd: <strong>' + item.meaningVi + '</strong> <span style="color:var(--text-muted);font-size:0.8rem;">(' + item.level + ')</span></div>\n        </div>\n        <div style="display:flex;gap:0.75rem;justify-content:center;align-items:center;flex-wrap:wrap;">\n          <input type="text" id="listening-input" class="input-field" placeholder="Vi\u1ebft t\u1eeb b\u1ea1n nghe \u0111\u01b0\u1ee3c..." style="flex:1;max-width:350px;padding:0.65rem 1rem;text-align:center;font-size:1.1rem;" onkeydown="if(event.key===\'Enter\') LearnView.checkListeningAnswer()">\n          <button class="btn btn-primary" onclick="LearnView.checkListeningAnswer()">Ki\u1ec3m tra</button>\n        </div>\n        <div id="listening-feedback" style="margin-top:1rem;text-align:center;"></div>\n        <div id="listening-next-area" style="text-align:center;margin-top:1rem;"></div>\n      </div>\n    ';
  },

  speakListeningWord: function () {
    var item = this.listenState.items[this.listenState.current];
    if (item) App.speak(item.word, 'en');
  },

  checkListeningAnswer: function () {
    if (this.listenState.answered) return;
    this.listenState.answered = true;
    var item = this.listenState.items[this.listenState.current];
    var input = document.getElementById("listening-input");
    var feedback = document.getElementById("listening-feedback");
    var nextArea = document.getElementById("listening-next-area");
    if (!input || !feedback) return;
    var answer = input.value.trim().toLowerCase();
    var correct = item.word.toLowerCase();
    var isCorrect = answer === correct;
    if (isCorrect) { this.listenState.score++; App.addXp(5); }
    feedback.innerHTML = '<div class="explanation-box">' + (isCorrect ? '\u2705 \u0110\xfang! <strong>' + item.word + '</strong>' : '\u274C Sai. \u0110\xe1p \xe1n: <strong>' + item.word + '</strong> (' + item.ipa + ')') + '<br><em>"' + item.example + '"</em><br><button class="pronounce-btn" style="margin-top:0.5rem;" onclick="App.speak(\'' + LearnView.escJs(item.word) + '\',\'en\')">\uD83D\uDD0A Nghe l\u1ea1i</button></div>';
    input.disabled = true;
    nextArea.innerHTML = '<button class="btn btn-primary" onclick="LearnView.nextListeningQuestion()">C\xe2u ti\u1ebfp theo \u2192</button>';
  },

  nextListeningQuestion: function () {
    this.listenState.current++;
    this.listenState.answered = false;
    this.saveLearnState('listening');
    this.refreshView();
    setTimeout(function () {
      var inp = document.getElementById("listening-input");
      if (inp) { inp.disabled = false; inp.value = ""; inp.focus(); }
    }, 50);
  },

  restartListening: function () {
    this.listenState = { items: [], current: 0, score: 0, answered: false };
    this.refreshView();
  },

  // ===================== SHUFFLE =====================

  renderShuffle: function (filtered) {
    var ss = this.shuffleState;
    if (ss.items.length === 0) {
      var valid = filtered.filter(function (w) { return w.example && w.example.split(/\s+/).length >= 4; });
      ss.items = valid.sort(function () { return Math.random() - 0.5; }).slice(0, 10);
      ss.current = 0; ss.score = 0; ss.answered = false; ss.picked = [];
    }
    if (ss.items.length === 0) {
      return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">Kh\xf4ng \u0111\u1ee7 d\u1eef li\u1ec7u c\xe2u v\xed d\u1ee5 cho ch\u1ee7 \u0111\u1ec1 n\xe0y. Vui l\xf2ng ch\u1ecdn b\u1ed9 l\u1ecdc kh\xe1c.</div>';
    }
    if (ss.current >= ss.items.length) {
      var pct = Math.round((ss.score / ss.items.length) * 100);
      return '\n        <div class="glass-card practice-card text-center" style="align-items:center;">\n          <div style="font-size:4rem;">' + (pct >= 80 ? "\uD83C\uDF89" : pct >= 50 ? "\uD83D\uDC4D" : "\uD83D\uDCDA") + '</div>\n          <h2 style="font-size:1.8rem;">K\u1ebft qu\u1ea3 x\u1ebfp c\xe2u</h2>\n          <div class="score-badge-circle" style="font-size:1.4rem;">' + ss.score + '/' + ss.items.length + '</div>\n          <p style="color:var(--text-muted);">\u0110\u1ea1t <strong style="color:var(--primary);">' + pct + '%</strong> s\u1ed1 c\xe2u \u0111\xfang.</p>\n          <div style="display:flex;gap:1rem;margin-top:1rem;">\n            <button class="btn btn-primary" onclick="LearnView.restartShuffle()">\uD83D\uDD04 L\xe0m l\u1ea1i</button>\n          </div>\n        </div>';
    }
    var item = ss.items[ss.current];
    var originalWords = item.example.replace(/[^\w\s']/g, '').split(/\s+/).filter(function (w) { return w; });
    if (!ss.picked || ss.picked.length === 0 || ss._currentRef !== ss.current) {
      ss.picked = originalWords.sort(function () { return Math.random() - 0.5; }).map(function (w) { return { text: w, placed: false }; });
      ss._currentRef = ss.current;
    }
    var remainingWords = ss.picked.filter(function (w) { return !w.placed; });
    var placedWords = ss.picked.filter(function (w) { return w.placed; }).map(function (w) { return w.text; });

    var wordChips = remainingWords.map(function (w, i) {
      return '<button class="shuffle-chip" onclick="LearnView.clickShuffleWord(' + i + ')" data-idx="' + i + '">' + w.text + '</button>';
    }).join("");

    var placedHtml = placedWords.length > 0 ? placedWords.join(" ") : '<span style="color:var(--text-muted);font-style:italic;">Nh\u1ea5n v\xe0o t\u1eeb b\xean d\u01b0\u1edbi \u0111\u1ec3 x\u1ebfp th\xe0nh c\xe2u</span>';

    return '\n      <div class="glass-card practice-card">\n        <div class="practice-progress">C\xe2u ' + (ss.current + 1) + ' / ' + ss.items.length + ' \u2022 \u0110\xfang: ' + ss.score + '</div>\n        <div style="text-align:center;padding:1rem;">\n          <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">S\u1eafp x\u1ebfp c\xe1c t\u1eeb th\xe0nh c\xe2u ho\xe0n ch\u1ec9nh:</div>\n          <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">G\u1ee3i \xfd: <strong>' + item.meaningVi + '</strong> <span style="color:var(--text-muted);font-size:0.8rem;">(' + item.level + ')</span></div>\n          <div id="shuffle-placed" style="min-height:60px;background:var(--bg-input);border:2px dashed var(--border-color);border-radius:12px;padding:1rem;font-size:1.15rem;line-height:2;margin-bottom:1rem;">' + placedHtml + '</div>\n          <div id="shuffle-chips" style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem;">' + wordChips + '</div>\n        </div>\n        <div style="display:flex;justify-content:center;gap:1rem;">\n          <button class="btn btn-secondary" onclick="LearnView.resetShuffleCurrent()">\uD83D\uDD04 L\xe0m l\u1ea1i c\xe2u n\xe0y</button>\n          <button class="btn btn-primary" onclick="LearnView.checkShuffleAnswer()">Ki\u1ec3m tra</button>\n        </div>\n        <div id="shuffle-feedback" style="margin-top:1rem;text-align:center;"></div>\n        <div id="shuffle-next-area" style="text-align:center;margin-top:1rem;"></div>\n      </div>\n    ';
  },

  clickShuffleWord: function (idx) {
    var ss = this.shuffleState;
    if (ss.answered) return;
    var chips = document.querySelectorAll("#main-content .shuffle-chip");
    var chip = chips[idx];
    if (!chip) return;
    var text = chip.textContent;
    var items = ss.picked;
    var found = false;
    for (var i = 0; i < items.length; i++) {
      var w = items[i];
      if (!w.placed && w.text === text) {
        w.placed = true;
        found = true;
        break;
      }
    }
    if (!found) return;
    var placedBox = document.getElementById("shuffle-placed");
    if (placedBox) {
      var placedWords = ss.picked.filter(function (w) { return w.placed; }).map(function (w) { return w.text; });
      placedBox.innerHTML = placedWords.length > 0 ? placedWords.join(" ") : '<span style="color:var(--text-muted);font-style:italic;">Nh\u1ea5n v\xe0o t\u1eeb b\xean d\u01b0\u1edbi \u0111\u1ec3 x\u1ebfp th\xe0nh c\xe2u</span>';
    }
    var chipsBox = document.getElementById("shuffle-chips");
    if (chipsBox) {
      var remaining = ss.picked.filter(function (w) { return !w.placed; });
      chipsBox.innerHTML = remaining.map(function (w, j) {
        return '<button class="shuffle-chip" onclick="LearnView.clickShuffleWord(' + j + ')" data-idx="' + j + '">' + w.text + '</button>';
      }).join("");
    }
  },

  resetShuffleCurrent: function () {
    var ss = this.shuffleState;
    ss.picked.forEach(function (w) { w.placed = false; });
    this.refreshView();
  },

  checkShuffleAnswer: function () {
    if (this.shuffleState.answered) return;
    this.shuffleState.answered = true;
    var ss = this.shuffleState;
    var item = ss.items[ss.current];
    var placed = ss.picked.filter(function (w) { return w.placed; }).map(function (w) { return w.text; });
    var original = item.example.replace(/[^\w\s']/g, '').split(/\s+/).filter(function (w) { return w; });
    var isCorrect = placed.length === original.length && placed.every(function (w, i) { return w.toLowerCase() === original[i].toLowerCase(); });
    var feedback = document.getElementById("shuffle-feedback");
    var nextArea = document.getElementById("shuffle-next-area");
    if (isCorrect) { ss.score++; App.addXp(5); }
    if (feedback) feedback.innerHTML = '<div class="explanation-box">' + (isCorrect ? '\u2705 \u0110\xfang!' : '\u274C Sai. C\xe2u \u0111\xfang: <strong>"' + item.example + '"</strong>') + '</div>';
    if (nextArea) nextArea.innerHTML = '<button class="btn btn-primary" onclick="LearnView.nextShuffleQuestion()">C\xe2u ti\u1ebfp theo \u2192</button>';
  },

  nextShuffleQuestion: function () {
    this.shuffleState.current++;
    this.shuffleState.answered = false;
    this.shuffleState.picked = [];
    this.saveLearnState('shuffle');
    this.refreshView();
  },

  restartShuffle: function () {
    this.shuffleState = { items: [], current: 0, score: 0, answered: false, picked: [] };
    this.refreshView();
  },

  // ===================== GRAMMAR =====================

  grammarLevel: "B1",
  grammarTopic: null,

  renderGrammarTab: function () {
    var gData = window.VSTEPGrammarData || {};
    var levels = Object.keys(gData.levels || {});
    
    var levelBtns = levels.map(function (l) {
      var cls = LearnView.grammarLevel === l ? "btn btn-accent" : "btn btn-secondary";
      return '<button class="' + cls + '" style="font-size:0.85rem;padding:0.4rem 0.9rem;" onclick="LearnView.grammarLevel=\'' + l + '\';LearnView.grammarTopic=null;LearnView.refreshView()">' + (gData.levels[l].name || l) + '</button>';
    }).join("");

    var currentLevel = gData.levels[this.grammarLevel];
    if (!currentLevel) return '<div class="glass-card" style="text-align:center;padding:2rem;color:var(--text-muted);">Kh\xf4ng c\xf3 d\u1eef li\u1ec7u ng\u1eef ph\xe1p.</div>';

    var topicBtns = '<button class="btn ' + (this.grammarTopic === null ? 'btn-accent' : 'btn-secondary') + '" style="font-size:0.8rem;padding:0.35rem 0.8rem;" onclick="LearnView.grammarTopic=null;LearnView.refreshView()">T\u1ea5t c\u1ea3</button>' +
      (currentLevel.topics || []).map(function (t) {
        var cls = LearnView.grammarTopic === t.id ? "btn btn-accent" : "btn btn-secondary";
        return '<button class="' + cls + '" style="font-size:0.8rem;padding:0.35rem 0.8rem;" onclick="LearnView.grammarTopic=\'' + t.id + '\';LearnView.refreshView()">' + t.title + '</button>';
      }).join("");

    var topicsToShow = this.grammarTopic 
      ? (currentLevel.topics || []).filter(function (t) { return t.id === LearnView.grammarTopic; })
      : (currentLevel.topics || []);

    var contentHtml = topicsToShow.map(function (topic, tIdx) {
      var topicContent = (topic.content || []).map(function (item, iIdx) {
        var examplesHtml = (item.examples || []).map(function (ex) {
          return '<div style="background:var(--bg-input);padding:0.5rem 0.75rem;border-radius:6px;font-size:0.9rem;margin-bottom:0.4rem;border-left:3px solid var(--accent);">"' + ex + '"</div>';
        }).join("");

        return '\n          <div style="margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border-color);">\n            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">\n              <div style="background:var(--primary);color:var(--text-inverse);width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">' + (iIdx + 1) + '</div>\n              <h4 style="font-size:1.05rem;font-weight:700;">' + item.name + '</h4>\n            </div>\n            ' + (item.rule ? '<div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:0.75rem 1rem;margin-bottom:0.75rem;"><strong style="color:#3b82f6;font-size:0.9rem;">C\u1ea5u tr\xfac:</strong> <code style="background:rgba(59,130,246,0.15);padding:0.2rem 0.5rem;border-radius:4px;font-size:0.85rem;">' + item.rule + '</code></div>' : '') + '\n            ' + (item.usage ? '<div style="color:var(--text-muted);font-size:0.9rem;margin-bottom:0.75rem;"><strong>C\xe1ch d\xf9ng:</strong> ' + item.usage + '</div>' : '') + '\n            ' + (examplesHtml ? '<div style="margin-bottom:0.75rem;"><strong style="font-size:0.9rem;">V\xed d\u1ee5:</strong></div>' + examplesHtml : '') + '\n            ' + (item.example ? '<div style="background:var(--bg-input);padding:0.75rem 1rem;border-radius:8px;margin-bottom:0.75rem;border-left:3px solid var(--accent);"><strong style="font-size:0.9rem;">V\xed d\u1ee5:</strong> ' + item.example + '</div>' : '') + '\n            ' + (item.notes ? '<div style="color:var(--text-muted);font-size:0.85rem;font-style:italic;">\u2139 ' + item.notes + '</div>' : '') + '\n          </div>';
      }).join("");

      return '\n        <div class="glass-card">\n          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;gap:1rem;">\n            <div>\n              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">\n                <div style="background:var(--accent);color:var(--text-inverse);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;">' + (tIdx + 1) + '</div>\n                <h3 style="font-size:1.15rem;">' + topic.title + '</h3>\n              </div>\n              <p style="color:var(--text-muted);font-size:0.9rem;">' + topic.description + '</p>\n            </div>\n            <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.8rem;white-space:nowrap;" onclick="AISidebar.injectContext(\'Cho t\xf4i th\xeam v\xed d\u1ee5 v\xe0 b\xe0i t\u1eadp VSTEP v\u1ec1: ' + topic.title + '\')">\uD83E\uDD16 Th\u1ef1c h\xe0nh v\u1edbi AI</button>\n          </div>\n          <div style="display:flex;flex-direction:column;gap:1rem;">' + topicContent + '</div>\n        </div>';
    }).join("");

    return '\n      <div class="learn-header" style="margin-bottom:1rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.35rem;">Ng\u1eef ph\xe1p VSTEP</h1>\n        <p style="color:var(--text-muted);">\xd4n t\u1eadp ng\u1eef ph\xe1p ti\u1ebfng Anh theo c\u1ea5p \u0111\u1ed9 thi VSTEP (B1, B2, C1).</p>\n      </div>\n      <div class="glass-card" style="margin-bottom:1rem;padding:0.75rem 1.25rem;">\n        <div style="font-weight:600;margin-bottom:0.5rem;">\uD83C\uDDF7\uFE0F Ch\u1ecdn c\u1ea5p \u0111\u1ed9:</div>\n        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' + levelBtns + '</div>\n      </div>\n      <div class="glass-card" style="margin-bottom:1rem;padding:0.75rem 1.25rem;">\n        <div style="font-weight:600;margin-bottom:0.5rem;">\uD83D\uDCC1 Ch\u1ee7 \u0111\u1ec1 ng\u1eef ph\xe1p:</div>\n        <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">' + topicBtns + '</div>\n      </div>\n      <div style="display:flex;flex-direction:column;gap:1.5rem;">\n        ' + contentHtml + '\n      </div>\n    ';
  },

  // ===================== BIND =====================

  bindEvents: function () {
    // Handle interactive terms after rendering
    setTimeout(function () {
      var interactiveTerms = document.querySelectorAll('.interactive-term');
      
      // Add click handlers for mobile devices
      interactiveTerms.forEach(function (term) {
        term.addEventListener('click', function (e) {
          e.stopPropagation();
          var explanation = this.getAttribute('data-explanation');
          if (explanation) {
            alert(explanation);
          }
        });
      });
    }, 100);
  }
};
