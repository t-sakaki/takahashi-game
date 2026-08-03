// Game 7: 高市早苗政権経済シミュレーション
let g7 = { econ: 50, def: 50, fiscal: 50, turn: 1 };
const g7events = [
  {t:1,text:"2024年 世界経済は緩やかな回復だが、地政学的緊張が高まる中、円安が進行している。輸出企業は利益増だが、輸入コスト上昇が家計を圧迫。",choices:[
    {label:"為替介入を実施し、円安を抑制（輸出↓ 輸入コスト↓ 財政↓）",e:-5,d:0,f:-10},
    {label:"金融緩和を継続し、円安を容認（輸出↑ 輸入コスト↑ 景気↑）",e:10,d:0,f:-5},
    {label:"輸出促進補助金で企業を支援（財政↓ 経済↑ 円安維持）",e:10,d:0,f:-15}
  ]},
  {t:2,text:"2025年 食品への消費税率適用を検討。低所得世帯への影響が懸念される。",choices:[
    {label:"食品に消費税10%を一律適用（財政↑ 家計負担↑ 消費↓）",e:-5,d:0,f:15},
    {label:"食品は軽減税率8%を適用し、低所得者に給付（財政↑↑ 家計負担軽減）",e:5,d:0,f:10},
    {label:"当面は現行のまま見送り、将来的に検討（財政→ 家計→）",e:0,d:0,f:0}
  ]},
  {t:3,text:"2026年 日米協調介入の機会が到来。米国の利上げ環境下で円安是正が求められている。",choices:[
    {label:"日米協調介入に参加し、ドル売り・円買いを実施（円高→ 輸出↓ 輸入コスト↓）",e:-10,d:0,f:0},
    {label:"単独での為替介入を行うが、効果は限定的（円安続く）",e:5,d:0,f:-5},
    {label:"介入を見合わせ、市場に任せる（変動性↑）",e:0,d:0,f:0}
  ]},
  {t:4,text:"2027年 エネルギー・食料価格の高騰が続き、インフレ圧力が高まる。賃金上昇も見られる。",choices:[
    {label:"金融政策を引き締め、インフレ抑制（景気↓ 企業収益↓）",e:-10,d:0,f:0},
    {label:"目標物価を維持しつつ、賃金上昇を支援する補助金（財政↓ 景気↑）",e:10,d:0,f:-10},
    {label:"供給側対策（省エネ・食料自給率向上）に投資（財政↓ 産業↑）",e:5,d:0,f:-10}
  ]},
  {t:5,text:"2028年 政府債務がGDP比100%に近づく。IMFは中期的な財政ルールの導入を助言。",choices:[
    {label:"プライマリーバランス黒字化を目指し、歳出見直しを実施（経済↓ 防衛→ 財政↑）",e:-10,d:0,f:15},
    {label:"成長志向の財政政策を維持し、債務はGDP成長で相殺（経済↑ 防衛→ 財政↓）",e:10,d:0,f:-10},
    {label:"バランスの取れたアプローチ：中程度の財政統合と成長投資（経済→ 防衛→ 財政→）",e:0,d:0,f:0}
  ]}
];
function initG7(){g7={econ:50,def:50,fiscal:50,turn:1};document.getElementById('g7-result').style.display='none';document.getElementById('g7-event').style.display='block';renderG7();}
function renderG7(){
  document.getElementById('g7-turn').textContent=g7.turn;
  setBar('g7-econ',g7.econ);setBar('g7-def',g7.def);setBar('g7-fiscal',g7.fiscal);
  document.getElementById('g7-econ').textContent=g7.econ;
  document.getElementById('g7-def').textContent=g7.def;
  document.getElementById('g7-fiscal').textContent=g7.fiscal;
  const ev=g7events[g7.turn-1];
  document.getElementById('g7-event').textContent=ev.text;
  const cdiv=document.getElementById('g7-choices');cdiv.innerHTML='';
  ev.choices.forEach((c,i)=>{const btn=document.createElement('button');btn.textContent=c.label;btn.className='card';btn.onclick=()=>g7choose(i);cdiv.appendChild(btn);});
}
function setBar(id,val){document.getElementById(id+'-bar').style.width=Math.max(0,Math.min(100,val))+'%';}
function g7choose(i){
  const c=g7events[g7.turn-1].choices[i];
  g7.econ=Math.max(0,Math.min(100,g7.econ+c.e));
  g7.def=Math.max(0,Math.min(100,g7.def+c.d));
  g7.fiscal=Math.max(0,Math.min(100,g7.fiscal+c.f));
  g7.turn++;
  if(g7.turn>6){g7end();}else{renderG7();}
}
function g7end(){
  document.getElementById('g7-choices').innerHTML='';
  document.getElementById('g7-event').style.display='none';
  const res=document.getElementById('g7-result');res.style.display='block';
  let txt='';
  // 評価：経済成長が高いほど良い、防衛力も高いほど良いが、バランスが重要。財政は50が理想（債務対GDP適正）。
  const econScore=g7.econ;
  const defScore=g7.def;
  const fiscalScore=100-Math.abs(g7.fiscal-50);
  const total=(econScore+defScore+fiscalScore)/3;
  if(total>=80){
    txt='【優秀】経済成長、防衛力、財政健全性のバランスが取れている。持続可能な安全保障型成長を達成した。';
  }else if(total>=60){
    txt='【良好】概ねバランスが取れているが、一部の指標で改善の余地がある。例えば、財政規律または防衛力の強化が望まれる。';
  }else{
    txt='【改善必要】政策の偏りが顕著で、長期的な持続可能性に懸念が残る。バランスの取れた政策選択が求められる。';
  }
  txt+='\n\n最終スコア：経済成長'+g7.econ+' / 防衛力'+g7.def+' / 財政'+g7.fiscal;
  document.getElementById('g7-result-text').textContent=txt;
}