// Builds teacher resources (slides, classwork, lesson plan) for academy lessons from tools/teacher-resources/lessons.js.
// Run: node tools/teacher-resources/build.js   (writes academy/resources/lesson-N/*.html for every lesson in lessons.js)
// Lesson 1 is hand-written and not generated. Puzzle maps and answers come from academy/course.js and academy/answer-key.js,
// and every trace answer and program in the classwork is checked with a small simulator, so the build fails on a wrong answer.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ctx = {};
new Function('ctx', fs.readFileSync(path.join(ROOT, 'academy/course.js'), 'utf8') + ';ctx.UNITS=UNITS;ctx.LEVELS=LEVELS;ctx.ORDER=ORDER;')(ctx);
global.window = {}; require(path.join(ROOT, 'academy/answer-key.js')); const KEY = window.decodeAnswerKey();
const { UNITS, LEVELS, ORDER } = ctx;
const LESSONS = require('./lessons.js');

// ---------- programs ----------
const NAMES = { forward: 'F', left: 'L', right: 'R', collect: 'C', fire: 'X' };
const COND = { ahead: 'path ahead', left: 'path left', right: 'path right', crystal: 'crystal here', tank: 'tank ahead' };
const LABEL = { forward: ['move', 'move forward'], left: ['move', 'turn left'], right: ['move', 'turn right'], collect: ['act', 'collect crystal'], fire: ['act', 'fire cannon'] };
function txt(p) {
  return p.map(n => {
    if (NAMES[n.type]) return NAMES[n.type];
    if (n.type === 'repeat') return `repeat ${n.n} [ ${txt(n.body)} ]`;
    if (n.type === 'until') return `until flag [ ${txt(n.body)} ]`;
    if (n.type === 'untilclear') return `until no tanks [ ${txt(n.body)} ]`;
    if (n.type === 'iftank') return `if tank [ ${txt(n.body)} ]`;
    if (n.type === 'ifelse') return `if ${COND[n.cond]} [ ${txt(n.body)} ]` + (n.elseBody && n.elseBody.length ? ` else [ ${txt(n.elseBody)} ]` : '');
    throw new Error('unknown block ' + n.type);
  }).join(' ');
}
const count = p => p.reduce((s, n) => s + 1 + count(n.body || []) + count(n.elseBody || []), 0);
function blocks(p) {
  return p.map(n => {
    if (LABEL[n.type]) return `<span class="blk ${LABEL[n.type][0]}">${LABEL[n.type][1]}</span>`;
    const box = (cls, head, body, extra = '') => `<div class="rep ${cls}"><div class="head">${head}</div><div class="inner">${blocks(body) || '&nbsp;'}</div>${extra}</div>`;
    if (n.type === 'repeat') return box('', `repeat <span class="num">${n.n}</span> times`, n.body);
    if (n.type === 'until') return box('', 'repeat until at flag', n.body);
    if (n.type === 'untilclear') return box('', 'repeat until no tanks left', n.body);
    if (n.type === 'iftank') return box('logic', 'if tank ahead', n.body);
    if (n.type === 'ifelse') return box('logic', `if ${COND[n.cond]}`, n.body, `<div class="elsel">else</div><div class="inner">${blocks(n.elseBody || []) || '&nbsp;'}</div>`);
  }).join('');
}

