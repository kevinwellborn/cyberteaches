// Draws rover maps for teacher resources. Usage: <div class="board" data-map="#####|#S.*#|#####" data-dir="1"></div>
// Map legend matches the game: # rock, . sand, S rover start, * crystal, G flag. dir: 0 up, 1 right, 2 down, 3 left.
// data-blank="1" draws an empty grid for students to design on.
(function(){
  const ROVER='<svg viewBox="0 0 40 40" aria-label="rover"><rect x="6" y="9" width="7" height="23" rx="3.5" fill="var(--wheel)"/><rect x="27" y="9" width="7" height="23" rx="3.5" fill="var(--wheel)"/><rect x="10.5" y="10" width="19" height="22" rx="5.5" fill="var(--rover)" stroke="var(--wheel)" stroke-width="1.5"/><circle cx="20" cy="16" r="4.4" fill="#fff"/><circle cx="20" cy="15" r="2.2" fill="var(--eye)"/><path d="M20 2.5 25 8.5H15z" fill="var(--rover)" stroke="var(--wheel)" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  const GEM='<svg viewBox="0 0 24 24" aria-label="crystal"><path d="M12 2 L20 9 L12 22 L4 9Z" fill="var(--gem)"/><path d="M12 2 L15.5 9 L12 22 L8.5 9Z" fill="var(--gem-hi)"/></svg>';
  const FLAG='<svg viewBox="0 0 24 24" aria-label="flag"><path d="M6 3v18" stroke="var(--wheel)" stroke-width="2"/><path d="M7 4h11l-3 4 3 4H7z" fill="#D9443C"/></svg>';
  document.querySelectorAll('.board[data-map]').forEach(b=>{
    const rows=b.dataset.map.split('|'), dir=+(b.dataset.dir||1);
    b.style.gridTemplateColumns=`repeat(${rows[0].length},var(--cell))`;
    if(b.dataset.cell) b.style.setProperty('--cell',b.dataset.cell);
    rows.forEach((r,y)=>[...r].forEach((ch,x)=>{
      const c=document.createElement('div'); c.className='c';
      if(ch==='#') c.classList.add('rock'); else if((x+y)%2) c.classList.add('alt');
      if(ch==='*') c.innerHTML=GEM;
      if(ch==='G') c.innerHTML=FLAG;
      if(ch==='S'){ c.classList.add('rover'); c.innerHTML=ROVER; c.firstChild.style.transform=`rotate(${dir*90}deg)` }
      b.appendChild(c);
    }));
    b.setAttribute('role','img');
    if(!b.getAttribute('aria-label')) b.setAttribute('aria-label','Rover map');
  });
})();
