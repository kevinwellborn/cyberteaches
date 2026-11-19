// Diagrams for visual learners. Shown under the lesson paragraph for the topics listed here.
// Each figure is inline SVG so it follows the unit color and dark mode. All drawings are original.
(function () {
  const U = 'var(--u, var(--accent))';
  const T = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} fill="var(--ink)" font-family="var(--f-mono, monospace)" font-size="15">${s}</text>`;
  const W = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} fill="#fff" font-family="var(--f-mono, monospace)" font-size="15">${s}</text>`;
  const box = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill || 'var(--panel, #fff)'}" stroke="var(--ink)" stroke-width="2"/>`;
  const svg = (h, body, label) => `<svg viewBox="0 0 600 ${h}" role="img" aria-label="${label}" style="width:100%;height:auto">${body}</svg>`;
  const arrow = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>`;
  const cells = (x, y, vals, hl = [], w = 56) => vals.map((v, i) => `${box(x + i * w, y, w - 4, 46, hl.includes(i) ? U : '')}${(hl.includes(i) ? W : T)(x + i * w + (w - 4) / 2, y + 29, v, 'text-anchor="middle"')}${T(x + i * w + (w - 4) / 2, y + 66, i, 'text-anchor="middle" font-size="13" opacity=".7"')}`).join('');

  const F = {
    '1.1': {
      cap: 'Java source code is compiled into bytecode, and the Java Virtual Machine runs the bytecode. The compiler stops at syntax errors before anything runs.',
      html: svg(120, arrow + [['Hello.java', 'source code'], ['javac', 'compiler'], ['Hello.class', 'bytecode'], ['JVM', 'runs it']].map(([a, b], i) => {
        const x = 8 + i * 150, mid = i === 1 || i === 3;
        return `${box(x, 24, 128, 60, mid ? U : '')}${(mid ? W : T)(x + 64, 52, a, 'text-anchor="middle"')}${(mid ? W : T)(x + 64, 72, b, 'text-anchor="middle" font-size="12"')}${i < 3 ? `<path d="M${x + 130} 54h18" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>` : ''}`;
      }).join(''), 'Source code to compiler to bytecode to the Java Virtual Machine')
    },
    '1.3': {
      cap: 'Integer division keeps only the whole part. The remainder operator gives what is left over. Make one side a double to keep the decimals.',
      html: svg(130, [['17 / 5', '3', 'int ÷ int'], ['17 % 5', '2', 'remainder'], ['17.0 / 5', '3.4', 'double ÷ int']].map(([e, r, n], i) => {
        const x = 10 + i * 197;
        return `${box(x, 14, 185, 104)}<rect x="${x}" y="14" width="185" height="36" rx="8" fill="${U}"/>${W(x + 92, 38, e, 'text-anchor="middle"')}${T(x + 92, 84, '→ ' + r, 'text-anchor="middle" font-size="22" font-weight="700"')}${T(x + 92, 108, n, 'text-anchor="middle" font-size="12" opacity=".75"')}`;
      }).join(''), 'Integer division, remainder, and double division examples')
    },
    '1.13': {
      cap: 'A reference variable holds the location of an object, not the object. After b = a, both variables point to the same Dog, so a change through b is seen through a.',
      html: svg(170, arrow + `${T(20, 46, 'Dog a')}${box(90, 22, 60, 40)}<circle cx="120" cy="42" r="6" fill="${U}"/>
        ${T(20, 126, 'Dog b')}${box(90, 102, 60, 40)}<circle cx="120" cy="122" r="6" fill="${U}"/>
        <path d="M126 42C230 42 260 70 330 78" fill="none" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>
        <path d="M126 122C230 122 260 100 330 96" fill="none" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>
        ${box(336, 40, 230, 92)}<rect x="336" y="40" width="230" height="30" rx="8" fill="${U}"/>${W(451, 61, 'Dog object', 'text-anchor="middle"')}
        ${T(352, 94, 'name: "Rex"')}${T(352, 118, 'age:  3')}`, 'Two reference variables pointing to one Dog object')
    },
    '1.15': {
      cap: 'Each character has an index starting at 0. substring(3, 6) returns the characters at indexes 3, 4, and 5: the end index is not included.',
      html: svg(120, cells(76, 14, ['C', 'O', 'M', 'P', 'U', 'T', 'E', 'R'], [3, 4, 5]) + T(300, 112, 's.substring(3, 6) → "PUT"   s.length() → 8', 'text-anchor="middle"'), 'The String COMPUTER with indexes 0 to 7, and substring 3 to 6 highlighted')
    },
    '2.4': {
      cap: 'An if / else if chain checks conditions from top to bottom and runs only the first true branch. Put the highest cutoff first.',
      html: svg(150, arrow + [['score >= 90', '"A"'], ['score >= 80', '"B"'], ['score >= 70', '"C"']].map(([c, g], i) => {
        const x = 14 + i * 160;
        return `${box(x, 20, 140, 44, U)}${W(x + 70, 47, c, 'text-anchor="middle"')}<path d="M${x + 70} 66v26" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>${T(x + 78, 84, 'true', 'font-size="12"')}${box(x + 35, 96, 70, 40)}${T(x + 70, 121, g, 'text-anchor="middle"')}${`<path d="M${x + 142} 42h16" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>`}${T(x + 140, 34, 'false', 'font-size="11"')}`;
      }).join('') + `${box(494, 20, 92, 44)}${T(540, 47, 'else "F"', 'text-anchor="middle"')}`, 'A chain of conditions checked in order')
    },
    '2.8': {
      cap: 'A for loop header has three parts. The initialization runs once, the condition is checked before every pass, and the update runs after every pass.',
      html: svg(150, arrow + `${T(300, 40, 'for ( int i = 0 ;  i &lt; 5 ;  i++ )', 'text-anchor="middle" font-size="20" font-weight="700"')}
        <path d="M150 52v30" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/><path d="M318 52v30" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/><path d="M430 52v30" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>
        ${box(70, 88, 160, 50, U)}${W(150, 110, 'initialize', 'text-anchor="middle"')}${W(150, 128, 'runs once', 'text-anchor="middle" font-size="12"')}
        ${box(240, 88, 160, 50, U)}${W(320, 110, 'condition', 'text-anchor="middle"')}${W(320, 128, 'before each pass', 'text-anchor="middle" font-size="12"')}
        ${box(410, 88, 160, 50, U)}${W(490, 110, 'update', 'text-anchor="middle"')}${W(490, 128, 'after each pass', 'text-anchor="middle" font-size="12"')}`, 'The three parts of a for loop header')
    },
    '3.3': {
      cap: 'A class has private instance variables, public constructors, and public methods. Keeping the data private is called encapsulation.',
      html: svg(220, `${box(150, 10, 300, 200)}<rect x="150" y="10" width="300" height="38" rx="8" fill="${U}"/>${W(300, 35, 'Student', 'text-anchor="middle" font-size="17" font-weight="700"')}
        ${T(166, 74, '- name : String')}${T(166, 96, '- gpa : double')}<path d="M150 110h300" stroke="var(--ink)" stroke-width="2"/>
        ${T(166, 134, '+ Student(String n, double g)')}<path d="M150 146h300" stroke="var(--ink)" stroke-width="2"/>
        ${T(166, 170, '+ getName() : String')}${T(166, 194, '+ setGpa(double g) : void')}
        ${T(462, 86, 'instance variables', 'font-size="12"')}${T(462, 138, 'constructor', 'font-size="12"')}${T(462, 182, 'methods', 'font-size="12"')}
        ${T(20, 86, '- private', 'font-size="12"')}${T(20, 182, '+ public', 'font-size="12"')}`, 'A class diagram for a Student class')
    },
    '4.3': {
      cap: 'An array has a fixed length. Indexes run from 0 to length - 1, so nums[nums.length - 1] is the last element. nums[5] would throw an exception.',
      html: svg(120, cells(160, 14, ['4', '8', '15', '16', '23']) + T(300, 112, 'int[] nums = {4, 8, 15, 16, 23};   nums.length → 5', 'text-anchor="middle"'), 'An array of five ints with indexes 0 to 4')
    },
    '4.11': {
      cap: 'A 2D array is an array of rows. grid.length is the number of rows and grid[0].length is the number of columns. grid[1][2] is row 1, column 2.',
      html: svg(210, [0, 1, 2].map(r => [0, 1, 2, 3].map(c => {
        const on = r === 1 && c === 2, x = 190 + c * 60, y = 34 + r * 52;
        return `${box(x, y, 54, 46, on ? U : '')}${(on ? W : T)(x + 27, y + 29, (r * 4 + c + 1) * 3, 'text-anchor="middle"')}`;
      }).join('') + T(180, 62 + r * 52, 'row ' + r, 'text-anchor="end" font-size="13"')).join('') + [0, 1, 2, 3].map(c => T(217 + c * 60, 24, 'col ' + c, 'text-anchor="middle" font-size="12"')).join('') + T(300, 204, 'grid[1][2] → 21   grid.length → 3   grid[0].length → 4', 'text-anchor="middle"'), 'A 3 by 4 grid with row 1 column 2 highlighted')
    },
    '4.14': {
      cap: 'Binary search checks the middle of a sorted array and throws away the half that cannot hold the target. Searching for 23: 12 is too small, so only 16, 23, 38 remain, and the next middle is 23. Found in 2 checks.',
      html: svg(140, ['2 5 8 12 16 23 38', '16 23 38'].map((row, i) => {
        const vals = row.split(' '), w = 56, x0 = 300 - vals.length * w / 2, mid = Math.floor((vals.length - 1) / 2);
        return vals.map((v, k) => `${box(x0 + k * w, 10 + i * 64, w - 6, 44, k === mid ? U : '')}${(k === mid ? W : T)(x0 + k * w + (w - 6) / 2, 38 + i * 64, v, 'text-anchor="middle"')}`).join('') + T(10, 38 + i * 64, 'check ' + (i + 1), 'font-size="12"');
      }).join(''), 'Binary search for 23 narrowing from seven elements to three')
    },
    '4.16': {
      cap: 'Each recursive call waits on the call stack until the base case returns. Then the answers return back up: fact(3) = 3 × 2 × 1 = 6.',
      html: svg(220, [['fact(3)', '3 * fact(2)', '6'], ['fact(2)', '2 * fact(1)', '2'], ['fact(1)', 'base case', '1']].map(([a, b, r], i) => {
        const y = 14 + i * 66;
        return `${box(120 + i * 30, y, 260, 52, i === 2 ? U : '')}${(i === 2 ? W : T)(136 + i * 30, y + 22, a)}${(i === 2 ? W : T)(136 + i * 30, y + 42, b, 'font-size="13"')}${T(470, y + 32, 'returns ' + r, 'font-size="14"')}`;
      }).join(''), 'Call stack for a recursive factorial')
    }
  };

  const st = document.createElement('style');
  st.textContent = `.figure{margin:18px 0 6px;padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--panel)}
  .figure figcaption{margin-top:10px;color:var(--muted);font-size:15px}
  .figure .label{display:block;margin-bottom:10px}`;
  document.head.appendChild(st);

  window.AP_FIGURE = function (id) {
    const f = F[id];
    return f ? `<figure class="figure"><span class="label u">Picture it</span>${f.html}<figcaption>${f.cap}</figcaption></figure>` : '';
  };
})();
