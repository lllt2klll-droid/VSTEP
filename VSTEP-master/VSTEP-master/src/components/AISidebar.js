window.AISidebar = {
  chatHistory: [],

  render: function () {
    const toggleBtn = document.getElementById("ai-toggle-btn");
    const panelEl = document.getElementById("ai-popup");
    if (!toggleBtn || !panelEl) return;

    toggleBtn.innerHTML = `
      <img src="BO.webp" alt="BO" style="width:100%;height:100%;object-fit:contain;">
    `;
    toggleBtn.onclick = function (e) {
      if (App._wasDragged) return;
      AISidebar.toggle();
    };

    panelEl.innerHTML = `
      <div class="panel-header">
        <div class="panel-header-left">
          <div class="panel-icon ai">
            <img src="BO.webp" alt="BO" style="width:100%;height:100%;object-fit:contain;">
          </div>
          <h4>BO</h4>
        </div>
        <button class="panel-close" onclick="AISidebar.toggle()" aria-label="Đóng trợ lý BO" title="Đóng">✕</button>
      </div>

      <div id="ai-chat-messages" class="panel-body no-pad ai-msg-area" role="log" aria-live="polite" aria-label="Hội thoại">
        <div class="chat-bubble chat-bubble-ai">
          <p>Xin chào! Tôi là <strong>BO</strong> — hỏi tôi bất kỳ điều gì về tiếng Anh & VSTEP nhé!</p>
        </div>
      </div>

      <div class="ai-chat-input-area">
        <input type="text" id="ai-chat-input" class="input-field" placeholder="Hỏi về từ vựng, ngữ pháp..."
               style="flex:1;padding:0.45rem 0.75rem;font-size:0.82rem;"
               onkeydown="if(event.key==='Enter') AISidebar.sendMessage()" aria-label="Nhập câu hỏi">
        <button class="btn btn-primary" onclick="AISidebar.sendMessage()" id="ai-send-btn" style="padding:0.45rem 0.75rem;border-radius:6px;font-size:0.82rem;" title="Gửi" aria-label="Gửi tin nhắn">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;
  },
toggle: function () {
    const panel = document.getElementById("ai-popup");
    if (!panel) return;
    const toggleBtn = document.getElementById("ai-toggle-btn");
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
      // On mobile, use bottom sheet behavior (CSS handles positioning)
      panel.classList.toggle("open");
      toggleBtn?.classList.toggle("pulse", !panel.classList.contains("open"));
      if (panel.classList.contains("open")) {
        setTimeout(function () { document.getElementById("ai-chat-input")?.focus(); }, 300);
      }
    } else {
      // Desktop: position relative to button
      panel.classList.toggle("open");
      toggleBtn?.classList.toggle("pulse", !panel.classList.contains("open"));
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
        setTimeout(function () { document.getElementById("ai-chat-input")?.focus(); }, 300);
      }
    }
  },

  appendBubble: function (html, className) {
    const el = document.getElementById("ai-chat-messages");
    if (!el) return null;
    const div = document.createElement("div");
    div.className = "chat-bubble " + (className || "chat-bubble-ai");
    div.innerHTML = html;
    el.appendChild(div);
    this.scrollToBottom();
    return div;
  },

  appendTypingIndicator: function () {
    const el = document.getElementById("ai-chat-messages");
    if (!el) return null;
    const id = "typing-" + Date.now();
    const div = document.createElement("div");
    div.id = id;
    div.className = "chat-bubble chat-bubble-ai typing-indicator";
    div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    el.appendChild(div);
    this.scrollToBottom();
    return id;
  },

  removeTypingIndicator: function (id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  },

  scrollToBottom: function () {
    const el = document.getElementById("ai-chat-messages");
    if (el) el.scrollTop = el.scrollHeight;
  },

  sendMessage: async function () {
    const inputEl = document.getElementById("ai-chat-input");
    const sendBtn = document.getElementById("ai-send-btn");
    if (!inputEl) return;

    const userText = inputEl.value.trim();
    if (!userText) return;

    this.appendBubble(userText, "chat-bubble-user");
    this.chatHistory.push({ sender: "user", text: userText });
    inputEl.value = "";
    inputEl.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    const typingId = this.appendTypingIndicator();

    try {
      const aiReply = await GeminiService.getTutorChatResponse(userText, this.chatHistory);
      this.removeTypingIndicator(typingId);
      this.appendBubble(aiReply);
      this.chatHistory.push({ sender: "ai", text: aiReply });
    } catch (e) {
      if (e.isRateLimit) {
        var retryAfter = e.retryAfter || 60;
        var maxRetries = 3;
        var retryCount = 0;
        var success = false;
        while (retryCount < maxRetries && !success) {
          retryCount++;
          await GeminiService.showRetryCountdown(document.getElementById(typingId), "chat", retryAfter);
          try {
            var aiReply2 = await GeminiService.getTutorChatResponse(userText, this.chatHistory);
            this.removeTypingIndicator(typingId);
            this.appendBubble(aiReply2);
            this.chatHistory.push({ sender: "ai", text: aiReply2 });
            success = true;
          } catch (e2) {
            if (e2.isRateLimit) { retryAfter = e2.retryAfter || 60; }
            else {
              this.removeTypingIndicator(typingId);
              this.appendBubble('<p style="color:#ef4444;font-size:0.82rem;">⚠️ ' + e2.message + '</p>');
              success = true;
            }
          }
        }
        if (!success) {
          this.removeTypingIndicator(typingId);
          this.appendBubble('<div style="text-align:center;padding:0.75rem;color:#ef4444;font-size:0.82rem;"><p>⚠️ Đã thử lại 3 lần nhưng API Gemini vẫn quá tải.</p></div>');
        }
      } else {
        this.removeTypingIndicator(typingId);
        this.appendBubble('<p style="color:#ef4444;font-size:0.82rem;">⚠️ Lỗi: ' + e.message + '</p>');
      }
    }

    inputEl.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    inputEl.focus();
    this.scrollToBottom();
    App.addXp(5);
  },

  injectContext: function (contextText) {
    const inputEl = document.getElementById("ai-chat-input");
    if (inputEl) {
      inputEl.value = contextText;
      if (!document.getElementById("ai-popup").classList.contains("open")) this.toggle();
      inputEl.focus();
    }
  }
};