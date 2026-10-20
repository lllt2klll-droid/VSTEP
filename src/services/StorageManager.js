/* ==========================================================================
   STORAGE MANAGER - UNIFIED DATA STORAGE SYSTEM
   Features: Auto-save, File Backup, Export/Import, Cross-tab Sync, Data Validation
   ========================================================================== */

window.StorageManager = {
  // ====== Configuration ======
  STORAGE_PREFIX: "vstep_",
  STORAGE_VERSION: "1.0", // For format migration
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  BACKUP_FILENAME: "vstep_data_backup.json",
  MAX_STORAGE_SIZE: 5 * 1024 * 1024, // 5MB limit
  
  // ====== Data Keys ======
  KEYS: {
    THEME: "theme",
    SPEED: "speed",
    PITCH: "pitch",
    STREAK: "streak",
    XP: "xp",
    PROGRESS: "progress",
    LAST_DATE: "last_date",
    SAVED_WORDS: "saved_words",
    CHAT_HISTORY: "chat_history",
    CURRENT_VIEW: "current_view",
    SELECTED_TOPIC: "selected_topic",
    LEARN_TAB: "learn_tab",
    LAST_ACTIVITY: "last_activity",
    // VSTEP Keys
    VSTEP_FULL_STATE: "vstep_full_state",
    VSTEP_PERFORMANCE_HISTORY: "vstep_performance_history",
    VSTEP_WRONG_ANSWERS: "vstep_wrong_answers",
    VSTEP_LAST_TEST_POSITION: "vstep_last_test_position",
    VSTEP_STATE: "vstep_state",
    VSTEP_LEARNED_WORDS: "vstep_learned_words",
    VSTEP_ESSAY_HISTORY: "vstep_essay_history",
    PRACTICE_TEST_HISTORY: "practice_test_history",
    // Practice Test Progress Keys
    PRACTICE_TEST_CURRENT: "practice_test_current",
    PRACTICE_TEST_STATES: "practice_test_states",
    PRACTICE_TEST_ANSWERS: "practice_test_answers",
    PRACTICE_TEST_PROGRESS: "practice_test_progress",
    // Sound effects keys
    SOUND_ENABLED: "sound_enabled",
    SOUND_VOLUME: "sound_volume",
    // Notes keys
    NOTES: "notes",
    // UI Settings keys
    FONT_SIZE: "font_size",
    FRAME_SIZE: "frame_size",
    // System keys
    STORAGE_VERSION: "storage_version",
    LAST_BACKUP: "last_backup"
  },

  // ====== Initialize ======
  init: function() {
    this.checkStorageVersion();
    this.migrateLegacyKeys();
    this.setupAutoSave();
    this.setupCrossTabSync();
    this.setupBeforeUnload();
    console.log("✅ StorageManager initialized v" + this.STORAGE_VERSION);
  },

  // ====== Storage Version Check ======
  checkStorageVersion: function() {
    var currentVersion = this.get(this.KEYS.STORAGE_VERSION);
    if (!currentVersion) {
      // First time or legacy - set current version
      this.set(this.KEYS.STORAGE_VERSION, this.STORAGE_VERSION);
    } else {
      // Normalize legacy "1" to the current "1.0" format.
      var normalizedVersion = String(currentVersion).trim();
      if (normalizedVersion === "1") normalizedVersion = "1.0";

      if (normalizedVersion !== this.STORAGE_VERSION) {
        console.log("🔄 Storage version mismatch: " + currentVersion + " -> " + this.STORAGE_VERSION);
        this.migrateStorage(normalizedVersion, this.STORAGE_VERSION);
      }

      if (String(currentVersion) !== this.STORAGE_VERSION) {
        this.set(this.KEYS.STORAGE_VERSION, this.STORAGE_VERSION);
      }
    }
  },

  // ====== Storage Migration ======
  migrateStorage: function(fromVersion, toVersion) {
    console.log("🔄 Migrating storage from v" + fromVersion + " to v" + toVersion);
    // Add migration logic here when format changes
    // Example: if (fromVersion === "0.9" && toVersion === "1.0") { ... }
  },

  // ====== Legacy Key Migration ======
  migrateLegacyKeys: function() {
    var self = this;
    var legacyMappings = {
      "notes": this.KEYS.NOTES,
      "vstep_learned_words": this.KEYS.VSTEP_LEARNED_WORDS,
      "vstep_last_test_position": this.KEYS.VSTEP_LAST_TEST_POSITION,
      "vstep_theme": this.KEYS.THEME,
      "vstep_xp": this.KEYS.XP,
      "vstep_streak": this.KEYS.STREAK
    };

    Object.keys(legacyMappings).forEach(function(legacyKey) {
      try {
        var legacyValue = localStorage.getItem(legacyKey);
        if (legacyValue !== null) {
          var newKey = legacyMappings[legacyKey];
          var existingValue = self.get(newKey);
          // Only migrate if new key doesn't exist or is empty
          if (!existingValue || (Array.isArray(existingValue) && existingValue.length === 0)) {
            try {
              var parsed = JSON.parse(legacyValue);
              self.set(newKey, parsed);
              localStorage.removeItem(legacyKey);
              console.log("🔄 Migrated legacy key: " + legacyKey + " -> " + newKey);
            } catch (e) {
              // Keep as string if not JSON
              self.set(newKey, legacyValue);
              localStorage.removeItem(legacyKey);
              console.log("🔄 Migrated legacy key (string): " + legacyKey + " -> " + newKey);
            }
          }
        }
      } catch (e) {
        console.error("Error migrating legacy key " + legacyKey + ":", e);
      }
    });
  },

  // ====== Core Storage Operations ======
  get: function(key) {
    try {
      var fullKey = this.STORAGE_PREFIX + key;
      var value = localStorage.getItem(fullKey);
      if (value === null) return null;

      // Try to parse as JSON
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } catch (e) {
      console.error("StorageManager.get error:", e);
      return null;
    }
  },

  set: function(key, value) {
    try {
      var fullKey = this.STORAGE_PREFIX + key;
      var stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
      
      // Check storage size before setting
      if (stringValue.length > this.MAX_STORAGE_SIZE) {
        console.error("StorageManager.set error: Value too large (" + stringValue.length + " bytes)");
        window.dispatchEvent(new CustomEvent("vstep-storage-error", { detail: { key: key, error: "Value too large" } }));
        return false;
      }
      
      localStorage.setItem(fullKey, stringValue);
      
      // Trigger auto-save after setting data
      this.scheduleAutoSave();
      return true;
    } catch (e) {
      console.error("StorageManager.set error:", e);
      // Surface storage failure (quota exceeded, private mode, ...) to the UI
      try {
        window.dispatchEvent(new CustomEvent("vstep-storage-error", { detail: { key: key, error: e.message } }));
      } catch (e2) {}
      return false;
    }
  },

  remove: function(key) {
    try {
      var fullKey = this.STORAGE_PREFIX + key;
      localStorage.removeItem(fullKey);
      this.scheduleAutoSave();
      return true;
    } catch (e) {
      console.error("StorageManager.remove error:", e);
      return false;
    }
  },

  clear: function() {
    try {
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          keys.push(key);
        }
      }
      keys.forEach(function(key) {
        localStorage.removeItem(key);
      });
      return true;
    } catch (e) {
      console.error("StorageManager.clear error:", e);
      return false;
    }
  },

  // ====== Auto-save System ======
  autoSaveTimer: null,
  pendingSave: false,

  setupAutoSave: function() {
    var self = this;
    // Save periodically
    setInterval(function() {
      self.saveToBackupFile();
    }, this.AUTO_SAVE_INTERVAL);
  },

  scheduleAutoSave: function() {
    var self = this;
    if (this.pendingSave) return;
    this.pendingSave = true;
    
    // Debounce: wait 2 seconds before saving
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }
    
    this.autoSaveTimer = setTimeout(function() {
      self.saveToBackupFile();
      self.pendingSave = false;
    }, 2000);
  },

  saveToBackupFile: function() {
    try {
      var data = this.getAllData();
      var backupData = {
        version: this.STORAGE_VERSION,
        timestamp: new Date().toISOString(),
        data: data
      };
      var blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
      
      // Save to localStorage as backup (for persistence)
      localStorage.setItem(this.STORAGE_PREFIX + "full_backup", JSON.stringify(backupData));
      // Use localStorage.setItem directly for LAST_BACKUP to avoid triggering scheduleAutoSave loop
      localStorage.setItem(this.STORAGE_PREFIX + this.KEYS.LAST_BACKUP, new Date().toISOString());
      
      console.log("💾 Auto-saved data backup");
      return true;
    } catch (e) {
      console.error("StorageManager.saveToBackupFile error:", e);
      return false;
    }
  },

  // ====== Cross-tab Sync ======
  setupCrossTabSync: function() {
    var self = this;
    window.addEventListener("storage", function(e) {
      if (e.key && e.key.startsWith(self.STORAGE_PREFIX)) {
        // Data changed in another tab
        console.log("🔄 Syncing data from another tab");
        self.notifyDataChange();
      }
    });
  },

  notifyDataChange: function() {
    // Dispatch custom event for components to listen
    window.dispatchEvent(new CustomEvent("vstep-data-changed"));
  },

  // ====== Before Unload Protection ======
  setupBeforeUnload: function() {
    var self = this;
    window.addEventListener("beforeunload", function() {
      self.saveToBackupFile();
    });
  },

  // ====== Get All Data ======
  getAllData: function() {
    var data = {};
    var self = this;
    // Include every key written by the app (some views write raw localStorage
    // keys directly, so iterate all keys with our prefix, not just KEYS)
    Object.keys(localStorage).forEach(function(key) {
      // Skip backup keys so the backup never contains a copy of itself
      if (key.indexOf("full_backup") >= 0) return;
      if (key.startsWith(self.STORAGE_PREFIX)) {
        // Keys are already fully prefixed, read them raw (this.get() would
        // prepend the prefix again)
        var raw = localStorage.getItem(key);
        try {
          var parsed = JSON.parse(raw);
          // Only keep parsed objects/arrays; keep primitives as strings so
          // exporting/importing round-trips exactly (e.g. "1.0" stays "1.0")
          data[key] = typeof parsed === "object" && parsed !== null ? parsed : raw;
        } catch (e) {
          data[key] = raw;
        }
      }
    });
    return data;
  },

  // ====== Restore All Data ======
  restoreAllData: function(data) {
    try {
      var self = this;
      Object.keys(data).forEach(function(key) {
        if (data[key] !== null && data[key] !== undefined) {
          // Keys from getAllData() are full prefixed keys (e.g. "vstep_xp"),
          // so write them raw to avoid double-prefixing
          try {
            var stringValue = typeof data[key] === "object" ? JSON.stringify(data[key]) : String(data[key]);
            localStorage.setItem(key, stringValue);
          } catch (e) {
            console.error("StorageManager.restoreAllData error on key:", key, e);
          }
        }
      });
      console.log("✅ Data restored successfully");
      return true;
    } catch (e) {
      console.error("StorageManager.restoreAllData error:", e);
      return false;
    }
  },

  // ====== Export to File ======
  exportToFile: function() {
    try {
      var data = this.getAllData();
      var jsonString = JSON.stringify(data, null, 2);
      var blob = new Blob([jsonString], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      
      var a = document.createElement("a");
      a.href = url;
      a.download = this.BACKUP_FILENAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log("📤 Data exported to file");
      return true;
    } catch (e) {
      console.error("StorageManager.exportToFile error:", e);
      return false;
    }
  },

  // ====== Import from File ======
  importFromFile: function(file) {
    var self = this;
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        try {
          var data = JSON.parse(e.target.result);
          var success = self.restoreAllData(data);
          if (success) {
            resolve(true);
          } else {
            reject(new Error("Failed to restore data"));
          }
        } catch (err) {
          reject(err);
        }
      };
      
      reader.onerror = function() {
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsText(file);
    });
  },

  // ====== Load from Backup ======
  loadFromBackup: function() {
    try {
      const backup = localStorage.getItem(this.STORAGE_PREFIX + "full_backup");
      if (backup) {
        const backupData = JSON.parse(backup);
        // Handle new backup format with version/timestamp
        const data = backupData.data || backupData;
        this.restoreAllData(data);
        console.log("✅ Loaded from backup");
        return true;
      }
      return false;
    } catch (e) {
      console.error("StorageManager.loadFromBackup error:", e);
      return false;
    }
  },

  // ====== Emergency Recovery ======
  emergencyRecovery: function() {
    console.warn("⚠️ Attempting emergency recovery from backup");
    var recovered = this.loadFromBackup();
    if (recovered) {
      console.log("✅ Emergency recovery successful");
      return true;
    }
    console.error("❌ Emergency recovery failed - no backup available");
    return false;
  },

  // ====== Validate Data Integrity ======
  validateData: function() {
    var issues = [];
    var self = this;
    
    // Check critical keys exist and have valid format
    var criticalKeys = [
      this.KEYS.NOTES,
      this.KEYS.VSTEP_STATE,
      this.KEYS.PRACTICE_TEST_HISTORY
    ];
    
    criticalKeys.forEach(function(key) {
      try {
        var value = self.get(key);
        if (value === null) {
          issues.push("Missing critical key: " + key);
        } else if (key === self.KEYS.NOTES && !Array.isArray(value)) {
          issues.push("Invalid format for " + key + ": expected array");
        } else if (key === self.KEYS.VSTEP_STATE && typeof value !== "object") {
          issues.push("Invalid format for " + key + ": expected object");
        }
      } catch (e) {
        issues.push("Error validating " + key + ": " + e.message);
      }
    });
    
    return issues;
  },

  // ====== Get Storage Info ======
  getStorageInfo: function() {
    var data = this.getAllData();
    var info = {
      totalKeys: Object.keys(data).length,
      keys: {},
      size: 0
    };
    var self = this;
    
    Object.keys(data).forEach(function(key) {
      var value = JSON.stringify(data[key]);
      info.keys[key] = {
        type: typeof data[key],
        size: value.length,
        itemCount: Array.isArray(data[key]) ? data[key].length : 
                   typeof data[key] === "object" ? Object.keys(data[key]).length : 1
      };
      info.size += value.length;
    });
    
    return info;
  },

  // ====== Convenience Methods for Common Data ======
  getTheme: function() {
    return this.get(this.KEYS.THEME) || "dark";
  },

  setTheme: function(theme) {
    return this.set(this.KEYS.THEME, theme);
  },

  getXp: function() {
    return parseInt(this.get(this.KEYS.XP) || "0");
  },

  setXp: function(xp) {
    return this.set(this.KEYS.XP, xp);
  },

  addXp: function(amount) {
    var current = this.getXp();
    return this.setXp(current + amount);
  },

  getStreak: function() {
    return parseInt(this.get(this.KEYS.STREAK) || "0");
  },

  setStreak: function(streak) {
    return this.set(this.KEYS.STREAK, streak);
  },

  getProgress: function() {
    try {
      return this.get(this.KEYS.PROGRESS) || { en: 0 };
    } catch (e) {
      return { en: 0 };
    }
  },

  setProgress: function(progress) {
    return this.set(this.KEYS.PROGRESS, progress);
  },

  getSavedWords: function() {
    try {
      return this.get(this.KEYS.SAVED_WORDS) || [];
    } catch (e) {
      return [];
    }
  },

  setSavedWords: function(words) {
    return this.set(this.KEYS.SAVED_WORDS, words);
  },

  // ====== VSTEP Data Methods ======
  getVstepFullState: function() {
    try {
      var state = this.get(this.KEYS.VSTEP_FULL_STATE) || {};
      if (typeof state === "object" && Object.keys(state).length === 0) {
        // Main state is empty — auto-restore from backup if one exists
        var restored = this.loadFromBackup();
        if (restored) {
          return this.get(this.KEYS.VSTEP_FULL_STATE) || {};
        }
      }
      return state;
    } catch (e) {
      return {};
    }
  },

  setVstepFullState: function(state) {
    return this.set(this.KEYS.VSTEP_FULL_STATE, state);
  },

  getVstepPerformanceHistory: function() {
    try {
      return this.get(this.KEYS.VSTEP_PERFORMANCE_HISTORY) || {};
    } catch (e) {
      return {};
    }
  },

  setVstepPerformanceHistory: function(history) {
    return this.set(this.KEYS.VSTEP_PERFORMANCE_HISTORY, history);
  },

  getVstepWrongAnswers: function() {
    try {
      return this.get(this.KEYS.VSTEP_WRONG_ANSWERS) || {};
    } catch (e) {
      return {};
    }
  },

  setVstepWrongAnswers: function(answers) {
    return this.set(this.KEYS.VSTEP_WRONG_ANSWERS, answers);
  },

  getVstepLastTestPosition: function() {
    try {
      var value = this.get(this.KEYS.VSTEP_LAST_TEST_POSITION) || null;
      if (value === null) {
        // Migrate legacy raw key (vstep_last_test_position) written before
        // these keys were routed through StorageManager
        try {
          var legacy = localStorage.getItem("vstep_last_test_position");
          if (legacy !== null) {
            try { value = JSON.parse(legacy); } catch { value = legacy; }
            if (value !== null) this.setVstepLastTestPosition(value);
          }
        } catch (e) {}
      }
      return value;
    } catch {
      return null;
    }
  },

  setVstepLastTestPosition: function(position) {
    return this.set(this.KEYS.VSTEP_LAST_TEST_POSITION, position);
  },

  getVstepState: function() {
    try {
      return this.get(this.KEYS.VSTEP_STATE) || {};
    } catch {
      return {};
    }
  },

  setVstepState: function(state) {
    return this.set(this.KEYS.VSTEP_STATE, state);
  },

  getVstepLearnedWords: function() {
    try {
      var value = this.get(this.KEYS.VSTEP_LEARNED_WORDS) || [];
      if (!Array.isArray(value) || value.length === 0) {
        // Migrate legacy raw key (vstep_learned_words) used by Learn/Dashboard
        try {
          var legacy = localStorage.getItem("vstep_learned_words");
          if (legacy) {
            var parsed = JSON.parse(legacy);
            if (Array.isArray(parsed) && parsed.length > 0) {
              value = parsed;
              this.setVstepLearnedWords(value);
            }
          }
        } catch (e) {}
      }
      return value;
    } catch (e) {
      return [];
    }
  },

  setVstepLearnedWords: function(words) {
    return this.set(this.KEYS.VSTEP_LEARNED_WORDS, words);
  },

  // Essay history is stored separately from the full state so the large
  // review snapshots cannot overflow localStorage silently
  getVstepEssayHistory: function() {
    try {
      return this.get(this.KEYS.VSTEP_ESSAY_HISTORY) || {};
    } catch (e) {
      return {};
    }
  },

  setVstepEssayHistory: function(history) {
    return this.set(this.KEYS.VSTEP_ESSAY_HISTORY, history);
  },

  getPracticeTestHistory: function() {
    try {
      return this.get(this.KEYS.PRACTICE_TEST_HISTORY) || [];
    } catch (e) {
      return [];
    }
  },

  setPracticeTestHistory: function(history) {
    return this.set(this.KEYS.PRACTICE_TEST_HISTORY, history);
  },

  getPracticeTestCurrent: function() {
    try {
      return this.get(this.KEYS.PRACTICE_TEST_CURRENT) || null;
    } catch (e) {
      return null;
    }
  },

  setPracticeTestCurrent: function(state) {
    return this.set(this.KEYS.PRACTICE_TEST_CURRENT, state);
  },

  getPracticeTestState: function(testId) {
    try {
      if (!testId) return null;
      var states = this.get(this.KEYS.PRACTICE_TEST_STATES) || {};
      return states[testId] || null;
    } catch (e) {
      return null;
    }
  },

  setPracticeTestState: function(testId, state) {
    try {
      if (!testId) return false;
      var states = this.get(this.KEYS.PRACTICE_TEST_STATES) || {};
      states[testId] = state;
      return this.set(this.KEYS.PRACTICE_TEST_STATES, states);
    } catch (e) {
      console.error("StorageManager.setPracticeTestState error:", e);
      return false;
    }
  },

  clearPracticeTestState: function(testId) {
    try {
      if (!testId) return false;
      var states = this.get(this.KEYS.PRACTICE_TEST_STATES) || {};
      if (states[testId]) {
        delete states[testId];
        this.set(this.KEYS.PRACTICE_TEST_STATES, states);
      }
      return true;
    } catch (e) {
      console.error("StorageManager.clearPracticeTestState error:", e);
      return false;
    }
  },

  getPracticeTestAnswers: function() {
    try {
      return this.get(this.KEYS.PRACTICE_TEST_ANSWERS) || {};
    } catch (e) {
      return {};
    }
  },

  setPracticeTestAnswers: function(answers) {
    return this.set(this.KEYS.PRACTICE_TEST_ANSWERS, answers);
  },

  getPracticeTestProgress: function() {
    try {
      return this.get(this.KEYS.PRACTICE_TEST_PROGRESS) || {};
    } catch (e) {
      return {};
    }
  },

  setPracticeTestProgress: function(progress) {
    return this.set(this.KEYS.PRACTICE_TEST_PROGRESS, progress);
  },

  // Save practice test answer for a specific question
  savePracticeTestAnswer: function(testId, section, questionId, answer) {
    try {
      var answers = this.getPracticeTestAnswers();
      if (!answers[testId]) {
        answers[testId] = {};
      }
      if (!answers[testId][section]) {
        answers[testId][section] = {};
      }
      answers[testId][section][questionId] = answer;
      this.setPracticeTestAnswers(answers);
      return true;
    } catch (e) {
      console.error("StorageManager.savePracticeTestAnswer error:", e);
      return false;
    }
  },

  // Get practice test answer for a specific question
  getPracticeTestAnswer: function(testId, section, questionId) {
    try {
      var answers = this.getPracticeTestAnswers();
      if (answers[testId] && answers[testId][section]) {
        return answers[testId][section][questionId] || null;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  // Save progress for a specific section
  savePracticeTestSectionProgress: function(testId, section, progress) {
    try {
      var progressData = this.getPracticeTestProgress();
      if (!progressData[testId]) {
        progressData[testId] = {};
      }
      progressData[testId][section] = progress;
      this.setPracticeTestProgress(progressData);
      return true;
    } catch (e) {
      console.error("StorageManager.savePracticeTestSectionProgress error:", e);
      return false;
    }
  },

  // Get progress for a specific section
  getPracticeTestSectionProgress: function(testId, section) {
    try {
      var progressData = this.getPracticeTestProgress();
      if (progressData[testId] && progressData[testId][section]) {
        return progressData[testId][section];
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  // Clear practice test data for a specific test
  clearPracticeTestData: function(testId) {
    try {
      var answers = this.getPracticeTestAnswers();
      var progress = this.getPracticeTestProgress();
      
      if (answers[testId]) {
        delete answers[testId];
        this.setPracticeTestAnswers(answers);
      }
      
      if (progress[testId]) {
        delete progress[testId];
        this.setPracticeTestProgress(progress);
      }

      this.clearPracticeTestState(testId);
      return true;
    } catch (e) {
      console.error("StorageManager.clearPracticeTestData error:", e);
      return false;
    }
  },

  // ====== Notes Data Methods ======
  getNotes: function() {
    try {
      return this.get(this.KEYS.NOTES) || [];
    } catch (e) {
      return [];
    }
  },

  setNotes: function(notes) {
    return this.set(this.KEYS.NOTES, notes);
  },

  // ====== UI Settings Methods ======
  getFontSize: function() {
    return this.get(this.KEYS.FONT_SIZE) || "16";
  },

  setFontSize: function(size) {
    return this.set(this.KEYS.FONT_SIZE, size);
  },

  getFrameSize: function() {
    return this.get(this.KEYS.FRAME_SIZE) || "100";
  },

  setFrameSize: function(size) {
    return this.set(this.KEYS.FRAME_SIZE, size);
  }
};

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    StorageManager.init();
  });
} else {
  StorageManager.init();
}
