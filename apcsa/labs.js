// Hands-on labs for AP CS A. Each lab has a card entry (AP_LABS), the topics it belongs to,
// and a function that builds it inside the lab page: run(el, esc).
// Nothing is sent anywhere: every lab runs in the browser and follows Java's rules in JavaScript.
(function () {
  const LAB = {
    expr: { title: 'Java Expression Challenge', blurb: 'Predict what Java prints for integer division, %, casting, and String joins.', topics: ['1.3', '1.5', '1.6'],
      intro: 'Type exactly what Java would print for each expression. Watch out for integer division, the remainder operator, casting, and Strings joined with +. A double always prints with a decimal point, like 4.0.' },
    strings: { title: 'String Index Explorer', blurb: 'See every index of a String and try substring and indexOf.', topics: ['1.15', '2.10'],
      intro: 'Type any word. Each character gets an index starting at 0. Pick a start and end index to see what substring returns, and remember the end index is not included.' },
    loop: { title: 'Loop Tracer', blurb: 'Build a for loop and step through it with a trace table.', topics: ['2.7', '2.8', '2.12'],
      intro: 'Choose the start value, the condition, and the update. Then step through the loop one pass at a time and watch the trace table fill in. How many times does the body run?' },
    truth: { title: 'Truth Table Builder', blurb: "Fill in truth tables to test De Morgan's laws and other Boolean rules.", topics: ['2.5', '2.6'],
      intro: 'Click each cell to set it to true or false. When every cell is right, you will see whether the two expressions are equivalent: the same for every input.' },
    grid: { title: '2D Array Explorer', blurb: 'Click cells to see grid[row][col] and watch row-major and column-major order.', topics: ['4.11', '4.12', '4.13'],
      intro: 'Click any cell to see how Java names it. Then play a row-major or column-major traversal and watch the order the nested loops visit the cells.' },
    search: { title: 'Binary Search Game', blurb: 'Act as binary search: pick the middle each time and halve the list.', topics: ['4.14', '4.17'],
      intro: 'The array is sorted. Find the target the way binary search does: click the element at index mid = (low + high) / 2 each time. Elements that cannot hold the target fade out.' },
    sort: { title: 'Sorting Visualizer', blurb: 'Step through selection sort, insertion sort, and merge sort.', topics: ['4.15', '4.17'],
      intro: 'Pick an algorithm and step through it. Highlighted bars are being compared or moved. Count the comparisons each algorithm makes on the same data.' }
  };

  const css = `
  .lab-box{display:grid;gap:14px}
  .lab-input{font:16px var(--f-mono);padding:10px 12px;border:2px solid var(--line);border-radius:10px;background:var(--panel);color:var(--ink);width:100%;max-width:520px}
  .lab-input.sm{width:auto;max-width:120px}
  .mono{font-family:var(--f-mono);word-break:break-all}
  .lab-table{border-collapse:collapse;font-size:14px;font-variant-numeric:tabular-nums}
  .lab-table th,.lab-table td{border-bottom:1px solid var(--line);padding:6px 10px;text-align:left}
  .scroll{overflow-x:auto}
  .code{font-family:var(--f-mono);font-size:15px;background:var(--term);color:var(--term-ink);border-radius:12px;padding:12px 0;overflow-x:auto}
  .code div{padding:1px 16px;white-space:pre}
  .code div.cur{background:color-mix(in srgb, var(--accent) 45%, transparent)}
  .big-expr{font:700 24px var(--f-mono);background:var(--term);color:var(--term-ink);padding:14px 18px;border-radius:12px;overflow-x:auto;white-space:pre}
  .chars{display:flex;flex-wrap:wrap;gap:4px}
  .chars div{display:grid;justify-items:center;gap:2px;font-family:var(--f-mono)}
  .chars b{display:grid;place-items:center;width:40px;height:44px;border-radius:8px;border:2px solid var(--line);background:var(--panel-2);font-size:20px}
  .chars b.on{background:var(--u, var(--accent));border-color:var(--u, var(--accent));color:#fff}
  .chars small{color:var(--muted);font-size:12px}
  .tt{border-collapse:collapse;font-family:var(--f-mono);font-size:15px}
  .tt th,.tt td{border:1px solid var(--line);padding:6px 10px;text-align:center}
  .tt th{text-transform:none;letter-spacing:0;font-family:var(--f-mono)}
  .tt button{font:inherit;min-width:64px;padding:4px 8px;border-radius:8px;border:2px solid var(--line);background:var(--panel-2);color:var(--ink);cursor:pointer}
  .tt button.t{background:color-mix(in srgb, var(--good) 22%, var(--panel))}
  .tt button.f{background:color-mix(in srgb, var(--bad) 18%, var(--panel))}
  .tt button.bad{outline:3px solid var(--bad)}
  .g2{display:grid;gap:4px;width:max-content}
  .g2 button{width:52px;height:46px;border-radius:8px;border:2px solid var(--line);background:var(--panel-2);font:700 16px var(--f-mono);color:var(--ink);cursor:pointer}
  .g2 button.on{background:var(--u, var(--accent));border-color:var(--u, var(--accent));color:#fff}
  .g2 button.seen{background:color-mix(in srgb, var(--u, var(--accent)) 22%, var(--panel))}
  .g2 .hd{display:grid;place-items:center;font:12px var(--f-mono);color:var(--muted)}
  .arr{display:flex;flex-wrap:wrap;gap:4px}
  .arr div{display:grid;justify-items:center;gap:2px}
  .arr button{width:46px;height:46px;border-radius:8px;border:2px solid var(--line);background:var(--panel-2);font:700 16px var(--f-mono);color:var(--ink);cursor:pointer}
  .arr button.out{opacity:.22}
  .arr button.hit{background:var(--good);border-color:var(--good);color:#fff}
  .arr button.mid{outline:3px solid var(--u, var(--accent))}
  .arr small{font:12px var(--f-mono);color:var(--muted)}
  .sbars{display:flex;align-items:flex-end;gap:6px;height:180px;padding:8px;border:1px solid var(--line);border-radius:12px;background:var(--panel-2)}
  .sbars div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:4px;height:100%}
  .sbars i{display:block;width:100%;border-radius:6px 6px 0 0;background:color-mix(in srgb, var(--u, var(--accent)) 35%, var(--panel))}
  .sbars i.hl{background:var(--u, var(--accent))}
  .sbars i.done{background:var(--good)}
  .sbars span{font:12px var(--f-mono)}
  `;

  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  // Java prints a whole-number double with ".0".
  const dbl = v => Number.isInteger(v) ? v + '.0' : String(+v.toFixed(6));

  // Each maker returns [expression text, what Java prints, short explanation].
  const MAKERS = [
    () => { const a = rnd(7, 40), b = rnd(2, 6); return [`${a} / ${b}`, String(Math.trunc(a / b)), `Both are ints, so this is integer division: the decimal part is dropped.`]; },
    () => { const a = rnd(7, 40), b = rnd(2, 7); return [`${a} % ${b}`, String(a % b), `% gives the remainder: ${a} = ${b} × ${Math.trunc(a / b)} + ${a % b}.`]; },
    () => { const a = rnd(3, 30), b = pick([2, 4, 5]); return [`${a} / ${b}.0`, dbl(a / b), `One side is a double, so Java divides with decimals and prints a double.`]; },
    () => { const w = rnd(1, 20), f = rnd(1, 9); return [`(int) ${w}.${f}${rnd(0, 9)}`, String(w), `Casting to int truncates: it cuts off the decimal part without rounding.`]; },
    () => { const a = rnd(3, 25), b = pick([2, 4, 5]); return [`(double) ${a} / ${b}`, dbl(a / b), `The cast happens first, so ${a} becomes ${a}.0 and the division keeps decimals.`]; },
    () => { const a = rnd(3, 25), b = pick([2, 4, 5]); return [`(double) (${a} / ${b})`, dbl(Math.trunc(a / b)), `The parentheses run first: integer division gives ${Math.trunc(a / b)}, then it becomes a double.`]; },
    () => { const a = rnd(1, 9), b = rnd(1, 9); return [`"Sum: " + ${a} + ${b}`, `Sum: ${a}${b}`, `Java works left to right. "Sum: " + ${a} is a String, so ${b} is joined on as text.`]; },
    () => { const a = rnd(1, 9), b = rnd(1, 9); return [`${a} + ${b} + " points"`, `${a + b} points`, `Left to right: ${a} + ${b} is int addition first, then the String is joined.`]; },
    () => { const a = rnd(1, 9), b = rnd(2, 6), c = rnd(2, 6), d = rnd(1, 9); return [`${a} + ${b} * ${c} - ${d}`, String(a + b * c - d), `* happens before + and -: ${b} * ${c} = ${b * c}.`]; },
    () => { const a = rnd(10, 30), b = rnd(3, 6), c = rnd(2, 4); return [`${a} % ${b} * ${c}`, String((a % b) * c), `% and * have the same precedence, so Java goes left to right.`]; },
    () => { const a = rnd(10, 40), b = rnd(3, 8); return [`${a} / ${b} * ${b}`, String(Math.trunc(a / b) * b), `Integer division first gives ${Math.trunc(a / b)}, so multiplying back does not always return ${a}.`]; },
    () => { const x = rnd(2, 9); return [`int x = ${x};\nx += 3;\nx *= 2;\nSystem.out.println(x);`, String((x + 3) * 2), `x becomes ${x + 3}, then ${(x + 3) * 2}.`]; }
  ];

  const RUN = {
    expr(el, esc) {
      let cur, score = 0, tries = 0;
      el.innerHTML = `<div class="card lab-box">
        <span class="label">What does Java print?</span>
        <div class="big-expr" id="ex"></div>
        <form id="f" class="row"><input id="ans" class="lab-input" style="max-width:260px" autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="Type the output"><button class="btn primary">Check</button><button class="btn" type="button" id="skip">New one</button></form>
        <div id="fb" aria-live="polite"></div>
        <span class="muted" id="sc"></span></div>`;
      const next = () => { cur = pick(MAKERS)(); const t = cur[0]; el.querySelector('#ex').textContent = t.includes('\n') ? t : `System.out.println(${t});`; el.querySelector('#ans').value = ''; el.querySelector('#fb').innerHTML = ''; el.querySelector('#ans').focus(); };
      el.querySelector('#f').addEventListener('submit', e => {
        e.preventDefault();
        const v = el.querySelector('#ans').value.trim().replace(/^"(.*)"$/, '$1');
        if (!v) return;
        tries++;
        const right = v === cur[1];
        if (right) score++;
        el.querySelector('#fb').innerHTML = `<div class="result ${right ? 'ok' : 'no'}"><b>${right ? 'Correct.' : `Not quite. Java prints ${esc(cur[1])}.`}</b> ${esc(cur[2])}</div><button class="btn primary" style="margin-top:10px" id="nx" type="button">Next</button>`;
        el.querySelector('#nx').addEventListener('click', next);
        el.querySelector('#sc').textContent = `Score: ${score} of ${tries}`;
      });
      el.querySelector('#skip').addEventListener('click', next);
      next();
    },

    strings(el, esc) {
      el.innerHTML = `<div class="card lab-box">
        <label>String s = <input id="s" class="lab-input" style="max-width:300px" value="COMPUTER" maxlength="16" autocomplete="off" spellcheck="false"></label>
        <div class="chars" id="ch"></div>
        <div class="row">
          <label>start <input id="a" class="lab-input sm" type="number" value="3"></label>
          <label>end <input id="b" class="lab-input sm" type="number" value="6"></label>
        </div>
        <div class="code"><div id="out1"></div><div id="out2"></div></div>
        <label>indexOf: <input id="f" class="lab-input" style="max-width:200px" value="UT" autocomplete="off" spellcheck="false"></label>
        <div class="code"><div id="out3"></div></div>
        <p class="muted" style="margin:0">Tip: substring(i, i + 1) is one character, and substring(i) goes to the end.</p></div>`;
      const q = id => el.querySelector('#' + id);
      const draw = () => {
        const s = q('s').value, a = parseInt(q('a').value, 10), b = parseInt(q('b').value, 10), f = q('f').value;
        const ok = !isNaN(a) && !isNaN(b) && a >= 0 && b <= s.length && a <= b;
        const at = s.indexOf(f);
        q('ch').innerHTML = [...s].map((c, i) => `<div><b class="${ok && i >= a && i < b ? 'on' : ''}">${esc(c === ' ' ? '␣' : c)}</b><small>${i}</small></div>`).join('') || '<span class="muted">Type a word above.</span>';
        q('out1').textContent = `s.length()          → ${s.length}`;
        q('out2').textContent = `s.substring(${isNaN(a) ? '?' : a}, ${isNaN(b) ? '?' : b}) → ` + (ok ? `"${s.substring(a, b)}"` : 'StringIndexOutOfBoundsException');
        q('out3').textContent = `s.indexOf("${f}") → ${at}` + (at < 0 ? '   (not found)' : '');
      };
      el.querySelectorAll('input').forEach(x => x.addEventListener('input', draw));
      draw();
    },

    loop(el, esc) {
      el.innerHTML = `<div class="card lab-box">
        <div class="row" style="align-items:center">
          <span class="mono">for (int i =</span><input id="st" class="lab-input sm" type="number" value="0">
          <span class="mono">; i</span><select id="op" class="lab-input sm"><option>&lt;</option><option>&lt;=</option><option>&gt;</option><option>&gt;=</option><option>!=</option></select>
          <input id="lim" class="lab-input sm" type="number" value="10">
          <span class="mono">;</span><select id="up" class="lab-input" style="width:auto"><option>i++</option><option>i--</option><option>i += 2</option><option>i += 3</option><option>i -= 2</option><option>i *= 2</option></select><span class="mono">)</span>
        </div>
        <div class="code" id="code"></div>
        <div class="row"><button class="btn primary" id="step" type="button">Step</button><button class="btn" id="all" type="button">Run to the end</button><button class="btn" id="reset" type="button">Reset</button></div>
        <div id="fb" aria-live="polite"></div>
        <div class="scroll"><table class="lab-table"><thead><tr><th>Pass</th><th>i</th><th>Condition</th><th>Prints</th></tr></thead><tbody id="tb"></tbody></table></div></div>`;
      const q = id => el.querySelector('#' + id);
      const LIMIT = 40;
      let rows, i, pass, done;
      const cond = v => { const L = +q('lim').value; switch (q('op').value) { case '<': return v < L; case '<=': return v <= L; case '>': return v > L; case '>=': return v >= L; default: return v !== L; } };
      const upd = v => ({ 'i++': v + 1, 'i--': v - 1, 'i += 2': v + 2, 'i += 3': v + 3, 'i -= 2': v - 2, 'i *= 2': v * 2 })[q('up').value];
      const header = () => `for (int i = ${q('st').value}; i ${q('op').value} ${q('lim').value}; ${q('up').value}) {`;
      const reset = () => { i = +q('st').value; pass = 0; done = false; rows = []; draw(); };
      const step = () => {
        if (done) return;
        const c = cond(i);
        if (!c) { rows.push(['end', i, 'false: loop ends', '']); done = true; }
        else if (pass >= LIMIT) { done = true; rows.push(['…', i, 'still true', '']); q('fb').innerHTML = `<div class="result no"><b>Stopped after ${LIMIT} passes.</b> This loop may never end: an infinite loop. Check that the update moves i toward making the condition false.</div>`; }
        else { pass++; rows.push([pass, i, 'true', String(i)]); i = upd(i); }
        if (done && pass < LIMIT + 1 && !q('fb').innerHTML) q('fb').innerHTML = `<div class="result ok"><b>The body ran ${pass} time${pass === 1 ? '' : 's'}.</b> The condition was checked ${pass + 1} times: once before each pass, plus the final check that was false.</div>`;
        draw();
      };
      function draw(){
        q('code').innerHTML = [header(), '  System.out.print(i + " ");', '}'].map((l, k) => `<div class="${!done && k === 0 ? 'cur' : ''}">${esc(l)}</div>`).join('') + `<div style="color:var(--muted)">Output: ${esc(rows.filter(r => r[3] !== '').map(r => r[3]).join(' '))}</div>`;
        q('tb').innerHTML = rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('');
        if (!rows.length) q('fb').innerHTML = '';
      }
      q('step').addEventListener('click', step);
      q('all').addEventListener('click', () => { let n = 0; while (!done && n++ < LIMIT + 2) step(); });
      q('reset').addEventListener('click', reset);
      el.querySelectorAll('input,select').forEach(x => x.addEventListener('change', reset));
      reset();
    },

    truth(el, esc) {
      const PAIRS = [
        ['!(a && b)', a => !(a[0] && a[1]), '!a || !b', a => !a[0] || !a[1]],
        ['!(a || b)', a => !(a[0] || a[1]), '!a && !b', a => !a[0] && !a[1]],
        ['!(a && b)', a => !(a[0] && a[1]), '!a && !b', a => !a[0] && !a[1]],
        ['!(a || b)', a => !(a[0] || a[1]), '!a || !b', a => !a[0] || !a[1]],
        ['a || (a && b)', a => a[0] || (a[0] && a[1]), 'a', a => a[0]],
        ['a && (a || b)', a => a[0] && (a[0] || a[1]), 'a && b', a => a[0] && a[1]],
        ['!(!a || b)', a => !(!a[0] || a[1]), 'a && !b', a => a[0] && !a[1]]
      ];
      const INPUTS = [[true, true], [true, false], [false, true], [false, false]];
      let p = 0, cells;
      el.innerHTML = `<div class="card lab-box">
        <label>Compare <select id="pick" class="lab-input" style="width:auto">${PAIRS.map((x, k) => `<option value="${k}">${esc(x[0])}   vs   ${esc(x[2])}</option>`).join('')}</select></label>
        <div class="scroll"><table class="tt" id="tt"></table></div>
        <div class="row"><button class="btn primary" id="chk" type="button">Check my table</button><button class="btn" id="show" type="button">Show answers</button></div>
        <div id="fb" aria-live="polite"></div></div>`;
      const q = id => el.querySelector('#' + id);
      const draw = () => {
        const P = PAIRS[p];
        q('tt').innerHTML = `<tr><th>a</th><th>b</th><th>${esc(P[0])}</th><th>${esc(P[2])}</th></tr>` + INPUTS.map((inp, r) => `<tr><td>${inp[0]}</td><td>${inp[1]}</td>${[0, 1].map(c => { const v = cells[r][c]; return `<td><button type="button" data-r="${r}" data-c="${c}" class="${v === null ? '' : v ? 't' : 'f'}">${v === null ? '?' : v}</button></td>`; }).join('')}</tr>`).join('');
      };
      const reset = () => { p = +q('pick').value; cells = INPUTS.map(() => [null, null]); q('fb').innerHTML = ''; draw(); };
      q('tt').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const r = +b.dataset.r, c = +b.dataset.c; cells[r][c] = cells[r][c] === true ? false : true; q('fb').innerHTML = ''; draw(); });
      const check = reveal => {
        const P = PAIRS[p];
        let wrong = 0;
        INPUTS.forEach((inp, r) => [P[1], P[3]].forEach((f, c) => { if (reveal) cells[r][c] = f(inp); else if (cells[r][c] !== f(inp)) wrong++; }));
        draw();
        if (!reveal) INPUTS.forEach((inp, r) => [P[1], P[3]].forEach((f, c) => { if (cells[r][c] !== f(inp)) el.querySelector(`[data-r="${r}"][data-c="${c}"]`).classList.add('bad'); }));
        if (wrong) { q('fb').innerHTML = `<div class="result no"><b>${wrong} cell${wrong === 1 ? ' is' : 's are'} not right yet.</b> Work inside the parentheses first, then apply the !.</div>`; return; }
        const same = INPUTS.every(inp => P[1](inp) === P[3](inp));
        q('fb').innerHTML = `<div class="result ${same ? 'ok' : 'no'}"><b>${same ? 'Equivalent.' : 'Not equivalent.'}</b> ${same ? 'The two columns match on every row, so you can use either expression.' : 'At least one row is different, so these expressions are not the same.'}${p < 2 ? " This is De Morgan's law." : ''}</div>`;
      };
      q('chk').addEventListener('click', () => check(false));
      q('show').addEventListener('click', () => check(true));
      q('pick').addEventListener('change', reset);
      reset();
    },

    grid(el, esc) {
      const R = 3, C = 4;
      const g = Array.from({ length: R }, () => Array.from({ length: C }, () => rnd(1, 9)));
      let timer = null, seen = new Set(), on = null;
      el.innerHTML = `<div class="card lab-box">
        <div class="code"><div>int[][] grid = new int[${R}][${C}];   // grid.length is ${R}, grid[0].length is ${C}</div></div>
        <div class="scroll"><div class="g2" id="g" style="grid-template-columns:40px repeat(${C}, 52px)"></div></div>
        <div class="code"><div id="cell">Click a cell.</div></div>
        <div class="row"><button class="btn primary" id="rm" type="button">Play row-major</button><button class="btn" id="cm" type="button">Play column-major</button></div>
        <div class="code" id="loopCode"></div>
        <div class="mono" id="out"></div></div>`;
      const q = id => el.querySelector('#' + id);
      const draw = () => {
        q('g').innerHTML = '<span></span>' + Array.from({ length: C }, (_, c) => `<span class="hd">col ${c}</span>`).join('') +
          g.map((row, r) => `<span class="hd">row ${r}</span>` + row.map((v, c) => `<button type="button" data-r="${r}" data-c="${c}" class="${on && on[0] === r && on[1] === c ? 'on' : seen.has(r + ',' + c) ? 'seen' : ''}">${v}</button>`).join('')).join('');
      };
      q('g').addEventListener('click', e => { const b = e.target.closest('button'); if (!b || timer) return; on = [+b.dataset.r, +b.dataset.c]; seen.clear(); q('cell').textContent = `grid[${on[0]}][${on[1]}] is ${g[on[0]][on[1]]}   (row ${on[0]}, column ${on[1]})`; draw(); });
      const play = rowMajor => {
        if (timer) clearInterval(timer);
        seen.clear(); on = null;
        const order = [];
        if (rowMajor) for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) order.push([r, c]);
        else for (let c = 0; c < C; c++) for (let r = 0; r < R; r++) order.push([r, c]);
        q('loopCode').innerHTML = (rowMajor
          ? ['for (int r = 0; r < grid.length; r++)', '  for (int c = 0; c < grid[0].length; c++)', '    System.out.print(grid[r][c] + " ");']
          : ['for (int c = 0; c < grid[0].length; c++)', '  for (int r = 0; r < grid.length; r++)', '    System.out.print(grid[r][c] + " ");']).map(l => `<div>${esc(l)}</div>`).join('');
        const out = [];
        let k = 0;
        timer = setInterval(() => {
          if (k >= order.length) { clearInterval(timer); timer = null; on = null; draw(); return; }
          const [r, c] = order[k++];
          if (on) seen.add(on[0] + ',' + on[1]);
          on = [r, c]; out.push(g[r][c]);
          q('cell').textContent = `r = ${r}, c = ${c}: grid[${r}][${c}] is ${g[r][c]}`;
          q('out').textContent = 'Output: ' + out.join(' ');
          draw();
        }, 450);
      };
      q('rm').addEventListener('click', () => play(true));
      q('cm').addEventListener('click', () => play(false));
      draw();
    },

    search(el, esc) {
      let a, target, lo, hi, steps, found;
      el.innerHTML = `<div class="card lab-box">
        <div class="row" style="justify-content:space-between"><div><span class="label">Find the target</span><div style="font:800 34px var(--f-display)" id="tg"></div></div><div class="mono" id="st"></div></div>
        <div class="arr" id="arr"></div>
        <div id="fb" aria-live="polite"></div>
        <div class="row"><button class="btn" id="new" type="button">New array</button></div></div>`;
      const q = id => el.querySelector('#' + id);
      const reset = () => {
        const set = new Set(); while (set.size < 15) set.add(rnd(1, 99));
        a = [...set].sort((x, y) => x - y);
        target = Math.random() < 0.85 ? pick(a) : (() => { let t; do t = rnd(1, 99); while (set.has(t)); return t; })();
        lo = 0; hi = a.length - 1; steps = 0; found = null;
        q('fb').innerHTML = ''; draw();
      };
      const draw = () => {
        q('tg').textContent = target;
        q('st').textContent = found === null ? `low = ${lo}   high = ${hi}   checks: ${steps}` : `checks: ${steps}`;
        q('arr').innerHTML = a.map((v, i) => `<div><button type="button" data-i="${i}" class="${found === i ? 'hit' : (i < lo || i > hi) ? 'out' : ''}">${v}</button><small>${i}</small></div>`).join('');
      };
      q('arr').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b || found !== null) return;
        const i = +b.dataset.i, mid = Math.floor((lo + hi) / 2);
        if (i !== mid) { q('fb').innerHTML = `<div class="result no"><b>Binary search checks the middle.</b> mid = (${lo} + ${hi}) / 2 = ${mid}, using integer division. Click index ${mid}.</div>`; return; }
        steps++;
        if (a[mid] === target) { found = mid; q('fb').innerHTML = `<div class="result ok"><b>Found ${target} at index ${mid} in ${steps} check${steps === 1 ? '' : 's'}.</b> Linear search would have needed ${mid + 1}.</div>`; }
        else if (a[mid] < target) { lo = mid + 1; q('fb').innerHTML = `<div class="result">${a[mid]} &lt; ${target}, so the target can only be to the right. low = mid + 1 = ${lo}.</div>`; }
        else { hi = mid - 1; q('fb').innerHTML = `<div class="result">${a[mid]} &gt; ${target}, so the target can only be to the left. high = mid - 1 = ${hi}.</div>`; }
        if (found === null && lo > hi) { found = -1; q('fb').innerHTML = `<div class="result ok"><b>low (${lo}) is now greater than high (${hi}), so ${target} is not in the array.</b> Binary search returns -1 after only ${steps} checks.</div>`; }
        draw();
      });
      q('new').addEventListener('click', reset);
      reset();
    },

    sort(el, esc) {
      let base, frames, k;
      el.innerHTML = `<div class="card lab-box">
        <div class="row"><label>Algorithm <select id="alg" class="lab-input" style="width:auto"><option value="sel">Selection sort</option><option value="ins">Insertion sort</option><option value="mer">Merge sort</option></select></label><button class="btn" id="new" type="button">New data</button></div>
        <div class="sbars" id="bars"></div>
        <div id="msg" class="mono"></div>
        <div class="row"><button class="btn primary" id="step" type="button">Step</button><button class="btn" id="play" type="button">Play</button><button class="btn" id="restart" type="button">Restart</button><span class="muted" id="cnt"></span></div></div>`;
      const q = id => el.querySelector('#' + id);
      let timer = null;
      function build(){
        const a = base.slice(), f = [], fr = (hl, msg, cmp, done) => f.push({ a: a.slice(), hl, msg, cmp, done: done || [] });
        let cmp = 0;
        fr([], 'Start. Press Step.', 0);
        const alg = q('alg').value;
        if (alg === 'sel') {
          for (let i = 0; i < a.length - 1; i++) {
            let m = i;
            for (let j = i + 1; j < a.length; j++) { cmp++; if (a[j] < a[m]) m = j; fr([j, m], `Pass ${i + 1}: compare a[${j}] = ${a[j]} with the smallest so far, ${a[m]}`, cmp, range(i)); }
            [a[i], a[m]] = [a[m], a[i]];
            fr([i, m], `Swap the smallest, ${a[i]}, into index ${i}`, cmp, range(i + 1));
          }
        } else if (alg === 'ins') {
          for (let i = 1; i < a.length; i++) {
            const v = a[i]; let j = i - 1;
            fr([i], `Pass ${i}: insert ${v} into the sorted part on the left`, cmp);
            while (j >= 0) { cmp++; if (a[j] > v) { a[j + 1] = a[j]; a[j] = v; fr([j, j + 1], `${a[j + 1]} > ${v}, so slide ${a[j + 1]} right`, cmp); j--; } else { fr([j, j + 1], `${a[j]} ≤ ${v}, so ${v} stays here`, cmp); break; } }
          }
        } else {
          const ms = (lo, hi) => {
            if (hi - lo < 1) return;
            const mid = Math.floor((lo + hi) / 2);
            ms(lo, mid); ms(mid + 1, hi);
            const L = a.slice(lo, mid + 1), Rr = a.slice(mid + 1, hi + 1); let i = 0, j = 0, t = lo;
            while (i < L.length && j < Rr.length) { cmp++; a[t++] = L[i] <= Rr[j] ? L[i++] : Rr[j++]; }
            while (i < L.length) a[t++] = L[i++];
            while (j < Rr.length) a[t++] = Rr[j++];
            fr(range2(lo, hi), `Merge indexes ${lo}-${mid} with ${mid + 1}-${hi}`, cmp);
          };
          ms(0, a.length - 1);
        }
        fr([], `Sorted with ${cmp} comparisons.`, cmp, range(a.length));
        return f;
      }
      const range = n => Array.from({ length: n }, (_, i) => i);
      const range2 = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
      const draw = () => {
        const F = frames[k], max = Math.max(...F.a);
        q('bars').innerHTML = F.a.map((v, i) => `<div><i class="${F.done.includes(i) ? 'done' : F.hl.includes(i) ? 'hl' : ''}" style="height:${Math.round(v / max * 140) + 6}px"></i><span>${v}</span></div>`).join('');
        q('msg').textContent = F.msg;
        q('cnt').textContent = `Comparisons: ${F.cmp}`;
      };
      const restart = () => { if (timer) { clearInterval(timer); timer = null; q('play').textContent = 'Play'; } frames = build(); k = 0; draw(); };
      const newData = () => { base = Array.from({ length: 8 }, () => rnd(2, 40)); restart(); };
      q('step').addEventListener('click', () => { if (k < frames.length - 1) { k++; draw(); } });
      q('play').addEventListener('click', () => {
        if (timer) { clearInterval(timer); timer = null; q('play').textContent = 'Play'; return; }
        q('play').textContent = 'Pause';
        timer = setInterval(() => { if (k >= frames.length - 1) { clearInterval(timer); timer = null; q('play').textContent = 'Play'; return; } k++; draw(); }, 600);
      });
      q('restart').addEventListener('click', restart);
      q('alg').addEventListener('change', restart);
      q('new').addEventListener('click', newData);
      newData();
    }
  };

  window.AP_LABS = window.AP_LABS || {};
  window.AP_LAB_RUN = {};
  Object.entries(LAB).forEach(([k, l]) => {
    window.AP_LABS[k] = { title: l.title, blurb: l.blurb, intro: l.intro };
    window.AP_LAB_RUN[k] = RUN[k];
    (window.AP_UNITS || []).forEach(u => u.topics.forEach(t => { if (l.topics.includes(t.id)) (t.labs = t.labs || []).push(k); }));
  });
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
