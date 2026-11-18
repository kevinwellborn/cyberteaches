// Flag Race: 2 to 4 classmates get the same brand-new map and a limited number of blocks.
// The first rover to reach the flag wins the race and earns all the race stars: 1 for every player in the race (up to 4).
// Nobody loses anything. Race stars have their own scoreboard and never change lesson stars, scores or grades.
// The teacher turns Flag Race on or off per class (classes/{code}.races). Firestore:
//   classes/{code}/races/{id}      one race room: players (max 4), names, seed (the map), state waiting|playing, winner
//   classes/{code}/raceBoard/{uid} a student's race stars and wins
// Uses helpers from duel.js (makeDuelPuzzle, FV_, duelName, mmss, tsMs) and the board, blocks and interpreter in index.html.
const RACE_SECONDS = 180, RACE_MAX = 4, RACE_COUNTDOWN = 20;
const RACE_CUTOFF = 190;        // read the final result this long after the start (3 min + a little for slow networks; the rules allow 210 s)
const RACE_STALE = 100000;      // a waiting room not refreshed for this long is treated as abandoned
const RACE_SLACK = {easy:3, medium:2, hard:2};   // blocks allowed above our own solution
const RSTAR = '⭐';
// Each racer drives their own color, by their spot in the room (1st orange, 2nd blue, 3rd green, 4th purple).
const RACE_COLORS = [{name:'Orange', c:'#F2A93B'}, {name:'Blue', c:'#3D8BFD'}, {name:'Green', c:'#2DB36F'}, {name:'Purple', c:'#A066E8'}];
const raceColor = i => RACE_COLORS[i % RACE_COLORS.length];
const miniRover = (i, cls='race-car') => `<span class="${cls}" style="--rover:${raceColor(i).c}">${ROVER_SVG}</span>`;

let race=null;          // the race on screen: {code, id, me, data, puzzle, localStart, timer, over}
let raceWait=null;      // in the waiting room: {code, id, data, stop, beat, merge, tick, countEnd}
let raceBoardStop=null;
const raceCol=code=>Cloud.db.collection('classes').doc(code).collection('races');
const rRowRef=(code,uid)=>Cloud.db.collection('classes').doc(code).collection('raceBoard').doc(uid);

// The race map: a duel map without crystals, with a block limit so students have to find the repeat.
function makeRacePuzzle(seed, level){
  const P=makeDuelPuzzle(seed, level, {noGems:true});
  const map=P.map.map(r=>r.replace(/\*/g,'.'));
  return {...P, map, duel:false, race:true, title:'Flag Race', ideal:P.ideal, maxBlocks:P.ideal+(RACE_SLACK[level]||2),
    blocks:['forward','left','right','repeat'],
    goal:`Be the first rover to reach the flag. You can use up to ${P.ideal+(RACE_SLACK[level]||2)} blocks.`,
    hint:'Look for the part of the path that happens again and again, and put it inside a repeat block.'};
}

async function myRaceRow(code){
  const ref=rRowRef(code, Cloud.user.uid), s=await ref.get();
  if(s.exists) return s.data();
  const row={name:duelName(), stars:0, wins:0, lastRace:'', updatedAt:FV_().serverTimestamp()};
  await ref.set(row); return row;
}

function raceTop(){ const top=$('#topRight'); top.innerHTML=''; const b=h('button','btn','Course map'); b.onclick=()=>{ location.hash='home' }; top.appendChild(b) }