// ---------- simulator (same rules as the game, without enemy fire) ----------
const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], TD = { '^': 0, '>': 1, 'v': 2, '<': 3 };
function simulate(map, dir, prog) {
  const g = map.map(r => [...r]); let x, y; const gems = new Set(), tanks = new Map(); let goal = null;
  g.forEach((r, yy) => r.forEach((c, xx) => { const k = xx + ',' + yy;
    if (c === 'S') { x = xx; y = yy } if (c === '*') gems.add(k); if (c === 'G') goal = k; if (c in TD) tanks.set(k, TD[c]); }));
  let fail = null, steps = 0, collected = 0, destroyed = 0;
  const rock = (a, b) => !g[b] || g[b][a] === undefined || g[b][a] === '#';
  const blocked = (a, b) => rock(a, b) || tanks.has(a + ',' + b);
  const atFlag = () => goal === x + ',' + y;
  const hasGoal = gems.size > 0 || tanks.size > 0 || !!goal;
  const won = () => hasGoal && gems.size === 0 && tanks.size === 0 && (!goal || atFlag());
  const ahead = () => { let a = x, b = y; for (;;) { a += DX[dir]; b += DY[dir]; if (rock(a, b)) return null; if (tanks.has(a + ',' + b)) return a + ',' + b } };
  const cond = c => c === 'crystal' ? gems.has(x + ',' + y) : c === 'tank' ? !!ahead() : !blocked(x + DX[(dir + { ahead: 0, left: 3, right: 1 }[c]) % 4], y + DY[(dir + { ahead: 0, left: 3, right: 1 }[c]) % 4]);
  class Stop {}
  function act(t) {
    if (++steps > 2000) { fail = 'stuck in a loop'; throw new Stop }
    if (t === 'forward') { const a = x + DX[dir], b = y + DY[dir]; if (blocked(a, b)) { fail = 'crashes'; throw new Stop } x = a; y = b }
    else if (t === 'left') dir = (dir + 3) % 4; else if (t === 'right') dir = (dir + 1) % 4;
    else if (t === 'collect') { const k = x + ',' + y; if (!gems.has(k)) { fail = 'nothing to collect'; throw new Stop } gems.delete(k); collected++ }
    else if (t === 'fire') { const k = ahead(); if (k) { tanks.delete(k); destroyed++ } }
    if (won()) throw new Stop;
  }
  function run(p) { for (const n of p) {
    if (n.type === 'repeat') { for (let i = 0; i < n.n; i++) run(n.body) }
    else if (n.type === 'until') { while (!atFlag()) { if (++steps > 2000) { fail = 'stuck in a loop'; throw new Stop } run(n.body) } }
    else if (n.type === 'untilclear') { while (tanks.size) { if (++steps > 2000) { fail = 'stuck in a loop'; throw new Stop } run(n.body) } }
    else if (n.type === 'iftank') { if (ahead()) run(n.body) }
    else if (n.type === 'ifelse') run(cond(n.cond) ? n.body : (n.elseBody || []));
    else act(n.type);
  } }
  try { run(prog) } catch (e) { if (!(e instanceof Stop)) throw e }
  return { x, y, dir, fail, won: !fail && won(), collected, left: gems.size, destroyed, tanksLeft: tanks.size, atFlag: atFlag() };
}

// ---------- helpers for page templates ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const board = (map, dir, cell, extra = '') => `<div class="board" data-map="${esc(map.join('|'))}" data-dir="${dir}"${cell ? ` data-cell="${cell}"` : ''}${extra}></div>`;
const lvl = (u, k) => ORDER.find(l => l.unit === u && l.k === k);
const solOf = l => KEY[l.n];
const HEAD = (title, css) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="../../../favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="../resources.css">
<link rel="stylesheet" href="../${css}">
</head>
<body>
`;
const NOTATION = L => `<span><b>F</b> = move forward</span><span><b>L</b> = turn left</span><span><b>R</b> = turn right</span>${L.notation.includes('C') ? '<span><b>C</b> = collect crystal</span>' : ''}${L.notation.includes('X') ? '<span><b>X</b> = fire cannon</span>' : ''}${L.legend.map(t => `<span><b>${esc(t[0])}</b> = ${esc(t[1])}</span>`).join('')}`;

// ---------- slides ----------
function slidesPage(L, u) {
  const S = [];
  const add = (kicker, title, body, note, cls = '') => S.push({ kicker, title, body, note, cls });
  S.push({ raw: `<section class="slide title-slide">
  <span class="label" style="font-size:22px">CyberTeaches Academy · Lesson ${u.n}</span>
  <h1 style="margin:18px 0 22px">${L.titleHtml}</h1>
  <p style="font-size:32px;max-width:900px">${L.tagline}</p>
  <div class="foot"><span>cyberteaches.com/academy</span><span>Press → to start</span></div>
  <div class="note">${L.notes.title}</div>
