// Turns each lesson's classwork page into an editable Word document (.docx).
// Usage: [LEVEL=easy|medium|hard] node tools/teacher-resources/classwork-docx.js [lesson]
// Needs the site served on localhost:8123 (python3 -m http.server 8123), Playwright, and pandoc.
// Writes academy/resources/lesson-N/classwork.docx (Hard) and lesson-N/easy/ + lesson-N/medium/ classwork.docx (editable in Word or Google Docs).
const {chromium} = require('playwright'); const fs = require('fs'); const {execFileSync} = require('child_process'); const path = require('path');
const ROOT = path.join(__dirname, '../..'); const only = process.argv[2] ? +process.argv[2] : null;
const TMP = fs.mkdtempSync(path.join(require('os').tmpdir(), 'cw-'));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1000, height: 1300}, deviceScaleFactor: 2});
  for (let n = 1; n <= 14; n++) for (const sub of ['', 'easy/', 'medium/']) {   // lesson-N/ is the Hard level, lesson-N/easy/ and lesson-N/medium/ the other levels
    if (only && n !== only) continue;
    if (process.env.LEVEL && sub !== (process.env.LEVEL === 'hard' ? '' : process.env.LEVEL + '/')) continue;   // LEVEL=medium builds one level only
    if (sub && !fs.existsSync(path.join(ROOT, `academy/resources/lesson-${n}/${sub}classwork.html`))) continue;
    await p.goto('http://localhost:8123/academy/resources/lesson-' + n + '/' + sub + 'classwork.html'); await p.waitForTimeout(700);
    // Replace maps and block programs with pictures (outermost ones only).
    const shots = await p.$$('.board, .page .prog, .page .rep, .page .blk');
    for (const el of shots) {
      const outer = await el.evaluate(e => !e.parentElement.closest('.prog, .rep') && !!e.isConnected);
      if (!outer) continue;
      const box = await el.boundingBox(); if (!box || !box.width) continue;
      const png = (await el.screenshot()).toString('base64');
      await el.evaluate((e, [d, w, h]) => { const i = document.createElement('img'); i.src = 'data:image/png;base64,' + d;
        i.width = Math.round(w * 0.75); i.height = Math.round(h * 0.75); e.replaceWith(i) }, [png, box.width, box.height]);
    }
    const html = await p.evaluate(() => {
      const pt = x => `<p>${x}</p>`;
      const row = (cells, first) => `<table style="width:100%;border:none"><tr>${first ? `<td style="vertical-align:top;border:none"><b>${first}</b></td>` : ''}${cells.map(c => `<td style="vertical-align:top;border:none">${c}</td>`).join('')}</tr></table>`;
      document.querySelectorAll('.ln').forEach(e => e.outerHTML = pt('______________________________'));
      document.querySelectorAll('.gap').forEach(e => e.outerHTML = '_______________');
      document.querySelectorAll('.name').forEach(e => e.outerHTML = pt('Name: ____________________________ &nbsp; Date: ______________'));
      document.querySelectorAll('.q').forEach(q => { const num = q.querySelector('.num')?.textContent || ''; const task = q.querySelector('.task');
        q.outerHTML = row(task ? [...task.children].map(c => c.outerHTML) : [], num) });
      document.querySelectorAll('.task, .match').forEach(t => t.outerHTML = row([...t.children].map(c => c.outerHTML)));
      document.querySelectorAll('.opts > span').forEach(s => s.insertAdjacentHTML('afterend', '&nbsp;&nbsp;&nbsp;&nbsp;'));
      document.querySelectorAll('.bank span').forEach(s => s.outerHTML = `&nbsp;[ ${s.innerHTML} ]&nbsp;`);
      document.querySelectorAll('.teacher-tag').forEach(s => s.outerHTML = ' (TEACHER ONLY)');
      document.querySelectorAll('.answer').forEach(s => { if (s.tagName === 'TD') s.innerHTML = `<b>${s.innerHTML}</b>`; else s.outerHTML = `<b>${s.innerHTML}</b>` });
      document.querySelectorAll('.key-ref').forEach(k => k.outerHTML = [...k.children].map(c => `<p>${c.outerHTML}</p>`).join(''));
      document.querySelectorAll('.plan').forEach(pl => { const kids = [...pl.children]; let out = '';
        for (let i = 0; i < kids.length; i += 2) out += `<p>${kids[i].outerHTML} &nbsp; ${kids[i + 1] ? kids[i + 1].innerHTML : ''}</p>`; pl.outerHTML = out });
      document.querySelectorAll('table.pat').forEach(t => t.insertAdjacentHTML('beforebegin', '<p>GRIDTABLE</p>'));
      document.querySelectorAll('.code').forEach(s => s.outerHTML = `<span style="font-family:Consolas">${s.innerHTML}</span>`);
      document.querySelectorAll('table.pat').forEach(t => { t.setAttribute('border', '1'); t.style.width = '100%'; t.querySelectorAll('td.blank').forEach(td => td.innerHTML = '&nbsp;<br>&nbsp;') });
      document.querySelectorAll('td, th, table').forEach(e => { e.style.removeProperty('width'); e.removeAttribute('width') });
      return [...document.querySelectorAll('section.page')].map(s => s.innerHTML).join('<p>PAGEBREAK</p>');
    });
    const htmlFile = path.join(TMP, `lesson-${n}-${sub.replace('/', '') || 'hard'}.html`);
    fs.writeFileSync(htmlFile, `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`);
    execFileSync('python3', [path.join(__dirname, 'docx-finish.py'), htmlFile, path.join(ROOT, `academy/resources/lesson-${n}/${sub}classwork.docx`)]);
    console.log('Lesson', n, sub || 'hard', 'classwork.docx written');
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1) });