// ---------- lobby ----------
async function showRace(){
  if(race || raceWait) return;      // already racing or waiting: a lock or level refresh must not rebuild the page
  if(window.Sfx) Sfx.music(false);
  raceTop(); applyLevelTheme(curLevel);
  const app=$('#app'); app.innerHTML='<section class="duel-lobby race-lobby"><p>Loading…</p></section>';
  const box=$('.race-lobby',app);
  if(!Cloud){ box.innerHTML='<h1>Flag Race</h1><p>Flag Race needs sign-in, which is not available here.</p>'; return }
  if(!Cloud.ready) return;          // Cloud.onChange calls showRace again once sign-in is known
  if(!Cloud.user){ box.innerHTML='<h1>🚩 Flag Race</h1><p>Sign in and join your class to race your classmates.</p>'; const b=h('button','btn primary','Sign in'); b.onclick=()=>openSignIn(joinParam); box.appendChild(b); return }
  const code=Cloud.profile&&Cloud.profile.classCode;
  if(!code){ box.innerHTML='<h1>🚩 Flag Race</h1><p>Join your class first. Races are between classmates.</p>'; const b=h('button','btn primary','Join class'); b.onclick=()=>openJoin(joinParam); box.appendChild(b); return }
  let cls=null; try{ cls=await Cloud.restGet('classes/'+code) }catch(e){ try{ cls=await Cloud.findClass(code) }catch(e2){ console.error(e2) } }
  if(location.hash!=='#race') return;
  if(!cls){ box.innerHTML='<h1>🚩 Flag Race</h1><p>Could not reach your class right now. Check your connection and try again.</p>'; return }
  if(!cls.races){ box.innerHTML='<h1>🚩 Flag Race</h1><p>Your teacher has not turned on Flag Race for your class yet. Ask your teacher!</p>'; return }
  let row; try{ row=await myRaceRow(code) }catch(e){ console.error(e); box.innerHTML='<h1>🚩 Flag Race</h1><p>Flag Race is not ready yet (the database rules may need publishing). Try again later.</p>'; return }
  if(location.hash!=='#race' || race || raceWait) return;
  box.innerHTML=`<span class="label">${esc(Cloud.profile.className||code)} · Flag Race</span>
    <h1>🚩 Flag Race</h1>
    <div class="duel-tro"><span class="duel-big">${RSTAR} ${row.stars||0}</span><span>Race stars<small>${row.wins||0} race${row.wins===1?'':'s'} won</small></span></div>
    <ul class="intro-list">
      <li><span>Up to <b>4 classmates</b> get the <b>same new map</b>. The race starts when 4 players are in, or ${RACE_COUNTDOWN} seconds after the second player joins.</span></li>
      <li><span>You can only use a <b>few blocks</b>, so look for the pattern and use a <b>repeat</b>.</span></li>
      <li><span>The <b>first rover to reach the flag</b> wins all the race stars: <b>1 for every player</b> in the race. You have ${RACE_SECONDS/60} minutes.</span></li>
      <li><span>Nobody loses anything. Race stars never change your lesson stars or grade.</span></li>
    </ul>
    <div class="acts" style="justify-content:flex-start" id="raceActs"></div><p class="joinerr" id="raceErr" role="alert"></p>`;
  const acts=$('#raceActs');
  const go=h('button','btn primary','🚩 Join a race'); go.onclick=()=>findRace(code); acts.appendChild(go);
  const sb=h('button','btn','Race scoreboard'); sb.onclick=()=>openRaceBoard(code); acts.appendChild(sb);
}

