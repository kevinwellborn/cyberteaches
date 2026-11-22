// Checks a Python Quest lesson review (academy/python/review/lesson-N/data.js) in the real game simulator:
// program questions: only the right option wins; number questions: sol wins and uses the answer; ideas: code wins.
// Usage: node tools/review/pycheck.js 1
const path = require('path'), root = path.join(__dirname, '../../academy/python');
global.window = global; global.performance = {now: () => 0}; global.requestAnimationFrame = () => {};
global.PyRun = require(root + '/pyrun.js'); require(root + '/levels.js'); require(root + '/game.js');
const n = process.argv[2] || '1', R = require(`${root}/review/lesson-${n}/data.js`);
let bad = 0;
// Levels with variants (the temple changes every Run) must win on every version, like in the game.
const run = (lv, code) => PQ.simulateAll({par: 99, ...lv}, code).run.result;
const say = (ok, msg) => { if (!ok) bad++; console.log((ok ? 'ok  ' : 'BAD ') + msg) };
const count = (code, word) => (code.match(new RegExp('hero\\.' + word + '\\(', 'g')) || []).length;
const checkQ = (q, tag) => {
  if (q.kind === 'num' && q.sol && q.check) {
    // check 'range': the answer is the number in range( ), and one less or one more fails (min: true: only one less must fail,
    // for questions that ask for the fewest rounds, since extra rounds with nothing left to hit do no harm).
    // check 'arg' (with of: 'sword.attack'): the answer is the value inside of( ), and one less or one more fails.
    // check 'take' / 'jump' / 'climb' / 'attack' / 'step' ...: the answer is how many times that happens when sol runs.
    const r = PQ.simulate({par: 99, ...q.lv}, q.sol); say(r.result.result === 'win', `${tag} sol ${r.result.result} ${r.result.msg || ''}`);
    if (q.check === 'range') { say(q.sol.includes(`range(${q.a})`), `${tag} sol uses range(${q.a})`);
      (q.min ? [q.a - 1] : [q.a - 1, q.a + 1]).forEach(x => say(run(q.lv, q.sol.replace(`range(${q.a})`, `range(${x})`)).result !== 'win', `${tag} range(${x}) fails`)) }
    else if (q.check === 'arg') { const at = `${q.of}(${q.a})`; say(q.sol.includes(at), `${tag} sol uses ${at}`);
      [q.a - 1, q.a + 1].forEach(x => say(run(q.lv, q.sol.replace(at, `${q.of}(${x})`)).result !== 'win', `${tag} ${q.of}(${x}) fails`)) }
    else { const c = r.events.filter(e => e.a === q.check).length; say(c === q.a, `${tag} ${q.check} happens ${c} times, answer ${q.a}`) }
  } else if (q.kind === 'num' && q.sol) {
    const r = run(q.lv, q.sol); say(r.result === 'win', `${tag} sol ${r.result} ${r.msg || ''}`);
    const m = q.q.match(/hero\.(\w+)\(/); if (m && m[1] !== 'run') say(count(q.sol, m[1]) === q.a, `${tag} sol uses ${m[1]} ${count(q.sol, m[1])} times, answer ${q.a}`);
    if (m && m[1] === 'run') say(q.sol === `hero.run(${q.a})`, `${tag} run value ${q.a}`);
    // one less or one more must not win
    if (m && m[1] !== 'run') { const less = q.sol.replace(`hero.${m[1]}()\n`, ''); say(run(q.lv, less).result !== 'win', `${tag} one fewer ${m[1]} fails`) }
  } else if (q.lv && q.opts && !q.pic) q.opts.forEach((o, k) => { const r = run(q.lv, o.c); say((r.result === 'win') === (k === q.a), `${tag} option ${k}${k === q.a ? ' (answer)' : ''}: ${r.result} ${r.msg || ''}`) });
  if (q.opts && !(q.a >= 0 && q.a < q.opts.length)) say(false, tag + ' answer out of range');
};
R.ideas.forEach((d, i) => { const r = run(d.lv, d.code); say(r.result === 'win', `idea ${i} ${r.result} ${r.msg || ''}`) });
R.samples.forEach((q, i) => checkQ(q, 'sample ' + (i + 1)));
R.quiz.forEach((q, i) => checkQ(q, 'quiz ' + (i + 1)));
Object.entries(R.quizVariants || {}).forEach(([i, vs]) => vs.forEach((q, k) => checkQ(q, `quiz ${+i + 1} look-alike ${k + 1}`)));
const P = R.points, Q = R.quizPoints;
const g = R.vocab.length * P.vocab + R.fill.reduce((t, f) => t + f.a.length, 0) * P.blank + R.samples.length * P.sample;
const z = R.quizVocab.length * Q.vocab + R.quizFill.reduce((t, f) => t + f.a.length, 0) * Q.blank + R.quiz.length * Q.question;
say(g === 100, 'study guide total ' + g); say(z === 100, 'quiz total ' + z);
[...R.fill, ...R.quizFill].forEach(f => f.a.forEach(w => { if (!R.fillBank.includes(w)) say(false, 'not in word bank: ' + w) }));
console.log(bad ? bad + ' problem(s)' : 'All good');
process.exit(bad ? 1 : 0);