</section>` });
  add('Today we will', 'Learning goals', `<ul class="big" style="font-weight:400;font-size:34px">${L.goals.map(g => `<li>${g}</li>`).join('')}</ul>`, 'Read the goals aloud. Students check them off with the exit ticket at the end.');
  add(`Warm-up · ${L.warmup.time}`, L.warmup.title, L.warmup.body, L.warmup.note);
  if (L.review) add('Quick review', L.review.title, L.review.body, L.review.note);
  L.concepts.forEach(c => add(c.kicker, c.title, c.body, c.note));
  L.together.forEach((t, i) => {
    const l = lvl(u.n, t.k), sol = t.sol || solOf(l), map = l.map;
    const cell = Math.max(48, Math.min(110, Math.floor(Math.min(560 / map[0].length, 440 / map.length))));
    add(`${i === 0 ? "Let's try together" : 'Think, pair, share'} · Puzzle ${u.n}.${t.k}`, l.title, `<div class="row">
      ${board(map, l.dir, cell + 'px')}
      <div class="grow"><p>${t.ask || esc(l.goal)}</p>
        <div class="prog reveal" style="font-size:${count(sol) > 6 ? 21 : 26}px">${blocks(sol)}</div>
        <p class="reveal" style="margin-top:16px"><span class="count">${count(sol)} blocks</span>${t.after ? ` <span class="muted">${t.after}</span>` : ''}</p></div></div>`,
      t.note + ' Press → to reveal the answer.');
  });
  add('When it doesn\'t work', 'Debugging tips', `<ul style="font-size:30px">${L.tips.map(t => `<li>${t}</li>`).join('')}</ul>`, L.notes.tips);
  add('Classwork · 12 minutes', 'Unplugged practice', `<div class="row"><div class="grow"><p>Use the worksheet. Write programs with letters:</p>
    <p class="code" style="font-size:28px;line-height:1.5">F = move forward &nbsp; L = turn left &nbsp; R = turn right${L.notation.includes('C') ? '<br>C = collect crystal' : ''}${L.notation.includes('X') ? '<br>X = fire cannon' : ''}</p>
    ${L.legend.map(t => `<p class="code" style="font-size:26px;margin:0 0 6px">${esc(t[0])}</p>`).join('')}</div>
    <div class="box" style="width:400px"><p class="big" style="margin:0 0 8px">Parts</p><p style="margin:0">A. Trace the rover<br>B. Write the program<br>C. ${L.partC.title}<br>D. Design your own</p></div></div>`,
    `Hand out the Lesson ${u.n} classwork. Students can work in pairs. Part D is a challenge for early finishers. The answer key is on the last page.`);
  S.push({ raw: `<section class="slide title-slide">
  <span class="label" style="font-size:22px">Your turn</span>
  <h1 style="margin:18px 0 22px">Now <em>code</em> it!</h1>
  <p style="font-size:34px">Go to <b>cyberteaches.com/academy</b>, sign in, and solve puzzles <b>${u.n}.1 to ${u.n}.10</b>.</p>
  <p style="font-size:28px;opacity:.85">${L.codeTip}</p>
  <div class="note">${L.notes.code}</div>
</section>` });
  add('Exit ticket', 'Before you go', `<p>${L.exit.q}</p>${L.exit.show ? `<div class="box" style="display:inline-block">${L.exit.show}</div>` : ''}
    <p class="reveal" style="margin-top:20px">${L.exit.a}</p>`, 'Collect answers on sticky notes or in your LMS. Reveal the answer with → after students have written theirs.');
  const html = S.map(s => s.raw || `<section class="slide ${s.cls}">
  <span class="label kicker">${s.kicker}</span>
  <h2>${s.title}</h2>
  ${s.body}
  <div class="note">${s.note}</div>
