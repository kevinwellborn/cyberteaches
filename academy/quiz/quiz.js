// Shared helpers for the live quiz battle (teacher host screen and student device).
// Data: quizzes/{pin} {hostUid, lesson, state: lobby|question|reveal|board|end, q, time, startedAt}
//       quizzes/{pin}/players/{uid} {name, score, last: {q, choice, correct, pts}, streak}
//       quizzes/{pin}/answers/{q_uid} {uid, q, choice, at}  (one answer per question; the host scores them)
const $ = (s, r) => (r || document).querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const SHAPES = [
  '<svg class="shape" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 37 35H3z" fill="#fff"/></svg>',
  '<svg class="shape" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 38 20 20 38 2 20z" fill="#fff"/></svg>',
  '<svg class="shape" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#fff"/></svg>',
  '<svg class="shape" viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fff"/></svg>'];
const SHAPE_NAMES = ['triangle', 'diamond', 'circle', 'square'];
const shortName = n => { const w = String(n || 'Student').trim().split(/\s+/); return (w.length > 1 ? w[0] + ' ' + w[w.length - 1][0] + '.' : w[0]).slice(0, 40) };
const quizRef = pin => Cloud.db.collection('quizzes').doc(pin);
const TS = () => firebase.firestore.FieldValue.serverTimestamp();
// Points: 1000 for an instant correct answer, down to 500 at the buzzer, plus 100 per answer in a streak (up to 300).
function points(ms, seconds, streak){
  const f = Math.min(1, Math.max(0, ms / (seconds * 1000)));
  return Math.round(1000 * (1 - f / 2)) + Math.min(300, 100 * Math.max(0, streak - 1));
}
function optButton(i, body, tag, extraClass, tail){
  return `<${tag || 'div'} class="opt o${i} ${extraClass || ''}" data-i="${i}" aria-label="${SHAPE_NAMES[i]}">${SHAPES[i]}<span class="body">${body}</span>${tail || ''}</${tag || 'div'}>`;
}
const G_ICON = '<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true" style="vertical-align:-4px;margin-right:8px"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

// ---------- winners podium (teacher screen and student device) ----------
// Stairs: 2nd on the left, 1st in the middle (tallest), 3rd on the right. They appear one at a time,
// 3rd, then 2nd, then a drum roll and 1st, with music when `sound` is on. Returns a function that stops the show.
const ordinal = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
function podium(box, ranked, opts){
  opts = opts || {}; const S = opts.sound, quick = !!opts.quick, timers = [];
  const step = (p, k) => p ? `<div class="step p${k}${quick ? ' show' : ''}${opts.me === p.uid ? ' mine' : ''}" data-k="${k}">
      <div class="who"><span class="medal m${k}">${k}</span><span class="nm">${esc(p.name)}</span><span class="pts">${p.score || 0} pts</span></div>
      <div class="block"><span class="place">${ordinal(k)}</span></div></div>` : '';
  box.innerHTML = `<div class="stairs">${step(ranked[1], 2)}${step(ranked[0], 1)}${step(ranked[2], 3)}</div>`;
  if(quick) return () => {};
  const at = (sec, fn) => timers.push(setTimeout(fn, sec * 1000));
  const show = k => { const el = box.querySelector('.step.p' + k); if(el) el.classList.add('show'); return !!el };
  if(S){ S.track(null); S.play('drumroll', 2.2) }
  at(2.2, () => show(3));
  at(3.6, () => { if(show(2) && S) S.play('cymbal') });
  at(4.4, () => { if(S) S.play('drumroll', 2.4) });
  at(6.8, () => { show(1); if(S) S.play('fanfare'); confetti(); if(opts.done) opts.done() });
  at(9.2, () => { if(S) S.track('ceremony') });
  return () => { timers.forEach(clearTimeout); const c = document.getElementById('confetti'); if(c) c.remove() };
}
function confetti(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let cv = document.getElementById('confetti'); if(cv) cv.remove();
  cv = document.createElement('canvas'); cv.id = 'confetti'; document.body.appendChild(cv);
  const g = cv.getContext('2d'), W = cv.width = innerWidth, H = cv.height = innerHeight;
  const colors = ['#F2C14A', '#D64545', '#2F6FDE', '#2E9363', '#ffffff', '#D99A06'];
  const bits = Array.from({length: 180}, () => ({x: Math.random() * W, y: -20 - Math.random() * H, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3,
    r: Math.random() * 6, vr: (Math.random() - .5) * .3, w: 6 + Math.random() * 6, h: 10 + Math.random() * 8, c: colors[Math.floor(Math.random() * colors.length)]}));
  const t0 = performance.now();
  (function frame(t){
    if(!cv.isConnected) return; g.clearRect(0, 0, W, H);
    bits.forEach(b => { b.x += b.vx; b.y += b.vy; b.r += b.vr; if(b.y > H + 20 && t - t0 < 5000){ b.y = -20; b.x = Math.random() * W }
      g.save(); g.translate(b.x, b.y); g.rotate(b.r); g.fillStyle = b.c; g.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); g.restore() });
    if(t - t0 < 9000) requestAnimationFrame(frame); else cv.remove();
  })(t0);
}
