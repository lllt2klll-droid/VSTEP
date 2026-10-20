/* ==========================================================================
   TRANSLATOR VIEW - MULTI-LANGUAGE VSTEP LEARNING HUB
   ========================================================================== */

window.TranslatorView = {
  currentTargetLang: "en",

  render: function () {
    return `
      <div style="margin-bottom:2rem;">
        <h1 style="font-size:2rem;margin-bottom:0.5rem;">Dịch thuật & Phân tích</h1>
        <p style="color:var(--text-muted);">Dịch Việt-Anh và phân tích ngữ pháp chuyên sâu với AI.</p>
      </div>

      <!-- Translator Panel -->
      <div class="glass-card" style="padding:2rem;">
        <div class="translator-panel">
          <!-- INPUT: Tiếng Việt -->
          <div class="translation-box-container">
            <div class="translation-box-header">
              <span class="badge" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);">🇻🇳 Tiếng Việt (Nguồn)</span>
              <button class="btn btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" onclick="document.getElementById('trans-input').value=''; document.getElementById('trans-output').textContent = ''; document.getElementById('grammar-breakdown-panel').classList.add('hidden');">
                ✕ Xóa
              </button>
            </div>
            <textarea id="trans-input" class="trans-textarea" placeholder="Nhập văn bản tiếng Việt cần dịch và phân tích...&#10;&#10;Ví dụ: 'Học ngoại ngữ rất thú vị và bổ ích.'" oninput="TranslatorView.onInputChange()"></textarea>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;color:var(--text-muted);">
              <span id="input-char-count">0 ký tự</span>
              <button class="pronounce-btn" title="Phát âm" onclick="App.speak(document.getElementById('trans-input').value, 'vi')">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              </button>
            </div>
          </div>

          <!-- OUTPUT: Ngôn ngữ đích -->
          <div class="translation-box-container">
            <div class="translation-box-header">
              <span id="target-lang-badge" class="badge badge-en">🇬🇧 Tiếng Anh</span>
              <div style="display:flex;gap:0.5rem;">
                <button id="output-speak-btn" class="pronounce-btn" title="Phát âm kết quả dịch" onclick="App.speak(document.getElementById('trans-output').innerText, TranslatorView.currentTargetLang)">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                </button>
                <button class="pronounce-btn" title="Sao chép" onclick="navigator.clipboard.writeText(document.getElementById('trans-output').innerText)">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                </button>
              </div>
            </div>
            <div id="trans-output" class="trans-output-box">
              <span style="color:var(--text-muted);font-style:italic;">Kết quả dịch sẽ hiển thị tại đây...</span>
            </div>
            <div style="font-size:0.85rem;color:var(--text-muted);" id="translation-status">Sẵn sàng dịch</div>
          </div>
        </div>

        <!-- Translate Buttons -->
        <div class="trans-actions" style="margin-top:1.5rem;">
          <button class="btn btn-secondary" onclick="TranslatorView.translateAll()">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
            Dịch ngay
          </button>
          <button class="btn btn-accent" onclick="TranslatorView.analyzeGrammar()">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            Phân tích ngữ pháp chi tiết
          </button>
          <button class="btn btn-secondary" onclick="AISidebar.injectContext('Giải thích chi tiết hơn về câu: ' + document.getElementById('trans-input').value)" style="border-color:var(--primary);color:var(--primary);">
            🤖 Hỏi AI Tutor
          </button>
        </div>

        <!-- Grammar Breakdown Panel -->
        <div id="grammar-breakdown-panel" class="glass-card grammar-breakdown-panel hidden" style="margin-top:1.5rem;">
          <h3 style="font-size:1.05rem;">🔍 Phân tích ngữ pháp đối chiếu</h3>
          <div id="grammar-breakdown-list" class="grammar-breakdown-list">
            <!-- Kết quả phân tích sẽ được render ở đây -->
          </div>
        </div>
      </div>

      <!-- Tips Banner -->
      <div class="glass-card" style="margin-top:1.5rem;border-color:rgba(59,130,246,0.3);">
        <div style="display:flex;align-items:flex-start;gap:1rem;">
          <span style="font-size:1.5rem;">💡</span>
          <div>
            <h4 style="font-size:1rem;margin-bottom:0.5rem;">Mẹo dùng Bộ dịch hiệu quả</h4>
            <p style="font-size:0.9rem;color:var(--text-muted);">Bấm nút <strong>Phân tích ngữ pháp</strong> để nhận bảng phân tích chi tiết từng thành phần câu đối chiếu Việt-Anh. Nếu đã cấu hình Gemini API Key trong Cài đặt, kết quả phân tích sẽ được cung cấp bởi AI thực tế và chính xác hơn nhiều!</p>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents: function () {
    // Khởi tạo badge cho ngôn ngữ đang được chọn
    TranslatorView.setLang(TranslatorView.currentTargetLang);
  },

  setLang: function (lang) {
    TranslatorView.currentTargetLang = lang;

    const badgeEl = document.getElementById("target-lang-badge");
    const langInfo = {
      en: { label: "🇬🇧 Tiếng Anh", cls: "badge-en" }
    };
    if (badgeEl && langInfo[lang]) {
      badgeEl.textContent = langInfo[lang].label;
      badgeEl.className = "badge " + langInfo[lang].cls;
    }

    // Nếu đã có text, tự động dịch lại
    const inputEl = document.getElementById("trans-input");
    if (inputEl && inputEl.value.trim()) {
      TranslatorView.translateAll();
    }
  },

  onInputChange: function () {
    const inputEl = document.getElementById("trans-input");
    const countEl = document.getElementById("input-char-count");
    if (inputEl && countEl) {
      countEl.textContent = inputEl.value.length + " ký tự";
    }
  },

  translateAll: async function () {
    const inputEl = document.getElementById("trans-input");
    const outputEl = document.getElementById("trans-output");
    const statusEl = document.getElementById("translation-status");
    if (!inputEl || !outputEl) return;

    const text = inputEl.value.trim();
    if (!text) {
      alert("Vui lòng nhập văn bản cần dịch.");
      return;
    }

    if (statusEl) statusEl.innerHTML = '<span style="color:var(--primary)">⏳ Đang dịch...</span>';
    outputEl.innerHTML = '<div class="typing-indicator" style="padding:0.5rem 0;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';

    try {
      const result = await GeminiService.translateAndAnalyze(text, TranslatorView.currentTargetLang);
      outputEl.textContent = result.translatedText || "Không có kết quả.";
      if (statusEl) statusEl.innerHTML = '<span style="color:var(--accent)">✅ Dịch thành công</span>';
      App.addXp(10);
    } catch (e) {
      if (e.isRateLimit) {
        var retryAfter = e.retryAfter || 60;
        var maxRetries = 3;
        var retryCount = 0;
        var success = false;
        while (retryCount < maxRetries && !success) {
          retryCount++;
          await GeminiService.showRetryCountdown(outputEl, "trl", retryAfter);
          try {
            const result2 = await GeminiService.translateAndAnalyze(text, TranslatorView.currentTargetLang);
            outputEl.textContent = result2.translatedText || "Không có kết quả.";
            if (statusEl) statusEl.innerHTML = '<span style="color:var(--accent)">✅ Dịch thành công</span>';
            App.addXp(10);
            success = true;
          } catch (e2) {
            if (e2.isRateLimit) {
              retryAfter = e2.retryAfter || 60;
            } else {
              outputEl.textContent = "Lỗi dịch thuật: " + e2.message;
              if (statusEl) statusEl.innerHTML = '<span style="color:#ef4444">⚠️ Lỗi</span>';
              success = true;
            }
          }
        }
        if (!success) {
          outputEl.textContent = "Đã thử lại " + maxRetries + " lần nhưng API Gemini vẫn quá tải. Vui lòng thử lại sau hoặc cấu hình API Key trả phí trong Cài đặt.";
          if (statusEl) statusEl.innerHTML = '<span style="color:#ef4444">⚠️ Quá tải</span>';
        }
      } else {
        outputEl.textContent = "Lỗi dịch thuật: " + e.message;
        if (statusEl) statusEl.innerHTML = '<span style="color:#ef4444">⚠️ Lỗi</span>';
      }
    }
  },

  analyzeGrammar: async function () {
    const inputEl = document.getElementById("trans-input");
    const outputEl = document.getElementById("trans-output");
    const panelEl = document.getElementById("grammar-breakdown-panel");
    const listEl = document.getElementById("grammar-breakdown-list");
    if (!inputEl || !panelEl || !listEl) return;

    const text = inputEl.value.trim();
    if (!text) {
      alert("Vui lòng nhập văn bản để phân tích ngữ pháp.");
      return;
    }

    panelEl.classList.remove("hidden");
    listEl.innerHTML = '<div class="typing-indicator" style="padding:1rem 0"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';

    try {
      const result = await GeminiService.translateAndAnalyze(text, TranslatorView.currentTargetLang);

      if (outputEl) outputEl.textContent = result.translatedText || "";

      if (result.grammarBreakdown && result.grammarBreakdown.length > 0) {
        listEl.innerHTML = result.grammarBreakdown.map(item => `
          <div class="grammar-item">
            <span class="grammar-token">${item.token}</span>
            <span>${item.explanation}</span>
          </div>
        `).join("");
      } else {
        listEl.innerHTML = '<p style="color:var(--text-muted)">Không có dữ liệu phân tích. Vui lòng cấu hình Gemini API Key để nhận phân tích đầy đủ.</p>';
      }

      App.addXp(15);
    } catch (e) {
      if (e.isRateLimit) {
        var retryAfter = e.retryAfter || 60;
        var maxRetries = 3;
        var retryCount = 0;
        var success = false;
        while (retryCount < maxRetries && !success) {
          retryCount++;
          await GeminiService.showRetryCountdown(listEl, "gram", retryAfter);
          try {
            const result2 = await GeminiService.translateAndAnalyze(text, TranslatorView.currentTargetLang);
            if (outputEl) outputEl.textContent = result2.translatedText || "";
            if (result2.grammarBreakdown && result2.grammarBreakdown.length > 0) {
              listEl.innerHTML = result2.grammarBreakdown.map(item => `
                <div class="grammar-item">
                  <span class="grammar-token">${item.token}</span>
                  <span>${item.explanation}</span>
                </div>
              `).join("");
            } else {
              listEl.innerHTML = '<p style="color:var(--text-muted)">Không có dữ liệu phân tích.</p>';
            }
            App.addXp(15);
            success = true;
          } catch (e2) {
            if (e2.isRateLimit) {
              retryAfter = e2.retryAfter || 60;
            } else {
              listEl.innerHTML = `<p style="color:#ef4444">⚠️ Lỗi phân tích: ${e2.message}</p>`;
              success = true;
            }
          }
        }
        if (!success) {
          listEl.innerHTML = '<div style="text-align:center;padding:1rem;color:#ef4444;"><div style="font-size:2rem;margin-bottom:0.75rem;">⚠️</div><p style="font-size:0.9rem;line-height:1.5;">Đã thử lại ' + maxRetries + ' lần nhưng API Gemini vẫn quá tải.</p><p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">Vui lòng thử lại sau hoặc cấu hình API Key trả phí trong Cài đặt.</p></div>';
        }
      } else {
        listEl.innerHTML = `<p style="color:#ef4444">⚠️ Lỗi phân tích: ${e.message}</p>`;
      }
    }
  }
};
