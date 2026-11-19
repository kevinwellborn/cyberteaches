// Shared code for the unit review pages (study guide and quiz). Content comes from unit-N/data.js (window.REVIEW).
// Draws programs as blocks and maps as boards (resources.js draws the boards).
(function(){
  const NAMES = {F: ['move', 'move forward'], L: ['move', 'turn left'], R: ['move', 'turn right'], C: ['act', 'collect crystal']};
  function parse(src){
    const t = src.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').trim().split(/\s+/); let i = 0;
    const list = () => { const out = []; while(i < t.length && t[i] !== ']'){ const w = t[i++];
      if(w === 'repeat'){ const n = t[i++]; i++; const body = list(); i++; out.push({n, body}) }
      else if(w === 'until'){ i += 2; const body = list(); i++; out.push({until: true, body}) }
      else out.push(w) } return out };
    return list();
  }
  const blk = w => `<span class="blk ${NAMES[w][0]}">${NAMES[w][1]}</span>`;
  const html = p => p.map(n => typeof n === 'string' ? blk(n)
    : `<div class="rep${n.until ? ' until' : ''}"><div class="head">${n.until ? 'repeat until at flag' : `repeat <span class="num">${n.n}</span> times`}</div><div class="inner">${html(n.body)}</div></div>`).join('');
  const prog = src => `<div class="prog" aria-label="Program: ${src}">${html(parse(src))}</div>`;
  const board = (rows, dir, cell) => `<div class="board" data-map="${rows.join('|')}" data-dir="${dir}" style="--cell:${cell || 40}px"></div>`;
  const opt = o => typeof o === 'string' ? `<span class="otext">${o}</span>` : o.p ? prog(o.p) : blk(o.b);
  const L = 'ABCD';
  const lessonTag = n => `<span class="ltag l${n}">Lesson ${n}</span>`;
  // One question. mode 'study' (answer in a details box), 'quiz' (radio buttons / number box, checked all at once at the end)
  // or 'practice' (radio buttons / number box with its own Check my answer button; the answer shows only after the student answers).
  function question(q, i, mode){
    const name = `${mode}${i}`;
    const pic = (q.map ? board(q.map, q.dir, q.map[0].length > 9 ? 34 : 40) : '') + (q.prog ? prog(q.prog) : '');
    const inputs = mode !== 'study';
    const answer = q.kind === 'num'
      ? (inputs ? `<label class="numans">Answer: <input type="number" inputmode="numeric" min="0" name="${name}" aria-label="Answer for question ${i + 1}"></label>` : '<div class="numans">Answer: <span class="gap"></span></div>')
      : `<div class="opts">${q.opts.map((o, k) => inputs
          ? `<label class="opt"><input type="radio" name="${name}" value="${k}"><b class="let">${L[k]}</b>${opt(o)}</label>`
          : `<div class="opt"><b class="let">${L[k]}</b>${opt(o)}</div>`).join('')}</div>`;
    const right = q.kind === 'num' ? `<b>${q.a}</b>` : `<b>${L[q.a]}</b>`;
    return `<div class="q" id="${name}" data-i="${i}"><div class="qn">${i + 1}</div><div class="qb">
      <p class="qt">${q.q} ${lessonTag(q.lesson)}</p>${pic ? `<div class="pic">${pic}</div>` : ''}${answer}
      ${mode === 'study' ? `<details class="sol"><summary>Check your answer</summary><p>Answer: ${right}. ${q.why}</p></details>`
        : mode === 'practice' ? `<div class="checkrow noprint"><button class="btn sm check1" type="button">Check my answer</button><span class="pickmsg"></span></div><div class="fb" hidden></div><p class="key">Answer: ${right}. ${q.why}</p>`
        : `<div class="fb" hidden></div><p class="key">Answer: ${right}. ${q.why}</p>`}
    </div></div>`;
  }
  // Practice questions: the student answers first, then Check my answer shows right or wrong, the right answer and why.
  // onChange(right, checked) reports the running tally.
  function practice(root, qs, onChange){
    const done = {};
    const value = (el, i) => { const q = qs[i];
      if (q.kind === 'num') { const f = el.querySelector('input[type=number]'); return f.value.trim() === '' ? null : +f.value }
      const c = el.querySelector('input[type=radio]:checked'); return c ? +c.value : null };
    root.querySelectorAll('.q').forEach(el => {
      const i = +el.dataset.i, q = qs[i], fb = el.querySelector('.fb'), msg = el.querySelector('.pickmsg');
      const check = () => { const a = value(el, i);
        if (a === null) { msg.textContent = q.kind === 'num' ? 'Type a number first.' : 'Pick an answer first.'; return }
        msg.textContent = ''; const ok = a === q.a; done[i] = ok;
        el.classList.remove('ok', 'no'); el.classList.add(ok ? 'ok' : 'no');
        fb.hidden = false; fb.className = 'fb ' + (ok ? 'ok' : 'no');
        fb.innerHTML = (ok ? '✓ Correct! ' : `✗ Not quite. The answer is <b>${q.kind === 'num' ? q.a : L[q.a]}</b>. `) + q.why;
        el.querySelector('.check1').textContent = 'Check again';
        if (onChange) onChange(Object.values(done).filter(Boolean).length, Object.keys(done).length) };
      el.querySelector('.check1').onclick = check;
      el.querySelectorAll('input').forEach(f => { f.addEventListener('input', () => { msg.textContent = '' });
        if (f.type === 'number') f.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check() } }) });
    });
  }
  window.Review = {parse, prog, board, blk, question, practice, lessonTag, LETTERS: L};
})();
