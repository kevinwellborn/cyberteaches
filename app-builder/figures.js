// Original illustrations for App Builder lessons, drawn as inline SVG so they follow the module color and dark mode.
// AB_ART(lessonId, slot) returns a picture for one place in a lesson: 'hero' (top of the lesson),
// 'example' (next to the example) or 'together' (the class activity). AP_FIGURE(lessonId) returns the hero,
// which is what tools/build-lesson-pages.js puts on the lesson pages.
(function () {
  const U = 'var(--u, var(--accent))', INK = 'var(--ink)', PAPER = 'var(--panel, #fff)', SOFT = 'color-mix(in srgb, var(--u, var(--accent)) 16%, var(--panel, #fff))';
  const line = `fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  const svg = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" style="width:100%;height:auto;display:block">${body}</svg>`;
  const text = (x, y, s, size = 20, o = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="var(--f-body, sans-serif)" font-size="${size}" fill="${INK}" ${o}>${s}</text>`;
  // A student from the shoulders up. skin and hair are plain colors; shirt takes the module color unless given.
  const kid = (x, y, skin, hair, shirt, style) => `<g transform="translate(${x} ${y})">
    <path d="M-46 96c2-34 20-50 46-50s44 16 46 50z" fill="${shirt || U}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="-9" y="26" width="18" height="24" rx="8" fill="${skin}" stroke="${INK}" stroke-width="3"/>
    <circle r="30" fill="${skin}" stroke="${INK}" stroke-width="3"/>
    ${style === 'long' ? `<path d="M-31 6c-8-44 62-52 62 0 2 16 0 30-4 38-2-22-6-36-14-44-14 8-28 8-36 4-4 12-6 28-4 40-4-10-6-24-4-38z" fill="${hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
      : style === 'curly' ? `<path d="M-30-4c-10-14 2-30 14-28 4-12 26-12 32 0 14-2 22 14 14 28-6-10-16-14-30-14s-24 4-30 14z" fill="${hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
      : `<path d="M-30-2c-4-22 12-34 30-34s34 12 30 34c-6-12-14-16-22-16-14 4-28 4-38 16z" fill="${hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`}
    <circle cx="-10" cy="4" r="3" fill="${INK}"/><circle cx="10" cy="4" r="3" fill="${INK}"/><path d="M-9 15q9 8 18 0" ${line}/>
  </g>`;
  // A speech bubble centered at x,y with its tail pointing down toward tx.
  const bubble = (x, y, w, h, tx, lines) => `<path d="M${x - w / 2 + 14} ${y - h / 2}h${w - 28}a14 14 0 0 1 14 14v${h - 28}a14 14 0 0 1-14 14H${tx + 14}l-14 18-4-18H${x - w / 2 + 14}a14 14 0 0 1-14-14v-${h - 28}a14 14 0 0 1 14-14z" fill="${PAPER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${lines.map((s, k) => text(x, y - (lines.length - 1) * 13 + k * 26 + 7, s, 21, 'font-weight="700"')).join('')}`;
  const A = '#F1C7A0', Bn = '#C58A5B', C = '#8A5A3C';

  const ART = {
    '1.1': {
      hero: { cap: 'App ideas hide in everyday complaints. Listen for "I wish," "I always forget," and "this takes forever."',
        html: svg(720, 330, 'Three students, each with a speech bubble: I wish, I always forget, and This takes forever.',
          `<rect x="4" y="4" width="712" height="322" rx="22" fill="${SOFT}"/>
          <circle cx="640" cy="64" r="26" fill="${U}" opacity=".35"/><circle cx="250" cy="286" r="14" fill="${U}" opacity=".35"/>
          ${bubble(130, 78, 196, 84, 126, ['"I wish I knew', 'what\'s for lunch."'])}
          ${bubble(360, 62, 210, 84, 356, ['"I always forget', 'my gym clothes."'])}
          ${bubble(592, 78, 196, 84, 588, ['"This sign-up', 'takes forever."'])}
          ${kid(130, 232, A, '#3B2A20', '', 'long')}${kid(360, 222, C, '#1E1A18', PAPER, 'curly')}${kid(592, 232, Bn, '#6B4A2B', '', 'short')}`) },
      example: { cap: 'Shrink the idea until one main feature can solve it for one group of people.',
        html: svg(720, 250, 'Three circles getting smaller: too big, still big, just right.',
          `<circle cx="130" cy="112" r="104" fill="${SOFT}" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/>
          <circle cx="130" cy="112" r="46" ${line}/><path d="M84 112h92M130 66c-22 26-22 66 0 92M130 66c22 26 22 66 0 92" ${line}/>
          ${text(130, 244, 'Too big: everyone', 19, 'font-weight="700"')}
          <path d="M250 112h44m-14-12 14 12-14 12" ${line}/>
          <circle cx="390" cy="112" r="76" fill="${SOFT}" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/>
          ${[[362, 104], [418, 104], [390, 132]].map(([x, y]) => `<circle cx="${x}" cy="${y - 14}" r="11" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M${x - 18} ${y + 22}c1-14 8-20 18-20s17 6 18 20z" fill="${PAPER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`).join('')}
          ${text(390, 244, 'Still big: all teens', 19, 'font-weight="700"')}
          <path d="M486 112h44m-14-12 14 12-14 12" ${line}/>
          <circle cx="610" cy="112" r="56" fill="${U}" stroke="${INK}" stroke-width="3"/>
          <path d="M598 92h24v10l6 10v34a6 6 0 0 1-6 6h-24a6 6 0 0 1-6-6v-34l6-10z" fill="${PAPER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M592 126h36" ${line}/><rect x="600" y="80" width="20" height="12" rx="3" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
          ${text(610, 244, 'Just right: my team', 19, 'font-weight="700"')}`) },
      together: { cap: 'Take turns. One partner shares, the other asks questions. Then switch.',
        html: svg(720, 220, 'Two students facing each other, trading ideas.',
          `<rect x="4" y="4" width="712" height="212" rx="22" fill="${SOFT}"/>
          ${kid(170, 122, Bn, '#2A1E18', '', 'curly')}${kid(550, 122, A, '#7A4B2A', PAPER, 'long')}
          <path d="M262 84h180m-16-13 16 13-16 13" ${line}/><path d="M458 150H278m16-13-16 13 16 13" ${line}/>
          ${text(352, 70, 'my top 3 problems', 20, 'font-weight="700"')}${text(368, 184, '"Who has it? When?"', 20, 'font-weight="700"')}`) }
    }
  };

  const st = document.createElement('style');
  st.textContent = `.art{margin:18px 0 0}.art svg{border-radius:18px}.art figcaption{margin-top:8px;color:var(--muted);font-size:15px}`;
  document.head.appendChild(st);
  window.AB_ART = function (id, slot) {
    const f = (ART[id] || {})[slot];
    return f ? `<figure class="art">${f.html}<figcaption>${f.cap}</figcaption></figure>` : '';
  };
  window.AP_FIGURE = id => window.AB_ART(id, 'hero');
})();
