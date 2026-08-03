// Game 1: 高橋財政 〜円の支配者〜
let g1 = { econ: 50, army: 50, fiscal: 50, turn: 1 };
const g1events = [
  {
    t: 1,
    text: "1931年 金輸出禁止：世界大恐慌の余波で日本は金本位制を放棄。円が急落し、輸出企業は潤うが、輸入品の値上がりで国民生活は圧迫される。",
    choices: [
      { label: "赤字公債を発行して公共事業を拡大（景気↑ 財政↓ 陸軍→）", e: 15, a: 0, f: -10 },
      { label: "軍事費を増やして陸軍をなだめる（景気→ 財政↓ 陸軍↑）", e: 0, a: 15, f: -10 },
      { label: "財政緊縮を宣言して信用回復を目指す（景気↓ 財政↑ 陸軍↓）", e: -10, a: -10, f: 15 }
    ]
  },
  {
    t: 2,
    text: "1932年 五・一五事件：犬養毅首相が海軍将校に暗殺。軍部の政治介入が表面化。高橋は大蔵大臣として軍事費増額要求に直面。",
    choices: [
      { label: "軍事費を抑制し、代わりに地方産業支援に回す（景気↑ 陸軍↓↓）", e: 10, a: -20, f: -5 },
      { label: "満州事変の軍事費を一部認可（景気→ 陸軍↑ 財政↓）", e: 0, a: 10, f: -10 },
      { label: "海軍拡張案に全面協力（景気↓ 陸軍↑↑ 財政↓↓）", e: -5, a: 20, f: -15 }
    ]
  },
  {
    t: 3,
    text: "1933年 満州国成立：国際連盟を脱退し、日本は国際的孤立へ。高橋は「軍事費を増やしても国際協調を失う」と主張するが…",
    choices: [
      { label: "国際協調路線を貫き、軍事費を凍結（景気↑ 陸軍↓↓ 財政↑）", e: 15, a: -25, f: 10 },
      { label: "満州国承認と引き換えに軍事費増を認める（景気→ 陸軍↑ 財政↓）", e: 0, a: 15, f: -10 },
      { label: "満州国の経済開発に民間資金を誘導（景気↑↑ 陸軍→ 財政→）", e: 20, a: 0, f: 0 }
    ]
  },
  {
    t: 4,
    text: "1934年 天羽声明：日本がアジアの安定を独力で維持すると宣言。軍部の暴走が加速。高橋は「財政規律」を旗印に軍事費抑制を図る。",
    choices: [
      { label: "「財政再建10カ年計画」を掲げ、軍事費を漸減（景気→ 陸軍↓↓↓ 財政↑↑）", e: 5, a: -30, f: 20 },
      { label: "海軍の要求を黙認し、空軍力増強に回す（景気↓ 陸軍↑ 財政↓）", e: -5, a: 10, f: -10 },
      { label: "日銀に国債引き受けを要請し、軍事費と公共投資の両立を図る（景気↑ 陸軍→ 財政↓↓）", e: 15, a: 0, f: -15 }
    ]
  },
  {
    t: 5,
    text: "1935年 軍部の不満が臨界点に。陸軍青年将校たちは「天皇を戴く革新」を叫び、政財界の重鎮への暗殺計画を立てているという噂が…",
    choices: [
      { label: "私邸の警備を強化し、表立って軍部と対決（景気→ 陸軍↓↓↓）", e: 0, a: -20, f: -5 },
      { label: "陸軍高官と密談し、穏健派との連携を模索（景気→ 陸軍↓）", e: 0, a: -10, f: -5 },
      { label: "病床を理由に辞表を提出（景気↓ 陸軍↑ 財政→）", e: -10, a: 10, f: 5 }
    ]
  },
  {
    t: 6,
    text: "1936年 二・二六事件直前：2月25日夜。高橋は官邸に泊まることを決めた。明日、運命の日が来る。",
    choices: [
      { label: "最後まで財政規律を貫く（景気→ 陸軍↓↓）", e: 0, a: -15, f: 10 },
      { label: "軍事費増額を密かに約束し、身の安全を図る（景気↓ 陸軍↑）", e: -5, a: 15, f: -10 },
      { label: "天皇に直訴し、軍部の統制を求める（景気→ 陸軍↓↓↓）", e: 0, a: -25, f: 0 }
    ]
  }
];

function initG1() {
  g1 = { econ: 50, army: 50, fiscal: 50, turn: 1 };
  document.getElementById('g1-result').style.display = 'none';
  document.getElementById('g1-event').style.display = 'block';
  renderG1();
}

function renderG1() {
  document.getElementById('g1-turn').textContent = g1.turn;
  setBar('g1-econ', g1.econ);
  setBar('g1-army', g1.army);
  setBar('g1-fiscal', g1.fiscal);
  document.getElementById('g1-econ').textContent = g1.econ;
  document.getElementById('g1-army').textContent = g1.army;
  document.getElementById('g1-fiscal').textContent = g1.fiscal;
  const ev = g1events[g1.turn - 1];
  document.getElementById('g1-event').textContent = ev.text;
  const cdiv = document.getElementById('g1-choices');
  cdiv.innerHTML = '';
  ev.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.textContent = c.label;
    btn.className = 'card';
    btn.onclick = () => g1choose(i);
    cdiv.appendChild(btn);
  });
}

function g1choose(i) {
  const c = g1events[g1.turn - 1].choices[i];
  g1.econ = Math.max(0, Math.min(100, g1.econ + c.e));
  g1.army = Math.max(0, Math.min(100, g1.army + c.a));
  g1.fiscal = Math.max(0, Math.min(100, g1.fiscal + c.f));
  g1.turn++;
  if (g1.turn > 6) {
    g1end();
  } else {
    renderG1();
  }
}

function g1end() {
  document.getElementById('g1-choices').innerHTML = '';
  document.getElementById('g1-event').style.display = 'none';
  const res = document.getElementById('g1-result');
  res.style.display = 'block';
  let txt = '';
  if (g1.army <= 20) {
    txt = '【生存ルート】あなたは軍部を徹底的に抑制し、二・二六事件を回避した。しかし、陸軍内部の不満は燻り続け、別の形でのクーデターリスクは残る。高橋財政は「景気回復」を達成したが、その代償として財政赤字は累積した。';
  } else if (g1.army <= 50) {
    txt = '【葛藤ルート】あなたは軍部と一定の距離を保ちつつ、財政運営を続けた。1936年2月26日、官邸に乱入者があったが、高橋は負傷して生還。しかし、軍部の影響力は拡大し、日中戦争への道は開かれた。';
  } else {
    txt = '【史実ルート】あなたは軍部に対して強硬すぎた。1936年2月26日未明、青年将校たちは官邸に乱入し、78歳の高橋是清を銃剣で暗殺した。彼の遺体の傍らには、財政再建のための書類が散らばっていた。';
  }
  txt += '\n\n最終スコア：景気' + g1.econ + ' / 陸軍' + g1.army + ' / 財政' + g1.fiscal;
  document.getElementById('g1-result-text').textContent = txt;
}