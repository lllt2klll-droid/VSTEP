/* ==========================================================================
   GRADING SERVICE - VSTEP PRACTICE TESTS
   ========================================================================== */
window.GradingService = {
  // Chấm điểm Reading theo answer key
  gradeReading: function(testData, userAnswers) {
    if (!testData || !testData.reading || !testData.answerKey) {
      return {
        score: 0,
        total: 0,
        correct: 0,
        incorrect: 0,
        details: []
      };
    }

    const answerKey = testData.answerKey.reading || [];
    let correct = 0;
    let total = 0;
    const details = [];

    // Lấy tất cả câu hỏi từ tất cả passages
    const allQuestions = [];
    if (testData.reading.passages) {
      testData.reading.passages.forEach(passage => {
        if (passage.questions) {
          allQuestions.push(...passage.questions);
        }
      });
    } else {
      ['part1', 'part2', 'part3', 'part4'].forEach(partKey => {
        const part = testData.reading[partKey];
        if (part && part.questions) {
          allQuestions.push(...part.questions);
        }
      });
    }

    // Chấm từng câu
    allQuestions.forEach(question => {
      total++;
      const userAnswer = userAnswers[question.id];
      const correctAnswer = answerKey[question.id - 1]; // answerKey là array 0-indexed

      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) correct++;

      details.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer || null,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        explanation: question.explanation || null
      });
    });

    const score = total > 0 ? (correct / total) * 9 : 0; // Thang điểm 9.0
    const roundedScore = Math.round(score * 10) / 10; // Làm tròn đến 0.5

    return {
      score: roundedScore,
      total: total,
      correct: correct,
      incorrect: total - correct,
      details: details
    };
  },

  // Chấm điểm Listening theo answer key
  gradeListening: function(testData, userAnswers) {
    if (!testData || !testData.listening || !testData.answerKey) {
      return {
        score: 0,
        total: 0,
        correct: 0,
        incorrect: 0,
        details: []
      };
    }

    const answerKey = testData.answerKey.listening || [];
    let correct = 0;
    let total = 0;
    const details = [];

    // Lấy tất cả câu hỏi từ tất cả parts
    const allQuestions = [];
    
    // Part 1
    if (testData.listening.part1 && testData.listening.part1.questions) {
      allQuestions.push(...testData.listening.part1.questions);
    }
    
    // Part 2
    if (testData.listening.part2 && testData.listening.part2.conversations) {
      testData.listening.part2.conversations.forEach(conv => {
        if (conv.questions) {
          allQuestions.push(...conv.questions);
        }
      });
    }
    
    // Part 3
    if (testData.listening.part3 && testData.listening.part3.talks) {
      testData.listening.part3.talks.forEach(talk => {
        if (talk.questions) {
          allQuestions.push(...talk.questions);
        }
      });
    }

    // Chấm từng câu
    allQuestions.forEach(question => {
      total++;
      const userAnswer = userAnswers[question.id];
      const correctAnswer = answerKey[question.id - 1]; // answerKey là array 0-indexed

      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) correct++;

      details.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer || null,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        explanation: question.explanation || null
      });
    });

    const score = total > 0 ? (correct / total) * 9 : 0; // Thang điểm 9.0
    const roundedScore = Math.round(score * 10) / 10; // Làm tròn đến 0.5

    return {
      score: roundedScore,
      total: total,
      correct: correct,
      incorrect: total - correct,
      details: details
    };
  },

  // Chấm điểm Writing bằng AI (Gemini)
  gradeWriting: async function(taskType, prompt, userEssay, taskSubtype) {
    try {
      const result = await GeminiService.gradeVstepWriting(taskType, prompt, userEssay, taskSubtype);
      // __offline = AI không phản hồi và service đã tự chấm dự phòng:
      // không được báo success=true (view sẽ treo nhãn "Đã chấm điểm xong" sai).
      return {
        success: !result.__offline,
        offline: !!result.__offline,
        data: result
      };
    } catch (e) {
      console.error("GradingService.gradeWriting error:", e);
      return {
        success: false,
        error: e.message,
        data: window.AiResponses.evaluateWritingOffline(taskType, userEssay)
      };
    }
  },

  // Chấm điểm Speaking bằng AI (Gemini)
  gradeSpeaking: async function(partTitle, questionText, transcript, duration) {
    try {
      const result = await GeminiService.gradeVstepSpeaking(partTitle, questionText, transcript, duration);
      return {
        success: !result.__offline,
        offline: !!result.__offline,
        data: result
      };
    } catch (e) {
      console.error("GradingService.gradeSpeaking error:", e);
      return {
        success: false,
        error: e.message,
        data: window.AiResponses.evaluateSpeakingOffline(partTitle, duration)
      };
    }
  },

  // Chấm điểm toàn bộ test
  gradeFullTest: async function(testData, userAnswers) {
    const results = {
      reading: null,
      listening: null,
      writing: {
        task1: null,
        task2: null
      },
      speaking: {
        part1: null,
        part2: null,
        part3: null
      },
      overallScore: 0
    };

    // Chấm Reading (theo answer key)
    results.reading = this.gradeReading(testData, userAnswers.reading || {});

    // Chấm Listening (theo answer key)
    results.listening = this.gradeListening(testData, userAnswers.listening || {});

    // Chấm Writing (AI) — kiểm tra đề có tồn tại trước khi chấm
    if (userAnswers.writing) {
      if (userAnswers.writing.task1 && testData.writing && testData.writing.task1) {
        results.writing.task1 = await this.gradeWriting(
          'task1',
          testData.writing.task1.prompt,
          userAnswers.writing.task1,
          testData.writing.task1.type
        );
      }
      if (userAnswers.writing.task2 && testData.writing && testData.writing.task2) {
        results.writing.task2 = await this.gradeWriting(
          'task2',
          testData.writing.task2.prompt,
          userAnswers.writing.task2,
          testData.writing.task2.type
        );
      }
    }

    // Chấm Speaking (AI) — đề mỗi nguồn một kiểu (questions là mảng, hoặc
    // situation/topic là chuỗi): đọc phòng thủ thay vì .join() thẳng có thể nổ.
    if (userAnswers.speaking && testData.speaking) {
      var pickPrompt = function (part, fallback) {
        if (!part) return fallback;
        if (Array.isArray(part.questions)) return part.questions.join(', ');
        return part.questions || part.situation || part.topic || fallback;
      };
      if (userAnswers.speaking.part1 && testData.speaking.part1) {
        results.speaking.part1 = await this.gradeSpeaking(
          'Part 1',
          pickPrompt(testData.speaking.part1, 'Part 1'),
          userAnswers.speaking.part1.transcript,
          userAnswers.speaking.part1.duration
        );
      }
      if (userAnswers.speaking.part2 && testData.speaking.part2) {
        results.speaking.part2 = await this.gradeSpeaking(
          'Part 2',
          pickPrompt(testData.speaking.part2, 'Part 2'),
          userAnswers.speaking.part2.transcript,
          userAnswers.speaking.part2.duration
        );
      }
      if (userAnswers.speaking.part3 && testData.speaking.part3) {
        results.speaking.part3 = await this.gradeSpeaking(
          'Part 3',
          pickPrompt(testData.speaking.part3, 'Part 3'),
          userAnswers.speaking.part3.transcript,
          userAnswers.speaking.part3.duration
        );
      }
    }

    // Tính điểm tổng hợp. QUAN TRỌNG: Reading/Listening trả điểm NUMBER,
    // AI trả điểm STRING ("6.5") — cộng thẳng sẽ NỐI CHUỖI rồi chia ra NaN.
    // nên mọi điểm đều phải qua parseFloat, loại giá trị không phải số.
    const scores = [];
    var pushScore = function (value) {
      var n = parseFloat(value);
      if (isFinite(n)) scores.push(n);
    };
    if (results.reading) pushScore(results.reading.score);
    if (results.listening) pushScore(results.listening.score);
    if (results.writing.task1 && results.writing.task1.data) pushScore(results.writing.task1.data.score);
    if (results.writing.task2 && results.writing.task2.data) pushScore(results.writing.task2.data.score);
    if (results.speaking.part1 && results.speaking.part1.data) pushScore(results.speaking.part1.data.score);
    if (results.speaking.part2 && results.speaking.part2.data) pushScore(results.speaking.part2.data.score);
    if (results.speaking.part3 && results.speaking.part3.data) pushScore(results.speaking.part3.data.score);

    if (scores.length > 0) {
      results.overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      results.overallScore = Math.round(results.overallScore * 10) / 10;
    }

    return results;
  }
};
