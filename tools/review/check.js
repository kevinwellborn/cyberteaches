// Checks a unit review (academy/review/unit-N/data.js) with a game simulator: every option program on a map is run,
// the marked answer must be the only one that wins (inside the block limit, if the question has one), and number answers
// (blocks, crystals collected or left, tanks destroyed, how many times a block runs) must match.
// The simulator follows the game rules, including limited shells (one per tank unless set) and enemy tanks that fire
// when the rover is still in front of their cannon after its next move. Usage: node tools/review/check.js [unit]   (default 1)
const unit = +(process.argv[2] || 1);
const R = require(`../../academy/review/unit-${unit}/data.js`);
const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], TD = { '^': 0, '>': 1, 'v': 2, '<': 3 };
const T = { F: 'forward', L: 'left', R: 'right', C: 'collect', X: 'fire' };
function parse(src) {
  const t = src.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').trim().split(/\s+/); let i = 0;
  const body = () => { if (t[i++] !== '[') throw new Error('expected [ in ' + src); const b = list(); i++; return b };
  const list = () => { const out = []; while (i < t.length && t[i] !== ']') { const w = t[i++];
    if (w === 'repeat') { const n = +t[i++]; out.push({ type: 'repeat', n, body: body() }) }
    else if (w === 'until') { i++; out.push({ type: 'until', body: body() }) }
    else if (w === 'untilclear') out.push({ type: 'untilclear', body: body() });
    else if (w === 'iftank') out.push({ type: 'iftank', body: body() });
    else if (w === 'if') { const cond = t[i++]; if (!['ahead', 'left', 'right', 'crystal', 'tank'].includes(cond)) throw new Error('bad condition ' + cond);
      const n = { type: 'ifelse', cond, body: body(), elseBody: [] }; if (t[i] === 'else') { i++; n.elseBody = body() } out.push(n) }
    else { if (!T[w]) throw new Error('bad block ' + w + ' in ' + src); out.push({ type: T[w] }) } } return out };
  return list();
}
function simulate(map, dir, prog, shells) {
  const g = map.map(r => [...r]); let x, y; const gems = new Set(), tanks = new Map(); let goal = null;
  g.forEach((r, yy) => r.forEach((c, xx) => { const k = xx + ',' + yy;
    if (c === 'S') { x = xx; y = yy } if (c === '*') gems.add(k); if (c === 'G') goal = k; if (c in TD) tanks.set(k, { dir: TD[c], alert: false }) }));
  if (shells == null) shells = tanks.size;
  let fail = null, steps = 0, collected = 0, destroyed = 0; const ran = { forward: 0, left: 0, right: 0, collect: 0, fire: 0 };
  const rock = (a, b) => !g[b] || g[b][a] === undefined || g[b][a] === '#';
  const blocked = (a, b) => rock(a, b) || tanks.has(a + ',' + b);
  const atFlag = () => goal === x + ',' + y;
  const won = () => gems.size === 0 && tanks.size === 0 && (!goal || atFlag());
  // A straight line from (a,b): the first tank it reaches, or 'me' if it reaches the rover first (stopMe), or null at a rock.
  const trace = (a, b, d, stopMe) => { for (;;) { a += DX[d]; b += DY[d]; if (stopMe && a === x && b === y) return 'me'; const k = a + ',' + b; if (tanks.has(k)) return k; if (rock(a, b)) return null } };
  const ahead = () => trace(x, y, dir);
  const cond = c => c === 'crystal' ? gems.has(x + ',' + y) : c === 'tank' ? !!ahead() : !blocked(x + DX[(dir + { ahead: 0, left: 3, right: 1 }[c]) % 4], y + DY[(dir + { ahead: 0, left: 3, right: 1 }[c]) % 4]);
  class Stop {}
  const stop = m => { fail = m; throw new Stop };
  function act(t) {
    if (++steps > 2000) stop('stuck in a loop');
    ran[t]++;
    if (t === 'forward') { const a = x + DX[dir], b = y + DY[dir]; if (blocked(a, b)) stop('crashes'); x = a; y = b }
    else if (t === 'left') dir = (dir + 3) % 4; else if (t === 'right') dir = (dir + 1) % 4;
    else if (t === 'collect') { const k = x + ',' + y; if (!gems.has(k)) stop('nothing to collect'); gems.delete(k); collected++ }
    else if (t === 'fire') { if (shells <= 0) stop('out of shells'); shells--; const k = ahead(); if (k) { tanks.delete(k); destroyed++ } }
    if (won()) throw new Stop;
    for (const [k, tk] of tanks) { const [a, b] = k.split(',').map(Number), sees = trace(a, b, tk.dir, true) === 'me';
      if (sees && tk.alert) stop('hit by the tank at ' + k); tk.alert = sees }
  }
  function run(p) { for (const n of p) {
    if (n.type === 'repeat') { for (let i = 0; i < n.n; i++) run(n.body) }
    else if (n.type === 'until') { while (!atFlag()) { if (++steps > 2000) stop('stuck in a loop'); run(n.body) } }
    else if (n.type === 'untilclear') { while (tanks.size) { if (++steps > 2000) stop('stuck in a loop'); run(n.body) } }
    else if (n.type === 'iftank') { if (ahead()) run(n.body) }
    else if (n.type === 'ifelse') run(cond(n.cond) ? n.body : n.elseBody);
    else act(n.type);
  } }
  try { run(prog) } catch (e) { if (!(e instanceof Stop)) throw e }
  return { fail, won: !fail && won(), collected, left: gems.size, destroyed, tanksLeft: tanks.size, atFlag: atFlag(), ran };
}
const blocks = p => p.reduce((s, n) => s + 1 + (n.body ? blocks(n.body) : 0) + (n.elseBody ? blocks(n.elseBody) : 0), 0);
const count = (p, t) => p.reduce((s, n) => s + (n.type === t ? 1 : 0) + (n.body ? count(n.body, t) * (n.n || 1) : 0), 0);
let bad = 0; const fail = m => { bad++; console.log('FAIL', m) };
const all = [...R.samples.map((q, i) => ['sample ' + (i + 1), q]), ...R.quiz.map((q, i) => ['quiz ' + (i + 1), q]),
  ...Object.entries(R.quizVariants || {}).flatMap(([i, vs]) => vs.map((q, k) => [`quiz ${+i + 1} look-alike ${k + 1}`, q]))];