// ---------- matching ----------
async function findRace(code){
  const err=$('#raceErr'); document.querySelectorAll('#raceActs button').forEach(b=>b.disabled=true);
  if(err) err.textContent='Looking for a race…';
  try{
    const id=await tryJoinRace(code) || await createRace(code);
    waitRoom(code, id);
  }catch(e){ console.error(e); if(err) err.textContent='Could not join a race ('+(e.code||e.message)+'). Try again.'; document.querySelectorAll('#raceActs button').forEach(b=>b.disabled=false) }
}
// Joins the open room with the most players (oldest first). Returns its id, or null.
async function tryJoinRace(code, skipId){
  const me=Cloud.user.uid, snap=await raceCol(code).where('state','==','waiting').get(), now=Date.now();
  const open=snap.docs.filter(d=>d.id!==skipId && !d.data().players.includes(me));
  for(const d of open) if(now-tsMs(d.data().createdAt) > RACE_STALE) d.ref.delete().catch(()=>{});   // left behind by someone who closed the page
  const fresh=open.filter(d=>now-tsMs(d.data().createdAt) <= RACE_STALE && d.data().players.length<RACE_MAX)
    .sort((a,b)=>b.data().players.length-a.data().players.length || (a.id<b.id?-1:1));
  for(const d of fresh){
    try{
      await Cloud.db.runTransaction(async tx=>{
        const s=await tx.get(d.ref), x=s.exists&&s.data();
        if(!x || x.state!=='waiting' || x.players.length>=RACE_MAX || x.players.includes(me)) throw Object.assign(new Error('taken'),{taken:true});
        const players=[...x.players, me], full=players.length===RACE_MAX;
        tx.update(d.ref, {players, ['names.'+me]:duelName(), ...(full?{state:'playing', startedAt:FV_().serverTimestamp()}:{})});
      });
      return d.id;
    }catch(e){ if(!e.taken) console.error(e) }
  }
  return null;
}
async function createRace(code){
  const me=Cloud.user.uid, ref=raceCol(code).doc();
  await ref.set({level:curLevel, seed:Math.floor(Math.random()*2147483647), state:'waiting', players:[me], names:{[me]:duelName()},
    createdAt:FV_().serverTimestamp(), winner:''});
  return ref.id;
}
// Leaves a waiting room: the last player deletes it, anyone else takes their name off.
function leaveRoom(ref, data){
  const me=Cloud.user.uid;
  if(!data || data.players.length<=1) return ref.delete().catch(()=>{});
  return ref.update({players:FV_().arrayRemove(me), ['names.'+me]:FV_().delete()}).catch(()=>{});
}

