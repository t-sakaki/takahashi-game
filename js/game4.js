// Game 4: 是清の相場帳
let g4 = { scene: 0, score: 0 };
const g4scenes = [
  {
    text: "1920年、東京株式市場で異常な売り注文が集中している。某財閥系銀行の株が急落しているが、社内では「情報漏洩」の噂が…",
    clue: "相場帳：A銀行が3日前に大口の担保差し入れをしていた。差し入れ先は海外の投機家。",
    choices: [
      { label: "A銀行の支店長を直撃取材する", correct: true, feed: "支店長は「上からの指示で動いた」と漏らした。上とは、陸軍の某中将だった。軍部が政財界に介入し、特定企業の弱体化を図っていた。" },
      { label: "海外投機家の正体を調べる", correct: false, feed: "投機家は単なるフロント企業。真の黒幕は別にいる。時間を浪費した。" },
      { label: "株価のテクニカル分析に没頭する", correct: false, feed: "チャートだけでは「誰が利益を得るか」は分からない。高橋は常に「人間の動機」を追った。" }
    ]
  },
  {
    text: "1923年、関東大震災直後。震災手形の処理で日銀が特殊融資を行うことになったが、融資先リストに見覚えのない名前が多数含まれている。",
    clue: "相場帳：融資先の半分が、震災前に設立されたばかりの「建設会社」である。資本金は極めて少ない。",
    choices: [
      { label: "建設会社の代表者名簿を調べる", correct: true, feed: "代表者の多くが、政界の有力者の親族や元陸軍関係者だった。震災を「ビジネスチャンス」と捉えた輩が、国難を横取りしていた。" },
      { label: "融資額の多い順に優先して調査する", correct: false, feed: "大金を借りた企業は表向き正当な事業者だった。小額の「建設会社」こそが、資金洗浄のフロントだった。" },
      { label: "日銀内部の融資担当者に聞き込みする", correct: false, feed: "担当者は「上からの圧力で黙っていた」と証言。だが「上」が誰かは、口を割らなかった。" }
    ]
  },
  {
    text: "1927年、昭和金融恐慌。某銀行の兌換停止がきっかけで、全国に恐慌が広がっている。だが、兌換停止の「タイミング」が妙に整っている。",
    clue: "相場帳：兌換停止の3日前、某新聞社が「A銀行が危ない」と報じた。記者のソースは、大蔵省の匿名官僚。",
    choices: [
      { label: "大蔵省の匿名官僚の正体を突き止める", correct: true, feed: "官僚は、A銀行の競合であるB銀行の元役員だった。恐慌を利用した同業者潰し——これが「経済戦」の暗部だ。" },
      { label: "新聞社の編集局長に圧力をかける", correct: false, feed: "編集局長は「読者の知る権利」と逆ギレ。情報源を守る姿勢は見事だが、真の黒幕は別にいる。" },
      { label: "A銀行の預金者を直接取材する", correct: false, feed: "預金者は「新聞を読んで慌てた」と語る。だが、新聞を出した「誰か」の意図を追うべきだった。" }
    ]
  },
  {
    text: "1931年、金輸出禁止直前。為替市場で円売りが急増しているが、売りの中心は「日本政府関係者の家族名義」の口座だという情報が…",
    clue: "相場帳：売り注文の多くが、ロンドンの某銀行に集中。その銀行の顧問は、元日本銀行役員。",
    choices: [
      { label: "元日銀役員の現在の活動を調べる", correct: true, feed: "元役員は、金輸出禁止の情報を事前に得て、個人的に円を売っていた。国家の機密を利用した「官製インフサイダー」——これが高橋が憎んだ「経済の敵」だ。" },
      { label: "政府関係者の資産申告を照会する", correct: false, feed: "資産申告は後付けの書類で、為替操作の証拠にはならない。動機とタイミングを追うべきだった。" },
      { label: "ロンドンの銀行に直接照会する", correct: false, feed: "銀行側は「顧客秘密」を盾に拒否。海外の金融機関に対しては、別のルートで情報を集める必要がある。" }
    ]
  }
];
function initG4(){g4={scene:0,score:0};document.getElementById('g4-result').style.display='none';document.getElementById('g4-clues').style.display='block';renderG4();}
function renderG4(){
  document.getElementById('g4-scene').textContent=g4.scene+1;
  const sc=g4scenes[g4.scene];
  document.getElementById('g4-text').textContent=sc.text;
  document.getElementById('g4-clues').textContent='【手がかり】'+sc.clue;
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(sc.text);
    utter.lang = 'ja-JP';
    window.speechSynthesis.speak(utter);
  }
  const cdiv=document.getElementById('g4-choices');cdiv.innerHTML='';
  sc.choices.forEach((c,i)=>{const btn=document.createElement('button');btn.textContent=c.label;btn.className='card';btn.onclick=()=>g4choose(i);cdiv.appendChild(btn);});
}
function g4choose(i){
  const c=g4scenes[g4.scene].choices[i];
  if(c.correct)g4.score++;
  const feedDiv=document.createElement('div');feedDiv.className='muted';feedDiv.style.marginBottom='12px';feedDiv.textContent=c.feed;
  const cdiv=document.getElementById('g4-choices');cdiv.innerHTML='';cdiv.appendChild(feedDiv);
  const nextBtn=document.createElement('button');nextBtn.textContent='次へ →';nextBtn.className='back';
  nextBtn.onclick=()=>{g4.scene++;if(g4.scene>=4){g4end();}else{renderG4();}};
  cdiv.appendChild(nextBtn);
}
function g4end(){
  document.getElementById('g4-choices').innerHTML='';
  document.getElementById('g4-clues').style.display='none';
  const res=document.getElementById('g4-result');res.style.display='block';
  let txt='';
  if(g4.score>=3){txt='【名探偵】あなたは4事件のうち'+g4.score+'件の黒幕を正しく特定した。高橋是清の「相場の異常は必ず誰かの利益になる」という直感は、現代の金融犯罪捜査にも通じる。';}
  else if(g4.score>=2){txt='【優秀】'+g4.score+'件の黒幕を特定。情報の「動機」と「タイミング」を追う目は養われてきた。';}
  else{txt='【要修行】'+g4.score+'件のみ正解。経済事件では「誰が得するか」より「いつ、どう動いたか」を追うことが重要だ。';}
  document.getElementById('g4-result-text').textContent=txt;
}