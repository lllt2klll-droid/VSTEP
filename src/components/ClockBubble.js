window.ClockBubble = {
  clockMode: "clock",
  countdownRunning: false,
  countdownTime: 1500,
  countdownTotal: 1500,
  currentSkill: null,
  _clockInterval: null,
  _countdownInterval: null,
  _clockAnimationId: null,
  _clockLastTime: null,
  _clockPaused: false,
  vstepSkills: [
    { id: 'listening', name: 'Listening', nameVi: 'Nghe', parts: 3, questions: 35, time: 40, weight: 25, color: '#3b82f6' },
    { id: 'reading', name: 'Reading', nameVi: 'Đọc', parts: 4, questions: 40, time: 60, weight: 25, color: '#10b981' },
    { id: 'writing', name: 'Writing', nameVi: 'Viết', parts: 2, questions: 2, time: 60, weight: 25, color: '#f59e0b' },
    { id: 'speaking', name: 'Speaking', nameVi: 'Nói', parts: 3, questions: 3, time: 12, weight: 25, color: '#ef4444' }
  ],

  render: function () {
    const toggleBtn = document.getElementById("clock-toggle-btn");
    const panelEl = document.getElementById("clock-popup");
    if (!toggleBtn || !panelEl) return;

    // Update button display based on mode
    this.updateButtonDisplay();

    toggleBtn.onclick = function (e) {
      if (App._wasDragged) return;
      ClockBubble.toggle();
    };

    panelEl.innerHTML = `
      <div class="panel-header">
        <div class="panel-header-left">
          <div class="panel-icon clock">
            <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </div>
          <h4>Đồng hồ</h4>
        </div>
        <button class="panel-close" onclick="ClockBubble.toggle()" aria-label="Đóng đồng hồ" title="Đóng">✕</button>
      </div>

      <div class="panel-body">
        <div class="mode-tabs" role="tablist" aria-label="Chế độ đồng hồ">
          <button id="clock-mode-clock" class="mode-tab active" role="tab" aria-selected="true" aria-controls="clock-mode-content" onclick="ClockBubble.setMode('clock')">Đồng hồ</button>
          <button id="clock-mode-countdown" class="mode-tab" role="tab" aria-selected="false" aria-controls="countdown-mode-content" onclick="ClockBubble.setMode('countdown')">Đếm ngược</button>
        </div>

        <div id="clock-mode-content" role="tabpanel" aria-labelledby="clock-mode-clock">
          <div class="analog-clock-container">
            <div class="clock-ring-wrapper">
              <svg class="clock-progress-ring" viewBox="0 0 100 100">
                <circle class="clock-ring-bg" cx="50" cy="50" r="45" fill="none" stroke="var(--bg-input)" stroke-width="3"/>
                <circle id="clock-ring-progress" class="clock-ring-progress" cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" transform="rotate(-90 50 50)" stroke-dasharray="283" stroke-dashoffset="0"/>
              </svg>
              <div id="analog-clock" class="analog-clock">
                ${this.generateClockNumbers()}
                <div class="clock-center"></div>
                <div id="hour-hand" class="clock-hand hour-hand"></div>
                <div id="minute-hand" class="clock-hand minute-hand"></div>
                <div id="second-hand" class="clock-hand second-hand"></div>
              </div>
            </div>
          </div>
          <div id="digital-clock" class="digital-display">00:00:00</div>
          <div class="time-inputs">
            <div><label>Giờ</label><input type="number" id="clock-hour" min="0" max="23" value="0"></div>
            <div><label>Phút</label><input type="number" id="clock-minute" min="0" max="59" value="0"></div>
            <div><label>Giây</label><input type="number" id="clock-second" min="0" max="59" value="0"></div>
          </div>
          <button class="panel-action-btn" onclick="ClockBubble.setCustomTime()">Đặt thời gian</button>
        </div>

        <div id="countdown-mode-content" role="tabpanel" aria-labelledby="clock-mode-countdown" style="display:none;">
          <div class="vstep-exam-structure">
            <div class="exam-structure-header">
              <h4 style="margin:0;font-size:0.95rem;color:var(--text-primary);">Cấu trúc đề thi VSTEP</h4>
              <div style="font-size:0.75rem;color:var(--text-muted);">Tổng: ~175 phút (100%)</div>
            </div>
            <div class="exam-table-container">
              <table class="exam-table">
                <thead>
                  <tr>
                    <th>Kỹ năng</th>
                    <th>Số phần</th>
                    <th>Số câu hỏi</th>
                    <th>Thời gian</th>
                    <th>Tỷ trọng</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.vstepSkills.map(skill => `
                    <tr class="exam-table-row" style="border-left:4px solid ${skill.color};" onclick="ClockBubble.setSkillTimer('${skill.id}')">
                      <td class="exam-skill-cell">
                        <div class="skill-name-main">${skill.name}</div>
                        <div class="skill-name-sub">${skill.nameVi}</div>
                      </td>
                      <td class="exam-data-cell">${skill.parts}</td>
                      <td class="exam-data-cell">${skill.questions}</td>
                      <td class="exam-data-cell time-cell">${skill.time} phút</td>
                      <td class="exam-data-cell weight-cell">${skill.weight}%</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="countdown-timer-section">
            <div id="current-skill-display" class="current-skill-display" style="display:none;">
              <span id="current-skill-name" style="font-weight:600;color:var(--text-primary);"></span>
              <span style="color:var(--text-muted);font-size:0.85rem;">đang thi</span>
            </div>
            <div class="countdown-ring-container">
              <svg class="countdown-ring" viewBox="0 0 100 100">
                <circle class="countdown-ring-bg" cx="50" cy="50" r="45" fill="none" stroke="var(--bg-input)" stroke-width="6"/>
                <circle id="countdown-ring-progress" class="countdown-ring-progress" cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" stroke-width="6" stroke-linecap="round" transform="rotate(-90 50 50)" stroke-dasharray="283" stroke-dashoffset="0"/>
              </svg>
              <div id="countdown-display" class="digital-display countdown-display">25:00</div>
            </div>
            <div class="skill-timer-buttons">
              ${this.vstepSkills.map(skill => `
                <button class="skill-timer-btn" style="background:${skill.color}15;border-color:${skill.color};" onclick="ClockBubble.setSkillTimer('${skill.id}')">
                  <span style="color:${skill.color};font-weight:600;">${skill.nameVi}</span>
                  <span style="color:var(--text-muted);font-size:0.75rem;">${skill.time}p</span>
                </button>
              `).join('')}
            </div>
            <div class="time-inputs">
              <div><label>Phút</label><input type="number" id="countdown-minutes" min="0" max="999" value="25"></div>
              <div><label>Giây</label><input type="number" id="countdown-seconds" min="0" max="59" value="0"></div>
            </div>
            <div class="countdown-actions">
              <button id="countdown-start" class="panel-action-btn" onclick="ClockBubble.toggleCountdown()">Bắt đầu</button>
              <button class="panel-action-btn secondary" onclick="ClockBubble.resetCountdown()">Reset</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggle: function () {
    const panel = document.getElementById("clock-popup");
    if (!panel) return;
    const toggleBtn = document.getElementById("clock-toggle-btn");
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
      // On mobile, use bottom sheet behavior (CSS handles positioning)
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        if (!this._clockInterval) this.startClock();
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
        if (!this._clockInterval) this.startClock();
      }
    }
  },

  generateClockNumbers: function () {
    var nums = "";
    for (var i = 1; i <= 12; i++) {
      var angle = (i * 30 - 90) * (Math.PI / 180);
      var radius = 45;
      var x = 60 + radius * Math.cos(angle);
      var y = 60 + radius * Math.sin(angle);
      nums += '<div style="position:absolute;font-size:10px;font-weight:600;color:var(--text-main);transform:translate(-50%,-50%);left:' + x + 'px;top:' + y + 'px;">' + i + '</div>';
    }
    return nums;
  },

  setMode: function (mode) {
    this.clockMode = mode;
    var clockTab = document.getElementById("clock-mode-clock");
    var countdownTab = document.getElementById("clock-mode-countdown");
    var clockPanel = document.getElementById("clock-mode-content");
    var countdownPanel = document.getElementById("countdown-mode-content");

    clockTab.classList.toggle("active", mode === "clock");
    countdownTab.classList.toggle("active", mode === "countdown");
    clockTab.setAttribute("aria-selected", mode === "clock");
    countdownTab.setAttribute("aria-selected", mode === "countdown");
    clockPanel.style.display = mode === "clock" ? "block" : "none";
    countdownPanel.style.display = mode === "countdown" ? "block" : "none";
    clockPanel.hidden = mode !== "clock";
    countdownPanel.hidden = mode !== "countdown";

    if (mode === "clock") { this.stopCountdown(); this.startClock(); }
    else { this.stopClock(); this.updateCountdownDisplay(); }
  },

  startClock: function () {
    this._clockPaused = false;
    this._clockLastTime = performance.now();
    this.updateClock();
    this._clockAnimationId = requestAnimationFrame(this._animateClock.bind(this));
  },

  stopClock: function () {
    if (this._clockInterval) { clearInterval(this._clockInterval); this._clockInterval = null; }
    if (this._clockAnimationId) { cancelAnimationFrame(this._clockAnimationId); this._clockAnimationId = null; }
    this._clockPaused = true;
  },

  pauseClock: function () {
    this._clockPaused = true;
  },

  resumeClock: function () {
    if (this._clockPaused) {
      this._clockPaused = false;
      this._clockLastTime = performance.now();
      this._clockAnimationId = requestAnimationFrame(this._animateClock.bind(this));
    }
  },

  _animateClock: function (currentTime) {
    if (this._clockPaused) return;
    
    var deltaTime = currentTime - this._clockLastTime;
    
    // Update clock every 1000ms (1 second) using delta time
    if (deltaTime >= 1000) {
      this.updateClock();
      this._clockLastTime = currentTime;
    }
    
    // Continue animation loop
    this._clockAnimationId = requestAnimationFrame(this._animateClock.bind(this));
  },

  updateClock: function () {
    var now = new Date();
    var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    var de = document.getElementById("digital-clock");
    if (de) de.textContent = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    ["clock-hour", "clock-minute", "clock-second"].forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el) el.value = i === 0 ? h : i === 1 ? m : s;
    });
    var hd = (h % 12) * 30 + m * 0.5, md = m * 6 + s * 0.1, sd = s * 6;
    ["hour-hand", "minute-hand", "second-hand"].forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el) el.style.transform = "translate(-50%, -100%) rotate(" + [hd, md, sd][i] + "deg)";
    });
    
    // Update clock progress ring (seconds)
    var ring = document.getElementById("clock-ring-progress");
    if (ring) {
      var progress = s / 60; // 0 to 1 based on seconds
      var circumference = 283; // 2 * PI * 45
      var offset = circumference * (1 - progress);
      ring.style.strokeDashoffset = offset;
    }
    
    // Update button display
    this.updateButtonDisplay();
  },

  setCustomTime: function () {
    var h = Math.max(0, Math.min(23, parseInt(document.getElementById("clock-hour").value) || 0));
    var m = Math.max(0, Math.min(59, parseInt(document.getElementById("clock-minute").value) || 0));
    var s = Math.max(0, Math.min(59, parseInt(document.getElementById("clock-second").value) || 0));
    var de = document.getElementById("digital-clock");
    if (de) de.textContent = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    ["hour-hand", "minute-hand", "second-hand"].forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el) el.style.transform = "translate(-50%, -100%) rotate(" + [(h % 12) * 30 + m * 0.5, m * 6 + s * 0.1, s * 6][i] + "deg)";
    });
    // Keep the progress ring in sync with the custom time
    var ring = document.getElementById("clock-ring-progress");
    if (ring) {
      var progress = s / 60;
      var circumference = 283;
      ring.style.strokeDashoffset = circumference * (1 - progress);
    }
  },

  setSkillTimer: function (skillId) {
    var skill = this.vstepSkills.find(function (s) { return s.id === skillId; });
    if (!skill) return;
    
    var mi = document.getElementById("countdown-minutes");
    var si = document.getElementById("countdown-seconds");
    if (mi) mi.value = skill.time;
    if (si) si.value = 0;
    
    this.countdownTime = skill.time * 60;
    this.countdownTotal = skill.time * 60;
    this.currentSkill = skill;
    
    var skillDisplay = document.getElementById("current-skill-display");
    var skillName = document.getElementById("current-skill-name");
    if (skillDisplay && skillName) {
      skillDisplay.style.display = "flex";
      skillName.textContent = skill.name + " (" + skill.nameVi + ")";
      skillName.style.color = skill.color;
    }
    
    this.updateCountdownDisplay();
  },

  toggleCountdown: function () {
    if (this.countdownRunning) this.stopCountdown();
    else this.startCountdown();
  },

  startCountdown: function () {
    var mi = document.getElementById("countdown-minutes");
    var si = document.getElementById("countdown-seconds");
    if (mi && si) this.countdownTime = (parseInt(mi.value) || 0) * 60 + (parseInt(si.value) || 0);
    if (this.countdownTime <= 0) return;
    // Create/resume AudioContext during a user gesture so the alarm
    // is not blocked by the browser autoplay policy
    if (!this._audioCtx) {
      try {
        this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { this._audioCtx = null; }
    }
    if (this._audioCtx && this._audioCtx.state === "suspended") {
      this._audioCtx.resume().catch(function () {});
    }
    this.countdownRunning = true;
    var btn = document.getElementById("countdown-start");
    if (btn) btn.textContent = "Tạm dừng";
    this._countdownInterval = setInterval(function () {
      ClockBubble.countdownTime--;
      ClockBubble.updateCountdownDisplay();
      if (ClockBubble.countdownTime <= 0) {
        ClockBubble.stopCountdown();
        ClockBubble.playAlarm();
      }
    }, 1000);
  },

  stopCountdown: function () {
    this.countdownRunning = false;
    if (this._countdownInterval) { clearInterval(this._countdownInterval); this._countdownInterval = null; }
    var btn = document.getElementById("countdown-start");
    if (btn) btn.textContent = "Bắt đầu";
  },

  resetCountdown: function () {
    this.stopCountdown();
    var mi = document.getElementById("countdown-minutes");
    var si = document.getElementById("countdown-seconds");
    this.countdownTime = (parseInt(mi?.value) || 0) * 60 + (parseInt(si?.value) || 0);
    
    // Keep current skill display but reset timer
    if (this.currentSkill) {
      this.countdownTime = this.currentSkill.time * 60;
      this.countdownTotal = this.currentSkill.time * 60;
    }
    
    this.updateCountdownDisplay();
  },

  updateCountdownDisplay: function () {
    var el = document.getElementById("countdown-display");
    if (!el) return;
    var t = Math.max(0, this.countdownTime);
    var h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    el.textContent = (h > 0 ? String(h).padStart(2, "0") + ":" : "") + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    el.style.color = t < 60 ? "#ef4444" : "";
    
    // Update circular progress ring
    var ring = document.getElementById("countdown-ring-progress");
    if (ring && this.countdownTotal > 0) {
      var progress = (this.countdownTotal - t) / this.countdownTotal; // Progress from 0 (start) to 1 (end)
      var circumference = 283; // 2 * PI * 45
      var offset = circumference * (1 - progress); // Start empty (offset=circumference), end full (offset=0)
      ring.style.strokeDashoffset = offset;
      
      // Change color based on skill or urgency
      if (this.currentSkill) {
        ring.style.stroke = this.currentSkill.color;
      } else if (t < 60) {
        ring.style.stroke = "#ef4444";
      } else {
        ring.style.stroke = "var(--primary)";
      }
    }
    
    // Update button display
    this.updateButtonDisplay();
  },

  playAlarm: function () {
    var self = this;
    try {
      var ctx = this._audioCtx || (this._audioCtx = new (window.AudioContext || window.webkitAudioContext)());
      if (ctx.state === "suspended") {
        ctx.resume().catch(function () {});
      }
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 800; osc.type = "sine"; gain.gain.value = 0.3;
      osc.start();
      setTimeout(function () {
        try { osc.stop(); } catch (e) {}
        try { ctx.close(); } catch (e) {}
        self._audioCtx = null;
      }, 500);
    } catch (e) {}
  },

  updateButtonDisplay: function () {
    const toggleBtn = document.getElementById("clock-toggle-btn");
    if (!toggleBtn) return;
    
    if (this.clockMode === "countdown" && this.countdownRunning) {
      // Show countdown time on button
      var t = Math.max(0, this.countdownTime);
      var h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
      var timeText = (h > 0 ? String(h).padStart(2, "0") + ":" : "") + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
      toggleBtn.innerHTML = `<span style="font-size:0.75rem;font-weight:700;color:white;">${timeText}</span>`;
      
      // Update button color based on skill or urgency
      if (this.currentSkill) {
        toggleBtn.style.background = `linear-gradient(135deg, ${this.currentSkill.color} 0%, ${this.currentSkill.color}cc 100%)`;
      } else if (t < 60) {
        toggleBtn.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
      } else {
        toggleBtn.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      }
    } else {
      // Show current time on button
      var now = new Date();
      var h = now.getHours(), m = now.getMinutes();
      var timeText = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
      toggleBtn.innerHTML = `<span style="font-size:0.75rem;font-weight:700;color:white;">${timeText}</span>`;
      toggleBtn.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  }
};