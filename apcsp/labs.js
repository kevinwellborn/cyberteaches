// Hands-on labs for AP CSP. Each lab has a card entry (AP_LABS), the topics it belongs to,
// and a function that builds it inside the lab page: run(el, esc).
(function () {
  const LAB = {
    bits: { title: 'Binary Bit Flipper', blurb: 'Flip bits on and off to build numbers in binary.', topics: ['2.1'],
      intro: 'Each switch is one bit. Turn bits on to add their place value. Build the target number using as few tries as you need.' },
    rle: { title: 'Compression Lab', blurb: 'Shrink text with run-length encoding and see how many bits you save.', topics: ['2.2'],
      intro: 'Type text with repeated letters. Run-length encoding replaces each run with a count and the letter. This is lossless: you can always rebuild the original.' },
    data: { title: 'Data Explorer', blurb: 'Filter and sort a real-looking data set, then read the chart.', topics: ['2.3', '2.4'],
      intro: 'This made-up data set shows how 24 students in one class get to school and how long it takes. Filter it, sort it, and answer the questions.' },
    trace: { title: 'Trace the Code', blurb: 'Step through AP pseudocode line by line and watch the variables change.', topics: ['3.1', '3.6', '3.8', '3.10'],
      intro: 'Pick a program. Predict the output, then press Step to run one line at a time and watch the variables. This is exactly how you trace code on the AP exam.' },
    logic: { title: 'Boolean Logic Switchboard', blurb: 'Flip A and B and see AND, OR, and NOT light up.', topics: ['3.5', '3.7'],
      intro: 'Turn the inputs on and off. Each output lights up when its expression is true. Then finish the challenges.' },
    search: { title: 'Search Race', blurb: 'Find a hidden number with linear search, then with binary search.', topics: ['3.11', '3.17'],
      intro: 'A number is hidden in a sorted list of 64 cards. Click cards to check them. Try it once checking in order, then use binary search and always pick the middle.' },
    dice: { title: 'Dice Simulation', blurb: 'Roll two dice thousands of times and compare the results with probability.', topics: ['3.15', '3.16'],
      intro: 'Each roll uses RANDOM(1, 6) twice and adds them. Run the simulation and see which sums happen most. More rolls get closer to the true probabilities.' },
    network: { title: 'Network Fault Tolerance', blurb: 'Break connections and see if packets can still get through.', topics: ['4.1', '4.2'],
      intro: 'Click a connection to cut it. The network finds a route from your laptop to the web server if one still exists. How many cuts can it survive?' },
    parallel: { title: 'Parallel Speedup', blurb: 'Split tasks across processors and measure the speedup.', topics: ['4.3'],
      intro: 'Six tasks must finish. The last task can only start after all others are done. Choose how many processors to use and see the parallel time and speedup.' },
    cipher: { title: 'Encryption Lab', blurb: 'Encrypt and decrypt a message with a shift cipher, then crack one.', topics: ['5.6'],
      intro: 'A shift cipher moves each letter by a key. Encrypt a message, then try to crack the secret message by testing every key. Real encryption uses keys far too large to guess.' }
  };

  const css = `
  .lab-box{display:grid;gap:14px}
  .bits{display:flex;gap:8px;flex-wrap:wrap}
  .bit{display:grid;gap:6px;justify-items:center;font-family:var(--f-mono)}
  .bit button{width:54px;height:64px;border-radius:10px;border:2px solid var(--line);background:var(--panel-2);font:700 26px var(--f-mono);color:var(--ink);cursor:pointer}
  .bit button.on{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
  .bit small{color:var(--muted)}
  .big-num{font:800 40px var(--f-display);font-variant-numeric:tabular-nums}
  .lab-input{font:16px var(--f-mono);padding:10px 12px;border:2px solid var(--line);border-radius:10px;background:var(--panel);color:var(--ink);width:100%;max-width:520px}
  .mono{font-family:var(--f-mono);word-break:break-all}
  .lab-table{border-collapse:collapse;font-size:14px;font-variant-numeric:tabular-nums}
  .lab-table th,.lab-table td{border-bottom:1px solid var(--line);padding:6px 10px;text-align:left}
  .scroll{overflow-x:auto}
  .bars{display:grid;gap:6px}
  .bar{display:grid;grid-template-columns:110px 1fr 54px;gap:8px;align-items:center;font-size:14px}
  .bar i{display:block;height:16px;border-radius:4px;background:var(--accent);min-width:2px}
  .code{font-family:var(--f-mono);font-size:15px;background:var(--term);color:var(--term-ink);border-radius:12px;padding:12px 0;overflow-x:auto}
  .code div{padding:1px 16px;white-space:pre}
  .code div.cur{background:color-mix(in srgb, var(--accent) 45%, transparent)}
  .lamp{display:grid;gap:4px;justify-items:center;font-family:var(--f-mono);font-size:14px}
  .lamp i{width:44px;height:44px;border-radius:50%;background:var(--panel-2);border:3px solid var(--line)}
  .lamp.on i{background:var(--good);border-color:var(--good);box-shadow:0 0 16px var(--good)}
  .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr));gap:6px}
  .cards button{height:44px;border-radius:8px;border:2px solid var(--line);background:var(--panel-2);font:700 14px var(--f-mono);color:var(--ink);cursor:pointer}
  .cards button.out{opacity:.25}
  .cards button.hit{background:var(--good);color:#fff;border-color:var(--good)}
  .net svg{width:100%;max-width:560px;height:auto}
  .net line{cursor:pointer}
  `;

  function stats(el, html) { el.innerHTML = html; }

  const RUN = {
    bits(el, esc) {
      const vals = [128, 64, 32, 16, 8, 4, 2, 1];
      let on = vals.map(() => false), target = 1 + Math.floor(Math.random() * 255), solved = 0;
      el.innerHTML = `<div class="card lab-box">
        <div class="row" style="justify-content:space-between"><div><span class="label">Target</span><div class="big-num" id="tg"></div></div><div><span class="label">Your number</span><div class="big-num" id="val">0</div></div></div>
        <div class="bits" id="bits">${vals.map((v, i) => `<div class="bit"><button type="button" data-i="${i}" aria-label="Bit worth ${v}">0</button><small>${v}</small></div>`).join('')}</div>
        <div class="mono" id="bin">00000000</div>
        <div id="fb" aria-live="polite"></div>
        <div class="row"><button class="btn" id="new" type="button">New target</button><span class="muted" id="cnt"></span></div></div>`;
      const draw = () => {
        const v = on.reduce((s, b, i) => s + (b ? vals[i] : 0), 0);
        el.querySelectorAll('[data-i]').forEach(b => { const x = on[+b.dataset.i]; b.classList.toggle('on', x); b.textContent = x ? '1' : '0'; });
        el.querySelector('#val').textContent = v; el.querySelector('#tg').textContent = target;
        el.querySelector('#bin').textContent = on.map(b => b ? 1 : 0).join('') + ' in binary = ' + v + ' in decimal';
        el.querySelector('#fb').innerHTML = v === target ? `<div class="result ok"><b>Correct.</b> ${target} in binary is ${target.toString(2).padStart(8, '0')}.</div>` : '';
        el.querySelector('#cnt').textContent = `Solved: ${solved}`;
        return v;
      };
      el.querySelector('#bits').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (!b) return; on[+b.dataset.i] = !on[+b.dataset.i]; if (draw() === target) solved++; draw(); });
      el.querySelector('#new').addEventListener('click', () => { target = 1 + Math.floor(Math.random() * 255); on = on.map(() => false); draw(); });
      draw();
    },

    rle(el, esc) {
      el.innerHTML = `<div class="card lab-box">
        <label for="rleIn"><b>Your text</b> (letters only)</label>
        <input id="rleIn" class="lab-input" value="AAAAABBBCCCCCCCCDD" autocomplete="off">
        <div><span class="label">Encoded</span><div class="mono big-num" style="font-size:28px" id="rleOut"></div></div>
        <div class="bars" id="rleBars"></div>
        <p class="muted" id="rleNote" style="margin:0"></p>
        <div class="row"><button class="btn" type="button" data-ex="AAAAAAAAAAAABBBBBBBBBBBB">Long runs</button><button class="btn" type="button" data-ex="ABCDEFGHIJ">No repeats</button><button class="btn" type="button" data-ex="WWWWWWWWWWBWWWWWWWWWWB">Black and white pixels</button></div></div>`;
      const inp = el.querySelector('#rleIn');
      const go = () => {
        const s = inp.value.toUpperCase().replace(/[^A-Z]/g, '');
        const out = s.replace(/(.)\1*/g, m => m.length + m[0]);
        const a = s.length * 8, b = out.length * 8, mx = Math.max(a, b, 1);
        el.querySelector('#rleOut').textContent = out || '(empty)';
        el.querySelector('#rleBars').innerHTML = [['Original', a], ['Encoded', b]].map(([k, v]) => `<div class="bar"><span>${k}</span><i style="width:${v / mx * 100}%"></i><span>${v} bits</span></div>`).join('');
        el.querySelector('#rleNote').textContent = !s ? '' : b < a ? `Saved ${a - b} bits (${Math.round((1 - b / a) * 100)}% smaller). Long runs compress well.` : b === a ? 'No savings: the runs are too short.' : `The encoded version is ${b - a} bits bigger. Text without repeats does not compress well with this method.`;
      };
      inp.addEventListener('input', go);
      el.querySelectorAll('[data-ex]').forEach(b => b.addEventListener('click', () => { inp.value = b.dataset.ex; go(); }));
      go();
    },

    data(el, esc) {
      const modes = ['Walk', 'Bus', 'Car', 'Bike'];
      const rows = [['Ava', 10, 'Bus', 25], ['Ben', 10, 'Car', 12], ['Cam', 11, 'Walk', 9], ['Dia', 9, 'Bus', 31], ['Eli', 12, 'Car', 15], ['Fay', 11, 'Bike', 14], ['Gus', 9, 'Walk', 6], ['Hana', 10, 'Bus', 28], ['Ivy', 12, 'Car', 18], ['Jay', 11, 'Bus', 22], ['Kai', 9, 'Bike', 11], ['Lia', 10, 'Walk', 12], ['Max', 12, 'Car', 10], ['Noa', 11, 'Bus', 35], ['Oli', 9, 'Car', 14], ['Pia', 10, 'Bike', 16], ['Quin', 12, 'Walk', 8], ['Ray', 11, 'Car', 20], ['Sol', 9, 'Bus', 27], ['Tia', 10, 'Car', 9], ['Uma', 12, 'Bus', 24], ['Vic', 11, 'Walk', 15], ['Wes', 9, 'Bus', 30], ['Zoe', 10, 'Car', 13]]
        .map(([name, grade, mode, mins]) => ({ name, grade, mode, mins }));
      el.innerHTML = `<div class="card lab-box">
        <div class="row">
          <label>Grade <select id="dg" class="lab-input" style="width:auto"><option value="">All</option><option>9</option><option>10</option><option>11</option><option>12</option></select></label>
          <label>Travel <select id="dm" class="lab-input" style="width:auto"><option value="">All</option>${modes.map(m => `<option>${m}</option>`).join('')}</select></label>
          <label>Sort by <select id="ds" class="lab-input" style="width:auto"><option value="name">Name</option><option value="mins">Minutes (low to high)</option><option value="-mins">Minutes (high to low)</option></select></label>
        </div>
        <div><span class="label">Average minutes by travel mode (for the filtered rows)</span><div class="bars" id="dbars" style="margin-top:8px"></div></div>
        <div class="scroll"><table class="lab-table" id="dt"></table></div>
        <div class="card" style="background:var(--panel-2)"><b>Questions</b><ol style="margin:8px 0 0;padding-left:20px;display:grid;gap:6px">
          <li>Which travel mode has the longest average trip? Is that because the mode is slow, or because of where those students live? Can this data tell you?</li>
          <li>Filter to grade 9. How many students take the bus?</li>
          <li>The data only covers one class. Would it be fair to use it to describe the whole school? Why or why not?</li></ol></div></div>`;
      const go = () => {
        const g = el.querySelector('#dg').value, m = el.querySelector('#dm').value, s = el.querySelector('#ds').value;
        let r = rows.filter(x => (!g || x.grade === +g) && (!m || x.mode === m));
        r.sort((a, b) => s === 'name' ? a.name.localeCompare(b.name) : s === 'mins' ? a.mins - b.mins : b.mins - a.mins);
        el.querySelector('#dt').innerHTML = `<tr><th>Name</th><th>Grade</th><th>Travel</th><th>Minutes</th></tr>` + r.map(x => `<tr><td>${x.name}</td><td>${x.grade}</td><td>${x.mode}</td><td>${x.mins}</td></tr>`).join('') + `<tr><td colspan="4" class="muted">${r.length} of ${rows.length} rows</td></tr>`;
        const avg = modes.map(md => { const t = r.filter(x => x.mode === md); return [md, t.length ? t.reduce((a, x) => a + x.mins, 0) / t.length : 0, t.length]; });
        const mx = Math.max(1, ...avg.map(a => a[1]));
        el.querySelector('#dbars').innerHTML = avg.map(([md, v, n]) => `<div class="bar"><span>${md} (${n})</span><i style="width:${v / mx * 100}%"></i><span>${n ? v.toFixed(1) : '–'}</span></div>`).join('');
      };
      el.querySelectorAll('select').forEach(x => x.addEventListener('change', go));
      go();
    },

    trace(el, esc) {
      // Each program: lines of AP pseudocode and a function that records each step as [line, vars, output].
      const P = [
        { name: 'Swap with a temp variable', lines: ['a ← 3', 'b ← 8', 'temp ← a', 'a ← b', 'b ← temp', 'DISPLAY(a)', 'DISPLAY(b)'],
          run(rec) { const v = {}; v.a = 3; rec(0, v); v.b = 8; rec(1, v); v.temp = v.a; rec(2, v); v.a = v.b; rec(3, v); v.b = v.temp; rec(4, v); rec(5, v, v.a); rec(6, v, v.b); } },
        { name: 'REPEAT n TIMES', lines: ['total ← 0', 'n ← 1', 'REPEAT 4 TIMES', '{', '   total ← total + n', '   n ← n * 2', '}', 'DISPLAY(total)'],
          run(rec) { const v = { }; v.total = 0; rec(0, v); v.n = 1; rec(1, v); for (let i = 0; i < 4; i++) { rec(2, v); v.total += v.n; rec(4, v); v.n *= 2; rec(5, v); } rec(7, v, v.total); } },
        { name: 'IF / ELSE', lines: ['score ← 74', 'IF (score ≥ 90)', '{', '   DISPLAY("A")', '}', 'ELSE', '{', '   IF (score ≥ 70)', '   {', '      DISPLAY("Pass")', '   }', '}'],
          run(rec) { const v = { score: 74 }; rec(0, v); rec(1, v); rec(5, v); rec(7, v); rec(9, v, 'Pass'); } },
        { name: 'FOR EACH over a list', lines: ['nums ← [4, 9, 2, 7]', 'max ← nums[1]', 'FOR EACH x IN nums', '{', '   IF (x > max)', '   {', '      max ← x', '   }', '}', 'DISPLAY(max)'],
          run(rec) { const v = { nums: '[4, 9, 2, 7]' }; rec(0, v); v.max = 4; rec(1, v); for (const x of [4, 9, 2, 7]) { v.x = x; rec(2, v); rec(4, v); if (x > v.max) { v.max = x; rec(6, v); } } rec(9, v, v.max); } },
        { name: 'REPEAT UNTIL', lines: ['x ← 1', 'count ← 0', 'REPEAT UNTIL (x > 50)', '{', '   x ← x * 3', '   count ← count + 1', '}', 'DISPLAY(count)'],
          run(rec) { const v = { }; v.x = 1; rec(0, v); v.count = 0; rec(1, v); while (true) { rec(2, v); if (v.x > 50) break; v.x *= 3; rec(4, v); v.count++; rec(5, v); } rec(7, v, v.count); } }
      ];
      let p = 0, steps = [], k = -1;
      el.innerHTML = `<div class="card lab-box">
        <div class="row">${P.map((x, i) => `<button class="btn" type="button" data-p="${i}">${esc(x.name)}</button>`).join('')}</div>
        <div class="code" id="tc"></div>
        <label for="guess"><b>Your prediction:</b> what will be displayed?</label>
        <input id="guess" class="lab-input" autocomplete="off" placeholder="Type your answer before you step through">
        <div class="row"><button class="btn primary" type="button" id="step">Step</button><button class="btn" type="button" id="runall">Run to end</button><button class="btn" type="button" id="reset">Reset</button></div>
        <div class="scroll"><table class="lab-table" id="tv"></table></div>
        <div><span class="label">Output</span><div class="mono" id="to" style="min-height:24px"></div></div>
        <div id="tf" aria-live="polite"></div></div>`;
      const load = i => {
        p = i; steps = []; k = -1;
        P[p].run((line, vars, out) => steps.push({ line, vars: Object.assign({}, vars), out }));
        el.querySelector('#guess').value = ''; draw();
      };
      const draw = () => {
        const s = steps[k];
        el.querySelector('#tc').innerHTML = P[p].lines.map((l, i) => `<div class="${s && s.line === i ? 'cur' : ''}">${String(i + 1).padStart(2, ' ')}  ${esc(l)}</div>`).join('');
        const names = s ? Object.keys(s.vars) : [];
        el.querySelector('#tv').innerHTML = names.length ? `<tr>${names.map(n => `<th>${esc(n)}</th>`).join('')}</tr><tr>${names.map(n => `<td>${esc(s.vars[n])}</td>`).join('')}</tr>` : '<tr><td class="muted">Variables appear here as you step.</td></tr>';
        const out = steps.slice(0, k + 1).filter(x => x.out !== undefined).map(x => x.out);
        el.querySelector('#to').textContent = out.join(' ');
        const done = k === steps.length - 1;
        const g = el.querySelector('#guess').value.trim().replace(/"/g, '');
        el.querySelector('#tf').innerHTML = done ? `<div class="result ${g && g.replace(/\s+/g, ' ') === out.join(' ') ? 'ok' : 'no'}"><b>Finished.</b> Output: ${esc(out.join(' '))}. ${g ? (g.replace(/\s+/g, ' ') === out.join(' ') ? 'Your prediction was right.' : 'Compare with your prediction: which line did you trace differently?') : ''}</div>` : '';
        el.querySelector('#step').disabled = done;
        el.querySelectorAll('[data-p]').forEach(b => b.classList.toggle('primary', +b.dataset.p === p));
      };
      el.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => load(+b.dataset.p)));
      el.querySelector('#step').addEventListener('click', () => { if (k < steps.length - 1) k++; draw(); });
      el.querySelector('#runall').addEventListener('click', () => { k = steps.length - 1; draw(); });
      el.querySelector('#reset').addEventListener('click', () => { k = -1; draw(); });
      load(0);
    },

    logic(el, esc) {
      let A = false, B = false;
      const outs = [['A AND B', (a, b) => a && b], ['A OR B', (a, b) => a || b], ['NOT A', a => !a], ['NOT (A AND B)', (a, b) => !(a && b)]];
      const ch = [
        { q: 'Make A AND B true.', ok: (a, b) => a && b },
        { q: 'Make A OR B true while A AND B is false.', ok: (a, b) => (a || b) && !(a && b) },
        { q: 'Make every output false except NOT A and NOT (A AND B).', ok: (a, b) => !a && !b },
      ];
      el.innerHTML = `<div class="card lab-box">
        <div class="row"><button class="btn" type="button" id="la">A = false</button><button class="btn" type="button" id="lb">B = false</button></div>
        <div class="row" id="lamps" style="gap:22px"></div>
        <div><span class="label">Truth table</span><div class="scroll"><table class="lab-table" id="tt"></table></div></div>
        <div id="lc"></div></div>`;
      const draw = () => {
        el.querySelector('#la').textContent = 'A = ' + A; el.querySelector('#la').classList.toggle('primary', A);
        el.querySelector('#lb').textContent = 'B = ' + B; el.querySelector('#lb').classList.toggle('primary', B);
        el.querySelector('#lamps').innerHTML = outs.map(([n, f]) => `<div class="lamp ${f(A, B) ? 'on' : ''}"><i></i>${n}<b>${f(A, B)}</b></div>`).join('');
        el.querySelector('#tt').innerHTML = `<tr><th>A</th><th>B</th>${outs.map(o => `<th>${o[0]}</th>`).join('')}</tr>` + [[false, false], [false, true], [true, false], [true, true]].map(([a, b]) => `<tr style="${a === A && b === B ? 'background:var(--accent-soft)' : ''}"><td>${a}</td><td>${b}</td>${outs.map(o => `<td>${o[1](a, b)}</td>`).join('')}</tr>`).join('');
        el.querySelector('#lc').innerHTML = `<b>Challenges</b><ul style="margin:6px 0 0;padding-left:20px">${ch.map(c => `<li>${c.ok(A, B) ? '✓' : '○'} ${c.q}</li>`).join('')}</ul>`;
      };
      el.querySelector('#la').addEventListener('click', () => { A = !A; draw(); });
      el.querySelector('#lb').addEventListener('click', () => { B = !B; draw(); });
      draw();
    },

    search(el, esc) {
      const nums = []; let n = 3; for (let i = 0; i < 64; i++) { n += 1 + Math.floor(Math.random() * 4); nums.push(n); }
      let target, lo, hi, checks, mode, found, log;
      el.innerHTML = `<div class="card lab-box">
        <div class="row"><button class="btn" type="button" data-m="linear">Linear search</button><button class="btn" type="button" data-m="binary">Binary search</button></div>
        <p style="margin:0" id="sm"></p>
        <div class="cards" id="sc"></div>
        <div id="sf" aria-live="polite"></div>
        <div class="bars" id="sb"></div></div>`;
      const best = { linear: null, binary: null };
      const start = m => { mode = m; target = nums[Math.floor(Math.random() * 64)]; lo = 0; hi = 63; checks = 0; found = false; log = []; draw(); };
      const draw = () => {
        el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('primary', b.dataset.m === mode));
        el.querySelector('#sm').innerHTML = `Find <b class="mono">${target}</b>. ${mode === 'linear' ? 'Check the cards in order from the left.' : 'Click a card. You will learn if the target is higher or lower, and the impossible cards fade out.'}`;
        el.querySelector('#sc').innerHTML = nums.map((v, i) => { const open = log.includes(i); const out = mode === 'binary' && (i < lo || i > hi); return `<button type="button" data-i="${i}" class="${open && v === target ? 'hit' : ''} ${out ? 'out' : ''}" ${out || found ? 'disabled' : ''}>${open ? v : '?'}</button>`; }).join('');
        el.querySelector('#sf').innerHTML = found ? `<div class="result ok"><b>Found it in ${checks} checks.</b> ${mode === 'binary' ? 'Binary search never needs more than 7 checks for 64 sorted items, because 2⁶ = 64.' : 'Linear search can take up to 64 checks. Now try binary search.'}</div>` : `<span class="muted">Checks so far: ${checks}</span>`;
        el.querySelector('#sb').innerHTML = ['linear', 'binary'].map(k => `<div class="bar"><span>${k === 'linear' ? 'Linear' : 'Binary'}</span><i style="width:${best[k] ? best[k] / 64 * 100 : 0}%"></i><span>${best[k] || '–'}</span></div>`).join('');
      };
      el.querySelector('#sc').addEventListener('click', e => {
        const b = e.target.closest('[data-i]'); if (!b || found) return; const i = +b.dataset.i;
        if (mode === 'linear' && i !== (log.length ? Math.max(...log) + 1 : 0)) { el.querySelector('#sf').innerHTML = '<div class="result no">Linear search checks cards in order. Click the next card.</div>'; return; }
        checks++; log.push(i);
        if (nums[i] === target) { found = true; best[mode] = checks; }
        else if (mode === 'binary') { if (nums[i] < target) lo = i + 1; else hi = i - 1; }
        draw();
      });
      el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => start(b.dataset.m)));
      start('linear');
    },

    dice(el, esc) {
      const exp = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map(x => x / 36);
      let counts = new Array(13).fill(0), total = 0;
      el.innerHTML = `<div class="card lab-box">
        <div class="code"><div>sum ← RANDOM(1, 6) + RANDOM(1, 6)</div></div>
        <div class="row"><button class="btn" type="button" data-r="1">Roll once</button><button class="btn" type="button" data-r="100">Roll 100</button><button class="btn primary" type="button" data-r="5000">Roll 5,000</button><button class="btn" type="button" id="dr">Reset</button></div>
        <p style="margin:0" id="dt"></p>
        <svg id="dsvg" viewBox="0 0 560 240" role="img" aria-label="Bar chart of dice sums" style="width:100%;max-width:640px;height:auto"></svg>
        <p class="muted" style="margin:0">Bars show how often each sum came up. Dots show the true probability. 7 is most likely because 6 of the 36 combinations add to 7.</p></div>`;
      const draw = () => {
        el.querySelector('#dt').textContent = `${total.toLocaleString()} rolls`;
        const mx = 0.2, x0 = 40, w = 40, h = 180, y0 = 200;
        let s = `<line x1="${x0}" y1="${y0}" x2="${x0 + 11 * w + 10}" y2="${y0}" stroke="var(--line)" stroke-width="2"/>`;
        [0, 0.05, 0.1, 0.15, 0.2].forEach(t => { const y = y0 - t / mx * h; s += `<line x1="${x0}" x2="${x0 + 11 * w + 10}" y1="${y}" y2="${y}" stroke="var(--line)" stroke-width="1" opacity=".6"/><text x="${x0 - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(t * 100)}%</text>`; });
        for (let k = 2; k <= 12; k++) {
          const x = x0 + (k - 2) * w + 8, f = total ? counts[k] / total : 0, bh = Math.min(f, mx) / mx * h;
          s += `<rect x="${x}" y="${y0 - bh}" width="${w - 12}" height="${bh}" rx="4" fill="var(--accent)"/><circle cx="${x + (w - 12) / 2}" cy="${y0 - exp[k] / mx * h}" r="5" fill="var(--ink)"/><text x="${x + (w - 12) / 2}" y="${y0 + 18}" text-anchor="middle" font-size="13" fill="var(--ink)">${k}</text>`;
        }
        el.querySelector('#dsvg').innerHTML = s;
      };
      el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => { for (let i = 0; i < +b.dataset.r; i++) { counts[2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6)]++; total++; } draw(); }));
      el.querySelector('#dr').addEventListener('click', () => { counts = new Array(13).fill(0); total = 0; draw(); });
      draw();
    },

    network(el, esc) {
      const N = { L: [60, 130, 'Laptop'], A: [180, 50, 'Router A'], B: [180, 210, 'Router B'], C: [320, 50, 'Router C'], D: [320, 210, 'Router D'], S: [460, 130, 'Web server'] };
      const E = [['L', 'A'], ['L', 'B'], ['A', 'C'], ['B', 'D'], ['A', 'D'], ['C', 'S'], ['D', 'S'], ['B', 'C']];
      let cut = new Set();
      el.innerHTML = `<div class="card lab-box net"><svg id="nsvg" viewBox="0 0 520 260" role="img" aria-label="Network diagram"></svg><div id="nf" aria-live="polite"></div><div class="row"><button class="btn" type="button" id="nr">Repair all</button><span class="muted" id="nc"></span></div></div>`;
      const path = () => { const q = [['L']], seen = new Set(['L']); while (q.length) { const p = q.shift(), u = p[p.length - 1]; if (u === 'S') return p; E.forEach(([a, b], i) => { if (cut.has(i)) return; const v = a === u ? b : b === u ? a : null; if (v && !seen.has(v)) { seen.add(v); q.push(p.concat(v)); } }); } return null; };
      const draw = () => {
        const p = path(), on = new Set(); if (p) for (let i = 0; i < p.length - 1; i++) on.add([p[i], p[i + 1]].sort().join());
        let s = E.map(([a, b], i) => { const x = cut.has(i), hot = on.has([a, b].sort().join()); return `<line data-e="${i}" x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" stroke="${x ? 'var(--bad)' : hot ? 'var(--good)' : 'var(--muted)'}" stroke-width="${hot ? 7 : 5}" ${x ? 'stroke-dasharray="6 8"' : ''} stroke-linecap="round"/><line data-e="${i}" x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" stroke="transparent" stroke-width="22"/>`; }).join('');
        s += Object.entries(N).map(([k, [x, y, t]]) => `<circle cx="${x}" cy="${y}" r="22" fill="${k === 'L' || k === 'S' ? 'var(--accent)' : 'var(--panel)'}" stroke="var(--ink)" stroke-width="3"/><text x="${x}" y="${y + 40}" text-anchor="middle" font-size="13" fill="var(--ink)">${t}</text>`).join('');
        el.querySelector('#nsvg').innerHTML = s;
        el.querySelector('#nf').innerHTML = p ? `<div class="result ok"><b>Connected.</b> Packets travel ${p.map(k => N[k][2]).join(' → ')}.</div>` : `<div class="result no"><b>Disconnected.</b> No route is left from the laptop to the server.</div>`;
        el.querySelector('#nc').textContent = `Connections cut: ${cut.size}`;
      };
      el.querySelector('#nsvg').addEventListener('click', e => { const l = e.target.closest('[data-e]'); if (!l) return; const i = +l.dataset.e; cut.has(i) ? cut.delete(i) : cut.add(i); draw(); });
      el.querySelector('#nr').addEventListener('click', () => { cut = new Set(); draw(); });
      draw();
    },

    parallel(el, esc) {
      const tasks = [40, 30, 30, 20, 20], last = 10;
      el.innerHTML = `<div class="card lab-box">
        <p style="margin:0">Tasks: ${tasks.map(t => `<b>${t}s</b>`).join(', ')}, then a final <b>${last}s</b> task that must run alone at the end.</p>
        <div class="row">${[1, 2, 3, 4, 5].map(p => `<button class="btn" type="button" data-p="${p}">${p} processor${p > 1 ? 's' : ''}</button>`).join('')}</div>
        <svg id="psvg" viewBox="0 0 560 220" role="img" aria-label="Timeline of tasks per processor" style="width:100%;max-width:640px;height:auto"></svg>
        <div id="pf"></div></div>`;
      const run = P => {
        const lanes = new Array(P).fill(0).map(() => []), end = new Array(P).fill(0);
        tasks.slice().sort((a, b) => b - a).forEach(t => { const i = end.indexOf(Math.min(...end)); lanes[i].push([end[i], t]); end[i] += t; });
        const par = Math.max(...end) + last, seq = tasks.reduce((a, b) => a + b, 0) + last, sc = 4;
        let s = '';
        lanes.forEach((l, i) => { const y = 14 + i * 34; s += `<text x="0" y="${y + 18}" font-size="12" fill="var(--muted)">CPU ${i + 1}</text>` + l.map(([st, d]) => `<rect x="${50 + st * sc}" y="${y}" width="${d * sc - 3}" height="26" rx="5" fill="var(--accent)"/><text x="${50 + st * sc + 6}" y="${y + 18}" font-size="12" fill="var(--accent-ink)">${d}s</text>`).join(''); });
        const mx = Math.max(...end);
        s += `<rect x="${50 + mx * sc}" y="14" width="${last * sc - 3}" height="26" rx="5" fill="var(--ink)"/><text x="${50 + mx * sc + 4}" y="32" font-size="11" fill="var(--panel)">${last}s</text>`;
        el.querySelector('#psvg').setAttribute('viewBox', `0 0 560 ${24 + P * 34}`);
        el.querySelector('#psvg').innerHTML = s;
        el.querySelector('#pf').innerHTML = `<div class="bars"><div class="bar"><span>Sequential</span><i style="width:100%"></i><span>${seq}s</span></div><div class="bar"><span>Parallel</span><i style="width:${par / seq * 100}%"></i><span>${par}s</span></div></div>
          <p style="margin:10px 0 0"><b>Speedup = ${seq} ÷ ${par} = ${(seq / par).toFixed(2)}</b>. ${P >= 5 ? 'Adding processors past this point cannot help: the longest task (40s) and the final task still have to happen.' : 'Try more processors. Does the speedup keep growing?'}</p>`;
        el.querySelectorAll('[data-p]').forEach(b => b.classList.toggle('primary', +b.dataset.p === P));
      };
      el.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => run(+b.dataset.p)));
      run(1);
    },

    cipher(el, esc) {
      const shift = (s, k) => s.replace(/[a-z]/gi, c => { const b = c <= 'Z' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - b + k + 26) % 26 + b); });
      const secretKey = 3 + Math.floor(Math.random() * 20), secret = shift('MEET AT THE LIBRARY AFTER SCHOOL', secretKey);
      el.innerHTML = `<div class="card lab-box">
        <h3 style="margin:0">1. Encrypt</h3>
        <input id="cm" class="lab-input" value="Computing is for everyone" autocomplete="off" aria-label="Message to encrypt">
        <label>Key: <input id="ck" type="range" min="1" max="25" value="5" style="vertical-align:middle"> <b id="ckv">5</b></label>
        <div><span class="label">Ciphertext</span><div class="mono big-num" style="font-size:22px" id="co"></div></div>
        <h3 style="margin:10px 0 0">2. Crack the secret</h3>
        <p style="margin:0">Intercepted message: <b class="mono">${secret}</b></p>
        <label>Try key: <input id="bk" type="range" min="1" max="25" value="1" style="vertical-align:middle"> <b id="bkv">1</b></label>
        <div class="mono" id="bo"></div><div id="bf" aria-live="polite"></div>
        <p class="muted" style="margin:0">There are only 25 keys, so a computer can try them all instantly. Modern encryption uses keys with hundreds of digits, so trying every key would take longer than the age of the universe.</p></div>`;
      const go = () => {
        const k = +el.querySelector('#ck').value, b = +el.querySelector('#bk').value;
        el.querySelector('#ckv').textContent = k; el.querySelector('#bkv').textContent = b;
        el.querySelector('#co').textContent = shift(el.querySelector('#cm').value, k);
        el.querySelector('#bo').textContent = shift(secret, -b);
        el.querySelector('#bf').innerHTML = b === secretKey ? '<div class="result ok"><b>Cracked!</b> You found the key by trying them in order: a brute-force attack.</div>' : '';
      };
      el.querySelectorAll('input').forEach(x => x.addEventListener('input', go));
      go();
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
