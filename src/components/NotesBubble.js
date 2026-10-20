/* ==========================================================================
   NOTES BUBBLE COMPONENT - GLOBAL NOTES HIGHLIGHTS
   Displays lesson highlights from LearnView in a floating bubble
   ========================================================================== */

window.NotesBubble = {
  visible: false,
  position: { x: 20, y: 20 },
  selectedHighlights: new Set(),

  render: function () {
    const toggleBtn = document.getElementById("notes-toggle-btn");
    const panelEl = document.getElementById("notes-popup");
    if (!toggleBtn || !panelEl) return;

    // Update button display
    this.updateButtonDisplay();

    panelEl.innerHTML = `
      <div class="panel-header">
        <div class="panel-header-left">
          <div class="panel-icon notes">
            📝
          </div>
          <h4>Ghi chú bài học</h4>
        </div>
        <button class="panel-close" onclick="NotesBubble.toggle()" aria-label="Đóng ghi chú" title="Đóng">✕</button>
      </div>

      <div class="panel-body">
        ${this.renderHighlights()}
      </div>

      <div class="panel-footer" style="display:flex;flex-direction:column;gap:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:0.5rem;border-top:1px solid var(--border-color);">
          <button onclick="NotesBubble.toggleSelectAll(true)" class="notes-select-btn" data-type="select-all">
            <span style="width:16px;height:16px;border:2px solid #6366f1;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.65rem;">☑</span>
            Chọn tất cả
          </button>
          <button onclick="NotesBubble.toggleSelectAll(false)" class="notes-select-btn" data-type="deselect-all">
            <span style="width:16px;height:16px;border:2px solid #9ca3af;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.65rem;">☐</span>
            Bỏ chọn
          </button>
          <button class="panel-action-btn secondary" onclick="NotesBubble.deleteSelected()" style="display:${this.selectedHighlights.size > 0 ? 'inline-flex' : 'none'};color:#ef4444;border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.1);padding:0.4rem 0.8rem;font-size:0.75rem;align-items:center;gap:0.3rem;">
            <span>🗑️</span> Xóa đã chọn (${this.selectedHighlights.size})
          </button>
        </div>
        <button class="panel-action-btn secondary" onclick="App.navigate('notes')" style="width:100%;">Xem tất cả ghi chú trong trang Ghi chú</button>
      </div>
    `;
  },

  toggle: function () {
    const panel = document.getElementById("notes-popup");
    if (!panel) return;
    const toggleBtn = document.getElementById("notes-toggle-btn");
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      // On mobile, use bottom sheet behavior
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        // Load highlights from LearnView
        this.renderHighlights();
      }
    } else {
      // Desktop: position relative to button
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        const btnRect = toggleBtn.getBoundingClientRect();
        let left = btnRect.left + btnRect.width / 2 - 210;
        let top = btnRect.bottom + 10;
        left = Math.max(8, Math.min(window.innerWidth - 428, left));
        top = Math.min(window.innerHeight - 500, top);
        panel.style.right = "auto";
        panel.style.bottom = "auto";
        panel.style.left = left + "px";
        panel.style.top = top + "px";
        // Load highlights from LearnView
        this.renderHighlights();
      }
    }
  },

  renderHighlights: function () {
    // Collect all highlights from localStorage (not just LearnView memory)
    var allHighlights = [];
    
    // First, try to load from LearnView memory if available
    if (window.LearnView && LearnView.lessonHighlights) {
      for (var lessonId in LearnView.lessonHighlights) {
        var highlights = LearnView.lessonHighlights[lessonId];
        highlights.forEach(function(hl) {
          allHighlights.push({
            id: hl.id,
            lessonId: lessonId,
            original: hl.original,
            note: hl.note,
            color: hl.color,
            label: hl.label,
            effect: hl.effect,
            createdAt: hl.createdAt
          });
        });
      }
    }
    
    // Also load from localStorage directly (in case LearnView hasn't been loaded yet)
    try {
      for (var i = 1; i <= 15; i++) {
        var key = 'vstep_lesson_highlights_' + i;
        var stored = localStorage.getItem(key);
        if (stored) {
          var parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            parsed.forEach(function(hl) {
              // Check if this highlight is already in allHighlights
              var exists = allHighlights.some(function(existing) { return existing.id === hl.id; });
              if (!exists) {
                allHighlights.push({
                  id: hl.id,
                  lessonId: i.toString(),
                  original: hl.original,
                  note: hl.note,
                  color: hl.color,
                  label: hl.label,
                  effect: hl.effect,
                  createdAt: hl.createdAt
                });
              }
            });
          }
        }
      }
    } catch (e) {
      console.error("Error loading highlights from localStorage:", e);
    }

    if (allHighlights.length === 0) {
      return '<div style="padding:2rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">Chưa có highlight nào từ bài học. Kéo chuột để chọn văn bản trong bài học để tạo highlight.</div>';
    }

    // Sort by creation date (newest first)
    allHighlights.sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });

    return allHighlights.map(function(hl) {
      var colorDot = '<span style="width:8px;height:8px;border-radius:50%;background:' + (hl.color === 'purple' ? '#8b5cf6' : hl.color === 'pink' ? '#ec4899' : hl.color === 'blue' ? '#3b82f6' : hl.color === 'green' ? '#10b981' : hl.color === 'yellow' ? '#f59e0b' : hl.color === 'orange' ? '#f97316' : '#8b5cf6') + ';display:inline-block;"></span>';
      var labelChip = hl.label ? '<span style="font-size:0.65rem;background:rgba(139,92,246,0.2);color:#a78bfa;padding:1px 4px;border-radius:3px;margin-left:4px;">' + (window.LearnView && LearnView.HL_LABELS && LearnView.HL_LABELS[hl.label] ? LearnView.HL_LABELS[hl.label].icon : '') + '</span>' : '';
      var originalText = (window.LearnView ? LearnView._escapeHtml(hl.original || 'Highlight') : (hl.original || 'Highlight'));
      var noteText = (window.LearnView ? LearnView._escapeHtml(hl.note || '') : (hl.note || ''));
      var isSelected = NotesBubble.selectedHighlights.has(hl.id);
      
      return '<div class="bubble-highlight-item" data-hl-id="' + hl.id + '" data-lesson-id="' + hl.lessonId + '" style="padding:0.6rem 0.75rem;border-bottom:1px solid var(--border-color);display:flex;gap:0.5rem;align-items:flex-start;' + (isSelected ? 'background:rgba(139,92,246,0.08);' : '') + '">' +
        '<div class="hl-checkbox ' + (isSelected ? 'selected' : '') + '" onclick="NotesBubble.toggleHighlightSelection(\'' + hl.id + '\', ' + !isSelected + ')" style="width:18px;height:18px;border:2px solid ' + (isSelected ? '#8b5cf6' : '#9ca3af') + ';border-radius:4px;cursor:pointer;flex-shrink:0;margin-top:0.15rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s;background:' + (isSelected ? 'rgba(139,92,246,0.2)' : 'transparent') + ';">' +
          (isSelected ? '<span style="color:#8b5cf6;font-size:0.7rem;font-weight:700;">✓</span>' : '') +
        '</div>' +
        '<div style="flex:1;display:flex;flex-direction:column;gap:0.3rem;cursor:pointer;min-width:0;" onclick="NotesBubble.jumpToHighlight(\'' + hl.id + '\', \'' + hl.lessonId + '\')">' +
          '<div style="display:flex;align-items:center;gap:0.4rem;min-width:0;">' +
            colorDot +
            '<span style="font-size:0.8rem;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">' + originalText + '</span>' +
            labelChip +
          '</div>' +
          '<div style="font-size:0.75rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:1.2rem;">' + (noteText || '<em style="opacity:0.5;">Chưa có ghi chú</em>') + '</div>' +
        '</div>' +
        '<button class="delete-btn" onclick="NotesBubble.deleteSingleHighlight(\'' + hl.id + '\', \'' + hl.lessonId + '\');event.stopPropagation();" style="background:none;border:none;color:#ef4444;cursor:pointer;padding:0.3rem;font-size:0.85rem;flex-shrink:0;opacity:0.7;transition:opacity 0.2s;" title="Xóa">✕</button>' +
      '</div>';
    }).join('');
  },

  jumpToHighlight: function(hlId, lessonId) {
    console.log("Jumping to highlight:", hlId, "in lesson:", lessonId);
    // Navigate to Learn view and open the lesson
    App.navigate('learn');
    setTimeout(function() {
      if (window.LearnView) {
        LearnView.setSection('lesson');
        LearnView.openLesson(parseInt(lessonId), null);
        setTimeout(function() {
          var span = document.getElementById(hlId);
          if (span) {
            span.scrollIntoView({ behavior: 'smooth', block: 'center' });
            span.classList.add('hl-jump');
            setTimeout(function() {
              span.classList.remove('hl-jump');
            }, 1800);
          }
        }, 500);
      }
    }, 300);
    // Close the bubble
    this.toggle();
  },

  updateButtonDisplay: function () {
    const toggleBtn = document.getElementById("notes-toggle-btn");
    if (!toggleBtn) return;
    
    // Count total highlights from localStorage
    var count = 0;
    
    // First, try to count from LearnView memory if available
    if (window.LearnView && LearnView.lessonHighlights) {
      for (var lessonId in LearnView.lessonHighlights) {
        count += LearnView.lessonHighlights[lessonId].length;
      }
    }
    
    // Also count from localStorage directly
    try {
      for (var i = 1; i <= 15; i++) {
        var key = 'vstep_lesson_highlights_' + i;
        var stored = localStorage.getItem(key);
        if (stored) {
          var parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            count += parsed.length;
          }
        }
      }
    } catch (e) {
      console.error("Error counting highlights from localStorage:", e);
    }
    
    toggleBtn.innerHTML = count > 0 ? '<span style="font-size:0.75rem;font-weight:700;color:white;">📝 ' + count + '</span>' : '<span style="font-size:0.75rem;font-weight:700;color:white;">📝</span>';
  },

  refresh: function () {
    // Always update button display
    this.updateButtonDisplay();
    
    // Refresh highlights display if bubble is open
    const panelEl = document.getElementById("notes-popup");
    if (panelEl && panelEl.classList.contains("open")) {
      // Update the body content
      const bodyEl = panelEl.querySelector('.panel-body');
      if (bodyEl) {
        bodyEl.innerHTML = this.renderHighlights();
      }
      
      // Update the footer (selection state)
      const footerEl = panelEl.querySelector('.panel-footer');
      if (footerEl) {
        // Re-render footer to update delete button visibility
        footerEl.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:0.5rem;border-top:1px solid var(--border-color);">
            <button onclick="NotesBubble.toggleSelectAll(true)" class="notes-select-btn" data-type="select-all">
              <span style="width:16px;height:16px;border:2px solid #6366f1;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.65rem;">☑</span>
              Chọn tất cả
            </button>
            <button onclick="NotesBubble.toggleSelectAll(false)" class="notes-select-btn" data-type="deselect-all">
              <span style="width:16px;height:16px;border:2px solid #9ca3af;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.65rem;">☐</span>
              Bỏ chọn
            </button>
            <button class="panel-action-btn secondary" onclick="NotesBubble.deleteSelected()" style="display:${this.selectedHighlights.size > 0 ? 'inline-flex' : 'none'};color:#ef4444;border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.1);padding:0.4rem 0.8rem;font-size:0.75rem;align-items:center;gap:0.3rem;">
              <span>🗑️</span> Xóa đã chọn (${this.selectedHighlights.size})
            </button>
          </div>
          <button class="panel-action-btn secondary" onclick="App.navigate('notes')" style="width:100%;">Xem tất cả ghi chú trong trang Ghi chú</button>
        `;
      }
    }
  },

  toggleHighlightSelection: function(hlId, isSelected) {
    if (isSelected) {
      this.selectedHighlights.add(hlId);
    } else {
      this.selectedHighlights.delete(hlId);
    }
    // Use refresh instead of render to avoid full re-render
    this.refresh();
  },

  toggleSelectAll: function(checked) {
    var allCheckboxes = document.querySelectorAll('.hl-checkbox');
    allCheckboxes.forEach(function(cb) {
      var hlId = cb.getAttribute('data-hl-id');
      if (checked) {
        NotesBubble.selectedHighlights.add(hlId);
      } else {
        NotesBubble.selectedHighlights.delete(hlId);
      }
    });
    // Use refresh instead of render to avoid full re-render
    this.refresh();
  },

  deleteSingleHighlight: function(hlId, lessonId) {
    if (!confirm('Bạn có chắc muốn xóa highlight này?')) return;
    
    // Delete from localStorage
    try {
      var key = 'vstep_lesson_highlights_' + lessonId;
      var stored = localStorage.getItem(key);
      if (stored) {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed = parsed.filter(function(hl) { return hl.id !== hlId; });
          localStorage.setItem(key, JSON.stringify(parsed));
        }
      }
    } catch (e) {
      console.error("Error deleting highlight from localStorage:", e);
    }
    
    // Also delete from LearnView memory if available
    if (window.LearnView && LearnView.lessonHighlights && LearnView.lessonHighlights[lessonId]) {
      LearnView.lessonHighlights[lessonId] = LearnView.lessonHighlights[lessonId].filter(function(hl) { return hl.id !== hlId; });
      LearnView.saveLessonHighlights(lessonId);
    }
    
    // Remove from selection
    this.selectedHighlights.delete(hlId);
    
    // Refresh UI immediately
    this.refresh();
    
    // Refresh LearnView if it's loaded
    if (window.LearnView) {
      LearnView.refreshLessonHighlights(lessonId);
    }
  },

  deleteSelected: function() {
    if (this.selectedHighlights.size === 0) return;
    if (!confirm('Bạn có chắc muốn xóa ' + this.selectedHighlights.size + ' highlight đã chọn?')) return;
    
    var self = this;
    
    // Delete each selected highlight
    this.selectedHighlights.forEach(function(hlId) {
      // Find lessonId for this highlight
      var lessonId = null;
      
      // Search in localStorage
      for (var i = 1; i <= 15; i++) {
        var key = 'vstep_lesson_highlights_' + i;
        try {
          var stored = localStorage.getItem(key);
          if (stored) {
            var parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              var found = parsed.find(function(hl) { return hl.id === hlId; });
              if (found) {
                lessonId = i.toString();
                // Delete from localStorage
                parsed = parsed.filter(function(hl) { return hl.id !== hlId; });
                localStorage.setItem(key, JSON.stringify(parsed));
                break;
              }
            }
          }
        } catch (e) {}
      }
      
      // Also delete from LearnView memory
      if (lessonId && window.LearnView && LearnView.lessonHighlights && LearnView.lessonHighlights[lessonId]) {
        LearnView.lessonHighlights[lessonId] = LearnView.lessonHighlights[lessonId].filter(function(hl) { return hl.id !== hlId; });
        LearnView.saveLessonHighlights(lessonId);
      }
    });
    
    // Clear selection
    this.selectedHighlights.clear();
    
    // Refresh UI immediately
    this.refresh();
    
    // Refresh LearnView highlights
    if (window.LearnView) {
      for (var lid in LearnView.lessonHighlights) {
        LearnView.refreshLessonHighlights(lid);
      }
    }
  }
};
