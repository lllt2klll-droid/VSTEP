window.WordSaver = {
  getSaved: function () {
    try {
      return StorageManager.getSavedWords();
    } catch (e) {
      return [];
    }
  },

  save: async function (word) {
    var saved = this.getSaved();
    var lower = word.toLowerCase().trim();
    if (!lower || lower.length < 2) return;
    if (
      saved.some(function (w) {
        return w.word === lower;
      })
    )
      return;
    // 1. Local lookup: Vstep vocab first, then the multi-language vocab bank
    var match = (window.VstepVocabData || []).find(function (v) {
      return v.word.toLowerCase() === lower;
    });
    if (!match && window.VocabularyData) {
      var vm = VocabularyData.find(function (v) {
        return v.english && v.english.word && v.english.word.toLowerCase() === lower;
      });
      if (vm) {
        match = {
          meaningVi: vm.vietnamese || "",
          ipa: vm.english.ipa || "",
          id: null,
          level: "",
          topic: vm.topic || "",
          example: vm.english.example || ""
        };
      }
    }
    // 2. IPA fallback from VstepView's offline dictionary
    var ipaFallback = "";
    if (!(match && match.ipa) && window.VstepView && VstepView.getWordIPA) {
      ipaFallback = VstepView.getWordIPA(lower);
    }
    var entry = {
      word: lower,
      meaningVi: match ? match.meaningVi : "",
      ipa: match && match.ipa ? match.ipa : ipaFallback,
      id: match ? match.id : null,
      level: match ? match.level : "",
      topic: match ? match.topic : "",
      example: match ? match.example : "",
      isUserAdded: !match,
      timestamp: Date.now(),
    };
    saved.push(entry);
    StorageManager.setSavedWords(saved);
    if (!match && window.GeminiService) {
      var aiData = await GeminiService.lookupWord(lower);
      if (aiData) {
        entry.meaningVi = aiData.meaningVi || "";
        entry.ipa = aiData.ipa || entry.ipa;
        entry.level = aiData.level || "";
        entry.topic = aiData.topic || "";
        entry.example = aiData.example || "";
        StorageManager.setSavedWords(saved);
      }
    }
    return entry;
  },

  getOrphans: function () {
    var saved = this.getSaved();
    return saved.filter(function (s) {
      return !(window.VstepVocabData || []).some(function (v) {
        return v.word.toLowerCase() === s.word;
      });
    });
  },

  fillOrphanWord: async function (word) {
    var saved = this.getSaved();
    var s = saved.find(function (w) {
      return w.word === word;
    });
    if (!s) return false;
    var aiData = window.GeminiService
      ? await GeminiService.lookupWord(word)
      : null;
    if (aiData) {
      s.meaningVi = aiData.meaningVi || s.meaningVi;
      s.ipa = aiData.ipa || s.ipa;
      s.level = aiData.level || s.level;
      s.topic = aiData.topic || s.topic;
      s.example = aiData.example || s.example;
      StorageManager.setSavedWords(saved);
      return true;
    }
    return false;
  },

  fillOrphanWords: async function (onProgress) {
    var saved = this.getSaved();
    var orphans = saved.filter(function (s) {
      return (
        !(window.VstepVocabData || []).some(function (v) {
          return v.word.toLowerCase() === s.word;
        }) && !s.meaningVi
      );
    });
    if (orphans.length === 0) return 0;
    var filled = 0;
    for (var i = 0; i < orphans.length; i++) {
      var s = orphans[i];
      var aiData = window.GeminiService
        ? await GeminiService.lookupWord(s.word)
        : null;
      if (aiData) {
        s.meaningVi = aiData.meaningVi || s.meaningVi;
        s.ipa = aiData.ipa || s.ipa;
        s.level = aiData.level || s.level;
        s.topic = aiData.topic || s.topic;
        s.example = aiData.example || s.example;
        filled++;
      }
      if (onProgress) onProgress(i + 1, orphans.length, s.word);
    }
    StorageManager.setSavedWords(saved);
    return filled;
  },

  remove: function (word) {
    var lower = word.toLowerCase().trim();
    var saved = this.getSaved().filter(function (w) {
      return w.word !== lower;
    });
    StorageManager.setSavedWords(saved);
  },

  isSaved: function (word) {
    var lower = word.toLowerCase().trim();
    return this.getSaved().some(function (w) {
      return w.word === lower;
    });
  },

  count: function () {
    return this.getSaved().length;
  },

  getWordAtPoint: function (x, y) {
    var range;
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(x, y);
    } else if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      if (pos)
        range = { startContainer: pos.offsetNode, startOffset: pos.offset };
    }
    if (range && range.startContainer) {
      var textNode = range.startContainer;
      var offset = range.startOffset;
      var text = textNode.textContent || "";
      var start = offset;
      while (start > 0 && /\w/.test(text[start - 1])) start--;
      var end = offset;
      while (end < text.length && /\w/.test(text[end])) end++;
      return text.substring(start, end) || null;
    }

    var hoveredEl = document.elementFromPoint
      ? document.elementFromPoint(x, y)
      : null;
    if (hoveredEl && hoveredEl.closest) {
      var savedWordEl = hoveredEl.closest(".word-saved");
      if (savedWordEl && savedWordEl.textContent) {
        return savedWordEl.textContent.trim();
      }
    }
    return null;
  },

  getSavedEntry: function (word) {
    var lower = (word || "").toLowerCase().trim();
    if (!lower) return null;
    return this.getSaved().find(function (w) {
      return w.word === lower;
    });
  },

  showSavedInfo: function (x, y, word, entry) {
    document.querySelectorAll(".word-save-menu").forEach(function (el) {
      el.remove();
    });

    var card = document.createElement("div");
    card.className = "word-save-menu";
    card.style.cssText =
      "position:fixed;z-index:99999;left:" +
      x +
      "px;top:" +
      y +
      "px;min-width:240px;max-width:300px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;padding:12px 12px 10px;box-shadow:0 12px 34px rgba(0,0,0,0.32);font-size:0.9rem;backdrop-filter:blur(12px);";

    var title = document.createElement("div");
    title.style.cssText =
      "font-weight:700;font-size:1rem;color:var(--text-primary);margin-bottom:6px;";
    title.textContent = word;
    card.appendChild(title);

    var ipa = document.createElement("div");
    ipa.style.cssText =
      "font-size:0.82rem;color:var(--accent);margin-bottom:6px;";
    ipa.textContent = entry.ipa ? "/" + entry.ipa + "/" : "Không có phiên âm";
    card.appendChild(ipa);

    var meaning = document.createElement("div");
    meaning.style.cssText =
      "margin-bottom:6px;color:var(--text-primary);line-height:1.5;";
    meaning.textContent = entry.meaningVi || "Chưa có nghĩa trong từ điển";
    card.appendChild(meaning);

    if (entry.example) {
      var example = document.createElement("div");
      example.style.cssText =
        "font-size:0.82rem;color:var(--text-muted);line-height:1.45;";
      example.textContent = "Ví dụ: " + entry.example;
      card.appendChild(example);
    }

    var buttonRow = document.createElement("div");
    buttonRow.style.cssText =
      "display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;";

    var dictBtn = document.createElement("button");
    dictBtn.textContent = "Mở từ điển";
    dictBtn.style.cssText =
      "border:none;border-radius:8px;padding:6px 10px;background:var(--accent);color:white;cursor:pointer;";
    dictBtn.onclick = function () {
      card.remove();
      if (window.App) {
        App.navigate("translator");
        setTimeout(function () {
          var ta = document.getElementById("trans-input");
          if (ta) {
            ta.value = word;
            ta.dispatchEvent(new Event("input"));
          }
        }, 300);
      }
    };
    buttonRow.appendChild(dictBtn);

    var removeBtn = document.createElement("button");
    removeBtn.textContent = "Bỏ lưu";
    removeBtn.style.cssText =
      "border:1px solid var(--border-color);border-radius:8px;padding:6px 10px;background:transparent;color:var(--text-primary);cursor:pointer;";
    removeBtn.onclick = function () {
      WordSaver.remove(word);
      card.remove();
      if (window.VstepView && VstepView.highlightWordInPassages) {
        VstepView.highlightWordInPassages(word);
      }
    };
    buttonRow.appendChild(removeBtn);

    card.appendChild(buttonRow);

    // External dictionaries shortcuts matching shadowing dictionary popup
    var extDictContainer = document.createElement("div");
    extDictContainer.style.cssText =
      "margin-top:12px;padding-top:10px;border-top:1px solid var(--border-color);";
    
    var extDictLabel = document.createElement("p");
    extDictLabel.style.cssText =
      "font-size:0.72rem;color:var(--text-muted);margin:0 0 6px 0;font-weight:600;";
    extDictLabel.textContent = "Xem các từ điển khác";
    extDictContainer.appendChild(extDictLabel);

    var linkRow = document.createElement("div");
    linkRow.style.cssText = "display:flex;gap:6px;";

    var oxfordLink = document.createElement("a");
    oxfordLink.href = "https://www.oxfordlearnersdictionaries.com/definition/english/" + encodeURIComponent(word.toLowerCase().trim());
    oxfordLink.target = "_blank";
    oxfordLink.rel = "noopener";
    oxfordLink.style.cssText =
      "flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:5px;border-radius:8px;font-size:0.75rem;font-weight:700;text-decoration:none;background:#E97E2A;color:#fff;transition:opacity 0.15s;";
    oxfordLink.onmouseover = function () { this.style.opacity = "0.85"; };
    oxfordLink.onmouseout = function () { this.style.opacity = "1"; };
    oxfordLink.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> Oxford';

    var cambridgeLink = document.createElement("a");
    cambridgeLink.href = "https://dictionary.cambridge.org/dictionary/english/" + encodeURIComponent(word.toLowerCase().trim());
    cambridgeLink.target = "_blank";
    cambridgeLink.rel = "noopener";
    cambridgeLink.style.cssText =
      "flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:5px;border-radius:8px;font-size:0.75rem;font-weight:700;text-decoration:none;background:#2D68C4;color:#fff;transition:opacity 0.15s;";
    cambridgeLink.onmouseover = function () { this.style.opacity = "0.85"; };
    cambridgeLink.onmouseout = function () { this.style.opacity = "1"; };
    cambridgeLink.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg> Cambridge';

    linkRow.appendChild(oxfordLink);
    linkRow.appendChild(cambridgeLink);
    extDictContainer.appendChild(linkRow);
    card.appendChild(extDictContainer);

    document.body.appendChild(card);

    var closeHandler = function (e) {
      if (!card.contains(e.target)) {
        card.remove();
        document.removeEventListener("click", closeHandler);
      }
    };
    setTimeout(function () {
      document.addEventListener("click", closeHandler);
    }, 50);
  },

  showMenu: function (x, y, word) {
    document.querySelectorAll(".word-save-menu").forEach(function (el) {
      el.remove();
    });

    var lower = word.toLowerCase().trim();
    var isSaved = this.isSaved(lower);
    if (isSaved) {
      var entry = this.getSavedEntry(lower);
      this.showSavedInfo(
        x,
        y,
        lower,
        entry || { meaningVi: "", ipa: "", example: "" },
      );
      return;
    }

    var menu = document.createElement("div");
    menu.className = "word-save-menu";
    menu.style.cssText =
      "position:fixed;z-index:99999;left:" +
      x +
      "px;top:" +
      y +
      "px;min-width:180px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:6px 0;box-shadow:0 8px 30px rgba(0,0,0,0.35);font-size:0.9rem;backdrop-filter:blur(12px);";

    var header = document.createElement("div");
    header.style.cssText =
      "padding:4px 16px 6px;font-size:0.75rem;color:var(--text-muted);border-bottom:1px solid var(--border-color);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;";
    header.textContent = "\u201C" + word + "\u201D";
    menu.appendChild(header);

    var savedItem = document.createElement("div");
    savedItem.style.cssText =
      "padding:8px 16px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:background 0.15s;";
    savedItem.onmouseenter = function () {
      this.style.background = "var(--bg-hover, rgba(255,255,255,0.06))";
    };
    savedItem.onmouseleave = function () {
      this.style.background = "";
    };

    if (isSaved) {
      savedItem.innerHTML = "\u2B50 B\u1ECF l\u01B0u t\u1EEB n\xE0y";
      savedItem.onclick = function () {
        WordSaver.remove(lower);
        menu.remove();
      };
    } else {
      savedItem.innerHTML =
        "\u2B50 L\u01B0u t\u1EEB n\xE0y v\xE0o danh s\xE1ch";
      savedItem.onclick = async function () {
        savedItem.innerHTML = "\u23F3 \u0110ang l\u01B0u...";
        savedItem.onclick = null;
        await WordSaver.save(lower);
        if (window.VstepView && VstepView.highlightWordInPassages) {
          VstepView.highlightWordInPassages(lower);
        }
        savedItem.innerHTML = "\u2714 \u0110\xE3 l\u01B0u!";
        savedItem.style.color = "var(--accent)";
        setTimeout(function () {
          menu.remove();
        }, 700);
      };
    }
    menu.appendChild(savedItem);

    var match = (window.VstepVocabData || []).find(function (v) {
      return v.word.toLowerCase() === lower;
    });
    if (!match) {
      var sep = document.createElement("div");
      sep.style.cssText =
        "height:1px;background:var(--border-color);margin:4px 0;";
      menu.appendChild(sep);
      var lookup = document.createElement("div");
      lookup.style.cssText =
        "padding:8px 16px;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--text-muted);transition:background 0.15s;";
      lookup.innerHTML = '\uD83D\uDD0D Tra t\u1EEB "' + word + '"';
      lookup.onmouseenter = function () {
        this.style.background = "var(--bg-hover, rgba(255,255,255,0.06))";
      };
      lookup.onmouseleave = function () {
        this.style.background = "";
      };
      lookup.onclick = function () {
        menu.remove();
        App.navigate("translator");
        setTimeout(function () {
          var ta = document.getElementById("trans-input");
          if (ta) {
            ta.value = lower;
            ta.dispatchEvent(new Event("input"));
          }
        }, 300);
      };
      menu.appendChild(lookup);
    }

    document.body.appendChild(menu);

    var closeHandler = function (e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener("click", closeHandler);
      }
    };
    setTimeout(function () {
      document.addEventListener("click", closeHandler);
    }, 50);
  },

  init: function () {
    document.addEventListener("contextmenu", function (e) {
      var passageEl = e.target.closest(
        ".vstep-passage-panel, .vstep-panel, .ai-message, .learn-passage",
      );
      if (!passageEl) return;
      var word = WordSaver.getWordAtPoint(e.clientX, e.clientY);
      if (word && word.length >= 2 && /^[a-zA-Z]/.test(word)) {
        e.preventDefault();
        WordSaver.showMenu(e.clientX, e.clientY, word);
      }
    });
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    WordSaver.init();
  });
} else {
  WordSaver.init();
}
