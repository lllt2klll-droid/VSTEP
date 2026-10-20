/* ==========================================================================
   ROADMAP VIEW - 8-Week VSTEP Roadmap (Chi tiết theo từng ngày)
   Dựa trên cấu trúc đề thi VSTEP 4 kỹ năng & lộ trình 8 tuần đạt B1/B2
   Tích hợp toàn bộ tài liệu: 90 bài Listening, ~200 câu Reading,
   535 từ vựng, 12+8 bài Writing, 22+12+14 bài Speaking
   ========================================================================== */
window.RoadmapView = {
  roadmapData: {
    stages: [
      // ======================================================================
      // TUẦN 1: NỀN TẢNG NGỮ PHÁP & TỪ VỰNG CỐT LÕI
      // ======================================================================
      {
        id: "week1",
        title: "Tuần 1: Nền tảng Ngữ pháp & Từ vựng",
        subtitle: "Ngày 1 → 7",
        color: "#3b82f6",
        icon: "📚",
        milestones: [
          {
            id: "w1d1",
            title: "Ngày 1: Thiết lập mục tiêu + Kiểm tra đầu vào",
            desc: "Chọn B1/B2, đặt ngày thi, làm bài test 4 kỹ năng để xác định điểm mạnh/yếu",
            icon: "🎯", target: "setup",
            prep: "Đặt mục tiêu cụ thể (B1 hay B2). Làm 1 bài test đầu vào 4 kỹ năng. Ghi lại điểm số từng phần. Đọc kỹ cấu trúc đề thi VSTEP.",
            subMilestones: [
              { id: "w1d1s1", title: "Chọn mục tiêu B1/B2", completed: false },
              { id: "w1d1s2", title: "Đặt ngày thi dự kiến", completed: false },
              { id: "w1d1s3", title: "Làm test đầu vào 4 kỹ năng", completed: false },
              { id: "w1d1s4", title: "Phân tích điểm mạnh/yếu", completed: false }
            ]
          },
          {
            id: "w1d2",
            title: "Ngày 2: 10 chủ điểm ngữ pháp cốt lõi",
            desc: "Ôn các thì cơ bản, câu điều kiện, bị động, mệnh đề quan hệ từ grammar.js",
            icon: "📖", target: "grammar",
            prep: "Học 10 chủ điểm: Thì HTĐ, HTTD, QKĐ, TLĐ, HTHT, QKHT. Câu điều kiện loại 1-3. Câu bị động. Mệnh đề quan hệ. Câu gián tiếp. So sánh. Liên từ. Modal verbs. Làm 20 câu trắc nghiệm.",
            subMilestones: [
              { id: "w1d2s1", title: "Ôn các thì cơ bản (present, past, future)", completed: false },
              { id: "w1d2s2", title: "Ôn câu điều kiện & bị động", completed: false },
              { id: "w1d2s3", title: "Ôn mệnh đề quan hệ & câu gián tiếp", completed: false },
              { id: "w1d2s4", title: "Làm 20 câu trắc nghiệm ngữ pháp", completed: false }
            ]
          },
          {
            id: "w1d3",
            title: "Ngày 3: Từ vựng chủ đề Education & Work",
            desc: "Học 40 từ vựng VSTEP chủ đề Education và Work (A2-B1)",
            icon: "📝", target: "vstepVocab",
            navParams: { section: "vstepVocab", topic: "education" },
            prep: "Vào mục 'Từ vựng VSTEP' → chọn topic 'education'. Học 20 từ. Sau đó chọn topic 'work'. Học 20 từ. Ghi chép lại các từ mới vào sổ tay. Làm quiz từ vựng sau khi học.",
            subMilestones: [
              { id: "w1d3s1", title: "Học 20 từ vựng chủ đề Education", completed: false },
              { id: "w1d3s2", title: "Học 20 từ vựng chủ đề Work", completed: false },
              { id: "w1d3s3", title: "Làm quiz từ vựng (10 câu)", completed: false },
              { id: "w1d3s4", title: "Ghi chép từ mới vào sổ tay", completed: false }
            ]
          },
          {
            id: "w1d4",
            title: "Ngày 4: Làm quen Listening Part 1 (Bài 1-4)",
            desc: "Nghe 4 bài Part 1 - thông báo ngắn, tập trung bắt từ khóa",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 0 },
            prep: "Vào 'Luyện nghe' → Part 1. Làm lần lượt Bài 1 đến Bài 4. Mỗi bài 8 câu hỏi. Chiến thuật: đọc trước câu hỏi, gạch chân từ khóa, nghe lần 1 chọn đáp án, lần 2 kiểm tra lại.",
            subMilestones: [
              { id: "w1d4s1", title: "Nghe Listening P1 Bài 1 (8 câu)", completed: false },
              { id: "w1d4s2", title: "Nghe Listening P1 Bài 2 (8 câu)", completed: false },
              { id: "w1d4s3", title: "Nghe Listening P1 Bài 3 (8 câu)", completed: false },
              { id: "w1d4s4", title: "Nghe Listening P1 Bài 4 (8 câu)", completed: false }
            ]
          },
          {
            id: "w1d5",
            title: "Ngày 5: Reading Main Idea (Test 1-2)",
            desc: "Luyện kỹ năng đọc tìm ý chính - 2 bài test trong category 'Ý chính'",
            icon: "📖", target: "reading",
            navParams: { section: "reading", category: 0, test: 0 },
            prep: "Vào 'Luyện đọc' → 'Ý chính (Main Idea)'. Làm Test 1 và Test 2. Kỹ thuật: đọc câu đầu mỗi đoạn để tìm ý chính. Skimming toàn bài trước, sau đó scan chi tiết. Mỗi test 2 câu hỏi.",
            subMilestones: [
              { id: "w1d5s1", title: "Luyện kỹ thuật skimming", completed: false },
              { id: "w1d5s2", title: "Làm Test 1 - Main Idea", completed: false },
              { id: "w1d5s3", title: "Làm Test 2 - Main Idea", completed: false },
              { id: "w1d5s4", title: "Xem giải thích & học từ mới", completed: false }
            ]
          },
          {
            id: "w1d6",
            title: "Ngày 6: Speaking Part 1 - Social Interaction (6 topics)",
            desc: "Luyện nói 6 chủ đề Part 1: free time, hometown, family, travelling, friends, music",
            icon: "🗣️", target: "speaking",
            navParams: { section: "speaking", part: "part1", topicIndex: 0 },
            prep: "Vào 'Luyện nói' → Part 1. Luyện 6 topic đầu: Free time, Hometown, Family, Travelling, Friends, Music. Mỗi topic trả lời 2-3 câu hỏi. Ghi âm và nghe lại. Chú ý phát âm và ngữ điệu.",
            subMilestones: [
              { id: "w1d6s1", title: "Luyện topic Free Time & Hometown", completed: false },
              { id: "w1d6s2", title: "Luyện topic Family & Travelling", completed: false },
              { id: "w1d6s3", title: "Luyện topic Friends & Music", completed: false },
              { id: "w1d6s4", title: "Ghi âm & nghe lại 3 topic", completed: false }
            ]
          },
          {
            id: "w1d7",
            title: "Ngày 7: Writing Task 1 - Học cấu trúc Email + Viết 1 bài",
            desc: "Hướng dẫn Informal/Formal + Viết email thân mật đầu tiên",
            icon: "✉️", target: "writing",
            navParams: { section: "writing", task: "task1", testIndex: 0 },
            prep: "Vào 'Luyện viết' → Task 1. Đọc hướng dẫn 'Cách phân loại thư' và 'Thư thân mật'. Nắm cấu trúc: Dear → Mở bài → Thân bài → Kết bài → Best wishes. Viết Test 1 (Summer Camp). Kiểm tra 120 từ.",
            subMilestones: [
              { id: "w1d7s1", title: "Đọc hướng dẫn cách phân loại thư", completed: false },
              { id: "w1d7s2", title: "Đọc hướng dẫn thư thân mật", completed: false },
              { id: "w1d7s3", title: "Viết email Test 1 (Summer Camp)", completed: false },
              { id: "w1d7s4", title: "Kiểm tra số từ & ngữ pháp", completed: false }
            ]
          }
        ]
      },
      // ======================================================================
      // TUẦN 2: NỀN TẢNG LISTENING & READING
      // ======================================================================
      {
        id: "week2",
        title: "Tuần 2: Làm quen Listening & Reading",
        subtitle: "Ngày 8 → 14",
        color: "#8b5cf6",
        icon: "🎧",
        milestones: [
          {
            id: "w2d1",
            title: "Ngày 8: Ngữ pháp nâng cao + Từ vựng Health & Technology",
            desc: "Ôn các chủ điểm ngữ pháp nâng cao + 40 từ vựng chủ đề mới",
            icon: "📚", target: "grammar",
            prep: "Ôn ngữ pháp nâng cao: Câu ước, thể giả định, đảo ngữ, câu chẻ, mệnh đề trạng ngữ. Học 40 từ vựng chủ đề Health và Technology từ vstepVocab. Làm quiz từ vựng.",
            subMilestones: [
              { id: "w2d1s1", title: "Ôn ngữ pháp nâng cao (câu ước, đảo ngữ)", completed: false },
              { id: "w2d1s2", title: "Làm 15 câu trắc nghiệm ngữ pháp nâng cao", completed: false },
              { id: "w2d1s3", title: "Học 20 từ vựng chủ đề Health", completed: false },
              { id: "w2d1s4", title: "Học 20 từ vựng chủ đề Technology", completed: false }
            ]
          },
          {
            id: "w2d2",
            title: "Ngày 9: Listening Part 1 (Bài 5-8) + Reading Vocabulary",
            desc: "Nghe 4 bài Part 1 tiếp + luyện đọc tìm từ vựng trong ngữ cảnh",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 4 },
            prep: "Vào 'Luyện nghe' → Part 1. Làm Bài 5-8 (4 bài × 8 câu = 32 câu). Áp dụng chiến thuật: nghe keyword, loại trừ đáp án sai. Sau đó vào 'Luyện đọc' → 'Vocabulary' làm Test 1-2.",
            subMilestones: [
              { id: "w2d2s1", title: "Nghe Listening P1 Bài 5-6", completed: false },
              { id: "w2d2s2", title: "Nghe Listening P1 Bài 7-8", completed: false },
              { id: "w2d2s3", title: "Làm Reading Vocabulary Test 1", completed: false },
              { id: "w2d2s4", title: "Làm Reading Vocabulary Test 2", completed: false }
            ]
          },
          {
            id: "w2d3",
            title: "Ngày 10: Listening Part 1 (Bài 9-12) + Reading Detail",
            desc: "Hoàn thành nốt Part 1 + luyện đọc tìm chi tiết",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 8 },
            prep: "Vào 'Luyện nghe' → Part 1. Làm Bài 9-12 (4 bài cuối Part 1). Tổng cộng đã hoàn thành 12 bài Part 1 = 96 câu. Vào 'Luyện đọc' → 'Detail'. Làm Test 1-2 (đọc tìm thông tin chi tiết).",
            subMilestones: [
              { id: "w2d3s1", title: "Nghe Listening P1 Bài 9-10", completed: false },
              { id: "w2d3s2", title: "Nghe Listening P1 Bài 11-12", completed: false },
              { id: "w2d3s3", title: "Làm Reading Detail Test 1", completed: false },
              { id: "w2d3s4", title: "Làm Reading Detail Test 2", completed: false }
            ]
          },
          {
            id: "w2d4",
            title: "Ngày 11: Speaking Part 1 (6 topics tiếp) + từ vựng Environment",
            desc: "Luyện nói 6 topics Part 1 + học từ vựng chủ đề Environment",
            icon: "🗣️", target: "speaking",
            navParams: { section: "speaking", part: "part1", topicIndex: 6 },
            prep: "Vào 'Luyện nói' → Part 1. Luyện 6 topic: Transportation, Clothes, Communication, Reading, Movies, Work. Mỗi topic 2-3 câu trả lời. Học 20 từ vựng chủ đề Environment.",
            subMilestones: [
              { id: "w2d4s1", title: "Luyện topic Transport & Clothes", completed: false },
              { id: "w2d4s2", title: "Luyện topic Communication & Reading", completed: false },
              { id: "w2d4s3", title: "Luyện topic Movies & Work", completed: false },
              { id: "w2d4s4", title: "Học 20 từ vựng chủ đề Environment", completed: false }
            ]
          },
          {
            id: "w2d5",
            title: "Ngày 12: Writing Task 1 (Test 2-3) + Formal Letters",
            desc: "Luyện viết email thân mật Test 2 + thư trang trọng Test 3",
            icon: "✉️", target: "writing",
            navParams: { section: "writing", task: "task1", testIndex: 1 },
            prep: "Vào 'Luyện viết' → Task 1. Đọc hướng dẫn 'Thư trang trọng'. Viết Test 2 (Travel Advice - informal). Viết Test 3 (Introduce a friend - informal). Đảm bảo đúng format, đủ 120 từ.",
            subMilestones: [
              { id: "w2d5s1", title: "Đọc hướng dẫn thư trang trọng", completed: false },
              { id: "w2d5s2", title: "Viết email Test 2 (Travel Advice)", completed: false },
              { id: "w2d5s3", title: "Viết email Test 3 (Giới thiệu bạn)", completed: false },
              { id: "w2d5s4", title: "Kiểm tra từ vựng & ngữ pháp", completed: false }
            ]
          },
          {
            id: "w2d6",
            title: "Ngày 13: Reading Inference + Other (4 tests)",
            desc: "Luyện đọc suy luận và các dạng câu hỏi khác",
            icon: "📖", target: "reading",
            navParams: { section: "reading", category: 3, test: 0 },
            prep: "Vào 'Luyện đọc' → 'Inference'. Làm Test 1-2 (suy luận từ đoạn văn). Vào 'Other'. Làm Test 1-2 (các dạng câu hỏi khác: mục đích, thái độ, tham chiếu). Tổng cộng 4 test = ~8 câu hỏi.",
            subMilestones: [
              { id: "w2d6s1", title: "Làm Reading Inference Test 1", completed: false },
              { id: "w2d6s2", title: "Làm Reading Inference Test 2", completed: false },
              { id: "w2d6s3", title: "Làm Reading Other Test 1", completed: false },
              { id: "w2d6s4", title: "Làm Reading Other Test 2", completed: false }
            ]
          },
          {
            id: "w2d7",
            title: "Ngày 14: Ôn tập tuần 1-2 + Mini Test",
            desc: "Làm bài kiểm tra tổng hợp giữa các kỹ năng",
            icon: "🔄", target: "self-assessment",
            prep: "Làm 1 bài Listening rút gọn (Part 1, 2 bài). Làm 1 bài Reading rút gọn (Main Idea Test 1). Viết 1 email Task 1 (Test 4 - formal). Nói Part 1 (3 topics bất kỳ). Đánh giá lại điểm mạnh/yếu sau 2 tuần.",
            subMilestones: [
              { id: "w2d7s1", title: "Làm Listening P1 (2 bài bất kỳ)", completed: false },
              { id: "w2d7s2", title: "Làm Reading Main Idea Test 1", completed: false },
              { id: "w2d7s3", title: "Viết email Task 1 Test 4 (Formal)", completed: false },
              { id: "w2d7s4", title: "Đánh giá lại bảng Self Assessment", completed: false }
            ]
          }
        ]
      },
      // ======================================================================
      // TUẦN 3: PHÁT TRIỂN KỸ NĂNG NGHE & ĐỌC SÂU
      // ======================================================================
      {
        id: "week3",
        title: "Tuần 3: Phát triển Nghe & Đọc chuyên sâu",
        subtitle: "Ngày 15 → 21",
        color: "#ec4899",
        icon: "🎯",
        milestones: [
          {
            id: "w3d1",
            title: "Ngày 15: Từ vựng Travel, Culture + Essay Vocab",
            desc: "Học 40 từ vựng + từ vựng essay chủ đề du lịch và văn hóa",
            icon: "📝", target: "vstepVocab",
            navParams: { section: "vstepVocab", topic: "travel" },
            prep: "Học 20 từ vựng chủ đề Travel, 20 từ chủ đề Culture từ vstepVocab. Vào 'Từ vựng Essay' đọc topic Tourism. Học collocations: tourist attraction, cultural heritage, travel industry, local cuisine.",
            subMilestones: [
              { id: "w3d1s1", title: "Học 20 từ vựng chủ đề Travel", completed: false },
              { id: "w3d1s2", title: "Học 20 từ vựng chủ đề Culture", completed: false },
              { id: "w3d1s3", title: "Đọc Essay Vocab topic Tourism", completed: false },
              { id: "w3d1s4", title: "Ghi chép 10 collocations mới", completed: false }
            ]
          },
          {
            id: "w3d2",
            title: "Ngày 16: Listening Part 2 (Bài 1-5) - Hội thoại dài",
            desc: "Bắt đầu luyện Part 2 với 5 bài hội thoại dài 2-3 người",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 1, exercise: 0 },
            prep: "Vào 'Luyện nghe' → Part 2. Làm 5 bài đầu (Bài 1-5). Kỹ thuật: đọc trước câu hỏi, ghi chú nhanh khi nghe, tập trung vào thông tin: ai, cái gì, khi nào, ở đâu, tại sao.",
            subMilestones: [
              { id: "w3d2s1", title: "Nghe Listening P2 Bài 1", completed: false },
              { id: "w3d2s2", title: "Nghe Listening P2 Bài 2", completed: false },
              { id: "w3d2s3", title: "Nghe Listening P2 Bài 3", completed: false },
              { id: "w3d2s4", title: "Nghe Listening P2 Bài 4-5", completed: false }
            ]
          },
          {
            id: "w3d3",
            title: "Ngày 17: Reading Comprehensive + Speaking P1 nâng cao",
            desc: "Luyện đọc tổng hợp + nói Part 1 phản xạ nhanh",
            icon: "📖", target: "reading",
            navParams: { section: "reading", category: 5, test: 0 },
            prep: "Vào 'Luyện đọc' → 'Comprehensive'. Làm Test 1 (bài đọc dài 10 câu hỏi - full passage). Vào 'Luyện nói' → Part 1. Luyện thêm 4 topics: SchoolStudy, Food, Learning English, Weather.",
            subMilestones: [
              { id: "w3d3s1", title: "Làm Reading Comprehensive Test 1", completed: false },
              { id: "w3d3s2", title: "Xem giải thích từ vựng trong bài", completed: false },
              { id: "w3d3s3", title: "Luyện Speaking P1: School & Food", completed: false },
              { id: "w3d3s4", title: "Luyện Speaking P1: English & Weather", completed: false }
            ]
          },
          {
            id: "w3d4",
            title: "Ngày 18: Listening Part 2 (Bài 6-12) + Từ vựng Health",
            desc: "Luyện 7 bài Part 2 tiếp theo + ôn từ vựng sức khỏe",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 1, exercise: 5 },
            prep: "Vào 'Luyện nghe' → Part 2. Làm Bài 6-12 (7 bài). Tập trung vào câu hỏi True/False/Not Given và thái độ người nói. Học 20 từ vựng chủ đề Health qua flashcards.",
            subMilestones: [
              { id: "w3d4s1", title: "Nghe Listening P2 Bài 6-8", completed: false },
              { id: "w3d4s2", title: "Nghe Listening P2 Bài 9-10", completed: false },
              { id: "w3d4s3", title: "Nghe Listening P2 Bài 11-12", completed: false },
              { id: "w3d4s4", title: "Ôn 20 từ vựng Health qua flashcards", completed: false }
            ]
          },
          {
            id: "w3d5",
            title: "Ngày 19: Writing Task 2 - Học cấu trúc Essay + Viết bài 1",
            desc: "Nắm cấu trúc 4 đoạn của essay VSTEP + viết test 1",
            icon: "📝", target: "writing",
            navParams: { section: "writing", task: "task2", testIndex: 0 },
            prep: "Vào 'Luyện viết' → Task 2. Đọc hướng dẫn 'Cấu trúc bài luận', 'Mở bài', 'Kết bài', 'Viết đoạn văn'. Viết Test 1 (University education vs vocational training). Đảm bảo cấu trúc 4 đoạn, 250 từ.",
            subMilestones: [
              { id: "w3d5s1", title: "Đọc hướng dẫn cấu trúc essay", completed: false },
              { id: "w3d5s2", title: "Đọc hướng dẫn mở bài & kết bài", completed: false },
              { id: "w3d5s3", title: "Viết essay Test 1 (University education)", completed: false },
              { id: "w3d5s4", title: "Kiểm tra 250 từ & từ nối", completed: false }
            ]
          },
          {
            id: "w3d6",
            title: "Ngày 20: Speaking Part 2 - Solution Discussion (Test 1-4)",
            desc: "Luyện nói Part 2: thảo luận giải pháp với 4 test đầu",
            icon: "🗣️", target: "speaking",
            navParams: { section: "speaking", part: "part2", topicIndex: 0 },
            prep: "Vào 'Luyện nói' → Part 2. Làm Test 1-4. Kỹ thuật: (1) identify problem, (2) propose solution, (3) explain benefits. Mỗi test khoảng 4 phút. Ghi âm và tự đánh giá.",
            subMilestones: [
              { id: "w3d6s1", title: "Luyện Speaking P2 Test 1", completed: false },
              { id: "w3d6s2", title: "Luyện Speaking P2 Test 2", completed: false },
              { id: "w3d6s3", title: "Luyện Speaking P2 Test 3", completed: false },
              { id: "w3d6s4", title: "Luyện Speaking P2 Test 4", completed: false }
            ]
          },
          {
            id: "w3d7",
            title: "Ngày 21: Writing Task 1 (Test 4-6) - Formal letters",
            desc: "Luyện viết 3 thư trang trọng: phản hồi thư viện, tình nguyện, phản hồi xe buýt",
            icon: "✉️", target: "writing",
            navParams: { section: "writing", task: "task1", testIndex: 3 },
            prep: "Vào 'Luyện viết' → Task 1. Viết lần lượt Test 4 (Library feedback - formal), Test 5 (Volunteer application - formal), Test 6 (Bus service feedback - formal). Chú ý ngôn ngữ trang trọng, không viết tắt.",
            subMilestones: [
              { id: "w3d7s1", title: "Viết email Test 4 (Library feedback)", completed: false },
              { id: "w3d7s2", title: "Viết email Test 5 (Volunteer)", completed: false },
              { id: "w3d7s3", title: "Viết email Test 6 (Bus feedback)", completed: false },
              { id: "w3d7s4", title: "So sánh với bài mẫu & sửa lỗi", completed: false }
            ]
          }
        ]
      },
      // ======================================================================
      // TUẦN 4: LUYỆN CHUYÊN SÂU 4 KỸ NĂNG
      // ======================================================================
      {
        id: "week4",
        title: "Tuần 4: Luyện chuyên sâu 4 kỹ năng",
        subtitle: "Ngày 22 → 28",
        color: "#f59e0b",
        icon: "🔥",
        milestones: [
          {
            id: "w4d1",
            title: "Ngày 22: Listening Part 2 (Bài 13-20) + Từ vựng Economy",
            desc: "Luyện 8 bài Part 2: hội thoại dài nâng cao",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 1, exercise: 12 },
            prep: "Vào 'Luyện nghe' → Part 2. Làm Bài 13-20 (8 bài). Tập trung vào câu hỏi suy luận và thái độ. Học 20 từ vựng chủ đề Economy.",
            subMilestones: [
              { id: "w4d1s1", title: "Nghe Listening P2 Bài 13-16", completed: false },
              { id: "w4d1s2", title: "Nghe Listening P2 Bài 17-20", completed: false },
              { id: "w4d1s3", title: "Học 20 từ vựng chủ đề Economy", completed: false },
              { id: "w4d1s4", title: "Ghi chú lỗi sai từ các bài nghe", completed: false }
            ]
          },
          {
            id: "w4d2",
            title: "Ngày 23: Writing Task 2 (Test 2-3) - Opinion Essays",
            desc: "Viết 2 bài opinion essay: lương VĐV và job satisfaction",
            icon: "📝", target: "writing",
            navParams: { section: "writing", task: "task2", testIndex: 1 },
            prep: "Vào 'Luyện viết' → Task 2. Viết Test 2 (Athletes vs teachers salary - opinion). Viết Test 3 (Job satisfaction vs high salary). Luyện viết balanced opinion: nêu cả 2 mặt trước khi kết luận.",
            subMilestones: [
              { id: "w4d2s1", title: "Đọc hướng dẫn Opinion Essay", completed: false },
              { id: "w4d2s2", title: "Viết essay Test 2 (Athletes salary)", completed: false },
              { id: "w4d2s3", title: "Viết essay Test 3 (Job satisfaction)", completed: false },
              { id: "w4d2s4", title: "Kiểm tra từ nối & lỗi ngữ pháp", completed: false }
            ]
          },
          {
            id: "w4d3",
            title: "Ngày 24: Speaking Part 2 (Test 5-8) + Ý tưởng Ideas",
            desc: "Luyện nói 4 test Part 2 + đọc ý tưởng từ vstepIdeaData",
            icon: "🗣️", target: "speaking",
            navParams: { section: "speaking", part: "part2", topicIndex: 4 },
            prep: "Vào 'Luyện nói' → Part 2. Làm Test 5-8. Vào phần 'Khác' → 'Kho ý tưởng'. Đọc các chủ đề: Education, Environment, Technology để lấy ý tưởng cho Speaking.",
            subMilestones: [
              { id: "w4d3s1", title: "Luyện Speaking P2 Test 5-6", completed: false },
              { id: "w4d3s2", title: "Luyện Speaking P2 Test 7-8", completed: false },
              { id: "w4d3s3", title: "Đọc ý tưởng từ vstepIdeaData (3 topics)", completed: false },
              { id: "w4d3s4", title: "Ghi âm 2 Test Part 2", completed: false }
            ]
          },
          {
            id: "w4d4",
            title: "Ngày 25: Listening Part 2 (Bài 21-28) + Từ vựng Science",
            desc: "Luyện 8 bài Part 2 + học từ vựng khoa học",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 1, exercise: 20 },
            prep: "Vào 'Luyện nghe' → Part 2. Làm Bài 21-28 (8 bài). Chú ý các bẫy thường gặp: thông tin sai lệch, đáp án gây nhiễu. Học 20 từ vựng chủ đề Science.",
            subMilestones: [
              { id: "w4d4s1", title: "Nghe Listening P2 Bài 21-24", completed: false },
              { id: "w4d4s2", title: "Nghe Listening P2 Bài 25-28", completed: false },
              { id: "w4d4s3", title: "Học 20 từ vựng chủ đề Science", completed: false },
              { id: "w4d4s4", title: "Phân tích lỗi sai & học từ mới", completed: false }
            ]
          },
          {
            id: "w4d5",
            title: "Ngày 26: Reading All Categories Review + Essay Vocab",
            desc: "Ôn lại tất cả dạng bài đọc + từ vựng essay nâng cao",
            icon: "📖", target: "reading",
            navParams: { section: "reading", category: 0, test: 0 },
            prep: "Vào 'Luyện đọc', làm 1 test mỗi category: Main Idea Test 1, Vocabulary Test 1, Detail Test 1, Inference Test 1. Vào 'Từ vựng Essay' đọc topic Environment & Technology.",
            subMilestones: [
              { id: "w4d5s1", title: "Ôn Main Idea & Vocabulary (mỗi loại 1 test)", completed: false },
              { id: "w4d5s2", title: "Ôn Detail & Inference (mỗi loại 1 test)", completed: false },
              { id: "w4d5s3", title: "Đọc Essay Vocab topic Environment", completed: false },
              { id: "w4d5s4", title: "Đọc Essay Vocab topic Technology", completed: false }
            ]
          },
          {
            id: "w4d6",
            title: "Ngày 27: Speaking Part 3 (Test 1-4) - Topic Development",
            desc: "Luyện Part 3: phát triển chủ đề với 4 test đầu",
            icon: "💬", target: "speaking",
            navParams: { section: "speaking", part: "part3", topicIndex: 0 },
            prep: "Vào 'Luyện nói' → Part 3. Làm Test 1 (Online Learning), Test 2 (Living in countryside), Test 3 (Living in city), Test 4 (Internet). Mỗi test ~5 phút. Cấu trúc: Introduction → Main points → Conclusion.",
            subMilestones: [
              { id: "w4d6s1", title: "Luyện Speaking P3 Test 1 (Online Learning)", completed: false },
              { id: "w4d6s2", title: "Luyện Speaking P3 Test 2 (Countryside)", completed: false },
              { id: "w4d6s3", title: "Luyện Speaking P3 Test 3-4 (City & Internet)", completed: false },
              { id: "w4d6s4", title: "Ghi âm & tự chấm điểm", completed: false }
            ]
          },
          {
            id: "w4d7",
            title: "Ngày 28: Writing Task 1 (Test 7-9) + Task 2 Test 4",
            desc: "Luyện viết 3 email + 1 essay cause-effect",
            icon: "✉️", target: "writing",
            navParams: { section: "writing", task: "task1", testIndex: 6 },
            prep: "Vào 'Luyện viết'. Task 1: Viết Test 7 (Moving house - informal), Test 8 (Tet holiday - informal), Test 9 (New city - informal). Task 2: Viết Test 4 (Traffic jams - cause/solution).",
            subMilestones: [
              { id: "w4d7s1", title: "Viết email Test 7-8 (informal)", completed: false },
              { id: "w4d7s2", title: "Viết email Test 9 (New city)", completed: false },
              { id: "w4d7s3", title: "Viết essay Test 4 (Traffic jams)", completed: false },
              { id: "w4d7s4", title: "So sánh với bài mẫu & sửa lỗi", completed: false }
            ]
          }
        ]
      }
    ,
      // ======================================================================
      // TUẦN 5: MỞ RỘNG - ESSAY & IDEA BANK
      // ======================================================================
      {
        id: "week5",
        title: "Tuần 5: Mở rộng - Essay & Kho ý tưởng",
        subtitle: "Ngày 29 → 35",
        color: "#10b981",
        icon: "💡",
        milestones: [
          {
            id: "w5d1",
            title: "Ngày 29: Đọc 10 bài essay mẫu từ EssayBook",
            desc: "Đọc và phân tích 10 essay mẫu song ngữ từ vstepEssayBookData",
            icon: "📖", target: "khac",
            prep: "Vào phần 'Khác' → 'Sách Essay'. Đọc 10 bài essay mẫu đầu tiên. Ghi chú: cấu trúc, từ vựng hay, cách triển khai ý. Học 5 mẫu câu hay từ mỗi bài.",
            subMilestones: [
              { id: "w5d1s1", title: "Đọc 5 bài essay mẫu đầu", completed: false },
              { id: "w5d1s2", title: "Đọc 5 bài essay mẫu tiếp", completed: false },
              { id: "w5d1s3", title: "Ghi chép 10 mẫu câu hay", completed: false },
              { id: "w5d1s4", title: "Ghi chú cấu trúc & từ vựng mới", completed: false }
            ]
          },
          {
            id: "w5d2",
            title: "Ngày 30: Listening Part 3 (Bài 1-8) - Độc thoại/Bài giảng",
            desc: "Bắt đầu Part 3 với 8 bài độc thoại dài",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 2, exercise: 0 },
            prep: "Vào 'Luyện nghe' → Part 3. Làm Bài 1-8 (8 bài). Part 3 là các bài giảng/độc thoại dài. Chiến thuật: nghe lấy ý chính trước, nghe lại lần 2 lấy chi tiết.",
            subMilestones: [
              { id: "w5d2s1", title: "Nghe Listening P3 Bài 1-4", completed: false },
              { id: "w5d2s2", title: "Nghe Listening P3 Bài 5-8", completed: false },
              { id: "w5d2s3", title: "Xem transcript & học từ mới", completed: false },
              { id: "w5d2s4", title: "Luyện tập shadowing 1 bài", completed: false }
            ]
          },
          {
            id: "w5d3",
            title: "Ngày 31: Kho ý tưởng (vstepIdeaData) - 6 topics",
            desc: "Đọc ý tưởng cho 6 topics thi writing/speaking",
            icon: "💡", target: "khac",
            prep: "Vào phần 'Khác' → 'Kho ý tưởng'. Đọc lần lượt: Tourism, Government, Globalization, Media & Advertising, Technology, Environment. Ghi chép pros/cons cho mỗi topic.",
            subMilestones: [
              { id: "w5d3s1", title: "Đọc ý tưởng Tourism & Government", completed: false },
              { id: "w5d3s2", title: "Đọc ý tưởng Globalization & Media", completed: false },
              { id: "w5d3s3", title: "Đọc ý tưởng Technology & Environment", completed: false },
              { id: "w5d3s4", title: "Ghi chép pros/cons cho 6 topics", completed: false }
            ]
          },
          {
            id: "w5d4",
            title: "Ngày 32: Listening Part 3 (Bài 9-16) + Từ vựng Media",
            desc: "Luyện 8 bài Part 3 tiếp + học từ vựng chủ đề Media",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 2, exercise: 8 },
            prep: "Vào 'Luyện nghe' → Part 3. Làm Bài 9-16 (8 bài). Tập trung nhận diện ý kiến người nói (agree/disagree), mục đích bài nói. Học 20 từ vựng chủ đề Media & Communication.",
            subMilestones: [
              { id: "w5d4s1", title: "Nghe Listening P3 Bài 9-12", completed: false },
              { id: "w5d4s2", title: "Nghe Listening P3 Bài 13-16", completed: false },
              { id: "w5d4s3", title: "Học 20 từ vựng Media & Communication", completed: false },
              { id: "w5d4s4", title: "Phân tích lỗi sai", completed: false }
            ]
          },
          {
            id: "w5d5",
            title: "Ngày 33: Writing Task 2 (Test 5-6) - Discussion Essays",
            desc: "Viết 2 bài discussion essay: gender roles & university aims",
            icon: "📝", target: "writing",
            navParams: { section: "writing", task: "task2", testIndex: 4 },
            prep: "Vào 'Luyện viết' → Task 2. Viết Test 5 (Gender roles - opinion). Viết Test 6 (University aims - discussion). Áp dụng các ý tưởng đã học từ vstepIdeaData. Kiểm tra từ nối và cấu trúc câu.",
            subMilestones: [
              { id: "w5d5s1", title: "Viết essay Test 5 (Gender roles)", completed: false },
              { id: "w5d5s2", title: "Viết essay Test 6 (University aims)", completed: false },
              { id: "w5d5s3", title: "Đọc lại & sửa lỗi ngữ pháp", completed: false },
              { id: "w5d5s4", title: "So sánh với bài mẫu", completed: false }
            ]
          },
          {
            id: "w5d6",
            title: "Ngày 34: Speaking Part 3 (Test 5-8) + Ý tưởng còn lại",
            desc: "Luyện 4 test Part 3 + đọc nốt ý tưởng từ vstepIdeaData",
            icon: "💬", target: "speaking",
            navParams: { section: "speaking", part: "part3", topicIndex: 4 },
            prep: "Vào 'Luyện nói' → Part 3. Làm Test 5 (Taking photos), Test 6 (Watching films), Test 7 (Healthy breakfast), Test 8 (Vietnam tourism). Luyện nói trôi chảy, có dẫn chứng cụ thể.",
            subMilestones: [
              { id: "w5d6s1", title: "Luyện Speaking P3 Test 5-6", completed: false },
              { id: "w5d6s2", title: "Luyện Speaking P3 Test 7-8", completed: false },
              { id: "w5d6s3", title: "Đọc ý tưởng: Health, Education, Transport", completed: false },
              { id: "w5d6s4", title: "Ghi âm 2 test và tự đánh giá", completed: false }
            ]
          },
          {
            id: "w5d7",
            title: "Ngày 35: Writing Task 1 (Test 10-12) + Task 2 Test 7",
            desc: "Hoàn thành nốt Task 1 + viết essay studying abroad",
            icon: "✉️", target: "writing",
            navParams: { section: "writing", task: "task1", testIndex: 9 },
            prep: "Vào 'Luyện viết'. Task 1: Viết Test 10 (Thank you + invitation), Test 11 (Birthday party - formal), Test 12 (New school - informal). Task 2: Viết Test 7 (Studying abroad).",
            subMilestones: [
              { id: "w5d7s1", title: "Viết email Test 10 (Thank you)", completed: false },
              { id: "w5d7s2", title: "Viết email Test 11-12", completed: false },
              { id: "w5d7s3", title: "Viết essay Test 7 (Studying abroad)", completed: false },
              { id: "w5d7s4", title: "Tổng kết lỗi thường gặp", completed: false }
            ]
          }
        ]
      },
      // ======================================================================
      // TUẦN 6: LUYỆN ĐỀ - FULL TEST SIMULATION
      // ======================================================================
      {
        id: "week6",
        title: "Tuần 6: Luyện đề - Thi thử toàn phần",
        subtitle: "Ngày 36 → 42",
        color: "#ef4444",
        icon: "📝",
        milestones: [
          {
            id: "w6d1",
            title: "Ngày 36: Listening Part 3 (Bài 17-25) + Reading Review",
            desc: "Luyện 9 bài Part 3 + ôn đọc toàn bộ kỹ năng",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 2, exercise: 16 },
            prep: "Vào 'Luyện nghe' → Part 3. Làm Bài 17-25 (9 bài). Vào 'Luyện đọc', làm lại 1 test mỗi category đã sai nhiều nhất từ sổ lỗi.",
            subMilestones: [
              { id: "w6d1s1", title: "Nghe Listening P3 Bài 17-21", completed: false },
              { id: "w6d1s2", title: "Nghe Listening P3 Bài 22-25", completed: false },
              { id: "w6d1s3", title: "Ôn các bài Reading đã sai", completed: false },
              { id: "w6d1s4", title: "Ghi chú lỗi vào sổ tay", completed: false }
            ]
          },
          {
            id: "w6d2",
            title: "Ngày 37: Full Test #1 - Làm Listening + Reading",
            desc: "Thi thử Listening (40 ph) + Reading (60 ph) bấm giờ",
            icon: "⏱️", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 0 },
            prep: "Tự tạo đề thi thử: chọn 2 bài Part 1, 3 bài Part 2, 2 bài Part 3 cho Listening. Chọn 1 test mỗi category cho Reading. Bấm giờ nghiêm túc. Không tra từ điển.",
            subMilestones: [
              { id: "w6d2s1", title: "Làm Listening 40 phút (tự ghép đề)", completed: false },
              { id: "w6d2s2", title: "Làm Reading 60 phút (tự ghép đề)", completed: false },
              { id: "w6d2s3", title: "Kiểm tra đáp án & tính điểm", completed: false },
              { id: "w6d2s4", title: "Phân tích lỗi sai chi tiết", completed: false }
            ]
          },
          {
            id: "w6d3",
            title: "Ngày 38: Full Test #1 - Làm Writing + Speaking",
            desc: "Viết email + essay + nói 3 phần",
            icon: "📝", target: "writing",
            navParams: { section: "writing", task: "task1", testIndex: 0 },
            prep: "Chọn 1 đề Task 1 bất kỳ (20 phút) + 1 đề Task 2 bất kỳ (40 phút) từ vstepWritingData. Speaking: chọn 2 topic Part 1 + 1 test Part 2 + 1 test Part 3. Ghi âm toàn bộ.",
            subMilestones: [
              { id: "w6d3s1", title: "Viết Task 1 (20 phút)", completed: false },
              { id: "w6d3s2", title: "Viết Task 2 (40 phút)", completed: false },
              { id: "w6d3s3", title: "Nói Part 1 + Part 2", completed: false },
              { id: "w6d3s4", title: "Nói Part 3 + tổng kết điểm", completed: false }
            ]
          },
          {
            id: "w6d4",
            title: "Ngày 39: Listening Part 3 (Bài 26-33) + Kho ý tưởng",
            desc: "Luyện 8 bài Part 3 + đọc nốt các ý tưởng còn lại",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 2, exercise: 25 },
            prep: "Vào 'Luyện nghe' → Part 3. Làm Bài 26-33 (8 bài). Vào 'Khác' → 'Kho ý tưởng'. Đọc nốt các topic: Crime, Food, Family, Work.",
            subMilestones: [
              { id: "w6d4s1", title: "Nghe Listening P3 Bài 26-29", completed: false },
              { id: "w6d4s2", title: "Nghe Listening P3 Bài 30-33", completed: false },
              { id: "w6d4s3", title: "Đọc ý tưởng: Crime, Food, Family, Work", completed: false },
              { id: "w6d4s4", title: "Luyện shadowing 2 bài nghe", completed: false }
            ]
          },
          {
            id: "w6d5",
            title: "Ngày 40: Writing Task 2 (Test 8-10) + Đọc essay mẫu",
            desc: "Viết 3 essays + đọc 10 bài essay mẫu tiếp",
            icon: "📝", target: "writing",
            navParams: { section: "writing", task: "task2", testIndex: 7 },
            prep: "Viết Test 8 (Overpopulation - effects/solutions), Test 9 (Unemployment), Test 10 (Teachers vs Internet). Vào 'Khác' → 'Sách Essay' đọc 10 bài mẫu tiếp theo.",
            subMilestones: [
              { id: "w6d5s1", title: "Viết essay Test 8 (Overpopulation)", completed: false },
              { id: "w6d5s2", title: "Viết essay Test 9 (Unemployment)", completed: false },
              { id: "w6d5s3", title: "Viết essay Test 10 (Teachers vs Internet)", completed: false },
              { id: "w6d5s4", title: "Đọc 10 bài essay mẫu", completed: false }
            ]
          },
          {
            id: "w6d6",
            title: "Ngày 41: Speaking Part 2 (Test 9-12) + Part 3 (Test 9-11)",
            desc: "Hoàn thành nốt các bài Speaking còn lại",
            icon: "🗣️", target: "speaking",
            navParams: { section: "speaking", part: "part2", topicIndex: 8 },
            prep: "Vào 'Luyện nói'. Part 2: làm nốt Test 9-12 (4 test). Part 3: làm Test 9 (Face-to-face communication), Test 10 (Parents are best teachers), Test 11 (tự chọn). Tổng cộng 7 bài nói.",
            subMilestones: [
              { id: "w6d6s1", title: "Luyện Speaking P2 Test 9-10", completed: false },
              { id: "w6d6s2", title: "Luyện Speaking P2 Test 11-12", completed: false },
              { id: "w6d6s3", title: "Luyện Speaking P3 Test 9-11", completed: false },
              { id: "w6d6s4", title: "Ghi âm & tự đánh giá tổng thể", completed: false }
            ]
          },
          {
            id: "w6d7",
            title: "Ngày 42: Full Test #2 - Toàn bộ 4 kỹ năng",
            desc: "Thi thử lần 2: 4 kỹ năng liên hoàn, bấm giờ",
            icon: "📄", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 0 },
            prep: "Thi thử toàn phần lần 2: Listening → Reading → Writing → Speaking. Tự ghép đề từ các bài chưa làm. Ghi điểm từng phần. So sánh với Full Test #1 để thấy tiến bộ.",
            subMilestones: [
              { id: "w6d7s1", title: "Full Test #2: Listening + Reading", completed: false },
              { id: "w6d7s2", title: "Full Test #2: Writing + Speaking", completed: false },
              { id: "w6d7s3", title: "Chấm điểm & phân tích lỗi", completed: false },
              { id: "w6d7s4", title: "So sánh kết quả với Full Test #1", completed: false }
            ]
          }
        ]
      },
      // ======================================================================
      // TUẦN 7: TĂNG TỐC & SỬA LỖI
      // ======================================================================
      {
        id: "week7",
        title: "Tuần 7: Tăng tốc & Sửa lỗi",
        subtitle: "Ngày 43 → 49",
        color: "#f97316",
        icon: "⚡",
        milestones: [
          {
            id: "w7d1",
            title: "Ngày 43: Listening Part 3 (Bài 34-41) cuối cùng",
            desc: "Hoàn thành nốt Part 3 (8 bài cuối) + tổng kết lỗi",
            icon: "🎧", target: "listening",
            navParams: { section: "listening", part: 2, exercise: 33 },
            prep: "Vào 'Luyện nghe' → Part 3. Làm nốt Bài 34-41 (8 bài cuối). Tổng kết: 12 bài P1 + 37 bài P2 + 41 bài P3 = 90 bài nghe. Ghi lại tỷ lệ đúng/sai tổng thể.",
            subMilestones: [
              { id: "w7d1s1", title: "Nghe Listening P3 Bài 34-37", completed: false },
              { id: "w7d1s2", title: "Nghe Listening P3 Bài 38-41", completed: false },
              { id: "w7d1s3", title: "Tổng kết tỷ lệ đúng/sai toàn bộ Listening", completed: false },
              { id: "w7d1s4", title: "Ôn lại các dạng câu hỏi hay sai", completed: false }
            ]
          },
          {
            id: "w7d2",
            title: "Ngày 44: Reading tổng hợp - Làm hết các test còn thiếu",
            desc: "Hoàn thành tất cả bài Reading còn sót",
            icon: "📖", target: "reading",
            navParams: { section: "reading", category: 0, test: 0 },
            prep: "Kiểm tra list reading đã hoàn thành. Làm nốt các test còn thiếu. Tổng cộng 11 tests: 2 Main Idea + 2 Vocabulary + 2 Detail + 2 Inference + 2 Other + 1 Comprehensive. Ghi lại các lỗi điển hình.",
            subMilestones: [
              { id: "w7d2s1", title: "Làm nốt các test Main Idea & Vocabulary", completed: false },
              { id: "w7d2s2", title: "Làm nốt các test Detail & Inference", completed: false },
              { id: "w7d2s3", title: "Làm nốt các test Other & Comprehensive", completed: false },
              { id: "w7d2s4", title: "Tổng kết sổ lỗi Reading", completed: false }
            ]
          },
          {
            id: "w7d3",
            title: "Ngày 45: Writing Task 2 (Test 11-14) - Online Learning & Shopping",
            desc: "Viết 4 essays: video games, online learning, internet info, online shopping",
            icon: "📝", target: "writing",
            navParams: { section: "writing", task: "task2", testIndex: 10 },
            prep: "Viết Test 11 (Video games), Test 12 (Online learning), Test 13 (Internet info), Test 14 (Online shopping). Mỗi bài 40 phút. Tập trung vào viết đúng cấu trúc 4 đoạn.",
            subMilestones: [
              { id: "w7d3s1", title: "Viết essay Test 11 (Video games)", completed: false },
              { id: "w7d3s2", title: "Viết essay Test 12 (Online learning)", completed: false },
              { id: "w7d3s3", title: "Viết essay Test 13-14 (Internet & Shopping)", completed: false },
              { id: "w7d3s4", title: "So sánh với bài mẫu & sửa lỗi", completed: false }
            ]
          },
          {
            id: "w7d4",
            title: "Ngày 46: Writing Task 2 (Test 15-17) cuối cùng",
            desc: "Viết nốt 3 essays cuối cùng để hoàn thành toàn bộ Task 2",
            icon: "✍️", target: "writing",
            navParams: { section: "writing", task: "task2", testIndex: 14 },
            prep: "Viết Test 15 (Extracurricular activities), Test 16 (Air pollution), Test 17 (Multitasking). Tổng cộng 17 essays Task 2 đã hoàn thành. Xem lại sổ lỗi Writing để tránh lặp lại.",
            subMilestones: [
              { id: "w7d4s1", title: "Viết essay Test 15 (Extracurricular)", completed: false },
              { id: "w7d4s2", title: "Viết essay Test 16 (Air pollution)", completed: false },
              { id: "w7d4s3", title: "Viết essay Test 17 (Multitasking)", completed: false },
              { id: "w7d4s4", title: "Tổng kết lỗi writing & templates", completed: false }
            ]
          },
          {
            id: "w7d5",
            title: "Ngày 47: Đọc 20 bài essay mẫu còn lại + Từ vựng tổng hợp",
            desc: "Đọc nốt essay mẫu + ôn từ vựng toàn bộ 10 topics",
            icon: "📖", target: "khac",
            prep: "Vào 'Khác' → 'Sách Essay'. Đọc 20 bài essay mẫu còn lại (tổng 82 bài). Vào 'Từ vựng VSTEP' ôn tất cả topics: Education, Work, Health, Technology, Travel, Culture, Environment, Science, Economy, Media.",
            subMilestones: [
              { id: "w7d5s1", title: "Đọc 10 bài essay mẫu tiếp", completed: false },
              { id: "w7d5s2", title: "Đọc 10 bài essay mẫu cuối", completed: false },
              { id: "w7d5s3", title: "Ôn từ vựng 10 topics qua flashcards", completed: false },
              { id: "w7d5s4", title: "Làm quiz từ vựng 20 câu", completed: false }
            ]
          },
          {
            id: "w7d6",
            title: "Ngày 48: Full Test #3 - Mô phỏng thi thật",
            desc: "Thi thử lần 3: 4 kỹ năng, đúng thời gian, đúng quy trình",
            icon: "📄", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 0 },
            prep: "Full test #3: tự ghép đề từ các bài còn lại chưa làm. Thi như thật: không tra từ, không dừng giữa chừng. Ghi điểm từng kỹ năng. So sánh với test #1 và #2.",
            subMilestones: [
              { id: "w7d6s1", title: "Full Test #3: Listening + Reading", completed: false },
              { id: "w7d6s2", title: "Full Test #3: Writing + Speaking", completed: false },
              { id: "w7d6s3", title: "Chấm điểm & phân tích lỗi", completed: false },
              { id: "w7d6s4", title: "So sánh tiến bộ qua 3 lần thi thử", completed: false }
            ]
          },
          {
            id: "w7d7",
            title: "Ngày 49: Sửa lỗi tổng thể + Ôn điểm yếu",
            desc: "Xem lại sổ lỗi, ôn kỹ năng yếu nhất, học mẹo làm bài",
            icon: "📊", target: "self-assessment",
            prep: "Tổng kết tất cả lỗi sai từ 3 full test. Xác định kỹ năng yếu nhất. Ôn tập tập trung vào kỹ năng đó. Học mẹo: phân bổ thời gian, nhận diện bẫy, kỹ thuật đoán từ trong ngữ cảnh.",
            subMilestones: [
              { id: "w7d7s1", title: "Xem lại sổ lỗi từ 3 full test", completed: false },
              { id: "w7d7s2", title: "Ôn tập kỹ năng yếu nhất", completed: false },
              { id: "w7d7s3", title: "Học mẹo làm bài nhanh", completed: false },
              { id: "w7d7s4", title: "Làm lại 10 câu đã sai", completed: false }
            ]
          }
        ]
      },
      // ======================================================================
      // TUẦN 8: NƯỚC RÚT CUỐI CÙNG
      // ======================================================================
      {
        id: "week8",
        title: "Tuần 8: Nước rút cuối cùng",
        subtitle: "Ngày 50 → 56",
        color: "#06b6d4",
        icon: "🏆",
        milestones: [
          {
            id: "w8d1",
            title: "Ngày 50: Full Test #4 + Từ vựng 500-700 từ",
            desc: "Thi thử lần 4 + ôn toàn bộ từ vựng đã học",
            icon: "📄", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 0 },
            prep: "Full Test #4: ghép đề mới từ các bài còn lại. Sau khi thi, ôn lại 500-700 từ vựng VSTEP qua flashcards. Tập trung vào các từ đã sai.",
            subMilestones: [
              { id: "w8d1s1", title: "Full Test #4: Listening + Reading", completed: false },
              { id: "w8d1s2", title: "Full Test #4: Writing + Speaking", completed: false },
              { id: "w8d1s3", title: "Ôn 200 từ vựng VSTEP qua flashcards", completed: false },
              { id: "w8d1s4", title: "Ghi chú lỗi sai", completed: false }
            ]
          },
          {
            id: "w8d2",
            title: "Ngày 51: Speaking Tổng hợp + Writing Templates",
            desc: "Luyện speaking toàn bộ 3 parts + templates writing",
            icon: "🗣️", target: "speaking",
            navParams: { section: "speaking", part: "part1", topicIndex: 0 },
            prep: "Luyện Speaking: chọn 5 topic Part 1 + 2 test Part 2 + 2 test Part 3 bất kỳ. Ghi âm và tự chấm. Viết template cho Task 1 (3 mẫu: informal, formal, thank you) và Task 2 (3 mẫu: opinion, discussion, cause-effect).",
            subMilestones: [
              { id: "w8d2s1", title: "Luyện Speaking Part 1 (5 topics)", completed: false },
              { id: "w8d2s2", title: "Luyện Speaking Part 2-3 (4 tests)", completed: false },
              { id: "w8d2s3", title: "Viết 3 templates Writing Task 1", completed: false },
              { id: "w8d2s4", title: "Viết 3 templates Writing Task 2", completed: false }
            ]
          },
          {
            id: "w8d3",
            title: "Ngày 52: Full Test #5 - Tập trung điểm yếu",
            desc: "Thi thử lần 5 với trọng tâm là kỹ năng còn yếu",
            icon: "📄", target: "reading",
            navParams: { section: "reading", category: 0, test: 0 },
            prep: "Full Test #5. Trong quá trình thi, đặc biệt chú ý đến kỹ năng còn yếu (đã xác định ở ngày 49). Dành thêm thời gian cho phần đó.",
            subMilestones: [
              { id: "w8d3s1", title: "Full Test #5: Listening + Reading", completed: false },
              { id: "w8d3s2", title: "Full Test #5: Writing + Speaking", completed: false },
              { id: "w8d3s3", title: "Phân tích cải thiện ở kỹ năng yếu", completed: false },
              { id: "w8d3s4", title: "Ôn 200 từ vựng còn lại", completed: false }
            ]
          },
          {
            id: "w8d4",
            title: "Ngày 53: Ôn ngữ pháp tổng thể + Mẹo làm bài",
            desc: "Xem lại toàn bộ ngữ pháp + chiến thuật từng phần thi",
            icon: "📚", target: "grammar",
            prep: "Ôn lại 17 chủ điểm ngữ pháp từ grammar.js. Đặc biệt chú ý các lỗi thường gặp: chia thì, s/es, từ nối. Đọc lại 'Phương pháp ôn tập' trong VstepPrep. Học mẹo làm bài cho từng kỹ năng.",
            subMilestones: [
              { id: "w8d4s1", title: "Ôn 17 chủ điểm ngữ pháp", completed: false },
              { id: "w8d4s2", title: "Đọc phương pháp ôn tập VSTEP", completed: false },
              { id: "w8d4s3", title: "Học mẹo Listening & Reading", completed: false },
              { id: "w8d4s4", title: "Học mẹo Writing & Speaking", completed: false }
            ]
          },
          {
            id: "w8d5",
            title: "Ngày 54: Full Test #6 - Thi thử cuối",
            desc: "Full test cuối cùng trước khi thi thật",
            icon: "📄", target: "listening",
            navParams: { section: "listening", part: 0, exercise: 0 },
            prep: "Full Test #6: thi thử toàn phần lần cuối. Đây là bài kiểm tra tổng kết. Làm như thi thật 100%. Không dừng, không tra từ. Ghi lại điểm và phân tích.",
            subMilestones: [
              { id: "w8d5s1", title: "Full Test #6: Listening + Reading", completed: false },
              { id: "w8d5s2", title: "Full Test #6: Writing + Speaking", completed: false },
              { id: "w8d5s3", title: "Tổng kết điểm 6 full test", completed: false },
              { id: "w8d5s4", title: "Xem lại lỗi sai lần cuối", completed: false }
            ]
          },
          {
            id: "w8d6",
            title: "Ngày 55: Xem lại cấu trúc đề + Chuẩn bị vật dụng",
            desc: "Đọc lại cấu trúc đề, mẹo làm bài, chuẩn bị đồ dùng thi",
            icon: "📋", target: "motivation",
            prep: "KHÔNG học kiến thức mới. Đọc lại cấu trúc đề thi VSTEP (Listening 35-40ph, Reading 45-50ph, Writing 45ph, Speaking 12-15ph). Chuẩn bị: CMND/CCCD, giấy báo thi, bút xanh/đen, nước uống. Xem lại templates Writing.",
            subMilestones: [
              { id: "w8d6s1", title: "Đọc lại cấu trúc đề thi VSTEP", completed: false },
              { id: "w8d6s2", title: "Xem lại mẹo làm bài từng phần", completed: false },
              { id: "w8d6s3", title: "Chuẩn bị vật dụng thi", completed: false },
              { id: "w8d6s4", title: "Xem lại templates Writing & Speaking", completed: false }
            ]
          },
          {
            id: "w8d7",
            title: "Ngày 56: Thư giãn + Ngủ sớm",
            desc: "Nghỉ ngơi hoàn toàn, giữ tinh thần thoải mái. KHÔNG học!",
            icon: "😌", target: "motivation",
            prep: "Ngày cuối: Chỉ thư giãn. Nghe nhạc, xem phim, đi dạo. Ăn uống đầy đủ. Ngủ sớm trước 22h. KHÔNG học thêm kiến thức mới. Bạn đã chuẩn bị suốt 55 ngày, hãy tự tin!",
            subMilestones: [
              { id: "w8d7s1", title: "Thư giãn - không học kiến thức mới", completed: false },
              { id: "w8d7s2", title: "Chuẩn bị quần áo & đồ dùng", completed: false },
              { id: "w8d7s3", title: "Ăn tối sớm, ngủ trước 22h", completed: false },
              { id: "w8d7s4", title: "Tinh thần thoải mái - tự tin!", completed: false }
            ]
          }
        ]
      }
    ],
    motivationalQuotes: [
      "Mỗi ngày một ít, không gì là không thể! 🌟",
      "Thành công là kết quả của sự kiên trì. Cố lên! 💪",
      "Học hôm nay, thành công ngày mai! 📚",
      "Bạn đang tiến bộ mỗi ngày, đừng bỏ cuộc! 🔥",
      "Kiên trì tập luyện là chìa khóa của mọi thành công! 🗝️",
      "Mỗi lỗi sai là một bài học quý giá! 🎯",
      "Học ít nhưng đúng — chất lượng hơn số lượng! 💎",
      "Ngày mai sẽ khác nếu bạn bắt đầu ngay hôm nay! ⏰",
      "Tự tin là một nửa chiến thắng! 🏅",
    ],
    dailyTopics: [
      "Work & Employment", "Education & Learning", "Environment & Climate",
      "Health & Lifestyle", "Technology & Innovation", "Travel & Transportation",
      "Culture & Society", "Food & Nutrition", "Science & Research",
      "Media & Communication", "Economy & Business", "Sports & Entertainment",
      "Family & Relationships", "Government & Policy"
    ]
  },

  loadSettings: function () {
    var defaults = {
      goal: "",
      examDate: "",
      completedMilestones: [],
      completedSubMilestones: [],
      expandedMilestones: [],
      dailyDone: {}
    };
    try {
      var raw = localStorage.getItem("vstep_roadmap");
      if (!raw) return defaults;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : defaults;
    } catch (e) {
      console.error("Roadmap.loadSettings error:", e);
      return defaults;
    }
  },

  saveSettings: function (s) {
    try {
      localStorage.setItem("vstep_roadmap", JSON.stringify(s));
    } catch (e) {
      console.error("Roadmap.saveSettings error:", e);
    }
  },

  findMilestoneById: function (id) {
    for (var i = 0; i < this.roadmapData.stages.length; i++) {
      var stage = this.roadmapData.stages[i];
      for (var j = 0; j < stage.milestones.length; j++) {
        if (stage.milestones[j].id === id) {
          return stage.milestones[j];
        }
      }
    }
    return null;
  },

  getCountdown: function (examDate) {
    if (!examDate) return null;
    var now = new Date();
    var exam = new Date(examDate);
    var diff = Math.ceil((exam - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  },

  setup: function () {
    var s = this.loadSettings();
    return '\n      <div style="max-width:480px;margin:2rem auto;padding:0 1rem;">\n        <div class="glass-card" style="padding:2.5rem;">\n          <div style="text-align:center;margin-bottom:2rem;">\n            <span style="font-size:3rem;">🗺️</span>\n            <h2 style="font-size:1.6rem;margin-bottom:0.5rem;">Thiết lập lộ trình VSTEP</h2>\n            <p style="color:var(--text-muted);font-size:0.9rem;">Cá nhân hóa lộ trình 8 tuần (56 ngày) của bạn để đạt kết quả tốt nhất!</p>\n          </div>\n          <div style="margin-bottom:1.5rem;">\n            <label style="display:block;font-weight:600;margin-bottom:0.5rem;font-size:0.95rem;">🎯 Mục tiêu của bạn</label>\n            <div style="display:flex;gap:0.75rem;">\n              <button class="btn ' + (s.goal === "B1" ? "btn-primary" : "btn-secondary") + '" style="flex:1;padding:0.75rem;font-size:1rem;" onclick="RoadmapView.setGoal(\'B1\')">B1</button>\n              <button class="btn ' + (s.goal === "B2" ? "btn-primary" : "btn-secondary") + '" style="flex:1;padding:0.75rem;font-size:1rem;" onclick="RoadmapView.setGoal(\'B2\')">B2</button>\n            </div>\n          </div>\n          <div style="margin-bottom:2rem;">\n            <label style="display:block;font-weight:600;margin-bottom:0.5rem;font-size:0.95rem;">📅 Ngày thi dự kiến</label>\n            <input type="date" class="form-input" style="width:100%;" value="' + s.examDate + '" id="roadmap-exam-date" onchange="RoadmapView.setExamDate(this.value)">\n          </div>\n          <button class="btn btn-accent" style="width:100%;padding:0.85rem;font-size:1.05rem;" onclick="RoadmapView.start()" ' + (s.goal && s.examDate ? "" : "disabled") + '>\n            🚀 Bắt đầu lộ trình của tôi!\n          </button>\n        </div>\n        <div style="margin-top:1rem;padding:1rem;background:rgba(59,130,246,0.06);border-radius:12px;border-left:3px solid var(--primary);font-size:0.85rem;color:var(--text-muted);">\n          <strong>💡 Gợi ý:</strong> Lộ trình 8 tuần được thiết kế theo thứ tự ưu tiên: Speaking Part 2 (dễ) → Writing Task 1 → Speaking Part 1&3 → Writing Task 2 (khó).\n        </div>\n      </div>\n    ';
  },

  setGoal: function (g) {
    var s = this.loadSettings();
    s.goal = g;
    this.saveSettings(s);
    this.refresh();
  },

  setExamDate: function (d) {
    var s = this.loadSettings();
    s.examDate = d;
    this.saveSettings(s);
    this.refresh();
  },

  start: function () {
    var s = this.loadSettings();
    if (!s.goal || !s.examDate) return;
    s.started = true;
    this.saveSettings(s);
    this.refresh();
  },

  refresh: function () {
    var ws = document.getElementById("vstep-workspace");
    if (ws) {
      // Save scroll position
      var scrollTop = ws.scrollTop;
      var scrollLeft = ws.scrollLeft;

      ws.style.opacity = "0";
      var self = this;
      setTimeout(function () {
        ws.innerHTML = VstepView.renderSection("roadmap");
        ws.style.transition = "opacity 0.25s ease";
        ws.style.opacity = "1";

        // Restore scroll position
        ws.scrollTop = scrollTop;
        ws.scrollLeft = scrollLeft;
      }, 150);
    }
  },

  render: function () {
    var s = this.loadSettings();
    if (!s.started || !s.goal || !s.examDate) return this.setup();

    var stages = this.roadmapData.stages;
    var allMilestones = [];
    stages.forEach(function (st) {
      st.milestones.forEach(function (m) {
        allMilestones.push(m.id);
      });
    });

    var totalMilestones = allMilestones.length;
    var completedCount = s.completedMilestones ? s.completedMilestones.length : 0;
    var progressPct = Math.round((completedCount / totalMilestones) * 100);
    var countdown = this.getCountdown(s.examDate);
    var today = new Date().toISOString().split("T")[0];
    var doneKey = "roadmap_daily_" + today;
    var dailyDone = s.dailyDone || {};
    var todayTasksDone = dailyDone[doneKey] || [];

    var quote = this.roadmapData.motivationalQuotes[
      completedCount % this.roadmapData.motivationalQuotes.length
    ];

    var html = '\n      <div style="padding:0 0.5rem;">\n        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;">\n          <div>\n            <h2 style="font-size:1.4rem;margin-bottom:0.25rem;">🗺️ Lộ trình VSTEP 8 Tuần (56 ngày)</h2>\n            <p style="color:var(--text-muted);font-size:0.9rem;">Mục tiêu: <strong onclick="RoadmapView.editGoal(this)" style="cursor:pointer;border-bottom:1px dashed var(--text-muted);" title="Bấm để đổi mục tiêu">' + s.goal + ' ✏️</strong> | Ngày thi: <strong onclick="RoadmapView.editDate(this)" style="cursor:pointer;border-bottom:1px dashed var(--text-muted);" title="Bấm để đổi ngày">' + (s.examDate ? new Date(s.examDate).toLocaleDateString("vi-VN") : "") + ' ✏️</strong>\n              <span style="margin-left:1rem;"><button onclick="RoadmapView.resetRoadmap()" style="font-size:0.75rem;padding:2px 10px;border:1px solid #ef4444;color:#ef4444;background:transparent;border-radius:6px;cursor:pointer;" title="Xóa toàn bộ tiến độ">🔄 Reset</button></span>\n            </p>\n          </div>\n          <div style="text-align:center;">\n            ' + (countdown !== null ? '\n            <div style="background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.1));border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:0.4rem 1rem;">\n              <div style="font-size:1.6rem;font-weight:800;color:#f59e0b;">' + countdown + '</div>\n              <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">ngày còn lại</div>\n            </div>\n            ' : "") + '\n          </div>\n        </div>\n\n        <div class="glass-card" style="margin-bottom:1.5rem;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(59,130,246,0.05));padding:1.25rem 1.5rem;">\n          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem;">\n            <span style="font-size:0.9rem;color:var(--text-muted);">Tiến độ lộ trình</span>\n            <span style="font-size:0.9rem;"><strong style="color:var(--primary);">' + progressPct + '%</strong> <span style="color:var(--text-muted);">(' + completedCount + '/' + totalMilestones + ')</span></span>\n          </div>\n          <div style="width:100%;height:8px;background:var(--bg-input);border-radius:99px;overflow:hidden;">\n            <div style="width:' + progressPct + '%;height:100%;background:linear-gradient(90deg,var(--primary),#8b5cf6);border-radius:99px;transition:width 0.5s ease;"></div>\n          </div>\n          <div style="margin-top:0.6rem;font-size:0.85rem;color:var(--text-muted);font-style:italic;">\n            “' + quote + '”\n          </div>\n        </div>\n\n        <div class="roadmap-toc">\n    ';

    var RV = this;
    // === MỤC LỤC LỘ TRÌNH (TOC-style) ===
    stages.forEach(function (stage, si) {
      var stageAll = stage.milestones.length;
      var stageDone = 0;
      stage.milestones.forEach(function (m) {
        if (s.completedMilestones && s.completedMilestones.indexOf(m.id) >= 0) stageDone++;
      });

      var prevStageDone = true;
      if (si > 0) {
        var prevMilestones = stages[si - 1].milestones;
        prevStageDone = prevMilestones.every(function (pm) {
          return s.completedMilestones && s.completedMilestones.indexOf(pm.id) >= 0;
        });
      }
      var isLocked = !prevStageDone && si > 0;

      var stageStyle = 'border-left:3px solid ' + stage.color + ';padding:0.6rem 0.8rem;margin-bottom:0.5rem;border-radius:0 10px 10px 0;background:var(--bg-card);box-shadow:0 1px 4px rgba(0,0,0,0.04);transition:box-shadow 0.2s,transform 0.2s;' + (isLocked ? 'opacity:0.5;' : '');
      html += '\n<div class="roadmap-stage" style="' + stageStyle + '" onmouseover="this.style.boxShadow=\'0 2px 8px rgba(0,0,0,0.08)\';this.style.transform=\'translateX(2px)\'" onmouseout="this.style.boxShadow=\'0 1px 4px rgba(0,0,0,0.04)\';this.style.transform=\'translateX(0)\'">\
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">\
          <div style="display:flex;align-items:center;gap:0.5rem;">\
            <span style="font-size:1.1rem;">' + stage.icon + '</span>\
            <div>\
              <div style="font-size:0.9rem;font-weight:600;">' + stage.title + '</div>\
              <div style="font-size:0.7rem;color:var(--text-muted);">' + stage.subtitle + '</div>\
            </div>\
          </div>\
          <div style="font-size:0.75rem;color:' + (stageDone === stageAll ? '#10b981' : 'var(--text-muted)') + ';font-weight:600;">' + stageDone + '/' + stageAll + '</div>\
        </div>\
        <div class="roadmap-toc-milestones">';

      stage.milestones.forEach(function (m) {
        var isCompleted = s.completedMilestones && s.completedMilestones.indexOf(m.id) >= 0;
        var isActive = prevStageDone && !isCompleted && !isLocked;
        var statusIcon = isCompleted ? "✅" : (isActive ? "◻️" : "🔒");
        var statusColor = isCompleted ? "#10b981" : (isActive ? "var(--text-main)" : "var(--text-muted)");
        var hasSubs = m.subMilestones && m.subMilestones.length > 0;

        var onClick = "";
        if (hasSubs) {
          onClick = "RoadmapView.toggleMilestoneExpand('" + m.id + "')";
        } else if (isCompleted) {
          onClick = "RoadmapView.uncompleteMilestone('" + m.id + "')";
        } else if (isActive) {
          if (m.target === "setup" || m.target === "motivation") {
            onClick = "RoadmapView.completeMilestone('" + m.id + "')";
          } else {
            onClick = "RoadmapView.goToSection('" + m.target + "','" + m.id + "')";
          }
        }

        // Sub-milestone progress
        var subTotal = m.subMilestones ? m.subMilestones.length : 0;
        var subCompleted = 0;
        if (m.subMilestones && s.completedSubMilestones) {
          m.subMilestones.forEach(function (sub) {
            if (s.completedSubMilestones.indexOf(sub.id) >= 0) subCompleted++;
          });
        }
        var hasSubs = subTotal > 0;
        var allSubsDone = hasSubs && subCompleted === subTotal;
        var isExpanded = s.expandedMilestones && s.expandedMilestones.indexOf(m.id) >= 0;

        html += '\n<div class="roadmap-toc-item" style="display:flex;align-items:center;gap:0.4rem;padding:0.25rem 0.5rem;border-radius:6px;cursor:' + (isCompleted || isActive ? 'pointer' : 'default') + ';color:' + statusColor + ';transition:background 0.15s;" onmouseover="this.style.background=\'rgba(128,128,128,0.06)\'" onmouseout="this.style.background=\'transparent\'" onclick="' + onClick + '" title="' + m.desc + '">\
          <span style="flex-shrink:0;font-size:0.75rem;width:1.2rem;">' + statusIcon + '</span>\
          <span style="flex-shrink:0;font-size:0.75rem;">' + m.icon + '</span>\
          <span style="flex:1;font-size:0.8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + m.title + '</span>\
          ' + (hasSubs ? '<span style="font-size:0.65rem;color:var(--text-muted);margin-right:0.25rem;">' + subCompleted + '/' + subTotal + '</span>' : '') + '\
          ' + (isCompleted ? '<span style="font-size:0.65rem;color:#10b981;">✓</span>' : '') + '\
          ' + (hasSubs ? '<span class="expand-btn" style="font-size:0.55rem;cursor:pointer;padding:0.15rem 0.3rem;border-radius:4px;background:rgba(128,128,128,0.08);transition:background 0.15s;" onmouseover="this.style.background=\'rgba(128,128,128,0.15)\'" onmouseout="this.style.background=\'rgba(128,128,128,0.08)\'" onclick="event.stopPropagation();RoadmapView.toggleMilestoneExpand(\'' + m.id + '\')">' + (isExpanded ? '▲' : '▼') + '</span>' : '') + '\
        </div>';

        // Sub-items (expandable)
        if (hasSubs) {
          html += '\n<div id="sub-' + m.id + '" class="roadmap-toc-subs" style="display:' + (isExpanded ? 'block' : 'none') + ';margin-left:1.8rem;padding-left:0.5rem;border-left:1px dashed var(--border-color);">';
          m.subMilestones.forEach(function (sub, subIdx) {
            var subDone = s.completedSubMilestones && s.completedSubMilestones.indexOf(sub.id) >= 0;
            var subActive = isActive && !isLocked;
            var subNav = subActive ? RV.computeNavParams(m, subIdx) : null;
            var isSkill = subNav && (subNav.section === "listening" || subNav.section === "reading" || subNav.section === "writing" || subNav.section === "speaking");
            var skillColor = null;
            if (isSkill) {
              if (subNav.section === "listening") skillColor = "#3b82f6";
              else if (subNav.section === "reading") skillColor = "#10b981";
              else if (subNav.section === "writing") skillColor = "#f59e0b";
              else if (subNav.section === "speaking") skillColor = "#8b5cf6";
            }
            html += '\n<div class="roadmap-toc-sub" style="display:flex;align-items:center;gap:0.3rem;padding:0.2rem 0.4rem 0.2rem 0.2rem;border-radius:5px;border-left:3px solid ' + (skillColor || 'transparent') + ';cursor:' + (subActive && isSkill ? 'pointer' : 'default') + ';color:' + (subDone ? '#10b981' : 'var(--text-muted)') + ';font-size:0.75rem;transition:all 0.15s;" onmouseover="this.style.background=\'rgba(128,128,128,0.05)\'" onmouseout="this.style.background=\'transparent\'" onclick="event.stopPropagation();' + (subActive ? (isSkill ? "RoadmapView.goToSubItem('" + m.id + "','" + sub.id + "','" + m.target + "')" : "RoadmapView.toggleSubMilestone('" + m.id + "','" + sub.id + "')") : "") + '">\
              <span style="flex-shrink:0;font-size:0.65rem;width:1rem;">' + (subDone ? "✅" : (subActive ? "◻️" : "🔒")) + '</span>\
              <span style="flex:1;">' + sub.title + '</span>\
            </div>';
          });
          html += '\n</div>';
        }
      });

      html += '\n</div></div>';
    });

    html += '\n        </div>\n\n        <div class="roadmap-bottom-grid">\n        </div>\n      </div>\n    ';

    return html;
  },


  editDate: function (el) {
    if (!el) return;
    var s = this.loadSettings();
    var currentDate = s.examDate || new Date().toISOString().split("T")[0];
    var input = document.createElement("input");
    input.type = "date";
    input.value = currentDate;
    input.style.cssText = "font-size:0.85rem;padding:1px 4px;border:1px solid var(--primary);border-radius:6px;background:var(--bg-card);color:var(--text-main);outline:none;width:140px;";
    el.parentNode.replaceChild(input, el);
    input.focus();
    var self = this;
    input.addEventListener("change", function () {
      s.examDate = input.value;
      self.saveSettings(s);
      self.refresh();
    });
    input.addEventListener("blur", function () {
      self.refresh();
    });
  },

  editGoal: function (el) {
    if (!el) return;
    var s = this.loadSettings();
    var container = document.createElement("span");
    container.style.cssText = "display:inline-flex;gap:4px;";
    var b1 = document.createElement("button");
    b1.textContent = "B1";
    b1.style.cssText = "font-size:0.8rem;padding:1px 10px;border:1px solid var(--primary);border-radius:6px;cursor:pointer;background:" + (s.goal === "B1" ? "var(--primary)" : "transparent") + ";color:" + (s.goal === "B1" ? "#fff" : "var(--primary)") + ";";
    var b2 = document.createElement("button");
    b2.textContent = "B2";
    b2.style.cssText = "font-size:0.8rem;padding:1px 10px;border:1px solid var(--primary);border-radius:6px;cursor:pointer;background:" + (s.goal === "B2" ? "var(--primary)" : "transparent") + ";color:" + (s.goal === "B2" ? "#fff" : "var(--primary)") + ";";
    var self = this;
    function choose(g) {
      s.goal = g;
      self.saveSettings(s);
      self.refresh();
    }
    b1.onclick = function () { choose("B1"); };
    b2.onclick = function () { choose("B2"); };
    container.appendChild(b1);
    container.appendChild(b2);
    el.parentNode.replaceChild(container, el);
  },

  resetRoadmap: function () {
    if (!confirm("Bạn có chắc muốn reset toàn bộ tiến độ lộ trình? Hành động này không thể hoàn tác.")) return;
    var s = this.loadSettings();
    s.completedMilestones = [];
    s.completedSubMilestones = [];
    s.expandedMilestones = [];
    s.dailyDone = {};
    this.saveSettings(s);
    this.refresh();
  },

  completeMilestone: function (id) {
    var s = this.loadSettings();
    if (!s.completedMilestones) s.completedMilestones = [];
    if (s.completedMilestones.indexOf(id) < 0) {
      s.completedMilestones.push(id);
    }

    // Auto-complete all sub-milestones of this milestone
    var milestone = this.findMilestoneById(id);
    if (milestone && milestone.subMilestones && milestone.subMilestones.length > 0) {
      if (!s.completedSubMilestones) s.completedSubMilestones = [];
      milestone.subMilestones.forEach(function (sub) {
        if (s.completedSubMilestones.indexOf(sub.id) < 0) {
          s.completedSubMilestones.push(sub.id);
        }
      });
    }

    this.saveSettings(s);
    if (typeof DashboardView !== "undefined" && DashboardView.logActivity) {
      DashboardView.logActivity(1);
    }
    this.refresh();
  },

  uncompleteMilestone: function (id) {
    var s = this.loadSettings();
    if (s.completedMilestones) {
      var idx = s.completedMilestones.indexOf(id);
      if (idx >= 0) {
        s.completedMilestones.splice(idx, 1);
      }
    }
    // Also uncomplete all sub-milestones of this milestone
    if (s.completedSubMilestones) {
      var milestone = this.findMilestoneById(id);
      if (milestone && milestone.subMilestones) {
        milestone.subMilestones.forEach(function (sub) {
          var subIdx = s.completedSubMilestones.indexOf(sub.id);
          if (subIdx >= 0) {
            s.completedSubMilestones.splice(subIdx, 1);
          }
        });
      }
    }
    this.saveSettings(s);
    this.refresh();
  },

  toggleSubMilestone: function (milestoneId, subId) {
    var s = this.loadSettings();
    if (!s.completedSubMilestones) s.completedSubMilestones = [];
    var idx = s.completedSubMilestones.indexOf(subId);
    if (idx >= 0) {
      s.completedSubMilestones.splice(idx, 1);
    } else {
      s.completedSubMilestones.push(subId);
    }

    // Check if all sub-milestones are completed, then auto-complete the milestone
    var milestone = this.findMilestoneById(milestoneId);
    if (milestone && milestone.subMilestones && milestone.subMilestones.length > 0) {
      var allSubCompleted = true;
      milestone.subMilestones.forEach(function (sub) {
        if (s.completedSubMilestones.indexOf(sub.id) < 0) {
          allSubCompleted = false;
        }
      });

      if (allSubCompleted && s.completedMilestones.indexOf(milestoneId) < 0) {
        s.completedMilestones.push(milestoneId);
      } else if (!allSubCompleted && s.completedMilestones.indexOf(milestoneId) >= 0) {
        // If not all sub-milestones are completed, uncomplete the milestone
        var mIdx = s.completedMilestones.indexOf(milestoneId);
        s.completedMilestones.splice(mIdx, 1);
      }
    }

    this.saveSettings(s);
    this.refresh();
  },

  goToSubItem: function (milestoneId, subId, section) {
    var s = this.loadSettings();
    if (!s.completedSubMilestones) s.completedSubMilestones = [];
    var idx = s.completedSubMilestones.indexOf(subId);
    if (idx >= 0) {
      s.completedSubMilestones.splice(idx, 1);
    } else {
      s.completedSubMilestones.push(subId);
    }
    var milestone = this.findMilestoneById(milestoneId);
    if (milestone && milestone.subMilestones && milestone.subMilestones.length > 0) {
      var allSubCompleted = true;
      for (var si = 0; si < milestone.subMilestones.length; si++) {
        if (s.completedSubMilestones.indexOf(milestone.subMilestones[si].id) < 0) {
          allSubCompleted = false;
          break;
        }
      }
      if (allSubCompleted && s.completedMilestones.indexOf(milestoneId) < 0) {
        s.completedMilestones.push(milestoneId);
      } else if (!allSubCompleted && s.completedMilestones.indexOf(milestoneId) >= 0) {
        var mIdx = s.completedMilestones.indexOf(milestoneId);
        s.completedMilestones.splice(mIdx, 1);
      }
    }
    this.saveSettings(s);

    // Find sub-index and compute exact navParams
    var subIndex = -1;
    if (milestone) {
      for (var si2 = 0; si2 < milestone.subMilestones.length; si2++) {
        if (milestone.subMilestones[si2].id === subId) { subIndex = si2; break; }
      }
    }
    var nav = this.computeNavParams(milestone, subIndex);
    var navSection = nav ? nav.section : section;
    if (nav) {
      var vs = VstepView;
      if (nav.section === "listening") {
        vs.setListeningPart(nav.part);
        if (nav.exercise !== undefined) vs.setListeningExercise(nav.exercise);
      } else if (nav.section === "reading") {
        vs.setReadingCategory(nav.category);
        if (nav.test !== undefined) vs.setReadingTest(nav.test);
      } else if (nav.section === "writing") {
        vs.setWritingTask(nav.task);
        if (nav.testIndex !== undefined) vs.setWritingTest(nav.testIndex);
      } else if (nav.section === "speaking") {
        vs.setSpeakingPart(nav.part);
        if (nav.topicIndex !== undefined) vs.setSpeakingTopic(nav.topicIndex);
      } else if (nav.section === "vstepVocab") {
        vs.vstepVocabState.topic = nav.topic || "all";
        vs.vstepVocabState.level = "all";
        vs.vstepVocabState.mode = "browse";
      } else if (nav.section === "essayVocab") {
        vs.vstepVocabState.topic = "all";
        vs.vstepVocabState.level = "all";
        vs.vstepVocabState.mode = "browse";
      }
    }
    App.navigate("vstep");
    var checkExist = setInterval(function () {
      var ws = document.getElementById("vstep-workspace");
      if (ws && VstepView) {
        clearInterval(checkExist);
        setTimeout(function () { VstepView.setSection(navSection); }, 200);
      }
    }, 50);
  },

  computeNavParams: function (milestone, subIndex) {
    if (!milestone || subIndex < 0) return null;
    var base = milestone.navParams || {};
    var title = milestone.subMilestones[subIndex].title || "";
    var tl = title.toLowerCase();
    var nav = {};
    for (var k in base) nav[k] = base[k];

    // --- LISTENING ---
    if (/nghe|listening|p\d/.test(tl) || base.section === "listening") {
      nav.section = "listening";
      var pm = title.match(/P(\d+)/);
      if (pm) nav.part = parseInt(pm[1]) - 1;
      var bm = title.match(/Bài\s*(\d+)/);
      if (bm) nav.exercise = parseInt(bm[1]) - 1;
      else if (base.exercise !== undefined) nav.exercise = base.exercise + subIndex;
      return nav;
    }

    // --- READING ---
    var catKeys = ["main idea", "vocabulary", "detail", "inference", "other", "comprehensive"];
    var catMap = { "main idea":0, "vocabulary":1, "detail":2, "inference":3, "other":4, "comprehensive":5 };
    if (/reading|đọc|main idea|vocabulary|detail|inference|comprehensive/.test(tl) || base.section === "reading") {
      nav.section = "reading";
      for (var ci = 0; ci < catKeys.length; ci++) {
        if (tl.indexOf(catKeys[ci]) >= 0) { nav.category = catMap[catKeys[ci]]; break; }
      }
      var tm = title.match(/Test\s*(\d+)/);
      if (tm) nav.test = parseInt(tm[1]) - 1;
      else if (base.test !== undefined) nav.test = base.test + subIndex;
      return nav;
    }

    // --- WRITING ---
    if (/viết|writing|essay|email|thư/.test(tl) || base.section === "writing") {
      nav.section = "writing";
      if (/task\s*1|email|thư/i.test(title)) nav.task = "task1";
      else if (/task\s*2|essay/i.test(title)) nav.task = "task2";
      var tm2 = title.match(/Test\s*(\d+)/);
      if (tm2) nav.testIndex = parseInt(tm2[1]) - 1;
      else if (base.testIndex !== undefined) nav.testIndex = base.testIndex + subIndex;
      return nav;
    }

    // --- SPEAKING ---
    if (/nói|speaking|topic/.test(tl) || base.section === "speaking") {
      nav.section = "speaking";
      var pm2 = title.match(/P(\d+)/);
      if (pm2) nav.part = "part" + pm2[1];
      if (tl.indexOf("topic") >= 0) {
        nav.topicIndex = (base.topicIndex || 0) + Math.floor(subIndex / 2);
      } else {
        var tm3 = title.match(/Test\s*(\d+)/);
        if (tm3) nav.topicIndex = parseInt(tm3[1]) - 1;
      }
      return nav;
    }

    // --- VOCABULARY (vstepVocab) ---
    var topicAlias = { "education":"education","work":"work","health":"health","technology":"technology","travel":"travel","environment":"environment","hobbies":"hobbies","house":"house","relationships":"relationships","weather":"weather","culture":"travel","economy":"work","science":"technology","media":"technology","communication":"technology"};
    if (/từ vựng|vocab|quiz|flashcard/.test(tl) || base.section === "vstepVocab") {
      nav.section = "vstepVocab";
      var tpm = title.match(/chủ đề\s*(\w+)/i);
      if (tpm) {
        var raw = tpm[1].toLowerCase();
        nav.topic = topicAlias[raw] || raw;
      }
      return nav;
    }

    // --- ESSAY BOOK / IDEA BANK ---
    if (/essay mẫu|sách essay/.test(tl)) return { section: "khac" };
    if (/kho ý tưởng|vstepideadata|ý tưởng/i.test(tl)) return { section: "khac" };
    if (/essay vocab|từ vựng essay/i.test(tl)) return { section: "essayVocab" };

    // Fallback: try to navigate to the milestone's target section
    if (base.section) return base;
    if (milestone.target) return { section: milestone.target };
    return null;
  },

  toggleMilestoneExpand: function (milestoneId) {
    var s = this.loadSettings();
    if (!s.expandedMilestones) s.expandedMilestones = [];
    var idx = s.expandedMilestones.indexOf(milestoneId);
    if (idx >= 0) {
      s.expandedMilestones.splice(idx, 1);
    } else {
      s.expandedMilestones.push(milestoneId);
    }
    this.saveSettings(s);
    this.refresh();
  },

  goToSection: function (section, milestoneId) {
    var self = this;
    var milestone = self.findMilestoneById(milestoneId);
    // Only auto-complete if milestone has no sub-items (sub-items handle their own completion)
    if (!milestone || !milestone.subMilestones || milestone.subMilestones.length === 0) {
      self.completeMilestone(milestoneId);
    }
    var nav = milestone && milestone.navParams;
    if (nav) {
      var vs = VstepView;
      if (nav.section === "listening") {
        vs.setListeningPart(nav.part);
        if (nav.exercise !== undefined) vs.setListeningExercise(nav.exercise);
      } else if (nav.section === "reading") {
        vs.setReadingCategory(nav.category);
        if (nav.test !== undefined) vs.setReadingTest(nav.test);
      } else if (nav.section === "writing") {
        vs.setWritingTask(nav.task);
        if (nav.testIndex !== undefined) vs.setWritingTest(nav.testIndex);
      } else if (nav.section === "speaking") {
        vs.setSpeakingPart(nav.part);
        if (nav.topicIndex !== undefined) vs.setSpeakingTopic(nav.topicIndex);
      } else if (nav.section === "vstepVocab") {
        vs.vstepVocabState.topic = nav.topic || "all";
        vs.vstepVocabState.level = "all";
        vs.vstepVocabState.mode = "browse";
      } else if (nav.section === "essayVocab") {
        vs.vstepVocabState.topic = "all";
        vs.vstepVocabState.level = "all";
        vs.vstepVocabState.mode = "browse";
      }
    }
    App.navigate("vstep");
    var checkExist = setInterval(function () {
      var ws = document.getElementById("vstep-workspace");
      if (ws && VstepView) {
        clearInterval(checkExist);
        setTimeout(function () {
          VstepView.setSection(section);
        }, 200);
      }
    }, 50);
  }
};
