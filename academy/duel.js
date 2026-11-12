// Duel: two classmates get the same brand-new puzzle and 2 minutes. Fewest blocks wins; a faster time breaks a tie.
// Each player stakes 1 Duel trophy and the winner takes both. If nobody solves it, stakes go back.
// Duel trophies are separate from lesson stars, because stars feed the teacher's grade.
//   trophies = 3 to start + 1 for every 10 lesson stars + duel winnings (net) + free trophies (1 a day when at 0)
// The teacher turns Duels on or off per class (classes/{code}.duels). Firestore:
//   classes/{code}/duels/{id}      one duel: players, seed (the puzzle), results r, done, stake, settled
//   classes/{code}/duelBoard/{uid} a student's net trophies, free trophies, wins, losses, ties
// This file only defines functions; academy/index.html calls them (it owns the board, blocks and interpreter).
const DUEL_SECONDS = 120, DUEL_START = 3, DUEL_STARS_PER = 10;
const DUEL_CUTOFF = 135;        // wait this long after the start before reading the final result (2 min + grace for slow networks; the rules cap it at 255 s)
const DUEL_STALE = 100000;      // a waiting duel not refreshed for this long is treated as abandoned
const TROPHY = '🏆';

// ---------- the puzzle: made from a seed, so both players get exactly the same map ----------
function duelRng(seed){ let a=seed>>>0; return ()=>{ a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296 } }
// Builds the map from a short program with a repeating pattern, so it can always be solved and a repeat block pays off.
function makeDuelPuzzle(seed, level){
  const R=duelRng(seed), ri=(a,b)=>a+Math.floor(R()*(b-a+1)), pick=a=>a[Math.floor(R()*a.length)];
  const size={easy:6, medium:7, hard:8}[level]||8, W=size, H=size, D_X=[0,1,0,-1], D_Y=[-1,0,1,0];
  for(let t=0;t<3000;t++){
    const segs=[], ns = level==='easy' ? 1 : ri(1,2);
    for(let i=0;i<ns;i++) segs.push({a:ri(1, level==='easy'?2:3), turn:pick(['left','right'])});
    const reps=ri(level==='easy'?2:3, level==='hard'?5:4), tail=ri(0,2), gems = R() < (level==='easy'?.5:.8);
    let x=ri(0,W-1), y=ri(0,H-1), dir=ri(0,3), ok=true;
    const sx=x, sy=y, sdir=dir, seen=new Set([x+','+y]), gemCells=[];
    const step=()=>{ x+=D_X[dir]; y+=D_Y[dir]; const k=x+','+y; if(x<0||y<0||x>=W||y>=H||seen.has(k)) return false; seen.add(k); return true };
    outer: for(let r=0;r<reps;r++) for(let si=0;si<segs.length;si++){
      for(let i=0;i<segs[si].a;i++) if(!step()){ ok=false; break outer }
      if(gems && si===0) gemCells.push(x+','+y);
      dir=(dir+(segs[si].turn==='left'?3:1))%4;
    }
    if(!ok) continue;
    for(let i=0;i<tail;i++) if(!step()){ ok=false; break }
    if(!ok || seen.size < (level==='easy'?6:level==='medium'?9:11)) continue;
    const goal=x+','+y; if(gemCells.includes(goal)) continue;
    const rows=[...Array(H)].map(()=>Array(W).fill('#'));
    seen.forEach(k=>{ const [a,b]=k.split(',').map(Number); rows[b][a]='.' });
    // Open a few extra cells beside the path so the route isn't simply "the only sand on the map".
    for(let b=0;b<H;b++) for(let a=0;a<W;a++) if(rows[b][a]==='#' && [0,1,2,3].some(d=>seen.has((a+D_X[d])+','+(b+D_Y[d]))) && R()<.3) rows[b][a]='.';
    gemCells.forEach(k=>{ const [a,b]=k.split(',').map(Number); rows[b][a]='*' });
    rows[sy][sx]='S'; const [gx,gy]=goal.split(',').map(Number); rows[gy][gx]='G';
    const par = 1 + segs.reduce((s,g)=>s+g.a+1,0) + (gems?1:0) + tail;
    return duelLevel(rows.map(r=>r.join('')), sdir, gems, par, level);
  }
  return duelLevel(['S..*..','#####.','G.*...','######','######','######'], 1, true, 9, level);  // fallback, never reached in practice
}
function duelLevel(map, dir, gems, par, level){
  return {n:0, duel:true, unit:1, k:'D', title:'Duel', level, map, dir, ideal:par, maxBlocks:40,
    blocks:['forward','left','right',...(gems?['collect']:[]),'repeat'],
    goal: gems ? 'Collect every crystal, then reach the flag. Fewest blocks wins.' : 'Drive the rover to the flag. Fewest blocks wins.',
    hint: 'Look for the part of the path that happens again and again, and put it inside a repeat block.'};
}