for (const [id, q] of all) {
  if (q.map) { const w = q.map[0].length; if (q.map.some(r => r.length !== w)) fail(id + ': map rows differ in length') }
  if (q.kind !== 'num' && !(q.a >= 0 && q.a < q.opts.length)) fail(id + ': answer index out of range');
  if (q.map && q.opts && q.opts.every(o => o.p)) {
    const res = q.opts.map(o => { const p = parse(o.p), r = simulate(q.map, q.dir, p, q.shells); return { ...r, won: r.won && (!q.maxBlocks || blocks(p) <= q.maxBlocks), n: blocks(p) } });
    const wins = res.map(r => r.won);
    if (!wins[q.a] || wins.filter(Boolean).length !== 1) fail(`${id}: wins ${JSON.stringify(wins)}, answer ${q.a} ` + JSON.stringify(res.map(r => r.fail || (r.won ? 'won' : `left ${r.left} tanks ${r.tanksLeft} flag ${r.atFlag} blocks ${r.n}`))));
  }
  if (q.kind === 'num' && q.map) {
    const r = simulate(q.map, q.dir, parse(q.prog), q.shells); console.log(id, q.prog, '=>', q.a, JSON.stringify({ ...r, ran: undefined }), JSON.stringify(r.ran));
    if (r.fail) fail(id + ': program fails: ' + r.fail);
    const m = q.q.match(/<b>(move forward|turn left|turn right|collect crystal|fire cannon)<\/b>/), key = m && { 'move forward': 'forward', 'turn left': 'left', 'turn right': 'right', 'collect crystal': 'collect', 'fire cannon': 'fire' }[m[1]];
    const got = key ? r.ran[key] : /destroy/.test(q.q) ? r.destroyed : /left<\/b>/.test(q.q) ? r.left : null;
    if (got === null) console.log('  (checked by eye)'); else if (got !== q.a) fail(`${id}: simulator says ${got}, answer says ${q.a}`);
  }
  if (q.kind === 'num' && !q.map) { const p = parse(q.prog), want = /blocks/.test(q.q) ? blocks(p) : count(p, 'collect');
    if (want !== q.a) fail(`${id}: computed ${want}, answer says ${q.a}`) }
}
for (const [i, d] of R.ideas.entries()) if (d.map) { const r = simulate(d.map, d.dir, parse(d.p)); if (!r.won) fail('idea ' + (i + 1) + ' ' + JSON.stringify(r)) }
for (const s of R.recap) parse(s.p);
for (const b of R.blocks || []) parse(b[1]);
console.log(bad ? bad + ' problem(s)' : `All unit ${unit} review questions check out.`); process.exit(bad ? 1 : 0);
