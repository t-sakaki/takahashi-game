// Game 7: 高市早苗政権経済シミュレーション
let g7 = { econ: 50, def: 50, fiscal: 50, turn: 1 };
const g7events = [
  {t:1,text:"2024年 世界経済は緩やかな回復だが、地政学的緊張が高まっている。防衛力の強化が求められている。",choices:[
    {label:"防衛費を増額し、先進装備の調達を加速（防衛↑ 財政↓ 経済→）",e:0,d:15,f:-10},
    {label:"経済成長に重点を置き、産業革新投資を拡大（経済↑ 防衛→ 財政↓）",e:15,d:0,f:-10},
    {label:"バランスの取れたアプローチ：中程度の防衛増強と成長投資（経済↑ 防衛↑ 財政↓↓）",e:10,d:10,f:-15}
  ]},
  {t:2,text:"2025年 IMFが債務対GDP比の上昇を警告。防衛費の増加が財政持続可能性に影響を与える可能性。",choices:[
    {label:"防衛費の増加を一時停止し、財政再建に専念（経済→ 防衛↓ 財政↑）",e:0,d:-10,f:15},
    {label:"効率的な防衛投資にシフトし、研究開発に重点（防衛→ 経済→ 財政→）",e:0,d:5,f:0},
    {label:"成長戦略的な防衛協力（同盟共同訓練など）でコスト抑制（防衛↑ 経済↑ 財政→）",e:5,d:10,f:0}
  ]},
  {t:3,text:"2026年 物価上圧力が顕在化。エネルギー・食料価格の上昇が家計を圧迫。",choices:[
    {label:"目標物価安定のために金融政策を引き締め（経済↓ 防衛→ インフレ的要因↓）",e:-10,d:0,f:0},
    {label:"所得補填・給付金で家計を支援（経済↑ 防衛→ 財政↓）",e:10,d:0,f:-10},
    {label:"供給側対策（エネルギー転換・生産性向上）でコスト抑制（経済↑ 防衛→ 財政→）",e:10,d:0,f:0}
  ]},
  {t:4,text:"2027年 防衛ニーズがさらに高まる。長距離ミサイル・サイバー防衛への投資が必要。",choices:[
    {label:"防衛予算を大幅増額し、最新鋭装備を導入（防衛↑↑ 財政↓↓ 経済→）",e:0,d:20,f:-20},
    {label:"防衛と経済の両立を目指し、デュアルユース技術に投資（防衛↑ 経済↑ 財政↓）",e:10,d:10,f:-10},
    {label:"現在の水準を維持し、効率化と改革に注力（防衛→ 経済→ 財政→）",e:0,d:0,f:0}
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