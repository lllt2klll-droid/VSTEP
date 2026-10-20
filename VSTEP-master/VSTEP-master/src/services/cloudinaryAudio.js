/* ==========================================================================
   CLOUDINARY AUDIO SERVICE - Play VSTEP Listening audio from Cloudinary
   - Contains hardcoded Cloudinary URLs for all listening exercises
   - Replaces Google Drive service with direct Cloudinary streaming links
   ========================================================================== */
window.CloudinaryAudioService = {
  // Hardcoded Cloudinary URLs for all listening exercises
  _audioUrls: {
    // Part 1
    "Phần-1-Test-01.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308331/Ph%E1%BA%A7n-1-Test-01.mp3",
    "Phần-1-Test-02.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308334/Ph%E1%BA%A7n-1-Test-02.mp3",
    "Phần-1-Test-03.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308331/Ph%E1%BA%A7n-1-Test-03.mp3",
    "Phần-1-Test-04.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308331/Ph%E1%BA%A7n-1-Test-04.mp3",
    "Phần-1-Test-05.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308333/Ph%E1%BA%A7n-1-Test-05.mp3",
    "Phần-1-Test-06.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308334/Ph%E1%BA%A7n-1-Test-06.mp3",
    "Phần-1-Test-07.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308331/Ph%E1%BA%A7n-1-Test-07.mp3",
    "Phần-1-Test-08.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308333/Ph%E1%BA%A7n-1-Test-08.mp3",
    "Phần-1-Test-09.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308331/Ph%E1%BA%A7n-1-Test-09.mp3",
    "Phần-1-Test-10.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308334/Ph%E1%BA%A7n-1-Test-10.mp3",
    "Phần-1-Test-11.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308335/Ph%E1%BA%A7n-1-Test-11.mp3",
    "Phần-1-Test-12.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308331/Ph%E1%BA%A7n-1-Test-12.mp3",
    
    // Part 2
    "Phần 2 Test 01.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308336/Ph%E1%BA%A7n_2_Test_01.mp3",
    "Phần 2 Test 02.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308339/Ph%E1%BA%A7n_2_Test_02.mp3",
    "Phần 2 Test 03.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308344/Ph%E1%BA%A7n_2_Test_03.mp3",
    "Phần 2 Test 04.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308348/Ph%E1%BA%A7n_2_Test_04.mp3",
    "Phần 2 Test 05.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308336/Ph%E1%BA%A7n_2_Test_05.mp3",
    "Phần 2 Test 06.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308351/Ph%E1%BA%A7n_2_Test_06.mp3",
    "Phần 2 Test 07.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308339/Ph%E1%BA%A7n_2_Test_07.mp3",
    "Phần 2 Test 08.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308348/Ph%E1%BA%A7n_2_Test_08.mp3",
    "Phần 2 Test 09.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308339/Ph%E1%BA%A7n_2_Test_09.mp3",
    "Phần 2 Test 10.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308335/Ph%E1%BA%A7n_2_Test_10.mp3",
    "Phần 2 Test 11.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308338/Ph%E1%BA%A7n_2_Test_11.mp3",
    "Phần 2 Test 12.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308342/Ph%E1%BA%A7n_2_Test_12.mp3",
    "Phần 2 Test 13.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308347/Ph%E1%BA%A7n_2_Test_13.mp3",
    "Phần 2 Test 14.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308340/Ph%E1%BA%A7n_2_Test_14.mp3",
    "Phần 2 Test 15.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308351/Ph%E1%BA%A7n_2_Test_15.mp3",
    "Phần 2 Test 16.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308342/Ph%E1%BA%A7n_2_Test_16.mp3",
    "Phần 2 Test 17.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308337/Ph%E1%BA%A7n_2_Test_17.mp3",
    "Phần 2 Test 18.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308347/Ph%E1%BA%A7n_2_Test_18.mp3",
    "Phần 2 Test 19.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308343/Ph%E1%BA%A7n_2_Test_19.mp3",
    "Phần 2 Test 20.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308344/Ph%E1%BA%A7n_2_Test_20.mp3",
    "Phần 2 Test 21.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308347/Ph%E1%BA%A7n_2_Test_21.mp3",
    "Phần 2 Test 22.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308351/Ph%E1%BA%A7n_2_Test_22.mp3",
    "Phần 2 Test 23.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308339/Ph%E1%BA%A7n_2_Test_23.mp3",
    "Phần 2 Test 24.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308346/Ph%E1%BA%A7n_2_Test_24.mp3",
    "Phần 2 Test 25.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308336/Ph%E1%BA%A7n_2_Test_25.mp3",
    "Phần 2 Test 26.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308345/Ph%E1%BA%A7n_2_Test_26.mp3",
    "Phần 2 Test 27.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308341/Ph%E1%BA%A7n_2_Test_27.mp3",
    "Phần 2 Test 28.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308349/Ph%E1%BA%A7n_2_Test_28.mp3",
    "Phần 2 Test 29.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308338/Ph%E1%BA%A7n_2_Test_29.mp3",
    "Phần 2 Test 30.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308339/Ph%E1%BA%A7n_2_Test_30.mp3",
    "Phần 2 Test 31.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308349/Ph%E1%BA%A7n_2_Test_31.mp3",
    "Phần 2 Test 32.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308350/Ph%E1%BA%A7n_2_Test_32.mp3",
    "Phần 2 Test 33.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308337/Ph%E1%BA%A7n_2_Test_33.mp3",
    "Phần 2 Test 34.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308342/Ph%E1%BA%A7n_2_Test_34.mp3",
    "Phần 2 Test 35.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308346/Ph%E1%BA%A7n_2_Test_35.mp3",
    "Phần 2 Test 36.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308341/Ph%E1%BA%A7n_2_Test_36.mp3",
    "Phần 2 Test 37.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308345/Ph%E1%BA%A7n_2_Test_37.mp3",
    
    // Part 3
    "Phần 3 Test 01.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308352/Ph%E1%BA%A7n_3_Test_01.mp3",
    "Phần 3 Test 02.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308352/Ph%E1%BA%A7n_3_Test_02.mp3",
    "Phần 3 Test 03.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308391/Ph%E1%BA%A7n_3_Test_03.mp3",
    "Phần 3 Test 04.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308389/Ph%E1%BA%A7n_3_Test_04.mp3",
    "Phần 3 Test 05.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308358/Ph%E1%BA%A7n_3_Test_05.mp3",
    "Phần 3 Test 06.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308354/Ph%E1%BA%A7n_3_Test_06.mp3",
    "Phần 3 Test 07.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308356/Ph%E1%BA%A7n_3_Test_07.mp3",
    "Phần 3 Test 08.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308386/Ph%E1%BA%A7n_3_Test_08.mp3",
    "Phần 3 Test 09.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308395/Ph%E1%BA%A7n_3_Test_09.mp3",
    "Phần 3 Test 10.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308357/Ph%E1%BA%A7n_3_Test_10.mp3",
    "Phần 3 Test 11.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308393/Ph%E1%BA%A7n_3_Test_11.mp3",
    "Phần 3 Test 12.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308384/Ph%E1%BA%A7n_3_Test_12.mp3",
    "Phần 3 Test 13.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308356/Ph%E1%BA%A7n_3_Test_13.mp3",
    "Phần 3 Test 14.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308384/Ph%E1%BA%A7n_3_Test_14.mp3",
    "Phần 3 Test 15.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308388/Ph%E1%BA%A7n_3_Test_15.mp3",
    "Phần 3 Test 16.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308384/Ph%E1%BA%A7n_3_Test_16.mp3",
    "Phần 3 Test 17.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308353/Ph%E1%BA%A7n_3_Test_17.mp3",
    "Phần 3 Test 18.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308353/Ph%E1%BA%A7n_3_Test_18.mp3",
    "Phần 3 Test 19.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308391/Ph%E1%BA%A7n_3_Test_19.mp3",
    "Phần 3 Test 20.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308385/Ph%E1%BA%A7n_3_Test_20.mp3",
    "Phần 3 Test 21.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308357/Ph%E1%BA%A7n_3_Test_21.mp3",
    "Phần 3 Test 22.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308384/Ph%E1%BA%A7n_3_Test_22.mp3",
    "Phần 3 Test 23.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308392/Ph%E1%BA%A7n_3_Test_23.mp3",
    "Phần 3 Test 24.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308390/Ph%E1%BA%A7n_3_Test_24.mp3",
    "Phần 3 Test 25.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308387/Ph%E1%BA%A7n_3_Test_25.mp3",
    "Phần 3 Test 26.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308395/Ph%E1%BA%A7n_3_Test_26.mp3",
    "Phần 3 Test 27.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308386/Ph%E1%BA%A7n_3_Test_27.mp3",
    "Phần 3 Test 28.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308355/Ph%E1%BA%A7n_3_Test_28.mp3",
    "Phần 3 Test 29.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308394/Ph%E1%BA%A7n_3_Test_29.mp3",
    "Phần 3 Test 30.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308395/Ph%E1%BA%A7n_3_Test_30.mp3",
    "Phần 3 Test 31.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308393/Ph%E1%BA%A7n_3_Test_31.mp3",
    "Phần 3 Test 32.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308356/Ph%E1%BA%A7n_3_Test_32.mp3",
    "Phần 3 Test 33.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308389/Ph%E1%BA%A7n_3_Test_33.mp3",
    "Phần 3 Test 34.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308388/Ph%E1%BA%A7n_3_Test_34.mp3",
    "Phần 3 Test 35.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308354/Ph%E1%BA%A7n_3_Test_35.mp3",
    "Phần 3 Test 36.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308390/Ph%E1%BA%A7n_3_Test_36.mp3",
    "Phần 3 Test 37.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308388/Ph%E1%BA%A7n_3_Test_37.mp3",
    "Phần 3 Test 38.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308385/Ph%E1%BA%A7n_3_Test_38.mp3",
    "Phần 3 Test 39.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308392/Ph%E1%BA%A7n_3_Test_39.mp3",
    "Phần 3 Test 40.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308352/Ph%E1%BA%A7n_3_Test_40.mp3",
    "Phần 3 Test 41.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787308386/Ph%E1%BA%A7n_3_Test_41.mp3",
    
    // Complete Test Audio Files (for practice tests)
    "vstep-test-1.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417714/vstep-test-1.mp3",
    "vstep-test-2.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417713/vstep-test-2.mp3",
    "vstep-test-3.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417712/vstep-test-3.mp3",
    "vstep-test-4.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417712/vstep-test-4.mp3",
    "vstep-test-5.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417712/vstep-test-5.mp3",
    "vstep-test-6.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417712/vstep-test-6.mp3",
    "vstep-test-7.mp3": "https://res.cloudinary.com/dynttd69/video/upload/v1787417712/vstep-test-7.mp3"
  },

  // Normalize file name for matching
  _normalize: function (name) {
    if (!name) return "";
    try {
      return name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/\.[^/.]+$/, "") // remove extension
        .replace(/[^a-z0-9]/g, ""); // keep only alphanum for fuzzy match
    } catch(e){ return name.toLowerCase(); }
  },

  // Build normalized map for easy lookup
  _buildMap: function () {
    var map = {};
    var self = this;
    for (var k in this._audioUrls) {
      var url = this._audioUrls[k];
      map[k] = url;
      map[k.toLowerCase()] = url;
      var norm = self._normalize(k);
      if (!map[norm]) map[norm] = url;
      // Also map by just filename without path
      var fname = k.split("/").pop();
      if (fname) {
        var nk = self._normalize(fname);
        if (!map[nk]) map[nk] = url;
      }
    }
    return map;
  },

  _cache: null,

  // Get the Cloudinary URL for a given local path
  resolveCloudinaryUrl: function (localPath) {
    if (!this._cache) {
      this._cache = this._buildMap();
    }
    
    if (!localPath) return null;
    
    var filename = localPath.split("/").pop(); // "Phần-1-Test-01.mp3"
    var decoded = "";
    try { decoded = decodeURIComponent(filename); } catch(e){ decoded = filename; }

    console.log("[CloudinaryAudio] Resolving:", localPath, "filename:", filename, "decoded:", decoded);

    // Try exact match first (case-insensitive)
    var lowerDecoded = decoded.toLowerCase();
    for (var k in this._cache) {
      if (k.toLowerCase() === lowerDecoded) {
        console.log("[CloudinaryAudio] Exact match found:", k);
        return this._cache[k];
      }
    }
    
    // Try exact normalized match
    var key = this._normalize(decoded);
    console.log("[CloudinaryAudio] Normalized key:", key, "found:", !!this._cache[key]);
    if (this._cache[key]) return this._cache[key];
    
    // Try without extension
    var keyNoExt = this._normalize(decoded.replace(/\.[^/.]+$/, ""));
    console.log("[CloudinaryAudio] Key without extension:", keyNoExt, "found:", !!this._cache[keyNoExt]);
    if (this._cache[keyNoExt]) return this._cache[keyNoExt];
    
    // Try fuzzy: find any key that contains the test number
    var numMatch = decoded.match(/Test[^\d]*(\d+)/i) || decoded.match(/(\d+)\.mp3$/i);
    var num = numMatch ? numMatch[1] : null;
    console.log("[CloudinaryAudio] Extracted test number:", num);
    if (num) {
      var padded = ("0" + num).slice(-2);
      for (var k in this._cache) {
        if (k.indexOf("test" + num) >= 0 || k.indexOf("test" + padded) >= 0) {
          // Also check part number if possible
          var partMatch = localPath.match(/LISTENING-P(\d)/i);
          var part = partMatch ? partMatch[1] : null;
          console.log("[CloudinaryAudio] Found test number match:", k, "part:", part);
          if (part && k.indexOf("phan" + part) >= 0) {
            return this._cache[k];
          }
          // Fallback to first match with test number
          return this._cache[k];
        }
      }
    }
    
    // Last resort: try to find by filename substring
    for (var k2 in this._cache) {
      if (k2.indexOf(lowerDecoded.split(".")[0].toLowerCase().substring(0, 8)) >= 0) {
        console.log("[CloudinaryAudio] Substring match:", k2);
        return this._cache[k2];
      }
    }
    
    console.warn("[CloudinaryAudio] No match found for:", localPath);
    return null;
  }
};