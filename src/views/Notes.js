/* ==========================================================================
   NOTES VIEW - GHI CHU CA NHAN
   Tinh nang: tao/sua/xoa, tim kiem, ghim, mau sac, xuat/nhap JSON,
   luu ghi chu tu man hinh hoc tu vung (LearnView)
   ========================================================================== */

window.NotesView = {
  STORAGE_KEY: "notes",
  notes: [],
  selectedId: null,
  searchQuery: "",
  filter: "all",
  saveTimer: null,
  colors: ["yellow", "green", "blue", "purple", "pink", "gray"],

  // ===================== STORAGE =====================

  load: function () {
    try {
      var data = StorageManager.getNotes();
      // StorageManager now handles legacy key migration automatically
      if (Array.isArray(data)) {
        this.notes = data;
      } else {
        this.notes = [];
      }
    } catch (e) {
      this.notes = [];
    }
    if (this.notes.length > 0 && !this.selectedId) {
      this.selectedId = this.notes[0].id;
    }
  },

  save: function () {
    try {
      StorageManager.setNotes(this.notes);
    } catch (e) {
      console.error("NotesView.save error:", e);
    }
  },

  scheduleSave: function () {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      this.save();
    }, 400);
  },

  // ===================== HELPERS =====================

  getNote: function (id) {
    return this.notes.find(function (n) { return n.id === id; });
  },

  escapeHtml: function (str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  formatDate: function (ts) {
    if (!ts) return "";
    var d = new Date(ts);
    var now = new Date();
    var sameDay = d.toDateString() === now.toDateString();
    var hm = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    if (sameDay) return "H\u00f4m nay " + hm;
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
  },

  colorHex: function (color) {
    var map = {
      yellow: "#fbbf24",
      green: "#34d399",
      blue: "#60a5fa",
      purple: "#a78bfa",
      pink: "#f472b6",
      gray: "#9ca3af"
    };
    return map[color] || map.yellow;
  },

  // ===================== FILTERING =====================

  getVisible: function () {
    var q = this.searchQuery.trim().toLowerCase();
    var list = this.notes.slice();
    if (this.filter === "pinned") {
      list = list.filter(function (n) { return n.pinned; });
    }
    if (q) {
      list = list.filter(function (n) {
        return (n.title || "").toLowerCase().indexOf(q) >= 0 ||
               (n.content || "").toLowerCase().indexOf(q) >= 0 ||
               (n.source && n.source.word && n.source.word.toLowerCase().indexOf(q) >= 0);
      });
    }
    list.sort(function (a, b) {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });
    return list;
  },

  // ===================== RENDER =====================

  render: function () {
    if (this.notes.length === 0) this.selectedId = null;
    var visible = this.getVisible();
    var listHtml = visible.length === 0
      ? '<div style="padding:2rem 1rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">' +
        (this.notes.length === 0
          ? "Ch\u01b0a c\u00f3 ghi ch\u00fa n\u00e0o. B\u1ea5m <strong>+ Ghi ch\u00fa m\u1edbi</strong> \u0111\u1ec3 b\u1eaft \u0111\u1ea7u."
          : "Kh\u00f4ng t\u00ecm th\u1ea5y ghi ch\u00fa ph\u00f9 h\u1ee3p.") +
        "</div>"
      : visible.map((n) => this.renderListItem(n)).join("");

    var selected = this.selectedId ? this.getNote(this.selectedId) : null;
    if (selected && this.notes.indexOf(selected) < 0) selected = null;
    if (!selected && visible.length > 0) selected = visible[0];

    return '\n      <div style="margin-bottom:2rem;">\n        <h1 style="font-size:2rem;margin-bottom:0.5rem;">\uD83D\uDCDD Ghi ch\u00fa</h1>\n        <p style="color:var(--text-muted);">L\u01b0u l\u1ea1i t\u1eeb v\u1ef1ng, \u00fd t\u01b0\u1edfng v\u00e0 ghi ch\u00fa h\u1ecdc t\u1eadp c\u1ee7a b\u1ea1n.</p>\n      </div>\n\n      <div class="glass-card" style="padding:1.25rem;margin-bottom:1.25rem;">\n        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">\n          <button class="btn btn-accent" onclick="NotesView.createNote()">\u2795 Ghi ch\u00fa m\u1edbi</button>\n          <button class="btn btn-secondary" onclick="NotesView.exportNotes()">\uD83D\uDCE4 Xu\u1ea5t JSON</button>\n          <button class="btn btn-secondary" onclick="document.getElementById(\'notes-import-input\').click()">\uD83D\uDCE5 Nh\u1eadp JSON</button>\n          <input type="file" id="notes-import-input" accept=".json,application/json" style="display:none;" onchange="NotesView.importNotes(this)">\n          <div style="flex:1;min-width:160px;position:relative;">\n            <input type="text" id="notes-search" class="input-field" placeholder="T\u00ecm ki\u1ebfm ghi ch\u00fa..." value="' + this.escapeHtml(this.searchQuery) + '" oninput="NotesView.onSearchInput(this.value)" style="width:100%;padding:0.55rem 1rem 0.55rem 2.2rem;">\n            <span style="position:absolute;left:0.8rem;top:50%;transform:translateY(-50%);color:var(--text-muted);">\uD83D\uDD0D</span>\n          </div>\n          <div style="display:flex;gap:0.4rem;">\n            <button class="btn ' + (this.filter === "all" ? "btn-primary" : "btn-secondary") + '" style="padding:0.45rem 0.9rem;font-size:0.8rem;" onclick="NotesView.setFilter(\'all\')">T\u1ea5t c\u1ea3 (' + this.notes.length + ')</button>\n            <button class="btn ' + (this.filter === "pinned" ? "btn-primary" : "btn-secondary") + '" style="padding:0.45rem 0.9rem;font-size:0.8rem;" onclick="NotesView.setFilter(\'pinned\')">\uD83D\uDCCC \u0110\u00e3 ghim</button>\n          </div>\n        </div>\n      </div>\n\n      <div class="notes-layout">\n        <div class="notes-list-panel glass-card" style="padding:0.5rem;overflow-y:auto;">\n          ' + listHtml + '\n        </div>\n        <div class="notes-editor-panel glass-card" style="padding:1.25rem;display:flex;flex-direction:column;">\n          ' + this.renderEditor(selected) + '\n        </div>\n      </div>\n    ';
  },

  renderListItem: function (n) {
    var isSel = n.id === this.selectedId;
    var preview = (n.content || "").replace(/\s+/g, " ").trim();
    if (preview.length > 60) preview = preview.substring(0, 60) + "...";
    var sourceBadge = "";
    if (n.source && n.source.type === "word") {
      sourceBadge = '<span style="font-size:0.7rem;color:#3b82f6;background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25);padding:1px 6px;border-radius:4px;margin-left:6px;">\uD83D\uDCD6 T\u1eeb v\u1ef1ng</span>';
    }
    return '\n      <div class="notes-list-item" data-note-id="' + n.id + '" onclick="NotesView.selectNote(\'' + n.id + '\')" style="' + (isSel ? 'border-color:var(--primary);background:var(--bg-hover, rgba(255,255,255,0.05));' : '') + 'border-left:3px solid ' + this.colorHex(n.color) + ';">\n        <div style="display:flex;align-items:center;gap:0.4rem;min-width:0;">\n          <span style="font-weight:600;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;">' + (n.pinned ? "\uD83D\uDCCC " : "") + this.escapeHtml(n.title || "(Kh\u00f4ng ti\u00eau \u0111\u1ec1)") + '</span>\n          ' + sourceBadge + '\n        </div>\n        <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.25rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (this.escapeHtml(preview) || "&hellip;") + '</div>\n        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.35rem;">\n          <span style="font-size:0.7rem;color:var(--text-muted);">' + this.formatDate(n.updatedAt) + '</span>\n          <div style="display:flex;gap:0.3rem;">\n            <button class="notes-quick-btn" title="Sao chép nội dung" onclick="event.stopPropagation();NotesView.copyNoteContent(\'' + n.id + '\')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.9rem;padding:2px;">\uD83D\uDCCB</button>\n            <button class="notes-del-btn" title="X\u00f3a ghi ch\u00fa" onclick="event.stopPropagation();NotesView.deleteNote(\'' + n.id + '\')">\u2716</button>\n          </div>\n        </div>\n      </div>\n    ';
  },

  renderEditor: function (n) {
    if (!n) {
      return '\n        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text-muted);gap:0.75rem;">\n          <span style="font-size:3rem;opacity:0.4;">\uD83D\uDCDD</span>\n          <p style="font-size:0.9rem;">Ch\u1ecdn m\u1ed9t ghi ch\u00fa \u1edf b\u00ean tr\u00e1i ho\u1eb7c t\u1ea1o ghi ch\u00fa m\u1edbi.</p>\n        </div>\n      ';
    }

    var colorDots = this.colors.map(function (c) {
      var hex = { yellow: "#fbbf24", green: "#34d399", blue: "#60a5fa", purple: "#a78bfa", pink: "#f472b6", gray: "#9ca3af" }[c];
      return '<button title="' + c + '" onclick="NotesView.setNoteColor(\'' + n.id + '\',\'' + c + '\')" style="width:22px;height:22px;border-radius:50%;border:2px solid ' + (n.color === c ? "#fff" : "transparent") + ';background:' + hex + ';cursor:pointer;box-shadow:0 0 0 1px rgba(0,0,0,0.15);"></button>';
    }).join("");

    var wordColumn = "";
    if (n.source && n.source.type === "word") {
      var s = n.source;
      wordColumn = '\n        <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:8px;padding:1rem;font-size:0.9rem;">\n          <div style="font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;color:#3b82f6;">\uD83D\uDCD6 ' + this.escapeHtml(s.word || "") + '</div>\n          ' + (s.ipa ? '<div style="color:var(--text-muted);margin-bottom:0.4rem;">/' + this.escapeHtml(s.ipa) + "/</div>" : "") + '\n          ' + (s.meaningVi ? '<div style="color:var(--text-primary);margin-bottom:0.4rem;">' + this.escapeHtml(s.meaningVi) + "</div>" : "") + '\n          ' + (s.level || s.topic ? '<div style="color:var(--text-muted);margin-bottom:0.4rem;font-size:0.85rem;">' + [s.level, s.topic].filter(Boolean).map(this.escapeHtml).join(" \u2022 ") + "</div>" : "") + '\n          ' + (s.example ? '<div style="color:var(--text-muted);margin-top:0.4rem;font-style:italic;font-size:0.85rem;">"' + this.escapeHtml(s.example) + '"</div>' : "") + '\n          <button class="pronounce-btn" title="Nghe ph\u00e1t \u00e2m" onclick="App.speak(\'' + this.escapeJs(s.word || "") + '\',\'en\')" style="margin-top:0.75rem;width:100%;padding:0.5rem;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);border-radius:6px;cursor:pointer;color:#3b82f6;font-size:0.85rem;display:flex;align-items:center;justify-content:center;gap:0.4rem;">\n            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>\n            Nghe ph\u00e1t \u00e2m\n          </button>\n        </div>\n      ';
    } else {
      wordColumn = '\n        <div style="background:rgba(156,163,175,0.08);border:1px solid rgba(156,163,175,0.25);border-radius:8px;padding:1rem;font-size:0.9rem;">\n          <input type="text" id="notes-title-input" class="input-field" placeholder="Ti\u00eau \u0111\u1ec1..." value="' + this.escapeHtml(n.title) + '" oninput="NotesView.onTitleInput(this.value)" style="width:100%;padding:0.5rem;font-size:1rem;font-weight:600;border:none;background:transparent;color:#6b7280;margin-bottom:0.3rem;">\n          <div style="color:var(--text-muted);font-size:0.85rem;">Ghi ch\u00fa th\u00f4ng th\u01b0\u1eddng</div>\n        </div>\n      ';
    }

    return '\n      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">\n        <div style="display:flex;gap:0.45rem;align-items:center;">' + colorDots + '</div>\n        <div style="display:flex;gap:0.5rem;align-items:center;">\n          <button class="btn ' + (n.pinned ? "btn-primary" : "btn-secondary") + '" style="padding:0.4rem 0.8rem;font-size:0.78rem;" onclick="NotesView.togglePin(\'' + n.id + '\')">' + (n.pinned ? "\uD83D\uDCCC \u0110\u00e3 ghim" : "\uD83D\uDCCC Ghim") + '</button>\n          <button class="btn btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.78rem;" onclick="NotesView.duplicateNote(\'' + n.id + '\')">\uD83D\uDCCB Nh\u00e2n b\u1ea3n</button>\n          <button class="btn btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.78rem;color:#ef4444;" onclick="NotesView.deleteNote(\'' + n.id + '\')">\uD83D\uDDD1 X\u00f3a</button>\n        </div>\n      </div>\n      <div style="display:flex;gap:1rem;flex:1;min-height:0;">\n        <div style="width:280px;flex-shrink:0;display:flex;flex-direction:column;">\n          ' + wordColumn + '\n        </div>\n        <div style="flex:1;display:flex;flex-direction:column;min-height:0;">\n          <textarea id="notes-content-input" class="input-field" placeholder="Vi\u1ebft n\u1ed9i dung ghi ch\u00fa..." oninput="NotesView.onContentInput(this.value)" style="flex:1;min-height:350px;width:100%;padding:1rem;font-size:1rem;line-height:1.7;resize:none;border:1px solid rgba(156,163,175,0.3);border-radius:8px;background:rgba(255,255,255,0.03);color:var(--text-primary);">' + this.escapeHtml(n.content) + '</textarea>\n        </div>\n      </div>\n      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem;font-size:0.72rem;color:var(--text-muted);">\n        <span>T\u1ea1o: ' + this.formatDate(n.createdAt) + '</span>\n        <span>C\u1eadp nh\u1eadt: ' + this.formatDate(n.updatedAt) + '</span>\n      </div>\n    ';
  },

  escapeJs: function (str) {
    return String(str || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  },

  // ===================== ACTIONS =====================

  createNote: function () {
    var now = Date.now();
    var note = {
      id: "n" + now + Math.floor(Math.random() * 1000),
      title: "",
      content: "",
      color: "yellow",
      pinned: false,
      createdAt: now,
      updatedAt: now,
      source: null
    };
    this.notes.push(note);
    this.selectedId = note.id;
    this.searchQuery = "";
    this.filter = "all";
    this.save();
    this.refreshView();
    setTimeout(function () {
      var t = document.getElementById("notes-content-input");
      if (t) t.focus();
    }, 100);
  },

  selectNote: function (id) {
    this.selectedId = id;
    this.refreshView();
  },

  deleteNote: function (id) {
    var n = this.getNote(id);
    var label = (n && n.title ? '"' + n.title + '"' : "ghi ch\u00fa n\u00e0y");
    if (!confirm("X\u00f3a " + label + "? H\u00e0nh \u0111\u1ed9ng n\u00e0y kh\u00f4ng th\u1ec3 ho\u00e0n t\u00e1c.")) return;
    this.notes = this.notes.filter(function (x) { return x.id !== id; });
    if (this.selectedId === id) this.selectedId = null;
    this.save();
    this.refreshView();
  },

  duplicateNote: function (id) {
    var n = this.getNote(id);
    if (!n) return;
    var copy = JSON.parse(JSON.stringify(n));
    var now = Date.now();
    copy.id = "n" + now + Math.floor(Math.random() * 1000);
    copy.title = (n.title || "") + " (b\u1ea3n sao)";
    copy.createdAt = now;
    copy.updatedAt = now;
    this.notes.push(copy);
    this.selectedId = copy.id;
    this.save();
    this.refreshView();
  },

  togglePin: function (id) {
    var n = this.getNote(id);
    if (!n) return;
    n.pinned = !n.pinned;
    n.updatedAt = Date.now();
    this.save();
    this.refreshView();
  },

  setNoteColor: function (id, color) {
    var n = this.getNote(id);
    if (!n) return;
    n.color = color;
    n.updatedAt = Date.now();
    this.scheduleSave();
    this.refreshView();
  },

  setFilter: function (f) {
    this.filter = f;
    this.refreshView();
  },

  onSearchInput: function (v) {
    this.searchQuery = v;
    this.refreshView();
  },

  onTitleInput: function (v) {
    var n = this.getNote(this.selectedId);
    if (!n) return;
    n.title = v;
    n.updatedAt = Date.now();
    this.scheduleSave();
  },

  onContentInput: function (v) {
    var n = this.getNote(this.selectedId);
    if (!n) return;
    n.content = v;
    n.updatedAt = Date.now();
    this.scheduleSave();
  },

  copyNoteContent: function (id) {
    var n = this.getNote(id);
    if (!n) return;
    var content = (n.title || "") + "\n\n" + (n.content || "");
    navigator.clipboard.writeText(content).then(function () {
      alert("Đã sao chép nội dung ghi chú!");
    }).catch(function (err) {
      console.error("Lỗi sao chép:", err);
      alert("Không thể sao chép nội dung.");
    });
  },

  // ===================== EXPORT / IMPORT =====================

  exportNotes: function () {
    if (this.notes.length === 0) {
      alert("Ch\u01b0a c\u00f3 ghi ch\u00fa n\u00e0o \u0111\u1ec3 xu\u1ea5t.");
      return;
    }
    var payload = {
      app: "vstep_notes",
      version: 1,
      exportedAt: new Date().toISOString(),
      notes: this.notes
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "vstep_notes_" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importNotes: function (input) {
    var file = input.files && input.files[0];
    if (!file) return;
    var self = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var parsed = JSON.parse(e.target.result);
        var list = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.notes) ? parsed.notes : null);
        if (!list) {
          alert("File JSON kh\u00f4ng h\u1ee3p l\u1ec7: kh\u00f4ng t\u00ecm th\u1ea5y danh s\u00e1ch ghi ch\u00fa.");
          return;
        }
        var imported = 0, skipped = 0;
        list.forEach(function (n) {
          if (!n || !n.id) return;
          var valid = {
            id: String(n.id),
            title: String(n.title || ""),
            content: String(n.content || ""),
            color: self.colors.indexOf(n.color) >= 0 ? n.color : "yellow",
            pinned: !!n.pinned,
            createdAt: Number(n.createdAt) || Date.now(),
            updatedAt: Number(n.updatedAt) || Date.now(),
            source: n.source && n.source.type === "word" ? n.source : null
          };
          var existing = self.notes.find(function (x) { return x.id === valid.id; });
          if (existing) {
            skipped++;
            return;
          }
          self.notes.push(valid);
          imported++;
        });
        self.save();
        self.refreshView();
        alert("\u0110\u00e3 nh\u1eadp " + imported + " ghi ch\u00fa." + (skipped > 0 ? " B\u1ecf qua " + skipped + " ghi ch\u00fa tr\u00f9ng id." : ""));
      } catch (err) {
        alert("Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
    input.value = "";
  },

  // ===================== SAVE FROM LEARN =====================

  saveFromLearnByWord: function (word) {
    var lower = String(word || "").toLowerCase().trim();
    if (!lower) return;
    var match = (window.VstepVocabData || []).find(function (v) {
      return v.word.toLowerCase() === lower;
    });
    if (!match && window.WordSaver) {
      match = WordSaver.getSavedEntry(lower);
    }
    if (!match) match = { word: lower, meaningVi: "", ipa: "", level: "", topic: "", example: "" };

    var now = Date.now();
    var note = {
      id: "n" + now + Math.floor(Math.random() * 1000),
      title: lower,
      content: (match.example ? "V\u00ed d\u1ee5: " + match.example : ""),
      color: "blue",
      pinned: false,
      createdAt: now,
      updatedAt: now,
      source: {
        type: "word",
        word: lower,
        meaningVi: match.meaningVi || "",
        ipa: match.ipa || "",
        level: match.level || "",
        topic: match.topic || "",
        example: match.example || ""
      }
    };
    this.notes.push(note);
    this.selectedId = note.id;
    this.searchQuery = "";
    this.filter = "all";
    this.save();
    App.navigate("notes");
  },

  // ===================== LIFECYCLE =====================

  refreshView: function () {
    var mainContent = document.getElementById("main-content");
    if (!mainContent) return;
    mainContent.innerHTML = this.render();
    this.bindEvents();
  },

  bindEvents: function () {
    // nothing to attach; all handlers are inline
  },

  init: function () {
    this.load();
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    NotesView.init();
  });
} else {
  NotesView.init();
}
