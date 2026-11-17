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
    },
    '1.2': {
      hero: { cap: 'An interview is mostly listening. Ask about a real moment, then let the other person tell the story.',
        html: svg(720, 330, 'One student listens and takes notes on a clipboard while another tells a story.',
          `<rect x="4" y="4" width="712" height="322" rx="22" fill="${SOFT}"/>
          <circle cx="78" cy="70" r="22" fill="${U}" opacity=".35"/>
          ${bubble(470, 84, 330, 110, 520, ['"Last Tuesday I missed', 'the bus because the', 'schedule changed."'])}
          ${kid(190, 230, C, '#1E1A18', PAPER, 'short')}${kid(540, 232, A, '#5A3A22', '', 'long')}
          <g transform="translate(262 222) rotate(-8)"><rect x="-34" y="-44" width="68" height="88" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><rect x="-14" y="-52" width="28" height="14" rx="5" fill="${U}" stroke="${INK}" stroke-width="3"/><path d="M-20-18h40M-20-2h40M-20 14h26" ${line}/></g>
          <path d="M318 180l34-12M318 200h36M318 220l34 12" ${line} opacity=".55"/>`) },
      example: { cap: 'A yes or no question gets a polite answer. A question about a real moment gets a story you can use.',
        html: svg(720, 250, 'Two questions compared. Would you use my app gets the answer Sure. Tell me about the last time gets a long story.',
          `<rect x="6" y="6" width="340" height="238" rx="18" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
          <rect x="374" y="6" width="340" height="238" rx="18" fill="${SOFT}" stroke="${INK}" stroke-width="3"/>
          ${text(176, 44, 'Closed question', 20, 'font-weight="700"')}${text(544, 44, 'Open question', 20, 'font-weight="700"')}
          ${bubble(176, 98, 290, 56, 96, ['"Would you use my app?"'])}
          <path d="M226 168h60a12 12 0 0 1 12 12v24a12 12 0 0 1-12 12h-60a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12z" fill="${SOFT}" stroke="${INK}" stroke-width="3"/>${text(256, 199, '"Sure."', 20)}
          ${bubble(544, 98, 300, 56, 464, ['"Tell me about a time…"'])}
          <rect x="430" y="158" width="262" height="72" rx="12" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M448 178h226M448 194h226M448 210h150" ${line} opacity=".7"/>`) },
      together: { cap: 'Three jobs, three rounds. Rotate so everyone gets to ask.',
        html: svg(720, 250, 'Three students in a circle with the jobs asker, storyteller and note-taker, and arrows showing the jobs rotating.',
          `<rect x="4" y="4" width="712" height="242" rx="22" fill="${SOFT}"/>
          <g transform="translate(140 70) scale(.7)">${kid(0, 0, Bn, '#2A1E18', '', 'curly')}</g>
          <g transform="translate(360 70) scale(.7)">${kid(0, 0, A, '#7A4B2A', PAPER, 'long')}</g>
          <g transform="translate(580 70) scale(.7)">${kid(0, 0, C, '#1E1A18', '', 'short')}</g>
          ${text(140, 174, 'Asker', 22, 'font-weight="700"')}${text(360, 174, 'Storyteller', 22, 'font-weight="700"')}${text(580, 174, 'Note-taker', 22, 'font-weight="700"')}
          <path d="M200 196h100m-14-12 14 12-14 12M420 196h100m-14-12 14 12-14 12" ${line}/>
          <path d="M580 206c0 34-440 34-440 4M127 224l13-14 13 14" ${line}/>`) }
    },
    '1.3': {
      hero: { cap: 'One sentence, three parts: who it helps, what it does, and why that matters.',
        html: svg(720, 300, 'A sentence built from three blocks: My app helps, who, does what, so that, why.',
          `<rect x="4" y="4" width="712" height="292" rx="22" fill="${SOFT}"/>
          ${text(360, 58, 'My app helps…', 30, 'font-weight="700"')}
          ${[[36, 'WHO', 'new band', 'members'], [258, 'WHAT', 'learn their', 'marching spots'], [480, 'WHY', 'so they feel', 'ready for game 1']].map(([x, h, l1, l2], k) => `<rect x="${x}" y="92" width="204" height="150" rx="16" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M${x} 136v-28a16 16 0 0 1 16-16h172a16 16 0 0 1 16 16v28z" fill="${U}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><text x="${x + 102}" y="124" text-anchor="middle" font-family="var(--f-display, sans-serif)" font-weight="800" font-size="22" fill="#fff">${h}</text>${text(x + 102, 180, l1, 22)}${text(x + 102, 210, l2, 22)}`).join('')}
          <path d="M243 168h12M465 168h12" ${line}/>
          ${text(360, 276, 'who  +  what  +  why  =  your purpose', 19)}`) },
      example: { cap: 'A weak sentence leaves out who, what, or why. A strong one has all three.',
        html: svg(720, 190, 'A weak sentence with question marks for who, what and why, next to a better sentence with three check marks.',
          `${[[6, 'Weak', ['?', '?', '?'], PAPER], [374, 'Better', ['✓', '✓', '✓'], SOFT]].map(([x, h, m, fill]) => `<rect x="${x}" y="6" width="340" height="178" rx="18" fill="${fill}" stroke="${INK}" stroke-width="3"/>${text(x + 170, 44, h, 22, 'font-weight="700"')}
            ${['Who', 'What', 'Why'].map((w, k) => `<circle cx="${x + 70 + k * 100}" cy="100" r="30" fill="${m[k] === '✓' ? U : PAPER}" stroke="${INK}" stroke-width="3"/><text x="${x + 70 + k * 100}" y="111" text-anchor="middle" font-family="var(--f-display, sans-serif)" font-weight="800" font-size="30" fill="${m[k] === '✓' ? '#fff' : INK}">${m[k]}</text>${text(x + 70 + k * 100, 162, w, 20)}`).join('')}`).join('')}`) },
      together: { cap: 'If your partner can say it back, your sentence is clear. If not, make it shorter.',
        html: svg(720, 250, 'One student says a purpose sentence and a partner repeats it back.',
          `<rect x="4" y="4" width="712" height="242" rx="22" fill="${SOFT}"/>
          ${bubble(190, 62, 260, 62, 150, ['"My app helps…"'])}
          ${bubble(520, 62, 290, 62, 560, ['"So it helps… right?"'])}
          <g transform="translate(150 164) scale(.82)">${kid(0, 0, A, '#3B2A20', '', 'short')}</g>
          <g transform="translate(570 164) scale(.82)">${kid(0, 0, C, '#1E1A18', PAPER, 'curly')}</g>
          <path d="M250 170h220m-16-13 16 13-16 13" ${line}/><path d="M470 208H250m16-13-16 13 16 13" ${line}/>
          ${text(360, 160, 'say it', 19, 'font-weight="700"')}${text(360, 236, 'repeat it back', 19, 'font-weight="700"')}`) }
    },
    '1.4': {
      hero: { cap: 'Three checks before you build: is it respectful, is it your own work, and does it keep private information safe?',
        html: svg(720, 300, 'A shield with a check mark next to three checks: respectful, my own work, and private information kept safe.',
          `<rect x="4" y="4" width="712" height="292" rx="22" fill="${SOFT}"/>
          <path d="M170 40l96 34v76c0 62-40 104-96 126-56-22-96-64-96-126V74z" fill="${U}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M126 152l32 32 58-66" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
          ${[['Respectful to everyone', 76], ['My own work', 150], ['Private info stays safe', 224]].map(([t, y]) => `<rect x="312" y="${y - 30}" width="372" height="60" rx="14" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><circle cx="346" cy="${y}" r="17" fill="${U}" stroke="${INK}" stroke-width="3"/><path d="M337 ${y}l7 7 12-14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><text x="376" y="${y + 8}" font-family="var(--f-body, sans-serif)" font-size="23" font-weight="700" fill="${INK}">${t}</text>`).join('')}`) },
      example: { cap: 'Use what you made, or what the owner lets everyone use. Leave the rest alone.',
        html: svg(720, 220, 'Three cards: I made it is okay, free to use is okay with credit, someone else\'s is not okay.',
          `${[[6, 'I made it', 'Okay', true], [250, 'Free to use', 'Okay, give credit', true], [494, 'Someone else\'s', 'Not okay', false]].map(([x, h, sub, ok], k) => `<rect x="${x}" y="6" width="220" height="208" rx="18" fill="${ok ? SOFT : PAPER}" stroke="${INK}" stroke-width="3"/>
            ${k === 0 ? `<path d="M${x + 84} 104l44-44 18 18-44 44-24 6z" fill="${U}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${x + 76} 134h70" ${line}/>`
              : k === 1 ? `<path d="M${x + 76} 62h44l32 32-40 40-36-36z" fill="${U}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><circle cx="${x + 94}" cy="80" r="7" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`
              : `<path d="M${x + 110} 54l12 26 28 4-20 20 5 28-25-13-25 13 5-28-20-20 28-4z" fill="${PAPER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${x + 70} 58l80 80" stroke="var(--bad, #C8402F)" stroke-width="7" stroke-linecap="round"/>`}
            ${text(x + 110, 172, h, 22, 'font-weight="700"')}${text(x + 110, 198, sub, 18)}`).join('')}`) },
      together: { cap: 'Vote at the same time, then explain why. The reason matters more than the vote.',
        html: svg(720, 240, 'Three students holding up voting signs, two with an X and one with a check mark.',
          `<rect x="4" y="4" width="712" height="232" rx="22" fill="${SOFT}"/>
          ${[[150, false, A, '#3B2A20', 'long', ''], [360, false, C, '#1E1A18', 'curly', PAPER], [570, true, Bn, '#6B4A2B', 'short', '']].map(([x, ok, skin, hair, style, shirt]) => `<path d="M${x + 62} 150V92" ${line}/><circle cx="${x + 62}" cy="62" r="32" fill="${ok ? U : PAPER}" stroke="${INK}" stroke-width="3"/>
            ${ok ? `<path d="M${x + 48} 62l10 11 20-23" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M${x + 50} 50l24 24m0-24-24 24" stroke="var(--bad, #C8402F)" stroke-width="6" stroke-linecap="round"/>`}
            <g transform="translate(${x - 14} 160) scale(.8)">${kid(0, 0, skin, hair, shirt, style)}</g>`).join('')}`) }
    },
    '1.5': {
      hero: { cap: 'One folder for everything: your app files, your journal, and your credits list.',
        html: svg(720, 300, 'A project folder holding three files: journal, credits, and the app.',
          `<rect x="4" y="4" width="712" height="292" rx="22" fill="${SOFT}"/>
          <path d="M60 96a14 14 0 0 1 14-14h92l22 26h160a14 14 0 0 1 14 14v124a14 14 0 0 1-14 14H74a14 14 0 0 1-14-14z" fill="${U}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M60 136h302" stroke="${INK}" stroke-width="3"/>
          ${text(211, 206, 'my-app', 30, 'fill="#fff" font-weight="700"').replace(`fill="${INK}"`, '')}
          <path d="M378 170h40m-14-12 14 12-14 12" ${line}/>
          ${[['journal.txt', 62], ['CREDITS.txt', 140], ['index.html', 218]].map(([n, y]) => `<g transform="translate(446 ${y - 24})"><path d="M0 0h34l14 14v46H0z" fill="${PAPER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M34 0v14h14" ${line}/><path d="M10 28h28M10 40h28" ${line} opacity=".6"/></g><text x="512" y="${y + 14}" font-family="var(--f-mono, monospace)" font-size="24" font-weight="600" fill="${INK}">${n}</text>`).join('')}`) },
      example: { cap: 'Four short lines after each work session. That is the whole journal.',
        html: svg(720, 230, 'A notebook page with four lines: did, problem, fix, next.',
          `<rect x="150" y="6" width="420" height="218" rx="16" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
          <path d="M150 52h420" stroke="${INK}" stroke-width="3"/><rect x="150" y="6" width="420" height="46" rx="16" fill="${U}" stroke="${INK}" stroke-width="3"/>
          <text x="360" y="38" text-anchor="middle" font-family="var(--f-display, sans-serif)" font-weight="800" font-size="22" fill="#fff">Build journal · Nov 17</text>
          ${[['Did', 'what I worked on'], ['Problem', 'what went wrong'], ['Fix', 'how I solved it'], ['Next', 'where to start next time']].map(([k, v], i) => `<text x="180" y="${92 + i * 38}" font-family="var(--f-body, sans-serif)" font-size="21" font-weight="700" fill="${INK}">${k}</text><text x="290" y="${92 + i * 38}" font-family="var(--f-body, sans-serif)" font-size="20" fill="${INK}">${v}</text><path d="M180 ${104 + i * 38}h360" stroke="${INK}" stroke-width="1.5" opacity=".25"/>`).join('')}`) },
      together: { cap: 'One minute to share. Then each listener gives one thing they like and one question.',
        html: svg(720, 250, 'One student presents to two classmates, who answer with I like and One question.',
          `<rect x="4" y="4" width="712" height="242" rx="22" fill="${SOFT}"/>
          ${bubble(150, 60, 232, 58, 130, ['"My app helps…"'])}
          ${bubble(424, 60, 150, 58, 424, ['"I like…"'])}
          ${bubble(606, 60, 172, 58, 606, ['"One question…"']).replace('font-size="21"', 'font-size="19"')}
          <g transform="translate(130 166) scale(.8)">${kid(0, 0, C, '#1E1A18', '', 'curly')}</g>
          <g transform="translate(424 166) scale(.8)">${kid(0, 0, A, '#7A4B2A', PAPER, 'long')}</g>
          <g transform="translate(606 166) scale(.8)">${kid(0, 0, Bn, '#2A1E18', PAPER, 'short')}</g>
          <path d="M214 176h110m-16-13 16 13-16 13" ${line}/>`) }
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
