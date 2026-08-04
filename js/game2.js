// Game 2: 二・二六 4:40AM
let g2={mad:30,shake:20,hope:10,scene:0};
const g2scenes=[
  {text:"4:30AM。官邸の廊下に重い足音が近づく。青年将校・安藤輝三大尉が寝室の扉を開けた。「高橋是清、覚悟はいいか。」",choices:[
    {label:"「私は天皇陛下の忠臣だ。卿らこそ覚悟を決めよ。」（強気）",m:10,s:5,h:0},
    {label:"「待て、話を聞かせてくれ。卿らの祖国はどこだ？」（懐柔）",m:-5,s:10,h:10},
    {label:"「印鑑は机の引き出しにある。好きに使え。」（譲歩）",m:-10,s:15,h:-5}
  ]},
  {text:"安藤は一瞬動揺したが、すぐに銃口を突きつける。「財政緊縮で軍を苦しめたのはお前だ。」",choices:[
    {label:"「緊縮ではない。日本の未来のための投資だ。」（反論）",m:15,s:0,h:5},
    {label:"「卿らの故郷の農村は今、国債で救われている。調べてみよ。」（事実）",m:-10,s:5,h:15},
    {label:"「軍事費を増やす約束をしよう。明日から実行する。」（約束）",m:-15,s:20,h:0}
  ]},
  {text:"廊下に他の将校の声がする。「安藤、時間がない。」安藤の目が血走り、銃の引き金に指をかける。",choices:[
    {label:"「卿らの親友がこの先で死ぬぞ。私を殺せば、卿らも死ぬ。」（脅し）",m:20,s:-5,h:5},
    {label:"「天皇陛下は卿らの行為を望んでおられない。」（天皇）",m:-20,s:10,h:20},
    {label:"「私の財産はすべて卿らにやる。家族を頼む。」（懇願）",m:-10,s:15,h:-10}
  ]},
  {text:"安藤の手が震えている。「黙れ…黙れ…」彼の精神は限界に近い。これが最後のチャンスだ。",choices:[
    {label:"「卿らは日本の誇りだ。だが、この方法では日本が滅ぶ。」（説得）",m:-15,s:10,h:20},
    {label:"「撃て。だが、歴史は卿らを『反乱軍』と記すぞ。」（覚悟）",m:25,s:-10,h:0},
    {label:"「私もかつては卿らのように国を思った。一緒に考えよう。」（共感）",m:-20,s:20,h:25}
  ]},
  {text:"最後の瞬間。安藤の瞳に涙が浮かぶ。「高橋…お前は…」",choices:[
    {label:"「私は卿らを恨まない。日本のために生きてくれ。」（慈悲）",m:-30,s:10,h:30},
    {label:"「遅い。もう遅い。」（諦め）",m:10,s:10,h:-20},
    {label:"「卿らの上官はすでに鎮圧に動いている。無駄だ。」（情報）",m:15,s:-15,h:10}
  ]}
];
function initG2(){g2={mad:30,shake:20,hope:10,scene:0};document.getElementById('g2-result').style.display='none';document.getElementById('g2-scene').style.display='block';document.getElementById('g2-time').textContent='4:30';renderG2();}
function renderG2(){
  document.getElementById('g2-mad').textContent=g2.mad;
  document.getElementById('g2-shake').textContent=g2.shake;
  document.getElementById('g2-hope').textContent=g2.hope;
  const sc=g2scenes[g2.scene];
  document.getElementById('g2-scene').textContent=sc.text;
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(sc.text);
    utter.lang = 'ja-JP';
    window.speechSynthesis.speak(utter);
  }
  const cdiv=document.getElementById('g2-choices');cdiv.innerHTML='';
  sc.choices.forEach((c,i)=>{const btn=document.createElement('button');btn.textContent=c.label;btn.className='card';btn.onclick=()=>g2choose(i);cdiv.appendChild(btn);});
}
function g2choose(i){
  const c=g2scenes[g2.scene].choices[i];
  g2.mad=Math.max(0,g2.mad+c.m);g2.shake=Math.max(0,g2.shake+c.s);g2.hope=Math.max(0,g2.hope+c.h);
  g2.scene++;
  const times=['4:32','4:35','4:37','4:39','4:40'];
  document.getElementById('g2-time').textContent=times[Math.min(g2.scene,4)];
  if(g2.scene>=5||g2.mad>=100){g2end();}else{renderG2();}
}
function g2end(){
  document.getElementById('g2-choices').innerHTML='';
  document.getElementById('g2-scene').style.display='none';
  const res=document.getElementById('g2-result');res.style.display='block';
  let txt='';
  if(g2.mad>=100){txt='【史実通り】安藤輝三の狂気が臨界点を超えた。銃声が響き、高橋是清は倒れた。彼の最期の言葉は聞き取れなかった。';}
  else if(g2.hope>=40&&g2.mad<60){txt='【IFルート】あなたの説得が安藤の心に届いた。安藤は銃を下ろし、同僚を引き止めた。高橋は重傷を負ったが生還した。しかし、事件そのものは他の場所で発生し、日本の歴史は大きく変わった。';}
  else if(g2.shake>=50){txt='【葛藤ルート】安藤は激しく動揺したが、最終的に命令を実行した。高橋は刺されたが、致命傷は免れた。後に「奇跡の生還」として語り継がれた。';}
  else{txt='【史実通り】高橋は最後まで財政規律を貫いた。青年将校たちは彼を「国賊」と断じ、銃剣で突き刺した。彼の死は、軍部独裁への道を開く悲劇となった。';}
  document.getElementById('g2-result-text').textContent=txt;
}