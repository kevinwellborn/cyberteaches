// Checks the AP CSA practice exams: every multiple-choice question that has a `run` field is compiled and
// run with Java, and its output must equal the text of the correct answer choice.
// Usage: node tools/check-apcsa-exams.js   (needs javac and java on the PATH)
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
let bad = 0, ran = 0;
for (const f of ['exam1.js', 'exam2.js']) {
  const file = path.join(ROOT, 'apcsa/exam', f);
  if (!fs.existsSync(file)) continue;
  const window = {}; new Function('window', fs.readFileSync(file, 'utf8'))(window);
  const E = window.CSA_EXAM;
  const ids = new Set();
  for (const q of E.questions) {
    if (ids.has(q.id)) { console.log(`${f} #${q.id}: duplicate id`); bad++; } ids.add(q.id);
    if (q.opts.length !== 4 || !/^[A-D]$/.test(q.ans)) { console.log(`${f} #${q.id}: needs 4 choices and one answer`); bad++; }
    if (!q.run) continue;
    const pre = q.run === 1 ? '' : q.run.pre, main = q.run === 1 ? q.code : q.run.main;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'csa-'));
    fs.writeFileSync(path.join(dir, 'T.java'), `import java.util.*;\npublic class T {\n${pre}\npublic static void main(String[] args) {\n${main}\n}\n}\n`);
    let out;
    try { execFileSync('javac', ['T.java'], { cwd: dir, stdio: 'pipe' }); out = execFileSync('java', ['T'], { cwd: dir, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
    catch (e) { out = 'ERROR: ' + String(e.stderr || e.message).split('\n')[0]; }
    ran++;
    const want = q.opts['ABCD'.indexOf(q.ans)].trim();
    if (out !== want) { console.log(`${f} #${q.id}: printed "${out}" but the answer is "${want}"`); bad++; }
    fs.rmSync(dir, { recursive: true, force: true });
  }
  console.log(`${f}: ${E.questions.length} questions, ${E.frq.length} free-response questions`);
}
console.log(`${ran} runnable questions checked, ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
