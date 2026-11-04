// Checks the Quiz Battle questions: every map question's right program wins, and the others don't.
// Run: node tools/quiz/check.js
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '../..');
global.window = {}; new Function('window', fs.readFileSync(path.join(ROOT, 'academy/quiz/questions.js'), 'utf8'))(global.window);
// Reuse the rover simulator from the teacher-resources build (without running that build).
const src = fs.readFileSync(path.join(ROOT, 'tools/teacher-resources/build.js'), 'utf8');
const simulate = new Function(src.slice(src.indexOf('const DX'), src.indexOf('// ---------- helpers')) + '; return simulate;')();
const B = {F: 'forward', L: 'left', R: 'right', C: 'collect', X: 'fire'};
const conv = p => p.map(n => typeof n === 'string' ? {type: B[n]} : n.until ? {type: n.until === 'flag' ? 'until' : 'untilclear', body: conv(n.body)} : {type: 'repeat', n: +n.n, body: conv(n.body)});
let bad = 0, checked = 0;
for(const [n, set] of Object.entries(window.QUIZZES)) set.questions.forEach((Q, i) => {
  if(!(Q.a >= 0 && Q.a < Q.opts.length)) { bad++; console.log(`L${n} Q${i + 1}: answer index out of range`) }
  if(!Q.sim) return; checked++;
  Q.sim.progs.forEach((src, k) => {
    const r = simulate(Q.sim.rows, Q.sim.dir, conv(window.QUIZ.parse(src)));
    const ok = Q.sim.fail ? r.fail === Q.sim.fail : (k === Q.sim.a) === r.won;
    if(!ok){ bad++; console.log(`L${n} Q${i + 1} option "${src}": ${JSON.stringify(r)}`) }
  });
});
console.log(`${checked} map questions checked, ${bad} problems`); process.exit(bad ? 1 : 0);
