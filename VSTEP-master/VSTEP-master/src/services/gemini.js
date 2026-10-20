/* ==========================================================================
   GEMINI API SERVICE - MULTI-LANGUAGE VSTEP LEARNING HUB
   ========================================================================== */
window.GeminiService = {
  // Safe storage accessors (localStorage can throw in private mode / when full)
  _safeGet: function (key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  _safeSet: function (key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error("GeminiService storage error:", e);
      return false;
    }
  },
  // Danh sách provider AI hỗ trợ (Gemini + các provider free không cần thẻ)
  PROVIDERS: {
    gemini: {
      name: "Google Gemini",
      emoji: "🔮",
      desc: "Google đã ngừng free tier cho tài khoản Gemini mới (key bị quota 0). Chỉ dùng nếu bạn có tài khoản cũ hoặc đã gắn thẻ billing.",
      signup: "https://aistudio.google.com/app/apikey",
      signupLabel: "Google AI Studio",
      signupText: "Google AI Studio (aistudio.google.com/app/apikey)",
      limitNote: "Giới hạn ~15 yêu cầu/phút (free tier).",
      keyPlaceholder: "Nhập Gemini API Key (AIza... hoặc AQ.)...",
      keyHint: "Hỗ trợ cả định dạng mới AQ. và cũ AIza",
      defaultModel: "gemini-2.0-flash",
      jsonResponseFormat: false,
      baseUrl: null,
      models: [
        { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash (Khuyến nghị)" },
        { value: "gemini-2.0-pro", label: "Gemini 2.0 Pro (Chính xác)" },
        { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash (Nhanh)" },
        { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro (Chính xác)" },
        { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash (Ổn định)" },
        { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro (Chính xác)" },
      ],
    },
    groq: {
      name: "Groq",
      emoji: "⚡",
      desc: "Free tier vẫn cấp cho user mới, không cần thẻ tín dụng, tốc độ cực nhanh (Llama 3.3 70B, Qwen, Gemma).",
      signup: "https://console.groq.com/keys",
      signupLabel: "Groq Console",
      signupText: "Groq Console (console.groq.com/keys)",
      limitNote: "Free: ~30 yêu cầu/phút và giới hạn token/ngày.",
      keyPlaceholder: "Nhập Groq API Key (gsk_...)...",
      keyHint: "Key bắt đầu bằng gsk_",
      defaultModel: "llama-3.3-70b-versatile",
      jsonResponseFormat: true,
      baseUrl: "https://api.groq.com/openai/v1/chat/completions",
      models: [
        {
          value: "llama-3.3-70b-versatile",
          label: "Llama 3.3 70B (Khuyến nghị)",
        },
        {
          value: "meta-llama/llama-4-scout-17b-16e-instruct",
          label: "Llama 4 Scout 17B",
        },
        {
          value: "meta-llama/llama-4-maverick-17b-128e-instruct",
          label: "Llama 4 Maverick 17B",
        },
        { value: "llama-3.1-8b-instant", label: "Llama 3.1 8B (Nhanh)" },
        { value: "gemma2-9b-it", label: "Gemma 2 9B" },
        { value: "qwen-2.5-32b", label: "Qwen 2.5 32B" },
      ],
    },
    pollinations: {
      name: "Pollinations (Không cần key)",
      emoji: "🎨",
      desc: "AI miễn phí 100%, KHÔNG cần đăng ký tài khoản, không cần key, không cần thẻ. Chỉ cần chọn model là dùng được ngay.",
      signup: "https://pollinations.ai",
      signupLabel: "pollinations.ai",
      signupText: "pollinations.ai (không cần tài khoản)",
      limitNote:
        "Giới hạn theo IP (~100k token/ngày, vài chục yêu cầu/phút). Khi quá tải hệ thống có thể tự thử lại.",
      keyPlaceholder: "Không cần key thật - gõ bất kỳ (vd: free)...",
      keyHint: "Ô key để trống cũng được, gõ ký tự bất kỳ vẫn chạy",
      defaultModel: "deepseek",
      jsonResponseFormat: false,
      baseUrl: "https://text.pollinations.ai/openai",
      models: [
        { value: "openai", label: "OpenAI (GPT-4o cấp - Khuyến nghị)" },
        { value: "deepseek", label: "DeepSeek V3" },
        { value: "deepseek-r1", label: "DeepSeek R1 (Suy luận)" },
        { value: "qwen", label: "Qwen 2.5" },
        { value: "qwen-coder", label: "Qwen 2.5 Coder" },
        { value: "mistral", label: "Mistral" },
        { value: "llama", label: "Llama 3.3" },
        { value: "phi", label: "Phi-4" },
      ],
    },
    openrouter: {
      name: "OpenRouter (Free models)",
      emoji: "🌐",
      desc: "1 key truy cập hàng trăm model free (DeepSeek, Llama, Qwen, Kimi K2...). Chọn model có tag :free.",
      signup: "https://openrouter.ai/keys",
      signupLabel: "OpenRouter",
      signupText: "OpenRouter (openrouter.ai/keys)",
      limitNote: "Model :free ~1000 yêu cầu/ngày, không cần nạp tiền.",
      keyPlaceholder: "Nhập OpenRouter API Key (sk-or-...)...",
      keyHint: "Key bắt đầu bằng sk-or-",
      defaultModel: "deepseek/deepseek-chat-v3-0324:free",
      jsonResponseFormat: true,
      baseUrl: "https://openrouter.ai/api/v1/chat/completions",
      models: [
        {
          value: "deepseek/deepseek-chat-v3-0324:free",
          label: "DeepSeek Chat V3 (Free)",
        },
        { value: "deepseek/deepseek-r1:free", label: "DeepSeek R1 (Free)" },
        {
          value: "meta-llama/llama-3.3-70b-instruct:free",
          label: "Llama 3.3 70B (Free)",
        },
        {
          value: "qwen/qwen-2.5-72b-instruct:free",
          label: "Qwen 2.5 72B (Free)",
        },
        { value: "moonshotai/kimi-k2:free", label: "Kimi K2 (Free)" },
      ],
    },
    github: {
      name: "GitHub Models",
      emoji: "🐙",
      desc: "Dùng miễn phí GPT-4o mini, DeepSeek R1, Llama 3.3... chỉ cần tài khoản GitHub (không cần thẻ).",
      signup: "https://github.com/settings/tokens",
      signupLabel: "GitHub Developer Settings",
      signupText:
        "GitHub → Settings → Developer settings → Personal access tokens",
      limitNote: "Miễn phí với giới hạn thấp (ví dụ GPT-4o mini: 10 req/phút).",
      keyPlaceholder: "Nhập GitHub Token (github_pat_... hoặc ghp_...)...",
      keyHint:
        "Tạo Fine-grained token (classic ghp_ cũng được), key bắt đầu bằng github_pat_ / ghp_",
      defaultModel: "gpt-4o-mini",
      jsonResponseFormat: true,
      baseUrl: "https://models.github.ai/inference/chat/completions",
      models: [
        { value: "gpt-4o-mini", label: "GPT-4o mini (Khuyến nghị)" },
        { value: "gpt-4.1-mini", label: "GPT-4.1 mini" },
        { value: "meta-llama-3.3-70b-instruct", label: "Meta Llama 3.3 70B" },
        { value: "deepseek-r1-0528", label: "DeepSeek R1 0528" },
        { value: "phi-4", label: "Phi-4" },
      ],
    },
    cloudflare: {
      name: "Cloudflare Workers AI",
      emoji: "☁️",
      desc: "Chạy Llama, Qwen, DeepSeek trên hạ tầng Cloudflare. Miễn phí 10.000 neuron/ngày.",
      signup: "https://dash.cloudflare.com/profile/api-tokens",
      signupLabel: "Cloudflare Dashboard",
      signupText: "Cloudflare Dashboard → My Profile → API Tokens",
      limitNote:
        "Tạo token với quyền 'Account - Workers AI - Edit'. Key nhập dạng AccountID:Token.",
      keyPlaceholder: "Nhập theo dạng: AccountID:API_Token",
      keyHint:
        "Key gồm 2 phần: Account ID (trên dashboard) + dấu ':' + API Token",
      defaultModel: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      jsonResponseFormat: false,
      baseUrl:
        "https://api.cloudflare.com/client/v4/accounts/ACCOUNTID/ai/v1/chat/completions",
      models: [
        {
          value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
          label: "Llama 3.3 70B (Khuyến nghị)",
        },
        {
          value: "@cf/meta/llama-3.1-8b-instruct-fast",
          label: "Llama 3.1 8B (Nhanh)",
        },
        {
          value: "@cf/qwen/qwen2.5-coder-32b-instruct",
          label: "Qwen 2.5 Coder 32B",
        },
        {
          value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
          label: "DeepSeek R1 Distill 32B",
        },
      ],
    },
  },
  // Đọc danh sách provider tương ứng với từng key
  getKeyProviders: function () {
    const providersJson = this._safeGet("vstep_learning_gemini_key_providers");
    if (providersJson) {
      try {
        return JSON.parse(providersJson);
      } catch (e) {
        console.error("Error parsing key providers:", e);
        return [];
      }
    }
    return [];
  },

  // Đọc provider của key (mặc định key đang dùng). Key cũ chưa có provider riêng -> Gemini
  getProvider: function (index) {
    const idx = index !== undefined ? index : this.getCurrentKeyIndex();
    const providers = this.getKeyProviders();
    return providers[idx] || "gemini";
  },

  // Lưu provider riêng cho từng key
  setProvider: function (provider, index) {
    const providers = this.getKeyProviders();
    const idx = index !== undefined ? index : this.getCurrentKeyIndex();
    providers[idx] = provider;
    this._safeSet(
      "vstep_learning_gemini_key_providers",
      JSON.stringify(providers),
    );
  },

  getProviderInfo: function (index) {
    return this.PROVIDERS[this.getProvider(index)];
  },
  // Đọc danh sách API Key từ LocalStorage
  getApiKeys: function () {
    const keysJson = this._safeGet("vstep_learning_gemini_keys");
    if (keysJson) {
      try {
        return JSON.parse(keysJson);
      } catch (e) {
        console.error("Error parsing API keys:", e);
        return [];
      }
    }

    // Fallback to old single key format
    const oldKey = this._safeGet("vstep_learning_gemini_key");
    if (oldKey) {
      return [oldKey];
    }

    return [];
  },

  // Đọc API Key hiện tại từ danh sách
  getApiKey: function () {
    const keys = this.getApiKeys();
    if (keys.length === 0) return "";

    const currentIndex = this.getCurrentKeyIndex();
    return keys[currentIndex] || "";
  },

  // Đọc index của key đang dùng
  getCurrentKeyIndex: function () {
    const index = this._safeGet("vstep_learning_gemini_key_index");
    const keys = this.getApiKeys();

    if (index !== null && !isNaN(parseInt(index))) {
      const parsedIndex = parseInt(index);
      if (parsedIndex >= 0 && parsedIndex < keys.length) {
        return parsedIndex;
      }
    }

    // Default to 0 if not set or invalid
    return 0;
  },

  // Đọc danh sách model tương ứng với từng key
  getKeyModels: function () {
    const modelsJson = this._safeGet("vstep_learning_gemini_key_models");
    if (modelsJson) {
      try {
        return JSON.parse(modelsJson);
      } catch (e) {
        console.error("Error parsing key models:", e);
        return [];
      }
    }

    // Fallback to old single model format
    const oldModel = this._safeGet("vstep_learning_gemini_model");
    if (oldModel) {
      const keys = this.getApiKeys();
      return keys.map(() => oldModel);
    }

    // Return empty array if no models set
    return [];
  },

  // Đọc Model của key hiện tại
  getModel: function () {
    const currentIndex = this.getCurrentKeyIndex();
    const keyModels = this.getKeyModels();

    if (keyModels[currentIndex]) {
      return keyModels[currentIndex];
    }

    // Fallback to old single model format
    const oldModel = this._safeGet("vstep_learning_gemini_model");
    if (oldModel) {
      return oldModel;
    }

    // Default model theo provider đang chọn
    const info = this.PROVIDERS[this.getProvider()];
    return info ? info.defaultModel : "gemini-2.0-flash";
  },

  // Luân phiên sang key tiếp theo
  rotateApiKey: function () {
    const keys = this.getApiKeys();
    if (keys.length <= 1) return false; // Không thể chuyển nếu chỉ có 1 key

    const currentIndex = this.getCurrentKeyIndex();
    const nextIndex = (currentIndex + 1) % keys.length;

    this._safeSet("vstep_learning_gemini_key_index", nextIndex.toString());
    console.log(
      `🔄 Rotated API key from index ${currentIndex} to ${nextIndex}`,
    );

    return true;
  },
  // Hàm gọi API AI chung với cơ chế tự động chuyển đổi key.
  // Mỗi key có provider + model riêng nên provider được đọc lại trong từng lần thử.
  callGemini: async function (prompt, isJson = false, maxTokens = 8192) {
    const maxRetries = 3; // Số lần thử tối đa với các key khác nhau
    let lastError = null;
    const originalKeyIndex = this.getCurrentKeyIndex();
    // Keys whose free-tier quota is permanently 0 ("limit: 0"): retrying them
    // is useless, so skip to the next key immediately within this call
    const deadKeys = [];

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      // Skip keys already known to have zero quota in this call
      if (deadKeys.indexOf(this.getCurrentKeyIndex()) >= 0) {
        if (!this.rotateApiKey()) {
          throw new Error(
            "Tất cả API key đều không dùng được. Vui lòng kiểm tra lại key trong Cài đặt.",
          );
        }
        continue;
      }

      const keyIndex = this.getCurrentKeyIndex();
      try {
        return await this._callOnce(prompt, isJson, maxTokens);
      } catch (e) {
        if (e.isZeroQuota) {
          deadKeys.push(keyIndex);
          lastError = e;
          console.warn(
            `⚠️ API Key ${keyIndex} hết quota/tín dụng (limit: 0). Skipping...`,
          );
          if (this.rotateApiKey()) continue;
          throw e;
        }
        if (e.isRateLimit) {
          lastError = e;
          console.warn(
            `⚠️ API Key ${keyIndex} bị rate limit. Attempting to rotate...`,
          );
          if (this.rotateApiKey()) continue;
          throw e;
        }
        throw e;
      }
    }

    // Restore the original key index if it is still usable, so the app does
    // not stay stuck on a dead key for future calls
    if (
      deadKeys.indexOf(originalKeyIndex) < 0 &&
      this.getCurrentKeyIndex() !== originalKeyIndex
    ) {
      this._safeSet(
        "vstep_learning_gemini_key_index",
        originalKeyIndex.toString(),
      );
    }

    // If we've exhausted all retries, throw the last error
    if (lastError && lastError.isZeroQuota) {
      throw new Error(
        lastError.message +
          "\n\n⚠️ Key này đã hết quota/tín dụng miễn phí (hoặc Gemini free tier không được cấp cho tài khoản mới - limit: 0).\n" +
          "Hãy xóa key này trong Cài đặt, tạo key khác, hoặc chuyển key sang provider miễn phí khác (Groq, OpenRouter, GitHub Models, Cloudflare, Pollinations).",
      );
    }
    throw (
      lastError ||
      new Error("Không thể gọi API sau khi thử với tất cả các key.")
    );
  },

  // Gọi AI một lần với key đang dùng. Throw lỗi đã phân loại (isRateLimit / isZeroQuota).
  _callOnce: async function (prompt, isJson, maxTokens) {
    const providerId = this.getProvider();
    const info = this.PROVIDERS[providerId];
    const modelName = this.getModel();
    let apiKey = this.getApiKey();

    if (!apiKey) {
      // Pollinations không cần key thật - dùng key giả là chạy được
      if (providerId === "pollinations") {
        apiKey = "pollinations-free";
      } else {
        if (
          typeof window.App !== "undefined" &&
          typeof window.App.navigate === "function"
        ) {
          window.App.navigate("settings");
        }
        throw new Error(
          "Chưa cấu hình API Key. Vui lòng nhập API Key trong mục Cài đặt để tiếp tục.",
        );
      }
    }

    if (providerId === "gemini") {
      return this._callGeminiOnce(prompt, isJson, maxTokens, modelName, apiKey);
    }
    return this._callCompletionsOnce(
      prompt,
      isJson,
      maxTokens,
      providerId,
      info,
      modelName,
      apiKey,
    );
  },

  // Gọi Gemini native generateContent (1 lần)
  _callGeminiOnce: async function (
    prompt,
    isJson,
    maxTokens,
    modelName,
    apiKey,
  ) {
    // encodeURIComponent protects keys containing base64 special chars (+ / =)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: maxTokens,
      },
    };
    if (isJson) {
      requestBody.generationConfig.responseMimeType = "application/json";
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg =
        errData.error?.message || `HTTP error! status: ${response.status}`;
      const err = new Error(errMsg);
      // Detect rate-limit/quota errors
      if (/quota|rate.?limit|resource.exhausted|retry in/i.test(errMsg)) {
        // Permanent zero quota (e.g. free tier not granted: "limit: 0").
        if (/limit:\s*0|free_tier.*limit: 0/.test(errMsg)) {
          err.isZeroQuota = true;
          err.isRateLimit = false;
        } else {
          err.isRateLimit = true;
          const retryMatch = errMsg.match(/Please retry in ([\d.]+)s/);
          err.retryAfter = retryMatch ? parseFloat(retryMatch[1]) : 60;
        }
      }
      throw err;
    }

    const data = await response.json().catch(() => ({}));
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResult) {
      throw new Error("Không nhận được kết quả phản hồi từ mô hình AI.");
    }
    // Strip markdown fences / prose wrapping like the completions path does,
    // so JSON-mode calls (grading, vocab suggestions, ...) always parse
    return this._afterSuccess(isJson ? this._extractJson(textResult) : textResult);
  },

  // Gọi OpenAI-compatible chat/completions (1 lần) - Groq, OpenRouter, GitHub Models, Cloudflare, Pollinations
  _callCompletionsOnce: async function (
    prompt,
    isJson,
    maxTokens,
    providerId,
    info,
    modelName,
    apiKey,
  ) {
    let url = info.baseUrl;
    let authKey = apiKey;

    // Cloudflare: key nhập dạng "AccountID:Token", cần tách ra và chèn AccountID vào URL
    if (providerId === "cloudflare") {
      const parts = apiKey.split(":");
      if (parts.length < 2 || !parts[0]) {
        throw new Error(
          "Cloudflare key phải có định dạng: AccountID:API_Token (gồm dấu ':' giữa Account ID và Token).",
        );
      }
      authKey = parts.slice(1).join(":");
      url = url.replace("ACCOUNTID", encodeURIComponent(parts[0]));
    }

    const requestBody = {
      model: modelName,
      messages: [
        {
          role: "system",
          content:
            "Bạn là trợ lý AI chuyên nghiệp. Luôn trả lời ngắn gọn, chính xác và hữu ích.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    };
    if (isJson) {
      if (info.jsonResponseFormat) {
        requestBody.response_format = { type: "json_object" };
      } else {
        requestBody.messages[0].content =
          "Bạn là trợ lý AI chuyên nghiệp. CHỈ trả về chuỗi JSON thô hợp lệ, không kèm markdown, không kèm lời dẫn.";
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg =
        (errData.error && (errData.error.message || errData.error.code)) ||
        `HTTP error! status: ${response.status}`;
      const err = new Error(errMsg);
      if (
        response.status === 429 ||
        response.status === 402 ||
        /rate.?limit|quota|insufficient|out of credit|out of tokens/i.test(
          errMsg,
        )
      ) {
        if (
          response.status === 402 ||
          /insufficient|out of credit|out of tokens|quota/i.test(errMsg)
        ) {
          err.isZeroQuota = true;
          err.isRateLimit = false;
        } else {
          err.isRateLimit = true;
        }
      }
      throw err;
    }

    const data = await response.json().catch(() => ({}));
    const choice = data.choices && data.choices[0];
    let textResult = choice && choice.message && choice.message.content;
    if (Array.isArray(textResult)) {
      textResult = textResult.map((p) => (p && p.text) || "").join("");
    }
    if (!textResult) {
      throw new Error("Không nhận được kết quả phản hồi từ mô hình AI.");
    }
    if (isJson) {
      textResult = this._extractJson(textResult);
    }
    return this._afterSuccess(textResult);
  },

  _afterSuccess: function (textResult) {
    // Notify user when AI finishes (chat, translation, grading, ...)
    if (typeof SoundManager !== "undefined" && SoundManager.play) {
      SoundManager.play("notify");
    }
    return textResult;
  },

  // Trích JSON thô từ phản hồi (bỏ markdown code fences nếu model không hỗ trợ response_format).
  // Hỗ trợ cả object lẫn top-level array (array bị cắt theo { } sẽ không parse được).
  _extractJson: function (text) {
    const trimmed = String(text).trim();
    if (trimmed.startsWith("```")) {
      const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) return match[1].trim();
    }
    const arrayStart = trimmed.indexOf("[");
    const objectStart = trimmed.indexOf("{");
    // Ưu tiên array nếu ngoặc [ xuất hiện trước ngoặc { (cả khi có prose phía trước)
    if (trimmed.startsWith("[") || (arrayStart >= 0 && (objectStart < 0 || arrayStart < objectStart))) {
      const end = trimmed.lastIndexOf("]");
      if (end > arrayStart) {
        return trimmed.substring(arrayStart, end + 1);
      }
      return trimmed;
    }
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return trimmed.substring(start, end + 1);
    }
    return trimmed;
  },

  // Helper: countdown progress bar trong container khi rate-limit
  showRetryCountdown: function (containerEl, prefix, seconds) {
    return new Promise(function (resolve) {
      var startTime = Date.now();
      var duration = seconds * 1000;
      var barId = prefix + "-retry-bar";
      var txtId = prefix + "-retry-txt";
      if (containerEl) {
        containerEl.innerHTML =
          '<div style="text-align:center;padding:2rem;">' +
          '<div style="font-size:1.5rem;margin-bottom:0.75rem;">\u23F3</div>' +
          '<p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;">Gi\u1edbi h\u1ea1n API Gemini \u0111\u1ea1t t\u1ed1i \u0111a. \u0110ang ch\u1edd ph\u1ee5c h\u1ed3i...</p>' +
          '<div style="width:100%;max-width:320px;margin:0 auto;height:8px;background:var(--border-color);border-radius:9999px;overflow:hidden;">' +
          '<div id="' +
          barId +
          '" style="height:100%;width:0%;background:linear-gradient(90deg,var(--primary),var(--accent));border-radius:9999px;transition:width 0.1s linear;"></div>' +
          "</div>" +
          '<p id="' +
          txtId +
          '" style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;">T\u1ef1 \u0111\u1ed9ng th\u1eed l\u1ea1i sau ' +
          Math.ceil(seconds) +
          "s</p>" +
          '<p style="font-size:0.7rem;color:var(--text-muted);margin-top:0.75rem;opacity:0.6;">API mi\u1ec5n ph\u00ed: 20 y\u00eau c\u1ea7u/ph\u00fat</p>' +
          "</div>";
      }
      var interval = setInterval(function () {
        var elapsed = Date.now() - startTime;
        var pct = Math.min((elapsed / duration) * 100, 100);
        var remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
        var bar = document.getElementById(barId);
        var txt = document.getElementById(txtId);
        if (bar) bar.style.width = pct + "%";
        if (txt)
          txt.textContent =
            "T\u1ef1 \u0111\u1ed9ng th\u1eed l\u1ea1i sau " + remaining + "s";
        if (elapsed >= duration) {
          clearInterval(interval);
          if (containerEl) {
            containerEl.innerHTML =
              '<div style="display:flex;align-items:center;justify-content:center;height:120px;flex-direction:column;gap:0.75rem;"><p style="color:var(--text-muted);">\u0110ang th\u1eed l\u1ea1i...</p><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>';
          }
          resolve();
        }
      }, 100);
    });
  },
  // 0. Tra cứu từ vựng - dùng cho từ chưa có trong kho
  lookupWord: async function (word) {
    const apiKey = this.getApiKey();
    if (!apiKey && this.getProvider() !== "pollinations") return null;
    const prompt =
      'Bạn là từ điển tiếng Anh chuyên nghiệp. Hãy phân tích từ "' +
      word +
      '" và trả về kết quả dạng JSON:\n{\n  "meaningVi": "Nghĩa tiếng Việt của từ",\n  "ipa": "/phiên âm IPA/",\n  "example": "Câu ví dụ tiếng Anh sử dụng từ này",\n  "level": "A2/B1/B2/C1 (trình độ phù hợp)",\n  "topic": "education/work/technology/health/environment/travel/hobbies/relationships/house/weather (chủ đề phù hợp nhất)"\n}\nChỉ trả về JSON, không kèm giải thích.';
    try {
      const jsonStr = await this.callGemini(prompt, true, 1024);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Gemini lookupWord error:", e);
      return null;
    }
  },

  // 1. Trợ lý học tập Chat AI Tutor
  getTutorChatResponse: async function (userMessage, chatHistory = []) {
    const apiKey = this.getApiKey();
    if (!apiKey && this.getProvider() !== "pollinations") {
      return window.AiResponses.getChatResponse(userMessage);
    }
    let historyPrompt = "";
    chatHistory.slice(-6).forEach((chat) => {
      historyPrompt += `${chat.sender === "user" ? "Người học" : "AI Tutor"}: ${chat.text}\n`;
    });
    const systemPrompt = `Bạn là AI Tutor chuyên luyện thi VSTEP, dạy tiếng Anh bằng tiếng Việt.
Bạn thân thiện, chuyên nghiệp và ngắn gọn. Nhiệm vụ của bạn là giải đáp thắc mắc về từ vựng, ngữ pháp, sửa lỗi phát âm hoặc cung cấp lộ trình thi VSTEP.
Hãy viết câu trả lời sử dụng định dạng HTML cơ bản (các thẻ p, b, i, ul, li, ol, table, tr, td) để hiển thị đẹp mắt trong bong bóng chat. Không dùng thẻ html, body, head.
Lịch sử trò chuyện gần đây:
${historyPrompt}
Người học: ${userMessage}
AI Tutor:`;
    try {
      return await this.callGemini(systemPrompt, false, 2048);
    } catch (e) {
      console.error(e);
      if (e.isRateLimit) throw e;
      return `<p style="color:#ef4444;">⚠️ Lỗi API Gemini: ${e.message}</p><p>Đang chuyển hướng về trợ lý offline...</p>${window.AiResponses.getChatResponse(userMessage)}`;
    }
  },
  // 2. Dịch thuật đa ngữ tích hợp phân tích
  translateAndAnalyze: async function (text, targetLang) {
    const apiKey = this.getApiKey();
    const langMap = { en: "Tiếng Anh" };
    const targetLangName = langMap[targetLang] || targetLang;
    if (!apiKey && this.getProvider() !== "pollinations") {
      return {
        translatedText: `Dịch sang ${targetLangName}: (Vui lòng cấu hình API Key để dịch chính xác)`,
        grammarBreakdown: [
          {
            token: "Phân tích",
            explanation:
              "Cấu hình Gemini API Key trong Settings để nhận phân tích ngữ pháp tự động thời gian thực từ AI.",
          },
        ],
      };
    }
    const prompt = `Bạn là một chuyên gia dịch thuật và phân tích ngôn ngữ hàng đầu. 
Nhiệm vụ của bạn là dịch văn bản sau từ tiếng Việt (hoặc tự nhận diện ngôn ngữ nguồn) sang ${targetLangName}:
Văn bản cần dịch: "${text}"
Hãy phân tích và trả về kết quả dưới dạng cấu trúc JSON duy nhất như sau:
{
  "translatedText": "Kết quả dịch hoàn chỉnh.",
  "grammarBreakdown": [
    {
      "token": "Từ vựng/Cấu trúc chính",
      "explanation": "Giải thích chi tiết nghĩa, cách dùng trong câu so với tiếng Việt"
    }
  ]
}
Lưu ý: Chỉ trả về chuỗi JSON thô, không viết thêm lời dẫn gì bên ngoài.`;
    try {
      const jsonStr = await this.callGemini(prompt, true, 2048);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error(e);
      if (e.isRateLimit) throw e;
      return {
        translatedText: `⚠️ Lỗi dịch thuật: ${e.message}`,
        grammarBreakdown: [
          {
            token: "Lỗi",
            explanation: "Không thể tải phân tích ngữ pháp do lỗi kết nối API.",
          },
        ],
      };
    }
  },
  // 3. Chấm điểm bài viết VSTEP Writing
  gradeVstepWriting: async function (taskType, promptDesc, userEssay, taskSubtype) {
    const apiKey = this.getApiKey();
    if (!apiKey && this.getProvider() !== "pollinations") {
      return window.AiResponses.evaluateWritingOffline(taskType, userEssay);
    }
    const taskName =
      taskType === "task1"
        ? "Task 1 (Viết thư/email - 120 từ)"
        : "Task 2 (Viết luận - 250 từ)";

    // Phân loại sub-type để AI chấm đúng tiêu chí
    var subtypeLabels = {
      informal_email: "Thư không chính thức (Informal Email) - dùng ngôn ngữ thân mật, xưng hô bạn bè",
      informal_letter: "Thư không chính thức (Informal Letter) - dùng ngôn ngữ thân mật",
      formal_email: "Thư chính thức (Formal Email) - dùng ngôn ngữ trang trọng, lịch sự",
      formal_letter: "Thư chính thức (Formal Letter) - dùng ngôn ngữ trang trọng",
      discussion_essay: "Luận thảo luận (Discussion Essay) - trình bày cả hai quan điểm rồi đưa ra ý kiến cá nhân",
      opinion_essay: "Luận bày tỏ ý kiến (Opinion Essay) - nêu quan điểm rõ ràng và bảo vệ",
      advantages_disadvantages_essay: "Luận thuận/kháng (Advantages & Disadvantages) - phân tích mặt lợi và hại",
      causes_essay: "Luận nguyên nhân (Causes Essay) - phân tích nguyên nhân và hậu quả",
      essay: "Luận chung (General Essay) - bài luận theo đề bài"
    };
    var subtypeName = subtypeLabels[taskSubtype] || (taskType === "task1" ? "Thư/Email" : "Luận nghị luận");

    var taskSpecificGuide = "";
    if (taskType === "task1") {
      var isFormal = taskSubtype && (taskSubtype.indexOf("formal") !== -1);
      taskSpecificGuide = `
PHẦN ĐÁNH GIÁ TASK 1 (THƯ/EMAIL):
- Kiểm tra cấu trúc thư: lời chào mở đầu (Dear/Hi), thân thư, lời kết (Best regards/Best wishes/Love/See you)
- Đánh giá giọng điệu: ${isFormal ? "Trang trọng, lịch sự, không dùng slang. Dùng 'Dear Sir/Madam' hoặc 'Dear Mr./Mrs. + tên'" : "Thân mật, tự nhiên, có thể dùng slang nhẹ. Dùng 'Hi', 'Hey', 'Dear + tên'"}
- Đánh giá việc trả lời đầy đủ các yêu cầu trong đề bài (có/không/giải thích/gợi ý)
- Kiểm tra độ dài tối thiểu 120 từ
- Task 1 KHÔNG cần phân tích hai mặt hay đưa ra luận điểm phức tạp, chỉ cần trả lời đầy đủ câu hỏi`;
    } else {
      taskSpecificGuide = `
PHẦN ĐÁNH GIÁ TASK 2 (LUẬN NGHỊ LUẬN):
- Đánh giá cấu trúc bài luận: Mở bài (thesis statement) → Thân bài (2-3 luận điểm) → Kết bài (tóm tắt + ý kiến cá nhân)
- Kiểm tra việc sử dụng từ nối: however, furthermore, on the one hand, in conclusion, etc.
- Đánh giá lập luận: có luận điểm rõ ràng, có ví dụ minh họa, có phân tích sâu
- Đánh giá việc cân bằng các quan điểm (đặc biệt với discussion essay)
- Kiểm tra độ dài tối thiểu 250 từ
- Loại bài: ${subtypeLabels[taskSubtype] || "Luận nghị luận chung"}`;
    }

    const prompt = `Bạn là giám khảo chấm thi VSTEP chuyên nghiệp tại Việt Nam, tận tâm và hỗ trợ người học.
Hãy chấm điểm bài viết tiếng Anh sau đây theo định dạng thi VSTEP (thang điểm từ 1.0 đến 9.0 cho mỗi tiêu chí, làm tròn điểm tổng đến 0.5 hoặc 1.0).

LOẠI BÀI: ${taskName} - ${subtypeName}
Đề bài:
"${promptDesc}"
Bài làm của thí sinh:
"${userEssay}"

Yêu cầu chấm điểm dựa trên 4 tiêu chí của VSTEP Writing:
1. Vocabulary (Vốn từ vựng)
2. Grammar (Ngữ pháp)
3. Task Fulfillment (Hoàn thành yêu cầu đề bài)
4. Organisation (Tổ chức bài viết)

${taskSpecificGuide}

PHẦN ĐÁNH GIÁ Ý TƯỞNG - Hãy đánh giá ý tưởng của từng phần theo thứ tự:
1. Opening (Mở bài): Đánh giá ý tưởng phần mở bài đã đủ chưa, có ý tưởng nào nên thêm không
2. Body (Thân bài): Đánh giá ý tưởng phần thân bài đã đủ chưa, có ý tưởng nào nên thêm không, bổ sung cái chưa có, cái có rồi thì khỏi nhắc lại
3. Conclusion (Kết bài): Đánh giá ý tưởng phần kết bài đã đủ chưa, có ý tưởng nào nên thêm không

PHẦN NGỮ PHÁP - Trả về câu/từ sai cụ thể trong bài viết:
- Xác định chính xác từ/câu sai trong bài viết gốc
- Trả về original text (câu/từ sai), corrected text (câu/từ sửa), và explanation (giải thích ngắn gọn)
- Đảm bảo original text khớp chính xác với văn bản trong bài viết
- PHÂN LOẠI LỖI BẰNG FIELD type:
  * "error": Lỗi hoàn toàn (ngữ pháp sai, từ sai, cấu trúc sai) - ĐÁNH ĐỎ
  * "suggestion": Gợi ý từ tốt hơn, chính xác hơn - ĐÁNH XANH
  * "warning": Cảnh báo nhẹ, có thể chấp nhận được nhưng nên cải thiện - ĐÁNH VÀNG
  * "style": Gợi ý phong cách, cách diễn đạt hay hơn - ĐÁNH CAM
- Chỉ đánh type="error" khi CHẮC CHẮN sai (100%)
- Đánh type="suggestion" khi có gợi ý TỐT HƠN và giải thích được TẠI SAO
- Nếu không chắc chắn là sai, KHÔNG đánh dấu (không đưa vào danh sách)

PHẦN TRIỂN KHAI Ý TƯỞNG - Góp ý cụ thể chi tiết cách triển khai thêm:
- Nêu cụ thể nên thêm đoạn nào, ở vị trí nào, nội dung cụ thể là gì (Ví dụ: Đưa ra ví dụ nào đó bằng tiếng việt thì luôn có các câu tiếng anh cho ví dụ đó)
- Ví dụ: "Bạn nên thêm đoạn thứ 2 sau câu mở đầu để mô tả máy, bao gồm: thương hiệu (ví dụ: Sony, Samsung), năm sản xuất, tính năng chính như camera, pin, màn hình"
- Nếu có từ nào được nhắc tới trong bài văn, hãy đánh dấu bằng [WORD] để highlight trong phần nhận xét

Định dạng: dùng markdown với \n để xuống dòng, dùng *từ cũ* và *từ mới* để in nghiêng ví dụ

Hãy trả về kết quả chính xác dưới dạng cấu trúc JSON duy nhất:
{
  "wordCount": ${userEssay.trim().split(/\s+/).length},
  "score": "Điểm tổng kết (ví dụ: 6.5)",
  "level": "Bậc VSTEP tương đương (B1, B2, C1, hoặc Dưới B1)",
  "vocabulary": "Điểm tiêu chí Vocabulary (ví dụ: 7.0)",
  "grammar": "Điểm tiêu chí Grammar (ví dụ: 6.0)",
  "taskFulfillment": "Điểm tiêu chí Task Fulfillment (ví dụ: 7.0)",
  "organisation": "Điểm tiêu chí Organisation (ví dụ: 6.5)",
  "ideaEvaluation": {
    "opening": "Đánh giá ý tưởng phần mở bài",
    "body": "Đánh giá ý tưởng phần thân bài",
    "conclusion": "Đánh giá ý tưởng phần kết bài"
  },
  "grammarErrors": [
    {"original": "câu sai", "corrected": "câu sửa", "explanation": "ngắn gọn", "type": "error", "category": "Grammar/Vocabulary/Style"}
  ],
  "ideaDevelopment": [
    "Gợi ý triển khai ý cụ thể chi tiết với [WORD] highlight"
  ],
  "highlightedWords": [
    {"word": "từ", "explanation": "giải thích khi hover"}
  ]
}
Chỉ trả về chuỗi JSON, không kèm bất kỳ giải thích nào khác.`;
    try {
      const jsonStr = await this.callGemini(prompt, true);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error(e);
      if (e.isRateLimit) throw e;
      return {
        ...window.AiResponses.evaluateWritingOffline(taskType, userEssay),
        feedback:
          `<p style="color:#ef4444;">⚠️ Lỗi API Gemini: ${e.message}</p>` +
          window.AiResponses.evaluateWritingOffline(taskType, userEssay)
            .feedback,
      };
    }
  },
  // 4. Chấm điểm nói VSTEP Speaking dựa trên Transcript thu được
  gradeVstepSpeaking: async function (
    partTitle,
    questionText,
    spokenTranscript,
    recordDurationSeconds,
  ) {
    const apiKey = this.getApiKey();
    if (!apiKey && this.getProvider() !== "pollinations") {
      return window.AiResponses.evaluateSpeakingOffline(
        partTitle,
        recordDurationSeconds,
      );
    }

    // Part-specific evaluation criteria
    var partSpecificCriteria = "";
    if (partTitle.includes("Part 1")) {
      partSpecificCriteria = `
PHẦN ĐÁNH GIÁ ĐẶC BIỆT CHO PART 1 (SOCIAL INTERACTION):
- Đánh giá khả năng trả lời câu hỏi cá nhân, giao tiếp xã hội
- Đánh giá việc trả lời đầy đủ các câu hỏi trong đề bài
- Đánh giá sự tự nhiên và phù hợp trong ngữ cảnh giao tiếp hàng ngày
- Part 1 tập trung vào: Fluency, Vocabulary phù hợp ngữ cảnh, Grammar cơ bản đúng`;
    } else if (partTitle.includes("Part 2")) {
      partSpecificCriteria = `
PHẦN ĐÁNH GIÁ ĐẶC BIỆT CHO PART 2 (SOLUTION DISCUSSION):
- Đánh giá khả năng phân tích tình huống và đề xuất giải pháp
- Đánh giá việc trình bày giải pháp logic, có cấu trúc rõ ràng
- Đánh giá khả năng sử dụng ngôn ngữ đề xuất, giải quyết vấn đề
- Part 2 tập trung vào: Discourse Management, Grammar phức, Vocabulary chuyên môn`;
    } else if (partTitle.includes("Part 3")) {
      partSpecificCriteria = `
PHẦN ĐÁNH GIÁ ĐẶC BIỆT CHO PART 3 (TOPIC DEVELOPMENT):
- Đánh giá khả năng phát triển ý tưởng sâu về một chủ đề
- Đánh giá việc lập luận, phân tích và đưa ra ví dụ minh họa
- Đánh giá khả năng trình bày quan điểm cá nhân một cách thuyết phục
- Part 3 tập trung vào: Discourse Management, Vocabulary học thuật, Grammar nâng cao`;
    }

    const prompt = `Bạn là giám khảo chấm thi nói VSTEP chuyên nghiệp, tận tâm và hỗ trợ người học.
Hãy đánh giá bài nói của thí sinh dựa trên bản ghi âm chuyển đổi thành văn bản (speech-to-text transcript).
Phần thi: "${partTitle}"
Câu hỏi/Đề bài: "${questionText}"
Bản ghi âm lời nói (Transcript): "${spokenTranscript}"
Thời gian thí sinh nói: ${recordDurationSeconds} giây

Hãy chấm điểm dựa trên 5 tiêu chí chính của VSTEP Speaking:
1. Vocabulary (Vốn từ vựng): Đánh giá độ phong phú, chính xác và phù hợp của từ vựng trong ngữ cảnh nói.
2. Grammar (Ngữ pháp): Đánh giá sự đa dạng cấu trúc câu và độ chính xác ngữ pháp.
3. Pronunciation (Phát âm): Đánh giá độ rõ ràng của âm thanh, trọng âm từ, ngữ điệu câu và độ trôi chảy khi phát âm (dựa trên văn bản transcript).
4. Fluency (Sự lưu loát): Đánh giá khả năng diễn đạt liên tục, rõ ràng, có logic.
5. Discourse Management (Quản lý bài nói): Đánh giá khả năng sử dụng từ nối, phát triển ý tưởng và tổ chức bài nói mạch lạc.

${partSpecificCriteria}

PHẦN SUGGESTIONS (Gợi ý cải thiện) - Hãy cực kỳ có tâm:
- Gợi ý ý tưởng/chủ đề sát với câu hỏi nhất, giúp người học trả lời sâu hơn và đúng trọng tâm
- Gợi ý kèm ví dụ TRỰC TIẾP trên transcript của người học (trích câu gốc → câu đã sửa, giải thích tại sao)
- Gợi ý từ vựng/cấu trúc B2 nâng cao phù hợp với ngữ cảnh nói
- Sắp xếp gợi ý theo thứ tự quan trọng: những thay đổi giúp tăng điểm nhiều nhất trước
- Gợi ý cụ thể: nên dùng từ gì, nên bớt gì, nên thêm gì, định hướng phát triển ý như thế nào
- Định dạng: dùng markdown với \n để xuống dòng, dùng *từ cũ* và *từ mới* để in nghiêng ví dụ

Hãy trả về kết quả đánh giá theo thang điểm VSTEP (0-9.0) dưới dạng cấu trúc JSON duy nhất:
{
  "duration": ${recordDurationSeconds},
  "score": "Điểm tổng kết thang 9.0 (ví dụ: 6.0)",
  "level": "Bậc VSTEP tương đương (B1, B2, C1, hoặc Dưới B1)",
  "vocabulary": "Điểm tiêu chí Vocabulary (ví dụ: 6.5)",
  "grammar": "Điểm tiêu chí Grammar (ví dụ: 5.5)",
  "pronunciation": "Điểm tiêu chí Pronunciation (ví dụ: 6.0)",
  "fluency": "Điểm tiêu chí Fluency (ví dụ: 6.0)",
  "discourseManagement": "Điểm tiêu chí Discourse Management (ví dụ: 6.5)",
  "feedback": {
    "strengths": ["Điểm mạnh 1", "Điểm mạnh 2", "Điểm mạnh 3"],
    "errors": ["Lỗi sai 1 (trích câu sai → câu sửa)", "Lỗi sai 2 (trích câu sai → câu sửa)"],
    "suggestions": [
      "Gợi ý 1 (quan trọng nhất): Gợi ý chi tiết với ví dụ trực tiếp từ transcript",
      "Gợi ý 2: Gợi ý từ vựng B2 cụ thể thay thế từ đơn giản",
      "Gợi ý 3: Gợi ý cấu trúc câu nâng cao",
      "Gợi ý 4: Gợi ý phát triển ý tưởng sát với câu hỏi"
    ]
  }
}
Chỉ trả về chuỗi JSON, không có văn bản thừa.`;
    try {
      const jsonStr = await this.callGemini(prompt, true);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error(e);
      if (e.isRateLimit) throw e;
      return {
        ...window.AiResponses.evaluateSpeakingOffline(
          partTitle,
          recordDurationSeconds,
        ),
        feedback:
          `<p style="color:#ef4444;">⚠️ Lỗi API Gemini: ${e.message}</p>` +
          window.AiResponses.evaluateSpeakingOffline(
            partTitle,
            recordDurationSeconds,
          ).feedback,
      };
    }
  },
};
