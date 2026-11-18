/* ==========================================================================
   VSTEP LISTENING DATA - Full exam bank from prepedu.com
   3 parts: Part 1 (12 bai x 8 cau), Part 2 (37 conversations), Part 3 (41 talks)
   ========================================================================== */
window.VstepListeningData = {
  parts: [
    // ========================================================================
    // PART 1: Statements and Announcements (12 bai, 8 cau/bai = 96 cau)
    // ========================================================================
    {
      id: "part1",
      title: "Part 1: Statements and Announcements (12 bai)",
      description:
        "Ban se nghe 12 thong bao ngan. Moi thong bao co 4 phuong an tra loi. Chon phuong an dung nhat.",
      exercises: [
        {
          id: "p1e1",
          label: "Bai 1",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-01.mp3",
          transcript:
            "Part 1: Directions: In this part, you will hear EIGHT short announcements or instructions There is one question for each announcement or instruction. For each question, choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen We are ready to start. First you have some time to look at questions 1 to 8. Now listen carefully and answer questions 1 to 8.  Question 1. And now for tomorrow's weather. Partly cloudy in the morning for London and the  south-east but overcast by midday with rain in the afternoon. Temperatures will range from 11-19°C. There'll also be rain in the north which will quickly spread to the rest of the country. Rain will be very heavy in some areas by late afternoon especially in western and central England and there will be strong winds over most of mainland Britain. Question 2. Hello. This is the lost property office. There's no one here to take your call at present but if you've lost something please listen carefully to the following message. If you've lost valuables such as jewelry, cash or credit cards you'll need to contact your nearest police station as soon as possible to make a statement. In the case of a credit card you should also contact your bank immediately. For any other items please call in at our office between 9am and 5pm Monday to Friday. Thank you. Question 3. Erm ... yeah, hello, yes, it's me. Look, I know I'm supposed to be in the meeting now but something's come up. I feel dreadful about it, but. Oh, what a day this has been! First my train was delayed for half an hour then ... er... Anyway, I could still have got there but would you believe it my engine's packed in and I'm stranded here next to the motorway until the breakdown service turns up. I'm so sorry. Question 4. Late last night thieves broke into Mac Hannan Hall where a collection of the late Lady Betty Baldridge's paintings statues and antiques are on display to the public. The thieves, who disabled a sophisticated electronic security system ignored all the less valuable paintings and pieces on display taking only. The Lonely Wanderer by Karl van Turbeck. The 1-metre high bronze figure which stands on a marble base is regarded as the jewel of the Baldridge collection and is valued at over £5 million. Question 5. This isn't terribly difficult but if you're one of those people who won't even change a light bulb just call a breakdown service. Anyway, make sure you're safely off the road with your hazard triangle in place at least 20 meters behind you. Find the jack, spanner and spare they should all be in the boot and check the spare isn't flat, too. Put the jack in place under your car but before you begin to lift the side of the car. Don't forget to loosen the nuts on the wheel. Then jack the car up undo the nuts & take off the wheel. Question 6. Attention, please. We would like to remind you that next Monday at nine 0’clock we will be having our yearly staff picnic. All staff and their families are invited to attend. Plenty of food and drink will be provided for everyone and we will be having our famous barbecue. We will also have our annual fun and games. Prizes include a new DVD player and a holiday. Question 7. Due to problems with the lighting the concert has to be postponed until Friday the 22. The concert will also be moved from hall A to the larger hall C. A bigger venue means a five hundred tickets will now be available twice the original number. Because of the extra tickets tickets will now be priced at the lower cost of twenty dollars. Question 8. It’s 7 o'clock and this is the morning traffic report on WKPR radio. The continuing snowstorm has caused a lot of traffic congestion this morning. Traffic has stopped completely on Pandosy Avenue, so take Gershmar Road if you’re going to the city center. The transportation department reports that they are working on clearing the snow but because of the congestion, progress is slow. The storm is expected to continue until tomorrow afternoon, so we don’t think the conditions will better anytime soon. Stay tuned for our next traffic report at 7:30.",
          questions: [
            {
              id: "p1e1q1",
              question:
                "Which part(s) of England will have the heaviest rainfall?",
              options: [
                "London and south-east",
                "Northern",
                "Western and Central",
                "mainland Britain",
              ],
              correct: 2,
              explanation:
                "Vùng nào ở Anh sẽ có mưa nặng hạt nhất? Rain will be very heavy in some areas by late afternoon, especially in western and central England. (Mưa sẽ nặng hạt ở một số nơi vào chiều muộn, đặc biệt là ở phía Tây và vùng trung tâm nước Anh) =>Đáp án C đúng",
            },
            {
              id: "p1e1q2",
              question: "What should you do in case of losing money?",
              options: [
                "call the lost property office",
                "to contact the police to make a statement",
                "to contact your bank immediately",
                "go to the lost property office",
              ],
              correct: 1,
              explanation:
                "Bạn nên làm gì trong trường hợp mất tiền? If you\'ve lost valuables such as jewelry, cash or credit cards, you\'ll need to contact your nearest police station as soon as possible to make a statement. (Nếu bạn mất những đồ giá trị như trang sức, tiền mặt hoặc thẻ tín dụng, bạn sẽ cần liên hệ với đồn cảnh sát gần nhất sớm nhất có thể để báo cáo sự việc.) => Đáp án B đúng",
            },
            {
              id: "p1e1q3",
              question: "Why can’t she be at the meeting?",
              options: [
                "Her flight was delayed.",
                "She is feeling unwell.",
                "Her car has broken down.",
                "Her train was delayed.",
              ],
              correct: 2,
              explanation:
                "Tại sao cô ấy không thể có mặt ở cuộc họp? My engine\'s packed in, and I\'m stranded here next to the motorway until the breakdown service turns up. (Động cơ của xe tôi bị hỏng, và tôi đang bị mắc kẹt ở đây cạnh đường cao tốc để chờ xe cứu hộ đến.) => Đáp án C (Ô tô của cô ấy bị hỏng) là đáp án đúng",
            },
            {
              id: "p1e1q4",
              question: "What was stolen in the burglary?",
              options: ["a painting", "a statue", "a famous jewel", "antiques"],
              correct: 2,
              explanation:
                "Cái gì bị mất trong vụ trộm? taking only The Lonely Wanderer by Karl van Turbeck. The 1-metre high bronze figure, which stands on a marble base, is regarded as the jewel of the Baldridge collection and is valued at over £5 million ... (chỉ lấy đi The Lonely Wanderer của Karl van Turbeck. Vật này bằng đồng cao 1 mét, đứng trên nền đá cẩm thạch, được coi là viên ngọc của bộ sưu tập Baldridge và trị giá hơn 2 triệu bảng…) => Đáp án C",
            },
            {
              id: "p1e1q5",
              question: "What are the instructions about?",
              options: [
                "how to change a light bulb",
                "how to change your car’s hazard lights",
                "what to do if your car breaks down",
                "how to change a flat tire",
              ],
              correct: 3,
              explanation:
                "Những hướng dẫn này nói về cái gì? Find the jack, spanner and spare - they should all be in the boot - and check the spare isn\'t flat, too. Put the jack in place under your car, but before you begin to lift the side of the car, don\'t forget to loosen the nuts on the wheel. Then jack the car up, undo the nuts & take off the wheel... (Tìm giá đỡ, cờ lê và bánh xe thay thế - nên đặt tất cả ở chỗ tấm kẹp bánh xe-và cũng kiểm tra xem bánh xe dự phòng có bị xẹp không. Đặt giá đỡ vào vị trí dưới xe của bạn, nhưng trước khi bạn bắt đầu nhấc bên hông xe, đừng quên nới lỏng các đai ốc trên bánh xe. Sau đó, nâng xe lên, tháo các đai ốc và lấy bánh xe ra...) =>Đáp án D (cách thay một cái lốp bị xẹp hơi) là đáp án đúng",
            },
            {
              id: "p1e1q6",
              question: "Which prizes are mentioned?",
              options: [
                "A holiday and a CD player",
                "A DVD player and a CD player",
                "A DVD player and a holiday",
                "A holiday and a television",
              ],
              correct: 2,
              explanation:
                "Giải thưởng nào được đề cập đến? Prizes include a new DVD player and a holiday. (Giải thưởng bao gồm 1 đầu DVD và một kì nghỉ hè) => Đáp án C đúng",
            },
            {
              id: "p1e1q7",
              question: "How much would five tickets cost?",
              options: ["$100", "$50", "$20", "$"],
              correct: 0,
              explanation:
                "5 chiếc vé có giá bao nhiêu? 70Tickets will now be priced at the lower cost of twenty dollars. (Vé có giá dưới 20 đô la nên 5 vé = $100) => Đáp án A đúng",
            },
            {
              id: "p1e1q8",
              question: "If there is a fire, what should you do?",
              options: [
                "Run out of the building",
                "Stay seated",
                "Walk out of the building",
                "Jog out of the building",
              ],
              correct: 2,
              explanation:
                "Nếu có hỏa hoạn bạn nên làm gì? Stand up and walk towards the nearest exit. (Đứng dậy và đi đến lối thoát hiểm gần nhất) => Đáp án C đúng",
            },
          ],
        },
        {
          id: "p1e2",
          label: "Bai 2",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-02.mp3",
          transcript:
            "Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. We are ready to start First you have some time to look at questions 1 to 8. Now listen carefully and answer questions 1 to 8 Question 1. Attention all passengers on flight KI 162 from Spain to Ireland. This flight has been delayed due to bad weather. The flight will now be leaving at 7:15p.m from gate 22A. We apologize for any inconvenience. Question 2. Attention, shoppers. For the next fifteen minutes we will have a sale on sweaters in the children’s department. Every sweater will be 50% off. Yes, that’s right. For just a quarter of an hour you can buy any child’s sweater at just half the original price. Now there is a bargain you can’t afford to miss. Hurry now. The clock is ticking. Question 3. The next stop is Main Street. The exit doors are on the left side. You can transfer to the white line, line number 4 to Seoul soccer stadium. Please be careful as you leave the train. Question 4. A small dog was lost in the City center two days ago. It is brown with white paws and answers to the name Sam. It was wearing a brown collar. A reward of fifty dollars will be given for help in finding him. Please contact Brian at 655-7951. Question 5. Monday will be warm in most areas with some rain in the north of the country. Temperatures will reach up to 25 degrees in the South and around 20 degrees in the north. Tuesday will also have similar conditions with slightly higher temperatures of about 23 degrees in the north. 7 Question 6. Attention all students. Due to a burst in the gas pipes as well as the extremely cold weather today’s classes will be canceled. The school buses will be arriving in twenty minutes to take everyone home. Tomorrow’s classes will most likely be canceled also but the local radio station will make an announcement in the morning. Question 7. Ladies and Gentlemen, we are experiencing some bad weather so all passengers must return to their seats and fasten their seatbelts. I would like to remind you that this is a non-smoking flight so smoking will not be permitted. We should pass through the bad weather within thirty minutes at which time lunch will be served. Question 8. Could the owner of a green and red Daesung Santa Lucia registration number ST 4571 please come to the parking lot immediately. Your car is blocking the entrance. A delivery truck is unable to enter and this is causing a traffic jam in the street outside the store. This is the end of part 1. Now turn to part 2",
          questions: [
            {
              id: "p1e2q1",
              question: "What time will the flight now be leaving at?",
              options: ["At 6:00", "At 7:00", "At 7:15", "At 7:50"],
              correct: 2,
              explanation:
                "Chuyến bay sẽ khởi hành vào lúc nào? The flight will now.be leaving at 7:15 p.m. (Chuyến bay sẽ khởi hành vào lúc 7 giờ 15 phút tối) => Đáp án C đúng",
            },
            {
              id: "p1e2q2",
              question: "How much will a $50 sweater cost now?",
              options: ["$50", "$5", "$15", "$25"],
              correct: 2,
              explanation:
                "Một chiếc áo len có giá 50 đô la bây giờ sẽ còn bao nhiêu? Every sweater will be 50% off. (Tất cả các áo len sẽ được giảm giá 50% => một chiếc áo len có giá 50 đô la sau khi giảm giá sẽ còn 25 đô la) => Đáp án D đúng",
            },
            {
              id: "p1e2q3",
              question: "What number is the white line?",
              options: ["6", "4", "7", "3"],
              correct: 1,
              explanation:
                "Tuyến trắng số mấy? You can transfer to the white line, line number 4, to Seoul soccer stadium. (Bạn có thể chuển sang tuyến trắng, tuyến số 4 để đến sân vận động Seoul.) => Đáp án B đúng",
            },
            {
              id: "p1e2q4",
              question: "What color is the dog?",
              options: [
                "White with brown paws",
                "Brown with white paws",
                "Brown with black paws",
                "Black with brown paws",
              ],
              correct: 1,
              explanation:
                "Con chó màu gì? It is brown with white paws…(Nó màu nâu với bàn chân màu trắng…) => Đáp án B đúng",
            },
            {
              id: "p1e2q5",
              question:
                "What difference will be seen between Monday and Tuesday?",
              options: [
                "Monday will be far hotter.",
                "Tuesday will have more rain.",
                "There will be some higher temperatures on Tuesday.",
                "There will be some extra rain showers on Mon day.",
              ],
              correct: 2,
              explanation:
                "Sẽ có sự khác biệt giữa thứ Hai và thứ Ba? Tuesday will also have similar conditions, with slightly higher temperatures of about 23 degrees in the north. (Thứ ba cũng sẽ có điều kiện thời tiết tương tự, với nhiệt độ cao hơn một chút khoảng 23 độ ở phía bắc.) => Đáp án C (Nhiệt độ sẽ cao hơn một chút vào thứ Ba) là đáp án đúng",
            },
            {
              id: "p1e2q6",
              question: "Why are the students being sent home?",
              options: [
                "It is a school holiday.",
                "There is a problem with the heating system.",
                "Some of the teachers are absent.",
                "The water pipes burst",
              ],
              correct: 1,
              explanation:
                "Tại sao học sinh được đưa về nhà? Due to a burst in the gas pipes, as as well as the extremely cold weather, today’s classes will be canceled (Bởi vì ống dẫn khí bị vỡ cũng như thời tiết rất lạnh, các lớp học ngày hôm nay sẽ bị hủy) => Đáp án B hệ thống sưởi gặp vấn đề là đáp án đúng",
            },
            {
              id: "p1e2q7",
              question: "What will happen in thirty minutes?",
              options: [
                "They will land.",
                "Dinner will be served.",
                "They will enter into some bad weather.",
                "Lunch will be served.",
              ],
              correct: 3,
              explanation:
                "Điều gì sẽ xảy ra sau 30 phút nữa? We should pass through the bad weather within thirty minutes, at which time lunch will be served. (Chúng ta vượt qua thời tiết xấu trong 30 phút, vào lúc đó bữa trưa sẽ được phục vụ.) => Đáp án D đúng Câu 8. Vấn đề là gì? Your car is blocking the entrance. (Ô tô của bạn đang chặn lối vào.) => Đáp án D đúng",
            },
            {
              id: "p1e2q8",
              question: "What is the problem?",
              options: [
                "A car has a flat tire.",
                "A car has been stolen.",
                "A car has broken down.",
                "A car is blocking the entrance.",
              ],
              correct: 3,
              explanation: "",
            },
          ],
        },
        {
          id: "p1e3",
          label: "Bai 3",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-03.mp3",
          transcript:
            "Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. We are ready to start First you have some time to look at questions 1 to 8. Now listen carefully and answer questions 1 to 8 Question 1. OK everybody. This next exercise is a bit difficult but it’s really good for your legs. All you do is put your back against the wall place your feet about half a metre away from the wall move your back down the wall so your knees are bent at 90 degrees. Now put your hands out straight in front of you right make sure your head is against the wall. Now, see how long you can stay like that. If you do two minutes, you’re doing well. Question 2. Because of the ski jumping finals we’re late finishing so there are some changes to this evening’s programmes. We won’t now show the Nature Programme about the dolphins found near the Florida coast at nine o’clock. 73Instead, Tim Wong’s Chinese Kitchen will be at this time an hour later than advertised. You can see the Nature Programme at its usual time next week. Question 3. All fans of Peter Robbins should go to the South Street book store tomorrow afternoon where Peter will sign copies of his book Love of Life and answer questions. He is expected at a quarter past two and promises to stay until half past three when he has to leave for another appointment. Get there as soon as you can because if it’s anything like Peter’s last visit queues will start to form at quarter to two or even earlier. Don’t miss this opportunity to meet everyone’s favourite writer. Question 4. Here is the weather forecast. Today will be very cloudy although it won\'t rain until the evening. The weather tomorrow will be the same as yesterday sunshine and showers. But the weekend looks good plenty of sunshine and very little rain. Question 5. Now you won’t need any money for the bus or your entrance ticket to the zoo tomorrow because that’s already paid for. But bring some small change for when you get thirsty and want a drink. The only food or drink allowed on the bus is fruit. Bring some with you because it’s a long trip and you’ll get hungry. No food or drink must be taken into the zoo. And you’ll need to bring all your coloured pencils for the work I’m going to ask you to do there. Question 6. And now for tomorrow’s weather. The day will start showery and windy. Those winds should disappear by late morning but the wet weather will continue until well into the evening. Although we might see some bright sunny periods between the showers early on by midday, it will be cloudy with temperatures of no more than ten or twelve degrees centigrade. Question 7. It was really strange going back to Redmond where I used to live. Everything has changed so much. I went to see my old house. It used to have trees in the garden and a hedge in the front. Well, the people who own it now have built another bedroom over the top of the garage and removed the trees and hedge so they have more room to park their cars. It made me feel really sad because it looked so different. Question 8. Coming up next on The Science Channel is the latest documentary produced and presented by photographer Daniel Hamilton, who made the prize winning series about African animals which you may have seen last year. His latest series is simply called Earth and viewers can enjoy some amazing 7475 photography with pictures of the planet shot from cameras in space using the latest satellite technology. So sit back, relax and enjoy! This is the end of Part 1. Now turn to Part 2.",
          questions: [
            {
              id: "p1e3q1",
              question:
                "Which part(s) of the body does the exercise affect well?",
              options: ["knees", "back", "hands", "legs"],
              correct: 3,
              explanation:
                "Bộ phận nào của cơ thể mà những bài tập thể dục đem lại hiệu quả tốt? This next exercise is a bit difficult, but it’s really good for your legs. (Bài tập thể dục tiếp theo có hơi khó một chút, nhưng nó thật sự tốt cho chân của bạn) => Đáp án D đúng",
            },
            {
              id: "p1e3q2",
              question: "Which TV programme is on at 9 o’clock tonight?",
              options: [
                "Ski jumping finals",
                "Nature Programme",
                "Tim Wong’s Chinese Kitchen",
                "a programme about dolphins",
              ],
              correct: 2,
              explanation:
                "Chương trình ti vi nào phát sóng vào lúc 9 giờ tối nay? We won’t now show the Nature Programme, about the dolphins found near the Florida coast, at nine o’clock. Instead, Tim Wong’s Chinese Kitchen will be at this time... (Bây giờ chúng tôi sẽ không phát sóng chương trình Thiên nhiên về những chú cá heo gần bờ biển Florida vào lúc 9 giờ. Thay vào đó, Nhà bếp Trung Quốc của Tim Wong sẽ chiếu vào thời điểm này.) => Đáp án C đúng",
            },
            {
              id: "p1e3q3",
              question: "What time will the writer arrive at the bookshop?",
              options: ["At 1.45", "At 2.15", "At 3.30", "At 2.30"],
              correct: 1,
              explanation:
                "Nhà văn sẽ đến cửa hàng sách vào mấy giờ? He is expected at a quarter past two. (Ông ấy dự kiến sẽ đến vào 2 giờ 15 phút.) => Đáp án B đúng",
            },
            {
              id: "p1e3q4",
              question: "What will the weather be like tomorrow?",
              options: ["rainy", "cloudy", "sunny", "both sunny and rainy"],
              correct: 3,
              explanation:
                "Thời tiết sẽ như thế nào vào ngày mai? The weather tomorrow will be the same as yesterday - sunshine and showers. (Thời tiết ngày mai sẽ giống ngày hôm qua-có nắng và mưa rào.) => Đáp án D đúng",
            },
            {
              id: "p1e3q5",
              question: "What should the students take on the school trip?",
              options: [
                "Drink, fruit and some change",
                "Drink, fruit and coloured pencils",
                "Fruit, some change and coloured pencils",
                "fruit and coloured pencils",
              ],
              correct: 2,
              explanation:
                "Học sinh nên mang theo gì trong chuyến dã ngoại của trường? But bring some small change for when you get thirsty and want a drink. The only food or drink allowed on the bus is fruit. Bring some with you because it’s a long trip, and-you’ll get hungry. No food or drink must be taken into the zoo. And you’ll need to bring all your coloured pencils for the work I’m going to ask you to do there. (Nhưng hãy mang theo một ít tiền lẻ khi các em thấy khát và muốn mua đồ uống. Đồ ăn hoặc đồ uống được cho phép mang lên xe buýt đó là trái cây. Các em hãy mang theo bởi vì đây là một chuyến đi dài và các em có thể cảm thấy đói. Không đồ ăn hay đồ uống nào được mang vào sở thú. Và các em sẽ cần mang theo tất cả bút chì màu của mình để làm việc mà cô sẽ yêu cầu khi ở đó.) => Đáp án C (Trái cây, một ít tiền lẻ và bút chì màu) là đáp án đúng. Câu 6. Thời tiết sẽ như thế nào vào chiều mai? …but the wet weather will continue until well into the evening. (…nhưng thời tiết ẩm ướt sẽ tiếp tục cho đến tối.) => Đáp án A đúng",
            },
            {
              id: "p1e3q6",
              question: "What will the weather be like tomorrow afternoon?",
              options: ["rainy", "windy", "sunny", "cloudy"],
              correct: 0,
              explanation: "",
            },
            {
              id: "p1e3q7",
              question: "What does the woman’s house look like now?",
              options: [
                "It has another bedroom over the garage",
                "It has trees in the garden",
                "It has a hedge in the front",
                "It has trees in the garden and a hedge in the front.",
              ],
              correct: 0,
              explanation:
                "Ngôi nhà của người phụ nữ hiện giờ trông như thế nào? Well, the people who own it now have built another bedroom over the top of the garage. (Người chủ của ngôi nhà hiện giờ đã xây một phòng ngủ khác ở phía trên gara để xe.) => Đáp án A (Nó có một phòng ngủ khác ở phía trên gara để xe) là đáp án đúng",
            },
            {
              id: "p1e3q8",
              question: "What is the next TV program about?",
              options: [
                "the satellite",
                "the Earth",
                "African animals",
                "photography",
              ],
              correct: 1,
              explanation:
                "Chương trình ti vi tiếp theo về cái gì? His latest series is simply called Earth (Seri mới nhất của anh ấy đơn giản gọi là Trái Đất) => Đáp án B đúng",
            },
          ],
        },
        {
          id: "p1e4",
          label: "Bai 4",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-04.mp3",
          transcript:
            "Question 1. Hi everyone, and welcome to City Wildlife Park. I’ll explain where things are and then you’re free to go wherever you want. In front of us are some empty cages where the rabbits live. They’re free to run about in the long grass, but come back to their cages when they’re hungry! If you’re interested in ducks, surprisingly they’re not right here in the pond, but over there in one of their favourite places, near the dustbins. And we keep goats in the field here, together with some sheep. Question 2. And now for the weather forecast for this Saturday and Sunday. People heading to the music festival starting on Saturday on the South coast should be prepared for different conditions over the next two days. Saturday will 76bring bright sunshine but cool temperatures for this time of year. Overnight, however, clouds are expected to move in and Sunday will see dull skies bringing a further drop in temperatures, and there will be a good chance of rain later on. Question 3. Hello. My name\'s John Masters. This is a message for the person I spoke to yesterday in Customer Services. You asked me to return the iron I bought from you in its box. I’ve done this, although as I mentioned to you the box was badly damaged when it arrived. Anyway, that’s not the problem and the iron didn’t look damaged at all. But when I switched it on, it didn’t heat up. My order reference is 01376XB. I hope you’ll replace the iron as soon as possible. Thank you. Question 4. In the heart of the City the Arts Centre includes a concert hall, cinema and an art gallery. The cinema is presenting a programme of films by younger film-makers and is attracting larger audiences than ever. The open-air concert area is the new home to the City Orchestra with an exciting concert programme of new composers and guest performers, while the City Art Gallery has a major programme of exhibitions all summer. Guests can enjoy dinner in the popular restaurant and enjoy the wonderful views of the City and river. Question 5. On today’s student Cookery programme, I’m going to show you how to make some really cheap and healthy meals. Forget about opening tins and think fresh! You can do wonderful things with tomatoes, potatoes - and I don’t mean chips or fries! even cabbage, yes cabbage rolls, tilled with tasty rice and herbs. And the essential vegetable in all my recipes is the ordinary onion, red or white or brown colour doesn’t matter. First of all, you need a Sharp knife. So, watch carefully and off we go. Question 6. You’d think that paying a bill would be easy. On tonight’s Money Today, I’m looking at some of the difficulties there can be. The story starts with my own experience. Thinking it’d be simpler, I made the mistake of trying to pay a hotel bill in cash. Well, amazingly they insisted on me using a credit card. I didn’t have one with me, so had to get onto onto my internet banking site using my mobile phone to try and get my card details. Nothing’s easy. Question 7. Hello, this is Sarah Wright. I arranged to collect a guitar I ordered. I was meant to come this afternoon, but there’s a problem. I had to get a book from the library and I’ve just missed the bus so I won’t be able to get out to the shop before you close. I’ve got an appointment in the town centre to choose some new glasses tomorrow so I could come in and pick it up then. I hope that’s ok.  Question 8. ... and now for the weather. What’s it going to be like for the big race tomorrow morning, Mike? -Well, it’s been clear and sunny all week, but it looks as if it’s going to turn really cold tonight, and with ice on the track, conditions for racing could be difficult. It doesn’t look like there’ll be any rain until the weekend though, and later in the afternoon there’ll be a bit of sun coming out from behind the clouds.",
          questions: [
            {
              id: "p1e4q1",
              question: "Where can visitors see the ducks?",
              options: [
                "in the cages",
                "in the pond",
                "near the wastebaskets",
                "in the field",
              ],
              correct: 2,
              explanation:
                "Khách tham quan có thể nhìn thấy vịt ở đâu? If you’re interested in ducks, surprisingly they’re not right here in the pond, but over there in one of their favourite places, near the dustbins. (Nếu bạn có hứng thú với vịt, đáng ngạc nhiên là chúng không có ở đây trong ao, nhưng chỗ kia là một trong những nơi yêu thích của chúng ở gần thùng rác.) =>Đáp án C đúng",
            },
            {
              id: "p1e4q2",
              question:
                "What will the weather be like when the festival starts?",
              options: ["sunny", "cloudy", "rainy", "rainy and cloudy"],
              correct: 0,
              explanation:
                "Thời tiết sẽ như thế nào khi lễ hội bắt đầu? People heading to the music festival starting on Saturday on the South coast should be prepared for different conditions over the next two days. Saturday will bring bright sunshine but cool temperatures for this time of year. (Những người tham gia lễ hội âm nhạc bắt đầu vào thứ bảy trên bờ biển phía Nam nên chuẩn bị cho các điều kiện thời tiết khác nhau trong hai ngày tới. Thứ bảy sẽ có nắng nhưng nhiệt độ sẽ mát mẻ sẽ vào thời gian này trong năm.) => Đáp án A đúng",
            },
            {
              id: "p1e4q3",
              question: "What has the man sent back to the company?",
              options: [
                "an iron in a damaged box",
                "a damaged iron in a good-condition box",
                "a damaged iron in a damaged box",
                "an iron in a good-condition box",
              ],
              correct: 0,
              explanation:
                "Người đàn ông gửi lại cái gì cho công ty? although as I mentioned to you the box was badly damaged when it arrived. Anyway, that’s not the problem and the iron didn’t look damaged at all. (Mặc dù như tôi đã đề cập với ông, cái hộp bị hỏng nặng khi nó được chuyển tới. Dù sao thì đó không phải là vẫn đề và chiếc bàn là trông có vẻ không bị hư hỏng gì.) => Đáp án A (một cái bàn là trong một cái hộp bị hỏng) là đáp án đúng",
            },
            {
              id: "p1e4q4",
              question: "Which part of the Arts Centre only opened recently?",
              options: [
                "an open-air concert area",
                "a cinema",
                "an art gallery",
                "a restaurant",
              ],
              correct: 0,
              explanation:
                "Khu nào của Trung tâm Nghệ thuật chỉ mới mở gần đây? The open-air concert area is the new home to the City Orchestra. (Khu vực hòa nhạc ngoài trời là ngôi nhà mới của Dàn nhạc Thành phố.) =>Đáp án A đúng",
            },
            {
              id: "p1e4q5",
              question: "Which vegetable is used in all today\'s recipes?",
              options: ["tomatoes", "potatoes", "cabbage", "onion"],
              correct: 3,
              explanation:
                "Loại rau củ nào được sử dụng trong tất cả thực đơn ngày này? And the essential vegetable in all my recipes is the ordinary onion. (Và loại rau củ cần thiết trong tất cả các công thức nấu ăn của tôi là loại hành thông thường.) => Đáp án D đúng",
            },
            {
              id: "p1e4q6",
              question: "How did the man want to pay?",
              options: [
                "in cash",
                "by credit card",
                "by cheque",
                "bank transfer",
              ],
              correct: 0,
              explanation:
                "Người đàn ông muốn trả tiền bằng cách nào? I made the mistake of trying to pay a hotel bill in cash. (Tôi đã mắc lỗi khi cố thanh toán hóa đơn khách sạn bằng tiền mặt.) => Đáp án A đúng",
            },
            {
              id: "p1e4q7",
              question: "What is the woman phoning about?",
              options: ["a guitar", "a book", "glasses", "the library"],
              correct: 0,
              explanation:
                "Người phụ nữ gọi điện để nói về cái gì? I arranged to collect a guitar I ordered. (Tôi đã sắp xếp để chọn một cây đàn guitar mà tôi đã yêu cầu.) => Đáp án A đúng",
            },
            {
              id: "p1e4q8",
              question: "What will the weather be like for the race?",
              options: ["sunny", "snowy", "rainy", "cloudy"],
              correct: 1,
              explanation:
                "Thời tiết sẽ như thế nào khi cuộc đua diễn ra? but it looks as if it’s going to turn really cold tonight, and with ice on the track, conditions for racing could be difficult. (nhưng có vẻ như trời sẽ trở nên rất lạnh vào tối nay, và với tuyết đóng băng trên đường đua, điều kiện để đua xe có thể khó khăn.) => Đáp án B (có tuyết) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e5",
          label: "Bai 5",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-05.mp3",
          transcript:
            "Question 1. Hi there It’s Paul. I’ve been to the gallery to get some ideas for my latest project and I got some good ones you know, for shapes and so on now I need to think about using colours, and patterns. I might go back another day and look at paintings. There are some on the first floor of indoor scenes with vases and bowls in them like the ones I looked at on display today. Oh, and there’s a new sculpture exhibition on, but I didn’t get a chance to see it. Question 2. There\'s a new service available at Jeff Dean’s Gym from today. Consultant Jenny Law will offer gym members complete dietary analysis and fitness assessment. If you book before 5th November you will get a 33% discount and pay only 20 instead of the usual 30 pounds. Make sure you’re fit enough for the next century Consult the experts at Jeff Dean’s Gym. Join today! 79Question 3. You have reached the Gas Hotline. If you have a complaint concerning our service you may speak to our customer care line by dialling 3 after the tone. If you would like to arrange for regular servicing to any of your gas appliances you may speak to our service engineers by dialling 4 after the tone. Our emergency service can be contacted by dialling 5 after the tone. Question 4. Just one last word, ladies and gentlemen. You probably know how dangerous rabies can be. Just one bite from an affected animal can kill if medical help is not available immediately. We\'ve been free from rabies in Britain for over 75 years but it is still quite common here. So don\'t be tempted to take animals home with you. They may be infected, and you can be sent to prison for illegally importing animals. Okay, now I need to tell you.... Question 5. And now for the week\'s weather The week will start out very wet. Indeed, with thunder and lightning in some areas. This will last through to Wednesday. Thursday will be dry but dull, but the clouds will clear during the night, bringing us a bright end to the week - something to make up for all that bad weather... Question 6. ...and yes, I would agree that computers have made a dramatic difference in the workplace. However, computers in the home have their disadvantages especially for children. In a school setting they\'re fine, I think, but letting them spend too much time with computer games certainly doesn\'t help children learn to communicate. As to whether children have to think while they\'re playing on the computer. I’d say they do. Question 7. And finally, on a lighter note. When college lecturer, Chris Pearse, told Jamie his pet bloodhound to fetch his allppers, he expected the dog to go upstairs for the new pair he had got for Christmas. In fact, the dog disappeared for two hours. The legendary nose of the bloodhound had led it four miles across town to the Council tip where Jamie retrieved his master\'s old allppers, which had been thrown away and brought them home. Mr Pearse said, \"I didn\'t expect it, but I can\'t complain when he\'s only done exactly what I asked... Question 8. \" We are sorry to announce that both the 9.15 from Crewe and the 10:30 to London Euston have been cancelled due to staff shortages. Passengers for Birmingham International and Oxford should cross the bridge to platform four where a relief train will shortly arrive. Passengers for Reeding can also take this train but must change at Oxford. Passengers for London and Heathrow airport  should go immediately to the booking hall on platform one where a coach has been arranged.",
          questions: [
            {
              id: "p1e5q1",
              question: "Which part of the gallery did the man visit?",
              options: [
                "paintings",
                "vases and bowls",
                "a sculpture exhibition",
                "photographs",
              ],
              correct: 1,
              explanation:
                "Người đàn ông đã đi xem gì trong phòng trưng bày? There are some on the first floor of indoor scenes with vases and bowls in them like the ones I looked at on display today. (Có một số lọ hoa và bát ở tầng 1 ở những cảnh trong nhà giống như những thứ được trưng bày mà tôi đã thấy ngày hôm nay.) => Đáp án B đúng",
            },
            {
              id: "p1e5q2",
              question:
                "How much will a dietary and fitness assessment cost you?",
              options: ["£20", "£30", "£33", "£5"],
              correct: 0,
              explanation:
                "Việc phân tích chế độ ăn và đánh giá thể lực tốn của bạn bao nhiều tiền? Consultant Jenny Law will offer gym members complete dietary analysis and fitness assessment. If you book before 5th November you will get a 33% discount and pay only 20 instead of the usual 30 pounds. (Tư vấn viên Jenny Law sẽ giúp các thành viên phòng tập thể dục phân tích chế độ ăn uống và đánh giá thể lực. Nếu bạn đặt trước ngày 5 tháng 11, bạn sẽ được giảm giá 33% và chỉ phải trả 20 bảng thay vì 30 bảng như thông thường.) => Đáp án A đúng",
            },
            {
              id: "p1e5q3",
              question: "Who do you contact when dialing number 4?",
              options: [
                "customer care department",
                "service engineering department",
                "emergency service department",
                "HR department",
              ],
              correct: 1,
              explanation:
                "Bạn sẽ liên hệ với ai khi quay số 4? If you would like to arrange for regular servicing to any of your gas appliances you may speak to our service engineers by dialling 4 after the tone. (Nếu bạn muốn sắp xếp dịch vụ thường xuyên cho bất kỳ thiết bị dùng khí nào của bạn, bạn có thể nói chuyện với các kỹ sư dịch vụ của chúng tôi bằng cách quay số 4 sau tín hiệu.) => Đáp án B (Phòng kĩ sư dịch vụ) là đáp án đúng",
            },
            {
              id: "p1e5q4",
              question: "Who is the message intended for?",
              options: [
                "people in Britain",
                "people leaving Britain",
                "people returning to Britain",
                "people visiting Britain",
              ],
              correct: 2,
              explanation:
                "Thông điệp hướng đến ai? We\'ve been free from rabies in Britain for over 75 years but it is still quite common here. So don\'t be tempted to take animals home with you. (Chúng ta đã không phải đối mặt với bệnh dại ở Anh trong hơn 75 năm nhưng nó vẫn còn khá phổ biến ở đây. Vì vậy, đừng cố mang động vật về nhà với bạn.) => Đáp án C (Những người đang trở về Anh) là đáp án đúng",
            },
            {
              id: "p1e5q5",
              question: "What will the weather be like on Friday?",
              options: ["cloudy and dull", "sunny", "very wet", "cloudy"],
              correct: 1,
              explanation:
                "Thời tiết sẽ như thế nào vào thứ Sáu? Thursday will be dry but dull, but the clouds will clear during the night, bringing us a bright end to the week. (Thứ Năm sẽ khô ráo nhưng u ám, nhưng sẽ không có mây vào ban đêm, mang lại cho chúng ta một cuối tuần đầy nắng.) => Đáp án B đúng",
            },
            {
              id: "p1e5q6",
              question: "Why should children not use computers?",
              options: [
                "They don’t encourage children to think.",
                "They keep children from doing their schoolwork.",
                "They stop children developing social skills.",
                "They are harmful to chidren’s eyes",
              ],
              correct: 2,
              explanation:
                "Tại sao trẻ em không nên sử dụng máy tính? In a school setting, they’re fine, I think, but letting them spend too much time with computer games certainly doesn\'t help children learn to communicate. (Trong môi trường học tập, chúng rất là tốt, nhưng để trẻ em dành quá nhiều thời gian với trò chơi điện tử chắc chắn không giúp chúng học cách giao tiếp.) => Đáp án C (Chúng ngăn trẻ em phát triển các kĩ năng xã hội) là đáp án đúng",
            },
            {
              id: "p1e5q7",
              question: "What did the dog do?",
              options: [
                "annoyed its master",
                "disobeyed its master",
                "obeyed its master",
                "fetched a thing its master didn’t ask",
              ],
              correct: 2,
              explanation:
                'Con chó đã làm gì? "I didn\'t expect it, but I can\'t complain when he\'s only done exactly what I asked...". ("Tôi không mong đợi điều này, nhưng tôi không thể phàn nàn khi nó chỉ làm chính xác những gì tôi đã yêu cầu ...".) => Đáp án C (vâng lời chủ của nó) là đáp án đúng',
            },
            {
              id: "p1e5q8",
              question: "What should passengers for London do? 14",
              options: [
                "take the train on platform four",
                "take the coach from the booking hall",
                "take the train on platform one",
                "change the train at Oxford",
              ],
              correct: 1,
              explanation:
                "Hành khách đến Luân Đôn nên làm gì? Passengers for London and Heathrow airport should go immediately to the booking hall on platform one where a coach has been arranged. (Hành khách đến London và sân bay Heathrow nên đến ngay phòng bán vé trên sân ga, nơi tàu hỏa chở khách đã được sắp xếp.) => Đáp án B (bắt xe khách từ phòng bán vé) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e6",
          label: "Bai 6",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-06.mp3",
          transcript:
            "Question 1. There\'s a lorry on fire in Smith street in Bridgend town centre. A lot of people have stopped to watch and delays are building up. You\'re advised to take Lodge lane instead. On the westbound carriageway of the M4, an overturned car is blocking two lanes of traffic before junction 32, that\'s the turning for Bridgend. Police advise drivers to turn off at junction 31 for an alternative route to avoid delays... Question 2. Hi David. It\'s Susan here. It\'s about meeting later on. I know we said eight o\'clock at the Crown, but it looks like I\'m stuck in the office for a while 82we\'ve got a bit of a problem so if I don\'t ring again do you think you could come and get me at about nine? Question 3. This is a customer announcement. We have a range of special offers in several departments. In our fashion department on the first floor we have a sale in men’s\' designer shirts. On the second floor in household goods, there are special offers in kitchenware and small appliances. And in our food hall on the ground floor some outstanding discounts on cuts of beef... Question 4. Residents of Newbury upon Thames whose homes were bought by the government to make way for a planned by pass are to be offered their houses back again. Eleven families were moved out in 1, but now the scheme has been put on hold following government spending cuts. Under a new law the former residents are allowed to buy back their former houses at the price they were given on leaving. Question 8. Hello, this is the claims manager from Royal Solihull Insurance. I\'m ringing concerning your claim. I was hoping to arrange for one of our representatives to call and discuss your recent burglary with you. Um… We can\'t arrange a payment until we\'ve had this discussion. Would you like to call one of our secretaries on 04285976 and we can fix up a time? Please don\'t forget to quote the burglary reference number.... Question 6. Police are asking old age pensioners to be on the look out for a thief who is posing as a gas board official. The thief, who is a well-dressed young man, calls at pensioners\' homes and tells them he is checking for gas leaks. While in the house, he steals any money he can find. Police have issued a special message for pensioners today advising them that gas board officials always wear a uniform and carry an official identity card. Question 7. Thank you for calling the Putney museum. I\'m afraid all our telephonists are busy at the moment. If you want to wait you should press 3 after the short tone and your call be stacked. If you have an enquiry about opening times, you can hear a recorded message by pressing 2 after the short tone. If you want to speak to a member of staff and you know their extension, you can dial their number after the short tone. If you want to leave a message, please speak after the long tone. Question 8. If you want to buy a house in the London area and you\'re on a limited budget, where\'s the best place to look? Of course a central location is what many of us want, but houses in the centre are no bargain. if you want to move out to the 8384 leafy suburbs you\'ll also have to have a lot of money in the bank. To my mind, the best place to start is in the established or shall we say former suburbs. that\'s where you\'ll find the real bargains.",
          questions: [
            {
              id: "p1e6q1",
              question: "What should drivers to Bridgend do?",
              options: [
                "drive down Lodge Lane",
                "turn off at junction 32",
                "drive down Smith Street",
                "cancel the drive",
              ],
              correct: 0,
              explanation:
                "Những lái xe đến Bridgen nên làm gì? There\'s a lorry on fire in Smith street in Bridgend town centre. A lot of people have stopped to watch and delays are building up. You\'re advised to take Lodge lane instead. (Có một xe tải bị cháy trên đường Smith ở trung tâm thị trấn Bridgend. Rất nhiều người dừng lại để xem và tắc nghẽn đang xảy ra. Thay vì đó, bạn nên chọn đường Lodge.) => Đáp án A (đi đường Lodge) là đáp án đúng",
            },
            {
              id: "p1e6q2",
              question: "What is David supposed to do?",
              options: [
                "pick Susan up at the office",
                "meet Susan at 9 o’clock",
                "ring Susan at the office",
                "meet Susan at 8 o’clock",
              ],
              correct: 1,
              explanation:
                "David định làm gì? …if I don\'t ring again do you think you could come and get me at about nine? (nếu tôi không gọi lại, bạn có thể đến và đón tôi vào khoảng chín giờ không? => Đáp án B (gặp Susan vào 9 giờ) là đáp án đúng",
            },
            {
              id: "p1e6q3",
              question: "Which is NOT on special offers?",
              options: [
                "men’s designer shirts",
                "fruits",
                "kitchenware",
                "beef",
              ],
              correct: 1,
              explanation:
                "Mặt hàng nào KHÔNG nằm trong chương trình ưu đãi đặc biệt? In our fashion department on the first floor we have a sale in men’s\' designer shirts. On the second floor in household goods, there are special offers in kitchenware and small appliances and in our food hall on the ground floor some outstanding discounts on cuts of beef... (Trong gian hàng thời trang của chúng tôi ở tầng một, chúng tôi có giảm giá áo sơ mi thiết kế cho nam giới. Trên tầng hai trong gian đồ gia dụng, có những ưu đãi đặc biệt cho đồ dùng nhà bếp và thiết bị gia dụng nhỏ. Và ở quầy thực phẩm, của chúng tôi, có một số giảm giá đặc biệt cho thịt bò…) => Đáp án B (trái cây) là đáp án đúng vì thông tin ở đáp án A, C, D đều có trong bài.",
            },
            {
              id: "p1e6q4",
              question: "Why was the construction of the bypass cancelled?",
              options: [
                "the residents did not want to move their homes",
                "there was another plan to build houses there",
                "the government reduced spending",
                "the bypass was of no use at all",
              ],
              correct: 2,
              explanation:
                "Tại sao việc xây dựng đường vòng lại bị hoãn? …but now the scheme has been put on hold following government spending cuts. (…nhưng bây giờ kế hoạch đã bị hoãn do chi tiêu của chính phủ bị cắt giảm.) => Đáp án C (chính phủ cắt giảm chi tiêu) là đáp án đúng",
            },
            {
              id: "p1e6q5",
              question: "Who is the caller?",
              options: [
                "the claims director of an insurance firm",
                "a representative of an insurance firm",
                "a secretary of an insurance firm",
                "a burglar",
              ],
              correct: 0,
              explanation:
                "Ai là người gọi? Hello, this is the claims manager from Royal Solihull Insurance. (Xin chào, tôi là người giám đốc khiếu nại của công ty Bảo hiểm Royal Soihull.) => Đáp án A (Giám đốc khiếu nại của một công ty bảo hiểm) là đáp án đúng",
            },
            {
              id: "p1e6q6",
              question: "Who are the police searching for?",
              options: [
                "a gas board official",
                "a well-dressed man",
                "an old age pensioner",
                "a witness",
              ],
              correct: 1,
              explanation:
                "Ai là người mà cảnh sát đang tìm kiếm? The thief, who is a well-dressed young man, calls at pensioners\' homes and tells them he is checking for gas leaks. (Tên trộm, một người đàn ông trẻ ăn mặc sang trọng gọi đến nhà của những người nghỉ hưu và nói rằng anh ta đang kiểm tra rò rỉ khí ga.) => Đáp án B (một người đàn ông ăn mặc sang trọng) là đáp án đúng",
            },
            {
              id: "p1e6q7",
              question:
                "What should you do if you want to speak to a member of staff?",
              options: [
                "press 3",
                "press 2",
                "speak after the tone",
                "dial his extension",
              ],
              correct: 3,
              explanation:
                "Bạn nên làm gì nếu bạn muốn nói chuyện với một nhân viên? If you want to speak to a member of staff and you know their extension, you can dial their number after the short tone. (Nếu bạn muốn nói chuyện một nhân viên và biết máy phụ của họ, bạn có thể gọi số của họ sau tín hiệu ngắn) => Đáp án D (gọi máy phụ) là đáp án đúng",
            },
            {
              id: "p1e6q8",
              question: "Where are the cheapest houses to be found?",
              options: [
                "in the new suburbs",
                "in the old suburbs",
                "in the City centre",
                "out of town",
              ],
              correct: 1,
              explanation:
                "Nơi nào bán những ngôi nhà rẻ nhất? To my mind, the best place to start is in the established or shall we say former suburbs. that\'s where you\'ll find the real bargains… (Đối với tôi, nơi tốt nhất để bắt đầu là ở vùng ngoại ô đang hình thành hoặc đã có từ trước. Đó là nơi bạn sẽ tìm thấy những món hời thực sự…) => Đáp án B (ở những vùng ngoại ô cũ) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e7",
          label: "Bai 7",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-07.mp3",
          transcript:
            "Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. We are ready to start First you have some time to look at questions 1 to 8. Now listen carefully and answer questions 1 to 8. Question 1. Great Midland Railway would like to apologize to passengers as we will not be providing the advertised buffet service with tea, coffee cold drinks and full English and continental breakfasts on this journey. This is due to fire in the locomotive shed before departure. A trolley service is available, however which 85will be visiting all coaches with a selection of cold drinks and sandwiches. Passengers are requested to remain in their seats for this service Question 2. Well, I was afraid you\'d have to wait till Thursday but I just talked to the engineer and er today\'s Tuesday, isn\'t it he said you could pick it up tomorrow Is that all right for you? Question 3. Motorists travelling to Bury are notified of a serious fire in the town. The traffic isn\'t moving at all and there are hold ups in all directions. Avoid Bury if you can. In Birmingham there\'s already heavy traffic around Edgebaston as the crowds arrive for the cricket final there. There are a number of minor roads closed around the cricket ground so if you\'ve got a ticket for the final make sure you give yourself plenty of time to get there On the M11 to Cambridge there\'s been. Question 4. It’s 7.30 and now we have a choice of our viewers here in Walẹs. On HTV we have Bill Barnard and Ian Fall in The Sport in Question. On TSW we have a documentary on the 400th anniversary of Sir Francis Drake\'s death which examines Drake\'s last voyage to the Caribbean and on Channel 4 Wales there’s an adaptation of Johns McShene\'s novel about modern university life. A Place in History. Question 5. I\'ve got instructions for getting to Dad\'s new house here, Ken Turn off at junction 28 and take the first turning signposted to the City centre and Barnstable. After that, drive for about  yards and there\'s another left turn. There\'s no signpost but he says it leads to Matlock village and it\'s called Gate Lane. The new house is 150 yards along on the right. It\'s an old brick building with a lovely... Question 6. ideal for a weekend break. We have indoor heated swimming pools Jacuzzis and saunas three gymnasia with qualified fitness instructors all freely available to guests. There are three top class restaurants to cater for every taste. And even a crèche so the busy mum and dad are free to enjoy the facilities. Double and single rooms can be booked only through. Question 7. ...and all passengers should disembark while the plane is being refuelled. This should take about 45 minutes. Passengers to London should follow the signs to the luggage collection points and the exits. Passengers continuing their journeys to destinations in Europe should proceed to terminal B. There is a bus to take you there. Passengers continuing their flight to the USA should wait in the departure lounge. We will call you as soon as it is safe for you to reboard the plane. On behalf of Air Midland, I would like to thank you for choosing. 8687 Question 8. A woman whose life was saved by an emergency operation while on a flight from Cape Town to Jakarta will take another flight to Jakarta tomorrow this time on her honeymoon. Georgina Curry survived thanks to quick thinking from two doctors on board the plane who performed an emergency appendix operation at 30,000 feet. But today only love is in the air Miss Curry marries her fiancé David Hume. This is the end of part 1. Now turn to Part 2",
          questions: [
            {
              id: "p1e7q1",
              question: "What can you get on the train?",
              options: [
                "full English breakfast",
                "full continental breakfast",
                "tea and coffee",
                "sandwiches",
              ],
              correct: 3,
              explanation:
                "Bạn có thể mang gì lên tàu hỏa? A trolley service is available, however which will be visiting all coaches with a selection of cold drinks and sandwiches. (Tuy nhiên, một chiếc đẩy để đồ ăn có sẵn sẽ đến tất cả các toa khách với rất nhiều đồ uống lạnh và bánh sandwich.) => Đáp án D đúng",
            },
            {
              id: "p1e7q2",
              question: "When will the television be ready for collection?",
              options: [
                "on Tuesday",
                "on Wednesday",
                "on Thursday",
                "on Friday",
              ],
              correct: 1,
              explanation:
                "Khi nào chiếc ti với sẵn sàng để sử dụng? today\'s Tuesday, isn\'t it he said you could pick it up tomorrow. (Hôm nay là thứ Ba đúng không nhỉ, anh ấy nói bạn có thể lấy nó vào ngày mai.) => Đáp án B (Thứ Tư) là đáp án đúng",
            },
            {
              id: "p1e7q3",
              question: "What should people going to Birmingham do?",
              options: [
                "cancel the trip",
                "leave early",
                "use minor roads",
                "use Bury road",
              ],
              correct: 1,
              explanation:
                "Những người đến Birmingham nên làm gì? if you\'ve got a ticket for the final make sure you give yourself plenty of time to get there. (nếu bạn có vé cho trận chung kết, hãy đảm bảo rằng bạn dành nhiều thời gian để đi đến đó.) => Đáp B (đi sớm) là đáp án đúng",
            },
            {
              id: "p1e7q4",
              question: "Which channel broadcasts about history?",
              options: ["HTV", "Channel 4 Wales", "TSW", "no channel at all"],
              correct: 2,
              explanation:
                "Kênh nào phát sóng về lịch sử? On TSW we have a documentary on the 400th anniversary of Sir Francis Drake\'s death… (Trên kênh TSW, chúng ta có bộ phim tài liệu về lễ kỷ niệm 400 năm ngày mất của Sir Francis Drake…) => Đáp án C đúng",
            },
            {
              id: "p1e7q5",
              question: "Where does Ken’s father live?",
              options: [
                "in the City centre",
                "in Matlock village",
                "in Gate Lane",
                "near a motorway",
              ],
              correct: 2,
              explanation:
                "Bố của Ken sống ở đâu? There\'s no signpost but he says it leads to Matlock village and it\'s called Gate Lane. (Không có biển hiệu nhưng ông ấy nói rằng nó dẫn đến làng Matlock và gọi là Đường/Ngõ Gate.) => Đáp án C đúng",
            },
            {
              id: "p1e7q6",
              question: "What is being advertised?",
              options: [
                "a luxury hotel",
                "a fitness centre",
                "a summer camp",
                "a restaurant",
              ],
              correct: 0,
              explanation:
                "Cái gì đang được quảng cáo? We have indoor heated swimming pools Jacuzzis and saunas three gymnasia with qualified fitness instructors all freely available to guests There are three top class restaurants to cater for every taste and even a crèche so the busy mum and dad are free to enjoy the facilities. Double and single rooms can be booked only through. (Chúng tôi có hồ bơi nước nóng trong nhà Jacuzzis, phòng xông hơi và ba phòng tập gym với hướng dẫn viên thể dục có trình độ, tất cả đều có sẵn cho khách. Có ba nhà hàng đẳng cấp hàng đầu để phục vụ cho mọi khẩu vị. Và thậm chí một nhà trẻ vì vậy cha mẹ bận rộn có thể tự do để tận hưởng cơ sở vật chất. Phòng đôi và phòng đơn chỉ được đặt thông qua…) => Đáp án A (một khách sạn sang trọng) là đáp án đúng",
            },
            {
              id: "p1e7q7",
              question:
                "You are flying to New York. Where should passengers to New York go?",
              options: [
                "to terminal B",
                "to the departure lounge",
                "to luggage collection",
                "to the exits",
              ],
              correct: 1,
              explanation:
                "Bạn đang bay đến New York. Hành khách đến New York nên đi đâu? Passengers continuing their flight to the USA should wait in the departure lounge. (Hành khách tiếp tục chuyến bay đến Mỹ nên đợi ở phòng chờ.) => Đáp án B (đến phòng chờ) là đáp án đúng",
            },
            {
              id: "p1e7q8",
              question: "What is it true about Georgina Curry?",
              options: [
                "She went to Jakarta for an appendix operation.",
                "She is going to Jakarta for an appendix operation.",
                "She went to Jakarta on her honeymoon.",
                "She is going to Jakarta on her honeymoon",
              ],
              correct: 3,
              explanation:
                "Điều gì đúng về Georgina Curry? A woman whose life was saved by an emergency operation while on aflight from Cape Town to Jakarta will take another flight to Jakarta tomorrow; this time on her honeymoon. (Một người phụ nữ được cứu sống bởi một ca phẫu thuật khẩn cấp khi đang trong chuyến bay từ thị trấn Cape đến Jarkata sẽ bắt một chuyến bay khác đến Jakarta vào ngày mai; đây là khoảng thời gian trong tuần trăng mật của cô ấy.) => Đáp án D (Cô ấy sẽ đến Jarkata trong tuần trăng mật của mình) là đáp án đúng.",
            },
          ],
        },
        {
          id: "p1e8",
          label: "Bai 8",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-08.mp3",
          transcript:
            "Vivian English Center listening comprehension. In this section of the test you will have an opportunity to demonstrate your ability to understand conversations and talks in English. There are three parts in this section with special directions for each part. answer all the questions on the basis of what is stated or implied by the 88speakers in the recording. There will be time for you to read the instructions and you will have a chance to check your work. the recording will be played once only. at the end of the test you will be given seven minutes to transfer your answers to an answer sheet. Now turn to part 1 Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. Now, let’s listen to an example. On the recording, you will hear: Hello. This is the travel agency returning your call. You left a message about the holiday you’ve booked, asking which meals are included in the cost during your stay at Sunny Hotel. Lunch and dinner are free but if you wish to have breakfast in the hotel, you will need to pay an extra amount of money, depending on what you order. Let me know if I can help you with any other information. Goodbye. On the test book, you will read: Which meal is NOT included in the price of the holiday? A. Breakfast B. Lunch C. Dinner D. All The correct answer is A. Breakfast. We are ready to start. First, you have sometime to look at question 1 to 8. Now listen carefully an answer question 1 to 8. Question 1. Good morning, this is Maria Gray calling from Dilbert Furniture. This message is for Rebecca Rhodes. I need to speak with her about the number of desks she requested, and want to confirm her order before we ship her purchases. Question 2. Our technician has discovered some problems with our computer system and will be doing upgrades. This means there will be no internet access tomorrow. If you need access to the Internet, you can use the wireless computers in the conference room.  Question 3. Good evening, ladies and gentlemen. The Royal Gallery will be closing in just 10 minutes, so we ask that you make your way to the nearest exit. For those of you taking the audio tour, please return the audio equipment to the front desk in our lobby. Thank you for visiting us today, and we hope you enjoyed your visit to the gallery. Question 4. You\'re listening to Gym Fitness. I\'m your host, Sylvia Brasher. After this long winter, many of us want to lose some weight. We\'ll be speaking with Julio Barbosa, a physical fitness expert. He is going to provide us with some suggestions for losing weight and how to maintain your ideal weight by starting a simple exercise routine. He will also tell us about his plans to open a new fitness center in Grassoville. Thanks for joining us today, Julio. Question 5. You\'re listening to the morning traffic report. Traffic is moving steadily this morning with only minor problems on Washington Avenue due to some roadwork. Those headed north may want to take Stewart Road instead. Stay tuned for the financial report coming up right after the commercial break. Question 6. My name is David Ford, and I\'m one of the programmers at Jade Software. Today I’m going to show you how our new accounting program works and go over some of its interesting features. The program was designed to make accounting a lot easier by organizing figures automatically. Now I will show you a short video about the development of this software. Question 7. Welcome to the Niagara Falls tour. We will take a boat tour of Horeshoe Falls on the Canadian side. You will have incredible views of this one great natural wonder. During the tour, please be sure to put on your raincoat to avoid getting wet. At the end of our tour, we will visit the Niagara Falls museum, where you can read about the history of the falls and see some local Indian artifacts. Now follow me/and we can board our tour boat. Question 8. This is Julie calling from the Stylista Hair Salon. I\'m trying to reach Mr. Andrews concerning the interview we scheduled for this afternoon. I\'m not feeling well today, so I’m afraid I\'ll have to cancel our meeting. However, we are very interested in your application for our hairstylist position. I hope to be back in the office tomorrow, so please call my secretary and let her know if you are available to meet with me tomorrow.",
          questions: [
            {
              id: "p1e8q1",
              question: "What should Rebecca do?",
              options: [
                "Confirm an order",
                "Request some furniture",
                "Ship some furniture",
                "Cancel the order",
              ],
              correct: 0,
              explanation:
                "Rebecca nên làm gì? This message is for Rebecca Rhodes.I need to speak with her about the number of desks she requested, and want to confirm her order before we ship her purchases. (Đây là tin nhắn cho Rebbeca Rhodes. Tôi cần nói chuyện với cô ấy về số lượng ghế cô ấy yêu cầu và muốn xác nhận đơn đặt hàng của cô ấy trước khi chúng tôi chuyển hàng hóa đến.) => Đáp án A (Xác nhận đơn đặt hàng) là đáp án đúng",
            },
            {
              id: "p1e8q2",
              question:
                "What can employees do if they need to use the internet?",
              options: [
                "Phone the technical personnel",
                "Use the computers in the conference room",
                "Go to the wireless coffee shop in the building",
                "Use the computers at home",
              ],
              correct: 1,
              explanation:
                "Nhân viên có thể làm gì nếu họ cần sử dụng Internet? If you need access to the Internet, you can use the wireless computers in the conference room. (Nếu bạn cần truy cập Internet, bạn có thể sử dụng máy tính không dây trong phòng hội nghị.) => Đáp án B (sử dụng máy tính trong phòng hội nghị) là đáp án đúng",
            },
            {
              id: "p1e8q3",
              question: "What is the purpose of the announcement?",
              options: [
                "To provide information about a tour",
                "To introduce a new exhibit",
                "To offer a new audio service",
                "To announce the closing of the facility",
              ],
              correct: 3,
              explanation:
                "Mục đích của thông báo là gì? The Royal Gallery will be closing in just 10 minutes, so we ask that you make your way to the nearest exit. (Phòng triển lãm Royal sẽ đóng cửa trong chỉ 10 phút nữa, vì vậy chúng tôi yêu cầu các bạn đi đến lối ra gần nhất.) => Đáp án D (Thông báo đóng cửa cơ sở) là đáp án đúng",
            },
            {
              id: "p1e8q4",
              question: "What is mentioned about Julio Barbosa?",
              options: [
                "He wrote a book on weight loss.",
                "He works in a hospital.",
                "He is starting a new business.",
                "He operates a restaurant.",
              ],
              correct: 2,
              explanation:
                "Điều gì được đề cập đến về Julio Barbosa? We\'ll be speaking with Julio Barbosa, a physical fitness expert… He will also tell us about his plans to open a new fitness center in Grassoville. (Chúng ta sẽ nói chuyện với Julio Barbosa….Anh ấy sẽ nói cho chúng ta về dự định mở một trung tâm thể dục ở Grasoville.) => Đáp án C (Anh ấy sẽ bắt đầu một lĩnh vực kinh doanh mới) là đáp án đúng",
            },
            {
              id: "p1e8q5",
              question: "What will the listeners probably hear next?",
              options: [
                "A business news report",
                "a weather report",
                "a traffic report",
                "A commercial",
              ],
              correct: 3,
              explanation:
                "Người nghe sẽ có thể nghe gì tiếp theo? You\'re listening to the morning traffic report…. Stay tuned for the financial report coming up right after the commercial break. (Bạn đang nghe bản tin giao thông buổi sáng…. Hãy theo dõi báo cáo tài chính sắp tới ngay sau ít phút dành cho quảng cáo) => Đáp án D (Quảng cáo) là đáp án đúng",
            },
            {
              id: "p1e8q6",
              question: "What is the purpose of the talk?",
              options: [
                "To request account statements",
                "To introduce new software",
                "To announce a schedule change",
                "To explain some office policies",
              ],
              correct: 1,
              explanation:
                "Mục đích của buổi nói chuyện? 91My name is David Ford, and I\'m one of the programmers at Jade Software. Today I’m going to show you how our new accounting program works and go over some of its interesting features. The program was designed to make accounting a lot easier by organizing figures automatically. Now I will show you a short video about the development of this software. (Tên tôi là David Ford, và tôi là một trong những lập trình viên của Jade Software. Hôm nay, tôi sẽ cho bạn thấy chương trình kế toán mới của chúng tôi hoạt động như thế nào và xem qua một số tính năng thú vị của nó. Chương trình được thiết kế để giúp việc kế toán dễ dàng hơn nhiều bằng cách tổ chức các số liệu tự động. Bây giờ tôi sẽ cho các bạn xem một đoạn video ngắn về sự phát triển của phần mềm này.) => Đáp án B (Để giới thiệu một phần mềm mới) là đáp án đúng",
            },
            {
              id: "p1e8q7",
              question: "What is the audience told to do?",
              options: [
                "Read a brochure",
                "Board the bus",
                "Wear raincoats",
                "Stay seated",
              ],
              correct: 2,
              explanation:
                "Người xem được yêu cầu làm gì? During the tour, please be sure to put on your raincoat to avoid getting wet. (Trong suốt chuyến đi, hãy chắc chắn rằng các bạn mặc áo mưa của mình để tránh bị ướt.) => Đáp án C (Mặc áo mưa) là đáp án đúng",
            },
            {
              id: "p1e8q8",
              question: "What is the main purpose of the call?",
              options: [
                "To reschedule an interview",
                "To arrange a class",
                "To postpone an exhibition",
                "To request an application",
              ],
              correct: 0,
              explanation:
                "Mục đích chính của cuộc gọi là gì? This is Julie calling from the Stylista Hair Salon. I\'m trying to reach Mr. Andrews concerning the interview we scheduled for this afternoon. I\'m not feeling well today, so I’m afraid I\'ll have to cancel our meeting. However, we are very interested in your application for our hairstylist position. I hope to be back in the office tomorrow, so please call my secretary and let her know if you are available to meet with me tomorrow. (Đây là Julie gọi từ Salon tóc Stylista. Tôi đang cố gắng liên lạc với ông Andrews về cuộc phỏng vấn mà chúng tôi đã lên kế hoạch cho buổi chiều nay. Hôm nay tôi thấy không khỏe, nên tôi e rằng tôi sẽ phải hủy buổi gặp của chúng ta. Tuy nhiên, chúng tôi rất quan tâm đến việc của ứng tuyển của bạn cho vị trí tạo mẫu tóc của chúng tôi. Tôi hy vọng sẽ trở lại văn phòng vào ngày mai, vì vậy xin vui lòng gọi cho thư ký của tôi và cho cô ấy biết nếu bạn sẵn lòng gặp tôi vào ngày mai.) => Đáp án A (Sắp xếp lại buổi phỏng vấn) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e9",
          label: "Bai 9",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-09.mp3",
          transcript:
            "Vivian English Center listening comprehension. In this section of the test you will have an opportunity to demonstrate your ability to understand conversations and 92talks in English. There are three parts in this section with special directions for each part. answer all the questions on the basis of what is stated or implied by the speakers in the recording. There will be time for you to read the instructions and you will have a chance to check your work. the recording will be played once only. at the end of the test you will be given seven minutes to transfer your answers to an answer sheet. Now turn to part 1 Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. Now, let’s listen to an example. On the recording, you will hear: Hello. This is the travel agency returning your call. You left a message about the holiday you’ve booked, asking which meals are included in the cost during your stay at Sunny Hotel. Lunch and dinner are free but if you wish to have breakfast in the hotel, you will need to pay an extra amount of money, depending on what you order. Let me know if I can help you with any other information. Goodbye. On the test book, you will read: Which meal is NOT included in the price of the holiday? A. Breakfast B. Lunch C. Dinner D. All The correct answer is A. Breakfast. We are ready to start. First, you have sometime to look at question 1 to 8. Now listen carefully an answer question 1 to 8. Question 1. The accounting department is offering assistance in filling out tax forms for all employees. Individual consultations will be held on Friday from 9 a.m. to 1 p.m. If you are interested, please sign up for an appointment at the accounting department before Thursday. Question 2. Good evening, ladies and gentlemen. The Royal Gallery will be closing in just 10 minutes, so we ask that you make your way to the nearest exit. 93For those of you taking the audio tour, please return the audio equipment to the front desk in our lobby. Thank you for visiting us today, and we hope you enjoyed your visit to the gallery. Question 3. Looking for a new, refreshing and healthy beverage? Try Sunkiss\'s Fruitblast for a cool drink that is not only delicious, but good for your body. Fruitblast is full of the nutrients that your body needs. It comes in six different flavors and is perfect for school lunches or with an afternoon snack. So if you\'re tired of all those high-sugar drinks, try Fruitblast as a healthy and delicious alternative. Fruitblast is available/ at most convenience stores. Question 4. This is the KGBS traffic report. Traffic on Highway 6 headed west is heavy due to some flooding caused by last night\'s storm. If you are going west, we suggest taking Highway 15 instead, as the roads are clear in that area. Also, don\'t forget that Lakefront Road will be closed starting tomorrow because of the new bridge construction. You may want to take Valley view Drive as an alternate route. Question 5. Thank you for coming to the meeting this morning. It is my pleasure to introduce Colin Carey, our new artistic director. Mr. Carey has significant experience in layout, and most recently worked for Brady Publishing in Sydney. I am sure he will make a welcome addition to our staff. Today, he will present some new design concepts/for our magazine. Please give a warm welcome to Colin Carey. Question 6. I\'d like to welcome all our new interns this morning. I\'ve been a television producer here at SATV for the past 5 years, and it\'s my pleasure to guide you through the orientation seminar this week. During my time here, I\'ve learned about program scheduling, assisting directors and how to multitask. And as technology is constantly changing, I believe you will need to keep updated with all the advances in computer and camera equipment. These are the most valuable skills to those of you beginning your careers/in this industry. Keep that in mind as we go through this 7-day seminar. Question 7. This is Andrew Bank\'s account line. We now offer online service for customers manage their accounts. Simply visit our website at www.andrewbank.com to sign up for this service. Fill out the form and we will e-mail you a confirmation number. Question 8. May I have your attention, please? This morning, electricians are going to be wiring the new lobby. Power will be down for two hours from 11 a.m.  to 1 p.m. Please save any work on your computer before 11 a.m. to avoid losing it.",
          questions: [
            {
              id: "p1e9q1",
              question: "When will the consultations be held?",
              options: ["On Monday", "On Thursday", "On Friday", "On Saturday"],
              correct: 2,
              explanation:
                "Các buổi tư vấn sẽ được tổ chức khi nào? Individual consultations will be held on Friday from 9 a.m. to 1 p.m. (Các buổi tư vấn cá nhân sẽ được tổ chức vào thứ Sáu từ 9 giờ sáng đến 1 giờ chiều.) => Đáp án C đúng",
            },
            {
              id: "p1e9q2",
              question: "What are the tourists asked to do?",
              options: [
                "Use the audio equipment",
                "Pay for their purchases",
                "Return some books",
                "Leave the building",
              ],
              correct: 3,
              explanation:
                "Khách tham quan được yêu cầu làm gì? The Royal Gallery will be closing in just 10 minutes, so we ask that you make your way to the nearest exit. (Phòng triển lãm Royal sẽ đóng cửa trong chỉ trong 10 phút, vì vậy chúng tôi yêu cầu các bạn đi đến lối ra gần nhất.) => Đáp án D (Rời tòa nhà) là đáp án đúng",
            },
            {
              id: "p1e9q3",
              question: "What is the advertisement for?",
              options: [
                "A snack food",
                "A vitamin supplement",
                "A beverage",
                "Mineral water",
              ],
              correct: 2,
              explanation:
                "Đây là quảng cáo cho cái gì? Looking for a new, refreshing and healthy beverage? Try Sunkiss\'s Fruitblast for a cool drink that is not only delicious, but good for your body. (Bạn đang tìm kiếm một đồ uống mới, sảng khoái và khỏe mạnh? Hãy thử Fruitblast của Sunkiss để thưởng thức đồ uống mát lạnh không chỉ ngon mà còn tốt cho cơ thể của bạn.) => Đáp án C đúng",
            },
            {
              id: "p1e9q4",
              question: "What advice does the speaker give?",
              options: [
                "Take an alternate route",
                "Use the subway",
                "Avoid the city center",
                "Drive slowly",
              ],
              correct: 0,
              explanation:
                "Phát ngôn viên đưa ra lời khuyên gì? Also, don\'t forget that Lakefront Road will be closed starting tomorrow because of the new bridge construction. You may want to take Valleyview Drive as an alternate route. (Ngoài ra, đừng quên rằng đường Lakefront sẽ đóng bắt đầu từ ngày mai bởi vì việc xây dựng cầu mới. Bạn có thể muốn chọn đường Valleyview như một tuyến đường thay thế.) => Đáp án A (Chọn một con đường thay thế) là đáp án đúng",
            },
            {
              id: "p1e9q5",
              question: "What is the purpose of the talk?",
              options: [
                "To provide information on a magazine",
                "To introduce a new member of staff",
                "To explain new projects",
                "To inform staff of new policies",
              ],
              correct: 1,
              explanation:
                "Mục đích của buổi nói chuyện là gì? Thank you for coming to the meeting this morning. It is my pleasure to introduce Colin Carey, our new artistic director. Mr. Carey has significant experience in layout, and most recently worked for Brady Publishing in Sydney. I am sure he will make a welcome addition to our staff. Today, he will present some new design concepts/for our magazine. Please give a warm welcome to Colin Carey. (Tôi rất vui khi được giới thiệu Colin Carey, giám đốc nghệ thuật mới của chúng ta. Ông Carey có rất nhiều kinh nghiệm về cách bài trí, và gần đây nhất là làm việc cho nhà xuất bản Brady ở Sydney. Tôi chắc chắn anh ấy sẽ là một sự bổ sung nhân viên đáng hoan nghênh của chúng ta. Hôm nay, anh ấy sẽ trình bày một số ý tưởng thiết kế mới cho tạp chí của chúng ta. Xin nồng nhiệt chào đón Colin Carey.) => Đáp án B (Giới thiệu nhân viên mới) là đáp án đúng",
            },
            {
              id: "p1e9q6",
              question: "How long is the orientation?",
              options: ["One day", "Five days", "One week", "Two weeks"],
              correct: 2,
              explanation:
                "Hội thảo định hướng kéo dài bao lâu? it\'s my pleasure to guide you through the orientation seminar this week….Keep that in mind as we go through this 7-day seminar. (Tôi rất vui khi được hướng dẫn các bạn hội thảo định hướng trong tuần này…Hãy nhớ rằng buổi hội thảo của chúng ta sẽ diễn ra trong 7 ngày.) => Đáp án C (Một tuần) là đáp án đúng",
            },
            {
              id: "p1e9q7",
              question: "What might customers receive through email?",
              options: [
                "an account number",
                "a confirmation number",
                "a form",
                "a phone number",
              ],
              correct: 1,
              explanation:
                "Khách hàng có thể nhận được gì qua email? Fill out the form and we will e-mail you a confirmation number. (Hãy điền vào biểu mẫu và chúng tôi sẽ gửi qua email cho bạn một số xác nhận.) => Đáp án B đúng",
            },
            {
              id: "p1e9q8",
              question: "What is happening at 11 a.m this morning?",
              options: [
                "Electricians are repairing the lobby",
                "There will be a power cut",
                "Employees are working on their computers",
                "Employees are having lunch",
              ],
              correct: 1,
              explanation:
                "Điều gì sẽ xảy ra vào 11 giờ sáng nay? This morning, electricians are going to be wiring the new lobby. Power will be down for two hours from 11 a.m. to 1 p.m. (Sáng nay thợ điện sẽ nối dây cho tiền sảnh mới. Điện sẽ bị cắt trong 2 tiếng từ 11 giờ sáng đến 1 giờ chiều.) => Đáp án B (Sẽ có cắt điện) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e10",
          label: "Bai 10",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-10.mp3",
          transcript:
            "Vivian English Center listening comprehension. In this section of the test you will have an opportunity to demonstrate your ability to understand conversations and talks in English. There are three parts in this section with special directions for each part. answer all the questions on the basis of what is stated or implied by the speakers in the recording. There will be time for you to read the instructions and you will have a chance to check your work. the recording will be played once 96only. at the end of the test you will be given seven minutes to transfer your answers to an answer sheet. Now turn to part 1 Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. Now, let’s listen to an example. On the recording, you will hear: Hello. This is the travel agency returning your call. You left a message about the holiday you’ve booked, asking which meals are included in the cost during your stay at Sunny Hotel. Lunch and dinner are free but if you wish to have breakfast in the hotel, you will need to pay an extra amount of money, depending on what you order. Let me know if I can help you with any other information. Goodbye. On the test book, you will read: Which meal is NOT included in the price of the holiday? A. Breakfast B. Lunch C. Dinner D. All The correct answer is A. Breakfast. We are ready to start. First, you have sometime to look at question 1 to 8. Now listen carefully an answer question 1 to 8. Question one. Thank you for coming to tonight\'s performance of The Miracle Maker. The play will start shortly, and we\'d like to remind you that copies of the script are are available for sale in the lobby for $15. For tonight only, if you buy a script you will also receive a special poster signed by the entire cast. Also, don\'t forget to pick up a schedule of events for our other performances this year. Thanks for listening and enjoy the show. Question two. Are you worried about the safety of your home? Whether you\'re looking for a new security plan or an update of your current security system Power Security has the solution for you. We offer state-of-the-art technology and speedy service. Our security team is on duty 24 hours a day to provide you with 97expert protection. We also offer special rates for office buildings or complexes. So give us a call today at 555-243. and request a free brochure and consultation. Question three. This is the KGBS traffic report. Traffic on Highway 6 headed west is heavy due to some flooding caused by last night\'s storm If you are going west, we suggest taking Highway 15 instead as the roads are clear in that area. Also, don\'t forget that Lakefront Road will be closed starting tomorrow because of the new bridge construction. You may want to take Valleyview Drive as an alternate route. Question four. Welcome to the Temasek Bird Park. Today, we\'re going to see birds that have been collected from all over the world Because it\'s hot outside, you should bring a bottle of water with you. The tour will be 3 hours, including a short break. Question 5. Thanks for calling Vista Telecom. We are currently experiencing problems with the downtown telephone lines. Technicians are working on the problem and hope to restore full service by this afternoon. Please call back each hour to hear an updated recording of this message. Question six. May I have your attention, please? Our new parking facilities will open and be ready for use starting Monday morning. All staff members who wish to leave their vehicles in the parking area should register for a parking pass. All requests must be submitted to the personnel office by Thursday. Don\'t forget to bring your parking pass with you every day as it is needed to enter the parking area. Question 7. May I have your attention, please? As you were told last week, our office windows were supposed to be replaced tomorrow. But, the installers have been delayed and are still working on the lobby. It looks like we\'ll have to wait until Wednesday to have our windows replaced. Sorry for the delay. Finally, I just want to remind you to have the offices ready for the installers on Wednesday. Put away any fragile items on your desks before you leave the office Tuesday night. Question eight. You\'re listening to WKPN and I\'m your host, Marion Cunningham. On today\'s program, we\'ll be talking to Tom Bosley who is an environmental researcher at Ross University. We\'re going to be discussing Mr. Bosley\'s recent study of local rivers and what we can do to keep our lakes and rivers safe. Following Mr. Bosley we\'ll be joined by Henry Howard with a report on new environmental protection laws passed by the government last week. He\'ll 9899 explain the new laws and how they will affect local industries All this is coming up in 10 minutes, right after the weather report.",
          questions: [
            {
              id: "p1e10q1",
              question: "What is offered for free with a purchase?",
              options: ["A music CD", "A poster", "A script", "A ticket"],
              correct: 1,
              explanation:
                "Cái gì được miễn phí khi mua sản phẩm? For tonight only, if you buy a script, you will also receive a special poster signed by the entire cast (Chỉ trong tối nay, nếu bạn mua kịch bản, bạn cũng sẽ nhận được một áp phích đặc biệt có chữ ký của toàn bộ diễn viên.) => Đáp án B đúng",
            },
            {
              id: "p1e10q2",
              question:
                "What does the advertisement offer for office buildings?",
              options: [
                "Construction plans",
                "Free delivery",
                "Special prices",
                "Full installation",
              ],
              correct: 2,
              explanation:
                "Quảng cáo này tặng cái gì cho các tòa nhà văn phòng? We also offer special rates for office buildings or complexes. (Chúng tôi cũng đưa ra các mức giá đặc biệt cho các tòa nhà văn phòng hoặc khu phức hợp.) => Đáp án C (Các mức giá ưu đãi) là đáp án đúng",
            },
            {
              id: "p1e10q3",
              question: "According to the speaker, what will happen tomorrow?",
              options: [
                "A street will open.",
                "Bridge construction will begin.",
                "Traffic will be heavy.",
                "Weather conditions will be foggy.",
              ],
              correct: 1,
              explanation:
                "Theo phát thanh viên, điều gì sẽ xảy ra vào ngày mai? Also, don\'t forget that Lakefront Road will be closed starting tomorrow because of the new bridge construction. (Ngoài ra, đừng quên rằng đường Lakefront sẽ đóng bắt đầu từ ngày mai bởi vì việc xây dựng cầu mới.) => Đáp án B (Việc xây dựng cầu mới sẽ bắt đầu) là đáp án đúng",
            },
            {
              id: "p1e10q4",
              question: "What is true about the tour?",
              options: [
                "People can see birds from all over the world",
                "It’s possible to cycle in the park",
                "It lasts two hours",
                "People are provided with water on the tour",
              ],
              correct: 0,
              explanation:
                "Điều gì đúng về chuyến thăm quan? Today, we\'re going to see birds that have been collected from all over the world. (Hôm nay, chúng ta sẽ thấy những con chim đã được mang về đây từ khắp nơi trên thế giới.) => Đáp án A (Mọi người có thể nhìn thấy những chú chim ở khắp nơi trên thế giới) là đáp án đúng",
            },
            {
              id: "p1e10q5",
              question: "When will the service be restored full?",
              options: [
                "in an hour",
                "this afternoon at the latest",
                "in half an hour",
                "no information",
              ],
              correct: 1,
              explanation:
                "Khi nào dịch vụ sẽ được khôi phục hoàn toàn? Technicians are working on the problem and hope to restore full service by this afternoon. (Các kỹ thuật viên đang giải quyết vấn đề này và hy vọng khôi phục toàn bộ dịch vụ vào chiều nay.) => Đáp án B (Muộn nhất vào chiều nay) là đáp án đúng",
            },
            {
              id: "p1e10q6",
              question: "When will the new system go into effect?",
              options: [
                "On Monday",
                "On Tuesday",
                "On Wednesday",
                "On Thursday",
              ],
              correct: 0,
              explanation:
                "Khi nào hệ thống mới sẽ đi vào hoạt động? Our new parking facilities will open and be ready for use starting Monday morning. (Bãi đậu xe mới của chúng tôi sẽ mở cửa và sẵn sàng để sử dụng bắt đầu từ sáng thứ Hai.) => Đáp án A đúng",
            },
            {
              id: "p1e10q7",
              question: "What is the purpose of this announcement?",
              options: [
                "To give moving instructions",
                "To offer free installation",
                "To cancel a meeting",
                "To inform employees of a delay",
              ],
              correct: 3,
              explanation:
                "Mục đích của thông báo này là gì? But, the installers have been delayed and are still working on the lobby. It looks like we\'ll have to wait until Wednesday to have our windows replaced. (Những người thợ lắp đặt rất chậm trễ và vẫn đang làm việc ở tiền sảnh. Có vẻ như chúng ta sẽ phải đợi đến thứ Tư thì các cửa sổ mới được thay thế.) => Đáp án D (Để thông báo với nhân viên về sự chậm trễ) là đáp án đúng",
            },
            {
              id: "p1e10q8",
              question: "What will Mr. Howard\'s report be about?",
              options: [
                "Research results",
                "Industrial pollution",
                "Local news",
                "New laws",
              ],
              correct: 3,
              explanation:
                "Bài báo cáo của ông Howard sẽ về cái gì? Following Mr. Bosley, we\'ll be joined by Henry Howard with a report on new environmental protection laws passed by the government last week. He\'ll explain the new laws and how they will affect local industries. (Sau ông Bosley sẽ là sự xuất hiện của Henry Howard với một bài báo cáo về luật bảo vệ môi trường mới được chính phủ thông qua tuần trước. Ông ấy sẽ giải thích luật mới và chúng ảnh hưởng đến các ngành công nghiệp địa phương như thế nào.) => Đáp án D (Những luật mới) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e11",
          label: "Bai 11",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-11.mp3",
          transcript:
            "Vivian English Center listening comprehension. In this section of the test you will have an opportunity to demonstrate your ability to understand conversations and talks in English. There are three parts in this section with special directions for each part. answer all the questions on the basis of what is stated or implied by the speakers in the recording. There will be time for you to read the instructions and you will have a chance to check your work. the recording will be played once only. at the end of the test you will be given seven minutes to transfer your answers to an answer sheet. Now turn to part 1 Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. 100Now, let’s listen to an example. On the recording, you will hear: Hello. This is the travel agency returning your call. You left a message about the holiday you’ve booked, asking which meals are included in the cost during your stay at Sunny Hotel. Lunch and dinner are free but if you wish to have breakfast in the hotel, you will need to pay an extra amount of money, depending on what you order. Let me know if I can help you with any other information. Goodbye. On the test book, you will read: Which meal is NOT included in the price of the holiday? A. Breakfast B. Lunch C. Dinner D. All The correct answer is A. Breakfast. We are ready to start. First, you have sometime to look at question 1 to 8. Now listen carefully an answer question 1 to 8. Question 1. Next on this evening\'s news is the rising price of gas and what consumers can do to save money. Experts say it is important that your vehicles are in good running condition. So, if you\'re serious about saving money on gas, regularly check your engine oil and filter. Question 2. On your right, you will see the old train station. The building will be turned into a museum this year. The station is famous for its beautiful views of the river. Next, we will go to City Hall where you will have 20 minutes to take photographs. Question 3. Hello Mr. Ali, this is Matthew Boyd calling from Isla Bella Restaurant. I just wanted to know if you will be attending our grand opening at 8 o\'clock on August 2. I called earlier and your wife mentioned that you might not be coming. I do hope you can make it, as we will be serving a full dinner cooked by our new chef. Please call me as soon as possible to let me know whether or not you are coming so that we can arrange a table for you. Question 4. Good afternoon. Thanks for coming to the meeting this morning. I have a few announcements. First, the director will be leaving tomorrow for Berlin and won\'t be back until next Tuesday. Also, our project is nearly two weeks ahead  of schedule, thanks to your hard work. We still have a lot to do, but I am pleased with our progress. One last thing: please think of some ideas for our presentation next month. We will meet next week to discuss them. Question 5. Are you tired of drinking the same coffee at the office every day? Then try Javacup\'s new instant coffees! Javacup has various flavors, from vanilla to chocolate, and is ready in seconds, just by adding hot water. You can find Javacup at your local supermarket. Question 6. Good evening, everyone. We have all gathered to honor Antonia Grimaldi, who will be retiring after 30 years of service at our company. Ms. Grimaldi started out at the Grand Imperial Hotel as a receptionist and rose to become our director for the past 10 years. Ms. Grimaldi will be remembered for her kindness and hard work. We will miss working with her and are thankful for her 30 years of dedication to the company. Ms. Grimaldi will now say a few words before dinner is served. Question 7. Now for a look at the weather. We expect excessive winds starting Thursday morning and continuing until Friday. Temperatures will remain lower than usual until the weekend. Local weather experts say there is a slight chance that the winds could develop into a hurricane. They are asking all local residents to stay up to date on the status of the storm. But there is good news for the weekend. Clear skies and temperatures reaching up to24 degrees Celsius are forecast for Saturday and Sunday. Stay tuned for sports, coming up after this break. Question 8. Welcome to the Reginald Museum of History. Our tour today will focus on artifacts from the 14th century. These objects were collected/ from sites in Northern England. Following our tour, please feel free to visit our gift shop, located next to the museum\'s main entrance.",
          questions: [
            {
              id: "p1e11q1",
              question: "What should customers do to save money?",
              options: [
                "reduce gas price",
                "buy new vehicles",
                "check your vehicles regularly",
                "change the gas suppliers",
              ],
              correct: 2,
              explanation:
                "Khách hàng nên làm gì để tiết kiệm tiền? So, if you\'re serious about saving money on gas, regularly check your engine oil and filter. (Vì vậy, nếu bạn nghiêm túc về việc tiết kiệm tiền xăng, hãy thường xuyên kiểm tra dầu và bộ lọc động cơ của bạn.) => Đáp án C (kiểm tra phương tiện của bạn thường xuyên) là đáp án đúng",
            },
            {
              id: "p1e11q2",
              question: "What will the tourists visit at last?",
              options: [
                "the railway station",
                "the museum",
                "the river",
                "the City Hall",
              ],
              correct: 3,
              explanation:
                "Du khách sẽ thăm quan gì cuối cùng? On your right, you will see the old train station. The building will be turned into a museum this year. The station is famous for its beautiful views of the river. Next, we will go to City Hall where you will have 20 minutes to take photographs. (Ở phía bên phải của bạn, bạn sẽ thấy ga xe lửa cũ. Tòa nhà sẽ trở thành một bảo tàng trong năm nay. Nhà ga nổi tiếng với tầm nhìn tuyệt đẹp ra dòng sông. Tiếp theo, chúng ta sẽ đi đến City Hall, nơi bạn sẽ có 20 phút để chụp ảnh.) => Đáp án D đúng",
            },
            {
              id: "p1e11q3",
              question: "What does the caller ask Mr. Ali to do?",
              options: [
                "Return a call",
                "Reserve a table",
                "Arrange an event",
                "Contact the chef",
              ],
              correct: 0,
              explanation:
                "Người gọi yêu cầu ông Ali làm gì? Please call me as soon as possible to let me know whether or not you are coming so that we can arrange a table for you. (Hãy gọi cho tôi càng sớm càng tốt để cho tôi biết liệu ông có đến hay không để chúng tôi có thể sắp xếp bàn cho ông.) => Đáp án A (Gọi lại) là đáp án đúng",
            },
            {
              id: "p1e11q4",
              question: "What is the purpose of the announcement?",
              options: [
                "To announce a new director",
                "To request work schedules",
                "To provide information",
                "To set a new deadline",
              ],
              correct: 3,
              explanation:
                "Mục đích của thông báo là gì? One last thing: please think of some ideas for our presentation next month. We will meet next week to discuss them. (Điều cuối cùng đó là: hãy suy nghĩ về một số ý tưởng cho bài thuyết trình của chúng ta vào tháng tới. Chúng ta sẽ gặp nhau vào tuần tới để thảo luận về chúng.) => Đáp án D đúng",
            },
            {
              id: "p1e11q5",
              question: "What is special about the product?",
              options: [
                "has various flavours",
                "has low price",
                "has vanilla flavour",
                "has chocolate flavour",
              ],
              correct: 0,
              explanation:
                "Sản phẩm mới có gì đặc biệt? Then try Javacup\'s new instant coffees! Javacup has various flavors, from vanilla to chocolate… (Hãy thử cà phê hòa tan mới của Javacup! Javacup có nhiều hương vị khác nhau, từ vani đến sô cô la…) => Đáp án A (có nhiều hương vị) là đáp án đúng",
            },
            {
              id: "p1e11q6",
              question: "What is the purpose of this talk?",
              options: [
                "To introduce a guest speaker",
                "To say goodbye to a colleague",
                "To present an award to an employee",
                "To welcome a new director",
              ],
              correct: 1,
              explanation:
                "Mục đích của buổi nói chuyện là gì? Good evening, everyone. We have all gathered to honor Antonia Grimaldi, who will be retiring after 30 years of service at our company. Ms. Grimaldi started out at the Grand Imperial Hotel as a receptionist and rose to become our director for the past 10 years. Ms. Grimaldi will be remembered for her kindness and hard work. We will miss working with her and are thankful for her 30 years of dedication to the company. Ms. Grimaldi will now say a few words before dinner is served. (Chào buổi tối, mọi người. Chúng ta cùng ở đây để thể hiện sự kính trọng với Antonia Grimaldi, người sẽ nghỉ hưu sau 30 năm phục vụ tại công ty chúng ta. Bà Grimaldi bắt đầu làm việc ở Khách sạn Grand Imperial với tư cách nhân viên lễ tân và đã trở thành giám đốc của chúng ta trong 10 năm qua. Bà Grimaldi sẽ được nhớ đến vì lòng tốt và sự làm việc chăm chỉ của mình. Chúng ta sẽ nhớ quãng thời gian làm việc với bà ấy và biết ơn bà đã cống hiến 30 năm cho công ty. Bà Grimaldi bây giờ sẽ nói vài lời trước khi bữa tối được phục vụ.) => Đáp án B (Chào tạm biệt một đồng nghiệp) là đáp án đúng",
            },
            {
              id: "p1e11q7",
              question:
                "According to the report, what is unusual about the current weather?",
              options: [
                "Low temperatures",
                "Rainfall",
                "Thunderstorms",
                "Cloudy skies",
              ],
              correct: 0,
              explanation:
                "Theo bài báo cáo, điều gì không như bình thường về thời tiết hiện nay? Temperatures will remain lower than usual until the weekend. (Nhiệt độ sẽ thấp hơn bình thường cho đến cuối tuần) => Đáp án A (Nhiệt độ thấp) là đáp án đúng",
            },
            {
              id: "p1e11q8",
              question: "What are true about the artifacts?",
              options: [
                "They dated back to the 16th century",
                "They were collected from England",
                "They can be bought in the gift shop",
                "They can be bought at the main entrance",
              ],
              correct: 1,
              explanation:
                "Có điều gì đúng về các hiện vật? Our tour today will focus on artifacts from the 14th century. These objects were collected from sites in Northern England. (Chuyến tham quan của chúng ta hôm nay sẽ tập trung vào các hiện vật từ thế kỷ 14. Những thứ này được thu thập từ những nơi ở miền Bắc nước Anh.) => Đáp án B (Chúng được thu thập từ Anh) là đáp án đúng",
            },
          ],
        },
        {
          id: "p1e12",
          label: "Bai 12",
          audio: "listenning/LISTENING-P1/Ph%E1%BA%A7n-1-Test-12.mp3",
          transcript:
            "Vivian English Center listening comprehension. In this section of the test you will have an opportunity to demonstrate your ability to understand conversations and talks in English. There are three parts in this section with special directions for each part. answer all the questions on the basis of what is stated or implied by the speakers in the recording. There will be time for you to read the instructions and you will have a chance to check your work. the recording will be played once only. at the end of the test you will be given seven minutes to transfer your answers to an answer sheet. Now turn to part 1 Part 1: Directions In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question choose the right answer A, B, C or D. Then, on the answer sheet find the 104number of the question and fill in the space that corresponds to the letter of the answer that you have chosen. Now, let’s listen to an example. On the recording, you will hear: Hello. This is the travel agency returning your call. You left a message about the holiday you’ve booked, asking which meals are included in the cost during your stay at Sunny Hotel. Lunch and dinner are free but if you wish to have breakfast in the hotel, you will need to pay an extra amount of money, depending on what you order. Let me know if I can help you with any other information. Goodbye. On the test book, you will read: Which meal is NOT included in the price of the holiday? A. Breakfast B. Lunch C. Dinner D. All The correct answer is A. Breakfast. We are ready to start. First, you have sometime to look at question 1 to 8. Now listen carefully an answer question 1 to 8. Question 1. You\'re listening to the morning traffic report on J-49. No congestion is reported in the downtown area. Commuters will also be happy to know that the Port Smith Bridge will reopen tomorrow morning, following 2 months of repairs. Question 2. Good afternoon. Thanks for coming to the meeting this morning. I have a few announcements. First, the director will be leaving tomorrow for Berlin and won\'t be back until next Tuesday. Also, our project is nearly two weeks ahead of schedule, thanks to your hard work. We still have a lot to do, but I am pleased with our progress. One last thing: please think of some ideas for our presentation next month. We will meet next week to discuss them. Question 3. This morning, we’ll be talking to Dr. Russell Johnson, a professor of history at Dale University. Dr. Johnson is an expert in ancient building techniques and he\'s the winner of this year\'s Gailling Award for his book, The Development of Pyramids. Question 4. Snowstorms are expected this afternoon, continuing through tomorrow. Temperatures are also expected to drop dramatically overnight. Roads  may become quite slippery, so please drive carefully. Coming up next is the local news with Amy Howard. Question 5. This is Andrea Martin reporting for KG-98 news. Local residents are feeling the effects of the rising cost of natural gas this winter. Many people are trying to find alternate methods of heating their homes because of the expense of gas. City officials report that the cost of natural gas has risen by nearly 20 percent in the past year. Energy experts say that the best way people can save on the cost of heating their homes is to make sure their houses are energy efficient. Question 6. Ms. Austen, this is George calling from Sun Valley Computer Repairs. I wanted to let you know that the repairs on your computer have been completed. You can drop by our store anytime before 5:00 this evening to pick it up. However, did find one small problem with your computer that we need to discuss the anti-virus software on your computer is out of date and I suggest you let us install the newest version. I have a meeting this morning, so I will not be back until after lunch. Please call me sometime this afternoon and let me know if you would like us to go ahead and install the new anti-virus. Question 7. On today\'s show, we\'ll be speaking with Dr. Mark Hamid, a director of the Northshore Medical Center. He\'ll talk about changes/in the medical industry over the past years. He\'ll also discuss his opinions of medical coverage in this country. Question 8. It’s 7 o\'clock and this is the morning traffic report on WKPR radio. The continuing snowstorm has caused a lot of traffic congestion this morning. Traffic has stopped completely on Pandosy Avenue, so take Gershmar Road if you’re going to the city center. The transportation department reports that they are working on clearing the snow but because of the congestion, progress is slow. The storm is expected to continue until tomorrow afternoon, so we don’t think the conditions will better anytime soon. Stay tuned for our next traffic report at 7:30.",
          questions: [
            {
              id: "p1e12q1",
              question: "According to the report, what will happen tomorrow?",
              options: [
                "the reopening of a bridge",
                "traffic congestion",
                "the repair of a bridge",
                "road restriction",
              ],
              correct: 0,
              explanation:
                "Theo bài báo cáo, điều gì sẽ xảy ra vào ngày mai? Commuters will also be happy to know that the Port Smith Bridge will reopen tomorrow morning, following 2 months of repairs. (Người tham gia giao thông sẽ vui mừng khi biết rằng cầu Port Smith sẽ mở lại vào sáng mai sau 2 tháng sửa chữa.) => Đáp án A đúng",
            },
            {
              id: "p1e12q2",
              question: "What are employees asked to give? 2",
              options: [
                "Progress reports",
                "A list of announcements",
                "Vacation schedules",
                "Presentation ideas",
              ],
              correct: 3,
              explanation:
                "Nhân viên được yêu cầu đưa ra điều gì? One last thing: please think of some ideas for our presentation next month. (Điều cuối cùng đó là hãy suy nghĩ về một số ý tưởng cho bài thuyết trình của chúng ta vào tháng tới.) => Đáp án D (Ý tưởng thuyết trình) là đáp án đúng",
            },
            {
              id: "p1e12q3",
              question: "What is true about Dr. Johnson?",
              options: [
                "He is a professor of Literature",
                "He designed ancient buildings.",
                "He got this year\'s award.",
                "He wrote books about literature",
              ],
              correct: 2,
              explanation:
                "Điều gì đúng về Tiến sĩ Russell Johnson? Dr. Johnson is an expert in ancient building techniques and he\'s the winner of this year\'s Gailling Award for his book, The Development of Pyramids. (Tiến sĩ Johnson là một chuyên gia về kỹ thuật xây dựng cổ đại và ông là người chiến thắng của giải thưởng Gailling năm nay cho cuốn sách của mình, The Development of Pyramids.) => Đáp án C (Ông ấy giành được giải thưởng của năm nay) là đáp án đúng",
            },
            {
              id: "p1e12q4",
              question: "What does the speaker advise people to do tomorrow?",
              options: [
                "Wear warm clothes",
                "Drive carefully",
                "Stay at home",
                "Watch the local news",
              ],
              correct: 1,
              explanation:
                "Phát thanh viên khuyên mọi người làm gì vào ngày mai? Roads may become quite slippery, so please drive carefully. (Những con đường có thể trở nên khá trơn vì vậy hãy lái xe cẩn thận.) => Đáp án B đúng",
            },
            {
              id: "p1e12q5",
              question: "What is this news report about?",
              options: [
                "A stock market forecast",
                "Building construction",
                "Increasing gas costs",
                "Office maintenance",
              ],
              correct: 2,
              explanation:
                "Bản tin này nói về cái gì? This is Andrea Martin reporting for KG-98 news. Local residents are feeling the effects of the rising cost of natural gas this winter. Many people are trying to find alternate methods of heating their homes because of the expense of gas. City officials report that the cost of natural gas has risen by nearly 20 percent in the past year. (Tôi là Andrea Martin đang tường thuật về bản tin KG-98. Người dân địa phương đang cảm nhận thấy ảnh hưởng của việc tăng giá khí tự nhiên trong mùa đông này. Nhiều người đang cố gắng tìm phương pháp thay thế để sưởi ấm nhà của mình vì chi phí của khí đốt. Các quan chức thành phố báo cáo rằng giá khí tự nhiên đã tăng gần 20% trong năm qua.) => Đáp án C (Giá khí đốt tăng) là đáp án đúng",
            },
            {
              id: "p1e12q6",
              question: "When will George attend a meeting?",
              options: [
                "In the morning",
                "At noon",
                "In the afternoon",
                "In the evening",
              ],
              correct: 0,
              explanation:
                "Geogre sẽ có cuộc hẹn vào lúc nào? I have a meeting this morning, so I will not be back until after lunch.  (Tôi có một cuộc hẹn vào sáng nay, vì vậy tôi sẽ không trở lại cho đến sau bữa trưa.) => Đáp án A đúng",
            },
            {
              id: "p1e12q7",
              question: "What is the topic of the show?",
              options: [
                "Advice about changes in health",
                "Changes in medical industry",
                "Medical industry and its coverage",
                "How to improve health",
              ],
              correct: 2,
              explanation:
                "Chủ đề của buổi diễn là gì? He\'ll talk about changes in the medical industry over the past years. He\'ll also discuss his opinions of medical coverage in this country. (Anh ấy sẽ nói về những thay đổi trong ngành y tế trong những năm qua. Anh ấy cũng sẽ thảo luận ý kiến của mình về bảo hiểm y tế ở đất nước này). => Đáp án C đúng",
            },
            {
              id: "p1e12q8",
              question: "According to the report, what will happen tomorrow?",
              options: [
                "the reopening of a bridge",
                "traffic congestion",
                "the repair of a bridge",
                "road restrictionPART 2",
              ],
              correct: 1,
              explanation:
                "Theo bài báo cáo, điều gì sẽ xảy ra vào ngày mai? The continuing snowstorm has caused a lot of traffic congestion this morning. (Cơn bão tuyết liên tục đã gây ra rất nhiều tắc nghẽn giao thông vào sáng nay.) =>Đáp án B đúng",
            },
          ],
        },
      ],
    },
    // ========================================================================
    // PART 2: Conversations (37 bai)
    // ========================================================================
    {
      id: "part2",
      title: "Part 2: Conversations (37 bai)",
      description:
        "Ban se nghe 37 doan hoi thoai ngan giua 2 nguoi. Moi doan hoi thoai co 3-4 cau hoi. Chon phuong an dung nhat.",
      exercises: [
        {
          id: "p2e1",
          label: "Bai 1",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 01.mp3",
          transcript:
            "M Hey Julie, what\'s up? W Hi, Brian. Taking a break from studying. I\'m surfing the Internet for an MP3 player. M Do you like the iPod? W Yes, but I need a really small one. M Oh, it\'s small! W Really? Someone told me it holds 5,000 songs! M It\'s 3.6 inches tall and two inches wide. I have one. W What\'s that in centimeters? M The math textbook says one inch is 2.54 centimeters. W OK, so first I need to multiply 3.6 by 2.54. M Here! Use my calculator. W Thanks! OK... it\'s 9.1 centimeterstall and 5 centimeters wide. Just what I need!",
          speakerLines: [
            { speaker: "Man", text: "Hey Julie, what\'s up?" },
            {
              speaker: "Woman",
              text: "Hi, Brian. Taking a break from studying. I\'m surfing the Internet for an",
            },
            { speaker: "Man", text: "P3 player." },
            { speaker: "Man", text: "Do you like the iPod?" },
            { speaker: "Woman", text: "Yes, but I need a really small one." },
            { speaker: "Man", text: "Oh, it\'s small!" },
            {
              speaker: "Woman",
              text: "Really? Someone told me it holds 5,000 songs!",
            },
            {
              speaker: "Man",
              text: "It\'s 3.6 inches tall and two inches wide. I have one.",
            },
            { speaker: "Woman", text: "What\'s that in centimeters?" },
            {
              speaker: "Man",
              text: "The math textbook says one inch is 2.54 centimeters.",
            },
            {
              speaker: "Woman",
              text: "OK, so first I need to multiply 3.6 by 2.54.",
            },
            { speaker: "Man", text: "Here! Use my calculator." },
            {
              speaker: "Woman",
              text: "Thanks! OK... it\'s 9.1 centimeterstall and 5 centimeters wide. Just what I",
            },
          ],
          questions: [
            {
              id: "p2e1q1",
              question: "What is the topic of the conversation?",
              options: [
                "Taking measurements",
                "Taking a break",
                "Looking on the Internet",
                "Finding a small MP3 player",
              ],
              correct: 3,
              explanation:
                "I\'m surfing the Internet for an MP3 player. (Mình đang lướt mạng để tìm thông tin về cái máy nghe nhạc MP3.)",
            },
            {
              id: "p2e1q2",
              question: "What is the man\'s main point?",
              options: [
                "The device is too small.",
                "The device is too big.",
                "The woman shouldn\'t get the device.",
                "The device is small enough.",
              ],
              correct: 3,
              explanation:
                "W: I need a really small one. M: Oh, it\'s small! W: It\'s 9.1 centimeters tall and 5 centimeters wide. Just what I need! (W: Mình cần tìm một cái máy nghe nhạc phải thật nhỏ gọn cơ. (Ồ, cái mình gợi ý rất nhỏ đấy!) ……….. W: Nó dài 9,1 cm và rộng 5 cm. Đúng kích cỡ mình cần!)",
            },
            {
              id: "p2e1q3",
              question: "What does the device do?",
              options: [
                "Reads books",
                "Searches the Internet",
                "Plays music",
                "Solves math problems",
              ],
              correct: 2,
              explanation:
                "Someone told me it holds 5,000 songs! (Ai đó đã nói với mình rằng nó lưu trữ được 5000 bài hát.)",
            },
          ],
        },
        {
          id: "p2e2",
          label: "Bai 2",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 02.mp3",
          transcript:
            "W Hey Alex. How\'s it going? M OK. I just finished math class. Man, I hate math! W Why? It\'s easy! M Yeah, right W I\'ve got a secret that helps me in math class Wanna know what it is?  M OK. But it probably won\'t help me. W Listen and try it. Math is too abstract, right? Well, try to make it real for yourself. My secret is I think about numbers in math as if they were money. M Huh? W Yeah. I have a hard time picturing numbers. But if I see the numbers as dollars and cents then I can see them clearly in my head. M Really?! W Yeah. For example, if the teacher says \"What is 853 minus 727\". I think of eight dollars and fifty-three cents minus seven dollars and twenty-seven cents. The answer is one dollar and 26 cents one twenty-six. It\'s easy! M Hey that\'s awesome! I’ll try it tomorrow. Thanks. W No problem. See you at the basketball game tonight. M See you.",
          speakerLines: [
            { speaker: "Woman", text: "Hey Alex. How\'s it going?" },
            {
              speaker: "Man",
              text: "OK. I just finished math class. Man, I hate math!",
            },
            { speaker: "Woman", text: "Why? It\'s easy!" },
            { speaker: "Man", text: "Yeah, right" },
            {
              speaker: "Woman",
              text: "I\'ve got a secret that helps me in math class Wanna know what it is? ",
            },
            { speaker: "Man", text: "OK. But it probably won\'t help me." },
            {
              speaker: "Woman",
              text: "Listen and try it. Math is too abstract, right? Well, try to make it real for",
            },
            { speaker: "Man", text: "Huh?" },
            {
              speaker: "Woman",
              text: "Yeah. I have a hard time picturing numbers. But if I see the numbers as",
            },
            { speaker: "Man", text: "Really?!" },
            {
              speaker: "Woman",
              text: 'Yeah. For example, if the teacher says "What is 853 minus 727". I think of',
            },
            {
              speaker: "Man",
              text: "Hey that\'s awesome! I’ll try it tomorrow. Thanks.",
            },
            {
              speaker: "Woman",
              text: "No problem. See you at the basketball game tonight.",
            },
            { speaker: "Man", text: "See you." },
          ],
          questions: [
            {
              id: "p2e2q1",
              question: "What is the man\'s problem?",
              options: [
                "He doesn’t like math.",
                "He is not very good at basketball.",
                "He hates school.",
                "He needs help with English.",
              ],
              correct: 0,
              explanation:
                "M:I just finished math class. Man, I hate math! (Mình vừa mới học xong lớp Toán. Trời ơi, mình ghét môn Toán quá!)",
            },
            {
              id: "p2e2q2",
              question: "What is the woman\'s main point?",
              options: [
                "Math is difficult.",
                "School is easy.",
                "Try something new to make math easier.",
                "Change your English class.",
              ],
              correct: 2,
              explanation:
                "Listen and try it. Math is too abstract, right? Well, try to make it real for yourself. (Nghe mình thử cách này xem sao. Môn Toán quá trừu tượng phải không nào? Vậy hãy thử khiến nó gần gũi hơn với cậu đi.)",
            },
            {
              id: "p2e2q3",
              question: "What does the woman advise the man to do? 23",
              options: [
                "Imagine something abstract as real",
                "Picture something entertaining in his mind",
                "Give up writing down every word in class",
                "Use pictures to represent words",
              ],
              correct: 0,
              explanation:
                "My secret is I think about numbers in math as if they were money….I have a hard time picturing numbers. But if I see the numbers as dollars and cents, then I can see them clearly in my head. (Mẹo học môn Toán của mình là liên tưởng các con số trong môn Toán với các mệnh giá tiền. Ban đầu mình cũng thấy việc hình dung các con số rất khó khăn. Nhưng nếu mình hình dung chúng như những đồng đô-la hay xu thì mình sẽ hình dung ra chúng rõ ràng hơn trong đầu.)",
            },
          ],
        },
        {
          id: "p2e3",
          label: "Bai 3",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 03.mp3",
          transcript:
            "W I really like art! Especially paintings. M Really? Do you have a favorite one? W Yes, Mona Lisa by Leonardo da Vinci. M What do you like about it? W Her smile. If you look closely, it seems she\'s not smiling at all. Look again, she\'s smiling! So many artists try to copy that smile. M It must be hard to paint something so beautiful. W Did you ever notice that she doesn\'t have any eyebrows?  M Really? No! I never noticed, I wonder why? W Girls in that time shaved their eyebrows. I just read it in our art history textbook. M Hey! That\'s cool. Nowadays, she\'d have an eyebrow ring!",
          speakerLines: [
            {
              speaker: "Woman",
              text: "I really like art! Especially paintings.",
            },
            { speaker: "Man", text: "Really? Do you have a favorite one?" },
            { speaker: "Woman", text: "Yes, Mona Lisa by Leonardo da Vinci." },
            { speaker: "Man", text: "What do you like about it?" },
            {
              speaker: "Woman",
              text: "Her smile. If you look closely, it seems she\'s not smiling at all. Look again,",
            },
            {
              speaker: "Man",
              text: "It must be hard to paint something so beautiful.",
            },
            {
              speaker: "Woman",
              text: "Did you ever notice that she doesn\'t have any eyebrows? ",
            },
            {
              speaker: "Man",
              text: "Really? No! I never noticed, I wonder why?",
            },
            {
              speaker: "Woman",
              text: "Girls in that time shaved their eyebrows. I just read it in our art history",
            },
            {
              speaker: "Man",
              text: "Hey! That\'s cool. Nowadays, she\'d have an eyebrow ring!",
            },
          ],
          questions: [
            {
              id: "p2e3q1",
              question: "What is the woman’s main point?",
              options: [
                "Mona Lisa is a great painting.",
                "Da Vinci is the greatest artist.",
                "Eyebrows always change.",
                "Art history is important.",
              ],
              correct: 0,
              explanation:
                "M: What do you like about it? (Cậu thích điểm gì ở bức tranh đó?) W: Her smile. If you look closely, it seems she\'s not smiling at all. Look again, she\'s smiling! So many artists try to copy that smile. (Mình thích nụ cười của cô ấy. Nếu cậu nhìn gần, cậu sẽ thấy dường như không phải cô ấy đang cười. Nhưng nếu cậu nhìn lại thì cậu lại thấy hóa ra cô ấy đang cười. Vì thế nên rất nhiều họa sĩ đã vẽ lại nụ cười đó.) M: It must be hard to paint something so beautiful. (Hẳn là rất khó để vẽ một tác phẩm đẹp như vậy.)",
            },
            {
              id: "p2e3q2",
              question:
                "Why do so many artists try to copy Mona Lisa\'s smile?",
              options: [
                "It\'s hard to do.",
                "It\'s beautiful.",
                "It\'s difficult to understand.",
                "It\'s perfect.",
              ],
              correct: 1,
              explanation:
                "W: So many artists try to copy that smile. (Vì thế nên rất nhiều họa sĩ đã vẽ lại nụ cười đó.) M: It must be hard to paint something so beautiful. (Hẳn là rất khó để vẽ một tác phẩm đẹp như vậy.)",
            },
            {
              id: "p2e3q3",
              question: "What does the man imply about Mona Lisa?",
              options: [
                "He has never heard of Mona Lisa.",
                "He does not think the painting is very impressive.",
                "He is interested in the facts the woman gives about Mona Lisa.",
                "He has read many books and articles about the painting.",
              ],
              correct: 2,
              explanation:
                "W: Did you ever notice that she doesn\'t have any eyebrows? (Cậu có từng để ý rằng cô ấy không hề có lông mày không?) M: Really? No! I never noticed, I wonder why? (Thật vậy sao? Chưa! Mình chưa để ý, giờ mình đang thắc mắc tại sao đây!) W: Girls in that time shaved their eyebrowvvs. I just read it in our art history textbook. (Đó là vì vào thời ấy, phụ nữ thường cạo lông mày của mình. Mình vừa mới đọc được thông tin đó trong sách giáo khoa môn lịch sử mỹ thuật.) M: Hey! That\'s cool… (Chà! Nghe thú vị đấy!)",
            },
          ],
        },
        {
          id: "p2e4",
          label: "Bai 4",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 04.mp3",
          transcript:
            "M Have you heard about Mexican turtles disappearing? W Yes. It’s because they lay their eggs on the beach, right? M Yeah, and people eat the eggs. But my professor said there\'s a plan to save them. W What is it? M I don\'t know, but he gave us a phone number. W Let\'s call! M OK, here goes... W Hello, Environmental Protection Hotline. How may I help you?  M I\'d like to find out about the program to save Mexican turtles. W Yes, of course. I can send you something to read or you can look at our website, www.enviro.com. M Thanks! I’ll look at the website. W Thanks for calling!",
          speakerLines: [
            {
              speaker: "Man",
              text: "Have you heard about Mexican turtles disappearing?",
            },
            {
              speaker: "Woman",
              text: "Yes. It’s because they lay their eggs on the beach, right?",
            },
            {
              speaker: "Man",
              text: "Yeah, and people eat the eggs. But my professor said there\'s a plan to save",
            },
            { speaker: "Woman", text: "What is it?" },
            {
              speaker: "Man",
              text: "I don\'t know, but he gave us a phone number.",
            },
            { speaker: "Woman", text: "Let\'s call!" },
            { speaker: "Man", text: "OK, here goes..." },
            {
              speaker: "Woman",
              text: "Hello, Environmental Protection Hotline. How may I help you? ",
            },
            {
              speaker: "Man",
              text: "I\'d like to find out about the program to save Mexican turtles.",
            },
            {
              speaker: "Woman",
              text: "Yes, of course. I can send you something to read or you can look at our",
            },
            { speaker: "Man", text: "Thanks! I’ll look at the website." },
            { speaker: "Woman", text: "Thanks for calling!" },
          ],
          questions: [
            {
              id: "p2e4q1",
              question: "What is the telephone operator\'s main point?",
              options: [
                "She can give the man information.",
                "All of the phone lines are busy at the moment.",
                "The Service is not free.",
                "The number is only for emergencies.",
              ],
              correct: 0,
              explanation:
                "W: I can send you something to read or you can look at our website, www.enviro.com. (Mình có thể gửi cho bạn một số tài liệu để đọc hoặc bạn có thể tìm hiểu trên địa chỉ webside www.enviro.com.)",
            },
            {
              id: "p2e4q2",
              question: "Why does the man call the number?",
              options: [
                "To add his name to the list",
                "To volunteer",
                "To get information",
                "To reserve a ticket",
              ],
              correct: 2,
              explanation:
                "M: I\'d like to find out about the program to save Mexican turtles. (Mình muốn tìm một số thông tin về chương trình cứu trợ rùa Mexico.)",
            },
          ],
        },
        {
          id: "p2e5",
          label: "Bai 5",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 05.mp3",
          transcript:
            "M I’d like to check out this book, please. W May I please see your student ID card? M I’m sorry, ma’am, it’s been stolen. It was in my wallet, which was stolen. W I’m not allowed to check out any books for you without it. M Oh, that’s great! What should I do now? W You can download the form for a new student ID card from the computer. Fill its out and take it over to the Student Center. Actually, they can also give you the form there. M Thanks. I don’t think I’ll bother. Doesn’t it cost $10.00? W It does. You might just want to do it, though. You won’t be allowed to sit for the exams without it. M All right, I guess I’ll have to. I suppose they’ll want a passport photo too. W Yes, and a copy of your identification- drive’s license or passport. M All right, I’ll go over there. Thanks ma’am. W You’ll be glad to have it. Good luck!",
          speakerLines: [
            {
              speaker: "Man",
              text: "I’d like to check out this book, please.",
            },
            {
              speaker: "Woman",
              text: "May I please see your student ID card?",
            },
            {
              speaker: "Man",
              text: "I’m sorry, ma’am, it’s been stolen. It was in my wallet, which was stolen.",
            },
            {
              speaker: "Woman",
              text: "I’m not allowed to check out any books for you without it.",
            },
            { speaker: "Man", text: "Oh, that’s great! What should I do now?" },
            {
              speaker: "Woman",
              text: "You can download the form for a new student ID card from the computer.",
            },
            {
              speaker: "Man",
              text: "Thanks. I don’t think I’ll bother. Doesn’t it cost $10.00?",
            },
            {
              speaker: "Woman",
              text: "It does. You might just want to do it, though. You won’t be allowed to sit",
            },
            {
              speaker: "Man",
              text: "All right, I guess I’ll have to. I suppose they’ll want a passport photo too.",
            },
            {
              speaker: "Woman",
              text: "Yes, and a copy of your identification- drive’s license or passport.",
            },
            {
              speaker: "Man",
              text: "All right, I’ll go over there. Thanks ma’am.",
            },
            { speaker: "Woman", text: "You’ll be glad to have it. Good luck!" },
          ],
          questions: [
            {
              id: "p2e5q1",
              question: "Where is the man\'s library card?",
              options: [
                "He does not know.",
                "It is in his dorm room.",
                "His friend has it.",
                "He never had one.",
              ],
              correct: 0,
              explanation:
                "W: May I please see your student ID card? (Đưa cô xem thẻ sinh viên của em nào!) (thẻ sinh viên có chức năng của thẻ thư viện) M: I\'m sorry, ma\'am, it\'s been stolen. It was in my wallet, which was stolen. (Em xin lỗi cô, thẻ của em bị mất rồi. Nó nằm trong cái ví bị đánh cắp của em.)",
            },
            {
              id: "p2e5q2",
              question: "Where will the student go?",
              options: [
                "To the police station",
                "To the Help Desk in the library",
                "To his next class",
                "To the Student Center",
              ],
              correct: 3,
              explanation:
                "W: You can download the form for a new student ID card from the computer. Fill it out and take it over to the Student Center. (Em có thể tải mẫu đơn làm lại thẻ sinh viên trên máy tính. Điền vào mẫu đơn đó rồi nộp cho Trung tâm Hỗ trợ Sinh viên.) M: I\'m sorry, ma\'am, it\'s been stolen. It was in my wallet, which was stolen. (Em xin lỗi cô, thẻ của em bị mất rồi. Nó nằm trong cái ví bị đánh cắp của em.)",
            },
            {
              id: "p2e5q3",
              question: "What is the student\'s problem?",
              options: [
                "He failed an exam.",
                "His student ID card was stolen.",
                "His passport is missing.",
                "His driver\'s license is missing.",
              ],
              correct: 1,
              explanation: "",
            },
          ],
        },
        {
          id: "p2e6",
          label: "Bai 6",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 06.mp3",
          transcript:
            "M Come on Holly, we’re going to be late. W For what? M Today’s the day of the parking-space lottery. I want to see if I geta parking space for next year. W What?! You mean if they choose your number, you get a place to park your car? M Yes. Parking is very limited. Only a few students can bring their cars. And freshmen are never allowed to park on campus. W If your number is chosen do you get to park for free? M No. It costs $ a year. W So, you’re hoping to win the privilege of paying money? M Yes. Now, come on!",
          speakerLines: [
            { speaker: "Man", text: "Come on Holly, we’re going to be late." },
            { speaker: "Woman", text: "For what?" },
            {
              speaker: "Man",
              text: "Today’s the day of the parking-space lottery. I want to see if I geta parking",
            },
            {
              speaker: "Woman",
              text: "What?! You mean if they choose your number, you get a place to park your",
            },
            {
              speaker: "Man",
              text: "Yes. Parking is very limited. Only a few students can bring their cars. And",
            },
            {
              speaker: "Woman",
              text: "If your number is chosen do you get to park for free?",
            },
            { speaker: "Man", text: "No. It costs $ a year." },
            {
              speaker: "Woman",
              text: "So, you’re hoping to win the privilege of paying money?",
            },
            { speaker: "Man", text: "Yes. Now, come on!" },
          ],
          questions: [
            {
              id: "p2e6q1",
              question: "What are the people mainly discussing?",
              options: [
                "Biology class",
                "A lottery",
                "Graduation",
                "Transportation",
              ],
              correct: 1,
              explanation:
                "M: Today’s the day of the parking-space lottery. I want to see if I get a parking space for next year. (Hôm nay là ngày công bố kết quả xổ số để giành lấy vé chỗ để xe. Tôi muốn xem liệu tôi có giành được vé chỗ để xe cho năm tới hay không.)",
            },
            {
              id: "p2e6q2",
              question: "Which is true?",
              options: [
                "Parking on campus is free",
                "The woman has a car",
                "All students are allowed to park their car at school",
                "The man wants to drive his car to school",
              ],
              correct: 3,
              explanation:
                "W: What?! You mean if they choose your number, you get a place to park your car? (Cái gì? Có phải ý anh là nếu anh chọn được một con số may mắn thì anh sẽ kiếm được một chỗ để xe.) M: Yes. Parking is very limited. Only a few students can bring their cars. And freshmen are never allowed to park on campus. (Đúng rồi! Chỗ đỗ xe rất là hạn chế. Chỉ một vài học sinh có thể dùng ô tô. Còn sinh viên năm nhất thì không được đậu xe ở trong khuôn viên trường.)",
            },
            {
              id: "p2e6q3",
              question: "What is the main thing that the man wants?",
              options: [
                "To win a parking space",
                "To buy a new car",
                "To have a date with the woman",
                "To get to class on time",
              ],
              correct: 0,
              explanation:
                "W: You’re hoping to win the privilege of paying money? (Anh đang muốn trúng sổ xố để đỗ xe mà không cần trả tiền đúng không?) M: Yes. Now, come on! (Đúng rồi, đi thôi!)",
            },
          ],
        },
        {
          id: "p2e7",
          label: "Bai 7",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 07.mp3",
          transcript:
            "M Hey Lucy. Are you going to watch any of the movies at the film festival? W No, I wasn\'t thinking of it. I have too much homework to do. M Aw that\'s nofun! Can\'t you even take one night off? Your dormitory is so close to the Annenberg Center! It’ll take you five minutes to get there. W Well, maybe I will go to one M How about tomorrow night? I can go then. W What movie is playing? M School of Rock. Have you seen it? W No. What\'s it about? M Well, it\'s a comedy and it\'s really funny It\'s about this guy who\'s really trying to make it as a rock star. He gets kicked out of his band and he really needs money. So he acts like he\'s somebody else to get a teaching job. Then, he tries to turn his class into a rock band. W Sounds pretty crazy! OK, I’ll come see it.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Hey Lucy. Are you going to watch any of the movies at the film festival?",
            },
            {
              speaker: "Woman",
              text: "No, I wasn\'t thinking of it. I have too much homework to do.",
            },
            {
              speaker: "Man",
              text: "Aw that\'s nofun! Can\'t you even take one night off? Your dormitory is so",
            },
            { speaker: "Woman", text: "Well, maybe I will go to one" },
            {
              speaker: "Man",
              text: "How about tomorrow night? I can go then.",
            },
            { speaker: "Woman", text: "What movie is playing?" },
            { speaker: "Man", text: "School of Rock. Have you seen it?" },
            { speaker: "Woman", text: "No. What\'s it about?" },
            {
              speaker: "Man",
              text: "Well, it\'s a comedy and it\'s really funny It\'s about this guy who\'s really",
            },
            {
              speaker: "Woman",
              text: "Sounds pretty crazy! OK, I’ll come see it.",
            },
          ],
          questions: [
            {
              id: "p2e7q1",
              question: "What is the topic of the conversation?",
              options: [
                "Going to a football game",
                "Going to a concert series",
                "Going to a film festival",
                "Going to hear rock music",
              ],
              correct: 2,
              explanation:
                "M: Hey Lucy, are you going to watch any of the movies at the film festival? (Lucy à, cậu xem bộ phim nào trong liên hoan phim lần này chưa?)",
            },
            {
              id: "p2e7q2",
              question: "What is the man\'s main point?",
              options: [
                "That the movie is funny",
                "That the woman should go",
                "That the woman doesn\'t have to go far",
                "That rock music is cool",
              ],
              correct: 2,
              explanation:
                "M: Aw, that\'s no fun! Can\'t you even take one night off. Your dormitory is so close to the Anneberg Centre. It’ll take you five minutes to get there. (Ôi, chẳng vui tí nào! Cậu không thể nghỉ một buổi sao? Kí túc xá ở chỗ cậu rất gần với trung tâm Anneberg đấy. Cậu chỉ mất 5 phút để đến đấy thôi. M: It\'s a comedy and it\'s really funny. (Đó là một bộ phim hài và nó rất vui nhộn.) => Ý chính của người bạn nam là Lucy nên đi xem bộ phim vì 2 lý do: chỗ chiếu phim gần ký túc xá và bộ phim rất đáng xem.",
            },
            {
              id: "p2e7q3",
              question: "What does the man want the woman to do?",
              options: [
                "Not study so much",
                "Go see a film with him",
                "Keep studying",
                "Write about the movie",
              ],
              correct: 0,
              explanation: "Tương tự câu 2",
            },
          ],
        },
        {
          id: "p2e8",
          label: "Bai 8",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 08.mp3",
          transcript:
            "W Hey Joe, where are you going? Are you on your way to class? M No. I\'m on my way to the recreation center to play basketball. Want to come? W I can\'t. I\'m not a member. M If you\'re a full-time student membership is included in your tuition. Do you have your student ID card? W Yeah. Does that mean I can use any part of the rec center?  M Yes. You can use the swimming pool, the gym, the weight room anything you want. All you need to do is show your ID card at the door. W Hey, cool. I’ll come with you.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Hey Joe, where are you going? Are you on your way to class?",
            },
            {
              speaker: "Man",
              text: "No. I\'m on my way to the recreation center to play basketball. Want to",
            },
            { speaker: "Woman", text: "I can\'t. I\'m not a member." },
            {
              speaker: "Man",
              text: "If you\'re a full-time student membership is included in your tuition. Do you",
            },
            {
              speaker: "Woman",
              text: "Yeah. Does that mean I can use any part of the rec center? ",
            },
            {
              speaker: "Man",
              text: "Yes. You can use the swimming pool, the gym, the weight room anything",
            },
            { speaker: "Woman", text: "Hey, cool. I’ll come with you." },
          ],
          questions: [
            {
              id: "p2e8q1",
              question: "What is the topic of the conversation?",
              options: [
                "Using the student recreation centre",
                "Playing basketball",
                "Included tuition fees",
                "Lost ID cards",
              ],
              correct: 0,
              explanation: "Dựa vào thông tin của cả bài",
            },
            {
              id: "p2e8q2",
              question: "What does the woman decide to do?",
              options: [
                "Buy an ID card",
                "Go to the gym with the man",
                "Play basketball in the park",
                "Study in the library",
              ],
              correct: 1,
              explanation:
                "W: Hey, cool. I’ll come with you. (Ồ, hay đấy! Tớ sẽ đi với cậu.)",
            },
            {
              id: "p2e8q3",
              question: "What does the woman need to use the gym?",
              options: [
                "A basketball",
                "Proper shoes",
                "A student ID card",
                "A swimming pool",
              ],
              correct: 2,
              explanation:
                "M: If you\'re a full-time student, membership is included in your tuition. Do you have your student ID card? (Nếu cậu là sinh viên hệ chính quy của nhà trường, thì phí để trở thành thành viên của trung tâm thể thao đã được bao gồm trong học phí rồi. Cậu có thẻ sinh viên không?) W: Yeah. Does that mean I can use any part of the recreation center? (Tớ có. Như vậy nghĩa là tớ có thể sử dụng mọi dịch vụ ở trong trung tâm thể thao đúng không?) M: Yes. You can use the swimming pool, the gym...anything you want. All you need to do is show your ID card at the door. (Đúng rồi! Cậu có thể dùng bể bơi, phòng tập thể hình, …bất cứ dịch vụ nào mà cậu muốn. Cậu chỉ cần đưa ra thẻ sinh viên ở lối vào là được.)",
            },
          ],
        },
        {
          id: "p2e9",
          label: "Bai 9",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 09.mp3",
          transcript:
            "M Hi, Ms. Jansen. Can we keep Romeo and Juliet in our dorm room? W What on Earth...! M They\'re our pet hermit crabs! W Oh, poor crabs! Don\'t you think they\'d be happier on the beach? M Well, at the store they were squished into a little box. We thought they\'d be happier with us. We let them out when we\'re home. We give them baths too! W I see. Do you know what to feed them? M There\'s free Internet information. The Hermit Crab Association. They help crabs in captivity. And we will take them back to a beach someday.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Hi, Ms. Jansen. Can we keep Romeo and Juliet in our dorm room?",
            },
            { speaker: "Woman", text: "What on Earth...!" },
            { speaker: "Man", text: "They\'re our pet hermit crabs!" },
            {
              speaker: "Woman",
              text: "Oh, poor crabs! Don\'t you think they\'d be happier on the beach?",
            },
            {
              speaker: "Man",
              text: "Well, at the store they were squished into a little box. We thought they\'d",
            },
            { speaker: "Woman", text: "I see. Do you know what to feed them?" },
            {
              speaker: "Man",
              text: "There\'s free Internet information. The Hermit Crab Association. They help",
            },
          ],
          questions: [
            {
              id: "p2e9q1",
              question: "Why does the student go to see the woman?",
              options: [
                "To meet her",
                "To talk about a problem",
                "To request some equipment",
                "To ask permission to do something",
              ],
              correct: 3,
              explanation:
                "M: Hi, Ms. Jansen. Can we keep Romeo and Juliet in our dorm room? (Em chào cô Jansen! Cô cho phép bọn em giữ Romeo và Juliet trong phòng ký túc xá của bọn em được không ạ?)2. W: Oh, poor crabs! Don\'t you think they\'d be happier on the beach? (Ôi những con cua tội nghiệp! Các em không nghĩ là chúng sẽ hạnh phúc hơn nếu được sống trong biển sao?)",
            },
            {
              id: "p2e9q2",
              question:
                "Where does the woman suggest the crabs might be happier?",
              options: [
                "At the beach",
                "In a bath",
                "At the store",
                "In a box",
              ],
              correct: 0,
              explanation: "",
            },
          ],
        },
        {
          id: "p2e10",
          label: "Bai 10",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 10.mp3",
          transcript:
            "W I\'m still confused about the lecture today on blood types. M OK. What questions do you have? W Well first the way we classify blood types. We use the letters A, B, and O, right? M That\'s right. There are four different types of blood: A, B, AB, and O. Each person on Earth has one of these types. W And...where do we get our blood types? M They come from both our father and mother. Your blood type could be the same as one of your parents, or completely different. W But everyone\'s blood is red! M Yes, it all looks the same, but it\'s dangerous to mix two different blood types together. If you get hurt and need blood, you have to make sure the new blood is the same type as yours. If it\'s not, you might die. W But didn\'t the professor say there was one type that could mix with any of them? M Yes. That\'s type O",
          speakerLines: [
            {
              speaker: "Woman",
              text: "I\'m still confused about the lecture today on blood types.",
            },
            { speaker: "Man", text: "OK. What questions do you have?" },
            {
              speaker: "Woman",
              text: "Well first the way we classify blood types. We use the letters A, B, and O,",
            },
            {
              speaker: "Man",
              text: "That\'s right. There are four different types of blood: A, B, AB, and O. Each",
            },
            {
              speaker: "Woman",
              text: "And...where do we get our blood types?",
            },
            {
              speaker: "Man",
              text: "They come from both our father and mother. Your blood type could be the",
            },
            { speaker: "Woman", text: "But everyone\'s blood is red!" },
            {
              speaker: "Man",
              text: "Yes, it all looks the same, but it\'s dangerous to mix two different blood",
            },
            {
              speaker: "Woman",
              text: "But didn\'t the professor say there was one type that could mix with any of",
            },
            { speaker: "Man", text: "Yes. That\'s type O" },
          ],
          questions: [
            {
              id: "p2e10q1",
              question: "What are the speakers mainly discussing?",
              options: [
                "A lecture",
                "Things in blood",
                "Types of blood",
                "Colors of blood",
              ],
              correct: 2,
              explanation: "Dựa vào nội dung của cả bài",
            },
            {
              id: "p2e10q2",
              question: "What is the man\'s main point?",
              options: [
                "Blood types are contusing.",
                "He does not know his blood type.",
                "All blood is red.",
                "It\'s dangerous to mix blood types.",
              ],
              correct: 3,
              explanation:
                "M: Yes. it all looks the same, but it\'s dangerous to mix two different blood types together. If you get hurt and need blood, you have to make sure the new blood is the same type as yours. If it’s not, you might die. (Đúng vậy, mặc dù các loại máu nhìn đều giống nhau nhưng sẽ rất nguy hiểm nếu trộn lẫn hai nhóm máu khác nhau vào với nhau. Nếu bạn bị thương và cần máu, bạn phải đảm bảo rằng máu mới cùng loại với bạn. Nếu không cùng loại, thì bạn có thể chết.)",
            },
            {
              id: "p2e10q3",
              question: "What does the woman want to know about blood types?",
              options: [
                "Why A, B, and 0 are used?",
                "Which type can mix with her blood",
                "What the man\'s blood type is",
                "Where people get them",
              ],
              correct: 3,
              explanation:
                "W: And…where do we get our blood types? (Chúng ta sở hữu loại máu nào phụ thuộc vào đâu?)",
            },
          ],
        },
        {
          id: "p2e11",
          label: "Bai 11",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 11.mp3",
          transcript:
            "W Hello, Lance! What can I help you with today?  M I heard there\'s a tutoring center for each department. Can you tell me where it is for the English Department? W Yes! Ours is just next door. M Can I go there right now? W You can, but they might still be at lunch. You know, you’ll have to sign up for an interview first, anyway. You can do that over the Internet, too. M OK. Can you give me the address? W Go to www.pentutoring.info. They’ll get in touch with you within three working days. M What will they send me? W They\'ll send you the tutor\'s name, phone number, email address. Oh, yes, and how much you have to pay per hour. M uh-oh! I don\'t have any money. W That\'s OK. You can get tree tutoring. You\'ll just need to agree to do a three week feedback survey. M That\'s all? W That\'s all! Great! M Thanks! W No problem!",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Hello, Lance! What can I help you with today?",
            },
            {
              speaker: "Man",
              text: "I heard there\'s a tutoring center for each department. Can you tell me where",
            },
            { speaker: "Woman", text: "Yes! Ours is just next door." },
            { speaker: "Man", text: "Can I go there right now?" },
            {
              speaker: "Woman",
              text: "You can, but they might still be at lunch. You know, you’ll have to sign up",
            },
            { speaker: "Man", text: "OK. Can you give me the address?" },
            {
              speaker: "Woman",
              text: "Go to www.pentutoring.info. They’ll get in touch with you within three",
            },
            { speaker: "Man", text: "What will they send me?" },
            {
              speaker: "Woman",
              text: "They\'ll send you the tutor\'s name, phone number, email address. Oh, yes,",
            },
            { speaker: "Man", text: "uh-oh! I don\'t have any money." },
            {
              speaker: "Woman",
              text: "That\'s OK. You can get tree tutoring. You\'ll just need to agree to do a three",
            },
            { speaker: "Man", text: "That\'s all?" },
            { speaker: "Woman", text: "That\'s all! Great!" },
            { speaker: "Man", text: "Thanks!" },
            { speaker: "Woman", text: "No problem!" },
          ],
          questions: [
            {
              id: "p2e11q1",
              question: "What are speakers mainly discussing?",
              options: [
                "Money",
                "Tutoring",
                "Having lunch",
                "Signing up for a class",
              ],
              correct: 1,
              explanation: "Dựa vào nội dung của cả bài",
            },
            {
              id: "p2e11q2",
              question: "What does the secretary tell the student?",
              options: [
                "She gives him a phone number.",
                "She directs him to the classroom.",
                "She says there is no tutoring center.",
                "She tells him where the tutoring center is.",
              ],
              correct: 3,
              explanation:
                "M: I heard there\'s a tutoring center for each department. Can you tell me where it is for the English Department? (Cô ơi, em nghe nói có trung tâm gia sư ở mỗi khoa. Cô có thể chỉ đường đến Khoa Anh được không ạ?) W: Yes! Ours is just next door. (Được chứ, nó nằm ngay kế bên đấy em.)",
            },
            {
              id: "p2e11q3",
              question: "What is the student\'s main point?",
              options: [
                "He needs money",
                "He needs to ask the secretary for an email address",
                "He want to find a tutor",
                "He wants to make an appointment",
              ],
              correct: 2,
              explanation: "Dựa vào nội dung của cả bài",
            },
          ],
        },
        {
          id: "p2e12",
          label: "Bai 12",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 12.mp3",
          transcript:
            "M I\'m interested in your course on Indian culture. Can you tell me about it, please? W Certainly. The course is eight weeks long. There will be a mid-term examination, a final exam, and two essays. M How do you determine the grades? W The final will account for 30 percent of your mark. The mid-term is 15 percent, the first essay is 10 percent, and the second essay is 30 percent. M Let\'s see. 30, 15, 10, 30...that\'s only 85 percent.  W The other 15 percent is based on your attendance and participation in the class. M It sounds interesting. I think I’ll take it",
          speakerLines: [
            {
              speaker: "Man",
              text: "I\'m interested in your course on Indian culture. Can you tell me about it,",
            },
            {
              speaker: "Woman",
              text: "Certainly. The course is eight weeks long. There will be a mid-term",
            },
            { speaker: "Man", text: "How do you determine the grades?" },
            {
              speaker: "Woman",
              text: "The final will account for 30 percent of your mark. The mid-term is 15",
            },
            {
              speaker: "Man",
              text: "Let\'s see. 30, 15, 10, 30...that\'s only 85 percent. ",
            },
            {
              speaker: "Woman",
              text: "The other 15 percent is based on your attendance and participation in the",
            },
            {
              speaker: "Man",
              text: "It sounds interesting. I think I’ll take it",
            },
          ],
          questions: [
            {
              id: "p2e12q1",
              question: "What are the people mainly discussing?",
              options: [
                "The student\'s class schedule",
                "The professor\'s class schedule",
                "The parts of a class the professor is giving",
                "The classes the student needs in order to graduate",
              ],
              correct: 2,
              explanation:
                "M: I\'m interested in your course on Indian culture. Can you tell me about it, please? (Thầy ơi, em rất thích học khóa học của thầy về văn hóa Ấn Độ. Thầy có thể nói một chút về khóa học đó được không ạ?) W: Certainly. (Chắc chắn rồi!)",
            },
            {
              id: "p2e12q2",
              question: "What is the main point discussed by the professor?",
              options: [
                "Course content",
                "Indian culture",
                "Course marks",
                "Two essays",
              ],
              correct: 2,
              explanation: "Dựa vào nội dung cả bài.",
            },
          ],
        },
        {
          id: "p2e13",
          label: "Bai 13",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 13.mp3",
          transcript:
            "W Hey Frank. If you could be any person in-the world, who would you be? M That\'s easy. Bill Gates! W Why? M I’ll give you 30 billion reasons. Ha, ha. W Ah, so it\'s the money. M Not totally. But the money is nice. I was reading that if you made all of Gates\' money one-dollar bills, and then laid them end-to- end, the line would stretch for almost six million kilometers. W Wow! But what would you do with all that money? M Gates gives a lot to the poor. He\'s donated almost seven-and- a-half billion since the year 0. I\'d give away even more. W Really? M Sure! It costs about $240 a year to feed starving child. So, Bill could save almost  million children. W Hmm...why else do you like Gates? M I admire his confidence. Did you know he earned a scholarship to Harvard, but left after two years to start Microsoft? That took courage!",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Hey Frank. If you could be any person in-the world, who would you be?",
            },
            { speaker: "Man", text: "That\'s easy. Bill Gates!" },
            { speaker: "Woman", text: "Why?" },
            {
              speaker: "Man",
              text: "I’ll give you 30 billion reasons. Ha, ha.",
            },
            { speaker: "Woman", text: "Ah, so it\'s the money." },
            {
              speaker: "Man",
              text: "Not totally. But the money is nice. I was reading that if you made all of",
            },
            {
              speaker: "Woman",
              text: "Wow! But what would you do with all that money?",
            },
            {
              speaker: "Man",
              text: "Gates gives a lot to the poor. He\'s donated almost seven-and- a-half billion",
            },
            { speaker: "Woman", text: "Really?" },
            {
              speaker: "Man",
              text: "Sure! It costs about $240 a year to feed starving child. So, Bill could save",
            },
            { speaker: "Woman", text: "Hmm...why else do you like Gates?" },
            {
              speaker: "Man",
              text: "I admire his confidence. Did you know he earned a scholarship to Harvard,",
            },
          ],
          questions: [
            {
              id: "p2e13q1",
              question:
                "What does the man describe laying dollar bills end-to-end?",
              options: [
                "To compare old and new money",
                "To show the woman how poor he is",
                "To illustrate how rich Gates is",
                "To count reasons why he admires Gates",
              ],
              correct: 2,
              explanation:
                "Hiển nhiên là để cho thấy Bill Gates có nhiêu tiền như thế nào-> Minh họa độ giàu có của Bill Gates",
            },
            {
              id: "p2e13q2",
              question: "Why does the man admire Bill Gates?",
              options: [
                "For his money 5",
                "For his confidence",
                "For his good looks",
                "For his money and confidence",
              ],
              correct: 3,
              explanation:
                "M: That\'s easy. Bill Gates! (Dễ thôi, mình hâm mộ Bill Gates!) W: Why? (Tại sao?) M: I’ll give you 30 billion reasons. Ha, ha. (Mình sẽ cho cậu 30 triệu lí do.) W: Ah, so it\'s the money. (À, vậy là vì tiền rồi.)  M: Not totally. (Một phần là như vậy.) W: Hmm...why else do you like Gates? (Ừm, cậu còn thích ông ấy vì lý do gì nữa?) M: I admire his confidence. (Mình ngưỡng mộ sự tự tin của ông ấy.)",
            },
            {
              id: "p2e13q3",
              question: "What is the man\'s main point? 28",
              options: [
                "He reads an interesting article.",
                "He wants to study business.",
                "He loves money.",
                "He likes Gates.",
              ],
              correct: 3,
              explanation: "Dựa vào nội dung cả bài",
            },
          ],
        },
        {
          id: "p2e14",
          label: "Bai 14",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 14.mp3",
          transcript:
            "M Excuse me. I’d like to buy a bicycle permit please. W That will be four dollars. M Here you are. And permit will let me park my bike anywhere on campus? W Yes. M How long is the permit valid for? W It’s valid for the next four years. Ok, now I need your bicycle serial number. M My serial number? Just a minute. Ah, here it is. A7-10023. W All right. Next, I need some identification with your address on it. M My address? Um, oh yeah. I have my driver’s license. W Sure, your drive’s license will be fine. All right. Last but not least, you need to fill out this bicycle registration card. Then we’ll give you your permit. M Here you are. W Thank you. Now, you need to make sure this permit is in plain sight on your bicycle. Attach it to the main frame, on the center post below the seat. If we can’t see it, you will have to pay a fine. M No problem. Thanks.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Excuse me. I’d like to buy a bicycle permit please.",
            },
            { speaker: "Woman", text: "That will be four dollars." },
            {
              speaker: "Man",
              text: "Here you are. And permit will let me park my bike anywhere on campus?",
            },
            { speaker: "Woman", text: "Yes." },
            { speaker: "Man", text: "How long is the permit valid for?" },
            {
              speaker: "Woman",
              text: "It’s valid for the next four years. Ok, now I need your bicycle serial",
            },
            {
              speaker: "Man",
              text: "My serial number? Just a minute. Ah, here it is. A7-10023.",
            },
            {
              speaker: "Woman",
              text: "All right. Next, I need some identification with your address on it.",
            },
            {
              speaker: "Man",
              text: "My address? Um, oh yeah. I have my driver’s license.",
            },
            {
              speaker: "Woman",
              text: "Sure, your drive’s license will be fine. All right. Last but not least, you",
            },
            { speaker: "Man", text: "Here you are." },
            {
              speaker: "Woman",
              text: "Thank you. Now, you need to make sure this permit is in plain sight on",
            },
            { speaker: "Man", text: "No problem. Thanks." },
          ],
          questions: [
            {
              id: "p2e14q1",
              question: "Why does the student want to buy a bicycle permit?",
              options: [
                "So he can get a discount",
                "Because he lost his old one",
                "So he can sell his bicycle",
                "So he can park his bicycle on campus.",
              ],
              correct: 3,
              explanation:
                "M: Excuse me. I\'d like to buy a bicycle permit please. (Cô ơi, em muốn mua một cái vé xe đạp ạ!) …….. M: And the permit will let me park my bike anywhere on campus? (Vé này sẽ giúp em được gửi xe ở bất cứ chỗ nào trong khuôn viên trường đúng không ạ?) W: Yes. (Đúng rồi em nhé!)",
            },
            {
              id: "p2e14q2",
              question:
                "What do we learn about the student from this conversation?",
              options: [
                "He is married",
                "He is studying history",
                "He doesn’t have a bicycle",
                "He can drive a car",
              ],
              correct: 3,
              explanation:
                "M: I have my driver\'s license. (Em có bằng lái xe ô tô.) => Bạn nam này có thể lái ô tô.",
            },
            {
              id: "p2e14q3",
              question: "Where should the man keep the permit?",
              options: [
                "In his apartment",
                "On his bike",
                "At his parking space",
                "In his wallet",
              ],
              correct: 1,
              explanation:
                "W: Now you need to make sure this permit is in plain side on your bicycle. (Em cần đảm bảo cái vé sẽ được dán ở trên xe đạp, ở một chỗ mà người ta dễ nhìn thấy.)",
            },
          ],
        },
        {
          id: "p2e15",
          label: "Bai 15",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 15.mp3",
          transcript:
            "W Ha ha! Hey Trevor, check this out! M I\'m trying to study here! W Oh, sorry. But this is really funny. M What is? W This article about strange inventions. M Like what? W Well, one guy invented a ladder for spiders. It\'s a rubber strip you can put on the side of your bathtub. M Ha! Yeah? What else? W A portable seat. You carry it around your waist like a big cushion. M Ha! That\'s really stupid. W Here\'s the best one. A car license plate that tells if the driver’s a man or a woman. M I like that one. Then I could stay away from women drivers. W Yeah... Hey!",
          speakerLines: [
            { speaker: "Woman", text: "Ha ha! Hey Trevor, check this out!" },
            { speaker: "Man", text: "I\'m trying to study here!" },
            { speaker: "Woman", text: "Oh, sorry. But this is really funny." },
            { speaker: "Man", text: "What is?" },
            {
              speaker: "Woman",
              text: "This article about strange inventions.",
            },
            { speaker: "Man", text: "Like what?" },
            {
              speaker: "Woman",
              text: "Well, one guy invented a ladder for spiders. It\'s a rubber strip you can put",
            },
            { speaker: "Man", text: "Ha! Yeah? What else?" },
            {
              speaker: "Woman",
              text: "A portable seat. You carry it around your waist like a big cushion.",
            },
            { speaker: "Man", text: "Ha! That\'s really stupid." },
            {
              speaker: "Woman",
              text: "Here\'s the best one. A car license plate that tells if the driver’s a man or a",
            },
            {
              speaker: "Man",
              text: "I like that one. Then I could stay away from women drivers.",
            },
            { speaker: "Woman", text: "Yeah... Hey!" },
          ],
          questions: [
            {
              id: "p2e15q1",
              question:
                "How does the girl explain the way she feels about the article?",
              options: [
                "She lets the boy read it",
                "She gives examples from the article",
                "She reads the article to him.",
                "She shows him pictures from the article",
              ],
              correct: 1,
              explanation:
                "Cô gái đã đưa ví dụ trong một bài báo về một người đàn ông phát minh ra loại thang dành cho nhện, về chỗ ngồi xách tay và về một cái biển xe ô tô nói rõ tài xế là nam hay nữ.",
            },
            {
              id: "p2e15q2",
              question: "What does the special license plate tell?",
              options: [
                "When spiders are in a bathtub",
                "When the driver needs a rest",
                "The distance to home",
                "The gender of the driver.",
              ],
              correct: 3,
              explanation:
                "A car license plate that tells if the driver\'s a man or a woman. (Một cái biển xe ô tô nói rõ tài xế là nam hay nữ.)",
            },
            {
              id: "p2e15q3",
              question:
                "What is true about the inventions described in the article? 29",
              options: [
                "They were made a long time ago.",
                "They were all made by the same person",
                "They are unusual.",
                "They use electricity.",
              ],
              correct: 2,
              explanation:
                "Dĩ nhiên cả 3 ví dụ trên đều rất kỳ lạ/khác thường.",
            },
          ],
        },
        {
          id: "p2e16",
          label: "Bai 16",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 16.mp3",
          transcript:
            "M All right. Saturday\'s the big day. Are you ready? Yes, Susan? W Tests make me nervous. What can I do? M Good question. It\'s natural to be a little nervous before a test. The important thing is: don\'t panic. You\'ve studied hard for this test. You can pass it. Be confident! Relax! Now, you’re more likely to be relaxed if you are well prepared. Here are some tips. First, before you leave home, check to make  sure you have everything you need. You should have your admission ticket. This was mailed to you last week. You should have two number two pencils and a good eraser. You should have identification your student ID card, a driver\'s license, or a passport. If you\'re taking the math portion of the test, you should have a calculator. Second, know what you can\'t bring to the test. You cannot bring a watch with a loud alarm. You cannot bring any food or drink. You cannot bring extra paper to write on. You cannot bring any books, notes, or dictionaries. You cannot bring compasses rulers, protractors, or other aids - except for the calculator. You cannot bring colored pens, pencils, or highlighters. You cannot bring cell phones or pagers. You cannot bring any portable tape recorders,. walkmans, or headphones. Questions? W Um...what if I uh, have to go to the bathroom during the test? M You can\'t. So go before! Don\'t worry, there will be breaks after each section of the test. You’ll be able to go then.",
          speakerLines: [
            {
              speaker: "Man",
              text: "All right. Saturday\'s the big day. Are you ready? Yes, Susan?",
            },
            { speaker: "Woman", text: "Tests make me nervous. What can I do?" },
            {
              speaker: "Man",
              text: "Good question. It\'s natural to be a little nervous before a test. The important",
            },
            {
              speaker: "Woman",
              text: "Um...what if I uh, have to go to the bathroom during the test?",
            },
            {
              speaker: "Man",
              text: "You can\'t. So go before! Don\'t worry, there will be breaks after each section",
            },
          ],
          questions: [
            {
              id: "p2e16q1",
              question: "Why do students need identification?",
              options: [
                "The professor can\'t remember their names.",
                "The test requires it.",
                "There are not enough calculators.",
                "Too many students want to take the test.",
              ],
              correct: 1,
              explanation:
                "Hiển nhiên là cần đem thẻ học sinh vì kỳ thi yêu cầu như vậy.",
            },
            {
              id: "p2e16q2",
              question:
                "According to the professor, why is it important to be prepared for the test?",
              options: [
                "It will make you nervous.",
                "It will help you relax.",
                "It will guarantee that you get a high mark.",
                "It will save time on the day of the test.",
              ],
              correct: 1,
              explanation:
                "You\'re more likely to be relaxed if you are well prepared. (Các em sẽ cảm thấy thư giãn hơn nếu các em đã chuẩn bị tốt cho kỳ thi.)",
            },
            {
              id: "p2e16q3",
              question: "What is the speaker\'s main point?",
              options: [
                "What type of questions will be on the test",
                "Which subjects will be on the test",
                "How long the test will last",
                "Things you should and shouldn\'t bring for the test",
              ],
              correct: 3,
              explanation: "Dựa vào nội dung cả nửa sau của bài",
            },
            {
              id: "p2e16q4",
              question: "What does the professor imply?",
              options: [
                "There will be a test on Saturday.",
                "There will be no school on Saturday.",
                "Saturday is the longest day of the year.",
                "He doesn\'t like Saturdays.",
              ],
              correct: 0,
              explanation:
                "M: All right! Saturday\'s the big day. (Được rồi các em! Thứ 7 sẽ là ngày trọng đại.)",
            },
          ],
        },
        {
          id: "p2e17",
          label: "Bai 17",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 17.mp3",
          transcript:
            "W Hi there. On last week’s programme, we interviewed the man behind the idea of the International camps so I thought that this week you\'d be interested to hear more about one of the camps which will be held later this year over to you Michael. M Thank you. Yes, the Camp is open to everyone between the ages of 18 to 23. You don’t have to be a student. You don’t even have to be employed but you must be able to speak one foreign language in addition to your mother tongue. W OK. And what about accommodation? M Well, the International Camp organisers supply tents which sleep up to four people. But you are unlikely to know the people who you’ll be sharing a  tent with. The nationalities are mixed so you’ll be sharing with people who may not even speak your language! W Sounds interesting. Who does the cooking at the Camp? M Everybody is expected to help with the running of the Camp. That means helping to prepare food, keeping the camp site clean and tidy, and so on. The Camp organisers are looking for people who can get along with others whatever happens. W And is there anything you need to take? M Well as I’ve said, tents are provided but you’ll need to bring your own pillow, knife, fork and spoon. If you get chosen, you’re also asked to bring along photographs, postcards, anything that shows some of the traditions and customs of your own country. Everything goes into an exhibition at the start of the Camp together with a huge map of the world showing the different countries people come from. W And is there any entertainment? M Yes, there is. Everyone helps to provide the Camp entertainment. You are expected to sing, dance or play something musical. It doesn’t matter how good or bad you are. There is a space on the form to write down what you can do. W Sounds great fun. And what does it all cost? M Well, you have to find your own way to the Camp so it’s up to you whether you fly, cycle, walk, hitch-hike or whatever. The charge for a week’s Camp is 300 dollars. But you’ll have to change that into your own currency to get a better idea of the cost. You have to pay the full cost before you arrive. But you can pay in any currency you want or you can use a credit card if you have one. Right. Now for the phone number to ring ...",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Hi there. On last week’s programme, we interviewed the man behind the",
            },
            {
              speaker: "Man",
              text: "Thank you. Yes, the Camp is open to everyone between the ages of 18 to",
            },
            { speaker: "Woman", text: "OK. And what about accommodation?" },
            {
              speaker: "Man",
              text: "Well, the International Camp organisers supply tents which sleep up to four",
            },
            {
              speaker: "Woman",
              text: "Sounds interesting. Who does the cooking at the Camp?",
            },
            {
              speaker: "Man",
              text: "Everybody is expected to help with the running of the Camp. That means",
            },
            {
              speaker: "Woman",
              text: "And is there anything you need to take?",
            },
            {
              speaker: "Man",
              text: "Well as I’ve said, tents are provided but you’ll need to bring your own",
            },
            { speaker: "Woman", text: "And is there any entertainment?" },
            {
              speaker: "Man",
              text: "Yes, there is. Everyone helps to provide the Camp entertainment. You are",
            },
            {
              speaker: "Woman",
              text: "Sounds great fun. And what does it all cost?",
            },
            {
              speaker: "Man",
              text: "Well, you have to find your own way to the Camp so it’s up to you whether",
            },
          ],
          questions: [
            {
              id: "p2e17q1",
              question: "What must you be if you want to apply for the Camp?",
              options: [
                "be a student",
                "be at least twenty-four years old.",
                "be employed",
                "speak more than one language.",
              ],
              correct: 3,
              explanation:
                "The Camp is open to everyone between the ages of 18 to 23 (B). You don’t have to be a student (A)- you don’t even have to be employed (C), but you must be able to speak one foreign language (D) in addition to your mother tongue. (Hội trại mở cửa cho mọi người ở lứa tuổi từ 18 đến 23 (B). Bạn không cần là học sinh (A), bạn cũng không cần có một công việc (C), nhưng bạn phải biết nói một ngoại ngữ (D), bên cạnh tiếng mẹ đẻ của mình.)",
            },
            {
              id: "p2e17q2",
              question: "What can you expect in a camp tent?",
              options: [
                "mix with other nationalities.",
                "share with five other people.",
                "know the other people.",
                "share with people from the same nationality.",
              ],
              correct: 0,
              explanation:
                "The International Camp organisers supply tents which sleep up to four people (B) but you are unlikely to know the people who you’ll be sharing a tent with (C). The nationalities are mixed (A, D), so you’ll be sharing with people who may not even speak your language! (Ban tổ chức Hội trại Quốc tế sẽ cung cấp cho bạn lều, mỗi lều dành cho tối đa 4 người (B). Nhưng bạn không thể biết những ai sẽ ở chung lều với bạn (C). Các thành viên với quốc tịch khác nhau sẽ được trộn lẫn với nhau (A, D), nên bạn sẽ có cơ hội ở cùng với những người mà thậm chí bạn không biết tiếng của họ.)",
            },
            {
              id: "p2e17q3",
              question: "What do you NOT have to take to the Camp?",
              options: ["tent", "a knife", "pictures", "postcards"],
              correct: 0,
              explanation:
                "Tents are provided (A) but you’ll need to bring your own pillow, knife (B), fork and spoon. If you get chosen, you’re also asked to bring along photographs, postcards (C, D)- anything that shows some of the traditions and customs of your own country. (Lều sẽ được ban tổ chức cung cấp (A), nhưng bạn sẽ cần tự mang theo gối, dao (B), dĩa và thìa. Nếu bạn được chọn, bạn cũng cần đem theo máy ảnh và bưu thiếp (C, D)-bất cứ cái gì thể hiện được truyền thống và phong tục ở đất nước của bạn.)",
            },
            {
              id: "p2e17q4",
              question: "How must the Camp fees be paid?",
              options: [
                "in dollars.",
                "by cheque.",
                "before the Camp starts.",
                "in your own currency",
              ],
              correct: 2,
              explanation:
                "The charge for a week’s Camp is 300 dollars, but you’ll have to change that into your own currency (A) to get a better idea of the cost. You have to pay the full cost before you arrive (C), but you can pay in any currency you want (D) or you can use a credit card (B) if you have one. (Chi phí ở Hội trại trong một tuần là 300 đô-la, nhưng bạn phải đổi nó sang đơn vị tiền tệ của nước mình (A) để hình dung rõ hơn về giá. Bạn phải trả đầy đủ chi phí trước khi bạn đến Hội trại (C), nhưng bạn có thể thanh toán bằng bất cứ đơn vị tiền tệ nào mà bạn muốn (D) hoặc dùng thẻ tín dụng (B) nếu bạn có.)",
            },
          ],
        },
        {
          id: "p2e18",
          label: "Bai 18",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 18.mp3",
          transcript:
            "W In today’s programme. David Green has come along to tell us all about Waterside Shopping Centre near Northport. Good morning, David. M Good morning. Well, I visited Waterside last week and I think it has something for everyone and I would recommend it for a day out. It’s taken three years to build and finally opened three weeks ago, two months later than planned. Firstly, getting there; there are organized coach trips from most towns in the area but they leave early and come home very late, so I drove. There are 12,000 free parking spaces, so parking is no problem. You can also get there by train, but the station is 15 minutes from Waterside by bus and the buses are really crowded so you sometimes have a long wait.  W And what about opening times? M Well, one thing to remember is that the shops don’t open till 10.00 in the morning except on Saturday when they open at 9.00. So don’t get there too early on a weekday. They close at 8 o’clock every day except Friday when they’re open until 9 pm. W Can you tell us some more about the facilities at the shopping centre? M Yes, it’s arranged on three levels. You’ll find all your favourites here. In fact, if you want to buy a pair of shoes there are 15 different shops to choose from on levels one and two. When you run out of money there are seven different banks but collect your money before you get to the third level as there aren’t any banks up there. On that level, however, there are several restaurants as well as a cinema with seven screens. And don’t get lost like I did, go to the information desk on the first level and get a map. W What else can you do at Waterside? M Before you go back to your car or the bus and in fact it might be better to do this before you go shopping and have too much to carry go and see the lake. Take a walk or have a go at fishing, sailing or wind surfing if you have time. Or you can rest your tired feet and watch the birds and ducks, but you are asked not to feed them. W Was there anything you didn’t like about the shopping centre? M Oh. Well, although I had a good day, I would complain about one thing but not the usual thing the service in the shops was good and I had an excellent lunch in a cafe. No, the silly thing was that everywhere was quite clean but people were dropping their sweet papers and empty drink cans on the ground because there wasn’t anywhere else to throw them. Apart from that I would recommend it. W And so that’s all for today’s programme ...",
          speakerLines: [
            {
              speaker: "Woman",
              text: "In today’s programme. David Green has come along to tell us all about",
            },
            {
              speaker: "Woman",
              text: "aterside Shopping Centre near Northport. Good morning, David.",
            },
            {
              speaker: "Man",
              text: "Good morning. Well, I visited Waterside last week and I think it has",
            },
            { speaker: "Woman", text: "And what about opening times?" },
            {
              speaker: "Man",
              text: "Well, one thing to remember is that the shops don’t open till 10.00 in the",
            },
            {
              speaker: "Woman",
              text: "Can you tell us some more about the facilities at the shopping centre?",
            },
            {
              speaker: "Man",
              text: "Yes, it’s arranged on three levels. You’ll find all your favourites here. In",
            },
            { speaker: "Woman", text: "What else can you do at Waterside?" },
            {
              speaker: "Man",
              text: "Before you go back to your car or the bus and in fact it might be better to",
            },
            {
              speaker: "Woman",
              text: "Was there anything you didn’t like about the shopping centre?",
            },
            {
              speaker: "Man",
              text: "Oh. Well, although I had a good day, I would complain about one thing but",
            },
            {
              speaker: "Woman",
              text: "And so that’s all for today’s programme ...",
            },
          ],
          questions: [
            {
              id: "p2e18q1",
              question:
                "According to the speaker, what is the best way of travelling to Waterside?",
              options: ["coach.", "car.", "train.", "bus"],
              correct: 1,
              explanation:
                "Getting there; there are organized coach trips from most towns in the area but they leave early and come home very late, so I drove. (A, B) There are 12,000 free parking spaces, so parking is no problem. You can also get there by train, but the station is 15 minutes from Waterside by bus, and the buses are really crowded so you sometimes have a long wait. (C, D) (Có xe khách đi từ hầu hết các thị trấn đến đó, nhưng chúng xuất phát sớm và trở về rất muộn, nên tôi đã lái ô tô đi. (A, B) Ở đó có khoảng 00 chỗ đậu xe, nên việc tìm chỗ đậu xe không phải vấn đề. Bạn cũng có thể đi bằng tàu, nhưng bạn sẽ phải mất 15 phút để đi đến ga tàu bằng xe buýt, mà xe buýt thì quá đông người, nên bạn sẽ phải chờ rất lâu. (C, D)",
            },
            {
              id: "p2e18q2",
              question: "On Fridays, what time are the shops open from?",
              options: ["8 o’clock", "9 o’clock", "10 o’clock", "11 o’clock"],
              correct: 2,
              explanation:
                "One thing to remember is that the shops don’t open till 10.00 in the morning except on Saturday when they open at 9.00. (C, D) So don’t get there too early on a weekday. They close at 8 o’clock every day except Friday when they’re open until 9 pm. (A, B) (Một điều cần phải nhớ là các cửa hàng sẽ mở cửa vào lúc 10 giờ sáng, ngoại trừ vào thứ bảy, của hành sẽ mở cửa vào lúc 9 giờ. (C, D) Vậy nên đừng đến đó quá sớm vào những ngày trong tuần. Các cửa hàng sẽ đóng cửa vào lúc 8 giờ tối mỗi ngày, ngoại trừ vào thứ sáu, các cửa hàng sẽ mở cửa cho đến 9 giờ tối. ) (A, B)",
            },
            {
              id: "p2e18q3",
              question: "What can you NOT do at Waterside?",
              options: [
                "feed the ducks",
                "go shopping",
                "go sailing",
                "go wind surfing",
              ],
              correct: 0,
              explanation:
                "Take a walk or have a go at fishing, sailing or wind surfing if you have time. (C, D) Or you can rest your tired feet and watch the birds and ducks, but you are asked not to feed them. (A, B) (Hãy đi bộ hoặc đi câu cá, đi du thuyền hoặc đi lướt sóng nếu bạn có thời gian. (C, D)Hoặc bạn cũng có thể nghỉ ngơi và ngắm chim bay vịt bơi, nhưng bạn không được cho chúng ăn.(A)",
            },
            {
              id: "p2e18q4",
              question: "What does the speaker complain about?",
              options: [
                "There was nowhere to put rubbish.",
                "The food in the café was disappointing.",
                "The service in the shops was slow.",
                "There weren’t any bathrooms.",
              ],
              correct: 0,
              explanation:
                "I would complain about one thing, but not the usual thing - the service in the shops was good (C) and I had an excellent lunch in a café (B). No, the silly thing was that everywhere was quite clean but people were dropping their sweet papers and empty drink cans on the ground because there wasn’t anywhere else to throw them (A). (Tôi muốn phàn nàn về một thứ. Thật ra dịch vụ trong cửa hàng khá tốt (C). Bên cạnh đó, tôi cũng có một bữa trưa rất ngon trong một quán cà phê (B). Điều mà tôi muốn phàn nàn là mọi nơi đều khá sạch, tuy nhiên người ta thường quăng vỏ kẹo và lon nước trên sàn bởi vì không có chỗ nào để vứt chúng cả. (A)",
            },
          ],
        },
        {
          id: "p2e19",
          label: "Bai 19",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 19.mp3",
          transcript:
            "M And today, I’m talking to Angela Morgan. Angela, what made you decide to fly round the world in a helicopter? W People often ask me why I decided to do it but I\'m surprised they don’t ask ‘Why did you wait so long?’ because I’m 57 now! I’m sorry I didn’t do it years ago, because it was such a wonderful experience. But the main purpose for going was to collect £500,000 for sick children by getting different companies to pay us money for each kilometre that we flew.  M And now everyone calls you the flying grandmother! W Yes, the thing about growing older is that you don’t feel any different inside so you have to do as much as you can while you can. I’m healthy, and my own children are grown up, so I was free to go. M And what about preparing for the trip? W Well, it took five months to plan. I was going to go with my husband but he couldn’t take time off work. Instead, I made the trip with my flying teacher who became a great friend while she was teaching me to fly three years ago. I passed my flying test after two weeks; found it quite easy. M And what was the trip like? W It was really exciting flying over so many different countries. The only thing was that we weren’t able to spend much time sightseeing because we only stopped to get water and to camp. We took very little with us but we did have tents and cooking things to use at night. We had to spend two days in Thailand because of an engine problem but that was the longest we spent anywhere. Fortunately nothing else went wrong, so we just kept on going after that. M What did you enjoy most about the trip? W The most wonderful thing about flying was seeing the differences in the countryside as we flew across 26 countries in 97 days. We flew over oceans and close to mountains; sometimes it was quite frightening, but we didn’t travel when it was dark. We spent several nights camping in the desert and the sky was just full of stars. I made a video of the trip; you’ll see it in a minute. M Was there anything that you missed while you were away? W Well, to my surprise I didn’t miss going to work or going out to restaurants or films. The most difficult thing was sitting still all the time. I normally play tennis and swim several times a week, so I started to feel very unfit. I missed hot water and proper showers sometimes too, but not as much as I thought I would!",
          speakerLines: [
            {
              speaker: "Man",
              text: "And today, I’m talking to Angela Morgan. Angela, what made you decide",
            },
            {
              speaker: "Woman",
              text: "People often ask me why I decided to do it but I\'m surprised they don’t ask",
            },
            {
              speaker: "Man",
              text: "And now everyone calls you the flying grandmother!",
            },
            {
              speaker: "Woman",
              text: "Yes, the thing about growing older is that you don’t feel any different",
            },
            { speaker: "Man", text: "And what about preparing for the trip?" },
            {
              speaker: "Woman",
              text: "Well, it took five months to plan. I was going to go with my husband but",
            },
            { speaker: "Man", text: "And what was the trip like?" },
            {
              speaker: "Woman",
              text: "It was really exciting flying over so many different countries. The only",
            },
            { speaker: "Man", text: "What did you enjoy most about the trip?" },
            {
              speaker: "Woman",
              text: "The most wonderful thing about flying was seeing the differences in the",
            },
            {
              speaker: "Man",
              text: "Was there anything that you missed while you were away?",
            },
            {
              speaker: "Woman",
              text: "Well, to my surprise I didn’t miss going to work or going out to restaurants",
            },
          ],
          questions: [
            {
              id: "p2e19q1",
              question: "What does Angela say about her life now?",
              options: [
                "She feels much older.",
                "She likes to be active and busy.",
                "She is lonely without her children.",
                "Her children don’t like people to call her “flying grandmother”",
              ],
              correct: 1,
              explanation:
                "The thing about growing older is that you don’t feel any different inside, so you have to do as much as you can while you can. I’m healthy, and my own children are grown up, so I was free to go. (Khi càng lớn tuổi, bạn sẽ không còn dao động nhiều trong cảm xúc nữa, bạn chỉ cần cố gắng thực hiện được càng nhiều điều càng tốt trong khả năng của mình. Ngoài ra, tôi còn khỏe mạnh, con cái cũng trưởng thành hết rồi nên tôi có thể đi tự do.) Các đáp án A, C, D đều là thông tin lệch với thông tin chính xác, đáp án D được suy ra từ đoạn thông tin trên.",
            },
            {
              id: "p2e19q2",
              question: "What is true about Angela’s flying lessons?",
              options: [
                "her course lasted five months.",
                "her husband took lessons as well.",
                "she got to know her teacher well.",
                "She found it a bit difficult to fly at her old age.",
              ],
              correct: 2,
              explanation:
                "It took five months to plan. (A) I was going to go with my husband, but he couldn’t take time off work. (B) Instead I made the trip with my flying teacher who became a great friend (C) while she was teaching me to fly three years ago. I passed my flying test after two weeks; found it quite easy. (D) (Tôi mất 5 tháng để lên kế hoạch. (A) Lẽ ra tôi sẽ đi cùng chồng tôi, nhưng anh ấy không thể sắp xếp thời gian (B) nên tôi đã đi cùng giáo viên dạy bay của mình. Cô ấy đã trở thành bạn thân của tôi (C) khi cô ấy dạy tôi bay vào 3 năm trước. Tôi đã đỗ bài kiểm tra bay sau 2 tuần. Tôi thấy nó khá dễ dàng. (D))",
            },
            {
              id: "p2e19q3",
              question: "What did Angela enjoy most about the trip?",
              options: [
                "flying at night",
                "walking in the desert",
                "watching the changes in the scenery",
                "seeing stars at night.",
              ],
              correct: 2,
              explanation:
                "The most wonderful thing about flying was seeing the differences in the countryside as we flew across 26 countries in 97 days. (C) We flew over oceans and close to mountains; sometimes it was quite frightening, but we didn’t travel when it was dark (A). We spent several nights camping in the desert (B) and the sky was just full of stars (D). (Điều tuyệt vời nhất về những chuyến bay là tôi có cơ hội được chứng kiến những thay đổi ở vùng nông thôn khi chúng tôi bay qua 26 đất nước trong 97 ngày. (C) Chúng tôi đã bay qua nhiều đại dương và lượn trên nhiều ngọn núi. Thỉnh thoảng tôi cảm thấy hơi kinh hãi. Tuy nhiên, chúng tôi không đi khi trời tối (A). Chúng tôi dành một vài tối để cắm trại trên sa mạc (B) và ngắm bầu trời đầy sao. (D))",
            },
            {
              id: "p2e19q4",
              question: "What did Angela miss most while she was away?",
              options: [
                "going to restaurants",
                "modern bathrooms",
                "regular exercise",
                "interesting entertainment",
              ],
              correct: 2,
              explanation:
                "I didn’t miss going to work or going out to restaurants (A) or films (D). The most difficult thing was sitting still all the time; I normally play tennis and swim several times a week, so I started to feel very unfit (C). I missed hot water and proper showers sometimes too, but not as much as I thought I would! (B) (Tôi không bỏ qua việc đi làm hoặc đi ăn nhà hàng (A) hay đi xem phim (D). Cái khó nhất với tôi là lúc nào cũng chỉ ngồi một chỗ. Tôi thường chơi tennis và bơi vài lần một tuần, vì vậy tôi đã bắt đầu cảm thấy cơ thể không khỏe (C). Tôi nhớ dòng nước ấm và những lần tắm, nhưng không nhiều như tôi nghĩ! (B))",
            },
          ],
        },
        {
          id: "p2e20",
          label: "Bai 20",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 20.mp3",
          transcript:
            "M Britta, you’re English, but you live in Berlin. Have you lived here for a long time?  W Well, I was born in England, but I’ve lived in Germany for the past twenty years. I arrived in Berlin about four years ago. Before that, I lived in Bonn for six years, but I work as a journalist and when the newspaper moved to Berlin, I moved with them. M Were you pleased to come to Berlin? W Yes, I was. I was looking forward to being in a big city like Berlin. Bonn was quite a lot smaller, so I love the busy atmosphere and all the cultural entertainments here museums, theatres and so on. The only thing I don’t like is the traffic it’s a bit noisy in the mornings. It wakes me up about 6.30, but most days I have to get up early anyway! M Where do you live in Berlin? W I have a flat in the old part of the city. It’s right in the centre and it’s not too expensive. It costs me about £500 a month. My street is becoming very popular. There are lots of new art galleries, and small cafés and friendly restaurants everywhere. Eating out in Berlin is fun, and it’s cheap, so it\'s something I do quite often. M How do you find transport in Berlin? W Well, the transport system here is very good, so I have a tram and bus ticket but in fact, most of the time I cycle. Travel here is much cheaper than in other countries I know perhaps that\'s why people don’t walk very much! M What do you like to do in Berlin at the weekends? W Well, I like art, so sometimes I go to one of the galleries. I have a nephew called Philippe. He’s only three but he likes coming with me. He likes the café best, I think. And it’s a change from going to the park that’s something he does very often. He usually comes out with me while his parents go shopping. M Do you miss your friends and family in England? W work colleagues socially but I’ve got some very good friends who live in the same street as me. I enjoy meeting people, and I find Berlin is a very friendly city. M Thank you for talking to us, Britta.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Britta, you’re English, but you live in Berlin. Have you lived here for a",
            },
            {
              speaker: "Woman",
              text: "Well, I was born in England, but I’ve lived in Germany for the past twenty",
            },
            { speaker: "Man", text: "Were you pleased to come to Berlin?" },
            {
              speaker: "Woman",
              text: "Yes, I was. I was looking forward to being in a big city like Berlin. Bonn",
            },
            { speaker: "Man", text: "Where do you live in Berlin?" },
            {
              speaker: "Woman",
              text: "I have a flat in the old part of the city. It’s right in the centre and it’s not",
            },
            { speaker: "Man", text: "How do you find transport in Berlin?" },
            {
              speaker: "Woman",
              text: "Well, the transport system here is very good, so I have a tram and bus ticket",
            },
            {
              speaker: "Man",
              text: "What do you like to do in Berlin at the weekends?",
            },
            {
              speaker: "Woman",
              text: "Well, I like art, so sometimes I go to one of the galleries. I have a nephew",
            },
            {
              speaker: "Man",
              text: "Do you miss your friends and family in England?",
            },
            {
              speaker: "Woman",
              text: "work colleagues socially but I’ve got some very good friends who live in",
            },
            { speaker: "Man", text: "Thank you for talking to us, Britta." },
          ],
          questions: [
            {
              id: "p2e20q1",
              question: "How long has Britta lived in Berlin?",
              options: [
                "four years",
                "six years",
                "twenty years",
                "twelve years.",
              ],
              correct: 0,
              explanation:
                "I was born in England, but I’ve lived in Germany for the past twenty years (C). I arrived in Berlin about four years ago (A). Before that, I lived in Bonn for six years (B),but I work as a journalist, and when the newspaper moved to Berlin, I moved with them. (Tôi được sinh ra tại Anh nhưng tôi sống ở Đức được 20 năm rồi (C). Tôi đến Berlin khoảng 4 năm trước (A). Trước đó, tôi đã sống ở Bonn được 6 năm (B),sau đó, do tôi làm nhà báo nên khi tòa soạn chuyển đến Berlin thì tôi đã chuyển cùng họ.)",
            },
            {
              id: "p2e20q2",
              question: "What does Britta say about living in Berlin?",
              options: [
                "She can’t sleep at night because of the traffic noise.",
                "She misses the museums and theatres in Bonn.",
                "She likes living in a big, busy city.",
                "She prefers living in Bonn to living in Berlin.",
              ],
              correct: 2,
              explanation:
                "I was looking forward to being in a big city like Berlin. Bonn was quite a lot smaller, so I love the busy atmosphere and all the cultural entertainments here: museums, theatres and so on (C). The only thing I don’t like is the traffic; it’s a bit noisy in the mornings. It wakes me up about 6.30, but most days I have to get up early anyway! (Tôi rất mong đợi được sống trong thành phố lớn như Berlin. Bonn thì nhỏ hơn nhiều, vì vậy tôi thích không khí ồn ào và những địa điểm giải trí mang tính văn hóa như bảo tàng, nhà hát, vân vân (C). Thứ duy nhất ở đây mà tôi không thích là giao thông. Vào buổi sáng, thành phố hơi ồn ào. Nó khiến tôi tỉnh giấc vào lúc 6:30, nhưng dù sao hầu hết mọi ngày tôi đều phải dậy sớm.)",
            },
            {
              id: "p2e20q3",
              question: "How does Britta usually travel around in Berlin?",
              options: [
                "She walks.",
                "She uses her bicycle.",
                "She uses the tram or bus.",
                "She drives her car.",
              ],
              correct: 1,
              explanation:
                "The transport system here is very good, so I have a tram and bus ticket, but in fact, most of the time I cycle. (B) Travel here is much cheaper than in other countries I know - perhaps that\'s why people don’t walk very much! (Các phương tiện giao thông ở đây rất tốt, vì vậy tôi có một vé xe điện và vé xe buýt, nhưng thật ra, hầu hết thời gian là tôi đạp xe. (B) Di chuyển ở đây rẻ nhiều hơn so với ở những nước khác mà tôi biết. Có lẽ vì thế mà mọi người ở đây không đi bộ nhiều.)",
            },
            {
              id: "p2e20q4",
              question: "What is true about Britta’s friends? 32",
              options: [
                "live near her.",
                "work with her.",
                "are still in England.",
                "are from her hometown.",
              ],
              correct: 0,
              explanation:
                "I don\'t really miss England - most of my friends are here. I don’t see much of my work colleagues socially, but I’ve got some very good friends who live in the same street as me. (A) I enjoy meeting people, and I find Berlin is a very friendly city. (Tôi không thực sự nhớ nước Anh lắm, vì hầu hết bạn tôi sống ở đây. Tôi không gặp đồng nghiệp thường xuyên nhưng tôi có một vài người bạn thân cùng sống trên con phố với tôi. (A) Tôi thích gặp gỡ mọi người và tôi thấy Berlin la một thành phố rất thân thiện.)",
            },
          ],
        },
        {
          id: "p2e21",
          label: "Bai 21",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 21.mp3",
          transcript:
            "M Rachel, tell us how your shows for children started. You studied art at college, didn’t you? W That’s right. But I gave up my career as an artist when my twin daughters were born. Painting took up too much time when I was looking after them. I thought about teaching art classes part-time, but instead I started making  dolls for my daughters. I love acting, so I often invented little plays for the dolls, doing the voices myself. M And when did you start doing shows for other people? W When our daughters were five, my husband suggested using the dolls to entertain the children at their birthday party. I wrote a little show and he built a dolls’ theatre. My daughters and their friends loved it. As a result, other parents asked me to come and do the show at their children’s parties. That’s how it all began. M It must be a lot of work for you? W Yes. I love making the dolls, but I decided that I needed someone to help me with the shows. Luckily my neighbour, Lena, was keen to perform with me Her husband records the music to go with the shows. It would be impossible to do everything on my own. M Have you ever had any problems? W Only once. I did a show for a group of three-year-olds, and I’d written a story about a lion. Unfortunately, the children were really afraid of the lion and started crying. I was worried the parents might complain but luckily they were all able to laugh about it afterwards. M And what did you learn from that? W The experience taught me that I had to find out beforehand just what children enjoy. Like me, Lena has two daughters, so whenever we\'ve invented a new story we show it to our four girls first. They always tell us exactly what they think of it. And sometimes I take new dolls to the local primary school to check that children like them. M And the shows continue to be successful? W They do. I have a range of different shows for five to nine-year-olds. In fact, the shows have become so successful I could do one every day, but I don’t want to do that. The reason the shows have become popular, I think, is because I love every minute of every show and so other people love them too. I certainly didn’t realise when I organised that birthday party for my daughters all those years ago that it would change my life so much!",
          speakerLines: [
            {
              speaker: "Man",
              text: "Rachel, tell us how your shows for children started. You studied art at",
            },
            {
              speaker: "Woman",
              text: "That’s right. But I gave up my career as an artist when my twin daughters",
            },
            {
              speaker: "Man",
              text: "And when did you start doing shows for other people?",
            },
            {
              speaker: "Woman",
              text: "When our daughters were five, my husband suggested using the dolls to",
            },
            { speaker: "Man", text: "It must be a lot of work for you?" },
            {
              speaker: "Woman",
              text: "Yes. I love making the dolls, but I decided that I needed someone to help",
            },
            { speaker: "Man", text: "Have you ever had any problems?" },
            {
              speaker: "Woman",
              text: "Only once. I did a show for a group of three-year-olds, and I’d written a",
            },
            { speaker: "Man", text: "And what did you learn from that?" },
            {
              speaker: "Woman",
              text: "The experience taught me that I had to find out beforehand just what",
            },
            {
              speaker: "Man",
              text: "And the shows continue to be successful?",
            },
            {
              speaker: "Woman",
              text: "They do. I have a range of different shows for five to nine-year-olds. In",
            },
          ],
          questions: [
            {
              id: "p2e21q1",
              question: "What did Rachel do before her children were born?",
              options: [
                "an art teacher.",
                "a painter.",
                "an actor.",
                "a doll maker",
              ],
              correct: 1,
              explanation:
                "I gave up my career as an artist when my twin daughters were born. (B) Painting took up too much time when I was looking after them. I thought about teaching art classes part-time, but instead I started making dolls for my daughters. (Tôi từ bỏ sự nghiệp họa sĩ khi 2 con gái sinh đôi của mình được sinh ra.(B) Việc vẽ sẽ tốn rất nhiều thời gian khi tôi chăm chút cho chúng. Tôi nghĩ về việc dạy bán thời gian các lớp vẽ nhưng thay vào đó, tôi lại làm búp bê cho con gái tôi.)",
            },
            {
              id: "p2e21q2",
              question: "Who first thought of doing a show at a party?",
              options: [
                "Rachel’s husband",
                "Rachel’s children",
                "Rachel’s parents",
                "friends of Rachel’s daughter",
              ],
              correct: 0,
              explanation:
                "When our daughters were five, my husband suggested using the dolls to entertain the children at their birthday party. (A)I wrote a little show and he built a dolls’ theatre. My daughters and their friends loved it. As a result, other parents asked me to come and do the show at their children’s parties. That’s how it all began. (Khi các con gái tôi lên năm, chồng tôi gợi ý dùng búp bê để giải trí cho lũ trẻ vào bữa tiệc sinh nhật. (A)Tôi viết kịch bản còn anh ấy dựng lên một sân khấu cho búp bê. Các con gái của tôi và bạn bè của chúng rất thích nó. Cuối cùng, nhiều ông bố bà mẹ nhờ tôi đến và diễn trong bữa tiệc sinh nhật của lũ trẻ. Mọi thứ bắt đầu từ đây đấy!)",
            },
            {
              id: "p2e21q3",
              question: "How does Rachel’s neighbour, Lena, help?",
              options: [
                "makes some dolls for the shows.",
                "performs in the shows.",
                "writes the music for the shows.",
                "records music for the show",
              ],
              correct: 1,
              explanation:
                "I love making the dolls, but I decided that I needed someone to help me with the shows. Luckily my neighbour, Lena, was keen to perform with me. (B)Her husband records the music to go with the shows. It would be impossible to do everything on my own. (Tôi thích làm búp bê nhưng tôi quyết định rằng tôi cần thêm người phụ giúp mình. May thay là Lena, hàng xóm của tôi cũng thích công việc trình diễn với tôi. (B) Chồng của cô ấy chuẩn bị âm nhạc cho buổi biểu diễn. Mọi thứ là không thể nếu tôi làm mọi thứ một mình.)",
            },
            {
              id: "p2e21q4",
              question: "How do Rachel’s daughters help her?",
              options: [
                "They show new dolls to their school friends.",
                "They think of ideas for new stories.",
                "They give her their opinions on her new plays.",
                "They help her make new dolls.",
              ],
              correct: 2,
              explanation:
                "Like me, Lena has two daughters, so whenever we\'ve invented a new story, we show it to our four girls first. They always tell us exactly what they think of it. (C) And sometimes I take new dolls to the local primary school to check that children like them. (Giống tôi, Lena cũng có hai cô con gái, vì vậy, khi chúng tôi sáng tác ra một câu chuyện mới, chúng tôi sẽ cho 4 cô gái xem đầu tiên. Sau đó, chúng sẽ nói cho chúng tôi chính xác chúng nghĩ như thế nào. (C)Thỉnh thoảng, tôi còn đem búp bê đến trường tiểu học địa phương để xem liệu lũ trẻ có thích chúng không.)",
            },
          ],
        },
        {
          id: "p2e22",
          label: "Bai 22",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 22.mp3",
          transcript:
            "M And today in the studio we have a familiar face on television, Angela Bond the news reporter. Angela, your job has taken you all over the world, hasn’t it? 132 W Yes. I’ve reported from a number of countries in Asia and I’ve just returned from the United States. I must say, it’s good to be able to unpack my suitcase now that the job has brought me to Britain for at least six months. M Is the travelling what you enjoy about the job? W It’s certainly interesting, but it can be annoying never knowing where I’m going to be next week! For me, the really exciting thing is being somewhere when a big news story is taking place and seeing it develop. Sometimes that can be quite dangerous, but all jobs have their disadvantages! And travelling gives me the chance to collect souvenirs. M What kind of things? W Mostly things for my flat. I’m mad about anything Chinese and so when I was in Hong Kong, I got a really nice table and some chairs and in Turkey I spend a lot of money on carpets. Then I’ve got pictures and other bits of art from Thailand and India. The flat’s getting a bit crowded! M It sounds colourful! Do you have a regular working day? W Not really. At the moment, I’m one of the team that reads the evening news so sometimes I’m on at six thirty, and sometimes at ten o’clock. But that’s at the end of the day. It all starts in the morning at eight thirty when I phone the office to see what has happened and what they want me to go and report on. M So you don’t have much time for a social life? W It’s better now I’m in London and can see my boyfriend more often. My sister introduced us. He came round for dinner when I was staying with her a year ago. We have a lot in common. He’s a lawyer and I studied law at university. Also we’ve found that we lived in Hong Kong at the same time, although we never met. M What do you like to do in your free time? W Well, cooking is something new I’m trying because I can’t do it when I’m travelling. But I’m not very good at it yet so I find it a bit stressful. One of the best things I’ve bought recently was a boat and when I want to feel calm and peaceful I go for a sail on the river. It never fails! M Angela - thanks.",
          speakerLines: [
            {
              speaker: "Man",
              text: "And today in the studio we have a familiar face on television, Angela Bond",
            },
            {
              speaker: "Woman",
              text: "Yes. I’ve reported from a number of countries in Asia and I’ve just returned",
            },
            {
              speaker: "Man",
              text: "Is the travelling what you enjoy about the job?",
            },
            {
              speaker: "Woman",
              text: "It’s certainly interesting, but it can be annoying never knowing where I’m",
            },
            { speaker: "Man", text: "What kind of things?" },
            {
              speaker: "Woman",
              text: "Mostly things for my flat. I’m mad about anything Chinese and so when I",
            },
            {
              speaker: "Man",
              text: "It sounds colourful! Do you have a regular working day?",
            },
            {
              speaker: "Woman",
              text: "Not really. At the moment, I’m one of the team that reads the evening news",
            },
            {
              speaker: "Man",
              text: "So you don’t have much time for a social life?",
            },
            {
              speaker: "Woman",
              text: "It’s better now I’m in London and can see my boyfriend more often. My",
            },
            {
              speaker: "Man",
              text: "What do you like to do in your free time?",
            },
            {
              speaker: "Woman",
              text: "Well, cooking is something new I’m trying because I can’t do it when I’m",
            },
            { speaker: "Man", text: "Angela - thanks." },
          ],
          questions: [
            {
              id: "p2e22q1",
              question: "Where is Angela working at the moment?",
              options: ["Britain", "the USA", "Thailand", "India"],
              correct: 0,
              explanation:
                "I’ve reported from a number of countries in Asia and I’ve just returned from the United States. I must say, it’s good to be able to unpack my suitcase now that the job has brought me to Britain (A) for at least six months. (Tôi gửi tin từ nhiều đất nước thuộc châu Á và tôi vừa trở về từ Mỹ. Tôi phải nói rằng sẽ rất tốt nếu bây giờ tôi đi mở gói đồ đạc của tôi vì tôi sẽ ở Anh (A) trong ít nhất 6 tháng.)",
            },
            {
              id: "p2e22q2",
              question: "What does Angela like about her job?",
              options: [
                "She loves being in dangerous situations.",
                "She never knows where she’ll go next.",
                "She enjoys watching important events happen.",
                "She likes collecting souvenirs.",
              ],
              correct: 2,
              explanation:
                "It’s certainly interesting, but it can be annoying never knowing where I’m going to be next week! For me, the really exciting thing is being somewhere when a big news story is taking place and seeing it develop. (C)Sometimes that can be quite dangerous, but all jobs have their disadvantages! And travelling gives me the chance to collect souvenirs. (Chắc chắn là rất thú vị, nhưng nó cũng có thể rất khó chịu khi mà khong thể biết bạn sẽ đang ở đâu vào tuần tới. Đối với tôi, thứ thật sự gây hứng thú cho tôi là ở một chỗ nào đó khi mà một sự kiện lớn đang diễn ra và chứng kiến nó xảy ra như thế nào. (C)Thỉnh thoảng công việc của tôi có thể trở nên khá nguy hiểm nhưng công việc nào cũng có những điểm bất lợi nhất định. Và việc di chuyển thường xuyên cho tôi cơ hội được sưu tầm rất nhiều quà lưu niệm.)",
            },
            {
              id: "p2e22q3",
              question: "What did Angela bring home from Hong Kong?",
              options: ["pictures", "carpets", "furniture", "postcards"],
              correct: 2,
              explanation:
                "Mostly things for my flat. I’m mad about anything Chinese and so when I was in Hong Kong, I got a really nice table and some chairs (C) - and in Turkey I spend a lot of money on carpets. Then I’ve got pictures and other bits of art from Thailand and India. The flat’s getting a bit crowded! (Hầu hết mọi thứ cho căn hộ của tôi. Tôi thấy say mê với mọi thứ ở Trung Quốc, vì vậy, khi tôi ở Hồng Kông, tôi đã mua một cái bàn và vài cái ghế. (C)Còn ở Thổ Nhĩ Kỳ, tôi đã chi nhiều tiền để mua thảm. Sau đó tôi lại mua nhiều bức tranh từ Thái Lan và Ấn Độ. Căn hộ của tôi đang ngày càng chật chội vì những món quà lưu niệm.)",
            },
            {
              id: "p2e22q4",
              question: "Where did Angela meet her boyfriend?",
              options: [
                "at her sister’s house",
                "at university",
                "in Hong",
                "in a law firm",
              ],
              correct: 0,
              explanation:
                "It’s better now I’m in London and can see my boyfriend more often. My sister introduced us. He came round for dinner when I was staying with her a year ago. (A)We have a lot in common. He’s a lawyer and I studied law at university. Also we’ve found that we lived in Hong Kong at the same time, although we never met. (Mọi thứ tốt hơn khi tôi ở Luân Đôn vì tôi có thể gặp bạn trai tôi thường xuyên hơn. Chị gái tôi đã giới thiệu anh ấy cho tôi. Anh ấy đã đến ăn tối tại nhà chị tôi khi tôi ở đó cách đây 1 năm. (A)Chúng tôi có rất nhiều điểm chung. Anh ấy là luật sư, còn tôi đã từng học tại trường đại học Luật. Ngoài ra, chúng tôi còn phát hiện ra rằng chúng tôi đã sống ở Hồng Kông cùng một thời điểm, mặc dù chúng tôi chưa bao giờ gặp nhau.) 133",
            },
          ],
        },
        {
          id: "p2e23",
          label: "Bai 23",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 23.mp3",
          transcript:
            "W Oh, what a wonderful view! I’m here with Jack Williams, who’s telling me about his home town of Swanton. M Yes, the top of this hill is the best place to see the area. Swanton is on the coast you can see the harbour from here but in fact the town is built along the river Dean. This river comes from a lake in the mountains, over there in the distance then flows down to the flat land below us where the town is built. W What do you most like about living here? M About Swanton? Oh, it’s an important industrial town and a port so there’s lots of activity. And there’s a forest behind the town with interesting wildlife. But the most exciting thing for me is the mountains. I go climbing whenever I get the chance. W What about entertainment? M There’s plenty of entertainment. A big centre was built last year to encourage the arts - very modern. It’s got a cinema, a theatre and an art gallery. And there’s football. The local team hasn’t done so well lately. A few years ago we nearly won the Cup. And our area is famous for music not in Swanton itself but there’s a well-known music festival in the next town. W But there are problems with the environment. M We’re working on that. The river was a great place for fish but the water got so polluted by the factories that most of the fish disappeared. Well, we’ve cleaned the river up now, and the fish are starting to come back. But I’m unhappy about Swanton woods. The trees are quite healthy but if you look, there are no birds there, and that’s because pollution has reduced the number of insects. W Swanton’s growing fast. Are you pleased about the way it’s changed? M You’ve got to move with the times. It was completely different when I was a boy. In those days everybody worked in the factories, and the families all knew each other. Maybe it was a little boring. Today there are hundreds of different companies and so many new houses that some people don’t even know their neighbours. There are disadvantages, but it’s impossible to be bored with all the things going on. W And what about Swanton’s future?  M Education is important to us. We have a fine university which specialises in advanced technology. And a huge shopping centre, just built, which is bringing in double the number of visitors - good news for us. And last year we improved our airport, so more planes can come in.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Oh, what a wonderful view! I’m here with Jack Williams, who’s telling me",
            },
            {
              speaker: "Man",
              text: "Yes, the top of this hill is the best place to see the area. Swanton is on the",
            },
            {
              speaker: "Woman",
              text: "What do you most like about living here?",
            },
            {
              speaker: "Man",
              text: "About Swanton? Oh, it’s an important industrial town and a port so there’s",
            },
            { speaker: "Woman", text: "What about entertainment?" },
            {
              speaker: "Man",
              text: "There’s plenty of entertainment. A big centre was built last year to",
            },
            {
              speaker: "Woman",
              text: "But there are problems with the environment.",
            },
            {
              speaker: "Man",
              text: "We’re working on that. The river was a great place for fish but the water",
            },
            {
              speaker: "Woman",
              text: "Swanton’s growing fast. Are you pleased about the way it’s changed?",
            },
            {
              speaker: "Man",
              text: "You’ve got to move with the times. It was completely different when I was",
            },
            { speaker: "Woman", text: "And what about Swanton’s future?" },
            {
              speaker: "Man",
              text: "Education is important to us. We have a fine university which specialises",
            },
          ],
          questions: [
            {
              id: "p2e23q1",
              question: "Where is the town of Swanton located?",
              options: [
                "near the sea",
                "by a lake",
                "on a hill",
                "in the mountains",
              ],
              correct: 0,
              explanation:
                "The top of this hill is the best place to see the area. Swanton is on the coast (A) - you can see the harbour from here - but in fact the town is built along the river Dean. This river comes from a lake in the mountains. (Đỉnh ngọn đồi này là nơi tuyệt vời nhất để thấy cả một vùng trời. Swanton nằm trên bờ biển (A), nên bạn có thể nhìn thấy bến cảng từ đây. Thực tế, thị trấn này được xây dọc theo dòng sông Dean. Dòng sông này bắt nguồn từ một hồ nước trên núi.)",
            },
            {
              id: "p2e23q2",
              question: "What does Jack say about entertainment in Swanton?",
              options: [
                "A music festival takes place in the town.",
                "Its football club has done well this year.",
                "An arts centre consists of a cinema, a theatre and an art gallery.",
                "The arts centre is old.",
              ],
              correct: 2,
              explanation:
                "There’s plenty of entertainment. A big centre was built last year to encourage the arts - very modern. It’s got a cinema, a theatre and an art gallery (C). And there’s football. The local team hasn’t done so well lately. A few years ago we nearly won the Cup. And our area is famous for music - not in Swanton itself, but there’s a well-known music festival in the next town. (Có rất nhiều hình thức giải trí. Một trung tâm lớn được xây vào năm ngoái để khuyến khích phát triển nghệ thuật, trung tâm nghệ thuật ấy nhìn rất hiện đại. Ở đó có rạp chiếu phim, nhà hát và phòng trưng bày nghệ thuật.(C) Ngoài ra ở đó còn có sân bóng nữa.Một vài năm trước đây, đội bóng địa phương đã giành được cúp. Tuy nhiên dạo này, phong độ của đội không còn tốt lắm. Khu vực cuả chúng tôi nổi tiếng với âm nhạc, chứ không phải bản thân Swanton, cũng có một lễ hội âm nhạc nổi tiếng ở thị trấn kế bên.)",
            },
            {
              id: "p2e23q3",
              question: "Why is Jack worried about the environment of Swanton?",
              options: [
                "the water in the river is dirty.",
                "there are few wild birds around today.",
                "pollution has destroyed the plants in one area.",
                "There are no fish in the river.",
              ],
              correct: 1,
              explanation:
                "We’re working on that. The river was a great place for fish, but the water got so polluted by the factories that most of the fish disappeared. Well, we’ve cleaned the river up now, and the fish are starting to come back. But I’m unhappy about Swanton woods. The trees are quite healthy, but if you look, there are no birds there (B), and that’s because pollution has reduced the number of insects. (Chúng tôi vẫn đang xử lý việc đó. Con sông đã từng là môi trường sống tuyệt vời cho loài cá, nhưng bây giờ, do chất thải từ các nhà máy nên nước bị ô nhiễm nặng đến nỗi mà số lượng cá bị giảm xuống rất thấp. Hiện tại, chúng tôi đang làm sạch con sông, nên nhiều đàn cá đang quay trở lại. Nhưng tôi rất buồn vì những khu rừng ở Swanton. Cây cối khá xanh tươi, nhưng nếu nhìn kỹ, bạn sẽ thấy ở đó không có chim chóc (B). Lý do là vì ô nhiễm môi trường đã khiến số lượng chim chóc giảm đi.)4. You’ve got to move with the times. It was completely different when I was a boy. In those days everybody worked in the factories, and the families all knew each other. Maybe it was a little boring. Today there are hundreds of different companies, and so many new houses that some people don’t even know their neighbours. There are disadvantages, but it’s impossible to be bored with all the things going on. (Mọi thứ đều thay đổi theo thời gian. Thành phố bây giờ hoàn toàn khác so với hồi tôi còn là một đứa trẻ. Ngày xưa, mọi người đều làm việc trong các nhà máy, các gia đình đều quen biết nhau. Có thể hồi đó hơi nhàm chán một chút. Còn ngày nay, có hàng trăm công ty khác nhau, vì vậy, nhiều gia đình còn không biết hàng xóm của mình là ai. Điều này đem lại nhiều mặt tiêu cực, nhưng nếu cứ buồn chán với những điều đang diễn ra thì cũng không giải quyết được vấn đề gì.)",
            },
            {
              id: "p2e23q4",
              question: "What does Jack say about the way Swanton has changed?",
              options: [
                "He preferred the town when it was smaller.",
                "He thinks it is a more interesting place.",
                "He is sorry that there are fewer jobs available.",
                "He thinks it’s impossible to change people’s way of life.",
              ],
              correct: 0,
              explanation: "",
            },
          ],
        },
        {
          id: "p2e24",
          label: "Bai 24",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 24.mp3",
          transcript:
            "M My guest today is the star of the London Ballet Company, twenty-two year-old Elena Karpov. Elena you were born in Bulgaria. Did you always want to be a dancer? W Well, I was a very lively little girl, so at the age of seven my mother sent me to gymnastics classes. When I was nine, I went on to ballet lessons and from that moment I knew that I wanted to spend my life dancing. Two years later, when I was eleven, I won a place at the New York Ballet School. M So you had to move to the United States. Did you miss your family? W Oh yes. At first it was difficult being away from home and not knowing a lot of English. But it taught me how to look after myself and not to depend on others. There were other Bulgarian students there and we actually found it quite easy to learn enough English to take part in the lessons with the other students. M Tell us about your latest role with the London Ballet Company. W I’m going to dance the part of Cinderella. It’s a story about a poor girl who marries a handsome prince. My parents used to read it to me when I was little. I’d never seen the ballet before, but I already knew the music really well. I’m sure children will love the ballet. M What do you do when you’re not practising or performing?  W Before I joined this company I spent two weeks going round London as a tourist. I don’t have time for sightseeing now, but I love trying on the latest fashions with my friends. I’m always buying new jeans and trainers! I’m not too keen on discos and nightclubs I dance enough during the day! M You must have lots of fans. W Quite a few! They always ask for a photograph of me, but unfortunately I don’t have many to give away. I sometimes sign their programmes instead and if I can I give them one of the flowers I’ve received from the audience. They always ask for tickets, but of course that’s not possible. M What’s been the best thing that’s happened in your career so far? W Well, I’ve been a guest dancer with ballet companies in Moscow and Vienna and I appeared twice on television in Bulgaria and met the president! I shall never forget that! But the most satisfying thing for me is that I’m paid for doing what I really enjoy - dancing! M Elena, thank you for talking to us. W Thank you.",
          speakerLines: [
            {
              speaker: "Man",
              text: "My guest today is the star of the London Ballet Company, twenty-two",
            },
            {
              speaker: "Woman",
              text: "Well, I was a very lively little girl, so at the age of seven my mother sent",
            },
            {
              speaker: "Man",
              text: "So you had to move to the United States. Did you miss your family?",
            },
            {
              speaker: "Woman",
              text: "Oh yes. At first it was difficult being away from home and not knowing a",
            },
            {
              speaker: "Man",
              text: "Tell us about your latest role with the London Ballet Company.",
            },
            {
              speaker: "Woman",
              text: "I’m going to dance the part of Cinderella. It’s a story about a poor girl who",
            },
            {
              speaker: "Man",
              text: "What do you do when you’re not practising or performing?",
            },
            {
              speaker: "Woman",
              text: "Before I joined this company I spent two weeks going round London as a",
            },
            { speaker: "Man", text: "You must have lots of fans." },
            {
              speaker: "Woman",
              text: "Quite a few! They always ask for a photograph of me, but unfortunately I",
            },
            {
              speaker: "Man",
              text: "What’s been the best thing that’s happened in your career so far?",
            },
            {
              speaker: "Woman",
              text: "Well, I’ve been a guest dancer with ballet companies in Moscow and",
            },
            { speaker: "Man", text: "Elena, thank you for talking to us." },
            { speaker: "Woman", text: "Thank you." },
          ],
          questions: [
            {
              id: "p2e24q1",
              question:
                "How old was Elena when she decided to become a dancer?",
              options: ["seven.", "nine.", "ten.", "eleven."],
              correct: 1,
              explanation:
                "I was a very lively little girl, so at the age of seven my mother sent me to gymnastics classes. When I was nine, I went on to ballet lessons and from that moment I knew that I wanted to spend my life dancing (B). Two years later, when I was eleven, I won a place at the New York Ballet School. (Tôi là một cô bé rất hiếu động, vì vậy khi tôi 7 tuổi, mẹ tôi đã gửi tôi đến lớp tập thể hình. Khi tôi 9 tuổi, tôi đã tham gia lớp học múa ba-lê và từ giây phút đó, tôi đã biết rằng tôi muốn dành cả đời mình để múa.(B) 2 năm sau, khi tôi 11 tuổi, tôi đã giành được một vé vào học trường múa ba-lê New York.)",
            },
            {
              id: "p2e24q2",
              question:
                "What does Elena say about the ballet called Cinderella?",
              options: [
                "It will attract both adults and children.",
                "The music was unfamiliar to her.",
                "She saw it when she was a child.",
                "She will play one role in it.",
              ],
              correct: 3,
              explanation:
                "I’m going to dance the part of Cinderella. (D) It’s a story about a poor girl who marries a handsome prince. My parents used to read it to me when I was little. I’d never seen the ballet before, but I already knew the music really well. I’m sure children will love the ballet. (Tôi sẽ tham gia vở Cô bé lọ lem. (D) Đó là câu chuyện về một cô gái nghèo lấy được chàng hoàng tử đẹp trai. Bố mẹ tôi đã kể cho tôi câu chuyện đó khi tôi còn nhỏ. Tôi chưa bao giờ xem phần trình diễn ba-lê của câu chuyện này trước đây nhưng may mắn là tôi đã biết rất rõ nền nhạc của vở diễn này. Tôi dám chắc rằng bọn trẻ sẽ thích phần trình diễn này.)",
            },
            {
              id: "p2e24q3",
              question: "What does Elena like to do in her free time?",
              options: [
                "go sightseeing.",
                "go to clubs.",
                "go dancing",
                "go shopping.",
              ],
              correct: 3,
              explanation:
                "Before I joined this company I spent two weeks going round London as a tourist. I don’t have time for sightseeing now, but I love trying on the latest fashions with my friends. I’m always buying new jeans and trainers! (D)I’m not too keen on discos and nightclubs - I dance enough during the day! (Trước khi gia nhập công ty, tôi đã dành 2 tuần để đạo quanh Luân Đôn. Hiện tại tôi không có thời gian đi thăm quan, nhưng tôi thích thử những xu hướng thời trang mới nhất với bạn bè mình. Tôi thích mua quần áo mới (D). Còn với các hộp đêm thì tôi không có hứng thú lắm, tôi đã nhảy cả ngày đủ rồi!)",
            },
            {
              id: "p2e24q4",
              question: "What does Elena like best about her job?",
              options: [
                "appearing on television",
                "doing something she loves",
                "travelling to different countries",
                "meeting the president",
              ],
              correct: 1,
              explanation:
                "I’ve been a guest dancer with ballet companies in Moscow and Vienna, and I appeared twice on television in Bulgaria and met the president! I shall never forget that! But the most satisfying thing for me is that I’m paid for doing what I really enjoy - dancing!(B) (Tôi đã là vũ công khách mời cho các công ty ba-lê ở Moscow và Vienna. Tôi cũng đã xuất hiện 2 lần trên ti vi ở Bulgaria và thậm chí còn được gặp tổng thống. Tôi sẽ không bao giờ quên kỉ niệm đó. Nhưng điều tuyệt vời nhất là tôi được trả tiền để múa, thứ mà tôi đam mê.(B)",
            },
          ],
        },
        {
          id: "p2e25",
          label: "Bai 25",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 25.mp3",
          transcript:
            "W Today I’m with Robin Marshall, who has just written a book about travelling in Argentina. Robin, tell us about yourself... M Well, I’ve travelled to South America a lot for my work and I know Argentina well now. So well that I could be a tour guide if I wanted! I speak fluent Spanish, so I don’t need anyone to translate for me. My job involves travelling around selling products for my company. I meet a lot of people doing that, and I wanted to share those experiences with others, so I decided to try writing. W So, tell us about your last visit to Argentina. What was the weather like? M Well, it was winter there, so mornings were cold, but I’d expected that. Every day they said on the radio that it would be sunny later and sure enough, it was! I wanted to go sightseeing, and the weather was perfect for that. W And where did you go when you went sightseeing? M Well, I went to a wonderful market that sold everything from modern art to old recordings of traditional music, which I collect. I came home with a beautiful painting of the area I also saw a wonderful antique chair, but unfortunately it was too big to bring back. W Now, Argentina is famous for its dancing. Did you see any performances during your trip?  M I did, yes. It reminded me of when I used to attend dance classes. I enjoyed then although I was never very good. I’m sure my teacher was pleased when I said I wasn’t going to continue! But these dancers made it look so easy that at that moment I felt like joining in and dancing with them. W It sounds wonderful! And what else did you do? M Well, I went to a small village on the coast. I took the bus there, and got a room in a small hotel. The hotel owner was very friendly. He took me down the river in his boat. It was very beautiful - you could see the forest in the distance. W Do you have a favourite place in Argentina? M Definitely. It’s a mountain near Buenos Aires. It’s famous for its spectacular scenery. But when I went there it was very misty and the sun was just rising. You couldn’t see much. there were no birds or animals about It was totally quiet, and I loved that. I shall go back one day. W We look forward to reading your book. Thank you, Robin. M Thank you.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Today I’m with Robin Marshall, who has just written a book about",
            },
            {
              speaker: "Man",
              text: "Well, I’ve travelled to South America a lot for my work and I know",
            },
            {
              speaker: "Woman",
              text: "So, tell us about your last visit to Argentina. What was the weather like?",
            },
            {
              speaker: "Man",
              text: "Well, it was winter there, so mornings were cold, but I’d expected that.",
            },
            {
              speaker: "Woman",
              text: "And where did you go when you went sightseeing?",
            },
            {
              speaker: "Man",
              text: "Well, I went to a wonderful market that sold everything from modern art",
            },
            {
              speaker: "Woman",
              text: "Now, Argentina is famous for its dancing. Did you see any performances",
            },
            {
              speaker: "Man",
              text: "I did, yes. It reminded me of when I used to attend dance classes. I enjoyed",
            },
            {
              speaker: "Woman",
              text: "It sounds wonderful! And what else did you do?",
            },
            {
              speaker: "Man",
              text: "Well, I went to a small village on the coast. I took the bus there, and got a",
            },
            {
              speaker: "Woman",
              text: "Do you have a favourite place in Argentina?",
            },
            {
              speaker: "Man",
              text: "Definitely. It’s a mountain near Buenos Aires. It’s famous for its",
            },
            {
              speaker: "Woman",
              text: "We look forward to reading your book. Thank you, Robin.",
            },
            { speaker: "Man", text: "Thank you." },
          ],
          questions: [
            {
              id: "p2e25q1",
              question: "What was Robin’s job in Argentina?",
              options: ["translator", "tour guide", "salesman", "tourist"],
              correct: 2,
              explanation:
                "I’ve travelled to South America a lot for my work and I know Argentina well now. So well that I could be a tour guide if I wanted! I speak fluent Spanish, so I don’t need anyone to translate for me. My job involves travelling around selling products for my company. (C)I meet a lot of people doing that, and I wanted to share those experiences with others, so I decided to try writing. (Tôi đã có nhiều dịp sang vùng Nam Mỹ làm việc nên tôi biết khá rõ về đất nước Argentina. Thậm chí rõ đến nỗi mà tôi có thể làm hướng dẫn viên du lịch luôn nếu tôi muốn. Tôi nói trôi chảy tiếng Tây Ban Nha nên tôi không cần ai làm phiên dịch cho tôi. Công việc của tôi đòi hỏi tôi phải di chuyển nhiều để bán sản phẩm của công ty.(C) Tôi đã gặp nhiều người cũng làm công việc đó, và tôi muốn chia sẻ kinh nghiệm của mình với mọi người, vì vậy tôi quyết định thử viết lách.)",
            },
            {
              id: "p2e25q2",
              question: "What did Robin buy from the market he visited?",
              options: ["a picture", "a chair", "a record", "a CD"],
              correct: 0,
              explanation:
                'I went to a wonderful market that sold everything from modern art to old recordings of traditional music, which I collect. I came home with a beautiful painting of the arse (A)..I also saw a wonderful antique chair, but unfortunately it was too big to bring back. (Tôi đã đến một khu chợ tuyệt vời bán mọi thứ từ những bức tranh hiện đại cho đến những đĩa ghi âm cũ những ca khúc truyền thống mà tôi sưu tầm. Tôi trở về nhà với một bức tranh. (A)Tôi cũng xem một cái ghế cổ, nhưng không may là cái ghế ấy to quá nên tôi không đem về được.)3. It reminded me of when I used to attend dance classes. I enjoyed then" although I was never very good. I’m sure my teacher was pleased when I said I wasn’t going to continue! But these dancers made it look so easy that at that moment I felt like joining in and dancing with them. (A) (Buổi trình diễn giúp tôi nhớ lại rằng tôi đã từng tham gia lớp học múa. Tôi thích chúng mặc dù tôi chưa bao giờ giỏi múa. Tôi chắc chắn rằng cô giáo của tôi sẽ rất hài lòng khi tôi nói rằng tôi sẽ không tiếp tục nữa. Nhưng những vũ công này khiến tôi cảm thấy múa thật dễ dàng đến nỗi khiến tôi cảm thấy muốn tham gia múa với họ một lần nữa.(A)',
            },
            {
              id: "p2e25q3",
              question:
                "How did Robin feel during the dance performance he saw? dancing.",
              options: [
                "He wanted to get up and dance.",
                "He wished he had continued his dance classes.",
                "He was sad he didn’t dance well.",
                "He thought Argentinean dancing was much easier than his country’s",
              ],
              correct: 0,
              explanation: "",
            },
            {
              id: "p2e25q4",
              question: "What did Robin like about his favourite place? 35",
              options: [
                "the wildlife",
                "the views",
                "the peace",
                "the weather",
              ],
              correct: 2,
              explanation:
                "It’s a mountain near Buenos Aires. It’s famous for its spectacular scenery. But when I went there it was very misty and the sun was just rising. You couldn’t see much: there were no birds or animals about. It was totally quiet, and I loved that. (C)I shall go back one day. (Đó là một ngọn núi nằm cạnh Buenos Aires. Nó nổi tiếng với khung cảnh tuyệt vời. Nhưng khi tôi đến đó, không khí ở đó rất ẩm còn mặt trời thì chỉ vừa mới mọc. Bạn không thể ngắm nhiều thứ ở đó, vì ở đó chẳng có chim chóc mà cũng chẳng có động vật khác. Ở đó hoàn toàn yên tĩnh nên tôi rất thích chỗ đó. (C)Tôi sẽ trở lại đó một ngày nào đó.)",
            },
          ],
        },
        {
          id: "p2e26",
          label: "Bai 26",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 26.mp3",
          transcript:
            "W Harry Park, you run a travel company which organizes adventure holidays in some difficult places? How did you first become interested in Adventure travel? M Well, my father worked in an insurance company once he had a family but before that he\'d spent several years traveling the world and he never stopped telling us about it. His stories were much more exciting than the books I read and they make me want to travel and have adventures of my own. W And what made you decide to start an adventure travel company? M Well, when I was in my twenties, I traveled a lot in different countries I went exploring and climbing in mountains and deserts. I wanted to show other people how wonderful these things were. The business has been very successful but when I started it I didn’t know if I’d make any money. W Your company is called Far and wide. How did you choose the name? M Well, I just called it Park Travel at first. But everyone thought that was terribly boring! My wife kept suggesting different things but in the end it  was a customer who gave me the idea. Far and wide is also the title of a book that a friend wrote so it reminds me of him too W Great... The places you visit are usually very unspoilt, Harry. Some people think it\'s not a good idea to take tourists there. What would you say to them? M Well, most of the places we visit have no inhabitants, so we aren’t going to spoil people’s way of life or bring in things like television and fridges! And I make sure that we always take care of the environment. We are careful not to cause pollution, so we take all our rubbish away. W Some of the things you do are also dangerous. Do you enjoy danger? M Well, it’s not a question of enjoying it. It’s just that you can’t do what I do without thinking about the possible dangers. I’m never frightened though. If I’m taking a group up a mountain or something like that. I just concentrate on what I have to do and get on with it. W You’ve been to some fascinating places, Harry. What’s your favourite? M It’s in India. You travel along a river through spectacular scenery and up into the mountains in Madhya Pradesh. In the valley on the other side there’s a wonderful old castle. It’s magical. The mountains hide it, so few people know it’s there ... W Thanks for talking to us, Harry ... M Thank you.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Harry Park, you run a travel company which organizes adventure holidays",
            },
            {
              speaker: "Man",
              text: "Well, my father worked in an insurance company once he had a family but",
            },
            {
              speaker: "Woman",
              text: "And what made you decide to start an adventure travel company?",
            },
            {
              speaker: "Man",
              text: "Well, when I was in my twenties, I traveled a lot in different countries I",
            },
            {
              speaker: "Woman",
              text: "Your company is called Far and wide. How did you choose the name?",
            },
            {
              speaker: "Man",
              text: "Well, I just called it Park Travel at first. But everyone thought that was",
            },
            {
              speaker: "Woman",
              text: "Great... The places you visit are usually very unspoilt, Harry. Some people",
            },
            {
              speaker: "Man",
              text: "Well, most of the places we visit have no inhabitants, so we aren’t going",
            },
            {
              speaker: "Woman",
              text: "Some of the things you do are also dangerous. Do you enjoy danger?",
            },
            {
              speaker: "Man",
              text: "Well, it’s not a question of enjoying it. It’s just that you can’t do what I do",
            },
            {
              speaker: "Woman",
              text: "You’ve been to some fascinating places, Harry. What’s your favourite?",
            },
            {
              speaker: "Man",
              text: "It’s in India. You travel along a river through spectacular scenery and up",
            },
            { speaker: "Woman", text: "Thanks for talking to us, Harry ..." },
            { speaker: "Man", text: "Thank you." },
          ],
          questions: [
            {
              id: "p2e26q1",
              question:
                "Why did Harry decide to start an adventure travel company?",
              options: [
                "he wanted to share his experience with others.",
                "he thought he could make a lot of money.",
                "his father encouraged him to do it.",
                "he hoped to do more travelling himself.",
              ],
              correct: 0,
              explanation:
                "When I was in my twenties, I travelled a lot in different countries. I went exploring and climbing in mountains and deserts. I wanted to show other people how wonderful these things were. (A)The business has been very successful, but when I started it I didn’t know if I’d make any money. (Khi tôi khoảng 20 tuổi, tôi đã đi du lịch nhiều nước. Tôi đi khám phá những ngọn núi cao và nhiều sa mạc khô cằn. Tôi muốn cho mọi người thấy thế giới tuyệt vời ở ngoài kia. (A)Khi mới bắt đầu, tôi đã không biết liệu mình có kiếm được tí tiền nào không. Nhưng hiện tại, việc làm ăn đang diễn ra rất tốt.)",
            },
            {
              id: "p2e26q2",
              question: "Who suggested the name for Harry’s company?",
              options: ["a friend", "a customer", "his wife", "his parents"],
              correct: 1,
              explanation:
                "I just called it Park Travel at first. But everyone thought that was terribly boring! My wife kept suggesting different things, but in the end it was a customer who gave me the idea (B). Far and Wide is also the title of a book that a friend wrote, so it reminds me of him, too. (Tôi đã gọi cho Park Travel đầu tiên. Nhưng mọi người nghĩ rằng việc đó thật là nhàm chán. Vợ tôi đã cho tôi rất nhiều gợi ý nhưng cuối cùng lại là khách hàng cho tôi ý tưởng (B). “Far and Wide” cũng là tựa đề của một cuốn sách mà bạn tôi viết, vì vậy nó cũng gợi tôi nhớ về cậu ấy.)",
            },
            {
              id: "p2e26q3",
              question: "What does Harry say about doing dangerous things?",
              options: [
                "It’s part of his job.",
                "He always thinks of how to avoid possible dangers.",
                "It’s frightening.",
                "It’s enjoyable.",
              ],
              correct: 0,
              explanation:
                "It’s not a question of enjoying it - it’s just that you can’t do what I do without thinking about the possible dangers. I’m never frightened though. If I’m taking a group up a mountain or something like that, I just concentrate on what I have to do and get on with it. (A) (Vấn đề không phải là yêu thích nó hay không, vấn đề ở đây là bạn không thể làm một việc gì đó mà không nghĩ đến những rủi ro tiềm tàng. Mặc dù vậy, tôi không phải người dễ bị sợ hãi. Nếu tôi dẫn một nhóm người lên một ngọn núi thì tôi sẽ chỉ cần tập trung vào những gì mình phải làm rồi kiên trì thực hiện nó.(A)",
            },
            {
              id: "p2e26q4",
              question: "What is Harry’s favourite place?",
              options: ["a mountain", "a building", "a river", "valley"],
              correct: 1,
              explanation:
                "It’s in India. You travel along a river through spectacular scenery and up into the mountains in Madhya Pradesh. In the valley on the other side there’s a wonderful old castle. It’s magical. (B)The mountains hide it, so few people know it’s there ... (Chỗ đó ở Ấn Độ. Bạn sẽ đi dọc theo một con sông với cảnh quan đẹp mê hồn rồi đi lên ngọn núi Madhya Pradesh. Trong thung lũng ở phía bên kia, có một tòa lâu đài cổ rất đẹp. Nó giống như phép màu vậy. (B)Những ngọn núi bao bọc tòa lâu đài, vì thế nên rất ít người biết là nó tồn tại.)",
            },
          ],
        },
        {
          id: "p2e27",
          label: "Bai 27",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 27.mp3",
          transcript:
            "M Now Linda, let’s talk about your first job. W Well, I was an assistant in an expensive cake shop in the small town where I lived. It was my last year at school, before I went to college. I wanted to earn extra money for myself because I come from a family of seven and my parents couldn’t afford to give us much pocket money. M Did you like your first boss? W He was always polite, never shouted at us, even when we dropped thing and that was good for a young girl like me who wasn’t very confident. He knew everything about the business. I had no proper training, but it was good experience working for someone with so much knowledge. He didn’t pay us well, but I didn’t expect to earn much in my first job. M And what about the shop? Was it a nice place to work? W As I say, it was an expensive shop, and the cakes were beautiful. Then in the morning there was this wonderful smell of bread baking. The first week was difficult because I just wanted to eat the cakes which wasn’t allowed  but then I lost interest in them. We had to keep everything clean, and that was hard work. M Did you do any of the baking yourself? W There were two chefs who were specialists in making cakes for celebrations and creating new bread recipes I loved watching them at work, but I wasn’t allowed to touch the ones on display in the windows. We sold sandwiches at lunchtime again, very luxurious ones and the shop assistants had to make those I learn to put in really generous fillings, much more than I used at home. M How did you get on with the other shop assistants? W One of them was my best friend, which was great, but the full-time staff some treated us like silly schoolgirls because we couldn’t cook. But I was surprised because the full-time assistants couldn’t add up in their head. I was good at it, but they used calculators if there was anything difficult to work out. M Did you enjoy serving customers in the shop? W The best part of the day was lunchtime, when we were busy. Time just flew. Then it was interesting when people came in to plan a party or a wedding. One of the chefs would come through to discuss the design of the cake. Some customers thought the prices were too high, but usually ended up buying the cakes anyway.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Now Linda, let’s talk about your first job.",
            },
            {
              speaker: "Woman",
              text: "Well, I was an assistant in an expensive cake shop in the small town where",
            },
            { speaker: "Man", text: "Did you like your first boss?" },
            {
              speaker: "Woman",
              text: "He was always polite, never shouted at us, even when we dropped thing",
            },
            {
              speaker: "Man",
              text: "And what about the shop? Was it a nice place to work?",
            },
            {
              speaker: "Woman",
              text: "As I say, it was an expensive shop, and the cakes were beautiful. Then in",
            },
            { speaker: "Man", text: "Did you do any of the baking yourself?" },
            {
              speaker: "Woman",
              text: "There were two chefs who were specialists in making cakes for",
            },
            {
              speaker: "Man",
              text: "How did you get on with the other shop assistants?",
            },
            {
              speaker: "Woman",
              text: "One of them was my best friend, which was great, but the full-time staff",
            },
            {
              speaker: "Man",
              text: "Did you enjoy serving customers in the shop?",
            },
            {
              speaker: "Woman",
              text: "The best part of the day was lunchtime, when we were busy. Time just",
            },
          ],
          questions: [
            {
              id: "p2e27q1",
              question: "Why did Linda like her first boss?",
              options: [
                "paid her well.",
                "was kind to her.",
                "sent her on a training course.",
                "made her become confident.",
              ],
              correct: 1,
              explanation:
                "He was always polite, never shouted at us, even when we dropped things (B); and that was good for a young girl like me who wasn’t very confident. He knew everything about the business. I had no proper training, but it was good experience working for someone with so much knowledge. He didn’t pay us well, but I didn’t expect to earn much in my first job. (Anh ấy rất lịch sự, không bao giờ la mắng chúng tôi, ngay cả khi chúng tôi làm rơi đồ(B). Điều này đã để lại ấn tượng khó phai cho một cô gái trẻ thiếu tự tin như tôi. Anh ấy biết mọi thứ về kinh doanh. Tôi chưa được đào tạo gì cả, tuy nhiên tôi đã có kinh nghiệm làm việc cho những người có đầu óc kinh doanh rất tốt. Anh ấy trả lương cho chúng tôi không cao lắm, nhưng dù sao tôi cũng không mong kiếm được nhiều tiền ngay ở công việc đầu tiên.)",
            },
            {
              id: "p2e27q2",
              question: "What did Linda enjoy about working in the shop?",
              options: [
                "eating the cakes",
                "the smell of baking",
                "the clean workplace",
                "friendly co-workers.",
              ],
              correct: 1,
              explanation:
                "It was an expensive shop, and the cakes were beautiful. Then in the morning there was this wonderful smell of bread baking (B). The first week was difficult because I just wanted to eat the cakes, which wasn’t allowed, but then I lost interest in them. We had to keep everything clean, and that was hard work. (Đó là một cửa hàng khá đắt đỏ với những chiếc bánh rất đẹp. Vào buổi sáng, cửa hàng đầy mùi bánh mỳ nướng rất hấp dẫn.(B) Tuần đầu tiên rất khó khăn vì tôi chỉ muốn ăn những chiếc bánh mà tôi không được phép. Nhưng bây giờ tôi không còn ham muốn đấy nữa. Công việc của tôi bây giờ là giữ gìn mọi thứ thật sạch, đó là một công việc thật sự khó khăn.)",
            },
            {
              id: "p2e27q3",
              question: "In the shop, what did Linda help with?",
              options: [
                "baking bread.",
                "displaying cakes.",
                "making sandwiches.",
                "creating new bread recipes.",
              ],
              correct: 2,
              explanation:
                "There were two chefs who were specialists in making cakes for celebrations, and creating new bread recipes. I loved watching them at work, but I wasn’t allowed to touch the ones on display in the windows. We sold sandwiches at lunchtime - again, very luxurious ones, and the shop assistants had to make those. (C) (Chúng tôi có hai đầu bếp là chuyên gia làm bánh cho các dịp đặc biệt và tạo ra những công thức làm bánh mới. Tôi rất thích ngắm họ làm việc! Với những chiếc bánh được trưng bày trên cửa sổ thì tôi không được phép chạm vào. Công việc của tôi là bán bánh sandwitch vào giờ ăn trưa. Những chiếc bánh này do thợ của cửa hàng làm và giá của chúng rất đắt.(C)",
            },
            {
              id: "p2e27q4",
              question:
                "What does Linda say about the full-time shop assistants?",
              options: [
                "were friendly to her.",
                "hadn’t got the same skills as her.",
                "helped her a lot with her work.",
                "didn’t work as hard as her.",
              ],
              correct: 1,
              explanation:
                "One of them was my best friend, which was great, but the full-time staff some treated us like silly schoolgirls because we couldn’t cook. But I was surprised because the full-time assistants couldn’t add up in their head. I was good at it, but they used calculators if there was anything difficult to work out. (B) (Một trong số họ là bạn thân của tôi, cô ấy rất tuyệt vời. Nhưng những nhiên viên toàn thời gian ở đó lại cư xử với chúng tôi như những đứa trẻ ngu ngốc bởi vì chúng tôi không biết nấu nướng. Nhưng tôi thấy ngạc nhiên khi nhân viên toàn thời gian không thể tính nhẩm, họ phải dùng đến máy tính với những phép tính phức tạp, trong khi tôi rất giỏi việc đó.(B)",
            },
          ],
        },
        {
          id: "p2e28",
          label: "Bai 28",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 28.mp3",
          transcript:
            "M Today we have with us in the studio Lucy Rainbow, who earns her living as a painter. Good morning, Lucy. Can you tell us about your job? W Well, I don’t paint pretty pictures you can hang on your walls at home. Mainly I work in the theatre painting the background scenery for plays I’ve also done a couple of CD covers. That was great, because I got to meet my favourite pop stars. M So how did all this start?  W Well, I always intended to become a proper artist. But I couldn’t sell any of my paintings, and anyway I got bored working alone! I was offered a job in an advertising agency but the idea of working in a theatre attracted me more. I get the chance to paint something different every day. I get paid reasonably well, and I work with a team of wonderful people. M So you enjoy your work, but doesn’t it have any disadvantages? W Mostly, I love it. The only thing that causes me stress is that often I have too many things to do at the same time while at other times I have nothing to do. It’s difficult to organise my time, but I always make sure I stop for lunch. M How many hours do you work on an average day? W There’s no such thing as an average day! But generally, I start work at eight in the morning, and go through until seven. That makes it an eleven-hour day, which is much longer than the eight hours that most people work. M Is your journey to work difficult? W Not really. My dream job would be one where I could walk to work but that hasn’t happened yet. I could drive to the theatre, but that makes me tired and I get a lot of my best ideas when I’m on my way to work, on the bus or train. M Do you have time for any hobbies? W Not as much as I’d like. I used to play a lot of tennis until I hurt my ankle and I was a regular visitor to an art gallery near my home until it closed down. In the little spare time I have, I’m doing a course in computer graphics. I hope what I learn will help me in my job. M Well, thank you, Lucy. It’s been interesting talking to you.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Today we have with us in the studio Lucy Rainbow, who earns her living",
            },
            {
              speaker: "Woman",
              text: "Well, I don’t paint pretty pictures you can hang on your walls at home.",
            },
            {
              speaker: "Man",
              text: "ainly I work in the theatre painting the background scenery for plays I’ve",
            },
            { speaker: "Man", text: "So how did all this start?" },
            {
              speaker: "Woman",
              text: "Well, I always intended to become a proper artist. But I couldn’t sell any",
            },
            {
              speaker: "Man",
              text: "So you enjoy your work, but doesn’t it have any disadvantages?",
            },
            {
              speaker: "Woman",
              text: "Mostly, I love it. The only thing that causes me stress is that often I have",
            },
            {
              speaker: "Man",
              text: "How many hours do you work on an average day?",
            },
            {
              speaker: "Woman",
              text: "There’s no such thing as an average day! But generally, I start work at eight",
            },
            { speaker: "Man", text: "Is your journey to work difficult?" },
            {
              speaker: "Woman",
              text: "Not really. My dream job would be one where I could walk to work but",
            },
            { speaker: "Man", text: "Do you have time for any hobbies?" },
            {
              speaker: "Woman",
              text: "Not as much as I’d like. I used to play a lot of tennis until I hurt my ankle",
            },
            {
              speaker: "Man",
              text: "Well, thank you, Lucy. It’s been interesting talking to you.",
            },
          ],
          questions: [
            {
              id: "p2e28q1",
              question: "What does Lucy usually paint?",
              options: [
                "scenery for stage plays",
                "pictures of pop stars",
                "the walls in people’s homes",
                "pictures on people’s homes",
              ],
              correct: 0,
              explanation:
                "I don’t paint pretty pictures you can hang on your walls at home. Mainly, I work in a theatre, painting the background scenery for plays. (Tôi không vẽ những bức tranh mà bạn có thể treo lên tường nhà. Công việc của tôi chủ yếu là vẽ những bức tranh nền cho các vở kịch ở trong rạp hát. )",
            },
            {
              id: "p2e28q2",
              question: "What does Lucy say about her present job?",
              options: [
                "she enjoys working by herself.",
                "she chose it because she couldn’t get a job in advertising.",
                "She earns a good salary.",
                "It does not need any special skills.",
              ],
              correct: 2,
              explanation:
                "I always intended to become a proper artist. But I couldn’t sell any of my paintings, and anyway I got bored working alone! I was offered a job in an advertising agency, but the idea of working in a theatre attracted me more. I get the chance to paint something different every day, I get paid reasonably well (C), and I work with a team of wonderful people. (Tôi luôn muốn trở thành một họa sĩ đúng nghĩa. Nhưng tôi không thể bán được bức tranh nào cả. Hơn nữa tôi cũng cảm thấy buồn chán khi phải làm việc một mình. Tôi đã từng được nhận làm trong một công ty quảng cáo nhưng ý tưởng làm việc trong một rạp hát hấp dẫn tôi hơn. Tôi có cơ hội vẽ nhiều thứ khác nhau mỗi ngày, hơn nữa, tôi cũng được trả lương khá cao (C) và được làm việc với những người tuyệt vời.)",
            },
            {
              id: "p2e28q3",
              question: "What does Lucy find difficult about her work?",
              options: [
                "She sometimes misses lunch.",
                "Some days are too busy.",
                "She always has too much work to do.",
                "She feel bored because she doesn’t have much to do.",
              ],
              correct: 1,
              explanation:
                "The only thing that causes me stress is that often I have too many things to do at the same time, while at other times I have nothing to do. It’s difficult to organise my time, but I always make sure I stop for lunch. (Thứ duy nhất khiến tôi bị căng thẳng là có khi tôi phải làm quá nhiều việc cùng một lúc, trong khi vào nhiều lúc khác tôi lại chẳng có gì để làm. Vì thế mà tôi gặp khó khăn trong việc quản lý thời gian của mình, dù vậy tôi vẫn cố gắng đảm bảo ăn trưa đúng giờ.)",
            },
            {
              id: "p2e28q4",
              question: "How does Lucy get to work?",
              options: ["by bus or train", "by car", "on foot", "by bike"],
              correct: 0,
              explanation:
                "My dream job would be one where I could walk to work, but that hasn’t happened yet. I could drive to the theatre, but that makes me tired and I get a lot of my best ideas when I’m on my way to work, on the bus or train (A). (Tôi muốn một công việc mà tôi có thể đi bộ đi làm nhưng hiện tại điều ấy vẫn chưa thành hiện thực. Tôi đã có thể lái ô tô đến rạp hát nhưng như vậy thì tôi sẽ thấy rất mệt. Cuối cùng tôi đã đi làm bằng xe buýt hoặc tàu, nó giúp tôi nảy ra một vài ý tưởng hay ho.(A)",
            },
          ],
        },
        {
          id: "p2e29",
          label: "Bai 29",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 29.mp3",
          transcript:
            "W My guest today is Tim Jones, who organizes an international summer course for young musicians. Tim tell us all about it. M Well, I’m lucky to have such a great job. Basically, young musicians come from all over the world and learn to play together as an orchestra. By the end of the six- week course, they’re really good and hearing them play is what gives me most pleasure. Unfortunately, I don’t get to know them all that well, as organizing every single detail of the course keeps me busy. W So, how do you find the young musicians? M We advertise on the Internet. Anyone between the ages of sixteen and twenty can complete the application form and email it to us along with a short recording of their playing. We’re not looking for perfect performances or the stars of tomorrow just people good enough to play in an orchestra. The course is in English but only a basic level of spoken language is necessary. W And the teachers?  M The teachers are well-known musicians. Because they want to help young people, they do this work for a very low salary which is very kind of them. But it’s my job to take care of them and make sure they’re happy with their accommodation and so on. They generally have a great time, but some of them can be a bit difficult and sometimes complain about things. W So where is the course held? M In different places each year, actually, but it’s usually a university during the summer holidays. They have large halls for practicing, plus plenty of bedrooms and dining- rooms. Most importantly, though, the place has to have good rail, road and air connections so somewhere in the middle of the countryside’s no good. W Do the students bring their own instruments? M Mostly, yes. So, another thing to consider is security. Storing instruments in a locked room when they’re not being used is essential. Can you imagine a hundred or more musical instruments lying around violins, trumpets, flutes, cellos - all worth a lot of money. It would be terrible if one got damaged, or even worse stolen! W And at the end of the course, there’s a concert tour. M That\'s right. I book concert halls and work out the programmes months in advance. It’s important to get it right. Ticket prices aren’t high, because we’re not a professional orchestra but lots of people buy them. We don’t make a profit, but take enough money to pay for the students’ travel and living expenses. It’s a fantastic experience for them.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "My guest today is Tim Jones, who organizes an international summer",
            },
            {
              speaker: "Man",
              text: "Well, I’m lucky to have such a great job. Basically, young musicians come",
            },
            {
              speaker: "Woman",
              text: "So, how do you find the young musicians?",
            },
            {
              speaker: "Man",
              text: "We advertise on the Internet. Anyone between the ages of sixteen and",
            },
            { speaker: "Woman", text: "And the teachers?" },
            {
              speaker: "Man",
              text: "The teachers are well-known musicians. Because they want to help young",
            },
            { speaker: "Woman", text: "So where is the course held?" },
            {
              speaker: "Man",
              text: "In different places each year, actually, but it’s usually a university during",
            },
            {
              speaker: "Woman",
              text: "Do the students bring their own instruments?",
            },
            {
              speaker: "Man",
              text: "Mostly, yes. So, another thing to consider is security. Storing instruments",
            },
            {
              speaker: "Woman",
              text: "And at the end of the course, there’s a concert tour.",
            },
            {
              speaker: "Man",
              text: "That\'s right. I book concert halls and work out the programmes months in",
            },
          ],
          questions: [
            {
              id: "p2e29q1",
              question: "What does Tim enjoy most about his job?",
              options: [
                "sorting out all the details",
                "getting to know the musicians",
                "listening to lots of good music",
                "meeting some famous musicians",
              ],
              correct: 2,
              explanation:
                "I’m lucky to have such a great job. Basically, young musicians come from all over the world and learn to play together as an orchestra. By the end of the six- week course, they’re really good and hearing them play is what gives me most pleasure.(C) (Tôi thấy may mắn khi có được công việc tuyệt vời như vậy. Bình thường, các nhạc sĩ trẻ sẽ đi khắp thế giới và học cách chơi nhạc với nhau như một dàn nhạc. Sau khi kết thúc khóa học kéo dài 6 tuần, kỹ năng của họ sẽ tốt hơn rất nhiều, nên ngồi nghe họ chơi nhạc đem lại cho tôi niềm vui bất tận.(C)",
            },
            {
              id: "p2e29q2",
              question: "What does Tim say about the teachers on the course?",
              options: [
                "usually enjoy themselves.",
                "are always complaining.",
                "are extremely well-paid.",
                "They are difficult.",
              ],
              correct: 0,
              explanation:
                "The teachers are well-known musicians. Because they want to help young people, they do this work for a very low salary, which is very kind of them. But it’s my job to take care of them and make sure they’re happy with their accommodation and so on. They generally have a great time , but some of them can be a bit difficult and sometimes complain about things. (Giáo viên ở đây đều là nhạc sĩ nổi tiếng. Bởi vì họ có lòng tốt bụng muốn giúp đỡ những người trẻ, mặc dù lương mà họ nhận được rất thấp. Công việc của tôi là chăm sóc cho họ, đảm bảo rằng họ thoải mái với chỗ ở, vân vân. Bình thường họ rất vui vẻ, nhưng thỉnh thoảng, họ hơi khó tính và phàn nàn về vài thứ.)",
            },
            {
              id: "p2e29q3",
              question: "Where is the course held?",
              options: [
                "a place which is specially designed for musicians.",
                "is convenient for public transport.",
                "is a long way from a big City.",
                "in the middle of the countryside.",
              ],
              correct: 1,
              explanation:
                "In different places each year, actually, but it’s usually a university during the summer holidays. They have large halls for practicing, plus plenty of bedrooms and dining- rooms. Most importantly, though, the place has to have good rail, road and air connections. (B) (Mỗi năm sẽ được tổ chức tại một nơi khác nhau, nhưng thường thì sẽ tại một trường đại học trong suốt kỳ nghỉ hè. Ở đó có những hội trường rộng để luyện tập và nhiều phòng ngủ và phòng ăn. Quan trọng nhất là ở chỗ này có tuyến đường sắt và đường xá thuận lợi.(B)",
            },
            {
              id: "p2e29q4",
              question:
                "What does Tim say about the concert tour after the course?",
              options: [
                "It has to make a lot of money",
                "It needs to be carefully planned",
                "It’s difficult to sell tickets",
                "It’s a good experience for both students and Tim.",
              ],
              correct: 1,
              explanation: "B",
            },
          ],
        },
        {
          id: "p2e30",
          label: "Bai 30",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 30.mp3",
          transcript:
            "M Today, I’m talking to Marta Stanston, who runs her own ‘mobile’ restaurant. Marta, How did you get into the restaurant business? W Well, I learnt to cook at college. I always wanted to open my own restaurant but had no money so I got a job as a chef. I had all sorts of ideas for new dishes, which the staff thought would sell but the guy who owned the place wasn’t interested. That’s when a friend told me about the ‘mobile restaurant’ idea. It sounded great. M Tell us about it. W Well, it works like this: you decide on a menu obviously you have to be able to cook then you advertise it so people can book a meal. The most amazing thing is all the advertising’s done through social-networking websites. People set up tables in their sitting-room, or in a City car park, an empty factory - anywhere in fact. And because you know how many people you’re cooking for, food doesn’t get wasted. M So why was it good for you? W Well, various reasons. Like, I could buy all the ingredients without risk because you make customers pay in advance. The greatest advantage, though, is by having a maximum of ten customers. I didn’t need to hire a waiter. Then, of course, I could prepare everything at home just take a camping gas cooker with me, plus some plates, glasses, knives and forks.  M Do you never run into problems? W The whole experience is fun. People watch you cook and the atmosphere’s relaxed. I did one meal on a beach which almost went wrong because I didn’t think about the wind blowing sand into people’s food. Fortunately, I’d brought a large umbrella to protect myself from the sun so I put it around their table instead! M And you sometimes use your own flat? W If the weather’s bad, people come to my home instead, but it gets very crowded. Even though I’ve actually got enough chairs and a big table, it’s not ideal. I was worried we might disturb the neighbours but they’ve been alright about it. I love the temporary feel of the mobile idea, so home’s not really what it’s about. M So, what’s the future of mobile restaurants? W Well, it’s rather uncertain. Lots of new ones are popping up because it’s become fashionable. I think health inspectors will want to check them out. That doesn’t worry me, because I’m a trained chef. But if someone got ill in a less serious one, we might all get a bad name. So I guess inspections are a good thing.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Today, I’m talking to Marta Stanston, who runs her own ‘mobile’",
            },
            {
              speaker: "Woman",
              text: "Well, I learnt to cook at college. I always wanted to open my own",
            },
            { speaker: "Man", text: "Tell us about it." },
            {
              speaker: "Woman",
              text: "Well, it works like this: you decide on a menu obviously you have to be",
            },
            { speaker: "Man", text: "So why was it good for you?" },
            {
              speaker: "Woman",
              text: "Well, various reasons. Like, I could buy all the ingredients without risk",
            },
            { speaker: "Man", text: "Do you never run into problems?" },
            {
              speaker: "Woman",
              text: "The whole experience is fun. People watch you cook and the atmosphere’s",
            },
            { speaker: "Man", text: "And you sometimes use your own flat?" },
            {
              speaker: "Woman",
              text: "If the weather’s bad, people come to my home instead, but it gets very",
            },
            {
              speaker: "Man",
              text: "So, what’s the future of mobile restaurants?",
            },
            {
              speaker: "Woman",
              text: "Well, it’s rather uncertain. Lots of new ones are popping up because it’s",
            },
          ],
          questions: [
            {
              id: "p2e30q1",
              question: "What did Marta dislike about her first job?",
              options: [
                "It was really badly paid.",
                "The boss didn’t listen to her.",
                "She found the staff unfriendly.",
                "The restaurant was mobile.",
              ],
              correct: 1,
              explanation:
                "I learnt to cook at college. I always wanted to open my own restaurant – but had no money. So I got a job as a chef. I had all sorts of ideas for new dishes, which the staff thought would sell, but the guy who owned the place wasn’t interested. (B)That’s when a friend told me about the ‘mobile restaurant’ idea. (Tôi đã học nấu ăn ở trường đại học. Tôi luôn luôn muốn mở một nhà hàng của riêng mình nhưng chưa có đủ tiền. Vì vậy, hiện tại tôi làm đầu bếp. Tôi đã có mọi ý tưởng cho những món ăn mới. Đây là thứ mà nhân viên nghĩ sẽ bán, nhưng ông chủ của chỗ đó không có hứng thú với ý tưởng đó. (B)Đó là khi một người bạn nói với tôi về ý tưởng “nhà hàng di động”.)",
            },
            {
              id: "p2e30q2",
              question:
                "At first, what did Marta find most surprising about mobile restaurants?",
              options: [
                "They are only advertised online.",
                "Food never gets thrown away.",
                "Menus can be easily changed.",
                "People enjoy their meals in any place.",
              ],
              correct: 0,
              explanation:
                "The most amazing thing is all the advertising’s done through social networking websites. (Điểu kỳ lạ nhất là mọi thứ liên quan đến quảng cáo đều được thực hiện qua các trang mạng xã hội.)",
            },
            {
              id: "p2e30q3",
              question:
                "What made Marta have difficulty serving food on a beach?",
              options: [
                "the sun.",
                "the rain.",
                "the wind.",
                "not being allowed to eat on the beach.",
              ],
              correct: 2,
              explanation:
                "People watch you cook and the atmosphere’s relaxed. I did one meal on a beach which almost went wrong because I didn’t think about the wind blowing sand into people’s food. (C)Fortunately, I’d brought a large umbrella to protect myself from the sun, so I put it around their table instead! (Mọi người sẽ xem bạn nấu ăn và không khí thì rất thoải mái. Tôi đã nấu một bữa trên biển, nhưng mọi thứ đều hỏng bét vì gió thổi khiến cát bay vào đồ ăn của mọi người. (C)May mắn là tôi đã đem theo một cái ô lớn để che nắng, nên tôi đã dùng cái ô đó để che lên bàn ăn.)",
            },
            {
              id: "p2e30q4",
              question: "What worries Marta about the future? 38",
              options: [
                "mobile restaurants going out of fashion",
                "the wrong people opening restaurants like hers",
                "health inspectors coming to her restaurant",
                "people getting ill because of bad food.",
              ],
              correct: 0,
              explanation:
                "It’s rather uncertain. Lots of new ones are popping up because it’s become fashionable. I think health inspectors will want to check them out. That doesn’t worry me, because I’m a trained chef. But if someone got ill in a less serious one, we might all get a bad name. (Mọi thứ đều chưa chắc chắn. Rất nhiều người mới cũng nhảy vào làm công việc này bởi vì nó đang rất hot. Tôi nghĩ thanh tra thực phẩm sẽ kiểm tra họ. Điều này không khiến tôi lo lắng vì bản thân tôi đã là đầu bếp. Nhưng nếu một khách hàng nào đó gặp phải vấn đề sức khỏe thì tất cả sẽ đều chịu tiếng xấu.)",
            },
          ],
        },
        {
          id: "p2e31",
          label: "Bai 31",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 31.mp3",
          transcript:
            "W Jack Salter is a young Canadian who has just won the young photographer of the year competition. Jack, is that right you started out taking photos of Street signs? M That’s right. I’ve been serious about photography for about a year, maybe a year and a half but I’ve been taking photos ever since I was little. I probably first picked up a camera when I was about seven and went around taking photos of street signs of all shapes and sizes. My mother tells me it was all down to my being attracted to the bright colours. I guess she’s right. W Can you tell me a little about the winning photograph? M It was the first day of dry weather for a while and I decided to go out and play around with some new kit for my camera. I started off in my own yard. There wasn’t much to photograph though until this butterfly happened to land on a large flower, and fortunately I was able to get what turned out to be the prizewinning photo. W Were you happy with the photograph? M I was lucky actually, because on the camera screen the butterfly didn’t look terribly amazing. I could see that it was in a great position and the background scene was nice and clear but you couldn’t see the pattern on its wings because of the size of the screen. It was only when I saw the picture on the computer that I realized how good it was. W What do you think of the other photos from the competition?  M I’ve seen the work on display with mine and the standard is hard to believe. There are photos of animals and plants from all over the world and you can see the work of photographers from places as far apart as Russia and Australia. W Has anything changed for you since winning the competition? M That’s a hard question. Before winning I’d been concentrating mainly on taking photos of people, although after coming to London for the exhibition and talking to all the other photographers I intend to get more into doing shots of landscapes in different countries. W Do you have any advice for young people starting out in photography? M Don’t make excuses. My entry was taken with an excellent camera but that’s not everything. My method is just to get out there, and do it and you don’t have to go far to get the shot, you’ll find something. You’ll start to love it.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Jack Salter is a young Canadian who has just won the young photographer",
            },
            {
              speaker: "Man",
              text: "That’s right. I’ve been serious about photography for about a year, maybe",
            },
            {
              speaker: "Woman",
              text: "Can you tell me a little about the winning photograph?",
            },
            {
              speaker: "Man",
              text: "It was the first day of dry weather for a while and I decided to go out and",
            },
            { speaker: "Woman", text: "Were you happy with the photograph?" },
            {
              speaker: "Man",
              text: "I was lucky actually, because on the camera screen the butterfly didn’t look",
            },
            {
              speaker: "Woman",
              text: "What do you think of the other photos from the competition?",
            },
            {
              speaker: "Man",
              text: "I’ve seen the work on display with mine and the standard is hard to believe.",
            },
            {
              speaker: "Woman",
              text: "Has anything changed for you since winning the competition?",
            },
            {
              speaker: "Man",
              text: "That’s a hard question. Before winning I’d been concentrating mainly on",
            },
            {
              speaker: "Woman",
              text: "Do you have any advice for young people starting out in photography?",
            },
            {
              speaker: "Man",
              text: "Don’t make excuses. My entry was taken with an excellent camera but",
            },
          ],
          questions: [
            {
              id: "p2e31q1",
              question:
                "Why did Jack go into his yard to take his winning photo?",
              options: [
                "He wanted to be out in the sunshine.",
                "He was looking for shots of flowers.",
                "He was trying out some new equipment.",
                "He wanted to take photos of his own yard.",
              ],
              correct: 2,
              explanation:
                "It was the first day of dry weather for a while, and I decided to go out and play around with some new kit for my camera. I started off in my own yard. (Đó là ngày đầu tiên thời tiết khô ráo sau một thời gian. Tôi quyết định đi ra ngoài và thử dùng cái máy ảnh mới. Tôi bắt đầu với cái sân.)",
            },
            {
              id: "p2e31q2",
              question:
                "How did Jack feel when he first looked at his winning photo?",
              options: [
                "proud of how good it was.",
                "worried about the background.",
                "the photo was terrible.",
                "unsure how clear the detail was.",
              ],
              correct: 2,
              explanation:
                "On the camera screen the butterfly didn’t look terribly amazing. I could see that it was in a great position and the background scene was nice and clear, but you couldn’t see the pattern on its wings because of the size of the screen. (Khi nhìn trên màn hình máy ảnh thì bức ảnh không được đẹp lắm. Mặc dù vị trí và khung nền rất đẹp và rõ ràng nhưng bạn không thể nhìn thấy điểm nhấn trên đôi cảnh bướm vì kích cỡ của màn hình.)",
            },
            {
              id: "p2e31q3",
              question:
                "Why was Jack surprised by the other photos from the competition?",
              options: [
                "because the quality was so high.",
                "because the styles were so similar.",
                "because the subjects were so unusual.",
                "because they are sent from faraway places.",
              ],
              correct: 0,
              explanation:
                "I’ve seen the work on display with mine and the Standard is hard to believe. There are photos of animals and plants from all over the world, and you can see the work of photographers from places as far apart as Russia and Australia. (Tôi đã thấy tác phẩm được trưng bày và chất lượng của bức ảnh thực sự ngoài sức tưởng tượng. Ở đó có ảnh của động vật và cây cối từ khắp nơi trên thế giới, bạn có thể thấy tác phẩm của các nhiếp ảnh gia từ những nơi xa xôi như Nga hay Úc.)",
            },
            {
              id: "p2e31q4",
              question:
                "What does Jack want to do after winning the competition?",
              options: [
                "get ideas from other photographers.",
                "come to London for another exhibition.",
                "take more photos of people.",
                "take more photos of landscapes.",
              ],
              correct: 3,
              explanation:
                "Before winning I’d been concentrating mainly on taking photos of people, although after coming to London for the exhibition and talking to all the other photographers, I intend to get more into doing shots of landscapes in different countries. (Trước khi giành được giải, tôi chỉ tập trung vào chụp ảnh con người, mặc dù sau khi đến buổi triển lãm ở Luân Đôn và nói chuyện với những nhiếp ảnh gia khác, tôi dự định sẽ chụp khung cảnh thiên nhiên ở nhiều quốc gia khác nhau.)",
            },
          ],
        },
        {
          id: "p2e32",
          label: "Bai 32",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 32.mp3",
          transcript:
            "M My guest today is Amy Rowntree, who’s a fashion designer. Amy, when did you decide you wanted a career in fashion? W Well, I started experimenting with the clothes I wore myself while I was still at school. It wasn’t until I left school and worked as an assistant in a big store though that I knew I wanted a career in fashion. It was after that I got involved in running fashion shows. M So, what skills does a fashion designer need? W Well, you need to know how to turn your first idea into clothes that are ready for someone to wear. It’s useful to know about materials like wool and cotton. The essential thing though is a knowledge of the techniques used in creating clothes. You also have to be patient, especially at the start of your career. M What do you find most enjoyable about working in fashion? W It’s pleasing to see an idea come to life when you see the clothes in a show. It’s also great to go from being completely unknown, to fashion stores knowing exactly who you are when you ring up that’s the best thing about it for me it’s hard work selling my designs but it’s good to earn money doing something you love. M And what about the current fashion scene? W I feel that the main aim now is to make clothes easy for people to wear. I understand that’s important and actually sports clothes are what make the most money for the fashion industry. But I think you need to design really beautiful clothes too. I’d like to see more of fashion as a kind of art. M Do you find it easy to think of new designs? W Oh, yes. I get ideas all the time, and I draw them so that I don’t forget them. And I take photos too. I often get my ideas from things I see when I’m out in streets and parks. I don’t get many ideas from clothes in museums although I know other designers do. M And are you working on any new projects at the moment? W Well, my big ambition is to put on a fashion show in New York, but no luck yet! I’ve been asked to design the clothes for a film though, so I’m  working on that. It’ll be out next summer. And I’m talking with a big store in London about the possibility of doing a special range of suits for men. M Really",
          speakerLines: [
            {
              speaker: "Man",
              text: "My guest today is Amy Rowntree, who’s a fashion designer. Amy, when",
            },
            {
              speaker: "Woman",
              text: "Well, I started experimenting with the clothes I wore myself while I was",
            },
            {
              speaker: "Man",
              text: "So, what skills does a fashion designer need?",
            },
            {
              speaker: "Woman",
              text: "Well, you need to know how to turn your first idea into clothes that are",
            },
            {
              speaker: "Man",
              text: "What do you find most enjoyable about working in fashion?",
            },
            {
              speaker: "Woman",
              text: "It’s pleasing to see an idea come to life when you see the clothes in a show.",
            },
            {
              speaker: "Man",
              text: "And what about the current fashion scene?",
            },
            {
              speaker: "Woman",
              text: "I feel that the main aim now is to make clothes easy for people to wear. I",
            },
            {
              speaker: "Man",
              text: "Do you find it easy to think of new designs?",
            },
            {
              speaker: "Woman",
              text: "Oh, yes. I get ideas all the time, and I draw them so that I don’t forget them.",
            },
            {
              speaker: "Man",
              text: "And are you working on any new projects at the moment?",
            },
            {
              speaker: "Woman",
              text: "Well, my big ambition is to put on a fashion show in New York, but no",
            },
            { speaker: "Man", text: "Really" },
          ],
          questions: [
            {
              id: "p2e32q1",
              question:
                "According to Amy, what is the most important skill for a designer?",
              options: [
                "remaining patient in difficult situations.",
                "knowing about different materials.",
                "knowing how to make clothes.",
                "turning your idea into product.",
              ],
              correct: 2,
              explanation:
                "You need to know how to turn your first idea into clothes that are ready for someone to wear. It’s useful to know about materials like wool and cotton. The essential thing though is a knowledge of the techniques used in creating clothes. (C) (Bạn cần biết biến ý tưởng thành những bộ quần áo cho khách hàng mặc. Bạn cũng cần hiểu rõ về các loại chất liệu như len hay bông. Nhưng cái quan trọng nhất là bạn phải biết may quần áo thành thạo.(C)",
            },
            {
              id: "p2e32q2",
              question: "What does Amy particularly like about her work?",
              options: [
                "being able to sell her designs",
                "seeing her clothes on display",
                "having her name recognized.",
                "earning a good salary.",
              ],
              correct: 1,
              explanation:
                "It’s pleasing to see an idea come to life when you see the clothes in a show. It’s also great to go from being completely unknown, to fashion stores knowing exactly who you are when you ring up - that’s the best thing about it (B)for me it’s hard work selling my designs, but it’s good to earn money doing something you love. (Thật vui khi nhìn thấy ý tưởng của mình được thể hiện qua những bộ trang phục được trưng bày trong các show diễn thời trang. Cũng thật vui khi bản thân đi từ một người không được biết đến thành một nhà thiết kế được nhiều cửa hàng thời trang biết đến. Đó là điều tuyệt vời nhất ở công việc này. (B) Đôi khi để bán được thiết kế của mình là chuyện không dễ dàng, nhưng dù sao cũng thật vui khi có thể kiếm tiền bằng cách làm việc mà mình yêu thích.)",
            },
            {
              id: "p2e32q3",
              question: "What helps Amy find new ideas for designs?",
              options: [
                "Talking with other designers.",
                "going to visit museums.",
                "looking at photos of clothes.",
                "seeing things around her.",
              ],
              correct: 3,
              explanation:
                "I get ideas all the time, and I draw them so that I don’t forget them. And I take photos too. I often get my ideas from things I see when I’m out in streets and parks. (D)I don’t get many ideas from clothes in museums. (Lúc nào tôi cũng có ý tưởng, sau đó tôi phác họa ra để đỡ bị quên. Tôi cũng chụp ảnh nữa. Tôi thường lấy ý tưởng từ những thứ xung quanh tôi khi tôi đi dạo trên những con đường hay công viên. (D) Tôi không tìm thấy nhiều ý tưởng qua các trang phục được trưng bày trong bảo tàng.)",
            },
            {
              id: "p2e32q4",
              question: "What project is Amy working on at the moment?",
              options: [
                "a collection of clothes for a film",
                "a fashion show in New York",
                "a new range for a London store",
                "special clothes for her own store.",
              ],
              correct: 0,
              explanation:
                "My big ambition is to put on a fashion show in New York, but no luck yet! I’ve been asked to design the clothes for a film though, so I’m working on that. (A)It’ll be out next summer. And I’m talking with a big store in London about the possibility of doing a special range of suits for men. (Tôi rất muốn thực hiện một show diễn thời trang ở New York nhưng vẫn chưa thực hiện được. Hiện tại tôi đang nhận thiết kế trang phục cho một bộ phim. (A) Nó sẽ diễn ra vào mùa hè năm sau. Tôi cũng đang nói chuyện với một cửa hàng lớn ở Luân Đôn về việc thiết kế bộ suits đặc biệt chon nam giới.)154",
            },
          ],
        },
        {
          id: "p2e33",
          label: "Bai 33",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 33.mp3",
          transcript:
            "M Right, Sandra. You wanted to see me to get some feedback on your group’s proposal. The one you’re submitting for the Geography Society field trip competition. I’ve had a look through your proposal and I think it’s a really good choice. In fact, I only have a few things to say about it but even in an outline document like this you really have to be careful to avoid typos and problems with layout in the proposal and even in the contents page. So read it through carefully before submitting it, okay? W Will do. M And I’ve made a few notes on the proposal about things which could have been better sequenced. W Okay. M As for the writing itself, I’ve annotated the proposal as and where I thought it could be improved. Generally speaking, I feel you’ve often used complex structures and long sentences for the sake of it and as a consequence although your paragraphing and inclusion of subheadings help ... it’s quite hard to follow your train of thought at times. So cut them down a bit, can you? W Really? M Yes. And don’t forget simple formatting like numbering. W Didn’t I use page numbers? M I didn’t mean that. Look, you’ve remembered to include headers and footers, which is good, but listing ideas clearly is important. Number them or use bullet points, which is even clearer. Then you’ll focus the reader on your main points. I thought your suggestion to go to the Navajo Tribal Park was a very good idea. W I’ve always wanted to go there. My father was a great fan of cowboy films and the Wild West so I was subjected to seeing all the epics, many of which were shot there. As a consequence, it feels very familiar to me and it’s awesome both geographically and visually, so it’s somewhere I’ve always wanted to visit. The subsequent research I did and the online photographs made me even keener.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Right, Sandra. You wanted to see me to get some feedback on your group’s",
            },
            { speaker: "Woman", text: "Will do." },
            {
              speaker: "Man",
              text: "And I’ve made a few notes on the proposal about things which could have",
            },
            { speaker: "Woman", text: "Okay." },
            {
              speaker: "Man",
              text: "As for the writing itself, I’ve annotated the proposal as and where I thought",
            },
            { speaker: "Woman", text: "Really?" },
            {
              speaker: "Man",
              text: "Yes. And don’t forget simple formatting like numbering.",
            },
            { speaker: "Woman", text: "Didn’t I use page numbers?" },
            {
              speaker: "Man",
              text: "I didn’t mean that. Look, you’ve remembered to include headers and",
            },
            {
              speaker: "Woman",
              text: "I’ve always wanted to go there. My father was a great fan of cowboy films",
            },
          ],
          questions: [
            {
              id: "p2e33q1",
              question:
                "According to the tutor, what should Sandra do with her proposal?",
              options: [
                "make an outline of it.",
                "include a contents page.",
                "include more information.",
                "Avoid formatting problem.",
              ],
              correct: 3,
              explanation:
                "In an outline document like this you really have to be careful to avoid typos and problems with layout in the proposal, and even in the contents page. (Cho dù với dàn ý, chứ chưa phải bài hoàn chỉnh như thế này thì em cũng cần tránh những lỗi về đánh máy và bố cục của văn bản, thậm chí là cả bố cục của trang nội dung nữa.)",
            },
            {
              id: "p2e33q2",
              question:
                "What should Sandra do to make it easier to follow her proposal?",
              options: [
                "insert subheadings.",
                "use more paragraphs.",
                "shorten her sentences.",
                "Use some complex sentences.",
              ],
              correct: 2,
              explanation:
                "Generally speaking, I feel you’ve often used complex structures and long sentences... Although your paragraphing and inclusion of subheadings help ... it’s quite hard to follow your train of thought at times. So cut them down a bit, can you? (Nói chung, thầy thấy em hay dùng câu phức và câu dài. Mặc dù việc chia đoạn và đặt tiêu đề phụ cũng giúp bố cục bài viết rõ hơn, tuy nhiên đôi lúc thầy vẫn thấy khó theo dõi mạch văn của bài. Vì thế em nên cắt ngắn những câu dài ấy nhé!)",
            },
            {
              id: "p2e33q3",
              question:
                "What was the problem with the formatting on Sandra’s proposal?",
              options: [
                "Separate points were not clearly identified.",
                "There were no headers.",
                "The headings were not always clear.",
                "Page numbers were not inserted.",
              ],
              correct: 0,
              explanation:
                "You’ve remembered to include headers and footers, which is good, but listing ideas clearly is important. Number them or use bullet points, which is even clearer. (Em đã nhớ phải thêm tiêu đề và chân trang, như vậy rất là tốt, nhưng việc liệt kê ý tưởng rõ ràng cũng rất quan trọng. Em nên đánh số và sử dụng chấm đầu dòng, như vậy sẽ giúp nội dung rõ ràng hơn.)",
            },
            {
              id: "p2e33q4",
              question:
                "What made Sandra want to visit the Navajo National Park?",
              options: [
                "the articles she read.",
                "the movies she saw as a child.",
                "the photographs she found on the internet.",
                "the stories her father told.",
              ],
              correct: 1,
              explanation:
                "My father was a great fan of cowboy films and the Wild West so I was subjected to seeing all the epics, (B)many of which were shot there. As a consequence, it feels very familiar to me and it’s awesome both geographically and visually, so it’s somewhere I’ve always wanted to visit. (Bố em là người hâm mộ trung thành của các bộ phim về cao bồi và về vùng miền Tây hoang dã, vì vậy em đã quen xem những bộ phim sử thi đấy rồi. (B)Trong số những bộ phim ấy, có nhiều bộ phim được quay ở đây nên em cảm thấy rất thân quen với nơi này, vì thế em luôn muốn đến thăm nơi này.)",
            },
          ],
        },
        {
          id: "p2e34",
          label: "Bai 34",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 34.mp3",
          transcript:
            "W I’ve been reading your personal statement, Paul. First, let’s talk about your work experience in South America. What took you there? Was it to gain more fluency in Spanish? M Well, as I’m combining Spanish with Latin American studies, my main idea was to find out more about the way people lived there. My spoken Spanish was already pretty good in fact. W So you weren’t too worried about language barriers? M No. In fact, I ended up teaching English there, although that wasn’t my original choice of work. I see. 155W How did you find out about all this? M I found an agency that runs all kinds of voluntary projects in South America. W What kind of work? M Well, there were several possibilities. W You mean construction? Engineering work? M Yes, getting involved in building projects was an option. Then there was tourism. taking tourists for walks around the volcanoes which I actually chose to do and then there was work with local farmers. W But you didn’t continue with that project. Why not? M Because I never really knew whether I’d be needed or not. I’d thought it might be difficult physically, but I was certainly fit enough ... no, I wanted to do something that had more of a proper structure to it, I suppose. I get de-motivated otherwise. W What do you think you learned from your experience? It must have been a great opportunity to examine community life. M Yes, but it was difficult at first to be accepted by the locals. It was a very remote village and some of them were reluctant to speak to me although they were always interested in my clothes and how much I’d had to pay for them. W Well, that’s understandable. M Yes, but things soon improved. What struck me was that when people became more comfortable with me and less suspicious, we really connected with each other in a meaningful way. W You made good friends? M Yes, with two of the families in particular. W Good. What about management. Did you have a project manager? M Yes and he gave me lots of advice and guidance. W And was he good at managing too? M That wasn’t his strong point! I think he was often more interested in the academic side of things than filing reports. He was a bit of a dreamer. W And did you have a contract? M I had to stay for a minimum of three months. My parents were surprised when I asked to stay longer - six months in the end. I was so happy there. W And did anything on the administration side of things surprise you? What was the food and lodging like?  M Simple ... but there was plenty to eat and I only paid seven dollars a day for that which was amazing really. And they gave me all the equipment I needed ... even a laptop. W You didn’t expect that then? M No W Well, I’ll look forward to hearing more.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "I’ve been reading your personal statement, Paul. First, let’s talk about your",
            },
            {
              speaker: "Man",
              text: "Well, as I’m combining Spanish with Latin American studies, my main",
            },
            {
              speaker: "Woman",
              text: "So you weren’t too worried about language barriers?",
            },
            {
              speaker: "Man",
              text: "No. In fact, I ended up teaching English there, although that wasn’t my",
            },
            {
              speaker: "Man",
              text: "I found an agency that runs all kinds of voluntary projects in South",
            },
            { speaker: "Woman", text: "What kind of work?" },
            { speaker: "Man", text: "Well, there were several possibilities." },
            {
              speaker: "Woman",
              text: "You mean construction? Engineering work?",
            },
            {
              speaker: "Man",
              text: "Yes, getting involved in building projects was an option. Then there was",
            },
            {
              speaker: "Woman",
              text: "But you didn’t continue with that project. Why not?",
            },
            {
              speaker: "Man",
              text: "Because I never really knew whether I’d be needed or not. I’d thought it",
            },
            {
              speaker: "Woman",
              text: "What do you think you learned from your experience? It must have been a",
            },
            {
              speaker: "Man",
              text: "Yes, but it was difficult at first to be accepted by the locals. It was a very",
            },
            { speaker: "Woman", text: "Well, that’s understandable." },
            {
              speaker: "Man",
              text: "Yes, but things soon improved. What struck me was that when people",
            },
            { speaker: "Woman", text: "You made good friends?" },
            {
              speaker: "Man",
              text: "Yes, with two of the families in particular.",
            },
            {
              speaker: "Woman",
              text: "Good. What about management. Did you have a project manager?",
            },
            {
              speaker: "Man",
              text: "Yes and he gave me lots of advice and guidance.",
            },
            { speaker: "Woman", text: "And was he good at managing too?" },
            {
              speaker: "Man",
              text: "That wasn’t his strong point! I think he was often more interested in the",
            },
            { speaker: "Woman", text: "And did you have a contract?" },
            {
              speaker: "Man",
              text: "I had to stay for a minimum of three months. My parents were surprised",
            },
            {
              speaker: "Woman",
              text: "And did anything on the administration side of things surprise you? What",
            },
            {
              speaker: "Man",
              text: "Simple ... but there was plenty to eat and I only paid seven dollars a day",
            },
            { speaker: "Woman", text: "You didn’t expect that then?" },
            { speaker: "Man", text: "No" },
            {
              speaker: "Woman",
              text: "Well, I’ll look forward to hearing more.",
            },
          ],
          questions: [
            {
              id: "p2e34q1",
              question:
                "Why did Paul decided to get work experience in South America?",
              options: [
                "to teach English there.",
                "to improve his Spanish.",
                "to learn about Latin American life.",
                "to earn a good salary.",
              ],
              correct: 2,
              explanation:
                "As I’m combining Spanish with Latin American studies, my main idea was to find out more about the way people lived there. My spoken Spanish was already pretty good in fact. (Khi tôi học đất nước học Mỹ La-tinh và Tây Ban Nha, tôi đã rất muốn tìm hiểu nhiều hơn về lối sống của mọi người ở đó. Thật ra kỹ năng nói tiếng Tây Ban Nha của tôi khá tốt.)",
            },
            {
              id: "p2e34q2",
              question:
                "What project work did Paul originally intend to get involved in?",
              options: ["construction", "agriculture", "tourism", "education"],
              correct: 2,
              explanation:
                "Getting involved in building projects was an option. Then there was tourism - taking tourists for walks around the volcanoes - which I actually chose to do, and then there was work with local farmers. (Tham gia xây dựng dự án là một lựa chọn. Nhưng còn một lựa chọn khác là mảng du lịch, cụ thể là dẫn khách du lịch đi tham quan xung quanh khu vực núi lửa. Đây là lựa chọn mà tôi đã lựa chọn, và tôi có cơ hội được làm việc với những người nông dân địa phương.)",
            },
            {
              id: "p2e34q3",
              question: "What does Paul say about his project manager?",
              options: [
                "He let Paul do most of the work.",
                "His plans were too ambitious.",
                "He was very supportive of Paul.",
                "He was skilled at managing.",
              ],
              correct: 2,
              explanation:
                "− He gave me lots of advice and guidance. (C) − And was he good at managing too? − That wasn’t his strong point! − Anh ấy đã cho tôi nhiều lời khuyên và hướng dẫn hữu ích. (C) − Anh ấy có giỏi quản lý không? − Thật ra đó không phải là điểm mạnh của anh ấy.",
            },
            {
              id: "p2e34q4",
              question: "What surprised Paul most?",
              options: [
                "he had to stay in the community at least for three months.",
                "he was given a computer to use.",
                "he had too much to eat",
                "He spent only a small sum of money for plenty of food.",
              ],
              correct: 3,
              explanation:
                "There was plenty to eat and I only paid seven dollars a day for that which was amazing really. And they gave me all the equipment I needed ... even a laptop. (Ở đó có nhiều thứ để ăn và tôi chỉ phải trả 7 đô la một ngày, điều này khiến tôi rất ngạc nhiên. Họ còn cung cấp mọi thiết bị mà tôi cần, thậm chí là máy tính xách tay.)",
            },
          ],
        },
        {
          id: "p2e35",
          label: "Bai 35",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 35.mp3",
          transcript:
            "W Hi Jun. As you know, I’ve asked you here today to discuss the future of our Self-Access Centre. We have to decide what we want to do about this 158 very important resource for our English language students. So, can you tell me what the students think about this? M Well, from the students’ point of view, we would like to keep it. The majority of students say that they enjoy using it because it provides a variation on the classroom routine and they see it as a pretty major component of their course, but we would like to see some improvements to the equipment, particularly the computers; there aren’t enough for one each at the moment and we always have to share. W Well yes, the teachers agree that it is a very valuable resource but one thing we have noticed is that a lot of the students are using it to check their personal emails. We don’t want to stop you students using it, but we think the computers should be used as a learning resource, not for emails. Some of us also think that we could benefit a lot more by relocating the Self Access Centre to the main University library building. How do you think the students would feel about that, Jun? M Well, the library is big enough to incorporate the Self-Access Centre, but it wouldn’t be like a class activity anymore. Our main worry would be not being able to go to a teacher for advice. I\'m sure there would be plenty of things to do but we really need teachers to help us choose the best activities. W Well, there would still be a teacher present and he or she would guide the activities of the students. We wouldn\'t just leave him to get on with it. M Yes, but I think the students would be much happier keeping the existing set-up; they really like going to the Self-Access Centre with their teacher and staying together as a group to do activities. If we could just improve the resources and facilities, I think it would be fine. Is the cost going to be a problem? W It’s not so much the expense that I’m worried about, and we’ve certainly got room to do it, but it’s the problem of timetabling a teacher to be in there outside class hours. If we’re going to spend a lot of money on equipment and resources, we really need to make sure that everything is looked after properly. Anyway, let’s make some notes to see just what needs doing to improve the Centre.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "Hi Jun. As you know, I’ve asked you here today to discuss the future of",
            },
            {
              speaker: "Man",
              text: "Well, from the students’ point of view, we would like to keep it. The",
            },
            {
              speaker: "Woman",
              text: "Well yes, the teachers agree that it is a very valuable resource but one thing",
            },
            {
              speaker: "Man",
              text: "Well, the library is big enough to incorporate the Self-Access Centre, but",
            },
            {
              speaker: "Woman",
              text: "Well, there would still be a teacher present and he or she would guide the",
            },
            {
              speaker: "Man",
              text: "Yes, but I think the students would be much happier keeping the existing",
            },
            {
              speaker: "Woman",
              text: "It’s not so much the expense that I’m worried about, and we’ve certainly",
            },
          ],
          questions: [
            {
              id: "p2e35q1",
              question: "Why do students want to keep the Self-Access Centre?",
              options: [
                "they enjoy the variety of equipment.",
                "they like being able to work on their own.",
                "it is an important part of their studies.",
                "they can share learning materials there.",
              ],
              correct: 2,
              explanation:
                "The majority of students say that they enjoy using it because it provides a variation on the classroom routine and they see it as a pretty major component of their course. (Đa số học sinh nói rằng chúng thích đến trung tâm vì nơi đó cung cấp nhiều phòng học, chúng còn coi đó như một hoạt động chính của khóa học.)",
            },
            {
              id: "p2e35q2",
              question:
                "What do some teachers think of the Self Access Centre?",
              options: [
                "it should be closed.",
                "it should be moved elsewhere.",
                "Restricted access should be given.",
                "it should be used for both personal and study purposes.",
              ],
              correct: 1,
              explanation:
                "The teachers agree that it is a very valuable resource but one we have noticed is that a lot of the students are using it to check their personal emails. We don’t want to stop you students using it, but we think the computers should be used as a learning resource, not for emails. Some of us also think that we could benefit a lot more by relocating the Self-Access Centre to the main University library building. (B) (Các thầy cô đồng ý rằng đó là nơi rất hữu ích nhưng mọi người cũng cần lưu ý rằng nhiều học sinh chỉ sử dụng nơi đó để kiểm tra email cá nhân. Chúng tôi vẫn muốn học sinh sử dụng nó với điều kiện là máy tính nên được dùng với mục đích học, chứ không phải để kiểm tra emails. Chúng tôi còn cho rằng nên chuyển trung tâm đến tòa nhà thư viện của trường đại học.(B)",
            },
            {
              id: "p2e35q3",
              question:
                "What are students mainly concerned about using the library?",
              options: [
                "the size of the library.",
                "difficulty in getting help.",
                "the lack of materials.",
                "choosing a class activity.",
              ],
              correct: 1,
              explanation:
                "The library is big enough to incorporate the Self-Access Centre, but it wouldn’t be like a class activity anymore. Our main worry would be not being able to go to a teacher for advice. I’m sure there would be plenty of things to do but we really need teachers to help us choose the best activities. (Thư viện đủ lớn để kết hợp cùng trung tâm tự học, tuy nhiên, như vậy thì sẽ không giống một hoạt động trên lớp nữa. Chúng tôi lo rằng giáo viên sẽ không thể hỗ trợ được nữa. Tôi chắc chắn rằng sẽ có nhiều việc phải làm và chúng tôi sẽ cần giáo viên giúp chọn ra những hoạt động thú vị nhất.)",
            },
            {
              id: "p2e35q4",
              question: "What is the Director of Studies concerned about? 41",
              options: [
                "the cost of upgrading the centre.",
                "the lack of space in the centre.",
                "the difficulty in supervising the centre.",
                "students’ using the centre for personal emails.",
              ],
              correct: 2,
              explanation:
                "It’s not so much the expense that I’m worried about, and we’ve certainly got room to do it, but it’s the problem of timetabling a teacher to be in there outside class hours. If we’re going to spend a lot of money on equipment and resources, we really need to make sure that everything is looked after properly.(C) (Chi phí không phải vấn đề mà tôi lo lắng, và tôi chắc chắn sẽ có phòng để thực hiện việc đó. Nhưng vấn đề ở đây là làm sao để lên lịch giáo viên trực ở đó ngoài giờ học. Nếu chúng ta đã chi tiền mua thiết bị và tài liệu thì chúng ta cần đảm bảo rằng mọi thứ được giữ gìn cẩn thận.(C)",
            },
          ],
        },
        {
          id: "p2e36",
          label: "Bai 36",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 36.mp3",
          transcript:
            "W For the second in our series about locally-run businesses, we meet Simon Winridge, co-founder of the hugely-successful Winridge Forest Railway Park. Welcome, Simon. Now, perhaps you can begin by telling us a little bit about how it all started.  M Well, during the 0s, my wife, Liz and I had just acquired 80 acres of sheep-farming land, and we decided to settle down and have children. Pretty soon we had a daughter, Sarah, and a son, Duncan. The place was wonderful for the kids: they particularly loved trains and gradually built up an enormous network of miniature railway track. I began to develop larger scale models of locomotives but we didn’t think anything more of it until I went on a trip to a theme park near Birmingham and decided we could do a much better job! So we set up a small one ourselves based on the miniature railway and we opened to the public for just a month that year. 4 - in July - our driest month because our children said they didn’t want our guests to have a miserable, wet visit. I dealt with Park business and Liz carried on with the farm work. It soon became clear that we were onto a winner. We began to extend the railway track and lay it among more interesting landscape by planting trees, which in turn attracted more wildlife, and by making cuttings through the rock. Nowadays, we’re open all year round and we’re pleased to say that Winridge is one of the most popular visitor attractions in the area with 50,000 visitors a year - a million and a half people have been through our doors since we opened. All these visitors mean we have had to expand our operation and it’s now a truly family concern I’m near to retirement age so I only concern myself with looking after the mechanical side of things - keeping the trains going. Liz now devotes all her energies to recruiting and supporting the large squadron of workers, which keep the place running smoothly. We’re really pleased that after some years away teaching, Sarah has now returned to the park and makes sure the visitors are kept fed and watered, which keeps her pretty busy as you can imagine. Our son Duncan has been a stalwart at the park for the last 10 years taking over from me in the area of construction and I’ll say a little bit more about that in a moment and his new wife Judith, has also joined the team in charge of retail. That’s becoming a tremendous growth area for us a lot of people want to buy souvenirs.",
          speakerLines: [
            {
              speaker: "Woman",
              text: "For the second in our series about locally-run businesses, we meet Simon",
            },
            {
              speaker: "Woman",
              text: "inridge, co-founder of the hugely-successful Winridge Forest Railway",
            },
            {
              speaker: "Man",
              text: "Well, during the 0s, my wife, Liz and I had just acquired 80 acres of",
            },
          ],
          questions: [
            {
              id: "p2e36q1",
              question: "Where did Simon’s idea for a theme park come from?",
              options: [
                "his childhood hobby.",
                "his interest in landscape design.",
                "his visit to another park.",
                "his children’s interests",
              ],
              correct: 2,
              explanation:
                "We didn’t think anything more of it until I went on a trip to a theme park near Birmingham and decided we could do a much better job! (Chúng tôi không nghĩ nhiều về ý tưởng đó cho đến khi tôi đi một chuyến đến công viên gần Birmingham và quyết định chúng tôi có thể làm một việc gì đó tốt hơn.)2. We opened to the public for just a month that year. 4 - in July - our driest month - because our children said they didn’t want our guests to have a miserable, wet visit. (Chúng tôi mở cửa được một tháng vào năm đó, cụ thể là vào tháng 7 năm 4, tháng khô ráo nhất bởi vì lũ trẻ nói rằng chúng không muốn khách thăm quan của chúng tôi có một chuyến thăm ướt át và mệt mỏi.)",
            },
            {
              id: "p2e36q2",
              question: "When did they start to open the park?",
              options: [
                "the weather was expected to be good.",
                "they earned enough money to set up.",
                "there was little farm work.",
                "the children weren’t at school.",
              ],
              correct: 0,
              explanation: "",
            },
            {
              id: "p2e36q3",
              question: "How many visitors has the park had since opening?",
              options: [
                "50,000 visitors.",
                "1,000,000 visitors.",
                "1,500,000 visitors.",
                "500,000 visitors.",
              ],
              correct: 2,
              explanation:
                "We’re open all year round and we’re pleased to say that Winridge is one of the most popular visitor attractions in the area - with 50,000 visitors a year - a million and a half people have been through our doors since we opened. (C) (Chúng tôi đã mở cửa được một năm qua và chúng tôi rất hài lòng khi nói rằng Winridge là một trong những nơi hấp dẫn khách du lịch nhất trong vùng, với 50000 khách một năm, như vậy kể từ khi mở cửa, chúng tôi đã đón được 1500000 người đến thăm quan.(C)",
            },
            {
              id: "p2e36q4",
              question:
                "Who is in charge of providing food and drinks in the Park?",
              options: ["Simon", "Liz", "Sarah", "Duncan"],
              correct: 2,
              explanation:
                "Sarah has now returned to the park and makes sure the visitors are kept fed and watered. (Sarah giờ đã trở lại công viên và nhận nhiệm vụ phục vu đồ ăn và thức uống cho du khách.)",
            },
          ],
        },
        {
          id: "p2e37",
          label: "Bai 37",
          audio: "listenning/LISTENING-P2/Ph%E1%BA%A7n 2 Test 37.mp3",
          transcript:
            "M Erm ... hello Professor. I\'m John Wishart. I\'m working on my entry for the Global design competition. My tutor said you might be able to help me with it. W Oh, yes, I got a copy of your drawings Come in and tell me about it. What sort of competition is it? M Well, it’s an international design competition and we have to come up with a new design for a typical domestic kitchen appliance. W I see and are there any special conditions? Does it have to save energy for example? M Actually that was the focus in last year\'s competition. This year’s different. We have to adopt an innovative approach to existing technology using it in a way that hasn\'t been thought of before. W I see, that sounds tricky. And what kitchen appliance have you chosen? M Well I decided to choose the dishwasher W Interesting, what made you choose that? M Well, they’re an everyday kitchen appliance in most Australian houses. But they\'re all pretty boring and almost identical to each other. I think some 162 people will be prepared to pay a little extra for something that looks different. W It\'s a nice idea. I see you\'ve called your design ‘the Rockpool’; why is that? M Basically, because it looks like the rock pools you find on a beach. The top is made of glass so that you can look down into it. W And there\'s a stone at the bottom. Is that just for decoration? M Actually it does have a function. Instead of pushing a button, you turn the stone. W So it\'s really just a novel way of starting the dishwasher.. M That\'s right. It\'s a really nice design, but what makes it innovative? W Well, I decided to make a dishwasher that uses carbon dioxide. M In place of water and detergent? How will you manage that? W The idea is to pressurise the carbon dioxide so that it becomes a liquid. The fluid is then released into the dishwasher where it cleans the dishes all by itself. M Sounds like a brilliant idea! Your system will totally do away with the need for strong detergents. So what happens once the dishes are clean? W Well, to allow them to dry, the liquid carbon dioxide and the waste materials all go to an area called the holding chamber. That’s where the liquid is depressurised and so it reverts to a gas. Then the oil and grease are separated out and sent to the waste system. M It sounds like you\'ve thought it all out very thoroughly. So, what happens to the carbon dioxide once the process is complete? Not wasted I hope. W Actually, that’s where the real savings are made. The carbon dioxide is sent back to the cylinder and can be used again and again. M What a terrific idea. Do you think it will ever be built? W Probably not, but that’s OK. M Well, I’m sure a lot of positive things will come out of your design.",
          speakerLines: [
            {
              speaker: "Man",
              text: "Erm ... hello Professor. I\'m John Wishart. I\'m working on my entry for the",
            },
            {
              speaker: "Woman",
              text: "Oh, yes, I got a copy of your drawings Come in and tell me about it. What",
            },
            {
              speaker: "Man",
              text: "Well, it’s an international design competition and we have to come up with",
            },
            {
              speaker: "Woman",
              text: "I see and are there any special conditions? Does it have to save energy for",
            },
            {
              speaker: "Man",
              text: "Actually that was the focus in last year\'s competition. This year’s different.",
            },
            {
              speaker: "Woman",
              text: "e have to adopt an innovative approach to existing technology using it in",
            },
            {
              speaker: "Woman",
              text: "I see, that sounds tricky. And what kitchen appliance have you chosen?",
            },
            { speaker: "Man", text: "Well I decided to choose the dishwasher" },
            {
              speaker: "Woman",
              text: "Interesting, what made you choose that?",
            },
            {
              speaker: "Man",
              text: "Well, they’re an everyday kitchen appliance in most Australian houses. But",
            },
            {
              speaker: "Woman",
              text: "It\'s a nice idea. I see you\'ve called your design ‘the Rockpool’; why is that?",
            },
            {
              speaker: "Man",
              text: "Basically, because it looks like the rock pools you find on a beach. The top",
            },
            {
              speaker: "Woman",
              text: "And there\'s a stone at the bottom. Is that just for decoration?",
            },
            {
              speaker: "Man",
              text: "Actually it does have a function. Instead of pushing a button, you turn the",
            },
            {
              speaker: "Woman",
              text: "So it\'s really just a novel way of starting the dishwasher..",
            },
            {
              speaker: "Man",
              text: "That\'s right. It\'s a really nice design, but what makes it innovative?",
            },
            {
              speaker: "Woman",
              text: "Well, I decided to make a dishwasher that uses carbon dioxide.",
            },
            {
              speaker: "Man",
              text: "In place of water and detergent? How will you manage that?",
            },
            {
              speaker: "Woman",
              text: "The idea is to pressurise the carbon dioxide so that it becomes a liquid. The",
            },
            {
              speaker: "Man",
              text: "Sounds like a brilliant idea! Your system will totally do away with the need",
            },
            {
              speaker: "Woman",
              text: "Well, to allow them to dry, the liquid carbon dioxide and the waste",
            },
            {
              speaker: "Man",
              text: "It sounds like you\'ve thought it all out very thoroughly. So, what happens",
            },
            {
              speaker: "Woman",
              text: "Actually, that’s where the real savings are made. The carbon dioxide is sent",
            },
            {
              speaker: "Man",
              text: "What a terrific idea. Do you think it will ever be built?",
            },
            { speaker: "Woman", text: "Probably not, but that’s OK." },
            {
              speaker: "Man",
              text: "Well, I’m sure a lot of positive things will come out of your design.",
            },
          ],
          questions: [
            {
              id: "p2e37q1",
              question:
                "What do students entering the design competition have to?",
              options: [
                "produce an energy-efficient design.",
                "adapt an existing energy-saving appliance.",
                "produce an appliance for the living room.",
                "develop a new use for current technology.",
              ],
              correct: 1,
              explanation:
                "Actually that was the focus in last year’s competition. This year’s different. We have to adopt an innovative approach to existing technology, using it in a way that hasn’t been thought of before. (D) (Thật ra đó là tiêu điểm của cuộc thi năm trước. Năm nay thì khác. Chúng tôi phải tiếp cận đến nền công nghệ hiện tại một cách đổi mới và sử dụng nó theo một cách mà chưa ai từng nghĩ đến trước đây.(D)",
            },
            {
              id: "p2e37q2",
              question: "Why did John choose a dishwasher?",
              options: [
                "because dishwashers are common in Australian kitchens.",
                "because they are too expensive.",
                "because they are not economical.",
                "because they are not appealing enough.",
              ],
              correct: 3,
              explanation:
                "They’re an everyday kitchen appliance in most Australian houses but they’re all pretty boring and almost identical to each other. I think some people will be prepared to pay a little extra for something that looks different. (Chúng là một trang thiết bị nhà bếp được dùng hàng ngày của hầu hết những gia đình ở Australia. Nhưng nhìn chúng tương đối nhàm chán và gần như giống nhau. Tôi nghĩ rằng một số người sẽ sẵn sàng trả thêm tiền để sở hữu một cái máy rửa bát nhìn khác biệt hơn một chút.)",
            },
            {
              id: "p2e37q3",
              question:
                "What is the stone in John’s \'Rockpool\' design used for? 4243",
              options: [
                "for decoration.",
                "to switch on the dishwasher.",
                "to stop water escaping.",
                "to remove waste",
              ],
              correct: 1,
              explanation:
                "− There\'s a stone at the bottom. Is that just for decoration? − Actually it does have a function. Instead of pushing a button, you turn the stone. − Có một viên đá ở dưới đáy. Có phải nó dùng để trang trí không? − Thật ra nó có chức năng đấy, đó là dùng để mở máy lên.",
            },
            {
              id: "p2e37q4",
              question:
                "What happens to the carbon dioxide at the end of the cleaning process?",
              options: [
                "it is released into the air.",
                "it is disposed of with the waste.",
                "it is collected ready to be re-used.",
                "it is stored in the waste system.PART 3",
              ],
              correct: 2,
              explanation:
                "The carbon dioxide is sent back to the cylinder and can be used again and again. (CO2 được đưa vào ống xy-lanh và được tái sử dụng lại.)",
            },
          ],
        },
      ],
    },
    // ========================================================================
    // PART 3: Talks and Lectures (41 bai)
    // ========================================================================
    {
      id: "part3",
      title: "Part 3: Talks and Lectures (41 bai)",
      description:
        "Ban se nghe 41 bai noi chuyen / bai giang ngan. Moi bai co 2-5 cau hoi. Chon phuong an dung nhat.",
      exercises: [
        {
          id: "p3e1",
          label: "Bai 1",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 01.mp3",
          transcript:
            "As we study in university, we find we have a lot of reading. It\'s very productive to learn how to read faster. To do this, you need to know how fast you read now. I’ll show you a quick test to find out. But before I do, let me say this. In this test, it\'s important to understand what you have read. Rushing to beat the clock is pointless. You won\'t enjoy the reading or understand it well. You’ll also get a false measure of your reading speed. when you finish, you should try to see what you remember.",
          questions: [
            {
              id: "p3e1q1",
              question: "What is the talk mainly about?",
              options: [
                "How to do a quick test",
                "Going to university",
                "Reading faster",
                "Understanding difficult words",
              ],
              correct: 2,
              explanation:
                "Bài nói nói về cách để học nhanh hơn, bằng cách biết được tốc độ đọc hiện tại của bản thân và hiểu những gì bản thân vừa đọc.",
            },
            {
              id: "p3e1q2",
              question: "What does the speaker suggest doing after reading?",
              options: [
                "Reading again",
                "Taking notes",
                "Seeing what you can remember",
                "Looking at the clock",
              ],
              correct: 2,
              explanation:
                "When you finish, you should try to see what you remember. (Khi bạn đọc xong, bạn cần cố gắng hiểu những điều mà bạn nhớ.)",
            },
          ],
        },
        {
          id: "p3e2",
          label: "Bai 2",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 02.mp3",
          transcript:
            'And now, the winner of this year\'s Science fair, Choi Min-Soo! Min-Soo, tell everyone about your work. Thank you! Let me tell you about my "white noise" machine. Does noise ever annoy you or keep you awake? Well, we can lessen noise by using "white noise." Think of water. Think of sending one big wave toward another coming in. My machine does that with sound. It can tell how much noise is coming in then send back "white noise." You don\'t hear it, but it shuts out the noise! I hope that my machine will help those who need quiet. Thank you!',
          questions: [
            {
              id: "p3e2q1",
              question: "What is the main idea of the talk?",
              options: [
                "Helping people who need quiet",
                'Making "white noise"',
                "Building a machine",
                "Winning a Science fair prize",
              ],
              correct: 0,
              explanation:
                'Does noise ever annoy you or keep you awake? Well, we can lessen noise by using "white noise”… I hope that my machine will help those who need quiet. (Mọi người đã từng cảm thấy khó chịu hay tỉnh giấc vì tiếng ồn chưa? Giờ đây, các bạn có thể giảm tiếng ồn bằng cách sử dụng chiếc máy “white noise”… Tôi hy vọng rằng chiếc máy này sẽ hữu ích cho những người cần yên tĩnh.)',
            },
            {
              id: "p3e2q2",
              question:
                "Why did Choi Min-Soo win first prize at the Science fair?",
              options: [
                "He is a great scientist.",
                "He built a very useful machine.",
                "He has a doctorate degree.",
                'He discovered "white noise."',
              ],
              correct: 1,
              explanation:
                "Vì anh này đã chế ra một cái máy rất hữu ích tên là “white noise”, giúp làm giảm tiếng ồn.",
            },
          ],
        },
        {
          id: "p3e3",
          label: "Bai 3",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 03.mp3",
          transcript:
            "Geometry is the study of points. Now, a point is a small dot, like a period at the end of a sentence. If we have two points, we know that there can be other points between them. They can also be a line. The line is continuous. It has no space between each point. Part of a line, with points at each end, is called a line segment Two line segments can be the same length. We call these line segments congruent That just means the I ne segments are equal in length.",
          questions: [
            {
              id: "p3e3q1",
              question: "How is the information in the lecture organized?",
              options: [
                "People and their new ideas",
                "Terms and examples",
                "Steps within a process",
                "Shapes and things in the room",
              ],
              correct: 1,
              explanation:
                "Bài giảng cung cấp thông tin bằng cách đưa ra thuật ngữ rồi lấy ví dụ minh họa.",
            },
            {
              id: "p3e3q2",
              question: "Why does the professor mention periods?",
              options: [
                "To explain what a point looks like",
                "To explain what a segment looks like",
                "To illustrate what congruent means",
                "To illustrate what continuous means",
              ],
              correct: 1,
              explanation:
                "Nêu đến “periods” là để minh họa/ giải thích một đoạn thẳng sẽ trông như thế nào",
            },
            {
              id: "p3e3q3",
              question: "What is NOT mentioned in the passage?",
              options: ["points", "lines", "segments", "spaces"],
              correct: 3,
              explanation:
                "Trong bài, từ “spaces” có được nhắc đến nhưng không được giải thích hay minh họa gì cả.",
            },
          ],
        },
        {
          id: "p3e4",
          label: "Bai 4",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 04.mp3",
          transcript:
            "We know that Ludwig van Beethoven was born in 0 in Bonn, Germany but we are uncertain of the month. Beethoven wrote hundreds of songs. One of his most famous is his Fifth Symphony. The first four notes go like this: dah dah dah da! Almost everyone recognizes them. He was the first to use trombones in a symphony. At age 28, he began to go deaf. Yet, he kept on writing and conducting. He never got married. But after he died friends found some love letters. We don\'t know who he wrote them to. Beethoven died in 7.",
          questions: [
            {
              id: "p3e4q1",
              question: "What is the talk mainly about?",
              options: [
                "The works of Beethoven",
                "Beethoven’s mysterious lover",
                "Beethoven\'s disease",
                "Facts about Beethoven",
              ],
              correct: 3,
              explanation:
                "Bài nói cung cấp đầy đủ các thông tin về nhạc sĩ Beethoven như năm sinh, tác phẩm nổi tiếng, sự sáng tạo trong âm nhạc cuộc sống riêng tư và năm mất.",
            },
            {
              id: "p3e4q2",
              question:
                "How does the speaker present the information in the lecture?",
              options: [
                "Chronological order",
                "Contrasting major works",
                "In order of importance",
                "Cause and effect",
              ],
              correct: 0,
              explanation:
                "Thông tin trong bài được liệt kê theo thời gian, từ năm sinh, tuổi trẻ, cho đến năm mất.",
            },
            {
              id: "p3e4q3",
              question: "Which is true about Beethoven?",
              options: [
                "He died in Bonn, Germany.",
                "He had a wife.",
                "He wrote the Fifth Symphony.",
                "He was born in 7.",
              ],
              correct: 2,
              explanation:
                "One of his most famous is his Fifth Symphony. (Một trong những tác phẩm nổi tiếng nhất của ông là Bản giao hưởng số 5.) Câu A sai vì “Beethoven was born in 0 in Bonn, Germany” (Ông được sinh ra, chứ không có thông tin nói mất ở Bonn, Đức.) Câu B sai vì “He never got married.” (Ông ấy chưa kết hôn.) Câu D sai vì “Beethoven died in 7.” (Beethoven mất năm 7.)",
            },
          ],
        },
        {
          id: "p3e5",
          label: "Bai 5",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 05.mp3",
          transcript:
            "OK...let\'s talk about animals we don\'t see in the winter. Many animals hibernate during the cold months of the year. Basically, they go to sleep. Some animals hibernate in holes in the ground. others sleep in caves, under bushes or at the base of trees. Bears hibernate. So do cold-blooded animals, like frogs and snakes. When animals are hibernating it seems like they\'re dead They have slow heartbeats and they almost stop breathing They have stored extra energy and fat to keep them alive. By the end of winter, they are very weak. They must eat soon atter waking up.",
          questions: [
            {
              id: "p3e5q1",
              question: "What is the topic of the lecture?",
              options: ["Hibernation", "Winter", "Animal habits", "Sleep"],
              correct: 0,
              explanation:
                "Let\'s talk about animals we don\'t see in the winter. Many animals hibernate during the cold months of the year. (Hãy cùng tìm hiểu về các loài động vật mà chúng ta thường không nhìn thấy vào mùa đông. Thực tế là có nhiều loài động vật ngủ đông trong suốt những tháng ngày lạnh giá vào mùa đông.)",
            },
            {
              id: "p3e5q2",
              question:
                "How does the professor explain the places for animal’s hibernation?",
              options: [
                "By reminding students of a story",
                "By providing pictures in class",
                "By listing the different places",
                "By classifying temporary and permanent homes",
              ],
              correct: 2,
              explanation:
                "Some animals hibernate in holes in the ground. Others sleep in caves, under bushes, or at the base of trees. Bears hibernate. So do cold-blooded animals, like frogs and snakes. (Một số loài động vật ngủ đông trong những cái hố dưới mặt đất. Những loài khác thì lại ngủ trong động, dưới những bụi cây hoặc gốc cây. Gấu cũng ngủ đông. Những loài động vật máu lạnh như cóc và rắn.)",
            },
            {
              id: "p3e5q3",
              question: "What is the main idea of the talk?",
              options: [
                "Animals can store energy and fat",
                "Animals hibernate in holes, caves and bushes",
                "Hibernating animals are weak in the spring",
                "Some animals sleep through the winter",
              ],
              correct: 3,
              explanation: "Như câu 1.",
            },
          ],
        },
        {
          id: "p3e6",
          label: "Bai 6",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 06.mp3",
          transcript:
            "When you’re writing a business letter it’s important to be specific. That is, tell the reader exactly what he or she needs to know. If something is wrong, list what the problem is and what should be done to fix it. If you need information state clearly what you want to know. Next, um, be positive. Say “no” in a good way. How can we do that? Use polite language. For example, “we regret to inform you that...” or “We’re sorry, but...” Always keep in mine this golden rule write the kind of business letter that you would like to receive.",
          questions: [
            {
              id: "p3e6q1",
              question: "What is the talk mainly about?",
              options: [
                "Writing letters",
                "Organizing files",
                "Understanding letters",
                "Responding to problems",
              ],
              correct: 0,
              explanation:
                "Bài nói nói về cách viết một bức thư, cụ thể là cách truyền đạt thông tin và nên sử dụng ngôn ngữ như thế nào.",
            },
            {
              id: "p3e6q2",
              question: "Why does the woman mention the golden rule?",
              options: [
                "To show what is most important to do",
                "To show what is wrong to do",
                "To give information",
                "To answer a letter",
              ],
              correct: 0,
              explanation:
                "“the golden rule”: quy tắc vàng, tức là điều quan trọng nhất cần nhớ và thực hiện",
            },
            {
              id: "p3e6q3",
              question: "What are the main points in the talk?",
              options: [
                "Use big words and be positive",
                "Write long, specific sentences",
                "Be specific, be positive, and remember the golden rule",
                "Use polite language and list the problems",
              ],
              correct: 2,
              explanation:
                "Đây là 3 ý chính của bài nói: − It’s important to be specific. (Cần phải cụ thể.) − Next, um, be positive. (Viết phải có xu hướng tích cực.) − Always keep in mind this golden rule. (Luôn luôn phải ghi nhớ quy tắc vàng.)",
            },
          ],
        },
        {
          id: "p3e7",
          label: "Bai 7",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 07.mp3",
          transcript:
            "Another name for the South Pole is Antarctica. This is a continent, but no people live there. There\'s a good reason for this. It\'s the coldest, windiest place on Earth. The lowest temperature ever measured was in Antarctica. Minus 88 degrees celsius! Ninety-eight percent of the ground is permanently frozen, and the continent contains 87 percent of the world\'s ice. Antarctica\'s only human occupants are scientists. They go there to learn how Antarctica used to be millions of years ago, when it was located at the equator. Antarctica used to be connected to Australia, before all the continents on the planet shitted.",
          questions: [
            {
              id: "p3e7q1",
              question:
                "What aspect of Antarctica does the professor mainly discuss?",
              options: ["History", "Climate", "Location", "Scientists"],
              correct: 1,
              explanation:
                "Từ đầu đến cuối bài này đều nói về khí hậu ở Nam Cực: coldest, windiest, the lowest temperature, Minus 88 degrees Celsius, permanently frozen, 87 percent of the world\'s ice…",
            },
            {
              id: "p3e7q2",
              question:
                "How does the professor emphasize that Antarctica is cold?",
              options: [
                "By giving statistics",
                "By telling a story",
                "By comparing Antarctica to Australia",
                "By stating the dimensions of the South Pole",
              ],
              correct: 0,
              explanation:
                "The lowest temperature ever measured was in Antarctica. Minus 88 degrees celsius! Ninety-eight percent of the ground is permanently frozen, and the continent contains 87 percent of the world\'s ice. (Nhiệt độ thấp nhất được đo ở Châu Nam Cực. Âm 88 độ!!! 98% bề mặt đã đóng băng vĩnh viễn và lục địa này chiếm 87% băng trên thế giới.)",
            },
            {
              id: "p3e7q3",
              question:
                "How much of the world\'s ice is contained in Antarctica?",
              options: ["98 percent", "88 percent", "87 percent", "68 percent"],
              correct: 2,
              explanation:
                "The continent contains 87 percent of the world\'s ice. (Lục địa này chiếm 87% băng trên thế giới.)",
            },
          ],
        },
        {
          id: "p3e8",
          label: "Bai 8",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 08.mp3",
          transcript:
            "If a play makes you laugh, it\'s a comedy. Comedies have humorous characters and happy endings. A good example of a comedy is Shakespeare\'s classic Much Ado About Nothing. Another popular style is called tragedy. Tragedies usually tell how a hero ruins his life, talling from good fortune to bad fortune because of a \"tragic flaw\" in character. One example is the play Ghosts, by Henrik Ibsen.  Um, modern years have produced a third style, called tragicomedy. In tragicomedies, the play seems as though it will end in tragedy but instead has a humorous or unclear ending. An example is Saint Joan, by George Bernard Shaw.",
          questions: [
            {
              id: "p3e8q1",
              question:
                "What are the three types of plays mentioned in the talk?",
              options: [
                "Comedy, tragedy, tragicomedy",
                "Drama, comedy, tragedy",
                "Tragedy, humor, tragicomedy",
                "Thriller, comedy, tragedy",
              ],
              correct: 0,
              explanation:
                "Ba loại kịch gồm có: If a play makes you laugh, it\'s a comedy. (Nếu một tác phẩm khiến bạn cười, thì đó là hài kịch.) Another popular style is called tragedy. (Một loại phổ biến nữa là bi kịch.) Modern years have produced a third style, called tragicomedy. (Những năm gần đây, người ta đã sản xuất ra một thể loại thứ 3, đó là bi hài kịch.)",
            },
            {
              id: "p3e8q2",
              question: "Why does the professor mention the play by Ibsen?",
              options: [
                "To remind students of an example they previously studied",
                "To give an additional example of a comedy",
                "To show how Shakespeare influenced other writers",
                "To present a new type play",
              ],
              correct: 3,
              explanation:
                'Tragedies usually tell how a hero ruins his life, falling from good fortune to bad fortune because of a "tragic flaw" in character. One example is the play Ghosts, by Henrik Ibsen. (Bi kịch thường kể những câu chuyện về người anh hùng tự hủy hoại cuộc đời mình, đó là những người từ người tốt trở thành người xấu vì một “nét tính cách xấu” trỗi dậy trong con người. Một ví dụ là tác phẩm “Ghosts” của Henrik Ibsen.)',
            },
            {
              id: "p3e8q3",
              question: "Which is an example of a tragicomedy?",
              options: [
                "Much Ado About Nothing",
                "Saint Joan",
                "Ghosts",
                "Shakespeare",
              ],
              correct: 1,
              explanation:
                "In tragicomedies, the play seems as though it will end in tragedy but instead has a humorous or unclear ending. An example is Saint Joan, by George Bernard Shaw. (Với bi hài kịch, vở kịch dường như kết thúc giống như bi kịch nhưng thay vào đó lại có kết thúc hài hước và không thực sự rõ ràng. Một ví dụ là vở Saint Joan của Bernard Shaw.)",
            },
          ],
        },
        {
          id: "p3e9",
          label: "Bai 9",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 09.mp3",
          transcript:
            "One of the most effective ways to increase your vocabulary is through newspapers. They are cheap, and they have a wide variety of words. When you read an English newspaper, make a list of eight to ten words you don\'t know. Look them up in a dictionary. Then add them to your vocabulary notebook. If you learn eight new words each day, you will be learning new words taster than the average American. Professor? Yes? How can we remember the words after we write them? Spend 15 minutes each day reviewing words from the previous day. You\'ll be surprised how fast you learn.",
          questions: [
            {
              id: "p3e9q1",
              question: "What is the topic of the lecture?",
              options: [
                "Reading newspapers",
                "Increasing vocabulary",
                "Writing in a notebook",
                "American history",
              ],
              correct: 1,
              explanation:
                "Bài nói có nội dung về cách để tăng vốn từ vựng, ví dụ bằng cách: read an English newspaper, make a list of eight to ten words you don\'t know, spend 15 minutes each day reviewing words from the previous day, …",
            },
            {
              id: "p3e9q2",
              question: "Why does the speaker mention newspapers?",
              options: [
                "They are expensive.",
                "They are free.",
                "They don\'t have many difficult words.",
                "They are cheap and have a variety of new words.",
              ],
              correct: 3,
              explanation:
                "They are cheap, and they have a wide variety of words. (Chúng rẻ và cung cấp nhiều từ vựng.)",
            },
            {
              id: "p3e9q3",
              question: "What is the professor\'s main point?",
              options: [
                "Newspapers are a good place to learn new words.",
                "Increasing your vocabulary is difficult.",
                "Everyone should have a notebook.",
                "Students must learn 100 new words each week",
              ],
              correct: 0,
              explanation:
                "Giáo sư cho rằng đọc báo là một cách hiệu quả để học từ mới vì ông đã nói: If you learn eight new words each day, you will be learning new words faster than the average American. (Nếu bạn học 8 từ mới mỗi ngày thì bạn sẽ học được từ mới nhanh hơn một người Mỹ bình thường.) You\'ll be surprised how fast you learn. (Bạn sẽ ngạc nhiên với tốc độ mà bạn có thể học.)",
            },
          ],
        },
        {
          id: "p3e10",
          label: "Bai 10",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 10.mp3",
          transcript:
            "Track and Field events happened long before they became a sport. The San people in Africa are one example. They still hold what’s called a “Persistence” hunt. The men find the tracks of an antelope herd. They find the antelope and follow them for several days and nights. During this time, they study the animals and choose one. Then, the hunt begins. Only the fastest runner will go after the chosen animal. He and the animal may run for as long as eight hours. If the hunter “persists,” the deer will finally get tired and fall. Then, he’ll slaughter it.",
          questions: [
            {
              id: "p3e10q1",
              question: "What is the main idea of the talk?",
              options: [
                "The way people first hunted",
                "One reason for long-distance running",
                "Following antelope tracks",
                "Running",
              ],
              correct: 1,
              explanation:
                "Bài nói giải thích lý do xuất hiện cuộc thi chạy đường dài “Track and Field”",
            },
            {
              id: "p3e10q2",
              question: "What type of hunt is done by the San people?",
              options: [
                "Spear",
                "Bow and arrow",
                "Clever traps",
                "Persistence",
              ],
              correct: 3,
              explanation:
                "They still hold what’s called a “Persistence” hunt. (Họ vẫn sử dụng kiểu săn “Persistence”, nghĩa là sự bền bỉ.)",
            },
            {
              id: "p3e10q3",
              question:
                "How does the professor organize the information in the lecture?",
              options: [
                "By listing different kinds",
                "By describing a process",
                "By using contrasting examples",
                "By answering common questions",
              ],
              correct: 1,
              explanation:
                "Thông tin của bài nói được sắp xếp theo trình tự của một quá trình, cụ thể là quá trình săn bắt, từ khi bắt đầu cho đến khi kết thúc bắt được con mồi.",
            },
          ],
        },
        {
          id: "p3e11",
          label: "Bai 11",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 11.mp3",
          transcript:
            'Let’s talk about sneezing. when someone sneezes — Ah choo!— the customary response is, "Bless you" or "God bless you”. Why do we say this? There are several theories. Some of these are superstitions that is, things that many people believe but that aren’t really true. One superstition is that saying "bless you" keeps the devil from flying down your throat. Another is that "bless you" keeps your  soul from flying out of your body. Actually, there is a historical reason for this custom. There was a pope in Rome named Gregory the Great. When he was elected pope, the great plague was beginning all over Europe. Thousands of people were dying. In fact, the pope before Gregory had died of the plague. To get rid of the plague, Pope Gregory ordered people to march through the streets, asking for God’s help. If someone sneezed, others would immediately say "God bless you!" They hoped this would keep the person who sneezed from getting the plague. Today, of course, we know that when you sneeze, the devil trying to rush down your throat. Your soul won’t leave your body. And saying "bless you" to sneezers in the street is not going to cure disease. We do know, though, that each sneeze forces thousands of germs into the air People keep germs out of public places by covering their mouths when they sneezers And hearing an old fashioned "bless you" from a stranger can make us feel better when the sneezes begin.',
          questions: [
            {
              id: "p3e11q1",
              question: "What is the talk mainly about?",
              options: ["Geology", "Biology", "History", "Nature"],
              correct: 2,
              explanation:
                'Bài nói giải thích ý nghĩa của các cụm từ "Bless you" hay "God bless you" mà ngày xưa người ta thường nói sau khi ai đó hắt xì hơi.',
            },
            {
              id: "p3e11q2",
              question: "What is the main idea of the talk?",
              options: [
                "What happens when we sneeze",
                'Why people say "Bless you"',
                "How the plague started",
                "How many germs are in sneezes",
              ],
              correct: 1,
              explanation:
                'Let\'s talk about sneezing. When someone sneezes - Ah choo! The customary response is, "Bless you" or "God bless you." Why do we say this? (Chúng ta hãy cùng tìm hiểu về hành động hắt xì. Khi ai đó hắt xì thì người ta thường nói "Bless you" hoặc "God bless you." Tại sao chúng ta lại nói như vậy?',
            },
            {
              id: "p3e11q3",
              question: "Which statement is true?",
              options: [
                "Sneezing caused the plague.",
                'Responding "God bless you" to a sneeze began in Europe.',
                "A pope died from sneezing too often.",
                "When you sneeze, the devil will try to rush down your throat.",
              ],
              correct: 1,
              explanation:
                'There was a pope in Rome named Gregory the Great. When he was elected pope, the great plague was beginning all over Europe… If someone sneezed, others would immediately say "God bless you!" (Có một vị Giáo hoàng ở Rome tên là Gregory the Great. Vào thời ông làm Giáo hoàng, bệnh dịch đã lan khắp châu Âu… Nếu ai đó hắt xì thì những người khác sẽ nói "God bless you!" ngay lập tức.)',
            },
          ],
        },
        {
          id: "p3e12",
          label: "Bai 12",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 12.mp3",
          transcript:
            "It\'s a beautiful blue sky today. Ever wonder why it’s blue? It’s because the sun\'s rays scatter, or spread out, as they enter the Earth\'s atmosphere. Blue rays are scattered most; they seem to be all over the sky. Yellow rays are scattered less. This is why the sun looks yellow most of the time. But, after sunrise and just before sunset, the sun looks red. Why? Because then the rays must travel a longer  path into the atmosphere. More of the blue and yellow rays are scattered. The red rays are scattered the least So, they come through in the largest numbers.",
          questions: [
            {
              id: "p3e12q1",
              question: "What is the talk mainly about?",
              options: ["The sun", "Sunrises", "Rays from the sun", "Sunsets"],
              correct: 2,
              explanation:
                "Bài nói có nội dung về các loai tia sáng của mặt trời, khiến mặt trời có những màu sắc khác nhau.",
            },
            {
              id: "p3e12q2",
              question: "According to the speaker, why is the sky blue?",
              options: [
                "Because blue rays are the strongest.",
                "Because blue rays scatter the least",
                "Because blue rays scatter the most",
                "Because blue rays are the weakest",
              ],
              correct: 2,
              explanation:
                "Ever wonder why it’s blue? It’s because the sun\'s rays scatter, or spread out, as they enter the Earth\'s atmosphere. Blue rays are scattered most; they seem to be all over the sky. (Đã bao giờ bạn thắc mắc rằng tại sao bầu trời lại có màu xanh hay không? Đó là bởi vì những tia sáng của mặt trời lan tỏa ra khi chiếu xuống tầng khí quyển của Trái đất. Những tia sáng xanh chiếu ra nhiều nhất, dường như chúng ở mọi nơi trên bầu trời.)",
            },
            {
              id: "p3e12q3",
              question: "Which color of light ray scatters the least?",
              options: ["Red", "Yellow", "Blue", "They all scatter the same."],
              correct: 0,
              explanation:
                "The red rays are scattered the least. (Những tia sáng màu đỏ chiếu ra ít nhất.)",
            },
          ],
        },
        {
          id: "p3e13",
          label: "Bai 13",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 13.mp3",
          transcript:
            "We all know that we can get Vitamin D from sunshine. Long winters make it hard to get enough. People who don\'t get outside often don\'t get enough either. Without Vitamin D, we may develop weak bones and teeth We can get certain kinds of cancer more easily, too. Few foods other than fish naturally have much Vitamin D, so it\'s important to get some sunshine every day. But be careful. Too much can cause skin cancer. Notice what most animals that live outside all the time do. They are most active during the hours before sunrise and after sunset.",
          questions: [
            {
              id: "p3e13q1",
              question:
                "What aspect of health does the professor mainly discuss?",
              options: [
                "Being healthy in long winters by staying warm.",
                "Not getting skin cancer",
                "Getting enough sunshine to give your skin color",
                "The importance of getting vitamin D from sunshine",
              ],
              correct: 3,
              explanation:
                "Without Vitamin D, we may develop weak bones and teeth. We can get certain kinds of cancer more easily, too…it\'s important to get some sunshine every day. (Không có Vitamin D, răng và xương khớp của chúng ta sẽ yếu. Chúng ta sẽ có nguy cơ mắc bệnh ung thư cao hơn… Việc hấp thụ đủ ánh nắng mặt trời rất quan trọng.)",
            },
            {
              id: "p3e13q2",
              question: "What is the speaker\'s main point?",
              options: [
                "Don\'t go outside too much",
                "Many people need to take vitamins",
                "It is possible to get vitamin D from fish",
                "To get enough vitamin D, we need sunshine.",
              ],
              correct: 3,
              explanation:
                "It\'s important to get some sunshine every day. (Việc hấp thụ đủ ánh nắng mặt trời rất quan trọng.)",
            },
            {
              id: "p3e13q3",
              question:
                "How does the professor emphasize her point about getting enough vitamin D?",
              options: [
                "By explaining why animals get plenty of it.",
                "Bỵ explaining what happens when don\'t get enough of it",
                "By showing what happens when in the sun",
                "By showing a graph",
              ],
              correct: 1,
              explanation:
                "Giáo sư khẳng định quan điểm của mình bằng cách giải thích nếu con người không hấp thụ đủ Vitamin D thì điều gì sẽ sảy ra, thông tin cụ thể như câu 1.",
            },
          ],
        },
        {
          id: "p3e14",
          label: "Bai 14",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 14.mp3",
          transcript:
            'Folktales are stories that grow out of the lives or imaginations of people, or folk. Folktales began as an attempt to explain and understand the world around us Many folktales all over the world are nearly the same. Travelers passed them on from one country to another. Each person telling the folktales changes it slightly. The stories that traveled mostly over land changed a great deal. The ones that traveled by water changed less There are many different kinds of folktales. Some have simple plots with lots of repeated phrases and words. These are called cumulative folktales. One example is called "There Was an Old Lady Who Swallowed a Fly". This sentence is repeated on almost every page of the story. In some stories, animals talk just like humans. These are talking beast folktales. A famous example is "The Three Little Pigs". Humorous tales are meant for tun and nonsense. They are usually about someone who makes unbelievably tunny mistakes; such as the Norwegian husband who has to take care of his house and nearly destroys it. Romances are stories in which lovers seem hopelessly separated until magic brings them back together. A good example is"Beauty and the Beast". Tales of magic are types of stories we commonly call fairy tales. These include things like talking mirrors, enchanted torests, and magic kisses. "Snow white" is a popular example.',
          questions: [
            {
              id: "p3e14q1",
              question: "What is the talk mainly about?",
              options: [
                "Fairy tales",
                "Folktales",
                "Children\'s stories",
                "Traveling",
              ],
              correct: 1,
              explanation:
                "Bài nói có nội dung chính về “folktales”, nghĩa là các câu chuyện dân gian. Bài nói nói về nội dung và đưa ra một số ví dụ về truyện dân gian.",
            },
            {
              id: "p3e14q2",
              question:
                "According to the professor, what might be include in a folktale?",
              options: [
                "Repeated parts and magic",
                "Plant that change to animals",
                "Lovers with humorous names",
                "Names of real people and place",
              ],
              correct: 0,
              explanation:
                "Some have simple plots with lots of repeated phrases and words. (Một vài câu chuyện có những trích đoạn đơn giản với nhiều câu từ được lặp lại.) Tales of magic are types of stories we commonly call fairy tales. These include things like talking mirrors, enchanted forests, and magic kisses. (Truyện thần kỳ là loại truyện chúng ta hay gọi là truyện cổ tích. Những câu chuyện này bao gồm những điều kỳ bí như chiếc gương biết nói, khu rừng bi ám hay những nụ hôn thần kỳ.)",
            },
            {
              id: "p3e14q3",
              question: "What is the topic of the talk?",
              options: [
                "History of folk tales",
                "Authors of folk tales",
                "Types of folk tales",
                "Reasons people told tales",
              ],
              correct: 2,
              explanation:
                "Chủ đề của bài nói là giới thiệu về các loại truyện dân gian, gồm có cumulative folktales, talking beast folktales, humorous tales, fairy tales.",
            },
          ],
        },
        {
          id: "p3e15",
          label: "Bai 15",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 15.mp3",
          transcript:
            "Spiders can spin silk better than any other insect. Only a few others, like silkworms, can make silk. Spiders use silk in many different ways They often use same way a mountain climber uses rope. They’ll drop down on a silk strand. If they get into trouble, they can quickly run back up again. Another way they use silk is to make homes for their babies. Most kinds of spiders spin a thick silk covering around their eggs. Some spin it around the new little spiders. Spiders can make different kinds of silk strands. One way is to coat a silk strand with different materials. They might sticky to catch a fly I think we\'ve all seen a fly getting stuck spiders web. You sometimes notice because the fly buzzes loudly. Or a spider might water-proof the silk with something. Then, they can stay dry in a rainstorm. A trapdoor spiders hole is a good example The door over the trapdoor spider 5 hole water-proof roof made of spider silk.",
          questions: [
            {
              id: "p3e15q1",
              question: "What is the talk mainly about?",
              options: [
                "Mosquitoes",
                "Problems caused by flies",
                "Silk worms",
                "Silk made by spiders",
              ],
              correct: 3,
              explanation:
                "Bài nói có nội dung chính về tơ nhện, cụ thể là các cách chăng tơ.",
            },
            {
              id: "p3e15q2",
              question:
                "According to the professor, what kind of coating might silk have?",
              options: ["Wet", "Sticky", "Smooth", "Dry"],
              correct: 1,
              explanation:
                "They might make it sticky to catch a fly. (Chúng làm tơ dính để bắt ruồi.)",
            },
            {
              id: "p3e15q3",
              question: "Which statement is NOT true?",
              options: [
                "Spiders make many different kinds of silk strands.",
                "Spider silk is completely different from silkworm silk.",
                "Spiders can make silk.",
                "Spiders use silk in many different ways.",
              ],
              correct: 1,
              explanation:
                "Spiders can spin silk better than any other insect. Only a few others, like silkworms, can make silk. (Nhện có thể làm ra tơ giỏi hơn những loài côn trùng khác. Chỉ có một ít loài khác, ví dụ như tằm, mới có thể làm ra tơ.) Thông tin trong đáp án B không được nói đến trong bài.",
            },
          ],
        },
        {
          id: "p3e16",
          label: "Bai 16",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 16.mp3",
          transcript:
            "In North America, the best weavers are a group of people called the Pueblo that\'s P-U-E-B-L-O. The Pueblo have been weaving clothes, baskets, and blankets since at least 1000 BC. At first, they used their fingers to weave together vegetable fibers and animal hair. In the first century AD, they began growing cotton. About this time, they also started using a loom a kind of, um, machine that helped them weave the cotton into cloth more quickly and easily. By the year 1600, the Pueblos had sheep, so they began weaving wool, using the same methods they had used for weaving cotton.",
          questions: [
            {
              id: "p3e16q1",
              question: "What is the speaker\'s main point?",
              options: [
                "The Pueblos are good weavers.",
                "The Pueblos grew cotton.",
                "The Pueblos had sheep.",
                "The Pueblos live in North America.",
              ],
              correct: 0,
              explanation:
                "In North America, the best weavers are a group of people called the Pueblo.  (Ở Bắc Mỹ, những thợ dệt giỏi nhất đều thuộc bộ tộc Pueblo.)",
            },
            {
              id: "p3e16q2",
              question: "Why did the Pueblos start weaving with a loom?",
              options: [
                "The loom was cheaper.",
                "Their fingers were broken.",
                "They were afraid to try something new.",
                "The loom made weaving faster and easier.",
              ],
              correct: 3,
              explanation:
                "About this time, they also started using a loom — a kind of, um, machine that helped them weave the cotton into cloth more quickly and easily. (Vào thời gian này, họ cũng bắt đầu sử dụng một loại máy giúp họ dệt bông thành vải len nhanh và dễ dàng hơn.)",
            },
            {
              id: "p3e16q3",
              question:
                "How does the speaker present the information in the lecture?",
              options: [
                "Chronological order",
                "Major types with examples",
                "Order of importance",
                "Steps within a process",
              ],
              correct: 0,
              explanation:
                "Bài nói cung cấp thông tin theo trình tự thời gian, từ 1000 BC, first century AD đến năm 1600.",
            },
          ],
        },
        {
          id: "p3e17",
          label: "Bai 17",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 17.mp3",
          transcript:
            "Acupuncture is a way of treating sick people. The Chinese developed it over 2,500 years ago, and it is still used today. In acupuncture, small metal needles are inserted into spots on the human body. There are 787 of these spots. Each one is connected to a special body part or System. If, um, your ear hurts, for example, the doctor will put needles into all the spots connected with your ear. The needles don\'t hurt because they don\'t go in very far. Sometimes the doctor runs an electric current through the needles. We don\'t understand exactly why this helps people.",
          questions: [
            {
              id: "p3e17q1",
              question: "What is the speaker\'s main point?",
              options: [
                "Acupuncture comes from China.",
                "Nobody understands why acupuncture works.",
                "Acupuncture is an ancient treatment still used today.",
                "Acupuncture is better than Western medicine.",
              ],
              correct: 2,
              explanation:
                "Acupuncture is a way of treating sick people. The Chinese developed it over 2,500 years ago, and it is still used today. (Châm cứu là một cách để chữa bệnh cho người ốm. Người Trung Quốc đã phát triển từ 2500 năm trước đây, và cách điều trị này vẫn được sử dụng cho đến ngày hôm nay.)",
            },
            {
              id: "p3e17q2",
              question: "Why does the professor mention ears?",
              options: [
                "To explain a personal experience",
                "To give a general example",
                "To highlight an important body part",
                "To present one exception",
              ],
              correct: 1,
              explanation:
                "In acupuncture, small metal needles are inserted into spots on the human body. There are 787 of these spots. Each one is connected to a special body part or system. If, um, your ear hurts, for example, the doctor will put needles into all the spots connected with your ear. (Trong châm cứu, những cái kim kim loại nhỏ được đâm nhẹ vào cơ thể con người. Có 787 vi trí có thể đâm kim vào. Mỗi chỗ liên quan đến một bộ phận đặc biệt trên cơ thể. Nếu tai bạn bị đau thì bác sĩ sẽ châm kim vào những điểm kết nối với tai của bạn.)",
            },
            {
              id: "p3e17q3",
              question: "Why does acupuncture help people?",
              options: [
                "It is magic.",
                "We don\'t know.",
                "It uses heat.",
                "Because the needles hurt.",
              ],
              correct: 1,
              explanation:
                "We don\'t understand exactly why this helps people. (Chúng ta không thể hiểu chính xác tại sao cách điều tri này lại có hiệu quả.)",
            },
          ],
        },
        {
          id: "p3e18",
          label: "Bai 18",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 18.mp3",
          transcript:
            "Some people are surprised to know that walking is very good exercise. 00:08 It seems very easy, but it does us a lot of good. 00:12 It cleans the blood, tones up muscles, 00:15 and strengthens bones. 00:17 It even helps people lose weight. 00:18 One study showed that fast walking keeps your heart healthy. 00:23 Men who walked fast were 50 percent less likely to have heart disease. 00:29 You don\'t need much equipment to do it, 00:31 and almost anyone, anywhere, at any time, can do it. 00:36 It\'s not difficult to plan walks into your day. 00:39 You can walk to work, to catch a train, or to a park. 00:43 You can walk to shops or enjoy walks in the country. 00:46 It\'s a great way to spend time with family and friends. 00:50 People have some of their best conversations while walking. 00:54 It\'s best to do some stretches before and after you walk. 00:58 Take short quick steps, stand straight, and take deep breaths. 01:03 For basic health, it\'s good to walk most days of the week. 01:07 Walk for 20 to 30 minutes or more at a \"talking pace.\" 01:12 To lose weight, walk for 30 to 45 minutes or more. 01:16 Walk as many days as you can. 01:19 Walk fast enough so that you finish slightly out of breath. 01:23 To make your heart stronger, 01:25 walk quickly for 20 minutes or more. 01:27 If you can, walk where there are some small hills. 01:31 Walk two or three times a week. 01:33 Go as fast as you can, but enjoy yourself. 01:36 Exercise should never be painful.",
          questions: [
            {
              id: "p3e18q1",
              question: "Why does the professor suggest everyone should walk?",
              options: [
                "Because there are hills nearby",
                "To lose weight",
                "In order to stretch before jogging",
                "For general health",
              ],
              correct: 3,
              explanation:
                "Some people are surprised to know that walking is very good exercise, it seems very easy, but it does us a lot of good. It cleans the blood, tones up muscles, and strengthens bones. (Một số người rất ngạc nhiên khi biết rằng việc đi bộ là rất tốt. Nhìn có vẻ rất dễ dàng nhưng nó lại đem đến cho chúng ta nhiều lợi ích. Nó làm sạch máu, tạo bắp thịt, và làm chắc xương.)",
            },
            {
              id: "p3e18q2",
              question: "What is NOT mentioned in the presentation?",
              options: [
                "Walking to train for sports",
                "Walking for basic health",
                "Walking to lose weight",
                "Walking to make your heart stronger",
              ],
              correct: 0,
              explanation:
                "B sai vì For basic health, it’s good to walk most days of the week. (Để đảm bảo sức khỏe, chúng ta cần đi bộ hầu hết các ngày trong tuần.) C sai vì To lose weight, walk for 30 to 45 minutes or more. (Để giảm cân, hãy đi bộ khoảng 30 đến 45 phút hoặc hơn.) D sai vì To make your heart stronger, walk quickly for 20 minutes or more. (Để tim của bạn khỏe hơn, hãy đi bộ nhanh khoảng 20 phút hoặc hơn.)",
            },
            {
              id: "p3e18q3",
              question: "Why should people walk with friends or family?",
              options: [
                "For safety",
                "Because accidents can happen",
                "In order to walk taster",
                "To talk while walking",
              ],
              correct: 3,
              explanation:
                "It\'s a great way to spend time with family and friends. People have some of their best conversations while walking.  (Đó là một cách tuyệt vời để dành thời gian bên gia đình và bạn bè. Mọi người thường nói chuyện thú vị với nhau khi đang đi bộ.)",
            },
          ],
        },
        {
          id: "p3e19",
          label: "Bai 19",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 19.mp3",
          transcript:
            "Today, we’re going to see how much you know about China It’s got the Great Wall And rice. And chopsticks! No, not that China. Yes, China is a country. But there’s another china-the kind you eat off of. This china is a fancy type of porcelain. Porcelain is a material used to make plates, cups, and bowls. When people get married in America, one of oldest customs is for the bride and groom to choose which type of china they want for their new home. There are four main processes in creating china. These are clay making, glazing, and decorating. In the clay-making process, five ingredients are mixed together with water and shaped into tubes. These tubes are called pugs: P-U-G-S. In the mold-making process, plaster is poured into metal molds to make productions molds. These production molds are then used to shaped the pugs into plates, cup, and bowls. Next, comes the glazing process. Glaze is like liquid glass. When it’s heated, glaze forms a protective shell around each piece of china. Glaze is incredibly strong. A store in Canada once showed how strong china is by using four teacups to support a race car! Can you picture that a heavy car with only one small cup under each wheel? After glaze, the china is ready for decorating. Here, artists use 85 patterns and 400 different shapes to make the china look beautiful. Then, it’s ready to be sold.",
          questions: [
            {
              id: "p3e19q1",
              question: "Why does the professor mention a race car?",
              options: [
                "To give an example of china’s strength",
                "To explain the clay-making process",
                "To show how beautiful china is",
                "To boast how fast he works",
              ],
              correct: 0,
              explanation:
                "A store in Canada once showed how strong china is by using four teacups to support a race car! Can you picture that – a heavy car with only one cup under each wheel? (Một nhà kho ở Canada đã chứng minh thấy gốm sứ rất chắc chắn bằng cách sử dụng bốn tách trà để chặn một cái xe đua! Bạn có thể hình dung ra một cái ô tô nặng như thế mà chỉ bị chặn bởi một cái cốc dưới mỗi bánh xe?)",
            },
            {
              id: "p3e19q2",
              question:
                "What can be inferred about how china is painted or decorated?",
              options: [
                "There are only a few acceptable ways to decorate real china.",
                "The type of glaze determines the decoration used on china.",
                "China can have various decorations.",
                "Expensive china is usually rather plain.",
              ],
              correct: 2,
              explanation:
                "After glazing, the china is ready for decorating. Here, artists use 85 patterns and 400 different shapes to make the china look beautiful. (Sau khi được tráng men, gốm sứ sẽ được trang trí. Ở đây, những nhà nghệ sĩ sử dụng 85 mẫu và 400 hình dạng khác để trang trí gốm sứ.)",
            },
            {
              id: "p3e19q3",
              question: "What is a pug?",
              options: [
                "A metal mold with plaster inside it",
                "A certain kind of china",
                "A type of glaze for china",
                "A clay tube that can be shaped",
              ],
              correct: 3,
              explanation:
                "In the clay making process, five ingredients are mixed together with water and shaped into tunes. These tubes are called pugs.  (Trong quá trình nhào nặn đất sét, có năm thành phần được trộn lẫn cùng với nước và khuôn. Những cái ống này được gọi là đất sét trộn.)",
            },
          ],
        },
        {
          id: "p3e20",
          label: "Bai 20",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 20.mp3",
          transcript:
            "More people are buying home computers and using them for home networks. They need taster ways to get information over the Internet. Right now, there are mainly two avenues for information to be sent. These are cable modems and Asymmetric Digital Subscriber Lines or ADSL. These taster ways of sending information are called broadband connections. Cable modems and ADSL are both types of broadband connections. They are much taster than a 56K modem. There is another new kind of DSL connection. It is known as very high bit rate DSL or VDSL. Some companies already have this for certain places. VDSL isn’t everywhere yet, but it may be very soon. Many people like it and are beginning to use it. VDSL accommodates a very, very large amount of bandwidth. It gives up to about 52 megabytes per second. In other words, it provides 52 Mbps In comparison, ADSL or cable modems can only give 8 to 10 megabytes per second. It\'s easy to see that VDSL is a lot faster. VDSL will soon be more common, making home networks cost much less. In the United States, a telephone line has two copper wires. These wires have a very broad bandwidth. A telephone call only uses a very small part of the bandwidth. The telephone wires can carry much more information than telephone calls. DSL can use this extra bandwidth at the same time a call is being made. It can do this without changing the sound of the telephone call.",
          questions: [
            {
              id: "p3e20q1",
              question:
                "How does the speaker present information about DSL connections?",
              options: [
                "Explaining historical developments over the years",
                "Listing problems that led to faster connections",
                "Describing hardware related to types of connections",
                "Comparing different kinds of connections",
              ],
              correct: 3,
              explanation:
                "Dựa vào nội dung của cả bài, cụ thể là trong bài có so sánh 56K modem, cable modems, ADSL và VDSL.",
            },
            {
              id: "p3e20q2",
              question: "Which statement is NOT true?",
              options: [
                "VDSL is the newest, fastest Internet connection.",
                "Copper telephone wires can be used to send DSL signals.",
                "There are too many kinds of Internet connections.",
                "Home networks need higher speed Internet connections.",
              ],
              correct: 2,
              explanation:
                "Right now, there are mainly two avenues for information to be sent. These are cable modems and Asymmetric Digital Subscriber Lines or ADSL. (Ngay bây giờ, có hai đường truyền để gửi thông tin. Đó là những mô đem cáp và những hàng ADSL.)",
            },
            {
              id: "p3e20q3",
              question: "What type of Internet connection is the fastest?",
              options: ["VDSL", "56K modem", "Cable modem", "ADSL"],
              correct: 0,
              explanation:
                "In comparison, ADSL or cable modems can only give 8 to 10 megabytes per second. It\'s easy to see that VDSL is a lot faster. (Khi so sánh, ADSL hay những mô đem cáp có thể chỉ truyền được 8 đến 10 megabyte trên giây. Vì thế nên dễ dàng nhận thấy VDSL nhanh hơn nhiều.)",
            },
          ],
        },
        {
          id: "p3e21",
          label: "Bai 21",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 21.mp3",
          transcript:
            'Most animals in the world have some kind of way to hide themselves so that they can hunt for food and protect themselves from other animals. This method of hiding is called camouflage C-A-M-O-U-F-L-A-G-E The simplest form of camouflage is for animals to "blend in" with their surroundings. Their colors match the surroundings in which they live, which makes them hard to see. Deer and other forest animals, for example, have light brown colors that help them blend in with the brown trees and dirt on the forest ground. Many fish have a gray-blue color. This helps them blend in with the soft light under water. other animals use color patterns to help them blend in. A tiger\'s pattern of black stripes and orange fur blends into the long grass where it hunts. This makes the tiger difficult for its victims to spot-until it’s too late! Another form of camouflage is called copying. For instance, a king snake is red, yellow, and black. It copies the colors of the coral snake. The coral snake is very dangerous; its bite can kill you. The king snake is not dangerous, but other animals are afraid to attack the king snake because it looks like a coral snake. A third form of camouflage is disguise D-I-S-G-U-l-S-E This means that an animal looks like something else. For instance, a crocodile in the water can look just like a floating log. This disguise helps it catch deer when they come near the water to drink.',
          questions: [
            {
              id: "p3e21q1",
              question:
                "How does the professor organize the information in the lecture",
              options: [
                "Most common to least common",
                "Type followed by example",
                "Most effective to least effective",
                "Small animals to large animals",
              ],
              correct: 1,
              explanation:
                "Bài nói cung cấp thông tin theo cách nêu tên loại ngụy trang, nêu định nghĩa của loại ngụy trang đó rồi đưa ra ví dụ.",
            },
            {
              id: "p3e21q2",
              question:
                "Which animals use camouflage to blend in with their surroundings?",
              options: [
                "Deer and tigers",
                "Fish and snakes",
                "Tigers and crocodiles",
                "Snakes and birds",
              ],
              correct: 0,
              explanation:
                'The simplest form of camouflage is for animals to "blend in" with their surroundings. Their colors match the surroundings in which they live, which makes them hard to see. Deer and other forest animals, for example, have light brown colors that help them blend in with the brown trees and dirt on the forest ground. (Cách đơn giản nhất để ngụy trang là ẩn mình trong môi trường sống. Màu của chúng sẽ hài hòa với môi trường mà chúng sinh sống, khiến chúng khó bị phát hiện hơn. Hươu nai và những loài động vật khác có màu nâu nhạt nên có thể trốn sau những cái cây màu nâu hoặc trên nền rừng.)',
            },
            {
              id: "p3e21q3",
              question:
                "What are the three main types of camouflage mentioned in the talk?",
              options: [
                "Blend in, copy, surprise",
                "Run away, blend in, hide",
                "Copy, disguise, blend in",
                "Disguise, change colors, copy",
              ],
              correct: 2,
              explanation:
                'Có 3 loại là "blend in" (ẩn mình) , copying (bắt chước) và disguise (giả mạo).',
            },
          ],
        },
        {
          id: "p3e22",
          label: "Bai 22",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 22.mp3",
          transcript:
            "Mmm. I love coffee. It wakes me up! You know why? Because it has caffeine. Caffeine is a kind of drug. Ah! Caffeine is found: naturally in many plants, such as coffee beans, tea leaves and cocoa nuts. It\'s also added artificially to many other kinds of food and drinks. So, it\'s safe to say that the typical American gets plenty of caffeine. As a matter of fact, most of us get too much. More than half of all adults in the United States consume more than 300 milligrams of caffeine each day. Including me! Seriously, though ..too much caffeine is not good for your body. Caffeine interferes with a chemical in your brain called adenosine. That\'s A-D-E-N-O-S-l-N-E. Now normally adenosine helps prepare your body for rest This chemical slows down nerve cells, which causes you to become sleepy. To the nerve cells in your brain, caffeine looks just like adenosine, but caffeine acts differently. Instead of slowing down your nerve cells, caffeine speeds them up. As a result, your heart starts to beat faster. Your breathing tubes open wider. Your blood pressure rises. Blood vessels tighten near the surface of your skin. The blood flowing into your stomach slows down. Your muscles tighten up, ready for action. This is why, after consuming a big cup of coffee, you feel excited You can feel your heartbeat increasing. You\'re ready to do something, go somewhere, run, play, fight, conquer the world... or else start STUDYING to get ready for the next test!",
          questions: [
            {
              id: "p3e22q1",
              question:
                "What aspect of caffeine does the professor mainly discuss?",
              options: ["History", "Marketing", "Physical effect", "Coffee"],
              correct: 2,
              explanation:
                "Bài nói nói về ảnh hưởng của cafein lên cơ thể con người, được thể hiện rõ qua đoạn: “Instead of slowing down your nerve cells, caffeine speeds them up… You can feel your heartbeat increasing. You’re ready to do something, go somewhere, run, play, fight, conquer the world… or else start STUDYING to get ready for the next test!” (Thay vì làm chậm những tế bào thần kinh, cafêin khiến chúng hoạt động nhanh hơn…Bạn có thể cảm thấy nhịp tim của các bạn tăng. Bạn sẵn sàng để làm cái gì đó, đi đâu đó, chạy, chơi, đấu tranh, chinh phục cả thế giới hay đơn giản là sẵn sàng học để sẵn sàng cho kỳ thi sắp tới.)",
            },
            {
              id: "p3e22q2",
              question: "According to the professor, what is adenosine?",
              options: [
                "A chemical in caffeine",
                "A part of brain",
                "A chemical in the body",
                "A plant used to make coffee",
              ],
              correct: 2,
              explanation:
                "Caffeine interferes with a chemical in your brain called adenosine. (Cafêin ảnh hưởng đến một chất trong não của các bạn gọi là adenosin.)",
            },
            {
              id: "p3e22q3",
              question: "What is the speaker\'s main point?",
              options: [
                "Caffeine is a drug.",
                "Caffeine can harm your body.",
                "Caffeine is found in coffee.",
                "Everyone consumes too much caffeine.",
              ],
              correct: 1,
              explanation:
                "Seriously, though too much caffeine is not good for your body. (Nghiêm túc mà nói thì quá nhiều cafêin cũng không tốt cho thân thể của các bạn.)",
            },
            {
              id: "p3e22q4",
              question: "What does the professor imply?",
              options: [
                "She is Canadian.",
                "She doesn\'t live in the United States.",
                "She\'s very worried about consuming caffeine.",
                "She is not worried about consuming caffeine.",
              ],
              correct: 3,
              explanation:
                "Bên trên cô ấy có nói “Seriously, though too much caffeine is not good for your body” nhưng nếu không uống quá nhiều thì sẽ không sao, hơn nữa vì những lợi ích của caffeine nên cô ấy thích uống cà phê và không thể hiện lo lắng nhiều về việc tiêu thụ cà phê.",
            },
          ],
        },
        {
          id: "p3e23",
          label: "Bai 23",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 23.mp3",
          transcript:
            "We use microscopes to help us study cells. Because cells are so small, we can\'t see them without magnification um, the ability to make them look bigger. The first microscopes were called light microscopes. They were pretty simple devices. They were also simple to use. Scientists first cut the cells, or specimens, into thin sections. Then they stained the specimens with different colored materials, called dyes. The dyes helped them see the specimens more clearly. Unfortunately, dyes often killed the cells, too. That limited what scientists could find out about the specimen. In recent years, we have developed more powerful microscopes. These help us view living specimens. One of these new microscopes is called the phase contrast microscope It\'s made in such a way that part of the light passing through it moves more slowly than the rest of the light. We say this part of the light is \"out of phase\" with the rest of the light. This enables scientists to see differences in living specimens as light and shade. Another type of new microscope is the electron microscope. This uses electrons to form images, instead of light. Electrons travel in waves, similar to light, but their wavelengths are over 100,000 times shorter than those of light. Therefore, they can give much clearer magnification. Electron microscopes even allow scientists to take pictures of the cells they are studying!",
          questions: [
            {
              id: "p3e23q1",
              question: "Why does the professor mention dyes?",
              options: [
                "They were used with light microscopes.",
                "They were developed with microscopes.",
                "He studies them with microscopes.",
                "All microscopes use them.",
              ],
              correct: 0,
              explanation:
                "The first microscope was called light microscopes. They were pretty simple devices. They were also simple to use. Scientists first cut the cells or specimen into thin sections. Then they stained the specimens with different colored materials, called dyes. (Kính hiển vi đầu tiên được gọi là những kính hiển vi ánh sáng. Chúng là những thiết bị tương đối đơn giản. Chúng cũng đơn giản trong việc sử dụng. Những nhà khoa học đã cắt những tế bào hay mẫu vào trong những lát mỏng. Rồi họ làm biến màu những mẫu với nguyên liệu được nhuộm màu khác, gọi là thuốc nhuộm.)",
            },
            {
              id: "p3e23q2",
              question:
                "Why can electrons give clearer magnification than light?",
              options: [
                "Electrons travel in waves.",
                "Light is out of phase.",
                "Light is too weak.",
                "Electrons have shorter wavelengths",
              ],
              correct: 3,
              explanation:
                "This uses electrons to form images, instead of light. Electrons travel in waves, similar to light, but their wavelengths are over 100,000 times shorter than those of light. Therefore, they can give much clearer magnification. (Loại máy này dùng electrons để hình thành ảnh, thay vì ánh sáng. Electrons hoạt động tương tự như ánh sáng, trừ việc bước sóng của chúng ngắn hơn người ánh sáng 100, 000 lần. Bởi vậy, chúng sẽ giúp ta nhìn rõ hơn nhiều.)",
            },
            {
              id: "p3e23q3",
              question: "What is the speaker\'s main point?",
              options: [
                "Microscopes are interesting.",
                "There are three types of microscope.",
                "Microscopes are useful to scientists.",
                "Microscopes have improved.",
              ],
              correct: 3,
              explanation:
                "Bài nói có nội dung về việc kính hiển vi đang được phát triển, cải tiến: “In recent years, we have developed more powerful microscopes.”",
            },
          ],
        },
        {
          id: "p3e24",
          label: "Bai 24",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 24.mp3",
          transcript:
            "So, you\'ve heard of the Gettysburg Address. But do you know the story behind it? The worst battle of the American Civil War was tought in Gettysburg, Pennsylvania. The Northern Army tought back the Southern Army. The battle lasted three days. Afterward, the field was left covered with bodies of dead soldiers. In November 3, President Abraham Lincoln came to Gettysburg He was to speak at the opening of the cemetery there. Music played and soldiers saluted. Edward Everett, governor of Massachusetts, talked first for almost two hours. Then Lincoln stood up. He looked out over the valley. Then, he began to speak. He said they couldn\'t do anything to make this place special. He said that the soldiers who had tought so hard had already done that. He said that, everyone would soon forget what was spoken that day but he said that what the soldiers did would never be forgotten. He said everyone should keep doing what these soldiers began. They should keep fighting for freedom for all the people. Then, they could make sure the soldiers didn\'t die needlessly. The presidents speech only lasted two minutes! Everyone cheered and then left. Lincoln turned to Edward Everett. He said he thought he should have planned his speech better. Edward Everett didn\'t agree. He said, \"It was perfect. You said more in two minutes than I did in two hours.\" Afterward, the newspapers said it was a great speech. And, as you know, Americans still remember it today.",
          questions: [
            {
              id: "p3e24q1",
              question: "Why did Lincoln go to Gettysburg?",
              options: [
                "To ask people to vote for him",
                "To tight the army from the South",
                "To honor the soldiers who died there",
                "To build a school for soldiers",
              ],
              correct: 2,
              explanation:
                "Tổng thống Lincoln đã đến để tưởng niệm những người lính đã hi sinh trong cuộc nội chiến.",
            },
            {
              id: "p3e24q2",
              question:
                "Why did Lincoln say they couldn\'t do anything to make the place special?",
              options: [
                "They had lost the battle.",
                "The battle had ruined the field.",
                "It couldn\'t be done.",
                "The soldiers who fought there had already done that.",
              ],
              correct: 3,
              explanation:
                "He said they couldn\'t do anything to make this place special. He said that the soldiers who had fought so hard had already done that.  (Tổng thống nói họ đã không thể làm bất cứ điều gì để làm chỗ này đặc biệt. Tổng thống nói những người lính đã đấu tranh vì mảnh đất này đã làm điều đó rồi.)",
            },
            {
              id: "p3e24q3",
              question: "What is the speaker\'s main point?",
              options: [
                "The Northern army won the war.",
                "Edward Everett talked for almost two hours.",
                "It was a great speech, long remembered.",
                "No one remembers this speech anymore.",
              ],
              correct: 2,
              explanation:
                "Người nói thể hiện niềm ngưỡng mộ đối với bài phát biểu của Tổng thống Lincoln. “The newspapers said it was a great speech. And, as you know, Americans still remember it today.” (Báo chí nói rằng đó là một bì phát biểu tuyệt vời. Và như bạn thấy đấy, người Mỹ vẫn nhớ nó cho đến ngày hôm nay.)",
            },
          ],
        },
        {
          id: "p3e25",
          label: "Bai 25",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 25.mp3",
          transcript:
            "Let’s begin our study of Vitamin D. It’s something we must have. Among other things, it helps our bodies use the important min-earl, calcium. Calcium makes uor bones strong. It also helps our nerves and muscles work the way they should. Let’s open our textbooks to page 63. I’d like you to take a look at these pictures. As you can see, these children don’t look well at all. The bones in their heads haven’t come together as they should. That’s why their heads are too big. Their legs curve out. The bones are too soft to stand on These children didn’t get enough Vitamin D. Happily, we don’t see this often any more. Vitamin D is not in most of the foods we eat. We get it mostly from the sun. Ultraviolet rays from the sun transform something in our skin. It becomes what’s called previtamin D3. Inside our bodies, it can changes again. It become what’s called active vitamin D. With active Vitamin D, our bones can make enough calcium to stay hard. Active Vitamin D helps us have enough calcium for our nerves too. This help us feel calm and sleep well. Today, many people need to have strong bones. Many older people’s bones, especially, break far too easily. One main reason why is that people don’t get nearly enough sunlight. We close windows to stay warm in the winter. In summer, we close windows for air conditioning. But we ready need time in the sunshine almost every day.",
          questions: [
            {
              id: "p3e25q1",
              question: "What is shown in the picture in the students\' books?",
              options: [
                "Old bones",
                "Milk, cheese, and eggs",
                "Children",
                "Human brain",
              ],
              correct: 2,
              explanation:
                "I’d like you to take a look at these pictures. As you can see, these children don’t look well at all. (Tôi muốn các bạn nhìn những bức ảnh này. Như bạn có thể nhìn thấy, những đứa trẻ này không khỏe chút nào.)",
            },
            {
              id: "p3e25q2",
              question:
                "According to the professor, why do old people have weak bones?",
              options: [
                "Milk was not popular long ago.",
                "Ultraviolet rays damage bones.",
                "Old people sleep more than younger people",
                "Old people don\'t go outdoors enough.",
              ],
              correct: 3,
              explanation:
                "Many older people’s bones, especially, break far too easily. One main reason why is that people don’t get nearly enough sunlight.  (Xương của người già, một cách đặc biệt, gãy quá dễ dàng. Một lý do chính là những người không hấp thụ đủ ánh sáng mặt trời.)",
            },
            {
              id: "p3e25q3",
              question:
                "Why do we need to spend time in the sunshine almost every day?",
              options: [
                "To get a suntan",
                "To get minerals",
                "To get enough vitamin D",
                "To help our bodies get rid of calcium",
              ],
              correct: 2,
              explanation:
                "Hiển nhiên chúng ta cần ra ngoài nắng để hấp thụ đủ Vitamin D",
            },
          ],
        },
        {
          id: "p3e26",
          label: "Bai 26",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 26.mp3",
          transcript:
            "I did a search on Google yesterday. It was amazing. I types in “horses” and hit the search button. It less than a second, it showed me more than 32 million websites related to horses. Do you ever wonder how computers can think so fast? Well, I did another Google search, and I found out. Computer chips are based on something called Boolean logic. This is a type of thinking developed in the mid- 0s by George Boole – B-O-O-L-E. Boolean logic maps information into bits and bytes. It begins with seven electronic pathways, calles gates. The simplest gate is called a NOT gate. The NOT gate takes one bit of input, which we’ll label A, and produces an outputs, which we’ll label Q, that is exactly opposite. So, if input, A, is one, the output Q, will be zero. If A is zero, Q will be one. Simple. Next is the AND gate. The idea behind an AND gate is this: if there are two bits of input, say, A and B, and if A and B are both the same, then the output, called Q, should be the same. After the NOT gate and the AND get comes the OR gate. Its basic idea is, “If A or B is one, or if both A and B are one, then Q is also one”. The next two gates are called NAND and NOR. These two gates are simply combinations of an AND or an OR gate with a NOT gate. Now, next comes...",
          questions: [
            {
              id: "p3e26q1",
              question: "Why does the professor mention “horses”?",
              options: [
                "To introduce the information about horses",
                "To show students how to do web based research",
                "To introduce her lecture with an example students could relate to",
                "To contrast today’s computers with older computers.",
              ],
              correct: 2,
              explanation:
                "Cô ấy đề cập đến “horses” là để liên hệ cho học sinh biết máy tính thông minh như thế nào.",
            },
            {
              id: "p3e26q2",
              question:
                "According to the speaker, why are computers able to think so fast?",
              options: [
                "Because of AND gates",
                "Because of electrons",
                "Because of NOT gates",
                "Because of Boolean logic",
              ],
              correct: 3,
              explanation:
                "Do you ever wonder how computers can think so fast? Well, I did another Google search, and I found out. Computer chips are based on something called Boolean logic. (Bạn đã bao giờ tự hỏi tại sao máy tính có thể nghĩ nhanh như vậy? Tôi đã tìm kiếm trên Google và tôi phát hiện ra máy tính dựa vào lôgic Đại số Boolean.)",
            },
            {
              id: "p3e26q3",
              question:
                "What would be the output for the input 0, 0 into an AND gate?",
              options: ["0, 0", "1, 1", "1", "0"],
              correct: 3,
              explanation:
                "If A and B are both the same, then the output, called Q, should be the same. (Nếu A và B mang giá trị giống nhau thì kết quả, gọi là Q, cũng mang giá trị đó.)",
            },
            {
              id: "p3e26q4",
              question: "What will the speaker probably discuss next?",
              options: [
                "George Boole\'s childhood",
                "Multiple bits of input",
                "Google",
                "More types of gates",
              ],
              correct: 3,
              explanation:
                "If A and B are both the same, then the output, called Q, should be the same. (Nếu A và B mang giá trị giống nhau thì kết quả, gọi là Q, cũng mang giá trị đó.)",
            },
          ],
        },
        {
          id: "p3e27",
          label: "Bai 27",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 27.mp3",
          transcript:
            "Let’s begin. Last week, we learned how most fish use their swim bladder to move around in the water. Remember, when the fish breathes oxygen, some of that oxygen goes into its bladder. This causes the fish to rise in the water. When it squeezes some of the gas out of its bladder, it sinks toward the bottom. So, it can move vertically-go up and down kind of like a hot-air balloon. A shark is more like an airplanes. Sharks don’t have a swim bladder, so they use their forward movement to control their vertical position. The tail is like the shark’s propeller. The shark swings it back and forth to move forward. In an airplane, this forward movement pushes air around the wings. For a sharks, this forward movement pushes water around the fins. On both cases, the forward movement creates lift the airplanes and shark both rise. Sharks have two pairs of fins on each side of their bodies. These fins are about the position as the main wings and tail wings, on an airplane The shark can position these fins at different angles. This changes the path of the water around them and enables the shark to move quickly upward or downward. The shark also has two vertical fins on its back. These are like the stabilizer fin on an airplane. They allow the shark to keep its balance as it moves through the water and help it turn quickly left and right.",
          questions: [
            {
              id: "p3e27q1",
              question: "What did the class study in a previous lecture?",
              options: [
                "Parts of birds",
                "Kinds of animals in swamps",
                "Parts of fish",
                "Things living in deserts",
              ],
              correct: 2,
              explanation:
                "Last week, we learned how most fish use their swim bladder to move around in the water. (Tuần trước, chúng ta đã nghiên cứu về cách mà loài cá sử dụng bong bóng để di chuyển trong nước như thế nào.)",
            },
            {
              id: "p3e27q2",
              question:
                "What does the speaker imply about a shark\'s movement?",
              options: [
                "It moves vertically slower than fish with swim bladders.",
                "It can move quickly in all directions.",
                "It moves as little as possible, unless it attacks something.",
                "It can go taster by moving its vertical tins.",
              ],
              correct: 1,
              explanation:
                "It can move vertically-go up and down kind of like a hot-air balloon. (Nó có thể di chuyển thẳng đứng- bơi lên trên và xuống giống một chiếc khinh khí cầu.)",
            },
            {
              id: "p3e27q3",
              question:
                "Which of the following is true according to the lecture?",
              options: [
                "People studied sharks to make better airplanes.",
                "Sharks and airplanes have similar parts.",
                "Sharks use their tails for protection",
                "The shark\'s vertical tin holds its swim bladder.",
              ],
              correct: 1,
              explanation:
                "On both cases, the forward movement creates lift the airplanes and shark both rise. (Trong cả hai trường hợp, sự chuyển động lên phía trước tạo ra lực để máy bay lẫn cá mập bay lên.)",
            },
          ],
        },
        {
          id: "p3e28",
          label: "Bai 28",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 28.mp3",
          transcript:
            "Welcome, ladies and gentlemen, to the Morecambe Museum of Fashion. Before we go up to the fashion exhibition ‘Clothes of the Future’ I would like to show you some slides on the screen, and say a few words about the history of fashion.  I will also mention some of the important people in fashion. This will provide an introduction for you and will prepare you for the clothes that we’re going to see in the exhibition. As I’m sure you know nowadays fashion is something that almost everybody enjoys. People of all age groups and all incomes usually have an interest in what they wear But this has only recently happened, and I will tell you why. Until the beginning of this century, it was only the rich who could afford to follow fashion There were no factories to make many copies of the same article, as there are today. Rich men and women wore trousers, jackets and dresses which were made especially for them. This picture here shows a young lady being measured for a dress that she will have made by hand, exactly how she wants it to be Ladies’ clothes in those days were long and usually tight-fitting and made of heavy material. However, the new century - the 0s - brought new ideas. The important person at this time was Coco Chanel who started making clothes in 8, in Paris. Many people think she was the 20th century’s most important influence on fashion Chanel loved to wear loose-fitting clothes and produced jackets and skirts which everyone admired. Here’s a picture of one of her ladies’ suits. Even today people still wear styles like this when they want to look smart. Young Paris designers all began to produce simple clothes, and skirts started to get shorter. The idea of special clothes for playing sports also became popular in the early 0s. Things like long shorts and tennis clothes started to become fashionable Soon factories produced these new styles more cheaply and then many more people were able to enjoy fashion. In 7, after the Second World War Christian Dior used all the new materials available to produce a fashion which was known as the ‘New Look’ As you can see in this picture, he made skirt lengths longer again. Later, in the 60s, ‘flower power’ and student fashion were popular. In London, Mary Quant introduced short skirts. These were worn with boots that went up to the knee. Look at the white, shiny boots in this picture! And now we come to today’s exhibition Some of the clothes you will see today will be very different from anything which you have seen before. The exhibition aims to take a look at the sort of clothes that we might wear in the next 50 years. Let’s go inside and have a look at the exciting clothes that are waiting for us ...",
          questions: [
            {
              id: "p3e28q1",
              question:
                "According to the speaker, who are interested in fashion?",
              options: [
                "rich people.",
                "young people.",
                "old people",
                "most people.",
              ],
              correct: 3,
              explanation:
                "Nowadays fashion is something that almost everybody enjoys. People of all age groups and all incomes usually have an interest in what they wear. (Ngày nay, thời trang là thứ mà hầu hết mọi người thích. Mọi người thuộc mọi nhóm tuổi và mọi mức thu nhập đều quan tâm đến thứ mà họ mặc.)2. It was only the rich who could afford to follow fashion. There were no factories to make many copies of the same article, as there are today. Rich men and women wore trousers, jackets and dresses which were made especially for them. (Chỉ có người giàu có mới có khả năng chạy theo thời trang. Hồi đó không có những nhà máy sản xuất quần áo hàng loạt như ngày nay. Đàn ông và phụ nữ giàu thường mặc quần, áo choàng và mặc quần áo được may riêng cho họ.)",
            },
            {
              id: "p3e28q2",
              question: "How were fashion clothes before the 0s?",
              options: [
                "they were individually made.",
                "they were copied from pictures",
                "they were made of light material.",
                "they were often loose-fitting.",
              ],
              correct: 0,
              explanation: "",
            },
            {
              id: "p3e28q3",
              question: "What is true about Coco Chanel?",
              options: [
                "She was born in 8.",
                "She changed people’s ideas about fashion.",
                "She liked wearing tight-fitting clothes.",
                "Her designed clothes in the 0s become out of fashion now.",
              ],
              correct: 1,
              explanation:
                "The new century - the 0s - brought new ideas. The important person at this time was Coco Chanel, who started making clothes in 8, in Paris. Many people think she was the 20th century’s most important influence on fashion. Chanel loved to wear loose-fitting clothes and produced jackets and skirts which everyone admired. (Bắt đầu thế kỷ mới- những năm 0- đã mang đến những ý tưởng mới. Người quan trọng vào thời kỳ này là Coco Chanel, bà đã bắt đầu may quần áo vào năm 8 ở Paris. Nhiều người nghĩ rằng bà ấy là người có ảnh hưởng lớn nhất đến thời trang vào thế kỷ 20. Chanel thích mặc trang phục rộng rãi và đã thiết kế những chiếc váy và áo khoác khiến mọi người ngưỡng mộ.)",
            },
            {
              id: "p3e28q4",
              question: "How was the fashion in the 0s?",
              options: [
                "white skirts were fashionable",
                "clothes started to cost less.",
                "women took up sports.",
                "sport clothes were cheap.",
              ],
              correct: 1,
              explanation:
                "The idea of special clothes for playing sports also became popular in the early 0s. Things like long shorts and tennis clothes started to become fashionable. Soon factories produced these new styles more cheaply, and then many more people were able to enjoy fashion. (Ý tưởng về việc may trang phục thể thao cũng trở nên phổ biến vào những năm đầu 0. Những thứ như quần soóc dài và quần áo quần vợt trở nên phổ biến. Chẳng bao lâu sau nhiều nhà máy cũng sản xuất và bán những mẫu quần áo này với giá rẻ hơn. Nhờ đó, có nhiều người có thể sở hữu những món đồ thời trang này hơn.)",
            },
            {
              id: "p3e28q5",
              question: "Which of these was part of the ‘New Look’? 57",
              options: [
                "material with flowers",
                "very short skirts",
                "longer skirts",
                "boots that went up to the knee.",
              ],
              correct: 2,
              explanation:
                "In 7, after the Second World War, Christian Dior used all the new materials available to produce a fashion which was known as the ‘New Look’. As you can see in this picture, he made skirt lengths longer again. (Vào 7, sau Chiến tranh thế giới lần thứ hai, Christian Dior đã sử dụng mọi chất liệu mới có sẵn để tạo ra một phong cách mới mang tên “New Look”. Như bạn có thể thấy trong bức ảnh này, ông đã may một chiếc váy dài một lần nữa.) ",
            },
          ],
        },
        {
          id: "p3e29",
          label: "Bai 29",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 29.mp3",
          transcript:
            "Right, everyone about the trip to the Jubilee Arts Centre next Wednesday. As you know, we have tickets for the Centre’s two theatres and the concert hall. Those of you with concert tickets will hear piano music by Chopin and Schumann. Those with tickets for the main theatre will see Shakespeare’s Twelfth Night while people going to the smaller theatre will see The Wild Duck by Ibsen. Although all the theatre and concert tickets have gone if anyone else would like to join us on the trip I can get tickets for the Arts Centre cinema to see the Australian comedy film Spider and Rose. The shows begin at half past seven, but we’ll leave early so you can spend time looking round the Arts Centre. The coach will leave here at 3.30 and arrive at the Arts Centre at about a quarter to five. Let me tell you what you can do there. The Centre has a lot for art-lovers. In the Art Gallery there’s an exhibition of the history of Russian ballet. It has dresses and shoes worn by famous dancers and photos of past performances. With your student card, you can get in very cheaply. There are also some interesting free exhibitions. On the ground floor you can see prize-winning paintings from a children’s competition, and gold jewellery made by Scottish artists. On the first floor there’s an exhibition of South American photographs, and there’s no charge for that either. I know some of you hope to do some shopping. The Centre has a bookshop on the first floor and there’s a souvenir shop by the ticket office. If you’re more interested in clothes and shoes there’s a large shopping centre five minutes’ walk from the Arts Centre. You’ll probably want to eat before the show. The Balcony Restaurant has a menu with a wide range of meals and waiter service, but it is rather expensive. Or there’s the Fountain Restaurant whose special three-course dinner is good value for money. There’s also Charlie’s coffee bar which serves coffee, sandwiches and cakes. You can get fruit juices and ice cream from the cinema kiosk. After the shows the coach will pick us up at the Bridge Street exit. Everyone should be there by twenty past ten. The two plays will finish at around 10.10 or 10.15. I’m afraid concert-goers will have to wait, as the concert finishes earlier, at ten to ten.",
          questions: [
            {
              id: "p3e29q1",
              question: "Which tickets are still available?",
              options: [
                "the piano concert.",
                "Twelfth Night.",
                "Spider and Rose.",
                "The Wild Duck",
              ],
              correct: 2,
              explanation:
                "We have tickets for the Centre’s two theatres and the concert hall. Those of you with concert tickets will hear piano music by Chopin and Schumann. Those with tickets for the main theatre will see Shakespeare’s Twelfth Night, while people going to the smaller theatre will see The Wild Duck by Ibsen. Although all the theatre and concert tickets have gone (A, B, D), if anyone else would like to join us on the trip I can get tickets for the Arts Centre cinema to see the Australian comedy film, Spider and Rose (C). (Chúng tôi có vé vào hai nhà hát của trung tâm và buổi hòa nhạc. Những vị có vé của buổi hòa nhạc sẽ được thưởng thức các tác phẩm của hai nhạc sĩ vĩ đại Chopin và Schumann. Những vị có vé vào nhà hát lớn sẽ được xem vở kịch “Twelfth Night” trong khi những vị đến rạp hát nhỏ hơn thì sẽ được thưởng thức tác phẩm “The Wild Duck” của Ibsen. Mặc dù tất cả vé vào rạp hát và buổi hòa nhạc đều đã hết (A, B, D) nhưng nếu có vị vào muốn tham gia với chúng tôi trong chuyến đi này thì có thể mua vé vào rạp chiếu phim của trung tâm nghệ thuật để xem bộ phim hài của Úc mang tên “Spider and Rose”.(C)",
            },
            {
              id: "p3e29q2",
              question: "Which exhibition do visitors have to pay a fee?",
              options: [
                "the Russian ballet exhibition.",
                "the Scottish jewellery.",
                "the South American photographs.",
                "prize winning paintings from a children’s competition.",
              ],
              correct: 0,
              explanation:
                "In the Art Gallery there’s an exhibition of the history of Russian ballet. It has dresses and shoes worn by famous dancers and photos of past performances. With your student card, you can get in very cheaply. (A)There are also some interesting free exhibitions. On the ground floor you can see prize-winning paintings from a children’s competition, and gold jewellery made by Scottish artists. On the first floor there’s an exhibition of South American photographs, and there’s no charge for that either (B, C, D). (Trong phòng trưng bày nghệ thuật, có một cuộc triển lãm về lịch sử ba-lê Nga. Buổi triển lãm sở hữu những chiếc váy và đôi giày của những nghệ sĩ múa nổi tiếng và nhiều bức ảnh của những màn biểu diễn trong quá khứ. Với thẻ sinh viên, các bạn có thể vào xem với giá rất rẻ. (A) Ngoài ra cũng có một số cuộc triển lãm miễn phí rất thú vị nữa. Ở tầng trệt bạn có thể nhìn thấy những bức tranh đã giành giải thưởng trong cuộc thi dành cho trẻ em vàđồ nữ trang bằng vàng được làm bởi các nghệ nhân xứ Xcốt-len. Ở tầng một sẽ có một cuộc triển lãm những bức ảnh của người Nam Mỹ và buổi triển lãm này cũng miễn phí. (B, C, D)",
            },
            {
              id: "p3e29q3",
              question: "Where can you buy clothes?",
              options: [
                "on the first floor.",
                "in the souvenir shop.",
                "close to the Arts Centre.",
                "in the main theatre",
              ],
              correct: 2,
              explanation:
                "The Centre has a bookshop on the first floor and there’s a souvenir shop by the ticket office. If you’re more interested in clothes and shoes there’s a large shopping centre five minutes’ walk from the Arts Centre. (C) (Trung tâm có một hiệu sách ở tầng một và có một cửa hàng bán đồ lưu niệm gần phòng bán vé. Nếu bạn có hứng thú với quần áo và giày dép hơn thì có một trung tâm mua sắm lớn chỉ cách trung tâm nghệ thuật 5 phút đi bộ. (C)",
            },
            {
              id: "p3e29q4",
              question: "Where can you enjoy cakes?",
              options: [
                "the Fountain.",
                "Charlie’s coffee",
                "the cinema kiosk.",
                "The Balcony Restaurant",
              ],
              correct: 1,
              explanation:
                "There’s the Fountain Restaurant whose special three-course dinner is good value for money. (A) There’s also Charlie’s coffee bar which serves coffee, sandwiches and cakes. (B) You can get fruit juices and ice cream from the cinema kiosk. (D) (Có một Nhà hàng Suối phục vụ bữa tối dọn làm ba món đặc biệt rất đáng đồng tiền bát gạo. (A) Ở đó còn có quán cà phê của Charlie, nơi phục vụ cà phê, bánh sandwich và bánh ngọt nữa. (B) Ngoài ra, bạn có thể thưởng thức nước hoa quả ép và kem trong ki-ốt của rạp chiếu phim.(C)",
            },
            {
              id: "p3e29q5",
              question: "What time does the concert end?",
              options: ["10.10.", "10.15.", "10.20.", "9.50."],
              correct: 3,
              explanation:
                "Everyone should be there by twenty past ten. (C) The two plays will finish at around 10.10 or 10.15. (A, B) I’m afraid concert-goers will have to wait, as the concert finishes earlier, at ten to ten. (D) (Mọi người cần phải ở đó trước 10:20. (C) Hai vở kịch sẽ kết thúc vào khoảng",
            },
          ],
        },
        {
          id: "p3e30",
          label: "Bai 30",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 30.mp3",
          transcript:
            "Well, good evening everyone. I’ve come along to talk to you about my painting. It was just a hobby but it’s really more than that now I used to paint in the evenings after work but now I work four days a week instead of five. That means I spend Friday, Saturday and Sunday on my painting. I have pictures in local exhibitions at least once a month. I’d love to give up my job and spend all my time painting, but I work with computers and I earn more that way! I do make some money from selling my pictures enough to pay for all my paint, brushes and paper and a few art lessons I’d love to go to art college full-time for three years but I’ve got all the rent on my flat to pay and a car to run. I first became interested in art when I was at primary school. I used to go out with some paper and a few pencils during break time and draw anything I saw houses, gardens, people. Then at secondary school we had art classes twice a week and I learnt how to use chalk and then different kinds of paint: water colours, oils and so on. Those classes were really useful for me, and ever since then I’ve had lessons of some kind. I’ve attended evening classes and been on what they call painting ‘holidays’, where you go out into the countryside and paint during the day and then sit and discuss your work with a teacher and the other artists after dinner. Those holidays are great; you learn so much talking to other people studying with you. I’ve enjoyed painting in lots of different countries I’ve been to Morocco and painted desert scenes with beautiful sunrises I’ve been to Greece and Spain and painted pictures of the local people working in the fields near their homes. My favourite place is still Scotland I love walking in the Scottish mountains, and there are so many different birds to see, especially in spring. Well, I’m going to finish now by showing you a video of the places I’ve visited. After that there’ll be a chance to  relax with a cup of coffee and then there’ll be time for some questions. Oh, and I’ve got some information about my next art exhibition for you. It’s going to be at the Queen’s Gallery. Now, if someone would turn off the lights ...",
          questions: [
            {
              id: "p3e30q1",
              question: "How often does Sarah paint now?",
              options: [
                "two days a week.",
                "three days a week",
                "five days a week",
                "every evening",
              ],
              correct: 1,
              explanation:
                "I used to paint in the evenings after work, but now I work four days a week instead of five. That means I spend Friday, Saturday and Sunday on my painting. (B) (Tôi đã từng vẽ vào những buổi tối sau giờ làm việc, nhưng bây giờ tôi làm việc bốn ngày một tuần thay vì năm ngày một tuần. Điều này có nghĩa là tôi sẽ vẽ tranh vào Thứ sáu, Thứ bảy và Chủ nhật. (B)",
            },
            {
              id: "p3e30q2",
              question: "How does Sarah use money from her painting?",
              options: [
                "to give up her computing job.",
                "to pay for her flat and car.",
                "to pay for her artist’s materials.",
                "to pay for three-year full-time fee at Art College.",
              ],
              correct: 2,
              explanation:
                "I do make some money from selling my pictures, enough to pay for all my paint, brushes and paper and a few art lessons. (C)I’d love to go to art college full-time for three years, but I’ve got all the rent on my flat to pay and a car to run. (Tôi kiếm tiền bằng việc bán những bức tranh của tôi, số tiền đó đủ để trả cho màu, bút vẽ, giấy và một vài lớp học vẽ. (C)Tôi muốn đi học một trường nghệ thuật trong ba năm, nhưng tôi chưa có tiền vì còn phải chi trả tiền thuê căn hộ và các phí cho chiếc ô tô.)",
            },
            {
              id: "p3e30q3",
              question: "When did she learn when she was at primary school?",
              options: [
                "she painted pictures of people.",
                "she learnt to use chalk.",
                "she learnt to use different kinds of paint.",
                "she drew scenes in pencil.",
              ],
              correct: 3,
              explanation:
                "I first became interested in art when I was at primary school. I used to go out with some paper and a few pencils during break time and draw anything I saw: houses, gardens, people. (Lần đầu tiên tôi trở nên quan tâm đến nghệ thuật khi tôi còn học tại trường tiểu học. Tôi đã từng đi ra ngoài với một vài tờ giấy và vài cái bút chì trong suốt thời gian nghỉ ngơi và vẽ bất cứ cái gì tôi nhìn thấy: nhà cửa, khu vườn, người.)",
            },
            {
              id: "p3e30q4",
              question: "What pleased Sarah most about her painting holidays?",
              options: [
                "meeting other artists",
                "seeing beautiful scenery",
                "receiving individual teaching",
                "painting the countryside.",
              ],
              correct: 0,
              explanation:
                "I’ve attended evening classes and been on what they call painting ‘holidays’, where you go out into the countryside and paint during the day and then sit and discuss your work with a teacher and the other artists after dinner. Those holidays are great; you learn so much talking to other people studying with you. (Tôi có tham dự những lớp học vào buổi tối và tham gia “kỳ nghỉ vẽ”, nơi mà bạn sẽ đi tham quan vùng nông thôn và vẽ trong suốt chuyến đi, sau đó ngồi lại và bình luận về các tác phẩm với giáo viên và những họa sĩ khác sau bữa tối. Những kỳ nghỉ này rất tuyệt vì bạn có thể học rất nhiều thứ khi nói chuyện với những người khác học với bạn.)5. There’ll be a chance to relax with a cup of coffee and then there’ll be time for some questions. (C, D) Oh, and I’ve got some information about my next art exhibition for you. (A) It’s going to be at the Queen’s Gallery. (Sẽ có một cơ hội để thư giãn với một tách cà phê và sau đó sẽ có thời gian cho một số câu hỏi. (C, D) Và tôi sẽ có một vài thông tin về cuộc triển lãm nghệ thuật tiếp theo của tôi. (A) Nó sẽ diễn ra ở phòng trưng bày Queen’s Gallery.)",
            },
            {
              id: "p3e30q5",
              question:
                "What will the audience NOT do after watching Sarah’s video?",
              options: [
                "find out some information about the next exhibition.",
                "look round an art exhibition.",
                "have a break and a drink.",
                "ask Sarah some questions.",
              ],
              correct: 1,
              explanation: "",
            },
          ],
        },
        {
          id: "p3e31",
          label: "Bai 31",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 31.mp3",
          transcript:
            "Welcome to this week’s book programme. We’ve got lots of great new books to tell you about. My life, by Joe Wrigley, will keep all fans of Joe\'s stories happy for hours. It explains a lot about where his ideas come from and gives a picture of what was happening in his life when he was working on his most successful books. I must say, though, that some of it is difficult to understand if you haven’t read his other books. Now, for those of you who like a good cry Goodbye to the fields, by Susan Marks tells the sad story of John, a small boy who has to leave the countryside he loves when the family move to London because of his father’s job. John and his mother would prefer to stay where they are. It’s a long time before the family begins to feel comfortable living in the big city. There are plenty of books with helpful advice this week. First, the A-Z of photography would make a great present for anyone just starting out with a camera. It has everything you need to know to take really good photos, and learn about cameras, film, lighting and so on. This is not one for the experienced photographer, though there’s not much advanced information here. Turning to the kitchen Cooking for one, by Adrian White, says on Its cover that even people who hate cooking will find it useful. A month ago, I couldn’t even boil an egg but now I’m producing all sorts of dishes, some quite difficult and, yes, they taste quite good, too. I’m actually enjoying cooking now I’m now going to try a new book about cooking Italian food. The last book this week is Holidays in Europe, by Mary Curtis. This is an enjoyable read, which will start your imagination working as you plan for next year’s holiday It doesn’t matter that the writer doesn’t talk about the famous places everyone visits but describes lots of small places away from the main tourist areas. The maps are too small to be useful but the book is still good value for money. That’s it for this week, then. Next week, there’s a special report on giving books as presents, so if you’ve saved up your money and you’re wondering  what to get for a friend or relation for their birthdays, you might get some good ideas ... I’ll look forward to talking to you then ...",
          questions: [
            {
              id: "p3e31q1",
              question: "What should readers do to really understand My life?",
              options: [
                "read it very slowly.",
                "know about the writer’s life.",
                "read it with a picture.",
                "read the writer’s other books.",
              ],
              correct: 3,
              explanation:
                "I must say, though, that some of it is difficult to understand if you haven’t read his other books. (Tuy nhiên tôi phải nói rằng tác phẩm có đôi chỗ khó để hiểu nếu bạn chưa đọc những tác phẩm khác của anh ấy.)",
            },
            {
              id: "p3e31q2",
              question: "Why does John go to London in Goodbye to the fields?",
              options: [
                "his parents do not like the country,",
                "his father has to be close to his work",
                "his parents both come from the city.",
                "His parents want him to have better education.",
              ],
              correct: 1,
              explanation:
                "Goodbye to the fields, by Susan Marks, tells the sad story of John, a small boy who has to leave the countryside he loves when the family move to London because of his father’s job. (“Goodbye to the fields” bởi Susan Marks, kể một câu chuyện buồn về John, một cậu bé nhỏ phải rời khỏi miền quê thân thương khi gia đình chuyển tới London vì công việc của bố cậu bé.)",
            },
            {
              id: "p3e31q3",
              question:
                "What information is NOT included in the A-Z of photography?",
              options: [
                "Basic equipment in photography",
                "how to take good pictures",
                "Basic information about taking pictures.",
                "advanced information about photography.",
              ],
              correct: 3,
              explanation:
                "There’s not much advanced information here. (Không có nhiều thông tin chuyên sâu trong cuốn sách này.)",
            },
            {
              id: "p3e31q4",
              question:
                "What information does readers get from Holidays in Europe?",
              options: [
                "a small map.",
                "famous places.",
                "the main tourist areas.",
                "less common places.",
              ],
              correct: 3,
              explanation:
                "It doesn’t matter that the writer doesn’t talk about the famous places everyone visits, but describes lots of small places away from the main tourist areas. (D) The maps are too small to be useful but the book is still good value for money. (Không phải vấn đề khi người viết không nói về những chỗ nổi tiếng mà mọi người đến thăm, nhưng lại miêu tả nhiều chỗ nhỏ cách xa những khu vực khách du lịch thường ghé qua.(D) Những bản đồ này quá nhỏ để có nhiều chức năng như vậy, tuy nhiên quyển sách vẫn rất đáng giá.)",
            },
            {
              id: "p3e31q5",
              question: "For whom are next week’s programme useful?",
              options: [
                "those who enjoy reading reports.",
                "those who are trying to save money.",
                "those who are planning to buy gifts.",
                "those who enjoy making friends.",
              ],
              correct: 2,
              explanation:
                "There’s a special report on giving books as presents, so if you’ve saved up your money and you’re wondering what to get for a friend or relation for their birthdays, you might get some good ideas. (Có một báo cáo đặc biệt về việc mua sách làm quà, vì vậy nếu bạn đã tiết kiệm tiền và đang băn khoăn nên mua gì cho một người bạn hay họ hàng trong ngày sinh nhật của họ thì bạn có thể sẽ có một vài ý tưởng hay ho nhờ cuốn sách này.)",
            },
          ],
        },
        {
          id: "p3e32",
          label: "Bai 32",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 32.mp3",
          transcript:
            "People always ask me why I only travel the hard way! A lot of television travel programmes are about relaxing holidays on the beach but I’ve only ever made documentaries about really long trips. The last trip I did was a 50,000-mile journey around the Pacific Ocean and it took 12 months But then my very first trip was a ‘round the world\' journey, and the most difficult one was probably a  car journey from the North Pole to the South Pole! As you can Imagine, I’ve seen a lot of the world! I’m lucky to be in really excellent health, but life is very short and I’ve done so much travelling that I want a change. Travelling long distances makes you extremely tired, and although it’s still a great pleasure for me I want to do something more relaxing now. I think my next television series might be made nearer England. There’s some really interesting work going on in Wales where they’ve just found what remains of a 2,000-year-old town. Or I might do something about farms in France or even cycling in Holland. There’s always something to film if you look hard enough! But I hope the programmes I’ve made about the really long trips will encourage other people to get on a plane and have some adventures. Some people seem to be afraid of going to a strange country and perhaps being ill there but maybe they realise now that if I can do these trips, so can they. I’m only a very ordinary person. And obviously, you don’t have to travel on your own as I always have. I must say that until recently I hadn’t ever worried about being so far from home even when the children were very small. But while I was filming in Borneo last year my wife had to have an emergency operation and it really frightened me because I couldn’t get back to England. Everything was fine in the end but I wouldn’t want to be so far away if anything like that happened to my family again. Perhaps If I spend more time at home I can do more writing. I\'ve done two books so far. I write about places I’ve seen and my feelings about them. I don’t think I’ll ever write fiction or poetry but I’d be Interested in writing newspaper articles. My family says I’m very difficult to live with when I’m writing at home ... perhaps that’s why they’ve never complained about me travelling!",
          questions: [
            {
              id: "p3e32q1",
              question:
                "What did John do for his most recent television programme?",
              options: [
                "drove from the North to the South Pole.",
                "filmed relaxing beach holidays.",
                "went to the Pacific Ocean for a year.",
                "traveled round the world.",
              ],
              correct: 2,
              explanation:
                "A lot of television travel programmes are about relaxing holidays on the beach, but I’ve only ever made documentaries about really long trips. The last trip I did was a 50,000-mile journey around the Pacific Ocean, and it took 12 months. (C) But then my very first trip was a ‘round the world\' journey, and the most difficult one was probably a car journey from the North Pole to the South Pole! (Có nhiều chương trình du lịch truyền hình về những kỳ nghỉ thư giãn trên bãi biển, nhưng tôi chỉ làm những bộ phim tư liệu về những cuộc dạo chơi dài thực sự. Chuyến đi gần đây nhất của tôi là hành trình dài 50000 dặm xung quanh Thái Bình Dương, và nó kéo dài 12 tháng. (C) Còn chuyến đi đầu tiên của tôi lại là chuyến đi vòng quanh thế giới, và chuyến đi khó khăn nhất có lẽ là hành trình từ cực bắc đến cực nam bằng ô tô!)2. Travelling long distances makes you extremely tired, and although it’s still a great pleasure for me, I want to do something more relaxing now. (Du lịch đường dài sẽ khiến bạn vô cùng mệt, và dù nó vẫn là sở thích của tôi nhưng bây giờ tôi muốn làm việc gì đó thư giãn hơn hơn.)",
            },
            {
              id: "p3e32q2",
              question: "Why is John giving up very long trips?",
              options: [
                "because he’s too old now.",
                "because he’s been everywhere.",
                "because they’re too tiring.",
                "because his family want him to spend more time with them.",
              ],
              correct: 2,
              explanation: "",
            },
            {
              id: "p3e32q3",
              question: "What is John’s next television series probably about?",
              options: [
                "farms in Scotland.",
                "old ruins in Wales.",
                "cycling tours in France.",
                "cycling tours in England.",
              ],
              correct: 1,
              explanation:
                "There’s some really interesting work going on in Wales, where they’ve just found what remains of a 2,000-year-old town. (B) Or I might do something about farms in France, or even cycling in Holland. (A, C, D) (Sẽ có một số công việc thú vị ở xứ Wales, nơi mà họ vừa mới tìm thấy những gì còn sót lại của một thị trấn cổ 2, 000 năm tuổi. (B) Hoặc tôi có thể làm cái gì đó về những nông trại ở Nước Pháp, hoặc đạp xe đạp ở Hà Lan.(A, C, D)",
            },
            {
              id: "p3e32q4",
              question: "Why does John want to spend more time near home?",
              options: [
                "His family might need him.",
                "His wife misses him.",
                "He has very young children.",
                "His wife is ill.",
              ],
              correct: 0,
              explanation:
                "While I was filming in Borneo last year my wife had to have an emergency operation, and it really frightened me because I couldn’t get back to England. Everything was fine in the end - but I wouldn’t want to be so far away if anything like that happened to my family again. (Trong khi tôi đàn quay phim ở Borneo vào năm ngoái thì vợ tôi phải đi phẫu thuật cấp cứu, điều đó thật sự khiến tôi hoảng sợ bởi vì tôi đã không thể trở lại Anh. Cuối cùng thì mọi thứ vẫn ổn. Nhưng tôi không muốn đi xa nữa vì tôi không muốn những điều tương tự xảy ra với gia đình của tôi một lần nữa.)",
            },
            {
              id: "p3e32q5",
              question: "What has John written so far?",
              options: [
                "newspaper articles.",
                "travel books.",
                "poems.",
                "fictions.",
              ],
              correct: 1,
              explanation:
                "I write about places I’ve seen and my feelings about them. I don’t think I’ll ever write fiction or poetry, but I’d be interested in writing newspaper articles. (Tôi viết về những nơi tôi đã từng đến và cảm giác của tôi về những nơi đó. Tôi chưa bao giờ nghĩ về việc viết những điều tưởng tượng hay thơ ca, nhưng tôi cũng khá hứng thú với việc viết báo.)",
            },
          ],
        },
        {
          id: "p3e33",
          label: "Bai 33",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 33.mp3",
          transcript:
            "With us today, to tell us about his trip across Africa is the biologist Paul Hart. We started on the east coast and travelled on foot across Africa to Gabon In the west collecting plants and flowers along the way It wasn’t easy, but my route crossed a region rich in plants and I chose it because it won’t stay that way for long when more roads are built. It was my only chance to get important information about the natural life of the area. I had a team of eleven scientists We walked from six in the morning but the forest was so thick it took hours to cut our way through it and some days we only walked one kilometre before dark. Fortunately, we carried special equipment that was very light and we took as little food as possible. But we were always tired when we put the tents up at night. Sometimes we saw elephants or lions. They were amazing to watch and never attacked us. Every day,  I collected plants and added to my notes. There was so much new information to write down. There were, of course, some low points, especially when I got anxious about the team. It was my job to make sure everyone got home safely. Towards the end of the trip, I suddenly discovered one day that the food had nearly all gone. It was strange because we’d brought enough dried food with us to last the trip food that wouldn’t ever go bad and we’d stopped at villages for fresh food too. But then I found that some of the team had eaten much more than they were supposed to I was angry with them because it was a silly thing to do. Then we started walking again. There were no maps for the area, but we had a local guide Then one of the team got sick and we couldn’t go any further We let him rest, but he got much worse. Thankfully his life was saved by a fisherman who came along the river in a boat and took him to a doctor in the nearest village. Finally, I returned home and I’m back with my family and friends. I really missed them while I was away. But I learnt so much on the trip and I’m really glad I went. I was asked to go on another trip this time to Australia but I said that I couldn’t because I’m busy here in London. And I think I’ve done enough travelling.",
          questions: [
            {
              id: "p3e33q1",
              question: "Why did Paul choose the part of Africa he visited?",
              options: [
                "It is good for walking.",
                "It will soon change.",
                "He had been there before.",
                "It was the easiest route to go",
              ],
              correct: 1,
              explanation:
                "I chose it because it won’t stay that way for long when more roads are built. It was my only chance to get important information about the natural life of the area. (Tôi chọn nơi này bởi vì nó sẽ không hoang sơ như thế này khi có nhiều con đường được xây dựng. Đó là cơ hội duy nhất để lấy những thông tin quan trọng về thế giới tự nhiên của khu vực đó.)",
            },
            {
              id: "p3e33q2",
              question: "What made the team’s journey slow?",
              options: [
                "clearing paths through the forest",
                "finding somewhere safe to camp",
                "carrying heavy equipment",
                "finding something to eat.",
              ],
              correct: 0,
              explanation:
                "We walked from six in the morning, but the forest was so thick it took hours to cut our way through it. (Chúng tôi khởi hành từ sáu giờ sáng, nhưng rừng rậm đến nỗi mà chúng tôi mất hàng tiếng đồng hồ để mở đường đi xuyên qua khu rừng.)",
            },
            {
              id: "p3e33q3",
              question: "What did Paul worry about during the trip?",
              options: [
                "the number of dangerous animals",
                "getting the information he needed",
                "being responsible for a team of people",
                "asking the team to help him.",
              ],
              correct: 2,
              explanation:
                "Sometimes we saw elephants or lions. They were amazing to watch and never attacked us. Every day, I collected plants and added to my notes. There was so much new information to write down. There were, of course, some low points, especially when I got anxious about the team. It was my job to make sure everyone got home safely. (Đôi khi chúng tôi nhìn thấy voi hoặc sư tử. Quan sát chúng rất là thú vị, hơn nữa chúng chẳng bao giờ tấn công chúng tôi. Mỗi ngày, tôi sưu tầm cây cối rồi lưu thông tin vào cuốn sổ của mình. Có rất nhiều thông tin mới để viết lại. Mặc dù vậy, vẫn có những lúc tôi cảm thấy bất an, nhất là khi lo lắng về cả đội. Vì đảm bảo mọi người trở về nhà an toàn là công việc của tôi.)",
            },
            {
              id: "p3e33q4",
              question:
                "Paul says that the team didn’t have enough food because",
              options: [
                "some people ate more than they should.",
                "the walk took longer than expected.",
                "some of the food went bad too quickly.",
                "They underestimated the amount of food to bring",
              ],
              correct: 0,
              explanation:
                "It was strange because we’d brought enough dried food with us to last the trip - food that wouldn’t ever go bad - and we’d stopped at villages for fresh food too. But then I found that some of the team had eaten much more than they were supposed to. (Chuyện này rất lạ vì chúng tôi đã mang đủ thức ăn khô cho đến chuyến đi cuối cùng- thức ăn không hề bị hỏng- và chúng tôi cũng đã dừng lại tại một vài ngôi làng để lấy thức ăn tươi. Cuối cùng, tôi phát hiện ra một vài người trong đội đã ăn quá mức được cho phép.)",
            },
            {
              id: "p3e33q5",
              question: "How does Paul feel now he is back home?",
              options: [
                "He is planning to do another trip.",
                "He misses the people in the team",
                "He thinks the trip was a valuable experience.",
                "He wouldn’t mind travelling to Australia.",
              ],
              correct: 2,
              explanation:
                "I returned home, and I’m back with my family and friends. I really missed them while I was away. But I learnt so much on the trip and I’m really glad I went. I was asked to go on another trip - this time to Australia – but I said that I couldn’t because I’m busy here in London. And I think I’ve done enough travelling. (Tôi đã về nhà, trở lại với gia đình và bạn bè. Tôi thật sự nhớ họ trong khi tôi đi xa. Nhưng tôi đã học được nhiều thứ trong chuyến đi và tôi thật sự hài lòng vì tôi đã đi. Tôi được yêu cầu tham gia một chuyến đi khác, lần này là ở Australia, nhưng tôi đã từ chối vì tôi còn bận ở Luân Đôn. Hơn nữa tôi nghĩ rằng tôi đã đi du lịch đủ rồi.)",
            },
          ],
        },
        {
          id: "p3e34",
          label: "Bai 34",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 34.mp3",
          transcript:
            "Hello, I’m Sarah Brown, and I’m here to tell you about my job as a weather forecaster. I’ve been a weather forecaster for a television company for seven years and two years ago I became the head of the weather department. Now, I divide my time equally between presenting weather forecasting on television and managing the weather department which has a staff of eleven. At thirty years old I’m the youngest ever head of weather and the first woman to do the job Since our news and weather service goes out all round the world, we all take turns to work at night I prefer that to doing the show when I have to get up at four in the morning. I normally work an eight-hour day and in that time I do ten or twelve forecasts. Before doing a weather forecast, I study data on the computer. This is the information I use in my forecasts. There isn’t much time to learn what I have to say but fortunately I’ve never forgotten my words so I don’t get nervous. My husband and I try to have the same free days, but neither of us has a regular pattern of work. He’s a pilot on long-distance flights, so although he works hard he has  a lot more time at home than I do. We moved to our present house about a year ago, and he’s enjoying painting it. I took up flying as a hobby five years ago. I hope to get my pilot’s licence this year but because of the job, I haven’t been to the flying school for ages For exercise I swim and ski and I like running. I’m really proud of myself for running in the London Marathon it’s a forty-kilometre race and I never thought I could manage it! My husband plays tennis, and we sometimes play together, but he’s better than me so I never win. Because I’m on world news, people sometimes recognise me in really distant places. Once, in an Indian village, an old man took me to have my photo taken with all his family. I get some lovely letters one person wrote to say that my smile made her feel happy all day. People occasionally even write and ask me to marry them!",
          questions: [
            {
              id: "p3e34q1",
              question: "How long has Sarah worked as a weather forecaster?",
              options: [
                "two years",
                "seven years",
                "eleven years.",
                "thirty years",
              ],
              correct: 1,
              explanation:
                "I’ve been a weather forecaster for a television company for seven years, and two years ago I became the head of the weather department. (Tôi là người dự báo thời tiết thời tiết cho một công ty truyền hình được bảy năm rồi, và vào hai năm trước, tôi đã trở thành trưởng ban thời tiết.)",
            },
            {
              id: "p3e34q2",
              question: "What does Sarah say about her job?",
              options: [
                "She sometimes has to work at night.",
                "She enjoys getting up early.",
                "She works ten or twelve hours a day.",
                "She sometimes forgets her words.",
              ],
              correct: 0,
              explanation:
                "We all take turns to work at night. I prefer that to doing the show when I have to get up at four in the morning. I normally work an eight-hour day and in that time I do ten or twelve forecasts. (Tất cả chúng tôi đều phải thay nhau làm đêm. Tôi thích điều đó hơn là phải thực hiện chương trình khi mà phải dậy vào lúc bốn giờ sáng. Bình thường tôi làm việc 8 tiếng một ngày và trong khoảng thời gian đó, tôi thực hiện được khoảng 10 đến 12 dự báo.)",
            },
            {
              id: "p3e34q3",
              question: "What does Sarah say about her doing weather forecast?",
              options: [
                "she prepares it in advance.",
                "she sometimes forgets her words.",
                "she worries about making a mistake.",
                "She sometimes get nervous on television.",
              ],
              correct: 0,
              explanation:
                "Before doing a weather forecast, I study data on the computer. This is the information I use in my forecasts. There isn’t much time to learn what I have to say, but fortunately I’ve never forgotten my words so I don’t get nervous. (Trước khi thực hiện một dự báo thời tiết, tôi phải nghiên cứu dữ liệu trên máy tính. Đây là thông tin mà tôi sử dụng vào dự báo của tôi. Tôi không có nhiều thời gian để học những điều mà tôi phải nói, nhưng may mắn là tôi chưa bao giờ quên những gì tôi phải nói nên tôi không trở nên lo lắng.)",
            },
            {
              id: "p3e34q4",
              question: "What is true about Sarah’s husband?",
              options: [
                "He works on the same days each week.",
                "He wants to move nearer his work.",
                "He spends a lot of time travelling.",
                "He has little time to relax.",
              ],
              correct: 2,
              explanation:
                "My husband and I try to have the same free days, but neither of us has a regular pattern of work. He’s a pilot on long-distance flights, so although he works hard he has a lot more time at home than I do. (Người chồng (của) Tôi và Tôi thử để có những cùng ngày tự do, nhưng không cái nào của chúng ta có một mẫu bình thường Của work. Ông ta là một phi công trên những chuyến bay đường dài, vì vậy mặc dầu Ông ta làm việc khó khăn Ông ta có một mớ nhiều thời gian hơn tại nhà Amnesty.)5. I’m really proud of myself for running in the London Marathon - it’s a forty kilometre race and I never thought I could manage it! (Tôi thật sự tự hào về bản thân vì đã tham gia cuộc chạy Ma-ra-tông Luân Đôn. Chặng đường dài bốn mươi kilômet. Tôi chưa bao giờ nghĩ rằng tôi đã có thể đạt được thành tích như vậy!)",
            },
            {
              id: "p3e34q5",
              question: "What did Sarah say about her hobby?",
              options: [
                "She has got her pilot’s license.",
                "She taught her husband to play tennis.",
                "She took part in a long race.",
                "Flying is difficult so she gave it up.",
              ],
              correct: 2,
              explanation: "",
            },
          ],
        },
        {
          id: "p3e35",
          label: "Bai 35",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 35.mp3",
          transcript:
            "Thank you all for coming to my talk this evening. It’s nice to see so many people in the audience. For those of you who don’t know very much about PS Camping let me start by giving you some background information about the company. The company started twenty-five years ago. It actually opened as a retail chain selling camping equipment, and then twenty years ago it bought a small number of campsites in the UK and began offering camping holidays. The company grew rapidly and has been providing holidays in continental Europe for the last fifteen years. If you book a camping holiday with us you\'ll have a choice of over 300 sites In Italy we now have some 64 sites that we either own, or have exclusive use of. France is where we have the majority of sites, and we currently have a project to expand into Switzerland. We also have a number of sites in Northern Spain particularly in the mountainous region of Picos de Europa. We’ve upgraded all these Spanish sites, and improved them considerably from their original three star rating. We believe our holidays offer superb facilities for the whole family. Parents who want their children to be fully occupied for all or part of the day can take advantage of our children’s activities. These are organised by our well qualified and enthusiastic staff. Each day kicks off with a sports match perhaps football, or volleyball, followed by an hour of drama for everyone. This may include singing or dancing, mime or other activities. In the afternoon, there’s a different art activity for each day of the week including a poster competition or model making What’s more, our sites are truly child-friendly and, with this in mind we operate a no-noise rule in the evenings Children’s evening activities usually finish at 9.30 or occasionally 10, and from 10.30 holiday-makers are expected to be quiet in the areas where there are tents. We want nothing to go wrong on a PS Camping holiday, but if it does, we also want all customers to be insured. If you haven’t organised an annual insurance policy of your own you’ll need to take out the low-cost cover we offer and we require that you arrange this when you make your holiday reservation. There are many advantages to choosing PS Camping, and to recommending it to others. As a regular customer you’ll be  kept informed of special offers and your friends can benefit from ten per cent off their holiday or book a luxury tent for the price of a standard one. In return, we’ll send you a thank-you present, which you can choose from a list of high-quality items.",
          questions: [
            {
              id: "p3e35q1",
              question: "How long has PS Camping been organising holidays?",
              options: ["15 years.", "20 years.", "25 years.", "30 years."],
              correct: 1,
              explanation:
                "The company started twenty-five years ago. It actually opened as a retail chain selling camping equipment, and then twenty years ago, it bought a small number of campsites in the UK, and began offering camping holidays. The company grew rapidly and has been providing holidays in continental Europe for the last fifteen years. (Công ty được mở từ hai mươi lăm năm trước. Đó là một chuỗi cửa hàng bán lẻ các thiết bị cắm trại, và sau đó hai mươi năm trước, công ty đã mua một số bãi cắm trại trong Vương quốc Anh và bắt đầu cung cấp dịch vụ kỳ nghỉ cắm trại. Công ty đã lớn mạnh nhanh chóng và trở thành nhà cung cấp các kỳ nghỉ dưỡng ở khắp các nơi trong châu Âu trong 15 năm vừa qua.)",
            },
            {
              id: "p3e35q2",
              question: "Where does the company has most camping sites?",
              options: ["France.", "Italy.", "Switzerland.", "Spain"],
              correct: 0,
              explanation:
                "In Italy we now have some 64 sites that we either own, or have exclusive use of. France is where we have the majority of sites, and we currently have a project to expand into Switzerland. (Ở Italy, hiện tại chúng tôi có 64 bãi cắm trại. Pháp là nơi chúng tôi có nhiều bãi cắm trại nhất. Hiện tại, chúng tôi có một dự án để mở rộng ở Thụy Điển.)",
            },
            {
              id: "p3e35q3",
              question:
                "Which organised activity can children do every day of the week?",
              options: ["football", "drama", "model making", "volleyball"],
              correct: 1,
              explanation:
                "These are organised by our well-qualified and enthusiastic staff. Each day kicks off with a sports match, perhaps football, or volleyball, followed by an hour of drama for everyone. This may include singing or dancing, mime or other activities. (Các hoạt động được tổ chức bởi đội ngũ nhân viên đủ tiêu chuẩn và nhiệt tình. Mỗi ngày trong kỳ nghỉ sẽ được bắt đầu bằng một trận đấu thể thao, có thể là bóng đá hoặc bóng chuyền, sau hoạt động này, mọi người sẽ có một giờ xem kịch. Hoạt động này sẽ bao gồm nhảy, diễn kịch và các hoạt động khác.)",
            },
            {
              id: "p3e35q4",
              question:
                "What is true about the holiday insurance offered by PS Camping?",
              options: [
                "It can be charged on an annual basis.",
                "It is included in the price of the holiday.",
                "It must be taken out at the time of booking.",
                "It can be optional.",
              ],
              correct: 2,
              explanation:
                "If you haven’t organised an annual insurance policy of your own you’ll need to take out the low-cost cover we offer and we require that you arrange this when you make your holiday reservation. (Nếu bạn chưa có một chế độ bảo hiểm hàng năm cho riêng mình thì bạn sẽ cần sẽ cần tham gia chương trình bảo hiểm mà chúng tôi đề xuất. Chúng tôi yêu cầu rằng bạn cần thực hiện điều này khi bạn đặt trước.)",
            },
            {
              id: "p3e35q5",
              question:
                "What can customers recommending PS Camping to friends receive?",
              options: [
                "a free gift.",
                "an upgrade to a luxury tent.",
                "a discount.",
                "a thank-you letter.",
              ],
              correct: 0,
              explanation:
                "As a regular customer, you’ll be kept informed of special offers, and your friends can benefit from ten per cent off their holiday, or book a luxury tent for the price of a standard one. In return, we’ll send you a thank-you present, which you can choose from a list of high-quality items. (Với tư cách là một khách hàng thường xuyên, bạn sẽ bị giữ được tặng những món quà đặc biệt, ngoài ra, bạn bè của bạn còn được giảm 10% giá trị của kỳ nghỉ hoặc có thể đặt một chiếc lều hạng sang với giá của một chiếc lều bình thường. Đổi lại, chúng tôi sẽ gửi bạn một món quà cám ơn, giúp bạn có thể chọn từ một danh sách những món đồ chất lượng cao.)",
            },
          ],
        },
        {
          id: "p3e36",
          label: "Bai 36",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 36.mp3",
          transcript:
            "Good morning I’m very pleased to have been invited along to your club to talk about our Charity Sponsored Walking Holiday for Education Aid. I’ll start by giving you a brief overview of what it entails. First of all let me explain what we mean by ‘sponsored’ here. This is where people promise to donate money to the charity if you achieve your goal in this case to walk a certain number of miles. Basically we are organizing a ten-day holiday, from the sixth to the sixteenth of November with eight days actual walking, trekking in the Semira Mountains. Let’s have a look at some of the details. We require you to raise sponsorship money of at least $3, paying $250 of it up front as a deposit and the rest in stages throughout the year Out of this, about 35% will go on your expenses and that leaves 65% guaranteed to go to the charity. Which brings me to the most important part. This trek is being specifically organized to help education in the Semira region. Last year we helped train teachers for the disabled, and this year we’re focusing on the pupils Each of the walkers’ sponsorship money will go to help an individual special needs pupil in one of the mountain schools. In the second part of the talk I’ll be giving you a lot more details, but back to the basic information. Age limits This is the second time we have run this kind of holiday and um, on the first we even had an eighty-year old But we found it was wise to establish limits this time You have to be at least eighteen and the top limit is now seventy though you need to obtain a health certificate from your doctor if you are over sixty years old. Now, the Semira Mountains are among the highest in the world but you mustn’t be too daunted we will mainly be trekking in the foothills only, although there will be spectacular views even in the foothills. However, you will need to be extremely fit if you aren’t now and you’re interested in coming with us You have plenty of time to get into shape You will be sleeping in tents so you must have quite a bit of equipment with you but you will be helped by local assistants. Your bedding and so forth will be carried by them. We ask that you  only walk with a small rucksack with needs for the day. I don’t think I’ve really said enough about the marvellous area you’ll be walking in Let’s have a look at some of the sights you’ll be seeing. Apart from these spectacular snow-covered peaks and valleys, there are marvellous historic villages. the area has been famous for centuries for making beautiful carpets although recently there has been a trend to move into weaving blankets and wood carving. The people are extremely friendly and welcoming. We deliberately keep the parties small in size to minimize disruption to people and landscape.",
          questions: [
            {
              id: "p3e36q1",
              question: "How long will you be walking on the holiday?",
              options: ["6 days.", "8 days.", "10 days.", "16 days"],
              correct: 1,
              explanation:
                "Basically we are organizing a ten-day holiday, from the sixth to the sixteenth of November, with eight days actual walking, trekking in the Semira Mountains. (Về cơ bản, chúng tôi đang tổ chức kỳ nghỉ kéo dài 10 ngày, từ ngày mùng sáu đến ngày mười sáu tháng mười một, trong đó có tám ngày thực tế đi bộ, leo núi Semira.)",
            },
            {
              id: "p3e36q2",
              question:
                "What proportion of the sponsorship money goes to charity?",
              options: ["25%", "35%", "50%", "65%"],
              correct: 3,
              explanation:
                "Out of this about thirty-five per cent will go on your expenses, and that leaves sixty-five per cent guaranteed to go to the charity. (Khoảng 35% trong số tiền này sẽ dành cho các khoản chi của bạn, còn 65% tổng số tiền sẽ được bảo đảm cho vào quỹ từ thiện.)",
            },
            {
              id: "p3e36q3",
              question: "What is the top age limit to attend the holiday?",
              options: [
                "50 years old.",
                "60 years old.",
                "80 years old.",
                "70 years old.",
              ],
              correct: 3,
              explanation:
                "On the first we even had an eighty-year old, but we found it was wise to establish limits this time. You have to be at least eighteen and the top limit is now seventy, though you need to obtain a health certificate from your doctor if you are over sixty years old. (Trong chuyến đi đầu tiên, chúng tôi thậm chí còn có một hành khách 85 tuổi. Sau đó, chúng tôi thấy sẽ khôn ngoan nếu đặt giới hạn độ tuổi tham gia. Bạn phải là ít nhất 18 tuổi và cao nhất là 70 tuổi. Tuy nhiên, nếu bạn đã trên 60 tuổi, bạn cần có chứng chỉ sức khoẻ từ bác sỹ.)",
            },
            {
              id: "p3e36q4",
              question: "What will you carry as you walk?",
              options: [
                "all of your belongings.",
                "some of your belongings.",
                "none of your belongings.",
                "some of your belongings and food.",
              ],
              correct: 1,
              explanation:
                "You will be sleeping in tents so you must have quite a bit of equipment with you but you will be helped by local assistants... We ask that you only walk with a small rucksack with needs for the day. (Bạn sẽ ngủ trong lều, nên bạn sẽ cần đem theo một số đồ đạc nhưng những người hỗ trợ sẽ giúp bạn mang đồ…Chúng tôi chỉ yêu cầu bạn mang theo một cái ba lô nhỏ với những đồ dùng cần thiết trong ngày.)",
            },
            {
              id: "p3e36q5",
              question: "What does the Semira Region have a long tradition of?",
              options: [
                "making carpets.",
                "weaving blankets.",
                "carving wood.",
                "processing food",
              ],
              correct: 0,
              explanation:
                "The area has been famous for centuries for making beautiful carpets, although recently there has been a trend to move into weaving blankets and wood carving. (Vùng này đã nổi tiếng hàng thế kỷ vì đã làm ra những thảm đẹp, mặc dù gần đây ở đó có một khuynh hướng chuyển sang dệt chăn và khắc gỗ.)",
            },
          ],
        },
        {
          id: "p3e37",
          label: "Bai 37",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 37.mp3",
          transcript:
            "Welcome to all of you . . . can everybody see and hear me? . . . Good . . . . I’m Sally, your guide for this tour of the Bicentennial Park I hope that you’re all wearing your most comfortable shoes and that you can keep up the pace. So let’s get under way on our tour around this wonderful park. I’ll start today with some general background information. There used to be a lot of factories in this area until the 0s. Creating the park required the demolition of lots of derelict buildings on the site so most of the exciting park space all around you was originally warehouses and storehouses. The idea of building a public park here was first discussed when a property developer proposed a high-rise housing development, but the local community wasn’t happy. If the land was to be cleaned up they wanted to use the site for recreation. Residents wanted open space for outdoor activities rather than housing or even an indoor sports complex. Now to the Bicentennial Park itself. It has two areas, a nature reserve and a formal park with man-made features and gardens. The tall blue-and-white building in front of us is called The Tower and is the centre point for the formal gardens. It stands twelve metres high so follow me up the stairs to where we can take advantage of the fantastic views. well here we are at the top of The Tower, and we’re going to look at the view from each direction. Out to the east, the large buildings about a kilometre away are on the Olympic site. There’s an indoor arena for gymnastics, a stadium for track and field and a swimming pool for races and synchronised swimming and also diving. If you look carefully down there, you can see the train lines. The Olympic site has its own station to encourage the use of public transport. There is also a car park, but it only holds a limited number of cars. The formal park has some specially-created water features. If you look out here to the south you can see a circular ornamental pond. And around to the west, you can relax and sit on a bench to smell the flowers in the rose garden and finally up to the north, if you look in front of you now there’s a lake with a small island in the centre you can hire rowing boats at the boat shed which you can’t see from here but if you look through the trees, you can see the café, which has lovely views across the water. Okay, let\'s climb down now ",
          questions: [
            {
              id: "p3e37q1",
              question: "What kind of tour is Sally leading?",
              options: [
                "a bus tour",
                "a train tour",
                "a walking tour",
                "a cruise",
              ],
              correct: 2,
              explanation:
                "I hope that you’re all wearing your most comfortable shoes and that you can keep up the pace. (Tôi hy vọng rằng tất cả các bạn sẽ mang đôi giày thoải mái nhất giúp bạn có thể đi lại dễ dàng.)",
            },
            {
              id: "p3e37q2",
              question:
                "What kind of buildings was it before the Park was made?",
              options: [
                "houses.",
                "industrial buildings.",
                "shops.",
                "a school",
              ],
              correct: 1,
              explanation:
                "There used to be a lot of factories in this area until the 0s. Creating the park required the demolition of lots of derelict buildings on the site, so most of the exciting park space all around you was originally warehouses and storehouses. (Ở đó, đến những năm 0, đã từng là nhiều nhà máy trong vùng. Tuy nhiên, việc xây dựng các công viên đã khiến nhiều tòa nhà ở vùng đó bị phá hủy. Vì vậy, hầu hết không gian quanh bạn trước đó đều là những kho hàng và nhà kho.)",
            },
            {
              id: "p3e37q3",
              question:
                "What did the local residents want to use the site for?",
              options: [
                "leisure.",
                "apartment blocks.",
                "a sports centre.",
                "office buildings",
              ],
              correct: 0,
              explanation:
                "If the land was to be cleaned up, they wanted to use the site for recreation. (Nếu khu này bị quy hoạch, họ muốn sử dụng chỗ này cho mục đích giải trí.)",
            },
            {
              id: "p3e37q4",
              question: "What does the speaker say about the Tower?",
              options: [
                "It is located in the centre of the nature reserve.",
                "It’s a blue and black building.",
                "It’s 20 meters high.",
                "It offers tourists wonderful views.",
              ],
              correct: 3,
              explanation:
                "It stands twelve metres high, so follow me up the stairs to where we can take advantage of the fantastic views. (Vị trí nằm trên mười hai mét trên cao, vì thế hãy leo lên cầu thang với tôi đến nơi mà chúng ta có thể ngắm được những cảnh đẹp mê hồn.)",
            },
            {
              id: "p3e37q5",
              question:
                "In which direction from the top of the Tower can the tourists see the Olympic site?",
              options: [
                "to the North.",
                "to the South.",
                "to the East",
                "to the West",
              ],
              correct: 2,
              explanation:
                "Out to the east, the large buildings about a kilometre away are on the Olympic site. (Từ phía đông, những tòa nhà lớn cách đây một kilômet sẽ đều nằm trên bãi Olympic.)",
            },
          ],
        },
        {
          id: "p3e38",
          label: "Bai 38",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 38.mp3",
          transcript:
            "Welcome to Green Vale Agricultural Park As you know, we have only been open a week so you are amongst our first visitors. We have lots of fascinating indoor and outdoor exhibits on our huge complex, spreading hundreds of hectares. Our remit is to give educational opportunities to the wider public as well as to offer research sites for a wide variety of agriculturists and other scientists. Let’s start by seeing what there is to do. As you can see here on our giant wall plan, we are now situated in the Reception block ... here. As you walk out of the main door into the park there is a path you can follow. If you follow this route you will immediately come into the Rare Breeds section where we keep a wide variety of animals which I shall be telling you a little more about later. Next to this ... moving east... is the large grazing area for the rare breeds. Then further east... in  the largest section of our Park is the Forest Area. South of the grazing area and in fact just next to the Reception block is our Experimental Crop Area. In the middle of the Park ... this circular area is our lake These two small rectangular shapes here are the Fish Farms where we rear fish for sale. To the east of those is the marsh area which attracts a great many migrant birds. In the south-eastern corner, beyond the marsh, is our Market Garden area, growing vegetables and flowers. All these areas can be visited by the general public for almost all the year... although please take note of the large signs at the entrance to each area which tell which tell you when certain areas are being used for particular controlled experiments and are therefore temporarily out of bounds to the public. You can see for yourself what a huge area the park covers and a key question is always, how can we move around? Well you have a choice of means all environmentally friendly Cars are banned in the park. We have bicycles which you can hire behind the reception block here the healthy ones of you can go on foot and finally there’s our electric tram, powered from solar cells. You find more information about this at the front entrance. A good place to start on your tour is the Rare Breeds section. We keep goats, sheep and hens and other kinds of poultry. We are also thinking of bringing in cows and horses but we do not, as yet, have facilities for these bigger animals. The animals are fed in public twice a day and a short lecture given on their feeding habits and nutritional needs. These are very popular with the public but of course we mustn’t lose sight of the main purpose of having this section not as such to preserve rare animals but to maintain the diversity of breeds to broaden the gene pool for agricultural development.",
          questions: [
            {
              id: "p3e38q1",
              question:
                "According to the speaker, what are the main purposes of the park?",
              options: [
                "education and entertainment.",
                "research and education.",
                "research and entertainment.",
                "education and agriculture",
              ],
              correct: 1,
              explanation:
                "Our remit is to give educational opportunities to the wider public as well as to offer research sites for a wide variety of agriculturists and other scientists. (Mục đích của chúng tôi là tạo ra những cơ hội giáo dục cho đông đảo cộng đồng cũng như cung cấp những khu nghiên cứu cho các nhà nông học và khoa học khác.)",
            },
            {
              id: "p3e38q2",
              question: "Which is the biggest part of the Park?",
              options: [
                "the Forest area",
                "Market Garden area",
                "the Rare Breed section",
                "Experimental Crop Area",
              ],
              correct: 0,
              explanation:
                "Then further east... in the largest section of our Park is the Forest Area. (Ở phương đông... khu vực rộng lớn nhất của công viên là Vùng Rừng.)",
            },
            {
              id: "p3e38q3",
              question: "How can you move around the park?",
              options: [
                "by tram, walking or bicycle",
                "by solar car or bicycle",
                "by bicycle, walking or bus",
                "by bus or bicycle",
              ],
              correct: 0,
              explanation:
                "You have a choice of means ... all environmentally friendly ... cars are banned in the park. We have bicycles which you can hire behind the Reception block ... here ... the healthy ones of you can go on foot and finally there’s our electric tram, powered from solar cells. (Bạn có nhiều lựa chọn về phương tiện... tất cả các lựa chọn đều thân thiện với môi trường... ô tô bị cấm trong công viên. Chúng tôi cung cấp xe đạp mà bạn có thể thuê ngay đằng sau tòa nhà Tiếp tân... Những người khỏe mạnh có thể đi bộ và cuối cùng, chúng tôi còn có xe điện, được cung cấp năng lượng từ pin mặt trời.)",
            },
            {
              id: "p3e38q4",
              question: "What rare breed animals are kept in the park?",
              options: [
                "hens and horses.",
                "goats and cows.",
                "goats and hens.",
                "cows and horses",
              ],
              correct: 2,
              explanation:
                "We keep goats, sheep and hens and other kinds of poultry. We are also thinking of bringing in cows and horses but we do not, as yet, have facilities for these bigger animals. (Chúng tôi có dê, cừu, gà mái và những loại chim nuôi khác. Chúng tôi đang cũng nghĩ về việc nuôi thêm bò cái và ngựa nhưng chúng tôi vẫn chưa có cơ sở vật chất để nuôi những động vật lớn hơn này.)",
            },
            {
              id: "p3e38q5",
              question:
                "What is the main purpose of having the Rare Breeds Section?",
              options: [
                "to save unusual animals",
                "to keep a variety of breeds",
                "to educate the public",
                "to save injured animals",
              ],
              correct: 1,
              explanation:
                "We mustn’t lose sight of the main purpose of having this section, not as such to preserve rare animals but to maintain the diversity of breeds to broaden the gene pool for agricultural development. (Chúng tôi không được quên mục đích chính của khu vực này, nó không phải để bảo tồn động vật quý hiếm mà là để duy trì tính đa dạng sinh sản để mở rộng gen cho sự phát triển nông nghiệp.)",
            },
          ],
        },
        {
          id: "p3e39",
          label: "Bai 39",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 39.mp3",
          transcript:
            "Hello I’m delighted to welcome you to our Wildlife Club and very pleased that you’re interested in the countryside and the plants and creatures of this area. I think you’ll be surprised at the variety we have here, even though we’re not far from London. I’ll start by telling you about some of the parks and open spaces nearby. One very pleasant place is Halland Common. This has been public land for hundreds of years and what you’ll find interesting is that the River Ouse which flows into the sea eighty kilometres away has its source in the Common. There’s an information board about the plants and animals you can see here and by the way, the Common is accessible 24 hours a day. Then there’s Holt Island which is noted for its great range of trees. In the past willows were grown here commercially for basket-making and this ancient craft has recently been reintroduced The island is only open to the public from Friday to Sunday, because it’s quite small and if there were people around every day much of the wildlife would keep away. From there it’s just a short walk across the bridge to Longfield Country Park Longfield has a modern replica of a farm from over two thousand years ago Children’s activities are often arranged there like bread-making and face-painting. The park is only open during daylight hours so bear that in mind if you decide to go there. Longfield Park has a programme of activities throughout the year and to give you a sample this is what’s happening in the next few days  On Monday you can learn about herbs and how they’ve been used over the centuries. You’ll start with a tour of our herb garden, practise the technique of using them as colour dyes for cloth and listen to an illustrated talk about their use in cooking and medicine. Then on Wednesday you can join local experts to discover the variety of insects and birds that appear in the evening. We keep to a small number of people in the group so if you want to go you’ll need to phone the park ranger a few days ahead. There’s a small charge which you should pay when you turn up. I’m sure you’re all keen to help with the practical task of looking after the park so on Saturday you can join a working party. You’ll have a choice of all sorts of activities from planting hedges to picking up litter so you’ll be able to change from one to another when you feel like it The rangers will be hard at work all day, but do come and join in, even for just a short while. One thing, though, is to make sure you’re wearing something that you don’t mind getting dirty or torn.",
          questions: [
            {
              id: "p3e39q1",
              question: "What is NOT true about Halland Common?",
              options: [
                "It has been open for a hundred years.",
                "It’s open all day long.",
                "Information about plants and animals are available to the public.",
                "River Ouse has its source in it.",
              ],
              correct: 0,
              explanation:
                "One very pleasant place is Halland Common. This has been public land for hundreds of years. (Ở đây có một chỗ rất thú vị là Halland Chung. Đây là vùng đất công cộng được hàng trăm năm rồi.)",
            },
            {
              id: "p3e39q2",
              question: "What does the speaker say about Holt Island?",
              options: [
                "It has been famous for handicraft.",
                "It’s commercially developed.",
                "It’s rather large.",
                "People come there every day.",
              ],
              correct: 0,
              explanation:
                "In the past willows were grown here commercially for basket-making, and this ancient craft has recently been reintroduced. (Trước đây, những cây liễu được trồng ở đây để lấy nguyên liệu đan giỏ, và nghề cổ truyền này đã mới đây đang được giới thiệu lại.)",
            },
            {
              id: "p3e39q3",
              question:
                "What will visitors do on Monday in the Longfield Park?",
              options: [
                "prepare food with herbs.",
                "meet a well-known herbalist.",
                "dye cloth with herbs.",
                "Painting their faces with herb dyes.",
              ],
              correct: 2,
              explanation:
                "On Monday you can learn about herbs, and how they’ve been used over the centuries. You’ll start with a tour of our herb garden, practise the technique of using them as colour dyes for cloth, and listen to an illustrated talk about their use in cooking and medicine. (Vào thứ hai, bạn có thể học về thảo dược, và cách mà chúng đã được sử dụng qua hàng thế kỷ. Bạn sẽ bắt đầu bằng một cuộc hành trình xung quanh vườn thảo dược, thực hành kỹ thuật của việc sử dụng chúng để nhuộm màu cho vải và nghe một bài nói có minh họa về cách sử dụng chúng trong việc nấu ăn và làm thuốc.)",
            },
            {
              id: "p3e39q4",
              question:
                "What does the speaker say about the activity on Wednesday?",
              options: [
                "only group bookings are accepted.",
                "visitors should book in advance.",
                "attendance is free.",
                "Visitors will listen to experts talking about insects and birds.",
              ],
              correct: 1,
              explanation:
                "We keep to a small number of people in the group, so if you want to go you’ll need to phone the park ranger a few days ahead. There’s a small charge, which you should pay when you turn up. (Chúng tôi duy trì số lượng người nhỏ trong nhóm, vì vậy nếu bạn muốn đi, bạn sẽ cần gọi điện cho những người bảo vệ công viên vài ngày trước đó. Bạn sẽ cần trả một ít tiền khi bạn đến.)",
            },
            {
              id: "p3e39q5",
              question: "What should visitors do for the activity on Saturday?",
              options: [
                "work hard on the activities.",
                "make sure they are able to stay for the whole day.",
                "tell the rangers before the event what they wish to do.",
                "come in suitable clothing.",
              ],
              correct: 3,
              explanation:
                "One thing, though, is to make sure you’re wearing something that you don’t mind getting dirty or torn. (Tuy nhiên, bạn cần chắc chắn rằng bạn đang mặc bộ quần áo mà bạn không phải lo nó sẽ bị bẩn hay rách.)",
            },
          ],
        },
        {
          id: "p3e40",
          label: "Bai 40",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 40.mp3",
          transcript:
            "Good morning I’m very pleased to have this opportunity to say a little about two exciting new developments in the city the Brackenside Open-Air Swimming Pool and the children\'s Adventure Playground in Central Park. As many of you may know, the idea for these initiatives came from you the public Consultation exercise with the city council conducted last year And they have been realised using money from the SWRDC the South West Regional Development Commission. First of all, Brackenside Pool As many of the older members of the audience will remember there used to be a wonderful open-air pool on the sea front 30 years ago but it had to close when it was judged to be unsafe. For the design of this new heated pool we were very happy to secure the talents of internationally renowned architect Ellen Wendon who has managed to combine a charming 0s design which fits in so well with many of the other buildings in the area with up-to-the-minute features such as a recycling system the only one of its kind in the world which enables seawater to be used in the pool. Now, there has been quite a bit of discussion in the local press about whether there would be enough room for the number of visitors we\'re hoping to attract but the design is deceptive and there have been rigorous checks about capacity. Also, just in case you were wondering, we’re on schedule for a June 15th opening date and well within budget a testimony to the excellent work of local contractors Hickman’s. We hope that as many people as possible will be there on June 15th. We have engaged award-winning actress Coral White to declare the pool open and there\'ll be drinks and snacks available at the pool side. There\'ll also be a competition for the public to decide on the sculpture we plan to have at the entrance you will decide which famous historical figure from the city we should have. and now moving on to the Central Park Playground which we’re pleased to announce has just won the Douglas Award for safety the news came through only last week. The unique design is based on the concept of the Global Village with the  playground being divided into six areas showing different parts of the world each with a representative feature. For example, there is a section on Asia and this is represented by rides and equipment in the shape of snakes orang-utans, tigers and so on fauna native to the forests of the region.",
          questions: [
            {
              id: "p3e40q1",
              question:
                "Where did the idea for the two new developments in the city come from?",
              options: [
                "local people.",
                "the City Council.",
                "the SWRDC.",
                "the city mayor",
              ],
              correct: 0,
              explanation:
                "The idea for these initiatives came from you the public. (Ý tưởng cho những những sáng kiến này đến từ cộng đồng người dân ở đây.)",
            },
            {
              id: "p3e40q2",
              question: "What is unusual about Brackenside pool?",
              options: [
                "its architectural style",
                "its heating system",
                "its method of water treatment",
                "its wonderful view of the sea",
              ],
              correct: 0,
              explanation:
                "For the design of this new heated pool, we were very happy to secure the talents of internationally renowned architect Ellen Wendon, who has managed to combine a charming 0s design, which fits in so well with many of the other buildings in the area. (Về thiết kế của bể nước nóng mới này, chúng tôi rất hài lòng khi được yên tâm về tài năng của kiến trúc sư Ellen Wendon nổi tiếng khắp thế giới, người mà đã thành công trong việc kết hợp thiết kế của những năm 0 đầy quyến rũ để hài hòa với nhiều tòa nhà khác trong vùng.)",
            },
            {
              id: "p3e40q3",
              question: "What have local newspapers raised worries about?",
              options: [
                "the late opening date.",
                "the cost of the project.",
                "the size of the facilities.",
                "the design of the central park",
              ],
              correct: 2,
              explanation:
                "Now, there has been quite a bit of discussion in the local press about whether there would be enough room for the number of visitors we\'re hoping to attract, but the design is deceptive and there have been rigorous checks about capacity. (Bây giờ, mọi người đang thảo luận xem liệu có đủ chỗ cho số lượng khách du lịch mà chúng ta hy vọng sẽ thu hút được hay không, nhưng thiết kế thì chưa được đảm bảo và ở đó đã có những cuộc khảo sát nghiêm khắc về sức chứa của khu vực đó.)",
            },
            {
              id: "p3e40q4",
              question: "What decision has NOT yet been made about the pool?",
              options: [
                "whose statue will be at the door",
                "the exact opening times",
                "who will open it",
                "what activities will take place",
              ],
              correct: 0,
              explanation:
                "There’ll also be a competition for the public to decide on the sculpture we plan to have at the entrance: you will decide which famous historical figure from the city we should have. (Sẽ có một cuộc thi cho quần chúng để quyết định xem tác phẩm điêu khắc nào nên được đặt ở lối vào, cụ thể là bạn sẽ chọn xem nhân vật lịch sử nổi tiếng nào của thành phố mà chúng ta nên chọn.)",
            },
            {
              id: "p3e40q5",
              question:
                "What did the Central Park Playground win the award for?",
              options: [
                "its unique design",
                "its open space",
                "its representative features of different continents.",
                "its safety",
              ],
              correct: 3,
              explanation:
                "And now, moving on to the Central Park Playground, which we’re pleased to announce has just won the Douglas Award for safety. (Và bây giờ, chúng tôi vui mừng khi thông báo rằng Sân chơi Công viên Trung tâm vừa mới chiến thắng Giải thưởng Douglas cho sự an toàn.)",
            },
          ],
        },
        {
          id: "p3e41",
          label: "Bai 41",
          audio: "listenning/LISTENING-P3/Ph%E1%BA%A7n 3 Test 41.mp3",
          transcript:
            "First of all let me thank you all for coming to this public meeting to discuss the future of our town. Our first speaker is Shona Ferguson from Barford town  council. Shona. Thank you. First I\'ll briefly give you some background information then I’ll be asking you for your comments on developments in the town. Well, as you don’t need me to tell you, Barford has changed a great deal in the last 50 years. These are some of the main changes. Fifty years ago, buses linked virtually every part of the town and the neighbouring towns and villages. Most people used them frequently but not now because the bus companies concentrate on just the routes that attract most passengers So parts of the town are no longer served by buses Even replacing old uncomfortable buses with smart new ones has had little impact on passenger numbers It\'s sometimes said that bus fares are too high but in relation to average incomes fares are not much higher than they were 50 years ago. Changes in the road network are affecting the town. The centre was recently closed to traffic on a trial basis making it much safer for pedestrians The impact of this is being measured. The new cycle paths, separating bikes from cars in most main roads, are being used far more than was expected reducing traffic and improving air quality And although the council’s attempts to have a bypass constructed have failed we haven’t given up hope of persuading the government to change its mind. Shopping in the town centre has changed over the years. Many of us can remember when the town was crowded with people going shopping. Numbers have been falling for several years. Despite efforts to attract shoppers for instance by opening new car parks Some people combine shopping with visits to the town’s restaurants and cafés. Most shops are small independent stores, which is good but many people prefer to use supermarkets and department stores in nearby large towns as there are so few well-known chain stores here. Turning now to medical facilities the town is served by family doctors in several medical practices fewer than 50 years ago but each catering for far more patients Our hospital closed 15 years ago which means journeys to other towns are unavoidable. On the other hand, there are more dentists than there used to be. Employment patterns have changed, along with almost everything else. The number of schools and colleges has increased, making that the main employment sector Services, such as website design and accountancy have grown in importance and surprisingly perhaps manufacturing hasn’t seen the decline that has affected it in other parts of the country.",
          questions: [
            {
              id: "p3e41q1",
              question:
                "In Shona’s opinion, why do fewer people use buses in Barford these days?",
              options: [
                "The buses are old and uncomfortable.",
                "Fares have gone up too much.",
                "There are not so many bus routes.",
                "The busses are too crowded.",
              ],
              correct: 2,
              explanation:
                "the bus companies concentrate on just the routes that attract most passengers So parts of the town are no longer served by buses (các công ty xe buýt tập trung vào những tuyến đường thu hút nhiều hành khách nhất, vì vậy một số phần của thị trấn không còn được phục vụ bởi xe buýt)",
            },
            {
              id: "p3e41q2",
              question:
                "What change in the road network is known to have benefited the town most?",
              options: [
                "the construction of a bypass",
                "the development of cycle paths",
                "the banning of cars from certain streets",
                "The development of pedestrian areas.",
              ],
              correct: 1,
              explanation:
                "The new cycle paths, separating bikes from cars in most main roads, are being used far more than was expected reducing traffic and improving air quality (những con đường đạp xe mới, tách xe đạp khỏi ô tô ở hầu hết các đường chính, đang được sử dụng nhiều hơn dự kiến, giảm thiểu giao thông và cải thiện chất lượng không khí)",
            },
            {
              id: "p3e41q3",
              question:
                "What is the problem affecting shopping in the town centre?",
              options: [
                "lack of parking spaces",
                "lack of major retailers",
                "lack of restaurants and cafes",
                "shops in towns do not have many special offers.",
              ],
              correct: 1,
              explanation:
                "Most shops are small independent stores, which is good but many people prefer to use supermarkets and department stores in nearby large towns as there are so few well-known chain stores (hầu hết các cửa hàng là các cửa hàng độc lập nhỏ, điều này tốt nhưng nhiều người thích sử dụng siêu thị và cửa hàng bách hóa ở các thị trấn lớn lân cận vì có rất ít chuỗi cửa hàng nổi tiếng)",
            },
            {
              id: "p3e41q4",
              question:
                "What does Shona say about medical facilities in Barford?",
              options: [
                "There is no hospital.",
                "New medical practices are planned.",
                "The number of dentists is too low.",
                "Family doctors serve too few patients.",
              ],
              correct: 0,
              explanation:
                "Another issue is the small number of doctors - people often have to travel to neighbouring towns for medical care, and there's no hospital here (một vấn đề khác là số lượng bác sĩ ít - mọi người thường phải đi đến các thị trấn lân cận để chăm sóc y tế, và không có bệnh viện ở đây)",
            },
            {
              id: "p3e41q5",
              question:
                "In which sector are the largest number of people employed?",
              options: ["manufacturing.", "services.", "education.", "agriculture."],
              correct: 1,
              explanation:
                "In terms of employment, the largest number of people work in service industries (về mặt việc làm, số lượng lớn nhất mọi người làm việc trong các ngành công nghiệp dịch vụ)",
            },
          ],
        },
      ],
    },
  ],
};
