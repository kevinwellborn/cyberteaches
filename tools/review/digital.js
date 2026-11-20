// Makes digital, student-only Word copies of a unit review for Google Classroom (like classwork-digital.js):
// maps and block programs become pictures, answers go in shaded boxes, and there is no answer key.
// Usage: node tools/review/digital.js [unit]   (default unit 1)
// Needs the site served on localhost:8123 (python3 -m http.server 8123), Playwright, and pandoc.
// Writes academy/review/unit-N/study-guide-digital.docx and quiz-digital.docx
// (open in Google Docs, then assign with "Make a copy for each student").
const {chromium} = require('playwright'); const fs = require('fs'); const {execFileSync} = require('child_process'); const path = require('path');
const ROOT = path.join(__dirname, '../..'); const unit = +(process.argv[2] || 1);
const TMP = fs.mkdtempSync(path.join(require('os').tmpdir(), 'review-'));
const FINISH = path.join(ROOT, 'tools/teacher-resources/docx-finish.py');

// Turn every outermost map, program and block into a picture, so Word shows exactly what the website shows.
async function picturize(p){
  for (const el of await p.$$('.board, .prog, .rep, .blk')) {
    const outer = await el.evaluate(e => e.isConnected && !e.parentElement.closest('.prog, .rep, .board'));
    if (!outer) continue;
    const box = await el.boundingBox(); if (!box || !box.width) continue;
    const png = (await el.screenshot()).toString('base64');
    await el.evaluate((e, [d, w, h]) => { const i = document.createElement('img'); i.src = 'data:image/png;base64,' + d;
      i.width = Math.round(w * 0.7); i.height = Math.round(h * 0.7); e.replaceWith(i) }, [png, box.width, box.height]);
  }
}
// Page-side helpers, passed in as a string so both pages share them.
const HELPERS = `
  window.box = (lines = 1, label = '') => '<p>BOXTABLE</p><table><tr><td>' + label + '&nbsp;<br>'.repeat(lines - 1) + '&nbsp;</td></tr></table>';
  window.qHtml = (q, i) => {
    const img = [...q.querySelectorAll('.pic img')].map(x => x.outerHTML).join(' &nbsp; ');
    const opts = [...q.querySelectorAll('.opt')].map(o => '<p>&nbsp;&nbsp;&nbsp;<b>' + o.querySelector('.let').textContent + ')</b> ' + [...o.childNodes].filter(n => !(n.classList && (n.classList.contains('let') || n.tagName === 'INPUT'))).map(n => n.outerHTML || n.textContent).join('') + '</p>').join('');
    const qt = q.querySelector('.qt').cloneNode(true); qt.querySelectorAll('.ltag').forEach(t => t.outerHTML = ' <i>(Lesson ' + t.textContent.replace(/\\D/g, '') + ')</i>');
    return '<h3>Question ' + (i + 1) + '</h3><p>' + qt.innerHTML + '</p>' + (img ? '<p>' + img + '</p>' : '') + opts
      + box(1, opts ? '<b>My answer (letter):</b> ' : '<b>My answer (number):</b> ');
  };
  window.code = s => '<span style="font-family:Consolas">' + s + '</span>';
`;

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1000, height: 1300}, deviceScaleFactor: 2});
  await p.route(/fonts\.(googleapis|gstatic)|firebase|gstatic/, r => r.abort());
  const base = `http://localhost:8123/academy/review/unit-${unit}/`, out = f => path.join(ROOT, `academy/review/unit-${unit}/${f}`);
  const write = (name, html) => { const f = path.join(TMP, name + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`);
    execFileSync('python3', [FINISH, f, out(name + '.docx')]); console.log('wrote', out(name + '.docx')) };

  // ---------- study guide ----------
  await p.goto(base); await p.waitForTimeout(700); await p.addScriptTag({content: HELPERS});
  await p.evaluate(() => document.querySelectorAll('.idea .board, .idea .prog').forEach(e => e.style.fontSize = '13px'));
  await p.evaluate(() => document.querySelectorAll('.fb, .key, .checkrow, .pts, input').forEach(e => e.remove()));
  await picturize(p);
  write('study-guide-digital', await p.evaluate(() => {
    const R = REVIEW, t = s => document.querySelector(s);
    let h = `<h1>${R.name}: Study Guide (${R.title})</h1>
      <p><b>Name:</b> ______________________ &nbsp; <b>Date:</b> ____________</p>
      <p>Read the big ideas, learn the words, then try the sample questions. Type your answers in the shaded boxes. The quiz has questions just like these.</p>`;
    h += '<h2>1. What you learned</h2>' + [...document.querySelectorAll('#recap .row')].map(r =>
      `<h3>${r.querySelector('.ln').textContent}: ${r.querySelector('h3').textContent}</h3><p>${r.querySelector('p').innerHTML}</p><p>${r.querySelector('img').outerHTML}</p>`).join('');
    h += '<h2>2. Blocks you know</h2><p>On paper we write each block with a letter.</p><p>GRIDTABLE</p><table><tr><th>Letter</th><th>Block</th></tr>'
      + [...document.querySelectorAll('#blocks > div')].map(d => `<tr><td>${code(d.querySelector('.code').textContent)}</td><td>${d.querySelector('img').outerHTML}</td></tr>`).join('') + '</table>';
    h += '<h2>3. Word bank</h2><p>GRIDTABLE</p><table><tr><th>Word</th><th>Meaning</th><th>Español</th><th>Picture</th></tr>'
      + R.vocab.map(([w, m, es, pic]) => `<tr><td><b>${w}</b></td><td>${m}</td><td><i>${es}</i></td><td>${pic}</td></tr>`).join('') + '</table>';
    h += '<h3>Vocabulary check</h3><p>What does each word mean? Type the letter in the shaded box.</p>'
      + [...document.querySelectorAll('#vocabq .q')].map((q, i) => qHtml(q, i)).join('');
    h += '<h2>4. Big ideas</h2>' + [...document.querySelectorAll('#ideas .idea')].map(d =>
      `<h3>${d.querySelector('h3').textContent}</h3><p>${d.querySelector('p').innerHTML}</p><p>${[...d.querySelectorAll('img')].map(i => i.outerHTML).join(' &nbsp; ')}</p><p><i>${d.querySelector('.note').innerHTML}</i></p>`).join('');
    h += '<h2>5. Say it and write it</h2><p>Finish each sentence. Type the missing words in the box. Use the word bank.</p><p><b>Word bank:</b> '
      + R.fillBank.map(w => `[ ${w} ]`).join(' ') + '</p>'
      + R.fill.map((f, i) => `<p>${i + 1}. ${f.s.replace(/____/g, '______')}</p>` + box(1)).join('');
    h += '<p>PAGEBREAK</p><h2>6. Sample questions</h2><p>Try each question. Type the letter or the number in the shaded box. Check your answers in the online study guide.</p>'
      + [...document.querySelectorAll('#samples .q')].map((q, i) => qHtml(q, i)).join('');
    h += '<h2>Quiz tips</h2>' + R.tips.map(x => `<p>• ${x}</p>`).join('');
    return h;
  }));

  // ---------- quiz ----------
  await p.goto(base + 'quiz.html'); await p.waitForTimeout(700); await p.addScriptTag({content: HELPERS});
  await p.evaluate(() => { document.querySelectorAll('.fb, .key, .signin, input, .fillgap').forEach(e => e.remove());
    document.querySelectorAll('#quiz select').forEach(e => e.replaceWith('______')); document.querySelectorAll('#quiz .pts').forEach(e => e.remove()) });
  await picturize(p);
  write('quiz-digital', await p.evaluate(() => {
    const R = REVIEW;
    return `<h1>${R.name}: Quiz (${R.title})</h1>
      <p><b>Name:</b> ______________________ &nbsp; <b>Class:</b> ____________ &nbsp; <b>Date:</b> ____________</p>
      <p>${document.querySelectorAll('#quiz .q').length} questions, 100 points. For each question, type the letter, the word or the number in the shaded box.</p>
      <p><b>Block letters:</b> ${code('F')} move forward &nbsp;·&nbsp; ${code('L')} turn left &nbsp;·&nbsp; ${code('R')} turn right &nbsp;·&nbsp; ${code('C')} collect crystal</p>
      <p><b>Word bank:</b> ${R.fillBank.map(w => `[ ${w} ]`).join(' ')}</p>`
      + [...document.querySelectorAll('#quiz .qsec')].map(h => {
        const qs = []; let n = h.nextElementSibling; while (n && !n.classList.contains('qsec')) { if (n.classList.contains('q')) qs.push(n); n = n.nextElementSibling }
        return `<h2>${h.textContent.replace(/\d+ points$/, m => '(' + m + ')')}</h2>` + qs.map((q, i) => q.classList.contains('fillq')
          ? '<h3>Question ' + (i + 1) + '</h3><p>' + q.querySelector('.qt').innerHTML + '</p>' + box(1, '<b>My answers (words):</b> ')
          : qHtml(q, i)).join('') }).join('');
  }));
  await b.close();
})().catch(e => { console.error(e); process.exit(1) });
