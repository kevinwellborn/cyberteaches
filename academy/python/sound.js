// Python Quest sound: action sounds, battle sounds, win/lose tunes and background music per world.
// If a clip exists in academy/python/sounds/<name>.mp3 it is used (for example ElevenLabs clips).
// List the clip names that exist in HAVE (so missing files are never requested).
// Otherwise the sound is made on the fly with Web Audio, so the game always has sound.
(function(){
  const CLIPS = ['step', 'jump', 'land', 'climb', 'gem', 'key', 'chest', 'drink', 'swing', 'clang', 'ko', 'hurt', 'shield', 'block',
                 'gate', 'bump', 'splash', 'lava', 'spikes', 'win', 'rescue', 'lose', 'click',
                 'music-jungle', 'music-river', 'music-lava', 'music-sea'];
  const HAVE = [];   // clip names from CLIPS that have an mp3 in sounds/
  const VOL = {step: 0.35, click: 0.4};
  const MUSIC_VOL = 0.7;
  let muted = false, musicOff = false;
  try { muted = localStorage.getItem('academy.muted') === '1'; musicOff = localStorage.getItem('pq.music') === 'off' } catch(e){}
  let ctx = null, master = null, sfxBus = null, musicBus = null, buffers = {}, loading = null;
  let want = null, playing = null, musicSrc = null, seqTimer = null, seqStep = 0, seqNext = 0;

  function ac(){
    if(!ctx){
      const A = window.AudioContext || window.webkitAudioContext; if(!A) return null;
      ctx = new A(); master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(ctx.destination);
      sfxBus = ctx.createGain(); sfxBus.connect(master);
      musicBus = ctx.createGain(); musicBus.gain.value = MUSIC_VOL; musicBus.connect(master);
    }
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function load(){
    if(loading || !ac()) return loading || Promise.resolve();
    loading = Promise.all(HAVE.filter(n => CLIPS.includes(n)).map(n => fetch('sounds/' + n + '.mp3?v=1')
      .then(r => r.ok ? r.arrayBuffer() : null)
      .then(b => b && new Promise(res => ctx.decodeAudioData(b, res, () => res(null))))
      .then(buf => { if(buf) buffers[n] = buf })
      .catch(() => {})));
    return loading;
  }

  // ---------- building blocks ----------
  function tone(type, f1, f2, dur, vol, delay, bus, at){
    const t = (at || ctx.currentTime) + (delay || 0), o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t); if(f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(bus || sfxBus); o.start(t); o.stop(t + dur + 0.03);
  }
  const noiseBuf = {};
  function noise(dur, vol, freq, delay, type, bus, at, q){
    const t = (at || ctx.currentTime) + (delay || 0), key = Math.round(dur * 100);
    if(!noiseBuf[key]){ const len = Math.ceil(ctx.sampleRate * dur), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0); for(let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; noiseBuf[key] = b }
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf[key]; f.type = type || 'lowpass'; f.frequency.value = freq || 1200; if(q) f.Q.value = q;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(bus || sfxBus); s.start(t); s.stop(t + dur + 0.02);
  }
  // a metal ring: a few detuned partials that fade out
  function metal(base, dur, vol, delay){ [1, 2.76, 5.4, 8.9].forEach((m, i) => tone(i ? 'sine' : 'triangle', base * m, base * m * 0.995, dur / (1 + i * 0.6), vol / (1 + i), delay)) }

  const SYNTH = {
    step:   () => noise(0.05, 0.25, 900, 0, 'bandpass', 0, 0, 2),
    jump:   () => { tone('square', 240, 640, 0.2, 0.06); noise(0.15, 0.08, 3000, 0, 'highpass') },
    land:   () => noise(0.12, 0.3, 400),
    climb:  () => { noise(0.08, 0.2, 700, 0); noise(0.08, 0.2, 800, 0.16); tone('triangle', 300, 420, 0.1, 0.05, 0.05) },
    gem:    () => { tone('sine', 1320, 0, 0.12, 0.16); tone('sine', 1760, 0, 0.2, 0.14, 0.07); tone('sine', 2640, 0, 0.25, 0.06, 0.12) },
    key:    () => { metal(1800, 0.25, 0.08); metal(2400, 0.3, 0.06, 0.08) },
    chest:  () => { tone('sawtooth', 110, 160, 0.35, 0.05); noise(0.3, 0.12, 500, 0); [784, 988, 1175, 1568].forEach((f, i) => tone('sine', f, 0, 0.3, 0.12, 0.3 + i * 0.07)) },
    drink:  () => { [0, 0.12, 0.24].forEach(d => tone('sine', 300, 700, 0.1, 0.1, d)); tone('sine', 600, 1200, 0.3, 0.08, 0.38) },
    swing:  () => noise(0.18, 0.35, 1800, 0, 'bandpass', 0, 0, 1.5),
    clang:  () => { noise(0.1, 0.35, 1800, 0, 'bandpass', 0, 0, 1.5); metal(520, 0.45, 0.16, 0.07); noise(0.08, 0.3, 4000, 0.07, 'highpass') },
    ko:     () => { noise(0.4, 0.4, 300); tone('sawtooth', 220, 55, 0.5, 0.12); [523, 659, 784].forEach((f, i) => tone('triangle', f, 0, 0.18, 0.1, 0.35 + i * 0.08)) },
    hurt:   () => { noise(0.2, 0.35, 600); tone('square', 180, 70, 0.25, 0.12) },
    shield: () => { metal(330, 0.3, 0.1); noise(0.1, 0.15, 900) },
    block:  () => { metal(260, 0.5, 0.2); noise(0.1, 0.35, 2500, 0, 'highpass') },
    gate:   () => { tone('sawtooth', 70, 110, 0.6, 0.06); noise(0.6, 0.12, 300); metal(900, 0.2, 0.05, 0.55) },
    bump:   () => { noise(0.12, 0.35, 250); tone('sine', 110, 60, 0.15, 0.2) },
    splash: () => { noise(0.7, 0.5, 1400, 0.05); noise(0.35, 0.35, 3500, 0.05, 'highpass'); [0, 0.12, 0.2, 0.32].forEach((d, i) => tone('sine', 600 + i * 220, 1400 + i * 300, 0.06, 0.06, 0.25 + d)) },
    lava:   () => { noise(1.1, 0.45, 2500, 0.05, 'highpass'); noise(0.6, 0.4, 300, 0.05); [0, 0.2, 0.45].forEach(d => tone('sine', 90, 140, 0.12, 0.1, 0.3 + d)) },
    spikes: () => { metal(1400, 0.15, 0.08); noise(0.2, 0.3, 700) },
    win:    () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => { tone('triangle', f, 0, i > 3 ? 0.5 : 0.2, 0.14, i * 0.11); tone('sine', f / 2, 0, 0.2, 0.06, i * 0.11) }),
    rescue: () => { SYNTH.win(); [1319, 1568, 2093].forEach((f, i) => tone('sine', f, 0, 0.35, 0.07, 0.75 + i * 0.1)) },
    lose:   () => [392, 370, 349, 262].forEach((f, i) => tone('triangle', f, f * 0.98, i === 3 ? 0.7 : 0.25, 0.13, i * 0.2)),
    click:  () => tone('triangle', 700, 0, 0.05, 0.08),
  };

  function play(name){
    if(muted || !ac()) return;
    load();
    try {
      if(buffers[name]){ const s = ctx.createBufferSource(), g = ctx.createGain(); s.buffer = buffers[name]; g.gain.value = VOL[name] || 0.8; s.connect(g).connect(sfxBus); s.start() }
      else if(SYNTH[name]) SYNTH[name]();
    } catch(e){}
  }

  // ---------- music: a short loop per world, made from notes ----------
  const N = s => 220 * Math.pow(2, s / 12);   // semitones above A3
  const SONGS = {
    // happy jungle: marimba melody, soft bass, shaker
    jungle: {bpm: 104, mel: [3, null, 7, 10, 12, null, 10, 7, 5, null, 7, 3, 0, null, null, null, 3, null, 7, 10, 15, null, 12, 10, 12, 10, 7, null, 5, null, 3, null],
             bass: [-21, -21, -16, -16, -19, -19, -14, -14], drum: 'jungle', inst: 'marimba'},
    // river: flowing arpeggios
    river:  {bpm: 96, mel: [5, 9, 12, 17, 12, 9, 5, 9, 3, 7, 10, 15, 10, 7, 3, 7, 0, 5, 9, 12, 9, 5, 0, 5, 3, 7, 10, 14, 12, 10, 7, 5],
             bass: [-19, -19, -21, -21, -24, -24, -21, -21], drum: 'soft', inst: 'pluck'},
    // lava: low and tense, minor
    lava:   {bpm: 84, mel: [0, null, null, 3, null, null, 2, null, 0, null, null, -2, null, null, -5, null, 0, null, null, 3, null, 7, 5, null, 3, null, 2, null, 0, null, null, null],
             bass: [-24, -24, -24, -24, -26, -26, -29, -27], drum: 'deep', inst: 'bell'},
    // sea: slow and dreamy
    sea:    {bpm: 72, mel: [12, null, 10, null, 7, null, null, null, 5, null, 7, null, 3, null, null, null, 12, null, 14, null, 15, null, null, null, 14, null, 10, null, 7, null, null, null],
             bass: [-21, -21, -16, -16, -19, -19, -17, -17], drum: 'none', inst: 'pad'},
  };
  function inst(kind, f, at, len){
    if(kind === 'marimba'){ tone('sine', f, 0, 0.35, 0.11, 0, musicBus, at); tone('sine', f * 4, 0, 0.06, 0.03, 0, musicBus, at) }
    else if(kind === 'pluck'){ tone('triangle', f, 0, 0.4, 0.08, 0, musicBus, at); tone('sine', f * 2, 0, 0.2, 0.03, 0, musicBus, at) }
    else if(kind === 'bell'){ tone('sine', f, 0, 0.9, 0.07, 0, musicBus, at); tone('sine', f * 2.76, 0, 0.4, 0.02, 0, musicBus, at) }
    else { tone('sine', f, 0, len * 2, 0.06, 0, musicBus, at); tone('triangle', f * 1.005, 0, len * 2, 0.03, 0, musicBus, at) }
  }
  function tick(){
    const song = SONGS[playing]; if(!song) return;
    const st = 60 / song.bpm / 2;   // eighth notes
    while(seqNext < ctx.currentTime + 0.25){
      const i = seqStep % song.mel.length, at = seqNext, m = song.mel[i];
      if(m !== null && m !== undefined) inst(song.inst, N(m), at, st);
      if(i % 4 === 0){ const b = N(song.bass[(i / 4) % song.bass.length]); tone('triangle', b, 0, st * 3.5, 0.13, 0, musicBus, at); tone('sine', b / 2, 0, st * 3.5, 0.1, 0, musicBus, at) }
      if(song.drum === 'jungle'){ if(i % 2 === 1) noise(0.04, 0.05, 6000, 0, 'highpass', musicBus, at); if(i % 8 === 0) tone('sine', 140, 60, 0.18, 0.18, 0, musicBus, at); if(i % 8 === 6) tone('sine', 220, 120, 0.12, 0.08, 0, musicBus, at) }
      else if(song.drum === 'soft'){ if(i % 4 === 2) noise(0.06, 0.04, 5000, 0, 'highpass', musicBus, at); if(i % 8 === 0) tone('sine', 120, 60, 0.2, 0.12, 0, musicBus, at) }
      else if(song.drum === 'deep'){ if(i % 8 === 0 || i % 8 === 3) tone('sine', 80, 40, 0.4, 0.22, 0, musicBus, at); if(i % 16 === 12) noise(0.5, 0.05, 400, 0, 'lowpass', musicBus, at) }
      seqStep++; seqNext += st;
    }
  }
  function stopMusic(){
    if(musicSrc){ try { musicSrc.stop() } catch(e){} musicSrc = null }
    if(seqTimer){ clearInterval(seqTimer); seqTimer = null }
    playing = null;
  }
  function startMusic(){
    if(!want || muted || musicOff || !ac()) return stopMusic();
    if(playing === want) return;
    stopMusic(); const name = want;
    load().then(() => {
      if(want !== name || muted || musicOff || playing) return;
      playing = name;
      if(buffers['music-' + name]){ const s = ctx.createBufferSource(); s.buffer = buffers['music-' + name]; s.loop = true; s.connect(musicBus); s.start(); musicSrc = s }
      else { seqStep = 0; seqNext = ctx.currentTime + 0.1; tick(); seqTimer = setInterval(tick, 100) }
    });
  }
  // world = 'jungle' | 'river' | 'lava' | 'sea', or null to stop
  function music(world){ want = world ? (SONGS[world] ? world : 'jungle') : null; if(ctx || !want) startMusic() }
  function setMuted(m){ muted = m; if(master) master.gain.value = m ? 0 : 1; startMusic() }
  function setMusicOff(off){ musicOff = off; try { localStorage.setItem('pq.music', off ? 'off' : 'on') } catch(e){} startMusic() }
  // quieter music while the narrator talks
  function duck(on){ if(musicBus) musicBus.gain.setTargetAtTime(on ? MUSIC_VOL * 0.25 : MUSIC_VOL, ctx.currentTime, 0.2) }
  // Browsers only allow sound after the first tap or key press.
  ['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, function first(){ ac(); load(); startMusic(); ['pointerdown', 'keydown'].forEach(x => window.removeEventListener(x, first)) }));

  window.PQSound = {play, music, setMuted, setMusicOff, duck, get musicOff(){ return musicOff }};
})();
