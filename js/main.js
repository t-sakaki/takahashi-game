// Shared utility functions
function hideAll() {
  ['menu','game1','game2','game3','game4','game5','game6','game7'].forEach(id=>document.getElementById(id).style.display='none');
}
function show(id){
  document.getElementById(id).style.display='block';
}
function backToMenu(){
  hideAll();
  show('menu');
}
function startGame(n){
  hideAll();
  show('game'+n);
  if(n===1) initG1();
  if(n===2) initG2();
  if(n===3) initG3();
  if(n===4) initG4();
  if(n===5) initG5();
  if(n===6) initG6();
  if(n===7) initG7();
}
function setBar(id,val){
  const el=document.getElementById(id+'-bar');
  if(el) el.style.width=Math.max(0,Math.min(100,val))+'%';
}