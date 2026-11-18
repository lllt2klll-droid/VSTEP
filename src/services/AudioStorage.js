/* ==========================================================================
   AUDIO STORAGE - INDEXEDDB FOR SPEAKING AUDIO BLOBS
   Stores audio blobs persistently instead of temporary Blob URLs
   ========================================================================== */

window.AudioStorage = {
  DB_NAME: 'vstep_audio_db',
  DB_VERSION: 1,
  STORE_NAME: 'audio_blobs',
  db: null,

  // Initialize IndexedDB
  init: function() {
    return new Promise(function(resolve, reject) {
      var request = indexedDB.open(AudioStorage.DB_NAME, AudioStorage.DB_VERSION);
      
      request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
      
      request.onsuccess = function(event) {
        AudioStorage.db = event.target.result;
        console.log('AudioStorage IndexedDB initialized');
        resolve(AudioStorage.db);
      };
      
      request.onupgradeneeded = function(event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains(AudioStorage.STORE_NAME)) {
          db.createObjectStore(AudioStorage.STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  },

  // Save audio blob to IndexedDB
  saveAudio: function(id, blob) {
    return AudioStorage.init().then(function(db) {
      return new Promise(function(resolve, reject) {
        var transaction = db.transaction([AudioStorage.STORE_NAME], 'readwrite');
        var store = transaction.objectStore(AudioStorage.STORE_NAME);
        
        var record = {
          id: id,
          blob: blob,
          mimeType: blob.type,
          timestamp: Date.now()
        };
        
        var request = store.put(record);
        
        request.onsuccess = function() {
          console.log('Audio saved to IndexedDB:', id);
          resolve(id);
        };
        
        request.onerror = function(event) {
          console.error('Error saving audio:', event.target.error);
          reject(event.target.error);
        };
      });
    });
  },

  // Get audio blob from IndexedDB
  getAudio: function(id) {
    return AudioStorage.init().then(function(db) {
      return new Promise(function(resolve, reject) {
        var transaction = db.transaction([AudioStorage.STORE_NAME], 'readonly');
        var store = transaction.objectStore(AudioStorage.STORE_NAME);
        var request = store.get(id);
        
        request.onsuccess = function() {
          var record = request.result;
          if (record) {
            var audioUrl = URL.createObjectURL(record.blob);
            resolve({ audioUrl: audioUrl, blob: record.blob, mimeType: record.mimeType });
          } else {
            resolve(null);
          }
        };
        
        request.onerror = function(event) {
          console.error('Error getting audio:', event.target.error);
          reject(event.target.error);
        };
      });
    });
  },

  // Delete audio from IndexedDB
  deleteAudio: function(id) {
    return AudioStorage.init().then(function(db) {
      return new Promise(function(resolve, reject) {
        var transaction = db.transaction([AudioStorage.STORE_NAME], 'readwrite');
        var store = transaction.objectStore(AudioStorage.STORE_NAME);
        var request = store.delete(id);
        
        request.onsuccess = function() {
          console.log('Audio deleted from IndexedDB:', id);
          resolve();
        };
        
        request.onerror = function(event) {
          console.error('Error deleting audio:', event.target.error);
          reject(event.target.error);
        };
      });
    });
  },

  // Clear all audio blobs (for cleanup)
  clearAll: function() {
    return AudioStorage.init().then(function(db) {
      return new Promise(function(resolve, reject) {
        var transaction = db.transaction([AudioStorage.STORE_NAME], 'readwrite');
        var store = transaction.objectStore(AudioStorage.STORE_NAME);
        var request = store.clear();
        
        request.onsuccess = function() {
          console.log('All audio cleared from IndexedDB');
          resolve();
        };
        
        request.onerror = function(event) {
          console.error('Error clearing audio:', event.target.error);
          reject(event.target.error);
        };
      });
    });
  }
};