function waitRoom(code, id){
  const me=Cloud.user.uid, ref=raceCol(code).doc(id);
  const w=raceWait={code, id, data:null, countEnd:0};
  const stopWait=()=>{ if(w.stop) w.stop(); clearInterval(w.beat); clearInterval(w.merge); clearInterval(w.tick); window.removeEventListener('pagehide', w.leave); if(raceWait===w) raceWait=null };
  w.cancel=async()=>{ stopWait(); await leaveRoom(ref, w.data) };
  w.leave=()=>{ leaveRoom(ref, w.data) };
  window.addEventListener('pagehide', w.leave);
  const box=$('.race-lobby');
  if(box) box.innerHTML=`<h1>🚩 Waiting for racers…</h1><div class="race-slots" id="raceSlots"></div><p id="raceCount">Tell your classmates to press <b>Join a race</b> now.</p>
    <div class="acts" style="justify-content:flex-start"><button class="btn primary" id="raceStart" hidden>Start now</button><button class="btn" id="raceCancel">Leave</button></div>`;
  const c=$('#raceCancel'); if(c) c.onclick=async()=>{ await w.cancel(); showRace() };
  const startNow=async()=>{
    const x=w.data; if(!x || x.state!=='waiting' || x.players.length<2) return;
    try{ await ref.update({state:'playing', startedAt:FV_().serverTimestamp()}) }catch(e){ /* someone else started it first */ }
  };
  const sb=$('#raceStart'); if(sb) sb.onclick=()=>{ sb.disabled=true; startNow() };
  const draw=()=>{
    const x=w.data; if(!x) return;
    const slots=$('#raceSlots');
    if(slots) slots.innerHTML=[...Array(RACE_MAX)].map((_,i)=>{ const u=x.players[i];
      return u ? `<div class="race-slot on${u===me?' me':''}" style="--rc:${raceColor(i).c}">${miniRover(i)}<b>${esc(u===me?'You':(x.names||{})[u]||'Racer')}</b><small>${raceColor(i).name}</small></div>`
               : `<div class="race-slot"><span class="race-car race-empty"></span><span>Open spot</span></div>` }).join('');
    const n=x.players.length, cnt=$('#raceCount'), sb=$('#raceStart');
    if(n>=2){ if(!w.countEnd) w.countEnd=Date.now()+RACE_COUNTDOWN*1000 } else w.countEnd=0;
    if(sb) sb.hidden=n<2;
    if(cnt) cnt.innerHTML = n<2 ? 'Waiting for at least one more classmate. Tell them to press <b>Join a race</b>.'
      : `<b>Race starts in ${Math.max(0,Math.ceil((w.countEnd-Date.now())/1000))} s</b> (or when ${RACE_MAX} racers are in).`;
  };
  w.stop=ref.onSnapshot(s=>{
    if(raceWait!==w) return;
    if(!s.exists){ stopWait(); if(location.hash==='#race') showRace(); return }
    const x=s.data(); w.data=x;
    if(x.state==='playing'){ stopWait(); startRace(code, id, x); return }
    if(!x.players.includes(me)){ stopWait(); if(location.hash==='#race') showRace(); return }
    draw();
  }, e=>console.error(e));
  w.tick=setInterval(()=>{ draw(); if(w.countEnd && Date.now()>=w.countEnd){ w.countEnd=Date.now()+5000; startNow() } }, 500);
  // The first player keeps the room fresh.
  w.beat=setInterval(()=>{ if(w.data && w.data.players[0]===me) ref.update({createdAt:FV_().serverTimestamp()}).catch(()=>{}) }, 45000);
  // Alone in a room while an older one is open? Move to that one, so classmates end up racing together.
  w.merge=setInterval(async()=>{
    if(raceWait!==w || !w.data || w.data.players.length!==1) return;
    const snap=await raceCol(code).where('state','==','waiting').get().catch(()=>null); if(!snap||raceWait!==w) return;
    const other=snap.docs.find(d=>d.id<id && d.data().players.length<RACE_MAX && !d.data().players.includes(me) && Date.now()-tsMs(d.data().createdAt)<=RACE_STALE);
    if(!other) return;
    try{ await ref.delete() }catch(e){ return }   // someone may have just joined mine
    stopWait();
    const nid=await tryJoinRace(code, id).catch(()=>null) || await createRace(code).catch(()=>null);
    if(nid) waitRoom(code, nid); else showRace();
  }, 12000);
}
function leaveRacePage(){
  if(raceWait) raceWait.cancel();
  if(race){ if(race.stop) race.stop(); clearInterval(race.timer); clearTimeout(race.endTimer); race=null }
}

