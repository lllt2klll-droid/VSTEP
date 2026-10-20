/* ==========================================================================
   VSTEP GRAMMAR DATA - ENGLISH GRAMMAR FOR VSTEP EXAM PREPARATION
   Organized by VSTEP levels (B1, B2, C1) and key grammar topics
   ========================================================================== */

window.VSTEPGrammarData = {
  levels: {
    B1: {
      name: "B1 (Level 3)",
      description: "Trình độ trung cấp - Cấu trúc ngữ pháp cơ bản",
      topics: [
        {
          id: "b1_tenses",
          title: "Thì cơ bản (Basic Tenses)",
          description: "12 thì cơ bản trong tiếng Anh",
          content: [
            {
              name: "Present Simple",
              rule: "S + V(s/es)",
              usage: "Sự thật hiển nhiên, thói quen, hành động lặp lại",
              examples: [
                "I study English every day.",
                "She works in a hospital.",
                "The sun rises in the east."
              ],
              notes: "Chia đuôi -s/es cho ngôi thứ 3 số ít"
            },
            {
              name: "Present Continuous",
              rule: "S + am/is/are + V-ing",
              usage: "Hành động đang xảy ra, kế hoạch tương lai gần",
              examples: [
                "I am studying now.",
                "They are playing football.",
                "She is meeting her friend tomorrow."
              ],
              notes: "Dùng với now, at the moment, currently"
            },
            {
              name: "Past Simple",
              rule: "S + V2/ed",
              usage: "Hành động đã xảy ra và kết thúc trong quá khứ",
              examples: [
                "I visited Hanoi last year.",
                "She graduated in 2020.",
                "They watched a movie yesterday."
              ],
              notes: "Có quy tắc và bất quy tắc, dùng với ago, last, yesterday"
            },
            {
              name: "Past Continuous",
              rule: "S + was/were + V-ing",
              usage: "Hành động đang xảy ra trong quá khứ",
              examples: [
                "I was reading when he called.",
                "They were working at 8pm yesterday.",
                "It was raining all night."
              ],
              notes: "Thường đi với when, while, at that time"
            },
            {
              name: "Future Simple",
              rule: "S + will + V",
              usage: "Dự đoán, quyết định tức thời, hứa hẹn",
              examples: [
                "I will help you.",
                "It will rain tomorrow.",
                "She will call you later."
              ],
              notes: "Dùng với predictions, promises, offers"
            },
            {
              name: "Future Continuous",
              rule: "S + will be + V-ing",
              usage: "Hành động sẽ đang xảy ra trong tương lai",
              examples: [
                "I will be working at this time tomorrow.",
                "They will be traveling next week.",
                "She will be studying when you arrive."
              ],
              notes: "Nhấn mạnh quá trình đang diễn ra"
            }
          ]
        },
        {
          id: "b1_passive",
          title: "Câu bị động (Passive Voice)",
          description: "Cấu trúc câu bị động với các thì cơ bản",
          content: [
            {
              name: "Present Simple Passive",
              rule: "S + am/is/are + V3/ed",
              examples: [
                "English is spoken worldwide.",
                "The book is written by famous author.",
                "Cars are manufactured in this factory."
              ]
            },
            {
              name: "Past Simple Passive",
                           rule: "S + was/were + V3/ed",
              examples: [
                "The house was built in 1990.",
                "The letter was sent yesterday.",
                "These photos were taken last summer."
              ]
            },
            {
              name: "Future Simple Passive",
              rule: "S + will be + V3/ed",
              examples: [
                "The project will be completed next month.",
                "The results will be announced tomorrow.",
                "The package will be delivered soon."
              ]
            }
          ]
        },
        {
          id: "b1_conditionals",
          title: "Câu điều kiện (Conditionals)",
          description: "Câu điều kiện loại 0, 1, 2",
          content: [
            {
              name: "Conditional Type 0",
              rule: "If + S + V(present), S + V(present)",
              usage: "Sự thật hiển nhiên",
              example: "If you heat water, it boils."
            },
            {
              name: "Conditional Type 1",
              rule: "If + S + V(present), S + will + V",
              usage: "Khả năng xảy ra trong tương lai",
              example: "If it rains, I will stay at home."
            },
            {
              name: "Conditional Type 2",
              rule: "If + S + V2/ed, S + would + V",
              usage: "Giả định không có thật ở hiện tại",
              example: "If I were rich, I would travel around the world."
            }
          ]
        },
        {
          id: "b1_comparison",
          title: "Câu so sánh (Comparisons)",
          description: "So sánh hơn và so sánh nhất",
          content: [
            {
              name: "Comparative",
              rule: "Adj-er / more + adj + than",
              examples: [
                "She is taller than me.",
                "This car is more expensive than that one.",
                "He runs faster than his brother."
              ]
            },
            {
              name: "Superlative",
              rule: "the + Adj-est / the most + adj",
              examples: [
                "She is the tallest student in class.",
                "This is the most beautiful city I've visited.",
                "He is the best player on the team."
              ]
            }
          ]
        },
        {
          id: "b1_modals",
          title: "Modal Verbs",
          description: "Các động từ khuyết thiếu cơ bản",
          content: [
            {
              name: "Can / Could",
              usage: "Khả năng, sự cho phép",
              examples: [
                "I can swim.",
                "Could you help me?",
                "She can speak three languages."
              ]
            },
            {
              name: "Must / Have to",
              usage: "Sự bắt buộc",
              examples: [
                "You must wear a seatbelt.",
                "I have to finish this report.",
                "Students must attend classes."
              ]
            },
            {
              name: "Should / Ought to",
              usage: "Lời khuyên",
              examples: [
                "You should study harder.",
                "We ought to protect the environment.",
                "She should see a doctor."
              ]
            }
          ]
        }
      ]
    },
    B2: {
      name: "B2 (Level 4)",
      description: "Trình độ cao cấp - Cấu trúc ngữ pháp nâng cao",
      topics: [
        {
          id: "b2_perfect_tenses",
          title: "Thì hoàn thành (Perfect Tenses)",
          description: "Present Perfect, Past Perfect, Future Perfect",
          content: [
            {
              name: "Present Perfect",
              rule: "S + have/has + V3/ed",
              usage: "Hành động xảy ra trong quá khứ, kết quả còn ở hiện tại",
              examples: [
                "I have lived here for 10 years.",
                "She has just finished her homework.",
                "They have visited Paris twice."
              ],
              notes: "Dùng với for, since, just, already, yet"
            },
            {
              name: "Present Perfect Continuous",
              rule: "S + have/has + been + V-ing",
              usage: "Hành động bắt đầu trong quá khứ, kéo dài đến hiện tại",
              examples: [
                "I have been studying for 3 hours.",
                "She has been working here since 2019.",
                "It has been raining all day."
              ],
              notes: "Nhấn mạnh thời gian và quá trình"
            },
            {
              name: "Past Perfect",
              rule: "S + had + V3/ed",
              usage: "Hành động xảy ra trước một hành động khác trong quá khứ",
              examples: [
                "When I arrived, he had already left.",
                "She had finished dinner before he came home.",
                "They had never seen such a beautiful view."
              ],
              notes: "Thường dùng trong câu kể chuyện"
            },
            {
              name: "Future Perfect",
              rule: "S + will have + V3/ed",
              usage: "Hành động sẽ hoàn thành trước một thời điểm trong tương lai",
              examples: [
                "By next year, I will have graduated.",
                "She will have completed the project by Friday.",
                "They will have built the house by 2025."
              ],
              notes: "Dùng với by + time in future"
            }
          ]
        },
        {
          id: "b2_reported_speech",
          title: "Câu tường thuật (Reported Speech)",
          description: "Chuyển đổi câu gián tiếp",
          content: [
            {
              name: "Statement",
              rule: "S + said/told + (that) + S + V (thay đổi thì)",
              examples: [
                "Direct: 'I am tired,' he said.",
                "Reported: He said (that) he was tired.",
                "Direct: 'I will call you,' she told me.",
                "Reported: She told me (that) she would call me."
              ]
            },
            {
              name: "Question",
              rule: "S + asked + if/whether + S + V (không đảo)",
              examples: [
                "Direct: 'Do you like coffee?' he asked.",
                "Reported: He asked if I liked coffee.",
                "Direct: 'Where are you going?' she asked.",
                "Reported: She asked where I was going."
              ]
            }
          ]
        },
        {
          id: "b2_relative_clauses",
          title: "Mệnh đề quan hệ (Relative Clauses)",
          description: "Các loại mệnh đề quan hệ",
          content: [
            {
              name: "Defining Relative Clauses",
              rule: "who, which, that, whose, where, when",
              examples: [
                "The man who lives next door is a doctor.",
                "The book which I bought is interesting.",
                "The city where I was born is beautiful."
              ]
            },
            {
              name: "Non-defining Relative Clauses",
              rule: "who, which, whose, where, when (không dùng that)",
              examples: [
                "My father, who is 60, still works.",
                "Hanoi, which is the capital, is very beautiful.",
                "My friend, whose car broke down, took a taxi."
              ]
            },
            {
              name: "Reduced Relative Clauses",
              rule: "V-ing / V3/ed thay cho mệnh đề quan hệ",
              examples: [
                "The man standing there is my teacher.",
                "The book written by Hemingway is famous.",
                "The girl sitting next to me is my sister."
              ]
            }
          ]
        },
        {
          id: "b2_passive_advanced",
          title: "Câu bị động nâng cao",
          description: "Câu bị động với thì hoàn thành và modal",
          content: [
            {
              name: "Present Perfect Passive",
              rule: "S + have/has + been + V3/ed",
              examples: [
                "The work has been completed.",
                "The letter has been sent.",
                "The results have been announced."
              ]
            },
            {
              name: "Modal Passive",
              rule: "S + modal + be + V3/ed",
              examples: [
                "The work can be done tomorrow.",
                "This must be finished immediately.",
                "The room should be cleaned."
              ]
            }
          ]
        },
        {
          id: "b2_conditionals_advanced",
          title: "Câu điều kiện nâng cao",
          description: "Câu điều kiện loại 2, 3 và hỗn hợp",
          content: [
            {
              name: "Conditional Type 2",
              rule: "If + S + V2/ed, S + would + V",
              usage: "Giả định không có thật ở hiện tại",
              example: "If I had more money, I would buy a new car."
            },
            {
              name: "Conditional Type 3",
              rule: "If + S + had + V3/ed, S + would have + V3/ed",
              usage: "Giả định không có thật trong quá khứ",
              example: "If I had studied harder, I would have passed the exam."
            },
            {
              name: "Mixed Conditionals",
              rule: "If + S + had + V3/ed, S + would + V",
              usage: "Kết hợp điều kiện quá khứ và kết quả hiện tại",
              example: "If I had taken that job, I would be rich now."
            }
          ]
        },
        {
          id: "b2_cleft_sentences",
          title: "Câu chẻ (Cleft Sentences)",
          description: "Nhấn mạnh các thành phần trong câu",
          content: [
            {
              name: "It-cleft",
              rule: "It + be + X + that/who + clause",
              examples: [
                "It was John who broke the window.",
                "It is English that I want to learn.",
                "It was yesterday that I met her."
              ]
            },
            {
              name: "Wh-cleft",
              rule: "What + clause + be + X",
              examples: [
                "What I need is a good job.",
                "What she said was true.",
                "What matters is how you do it."
              ]
            }
          ]
        }
      ]
    },
    C1: {
      name: "C1 (Level 5)",
      description: "Trình độ chuyên nghiệp - Cấu trúc ngữ pháp chuyên sâu",
      topics: [
        {
          id: "c1_inversion",
          title: "Câu đảo ngữ (Inversion)",
          description: "Đảo ngữ để nhấn mạnh",
          content: [
            {
              name: "Negative Adverbs",
              rule: "Never/Seldom/Rarely + auxiliary + S + V",
              examples: [
                "Never have I seen such a beautiful sunset.",
                "Seldom do we go to the cinema.",
                "Rarely does he make mistakes."
              ]
            },
            {
              name: "Conditional Inversion",
              rule: "Were/Had/Should + S + V",
              examples: [
                "Were I you, I would accept the offer.",
                "Had I known, I would have helped you.",
                "Should you need help, call me."
              ]
            },
            {
              name: "Prepositional Phrases",
              rule: "Prep phrase + auxiliary + S + V",
              examples: [
                "In the corner stood a old piano.",
                "Under the bridge flows a river."
              ]
            }
          ]
        },
        {
          id: "c1_participle_clauses",
          title: "Mệnh đề phân từ (Participle Clauses)",
          description: "Rút gọn câu bằng phân từ",
          content: [
            {
              name: "Present Participle",
              rule: "V-ing (chủ động, đồng thời)",
              examples: [
                "Walking down the street, I saw an old friend.",
                "Knowing the truth, he decided to leave.",
                "Having finished work, she went home."
              ]
            },
            {
              name: "Past Participle",
              rule: "V3/ed (bị động, đã hoàn thành)",
              examples: [
                "Written in haste, the letter had many mistakes.",
                "Seen from this angle, the building looks different."
              ]
            },
            {
              name: "Perfect Participle",
              rule: "Having + V3/ed (hoàn thành trước)",
              examples: [
                "Having lost his key, he couldn't enter the house.",
                "Having studied all night, she felt exhausted."
              ]
            }
          ]
        },
        {
          id: "c1_nominalization",
          title: "Danh từ hóa (Nominalization)",
          description: "Chuyển động từ/tính từ thành danh từ",
          content: [
            {
              name: "Verb to Noun",
              examples: [
                "decide → decision: His decision was unexpected.",
                "develop → development: The development is rapid.",
                "argue → argument: Her argument was convincing."
              ]
            },
            {
              name: "Adjective to Noun",
              examples: [
                "happy → happiness: Happiness is important.",
                "difficult → difficulty: The difficulty is manageable.",
                "poor → poverty: Poverty is a global issue."
              ]
            }
          ]
        },
        {
          id: "c1_complex_sentences",
          title: "Câu phức tạp (Complex Sentences)",
          description: "Các cấu trúc câu nâng cao",
          content: [
            {
              name: "Concessive Clauses",
              rule: "Although/Though/Even though + clause",
              examples: [
                "Although it was raining, we went out.",
                "Despite the rain, we went out.",
                "In spite of the bad weather, we enjoyed the trip."
              ]
            },
            {
              name: "Purpose Clauses",
              rule: "to/in order to/so as to + V / so that + clause",
              examples: [
                "I study hard to pass the exam.",
                "She left early in order to catch the train.",
                "He spoke loudly so that everyone could hear."
              ]
            },
            {
              name: "Result Clauses",
              rule: "so + adj/adv + that + clause / such + noun + that + clause",
              examples: [
                "The box was so heavy that I couldn't lift it.",
                "It was such a beautiful day that we went for a picnic."
              ]
            }
          ]
        },
        {
          id: "c1_perfect_modals",
          title: "Perfect Modals",
          description: "Modal verbs với hoàn thành",
          content: [
            {
              name: "Must have + V3",
              usage: "Sự chắc chắn về quá khứ",
              examples: [
                "She must have forgotten. (Chắc cô ấy đã quên)",
                "He must have left already. (Chắc anh ấy đã đi rồi)"
              ]
            },
            {
              name: "Should have + V3",
              usage: "Lời khuyên cho quá khứ (nhưng không làm)",
              examples: [
                "You should have studied harder. (Bạn lẽ ra nên học chăm chỉ hơn)",
                "She should have told me the truth. (Cô ấy lẽ ra nên nói thật với tôi)"
              ]
            },
            {
              name: "Could have + V3",
              usage: "Khả năng trong quá khứ (nhưng không xảy ra)",
              examples: [
                "I could have helped you. (Tôi lẽ ra có thể giúp bạn)",
                "They could have won the game. (Họ lẽ ra có thể thắng)"
              ]
            },
            {
              name: "May/Might have + V3",
              usage: "Khả năng xảy ra trong quá khứ",
              examples: [
                "She may have missed the bus. (Có thể cô ấy đã lỡ xe buýt)",
                "He might have been busy. (Có thể anh ấy đã bận)"
              ]
            }
          ]
        },
        {
          id: "c1_collocation",
          title: "Collocations (Sự kết hợp từ)",
          description: "Các cặp từ thường đi cùng nhau",
          content: [
            {
              name: "Verb + Noun",
              examples: [
                "make a decision, take a break, give a presentation",
                "do homework, have a conversation, keep a promise"
              ]
            },
            {
              name: "Adjective + Noun",
              examples: [
                "heavy rain, strong wind, deep sleep",
                "bright future, hard work, soft skills"
              ]
            },
            {
              name: "Adverb + Adjective",
              examples: [
                "completely different, extremely important, really good"
              ]
            }
          ]
        }
      ]
    }
  }
};
