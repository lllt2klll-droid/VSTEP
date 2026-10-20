window.DashboardView = {
  flashcardIndex: 0,
  flipped: false,

  // Safe storage helpers (localStorage can throw in private mode / when full)
  _lsGet: function (key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  _lsSet: function (key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) {
      console.error("DashboardView storage error:", e);
      return false;
    }
  },
  _lsRemove: function (key) {
    try { localStorage.removeItem(key); return true; } catch (e) { return false; }
  },

  // Study session timer
  studyTimer: {
    startTime: null,
    elapsedSeconds: 0,
    intervalId: null,
    isActive: false,
    lastLoggedMinutes: 0
  },

  dailyTasks: {
    active: false,
    currentTask: null,
    tasks: [],
    completed: false,
    dayKey: null
  },

  getCompletedTaskIds: function (dayKey) {
    try { return JSON.parse(localStorage.getItem('vstep_daily_' + dayKey) || '[]'); } catch (e) { return []; }
  },

  setCompletedTaskId: function (dayKey, id) {
    var ids = this.getCompletedTaskIds(dayKey);
    if (ids.indexOf(id) < 0) { ids.push(id); this._lsSet('vstep_daily_' + dayKey, JSON.stringify(ids)); }
  },

  // ===================== STUDY TIMER =====================

  startStudyTimer: function () {
    var self = this;
    if (this.studyTimer.isActive) return;

    // Load previously saved elapsed time for today
    var today = new Date().toISOString().split("T")[0];
    var savedTime = this._lsGet("vstep_study_time_" + today) || "0";
    this.studyTimer.elapsedSeconds = parseInt(savedTime, 10);

    this.studyTimer.startTime = Date.now();
    this.studyTimer.isActive = true;
    this.studyTimer.lastLoggedMinutes = Math.floor(parseInt(savedTime, 10) / 60);

    this.studyTimer.intervalId = setInterval(function () {
      var now = Date.now();
      var sessionElapsed = Math.floor((now - self.studyTimer.startTime) / 1000);
      var totalElapsed = self.studyTimer.elapsedSeconds + sessionElapsed;

      // Save to localStorage every 30 seconds
      if (totalElapsed % 30 === 0) {
        self._lsSet("vstep_study_time_" + today, totalElapsed.toString());
        // Update activity log (1 point per minute) with the delta,
        // NOT the cumulative total
        var minutes = Math.floor(totalElapsed / 60);
        var delta = minutes - self.studyTimer.lastLoggedMinutes;
        if (delta > 0) {
          self.logActivity(delta);
          self.studyTimer.lastLoggedMinutes = minutes;
        }
      }
    }, 1000);
  },

  stopStudyTimer: function () {
    if (!this.studyTimer.isActive) return;

    clearInterval(this.studyTimer.intervalId);
    var now = Date.now();
    var sessionElapsed = Math.floor((now - this.studyTimer.startTime) / 1000);
    var totalElapsed = this.studyTimer.elapsedSeconds + sessionElapsed;

    // Save final time
    var today = new Date().toISOString().split("T")[0];
    this._lsSet("vstep_study_time_" + today, totalElapsed.toString());

    // Update activity log (1 point per minute) with the delta
    var minutes = Math.floor(totalElapsed / 60);
    var delta = minutes - this.studyTimer.lastLoggedMinutes;
    if (delta > 0) {
      this.logActivity(delta);
    }

    this.studyTimer.isActive = false;
    this.studyTimer.intervalId = null;
    this.studyTimer.startTime = null;
    this.studyTimer.elapsedSeconds = 0;
    this.studyTimer.lastLoggedMinutes = 0;
  },

  formatStudyTime: function (seconds) {
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;
    if (hours > 0) {
      return hours + "h " + remainingMinutes + "p";
    }
    return minutes + "p";
  },

  getRoadmapInfo: function () {
    try {
      var data = JSON.parse(localStorage.getItem("vstep_roadmap"));
      if (!data || !data.goal || !data.examDate || !data.started) return null;
      var now = new Date();
      var exam = new Date(data.examDate);
      var diff = Math.ceil((exam - now) / (1000 * 60 * 60 * 24));
      return {
        goal: data.goal,
        examDate: data.examDate,
        examDateStr: exam.toLocaleDateString("vi-VN"),
        countdown: diff > 0 ? diff : 0
      };
    } catch (e) { return null; }
  },

  // Calculate total questions for Reading skill
  getTotalReadingQuestions: function () {
    if (!window.VstepReadingData || !VstepReadingData.categories) return 0;
    var total = 0;
    VstepReadingData.categories.forEach(function (cat) {
      if (cat.tests) {
        cat.tests.forEach(function (test) {
          if (test.questions) {
            total += test.questions.length;
          }
        });
      }
    });
    return total;
  },

  // Calculate answered questions for Reading skill
  getAnsweredReadingQuestions: function () {
    try {
      var vstepState = StorageManager.getVstepFullState();
      if (vstepState.reading && vstepState.reading.allAnswers) {
        var count = 0;
        Object.keys(vstepState.reading.allAnswers).forEach(function (testId) {
          count += Object.keys(vstepState.reading.allAnswers[testId]).length;
        });
        return count;
      }
    } catch (e) {}
    return 0;
  },

  // Calculate total questions for Listening skill
  getTotalListeningQuestions: function () {
    if (!window.VstepListeningData || !VstepListeningData.parts) return 0;
    var total = 0;
    VstepListeningData.parts.forEach(function (part) {
      if (part.exercises) {
        part.exercises.forEach(function (exercise) {
          if (exercise.questions) {
            total += exercise.questions.length;
          }
        });
      }
    });
    return total;
  },

  // Calculate answered questions for Listening skill
  getAnsweredListeningQuestions: function () {
    try {
      var vstepState = StorageManager.getVstepFullState();
      if (vstepState.listening && vstepState.listening.allAnswers) {
        var count = 0;
        Object.keys(vstepState.listening.allAnswers).forEach(function (exerciseId) {
          count += Object.keys(vstepState.listening.allAnswers[exerciseId]).length;
        });
        return count;
      }
    } catch (e) {}
    return 0;
  },

  // Calculate total essays for Writing skill
  getTotalWritingEssays: function () {
    if (!window.VstepWritingData) return 0;
    var total = 0;
    if (VstepWritingData.task1 && VstepWritingData.task1.tests) {
      total += VstepWritingData.task1.tests.length;
    }
    if (VstepWritingData.task2 && VstepWritingData.task2.tests) {
      total += VstepWritingData.task2.tests.length;
    }
    return total;
  },

  // Calculate completed essays for Writing skill
  getCompletedWritingEssays: function () {
    try {
      var vstepState = StorageManager.getVstepFullState();
      if (vstepState.writing && vstepState.writing.completedTests) {
        // Count only submitted tests (completed essays)
        var count = 0;
        Object.keys(vstepState.writing.completedTests).forEach(function (testId) {
          if (vstepState.writing.completedTests[testId].submitted) {
            count++;
          }
        });
        return count;
      }
    } catch (e) {}
    return 0;
  },

  // Calculate total recordings for Speaking skill
  getTotalSpeakingRecordings: function () {
    if (!window.VstepSpeakingData) return 0;
    var total = 0;
    if (VstepSpeakingData.part1 && VstepSpeakingData.part1.topics) {
      VstepSpeakingData.part1.topics.forEach(function (topic) {
        if (topic.questions) {
          total += topic.questions.length;
        }
      });
    }
    if (VstepSpeakingData.part2 && VstepSpeakingData.part2.tests) {
      VstepSpeakingData.part2.tests.forEach(function (test) {
        if (test.questions) {
          total += test.questions.length;
        }
      });
    }
    if (VstepSpeakingData.part3 && VstepSpeakingData.part3.topics) {
      VstepSpeakingData.part3.topics.forEach(function (topic) {
        if (topic.questions) {
          total += topic.questions.length;
        }
      });
    }
    // If no questions found, count topics as recording units
    if (total === 0) {
      if (VstepSpeakingData.part1 && VstepSpeakingData.part1.topics) {
        total += VstepSpeakingData.part1.topics.length;
      }
      if (VstepSpeakingData.part2 && VstepSpeakingData.part2.tests) {
        total += VstepSpeakingData.part2.tests.length;
      }
      if (VstepSpeakingData.part3 && VstepSpeakingData.part3.topics) {
        total += VstepSpeakingData.part3.topics.length;
      }
    }
    return total;
  },

  // Calculate completed recordings for Speaking skill
  getCompletedSpeakingRecordings: function () {
    try {
      var vstepState = StorageManager.getVstepFullState();
      if (vstepState.speaking && vstepState.speaking.completedTopics) {
        return Object.keys(vstepState.speaking.completedTopics).length;
      }
    } catch (e) {}
    return 0;
  },

  // Calculate skill progress based on question/essay/recording counts
  getSkillProgress: function () {
    var totalReading = this.getTotalReadingQuestions();
    var answeredReading = this.getAnsweredReadingQuestions();
    var readingPct = totalReading > 0 ? Math.min(100, Math.round((answeredReading / totalReading) * 100)) : 0;

    var totalListening = this.getTotalListeningQuestions();
    var answeredListening = this.getAnsweredListeningQuestions();
    var listeningPct = totalListening > 0 ? Math.min(100, Math.round((answeredListening / totalListening) * 100)) : 0;

    var totalWriting = this.getTotalWritingEssays();
    var completedWriting = this.getCompletedWritingEssays();
    var writingPct = totalWriting > 0 ? Math.min(100, Math.round((completedWriting / totalWriting) * 100)) : 0;

    var totalSpeaking = this.getTotalSpeakingRecordings();
    var completedSpeaking = this.getCompletedSpeakingRecordings();
    var speakingPct = totalSpeaking > 0 ? Math.min(100, Math.round((completedSpeaking / totalSpeaking) * 100)) : 0;

    return {
      reading: readingPct,
      listening: listeningPct,
      writing: writingPct,
      speaking: speakingPct
    };
  },

  dailySentences: [
    "I've been meaning to ask you for some advice about restaurants.",
    "Could you please tell me where the nearest bank is?",
    "I would like to book a table for two people tonight.",
    "The weather has been really nice this week.",
    "She has been studying English for three years now.",
    "We should definitely meet up for coffee sometime.",
    "Can you recommend a good place to visit in this city?",
    "I need to finish my homework before the deadline.",
  ],

  getSavedWords: function () {
    return window.WordSaver ? WordSaver.getSaved() : [];
  },

  getDailyWord: function () {
    var savedWords = DashboardView.getSavedWords();
    if (savedWords.length === 0) return null;
    var idx = Math.floor(Math.random() * savedWords.length);
    return savedWords[idx] || savedWords[0];
  },

  // ===================== DAILY TASKS =====================

  parseSpeakingQA: function (content) {
    if (!content) return [];
    var blocks = content.split(/\n(?=\d+\.\s)/);
    var pairs = [];
    blocks.forEach(function (block) {
      var m = block.match(/^(\d+\.\s*.+?)\n([\s\S]*)/);
      if (!m) return;
      var qText = m[1].replace(/\n/g, ' ').trim();
      var aText = m[2].trim();
      if (!aText) { pairs.push({ question: qText, answerEn: '' }); return; }
      aText = aText.replace(/\n/g, ' ');
      var viWordMatch = aText.match(/\S*[ắâêôơưửđảãáàạặằấậẫễểếèẹẻẽúùủũụíìỉĩịóòỏõọồổỗộốờởỡợứừửữựĀāĂăẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỎỏỌọỒồỔổỖỗỐốỘộỚớỜờỠỡỞởỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]\S*/);
      var enPart = viWordMatch && viWordMatch.index > 0 ? aText.slice(0, viWordMatch.index).trim() : aText;
      pairs.push({ question: qText, answerEn: enPart });
    });
    return pairs;
  },

  startDailyTasks: function () {
    var s = this.dailyTasks;
    s.active = true;
    s.currentTask = 'menu';
    s.completed = false;
    var today = new Date().toISOString().split("T")[0];
    s.dayKey = today;

    var tasks = [];
    var doneIds = this.getCompletedTaskIds(today);

    // Task 1: Vocab — 3 random words from VstepVocabData
    if (window.VstepVocabData && VstepVocabData.length > 0) {
      var pool = VstepVocabData.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 3);
      tasks.push({
        id: 'vocab', type: 'vstep-vocab',
        title: 'Từ vựng VSTEP',
        desc: 'Ôn ' + pool.length + ' từ vựng VSTEP ngẫu nhiên',
        icon: '📚', done: doneIds.indexOf('vocab') >= 0,
        state: { words: pool, current: 0, typed: false }
      });
    }

    // Task 2: Speaking — 2 random questions from VstepSpeakingData
    if (window.VstepSpeakingData && VstepSpeakingData.part1 && VstepSpeakingData.part1.topics.length > 0) {
      var allQs = [];
      VstepSpeakingData.part1.topics.forEach(function (tp) {
        var qaPairs = DashboardView.parseSpeakingQA(tp.content);
        (tp.questions || []).forEach(function (q) {
          var match = null;
          for (var pi = 0; pi < qaPairs.length; pi++) {
            if (qaPairs[pi].question.indexOf(q.replace(/[?.!]/g, '').trim().substring(0, 20)) >= 0 ||
                q.indexOf(qaPairs[pi].question.replace(/[?.!]/g, '').trim().substring(0, 20)) >= 0) {
              match = qaPairs[pi].answerEn;
              break;
            }
          }
          allQs.push({ topic: tp, question: q, sampleAnswer: match || '' });
        });
      });
      var shuffled = allQs.sort(function () { return Math.random() - 0.5; }).slice(0, 2);
      tasks.push({
        id: 'speaking', type: 'vstep-speaking',
        title: 'Luyện nói Part 1',
        desc: 'Trả lời ' + shuffled.length + ' câu hỏi Speaking',
        icon: '🎤', done: doneIds.indexOf('speaking') >= 0,
        state: { questions: shuffled, current: 0, recordings: {} }
      });
    }

    // Task 3: Essay Idea — random idea, user reads then answers a question
    if (window.VstepIdeaData && VstepIdeaData.length > 0) {
      var idea = VstepIdeaData[Math.floor(Math.random() * VstepIdeaData.length)];
      tasks.push({
        id: 'idea', type: 'vstep-idea',
        title: 'Ý tưởng bài viết',
        desc: 'Chủ đề: ' + idea.label,
        icon: '✍️', done: doneIds.indexOf('idea') >= 0,
        state: { data: idea, read: false }
      });
    }

    s.tasks = tasks;
    this.refresh();
  },

  renderDailyTasksCard: function () {
    var today = new Date().toISOString().split("T")[0];
    var doneIds = this.getCompletedTaskIds(today);
    var doneCount = doneIds.length;
    var totalTasks = 3;
    var pct = totalTasks > 0 ? Math.round(doneCount / totalTasks * 100) : 0;
    var allDone = doneCount >= totalTasks;

    if (allDone) {
      var badge = doneCount + '/' + totalTasks;
      return '\n        <div class="glass-card" style="flex:1;background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(16,185,129,0.05));border-color:rgba(16,185,129,0.3);padding:1.25rem 1.5rem;cursor:pointer;" onclick="DashboardView.startDailyTasks()">\n          <div style="display:flex;align-items:center;gap:0.75rem;">\n            <div style="width:44px;height:44px;background:linear-gradient(135deg,#10b981,#059669);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 4px 12px rgba(16,185,129,0.3);flex-shrink:0;">✅</div>\n            <div style="flex:1;">\n              <h3 style="font-size:1rem;margin:0;font-weight:700;color:#10b981;">Nhiệm vụ hằng ngày</h3>\n              <p style="font-size:0.8rem;color:#10b981;margin:0.1rem 0 0 0;">Đã hoàn thành hôm nay! 🎉</p>\n            </div>\n            <span class="badge" style="background:rgba(16,185,129,0.15);color:#10b981;padding:0.25rem 0.6rem;border:1px solid rgba(16,185,129,0.3);font-size:0.7rem;font-weight:600;white-space:nowrap;">' + badge + '</span>\n          </div>\n        </div>\n      ';
    }

    var doneStr = doneCount + '/' + totalTasks + ' hoàn thành';
    return '\n      <div class="glass-card" style="flex:1;background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(239,68,68,0.08));border-color:rgba(245,158,11,0.3);padding:1.25rem 1.5rem;cursor:pointer;" onclick="DashboardView.startDailyTasks()">\n        <div style="display:flex;align-items:center;gap:0.75rem;">\n          <div style="width:44px;height:44px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 4px 12px rgba(245,158,11,0.3);flex-shrink:0;">📋</div>\n          <div style="flex:1;">\n            <h3 style="font-size:1rem;margin:0;font-weight:700;">Nhiệm vụ hằng ngày</h3>\n            <p style="font-size:0.8rem;color:var(--text-muted);margin:0.1rem 0 0 0;">' + doneStr + '</p>\n            <div style="margin-top:0.3rem;height:5px;background:var(--border-color);border-radius:3px;overflow:hidden;">\n              <div style="width:' + pct + '%;height:100%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:3px;"></div>\n            </div>\n          </div>\n          <span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b;padding:0.25rem 0.6rem;border:1px solid rgba(245,158,11,0.3);font-size:0.7rem;font-weight:600;white-space:nowrap;">🎯 ' + doneCount + '/' + totalTasks + '</span>\n        </div>\n      </div>\n    ';
  },

  exitDailyTasks: function () {
    this.dailyTasks.active = false;
    this.refresh();
  },

  renderDailyTaskMenu: function () {
    var s = this.dailyTasks;
    var tasks = s.tasks || [];
    var doneCount = tasks.filter(function (t) { return t.done; }).length;
    var allDone = doneCount === 3 && tasks.length === 3;

    var cardsHtml = tasks.map(function (t, i) {
      var statusClass = t.done ? 'done' : 'pending';
      var statusText = t.done ? '✅ Hoàn thành' : '⏳ Chưa làm';
      var btnText = t.done ? 'Xem lại' : '📖 Mở nhiệm vụ';
      return '\n      <div class="daily-task-card" onclick="DashboardView.startVstepTask(' + i + ')">\n        <div class="daily-task-number">' + (i + 1) + '</div>\n        <div class="daily-task-icon">' + t.icon + '</div>\n        <div class="daily-task-title">' + t.title + '</div>\n        <div class="daily-task-desc">' + t.desc + '</div>\n        <div class="daily-task-status ' + statusClass + '">' + statusText + '</div>\n        <button class="btn ' + (t.done ? 'btn-secondary' : 'btn-primary') + '" style="width:100%;margin-top:0.25rem;font-size:0.8rem;padding:0.4rem;" onclick="event.stopPropagation();DashboardView.startVstepTask(' + i + ')">' + btnText + '</button>\n      </div>';
    }).join('');

    return '\n      <div class="glass-card" style="margin-bottom:2rem;background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(239,68,68,0.08));border-color:rgba(245,158,11,0.3);padding:1.5rem 2rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">\n          <div>\n            <h2 style="font-size:1.5rem;margin-bottom:0.25rem;">📋 Nhiệm vụ hằng ngày</h2>\n            <p style="color:var(--text-muted);font-size:0.9rem;">Hoàn thành cả 3 nhiệm vụ để nhận thưởng XP! <strong>' + doneCount + '/3</strong></p>\n          </div>\n          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.8rem;" onclick="DashboardView.exitDailyTasks()">✕ Đóng</button>\n        </div>\n        ' + (allDone ? '<div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(16,185,129,0.12);border-radius:10px;text-align:center;font-size:0.95rem;color:#10b981;font-weight:600;">🎉 Hoàn thành cả 3 nhiệm vụ! +30 XP</div>' : '') + '\n      </div>\n      <div class="daily-tasks-grid">\n        ' + cardsHtml + '\n      </div>\n    ';
  },

  // ===================== START / COMPLETE VSTEP TASKS =====================

  startVstepTask: function (idx) {
    var tasks = this.dailyTasks.tasks || [];
    if (idx < 0 || idx >= tasks.length) return;
    this.dailyTasks.currentTask = tasks[idx].type;
    this.dailyTasks._activeIdx = idx;
    this.refresh();
  },

  completeVstepTask: function () {
    var idx = this.dailyTasks._activeIdx;
    var tasks = this.dailyTasks.tasks || [];
    if (idx < 0 || idx >= tasks.length) return;
    tasks[idx].done = true;
    this.setCompletedTaskId(this.dailyTasks.dayKey, tasks[idx].id);

    var allDone = tasks.filter(function (t) { return t.done; }).length === 3 && tasks.length === 3;
    if (allDone) {
      this.dailyTasks.completed = true;
      this.logActivity(3);
      App.addXp(30);
    }

    this.dailyTasks.currentTask = 'menu';
    this.refresh();
  },

  backToTaskMenu: function () {
    this.dailyTasks.currentTask = 'menu';
    this.refresh();
  },

  // ===================== VSTEP TASK: VOCAB =====================

  renderVstepVocabTask: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return this.backToTaskMenu();
    var st = t.state;
    if (st.current >= st.words.length) {
      st.typed = true;
      return '\n        <div class="glass-card" style="text-align:center;padding:2rem;">\n          <div style="font-size:3rem;margin-bottom:1rem;">📚</div>\n          <h2>Hoàn thành từ vựng!</h2>\n          <p style="color:var(--text-muted);margin:0.5rem 0;">Bạn đã ôn ' + st.words.length + ' từ VSTEP.</p>\n          <button class="btn btn-accent" onclick="DashboardView.completeVstepTask()">✅ Hoàn thành nhiệm vụ</button>\n          <button class="btn btn-secondary" style="margin-left:0.5rem;" onclick="DashboardView.backToTaskMenu()">← Danh sách</button>\n        </div>\n      ';
    }
    var word = st.words[st.current];
    return '\n      <div class="glass-card" style="margin-bottom:1rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">\n          <h3 style="font-size:1.1rem;margin:0;">📚 Từ vựng VSTEP <span style="font-size:0.85rem;color:var(--text-muted);font-weight:400;">(' + (st.current + 1) + '/' + st.words.length + ')</span></h3>\n          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.3rem 0.7rem;" onclick="DashboardView.backToTaskMenu()">← Danh sách</button>\n        </div>\n        <div style="text-align:center;padding:1.5rem;background:var(--bg-input);border-radius:12px;margin-bottom:0.75rem;">\n          <div style="font-size:1.5rem;font-weight:700;margin-bottom:0.25rem;color:var(--text-primary);">' + word.meaningVi + '</div>\n          <div style="font-size:0.85rem;color:var(--text-muted);">' + word.level + '</div>\n        </div>\n        <div style="text-align:center;padding:0.5rem 0;">\n          <button class="btn btn-accent" style="margin-bottom:0.75rem;" onclick="DashboardView.speakText(\'' + word.word.replace(/'/g, "\\'") + '\')">🔊 Nghe phát âm</button>\n          <div style="display:flex;gap:0.75rem;justify-content:center;align-items:center;flex-wrap:wrap;">\n            <input type="text" id="vstep-vocab-input" class="input-field" placeholder="Gõ từ tiếng Anh..." style="flex:1;max-width:300px;padding:0.6rem 1rem;text-align:center;font-size:1rem;">\n            <button class="btn btn-primary" onclick="DashboardView.checkVstepVocabAnswer()">Kiểm tra</button>\n          </div>\n        </div>\n        <div id="vstep-vocab-feedback" style="text-align:center;margin-top:0.5rem;"></div>\n        <div id="vstep-vocab-next" style="text-align:center;margin-top:0.5rem;"></div>\n      </div>\n    ';
  },

  speakText: function (text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  },

  checkVstepVocabAnswer: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return;
    var st = t.state;
    if (st.typed) return;
    var word = st.words[st.current];
    var input = document.getElementById('vstep-vocab-input');
    var fb = document.getElementById('vstep-vocab-feedback');
    var nx = document.getElementById('vstep-vocab-next');
    if (!input || !fb) return;
    var answer = input.value.trim().toLowerCase();
    var correct = word.word.toLowerCase();
    var isCorrect = answer === correct;
    if (isCorrect) App.addXp(5);
    fb.innerHTML = '\n        <div class="explanation-box">\n          ' + (isCorrect ? '✅ Đúng! <strong>' + word.word + '</strong>' : '❌ Sai. Đáp án: <strong>' + word.word + '</strong>') + '\n          <span style="color:var(--text-muted);font-size:0.85rem;"> ' + (word.ipa || '') + '</span>\n          <br><span style="font-size:0.85rem;color:var(--text-muted);">' + word.meaningVi + '</span>\n          ' + (word.example ? '<br><em style="font-size:0.85rem;">"' + word.example + '"</em>' : '') + '\n        </div>\n      ';
    input.disabled = true;
    nx.innerHTML = '<button class="btn btn-accent" style="margin-top:0.5rem;" onclick="DashboardView.nextVstepVocabWord()">Từ tiếp theo →</button>';
  },

  nextVstepVocabWord: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (t && t.state) t.state.current++;
    this.refresh();
    setTimeout(function () {
      var inp = document.getElementById('vstep-vocab-input');
      if (inp) { inp.disabled = false; inp.value = ''; inp.focus(); }
    }, 50);
  },

  // ===================== VSTEP TASK: SPEAKING =====================

  renderVstepSpeakingTask: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return this.backToTaskMenu();
    var st = t.state;
    if (st.current >= st.questions.length) {
      return '\n        <div class="glass-card" style="text-align:center;padding:2rem;">\n          <div style="font-size:3rem;margin-bottom:1rem;">🎤</div>\n          <h2>Hoàn thành luyện nói!</h2>\n          <p style="color:var(--text-muted);margin:0.5rem 0;">Bạn đã tập nói ' + st.questions.length + ' câu hỏi Part 1.</p>\n          <button class="btn btn-accent" onclick="DashboardView.completeVstepTask()">✅ Hoàn thành nhiệm vụ</button>\n          <button class="btn btn-secondary" style="margin-left:0.5rem;" onclick="DashboardView.backToTaskMenu()">← Danh sách</button>\n        </div>\n      ';
    }
    var qd = st.questions[st.current];
    var qKey = 'q' + st.current;
    var rec = st.recordings[qKey];
    var isRecording = !!window._vstepSpeakingRec;

    var hintOpen = qd._showHint;
    var hintBtnLabel = hintOpen ? '🙈 Ẩn gợi ý' : '💡 Gợi ý';
    var hintHtml = '';
    if (qd.sampleAnswer && hintOpen) {
      hintHtml = '\n        <div style="margin-bottom:0.75rem;background:rgba(99,102,241,0.06);border-radius:10px;padding:0.75rem;border-left:3px solid var(--secondary);">\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">\n            <span style="font-weight:600;font-size:0.85rem;color:var(--text-muted);">💡 Gợi ý</span>\n            <button class="btn btn-secondary" style="font-size:0.7rem;padding:0.2rem 0.5rem;" onclick="DashboardView.playSpeakingSample(' + st.current + ')">🔊 Nghe</button>\n          </div>\n          <div style="font-size:0.85rem;line-height:1.6;color:var(--text-primary);">' + qd.sampleAnswer + '</div>\n        </div>\n      ';
    }

    var resultHtml = '';
    if (rec && rec.practiced) {
      var wc = rec.wordCount || 0;
      var qWords = qd.question.toLowerCase().replace(/[?.!,]/g, '').split(/\s+/).filter(Boolean);
      var spokenWords = (rec.transcript || '').toLowerCase().replace(/[?.!,]/g, '').split(/\s+/).filter(Boolean);
      var hitCount = 0;
      qWords.forEach(function (qw) {
        if (qw.length > 3 && spokenWords.indexOf(qw) >= 0) hitCount++;
      });
      var keyPct = qWords.filter(function (w) { return w.length > 3; }).length;
      var topicScore = keyPct > 0 ? Math.round(hitCount / keyPct * 100) : 0;
      var fluencyScore = Math.min(100, Math.round(wc / 15 * 100));
      var overall = Math.round((topicScore + fluencyScore) / 2);
      var barColor = overall >= 70 ? 'var(--accent)' : overall >= 40 ? 'var(--secondary)' : 'var(--primary)';
      var msg = overall >= 70 ? 'Tốt! Bạn đã trả lời đúng trọng tâm 🎉' : overall >= 40 ? 'Khá ổn, có thể cải thiện thêm 👍' : 'Hãy thử nói nhiều hơn 💪';

      resultHtml = '\n        <div style="margin-top:1rem;padding:1rem;background:rgba(255,255,255,0.03);border-radius:12px;">\n          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">\n            <div style="width:48px;height:48px;border-radius:50%;background:' + barColor + ';display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:800;color:#fff;flex-shrink:0;">' + overall + '</div>\n            <div>\n              <div style="font-weight:700;font-size:0.9rem;">Đánh giá câu trả lời</div>\n              <div style="font-size:0.78rem;color:var(--text-muted);">' + msg + '</div>\n            </div>\n          </div>\n          <div style="display:flex;gap:0.75rem;margin-bottom:0.6rem;flex-wrap:wrap;">\n            <div style="flex:1;padding:0.4rem 0.6rem;background:var(--bg-input);border-radius:6px;text-align:center;">\n              <div style="font-size:1rem;font-weight:700;">' + wc + '</div>\n              <div style="font-size:0.65rem;color:var(--text-muted);">từ đã nói</div>\n            </div>\n            <div style="flex:1;padding:0.4rem 0.6rem;background:var(--bg-input);border-radius:6px;text-align:center;">\n              <div style="font-size:1rem;font-weight:700;">' + topicScore + '%</div>\n              <div style="font-size:0.65rem;color:var(--text-muted);">đúng chủ đề</div>\n            </div>\n            <div style="flex:1;padding:0.4rem 0.6rem;background:var(--bg-input);border-radius:6px;text-align:center;">\n              <div style="font-size:1rem;font-weight:700;">' + fluencyScore + '%</div>\n              <div style="font-size:0.65rem;color:var(--text-muted);">độ trôi chảy</div>\n            </div>\n          </div>\n          <div style="height:6px;background:var(--border-color);border-radius:4px;overflow:hidden;margin-bottom:0.6rem;">\n            <div style="width:' + overall + '%;height:100%;background:' + barColor + ';border-radius:4px;transition:width 0.4s ease;"></div>\n          </div>\n          <div style="font-size:0.82rem;color:var(--text-muted);padding:0.5rem;background:var(--bg-input);border-radius:6px;">\n            <span style="font-weight:600;color:var(--text-primary);">Bạn nói:</span> <span style="font-style:italic;">"' + (rec.transcript || '') + '"</span>\n          </div>\n          ' + (qd.sampleAnswer ? '<div style="margin-top:0.5rem;padding:0.5rem;background:rgba(99,102,241,0.06);border-radius:6px;font-size:0.82rem;"><span style="font-weight:600;color:var(--text-muted);">💡 Gợi ý tham khảo:</span> ' + qd.sampleAnswer + '</div>' : '') + '\n        </div>\n        <div style="text-align:center;margin-top:0.75rem;">\n          <button class="btn btn-accent" onclick="DashboardView.nextVstepSpeakingQ()">Câu tiếp theo →</button>\n        </div>\n      ';
    }

    return '\n      <div class="glass-card" style="margin-bottom:1rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">\n          <h3 style="font-size:1.1rem;margin:0;">🎤 Luyện nói Part 1 <span style="font-size:0.85rem;color:var(--text-muted);font-weight:400;">(' + (st.current + 1) + '/' + st.questions.length + ')</span></h3>\n          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.3rem 0.7rem;" onclick="DashboardView.backToTaskMenu()">← Danh sách</button>\n        </div>\n        <div style="margin-bottom:0.5rem;">\n          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.25rem;">🎯 Chủ đề: ' + qd.topic.title + '</div>\n        </div>\n        <div style="padding:1.25rem;background:var(--bg-input);border-radius:12px;margin-bottom:1rem;">\n          <div style="font-weight:700;font-size:1rem;line-height:1.5;">❓ ' + qd.question + '</div>\n        </div>\n        ' + (!rec && qd.sampleAnswer ? '<div style="text-align:center;margin-bottom:0.75rem;"><button class="btn btn-secondary" onclick="DashboardView.toggleVstepHint(' + st.current + ')">' + hintBtnLabel + '</button></div>' : '') + '\n        ' + hintHtml + '\n        <div style="display:flex;justify-content:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;">\n          <button class="btn ' + (isRecording ? 'btn-accent recording' : 'btn-primary') + '" id="vstep-speaking-btn" onclick="DashboardView.toggleVstepSpeakingRec(' + st.current + ')">\n            ' + (isRecording ? '⏹ Dừng ghi âm' : '🎤 Ghi âm trả lời') + '\n          </button>\n          ' + (rec && rec.audioUrl ? '<button class="btn btn-secondary" onclick="DashboardView.playVstepSpeakingRec(' + st.current + ')">🔊 Nghe lại</button>' : '') + '\n        </div>\n        ' + resultHtml + '\n      </div>\n    ';
  },

  toggleVstepHint: function (idx) {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return;
    var qd = t.state.questions[idx];
    if (!qd) return;
    qd._showHint = !qd._showHint;
    this.refresh();
  },

  playSpeakingSample: function (idx) {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return;
    var qd = t.state.questions[idx];
    if (!qd || !qd.sampleAnswer) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(qd.sampleAnswer);
      u.lang = 'en-US'; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  },

  toggleVstepSpeakingRec: function (idx) {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return;
    var st = t.state;
    if (idx >= st.questions.length) return;
    var qd = st.questions[idx];
    var qKey = 'q' + idx;
    var self = this;

    if (window._vstepSpeakingRec) {
      var finalTranscript = '';
      if (window._vstepSpeakingRec.recognition) {
        window._vstepSpeakingRec._userStopping = true;
        window._vstepSpeakingRec.recognition.stop();
      }
      if (window._vstepSpeakingRec.mediaRecorder && window._vstepSpeakingRec.mediaRecorder.state !== 'inactive') {
        window._vstepSpeakingRec.mediaRecorder.stop();
      }
      setTimeout(function() {
        if (window._vstepSpeakingRec) {
          window._vstepSpeakingRec = null;
          done(finalTranscript);
        }
      }, 100);
      return;
    }

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var audioChunks = [];

    var done = function (transcript) {
      if (!st.recordings[qKey]) st.recordings[qKey] = {};
      var wordCount = transcript ? transcript.trim().split(/\s+/).filter(Boolean).length : 0;
      st.recordings[qKey].practiced = true;
      st.recordings[qKey].transcript = transcript;
      st.recordings[qKey].wordCount = wordCount;
      window._vstepSpeakingRec = null;
      self.refresh();
    };

    var startRec = function (stream) {
      var mediaRecorder = null;
      if (stream) {
        try {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = function (e) {
            if (e.data && e.data.size > 0) audioChunks.push(e.data);
          };
          mediaRecorder.onstop = function () {
            var blob = new Blob(audioChunks, { type: 'audio/webm' });
            if (!st.recordings[qKey]) st.recordings[qKey] = {};
            if (st.recordings[qKey].audioUrl) URL.revokeObjectURL(st.recordings[qKey].audioUrl);
            st.recordings[qKey].audioUrl = URL.createObjectURL(blob);
            if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
          };
          mediaRecorder.start();
        } catch (e) { console.warn('MediaRecorder error:', e); }
      }

      if (!SpeechRecognition) {
        done('(Trình duyệt không hỗ trợ)');
        if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
        return;
      }

      var recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = false;
      var finalTranscript = '';
      var keepAlive = function () {
        var rs = window._vstepSpeakingRec;
        if (!rs || rs._userStopping) return;
        try { recognition.start(); } catch (e) { setTimeout(keepAlive, 500); }
      };
      recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) finalTranscript = event.results[i][0].transcript;
        }
      };
      recognition.onerror = function () { setTimeout(keepAlive, 500); };
      recognition.onend = function () {
        var rs = window._vstepSpeakingRec;
        if (rs && rs._userStopping) {
          done(finalTranscript);
          if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
        } else {
          setTimeout(keepAlive, 300);
        }
      };
      recognition.start();
      window._vstepSpeakingRec = { recognition: recognition, mediaRecorder: mediaRecorder, _userStopping: false };
      self.refresh();
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(startRec).catch(function () { startRec(null); });
    } else {
      startRec(null);
    }
  },

  playVstepSpeakingRec: function (idx) {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return;
    var rec = t.state.recordings['q' + idx];
    if (rec && rec.audioUrl) {
      var a = new Audio(rec.audioUrl);
      a.play().catch(function (e) { console.error(e); });
    }
  },

  nextVstepSpeakingQ: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (t && t.state) t.state.current++;
    this.refresh();
  },

  // ===================== VSTEP TASK: IDEA =====================

  renderVstepIdeaTask: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (!t || !t.state) return this.backToTaskMenu();
    var st = t.state;
    var idea = st.data;

    if (st.read) {
      return '\n        <div class="glass-card" style="text-align:center;padding:2rem;">\n          <div style="font-size:3rem;margin-bottom:1rem;">✍️</div>\n          <h2>Hoàn thành ý tưởng viết!</h2>\n          <p style="color:var(--text-muted);margin:0.5rem 0;">Bạn đã đọc chủ đề "' + idea.label + '".</p>\n          <button class="btn btn-accent" onclick="DashboardView.completeVstepTask()">✅ Hoàn thành nhiệm vụ</button>\n          <button class="btn btn-secondary" style="margin-left:0.5rem;" onclick="DashboardView.backToTaskMenu()">← Danh sách</button>\n        </div>\n      ';
    }

    return '\n      <div class="glass-card" style="margin-bottom:1rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">\n          <h3 style="font-size:1.1rem;margin:0;">✍️ Ý tưởng bài viết</h3>\n          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.3rem 0.7rem;" onclick="DashboardView.backToTaskMenu()">← Danh sách</button>\n        </div>\n        <div style="margin-bottom:0.5rem;">\n          <span style="font-size:1.2rem;">' + idea.icon + '</span>\n          <span style="font-weight:700;font-size:1rem;margin-left:0.4rem;">' + idea.label + '</span>\n        </div>\n        <div style="padding:1rem;background:var(--bg-input);border-radius:12px;font-size:0.85rem;line-height:1.7;max-height:420px;overflow-y:auto;margin-bottom:1rem;">' + idea.html + '</div>\n        <div style="text-align:center;">\n          <button class="btn btn-accent" onclick="DashboardView.markIdeaRead()">📖 Đã đọc xong</button>\n        </div>\n      </div>\n    ';
  },

  markIdeaRead: function () {
    var t = this.dailyTasks.tasks[this.dailyTasks._activeIdx];
    if (t && t.state) t.state.read = true;
    this.refresh();
  },

  // ===================== OLD TASK FUNCTIONS (kept for compat) =====================

  startShadowingTask: function () {
    this.dailyTasks.currentTask = 'shadowing';
    this.refresh();
  },

  renderShadowingTask: function () {
    var s = this.dailyTasks.shadowing;
    if (s.current >= s.sentences.length) {
      return `
        <div class="glass-card" style="text-align:center;padding:2rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">🎉</div>
          <h2>Hoàn thành Shadowing!</h2>
          <p style="color:var(--text-muted);margin:0.5rem 0;">Bạn đã luyện tập ${s.sentences.length} câu.</p>
          <button class="btn btn-primary" onclick="DashboardView.dailyTasks.currentTask='menu';DashboardView.refresh()">← Quay lại</button>
        </div>
      `;
    }
    var sentence = s.sentences[s.current];
    var recordKey = 's' + s.current;
    var recording = s.recordings[recordKey];
    var isRecording = !!window._dailyShadowingRec;

    var html = `
      <div class="glass-card" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 style="font-size:1.1rem;">🎙️ Nhại câu sau <span style="font-size:0.85rem;color:var(--text-muted);font-weight:400;">(${s.current + 1}/${s.sentences.length})</span></h3>
          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.3rem 0.7rem;" onclick="DashboardView.dailyTasks.currentTask='menu';DashboardView.refresh()">← Danh sách</button>
        </div>
        <div style="text-align:center;padding:1.5rem;background:var(--bg-input);border-radius:12px;margin-bottom:1rem;">
          <div style="font-size:1.2rem;font-weight:600;line-height:1.6;margin-bottom:0.5rem;">"${sentence}"</div>
        </div>
        <div style="display:flex;justify-content:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;">
          <button class="btn btn-accent" onclick="DashboardView.playDailySentence(${s.current})">🔊 Nghe mẫu</button>
          <button class="btn ${isRecording ? 'btn-accent recording' : 'btn-primary'}" id="daily-shadow-btn" onclick="DashboardView.toggleDailyRecording(${s.current})">
            ${isRecording ? '⏹ Dừng' : '🎤 Ghi âm'}
          </button>
          ${recording && recording.audioUrl ? '<button class="btn btn-secondary" onclick="DashboardView.playDailyRecording(' + s.current + ')">🔊 Nghe lại</button>' : ''}
        </div>
        ${recording && recording.wordResults ? DashboardView.renderTaskWordEvaluation(recording.wordResults, recording.transcript) : ''}
        ${recording && recording.practiced ? `
        <div style="text-align:center;margin-top:1rem;">
          <button class="btn btn-accent" onclick="DashboardView.nextShadowingSentence()">Câu tiếp theo →</button>
        </div>` : ''}
      </div>
    `;
    return html;
  },

  playDailySentence: function (idx) {
    var s = this.dailyTasks.shadowing.sentences[idx];
    if (!s) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(s);
      u.lang = 'en-US'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  },

  toggleDailyRecording: function (idx) {
    var s = this.dailyTasks.shadowing;
    var recordKey = 's' + idx;
    var self = this;

    if (window._dailyShadowingRec) {
      var finalTranscript = '';
      if (window._dailyShadowingRec.recognition) window._dailyShadowingRec.recognition.stop();
      if (window._dailyShadowingRec.mediaRecorder && window._dailyShadowingRec.mediaRecorder.state !== 'inactive') {
        window._dailyShadowingRec.mediaRecorder.stop();
      }
      setTimeout(function() {
        if (window._dailyShadowingRec) {
          window._dailyShadowingRec = null;
          done(finalTranscript);
        }
      }, 100);
      return;
    }

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var audioChunks = [];

    var done = function (transcript) {
      var sentence = s.sentences[idx];
      var wordResults = VstepView.compareShadowingWords(sentence, transcript);
      var accuracy = VstepView.calculateAccuracy(sentence, transcript);
      if (!s.recordings[recordKey]) s.recordings[recordKey] = {};
      s.recordings[recordKey].practiced = true;
      s.recordings[recordKey].transcript = transcript;
      s.recordings[recordKey].wordResults = wordResults;
      s.recordings[recordKey].accuracy = accuracy;
      window._dailyShadowingRec = null;
      self.refresh();
    };

    var startRec = function (stream) {
      var mediaRecorder = null;
      if (stream) {
        try {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = function (e) {
            if (e.data && e.data.size > 0) audioChunks.push(e.data);
          };
          mediaRecorder.onstop = function () {
            var blob = new Blob(audioChunks, { type: 'audio/webm' });
            var recordKey = 's' + idx;
            if (!s.recordings[recordKey]) s.recordings[recordKey] = {};
            if (s.recordings[recordKey].audioUrl) URL.revokeObjectURL(s.recordings[recordKey].audioUrl);
            s.recordings[recordKey].audioUrl = URL.createObjectURL(blob);
            if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
          };
          mediaRecorder.start();
        } catch (e) { console.warn('MediaRecorder error:', e); }
      }

      if (!SpeechRecognition) {
        done('(Trình duyệt không hỗ trợ)');
        if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
        return;
      }

      var recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      var finalTranscript = '';
      recognition.onresult = function (event) {
        if (event.results && event.results[0]) finalTranscript = event.results[0][0].transcript;
      };
      recognition.onend = function () {
        done(finalTranscript);
        if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
      };
      recognition.start();
      window._dailyShadowingRec = { recognition: recognition, mediaRecorder: mediaRecorder };
      self.refresh();
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(startRec).catch(function () { startRec(null); });
    } else {
      startRec(null);
    }
  },

  playDailyRecording: function (idx) {
    var rec = this.dailyTasks.shadowing.recordings['s' + idx];
    if (rec && rec.audioUrl) {
      var a = new Audio(rec.audioUrl);
      a.play().catch(function (e) { console.error(e); });
    }
  },

  nextShadowingSentence: function () {
    this.dailyTasks.shadowing.current++;
    this.refresh();
  },

  renderTaskWordEvaluation: function (wordResults, transcript) {
    if (!wordResults || wordResults.length === 0) return '';
    var correctCount = 0, nearmissCount = 0, wrongCount = 0;
    wordResults.forEach(function (r) {
      if (r.status === 'correct') correctCount++;
      else if (r.status === 'nearmiss') nearmissCount++;
      else wrongCount++;
    });
    var total = wordResults.length;
    var pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    var html = '<div style="margin-top:1rem;padding:1rem;background:rgba(255,255,255,0.03);border-radius:10px;border-left:4px solid var(--accent);">';
    html += '  <div class="shadowing-word-grid">';
    wordResults.forEach(function (r) {
      var icon = r.status === 'correct' ? '✓' : r.status === 'nearmiss' ? '~' : '✗';
      html += '<div class="shadowing-word-box ' + r.status + '">';
      html += '  <div class="word">' + r.word + '</div>';
      html += '  <div class="ipa">' + r.ipa + '</div>';
      html += '  <div class="status-icon ' + r.status + '">' + icon + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '  <div class="shadowing-stats-row">';
    html += '    <span class="stat correct">✓ Chính xác: ' + pct + '%</span>';
    if (nearmissCount > 0) html += '    <span class="stat nearmiss">~ Gần đúng: ' + nearmissCount + ' từ</span>';
    if (wrongCount > 0) html += '    <span class="stat wrong">✗ Sai: ' + wrongCount + ' từ</span>';
    html += '  </div>';
    html += '  <div style="font-size:0.82rem;color:var(--text-muted);text-align:center;">Bạn nói: <span style="color:var(--text-primary);font-style:italic;">"' + (transcript || '') + '"</span></div>';
    html += '</div>';
    return html;
  },

  // ===================== TASK 2: VOCAB =====================

  startVocabTask: function () {
    var s = this.dailyTasks.vocab;
    s.current = 0;
    s.typed = false;
    this.dailyTasks.currentTask = 'vocab';
    this.refresh();
  },

  renderVocabTask: function () {
    var s = this.dailyTasks.vocab;
    if (s.current >= s.words.length) {
      this.dailyTasks.vocab.typed = true;
      return `
        <div class="glass-card" style="text-align:center;padding:2rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">🎉</div>
          <h2>Hoàn thành Từ vựng!</h2>
          <p style="color:var(--text-muted);margin:0.5rem 0;">Bạn đã ôn ${s.words.length} từ.</p>
          <button class="btn btn-primary" onclick="DashboardView.dailyTasks.currentTask='menu';DashboardView.refresh()">← Quay lại</button>
        </div>
      `;
    }
    var word = s.words[s.current];

    return `
      <div class="glass-card" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 style="font-size:1.1rem;">📚 Từ vựng <span style="font-size:0.85rem;color:var(--text-muted);font-weight:400;">(${s.current + 1}/${s.words.length})</span></h3>
          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.3rem 0.7rem;" onclick="DashboardView.dailyTasks.currentTask='menu';DashboardView.refresh()">← Danh sách</button>
        </div>
        <div style="text-align:center;padding:1rem;">
          <div style="font-size:1.5rem;font-weight:700;margin-bottom:0.25rem;color:var(--text-primary);">${word.meaningVi}</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">(${word.level})</div>
        </div>
        <div style="display:flex;gap:0.75rem;justify-content:center;align-items:center;flex-wrap:wrap;padding:0.5rem 0;">
          <input type="text" id="daily-vocab-input" class="input-field" placeholder="Gõ từ tiếng Anh..." style="flex:1;max-width:300px;padding:0.6rem 1rem;text-align:center;font-size:1rem;">
          <button class="btn btn-primary" onclick="DashboardView.checkVocabAnswer()">Kiểm tra</button>
        </div>
        <div id="daily-vocab-feedback" style="text-align:center;margin-top:0.5rem;"></div>
        <div id="daily-vocab-next" style="text-align:center;margin-top:0.5rem;"></div>
      </div>
    `;
  },

  checkVocabAnswer: function () {
    var s = this.dailyTasks.vocab;
    if (s.typed) return;
    var word = s.words[s.current];
    var input = document.getElementById('daily-vocab-input');
    var feedback = document.getElementById('daily-vocab-feedback');
    var nextArea = document.getElementById('daily-vocab-next');
    if (!input || !feedback) return;
    var answer = input.value.trim().toLowerCase();
    var correct = word.word.toLowerCase();
    var isCorrect = answer === correct;
    if (isCorrect) App.addXp(5);
    feedback.innerHTML = '<div class="explanation-box">' +
      (isCorrect ? '✅ Đúng! <strong>' + word.word + '</strong>' : '❌ Sai. Đáp án: <strong>' + word.word + '</strong>') +
      ' <span style="color:var(--text-muted);font-size:0.85rem;">' + (word.ipa || '') + '</span>' +
      '<br><em>"' + (word.example || '') + '"</em>' +
      '</div>';
    input.disabled = true;
    nextArea.innerHTML = '<button class="btn btn-accent" style="margin-top:0.5rem;" onclick="DashboardView.nextVocabWord()">Từ tiếp theo →</button>';
  },

  nextVocabWord: function () {
    this.dailyTasks.vocab.current++;
    this.refresh();
    setTimeout(function () {
      var inp = document.getElementById('daily-vocab-input');
      if (inp) { inp.disabled = false; inp.value = ''; inp.focus(); }
    }, 50);
  },

  // ===================== TASK 3: DICTATION =====================

  startDictationTask: function () {
    var s = this.dailyTasks.dictation;
    s.sentence = this.dailySentences[Math.floor(Math.random() * this.dailySentences.length)];
    s.words = s.sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/).filter(Boolean);
    s.filled = new Array(s.words.length).fill('');
    this.dailyTasks.currentTask = 'dictation';
    this.refresh();
  },

  renderDictationTask: function () {
    var s = this.dailyTasks.dictation;
    var words = s.words;

    var html = `
      <div class="glass-card" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 style="font-size:1.1rem;">✍️ Chính tả</h3>
          <button class="btn btn-secondary" style="font-size:0.8rem;padding:0.3rem 0.7rem;" onclick="DashboardView.dailyTasks.currentTask='menu';DashboardView.refresh()">← Danh sách</button>
        </div>
        <div style="text-align:center;padding:0.5rem;">
          <button class="btn btn-accent" style="font-size:1.1rem;padding:0.8rem 2rem;border-radius:9999px;" onclick="DashboardView.playDictationSentence()">🔊 Nghe câu</button>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;">Nhấn để nghe toàn bộ câu. Có thể nghe lại nhiều lần.</div>
        </div>
        <div id="dictation-word-boxes" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:1.5rem 0.5rem;">
    `;
    words.forEach(function (w, i) {
      var val = s.filled[i] || '';
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">';
      html += '  <input type="text" id="dict-box-' + i + '" value="' + val + '" placeholder="..." style="width:70px;padding:6px 4px;text-align:center;border:2px solid var(--border-color);border-radius:8px;background:var(--bg-input);color:var(--text-primary);font-size:0.95rem;outline:none;" oninput="DashboardView.onDictationInput(' + i + ')" autocomplete="off">';
      html += '</div>';
    });
    html += `
        </div>
        <div style="text-align:center;margin-top:0.5rem;">
          <button class="btn btn-primary" onclick="DashboardView.checkDictation()">📝 Kiểm tra</button>
          <button class="btn btn-secondary" style="margin-left:0.5rem;" onclick="DashboardView.playDictationSentence()">🔊 Nghe lại</button>
        </div>
        <div id="dictation-feedback" style="text-align:center;margin-top:1rem;"></div>
        <div id="dictation-next" style="text-align:center;margin-top:0.5rem;"></div>
      </div>
    `;
    return html;
  },

  playDictationSentence: function () {
    var s = this.dailyTasks.dictation.sentence;
    if (!s) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(s);
      u.lang = 'en-US'; u.rate = 0.7;
      window.speechSynthesis.speak(u);
    }
  },

  onDictationInput: function (idx) {
    var inp = document.getElementById('dict-box-' + idx);
    if (inp) this.dailyTasks.dictation.filled[idx] = inp.value;
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

  checkDictation: function () {
    var s = this.dailyTasks.dictation;
    var words = s.words;
    var correctCount = 0, nearmissCount = 0, wrongCount = 0;
    var resultsHtml = '<div class="shadowing-word-grid" style="margin-top:1rem;">';

    words.forEach(function (w, i) {
      var answer = (s.filled[i] || '').trim().toLowerCase();
      var target = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
      var status = 'wrong';
      var similarity = DashboardView._levenshtein(answer, target);
      var maxLength = Math.max(answer.length, target.length);
      var diffPercent = maxLength > 0 ? (similarity / maxLength) * 100 : 100;
      
      if (answer === target) {
        status = 'correct';
        correctCount++;
      } else if (answer && diffPercent < 20) {
        status = 'correct';
        correctCount++;
      } else if (answer && diffPercent >= 20 && diffPercent <= 50) {
        status = 'nearmiss';
        nearmissCount++;
      } else if (answer) {
        wrongCount++;
      } else {
        wrongCount++;
      }
      var icon = status === 'correct' ? '✓' : status === 'nearmiss' ? '~' : '✗';
      var ipa = VstepView.getWordIPA(w);
      resultsHtml += '<div class="shadowing-word-box ' + status + '">';
      resultsHtml += '  <div class="word">' + w + '</div>';
      resultsHtml += '  <div class="ipa">' + ipa + '</div>';
      resultsHtml += '  <div class="status-icon ' + status + '">' + icon + '</div>';
      resultsHtml += '  <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">' + (answer || '—') + '</div>';
      resultsHtml += '</div>';
    });

    resultsHtml += '</div>';
    var total = words.length;
    var pct = Math.round((correctCount / total) * 100);
    resultsHtml += '<div class="shadowing-stats-row">';
    resultsHtml += '  <span class="stat correct">✓ Chính xác: ' + pct + '%</span>';
    if (nearmissCount > 0) resultsHtml += '  <span class="stat nearmiss">~ Gần đúng: ' + nearmissCount + ' từ</span>';
    if (wrongCount > 0) resultsHtml += '  <span class="stat wrong">✗ Sai: ' + wrongCount + ' từ</span>';
    resultsHtml += '</div>';

    if (correctCount === total) {
      App.addXp(15);
      resultsHtml += '<div style="text-align:center;margin-top:0.5rem;font-size:1.1rem;color:var(--accent);font-weight:700;">🌟 Hoàn hảo! +15 XP</div>';
    }

    var feedback = document.getElementById('dictation-feedback');
    var nextArea = document.getElementById('dictation-next');
    if (feedback) feedback.innerHTML = resultsHtml;
    if (nextArea) {
      // Disable inputs
      words.forEach(function (_, i) {
        var inp = document.getElementById('dict-box-' + i);
        if (inp) inp.disabled = true;
      });
      nextArea.innerHTML = '<button class="btn btn-accent" style="margin-top:1rem;" onclick="DashboardView.dailyTasks.currentTask=\'menu\';DashboardView.refresh()">← Quay lại</button>';
    }
  },

  refresh: function () {
    var el = document.getElementById('main-content');
    if (el) el.innerHTML = this.render();
  },

  // ===================== LESSON MARQUEE =====================

  renderLessonMarquee: function () {
    var colors = {
      speaking: { bg: 'rgba(46,204,113,0.18)', text: '#2ECC71', border: 'rgba(46,204,113,0.45)' },
      reading: { bg: 'rgba(102,94,224,0.18)', text: '#665EE0', border: 'rgba(102,94,224,0.45)' },
      listening: { bg: 'rgba(138,99,210,0.18)', text: '#8A63D2', border: 'rgba(138,99,210,0.45)' },
      writing: { bg: 'rgba(245,176,65,0.18)', text: '#F5B041', border: 'rgba(245,176,65,0.45)' }
    };
    var icons = { speaking: '\uD83C\uDFA4', reading: '\uD83D\uDCD6', listening: '\uD83C\uDFA7', writing: '\u270D\uFE0F' };
    function itemHtml(lesson) {
      var key = (lesson.category || '').toLowerCase();
      var c = colors[key] || { bg: 'rgba(59,130,246,0.18)', text: '#3b82f6', border: 'rgba(59,130,246,0.45)' };
      var icon = icons[key] || '\uD83D\uDCD8';
      var disabled = lesson.id === 12 || !window['Lesson' + lesson.id + 'Data'];
      var style = 'background:' + c.bg + ';border:1px solid ' + c.border + ';color:' + c.text + ';';
      if (disabled) style += 'opacity:0.4;cursor:not-allowed;filter:grayscale(0.7);';
      return '<div class="lesson-marquee-item" title="' + String(lesson.title).replace(/"/g, '&quot;') + '" style="' + style + '" onclick="DashboardView.openMarqueeLesson(' + lesson.id + ')" oncontextmenu="LearnView.showLessonPopup(event, ' + lesson.id + ')">' +
        '<span style="font-size:0.55rem;opacity:0.85;line-height:1;">' + (disabled ? '\uD83D\uDEA7' : icon) + '</span>' +
        '<span style="line-height:1.2;">' + lesson.id + '</span>' +
        '</div>';
    }
    var seq = '';
    for (var i = 1; i <= 14; i++) {
      var d = window['Lesson' + i + 'Data'];
      seq += itemHtml({ id: i, title: (d && d.title) || 'Lesson ' + i, category: (d && d.category) || '' });
    }
    return '\n      <div class="glass-card lesson-marquee" style="margin-bottom:1.5rem;">\n        <div class="lesson-marquee-header" style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;margin-bottom:0.85rem;flex-wrap:wrap;">\n          <h3 style="font-size:1.05rem;margin:0;">\uD83D\uDCC5 K\u1ebf ho\u1ea1ch h\u1ecdc t\u1eadp - 14 b\xe0i</h3>\n          <span class="lesson-marquee-help" style="font-size:0.75rem;color:var(--text-muted);">\uD83D\uDC46 Ch\u1ea1m \u0111\u1ec3 ch\u1ecdn b\xe0i \xb7 di chu\u1ed9t \u0111\u1ec3 t\u1ea1m d\u1eebng</span>\n        </div>\n        <div class="lesson-marquee-track">' + seq + seq + '</div>\n      </div>\n    ';
  },

  openMarqueeLesson: function (id) {
    if (!window['Lesson' + id + 'Data'] || id === 12) {
      var msg = (window['Lesson' + id + 'Data'] && window['Lesson' + id + 'Data'].title || ('Lesson ' + id)) + ' s\u1ebd \u0111\u01b0\u1ee3c ph\xe1t tri\u1ec3n trong th\u1eddi gian t\u1edbi.';
      if (window.LearnView && LearnView.showToast) { LearnView.showToast(msg); } else { alert(msg); }
      return;
    }
    App.navigate('learn');
    setTimeout(function () { window.LearnView.openLesson(id); }, 300);
  },

  render: function () {
    // Daily Tasks mode — reset if day changed (midnight)
    if (this.dailyTasks.active) {
      var todayKey = new Date().toISOString().split("T")[0];
      if (this.dailyTasks.dayKey && this.dailyTasks.dayKey !== todayKey) {
        this.dailyTasks.active = false;
        this.dailyTasks.dayKey = null;
      }
    }
    if (this.dailyTasks.active) {
      if (this.dailyTasks.currentTask === 'menu') return this.renderDailyTaskMenu();
      if (this.dailyTasks.currentTask === 'vstep-vocab') return this.renderVstepVocabTask();
      if (this.dailyTasks.currentTask === 'vstep-speaking') return this.renderVstepSpeakingTask();
      if (this.dailyTasks.currentTask === 'vstep-idea') return this.renderVstepIdeaTask();
      return this.renderDailyTaskMenu();
    }

    const p = AppState.progress;
    const today = new Date();
    const greeting = today.getHours() < 12 ? "Chào buổi sáng" : today.getHours() < 18 ? "Chào buổi chiều" : "Chào buổi tối";
    const word = DashboardView.getDailyWord();

    // Compute VSTEP progress
    const learnedArr = StorageManager.getVstepLearnedWords();
    const vstepLearned = learnedArr.length;
    const vstepTotal = window.VstepVocabData ? VstepVocabData.length : 1;
    const vstepVocabPct = vstepTotal > 0 ? Math.min(100, Math.round((vstepLearned / vstepTotal) * 100)) : 0;
    const combinedPct = Math.min(100, Math.round(vstepVocabPct * 0.6 + p.en * 0.4));
    const wordsLearned = vstepLearned;

    // Skill progress data (based on question/essay/recording counts)
    const skillProgress = DashboardView.getSkillProgress();

    var roadmapSettings = this.getRoadmapInfo();

    return `
      <div class="glass-card dashboard-hero" style="margin-bottom:2rem;background:linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.1));border-color:rgba(168,85,247,0.3);padding:2rem 2.5rem;">
        <div class="dashboard-hero-content" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;">
          <div class="dashboard-hero-copy" style="flex:1;min-width:200px;">
            <h1 style="font-size:1.8rem;margin-bottom:0.5rem;">${greeting}! 👋</h1>
            <p style="color:var(--text-muted);font-size:0.95rem;">🔥 Chuỗi ngày học: <strong style="color:#f59e0b;">${AppState.streak} ngày</strong> &nbsp;|&nbsp; ⭐ XP: <strong style="color:var(--primary);">${App.formatNumber(AppState.xp)}</strong></p>
            ${roadmapSettings ? `<p style="color:var(--text-muted);font-size:0.9rem;margin-top:0.4rem;">🎯 VSTEP <strong style="color:var(--primary);">${roadmapSettings.goal}</strong> — thi <strong>${roadmapSettings.examDateStr}</strong> — còn <strong style="color:#f59e0b;">${roadmapSettings.countdown} ngày</strong></p>` : '<p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.4rem;"><a href="#" onclick="App.navigate(\'vstep\');setTimeout(function(){window.VstepView.setSection(\'roadmap\')},300)" style="color:var(--primary);">🗺️ Thiết lập lộ trình VSTEP →</a></p>'}
          </div>
          <div class="dashboard-hero-actions" style="display:flex;gap:0.75rem;flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="App.navigate('learn')">📚 Học từ vựng</button>
            <button class="btn btn-accent" onclick="App.navigate('vstep');setTimeout(function(){window.VstepView.setSection('roadmap')},300)">🗺️ Lộ trình VSTEP</button>
          </div>
        </div>
      </div>

      <!-- ===== LESSON MARQUEE (full width, right edge aligned with greeting card) ===== -->
      ${DashboardView.renderLessonMarquee()}
      <!-- ===== END LESSON MARQUEE ===== -->

      <!-- Daily Tasks + Continue Learning side by side -->
      <div class="dashboard-top-row">
        ${DashboardView.renderDailyTasksCard()}
        ${DashboardView.renderContinueLearning()}
      </div>

      <div class="dashboard-grid">
        <div>
          <!-- Stats Row -->
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(168,85,247,0.15);color:#a855f7;">⭐</div>
              <div>
                <div class="stat-value">${App.formatNumber(AppState.xp)}</div>
                <div class="stat-label">Tổng XP</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;">🔥</div>
              <div>
                <div class="stat-value">${AppState.streak}</div>
                <div class="stat-label">Ngày liên tiếp</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(59,130,246,0.15);color:#3b82f6;">📖</div>
              <div>
                <div class="stat-value">${vstepLearned}/${vstepTotal}</div>
                <div class="stat-label">Từ vựng VSTEP</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:rgba(16,185,129,0.15);color:#10b981;">✅</div>
              <div>
                <div class="stat-value">${combinedPct}%</div>
                <div class="stat-label">Tiến độ tổng hợp</div>
              </div>
            </div>
          </div>

          <!-- Daily Flashcard -->
          <div class="glass-card" style="margin-bottom:1.5rem;">
            <div class="dashboard-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <h3 style="font-size:1.05rem;">🃏 Các từ mà tôi đã lưu</h3>
              <button class="btn btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" onclick="DashboardView.nextFlashcard()">
                🔄 Từ khác
              </button>
            </div>
            ${word ? `
            <div class="flashcard" id="daily-flashcard" onclick="DashboardView.flipCard(event)">
              <div class="flashcard-inner" id="flashcard-inner">
                <div class="flashcard-front">
                  <div class="flashcard-lang-badge">🇻🇳 Tiếng Việt</div>
                  <div class="flashcard-word" id="fc-front-word">${word.meaningVi || word.vietnamese || word.word}</div>
                  <div class="flashcard-hint">👆 Nhấn để xem đáp án</div>
                </div>
                <div class="flashcard-back">
                  <div class="flashcard-lang-badge">🇬🇧 English</div>
                  <div class="flashcard-word">${word.word || (word.english && word.english.word)}</div>
                  <div class="flashcard-ipa">${word.ipa || (word.english && word.english.ipa) || ''}</div>
                  <div class="flashcard-example">"${word.example || (word.english && word.english.example) || ''}"</div>
                  <button class="pronounce-btn" style="margin-top:0.5rem;" onclick="event.stopPropagation();App.speak('${(word.word || (word.english && word.english.word) || '').replace(/'/g, "\\'")}','en')">
                    🔊 Nghe phát âm
                  </button>
                </div>
              </div>
            </div>
            ` : `
            <div style="text-align:center;padding:2rem 0;color:var(--text-muted);">
              <div style="font-size:2.5rem;margin-bottom:0.5rem;">📭</div>
              <p>Bạn chưa lưu từ nào. Hãy vào phần <strong>Luyện thi VSTEP</strong> hoặc <strong>Học từ vựng</strong> để lưu từ nhé!</p>
            </div>
            `}
          </div>

          <!-- Contribution Calendar + Mini Vocab side by side -->
          <div class="dashboard-calendar-vocab">
            <div class="calendar-wrap">
              ${DashboardView.renderContributionCalendar()}
            </div>
            <div class="vocab-wrap">
              <div class="glass-card" style="height:100%;margin-bottom:0;padding:1rem;">
                <h3 style="font-size:0.9rem;margin-bottom:0.75rem;">📋 Ôn tập nhanh</h3>
                ${function() {
                  var saved = DashboardView.getSavedWords();
                  if (saved.length === 0) return '<div style="text-align:center;padding:1rem 0;color:var(--text-muted);font-size:0.8rem;">Chưa có từ nào được lưu.</div>';
                  return '<div style="display:flex;flex-direction:column;gap:0.35rem;">' + saved.slice(0, 5).map(function(v) {
                    var enWord = v.word || (v.english && v.english.word) || '';
                    var vi = v.meaningVi || v.vietnamese || enWord;
                    return '<div class="dashboard-saved-word" style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;padding:0.3rem 0.4rem;background:var(--bg-input);border-radius:6px;">' +
                      '<span style="color:var(--text-muted);">' + vi + '</span>' +
                      '<span style="font-weight:500;">' + enWord + '</span>' +
                    '</div>';
                  }).join("") + '</div>';
                }()}
                <div style="margin-top:0.75rem;text-align:center;">
                  <button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.7rem;" onclick="App.navigate('learn')">Xem tất cả →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div>

          <!-- ===== 4 SKILL PROGRESS BARS ===== -->
          <div class="glass-card skill-progress-card" style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
              <h3 style="font-size:1.05rem;margin:0;">🎯 Tiến trình 4 kỹ năng VSTEP</h3>
              <span class="badge" style="background:rgba(168,85,247,0.15);color:#a855f7;border:1px solid rgba(168,85,247,0.3);padding:0.25rem 0.6rem;border-radius:6px;font-size:0.75rem;font-weight:600;">B1–B2</span>
            </div>

            <!-- Listening -->
            <div class="skill-progress-row">
              <div class="skill-progress-header">
                <div class="skill-progress-label">
                  <span class="skill-icon" style="background:rgba(59,130,246,0.15);color:#3b82f6;">🎧</span>
                  <span>Nghe (Listening)</span>
                </div>
                <span class="skill-progress-pct" style="color:#3b82f6;">${skillProgress.listening}%</span>
              </div>
              <div class="progress-bar-container skill-bar">
                <div class="progress-fill skill-fill-listening" style="width:${skillProgress.listening}%"></div>
              </div>
            </div>

            <!-- Reading -->
            <div class="skill-progress-row">
              <div class="skill-progress-header">
                <div class="skill-progress-label">
                  <span class="skill-icon" style="background:rgba(16,185,129,0.15);color:#10b981;">📖</span>
                  <span>Đọc (Reading)</span>
                </div>
                <span class="skill-progress-pct" style="color:#10b981;">${skillProgress.reading}%</span>
              </div>
              <div class="progress-bar-container skill-bar">
                <div class="progress-fill skill-fill-reading" style="width:${skillProgress.reading}%"></div>
              </div>
            </div>

            <!-- Writing -->
            <div class="skill-progress-row">
              <div class="skill-progress-header">
                <div class="skill-progress-label">
                  <span class="skill-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;">✍️</span>
                  <span>Viết (Writing)</span>
                </div>
                <span class="skill-progress-pct" style="color:#f59e0b;">${skillProgress.writing}%</span>
              </div>
              <div class="progress-bar-container skill-bar">
                <div class="progress-fill skill-fill-writing" style="width:${skillProgress.writing}%"></div>
              </div>
            </div>

            <!-- Speaking -->
            <div class="skill-progress-row">
              <div class="skill-progress-header">
                <div class="skill-progress-label">
                  <span class="skill-icon" style="background:rgba(239,68,68,0.15);color:#ef4444;">🎤</span>
                  <span>Nói (Speaking)</span>
                </div>
                <span class="skill-progress-pct" style="color:#ef4444;">${skillProgress.speaking}%</span>
              </div>
              <div class="progress-bar-container skill-bar">
                <div class="progress-fill skill-fill-speaking" style="width:${skillProgress.speaking}%"></div>
              </div>
            </div>

            <button class="btn btn-secondary" style="width:100%;margin-top:1.25rem;font-size:0.9rem;" onclick="App.navigate('vstep')">📊 Luyện tập để nâng cấp →</button>
          </div>
          <!-- ===== END SKILL PROGRESS BARS ===== -->

          <div class="glass-card vstep-quick-card" style="margin-bottom:1.5rem;border-color:rgba(16,185,129,0.25);">
            <h3 style="font-size:1.05rem;margin-bottom:1rem;">🎯 Luyện thi VSTEP</h3>
            <div class="vstep-feature-list">
              <div class="vstep-feature-item">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                <div class="vstep-feature-desc">
                  <h4>Nghe (Listening)</h4>
                  <p>Mô phỏng bài thi nghe VSTEP chuẩn, có phụ đề và giải thích tiếng Việt.</p>
                </div>
              </div>
              <div class="vstep-feature-item">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                <div class="vstep-feature-desc">
                  <h4>Đọc (Reading)</h4>
                  <p>Đoạn văn chuẩn VSTEP kèm câu hỏi trắc nghiệm và giải thích đáp án.</p>
                </div>
              </div>
              <div class="vstep-feature-item">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                <div class="vstep-feature-desc">
                  <h4>Viết (Writing)</h4>
                  <p>Task 1 (Thư phản hồi) và Task 2 (Luận nghị luận) với chấm điểm AI.</p>
                </div>
              </div>
              <div class="vstep-feature-item">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V21h2v-2.28c3.28-.49 6-3.3 6-6.72h-1.7z"/></svg>
                <div class="vstep-feature-desc">
                  <h4>Nói (Speaking)</h4>
                  <p>Ghi âm và nhận phản hồi từ AI về độ lưu loát, phát âm, ngữ pháp.</p>
                </div>
              </div>
            </div>
            <button class="btn btn-accent" style="width:100%;margin-top:1rem;" onclick="App.navigate('vstep')">🚀 Bắt đầu luyện thi ngay</button>
          </div>

        </div>
      </div>
    `;
  },

  nextFlashcard: function () {
    const savedWords = DashboardView.getSavedWords();
    if (savedWords.length === 0) return;
    DashboardView.flashcardIndex = Math.floor(Math.random() * savedWords.length);
    const word = savedWords[DashboardView.flashcardIndex];
    const inner = document.getElementById("flashcard-inner");
    const frontWord = document.getElementById("fc-front-word");
    if (inner) inner.classList.remove("flipped");
    if (frontWord) frontWord.textContent = word.meaningVi || word.vietnamese || word.word;
    DashboardView.flipped = false;
    setTimeout(() => DashboardView.renderFlashcardBack(word), 200);
  },

  renderFlashcardBack: function (word) {
    const inner = document.getElementById("flashcard-inner");
    if (!inner) return;
    const back = inner.querySelector(".flashcard-back");
    if (back) {
      var enWord = word.word || (word.english && word.english.word) || '';
      var ipa = word.ipa || (word.english && word.english.ipa) || '';
      var example = word.example || (word.english && word.english.example) || '';
      back.innerHTML = `
        <div class="flashcard-lang-badge">🇬🇧 English</div>
        <div class="flashcard-word">${enWord}</div>
        <div class="flashcard-ipa">${ipa}</div>
        <div class="flashcard-example">"${example}"</div>
        <button class="pronounce-btn" style="margin-top:0.5rem;display:inline-flex;align-items:center;gap:0.3rem;" onclick="event.stopPropagation();App.speak('${enWord}','en')">
          🔊 Nghe phát âm
        </button>
      `;
    }
  },

  flipCard: function (e) {
    if (e.target.closest(".pronounce-btn")) return;
    const inner = document.getElementById("flashcard-inner");
    if (!inner) return;
    DashboardView.flipped = !DashboardView.flipped;
    inner.classList.toggle("flipped", DashboardView.flipped);
  },

  /* ========== Contribution Calendar ========== */

  loadActivity: function () {
    var data = this._lsGet("vstep_activity_log");
    if (!data) return {};
    try { return JSON.parse(data); } catch (e) { return {}; }
  },

  saveActivity: function (log) {
    this._lsSet("vstep_activity_log", JSON.stringify(log));
  },

  logActivity: function (score) {
    var today = new Date().toISOString().split("T")[0];
    var log = this.loadActivity();
    log[today] = (log[today] || 0) + score;
    this.saveActivity(log);
  },

  loadStudyTime: function (dateStr) {
    var savedTime = this._lsGet("vstep_study_time_" + dateStr) || "0";
    return parseInt(savedTime, 10);
  },

  renderContributionCalendar: function () {
    var today = new Date();
    // Vietnamese convention: week starts on Monday (T2)
    var dayNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    var monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    var todayStr = today.toISOString().split("T")[0];
    var selectedDay = this._lsGet("vstep_activity_selected") || todayStr;
    var activityColors = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];

    var curMonth = today.getMonth();
    var curYear = today.getFullYear();
    var months = [
      { m: curMonth - 1, y: curMonth === 0 ? curYear - 1 : curYear },
      { m: curMonth, y: curYear },
      { m: curMonth + 1, y: curMonth === 11 ? curYear + 1 : curYear }
    ];
    // Handle year boundaries
    if (months[0].m < 0) { months[0].m = 11; months[0].y = curYear - 1; }
    if (months[2].m > 11) { months[2].m = 0; months[2].y = curYear + 1; }

    var DAYS = 90;
    var dayCount = 0, totalScore = 0, maxStreak = 0, curStreak = 0;

    // Fixed color levels: darkest at 5 hours (300 minutes) of study,
    // lower levels divided evenly (0, 75, 150, 225, 300)
    var colorThresholds = [0, 75, 150, 225, 300];
    function getLevel(val) {
      if (val <= 0) return 0;
      for (var i = 1; i < colorThresholds.length; i++) {
        if (val <= colorThresholds[i]) return Math.min(i, 4);
      }
      return 4;
    }

    function buildMonthTable(monthIdx, yearIdx, isCurrent) {
      var firstDay = new Date(yearIdx, monthIdx, 1);
      var lastDay = new Date(yearIdx, monthIdx + 1, 0);
      // Convert to Monday-first: Sunday (0) becomes 6, Monday (1) becomes 0, etc.
      var startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
      var totalDays = lastDay.getDate();

      var monthDays = [];
      for (var d = 1; d <= totalDays; d++) {
        var dt = new Date(yearIdx, monthIdx, d);
        var dateStr = dt.toISOString().split("T")[0];
        // Use actual study time in minutes for calendar display
        var studyTimeSeconds = DashboardView.loadStudyTime(dateStr);
        var studyTimeMinutes = Math.floor(studyTimeSeconds / 60);
        var level = getLevel(studyTimeMinutes);
        var isToday = dateStr === todayStr;
        var isSelected = dateStr === selectedDay;
        var inWindow = false;
        var diffDays = Math.round((today - dt) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < DAYS) inWindow = true;
        if (inWindow && studyTimeMinutes > 0) { dayCount++; totalScore += studyTimeMinutes; curStreak++; if (curStreak > maxStreak) maxStreak = curStreak; }
        else if (inWindow) { curStreak = 0; }
        monthDays.push({
          dateStr: dateStr, day: d, dayOfWeek: dt.getDay(),
          level: inWindow ? level : 0, color: activityColors[inWindow ? level : 0],
          isToday: isToday, isSelected: isSelected,
          studyTimeMinutes: studyTimeMinutes
        });
      }

      // Grid: up to 6 rows x 7 cols
      var grid = [];
      for (var r = 0; r < 6; r++) {
        grid[r] = [];
        for (var c = 0; c < 7; c++) grid[r][c] = null;
      }
      monthDays.forEach(function (md) {
        var position = md.day - 1 + startDayOfWeek;
        var row = Math.floor(position / 7);
        var col = position % 7;
        if (row >= 0 && row < 6) grid[row][col] = md;
      });

      var rows = "";
      for (var r = 0; r < 6; r++) {
        var hasCell = grid[r].some(function (c) { return c !== null; });
        if (!hasCell) continue;
        rows += '<tr>';
        for (var c = 0; c < 7; c++) {
          var cell = grid[r][c];
          if (cell) {
            var cls = "contribution-cell" + (cell.isSelected ? " selected" : "") + (cell.isToday ? " today" : "");
            var studyTimeText = cell.studyTimeMinutes > 0 ? DashboardView.formatStudyTime(cell.studyTimeMinutes * 60) : "Không có hoạt động";
            rows += '<td><div class="' + cls + '" style="background:' + cell.color + ';" onclick="DashboardView.selectActivityDay(\'' + cell.dateStr + '\')" data-date="' + cell.dateStr + '" data-time="' + studyTimeText + '" title="' + cell.dateStr + ' - ' + studyTimeText + '"></div></td>';
          } else {
            rows += '<td><div style="width:14px;height:14px;"></div></td>';
          }
        }
        rows += '</tr>';
      }
      return rows;
    }

    function buildDayHeaders() {
      var h = '<tr>';
      for (var i = 0; i < 7; i++) {
        h += '<td style="font-size:0.6rem;color:#8b949e;padding:0 0 4px 0;text-align:center;">' + dayNames[i] + '</td>';
      }
      return h + '</tr>';
    }

    var monthHtmls = [];
    for (var mi = 0; mi < months.length; mi++) {
      var mData = months[mi];
      var label = monthNames[mData.m] + (mData.y !== curYear ? " " + mData.y : "");
      var isCurrent = mi === 1;
      monthHtmls.push('\n        <div style="flex:1;min-width:0;">\n          <div style="text-align:center;font-size:0.8rem;font-weight:600;margin-bottom:0.5rem;color:' + (isCurrent ? 'var(--primary)' : 'var(--text-muted)') + ';">' + label + '</div>\n          <table class="contribution-table">\n            <thead>' + buildDayHeaders() + '</thead>\n            <tbody>' + buildMonthTable(mData.m, mData.y, isCurrent) + '</tbody>\n          </table>\n        </div>');
    }

    var selInfo = "";
    if (selectedDay) {
      var selDate = new Date(selectedDay + "T00:00:00");
      var dayName = dayNames[selDate.getDay() === 0 ? 6 : selDate.getDay() - 1];
      var dateStrVi = dayName + ", " + selDate.getDate() + " tháng " + (selDate.getMonth() + 1) + ", " + selDate.getFullYear();
      var isTodaySel = selectedDay === todayStr;
      var studyTimeSeconds = DashboardView.loadStudyTime(selectedDay);
      var studyTimeText = studyTimeSeconds > 0 ? DashboardView.formatStudyTime(studyTimeSeconds) : "Không có hoạt động";
      selInfo = '\n          <div class="contribution-selected-day" style="margin-top:0.75rem;padding:0.65rem 0.75rem;background:var(--bg-input);border-radius:8px;font-size:0.8rem;display:flex;justify-content:space-between;align-items:center;">\n            <div><strong>' + dateStrVi + '</strong>' + (isTodaySel ? ' <span style="background:rgba(59,130,246,0.15);color:#3b82f6;font-size:0.7rem;padding:1px 6px;border-radius:4px;margin-left:6px;">Hôm nay</span>' : '') + '</div>\n            <div style="color:var(--text-muted);font-size:0.75rem;">' + (studyTimeSeconds > 0 ? '⏱ ' + studyTimeText : 'Không có hoạt động') + '</div>\n          </div>';
    }

    var mainActivity = dayCount > 0 ? "Luyện tập" : "Chưa có dữ liệu";
    var totalStudyMinutes = Math.floor(totalScore);

    return '\n      <div class="glass-card" style="margin-bottom:0;">\n        <div style="margin-bottom:0.75rem;">\n          <h3 style="font-size:1rem;margin:0;">90 ngày gần nhất</h3>\n          <p style="font-size:0.75rem;color:var(--text-muted);margin:0.25rem 0 0 0;">Bấm vào một ngày để xem chi tiết. Ô càng đậm = học càng nhiều.</p>\n        </div>\n        <div class="contribution-months" style="display:flex;gap:0.5rem;align-items:stretch;">\n          ' + monthHtmls.join("\n          <div style=\"width:1px;background:repeating-linear-gradient(to bottom,var(--border-color) 0,var(--border-color) 4px,transparent 4px,transparent 8px);\"></div>") + '\n        </div>\n        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.65rem;font-size:0.7rem;color:#8b949e;">\n          <span>Ít</span>\n          <div style="display:flex;align-items:center;gap:6px;">\n            <div style="display:flex;gap:2px;">\n              <div style="width:10px;height:10px;background:#ebedf0;border-radius:2px;"></div>\n              <div style="width:10px;height:10px;background:#c6e48b;border-radius:2px;"></div>\n              <div style="width:10px;height:10px;background:#7bc96f;border-radius:2px;"></div>\n              <div style="width:10px;height:10px;background:#239a3b;border-radius:2px;"></div>\n              <div style="width:10px;height:10px;background:#196127;border-radius:2px;"></div>\n            </div>\n            <span style="margin-left:4px;">Nhiều</span>\n          </div>\n        </div>\n        ' + selInfo + '\n        <div style="margin-top:0.75rem;padding-top:0.65rem;border-top:1px solid var(--border-color);">\n          <div style="font-size:0.8rem;font-weight:600;margin-bottom:0.4rem;">Tổng kết 90 ngày</div>\n          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;font-size:0.78rem;">\n            <div><span style="color:var(--text-muted);">Ngày có học</span> <strong>' + dayCount + '/' + DAYS + '</strong></div>\n            <div><span style="color:var(--text-muted);">Thời gian học</span> <strong>' + DashboardView.formatStudyTime(totalStudyMinutes * 60) + '</strong></div>\n            <div><span style="color:var(--text-muted);">Chuỗi dài nhất</span> <strong>' + maxStreak + ' ngày</strong></div>\n            <div><span style="color:var(--text-muted);">Hoạt động chính</span> <strong>' + mainActivity + '</strong></div>\n          </div>\n        </div>\n      </div>\n';
  },

  selectActivityDay: function (dateStr) {
    this._lsSet("vstep_activity_selected", dateStr);
    // Preserve scroll position across the re-render so the calendar
    // stays in view when picking a day
    var scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    App.navigate("dashboard");
    if (scrollY > 0) {
      setTimeout(function () {
        window.scrollTo(0, scrollY);
      }, 260);
    }
  },

  /* ========== Continue Learning / Last Activity ========== */

  saveLastActivity: function (view, section, label) {
    // Skip write if the activity did not change (keeps cross-tab sync from
    // bouncing between tabs, since storage events only fire on value change)
    try {
      var prev = this.getLastActivity();
      if (prev && prev.view === view && (prev.section || "") === (section || "") && (prev.label || "") === (label || "")) {
        return;
      }
    } catch (e) {}
    this._lsSet("vstep_last_activity", JSON.stringify({
      view: view,
      section: section || "",
      label: label || "",
      timestamp: new Date().toISOString()
    }));
  },

  getLastActivity: function () {
    try {
      var data = JSON.parse(localStorage.getItem("vstep_last_activity"));
      if (!data || !data.view) return null;
      return data;
    } catch (e) { return null; }
  },

  renderContinueLearning: function () {
    var last = this.getLastActivity();
    var viewNames = { dashboard: "Dashboard", learn: "Học tập", vstep: "Luyện thi VSTEP", translator: "Dịch thuật", settings: "Cài đặt" };
    var icons = { dashboard: "🏠", learn: "📚", vstep: "📝", translator: "🌐", settings: "⚙️" };

    // Check for saved test position (from VstepPrep answer selection)
    var testPos = null;
    try {
      var tp = StorageManager.getVstepLastTestPosition();
      if (tp) testPos = tp;
    } catch (e) {}

    if (!last && !testPos) {
      return '\n        <div class="glass-card" style="flex:1;padding:1.25rem 1.5rem;border-color:rgba(99,102,241,0.2);">\n          <div style="display:flex;align-items:center;gap:0.75rem;">\n            <div style="width:44px;height:44px;background:rgba(99,102,241,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">🚀</div>\n            <div style="flex:1;">\n              <h3 style="font-size:1rem;margin:0;font-weight:700;">Bắt đầu học</h3>\n              <p style="font-size:0.8rem;color:var(--text-muted);margin:0.1rem 0 0 0;">Chọn một mục từ sidebar để bắt đầu</p>\n            </div>\n          </div>\n        </div>\n      ';
    }

    // Use testPos if available (more specific), fallback to last activity
    var usedTestPos = testPos && last && last.view === "vstep";
    var icon = icons.vstep || "📝";
    var viewName = "Luyện thi VSTEP";
    var subLabel = "";
    var timeAgo = "";
    var continueAction = "";

    if (usedTestPos) {
      var sectionLabel = testPos.section === "reading" ? "Luyện đọc" : "Luyện nghe";
      subLabel = sectionLabel + " — " + (testPos.label || "") + " (" + (testPos.qProgress || "?") + " câu)";
      if (testPos.timestamp) {
        var diffMs = new Date() - new Date(testPos.timestamp);
        var diffMin = Math.floor(diffMs / 60000);
        if (diffMin < 1) timeAgo = "Vừa xong";
        else if (diffMin < 60) timeAgo = diffMin + "p trước";
        else {
          var hrs = Math.floor(diffMin / 60);
          var mins = diffMin % 60;
          if (hrs < 24) {
            timeAgo = hrs + "h" + (mins > 0 ? " " + mins + "p" : "") + " trước";
          } else {
            var dys = Math.floor(hrs / 24);
            var remH = hrs % 24;
            timeAgo = dys + "ngày" + (remH > 0 ? " " + remH + "h" : "") + " trước";
          }
        }
      }
      // loadTestPosition() reads from localStorage - no need to embed JSON
      continueAction = "App.navigate('vstep');setTimeout(function(){if(window.VstepView)VstepView.loadTestPosition()},400)";
    } else if (last) {
      icon = icons[last.view] || "📌";
      viewName = viewNames[last.view] || last.view;
      subLabel = last.label || "";
      if (last.timestamp) {
        var d2 = Math.round((new Date() - new Date(last.timestamp)) / (1000 * 60));
        if (d2 < 1) timeAgo = "Vừa xong";
        else if (d2 < 60) timeAgo = d2 + "p trước";
        else if (d2 < 1440) timeAgo = Math.round(d2 / 60) + "h trước";
        else timeAgo = Math.round(d2 / 1440) + "ngày trước";
      }
      continueAction = "App.navigate('" + last.view + "')";
      if (last.section) {
        continueAction = "App.navigate('" + last.view + "');setTimeout(function(){if(window.VstepView)window.VstepView.setSection('" + last.section + "')},300)";
      }
    }

    return '\n      <div class="glass-card" style="flex:1;padding:1.25rem 1.5rem;border-color:rgba(99,102,241,0.25);cursor:pointer;" onclick="' + continueAction + '">\n        <div style="display:flex;align-items:center;gap:0.75rem;">\n          <div style="width:44px;height:44px;background:rgba(99,102,241,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">' + icon + '</div>\n          <div style="flex:1;">\n            <h3 style="font-size:1rem;margin:0;font-weight:700;">Tiếp tục học</h3>\n            <p style="font-size:0.8rem;color:var(--text-muted);margin:0.1rem 0 0 0;">' + viewName + (subLabel ? " — " + subLabel : "") + ' <span style="color:#8b949e;">· ' + timeAgo + '</span></p>\n          </div>\n          <button class="btn btn-secondary" style="font-size:0.7rem;padding:0.3rem 0.6rem;white-space:nowrap;" onclick="event.stopPropagation();DashboardView.showTestHistory(event)">📜 Lịch sử</button>\n        </div>\n      </div>\n';
  },

  /* ---------- Show test history bubble ---------- */
  showTestHistory: function (evt) {
    document.querySelectorAll(".test-history-popup").forEach(function (el) { el.remove(); });
    var testPos;
    try {
      testPos = StorageManager.getVstepLastTestPosition();
    } catch (e) {}
    if (!testPos) { alert("Chưa có lịch sử làm bài."); return; }

    var sectionName = testPos.section === "reading" ? "Luyện đọc" : "Luyện nghe";
    var answers = testPos.answers || {};
    var answerCount = Object.keys(answers).length;
    var totalQ = parseInt(testPos.qProgress ? testPos.qProgress.split("/")[1] : "0") || 0;
    var pct = totalQ > 0 ? Math.round(answerCount / totalQ * 100) : 0;
    var remaining = totalQ - answerCount;

    // Time ago calculation (detailed)
    var timeAgo = "";
    var timeFull = "";
    if (testPos.timestamp) {
      var d = new Date(testPos.timestamp);
      timeFull = d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      var diffMs = new Date() - d;
      var diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) timeAgo = "Vừa xong";
      else if (diffMin < 60) timeAgo = diffMin + "p trước";
      else {
        var hours = Math.floor(diffMin / 60);
        var mins = diffMin % 60;
        if (hours < 24) {
          timeAgo = hours + "h" + (mins > 0 ? " " + mins + "p" : "") + " trước";
        } else {
          var days = Math.floor(hours / 24);
          var remHours = hours % 24;
          timeAgo = days + "ngày" + (remHours > 0 ? " " + remHours + "h" : "") + " trước";
        }
      }
    }

    // Position near the clicked button
    var x = 0, y = 0;
    if (evt && evt.target) {
      var rect = evt.target.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.bottom + 8;
    } else {
      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
    }

    var barColor = pct >= 80 ? "var(--accent)" : pct >= 40 ? "var(--secondary)" : "var(--primary)";

    var popup = document.createElement("div");
    popup.className = "test-history-popup";
    popup.style.cssText =
      "position:fixed;z-index:99999;left:" + x + "px;top:" + y + "px;" +
      "min-width:280px;max-width:360px;background:var(--bg-panel-solid);" +
      "border:1px solid var(--border-color);border-radius:12px;padding:14px 16px;" +
      "box-shadow:0 8px 30px rgba(0,0,0,0.4);font-size:0.85rem;";

    popup.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
        '<h4 style="margin:0;font-size:0.95rem;font-weight:700;">📜 Chi tiết bài làm</h4>' +
        '<span onclick="this.closest(\'.test-history-popup\').remove()" style="cursor:pointer;font-size:1rem;opacity:0.5;line-height:1;">✕</span>' +
      '</div>' +
      '<div style="margin-bottom:10px;">' +
        '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border-color);">' +
          '<span style="color:var(--text-muted);">Kỹ năng</span><span style="font-weight:600;">' + sectionName + '</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border-color);">' +
          '<span style="color:var(--text-muted);">Bài</span><span style="font-weight:600;">' + (testPos.label || "") + '</span>' +
        '</div>' +
        '<div style="padding:8px 0 4px;">' +
          '<div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:4px;">' +
            '<span style="color:var(--text-muted);">Tiến độ</span>' +
            '<span style="font-weight:600;">' + answerCount + '/' + totalQ + ' câu (' + pct + '%)</span>' +
          '</div>' +
          '<div style="height:6px;background:var(--border-color);border-radius:4px;overflow:hidden;">' +
            '<div style="width:' + pct + '%;height:100%;background:' + barColor + ';border-radius:4px;transition:width 0.4s ease;"></div>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-top:3px;">' +
            '<span style="color:var(--text-muted);">' + remaining + ' câu còn lại</span>' +
            '<span style="color:var(--text-muted);">' + pct + '%</span>' +
          '</div>' +
        '</div>' +
        (timeAgo ? '<div style="display:flex;justify-content:space-between;padding:4px 0;border-top:1px solid var(--border-color);margin-top:4px;">' +
          '<span style="color:var(--text-muted);">Lúc</span><span style="font-weight:600;">' + timeFull + '</span>' +
        '</div>' : "") +
        (timeAgo ? '<div style="display:flex;justify-content:space-between;padding:4px 0;">' +
          '<span style="color:var(--text-muted);">Cách đây</span><span style="font-weight:600;">' + timeAgo + '</span>' +
        '</div>' : "") +
      '</div>' +
      '<button class="btn btn-primary" style="width:100%;padding:6px 0;font-size:0.8rem;" onclick="this.closest(\'.test-history-popup\').remove();App.navigate(\'vstep\');setTimeout(function(){if(window.VstepView)VstepView.loadTestPosition()},400)">▶ Tiếp tục bài này</button>';

    document.body.appendChild(popup);

    // Keep within viewport
    var pr = popup.getBoundingClientRect();
    if (pr.right > window.innerWidth) {
      popup.style.left = (window.innerWidth - pr.width - 12) + "px";
    }
    if (pr.bottom > window.innerHeight) {
      popup.style.top = (y - pr.height - 16) + "px";
    }

    setTimeout(function () {
      var closeHandler = function (e) {
        if (!popup.contains(e.target)) {
          popup.remove();
          document.removeEventListener("click", closeHandler);
        }
      };
      document.addEventListener("click", closeHandler);
    }, 50);
  },

  bindEvents: function () {
    setTimeout(() => {
      document.querySelectorAll(".progress-fill").forEach(el => {
        const target = el.style.width;
        el.style.width = "0";
        setTimeout(() => { el.style.width = target; }, 50);
      });
    }, 100);
  }
};
