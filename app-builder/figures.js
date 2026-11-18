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

  // ---- Pictures for Modules 2 to 6 and the App Challenge track: three icon cards that show the lesson's main idea. ----
  // Icons are drawn in a 100x100 box.
  const P = `fill="${PAPER}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"`, Af = `fill="${U}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"`;
  const L = `fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`, W = `fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
  const big = (s, fill) => `<text x="50" y="66" text-anchor="middle" font-family="var(--f-display, sans-serif)" font-weight="800" font-size="46" fill="${fill || INK}">${s}</text>`;
  const I = {
    list: `<rect x="14" y="10" width="72" height="80" rx="8" ${P}/><circle cx="30" cy="32" r="5" fill="${U}"/><circle cx="30" cy="50" r="5" fill="${U}"/><circle cx="30" cy="68" r="5" fill="${U}"/><path d="M44 32h28M44 50h28M44 68h20" ${L}/>`,
    star: `<path d="M50 8l13 27 29 4-21 21 5 30-26-14-26 14 5-30L8 39l29-4z" ${Af}/>`,
    check: `<circle cx="50" cy="50" r="40" ${Af}/><path d="M32 51l12 12 24-27" ${W}/>`,
    x: `<circle cx="50" cy="50" r="40" ${P}/><path d="M36 36l28 28m0-28L36 64" stroke="var(--bad, #C8402F)" stroke-width="7" stroke-linecap="round"/>`,
    pencil: `<path d="M22 78l6-24 42-42 18 18-42 42z" ${Af}/><path d="M28 54l18 18" ${L}/><path d="M14 90h60" ${L}/>`,
    browser: `<rect x="8" y="16" width="84" height="68" rx="8" ${P}/><path d="M8 34h84" ${L}/><circle cx="20" cy="25" r="3" fill="${INK}"/><circle cx="30" cy="25" r="3" fill="${INK}"/><rect x="22" y="46" width="56" height="10" rx="5" fill="${U}"/><path d="M22 68h40" ${L}/>`,
    cursor: `<rect x="10" y="20" width="68" height="34" rx="12" ${Af}/><path d="M52 44l8 42 10-14 16-2z" ${P}/>`,
    box: `<path d="M14 36h72v48H14z" ${Af}/><path d="M14 36l12-18h48l12 18" ${P}/><rect x="32" y="50" width="36" height="18" rx="4" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>`,
    question: `<circle cx="50" cy="50" r="40" ${P}/>${big('?')}`,
    lock: `<path d="M32 46V34a18 18 0 0 1 36 0v12" ${L}/><rect x="22" y="46" width="56" height="42" rx="8" ${Af}/><circle cx="50" cy="64" r="6" fill="#fff"/><path d="M50 66v9" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
    doc: `<path d="M22 8h40l18 18v66H22z" ${P}/><path d="M62 8v18h18" ${L}/><path d="M32 46h36M32 60h36M32 74h22" ${L}/>`,
    eye: `<path d="M8 50c12-20 26-30 42-30s30 10 42 30c-12 20-26 30-42 30S20 70 8 50z" ${P}/><circle cx="50" cy="50" r="15" ${Af}/><circle cx="50" cy="50" r="5" fill="#fff"/>`,
    phone: `<rect x="28" y="8" width="44" height="84" rx="8" ${P}/><path d="M42 18h16" ${L}/><rect x="36" y="28" width="28" height="40" rx="4" fill="${U}"/><circle cx="50" cy="80" r="4" fill="${INK}"/>`,
    puzzle: `<path d="M16 34h22a10 10 0 1 1 20 0h26v22a10 10 0 1 0 0 20v10H16V76a10 10 0 1 0 0-20z" ${Af}/>`,
    code: `<rect x="8" y="16" width="84" height="68" rx="8" ${P}/><path d="M36 38L22 50l14 12M64 38l14 12-14 12M56 34L44 66" ${L}/>`,
    paint: `<path d="M50 10c24 0 40 16 40 36 0 14-10 20-20 20h-8c-6 0-8 6-4 10 4 6 0 14-8 14-22 0-40-18-40-40s18-40 40-40z" ${P}/><circle cx="34" cy="36" r="7" fill="${U}"/><circle cx="56" cy="28" r="7" fill="var(--bad, #C8402F)"/><circle cx="72" cy="44" r="7" fill="var(--good, #2E9363)"/><circle cx="28" cy="58" r="7" fill="${INK}"/>`,
    gear: `<path d="M44 8h12l3 12 9 4 11-6 8 8-6 11 4 9 12 3v12l-12 3-4 9 6 11-8 8-11-6-9 4-3 12H44l-3-12-9-4-11 6-8-8 6-11-4-9-12-3V44l12-3 4-9-6-11 8-8 11 6 9-4z" ${Af}/><circle cx="50" cy="50" r="14" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>`,
    loop: `<path d="M78 40a30 30 0 1 0 2 22" ${L} stroke-width="7"/><path d="M62 38h20V18" ${L} stroke-width="7"/><circle cx="50" cy="52" r="9" fill="${U}"/>`,
    clock: `<circle cx="50" cy="50" r="40" ${P}/><path d="M50 26v24l16 10" ${L}/><circle cx="50" cy="50" r="5" fill="${U}"/>`,
    index: `<rect x="6" y="30" width="26" height="40" rx="6" ${Af}/><rect x="37" y="30" width="26" height="40" rx="6" ${P}/><rect x="68" y="30" width="26" height="40" rx="6" ${P}/><text x="19" y="58" text-anchor="middle" font-family="var(--f-mono, monospace)" font-weight="700" font-size="22" fill="#fff">0</text><text x="50" y="58" text-anchor="middle" font-family="var(--f-mono, monospace)" font-weight="700" font-size="22" fill="${INK}">1</text><text x="81" y="58" text-anchor="middle" font-family="var(--f-mono, monospace)" font-weight="700" font-size="22" fill="${INK}">2</text>`,
    plus: `<circle cx="50" cy="50" r="40" ${Af}/><path d="M50 30v40M30 50h40" ${W}/>`,
    tag: `<path d="M12 16h36l42 42-32 32-46-46z" ${Af}/><circle cx="32" cy="36" r="7" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>`,
    keyboard: `<rect x="6" y="26" width="88" height="50" rx="8" ${P}/><path d="M20 42h6M36 42h6M52 42h6M68 42h10M20 54h6M36 54h6M52 54h6M68 54h10" ${L}/><path d="M30 66h40" stroke="${U}" stroke-width="6" stroke-linecap="round"/>`,
    disk: `<path d="M12 12h62l14 14v62H12z" ${Af}/><rect x="28" y="12" width="36" height="24" fill="${PAPER}" stroke="${INK}" stroke-width="4"/><rect x="26" y="54" width="48" height="34" rx="4" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>`,
    bug: `<ellipse cx="50" cy="58" rx="20" ry="26" ${Af}/><circle cx="50" cy="26" r="11" ${Af}/><path d="M30 46l-14-8M30 60H12M30 74l-14 8M70 46l14-8M70 60h18M70 74l14 8M44 16l-6-10M56 16l6-10" ${L}/><path d="M50 36v46" stroke="#fff" stroke-width="3"/>`,
    magnifier: `<circle cx="42" cy="42" r="28" ${P}/><path d="M62 62l28 28" ${L} stroke-width="9"/><path d="M30 42h24M42 30v24" stroke="${U}" stroke-width="6" stroke-linecap="round"/>`,
    book: `<path d="M50 22c-10-8-24-10-38-8v64c14-2 28 0 38 8 10-8 24-10 38-8V14c-14-2-28 0-38 8z" ${P}/><path d="M50 22v64" ${L}/><path d="M22 34h16M22 48h16M62 34h16M62 48h16" stroke="${U}" stroke-width="5" stroke-linecap="round"/>`,
    robot: `<rect x="18" y="30" width="64" height="52" rx="12" ${Af}/><circle cx="38" cy="54" r="8" fill="#fff"/><circle cx="62" cy="54" r="8" fill="#fff"/><path d="M38 70h24" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M50 30V16" ${L}/><circle cx="50" cy="12" r="6" ${P}/><path d="M10 50v16M90 50v16" ${L}/>`,
    people: `<circle cx="30" cy="34" r="13" ${P}/><path d="M8 80c1-18 9-26 22-26s21 8 22 26z" ${P}/><circle cx="70" cy="34" r="13" ${Af}/><path d="M48 80c1-18 9-26 22-26s21 8 22 26z" ${Af}/>`,
    person: `<circle cx="50" cy="32" r="18" ${Af}/><path d="M18 90c2-24 14-34 32-34s30 10 32 34z" ${Af}/>`,
    team: `<circle cx="22" cy="40" r="10" ${P}/><path d="M6 78c1-14 7-20 16-20s15 6 16 20z" ${P}/><circle cx="78" cy="40" r="10" ${P}/><path d="M62 78c1-14 7-20 16-20s15 6 16 20z" ${P}/><circle cx="50" cy="30" r="13" ${Af}/><path d="M28 84c1-20 9-28 22-28s21 8 22 28z" ${Af}/>`,
    clipboard: `<rect x="18" y="16" width="64" height="76" rx="8" ${P}/><rect x="36" y="8" width="28" height="16" rx="5" ${Af}/><path d="M30 44l5 5 9-10M30 64l5 5 9-10" stroke="${U}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 46h18M52 66h18" ${L}/>`,
    globe: `<circle cx="50" cy="50" r="40" ${P}/><path d="M10 50h80M50 10c-20 22-20 58 0 80M50 10c20 22 20 58 0 80" ${L}/>`,
    mic: `<rect x="36" y="8" width="28" height="50" rx="14" ${Af}/><path d="M24 46a26 26 0 0 0 52 0M50 72v18M34 90h32" ${L}/>`,
    video: `<rect x="8" y="24" width="60" height="52" rx="10" ${Af}/><path d="M68 44l24-14v40L68 56z" ${P}/><path d="M30 38l20 12-20 12z" fill="#fff"/>`,
    rocket: `<path d="M50 6c18 14 24 34 20 58H30C26 40 32 20 50 6z" ${Af}/><circle cx="50" cy="38" r="9" fill="${PAPER}" stroke="${INK}" stroke-width="4"/><path d="M30 52L14 70l18-4M70 52l16 18-18-4" ${P}/><path d="M42 72l8 22 8-22" ${P}/>`,
    flag: `<path d="M20 8v86" ${L} stroke-width="6"/><path d="M20 14h64l-12 20 12 20H20z" ${Af}/>`,
    trophy: `<path d="M28 12h44v24a22 22 0 0 1-44 0z" ${Af}/><path d="M28 20H12c0 16 6 24 18 24M72 20h16c0 16-6 24-18 24M50 58v16" ${L}/><path d="M30 90h40l-4-16H34z" ${P}/>`,
    pin: `<path d="M50 92C30 66 18 52 18 38a32 32 0 0 1 64 0c0 14-12 28-32 54z" ${Af}/><circle cx="50" cy="38" r="12" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>`,
    calendar: `<rect x="10" y="18" width="80" height="72" rx="8" ${P}/><path d="M10 38h80" ${L}/><path d="M30 10v16M70 10v16" ${L}/><rect x="26" y="50" width="16" height="14" rx="3" fill="${U}"/><path d="M54 57h20M26 76h48" ${L}/>`,
    history: `<circle cx="20" cy="50" r="10" ${P}/><circle cx="50" cy="50" r="10" ${P}/><circle cx="82" cy="50" r="12" ${Af}/><path d="M30 50h10M60 50h10" ${L}/><path d="M70 22a34 34 0 0 0-46 6m0-12v12h12" ${L}/>`
  };
  // cards: [icon, 'line one|line two']. join: 'arrow' (steps in order), 'plus' (a + b = c) or '' (three choices).
  const scene = (label, cap, join, cards) => ({ cap, html: svg(720, 250, label,
    `<rect x="4" y="4" width="712" height="242" rx="22" fill="${SOFT}"/>` + cards.map(([ic, tx], k) => { const x = 30 + k * 228, lines = tx.split('|');
      return `<rect x="${x}" y="22" width="204" height="206" rx="16" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><g transform="translate(${x + 57} 36) scale(.9)">${I[ic]}</g>${lines.map((s, n) => text(x + 102, (lines.length > 1 ? 162 : 176) + n * 26, s, 20, 'font-weight="700"')).join('')}`; }).join('')
    + (join ? [246, 474].map((x, k) => `<circle cx="${x}" cy="125" r="17" fill="${U}" stroke="${INK}" stroke-width="3"/>` + (join === 'plus' ? `<text x="${x}" y="134" text-anchor="middle" font-family="var(--f-display, sans-serif)" font-weight="800" font-size="26" fill="#fff">${k ? '=' : '+'}</text>` : `<path d="M${x - 7} 125h13m-5-6 6 6-6 6" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`)).join('') : '')) });
  const SCENES = {
    '2.1': ['Five user stories, one core feature, then a must have and if there is time list.', 'Write many stories, star the one the app cannot live without, and sort the rest.', 'arrow', [['list', 'Five user|stories'], ['star', 'One core|feature'], ['check', 'Must have or|if there is time']]],
    '2.2': ['Sketch on paper, label each part, draw arrows between screens.', 'A wireframe is a quick drawing of a screen. Paper is faster to change than code.', 'arrow', [['pencil', 'Sketch it|on paper'], ['browser', 'Label|every part'], ['cursor', 'Show where|buttons lead']]],
    '2.3': ['What the app stores, why it needs it, and keeping it on the device.', 'For every piece of data, ask why the app needs it. Store as little as you can.', 'arrow', [['box', 'What does|it store?'], ['question', 'Why does it|need that?'], ['lock', 'Keep it on|the device']]],
    '2.4': ['Show your sketch, watch without helping, fix the biggest problem.', 'Hand over your sketch, stay quiet, and watch where people get stuck.', 'arrow', [['doc', 'Show your|sketch'], ['eye', 'Watch, and|do not help'], ['pencil', 'Fix the|biggest problem']]],
    '3.1': ['Three platforms: a web app, a phone app, and block coding.', 'Pick one place for your app to run. A web app works on almost every device.', '', [['browser', 'Web app'], ['phone', 'Phone app'], ['puzzle', 'Block coding']]],
    '3.2': ['HTML plus CSS makes your page.', 'HTML says what is on the page. CSS says how it looks.', 'plus', [['code', 'HTML:|what is there'], ['paint', 'CSS:|how it looks'], ['browser', 'Your page']]],
    '3.3': ['A click is an event, your code runs, and the page changes.', 'An app waits for an event, then runs the code you wrote for it.', 'arrow', [['cursor', 'An event:|a click'], ['gear', 'Your code|runs'], ['browser', 'The page|changes']]],
    '3.4': ['A variable is a named box. Put a value in, and change it later.', 'A variable is a named box that holds one value. The value can change while the app runs.', 'arrow', [['tag', 'Give it|a name'], ['box', 'Put a|value in'], ['loop', 'Change it|later']]],
    '3.5': ['A condition is true or false. If true do one thing, else do another.', 'An if statement asks a true or false question and picks one path.', '', [['question', 'Is it true?'], ['check', 'If true,|do this'], ['x', 'Else,|do that']]],
    '3.6': ['Loops repeat a block. A for loop runs a set number of times and a while loop runs until something changes.', 'Write the steps once and let the loop repeat them.', '', [['loop', 'Repeat|a block'], ['index', 'for: a set|number of times'], ['clock', 'while: until|something changes']]],
    '3.7': ['A list holds many values under one name, counting starts at 0, and push adds to the end.', 'A list keeps many values in order under one name.', '', [['list', 'Many values,|one name'], ['index', 'Counting|starts at 0'], ['plus', 'push adds|to the end']]],
    '3.8': ['Write the steps once, give them a name, and call it any time.', 'A function is a named set of steps you can run again and again.', 'arrow', [['pencil', 'Write the|steps once'], ['tag', 'Give them|a name'], ['loop', 'Call it|any time']]],
    '3.9': ['The user types something, the app remembers and decides, and the page shows the result.', 'Every app does these three things. Your hello app does all of them on one screen.', 'arrow', [['keyboard', 'The user|types'], ['gear', 'Remember|and decide'], ['browser', 'Show the|result']]],
    '4.1': ['One big feature becomes small steps that you build and test one at a time.', 'Break a big job into small steps. Build one, test it, then move on.', 'arrow', [['puzzle', 'One big|feature'], ['list', 'Small|steps'], ['check', 'Build and test|one at a time']]],
    '4.2': ['Your data is saved on the device and loaded when the page opens.', 'Save every time the data changes. Load it when the page opens.', 'arrow', [['list', 'Your data'], ['disk', 'Save it on|the device'], ['browser', 'Load it when|the page opens']]],
    '4.3': ['Something breaks, you read the error and log values, then fix one thing and run again.', 'Debugging is a loop: look for clues, change one thing, and run it again.', 'arrow', [['bug', 'Something|breaks'], ['magnifier', 'Read the error,|log values'], ['check', 'Fix one thing,|run again']]],
    '4.4': ['Libraries plus AI help, with credit for everything.', 'Using help is fine. Hiding it is not. Write down everything you did not make.', 'plus', [['book', 'Libraries'], ['robot', 'AI help'], ['doc', 'Credit it all in|CREDITS.txt']]],
    '4.5': ['Save a version, say what changed, and go back any time.', 'Version history is a row of saved copies. If you break something, you can go back.', 'arrow', [['disk', 'Save|a version'], ['tag', 'Say what|changed'], ['history', 'Go back|any time']]],
    '5.1': ['Core feature first, then add one feature, then test again.', 'Add one feature at a time, and make sure the core still works after each one.', 'arrow', [['star', 'Core works|first'], ['plus', 'Add one|feature'], ['check', 'Test|again']]],
    '5.2': ['Easy to see and read, works with a keyboard, fits a small screen.', 'Good design works for everyone, on any screen, with or without a mouse.', '', [['eye', 'Easy to see|and read'], ['keyboard', 'Works with|a keyboard'], ['phone', 'Fits a|small screen']]],
    '5.3': ['Write test cases, test with three real users, then report and fix bugs.', 'Real users do things you never expected. Watch them and write down what happens.', 'arrow', [['clipboard', 'Write|test cases'], ['team', 'Three|real users'], ['bug', 'Report|and fix']]],
    '5.4': ['Clear names, short comments, and no unused code.', 'Clean code is easy to read weeks later, for you and for anyone else.', '', [['tag', 'Clear|names'], ['doc', 'Short|comments'], ['x', 'No unused|code']]],
    '6.1': ['Upload your files, turn on Pages, share the link.', 'Publishing puts your app on the internet so anyone with the link can use it.', 'arrow', [['disk', 'Upload|your files'], ['globe', 'Turn on|Pages'], ['people', 'Share|the link']]],
    '6.2': ['Say the problem, show it working, and keep to two minutes.', 'A demo answers three questions fast: what problem, who for, and does it work?', 'arrow', [['question', 'Say the|problem'], ['browser', 'Show it|working'], ['clock', 'Two|minutes']]],
    '6.3': ['Test your sound, record your screen, watch it back.', 'Make a ten-second test first. Bad sound is the most common problem.', 'arrow', [['mic', 'Test your|sound'], ['video', 'Record your|screen'], ['eye', 'Watch|it back']]],
    '6.4': ['Read your journal, write what you learned, plan version 2.0.', 'Look back at what you learned, then look ahead to what comes next.', 'arrow', [['book', 'Read your|journal'], ['star', 'What you|learned'], ['rocket', 'Plan|version 2.0']]],
    'C.1': ['Hosted by Members of Congress, you build an app, and each district picks a winner.', 'A yearly app competition for middle and high school students.', '', [['flag', 'Hosted by|Congress members'], ['browser', 'You build|an app'], ['trophy', 'Each district|picks a winner']]],
    'C.2': ['Be a middle or high school student, pick your home or school district, and check that it is hosting.', 'Check these three things before you write any code.', 'arrow', [['person', 'Middle or|high school'], ['pin', 'Home or school|district'], ['check', 'That district|is hosting']]],
    'C.3': ['Enter solo or in a team of up to four, with half the team in one district.', 'You can enter alone or with up to three teammates.', '', [['person', 'Solo'], ['team', 'Team of|up to 4'], ['pin', 'Half in the|same district']]],
    'C.4': ['A new app, your own code, and tools and AI disclosed.', 'The rules ask for three things: a new app, your own work, and honest credit.', '', [['calendar', 'A new|app'], ['code', 'Your own|code'], ['doc', 'Tools and AI|disclosed']]],
    'C.5': ['A video of one to three minutes, covering six required items, with a public link.', 'Judges may only see your video, so it has to cover everything.', '', [['video', '1 to 3|minutes'], ['list', 'Six required|items'], ['globe', 'A public|link']]],
    'C.6': ['Register, write your answers, and submit early.', 'The last three steps. Finish at least a week before the deadline.', 'arrow', [['clipboard', 'Register'], ['pencil', 'Write your|answers'], ['rocket', 'Submit|early']]]
  };
  Object.entries(SCENES).forEach(([id, [label, cap, join, cards]]) => { ART[id] = { hero: scene(label, cap, join, cards) }; });

  const st = document.createElement('style');
  st.textContent = `.art{margin:18px 0 0}.art svg{border-radius:18px}.art figcaption{margin-top:8px;color:var(--muted);font-size:15px}`;
  document.head.appendChild(st);
  window.AB_ART = function (id, slot) {
    const f = (ART[id] || {})[slot];
    return f ? `<figure class="art">${f.html}<figcaption>${f.cap}</figcaption></figure>` : '';
  };
  window.AP_FIGURE = id => window.AB_ART(id, 'hero');
})();
