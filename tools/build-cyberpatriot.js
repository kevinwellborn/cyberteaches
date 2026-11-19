// Builds the CyberPatriot High School course pages in cyberpatriot/ from tools/cyberpatriot/units.js.
//   cyberpatriot/index.html          course home
//   cyberpatriot/unit-N/index.html   one page per unit (overview, schedule, lab, checklist, student files)
//   cyberpatriot/teachers/index.html teacher area (lesson plans, quizzes, keys, setup scripts); noindex
// Files open from Google Drive, so each linked Drive file must be shared as "Anyone with the link: Viewer".
// Run:  node tools/build-cyberpatriot.js
const fs = require('fs');
const path = require('path');
const UNITS = require('./cyberpatriot/units.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'cyberpatriot');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Google Drive links
const doc = id => ({
  open: `https://docs.google.com/document/d/${id}/edit?usp=sharing`,
  copy: `https://docs.google.com/document/d/${id}/copy`,
  pdf: `https://docs.google.com/document/d/${id}/export?format=pdf`
});
const deck = id => ({
  open: `https://docs.google.com/presentation/d/${id}/edit?usp=sharing`,
  copy: `https://docs.google.com/presentation/d/${id}/copy`,
  pdf: `https://docs.google.com/presentation/d/${id}/export/pdf`
});
const txt = id => ({
  open: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
  download: `https://drive.google.com/uc?export=download&id=${id}`
});

const FILE_INFO = {
  slides: { kind: 'Slides', name: 'Slide deck', desc: 'Every lesson in order, with speaker notes.', link: deck },
  lab: { kind: 'Lab', name: 'Lab student handout', desc: 'The README, steps, and a table to record fixes.', link: doc },
  checklist: { kind: 'Handout', name: 'Starter hardening checklist', desc: 'One per student. Students add to it all year.', link: doc },
  handouts: { kind: 'Handout', name: 'CIA cards and code of conduct', desc: 'Sorting cards for Lesson 2 and the team code of conduct.', link: doc },
  runsheet: { kind: 'Lab', name: 'Mock round run sheet', desc: 'Roles, timing, and the debrief template for each mock round.', link: doc },
  plan: { kind: 'Lesson plan', name: 'Teacher lesson plan', desc: 'Goals, minute-by-minute script, differentiation.', link: doc },
  labkey: { kind: 'Answer key', name: 'Lab teacher guide and key', desc: 'VM setup steps and every planted problem with its fix.', link: doc },
  mockguide: { kind: 'Teacher guide', name: 'Mock round teacher guide', desc: 'How to set up, run, and score a mock round.', link: doc },
  setup: { kind: 'Setup script', name: 'Lab setup script', desc: 'Commands that plant the lab problems on your VM.', link: txt },
  quiz: { kind: 'Quiz', name: 'Unit quiz', desc: 'Print or copy into your LMS.', link: doc },
  quizkey: { kind: 'Answer key', name: 'Quiz answer key', desc: 'Answers with short explanations.', link: doc }
};
const STUDENT = ['slides', 'lab', 'checklist', 'handouts', 'runsheet'];
const TEACHER = ['plan', 'labkey', 'mockguide', 'setup', 'quiz', 'quizkey'];

function fileCard(key, id, unit) {
  const f = FILE_INFO[key], l = f.link(id);
  const acts = l.download
    ? `<a class="btn line sm" href="${l.open}" target="_blank" rel="noopener">Open</a><a class="btn line sm" href="${l.download}">Download</a>`
    : `<a class="btn line sm" href="${l.open}" target="_blank" rel="noopener">Open</a><a class="btn line sm" href="${l.copy}" target="_blank" rel="noopener">Make a copy</a><a class="btn line sm" href="${l.pdf}">PDF</a>`;
  return `<div class="file"><span class="kind">${f.kind}${unit ? ' · Unit ' + unit : ''}</span><h3>${f.name}</h3><p>${f.desc}</p><div class="acts">${acts}</div></div>`;
}

const ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>';

function page({ title, desc, rel, body, current, noindex }) {
  const nav = [['', 'Course home'], ['#units', 'Units'], ['#calendar', 'Calendar'], ['teachers/', 'Teachers']]
    .map(([href, label]) => `<a href="${rel}${href}"${current === label ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">${noindex ? '\n<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="/favicon.png"><link rel="stylesheet" href="${rel}assets/site.css">
</head><body>
<header class="site"><div class="wrap"><a class="brand" href="/"><img src="/logo.png" alt="" width="32" height="32">CyberTeaches</a><span class="brand course">CyberPatriot</span>
<nav aria-label="Course">${nav}<a href="/">All courses</a></nav></div></header>
${body}
<footer class="site"><div class="wrap">
<div><a href="/">CyberTeaches</a> · free courses from teacher Kevin Wellborn · <a href="https://www.youtube.com/@cyberteaches" target="_blank" rel="noopener">YouTube @CyberTeaches</a></div>
<div>CyberPatriot is the National Youth Cyber Defense Competition of the Air &amp; Space Forces Association (AFA). CyberTeaches is not affiliated with or endorsed by AFA or CyberPatriot. All lessons, labs, and scenarios here are original; the organizations in them are fictional. Check the current CyberPatriot rules book each season.</div>
</div></footer>
</body></html>
`;
}

const write = (rel, html) => {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
};

// ---------- Course home ----------
const CALENDAR = [
  ['1 to 3', 'August', '1, 2', 'Register the team', 'Set up virtual machines, practice images'],
  ['4 to 7', 'September', '3, 4', 'Practice round', 'Timed Windows images, start Cisco NetAcad modules'],
  ['8 to 11', 'October', '5, 6', 'Practice round', 'Timed Linux images, NetAcad quizzes'],
  ['12 to 15', 'November', '7', 'Round 1', 'Full mock rounds, round debrief'],
  ['16 to 18', 'December', '8', 'Round 2', 'Windows Server images, Packet Tracer'],
  ['19 to 22', 'January', '9', 'State round', 'Forensics questions, mixed images'],
  ['23 to 26', 'February', '10', 'Semifinals', 'Team roles, speed drills'],
  ['27 to 32', 'March', 'Review', 'National finals (qualifying teams)', 'Mock rounds, end-of-year review, recruit next year\'s team']
];
const GRADING = [
  ['Labs and timed practice images', '50%', 'Score from the practice image\'s scoring report, plus a short write-up of fixes'],
  ['Unit quizzes', '25%', '10 to 15 questions per unit, answer key in the teacher area'],
  ['Checklists and notes', '15%', 'Each student keeps their own hardening checklist up to date'],
  ['Participation and ethics talks', '10%', 'Teamwork during practice and the ethics discussion in every unit']
];

const unitCards = UNITS.map(u => `<a class="card" href="unit-${u.n}/"><span class="num">Unit ${u.n} · ${u.weeks} week${u.weeks === 1 ? '' : 's'}</span><h3>${esc(u.title)}</h3><p>${esc(u.lab.title.replace(/^Lab \d+: /, 'Lab: '))}</p><div class="meta"><span>${esc(u.os)}</span><span>${u.schedule.length} sessions</span></div></a>`).join('\n');

write('index.html', page({
  title: 'CyberPatriot High School Course | CyberTeaches',
  desc: 'A free, full-year course that prepares high school teams for CyberPatriot: 10 units on Windows, Linux, Windows Server, Cisco networking, forensics, and cyber ethics, with slides, labs, and quizzes.',
  rel: '', current: 'Course home',
  body: `<div class="hero"><div class="wrap">
<span class="eyebrow">Free course · Grades 9 to 12</span>
<h1>CyberPatriot, from first image to final round</h1>
<p class="lead">A full-year course that takes high school students with no security background to competing in every CyberPatriot round. Each unit has a lesson plan, slides, a hands-on lab, a quiz, and new lines for the team hardening checklist. A teacher with no security background can teach it.</p>
<div class="ctas"><a class="btn primary" href="unit-1/">Start with Unit 1</a><a class="btn ghost" href="teachers/">Teacher area →</a></div>
<div class="facts"><span><b>10</b> units</span><span><b>32</b> weeks, August to March</span><span><b>3 to 4</b> hours a week</span><span>Windows, Linux, Server, Cisco</span></div>
</div></div>
<main class="wrap">

<section id="units">
<div class="sec-head"><span class="eyebrow">Units</span><h2>Ten units, built around the competition</h2><p>Units 1 to 6 build Windows and Linux skills in the first 11 weeks, before the first scored round. Units 7 to 10 add Cisco and Windows Server and sharpen the team for later rounds.</p></div>
<div class="grid">
${unitCards}
</div>
</section>

<section>
<div class="sec-head"><span class="eyebrow">How it works</span><h2>What a week looks like</h2></div>
<div class="grid four">
<div class="card"><h3>Two 50-minute lessons</h3><p>Short teaching with the slides, a hands-on activity, and an exit ticket. Every lesson plan has a minute-by-minute script.</p></div>
<div class="card"><h3>One 90-minute practice</h3><p>Students work a lab on their own virtual machine, then redo it against a timer, just like a round.</p></div>
<div class="card"><h3>A checklist that grows</h3><p>Every unit adds tested checks and commands. By Unit 10 the team merges them into one master checklist for round day.</p></div>
<div class="card"><h3>Ethics in every unit</h3><p>Ethics is taught in Unit 1 and comes back as a 10-minute scenario discussion in every unit after that.</p></div>
</div>
</section>

<section id="calendar">
<div class="sec-head"><span class="eyebrow">Season calendar</span><h2>Aligned to the competition season</h2><p>Dates are typical and approximate. Confirm them each year on the official CyberPatriot schedule. Teams starting mid-season can jump to the unit that matches the next round and use the Unit 10 checklists right away.</p></div>
<div class="tbl-scroll"><table class="tbl"><thead><tr><th>Weeks</th><th>Month</th><th>Units</th><th>Competition</th><th>Practice session focus</th></tr></thead><tbody>
${CALENDAR.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>
</section>

<section>
<div class="sec-head"><span class="eyebrow">Grading</span><h2>Graded mostly on hands-on work</h2><p>That is what the competition scores.</p></div>
<div class="tbl-scroll"><table class="tbl"><thead><tr><th>Assessment</th><th>Weight</th><th>How it works</th></tr></thead><tbody>
${GRADING.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>
</section>

<section>
<div class="sec-head"><span class="eyebrow">Getting ready</span><h2>What you need</h2></div>
<div class="grid two">
<div class="card"><h3>Equipment and software</h3><ul>
<li>Computers that can run virtual machines (8 GB RAM or more)</li>
<li>VirtualBox or VMware Workstation Player (free)</li>
<li>Windows 10/11 Enterprise and Windows Server evaluation images, and Ubuntu Desktop LTS</li>
<li>Cisco Packet Tracer (free with a Cisco Networking Academy account)</li>
<li>Official CyberPatriot practice images and training (for registered teams)</li></ul></div>
<div class="card"><h3>Team roles</h3><p>Teams have up to 6 competitors (5 compete in a round) plus a coach. In class, rotate so every student practices each operating system, then specialize in Unit 10:</p><ul>
<li>Windows lead</li><li>Linux lead</li><li>Windows Server lead</li><li>Cisco and networking lead</li><li>Captain: forensics questions, checklist, and the clock</li></ul></div>
</div>
</section>

<section>
<div class="note"><b>Practice responsibly</b>Every lab runs on virtual machines and simulators you set up yourself. Never scan, change, or test a computer or network you do not own or have written permission to use.</div>
</section>

<section>
<div class="sec-head"><span class="eyebrow">For teachers</span><h2>Lesson plans, quizzes, and answer keys</h2><p>The teacher area has every lesson plan, the lab setup steps and answer keys, the unit quizzes, and the quiz keys. Please keep it away from students.</p></div>
<a class="btn primary" href="teachers/">Go to the teacher area</a>
</section>
</main>`
}));

// ---------- Unit pages ----------
UNITS.forEach((u, i) => {
  const prev = UNITS[i - 1], next = UNITS[i + 1];
  const studentFiles = STUDENT.filter(k => u.files[k]).map(k => fileCard(k, u.files[k])).join('\n');
  const body = `<div class="hero small"><div class="wrap">
<div class="crumbs"><a href="../">CyberPatriot</a> / Unit ${u.n}</div>
<span class="eyebrow">Unit ${u.n} of ${UNITS.length} · ${u.weeks} week${u.weeks === 1 ? '' : 's'}</span>
<h1>${esc(u.title)}</h1>
<p class="lead">${esc(u.lead)}</p>
<div class="facts"><span><b>Time:</b> ${esc(u.sessions)}</span><span><b>Platform:</b> ${esc(u.os)}</span></div>
</div></div>
<main class="wrap">

<section>
<div class="grid two">
<div class="card"><span class="eyebrow">Goals</span><h3>By the end of this unit, students can</h3><ol class="goals">${u.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ol></div>
<div class="card"><span class="eyebrow">Signature lab</span><h3>${esc(u.lab.title)}</h3><p>${esc(u.lab.text)}</p><div class="meta"><span>${esc(u.standards)}</span></div></div>
</div>
</section>

<section>
<div class="sec-head"><span class="eyebrow">Materials</span><h2>Student materials</h2><p>Open them in Google Drive, make your own editable copy, or download a PDF to print.</p></div>
<div class="files">
${studentFiles}
</div>
<p style="margin-top:14px;color:var(--muted);font-size:15px">Teachers: the lesson plan, quiz, and answer keys for this unit are in the <a href="../teachers/#unit-${u.n}">teacher area</a>.</p>
</section>

<section>
<div class="sec-head"><span class="eyebrow">Unit at a glance</span><h2>Sessions</h2><p>Lessons are 50 minutes and practice sessions are 90 minutes.</p></div>
<div class="tbl-scroll"><table class="tbl"><thead><tr><th>Session</th><th>Topic</th><th>Students make</th></tr></thead><tbody>
${u.schedule.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>
</section>

<section>
<div class="sec-head"><span class="eyebrow">Hardening checklist</span><h2>Add these to your checklist</h2><p>At the end of the unit, every student adds these lines. Always check the README first: it decides what is required.</p></div>
<div class="tbl-scroll"><table class="tbl"><thead><tr><th>Check</th><th>How</th></tr></thead><tbody>
${u.checklist.map(([c, h]) => `<tr><td>${esc(c)}</td><td><code>${esc(h)}</code></td></tr>`).join('\n')}
</tbody></table></div>
</section>

<section>
<div class="grid two">
<div><span class="eyebrow">Key vocabulary</span><h2 style="font-size:22px;margin:6px 0 14px">Words to know</h2><ul class="chips">${u.vocab.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>
<div><span class="eyebrow">Ethics discussion · 10 minutes</span><h2 style="font-size:22px;margin:6px 0 14px">What would you do?</h2><div class="ethics">${esc(u.ethics)}</div></div>
</div>
</section>

<nav class="pager" aria-label="Units">
${prev ? `<a href="../unit-${prev.n}/"><small>← Unit ${prev.n}</small>${esc(prev.short)}</a>` : '<a href="../"><small>←</small>Course home</a>'}
${next ? `<a href="../unit-${next.n}/" style="text-align:right"><small>Unit ${next.n} →</small>${esc(next.short)}</a>` : '<a href="../teachers/" style="text-align:right"><small>→</small>Teacher area</a>'}
</nav>
</main>`;
  write(`unit-${u.n}/index.html`, page({
    title: `Unit ${u.n}: ${u.title} | CyberPatriot | CyberTeaches`,
    desc: `CyberPatriot high school course, Unit ${u.n}: ${u.lead}`,
    rel: '../', current: 'Units', body
  }));
});

// ---------- Teacher area ----------
const teacherUnits = UNITS.map(u => `<section id="unit-${u.n}">
<div class="sec-head"><span class="eyebrow">Unit ${u.n}</span><h2>${esc(u.title)}</h2><p><a href="../unit-${u.n}/">Unit page and student materials →</a></p></div>
<div class="files">
${TEACHER.filter(k => u.files[k]).map(k => fileCard(k, u.files[k])).join('\n')}
</div>
</section>`).join('\n');

write('teachers/index.html', page({
  title: 'Teacher Area | CyberPatriot | CyberTeaches',
  desc: 'Teacher area for the CyberPatriot high school course',
  rel: '../', current: 'Teachers', noindex: true,
  body: `<div class="hero small"><div class="wrap">
<div class="crumbs"><a href="../">CyberPatriot</a> / Teachers</div>
<span class="eyebrow">For teachers</span>
<h1>Teacher area</h1>
<p class="lead">Lesson plans, lab setup steps and answer keys, unit quizzes, and quiz keys for all 10 units. Please keep this page away from students.</p>
</div></div>
<main class="wrap">
<section>
<div class="grid two">
<div class="note"><b>Before each lab</b>Build the lab VM from the setup steps in the lab key, take a snapshot, and test it once yourself. Then you can reset each pair in seconds.</div>
<div class="note warn"><b>Check the rules each season</b>Round format, team size, and allowed notes can change. Read the current CyberPatriot rules book before the season and teach students those rules directly.</div>
</div>
<p style="margin-top:22px"><b>Jump to a unit:</b> ${UNITS.map(u => `<a href="#unit-${u.n}">${u.n}</a>`).join(' · ')}</p>
</section>
${teacherUnits}
</main>`
}));

console.log(`Wrote cyberpatriot/index.html, ${UNITS.length} unit pages, and the teacher area.`);
