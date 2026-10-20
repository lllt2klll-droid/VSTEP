/* ==========================================================================
   DRIVE AUDIO SERVICE - Play VSTEP Listening audio directly from Google Drive
   Folder: https://drive.google.com/drive/folders/1bmQuEXzx6Lv5z0ogczFEKPOe3S0MRJ6s
   - Converts local `listenning/...` paths to Drive direct streaming links
   - Falls back to local file if Drive fetch fails or offline
   ========================================================================== */
window.DriveAudioService = {
  folderId: "1bmQuEXzx6Lv5z0ogczFEKPOe3S0MRJ6s",
  // Hardcoded map from Drive folder 1bmQuEXzx6Lv5z0ogczFEKPOe3S0MRJ6s (90 files, extracted 2026-08-21)
  // This avoids CORS fetch at runtime; folder is https://drive.google.com/drive/folders/1bmQuEXzx6Lv5z0ogczFEKPOe3S0MRJ6s?usp=drive_link
  _hardcoded: {
    "P1_Phần-1-Test-01.mp3": "15VY51kLdC0G1rKjtp37w7WE7Deqr3d1t",
    "P1_Phần-1-Test-02.mp3": "13z1QlbXTFScso5uc9DDFI13o1NNdUd_V",
    "P1_Phần-1-Test-03.mp3": "1pu4GUjwIFvzG02_J6V7GwSYhabFmbGin",
    "P1_Phần-1-Test-04.mp3": "1aWbrBrv1LQLiI8VCnl6D_byNUrwwRBAb",
    "P1_Phần-1-Test-05.mp3": "1ab8FJG69-6qD1ogYlLSPew-4Mo9Vr-SO",
    "P1_Phần-1-Test-06.mp3": "1v5H3ySNho4Jx7mPehh8qMB7Rq8FAOs34",
    "P1_Phần-1-Test-07.mp3": "1rqFQ9akJMn_oTRfPMDAplXNQBFiNqmVj",
    "P1_Phần-1-Test-08.mp3": "17O8GmMoQjdGtVEey5KDuHKbf9Glte5iu",
    "P1_Phần-1-Test-09.mp3": "1F_7YpfEsXBiYz91TjRrJPHyDgI3_l0qr",
    "P1_Phần-1-Test-10.mp3": "1RnariBUZI5LAmm3wdtAXMa6DOfSs5WFL",
    "P1_Phần-1-Test-11.mp3": "152OhptcY24m9Evmorm0R2WGdMT_70sRe",
    "P1_Phần-1-Test-12.mp3": "1ZMgL0RlkyGKQQz_8G1k4j0HAJTgzTyUg",
    "P2_Phần 2 Test 01.mp3": "1_J5nHP8AgMNTxLMh4eP_6MMRq9Ga5mwb",
    "P2_Phần 2 Test 02.mp3": "1h6jPT9mCY3FPigjZDks37hoYlQ2vLq64",
    "P2_Phần 2 Test 03.mp3": "1PCQjVH0ehp3r_L-xINd_lw5fzpFMz1G-",
    "P2_Phần 2 Test 04.mp3": "1oTioXRJdDzFZT7DaSZCM4P6uqc7hL8Px",
    "P2_Phần 2 Test 05.mp3": "1F5VHERzXDNEzo4J66QnBlmKe0d5t_m6C",
    "P2_Phần 2 Test 06.mp3": "1S_gt-bZlFML7qGl2ROvthjCq33eDiDrV",
    "P2_Phần 2 Test 07.mp3": "17XoJ2jUVZLLEJQGoJkuCMJr6LhFl8CyC",
    "P2_Phần 2 Test 08.mp3": "1tRAFd7jCxqIZi7kBzKU8-faFrljNQ_Kn",
    "P2_Phần 2 Test 09.mp3": "1ie8asAil7Hf9jQLKtMhdiZsmOWMUZVC8",
    "P2_Phần 2 Test 10.mp3": "12PkhbS4ysPiGh32jTt7vJsLnBFpevC7t",
    "P2_Phần 2 Test 11.mp3": "1HIF1X0p49Ma-dWtNgRqibpsFr77KRzx1",
    "P2_Phần 2 Test 12.mp3": "1cXvqiruKtQu78EkqJSW1WJ2s1LlikFFs",
    "P2_Phần 2 Test 13.mp3": "17DhYyOdSscNym-osBBXlzjo3reAK1LM6",
    "P2_Phần 2 Test 14.mp3": "1Fu9YzP4oIsfIkZdBPNKpBrIqcMR05dbl",
    "P2_Phần 2 Test 15.mp3": "1ymp1QkY_Mntp7aoH7eNC7sesR93y_KbO",
    "P2_Phần 2 Test 16.mp3": "1tazBtez0taZMksWoa7GpzYyJs23mGK8Y",
    "P2_Phần 2 Test 17.mp3": "1fOcdXFbHhEuVLkrw5iYuoFtcmlRMkx28",
    "P2_Phần 2 Test 18.mp3": "1kH6RZLCjb3RyLe23vpKlovmmmIsSgBW4",
    "P2_Phần 2 Test 19.mp3": "1T7ghaMX9g4fxMeswZt0VBUojKf4j1bqS",
    "P2_Phần 2 Test 20.mp3": "1Qh7zwV4P3c81KKNe2RQdbAJH5l5RNQ-P",
    "P2_Phần 2 Test 21.mp3": "1bVmv0F87Q7gL5o2pQ1cg2HrQk8Dt5nGa",
    "P2_Phần 2 Test 22.mp3": "1ZIXU0GyYlGA9w13FQi94BbJPtEDVuyfe",
    "P2_Phần 2 Test 23.mp3": "1pcCgusaM8DiOl53jPOlQ4wLNnhnlmnx-",
    "P2_Phần 2 Test 24.mp3": "1Z2CfWjk_G8siQzpAwdXkROUr7OLKEGuy",
    "P2_Phần 2 Test 25.mp3": "1mPNwy6Jjk2jjjyIq32bX0BzDa9M2t82Z",
    "P2_Phần 2 Test 26.mp3": "1nVpo34vduhKs9iZPUM0ATuu77wgQFOnb",
    "P2_Phần 2 Test 27.mp3": "1tt9TLDDHrV8EXwu-jxvwmJlizqgyTkTD",
    "P2_Phần 2 Test 28.mp3": "15nfLShzz3QYEbCILtolpD9G_hLFh5aR_",
    "P2_Phần 2 Test 29.mp3": "1I-OlZVkauSf-YF-y82HXSAgXMfB4EMB0",
    "P2_Phần 2 Test 30.mp3": "1oAqMJCzC9EPefbuep-uZspjBaZxTNswe",
    "P2_Phần 2 Test 31.mp3": "1nk_PACi7mKuVt-JSO7ETThlWuTmUMQ_z",
    "P2_Phần 2 Test 32.mp3": "1CSsjJc74OGkTBqlyaEEaxI11G-KD-5I9",
    "P2_Phần 2 Test 33.mp3": "1lE8MKMQiH2mJE8m1dLiDR42YE_j3DHzy",
    "P2_Phần 2 Test 34.mp3": "1qARoOICoets6O6jxAhaTmJscxBRjLWX3",
    "P2_Phần 2 Test 35.mp3": "1Dd2gSHZsCCdMKWkIze8RCfccQoYwO3TL",
    "P2_Phần 2 Test 36.mp3": "1j8SBQr0Ks8mRglZ2vIDnTnf6_QPKheyQ",
    "P2_Phần 2 Test 37.mp3": "18jfq6jJiND0UeQBGfjR8cyHNpd8tuR78",
    "P3_Phần 3 Test 01.mp3": "1Oes7UnqxGmD40__gEHtJzpnqTcoPalEp",
    "P3_Phần 3 Test 02.mp3": "10ukVD4LvdtG81Ge87NPYTC_AHjweu_eZ",
    "P3_Phần 3 Test 03.mp3": "1rrK7JPSBDNdS4OYCUaOcES-rVUYmDyqW",
    "P3_Phần 3 Test 04.mp3": "13b5tlK4z-XW4aie6wZDYlnGxTpaWtqDo",
    "P3_Phần 3 Test 05.mp3": "1czdLx-59QtrNc0qbE7zl__khIuXaT96g",
    "P3_Phần 3 Test 06.mp3": "1rSBl_ZqgPwNmGE7XiUv7McZhJwXqMXef",
    "P3_Phần 3 Test 07.mp3": "15MdYsD86GmpGZioMfZ-nAdsKIHDTe8JG",
    "P3_Phần 3 Test 08.mp3": "1caNVqxfRePlhAhK8HRFyYeJ6aS7hW6JM",
    "P3_Phần 3 Test 09.mp3": "1yDehU74HNehc1GtplhcU6GbNV_T38Iw_",
    "P3_Phần 3 Test 10.mp3": "1J-YFbw2pv7Sq02qtM4wbnmu2h_WW9lbG",
    "P3_Phần 3 Test 11.mp3": "1lE8ciVrj7aIi06VQtE8f5LH6a45GxIjF",
    "P3_Phần 3 Test 12.mp3": "1GSOz52CT2vcnFgGpafHw6lxKA9H9ZWdH",
    "P3_Phần 3 Test 13.mp3": "1Y-E_jiisOfRG4hqdNsw_weZGPb8c9_TE",
    "P3_Phần 3 Test 14.mp3": "1V9JCU8RwfOuGVGzL-k1aRvC8nZ6gzKBh",
    "P3_Phần 3 Test 15.mp3": "127D2yaShEPDpqordlGzAOS48s9YNzRI5",
    "P3_Phần 3 Test 16.mp3": "1w58dhO_qNOI5fZQE0-aV6TE5TXLKUnX2",
    "P3_Phần 3 Test 17.mp3": "1r_AxxfXkzaAp5tT7gDLK5WupcHz2vL2u",
    "P3_Phần 3 Test 18.mp3": "1kl8Ii8kxm_Br7AAXzHDMZAQcOElEqL2t",
    "P3_Phần 3 Test 19.mp3": "1iK5mGYSX0KhOBO3q7zLjiuRs1T9B-P6w",
    "P3_Phần 3 Test 20.mp3": "1bLNA14O5Z5HK5aFVMlcLXiqNpZCLfCR3",
    "P3_Phần 3 Test 21.mp3": "1oqMwamURd5O_Y10rs28WHXgALbEV56CZ",
    "P3_Phần 3 Test 22.mp3": "186tXhAFq162vfIhMTmyEdjm9i0Jj3C5z",
    "P3_Phần 3 Test 23.mp3": "1ODQHBLLEFI3lGXfdp7kvZnElzmo4s8iT",
    "P3_Phần 3 Test 24.mp3": "11n_gQVm-n33AlGlfviDkzKJqZbVJyNy7",
    "P3_Phần 3 Test 25.mp3": "1_jdl49RWEjkYWPtD9sCAb6WgO3PHd6Us",
    "P3_Phần 3 Test 26.mp3": "1AA3llgIh1QHBf6DrMoxQiZsBipqCbcst",
    "P3_Phần 3 Test 27.mp3": "1K6u5kyAJ2bHIn1f8xxKnA_LDvSVXtxci",
    "P3_Phần 3 Test 28.mp3": "18DdH_q7eWb8sN9P3WQW9C9EiF7VRezmK",
    "P3_Phần 3 Test 29.mp3": "1gJhLj8I-fjhuB-uyqzI9l1dUg8pYOBqt",
    "P3_Phần 3 Test 30.mp3": "1hl9xEOdtQXFdgiX3XZlu02hhtvVHD1WB",
    "P3_Phần 3 Test 31.mp3": "1Z2Z0rnuGL9V36otdioMTIwRjc1C4-Ndd",
    "P3_Phần 3 Test 32.mp3": "1wAlx5XJfUPlJfAnbTaSqMxn5RcAc9ZCy",
    "P3_Phần 3 Test 33.mp3": "1rbNPWzxzoRXn9Zh9TtVr-dGnkMRtb4yA",
    "P3_Phần 3 Test 34.mp3": "1yLTZMSAGCqgH0-gOjY9lNAJ5rBLD5bNt",
    "P3_Phần 3 Test 35.mp3": "1v6qADQ-o1rluopM0Ijrn99BW-4vqu7hD",
    "P3_Phần 3 Test 36.mp3": "1A33F9X2B7ogEad_gUl884Yayi2Oc_5yA",
    "P3_Phần 3 Test 37.mp3": "1tdGsCiwJa5CnqfVu4jktVbOvGKyWyyoY",
    "P3_Phần 3 Test 38.mp3": "1NBf2WujaYRPVcWvWsCuqcss6g2ptQUlO",
    "P3_Phần 3 Test 39.mp3": "19fFiMhVlNTVNRdy1wRytZU7ifG34rAIE",
    "P3_Phần 3 Test 40.mp3": "1AyE44CHEj5izOJ6hT6fskk9CcRK5b9rT",
    "P3_Phần 3 Test 41.mp3": "1lphXTAHDcTN1k_i3DFE1FoXw5OUKM-GZ"
  },
  // Cache: filename (lowercase, no accent) -> {id, name, directLink}
  _cache: null,
  _cachePromise: null,
  _useDrive: true, // toggle to false to force local

  setUseDrive: function (use) {
    this._useDrive = !!use;
    try { localStorage.setItem("vstep_use_drive_audio", this._useDrive ? "1" : "0"); } catch(e){}
  },
  isUseDrive: function () {
    try {
      var v = localStorage.getItem("vstep_use_drive_audio");
      if (v !== null) return v === "1";
    } catch(e){}
    return this._useDrive;
  },

  // BUG #1 FIX: toStreamLink phải trả về UC link trực tiếp, không phải HTML view
  // Link view?usp=sharing trỏ tới trang HTML, <audio> không đọc được
  toDirectLink: function (fileId) {
    return "https://drive.google.com/uc?export=download&id=" + fileId;
  },
  toStreamLink: function (fileId) {
    // Trả về link UC để trình duyệt có thể stream trực tiếp MP3
    return "https://drive.google.com/uc?export=download&id=" + fileId;
  },
  // Download link via drive.usercontent (dùng cho fetch blob bypass CORP)
  toDownloadLink: function (fileId) {
    return "https://drive.usercontent.google.com/download?id=" + fileId + "&export=download";
  },
  toDownloadLinkConfirm: function (fileId) {
    return "https://drive.usercontent.google.com/download?id=" + fileId + "&export=download&confirm=t";
  },
  toUcLink: function (fileId) {
    return "https://drive.google.com/uc?export=download&id=" + fileId + "&confirm=t";
  },
  // Sharing link format user requested: https://drive.google.com/file/d/FILEID/view?usp=sharing
  toSharingLink: function (fileId) {
    return "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";
  },
  // Alternative preview link that works even when download is blocked (iframe)
  toPreviewLink: function (fileId) {
    return "https://drive.google.com/file/d/" + fileId + "/preview";
  },
  getFallbackUrls: function (fileId) {
    // Fallback cho <audio> - phải là UC/download, không phải sharing HTML
    return [
      this.toStreamLink(fileId),
      this.toDownloadLink(fileId),
      this.toUcLink(fileId)
    ];
  },

  // Normalize file name for matching: lowercase, remove accents, remove extension
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

  // Fetch file list - now uses hardcoded map from https://drive.google.com/drive/folders/1bmQuEXzx6Lv5z0ogczFEKPOe3S0MRJ6s?usp=drive_link
  // Hardcoded avoids CORS fetch; falls back to network fetch if needed
  _buildHardcodedMap: function () {
    var map = {};
    var self = this;
    for (var k in this._hardcoded) {
      var id = this._hardcoded[k];
      // k is like "P1_Phần-1-Test-01.mp3", keep original and normalized
      var direct = self.toStreamLink(id);
      map[k] = { id: id, name: k.split("_").slice(1).join("_") || k, directLink: direct };
      map[k.toLowerCase()] = map[k];
      var norm = self._normalize(k.split("_").slice(1).join("_") || k);
      if (!map[norm]) map[norm] = map[k];
      // Also map by just filename
      var fname = k.split("_").slice(1).join("_");
      if (fname) {
        var nk = self._normalize(fname);
        if (!map[nk]) map[nk] = map[k];
      }
    }
    return map;
  },
  fetchFileList: function () {
    if (this._cache) return Promise.resolve(this._cache);
    if (this._cachePromise) return this._cachePromise;
    var self = this;
    // If hardcoded map exists (90 files), use it instantly - no network needed
    if (this._hardcoded && Object.keys(this._hardcoded).length > 0) {
      var hardMap = this._buildHardcodedMap();
      // Also add normalized keys for local path matching
      this._cache = hardMap;
      console.log("[DriveAudio] Using hardcoded Drive map (" + Object.keys(this._hardcoded).length + " files) - no CORS fetch needed. Folder: https://drive.google.com/drive/folders/" + this.folderId);
      return Promise.resolve(hardMap);
    }
    var folderUrl = "https://drive.google.com/drive/folders/" + this.folderId;
    var proxiedUrl = "https://corsproxy.io/?" + encodeURIComponent(folderUrl);

    function parseHtmlToMap(html, map) {
      var re = /"id"\s*:\s*"([a-zA-Z0-9_-]{20,})"[^}]*?"title"\s*:\s*"([^"]+)"/g;
      var m, count = 0;
      while ((m = re.exec(html)) !== null) {
        var id = m[1];
        var title = m[2];
        if (/\.(mp3|m4a|wav|ogg|mp4)$/i.test(title) || title.indexOf("Test") >= 0 || title.indexOf("Phan") >= 0) {
          var key = self._normalize(title);
          if (!map[key]) {
            map[key] = { id: id, name: title, directLink: self.toStreamLink(id) };
            count++;
          }
          var key2 = title.toLowerCase();
          if (!map[key2]) map[key2] = map[key];
        }
      }
      var re2 = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{20,})/g;
      while ((m = re2.exec(html)) !== null) {
        var id2 = m[1];
        var near = html.substring(Math.max(0, m.index - 500), m.index + 500);
        var titleMatch = near.match(/"title"\s*:\s*"([^"]+)"/);
        if (titleMatch) {
          var t2 = titleMatch[1];
          var k = self._normalize(t2);
          if (!map[k]) {
            map[k] = { id: id2, name: t2, directLink: self.toStreamLink(id2) };
            count++;
          }
        }
      }
      return count;
    }

    function fetchFolder(folderId) {
      var url = "https://corsproxy.io/?" + encodeURIComponent("https://drive.google.com/drive/folders/" + folderId);
      return fetch(url, { cache: "no-store" }).then(function(r){ return r.text(); });
    }

    this._cachePromise = fetchFolder(this.folderId)
      .then(function (html) {
        var map = {};
        var count = parseHtmlToMap(html, map);
        // Find subfolder IDs in the same HTML (folders have mimeType application/vnd.google-apps.folder)
        var folderRe = /"id"\s*:\s*"([a-zA-Z0-9_-]{20,})"[^}]*?"mimeType"\s*:\s*"application\/vnd\.google-apps\.folder"/g;
        var m, folderIds = [];
        while ((m = folderRe.exec(html)) !== null) {
          folderIds.push(m[1]);
        }
        // Also try generic folder links
        var linkRe = /drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]{20,})/g;
        while ((m = linkRe.exec(html)) !== null) {
          if (m[1] !== self.folderId && folderIds.indexOf(m[1]) === -1) folderIds.push(m[1]);
        }
        if (folderIds.length === 0) {
          console.log("[DriveAudio] No subfolders found, using top folder only. Parsed " + count + " files");
          self._cache = map;
          return map;
        }
        console.log("[DriveAudio] Found " + folderIds.length + " subfolders, fetching...");
        // Fetch each subfolder in parallel (limit 6 at a time to avoid rate limit)
        var promises = folderIds.slice(0, 8).map(function (fid) {
          return fetchFolder(fid).then(function (subHtml) {
            var c = parseHtmlToMap(subHtml, map);
            console.log("[DriveAudio] Subfolder " + fid + " -> " + c + " files");
            return c;
          }).catch(function(){ return 0; });
        });
        return Promise.all(promises).then(function(){
          console.log("[DriveAudio] Total parsed " + Object.keys(map).length + " entries (including subfolders)");
          self._cache = map;
          return map;
        });
      })
      .then(function (map) {
        if (!map || Object.keys(map).length === 0) {
          console.warn("[DriveAudio] No files parsed from Drive folder page, will use local audio. Make sure folder is public 'Anyone with link can view'.");
          self._cache = map || {};
        }
        return self._cache;
      })
      .catch(function (err) {
        console.warn("[DriveAudio] Failed to fetch Drive folder (CORS or network). Falling back to local audio. Error:", err);
        self._cache = {};
        return {};
      });

    return this._cachePromise;
  },

  // Try to find Drive file for a given local path like "listenning/LISTENING-P1/Phần-1-Test-01.mp3"
  // Returns Promise that resolves to directLink or null (fallback to local)
  resolveDriveUrl: function (localPath) {
    var self = this;
    if (!this.isUseDrive() || !localPath || localPath.indexOf("listenning") !== 0) {
      return Promise.resolve(null);
    }
    var filename = localPath.split("/").pop(); // "Phần-1-Test-01.mp3"
    var decoded = "";
    try { decoded = decodeURIComponent(filename); } catch(e){ decoded = filename; }

    return this.fetchFileList().then(function (map) {
      if (!map || Object.keys(map).length === 0) return null;
      // Try exact normalized match
      var key = self._normalize(decoded);
      if (map[key]) return map[key].directLink;
      // Try without extension
      var keyNoExt = self._normalize(decoded.replace(/\.[^/.]+$/, ""));
      if (map[keyNoExt]) return map[keyNoExt].directLink;
      // Try fuzzy: find any key that contains the test number
      // e.g., local "Phan-1-Test-01" -> drive "Phần 1 Test 01" or "P1-Test01"
      var numMatch = decoded.match(/Test[^\d]*(\d+)/i) || decoded.match(/(\d+)\.mp3$/i);
      var num = numMatch ? numMatch[1] : null;
      if (num) {
        var padded = ("0" + num).slice(-2);
        for (var k in map) {
          if (k.indexOf("test" + num) >= 0 || k.indexOf("test" + padded) >= 0) {
            // Also check part number if possible
            var partMatch = localPath.match(/LISTENING-P(\d)/i);
            var part = partMatch ? partMatch[1] : null;
            if (part && map[k].name && map[k].name.indexOf("P" + part) >= 0) {
              return map[k].directLink;
            }
            // Fallback to first match with test number
            return map[k].directLink;
          }
        }
      }
      // Last resort: try to find by filename substring
      var lowerDecoded = decoded.toLowerCase();
      for (var k2 in map) {
        if (map[k2].name && map[k2].name.toLowerCase().indexOf(lowerDecoded.split(".")[0].toLowerCase().substring(0, 8)) >= 0) {
          return map[k2].directLink;
        }
      }
      return null;
    });
  },

  // Synchronous helper: if fileId is already known (user pasted drive link), use it directly
  // Example: https://drive.google.com/file/d/1ABCxyz/view?usp=sharing -> extracts 1ABCxyz
  extractFileId: function (driveLink) {
    if (!driveLink) return null;
    var m = driveLink.match(/\/d\/([a-zA-Z0-9_-]{20,})|\/folders\/([a-zA-Z0-9_-]{20,})|id=([a-zA-Z0-9_-]{20,})/);
    if (m) return m[1] || m[2] || m[3];
    return null;
  },

  // New direct mode: fetch Drive file as Blob and set as ObjectURL - bypasses CORP same-site & attachment blocking
  // Drive's drive.usercontent returns Access-Control-Allow-Origin:* (allows fetch from file://) but CORP same-site blocks <audio src>
  // Fetch+Blob fixes it. This is still "direct Drive" (no proxy), just via JS fetch.
  _blobCache: {}, // fileId -> blobUrl
  _fetchController: null,
  fetchToBlobUrl: function (fileId, onProgress) {
    var self = this;
    if (self._blobCache[fileId]) {
      return Promise.resolve(self._blobCache[fileId]);
    }
    // Use download link for blob fetch (sharing view returns HTML, not audio)
    var url = self.toDownloadLink(fileId);
    console.log("[DriveAudio] Fetching Drive file as blob (direct):", url);
    // Abort previous fetch if any
    if (self._fetchController) try { self._fetchController.abort(); } catch(e){}
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    self._fetchController = controller;
    var fetchOpts = { cache: "default" };
    if (controller) fetchOpts.signal = controller.signal;
    return fetch(url, fetchOpts).then(function (res) {
      if (!res.ok) throw new Error("Drive fetch failed: " + res.status + " " + res.statusText);
      // If response is HTML (login page) instead of audio, detect
      var ct = res.headers.get("content-type") || "";
      if (ct.indexOf("text/html") >= 0) throw new Error("Drive returned HTML (not public). Check 'Anyone with link' permission.");
      return res.blob();
    }).then(function (blob) {
      var blobUrl = URL.createObjectURL(blob);
      self._blobCache[fileId] = blobUrl;
      console.log("[DriveAudio] Blob URL created for", fileId, "size", blob.size, "type", blob.type);
      return blobUrl;
    });
  },
  revokeBlobUrl: function (fileId) {
    if (fileId && this._blobCache[fileId]) {
      try { URL.revokeObjectURL(this._blobCache[fileId]); } catch(e){}
      delete this._blobCache[fileId];
    }
  },

   // Attach fallback chain to an <audio> element: on error try next URL, then local
  // DEPRECATED: direct src with CORP same-site fails from file:// ; use fetchToBlobUrl instead. Kept for compatibility.
  attachFallback: function (audioEl, fileId, localPath) {
    if (!audioEl || !fileId) return;
    var urls = this.getFallbackUrls(fileId);
    var idx = 0; // urls[0] already set as src
    audioEl._driveFallbackIdx = 0;
    audioEl._driveFileId = fileId;
    audioEl._driveLocalPath = localPath;
    var self = this;
    audioEl.addEventListener("error", function onDriveError() {
      // Only handle if we were trying a Drive URL (not local)
      if (audioEl._driveFallbackIdx === undefined) return;
      idx = audioEl._driveFallbackIdx + 1;
      if (idx < urls.length) {
        console.warn("[DriveAudio] URL failed, trying fallback " + idx + ": " + urls[idx] + " -> Will try fetch Blob instead");
        // Try fetch blob for remaining attempts instead of direct src
        self.fetchToBlobUrl(fileId).then(function (blobUrl) {
          audioEl._driveFallbackIdx = 99;
          audioEl.src = blobUrl;
          audioEl.load();
          audioEl.play().catch(function(){});
        }).catch(function (err) {
          console.error("[DriveAudio] Fetch blob also failed:", err);
          audioEl._driveFallbackIdx = idx;
          audioEl.src = urls[idx];
          audioEl.load();
        });
      } else {
        audioEl.removeEventListener("error", onDriveError);
        var msg = "Không phát được audio Drive (CORP blocked). Đang thử fetch Blob...";
        console.error("[DriveAudio] " + msg);
        self.fetchToBlobUrl(fileId).then(function (blobUrl) {
          audioEl.src = blobUrl;
          audioEl.load();
          VstepView.showToast && VstepView.showToast("✓ Đã chuyển sang chế độ Blob (trực tiếp Drive)", 2000);
        }).catch(function (err) {
          console.error("[DriveAudio] Blob fetch failed:", err);
          VstepView.showToast && VstepView.showToast("⚠️ Drive lỗi. Mở file trực tiếp: " + self.toPreviewLink(fileId), 4000);
        });
      }
    });
  },

  // Directly get audio URL to use in <audio> src. Returns Promise<string> (drive or local)
  // Also returns fileId when available so caller can setup fallback chain
  getAudioUrlWithId: function (localPath) {
    var self = this;
    if (localPath && localPath.indexOf("drive.google.com") >= 0) {
      var fid = this.extractFileId(localPath);
      if (fid) return Promise.resolve({ url: this.toStreamLink(fid), fileId: fid });
      return Promise.resolve({ url: localPath, fileId: null });
    }
    if (localPath && /^https?:\/\//i.test(localPath)) {
      return Promise.resolve({ url: localPath, fileId: null });
    }
    return this.resolveDriveUrl(localPath).then(function (driveUrl) {
      if (driveUrl) {
        // Extract fileId from driveUrl to build fallback chain
        var m = driveUrl.match(/id=([a-zA-Z0-9_-]{20,})/);
        var fid2 = m ? m[1] : null;
        console.log("[DriveAudio] Using Drive audio for", localPath, "->", driveUrl);
        return { url: driveUrl, fileId: fid2 };
      }
      return { url: localPath, fileId: null };
    });
  },
  // Directly get audio URL to use in <audio> src. Returns Promise<string> (drive or local)
  getAudioUrl: function (localPath) {
    return this.getAudioUrlWithId(localPath).then(function (r) { return r.url; });
  },

  // BUG #2 FIX: Thay vì trả về chuỗi URL dễ dính CORP, fetch Blob luôn khi là file Drive
  getAudioBlob: function (localPath) {
    var self = this;
    return this.getAudioUrlWithId(localPath).then(function (result) {
      if (result.fileId) {
        // Nếu là file Drive, fetch Blob luôn để tránh lỗi CORP/CORS
        return self.fetchToBlobUrl(result.fileId);
      }
      // Nếu là file local, trả về path như bình thường
      return result.url;
    });
  }
};

// Auto-load preference on startup
(function(){
  try{
    var v = localStorage.getItem("vstep_use_drive_audio");
    if(v !== null) window.DriveAudioService._useDrive = (v === "1");
  }catch(e){}
})();
