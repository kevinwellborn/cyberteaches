// Draws rover maps for teacher resources. Usage: <div class="board" data-map="#####|#S.*#|#####" data-dir="1"></div>
// Map legend matches the game: # rock, . sand, S rover start, * crystal, G flag. dir: 0 up, 1 right, 2 down, 3 left.
// data-blank="1" draws an empty grid for students to design on.
(function(){
  const ROVER='<svg viewBox="0 0 40 40" aria-label="rover"><rect x="6" y="9" width="7" height="23" rx="3.5" fill="var(--wheel)"/><rect x="27" y="9" width="7" height="23" rx="3.5" fill="var(--wheel)"/><rect x="10.5" y="10" width="19" height="22" rx="5.5" fill="var(--rover)" stroke="var(--wheel)" stroke-width="1.5"/><circle cx="20" cy="16" r="4.4" fill="#fff"/><circle cx="20" cy="15" r="2.2" fill="var(--eye)"/><path d="M20 2.5 25 8.5H15z" fill="var(--rover)" stroke="var(--wheel)" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  const GEM='<svg viewBox="0 0 24 24" aria-label="crystal"><path d="M12 2 L20 9 L12 22 L4 9Z" fill="var(--gem)"/><path d="M12 2 L15.5 9 L12 22 L8.5 9Z" fill="var(--gem-hi)"/></svg>';
  const ENEMY='<svg viewBox="0 0 40 40" aria-label="enemy tank"><rect x="5" y="8" width="8" height="26" rx="3" fill="var(--wheel)"/><rect x="27" y="8" width="8" height="26" rx="3" fill="var(--wheel)"/><rect x="9.5" y="11" width="21" height="21" rx="4" fill="var(--enemy)" stroke="var(--wheel)" stroke-width="1.5"/><rect x="17.5" y="1" width="5" height="16" rx="1.5" fill="var(--wheel)"/><circle cx="20" cy="21.5" r="6" fill="var(--enemy-2)" stroke="var(--wheel)" stroke-width="1.5"/></svg>';
  const TANKDIR={'^':0,'>':1,'v':2,'<':3};
  const ARMED=ROVER.replace('<path d="M20 2.5 25 8.5H15z" fill="var(--rover)" stroke="var(--wheel)" stroke-width="1.5" stroke-linejoin="round"/>','<rect x="17.8" y="0.5" width="4.4" height="13" rx="1.4" fill="var(--wheel)"/>');
  const FLAG='<svg viewBox="0 0 24 24" aria-label="flag"><path d="M6 3v18" stroke="var(--wheel)" stroke-width="2"/><path d="M7 4h11l-3 4 3 4H7z" fill="#D9443C"/></svg>';
  function drawBoards(root){ (root||document).querySelectorAll('.board[data-map]').forEach(b=>{
    if(b.dataset.drawn) return; b.dataset.drawn='1';
    const rows=b.dataset.map.split('|'), dir=+(b.dataset.dir||1);
    b.style.gridTemplateColumns=`repeat(${rows[0].length},var(--cell))`;
    if(b.dataset.cell) b.style.setProperty('--cell',b.dataset.cell);
    rows.forEach((r,y)=>[...r].forEach((ch,x)=>{
      const c=document.createElement('div'); c.className='c';
      if(ch==='#') c.classList.add('rock'); else if((x+y)%2) c.classList.add('alt');
      if(ch==='*') c.innerHTML=GEM;
      if(ch==='G') c.innerHTML=FLAG;
      if(ch in TANKDIR){ c.classList.add('rover'); c.innerHTML=ENEMY; c.firstChild.style.transform=`rotate(${TANKDIR[ch]*90}deg)` }
      if(ch==='S'){ c.classList.add('rover'); c.innerHTML=/[\^>v<]/.test(b.dataset.map)?ARMED:ROVER; c.firstChild.style.transform=`rotate(${dir*90}deg)` }
      b.appendChild(c);
    }));
    b.setAttribute('role','img');
    if(!b.getAttribute('aria-label')) b.setAttribute('aria-label','Rover map');
    // on narrow screens, shrink cells so the board fits beside its question number
    if(!b.closest('.slide') && innerWidth<640){ const cols=rows[0].length, room=innerWidth-110;
      const cur=parseFloat(getComputedStyle(b).getPropertyValue('--cell'))||44;
      if(cols*(cur+3)+12>room) b.style.setProperty('--cell',Math.max(16,Math.floor((room-12)/cols)-3)+'px') }
   }) }
  window.drawBoards=drawBoards; drawBoards();
})();
// Printed worksheets: shrink a page's content if it would spill onto a second sheet (11in = 1056px).
(function(){
  const pages=()=>[...document.querySelectorAll('.page')].filter(p=>p.closest('body') && getComputedStyle(p).minHeight!=='0px');
  function fitPages(force){ const print=force===true||matchMedia('print').matches;
    pages().forEach(p=>{ const kids=[...p.children]; kids.forEach(k=>k.style.zoom='');
      if(!print) return; const top=p.getBoundingClientRect().top, pad=parseFloat(getComputedStyle(p).paddingBottom)||0;
      const need=()=>Math.max(...kids.map(k=>k.getBoundingClientRect().bottom))-top+pad;
      let z=1; while(z>0.7 && need()>1050){ z-=0.03; kids.forEach(k=>k.style.zoom=z) } }) }
  const mq=matchMedia('print'); (mq.addEventListener?mq.addEventListener('change',()=>fitPages()):mq.addListener(()=>fitPages()));
  addEventListener('beforeprint',()=>{ fitPages(matchMedia('print').matches||true) }); addEventListener('afterprint',()=>fitPages());
  window.fitPages=fitPages; fitPages(); if(document.fonts) document.fonts.ready.then(()=>fitPages());
})();
