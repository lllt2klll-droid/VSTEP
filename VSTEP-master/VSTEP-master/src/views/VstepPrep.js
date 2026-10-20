/* ==========================================================================
   VSTEP PREP VIEW - MULTI-LANGUAGE VSTEP LEARNING HUB
   ========================================================================== */

// IndexedDB database manager for persistent audio blobs storage (Speaking history)
window.SpeakingAudioDB = {
  dbName: "vstep_speaking_audio_db",
  storeName: "audio_blobs",
  
  openDB: function () {
    return new Promise(function (resolve, reject) {
      var request = indexedDB.open(SpeakingAudioDB.dbName, 1);
      request.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains(SpeakingAudioDB.storeName)) {
          db.createObjectStore(SpeakingAudioDB.storeName);
        }
      };
      request.onsuccess = function (e) {
        resolve(e.target.result);
      };
      request.onerror = function (e) {
        reject(e.target.error);
      };
    });
  },
  
  saveAudio: async function (key, blob) {
    try {
      var db = await this.openDB();
      return new Promise(function (resolve, reject) {
        var transaction = db.transaction([SpeakingAudioDB.storeName], "readwrite");
        var store = transaction.objectStore(SpeakingAudioDB.storeName);
        var request = store.put(blob, key);
        request.onsuccess = function () {
          resolve(true);
        };
        request.onerror = function (e) {
          reject(e.target.error);
        };
      });
    } catch (err) {
      console.error("IndexedDB saveAudio error:", err);
      return false;
    }
  },
  
  getAudio: async function (key) {
    try {
      var db = await this.openDB();
      return new Promise(function (resolve, reject) {
        var transaction = db.transaction([SpeakingAudioDB.storeName], "readonly");
        var store = transaction.objectStore(SpeakingAudioDB.storeName);
        var request = store.get(key);
        request.onsuccess = function (e) {
          resolve(e.target.result);
        };
        request.onerror = function (e) {
          reject(e.target.error);
        };
      });
    } catch (err) {
      console.error("IndexedDB getAudio error:", err);
      return null;
    }
  },
  
  deleteAudio: async function (key) {
    try {
      var db = await this.openDB();
      return new Promise(function (resolve, reject) {
        var transaction = db.transaction([SpeakingAudioDB.storeName], "readwrite");
        var store = transaction.objectStore(SpeakingAudioDB.storeName);
        var request = store.delete(key);
        request.onsuccess = function () {
          resolve(true);
        };
        request.onerror = function (e) {
          reject(e.target.error);
        };
      });
    } catch (err) {
      console.error("IndexedDB deleteAudio error:", err);
      return false;
    }
  }
};

window.VstepView = {
  currentSection: "reading",
  sidebarCollapsed: false,
  reading: {
    currentCategory: 0,
    currentTest: 0,
    answers: {},
    submitted: false,
    questionTimes: {},
    completedTests: {},
  },
  listening: {
    currentPart: 0,
    currentExercise: 0,
    answers: {},
    submitted: false,
    isPlaying: false,
    showTranscript: false,
    mode: "test",
    shadowingIndex: 0,
    shadowingResults: {},
    shadowingRecording: false,
    shadowingSpeed: 1,
    questionTimes: {},
    completedExercises: {},
  },
  writing: {
    task: "task1",
    testIndex: 0,
    showGuide: null,
    wordCount: 0,
    userText: "",
    result: null,
    grading: false,
    aiAssist: false,
    sentenceFeedback: [],
    completedTests: {},
    showHistory: false,
    showTemplates: false,
    essayHistory: {},
    userHighlights: [],
  },
  speaking: {
    part: "part1",
    topicIndex: 0,
    showTips: false,
    recording: false,
    recordStart: null,
    transcript: "",
    result: null,
    recognition: null,
    completedTopics: {},
    speakingHistory: {},
  },
  vstepVocabState: { level: "all", topic: "all", mode: "browse" },
  vstepQuizState: { currentIdx: 0, score: 0, answered: false, questions: [] },
  essayVocabTopic: null,
  essayVocabShowVi: true,
  essayExpandOpen: false,
  essayExpandText: "",
  essayExpandResult: "",
  khacBookCategory: 0,
  khacBookTopic: 0,
  khacBookShowVi: true,
  khacBookMinimized: false,
  khacMmMinimized: true,
  khacMmTopic: "transport",
  khacMmShowVi: false,
  khacMmZoom: 1,
  khacMethodsMinimized: true,
  khacVocabMinimized: true,
  khacVocabTopic: 0,
  khacVocabShowVi: true,
  khacIdeaMinimized: true,
  khacIdeaTopic: 0,
  khacIdeaShowVi: true,
  performanceHistory: {
    reading: [],
    listening: [],
    writing: [],
    speaking: [],
  },
  wrongAnswers: {
    reading: [],
    listening: [],
    writing: [],
    speaking: [],
  },
  render: function () {
    try {
      // Load saved state only once per session (not on every re-render)
      if (!this._stateLoaded) {
        this.loadState();
        this.loadPerformanceHistory();
        this.loadWrongAnswers();
        this._stateLoaded = true;
      }
      var sectionHtml = this.renderSection(this.currentSection);
      
      // Check if user has seen the onboarding guide
      var hasSeenOnboarding = this._lsGet("vstep_onboarding_seen");
      var showOnboarding = !hasSeenOnboarding && this.currentSection === "reading";
      
      var onboardingHtml = '';
      if (showOnboarding) {
        onboardingHtml = `
          <div class="glass-card" style="margin-bottom:1.5rem;background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(59,130,246,0.1));border-color:rgba(16,185,129,0.3);padding:1.5rem 2rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;">
              <div style="flex:1;">
                <h3 style="font-size:1.2rem;margin-bottom:0.75rem;color:var(--accent);">🎓 Chào mừng đến với Phòng luyện thi VSTEP!</h3>
                <p style="color:var(--text-muted);margin-bottom:1rem;font-size:0.95rem;">Hướng dẫn nhanh cho người mới bắt đầu:</p>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.75rem;">
                  <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:0.75rem;border-left:3px solid #3b82f6;">
                    <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.25rem;">📖 Đọc (Reading)</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">Đọc đoạn văn và trả lời câu hỏi trắc nghiệm</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:0.75rem;border-left:3px solid #8b5cf6;">
                    <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.25rem;">🎧 Nghe (Listening)</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">Nghe audio và trả lời câu hỏi, có phụ đề</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:0.75rem;border-left:3px solid #f59e0b;">
                    <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.25rem;">✍️ Viết (Writing)</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">Viết thư và luận văn, AI chấm điểm chi tiết</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:0.75rem;border-left:3px solid #ef4444;">
                    <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.25rem;">🎤 Nói (Speaking)</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">Ghi âm câu trả lời, AI đánh giá phát âm</div>
                  </div>
                </div>
                <div style="margin-top:1rem;padding:0.75rem;background:rgba(16,185,129,0.1);border-radius:8px;font-size:0.85rem;color:var(--text-muted);">
                  💡 <strong>Mẹo:</strong> Bấm Ctrl+←/→ để chuyển bài, phím 1-4 để chọn đáp án nhanh, Space để phát/tạm dừng audio.
                </div>
              </div>
              <button class="btn btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" onclick="VstepView.dismissOnboarding()">✕ Đã hiểu</button>
            </div>
          </div>
        `;
      }
      
      var html = `
        <div style="margin-bottom:2rem;">
          <h1 style="font-size:2rem;margin-bottom:0.35rem;">Phòng luyện thi VSTEP</h1>
          <p style="color:var(--text-muted);">Luyện tập 4 kỹ năng theo chuẩn VSTEP Việt Nam. AI sẽ chấm điểm và nhận xét chi tiết.</p>
        </div>
        ${onboardingHtml}
        <div class="vstep-container">
          <div class="vstep-workspace" id="vstep-workspace" data-section="${this.currentSection}">
            ${sectionHtml}
          </div>
        </div>
        <style>
          /* Fix #9: box-sizing for consistent layout */
          *, *::before, *::after { box-sizing: border-box; }
          
          /* Fix #7: Minimum touch targets for mobile accessibility */
          .min-touch-target, .btn, .vstep-cat-btn, .vstep-test-btn, .choice-label, .recorder-btn, .audio-play-btn, .audio-speed-btn {
            min-height: 44px;
            min-width: 44px;
          }
          /* Fix #9: Responsive layout */
          @media (max-width: 768px) {
            .vstep-split-layout { flex-direction: column; }
            .writing-layout { grid-template-columns: 1fr; }
            .vstep-container { padding: 0.5rem; }
            .glass-card { padding: 1rem; }
            
            /* Writing feedback popup responsive */
            .writing-feedback-popup {
              width: 90vw !important;
              max-width: 95vw !important;
              left: 50% !important;
              transform: translateX(-50%);
              top: 50% !important;
              position: fixed !important;
              max-height: 70vh;
              overflow-y: auto;
            }
          }
        </style>
      `;
      // Fix #8: Keyboard navigation shortcuts
      if (!this._keyboardListenerAdded) {
        this._keyboardListenerAdded = true;
        document.addEventListener('keydown', this._handleKeydown.bind(this));
      }
      return html;
    } catch (e) {
      console.error("VstepView.render error:", e);
      return (
        '<div style="padding:2rem;color:#ef4444;"><h3>Lỗi</h3><pre style="white-space:pre-wrap;">' +
        e.message +
        "\n" +
        (e.stack || "") +
        "</pre></div>"
      );
    }
  },

  // Fix #8: Keyboard navigation shortcuts
  _handleKeydown: function (e) {
    // Only handle shortcuts when not in input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }
    
    // Number keys 1-4 for answer selection
    if (e.key >= '1' && e.key <= '4') {
      var index = parseInt(e.key) - 1;
      var s = this.currentSection === 'reading' ? this.reading : this.listening;
      var answers = s.answers || {};
      
      // Find current question being displayed
      var questionItems = document.querySelectorAll('.vstep-question-card');
      if (questionItems.length > 0) {
        // Get the first visible question
        for (var i = 0; i < questionItems.length; i++) {
          var gi = questionItems[i].getAttribute('data-question-index') || questionItems[i].getAttribute('data-gi');
          if (gi !== null) {
            var choices = questionItems[i].querySelectorAll('.vstep-choice-item');
            if (choices[index]) {
              choices[index].click();
              break;
            }
          }
        }
      }
    }
    
    // Arrow keys with Ctrl for navigation
    if (e.ctrlKey) {
      if (e.key === 'ArrowLeft') {
        if (this.currentSection === 'reading') {
          var newTest = Math.max(0, this.reading.currentTest - 1);
          this.setReadingTest(newTest);
        } else if (this.currentSection === 'listening') {
          var newEx = Math.max(0, this.listening.currentExercise - 1);
          this.setListeningExercise(newEx);
        }
        e.preventDefault();
      }
      if (e.key === 'ArrowRight') {
        if (this.currentSection === 'reading') {
          var cat = VstepReadingData.categories[this.reading.currentCategory];
          var newTest = Math.min(cat.tests.length - 1, this.reading.currentTest + 1);
          this.setReadingTest(newTest);
        } else if (this.currentSection === 'listening') {
          var part = VstepListeningData.parts[this.listening.currentPart];
          var newEx = Math.min(part.exercises.length - 1, this.listening.currentExercise + 1);
          this.setListeningExercise(newEx);
        }
        e.preventDefault();
      }
    }
    
    // Space to play/pause audio in listening
    if (e.key === ' ' && this.currentSection === 'listening') {
      var audioEl = document.getElementById('vstep-audio');
      if (audioEl) {
        e.preventDefault();
        this.playListeningAudio();
      }
    }
  },


  setSection: function (section) {
    this.currentSection = section;
    this.saveState();
    var sectionLabels = { reading: "Luyện đọc", listening: "Luyện nghe", writing: "Luyện viết", speaking: "Luyện nói", roadmap: "Lộ trình", vstepVocab: "Từ vựng VSTEP", essayVocab: "Từ vựng Essay", khac: "Khác" };
    if (typeof DashboardView !== "undefined" && DashboardView.saveLastActivity) {
      DashboardView.saveLastActivity("vstep", section, sectionLabels[section] || section);
    }
    // Update navbar subitem active states
    document.querySelectorAll(".nav-subitem").forEach(function (el) { el.classList.remove("active"); });
    var subitem = document.querySelector('.nav-subitem[data-section="' + section + '"]');
    if (subitem) subitem.classList.add("active");
    // Only render if workspace exists (view is already mounted)
    var ws = document.getElementById("vstep-workspace");
    if (ws) this.renderWorkspaceSection(section);
  },

  toggleTestExpand: function(skill){
    var grid = document.getElementById(skill + '-test-grid');
    var wrap = document.getElementById(skill + '-test-expand');
    if(!grid || !wrap) return;
    var collapsed = grid.classList.toggle('is-collapsed');
    wrap.classList.toggle('is-collapsed', collapsed);
    var hdr = wrap.querySelector('.vstep-test-expand-header');
    if(hdr) hdr.setAttribute('aria-expanded', String(!collapsed));
  },
  renderWorkspaceSection: function (section, options) {
    var ws = document.getElementById("vstep-workspace");
    if (!ws) return;

    options = options || {};
    var self = this;
    var transitionId = (this._workspaceTransitionId || 0) + 1;
    this._workspaceTransitionId = transitionId;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scrollTop = options.preserveScroll ? ws.scrollTop : 0;
    var scrollLeft = options.preserveScroll ? ws.scrollLeft : 0;
    var swapDelay = reduceMotion ? 0 : 120;

    ws.classList.add("is-transitioning");
    ws.style.transition = reduceMotion
      ? "none"
      : "opacity 0.18s ease, transform 0.18s ease";
    ws.style.opacity = reduceMotion ? "1" : "0";
    ws.style.transform = reduceMotion ? "none" : "translateY(8px)";

    window.setTimeout(function () {
      if (self._workspaceTransitionId !== transitionId) return;
      ws.innerHTML = self.renderSection(section);
      ws.dataset.section = section;
      ws.scrollTop = scrollTop;
      ws.scrollLeft = scrollLeft;

      window.requestAnimationFrame(function () {
        if (self._workspaceTransitionId !== transitionId) return;
        ws.style.transition = reduceMotion
          ? "none"
          : "opacity var(--vstep-section-transition), transform var(--vstep-section-transition)";
        ws.style.opacity = "1";
        ws.style.transform = "translateY(0)";
        ws.classList.remove("is-transitioning");
      });
    }, swapDelay);
  },

  renderSection: function (section) {
    switch (section) {
      case "reading":
        return this.renderReadingSection();
      case "listening":
        return this.renderListeningSection();
      case "writing":
        return this.renderWritingSection();
      case "speaking":
        return this.renderSpeakingSection();
      case "roadmap":
        return this.renderRoadmapSection();
      case "vstepVocab":
        return this.renderVstepVocabSection();
      case "essayVocab":
        return this.renderEssayVocabSection();
      case "khac":
        return this.renderKhacSection();
      default:
        return this.renderReadingSection();
    }
  },

  // ------------------------------------------------------------------
  // READING SECTION (rewritten for category/test-based data)
  // ------------------------------------------------------------------
  _getReadingGlobalQuestionIndex: function (catIdx, testIdx, qIdx) {
    var gi = 0;
    for (var c = 0; c < catIdx; c++) {
      for (var t = 0; t < VstepReadingData.categories[c].tests.length; t++) {
        gi += VstepReadingData.categories[c].tests[t].questions.length;
      }
    }
    for (var t2 = 0; t2 < testIdx; t2++) {
      gi += VstepReadingData.categories[catIdx].tests[t2].questions.length;
    }
    gi += qIdx;
    return gi;
  },

  renderReadingSection: function () {
    var data = VstepReadingData;
    var s = this.reading;
    var cat = data.categories[s.currentCategory];
    var test = cat.tests[s.currentTest];
    if (!test) {
      s.currentTest = 0;
      test = cat.tests[0];
    }
    var totalQs = 0;
    VstepReadingData.categories.forEach(function (c) {
      c.tests.forEach(function (t) {
        totalQs += t.questions.length;
      });
    });
    // Count answered questions from allAnswers for persistence across test switches
    var allAnswers = s.allAnswers || {};
    var answeredCount = 0;
    Object.keys(allAnswers).forEach(function (testId) {
      answeredCount += Object.keys(allAnswers[testId]).length;
    });
    var progressPct =
      totalQs > 0 ? ((answeredCount / totalQs) * 100).toFixed(0) : 0;

    var catButtonsHtml = data.categories
      .map(function (c, ci) {
        var isActive = ci === s.currentCategory;
        return (
          '<button class="vstep-cat-btn' + (isActive ? ' is-active' : '') + '" onclick="VstepView.setReadingCategory(' +
          ci +
          ')" aria-pressed="' + isActive + '">' +
          '<span class="vstep-cat-icon">' + c.icon + '</span>' +
          '<span class="vstep-cat-title">' + c.title + '</span>' +
          "</button>"
        );
      })
      .join("");

    var testCountLabel = cat.tests.length + ' \u0111\u1ec1';
    var testButtonsInner = cat.tests
      .map(function (t, ti) {
        var testId = s.currentCategory + "_" + ti;
        var isCompleted = s.completedTests && s.completedTests[testId] && s.completedTests[testId].submitted;
        var isActive = ti === s.currentTest;
        var testAnswered = t.questions.filter(function (q, qi) {
          var gi = VstepView._getReadingGlobalQuestionIndex(
            s.currentCategory,
            ti,
            qi,
          );
          var testIdForCheck = s.currentCategory + "_" + ti;
          var allAnswers = s.allAnswers || {};
          var testAnswers = allAnswers[testIdForCheck] || {};
          return testAnswers[gi] !== undefined;
        }).length;
        var statusClass = isCompleted ? ' is-done' : testAnswered > 0 ? ' is-progress' : '';
        var statusText = isCompleted ? '\u2713 ' + (s.completedTests[testId].score || '?') + '/' + t.questions.length : testAnswered > 0 ? testAnswered + '/' + t.questions.length : 'Ch\u01b0a l\u00e0m';
        return (
          '<button class="vstep-test-btn' + (isActive ? ' is-active' : '') + statusClass + '" onclick="VstepView.setReadingTest(' +
          ti +
          ')">' +
          '<span class="vstep-test-title">' + (ti+1) + '</span>' +
          '<span class="vstep-test-status">' + statusText + '</span>' +
          "</button>"
        );
      })
      .join("");
    var testButtonsHtml =
      '<div class="vstep-test-expand is-collapsed" id="reading-test-expand">' +
      '<button class="vstep-test-expand-header" onclick="VstepView.toggleTestExpand(\'reading\')" aria-expanded="false">' +
      '<span>\uD83D\uDCDA Ch\u1ecDn \u0111\u1ec1 \u2014 ' + testCountLabel + '</span>' +
      '<span class="vstep-expand-icon">\u25BE</span>' +
      '</button>' +
      '<div class="vstep-test-grid is-collapsed" id="reading-test-grid">' + testButtonsInner + '</div></div>';

    var questionsHtml = test.questions
      .map(function (q, qi) {
        var gi = VstepView._getReadingGlobalQuestionIndex(
          s.currentCategory,
          s.currentTest,
          qi,
        );
        return VstepView._renderQuestion(
          gi,
          q,
          s.answers[gi],
          q.correct,
          s.submitted,
          qi + 1  // Start numbering from 1 for each test
        );
      })
      .join("");

    var hasPrev = s.currentTest > 0;
    var hasNext = s.currentTest < cat.tests.length - 1;
    var navBtns = "";
    if (hasPrev)
      navBtns +=
        '<button class="btn btn-secondary" style="font-size:0.85rem;" onclick="VstepView.setReadingTest(' +
        (s.currentTest - 1) +
        ')">\u2190 Test truoc</button> ';
    if (hasNext)
      navBtns +=
        '<button class="btn btn-secondary" style="font-size:0.85rem;" onclick="VstepView.setReadingTest(' +
        (s.currentTest + 1) +
        ')">Test tiep theo \u2192</button>';

    var testScore = s.submitted
      ? test.questions.filter(function (q, qi) {
          return (
            s.answers[
              VstepView._getReadingGlobalQuestionIndex(
                s.currentCategory,
                s.currentTest,
                qi,
              )
            ] === q.correct
          );
        }).length
      : null;
    var testTotal = test.questions.length;

    var submitBtn = s.submitted
      ? '<div style="margin-top:1rem;display:flex;gap:1rem;align-items:center;"><span style="font-size:1.1rem;font-weight:700;">Ket qua: ' +
        testScore +
        "/" +
        testTotal +
        '</span><button class="btn btn-secondary" onclick="VstepView.resetCurrentReadingTest()">L\u00e0m l\u1ea1i \u0111\u1ec1 n\u00e0y</button></div>'
      : '<button class="btn btn-accent" style="width:100%;margin-top:1rem;" onclick="VstepView.submitReadingTest()">Nop bai ' +
        test.title +
        "</button>";

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">\n          <div>\n            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">Luyen doc VSTEP</h2>\n            <p style="font-size:0.85rem;color:var(--text-muted);">Doc doan van va tra loi cau hoi. ' +
      totalQs +
      ' cau hoi tren tat ca cac dang bai.</p>\n          </div>\n        </div>\n        <div class="vstep-cat-strip">' +
      catButtonsHtml +
      '</div>\n        <div style="margin-top:0.5rem;">\n          <div class="progress-bar-container" style="height:4px;">\n            <div style="height:100%;background:var(--accent);border-radius:9999px;width:' +
      progressPct +
      '%;"></div>\n          </div>\n          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">Da tra loi ' +
      answeredCount +
      "/" +
      totalQs +
      " cau (toan bo " +
      data.categories.length +
      ' chuyen muc)</p>\n        </div>\n      </div>\n\n      <div class="glass-card vstep-split-layout">\n        <div class="vstep-passage-panel">\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">\n            <h3 style="font-size:0.95rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">' +
      cat.icon +
      " " +
      cat.title +
      '</h3>\n            <span class="badge badge-level" style="font-size:0.75rem;padding:0.3rem 0.7rem;margin-left:0.5rem;">' +
      test.title +
      '</span>\n          </div>\n          <div style="margin-bottom:0.75rem;display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">' +
      testButtonsHtml +
      "</div>\n          " +
      VstepView._renderPassage(test.passage) +
      '\n        </div>\n        <div class="vstep-questions-panel">\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">\n            <h3 style="font-size:1rem;color:var(--primary);">' +
      cat.description +
      "</h3>\n            <div>" +
      navBtns +
      "</div>\n          </div>\n          " +
      questionsHtml +
      "\n          " +
      submitBtn +
      "\n        </div>\n      </div>\n    "
    );
  },

  _renderPassage: function (text) {
    return text
      .split("\n\n")
      .map(function (p) {
        var processed = p
          .trim()
          .replace(
            /\b([a-zA-Z\u00C0-\u024F]+(?:['\u2019][a-zA-Z]+)?)\b/g,
            function (match) {
              if (window.WordSaver && WordSaver.isSaved(match)) {
                return '<span class="word-saved">' + match + "</span>";
              }
              return match;
            },
          );
        return '<p style="line-height:1.7;">' + processed + "</p>";
      })
      .join("");
  },

  highlightWordInPassages: function (word) {
    var passages = document.querySelectorAll(
      ".vstep-passage-panel, .vstep-panel",
    );
    var escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp("\\b(" + escaped + ")\\b", "gi");
    passages.forEach(function (el) {
      var walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        null,
        false,
      );
      var textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(function (node) {
        var text = node.textContent;
        if (!regex.test(text)) return;
        regex.lastIndex = 0;
        var fragment = document.createDocumentFragment();
        var lastIdx = 0,
          match;
        while ((match = regex.exec(text)) !== null) {
          if (match.index > lastIdx)
            fragment.appendChild(
              document.createTextNode(text.slice(lastIdx, match.index)),
            );
          var span = document.createElement("span");
          span.className = "word-saved";
          span.textContent = match[1];
          fragment.appendChild(span);
          lastIdx = match.index + match[0].length;
        }
        if (lastIdx < text.length)
          fragment.appendChild(document.createTextNode(text.slice(lastIdx)));
        node.parentNode.replaceChild(fragment, node);
      });
    });
  },

  _renderQuestion: function (gi, q, userAnswer, correctIdx, submitted, displayNumber) {
    var letters = ['A', 'B', 'C', 'D'];
    var questionNumber = displayNumber !== undefined ? displayNumber : gi + 1;
    
    var optionsHtml = q.options
      .map(function (opt, oi) {
        var cls = "vstep-choice-item";
        if (submitted) {
          cls +=
            oi === correctIdx
              ? " selected"
              : userAnswer === oi && oi !== correctIdx
                ? ""
                : "";
        } else {
          cls += userAnswer === oi ? " selected" : "";
        }
        var letter = letters[oi] || String.fromCharCode(65 + oi);
        return (
          '<div class="' +
          cls +
          '" id="r' +
          gi +
          "-opt" +
          oi +
          '" onclick="' +
          (submitted
            ? ""
            : "VstepView.toggleReadingAnswer(" + gi + ", " + oi + ", event)") +
          '">\n        <span class="choice-letter">' +
          letter +
          '</span>\n        <span class="choice-text">' +
          opt +
          '</span>\n      </div>'
        );
      })
      .join("\n");

    var explanationHtml = "";
    if (submitted) {
      var correctText =
        userAnswer === correctIdx
          ? "\u0110\xfang! "
          : "Sai. \u0110\xe1p \xe1n \u0111\xfang l\xe0: <strong>" +
            q.options[correctIdx] +
            "</strong>. ";
      explanationHtml =
        '<div class="explanation-box" style="margin-top:0.75rem;font-size:0.9rem;">' +
        correctText +
        "<br>" +
        q.explanation +
        "</div>";
    }

    return (
      '<div class="vstep-question-card" data-question-index="' + gi + '" data-gi="' + gi + '">\n      <div class="question-header">\n        <span class="question-number">' +
      questionNumber +
      '</span>\n        <span class="question-text">' +
      q.question +
      '</span>\n      </div>\n      <div class="vstep-choices">' +
      optionsHtml +
      "</div>\n      " +
      explanationHtml +
      "\n    </div>"
    );
  },

  setReadingCategory: function (idx) {
    var completedTests = this.reading.completedTests || {};
    this.reading.currentCategory = idx;
    this.reading.currentTest = 0;
    this.reading.submitted = false;
    // Don't reset answers - preserve user progress when switching categories
    // this.reading.answers = {};
    // this.reading.questionTimes = {};
    this.reading.completedTests = completedTests;
    // FIX: Preserve answers from allAnswers when switching categories
    var newTestId = idx + "_0";
    if (!this.reading.allAnswers) this.reading.allAnswers = {};
    if (this.reading.allAnswers[newTestId]) {
      this.reading.answers = JSON.parse(JSON.stringify(this.reading.allAnswers[newTestId]));
    } else {
      this.reading.answers = {};
    }
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      // Reset scroll to top when changing category (expected behavior)
      ws.scrollTop = 0;
      ws.innerHTML = this.renderSection("reading");
    }
  },

  setReadingTest: function (idx) {
    var completedTests = this.reading.completedTests || {};
    this.reading.currentTest = idx;
    this.reading.completedTests = completedTests;

    // Preserve all answers across tests - load answers for current test
    var testId = this.reading.currentCategory + "_" + idx;
    if (!this.reading.allAnswers) this.reading.allAnswers = {};
    
    if (completedTests[testId] && completedTests[testId].submitted) {
      this.reading.submitted = true;
      this.reading.answers = JSON.parse(JSON.stringify(completedTests[testId].answers || {}));
    } else {
      this.reading.submitted = false;
      // Load saved answers for this test, or start fresh
      this.reading.answers = this.reading.allAnswers[testId] || {};
    }

    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      ws.innerHTML = this.renderSection("reading");
      // Scroll both panels to top for the new test
      requestAnimationFrame(function() {
        var passagePanel = ws.querySelector('.vstep-passage-panel');
        var questionsPanel = ws.querySelector('.vstep-questions-panel');
        if (passagePanel) passagePanel.scrollTop = 0;
        if (questionsPanel) questionsPanel.scrollTop = 0;
      });
    }
  },

  /* ---------- Helper: show toast notification ---------- */
  showToast: function (msg, duration) {
    duration = duration || 1800;
    var existing = document.getElementById("vstep-toast");
    if (existing) existing.remove();
    var t = document.createElement("div");
    t.id = "vstep-toast";
    t.textContent = msg;
    t.style.cssText =
      "position:fixed;top:1rem;left:1rem;z-index:999999;" +
      "background:var(--accent);color:#fff;padding:10px 20px;" +
      "border-radius:10px;font-size:0.9rem;font-weight:600;" +
      "box-shadow:0 4px 20px rgba(0,0,0,0.3);" +
      "opacity:0;transform:translateY(-12px);transition:all 0.25s ease;";
    document.body.appendChild(t);
    requestAnimationFrame(function () {
      t.style.opacity = "1";
      t.style.transform = "translateY(0)";
    });
    setTimeout(function () {
      t.style.opacity = "0";
      t.style.transform = "translateY(-12px)";
      setTimeout(function () { t.remove(); }, 300);
    }, duration);
  },

  /* ---------- Show break reminder after completing a section ---------- */
  showBreakReminder: function (sectionName, score, total) {
    var percentage = Math.round((score / total) * 100);
    var existing = document.getElementById("vstep-break-reminder");
    if (existing) existing.remove();
    
    var modal = document.createElement("div");
    modal.id = "vstep-break-reminder";
    modal.style.cssText =
      "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:999999;" +
      "display:flex;align-items:center;justify-content:center;padding:2rem;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);" +
      "opacity:0;transition:opacity 0.3s ease;";
    
    modal.innerHTML =
      '<div style="background:var(--bg-panel-solid);border-radius:20px;padding:2.5rem;max-width:480px;width:100%;' +
      'box-shadow:0 25px 80px rgba(0,0,0,0.5);border:1px solid var(--border-color);position:relative;overflow:hidden;">' +
      '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--primary));"></div>' +
      '<div style="text-align:center;">' +
      '<div style="font-size:3.5rem;margin-bottom:1rem;filter:drop-shadow(0 4px 12px rgba(16,185,129,0.3));">☕</div>' +
      '<h3 style="font-size:1.4rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-main);">Hoàn thành phần ' + sectionName + '!</h3>' +
      '<p style="color:var(--text-muted);margin-bottom:1.75rem;font-size:1.05rem;">Kết quả: <strong style="color:var(--accent);font-size:1.2rem;">' + score + '/' + total + '</strong> <span style="color:var(--text-muted);">(' + percentage + '%)</span></p>' +
      '<div style="background:rgba(16,185,129,0.12);border-radius:14px;padding:1.25rem;margin-bottom:2rem;border-left:4px solid var(--accent);text-align:left;">' +
      '<p style="font-size:0.95rem;color:var(--text-main);margin:0;line-height:1.6;">💡 <strong>Gợi ý:</strong> Nghỉ ngơi 5-10 phút trước khi chuyển sang phần tiếp theo để não bộ phục hồi và đạt hiệu quả tốt hơn.</p>' +
      '</div>' +
      '<div style="display:flex;gap:1rem;justify-content:center;">' +
      '<button onclick="VstepView.closeBreakReminder()" style="padding:0.75rem 1.5rem;border-radius:10px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-main);font-size:0.95rem;cursor:pointer;font-weight:500;transition:all 0.2s ease;">Đóng</button>' +
      '<button onclick="VstepView.closeBreakReminder()" style="padding:0.75rem 1.5rem;border-radius:10px;border:none;background:linear-gradient(135deg,var(--accent),#059669);color:#fff;font-size:0.95rem;cursor:pointer;font-weight:600;box-shadow:0 4px 16px rgba(16,185,129,0.4);transition:all 0.2s ease;">Tiếp tục</button>' +
      '</div>' +
      '</div></div>';
    
    document.body.appendChild(modal);
    requestAnimationFrame(function () {
      modal.style.opacity = "1";
    });
  },

  closeBreakReminder: function () {
    var existing = document.getElementById("vstep-break-reminder");
    if (existing) existing.remove();
  },

  /* ---------- Helper functions for localStorage ---------- */
  _lsGet: function (key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("Error reading localStorage key:", key, e);
      return null;
    }
  },

  _lsSet: function (key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Error setting localStorage key:", key, e);
    }
  },

  /* ---------- Dismiss onboarding guide ---------- */
  dismissOnboarding: function () {
    this._lsSet("vstep_onboarding_seen", "true");
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      ws.innerHTML = this.renderSection(this.currentSection);
    }
  },

  /* ---------- Record performance data for charts ---------- */
  recordPerformance: function (skill, score, total) {
    var percentage = Math.round((score / total) * 100);
    var record = {
      date: new Date().toISOString(),
      score: score,
      total: total,
      percentage: percentage,
    };
    
    if (!this.performanceHistory[skill]) {
      this.performanceHistory[skill] = [];
    }
    
    this.performanceHistory[skill].push(record);
    
    // Keep only last 30 records
    if (this.performanceHistory[skill].length > 30) {
      this.performanceHistory[skill] = this.performanceHistory[skill].slice(-30);
    }
    
    // Save to localStorage
    StorageManager.setVstepPerformanceHistory(this.performanceHistory);
  },

  loadPerformanceHistory: function () {
    try {
      var saved = StorageManager.getVstepPerformanceHistory();
      if (saved && Object.keys(saved).length > 0) {
        this.performanceHistory = saved;
      }
    } catch (e) {
      console.error("Error loading performance history:", e);
    }
  },

  loadWrongAnswers: function () {
    try {
      var saved = StorageManager.getVstepWrongAnswers();
      if (saved && Object.keys(saved).length > 0) {
        this.wrongAnswers = saved;
      }
    } catch (e) {
      console.error("Error loading wrong answers:", e);
    }
  },

  /* ---------- Record wrong answers for notebook ---------- */
  recordWrongAnswer: function (skill, questionData, userAnswer, correctAnswer, locationInfo) {
    var record = {
      date: new Date().toISOString(),
      question: questionData,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      reviewed: false,
      category: this.categorizeMistake(questionData, userAnswer, correctAnswer),
      reviewCount: 0,
      nextReviewDate: this.calculateNextReviewDate(0),
      location: locationInfo || {}
    };
    
    if (!this.wrongAnswers[skill]) {
      this.wrongAnswers[skill] = [];
    }
    
    this.wrongAnswers[skill].push(record);
    
    // Keep only last 100 wrong answers
    if (this.wrongAnswers[skill].length > 100) {
      this.wrongAnswers[skill] = this.wrongAnswers[skill].slice(-100);
    }
    
    StorageManager.setVstepWrongAnswers(this.wrongAnswers);
  },

  /* ---------- Calculate next review date using spaced repetition ---------- */
  calculateNextReviewDate: function (reviewCount) {
    var intervals = [1, 3, 7, 14, 30]; // Days
    var interval = intervals[Math.min(reviewCount, intervals.length - 1)];
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);
    return nextDate.toISOString();
  },

  /* ---------- Mark wrong answer as reviewed ---------- */
  markWrongAnswerReviewed: function (skill, index) {
    if (!this.wrongAnswers[skill] || !this.wrongAnswers[skill][index]) return;
    
    var record = this.wrongAnswers[skill][index];
    record.reviewed = true;
    record.reviewCount++;
    record.nextReviewDate = this.calculateNextReviewDate(record.reviewCount);
    
    StorageManager.setVstepWrongAnswers(this.wrongAnswers);
    
    // Refresh the notebook UI
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      ws.innerHTML = this.renderSection("roadmap");
    }
  },

  /* ---------- Toggle wrong answer notebook collapse state ---------- */
  toggleWrongAnswerNotebook: function () {
    this.wrongAnswerNotebookCollapsed = !this.wrongAnswerNotebookCollapsed;
    
    // Refresh the notebook UI
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      ws.innerHTML = this.renderSection("roadmap");
    }
  },

  /* ---------- Navigate to specific test from wrong answer ---------- */
  navigateToWrongAnswer: function (skill, index) {
    if (!this.wrongAnswers[skill] || !this.wrongAnswers[skill][index]) return;
    
    var record = this.wrongAnswers[skill][index];
    var location = record.location;
    
    if (!location) {
      alert('Không tìm thấy thông tin vị trí của câu hỏi này');
      return;
    }
    
    // Switch to the appropriate skill section
    this.setSection(skill);
    
    // Navigate to specific location based on skill
    setTimeout(function () {
      if (skill === 'reading' && location.category !== undefined && location.test !== undefined) {
        VstepView.reading.currentCategory = location.category;
        VstepView.reading.currentTest = location.test;
        VstepView.reading.answers = {};
        VstepView.reading.submitted = false;
      } else if (skill === 'listening' && location.part !== undefined && location.exercise !== undefined) {
        VstepView.listening.currentPart = location.part;
        VstepView.listening.currentExercise = location.exercise;
        VstepView.listening.answers = {};
        VstepView.listening.submitted = false;
      } else if (skill === 'writing' && location.task !== undefined && location.testIndex !== undefined) {
        VstepView.writing.task = location.task;
        VstepView.writing.testIndex = location.testIndex;
        VstepView.writing.userText = "";
        VstepView.writing.result = null;
      } else if (skill === 'speaking' && location.part !== undefined && location.topicIndex !== undefined) {
        VstepView.speaking.part = location.part;
        VstepView.speaking.topicIndex = location.topicIndex;
      }
      
      // Refresh the view
      var ws = document.getElementById("vstep-workspace");
      if (ws) {
        ws.innerHTML = VstepView.renderSection(skill);
      }
    }, 100);
  },

  /* ---------- Get due wrong answers for review ---------- */
  getDueWrongAnswers: function () {
    var skills = ["reading", "listening", "writing", "speaking"];
    var now = new Date();
    var dueAnswers = [];
    
    skills.forEach(function (skill) {
      var wrongAnswers = VstepView.wrongAnswers[skill] || [];
      wrongAnswers.forEach(function (wa, idx) {
        if (wa.nextReviewDate) {
          var reviewDate = new Date(wa.nextReviewDate);
          if (reviewDate <= now) {
            dueAnswers.push({
              skill: skill,
              index: idx,
              data: wa
            });
          }
        }
      });
    });
    
    return dueAnswers;
  },

  /* ---------- Categorize mistake type ---------- */
  categorizeMistake: function (questionData, userAnswer, correctAnswer) {
    // Simple categorization based on answer patterns
    if (!userAnswer) return "unanswered";
    
    if (typeof questionData === 'object' && questionData.options) {
      // For multiple choice, check if answers are similar
      var userStr = String(userAnswer).toLowerCase();
      var correctStr = String(correctAnswer).toLowerCase();
      
      if (userStr === correctStr) return "none";
      
      // Check if they share common words (vocabulary issue)
      var userWords = userStr.split(/\s+/);
      var correctWords = correctStr.split(/\s+/);
      var commonWords = userWords.filter(function (w) { return correctWords.indexOf(w) >= 0; });
      
      if (commonWords.length > 0) return "vocabulary";
      return "misunderstanding";
    }
    
    return "other";
  },

  /* ---------- Render wrong answer notebook ---------- */
  renderWrongAnswerNotebook: function () {
    var skills = ["reading", "listening", "writing", "speaking"];
    var skillLabels = { reading: "Đọc", listening: "Nghe", writing: "Viết", speaking: "Nói" };
    var categoryLabels = {
      unanswered: "Chưa trả lời",
      vocabulary: "Từ vựng",
      misunderstanding: "Hiểu sai",
      grammar: "Ngữ pháp",
      other: "Khác"
    };
    
    var allWrongAnswers = [];
    skills.forEach(function (skill) {
      var wrongAnswers = VstepView.wrongAnswers[skill] || [];
      wrongAnswers.forEach(function (wa, idx) {
        allWrongAnswers.push({
          skill: skill,
          index: idx,
          skillLabel: skillLabels[skill],
          data: wa
        });
      });
    });
    
    // Check collapsed state
    var isCollapsed = VstepView.wrongAnswerNotebookCollapsed || false;
    
    if (allWrongAnswers.length === 0) {
      return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">' +
        '<h3 style="font-size:1.1rem;margin:0;">📓 Sổ tay câu sai</h3>' +
        '</div>' +
        '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Chưa có câu sai nào được ghi lại</p>' +
        '</div>';
    }
    
    // Get due answers for spaced repetition
    var dueAnswers = this.getDueWrongAnswers();
    var dueCount = dueAnswers.length;
    
    // Sort by date (most recent first)
    allWrongAnswers.sort(function (a, b) {
      return new Date(b.data.date) - new Date(a.data.date);
    });
    
    var categoryCounts = {};
    allWrongAnswers.forEach(function (item) {
      var cat = item.data.category || "other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    var categoryStatsHtml = Object.keys(categoryCounts).map(function (cat) {
      return '<div style="display:inline-block;padding:0.4rem 0.8rem;background:var(--bg-input);border-radius:20px;margin-right:0.5rem;margin-bottom:0.5rem;font-size:0.8rem;">' +
        categoryLabels[cat] + ': ' + categoryCounts[cat] +
        '</div>';
    }).join('');
    
    var dueReviewHtml = '';
    if (dueCount > 0) {
      dueReviewHtml = '<div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);border-radius:8px;padding:1rem;margin-bottom:1rem;">' +
        '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">' +
        '<span style="font-size:1.2rem;">🔔</span>' +
        '<h4 style="font-size:0.95rem;font-weight:700;margin:0;color:#6366f1;">Có ' + dueCount + ' câu cần ôn tập lại</h4>' +
        '</div>' +
        '<p style="font-size:0.85rem;color:var(--text-muted);margin:0;">Đánh dấu "Đã ôn tập" để lên lịch ôn tập tiếp theo</p>' +
        '</div>';
    }
    
    var wrongAnswersHtml = allWrongAnswers.slice(0, 20).map(function (item, idx) {
      var wa = item.data;
      var dateStr = new Date(wa.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' });
      var categoryLabel = categoryLabels[wa.category] || "Khác";
      
      var questionText = typeof wa.question === 'object' ? (wa.question.text || wa.question.question || "Câu hỏi") : String(wa.question);
      var userAns = wa.userAnswer !== undefined ? String(wa.userAnswer) : "Chưa chọn";
      var correctAns = String(wa.correctAnswer);
      
      // Build location info string
      var locationInfo = '';
      if (wa.location) {
        if (item.skill === 'reading' && wa.location.category !== undefined && wa.location.test !== undefined) {
          locationInfo = ' • Category ' + (wa.location.category + 1) + ' • ' + (wa.location.test + 1);
        } else if (item.skill === 'listening' && wa.location.part !== undefined && wa.location.exercise !== undefined) {
          locationInfo = ' • Part ' + (wa.location.part + 1) + ' • Exercise ' + (wa.location.exercise + 1);
        } else if (item.skill === 'writing' && wa.location.task !== undefined && wa.location.testIndex !== undefined) {
          locationInfo = ' • Task ' + wa.location.task.toUpperCase() + ' • Test ' + (wa.location.testIndex + 1);
        } else if (item.skill === 'speaking' && wa.location.part !== undefined && wa.location.topicIndex !== undefined) {
          locationInfo = ' • Part ' + (wa.location.part + 1) + ' • Topic ' + (wa.location.topicIndex + 1);
        }
      }
      
      // Check if this answer is due for review
      var isDue = false;
      if (wa.nextReviewDate) {
        var reviewDate = new Date(wa.nextReviewDate);
        isDue = reviewDate <= new Date();
      }
      
      var reviewButton = '';
      if (isDue) {
        reviewButton = '<button onclick="event.stopPropagation();VstepView.markWrongAnswerReviewed(\'' + item.skill + '\', ' + item.index + ')" style="padding:0.3rem 0.6rem;background:#6366f1;color:white;border:none;border-radius:4px;font-size:0.75rem;cursor:pointer;margin-left:auto;">Đã ôn tập ✓</button>';
      }
      
      return '<div style="background:var(--bg-input);border-radius:8px;padding:1rem;margin-bottom:0.75rem;border-left:3px solid ' + 
        (isDue ? '#6366f1' : wa.category === 'vocabulary' ? '#f59e0b' : wa.category === 'misunderstanding' ? '#8b5cf6' : '#ef4444') + ';' + (isDue ? 'border:1px solid rgba(99,102,241,0.3);' : '') + ';cursor:pointer;" onclick="VstepView.navigateToWrongAnswer(\'' + item.skill + '\', ' + item.index + ')">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">' +
        '<span style="font-size:0.75rem;color:var(--text-muted);">' + dateStr + ' • ' + item.skillLabel + locationInfo + (wa.reviewCount > 0 ? ' • Ôn ' + wa.reviewCount + ' lần' : '') + '</span>' +
        '<span style="font-size:0.75rem;padding:0.2rem 0.5rem;background:rgba(239,68,68,0.1);color:#ef4444;border-radius:4px;">' + categoryLabel + '</span>' +
        '</div>' +
        '<div style="font-size:0.9rem;color:var(--text-primary);margin-bottom:0.5rem;line-height:1.5;">' + questionText.substring(0, 150) + (questionText.length > 150 ? '...' : '') + '</div>' +
        '<div style="display:flex;gap:1rem;font-size:0.85rem;align-items:center;">' +
        '<div><span style="color:var(--text-muted);">Bạn chọn:</span> <span style="color:#ef4444;">' + userAns + '</span></div>' +
        '<div><span style="color:var(--text-muted);">Đáp án đúng:</span> <span style="color:#10b981;font-weight:600;">' + correctAns + '</span></div>' +
        reviewButton +
        '</div>' +
        '</div>';
    }).join('');
    
    var contentHtml = isCollapsed ? '' : (dueReviewHtml + '<div style="margin-bottom:1rem;">' + categoryStatsHtml + '</div>' +
      '<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">Hiển thị 20 câu sai gần nhất (tổng: ' + allWrongAnswers.length + ')</p>' +
      wrongAnswersHtml);
    
    return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">' +
      '<h3 style="font-size:1.1rem;margin:0;">📓 Sổ tay câu sai</h3>' +
      '<button onclick="VstepView.toggleWrongAnswerNotebook()" style="padding:0.4rem 0.8rem;background:var(--bg-input);border:1px solid var(--border-color);border-radius:6px;font-size:0.85rem;cursor:pointer;color:var(--text-muted);">' +
      (isCollapsed ? '📂 Mở rộng' : '📁 Thu gọn') +
      '</button>' +
      '</div>' +
      contentHtml +
      '</div>';
  },

  /* ---------- Render performance chart ---------- */
  renderPerformanceChart: function () {
    var radarChart = this.renderSkillRadarChart();
    var skills = ["reading", "listening", "writing", "speaking"];
    var skillLabels = { reading: "Đọc", listening: "Nghe", writing: "Viết", speaking: "Nói" };
    var skillColors = { reading: "#6366f1", listening: "#8b5cf6", writing: "#f59e0b", speaking: "#10b981" };
    
    // Collect all dates and prepare data for line chart
    // Normalize to "DD/MM" so sorting/display never depends on locale
    var allDates = {};
    var skillData = {};

    skills.forEach(function (skill) {
      var history = VstepView.performanceHistory[skill] || [];
      skillData[skill] = [];
      history.forEach(function (r) {
        var d = new Date(r.date);
        if (isNaN(d.getTime())) return;
        var dateStr = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
        allDates[dateStr] = true;
        skillData[skill].push({ date: dateStr, percentage: r.percentage });
      });
    });

    var sortedDates = Object.keys(allDates).sort(function (a, b) {
      var partsA = a.split(/[\/\-]/);
      var partsB = b.split(/[\/\-]/);
      return new Date(2000, parseInt(partsA[1], 10) - 1, parseInt(partsA[0], 10)) -
             new Date(2000, parseInt(partsB[1], 10) - 1, parseInt(partsB[0], 10));
    });
    
    // Take last 10 dates
    var displayDates = sortedDates.slice(-10);
    // Avoid division by zero when only one date has data (single-point chart)
    var xStepDenominator = Math.max(1, displayDates.length - 1);
    
    if (displayDates.length === 0) {
      return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;">' +
        '<h3 style="font-size:1.1rem;margin-bottom:1rem;">📊 Biểu đồ tiến độ</h3>' +
        '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Chưa có dữ liệu</p>' +
        '</div>' + radarChart;
    }
    
    // Build line chart HTML
    var chartWidth = 800;
    var chartHeight = 300;
    var padding = { top: 20, right: 30, bottom: 40, left: 40 };
    var plotWidth = chartWidth - padding.left - padding.right;
    var plotHeight = chartHeight - padding.top - padding.bottom;
    
    // Create data points for each skill
    var linesHtml = '';
    var legendHtml = '';
    
    skills.forEach(function (skill) {
      var history = skillData[skill] || [];
      var dataPoints = displayDates.map(function (date) {
        var match = history.find(function (h) { return h.date === date; });
        return match ? match.percentage : null;
      });
      
      // Draw line (carry last value forward on days without activity so the
      // line runs horizontally instead of breaking at gaps)
      var points = '';
      var hasData = false;
      var lastValue = null;
      dataPoints.forEach(function (value, idx) {
        if (value === null) value = lastValue;
        if (value !== null) {
          hasData = true;
          lastValue = value;
          var x = padding.left + (idx / xStepDenominator) * plotWidth;
          var y = padding.top + plotHeight - (value / 100) * plotHeight;
          points += x + ',' + y + ' ';
        }
      });
      
      if (hasData && points) {
        linesHtml += '<polyline points="' + points.trim() + '" fill="none" stroke="' + skillColors[skill] + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
        
        // Draw points
        dataPoints.forEach(function (value, idx) {
          if (value !== null) {
            var x = padding.left + (idx / xStepDenominator) * plotWidth;
            var y = padding.top + plotHeight - (value / 100) * plotHeight;
            linesHtml += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + skillColors[skill] + '" stroke="white" stroke-width="2"/>';
          }
        });
      }
      
      // Add to legend
      var avgPercentage = history.length > 0 ? Math.round(history.reduce(function (sum, r) { return sum + r.percentage; }, 0) / history.length) : 0;
      var latestPercentage = history.length > 0 ? history[history.length - 1].percentage : 0;
      legendHtml += '<div style="display:flex;align-items:center;gap:0.5rem;margin-right:1.5rem;">' +
        '<div style="width:12px;height:12px;background:' + skillColors[skill] + ';border-radius:50%;"></div>' +
        '<span style="font-size:0.85rem;color:var(--text-muted);">' + skillLabels[skill] + ': ' + latestPercentage + '% (TB: ' + avgPercentage + '%)</span>' +
        '</div>';
    });
    
    // Draw grid lines
    var gridLines = '';
    for (var i = 0; i <= 5; i++) {
      var y = padding.top + (i / 5) * plotHeight;
      gridLines += '<line x1="' + padding.left + '" y1="' + y + '" x2="' + (padding.left + plotWidth) + '" y2="' + y + '" stroke="var(--border-color)" stroke-width="1" opacity="0.3"/>';
      gridLines += '<text x="' + (padding.left - 10) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="var(--text-muted)">' + (100 - i * 20) + '</text>';
    }
    
    // Draw x-axis labels
    var xLabels = '';
    displayDates.forEach(function (date, idx) {
      var x = padding.left + (idx / xStepDenominator) * plotWidth;
      xLabels += '<text x="' + x + '" y="' + (chartHeight - 10) + '" text-anchor="middle" font-size="11" fill="var(--text-muted)">' + date + '</text>';
    });
    
    var chartHtml = '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;">' +
      '<h3 style="font-size:1.1rem;margin-bottom:1rem;">📊 Biểu đồ tiến độ</h3>' +
      '<div style="margin-bottom:1rem;display:flex;flex-wrap:wrap;align-items:center;">' + legendHtml + '</div>' +
      '<svg width="100%" height="' + chartHeight + '" viewBox="0 0 ' + chartWidth + ' ' + chartHeight + '" style="max-width:100%;overflow:visible;">' +
      gridLines +
      linesHtml +
      xLabels +
      '</svg>' +
      '</div>';
    
    return chartHtml + radarChart;
  },

  /* ---------- Render skill radar chart ---------- */
  renderSkillRadarChart: function () {
    var skills = ["reading", "listening", "writing", "speaking"];
    var skillLabels = { reading: "Đọc", listening: "Nghe", writing: "Viết", speaking: "Nói" };
    var skillColors = { reading: "#6366f1", listening: "#8b5cf6", writing: "#f59e0b", speaking: "#10b981" };
    
    var skillScores = skills.map(function (skill) {
      var history = VstepView.performanceHistory[skill] || [];
      if (history.length === 0) return 0;
      var avg = Math.round(history.reduce(function (sum, r) { return sum + r.percentage; }, 0) / history.length);
      return avg;
    });
    
    var hasData = skillScores.some(function (s) { return s > 0; });
    
    if (!hasData) {
      return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;">' +
        '<h3 style="font-size:1.1rem;margin-bottom:1rem;">🎯 Biểu đồ kỹ năng</h3>' +
        '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Hoàn thành bài tập để xem biểu đồ kỹ năng của bạn</p>' +
        '</div>';
    }
    
    var size = 200;
    var center = size / 2;
    var radius = size / 2 - 30;
    var angleStep = (Math.PI * 2) / skills.length;
    
    var gridLines = '';
    for (var i = 1; i <= 5; i++) {
      var r = (radius / 5) * i;
      var points = skills.map(function (_, idx) {
        var angle = idx * angleStep - Math.PI / 2;
        var x = center + r * Math.cos(angle);
        var y = center + r * Math.sin(angle);
        return x + ',' + y;
      }).join(' ');
      gridLines += '<polygon points="' + points + '" fill="none" stroke="var(--border-color)" stroke-width="1" opacity="0.5"/>';
    }
    
    var axisLines = skills.map(function (_, idx) {
      var angle = idx * angleStep - Math.PI / 2;
      var x = center + radius * Math.cos(angle);
      var y = center + radius * Math.sin(angle);
      return '<line x1="' + center + '" y1="' + center + '" x2="' + x + '" y2="' + y + '" stroke="var(--border-color)" stroke-width="1" opacity="0.5"/>';
    }).join('');
    
    var dataPoints = skillScores.map(function (score, idx) {
      var angle = idx * angleStep - Math.PI / 2;
      var r = (radius * score) / 100;
      var x = center + r * Math.cos(angle);
      var y = center + r * Math.sin(angle);
      return x + ',' + y;
    }).join(' ');
    
    var dataPolygon = '<polygon points="' + dataPoints + '" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" stroke-width="2"/>';
    
    var dataDots = skillScores.map(function (score, idx) {
      var angle = idx * angleStep - Math.PI / 2;
      var r = (radius * score) / 100;
      var x = center + r * Math.cos(angle);
      var y = center + r * Math.sin(angle);
      return '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + skillColors[skills[idx]] + '"/>';
    }).join('');
    
    var labels = skills.map(function (skill, idx) {
      var angle = idx * angleStep - Math.PI / 2;
      var labelRadius = radius + 20;
      var x = center + labelRadius * Math.cos(angle);
      var y = center + labelRadius * Math.sin(angle);
      var score = skillScores[idx];
      return '<text x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="var(--text-primary)">' +
        skillLabels[skill] + ' (' + score + '%)</text>';
    }).join('');
    
    return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;">' +
      '<h3 style="font-size:1.1rem;margin-bottom:1rem;">🎯 Biểu đồ kỹ năng</h3>' +
      '<div style="display:flex;justify-content:center;align-items:center;gap:2rem;flex-wrap:wrap;">' +
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
      gridLines + axisLines + dataPolygon + dataDots + labels +
      '</svg>' +
      '<div style="flex:1;min-width:200px;">' +
      '<p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;">Đánh giá tổng quan 4 kỹ năng:</p>' +
      skills.map(function (skill, idx) {
        var score = skillScores[idx];
        var barWidth = score + '%';
        var barColor = skillColors[skill];
        return '<div style="margin-bottom:0.75rem;">' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;">' +
          '<span style="font-size:0.85rem;color:var(--text-primary);">' + skillLabels[skill] + '</span>' +
          '<span style="font-size:0.85rem;font-weight:600;color:' + barColor + ';">' + score + '%</span>' +
          '</div>' +
          '<div style="height:8px;background:var(--bg-input);border-radius:4px;overflow:hidden;">' +
          '<div style="height:100%;width:' + barWidth + ';background:' + barColor + ';border-radius:4px;transition:width 0.3s ease;"></div>' +
          '</div>' +
          '</div>';
      }).join('') +
      '</div>' +
      '</div>' +
      '</div>' + this.renderWeaknessAnalysis(skillScores, skillLabels, skillColors);
  },

  /* ---------- Render weakness analysis ---------- */
  renderWeaknessAnalysis: function (skillScores, skillLabels, skillColors) {
    var skills = ["reading", "listening", "writing", "speaking"];
    var weakSkills = skills.filter(function (skill, idx) {
      return skillScores[idx] > 0 && skillScores[idx] < 60;
    });
    
    if (weakSkills.length === 0) {
      return '';
    }
    
    var recommendations = {
      reading: {
        title: "Cải thiện kỹ năng Đọc",
        tips: [
          "Tập trung vào từ vựng học thuật và cấu trúc câu phức tạp",
          "Luyện đọc hiểu các đoạn văn dài và phân tích ý chính",
          "Thực hành tìm kiếm thông tin cụ thể trong bài đọc",
          "Đọc các bài báo tiếng Anh chuyên ngành hàng ngày"
        ]
      },
      listening: {
        title: "Cải thiện kỹ năng Nghe",
        tips: [
          "Nghe podcast và video tiếng Anh mỗi ngày",
          "Luyện nghe với tốc độ khác nhau (chậm/nhanh)",
          "Tập trung nghe từ khóa và ý chính",
          "Thực hành nghe chép chính tả để cải thiện nghe chi tiết"
        ]
      },
      writing: {
        title: "Cải thiện kỹ năng Viết",
        tips: [
          "Học cấu trúc bài viết (Introduction, Body, Conclusion)",
          "Mở rộng từ vựng và sử dụng từ đồng nghĩa",
          "Luyện viết các câu phức và liên kết câu",
          "Đọc và phân tích các bài mẫu chất lượng cao"
        ]
      },
      speaking: {
        title: "Cải thiện kỹ năng Nói",
        tips: [
          "Thực hành nói to và ghi âm để tự nghe lại",
          "Mở rộng chủ đề nói chuyện và từ vựng",
          "Luyện phát âm và ngữ điệu",
          "Tham gia các cuộc hội thoại tiếng Anh"
        ]
      }
    };
    
    var weaknessHtml = weakSkills.map(function (skill) {
      var idx = skills.indexOf(skill);
      var rec = recommendations[skill];
      return '<div style="background:rgba(239,68,68,0.05);border-left:4px solid #ef4444;border-radius:8px;padding:1rem;margin-bottom:0.75rem;">' +
        '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">' +
        '<span style="font-size:1.2rem;">⚠️</span>' +
        '<h4 style="font-size:0.95rem;font-weight:700;margin:0;color:#ef4444;">' + rec.title + ' (' + skillScores[idx] + '%)</h4>' +
        '</div>' +
        '<ul style="margin:0;padding-left:1.25rem;font-size:0.85rem;color:var(--text-muted);line-height:1.6;">' +
        rec.tips.map(function (tip) {
          return '<li>' + tip + '</li>';
        }).join('') +
        '</ul>' +
        '</div>';
    }).join('');
    
    return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;border-color:rgba(239,68,68,0.2);">' +
      '<h3 style="font-size:1.1rem;margin-bottom:1rem;color:#ef4444;">🔍 Phân tích điểm yếu</h3>' +
      '<p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;">Dựa trên kết quả của bạn, các kỹ năng sau cần cải thiện:</p>' +
      weaknessHtml +
      '</div>';
  },

  /* ---------- Render time management analysis ---------- */
  renderTimeManagementAnalysis: function (section) {
    var sectionData = section === "reading" ? this.reading : this.listening;
    var questionTimes = sectionData.questionTimes || {};
    var timeEntries = Object.keys(questionTimes);
    
    if (timeEntries.length === 0) {
      return '';
    }
    
    var totalTime = 0;
    var timesArray = timeEntries.map(function (key) {
      var t = questionTimes[key];
      var duration = t.end && t.start ? (t.end - t.start) / 1000 : 0;
      totalTime += duration;
      return { key: key, duration: duration };
    });
    
    var avgTime = totalTime / timesArray.length;
    var maxTime = Math.max.apply(Math, timesArray.map(function (t) { return t.duration; }));
    var minTime = Math.min.apply(Math, timesArray.map(function (t) { return t.duration; }));
    
    var slowQuestions = timesArray.filter(function (t) { return t.duration > avgTime * 1.5; });
    var fastQuestions = timesArray.filter(function (t) { return t.duration < avgTime * 0.5 && t.duration > 0; });
    
    var analysisHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;margin-bottom:1rem;">' +
      '<div style="text-align:center;padding:1rem;background:var(--bg-input);border-radius:8px;">' +
      '<div style="font-size:1rem;font-weight:700;color:var(--primary);">' + Math.round(avgTime) + 's</div>' +
      '<div style="font-size:0.8rem;color:var(--text-muted);">Trung bình/câu</div>' +
      '</div>' +
      '<div style="text-align:center;padding:1rem;background:var(--bg-input);border-radius:8px;">' +
      '<div style="font-size:1rem;font-weight:700;color:var(--secondary);">' + Math.round(maxTime) + 's</div>' +
      '<div style="font-size:0.8rem;color:var(--text-muted);">Lâu nhất</div>' +
      '</div>' +
      '<div style="text-align:center;padding:1rem;background:var(--bg-input);border-radius:8px;">' +
      '<div style="font-size:1rem;font-weight:700;color:var(--accent);">' + Math.round(minTime) + 's</div>' +
      '<div style="font-size:0.8rem;color:var(--text-muted);">Nhanh nhất</div>' +
      '</div>' +
      '<div style="text-align:center;padding:1rem;background:var(--bg-input);border-radius:8px;">' +
      '<div style="font-size:1rem;font-weight:700;color:#10b981;">' + Math.round(totalTime / 60) + 'p</div>' +
      '<div style="font-size:0.8rem;color:var(--text-muted);">Tổng thời gian</div>' +
      '</div>' +
      '</div>';
    
    var tipsHtml = '';
    if (slowQuestions.length > 0) {
      tipsHtml += '<div style="background:rgba(245,158,11,0.05);border-left:4px solid #f59e0b;border-radius:8px;padding:0.75rem;margin-bottom:0.5rem;">' +
        '<div style="font-size:0.85rem;color:var(--text-muted);">⏱️ <strong>' + slowQuestions.length + ' câu</strong> mất nhiều thời gian hơn trung bình (> ' + Math.round(avgTime * 1.5) + 's). Hãy luyện tập đọc nhanh hơn.</div>' +
        '</div>';
    }
    if (fastQuestions.length > 0) {
      tipsHtml += '<div style="background:rgba(16,185,129,0.05);border-left:4px solid #10b981;border-radius:8px;padding:0.75rem;margin-bottom:0.5rem;">' +
        '<div style="font-size:0.85rem;color:var(--text-muted);">⚡ <strong>' + fastQuestions.length + ' câu</strong> được làm rất nhanh (< ' + Math.round(avgTime * 0.5) + 's). Kiểm tra lại kỹ xem có cần đọc kỹ hơn không.</div>' +
        '</div>';
    }
    
    return '<div class="glass-card" style="margin-bottom:1rem;padding:1.5rem;border-color:rgba(99,102,241,0.2);">' +
      '<h3 style="font-size:1.1rem;margin-bottom:1rem;">⏱️ Phân tích thời gian</h3>' +
      analysisHtml +
      (tipsHtml || '<p style="font-size:0.85rem;color:var(--text-muted);text-align:center;padding:1rem;">Thời gian làm bài đều đặn</p>') +
      '</div>';
  },

  /* ---------- Save last test position for Continue Learning ---------- */
  saveTestPosition: function () {
    var s = this.currentSection;
    if (s === "reading") {
      var r = this.reading;
      var cat = VstepReadingData.categories[r.currentCategory];
      var test = cat.tests[r.currentTest];
      var firstGi = this._getReadingGlobalQuestionIndex(r.currentCategory, r.currentTest, 0);
      var lastGi = firstGi + test.questions.length - 1;
      var answeredCount = Object.keys(r.answers).filter(function (k) {
        var gi = parseInt(k, 10);
        return gi >= firstGi && gi <= lastGi;
      }).length;
      var totalQ = test.questions.length;
      var pos = {
        section: "reading",
        catIdx: r.currentCategory,
        testIdx: r.currentTest,
        answers: JSON.parse(JSON.stringify(r.answers)),
        label: cat.title + " - " + test.title,
        qProgress: answeredCount + "/" + totalQ,
        timestamp: new Date().toISOString()
      };
      StorageManager.setVstepLastTestPosition(pos);
    } else if (s === "listening") {
      var l = this.listening;
      var part = VstepListeningData.parts[l.currentPart];
      var ex = part.exercises[l.currentExercise];
      var firstGi2 = this._getListeningGlobalQuestionIndex(l.currentPart, l.currentExercise, 0);
      var lastGi2 = firstGi2 + ex.questions.length - 1;
      var answeredCount2 = Object.keys(l.answers).filter(function (k) {
        var gi = parseInt(k, 10);
        return gi >= firstGi2 && gi <= lastGi2;
      }).length;
      var totalQ2 = ex.questions.length;
      var pos2 = {
        section: "listening",
        partIdx: l.currentPart,
        exIdx: l.currentExercise,
        answers: JSON.parse(JSON.stringify(l.answers)),
        label: "Part " + (l.currentPart + 1) + " - " + ex.label,
        qProgress: answeredCount2 + "/" + totalQ2,
        timestamp: new Date().toISOString()
      };
      StorageManager.setVstepLastTestPosition(pos2);
    }
  },

  /* ---------- Get saved test position for Continue Learning ---------- */
  getTestPosition: function () {
    try {
      var d = StorageManager.getVstepLastTestPosition();
      if (!d || !d.section) return null;
      return d;
    } catch (e) { return null; }
  },

  /* ---------- Restore a saved test position (called from Continue Learning) ---------- */
  loadTestPosition: function (pos) {
    if (!pos) pos = this.getTestPosition();
    if (!pos) return;
    if (pos.section === "reading") {
      this.currentSection = "reading";
      this.reading.currentCategory = pos.catIdx || 0;
      this.reading.currentTest = pos.testIdx || 0;
      this.reading.answers = pos.answers || {};
      this.reading.submitted = false;
    } else if (pos.section === "listening") {
      this.currentSection = "listening";
      this.listening.currentPart = pos.partIdx || 0;
      this.listening.currentExercise = pos.exIdx || 0;
      this.listening.answers = pos.answers || {};
      this.listening.submitted = false;
    }
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection(pos.section);
    this.saveTestPosition();
    this.saveState();
  },

  scrollToLastAnswered: function () {
    var s = this.currentSection === "reading" ? this.reading : this.listening;
    var answers = s.answers || {};
    var allAnswers = s.allAnswers || {};
    
    // Get all answered question indices
    var answeredIndices = [];
    Object.keys(answers).forEach(function (key) {
      answeredIndices.push(parseInt(key));
    });
    
    // Also check allAnswers for reading section
    if (this.currentSection === "reading" && allAnswers) {
      Object.keys(allAnswers).forEach(function (testId) {
        Object.keys(allAnswers[testId]).forEach(function (key) {
          answeredIndices.push(parseInt(key));
        });
      });
    }
    
    if (answeredIndices.length === 0) return;
    
    // Find the last answered question
    var lastIndex = Math.max.apply(Math, answeredIndices);
    
    // Find the question element and scroll to it
    var questionEl = document.querySelector('[data-question-index="' + lastIndex + '"]');
    if (questionEl) {
      questionEl.scrollIntoView({ behavior: "smooth", block: "center" });
      // Highlight the question briefly
      questionEl.style.transition = "background 0.3s ease";
      var originalBg = questionEl.style.background;
      questionEl.style.background = "rgba(99, 102, 241, 0.15)";
      setTimeout(function () {
        questionEl.style.background = originalBg;
      }, 1000);
    }
  },

  toggleReadingAnswer: function (gi, oi, event) {
    // Prevent default behavior and event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    var s = this.reading;
    if (s.submitted) return;
    
    // Track question timing
    var now = Date.now();
    if (!s.questionTimes[gi]) {
      s.questionTimes[gi] = { start: now, end: null };
    }
    s.questionTimes[gi].end = now;
    
    if (s.answers[gi] === oi) {
      delete s.answers[gi];
    } else {
      s.answers[gi] = oi;
    }
    
    // Save to allAnswers for persistence across test switches
    var testId = this.reading.currentCategory + "_" + this.reading.currentTest;
    if (!this.reading.allAnswers) this.reading.allAnswers = {};
    this.reading.allAnswers[testId] = JSON.parse(JSON.stringify(this.reading.answers));
    
    // Save state to localStorage WITHOUT triggering cross-tab sync
    // Use direct localStorage.setItem to avoid vstep-data-changed event
    try {
      localStorage.setItem('vstep_vstep_full_state', JSON.stringify({
        reading: this.reading,
        listening: this.listening,
        writing: this.writing,
        speaking: this.speaking,
        currentSection: this.currentSection,
        performanceHistory: this.performanceHistory
      }));
    } catch (e) {
      console.error("Error saving state:", e);
    }
    
    // Don't call saveState/saveTestPosition here to avoid potential re-render triggers
    // These will be called when switching tests/categories

    // Minimal DOM update - just toggle class for visual feedback
    var choiceId = 'r' + gi + '-opt' + oi;
    var choiceEl = document.getElementById(choiceId);
    if (choiceEl) {
      var questionEl = choiceEl.closest('.vstep-question-card');
      if (questionEl) {
        var allChoices = questionEl.querySelectorAll('.vstep-choice-item');
        allChoices.forEach(function(c) {
          c.classList.remove('selected');
        });
      }
      if (s.answers[gi] === oi) {
        choiceEl.classList.add('selected');
      }
    }
    
    return false;
  },

  submitReadingTest: function () {
    var s = this.reading;
    var cat = VstepReadingData.categories[s.currentCategory];
    var test = cat.tests[s.currentTest];
    var score = 0;
    test.questions.forEach(function (q, qi) {
      var gi = VstepView._getReadingGlobalQuestionIndex(
        s.currentCategory,
        s.currentTest,
        qi,
      );
      if (s.answers[gi] === q.correct) score++;
      else {
        // Record wrong answer
        VstepView.recordWrongAnswer("reading", q, s.answers[gi], q.correct, {
          category: s.currentCategory,
          test: s.currentTest
        });
      }
    });
    s.submitted = true;
    App.addXp(score * 10);
    
    // Save to completedTests
    if (!s.completedTests) s.completedTests = {};
    var testId = s.currentCategory + "_" + s.currentTest;
    s.completedTests[testId] = {
      answers: JSON.parse(JSON.stringify(s.answers)),
      submitted: true,
      score: score,
      total: test.questions.length,
      timestamp: new Date().toISOString()
    };
    
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      // Save scroll positions of both panels (not just the workspace container)
      var passagePanel = ws.querySelector('.vstep-passage-panel');
      var questionsPanel = ws.querySelector('.vstep-questions-panel');
      var passageScrollTop = passagePanel ? passagePanel.scrollTop : 0;
      var questionsScrollTop = questionsPanel ? questionsPanel.scrollTop : 0;

      ws.innerHTML = this.renderSection("reading");

      // Restore scroll positions of the re-created panels
      requestAnimationFrame(function() {
        var newPassage = ws.querySelector('.vstep-passage-panel');
        var newQuestions = ws.querySelector('.vstep-questions-panel');
        if (newPassage) newPassage.scrollTop = passageScrollTop;
        if (newQuestions) newQuestions.scrollTop = questionsScrollTop;
      });
    }
    
    // Show break reminder
    this.showBreakReminder("Đọc", score, test.questions.length);
    
    // Record performance
    this.recordPerformance("reading", score, test.questions.length);
  },

  resetReading: function () {
    var completedTests = this.reading.completedTests || {};
    this.reading = {
      currentCategory: this.reading.currentCategory,
      currentTest: 0,
      answers: {},
      submitted: false,
      questionTimes: {},
      completedTests: completedTests,
    };
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      // Reset scroll to top when resetting (expected behavior)
      ws.scrollTop = 0;
      ws.innerHTML = this.renderSection("reading");
    }
  },

  resetCurrentReadingTest: function () {
    var s = this.reading;
    var cat = VstepReadingData.categories[s.currentCategory];
    var test = cat.tests[s.currentTest];
    
    // Save current test results before resetting
    var testId = s.currentCategory + "_" + s.currentTest;
    var currentAnswers = {};
    test.questions.forEach(function (q, qi) {
      var gi = VstepView._getReadingGlobalQuestionIndex(
        s.currentCategory,
        s.currentTest,
        qi,
      );
      if (s.answers[gi] !== undefined) {
        currentAnswers[gi] = s.answers[gi];
      }
    });
    
    // Store completed test results
    if (!s.completedTests) s.completedTests = {};
    s.completedTests[testId] = {
      answers: currentAnswers,
      submitted: s.submitted,
      timestamp: new Date().toISOString()
    };
    
    // Clear answers only for current test
    test.questions.forEach(function (q, qi) {
      var gi = VstepView._getReadingGlobalQuestionIndex(
        s.currentCategory,
        s.currentTest,
        qi,
      );
      delete s.answers[gi];
    });
    
    // FIX: Also clear allAnswers to prevent stale data
    if (s.allAnswers) {
      delete s.allAnswers[testId];
    }
    
    s.submitted = false;
    this.saveState();
    
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      ws.scrollTop = 0;
      ws.innerHTML = this.renderSection("reading");
    }
  },

  // ------------------------------------------------------------------
  // LISTENING SECTION (rewritten for exercise-based data)
  // ------------------------------------------------------------------
  _getListeningTotalExercises: function () {
    var total = 0;
    VstepListeningData.parts.forEach(function (p) {
      total += p.exercises.length;
    });
    return total;
  },
  _getListeningTotalQuestions: function () {
    var total = 0;
    VstepListeningData.parts.forEach(function (p) {
      p.exercises.forEach(function (e) {
        total += e.questions.length;
      });
    });
    return total;
  },
  _getListeningGlobalQuestionIndex: function (partIdx, exIdx, qIdx) {
    var gi = 0;
    for (var p = 0; p < partIdx; p++) {
      for (var e = 0; e < VstepListeningData.parts[p].exercises.length; e++) {
        gi += VstepListeningData.parts[p].exercises[e].questions.length;
      }
    }
    for (var e2 = 0; e2 < exIdx; e2++) {
      gi += VstepListeningData.parts[partIdx].exercises[e2].questions.length;
    }
    gi += qIdx;
    return gi;
  },

  renderListeningSection: function () {
    var data = VstepListeningData;
    var s = this.listening;
    var part = data.parts[s.currentPart];
    var ex = part.exercises[s.currentExercise];
    if (!ex) {
      s.currentExercise = 0;
      ex = part.exercises[0];
    }
    console.log(
      "[VstepPrep] currentPart=" +
        s.currentPart +
        " ex.audio=" +
        (ex && ex.audio) +
        " ex.label=" +
        (ex && ex.label),
    );
    var totalQs = this._getListeningTotalQuestions();
    // Count answered questions from allAnswers for persistence across exercise switches
    var allAnswers = s.allAnswers || {};
    var answeredCount = 0;
    Object.keys(allAnswers).forEach(function (exerciseId) {
      answeredCount += Object.keys(allAnswers[exerciseId]).length;
    });
    var progressPct =
      totalQs > 0 ? ((answeredCount / totalQs) * 100).toFixed(0) : 0;

    var modeTabsHtml = [
      { id: "test", label: "📝 Làm bài Test" },
      { id: "shadowing", label: "🎙️ Luyện Shadowing" }
    ].map(function (m) {
      var cls = s.mode === m.id ? "btn btn-accent" : "btn btn-secondary";
      return '<button class="' + cls + '" style="font-size:0.8rem;padding:0.4rem 0.8rem;" onclick="VstepView.setListeningMode(\'' + m.id + '\')">' + m.label + '</button>';
    }).join("");

    var partButtonsHtml = data.parts
      .map(function (p, pi) {
        var isActive = pi === s.currentPart;
        return (
          '<button class="vstep-cat-btn' + (isActive ? ' is-active' : '') + '" onclick="VstepView.setListeningPart(' +
          pi +
          ')" aria-pressed="' + isActive + '">' +
          p.title.replace(/\(.*\)/, "").trim() +
          "</button>"
        );
      })
      .join("");

    var exCountLabel = part.exercises.length + ' b\u00e0i';
    var exButtonsInner = part.exercises
      .map(function (e, ei) {
        var isActive = ei === s.currentExercise;
        var exAnswered = e.questions.filter(function (q, qi) {
          var gi = VstepView._getListeningGlobalQuestionIndex(
            s.currentPart,
            ei,
            qi,
          );
          var exerciseIdForCheck = s.currentPart + "_" + ei;
          var allAnswers = s.allAnswers || {};
          var exerciseAnswers = allAnswers[exerciseIdForCheck] || {};
          return exerciseAnswers[gi] !== undefined;
        }).length;
        var exerciseId = s.currentPart + "_" + ei;
        var isCompleted = s.completedExercises && s.completedExercises[exerciseId] && s.completedExercises[exerciseId].submitted;
        var statusClass = isCompleted ? ' is-done' : exAnswered > 0 ? ' is-progress' : '';
        var statusText = isCompleted ? '\u2713 ' + (s.completedExercises[exerciseId].score || '?') + '/' + e.questions.length : exAnswered > 0 ? exAnswered + '/' + e.questions.length : 'Ch\u01b0a l\u00e0m';
        return (
          '<button class="vstep-test-btn' + (isActive ? ' is-active' : '') + statusClass + '" onclick="VstepView.setListeningExercise(' +
          ei +
          ')">' + (ei + 1) +
          '<span class="vstep-test-status">' + statusText + '</span></button>'
        );
      })
      .join("");
    var exButtonsHtml =
      '<div class="vstep-test-expand is-collapsed" id="listening-test-expand">' +
      '<button class="vstep-test-expand-header" onclick="VstepView.toggleTestExpand(\'listening\')" aria-expanded="false">' +
      '<span>\uD83C\uDFB5 Ch\u1ecDn b\u00e0i \u2014 ' + exCountLabel + '</span>' +
      '<span class="vstep-expand-icon">\u25BE</span>' +
      '</button>' +
      '<div class="vstep-test-grid vstep-test-grid--compact is-collapsed" id="listening-test-grid">' + exButtonsInner + '</div></div>';

    var isShadowing = s.mode === "shadowing";
    var statsBannerHtml = "";
    var sentencesHtml = "";

    if (isShadowing) {
      var sentences = this._parseListeningSentences(ex);
      if (s.shadowingIndex >= sentences.length) s.shadowingIndex = 0;

      var practicedCount = 0;
      var totalAccuracy = 0;
      var currentPrefix = s.currentPart + "_" + s.currentExercise + "_";

      sentences.forEach(function (sent, idx) {
        var key = currentPrefix + idx;
        var res = s.shadowingResults[key];
        if (res && res.practiced) {
          practicedCount++;
          totalAccuracy += res.accuracy;
        }
      });

      var avgAccuracy = practicedCount > 0 ? Math.round(totalAccuracy / practicedCount) : 0;

      // Calculate shadowing progress across all exercises
      var totalShadowingSentences = 0;
      var totalPracticedSentences = 0;
      var currentPrefixBase = s.currentPart + "_";
      part.exercises.forEach(function (exercise, exIdx) {
        var exSentences = VstepView._parseListeningSentences(exercise);
        totalShadowingSentences += exSentences.length;
        var exPrefix = s.currentPart + "_" + exIdx + "_";
        exSentences.forEach(function (sent, sentIdx) {
          var key = exPrefix + sentIdx;
          if (s.shadowingResults[key] && s.shadowingResults[key].practiced) {
            totalPracticedSentences++;
          }
        });
      });
      var shadowingProgressPct = totalShadowingSentences > 0 ? Math.round((totalPracticedSentences / totalShadowingSentences) * 100) : 0;

      statsBannerHtml =
        '<div class="shadowing-stats-banner" style="display:flex;align-items:center;justify-content:space-between;padding:1rem;background:linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.08) 100%);border-radius:12px;margin-bottom:1rem;border:1px solid var(--border-color); flex-wrap: wrap; gap: 1rem;">' +
        '  <div style="display:flex;align-items:center;gap:1.5rem;">' +
        '    <div>' +
        '      <span style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;font-weight:600;letter-spacing:0.04em;">Tiến độ bài hiện tại</span>' +
        '      <h4 style="font-size:1.1rem;font-weight:700;margin-top:0.15rem;color:var(--text-primary);">' + practicedCount + ' / ' + sentences.length + ' câu</h4>' +
        '    </div>' +
        '    <div>' +
        '      <span style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;font-weight:600;letter-spacing:0.04em;">Độ chính xác TB</span>' +
        '      <h4 style="font-size:1.1rem;font-weight:700;margin-top:0.15rem;color:var(--accent);">' + avgAccuracy + '%</h4>' +
        '    </div>' +
        '  </div>' +
        '  <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.8rem;" onclick="VstepView.resetShadowingProgress()">Luyện lại từ đầu</button>' +
        '</div>' +
        '<div style="margin-bottom:1rem;padding:0.75rem;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid var(--border-color);">' +
        '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">' +
        '    <span style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;font-weight:600;letter-spacing:0.04em;">Tiến độ toàn Part ' + (s.currentPart + 1) + '</span>' +
        '    <span style="font-size:0.75rem;color:var(--accent);font-weight:700;">' + totalPracticedSentences + ' / ' + totalShadowingSentences + ' câu (' + shadowingProgressPct + '%)</span>' +
        '  </div>' +
        '  <div style="height:4px;background:var(--bg-input);border-radius:9999px;overflow:hidden;">' +
        '    <div style="height:100%;width:' + shadowingProgressPct + '%;background:var(--accent);border-radius:9999px;transition:width 0.3s ease;"></div>' +
        '  </div>' +
        '</div>';

      sentencesHtml = sentences.map(function (sent, idx) {
        var isActive = idx === s.shadowingIndex;
        var key = currentPrefix + idx;
        var res = s.shadowingResults[key] || { practiced: false, accuracy: 0, transcript: "", audioUrl: "", translation: "" };

        var speakerBadge = sent.speaker
          ? '<span class="badge" style="background:rgba(99,102,241,0.15);color:var(--primary);font-size:0.75rem;padding:0.15rem 0.5rem;border-radius:4px;font-weight:600;margin-right:0.5rem;display:inline-block;">' + sent.speaker + '</span>'
          : '';

        var scoreBadge = res.practiced
          ? '<span class="badge" style="background:rgba(16,185,129,0.15);color:var(--accent);font-size:0.75rem;padding:0.15rem 0.5rem;border-radius:4px;font-weight:600;margin-left:auto;">' + res.accuracy + '%</span>'
          : '<span class="badge" style="background:rgba(255,255,255,0.05);color:var(--text-muted);font-size:0.75rem;padding:0.15rem 0.5rem;border-radius:4px;margin-left:auto;">Chưa tập</span>';

var content = '';
        if (isActive) {
          var escapedText = sent.text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          var playSampleBtn = '<button class="btn btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.8rem;display:inline-flex;align-items:center;gap:0.35rem;" onclick="VstepView.speakShadowingSample(' + idx + ')"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg> Nghe mẫu</button>';

          var translateBtn = '<button class="btn btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.8rem;display:inline-flex;align-items:center;gap:0.35rem;" onclick="VstepView.translateShadowingSentence(' + idx + ')"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> ' + (res.translation ? "Ẩn dịch nghĩa" : "Dịch câu") + '</button>';

          var micClass = s.shadowingRecording ? "recording" : "";
          var micBtn = '<button class="recorder-btn ' + micClass + '" id="shadowing-mic-btn-' + idx + '" onclick="VstepView.toggleShadowingRecording(' + idx + ')" style="width:54px;height:54px;"><svg width="22" height="22" fill="white" viewBox="0 0 24 24">' + (s.shadowingRecording ? '<path d="M6 6h12v12H6z"/>' : '<path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/><path d="M11 11V6c0-.55.45-1 1-1s1 .45 1 1v5h-2z"/>') + '</svg></button>';

          var listenBackBtn = res.audioUrl
            ? '<button class="btn btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.8rem;display:inline-flex;align-items:center;gap:0.35rem;" onclick="VstepView.playShadowingVoice(' + idx + ')"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> Nghe lại giọng mình</button>'
            : '';

          var visualizer = s.shadowingRecording
            ? '<div class="speaking-visualizer" style="height:30px;margin-top:0.5rem;margin-bottom:0.5rem;">' +
              Array.from({ length: 8 }, function (_, i) {
                return '<div class="visualizer-bar recording" style="animation-delay:' + (i * 0.1) + 's;height:12px;background:var(--accent);"></div>';
              }).join("") +
              '</div>'
            : '';

          var wordCompareHtml = '';
          if (res.practiced) {
            var wordResults = VstepView.compareShadowingWords(sent.text, res.transcript);
            var wordBoxesHtml = '<div class="shadowing-word-grid">';
            wordResults.forEach(function (wr) {
              var icon = wr.status === 'correct' ? '✓' : wr.status === 'nearmiss' ? '~' : '✗';
              var cleanWord = wr.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/'/g, "\\'");
              wordBoxesHtml += '<div class="shadowing-word-box ' + wr.status + '" style="cursor:pointer;" ' +
                'title="Click hoặc chuột phải để tra từ điển" ' +
                'onclick="VstepView.showWordDictionaryPopup(\'' + cleanWord + '\', event)" ' +
                'oncontextmenu="event.preventDefault(); VstepView.showWordDictionaryPopup(\'' + cleanWord + '\', event)">';
              wordBoxesHtml += '  <div class="word">' + wr.word + '</div>';
              wordBoxesHtml += '  <div class="ipa">' + wr.ipa + '</div>';
              wordBoxesHtml += '  <div class="status-icon ' + wr.status + '">' + icon + '</div>';
              wordBoxesHtml += '</div>';
            });
            wordBoxesHtml += '</div>';
            
            wordCompareHtml = '<div style="margin-top:1rem;padding:1rem;background:rgba(255,255,255,0.03);border-radius:10px;border-left:4px solid var(--accent);">' +
              '  <div style="font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);font-weight:700;margin-bottom:0.5rem;">So sánh phát âm từng từ</div>' +
              wordBoxesHtml +
              '  <p style="font-size:0.82rem;color:var(--text-muted);margin-top:0.75rem;">Bạn nói: <span style="color:var(--text-primary);font-style:italic;">"' + (res.transcript || "(Không nhận diện được giọng nói)") + '"</span></p>' +
              '</div>';
          }

          var transBoxHtml = res.translation
            ? '<div style="margin-top:0.75rem;padding:0.75rem 1rem;background:rgba(59,130,246,0.05);border-radius:8px;font-size:0.88rem;color:var(--text-muted);line-height:1.6;border-left:3px solid var(--primary);font-style:italic;">' + res.translation + '</div>'
            : '';

          content =
            '<div style="margin-top:1rem;border-top:1px solid var(--border-color);padding-top:1rem;display:flex;flex-direction:column;gap:0.75rem;">' +
            '  <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">' +
                 playSampleBtn +
                 translateBtn +
                 listenBackBtn +
            '  </div>' +
               transBoxHtml +
            '  <div style="display:flex;flex-direction:column;align-items:center;padding:1rem;background:rgba(255,255,255,0.02);border-radius:12px;margin-top:0.5rem;border:1px dashed var(--border-color);">' +
                 visualizer +
            '    <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.5rem;">' + (s.shadowingRecording ? 'Đang lắng nghe... Nói to rõ ràng' : 'Nhấn Micro để bắt đầu luyện nói') + '</div>' +
                 micBtn +
            '  </div>' +
               wordCompareHtml +
            '</div>';
        }

        var speedControl = isActive
          ? '<div style="display:flex;align-items:center;gap:0.5rem;margin-left:1rem;margin-right:1rem;" onclick="event.stopPropagation();">' +
            '  <span style="font-size:0.78rem;color:var(--text-muted);">Tốc độ:</span>' +
            '  <select onchange="VstepView.changeShadowingSpeed(this.value)" style="padding:0.25rem 0.5rem;border-radius:4px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.8rem;">' +
            '    <option value="0.75" ' + (s.shadowingSpeed === 0.75 ? 'selected' : '') + '>0.75x</option>' +
            '    <option value="1" ' + (s.shadowingSpeed === 1 ? 'selected' : '') + '>1.0x</option>' +
            '    <option value="1.25" ' + (s.shadowingSpeed === 1.25 ? 'selected' : '') + '>1.25x</option>' +
            '  </select>' +
            '</div>'
          : '';

        var cardClass = isActive ? "glass-card active" : "glass-card";
        var borderStyle = isActive ? "border-color:var(--primary);box-shadow: 0 0 15px rgba(99,102,241,0.15);" : "";

        return (
          '<div class="' + cardClass + '" style="margin-bottom:0.75rem;padding:1.25rem;cursor:pointer;' + borderStyle + '" onclick="VstepView.selectShadowingSentence(' + idx + ', event)" data-sent-text="' + escapedText + '">' +
          '  <div style="display:flex;align-items:center;gap:0.5rem;width:100%;flex-wrap:wrap;">' +
          '    <span style="font-weight:700;color:var(--text-muted);font-size:0.88rem;min-width:24px;">' + (idx + 1) + '.</span>' +
               speakerBadge +
          '    <div style="font-size:1rem;font-weight:600;color:var(--text-primary);flex:1;word-break:break-word;min-width:150px;">' + sent.text + '</div>' +
               speedControl +
               scoreBadge +
          '  </div>' +
             content +
          '</div>'
        );
      }).join("");
    }

    var transcriptHtml = "";
if (ex.speakerLines) {
        transcriptHtml = ex.speakerLines
          .map(function (l) {
            var sentences = l.text.split(/([.!?])\s*/);
            return (
              "<strong>" + l.speaker + ":</strong> " + sentences.join("")
            );
          })
          .join("<br><br>");
      } else {
        var normalizedTranscript = ex.transcript || "";
        var isPart1 =
          s.currentPart === 0 && /Question\s+\d+\./i.test(normalizedTranscript);
        if (isPart1) {
          var parts = normalizedTranscript.split(/(Question\s+\d+\.)/i);
          var blocks = [];
          var introText = parts[0] ? parts[0].trim() : "";
          if (introText) {
            blocks.push(
              '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:0.95rem 1rem;margin-bottom:0.8rem;"><div style="font-weight:700;color:var(--accent);margin-bottom:0.45rem;">Directions</div><div style="white-space:pre-wrap;line-height:1.7;">' +
                introText.replace(/\s+/g, " ").replace(/\s([,.!?])/g, "$1") +
                "</div></div>",
            );
          }
          for (var i = 1; i < parts.length; i += 2) {
            var qLabel = (parts[i] || "").trim();
            var qText = (parts[i + 1] || "").trim();
            if (qLabel && qText) {
              blocks.push(
                '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:0.95rem 1rem;margin-bottom:0.8rem;"><div style="font-weight:700;color:var(--accent);margin-bottom:0.45rem;">' +
                  qLabel.replace(/\.$/, "") +
                  '</div><div style="white-space:pre-wrap;line-height:1.7;">' +
                  qText.replace(/\s+/g, " ").replace(/\s([,.!?])/g, "$1") +
                  "</div></div>",
              );
            }
          }
          transcriptHtml = blocks.join("");
        } else {
          var sentences = normalizedTranscript.split(/([.!?])\s*/);
          transcriptHtml = sentences.join("");
        }
      }

    var scriptPanel = s.showTranscript
      ? '<div style="background:var(--bg-input);border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;border-left:4px solid var(--secondary);font-style:italic;line-height:1.7;color:var(--text-muted);white-space:pre-wrap;">' +
        transcriptHtml +
        "</div>"
      : "";

    var questionsHtml = ex.questions
      .map(function (q, qi) {
        var gi = VstepView._getListeningGlobalQuestionIndex(
          s.currentPart,
          s.currentExercise,
          qi,
        );
        var questionNumber = qi + 1;  // Start numbering from 1 for each exercise
        var letters = ['A', 'B', 'C', 'D'];
        
        var options = q.options
          .map(function (opt, oi) {
            var cls = "vstep-choice-item";
            if (s.submitted) {
              cls +=
                oi === q.correct
                  ? " selected"
                  : s.answers[gi] === oi && oi !== q.correct
                    ? ""
                    : "";
            } else {
              cls += s.answers[gi] === oi ? " selected" : "";
            }
            var letter = letters[oi] || String.fromCharCode(65 + oi);
            return (
              '<div class="' +
              cls +
              '" id="l' +
              gi +
              "-opt" +
              oi +
              '" onclick="' +
              (s.submitted
                ? ""
                : "VstepView.toggleListeningAnswer(" + gi + ", " + oi + ", event)") +
              '"><span class="choice-letter">' +
              letter +
              '</span><span class="choice-text">' +
              opt +
              '</span></div>'
            );
          })
          .join("\n");
        var expl = "";
        if (s.submitted) {
          var isCorrect = s.answers[gi] === q.correct;
          var badgeCls = isCorrect
            ? "badge badge-correct"
            : "badge badge-incorrect";
          var badgeText = isCorrect ? "Dung" : "Sai";
          var correctAns = isCorrect
            ? ""
            : "Dap an: <strong>" + q.options[q.correct] + "</strong><br>";
          expl =
            '<div class="explanation-box"><div style="margin-bottom:0.5rem;"><span class="' +
            badgeCls +
            '">' +
            badgeText +
            "</span></div>" +
            correctAns +
            q.explanation +
            "</div>";
        }
        return (
          '<div class="vstep-question-card" data-gi="' + gi + '"><div class="question-header"><span class="question-number">' +
          questionNumber +
          '</span><span class="question-text">' +
          q.question +
          '</span></div><div class="vstep-choices">' +
          options +
          "</div>" +
          expl +
          "</div>"
        );
      })
      .join("");

    var hasPrev = s.currentExercise > 0;
    var hasNext = s.currentExercise < part.exercises.length - 1;
    var navBtns = "";
    if (hasPrev)
      navBtns +=
        '<button class="btn btn-secondary" style="font-size:0.85rem;" onclick="VstepView.setListeningExercise(' +
        (s.currentExercise - 1) +
        ')">\u2190 Bai truoc</button> ';
    if (hasNext)
      navBtns +=
        '<button class="btn btn-secondary" style="font-size:0.85rem;" onclick="VstepView.setListeningExercise(' +
        (s.currentExercise + 1) +
        ')">Bai tiep theo \u2192</button>';

    var exScore = s.submitted
      ? ex.questions.filter(function (q, qi) {
          return (
            s.answers[
              VstepView._getListeningGlobalQuestionIndex(
                s.currentPart,
                s.currentExercise,
                qi,
              )
            ] === q.correct
          );
        }).length
      : null;
    var exTotal = ex.questions.length;

    var submitBtn = s.submitted
      ? '<div style="margin-top:1rem;display:flex;gap:1rem;align-items:center;"><span style="font-size:1.1rem;font-weight:700;">Ket qua: ' +
        exScore +
        "/" +
        exTotal +
        '</span><button class="btn btn-secondary" onclick="VstepView.resetCurrentListeningExercise()">L\u1ea5m l\u1ea1i \u0111\u1ec1 n\u00e0y</button></div>'
      : '<button class="btn btn-accent" style="width:100%;margin-top:1rem;" onclick="VstepView.submitListeningExercise()">Nop bai Bai ' +
        (s.currentExercise + 1) +
        "</button>";

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">\n          <div>\n            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">Luyen nghe VSTEP</h2>\n            <p style="font-size:0.85rem;color:var(--text-muted);">Nghe va tra loi cau hoi hoac luyen shadowing.</p>\n          </div>\n          <div style="display:flex;gap:0.5rem;">' +
      modeTabsHtml +
      '</div>\n        </div>\n        <div class="vstep-cat-strip">' +
      partButtonsHtml +
      '</div>\n        <div style="margin-top:0.5rem;">\n          <div class="progress-bar-container" style="height:4px;">\n            <div style="height:100%;background:var(--secondary);border-radius:9999px;width:' +
      progressPct +
      '%;"></div>\n          </div>\n          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">Da tra loi ' +
      answeredCount +
      "/" +
      totalQs +
      " cau (toan bo 3 phan)</p>\n        </div>\n      </div>\n\n      " +
       (ex.audio
          ? '<div class="listening-audio-player"><div class="audio-controls"><button class="audio-play-btn" id="vstep-play-btn" onclick="VstepView.playListeningAudio()" title="Phát/Dừng"><svg id="vstep-play-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="6,3 20,12 6,21"/></svg></button><div class="audio-progress-wrap"><div class="audio-progress-bar" id="vstep-progress-bar" onclick="VstepView.seekAudio(event)"><div class="audio-progress-fill" id="vstep-progress-fill"></div></div><div class="audio-time"><span id="vstep-current-time">0:00</span><span style="opacity:0.5;"> / </span><span id="vstep-duration">0:00</span></div></div><span class="audio-speed-btn" id="vstep-speed-btn" onclick="VstepView.cycleAudioSpeed()" title="Tốc độ">1x</span><a id="vstep-cloudinary-file-link" href="#" target="_blank" title="Mở Cloudinary" style="font-size:0.7rem;color:var(--text-muted);text-decoration:none;opacity:0.6;">↗</a><audio id="vstep-audio" preload="metadata" data-local-src="' + ex.audio + '" src=""></audio></div><a id="vstep-cloudinary-open" href="#" target="_blank" style="display:none;"></a><span id="vstep-audio-status" style="display:none;font-size:0.7rem;color:var(--text-muted);"></span></div>'
        : "") +
      '\n\n      <div class="glass-card">\n        <div style="margin-bottom:1rem;">\n          <h3 style="font-size:1rem;">' +
      part.title +
      '</h3>\n          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.75rem;">' +
      part.description +
      '</p>\n        </div>\n        <div style="margin-bottom:0.75rem;">' +
      exButtonsHtml +
      '</div>\n        ' +
      (isShadowing
        ? '<div style="border-top:1px solid var(--border-color);padding-top:0.75rem;margin-bottom:1rem;">' +
          '  <h4 style="font-size:0.95rem;color:var(--primary);margin-bottom:1rem;">' + ex.label + ' &mdash; Luyện Shadowing</h4>' +
             statsBannerHtml +
             sentencesHtml +
          '  <div style="margin-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">' +
          '    <div>' + navBtns + '</div>' +
          '  </div>' +
          '</div>'
        : '<div style="border-top:1px solid var(--border-color);padding-top:0.75rem;margin-bottom:1rem;">\n          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">\n            <h4 style="font-size:0.95rem;color:var(--primary);">' +
          ex.label +
          '</h4>\n            <div style="display:flex;gap:0.5rem;">\n              <button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.7rem;" onclick="VstepView.toggleListeningTranscript()">' +
          (s.showTranscript ? "An transcript" : "Xem transcript") +
          "</button>\n          </div>\n        </div>\n        " +
          scriptPanel +
          "\n        " +
          questionsHtml +
          '\n        <div style="margin-top:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">\n          <div>' +
          navBtns +
          "</div>\n          " +
          submitBtn +
          "\n        </div>") +
      "\n      </div>\n    "
    );
  },

  setListeningPart: function (idx) {
    var completedExercises = this.listening.completedExercises || {};
    this.listening.currentPart = idx;
    this.listening.currentExercise = 0;
    this.listening.showTranscript = false;
    this.listening.submitted = false;
    // Don't reset answers - preserve user progress when switching parts
    // this.listening.answers = {};
    // this.listening.questionTimes = {};
    this.listening.completedExercises = completedExercises;
    this.saveState();
    VstepView._stopAudio();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
    this.initAudioPlayer();
  },

  setListeningExercise: function (idx) {
    var completedExercises = this.listening.completedExercises || {};
    this.listening.currentExercise = idx;
    this.listening.completedExercises = completedExercises;

    // Preserve all answers across exercises - load answers for current exercise
    var exerciseId = this.listening.currentPart + "_" + idx;
    if (!this.listening.allAnswers) this.listening.allAnswers = {};

    if (completedExercises[exerciseId] && completedExercises[exerciseId].submitted) {
      this.listening.submitted = true;
      this.listening.answers = JSON.parse(JSON.stringify(completedExercises[exerciseId].answers || {}));
    } else {
      this.listening.submitted = false;
      // Load saved answers for this exercise, or start fresh
      this.listening.answers = this.listening.allAnswers[exerciseId] || {};
      this.listening.questionTimes = {};
    }
    
    this.listening.showTranscript = false;
    this.saveState();
    VstepView._stopAudio();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
    this.initAudioPlayer();
  },

  _stopAudio: function () {
    var a = document.getElementById("vstep-audio");
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    var i = document.getElementById("vstep-play-icon");
    if (i) i.innerHTML = '<polygon points="6,3 20,12 6,21"/>';
  },

  toggleListeningTranscript: function () {
    // Save audio state before re-render (innerHTML destroys the audio element)
    var audioEl = document.getElementById("vstep-audio");
    var savedTime = audioEl ? audioEl.currentTime : 0;
    var wasPlaying = audioEl ? !audioEl.paused : false;

    this.listening.showTranscript = !this.listening.showTranscript;
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
    this.initAudioPlayer();

    // Restore audio position and playback state
    var newAudio = document.getElementById("vstep-audio");
    if (newAudio && savedTime > 0) {
      newAudio.currentTime = savedTime;
      if (wasPlaying) {
        newAudio.play().catch(function() {});
        var icon = document.getElementById("vstep-play-icon");
        if (icon) icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
      }
    }
  },

  playListeningAudio: function () {
    var audioEl = document.getElementById("vstep-audio");
    var icon = document.getElementById("vstep-play-icon");
    if (!audioEl) return;
    // If src not yet resolved (Drive async), load first then play
    var hasSrc = audioEl.src && audioEl.src !== window.location.href && !audioEl.src.endsWith("#") && audioEl.getAttribute("src") !== "";
    if (!hasSrc || audioEl.readyState === 0) {
      var localSrc = audioEl.getAttribute("data-local-src");
      if (localSrc) {
        var self = this;
        this._loadAudioSource(audioEl, localSrc);
        // Wait a bit for Drive promise to set src, then play
        setTimeout(function(){
          if (audioEl.src && audioEl.src !== window.location.href) {
            audioEl.play().catch(function(err){
              console.warn("[VstepPrep] play() failed:", err);
              self.showToast("⚠️ Không phát được. Thử mở link Drive trực tiếp.", 3000);
            });
            if (icon) icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
          }
        }, 600);
        return;
      }
    }
    // file:// with iframe preview - redirect to iframe
    var iframe = document.getElementById("vstep-drive-iframe");
    if (iframe && iframe.style.display !== "none") {
      this.showToast("▶️ Dùng player trong iframe Drive preview (đuôi sharing) - bấm Play trong đó", 2500);
      iframe.scrollIntoView({behavior:"smooth", block:"center"});
      return;
    }
    if (audioEl.paused) {
      var self2 = this;
      audioEl.play().catch(function (err) {
        console.warn("[VstepPrep] play() error:", err);
        // If Drive URL blocked, suggest opening Drive sharing link
        if (audioEl.src && audioEl.src.indexOf("drive") >= 0) {
          self2.showToast("⚠️ Drive chặn. Bấm 'via Drive' (sharing) để mở: https://drive.google.com/file/d/.../view?usp=sharing", 4000);
        } else if (location.protocol === "file:") {
          self2.showToast("⚠️ Chạy file:// bị chặn CORS. Hãy chạy http://localhost (npx serve) hoặc dùng iframe preview", 4000);
        }
      });
      if (icon)
        icon.innerHTML =
          '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
    } else {
      audioEl.pause();
      if (icon) icon.innerHTML = '<polygon points="6,3 20,12 6,21"/>';
    }
  },

  _loadAudioSource: function (audioEl, localSrc) {
    var self = this;
    if (!audioEl || !localSrc) return;
    // Reset
    audioEl.pause();
    audioEl.removeAttribute("src");
    audioEl.load();
    audioEl._driveFallbackIdx = undefined;
    // Show loading state
    var dur = document.getElementById("vstep-duration");
    if (dur) dur.textContent = "đang tải...";
    var statusEl = document.getElementById("vstep-audio-status");
    var fileLinkEl = document.getElementById("vstep-cloudinary-file-link");
    var openEl = document.getElementById("vstep-cloudinary-open");
    
    // Use Cloudinary audio service
    if (window.CloudinaryAudioService && localSrc.indexOf("listenning") === 0) {
      if (statusEl) statusEl.textContent = "Đang tải từ Cloudinary...";
      
      var cloudinaryUrl = CloudinaryAudioService.resolveCloudinaryUrl(localSrc);
      if (cloudinaryUrl) {
        audioEl.setAttribute("data-local-src", localSrc);
        audioEl.preload = "metadata";
        audioEl.removeAttribute("crossorigin");
        
        // Update UI links
        if (fileLinkEl) {
          fileLinkEl.href = cloudinaryUrl;
          fileLinkEl.title = "Mở file trên Cloudinary: " + cloudinaryUrl;
        }
        if (openEl) {
          openEl.href = cloudinaryUrl;
          openEl.style.display = "inline";
        }
        
        // Set the Cloudinary URL directly
        audioEl.src = cloudinaryUrl;
        audioEl.load();
        if (statusEl) statusEl.textContent = "✓ Cloudinary trực tiếp";
        console.log("[VstepPrep] Audio Cloudinary src set ->", cloudinaryUrl);
      } else {
        if (openEl) openEl.style.display = "none";
        if (statusEl) statusEl.textContent = "Không tìm thấy trên Cloudinary";
        // No Cloudinary mapping -> fallback to local
        audioEl.src = localSrc;
        audioEl.load();
        if (statusEl) statusEl.textContent = "Sử dụng file local";
        console.warn("[VstepPrep] No Cloudinary mapping for", localSrc, "using local");
      }
    } else {
      // Direct local
      audioEl.src = localSrc;
      audioEl.load();
      if (statusEl) statusEl.textContent = "Local";
      if (openEl) openEl.style.display = "none";
      if (fileLinkEl) fileLinkEl.href = "#";
      console.log("[VstepPrep] Audio src set (local):", localSrc);
    }
  },

  initAudioPlayer: function () {
    var audioEl = document.getElementById("vstep-audio");
    if (!audioEl) return;
    var self = this;
    // Load correct src via CloudinaryAudioService (fixes bug where src="" never set)
    var localSrc = audioEl.getAttribute("data-local-src") || audioEl.getAttribute("src") || "";
    // Decode % encoding if needed but keep original for Cloudinary resolver
    try { localSrc = decodeURIComponent(localSrc); } catch(e){}
    // If src is empty, we need to load via _loadAudioSource
    if (!audioEl.src || audioEl.src === window.location.href || audioEl.src.endsWith("#") || audioEl.getAttribute("src") === "") {
      if (localSrc) {
        // Keep encoded original for Cloudinary resolver (it handles decode internally)
        var rawLocal = audioEl.getAttribute("data-local-src") || localSrc;
        this._loadAudioSource(audioEl, rawLocal);
      }
    } else if (localSrc && audioEl.src !== localSrc) {
      // Ensure src is Cloudinary-resolved even if already set to local
      this._loadAudioSource(audioEl, audioEl.getAttribute("data-local-src") || localSrc);
    }

    audioEl.onended = function () {
      var icon = document.getElementById("vstep-play-icon");
      if (icon) icon.innerHTML = '<polygon points="6,3 20,12 6,21"/>';
    };
    audioEl.ontimeupdate = function () {
      if (!audioEl.duration) return;
      var fill = document.getElementById("vstep-progress-fill");
      var cur = document.getElementById("vstep-current-time");
      var dur = document.getElementById("vstep-duration");
      var pct = (audioEl.currentTime / audioEl.duration) * 100;
      if (fill) fill.style.width = pct + "%";
      if (cur) cur.textContent = self._formatTime(audioEl.currentTime);
      if (dur) dur.textContent = self._formatTime(audioEl.duration);
    };
    audioEl.onloadedmetadata = function () {
      var dur = document.getElementById("vstep-duration");
      if (dur) dur.textContent = self._formatTime(audioEl.duration);
    };
    audioEl.onerror = function () {
      var err = audioEl.error;
      var code = err ? err.code : 0;
      // If custom fallback already handles Drive errors, this is final error
      if (audioEl._driveFallbackIdx !== undefined && audioEl._driveFallbackIdx < 99) return;
      console.error("[VstepPrep] Audio load error code:", code, "src:", audioEl.src);
      var dur = document.getElementById("vstep-duration");
      if (dur) dur.textContent = "lỗi tải";
      // Show helpful UI: link to open Drive folder
      self.showToast("⚠️ Không tải được audio. Kiểm tra Drive quyền 'Anyone with link' hoặc tắt Drive để dùng local.", 4000);
    };
    audioEl.oncanplay = function () {
      var dur = document.getElementById("vstep-duration");
      if (dur && audioEl.duration) dur.textContent = self._formatTime(audioEl.duration);
    };
  },

  seekAudio: function (e) {
    var bar = document.getElementById("vstep-progress-bar");
    var audioEl = document.getElementById("vstep-audio");
    if (!bar || !audioEl || !audioEl.duration) return;
    var rect = bar.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioEl.currentTime = pct * audioEl.duration;
  },

  cycleAudioSpeed: function () {
    var audioEl = document.getElementById("vstep-audio");
    var btn = document.getElementById("vstep-speed-btn");
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

  toggleListeningAnswer: function (gi, oi, event) {
    // Prevent default behavior and event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    var s = this.listening;
    if (s.submitted) return;
    
    // Track question timing
    var now = Date.now();
    if (!s.questionTimes[gi]) {
      s.questionTimes[gi] = { start: now, end: null };
    }
    s.questionTimes[gi].end = now;
    
    if (s.answers[gi] === oi) {
      delete s.answers[gi];
    } else {
      s.answers[gi] = oi;
    }
    
    // Save to allAnswers for persistence across exercise switches
    var exerciseId = this.listening.currentPart + "_" + this.listening.currentExercise;
    if (!this.listening.allAnswers) this.listening.allAnswers = {};
    this.listening.allAnswers[exerciseId] = JSON.parse(JSON.stringify(this.listening.answers));
    
    // Save state to localStorage WITHOUT triggering cross-tab sync
    // Use direct localStorage.setItem to avoid vstep-data-changed event
    try {
      localStorage.setItem('vstep_vstep_full_state', JSON.stringify({
        reading: this.reading,
        listening: this.listening,
        writing: this.writing,
        speaking: this.speaking,
        currentSection: this.currentSection,
        performanceHistory: this.performanceHistory
      }));
    } catch (e) {
      console.error("Error saving state:", e);
    }
    
    // Don't call saveState/saveTestPosition here to avoid potential re-render triggers
    // These will be called when switching parts/exercises

    // Minimal DOM update - just toggle class for visual feedback
    var choiceId = 'l' + gi + '-opt' + oi;
    var choiceEl = document.getElementById(choiceId);
    if (choiceEl) {
      var questionEl = choiceEl.closest('.vstep-question-card');
      if (questionEl) {
        var allChoices = questionEl.querySelectorAll('.vstep-choice-item');
        allChoices.forEach(function(c) {
          c.classList.remove('selected');
        });
      }
      if (s.answers[gi] === oi) {
        choiceEl.classList.add('selected');
      }
    }
    
    return false;
  },

  submitListeningExercise: function () {
    var s = this.listening;
    var part = VstepListeningData.parts[s.currentPart];
    var ex = part.exercises[s.currentExercise];
    var score = 0;
    ex.questions.forEach(function (q, qi) {
      var gi = VstepView._getListeningGlobalQuestionIndex(
        s.currentPart,
        s.currentExercise,
        qi,
      );
      if (s.answers[gi] === q.correct) score++;
      else {
        // Record wrong answer
        VstepView.recordWrongAnswer("listening", q, s.answers[gi], q.correct, {
          part: s.currentPart,
          exercise: s.currentExercise
        });
      }
    });
    s.submitted = true;
    
    // Save completed exercise with score
    var exerciseId = s.currentPart + "_" + s.currentExercise;
    if (!s.completedExercises) s.completedExercises = {};
    s.completedExercises[exerciseId] = {
      score: score,
      total: ex.questions.length,
      submitted: true,
      timestamp: new Date().toISOString()
    };
    
    App.addXp(score * 10);
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      // Preserve scroll position when submitting
      var scrollTop = ws.scrollTop;
      var scrollLeft = ws.scrollLeft;
      ws.innerHTML = this.renderSection("listening");
      ws.scrollTop = scrollTop;
      ws.scrollLeft = scrollLeft;
      requestAnimationFrame(function() {
        ws.scrollTop = scrollTop;
        ws.scrollLeft = scrollLeft;
      });
    }
    this.initAudioPlayer();
    
    // Show break reminder
    this.showBreakReminder("Nghe", score, ex.questions.length);
    
    // Record performance
    this.recordPerformance("listening", score, ex.questions.length);
  },

  resetListening: function () {
    var completedExercises = this.listening.completedExercises || {};
    this.listening = {
      currentPart: this.listening.currentPart,
      currentExercise: 0,
      answers: {},
      submitted: false,
      isPlaying: false,
      showTranscript: false,
      mode: this.listening.mode || "test",
      shadowingIndex: 0,
      shadowingResults: {},
      shadowingRecording: false,
      shadowingSpeed: 1,
      questionTimes: {},
      completedExercises: completedExercises,
    };
    this.saveState();
    VstepView._stopAudio();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
    this.initAudioPlayer();
  },

  resetCurrentListeningExercise: function () {
    var s = this.listening;
    var part = VstepListeningData.parts[s.currentPart];
    var ex = part.exercises[s.currentExercise];
    
    // Save current exercise results before resetting
    var exerciseId = s.currentPart + "_" + s.currentExercise;
    var currentAnswers = {};
    ex.questions.forEach(function (q, qi) {
      var gi = VstepView._getListeningGlobalQuestionIndex(
        s.currentPart,
        s.currentExercise,
        qi,
      );
      if (s.answers[gi] !== undefined) {
        currentAnswers[gi] = s.answers[gi];
      }
    });
    
    // Store completed exercise results
    if (!s.completedExercises) s.completedExercises = {};
    s.completedExercises[exerciseId] = {
      answers: currentAnswers,
      submitted: s.submitted,
      timestamp: new Date().toISOString()
    };
    
    // Clear answers only for current exercise
    ex.questions.forEach(function (q, qi) {
      var gi = VstepView._getListeningGlobalQuestionIndex(
        s.currentPart,
        s.currentExercise,
        qi,
      );
      delete s.answers[gi];
      delete s.questionTimes[gi];
    });
    
    s.submitted = false;
    this.saveState();
    
    VstepView._stopAudio();
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      ws.scrollTop = 0;
      ws.innerHTML = this.renderSection("listening");
      this.initAudioPlayer();
    }
  },

  setListeningMode: function (mode) {
    this.listening.mode = mode;
    this.listening.shadowingIndex = 0;
    this.listening.shadowingRecording = false;
    this.saveState();
    VstepView._stopAudio();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
    this.initAudioPlayer();
  },

  _parseListeningSentences: function (ex) {
    if (!ex) return [];
    var sentences = [];
    if (ex.speakerLines && ex.speakerLines.length > 0) {
      ex.speakerLines.forEach(function (l) {
        var text = l.text || "";
        var parts = text.split(/([.!?])\s*/);
        parts.forEach(function (p) {
          var clean = p.trim();
          if (clean.length > 2) {
            sentences.push({
              speaker: l.speaker,
              text: clean
            });
          }
        });
      });
    } else {
      var norm = (ex.transcript || "").replace(/\r/g, "");
      var parts = norm.split(/([.!?])\s*/);
      parts.forEach(function (p) {
        var clean = p.trim().replace(/\s+/g, " ");
        if (clean.length > 2) {
          var match = clean.match(/^(Question\s+\d+)\./i);
          if (match) {
            sentences.push({
              speaker: match[1],
              text: clean.substring(match[0].length).trim()
            });
          } else {
            sentences.push({
              text: clean
            });
          }
        }
      });
    }
    return sentences;
  },

  calculateAccuracy: function (targetText, spokenText) {
    if (!spokenText) return 0;
    var targetWords = targetText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);
    var spokenWords = spokenText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);

    if (targetWords.length === 0) return 0;

    var matchedCount = 0;
    var targetWordMatched = new Array(targetWords.length).fill(false);

    spokenWords.forEach(function (word) {
      for (var i = 0; i < targetWords.length; i++) {
        if (!targetWordMatched[i] && targetWords[i] === word) {
          targetWordMatched[i] = true;
          matchedCount++;
          break;
        }
      }
    });

    return Math.round((matchedCount / targetWords.length) * 100);
  },

  getDiffHighlight: function (target, spoken) {
    if (!spoken) return target;
    var targetWords = target.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);
    var spokenWords = spoken.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);

    return target.split(/\s+/).map(function (origWord) {
      var wordClean = origWord.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
      var found = spokenWords.indexOf(wordClean) >= 0;
      if (found) {
        return '<span style="color:#10b981;font-weight:600;">' + origWord + '</span>';
      } else {
        return '<span style="color:#f59e0b;font-weight:500;">' + origWord + '</span>';
      }
    }).join(" ");
  },

  // Levenshtein distance algorithm for string comparison
  _levenshtein: function (a, b) {
    if (!a || !b) return 0;
    var matrix = [];
    var i, j;
    
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  },

  // Get IPA for a word from vocabulary data
  getWordIPA: function (word) {
    if (!word) return '';
    var lowerWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    
    // Dictionary of common English words and grammatical particles to avoid blank or incorrect lookups
    var commonWordsIPA = {
      // Numbers & Basic Grammars
      "1": "/wʌn/", "one": "/wʌn/", "2": "/tuː/", "two": "/tuː/", "3": "/θriː/", "three": "/θriː/",
      "4": "/fɔːr/", "four": "/fɔːr/", "5": "/faɪv/", "five": "/faɪv/", "6": "/sɪks/", "six": "/sɪks/",
      "7": "/ˈsev.ən/", "seven": "/ˈsev.ən/", "8": "/eɪt/", "eight": "/eɪt/", "9": "/naɪn/", "nine": "/naɪn/",
      "10": "/ten/", "ten": "/ten/",
      "a": "/ə/", "an": "/æn/", "the": "/ðiː/", "and": "/ænd/", "but": "/bʌt/", "or": "/ɔːr/", "if": "/ɪf/",
      "because": "/bɪˈkɒz/", "as": "/æz/", "until": "/ənˈtɪl/", "while": "/waɪl/",
      "of": "/ɒv/", "at": "/æt/", "by": "/baɪ/", "for": "/fɔːr/", "with": "/wɪð/", "about": "/əˈbaʊt/",
      "against": "/əˈɡenst/", "between": "/bɪˈtwiːn/", "into": "/ˈɪn.tuː/", "through": "/θruː/",
      "during": "/ˈdjʊə.rɪŋ/", "before": "/bɪˈfɔːr/", "after": "/ˈɑːf.tər/", "above": "/əˈbʌv/",
      "below": "/bɪˈləʊ/", "to": "/tuː/", "from": "/frɒm/", "up": "/ʌp/", "down": "/daʊn/",
      "in": "/ɪn/", "out": "/aʊt/", "on": "/ɒn/", "off": "/ɒf/", "over": "/ˈəʊ.vər/", "under": "/ˈʌn.dər/",
      "again": "/əˈɡen/", "further": "/ˈfɜː.ðər/", "then": "/ðen/", "once": "/wʌns/",
      "here": "/hɪər/", "there": "/ðeər/", "when": "/wen/", "where": "/weər/", "why": "/waɪ/", "how": "/haʊ/",
      "all": "/ɔːl/", "any": "/ˈen.i/", "both": "/bəʊθ/", "each": "/iːtʃ/", "few": "/fjuː/", "more": "/mɔːr/",
      "most": "/məʊst/", "other": "/ˈʌð.ər/", "some": "/sʌm/", "such": "/sʌtʃ/", "no": "/nəʊ/", "nor": "/nɔːr/",
      "not": "/nɒt/", "only": "/ˈəʊn.li/", "own": "/əʊn/", "same": "/seɪm/", "so": "/səʊ/", "than": "/ðæn/",
      "too": "/tuː/", "very": "/ˈver.i/", "s": "/s/", "t": "/t/", "can": "/kæn/", "will": "/wɪl/",
      "just": "/dʒʌst/", "should": "/ʃʊd/", "now": "/naʊ/",
      
      // Pronouns
      "i": "/aɪ/", "me": "/miː/", "my": "/maɪ/", "myself": "/maɪˈself/", "we": "/wiː/", "us": "/ʌs/",
      "our": "/ˈaʊ.ər/", "ours": "/ˈaʊ.əz/", "ourselves": "/aʊəˈselvz/", "you": "/juː/", "your": "/jɔːr/",
      "yours": "/jɔːz/", "yourself": "/jɔːˈself/", "yourselves": "/jɔːˈselvz/", "he": "/hiː/", "him": "/hɪm/",
      "his": "/hɪz/", "himself": "/hɪmˈself/", "she": "/ʃiː/", "her": "/hɜːr/", "hers": "/hɜːz/",
      "herself": "/hɜːˈself/", "it": "/ɪt/", "its": "/ɪts/", "itself": "/ɪtˈself/", "they": "/ðeɪ/",
      "them": "/ðem/", "their": "/ðeər/", "theirs": "/ðeəz/", "themselves": "/ðəmˈselvz/",
      "what": "/wɒt/", "which": "/wɪtʃ/", "who": "/huː/", "whom": "/huːm/", "this": "/ðɪs/", "that": "/ðæt/",
      "these": "/ðiːz/", "those": "/ðəʊz/", "am": "/æm/", "is": "/ɪz/", "are": "/ɑːr/", "was": "/wɒz/",
      "were": "/wɜːr/", "be": "/biː/", "been": "/biːn/", "being": "/ˈbiː.ɪŋ/", "have": "/hæv/", "has": "/hæz/",
      "had": "/hæd/", "having": "/ˈhæv.ɪŋ/", "do": "/duː/", "does": "/dʌz/", "did": "/dɪd/", "doing": "/ˈduː.ɪŋ/",
      "would": "/wʊd/", "should": "/ʃʊd/", "could": "/kʊd/", "ought": "/ɔːt/",
      
      // Words from lessons / instructions / screenshot context
      "part": "/pɑːrt/", "direction": "/daɪˈrek.ʃən/", "directions": "/daɪˈrek.ʃənz/",
      "hear": "/hɪər/", "short": "/ʃɔːrt/", "announcements": "/əˈnaʊns.mənts/",
      "announcement": "/əˈnaʊns.mənt/", "instructions": "/ɪnˈstrʌk.ʃənz/",
      "instruction": "/ɪnˈstrʌk.ʃən/", "question": "/ˈkwes.tʃən/", "questions": "/ˈkwes.tʃənz/",
      
      // Additional common words
      "listen": "/ˈlɪs.ən/", "read": "/riːd/", "write": "/raɪt/", "speak": "/spiːk/",
      "vocabulary": "/vəˈkæb.jə.ler.i/", "grammar": "/ˈɡræm.ər/", "sentence": "/ˈsen.təns/",
      "sentences": "/ˈsen.tən.sɪz/", "word": "/wɜːd/", "words": "/wɜːdz/", "pronounce": "/prəˈnaʊns/",
      "pronunciation": "/prəˌnʌn.siˈeɪ.ʃən/", "correct": "/kəˈrekt/", "incorrect": "/ˌɪn.kəˈrekt/",
      "practice": "/ˈpræk.tɪs/", "please": "/pliːz/", "thank": "/θæŋk/", "thanks": "/θæŋks/",
      "good": "/ɡʊd/", "bad": "/bæd/", "great": "/ɡreɪt/", "excellent": "/ˈek.səl.ənt/",
      "easy": "/ˈiː.zi/", "difficult": "/ˈdɪf.ɪ.kʌlt/", "hard": "/hɑːd/", "simple": "/ˈsɪm.pəl/"
    };

    if (commonWordsIPA[lowerWord]) {
      return commonWordsIPA[lowerWord];
    }
    
    // Helper to find exact match in databases
    var findExact = function (w) {
      if (window.VstepVocabData) {
        var match = VstepVocabData.find(function (v) {
          return v.word.toLowerCase() === w;
        });
        if (match && match.ipa) return match.ipa;
      }
      if (window.vocabularyData) {
        var match2 = vocabularyData.find(function (v) {
          return v.english && v.english.word.toLowerCase() === w;
        });
        if (match2 && match2.english && match2.english.ipa) return match2.english.ipa;
      }
      return null;
    };
    
    var exactRes = findExact(lowerWord);
    if (exactRes) return exactRes;
    
    // Try matching singular/base forms if plural or with suffixes
    if (lowerWord.length > 3) {
      if (lowerWord.endsWith('s')) {
        var singular = lowerWord.slice(0, -1);
        var resSingular = findExact(singular);
        if (resSingular) return resSingular;
        
        if (lowerWord.endsWith('es')) {
          var singularEs = lowerWord.slice(0, -2);
          var resSingularEs = findExact(singularEs);
          if (resSingularEs) return resSingularEs;
        }
      }
      
      if (lowerWord.endsWith('ed')) {
        var baseEd = lowerWord.slice(0, -2);
        var resEd = findExact(baseEd);
        if (resEd) return resEd;
        
        var baseEd2 = lowerWord.slice(0, -1); // e.g. loved -> love
        var resEd2 = findExact(baseEd2);
        if (resEd2) return resEd2;
      }
      
      if (lowerWord.endsWith('ing')) {
        var baseIng = lowerWord.slice(0, -3);
        var resIng = findExact(baseIng);
        if (resIng) return resIng;
        
        var baseIng2 = baseIng + 'e'; // e.g. making -> make
        var resIng2 = findExact(baseIng2);
        if (resIng2) return resIng2;
      }
    }
    
    // Fuzzy matching for longer words with strict length difference boundary to avoid short word collision
    if (lowerWord.length > 4) {
      if (window.VstepVocabData) {
        var fuzzyMatch = VstepVocabData.find(function (v) {
          var vWord = v.word.toLowerCase();
          if (vWord.includes(lowerWord) || lowerWord.includes(vWord)) {
            if (Math.abs(vWord.length - lowerWord.length) <= 3) {
              return true;
            }
          }
          return false;
        });
        if (fuzzyMatch && fuzzyMatch.ipa) return fuzzyMatch.ipa;
      }
      
      if (window.vocabularyData) {
        var fuzzyMatch2 = vocabularyData.find(function (v) {
          if (!v.english) return false;
          var vWord = v.english.word.toLowerCase();
          if (vWord.includes(lowerWord) || lowerWord.includes(vWord)) {
            if (Math.abs(vWord.length - lowerWord.length) <= 3) {
              return true;
            }
          }
          return false;
        });
        if (fuzzyMatch2 && fuzzyMatch2.english && fuzzyMatch2.english.ipa) return fuzzyMatch2.english.ipa;
      }
    }
    
    return '';
  },

  // Compare words at word level with IPA and status
  compareShadowingWords: function (targetText, spokenText) {
    if (!spokenText) return [];
    var targetWords = targetText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);
    var spokenWords = spokenText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);

    var results = [];
    targetWords.forEach(function (word) {
      var ipa = VstepView.getWordIPA(word);
      var status = 'wrong';
      var spokenWord = spokenWords.find(function (w) { return w === word.toLowerCase(); });
      
      if (spokenWord) {
        status = 'correct';
      } else {
        // Check for near miss using Levenshtein distance
        var minDiff = Infinity;
        spokenWords.forEach(function (sw) {
          var diff = VstepView._levenshtein(word.toLowerCase(), sw);
          var maxLength = Math.max(word.length, sw.length);
          var diffPercent = maxLength > 0 ? (diff / maxLength) * 100 : 100;
          if (diffPercent < 20) {
            status = 'correct';
          } else if (diffPercent >= 20 && diffPercent <= 50 && status !== 'correct') {
            status = 'nearmiss';
          }
        });
      }
      
      results.push({
        word: word,
        ipa: ipa,
        status: status,
        spoken: spokenWord || ''
      });
    });

    return results;
  },

  speakShadowingSample: function (idx) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Get text from the active card's data attribute
      var activeCard = document.querySelector('.glass-card.active[data-sent-text]');
      var text = activeCard ? activeCard.getAttribute('data-sent-text') : '';
      if (!text) {
        // Fallback: find by index
        var cards = document.querySelectorAll('.glass-card[data-sent-text]');
        if (cards[idx]) {
          text = cards[idx].getAttribute('data-sent-text');
        }
      }
      if (!text) {
        console.warn('Could not find shadowing text for index', idx);
        return;
      }
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = this.listening.shadowingSpeed || 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt không hỗ trợ phát âm mẫu tiếng Anh.");
    }
  },

  toggleShadowingRecording: function (idx) {
    var s = this.listening;
    var self = this;
    var currentPrefix = s.currentPart + "_" + s.currentExercise + "_";
    var key = currentPrefix + idx;

    // Get target text from DOM
    var activeCard = document.querySelector('.glass-card.active[data-sent-text]');
    var targetText = activeCard ? activeCard.getAttribute('data-sent-text') : '';
    if (!targetText) {
      var cards = document.querySelectorAll('.glass-card[data-sent-text]');
      if (cards[idx]) {
        targetText = cards[idx].getAttribute('data-sent-text');
      }
    }
    if (!targetText) {
      console.warn('Could not find shadowing text for index', idx);
      return;
    }

    if (s.shadowingRecording) {
      if (s.shadowingRecognition) s.shadowingRecognition.stop();
      if (s.shadowingMediaRecorder && s.shadowingMediaRecorder.state !== 'inactive') {
        s.shadowingMediaRecorder.stop();
      }
      s.shadowingRecording = false;
      var ws = document.getElementById("vstep-workspace");
      if (ws) ws.innerHTML = this.renderSection("listening");
    } else {
      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      var startShadowingRec = function (stream) {
        s.shadowingAudioChunks = [];
        var mediaRecorder = null;
        if (stream) {
          try {
            mediaRecorder = new MediaRecorder(stream);
            s.shadowingMediaRecorder = mediaRecorder;
            mediaRecorder.ondataavailable = function (e) {
              if (e.data && e.data.size > 0) s.shadowingAudioChunks.push(e.data);
            };
            mediaRecorder.onstop = function () {
              var blob = new Blob(s.shadowingAudioChunks, { type: 'audio/webm' });
              if (!s.shadowingResults[key]) s.shadowingResults[key] = {};
              if (s.shadowingResults[key].audioUrl) {
                URL.revokeObjectURL(s.shadowingResults[key].audioUrl);
              }
              s.shadowingResults[key].audioUrl = URL.createObjectURL(blob);
              stream.getTracks().forEach(function (t) { t.stop(); });
              var wsFin = document.getElementById("vstep-workspace");
              if (wsFin) wsFin.innerHTML = self.renderSection("listening");
              self.saveState();
            };
            mediaRecorder.start();
          } catch (err) {
            console.warn("Shadowing MediaRecorder error:", err);
          }
        }

        if (!SpeechRecognition) {
          s.shadowingRecording = true;
          var ws = document.getElementById("vstep-workspace");
          if (ws) ws.innerHTML = self.renderSection("listening");
          setTimeout(function () {
            s.shadowingRecording = false;
            if (!s.shadowingResults[key]) s.shadowingResults[key] = {};
            s.shadowingResults[key].practiced = true;
            s.shadowingResults[key].transcript = "(Trình duyệt không hỗ trợ Speech-to-Text)";
            s.shadowingResults[key].accuracy = 50;
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop();
            } else {
              var wse = document.getElementById("vstep-workspace");
              if (wse) wse.innerHTML = self.renderSection("listening");
              self.saveState();
            }
          }, 4000);
          return;
        }

        var recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
        s.shadowingRecognition = recognition;
        s.shadowingRecording = true;

        var finalTranscript = "";
        recognition.onresult = function (event) {
          if (event.results && event.results[0]) {
            finalTranscript = event.results[0][0].transcript;
          }
        };

        recognition.onend = function () {
          s.shadowingRecording = false;
          if (!s.shadowingResults[key]) s.shadowingResults[key] = {};
          s.shadowingResults[key].practiced = true;
          s.shadowingResults[key].transcript = finalTranscript;
          s.shadowingResults[key].accuracy = VstepView.calculateAccuracy(targetText, finalTranscript);

          if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          } else {
            var we = document.getElementById("vstep-workspace");
            if (we) we.innerHTML = self.renderSection("listening");
            self.saveState();
          }
        };

        recognition.start();
        var workspaceEl = document.getElementById("vstep-workspace");
        if (workspaceEl) workspaceEl.innerHTML = self.renderSection("listening");
      };

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function (stream) { startShadowingRec(stream); })
          .catch(function (err) {
            console.warn("Shadowing mic access denied:", err);
            startShadowingRec(null);
          });
      } else {
        startShadowingRec(null);
      }
    }
  },

  playShadowingVoice: function (idx) {
    var s = this.listening;
    var currentPrefix = s.currentPart + "_" + s.currentExercise + "_";
    var key = currentPrefix + idx;
    var res = s.shadowingResults[key];
    if (res && res.audioUrl) {
      var audio = new Audio(res.audioUrl);
      audio.play().catch(function (e) { console.error(e); });
    }
  },

  translateShadowingSentence: async function (idx) {
    var s = this.listening;
    var currentPrefix = s.currentPart + "_" + s.currentExercise + "_";
    var key = currentPrefix + idx;

    // Get text from the active card's data attribute
    var activeCard = document.querySelector('.glass-card.active[data-sent-text]');
    var text = activeCard ? activeCard.getAttribute('data-sent-text') : '';
    if (!text) {
      var cards = document.querySelectorAll('.glass-card[data-sent-text]');
      if (cards[idx]) {
        text = cards[idx].getAttribute('data-sent-text');
      }
    }
    if (!text) {
      console.warn('Could not find shadowing text for index', idx);
      return;
    }

    if (!s.shadowingResults[key]) s.shadowingResults[key] = {};

    if (s.shadowingResults[key].translation) {
      s.shadowingResults[key].translation = "";
      var ws = document.getElementById("vstep-workspace");
      if (ws) ws.innerHTML = this.renderSection("listening");
      return;
    }

    var prompt = "Dịch câu tiếng Anh sau sang tiếng Việt thật tự nhiên, chính xác, không kèm giải thích hay thêm bất cứ từ nào khác: \"" + text + "\"";
    try {
      s.shadowingResults[key].translation = "Đang dịch...";
      var ws = document.getElementById("vstep-workspace");
      if (ws) ws.innerHTML = this.renderSection("listening");

      var translation = await GeminiService.callGemini(prompt, false, 256);
      s.shadowingResults[key].translation = translation.trim();
    } catch (e) {
      s.shadowingResults[key].translation = "Không thể dịch: " + e.message;
    }

    var wsFin = document.getElementById("vstep-workspace");
    if (wsFin) wsFin.innerHTML = this.renderSection("listening");
  },

  changeShadowingSpeed: function (val) {
    this.listening.shadowingSpeed = parseFloat(val);
  },

  resetShadowingProgress: function () {
    var s = this.listening;
    var currentPrefix = s.currentPart + "_" + s.currentExercise + "_";
    Object.keys(s.shadowingResults).forEach(function (k) {
      if (k.indexOf(currentPrefix) === 0) {
        if (s.shadowingResults[k].audioUrl) {
          URL.revokeObjectURL(s.shadowingResults[k].audioUrl);
        }
        delete s.shadowingResults[k];
      }
    });
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
    this.saveState();
  },

  selectShadowingSentence: function (idx, event) {
    if (event.target.closest("button, select, input, textarea")) return;
    this.listening.shadowingIndex = idx;
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("listening");
  },

  // Get local word details (meanings, examples, etc.)
  getLocalWordDetails: function (word) {
    if (!word) return null;
    var lower = word.toLowerCase().trim();
    if (window.VstepVocabData) {
      var match = VstepVocabData.find(function (v) {
        return v.word.toLowerCase() === lower;
      });
      if (match) {
        return {
          word: match.word,
          ipa: match.ipa,
          meaning: match.meaningVi,
          example: match.example,
          level: match.level,
          topic: match.topic
        };
      }
    }
    if (window.vocabularyData) {
      var match2 = vocabularyData.find(function (v) {
        return v.english && v.english.word.toLowerCase() === lower;
      });
      if (match2) {
        return {
          word: match2.english.word,
          ipa: match2.english.ipa,
          meaning: match2.vietnamese || match2.meaningVi || '',
          example: match2.english.example || '',
          level: match2.level || '',
          topic: match2.topic || ''
        };
      }
    }
    return null;
  },

  // Read word out loud using Web Speech Synthesis or Dictionary Audio
  speakWord: function (word, audioUrl) {
    if (audioUrl) {
      var audio = new Audio(audioUrl);
      audio.play().catch(function () {
        VstepView.speakWord(word, "");
      });
    } else if ('speechSynthesis' in window) {
      var utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  },

  // Render popup details
  renderWordDictPopupContent: function (cleanWord, wordName, phonetic, audioUrl, meaningHtml, localTranslationHtml) {
    var popup = document.getElementById("word-dict-popup");
    if (!popup) return;
    
    var soundIcon = `
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="vertical-align:middle;">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
      </svg>
    `;
    
    var audioButton = `
      <button class="btn btn-secondary" style="padding:0.25rem 0.5rem;font-size:0.75rem;display:inline-flex;align-items:center;gap:0.25rem;" onclick="VstepView.speakWord('${cleanWord.replace(/'/g, "\\'")}', '${audioUrl || ""}')">
        ${soundIcon} Đọc
      </button>
    `;
    
    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;border-bottom:1px solid var(--border-color);padding-bottom:0.5rem;">
        <div>
          <h4 style="margin:0;font-size:1.1rem;font-weight:700;color:var(--text-primary);display:inline-block;margin-right:0.5rem;">${wordName}</h4>
          ${phonetic ? `<span style="font-size:0.8rem;color:var(--text-muted);font-family:monospace;margin-right:0.5rem;">${phonetic}</span>` : ""}
        </div>
        <div style="display:flex;align-items:center;gap:0.35rem;">
          ${audioButton}
          <span onclick="document.getElementById('word-dict-popup').remove()" style="cursor:pointer;font-size:1.2rem;opacity:0.6;line-height:1;margin-left:0.25rem;padding:0.1rem 0.3rem;">&times;</span>
        </div>
      </div>
      <div style="max-height:180px;overflow-y:auto;padding-right:0.25rem;margin-bottom:0.25rem;">
        ${meaningHtml}
      </div>
      ${localTranslationHtml}
      <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color);">
        <p style="font-size:0.72rem;color:var(--text-muted);margin:0 0 0.5rem 0;font-weight:600;">Xem các từ điển khác</p>
        <div style="display:flex;gap:0.5rem;">
          <a href="https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(cleanWord.toLowerCase())}" target="_blank" rel="noopener"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:0.35rem;padding:0.35rem 0.5rem;border-radius:8px;font-size:0.75rem;font-weight:700;text-decoration:none;background:#E97E2A;color:#fff;transition:opacity 0.15s;"
            onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            Oxford
          </a>
          <a href="https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(cleanWord.toLowerCase())}" target="_blank" rel="noopener"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:0.35rem;padding:0.35rem 0.5rem;border-radius:8px;font-size:0.75rem;font-weight:700;text-decoration:none;background:#2D68C4;color:#fff;transition:opacity 0.15s;"
            onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            Cambridge
          </a>
        </div>
      </div>
    `;
  },

  // Ask Gemini to translate word definitions to Vietnamese
  translateWordWithGemini: async function (word) {
    var container = document.getElementById("gemini-translate-container");
    if (!container) return;
    
    container.innerHTML = `
      <div style="display:inline-block;width:16px;height:16px;border:2px solid var(--border-color);border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite;vertical-align:middle;margin-right:0.35rem;"></div>
      <span style="font-size:0.8rem;color:var(--text-muted);">Gemini đang dịch...</span>
    `;
    
    var prompt = "Giải nghĩa ngắn gọn từ tiếng Anh '" + word + "' sang tiếng Việt. Cung cấp dạng từ (part of speech), nghĩa tiếng Việt ngắn gọn, phát âm IPA Mỹ, và 1 câu ví dụ song ngữ Anh-Việt. Trả về dưới định dạng JSON với các trường: 'pos' (dạng từ, ví dụ 'noun' hoặc 'danh từ'), 'vietnamese' (nghĩa ngắn gọn), 'ipa' (phiên âm), 'exampleEn' (câu ví dụ tiếng Anh), 'exampleVi' (dịch câu ví dụ). Trả về duy nhất JSON, không bọc markdown hay ghi chú gì thêm.";
    
    try {
      var responseText = await GeminiService.callGemini(prompt, true, 512);
      var cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      var result = JSON.parse(cleaned);
      
      container.innerHTML = `
        <div style="text-align:left;background:rgba(99,102,241,0.08);padding:0.75rem;border-radius:8px;border-left:3px solid var(--accent);margin-top:0.5rem;box-shadow:inset 0 0 10px rgba(0,0,0,0.2);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.25rem;">
            <span style="font-size:0.7rem;font-weight:700;text-transform:uppercase;color:var(--accent);">${result.pos || 'vocabulary'}</span>
            ${result.ipa ? `<span style="font-size:0.78rem;font-family:monospace;color:var(--text-muted);">${result.ipa}</span>` : ""}
          </div>
          <p style="font-size:0.88rem;font-weight:600;margin:0 0 0.35rem 0;color:var(--text-primary);">${result.vietnamese || "Không rõ nghĩa"}</p>
          ${result.exampleEn ? `
            <p style="font-size:0.78rem;margin:0.2rem 0 0 0;color:var(--text-muted);line-height:1.3;"><strong>Ví dụ:</strong> ${result.exampleEn}</p>
            <p style="font-size:0.75rem;margin:0 0 0 0;color:rgba(255,255,255,0.4);font-style:italic;">${result.exampleVi || ""}</p>
          ` : ""}
        </div>
      `;
    } catch (e) {
      container.innerHTML = `
        <p style="font-size:0.75rem;color:#ef4444;margin:0.25rem 0 0 0;">Không thể dịch với Gemini: ${e.message}</p>
        <button class="btn btn-secondary" style="font-size:0.72rem;padding:0.2rem 0.5rem;margin-top:0.25rem;" onclick="VstepView.translateWordWithGemini('${word}')">Thử lại</button>
      `;
    }
  },

  // Open right-click dictionary popup
  showWordDictionaryPopup: function (word, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    var existing = document.getElementById("word-dict-popup");
    if (existing) existing.remove();
    
    var cleanWord = word.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    
    var popup = document.createElement("div");
    popup.id = "word-dict-popup";
    popup.style.cssText = "position:fixed;z-index:10000;width:340px;background:var(--card-bg, #1a1625);border:1px solid var(--border-color);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.5);padding:1.25rem;color:var(--text-primary);font-family:sans-serif;backdrop-filter:blur(8px);transition:all 0.2s ease;";
    
    var x = event ? event.clientX : window.innerWidth / 2 - 170;
    var y = event ? event.clientY : window.innerHeight / 2 - 150;
    
    if (x + 340 > window.innerWidth) x = window.innerWidth - 350;
    if (x < 10) x = 10;
    if (y + 250 > window.innerHeight) y = window.innerHeight - 270;
    if (y < 10) y = 10;
    
    popup.style.left = x + "px";
    popup.style.top = y + "px";
    
    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
        <h4 style="margin:0;font-size:1.1rem;font-weight:700;color:var(--accent);">"${cleanWord}"</h4>
        <span onclick="document.getElementById('word-dict-popup').remove()" style="cursor:pointer;font-size:1.2rem;opacity:0.6;line-height:1;">&times;</span>
      </div>
      <div style="text-align:center;padding:1rem 0;">
        <div style="display:inline-block;width:24px;height:24px;border:3px solid var(--border-color);border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;margin-bottom:0;">Đang tra từ điển...</p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    var localData = VstepView.getLocalWordDetails ? VstepView.getLocalWordDetails(cleanWord) : null;
    
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(cleanWord.toLowerCase()))
      .then(function (res) {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(function (data) {
        var entry = data[0];
        var wordName = entry.word;
        var phonetic = entry.phonetic || (entry.phonetics && entry.phonetics.find(function(p) { return p.text; })?.text) || VstepView.getWordIPA(cleanWord) || "";
        
        var audioUrl = "";
        if (entry.phonetics) {
          var pAudio = entry.phonetics.find(function (p) { return p.audio; });
          if (pAudio) audioUrl = pAudio.audio;
        }
        
        var meaningHtml = "";
        if (entry.meanings) {
          entry.meanings.slice(0, 2).forEach(function (m) {
            meaningHtml += `<div style="margin-top:0.5rem;">`;
            meaningHtml += `<span style="font-size:0.7rem;font-weight:700;text-transform:uppercase;color:var(--accent);background:rgba(168,85,247,0.15);padding:0.1rem 0.35rem;border-radius:4px;margin-right:0.25rem;">${m.partOfSpeech}</span>`;
            if (m.definitions && m.definitions[0]) {
              meaningHtml += `<p style="font-size:0.85rem;margin:0.25rem 0 0 0;line-height:1.4;">${m.definitions[0].definition}</p>`;
              if (m.definitions[0].example) {
                meaningHtml += `<p style="font-size:0.78rem;font-style:italic;color:var(--text-muted);margin:0.15rem 0 0 0;">Ex: ${m.definitions[0].example}</p>`;
              }
            }
            meaningHtml += `</div>`;
          });
        }
        
        var localTranslationHtml = "";
        if (localData && localData.meaning) {
          localTranslationHtml = `
            <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px dashed var(--border-color);">
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Nghĩa tiếng Việt:</span>
              <p style="font-size:0.9rem;font-weight:600;color:var(--text-primary);margin:0.2rem 0 0 0;">${localData.meaning}</p>
              ${localData.level ? `<span style="font-size:0.7rem;background:rgba(16,185,129,0.15);color:var(--accent);padding:0.1rem 0.35rem;border-radius:4px;display:inline-block;margin-top:0.25rem;font-weight:700;">Level ${localData.level}</span>` : ""}
            </div>
          `;
        } else {
          localTranslationHtml = `
            <div id="gemini-translate-container" style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px dashed var(--border-color);text-align:center;">
              <button class="btn btn-secondary" style="font-size:0.75rem;padding:0.25rem 0.6rem;width:100%;" onclick="VstepView.translateWordWithGemini('${cleanWord}')">
                ✨ Dịch nghĩa tiếng Việt với Gemini
              </button>
            </div>
          `;
        }
        
        VstepView.renderWordDictPopupContent(cleanWord, wordName, phonetic, audioUrl, meaningHtml, localTranslationHtml);
      })
      .catch(function (err) {
        var phonetic = VstepView.getWordIPA(cleanWord) || "";
        var meaningHtml = `<p style="font-size:0.85rem;color:var(--text-muted);margin:0.5rem 0 0 0;">Không tìm thấy định nghĩa trong từ điển online.</p>`;
        
        var localTranslationHtml = "";
        if (localData && localData.meaning) {
          localTranslationHtml = `
            <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px dashed var(--border-color);">
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Nghĩa tiếng Việt:</span>
              <p style="font-size:0.9rem;font-weight:600;color:var(--text-primary);margin:0.2rem 0 0 0;">${localData.meaning}</p>
              ${localData.example ? `<p style="font-size:0.78rem;font-style:italic;color:var(--text-muted);margin:0.15rem 0 0 0;">Ví dụ: ${localData.example}</p>` : ""}
            </div>
          `;
        } else {
          localTranslationHtml = `
            <div id="gemini-translate-container" style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px dashed var(--border-color);text-align:center;">
              <button class="btn btn-secondary" style="font-size:0.75rem;padding:0.25rem 0.6rem;width:100%;" onclick="VstepView.translateWordWithGemini('${cleanWord}')">
                ✨ Dịch nghĩa tiếng Việt với Gemini
              </button>
            </div>
          `;
        }
        
        VstepView.renderWordDictPopupContent(cleanWord, cleanWord, phonetic, "", meaningHtml, localTranslationHtml);
      });
      
      var outsideClickListener = function (e) {
        var p = document.getElementById("word-dict-popup");
        if (p && !p.contains(e.target) && e.target.id !== "word-dict-popup") {
          p.remove();
          document.removeEventListener("mousedown", outsideClickListener);
        }
      };
      setTimeout(function () {
        document.addEventListener("mousedown", outsideClickListener);
      }, 100);
  },

  // ------------------------------------------------------------------
  // WRITING SECTION
  // ------------------------------------------------------------------
  renderWritingSection: function () {
    var data = VstepWritingData;
    var ws = this.writing;
    var taskObj = data[ws.task];
    var tests = taskObj.tests;
    var guides = taskObj.guides;
    if (ws.testIndex >= tests.length) ws.testIndex = 0;
    var currentTest = tests[ws.testIndex];

    var minWords = ws.task === "task1" ? 120 : 250;
    var maxWords = ws.task === "task1" ? 180 : 350;
    var currentCount = ws.userText ? ws.userText.trim().split(/\s+/).length : 0;

    var wcPercent = Math.min(100, Math.round((currentCount / minWords) * 100));
    var wcColor = currentCount === 0 ? "var(--text-muted)" : currentCount < minWords ? "#ef4444" : currentCount > maxWords ? "#f59e0b" : "var(--accent)";
    var wcPctColor = currentCount < minWords ? "#ef4444" : currentCount > maxWords ? "#f59e0b" : "var(--accent)";
    var wcMsg = currentCount === 0 ? "Hãy bắt đầu viết" : currentCount < minWords ? "Cần thêm " + (minWords - currentCount) + " từ nữa" : currentCount > maxWords ? "Quá dài! Nên viết tối đa " + maxWords + " từ" : "Tốt! Đủ độ dài yêu cầu";

    // Check for saved draft
    var draftKey = 'writing_' + ws.task + '_' + ws.testIndex;
    var draft = window.DraftManager && DraftManager.load(draftKey);
    var hasDraft = draft && draft.userText && draft.userText.trim().length > 0;
    var draftRestoreHtml = hasDraft ? 
      '<div id="draft-restore-banner" style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:0.75rem;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">' +
      '<div style="font-size:0.85rem;color:var(--text-primary);">' +
      '<strong>📝 Bản nháp tự động</strong> — ' + (draft.wordCount || 0) + ' từ | ' +
      new Date(draft.timestamp).toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'}) +
      '</div>' +
      '<div style="display:flex;gap:0.5rem;">' +
      '<button class="btn btn-primary" style="font-size:0.75rem;padding:0.35rem 0.7rem;" onclick="VstepView.restoreDraft(\'' + draftKey + '\')">Khôi phục</button>' +
      '<button class="btn btn-secondary" style="font-size:0.75rem;padding:0.35rem 0.7rem;" onclick="VstepView.dismissDraft(\'' + draftKey + '\')">Bỏ qua</button>' +
      '</div>' +
      '</div>' : '';

    var wordCountHtml =
      '<div style="display:flex;flex-direction:column;gap:0.35rem;margin-top:0.5rem;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
      '<span id="word-count-display" style="font-size:0.85rem;color:' + wcColor + ';font-weight:600;">' +
      currentCount + ' / ' + (ws.task === "task1" ? 120 : 250) + ' từ</span>' +
      '<span style="font-size:0.75rem;color:' + wcPctColor + ';" id="wc-message">' + wcMsg + '</span>' +
      '</div>' +
      '<div style="position:relative;height:6px;background:var(--bg-input);border-radius:9999px;overflow:hidden;">' +
      '<div id="wc-progress-bar" style="height:100%;width:' + wcPercent + '%;background:' + wcColor + ';border-radius:9999px;transition:width 0.2s ease;"></div>' +
      '</div>' +
      '</div>';

    var evalContent = ws.result
      ? (ws.renderedResultHtml && ws.renderedFeedbackData
          ? (window.writingFeedbackData = ws.renderedFeedbackData, ws.renderedResultHtml)
          : this.renderWritingResult(ws.result))
      : '<div style="text-align:center;padding:2rem;color:var(--text-muted);"><div style="font-size:3rem;margin-bottom:1rem;"><svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><h3 style="font-size:1.1rem;margin-bottom:0.75rem;">Ch\u1ea5m \u0111i\u1ec3m AI VSTEP</h3><p style="font-size:0.9rem;line-height:1.5;">Vi\u1ebft b\u00e0i xong v\u00e0 b\u1ea5m n\u00fat <strong>"Ch\u1ea5m \u0111i\u1ec3m b\u1eb1ng AI"</strong> \u0111\u1ec3 nh\u1eadn \u0111\u00e1nh gi\u00e1 chi ti\u1ebft theo ti\u00eau ch\u00ed VSTEP.</p><p style="font-size:0.85rem;margin-top:0.75rem;color:var(--text-muted);">' +
        (GeminiService.getApiKey()
          ? "\u0110\u00e3 c\u1ea5u h\u00ecnh API Key - S\u1ebd ch\u1ea5m b\u1eb1ng AI Gemini th\u1ef1c t\u1ebf"
          : "Ch\u01b0a c\u00f3 API Key - S\u1ebd ch\u1ea5m b\u1eb1ng AI offline") +
        "</p></div>";

    var sidebarGuideIds =
      ws.task === "task1"
        ? ["classification", "steps", "criteria"]
        : ["structure", "essaySteps", "essayCriteria"];
    var sidebarGuides = [];
    var toggleGuides = [];
    for (var gi = 0; gi < guides.length; gi++) {
      if (sidebarGuideIds.indexOf(guides[gi].id) >= 0) {
        sidebarGuides.push(guides[gi]);
      } else {
        toggleGuides.push(guides[gi]);
      }
    }

    var sidebarHtml = sidebarGuides
      .map(function (g) {
        var isOpen = ws.showGuide === g.id;
        return (
          '<div style="margin-bottom:0.75rem;">' +
          '<div style="cursor:pointer;font-size:0.8rem;font-weight:600;color:var(--primary);padding:0.4rem 0;display:flex;justify-content:space-between;align-items:center;" onclick="VstepView.toggleWritingGuide(\'' +
          g.id +
          "')\">" +
          "<span>\u2139\ufe0f " +
          g.title +
          "</span>" +
          '<span style="font-size:0.7rem;">' +
          (isOpen ? "\u25BC" : "\u25B6") +
          "</span></div>" +
          (isOpen
            ? '<div style="padding:0.5rem 0 0 0;font-size:0.8rem;line-height:1.6;">' +
              g.content +
              "</div>"
            : "") +
          "</div>"
        );
      })
      .join("");

    var guideToggleBtns = toggleGuides
      .map(function (g) {
        var isOpen = ws.showGuide === g.id;
        var shortTitle = g.title.replace(/^(HƯỚNG DẪN\s*)+/i, "").trim();
        return (
          '<button class="btn ' +
          (isOpen ? "btn-accent" : "btn-secondary") +
          '" style="font-size:0.7rem;padding:0.3rem 0.6rem;" onclick="VstepView.toggleWritingGuide(\'' +
          g.id +
          '\')" title="Xem h\u01b0\u1edbng d\u1eabn">! ' +
          shortTitle.substring(0, 20) +
          "...</button>"
        );
      })
      .join("");

    var guideContent = "";
    if (ws.showGuide) {
      var foundGuide = null;
      for (var gi2 = 0; gi2 < guides.length; gi2++) {
        if (guides[gi2].id === ws.showGuide) {
          foundGuide = guides[gi2];
          break;
        }
      }
      if (foundGuide && sidebarGuideIds.indexOf(foundGuide.id) < 0) {
        guideContent =
          '<div style="padding:1rem;background:rgba(245,158,11,0.08);border-radius:8px;margin-bottom:1rem;border-left:4px solid #f59e0b;font-size:0.9rem;line-height:1.7;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">' +
          '<p style="font-weight:700;font-size:0.95rem;color:#f59e0b;">\u2139\ufe0f ' +
          foundGuide.title +
          "</p>" +
          '<button class="btn btn-secondary" style="font-size:0.7rem;padding:0.2rem 0.5rem;" onclick="VstepView.toggleWritingGuide(\'' +
          foundGuide.id +
          "')\">\u2716</button></div>" +
          foundGuide.content +
          "</div>";
      }
    }

    var testOpts = tests
      .map(function (t, i) {
        var testId = ws.task + "_" + i;
        var isCompleted = ws.completedTests && ws.completedTests[testId] && ws.completedTests[testId].submitted;
        var scoreDisplay = isCompleted 
          ? ' ✓ ' + (ws.completedTests[testId].score || '?')
          : '';
        return (
          '<option value="' +
          i +
          '" ' +
          (i === ws.testIndex ? "selected" : "") +
          ">\u0110\u1ec1 s\u1ed1 " +
          t.number +
          scoreDisplay +
          "</option>"
        );
      })
      .join("");

    var outlineHtml = currentTest.outline
      ? '<details style="margin-top:0.75rem;"><summary style="cursor:pointer;font-size:0.85rem;color:var(--primary);">D\u00e0n \u00fd chi ti\u1ebft</summary><div style="padding:0.75rem;background:rgba(59,130,246,0.06);border-radius:8px;margin-top:0.5rem;font-size:0.85rem;line-height:1.7;">' +
        currentTest.outline +
        "</div></details>"
      : "";

    var historyCount = ws.essayHistory ? Object.keys(ws.essayHistory).length : 0;

    var templateHtml = ws.showTemplates
      ? '<div style="margin-bottom:1rem;padding:1rem;background:rgba(59,130,246,0.06);border-radius:8px;border-left:4px solid var(--primary);"><h4 style="font-size:0.85rem;margin-bottom:0.5rem;color:var(--primary);">Kho mẫu câu</h4><div style="font-size:0.8rem;line-height:1.6;">Chọn mẫu câu từ danh sách bên dưới để chèn vào bài viết.</div></div>'
      : "";

    var historyHtml = ws.showHistory
      ? '<div style="margin-bottom:1rem;padding:1rem;background:rgba(16,185,129,0.06);border-radius:8px;border-left:4px solid var(--accent);"><h4 style="font-size:0.85rem;margin-bottom:0.5rem;color:var(--accent);">Lịch sử bài viết</h4><div style="font-size:0.8rem;line-height:1.6;">Xem lại các bài viết đã lưu trước đây.</div></div>'
      : "";

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;">\n          <div>\n            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">' +
      taskObj.title +
      '</h2>\n            <p style="font-size:0.85rem;color:var(--text-muted);">' +
      taskObj.description +
      '</p>\n          </div>\n          <div style="display:flex;gap:0.75rem;align-items:center;">\n            \n            <button class="btn ' +
      (ws.task === "task1" ? "btn-primary" : "btn-secondary") +
      '" onclick="VstepView.setWritingTask(\'task1\')" style="font-size:0.8rem;padding:0.4rem 0.75rem;">Task 1 (Th\u01b0)</button>\n            <button class="btn ' +
      (ws.task === "task2" ? "btn-primary" : "btn-secondary") +
      '" onclick="VstepView.setWritingTask(\'task2\')" style="font-size:0.8rem;padding:0.4rem 0.75rem;">Task 2 (Lu\u1eadn)</button>\n          </div>\n        </div>\n        <div style="margin-top:0.75rem;">\n          <div class="progress-bar-container" style="height:4px;">\n            <div style="height:100%;background:var(--accent);border-radius:9999px;width:' +
      (this.writing.completedTests && Object.keys(this.writing.completedTests).length > 0 ? Math.round((Object.keys(this.writing.completedTests).length / (VstepWritingData.task1.tests.length + VstepWritingData.task2.tests.length)) * 100) : 0) +
      '%;"></div>\n          </div>\n          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">Đã hoàn thành ' +
      (this.writing.completedTests ? Object.keys(this.writing.completedTests).length : 0) +
      ' / ' +
      (VstepWritingData.task1.tests.length + VstepWritingData.task2.tests.length) +
      ' đề (tổng cả Task 1 & Task 2)</p>\n        </div>\n      </div>\n\n      <div class="writing-layout" style="display:grid;grid-template-columns:1fr 280px;gap:1rem;align-items:start;">\n        <div>\n          <div class="glass-card" style="margin-bottom:1rem;padding:0.75rem 1rem;border-color:rgba(245,158,11,0.2);">\n            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">\n              <span style="font-size:0.85rem;font-weight:600;">H\u01b0\u1edbng d\u1eabn & T\u00e0i li\u1ec7u tham kh\u1ea3o</span>\n            </div>\n            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">' +
      guideToggleBtns +
      "</div>\n            " +
      guideContent +
      '\n          </div>\n          <div class="glass-card" style="margin-bottom:1rem;background:rgba(168,85,247,0.05);border-color:rgba(168,85,247,0.2);">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">\n          <h4 style="font-size:1rem;">Luy\u1ec7n t\u1eadp</h4>\n          <select onchange="VstepView.setWritingTest(parseInt(this.value))" style="padding:0.4rem 0.6rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.85rem;max-width:200px;">' +
      testOpts +
      '</select>\n        </div>\n        <p style="white-space:pre-wrap;line-height:1.6;font-size:0.95rem;">' +
      currentTest.prompt +
      "</p>\n        " +
      outlineHtml +
      '\n        <details style="margin-top:0.75rem;"><summary style="cursor:pointer;font-size:0.85rem;color:var(--accent);">Xem b\u00e0i m\u1eabu</summary><div style="padding:0.75rem;background:rgba(16,185,129,0.06);border-radius:8px;margin-top:0.5rem;font-size:0.85rem;line-height:1.6;white-space:pre-wrap;border-left:4px solid var(--accent);">' +
      currentTest.sample +
      '</div></details>\n      </div>\n\n      <div class="writing-container">\n        <div class="writing-editor-panel">\n          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">\n            <h3 style="font-size:1rem;">B\u00e0i vi\u1ebft c\u1ee7a b\u1ea1n</h3>\n            <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">\n              <button class="btn ' +
      (ws.showTemplates ? "btn-accent" : "btn-secondary") +
      '" style="font-size:0.7rem;padding:0.25rem 0.5rem;" onclick="VstepView.toggleTemplateBank()" title="Kho m\u1eabu c\u00e2u">\uD83D\uDCCB M\u1eabu c\u00e2u</button>\n              <button class="btn ' +
      (ws.aiAssist ? "btn-accent" : "btn-secondary") +
      '" style="font-size:0.7rem;padding:0.25rem 0.5rem;" onclick="VstepView.toggleWritingAI()" title="H\u1ed7 tr\u1ee3 AI khi vi\u1ebft">' +
      (ws.aiAssist ? "\u2728 AI: B\u1eadt" : "\u2728 AI: T\u1eaft") +
      '</button>\n              <button class="btn ' +
      (ws.showHistory ? "btn-accent" : "btn-secondary") +
      '" style="font-size:0.7rem;padding:0.25rem 0.5rem;" onclick="VstepView.toggleEssayHistory()" title="L\u1ecbch s\u1eed b\u00e0i vi\u1ebft">\uD83D\uDCC4 L\u1ecbch s\u1eed' +
      (historyCount > 0 ? ' (' + historyCount + ')' : '') +
      '</button>\n              <button class="btn btn-secondary" style="font-size:0.7rem;padding:0.25rem 0.5rem;" onclick="VstepView.loadSampleAnswer()">T\u1ea3i m\u1eabu</button>\n            </div>\n          </div>\n          ' +
      templateHtml +
      historyHtml +
      '\n          ' + draftRestoreHtml +
      '\n          <div style="position:relative;">\n          <textarea id="writing-textarea" class="writing-textarea" placeholder="Vi\u1ebft b\u00e0i c\u1ee7a b\u1ea1n v\u00e0o \u0111\u00e2y..." oninput="VstepView.updateWordCount();VstepView.checkWritingSentence()" style="width:100%;min-height:280px;padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.95rem;line-height:1.7;resize:vertical;margin-top:0.5rem;">' +
      (ws.userText || "") +
      '</textarea>\n          </div>\n          <div id="writing-sentence-feedback" style="margin-top:0.5rem;">' +
      (ws.aiAssist && ws.sentenceFeedback.length > 0
        ? this.renderSentenceFeedback(ws.sentenceFeedback)
        : "") +
      '</div>\n          ' +
      wordCountHtml +
      '\n          <div class="writing-submit-bar">\n            <button class="btn btn-accent" id="grade-btn" onclick="VstepView.gradeWriting()" style="' +
      (currentCount < 30 ? 'opacity:0.5;' : '') +
      '" title="N\u1ed9p b\u00e0i vi\u1ebft \u0111\u1ec3 l\u01b0u k\u1ebft qu\u1ea3 v\u00e0 nh\u1eadn ch\u1ea5m \u0111i\u1ec3m AI">\uD83D\uDCE4 N\u1ed9p b\u00e0i & ch\u1ea5m AI</button>\n          </div>\n        </div>\n      </div>\n      <div class="writing-eval-panel" id="ai-eval-panel">\n        ' +
      evalContent +
      '\n      </div>\n        </div>\n        <div class="glass-card writing-sidebar" style="padding:0.75rem;">\n          <h4 style="font-size:0.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;border-bottom:1px solid var(--border-color);padding-bottom:0.5rem;">T\u00e0i li\u1ec7u tham kh\u1ea3o</h4>\n          ' +
      sidebarHtml +
      "\n        </div>\n      </div>\n    "
    );
  },

  renderWritingResult: function (result) {
    // Reset popup data so stale entries from other submissions never leak
    window.writingFeedbackData = {};

    var criteria = [
      { label: "Vocabulary", score: result.vocabulary },
      { label: "Grammar", score: result.grammar },
      { label: "Task Fulfillment", score: result.taskFulfillment },
      { label: "Organisation", score: result.organisation },
    ];
    var criteriaHtml = criteria
      .map(function (c) {
        return (
          '<div class="criteria-item">\n        <div class="criteria-header"><span>' +
          c.label +
          '</span><span style="color:var(--primary)">' +
          c.score +
          ' / 9.0</span></div>\n        <div class="progress-bar-container" style="height:6px;">\n          <div style="height:100%;background:var(--primary);border-radius:9999px;width:' +
          ((parseFloat(c.score) / 9) * 100).toFixed(0) +
          '%;transition:width 0.5s ease;"></div>\n        </div>\n      </div>'
        );
      })
      .join("");

    var feedbackHtml = "";
    var highlightedEssayHtml = "";
    
    if (result.ideaEvaluation || result.grammarErrors || result.ideaDevelopment) {
      var parseMarkdown = function(text) {
        return text
          .replace(/\n/g, '<br>')
          .replace(/\*([^*]+)\*/g, '<i>$1</i>');
      };
      var parseHighlight = function(text, highlightedWords) {
        if (!highlightedWords || highlightedWords.length === 0) return parseMarkdown(text);
        var escAttr = function(s) {
          return String(s == null ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        };
        var result = text;
        highlightedWords.forEach(function(hw) {
          var regex = new RegExp('\\[' + hw.word + '\\]', 'gi');
          result = result.replace(regex, '<span class="highlighted-word" data-explanation="' + escAttr(hw.explanation) + '">' + escAttr(hw.word) + '</span>');
        });
        return parseMarkdown(result);
      };
      
      // Highlight errors in the essay with multi-color system + user highlights
      var hasUserHighlights = Array.isArray(this.writing.userHighlights) && this.writing.userHighlights.length > 0;
      if ((Array.isArray(result.grammarErrors) && result.grammarErrors.length > 0) || hasUserHighlights) {
        var textarea = document.getElementById("writing-textarea");
        var essayText = textarea ? textarea.value : this.writing.userText || "";
        if (essayText) {
          // Generate or use existing submission ID for unique popup IDs
          if (!this.writing.submissionId) {
            this.writing.submissionId = 'submission_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          }
          var submissionId = this.writing.submissionId;

          var highlightedText = this.buildHighlightedEssay(
            essayText,
            result.grammarErrors,
            submissionId,
            this.writing.userHighlights || []
          );

          highlightedEssayHtml = '<div class="feedback-card"><div class="feedback-card-header" style="color:#8b5cf6;"><strong>📝 Bài viết với gợi ý chi tiết</strong></div>' +
            '<div class="highlighted-essay" data-hl-region="essay" style="margin:0.5rem 0 0 0;padding:0.75rem;background:var(--bg-input);border-radius:6px;white-space:pre-wrap;line-height:1.6;" onmousedown="VstepView.startUserHighlight(event)">' +
            highlightedText +
            '</div><div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.8rem;">Bấm vào từ được highlight để xem chi tiết gợi ý · Kéo chuột trên văn bản để tạo highlight cá nhân (tím)</div></div>';
        }
      }
      
      var structureHtml = "";
      if (result.ideaEvaluation) {
        var sa = result.ideaEvaluation;
        // Same plain-text source + label offsets are rebuilt by _regionPlainText
        // when the user drag-selects here, so offsets always match the render
        var ideasData = this._ideaRegionData(sa);
        var ideasHtml = this.buildHighlightedEssay(
          ideasData.source,
          [],
          '',
          this.writing.userHighlights || [],
          'ideas',
          ideasData.labels
        );
        structureHtml = '<div class="feedback-card"><div class="feedback-card-header" style="color:#8b5cf6;"><strong>💭 Đánh giá ý tưởng</strong></div>' +
          '<div class="highlighted-essay" data-hl-region="ideas" style="margin:0.5rem 0 0 0;padding:0.75rem;background:var(--bg-input);border-radius:6px;white-space:pre-wrap;line-height:1.6;" onmousedown="VstepView.startUserHighlight(event)">' +
          ideasHtml +
          '</div><div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.8rem;">Kéo chuột trên văn bản để tạo highlight cá nhân (tím)</div></div>';
      }
      
      var grammarHtml = "";
      if (result.grammarErrors && result.grammarErrors.length > 0) {
        grammarHtml = '<div class="feedback-card"><div class="feedback-card-header" style="color:#ef4444;"><strong>✗ Lỗi ngữ pháp</strong></div>' +
          '<div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.8rem;">Xem bài viết với highlight ở trên</div></div>';
      }
      
      var ideaHtml = "";
      if (Array.isArray(result.ideaDevelopment) && result.ideaDevelopment.length > 0) {
        var implSource = this._implRegionSource(result.ideaDevelopment);
        var implHtml = this.buildHighlightedEssay(
          implSource,
          [],
          '',
          this.writing.userHighlights || [],
          'impl'
        );
        ideaHtml = '<div class="feedback-card"><div class="feedback-card-header" style="color:#3b82f6;"><strong>💡 Triển khai ý tưởng</strong></div>' +
          '<div class="highlighted-essay" data-hl-region="impl" style="margin:0.5rem 0 0 0;padding:0.75rem;background:var(--bg-input);border-radius:6px;white-space:pre-wrap;line-height:1.6;" onmousedown="VstepView.startUserHighlight(event)">' +
          implHtml +
          '</div><div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.8rem;">Kéo chuột trên văn bản để tạo highlight cá nhân (tím)</div></div>';
      }
      
      feedbackHtml = '<div style="display:grid;gap:0.75rem;margin-top:1rem;">' + highlightedEssayHtml + structureHtml + grammarHtml + ideaHtml + '</div>';
    } else if (typeof result.feedback === "object" && result.feedback !== null) {
      var fb = result.feedback;
      var parseMarkdown = function(text) {
        return String(text || "")
          .replace(/\n/g, '<br>')
          .replace(/\*([^*]+)\*/g, '<i>$1</i>');
      };
      var strengthsHtml = Array.isArray(fb.strengths) && fb.strengths.length > 0
        ? '<div class="feedback-card"><div class="feedback-card-header" style="color:#10b981;"><strong>✓ Điểm mạnh</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">' +
          fb.strengths.map(function(s) { return '<li style="margin-bottom:0.25rem;">' + parseMarkdown(s) + '</li>'; }).join('') +
          '</ul></div>'
        : "";
      var errorsHtml = Array.isArray(fb.errors) && fb.errors.length > 0
        ? '<div class="feedback-card"><div class="feedback-card-header" style="color:#ef4444;"><strong>✗ Lỗi sai</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">' +
          fb.errors.map(function(e) { return '<li style="margin-bottom:0.25rem;">' + parseMarkdown(e) + '</li>'; }).join('') +
          '</ul></div>'
        : "";
      var suggestionsHtml = Array.isArray(fb.suggestions) && fb.suggestions.length > 0
        ? '<div class="feedback-card"><div class="feedback-card-header" style="color:#3b82f6;"><strong>💡 Gợi ý cải thiện</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">' +
          fb.suggestions.map(function(s) { return '<li style="margin-bottom:0.25rem;">' + parseMarkdown(s) + '</li>'; }).join('') +
          '</ul></div>'
        : "";
      feedbackHtml = '<div style="display:grid;gap:0.75rem;margin-top:1rem;">' + strengthsHtml + errorsHtml + suggestionsHtml + '</div>';
    } else {
      feedbackHtml = result.feedback;
    }

    return (
      '\n      <div class="vstep-score-summary">\n        <h3 style="font-size:1rem;color:var(--text-muted);">\u0110i\u1ec3m t\u1ed5ng k\u1ebft VSTEP</h3>\n        <div class="score-badge-circle">' +
      result.score +
      '</div>\n        <span class="badge badge-level">' +
      result.level +
      '</span>\n        <p style="font-size:0.85rem;color:var(--text-muted);">(' +
      result.wordCount +
      ' t\u1eeb)</p>\n      </div>\n      <div class="evaluation-criteria">\n        <h4 style="font-size:0.9rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Chi ti\u1ebft ti\u00eau ch\u00ed</h4>\n        ' +
      criteriaHtml +
      '\n      </div>\n      <div class="explanation-box" style="font-size:0.85rem;border-left-color:var(--accent);">\n        <strong>Nh\u1eadn x\u00e9t chi ti\u1ebft:</strong>\n        ' +
      (feedbackHtml || "") +
      this.renderC1VocabCard() +
      this.renderUserNotesCard() +
      "\n      </div>\n    "
    );
  },

  // Decoration options for user highlights: 6 colors, 6 label chips and 2
  // effects. Color/effect render as CSS classes, the label chip is rendered
  // via data-hl-label-text + CSS ::before so it never pollutes the text
  // stream that drag offsets are computed from.
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

  // Build the highlighted essay HTML combining AI highlight spans and
  // user-created highlights, and fill window.writingFeedbackData for popups.
  // User highlights are stored as character offsets into the plain essay
  // text; they are split into segments wherever they overlap an AI span.
  // `region` ('essay'|'ideas'|'impl') filters user highlights to the right
  // text; `labels` are section labels (e.g. "Opening:") rendered as bold
  // precedence spans that user highlights split around.
  buildHighlightedEssay: function (essayText, grammarErrors, submissionId, userHighlights, region, labels) {
    var self = this;
    region = region || 'essay';
    var escapeRe = /[.*+?^${}()|[\]\\]/g;
    var spans = [];

    // 1) AI error matches (every occurrence, same behavior as the old regex replace)
    (Array.isArray(grammarErrors) ? grammarErrors : []).forEach(function (error) {
      if (!error.original || !error.corrected) return;
      var regex = new RegExp(error.original.replace(escapeRe, '\\$&'), 'gi');
      var m;
      var occ = 0;
      while ((m = regex.exec(essayText)) !== null) {
        spans.push({
          start: m.index,
          end: m.index + m[0].length,
          kind: 'ai',
          id: submissionId + '_highlight_' + spans.length,
          type: error.type || 'error',
          original: error.original,
          corrected: error.corrected,
          explanation: error.explanation,
          category: error.category || 'Grammar'
        });
        occ++;
        if (m.index === regex.lastIndex) regex.lastIndex++;
      }
    });

    // 1b) Region section labels take precedence like AI spans
    (Array.isArray(labels) ? labels : []).forEach(function (lb, i) {
      var ls = Math.max(0, lb.start);
      var le = Math.min(essayText.length, lb.end);
      if (le <= ls) return;
      spans.push({ start: ls, end: le, kind: 'label', id: 'hl_label_' + region + '_' + i });
    });

    // 2) User highlight segments split around AI spans and other user spans
    // (AI always takes precedence; between overlapping user highlights the
    // newest wins, so process in reverse creation order)
    var aiSpans = spans.filter(function (s) { return s.kind === 'ai' || s.kind === 'label'; })
      .sort(function (a, b) { return a.start - b.start; });
    var taken = aiSpans.slice();
    (Array.isArray(userHighlights) ? userHighlights : []).slice().reverse().forEach(function (hl) {
      if ((hl.region || 'essay') !== region) return;
      var start = Math.max(0, hl.start);
      var end = Math.min(essayText.length, hl.end);
      if (end <= start) return;
      var cursor = start;
      var seg = 0;
      var beforeLen = spans.length;
      var idPrefix = region === 'essay' ? hl.id : hl.id + '_' + region;
      var segDeco = { color: hl.color || '', label: hl.label || '', effect: hl.effect || '' };
      taken.forEach(function (tk) {
        if (tk.end <= cursor || tk.start >= end) return;
        if (tk.start > cursor) {
          spans.push({ start: cursor, end: tk.start, kind: 'user', id: idPrefix + '_p' + seg, hlId: hl.id, note: hl.note || '', region: region, first: seg === 0, color: segDeco.color, label: segDeco.label, effect: segDeco.effect });
          seg++;
        }
        cursor = Math.max(cursor, tk.end);
      });
      if (cursor < end) {
        spans.push({ start: cursor, end: end, kind: 'user', id: idPrefix + '_p' + seg, hlId: hl.id, note: hl.note || '', region: region, first: seg === 0, color: segDeco.color, label: segDeco.label, effect: segDeco.effect });
      }
      for (var i = beforeLen; i < spans.length; i++) taken.push(spans[i]);
    });

    // 3) Merge all spans, resolve overlaps (later overlapping matches get clipped)
    spans.sort(function (a, b) { return a.start - b.start; });
    var html = "";
    var cursor = 0;
    var feedback = window.writingFeedbackData;
    spans.forEach(function (sp) {
      if (sp.end <= cursor) return;
      if (sp.start < cursor) sp.start = cursor;
      if (sp.start > cursor) html += self._escapeHtml(essayText.slice(cursor, sp.start));
      var text = essayText.slice(sp.start, sp.end);
      if (sp.kind === 'ai') {
        feedback[sp.id] = {
          type: sp.type,
          original: sp.original,
          corrected: sp.corrected,
          explanation: sp.explanation,
          category: sp.category
        };
        html += '<span class="writing-highlight ' + sp.type + '" id="' + sp.id + '" onclick="VstepView.showWritingFeedbackPopup(\'' + sp.id + '\', event)">' +
          self._escapeHtml(text) + '</span>';
      } else if (sp.kind === 'label') {
        html += '<span class="hl-region-label">' + self._escapeHtml(text) + '</span>';
      } else {
        feedback[sp.id] = {
          type: 'user',
          original: text,
          note: sp.note || '',
          hlId: sp.hlId,
          region: sp.region,
          color: sp.color || '',
          label: sp.label || '',
          effect: sp.effect || ''
        };
        var userCls = 'writing-highlight user';
        if (sp.color && sp.color !== 'purple') userCls += ' u-' + sp.color;
        if (sp.effect) userCls += ' hl-effect-' + sp.effect;
        var chipAttr = '';
        if (sp.label && sp.first) {
          var lb = self.HL_LABELS[sp.label];
          if (lb && lb.text) chipAttr = ' data-hl-label-text="' + self._escapeHtml(lb.icon + ' ' + lb.text) + '"';
        }
        html += '<span class="' + userCls + '"' + chipAttr + ' id="' + sp.id + '" onclick="VstepView.showWritingFeedbackPopup(\'' + sp.id + '\', event)">' +
          self._escapeHtml(text) + '</span>';
      }
      cursor = sp.end;
    });
    if (cursor < essayText.length) html += self._escapeHtml(essayText.slice(cursor));
    return html;
  },

  // Plain-text source of the "Đánh giá ý tưởng" region: "Opening: ...",
  // "Body: ...", "Conclusion: ..." joined with newlines, plus the bold label
  // offsets. No italics are rendered here, so any * markers from the AI are
  // stripped and CRLF is normalized (the browser folds CRLF to LF in text
  // nodes) — the source is exactly the rendered text, offsets always match.
  _ideaRegionData: function (sa) {
    var segs = [];
    var pairs = [["Opening", sa && sa.opening], ["Body", sa && sa.body], ["Conclusion", sa && sa.conclusion]];
    for (var i = 0; i < pairs.length; i++) {
      if (pairs[i][1] != null && String(pairs[i][1]) !== "") segs.push(pairs[i]);
    }
    var source = "";
    var labels = [];
    for (var j = 0; j < segs.length; j++) {
      if (j > 0) source += "\n";
      var start = source.length;
      source += segs[j][0] + ": ";
      labels.push({ start: start, end: start + segs[j][0].length + 2 });
      source += String(segs[j][1]).replace(/\r\n/g, "\n").replace(/\*/g, "");
    }
    return { source: source, labels: labels };
  },

  // Plain-text source of the "Triển khai ý tưởng" region: each suggestion on
  // its own line with a bullet prefix (* markers stripped, CRLF normalized)
  _implRegionSource: function (list) {
    return (Array.isArray(list) ? list : []).map(function (idea) {
      return "\u2022 " + String(idea).replace(/\r\n/g, "\n").replace(/\*/g, "");
    }).join("\n");
  },

  // Source of truth for drag selections in a given highlight region
  _regionPlainText: function (region) {
    var result = this.writing && this.writing.result;
    if (region === "ideas") {
      var d = this._ideaRegionData(result && result.ideaEvaluation);
      return d.source;
    }
    if (region === "impl") {
      return this._implRegionSource(result && result.ideaDevelopment);
    }
    var textarea = document.getElementById("writing-textarea");
    return textarea ? textarea.value : (this.writing.userText || "");
  },

  // Begin tracking a potential drag-to-highlight on the highlighted essay.
  // e.target can be a text node (no classList/closest) so climb to the
  // wrapping element first. Plain clicks (below the drag threshold) do nothing.
  startUserHighlight: function (e) {
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
    
    // Drop any stale drag state + listener from a previous drag that ended
    // outside the window (its mouseup never fired)
    if (this._userHlOnUp) {
      document.removeEventListener('mouseup', this._userHlOnUp);
      document.removeEventListener('touchend', this._userHlOnUp);
      this._userHlOnUp = null;
    }
    this._userHlDrag = { container: container, startX: clientX, startY: clientY };
    var onUp = function (ue) {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
      self._userHlOnUp = null;
      if (ue && ue.button !== 0 && ue.type !== 'touchend') return;
      self._finishUserHighlight(ue);
    };
    this._userHlOnUp = onUp;
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
  },

  // Exact character offsets of a selection inside `container` by walking its
  // text nodes in document order. Handles boundaries inside a text node and
  // between element children; the old Range.toString() approach normalized
  // whitespace/line breaks at boundaries, shifting start/end on spans.
  _selectionOffsetsIn: function (container, startNode, startOffset, endNode, endOffset) {
    try {
      var walker = document.createTreeWalker(container, 4); // NodeFilter.SHOW_TEXT
      var texts = [];
      var acc = 0;
      var t;
      while ((t = walker.nextNode()) !== null) {
        texts.push({ node: t, base: acc });
        acc += t.data.length;
      }
      var posOf = function (boundaryNode, boundaryOffset) {
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
            // 2 = Node.DOCUMENT_POSITION_PRECEDING: text node sits before the child
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
      console.error("_selectionOffsetsIn error:", e);
      return null;
    }
  },

  // Mouse released: if it was a real drag with a non-empty selection inside
  // the highlighted essay, create a user highlight and refresh the view
  _finishUserHighlight: function (e) {
    var drag = this._userHlDrag;
    this._userHlDrag = null;
    if (!drag) return;
    
    // Get coordinates from either mouse or touch event
    var clientX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
    var clientY = e.clientY || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0);
    
    if (Math.abs(clientX - drag.startX) + Math.abs(clientY - drag.startY) < 8) return;

    var container = drag.container;
    // The essay view may have been re-rendered while the drag was pending
    // (mouse released outside the window): never touch a detached container
    if (!document.body || !document.body.contains(container)) return;

    var region = container.getAttribute ? (container.getAttribute("data-hl-region") || "essay") : "essay";

    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    var range = sel.getRangeAt(0);

    // Same source of truth as renderWritingResult so offsets map exactly to
    // the rendered text (essay = submitted textarea text; ideas/impl = the
    // plain region text rebuilt from the AI result)
    var plain = this._regionPlainText(region);
    if (!plain) { sel.removeAllRanges(); return; }
    // Compute exact offsets via text-node walk so the purple highlight never
    // drifts when the selection touches span edges or line breaks
    var offsets = this._selectionOffsetsIn(container, range.startContainer, range.startOffset, range.endContainer, range.endOffset);
    if (!offsets) { sel.removeAllRanges(); return; }
    var start = Math.max(0, Math.min(offsets.start, plain.length));
    var end = Math.max(0, Math.min(offsets.end, plain.length));

    if (end - start < 2) { sel.removeAllRanges(); return; }
    var text = plain.slice(start, end);
    if (!text.trim()) { sel.removeAllRanges(); return; }

    var id = 'user_hl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    if (!this.writing.userHighlights) this.writing.userHighlights = [];
    this.writing.userHighlights.push({ id: id, start: start, end: end, note: "", color: "", label: "", effect: "", createdAt: Date.now(), region: region, original: plain.slice(start, end) });
    sel.removeAllRanges();

    this.refreshWritingHighlights();
    this.saveState(); // Ensure state is saved
    this.showToast('🟣 Đã tạo highlight cá nhân – bấm vào nó để ghi chú');
  },

  // Rebuild the review view after user highlight changes and keep the essay's
  // history snapshot in sync so reloading the essay shows the same highlights
  refreshWritingHighlights: function () {
    var ws = this.writing;
    if (!ws.result) return;
    try {
      ws.renderedResultHtml = this.renderWritingResult(ws.result);
      ws.renderedFeedbackData = window.writingFeedbackData || {};
      var panelEl = document.getElementById("ai-eval-panel");
      if (panelEl && ws.renderedResultHtml) panelEl.innerHTML = ws.renderedResultHtml;
    } catch (e) {
      console.error("refreshWritingHighlights error:", e);
      return;
    }
    if (ws.submissionId && ws.essayHistory) {
      var keys = Object.keys(ws.essayHistory);
      var fallback = null;
      var fallbackSavedAt = "";
      for (var i = 0; i < keys.length; i++) {
        var entry = ws.essayHistory[keys[i]];
        if (!entry) continue;
        if (entry.submissionId === ws.submissionId) {
          fallback = entry;
          break;
        }
        // Legacy entries created before submissionId reuse carry a different
        // ID and never match; fall back to the newest entry of the same test
        if (entry.task === ws.task && entry.testIndex === ws.testIndex) {
          if (!fallback || (entry.savedAt || "") > fallbackSavedAt) {
            fallback = entry;
            fallbackSavedAt = entry.savedAt || "";
          }
        }
      }
      if (fallback) {
        fallback.renderedHtml = ws.renderedResultHtml;
        fallback.writingFeedbackData = ws.renderedFeedbackData;
        fallback.userHighlights = (ws.userHighlights || []).slice();
      }
    }
    this.persistEssayHistory();
    this.saveState();
  },

  // Save the note of a user highlight (plus optional decoration: color, label, effect)
  saveUserHighlightNote: function (hlId, note, color, label, effect) {
    var list = this.writing.userHighlights || [];
    var changed = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === hlId) {
        list[i].note = String(note == null ? "" : note).trim();
        if (color) list[i].color = color;
        if (label !== undefined) list[i].label = label || "";
        if (effect !== undefined) list[i].effect = effect || "";
        changed = true;
        break;
      }
    }
    if (!changed) return;
    this.refreshWritingHighlights();
    this.showToast("💾 Đã lưu ghi chú");
  },

  // Pick a color swatch in the note popup (updates the hidden selection)
  selectUserHlColor: function (btn, color) {
    window._userHlColor = color;
    var swatches = document.querySelectorAll('#writing-feedback-popup [data-hl-color]');
    for (var i = 0; i < swatches.length; i++) {
      swatches[i].style.border = swatches[i].getAttribute('data-hl-color') === color
        ? '2px solid #fff'
        : '1px solid rgba(255,255,255,0.35)';
    }
  },

  // Delete a user highlight
  deleteUserHighlight: function (hlId) {
    var list = this.writing.userHighlights || [];
    var next = list.filter(function (h) { return h.id !== hlId; });
    if (next.length === list.length) return;
    this.writing.userHighlights = next;
    this.refreshWritingHighlights();
    this.showToast("🗑 Đã xóa highlight");
  },

  // Scroll to the first rendered segment of a user highlight and flash it
  jumpToUserHighlight: function (hlId, event) {
    if (event) event.stopPropagation();
    var hl = null;
    var list = this.writing.userHighlights || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === hlId) { hl = list[i]; break; }
    }
    if (!hl) return;
    var region = hl.region || 'essay';
    var firstId = region === 'essay' ? hlId + '_p0' : hlId + '_' + region + '_p0';
    var el = document.getElementById(firstId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('hl-jump');
    setTimeout(function () {
      if (el && el.classList) el.classList.remove('hl-jump');
    }, 1800);
    this.showToast('🔭 Đã nhảy tới ghi chú');
  },

  // Summary card listing every personal note, grouped by region, with
  // jump-to-position and per-note delete
  renderUserNotesCard: function () {
    var list = this.writing.userHighlights || [];
    if (list.length === 0) return "";
    var colorHex = { purple: "#8b5cf6", pink: "#ec4899", blue: "#3b82f6", green: "#10b981", yellow: "#f59e0b", orange: "#f97316" };
    var regionNames = { essay: "Bài viết", ideas: "Đánh giá ý tưởng", impl: "Triển khai ý tưởng" };
    var regionOrder = ["essay", "ideas", "impl"];
    var bodyHtml = "";
    for (var r = 0; r < regionOrder.length; r++) {
      var region = regionOrder[r];
      var group = list.filter(function (h) { return (h.region || 'essay') === region; });
      if (group.length === 0) continue;
      bodyHtml += '<div style="margin:0.4rem 0 0 0;font-size:0.75rem;color:#8b5cf6;font-weight:700;">' +
        (regionNames[region] || region) + ' (' + group.length + ')</div>';
      for (var g = 0; g < group.length; g++) {
        var hl = group[g];
        var dot = '<span style="width:10px;height:10px;border-radius:50%;background:' + (colorHex[hl.color] || colorHex.purple) + ';flex-shrink:0;display:inline-block;"></span>';
        var chip = '';
        var lb = hl.label && VstepView.HL_LABELS[hl.label];
        if (lb && lb.text) {
          chip = '<span style="font-size:0.65rem;font-weight:700;background:rgba(139,92,246,0.18);color:#a78bfa;border-radius:9999px;padding:0.05rem 0.4rem;flex-shrink:0;">' + lb.icon + ' ' + lb.text + '</span>';
        }
        var text = hl.note || hl.original || "—";
        bodyHtml += '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.45rem 0;border-bottom:1px dashed var(--border-color);">' +
          dot + chip +
          '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.78rem;color:var(--text-muted);" title="' + VstepView._escapeHtml(text) + '">' + VstepView._escapeHtml(text) + '</span>' +
          '<button style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.4);color:#a78bfa;border-radius:6px;cursor:pointer;padding:0.2rem 0.45rem;font-size:0.72rem;flex-shrink:0;" onclick="VstepView.jumpToUserHighlight(\'' + hl.id + '\', event)" title="Nhảy tới vị trí">👁</button>' +
          '<button style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#ef4444;border-radius:6px;cursor:pointer;padding:0.2rem 0.45rem;font-size:0.72rem;flex-shrink:0;" onclick="VstepView.deleteUserHighlight(\'' + hl.id + '\')" title="Xóa ghi chú này">🗑</button>' +
          '</div>';
      }
    }
    return '<div class="feedback-card" id="user-notes-card"><div class="feedback-card-header" style="color:#8b5cf6;"><strong>🟣 Ghi chú của tôi (' + list.length + ')</strong></div>' +
      '<div style="margin:0.5rem 0 0 0;">' + bodyHtml + '</div>' +
      '<div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.75rem;">Bấm 👁 để nhảy tới vị trí highlight · bấm 🗑 để xóa ghi chú</div></div>';
  },

  // Card "Từ vựng ăn điểm C1" at the bottom of the writing feedback:
  // AI suggests C1 vocabulary (EN - VI + short reason) the essay does NOT contain,
  // based on the essay topic, to help raise the Vocabulary band
  renderC1VocabCard: function () {
    var ws = this.writing;
    var saved = ws.c1VocabList && ws.c1VocabList.length > 0 ? ws.c1VocabList : null;
    var contentHtml = saved
      ? this.renderC1VocabListHtml(saved)
      : '<div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.8rem;line-height:1.6;">' +
        'B\u00e0i vi\u1ebft ch\u01b0a d\u00f9ng t\u1eeb v\u1ef1ng C1? Xem g\u1ee3i \u00fd 10 t\u1eeb/c\u1ee5m t\u1eeb c\u1ea5p C1 theo \u0111\u00fang ch\u1ee7 \u0111\u1ec1 \u0111\u1ec1 b\u00e0i (k\u00e8m ngh\u0129a ti\u1ebfng Vi\u1ec7t v\u00e0 l\u00fd do \u0103n \u0111i\u1ec3m) \u0111\u1ec3 n\u00e2ng band ti\u00eau ch\u00ed Vocabulary.' +
        '</div>' +
        '<div style="margin:0.75rem 0 0 0;">' +
        '<button class="btn btn-accent" style="font-size:0.68rem;padding:0.28rem 0.6rem;border-radius:10px;" onclick="VstepView.suggestC1Vocabulary()">\u2728 G\u1ee3i \u00fd t\u1eeb v\u1ef1ng C1 theo ch\u1ee7 \u0111\u1ec1</button>' +
        '</div>';
    return '<div class="feedback-card" id="c1-vocab-card"><div class="feedback-card-header" style="color:#f59e0b;"><strong>\u2728 T\u1eeb v\u1ef1ng \u0103n \u0111i\u1ec3m C1 (g\u1ee3i \u00fd)</strong></div>' +
      '<div id="c1-vocab-content" style="margin:0.5rem 0 0 0;">' + contentHtml + '</div></div>';
  },

  // Render the suggested C1 vocab list, excluding any word already present in the essay
  renderC1VocabListHtml: function (list) {
    var ws = this.writing;
    var userText = (ws.userText || "").toLowerCase();
    var items = [];
    (Array.isArray(list) ? list : []).forEach(function (v) {
      if (!v || !v.word) return;
      var w = String(v.word).trim();
      if (!w || w.length < 2) return;
      if (userText.indexOf(w.toLowerCase()) >= 0) return;
      items.push(
        '<div style="display:flex;align-items:flex-start;gap:0.6rem;padding:0.5rem 0;border-bottom:1px dashed var(--border-color);">' +
          '<div style="flex:1;min-width:0;">' +
          '<span style="font-weight:700;color:var(--text-primary);">' + VstepView._escapeHtml(w) + '</span>' +
          '<span style="color:var(--text-muted);"> \u2014 ' + VstepView._escapeHtml(v.meaningVi || "") + '</span>' +
          '<div style="font-size:0.75rem;color:#f59e0b;margin-top:0.2rem;">\uD83D\uDCA1 ' + VstepView._escapeHtml(String(v.reason || "").slice(0, 160)) + '</div>' +
          '</div>' +
          '</div>'
      );
    });
    var listHtml = items.length > 0
      ? '<div style="max-height:260px;overflow-y:auto;">' + items.join("") + '</div>' +
        '<div style="margin:0.6rem 0 0 0;display:flex;gap:0.5rem;flex-wrap:wrap;">' +
        '<button class="btn btn-accent" style="font-size:0.75rem;padding:0.3rem 0.6rem;" onclick="VstepView.suggestC1Vocabulary(\'add\')" title="Th\u00eam t\u1eeb m\u1edbi, kh\u00f4ng tr\u00f9ng t\u1eeb \u0111\u00e3 c\u00f3">\uFF0B TH\u00caM</button>' +
        '<button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.6rem;" onclick="VstepView.suggestC1Vocabulary(\'fresh\')">\uD83D\uDD04 G\u1ee3i \u00fd l\u1ea1i</button>' +
        '</div>'
      : '<div style="margin:0.5rem 0 0 0;color:var(--text-muted);font-size:0.8rem;">Kh\u00f4ng c\u00f3 t\u1eeb g\u1ee3i \u00fd m\u1edbi n\u00e0o (c\u00e1c t\u1eeb AI tr\u1ea3 v\u1ec1 \u0111\u00e3 c\u00f3 trong b\u00e0i vi\u1ebft).</div>' +
        '<div style="margin:0.6rem 0 0 0;"><button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.6rem;" onclick="VstepView.suggestC1Vocabulary(\'fresh\')">\uD83D\uDD04 Th\u1eed l\u1ea1i</button></div>';
    return listHtml;
  },

  // Parse AI JSON response into an array of vocab items, tolerating markdown
  // fences and object wrappers (e.g. { "suggestions": [...] })
  parseAIList: function (raw) {
    if (Array.isArray(raw)) return raw;
    if (raw && typeof raw === "object") {
      for (var k in raw) {
        if (Object.prototype.hasOwnProperty.call(raw, k) && Array.isArray(raw[k])) {
          return raw[k];
        }
      }
      return null;
    }
    var text = String(raw == null ? "" : raw).trim();
    if (!text) return null;
    var fenced = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    var parsed = null;
    try { parsed = JSON.parse(fenced); } catch (e1) { parsed = null; }
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object") return this.parseAIList(parsed);
    // Fallback: object(s) bị chặt mất cặp ngoặc mảng -> {..},{..}
    if (/^\{[\s\S]*\}\s*,\s*\{/.test(fenced)) {
      try { parsed = JSON.parse("[" + fenced + "]"); } catch (e3) { parsed = null; }
      if (Array.isArray(parsed)) return parsed;
    }
    var arrMatch = fenced.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      try { parsed = JSON.parse(arrMatch[0]); } catch (e2) { parsed = null; }
      if (Array.isArray(parsed)) return parsed;
    }
    // Fallback: cắt khối ngoặc {..} / [..] ngoài cùng khi AI trả lời kèm
    // lời dẫn hoặc markdown fence không nằm ở đầu chuỗi
    var braceStart = fenced.indexOf("{");
    var braceEnd = fenced.lastIndexOf("}");
    if (braceStart >= 0 && braceEnd > braceStart) {
      try { parsed = JSON.parse(fenced.slice(braceStart, braceEnd + 1)); } catch (e4) { parsed = null; }
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === "object") return this.parseAIList(parsed);
    }
    var bracketStart = fenced.indexOf("[");
    var bracketEnd = fenced.lastIndexOf("]");
    if (bracketStart >= 0 && bracketEnd > bracketStart) {
      try { parsed = JSON.parse(fenced.slice(bracketStart, bracketEnd + 1)); } catch (e5) { parsed = null; }
      if (Array.isArray(parsed)) return parsed;
    }
    console.warn("parseAIList: cannot extract array from AI response:", String(raw).slice(0, 250));
    return null;
  },

  // Merge incoming suggestions into the existing list, skipping duplicate words
  mergeC1VocabLists: function (existing, incoming) {
    var seen = {};
    (Array.isArray(existing) ? existing : []).forEach(function (v) {
      if (v && v.word) seen[String(v.word).trim().toLowerCase()] = true;
    });
    var merged = (Array.isArray(existing) ? existing : []).slice();
    (Array.isArray(incoming) ? incoming : []).forEach(function (v) {
      if (!v || !v.word) return;
      var key = String(v.word).trim().toLowerCase();
      if (key.length < 2 || seen[key]) return;
      seen[key] = true;
      merged.push(v);
    });
    return merged;
  },

  // Ask AI for C1 vocabulary suggestions for the current essay topic.
  // mode: "fresh" (replace the list) or "add" (append only brand-new words)
  suggestC1Vocabulary: async function (mode) {
    var ws = this.writing;
    var content = document.getElementById("c1-vocab-content");
    if (!content) return;

    var userText = ws.userText || "";
    var taskData = VstepWritingData[ws.task];
    var currentTest = taskData && taskData.tests ? taskData.tests[ws.testIndex] : null;
    var promptText = currentTest ? currentTest.prompt : "";
    var existing = Array.isArray(ws.c1VocabList) ? ws.c1VocabList : [];
    var isAdd = mode === "add";
    var count = isAdd ? 5 : 10;

    content.innerHTML =
      '<div style="display:flex;align-items:center;gap:0.5rem;color:var(--text-muted);font-size:0.8rem;">' +
      '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>' +
      'AI \u0111ang t\u00ecm t\u1eeb v\u1ef1ng C1 theo ch\u1ee7 \u0111\u1ec1 b\u00e0i vi\u1ebft...</div>';

    var jsonPrompt =
      'B\u1ea1n l\u00e0 chuy\u00ean gia IELTS/VSTEP Writing. \u0110\u1ec1 b\u00e0i: """' + promptText + '"""\n' +
      'B\u00e0i vi\u1ebft c\u1ee7a h\u1ecdc vi\u00ean: """' + userText + '"""\n' +
      'G\u1ee3i \u00fd \u0111\u00fang ' + count + ' t\u1eeb v\u1ef1ng ho\u1eb7c c\u1ee5m t\u1eeb c\u1ea5p C1 (advanced/academic, KH\u00d4NG tr\u00f9ng v\u1edbi t\u1eeb \u0111\u00e3 c\u00f3 trong b\u00e0i vi\u1ebft) ph\u00f9 h\u1ee3p ch\u1ee7 \u0111\u1ec1 \u0111\u1ec1 b\u00e0i, gi\u00fap n\u00e2ng \u0111i\u1ec3m ti\u00eau ch\u00ed Vocabulary.\n' +
      (isAdd && existing.length > 0
        ? 'C\u00e1c t\u1eeb \u0111\u00e3 g\u1ee3i \u00fd tr\u01b0\u1edbc \u0111\u00f3 (KH\u00d4NG tr\u00f9ng): ' + existing.map(function (v) { return v.word; }).join(", ") + '.\n'
        : '') +
      'Tr\u1ea3 v\u1ec1 JSON d\u1ea1ng object duy nh\u1ea5t: {"suggestions": [m\u1ea3ng ' + count + ' ph\u1ea7n t\u1eed]}. M\u1ed7i ph\u1ea7n t\u1eed g\u1ed3m 3 kh\u00f3a: "word" (t\u1eeb/c\u1ee5m t\u1eeb ti\u1ebfng Anh), "meaningVi" (ngh\u0129a ti\u1ebfng Vi\u1ec7t ng\u1eafn g\u1ecdn), "reason" (l\u00fd do ng\u1eafn g\u1ecdn v\u00ec sao t\u1eeb n\u00e0y \u0103n \u0111i\u1ec3m, t\u1ed1i \u0111a 15 t\u1eeb, ti\u1ebfng Vi\u1ec7t).';
    try {
      var response = await GeminiService.callGemini(jsonPrompt, true, 2048);
      var list = this.parseAIList(response);
      if (!Array.isArray(list) || list.length === 0) {
        throw new Error("AI tr\u1ea3 v\u1ec1 \u0111\u1ecbnh d\u1ea1ng kh\u00f4ng h\u1ee3p l\u1ec7");
      }
      if (isAdd) {
        var merged = this.mergeC1VocabLists(existing, list);
        ws.c1VocabList = merged;
        content.innerHTML = this.renderC1VocabListHtml(merged);
        this.showToast("\u2728 \u0110\u00e3 th\u00eam " + Math.max(0, merged.length - existing.length) + " t\u1eeb v\u1ef1ng C1 m\u1edbi");
      } else {
        ws.c1VocabList = list;
        content.innerHTML = this.renderC1VocabListHtml(list);
        this.showToast("\u2728 \u0110\u00e3 g\u1ee3i \u00fd " + list.length + " t\u1eeb v\u1ef1ng C1");
      }
    } catch (e) {
      content.innerHTML =
        '<div style="margin:0.5rem 0 0 0;color:#ef4444;font-size:0.8rem;">\u26A0\uFE0F Kh\u00f4ng th\u1ec3 g\u1ee3i \u00fd t\u1eeb v\u1ef1ng: ' + this._escapeHtml(e && e.message ? e.message : String(e)) + '</div>' +
        '<div style="margin:0.6rem 0 0 0;"><button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.6rem;" onclick="VstepView.suggestC1Vocabulary(\'fresh\')">\uD83D\uDD04 Th\u1eed l\u1ea1i</button></div>';
    }
  },

  setWritingTask: function (task) {
    this.writing.task = task;
    this.writing.result = null;
    this.writing.renderedResultHtml = null;
    this.writing.renderedFeedbackData = null;
    this.writing.c1VocabList = null;
    this.writing.userText = "";
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("writing");
  },

  updateWordCount: function () {
    var textarea = document.getElementById("writing-textarea");
    var display = document.getElementById("word-count-display");
    if (!textarea) return;
    var text = textarea.value.trim();
    var count = text ? text.split(/\s+/).length : 0;
    var min = this.writing.task === "task1" ? 120 : 250;
    var max = this.writing.task === "task1" ? 180 : 350;

    var wcColor = count === 0 ? "var(--text-muted)" : count < min ? "#ef4444" : count > max ? "#f59e0b" : "var(--accent)";
    var wcPercent = Math.min(100, Math.round((count / min) * 100));
    var wcMsg = count === 0 ? "Hãy bắt đầu viết" : count < min ? "Cần thêm " + (min - count) + " từ nữa" : count > max ? "Quá dài! Tối đa " + max + " từ" : "Tốt!";

    if (display) {
      display.textContent = count + " / " + min + " từ";
      display.style.color = wcColor;
    }
    this.writing.userText = textarea.value;

    var barEl = document.getElementById("wc-progress-bar");
    if (barEl) {
      barEl.style.width = wcPercent + "%";
      barEl.style.background = wcColor;
    }
    var msgEl = document.getElementById("wc-message");
    if (msgEl) {
      msgEl.textContent = wcMsg;
      msgEl.style.color = wcColor;
    }
    this.autoSaveEssay();
  },

  // Debounced draft auto-save (saves current text, NOT result – result saved separately on grading)
  autoSaveEssay: function () {
    var ws = this.writing;
    clearTimeout(ws._autoSaveTimer);
    ws._autoSaveTimer = setTimeout(function () {
      // Save to DraftManager for immediate recovery
      if (ws.userText && ws.userText.trim()) {
        var draftKey = 'writing_' + ws.task + '_' + ws.testIndex;
        window.DraftManager && DraftManager.save(draftKey, {
          userText: ws.userText,
          task: ws.task,
          testIndex: ws.testIndex,
          wordCount: ws.userText.trim().split(/\s+/).length
        });
      }
      // Also save full state
      VstepView.saveState();
    }, 1500);
  },

  // Restore draft from DraftManager
  restoreDraft: function (draftKey) {
    var draft = window.DraftManager && DraftManager.load(draftKey);
    if (!draft) return;
    this.writing.userText = draft.userText;
    this.writing.task = draft.task;
    this.writing.testIndex = draft.testIndex;
    this.saveState();
    this.renderWorkspaceSection('writing');
    DraftManager.clear(draftKey);
  },

  // Dismiss draft (don't restore)
  dismissDraft: function (draftKey) {
    window.DraftManager && DraftManager.clear(draftKey);
    this.renderWorkspaceSection('writing');
  },

  // Save completed essay with AI result into permanent history
  saveEssayToHistory: function (userText, result, task, testIndex, renderedHtml) {
    try {
      var ws = this.writing;
      if (!ws.essayHistory) ws.essayHistory = {};

      var taskData = VstepWritingData[task];
      var currentTest = taskData && taskData.tests ? taskData.tests[testIndex] : null;
      var historyKey = task + "_" + testIndex + "_" + Date.now();
      
      // Reuse the submission ID that renderWritingResult already generated so
      // refreshWritingHighlights can later find this entry and sync user
      // highlights/notes into it (a fresh random ID would never match)
      var submissionId = this.writing.submissionId;
      if (!submissionId) {
        submissionId = 'submission_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.writing.submissionId = submissionId;
      }

      ws.essayHistory[historyKey] = {
        key: historyKey,
        task: task,
        taskLabel: task === "task1" ? "Task 1 (Thư)" : "Task 2 (Luận)",
        testIndex: testIndex,
        testNumber: currentTest ? currentTest.number : (testIndex + 1),
        testType: currentTest ? currentTest.type : "",
        prompt: currentTest ? currentTest.prompt : "",
        userText: userText,
        result: result,
        savedAt: new Date().toISOString(),
        submissionId: submissionId,
        renderedHtml: renderedHtml || null,
        writingFeedbackData: window.writingFeedbackData || null,
        userHighlights: (this.writing.userHighlights || []).slice()
      };

      // Keep only last 50 entries per task to avoid storage limits
      var keys = Object.keys(ws.essayHistory)
        .filter(function (k) { return ws.essayHistory[k].task === task; })
        .sort(function (a, b) {
          var ta = parseInt(String(a).split("_").pop(), 10);
          var tb = parseInt(String(b).split("_").pop(), 10);
          return (isNaN(ta) ? 0 : ta) - (isNaN(tb) ? 0 : tb);
        });
      if (keys.length > 50) {
        var toDelete = keys.slice(0, keys.length - 50);
        toDelete.forEach(function (k) { delete ws.essayHistory[k]; });
      }

      // Persist to its own storage key so a large snapshot can never break the whole app state
      this.persistEssayHistory();

      this.saveState();
    } catch (e) {
      console.error("saveEssayToHistory error:", e);
    }
  },

  // Persist essay history with automatic pruning when localStorage quota is reached
  persistEssayHistory: function () {
    var ws = this.writing;
    if (!ws.essayHistory) ws.essayHistory = {};
    if (StorageManager.setVstepEssayHistory(ws.essayHistory)) return true;

    // Quota exceeded: prune oldest entries and retry with progressively smaller budgets
    var caps = [30, 20, 10, 5];
    for (var i = 0; i < caps.length; i++) {
      var cap = caps[i];
      var allKeys = Object.keys(ws.essayHistory).sort(function (a, b) {
        var ta = parseInt(String(a).split("_").pop(), 10);
        var tb = parseInt(String(b).split("_").pop(), 10);
        return (isNaN(ta) ? 0 : ta) - (isNaN(tb) ? 0 : tb);
      });
      if (allKeys.length > cap) {
        var excess = allKeys.slice(0, allKeys.length - cap);
        excess.forEach(function (k) { delete ws.essayHistory[k]; });
      }
      if (StorageManager.setVstepEssayHistory(ws.essayHistory)) return true;
    }
    console.error("persistEssayHistory: unable to save essay history (storage full)");
    return false;
  },

  // Toggle history popup
  toggleEssayHistory: function () {
    var ws = this.writing;
    if (!ws.essayHistory) ws.essayHistory = {};

    var existing = document.getElementById("essay-history-popup");
    if (existing) { existing.remove(); return; }

    this.buildEssayHistoryPopup();
  },

  // Build (or rebuild) the essay history popup sorted per essayHistorySort
  buildEssayHistoryPopup: function () {
    var ws = this.writing;
    if (!ws.essayHistory) ws.essayHistory = {};
    var sortMode = this.essayHistorySort || "newest";

    // newest | oldest | scoreDesc | scoreAsc — entries without a score always go last
    var scoreOf = function (k) {
      var entry = ws.essayHistory[k];
      var s = entry && entry.result ? parseFloat(entry.result.score) : NaN;
      return isNaN(s) ? null : s;
    };
    // Timestamp of an entry: prefer savedAt, fall back to the Date.now()
    // embedded at the end of the key ("<task>_<testIndex>_<timestamp>").
    var timeOf = function (k) {
      var entry = ws.essayHistory[k];
      if (entry && entry.savedAt) {
        var t = new Date(entry.savedAt).getTime();
        if (!isNaN(t)) return t;
      }
      var parts = String(k).split("_");
      var ts = parseInt(parts[parts.length - 1], 10);
      return isNaN(ts) ? 0 : ts;
    };
    var historyKeys = Object.keys(ws.essayHistory);
    historyKeys.sort(function (a, b) {
      if (sortMode === "scoreDesc" || sortMode === "scoreAsc") {
        var sa = scoreOf(a);
        var sb = scoreOf(b);
        if (sa === null && sb === null) return timeOf(b) - timeOf(a);
        if (sa === null) return 1; // entries without a score always go last
        if (sb === null) return -1;
        var diff = sortMode === "scoreDesc" ? sb - sa : sa - sb;
        if (diff !== 0) return diff;
        return timeOf(b) - timeOf(a); // tie-break: newest first
      }
      var cmp = timeOf(a) - timeOf(b);
      return sortMode === "oldest" ? cmp : -cmp;
    });

    var popup = document.createElement("div");
    popup.id = "essay-history-popup";
    popup.style.cssText = "position:fixed;z-index:10000;top:50%;left:50%;transform:translate(-50%,-50%);" +
      "width:min(680px,96vw);max-height:80vh;background:var(--card-bg,#1a1625);" +
      "border:1px solid var(--border-color);border-radius:20px;" +
      "box-shadow:0 20px 60px rgba(0,0,0,0.7);display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(12px);";

    // Build items HTML
    var itemsHtml = "";
    if (historyKeys.length === 0) {
      itemsHtml = '<div style="text-align:center;padding:2.5rem 1rem;color:var(--text-muted);">' +
        '<div style="font-size:3rem;margin-bottom:0.75rem;">📄</div>' +
        '<p style="font-size:0.9rem;">Chưa có bài viết nào được lưu.</p>' +
        '<p style="font-size:0.8rem;margin-top:0.35rem;opacity:0.7;">Viết bài và bấm "Chấm điểm bằng AI" để lưu vào lịch sử.</p>' +
        '</div>';
    } else {
      historyKeys.forEach(function (k) {
        var entry = ws.essayHistory[k];
        var score = entry.result ? entry.result.score : "–";
        var level = entry.result ? entry.result.level : "";
        var date = entry.savedAt ? new Date(entry.savedAt).toLocaleString("vi-VN", {
          day: "2-digit", month: "2-digit", year: "numeric",
          hour: "2-digit", minute: "2-digit"
        }) : "";
        var wordCount = entry.userText ? entry.userText.trim().split(/\s+/).length : 0;
        var preview = entry.userText ? entry.userText.replace(/\n/g, " ").slice(0, 90) + (entry.userText.length > 90 ? "…" : "") : "";
        var scoreColor = score !== "–" ? (parseFloat(score) >= 7 ? "#10b981" : parseFloat(score) >= 5 ? "#f59e0b" : "#ef4444") : "var(--text-muted)";

        itemsHtml += '<div class="essay-history-item" style="padding:0.9rem 1.25rem;border-bottom:1px solid var(--border-color);cursor:pointer;transition:background 0.15s;" ' +
          'onmouseover="this.style.background=\'rgba(255,255,255,0.05)\'" ' +
          'onmouseout="this.style.background=\'transparent\'" ' +
          'onclick="VstepView.loadEssayFromHistory(\'' + k + '\')">' +
          '<div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">' +
          '<input type="checkbox" class="essay-history-checkbox" data-key="' + k + '" ' +
          'onclick="event.stopPropagation();VstepView.toggleEssayHistorySelection(\'' + k + '\')" ' +
          'style="width:18px;height:18px;cursor:pointer;accent-color:var(--primary);">' +
          '<div style="flex:1;min-width:0;">' +
          '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem;">' +
          '<span style="font-size:0.72rem;font-weight:700;text-transform:uppercase;background:rgba(99,102,241,0.18);color:var(--primary);padding:0.1rem 0.45rem;border-radius:4px;">' + (entry.taskLabel || entry.task) + '</span>' +
          '<span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);">' + (entry.testNumber || (entry.testIndex + 1)) + '</span>' +
          (entry.testType ? '<span style="font-size:0.72rem;color:var(--text-muted);">— ' + entry.testType + '</span>' : '') +
          '</div>' +
          '<p style="font-size:0.78rem;color:var(--text-muted);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:400px;">' + preview + '</p>' +
          '<div style="display:flex;gap:0.75rem;margin-top:0.3rem;">' +
          '<span style="font-size:0.72rem;color:var(--text-muted);">🕐 ' + date + '</span>' +
          '<span style="font-size:0.72rem;color:var(--text-muted);">📝 ' + wordCount + ' từ</span>' +
          '</div>' +
          '</div>' +
          '<div style="text-align:center;min-width:52px;">' +
          '<div style="font-size:1.3rem;font-weight:800;color:' + scoreColor + ';">' + score + '</div>' +
          (level ? '<div style="font-size:0.65rem;color:var(--text-muted);">' + level + '</div>' : '') +
          '</div>' +
          '<button onclick="event.stopPropagation();VstepView.deleteEssayHistory(\'' + k + '\')" ' +
          'style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1.1rem;padding:0.2rem 0.35rem;border-radius:4px;transition:color 0.15s;" ' +
          'onmouseover="this.style.color=\'#ef4444\'" onmouseout="this.style.color=\'var(--text-muted)\'" ' +
          'title="Xoá bài này">🗑</button>' +
          '</div>' +
          '</div>';
      });
    }

    popup.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.4rem;border-bottom:1px solid var(--border-color);background:rgba(0,0,0,0.15);">' +
      '<div>' +
      '<h3 style="margin:0;font-size:1rem;font-weight:700;">📄 Lịch sử bài viết</h3>' +
      '<p style="margin:0.15rem 0 0 0;font-size:0.78rem;color:var(--text-muted);">' + historyKeys.length + ' bài đã lưu – bấm vào một bài để tải lại</p>' +
      '</div>' +
      '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' +
      (historyKeys.length > 0
        ? '<select id="essay-history-sort" onchange="VstepView.setEssayHistorySort(this.value)" title="Sắp xếp lịch sử" style="background:rgba(255,255,255,0.06);border:1px solid var(--border-color);color:var(--text-primary);border-radius:8px;cursor:pointer;padding:0.3rem 0.5rem;font-size:0.8rem;">' +
          '<option value="newest"' + (sortMode === "newest" ? " selected" : "") + '>🕐 Mới nhất</option>' +
          '<option value="oldest"' + (sortMode === "oldest" ? " selected" : "") + '>🕐 Cũ nhất</option>' +
          '<option value="scoreDesc"' + (sortMode === "scoreDesc" ? " selected" : "") + '>⭐ Điểm cao → thấp</option>' +
          '<option value="scoreAsc"' + (sortMode === "scoreAsc" ? " selected" : "") + '>⭐ Điểm thấp → cao</option>' +
          '</select>'
        : '') +
      (historyKeys.length > 0
        ? '<button id="select-all-essay-history" onclick="VstepView.toggleSelectAllEssayHistory()" style="background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.4);color:var(--primary);border-radius:8px;cursor:pointer;padding:0.3rem 0.7rem;font-size:0.85rem;">☑ Chọn tất cả</button>'
        : '') +
      '<button id="delete-selected-writing" onclick="VstepView.deleteSelectedEssayHistory()" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#ef4444;border-radius:8px;cursor:pointer;padding:0.3rem 0.7rem;font-size:0.85rem;display:none;">🗑 Xóa đã chọn</button>' +
      '<button onclick="document.getElementById(\'essay-history-popup\').remove()" style="background:none;border:1px solid var(--border-color);color:var(--text-muted);border-radius:8px;cursor:pointer;padding:0.3rem 0.7rem;font-size:0.85rem;">✕ Đóng</button>' +
      '</div>' +
      '</div>' +
      '<div style="overflow-y:auto;flex:1;">' + itemsHtml + '</div>';

    document.body.appendChild(popup);

    // Close on outside click
    setTimeout(function () {
      document.addEventListener("mousedown", function handler(e) {
        var p = document.getElementById("essay-history-popup");
        if (p && !p.contains(e.target)) {
          p.remove();
          document.removeEventListener("mousedown", handler);
        }
      });
    }, 100);
  },

  // Set history sort order and rebuild the popup
  setEssayHistorySort: function (mode) {
    if (["newest", "oldest", "scoreDesc", "scoreAsc"].indexOf(mode) === -1) mode = "newest";
    this.essayHistorySort = mode;
    var existing = document.getElementById("essay-history-popup");
    if (existing) existing.remove();
    this.buildEssayHistoryPopup();
  },

  // Load an essay from history (restore text + AI result, no API call)
  loadEssayFromHistory: function (historyKey) {
    var ws = this.writing;
    var entry = ws.essayHistory && ws.essayHistory[historyKey];
    if (!entry) return;

    // Close popup
    var popup = document.getElementById("essay-history-popup");
    if (popup) popup.remove();

    // Restore task and testIndex
    ws.task = entry.task;
    ws.testIndex = entry.testIndex;
    ws.userText = entry.userText || "";
    ws.result = entry.result || null;
    ws.userHighlights = Array.isArray(entry.userHighlights) ? entry.userHighlights.slice() : [];
    ws.c1VocabList = null;
    ws.showHistory = false;
    
    // Restore submission ID for unique popup IDs
    ws.submissionId = entry.submissionId || null;
    
    // Restore rendered HTML snapshot + popup data so the review reappears
    // exactly as right after submission, without calling the API again
    ws.renderedResultHtml = entry.renderedHtml || null;
    ws.renderedFeedbackData = entry.writingFeedbackData || null;
    if (entry.writingFeedbackData) {
      window.writingFeedbackData = entry.writingFeedbackData;
    }

    // Re-render writing section
    var workspaceEl = document.getElementById("vstep-workspace");
    if (workspaceEl) workspaceEl.innerHTML = this.renderSection("writing");

    // Lock textarea like right after submission so the restored essay stays intact
    if (entry.result) {
      var restoredTextarea = document.getElementById("writing-textarea");
      if (restoredTextarea) {
        restoredTextarea.disabled = true;
        restoredTextarea.readOnly = true;
        restoredTextarea.style.backgroundColor = "var(--bg-input)";
      }
    }

    // Show a brief toast
    this.showToast("📄 Đã tải lại bài viết Đề số " + (entry.testNumber || (entry.testIndex + 1)));
  },

  // Delete a single essay history entry
  deleteEssayHistory: function (historyKey) {
    var ws = this.writing;
    if (!ws.essayHistory || !ws.essayHistory[historyKey]) return;
    if (!confirm("Xoá bài viết này khỏi lịch sử?")) return;
    delete ws.essayHistory[historyKey];
    this.persistEssayHistory();
    this.saveState();
    this.toggleEssayHistory(); // re-open to refresh
    setTimeout(function () { VstepView.toggleEssayHistory(); }, 10);
  },

  // Toggle essay history selection for multi-delete
  toggleEssayHistorySelection: function(historyKey) {
    var checkbox = document.querySelector('.essay-history-checkbox[data-key="' + historyKey + '"]');
    if (!checkbox) return;
    
    var deleteBtn = document.getElementById('delete-selected-writing');
    if (!deleteBtn) return;
    
    var checkedCount = document.querySelectorAll('.essay-history-checkbox:checked').length;
    
    if (checkedCount > 0) {
      deleteBtn.style.display = 'inline-block';
      deleteBtn.textContent = '🗑 Xóa đã chọn (' + checkedCount + ')';
    } else {
      deleteBtn.style.display = 'none';
    }

    var selectAllBtn = document.getElementById('select-all-essay-history');
    if (selectAllBtn) {
      var total = document.querySelectorAll('.essay-history-checkbox').length;
      selectAllBtn.textContent = (total > 0 && checkedCount === total) ? '☑ Bỏ chọn tất cả' : '☑ Chọn tất cả';
    }
  },

  // Select/deselect all essay history entries at once
  toggleSelectAllEssayHistory: function() {
    var checkboxes = document.querySelectorAll('.essay-history-checkbox');
    if (checkboxes.length === 0) return;

    var allChecked = Array.prototype.every.call(checkboxes, function (cb) { return cb.checked; });
    Array.prototype.forEach.call(checkboxes, function (cb) { cb.checked = !allChecked; });

    var selectAllBtn = document.getElementById('select-all-essay-history');
    if (selectAllBtn) {
      selectAllBtn.textContent = allChecked ? '☑ Chọn tất cả' : '☑ Bỏ chọn tất cả';
    }

    var deleteBtn = document.getElementById('delete-selected-writing');
    if (deleteBtn) {
      var checkedCount = document.querySelectorAll('.essay-history-checkbox:checked').length;
      if (checkedCount > 0) {
        deleteBtn.style.display = 'inline-block';
        deleteBtn.textContent = '🗑 Xóa đã chọn (' + checkedCount + ')';
      } else {
        deleteBtn.style.display = 'none';
      }
    }
  },

  // Delete selected essay history entries
  deleteSelectedEssayHistory: function() {
    var ws = this.writing;
    if (!ws.essayHistory) return;
    
    var checkedBoxes = document.querySelectorAll('.essay-history-checkbox:checked');
    if (checkedBoxes.length === 0) return;
    
    if (!confirm("Xoá " + checkedBoxes.length + " bài viết đã chọn khỏi lịch sử?")) return;
    
    checkedBoxes.forEach(function(checkbox) {
      var key = checkbox.getAttribute('data-key');
      if (ws.essayHistory[key]) {
        delete ws.essayHistory[key];
      }
    });
    
    this.persistEssayHistory();
    this.saveState();
    this.toggleEssayHistory(); // re-open to refresh
    setTimeout(function () { VstepView.toggleEssayHistory(); }, 10);
  },

  // Show writing feedback popup on click
  showWritingFeedbackPopup: function(highlightId, event) {
    event.stopPropagation();
    
    // Remove existing popup if any
    var existingPopup = document.getElementById('writing-feedback-popup');
    if (existingPopup) {
      existingPopup.remove();
    }
    
    // Remove active class from all highlights
    document.querySelectorAll('.writing-highlight').forEach(function(el) {
      el.classList.remove('active');
    });
    
    // Add active class to clicked highlight
    var highlightEl = document.getElementById(highlightId);
    if (highlightEl) {
      highlightEl.classList.add('active');
    }
    
    // Get feedback data
    var feedbackData = window.writingFeedbackData && window.writingFeedbackData[highlightId];
    if (!feedbackData) return;
    
    // Determine header text and color based on type
    var typeLabels = {
      'error': '❌ Lỗi sai',
      'suggestion': '💡 Gợi ý tốt hơn',
      'warning': '⚠️ Cảnh báo',
      'style': '✨ Gợi ý phong cách'
    };
    
    var headerText = typeLabels[feedbackData.type] || '📝 Gợi ý';
    
    // Build popup content
    var popupContent;
    if (feedbackData.type === 'user') {
      // User-created highlight: editable personal note + decoration + delete
      var userHlId = feedbackData.hlId || "";
      var regionNames = { essay: "Bài viết", ideas: "Đánh giá ý tưởng", impl: "Triển khai ý tưởng" };
      var regionTag = feedbackData.region ? (regionNames[feedbackData.region] || feedbackData.region) : "Bài viết";
      var fbColor = feedbackData.color || 'purple';
      window._userHlColor = fbColor;
      popupContent = '<div class="popup-header user">📝 Ghi chú của tôi · ' + regionTag + '</div>';
      if (feedbackData.original) {
        popupContent += '<div class="popup-original" style="background:rgba(139,92,246,0.1);border-left-color:#8b5cf6;"><strong>Đoạn đã highlight:</strong> ' +
          VstepView._escapeHtml(feedbackData.original) + '</div>';
      }
      var hlColors = ["purple", "pink", "blue", "green", "yellow", "orange"];
      var colorHex = { purple: "#8b5cf6", pink: "#ec4899", blue: "#3b82f6", green: "#10b981", yellow: "#f59e0b", orange: "#f97316" };
      var colorRow = '<div style="display:flex;gap:0.4rem;margin-top:0.5rem;align-items:center;flex-wrap:wrap;">' +
        '<span style="font-size:0.72rem;color:var(--text-muted);margin-right:0.1rem;">Màu:</span>' +
        hlColors.map(function (c) {
          return '<button data-hl-color="' + c + '" onclick="VstepView.selectUserHlColor(this,\'' + c + '\')" title="' + c + '" style="width:18px;height:18px;border-radius:50%;background:' + colorHex[c] + ';cursor:pointer;padding:0;border:' + (fbColor === c ? '2px solid #fff' : '1px solid rgba(255,255,255,0.35)') + ';"></button>';
        }).join('') +
        '</div>';
      var labelOptions = ['<option value="">Không nhãn</option>'];
      for (var lk in VstepView.HL_LABELS) {
        if (Object.prototype.hasOwnProperty.call(VstepView.HL_LABELS, lk)) {
          var ll = VstepView.HL_LABELS[lk];
          labelOptions.push('<option value="' + lk + '"' + (feedbackData.label === lk ? ' selected' : '') + '>' + ll.icon + ' ' + ll.text + '</option>');
        }
      }
      var effectOptions = ['<option value="">Không hiệu ứng</option>'];
      for (var ek in VstepView.HL_EFFECTS) {
        if (Object.prototype.hasOwnProperty.call(VstepView.HL_EFFECTS, ek)) {
          effectOptions.push('<option value="' + ek + '"' + (feedbackData.effect === ek ? ' selected' : '') + '>' + VstepView.HL_EFFECTS[ek] + '</option>');
        }
      }
      var decoSelectStyle = "width:100%;box-sizing:border-box;margin-top:0.35rem;padding:0.35rem 0.5rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.75rem;";
      popupContent +=
        colorRow +
        '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">' +
        '<div style="flex:1;min-width:130px;"><span style="font-size:0.72rem;color:var(--text-muted);">Nhãn trang trí:</span>' +
        '<select id="user-hl-label" style="' + decoSelectStyle + '">' + labelOptions.join('') + '</select></div>' +
        '<div style="flex:1;min-width:130px;"><span style="font-size:0.72rem;color:var(--text-muted);">Hiệu ứng:</span>' +
        '<select id="user-hl-effect" style="' + decoSelectStyle + '">' + effectOptions.join('') + '</select></div>' +
        '</div>' +
        '<textarea id="user-hl-note-input" rows="3" placeholder="Nhập ghi chú của bạn..." style="width:100%;box-sizing:border-box;margin-top:0.5rem;padding:0.5rem;border-radius:6px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.8rem;resize:vertical;">' +
        VstepView._escapeHtml(feedbackData.note || "") +
        '</textarea>' +
        '<div style="display:flex;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap;">' +
        '<button class="btn btn-accent" style="font-size:0.75rem;padding:0.3rem 0.7rem;" onclick="VstepView.saveUserHighlightNote(\'' + userHlId + '\', document.getElementById(\'user-hl-note-input\').value, window._userHlColor || \'purple\', document.getElementById(\'user-hl-label\').value, document.getElementById(\'user-hl-effect\').value)">💾 Lưu ghi chú</button>' +
        '<button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.7rem;color:#ef4444;" onclick="VstepView.deleteUserHighlight(\'' + userHlId + '\')">🗑 Xóa highlight</button>' +
        '</div>';
    } else {
      popupContent = '<div class="popup-header ' + feedbackData.type + '">' + headerText + ' - ' + feedbackData.category + '</div>';
      if (feedbackData.original) {
        popupContent += '<div class="popup-original"><strong>Từ gốc:</strong> ' + feedbackData.original + '</div>';
      }
      if (feedbackData.corrected) {
        popupContent += '<div class="popup-corrected"><strong>Gợi ý:</strong> ' + feedbackData.corrected + '</div>';
      }
      if (feedbackData.explanation) {
        popupContent += '<div class="popup-content"><strong>Giải thích:</strong> ' + feedbackData.explanation + '</div>';
      }
    }
    
    // Create popup element
    var popup = document.createElement('div');
    popup.id = 'writing-feedback-popup';
    popup.className = 'writing-feedback-popup';
    popup.innerHTML = popupContent + '<button class="popup-close" onclick="VstepView.closeWritingFeedbackPopup()">✕</button>';
    
    // Position popup relative to the highlighted-essay container
    var highlightedEssayContainer = highlightEl.closest('.highlighted-essay');
    var rect = highlightEl.getBoundingClientRect();
    var containerRect = highlightedEssayContainer ? highlightedEssayContainer.getBoundingClientRect() : rect;
    
    var popupWidth = 300;
    var popupHeight = 200;
    
    // Calculate position relative to container
    var top = rect.bottom - containerRect.top + 10; // Show below the highlighted word
    var left = rect.left - containerRect.left + (rect.width / 2) - (popupWidth / 2);
    
    // Adjust if too far left within container
    if (left < 10) {
      left = 10;
    }
    
    // Adjust if too far right within container
    if (left + popupWidth > containerRect.width - 10) {
      left = containerRect.width - popupWidth - 10;
    }
    
    // Use position: absolute and append to container instead of body
    if (highlightedEssayContainer) {
      popup.style.position = 'absolute';
      popup.style.top = top + 'px';
      popup.style.left = left + 'px';
      highlightedEssayContainer.style.position = 'relative';
      highlightedEssayContainer.appendChild(popup);
    } else {
      // Fallback to original behavior if no container found
      popup.style.position = 'fixed';
      popup.style.top = (rect.bottom + 10) + 'px';
      popup.style.left = (rect.left + (rect.width / 2) - (popupWidth / 2)) + 'px';
      document.body.appendChild(popup);
    }
    
    // Close on outside click
    setTimeout(function() {
      document.addEventListener('click', function closeHandler(e) {
        var popup = document.getElementById('writing-feedback-popup');
        var clickedEl = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target;
        if (popup && !popup.contains(clickedEl) && (!clickedEl || !clickedEl.classList || !clickedEl.classList.contains('writing-highlight'))) {
          popup.remove();
          document.querySelectorAll('.writing-highlight').forEach(function(el) {
            el.classList.remove('active');
          });
          document.removeEventListener('click', closeHandler);
        }
      });
    }, 10);
  },

  // Close writing feedback popup
  closeWritingFeedbackPopup: function() {
    var popup = document.getElementById('writing-feedback-popup');
    if (popup) {
      popup.remove();
    }
    document.querySelectorAll('.writing-highlight').forEach(function(el) {
      el.classList.remove('active');
    });
  },

  toggleWritingAI: function () {
    this.writing.aiAssist = !this.writing.aiAssist;
    if (!this.writing.aiAssist) this.writing.sentenceFeedback = [];
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("writing");
  },

  checkWritingSentence: function () {
    var ws = this.writing;
    if (!ws.aiAssist) return;
    var textarea = document.getElementById("writing-textarea");
    if (!textarea) return;
    var val = textarea.value;
    var lastChar = val[val.length - 1];
    if (lastChar === "." || lastChar === "!" || lastChar === "?") {
      clearTimeout(ws._sentenceTimer);
      ws._sentenceTimer = setTimeout(function () {
        VstepView.analyzeLastSentence();
      }, 800);
    }
  },

  analyzeLastSentence: function () {
    var ws = this.writing;
    var textarea = document.getElementById("writing-textarea");
    if (!textarea) return;
    var val = textarea.value.trim();
    if (!val) return;
    var sentences = val.match(/[^.!?]+[.!?]+/g);
    if (!sentences || sentences.length === 0) return;
    var lastSentence = sentences[sentences.length - 1].trim();
    if (!lastSentence || lastSentence.length < 5) return;
    if (ws._lastAnalyzed === lastSentence) return;
    ws._lastAnalyzed = lastSentence;
    var words = lastSentence.split(/\s+/);
    var wordCount = words.length;
    var hasCapitalStart = /^[A-Z]/.test(lastSentence);
    var hasEndPunct = /[.!?]$/.test(lastSentence);
    var goodFactors = 0;
    var issues = [];
    if (!hasCapitalStart) issues.push("Vi\u1ebft hoa \u0111\u1ea7u c\u00e2u");
    if (!hasEndPunct) issues.push("Thi\u1ebfu d\u1ea5u c\u00e2u");
    if (wordCount < 4) issues.push("C\u00e2u qu\u00e1 ng\u1eafn");
    if (wordCount > 30)
      issues.push("C\u00e2u qu\u00e1 d\u00e0i, n\u00ean t\u00e1ch \u00fd");
    var hasVerb =
      /\b(am|is|are|was|were|been|being|have|has|had|do|does|did|will|would|can|could|may|might|shall|should|need|dare|going|used|get|got|make|made|take|took|see|saw|know|knew|think|thought|want|wanted|say|said|tell|told|give|gave|find|found|look|looked|use|used|work|worked)\b/i.test(
        lastSentence,
      );
    if (!hasVerb)
      issues.push(
        "C\u00f3 th\u1ec3 thi\u1ebfu \u0111\u1ed9ng t\u1eeb ch\u00ednh",
      );
    if (hasCapitalStart && hasEndPunct && wordCount >= 4 && wordCount <= 30)
      goodFactors++;
    if (hasVerb) goodFactors++;
    if (wordCount >= 8 && wordCount <= 25) goodFactors++;
    var hasConnector =
      /\b(however|therefore|furthermore|moreover|in addition|consequently|nevertheless|on the other hand|as a result|for example|for instance|in conclusion|firstly|secondly|finally|because|although|despite)\b/i.test(
        lastSentence,
      );
    if (hasConnector) goodFactors++;
    var feedback = {
      sentence: lastSentence,
      wordCount: wordCount,
      good: goodFactors >= 2,
      issues: issues,
    };
    ws.sentenceFeedback.push(feedback);
    if (ws.sentenceFeedback.length > 20)
      ws.sentenceFeedback = ws.sentenceFeedback.slice(-20);
    var fbEl = document.getElementById("writing-sentence-feedback");
    if (fbEl) fbEl.innerHTML = this.renderSentenceFeedback(ws.sentenceFeedback);
  },

  renderSentenceFeedback: function (feedbacks) {
    var items = feedbacks
      .slice(-5)
      .reverse()
      .map(function (fb) {
        var icon = fb.good ? "\uD83D\uDC51" : "\u26A0\uFE0F";
        var color = fb.good ? "var(--accent)" : "#f59e0b";
        var detail = fb.good
          ? "T\u1ed1t!"
          : fb.issues.length > 0
            ? fb.issues[0]
            : "C\u00f3 th\u1ec3 c\u1ea3i thi\u1ec7n";
        return (
          '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.5rem;background:rgba(0,0,0,0.03);border-radius:6px;font-size:0.8rem;border-left:3px solid ' +
          color +
          ';">' +
          "<span>" +
          icon +
          "</span>" +
          '<span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-primary);">' +
          fb.sentence.substring(0, 60) +
          "</span>" +
          '<span style="color:' +
          color +
          ';font-size:0.75rem;white-space:nowrap;">' +
          detail +
          "</span>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<div style="display:flex;flex-direction:column;gap:0.3rem;padding:0.5rem;background:rgba(245,158,11,0.05);border-radius:8px;max-height:200px;overflow-y:auto;">' +
      items +
      "</div>"
    );
  },

  gradeWriting: async function () {
    var textarea = document.getElementById("writing-textarea");
    if (!textarea || !textarea.value.trim()) {
      alert(
        "Vui l\u00f2ng vi\u1ebft b\u00e0i tr\u01b0\u1edbc khi ch\u1ea5m \u0111i\u1ec3m.",
      );
      return;
    }
    this.writing.grading = true;
    var gradeBtn = document.getElementById("grade-btn");
    if (gradeBtn) {
      gradeBtn.disabled = true;
      gradeBtn.textContent = "\u0110ang n\u1ed9p b\u00e0i...";
    }
    var panelEl = document.getElementById("ai-eval-panel");
    var taskData = VstepWritingData[this.writing.task];
    var currentTest = taskData.tests[this.writing.testIndex];
    var self = this;

    var doGrade = async function () {
      if (panelEl) {
        panelEl.innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:200px;flex-direction:column;gap:1rem;"><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div><p style="color:var(--text-muted);">AI \u0111ang \u0111\u1ecdc v\u00e0 ph\u00e2n t\u00edch b\u00e0i vi\u1ebft...</p></div>';
      }
      return await GeminiService.gradeVstepWriting(
        self.writing.task,
        currentTest.prompt,
        textarea.value,
      );
    };

    var showCountdown = function (seconds) {
      return new Promise(function (resolve) {
        var startTime = Date.now();
        var duration = seconds * 1000;
        if (panelEl) {
          panelEl.innerHTML =
            '<div style="text-align:center;padding:2rem;">' +
            '<div style="font-size:1rem;margin-bottom:0.75rem;">\u23F3</div>' +
            '<p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;">Gi\u1edbi h\u1ea1n API Gemini \u0111\u1ea1t t\u1ed1i \u0111a. \u0110ang ch\u1edd ph\u1ee5c h\u1ed3i...</p>' +
            '<div style="width:100%;max-width:320px;margin:0 auto;height:8px;background:var(--border-color);border-radius:9999px;overflow:hidden;">' +
            '<div id="retry-progress-bar" style="height:100%;width:0%;background:linear-gradient(90deg,var(--primary),var(--accent));border-radius:9999px;transition:width 0.1s linear;"></div>' +
            "</div>" +
            '<p id="retry-countdown-text" style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;">T\u1ef1 \u0111\u1ed9ng th\u1eed l\u1ea1i sau ' +
            Math.ceil(seconds) +
            "s</p>" +
            '<p style="font-size:0.7rem;color:var(--text-muted);margin-top:0.75rem;opacity:0.6;">API mi\u1ec5n ph\u00ed: 20 y\u00eau c\u1ea7u/ph\u00fat</p>' +
            "</div>";
        }
        var interval = setInterval(function () {
          var elapsed = Date.now() - startTime;
          var pct = Math.min((elapsed / duration) * 100, 100);
          var remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
          var bar = document.getElementById("retry-progress-bar");
          var txt = document.getElementById("retry-countdown-text");
          if (bar) bar.style.width = pct + "%";
          if (txt)
            txt.textContent =
              "T\u1ef1 \u0111\u1ed9ng th\u1eed l\u1ea1i sau " + remaining + "s";
          if (elapsed >= duration) {
            clearInterval(interval);
            if (panelEl) {
              panelEl.innerHTML =
                '<div style="display:flex;align-items:center;justify-content:center;height:120px;flex-direction:column;gap:0.75rem;"><p style="color:var(--text-muted);">\u0110ang th\u1eed l\u1ea1i...</p><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>';
            }
            resolve();
          }
        }, 100);
      });
    };

    try {
      var result = await doGrade();
      self.writing.result = result;
      self.writing.userHighlights = [];
      // Fresh submission ID per submission so history entries never share
      // highlight ids and refreshWritingHighlights matches the right entry
      self.writing.submissionId = 'submission_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      // Lock textarea after submission
      if (textarea) {
        textarea.disabled = true;
        textarea.readOnly = true;
        textarea.style.backgroundColor = "var(--bg-input)";
      }
      
      // Render review (snapshot) but never let a render failure block the history save
      var renderedHtml = null;
      try {
        renderedHtml = self.renderWritingResult(result);
      } catch (err) {
        console.error("renderWritingResult error:", err);
      }
      self.writing.renderedResultHtml = renderedHtml;
      self.writing.renderedFeedbackData = window.writingFeedbackData || {};
      if (panelEl && renderedHtml) panelEl.innerHTML = renderedHtml;
      App.addXp(30);
      App.updateProgress("en", 10);

      // Save completed test with score
      var testId = self.writing.task + "_" + self.writing.testIndex;
      if (!self.writing.completedTests) self.writing.completedTests = {};
      self.writing.completedTests[testId] = {
        score: parseFloat(result.score),
        total: 9,
        submitted: true,
        timestamp: new Date().toISOString()
      };
      // Save to essay history (persists across reloads)
      self.saveEssayToHistory(textarea.value, result, self.writing.task, self.writing.testIndex, renderedHtml);
      self.saveState();

      // Track completed essay for progress calculation
      var essayId = self.writing.task + "_" + self.writing.testIndex;
      var vstepState = StorageManager.getVstepState();
      if (!vstepState.writing) vstepState.writing = {};
      if (!vstepState.writing.completedEssays) vstepState.writing.completedEssays = [];
      if (vstepState.writing.completedEssays.indexOf(essayId) < 0) {
        vstepState.writing.completedEssays.push(essayId);
        StorageManager.setVstepState(vstepState);
      }
      
      // Show break reminder
      VstepView.showBreakReminder("Viết", parseFloat(result.score), 9);
      
      // Record performance
      VstepView.recordPerformance("writing", parseFloat(result.score), 9);
    } catch (e) {
      if (e.isRateLimit) {
        var retryAfter = e.retryAfter || 60;
        var maxRetries = 3;
        var retryCount = 0;
        var success = false;
        while (retryCount < maxRetries && !success) {
          retryCount++;
          await showCountdown(retryAfter);
          try {
            var result2 = await doGrade();
            self.writing.result = result2;
            self.writing.userHighlights = [];
            self.writing.submissionId = 'submission_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            var renderedHtml2 = null;
            try {
              renderedHtml2 = self.renderWritingResult(result2);
            } catch (err) {
              console.error("renderWritingResult error:", err);
            }
            self.writing.renderedResultHtml = renderedHtml2;
            self.writing.renderedFeedbackData = window.writingFeedbackData || {};
            if (panelEl && renderedHtml2) panelEl.innerHTML = renderedHtml2;
            App.addXp(30);
            App.updateProgress("en", 10);

            // Save completed test with score
            var testId = self.writing.task + "_" + self.writing.testIndex;
            if (!self.writing.completedTests) self.writing.completedTests = {};
            self.writing.completedTests[testId] = {
              score: parseFloat(result2.score),
              total: 9,
              submitted: true,
              timestamp: new Date().toISOString()
            };
            // Save to essay history (persists across reloads)
            self.saveEssayToHistory(textarea.value, result2, self.writing.task, self.writing.testIndex, renderedHtml2);
            self.saveState();

            // Track completed essay for progress calculation
            var essayId = self.writing.task + "_" + self.writing.testIndex;
            var vstepState = StorageManager.getVstepState();
            if (!vstepState.writing) vstepState.writing = {};
            if (!vstepState.writing.completedEssays) vstepState.writing.completedEssays = [];
            if (vstepState.writing.completedEssays.indexOf(essayId) < 0) {
              vstepState.writing.completedEssays.push(essayId);
              StorageManager.setVstepState(vstepState);
            }

            success = true;
          } catch (e2) {
            if (e2.isRateLimit) {
              retryAfter = e2.retryAfter || 60;
            } else {
              if (panelEl)
                panelEl.innerHTML =
                  '<p style="color:#ef4444;padding:2rem;">L\u1ed7i ch\u1ea5m \u0111i\u1ec3m: ' +
                  e2.message +
                  "</p>";
              success = true;
            }
          }
        }
        if (!success) {
          if (panelEl)
            panelEl.innerHTML =
              '<div style="text-align:center;padding:2rem;color:#ef4444;">' +
              '<div style="font-size:2rem;margin-bottom:0.75rem;">\u26A0\uFE0F</div>' +
              '<p style="font-size:0.9rem;line-height:1.5;">\u0110\u00e3 th\u1eed l\u1ea1i ' +
              maxRetries +
              " l\u1ea7n nh\u01b0ng API Gemini v\u1eabn qu\u00e1 t\u1ea3i.</p>" +
              '<p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">Vui l\u00f2ng th\u1eed l\u1ea1i sau ho\u1eb7c c\u1ea5u h\u00ecnh API Key tr\u1ea3 ph\u00ed trong C\u00e0i \u0111\u1eb7t.</p>' +
              "</div>";
        }
      } else {
        if (panelEl)
          panelEl.innerHTML =
            '<p style="color:#ef4444;padding:2rem;">L\u1ed7i ch\u1ea5m \u0111i\u1ec3m: ' +
            e.message +
            "</p>";
      }
    }
    self.writing.grading = false;
    if (gradeBtn) {
      gradeBtn.disabled = false;
      gradeBtn.textContent = "\uD83D\uDCE4 N\u1ed9p b\u00e0i & ch\u1ea5m AI";
    }
  },

  // ================================================================
  // TEMPLATE BANK
  // ================================================================
  toggleTemplateBank: function () {
    this.writing.showTemplates = !this.writing.showTemplates;
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("writing");
  },

  loadSampleAnswer: function () {
    var ws = this.writing;
    var taskObj = VstepWritingData[ws.task];
    if (!taskObj || !taskObj.tests) return;
    if (ws.testIndex >= taskObj.tests.length) ws.testIndex = 0;
    var currentTest = taskObj.tests[ws.testIndex];
    if (!currentTest || !currentTest.sample) return;
    var textarea = document.getElementById("writing-textarea");
    if (textarea && confirm("Tải bài mẫu sẽ thay thế bài bạn đang viết. Tiếp tục?")) {
      textarea.value = currentTest.sample;
      this.writing.userText = currentTest.sample;
      this.updateWordCount();
    }
  },

  setWritingTest: function (i) {
    this.writing.testIndex = i;
    this.writing.result = null;
    this.writing.renderedResultHtml = null;
    this.writing.renderedFeedbackData = null;
    this.writing.c1VocabList = null;
    this.writing.userHighlights = [];
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("writing");
  },

  toggleWritingGuide: function (id) {
    this.writing.showGuide = this.writing.showGuide === id ? null : id;
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("writing");
  },

  // ------------------------------------------------------------------
  // SPEAKING SECTION
  // ------------------------------------------------------------------
  renderSpeakingSection: function () {
    var data = VstepSpeakingData;
    var ss = this.speaking;
    var part = ss.part;
    var partData = data[part];
    var items =
      part === "part1"
        ? partData.topics
        : part === "part2"
          ? partData.tests
          : partData.topics;
    if (!items.length) return "<p>Kh\u00f4ng c\u00f3 d\u1eef li\u1ec7u.</p>";
    if (ss.topicIndex >= items.length) ss.topicIndex = 0;
    var item = items[ss.topicIndex];

    var partTabs = ["part1", "part2", "part3"]
      .map(function (p) {
        var cls = ss.part === p ? "btn btn-accent" : "btn btn-secondary";
        var labels = { part1: "Part 1", part2: "Part 2", part3: "Part 3" };
        return (
          '<button class="' +
          cls +
          '" style="font-size:0.8rem;padding:0.5rem 0.75rem;" onclick="VstepView.setSpeakingPart(\'' +
          p +
          "')\">" +
          labels[p] +
          "</button>"
        );
      })
      .join("");

    var itemOpts = items
      .map(function (it, i) {
        var topicId = ss.part + "_" + i;
        var isCompleted = ss.completedTopics && ss.completedTopics[topicId] && ss.completedTopics[topicId].submitted;
        var scoreDisplay = isCompleted 
          ? ' ✓ ' + (ss.completedTopics[topicId].score || '?')
          : '';
        return (
          '<option value="' +
          i +
          '" ' +
          (i === ss.topicIndex ? "selected" : "") +
          ">" +
          it.title +
          scoreDisplay +
          "</option>"
        );
      })
      .join("");
    var itemNav =
      '<select onchange="VstepView.setSpeakingTopic(parseInt(this.value))" style="width:100%;padding:0.6rem;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.9rem;margin-bottom:1rem;">' +
      itemOpts +
      "</select>";

    var contentHtml = "";
    if (part === "part1") {
      contentHtml = item.questions
        .map(function (q, i) {
          return (
            '<div style="padding:0.75rem;background:var(--bg-input);border-radius:8px;margin-bottom:0.5rem;line-height:1.6;"><strong>' +
            (i + 1) +
            ".</strong> " +
            q +
            "</div>"
          );
        })
        .join("");
    } else if (part === "part2") {
      var optsHtml = item.options
        .map(function (o) {
          return (
            '<div style="padding:0.5rem 0.75rem;background:var(--bg-input);border-radius:8px;margin-bottom:0.4rem;font-size:0.9rem;">' +
            o +
            "</div>"
          );
        })
        .join("");
      contentHtml =
        '<div style="padding:1rem;background:var(--bg-input);border-radius:8px;line-height:1.7;margin-bottom:1rem;font-size:0.9rem;">' +
        item.situation.replace(/\n/g, "<br>") +
        "</div>" +
        '<div style="margin-top:0.75rem;"><p style="font-weight:600;font-size:0.85rem;margin-bottom:0.5rem;">C\u00e1c l\u1ef1a ch\u1ecdn:</p>' +
        optsHtml +
        "</div>" +
        '<details style="margin-top:0.75rem;"><summary style="cursor:pointer;font-size:0.85rem;color:var(--primary);">\u26a0\ufe0f G\u1ee3i \u00fd</summary><div style="padding:0.75rem;background:rgba(245,158,11,0.1);border-radius:8px;margin-top:0.5rem;font-size:0.85rem;line-height:1.6;white-space:pre-wrap;">' +
        (item.hints || "").replace(/\n/g, "<br>") +
        "</div></details>";
    } else {
      var ideasHtml = item.ideas
        .map(function (idea) {
          return (
            '<p style="color:var(--text-muted);margin-bottom:0.4rem;font-size:0.9rem;">\u2022 ' +
            idea +
            "</p>"
          );
        })
        .join("");
      var vocabHtml = (item.usefulExpressions || [])
        .map(function (v) {
          return (
            '<span style="display:inline-block;padding:0.2rem 0.6rem;background:rgba(168,85,247,0.1);border-radius:4px;font-size:0.8rem;margin:0.2rem;">' +
            v +
            "</span>"
          );
        })
        .join("");
      contentHtml =
        '<div style="padding:1rem;background:var(--bg-input);border-radius:8px;margin-bottom:1rem;line-height:1.6;"><p style="font-weight:700;margin-bottom:0.75rem;">' +
        item.topic +
        "</p></div>" +
        '<div style="margin-bottom:0.75rem;"><p style="font-weight:600;font-size:0.85rem;margin-bottom:0.3rem;">\u00dd t\u01b0\u1edfng g\u1ee3i \u00fd:</p>' +
        ideasHtml +
        "</div>" +
        '<details style="margin-top:0.75rem;"><summary style="cursor:pointer;font-size:0.85rem;color:var(--primary);">\u26a0\ufe0f T\u1eeb v\u1ef1ng h\u1eefu \u00edch</summary><div style="padding:0.75rem;background:rgba(168,85,247,0.08);border-radius:8px;margin-top:0.5rem;font-size:0.85rem;line-height:1.6;">' +
        vocabHtml +
        "</div></details>";
    }

    var visBars = Array.from({ length: 8 }, function (_, i) {
      return (
        '<div class="visualizer-bar ' +
        (ss.recording ? "recording" : "") +
        '" style="animation-delay:' +
        i * 0.1 +
        's;"></div>'
      );
    }).join("");

    var speakingAudioHtml = ss.audioUrl
      ? '<div class="speaking-playback-panel">' +
        '<div class="speaking-playback-header">' +
        '<strong>Nghe l\u1ea1i b\u00e0i n\u00f3i</strong>' +
        '<span class="playback-duration">&#9664;&nbsp;' + (ss.recordDuration ? this._formatTime(ss.recordDuration) : '0:00') + '</span>' +
        '</div>' +
        '<audio class="speaking-audio-bar" controls preload="metadata" src="' + ss.audioUrl + '" style="width:100%;display:block;min-width:0;"></audio>' +
        '</div>'
      : '';

    var transcriptHtml = '';
    if (ss.transcript) {
      if (ss.result && ss.result.corrections && ss.result.corrections.length > 0) {
        var highlighted = ss.transcript;
        ss.result.corrections.forEach(function (corr) {
          var escaped = corr.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          var regex = new RegExp(escaped, 'gi');
          highlighted = highlighted.replace(
            regex,
            '<span class="speaking-error" title="' + corr.explanation + '">' + corr.original + '</span>',
          );
        });
        var corrList = ss.result.corrections
          .map(function (c) {
            return (
              '<div class="correction-item">' +
              '<span class="correction-original">' + c.original + '</span>' +
              '<span class="correction-fixed">&#8594; ' + c.corrected + '</span>' +
              '<span class="correction-note">' + c.explanation + '</span>' +
              '</div>'
            );
          })
          .join('');
        transcriptHtml =
          '<div class="speaking-transcript-display">' +
          '<span class="td-label">&#128172; B\u1ea3n ghi \u00e2m</span>' +
          '<p>' + highlighted + '</p>' +
          '</div>' +
          '<div class="speaking-corrections-panel">' +
          '<div class="corr-header">&#9998; S\u1eeda l\u1ed7i (' + ss.result.corrections.length + ')</div>' +
          corrList +
          '</div>';
      } else if (ss.result) {
        transcriptHtml =
          '<div class="speaking-transcript-display">' +
          '<span class="td-label">&#128172; B\u1ea3n ghi \u00e2m &mdash; <span style="color:var(--accent);font-weight:600;">Kh\u00f4ng c\u00f3 l\u1ed7i ng\u1eef ph\u00e1p \u2705</span></span>' +
          '<p>' + ss.transcript + '</p>' +
          '</div>';
      } else {
        var safeTranscript = (VstepView._escapeHtml || function(s){return s;})(ss.transcript);
        transcriptHtml =
          '<div class="speaking-transcript-card">' +
          '<label for="speaking-transcript-editor">B\u1ea3n ghi \u00e2m</label>' +
          '<textarea id="speaking-transcript-editor" class="speaking-transcript-editor" oninput="VstepView.updateSpeakingTranscript(this.value)" placeholder="S\u1eeda transcript b\u00e0i n\u00f3i c\u1ee7a b\u1ea1n tr\u01b0\u1edbc khi ch\u1ea5m...">' + safeTranscript + '</textarea>' +
          '<p class="speaking-transcript-hint">&#128161; Ki\u1ec3m tra l\u1ea1i v\u00e0 s\u1eeda nh\u1eefng ch\u1ed7 nh\u1eadn d\u1ea1ng sai tr\u01b0\u1edbc khi ch\u1ea5m \u0111i\u1ec3m.</p>' +
          '</div>';
      }
      // Luôn hiển thị nút chấm điểm khi có transcript
      transcriptHtml +=
        '<button class="speaking-grade-btn" onclick="VstepView.gradeSpeaking()" id="grade-speaking-btn" style="margin-top:1rem;">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' +
        ' Ch\u1ea5m \u0111i\u1ec3m b\u00e0i n\u00f3i' +
        '</button>';
    }

    var postRecordingContent = transcriptHtml
      ? '<div class="speaking-post-recording">' + transcriptHtml + '</div>'
      : '';
    var speakingPostHtml = speakingAudioHtml + postRecordingContent;

    var resultHtml = ss.result
      ? (function (r) {
          var criteria = [
            { label: 'Vocabulary (Vốn từ vựng)', score: r.vocabulary },
            { label: 'Grammar (Ngữ pháp)', score: r.grammar },
            { label: 'Pronunciation (Phát âm)', score: r.pronunciation },
            { label: 'Fluency (Sự lưu loát)', score: r.fluency },
            { label: 'Discourse Management (Quản lý bài nói)', score: r.discourseManagement }
          ];
          var criteriaHtml = criteria.map(function (c) {
            var pct = Math.min(parseFloat(c.score) / 9 * 100, 100).toFixed(0);
            return (
              '<div class="speaking-criterion">' +
              '<div class="speaking-criterion-header">' +
              '<span class="crit-label">' + c.label + '</span>' +
              '<span class="crit-score">' + c.score + ' / 9.0</span>' +
              '</div>' +
              '<div class="speaking-progress-track">' +
              '<div class="speaking-progress-fill" style="width:' + pct + '%;"></div>' +
              '</div>' +
              '</div>'
            );
          }).join('');
          var feedbackHtml = "";
          if (typeof r.feedback === "object" && r.feedback !== null) {
            var fb = r.feedback;
      var parseMarkdown = function(text) {
        return String(text || "")
          .replace(/\n/g, '<br>')
          .replace(/\*([^*]+)\*/g, '<i>$1</i>');
      };
            var strengthsHtml = fb.strengths && fb.strengths.length > 0
              ? '<div class="feedback-card"><div class="feedback-card-header" style="color:#10b981;"><strong>✓ Điểm mạnh</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">' +
                fb.strengths.map(function(s) { return '<li style="margin-bottom:0.25rem;">' + parseMarkdown(s) + '</li>'; }).join('') +
                '</ul></div>'
              : "";
            var errorsHtml = fb.errors && fb.errors.length > 0
              ? '<div class="feedback-card"><div class="feedback-card-header" style="color:#ef4444;"><strong>✗ Lỗi sai</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">' +
                fb.errors.map(function(e) { return '<li style="margin-bottom:0.25rem;">' + parseMarkdown(e) + '</li>'; }).join('') +
                '</ul></div>'
              : "";
            var suggestionsHtml = fb.suggestions && fb.suggestions.length > 0
              ? '<div class="feedback-card"><div class="feedback-card-header" style="color:#3b82f6;"><strong>💡 Gợi ý cải thiện</strong></div><ul style="margin:0.5rem 0 0 1.2rem;padding:0;">' +
                fb.suggestions.map(function(s) { return '<li style="margin-bottom:0.25rem;">' + parseMarkdown(s) + '</li>'; }).join('') +
                '</ul></div>'
              : "";
            feedbackHtml = '<div style="display:grid;gap:0.75rem;margin-top:1rem;">' + strengthsHtml + errorsHtml + suggestionsHtml + '</div>';
          } else {
            feedbackHtml = r.feedback;
          }
          return (
            '<div class="speaking-result-section">' +
            '<div class="speaking-score-banner">' +
            '<div class="speaking-score-circle"><span>' + r.score + '</span></div>' +
            '<div class="speaking-score-info">' +
            '<h4>K\u1ebft qu\u1ea3 Speaking</h4>' +
            '<span class="level-badge">' + r.level + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="speaking-criteria-panel">' + criteriaHtml + '</div>' +
            '<div class="speaking-feedback-box">' +
            '<div class="feedback-label">&#128172; Nh\u1eadn x\u00e9t chi ti\u1ebft</div>' +
            feedbackHtml +
            '</div>' +
            '<button class="speaking-grade-btn" onclick="VstepView.gradeSpeaking()" id="grade-speaking-again-btn" style="margin-top:1rem;">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
            ' Ch\u1ea5m \u0111i\u1ec3m l\u1ea1i' +
            '</button>' +
            '</div>'
          );
        })(ss.result)
      : '';

    var sampleContent = "";
    if (part === "part1") {
      var blocks = item.content.split(/\n(?=\d+\.\s)/);
      sampleContent = blocks
        .map(function (block) {
          var m = block.match(/^(\d+\.\s*.+?)\n([\s\S]*)/);
          if (m) {
            var qText = m[1].replace(/\n/g, " ").trim();
            var aText = m[2].trim();
            if (!aText)
              return (
                '<div style="padding:0.75rem;background:var(--bg-input);border-radius:8px;margin-bottom:0.75rem;font-size:0.9rem;"><strong style="color:var(--primary);">' +
                qText +
                "</strong></div>"
              );
            aText = aText.replace(/\n/g, " ");
            var viWordMatch = aText.match(
              /\S*[ắâêôơưửđảãáàạặằấậẫễểếèẹẻẽúùủũụíìỉĩịóòỏõọồổỗộốờởỡợứừửữựĀāĂăẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỎỏỌọỒồỔổỖỗỐốỘộỚớỜờỠỡỞởỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]\S*/,
            );
            var viIdx = viWordMatch ? viWordMatch.index : -1;
            var enHtml =
              viIdx > 0
                ? '<div style="line-height:1.7;color:var(--text-primary);margin-bottom:0.4rem;">' +
                  aText.slice(0, viIdx).trim() +
                  "</div>"
                : "";
            var viHtml =
              viIdx >= 0
                ? '<div style="line-height:1.7;font-style:italic;color:var(--text-muted);">' +
                  aText.slice(viIdx).trim() +
                  "</div>"
                : "";
            return (
              '<div style="padding:0.75rem;background:var(--bg-input);border-radius:8px;margin-bottom:0.75rem;font-size:0.9rem;border-left:3px solid var(--accent);"><div style="font-weight:600;margin-bottom:0.4rem;color:var(--primary);">' +
              qText +
              "</div>" +
              (enHtml ||
                '<div style="line-height:1.7;color:var(--text-primary);">' +
                  aText +
                  "</div>") +
              viHtml +
              "</div>"
            );
          }
          return "";
        })
        .join("");
    } else {
      sampleContent =
        '<div style="line-height:1.7;">' +
        item.sample.replace(/\n{2,}/g, "<br><br>").replace(/\n/g, " ") +
        "</div>";
    }
    var transHtml = item.sampleTranslation
      ? '<details style="margin-top:0.75rem;"><summary style="cursor:pointer;font-size:0.8rem;color:var(--text-muted);">Xem d\u1ecbch ti\u1ebfng Vi\u1ec7t</summary><div style="padding:0.75rem;background:rgba(59,130,246,0.06);border-radius:8px;margin-top:0.5rem;font-size:0.85rem;line-height:1.7;font-style:italic;color:var(--text-muted);">' +
        item.sampleTranslation
          .replace(/\n{2,}/g, "<br><br>")
          .replace(/\n/g, " ") +
        "</div></details>"
      : "";
    var sampleHtml =
      '<details style="margin-top:1rem;"><summary style="cursor:pointer;font-size:0.85rem;color:var(--primary);">Xem c\u00e2u tr\u1ea3 l\u1eddi m\u1eabu</summary><div style="padding:1rem;background:rgba(16,185,129,0.06);border-radius:8px;margin-top:0.5rem;font-size:0.9rem;line-height:1.6;border-left:4px solid var(--accent);">' +
      sampleContent +
      transHtml +
      "</div></details>";

    var partInfo =
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">' +
      '<span class="badge badge-level">' +
      (part === "part2"
        ? partData.title
        : partData.title + " &mdash; " + item.title) +
      "</span>" +
      (partData.tips || part === "part2"
        ? '<button class="btn btn-secondary" style="font-size:0.7rem;padding:0.2rem 0.6rem;border-radius:50%;min-width:24px;min-height:24px;line-height:1;" onclick="VstepView.toggleSpeakingTips()" title="Xem l\u01b0u \u00fd">!</button>'
        : "") +
      "</div>";

    var tipsHtml = "";
    if (ss.showTips && partData.tips) {
      var tipsList = partData.tips
        .map(function (t, i) {
          return (
            '<li style="margin-bottom:0.5rem;font-size:0.85rem;line-height:1.5;"><strong>' +
            (i + 1) +
            ".</strong> " +
            t +
            "</li>"
          );
        })
        .join("");
      tipsHtml =
        '<div style="padding:1rem;background:rgba(245,158,11,0.08);border-radius:8px;margin-bottom:1rem;border-left:4px solid #f59e0b;">' +
        '<p style="font-weight:600;font-size:0.85rem;margin-bottom:0.5rem;color:#f59e0b;">\u2139\ufe0f L\u01b0u \u00fd khi l\u00e0m b\u00e0i</p>' +
        '<ol style="padding-left:1.25rem;margin:0;">' +
        tipsList +
        "</ol></div>";
    }

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">\n          <div>\n            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">VSTEP Speaking Practice</h2>\n            <p style="font-size:0.85rem;color:var(--text-muted);">Ghi \u00e2m c\u00e2u tr\u1ea3 l\u1eddi. AI s\u1ebd ph\u00e2n t\u00edch, ch\u1ea5m \u0111i\u1ec3m v\u00e0 s\u1eeda l\u1ed7i chi ti\u1ebft.</p>\n          </div>\n          <div style="display:flex;gap:0.5rem;align-items:center;">' +
      partTabs +
      '  <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.5rem 0.75rem;" onclick="VstepView.toggleSpeakingHistory()" title="Lịch sử bài nói">📄 Lịch sử' +
      (Object.keys(ss.speakingHistory || {}).length > 0 ? ' (' + Object.keys(ss.speakingHistory || {}).length + ')' : '') +
      '  </button>' +
      '</div>\n        </div>\n        <div style="margin-top:0.75rem;">\n          <div class="progress-bar-container" style="height:4px;">\n            <div style="height:100%;background:var(--accent);border-radius:9999px;width:' +
      (ss.completedTopics && Object.keys(ss.completedTopics).length > 0 ? Math.round((Object.keys(ss.completedTopics).length / (VstepSpeakingData.part1.topics.length + VstepSpeakingData.part2.tests.length + VstepSpeakingData.part3.topics.length)) * 100) : 0) +
      '%;"></div>\n          </div>\n          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">Đã hoàn thành ' +
      (ss.completedTopics ? Object.keys(ss.completedTopics).length : 0) +
      ' / ' +
      (VstepSpeakingData.part1.topics.length + VstepSpeakingData.part2.tests.length + VstepSpeakingData.part3.topics.length) +
      ' đề</p>\n        </div>\n      </div>\n      <div class="glass-card" style="margin-bottom:1rem;border-color:rgba(168,85,247,0.2);">\n        ' +
      partInfo +
      '\n        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1rem;">' +
      partData.description +
      "</p>\n        " +
      tipsHtml +
      "\n        " +
      itemNav +
      "\n        " +
      contentHtml +
      '\n      </div>\n      <div class="glass-card">\n        <div class="speaking-container">\n          <div class="speaking-visualizer">' +
      visBars +
      '</div>\n          <div id="record-timer" style="font-size:1.4rem;font-weight:700;color:' +
      (ss.recording ? "var(--accent)" : "var(--text-muted)") +
      ';">' +
      (ss.recording
        ? "\u0110ang ghi \u00e2m..."
        : "S\u1eb5n s\u00e0ng ghi \u00e2m") +
      '</div>\n          <button class="recorder-btn ' +
      (ss.recording ? "recording" : "") +
      '" id="recorder-btn" onclick="VstepView.toggleRecording()" title="' +
      (ss.recording
        ? "D\u1eebng ghi \u00e2m"
        : "B\u1eaft \u0111\u1ea7u ghi \u00e2m") +
      '">' +
      (ss.recording
        ? '<svg width="26" height="26" fill="white" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>'
        : '<svg width="26" height="26" fill="white" viewBox="0 0 24 24"><path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/><path d="M11 11V6c0-.55.45-1 1-1s1 .45 1 1v5h-2z"/></svg>') +
      '</button>\n          <p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.75rem;">' +
      (ss.recording
        ? "\u0110ang ghi ... Nh\u1ea5n n\u00fat d\u1eebng \u0111\u1ec3 k\u1ebft th\u00fac"
        : "Nh\u1ea5n n\u00fat micro \u0111\u1ec3 b\u1eaft \u0111\u1ea7u ghi \u00e2m c\u00e2u tr\u1ea3 l\u1eddi") +
      "</p>\n        </div>\n        " +
      speakingPostHtml +
      "\n        " +
      resultHtml +
      "\n        " +
      sampleHtml +
      "\n      </div>\n    "
    );
  },

  setSpeakingPart: function (part) {
    // Stop any in-progress recording / recognition before switching parts
    try {
      var ss = this.speaking;
      if (ss && ss.recording) {
        if (ss.recognition) ss.recognition.stop();
        if (ss.mediaRecorder && ss.mediaRecorder.state !== 'inactive') {
          ss.mediaRecorder.stop();
        }
        if (ss.stream && ss.stream.getTracks) {
          ss.stream.getTracks().forEach(function (t) { t.stop(); });
        }
      }
    } catch (e) {
      console.error("setSpeakingPart cleanup error:", e);
    }
    var completedTopics = this.speaking.completedTopics || {};
    var speakingHistory = this.speaking.speakingHistory || {};
    this.speaking = {
      part: part,
      topicIndex: 0,
      showTips: false,
      recording: false,
      recordStart: null,
      transcript: "",
      result: null,
      recognition: null,
      mediaRecorder: null,
      stream: null,
      completedTopics: completedTopics,
      speakingHistory: speakingHistory,
    };
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("speaking");
  },

  // Save completed speaking session + audio blob into permanent IndexedDB & localStorage history
  saveSpeakingToHistory: async function (transcript, result, part, topicIndex, recordDuration, audioBlob) {
    var ss = this.speaking;
    if (!ss.speakingHistory) ss.speakingHistory = {};

    var partData = VstepSpeakingData[part];
    var items = part === "part1" ? partData.topics : part === "part2" ? partData.tests : partData.topics;
    var currentTopic = items[topicIndex];
    var historyKey = part + "_" + topicIndex + "_" + Date.now();

    if (audioBlob) {
      await window.SpeakingAudioDB.saveAudio(historyKey, audioBlob);
    }

    ss.speakingHistory[historyKey] = {
      key: historyKey,
      part: part,
      partLabel: part === "part1" ? "Part 1" : part === "part2" ? "Part 2" : "Part 3",
      topicIndex: topicIndex,
      topicTitle: currentTopic.title || currentTopic.topic || ((topicIndex + 1)),
      transcript: transcript,
      recordDuration: recordDuration,
      result: result,
      savedAt: new Date().toISOString(),
      hasAudio: !!audioBlob
    };

    // Clean up old entries if more than 50 entries to avoid memory explosion
    var keys = Object.keys(ss.speakingHistory)
      .filter(function (k) { return ss.speakingHistory[k].part === part; })
      .sort();
    if (keys.length > 50) {
      var toDelete = keys.slice(0, keys.length - 50);
      for (var i = 0; i < toDelete.length; i++) {
        var k = toDelete[i];
        delete ss.speakingHistory[k];
        await window.SpeakingAudioDB.deleteAudio(k);
      }
    }

    this.saveState();
  },

  // Toggle speaking history popup
  toggleSpeakingHistory: function () {
    var ss = this.speaking;
    if (!ss.speakingHistory) ss.speakingHistory = {};

    var existing = document.getElementById("speaking-history-popup");
    if (existing) { existing.remove(); return; }

    var historyKeys = Object.keys(ss.speakingHistory).sort().reverse();

    var popup = document.createElement("div");
    popup.id = "speaking-history-popup";
    popup.style.cssText = "position:fixed;z-index:10000;top:50%;left:50%;transform:translate(-50%,-50%);" +
      "width:min(680px,96vw);max-height:80vh;background:var(--card-bg,#1a1625);" +
      "border:1px solid var(--border-color);border-radius:20px;" +
      "box-shadow:0 20px 60px rgba(0,0,0,0.7);display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(12px);";

    var itemsHtml = "";
    if (historyKeys.length === 0) {
      itemsHtml = '<div style="text-align:center;padding:2.5rem 1rem;color:var(--text-muted);">' +
        '<div style="font-size:3rem;margin-bottom:0.75rem;">🎙️</div>' +
        '<p style="font-size:0.9rem;">Chưa có bài nói nào được lưu.</p>' +
        '<p style="font-size:0.8rem;margin-top:0.35rem;opacity:0.7;">Ghi âm và bấm "Chấm điểm bài nói" để lưu vào lịch sử.</p>' +
        '</div>';
    } else {
      historyKeys.forEach(function (k) {
        var entry = ss.speakingHistory[k];
        var score = entry.result ? entry.result.score : "–";
        var level = entry.result ? entry.result.level : "";
        var date = entry.savedAt ? new Date(entry.savedAt).toLocaleString("vi-VN", {
          day: "2-digit", month: "2-digit", year: "numeric",
          hour: "2-digit", minute: "2-digit"
        }) : "";
        var durationStr = entry.recordDuration ? VstepView._formatTime(entry.recordDuration) : "0:00";
        var preview = entry.transcript ? entry.transcript.slice(0, 90) + (entry.transcript.length > 90 ? "…" : "") : "";
        var scoreColor = score !== "–" ? (parseFloat(score) >= 7 ? "#10b981" : parseFloat(score) >= 5 ? "#f59e0b" : "#ef4444") : "var(--text-muted)";

        itemsHtml += '<div class="speaking-history-item" style="padding:0.9rem 1.25rem;border-bottom:1px solid var(--border-color);cursor:pointer;transition:background 0.15s;" ' +
          'onmouseover="this.style.background=\'rgba(255,255,255,0.05)\'" ' +
          'onmouseout="this.style.background=\'transparent\'" ' +
          'onclick="VstepView.loadSpeakingFromHistory(\'' + k + '\')">' +
          '<div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">' +
          '<input type="checkbox" class="speaking-history-checkbox" data-key="' + k + '" ' +
          'onclick="event.stopPropagation();VstepView.toggleSpeakingHistorySelection(\'' + k + '\')" ' +
          'style="width:18px;height:18px;cursor:pointer;accent-color:var(--accent);">' +
          '<div style="flex:1;min-width:0;">' +
          '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem;">' +
          '<span style="font-size:0.72rem;font-weight:700;text-transform:uppercase;background:rgba(16,185,129,0.18);color:var(--accent);padding:0.1rem 0.45rem;border-radius:4px;">' + entry.partLabel + '</span>' +
          '<span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);max-width:250px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + entry.topicTitle + '</span>' +
          (entry.hasAudio ? '<span style="font-size:0.72rem;color:#10b981;font-weight:bold;">🎵 Ghi âm</span>' : '') +
          '</div>' +
          '<p style="font-size:0.78rem;color:var(--text-muted);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:400px;">' + preview + '</p>' +
          '<div style="display:flex;gap:0.75rem;margin-top:0.3rem;">' +
          '<span style="font-size:0.72rem;color:var(--text-muted);">🕐 ' + date + '</span>' +
          '<span style="font-size:0.72rem;color:var(--text-muted);">⏱️ ' + durationStr + '</span>' +
          '</div>' +
          '</div>' +
          '<div style="text-align:center;min-width:52px;">' +
          '<div style="font-size:1.3rem;font-weight:800;color:' + scoreColor + ';">' + score + '</div>' +
          (level ? '<div style="font-size:0.65rem;color:var(--text-muted);">' + level + '</div>' : '') +
          '</div>' +
          '<button onclick="event.stopPropagation();VstepView.deleteSpeakingHistory(\'' + k + '\')" ' +
          'style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1.1rem;padding:0.2rem 0.35rem;border-radius:4px;transition:color 0.15s;" ' +
          'onmouseover="this.style.color=\'#ef4444\'" onmouseout="this.style.color=\'var(--text-muted)\'" ' +
          'title="Xoá bài nói này">🗑</button>' +
          '</div>' +
          '</div>';
      });
    }

    popup.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.4rem;border-bottom:1px solid var(--border-color);background:rgba(0,0,0,0.15);">' +
      '<div>' +
      '<h3 style="margin:0;font-size:1rem;font-weight:700;">🎙️ Lịch sử Speaking</h3>' +
      '<p style="margin:0.15rem 0 0 0;font-size:0.78rem;color:var(--text-muted);">' + historyKeys.length + ' bài đã lưu – bấm vào để nghe và xem lại</p>' +
      '</div>' +
      '<div style="display:flex;gap:0.5rem;">' +
      '<button id="delete-selected-speaking" onclick="VstepView.deleteSelectedSpeakingHistory()" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#ef4444;border-radius:8px;cursor:pointer;padding:0.3rem 0.7rem;font-size:0.85rem;display:none;">🗑 Xóa đã chọn</button>' +
      '<button onclick="document.getElementById(\'speaking-history-popup\').remove()" style="background:none;border:1px solid var(--border-color);color:var(--text-muted);border-radius:8px;cursor:pointer;padding:0.3rem 0.7rem;font-size:0.85rem;">✕ Đóng</button>' +
      '</div>' +
      '</div>' +
      '<div style="overflow-y:auto;flex:1;">' + itemsHtml + '</div>';

    document.body.appendChild(popup);

    setTimeout(function () {
      document.addEventListener("mousedown", function handler(e) {
        var p = document.getElementById("speaking-history-popup");
        if (p && !p.contains(e.target)) {
          p.remove();
          document.removeEventListener("mousedown", handler);
        }
      });
    }, 100);
  },

  // Load a speaking entry from history (restore draft, audio playback, and AI assessment)
  loadSpeakingFromHistory: async function (historyKey) {
    var ss = this.speaking;
    var entry = ss.speakingHistory && ss.speakingHistory[historyKey];
    if (!entry) return;

    var popup = document.getElementById("speaking-history-popup");
    if (popup) popup.remove();

    ss.part = entry.part;
    ss.topicIndex = entry.topicIndex;
    ss.transcript = entry.transcript || "";
    ss.recordDuration = entry.recordDuration || 0;
    ss.result = entry.result || null;
    ss.audioUrl = null;
    ss.recordedBlob = null;

    if (entry.hasAudio) {
      try {
        var blob = await window.SpeakingAudioDB.getAudio(historyKey);
        if (blob) {
          ss.audioUrl = URL.createObjectURL(blob);
          ss.recordedBlob = blob;
        }
      } catch (err) {
        console.error("Failed to retrieve audio from IndexedDB:", err);
      }
    }

    var workspaceEl = document.getElementById("vstep-workspace");
    if (workspaceEl) workspaceEl.innerHTML = this.renderSection("speaking");

    this.showToast("🎙️ Đã tải lại bài nói và bản ghi âm Đề: " + entry.topicTitle);
  },

  // Delete a single speaking history entry
  deleteSpeakingHistory: function (historyKey) {
    var ss = this.speaking;
    if (!ss.speakingHistory || !ss.speakingHistory[historyKey]) return;
    if (!confirm("Xoá bài nói này khỏi lịch sử?")) return;
    
    delete ss.speakingHistory[historyKey];
    if (window.SpeakingAudioDB) {
      window.SpeakingAudioDB.deleteAudio(historyKey);
    }
    this.saveState();
    
    this.toggleSpeakingHistory(); // re-open to refresh
    setTimeout(function () { VstepView.toggleSpeakingHistory(); }, 10);
  },

  // Toggle speaking history selection for multi-delete
  toggleSpeakingHistorySelection: function(historyKey) {
    var checkbox = document.querySelector('.speaking-history-checkbox[data-key="' + historyKey + '"]');
    if (!checkbox) return;
    
    var deleteBtn = document.getElementById('delete-selected-speaking');
    if (!deleteBtn) return;
    
    var checkedCount = document.querySelectorAll('.speaking-history-checkbox:checked').length;
    
    if (checkedCount > 0) {
      deleteBtn.style.display = 'inline-block';
      deleteBtn.textContent = '🗑 Xóa đã chọn (' + checkedCount + ')';
    } else {
      deleteBtn.style.display = 'none';
    }
  },

  // Delete selected speaking history entries
  deleteSelectedSpeakingHistory: function() {
    var ss = this.speaking;
    if (!ss.speakingHistory) return;
    
    var checkedBoxes = document.querySelectorAll('.speaking-history-checkbox:checked');
    if (checkedBoxes.length === 0) return;
    
    if (!confirm("Xoá " + checkedBoxes.length + " bài nói đã chọn khỏi lịch sử?")) return;
    
    checkedBoxes.forEach(function(checkbox) {
      var key = checkbox.getAttribute('data-key');
      if (ss.speakingHistory[key]) {
        delete ss.speakingHistory[key];
        if (window.SpeakingAudioDB) {
          window.SpeakingAudioDB.deleteAudio(key);
        }
      }
    });
    
    this.saveState();
    this.toggleSpeakingHistory(); // re-open to refresh
    setTimeout(function () { VstepView.toggleSpeakingHistory(); }, 10);
  },

  toggleSpeakingTips: function () {
    this.speaking.showTips = !this.speaking.showTips;
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("speaking");
  },

  setSpeakingTopic: function (idx) {
    var ss = this.speaking;
    ss.topicIndex = idx;
    ss.transcript = "";
    ss.result = null;
    this.saveState();
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("speaking");
  },

  toggleRecording: function () {
    var ss = this.speaking;
    var self = this;
    if (ss.recording) {
      if (ss.recognition) ss.recognition.stop();
      if (ss.mediaRecorder && ss.mediaRecorder.state !== 'inactive') {
        ss.mediaRecorder.stop();
      }
      ss.recording = false;
      ss.recordDuration = ss.recordStart
        ? Math.round((Date.now() - ss.recordStart) / 1000)
        : 0;
      var ws = document.getElementById("vstep-workspace");
      if (ws) ws.innerHTML = this.renderSection("speaking");
    } else {
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      var startRecognition = function (stream) {
        if (ss.audioUrl) {
          URL.revokeObjectURL(ss.audioUrl);
          ss.audioUrl = null;
        }
        ss.audioChunks = [];
        var mediaRecorder = null;
        if (stream) {
          try {
            mediaRecorder = new MediaRecorder(stream);
            ss.mediaRecorder = mediaRecorder;
            mediaRecorder.ondataavailable = function (e) {
              if (e.data && e.data.size > 0) ss.audioChunks.push(e.data);
            };
            mediaRecorder.onstop = function () {
              var blob = new Blob(ss.audioChunks, { type: 'audio/webm' });
              if (ss.audioUrl) URL.revokeObjectURL(ss.audioUrl);
              ss.audioUrl = URL.createObjectURL(blob);
              ss.recordedBlob = blob;
              stream.getTracks().forEach(function (t) { t.stop(); });
              var wsFin = document.getElementById("vstep-workspace");
              if (wsFin) wsFin.innerHTML = self.renderSection("speaking");
            };
            mediaRecorder.start();
          } catch (err) {
            console.warn("MediaRecorder error:", err);
          }
        }

        if (!SpeechRecognition) {
          ss.recording = true;
          ss.recordStart = Date.now();
          ss.transcript = "";
          var ws = document.getElementById("vstep-workspace");
          if (ws) ws.innerHTML = self.renderSection("speaking");
          setTimeout(function () {
            ss.recording = false;
            ss.transcript =
              "(Trình duyệt không hỗ trợ Speech-to-Text. AI sẽ đánh giá dựa trên thời lượng ghi âm.)";
            ss.recordDuration = Math.round((Date.now() - ss.recordStart) / 1000);
            if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
            else {
              var wse = document.getElementById("vstep-workspace");
              if (wse) wse.innerHTML = self.renderSection("speaking");
            }
          }, 5000);
          return;
        }

        var recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;
        ss.recognition = recognition;
        ss.recording = true;
        ss.recordStart = Date.now();
        ss.transcript = "";

        recognition.onresult = function (event) {
          var finalTranscript = "";
          for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          ss.transcript = (ss.transcript + finalTranscript).trim();
        };

        recognition.onend = function () {
          ss.recording = false;
          ss.recordDuration = ss.recordStart
            ? Math.round((Date.now() - ss.recordStart) / 1000)
            : 0;
          // Stop MediaRecorder → onstop sẽ set audioUrl và re-render
          if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          } else {
            var we = document.getElementById("vstep-workspace");
            if (we) we.innerHTML = self.renderSection("speaking");
          }
        };

        recognition.start();
        var workspaceEl = document.getElementById("vstep-workspace");
        if (workspaceEl) workspaceEl.innerHTML = self.renderSection("speaking");
      }; // end startRecognition

      // Request mic access
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function (stream) { startRecognition(stream); })
          .catch(function (err) {
            console.warn("Mic access denied:", err);
            startRecognition(null);
          });
      } else {
        startRecognition(null);
      }
    }
  },

  updateSpeakingTranscript: function (value) {
    if (this.speaking) {
      this.speaking.transcript = value;
      this.speaking.result = null;
      this.saveState();
    }
  },

  gradeSpeaking: async function () {
    var ss = this.speaking;
    document.querySelectorAll(".speaking-grade-btn").forEach(function (btn) {
      btn.disabled = true;
      btn.textContent = "\u0110ang ph\u00e2n t\u00edch...";
    });
    var part = ss.part;
    var partData = VstepSpeakingData[part];
    var items =
      part === "part1"
        ? partData.topics
        : part === "part2"
          ? partData.tests
          : partData.topics;
    var item = items[ss.topicIndex] || items[0];
    var question = "";

    if (part === "part1") {
      question =
        "Topic: " + item.title + "\nQuestions: " + item.questions.join(" ");
    } else if (part === "part2") {
      question = item.situation;
    } else {
      question = item.topic;
    }

    if (!ss.transcript || ss.transcript.trim().length < 5) {
      ss.result = {
        score: "N/A",
        level: "Lỗi",
        fluency: "N/A",
        lexicalResource: "N/A",
        grammar: "N/A",
        pronunciation: "N/A",
        feedback:
          "<p>❌ Chưa có nội dung ghi âm. Hãy bấm nút <strong>Ghi âm</strong> và nói câu trả lời trước khi chấm điểm.</p>",
      };
      var ws = document.getElementById("vstep-workspace");
      if (ws) ws.innerHTML = this.renderSection("speaking");
      return;
    }

    try {
      var result = await GeminiService.gradeVstepSpeaking(
        partData.title,
        question,
        ss.transcript,
        ss.recordDuration || 0,
      );
      ss.result = result;
      App.addXp(25);
      App.updateProgress("en", 8);

      // Save completed topic with score
      var topicId = ss.part + "_" + ss.topicIndex;
      if (!ss.completedTopics) ss.completedTopics = {};
      ss.completedTopics[topicId] = {
        score: parseFloat(result.score),
        total: 9,
        submitted: true,
        timestamp: new Date().toISOString()
      };
      this.saveSpeakingToHistory(ss.transcript, result, ss.part, ss.topicIndex, ss.recordDuration || 0, ss.recordedBlob);
      this.saveState();

      // Track completed recording for progress calculation
      var recordingId = ss.part + "_" + ss.topicIndex + "_" + ss.questionIndex;
      var vstepState = StorageManager.getVstepState();
      if (!vstepState.speaking) vstepState.speaking = {};
      if (!vstepState.speaking.completedRecordings) vstepState.speaking.completedRecordings = [];
      if (vstepState.speaking.completedRecordings.indexOf(recordingId) < 0) {
        vstepState.speaking.completedRecordings.push(recordingId);
        StorageManager.setVstepState(vstepState);
      }
      
      // Record performance
      VstepView.recordPerformance("speaking", parseFloat(result.score), 9);
    } catch (e) {
      if (e.isRateLimit) {
        var retryAfter = e.retryAfter || 60;
        var maxRetries = 3;
        var retryCount = 0;
        var success = false;
        var ws = document.getElementById("vstep-workspace");
        while (retryCount < maxRetries && !success) {
          retryCount++;
          await GeminiService.showRetryCountdown(ws, "spk", retryAfter);
          try {
            var result2 = await GeminiService.gradeVstepSpeaking(
              partData.title,
              question,
              ss.transcript,
              ss.recordDuration || 0,
            );
            ss.result = result2;
            App.addXp(25);
            App.updateProgress("en", 8);

            // Save completed topic with score
            var topicId = ss.part + "_" + ss.topicIndex;
            if (!ss.completedTopics) ss.completedTopics = {};
            ss.completedTopics[topicId] = {
              score: parseFloat(result2.score),
              total: 9,
              submitted: true,
              timestamp: new Date().toISOString()
            };
            this.saveSpeakingToHistory(ss.transcript, result2, ss.part, ss.topicIndex, ss.recordDuration || 0, ss.recordedBlob);
            this.saveState();

            // Track completed recording for progress calculation
            var recordingId = ss.part + "_" + ss.topicIndex + "_" + ss.questionIndex;
            var vstepState = StorageManager.getVstepState();
            if (!vstepState.speaking) vstepState.speaking = {};
            if (!vstepState.speaking.completedRecordings) vstepState.speaking.completedRecordings = [];
            if (vstepState.speaking.completedRecordings.indexOf(recordingId) < 0) {
              vstepState.speaking.completedRecordings.push(recordingId);
              StorageManager.setVstepState(vstepState);
            }

            success = true;
          } catch (e2) {
            if (e2.isRateLimit) {
              retryAfter = e2.retryAfter || 60;
            } else {
              ss.result = {
                score: "N/A",
                level: "L\u1ed7i",
                fluency: "N/A",
                lexicalResource: "N/A",
                pronunciation: "N/A",
                grammar: "N/A",
                feedback:
                  '<p style="color:#ef4444;">L\u1ed7i: ' + e2.message + "</p>",
              };
              success = true;
            }
          }
        }
        if (!success) {
          ss.result = {
            score: "N/A",
            level: "L\u1ed7i",
            fluency: "N/A",
            lexicalResource: "N/A",
            pronunciation: "N/A",
            grammar: "N/A",
            feedback:
              '<div style="text-align:center;padding:1rem;color:#ef4444;"><div style="font-size:2rem;margin-bottom:0.75rem;">\u26A0\uFE0F</div><p style="font-size:0.9rem;line-height:1.5;">\u0110\u00e3 th\u1eed l\u1ea1i ' +
              maxRetries +
              ' l\u1ea7n nh\u01b0ng API Gemini v\u1eabn qu\u00e1 t\u1ea3i.</p><p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">Vui l\u00f2ng th\u1eed l\u1ea1i sau ho\u1eb7c c\u1ea5u h\u00ecnh API Key tr\u1ea3 ph\u00ed trong C\u00e0i \u0111\u1eb7t.</p></div>',
          };
        }
      } else {
        ss.result = {
          score: "N/A",
          level: "L\u1ed7i",
          fluency: "N/A",
          lexicalResource: "N/A",
          pronunciation: "N/A",
          grammar: "N/A",
          feedback: '<p style="color:#ef4444;">L\u1ed7i: ' + e.message + "</p>",
        };
      }
    }

    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("speaking");
  },

  // ------------------------------------------------------------------
  // ROADMAP SECTION
  // ------------------------------------------------------------------
  renderRoadmapSection: function () {
    var performanceChart = this.renderPerformanceChart();
    var wrongAnswerNotebook = this.renderWrongAnswerNotebook();
    return performanceChart + wrongAnswerNotebook + RoadmapView.render();
  },

  // ------------------------------------------------------------------
  // METHODS SECTION
  // ------------------------------------------------------------------
  renderMethodsSection: function () {
    var methods = VstepMockData.methods;
    var cards = methods
      .map(function (m) {
        var stepsHtml = m.steps
          .map(function (st) {
            return "<li>" + st + "</li>";
          })
          .join("");
        return (
          '<div class="glass-card method-card" style="padding:1.25rem;cursor:pointer;" onclick="VstepView.toggleMethodDetail(\'' +
          m.id +
          '\')">\n        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">\n          <span style="font-size:2rem;">' +
          m.icon +
          '</span>\n          <div>\n            <h3 style="font-size:1rem;margin:0;">' +
          m.name +
          '</h3>\n            <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.2rem;">' +
          m.goal +
          '</p>\n          </div>\n        </div>\n        <div id="' +
          m.id +
          '-detail" class="hidden" style="border-top:1px solid var(--border-color);padding-top:0.75rem;margin-top:0.5rem;">\n          <p style="font-size:0.9rem;font-weight:600;margin-bottom:0.5rem;">C\u00e1c b\u01b0\u1edbc th\u1ef1c hi\u1ec7n:</p>\n          <ol style="padding-left:1.25rem;font-size:0.85rem;line-height:1.7;">' +
          stepsHtml +
          '</ol>\n          <div style="margin-top:0.75rem;padding:0.5rem;background:rgba(245,158,11,0.1);border-radius:8px;font-size:0.85rem;color:var(--text-muted);">' +
          m.tip +
          '</div>\n        </div>\n        <div style="margin-top:0.5rem;font-size:0.8rem;color:var(--primary);">' +
          m.steps.length +
          " b\u01b0\u1edbc \u2022 Nh\u1ea5n \u0111\u1ec3 xem chi ti\u1ebft \u25be</div>\n      </div>"
        );
      })
      .join("");

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <h2 style="font-size:1.1rem;">Ph\u01b0\u01a1ng ph\u00e1p \u00f4n t\u1eadp VSTEP ch\u1ee7 \u0111\u1ed9ng</h2>\n        <p style="font-size:0.85rem;color:var(--text-muted);">8 ph\u01b0\u01a1ng ph\u00e1p h\u1ecdc t\u1eadp hi\u1ec7u qu\u1ea3 gi\u00fap b\u1ea1n t\u1ed1i \u01b0u h\u00f3a th\u1eddi gian \u00f4n thi v\u00e0 c\u1ea3i thi\u1ec7n \u0111i\u1ec3m s\u1ed1.</p>\n      </div>\n      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">' +
      cards +
      "</div>\n    "
    );
  },

  toggleMethodDetail: function (id) {
    var el = document.getElementById(id + "-detail");
    if (el) el.classList.toggle("hidden");
  },

  // ------------------------------------------------------------------
  // VSTEP VOCABULARY LEARNED TRACKER
  // ------------------------------------------------------------------
  getLearnedWords: function () {
    return StorageManager.getVstepLearnedWords();
  },
  saveLearnedWords: function (arr) {
    StorageManager.setVstepLearnedWords(arr);
  },
  toggleLearnedWord: function (wordId) {
    var arr = this.getLearnedWords();
    var idx = arr.indexOf(wordId);
    if (idx >= 0) {
      arr.splice(idx, 1);
    } else {
      arr.push(wordId);
    }
    this.saveLearnedWords(arr);
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("vstepVocab");
  },
  isWordLearned: function (wordId) {
    return this.getLearnedWords().indexOf(wordId) >= 0;
  },
  // ------------------------------------------------------------------
  // VSTEP VOCABULARY PRACTICE QUIZ
  // ------------------------------------------------------------------
  buildVstepVocabQuiz: function () {
    var pool = VstepVocabData.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, 10);
    var questions = pool.map(function (item) {
      var wrongs = VstepVocabData.filter(function (w) {
        return w.id !== item.id;
      })
        .sort(function () {
          return Math.random() - 0.5;
        })
        .slice(0, 3)
        .map(function (w) {
          return w.meaningVi;
        });
      var options = [item.meaningVi].concat(wrongs).sort(function () {
        return Math.random() - 0.5;
      });
      return {
        word: item.word,
        options: options,
        correct: item.meaningVi,
        id: item.id,
        ipa: item.ipa,
        example: item.example,
      };
    });
    this.vstepQuizState = {
      currentIdx: 0,
      score: 0,
      answered: false,
      questions: questions,
    };
  },

  renderVstepVocabQuiz: function () {
    var qs = this.vstepQuizState;
    if (!qs.questions || qs.questions.length === 0) this.buildVstepVocabQuiz();
    if (qs.currentIdx >= qs.questions.length) {
      var pct = Math.round((qs.score / qs.questions.length) * 100);
      return (
        '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <h2 style="font-size:1.1rem;">K\u1ebft qu\u1ea3 luy\u1ec7n t\u1eeb v\u1ef1ng VSTEP</h2>\n        <div style="text-align:center;padding:2rem;">\n          <div style="font-size:3rem;">' +
        (pct >= 80
          ? "\uD83C\uDF89"
          : pct >= 50
            ? "\uD83D\uDC4D"
            : "\uD83D\uDCDA") +
        '</div>\n          <div class="score-badge-circle" style="margin:1rem auto;font-size:1.4rem;">' +
        qs.score +
        "/" +
        qs.questions.length +
        '</div>\n          <p style="color:var(--text-muted);">B\u1ea1n \u0111\u1ea1t <strong style="color:var(--primary);">' +
        pct +
        '%</strong> s\u1ed1 c\u00e2u \u0111\xfang.</p>\n          <div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;">\n            <button class="btn btn-primary" onclick="VstepView.vstepVocabState.mode=\'browse\';VstepView.setSection(\'vstepVocab\')">\uD83D\uDCD6 V\u1ec1 danh s\u00e1ch</button>\n            <button class="btn btn-accent" onclick="VstepView.buildVstepVocabQuiz();VstepView.setSection(\'vstepVocab\')">\uD83D\uDD04 L\u00e0m l\u1ea1i</button>\n          </div>\n        </div>\n      </div>\n      '
      );
    }
    var q = qs.questions[qs.currentIdx];
    var opts = q.options
      .map(function (opt, i) {
        return (
          '<button class="option-btn" id="vq-opt-' +
          i +
          '" onclick="VstepView.checkVstepVocabAnswer(' +
          i +
          ')" ' +
          (qs.answered ? "disabled" : "") +
          ">" +
          opt +
          "</button>"
        );
      })
      .join("");
    var expl = qs.answered
      ? '<div class="explanation-box" style="margin-top:1rem;">' +
        (qs._lastCorrect
          ? "\u2705 \u0110\xfang!"
          : "\u274C Sai. \u0110\xe1p \xe1n: <strong>" +
            q.correct +
            "</strong>") +
        '<br><br><em>"' +
        q.example +
        '"</em></div><button class="btn btn-primary" style="margin-top:1rem;" onclick="VstepView.nextVstepVocabQuestion()">C\u00e2u ti\u1ebfp theo \u2192</button>'
      : "";
    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <h2 style="font-size:1.1rem;">\uD83C\uDFAF Luy\u1ec7n t\u1eeb v\u1ef1ng VSTEP</h2>\n        <div style="display:flex;justify-content:space-between;color:var(--text-muted);font-size:0.85rem;">\n          <span>C\u00e2u ' +
      (qs.currentIdx + 1) +
      " / " +
      qs.questions.length +
      "</span>\n          <span>\u0110\xfang: " +
      qs.score +
      '</span>\n        </div>\n      </div>\n      <div class="glass-card practice-card" style="padding:2rem;">\n        <div class="practice-question" style="font-size:1.3rem;">T\u1eeb "<strong>' +
      q.word +
      '</strong>" c\xf3 ngh\u0129a l\xe0 g\xec?</div>\n        <div style="text-align:center;color:var(--text-muted);font-family:var(--font-ipa);margin-bottom:1rem;">' +
      q.ipa +
      '</div>\n        <div class="practice-options">' +
      opts +
      "</div>\n        " +
      expl +
      "\n      </div>\n    "
    );
  },

  checkVstepVocabAnswer: function (selectedIdx) {
    var qs = this.vstepQuizState;
    if (qs.answered) return;
    qs.answered = true;
    var q = qs.questions[qs.currentIdx];
    var isCorrect = q.options[selectedIdx] === q.correct;
    if (isCorrect) {
      qs.score++;
      App.addXp(5);
    }
    qs._lastCorrect = isCorrect;
    var opts = document.querySelectorAll("#vstep-workspace .option-btn");
    opts.forEach(function (btn, i) {
      btn.disabled = true;
      if (q.options[i] === q.correct) btn.classList.add("correct");
      if (i === selectedIdx && !isCorrect) btn.classList.add("wrong");
    });
    var explArea = document.createElement("div");
    explArea.className = "explanation-box";
    explArea.style.marginTop = "1rem";
    explArea.innerHTML =
      (isCorrect
        ? "\u2705 \u0110\xfang!"
        : "\u274C Sai. \u0110\xe1p \xe1n: <strong>" + q.correct + "</strong>") +
      '<br><br><em>"' +
      q.example +
      '"</em>';
    var nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary";
    nextBtn.style.marginTop = "1rem";
    nextBtn.textContent = "C\u00e2u ti\u1ebfp theo \u2192";
    nextBtn.onclick = function () {
      VstepView.nextVstepVocabQuestion();
    };
    var container = document.querySelector("#vstep-workspace .practice-card");
    if (container) {
      container.appendChild(explArea);
      container.appendChild(nextBtn);
    }
  },

  nextVstepVocabQuestion: function () {
    this.vstepQuizState.currentIdx++;
    this.vstepQuizState.answered = false;
    var ws = document.getElementById("vstep-workspace");
    if (ws) ws.innerHTML = this.renderSection("vstepVocab");
  },

  // ------------------------------------------------------------------
  // VSTEP VOCABULARY SECTION
  // ------------------------------------------------------------------
  goToLearn: function (level, topic) {
    LearnView.vocabLevel = level || "all";
    LearnView.vocabTopic = topic || "all";
    LearnView.vocabSavedOnly = false;
    LearnView.activeMode = null;
    App.navigate("learn");
  },

  renderVstepVocabSection: function () {
    var state = this.vstepVocabState;
    if (state.mode === "practice") return this.renderVstepVocabQuiz();

    var data = VstepVocabData;
    var topics = [
      ...new Set(
        data.map(function (w) {
          return w.topic;
        }),
      ),
    ];
    var levels = ["all", "A2", "B1", "B2", "C1"];
    var learned = this.getLearnedWords();
    var filtered = data.filter(function (w) {
      if (state.level !== "all" && w.level !== state.level) return false;
      if (state.topic !== "all" && w.topic !== state.topic) return false;
      return true;
    });

    var learnedCount = learned.length;
    var totalCount = data.length;
    var learnedPct = Math.round((learnedCount / totalCount) * 100);

    var levelButtons = levels
      .map(function (l) {
        var cls = state.level === l ? "btn btn-accent" : "btn btn-secondary";
        return (
          '<button class="' +
          cls +
          '" style="font-size:0.68rem;padding:0.28rem 0.6rem;border-radius:10px;" onclick="VstepView.vstepVocabState.level=\'' +
          l +
          "';VstepView.setSection('vstepVocab')\">" +
          (l === "all" ? "T\u1ea5t c\u1ea3" : l) +
          "</button>"
        );
      })
      .join("");

    var topicButtons =
      '<button class="btn ' +
      (state.topic === "all" ? "btn-accent" : "btn-secondary") +
      '" style="font-size:0.68rem;padding:0.26rem 0.58rem;border-radius:10px;" onclick="VstepView.vstepVocabState.topic=\'all\';VstepView.setSection(\'vstepVocab\')">T\u1ea5t c\u1ea3</button>' +
      topics
        .map(function (t) {
          var cls = state.topic === t ? "btn btn-accent" : "btn btn-secondary";
          return (
            '<button class="' +
            cls +
            '" style="font-size:0.68rem;padding:0.26rem 0.58rem;border-radius:10px;" onclick="VstepView.vstepVocabState.topic=\'' +
            t +
            "';VstepView.setSection('vstepVocab')\">" +
            t.charAt(0).toUpperCase() +
            t.slice(1) +
            "</button>"
          );
        })
        .join("");

    var vocabCards =
      filtered.length === 0
        ? '<div class="glass-card" style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">Kh\u00f4ng t\u00ecm th\u1ea5y t\u1eeb v\u1ef1ng n\u00e0o. Vui l\u00f2ng ch\u1ecdn b\u1ed9 l\u1ecdc kh\u00e1c.</div>'
        : filtered
            .map(function (w) {
              var isLearned = learned.indexOf(w.id) >= 0;
              var toggleBtn = isLearned
                ? '<button class="btn" style="font-size:0.7rem;padding:0.25rem 0.6rem;background:rgba(16,185,129,0.15);border:1px solid var(--accent);color:var(--accent);" onclick="event.stopPropagation();VstepView.toggleLearnedWord(\'' +
                  w.id +
                  "')\">\u2705 \u0110\xe3 h\u1ecdc</button>"
                : '<button class="btn btn-secondary" style="font-size:0.7rem;padding:0.25rem 0.6rem;" onclick="event.stopPropagation();VstepView.toggleLearnedWord(\'' +
                  w.id +
                  "')\">\uD83D\uDCD6 \u0110\xe1nh d\u1ea5u \u0111\xe3 h\u1ecdc</button>";
              var learnBtn =
                '<button class="btn btn-primary" style="font-size:0.7rem;padding:0.2rem 0.6rem;" onclick="event.stopPropagation();VstepView.goToLearn(\'' +
                w.level +
                "','" +
                w.topic +
                "')\">\uD83C\uDF93 H\u1ecdc ngay</button>";
              return (
                '<div class="glass-card" style="padding:1rem;">' +
                toggleBtn +
                '\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;margin-top:0.5rem;">\n            <span class="badge badge-level" style="font-size:0.7rem;padding:0.2rem 0.5rem;">' +
                w.level +
                '</span>\n            <span style="font-size:0.75rem;color:var(--text-muted);background:var(--bg-input);padding:0.15rem 0.5rem;border-radius:4px;">' +
                w.topic +
                '</span>\n          </div>\n          <div style="font-size:1.15rem;font-weight:700;display:flex;align-items:center;gap:0.5rem;">' +
                w.word +
                '<button class="btn" style="font-size:0.7rem;padding:0.15rem 0.4rem;border-radius:50%;min-width:28px;min-height:28px;display:inline-flex;align-items:center;justify-content:center;background:var(--bg-input);border:1px solid var(--border-color);cursor:pointer;" onclick="event.stopPropagation();App.speak(\'' +
                w.word.replace(/'/g, "\\'") +
                '\',\'en\')" title="Nghe ph\u00e1t \u00e2m">\uD83D\uDD0A</button></div>\n          <div style="font-size:0.8rem;color:var(--text-muted);font-family:var(--font-ipa);">' +
                w.ipa +
                '</div>\n          <div style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">' +
                w.meaningVi +
                '</div>\n          <div style="margin-top:0.35rem;font-size:0.85rem;color:var(--text-muted);font-style:italic;border-left:3px solid var(--primary);padding-left:0.75rem;">' +
                w.example +
                '</div>\n          <div style="margin-top:0.5rem;text-align:right;">' +
                learnBtn +
                "</div>\n        </div>"
              );
            })
            .join("");

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">\n          <div>\n            <h2 style="font-size:1.1rem;">T\u1eeb v\u1ef1ng VSTEP theo ch\u1ee7 \u0111\u1ec1 & tr\u00ecnh \u0111\u1ed9</h2>\n            <p style="font-size:0.85rem;color:var(--text-muted);">B\u1ed9 t\u1eeb v\u1ef1ng ti\u1ebfng Anh d\u00e0nh ri\u00eang cho k\u1ef3 thi VSTEP, 10 ch\u1ee7 \u0111\u1ec1, 4 c\u1ea5p \u0111\u1ed9 (A2-C1).</p>\n          </div>\n          <button class="btn btn-accent" onclick="VstepView.goToLearn(VstepView.vstepVocabState.level,VstepView.vstepVocabState.topic)">\uD83C\uDF93 H\u1ecdc trong Trung t\u00e2m</button>\n        </div>\n        <div style="margin-top:1rem;padding:0.75rem;background:var(--bg-input);border-radius:8px;">\n          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.3rem;">\n            <span>\uD83D\uDCDA Ti\u1ebfn \u0111\u1ed9 h\u1ecdc t\u1eeb v\u1ef1ng</span>\n            <span>' +
      learnedCount +
      "/" +
      totalCount +
      " t\u1eeb (" +
      learnedPct +
      '%)</span>\n          </div>\n          <div class="progress-bar-container" style="height:6px;">\n            <div style="height:100%;background:var(--accent);border-radius:9999px;width:' +
      learnedPct +
      '%;transition:width 0.5s ease;"></div>\n          </div>\n        </div>\n      </div>\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">' +
      levelButtons +
      '</div>\n        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' +
      topicButtons +
      '</div>\n    </div>\n      <div class="vocab-grid">' +
      vocabCards +
      '</div>\n      <div style="margin-top:1rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">Hi\u1ec3n th\u1ecb ' +
      filtered.length +
      " / " +
      data.length +
      " t\u1eeb v\u1ef1ng</div>\n    "
    );
  },

  renderEssayVocabSection: function () {
    var data = VstepEssayVocab;
    var topicKeys = Object.keys(data);
    var selected = this.essayVocabTopic;
    if (!selected || !data[selected]) selected = topicKeys[0];

    var topicBtns = topicKeys
      .map(function (k) {
        var t = data[k];
        var isActive = k === selected;
        return (
          '<button class="btn ' +
          (isActive ? "btn-accent" : "btn-secondary") +
          '" style="flex:0 1 auto;min-width:0;padding:0.32rem 0.65rem;font-size:0.72rem;display:inline-flex;flex-direction:row;align-items:center;gap:0.32rem;line-height:1.2;border-radius:10px;" onclick="VstepView.saveState();VstepView.essayVocabTopic=\'' +
          k +
          "';VstepView.setSection('essayVocab')\">" +
          '<span style="font-size:1rem;">' +
          t.icon +
          "</span>" +
          "<span>" +
          t.title +
          "</span></button>"
        );
      })
      .join("");

    var topic = data[selected];

    var frameworkHtml =
      '<div style="padding:1rem;background:rgba(245,158,11,0.08);border-radius:12px;border-left:4px solid #f59e0b;margin-bottom:1rem;">' +
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">' +
      '<span style="font-size:1rem;">\uD83E\uDDE0</span>' +
      '<span style="font-weight:600;font-size:0.9rem;">T\u01B0 duy ch\u1EE7 \u0111\u1EC1</span></div>' +
      '<p style="font-size:0.85rem;line-height:1.6;color:var(--text-primary);">' +
      topic.framework +
      "</p></div>";

    var vocabHtml = topic.branches
      .map(function (branch, bi) {
        var nodesHtml = branch.nodes
          .map(function (node) {
            var labelHtml = node.label
              ? '<div style="font-weight:600;font-size:0.85rem;color:var(--primary);margin-bottom:0.35rem;">' +
                node.label +
                "</div>"
              : "";
            var itemsHtml = node.items
              .map(function (item) {
                var viDisplay = VstepView.essayVocabShowVi
                  ? '<span style="font-size:0.8rem;color:var(--text-muted);margin-left:1rem;text-align:right;flex-shrink:0;">' +
                    item.vi +
                    "</span>"
                  : "";
                return (
                  '<div style="display:flex;justify-content:space-between;align-items:center;padding:0.25rem 0 0.25rem 1.2rem;font-size:0.85rem;color:var(--text-secondary);position:relative;">' +
                  '<span style="position:absolute;left:0;color:var(--text-muted);">+</span>' +
                  "<span>" +
                  item.en +
                  "</span>" +
                  viDisplay +
                  "</div>"
                );
              })
              .join("");
            return (
              '<div style="margin-bottom:0.5rem;padding:0.5rem 0.75rem;background:var(--bg-input);border-radius:8px;border-left:3px solid var(--primary);">' +
              labelHtml +
              itemsHtml +
              "</div>"
            );
          })
          .join("");

        var branchColors = [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#a855f7",
          "#ef4444",
        ];
        var branchColor = branchColors[bi % branchColors.length];
        return (
          '<div style="margin-bottom:1rem;padding:0.75rem;background:rgba(0,0,0,0.02);border-radius:12px;border:1px solid var(--border-color);">' +
          '<h4 style="font-size:0.9rem;margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;color:' +
          branchColor +
          ';">' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:' +
          branchColor +
          ';color:white;font-size:0.7rem;font-weight:700;">' +
          (bi + 1) +
          "</span>" +
          branch.title +
          "</h4>" +
          '<div style="display:flex;flex-direction:column;gap:0.4rem;">' +
          nodesHtml +
          "</div></div>"
        );
      })
      .join("");

    var questionsHtml = topic.questions
      .map(function (q, i) {
        return (
          '<details style="margin-bottom:0.5rem;">' +
          '<summary style="cursor:pointer;font-size:0.85rem;font-weight:500;color:var(--primary);padding:0.5rem 0.75rem;background:var(--bg-input);border-radius:8px;">\uD83D\uDCDD \u0110\u1EC1 ' +
          (i + 1) +
          "</summary>" +
          '<div style="padding:0.75rem;font-size:0.85rem;line-height:1.6;color:var(--text-primary);border-left:3px solid var(--primary);margin-top:0.3rem;background:rgba(59,130,246,0.04);border-radius:0 8px 8px 0;">' +
          q +
          "</div>" +
          "</details>"
        );
      })
      .join("");

    return (
      '\n      <div class="glass-card" style="margin-bottom:1rem;padding:1rem 1.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">\n          <div>\n            <h2 style="font-size:1.1rem;margin-bottom:0.25rem;">\uD83D\uDCDD Essay Vocabulary - Level B1 - theo ch\u1EE7 \u0111\u1EC1</h2>\n            <p style="font-size:0.85rem;color:var(--text-muted);">T\u1EEB v\u1EF1ng v\u00E0 c\u1EA5u tr\u00FAc theo ch\u1EE7 \u0111\u1EC1 cho ph\u1EA7n Vi\u1EBFt lu\u1EADn VSTEP Task 2.</p>\n          </div>\n          <button class="btn ' +
      (this.essayVocabShowVi ? "btn-accent" : "btn-secondary") +
      '" style="font-size:0.8rem;padding:0.4rem 0.75rem;" onclick="VstepView.saveState();VstepView.essayVocabShowVi=!VstepView.essayVocabShowVi;VstepView.setSection(\'essayVocab\')">\uD83C\uDF10 ' +
      (this.essayVocabShowVi ? "\u0110ang d\u1ECBch" : "Ti\u1EBFng Anh") +
      '</button>\n        </div>\n      </div>\n      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">' +
      topicBtns +
      '</div>\n      <div class="glass-card" style="padding:1.25rem;">\n        ' +
      frameworkHtml +
      "\n        " +
      vocabHtml +
      '\n        <details style="margin-top:1rem;">\n          <summary style="cursor:pointer;font-size:0.9rem;font-weight:600;color:var(--accent);padding:0.5rem 0;">\uD83D\uDCCB B\u00E0i t\u1EADp \u00E1p d\u1EE5ng (' +
      topic.questions.length +
      ' \u0111\u1EC1)</summary>\n          <div style="margin-top:0.75rem;">' +
      questionsHtml +
      '</div>\n        </details>\n      </div>\n      <div class="glass-card" style="margin-top:1rem;padding:1.25rem;border-color:rgba(16,185,129,0.3);">\n        <details ' +
      (this.essayExpandOpen ? "open" : "") +
      '>\n          <summary style="cursor:pointer;font-size:1rem;font-weight:700;color:var(--accent);padding:0.5rem 0;display:flex;align-items:center;gap:0.5rem;" onclick="VstepView.essayExpandOpen=!VstepView.essayExpandOpen">\n            \uD83D\uDE80 M\u1EDF R\u1ED8NG <span style="font-size:0.8rem;font-weight:400;color:var(--text-muted);">\u2014 Vi\u1EBFt \u0111o\u1EA1n v\u0103n s\u1EED d\u1EE5ng t\u1EEB v\u1EF1ng ch\u1EE7 \u0111\u1EC1</span>\n          </summary>\n          <div style="margin-top:0.75rem;padding:0.75rem;background:rgba(16,185,129,0.05);border-radius:8px;border-left:4px solid var(--accent);font-size:0.85rem;line-height:1.6;">\n            <p><strong>H\u01B0\u1EDBng d\u1EABn:</strong> Ch\u1ECDn m\u1ED9t \u0111\u1EC1 b\u00E0i \u1EDF tr\u00EAn v\u00E0 vi\u1EBFt m\u1ED9t \u0111o\u1EA1n v\u0103n (100-150 t\u1EEB) s\u1EED d\u1EE5ng c\u00E0ng nhi\u1EC1u t\u1EEB v\u1EF1ng t\u1EEB c\u00E1c nh\u00E1nh ph\u00EDa tr\u00EAn c\u00E0ng t\u1ED1t. C\u1ED1 g\u1EAFng d\u00F9ng \u00EDt nh\u1EA5t 5-7 t\u1EEB/c\u1EE5m t\u1EEB.</p>\n          </div>\n          <textarea id="essay-expand-textarea" placeholder="Vi\u1EBFt \u0111o\u1EA1n v\u0103n c\u1EE7a b\u1EA1n v\u00E0o \u0111\u00E2y, c\u1ED1 g\u1EAFng l\u1ED3ng gh\u00E9p t\u1EEB v\u1EF1ng ch\u1EE7 \u0111\u1EC1 \u201C' +
      topic.title +
      '\u201D..." style="width:100%;min-height:180px;padding:1rem;border-radius:10px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.9rem;line-height:1.7;resize:vertical;margin-top:0.75rem;">' +
      (this.essayExpandText || "") +
      '</textarea>\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.75rem;">\n            <span id="essay-expand-count" style="font-size:0.8rem;color:var(--text-muted);">0 t\u1EEB</span>\n            <div style="display:flex;gap:0.5rem;">\n              <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.75rem;" onclick="VstepView.clearEssayExpand()">X\xF3a</button>\n              <button class="btn btn-accent" style="font-size:0.8rem;padding:0.4rem 0.75rem;" onclick="VstepView.saveEssayExpand()">\u0110\xE3 vi\u1EBFt xong</button>\n            </div>\n          </div>\n          <div id="essay-expand-result" style="margin-top:1rem;">' +
      (this.essayExpandResult || "") +
      "</div>\n        </details>\n      </div>\n    "
    );
  },

  saveEssayExpand: function () {
    var ta = document.getElementById("essay-expand-textarea");
    if (!ta) return;
    var text = ta.value.trim();
    this.essayExpandText = text;
    this.saveState();
    var count = text ? text.split(/\s+/).length : 0;
    var countEl = document.getElementById("essay-expand-count");
    if (countEl) countEl.textContent = count + " t\u1EEB";
    var keys = this.essayVocabTopic
      ? VstepEssayVocab[this.essayVocabTopic]
      : null;
    if (keys) {
      var allItems = [];
      keys.branches.forEach(function (b) {
        b.nodes.forEach(function (n) {
          n.items.forEach(function (item) {
            allItems.push(item.en.toLowerCase());
          });
        });
      });
      var lower = text.toLowerCase();
      var found = allItems.filter(function (vocab) {
        return lower.indexOf(vocab.toLowerCase()) >= 0;
      });
      var used = found.filter(function (v, i) {
        return found.indexOf(v) === i;
      });
      var resultHtml =
        '<div style="padding:0.75rem;background:rgba(16,185,129,0.06);border-radius:8px;border-left:4px solid var(--accent);">' +
        '<p style="font-weight:600;font-size:0.9rem;margin-bottom:0.5rem;">\u2705 K\u1EBFt qu\u1EA3 m\u1EDF r\u1ED9ng</p>' +
        '<p style="font-size:0.85rem;color:var(--text-muted);">S\u1ED1 t\u1EEB: <strong>' +
        count +
        '</strong> \u2022 T\u1EEB v\u1EF1ng ch\u1EE7 \u0111\u1EC1 \u0111\u00E3 d\u00F9ng: <strong style="color:var(--accent);">' +
        used.length +
        "</strong></p>";
      if (used.length > 0) {
        resultHtml +=
          '<div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.5rem;">' +
          used
            .map(function (v) {
              return (
                '<span style="display:inline-block;padding:0.2rem 0.5rem;background:rgba(16,185,129,0.1);border-radius:4px;font-size:0.8rem;color:var(--accent);">' +
                v +
                "</span>"
              );
            })
            .join("") +
          "</div>";
      } else {
        resultHtml +=
          '<p style="font-size:0.85rem;color:#f59e0b;margin-top:0.5rem;">\u26A0\uFE0F Ch\u01B0a d\u00F9ng t\u1EEB v\u1EF1ng n\u00E0o t\u1EEB ch\u1EE7 \u0111\u1EC1 n\u00E0y. H\u00E3y th\u1EED l\u1EA1i v\u1EDBi c\u00E1c t\u1EEB \u1EDF tr\u00EAn!</p>';
      }
      resultHtml += "</div>";
      this.essayExpandResult = resultHtml;
    } else {
      this.essayExpandResult =
        '<p style="color:var(--text-muted);">\u0110\xE3 l\u01B0u ' +
        count +
        " t\u1EEB.</p>";
    }
    var resultEl = document.getElementById("essay-expand-result");
    if (resultEl) resultEl.innerHTML = this.essayExpandResult;
  },

  clearEssayExpand: function () {
    this.essayExpandText = "";
    this.essayExpandResult = "";
    this.saveState();
    var ta = document.getElementById("essay-expand-textarea");
    if (ta) ta.value = "";
    var countEl = document.getElementById("essay-expand-count");
    if (countEl) countEl.textContent = "0 t\u1EEB";
    var resultEl = document.getElementById("essay-expand-result");
    if (resultEl) resultEl.innerHTML = "";
  },

  renderKhacSection: function () {
    var self = this;

    // -- Book data --
    var book = window.VstepEssayBookData || [];
    var bookHasData = book.length > 0;
    var catIdx = this.khacBookCategory || 0;
    if (catIdx >= book.length) catIdx = 0;
    var category = book[catIdx];
    var topIdx = this.khacBookTopic || 0;
    if (topIdx >= (category && category.topics ? category.topics.length : 0))
      topIdx = 0;
    var topic = category && category.topics ? category.topics[topIdx] : null;
    var showViB = this.khacBookShowVi;
    var bookMin = this.khacBookMinimized === true;

    // -- Mindmap data --
    var mmData = this._buildMindMapData();
    var mmMin = this.khacMmMinimized === true;
    var mmT = this.khacMmTopic || "transport";
    var mmSelected =
      mmData.filter(function (t) {
        return t.id === mmT;
      })[0] || mmData[0];
    var mmShowVi = this.khacMmShowVi === true;
    var mmZ = this.khacMmZoom || 1;
    if (!this.khacMmTopic) this.khacMmTopic = mmSelected.id;

    // -- Methods data --
    var methodsMin = this.khacMethodsMinimized === true;

    // ----------------------------------------------------------
    //  BOOK SQUARE
    // ----------------------------------------------------------
    var bookSquare =
      '<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;min-width:100px;">' +
      '<div style="width:96px;height:96px;background:linear-gradient(135deg,#3b82f6,#6366f1);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-size:2.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(59,130,246,0.3);transition:all 0.2s;' +
      (bookMin ? "" : "outline:3px solid rgba(255,255,255,0.5);") +
      '" onclick="VstepView.khacToggle(\'book\')" title="' +
      (bookMin ? "M\u1edf r\u1ed9ng" : "Thu g\u1ecdn") +
      '">' +
      '<span style="font-size:1.8rem;line-height:1;">&#x1F4D6;</span>' +
      "</div>" +
      '<span style="margin-top:6px;font-size:0.7rem;font-weight:700;color:#3b82f6;text-align:center;line-height:1.3;">ESSAY<br>TOPICS<br>BOOK</span>' +
      "</div>";

    // ----------------------------------------------------------
    //  BRAIN SQUARE
    // ----------------------------------------------------------
    var brainSquare =
      '<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;min-width:100px;">' +
      '<div style="width:96px;height:96px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-size:2.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(245,158,11,0.3);transition:all 0.2s;' +
      (mmMin ? "" : "outline:3px solid rgba(255,255,255,0.5);") +
      '" onclick="VstepView.khacToggle(\'mm\')" title="' +
      (mmMin ? "M\u1edf r\u1ed9ng" : "Thu g\u1ecdn") +
      '">' +
      '<span style="font-size:1.8rem;line-height:1;">&#x1F9E0;</span>' +
      "</div>" +
      '<span style="margin-top:6px;font-size:0.7rem;font-weight:700;color:#f59e0b;text-align:center;line-height:1.3;">MINDMAP<br>S\u01A0 \u0110\u1ED2<br>T\u01AF DUY</span>' +
      "</div>";

    // ----------------------------------------------------------
    //  METHODS SQUARE
    // ----------------------------------------------------------
    var methodsSquare =
      '<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;min-width:100px;">' +
      '<div style="width:96px;height:96px;background:linear-gradient(135deg,#10b981,#059669);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-size:2.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(16,185,129,0.3);transition:all 0.2s;' +
      (methodsMin ? "" : "outline:3px solid rgba(255,255,255,0.5);") +
      '" onclick="VstepView.khacToggle(\'methods\')" title="' +
      (methodsMin ? "M\u1edf r\u1ed9ng" : "Thu g\u1ecdn") +
      '">' +
      '<span style="font-size:1.8rem;line-height:1;">&#x1F527;</span>' +
      "</div>" +
      '<span style="margin-top:6px;font-size:0.7rem;font-weight:700;color:#10b981;text-align:center;line-height:1.3;">PH\u01AF\u01A0NG<br>PH\u00C1P</span>' +
      "</div>";

    var vocabMin = this.khacVocabMinimized === true;
    // -- Idea data --
    var ideaData = window.VstepIdeaData || [];
    var ideaIdx = this.khacIdeaTopic || 0;
    if (ideaIdx >= ideaData.length) ideaIdx = 0;
    var ideaTopic = ideaData[ideaIdx];
    var ideaShowVi = this.khacIdeaShowVi === true;
    var ideaMin = this.khacIdeaMinimized === true;

    var vocabSquare =
      '<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;min-width:100px;">' +
      '<div style="width:96px;height:96px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-size:2.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(139,92,246,0.3);transition:all 0.2s;' +
      (vocabMin ? "" : "outline:3px solid rgba(255,255,255,0.5);") +
      '" onclick="VstepView.khacToggle(\'vocab\')" title="' +
      (vocabMin ? "M\u1edf r\u1ed9ng" : "Thu g\u1ecdn") +
      '">' +
      '<span style="font-size:1.8rem;line-height:1;">&#x1F4DA;</span>' +
      "</div>" +
      '<span style="margin-top:6px;font-size:0.7rem;font-weight:700;color:#8b5cf6;text-align:center;line-height:1.3;">TỪ VựNG<br>THEO<br>CHỦ ĐỀ</span>' +
      "</div>";

    var ideaSquare =
      '<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;min-width:100px;">' +
      '<div style="width:96px;height:96px;background:linear-gradient(135deg,#f43f5e,#e11d48);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-size:2.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(244,63,94,0.3);transition:all 0.2s;' +
      (ideaMin ? "" : "outline:3px solid rgba(255,255,255,0.5);") +
      '" onclick="VstepView.khacToggle(\'idea\')" title="' +
      (ideaMin ? "M\u1edf r\u1ed9ng" : "Thu g\u1ecdn") +
      '">' +
      '<span style="font-size:1.8rem;line-height:1;">&#x1F4A1;</span>' +
      "</div>" +
      '<span style="margin-top:6px;font-size:0.7rem;font-weight:700;color:#f43f5e;text-align:center;line-height:1.3;">IDEA &<br>VOCAB<br>BANK</span>' +
      "</div>";

    var anyOpen =
      !bookMin || !mmMin || !methodsMin || !vocabMin || !ideaMin;
    var collapseAllBtn = anyOpen
      ? '<div style="text-align:center;padding:0 0 0.75rem 0;">' +
        '<button class="btn btn-secondary" style="font-size:0.75rem;padding:0.35rem 1rem;" onclick="VstepView.khacCollapseAll()">\u2B05\uFE0F Thu g\u1ECDn t\u1EA5t c\u1EA3 t\u00E0i li\u1EC7u</button>' +
        "</div>"
      : "";

    var squaresRow =
      '<div class="khac-squares-grid">' +
      bookSquare +
      brainSquare +
      methodsSquare +
      vocabSquare +
      ideaSquare +
      "</div>" +
      collapseAllBtn;

    // ----------------------------------------------------------
    //  BUILD BOOK PANEL
    // ----------------------------------------------------------
    var bookPanel = "";
    if (!bookMin && bookHasData && category && topic) {
      var catBtns = book
        .map(function (c, i) {
          var act = i === catIdx;
          return (
            '<button class="btn ' +
            (act ? "btn-accent" : "btn-secondary") +
            '" style="font-size:0.7rem;padding:0.25rem 0.5rem;white-space:nowrap;" onclick="VstepView.khacBookCategory=' +
            i +
            ";VstepView.khacBookTopic=0;VstepView.setSection('khac')\">" +
            c.icon +
            " " +
            c.cat +
            "</button>"
          );
        })
        .join("");

      var topBtns = (category.topics || [])
        .map(function (t, i) {
          var act = i === topIdx;
          return (
            '<button class="btn ' +
            (act ? "btn-accent" : "btn-secondary") +
            '" style="font-size:0.65rem;padding:0.2rem 0.4rem;min-width:28px;" onclick="VstepView.khacBookTopic=' +
            i +
            ";VstepView.setSection('khac')\" title=\"" +
            self._escapeHtml(t.title) +
            '">' +
            (i + 1) +
            "</button>"
          );
        })
        .join("");

      var topicHtml =
        '<div style="font-weight:700;font-size:1rem;color:#3b82f6;margin-bottom:8px;">' +
        '<span style="background:#3b82f6;color:white;border-radius:3px;padding:0 6px;font-size:0.75rem;margin-right:6px;">' +
        topic.n +
        "</span>" +
        self._escapeHtml(topic.title) +
        "</div>";

      var ptsHtml = (topic.points || [])
        .map(function (p) {
          var en = p.en || "";
          var vi = p.vi || "";
          var isNote = p.note || false;
          var icon = isNote
            ? '<span style="color:#f59e0b;font-weight:800;margin-right:4px;">!</span>'
            : '<span style="color:#3b82f6;margin-right:4px;">&#x2022;</span>';
          return (
            '<div style="margin-bottom:6px;padding:6px 10px;background:' +
            (isNote ? "rgba(245,158,11,0.06)" : "rgba(59,130,246,0.03)") +
            ";border-left:2px solid " +
            (isNote ? "#f59e0b" : "#3b82f6") +
            ';border-radius:4px;">' +
            '<div style="display:flex;gap:6px;">' +
            '<span style="flex-shrink:0;margin-top:2px;">' +
            icon +
            "</span>" +
            '<div style="flex:1;">' +
            '<div style="font-size:0.88rem;line-height:1.5;">' +
            self._escapeHtml(en) +
            "</div>" +
            (showViB && vi
              ? '<div style="font-size:0.78rem;color:var(--text-muted);font-style:italic;line-height:1.5;margin-top:2px;">' +
                self._escapeHtml(vi) +
                "</div>"
              : "") +
            "</div>" +
            "</div>" +
            "</div>"
          );
        })
        .join("");

      var contentHtml =
        '<div style="max-height:480px;overflow-y:auto;padding-right:4px;">' +
        topicHtml +
        ptsHtml +
        "</div>";

      bookPanel =
        '<div style="flex:1;min-width:0;margin-bottom:0.75rem;">' +
        '<div class="glass-card" style="padding:0.75rem;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.35rem;margin-bottom:8px;">' +
        '<div class="khac-book-categories" role="list" aria-label="Chuyên mục sách">' +
        catBtns +
        "</div>" +
        '<button class="btn ' +
        (showViB ? "btn-accent" : "btn-secondary") +
        '" style="font-size:0.8rem;padding:0.5rem 0.75rem;" onclick="VstepView.khacBookShowVi=!VstepView.khacBookShowVi;VstepView.setSection(\'khac\')">&#x1F310; ' +
        (showViB ? "EN+VI" : "English") +
        "</button>" +
        "</div>" +
        '<div style="display:flex;gap:0.25rem;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border-color);">' +
        '<span style="font-size:0.8rem;color:var(--text-muted);margin-right:8px;line-height:44px;align-self:center;">' +
        category.cat +
        ":</span>" +
        '<div class="khac-book-topics" role="list" aria-label="Chủ đề">' +
        topBtns +
        "</div>" +
        "</div>" +
        '<div style="padding:0 4px;">' +
        contentHtml +
        "</div>" +
        "</div>" +
        "</div>";
    }

    // ----------------------------------------------------------
    //  BUILD MINDMAP PANEL
    // ----------------------------------------------------------
    var mmPanel = "";
    if (!mmMin) {
      var topicBtns = mmData
        .map(function (t) {
          var active = t.id === mmT;
          return (
            '<button class="btn ' +
            (active ? "btn-accent" : "btn-secondary") +
            '" style="font-size:0.75rem;padding:0.25rem 0.55rem;" onclick="VstepView.khacMmTopic=\'' +
            t.id +
            "';VstepView.setSection('khac')\">" +
            t.emoji +
            " " +
            t.label +
            "</button>"
          );
        })
        .join("");

      var treeHtml = this._renderMmTree(mmSelected, mmShowVi, 0);

      mmPanel =
        '<div style="flex:1;min-width:0;margin-bottom:0.75rem;">' +
        '<div class="glass-card" style="padding:0.75rem;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:8px;">' +
        '<div style="display:flex;align-items:center;gap:0.5rem;">' +
        '<span style="font-size:1.1rem;">&#x1F9E0;</span>' +
        '<span style="font-size:0.9rem;font-weight:700;">' +
        mmSelected.emoji +
        " " +
        mmSelected.label +
        "</span>" +
        "</div>" +
        '<div style="display:flex;gap:0.35rem;align-items:center;">' +
        '<button class="btn btn-secondary" style="font-size:0.7rem;padding:0.2rem 0.35rem;" onclick="VstepView.khacMmZoom=Math.max(0.4,VstepView.khacMmZoom-0.2);VstepView.setSection(\'khac\')">&minus;</button>' +
        '<span style="font-size:0.75rem;color:var(--text-muted);min-width:32px;text-align:center;">' +
        Math.round(mmZ * 100) +
        "%</span>" +
        '<button class="btn btn-secondary" style="font-size:0.7rem;padding:0.2rem 0.35rem;" onclick="VstepView.khacMmZoom=Math.min(2,VstepView.khacMmZoom+0.2);VstepView.setSection(\'khac\')">+</button>' +
        '<button class="btn btn-secondary" style="font-size:0.65rem;padding:0.2rem 0.35rem;" onclick="VstepView.khacMmZoom=1;VstepView.setSection(\'khac\')">&#x1F504;</button>' +
        '<button class="btn ' +
        (mmShowVi ? "btn-accent" : "btn-secondary") +
        '" style="font-size:0.8rem;padding:0.5rem 0.75rem;" onclick="VstepView.khacMmShowVi=!VstepView.khacMmShowVi;VstepView.setSection(\'khac\')">&#x1F310; ' +
        (mmShowVi ? "EN+VI" : "EN") +
        "</button>" +
        "</div>" +
        "</div>" +
        '<div class="khac-mindmap-topics" role="list" aria-label="Chủ đề mindmap">' +
        topicBtns +
        "</div>" +
        '<div style="padding:0.5rem;overflow:auto;border:1px solid var(--border-color);border-radius:8px;">' +
        '<div style="transform:scale(' +
        mmZ +
        ');transform-origin:top left;transition:transform 0.2s;">' +
        treeHtml +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    }

    // ----------------------------------------------------------
    //  BUILD METHODS PANEL
    // ----------------------------------------------------------
    var methodsPanel = "";
    if (!methodsMin) {
      var methods = (window.VstepMockData && VstepMockData.methods) || [];
      var cards = methods
        .map(function (m) {
          var stepsHtml = m.steps
            .map(function (st) {
              return "<li>" + st + "</li>";
            })
            .join("");
          return (
            '<div class="glass-card method-card" style="padding:1.25rem;cursor:pointer;" onclick="VstepView.toggleMethodDetail(\'' +
            m.id +
            "')\">" +
            '<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">' +
            '<span style="font-size:2rem;">' +
            m.icon +
            "</span>" +
            "<div>" +
            '<h3 style="font-size:1rem;margin:0;">' +
            m.name +
            "</h3>" +
            '<p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.2rem;">' +
            m.goal +
            "</p>" +
            "</div>" +
            "</div>" +
            '<div id="' +
            m.id +
            '-detail" class="hidden" style="border-top:1px solid var(--border-color);padding-top:0.75rem;margin-top:0.5rem;">' +
            '<p style="font-size:0.9rem;font-weight:600;margin-bottom:0.5rem;">C\u00e1c b\u01b0\u1edbc th\u1ef1c hi\u1ec7n:</p>' +
            '<ol style="padding-left:1.25rem;font-size:0.85rem;line-height:1.7;">' +
            stepsHtml +
            "</ol>" +
            '<div style="margin-top:0.75rem;padding:0.5rem;background:rgba(245,158,11,0.1);border-radius:8px;font-size:0.85rem;color:var(--text-muted);">' +
            m.tip +
            "</div>" +
            "</div>" +
            '<div style="margin-top:0.5rem;font-size:0.8rem;color:var(--primary);">' +
            m.steps.length +
            " b\u01b0\u1edbc \u2022 Nh\u1ea5n \u0111\u1ec3 xem chi ti\u1ebft \u25be</div>" +
            "</div>"
          );
        })
        .join("");

      methodsPanel =
        '<div style="flex:1;min-width:0;margin-bottom:0.75rem;">' +
        '<div class="glass-card" style="padding:0.75rem;">' +
        '<div style="margin-bottom:0.75rem;">' +
        '<h2 style="font-size:1rem;margin:0;">Ph\u01b0\u01a1ng ph\u00e1p \u00f4n t\u1eadp VSTEP ch\u1ee7 \u0111\u1ed9ng</h2>' +
        '<p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">8 ph\u01b0\u01a1ng ph\u00e1p h\u1ecdc t\u1eadp hi\u1ec7u qu\u1ea3 gi\u00fap b\u1ea1n t\u1ed1i \u01b0u h\u00f3a th\u1eddi gian \u00f4n thi v\u00e0 c\u1ea3i thi\u1ec7n \u0111i\u1ec3m s\u1ed1.</p>' +
        "</div>" +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">' +
        cards +
        "</div>" +
        "</div>" +
        "</div>";
    }

    // ----------------------------------------------------------
    //  BUILD VOCAB PANEL
    // ----------------------------------------------------------
    var vocabPanel = "";
    if (!vocabMin) {
      var vTopics = this._khacVocabData || [];
      if (!this._khacVocabData) {
        this._initKhacVocabData();
        vTopics = this._khacVocabData;
      }
      var vIdx = this.khacVocabTopic || 0;
      if (vIdx >= vTopics.length) vIdx = 0;
      var vTopic = vTopics[vIdx];

      var showViV = this.khacVocabShowVi === true;

      var vTopicBtns = vTopics
        .map(function (t, i) {
          var act = i === vIdx;
          return (
            '<button class="btn ' +
            (act ? "btn-accent" : "btn-secondary") +
            '" style="font-size:0.85rem;padding:0.5rem 0.9rem;white-space:nowrap;" onclick="VstepView.saveState();VstepView.khacVocabTopic=' +
            i +
            ";VstepView.setSection('khac')\">" +
            t.icon +
            " " +
            t.label +
            "</button>"
          );
        })
        .join("");

      var vocViBtn =
        '<button class="btn ' +
        (showViV ? "btn-accent" : "btn-secondary") +
        '" style="font-size:0.85rem;padding:0.5rem 0.9rem;" onclick="VstepView.khacVocabShowVi=!VstepView.khacVocabShowVi;VstepView.setSection(\'khac\')">\uD83C\uDF10 ' +
        (showViV ? "EN+VI" : "English") +
        "</button>";

      vocabPanel =
        '<div style="flex:1;min-width:0;margin-bottom:0.75rem;">' +
        '<div class="glass-card" style="padding:0.75rem;">' +
        '<div class="khac-vocab-topics" role="list" aria-label="Chủ đề từ vựng">' +
        vTopicBtns +
        "</div>" +
        '<div style="display:flex;gap:0.5rem;margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid var(--border-color);justify-content:flex-end;">' +
        vocViBtn +
        "</div>" +
        '<div style="max-height:520px;overflow-y:auto;padding:0.5rem;border:1px solid var(--border-color);border-radius:8px;background:var(--card-bg);margin-top:0.5rem;">' +
        self._khacVocabWithBorders(vTopic.html, showViV) +
        "</div>" +
        "</div>" +
        "</div>";
    }

    // ----------------------------------------------------------
    //  BUILD IDEA PANEL
    // ----------------------------------------------------------
    var ideaPanel = "";
    if (!ideaMin && ideaData.length > 0 && ideaTopic) {
      var ideaTopicBtns = ideaData
        .map(function (t, i) {
          var act = i === ideaIdx;
          return (
            '<button class="btn ' +
            (act ? "btn-accent" : "btn-secondary") +
            '" style="font-size:0.85rem;padding:0.5rem 0.9rem;white-space:nowrap;" onclick="VstepView.saveState();VstepView.khacIdeaTopic=' +
            i +
            ";VstepView.setSection('khac')\">" +
            t.icon +
            " " +
            t.label +
            "</button>"
          );
        })
        .join("");

      var ideaShowViBtn =
        '<button class="btn ' +
        (ideaShowVi ? "btn-accent" : "btn-secondary") +
        '" style="font-size:0.85rem;padding:0.5rem 0.9rem;" onclick="VstepView.khacIdeaShowVi=!VstepView.khacIdeaShowVi;VstepView.setSection(\'khac\')">&#x1F310; ' +
        (ideaShowVi ? "EN+VI" : "English") +
        "</button>";

      ideaPanel =
        '<div style="flex:1;min-width:0;margin-bottom:0.75rem;">' +
        '<div class="glass-card" style="padding:0.75rem;">' +
        '<div class="khac-idea-topics" role="list" aria-label="Chủ đề ý tưởng">' +
        ideaTopicBtns +
        "</div>" +
        '<div style="display:flex;gap:0.5rem;margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid var(--border-color);justify-content:flex-end;">' +
        ideaShowViBtn +
        "</div>" +
        '<div style="max-height:520px;overflow-y:auto;padding:0.5rem;border:1px solid var(--border-color);border-radius:8px;background:var(--card-bg);margin-top:0.5rem;" id="khac-idea-content">' +
        '<div style="max-height:520px;overflow-y:auto;padding:0.5rem;border:1px solid var(--border-color);border-radius:8px;background:var(--card-bg);" id="khac-idea-content">' +
        self._renderIdeaContent(ideaTopic, ideaShowVi) +
        "</div>" +
        "</div>" +
        "</div>";
    }

    // ----------------------------------------------------------
    //  FINAL LAYOUT
    // ----------------------------------------------------------
    if (bookMin && mmMin && methodsMin && vocabMin && ideaMin) {
      return squaresRow;
    }

    var panels = "";
    if (!bookMin) panels += bookPanel;
    if (!mmMin) panels += mmPanel;
    if (!methodsMin) panels += methodsPanel;
    if (!vocabMin) panels += vocabPanel;
    if (!ideaMin) panels += ideaPanel;

    return (
      squaresRow +
      '<div style="display:flex;flex-direction:column;gap:0.75rem;">' +
      panels +
      "</div>"
    );
  },

  // Accordion: chỉ mở 1 tài liệu tại 1 thời điểm trong mục KHÁC
  khacToggle: function (key) {
    var map = {
      book: "khacBookMinimized",
      mm: "khacMmMinimized",
      methods: "khacMethodsMinimized",
      vocab: "khacVocabMinimized",
      idea: "khacIdeaMinimized",
    };
    var prop = map[key];
    if (!prop) return;
    var willOpen = this[prop] === true;
    Object.keys(map).forEach(function (k) {
      this[map[k]] = true;
    }, this);
    if (willOpen) this[prop] = false;
    this.setSection("khac");
  },

  khacCollapseAll: function () {
    this.khacBookMinimized = true;
    this.khacMmMinimized = true;
    this.khacMethodsMinimized = true;
    this.khacVocabMinimized = true;
    this.khacIdeaMinimized = true;
    this.setSection("khac");
  },

  // ------------------------------------------------------------------
  // MINDMAP TREE HELPERS
  // ------------------------------------------------------------------

  _renderMmTree: function (node, showVi, depth) {
    if (!node) return "";
    var self = this;
    var branchId = "mm-" + Math.random().toString(36).substr(2, 6);
    var hasChildren = node.children && node.children.length > 0;
    var color =
      node.color ||
      (depth === 0 ? "#3b82f6" : depth === 1 ? "#8b5cf6" : "#10b981");

    if (depth === 0) {
      var root =
        '<div style="display:inline-flex;flex-direction:column;align-items:center;padding:1rem 1.5rem;background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(99,102,241,0.07));border:2px solid rgba(59,130,246,0.2);border-radius:16px;text-align:center;box-shadow:0 2px 10px rgba(59,130,246,0.06);">' +
        '<div style="font-size:2rem;line-height:1;margin-bottom:0.25rem;">' +
        node.emoji +
        "</div>" +
        '<span style="font-weight:800;font-size:1rem;color:var(--primary);">' +
        self._escapeHtml(node.label) +
        "</span>" +
        "</div>";
      if (!hasChildren) return root;
      var kids = node.children
        .map(function (c) {
          return (
            '<div style="margin-top:4px;">' +
            self._renderMmTree(c, showVi, 1) +
            "</div>"
          );
        })
        .join("");
      return (
        '<div style="display:flex;flex-direction:row;align-items:flex-start;gap:20px;">' +
        root +
        '<div style="display:flex;flex-direction:column;padding-left:14px;border-left:2px solid rgba(59,130,246,0.18);">' +
        kids +
        "</div></div>"
      );
    }

    var dot = hasChildren
      ? '<span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;min-width:20px;border-radius:50%;background:' +
        color +
        ";cursor:pointer;box-shadow:0 1px 4px " +
        color +
        '40;" id="' +
        branchId +
        '-dot" onclick="VstepView._toggleMmBranch(\'' +
        branchId +
        '\')" title="B?m d? m?/thu g?n">' +
        '<span id="' +
        branchId +
        '-arrow" style="font-size:0.4rem;color:white;transition:transform 0.2s;">&#x25B6;</span></span>'
      : '<span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;min-width:16px;border-radius:50%;background:' +
        color +
        "15;font-size:0.4rem;color:" +
        color +
        ";border:1px solid " +
        color +
        '30;">&#x2022;</span>';

    var labelStyle =
      'style="font-weight:' +
      (depth === 1 ? "600" : "500") +
      ";font-size:" +
      (depth === 1 ? "0.9rem" : "0.84rem") +
      ';color:var(--text-primary);line-height:1.4;"';
    var text =
      '<div style="display:flex;align-items:flex-start;gap:6px;flex-wrap:wrap;">' +
      "<span " +
      labelStyle +
      ">" +
      self._escapeHtml(node.label) +
      "</span>" +
      (showVi && node.vi
        ? '<span style="font-size:0.7rem;color:var(--text-muted);font-style:italic;background:' +
          color +
          '0C;padding:1px 6px;border-radius:4px;margin-top:1px;line-height:1.4;">' +
          self._escapeHtml(node.vi) +
          "</span>"
        : "") +
      "</div>";

    var row =
      '<div style="display:flex;flex-direction:row;align-items:flex-start;gap:8px;padding:4px 0;">' +
      dot +
      text +
      "</div>";

    var container = "";
    if (hasChildren) {
      var kids = node.children
        .map(function (c) {
          return (
            '<div style="margin-top:2px;">' +
            self._renderMmTree(c, showVi, depth + 1) +
            "</div>"
          );
        })
        .join("");
      container =
        '<div id="' +
        branchId +
        '-children" style="display:flex;flex-direction:column;padding-left:' +
        (depth === 1 ? 28 : 24) +
        "px;border-left:1.5px solid " +
        color +
        '18;margin-top:1px;">' +
        kids +
        "</div>";
    }

    if (depth === 1) {
      return (
        '<div style="padding:5px 10px 5px 8px;background:linear-gradient(90deg,' +
        color +
        "08," +
        color +
        "02);border-radius:8px;border:1px solid " +
        color +
        '12;">' +
        row +
        container +
        "</div>"
      );
    }
    return "<div>" + row + container + "</div>";
  },

  _toggleMmBranch: function (id) {
    var kids = document.getElementById(id + "-children");
    var arrow = document.getElementById(id + "-arrow");
    if (kids) {
      if (kids.style.display === "none") {
        kids.style.display = "";
        if (arrow) arrow.style.transform = "rotate(90deg)";
      } else {
        kids.style.display = "none";
        if (arrow) arrow.style.transform = "";
      }
    }
  },

  _buildMindMapData: function () {
    return [
      {
        id: "transport",
        emoji: "&#x1F68C;",
        label: "TRANSPORT",
        children: [
          {
            label: "Advantages",
            color: "#10b981",
            children: [
              {
                label: "Be safer",
                children: [{ label: "Have fewer accidents" }],
              },
              {
                label: "Never think about the weather",
                vi: "Tránh bị ướt, bẩn",
                children: [{ label: "Rain, storm, sun, dark at night" }],
              },
              {
                label: "Feel comfortable and relaxed",
                children: [
                  { label: "Listen to music" },
                  { label: "Read books / take a nap", vi: "Chợp mắt 1 lúc" },
                  {
                    label: "Enjoy the roadside view",
                    vi: "Ngắm cảnh ven đường, quan sát sinh hoạt của mọi người",
                  },
                ],
              },
              {
                label: "Be convenient and fast",
                children: [{ label: "Travel wherever & whenever I want" }],
              },
              {
                label: "Cheap (bus)",
                vi: "Học sinh, sinh viên được giảm giá vé khi mang theo thẻ",
              },
            ],
          },
          {
            label: "Disadvantages",
            color: "#ef4444",
            children: [
              {
                label: "Be inconvenient",
                children: [
                  {
                    label: "Run slowly (infrastructure bad)",
                    vi: "Cơ sở hạ tầng kém",
                  },
                  { label: "Long waiting times", vi: "Chờ xe 5-10 phút" },
                ],
              },
              {
                label: "Health risks",
                children: [
                  {
                    label: "Higher chance of diseases (esp. Covid-19)",
                    vi: "Nguy c\u01a1 cao m\u1eafc c\u00e1c b\u1ec7nh truy\u1ec1n nhi\u1ec5m",
                  },
                ],
              },
              {
                label: "Rush hours",
                children: [
                  {
                    label: "Crowded at 6am/6pm",
                    vi: "Khá đông đúc vào giờ cao điểm",
                  },
                ],
              },
              {
                label: "Poor public transport",
                children: [
                  {
                    label: "Downgraded, broken AC",
                    vi: "Xe xuống cấp, máy điều hòa hư",
                  },
                ],
              },
              { label: "Traffic jams" },
            ],
          },
        ],
      },
      {
        id: "city",
        emoji: "&#x1F3D9;&#xFE0F;",
        label: "CITY",
        children: [
          {
            label: "Places",
            color: "#8b5cf6",
            children: [
              { label: "Restaurants, cinemas, shopping malls, skyscrapers" },
            ],
          },
          {
            label: "Advantages",
            color: "#10b981",
            children: [
              {
                label: "Interesting city life",
                children: [
                  { label: "Many entertainments: restaurants, parks, cinemas" },
                ],
              },
              {
                label: "Convenience",
                children: [
                  {
                    label: "Near hospitals, supermarkets, schools",
                    vi: "Thu\u1eadn l\u1ee3i cho h\u1ecdc t\u1eadp, ch\u0103m s\u00f3c s\u1ee9c kh\u1ecfe",
                  },
                ],
              },
              {
                label: "Higher incomes",
                children: [{ label: "Save more money; buy what I like" }],
              },
              {
                label: "More career opportunities",
                children: [
                  { label: "Better salary" },
                  {
                    label: "Advance experiences & skills",
                    vi: "Trau dồi kinh nghiệm và kỹ năng",
                  },
                  { label: "Diversity of fields, lots of choices" },
                ],
              },
            ],
          },
          {
            label: "Disadvantages",
            color: "#ef4444",
            children: [
              {
                label: "Heavy pollution",
                children: [
                  { label: "Polluted air (fewer trees, rivers, mountains)" },
                  { label: "Always heavy traffic" },
                  { label: "Roads in bad conditions" },
                ],
              },
              { label: "Expensive", vi: "Cost of living cao" },
              {
                label: "More dangerous",
                children: [
                  {
                    label: "Higher crime rate",
                    vi: "Tỷ lệ tội phạm nhiều hơn",
                  },
                  { label: "Social evils", vi: "Tệ nạn xã hội" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "countryside",
        emoji: "&#x1F3DE;&#xFE0F;",
        label: "COUNTRYSIDE",
        children: [
          {
            label: "Places",
            color: "#8b5cf6",
            children: [
              {
                label: "Rice fields, rivers, mountains",
                vi: "Liên tưởng đến hình ảnh đồng quê, thiên nhiên",
              },
            ],
          },
          {
            label: "Benefits",
            color: "#10b981",
            children: [
              {
                label: "Clean environment",
                children: [
                  { label: "Fresher air" },
                  { label: "Many trees, rice fields, rivers" },
                  {
                    label: "Good for mental health",
                    vi: "Cảm thấy thoải mái, thư giãn, hạnh phúc",
                  },
                ],
              },
              { label: "Cheap living", vi: "Save a lot of money" },
              {
                label: "Friendly people",
                children: [
                  { label: "More friendly, opener, hospitable" },
                  { label: "Live near each other, talk everyday" },
                ],
              },
            ],
          },
          {
            label: "Drawbacks",
            color: "#ef4444",
            children: [
              { label: "Lower incomes" },
              {
                label: "Boring life",
                children: [{ label: "Few places of conveniences & pleasures" }],
              },
              {
                label: "Difficult access",
                children: [
                  { label: "Education & technology harder to access" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "health",
        emoji: "&#x2764;&#xFE0F;",
        label: "HEALTH",
        children: [
          {
            label: "Good Habits",
            color: "#10b981",
            children: [
              {
                label: "Diet",
                children: [
                  {
                    label: "Eat healthy food (fruits, fish, veggies)",
                    vi: "\u0102n nhi\u1ec1u tr\u00e1i c\u00e2y, c\u1ee7, rau; u\u1ed1ng 2L n\u01b0\u1edbc/ng\u00e0y",
                  },
                  { label: "Always eat breakfast; less meat & junk food" },
                ],
              },
              {
                label: "Exercise",
                children: [
                  { label: "Manage weight; strengthen muscles & bones" },
                  { label: "Reduce disease risk; at least 30 mins/day" },
                ],
              },
              {
                label: "Regular check-up",
                children: [
                  { label: "Visit doctor regularly to find diseases early" },
                ],
              },
              {
                label: "Mental health",
                children: [
                  { label: "Control emotion & avoid stress" },
                  { label: "Sound sleep \u2013 consistent schedule" },
                  { label: "Limit alcohol; stop smoking" },
                ],
              },
            ],
          },
          {
            label: "Benefits",
            color: "#f59e0b",
            children: [
              { label: "Stay healthy, keep fit" },
              { label: "Better immune system" },
              { label: "Strong & relaxed" },
              { label: "Improve social life" },
            ],
          },
          {
            label: "Bad Habits",
            color: "#ef4444",
            children: [
              {
                label: "Unhealthy eating",
                children: [
                  { label: "Too much fat food, junk food, meat" },
                  { label: "Less vegetables/fruits" },
                ],
              },
              {
                label: "Neglect",
                children: [
                  { label: "Don't exercise regularly" },
                  { label: "No regular check-up" },
                  { label: "Lack of sleep; worry too much" },
                ],
              },
            ],
          },
          {
            label: "Problems & Diseases",
            color: "#f59e0b",
            children: [
              {
                label: "Health problems",
                children: [
                  { label: "Increase health risks & cholesterol" },
                  { label: "Can't focus; easy to get tired & ill" },
                ],
              },
              {
                label: "Diseases",
                children: [
                  { label: "Obesity", vi: "Béo phì" },
                  { label: "Diabetes", vi: "Tiểu đường" },
                  { label: "Heart disease" },
                  { label: "Sleep disturbance", vi: "Rối loạn giấc ngủ" },
                  { label: "High blood pressure", vi: "Cao huyết áp" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "environment",
        emoji: "&#x1F331;",
        label: "ENVIRONMENT",
        children: [
          {
            label: "Good Habits",
            color: "#10b981",
            children: [
              { label: "Reuse & recycle (bottles, plastic bags, glasses)" },
              { label: "Consume less energy / save energy" },
              { label: "Sort trash", vi: "Phân loại rác" },
              { label: "Use more reusable products" },
            ],
          },
          {
            label: "Benefits",
            color: "#10b981",
            children: [
              { label: "Protect environment long term" },
              { label: "Conserve natural resources" },
              { label: "Reduce pollution levels" },
              { label: "Tackle global warming" },
            ],
          },
          {
            label: "Bad Habits & Impacts",
            color: "#ef4444",
            children: [
              {
                label: "Bad actions",
                children: [
                  { label: "Don't reuse/recycle" },
                  { label: "Waste energy" },
                  { label: "Don't sort trash; less reusable products" },
                ],
              },
              {
                label: "Impacts",
                children: [
                  { label: "Global warming / climate change" },
                  { label: "Pollute the environment" },
                  {
                    label: "Exploit natural resources",
                    vi: "Khai thác triệt để tài nguyên",
                  },
                  {
                    label: "Increase greenhouse gas emissions",
                    vi: "Hiệu ứng nhà kính",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "hobbies",
        emoji: "&#x1F3A8;",
        label: "HOBBIES",
        children: [
          {
            label: "Synonyms",
            color: "#8b5cf6",
            children: [
              {
                label:
                  "Free time activities, pastime, interest, leisure pursuits",
              },
            ],
          },
          {
            label: "Types",
            color: "#8b5cf6",
            children: [
              { label: "Listening to music, reading, watching films" },
              {
                label: "Sports: swimming, tennis, football, jogging",
                vi: "Bóng bàn, đi bộ",
              },
              { label: "Go shopping" },
            ],
          },
          {
            label: "Advantages",
            color: "#10b981",
            children: [
              {
                label: "Happiness",
                children: [{ label: "Bring joy, make me relaxed" }],
              },
              {
                label: "Social",
                children: [{ label: "Talk and share joy with others" }],
              },
              {
                label: "Relief",
                children: [{ label: "Reduce stress of work & study" }],
              },
              {
                label: "Development",
                children: [
                  { label: "Develop imagination & creativity" },
                  { label: "Broaden / enrich knowledge" },
                  {
                    label: "Develop cognitive skills",
                    vi: "Logicality, analyze & solve problems, brainpower",
                  },
                ],
              },
            ],
          },
          {
            label: "Disadvantages (Computer games)",
            color: "#ef4444",
            children: [
              { label: "Contain violence" },
              {
                label: "Increase aggressive feelings & behaviors",
                vi: "Hung hăng",
              },
              {
                label: "Neglect duties & study",
                vi: "Performance worse at school",
              },
            ],
          },
          {
            label: "Solutions",
            color: "#f59e0b",
            children: [
              { label: "Choose suitable games" },
              { label: "Avoid violent games" },
              { label: "Set time limits for playing" },
            ],
          },
        ],
      },
      {
        id: "job",
        emoji: "&#x1F4BC;",
        label: "JOB / STUDY",
        children: [
          {
            label: "Introduction",
            color: "#8b5cf6",
            children: [
              { label: "I am a first/second/last-year student at..." },
              {
                label: "I work as an accountant for ABC company",
                vi: "Nh\u00e2n vi\u00ean k\u1ebf to\u00e1n",
              },
            ],
          },
          {
            label: "Duties",
            color: "#3b82f6",
            children: [
              {
                label: "Study",
                children: [
                  { label: "Homework, presentations, clubs, part-time jobs" },
                ],
              },
              {
                label: "Work",
                children: [
                  {
                    label:
                      "Work with clients, solve problems, contact partners",
                  },
                  {
                    label: "Collaborate with departments to run smoothly",
                    vi: "V\u1eadn h\u00e0nh m\u01b0\u1ee3t m\u00e0",
                  },
                ],
              },
            ],
          },
          {
            label: "Opinion",
            color: "#10b981",
            children: [
              {
                label: "Like",
                children: [
                  { label: "Apply knowledge & skills of field studied" },
                  { label: "Environment to develop skills" },
                  {
                    label: "Opportunities for promotion",
                    vi: "Cơ hội thăng tiến",
                  },
                  { label: "Friendly & supportive co-workers" },
                ],
              },
              {
                label: "Dislike",
                children: [
                  { label: "Work overtime (less time for family)" },
                  { label: "Company far from home" },
                  { label: "Huge workload (tired / overloaded)" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "crime",
        emoji: "&#x1F5E1;&#xFE0F;",
        label: "CRIME",
        children: [
          {
            label: "Keywords",
            color: "#8b5cf6",
            children: [
              { label: "Crime / lawbreaker / offender" },
              { label: "Social evils", vi: "Tệ nạn xã hội" },
              { label: "Break the law, go to prison, victim" },
            ],
          },
          {
            label: "Causes",
            color: "#ef4444",
            children: [
              {
                label: "Family",
                children: [
                  { label: "Not nurtured with love & care (parents too busy)" },
                  {
                    label: "Wrong upbringing / too pampered",
                    vi: "Giáo dục sai cách/quá chiều chuộng",
                  },
                ],
              },
              {
                label: "Environment",
                children: [
                  { label: "Violent games ? copy bad things" },
                  { label: "School violence, bullying, gang violence" },
                ],
              },
              {
                label: "Economic: Poverty",
                children: [
                  { label: "Easiest way to get what they want" },
                  { label: "Doesn't require skills or talents" },
                ],
              },
            ],
          },
          {
            label: "Solutions",
            color: "#10b981",
            children: [
              {
                label: "Parental",
                children: [
                  { label: "Spend more time; control activities" },
                  {
                    label:
                      "Give advice; encourage outdoor activities & soft skills",
                  },
                ],
              },
              {
                label: "Legal",
                children: [
                  { label: "Punish criminals" },
                  {
                    label: "Rehabilitation center",
                    vi: "Trung tâm cải tạo – learn behavior, vocational training",
                  },
                ],
              },
              {
                label: "Daily",
                children: [
                  { label: "Limit electronic devices" },
                  {
                    label: "Encourage reading books, watching animal channels",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "house",
        emoji: "&#x1F3E0;",
        label: "HOUSE / FLAT",
        children: [
          {
            label: "Rooms",
            color: "#8b5cf6",
            children: [
              {
                label:
                  "Living room, bedroom, bathroom, garden, garage, balcony, toilet",
              },
            ],
          },
          {
            label: "Adjectives",
            color: "#f59e0b",
            children: [
              {
                label: "General",
                children: [
                  { label: "Large, spacious, quiet, stuffy, drafty, cramped" },
                ],
              },
              {
                label: "Furniture",
                children: [
                  {
                    label:
                      "New, bright, modern, luxurious, stylish, sophisticated",
                    vi: "Tinh tế",
                  },
                ],
              },
              {
                label: "Feeling",
                children: [
                  {
                    label: "Perfect, comfortable, cozy",
                    vi: "Warm, familiar, relaxation",
                  },
                ],
              },
              {
                label: "Style",
                children: [
                  { label: "Delightful, dazzling, drop-dead gorgeous" },
                ],
              },
            ],
          },
          {
            label: "Furniture & Activities",
            color: "#10b981",
            children: [
              {
                label: "Furniture",
                children: [
                  {
                    label: "Table, TV, sofa, bookshelf, bed, wardrobe",
                    vi: "Tủ quần áo",
                  },
                ],
              },
              {
                label: "Activities",
                children: [
                  { label: "Grow plants, read, watch TV, cook, relax" },
                  { label: "Bake with family, play card games" },
                ],
              },
            ],
          },
          {
            label: "Accommodation Info",
            color: "#8b5cf6",
            children: [{ label: "Area, how long lived, floors, surroundings" }],
          },
        ],
      },
      {
        id: "technology",
        emoji: "&#x1F916;",
        label: "TECHNOLOGY / ROBOT",
        children: [
          {
            label: "Advantages",
            color: "#10b981",
            children: [{ label: "Perform faster and more efficiently" }],
          },
          {
            label: "Disadvantages",
            color: "#ef4444",
            children: [
              { label: "Less social interactions" },
              {
                label: "Make people lazier",
                children: [
                  { label: "Depend too much on machines, refuse manual tasks" },
                ],
              },
              { label: "Increase unemployment" },
            ],
          },
          {
            label: "Solutions",
            color: "#f59e0b",
            children: [
              {
                label: "Join social activities (team building, picnic, party)",
              },
              { label: "Raise sense of responsibility" },
              { label: "Training to control modern machines" },
              { label: "Update with tech development" },
            ],
          },
        ],
      },
      {
        id: "languages",
        emoji: "&#x1F30D;",
        label: "FOREIGN LANGUAGES",
        children: [
          {
            label: "Benefits",
            color: "#10b981",
            children: [
              {
                label: "Knowledge",
                children: [
                  { label: "Broaden mind, enrich knowledge" },
                  { label: "Access world info (books, documents in English)" },
                ],
              },
              {
                label: "Travel / Work",
                children: [
                  { label: "Confident abroad, talk easily with foreigners" },
                  { label: "Work without interpreter", vi: "Phiên dịch viên" },
                ],
              },
              {
                label: "Culture",
                children: [
                  { label: "Learn customs, traditions, society, people" },
                ],
              },
              {
                label: "Social",
                children: [
                  { label: "Friends worldwide; improve communication skills" },
                ],
              },
              {
                label: "Future",
                children: [
                  { label: "Open new doors: relationships, job opportunities" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "machine",
        emoji: "&#x1F4BB;",
        label: "MACHINE / COMPUTER / TV",
        children: [
          {
            label: "Learning",
            color: "#3b82f6",
            children: [
              { label: "Read news online, download info, self-study" },
              { label: "Educational tool to answer questions" },
            ],
          },
          {
            label: "Work / Study",
            color: "#10b981",
            children: [
              { label: "Work faster: typing, printing, storing data" },
              { label: "Save time" },
            ],
          },
          {
            label: "Entertainment",
            color: "#f59e0b",
            children: [
              { label: "Play games, listen to music, watch movies" },
              { label: "Join forums / Facebook groups to share ideas" },
            ],
          },
        ],
      },
      {
        id: "person",
        emoji: "&#x1F464;",
        label: "DESCRIBE A PERSON",
        children: [
          {
            label: "Appearance",
            color: "#8b5cf6",
            children: [
              {
                label: "Age / Build",
                children: [
                  {
                    label: "Tall, short, young, middle-aged",
                    vi: "Trung ni\u00ean",
                  },
                ],
              },
              {
                label: "Look",
                children: [{ label: "Beautiful, handsome, good-looking" }],
              },
              {
                label: "Details",
                children: [
                  {
                    label: "Hair (length+color); sunny smile",
                    vi: "N? cu?i t?a n?ng",
                  },
                ],
              },
            ],
          },
          {
            label: "Characters",
            color: "#f59e0b",
            children: [
              {
                label: "Good",
                children: [
                  {
                    label: "Sincere, honest, helpful, kind, generous",
                    vi: "Thật thà, hào phóng",
                  },
                ],
              },
              {
                label: "Bad",
                children: [
                  {
                    label: "Talkative, selfish, awful",
                    vi: "Nhiều chuyện, ích kỷ",
                  },
                ],
              },
            ],
          },
          {
            label: "Relationship",
            color: "#3b82f6",
            children: [
              { label: "Known for... first met at (high school / company)" },
            ],
          },
          {
            label: "Common activities",
            color: "#10b981",
            children: [
              { label: "Meet at coffee shop, go shopping, share about life" },
            ],
          },
        ],
      },
      {
        id: "holiday",
        emoji: "&#x1F3D6;&#xFE0F;",
        label: "HOLIDAY",
        children: [
          {
            label: "Interests",
            color: "#10b981",
            children: [
              {
                label: "Scenery",
                children: [
                  {
                    label: "Magnificent, breathtaking views, fresh air",
                    vi: "Ho\u00e0nh tr\u00e1ng, ch\u00f3ng ng\u1ee3p",
                  },
                ],
              },
              {
                label: "Food",
                children: [
                  {
                    label:
                      "Fresh, delicious, not expensive; variety (crab, lobsters, shells)",
                    vi: "S\u1ea1ch, t\u01b0\u01a1i",
                  },
                ],
              },
              {
                label: "People",
                children: [{ label: "Friendly, sociable, polite" }],
              },
            ],
          },
          {
            label: "Activities",
            color: "#3b82f6",
            children: [
              {
                label: "Beach",
                children: [
                  { label: "Swim in clear seawater" },
                  { label: "Sunbathe on soft sand" },
                  { label: "Play football, build sandcastles" },
                  { label: "Watch sunrise / sunset" },
                ],
              },
              {
                label: "Sightseeing",
                children: [{ label: "Ba Na hills; boat to Cu Lao Cham" }],
              },
            ],
          },
        ],
      },
    ];
  },

  _escapeHtml: function (str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  _khacVocabWithBorders: function (html, showVi) {
    if (!html) return "";
    showVi = showVi !== false;
    var parts = html.split(/(<br\s*\/?>\s*<br\s*\/?>\s*<b>[^<]*<\/b>)/i);
    if (parts.length < 3) {
      return this._khacVocabFormatContent(html, showVi);
    }
    var result = "";
    if (parts[0].trim())
      result += this._khacVocabFormatContent(parts[0], showVi);
    for (var si = 1; si + 1 < parts.length; si += 2) {
      var heading = parts[si];
      var content = parts[si + 1] || "";
      var cleanHeading = heading
        .replace(/^<br\s*\/?>\s*<br\s*\/?>\s*/i, "")
        .replace(/<\/?b>/g, "");
      result +=
        '<div style="border:1px solid var(--border-color);border-radius:6px;padding:10px 12px;margin-bottom:10px;background:rgba(139,92,246,0.02);">' +
        '<b style="font-weight:600;font-size:0.88rem;color:#7c3aed;display:block;margin-bottom:6px;">' +
        cleanHeading +
        "</b>" +
        this._khacVocabFormatContent(content, showVi) +
        "</div>";
    }
    return result;
  },

  _renderIdeaContent: function (topic, showVi) {
    if (!topic || !topic.html) return "";
    if (showVi !== false) return topic.html;
    return topic.html.replace(
      /<span [^>]*data-vi="1"[^>]*>/g,
      '<span style="display:none;">',
    );
  },

  _khacVocabFormatContent: function (content, showVi) {
    if (!content) return "";
    var vietPat =
      /[àáãảạăằắẵẳặâầấẫẩậđèéẽẻẹêềếễểệìíĩỉịòóõỏọôồốỗổộơờớỡởợùúũủụưừứữửựỳýỹỷỵÀÁÃẢẠĂẰẮẴẲẶÂẦẤẪẨẬĐÈÉẼẺẸÊỀẾỄỂỆÌÍĨỈỊÒÓÕỎỌÔỒỐỖỔỘƠỜỚỠỞỢÙÚŨỦỤƯỪỨỮỬỰỲÝỸỶỴ]/;
    var rawLines = content.split(/•/);
    var rows = "";
    for (var li = 0; li < rawLines.length; li++) {
      var line = rawLines[li].trim();
      if (!line) continue;
      var cleaned = line.replace(/<[^>]+>/g, "").trim();
      if (!cleaned) continue;
      var anchored = cleaned.match(
        /^([a-zA-Z][\w\s\/\-'.,!?@#$%&*+=;:"~\u2026\u2013\u2014]*?)\s*\(([^)]*)\)\s*(.*)$/,
      );
      if (anchored) {
        var en = anchored[1].trim();
        var vi = anchored[2].trim();
        var suffix = anchored[3].trim();
        var viDisplay =
          showVi && vi
            ? '<span style="float:right;font-style:italic;color:var(--text-muted);">' +
              vi +
              "</span>"
            : "";
        rows +=
          '<div style="display:flex;justify-content:space-between;align-items:baseline;padding:2px 0;border-bottom:1px dotted rgba(128,128,128,0.15);font-size:0.85rem;line-height:1.6;">' +
          '<span style="font-weight:500;">' +
          en +
          (suffix
            ? ' <span style="font-weight:400;color:var(--text-muted);">' +
              suffix +
              "</span>"
            : "") +
          "</span>" +
          viDisplay +
          "</div>";
      } else if (cleaned.match(/^[a-zA-Z]/) && !vietPat.test(cleaned)) {
        rows +=
          '<div style="padding:2px 0;font-size:0.85rem;line-height:1.6;font-weight:500;">' +
          cleaned +
          "</div>";
      } else if (
        cleaned.match(/^[a-zA-Z]/) &&
        vietPat.test(cleaned) &&
        cleaned.match(/\([^)]*\)/)
      ) {
        var innerRe =
          /([a-zA-Z][\w\s\/\-'.,!?@#$%&*+=;:"~\u2026\u2013\u2014]*?)\s*\(([^)]*)\)/g;
        var allPairs = [];
        var match;
        while ((match = innerRe.exec(cleaned)) !== null) {
          allPairs.push({
            en: match[1].trim(),
            vi: match[2].trim(),
            idx: match.index,
          });
        }
        if (allPairs.length > 0) {
          var last = allPairs[allPairs.length - 1];
          rows +=
            '<div style="display:flex;justify-content:space-between;align-items:baseline;padding:2px 0;border-bottom:1px dotted rgba(128,128,128,0.15);font-size:0.85rem;line-height:1.6;">' +
            '<span style="font-weight:500;">' +
            last.en +
            "</span>" +
            (showVi
              ? '<span style="float:right;font-style:italic;color:var(--text-muted);">' +
                last.vi +
                "</span>"
              : "") +
            "</div>";
        } else if (showVi) {
          rows +=
            '<div style="padding:2px 0;font-size:0.85rem;line-height:1.6;font-style:italic;color:var(--text-muted);">' +
            cleaned +
            "</div>";
        }
      } else if (showVi) {
        rows +=
          '<div style="padding:2px 0;font-size:0.85rem;line-height:1.6;' +
          (vietPat.test(cleaned)
            ? "font-style:italic;color:var(--text-muted);"
            : "font-weight:500;") +
          '">' +
          cleaned +
          "</div>";
      }
    }
    if (rows) return rows;
    if (!showVi) return "";
    return (
      '<div style="font-size:0.85rem;line-height:1.7;">' + content + "</div>"
    );
  },

  _initKhacVocabData: function () {
    if (this._khacVocabData) return;
    this._khacVocabData = [
      {
        id: "hobbies",
        label: "HOBBIES & SPORTS",
        icon: "🎯",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>HOBBIES AND SPORTS</b> <i>(SỞ THÍCH & THỜI GIAN RẢNH RỖI)</i><br><br>
<b>A. VOCABULARY</b><br>
hobbies = pastimes = favorites = leisure activities (sở thích, hoạt động giải trí)<br><br>
<b>1. Things people play</b><br>
chess (cờ vua) • cards (bài) • board games (trò chơi trên bàn) • video games (trò chơi điện tử) • Sudoku (giải ô chữ số) • crossword puzzles (giải ô chữ) • gambling (cờ bạc)<br><br>
<b>2. Things people read</b><br>
novels (tiểu thuyết) • newspapers (báo) • magazines (tạp chí) • comics (truyện tranh) • biographies (tiểu sử) • self-development books (sách phát triển bản thân) • detective stories (truyện trinh thám) • fairy tales (truyện cổ tích) • poem (thơ) • fiction (hư cấu/viễn tưởng) • non-fiction (phi hư cấu) • bestseller (sách bán chạy)<br><br>
<b>3. Things people collect</b><br>
stamps (tem) • coins (tiền xu) • dolls (búp bê) • toys (đồ chơi) • stickers (nhãn dán) • antiques (đồ cổ) • autographs (chữ ký) • figurines (tượng nhỏ) • trading cards (thẻ giao dịch) • art (nghệ thuật) • vintage clothing (quần áo cổ điển) • limited edition items (vật phẩm giới hạn)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• What do you do in your free time? (Bạn làm gì vào thời gian rảnh? / Sở thích của bạn là gì?)<br>
• What is your favourite hobby? (Sở thích yêu thích của bạn là gì?)<br>
• How often do you do your hobbies? (Bạn thường làm sở thích bao lâu một lần?)<br>
• Do you prefer indoor or outdoor activities? (Bạn thích hoạt động trong nhà hay ngoài trời hơn?)<br>
• What hobbies are popular in your country? (Sở thích nào phổ biến ở nước bạn?)<br>
• Why is it important to have a hobby? (Tại sao có sở thích lại quan trọng?)<br><br>
<b>c. Sample answers</b><br>
• I like playing chess in my free time. It helps me think more strategically (Tôi thích chơi cờ vua vào thời gian rảnh. Nó giúp tôi suy nghĩ chiến lược hơn)<br>
• Reading is my favourite pastime because it broadens my knowledge (Đọc sách là sở thích yêu thích của tôi vì nó mở rộng kiến thức của tôi)<br>
• I enjoy outdoor activities like swimming and cycling (Tôi thích các hoạt động ngoài trời như bơi lội và đạp xe)<br>
• I usually read books every day before going to bed (Tôi thường đọc sách mỗi ngày trước khi đi ngủ)<br>
• In my country, young people love playing badminton and football (Ở nước tôi, giới trẻ thích chơi cầu lông và bóng đá)<br>
• Hobbies help reduce stress and bring us joy (Sở thích giúp giảm căng thẳng và mang lại niềm vui)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
do a hobby = pursue a hobby (theo đuổi sở thích) • take up a new hobby (bắt đầu một sở thích mới) • have a passion for (có niềm đam mê với) • be keen on = be fond of = be into (thích / say mê) • waste time (lãng phí thời gian) • spend time on (dành thời gian cho) • be a big fan of (là một fan hâm mộ lớn của) • be crazy about (phát cuồng vì) • can't stand = can't bear (không thể chịu đựng được) • be addicted to (nghiện) • in one's spare time = in one's leisure time (trong thời gian rảnh) • an outstanding player (một người chơi xuất sắc) • develop new skills (phát triển kỹ năng mới) • enrich one's life (làm phong phú cuộc sống) • improve physical health (cải thiện sức khỏe thể chất)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your favourite hobby.</em><br>
In my free time, I enjoy reading books. It has been my passion since childhood because it helps me relax and learn new things. I usually read for about an hour every day before going to bed. I especially love novels and self-development books. Reading not only broadens my knowledge but also improves my vocabulary. I believe reading is one of the most rewarding hobbies.
</div>`,
      },
      {
        id: "music",
        label: "MUSIC & MOVIES",
        icon: "🎵",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>MUSIC & MOVIES</b> <i>(ÂM NHẠC & PHIM ẢNH)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Types of music</b><br>
folk music (nhạc dân gian) • pop music (nhạc pop) • classical music (nhạc cổ điển) • jazz (nhạc jazz) • hip hop (nhạc hip hop) • rock (nhạc rock) • rap (nhạc rap) • ballad (nhạc ballad) • country music (nhạc đồng quê) • R&B (nhịp điệu và blues) • blues (nhạc blues) • heavy metal (nhạc rock mạnh) • indie (nhạc indie) • soul (nhạc tâm hồn) • reggae (nhạc reggae) • techno (nhạc techno) • opera (nhạc kịch opera)<br><br>
<b>2. Movies / Films</b><br>
comedy (phim hài) • horror (phim kinh dị) • romance / romantic films (phim tình cảm) • thriller (phim giật gân) • action movies (phim hành động) • science fiction (phim viễn tưởng) • animated films (phim hoạt hình) • documentary (phim tài liệu) • drama (phim chính kịch) • blockbuster (phim bom tấn) • box-office hit (phim ăn khách) • cartoon (phim hoạt hình) • soundtrack (nhạc nền phim)<br><br>
<b>3. Describing movies</b><br>
entertaining (mang tính giải trí) • moving (cảm động) • hilarious = extremely funny (vô cùng hài hước) • terrifying (kinh khủng) • boring / dull (nhàm chán) • confusing (khó hiểu) • predictable (có thể đoán trước) • thought-provoking (kích thích suy nghĩ) • thrilling (hấp dẫn, gay cấn) • disappointing (đáng thất vọng)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Do you like listening to music? (Bạn có thích nghe nhạc không?)<br>
• What kind of music do you like? (Bạn thích thể loại nhạc nào?)<br>
• Who is your favourite singer / band? (Ca sĩ / ban nhạc yêu thích của bạn là ai?)<br>
• Do you like reading books? (Bạn có thích đọc sách không?)<br>
• What kind of films do you like? (Bạn thích thể loại phim nào?)<br>
• Do you prefer watching films at home or at the cinema? (Bạn thích xem phim ở nhà hay ở rạp?)<br>
• Who is your favourite actor / actress? (Diễn viên nam / nữ yêu thích của bạn là ai?)<br>
• What's the best film you've ever seen? (Phim hay nhất bạn từng xem là gì?)<br>
• Do you prefer watching films or reading books? (Bạn thích xem phim hay đọc sách?)<br><br>
<b>c. Sample answers</b><br>
• I'm really into music, especially pop and R&B (Mình rất thích nhạc, đặc biệt là pop và R&B)<br>
• I'm keen on romantic films because they're moving (Mình thích phim tình cảm vì chúng rất cảm động)<br>
• I'd have to say that Taylor Swift is my favourite singer (Mình phải nói rằng Taylor Swift là ca sĩ yêu thích của tôi)<br>
• I'm not really a fan of horror movies because they're terrifying (Mình thực sự không phải fan của phim kinh dị vì chúng rất đáng sợ)<br>
• I prefer watching films at home because it's more comfortable (Mình thích xem phim ở nhà hơn vì thoải mái hơn)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
listen to music (nghe nhạc) • play a musical instrument (chơi nhạc cụ) • go to a concert (đi xem hòa nhạc) • watch a film (xem phim) • go to the cinema = go to the movies (đi xem phim) • book tickets (đặt vé) • release a new album (phát hành album mới) • star in a film (đóng vai chính trong phim) • be directed by (được đạo diễn bởi) • catchy tune (giai điệu bắt tai) • box office (phòng vé) • film critic (nhà phê bình phim) • award-winning (đoạt giải thưởng) • special effects (hiệu ứng đặc biệt)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your favourite film.</em><br>
My favourite film is "The Pursuit of Happyness". It is a biographical drama starring Will Smith. The film tells the story of a struggling salesman who overcomes many difficulties to become a successful stockbroker. What I love most about this film is its inspiring message: never give up on your dreams. The acting is brilliant and the plot is very moving. I would highly recommend it to everyone.
</div>`,
      },
      {
        id: "travel",
        label: "TRAVELING & TRANSPORT",
        icon: "✈️",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>TRAVELING & TRANSPORT</b> <i>(DU LỊCH & PHƯƠNG TIỆN)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Types of vacation</b><br>
beach vacation (kỳ nghỉ biển) • camping trip (chuyến cắm trại) • city break (kỳ nghỉ ở thành phố) • backpacking (du lịch ba lô) • guided tour (tour có hướng dẫn) • road trip (chuyến đi bằng đường bộ) • cruise (du thuyền) • sightseeing tour (tour tham quan) • volunteer vacation (kỳ nghỉ tình nguyện) • eco-tourism (du lịch sinh thái) • adventure travel (du lịch mạo hiểm) • cultural trip (chuyến đi văn hóa) • package tour (tour trọn gói) • solo travel (du lịch một mình) • family vacation (kỳ nghỉ gia đình) • business trip (chuyến công tác) • honeymoon (tuần trăng mật) • weekend getaway (kỳ nghỉ cuối tuần) • day trip (chuyến đi trong ngày) • gap year (năm nghỉ giữa các khóa học)<br><br>
<b>2. Activities on vacation</b><br>
swim (bơi lội) • sunbathe (tắm nắng) • snorkel (lặn với ống thở) • hike (đi bộ đường dài) • camp (cắm trại) • go sightseeing (tham quan) • take photos (chụp ảnh) • try local cuisine (thử ẩm thực địa phương) • buy souvenirs (mua quà lưu niệm) • visit museums / galleries (tham quan bảo tàng / phòng trưng bày)<br><br>
<b>3. Transport vocabulary</b><br>
by (plane / train / bus / taxi / motorbike / car / bicycle) (bằng máy bay / tàu hỏa / xe buýt / taxi / xe máy / ô tô / xe đạp) • means of transport (phương tiện giao thông) • public transport (giao thông công cộng) • traffic jam (kẹt xe) • rush hour (giờ cao điểm) • book a ticket (đặt vé) • one-way ticket (vé một chiều) • return ticket (vé khứ hồi) • boarding pass (thẻ lên máy bay) • luggage / baggage (hành lý) • departure / arrival lounge (phòng chờ khởi hành / đến) • delay (hoãn / trễ) • cancel (hủy)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Do you like traveling? (Bạn có thích du lịch không?)<br>
• Where did you go on your last vacation? (Bạn đã đi đâu vào kỳ nghỉ trước?)<br>
• What kind of vacation do you prefer? (Bạn thích loại kỳ nghỉ nào?)<br>
• What is your favourite means of transport? (Phương tiện giao thông yêu thích của bạn là gì?)<br>
• Do you prefer traveling alone or with a group? (Bạn thích đi du lịch một mình hay theo nhóm?)<br>
• What is the most beautiful place you have ever visited? (Nơi đẹp nhất bạn từng đến là đâu?)<br><br>
<b>c. Sample answers</b><br>
• I love traveling because I can explore new places and cultures (Tôi yêu du lịch vì tôi có thể khám phá những địa điểm và nền văn hóa mới)<br>
• My last vacation was to Da Nang. I went there with my family (Kỳ nghỉ trước của tôi là ở Đà Nẵng. Tôi đã đi cùng gia đình)<br>
• I prefer beach vacations because I love swimming and sunbathing (Tôi thích kỳ nghỉ biển hơn vì tôi thích bơi lội và tắm nắng)<br>
• My favourite means of transport is the train because it's comfortable and affordable (Phương tiện yêu thích của tôi là tàu hỏa vì nó thoải mái và giá cả phải chăng)<br>
• I like traveling with friends because it's more fun (Tôi thích du lịch với bạn bè vì vui hơn)<br>
• The most beautiful place I've visited is Ha Long Bay with its stunning limestone islands (Nơi đẹp nhất tôi từng đến là Vịnh Hạ Long với những hòn đảo đá vôi tuyệt đẹp)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
go on vacation = go on holiday (đi nghỉ) • go abroad (ra nước ngoài) • explore the city (khám phá thành phố) • travel light (đi nhẹ hành lý) • check in / check out (làm thủ tục nhận / trả phòng) • get around (đi lại) • take a flight (đi máy bay) • catch a train (bắt tàu) • set off = set out (lên đường) • get lost (lạc đường) • book a hotel (đặt phòng khách sạn) • pack luggage (đóng gói hành lý) • extend one's stay (gia hạn thời gian lưu trú) • enjoy the scenery (tận hưởng phong cảnh) • broaden one's horizons (mở rộng tầm nhìn)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your last vacation.</em><br>
My last vacation was a wonderful trip to Da Nang with my family. We stayed for five days and enjoyed many activities. We visited the Marble Mountains, explored the Ba Na Hills, and relaxed at My Khe Beach. The local cuisine was amazing especially the seafood. What I enjoyed most was watching the sunset over the Han River. This vacation gave me memorable moments and I look forward to our next trip.
</div>`,
      },
      {
        id: "sports",
        label: "SPORTS & WORKOUT",
        icon: "🏋️",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>SPORTS & WORKOUT</b> <i>(THỂ THAO & TẬP LUYỆN)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Sports</b><br>
football = soccer (bóng đá) • basketball (bóng rổ) • volleyball (bóng chuyền) • tennis (quần vợt) • badminton (cầu lông) • table tennis = ping pong (bóng bàn) • swimming (bơi lội) • cycling (đạp xe) • running (chạy bộ) • jogging (chạy chậm) • yoga (tập yoga) • aerobics (thể dục nhịp điệu) • boxing (quyền anh) • martial arts (võ thuật) • weightlifting (cử tạ) • gymnastics (thể dục dụng cụ) • baseball (bóng chày) • rugby (bóng bầu dục) • golf (đánh gôn) • skiing (trượt tuyết) • ice skating (trượt băng) • surfing (lướt sóng) • hiking (đi bộ đường dài) • fishing (câu cá) • horse riding (cưỡi ngựa)<br><br>
<b>2. Fitness & workout</b><br>
work out = exercise (tập thể dục) • go to the gym (đến phòng tập) • lift weights (nâng tạ) • do push-ups / sit-ups / pull-ups (chống đẩy / gập bụng / kéo xà) • stretch (giãn cơ) • warm up (khởi động) • cool down (thả lỏng) • personal trainer (huấn luyện viên cá nhân) • membership fee (phí hội viên) • calorie (calo) • build muscle (xây dựng cơ bắp) • lose weight (giảm cân) • stay in shape (giữ dáng) • keep fit (giữ sức khỏe)<br><br>
<b>3. Describing sports</b><br>
exciting (thú vị) • competitive (mang tính cạnh tranh) • challenging (đầy thử thách) • exhausting (kiệt sức) • team sport (thể thao đồng đội) • individual sport (thể thao cá nhân) • indoor sport (thể thao trong nhà) • outdoor sport (thể thao ngoài trời) • spectator sport (thể thao có khán giả) • contact sport (thể thao va chạm)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Do you play any sports? (Bạn có chơi môn thể thao nào không?)<br>
• What is your favourite sport? (Môn thể thao yêu thích của bạn là gì?)<br>
• How often do you exercise? (Bạn tập thể dục bao lâu một lần?)<br>
• What sports are popular in your country? (Môn thể thao nào phổ biến ở nước bạn?)<br>
• Do you prefer watching sports or playing them? (Bạn thích xem thể thao hay chơi hơn?)<br>
• Why is it important to do sports? (Tại sao tập thể thao lại quan trọng?)<br><br>
<b>c. Sample answers</b><br>
• I play badminton every weekend with my friends (Tôi chơi cầu lông mỗi cuối tuần với bạn bè)<br>
• My favourite sport is football because it's exciting and fast-paced (Môn thể thao yêu thích của tôi là bóng đá vì nó thú vị và nhịp độ nhanh)<br>
• I work out three times a week at the gym (Tôi tập thể dục ba lần một tuần ở phòng gym)<br>
• In my country, football is the most popular sport (Ở nước tôi, bóng đá là môn thể thao phổ biến nhất)<br>
• I prefer playing sports because it's good for my health (Tôi thích chơi thể thao hơn vì nó tốt cho sức khỏe của tôi)<br>
• Doing sports helps us stay healthy and reduce stress (Tập thể thao giúp chúng ta khỏe mạnh và giảm căng thẳng)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
do sport = play sport (chơi thể thao) • take part in a competition (tham gia cuộc thi) • win / lose a match (thắng / thua một trận) • score a goal (ghi bàn) • break a record (phá kỷ lục) • hold a tournament (tổ chức giải đấu) • be good at (giỏi về) • have a sedentary lifestyle (có lối sống ít vận động) • be physically active (năng động về thể chất) • improve one's fitness (cải thiện thể lực) • get injured (bị thương) • warm up before exercise (khởi động trước khi tập) • follow a workout routine (theo một lịch tập) • achieve a personal best (đạt thành tích cá nhân tốt nhất)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your favourite sport.</em><br>
My favourite sport is football. I have played it since I was a child. It is an exciting team sport that requires both physical strength and strategic thinking. I usually play with my friends at the weekend. Football helps me stay fit and also teaches me teamwork and discipline. I also enjoy watching professional matches on TV especially the English Premier League. I think football is more than just a game it is a passion.
</div>`,
      },
      {
        id: "reading",
        label: "READING & STUDY",
        icon: "📚",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>READING & STUDY</b> <i>(ĐỌC SÁCH & HỌC TẬP)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Types of books</b><br>
fiction (tiểu thuyết hư cấu) • non-fiction (phi hư cấu) • science fiction = sci-fi (khoa học viễn tưởng) • fantasy (kỳ ảo) • mystery (bí ẩn / trinh thám) • thriller (giật gân) • romance (lãng mạn) • horror (kinh dị) • biography (tiểu sử) • autobiography (tự truyện) • self-help book (sách tự lực / phát triển bản thân) • textbook (sách giáo khoa) • encyclopedia (bách khoa toàn thư) • novel (tiểu thuyết) • short story (truyện ngắn) • poetry (thơ ca) • fairy tale (truyện cổ tích) • historical fiction (tiểu thuyết lịch sử) • dystopian (phản địa đàng / xã hội đen tối) • classic (tác phẩm kinh điển)<br><br>
<b>2. Reading habits</b><br>
read extensively (đọc nhiều) • read for pleasure (đọc để giải trí) • read aloud (đọc to) • borrow books from the library (mượn sách từ thư viện) • buy books online (mua sách trực tuyến) • e-books (sách điện tử) • audiobooks (sách nói) • bookmark (đánh dấu trang) • have a reading habit (có thói quen đọc sách) • a bookworm (mọt sách) • page-turner (cuốn sách khó đặt xuống)<br><br>
<b>3. Study related</b><br>
attend class (tham dự lớp học) • take notes (ghi chép) • do research (nghiên cứu) • write an essay (viết bài luận) • take an exam (làm bài thi) • pass / fail an exam (đỗ / trượt kỳ thi) • get a degree (nhận bằng cấp) • revise / review (ôn tập) • study abroad (du học) • scholarship (học bổng) • deadline (hạn chót) • major in (chuyên ngành) • graduate from (tốt nghiệp từ) • enrollment (nhập học)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Do you like reading books? (Bạn có thích đọc sách không?)<br>
• What kind of books do you like to read? (Bạn thích đọc thể loại sách nào?)<br>
• How often do you read? (Bạn đọc sách bao lâu một lần?)<br>
• What is your favourite book? (Cuốn sách yêu thích của bạn là gì?)<br>
• Do you prefer reading books or watching movies? (Bạn thích đọc sách hay xem phim hơn?)<br>
• Why is reading important? (Tại sao đọc sách lại quan trọng?)<br><br>
<b>c. Sample answers</b><br>
• I love reading books especially novels and self-development books (Tôi thích đọc sách đặc biệt là tiểu thuyết và sách phát triển bản thân)<br>
• I'm into science fiction because it stimulates my imagination (Tôi thích khoa học viễn tưởng vì nó kích thích trí tưởng tượng của tôi)<br>
• I usually read for about 30 minutes before going to bed (Tôi thường đọc khoảng 30 phút trước khi đi ngủ)<br>
• My favourite book is "The Alchemist" by Paulo Coelho it has an inspiring message (Cuốn sách yêu thích của tôi là "Nhà giả kim" của Paulo Coelho nó có một thông điệp đầy cảm hứng)<br>
• I prefer reading books because I can use my imagination (Tôi thích đọc sách hơn vì tôi có thể sử dụng trí tưởng tượng của mình)<br>
• Reading is important because it expands vocabulary and knowledge (Đọc sách quan trọng vì nó mở rộng vốn từ vựng và kiến thức)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
read a book (đọc sách) • leaf through a book (lướt qua cuốn sách) • be absorbed in a book (mải mê với cuốn sách) • a gripping read (một cuốn sách hấp dẫn) • a light read (một cuốn sách nhẹ nhàng) • a heavy read (một cuốn sách nặng về nội dung) • recommend a book (giới thiệu một cuốn sách) • write a review (viết đánh giá) • hit the books (học hành chăm chỉ) • keep up with studies (theo kịp việc học) • fall behind (tụt lại phía sau) • pull an all-nighter (thức trắng đêm học bài) • cram for an exam (học nhồi nhét cho kỳ thi) • hand in = submit (nộp bài) • plagiarize (đạo văn)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe a book you have recently read.</em><br>
The last book I read was "The Alchemist" by Paulo Coelho. It is a philosophical novel about a young shepherd named Santiago who dreams of finding treasure in Egypt. The story is simple but deeply meaningful. It teaches us to follow our dreams and listen to our hearts. What I love most about this book is its message that the journey itself is the real treasure. I would definitely recommend it to everyone.
</div>`,
      },
      {
        id: "shopping",
        label: "SHOPPING & FASHION",
        icon: "🛍️",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>SHOPPING & FASHION</b> <i>(MUA SẮM & THỜI TRANG)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Shopping places</b><br>
shopping mall (trung tâm mua sắm) • department store (cửa hàng bách hóa) • supermarket (siêu thị) • convenience store (cửa hàng tiện lợi) • boutique (cửa hàng thời trang nhỏ) • market (chợ) • flea market (chợ trời) • online shop (cửa hàng trực tuyến) • shopping centre (trung tâm thương mại) • street vendor (người bán hàng rong)<br><br>
<b>2. Shopping verbs</b><br>
buy = purchase (mua) • sell (bán) • pay (trả tiền) • spend money on (tiêu tiền vào) • save money (tiết kiệm tiền) • waste money (lãng phí tiền) • bargain = haggle (mặc cả) • refund (hoàn tiền) • exchange (đổi hàng) • try on (thử đồ) • window shop (xem đồ mà không mua) • go shopping (đi mua sắm) • order online (đặt hàng trực tuyến) • check out (thanh toán) • add to cart (thêm vào giỏ hàng)<br><br>
<b>3. Fashion & clothing</b><br>
outfit (trang phục) • accessory (phụ kiện) • sneakers (giày thể thao) • high heels (giày cao gót) • dress (váy) • suit (bộ vest) • casual clothes (quần áo thường ngày) • formal wear (trang phục trang trọng) • designer brand (thương hiệu thiết kế) • vintage (phong cách cổ điển) • trendy = fashionable (hợp thời trang) • loose / tight / baggy (rộng / chật / phồng) • fit / suit (vừa vặn / phù hợp) • go well with (hợp với) • match (phối hợp) • style (phong cách)<br><br>
<b>4. Describing shopping</b><br>
expensive (đắt) • cheap (rẻ) • affordable (giá phải chăng) • reasonable price (giá hợp lý) • overpriced (đắt quá mức) • on sale (đang giảm giá) • discount = reduction (giảm giá) • bargain = good deal (món hời) • a rip-off (đắt cắt cổ) • free delivery (miễn phí giao hàng) • loyal customer (khách hàng trung thành)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Do you like shopping? (Bạn có thích mua sắm không?)<br>
• How often do you go shopping? (Bạn đi mua sắm bao lâu một lần?)<br>
• Do you prefer shopping online or in-store? (Bạn thích mua sắm trực tuyến hay tại cửa hàng?)<br>
• What is your favourite shop or store? (Cửa hàng yêu thích của bạn là gì?)<br>
• Do you like following fashion trends? (Bạn có thích theo xu hướng thời trang không?)<br>
• What kind of clothes do you usually wear? (Bạn thường mặc loại quần áo nào?)<br><br>
<b>c. Sample answers</b><br>
• I enjoy shopping especially for clothes and accessories (Tôi thích mua sắm đặc biệt là quần áo và phụ kiện)<br>
• I go shopping once a week usually at the weekend (Tôi đi mua sắm mỗi tuần một lần thường là vào cuối tuần)<br>
• I prefer online shopping because it's convenient and I can compare prices easily (Tôi thích mua sắm trực tuyến hơn vì nó tiện lợi và tôi có thể so sánh giá dễ dàng)<br>
• My favourite store is Uniqlo because they have simple and high-quality clothes (Cửa hàng yêu thích của tôi là Uniqlo vì họ có quần áo đơn giản và chất lượng cao)<br>
• I like casual style such as T-shirts and jeans (Tôi thích phong cách thoải mái như áo phông và quần jean)<br>
• I don't really follow fashion trends I just wear what I feel comfortable in (Tôi không thực sự theo xu hướng thời trang tôi chỉ mặc những gì tôi cảm thấy thoải mái)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
go shopping (đi mua sắm) • do the shopping (mua sắm hàng ngày) • shop around (xem nhiều nơi trước khi mua) • be a shopaholic (nghiện mua sắm) • try something on (thử đồ) • be in fashion = be trendy (đang thịnh hành) • be out of fashion (lỗi mốt) • suit someone (phù hợp với ai) • look good on someone (trông đẹp trên ai) • be dressed in (mặc) • get dressed (mặc quần áo) • dress up (ăn mặc đẹp) • dress down (ăn mặc giản dị) • have a good sense of style (có khiếu thẩm mỹ) • be on a budget (có ngân sách hạn chế) • splash out on (chi mạnh tay cho) • save up for (tiết kiệm cho)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your favourite shopping place.</em><br>
My favourite shopping place is a shopping mall near my house called Vincom Center. It has a wide variety of stores from fashion boutiques to electronics shops. I usually go there with my friends at the weekend. We often visit the food court and watch a movie after shopping. What I like most about this mall is its convenient location and the great discounts during sales seasons. It is truly a one-stop destination for entertainment and shopping.
</div>`,
      },
      {
        id: "studywork",
        label: "STUDY & WORK",
        icon: "💼",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>STUDY & WORK</b> <i>(HỌC TẬP & CÔNG VIỆC)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Education & study</b><br>
kindergarten (trường mẫu giáo) • primary school (trường tiểu học) • secondary school (trường trung học cơ sở) • high school (trường trung học phổ thông) • college (cao đẳng) • university (đại học) • undergraduate (chưa tốt nghiệp đại học) • graduate (tốt nghiệp) • postgraduate (sau đại học) • major in (chuyên ngành) • degree (bằng cấp) • bachelor's degree (bằng cử nhân) • master's degree (bằng thạc sĩ) • doctorate = PhD (tiến sĩ) • scholarship (học bổng) • semester (học kỳ) • curriculum (chương trình học) • lecture (bài giảng) • tutorial (buổi học nhóm) • seminar (hội thảo) • assignment (bài tập) • thesis = dissertation (luận văn)<br><br>
<b>2. Jobs & careers</b><br>
apply for a job (nộp đơn xin việc) • have a job interview (phỏng vấn xin việc) • get hired = get a job (được nhận vào làm) • be unemployed (thất nghiệp) • be self-employed (tự làm chủ) • work full-time / part-time (làm toàn thời gian / bán thời gian) • do an internship (thực tập) • work experience (kinh nghiệm làm việc) • job description (mô tả công việc) • salary (lương) • wage (tiền công) • bonus (tiền thưởng) • promotion (thăng chức) • resign (từ chức) • get fired (bị sa thải) • retire (nghỉ hưu) • career path (lộ trình sự nghiệp) • profession (nghề nghiệp) • occupation (nghề) • vocation (thiên hướng nghề nghiệp)<br><br>
<b>3. Workplace vocabulary</b><br>
colleague (đồng nghiệp) • boss (sếp) • employee (nhân viên) • employer (người sử dụng lao động) • manager (quản lý) • director (giám đốc) • CEO (tổng giám đốc) • assistant (trợ lý) • team leader (trưởng nhóm) • staff (nhân viên) • personnel (nhân sự) • human resources (phòng nhân sự) • office (văn phòng) • meeting room (phòng họp) • deadline (hạn chót) • overtime (làm thêm giờ) • business trip (chuyến công tác)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• What do you do? / What is your job? (Bạn làm nghề gì?)<br>
• Where do you work / study? (Bạn làm việc / học tập ở đâu?)<br>
• Why did you choose this job / major? (Tại sao bạn chọn công việc / ngành học này?)<br>
• What are your future career plans? (Kế hoạch nghề nghiệp tương lai của bạn là gì?)<br>
• What do you like most about your job / study? (Bạn thích điều gì nhất ở công việc / việc học của mình?)<br>
• Describe a typical day at work / school. (Mô tả một ngày điển hình ở nơi làm việc / trường học.)<br><br>
<b>c. Sample answers</b><br>
• I am a student at the University of Social Sciences and Humanities majoring in English (Tôi là sinh viên tại trường Đại học Khoa học Xã hội và Nhân văn chuyên ngành tiếng Anh)<br>
• I chose this major because I have a passion for languages and communication (Tôi chọn ngành này vì tôi có niềm đam mê với ngôn ngữ và giao tiếp)<br>
• In the future I want to become an English teacher or a translator (Trong tương lai tôi muốn trở thành giáo viên tiếng Anh hoặc biên dịch viên)<br>
• I work as a software engineer for a tech company (Tôi làm kỹ sư phần mềm cho một công ty công nghệ)<br>
• What I like most about my job is that I can be creative and solve problems (Điều tôi thích nhất ở công việc của mình là tôi có thể sáng tạo và giải quyết vấn đề)<br>
• A typical day at work starts with checking emails and attending meetings (Một ngày làm việc điển hình bắt đầu với việc kiểm tra email và tham dự các cuộc họp)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
go to school = attend school (đi học) • study hard (học chăm chỉ) • get good grades (đạt điểm cao) • drop out of school (bỏ học) • take a gap year (nghỉ một năm) • pursue a career (theo đuổi sự nghiệp) • land a job (kiếm được việc) • be in charge of (phụ trách) • be responsible for (chịu trách nhiệm về) • work under pressure (làm việc dưới áp lực) • work in a team (làm việc nhóm) • meet deadlines (đáp ứng hạn chót) • gain experience (tích lũy kinh nghiệm) • climb the career ladder (thăng tiến trong sự nghiệp) • have a heavy workload (có khối lượng công việc lớn) • strike a work-life balance (cân bằng công việc và cuộc sống)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your dream job.</em><br>
My dream job is to become a graphic designer. I have always been passionate about art and creativity since I was a child. A graphic designer creates visual content for websites advertisements and magazines. I am particularly interested in this career because it allows me to combine technology with art. To achieve this dream I am learning design software such as Photoshop and Illustrator. I believe that with hard work and dedication I can turn my passion into a successful career.
</div>`,
      },
      {
        id: "hometown",
        label: "NEIGHBORHOOD & CITY",
        icon: "🏘️",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>NEIGHBORHOOD & CITY</b> <i>(HÀNG XÓM & THÀNH PHỐ)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Places in a city</b><br>
downtown = city centre (trung tâm thành phố) • suburb (ngoại ô) • residential area (khu dân cư) • industrial zone (khu công nghiệp) • shopping district (khu mua sắm) • entertainment district (khu giải trí) • historical site (di tích lịch sử) • tourist attraction (điểm thu hút khách du lịch) • park (công viên) • square (quảng trường) • market (chợ) • airport (sân bay) • bus station (trạm xe buýt) • railway station (ga tàu hỏa) • harbour (cảng) • bridge (cầu) • skyscraper (nhà chọc trời) • temple (chùa) • pagoda (chùa chiền) • cathedral (nhà thờ lớn)<br><br>
<b>2. Describing a neighborhood</b><br>
quiet (yên tĩnh) • peaceful (bình yên) • noisy (ồn ào) • crowded (đông đúc) • polluted (ô nhiễm) • convenient (thuận tiện) • safe (an toàn) • dangerous (nguy hiểm) • well-connected (kết nối tốt) • lively (sôi động) • relaxing (thư giãn) • boring (chán) • modern (hiện đại) • historic (lịch sử) • green (xanh) • urban (đô thị) • rural (nông thôn) • coastal (ven biển)<br><br>
<b>3. Housing & accommodation</b><br>
apartment = flat (căn hộ) • house (nhà) • villa (biệt thự) • townhouse (nhà liền kề) • studio (căn hộ nhỏ) • dormitory (ký túc xá) • rent (thuê) • landlord / landlady (chủ nhà) • tenant (người thuê) • mortgage (thế chấp) • deposit (tiền đặt cọc) • utility bills (hóa đơn tiện ích) • move in (chuyển vào) • move out (chuyển đi) • renovate (cải tạo) • decorate (trang trí)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Where do you live? (Bạn sống ở đâu?)<br>
• What is your neighbourhood like? (Khu phố của bạn như thế nào?)<br>
• Do you like living in your city? (Bạn có thích sống ở thành phố của mình không?)<br>
• What are the advantages of living in your city? (Những lợi ích của việc sống ở thành phố của bạn là gì?)<br>
• What are the disadvantages of living in your city? (Những bất lợi của việc sống ở thành phố của bạn là gì?)<br>
• Where would you like to live in the future? (Bạn muốn sống ở đâu trong tương lai?)<br><br>
<b>c. Sample answers</b><br>
• I live in a small apartment in the city centre with my family (Tôi sống trong một căn hộ nhỏ ở trung tâm thành phố với gia đình)<br>
• My neighbourhood is quite and peaceful with many trees and parks (Khu phố của tôi khá yên tĩnh và bình yên với nhiều cây xanh và công viên)<br>
• I love living in my city because everything is convenient (Tôi thích sống ở thành phố của mình vì mọi thứ đều thuận tiện)<br>
• The advantages are good public transport and many entertainment options (Lợi ích là giao thông công cộng tốt và nhiều lựa chọn giải trí)<br>
• The disadvantage is the high cost of living and traffic jams (Bất lợi là chi phí sinh hoạt cao và kẹt xe)<br>
• In the future I would like to live in a quiet suburb with a garden (Trong tương lai tôi muốn sống ở một vùng ngoại ô yên tĩnh có vườn)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
live in (sống ở) • grow up in (lớn lên ở) • be located in (tọa lạc ở) • move to a new place (chuyển đến nơi ở mới) • settle down (định cư) • be home to (là nơi có) • get around = travel around (đi lại) • be within walking distance (trong khoảng cách đi bộ) • be far from / be close to (xa / gần) • be surrounded by (được bao quanh bởi) • suffer from noise pollution (chịu ô nhiễm tiếng ồn) • enjoy a high quality of life (tận hưởng chất lượng cuộc sống cao) • community spirit (tinh thần cộng đồng) • neighbourhood watch (an ninh khu phố) • local amenities (tiện nghi địa phương)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your neighbourhood.</em><br>
I live in a peaceful neighbourhood in the suburbs of Ho Chi Minh City. It is a residential area with many small houses and green trees. There is a park nearby where I often go jogging in the morning. My neighbourhood also has a local market a supermarket and several coffee shops within walking distance. The people here are friendly and helpful. Although it is a bit far from the city centre I enjoy the fresh air and the quiet atmosphere. It is truly a great place to live.
</div>`,
      },
      {
        id: "family",
        label: "FAMILY & FRIENDS",
        icon: "👨‍👩‍👧‍👦",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>FAMILY & FRIENDS</b> <i>(GIA ĐÌNH & BẠN BÈ)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Family members</b><br>
immediate family (gia đình ruột thịt) • extended family (gia đình mở rộng) • parents (cha mẹ) • mother / father (mẹ / bố) • spouse (vợ / chồng) • husband / wife (chồng / vợ) • siblings (anh chị em ruột) • brother / sister (anh trai / chị gái) • children (con cái) • son / daughter (con trai / con gái) • grandparents (ông bà) • grandfather / grandmother (ông / bà) • grandchildren (cháu) • aunt / uncle (cô / chú) • nephew / niece (cháu trai / cháu gái) • cousin (anh chị em họ) • in-laws (thông gia) • stepfather / stepmother (cha dượng / mẹ kế) • half-brother / half-sister (anh chị em cùng cha khác mẹ)<br><br>
<b>2. Describing family & friends</b><br>
close-knit family (gia đình gắn bó) • supportive (ủng hộ) • caring (quan tâm) • loving (yêu thương) • understanding (thấu hiểu) • strict (nghiêm khắc) • generous (hào phóng) • reliable = trustworthy (đáng tin cậy) • loyal (trung thành) • thoughtful = considerate (chu đáo) • sociable (hòa đồng) • easy-going (dễ tính) • get along with (hòa thuận với) • look up to (kính trọng) • take after (giống) • bring up = raise (nuôi nấng) • spoil (nuông chiều)<br><br>
<b>3. Family activities & traditions</b><br>
have dinner together (ăn tối cùng nhau) • celebrate holidays (tổ chức lễ) • family reunion (đoàn tụ gia đình) • family gathering (tụ tập gia đình) • family tradition (truyền thống gia đình) • play with friends (chơi với bạn bè) • hang out with friends (đi chơi với bạn bè) • stay in touch (giữ liên lạc) • make friends (kết bạn) • have a lot in common (có nhiều điểm chung) • share secrets (chia sẻ bí mật) • trust each other (tin tưởng nhau)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• Can you tell me about your family? (Bạn có thể kể về gia đình của bạn không?)<br>
• How many people are there in your family? (Gia đình bạn có bao nhiêu người?)<br>
• What does your father / mother do? (Bố / mẹ bạn làm nghề gì?)<br>
• Do you get along with your family? (Bạn có hòa thuận với gia đình không?)<br>
• Who are you closest to in your family? (Bạn thân nhất với ai trong gia đình?)<br>
• What do you usually do with your family? (Bạn thường làm gì với gia đình?)<br>
• Do you have many friends? (Bạn có nhiều bạn không?)<br>
• What qualities do you look for in a friend? (Bạn tìm kiếm phẩm chất gì ở một người bạn?)<br><br>
<b>c. Sample answers</b><br>
• There are four people in my family: my parents my younger sister and me (Gia đình tôi có bốn người: bố mẹ em gái tôi và tôi)<br>
• My mother is a teacher at a primary school (Mẹ tôi là giáo viên ở một trường tiểu học)<br>
• I get along very well with my family especially my mother (Tôi rất hòa thuận với gia đình đặc biệt là mẹ tôi)<br>
• I am closest to my mother because she always understands and supports me (Tôi thân nhất với mẹ vì bà luôn thấu hiểu và ủng hộ tôi)<br>
• At weekends my family usually has dinner together and watches TV (Vào cuối tuần gia đình tôi thường ăn tối cùng nhau và xem TV)<br>
• I have a small group of close friends (Tôi có một nhóm bạn thân nhỏ)<br>
• I look for honesty loyalty and a good sense of humour in a friend (Tôi tìm kiếm sự trung thực lòng trung thành và khiếu hài hước ở một người bạn)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
start a family (lập gia đình) • raise a family (nuôi dạy con cái) • support a family (chu cấp cho gia đình) • be the breadwinner (là trụ cột gia đình) • run a household (quản lý gia đình) • do household chores (làm việc nhà) • share household duties (chia sẻ việc nhà) • have a lot in common (có nhiều điểm chung) • be on good terms with (có mối quan hệ tốt với) • lose touch with (mất liên lạc với) • keep in touch with (giữ liên lạc với) • count on = rely on (dựa vào) • be there for someone (luôn ở bên ai đó)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your best friend.</em><br>
My best friend is Linh. We have known each other since high school. She is a kind and humorous person who always makes me laugh. We share many common interests such as reading books listening to music and traveling. What I appreciate most about her is that she is always there for me when I need help. She is not only a friend but also a sister to me. I believe our friendship will last forever.
</div>`,
      },
      {
        id: "food",
        label: "FOOD & DRINK",
        icon: "🍜",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>FOOD & DRINK</b> <i>(ĐỒ ĂN & THỨC UỐNG)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Types of food</b><br>
meat (thịt) • beef (thịt bò) • pork (thịt heo) • chicken (thịt gà) • fish (cá) • seafood (hải sản) • vegetable (rau củ) • fruit (trái cây) • grain (ngũ cốc) • rice (cơm) • noodle (mì) • bread (bánh mì) • soup (canh / súp) • salad (sa lát) • dessert (món tráng miệng) • fast food (đồ ăn nhanh) • street food (đồ ăn đường phố) • home-cooked meal (bữa ăn nấu tại nhà) • processed food (thực phẩm chế biến) • organic food (thực phẩm hữu cơ) • frozen food (thực phẩm đông lạnh) • dairy products (sản phẩm từ sữa)<br><br>
<b>2. Drinks</b><br>
water (nước) • soft drink (nước ngọt) • juice (nước ép) • coffee (cà phê) • tea (trà) • milk (sữa) • smoothie (sinh tố) • beer (bia) • wine (rượu vang) • cocktail (cocktail) • mineral water (nước khoáng) • iced tea (trà đá) • bubble tea (trà sữa)<br><br>
<b>3. Cooking methods</b><br>
boil (luộc) • steam (hấp) • fry (chiên / rán) • stir-fry (xào) • bake (nướng lò) • grill (nướng than) • roast (quay) • deep-fry (chiên ngập dầu) • stew (hầm) • pickle (muối chua) • season (nêm gia vị) • marinate (ướp) • chop / dice (thái / cắt hạt lựu) • peel (gọt vỏ) • grate (bào) • mix (trộn) • pour (rót / đổ)<br><br>
<b>4. Describing food</b><br>
delicious = tasty (ngon) • disgusting = awful (kinh khủng) • spicy (cay) • salty (mặn) • sweet (ngọt) • sour (chua) • bitter (đắng) • bland (nhạt) • greasy = oily (nhiều dầu mỡ) • crispy (giòn) • tender (mềm) • juicy (mọng nước) • fresh (tươi) • healthy (lành mạnh) • unhealthy (không lành mạnh) • nutritious (bổ dưỡng) • well-done (chín kỹ) • medium (vừa chín tới) • rare (tái)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• What is your favourite food? (Món ăn yêu thích của bạn là gì?)<br>
• What kind of food do you like? (Bạn thích loại đồ ăn nào?)<br>
• Do you like cooking? (Bạn có thích nấu ăn không?)<br>
• What is a typical dish in your country? (Món ăn đặc trưng ở nước bạn là gì?)<br>
• Do you prefer eating at home or eating out? (Bạn thích ăn ở nhà hay ăn ngoài hơn?)<br>
• What is a healthy diet in your opinion? (Chế độ ăn uống lành mạnh theo bạn là gì?)<br><br>
<b>c. Sample answers</b><br>
• My favourite food is pho especially beef pho which is a traditional Vietnamese noodle soup (Món ăn yêu thích của tôi là phở đặc biệt là phở bò một món súp mì truyền thống của Việt Nam)<br>
• I like Vietnamese food because it is fresh and flavourful (Tôi thích đồ ăn Việt Nam vì nó tươi ngon và đậm đà hương vị)<br>
• I enjoy cooking in my free time especially trying new recipes (Tôi thích nấu ăn vào thời gian rảnh đặc biệt là thử các công thức mới)<br>
• A typical Vietnamese dish is pho which is a noodle soup with beef or chicken (Một món ăn đặc trưng của Việt Nam là phở một loại súp mì với thịt bò hoặc thịt gà)<br>
• I prefer eating at home because it is healthier and more economical (Tôi thích ăn ở nhà hơn vì nó lành mạnh và tiết kiệm hơn)<br>
• A healthy diet should include plenty of vegetables fruits and protein (Chế độ ăn uống lành mạnh nên bao gồm nhiều rau củ trái cây và protein)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
eat out (ăn ngoài) • cook a meal (nấu một bữa ăn) • order food (gọi đồ ăn) • have a meal (dùng bữa) • serve food (phục vụ đồ ăn) • prepare a dish (chuẩn bị món ăn) • taste delicious (có vị ngon) • have a sweet tooth (thích đồ ngọt) • be on a diet (ăn kiêng) • skip breakfast (bỏ bữa sáng) • have a balanced diet (có chế độ ăn cân bằng) • be rich in (giàu chất) • be low in (ít chất) • be high in calories (nhiều calo) • follow a recipe (làm theo công thức) • develop a taste for (dần thích) • overeat (ăn quá nhiều) • indulge in (say sưa với)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe your favourite dish.</em><br>
My favourite dish is pho a traditional Vietnamese noodle soup. It consists of rice noodles beef or chicken and a flavorful broth made from bones and spices. The broth is simmered for hours to achieve its rich taste. Pho is usually served with fresh herbs bean sprouts lime and chili. What I love about pho is its perfect balance of flavors: savory sour and spicy. It is not only delicious but also comforting especially on a rainy day. I believe pho is one of the best dishes in Vietnamese cuisine.
</div>`,
      },
      {
        id: "entertainment",
        label: "HOLIDAYS & ENTERTAINMENT",
        icon: "🎉",
        html: `<div style="font-size:0.85rem;line-height:1.7;"><b>HOLIDAYS & ENTERTAINMENT</b> <i>(NGÀY LỄ & GIẢI TRÍ)</i><br><br>
<b>A. VOCABULARY</b><br>
<b>1. Holidays & celebrations</b><br>
Tet = Lunar New Year (Tết Nguyên Đán) • Christmas (Giáng Sinh) • New Year's Eve (Đêm Giao Thừa) • Valentine's Day (Ngày Lễ Tình Nhân) • Mid-Autumn Festival (Tết Trung Thu) • Easter (Lễ Phục Sinh) • Independence Day (Ngày Quốc Khánh) • birthday (sinh nhật) • wedding anniversary (kỷ niệm ngày cưới) • graduation ceremony (lễ tốt nghiệp) • traditional festival (lễ hội truyền thống) • religious holiday (ngày lễ tôn giáo) • public holiday = national holiday (ngày lễ quốc gia)<br><br>
<b>2. Entertainment activities</b><br>
watch TV (xem TV) • go to the cinema (đi xem phim) • listen to music (nghe nhạc) • go to a concert (đi xem hòa nhạc) • play video games (chơi game) • surf the internet (lướt web) • go to a party (đi dự tiệc) • go dancing (đi khiêu vũ) • go to the theater (đi xem kịch) • visit a museum (tham quan bảo tàng) • attend a festival (tham dự lễ hội) • watch a live show (xem biểu diễn trực tiếp) • do karaoke (hát karaoke)<br><br>
<b>3. Entertainment venues</b><br>
cinema (rạp chiếu phim) • theater (nhà hát) • concert hall (phòng hòa nhạc) • stadium (sân vận động) • amusement park (công viên giải trí) • zoo (sở thú) • museum (bảo tàng) • art gallery (phòng trưng bày nghệ thuật) • nightclub (câu lạc bộ đêm) • bar (quán bar) • café (quán cà phê) • restaurant (nhà hàng) • community center (trung tâm cộng đồng)<br><br>
<b>B. QUESTIONS & ANSWERS</b><br>
<b>a. AGREEING:</b><br>
Absolutely! (Chắc chắn rồi!) • Definitely! (Rõ ràng rồi!) • That's for sure! (Đúng là như vậy!) • I totally agree with you (Tôi hoàn toàn đồng ý với bạn) • That's what I think (Đó là những gì tôi nghĩ) • You're absolutely right (Bạn nói hoàn toàn đúng) • I feel exactly the same way (Tôi cũng có cảm nghĩ như vậy)<br>
<b>G – Giải thích:</b> Bắt đầu câu trả lời thường có các tín hiệu cấu trúc sau: • For several reasons, (Vì một vài lý do) • Let me explain why (Hãy để tôi giải thích lý do) • First of all, / The first reason is that (Trước hết,) • Another reason is that / Moreover, / Furthermore (Một lý do khác là) • That's why I think (Đó là lý do tại sao tôi nghĩ) • In brief, / In short, (Tóm lại) • All in all, (Nhìn chung)<br><br>
<b>b. Common interview questions</b><br>
• What do you do for entertainment? (Bạn làm gì để giải trí?)<br>
• What is your favourite holiday? (Ngày lễ yêu thích của bạn là gì?)<br>
• How do you usually celebrate your favourite holiday? (Bạn thường tổ chức ngày lễ yêu thích như thế nào?)<br>
• Do you prefer staying at home or going out on holiday? (Bạn thích ở nhà hay ra ngoài vào ngày lễ?)<br>
• What is the most important festival in your country? (Lễ hội quan trọng nhất ở nước bạn là gì?)<br>
• Do you enjoy going to parties? (Bạn có thích đi dự tiệc không?)<br><br>
<b>c. Sample answers</b><br>
• In my free time I like watching movies and listening to music for entertainment (Trong thời gian rảnh tôi thích xem phim và nghe nhạc để giải trí)<br>
• My favourite holiday is Tet the Lunar New Year because it is a time for family reunion (Ngày lễ yêu thích của tôi là Tết Nguyên Đán vì đó là thời gian để đoàn tụ gia đình)<br>
• During Tet I usually visit my relatives give lucky money to children and enjoy traditional foods (Trong dịp Tết tôi thường đi thăm họ hàng lì xì cho trẻ em và thưởng thức các món ăn truyền thống)<br>
• I prefer going out with friends during holidays because it's more fun (Tôi thích ra ngoài với bạn bè vào ngày lễ hơn vì vui hơn)<br>
• The most important festival in my country is Tet which celebrates the Lunar New Year (Lễ hội quan trọng nhất ở nước tôi là Tết để chào mừng năm mới âm lịch)<br>
• I enjoy going to parties especially with close friends (Tôi thích đi dự tiệc đặc biệt là với bạn thân)<br><br>
<b>C. USEFUL COLLOCATIONS</b><br>
have fun = have a good time (vui vẻ) • enjoy oneself (tận hưởng) • celebrate a holiday (tổ chức ngày lễ) • spend time with family (dành thời gian với gia đình) • watch fireworks (xem pháo hoa) • exchange gifts (trao đổi quà) • decorate the house (trang trí nhà cửa) • hold a party (tổ chức tiệc) • attend a celebration (tham dự lễ kỷ niệm) • have a day off (có ngày nghỉ) • go on a trip (đi du lịch) • relax and unwind (thư giãn và giải tỏa căng thẳng) • take up a hobby (bắt đầu một sở thích) • kill time (giết thời gian) • be a couch potato (nghiện xem TV) • binge-watch (xem một mạch)<br><br>
<b>D. WRITING SAMPLES</b><br>
<em>Describe how you usually celebrate a holiday.</em><br>
Tet or Lunar New Year is the most important holiday in Vietnam. To prepare for Tet my family usually cleans and decorates the house with peach blossoms and kumquat trees. On New Year's Eve we gather together to watch fireworks and make wishes for the new year. During Tet I visit my relatives and receive lucky money. The food is also a highlight with traditional dishes like banh chung and pickled onions. I love Tet because it is a meaningful time for family reunion and relaxation.
</div>`,
      },
    ];
  },
  // Load full state from localStorage on initialization
  loadState: function () {
    try {
      var saved = StorageManager.getVstepFullState();
      if (saved && Object.keys(saved).length > 0) {
        var state = saved;
        if (state.reading) this.reading = state.reading;
        if (state.listening) this.listening = state.listening;
        if (state.writing) this.writing = state.writing;
        if (state.speaking) this.speaking = state.speaking;
        if (state.currentSection) this.currentSection = state.currentSection;
        if (state.vstepVocabState) this.vstepVocabState = state.vstepVocabState;
        if (state.vstepQuizState) this.vstepQuizState = state.vstepQuizState;
        if (state.essayVocabTopic !== undefined) this.essayVocabTopic = state.essayVocabTopic;
        if (state.essayVocabShowVi !== undefined) this.essayVocabShowVi = state.essayVocabShowVi;
        if (state.essayExpandOpen !== undefined) this.essayExpandOpen = state.essayExpandOpen;
        if (state.essayExpandText !== undefined) this.essayExpandText = state.essayExpandText;
        if (state.essayExpandResult !== undefined) this.essayExpandResult = state.essayExpandResult;
        if (state.khacBookCategory !== undefined) this.khacBookCategory = state.khacBookCategory;
        if (state.khacBookTopic !== undefined) this.khacBookTopic = state.khacBookTopic;
        if (state.khacBookShowVi !== undefined) this.khacBookShowVi = state.khacBookShowVi;
        if (state.khacBookMinimized !== undefined) this.khacBookMinimized = state.khacBookMinimized;
        if (state.khacMmMinimized !== undefined) this.khacMmMinimized = state.khacMmMinimized;
        if (state.khacMmTopic !== undefined) this.khacMmTopic = state.khacMmTopic;
        if (state.khacMmShowVi !== undefined) this.khacMmShowVi = state.khacMmShowVi;
        if (state.khacMmZoom !== undefined) this.khacMmZoom = state.khacMmZoom;
        if (state.khacMethodsMinimized !== undefined) this.khacMethodsMinimized = state.khacMethodsMinimized;
        if (state.khacVocabMinimized !== undefined) this.khacVocabMinimized = state.khacVocabMinimized;
        if (state.khacVocabTopic !== undefined) this.khacVocabTopic = state.khacVocabTopic;
        if (state.khacVocabShowVi !== undefined) this.khacVocabShowVi = state.khacVocabShowVi;
        if (state.khacIdeaMinimized !== undefined) this.khacIdeaMinimized = state.khacIdeaMinimized;
        if (state.khacIdeaTopic !== undefined) this.khacIdeaTopic = state.khacIdeaTopic;
        if (state.khacIdeaShowVi !== undefined) this.khacIdeaShowVi = state.khacIdeaShowVi;
        // KHÁC accordion: giữ tối đa 1 tài liệu mở; nếu đóng hết thì mở sẵn cuốn đầu
        var khacOrder = [
          "khacBookMinimized",
          "khacMmMinimized",
          "khacMethodsMinimized",
          "khacVocabMinimized",
          "khacIdeaMinimized",
        ];
        var openKeys = khacOrder.filter(function (k) {
          return this[k] === false;
        }, this);
        if (openKeys.length === 0) {
          this.khacBookMinimized = false;
        } else if (openKeys.length > 1) {
          khacOrder.forEach(function (k) {
            this[k] = true;
          }, this);
          this[openKeys[0]] = false;
        }
      }
      // Ensure answers and questionTimes always exist
      if (!this.reading.answers) this.reading.answers = {};
      if (!this.reading.questionTimes) this.reading.questionTimes = {};
      if (!this.reading.completedTests) this.reading.completedTests = {};
      if (!this.reading.allAnswers) this.reading.allAnswers = {};
      if (!this.listening.answers) this.listening.answers = {};
      if (!this.listening.questionTimes) this.listening.questionTimes = {};
      if (!this.listening.completedExercises) this.listening.completedExercises = {};
      if (!this.listening.allAnswers) this.listening.allAnswers = {};
      if (!this.listening.shadowingResults) this.listening.shadowingResults = {};
      
      // Clean up temporary blob audioUrls since they expire on page reload
      Object.keys(this.listening.shadowingResults).forEach(function (k) {
        if (this.listening.shadowingResults[k]) {
          this.listening.shadowingResults[k].audioUrl = "";
        }
      }, this);

      if (!this.writing.completedTests) this.writing.completedTests = {};
      if (!this.writing.userHighlights) this.writing.userHighlights = [];
      if (!this.writing.essayHistory) this.writing.essayHistory = {};
      // Essay history is persisted separately; merge legacy inline history too
      var legacyHistory = this.writing.essayHistory;
      var savedHistory = StorageManager.getVstepEssayHistory();
      this.writing.essayHistory = Object.assign({}, legacyHistory, savedHistory || {});
      if (!this.speaking.completedTopics) this.speaking.completedTopics = {};
      if (!this.speaking.speakingHistory) this.speaking.speakingHistory = {};
    } catch (e) {
      console.error("Error loading VSTEP state:", e);
    }
  },

  // Save full state to localStorage
  saveState: function () {
    try {
      var writingState = {};
      Object.keys(this.writing).forEach(function (k) {
        if (k !== "essayHistory") writingState[k] = this.writing[k];
      }, this);

      var state = {
        reading: this.reading,
        listening: this.listening,
        writing: writingState,
        speaking: this.speaking,
        currentSection: this.currentSection,
        vstepVocabState: this.vstepVocabState,
        vstepQuizState: this.vstepQuizState,
        essayVocabTopic: this.essayVocabTopic,
        essayVocabShowVi: this.essayVocabShowVi,
        essayExpandOpen: this.essayExpandOpen,
        essayExpandText: this.essayExpandText,
        essayExpandResult: this.essayExpandResult,
        khacBookCategory: this.khacBookCategory,
        khacBookTopic: this.khacBookTopic,
        khacBookShowVi: this.khacBookShowVi,
        khacBookMinimized: this.khacBookMinimized,
        khacMmMinimized: this.khacMmMinimized,
        khacMmTopic: this.khacMmTopic,
        khacMmShowVi: this.khacMmShowVi,
        khacMmZoom: this.khacMmZoom,
        khacMethodsMinimized: this.khacMethodsMinimized,
        khacVocabMinimized: this.khacVocabMinimized,
        khacVocabTopic: this.khacVocabTopic,
        khacVocabShowVi: this.khacVocabShowVi,
        khacIdeaMinimized: this.khacIdeaMinimized,
        khacIdeaTopic: this.khacIdeaTopic,
        khacIdeaShowVi: this.khacIdeaShowVi,
      };
      // Ensure allAnswers is saved for persistence
      if (this.reading.allAnswers) {
        state.reading.allAnswers = this.reading.allAnswers;
      }
      if (this.listening.allAnswers) {
        state.listening.allAnswers = this.listening.allAnswers;
      }
      StorageManager.setVstepFullState(state);
    } catch (e) {
      console.error("Error saving VSTEP state:", e);
    }
  },

  bindEvents: function () {},
};
