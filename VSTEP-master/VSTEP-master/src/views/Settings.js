/* ==========================================================================
   SETTINGS VIEW - MULTI-LANGUAGE VSTEP LEARNING HUB
   ========================================================================== */

window.SettingsView = {
  // Safe storage helpers (localStorage can throw in private mode / when full)
  _lsGet: function (key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  _lsSet: function (key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) {
      console.error("SettingsView storage error:", e);
      return false;
    }
  },
  _lsRemove: function (key) {
    try { localStorage.removeItem(key); return true; } catch (e) { return false; }
  },

  render: function () {
    // Audio is optional. Keep Settings usable even if Web Audio is unavailable.
    const sound = window.SoundManager || {
      getEnabled: function () { return false; },
      getVolume: function () { return 0.5; },
      setEnabled: function () {},
      setVolume: function () {},
      play: function () {}
    };
    const apiKeys = GeminiService.getApiKeys();
    const keyModels = GeminiService.getKeyModels();
    const currentKeyIndex = GeminiService.getCurrentKeyIndex();
    const provider = GeminiService.getProvider();

    return `
      <div style="margin-bottom:2rem;">
        <h1 style="font-size:2rem;margin-bottom:0.35rem;">⚙️ Cài đặt hệ thống</h1>
        <p style="color:var(--text-muted);">Cấu hình trợ lý AI, giọng đọc và giao diện để cá nhân hóa trải nghiệm học tập của bạn.</p>
      </div>

      <div class="settings-grid">

        <!-- ====== AI & API Key Settings ====== -->
        <div class="glass-card" style="border-color:rgba(168,85,247,0.3);">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">🤖</span>
            <h2 style="font-size:1.1rem;">Cấu hình AI & API Key</h2>
          </div>
          <div class="setting-group">
            <div style="padding:1rem;background:rgba(168,85,247,0.06);border-radius:12px;border:1px solid rgba(168,85,247,0.2);">
              <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">Khi có API Key, AI Tutor sẽ dùng mô hình AI thực tế để:</p>
              <ul style="font-size:0.85rem;color:var(--text-muted);padding-left:1.25rem;line-height:1.8;">
                <li>Trả lời câu hỏi về ngữ pháp và từ vựng chính xác hơn</li>
                <li>Dịch thuật và phân tích ngữ pháp chi tiết</li>
                <li>Chấm điểm bài viết VSTEP Writing với nhận xét từng lỗi</li>
                <li>Phân tích bài nói VSTEP Speaking từ bản ghi âm</li>
              </ul>
            </div>

            <div class="setting-row">
              <div class="setting-desc">
                <h4>API Keys (Nhiều key)</h4>
                <p>Mỗi key có thể chọn <strong>Provider</strong> và <strong>Model</strong> riêng. Hệ thống tự động chuyển đổi key khi hết quota, mỗi key dùng đúng provider + model của nó. Key nào chưa đặt provider sẽ mặc định dùng Gemini.</p>
              </div>
            </div>
            
            <div id="api-keys-container">
              ${apiKeys.map((key, index) => {
                const maskedKey = key ? key.substring(0, 8) + "****" + key.slice(-4) : "";
                const isActive = index === currentKeyIndex;
                const currentModel = keyModels[index] || "";
                const keyProvider = GeminiService.getProvider(index);
                const keyProviderInfo = GeminiService.PROVIDERS[keyProvider];
                return `
                  <div style="background:var(--bg-input);border-radius:8px;padding:1rem;margin-bottom:0.75rem;border:1px solid var(--border-color);">
                    <div style="display:flex;gap:0.75rem;margin-bottom:0.5rem;align-items:center;">
                      <span style="min-width:30px;font-size:0.85rem;color:var(--text-muted);">Key ${index + 1}:</span>
                      <input type="password" class="input-field api-key-field" placeholder="${keyProviderInfo.keyPlaceholder}" 
                             value="${key}" style="flex:1;" data-index="${index}">
                      <button class="btn ${isActive ? 'btn-primary' : 'btn-secondary'}" style="font-size:0.8rem;padding:0.4rem 0.8rem;" 
                              onclick="SettingsView.setActiveKey(${index})" ${isActive ? 'disabled' : ''}>
                        ${isActive ? '✓ Đang dùng' : 'Chọn'}
                      </button>
                      <button class="btn" style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#ef4444;font-size:0.8rem;padding:0.4rem 0.8rem;" 
                              onclick="SettingsView.removeApiKey(${index})">
                        Xóa
                      </button>
                    </div>
                    <div style="display:flex;gap:0.75rem;align-items:center;margin-top:0.5rem;">
                      <span style="min-width:30px;font-size:0.85rem;color:var(--text-muted);">Provider:</span>
                      <select class="select-dropdown key-provider-select" style="flex:1;padding:0.4rem 0.6rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.85rem;" 
                              data-index="${index}" onchange="SettingsView.setKeyProvider(${index}, this.value)">
                        ${SettingsView.providerOptions(keyProvider)}
                      </select>
                    </div>
                    <div style="display:flex;gap:0.75rem;align-items:center;margin-top:0.5rem;">
                      <span style="min-width:30px;font-size:0.85rem;color:var(--text-muted);">Model:</span>
                      <select class="select-dropdown key-model-select" style="flex:1;padding:0.4rem 0.6rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.85rem;" 
                              data-index="${index}" onchange="SettingsView.saveKeyModel(${index}, this.value)">
                        ${SettingsView.modelOptions(keyProvider, currentModel)}
                      </select>
                    </div>
                    <div id="key-provider-info-${index}">
                      ${SettingsView.keyProviderInfoHtml(index)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            
            <div style="display:flex;gap:0.75rem;margin-top:0.5rem;">
              <button class="btn btn-secondary" onclick="SettingsView.addApiKeyField()">
                ➕ Thêm key mới
              </button>
              <button class="btn btn-primary" onclick="SettingsView.saveAllApiKeys()">
                💾 Lưu tất cả
              </button>
            </div>
            
            ${apiKeys.length > 0 ? `
              <div style="padding:0.75rem;background:rgba(16,185,129,0.1);border-radius:8px;font-size:0.85rem;border:1px solid rgba(16,185,129,0.3);margin-top:0.75rem;">
                ✅ Đang có <strong>${apiKeys.length}</strong> API key. Key đang dùng: <strong>Key ${currentKeyIndex + 1}</strong>
                ${apiKeys.length > 1 ? '<br><span style="color:var(--text-muted);">Hệ thống sẽ tự động chuyển sang key khác khi key hiện tại hết quota.</span>' : ''}
              </div>
            ` : (provider === "pollinations" ? `
              <div style="padding:0.75rem;background:rgba(16,185,129,0.1);border-radius:8px;font-size:0.85rem;border:1px solid rgba(16,185,129,0.3);margin-top:0.75rem;">
                ✅ <strong>Pollinations không cần key</strong> — bạn có thể dùng AI ngay. Bấm "Kiểm tra kết nối" để xác nhận.
              </div>
            ` : `
              <div style="padding:0.75rem;background:rgba(245,158,11,0.1);border-radius:8px;font-size:0.85rem;border:1px solid rgba(245,158,11,0.3);margin-top:0.75rem;">
                ⚠️ Chưa có API Key. AI đang chạy ở chế độ <strong>Offline Simulator</strong>.
              </div>
            `)}

            <div style="display:flex;justify-content:center;">
              <button class="btn btn-secondary" style="font-size:0.85rem;" onclick="SettingsView.testApiConnection()">
                🔌 Kiểm tra kết nối API
              </button>
            </div>
            <div id="api-test-result" style="font-size:0.85rem;text-align:center;"></div>
          </div>
        </div>

        <!-- ====== Display Settings ====== -->
        <div class="glass-card">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">🖥️</span>
            <h2 style="font-size:1.1rem;">Hiển thị</h2>
          </div>
          <div class="setting-group">
            <div class="setting-row">
              <div class="setting-desc">
                <h4>Chủ đề giao diện</h4>
                <p>Chọn màu sắc và phong cách giao diện phù hợp với bạn</p>
              </div>
            </div>
            <div class="theme-selector-grid">
              <button class="theme-btn ${AppState.theme === 'dark' ? 'active' : ''}" data-theme-id="dark" id="theme-btn-dark" onclick="SettingsView.setTheme('dark')">
                <div class="theme-preview-dot"></div>
                🌙 Tối
              </button>
              <button class="theme-btn ${AppState.theme === 'light' ? 'active' : ''}" data-theme-id="light" id="theme-btn-light" onclick="SettingsView.setTheme('light')">
                <div class="theme-preview-dot"></div>
                ☀️ Sáng
              </button>
              <button class="theme-btn ${AppState.theme === 'cyberpunk' ? 'active' : ''}" data-theme-id="cyberpunk" id="theme-btn-cyberpunk" onclick="SettingsView.setTheme('cyberpunk')">
                <div class="theme-preview-dot"></div>
                ⚡ Cyberpunk
              </button>
              <button class="theme-btn ${AppState.theme === 'sepia' ? 'active' : ''}" data-theme-id="sepia" id="theme-btn-sepia" onclick="SettingsView.setTheme('sepia')">
                <div class="theme-preview-dot"></div>
                📖 Sepia
              </button>
            </div>
          </div>
        </div>

        <!-- ====== Font Size Settings ====== -->
        <div class="glass-card">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">🔤</span>
            <h2 style="font-size:1.1rem;">Cỡ chữ</h2>
          </div>
          <div class="setting-group">
            <div class="setting-row">
              <div class="setting-desc">
                <h4>Cỡ chữ cơ bản</h4>
                <p>Điều chỉnh kích thước chữ mặc định (12px - 24px)</p>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;min-width:180px;">
                <input type="range" id="font-size-slider" class="range-slider" min="12" max="24" step="1" 
                       value="${AppState.fontSize}"
                       oninput="document.getElementById('font-size-val').textContent=this.value+'px'; SettingsView.setFontSize(this.value);">
                <span id="font-size-val" style="min-width:40px;font-weight:600;">${AppState.fontSize}px</span>
              </div>
            </div>
            <div class="setting-row">
              <div class="setting-desc">
                <h4>Xem trước</h4>
                <p>Nhìn thấy trước văn bản với cỡ chữ đã chọn</p>
              </div>
              <div style="padding:0.75rem;background:var(--bg-input);border-radius:8px;border:1px solid var(--border-color);font-size:${AppState.fontSize}px;">
                Đây là văn bản mẫu để xem trước cỡ chữ.
              </div>
            </div>
          </div>
        </div>

        <!-- ====== Frame Size Settings ====== -->
        <div class="glass-card">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">📐</span>
            <h2 style="font-size:1.1rem;">Kích thước khung</h2>
          </div>
          <div class="setting-group">
            <div class="setting-row">
              <div class="setting-desc">
                <h4>Chiều rộng khung làm việc</h4>
                <p>Điều chỉnh chiều rộng của vùng làm việc chính (80% - 100%)</p>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;min-width:180px;">
                <input type="range" id="frame-size-slider" class="range-slider" min="80" max="100" step="5" 
                       value="${AppState.frameSize}"
                       oninput="document.getElementById('frame-size-val').textContent=this.value+'%'; SettingsView.setFrameSize(this.value);">
                <span id="frame-size-val" style="min-width:40px;font-weight:600;">${AppState.frameSize}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ====== Voice / TTS Settings ====== -->
        <div class="glass-card">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">🔊</span>
            <h2 style="font-size:1.1rem;">Cài đặt Giọng đọc (TTS)</h2>
          </div>
          <div class="setting-group">
            <div class="setting-row">
              <div class="setting-desc">
                <h4>Tốc độ giọng đọc</h4>
                <p>Điều chỉnh tốc độ nói của trợ lý phát âm (0.5x - 2.0x)</p>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;min-width:180px;">
                <input type="range" id="speed-slider" class="range-slider" min="0.5" max="2.0" step="0.1" 
                       value="${AppState.voiceSpeed}"
                       oninput="document.getElementById('speed-val').textContent=parseFloat(this.value).toFixed(1)+'x'; App.saveSettings({voiceSpeed:parseFloat(this.value)});">
                <span id="speed-val" style="min-width:40px;font-weight:600;">${parseFloat(AppState.voiceSpeed).toFixed(1)}x</span>
              </div>
            </div>

            <div class="setting-row">
              <div class="setting-desc">
                <h4>Tông giọng (Pitch)</h4>
                <p>Điều chỉnh tần số tông giọng đọc (0.5 - 2.0)</p>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;min-width:180px;">
                <input type="range" id="pitch-slider" class="range-slider" min="0.5" max="2.0" step="0.1"
                       value="${AppState.voicePitch}"
                       oninput="document.getElementById('pitch-val').textContent=parseFloat(this.value).toFixed(1); App.saveSettings({voicePitch:parseFloat(this.value)});">
                <span id="pitch-val" style="min-width:40px;font-weight:600;">${parseFloat(AppState.voicePitch).toFixed(1)}</span>
              </div>
            </div>

            <div class="setting-row">
              <div class="setting-desc">
                <h4>Kiểm tra giọng đọc</h4>
                <p>Thử nghe giọng đọc với cài đặt hiện tại</p>
              </div>
              <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.5rem 0.75rem;" onclick="App.speak('Hello! Testing voice.', 'en')">🔊 Kiểm tra giọng đọc</button>
            </div>
          </div>
        </div>

        <!-- ====== Sound Effects Settings ====== -->
        <div class="glass-card">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">🔔</span>
            <h2 style="font-size:1.1rem;">Hiệu ứng âm thanh</h2>
          </div>
          <div class="setting-group">
            <div class="setting-row">
              <div class="setting-desc">
                <h4>Bật âm thanh</h4>
                <p>Phát tiếng khi bấm nút, đạt XP/streak và khi AI trả lời xong</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="sound-toggle" ${SoundManager.getEnabled() ? 'checked' : ''} onchange="SettingsView.setSoundEnabled(this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-row">
              <div class="setting-desc">
                <h4>Âm lượng</h4>
                <p>Điều chỉnh độ to của hiệu ứng âm thanh (0% - 100%)</p>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;min-width:180px;">
                <input type="range" id="sound-volume-slider" class="range-slider" min="0" max="1" step="0.05"
                       value="${SoundManager.getVolume()}"
                       oninput="var v=parseFloat(this.value);document.getElementById('sound-vol-val').textContent=Math.round(v*100)+'%';if(window.SoundManager&&window.SoundManager.setVolume)window.SoundManager.setVolume(v);App.saveSettings({soundVolume:v});">
                <span id="sound-vol-val" style="min-width:40px;font-weight:600;">${Math.round(parseFloat(SoundManager.getVolume()) * 100)}%</span>
              </div>
            </div>

            <div class="setting-row">
              <div class="setting-desc">
                <h4>Nghe thử</h4>
                <p>Phát thử các hiệu ứng âm thanh với cài đặt hiện tại</p>
              </div>
              <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.5rem 0.75rem;" onclick="SoundManager.play('success');setTimeout(function(){SoundManager.play('notify')},400)">🔊 Nghe thử</button>
            </div>
          </div>
        </div>

        <!-- ====== Progress Reset ====== -->
        <div class="glass-card" style="border-color:rgba(239,68,68,0.2);">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">📊</span>
            <h2 style="font-size:1.1rem;">Tiến độ & Dữ liệu học tập</h2>
          </div>
          <div class="setting-group">
            <div style="display:flex;gap:1rem;margin-bottom:1rem;">
              <div style="flex:1;text-align:center;padding:1rem;background:var(--bg-input);border-radius:12px;">
                <p style="font-size:1.8rem;font-weight:800;color:#3b82f6;">${AppState.progress.en}%</p>
                <p style="font-size:0.8rem;color:var(--text-muted);">🇬🇧 English</p>
              </div>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:center;padding:1rem;background:rgba(239,68,68,0.05);border-radius:8px;border:1px solid rgba(239,68,68,0.2);">
              <div style="flex:1;">
                <h4 style="font-size:0.95rem;margin-bottom:0.25rem;">Đặt lại toàn bộ tiến độ</h4>
                <p style="font-size:0.8rem;color:var(--text-muted);">⚠️ Xóa toàn bộ dữ liệu XP, streak và lịch sử học. Không thể hoàn tác.</p>
              </div>
              <button class="btn" style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#ef4444;" onclick="SettingsView.resetProgress()">
                🗑️ Đặt lại
              </button>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:center;padding:1rem;background:rgba(220,38,38,0.08);border-radius:8px;border:1px solid rgba(220,38,38,0.3);margin-top:0.75rem;">
              <div style="flex:1;">
                <h4 style="font-size:0.95rem;margin-bottom:0.25rem;color:#dc2626;">🔄 Reset toàn bộ dữ liệu</h4>
                <p style="font-size:0.8rem;color:var(--text-muted);">⚠️ Xóa TẤT CẢ dữ liệu như khi mới cài đặt. Bài kiểm tra, từ vựng, cài đặt... sẽ bị xóa vĩnh viễn.</p>
              </div>
              <button class="btn" style="background:rgba(220,38,38,0.2);border:1px solid #dc2626;color:#dc2626;" onclick="SettingsView.resetAllData()">
                🔄 Reset All
              </button>
            </div>
          </div>
        </div>

        <!-- ====== Data Backup & Export ====== -->
        <div class="glass-card" style="border-color:rgba(16,185,129,0.3);">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <span style="font-size:1.5rem;">💾</span>
            <h2 style="font-size:1.1rem;">Sao lưu & Khôi phục dữ liệu</h2>
          </div>
          <div class="setting-group">
            <div style="padding:1rem;background:rgba(16,185,129,0.06);border-radius:12px;border:1px solid rgba(16,185,129,0.2);margin-bottom:1rem;">
              <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.5rem;">💡 Dữ liệu của bạn được tự động lưu trữ an toàn:</p>
              <ul style="font-size:0.85rem;color:var(--text-muted);padding-left:1.25rem;line-height:1.8;">
                <li>Auto-save mỗi 30 giây</li>
                <li>Sync giữa các tab trình duyệt</li>
                <li>Backup tự động trước khi đóng trang</li>
                <li>Không bao giờ mất dữ liệu khi reset/refresh</li>
              </ul>
            </div>

            <div style="display:flex;gap:0.75rem;align-items:center;padding:1rem;background:var(--bg-input);border-radius:8px;margin-bottom:0.75rem;">
              <div style="flex:1;">
                <h4 style="font-size:0.95rem;margin-bottom:0.25rem;">Xuất dữ liệu (Export)</h4>
                <p style="font-size:0.8rem;color:var(--text-muted);">Tải xuống file JSON chứa toàn bộ dữ liệu học tập của bạn</p>
              </div>
              <button class="btn btn-primary" onclick="SettingsView.exportData()">
                📤 Xuất file
              </button>
            </div>

            <div style="display:flex;gap:0.75rem;align-items:center;padding:1rem;background:var(--bg-input);border-radius:8px;">
              <div style="flex:1;">
                <h4 style="font-size:0.95rem;margin-bottom:0.25rem;">Nhập dữ liệu (Import)</h4>
                <p style="font-size:0.8rem;color:var(--text-muted);">Khôi phục dữ liệu từ file JSON đã xuất trước đó</p>
              </div>
              <input type="file" id="import-file-input" accept=".json" style="display:none;" onchange="SettingsView.importData(this)">
              <button class="btn btn-secondary" onclick="document.getElementById('import-file-input').click()">
                📥 Nhập file
              </button>
            </div>

            <div id="import-status" style="font-size:0.85rem;text-align:center;margin-top:0.75rem;"></div>
          </div>
        </div>

        <!-- Save Notification -->
        <div id="save-confirm" class="hidden" style="position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--text-inverse);padding:0.75rem 1.5rem;border-radius:9999px;font-weight:600;z-index:200;box-shadow:0 4px 20px rgba(16,185,129,0.4);">
          ✅ Đã lưu cài đặt thành công!
        </div>
      </div>
    `;
  },

  bindEvents: function () {},

  setTheme: function (theme) {
    App.saveSettings({ theme: theme });
    document.querySelectorAll(".theme-btn").forEach(el => el.classList.remove("active"));
    const activeBtn = document.getElementById("theme-btn-" + theme);
    if (activeBtn) activeBtn.classList.add("active");
    SettingsView.showSaveConfirm();
  },

  setSoundEnabled: function (enabled) {
    if (window.SoundManager && typeof window.SoundManager.setEnabled === "function") {
      window.SoundManager.setEnabled(enabled);
    }
    SettingsView.showSaveConfirm();
  },

  previewSound: function () {
    if (!window.SoundManager || typeof window.SoundManager.play !== "function") return;
    window.SoundManager.play("success");
    setTimeout(function () {
      if (window.SoundManager && typeof window.SoundManager.play === "function") {
        window.SoundManager.play("notify");
      }
    }, 400);
  },

  setFontSize: function (size) {
    StorageManager.setFontSize(size);
    AppState.fontSize = size;
    SettingsView.showSaveConfirm();
    
    // Apply font size to document
    document.documentElement.style.setProperty('--base-font-size', size + 'px');
    
    // Update preview text
    const previewEl = document.querySelector('[style*="font-size:' + size + 'px"]');
    if (previewEl) {
      previewEl.style.fontSize = size + 'px';
    }
  },

  setFrameSize: function (size) {
    StorageManager.setFrameSize(size);
    AppState.frameSize = size;
    SettingsView.showSaveConfirm();
    
    // Apply frame size via CSS variable
    document.documentElement.style.setProperty('--frame-size', size + '%');
  },

  addApiKeyField: function () {
    const container = document.getElementById("api-keys-container");
    if (!container) return;
    
    const currentCount = container.querySelectorAll('.api-key-field').length;
    const newIndex = currentCount;
    
    const newFieldHtml = `
      <div style="background:var(--bg-input);border-radius:8px;padding:1rem;margin-bottom:0.75rem;border:1px solid var(--border-color);">
        <div style="display:flex;gap:0.75rem;margin-bottom:0.5rem;align-items:center;">
          <span style="min-width:30px;font-size:0.85rem;color:var(--text-muted);">Key ${newIndex + 1}:</span>
          <input type="password" class="input-field api-key-field" placeholder="Nhập API Key..." 
                 value="" style="flex:1;" data-index="${newIndex}">
          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.8rem;" 
                  onclick="SettingsView.setActiveKey(${newIndex})">
            Chọn
          </button>
          <button class="btn" style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#ef4444;font-size:0.8rem;padding:0.4rem 0.8rem;" 
                  onclick="SettingsView.removeApiKey(${newIndex})">
            Xóa
          </button>
        </div>
        <div style="display:flex;gap:0.75rem;align-items:center;margin-top:0.5rem;">
          <span style="min-width:30px;font-size:0.85rem;color:var(--text-muted);">Provider:</span>
          <select class="select-dropdown key-provider-select" style="flex:1;padding:0.4rem 0.6rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.85rem;" 
                  data-index="${newIndex}" onchange="SettingsView.setKeyProvider(${newIndex}, this.value)">
            ${SettingsView.providerOptions("gemini")}
          </select>
        </div>
        <div style="display:flex;gap:0.75rem;align-items:center;margin-top:0.5rem;">
          <span style="min-width:30px;font-size:0.85rem;color:var(--text-muted);">Model:</span>
          <select class="select-dropdown key-model-select" style="flex:1;padding:0.4rem 0.6rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.85rem;" 
                  data-index="${newIndex}" onchange="SettingsView.saveKeyModel(${newIndex}, this.value)">
            ${SettingsView.modelOptions("gemini", "")}
          </select>
        </div>
        <div id="key-provider-info-${newIndex}">
          ${SettingsView.keyProviderInfoHtml(newIndex)}
        </div>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', newFieldHtml);
  },

  saveKeyModel: function (index, model) {
    const keyModels = GeminiService.getKeyModels();
    keyModels[index] = model;
    SettingsView._lsSet("vstep_learning_gemini_key_models", JSON.stringify(keyModels));
    SettingsView.showSaveConfirm();
  },

  saveAllApiKeys: function () {
    const fields = document.querySelectorAll('.api-key-field');
    const keys = [];
    const modelSelects = document.querySelectorAll('.key-model-select');
    const models = [];
    const providerSelects = document.querySelectorAll('.key-provider-select');
    const providers = [];
    
    fields.forEach((field, index) => {
      const key = field.value.trim();
      if (key) {
        // Validate API key format theo provider của từng key
        const provider = GeminiService.getProvider(index);
        const isValidFormat = SettingsView.isValidKey(provider, key);
        if (!isValidFormat) {
          const info = GeminiService.getProviderInfo(index);
          alert(`API Key tại vị trí ${index + 1} có vẻ không đúng format cho ${info.name}.\n\n📝 ${info.keyHint}\n\nKey bạn nhập: ${key.substring(0, 30)}...`);
          return;
        }
        keys.push(key);
        const modelSelect = modelSelects[index];
        models.push(modelSelect ? modelSelect.value : GeminiService.getProviderInfo(index).defaultModel);
        const providerSelect = providerSelects[index];
        providers.push(providerSelect ? providerSelect.value : "gemini");
      }
    });
    
    if (keys.length === 0) {
      // Pollinations không cần key: cho phép lưu khi mọi ô key đều chọn Pollinations
      const allPollinations = fields.length === 0 ||
        Array.prototype.every.call(providerSelects, s => s.value === "pollinations");
      if (allPollinations) {
        SettingsView.showSaveConfirm();
        return;
      }
      alert("Vui lòng nhập ít nhất một API Key hợp lệ.\n\n💡 Pollinations KHÔNG cần key: ở mỗi ô key hãy chọn provider Pollinations, để trống phần nhập key rồi bấm Lưu.\nCác provider khác (Gemini, Groq, OpenRouter, GitHub, Cloudflare) bắt buộc nhập key thật của họ.");
      return;
    }
    
    SettingsView._lsSet("vstep_learning_gemini_keys", JSON.stringify(keys));
    SettingsView._lsSet("vstep_learning_gemini_key_models", JSON.stringify(models));
    SettingsView._lsSet("vstep_learning_gemini_key_providers", JSON.stringify(providers));
    
    // Set current key index to 0 if not set
    if (SettingsView._lsGet("vstep_learning_gemini_key_index") === null) {
      SettingsView._lsSet("vstep_learning_gemini_key_index", "0");
    }
    
    // Re-render immediately to show updated keys, then show the save toast
    const workspaceEl = document.getElementById("main-content");
    if (workspaceEl) workspaceEl.innerHTML = SettingsView.render();
    SettingsView.bindEvents();
    SettingsView.showSaveConfirm();
  },

  setKeyProvider: function (index, provider) {
    GeminiService.setProvider(provider, index);
    const info = GeminiService.PROVIDERS[provider];
    // Cập nhật danh sách model theo provider mới (giữ model cũ nếu vẫn có)
    const selects = document.querySelectorAll('.key-model-select');
    const sel = selects[index];
    if (sel) {
      const currentModel = sel.value;
      sel.innerHTML = SettingsView.modelOptions(provider, "");
      if (currentModel) {
        const stillHas = Array.prototype.some.call(sel.options, o => o.value === currentModel);
        if (stillHas) {
          sel.value = currentModel;
        } else if (info) {
          sel.value = info.defaultModel;
        }
      }
      SettingsView.saveKeyModel(index, sel.value);
    }
    // Cập nhật placeholder của ô nhập key theo provider mới
    const inputs = document.querySelectorAll('.api-key-field');
    const input = inputs[index];
    if (input && info) input.placeholder = info.keyPlaceholder;
    // Cập nhật dòng hướng dẫn lấy key theo provider mới
    const infoEl = document.getElementById("key-provider-info-" + index);
    if (infoEl) infoEl.innerHTML = SettingsView.keyProviderInfoHtml(index);
    SettingsView.showSaveConfirm();
  },

  keyProviderInfoHtml: function (index) {
    const provider = GeminiService.getProvider(index);
    const info = GeminiService.PROVIDERS[provider];
    if (!info) return "";
    return `<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.45rem;line-height:1.6;">🔑 Lấy key ${info.name} tại <a href="${info.signup}" target="_blank" style="color:var(--primary);">${info.signupLabel}</a> — ${info.keyHint}</div>`;
  },

  providerOptions: function (provider) {
    return Object.keys(GeminiService.PROVIDERS).map(id => {
      const p = GeminiService.PROVIDERS[id];
      return `<option value="${id}" ${provider === id ? 'selected' : ''}>${p.emoji} ${p.name}</option>`;
    }).join('');
  },

  modelOptions: function (provider, currentModel) {
    const info = GeminiService.PROVIDERS[provider];
    const models = info ? info.models : [];
    return models.map(m => {
      const isSelected = m.value === currentModel || (!currentModel && m.value === info.defaultModel);
      return `<option value="${m.value}" ${isSelected ? 'selected' : ''}>${m.label}</option>`;
    }).join('');
  },

  isValidKey: function (provider, key) {
    if (provider === "gemini") {
      return key.startsWith('AQ.') || key.startsWith('AIzaSy') || key.startsWith('AIza');
    }
    if (provider === "groq") return key.startsWith('gsk_');
    if (provider === "openrouter") return key.startsWith('sk-or-');
    if (provider === "github") return key.startsWith('github_pat_') || key.startsWith('ghp_') || key.startsWith('gho_');
    if (provider === "cloudflare") {
      const parts = key.split(':');
      return parts.length >= 2 && parts[0].length > 0 && parts.slice(1).join(':').length > 0;
    }
    return true;
  },

  setActiveKey: function (index) {
    SettingsView._lsSet("vstep_learning_gemini_key_index", index.toString());
    SettingsView.showSaveConfirm();
    
    // Re-render to show updated active key
    setTimeout(() => {
      const workspaceEl = document.getElementById("main-content");
      if (workspaceEl) workspaceEl.innerHTML = SettingsView.render();
      SettingsView.bindEvents();
    }, 1500);
  },

  removeApiKey: function (index) {
    if (confirm("Bạn có chắc muốn xóa API Key này?")) {
      const keysJson = SettingsView._lsGet("vstep_learning_gemini_keys");
      if (!keysJson) return;
      
      const keys = JSON.parse(keysJson);
      keys.splice(index, 1);
      
      // Also remove corresponding model + provider
      const modelsJson = SettingsView._lsGet("vstep_learning_gemini_key_models");
      if (modelsJson) {
        const models = JSON.parse(modelsJson);
        models.splice(index, 1);
        SettingsView._lsSet("vstep_learning_gemini_key_models", JSON.stringify(models));
      }
      const providersJson = SettingsView._lsGet("vstep_learning_gemini_key_providers");
      if (providersJson) {
        const providers = JSON.parse(providersJson);
        providers.splice(index, 1);
        SettingsView._lsSet("vstep_learning_gemini_key_providers", JSON.stringify(providers));
      }
      
      if (keys.length === 0) {
        SettingsView._lsRemove("vstep_learning_gemini_keys");
        SettingsView._lsRemove("vstep_learning_gemini_key_models");
        SettingsView._lsRemove("vstep_learning_gemini_key_providers");
        SettingsView._lsRemove("vstep_learning_gemini_key_index");
      } else {
        SettingsView._lsSet("vstep_learning_gemini_keys", JSON.stringify(keys));
        
        // Adjust current index if needed
        const currentIndex = parseInt(SettingsView._lsGet("vstep_learning_gemini_key_index") || "0");
        if (currentIndex >= keys.length) {
          SettingsView._lsSet("vstep_learning_gemini_key_index", (keys.length - 1).toString());
        }
      }
      
      // Re-render
      const workspaceEl = document.getElementById("main-content");
      if (workspaceEl) workspaceEl.innerHTML = SettingsView.render();
      SettingsView.bindEvents();
    }
  },

  clearApiKey: function () {
    if (confirm("Bạn có chắc muốn xóa tất cả API Key? AI sẽ chuyển về chế độ Offline Simulator.")) {
      SettingsView._lsRemove("vstep_learning_gemini_keys");
      SettingsView._lsRemove("vstep_learning_gemini_key_models");
      SettingsView._lsRemove("vstep_learning_gemini_key_providers");
      SettingsView._lsRemove("vstep_learning_gemini_key_index");
      SettingsView._lsRemove("vstep_learning_gemini_key"); // Remove old single key
      SettingsView._lsRemove("vstep_learning_gemini_model"); // Remove old single model
      const workspaceEl = document.getElementById("main-content");
      if (workspaceEl) workspaceEl.innerHTML = SettingsView.render();
      SettingsView.bindEvents();
    }
  },

  saveModel: function (model) {
    SettingsView._lsSet("vstep_learning_gemini_model", model);
    SettingsView.showSaveConfirm();
  },

  testApiConnection: async function () {
    const resultEl = document.getElementById("api-test-result");
    if (!resultEl) return;
    const providerInfo = GeminiService.getProviderInfo();
    resultEl.innerHTML = '<span style="color:var(--text-muted)">⏳ Đang kiểm tra kết nối...</span>';
    try {
      const response = await GeminiService.callGemini("Reply with only: OK");
      resultEl.innerHTML = `<span style="color:var(--accent)">✅ Kết nối API ${providerInfo.name} thành công!</span>`;
    } catch (e) {
      resultEl.innerHTML = `<span style="color:#ef4444">❌ Kết nối thất bại (${providerInfo.name}): ${e.message}</span>`;
    }
  },

  resetProgress: function () {
    if (confirm("⚠️ Thao tác này sẽ xóa toàn bộ tiến độ, streak và XP của bạn. Bạn có chắc không?")) {
      StorageManager.remove(StorageManager.KEYS.STREAK);
      StorageManager.remove(StorageManager.KEYS.XP);
      StorageManager.remove(StorageManager.KEYS.PROGRESS);
      StorageManager.remove(StorageManager.KEYS.LAST_DATE);
      AppState.streak = 0;
      AppState.xp = 0;
      AppState.progress = { en: 0 };
      Navbar.update();
      const workspaceEl = document.getElementById("main-content");
      if (workspaceEl) workspaceEl.innerHTML = SettingsView.render();
      SettingsView.bindEvents();
      SettingsView.showSaveConfirm();
    }
  },

  resetAllData: function () {
    if (confirm("⚠️ CẢNH BÁO: Thao tác này sẽ xóa TOÀN BỘ dữ liệu của bạn bao gồm:\n\n- Bài kiểm tra đã làm (Reading, Listening, Writing, Speaking)\n- Tiến độ học tập, XP, Streak\n- Từ vựng đã lưu\n- Lịch sử hoạt động\n- Roadmap và cài đặt cá nhân\n\nDữ liệu sẽ KHÔNG THỂ khôi phục. Bạn có chắc chắn muốn tiếp tục?")) {
      // Xóa tất cả dữ liệu vstep_ từ localStorage
      StorageManager.clear();

      // Xóa các keys không dùng prefix vstep_
      SettingsView._lsRemove("vstep_learning_gemini_key");
      SettingsView._lsRemove("vstep_learning_gemini_model");
      SettingsView._lsRemove("vstep_learning_ai_provider");
      SettingsView._lsRemove("vstep_roadmap");
      SettingsView._lsRemove("vstep_theme");

      // Xóa các keys daily tasks (vstep_daily_YYYY-MM-DD)
      try {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith("vstep_daily_")) {
            SettingsView._lsRemove(key);
          }
          if (key.startsWith("vstep_learn_state_")) {
            SettingsView._lsRemove(key);
          }
        });
      } catch (e) {
        console.error("SettingsView.resetAllData error:", e);
      }

      // Reset AppState về mặc định
      AppState.streak = 0;
      AppState.xp = 0;
      AppState.progress = { en: 0 };
      AppState.theme = "dark";
      AppState.voiceSpeed = 1.0;
      AppState.voicePitch = 1.0;

      // Reload trang để reset hoàn toàn
      location.reload();
    }
  },

  exportData: function () {
    const success = StorageManager.exportToFile();
    if (success) {
      SettingsView.showSaveConfirm();
    } else {
      alert("❌ Xuất dữ liệu thất bại. Vui lòng thử lại.");
    }
  },

  importData: function (input) {
    const file = input.files[0];
    if (!file) return;

    const statusEl = document.getElementById("import-status");
    if (statusEl) {
      statusEl.innerHTML = '<span style="color:var(--text-muted)">⏳ Đang nhập dữ liệu...</span>';
    }

    StorageManager.importFromFile(file)
      .then(() => {
        if (statusEl) {
          statusEl.innerHTML = '<span style="color:var(--accent)">✅ Nhập dữ liệu thành công! Đang tải lại trang...</span>';
        }
        // Reload page to apply imported data
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch((err) => {
        if (statusEl) {
          statusEl.innerHTML = `<span style="color:#ef4444">❌ Nhập dữ liệu thất bại: ${err.message}</span>`;
        }
      });

    // Reset input
    input.value = '';
  },

  showSaveConfirm: function () {
    const el = document.getElementById("save-confirm");
    if (el) {
      el.classList.remove("hidden");
      setTimeout(() => el.classList.add("hidden"), 2500);
    }
  }
};
