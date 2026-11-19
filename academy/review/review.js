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
  // One question. mode 'study' (answer in a details box) or 'quiz' (radio buttons / number box).
  function question(q, i, mode){
    const name = `${mode}${i}`;
    const pic = (q.map ? board(q.map, q.dir, q.map[0].length > 9 ? 34 : 40) : '') + (q.prog ? prog(q.prog) : '');
    const answer = q.kind === 'num'
      ? (mode === 'quiz' ? `<label class="numans">Answer: <input type="number" inputmode="numeric" min="0" name="${name}" aria-label="Answer for question ${i + 1}"></label>` : '<div class="numans">Answer: <span class="gap"></span></div>')
      : `<div class="opts">${q.opts.map((o, k) => mode === 'quiz'
          ? `<label class="opt"><input type="radio" name="${name}" value="${k}"><b class="let">${L[k]}</b>${opt(o)}</label>`
          : `<div class="opt"><b class="let">${L[k]}</b>${opt(o)}</div>`).join('')}</div>`;
    const right = q.kind === 'num' ? `<b>${q.a}</b>` : `<b>${L[q.a]}</b>`;
    return `<div class="q" id="${name}" data-i="${i}"><div class="qn">${i + 1}</div><div class="qb">
      <p class="qt">${q.q} ${lessonTag(q.lesson)}</p>${pic ? `<div class="pic">${pic}</div>` : ''}${answer}
      ${mode === 'study' ? `<details class="sol"><summary>Check your answer</summary><p>Answer: ${right}. ${q.why}</p></details>`
        : `<div class="fb" hidden></div><p class="key">Answer: ${right}. ${q.why}</p>`}
    </div></div>`;
  }
  window.Review = {parse, prog, board, blk, question, lessonTag, LETTERS: L};
})();