</section>`).join('\n\n');
  return { html: HEAD(`Lesson ${u.n} Slides · ${u.title}`, 'slides.css') + `<div class="deck" id="deck">\n${html}\n</div>
<div class="notes" id="notes"><b>Teacher notes</b><span id="noteText"></span></div>
<div class="bar"><button id="prev" aria-label="Previous slide">←</button><span id="num" style="color:#fff;font:700 14px var(--f-body);align-self:center;min-width:52px;text-align:center"></span><button id="next" aria-label="Next slide">→</button><button id="nBtn" title="Teacher notes (N)">Notes</button><button id="fBtn" title="Full screen (F)">Full screen</button></div>
<script src="../resources.js"></script>
<script src="../slides.js"></script>
</body></html>
`, count: S.length, slides: S };
}

// ---------- classwork ----------
function check(cond, msg) { if (!cond) throw new Error(msg) }
function classworkPage(L, u) {
  let q = 0; const keyA = [], keyB = [];
  const partA = L.trace.map(t => {
    q++; const r = simulate(t.map, t.dir, t.prog);
    check(!r.fail === !t.expectFail && (!t.expect || Object.entries(t.expect).every(([k, v]) => r[k] === v)),
      `Lesson ${u.n} trace ${q}: simulator says ${JSON.stringify(r)}, expected ${JSON.stringify(t.expect)} fail=${!!t.expectFail}`);
    keyA.push(`<p><b>${q}.</b> <span class="answer">${t.answer}</span>${t.why ? ' ' + t.why : ''}</p>`);
    return `<div class="q"><span class="num">${q}</span><div class="task">
    ${board(t.map, t.dir)}
    <div class="lines"><p style="margin:0 0 6px">Program: <span class="code">${esc(txt(t.prog))}</span></p>
      <p style="margin:0">${t.q}</p><div class="ln"></div>${t.lines === 1 ? '' : '<div class="ln"></div>'}</div>
  </div></div>`;
  }).join('\n');
  const partB = L.write.map(w => {
    q++; const map = w.map || lvl(u.n, w.k).map, dir = w.dir != null ? w.dir : lvl(u.n, w.k).dir, sol = w.sol || solOf(lvl(u.n, w.k));
    const r = simulate(map, dir, sol); check(r.won, `Lesson ${u.n} write ${q}: answer does not solve the map ${JSON.stringify(r)}`);
    keyB.push(`<p><b>${q}.</b> <span class="answer code">${esc(txt(sol))}</span> · ${count(sol)} blocks${w.alt ? ` <span style="color:var(--muted)">${w.alt}</span>` : ''}</p>`);
    return `<div class="q"><span class="num">${q}</span><div class="task">
    ${board(map, dir)}
    <div class="lines"><p style="margin:0 0 6px">${w.q}</p><div class="ln"></div><div class="ln"></div><p style="margin:6px 0 0">How many blocks? ______${w.goal ? ` (goal: ${count(sol)})` : ''}</p></div>
  </div></div>`;
  }).join('\n');
  const rowsC = L.partC.rows.map(r => { q++; return { q, ...r } });
  rowsC.forEach(r => { if (r.check) { const s = simulate(r.check.map, r.check.dir, r.check.prog); check(s.won, `Lesson ${u.n} part C ${r.q}: answer does not solve ${JSON.stringify(s)}`) } });
  const page1 = `<section class="page">
  <div class="head">
    <div><span class="label">CyberTeaches Academy · Lesson ${u.n} classwork</span><h1>${esc(u.title)}</h1></div>
    <div class="name">Name<div></div>Date<div></div></div>
  </div>
  <div class="key-ref">${NOTATION(L)}</div>
  <h2>Part A · Trace the rover <span class="pts">Follow the program one block at a time.</span></h2>
  <p class="instr">${L.traceInstr || "Draw the rover's path with a pencil."}</p>
  ${partA}
  <h2>Part B · Write the program <span class="pts">${L.writePts || 'Use the letters above.'}</span></h2>
  <p class="instr">${L.writeInstr}</p>
  ${partB}