// ---------- racing ----------
function startRace(code, id, x){
  if(location.hash!=='#race') history.replaceState(null,'','#race');
  const r=race={code, id, me:Cloud.user.uid, data:x, puzzle:makeRacePuzzle(x.seed, x.level), localStart:Date.now(), over:false};
  raceBench(r);
  sfx('click');
  r.stop=raceCol(code).doc(id).onSnapshot(s=>{ if(race!==r || !s.exists) return; r.data=s.data(); onRaceData(r) }, e=>console.error(e));
  r.timer=setInterval(()=>tickRace(r), 250);
}
function racersHtml(x, me){
  return x.players.map((u,i)=>`<span class="racer${u===x.winner?' won':''}${u===me?' me':''}" style="--rc:${raceColor(i).c}">${miniRover(i,'racer-car')}${u===x.winner?'🏁 ':''}${esc(u===me?'You':(x.names||{})[u]||'Racer')}</span>`).join('');
}
function moveGhosts(r){
  const pos=(r.data&&r.data.pos)||{};
  Object.entries(r.ghosts||{}).forEach(([u,g])=>{ const p=pos[u]; if(!p) return;
    world.place(g.el, p.x, p.y);
    let t=g.turns; while(((t%4)+4)%4!==p.d) t+= (((p.d-t)%4)+4)%4===3 ? -1 : 1;   // turn the short way round
    g.turns=t; g.inner.style.transform='rotate('+(t*90)+'deg)' });
}
// Called by finish() in index.html when a race run ends (at the flag or not): share where my rover stopped (1 small write per run).
function raceMoved(){
  const r=race; if(!r||r.over||!world) return;
  const p={x:world.x, y:world.y, d:((world.turns%4)+4)%4}, k=p.x+','+p.y+','+p.d;
  if(r.lastPos===k) return; r.lastPos=k;
  raceCol(r.code).doc(r.id).update({['pos.'+r.me]:p}).catch(e=>console.error(e));
}
function onRaceData(r){
  const x=r.data, el=$('#raceRacers'); if(el) el.innerHTML=racersHtml(x, r.me);
  moveGhosts(r);
  if(x.winner) endRace(r);
}
function tickRace(r){
  if(race!==r) return;
  const left=r.localStart+RACE_SECONDS*1000-Date.now(), el=$('#raceClock');
  if(el){ el.textContent=mmss(left); el.classList.toggle('low', left<=30000) }
  if(left<=0) endRace(r);
}
function raceBench(r){
  const P=r.puzzle; L=P; program=[]; selKey='root';
  const app=$('#app'); app.innerHTML='';
  applyLevelTheme(P.level);
  const head=h('div','duel-head');
  head.innerHTML=`<div><span class="label">🚩 Flag Race · ${LEVEL_NAMES[P.level]} · winner gets ${r.data.players.length} ${RSTAR}</span><h1 style="font-size:clamp(24px,3.4vw,34px)">First to the flag wins</h1><p class="race-racers" id="raceRacers">${racersHtml(r.data, r.me)}</p></div>
    <div class="duel-clock" id="raceClock" aria-label="Time left">${mmss(RACE_SECONDS*1000)}</div>`;
  app.appendChild(head);
  const bench=h('div','bench'); bench.id='raceBench';
  const bp=h('section','pane');
  bp.innerHTML=`<div class="goal">${FLAG_SVG}<p><b>Goal:</b> ${P.goal}</p></div>`;
  world=buildBoard(P); if(world.hud) bp.appendChild(world.hud); bp.appendChild(world.board);
  const mine=Math.max(0, r.data.players.indexOf(r.me)), col=raceColor(mine);
  world.rover.style.setProperty('--rover', col.c);
  world.rover.appendChild(h('span','rname',esc(duelName())));
  // Classmates' rovers share the map, each in its own color with the name underneath. They move when their driver's run ends.
  r.ghosts={};
  r.data.players.forEach((u,i)=>{ if(u===r.me) return;
    const g=h('div','sprite rover ghost'), gi=h('div','rover-in',ROVER_SVG); g.style.setProperty('--rover', raceColor(i).c);
    gi.style.transform='rotate('+(P.dir*90)+'deg)'; g.appendChild(gi); g.appendChild(h('span','rname',esc((r.data.names||{})[u]||'Racer')));
    world.place(g, world.m.start.x, world.m.start.y); world.board.insertBefore(g, world.rover); r.ghosts[u]={el:g, inner:gi, turns:P.dir} });
  moveGhosts(r);
  const ctr=h('div','controls');
  ctr.innerHTML=`<button class="btn primary" id="runBtn">▶ Run</button><button class="btn" id="resetBtn">↺ Reset</button><div class="spacer"></div>
    <label class="speed" for="spd">Speed <select id="spd"><option value="650">Slow</option><option value="380">Normal</option><option value="150" selected>Fast</option></select></label>`;
  bp.appendChild(ctr);
  const fb=h('div','feedback info',`You drive the <b style="color:${col.c}">${col.name}</b> rover. Build a program with up to ${P.maxBlocks} blocks, then press Run. Fast speed gets you there first!`); fb.id='fb'; bp.appendChild(fb);
  bench.appendChild(bp);
  const sh=h('section','pane shelf'); sh.innerHTML='<h3>Blocks</h3><span class="label">Tap or drag to add</span>';
  const list=h('div','shelf-list');
  P.blocks.forEach(t=>{
    const B=BLOCKS[t], lbl=t==='repeat'?'repeat 3 times':B.label;
    const b=h('button','block pal '+B.cls, `<div class="row">${ICON[t]}<span>${lbl}</span></div>`); b.draggable=true;
    b.onclick=()=>{ if(running||r.over||atLimit()) return; const nn=newNode(t); getList(selKey).push(nn); if(B.container) selKey=nn.id+':body'; changed() };
    b.addEventListener('dragstart',e=>{ dragNew=t; dragId=null; e.dataTransfer.setData('text/plain',t); e.dataTransfer.effectAllowed='copy' });
    b.addEventListener('dragend',()=>{ dragNew=null; clearDrop() });
    list.appendChild(b);
  });
  sh.appendChild(list); bench.appendChild(sh);
  const pp=h('section','pane');
  pp.innerHTML=`<div class="prog-head"><h3>Your program</h3><span class="count" id="count"></span><div class="spacer"></div>
    <button class="btn" id="codeBtn" aria-pressed="false">Show as code</button><button class="btn" id="clearBtn">Clear</button></div>
    <div class="target" id="target"></div><div id="ws"></div><pre class="code" id="code" hidden></pre>`;
  bench.appendChild(pp); app.appendChild(bench);
  $('#runBtn').onclick=()=> running? stopRun(true) : (r.over ? null : run());
  $('#resetBtn').onclick=()=>{ stopRun(); world.reset(); setFb('info','Rover reset. Press Run when you are ready.') };
  $('#clearBtn').onclick=()=>{ if(running||r.over) return; program=[]; selKey='root'; changed() };
  $('#codeBtn').onclick=e=>{ const c=$('#code'); c.hidden=!c.hidden; e.currentTarget.setAttribute('aria-pressed',String(!c.hidden)); e.currentTarget.textContent=c.hidden?'Show as code':'Hide code'; renderCode() };
  renderProgram(); tickRace(r);
}
// Called by finish() in index.html when a race run reaches the flag.
async function raceSolved(blocks){
  const r=race; if(!r||r.over) return;
  if(Date.now()-r.localStart > RACE_SECONDS*1000){ setFb('bad','Time is up, so this run does not count.'); return }
  if(blocks>r.puzzle.maxBlocks){ setFb('bad',`Too many blocks: this race allows ${r.puzzle.maxBlocks}.`); return }
  setFb('info','🏁 You reached the flag! Checking if you were first…');
  const ref=raceCol(r.code).doc(r.id), me=r.me;
  try{
    await Cloud.db.runTransaction(async tx=>{
      const s=await tx.get(ref), x=s.exists&&s.data();
      if(!x || x.winner) return;
      tx.update(ref, {winner:me, winBlocks:blocks, winMs:Date.now()-r.localStart, ['pos.'+me]:{x:world.x, y:world.y, d:((world.turns%4)+4)%4}});
      tx.update(rRowRef(r.code,me), {name:duelName(), stars:FV_().increment(x.players.length), wins:FV_().increment(1), lastRace:r.id, updatedAt:FV_().serverTimestamp()});
    });
  }catch(e){ console.error(e); if(race===r && !r.over) setFb('bad','Your finish could not be saved. Check your connection and run it again.') }
}
async function endRace(r){
  if(r.over || race!==r) return; r.over=true;
  clearInterval(r.timer); stopRun();
  const b=$('#raceBench'); if(b) b.classList.add('frozen');
  let x=r.data;
  if(!x.winner){
    // Time is up: wait for the last few seconds a finish can still arrive, then read the final result.
    const wait=Math.max(0, r.localStart+RACE_CUTOFF*1000-Date.now());
    if(wait){ setFb('info','Time is up! Checking the results…'); await new Promise(res=>{ r.endTimer=setTimeout(res, wait) }) }
    if(race!==r) return;
    try{ const s=await raceCol(r.code).doc(r.id).get({source:'server'}); if(s.exists) x=s.data() }catch(e){ console.error(e) }
  }
  if(r.stop) r.stop(); race=null;
  const won=x.winner===r.me, wname=x.winner?(x.names||{})[x.winner]||'A classmate':'', n=x.players.length;
  // The winner tidies up the room a little later, once everyone has seen the result.
  if(won) setTimeout(()=>raceCol(r.code).doc(r.id).delete().catch(()=>{}), 15000);
  sfx(won?'win':x.winner?'fail':'click');
  const title = won ? 'You won the race! 🏁' : x.winner ? esc(wname)+' won the race' : 'Nobody reached the flag';
  const body = won ? `<p>Your rover reached the flag first with <b>${x.winBlocks}</b> block${x.winBlocks===1?'':'s'}. You earned <b>${n} race stars</b> ${RSTAR.repeat(n)}</p>`
    : x.winner ? `<p><b>${esc(wname)}</b> reached the flag first with ${x.winBlocks} block${x.winBlocks===1?'':'s'} in ${mmss(x.winMs||0)} and earned ${n} race stars. Race again to win them next time!</p>`
    : `<p>Time ran out before any rover reached the flag. No stars this time. Try again!</p>`;
  showMsg(title, body+`<p style="font-size:14px">Our own solution used ${r.puzzle.ideal} blocks.</p>`,
    [['Course map',false,()=>{ location.hash='home' }],['Scoreboard',false,()=>{ openRaceBoard(r.code); return false }],['Race again',true,()=>{ showRace() }]]);
}

