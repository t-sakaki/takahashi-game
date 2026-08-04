// Game 5: 円の錬金術師
let g5 = { demand: 50, supply: 50, price: 50, turn: 1, regime: '金本位制' };
const g5materials = [
  { name: '金', d: 0, s: 10, p: 15, desc: '金本位制では強力だが、金がないと使えない' },
  { name: '政府支出（債券）', d: 15, s: 5, p: -5, desc: '需要を刺激するが、財政圧力あり' },
  { name: '銀行貸出（信用）', d: 10, s: 10, p: 0, desc: '金本位制では弱いが、管理通貨制で強化' },
  { name: '輸出促進', d: 5, s: 15, p: -5, desc: '供給力向上だが、為替リスクあり' },
  { name: '労働力投入', d: 0, s: 20, p: 5, desc: '生産能力を大きく向上' },
  { name: '緊縮財政', d: -10, s: -5, p: 15, desc: '物価安定だが、需要が落ちる' }
];
function initG5(){g5={demand:50,supply:50,price:50,turn:1,regime:'金本位制'};document.getElementById('g5-result').style.display='none';renderG5();}
function renderG5(){
  document.getElementById('g5-turn').textContent=g5.turn;
  setBar('g5-demand',g5.demand);setBar('g5-supply',g5.supply);setBar('g5-price',g5.price);
  document.getElementById('g5-demand').textContent=g5.demand;
  document.getElementById('g5-supply').textContent=g5.supply;
  document.getElementById('g5-price').textContent=g5.price;
  const regimeText = '現在の制度：'+g5.regime+(g5.regime==='金本位制'?'（金がないと「金」カードが使えない）':'（信用だけで全てのカードが使える）');
  document.getElementById('g5-regime').textContent=regimeText;
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(regimeText);
    utter.lang = 'ja-JP';
    window.speechSynthesis.speak(utter);
  }
  const mdiv=document.getElementById('g5-materials');mdiv.innerHTML='';
  g5materials.forEach((m,i)=> {
    const disabled=(m.name==='金'&&g5.regime==='金本位制'&&g5.price<30);
    const btn=document.createElement('button');
    btn.style.cssText='padding:12px;border:1px solid #ddd;border-radius:10px;background:'+(disabled?'#f0f0f0':'#fff')+';cursor:'+(disabled?'not-allowed':'pointer')+';text-align:left;flex:1;min-width:140px;font-size:13px;';
    btn.innerHTML='<div style=\"font-weight:500;margin-bottom:4px;\">'+m.name+'</div><div style=\"font-size:11px;color:#888;margin-bottom:4px;\">'+m.desc+'</div><div style=\"font-size:12px;\">需要'+(m.d>=0?'+':'')+m.d+' 供給'+(m.s>=0?'+':'')+m.s+' 物価'+(m.p>=0?'+':'')+m.p+'</div>';
    if(!disabled){btn.onclick=()=>g5use(i);}
    mdiv.appendChild(btn);
  });
}
function g5use(i){
  const m=g5materials[i];
  g5.demand=Math.max(0,Math.min(100,g5.demand+m.d));
  g5.supply=Math.max(0,Math.min(100,g5.supply+m.s));
  g5.price=Math.max(0,Math.min(100,g5.price+m.p));
  g5.turn++;
  if(g5.turn===3){
    g5.regime='管理通貨制';
    const notice=document.createElement('div');notice.className='notice';
    notice.textContent='【制度変更】1931年、金輸出禁止が施行され、日本は管理通貨制に移行！「金」の制約が消え、「信用」だけで政策が動くようになった。';
    const parent=document.getElementById('game5');parent.insertBefore(notice,document.getElementById('g5-materials'));
    setTimeout(()=>{if(notice.parentNode)notice.parentNode.removeChild(notice);},4000);
  }
  if(g5.turn>5){g5end();}else{renderG5();}
}
function g5end(){
  document.getElementById('g5-materials').innerHTML='';
  const res=document.getElementById('g5-result');res.style.display='block';
  let txt='';
  const balance=Math.abs(g5.demand-g5.supply)+Math.abs(g5.price-50);
  if(balance<30){txt='【繁栄】需要・供給・物価の三バランスが整った。高橋が目指した「円の錬金」は成功した。最終：需要'+g5.demand+' 供給'+g5.supply+' 物価'+g5.price;}
  else if(balance<60){txt='【小康】一部の不均衡は残ったが、国家は破滅を回避した。さらなる政策調整が必要だ。最終：需要'+g5.demand+' 供給'+g5.supply+' 物価'+g5.price;}
  else{txt='【混乱】三バランスが大きく崩れた。インフレかデフレか、どちらかの危機が深刻化している。最終：需要'+g5.demand+' 供給'+g5.supply+' 物価'+g5.price;}
  document.getElementById('g5-result-text').textContent=txt;
}