</section>`;
  const page2 = `<section class="page">
  <h2 style="margin-top:0">Part C · ${L.partC.title} <span class="pts">${L.partC.pts}</span></h2>
  <p class="instr">${L.partC.instr}</p>
  <table class="pat">
    <thead><tr><th style="width:4%">#</th><th style="width:46%">${L.partC.colA}</th><th>${L.partC.colB}</th>${L.partC.colC ? `<th style="width:15%">${L.partC.colC}</th>` : ''}</tr></thead>
    <tbody>
${rowsC.map(r => `      <tr><td>${r.q}</td><td>${r.a}</td><td class="blank"></td>${L.partC.colC ? `<td>${r.c || ''}</td>` : ''}</tr>`).join('\n')}
    </tbody>
  </table>
  <h2>Part D · Design your own <span class="pts">Challenge</span></h2>
  <p class="instr">${L.design}</p>
  <div class="task">
    <div class="board blank" data-map="........|........|........|........|........" data-cell="40px"></div>
    <div class="lines"><p style="margin:0 0 6px">My program:</p><div class="ln"></div><div class="ln"></div><div class="ln"></div>
      <p style="margin:8px 0 0">Blocks: ______ &nbsp; Partner checked: ______</p></div>
  </div>
  <h2>Reflect</h2>
  <p class="instr" style="margin-bottom:4px">${L.reflect.q}</p>
  <div class="ln"></div><div class="ln"></div>
</section>`;
  // Part E: language practice for English learners (word bank, pictures, sentence frames)
  const V = L.vocab.slice(0, 5), order = [2, 4, 0, 3, 1].filter(i => i < V.length);
  const letters = 'abcdefgh';
  const choices = L.ell.choices.map(c => { q++; return { q, ...c } });
  const frames = L.ell.frames.map(f => { q++; return { q, f } });
  const bank = [...new Set(frames.flatMap(x => x.f[1].split(' / ')))].sort();
  const page3 = `<section class="page">
  <h2 style="margin-top:0">Part E · Words and pictures <span class="pts">Language practice</span></h2>
  <p class="instr">Draw a line from each word to its meaning.</p>
  <div class="match">
    <ol class="mw">${V.map(v => `<li><b>${v[0]}</b> <span class="es" lang="es">(${v[2]})</span></li>`).join('')}</ol>
    <ol class="mm" type="a">${order.map(i => `<li>${V[i][1]}</li>`).join('')}</ol>
  </div>
  <p class="instr" style="margin-top:14px">Circle the best answer.</p>
  ${choices.map(c => `<div class="mc"><p><b>${c.q}.</b> ${c.q2 || c.text}</p><div class="opts">${c.opts.map((o, i) => `<span><b>${letters[i]})</b> ${o}</span>`).join('')}</div></div>`).join('\n  ')}
  <p class="instr" style="margin-top:14px">Finish each sentence. Use the word bank.</p>
  <div class="bank"><b>Word bank:</b> ${bank.map(w => `<span>${w}</span>`).join('')}</div>
  ${frames.map(f => `<p class="frame"><b>${f.q}.</b> ${f.f[0].replace(/____/g, '<span class="gap"></span>')}</p>`).join('\n  ')}
