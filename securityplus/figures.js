// Diagrams for visual learners. Shown under the lesson paragraph for the lessons listed here.
// Each figure is inline SVG or HTML so it follows the domain color and dark mode.
(function () {
  const U = 'var(--u, var(--accent))';
  const T = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} fill="var(--ink)" font-family="var(--f-mono, monospace)" font-size="15">${s}</text>`;
  const W = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} fill="#fff" font-family="var(--f-mono, monospace)" font-size="15" font-weight="700">${s}</text>`;
  const M = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} fill="var(--muted)" font-family="var(--f-body, sans-serif)" font-size="13">${s}</text>`;
  const box = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill || 'var(--panel, #fff)'}" stroke="var(--ink)" stroke-width="2"/>`;
  const svg = (h, body, label) => `<svg viewBox="0 0 600 ${h}" role="img" aria-label="${label}" style="width:100%;height:auto"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink)"/></marker></defs>${body}</svg>`;
  const arr = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>`;
  const table = (head, rows) => `<div class="scroll"><table class="fig-table"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  const F = {
    '1.1': {
      cap: 'Control types describe what a control does, at each point in time around an incident.',
      html: svg(150, [['Deterrent', 'discourages', 'warning sign'], ['Preventive', 'stops', 'firewall rule'], ['Detective', 'finds', 'IDS alert'], ['Corrective', 'fixes', 'restore backup']].map((c, i) => {
        const x = 8 + i * 148;
        return `${box(x, 30, 136, 100)}<rect x="${x}" y="30" width="136" height="34" rx="8" fill="${U}"/>${W(x + 68, 52, c[0], 'text-anchor="middle"')}${T(x + 68, 90, c[1], 'text-anchor="middle"')}${M(x + 68, 116, c[2], 'text-anchor="middle"')}${i < 3 ? arr(x + 137, 80, x + 147, 80) : ''}`;
      }).join('') + M(8, 18, 'before the attack') + M(592, 18, 'after the attack', 'text-anchor="end"'), 'Deterrent, preventive, detective, and corrective controls on a timeline')
    },
    '1.2': {
      cap: 'The CIA triad. Every attack threatens at least one side, and every control protects at least one.',
      html: svg(230, `<path d="M300 20L470 200H130z" fill="${U}" opacity=".15" stroke="${U}" stroke-width="4"/>
        ${box(220, 8, 160, 40, U)}${W(300, 33, 'Confidentiality', 'text-anchor="middle"')}
        ${box(40, 180, 160, 40, U)}${W(120, 205, 'Integrity', 'text-anchor="middle"')}
        ${box(400, 180, 160, 40, U)}${W(480, 205, 'Availability', 'text-anchor="middle"')}
        ${M(300, 110, 'encryption, access control', 'text-anchor="middle"')}${M(300, 130, 'hashing, signatures', 'text-anchor="middle"')}${M(300, 150, 'backups, redundancy', 'text-anchor="middle"')}`, 'The CIA triad of confidentiality, integrity, and availability')
    },
    '1.5': {
      cap: 'Symmetric encryption uses one shared key. Asymmetric uses a key pair: lock with the public key, unlock with the private key.',
      html: svg(210, `${T(10, 24, 'Symmetric (AES)', 'font-weight="700"')}
        ${box(10, 38, 110, 44)}${T(65, 65, 'plaintext', 'text-anchor="middle"')}${arr(124, 60, 200, 60)}${M(162, 52, 'key K', 'text-anchor="middle"')}
        ${box(204, 38, 150, 44, U)}${W(279, 65, 'ciphertext', 'text-anchor="middle"')}${arr(358, 60, 434, 60)}${M(396, 52, 'same key K', 'text-anchor="middle"')}
        ${box(438, 38, 110, 44)}${T(493, 65, 'plaintext', 'text-anchor="middle"')}
        ${T(10, 130, 'Asymmetric (RSA, ECC)', 'font-weight="700"')}
        ${box(10, 144, 110, 44)}${T(65, 171, 'plaintext', 'text-anchor="middle"')}${arr(124, 166, 200, 166)}${M(162, 158, 'public key', 'text-anchor="middle"')}
        ${box(204, 144, 150, 44, U)}${W(279, 171, 'ciphertext', 'text-anchor="middle"')}${arr(358, 166, 434, 166)}${M(396, 158, 'private key', 'text-anchor="middle"')}
        ${box(438, 144, 110, 44)}${T(493, 171, 'plaintext', 'text-anchor="middle"')}`, 'Symmetric versus asymmetric encryption')
    },
    '1.6': {
      cap: 'Hashing is one-way. The same input always gives the same hash, and a one-letter change gives a completely different one.',
      html: svg(150, `${box(10, 20, 150, 40)}${T(85, 46, '"Password1"', 'text-anchor="middle"')}${arr(164, 40, 230, 40)}
        ${box(234, 20, 90, 40, U)}${W(279, 46, 'SHA-256', 'text-anchor="middle"')}${arr(328, 40, 394, 40)}${T(400, 46, '19513f…e1dd')}
        ${box(10, 90, 150, 40)}${T(85, 116, '"Password2"', 'text-anchor="middle"')}${arr(164, 110, 230, 110)}
        ${box(234, 90, 90, 40, U)}${W(279, 116, 'SHA-256', 'text-anchor="middle"')}${arr(328, 110, 394, 110)}${T(400, 116, '1be022…5b23')}`, 'Two similar inputs produce completely different hashes')
    },
    '2.2': {
      cap: 'Common threat vectors. Each one is a path into the organization, and together they make up the attack surface.',
      html: svg(220, `<circle cx="300" cy="110" r="52" fill="${U}"/>${W(300, 106, 'your', 'text-anchor="middle"')}${W(300, 124, 'company', 'text-anchor="middle"')}` +
        [['Email', 300, 22], ['SMS', 470, 46], ['QR code', 520, 120], ['USB drive', 460, 196], ['Wi-Fi', 140, 196], ['Phone call', 80, 120], ['Supply chain', 130, 46]].map(([n, x, y]) => `<path d="M${x} ${y}L${300 + (x - 300) * 0.38} ${110 + (y - 110) * 0.38}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 5" marker-end="url(#ah)"/><rect x="${x - 52}" y="${y - 15}" width="104" height="28" rx="14" fill="var(--panel, #fff)" stroke="var(--ink)" stroke-width="2"/>${T(x, y + 5, n, 'text-anchor="middle" font-size="13"')}`).join(''), 'Threat vectors pointing at an organization')
    },
    '2.4': {
      cap: 'Indirect prompt injection: the attacker never talks to the model. They hide instructions in content the model reads.',
      html: svg(170, `${box(8, 60, 110, 50)}${T(63, 90, 'User', 'text-anchor="middle"')}${arr(122, 85, 196, 85)}${M(159, 76, 'summarize', 'text-anchor="middle"')}
        ${box(200, 50, 130, 70, U)}${W(265, 90, 'AI model', 'text-anchor="middle"')}${arr(334, 85, 408, 85)}${M(371, 76, 'reads', 'text-anchor="middle"')}
        ${box(412, 30, 180, 110)}${T(502, 58, 'web page', 'text-anchor="middle"')}<rect x="424" y="74" width="156" height="50" rx="6" fill="var(--bad, #c33)" opacity=".18"/>${M(502, 94, 'hidden text: "ignore', 'text-anchor="middle"')}${M(502, 112, 'your rules and…"', 'text-anchor="middle"')}
        ${M(300, 160, 'Defense: treat content and model output as untrusted, limit the model\'s permissions', 'text-anchor="middle"')}`, 'Indirect prompt injection through a web page')
    },
    '2.7': {
      cap: 'SQL injection: input is pasted into a database query, so special characters change what the query does.',
      html: `<div class="code" style="font-size:14px"><div>Input:  <b>admin' OR '1'='1' --</b></div><div>&nbsp;</div><div>SELECT * FROM users</div><div>WHERE name = '<b>admin' OR '1'='1' --</b>' AND pass = '…'</div><div>&nbsp;</div><div>'1'='1' is always true and -- comments out the password check.</div><div>Fix: parameterized queries and input validation.</div></div>`
    },
    '3.2': {
      cap: 'Zero trust: every request passes a policy enforcement point, which asks the control plane for a decision based on identity, device, and context.',
      html: svg(210, `${box(10, 80, 120, 50)}${T(70, 103, 'user +', 'text-anchor="middle"')}${T(70, 121, 'device', 'text-anchor="middle"')}${arr(134, 105, 214, 105)}
        ${box(218, 80, 150, 50, U)}${W(293, 110, 'Enforcement', 'text-anchor="middle"')}${arr(372, 105, 452, 105)}
        ${box(456, 80, 134, 50)}${T(523, 110, 'resource', 'text-anchor="middle"')}
        <path d="M293 80V48" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/><path d="M303 44V76" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>
        ${box(198, 6, 190, 38)}${T(293, 30, 'Policy engine', 'text-anchor="middle"')}${M(400, 30, 'control plane')}${M(10, 72, 'data plane')}
        ${M(293, 160, 'checks: who? which device? patched? location? time?', 'text-anchor="middle"')}${M(293, 190, 'Inside the network is not enough. Every request is verified.', 'text-anchor="middle"')}`, 'Zero trust request flow through a policy enforcement point')
    },
    '3.3': {
      cap: 'Security zones. Public servers sit in the screened subnet, so a breach there does not reach the internal network directly.',
      html: svg(190, `${box(8, 60, 110, 70)}${T(63, 100, 'Internet', 'text-anchor="middle"')}${arr(122, 95, 152, 95)}
        <rect x="156" y="70" width="22" height="50" rx="4" fill="${U}"/>${M(167, 140, 'firewall', 'text-anchor="middle"')}${arr(182, 95, 212, 95)}
        <rect x="216" y="30" width="160" height="130" rx="10" fill="${U}" opacity=".12" stroke="${U}" stroke-width="2"/>${T(296, 52, 'Screened subnet', 'text-anchor="middle" font-size="13"')}
        ${box(236, 66, 120, 34)}${T(296, 88, 'web server', 'text-anchor="middle" font-size="13"')}${box(236, 110, 120, 34)}${T(296, 132, 'mail relay', 'text-anchor="middle" font-size="13"')}
        ${arr(380, 95, 410, 95)}<rect x="414" y="70" width="22" height="50" rx="4" fill="${U}"/>${M(425, 140, 'firewall', 'text-anchor="middle"')}${arr(440, 95, 470, 95)}
        ${box(474, 40, 118, 110)}${T(533, 70, 'Internal', 'text-anchor="middle"')}${M(533, 96, 'users', 'text-anchor="middle"')}${M(533, 114, 'databases', 'text-anchor="middle"')}${M(533, 132, 'file servers', 'text-anchor="middle"')}`, 'Network zones with a screened subnet between two firewalls')
    },
    '3.5': {
      cap: 'Recovery sites trade cost for speed. Pick the one that meets the recovery time objective.',
      html: table(['Site', 'Ready to run', 'Equipment', 'Cost'], [['Hot', 'Minutes to hours', 'Everything, data kept in sync', 'Highest'], ['Warm', 'Hours to days', 'Some hardware, older data', 'Medium'], ['Cold', 'Days to weeks', 'Space and power only', 'Lowest']])
    },
    '4.3': {
      cap: 'Vulnerability management is a cycle that never ends.',
      html: svg(200, [['Identify', 300, 30], ['Analyze', 500, 100], ['Respond', 300, 170], ['Verify', 100, 100]].map(([n, x, y], i, a) => {
        const [nx, ny] = [a[(i + 1) % 4][1], a[(i + 1) % 4][2]];
        return `<rect x="${x - 60}" y="${y - 20}" width="120" height="40" rx="20" fill="${U}"/>${W(x, y + 5, n, 'text-anchor="middle"')}` + `<path d="M${x + (nx - x) * 0.32} ${y + (ny - y) * 0.32}L${x + (nx - x) * 0.68} ${y + (ny - y) * 0.68}" stroke="var(--ink)" stroke-width="2" marker-end="url(#ah)"/>`;
      }).join('') + M(300, 96, 'scan, CVE, CVSS', 'text-anchor="middle"') + M(300, 114, 'patch, rescan, report', 'text-anchor="middle"'), 'Identify, analyze, respond, verify cycle')
    },
    '4.7': {
      cap: 'The incident response process. Lessons learned feeds back into preparation.',
      html: svg(150, ['Prepare', 'Detect', 'Analyze', 'Contain', 'Eradicate', 'Recover', 'Lessons'].map((n, i) => {
        const x = 6 + i * 84;
        return `<rect x="${x}" y="40" width="76" height="44" rx="8" fill="${U}" opacity="${0.75 + (i % 2) * 0.25}"/>${W(x + 38, 67, n, 'text-anchor="middle" font-size="12"')}${i < 6 ? arr(x + 76, 62, x + 83, 62) : ''}`;
      }).join('') + `<path d="M550 88v30H44V92" stroke="var(--ink)" stroke-width="2" fill="none" stroke-dasharray="5 5" marker-end="url(#ah)"/>${M(300, 138, 'improve the plan', 'text-anchor="middle"')}`, 'Incident response phases')
    },
    '4.8': {
      cap: 'Order of volatility: collect what disappears fastest first.',
      html: svg(150, ['CPU cache and registers', 'Memory (RAM)', 'Temp files and swap', 'Disk', 'Logs and backups'].map((n, i) => {
        const w = 560 - i * 70;
        return `<rect x="${(600 - w) / 2}" y="${6 + i * 28}" width="${w}" height="24" rx="5" fill="${U}" opacity="${1 - i * 0.1}"/>${W(300, 23 + i * 28, n, 'text-anchor="middle" font-size="13"')}`;
      }).join('') + M(8, 145, 'most volatile at the top'), 'Order of volatility from most to least volatile')
    },
    '5.2': {
      cap: 'Quantitative risk: SLE = asset value × exposure factor. ALE = SLE × ARO.',
      html: svg(160, `${box(10, 20, 130, 56)}${T(75, 44, 'Asset value', 'text-anchor="middle" font-size="13"')}${T(75, 64, '$50,000', 'text-anchor="middle" font-weight="700"')}
        ${T(152, 54, '×')}${box(170, 20, 120, 56)}${T(230, 44, 'Exposure', 'text-anchor="middle" font-size="13"')}${T(230, 64, '40%', 'text-anchor="middle" font-weight="700"')}
        ${T(302, 54, '=')}${box(320, 20, 120, 56, U)}${W(380, 44, 'SLE', 'text-anchor="middle" font-size="13"')}${W(380, 64, '$20,000', 'text-anchor="middle"')}
        ${box(170, 96, 120, 56)}${T(230, 120, 'ARO', 'text-anchor="middle" font-size="13"')}${T(230, 140, '0.2 / yr', 'text-anchor="middle" font-weight="700"')}
        ${T(302, 130, '→')}${box(320, 96, 270, 56, U)}${W(455, 120, 'ALE = $20,000 × 0.2', 'text-anchor="middle" font-size="13"')}${W(455, 140, '$4,000 per year', 'text-anchor="middle"')}`, 'Worked example of SLE and ALE')
    },
    '5.5': {
      cap: 'How much the testers know at the start of a penetration test.',
      html: table(['Test type', 'Testers start with', 'Simulates'], [['Known environment', 'Full details: diagrams, code, accounts', 'An insider or a thorough audit'], ['Partially known', 'Some details, such as IP ranges', 'An attacker with some inside info'], ['Unknown environment', 'Nothing but the company name', 'An outside attacker']])
    }
  };

  const st = document.createElement('style');
  st.textContent = `.figure{margin:18px 0 6px;padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--panel)}
  .figure figcaption{margin-top:10px;color:var(--muted);font-size:15px}
  .figure .label{display:block;margin-bottom:10px}
  .figure .scroll{overflow-x:auto}
  .fig-table{width:100%;border-collapse:collapse;font-size:15px}
  .fig-table th,.fig-table td{border-bottom:1px solid var(--line);padding:8px 10px;text-align:left}
  .fig-table th{background:var(--panel-2)}
  .fig-table td:first-child{font-weight:700;color:var(--u, var(--accent))}
  .figure .code{font-family:var(--f-mono);background:var(--term);color:var(--term-ink);border-radius:12px;padding:12px 16px;overflow-x:auto}
  .figure .code div{white-space:pre}`;
  document.head.appendChild(st);

  window.AP_FIGURE = function (id) {
    const f = F[id];
    return f ? `<figure class="figure"><span class="label u">Picture it</span>${f.html}<figcaption>${f.cap}</figcaption></figure>` : '';
  };
})();
