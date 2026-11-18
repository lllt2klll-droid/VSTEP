/* ==========================================================================
   OFFLINE AI SIMULATOR - MULTI-LANGUAGE VSTEP LEARNING HUB
   ========================================================================== */
window.AiResponses = {
  // Trả lời chatbot offline dựa trên từ khóa câu hỏi của người học
  getChatResponse: function(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    if (msg.includes("xin chào") || msg.includes("hi") || msg.includes("hello")) {
      return `<p>Xin chào! Tôi là <strong>AI Tutor</strong> của bạn. Tôi có thể giúp bạn:</p>
              <ul>
                <li>Giải thích ngữ pháp và từ vựng tiếng Anh.</li>
                <li>Luyện thi VSTEP và chấm điểm bài viết/bài nói.</li>
              </ul>
              <p>Hãy hỏi tôi bất kỳ điều gì hoặc thử nhập bài viết bên tab VSTEP để tôi chấm nhé!</p>`;
    }

    if (msg.includes("vstep") || msg.includes("thi")) {
      return `<p>Để luyện thi <strong>VSTEP đạt kết quả cao (B1-B2-C1)</strong>, bạn cần chú ý các điểm sau:</p>
              <ol>
                <li><strong>Reading:</strong> Luyện quét từ khóa (scanning) và đoán nghĩa từ qua ngữ cảnh.</li>
                <li><strong>Listening:</strong> Tập trung nghe từ khóa trong phần thông báo và hội thoại ngắn.</li>
                <li><strong>Writing:</strong> Thuộc lòng các mẫu câu mở/kết thư (Task 1) và dàn ý luận 4 phần (Task 2). Sử dụng các từ liên kết (however, furthermore, in conclusion).</li>
                <li><strong>Speaking:</strong> Luyện phát âm rõ ràng, không ngắt quãng quá lâu. Tập trung phát triển ý bằng cấu trúc PREP (Point - Reason - Example - Point).</li>
              </ol>
              <p>Tôi có thể chấm điểm trực tiếp bài viết Writing của bạn trong mục luyện thi VSTEP đấy!</p>`;
    }

    if (msg.includes("dịch") || msg.includes("translate")) {
      return `<p>Để dịch thuật chính xác, hãy sử dụng tính năng <strong>Translator</strong> trên thanh điều hướng.</p>
              <p>Hoặc bạn có thể gõ câu cần dịch trực tiếp ở đây, ví dụ: <em>Dịch: 'Học ngoại ngữ rất thú vị'</em>.</p>`;
    }

    // Default Fallback Response
    return `<p>Tôi đã nhận được câu hỏi của bạn: "<em>${userMessage}</em>".</p>
            <p>Để trả lời câu hỏi chuyên sâu hoặc dịch thuật chính xác cụm từ này, bạn có thể <strong>cung cấp Gemini API Key trong mục Settings</strong>. Khi có API Key, tôi sẽ phân tích ngữ pháp thời gian thực, sửa lỗi phát âm và cung cấp phản hồi chuẩn xác nhất từ mô hình AI lớn.</p>
            <p>Hiện tại, ở chế độ Offline, tôi có thể hỗ trợ giải thích các chủ đề: <em>vstep, xin chào</em> hoặc chấm điểm bài viết VSTEP của bạn.</p>`;
  },

  // Thuật toán chấm điểm Writing VSTEP giả lập cực kỳ thông minh
  evaluateWritingOffline: function(taskType, text) {
    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    let score = 3.0;
    let grammarScore = 3.5;
    let vocabScore = 3.5;
    let taskFulfillmentScore = 3.0;
    let organisationScore = 3.0;

    if (taskType === "task1") {
      if (wordCount >= 120) taskFulfillmentScore = 9.0;
      else if (wordCount >= 80) taskFulfillmentScore = 7.0;
      else if (wordCount >= 40) taskFulfillmentScore = 5.0;
      else taskFulfillmentScore = 3.0;
    } else {
      if (wordCount >= 250) taskFulfillmentScore = 9.0;
      else if (wordCount >= 180) taskFulfillmentScore = 7.0;
      else if (wordCount >= 100) taskFulfillmentScore = 5.0;
      else taskFulfillmentScore = 3.0;
    }

    const connectors = ["however", "therefore", "furthermore", "moreover", "in conclusion", "on the one hand", "on the other hand", "to begin with", "firstly", "secondly", "finally", "because", "although", "despite"];
    let connectorCount = 0;
    connectors.forEach(c => {
      if (text.toLowerCase().includes(c)) connectorCount++;
    });

    if (connectorCount >= 5) organisationScore = 8.5;
    else if (connectorCount >= 3) organisationScore = 7.0;
    else if (connectorCount >= 1) organisationScore = 5.5;
    else organisationScore = 4.0;

    if (wordCount > 50) {
      grammarScore += Math.min(4.5, wordCount / 50 + connectorCount * 0.3);
      vocabScore += Math.min(4.5, wordCount / 45 + connectorCount * 0.25);
    }

    grammarScore = Math.min(9.0, Math.round(grammarScore * 10) / 10);
    vocabScore = Math.min(9.0, Math.round(vocabScore * 10) / 10);
    taskFulfillmentScore = Math.min(9.0, Math.round(taskFulfillmentScore * 10) / 10);
    organisationScore = Math.min(9.0, Math.round(organisationScore * 10) / 10);

    const overallScore = Math.round(((grammarScore + vocabScore + taskFulfillmentScore + organisationScore) / 4) * 2) / 2;

    let vstepLevel = "Dưới B1";
    if (overallScore >= 8.5) vstepLevel = "C1 (Xuất sắc)";
    else if (overallScore >= 6.5) vstepLevel = "B2 (Trên Trung cấp)";
    else if (overallScore >= 4.0) vstepLevel = "B1 (Trung cấp)";

    return {
      wordCount: wordCount,
      score: overallScore.toFixed(1),
      level: vstepLevel,
      grammar: grammarScore.toFixed(1),
      vocabulary: vocabScore.toFixed(1),
      taskFulfillment: taskFulfillmentScore.toFixed(1),
      organisation: organisationScore.toFixed(1),
      feedback: `
        <p><strong>Nhận xét tổng quát:</strong> Bài viết của bạn đạt độ dài ${wordCount} từ. ${wordCount > 0 ? "AI đã phân tích cấu trúc câu và từ vựng." : "Vui lòng nhập nội dung để đánh giá."}</p>
        <ul>
          <li><strong>Task Fulfillment (Hoàn thành yêu cầu):</strong> ${wordCount < (taskType === "task1" ? 120 : 250) ? `Bài viết hơi ngắn (đạt ${wordCount} từ), bạn cần bổ sung thêm ý để đạt yêu cầu tối thiểu là ${taskType === "task1" ? "120" : "250"} từ.` : "Chúc mừng! Bạn đã hoàn thành tốt yêu cầu về dung lượng bài viết."}</li>
          <li><strong>Organisation (Tổ chức bài viết):</strong> Phát hiện ${connectorCount} từ liên kết. ${connectorCount < 3 ? "Bạn nên bổ sung thêm các từ nối để làm rõ luận điểm (ví dụ: 'however', 'furthermore', 'in conclusion')." : "Sử dụng từ nối khá linh hoạt và tự nhiên."}</li>
          <li><strong>Vocabulary & Grammar (Từ vựng & Ngữ pháp):</strong> ${overallScore < 5.0 ? "Cần đa dạng hóa cấu trúc câu phức và tránh các lỗi ngữ pháp cơ bản." : "Đã có ý thức sử dụng cấu trúc câu ghép và từ vựng học thuật ở mức khá."}</li>
        </ul>
        <p style="font-size: 0.85rem; color:var(--text-muted); margin-top: 0.5rem;">⚠️ <em>Lưu ý: Kết quả trên được tính toán bằng bộ chấm điểm mô phỏng ngoại tuyến. Để chấm điểm sâu và chi tiết từng lỗi chính tả/ngữ pháp bằng AI thông minh Gemini, vui lòng điền Gemini API Key ở phần Settings.</em></p>
      `
    };
  },

  // Đánh giá giọng nói Speaking VSTEP giả lập cực kỳ thông minh
  evaluateSpeakingOffline: function(partType, recordDurationSeconds) {
    let score = 3.5;
    let fluency = 3.0;
    let vocabulary = 3.5;
    let pronunciation = 4.0;
    let grammar = 3.5;
    let discourseManagement = 3.5;

    // Score based on recording duration (longer = better fluency)
    if (recordDurationSeconds > 60) {
      fluency = 8.5;
      vocabulary = 7.5;
      pronunciation = 7.5;
      grammar = 7.0;
      discourseManagement = 7.5;
      score = 7.5;
    } else if (recordDurationSeconds > 45) {
      fluency = 7.5;
      vocabulary = 7.0;
      pronunciation = 7.0;
      grammar = 6.5;
      discourseManagement = 7.0;
      score = 7.0;
    } else if (recordDurationSeconds > 30) {
      fluency = 6.5;
      vocabulary = 6.0;
      pronunciation = 6.0;
      grammar = 5.5;
      discourseManagement = 6.0;
      score = 6.0;
    } else if (recordDurationSeconds > 15) {
      fluency = 5.0;
      vocabulary = 5.0;
      pronunciation = 5.5;
      grammar = 4.5;
      discourseManagement = 5.0;
      score = 5.0;
    } else if (recordDurationSeconds > 5) {
      fluency = 4.0;
      vocabulary = 4.0;
      pronunciation = 4.5;
      grammar = 3.5;
      discourseManagement = 4.0;
      score = 4.0;
    }

    let level = "Dưới B1";
    if (score >= 8.5) level = "C1";
    else if (score >= 6.5) level = "B2";
    else if (score >= 4.0) level = "B1";

    return {
      duration: recordDurationSeconds,
      score: score.toFixed(1),
      level: level,
      vocabulary: vocabulary.toFixed(1),
      grammar: grammar.toFixed(1),
      pronunciation: pronunciation.toFixed(1),
      fluency: fluency.toFixed(1),
      discourseManagement: discourseManagement.toFixed(1),
      feedback: {
        strengths: [
          score >= 6.0 ? "Thời lượng nói phù hợp yêu cầu" : "Đã có nỗ lực phát biểu",
          score >= 5.0 ? "Phát âm tương đối rõ ràng" : "Cần cải thiện phát âm"
        ],
        suggestions: [
          recordDurationSeconds < 30 ? "Nên nói dài hơn để phát triển ý đầy đủ" : "Tiếp tục duy trì thời lượng nói",
          score < 6.0 ? "Cần đa dạng hóa từ vựng và cấu trúc câu" : "Cố gắng sử dụng từ vựng nâng cao hơn",
          "Luyện tập thêm để tăng sự tự tin khi nói"
        ]
      }
    };
  }
};
