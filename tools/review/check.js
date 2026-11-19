// Checks the Unit 1 Lesson 1-6 review (academy/review/unit-1/data.js) with the game simulator:
// every option program on a map is run, the marked answer must be the only one that wins,
// block-count, crystal-count and crystals-left answers must match; other number answers are printed for a look. Usage: node tools/review/check.js
const R = require('../../academy/review/unit-1/data.js');
// build.js needs the answer-key secret to load, so take its simulator source directly (same rules as the game).
const src = require('fs').readFileSync(require('path').join(__dirname, '../teacher-resources/build.js'), 'utf8');
const simulate = new Function(src.slice(src.indexOf('const DX ='), src.indexOf('// ---------- helpers')) + 'return simulate;')();
const T = { F: 'forward', L: 'left', R: 'right', C: 'collect' };
function parse(src) {
  const t = src.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').trim().split(/\s+/); let i = 0;
  const list = () => { const out = []; while (i < t.length && t[i] !== ']') { const w = t[i++];
    if (w === 'repeat') { const n = +t[i++]; i++; const body = list(); i++; out.push({ type: 'repeat', n, body }) }
    else if (w === 'until') { i++; i++; const body = list(); i++; out.push({ type: 'until', body }) }
    else { if (!T[w]) throw new Error('bad block ' + w); out.push({ type: T[w] }) } } return out };
  return list();
}
const blocks = p => p.reduce((s, n) => s + 1 + (n.body ? blocks(n.body) : 0), 0);
const count = (p, t) => p.reduce((s, n) => s + (n.type === t ? 1 : 0) + (n.body ? count(n.body, t) * (n.n || 1) : 0), 0);
let bad = 0; const fail = m => { bad++; console.log('FAIL', m) };
const all = [...R.samples.map((q, i) => ['sample ' + (i + 1), q]), ...R.quiz.map((q, i) => ['quiz ' + (i + 1), q]),
  ...Object.entries(R.quizVariants || {}).flatMap(([i, vs]) => vs.map((q, k) => [`quiz ${+i + 1} look-alike ${k + 1}`, q]))];
for (const [id, q] of all) {
  if (q.map) { const w = q.map[0].length; if (q.map.some(r => r.length !== w)) fail(id + ': map rows differ in length') }
  if (q.kind !== 'num' && !(q.a >= 0 && q.a < q.opts.length)) fail(id + ': answer index out of range');
  if (q.map && q.opts && q.opts.every(o => o.p)) {
    const wins = q.opts.map(o => simulate(q.map, q.dir, parse(o.p)).won);
    if (!wins[q.a] || wins.filter(Boolean).length !== 1) fail(`${id}: wins ${JSON.stringify(wins)}, answer ${q.a}`);
  }
  if (q.kind === 'num' && q.map) {
    const r = simulate(q.map, q.dir, parse(q.prog)); console.log(id, q.prog, JSON.stringify(r));
    if (r.fail) fail(id + ': program fails: ' + r.fail);
    if (/left<\/b>/.test(q.q) && r.left !== q.a) fail(`${id}: ${r.left} crystals left, answer says ${q.a}`);
  }
  if (q.kind === 'num' && !q.map) { const p = parse(q.prog), want = /blocks/.test(q.q) ? blocks(p) : count(p, 'collect');
    if (want !== q.a) fail(`${id}: computed ${want}, answer says ${q.a}`) }
}
for (const [i, d] of R.ideas.entries()) if (d.map) { const r = simulate(d.map, d.dir, parse(d.p)); if (!r.won) fail('idea ' + (i + 1) + ' ' + JSON.stringify(r)) }
for (const s of R.recap) parse(s.p);
console.log(bad ? bad + ' problem(s)' : 'All review questions check out.'); process.exit(bad ? 1 : 0);