// ---------- Flag Race scoreboard (students and the class's teacher) ----------
function raceBoardRows(rows){
  return (rows||[]).map(r=>({...r, stars:r.stars||0, wins:r.wins||0})).filter(r=>r.stars>0||r.wins>0)
    .sort((a,b)=>b.stars-a.stars || b.wins-a.wins || String(a.name).localeCompare(String(b.name)));
}
function raceBoardTable(rows, me){
  if(!rows.length) return '<p>No races won yet. Be the first!</p>';
  let place=0, prev=null;
  return `<table class="lb"><thead><tr><th>#</th><th>Student</th><th class="n">Race stars</th><th class="n">Wins</th></tr></thead><tbody>${rows.map((r,i)=>{
    if(r.stars!==prev){ place=i+1; prev=r.stars }
    return `<tr class="${r.uid===me?'me':''}"><td>${place===1?'👑':place}</td><td>${esc(r.uid===me?'You':r.name||'Student')}</td><td class="n">${r.stars} ${RSTAR}</td><td class="n">${r.wins}</td></tr>` }).join('')}</tbody></table>`;
}
function openRaceBoard(code){
  const me=Cloud.user.uid, p=Cloud.profile||{};
  const close=()=>{ if(raceBoardStop){ raceBoardStop(); raceBoardStop=null } };
  showMsg('Flag Race scoreboard: '+esc(p.className||code), '<div class="lbwrap" id="rlbBox"><p>Loading…</p></div><p style="margin-top:10px;font-size:14px">Updates live. Win a race to earn 1 race star for every player in it.</p>', [['Close',true,close]]);
  close();
  raceBoardStop=rRowRef(code,'x').parent.onSnapshot(s=>{ const box=$('#rlbBox'); if(!box){ close(); return }
    box.innerHTML=raceBoardTable(raceBoardRows(s.docs.map(x=>({uid:x.id, ...x.data()}))), me) },
    e=>{ console.error(e); const box=$('#rlbBox'); if(box) box.innerHTML='<p>The Flag Race scoreboard is not available right now.</p>' });
}
