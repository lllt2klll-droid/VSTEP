window.Lesson1Data = {
  id: 1,
  title: "L1: SPEAKING PART 1",
  description: "Chiến lược và kỹ năng cho phần thi Speaking Part 1 VSTEP",
  category: "speaking",
  level: "B1-B2",
  duration: "60 phút",
  sections: [
    {
      id: "overview",
      title: "1. TỔNG QUAN VSTEP",
      order: 1,
      content: `
        <h3>1. TỔNG QUAN VSTEP</h3>
        <ul>
          <li>Listening: 45-47 phút</li>
          <li>Reading: 60 phút</li>
          <li>Writing: 60 phút</li>
          <li>Speaking: 12 phút</li>
          <li>1 buổi (sáng/chiều)</li>
          <li>Hình thức: thi máy</li>
        </ul>
      `
    },
    {
      id: "speaking-overview",
      title: "2. TỔNG QUAN SPEAKING",
      order: 2,
      content: `
        <h3>2. TỔNG QUAN SPEAKING</h3>
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Tên</th>
              <th>Chủ đề</th>
              <th>Thời gian</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Part 1</td>
              <td>Social Interaction</td>
              <td>Về em</td>
              <td>3 phút (không chuẩn bị)</td>
              <td>6 câu hỏi = 2 chủ đề × 3 câu hỏi</td>
            </tr>
            <tr>
              <td>Part 2</td>
              <td>Solution Discussion</td>
              <td>Về em</td>
              <td>4 phút (1 phút chuẩn bị + 3 phút nói)</td>
              <td>1 tình huống + 3 giải pháp → chọn gì + vì sao</td>
            </tr>
            <tr>
              <td>Part 3</td>
              <td>Topic Development</td>
              <td>Về xã hội</td>
              <td>5 phút (1 phút chuẩn bị + 4 phút nói)</td>
              <td>Chính: 1 chủ đề + 3 ý tưởng → phát triển<br>Phụ: 3 câu hỏi thêm</td>
            </tr>
          </tbody>
        </table>
        <p><strong>5 tiêu chí chấm Speaking:</strong> Vocab + Grammar + Pronunciation + Fluency + Discourse Management (nội dung & sự logic)</p>
      `
    },
    {
      id: "strategy",
      title: "3. CHIẾN LƯỢC SPEAKING PART 1 - A.R.E",
      order: 3,
      content: `
        <h3>3. CHIẾN LƯỢC SPEAKING PART 1 - A.R.E</h3>
        
        <div class="content-subsection">
          <h4>3.1. CẤU TRÚC - A.R.E</h4>
          <div class="example-box">
            <p><strong>Ví dụ câu hỏi:</strong> Do you like sports?</p>
            <p><em>Yes, I like sports because sports are good for health. For example, I like playing badminton.</em></p>
          </div>
          
          <div class="are-diagram">
            <div class="are-letter-card are-a">
              <div class="are-letter">A</div>
              <div class="are-name">ANSWER</div>
              <div class="are-description">
                <strong>Trả lời trực tiếp = BÁM SÁT câu hỏi</strong>
                <ul>
                  <li>you → I</li>
                  <li>your → my</li>
                </ul>
              </div>
              <div class="are-example">
                <strong>Ví dụ:</strong> Yes, I like sports
              </div>
            </div>
            
            <div class="are-arrow">→</div>
            
            <div class="are-letter-card are-r">
              <div class="are-letter">R</div>
              <div class="are-name">REASON</div>
              <div class="are-description">
                <strong>Đưa ra lí do = tự hỏi bản thân WHY</strong>
                <ul>
                  <li>because ... (cùng câu)</li>
                  <li>This is because ... (khác câu)</li>
                  <li>The reason why ... is that ... (khác câu)</li>
                </ul>
              </div>
              <div class="are-example">
                <strong>Ví dụ:</strong> because sports are good for health
              </div>
            </div>
            
            <div class="are-arrow">→</div>
            
            <div class="are-letter-card are-e">
              <div class="are-letter">E</div>
              <div class="are-name">EXAMPLE</div>
              <div class="are-description">
                <strong>Đưa ra ví dụ mở rộng = tự hỏi bản thân WHAT/ WHICH, WHO(M), WHEN, WHERE, HOW</strong>
                <ul>
                  <li>For example, ...</li>
                  <li>For instance, ...</li>
                </ul>
              </div>
              <div class="are-example">
                <strong>Ví dụ:</strong> For example, I like badminton/ soccer/... I play sports with my brother/ in the morning/ at the stadium/well
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-subsection">
          <h4>3.2. CÂU DẪN:</h4>
          <div class="lead-phrases">
            <div class="lead-phrase-card">
              <div class="lead-phrase">I am going to talk about + topic 1</div>
              <div class="lead-phrase-result">→ trả lời 3 câu hỏi của topic 1</div>
            </div>
            <div class="lead-phrase-card">
              <div class="lead-phrase">I am going to talk about + topic 2</div>
              <div class="lead-phrase-result">→ trả lời 3 câu hỏi của topic 2</div>
            </div>
          </div>
        </div>
        
        <div class="content-subsection">
          <h4>3.3. BƯỚC LÀM:</h4>
          <div class="steps-container">
            <div class="step-card">
              <div class="step-number">⏱</div>
              <div class="step-content">
                <strong>Thời gian:</strong> 3 phút = 30s-1 phút chuẩn bị + 2 phút-2 phút30s nói
              </div>
            </div>
            <div class="step-card">
              <div class="step-number">📝</div>
              <div class="step-content">
                <strong>1 phút chuẩn bị:</strong> Kẻ bảng sau ra nháp
              </div>
            </div>
          </div>
          
          <div class="prep-table-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>A</th>
                  <th>R</th>
                  <th>E</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>KEYWORD</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>yes</td>
                  <td>good for health</td>
                  <td>with my family</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2h</td>
                  <td>interesting</td>
                  <td>evening</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>went to DL</td>
                  <td>beautiful city</td>
                  <td>with friends</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },
    {
      id: "vocab",
      title: "4. VOCAB ĐẠI CƯƠNG",
      order: 4,
      content: `
        <h3>4. VOCAB ĐẠI CƯƠNG</h3>
        <p><strong>3 dạng câu hỏi hay gặp → học thuộc REASON</strong></p>
        
        <table>
          <thead>
            <tr>
              <th>DẠNG CÂU HỎI</th>
              <th>ANSWER</th>
              <th>REASON (học thuộc)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Liking</strong></td>
              <td>yes</td>
              <td>
                <strong>Liking expression:</strong><br>
                + adj: <span class="vocab-term" data-meaning="be into = thích, hứng thú với">be into</span> / <span class="vocab-term" data-meaning="interested in = quan tâm đến">interested in</span> / <span class="vocab-term" data-meaning="keen on = thích, mến">keen on</span> / <span class="vocab-term" data-meaning="engrossed in = say mê, đắm chìm">engrossed in</span> / <span class="vocab-term" data-meaning="passionate about = đam mê">passionate about</span> / <span class="vocab-term" data-meaning="enthusiastic about = nhiệt tình với">enthusiastic about</span> / <span class="vocab-term" data-meaning="crazy about = điên cuồng về">crazy about</span> / <span class="vocab-term" data-meaning="a big fan of = là fan hâm mộ lớn của">a big fan of</span> / <span class="vocab-term" data-meaning="fond of = yêu thích">fond of</span><br>
                + verb: <span class="vocab-term" data-meaning="love = yêu thích">love</span>/<span class="vocab-term" data-meaning="adore = sùng bái, yêu thích rất nhiều">adore</span>/<span class="vocab-term" data-meaning="enjoy = tận hưởng">enjoy</span> + Ving<br>
                - I feel comfortable and relaxed<br>
                - It makes me feel comfortable and relaxed<br>
                - it is interesting
              </td>
            </tr>
            <tr>
              <td><strong>Alone - Other people</strong></td>
              <td>other people</td>
              <td>
                I love sharing moments with people/ my friends and family/ others<br>
                and I want to spend <span class="vocab-term" data-meaning="quality time = thời gian chất lượng, thời gian quý giá">quality time</span> with my family/friends
              </td>
            </tr>
            <tr>
              <td><strong>So sánh hiện tại - quá khứ</strong></td>
              <td>ko thay đổi</td>
              <td>
                because I still like/love ...
              </td>
            </tr>
          </tbody>
        </table>
        
        <p><strong>3 khía cạnh phát triển ý tưởng REASON (liking/ advantages):</strong> It helps me V/ to V</p>
        <ul>
          <li><strong>+ Physical health:</strong> <span class="vocab-term" data-meaning="keep fit = giữ dáng">keep fit</span>, <span class="vocab-term" data-meaning="get into shape = có vóc dáng đẹp">get into shape</span>, <span class="vocab-term" data-meaning="burn fat = đốt cháy mỡ">burn fat</span> and calories, lose weight, <span class="vocab-term" data-meaning="strengthen immune system = tăng cường hệ miễn dịch">strengthen immune system</span>,...</li>
          <li><strong>+ Mental health:</strong>
            <ul>
              <li>Vui 1 mình: <span class="vocab-term" data-meaning="relax = thư giãn">relax</span> = rest = <span class="vocab-term" data-meaning="recharge my battery = nạp lại năng lượng">recharge my battery</span>, <span class="vocab-term" data-meaning="boost energy = tăng năng lượng">boost energy</span>, feel + happy/refreshed/relaxed, reduce stress</li>
              <li>Vui nhiều mình: can meet a lot of <span class="vocab-term" data-meaning="LIKE-MINDED people = những người có cùng sở thích">LIKE-MINDED people</span> who share the same interests with me, make new friends</li>
            </ul>
          </li>
          <li><strong>+ Increase/gain/broaden knowledge</strong></li>
        </ul>
        <p>Ví dụ: It helps me recharge my battery/ to reduce stress</p>
      `
    },
    {
      id: "grammar",
      title: "5. BA CẤU TRÚC NGỮ PHÁP CƠ BẢN",
      order: 5,
      content: `
        <h3>5. BA CẤU TRÚC NGỮ PHÁP CƠ BẢN</h3>
        
        <table>
          <thead>
            <tr>
              <th>Cấu trúc</th>
              <th>Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S (Ving) + V<br><small>S ít + Vs/es<br>S nhiều + V nguyên</small></td>
              <td>I like sports<br>She likeS sports<br>We like music<br>They go to school</td>
            </tr>
            <tr>
              <td>S (Ving) + TOBE + adj</td>
              <td>Sports are good for health<br>She is beautiful<br>Playing soccer is good for health<br>Learning English is easy</td>
            </tr>
            <tr>
              <td>S + TOBE + (a/an/the) N</td>
              <td>Dalat is a (beautiful) city<br>She is a teacher<br>They are doctors</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: "examples",
      title: "6. PART I: SOCIAL INTERACTION (~ 3 mins)",
      order: 6,
      content: `
        <h3>6. PART I: SOCIAL INTERACTION (~ 3 mins)</h3>
        
        <h4>Topic 1: Holidays</h4>
        <p><em>Let's talk about holidays. ⇒ I am going to talk about + holidays</em></p>
        
        <table>
          <thead>
            <tr>
              <th>Câu hỏi</th>
              <th>Ví dụ trả lời</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What did you do on your last holiday?</td>
              <td>
                <strong>A:</strong> I went to Dalat on my last holiday.<br>
                <strong>R:</strong> This is because it is a beautiful city<br>
                <strong>E:</strong> For example, I went there with my friends/ last month.
              </td>
            </tr>
            <tr>
              <td>Who do you prefer spending your holiday with? Relatives or friends?</td>
              <td></td>
            </tr>
            <tr>
              <td>Do you prefer going on holiday abroad?</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <h4>Topic 2: TV Programmes</h4>
        <p><em>Now, let's talk about TV programmes. ⇒ I am going to talk about + TV programmes</em></p>
        
        <table>
          <thead>
            <tr>
              <th>Câu hỏi</th>
              <th>Ví dụ trả lời</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How many hours a day do you watch television?</td>
              <td>
                <strong>A:</strong> I watch TV 1 hour/ 3 hourS a day<br>
                <strong>R:</strong> This is because it/ watchING TV helps me relax (v)<br>
                <strong>E:</strong> For instance, I watch TV with my family
              </td>
            </tr>
            <tr>
              <td>Which programmes do you like?</td>
              <td></td>
            </tr>
            <tr>
              <td>Do you prefer watching television alone or with other people? Why?</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <h4>Ví dụ hoàn chỉnh:</h4>
        <p><strong>Do you like sports?</strong></p>
        <p>Yes, I like sports because sports are good for health. For example, I like playing badminton.</p>
        
        <p><strong>Ví dụ nâng cao:</strong></p>
        <p>Yes, I am fond of playing sports because it is good for health. It helps me to recharge my battery and feel relaxed. Moreover, It also helps me burn fat and calories. For example, I am a big fan of playing soccer.</p>
      `
    },
    {
      id: "notes",
      title: "7. DẶN DÒ GG CLASSROOM",
      order: 7,
      content: `
        <h3>7. DẶN DÒ GG CLASSROOM</h3>
        <ul>
          <li>Đọc tài liệu speak p1 → làm bài tập speak 1 → lớp luôn gửi trước tài liệu 1b và hs có thể đọc trước</li>
          <li>Bài tập lis read được đăng lên hàng tuần và deadline là chủ nhật tuần đó. Mỗi tuần có 1 bài tập lis và 1 bài tập read.</li>
        </ul>
        <p><strong>B2: SPEAKING PART 2, 3</strong></p>
      `
    }
  ],
  objectives: [
    "Hiểu cấu trúc bài thi VSTEP",
    "Nắm được chiến lược A.R.E cho Speaking Part 1",
    "Học thuộc từ vựng cho 3 dạng câu hỏi thường gặp",
    "Áp dụng 3 cấu trúc ngữ pháp cơ bản",
    "Thực hành trả lời câu hỏi Speaking Part 1"
  ],
  prerequisites: [],
  nextLesson: 2
};