</section>`;
  const keyE = `<h2>Part E</h2>
  <p><b>Matching:</b> ${V.map((v, i) => `${i + 1}–${letters[order.indexOf(i)]}`).join(', ')}</p>
  ${choices.map(c => `<p><b>${c.q}.</b> <span class="answer">${letters[c.a]}) ${c.opts[c.a].replace(/<[^>]+>/g, '')}</span></p>`).join('\n  ')}
  ${frames.map(f => `<p><b>${f.q}.</b> <span class="answer">${f.f[1]}</span></p>`).join('\n  ')}`;
  const key = `<section class="page key">
  <div class="head">
    <div><span class="label">Lesson ${u.n} classwork</span><h1>Answer key</h1></div>
    <span class="teacher-tag">Teacher only</span>
  </div>
  <h2 style="margin-top:0">Lesson timing (50 minutes)</h2>
  <div class="plan">${procedure(L, u).map(p => `<b>${p.time}</b><span>${p.stage}: ${p.short}</span>`).join('')}</div>
  <h2>Part A</h2>
  ${keyA.join('\n  ')}
  <h2>Part B</h2>
  ${keyB.join('\n  ')}
  <h2>Part C</h2>
  <table class="pat">
    <thead><tr><th>#</th><th>Answer</th></tr></thead>
    <tbody>
${rowsC.map(r => `      <tr><td>${r.q}</td><td class="answer">${r.key}</td></tr>`).join('\n')}
    </tbody>
  </table>
  ${keyE}
  <h2>Part D and Reflect</h2>
  <p>Answers vary. Look for a correct start direction, a program a partner can follow, and ${L.reflect.look}. Reflection: ${L.reflect.key}</p>
  <h2>Exit ticket</h2>
  <p>${L.exit.a}</p>
</section>`;
  return HEAD(`Lesson ${u.n} Classwork · ${u.title}`, 'classwork.css') + `<div class="toolbar">
  <a class="btn" href="../">← All lessons</a><span class="label">Teacher resources · Lesson ${u.n}</span><span class="spacer"></span>
  <a class="btn" href="slides.html">Slides</a><a class="btn" href="lesson-plan.html">Lesson plan</a>
  <a class="btn" href="classwork.docx" download>Word (.docx)</a>
  <button class="btn" id="pStudents">Print student pages</button>
  <button class="btn primary" id="pAll">Print with answer key</button>
</div>

${page1}

${page2}

${page3}

${key}

<script src="../resources.js"></script>
<script>
document.getElementById('pAll').onclick=()=>{ document.body.classList.remove('no-key'); print() };
document.getElementById('pStudents').onclick=()=>{ document.body.classList.add('no-key'); print(); setTimeout(()=>document.body.classList.remove('no-key'),500) };
</script>
</body></html>
`;
}

// ---------- lesson plan ----------
let SLIDE_IDX = null;
function procedure(L, u) {
  const s = SLIDE_IDX; // slide numbers from the built deck
  return [
    { time: '5 min', stage: 'Warm-up', sub: L.warmup.title, slides: `Slide ${s.warm}`, short: `${L.warmup.title} (slide ${s.warm})`, text: L.plan.warmup },
    { time: '10 min', stage: 'Direct instruction', sub: '', slides: `Slides ${s.instrFrom} to ${s.instrTo}`, short: `slides ${s.instrFrom} to ${s.instrTo}`, text: L.plan.direct },
    { time: '5 min', stage: 'Guided practice', sub: 'Think, pair, share', slides: `Slides ${s.guidedFrom} to ${s.guidedTo}`, short: `think, pair, share and debugging tips (slides ${s.guidedFrom} to ${s.guidedTo})`, text: L.plan.guided },
    { time: '12 min', stage: 'Unplugged practice', sub: 'Classwork', slides: `Slide ${s.classwork}`, short: 'this classwork, in pairs. Part D for early finishers', text: L.plan.classwork },
    { time: '15 min', stage: 'Independent practice', sub: 'Code', slides: `Slide ${s.code}`, short: `code puzzles ${u.n}.1 to ${u.n}.10 at cyberteaches.com/academy`, text: L.plan.code },
    { time: '3 min', stage: 'Closure', sub: 'Exit ticket', slides: `Slide ${s.exit}`, short: 'exit ticket (last slide)', text: L.plan.closure },
  ];
}
function planPage(L, u) {
  const next = UNITS.find(x => x.n === u.n + 1);
  const P = L.plan;
  return HEAD(`Lesson ${u.n} Lesson Plan · ${u.title}`, 'plan.css') + `<div class="toolbar">
  <a class="btn" href="../">← All lessons</a><span class="label">Teacher resources · Lesson ${u.n}</span><span class="spacer"></span>
  <a class="btn" href="slides.html">Slides</a><a class="btn" href="classwork.html">Classwork</a>
  <button class="btn primary" onclick="print()">Print lesson plan</button>
