// Makes a digital, student-only version of each lesson's classwork for Google Classroom.
// Every "draw / circle / underline / draw a line" task becomes something students can type,
// answers go in shaded boxes, Part D gets a grid to build a map in, and there is no answer key.
// Usage: node tools/teacher-resources/classwork-digital.js [lesson]
// Needs the site served on localhost:8123 (python3 -m http.server 8123), Playwright, and pandoc.
// Writes academy/resources/lesson-N/classwork-digital.docx (open in Google Docs, then assign
// with "Make a copy for each student").
const {chromium} = require('playwright'); const fs = require('fs'); const {execFileSync} = require('child_process'); const path = require('path');
const ROOT = path.join(__dirname, '../..'); const only = process.argv[2] ? +process.argv[2] : null;
const TMP = fs.mkdtempSync(path.join(require('os').tmpdir(), 'cwd-'));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1000, height: 1300}, deviceScaleFactor: 2});
  for (let n = 1; n <= 13; n++) {
    if (only && n !== only) continue;
    await p.goto('http://localhost:8123/academy/resources/lesson-' + n + '/classwork.html'); await p.waitForTimeout(700);
    await p.evaluate(() => { document.querySelectorAll('section.key').forEach(s => s.remove()); document.querySelectorAll('.page .board.blank').forEach(e => e.closest('.task').querySelector('.board').remove()) });
    // Maps and block programs become pictures (outermost ones only).
    for (const el of await p.$$('.page .board, .page .prog, .page .rep, .page .blk')) {
      const outer = await el.evaluate(e => !e.parentElement.closest('.prog, .rep') && !!e.isConnected);
      if (!outer) continue;
      const box = await el.boundingBox(); if (!box || !box.width) continue;
      const png = (await el.screenshot()).toString('base64');
      await el.evaluate((e, [d, w, h]) => { const i = document.createElement('img'); i.src = 'data:image/png;base64,' + d;
        i.width = Math.round(w * 0.75); i.height = Math.round(h * 0.75); e.replaceWith(i) }, [png, box.width, box.height]);
    }
    const html = await p.evaluate(n => {
      // A shaded box to type in. BOXTABLE / GRIDTABLE are turned into borders by docx-finish.py.
      const box = (lines = 2, label = '') => `<p>BOXTABLE</p><table><tr><td>${label}${'&nbsp;<br>'.repeat(lines - 1)}&nbsp;</td></tr></table>`;
      const fix = s => s
        .replace(/Draw the rover's path with a pencil\./g, 'Follow the program on the map one block at a time. Type your answers in the shaded boxes.')
        .replace(/Draw the rover's path\. Cross out each tank it destroys\./g, 'Follow the program on the map one block at a time. Keep track of each tank it destroys. Type your answers in the shaded boxes.')
        .replace(/Draw the (spiral )?path( down the stairs)?\. /g, (m, a, b2) => `Follow the ${a || ''}path${b2 || ''}. `)
        .replace(/Circle the crystals it collects\. /g, 'Count the crystals it collects. ')
        .replace(/Underline the pattern\. /g, 'Find the pattern. ')
        .replace(/Draw a box around one copy of the pattern\. /g, 'Find one copy of the pattern. ')
        .replace(/Mark (the square )?where it stops\./g, 'Where does it stop? Describe the square (for example: 3 squares right of the start).')
        .replace(/Number the checks/g, 'Type a number for each check')
        .replace(/Draw a rover \(with an arrow[^)]*\), (some )?rocks \(shade the square\)/g, 'Build a map in the grid below with a rover, rocks')
        .replace(/enemy tanks \(draw a box with an arrow for its cannon\)/g, 'enemy tanks')
        .replace(/Draw a winding road from the rover/g, 'Build a winding road in the grid below from the rover');
      document.querySelectorAll('h2 .pts').forEach(e => e.insertAdjacentHTML('beforebegin', ' · '));
      document.querySelectorAll('.instr, .lines p, td').forEach(e => { const h = fix(e.innerHTML); if (h !== e.innerHTML) e.innerHTML = h });
      document.querySelectorAll('.name').forEach(e => e.outerHTML = '<p><b>Name:</b> ______________________ &nbsp; <b>Date:</b> ____________</p>');
      // Questions: number, picture, question, then answer boxes (one column reads well in Google Docs).
      document.querySelectorAll('.q').forEach(q => {
        const num = q.querySelector('.num')?.textContent || ''; const img = q.querySelector('img'); const lines = q.querySelector('.lines');
        let out = `<h3>Question ${num}</h3>` + (img ? `<p>${img.outerHTML}</p>` : '');
        [...lines.children].forEach(c => {
          if (c.classList.contains('ln')) { if (!c.previousElementSibling?.classList.contains('ln')) out += box(c.nextElementSibling?.classList.contains('ln') ? 3 : 2) }
          else if (/How many blocks\?/.test(c.textContent)) out += `<p>${c.innerHTML.replace(/______/, '')}</p>` + box(1);
          else out += `<p>${c.innerHTML}</p>`;
        });
        q.outerHTML = out;
      });
      // Part C table: shade the answer cells.
      document.querySelectorAll('table.pat').forEach(t => { t.insertAdjacentHTML('beforebegin', '<p>GRIDTABLE</p>');
        t.querySelectorAll('td.blank').forEach(td => td.innerHTML = 'ANSWERCELL&nbsp;<br>&nbsp;') });
      // Part D: a grid to build a map in by typing symbols.
      const pages = [...document.querySelectorAll('section.page')];
      const design = pages[1].querySelector('.task');
      if (design) {
        const sym = /tank/i.test(design.previousElementSibling?.textContent || '')
          ? 'R> R< R^ Rv = rover and the way it faces, # = rock, T> T< T^ Tv = enemy tank and the way its cannon points'
          : 'R> R< R^ Rv = rover and the way it faces, # = rock, C = crystal, F = flag';
        const grid = '<p>GRIDTABLE</p><table>' + Array.from({length: 6}, () => '<tr>' + Array.from({length: 8}, () => '<td>&nbsp;&nbsp;&nbsp;</td>').join('') + '</tr>').join('') + '</table>';
        design.outerHTML = `<p><b>Build your map:</b> click a square and type a symbol. ${sym}. You can also fill a square with color (Format → Table → Table properties → Cell background color).</p>${grid}
          <p><b>My program:</b></p>${box(3)}<p><b>Blocks:</b></p>${box(1)}<p><b>Partner checked (partner's name):</b></p>${box(1)}`;
      }
      // Reflect: one box instead of lines.
      pages[1].querySelectorAll(':scope > .ln').forEach((l, i) => l.outerHTML = i === 0 ? box(3) : '');
      // Part E: matching, multiple choice and sentence frames, all typed.
      const p3 = pages[2];
      p3.querySelectorAll('.instr').forEach(i => {
        if (/Draw a line from each word/.test(i.textContent)) i.textContent = 'Type the letter of the matching meaning in the box next to each word.';
        if (/Circle the best answer/.test(i.textContent)) i.textContent = 'Type the letter of the best answer in the box.';
        if (/Finish each sentence/.test(i.textContent)) i.textContent = 'Finish each sentence. Type the missing words in the box. Use the word bank.';
      });
      const match = p3.querySelector('.match');
      if (match) {
        const words = [...match.querySelectorAll('.mw li')], means = [...match.querySelectorAll('.mm li')];
        match.outerHTML = '<p><b>Meanings</b></p>' + means.map((m, i) => `<p><b>${'abcdefgh'[i]})</b> ${m.innerHTML}</p>`).join('')
          + '<p>GRIDTABLE</p><table><tr><th>#</th><th>Word</th><th>Letter</th></tr>' + words.map((w, i) => `<tr><td>${i + 1}</td><td>${w.innerHTML}</td><td>ANSWERCELL&nbsp;</td></tr>`).join('') + '</table>';
      }
      p3.querySelectorAll('.mc').forEach(mc => { const [q, opts] = mc.children;
        mc.outerHTML = `<p>${q.innerHTML}</p>` + [...opts.children].map(o => `<p>&nbsp;&nbsp;&nbsp;${o.innerHTML}</p>`).join('') + box(1, '<b>Answer:</b> ') });
      p3.querySelectorAll('.bank span').forEach(s => s.outerHTML = `&nbsp;[ ${s.innerHTML} ]&nbsp;`);
      p3.querySelectorAll('.frame').forEach(f => { f.querySelectorAll('.gap').forEach(g => g.outerHTML = '______'); f.insertAdjacentHTML('afterend', box(1)) });
      document.querySelectorAll('.key-ref').forEach(k => k.outerHTML = '<p><b>Block letters:</b> ' + [...k.children].map(c => c.innerHTML).join(' &nbsp;·&nbsp; ') + '</p>');
      document.querySelectorAll('.code').forEach(s => s.outerHTML = `<span style="font-family:Consolas">${s.innerHTML}</span>`);
      document.querySelectorAll('td, th, table').forEach(e => { e.style.removeProperty('width'); e.removeAttribute('width') });
      document.querySelectorAll('.head').forEach(h => { const lbl = h.querySelector('.label'); if (lbl) lbl.outerHTML = `<p>${lbl.textContent} (digital)</p>` });
      return pages.map(s => s.innerHTML).join('<p>PAGEBREAK</p>');
    }, n);
    const htmlFile = path.join(TMP, `lesson-${n}.html`);
    fs.writeFileSync(htmlFile, `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`);
    execFileSync('python3', [path.join(__dirname, 'docx-finish.py'), htmlFile, path.join(ROOT, `academy/resources/lesson-${n}/classwork-digital.docx`)]);
    console.log('Lesson', n, 'classwork-digital.docx written');
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1) });
