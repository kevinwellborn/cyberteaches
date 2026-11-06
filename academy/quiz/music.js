// Music and sound effects for Quiz Battle, made on the fly with Web Audio (no files needed).
// Tracks loop: lobby, question, ceremony. Effects: join, tick, gong, drumroll, cymbal, fanfare, correct, wrong.
// To use a real recording instead, put an mp3 with the same name in academy/quiz/sounds/ (for example lobby.mp3)
// and add its name to CLIPS below (so pages don't ask for files that aren't there).
// Browsers only allow sound after a click or tap, so the first tap on the page turns sound on.
(function(){
  const NAMES = ['lobby', 'question', 'ceremony', 'join', 'tick', 'gong', 'drumroll', 'cymbal', 'fanfare', 'correct', 'wrong'];
  const CLIPS = [];   // for example ['lobby', 'ceremony']
  const TRACKS = {};
  let ctx = null, master = null, musicBus = null, fxBus = null, muted = false, key = 'quiz.muted', clips = {}, loading = null;
  let want = null, playing = null, seq = null, clipSrc = null;

  const QS = window.QuizSound = {
    // Students start with sound off (a room full of phones is loud); the teacher's screen starts with it on.
    init(opts){ key = opts && opts.key || key; let m = opts && opts.defaultMuted ? '1' : '0';
      try { const v = localStorage.getItem(key); if(v != null) m = v } catch(e){}
      muted = m === '1'; return QS },
    get muted(){ return muted },
    setMuted(m){ muted = !!m; try { localStorage.setItem(key, muted ? '1' : '0') } catch(e){}
      if(master) master.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.05);
      if(!muted){ ac(); startWanted() } else stopTrack();
      QS.onchange && QS.onchange(muted) },
    // A small on/off button. label: words after the icon.
    button(el, label){
      const draw = () => { el.textContent = (muted ? '🔇 ' : '🔊 ') + (label || 'Sound') + (muted ? ' off' : ' on'); el.setAttribute('aria-pressed', String(!muted)) };
      el.onclick = () => QS.setMuted(!muted); const prev = QS.onchange; QS.onchange = m => { prev && prev(m); draw() }; draw();
    },
    track(name){ want = name || null; if(want === playing) return; stopTrack(); startWanted() },
    play(name, arg){ if(muted || !ac()) return; load();
      if(clips[name]) return playClip(name, false, fxBus);
      if(FX[name]) FX[name](arg) },
    unlock(){ ac(); startWanted() }
  };

  function ac(){
    if(!ctx){
      const C = window.AudioContext || window.webkitAudioContext; if(!C) return null;
      ctx = new C();
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; comp.connect(ctx.destination);
      master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(comp);
      musicBus = ctx.createGain(); musicBus.gain.value = 0.55; musicBus.connect(master);
      fxBus = ctx.createGain(); fxBus.gain.value = 0.9; fxBus.connect(master);
    }
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  document.addEventListener('pointerdown', () => { if(!muted){ ac(); load(); startWanted() } }, true);
  document.addEventListener('keydown', () => { if(!muted){ ac(); startWanted() } }, true);

  function load(){
    if(loading || !ctx) return loading || Promise.resolve();
    loading = Promise.all(CLIPS.filter(n => NAMES.includes(n)).map(n => fetch('sounds/' + n + '.mp3?v=1').then(r => r.ok ? r.arrayBuffer() : null)
      .then(b => b && new Promise(res => ctx.decodeAudioData(b, res, () => res(null)))).then(buf => { if(buf) clips[n] = buf }).catch(() => {})));
    return loading;
  }
  function playClip(name, loop, bus){
    const s = ctx.createBufferSource(); s.buffer = clips[name]; s.loop = loop; s.connect(bus); s.start(); return s;
  }

  // ---------- instruments ----------
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  let noiseBuf = null;
  function noiseSrc(){
    if(!noiseBuf){ const n = ctx.sampleRate; noiseBuf = ctx.createBuffer(1, n, n); const d = noiseBuf.getChannelData(0); for(let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1 }
    const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; return s;
  }
  function env(g, t, a, peak, d){ g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d) }
  function osc(type, f, t, dur, vol, bus, opts){
    opts = opts || {};
    const g = ctx.createGain(); env(g, t, opts.a || 0.005, vol, dur);
    let out = g;
    if(opts.lp){ const f2 = ctx.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = opts.lp; f2.Q.value = opts.q || 0.7; g.connect(f2); out = f2 }
    out.connect(bus);
    (opts.detune ? [-opts.detune, opts.detune] : [0]).forEach(dt => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = dt;
      if(opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
      o.connect(g); o.start(t); o.stop(t + (opts.a || 0.005) + dur + 0.05);
    });
  }
  function hiss(t, dur, vol, bus, type, freq, q){
    const s = noiseSrc(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = type || 'highpass'; f.frequency.value = freq || 7000; f.Q.value = q || 0.7; env(g, t, 0.002, vol, dur);
    s.connect(f).connect(g).connect(bus); s.start(t); s.stop(t + dur + 0.05);
  }
  const kick = (t, v, b) => osc('sine', 150, t, 0.22, v || 0.9, b, {to: 42});
  const snare = (t, v, b) => { hiss(t, 0.14, (v || 0.5), b, 'bandpass', 1800, 0.8); osc('triangle', 210, t, 0.08, (v || 0.5) * 0.5, b, {to: 140}) };
  const hat = (t, v, b) => hiss(t, 0.04, v || 0.16, b, 'highpass', 8000);
  const bass = (t, m, dur, v, b) => osc('sawtooth', hz(m), t, dur, v || 0.35, b, {lp: 520, q: 4});
  const pluck = (t, m, dur, v, b) => osc('square', hz(m), t, dur, v || 0.08, b, {lp: 2400});
  const bell = (t, m, dur, v, b) => { osc('sine', hz(m), t, dur, v || 0.14, b); osc('sine', hz(m) * 2.01, t, dur * 0.6, (v || 0.14) * 0.3, b) };
  const pad = (t, ms, dur, v, b) => ms.forEach(m => osc('triangle', hz(m), t, dur, v || 0.05, b, {a: 0.08, detune: 6}));
  const brass = (t, m, dur, v, b) => osc('sawtooth', hz(m), t, dur, v || 0.12, b, {a: 0.03, lp: 2200, detune: 8});

  // ---------- tracks (16 steps per bar) ----------
  // Chords as MIDI notes. C=60.
  const C = [60, 64, 67], Am = [57, 60, 64], F = [53, 57, 60], G = [55, 59, 62], Em = [52, 55, 59], Dm = [50, 53, 57];
  TRACKS.lobby = { bpm: 104, bars: [C, Am, F, G], vol: 0.9,
    step(t, i, bar, ch, s, b){
      if(i === 0 || i === 10) kick(t, 0.55, b);
      if(i === 4 || i === 12) snare(t, 0.22, b);
      if(i % 4 === 2) hat(t, 0.12, b);
      if(i === 0) pad(t, ch, s * 15, 0.035, b);
      if(i % 4 === 0 || i === 6) bass(t, ch[0] - 24, s * 1.6, 0.28, b);
      const arp = [0, 1, 2, 1, 2, 0, 1, 2]; if(i % 2 === 0) bell(t, ch[arp[i / 2]] + 12, s * 2, 0.07, b);
      const mel = [[76, null, 74, 72, null, 74, 76, 79], [76, null, 72, null, 69, 72, null, 74], [72, null, 69, 72, null, 77, 76, 74], [74, null, 71, 74, null, 79, 77, 74]][bar];
      if(i % 2 === 0 && mel[i / 2] && (bar % 2 === 1 || i < 8)) pluck(t, mel[i / 2], s * 1.6, 0.05, b);
    }};
  TRACKS.question = { bpm: 138, bars: [Am, F, C, G], vol: 0.8,
    step(t, i, bar, ch, s, b){
      if(i % 4 === 0) kick(t, 0.8, b);
      if(i === 4 || i === 12) snare(t, 0.35, b);
      hat(t, i % 2 ? 0.07 : 0.14, b);
      if(i % 2 === 0) bass(t, ch[0] - 24 + (i % 8 === 6 ? 12 : 0), s * 1.2, 0.32, b);
      if(i % 4 === 2) pad(t, ch.map(m => m + 12), s * 1.2, 0.03, b);
      const riff = [0, 2, 1, 2, 0, 2, 1, 2]; if(i % 2 === 1) pluck(t, ch[riff[(i - 1) / 2]] + 12, s, 0.045, b);
    }};
  TRACKS.ceremony = { bpm: 112, bars: [C, F, G, C, Am, F, G, C], vol: 1,
    step(t, i, bar, ch, s, b){
      if(i === 0 || i === 8) kick(t, 0.8, b);
      if(i === 4 || i === 12 || i === 14) snare(t, i === 14 ? 0.2 : 0.4, b);
      if(i % 2 === 0) hat(t, 0.08, b);
      if(i === 0 || i === 8) pad(t, ch, s * 7, 0.04, b);
      if(i % 4 === 0) bass(t, ch[0] - 24, s * 3, 0.3, b);
      if(i === 0) ch.forEach(m => brass(t, m, s * 3, 0.07, b));
      const tune = [[67, null, 67, 72, null, null, 76, null], [77, null, 76, 74, null, 72, null, null], [74, null, 74, 79, null, 77, 76, 74], [72, null, null, null, 67, 72, 76, 79],
        [76, null, 72, 69, null, 72, 76, null], [77, null, 76, 77, null, 81, null, null], [79, null, 77, 76, null, 74, 71, 74], [72, null, null, null, null, null, null, null]][bar];
      if(i % 2 === 0 && tune[i / 2]) brass(t, tune[i / 2], s * 1.8, 0.1, b);
    }};

  function startWanted(){
    if(!want || muted || !ctx || ctx.state !== 'running' || playing === want) return;
    stopTrack(); playing = want;
    const bus = ctx.createGain(); bus.gain.value = 0.0001; bus.connect(musicBus);
    bus.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.4);
    if(clips[want]){ clipSrc = {src: playClip(want, true, bus), bus}; return }
    const T = TRACKS[want]; if(!T) return;
    const s = 60 / T.bpm / 4; let n = 0, next = ctx.currentTime + 0.08;
    const tick = () => { while(next < ctx.currentTime + 0.15){ const bar = Math.floor(n / 16) % T.bars.length; T.step(next, n % 16, bar, T.bars[bar], s, bus); next += s; n++ } };
    tick(); seq = {timer: setInterval(tick, 30), bus};
    load().then(() => { if(playing === want && clips[want] && seq){ const w = want; stopTrack(); want = w; startWanted() } });
  }
  function fade(bus){ try { bus.gain.cancelScheduledValues(ctx.currentTime); bus.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12); setTimeout(() => bus.disconnect(), 900) } catch(e){} }
  function stopTrack(){
    if(seq){ clearInterval(seq.timer); fade(seq.bus); seq = null }
    if(clipSrc){ const c = clipSrc; fade(c.bus); setTimeout(() => { try { c.src.stop() } catch(e){} }, 900); clipSrc = null }
    playing = null;
  }

  // ---------- effects ----------
  const now = () => ctx.currentTime + 0.01;
  const FX = {
    join(){ const t = now(); osc('sine', 660, t, 0.12, 0.25, fxBus, {to: 990}) },
    tick(){ const t = now(); osc('square', 1500, t, 0.03, 0.12, fxBus, {lp: 3000}); osc('sine', 900, t, 0.05, 0.15, fxBus) },
    gong(){ const t = now(); hiss(t, 0.5, 0.25, fxBus, 'bandpass', 3000, 0.6); [C, [48, 55, 64]].forEach((ch, k) => ch.forEach(m => brass(t + k * 0.12, m + 12, 0.7, 0.12, fxBus))); kick(t + 0.12, 0.9, fxBus) },
    cymbal(){ const t = now(); hiss(t, 1.6, 0.35, fxBus, 'highpass', 5000); kick(t, 1, fxBus) },
    // Snare roll that gets louder for `sec` seconds, ending in a cymbal.
    drumroll(sec){ sec = sec || 2; const t = now(), n = Math.floor(sec / 0.045);
      for(let k = 0; k < n; k++) hiss(t + k * 0.045, 0.06, 0.08 + 0.32 * k / n, fxBus, 'bandpass', 2000, 0.7);
      hiss(t + sec, 1.6, 0.4, fxBus, 'highpass', 5000); kick(t + sec, 1, fxBus) },
    fanfare(){ const t = now(), s = 0.13;
      [[67, 0], [67, 1], [67, 2], [72, 3], [76, 6], [79, 9]].forEach(([m, k]) => brass(t + k * s, m, k > 5 ? 1.4 : s * 0.9, 0.16, fxBus));
      [60, 64, 67, 72].forEach(m => brass(t + 9 * s, m, 1.6, 0.08, fxBus)); hiss(t + 9 * s, 1.8, 0.3, fxBus, 'highpass', 5000); kick(t + 9 * s, 1, fxBus) },
    correct(){ const t = now(); [72, 76, 79, 84].forEach((m, k) => bell(t + k * 0.08, m, 0.3, 0.2, fxBus)) },
    wrong(){ const t = now(); osc('sawtooth', 220, t, 0.4, 0.12, fxBus, {to: 110, lp: 900}) }
  };
})();
