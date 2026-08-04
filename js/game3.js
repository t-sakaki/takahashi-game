// Game 3: 金と円と艦と —Takahashi's Ledger—
let g3={money:0,target:30,gold:3,round:1,deck:[],hand:[],goldStandard:true};
const g3eras=[
  {name:"日清戦争（1894）",target:20,text:"戦費調達が必要。金本位制下では金保有量がないと強力なカードが使えない。"},
  {name:"日露戦争（1904）",target:35,text:"巨額の外債発行。国際市場の信用が鍵となる。"},
  {name:"関東大震災（1923）",target:25,text:"震災手形の処理。緊急の資金需要だが、金保有量が制約となる。"},
  {name:"世界大恐慌（1931）",target:30,text:"金輸出禁止！金本位制が終わり、管理通貨制へ。金の制約が消え、「信用」だけでカードが使えるように。"},
  {name:"高橋財政（1934）",target:40,text:"デフレ脱却のための大胆な財政出動。金の制約がない分、コンボが炸裂する。"}
];
function initG3(){g3={money:0,target:g3eras[0].target,gold:3,round:1,deck:makeDeck(),hand:[],goldStandard:true};document.getElementById('g3-result').style.display='none';drawHand();renderG3();}
function makeDeck(){let d=[];for(let i=0;i<8;i++)d.push({type:'外債',val:5,cost:0,needGold:false,desc:'金利低いが主権リスクあり'});for(let i=0;i<6;i++)d.push({type:'内債',val:4,cost:0,needGold:false,desc:'調達力高いがインフレリスク'});for(let i=0;i<4;i++)d.push({type:'緊縮',val:-2,cost:0,needGold:false,desc:'財政健全だが景気後退'});for(let i=0;i<3;i++)d.push({type:'金本位融資',val:12,cost:0,needGold:true,desc:'金が必要な強力カード'});return shuffle(d);}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function drawHand(){g3.hand=[];for(let i=0;i<4;i++){if(g3.deck.length===0)g3.deck=shuffle(makeDeck());g3.hand.push(g3.deck.pop());}}
function renderG3(){
  document.getElementById('g3-round').textContent=g3.round;
  document.getElementById('g3-money').textContent=g3.money;
  document.getElementById('g3-target').textContent=g3.target;
  document.getElementById('g3-gold').textContent=g3.gold;
  const era=g3eras[g3.round-1];
  document.getElementById('g3-era').textContent=era.name+'：'+era.text;
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(era.name+'：'+era.text);
    utter.lang = 'ja-JP';
    window.speechSynthesis.speak(utter);
  }
  const hdiv=document.getElementById('g3-hand');hdiv.innerHTML='';
  g3.hand.forEach((c,i)=> {
    const disabled=(c.needGold&&g3.gold<=0&&g3.goldStandard);
    const btn=document.createElement('button');
    btn.style.cssText='padding:12px;border:1px solid #ddd;border-radius:10px;background:'+(disabled?'#f0f0f0':'#fff')+';cursor:'+(disabled?'not-allowed':'pointer')+';text-align:left;flex:1;min-width:120px;font-size:13px;';
    btn.innerHTML='<div style=\"font-weight:500;margin-bottom:4px;\">'+c.type+'</div><div style=\"font-size:20px;font-weight:500;margin-bottom:4px;\">'+(c.val>0?'+':'')+c.val+'</div><div style=\"font-size:11px;color:#888;\">'+c.desc+'</div>';
    if(!disabled){btn.onclick=()=>g3play(i);}
    hdiv.appendChild(btn);
  });
}
function g3play(i){
  const c=g3.hand[i];
  if(c.needGold&&g3.goldStandard)g3.gold--;
  g3.money+=c.val;g3.hand.splice(i,1);
  if(g3.hand.length===0){
    g3.round++;
    if(g3.round===4){g3.goldStandard=false;g3.gold=99;}
    if(g3.round>5){g3end();return;}
    g3.target=g3eras[g3.round-1].target;drawHand();
  }
  renderG3();
}
function g3end(){
  document.getElementById('g3-hand').innerHTML='';
  const res=document.getElementById('g3-result');res.style.display='block';
  let txt='';
  if(g3.money>=g3eras[4].target){txt='【成功】あなたは各時代の危機を乗り越え、高橋財政を達成した。金本位制の解除がもたらした「信用の自由」は、デフレ脱却への道を開いた。最終資金：'+g3.money;}
  else if(g3.money>=100){txt='【部分的成功】多くの危機を乗り越えたが、最後の高橋財政までの資金が不足した。しかし、金輸出禁止の効果は確かなものだった。最終資金：'+g3.money;}
  else{txt='【失敗】金本位制の制約に縛られ、資金調達が追いつかなかった。日本はデフレのまま軍部の台頭を許すことになった。最終資金：'+g3.money;}
  document.getElementById('g3-result-text').textContent=txt;
}