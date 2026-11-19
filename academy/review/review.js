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
  // or 'practice' (radio buttons / number box with its own Check my answer button; the answer shows only after the student answers, see scored()).
  function question(q, i, mode){
    const name = q.id || `${mode}${i}`;
    const pic = (q.map ? board(q.map, q.dir, q.map[0].length > 9 ? 34 : 40) : '') + (q.prog ? prog(q.prog) : '');
    const inputs = mode !== 'study';
    // q.order shows the answer choices in another order (a list of option numbers); each radio keeps its option number as its value.
    const ord = q.opts ? (q.order || q.opts.map((o, k) => k)) : [];
    const answer = q.kind === 'num'
      ? (inputs ? `<label class="numans">Answer: <input type="number" inputmode="numeric" min="0" name="${name}" aria-label="Answer for question ${i + 1}"></label>` : '<div class="numans">Answer: <span class="gap"></span></div>')
      : `<div class="opts">${ord.map((k, pos) => inputs
          ? `<label class="opt"><input type="radio" name="${name}" value="${k}"><b class="let">${L[pos]}</b>${opt(q.opts[k])}</label>`
          : `<div class="opt"><b class="let">${L[pos]}</b>${opt(q.opts[k])}</div>`).join('')}</div>`;
    const right = q.kind === 'num' ? `<b>${q.a}</b>` : `<b>${L[ord.indexOf(q.a)]}</b>`;
    return `<div class="q" id="${name}" data-i="${i}"${q.id ? ` data-id="${q.id}"` : ''}><div class="qn">${i + 1}</div><div class="qb">
      <p class="qt">${q.q} ${q.lesson ? lessonTag(q.lesson) : ''}${q.pts ? `<span class="pts">${q.pts} points</span>` : ''}</p>${pic ? `<div class="pic">${pic}</div>` : ''}${answer}
      ${mode === 'study' ? `<details class="sol"><summary>Check your answer</summary><p>Answer: ${right}. ${q.why}</p></details>`
        : mode === 'practice' ? `${checkRow()}<div class="fb" hidden></div><p class="key">Answer: ${right}. ${q.why}</p>`
        : `<div class="fb" hidden></div><p class="key">Answer: ${right}. ${q.why}</p>`}
    </div></div>`;
  }
  // Answers for scored questions. it = {id, kind 'mc'|'num'|'fill', a, pts, why}; el is the question element (data-id).
  const read = (el, it) => {
    if (it.kind === 'num') { const f = el.querySelector('input[type=number]'); return f.value.trim() === '' ? null : +f.value }
    if (it.kind === 'fill') { const v = [...el.querySelectorAll('select')].map(x => x.value); return v.some(x => !x) ? null : v }
    const c = el.querySelector('input[type=radio]:checked'); return c ? +c.value : null };
  const write = (el, it, v) => {
    if (v === null || v === undefined) return;
    if (it.kind === 'num') el.querySelector('input[type=number]').value = v;
    else if (it.kind === 'fill') el.querySelectorAll('select').forEach((x, k) => { x.value = v[k] || '' });
    else { const r = el.querySelector(`input[type=radio][value="${v}"]`); if (r) r.checked = true } };
  const earnedOf = (it, v) => v === null || v === undefined ? 0 : it.kind === 'fill'
    ? v.filter((x, k) => x === it.a[k]).length * it.pts / it.a.length : (v === it.a ? it.pts : 0);
  const lock = el => { el.querySelectorAll('input, select').forEach(f => { f.disabled = true }); const row = el.querySelector('.checkrow'); if (row) row.remove() };
  const pts = n => `${n} point${n === 1 ? '' : 's'}`;
  // Show right or wrong, the points, the right answer and why. Returns the points earned.
  function reveal(el, it, v){
    const earned = earnedOf(it, v); let html;
    if (it.kind === 'fill') {
      const right = it.a.map((x, k) => !!v && v[k] === x), n = right.filter(Boolean).length;
      el.querySelectorAll('select').forEach((x, k) => x.classList.add(right[k] ? 'right' : 'wrong'));
      html = (n === it.a.length ? '✓ All correct! ' : `${n ? '½ ' : '✗ '}You got ${n} of ${it.a.length} blanks. `) + `<b>+${pts(earned)}</b>. The answer${it.a.length > 1 ? 's are' : ' is'}: <b>${it.a.join('</b>, <b>')}</b>.`;
    } else html = (earned ? '✓ Correct! ' : `✗ ${v === null || v === undefined ? 'No answer.' : 'Not quite.'} The answer is <b>${it.kind === 'num' ? it.a : L[it.order ? it.order.indexOf(it.a) : it.a]}</b>. `) + `<b>+${pts(earned)}</b>. ${it.why || ''}`;
    lock(el);
    el.classList.remove('ok', 'no', 'part'); el.classList.add(earned === it.pts ? 'ok' : earned ? 'part' : 'no');
    const fb = el.querySelector('.fb'); fb.hidden = false; fb.className = 'fb ' + (earned === it.pts ? 'ok' : earned ? 'part' : 'no'); fb.innerHTML = html;
    return earned;
  }
  // A fill-in sentence: a menu of bank words for each ____. check adds the study guide's Check my answer button.
  function fillQuestion(f, i, id, bank, points, check){
    let k = 0; const menu = () => `<select aria-label="Blank ${++k}"><option value="">choose…</option>${bank.map(w => `<option>${w}</option>`).join('')}</select><span class="print-only fillgap"></span>`;
    return `<div class="q fillq" data-id="${id}"><div class="qn">${i + 1}</div><div class="qb">
      <p class="qt">${f.s.replace(/____/g, menu)} <span class="pts">${pts(points)}</span></p>
      ${check ? checkRow() : ''}<div class="fb" hidden></div><p class="key">Answer: <b>${f.a.join('</b>, <b>')}</b>.</p></div></div>`;
  }

  // Scored practice (study guide): the student answers first, then Check my answer shows the points, the right answer and why.
  // Only the first answer counts: after checking, the question is locked. Answers are kept in this browser (storeKey),
  // so a reload keeps them. items: [{id, kind 'mc'|'num'|'fill', a, pts, why}], each drawn in root as an element with data-id.
  // onUpdate({earned, done, count, total, restoring}) runs after each check.
  function scored({root, items, storeKey, onUpdate}){
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(storeKey) || '{}') || {} } catch (e) {}
    const res = {}, total = items.reduce((t, it) => t + it.pts, 0);
    const report = restoring => onUpdate && onUpdate({earned: Object.values(res).reduce((t, x) => t + x, 0), done: Object.keys(res).length, count: items.length, total, restoring});
    items.forEach(it => {
      const el = root.querySelector(`[data-id="${it.id}"]`); if (!el) return;
      const msg = el.querySelector('.pickmsg');
      const check = () => { if (res[it.id] !== undefined) return; const v = read(el, it);
        if (v === null) { msg.textContent = it.kind === 'num' ? 'Type a number first.' : it.kind === 'fill' ? 'Fill every blank first.' : 'Pick an answer first.'; return }
        saved[it.id] = v; try { localStorage.setItem(storeKey, JSON.stringify(saved)) } catch (e) {}
        res[it.id] = reveal(el, it, v); report(false) };
      el.querySelector('.check1').onclick = check;
      el.querySelectorAll('input, select').forEach(f => { f.addEventListener('input', () => { msg.textContent = '' });
        if (f.type === 'number') f.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check() } }) });
      if (saved[it.id] !== undefined && saved[it.id] !== null) { write(el, it, saved[it.id]); res[it.id] = reveal(el, it, saved[it.id]) }
    });
    report(true);
    return {total, results: res};
  }
  const checkRow = pts => `<div class="checkrow noprint"><button class="btn sm primary check1" type="button">Check my answer</button><span class="pickmsg"></span></div>`;
  // Shuffle that is the same every time for the same seed (so a student's quiz keeps its order when they reload).
  function shuffler(seedText){
    let h = 2166136261; for (const ch of String(seedText)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) }
    const rnd = () => { h = (h + 0x6D2B79F5) | 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 };
    return list => { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
  }
  window.Review = {parse, prog, board, blk, question, scored, checkRow, fillQuestion, read, write, earnedOf, lock, reveal, lessonTag, shuffler, LETTERS: L};
})();
