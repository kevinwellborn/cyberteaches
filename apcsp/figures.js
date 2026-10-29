// Diagrams and graphs for visual learners. Shown under the lesson paragraph for the topics listed here.
// Each figure is inline SVG or HTML so it follows the Big Idea color and dark mode.
(function () {
  const U = 'var(--u, var(--accent))';
  const T = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} fill="var(--ink)" font-family="var(--f-mono, monospace)" font-size="15">${s}</text>`;
  const box = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill || 'var(--panel, #fff)'}" stroke="var(--ink)" stroke-width="2"/>`;
  const svg = (h, body, label) => `<svg viewBox="0 0 600 ${h}" role="img" aria-label="${label}" style="width:100%;height:auto">${body}</svg>`;
  const arrow = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>`;

  const F = {
    '1.4': {
      cap: 'Three kinds of errors. A syntax error stops the program from running; a logic error runs but gives the wrong answer; a run-time error crashes while running.',
      html: svg(150, [['Syntax error', 'DISPLAY("hi"', 'Missing ) so it will not run'], ['Logic error', 'avg ← a + b / 2', 'Runs, but the answer is wrong'], ['Run-time error', 'x ← 10 / 0', 'Crashes while running']].map((e, i) => {
        const x = 10 + i * 197;
        return `${box(x, 10, 185, 130)}<rect x="${x}" y="10" width="185" height="34" rx="8" fill="${U}"/><text x="${x + 92}" y="33" text-anchor="middle" fill="#fff" font-weight="700" font-family="var(--f-body, sans-serif)" font-size="15">${e[0]}</text>${T(x + 92, 80, e[1], 'text-anchor="middle"')}<text x="${x + 92}" y="118" text-anchor="middle" font-size="13" fill="var(--muted)" font-family="var(--f-body, sans-serif)">${e[2]}</text>`;
      }).join(''), 'Syntax, logic, and run-time errors')
    },
    '2.1': {
      cap: 'Place values in binary double from right to left. 01101101 = 64 + 32 + 8 + 4 + 1 = 109.',
      html: (() => {
        const bits = [0, 1, 1, 0, 1, 1, 0, 1], pv = [128, 64, 32, 16, 8, 4, 2, 1];
        return svg(150, bits.map((b, i) => {
          const x = 14 + i * 72;
          return `${T(x + 31, 24, pv[i], 'text-anchor="middle"')}${box(x, 36, 62, 62, b ? U : '')}<text x="${x + 31}" y="78" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="28" font-weight="700" fill="${b ? '#fff' : 'var(--ink)'}">${b}</text>${T(x + 31, 126, b ? '+' + pv[i] : '·', 'text-anchor="middle"')}`;
        }).join('') + T(300, 146, '= 109', 'text-anchor="middle" font-weight="700"'), 'Binary place value table for 109');
      })()
    },
    '2.2': {
      cap: 'Run-length encoding replaces each run of the same symbol with a count. It is lossless: the original can be rebuilt exactly.',
      html: (() => {
        const runs = [['A', 4], ['B', 3], ['C', 1], ['D', 4]];
        let x = 14, top = '', bot = '';
        runs.forEach(([c, n]) => {
          for (let k = 0; k < n; k++) { top += `${box(x + k * 36, 14, 32, 40)}${T(x + k * 36 + 16, 40, c, 'text-anchor="middle"')}`; }
          const mid = x + n * 18 - 2;
          bot += `<path d="M${mid} 60v26" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>${box(mid - 26, 94, 52, 40, U)}<text x="${mid}" y="120" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="16" font-weight="700" fill="#fff">${n}${c}</text>`;
          x += n * 36 + 12;
        });
        return svg(150, arrow + top + bot + `<text x="586" y="40" text-anchor="end" font-size="13" fill="var(--muted)" font-family="var(--f-body, sans-serif)">12 symbols</text><text x="586" y="120" text-anchor="end" font-size="13" fill="var(--muted)" font-family="var(--f-body, sans-serif)">8 symbols</text>`, 'Run-length encoding of AAAABBBCDDDD as 4A3B1C4D');
      })()
    },
    '2.4': {
      cap: 'A chart makes a pattern easy to see. Here: how 24 students get to school. Most walk or take the bus.',
      html: (() => {
        const d = [['Walk', 8], ['Bus', 9], ['Car', 5], ['Bike', 2]];
        return svg(190, d.map(([k, v], i) => {
          const x = 70 + i * 130, h = v * 16;
          return `<rect x="${x}" y="${160 - h}" width="80" height="${h}" rx="4" fill="${U}"/>${T(x + 40, 154 - h, v, 'text-anchor="middle" font-weight="700"')}${T(x + 40, 182, k, 'text-anchor="middle"')}`;
        }).join('') + '<path d="M50 160H580" stroke="var(--ink)" stroke-width="2"/>', 'Bar chart of how students get to school');
      })()
    },
    '3.1': {
      cap: 'A variable is a named box that holds one value. Assigning a new value replaces the old one.',
      html: svg(130, arrow + [['score ← 5', '5'], ['score ← score + 3', '8'], ['score ← 0', '0']].map((e, i) => {
        const x = 20 + i * 200;
        return `${T(x + 70, 22, e[0], 'text-anchor="middle"')}${box(x + 30, 36, 80, 60, i === 2 ? U : '')}<text x="${x + 70}" y="76" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="26" font-weight="700" fill="${i === 2 ? '#fff' : 'var(--ink)'}">${e[1]}</text>${T(x + 70, 120, 'score', 'text-anchor="middle"')}${i < 2 ? `<path d="M${x + 122} 66h60" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>` : ''}`;
      }).join(''), 'A variable score changing from 5 to 8 to 0')
    },
    '3.2': {
      cap: 'In AP pseudocode, list indexes start at 1. grades[3] is 72. LENGTH(grades) is 5.',
      html: svg(120, [90, 85, 72, 100, 64].map((v, i) => {
        const x = 70 + i * 96;
        return `${box(x, 20, 86, 56, i === 2 ? U : '')}<text x="${x + 43}" y="56" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="22" font-weight="700" fill="${i === 2 ? '#fff' : 'var(--ink)'}">${v}</text>${T(x + 43, 102, 'index ' + (i + 1), 'text-anchor="middle"')}`;
      }).join('') + T(8, 54, 'grades'), 'A list named grades with indexes 1 to 5')
    },
    '3.5': {
      cap: 'Truth table: AND is true only when both are true. OR is true when at least one is true. NOT flips the value.',
      html: `<div class="scroll"><table class="lab-table fig-table"><thead><tr><th>A</th><th>B</th><th>A AND B</th><th>A OR B</th><th>NOT A</th></tr></thead><tbody>${[[1, 1], [1, 0], [0, 1], [0, 0]].map(([a, b]) => `<tr>${[a, b, a && b, a || b, !a ? 1 : 0].map((v, i) => `<td class="${i > 1 && v ? 'on' : ''}">${v ? 'true' : 'false'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    },
    '3.6': {
      cap: 'A flowchart for IF/ELSE. The condition is checked once, and exactly one of the two branches runs.',
      html: svg(250, arrow + `${box(220, 8, 160, 40)}${T(300, 33, 'score ← 85', 'text-anchor="middle"')}
        <path d="M300 48v18" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>
        <path d="M300 70l90 40-90 40-90-40z" fill="${U}" opacity=".9" stroke="var(--ink)" stroke-width="2"/><text x="300" y="115" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="15" font-weight="700" fill="#fff">score ≥ 70?</text>
        <path d="M210 110H120v74" stroke="var(--ink)" stroke-width="2" fill="none" marker-end="url(#ah)"/>${T(160, 102, 'true', 'text-anchor="middle"')}
        <path d="M390 110h90v74" stroke="var(--ink)" stroke-width="2" fill="none" marker-end="url(#ah)"/>${T(440, 102, 'false', 'text-anchor="middle"')}
        ${box(30, 190, 180, 44)}${T(120, 217, 'DISPLAY("Pass")', 'text-anchor="middle"')}
        ${box(390, 190, 180, 44)}${T(480, 217, 'DISPLAY("Retry")', 'text-anchor="middle"')}`, 'Flowchart of an IF ELSE statement')
    },
    '3.8': {
      cap: 'REPEAT n TIMES runs the loop body n times. REPEAT UNTIL checks a condition before each pass and stops when it is true.',
      html: svg(170, arrow + `${box(40, 20, 200, 44)}${T(140, 47, 'REPEAT 3 TIMES', 'text-anchor="middle" font-weight="700"')}
        ${box(60, 100, 160, 44, U)}<text x="140" y="127" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="15" fill="#fff">MOVE_FORWARD()</text>
        <path d="M140 64v32" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>
        <path d="M220 122h40V42h-16" stroke="var(--ink)" stroke-width="2" fill="none" marker-end="url(#ah)"/>${T(270, 86, '×3')}
        ${[1, 2, 3].map(n => `<circle cx="${330 + n * 60}" cy="90" r="24" fill="${U}" opacity="${0.35 + n * 0.2}"/><text x="${330 + n * 60}" y="96" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="16" font-weight="700" fill="#fff">${n}</text>`).join('')}
        ${T(450, 140, 'pass 1, pass 2, pass 3', 'text-anchor="middle"')}`, 'A REPEAT loop running its body three times')
    },
    '3.11': {
      cap: 'Binary search for 33 in a sorted list. Check the middle (27, too small) and keep the right half. Check 39 (too big) and keep the left. Check 33: found in 3 checks. A linear search would need 11.',
      html: (() => {
        const rows = [[0, 16], [9, 16], [9, 12]];
        return svg(128, rows.map(([lo, hi], r) => {
          let out = '';
          for (let i = 0; i < 16; i++) {
            const live = i >= lo && i < hi, mid = i === Math.floor((lo + hi) / 2);
            out += `<rect x="${20 + i * 35}" y="${10 + r * 38}" width="31" height="30" rx="5" fill="${mid && r === 2 ? 'var(--good, #2a7)' : mid ? U : live ? 'var(--panel-2, #eee)' : 'transparent'}" stroke="${live ? 'var(--ink)' : 'var(--line, #ccc)'}" stroke-width="${live ? 2 : 1}" opacity="${live ? 1 : .4}"/><text x="${35 + i * 35}" y="${30 + r * 38}" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="12" fill="${mid ? '#fff' : 'var(--ink)'}" opacity="${live ? 1 : .4}">${(i + 1) * 3}</text>`;
          }
          return out;
        }).join(''), 'Binary search halving a sorted list of 16 numbers to find 33');
      })()
    },
    '3.17': {
      cap: 'How the number of steps grows as the input n grows. Reasonable time: n and n². Unreasonable time: 2ⁿ shoots up so fast that big inputs are impossible.',
      html: (() => {
        const X = n => 60 + n * 50, Y = v => 200 - Math.min(v, 100) * 1.8;
        const line = (f, max = 10) => Array.from({ length: Math.floor(max * 4) + 1 }, (_, k) => { const n = k / 4; return `${k ? 'L' : 'M'}${X(n).toFixed(1)} ${Y(f(n)).toFixed(1)}`; }).join('');
        return svg(240, `<path d="M60 20V200H570" stroke="var(--ink)" stroke-width="2" fill="none"/>
          <path d="${line(n => n * 5)}" stroke="var(--muted)" stroke-width="3" fill="none"/>
          <path d="${line(n => n * n)}" stroke="var(--ink)" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
          <path d="${line(n => 2 ** n, 6.6)}" stroke="${U}" stroke-width="4" fill="none"/>
          <text x="568" y="${Y(50) + 5}" font-size="15" font-weight="700" fill="var(--muted)" font-family="var(--f-mono, monospace)">n</text>
          <text x="568" y="${Y(100) + 5}" font-size="15" font-weight="700" fill="var(--ink)" font-family="var(--f-mono, monospace)">n²</text>
          <text x="${X(6.6) + 8}" y="30" font-size="15" font-weight="700" fill="${U}" font-family="var(--f-mono, monospace)">2ⁿ</text>
          ${T(315, 230, 'input size n →', 'text-anchor="middle"')}<text x="22" y="110" font-size="14" fill="var(--ink)" font-family="var(--f-mono, monospace)" transform="rotate(-90 22 110)" text-anchor="middle">steps →</text>`, 'Line graph comparing linear, quadratic, and exponential growth');
      })()
    },
    '4.1': {
      cap: 'Data is split into packets. Packets can take different routes through the routers and arrive out of order; the receiver puts them back in order.',
      html: (() => {
        const N = { A: [50, 100], R1: [190, 40], R2: [190, 160], R3: [340, 40], R4: [340, 160], B: [500, 100] };
        const E = [['A', 'R1'], ['A', 'R2'], ['R1', 'R3'], ['R2', 'R4'], ['R1', 'R4'], ['R3', 'B'], ['R4', 'B']];
        const ln = E.map(([a, b]) => `<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" stroke="var(--ink)" stroke-width="2" opacity=".5"/>`).join('');
        const nd = Object.entries(N).map(([k, [x, y]]) => k.length === 1
          ? `${box(x - 34, y - 22, 68, 44, U)}<text x="${x}" y="${y + 6}" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="15" font-weight="700" fill="#fff">${k === 'A' ? 'You' : 'Server'}</text>`
          : `<circle cx="${x}" cy="${y}" r="22" fill="var(--panel, #fff)" stroke="var(--ink)" stroke-width="2"/>${T(x, y + 5, k, 'text-anchor="middle"')}`).join('');
        const pk = [[120, 70, 1], [265, 40, 2], [265, 160, 3], [420, 130, 4]].map(([x, y, n]) => `<rect x="${x - 13}" y="${y - 24}" width="26" height="20" rx="4" fill="var(--good, #2a7)"/><text x="${x}" y="${y - 9}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="var(--f-mono, monospace)">${n}</text>`).join('');
        return svg(200, ln + nd + pk, 'Packets taking different routes across a network');
      })()
    },
    '4.3': {
      cap: 'Sequential computing runs tasks one after another. Parallel computing splits them across processors, so the total time is the longest processor, not the sum.',
      html: (() => {
        const bar = (x, y, w, n) => `<rect x="${x}" y="${y}" width="${w}" height="28" rx="5" fill="${U}" opacity="${0.55 + (n % 3) * 0.2}"/><text x="${x + w / 2}" y="${y + 19}" text-anchor="middle" font-size="12" fill="#fff" font-family="var(--f-mono, monospace)">${w / 20}s</text>`;
        let s = T(10, 30, '1 CPU'), x = 90;
        [60, 40, 80, 60].forEach((w, i) => { s += bar(x, 12, w, i); x += w + 4; });
        s += T(x + 8, 30, '= 12s');
        s += T(10, 100, 'CPU 1') + bar(90, 82, 60, 0) + bar(154, 82, 60, 3) + T(10, 140, 'CPU 2') + bar(90, 122, 40, 1) + bar(134, 122, 80, 2) + T(230, 120, '= 6s (2× speedup)');
        return svg(170, s, 'Timeline of sequential versus parallel computing');
      })()
    },
    '5.6': {
      cap: 'Public key encryption: anyone can lock a message with your public key, but only your private key can unlock it.',
      html: svg(140, arrow + `${box(10, 40, 120, 56)}${T(70, 74, '"hi Ana"', 'text-anchor="middle"')}
        <path d="M134 68h58" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>${T(163, 56, '🔓 public', 'text-anchor="middle" font-size="12"')}
        ${box(200, 40, 190, 56, U)}<text x="295" y="74" text-anchor="middle" font-family="var(--f-mono, monospace)" font-size="15" fill="#fff">x9#Lq!2@v</text>
        <path d="M394 68h58" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>${T(423, 56, '🔑 private', 'text-anchor="middle" font-size="12"')}
        ${box(460, 40, 120, 56)}${T(520, 74, '"hi Ana"', 'text-anchor="middle"')}
        ${T(295, 126, 'only Ana can read it', 'text-anchor="middle"')}`, 'Public key encryption turning plaintext into ciphertext and back')
    }
  };

  const st = document.createElement('style');
  st.textContent = `.figure{margin:18px 0 6px;padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--panel)}
  .figure figcaption{margin-top:10px;color:var(--muted);font-size:15px}
  .figure .label{display:block;margin-bottom:10px}
  .fig-table{width:100%;font-family:var(--f-mono)}
  .fig-table th{background:var(--panel-2)}
  .fig-table td.on{background:color-mix(in srgb, var(--u, var(--accent)) 22%, transparent);font-weight:700}`;
  document.head.appendChild(st);

  window.AP_FIGURE = function (id) {
    const f = F[id];
    return f ? `<figure class="figure"><span class="label u">Picture it</span>${f.html}<figcaption>${f.cap}</figcaption></figure>` : '';
  };
})();
