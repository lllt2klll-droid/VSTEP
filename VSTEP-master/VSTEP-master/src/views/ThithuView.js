/* ==========================================================================
   THITHU VIEW - PRACTICE TESTS VIEW
   Đề thi thử theo ngày với đầy đủ 4 kỹ năng
   ========================================================================== */

window.ThithuView = {
  currentTest: null,
  currentSkill: null,
  history: [],
  historySort: 'newest',
  currentCategory: 'school', // 'school', 'book', or 'writing'
  currentWritingTest: null, // For standalone writing tests
  state: {
    reading: { submitted: false, answers: {}, currentPassageIndex: 0, timeRemaining: 3600, timerInterval: null },
    listening: { submitted: false, answers: {}, currentPartIndex: 0, timeRemaining: 2400, timerInterval: null },
    writing: { task1: { userText: '', result: null, comment: '', timeRemaining: 1200, timerInterval: null }, task2: { userText: '', result: null, comment: '', timeRemaining: 2400, timerInterval: null }, translationExpanded: false },
    speaking: { part1: { recording: false, audioUrl: null, audioId: null, result: null, comment: '', timeRemaining: 60, timerInterval: null }, part2: { recording: false, audioUrl: null, audioId: null, result: null, comment: '', timeRemaining: 60, timerInterval: null }, part3: { recording: false, audioUrl: null, audioId: null, result: null, comment: '', timeRemaining: 60, timerInterval: null } }
  },

  createInitialState: function () {
    return {
      reading: { submitted: false, answers: {}, currentPassageIndex: 0, timeRemaining: 3600, timerInterval: null },
      listening: { submitted: false, answers: {}, currentPartIndex: 0, timeRemaining: 2400, timerInterval: null },
      writing: {
        task1: { userText: '', result: null, comment: '', timeRemaining: 1200, timerInterval: null },
        task2: { userText: '', result: null, comment: '', timeRemaining: 2400, timerInterval: null },
        translationExpanded: false
      },
      speaking: {
        part1: { recording: false, audioUrl: null, audioId: null, result: null, comment: '', timeRemaining: 60, timerInterval: null },
        part2: { recording: false, audioUrl: null, audioId: null, result: null, comment: '', timeRemaining: 60, timerInterval: null },
        part3: { recording: false, audioUrl: null, audioId: null, result: null, comment: '', timeRemaining: 60, timerInterval: null }
      }
    };
  },

  hasReadingQuestions: function (readingData) {
    if (!readingData) return false;
    var parts = readingData.passages || ['part1', 'part2', 'part3', 'part4']
      .map(function (key) { return readingData[key]; })
      .filter(Boolean);
    return parts.some(function (part) {
      return Array.isArray(part.questions) && part.questions.length > 0;
    });
  },

  hasListeningQuestions: function (listeningData) {
    if (!listeningData) return false;
    return ['part1', 'part2', 'part3'].some(function (key) {
      var part = listeningData[key];
      if (!part) return false;
      if (Array.isArray(part.questions) && part.questions.length > 0) return true;
      return ['conversations', 'talks'].some(function (groupKey) {
        return Array.isArray(part[groupKey]) && part[groupKey].some(function (group) {
          return Array.isArray(group.questions) && group.questions.length > 0;
        });
      });
    });
  },
  mediaRecorder: null,
  audioChunks: [],
  currentRecordingPart: null,

  // Escape string for safe use in HTML attributes and JavaScript
  escJs: function (str) {
    return (str || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
  },

  // Escape string for safe use in HTML content
  escHtml: function (str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  },

  render: function () {
    console.log('ThithuView.render called, currentView:', AppState.currentView);
    this.loadHistory();
    // Only restore persisted state when entering the view normally.
    // openTest()/backToList() explicitly control state transitions and set
    // _skipRestoreOnce so a stale persisted test cannot overwrite the new UI state.
    if (this._skipRestoreOnce) {
      this._skipRestoreOnce = false;
      console.log('Skipping persisted practice-test restore for explicit state transition');
    } else {
      this.restoreState();
    }
    this.initMouseGlowEffect();
    this.initTimer();
    if (!this.currentTest && !this.currentWritingTest) {
      return this.renderTestList();
    } else {
      var html = this.renderTestDetail();
      // Initialize audio player after render
      setTimeout(function() {
        ThithuView.initAudioPlayer();
      }, 100);
      return html;
    }
  },

  startTimers: function () {
    // Timer functionality disabled - user has their own clock
    return;
  },

  initTimer: function () {
    var self = this;
    // Clear existing timers
    if (this.state.reading.timerInterval) {
      clearInterval(this.state.reading.timerInterval);
      this.state.reading.timerInterval = null;
    }
    if (this.state.listening.timerInterval) {
      clearInterval(this.state.listening.timerInterval);
      this.state.listening.timerInterval = null;
    }
    if (this.state.writing.task1.timerInterval) {
      clearInterval(this.state.writing.task1.timerInterval);
      this.state.writing.task1.timerInterval = null;
    }
    if (this.state.writing.task2.timerInterval) {
      clearInterval(this.state.writing.task2.timerInterval);
      this.state.writing.task2.timerInterval = null;
    }
    if (this.state.speaking.part1.timerInterval) {
      clearInterval(this.state.speaking.part1.timerInterval);
      this.state.speaking.part1.timerInterval = null;
    }
    if (this.state.speaking.part2.timerInterval) {
      clearInterval(this.state.speaking.part2.timerInterval);
      this.state.speaking.part2.timerInterval = null;
    }
    if (this.state.speaking.part3.timerInterval) {
      clearInterval(this.state.speaking.part3.timerInterval);
      this.state.speaking.part3.timerInterval = null;
    }

    // Start timer based on current skill
    if (this.currentSkill === 'reading' && this.hasReadingQuestions(this.currentTest && this.currentTest.reading) && !this.state.reading.submitted) {
      if (!this.state.reading.timerInterval) {
        this.state.reading.timerInterval = setInterval(function () {
          if (self.state.reading.timeRemaining > 0) {
            self.state.reading.timeRemaining--;
            self.updateTimerDisplay();
          } else {
            clearInterval(self.state.reading.timerInterval);
            self.showToast('⏰ Hết thời gian Reading!');
          }
        }, 1000);
      }
    } else if (this.currentSkill === 'listening' && this.hasListeningQuestions(this.currentTest && this.currentTest.listening) && !this.state.listening.submitted) {
      if (!this.state.listening.timerInterval) {
        this.state.listening.timerInterval = setInterval(function () {
          if (self.state.listening.timeRemaining > 0) {
            self.state.listening.timeRemaining--;
            self.updateTimerDisplay();
          } else {
            clearInterval(self.state.listening.timerInterval);
            self.showToast('⏰ Hết thời gian Listening!');
          }
        }, 1000);
      }
    } else if (this.currentSkill === 'writing') {
      // Writing task 1 timer
      if (!this.state.writing.task1.timerInterval && !this.state.writing.task1.result) {
        this.state.writing.task1.timerInterval = setInterval(function () {
          if (self.state.writing.task1.timeRemaining > 0) {
            self.state.writing.task1.timeRemaining--;
            self.updateWritingTimerDisplay();
          } else {
            clearInterval(self.state.writing.task1.timerInterval);
            self.showToast('⏰ Hết thời gian Writing Task 1!');
          }
        }, 1000);
      }
      // Writing task 2 timer
      if (!this.state.writing.task2.timerInterval && !this.state.writing.task2.result) {
        this.state.writing.task2.timerInterval = setInterval(function () {
          if (self.state.writing.task2.timeRemaining > 0) {
            self.state.writing.task2.timeRemaining--;
            self.updateWritingTimerDisplay();
          } else {
            clearInterval(self.state.writing.task2.timerInterval);
            self.showToast('⏰ Hết thời gian Writing Task 2!');
          }
        }, 1000);
      }
    } else if (this.currentSkill === 'speaking') {
      // Speaking part timers
      ['part1', 'part2', 'part3'].forEach(function (partId) {
        if (!self.state.speaking[partId].timerInterval && !self.state.speaking[partId].result) {
          self.state.speaking[partId].timerInterval = setInterval(function () {
            if (self.state.speaking[partId].timeRemaining > 0) {
              self.state.speaking[partId].timeRemaining--;
              self.updateSpeakingTimerDisplay(partId);
            } else {
              clearInterval(self.state.speaking[partId].timerInterval);
              self.showToast('⏰ Hết thời gian Speaking ' + partId.toUpperCase() + '!');
              if (self.state.speaking[partId].recording) {
                self.stopRecording();
              }
            }
          }, 1000);
        }
      });
    }
  },

  updateTimerDisplay: function () {
    var timerElement = document.getElementById('test-timer');
    if (timerElement) {
      var timeRemaining = this.currentSkill === 'reading' ? this.state.reading.timeRemaining : this.state.listening.timeRemaining;
      var minutes = Math.floor(timeRemaining / 60);
      var seconds = timeRemaining % 60;
      timerElement.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      
      // Change color when time is low
      if (timeRemaining <= 300) { // 5 minutes
        timerElement.style.color = '#ef4444';
      } else if (timeRemaining <= 600) { // 10 minutes
        timerElement.style.color = '#f59e0b';
      }
    }
  },

  formatTime: function (seconds) {
    var minutes = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return minutes + ':' + (secs < 10 ? '0' : '') + secs;
  },

  updateWritingTimerDisplay: function () {
    var task1Timer = document.getElementById('writing-task1-timer');
    var task2Timer = document.getElementById('writing-task2-timer');
    
    if (task1Timer) {
      task1Timer.textContent = this.formatTime(this.state.writing.task1.timeRemaining);
      if (this.state.writing.task1.timeRemaining <= 300) {
        task1Timer.style.color = '#ef4444';
      } else if (this.state.writing.task1.timeRemaining <= 600) {
        task1Timer.style.color = '#f59e0b';
      }
    }
    
    if (task2Timer) {
      task2Timer.textContent = this.formatTime(this.state.writing.task2.timeRemaining);
      if (this.state.writing.task2.timeRemaining <= 300) {
        task2Timer.style.color = '#ef4444';
      } else if (this.state.writing.task2.timeRemaining <= 600) {
        task2Timer.style.color = '#f59e0b';
      }
    }
  },

  updateSpeakingTimerDisplay: function (partId) {
    var timerElement = document.getElementById('speaking-' + partId + '-timer');
    if (timerElement) {
      timerElement.textContent = this.state.speaking[partId].timeRemaining + 's';
      if (this.state.speaking[partId].timeRemaining <= 10) {
        timerElement.style.color = '#ef4444';
      } else if (this.state.speaking[partId].timeRemaining <= 20) {
        timerElement.style.color = '#f59e0b';
      }
    }
  },

  initMouseGlowEffect: function () {
    var self = this;
    setTimeout(function () {
      var cards = document.querySelectorAll('.skill-card, .practice-test-card');
      cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          var x = ((e.clientX - rect.left) / rect.width) * 100;
          var y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', x + '%');
          card.style.setProperty('--mouse-y', y + '%');
        });
        card.addEventListener('mouseleave', function () {
          card.style.removeProperty('--mouse-x');
          card.style.removeProperty('--mouse-y');
        });
      });
    }, 100);
  },

  restoreState: function () {
    try {
      var savedState = StorageManager.getPracticeTestCurrent();
      if (savedState) {
        console.log('Restoring practice test state:', savedState);
        // Restore current test and skill from the lightweight pointer.
        if (savedState.testId) {
          var tests = window.practiceTests || [];
          this.currentTest = tests.find(function (t) { return t.id === savedState.testId; });
          if (this.currentTest) {
            // Prefer the state stored for this exact test. This prevents answers
            // from test A leaking into test B. Fall back to the old global state
            // once for backward compatibility with existing users.
            var perTestState = StorageManager.getPracticeTestState(savedState.testId);
            var stateToRestore = perTestState || savedState;
            this.state = Object.assign(this.createInitialState(), stateToRestore);
          }
        }
        if (savedState.currentSkill) {
          this.currentSkill = savedState.currentSkill;
        }
        console.log('Practice test state restored successfully');
      }
    } catch (e) {
      console.error('Error restoring practice test state:', e);
    }
  },

  saveState: function () {
    try {
      var stateToSave = {
        testId: this.currentTest ? this.currentTest.id : null,
        currentSkill: this.currentSkill,
        reading: this.state.reading,
        listening: this.state.listening,
        writing: this.state.writing,
        speaking: this.state.speaking
      };
      StorageManager.setPracticeTestCurrent({
        testId: stateToSave.testId,
        currentSkill: stateToSave.currentSkill
      });
      if (stateToSave.testId) {
        StorageManager.setPracticeTestState(stateToSave.testId, {
          reading: stateToSave.reading,
          listening: stateToSave.listening,
          writing: stateToSave.writing,
          speaking: stateToSave.speaking
        });
      }
      console.log('Practice test state saved for test:', stateToSave.testId);
    } catch (e) {
      console.error('Error saving practice test state:', e);
    }
  },

  renderTestList: function () {
    var tests = window.practiceTests || [];
    var writingTests = window.vstepWritingTests31 || [];

    // Filter tests by category
    var filteredTests = tests.filter(function (test) {
      if (ThithuView.currentCategory === 'school') {
        return !test.category || test.category === 'school';
      } else if (ThithuView.currentCategory === 'book') {
        return test.category === 'book';
      } else if (ThithuView.currentCategory === 'writing') {
        return false; // Writing tests handled separately
      }
      return false;
    });

    // Sort tests: school by date (newest first), book by test number (ascending)
    var sortedTests = filteredTests.slice().sort(function (a, b) {
      if (ThithuView.currentCategory === 'book') {
        // Extract number from "Test X" or id like "test_X_complete"
        var numA = parseInt((a.date || '').replace(/\D/g, '')) || 0;
        var numB = parseInt((b.date || '').replace(/\D/g, '')) || 0;
        return numA - numB;
      }
      var dateA = new Date(a.date.split('/').reverse().join('-'));
      var dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB - dateA;
    });

    var self = this;
    var testsHtml = sortedTests.map(function (test, index) {
      // Get available skills
      var skills = [];
      if (test.reading) skills.push('Reading');
      if (test.listening) skills.push('Listening');
      if (test.writing) skills.push('Writing');
      if (test.speaking) skills.push('Speaking');

      // Create skill badges
      var skillBadges = skills.map(function (skill) {
        var colors = {
          'Reading': { bg: 'rgba(102, 94, 224, 0.15)', text: '#665EE0' },
          'Listening': { bg: 'rgba(138, 99, 210, 0.15)', text: '#8A63D2' },
          'Writing': { bg: 'rgba(245, 176, 65, 0.15)', text: '#F5B041' },
          'Speaking': { bg: 'rgba(46, 204, 113, 0.15)', text: '#2ECC71' }
        };
        var color = colors[skill] || { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' };
        return '<span class="badge" style="background:' + color.bg + ';color:' + color.text + ';font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">' + skill + '</span>';
      }).join('');

      return '\n        <button type="button" class="practice-test-card" data-test-id="' + self.escHtml(test.id) + '" data-thithu-action="open-test" aria-label="Mở đề ' + self.escHtml(test.title) + '">\n          <span class="lesson-card-number">' + (index + 1) + '</span>\n          <span class="practice-test-skills">' + skillBadges + '</span>\n          <span class="lesson-card-title">' + self.escHtml(test.title) + '</span>\n          <span class="lesson-card-desc">' + self.escHtml(test.date) + ' · ' + self.escHtml(test.location) + '</span>\n          <span class="practice-test-card-cta">📝 Bắt đầu làm bài</span>\n        </button>\n      ';
    }).join('');

    var categoryTabs = `
      <div class="category-tabs" role="tablist" aria-label="Chọn nhóm đề thi">
        <button type="button" class="category-tab ${this.currentCategory === 'school' ? 'active' : ''}" data-test-category="school" role="tab" aria-selected="${this.currentCategory === 'school'}">🏫 Đề thi các trường <span style="opacity:.75">(${tests.filter(function(t){ return !t.category || t.category === 'school'; }).length})</span></button>
        <button type="button" class="category-tab ${this.currentCategory === 'book' ? 'active' : ''}" data-test-category="book" role="tab" aria-selected="${this.currentCategory === 'book'}">📚 7 test theo sách <span style="opacity:.75">(${tests.filter(function(t){ return t.category === 'book'; }).length})</span></button>
        <button type="button" class="category-tab ${this.currentCategory === 'writing' ? 'active' : ''}" data-test-category="writing" role="tab" aria-selected="${this.currentCategory === 'writing'}">✍️ TEST WRITING <span style="opacity:.75">(${writingTests.length})</span></button>
      </div>
    `;

    var welcomeGuide = `
      <div class="glass-card" style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(99, 102, 241, 0.3);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <span style="font-size: 2rem;">👋</span>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; color: var(--primary);">Chào mừng bạn đến với phần Thi thử!</h3>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">Hướng dẫn nhanh cho người mới bắt đầu</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 1.2rem; margin-bottom: 0.25rem;">1️⃣</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">Chọn đề thi</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Bấm vào một đề thi để bắt đầu</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 1.2rem; margin-bottom: 0.25rem;">2️⃣</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">Chọn kỹ năng</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Reading, Listening, Writing, Speaking</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 1.2rem; margin-bottom: 0.25rem;">3️⃣</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">Làm bài & Nộp</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Làm xong bấm nộp để chấm điểm AI</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 1.2rem; margin-bottom: 0.25rem;">4️⃣</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">Xem lịch sử</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Bấm nút "📜 Lịch sử" để xem kết quả</div>
          </div>
        </div>
      </div>
    `;

    // Render writing tests list if writing category is selected
    var writingTestsHtml = '';
    if (this.currentCategory === 'writing') {
      writingTestsHtml = writingTests.map(function (test, index) {
        return '\n        <button type="button" class="practice-test-card" data-writing-test-id="' + self.escHtml(test.id) + '" data-thithu-action="open-writing-test" aria-label="Mở đề ' + self.escHtml(test.title) + '">\n          <span class="lesson-card-number">' + String(index + 1).padStart(2, '0') + '</span>\n          <span class="practice-test-skills"><span class="badge" style="background:rgba(245, 176, 65, 0.15);color:#F5B041;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">Writing</span></span>\n          <span class="lesson-card-title">' + self.escHtml(test.title) + '</span>\n          <span class="lesson-card-desc">' + self.escHtml(test.type.replace(/_/g, ' ').toUpperCase()) + ' · ' + test.wordCount + ' từ</span>\n          <span class="practice-test-card-cta">📝 Bắt đầu làm bài</span>\n        </button>\n      ';
      }).join('');
    }

    return `
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="font-size: 2rem; margin-bottom: 0.35rem;">Thi thử</h1>
            <p style="color: var(--text-muted);">${this.currentCategory === 'writing' ? 'Luyện thi với 31 đề Writing VSTEP' : this.currentCategory === 'book' ? 'Luyện thi với 7 test theo sách giáo khoa' : 'Luyện thi với các đề thi thực tế từ các trường đại học'}</p>
          </div>
          <button class="btn btn-secondary" onclick="ThithuView.toggleHistory()" style="display: flex; align-items: center; gap: 0.5rem;">
            📜 Lịch sử ${this.history.length > 0 ? '(' + this.history.length + ')' : ''}
          </button>
        </div>
      </div>
      ${categoryTabs}
      ${this.currentCategory === 'writing' ? '' : welcomeGuide}
      <div class="lesson-grid">
        ${this.currentCategory === 'writing' ? writingTestsHtml : testsHtml}
      </div>
    `;
  },

  renderHistorySection: function () {
    if (this.history.length === 0) {
      return '';
    }

    var historyHtml = this.history.slice(0, 5).map(function (entry) {
      var skillColors = {
        'writing': { bg: 'rgba(245, 176, 65, 0.15)', text: '#F5B041' },
        'speaking': { bg: 'rgba(46, 204, 113, 0.15)', text: '#2ECC71' },
        'reading': { bg: 'rgba(102, 94, 224, 0.15)', text: '#665EE0' },
        'listening': { bg: 'rgba(138, 99, 210, 0.15)', text: '#8A63D2' }
      };
      var color = skillColors[entry.skill] || skillColors.writing;
      
      var taskLabel = entry.skill === 'writing' ? (entry.task === 'task1' ? 'Task 1' : 'Task 2') : 
                     entry.skill === 'speaking' ? (entry.task.toUpperCase()) : entry.skill.charAt(0).toUpperCase() + entry.skill.slice(1);

      return `
        <div class="glass-card" style="padding: 1rem; margin-bottom: 0.5rem; border-left: 4px solid ${color.text};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="background: ${color.bg}; color: ${color.text}; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${taskLabel}</span>
              <span style="font-weight: 600; font-size: 0.9rem;">${entry.testTitle}</span>
            </div>
            <span style="color: var(--text-muted); font-size: 0.75rem;">${entry.date}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-weight: 700; color: var(--accent); font-size: 1.1rem;">${entry.score}</span>
              <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 0.25rem;">(${entry.level})</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="ThithuView.deleteHistoryEntry('${entry.id}')" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">🗑 Xóa</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="glass-card" style="margin-bottom: 2rem; padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="margin: 0; font-size: 1.1rem;">📜 Lịch sử làm bài</h3>
          <button class="btn btn-secondary btn-sm" onclick="ThithuView.clearHistory()" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">🗑 Xóa tất cả</button>
        </div>
        ${historyHtml}
        ${this.history.length > 5 ? '<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">Hiển thị 5 bài gần nhất</p>' : ''}
      </div>
    `;
  },

  renderWritingTestDetail: function () {
    var test = this.currentWritingTest;
    if (!test) return this.renderTestList();

    var writingData = {
      task2: {
        type: test.type,
        prompt: test.topic,
        wordCount: test.wordCount
      }
    };

    var contentHtml = this.renderWritingSkill(writingData);

    return `
      <div class="test-detail-header">
        <button type="button" class="btn btn-secondary btn-sm" data-thithu-action="back-list">← Quay lại danh sách</button>
        <div class="test-info">
          <h1>Đề Writing ${test.number}: ${test.title}</h1>
          <div class="test-meta">
            <span class="badge" style="background:rgba(245, 176, 65, 0.15);color:#F5B041;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;">${test.type.replace(/_/g, ' ').toUpperCase()}</span>
            <span style="margin-left: 0.5rem; color: var(--text-muted); font-size: 0.85rem;">${test.wordCount} từ</span>
            <button type="button" class="btn btn-secondary btn-sm" data-thithu-action="reset-writing-test" style="margin-left: auto;">
              🔄 Làm lại
            </button>
          </div>
        </div>
      </div>
      <div class="skill-content" id="skill-content">
        ${contentHtml}
      </div>
    `;
  },

  renderTestDetail: function () {
    // Handle standalone writing tests
    if (this.currentWritingTest) {
      return this.renderWritingTestDetail();
    }

    var test = this.currentTest;
    if (!test) return this.renderTestList();

    var skillsHtml = '';
    var availableSkills = [];
    
    if (test.reading) {
      availableSkills.push('reading');
    }
    
    if (test.listening) {
      availableSkills.push('listening');
    }
    
    if (test.writing) {
      availableSkills.push('writing');
    }
    
    if (test.speaking) {
      availableSkills.push('speaking');
    }

    // Compact horizontal tab design
    skillsHtml = `
      <div class="skill-tabs-compact">
        ${availableSkills.map(function(skill) {
          var isActive = skill === ThithuView.currentSkill;
          var isCompleted = false;
          if (skill === 'reading' && ThithuView.state.reading.submitted) isCompleted = true;
          if (skill === 'listening' && ThithuView.state.listening.submitted) isCompleted = true;
          if (skill === 'writing' && (ThithuView.state.writing.task1.result && ThithuView.state.writing.task1.result.submitted || ThithuView.state.writing.task2.result && ThithuView.state.writing.task2.result.submitted)) isCompleted = true;
          if (skill === 'speaking' && (ThithuView.state.speaking.part1.result || ThithuView.state.speaking.part2.result || ThithuView.state.speaking.part3.result)) isCompleted = true;
          
          var icons = { reading: '📖', listening: '🎧', writing: '✍️', speaking: '🎤' };
          var names = { reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' };
          
          return `
            <button type="button" class="skill-tab-compact ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-thithu-action="skill" data-skill="${skill}">
              <span class="skill-tab-icon">${icons[skill]}</span>
              <span class="skill-tab-name">${names[skill]}</span>
              ${isCompleted ? '<span class="skill-tab-check">✓</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;

    var contentHtml = '';
    if (this.currentSkill === 'reading' && test.reading) {
      contentHtml = this.renderReadingSkill(test.reading);
    } else if (this.currentSkill === 'listening' && test.listening) {
      contentHtml = this.renderListeningSkill(test.listening);
    } else if (this.currentSkill === 'writing' && test.writing) {
      contentHtml = this.renderWritingSkill(test.writing);
    } else if (this.currentSkill === 'speaking' && test.speaking) {
      contentHtml = this.renderSpeakingSkill(test.speaking);
    } else {
      if (availableSkills.length === 0) {
        contentHtml = `
          <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>Đề này chưa có nội dung</h3>
            <p>Nội dung sẽ được cập nhật sau</p>
          </div>
        `;
      } else {
        contentHtml = `
          <div class="empty-state">
            <div class="empty-icon">🎯</div>
            <h3>Chọn kỹ năng để bắt đầu</h3>
            <p>Chọn một trong các kỹ năng bên trên để làm bài</p>
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border: 1px solid rgba(99, 102, 241, 0.3);">
              <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
                💡 <strong>Mẹo:</strong> Bạn có thể làm từng kỹ năng riêng biệt, không cần làm hết cùng lúc
              </p>
            </div>
          </div>
        `;
      }
    }

    // Calculate progress
    var totalSkills = availableSkills.length;
    var completedSkills = 0;
    if (test.reading && this.state.reading.submitted) completedSkills++;
    if (test.listening && this.state.listening.submitted) completedSkills++;
    if (test.writing && ((this.state.writing.task1.result && this.state.writing.task1.result.submitted) || (this.state.writing.task2.result && this.state.writing.task2.result.submitted))) completedSkills++;
    if (test.speaking && (this.state.speaking.part1.result || this.state.speaking.part2.result || this.state.speaking.part3.result)) completedSkills++;
    var progressPct = totalSkills > 0 ? ((completedSkills / totalSkills) * 100).toFixed(0) : 0;

    return `
      <div class="test-detail-header">
        <button type="button" class="btn btn-secondary btn-sm" data-thithu-action="back-list">← Quay lại danh sách</button>
        <div class="test-info">
          <h1>${test.title}</h1>
          <div class="test-meta">
            <button type="button" class="btn btn-secondary btn-sm" data-thithu-action="reset-test" style="margin-left: auto;">
              🔄 Làm lại
            </button>
          </div>
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-label">
          <span>Tiến độ</span>
          <span>${progressPct}%</span>
        </div>
        <div class="progress-bar">
          <div style="height: 100%; background: var(--accent); border-radius: 9999px; width: ${progressPct}%; transition: width 0.3s ease;"></div>
        </div>
      </div>
      ${skillsHtml}
      <div class="skill-content" id="skill-content">
        ${contentHtml}
      </div>
    `;
  },

  renderReadingSkill: function (readingData) {
    var parts = [];
    if (readingData.passages) {
      parts = readingData.passages.map(function (p, index) {
        return {
          id: p.id || ('passage_' + index),
          title: p.title || ('Passage ' + (index + 1)),
          topic: p.topic || 'Reading',
          passage: p.content || p.passage,
          questions: p.questions
        };
      });
    } else if (readingData.part1 || readingData.part2 || readingData.part3 || readingData.part4) {
      // Handle part-based structure (part1, part2, part3, part4)
      var partKeys = ['part1', 'part2', 'part3', 'part4'];
      parts = partKeys.filter(function (key) {
        return readingData[key];
      }).map(function (key, index) {
        var part = readingData[key];
        return {
          id: key,
          title: part.topic || ('Part ' + (index + 1)),
          topic: part.topic || 'Reading',
          passage: part.passage,
          questions: part.questions
        };
      });
    }

    if (parts.length === 0) {
      return `
        <div class="skill-section">
          <div class="glass-card" style="text-align: center; padding: 3rem;">
            <p style="color: var(--text-muted);">Chưa có nội dung Reading cho đề này</p>
          </div>
        </div>
      `;
    }

    // Get current passage index from state, default to 0
    var currentPassageIndex = this.state.reading.currentPassageIndex || 0;
    if (currentPassageIndex < 0 || currentPassageIndex >= parts.length) {
      currentPassageIndex = 0;
      this.state.reading.currentPassageIndex = 0;
    }
    var firstPart = parts[currentPassageIndex];
    var isReadingSubmitted = this.state.reading.submitted;

    // Render passage navigation tabs
    var passageTabs = parts.map(function (p, index) {
      var isActive = index === currentPassageIndex;
      return `
        <button class="vstep-part-tab ${isActive ? 'active' : ''}" onclick="ThithuView.selectReadingPassage(${index})">
          <span class="tab-number">${index + 1}</span>
          <span class="tab-title">${p.title}</span>
        </button>
      `;
    }).join('');

    var passageHtml = firstPart.passage ? `
      <div class="vstep-passage-content">
        ${firstPart.passage.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
      </div>
    ` : '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Nội dung bài đọc sẽ được hiển thị ở đây</p>';

    var questionsHtml = firstPart.questions ? firstPart.questions.map(function (q, qi) {
      var correctIndex = q.answer ? q.answer.charCodeAt(0) - 65 : -1;
      var optionsHtml = q.options ? q.options.map(function (opt, oi) {
        var letter = String.fromCharCode(65 + oi);
        var answerKey = firstPart.id + '_' + qi;
        var cls = 'vstep-choice-item';
        if (isReadingSubmitted) {
          cls += oi === correctIndex ? ' selected correct-answer' : '';
          var userAns = ThithuView.state.reading.answers[firstPart.id + '_' + qi];
          if (userAns !== undefined && userAns !== correctIndex) {
            cls += ' wrong-answer';
          }
        } else {
          cls += ThithuView.state.reading.answers[firstPart.id + '_' + qi] === oi ? ' selected' : '';
        }
        return '<div class="' + cls + '" id="r' + answerKey + '_opt' + oi + '" onclick="' + (isReadingSubmitted ? '' : "ThithuView.selectReadingAnswer('" + firstPart.id + "', " + qi + ", " + oi + ", event)") + '"><span class="choice-letter">' + letter + '</span><span class="choice-text">' + opt + '</span></div>';
      }).join('') : '';
      var explanationHtml = '';
      if (isReadingSubmitted && ThithuView.state.reading.result && ThithuView.state.reading.result.details) {
        var detail = ThithuView.state.reading.result.details.find(function(d) { return d.questionId === q.id; });
        if (detail) {
          var badgeCls = detail.isCorrect ? 'badge badge-correct' : 'badge badge-incorrect';
          var badgeText = detail.isCorrect ? 'Đúng' : 'Sai';
          var correctAns = detail.isCorrect ? '' : 'Đáp án: <strong>' + detail.correctAnswer + '</strong><br>';
          explanationHtml = '<div class="explanation-box"><div style="margin-bottom:0.5rem;"><span class="' + badgeCls + '">' + badgeText + '</span></div>' + correctAns + (detail.explanation || '') + '</div>';
        }
      }
      return '<div class="vstep-question-card" data-question-index="' + firstPart.id + '_' + qi + '"><div class="question-header"><span class="question-number">' + q.id + '</span><span class="question-text">' + q.question + '</span></div><div class="vstep-choices">' + optionsHtml + '</div>' + explanationHtml + '</div>';
    }).join('') : '<p style="color: var(--text-muted); text-align: center;">Chưa có câu hỏi</p>';

    var hasQuestions = Array.isArray(firstPart.questions) && firstPart.questions.length > 0;
    var submitBtn = !hasQuestions ? `
      <div class="practice-test-unavailable" role="status">Phần này hiện chỉ có chủ đề ôn tập, chưa có câu hỏi để chấm điểm.</div>
    ` : !this.state.reading.submitted ? `
      <button class="btn btn-accent" style="width: 100%; margin-top: 1rem;" onclick="ThithuView.submitReading('${firstPart.id}')">Nộp bài ${firstPart.title}</button>
    ` : `
      <div style="margin-top:1rem;display:flex;gap:1rem;align-items:center;"><span style="font-size:1.1rem;font-weight:700;">Kết quả: ${this.state.reading.result ? this.state.reading.result.correctAnswers + '/' + this.state.reading.result.totalQuestions : 'N/A'}</span><button class="btn btn-secondary" onclick="ThithuView.resetReadingPassage()">Làm lại đoạn này</button></div>
    `;

    return `
      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">Luyện đọc</h2>
            <p style="font-size:0.85rem;color:var(--text-muted);">Đọc đoạn văn và trả lời câu hỏi. ${parts.length} đoạn.</p>
          </div>
        </div>
        <div class="vstep-part-tabs">
          ${passageTabs}
        </div>
      </div>

      <div class="glass-card vstep-split-layout">
        <div class="vstep-passage-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="font-size:0.95rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">📖 ${firstPart.title}</h3>
            <span class="badge badge-level" style="font-size:0.75rem;padding:0.3rem 0.7rem;">${firstPart.topic}</span>
          </div>
          ${passageHtml}
        </div>
        <div class="vstep-questions-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="font-size:1rem;color:var(--primary);">Câu hỏi</h3>
            <span style="font-size:0.85rem;color:var(--text-muted);">${firstPart.questions ? firstPart.questions.length : 0} câu</span>
          </div>
          ${questionsHtml}
          ${submitBtn}
          
        </div>
      </div>
    `;
  },

  selectReadingPassage: function (index) {
    this.state.reading.currentPassageIndex = index;
    this.saveState();
    this.refresh();
  },

  resetReadingPassage: function () {
    var self = this;
    var currentPassageIndex = this.state.reading.currentPassageIndex || 0;
    var readingData = this.currentTest.reading;
    var parts = [];
    if (readingData.passages) {
      parts = readingData.passages;
    } else if (readingData.part1 || readingData.part2 || readingData.part3 || readingData.part4) {
      var partKeys = ['part1', 'part2', 'part3', 'part4'];
      parts = partKeys.filter(function (key) { return readingData[key]; }).map(function (key) {
        return Object.assign({ id: key }, readingData[key]);
      });
    }
    var passage = parts[currentPassageIndex];
    if (!passage) return;
    var partId = passage.id || ('passage_' + currentPassageIndex);
    if (passage.questions) {
      passage.questions.forEach(function (q, qi) {
        delete self.state.reading.answers[partId + '_' + qi];
      });
    }
    this.state.reading.submitted = false;
    this.state.reading.result = null;
    this.saveState();
    this.refresh();
  },

  selectReadingAnswer: function (partId, questionIndex, optionIndex, event) {
    // Prevent default behavior and event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    var answerKey = partId + '_' + questionIndex;
    this.state.reading.answers[answerKey] = optionIndex;

    // Save state to localStorage
    this.saveState();

    // Minimal DOM update - just toggle class for visual feedback
    var choiceId = 'r' + answerKey + '_opt' + optionIndex;
    var choiceEl = document.getElementById(choiceId);
    if (choiceEl) {
      var questionEl = choiceEl.closest('.vstep-question-card');
      if (questionEl) {
        var allChoices = questionEl.querySelectorAll('.vstep-choice-item');
        allChoices.forEach(function(c) {
          c.classList.remove('selected');
        });
      }
      if (this.state.reading.answers[answerKey] === optionIndex) {
        choiceEl.classList.add('selected');
      }
    }

    return false;
  },

  submitReading: function (partId) {
    var self = this;
    
    // Convert answers to format expected by GradingService
    var userAnswers = {};
    var readingData = this.currentTest.reading;
    var readingParts = readingData.passages || ['part1', 'part2', 'part3', 'part4']
      .filter(function (key) { return readingData[key]; })
      .map(function (key) {
        return Object.assign({ id: key }, readingData[key]);
      });
    readingParts.forEach(function (passage, passageIndex) {
        if (passage.questions) {
          passage.questions.forEach(function (q, qi) {
            var partId = passage.id || ('passage_' + passageIndex);
            var userAnswer = self.state.reading.answers[partId + '_' + qi];
            if (userAnswer !== undefined) {
              userAnswers[q.id] = String.fromCharCode(65 + userAnswer);
            }
          });
        }
      });

    // Use GradingService to grade
    var result = GradingService.gradeReading(this.currentTest, userAnswers);
    
    this.state.reading.submitted = true;
    this.state.reading.result = {
      score: result.score,
      level: result.score >= 8 ? 'C1' : result.score >= 6 ? 'B2' : result.score >= 4 ? 'B1' : 'A2',
      correctAnswers: result.correct,
      totalQuestions: result.total,
      details: result.details
    };
    this.saveState();

    this.addHistoryEntry('reading', 'all', result.score, this.state.reading.result.level, this.state.reading.result);
    this.showToast('✅ Đã nộp bài Reading - Điểm: ' + result.score + '/9.0');
    this.refresh();
  },

  renderListeningSkill: function (listeningData) {
    var parts = [];
    if (listeningData.part1) parts.push({ id: 'part1', title: listeningData.part1.title || 'Part 1: Short Conversations', questions: listeningData.part1.questions, timeAllowed: listeningData.part1.timeAllowed });
    if (listeningData.part2) parts.push({ id: 'part2', title: listeningData.part2.title || 'Part 2: Conversations', conversations: listeningData.part2.conversations, timeAllowed: listeningData.part2.timeAllowed });
    if (listeningData.part3) parts.push({ id: 'part3', title: listeningData.part3.title || 'Part 3: Talks and Lectures', talks: listeningData.part3.talks, timeAllowed: listeningData.part3.timeAllowed });

    if (parts.length === 0) {
      return `
        <div class="skill-section">
          <div class="glass-card" style="text-align: center; padding: 3rem;">
            <p style="color: var(--text-muted);">Chưa có nội dung Listening cho đề này</p>
          </div>
        </div>
      `;
    }

    // Get current part index from state, default to 0
    var currentPartIndex = this.state.listening.currentPartIndex || 0;
    if (currentPartIndex < 0 || currentPartIndex >= parts.length) {
      currentPartIndex = 0;
      this.state.listening.currentPartIndex = 0;
    }
    var firstPart = parts[currentPartIndex];
    var isListeningSubmitted = this.state.listening.submitted;

    // Render part navigation tabs
    var partTabs = parts.map(function (p, index) {
      var isActive = index === currentPartIndex;
      return `
        <button class="vstep-part-tab ${isActive ? 'active' : ''}" onclick="ThithuView.selectListeningPart(${index})">
          <span class="tab-number">${index + 1}</span>
          <span class="tab-title">${p.title}</span>
        </button>
      `;
    }).join('');

    var audioHtml = this.currentTest.audio ? `
      <div class="listening-audio-player">
        <div class="audio-controls">
          <button class="audio-play-btn" id="thithu-play-btn" onclick="ThithuView.playListeningAudio()" title="Phát/Dừng">
            <svg id="thithu-play-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <polygon points="6,3 20,12 6,21"/>
            </svg>
          </button>
          <div class="audio-progress-wrap">
            <div class="audio-progress-bar" id="thithu-progress-bar" onclick="ThithuView.seekAudio(event)">
              <div class="audio-progress-fill" id="thithu-progress-fill"></div>
            </div>
            <div class="audio-time">
              <span id="thithu-current-time">0:00</span>
              <span style="opacity:0.5;"> / </span>
              <span id="thithu-duration">0:00</span>
            </div>
          </div>
          <span class="audio-speed-btn" id="thithu-speed-btn" onclick="ThithuView.cycleAudioSpeed()" title="Tốc độ">1x</span>
          <audio id="thithu-audio" preload="metadata" data-local-src="${this.currentTest.audio}" src=""></audio>
        </div>
      </div>
    ` : `
      <div class="vstep-audio-player">
        <div class="audio-icon">🎧</div>
        <div class="audio-info">
          <h3 class="audio-title">${firstPart.title}</h3>
          <p class="audio-instruction">Nghe kỹ đoạn audio và trả lời câu hỏi</p>
        </div>
        <button class="btn btn-primary btn-play-audio" onclick="ThithuView.playListeningAudio()" disabled>
          <span class="play-icon">▶</span>
          <span>Không có audio</span>
        </button>
      </div>
    `;

    console.log("[ThithuView] Audio path:", this.currentTest.audio);
    console.log("[ThithuView] Current test ID:", this.currentTest.id);
    console.log("[ThithuView] Has audio:", !!this.currentTest.audio);

    var questionsHtml = '';
    if (firstPart.questions) {
      // Part 1 has direct questions
      questionsHtml = firstPart.questions.map(function (q, qi) {
        var correctIndex = q.answer ? q.answer.charCodeAt(0) - 65 : -1;
        var optionsHtml = q.options ? q.options.map(function (opt, oi) {
          var letter = String.fromCharCode(65 + oi);
          var answerKey = firstPart.id + '_' + qi;
          var cls = 'vstep-choice-item';
          if (isListeningSubmitted) {
            cls += oi === correctIndex ? ' selected correct-answer' : '';
            var userAns = ThithuView.state.listening.answers[firstPart.id + '_' + qi];
            if (userAns !== undefined && userAns !== correctIndex) {
              cls += ' wrong-answer';
            }
          } else {
            cls += ThithuView.state.listening.answers[firstPart.id + '_' + qi] === oi ? ' selected' : '';
          }
          return '<div class="' + cls + '" id="l' + answerKey + '_opt' + oi + '" onclick="' + (isListeningSubmitted ? '' : "ThithuView.selectListeningAnswer('" + firstPart.id + "', " + qi + ", " + oi + ", event)") + '"><span class="choice-letter">' + letter + '</span><span class="choice-text">' + opt + '</span></div>';
        }).join('') : '';
        var explanationHtml = '';
        if (isListeningSubmitted && ThithuView.state.listening.result && ThithuView.state.listening.result.details) {
          var detail = ThithuView.state.listening.result.details.find(function(d) { return d.questionId === q.id; });
          if (detail) {
            var badgeCls = detail.isCorrect ? 'badge badge-correct' : 'badge badge-incorrect';
            var badgeText = detail.isCorrect ? 'Đúng' : 'Sai';
            var correctAns = detail.isCorrect ? '' : 'Đáp án: <strong>' + detail.correctAnswer + '</strong><br>';
            explanationHtml = '<div class="explanation-box"><div style="margin-bottom:0.5rem;"><span class="' + badgeCls + '">' + badgeText + '</span></div>' + correctAns + (detail.explanation || '') + '</div>';
          }
        }
        return '<div class="vstep-question-card" data-question-index="' + firstPart.id + '_' + qi + '"><div class="question-header"><span class="question-number">' + q.id + '</span><span class="question-text">' + q.question + '</span></div><div class="vstep-choices">' + optionsHtml + '</div>' + explanationHtml + '</div>';
      }).join('');
    } else if (firstPart.conversations) {
      // Part 2 has conversations with questions
      questionsHtml = firstPart.conversations.map(function (conv, ci) {
        var convQuestions = conv.questions ? conv.questions.map(function (q, qi) {
          var optionsHtml = q.options ? q.options.map(function (opt, oi) {
            var isSelected = ThithuView.state.listening.answers[firstPart.id + '_' + ci + '_' + qi] === oi;
            var letter = String.fromCharCode(65 + oi);
            var answerKey = firstPart.id + '_' + ci + '_' + qi;
            return `
              <div class="vstep-choice-item ${isSelected ? 'selected' : ''}" id="l${answerKey}_opt${oi}" onclick="ThithuView.selectListeningAnswer('${firstPart.id}', ${qi}, ${oi}, event, ${ci})">
                <span class="choice-letter">${letter}</span>
                <span class="choice-text">${opt}</span>
              </div>
            `;
          }).join('') : '';
          return `
            <div class="vstep-question-card" data-question-index="${firstPart.id}_${ci}_${qi}">
              <div class="question-header">
                <span class="question-number">${q.id}</span>
                <span class="question-text">${q.question}</span>
              </div>
              <div class="vstep-choices">${optionsHtml}</div>
            </div>
          `;
        }).join('') : '';
        return `
          <div class="vstep-conversation-group">
            <h4 class="conversation-title">${conv.title}</h4>
            ${convQuestions}
          </div>
        `;
      }).join('');
    } else if (firstPart.talks) {
      // Part 3 has talks with questions
      questionsHtml = firstPart.talks.map(function (talk, ti) {
        var talkQuestions = talk.questions ? talk.questions.map(function (q, qi) {
          var optionsHtml = q.options ? q.options.map(function (opt, oi) {
            var isSelected = ThithuView.state.listening.answers[firstPart.id + '_' + ti + '_' + qi] === oi;
            var letter = String.fromCharCode(65 + oi);
            var answerKey = firstPart.id + '_' + ti + '_' + qi;
            return `
              <div class="vstep-choice-item ${isSelected ? 'selected' : ''}" id="l${answerKey}_opt${oi}" onclick="ThithuView.selectListeningAnswer('${firstPart.id}', ${qi}, ${oi}, event, ${ti})">
                <span class="choice-letter">${letter}</span>
                <span class="choice-text">${opt}</span>
              </div>
            `;
          }).join('') : '';
          return `
            <div class="vstep-question-card" data-question-index="${firstPart.id}_${ti}_${qi}">
              <div class="question-header">
                <span class="question-number">${q.id}</span>
                <span class="question-text">${q.question}</span>
              </div>
              <div class="vstep-choices">${optionsHtml}</div>
            </div>
          `;
        }).join('') : '';
        return `
          <div class="vstep-talk-group">
            <h4 class="talk-title">${talk.title}</h4>
            ${talkQuestions}
          </div>
        `;
      }).join('');
    }

    var hasQuestions = this.countTotalQuestions(firstPart) > 0;
    var submitBtn = !hasQuestions ? `
      <div class="practice-test-unavailable" role="status">Phần này hiện chưa có câu hỏi để chấm điểm.</div>
    ` : !this.state.listening.submitted ? `
      <button class="btn btn-accent" style="width: 100%; margin-top: 1rem;" onclick="ThithuView.submitListening('${firstPart.id}')">Nộp bài ${firstPart.title}</button>
    ` : `
      <div style="margin-top:1rem;display:flex;gap:1rem;align-items:center;"><span style="font-size:1.1rem;font-weight:700;">Kết quả: ${this.state.listening.result ? this.state.listening.result.correctAnswers + '/' + this.state.listening.result.totalQuestions : 'N/A'}</span><button class="btn btn-secondary" onclick="ThithuView.resetListeningPart()">Làm lại phần này</button></div>
    `;

    return `
      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">Luyện nghe</h2>
            <p style="font-size:0.85rem;color:var(--text-muted);">Nghe và trả lời câu hỏi.</p>
          </div>
        </div>
        <div class="vstep-part-tabs">
          ${partTabs}
        </div>
      </div>

      ${audioHtml}

      <div class="glass-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1rem;color:var(--primary);">${firstPart.title}</h3>
          <span style="font-size:0.85rem;color:var(--text-muted);">${this.countTotalQuestions(firstPart)} câu</span>
        </div>
        ${questionsHtml}
        <div style="margin-top:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
          <div></div>
          ${submitBtn}
        </div>
        
      </div>
    `;
  },

  countTotalQuestions: function(part) {
    var count = 0;
    if (part.questions) {
      count = part.questions.length;
    } else if (part.conversations) {
      part.conversations.forEach(function(conv) {
        if (conv.questions) count += conv.questions.length;
      });
    } else if (part.talks) {
      part.talks.forEach(function(talk) {
        if (talk.questions) count += talk.questions.length;
      });
    }
    return count;
  },

  selectListeningPart: function (index) {
    // Save current audio position before switching
    var audioEl = document.getElementById("thithu-audio");
    var savedTime = 0;
    if (audioEl && !audioEl.paused) {
      savedTime = audioEl.currentTime;
      this.state.listening.savedAudioTime = savedTime;
      this.state.listening.wasPlaying = true;
    } else if (audioEl) {
      savedTime = audioEl.currentTime;
      this.state.listening.savedAudioTime = savedTime;
      this.state.listening.wasPlaying = false;
    }
    
    this.state.listening.currentPartIndex = index;
    this.saveState();
    this.refresh();
    
    // Restore audio position after re-render
    setTimeout(function() {
      var newAudioEl = document.getElementById("thithu-audio");
      if (newAudioEl && ThithuView.state.listening.savedAudioTime) {
        newAudioEl.currentTime = ThithuView.state.listening.savedAudioTime;
        if (ThithuView.state.listening.wasPlaying) {
          newAudioEl.play();
        }
      }
    }, 100);
  },

  resetListeningPart: function () {
    var self = this;
    var currentPartIndex = this.state.listening.currentPartIndex || 0;
    var listeningData = this.currentTest.listening;
    var parts = [];
    if (listeningData.part1) parts.push({ id: 'part1', questions: listeningData.part1.questions });
    if (listeningData.part2) parts.push({ id: 'part2', conversations: listeningData.part2.conversations });
    if (listeningData.part3) parts.push({ id: 'part3', talks: listeningData.part3.talks });
    var part = parts[currentPartIndex];
    if (!part) return;
    if (part.questions) {
      part.questions.forEach(function (q, qi) {
        delete self.state.listening.answers[part.id + '_' + qi];
      });
    } else if (part.conversations) {
      part.conversations.forEach(function (conv, ci) {
        if (conv.questions) {
          conv.questions.forEach(function (q, qi) {
            delete self.state.listening.answers[part.id + '_' + ci + '_' + qi];
          });
        }
      });
    } else if (part.talks) {
      part.talks.forEach(function (talk, ti) {
        if (talk.questions) {
          talk.questions.forEach(function (q, qi) {
            delete self.state.listening.answers[part.id + '_' + ti + '_' + qi];
          });
        }
      });
    }
    this.state.listening.submitted = false;
    this.state.listening.result = null;
    this.saveState();
    this.refresh();
  },

  selectListeningAnswer: function (partId, questionIndex, optionIndex, event, groupIndex) {
    // Prevent default behavior and event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Part 1 uses 3 parameters (partId, questionIndex, optionIndex, event)
    // Part 2/3 use 4 parameters (partId, groupIndex, questionIndex, optionIndex, event)
    var answerKey;
    if (groupIndex !== undefined) {
      // Part 2/3: partId, groupIndex, questionIndex, optionIndex, event
      answerKey = partId + '_' + groupIndex + '_' + questionIndex;
      this.state.listening.answers[answerKey] = optionIndex;
    } else {
      // Part 1: partId, questionIndex, optionIndex, event
      answerKey = partId + '_' + questionIndex;
      this.state.listening.answers[answerKey] = optionIndex;
    }

    // Save state to localStorage
    this.saveState();

    // Minimal DOM update - just toggle class for visual feedback
    var choiceId = 'l' + answerKey + '_opt' + optionIndex;
    var choiceEl = document.getElementById(choiceId);
    if (choiceEl) {
      var questionEl = choiceEl.closest('.vstep-question-card');
      if (questionEl) {
        var allChoices = questionEl.querySelectorAll('.vstep-choice-item');
        allChoices.forEach(function(c) {
          c.classList.remove('selected');
        });
      }
      if (this.state.listening.answers[answerKey] === optionIndex) {
        choiceEl.classList.add('selected');
      }
    }

    return false;
  },

  submitListening: function (partId) {
    var self = this;
    
    // Convert answers to format expected by GradingService
    var userAnswers = {};
    var listeningData = this.currentTest.listening;

    // Process Part 1 questions
    if (listeningData.part1 && listeningData.part1.questions) {
      listeningData.part1.questions.forEach(function (q, qi) {
        var userAnswer = self.state.listening.answers['part1_' + qi];
        if (userAnswer !== undefined) {
          userAnswers[q.id] = String.fromCharCode(65 + userAnswer);
        }
      });
    }

    // Process Part 2 conversations
    if (listeningData.part2 && listeningData.part2.conversations) {
      listeningData.part2.conversations.forEach(function (conv, ci) {
        if (conv.questions) {
          conv.questions.forEach(function (q, qi) {
            var userAnswer = self.state.listening.answers['part2_' + ci + '_' + qi];
            if (userAnswer !== undefined) {
              userAnswers[q.id] = String.fromCharCode(65 + userAnswer);
            }
          });
        }
      });
    }

    // Process Part 3 talks
    if (listeningData.part3 && listeningData.part3.talks) {
      listeningData.part3.talks.forEach(function (talk, ti) {
        if (talk.questions) {
          talk.questions.forEach(function (q, qi) {
            var userAnswer = self.state.listening.answers['part3_' + ti + '_' + qi];
            if (userAnswer !== undefined) {
              userAnswers[q.id] = String.fromCharCode(65 + userAnswer);
            }
          });
        }
      });
    }

    // Use GradingService to grade
    var result = GradingService.gradeListening(this.currentTest, userAnswers);
    
    this.state.listening.submitted = true;
    this.state.listening.result = {
      score: result.score,
      level: result.score >= 8 ? 'C1' : result.score >= 6 ? 'B2' : result.score >= 4 ? 'B1' : 'A2',
      correctAnswers: result.correct,
      totalQuestions: result.total,
      details: result.details
    };
    this.saveState();

    this.addHistoryEntry('listening', 'all', result.score, this.state.listening.result.level, this.state.listening.result);
    this.showToast('✅ Đã nộp bài Listening - Điểm: ' + result.score + '/9.0');
    this.refresh();
  },

  playListeningAudio: function () {
    var audioEl = document.getElementById("thithu-audio");
    var icon = document.getElementById("thithu-play-icon");
    if (!audioEl) return;
    
    // If src not yet set, load it first
    var localSrc = audioEl.getAttribute("data-local-src");
    if (localSrc && (!audioEl.src || audioEl.src === window.location.href || audioEl.src.endsWith("#"))) {
      // Try to resolve audio from Cloudinary service
      if (window.CloudinaryAudioService) {
        var cloudinaryUrl = CloudinaryAudioService.resolveCloudinaryUrl(localSrc);
        if (cloudinaryUrl) {
          audioEl.src = cloudinaryUrl;
          audioEl.load();
        } else {
          audioEl.src = localSrc;
          audioEl.load();
        }
      } else {
        audioEl.src = localSrc;
        audioEl.load();
      }
    }
    
    if (audioEl.paused) {
      audioEl.play().catch(function (err) {
        console.warn("[ThithuView] play() error:", err);
        ThithuView.showToast("⚠️ Không phát được audio", 3000);
      });
      if (icon) icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
    } else {
      audioEl.pause();
      if (icon) icon.innerHTML = '<polygon points="6,3 20,12 6,21"/>';
    }
  },

  seekAudio: function (e) {
    var bar = document.getElementById("thithu-progress-bar");
    var audioEl = document.getElementById("thithu-audio");
    if (!bar || !audioEl || !audioEl.duration) return;
    var rect = bar.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioEl.currentTime = pct * audioEl.duration;
  },

  cycleAudioSpeed: function () {
    var audioEl = document.getElementById("thithu-audio");
    var btn = document.getElementById("thithu-speed-btn");
    if (!audioEl || !btn) return;
    var speeds = [0.75, 1, 1.25, 1.5];
    var idx = speeds.indexOf(audioEl.playbackRate);
    audioEl.playbackRate = speeds[(idx + 1) % speeds.length];
    btn.textContent = audioEl.playbackRate + "x";
  },

  _formatTime: function (t) {
    if (!t || isNaN(t)) return "0:00";
    var m = Math.floor(t / 60);
    var s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  },

  initAudioPlayer: function () {
    var audioEl = document.getElementById("thithu-audio");
    if (!audioEl) return;
    var self = this;
    
    // Load correct src with Cloudinary service integration
    var localSrc = audioEl.getAttribute("data-local-src");
    if (localSrc && (!audioEl.src || audioEl.src === window.location.href || audioEl.src.endsWith("#"))) {
      // Try to resolve audio from Cloudinary service
      if (window.CloudinaryAudioService) {
        var cloudinaryUrl = CloudinaryAudioService.resolveCloudinaryUrl(localSrc);
        if (cloudinaryUrl) {
          audioEl.src = cloudinaryUrl;
          audioEl.load();
        } else {
          audioEl.src = localSrc;
          audioEl.load();
        }
      } else {
        audioEl.src = localSrc;
        audioEl.load();
      }
    }

    audioEl.onended = function () {
      var icon = document.getElementById("thithu-play-icon");
      if (icon) icon.innerHTML = '<polygon points="6,3 20,12 6,21"/>';
    };
    audioEl.ontimeupdate = function () {
      if (!audioEl.duration) return;
      var fill = document.getElementById("thithu-progress-fill");
      var cur = document.getElementById("thithu-current-time");
      var dur = document.getElementById("thithu-duration");
      var pct = (audioEl.currentTime / audioEl.duration) * 100;
      if (fill) fill.style.width = pct + "%";
      if (cur) cur.textContent = self._formatTime(audioEl.currentTime);
      if (dur) dur.textContent = self._formatTime(audioEl.duration);
    };
    audioEl.onloadedmetadata = function () {
      var dur = document.getElementById("thithu-duration");
      if (dur) dur.textContent = self._formatTime(audioEl.duration);
    };
    audioEl.onerror = function () {
      console.error("[ThithuView] Audio load error");
      var dur = document.getElementById("thithu-duration");
      if (dur) dur.textContent = "lỗi tải";
      self.showToast("⚠️ Không tải được audio", 3000);
    };
  },

  renderWritingSkill: function (writingData) {
    var self = this;
    var tipsHtml = `
      <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border: 1px solid rgba(99, 102, 241, 0.3);">
        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
          💡 <strong>Mẹo:</strong> Viết ít nhất ${writingData.task1 ? writingData.task1.wordCount : '150'} từ. AI sẽ chấm điểm và nhận xét chi tiết về từ vựng, ngữ pháp và cấu trúc bài viết.
        </p>
      </div>
    `;

    // Get translation for current writing test if available
    var translationHtml = '';
    if (this.currentWritingTest && this.currentWritingTest.translation) {
      var isExpanded = this.state.writing.translationExpanded || false;
      translationHtml = `
        <div style="margin-bottom: 1rem;">
          <button type="button" class="btn btn-secondary btn-sm" data-thithu-action="toggle-translation" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            🌐 Dịch đề ${isExpanded ? '▼' : '▶'}
          </button>
          <div id="translation-content" style="display: ${isExpanded ? 'block' : 'none'}; margin-top: 0.5rem; padding: 0.75rem; background: rgba(245, 176, 65, 0.1); border-radius: 8px; border: 1px solid rgba(245, 176, 65, 0.3); font-size: 0.9rem; line-height: 1.6;">
            ${this.currentWritingTest.translation}
          </div>
        </div>
      `;
    }

    var task1Html = writingData.task1 ? `
      <div id="writing-task1" class="vstep-writing-card">
        <div class="writing-card-header">
          <div class="task-info">
            <h3 class="task-title">Task 1: ${writingData.task1.type.replace(/_/g, ' ').toUpperCase()}</h3>
            <div class="task-meta">
              <span class="task-badge">📝 ${writingData.task1.wordCount} từ</span>
            </div>
          </div>
        </div>
        <div class="writing-prompt-box">
          ${writingData.task1.prompt.replace(/\n/g, '<br>')}
        </div>
        ${this.state.writing.task1.result && this.state.writing.task1.result.submitted ? `
          <div class="vstep-score-summary">
            <h3 style="font-size:1rem;color:var(--text-muted);">Kết quả Task 1</h3>
            <div class="score-badge-circle">${this.state.writing.task1.result.score}</div>
            <span class="badge badge-level">${this.state.writing.task1.result.level}</span>
          </div>
          ${this.state.writing.task1.result.details ? `
            <div class="evaluation-criteria">
              <h4 style="font-size:0.9rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Chi tiết tiêu chí</h4>
              <div class="criteria-item"><div class="criteria-header"><span>Vocabulary</span><span style="color:var(--primary)">${this.state.writing.task1.result.details.vocabulary} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task1.result.details.vocabulary) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
              <div class="criteria-item"><div class="criteria-header"><span>Grammar</span><span style="color:var(--primary)">${this.state.writing.task1.result.details.grammar} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task1.result.details.grammar) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
              <div class="criteria-item"><div class="criteria-header"><span>Task Fulfillment</span><span style="color:var(--primary)">${this.state.writing.task1.result.details.taskFulfillment} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task1.result.details.taskFulfillment) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
              <div class="criteria-item"><div class="criteria-header"><span>Organisation</span><span style="color:var(--primary)">${this.state.writing.task1.result.details.organisation} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task1.result.details.organisation) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
            </div>
            <div class="explanation-box" style="font-size:0.85rem;border-left-color:var(--accent);margin-top:1rem;">
              <strong>Nhận xét chi tiết:</strong>
              ${this.state.writing.task1.result.details.grammarErrors && this.state.writing.task1.result.details.grammarErrors.length > 0 ? `
                <div style="display:grid;gap:0.75rem;margin-top:0.75rem;">
                  <div class="feedback-card"><div class="feedback-card-header" style="color:#ef4444;"><strong>✗ Lỗi ngữ pháp</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">${this.state.writing.task1.result.details.grammarErrors.map(function (e) { var color = e.type === 'error' ? '#ef4444' : e.type === 'suggestion' ? '#10b981' : e.type === 'warning' ? '#f59e0b' : '#3b82f6'; return '<li style="margin-bottom:0.25rem;"><span style="color:' + color + ';">[' + e.type + ']</span> <strong>' + e.original + '</strong> → <strong>' + e.corrected + '</strong>: ' + e.explanation + '</li>'; }).join('')}</ul></div>
                </div>
              ` : ''}
              ${this.state.writing.task1.result.details.ideaEvaluation ? `
                <div style="display:grid;gap:0.75rem;margin-top:0.75rem;">
                  <div class="feedback-card"><div class="feedback-card-header" style="color:#8b5cf6;"><strong>💭 Đánh giá ý tưởng</strong></div><div style="padding:0.75rem;background:var(--bg-input);border-radius:6px;line-height:1.6;"><strong>Opening:</strong> ${this.state.writing.task1.result.details.ideaEvaluation.opening}<br><strong>Body:</strong> ${this.state.writing.task1.result.details.ideaEvaluation.body}<br><strong>Conclusion:</strong> ${this.state.writing.task1.result.details.ideaEvaluation.conclusion}</div></div>
                </div>
              ` : ''}
              ${this.state.writing.task1.result.details.ideaDevelopment && this.state.writing.task1.result.details.ideaDevelopment.length > 0 ? `
                <div style="display:grid;gap:0.75rem;margin-top:0.75rem;">
                  <div class="feedback-card"><div class="feedback-card-header" style="color:#3b82f6;"><strong>💡 Triển khai ý tưởng</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">${this.state.writing.task1.result.details.ideaDevelopment.map(function (d) { return '<li style="margin-bottom:0.25rem;">' + d + '</li>'; }).join('')}</ul></div>
                </div>
              ` : ''}
            </div>
          ` : ''}
          <button class="btn btn-secondary" style="margin-top:1rem;" onclick="ThithuView.submitWritingTask1()">🔄 Chấm lại</button>
          <div class="user-text-display">${this.state.writing.task1.userText}</div>
          <div class="comment-box">
            <h4 class="comment-title">🟣 Ghi chú của tôi</h4>
            <textarea 
              id="writing-task1-comment" 
              class="comment-textarea" 
              placeholder="Thêm ghi chú cá nhân về bài viết này..."
              onchange="ThithuView.saveWritingTask1Comment(this.value)"
            >${this.state.writing.task1.comment}</textarea>
          </div>
        ` : `
          <div class="writing-guide">
            <span class="guide-icon">💡</span>
            <span class="guide-text">Viết bài theo đề bài trên. Sau khi viết xong, bấm "Nộp bài" để AI chấm điểm chi tiết.</span>
          </div>
          <textarea 
            id="writing-task1-textarea" 
            class="writing-textarea" 
            placeholder="Viết bài của bạn ở đây..."
            onchange="ThithuView.saveWritingTask1(this.value)"
          >${this.state.writing.task1.userText}</textarea>
          <div class="writing-footer">
            <span id="task1-word-count" class="word-count">Số từ: 0</span>
            <button class="btn btn-primary btn-submit" onclick="ThithuView.submitWritingTask1()">📤 Nộp bài Task 1</button>
          </div>
        `}
      </div>
    ` : '';

    var task2Html = writingData.task2 ? `
      <div id="writing-task2" class="vstep-writing-card">
        <div class="writing-card-header">
          <div class="task-info">
            <h3 class="task-title">Task 2: ${writingData.task2.type.replace(/_/g, ' ').toUpperCase()}</h3>
            <div class="task-meta">
              <span class="task-badge">📝 ${writingData.task2.wordCount} từ</span>
            </div>
          </div>
        </div>
        ${translationHtml}
        <div class="writing-prompt-box">
          ${writingData.task2.prompt.replace(/\n/g, '<br>')}
        </div>
        ${this.state.writing.task2.result && this.state.writing.task2.result.submitted ? `
          <div class="vstep-score-summary">
            <h3 style="font-size:1rem;color:var(--text-muted);">Kết quả Task 2</h3>
            <div class="score-badge-circle">${this.state.writing.task2.result.score}</div>
            <span class="badge badge-level">${this.state.writing.task2.result.level}</span>
          </div>
          ${this.state.writing.task2.result.details ? `
            <div class="evaluation-criteria">
              <h4 style="font-size:0.9rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Chi tiết tiêu chí</h4>
              <div class="criteria-item"><div class="criteria-header"><span>Vocabulary</span><span style="color:var(--primary)">${this.state.writing.task2.result.details.vocabulary} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task2.result.details.vocabulary) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
              <div class="criteria-item"><div class="criteria-header"><span>Grammar</span><span style="color:var(--primary)">${this.state.writing.task2.result.details.grammar} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task2.result.details.grammar) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
              <div class="criteria-item"><div class="criteria-header"><span>Task Fulfillment</span><span style="color:var(--primary)">${this.state.writing.task2.result.details.taskFulfillment} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task2.result.details.taskFulfillment) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
              <div class="criteria-item"><div class="criteria-header"><span>Organisation</span><span style="color:var(--primary)">${this.state.writing.task2.result.details.organisation} / 9.0</span></div><div class="progress-bar-container" style="height:6px;"><div style="height:100%;background:var(--primary);border-radius:9999px;width:${((parseFloat(this.state.writing.task2.result.details.organisation) / 9) * 100).toFixed(0)}%;transition:width 0.5s ease;"></div></div></div>
            </div>
            <div class="explanation-box" style="font-size:0.85rem;border-left-color:var(--accent);margin-top:1rem;">
              <strong>Nhận xét chi tiết:</strong>
              ${this.state.writing.task2.result.details.grammarErrors && this.state.writing.task2.result.details.grammarErrors.length > 0 ? `
                <div style="display:grid;gap:0.75rem;margin-top:0.75rem;">
                  <div class="feedback-card"><div class="feedback-card-header" style="color:#ef4444;"><strong>✗ Lỗi ngữ pháp</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">${this.state.writing.task2.result.details.grammarErrors.map(function (e) { var color = e.type === 'error' ? '#ef4444' : e.type === 'suggestion' ? '#10b981' : e.type === 'warning' ? '#f59e0b' : '#3b82f6'; return '<li style="margin-bottom:0.25rem;"><span style="color:' + color + ';">[' + e.type + ']</span> <strong>' + e.original + '</strong> → <strong>' + e.corrected + '</strong>: ' + e.explanation + '</li>'; }).join('')}</ul></div>
                </div>
              ` : ''}
              ${this.state.writing.task2.result.details.ideaEvaluation ? `
                <div style="display:grid;gap:0.75rem;margin-top:0.75rem;">
                  <div class="feedback-card"><div class="feedback-card-header" style="color:#8b5cf6;"><strong>💭 Đánh giá ý tưởng</strong></div><div style="padding:0.75rem;background:var(--bg-input);border-radius:6px;line-height:1.6;"><strong>Opening:</strong> ${this.state.writing.task2.result.details.ideaEvaluation.opening}<br><strong>Body:</strong> ${this.state.writing.task2.result.details.ideaEvaluation.body}<br><strong>Conclusion:</strong> ${this.state.writing.task2.result.details.ideaEvaluation.conclusion}</div></div>
                </div>
              ` : ''}
              ${this.state.writing.task2.result.details.ideaDevelopment && this.state.writing.task2.result.details.ideaDevelopment.length > 0 ? `
                <div style="display:grid;gap:0.75rem;margin-top:0.75rem;">
                  <div class="feedback-card"><div class="feedback-card-header" style="color:#3b82f6;"><strong>💡 Triển khai ý tưởng</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">${this.state.writing.task2.result.details.ideaDevelopment.map(function (d) { return '<li style="margin-bottom:0.25rem;">' + d + '</li>'; }).join('')}</ul></div>
                </div>
              ` : ''}
            </div>
          ` : ''}
          <button class="btn btn-secondary" style="margin-top:1rem;" onclick="ThithuView.submitWritingTask2()">🔄 Chấm lại</button>
          <div class="user-text-display">${this.state.writing.task2.userText}</div>
          <div class="comment-box">
            <h4 class="comment-title">🟣 Ghi chú của tôi</h4>
            <textarea 
              id="writing-task2-comment" 
              class="comment-textarea" 
              placeholder="Thêm ghi chú cá nhân về bài viết này..."
              onchange="ThithuView.saveWritingTask2Comment(this.value)"
            >${this.state.writing.task2.comment}</textarea>
          </div>
        ` : `
          <div class="writing-guide">
            <span class="guide-icon">💡</span>
            <span class="guide-text">Viết bài luận theo đề bài trên. Task 2 yêu cầu viết dài hơn Task 1 và cần lập luận chặt chẽ hơn.</span>
          </div>
          <textarea 
            id="writing-task2-textarea" 
            class="writing-textarea" 
            placeholder="Viết bài của bạn ở đây..."
            onchange="ThithuView.saveWritingTask2(this.value)"
          >${this.state.writing.task2.userText}</textarea>
          <div class="writing-footer">
            <span id="task2-word-count" class="word-count">Số từ: 0</span>
            <button class="btn btn-primary btn-submit" onclick="ThithuView.submitWritingTask2()">📤 Nộp bài Task 2</button>
          </div>
        `}
      </div>
    ` : '';

    if (!task1Html && !task2Html) {
      return `
        <div class="skill-section">
          <div class="glass-card" style="text-align: center; padding: 3rem;">
            <p style="color: var(--text-muted);">Chưa có nội dung Writing cho đề này</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">Luyện viết</h2>
            <p style="font-size:0.85rem;color:var(--text-muted);">Viết bài luận theo đề bài. AI sẽ chấm điểm và nhận xét chi tiết.</p>
          </div>
        </div>
      </div>
      ${task1Html}
      ${task2Html}
    `;
  },

  renderRecordingUI: function (partId) {
    var partData = this.state.speaking[partId];
    var isRecording = partData.recording;
    var hasAudio = partData.audioId || partData.audioUrl;
    
    if (hasAudio && !isRecording) {
      // Load audio from IndexedDB if audioId exists, otherwise use audioUrl
      if (partData.audioId && !partData.audioUrl) {
        AudioStorage.getAudio(partData.audioId).then(function(audioData) {
          if (audioData && audioData.audioUrl) {
            partData.audioUrl = audioData.audioUrl;
            var audioEl = document.getElementById('speaking-' + partId + '-audio');
            if (audioEl) {
              audioEl.src = audioData.audioUrl;
            }
          }
        }).catch(function(error) {
          console.error('Error loading audio from IndexedDB:', error);
        });
      }
      
      return `
        <div style="background: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(16, 185, 129, 0.3);">
          <h4 style="margin: 0 0 0.5rem 0; color: #10b981;">✅ Đã ghi âm xong</h4>
          <audio id="speaking-${partId}-audio" controls src="${partData.audioUrl}" style="width: 100%; margin-bottom: 0.5rem;"></audio>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="ThithuView.toggleRecording('${partId}')">🔄 Ghi lại</button>
            ${partData.result ? `
              <div class="speaking-result-section" style="flex:1;min-width:250px;">
                <div class="speaking-score-banner">
                  <div class="speaking-score-circle"><span>${partData.result.score}</span></div>
                  <div class="speaking-score-info">
                    <h4 style="margin:0;font-size:0.95rem;">Kết quả Speaking</h4>
                    <span class="level-badge">${partData.result.level}</span>
                  </div>
                </div>
                ${partData.result.details ? `
                  <div class="speaking-criteria-panel">
                    <div class="speaking-criterion"><div class="speaking-criterion-header"><span class="crit-label">Vocabulary</span><span class="crit-score">${partData.result.details.vocabulary} / 9.0</span></div><div class="speaking-progress-track"><div class="speaking-progress-fill" style="width:${((parseFloat(partData.result.details.vocabulary) / 9) * 100).toFixed(0)}%;"></div></div></div>
                    <div class="speaking-criterion"><div class="speaking-criterion-header"><span class="crit-label">Grammar</span><span class="crit-score">${partData.result.details.grammar} / 9.0</span></div><div class="speaking-progress-track"><div class="speaking-progress-fill" style="width:${((parseFloat(partData.result.details.grammar) / 9) * 100).toFixed(0)}%;"></div></div></div>
                    <div class="speaking-criterion"><div class="speaking-criterion-header"><span class="crit-label">Pronunciation</span><span class="crit-score">${partData.result.details.pronunciation} / 9.0</span></div><div class="speaking-progress-track"><div class="speaking-progress-fill" style="width:${((parseFloat(partData.result.details.pronunciation) / 9) * 100).toFixed(0)}%;"></div></div></div>
                    <div class="speaking-criterion"><div class="speaking-criterion-header"><span class="crit-label">Fluency</span><span class="crit-score">${partData.result.details.fluency} / 9.0</span></div><div class="speaking-progress-track"><div class="speaking-progress-fill" style="width:${((parseFloat(partData.result.details.fluency) / 9) * 100).toFixed(0)}%;"></div></div></div>
                    <div class="speaking-criterion"><div class="speaking-criterion-header"><span class="crit-label">Discourse Management</span><span class="crit-score">${partData.result.details.discourseManagement} / 9.0</span></div><div class="speaking-progress-track"><div class="speaking-progress-fill" style="width:${((parseFloat(partData.result.details.discourseManagement) / 9) * 100).toFixed(0)}%;"></div></div></div>
                  </div>
                  <div class="speaking-feedback-box">
                    <div class="feedback-label">💬 Nhận xét chi tiết</div>
                    ${partData.result.details.feedback && partData.result.details.feedback.strengths ? `
                      <div style="display:grid;gap:0.75rem;margin-top:0.5rem;">
                        <div class="feedback-card"><div class="feedback-card-header" style="color:#10b981;"><strong>✓ Điểm mạnh</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">${partData.result.details.feedback.strengths.map(function (s) { return '<li style="margin-bottom:0.25rem;">' + s + '</li>'; }).join('')}</ul></div>
                        ${partData.result.details.feedback.suggestions ? `
                          <div class="feedback-card"><div class="feedback-card-header" style="color:#3b82f6;"><strong>💡 Gợi ý cải thiện</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">${partData.result.details.feedback.suggestions.map(function (s) { return '<li style="margin-bottom:0.25rem;">' + s + '</li>'; }).join('')}</ul></div>
                        ` : ''}
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
                <button class="speaking-grade-btn" onclick="ThithuView.gradeSpeaking('${partId}')" style="margin-top:0.75rem;width:100%;display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.6rem 1rem;background:var(--bg-input);border:1px solid var(--border-color);border-radius:8px;color:var(--text-primary);cursor:pointer;font-size:0.85rem;font-weight:600;">🔄 Chấm điểm lại</button>
              </div>
              <div style="background:var(--bg-input);padding:1rem;border-radius:8px;border:1px solid var(--border-color);margin-top:0.75rem;">
                <h4 style="margin:0 0 0.5rem 0;font-size:0.85rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">🟣 Ghi chú của tôi</h4>
                <textarea id="speaking-${partId}-comment" class="writing-textarea" placeholder="Thêm ghi chú cá nhân về bài nói này..." onchange="ThithuView.saveSpeakingComment('${partId}', this.value)" style="min-height:80px;font-size:0.85rem;">${this.state.speaking[partId].comment}</textarea>
              </div>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="ThithuView.gradeSpeaking('${partId}')">🤖 Chấm điểm AI</button>
            `}
          </div>
        </div>
      `;
    }
    
    if (isRecording) {
      return `
        <div style="background: rgba(239, 68, 68, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(239, 68, 68, 0.3); text-align: center;">
          <div class="speaking-visualizer" style="height: 30px; margin-bottom: 1rem; display: flex; justify-content: center; gap: 4px;">
            ${Array.from({ length: 8 }, function (_, i) {
              return '<div class="visualizer-bar recording" style="animation-delay:' + (i * 0.1) + 's;height:12px;background:var(--accent);"></div>';
            }).join("")}
          </div>
          <h4 style="margin: 0 0 0.5rem 0; color: #ef4444;">🎤 Đang ghi âm...</h4>
          <p style="margin: 0 0 1rem 0; font-size: 0.85rem; color: var(--text-muted);">Nói rõ ràng và tự nhiên</p>
          <button class="btn btn-danger" onclick="ThithuView.stopRecording()">⏹️ Dừng ghi âm</button>
        </div>
      `;
    }
    
    return `
      <div style="text-align: center; padding: 1.5rem; background: var(--bg-input); border-radius: 8px;">
        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border: 1px solid rgba(99, 102, 241, 0.3);">
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
            💡 <strong>Hướng dẫn:</strong> Bấm nút micro để bắt đầu ghi âm. Nói rõ ràng, không quá nhanh. Sau khi ghi xong, bấm "Chấm điểm AI" để nhận feedback.
          </p>
        </div>
        <button class="recorder-btn" onclick="ThithuView.toggleRecording('${partId}')" style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);">
          <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
            <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/>
            <path d="M11 11V6c0-.55.45-1 1-1s1 .45 1 1v5h-2z"/>
          </svg>
        </button>
        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Nhấn để bắt đầu ghi âm</p>
      </div>
    `;
  },

  gradeSpeaking: async function (partId) {
    var self = this;
    var audioUrl = this.state.speaking[partId].audioUrl;
    var transcript = this.state.speaking[partId].transcript || '';

    if (!audioUrl) {
      this.showToast('⚠️ Chưa có ghi âm để chấm');
      return;
    }

    this.showLoadingOverlay('🤖 AI đang phân tích ghi âm...');

    var partData = this.currentTest.speaking[partId];
    var partName = partId === 'part1' ? 'Part 1: Social Interaction' : partId === 'part2' ? 'Part 2: Solution Discussion' : 'Part 3: Topic Development';
    var topic = partData.topic || partData.situation || (partData.topics ? partData.topics.join(', ') : '');
    
    // Calculate actual recording duration from timer (60 - timeRemaining)
    var initialTime = 60;
    var duration = initialTime - this.state.speaking[partId].timeRemaining;
    if (duration <= 0) duration = 60; // Fallback to default if calculation fails

    try {
      var result = await GradingService.gradeSpeaking(partName, topic, transcript, duration);
      console.log('AI speaking grading result:', result);

      if (result.success) {
        this.state.speaking[partId].result = {
          score: result.data.score || '6.0',
          level: result.data.level || 'B1',
          details: result.data
        };
      } else {
        // Use fallback data from GradingService
        this.state.speaking[partId].result = {
          score: result.data.score || '6.0',
          level: result.data.level || 'B1',
          details: result.data
        };
      }

      this.addHistoryEntry('speaking', partId, this.state.speaking[partId].result.score, this.state.speaking[partId].result.level, this.state.speaking[partId].result.details);

      this.hideLoadingOverlay();
      this.showToast('✅ Đã chấm điểm xong');
      this.refresh();
    } catch (e) {
      this.hideLoadingOverlay();
      console.error('AI grading error:', e);
      this.showToast('⚠️ Lỗi chấm điểm: ' + e.message);
      
      // Fallback grading using improved offline evaluator
      var fallbackResult = window.AiResponses.evaluateSpeakingOffline(partId, duration);
      
      this.state.speaking[partId].result = {
        score: fallbackResult.score,
        level: fallbackResult.level,
        details: fallbackResult
      };
      
      this.addHistoryEntry('speaking', partId, this.state.speaking[partId].result.score, this.state.speaking[partId].result.level, this.state.speaking[partId].result.details);
      
      this.showToast('⚠️ Dùng chấm điểm dự phòng');
      this.refresh();
    }
  },

  renderSpeakingSkill: function (speakingData) {
    console.log('renderSpeakingSkill called, speakingData:', speakingData);
    var part1Html = speakingData.part1 ? `
      <div id="speaking-part1" class="vstep-speaking-card">
        <div class="speaking-card-header">
          <h3 class="speaking-title">Part 1: Interview</h3>
        </div>
        ${speakingData.part1.topics ? `
          <div class="speaking-topics-box">
            <h4 class="topics-title">Topics:</h4>
            ${(speakingData.part1.topics || []).map(function (t) {
              return '<span class="topic-badge">' + t + '</span>';
            }).join('')}
          </div>
        ` : ''}
        ${speakingData.part1.questions ? `
          <div class="speaking-questions-box">
            <h4 class="questions-title">Questions:</h4>
            ${(speakingData.part1.questions || []).map(function (q, i) {
              return '<div class="question-item"><span class="q-num">' + (i + 1) + '.</span> ' + q + '</div>';
            }).join('')}
          </div>
        ` : ''}
        ${this.renderRecordingUI('part1')}
      </div>
    ` : '';

    var part2Html = speakingData.part2 ? `
      <div id="speaking-part2" class="vstep-speaking-card">
        <div class="speaking-card-header">
          <h3 class="speaking-title">Part 2: Solution Discussion</h3>
        </div>
        <div class="speaking-situation-box">
          <h4 class="situation-title">Situation:</h4>
          <p class="situation-text">${speakingData.part2.situation}</p>
        </div>
        ${speakingData.part2.sampleAnswer ? `
          <div class="speaking-sample-box">
            <h4 class="sample-title">Sample Answer:</h4>
            <p class="sample-text">${speakingData.part2.sampleAnswer}</p>
          </div>
        ` : ''}
        ${this.renderRecordingUI('part2')}
      </div>
    ` : '';

    var part3Html = speakingData.part3 ? `
      <div id="speaking-part3" class="vstep-speaking-card">
        <div class="speaking-card-header">
          <h3 class="speaking-title">Part 3: Topic Development</h3>
        </div>
        <div class="speaking-topic-box">
          <h4 class="topic-heading">Topic:</h4>
          <p class="topic-text">${speakingData.part3.topic}</p>
        </div>
        ${speakingData.part3.sampleAnswer ? `
          <div class="speaking-sample-box">
            <h4 class="sample-title">Sample Answer:</h4>
            <p class="sample-text">${speakingData.part3.sampleAnswer}</p>
          </div>
        ` : ''}
        ${this.renderRecordingUI('part3')}
      </div>
    ` : '';

    if (!part1Html && !part2Html && !part3Html) {
      return `
        <div class="skill-section">
          <div class="glass-card" style="text-align: center; padding: 3rem;">
            <p style="color: var(--text-muted);">Chưa có nội dung Speaking cho đề này</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">Luyện nói</h2>
            <p style="font-size:0.85rem;color:var(--text-muted);">Nói rõ ràng, từ tốn. AI sẽ đánh giá phát âm, ngữ điệu và nội dung.</p>
          </div>
        </div>
      </div>
      ${part1Html}
      ${part2Html}
      ${part3Html}
    `;
  },

  openTest: function (testId) {
    console.log('ThithuView.openTest called with testId:', testId);
    console.log('AppState.currentView before openTest:', AppState.currentView);
    var tests = window.practiceTests || [];
    this.currentTest = tests.find(function (t) { return t.id === testId; });
    console.log('Found test:', this.currentTest);
    if (!this.currentTest) {
      console.error('ThithuView.openTest: test not found:', testId);
      this.showToast('⚠️ Không tìm thấy đề thi này.');
      this.currentTest = null;
      this.currentSkill = null;
      this.refresh();
      return;
    }
    // Load state belonging to this exact test. Never reuse the previous test's
    // in-memory answers when switching tests.
    var savedTestState = StorageManager.getPracticeTestState(testId);
    this.state = savedTestState ? Object.assign(this.createInitialState(), savedTestState) : this.createInitialState();

    // Auto-select first available skill. Do this before refresh(), and make
    // sure render() cannot restore a stale test from localStorage over it.
    if (this.hasReadingQuestions(this.currentTest.reading)) {
      this.currentSkill = 'reading';
    } else if (this.hasListeningQuestions(this.currentTest.listening)) {
      this.currentSkill = 'listening';
    } else if (this.currentTest.writing) {
      this.currentSkill = 'writing';
    } else if (this.currentTest.speaking) {
      this.currentSkill = 'speaking';
    } else if (this.currentTest.reading) {
      this.currentSkill = 'reading';
    } else if (this.currentTest.listening) {
      this.currentSkill = 'listening';
    } else {
      this.currentSkill = null;
    }
    this._skipRestoreOnce = true;
    console.log('Auto-selected skill:', this.currentSkill, 'for test:', this.currentTest.id);
    // Ensure we're in thithu view
    if (AppState.currentView !== 'thithu') {
      console.log('Current view is not thithu, navigating to thithu');
      App.navigate('thithu');
    } else {
      console.log('Already in thithu view, just refreshing');
      this.refresh();
    }
  },

  backToList: function () {
    this.currentTest = null;
    this.currentWritingTest = null;
    this.currentSkill = null;
    // Do not immediately restore the last persisted test when intentionally
    // returning to the test list.
    this._skipRestoreOnce = true;
    this.refresh();
  },

  selectSkill: function (skill) {
    this.currentSkill = skill;
    this.saveState();
    this.refresh();
  },

  resetTest: function () {
    if (confirm('Bạn có chắc muốn làm lại bài test này? Tất cả câu trả lời sẽ bị xóa.')) {
      var testId = this.currentTest ? this.currentTest.id : null;
      var skillAfterReset = this.currentSkill;
      // Clear test-specific persisted answers/progress as well as the in-memory state.
      if (testId && StorageManager.clearPracticeTestData) {
        StorageManager.clearPracticeTestData(testId);
      }
      // Clear all timers first
      if (this.state.reading.timerInterval) clearInterval(this.state.reading.timerInterval);
      if (this.state.listening.timerInterval) clearInterval(this.state.listening.timerInterval);
      if (this.state.writing.task1.timerInterval) clearInterval(this.state.writing.task1.timerInterval);
      if (this.state.writing.task2.timerInterval) clearInterval(this.state.writing.task2.timerInterval);
      if (this.state.speaking.part1.timerInterval) clearInterval(this.state.speaking.part1.timerInterval);
      if (this.state.speaking.part2.timerInterval) clearInterval(this.state.speaking.part2.timerInterval);
      if (this.state.speaking.part3.timerInterval) clearInterval(this.state.speaking.part3.timerInterval);

      this.state = this.createInitialState();
      // Keep the user inside the same test after reset instead of allowing a stale
      // saved test/skill to be restored on the next render.
      this.currentSkill = skillAfterReset;
      this._skipRestoreOnce = true;
      this.saveState();
      this.showToast('🔄 Đã reset bài test');

      setTimeout(function () {
        ThithuView.refresh();
        var newSkillContent = document.getElementById('skill-content');
        if (newSkillContent) {
          newSkillContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          newSkillContent.style.opacity = '1';
          newSkillContent.style.transform = 'translateY(0)';
        }
      }, 200);
    } else {
      this.refresh();
    }
  },

  setCategory: function (category) {
    this.currentCategory = category;
    this.currentTest = null;
    this.currentSkill = null;
    this._skipRestoreOnce = true;
    this.refresh();
  },

  refresh: function () {
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
      // refresh() is called for interactions inside an open test. Restoring
      // localStorage here would overwrite the state that was just changed.
      // State restoration is only needed when the user enters Thi thử anew.
      this._skipRestoreOnce = true;
      mainContent.innerHTML = this.render();
      this.bindEvents();
    }
  },

  bindEvents: function () {
    var mainContent = document.getElementById('main-content');

    // One delegated click handler for the whole Thi thử area. This is intentionally
    // attached to #main-content rather than individual buttons/cards so it survives
    // every refresh() and does not depend on inline onclick execution.
    if (mainContent && !this._delegatedClickBound) {
      this._delegatedClickBound = true;
      mainContent.addEventListener('click', function (event) {
        var target = event.target;
        if (!target || !mainContent.contains(target)) return;

        var category = target.closest('[data-test-category]');
        if (category && mainContent.contains(category)) {
          event.preventDefault();
          event.stopPropagation();
          ThithuView.setCategory(category.getAttribute('data-test-category'));
          return;
        }

        var actionEl = target.closest('[data-thithu-action]');
        if (actionEl && mainContent.contains(actionEl)) {
          var action = actionEl.getAttribute('data-thithu-action');
          if (action === 'open-test') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.openTest(actionEl.getAttribute('data-test-id'));
            return;
          }
          if (action === 'open-writing-test') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.openWritingTest(actionEl.getAttribute('data-writing-test-id'));
            return;
          }
          if (action === 'skill') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.selectSkill(actionEl.getAttribute('data-skill'));
            return;
          }
          if (action === 'back-list') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.backToList();
            return;
          }
          if (action === 'reset-test') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.resetTest();
            return;
          }
          if (action === 'reset-writing-test') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.resetWritingTest();
            return;
          }
          if (action === 'toggle-translation') {
            event.preventDefault();
            event.stopPropagation();
            ThithuView.toggleTranslation();
            return;
          }
        }
      }, true);
    }

    // Category handlers are kept as a fallback for older cached markup.
    mainContent && mainContent.querySelectorAll('[data-test-category]').forEach(function (button) {
      if (button.__thithuCategoryBound) return;
      button.__thithuCategoryBound = true;
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        ThithuView.setCategory(this.getAttribute('data-test-category'));
      });
    });

    // Keyboard activation for test cards.
    mainContent && mainContent.querySelectorAll('.practice-test-card[data-test-id]').forEach(function (card) {
      if (card.__thithuKeyBound) return;
      card.__thithuKeyBound = true;
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          ThithuView.openTest(this.getAttribute('data-test-id'));
        }
      });
    });

    // Word count for writing tasks
    var task1Textarea = document.getElementById('writing-task1-textarea');
    var task2Textarea = document.getElementById('writing-task2-textarea');
    if (task1Textarea) {
      this.updateWordCount(task1Textarea, 'task1-word-count');
      if (!task1Textarea.__thithuWordBound) {
        task1Textarea.__thithuWordBound = true;
        task1Textarea.addEventListener('input', function () {
          ThithuView.updateWordCount(this, 'task1-word-count');
        });
      }
    }
    if (task2Textarea) {
      this.updateWordCount(task2Textarea, 'task2-word-count');
      if (!task2Textarea.__thithuWordBound) {
        task2Textarea.__thithuWordBound = true;
        task2Textarea.addEventListener('input', function () {
          ThithuView.updateWordCount(this, 'task2-word-count');
        });
      }
    }

    if (!this._keyboardListenerAdded) {
      this._keyboardListenerAdded = true;
      document.addEventListener('keydown', this._handleKeydown.bind(this));
    }
  },

  _handleKeydown: function (e) {
    // Only handle shortcuts when not in input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    // Number keys 1-4 for answer selection (when in reading/listening)
    if (e.key >= '1' && e.key <= '4') {
      var index = parseInt(e.key) - 1;
      var choiceLabels = document.querySelectorAll('.choice-label');
      if (choiceLabels.length > 0) {
        // Get the first visible question's choices
        var questionItems = document.querySelectorAll('.question-item');
        if (questionItems.length > 0) {
          var firstQuestion = questionItems[0];
          var choices = firstQuestion.querySelectorAll('.choice-label');
          if (choices[index]) {
            choices[index].click();
          }
        }
      }
    }

    // Arrow keys with Ctrl for navigation between skills
    if (e.ctrlKey) {
      var skills = ['reading', 'listening', 'writing', 'speaking'];
      var currentSkillIndex = skills.indexOf(this.currentSkill);
      
      if (e.key === 'ArrowLeft' && currentSkillIndex > 0) {
        this.selectSkill(skills[currentSkillIndex - 1]);
        e.preventDefault();
      }
      if (e.key === 'ArrowRight' && currentSkillIndex < skills.length - 1) {
        this.selectSkill(skills[currentSkillIndex + 1]);
        e.preventDefault();
      }
    }

    // Escape to go back to test list
    if (e.key === 'Escape' && this.currentTest) {
      this.backToList();
    }
  },

  updateWordCount: function (textarea, countId) {
    var countEl = document.getElementById(countId);
    if (countEl && textarea) {
      var words = textarea.value.trim().split(/\s+/).filter(function (w) { return w.length > 0; });
      countEl.textContent = 'Số từ: ' + words.length;
    }
  },

  saveWritingTask1: function (text) {
    this.state.writing.task1.userText = text;
    this.saveState();
  },

  saveWritingTask1Comment: function (comment) {
    this.state.writing.task1.comment = comment;
    this.saveState();
    this.showToast('💾 Đã lưu ghi chú');
  },

  saveWritingTask2: function (text) {
    this.state.writing.task2.userText = text;
    this.saveState();
  },

  saveWritingTask2Comment: function (comment) {
    this.state.writing.task2.comment = comment;
    this.saveState();
    this.showToast('💾 Đã lưu ghi chú');
  },

  saveSpeakingComment: function (partId, comment) {
    this.state.speaking[partId].comment = comment;
    this.saveState();
    this.showToast('💾 Đã lưu ghi chú');
  },

  loadHistory: function () {
    this.history = StorageManager.getPracticeTestHistory() || [];
  },

  saveHistory: function () {
    StorageManager.setPracticeTestHistory(this.history);
  },

  addHistoryEntry: function (skill, task, score, level, details) {
    var test = this.currentTest || this.currentWritingTest;
    var entry = {
      id: Date.now().toString(),
      testId: test ? test.id : null,
      testTitle: test ? test.title : null,
      testDate: test ? (test.date || null) : null,
      skill: skill,
      task: task,
      score: score,
      level: level,
      details: details,
      date: new Date().toLocaleString('vi-VN'),
      timestamp: Date.now()
    };
    
    // Save additional data for restoration
    if (skill === 'writing') {
      entry.userText = this.state.writing[task].userText || '';
      entry.result = this.state.writing[task].result || null;
    } else if (skill === 'speaking') {
      entry.audioUrl = this.state.speaking[task].audioUrl || '';
      entry.transcript = this.state.speaking[task].transcript || '';
      entry.result = this.state.speaking[task].result || null;
    }
    
    this.history.unshift(entry);
    this.saveHistory();
  },

  deleteHistoryEntry: function (entryId) {
    this.history = this.history.filter(function (e) { return e.id !== entryId; });
    this.saveHistory();
    var popup = document.getElementById('practice-history-popup');
    if (popup) popup.remove();
    this.refresh();
  },

  clearHistory: function () {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử làm bài?')) {
      this.history = [];
      this.saveHistory();
      var popup = document.getElementById('practice-history-popup');
      if (popup) popup.remove();
      this.refresh();
    }
  },

  toggleHistory: function () {
    var existing = document.getElementById('practice-history-popup');
    if (existing) { 
      existing.remove(); 
      return; 
    }
    this.buildHistoryPopup();
  },

  buildHistoryPopup: function () {
    var history = this.history || [];
    var sortMode = this.historySort || 'newest';

    // Sort history
    var sortedHistory = history.slice().sort(function (a, b) {
      if (sortMode === 'newest') return b.timestamp - a.timestamp;
      if (sortMode === 'oldest') return a.timestamp - b.timestamp;
      if (sortMode === 'scoreDesc') return parseFloat(b.score) - parseFloat(a.score);
      if (sortMode === 'scoreAsc') return parseFloat(a.score) - parseFloat(b.score);
      return b.timestamp - a.timestamp;
    });

    var popup = document.createElement('div');
    popup.id = 'practice-history-popup';
    popup.style.cssText = 'position:fixed;z-index:10000;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'width:min(680px,96vw);max-height:80vh;background:var(--card-bg,#1a1625);' +
      'border:1px solid var(--border-color);border-radius:20px;' +
      'box-shadow:0 20px 60px rgba(0,0,0,0.7);display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(12px);';

    var itemsHtml = '';
    if (sortedHistory.length === 0) {
      itemsHtml = '<div style="text-align:center;padding:2.5rem 1rem;color:var(--text-muted);">' +
        '<div style="font-size:3rem;margin-bottom:0.75rem;">📄</div>' +
        '<p style="font-size:0.9rem;">Chưa có bài làm nào được lưu.</p>' +
        '<p style="font-size:0.8rem;margin-top:0.35rem;opacity:0.7;">Làm bài và chấm điểm để lưu vào lịch sử.</p>' +
        '</div>';
    } else {
      var skillColors = {
        'writing': { bg: 'rgba(245, 176, 65, 0.18)', text: '#F5B041' },
        'speaking': { bg: 'rgba(46, 204, 113, 0.18)', text: '#2ECC71' },
        'reading': { bg: 'rgba(102, 94, 224, 0.18)', text: '#665EE0' },
        'listening': { bg: 'rgba(138, 99, 210, 0.18)', text: '#8A63D2' }
      };

      sortedHistory.forEach(function (entry) {
        var color = skillColors[entry.skill] || skillColors.writing;
        var taskLabel = entry.skill === 'writing' ? (entry.task === 'task1' ? 'Task 1' : 'Task 2') : 
                       entry.skill === 'speaking' ? (entry.task.toUpperCase()) : entry.skill.charAt(0).toUpperCase() + entry.skill.slice(1);
        var scoreColor = parseFloat(entry.score) >= 7 ? '#10b981' : parseFloat(entry.score) >= 5 ? '#f59e0b' : '#ef4444';

        itemsHtml += '<div class="history-item" style="padding:0.9rem 1.25rem;border-bottom:1px solid var(--border-color);cursor:pointer;transition:background 0.15s;" ' +
          'onmouseover="this.style.background=\'rgba(255,255,255,0.05)\'" ' +
          'onmouseout="this.style.background=\'transparent\'" ' +
          'onclick="ThithuView.loadFromHistory(\'' + entry.id + '\')">' +
          '<div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">' +
          '<div style="flex:1;min-width:0;">' +
          '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem;">' +
          '<span style="font-size:0.72rem;font-weight:700;text-transform:uppercase;background:' + color.bg + ';color:' + color.text + ';padding:0.1rem 0.45rem;border-radius:4px;">' + taskLabel + '</span>' +
          '<span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);">' + entry.testTitle + '</span>' +
          '</div>' +
          '<div style="display:flex;gap:0.75rem;margin-top:0.3rem;">' +
          '<span style="font-size:0.72rem;color:var(--text-muted);">🕐 ' + entry.date + '</span>' +
          '</div>' +
          '</div>' +
          '<div style="text-align:center;min-width:52px;">' +
          '<div style="font-size:1.3rem;font-weight:800;color:' + scoreColor + ';">' + entry.score + '</div>' +
          '<div style="font-size:0.65rem;color:var(--text-muted);">' + entry.level + '</div>' +
          '</div>' +
          '<div style="display:flex;gap:0.25rem;">' +
          '<button onclick="event.stopPropagation();ThithuView.loadFromHistory(\'' + entry.id + '\')" ' +
          'style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1rem;padding:0.2rem 0.35rem;border-radius:4px;transition:color 0.15s;" ' +
          'onmouseover="this.style.color=\'#10b981\'" onmouseout="this.style.color=\'var(--text-muted)\'" ' +
          'title="Tải lại bài này">🔄</button>' +
          '<button onclick="event.stopPropagation();ThithuView.deleteHistoryEntry(\'' + entry.id + '\')" ' +
          'style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1.1rem;padding:0.2rem 0.35rem;border-radius:4px;transition:color 0.15s;" ' +
          'onmouseover="this.style.color=\'#ef4444\'" onmouseout="this.style.color=\'var(--text-muted)\'" ' +
          'title="Xoá bài này">🗑</button>' +
          '</div>' +
          '</div>' +
          '</div>';
      });
    }

    popup.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.4rem;border-bottom:1px solid var(--border-color);background:rgba(0,0,0,0.15);">' +
      '<div>' +
      '<h3 style="margin:0;font-size:1rem;font-weight:700;">📜 Lịch sử làm bài</h3>' +
      '<p style="margin:0.15rem 0 0 0;font-size:0.78rem;color:var(--text-muted);">' + sortedHistory.length + ' bài đã lưu</p>' +
      '</div>' +
      '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' +
      (sortedHistory.length > 0
        ? '<select id="history-sort" onchange="ThithuView.setHistorySort(this.value)" title="Sắp xếp lịch sử" style="background:rgba(255,255,255,0.06);border:1px solid var(--border-color);color:var(--text-primary);border-radius:8px;cursor:pointer;padding:0.3rem 0.5rem;font-size:0.8rem;">' +
          '<option value="newest"' + (sortMode === 'newest' ? ' selected' : '') + '>🕐 Mới nhất</option>' +
          '<option value="oldest"' + (sortMode === 'oldest' ? ' selected' : '') + '>🕐 Cũ nhất</option>' +
          '<option value="scoreDesc"' + (sortMode === 'scoreDesc' ? ' selected' : '') + '>⭐ Điểm cao → thấp</option>' +
          '<option value="scoreAsc"' + (sortMode === 'scoreAsc' ? ' selected' : '') + '>⭐ Điểm thấp → cao</option>' +
          '</select>'
        : '') +
      '<button onclick="document.getElementById(\'practice-history-popup\').remove()" style="background:none;border:1px solid var(--border-color);color:var(--text-muted);border-radius:8px;cursor:pointer;padding:0.3rem 0.7rem;font-size:0.85rem;">✕ Đóng</button>' +
      '</div>' +
      '</div>' +
      '<div style="overflow-y:auto;flex:1;">' + itemsHtml + '</div>';

    document.body.appendChild(popup);

    // Close on outside click
    setTimeout(function () {
      document.addEventListener('mousedown', function handler(e) {
        var p = document.getElementById('practice-history-popup');
        if (p && !p.contains(e.target)) {
          p.remove();
          document.removeEventListener('mousedown', handler);
        }
      });
    }, 100);
  },

  setHistorySort: function (mode) {
    if (['newest', 'oldest', 'scoreDesc', 'scoreAsc'].indexOf(mode) === -1) mode = 'newest';
    this.historySort = mode;
    var existing = document.getElementById('practice-history-popup');
    if (existing) existing.remove();
    this.buildHistoryPopup();
  },

  loadFromHistory: function (entryId) {
    var entry = this.history.find(function (e) { return e.id === entryId; });
    if (!entry) return;

    // Close popup
    var popup = document.getElementById('practice-history-popup');
    if (popup) popup.remove();

    // Find and load the test
    var tests = window.practiceTests || [];
    var test = tests.find(function (t) { return t.id === entry.testId; });
    if (!test) {
      this.showToast('❌ Không tìm thấy đề thi');
      return;
    }

    // Set current test and skill
    this.currentTest = test;
    this.currentSkill = entry.skill;
    var savedTestState = StorageManager.getPracticeTestState(entry.testId);
    this.state = savedTestState ? Object.assign(this.createInitialState(), savedTestState) : this.createInitialState();

    // Restore state based on skill
    if (entry.skill === 'writing') {
      var task = entry.task; // 'task1' or 'task2'
      this.state.writing[task].userText = entry.userText || '';
      this.state.writing[task].result = entry.result || null;
    } else if (entry.skill === 'speaking') {
      var partId = entry.task; // 'part1', 'part2', or 'part3'
      this.state.speaking[partId].audioUrl = entry.audioUrl || '';
      this.state.speaking[partId].transcript = entry.transcript || '';
      this.state.speaking[partId].result = entry.result || null;
    }

    // Refresh to show restored state with correct test and skill
    this.refresh();
    this.showToast('📄 Đã tải lại bài làm từ lịch sử');

    // Auto-scroll to the specific task/part after refresh
    setTimeout(function () {
      var targetId = '';
      if (entry.skill === 'writing') {
        targetId = 'writing-' + entry.task;
      } else if (entry.skill === 'speaking') {
        targetId = 'speaking-' + entry.task;
      }
      
      if (targetId) {
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  },

  submitWritingTask1: async function () {
    var text = this.state.writing.task1.userText;
    if (!text || text.trim().length === 0) {
      this.showToast('⚠️ Vui lòng viết bài trước khi nộp');
      return;
    }

    // Stop timer when submitting
    if (this.state.writing.task1.timerInterval) {
      clearInterval(this.state.writing.task1.timerInterval);
      this.state.writing.task1.timerInterval = null;
    }

    this.showLoadingOverlay('🤖 AI đang phân tích bài viết...');

    try {
      var taskSubtype = this.currentTest.writing.task1.type || 'email';
      var result = await GradingService.gradeWriting('task1', this.currentTest.writing.task1.prompt, text, taskSubtype);
      console.log('AI grading result:', result);

      if (result.success) {
        this.state.writing.task1.result = {
          submitted: true,
          score: result.data.score || '6.0',
          level: result.data.level || 'B1',
          details: result.data
        };
      } else {
        // Use fallback data from GradingService
        this.state.writing.task1.result = {
          submitted: true,
          score: result.data.score || '6.0',
          level: result.data.level || 'B1',
          details: result.data
        };
      }

      this.addHistoryEntry('writing', 'task1', this.state.writing.task1.result.score, this.state.writing.task1.result.level, this.state.writing.task1.result.details);

      this.hideLoadingOverlay();
      this.showToast('✅ Đã chấm điểm xong');
      this.refresh();
    } catch (e) {
      this.hideLoadingOverlay();
      console.error('AI grading error:', e);
      this.showToast('⚠️ Lỗi chấm điểm: ' + e.message);

      // Fallback grading
      var words = text.trim().split(/\s+/).filter(function (w) { return w.length > 0; });
      var wordCount = words.length;
      var targetCount = this.currentTest.writing.task1.wordCount || 120;
      var fallbackScore = Math.min(9.0, Math.round((wordCount / targetCount) * 9.0 * 10) / 10);

      this.state.writing.task1.result = {
        submitted: true,
        score: fallbackScore.toFixed(1),
        level: fallbackScore >= 7.0 ? 'B2' : fallbackScore >= 5.0 ? 'B1' : 'Dưới B1',
        details: {
          vocabulary: fallbackScore.toFixed(1),
          grammar: fallbackScore.toFixed(1),
          taskFulfillment: fallbackScore.toFixed(1),
          organisation: fallbackScore.toFixed(1),
          wordCount: wordCount
        }
      };

      this.addHistoryEntry('writing', 'task1', this.state.writing.task1.result.score, this.state.writing.task1.result.level, this.state.writing.task1.result.details);

      this.showToast('⚠️ Dùng chấm điểm dự phòng');
      this.refresh();
    }
  },

  submitWritingTask2: async function () {
    var text = this.state.writing.task2.userText;
    if (!text || text.trim().length === 0) {
      this.showToast('⚠️ Vui lòng viết bài trước khi nộp');
      return;
    }

    // Stop timer when submitting
    if (this.state.writing.task2.timerInterval) {
      clearInterval(this.state.writing.task2.timerInterval);
      this.state.writing.task2.timerInterval = null;
    }

    this.showLoadingOverlay('🤖 AI đang phân tích bài viết...');

    try {
      // Get prompt and type from either currentTest or currentWritingTest
      var prompt, taskSubtype;
      if (this.currentWritingTest) {
        prompt = this.currentWritingTest.topic;
        taskSubtype = this.currentWritingTest.type;
      } else if (this.currentTest && this.currentTest.writing && this.currentTest.writing.task2) {
        prompt = this.currentTest.writing.task2.prompt;
        taskSubtype = this.currentTest.writing.task2.type;
      } else {
        throw new Error('Không tìm thấy đề bài');
      }

      var result = await GradingService.gradeWriting('task2', prompt, text, taskSubtype);
      console.log('AI grading result:', result);

      if (result.success) {
        this.state.writing.task2.result = {
          submitted: true,
          score: result.data.score || '6.0',
          level: result.data.level || 'B1',
          details: result.data
        };
      } else {
        // Use fallback data from GradingService
        this.state.writing.task2.result = {
          submitted: true,
          score: result.data.score || '6.0',
          level: result.data.level || 'B1',
          details: result.data
        };
      }

      this.addHistoryEntry('writing', 'task2', this.state.writing.task2.result.score, this.state.writing.task2.result.level, this.state.writing.task2.result.details);

      this.hideLoadingOverlay();
      this.showToast('✅ Đã chấm điểm xong');
      this.refresh();
    } catch (e) {
      this.hideLoadingOverlay();
      console.error('AI grading error:', e);
      this.showToast('⚠️ Lỗi chấm điểm: ' + e.message);

      // Fallback grading
      var words = text.trim().split(/\s+/).filter(function (w) { return w.length > 0; });
      var wordCount = words.length;
      var targetCount = this.currentWritingTest ? this.currentWritingTest.wordCount : (this.currentTest && this.currentTest.writing && this.currentTest.writing.task2 ? this.currentTest.writing.task2.wordCount : 250);
      var fallbackScore = Math.min(9.0, Math.round((wordCount / targetCount) * 9.0 * 10) / 10);

      this.state.writing.task2.result = {
        submitted: true,
        score: fallbackScore.toFixed(1),
        level: fallbackScore >= 7.0 ? 'B2' : fallbackScore >= 5.0 ? 'B1' : 'Dưới B1',
        details: {
          vocabulary: fallbackScore.toFixed(1),
          grammar: fallbackScore.toFixed(1),
          taskFulfillment: fallbackScore.toFixed(1),
          organisation: fallbackScore.toFixed(1),
          wordCount: wordCount
        }
      };

      this.addHistoryEntry('writing', 'task2', this.state.writing.task2.result.score, this.state.writing.task2.result.level, this.state.writing.task2.result.details);

      this.showToast('⚠️ Dùng chấm điểm dự phòng');
      this.refresh();
    }
  },

  startReading: function (partId) {
    // Redirect to VstepView reading section with practice test data
    if (window.VstepView) {
      VstepView.currentSection = 'reading';
      App.navigate('vstep');
    }
  },

  startListening: function (partId) {
    // Redirect to VstepView listening section with practice test data
    if (window.VstepView) {
      VstepView.currentSection = 'listening';
      App.navigate('vstep');
    }
  },

  startSpeakingPart1: function () {
    this.startRecording('part1');
  },

  startSpeakingPart2: function () {
    this.startRecording('part2');
  },

  startSpeakingPart3: function () {
    this.startRecording('part3');
  },

  startRecording: function (partId) {
    var self = this;
    this.currentRecordingPart = partId;
    this.state.speaking[partId].recording = true;
    this.state.speaking[partId].transcript = '';
    this.refresh();
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      self.speechRecognition = new SpeechRecognition();
      self.speechRecognition.lang = 'en-US';
      self.speechRecognition.continuous = true;
      self.speechRecognition.interimResults = true;
      
      self.speechRecognition.onresult = function (event) {
        var interimTranscript = '';
        var finalTranscript = '';
        
        for (var i = event.resultIndex; i < event.results.length; i++) {
          var transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Accumulate final transcripts
        if (!self.state.speaking[partId].accumulatedTranscript) {
          self.state.speaking[partId].accumulatedTranscript = '';
        }
        if (finalTranscript) {
          self.state.speaking[partId].accumulatedTranscript += finalTranscript;
        }
        
        // Display accumulated final + current interim
        self.state.speaking[partId].transcript = self.state.speaking[partId].accumulatedTranscript + interimTranscript;
      };
      
      self.speechRecognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        // Auto-restart on non-fatal errors
        if (event.error !== 'not-allowed' && event.error !== 'no-speech') {
          try {
            self.speechRecognition.start();
          } catch (e) {
            console.error('Error restarting speech recognition:', e);
          }
        }
      };
      
      self.speechRecognition.onend = function () {
        // Auto-restart if still recording
        if (self.state.speaking[partId].recording) {
          try {
            self.speechRecognition.start();
          } catch (e) {
            console.error('Error restarting speech recognition on end:', e);
          }
        }
      };
      
      self.speechRecognition.start();
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        // Use supported MIME type instead of hardcoding
        var supportedMimeTypes = [
          'audio/webm;codecs=opus',
          'audio/webm',
          'audio/ogg;codecs=opus',
          'audio/ogg',
          'audio/mp4',
          'audio/wav'
        ];
        var selectedMimeType = null;
        for (var i = 0; i < supportedMimeTypes.length; i++) {
          if (MediaRecorder.isTypeSupported(supportedMimeTypes[i])) {
            selectedMimeType = supportedMimeTypes[i];
            break;
          }
        }
        
        var options = selectedMimeType ? { mimeType: selectedMimeType } : {};
        self.mediaRecorder = new MediaRecorder(stream, options);
        self.audioChunks = [];
        
        self.mediaRecorder.ondataavailable = function (e) {
          self.audioChunks.push(e.data);
        };
        
        self.mediaRecorder.onstop = function () {
          var audioBlob = new Blob(self.audioChunks, { type: self.mediaRecorder.mimeType || 'audio/webm' });
          var audioId = 'speaking_' + partId + '_' + Date.now();
          
          // Save audio to IndexedDB instead of using Blob URL
          AudioStorage.saveAudio(audioId, audioBlob).then(function(id) {
            self.state.speaking[partId].audioId = id;
            self.state.speaking[partId].audioUrl = null; // Will load from IndexedDB on render
            self.state.speaking[partId].recording = false;
            self.currentRecordingPart = null;
            self.saveState();
            self.refresh();
          }).catch(function(error) {
            console.error('Error saving audio to IndexedDB:', error);
            // Fallback to Blob URL if IndexedDB fails
            var audioUrl = URL.createObjectURL(audioBlob);
            self.state.speaking[partId].audioUrl = audioUrl;
            self.state.speaking[partId].recording = false;
            self.currentRecordingPart = null;
            self.saveState();
            self.refresh();
          });
          
          // Stop speech recognition
          if (self.speechRecognition) {
            self.speechRecognition.stop();
            self.speechRecognition = null;
          }
          
          self.showToast('✅ Đã lưu ghi âm');
          self.refresh();
        };
        
        self.mediaRecorder.start();
        self.showToast('🎤 Đang ghi âm...');
        
        // Auto stop after 60 seconds
        setTimeout(function () {
          if (self.mediaRecorder && self.mediaRecorder.state === 'recording') {
            self.mediaRecorder.stop();
            self.mediaRecorder.stream.getTracks().forEach(track => track.stop());
          }
          if (self.speechRecognition) {
            self.speechRecognition.stop();
            self.speechRecognition = null;
          }
        }, 60000);
      })
      .catch(function (err) {
        console.error('Error accessing microphone:', err);
        self.state.speaking[partId].recording = false;
        self.currentRecordingPart = null;
        if (self.speechRecognition) {
          self.speechRecognition.stop();
          self.speechRecognition = null;
        }
        self.showToast('❌ Không thể truy cập micro');
        self.refresh();
      });
  },

  stopRecording: function () {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  },

  toggleRecording: function (partId) {
    if (this.state.speaking[partId].recording) {
      this.stopRecording();
    } else {
      // Delete old audio from IndexedDB before recording new one
      if (this.state.speaking[partId].audioId) {
        AudioStorage.deleteAudio(this.state.speaking[partId].audioId).then(function() {
          console.log('Old audio deleted from IndexedDB');
        }).catch(function(error) {
          console.error('Error deleting old audio:', error);
        });
        this.state.speaking[partId].audioId = null;
        this.state.speaking[partId].audioUrl = null;
      }
      this.startRecording(partId);
    }
  },

  showLoadingOverlay: function (message) {
    var existing = document.getElementById('ai-loading-overlay');
    if (existing) existing.remove();
    
    var overlay = document.createElement('div');
    overlay.id = 'ai-loading-overlay';
    overlay.style.cssText = 'position:fixed;z-index:10002;inset:0;background:rgba(0,0,0,0.7);' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(4px);' +
      'animation:fadeIn 0.2s ease;';
    
    overlay.innerHTML =
      '<div class="loading-spinner" style="width:60px;height:60px;border:4px solid rgba(99,102,241,0.2);' +
      'border-top:4px solid #6366f1;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:1.5rem;"></div>' +
      '<div style="color:var(--text-primary);font-size:1.1rem;font-weight:600;animation:pulse-opacity 1.5s ease-in-out infinite;">' + message + '</div>' +
      '<div style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;">Vui lòng chờ trong giây lát...</div>';
    
    document.body.appendChild(overlay);
  },

  hideLoadingOverlay: function () {
    var overlay = document.getElementById('ai-loading-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(function () { if (overlay.parentNode) overlay.remove(); }, 200);
    }
  },

  showToast: function (message) {
    var existing = document.getElementById('toast-notification');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.style.cssText = 'position:fixed;z-index:10001;bottom:2rem;left:50%;transform:translateX(-50%);' +
      'background:var(--card-bg,#1a1625);color:var(--text-primary);padding:0.75rem 1.5rem;' +
      'border-radius:12px;border:1px solid var(--border-color);box-shadow:0 8px 24px rgba(0,0,0,0.4);' +
      'font-size:0.9rem;animation:slideUp 0.3s ease;';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
    }, 3000);
  },

  // ====== Writing Test Handlers ======
  openWritingTest: function (testId) {
    var writingTests = window.vstepWritingTests31 || [];
    var test = writingTests.find(function (t) { return t.id === testId; });
    if (!test) {
      this.showToast('⚠️ Không tìm thấy đề thi');
      return;
    }

    this.currentWritingTest = test;
    this.currentSkill = 'writing';
    this.state = this.createInitialState();
    this._skipRestoreOnce = true;
    this.saveState();
    this.refresh();
  },

  toggleTranslation: function () {
    this.state.writing.translationExpanded = !this.state.writing.translationExpanded;
    this.saveState();
    this.refresh();
  },

  resetWritingTest: function () {
    if (!this.currentWritingTest) return;
    this.state = this.createInitialState();
    this.saveState();
    this.refresh();
    this.showToast('🔄 Đã reset bài viết');
  }
};