// ---------- helpers ----------
let duel=null;          // the duel on screen: {code, id, me, data, puzzle, localStart, best, done, stop, timer, ending}
let duelWait=null;      // while waiting for an opponent: {code, id, stop, beat, merge}
let duelBoardStop=null;
const FV_=()=>firebase.firestore.FieldValue;
const duelCol=code=>Cloud.db.collection('classes').doc(code).collection('duels');
const dRowRef=(code,uid)=>Cloud.db.collection('classes').doc(code).collection('duelBoard').doc(uid);
const duelName=()=>{ const n=Cloud.user.displayName||'Student', w=String(n).trim().split(/\s+/); return (w.length>1 ? w[0]+' '+w[w.length-1][0]+'.' : w[0]).slice(0,40) };
const trophiesOf=(row, stars)=>DUEL_START + Math.floor((stars||0)/DUEL_STARS_PER) + ((row&&row.net)||0) + ((row&&row.free)||0);
const mmss=ms=>{ const s=Math.max(0,Math.ceil(ms/1000)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0') };
const tsMs=v=>v&&v.toMillis?v.toMillis():0;
const duelPending={ get(){ return store.get('duelPending',null) }, set(v){ store.set('duelPending',v) }, clear(){ store.set('duelPending',null) } };
const freeReady=row=>!row.lastFree || Date.now()-tsMs(row.lastFree) > 20*3600*1000;

// Stars the rules count are the ones on the class leaderboard (classes/{code}/board/{uid}).
async function myDuelRow(code){
  const me=Cloud.user.uid, ref=dRowRef(code,me);
  let s=await ref.get(), row=s.exists?s.data():null;
  if(!row){
    row={name:duelName(), net:0, free:0, played:0, wins:0, losses:0, ties:0, lastDuel:'', updatedAt:FV_().serverTimestamp()};
    await ref.set(row);
  }
  let stars=totalStars(progress);
  try{ const b=await Cloud.db.collection('classes').doc(code).collection('board').doc(me).get(); if(b.exists) stars=b.data().stars||0 }catch(e){}
  return {row, stars, trophies:trophiesOf(row,stars)};
}

function duelTop(){ const top=$('#topRight'); top.innerHTML=''; const b=h('button','btn','Course map'); b.onclick=()=>{ location.hash='home' }; top.appendChild(b) }

// ---------- lobby ----------
async function showDuel(){
  if((duel && $('#duelBench')) || (duelWait && $('.duel-spin'))) return;   // already playing or waiting: a lock or level refresh must not rebuild the page
  if(window.Sfx) Sfx.music(false);
  duelTop(); applyLevelTheme(curLevel);
  const app=$('#app'); app.innerHTML='<section class="duel-lobby"><p>Loading…</p></section>';
  const box=$('.duel-lobby',app);
  if(!Cloud){ box.innerHTML='<h1>Duel</h1><p>Duels need sign-in, which is not available here.</p>'; return }
  if(!Cloud.ready){ return }                    // Cloud.onChange calls showDuel again once sign-in is known
  if(!Cloud.user){ box.innerHTML='<h1>⚔ Duel</h1><p>Sign in and join your class to duel your classmates.</p>'; const b=h('button','btn primary','Sign in'); b.onclick=()=>openSignIn(joinParam); box.appendChild(b); return }
  const code=Cloud.profile&&Cloud.profile.classCode;
  if(!code){ box.innerHTML='<h1>⚔ Duel</h1><p>Join your class first. Duels are between classmates.</p>'; const b=h('button','btn primary','Join class'); b.onclick=()=>openJoin(joinParam); box.appendChild(b); return }
  let cls=null; try{ cls=await Cloud.restGet('classes/'+code) }catch(e){ try{ cls=await Cloud.findClass(code) }catch(e2){ console.error(e2) } }
  if(location.hash!=='#duel') return;
  if(!cls){ box.innerHTML='<h1>⚔ Duel</h1><p>Could not reach your class right now. Check your connection and try again.</p>'; return }
  // Back from another page in the middle of a duel? Pick it up again (or settle it if time ran out).
  const pend=duelPending.get();
  if(pend && pend.code===code && await resumeDuel(pend)) return;
  if(location.hash!=='#duel') return;
  if(!cls.duels){ box.innerHTML='<h1>⚔ Duel</h1><p>Your teacher has not turned on Duels for your class yet. Ask your teacher, and keep earning stars in the lessons: every 10 stars gives you a Duel trophy.</p>'; return }
  let me; try{ me=await myDuelRow(code) }catch(e){ console.error(e); box.innerHTML='<h1>⚔ Duel</h1><p>Duels are not ready yet (the database rules may need publishing). Try again later.</p>'; return }
  if(location.hash!=='#duel') return;
  const t=me.trophies;
  box.innerHTML=`<span class="label">${esc(Cloud.profile.className||code)} · Duel</span>
    <h1>⚔ Duel a classmate</h1>
    <div class="duel-tro"><span class="duel-big">${TROPHY} ${t}</span><span>Duel trophies<small>${me.row.wins||0} won · ${me.row.losses||0} lost · ${me.row.ties||0} tied</small></span></div>
    <ul class="intro-list">
      <li><span>You and a classmate get the <b>same new puzzle</b> and <b>2 minutes</b>.</span></li>
      <li><span>Each of you puts in <b>1 trophy</b>. The program with the <b>fewest blocks</b> wins both. Same number of blocks? The faster one wins.</span></li>
      <li><span>Solved it? Keep improving until time runs out, or press <b>I'm done</b>. If nobody solves it, you both get your trophy back.</span></li>
      <li><span>Earn more trophies in the lessons: <b>+1 for every ${DUEL_STARS_PER} stars</b>. Duel trophies never change your stars or grade.</span></li>
    </ul>
    <div class="acts" style="justify-content:flex-start" id="duelActs"></div><p class="joinerr" id="duelErr" role="alert"></p>`;
  const acts=$('#duelActs');
  if(t>0){ const b=h('button','btn primary','⚔ Find an opponent'); b.onclick=()=>findOpponent(code); acts.appendChild(b) }
  else if(freeReady(me.row)){
    const b=h('button','btn primary',`Get your free trophy`); b.onclick=async()=>{ b.disabled=true;
      try{ await dRowRef(code,Cloud.user.uid).update({free:FV_().increment(1), lastFree:FV_().serverTimestamp(), updatedAt:FV_().serverTimestamp()}); showDuel() }
      catch(e){ console.error(e); b.disabled=false; $('#duelErr').textContent='Could not get the free trophy right now. Try again later.' } };
    acts.appendChild(b); box.insertBefore(h('p','duel-note','You are out of trophies. You get 1 free trophy each day you run out. Grab it to duel again.'), acts);
  } else box.insertBefore(h('p','duel-note',`You are out of trophies. Earn ${DUEL_STARS_PER-(me.stars%DUEL_STARS_PER)} more lesson star${DUEL_STARS_PER-(me.stars%DUEL_STARS_PER)===1?'':'s'} for a trophy, or come back tomorrow for a free one.`), acts);
  const sb=h('button','btn','Duel scoreboard'); sb.onclick=()=>openDuelBoard(code); acts.appendChild(sb);
}

// ---------- matching ----------
async function findOpponent(code){
  const err=$('#duelErr'); const btns=document.querySelectorAll('#duelActs button'); btns.forEach(b=>b.disabled=true);
  if(err) err.textContent='Looking for a classmate…';
  try{
    if(await tryJoin(code)) return;
    await createWaiting(code);
  }catch(e){ console.error(e); if(err) err.textContent='Could not start a duel ('+(e.code||e.message)+'). Try again.'; btns.forEach(b=>b.disabled=false) }
}
// Joins the oldest open duel of a classmate. Returns true when a duel started.
async function tryJoin(code, skipId){
  const me=Cloud.user.uid, snap=await duelCol(code).where('state','==','waiting').get();
  const now=Date.now();
  const open=snap.docs.filter(d=>d.id!==skipId && d.data().players[0]!==me);
  for(const d of open) if(now-tsMs(d.data().createdAt) > DUEL_STALE) d.ref.delete().catch(()=>{});   // left behind by someone who closed the page
  const fresh=open.filter(d=>now-tsMs(d.data().createdAt) <= DUEL_STALE).sort((a,b)=>a.id<b.id?-1:1);
  for(const d of fresh){
    try{
      await Cloud.db.runTransaction(async tx=>{
        const s=await tx.get(d.ref), x=s.exists&&s.data();
        if(!x || x.state!=='waiting' || x.players.length!==1) throw Object.assign(new Error('taken'),{taken:true});
        tx.update(d.ref, {players:[...x.players, me], state:'playing', startedAt:FV_().serverTimestamp(), ['names.'+me]:duelName(), ['stake.'+me]:true});
        tx.update(dRowRef(code,me), {name:duelName(), net:FV_().increment(-1), lastDuel:d.id, updatedAt:FV_().serverTimestamp()});
      });
      startDuel(code, d.id, Date.now());
      return true;
    }catch(e){ if(!e.taken) console.error(e) }
  }
  return false;
}
async function createWaiting(code){
  const me=Cloud.user.uid, ref=duelCol(code).doc();
  await ref.set({level:curLevel, seed:Math.floor(Math.random()*2147483647), state:'waiting', players:[me], names:{[me]:duelName()},
    createdAt:FV_().serverTimestamp(), r:{}, done:{}, stake:{}, settled:{}});
  duelPending.set({code, id:ref.id, waiting:true});
  const box=$('.duel-lobby');
  if(box) box.innerHTML=`<h1>⚔ Waiting for a classmate…</h1><div class="duel-spin" aria-hidden="true"></div><p>Tell a classmate to press <b>Find an opponent</b> now. The duel starts as soon as someone joins.</p><div class="acts" style="justify-content:flex-start"><button class="btn" id="duelCancel">Cancel</button></div>`;
  const w=duelWait={code, id:ref.id};
  const stopWait=()=>{ if(w.stop) w.stop(); clearInterval(w.beat); clearInterval(w.merge); window.removeEventListener('pagehide', w.leave); if(duelWait===w) duelWait=null };
  w.cancel=async()=>{ stopWait(); duelPending.clear(); await ref.delete().catch(()=>{}) };
  w.leave=()=>{ ref.delete().catch(()=>{}) };
  window.addEventListener('pagehide', w.leave);
  const c=$('#duelCancel'); if(c) c.onclick=async()=>{ await w.cancel(); showDuel() };
  w.stop=ref.onSnapshot(s=>{
    if(!s.exists){ if(duelWait===w){ stopWait(); duelPending.clear(); if(location.hash==='#duel') showDuel() } return }
    const x=s.data(); if(x.state!=='playing') return;
    stopWait();
    // Put in my trophy, then play.
    const b=Cloud.db.batch();
    b.update(ref, {['stake.'+me]:true});
    b.update(dRowRef(code,me), {name:duelName(), net:FV_().increment(-1), lastDuel:ref.id, updatedAt:FV_().serverTimestamp()});
    b.commit().catch(e=>console.error('Stake not saved', e));
    startDuel(code, ref.id, Date.now());
  }, e=>console.error(e));
  // Keep the waiting duel fresh, and if a classmate started waiting at the same moment, join theirs instead.
  w.beat=setInterval(()=>ref.update({createdAt:FV_().serverTimestamp()}).catch(()=>{}), 45000);
  w.merge=setInterval(async()=>{
    if(duelWait!==w) return;
    const snap=await duelCol(code).where('state','==','waiting').get().catch(()=>null); if(!snap||duelWait!==w) return;
    const other=snap.docs.find(d=>d.id<ref.id && d.data().players[0]!==me && Date.now()-tsMs(d.data().createdAt)<=DUEL_STALE);
    if(!other) return;
    try{ await ref.delete() }catch(e){ return }   // someone may have just joined mine
    stopWait(); duelPending.clear();
    if(!(await tryJoin(code, ref.id).catch(()=>false))) createWaiting(code);
  }, 12000);
}
function leaveDuelPage(){
  // Navigating away: stop the screen's timers. A waiting duel is cancelled; a running one can be resumed from the Duel page.
  if(duelWait) duelWait.cancel();
  if(duel){ if(duel.stop) duel.stop(); clearInterval(duel.timer); clearTimeout(duel.endTimer); duel=null }
}

// ---------- playing ----------
async function resumeDuel(p){
  if(p.waiting){ duelPending.clear(); duelCol(p.code).doc(p.id).delete().catch(()=>{}); return false }
  let s; try{ s=await duelCol(p.code).doc(p.id).get() }catch(e){ return false }
  if(!s.exists){ duelPending.clear(); return false }
  const x=s.data(), me=Cloud.user.uid;
  if(x.state!=='playing' || !x.players.includes(me) || (x.settled||{})[me]){ duelPending.clear(); return false }
  startDuel(p.code, p.id, p.localStart||Date.now());
  return true;
}
function startDuel(code, id, localStart){
  const me=Cloud.user.uid;
  duelPending.set({code, id, localStart});
  if(location.hash!=='#duel'){ history.replaceState(null,'','#duel') }
  duel={code, id, me, data:null, localStart, best:null, done:false, ending:false};
  const d=duel;
  d.stop=duelCol(code).doc(id).onSnapshot(s=>{ if(duel!==d) return; if(!s.exists){ return } d.data=s.data(); onDuelData(d) }, e=>console.error(e));
  d.timer=setInterval(()=>tickDuel(d), 250);
}
function onDuelData(d){
  const x=d.data, me=d.me;
  if(!d.puzzle){
    d.puzzle=makeDuelPuzzle(x.seed, x.level);
    d.best=(x.r||{})[me]||null; d.done=!!(x.done||{})[me];
    duelBench(d);
  }
  const op=x.players.find(u=>u!==me), oname=op?(x.names||{})[op]||'Your opponent':'Your opponent', or=op&&(x.r||{})[op], od=op&&(x.done||{})[op];
  const st=$('#duelOpp');
  if(st) st.innerHTML=`<b>${esc(oname)}</b>: ${or?`solved with <b>${or.blocks}</b> block${or.blocks===1?'':'s'}`:'not solved yet'}${od?' · done':''}`;
  if((x.done||{})[me] && od) endDuel(d);
}
function tickDuel(d){
  if(duel!==d) return;
  const left=d.localStart+DUEL_SECONDS*1000-Date.now(), el=$('#duelClock');
  if(el){ el.textContent=mmss(left); el.classList.toggle('low', left<=30000) }
  if(left<=0) endDuel(d);
}
function duelBench(d){
  const P=d.puzzle; L=P; program=[]; selKey='root';
  const app=$('#app'); app.innerHTML='';
  applyLevelTheme(P.level);
  const head=h('div','duel-head');
  head.innerHTML=`<div><span class="label">⚔ Duel · ${LEVEL_NAMES[P.level]} · 1 ${TROPHY} each</span><h1 style="font-size:clamp(24px,3.4vw,34px)">Fewest blocks wins</h1><p class="duel-opp" id="duelOpp">Waiting for your opponent…</p></div>
    <div class="duel-clock" id="duelClock" aria-label="Time left">2:00</div>`;
  app.appendChild(head);
  const bench=h('div','bench'); bench.id='duelBench';
  const bp=h('section','pane'); const pm=parseMap(P);
  bp.innerHTML=`<div class="goal">${pm.goal?FLAG_SVG:GEM_SVG}<p><b>Goal:</b> ${P.goal}</p></div>`;
  world=buildBoard(P); if(world.hud) bp.appendChild(world.hud); bp.appendChild(world.board);
  const ctr=h('div','controls');
  ctr.innerHTML=`<button class="btn primary" id="runBtn">▶ Run</button><button class="btn" id="resetBtn">↺ Reset</button><div class="spacer"></div>
    <label class="speed" for="spd">Speed <select id="spd"><option value="650">Slow</option><option value="380">Normal</option><option value="150" selected>Fast</option></select></label>`;
  bp.appendChild(ctr);
  const fb=h('div','feedback info','Build a program, then press Run. Every solve counts: fewer blocks is better.'); fb.id='fb'; bp.appendChild(fb);
  bp.appendChild(h('div','duel-best',''));
  bench.appendChild(bp);
  const sh=h('section','pane shelf'); sh.innerHTML='<h3>Blocks</h3><span class="label">Tap or drag to add</span>';
  const list=h('div','shelf-list');
  P.blocks.forEach(t=>{
    const B=BLOCKS[t], lbl=t==='repeat'?'repeat 3 times':B.label;
    const b=h('button','block pal '+B.cls, `<div class="row">${ICON[t]}<span>${lbl}</span></div>`); b.draggable=true;
    b.onclick=()=>{ if(running||d.done||atLimit()) return; const nn=newNode(t); getList(selKey).push(nn); if(B.container) selKey=nn.id+':body'; changed() };
    b.addEventListener('dragstart',e=>{ dragNew=t; dragId=null; e.dataTransfer.setData('text/plain',t); e.dataTransfer.effectAllowed='copy' });
    b.addEventListener('dragend',()=>{ dragNew=null; clearDrop() });
    list.appendChild(b);
  });
  sh.appendChild(list); bench.appendChild(sh);
  const pp=h('section','pane');
  pp.innerHTML=`<div class="prog-head"><h3>Your program</h3><span class="count" id="count"></span><div class="spacer"></div>
    <button class="btn" id="codeBtn" aria-pressed="false">Show as code</button><button class="btn" id="clearBtn">Clear</button></div>
    <div class="target" id="target"></div><div id="ws"></div><pre class="code" id="code" hidden></pre>
    <div class="acts" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="duelDone">I'm done</button></div>`;
  bench.appendChild(pp); app.appendChild(bench);
  $('#runBtn').onclick=()=> running? stopRun(true) : (d.done ? null : run());
  $('#resetBtn').onclick=()=>{ stopRun(); world.reset(); setFb('info','Rover reset. Press Run when you are ready.') };
  $('#clearBtn').onclick=()=>{ if(running||d.done) return; program=[]; selKey='root'; changed() };
  $('#codeBtn').onclick=e=>{ const c=$('#code'); c.hidden=!c.hidden; e.currentTarget.setAttribute('aria-pressed',String(!c.hidden)); e.currentTarget.textContent=c.hidden?'Show as code':'Hide code'; renderCode() };
  $('#duelDone').onclick=()=>duelDone(d);
  renderProgram(); showBest(d);
  if(d.done) freezeBench(d);
  tickDuel(d);
}
function showBest(d){ const el=$('.duel-best'); if(el) el.innerHTML = d.best ? `Your best: <b>${d.best.blocks}</b> block${d.best.blocks===1?'':'s'} at ${mmss(d.best.ms)}` : '' }
function freezeBench(d){ const b=$('#duelBench'); if(b) b.classList.add('frozen'); const k=$('#duelDone'); if(k){ k.disabled=true; k.textContent='Done. Waiting for the other player…' } }
// Called by finish() in index.html when a duel run reaches the goal.
function duelSolved(blocks){
  const d=duel; if(!d||d.done||d.ending) return;
  const ms=Date.now()-d.localStart;
  if(ms>DUEL_SECONDS*1000){ setFb('bad','Time is up, so this solve does not count.'); return }
  if(d.best && blocks>=d.best.blocks){ setFb('info',`Solved with ${blocks} blocks. Your best is still ${d.best.blocks}. Fewer blocks would beat it.`); return }
  d.best={blocks, ms}; showBest(d);
  setFb('info',`Solved with ${blocks} blocks! That counts. Try to beat it with fewer blocks, or press I'm done.`);
  duelCol(d.code).doc(d.id).update({['r.'+d.me]:{blocks, ms}}).catch(e=>{ console.error(e); setFb('bad','Your solve could not be saved. Check your connection and run it again.') });
}
function duelDone(d){
  if(d.done) return;
  if(!d.best && !confirm('You have not solved it yet. Stop now and give up this duel?')) return;
  d.done=true; stopRun(); freezeBench(d);
  duelCol(d.code).doc(d.id).update({['done.'+d.me]:true}).catch(e=>console.error(e));
}
// Time is up (or both players pressed I'm done): read the final result from the server, then move the trophies.
async function endDuel(d){
  if(d.ending || duel!==d) return; d.ending=true;
  clearInterval(d.timer); stopRun(); freezeBench(d);
  const x0=d.data||{}, bothDone=x0.done&&x0.players&&x0.players.every(u=>x0.done[u]);
  const k=$('#duelDone'); if(k) k.textContent='Checking the results…';
  // Results are accepted for a few seconds after the clock ends; wait for that window to close so both players see the same result.
  const wait = bothDone ? 0 : Math.max(0, d.localStart + DUEL_CUTOFF*1000 + 3000 - Date.now());
  if(wait){ const until=Date.now()+wait; d.endTimer=setInterval(()=>{ const kk=$('#duelDone'); if(kk) kk.textContent='Time is up! Results in '+mmss(until-Date.now())+'…' }, 500);
    await new Promise(r=>setTimeout(r, wait)); clearInterval(d.endTimer) }
  if(duel!==d) return;
  let x=x0;
  try{ const s=await duelCol(d.code).doc(d.id).get({source:'server'}); if(s.exists) x=s.data() }catch(e){ console.error(e) }
  const out=duelOutcome(x, d.me), gain={win:2, tie:1, loss:0}[out];
  let saved=false;
  if((x.stake||{})[d.me] && !(x.settled||{})[d.me]){
    const b=Cloud.db.batch();
    b.update(duelCol(d.code).doc(d.id), {['settled.'+d.me]:true});
    b.update(dRowRef(d.code,d.me), {name:duelName(), net:FV_().increment(gain), played:FV_().increment(1),
      wins:FV_().increment(out==='win'?1:0), losses:FV_().increment(out==='loss'?1:0), ties:FV_().increment(out==='tie'?1:0),
      lastDuel:d.id, updatedAt:FV_().serverTimestamp()});
    try{ await b.commit(); saved=true }catch(e){ console.error('Could not settle the duel', e) }
    // Once both players have settled, tidy up the duel.
    if(saved) duelCol(d.code).doc(d.id).get({source:'server'}).then(s=>{ const y=s.exists&&s.data(); if(y && y.players.every(u=>(y.settled||{})[u])) return s.ref.delete() }).catch(()=>{});
  }
  duelPending.clear();
  if(d.stop) d.stop(); duel=null;
  showDuelResult(x, d, out, (x.stake||{})[d.me], saved);
}
function duelOutcome(x, me){
  const op=(x.players||[]).find(u=>u!==me), r=x.r||{}, a=r[me], b=op?r[op]:null;
  if(!a && !b) return 'tie';
  if(a && !b) return 'win'; if(!a && b) return 'loss';
  if(a.blocks!==b.blocks) return a.blocks<b.blocks?'win':'loss';
  if(a.ms!==b.ms) return a.ms<b.ms?'win':'loss';
  return 'tie';
}
function showDuelResult(x, d, out, staked, saved){
  const op=x.players.find(u=>u!==d.me), oname=(x.names||{})[op]||'Your opponent', r=x.r||{};
  const line=(who,res)=>`<tr><td>${esc(who)}</td><td class="n">${res?res.blocks+' blocks':'not solved'}</td><td class="n">${res?mmss(res.ms):'–'}</td></tr>`;
  const none=!r[d.me]&&!r[op];
  sfx(out==='win'?'win':out==='loss'?'fail':'click');
  const title= out==='win'?'You won! 🏆': out==='loss'?'You lost this one': none?'Nobody solved it':'It\'s a tie';
  const tro = !staked ? 'Your trophy was not put in, so your trophies did not change.'
    : out==='win' ? `You won ${esc(oname)}'s trophy and got yours back (+1 ${TROPHY}).`
    : out==='loss' ? `${esc(oname)} took your trophy (−1 ${TROPHY}). Win it back in the next duel!`
    : `You got your trophy back.`;
  showMsg(title, `<table class="lb"><thead><tr><th>Player</th><th class="n">Program</th><th class="n">Time</th></tr></thead><tbody>${line('You',r[d.me])}${line(oname,r[op])}</tbody></table>
    <p style="margin-top:12px">${tro}${staked&&!saved?' (Your trophies could not be saved right now.)':''}</p>
    <p style="font-size:14px">Our own solution used ${d.puzzle?d.puzzle.ideal:'?'} blocks. Can you match it next time?</p>`,
    [['Course map',false,()=>{ location.hash='home' }],['Scoreboard',false,()=>{ openDuelBoard(d.code); return false }],['Duel again',true,()=>{ showDuel() }]]);
}

// ---------- Duel scoreboard (students and the class's teacher) ----------
// Everyone in the class is on it: trophies = 3 + 1 per 10 lesson stars (from the class leaderboard) + duel results.
function duelBoardRows(boardRows, duelRows, starsOf){
  const by={};
  (boardRows||[]).forEach(b=>{ by[b.uid]={uid:b.uid, name:b.name, stars:b.stars||0} });
  (duelRows||[]).forEach(r=>{ by[r.uid]={...(by[r.uid]||{uid:r.uid, stars:0}), ...r, name:r.name||(by[r.uid]||{}).name} });
  return Object.values(by).map(r=>{ const stars=starsOf?starsOf(r):r.stars; return {...r, stars, trophies:trophiesOf(r,stars), wins:r.wins||0, losses:r.losses||0, ties:r.ties||0} })
    .sort((a,b)=>b.trophies-a.trophies || b.wins-a.wins || String(a.name).localeCompare(String(b.name)));
}
function duelBoardTable(rows, me){
  let place=0, prev=null;
  return `<table class="lb"><thead><tr><th>#</th><th>Student</th><th class="n">Trophies</th><th class="n">W-L-T</th></tr></thead><tbody>${rows.map((r,i)=>{
    if(r.trophies!==prev){ place=i+1; prev=r.trophies }
    return `<tr class="${r.uid===me?'me':''}"><td>${place}</td><td>${esc(r.uid===me?'You':r.name||'Student')}</td><td class="n">${r.trophies} ${TROPHY}</td><td class="n">${r.wins}-${r.losses}-${r.ties}</td></tr>` }).join('')}</tbody></table>`;
}
function openDuelBoard(code){
  const me=Cloud.user.uid, p=Cloud.profile||{};
  const close=()=>{ if(duelBoardStop){ duelBoardStop(); duelBoardStop=null } };
  showMsg('Duel scoreboard: '+esc(p.className||code), '<div class="lbwrap" id="dlbBox"><p>Loading…</p></div><p style="margin-top:10px;font-size:14px">Updates live. Win duels to climb. Everyone starts with 3 trophies and gets 1 more for every 10 lesson stars.</p>', [['Close',true,close]]);
  close();
  let board=null, rows=null;
  const draw=()=>{ const box=$('#dlbBox'); if(!box){ close(); return } if(!board||!rows) return; box.innerHTML=duelBoardTable(duelBoardRows(board, rows), me) };
  const cref=Cloud.db.collection('classes').doc(code);
  const a=cref.collection('board').onSnapshot(s=>{ board=s.docs.map(x=>({uid:x.id, ...x.data()})); draw() }, e=>{ console.error(e); board=[]; draw() });
  const b=cref.collection('duelBoard').onSnapshot(s=>{ rows=s.docs.map(x=>({uid:x.id, ...x.data()})); draw() }, e=>{ console.error(e); const box=$('#dlbBox'); if(box) box.innerHTML='<p>The Duel scoreboard is not available right now.</p>' });
  duelBoardStop=()=>{ a(); b() };
}
