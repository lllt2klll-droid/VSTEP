/* ==========================================================================
   KEYBOARD MANAGER - GLOBAL KEYBOARD SHORTCUTS SYSTEM
   Features: Navigation, Actions, Modals, Practice Tests, VSTEP
   ========================================================================== */

window.KeyboardManager = {
  // ====== Configuration ======
  enabled: true,
  currentView: null,
  
  // ====== Keyboard Shortcuts Definition ======
  SHORTCUTS: {
    // Global Navigation
    'Alt+H': { action: 'navigate', param: 'home', label: 'Về trang chủ', category: 'Navigation' },
    'Alt+L': { action: 'navigate', param: 'learn', label: 'Đi đến trang Học', category: 'Navigation' },
    'Alt+D': { action: 'navigate', param: 'dashboard', label: 'Đi đến Dashboard', category: 'Navigation' },
    'Alt+N': { action: 'navigate', param: 'notes', label: 'Đi đến Ghi chú', category: 'Navigation' },
    'Alt+T': { action: 'navigate', param: 'thithu', label: 'Đi đến Thi thử', category: 'Navigation' },
    'Alt+V': { action: 'navigate', param: 'vstep', label: 'Đi đến Luyện thi VSTEP', category: 'Navigation' },
    
    // Global Actions
    'Alt+?': { action: 'showHelp', label: 'Hiển thị trợ giúp phím tắt', category: 'Global' },
    'Escape': { action: 'closeModal', label: 'Đóng modal/hộp thoại', category: 'Global' },
    'Alt+S': { action: 'save', label: 'Lưu trạng thái hiện tại', category: 'Global' },
    
    // Practice Tests
    'Alt+1': { action: 'selectSkill', param: 'reading', label: 'Chọn kỹ năng Reading', category: 'Thi thử' },
    'Alt+2': { action: 'selectSkill', param: 'listening', label: 'Chọn kỹ năng Listening', category: 'Thi thử' },
    'Alt+3': { action: 'selectSkill', param: 'writing', label: 'Chọn kỹ năng Writing', category: 'Thi thử' },
    'Alt+4': { action: 'selectSkill', param: 'speaking', label: 'Chọn kỹ năng Speaking', category: 'Thi thử' },
    'Alt+Enter': { action: 'submit', label: 'Nộp bài/Chấm điểm', category: 'Thi thử' },
    'Alt+Backspace': { action: 'back', label: 'Quay lại', category: 'Thi thử' },
    
    // VSTEP Practice
    'Alt+R': { action: 'vstepSection', param: 'reading', label: 'VSTEP Reading', category: 'Luyện thi VSTEP' },
    'Alt+I': { action: 'vstepSection', param: 'listening', label: 'VSTEP Listening', category: 'Luyện thi VSTEP' },
    'Alt+W': { action: 'vstepSection', param: 'writing', label: 'VSTEP Writing', category: 'Luyện thi VSTEP' },
    'Alt+P': { action: 'vstepSection', param: 'speaking', label: 'VSTEP Speaking', category: 'Luyện thi VSTEP' },
    'Alt+Shift+T': { action: 'vstepTask', param: 'task1', label: 'Chuyển Task 1 (Writing)', category: 'Luyện thi VSTEP' },
    'Alt+Shift+Y': { action: 'vstepTask', param: 'task2', label: 'Chuyển Task 2 (Writing)', category: 'Luyện thi VSTEP' },
    'Alt+G': { action: 'grade', label: 'Chấm điểm AI', category: 'Luyện thi VSTEP' },
    
    // Audio/Media
    'Space': { action: 'togglePlay', label: 'Phát/Tạm dừng audio', category: 'Media' },
    'Alt+M': { action: 'toggleMute', label: 'Bật/Tắt âm thanh', category: 'Media' },
    'Alt+ArrowUp': { action: 'volumeUp', label: 'Tăng âm lượng', category: 'Media' },
    'Alt+ArrowDown': { action: 'volumeDown', label: 'Giảm âm lượng', category: 'Media' },
    
    // Text Editing
    'Ctrl+B': { action: 'formatBold', label: 'In đậm', category: 'Editing' },
    'Ctrl+I': { action: 'formatItalic', label: 'In nghiêng', category: 'Editing' },
    'Ctrl+U': { action: 'formatUnderline', label: 'Gạch chân', category: 'Editing' },
  },
  
  // ====== Initialize ======
  init: function() {
    this.setupKeyboardListener();
    console.log("✅ KeyboardManager initialized");
  },
  
  // ====== Keyboard Event Listener ======
  setupKeyboardListener: function() {
    document.addEventListener('keydown', function(e) {
      if (!KeyboardManager.enabled) return;
      
      // Don't trigger shortcuts when typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        // Allow some shortcuts even when typing
        if (e.key === 'Escape' || (e.ctrlKey && e.key === 's')) {
          KeyboardManager.handleShortcut(e);
        }
        return;
      }
      
      KeyboardManager.handleShortcut(e);
    });
  },
  
  // ====== Handle Shortcut ======
  handleShortcut: function(e) {
    var shortcut = this.getShortcutKey(e);
    var shortcutDef = this.SHORTCUTS[shortcut];
    
    if (shortcutDef) {
      e.preventDefault();
      this.executeAction(shortcutDef.action, shortcutDef.param);
    }
  },
  
  // ====== Get Shortcut Key String ======
  getShortcutKey: function(e) {
    var parts = [];
    
    if (e.altKey) parts.push('Alt');
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.shiftKey) parts.push('Shift');
    if (e.metaKey) parts.push('Meta');
    
    var key = e.key;
    if (key === ' ') key = 'Space';
    if (key === 'Escape') key = 'Escape';
    if (key === 'Enter') key = 'Enter';
    if (key === 'Backspace') key = 'Backspace';
    if (key === 'ArrowUp') key = 'ArrowUp';
    if (key === 'ArrowDown') key = 'ArrowDown';
    if (key === 'ArrowLeft') key = 'ArrowLeft';
    if (key === 'ArrowRight') key = 'ArrowRight';
    if (key === '?') key = '?';
    
    parts.push(key);
    return parts.join('+');
  },
  
  // ====== Execute Action ======
  executeAction: function(action, param) {
    switch(action) {
      case 'navigate':
        if (window.App && App.navigate) {
          App.navigate(param);
        }
        break;
        
      case 'showHelp':
        this.showHelpModal();
        break;
        
      case 'closeModal':
        this.closeActiveModal();
        break;
        
      case 'save':
        this.saveCurrentState();
        break;
        
      case 'selectSkill':
        if (window.ThithuView && ThithuView.currentTest) {
          ThithuView.selectSkill(param);
        }
        break;
        
      case 'submit':
        this.submitCurrentTask();
        break;
        
      case 'back':
        if (window.ThithuView && ThithuView.currentTest) {
          ThithuView.backToList();
        } else if (window.VstepView) {
          // Handle VSTEP back
        }
        break;
        
      case 'vstepSection':
        if (window.VstepView) {
          VstepView.currentSection = param;
          VstepView.refresh();
        }
        break;
        
      case 'vstepTask':
        if (window.VstepView && VstepView.setWritingTask) {
          VstepView.setWritingTask(param);
        }
        break;
        
      case 'grade':
        this.gradeCurrentTask();
        break;
        
      case 'togglePlay':
        this.toggleAudioPlay();
        break;
        
      case 'toggleMute':
        this.toggleMute();
        break;
        
      case 'volumeUp':
        this.adjustVolume(0.1);
        break;
        
      case 'volumeDown':
        this.adjustVolume(-0.1);
        break;
        
      case 'formatBold':
        this.formatText('bold');
        break;
        
      case 'formatItalic':
        this.formatText('italic');
        break;
        
      case 'formatUnderline':
        this.formatText('underline');
        break;
        
      default:
        console.log('Unknown action:', action);
    }
  },
  
  // ====== Action Implementations ======
  showHelpModal: function() {
    var modal = document.createElement('div');
    modal.id = 'keyboard-help-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;
    
    var categories = {};
    Object.keys(this.SHORTCUTS).forEach(function(key) {
      var shortcut = this.SHORTCUTS[key];
      if (!categories[shortcut.category]) {
        categories[shortcut.category] = [];
      }
      categories[shortcut.category].push({ key: key, label: shortcut.label });
    }.bind(this));
    
    var contentHtml = Object.keys(categories).map(function(category) {
      var shortcuts = categories[category];
      var shortcutsHtml = shortcuts.map(function(s) {
        return '<div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">' +
          '<span style="background: var(--bg-input); padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace; font-size: 0.85rem;">' + s.key + '</span>' +
          '<span style="color: var(--text-muted);">' + s.label + '</span>' +
          '</div>';
      }).join('');
      
      return '<div style="margin-bottom: 1.5rem;">' +
        '<h4 style="color: var(--primary); margin-bottom: 0.75rem; font-size: 1rem;">' + category + '</h4>' +
        shortcutsHtml +
        '</div>';
    }).join('');
    
    modal.innerHTML = `
      <div style="background: var(--bg-primary); padding: 2rem; border-radius: 12px; max-width: 600px; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="margin: 0; font-size: 1.5rem;">⌨️ Phím tắt</h2>
          <button onclick="KeyboardManager.closeHelpModal()" style="background: var(--bg-input); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">✕ Đóng</button>
        </div>
        ${contentHtml}
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.85rem;">
          💡 Mẹo: Nhấn <strong>Alt + ?</strong> để mở hộp thoại này bất cứ lúc nào
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  closeHelpModal: function() {
    var modal = document.getElementById('keyboard-help-modal');
    if (modal) {
      modal.remove();
    }
  },
  
  closeActiveModal: function() {
    this.closeHelpModal();
    // Close other modals if any
    var modals = document.querySelectorAll('[id$="-modal"], .modal');
    modals.forEach(function(modal) {
      if (modal && modal.remove) modal.remove();
    });
  },
  
  saveCurrentState: function() {
    if (window.StorageManager) {
      StorageManager.saveToBackupFile();
      this.showToast('💾 Đã lưu trạng thái');
    }
  },
  
  submitCurrentTask: function() {
    if (window.ThithuView && ThithuView.currentSkill) {
      if (ThithuView.currentSkill === 'writing') {
        if (ThithuView.state.writing.task1.userText && !ThithuView.state.writing.task1.result) {
          ThithuView.submitWritingTask1();
        } else if (ThithuView.state.writing.task2.userText && !ThithuView.state.writing.task2.result) {
          ThithuView.submitWritingTask2();
        }
      } else if (ThithuView.currentSkill === 'speaking') {
        // Handle speaking submission
      }
    } else if (window.VstepView) {
      if (VstepView.currentSection === 'writing') {
        VstepView.gradeWriting();
      }
    }
  },
  
  gradeCurrentTask: function() {
    if (window.VstepView && VstepView.currentSection === 'writing') {
      VstepView.gradeWriting();
    }
  },
  
  toggleAudioPlay: function() {
    var audio = document.querySelector('audio');
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  },
  
  toggleMute: function() {
    var audio = document.querySelector('audio');
    if (audio) {
      audio.muted = !audio.muted;
      this.showToast(audio.muted ? '🔇 Đã tắt âm thanh' : '🔊 Đã bật âm thanh');
    }
  },
  
  adjustVolume: function(delta) {
    var audio = document.querySelector('audio');
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, audio.volume + delta));
      this.showToast('🔊 Âm lượng: ' + Math.round(audio.volume * 100) + '%');
    }
  },
  
  formatText: function(format) {
    var textarea = document.activeElement;
    if (textarea && (textarea.tagName === 'TEXTAREA' || textarea.tagName === 'INPUT')) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var text = textarea.value;
      var selectedText = text.substring(start, end);
      
      if (selectedText) {
        var formattedText = '';
        switch(format) {
          case 'bold': formattedText = '**' + selectedText + '**'; break;
          case 'italic': formattedText = '*' + selectedText + '*'; break;
          case 'underline': formattedText = '<u>' + selectedText + '</u>'; break;
        }
        
        textarea.value = text.substring(0, start) + formattedText + text.substring(end);
        textarea.selectionStart = start;
        textarea.selectionEnd = start + formattedText.length;
      }
    }
  },
  
  showToast: function(message) {
    var toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--accent);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10001;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.remove();
    }, 2000);
  },
  
  // ====== Enable/Disable ======
  enable: function() {
    this.enabled = true;
  },
  
  disable: function() {
    this.enabled = false;
  }
};

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    KeyboardManager.init();
  });
} else {
  KeyboardManager.init();
}