</div>

<article class="page">
  <header class="head">
    <div><span class="label">CyberTeaches Academy · Block coding · Grades 6 to 8</span><h1>Lesson ${u.n}: ${esc(u.title)}</h1></div>
    <div class="meta"><b>Time</b> 50 minutes<br><b>Unit</b> ${L.unitName}<br><b>Puzzles</b> ${u.n}.1 to ${u.n}.10</div>
  </header>

  <section class="cols">
    <div>
      <h2>Overview</h2>
      <p>${P.overview}</p>
      <h2>Learning objectives</h2>
      <p class="muted">Students will be able to:</p>
      <ol>
${P.objectives.map(o => `        <li>${o}</li>`).join('\n')}
      </ol>
    </div>
    <div>
      <h2>Computer science standards</h2>
      <p class="muted" style="margin-bottom:6px">CSTA K-12 Computer Science Standards (2017)</p>
      <ul class="std">
${P.standards.map(c => `        <li><b>${c}</b> ${STANDARDS[c]}</li>`).join('\n')}
      </ul>
      <h2>English language development standards</h2>
      <p class="muted" style="margin-bottom:6px">WIDA ELD Standards Framework (2020), grades 6 to 8</p>
      <ul class="std">
${L.ell.eld.map(([c, t]) => `        <li><b>${c}</b> ${t}</li>`).join('\n')}
      </ul>
    </div>
  </section>

  <h2>Vocabulary</h2>
  <table class="voc">
    <thead><tr><th>Word</th><th>Student-friendly meaning</th><th>Spanish</th></tr></thead>
    <tbody>
${L.vocab.map(([w, m, es]) => `      <tr><td><b>${w}</b></td><td>${m}</td><td lang="es">${es}</td></tr>`).join('\n')}
    </tbody>
  </table>

  <section class="cols">
    <div>
      <h2>Materials</h2>
      <ul>
        <li>Projector and the <a href="slides.html">Lesson ${u.n} slides</a></li>
        <li>Printed <a href="classwork.html">Lesson ${u.n} classwork</a>, one per student (answer key for the teacher)</li>
        <li>Student devices with a web browser: cyberteaches.com/academy</li>
        <li>A class on the Teacher Dashboard, with student logins or Google sign-in</li>
      </ul>
    </div>
    <div>
      <h2>Before class</h2>
      <ul>
        <li>Try puzzles ${u.n}.1 to ${u.n}.10 yourself (the answer key is on the Teacher Dashboard).</li>
${P.before.map(b => `        <li>${b}</li>`).join('\n')}
      </ul>
    </div>
  </section>

  <h2>Lesson procedure</h2>
  <table class="proc">
    <thead><tr><th style="width:15%">Time</th><th style="width:22%">Stage</th><th>Teacher and student activity</th></tr></thead>
    <tbody>
