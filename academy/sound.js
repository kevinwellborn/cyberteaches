// Game sound for the rover academy: sound effects + background music + mute toggle.
// If a clip exists in academy/sounds/<name>.mp3 it is used (ElevenLabs clips go there).
// Otherwise a short sound is made on the fly with Web Audio, so the game always has sound.
(function(){
  const CLIPS = ['move','turn','fire','boom','crash','hit','collect','pickup','blast','win','fail','click','music'];
  const VOL = {music:0.22, move:0.5, turn:0.4, click:0.4};
  const KEY = 'academy.muted';
  let muted = false; try { muted = localStorage.getItem(KEY)==='1' } catch(e){}
  let ctx = null, master = null, buffers = {}, loading = null, musicSrc = null, synthMusic = null, wantMusic = false;

  function ac(){
    if(!ctx){
      const C = window.AudioContext || window.webkitAudioContext; if(!C) return null;
      ctx = new C(); master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(ctx.destination);
    }
    if(ctx.state==='suspended') ctx.resume();
    return ctx;
  }
  function load(){
    if(loading || !ac()) return loading;
    loading = Promise.all(CLIPS.map(n => fetch('sounds/'+n+'.mp3?v=1')
      .then(r => r.ok ? r.arrayBuffer() : null)
      .then(b => b && new Promise(res => ctx.decodeAudioData(b, res, () => res(null))))
      .then(buf => { if(buf) buffers[n] = buf })
      .catch(() => {})));
    return loading;
  }
  function playBuf(name, loop){
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = buffers[name]; s.loop = !!loop; g.gain.value = VOL[name] || 0.7;
    s.connect(g).connect(master); s.start(); return s;
  }

  // --- simple synthesized fallbacks ---
  function tone(type, f1, f2, dur, vol, delay){
    const t = ctx.currentTime + (delay||0), o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t); if(f2) o.frequency.exponentialRampToValueAtTime(f2, t+dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t+0.01); g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
    o.connect(g).connect(master); o.start(t); o.stop(t+dur+0.02);
  }
  function noise(dur, vol, freq, delay){
    const t = ctx.currentTime + (delay||0), len = Math.ceil(ctx.sampleRate*dur), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    for(let i=0;i<len;i++) d[i] = (Math.random()*2-1) * (1-i/len);
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = b; f.type = 'lowpass'; f.frequency.value = freq||1200; g.gain.value = vol;
    s.connect(f).connect(g).connect(master); s.start(t);
  }
  const SYNTH = {
    move:   () => { noise(0.18, 0.25, 500); tone('sawtooth', 90, 70, 0.18, 0.05) },
    turn:   () => tone('square', 260, 330, 0.09, 0.05),
    click:  () => tone('triangle', 700, 0, 0.05, 0.08),
    fire:   () => { noise(0.25, 0.5, 2500); tone('square', 420, 80, 0.2, 0.12) },
    boom:   () => { noise(0.6, 0.7, 600); tone('sine', 120, 40, 0.5, 0.3) },
    blast:  () => { noise(0.6, 0.7, 800); tone('sine', 100, 35, 0.5, 0.3) },
    crash:  () => { noise(0.3, 0.6, 900); tone('square', 140, 60, 0.25, 0.15) },
    hit:    () => { noise(0.5, 0.7, 700); tone('sawtooth', 200, 50, 0.45, 0.2) },
    collect:() => { tone('sine', 880, 0, 0.12, 0.2); tone('sine', 1320, 0, 0.18, 0.2, 0.08) },
    pickup: () => { tone('triangle', 520, 0, 0.1, 0.18); tone('triangle', 780, 0, 0.14, 0.18, 0.07) },
    win:    () => [523,659,784,1047].forEach((f,i) => tone('triangle', f, 0, 0.25, 0.2, i*0.12)),
    fail:   () => [392,330,262].forEach((f,i) => tone('triangle', f, 0, 0.25, 0.16, i*0.15)),
  };
  // A soft, slow loop used only when there is no music.mp3
  function startSynthMusic(){
    if(synthMusic) return;
    const notes = [220,262,330,262, 196,247,294,247, 175,220,262,220, 196,247,294,330];
    let i = 0;
    const step = () => { if(!muted) tone('triangle', notes[i%notes.length], 0, 0.45, 0.035); if(i%4===0 && !muted) tone('sine', notes[i%notes.length]/2, 0, 1.6, 0.03); i++ };
    step(); synthMusic = setInterval(step, 420);
  }

  function play(name){
    if(muted || !ac()) return;
    load();
    if(buffers[name]) playBuf(name); else if(SYNTH[name]) SYNTH[name]();
  }
  function music(on){
    wantMusic = on;
    if(!on){ if(musicSrc){ musicSrc.stop(); musicSrc=null } if(synthMusic){ clearInterval(synthMusic); synthMusic=null } return }
    if(muted || !ac()) return;
    load().then(() => {
      if(!wantMusic || muted || musicSrc || synthMusic) return;
      if(buffers.music) musicSrc = playBuf('music', true); else startSynthMusic();
    });
  }
  function setMuted(m){
    muted = m; try { localStorage.setItem(KEY, m?'1':'0') } catch(e){}
    if(master) master.gain.value = m ? 0 : 1;
    if(m){ const w = wantMusic; music(false); wantMusic = w } else if(wantMusic) music(true);
    document.querySelectorAll('.sound-toggle').forEach(paint);
  }
  const ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function paint(b){ b.innerHTML = (muted?OFF:ON)+'<span>'+(muted?'Sound off':'Sound on')+'</span>'; b.setAttribute('aria-pressed', String(!muted)); b.title = muted ? 'Turn sound on' : 'Turn sound off' }
  function button(){
    const b = document.createElement('button'); b.type = 'button'; b.className = 'btn sound-toggle';
    b.onclick = () => { setMuted(!muted); if(!muted) play('click') }; paint(b); return b;
  }
  // Browsers only allow sound after the first tap or key press.
  ['pointerdown','keydown'].forEach(ev => window.addEventListener(ev, function first(){ ac(); load(); if(wantMusic) music(true); window.removeEventListener(ev, first) }, {once:true}));

  window.Sfx = { play, music, button, get muted(){ return muted }, setMuted };
})();
