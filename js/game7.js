// Game 7: 高市早苗政権経済シミュレーション
let g7 = { econ: 50, def: 50, fiscal: 50, turn: 1 };
const g7events = [
  {t:1,text:"2024年 円安が進行中。輸出は好調だが、輸入物価上昇が家計を圧迫している。",choices:[
    {label:"為替介入で円買い、円高に転じさせる（短期的円高、輸出↓、財政支出増）",e:-5,d:0,f:-5},
    {label:"円安を容認し、輸出促進策を強化（経済↑、財政↓）",e:10,d:0,f:-5},
    {label:"市場に任せ、様子を見守る（変化なし）",e:0,d:0,f:0}
  ]},
  {t:2,text:"2025年 食品消費税の増税案が浮上。財源確保のためだが、家計負担が懸念される。",choices:[
    {label:"増税を実施し、財政基盤を強化（財政↑↑、経済↓）",e:-5,d:0,f:15},
    {label:"軽減税率を適用し、影響を緩和（財政↑、経済↓）",e:-2,d:0,f:5},
    {label:"増税を見送り、代わりに歳出構造改革で対応（財政↑、経済↓）",e:-2,d:0,f:5}
  ]},
  {t:3,text:"2026年 日米協調介入が議論される。為替市場の過度な変動を抑えるためだ。",choices:[
    {label:"米国と協調し円買い介入（円高、輸出不振、介入コスト）",e:-8,d:0,f:-2},
    {label:"米国と協調し円売り介入（円安、輸出好調、インフレリスク）",e:8,d:0,f:-2},
    {label:"介入を見合わせ、市場の自律に任せる（変化なし）",e:0,d:0,f:0}
  ]},
  {t:4,text:"2027年 防衛費の増額が求められる中、財政健全性とのバランスが課題に。",choices:[
    {label:"防衛予算を大幅増額し、最新鋭装備を導入（防衛↑↑、財政↓↓、経済→）",e:0,d:20,f:-20},
    {label:"防衛と経済の両立を目指し、デュアルユース技術に投資（防衛↑、経済↑、財政↓）",e:10,d:10,f:-10},
    {label:"現水準を維持し、効率化と改革に注力（変化なし）",e:0,d:0,f:0}
  ]},
  {t:5,text:"2028年 中長期成長戦略が鍵。イノベーションと人材への投資が求められる。",choices:[
    {label:"スタートアップ支援・研究開発税制を拡充（経済↑↑、財政↓）",e:20,d:0,f:-10},
    {label:"人材育成とリスキリングに重点（経済↑、財政↓）",e:10,d:0,f:-5},
    {label:"現在の政策を維持し、様子を見る（変化なし）",e:0,d:0,f:0}
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