${procedure(L, u).map(p => `      <tr><td>${p.time}</td><td><b>${p.stage}</b><br>${p.sub ? p.sub + ' ' : ''}<span class="sl">${p.slides}</span></td><td>${p.text}</td></tr>`).join('\n')}
    </tbody>
  </table>

  <section class="cols">
    <div>
      <h2>Assessment</h2>
      <ul>
        <li><b>Formative:</b> classwork Parts A to C, observation during coding, and the exit ticket.</li>
        <li><b>Progress:</b> the Teacher Dashboard shows stars per puzzle and a Lesson ${u.n} score out of 100 (3 stars = 100, 2 stars = 90, 1 star = 80 per puzzle).</li>
        <li><b>Success criteria:</b> ${P.success}</li>
      </ul>
      <h2>Common misconceptions</h2>
      <ul>
${P.misconceptions.map(m => `        <li>${m}</li>`).join('\n')}
      </ul>
    </div>
    <div>
      <h2>Differentiation</h2>
      <ul>
        <li><b>Support:</b> ${P.support}</li>
        <li><b>Extension:</b> ${P.extension}</li>
        <li><b>Accessibility:</b> blocks can be added by tapping or by dragging, and moved with the ▲▼ buttons.</li>
      </ul>
      <h2>Supports for English learners</h2>
      <ul>
        <li><b>Visuals:</b> post the block pictures and vocabulary on a word wall; point to blocks while you say them.</li>
        <li><b>Gestures:</b> students stand and turn left or right with the rover before coding turns.</li>
        <li><b>Partners:</b> pair students to read programs aloud; first-language talk is welcome.</li>
        <li><b>Sentence frames:</b> ${L.ell.frames.map(f => `“${f[0].replace(/____/g, '___')}”`).join(' ')}</li>
        <li><b>Classwork Part E</b> uses a word bank, pictures and fill-in sentences.</li>
      </ul>
      <h2>Connections</h2>
      <ul>
${P.connections.map(c => `        <li>${c}</li>`).join('\n')}
      </ul>
      <h2>Next lesson</h2>
      <p>${next ? `Lesson ${next.n}, ${esc(next.title)}: ${P.next}` : P.next}</p>
    </div>
  </section>
  <footer class="pfoot">CyberTeaches Academy · cyberteaches.com/academy · Free to use and adapt for your classes.</footer>
</article>
</body></html>
`;
}
const STANDARDS = {
  '2-AP-10': 'Use flowcharts and/or pseudocode to address complex problems as algorithms.',
  '2-AP-11': 'Create clearly named variables that represent different data types and perform operations on their values.',
  '2-AP-12': 'Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals.',
  '2-AP-13': 'Decompose problems and subproblems into parts to facilitate the design, implementation, and review of programs.',
  '2-AP-17': 'Systematically test and refine programs using a range of test cases.',
  '2-AP-19': 'Document programs in order to make them easier to follow, test, and debug.',
};

// ---------- build ----------
const only = process.argv[2] ? +process.argv[2] : null;
for (const L of LESSONS) {
  if (only && L.n !== only) continue;
  const u = UNITS.find(x => x.n === L.n);
  const sl = L.handSlides ? null : slidesPage(L, u);
  // slide numbers: 1 title, 2 goals, 3 warm-up, then review/concepts, then together puzzles, tips, classwork, code, exit
  const nConcept = (L.review ? 1 : 0) + (L.concepts || []).length;
  SLIDE_IDX = L.handSlides || { warm: 3, instrFrom: 4, instrTo: 3 + nConcept, guidedFrom: 4 + nConcept, guidedTo: 3 + nConcept + L.together.length,
    classwork: sl.count - 2, code: sl.count - 1, exit: sl.count };
  const dir = path.join(ROOT, 'academy/resources/lesson-' + L.n); fs.mkdirSync(dir, { recursive: true });
  if (sl) fs.writeFileSync(path.join(dir, 'slides.html'), sl.html);
  fs.writeFileSync(path.join(dir, 'classwork.html'), classworkPage(L, u));
  fs.writeFileSync(path.join(dir, 'lesson-plan.html'), planPage(L, u));
  console.log('Lesson', L.n, 'built:', sl ? sl.count : 'hand-made', 'slides');
}
module.exports = { simulate, txt, count };
