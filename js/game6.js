// Game 6: 現代の経済政策シミュレーション
let g6 = { econ: 50, fiscal: 50, inflation: 50, turn: 1 };
const g6events = [
  {t:1,text:"2024年 世界的なインフレ圧力が高まる中、国内需要は回復傾向だが、エネルギー価格上昇がコストプッシュインフレを助長している。",choices:[
    {label:"積極的財政出動で需要を喚起（景気↑ 財政↓ インフレ→）",e:15,f:-10,i:5},
    {label:"金融引き締めでインフレ抑制（景気→ 財政→ インフレ↓）",e:-5,f:0,i:-15},
    {label:"供給側対策（エネルギー補助金）でコスト抑制（景気→ 財政↓ インフレ↓）",e:0,f:-10,i:-10}
  ]},
  {t:2,text:"2025年 IMFが債務対GDP比の上昇を警告。財政赤字が続く場合、中期的な財政持続可能性に懸念。",choices:[
    {label:"財政再建プランを策定し、段階的な支出削減を開始（景気↓ 財政↑ インフレ→）",e:-10,f:15,i:0},
    {label:"成長戦略に重点を置き、生産性向上投資を拡大（景気↑ 財政↓ インフレ→）",e:15,f:-10,i:5},
    {label:"現在の政策を維持し、様子見（景気→ 財政→ インフレ→）",e:0,f:0,i:0}
  ]},
  {t:3,text:"2026年 賃金上昇が需要を押し上げる一方、製造業の供給制約が続く。IMFは賃金・物価スパイラルへの警戒を示す。",choices:[
    {label:"賃金上昇に合わせた最低賃金引き上げ（景気↑ 財政↓ インフレ↑）",e:10,f:-10,i:10},
    {label:"生産性向上補助金で供給側を支援（景気↑ 財政↓ インフレ→）",e:10,f:-10,i:0},
    {label:"インフレ期待の固定化のためにインフレ目標を明確化（景気→ 財政→ インフレ↓）",e:0,f:0,i:-15}
  ]},
  {t:4,text:"2027年 世界経済の減速が輸出を圧迫。国内需要のみでの成長には限界。IMFは構造改革と開放を勧める。",choices:[
    {label:"輸出促進のための関税引き下げと貿易協定推進（景気↑ 財政→ インフレ→）",e:10,f:0,i:5},
    {label:"国内需要をさらに刺激するための公共投資増額（景気↑ 財政↓ インフレ↑）",e:15,f:-10,i:10},
    {label:"構造改革（規制緩和・労働市場柔軟化）で潜在成長率向上（景気↑ 財政→ インフレ→）",e:10,f:0,i:0}
  ]},
  {t:5,text:"2028年 政府債務がGDP比100%に迫る。IMFは中期的な財政ルールの導入を助言。",choices:[
    {label:"プライマリーバランス黒字化を目指し、歳出見直しを実施（景気↓ 財政↑ インフレ→）",e:-10,f:15,i:0},
    {label:"成長志向の財政政策を維持し、債務はGDP成長で相殺（景気↑ 財政↓ インフレ→）",e:15,f:-10,i:5},
    {label:"バランスの取れたアプローチ：中程度の財政統合と成長投資（景気→ 財政→ インフレ→）",e:0,f:0,i:0}
  ]}
];
function initG6(){g6={econ:50,fiscal:50,inflation:50,turn:1};document.getElementById('g6-result').style.display='none';document.getElementById('g6-event').style.display='block';renderG6();}
function renderG6(){
  document.getElementById('g6-turn').textContent=g6.turn;
  setBar('g6-econ',g6.econ);setBar('g6-fiscal',g6.fiscal);setBar('g6-inflation',g6.inflation);
  document.getElementById('g6-econ').textContent=g6.econ;
  document.getElementById('g6-fiscal').textContent=g6.fiscal;
  document.getElementById('g6-inflation').textContent=g6.inflation;
  const ev=g6events[g6.turn-1];
  document.getElementById('g6-event').textContent=ev.text;
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(ev.text);
    utter.lang = 'ja-JP';
    window.speechSynthesis.speak(utter);
  }
  const cdiv=document.getElementById('g6-choices');cdiv.innerHTML='';
  ev.choices.forEach((c,i)=>{const btn=document.createElement('button');btn.textContent=c.label;btn.className='card';btn.onclick=()=>g6choose(i);cdiv.appendChild(btn);});
}
function setBar(id,val){document.getElementById(id+'-bar').style.width=Math.max(0,Math.min(100,val))+'%';}
function g6choose(i){
  const c=g6events[g6.turn-1].choices[i];
  g6.econ=Math.max(0,Math.min(100,g6.econ+c.e));
  g6.fiscal=Math.max(0,Math.min(100,g6.fiscal+c.f));
  g6.inflation=Math.max(0,Math.min(100,g6.inflation+c.i));
  g6.turn++;
  if(g6.turn>6){g6end();}else{renderG6();}
}
function g6end(){
  document.getElementById('g6-choices').innerHTML='';
  document.getElementById('g6-event').style.display='none';
  const res=document.getElementById('g6-result');res.style.display='block';
  let txt='';
  // 評価基準：景気が高いほど良い、財政は中庸が良い（極端すぎるとマイナス）、インフレは2%付近が理想（ここでは50が目安とし、±10内が良しとする）
  const econScore = g6.econ;
  const fiscalScore = 100 - Math.abs(g6.fiscal - 50); // 50が理想
  const inflationScore = 100 - Math.abs(g6.inflation - 50); // 50が理想
  const total = (econScore + fiscalScore + inflationScore) / 3;
  if(total >= 80){
    txt='【優秀】バランスの取れた政策運営により、経済成長と財政健全性、物価安定を同時に達成した。IMFもこのような「包括的アプローチ」を推奨している。';
  }else if(total >= 60){
    txt='【良好】概ねバランスが取れているが、一部の指標で改善の余地がある。例えば、財政規律またはインフレコントロールの強化が望まれる。';
  }else{
    txt='【改善必要】政策の偏りが顕著で、長期的な持続可能性に懸念が残る。IMFはこれらの課題に対する構造的改革と中期的なフレームワークの導入を助言する。';
  }
  txt+='\n\n最終スコア：景気'+g6.econ+' / 財政'+g6.fiscal+' / インフレ'+g6.inflation;
  document.getElementById('g6-result-text').textContent=txt;
}