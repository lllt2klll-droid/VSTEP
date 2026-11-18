/* ==========================================================================
   VSTEP MOCK TEST DATA - MULTI-LANGUAGE VSTEP LEARNING HUB
   Updated with full exam content from prepedu.com:
   - Reading: 4 passages, 40 câu, 60 phút
   - Listening: 3 parts, 35 câu, ~40 phút
   - Writing: Task 1 (email) + Task 2 (essay), 60 phút
   - Speaking: 3 parts (computer-based)
   - Study Methods: gamified approaches & strategy guides
   ========================================================================== */

window.VstepMockData = {
  // ========================================================================
  // READING - 4 passages, 40 questions, 60 minutes
  // Content adapted from prepedu.com sample VSTEP exam
  // ========================================================================
  reading: {
    sections: [
      {
        id: "sec1",
        title: "Passage 1 – The Rise of Remote Work",
        level: "B1",
        passage: `The traditional office environment, once the standard for most professionals, is undergoing a dramatic transformation due to the rise of remote work. Driven by technological advancements, particularly high-speed internet and collaborative software, this shift allows employees to perform their duties outside of a conventional workplace. This change has profound implications for both businesses and the workforce.

For companies, remote work offers several distinct advantages. The most immediate is the potential for significant cost savings on office space, utilities, and maintenance. Furthermore, it expands the talent pool, enabling businesses to hire the best candidates regardless of their geographical location. Studies also suggest that remote employees are often more productive, partly due to reduced commute stress and the ability to tailor their work environment to their personal needs.

However, the transition is not without its challenges. Maintaining a strong company culture can be difficult when team members rarely interact face-to-face. Managers must adapt their leadership styles to monitor performance rather than physical presence. Security is also a major concern, as confidential company data is accessed over various home networks, requiring robust cybersecurity protocols.

For employees, the benefits include greater flexibility, a better work-life balance, and savings on travel and professional wardrobe. Yet, they also face potential pitfalls. Isolation and the blurring of lines between personal and professional life are common issues. Employees must be self-disciplined and skilled in time management to succeed in a remote setting. As remote work continues to grow, both employers and employees must find innovative ways to navigate this new professional landscape.`,
        questions: [
          { id: "r1", question: "1. What is the main reason for the rise of remote work mentioned in paragraph 1?", options: ["A. Decreased costs of office rent", "B. Technological advancements", "C. An increase in global travel", "D. A demand for more vacation time"], correct: 1, explanation: "Đoạn 1: 'Driven by technological advancements, particularly high-speed internet and collaborative software.'" },
          { id: "r2", question: "2. The word 'remote' in line 2 is closest in meaning to:", options: ["A. close", "B. far away", "C. temporary", "D. flexible"], correct: 1, explanation: "'Remote work' = làm việc từ xa, 'remote' = far away (xa cách)." },
          { id: "r3", question: "3. Which of the following is NOT listed as a direct advantage for companies?", options: ["A. Expanding the talent pool", "B. Lowering operational costs", "C. Increasing employee productivity", "D. Improving company culture"], correct: 3, explanation: "Văn hóa công ty là thách thức (đoạn 3), không phải lợi thế. Các lợi thế: tiết kiệm chi phí, mở rộng nhân tài, tăng năng suất." },
          { id: "r4", question: "4. The word 'Furthermore' in line 9 can best be replaced by:", options: ["A. Similarly", "B. Therefore", "C. In addition", "D. Conversely"], correct: 2, explanation: "'Furthermore' = hơn nữa, ngoài ra — từ nối bổ sung ý, đồng nghĩa với 'In addition'." },
          { id: "r5", question: "5. What is a main challenge for managers in a remote work model?", options: ["A. Recruiting new staff", "B. Monitoring physical presence", "C. Developing new software", "D. Adapting to new leadership styles"], correct: 3, explanation: "'Managers must adapt their leadership styles to monitor performance rather than physical presence.'" },
          { id: "r6", question: "6. The word 'robust' in line 16 is closest in meaning to:", options: ["A. simple", "B. strong", "C. optional", "D. expensive"], correct: 1, explanation: "'Robust cybersecurity protocols' = giao thức an ninh mạng mạnh mẽ, 'robust' = strong." },
          { id: "r7", question: "7. The phrase 'blurring of lines' in line 20 refers to:", options: ["A. difficulty in seeing the computer screen", "B. the separation between work and life becoming less clear", "C. the inability to draw clearly on a whiteboard", "D. the distinction between different job roles"], correct: 1, explanation: "'Blurring of lines between personal and professional life' = ranh giới giữa công việc và cuộc sống trở nên mờ nhạt." },
          { id: "r8", question: "8. Which of the following is a potential pitfall for employees in remote work?", options: ["A. Reduced commute time", "B. Better work-life balance", "C. Isolation", "D. Cost savings"], correct: 2, explanation: "'Isolation and the blurring of lines between personal and professional life are common issues.'" },
          { id: "r9", question: "9. The main purpose of this passage is to:", options: ["A. encourage all companies to adopt remote work immediately", "B. describe the history of the traditional office", "C. discuss the benefits and challenges of the growing trend of remote work", "D. predict the future of work in the next decade"], correct: 2, explanation: "Bài viết trình bày cả lợi ích và thách thức của làm việc từ xa." },
          { id: "r10", question: "10. The word 'they' in line 19 refers to:", options: ["A. the benefits", "B. employees", "C. savings", "D. pitfalls"], correct: 1, explanation: "'For employees, the benefits include... Yet, they also face potential pitfalls.' 'They' = employees." }
        ]
      },
      {
        id: "sec2",
        title: "Passage 2 – The Power of Mindfulness",
        level: "B1/B2",
        passage: `Mindfulness, the practice of intentionally focusing one's attention on the present moment without judgment, has gained considerable popularity in recent years. Rooted in ancient Eastern meditation traditions, it is now widely adopted in Western psychology, education, and even corporate settings as a tool for improving mental well-being and performance.

One of the most immediate benefits of regular mindfulness practice is stress reduction. By training the mind to observe thoughts and feelings without getting carried away by them, individuals can create a distance from stressful triggers. This non-reactive awareness helps lower cortisol levels, the primary stress hormone, leading to a calmer physical and mental state.

Furthermore, mindfulness significantly enhances cognitive function. Studies show that participants who regularly practice mindfulness exhibit improvements in attention span, focus, and working memory. This is particularly valuable in today's fast-paced, distracting environment, helping individuals maintain concentration on tasks and avoid the pitfalls of multitasking. (A) The prefrontal cortex, the area of the brain associated with executive functions like planning and complex decision-making, has also been shown to increase in density with consistent practice.

(B) The practice is simple, yet profound. It often involves basic meditation techniques, such as focusing on the breath or bodily sensations. (C) The key is the non-judgmental attitude: simply noting thoughts as they arise and gently bringing attention back to the present. (D) Mindfulness is not about emptying the mind, but about changing one's relationship with thoughts.

In educational settings, mindfulness programs have been effective in helping students manage test anxiety and improve academic performance. In the workplace, they are used to foster leadership skills, enhance creativity, and improve overall team dynamics. As society continues to grapple with rising levels of anxiety and distraction, the simple act of being present offers a powerful antidote.`,
        questions: [
          { id: "r11", question: "11. What is the core concept of mindfulness?", options: ["A. Judging one's thoughts and emotions", "B. Focusing on the present moment without judgment", "C. Planning for future success", "D. Recalling past events and memories"], correct: 1, explanation: "'Mindfulness, the practice of intentionally focusing one's attention on the present moment without judgment.'" },
          { id: "r12", question: "12. The word 'adopted' in line 4 is closest in meaning to:", options: ["A. rejected", "B. taken up", "C. discussed", "D. questioned"], correct: 1, explanation: "'Adopted' = được chấp nhận và áp dụng, đồng nghĩa với 'taken up' (tiếp nhận)." },
          { id: "r13", question: "13. How does mindfulness help with stress reduction?", options: ["A. By allowing individuals to ignore their problems entirely", "B. By training the mind to observe stressful thoughts non-reactively", "C. By immediately lowering blood pressure", "D. By increasing the release of the stress hormone"], correct: 1, explanation: "'By training the mind to observe thoughts and feelings without getting carried away by them.'" },
          { id: "r14", question: "14. The word 'antidote' in line 30 is closest in meaning to:", options: ["A. solution", "B. challenge", "C. problem", "D. source"], correct: 0, explanation: "'Antidote' = thuốc giải, giải pháp khắc phục — đồng nghĩa với 'solution'." },
          { id: "r15", question: "15. According to the passage, what part of the brain is affected by consistent mindfulness practice?", options: ["A. The cerebellum", "B. The prefrontal cortex", "C. The brain stem", "D. The visual cortex"], correct: 1, explanation: "'The prefrontal cortex... has also been shown to increase in density with consistent practice.'" },
          { id: "r16", question: "16. The author suggests that mindfulness is particularly valuable today because the environment is:", options: ["A. slow-paced and calm", "B. predictable and quiet", "C. fast-paced and distracting", "D. competitive and judgmental"], correct: 2, explanation: "'This is particularly valuable in today's fast-paced, distracting environment.'" },
          { id: "r17", question: "17. The word 'breath' in line 22 is an example of:", options: ["A. a complex thought pattern", "B. a technique for deep sleep", "C. a focus point in basic meditation", "D. a type of mental judgment"], correct: 2, explanation: "'It often involves basic meditation techniques, such as focusing on the breath.'" },
          { id: "r18", question: "18. Where in the fourth paragraph would the following sentence best fit? 'This gentle redirection is crucial for sustained practice.'", options: ["A. (A)", "B. (B)", "C. (C)", "D. (D)"], correct: 2, explanation: "Câu này mô tả 'gently bringing attention back to the present' ở vị trí (C), sau khi giải thích về việc đưa sự chú ý trở lại hiện tại." },
          { id: "r19", question: "19. Which of the following is NOT mentioned as a benefit of mindfulness in the workplace?", options: ["A. Fostering leadership skills", "B. Enhancing creativity", "C. Improving team dynamics", "D. Guaranteed salary increase"], correct: 3, explanation: "Chưa từng nhắc đến tăng lương. Các lợi ích: lãnh đạo, sáng tạo, động lực nhóm." },
          { id: "r20", question: "20. What is the main idea of the passage?", options: ["A. To describe the Eastern origins of mindfulness", "B. To explain the techniques for a successful meditation practice", "C. To detail the growing use and cognitive benefits of mindfulness", "D. To compare mindfulness with other forms of relaxation"], correct: 2, explanation: "Bài viết tập trung vào việc chánh niệm được ứng dụng rộng rãi và lợi ích nhận thức của nó." }
        ]
      },
      {
        id: "sec3",
        title: "Passage 3 – The Global Challenge of E-Waste",
        level: "B2",
        passage: `The rapid pace of technological innovation has led to a modern environmental crisis: the accumulation of e-waste, or electronic waste. (A) Defined as any discarded electrical or electronic equipment, e-waste includes everything from old cell phones and computers to outdated refrigerators and televisions. (B) This waste stream is growing at an alarming rate, posing significant health and environmental risks globally.

E-waste contains a complex mix of materials. While it holds valuable materials like gold, silver, and copper that can be recycled, it also contains highly toxic substances such as lead, mercury, and cadmium. Improper disposal, often involving primitive recycling methods in developing countries, results in these toxins leaching into the soil and water, and being released into the air when burned. This contamination is a major cause of health issues, including neurological damage and respiratory illnesses, among workers and local communities.

(C) Addressing the e-waste problem requires a multi-faceted approach. Manufacturers must embrace Extended Producer Responsibility (EPR), a policy framework that holds them accountable for the entire life cycle of their products, from design to disposal. Designing products for longevity, easier repair, and eventual dismantling is key to reducing the volume of waste generated.

Consumers also play a vital role. They need to be educated about the importance of properly recycling their electronics instead of simply throwing them into the regular trash. (D) Additionally, the trend of constantly upgrading to the newest gadget contributes significantly to the problem, and a shift towards more sustainable consumption habits is crucial. With a combined effort from industry, government, and consumers, the e-waste challenge can be managed for a healthier planet.`,
        questions: [
          { id: "r21", question: "21. What is e-waste defined as in the passage?", options: ["A. Only discarded cell phones and computers", "B. Any outdated home appliance", "C. Any discarded electrical or electronic equipment", "D. Only toxic materials from old electronics"], correct: 2, explanation: "'Defined as any discarded electrical or electronic equipment.'" },
          { id: "r22", question: "22. The word 'alarming' in line 5 is closest in meaning to:", options: ["A. calming", "B. slow", "C. disturbing", "D. manageable"], correct: 2, explanation: "'Alarming rate' = tốc độ đáng báo động, 'alarming' = disturbing (đáng lo ngại)." },
          { id: "r23", question: "23. E-waste contains a mix of valuable materials and:", options: ["A. organic waste", "B. highly toxic substances", "C. construction debris", "D. harmless plastic"], correct: 1, explanation: "'it also contains highly toxic substances such as lead, mercury, and cadmium.'" },
          { id: "r24", question: "24. What is one main consequence of improper e-waste disposal?", options: ["A. Increased global trade", "B. Contamination of soil, water, and air", "C. Rapid technological innovation", "D. Lower manufacturing costs"], correct: 1, explanation: "'toxins leaching into the soil and water, and being released into the air when burned.'" },
          { id: "r25", question: "25. The word 'leaching' in line 12 is closest in meaning to:", options: ["A. bonding", "B. burning", "C. dissolving and draining away", "D. being protected"], correct: 2, explanation: "'Leaching' = rò rỉ, ngấm vào (chất lỏng thấm qua đất)." },
          { id: "r26", question: "26. What does EPR require manufacturers to be accountable for?", options: ["A. Only the product's design phase", "B. Only the recycling phase", "C. The entire life cycle of their products", "D. Consumer education and awareness only"], correct: 2, explanation: "'holds them accountable for the entire life cycle of their products, from design to disposal.'" },
          { id: "r27", question: "27. The author suggests that designing products for longevity is important for:", options: ["A. making them cheaper to manufacture", "B. reducing the volume of waste generated", "C. increasing their speed and performance", "D. making them easier to transport"], correct: 1, explanation: "'Designing products for longevity... is key to reducing the volume of waste generated.'" },
          { id: "r28", question: "28. Where in the first paragraph would the following sentence best fit? 'This global issue demands immediate, collaborative action.'", options: ["A. (A)", "B. (B)", "C. (C)", "D. (D)"], correct: 1, explanation: "Câu kết luận về mức độ nghiêm trọng phù hợp sau khi mô tả vấn đề, tức vị trí (B)." },
          { id: "r29", question: "29. According to the passage, what is a key consumer behavior that contributes to the e-waste problem?", options: ["A. Buying older, used gadgets", "B. The trend of constantly upgrading to new gadgets", "C. Recycling electronics properly", "D. Choosing products designed for longevity"], correct: 1, explanation: "'the trend of constantly upgrading to the newest gadget contributes significantly to the problem.'" },
          { id: "r30", question: "30. The author's main message is that the e-waste problem:", options: ["A. is mostly the fault of consumers", "B. can only be solved by government regulation", "C. is a serious environmental issue that requires collaborative action", "D. will eventually solve itself as technology improves"], correct: 2, explanation: "'With a combined effort from industry, government, and consumers, the e-waste challenge can be managed.'" }
        ]
      },
      {
        id: "sec4",
        title: "Passage 4 – The Mystery of the Moai on Easter Island",
        level: "B2/C1",
        passage: `Rapa Nui, better known as Easter Island, is a remote Polynesian island famous for its nearly 1,000 colossal stone statues, known as Moai. These monolithic figures, carved between the 13th and 16th centuries by the island's early inhabitants, stand silently along the coastline, facing inland. The sheer size and number of the Moai, combined with the island's relative isolation, have puzzled researchers for generations, particularly regarding the methods used to transport and erect them.

The Moai were primarily carved from volcanic tuff found at the Rano Raraku quarry, a site that still holds hundreds of unfinished statues. The completed Moai weigh an average of 14 tons, with some exceeding 80 tons. The popular, though disputed, theory for their transportation suggests that the islanders used complex systems of ropes and wooden sledges, slowly 'walking' the statues from the quarry to their designated ceremonial platforms (ahu).

The decline of the Rapa Nui civilization is closely linked to the fate of the Moai. As the population grew, the islanders heavily deforested the land to acquire wood for everything from housing to moving the giant statues. This environmental destruction led to soil erosion, resource scarcity, and ultimately, internal conflict. Evidence suggests that during this period of collapse, the islanders began toppling the Moai, perhaps symbolizing the breakdown of their social and religious order.

However, recent research suggests that the story of total collapse might be an oversimplification. While the environmental damage was real, the Rapa Nui people demonstrated remarkable resilience, adapting their agricultural practices and social structures to the new, treeless landscape. Yet, the question of the Moai remains. The island continues to draw scholars and tourists alike, a lasting testament to the ambition and eventual struggle of its original inhabitants.`,
        questions: [
          { id: "r31", question: "31. What is Rapa Nui famous for?", options: ["A. Its rich biodiversity", "B. Its nearly 1,000 colossal stone statues (Moai)", "C. Its lush rainforests", "D. Its large volcanic mountain"], correct: 1, explanation: "'Rapa Nui... is famous for its nearly 1,000 colossal stone statues, known as Moai.'" },
          { id: "r32", question: "32. The Moai were carved by the early inhabitants of Easter Island between the _________ centuries.", options: ["A. 11th and 14th", "B. 13th and 16th", "C. 15th and 18th", "D. 17th and 20th"], correct: 1, explanation: "'carved between the 13th and 16th centuries by the island's early inhabitants.'" },
          { id: "r33", question: "33. The word 'colossal' in line 2 is closest in meaning to:", options: ["A. small", "B. colorful", "C. giant", "D. ordinary"], correct: 2, explanation: "'Colossal statues' = tượng khổng lồ, 'colossal' = giant." },
          { id: "r34", question: "34. The main challenge for researchers studying the Moai is understanding:", options: ["A. the religious beliefs they represent", "B. the origin of the islanders", "C. the methods used to transport and erect them", "D. the material they were made from"], correct: 2, explanation: "'puzzled researchers... particularly regarding the methods used to transport and erect them.'" },
          { id: "r35", question: "35. The word 'their' in line 11 refers to:", options: ["A. Moai's", "B. researchers'", "C. islanders'", "D. wooden sledges'"], correct: 2, explanation: "'the islanders... slowly 'walking' the statues from the quarry to their designated ceremonial platforms' — 'their' = islanders'." },
          { id: "r36", question: "36. Where were the Moai primarily carved?", options: ["A. Along the coastline", "B. In the ceremonial platforms (ahu)", "C. At the Rano Raraku quarry", "D. In the center of the island"], correct: 2, explanation: "'primarily carved from volcanic tuff found at the Rano Raraku quarry.'" },
          { id: "r37", question: "37. The decline of the Rapa Nui civilization is primarily linked to:", options: ["A. a major earthquake", "B. heavy deforestation and resource scarcity", "C. a sudden volcanic eruption", "D. a foreign invasion"], correct: 1, explanation: "'the islanders heavily deforested the land... This led to soil erosion, resource scarcity, and ultimately, internal conflict.'" },
          { id: "r38", question: "38. The word 'toppling' in line 18 is closest in meaning to:", options: ["A. building up", "B. standing up", "C. knocking over", "D. decorating"], correct: 2, explanation: "'the islanders began toppling the Moai' = đẩy đổ, 'toppling' = knocking over." },
          { id: "r39", question: "39. The word 'testament' in line 25 is closest in meaning to:", options: ["A. challenge", "B. proof", "C. question", "D. obstacle"], correct: 1, explanation: "'a lasting testament to the ambition...' = minh chứng, bằng chứng; 'testament' = proof." },
          { id: "r40", question: "40. What is the author's final attitude toward the Rapa Nui people?", options: ["A. They failed to adapt to their new environment", "B. They lacked the engineering skills to move the statues", "C. They showed remarkable resilience despite environmental damage", "D. They were solely responsible for the island's deforestation"], correct: 2, explanation: "'the Rapa Nui people demonstrated remarkable resilience, adapting their agricultural practices... to the new, treeless landscape.'" }
        ]
      }
    ],
    title: "VSTEP Reading Practice - Sample Test (prepedu.com)",
    passage: "",
    questions: []
  },

  // ========================================================================
  // LISTENING - 3 parts, 35 questions, ~40 minutes
  // Content adapted from prepedu.com VSTEP sample listening test
  // ========================================================================
  listening: {
    parts: [
      {
        id: "part1",
        title: "Part 1: Short Announcements (8 câu)",
        description: "Bạn sẽ nghe 8 thông báo/ hướng dẫn ngắn. Mỗi đoạn có 1 câu hỏi.",
        audioText: "",
        scripts: [
          { label: "Announcement 1 - Museum hours", text: "Attention visitors. The City Museum will now close at 8 PM on Fridays instead of 6 PM. This new schedule begins next week." },
          { label: "Announcement 2 - Flight information", text: "Passengers for Singapore Airlines flight SQ 231 to Singapore please proceed to Gate 15 for boarding. The flight will depart at 10:30 AM." },
          { label: "Announcement 3 - Office notice", text: "Please be informed that the IT system will be upgraded this weekend. All staff must save their work and log off by 5 PM on Friday." },
          { label: "Announcement 4 - Marathon registration", text: "Registration for the City Marathon is now open online at our official website. Early bird discounts are available until the end of this month." },
          { label: "Announcement 5 - Lecture schedule", text: "The lecture on modern history originally scheduled for Tuesday has been moved to Thursday morning at 10 AM in Hall B." },
          { label: "Announcement 6 - New coffee shop", text: "A new coffee shop has opened on campus featuring live acoustic music every weekend. All students receive a 10% discount during the first week." },
          { label: "Announcement 7 - Road closure", text: "Main Street will be closed for repairs for 24 hours starting from 8 PM tonight. Please use alternative routes." },
          { label: "Announcement 8 - New employee onboarding", text: "All new employees must complete the online training module before their first day of work. The module takes approximately two hours." }
        ],
        questions: [
          { id: "l1", question: "1. What is the new closing time for the City Museum on Fridays?", options: ["A. 6:00 PM", "B. 7:00 PM", "C. 8:00 PM", "D. 9:00 PM"], correct: 2, explanation: "'The City Museum will now close at 8 PM on Fridays instead of 6 PM.'" },
          { id: "l2", question: "2. Which gate does the flight to Singapore depart from?", options: ["A. Gate 10", "B. Gate 15", "C. Gate 20", "D. Gate 25"], correct: 1, explanation: "'passengers for Singapore Airlines flight SQ 231... proceed to Gate 15.'" },
          { id: "l3", question: "3. What is the main purpose of the announcement?", options: ["A. To announce a staff meeting", "B. To inform about an IT system upgrade", "C. To advertise a new product", "D. To report a security issue"], correct: 1, explanation: "'the IT system will be upgraded this weekend. All staff must save their work and log off by 5 PM on Friday.'" },
          { id: "l4", question: "4. Where should participants register for the marathon?", options: ["A. At the main entrance", "B. Online", "C. At the City Hall", "D. At the sports center"], correct: 1, explanation: "'Registration for the City Marathon is now open online at our official website.'" },
          { id: "l5", question: "5. When will the lecture on modern history be held?", options: ["A. Tuesday morning", "B. Wednesday afternoon", "C. Thursday morning", "D. Friday afternoon"], correct: 2, explanation: "'The lecture on modern history... has been moved to Thursday morning at 10 AM.'" },
          { id: "l6", question: "6. What is a special feature of the new coffee shop?", options: ["A. Free Wi-Fi access", "B. A selection of imported teas", "C. Live acoustic music", "D. Discounted pastries"], correct: 2, explanation: "'featuring live acoustic music every weekend.'" },
          { id: "l7", question: "7. How long will the road closure on Main Street last?", options: ["A. Until the end of the day", "B. For 24 hours", "C. For the entire week", "D. Until Friday morning"], correct: 1, explanation: "'Main Street will be closed for repairs for 24 hours starting from 8 PM tonight.'" },
          { id: "l8", question: "8. What must new employees complete before starting work?", options: ["A. A fitness test", "B. An online training module", "C. A background check", "D. A face-to-face interview"], correct: 1, explanation: "'All new employees must complete the online training module before their first day of work.'" }
        ]
      },
      {
        id: "part2",
        title: "Part 2: Conversations (12 câu - 3 hội thoại × 4 câu)",
        description: "Bạn sẽ nghe 3 đoạn hội thoại. Mỗi đoạn có 4 câu hỏi.",
        audioText: "",
        scripts: [
          {
            label: "Conversation 1 - Mua quà sinh nhật",
            lines: [
              { speaker: "Man", text: "I need to buy a birthday present for my sister Sarah. I was thinking about getting her a book. She loves reading." },
              { speaker: "Woman", text: "That's a nice idea, but she already has a huge collection of books. How about a piece of jewelry?" },
              { speaker: "Man", text: "That might be too expensive for my budget. I only have about 300,000 dong." },
              { speaker: "Woman", text: "What about a scarf? Winter is coming and she loves fashion. I think she would really like it." },
              { speaker: "Man", text: "That's a great suggestion. Where can we buy one?" },
              { speaker: "Woman", text: "There's a shop near the park that sells beautiful handmade scarves. We can go tomorrow afternoon after work." }
            ]
          },
          {
            label: "Conversation 2 - Nhân viên bị ốm",
            lines: [
              { speaker: "Man", text: "I think I'm getting sick. I have a sore throat and a fever. But I have an important presentation tomorrow." },
              { speaker: "Woman", text: "You should inform the manager immediately. Maybe someone can cover for you." },
              { speaker: "Man", text: "Do you think Lisa would be able to do the presentation?" },
              { speaker: "Woman", text: "She's very familiar with the project. I'm sure she can handle it." },
              { speaker: "Man", text: "I'll call Lisa now and then tell the manager about my situation." },
              { speaker: "Woman", text: "Good idea. And you should go home and rest after that." }
            ]
          },
          {
            label: "Conversation 3 - Khách sạn",
            lines: [
              { speaker: "Man", text: "Hello, I have a reservation for two nights. But I'd like to extend my stay for one more night." },
              { speaker: "Receptionist", text: "Let me check availability. Yes, that's possible. What type of room would you like to keep?" },
              { speaker: "Man", text: "I'd like to keep the non-smoking room with a sea view that I currently have." },
              { speaker: "Receptionist", text: "That room is available for an extra night. There will be an additional charge of 800,000 dong per night." },
              { speaker: "Man", text: "That's fine. Does the room include breakfast?" },
              { speaker: "Receptionist", text: "Yes, complimentary breakfast is included. You can enjoy it from 6:30 to 9:30 AM every morning." }
            ]
          }
        ],
        questions: [
          { id: "l9", question: "9. What was the man initially thinking of buying for Sarah?", options: ["A. A watch", "B. A scarf", "C. A book", "D. A piece of jewelry"], correct: 2, explanation: "'I was thinking about getting her a book. She loves reading.'" },
          { id: "l10", question: "10. Why does the woman reject the man's first idea?", options: ["A. It is too expensive", "B. Sarah doesn't enjoy that item", "C. Sarah already owns many of them", "D. It is not suitable for the season"], correct: 2, explanation: "'she already has a huge collection of books.'" },
          { id: "l11", question: "11. Why do the speakers decide that a scarf is a good choice?", options: ["A. It fits the man's budget", "B. Sarah needs one for her job", "C. Sarah loves fashion and winter is approaching", "D. They can buy it tonight"], correct: 2, explanation: "'Winter is coming and she loves fashion.'" },
          { id: "l12", question: "12. When will the speakers go to buy the gift?", options: ["A. Tonight", "B. Next week", "C. Tomorrow morning", "D. Tomorrow afternoon"], correct: 3, explanation: "'We can go tomorrow afternoon after work.'" },
          { id: "l13", question: "13. What is the man's main problem?", options: ["A. He missed a crucial deadline", "B. He is stressed about a project", "C. He is too sick to give a presentation", "D. He lost his notes for the presentation"], correct: 2, explanation: "'I think I'm getting sick. I have a sore throat and a fever. But I have an important presentation tomorrow.'" },
          { id: "l14", question: "14. What does the woman suggest the man should do?", options: ["A. Try to get better quickly", "B. Go to the doctor right away", "C. Inform the manager immediately", "D. Ask a colleague to substitute for him"], correct: 2, explanation: "'You should inform the manager immediately. Maybe someone can cover for you.'" },
          { id: "l15", question: "15. Who does the woman suggest could cover the presentation?", options: ["A. The manager", "B. Lisa", "C. John", "D. Another department head"], correct: 1, explanation: "'Do you think Lisa would be able to do the presentation?' / 'She's very familiar with the project.'" },
          { id: "l16", question: "16. What is the man planning to do right after calling his colleague?", options: ["A. Prepare his presentation", "B. Go home and rest", "C. Tell the manager about his flu", "D. Review the project with Lisa"], correct: 2, explanation: "'I'll call Lisa now and then tell the manager about my situation.'" },
          { id: "l17", question: "17. What is the man's original reservation length?", options: ["A. One night", "B. Two nights", "C. Three nights", "D. One week"], correct: 1, explanation: "'I have a reservation for two nights.'" },
          { id: "l18", question: "18. Why does the man want to stay for an extra night?", options: ["A. He is waiting for a flight", "B. His plans have changed", "C. He wants a free breakfast", "D. He is waiting for a friend"], correct: 1, explanation: "'I'd like to extend my stay for one more night.' Không nêu rõ lý do, nhưng ngụ ý thay đổi kế hoạch." },
          { id: "l19", question: "19. What specific type of room does the man confirm he wants to keep?", options: ["A. A smoking room with a city view", "B. A non-smoking room with a sea view", "C. A suite with a balcony", "D. A room with complimentary Wi-Fi"], correct: 1, explanation: "'I'd like to keep the non-smoking room with a sea view that I currently have.'" },
          { id: "l20", question: "20. What is included with the room?", options: ["A. Free parking", "B. Dinner service", "C. Complimentary breakfast", "D. Free gym access"], correct: 2, explanation: "'Does the room include breakfast?' / 'Yes, complimentary breakfast is included.'" }
        ]
      },
      {
        id: "part3",
        title: "Part 3: Talks & Lectures (15 câu - 3 bài × 5 câu)",
        description: "Bạn sẽ nghe 3 bài nói chuyện / bài giảng. Mỗi bài có 5 câu hỏi.",
        audioText: "",
        scripts: [
          {
            label: "Talk 1 - Digital Citizenship",
            text: `Good morning, class. Today we are going to discuss digital citizenship, which refers to the responsible use of technology by anyone who uses computers, the internet, and digital devices.

First, let's talk about online privacy. Many people assume their personal information is protected, but this is not always the case. Users need to actively manage their privacy settings and be cautious about what they share online.

Second, cyberbullying is a serious issue. If you or someone you know experiences cyberbullying, the best response is to report the content and block the user. Never respond directly or try to handle it alone.

Third, your digital footprint is the permanent record of everything you do online — every post, comment, and search. This record can affect your future opportunities, including college admissions and jobs.

In conclusion, my advice is simple: think before you post. Everything you put online stays there forever. Be responsible digital citizens.`
          },
          {
            label: "Talk 2 - Roman Engineering",
            text: `Today's lecture focuses on one of the greatest engineering achievements of the ancient world: Roman roads and bridges.

What made Roman engineering so remarkable was the incredible straightness and durability of their roads. Unlike many modern roads that follow the natural landscape, Roman roads were built in straight lines as much as possible, cutting through hills and spanning valleys.

The primary purpose of these roads was military. They allowed the Roman army to move troops and officials quickly across the vast empire. A legion could march up to 30 kilometers a day on these well-built roads.

Roman bridges were equally impressive. Many were constructed using arches, a technique that distributed weight effectively. Some Roman bridges are actually still in use today, nearly two thousand years later. This is a testament to the quality of their construction and materials.

The lecture today highlights the remarkable achievement of Roman engineering. Their roads and bridges were not only functional but also incredibly durable, showcasing their advanced understanding of construction principles.`
          },
          {
            label: "Talk 3 - The Story of Coffee",
            text: `Today, I'd like to share with you the fascinating story of coffee, one of the world's most popular beverages.

Coffee was first discovered in Ethiopia, a country in Africa. According to legend, a goat herder noticed that his goats became very energetic after eating berries from a certain tree. This led to the discovery of coffee beans.

The geographical zone suitable for growing coffee is called the 'Bean Belt.' This area lies between the Tropics of Cancer and Capricorn and includes parts of Africa, South America, and Asia. Coffee plants require specific conditions: high altitude, consistent rainfall, and moderate temperatures.

There are two main methods for processing coffee beans. The 'wet method' is more labor-intensive and quality-focused. It involves removing the fruit pulp before drying the beans. This method produces higher quality coffee but requires more water and effort. The 'dry method' is cheaper and faster but often results in lower quality.

Coffee is a crop that requires very specific climate conditions to thrive. Changes in temperature or rainfall patterns can significantly affect harvests. This makes the coffee industry particularly vulnerable to climate change.`
      },
        ],
        questions: [
          { id: "l21", question: "21. What is the talk mainly about?", options: ["A. The history of the internet", "B. The dangers of social media", "C. The importance of digital citizenship", "D. New technology trends"], correct: 2, explanation: "'Today we are going to discuss digital citizenship.'" },
          { id: "l22", question: "22. What does the speaker emphasize about online privacy?", options: ["A. It is guaranteed by most websites", "B. It is less important for younger users", "C. Users need to actively manage their settings", "D. Personal information is rarely shared"], correct: 2, explanation: "'Users need to actively manage their privacy settings and be cautious about what they share online.'" },
          { id: "l23", question: "23. What is a suggested way to combat cyberbullying?", options: ["A. Ignoring the bully", "B. Posting a public response", "C. Reporting the content and blocking the user", "D. Asking friends to intervene"], correct: 2, explanation: "'the best response is to report the content and block the user.'" },
          { id: "l24", question: "24. According to the speaker, what is a 'digital footprint'?", options: ["A. The total amount of time spent online", "B. The unique search history of a user", "C. The permanent record of one's online activities", "D. The number of followers a person has"], correct: 2, explanation: "'your digital footprint is the permanent record of everything you do online.'" },
          { id: "l25", question: "25. What is the speaker's concluding advice?", options: ["A. To limit screen time", "B. To think before posting", "C. To use strong passwords only", "D. To avoid all social media"], correct: 1, explanation: "'think before you post. Everything you put online stays there forever.'" },
          { id: "l26", question: "26. What is the lecture primarily discussing?", options: ["A. Types of ancient architecture", "B. The construction of the pyramids", "C. Engineering in the modern world", "D. The role of Roman roads"], correct: 3, explanation: "'Today's lecture focuses on one of the greatest engineering achievements of the ancient world: Roman roads and bridges.'" },
          { id: "l27", question: "27. What characteristic of Roman roads is highlighted?", options: ["A. Their complex drainage systems", "B. Their use of light, local materials", "C. Their incredible straightness and durability", "D. Their innovative use of concrete"], correct: 2, explanation: "'the incredible straightness and durability of their roads.'" },
          { id: "l28", question: "28. How did the Romans primarily use their roads?", options: ["A. For public leisure and trade", "B. For transporting heavy building materials", "C. For quickly moving troops and officials", "D. For agricultural purposes"], correct: 2, explanation: "'The primary purpose of these roads was military. They allowed the Roman army to move troops and officials quickly.'" },
          { id: "l29", question: "29. What does the speaker mention about Roman bridges?", options: ["A. They were often destroyed by floods", "B. They were built entirely of wood", "C. Some are still in use today", "D. They relied on modern steel supports"], correct: 2, explanation: "'Some Roman bridges are actually still in use today, nearly two thousand years later.'" },
          { id: "l30", question: "30. What is the overall tone of the lecture regarding Roman engineering?", options: ["A. Critical", "B. Neutral", "C. Admiring", "D. Indifferent"], correct: 2, explanation: "Giọng điệu ngưỡng mộ: 'remarkable achievement', 'incredibly durable', 'a testament to the quality'." },
          { id: "l31", question: "31. What is the main topic of the presentation?", options: ["A. The history of coffee consumption", "B. The economic impact of the coffee industry", "C. The health risks of caffeine", "D. The process of coffee cultivation"], correct: 3, explanation: "Bài nói về nguồn gốc, vùng trồng và chế biến cà phê." },
          { id: "l32", question: "32. Where does the speaker suggest coffee was first discovered?", options: ["A. South America", "B. Arabia", "C. Africa", "D. Asia"], correct: 2, explanation: "'Coffee was first discovered in Ethiopia, a country in Africa.'" },
          { id: "l33", question: "33. What is the significance of the 'Bean Belt'?", options: ["A. It's the region where most coffee is exported", "B. It's the primary area for processing coffee beans", "C. It's the geographical zone suitable for growing coffee", "D. It's the historical trade route for coffee"], correct: 2, explanation: "'The geographical zone suitable for growing coffee is called the 'Bean Belt.''" },
          { id: "l34", question: "34. What is the 'wet method' of coffee processing described as?", options: ["A. Cheaper and faster", "B. More labor-intensive and quality-focused", "C. Requiring minimal water", "D. Suitable for all types of beans"], correct: 1, explanation: "'The 'wet method' is more labor-intensive and quality-focused.'" },
          { id: "l35", question: "35. What does the speaker suggest about coffee as a crop?", options: ["A. It is very easy to grow and maintain", "B. It requires specific climate conditions", "C. It has become less popular recently", "D. It provides few job opportunities"], correct: 1, explanation: "'Coffee is a crop that requires very specific climate conditions to thrive.'" }
        ]
      }
    ],
    title: "VSTEP Listening Practice - Sample Test (prepedu.com)",
    audioText: "",
    questions: []
  },

  // ========================================================================
  // WRITING - 2 tasks, 60 minutes
  // Updated with prepedu.com sample prompts
  // ========================================================================
  writing: {
    title: "VSTEP Writing Practice - Sample Test (prepedu.com)",
    task1: {
      prompt: "You should spend about 20 minutes on this task.\n\nYou live in Ho Chi Minh City. Recently, you participated in a technology workshop in Singapore with your colleague named Michael. After returning, Michael sent you an email. Read part of the email below:\n\n'The Singapore workshop was a great experience, and I learned so much about the new AI tools. I hope you had a good flight back to Ho Chi Minh City. Did you manage to implement any of the tools we discussed? I'm thinking of proposing another professional development event later this year. What kind of event do you think would be most useful for our team?'\n\nWrite a reply to Michael. In your email, you have to:\n- Tell him that you learned a lot from the workshop and mention one thing you learned.\n- Describe one difficulty you faced while trying to implement the new AI tools.\n- Suggest a type of future professional development event and explain why it would be useful.\n\nYou should write at least 120 words.",
      sampleAnswer: "Dear Michael,\n\nThank you for your email. I hope you're doing well! The Singapore workshop was indeed an incredible experience, and I'm very grateful we had the opportunity to attend together.\n\nI learned so much from the sessions, especially about how AI tools can automate customer service responses. The demonstration of the chatbot integration was particularly eye-opening — I had no idea that AI could handle such complex queries so efficiently.\n\nHowever, I did face some challenges when trying to implement these tools back at our office. The main difficulty was convincing my team to adopt the new system. Some colleagues were hesitant because they were comfortable with our existing workflow. I also encountered some technical issues with integrating the AI software with our current database.\n\nRegarding the next professional development event, I would suggest a workshop on data analytics. Many of our team members lack skills in interpreting data, and this would greatly improve our decision-making processes.\n\nLooking forward to hearing your thoughts!\n\nBest regards,\n[Your Name]",
      minWords: 120,
      guide: "Cấu trúc email: 1) Lời chào + cảm ơn; 2) Kể 1 điều học được từ workshop; 3) Khó khăn khi triển khai; 4) Đề xuất sự kiện tương lai + lý do; 5) Kết thư. Sử dụng ngôn ngữ thân thiện vì viết cho đồng nghiệp."
    },
    task2: {
      prompt: "You should spend about 40 minutes on this task.\n\nRead the following text from an article about globalization:\n\n'Globalization, the increasing interconnectedness of the world's economies and cultures, has brought unprecedented opportunities for trade and communication. However, it also raises concerns about cultural homogenization and economic inequality.'\n\nWrite an essay to an educated reader discussing the advantages and disadvantages of globalization on societies and their people. Include reasons and relevant examples to support your answer.\n\nYou should write at least 250 words.",
      sampleAnswer: "Globalization has become one of the defining phenomena of the 21st century, reshaping economies, cultures, and societies worldwide. While it offers significant benefits, it also presents considerable challenges that must be carefully considered.\n\nOn the one hand, globalization has brought unprecedented economic opportunities. International trade has allowed developing countries to access global markets, boosting their economic growth. For example, Vietnam's textile and electronics industries have flourished thanks to foreign investment and export opportunities. Additionally, globalization has facilitated the rapid exchange of knowledge and technology, enabling countries to leapfrog stages of development. The spread of mobile banking in Africa, for instance, has transformed financial inclusion for millions.\n\nCultural exchange is another positive aspect. People now have access to art, music, literature, and cuisine from around the world. This exposure fosters cross-cultural understanding and broadens perspectives. Moreover, international collaboration on issues like climate change and public health has become more effective through global networks.\n\nOn the other hand, globalization has valid drawbacks. Cultural homogenization threatens local traditions and identities. In many countries, Western brands and media dominate, pushing local cultures to the margins. Economic inequality has also widened in many places. While multinational corporations profit enormously, workers in developing countries often face poor conditions and low wages.\n\nIn my opinion, the key is not to reject globalization but to manage it more equitably. Policies that protect local industries, preserve cultural heritage, and ensure fair labor standards can help maximize the benefits while minimizing the harms.\n\nIn conclusion, globalization is a double-edged sword. Its impact depends largely on how it is managed by governments, businesses, and international organizations.",
      minWords: 250,
      guide: "Cấu trúc bài luận: 1) Mở bài: giới thiệu globalization và hai mặt của nó; 2) Thân bài 1: lợi ích (kinh tế, văn hóa, kỹ thuật) kèm ví dụ; 3) Thân bài 2: bất lợi (đồng hóa văn hóa, bất bình đẳng); 4) Ý kiến cá nhân + đề xuất; 5) Kết luận. Sử dụng từ nối: On the one hand, Furthermore, In my opinion, In conclusion."
    }
  },

  // ========================================================================
  // SPEAKING - 3 parts, computer-based test
  // Updated with prepedu.com sample questions
  // ========================================================================
  speaking: {
    title: "VSTEP Speaking Practice - Sample Test (prepedu.com)",
    part1: {
      title: "Part 1: Social Interaction (Tương tác xã hội) - ~3 phút",
      description: "Bạn sẽ trả lời các câu hỏi về bản thân và các chủ đề quen thuộc. Trả lời 2-3 câu mỗi câu hỏi.",
      questions: [
        "Question 1: What kind of place is your hometown?",
        "Question 2: What do you like most about living there?",
        "Question 3: Are there any problems with your hometown that you would like to change?",
        "Question 4: Do you enjoy reading books? Why or why not?",
        "Question 5: What kind of books do you usually read?",
        "Question 6: Do you prefer reading physical books or e-books?"
      ],
      sampleAnswers: [
        "My hometown is a small coastal city in central Vietnam called Da Nang. It's known for its beautiful beaches, the Marble Mountains, and a very friendly community. The city is modern but still retains its traditional charm.",
        "What I like most is the combination of mountains and sea. You can go to the beach in the morning and hike in the mountains in the afternoon. The food is also amazing — especially the fresh seafood.",
        "One problem is that the city has become very crowded in recent years due to tourism. Traffic congestion during peak season can be quite frustrating. I wish there were better public transportation options.",
        "Yes, I enjoy reading very much. Reading helps me relax after a long day and expands my knowledge. It's also a great way to improve my vocabulary in both Vietnamese and English.",
        "I usually read self-development books and business biographies. Recently, I finished a book about how successful startups were built. I find real-life stories more inspiring than fiction.",
        "I prefer physical books because I like the feeling of turning pages and the smell of paper. However, I also use e-books when I travel because they are more convenient to carry around."
      ]
    },
    part2: {
      title: "Part 2: Solution Discussion (Thảo luận giải pháp) - ~4 phút",
      description: "Bạn được đưa ra một tình huống với 3 lựa chọn. Hãy chọn giải pháp tốt nhất, giải thích lý do và phản biện các phương án khác.",
      situation: "Situation: You are the manager of a small student bookstore near a university. The store is experiencing a noticeable drop in sales. You and your staff need to decide on the best way to attract more customers. Three options are being considered:\n\nOption A: Introduce a permanent student discount (10-15%) on all items.\nOption B: Organize weekly book clubs and author signing events.\nOption C: Expand the product range to include stationery and coffee.\n\nWhich option do you think would be the most effective and sustainable for increasing sales? Why?",
      sampleAnswer: "In my opinion, Option C — expanding the product range to include stationery and coffee — would be the most effective and sustainable approach.\n\nFirst, this option directly addresses the needs of our target customers: university students. Students constantly need stationery items like notebooks, pens, and folders for their studies. By offering these alongside books, we become a one-stop shop for students. Additionally, adding a coffee corner creates a space where students can study, meet friends, or relax between classes. This increases foot traffic and encourages longer visits, which typically leads to more purchases.\n\nOption A (student discount) could work in the short term, but it reduces our profit margin significantly. Once students get used to discounts, it's hard to revert to normal prices. Option B (book clubs and events) is a good marketing idea but requires significant time and resources to organize. It might not generate immediate sales.\n\nTherefore, I believe Option C offers the best combination of immediate impact and long-term sustainability.",
      guide: "Hướng dẫn: 1) Mở đầu bằng lựa chọn của bạn; 2) Đưa ra 2-3 lý do ủng hộ; 3) Phân tích ngắn gọn tại sao các lựa chọn khác kém hiệu quả hơn; 4) Kết luận. Sử dụng từ nối: Firstly, Additionally, In contrast, Therefore."
    },
    part3: {
      title: "Part 3: Topic Development (Phát triển chủ đề) - ~5 phút",
      description: "Bạn sẽ thuyết trình về một chủ đề và trả lời câu hỏi phản biện. Phát triển ý sâu sắc, có dẫn chứng.",
      topic: "Topic: The Impact of Social Media on Modern Life",
      ideas: [
        "Communication: Social media connects people globally and enables instant messaging across continents.",
        "Business & Marketing: Companies use social media for advertising, e-commerce, and brand building.",
        "Information Sharing: News spreads faster than ever, but so does misinformation.",
        "Mental Health: Excessive use can lead to anxiety, comparison, and reduced face-to-face interaction."
      ],
      sampleAnswer: "Social media has profoundly transformed modern life in both positive and negative ways. I will discuss several key aspects of this impact.\n\nFirst, in terms of communication, social media has broken down geographical barriers. Platforms like Facebook, WhatsApp, and Zoom allow people to maintain relationships across continents. For example, Vietnamese students studying abroad can video call their families daily. However, this convenience sometimes reduces the quality of deep, face-to-face conversations.\n\nSecond, social media has revolutionized business and marketing. Small businesses can now reach customers through targeted ads at a fraction of traditional marketing costs. Many Vietnamese brands have grown rapidly through Facebook and TikTok marketing. On the other hand, the pressure to maintain a perfect online image can be stressful for business owners.\n\nThird, information sharing has become instantaneous. During natural disasters, social media is often the fastest way to spread emergency information. However, the same speed also allows misinformation and fake news to spread, which can cause real harm.\n\nIn my opinion, the benefits of social media outweigh the risks, but only if used mindfully. Parents should educate teenagers about responsible use, and platforms must do more to combat misinformation.\n\nTo conclude, social media is a powerful tool that reflects both the best and worst of human nature. The key is awareness and balance.",
      guide: "Hướng dẫn: 1) Giới thiệu chủ đề; 2) Phát triển từng ý (mỗi ý 3-4 câu, có ví dụ cụ thể); 3) Trả lời câu hỏi phản biện; 4) Kết luận. Sử dụng cấu trúc: First/Second/Third, For example, In my opinion, To conclude."
    }
  },

  // ========================================================================
  // ACTIVE STUDY METHODS - Gamified & engaging approaches
  // ========================================================================
  methods: [
    {
      id: "method1",
      name: "🧩 Phương phảp Pomodoro luyện đề",
      icon: "⏱️",
      goal: "Tối ưu hóa thời gian tập trung khi luyện đề",
      steps: [
        "Bật timer 25 phút — chỉ tập trung làm bài (không điện thoại, không tab khác).",
        "Nghỉ 5 phút — đứng dậy, vươn vai, uống nước.",
        "Lặp lại 4 lần → nghỉ dài 15-30 phút.",
        "Mỗi phiên Pomodoro hoàn thành = 50 XP thưởng."
      ],
      tip: "Áp dụng cho Reading và Writing — những kỹ năng cần tập trung cao độ. Dùng app Forest hoặc Tomato Timer để theo dõi."
    },
    {
      id: "method2",
      name: "🔁 Phương pháp Spaced Repetition (Ôn tập ngắt quãng)",
      icon: "🧠",
      goal: "Ghi nhớ từ vựng và cấu trúc lâu dài",
      steps: [
        "Học từ mới → ôn lại sau 1 giờ → 1 ngày → 3 ngày → 1 tuần → 1 tháng.",
        "Dùng flashcards (giấy hoặc app như Anki, Quizlet).",
        "Với mỗi từ, tự đặt câu ví dụ thay vì chỉ đọc.",
        "Kiểm tra chéo: nhìn nghĩa tiếng Việt → nói từ tiếng Anh."
      ],
      tip: "Kết hợp với bộ từ vựng VSTEP (458 từ) trong tab 'Từ vựng VSTEP' — mỗi ngày học 10 từ mới + ôn 20 từ cũ."
    },
    {
      id: "method3",
      name: "🎭 Shadowing (Kỹ thuật nói theo)",
      icon: "🎤",
      goal: "Cải thiện phát âm, ngữ điệu và phản xạ Speaking/Listening",
      steps: [
        "Chọn 1 đoạn audio ngắn từ Listening Practice (30-60 giây).",
        "Nghe toàn bộ 1 lượt để nắm nội dung.",
        "Nghe lại và nói theo đồng thời (shadow) — bắt chước giọng, ngữ điệu, tốc độ.",
        "Ghi âm giọng đọc của bạn và so sánh với bản gốc.",
        "Lặp lại mỗi ngày 5-10 phút."
      ],
      tip: "Tập trung vào Part 1 Listening (các thông báo ngắn) — chúng có tốc độ vừa phải và phát âm rõ ràng."
    },
    {
      id: "method4",
      name: "✍️ Kỹ thuật viết 4 bước (PEEL)",
      icon: "📝",
      goal: "Cải thiện cấu trúc bài luận Writing Task 2",
      steps: [
        "P (Point): Nêu luận điểm chính trong câu chủ đề.",
        "E (Explanation): Giải thích ý của bạn chi tiết hơn.",
        "E (Example): Đưa ra ví dụ cụ thể (số liệu, sự kiện, trải nghiệm cá nhân).",
        "L (Link): Kết nối lại với luận điểm chính của đoạn và chuyển sang đoạn tiếp theo."
      ],
      tip: "Mỗi đoạn thân bài trong Task 2 nên có 4-6 câu theo cấu trúc PEEL. Luyện tập bằng cách viết một đoạn PEEL mỗi ngày."
    },
    {
      id: "method5",
      name: "🧪 Kỹ thuật 'Tự chấm chéo' (Peer Review)",
      icon: "🔍",
      goal: "Phát hiện lỗi sai qua góc nhìn của người chấm",
      steps: [
        "Sau khi viết xong, đợi 30 phút rồi đọc lại bài của bạn như một giám khảo.",
        "Dùng 4 tiêu chí VSTEP: Task Completion, Coherence & Cohesion, Vocabulary, Grammar.",
        "Chấm điểm từng tiêu chí trên thang 9.0 và ghi chú lỗi.",
        "So sánh với đánh giá của AI trong tab Writing để học từ sai sót."
      ],
      tip: "Lưu lại các bài đã viết thành portfolio. Sau 2-3 tuần, viết lại cùng đề bài để thấy sự tiến bộ."
    },
    {
      id: "method6",
      name: "🎯 Chiến lược câu hỏi (Question Mapping)",
      icon: "🗺️",
      goal: "Xác định nhanh dạng câu hỏi Reading và hướng xử lý",
      steps: [
        "Đọc câu hỏi trước, gạch chân từ khóa (key words).",
        "Xác định dạng câu hỏi: Main Idea, Detail, Vocabulary, Inference, True/False/NG.",
        "Với Main Idea → đọc câu đầu/cuối mỗi đoạn.",
        "Với Detail → scan tìm từ khóa trong passage.",
        "Với Vocabulary → dựa vào ngữ cảnh xung quanh để đoán nghĩa."
      ],
      tip: "Luyện với 'Question Mapping' trong 10 câu đầu tiên của Passage 1 mỗi ngày, tăng dần tốc độ xử lý."
    },
    {
      id: "method7",
      name: "🎧 Kỹ thuật 'Predict & Check' nghe Listening",
      icon: "👂",
      goal: "Tăng độ chính xác khi nghe Part 2 & 3",
      steps: [
        "Đọc trước câu hỏi (10-15 giây) — dự đoán nội dung sẽ nghe.",
        "Gạch chân từ khóa trong câu hỏi và các đáp án.",
        "Trong khi nghe, tập trung vào từ khóa đã xác định.",
        "Sau khi nghe xong, kiểm tra dự đoán ban đầu của bạn có đúng không.",
        "Phân tích tại sao bạn chọn sai — do không nghe được từ khóa hay do hiểu sai?"
      ],
      tip: "Bắt đầu với Part 2 Listening (hội thoại dài 4 câu hỏi) vì có nhiều ngữ cảnh để dự đoán."
    },
    {
      id: "method8",
      name: "🏆 Thử thách '5 ngày — 5 đề — 5 kỹ năng'",
      icon: "🔥",
      goal: "Tạo thói quen luyện thi đều đặn trong tuần",
      steps: [
        "Ngày 1: Listening — Làm Part 1 (8 câu), chấm điểm, ghi chú lỗi sai.",
        "Ngày 2: Reading — Làm Passage 1 (10 câu), áp dụng Question Mapping.",
        "Ngày 3: Writing — Viết Task 1 (120 từ), tự chấm theo 4 tiêu chí.",
        "Ngày 4: Speaking — Ghi âm Part 1, nghe lại, so sánh với sample answer.",
        "Ngày 5: Full combo — Làm 1 Reading section + 1 Listening part + viết 1 đoạn PEEL."
      ],
      tip: "Mỗi ngày hoàn thành tích vào lịch. Sau 4 tuần (4 chu kỳ), bạn đã luyện 20 đề!"
    }
  ],

  // ========================================================================
  // STUDY ROADMAP - Lộ trình ôn tập theo cấp độ
  // ========================================================================
  roadmap: {
    levels: [
      {
        id: "a2",
        name: "A2 (Cơ bản)",
        description: "Dành cho người mới bắt đầu hoặc mất gốc. Mục tiêu: đạt 30-40% mỗi kỹ năng.",
        duration: "8-12 tuần",
        skills: {
          listening: "Làm quen với âm thanh, nghe từ khóa trong hội thoại đơn giản. Luyện Part 1 (8 câu).",
          reading: "Đọc đoạn văn ngắn 100-150 từ. Luyện kỹ năng tìm thông tin cụ thể (scanning).",
          writing: "Viết câu đơn và câu ghép cơ bản. Luyện Task 1 với 80-100 từ.",
          speaking: "Trả lời câu hỏi đơn giản 1-2 câu. Luyện Part 1 chủ đề quen thuộc."
        },
        focus: "Từ vựng chủ đề hàng ngày (500-800 từ), ngữ pháp cơ bản (thì hiện tại, quá khứ, tương lai đơn).",
        methods: ["Pomodoro luyện đề", "Spaced Repetition từ vựng", "Predict & Check Listening"]
      },
      {
        id: "b1",
        name: "B1 (Trung cấp - Mục tiêu tốt nghiệp ĐH/CĐ)",
        description: "Dành cho sinh viên cần đạt chuẩn đầu ra. Mục tiêu: 50-65% mỗi kỹ năng.",
        duration: "10-16 tuần",
        skills: {
          listening: "Nghe hiểu ý chính và chi tiết trong hội thoại và độc thoại ngắn. Luyện Part 1+2.",
          reading: "Đọc đoạn văn 200-300 từ. Luyện skimming, scanning và true/false/not given.",
          writing: "Viết thư/email 120-150 từ. Luyện Task 1 hoàn chỉnh. Bắt đầu Task 2 (150-200 từ).",
          speaking: "Trả lời câu hỏi và trình bày ý kiến 2-3 phút. Luyện Part 1+2."
        },
        focus: "Từ vựng học thuật cơ bản (1000-1500 từ), câu ghép và câu phức, từ nối đoạn văn.",
        methods: ["Shadowing", "PEEL Writing", "Question Mapping", "5 ngày — 5 kỹ năng"]
      },
      {
        id: "b2",
        name: "B2 (Trên Trung cấp - Mục tiêu Cao học/Công chức)",
        description: "Dành cho học viên cao học, nghiên cứu sinh hoặc giáo viên. Mục tiêu: 65-80%.",
        duration: "12-20 tuần",
        skills: {
          listening: "Nghe hiểu chi tiết, suy luận thái độ người nói. Hoàn thiện Part 1+2+3.",
          reading: "Đọc đoạn văn dài 400-500 từ. Luyện dạng câu hỏi suy luận và từ vựng trong ngữ cảnh.",
          writing: "Viết luận nghị luận 250 từ. Hoàn thiện Task 1+2 trong 60 phút.",
          speaking: "Thuyết trình và phản biện 4-5 phút. Hoàn thiện Part 1+2+3."
        },
        focus: "Từ vựng học thuật nâng cao (2000-3000 từ), cấu trúc câu phức, lập luận và phản biện.",
        methods: ["Peer Review", "Predict & Check", "Full 5-day challenge", "Question Mapping nâng cao"]
      },
      {
        id: "c1",
        name: "C1 (Cao cấp - Mục tiêu giảng dạy/chuyên gia)",
        description: "Dành cho giáo viên tiếng Anh hoặc chuyên gia ngôn ngữ. Mục tiêu: 80-100%.",
        duration: "16-24 tuần",
        skills: {
          listening: "Nghe hiểu nội dung học thuật và tranh luận. Xử lý mọi dạng câu hỏi.",
          reading: "Đọc văn bản học thuật chuyên sâu. Phân tích lập luận, suy luận và đánh giá.",
          writing: "Viết luận học thuật chặt chẽ. Lập luận sắc bén, dẫn chứng thuyết phục.",
          speaking: "Phát triển ý sâu sắc, phản biện linh hoạt, từ vựng đa dạng và tự nhiên."
        },
        focus: "Từ vựng chuyên ngành (4000+ từ), idioms và collocations, văn phong học thuật.",
        methods: ["Tất cả phương pháp", "Tự tạo đề thi thử", "Dạy lại cho người khác", "Phân tích đề thi thật"]
      }
    ]
  }
};
