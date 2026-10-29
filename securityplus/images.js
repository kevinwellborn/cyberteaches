// Original illustrations for each topic, drawn as inline SVG so they follow the unit color and dark mode.
// Each icon is drawn in a 100x100 box. A scene places three icons side by side with the middle one larger.
(function () {
  const A = 'fill="var(--u, var(--accent))"';            // filled accent shape
  const S = 'fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
  const P = 'fill="var(--panel, #fff)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"'; // solid paper shape

  const I = {
    envelope: `<rect x="12" y="26" width="76" height="50" rx="6" ${P}/><path d="M14 30l36 28 36-28" ${S}/><circle cx="80" cy="28" r="10" ${A}/>`,
    hook: `<path d="M50 10v50a16 16 0 1 1-32 0" ${S}/><path d="M18 60l-6-8M18 60l8-5" ${S}/><circle cx="50" cy="12" r="6" ${A}/>`,
    person: `<circle cx="50" cy="32" r="16" ${A}/><path d="M20 88c2-20 14-30 30-30s28 10 30 30" ${P}/>`,
    browser: `<rect x="8" y="16" width="84" height="68" rx="8" ${P}/><path d="M8 34h84" ${S}/><circle cx="20" cy="25" r="3" ${A}/><circle cx="30" cy="25" r="3" ${A}/><rect x="24" y="46" width="52" height="9" rx="4" ${A}/><rect x="24" y="62" width="52" height="9" rx="4" ${S}/>`,
    lock: `<path d="M32 46V34a18 18 0 0 1 36 0v12" ${S}/><rect x="22" y="46" width="56" height="42" rx="8" ${A}/><circle cx="50" cy="64" r="6" fill="var(--panel, #fff)"/><path d="M50 66v9" stroke="var(--panel, #fff)" stroke-width="5" stroke-linecap="round"/>`,
    shield: `<path d="M50 8l34 12v26c0 22-14 38-34 46C30 84 16 68 16 46V20z" ${A}/><path d="M34 50l11 11 21-23" fill="none" stroke="var(--panel, #fff)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
    wifi: `<path d="M14 42a52 52 0 0 1 72 0M26 56a34 34 0 0 1 48 0M38 70a16 16 0 0 1 24 0" ${S}/><circle cx="50" cy="82" r="6" ${A}/>`,
    coffee: `<path d="M20 40h50v22a22 22 0 0 1-22 22h-6a22 22 0 0 1-22-22z" ${A}/><path d="M70 46h6a10 10 0 0 1 0 20h-6" ${S}/><path d="M36 30c0-6 6-6 6-12M52 30c0-6 6-6 6-12" ${S}/>`,
    eye: `<path d="M8 50c12-20 26-30 42-30s30 10 42 30c-12 20-26 30-42 30S20 70 8 50z" ${P}/><circle cx="50" cy="50" r="14" ${A}/><circle cx="50" cy="50" r="5" fill="var(--ink)"/>`,
    chip: `<rect x="24" y="24" width="52" height="52" rx="8" ${A}/><path d="M36 14v10M50 14v10M64 14v10M36 76v10M50 76v10M64 76v10M14 36h10M14 50h10M14 64h10M76 36h10M76 50h10M76 64h10" ${S}/><text x="50" y="58" text-anchor="middle" font-family="var(--f-display, sans-serif)" font-weight="800" font-size="22" fill="var(--panel, #fff)">AI</text>`,
    phone: `<rect x="28" y="8" width="44" height="84" rx="8" ${P}/><path d="M42 18h16" ${S}/><circle cx="50" cy="80" r="4" ${A}/><rect x="36" y="28" width="28" height="40" rx="4" ${A}/>`,
    chart: `<rect x="10" y="14" width="80" height="72" rx="8" ${P}/><path d="M20 70l16-16 12 10 18-24 14 12" ${S}/><circle cx="66" cy="40" r="6" ${A}/>`,
    triangle: `<path d="M50 12l38 70H12z" ${P}/><circle cx="50" cy="16" r="10" ${A}/><circle cx="16" cy="78" r="10" ${A}/><circle cx="84" cy="78" r="10" ${A}/>`,
    door: `<rect x="24" y="8" width="52" height="84" rx="4" ${P}/><rect x="32" y="16" width="36" height="30" rx="2" ${A}/><circle cx="64" cy="58" r="4" fill="var(--ink)"/>`,
    badge: `<rect x="22" y="22" width="56" height="70" rx="8" ${P}/><path d="M42 22v-12h16v12" ${S}/><circle cx="50" cy="46" r="10" ${A}/><path d="M36 70h28M40 80h20" ${S}/>`,
    camera: `<path d="M14 30l56-12 8 26-56 12z" ${A}/><path d="M74 32l14-4v18l-12 2" ${S}/><path d="M36 52l4 16M24 76h28" ${S}/><circle cx="30" cy="38" r="4" fill="var(--panel, #fff)"/>`,
    bell: `<path d="M26 70V46a24 24 0 0 1 48 0v24l8 8H18z" ${A}/><path d="M42 84a8 8 0 0 0 16 0" ${S}/><path d="M50 14v8" ${S}/>`,
    network: `<path d="M50 24L20 74M50 24l30 50M20 74h60" ${S}/><circle cx="50" cy="24" r="12" ${A}/><circle cx="20" cy="74" r="12" ${A}/><circle cx="80" cy="74" r="12" ${A}/>`,
    bug: `<ellipse cx="50" cy="56" rx="20" ry="26" ${A}/><circle cx="50" cy="26" r="10" ${A}/><path d="M30 46l-14-8M30 60H12M30 74l-14 8M70 46l14-8M70 60h18M70 74l14 8M44 18l-6-10M56 18l6-10" ${S}/><path d="M50 34v48" stroke="var(--panel, #fff)" stroke-width="3"/>`,
    laptop: `<rect x="18" y="18" width="64" height="44" rx="6" ${P}/><rect x="26" y="26" width="48" height="28" rx="2" ${A}/><path d="M8 72h84l-6 10H14z" ${P}/>`,
    doc: `<path d="M22 8h40l18 18v66H22z" ${P}/><path d="M62 8v18h18" ${S}/><path d="M32 46h36M32 58h36M32 70h24" ${S}/><circle cx="66" cy="76" r="9" ${A}/>`,
    wall: `<rect x="10" y="20" width="80" height="64" rx="4" ${A}/><path d="M10 41h80M10 62h80M40 20v21M70 20v21M25 41v21M55 41v21M40 62v22M70 62v22" stroke="var(--panel, #fff)" stroke-width="4"/>`,
    server: `<rect x="20" y="10" width="60" height="24" rx="4" ${P}/><rect x="20" y="38" width="60" height="24" rx="4" ${P}/><rect x="20" y="66" width="60" height="24" rx="4" ${P}/><circle cx="32" cy="22" r="4" ${A}/><circle cx="32" cy="50" r="4" ${A}/><circle cx="32" cy="78" r="4" ${A}/><path d="M46 22h24M46 50h24M46 78h24" ${S}/>`,
    magnifier: `<circle cx="42" cy="42" r="26" ${P}/><circle cx="42" cy="42" r="14" ${A}/><path d="M62 62l24 24" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/>`,
    fingerprint: `<path d="M30 30a28 28 0 0 1 44 10M24 50a26 26 0 0 1 52 0v8M34 84c-4-10-4-22-2-32a18 18 0 0 1 36 4c0 10 2 18 4 24M44 88c-4-12-4-24-2-32M50 54c0 14 2 24 8 34" ${S}/><circle cx="76" cy="20" r="8" ${A}/>`,
    key: `<circle cx="30" cy="50" r="18" ${A}/><circle cx="30" cy="50" r="6" fill="var(--panel, #fff)"/><path d="M48 50h40M76 50v14M88 50v10" ${S}/>`,
    update: `<path d="M78 40a30 30 0 1 0 2 22" ${S}/><path d="M80 22v20H60" ${S}/><circle cx="50" cy="50" r="10" ${A}/>`,
    database: `<ellipse cx="50" cy="22" rx="32" ry="12" ${A}/><path d="M18 22v56c0 7 14 12 32 12s32-5 32-12V22" ${P}/><path d="M18 42c0 7 14 12 32 12s32-5 32-12M18 60c0 7 14 12 32 12s32-5 32-12" ${S}/>`,
    code: `<rect x="8" y="16" width="84" height="68" rx="8" ${P}/><path d="M36 38L24 50l12 12M64 38l12 12-12 12" ${S}/><path d="M56 34L44 66" stroke="var(--u, var(--accent))" stroke-width="5" stroke-linecap="round"/>`,
    folder: `<path d="M10 26h28l8 8h44v50H10z" ${P}/><rect x="10" y="42" width="80" height="42" rx="2" ${A}/>`,
    keys: `<circle cx="28" cy="34" r="14" ${A}/><path d="M42 34h36M66 34v10" ${S}/><circle cx="28" cy="70" r="14" ${P}/><path d="M42 70h36M66 70v10" ${S}/>`
  };

  // Topic id -> [left, middle, right] icons.
  const SCENES = {
    '1.1': ['lock', 'shield', 'camera'],
    '1.2': ['doc', 'update', 'server'],
    '1.3': ['key', 'lock', 'doc'],
    '2.1': ['bug', 'magnifier', 'chart'],
    '2.2': ['person', 'bug', 'network'],
    '2.3': ['envelope', 'hook', 'phone'],
    '2.4': ['laptop', 'bug', 'server'],
    '2.5': ['bug', 'laptop', 'bell'],
    '2.6': ['camera', 'chip', 'database'],
    '3.1': ['server', 'network', 'chip'],
    '3.2': ['laptop', 'wall', 'server'],
    '3.3': ['database', 'lock', 'folder'],
    '3.4': ['server', 'update', 'database'],
    '4.1': ['laptop', 'shield', 'update'],
    '4.2': ['laptop', 'doc', 'server'],
    '4.3': ['magnifier', 'bug', 'chart'],
    '4.4': ['chart', 'magnifier', 'bell'],
    '4.5': ['person', 'fingerprint', 'key'],
    '4.6': ['code', 'chip', 'bell'],
    '4.7': ['bell', 'shield', 'update'],
    '4.8': ['laptop', 'magnifier', 'doc'],
    '5.1': ['doc', 'badge', 'person'],
    '5.2': ['chart', 'triangle', 'shield'],
    '5.3': ['server', 'doc', 'keys'],
    '5.4': ['person', 'doc', 'lock'],
    '5.5': ['laptop', 'magnifier', 'network'],
    '5.6': ['envelope', 'person', 'shield']
  };

  function place(name, cx, s) {
    return `<g transform="translate(${cx - 50 * s} ${100 - 50 * s}) scale(${s})">${I[name]}</g>`;
  }

  window.AP_IMAGE = function (id, title) {
    const sc = SCENES[id];
    if (!sc) return '';
    return `<svg class="topic-art" viewBox="0 0 600 200" role="img" aria-label="Illustration for ${title.replace(/[&<>"]/g, '')}">
      <rect width="600" height="200" rx="18" fill="var(--u, var(--accent))" opacity=".12"/>
      <path d="M170 100h70M360 100h70" stroke="var(--u, var(--accent))" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
      ${place(sc[0], 110, 1)}${place(sc[1], 300, 1.5)}${place(sc[2], 490, 1)}
    </svg>`;
  };
})();
