// Slide engine for teacher resources: arrow keys or click, reveal steps, N notes, F full screen.
const slides=[...document.querySelectorAll('.slide')]; let i=0;
function fit(){ const s=Math.min(innerWidth/1280, innerHeight/720); slides.forEach(sl=>sl.style.transform=`translate(-50%,-50%) scale(${s})`) }
function show(n){ i=Math.max(0,Math.min(slides.length-1,n)); slides.forEach((s,k)=>s.classList.toggle('on',k===i));
  document.getElementById('num').textContent=(i+1)+' / '+slides.length;
  const note=slides[i].querySelector('.note'); document.getElementById('noteText').textContent=note?note.textContent:'';
  try{ history.replaceState(null,'','#'+(i+1)) }catch(e){} }
function next(){ const r=slides[i].querySelector('.reveal:not(.shown)'); if(r){ r.classList.add('shown'); return } show(i+1) }
function prev(){ const r=[...slides[i].querySelectorAll('.reveal.shown')].pop(); if(r){ r.classList.remove('shown'); return } show(i-1) }
addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){ e.preventDefault(); next() }
  else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){ e.preventDefault(); prev() }
  else if(e.key==='n'||e.key==='N') document.getElementById('notes').classList.toggle('on');
  else if(e.key==='f'||e.key==='F') full();
  else if(e.key==='Home') show(0); else if(e.key==='End') show(slides.length-1);
});
function full(){ const d=document.documentElement; document.fullscreenElement?document.exitFullscreen():(d.requestFullscreen||d.webkitRequestFullscreen||(()=>{})).call(d) }
document.getElementById('next').onclick=next; document.getElementById('prev').onclick=prev;
document.getElementById('nBtn').onclick=()=>document.getElementById('notes').classList.toggle('on');
document.getElementById('fBtn').onclick=full;
document.getElementById('deck').addEventListener('click',e=>{ if(e.target.closest('a,button')) return; e.clientX>innerWidth/3?next():prev() });
// shrink the content of any slide that is too tall for 1280x720
function autosize(){ slides.forEach(sl=>{ const kids=[...sl.children].filter(c=>!c.matches('.kicker,h1,h2,.note,.foot,.label'));
  if(!kids.length) return; const was=sl.classList.contains('on'); sl.classList.add('on');
  const over=()=>sl.scrollHeight>sl.clientHeight+1||sl.scrollWidth>sl.clientWidth+1;
  const progs=[...sl.querySelectorAll('.prog')]; [...progs,...kids].forEach(c=>c.style.zoom='');
  let z=1; while(progs.length && z>0.6 && over()){ z-=0.04; progs.forEach(c=>c.style.zoom=z) }
  z=1; while(z>0.5 && over()){ z-=0.04; kids.forEach(c=>c.style.zoom=z) }
  if(!was) sl.classList.remove('on') }) }
autosize(); if(document.fonts) document.fonts.ready.then(autosize);
addEventListener('resize',fit); fit(); show((+location.hash.slice(1)||1)-1);
