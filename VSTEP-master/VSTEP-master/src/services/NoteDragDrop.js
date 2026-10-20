/* ==========================================================================
   UNIVERSAL NOTE DRAG-AND-DROP SYSTEM
   Allows creating notes from any AI feedback text across all modes
   ========================================================================== */

window.NoteDragDrop = {
  isDragging: false,
  draggedText: '',
  draggedSource: null,
  dragStartX: 0,
  dragStartY: 0,
  selectionStart: 0,
  selectionEnd: 0,
  
  // Initialize drag-and-drop for a container
  initForContainer: function(container, sourceInfo) {
    if (!container) return;
    
    // Make text selectable
    container.style.userSelect = 'text';
    container.style.cursor = 'text';
    
    // Add mouse events for drag-to-create-note
    container.addEventListener('mousedown', this.handleMouseDown.bind(this, sourceInfo));
    container.addEventListener('mouseup', this.handleMouseUp.bind(this, sourceInfo));
    container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    container.addEventListener('dragstart', this.handleDragStart.bind(this, sourceInfo));
    container.addEventListener('dragend', this.handleDragEnd.bind(this));
    
    // Store source info for later use
    container._noteSourceInfo = sourceInfo;
  },
  
  handleMouseDown: function(sourceInfo, e) {
    // Only handle left click
    if (e.button !== 0) return;
    
    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.draggedSource = sourceInfo;
    
    // Store selection range
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.selectionStart = selection.anchorOffset;
      this.selectionEnd = selection.focusOffset;
    }
  },
  
  handleMouseMove: function(e) {
    if (!this.isDragging) return;
    
    // If moved significantly, it's a drag operation
    var dx = e.clientX - this.dragStartX;
    var dy = e.clientY - this.dragStartY;
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      // Get selected text
      var selection = window.getSelection();
      var selectedText = selection.toString().trim();
      
      if (selectedText.length > 0) {
        this.draggedText = selectedText;
        
        // Set draggable attribute on selected text
        var range = selection.getRangeAt(0);
        var span = document.createElement('span');
        span.draggable = true;
        span.textContent = selectedText;
        span.style.cssText = 'background:rgba(99,102,241,0.2);padding:2px 4px;border-radius:4px;';
        
        try {
          range.surroundContents(span);
          span.addEventListener('dragstart', this.handleSpanDragStart.bind(this, this.draggedSource));
        } catch (err) {
          // If surroundContents fails (complex selection), just use the text
        }
      }
    }
  },
  
  handleSpanDragStart: function(sourceInfo, e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', this.draggedText);
    e.dataTransfer.setData('application/x-note-source', JSON.stringify(sourceInfo));
    
    // Visual feedback
    e.target.style.opacity = '0.7';
  },
  
  handleMouseUp: function(sourceInfo, e) {
    this.isDragging = false;
    this.draggedText = '';
    this.draggedSource = null;
  },
  
  handleDragStart: function(sourceInfo, e) {
    var selection = window.getSelection();
    var selectedText = selection.toString().trim();
    
    if (!selectedText || selectedText.length === 0) {
      e.preventDefault();
      return;
    }
    
    this.draggedText = selectedText;
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', selectedText);
    e.dataTransfer.setData('application/x-note-source', JSON.stringify(sourceInfo));
    
    // Visual feedback
    e.target.style.opacity = '0.7';
  },
  
  handleDragEnd: function(e) {
    e.target.style.opacity = '1';
    this.isDragging = false;
    this.draggedText = '';
    this.draggedSource = null;
  },
  
  // Initialize drop zone for NotesBubble
  initDropZone: function() {
    var notesBtn = document.getElementById('notes-toggle-btn');
    if (!notesBtn) return;
    
    // Remove existing listeners to avoid duplicates
    var newBtn = notesBtn.cloneNode(true);
    notesBtn.parentNode.replaceChild(newBtn, notesBtn);
    notesBtn = newBtn;
    
    notesBtn.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      notesBtn.style.transform = 'scale(1.15)';
      notesBtn.style.boxShadow = '0 0 25px rgba(99,102,241,0.6)';
      notesBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    });
    
    notesBtn.addEventListener('dragleave', function(e) {
      notesBtn.style.transform = '';
      notesBtn.style.boxShadow = '';
      notesBtn.style.background = '';
    });
    
    notesBtn.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      notesBtn.style.transform = '';
      notesBtn.style.boxShadow = '';
      notesBtn.style.background = '';
      
      var text = e.dataTransfer.getData('text/plain');
      var sourceInfo = e.dataTransfer.getData('application/x-note-source');
      
      if (text && text.trim().length > 0) {
        NoteDragDrop.createNoteFromDrag(text, sourceInfo);
      }
    });
  },
  
  // Create note from dragged text
  createNoteFromDrag: function(text, sourceInfo) {
    try {
      var source = sourceInfo ? JSON.parse(sourceInfo) : {};
    } catch (e) {
      var source = {};
    }
    
    var now = Date.now();
    var note = {
      id: 'n' + now + Math.floor(Math.random() * 1000),
      title: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      content: text,
      color: 'yellow',
      pinned: false,
      createdAt: now,
      updatedAt: now,
      source: {
        type: 'ai_feedback',
        mode: source.mode || 'unknown',
        section: source.section || 'unknown',
        originalText: text
      }
    };
    
    // Add to NotesView
    if (window.NotesView) {
      NotesView.notes.push(note);
      NotesView.selectedId = note.id;
      NotesView.save();
      NotesView.refreshView();
      
      // Show toast
      if (window.App && App.showToast) {
        App.showToast('📝 Đã tạo ghi chú từ AI feedback');
      }
      
      // Navigate to notes view
      App.navigate('notes');
    }
  },
  
  // Initialize for all AI feedback containers
  initAll: function() {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.initForVstepPrep();
      this.initForThithuView();
      this.initDropZone();
    }, 500);
  },
  
  // Initialize for VstepPrep writing feedback
  initForVstepPrep: function() {
    var feedbackContainers = document.querySelectorAll('.feedback-card, .highlighted-essay, .explanation-box, .feedback-text');
    feedbackContainers.forEach(container => {
      // Skip if already initialized
      if (container._noteDragDropInitialized) return;
      
      this.initForContainer(container, {
        mode: 'vstep_prep',
        section: 'writing_feedback'
      });
      container._noteDragDropInitialized = true;
    });
  },
  
  // Initialize for ThithuView feedback
  initForThithuView: function() {
    var feedbackContainers = document.querySelectorAll('.evaluation-criteria, .explanation-box, .feedback-card, .speaking-feedback-box, .feedback-text, .detailed-feedback');
    feedbackContainers.forEach(container => {
      // Skip if already initialized
      if (container._noteDragDropInitialized) return;
      
      this.initForContainer(container, {
        mode: 'thithu',
        section: 'ai_feedback'
      });
      container._noteDragDropInitialized = true;
    });
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', function() {
    NoteDragDrop.initAll();
  });
} else {
  NoteDragDrop.initAll();
}

// Also initialize after view changes (wait for App to be ready)
function setupNavigateHook() {
  if (window.App && window.App.navigate) {
    var originalNavigate = window.App.navigate;
    window.App.navigate = function(viewName) {
      originalNavigate.call(window.App, viewName);
      setTimeout(() => NoteDragDrop.initAll(), 300);
    };
  } else {
    // Retry after delay if App not ready yet
    setTimeout(setupNavigateHook, 100);
  }
}

// Start the hook setup
setupNavigateHook();
