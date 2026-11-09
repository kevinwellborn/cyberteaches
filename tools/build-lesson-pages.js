// Builds one plain HTML page per lesson so search engines can index each topic on its own URL,
// plus a lessons index for each course and a fresh sitemap.xml.
// The interactive course (hash routes like #/topic/1.1) stays as is; these pages link back to it.
// Run after editing any content.js or questions.js:  node tools/build-lesson-pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://cyberteaches.com/';
const TODAY = new Date().toISOString().slice(0, 10);

const COURSES = [
  { dir: 'apcybersecurity', name: 'AP Cybersecurity', short: 'AP Cybersecurity', unit: 'Unit', units: 'Units',
    files: ['content.js', 'missions.js', 'questions.js', 'images.js'], practice: 'AP-style practice questions' },
  { dir: 'apcsp', name: 'AP Computer Science Principles', short: 'AP CSP', unit: 'Big Idea', units: 'Big Ideas',
    files: ['content.js', 'questions.js', 'labs.js', 'figures.js', 'images.js'], practice: 'AP-style practice questions' },
  { dir: 'securityplus', name: 'CompTIA Security+ SY0-801', short: 'Security+', unit: 'Domain', units: 'Domains',
    files: ['content.js', 'questions.js', 'figures.js', 'images.js'], practice: 'Exam-style practice questions' },
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = t => (t.id.replace('.', '-') + '-' + t.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clip = (s, n) => s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…';
const ytId = u => { const m = String(u || '').match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/); return m ? m[1] : ''; };
const ld = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

// Load a course's data files the way the browser does: each one adds to window.
// Files that inject their own <style> are caught by a stub document, and that CSS is kept for the pages.
function load(course) {
  const window = { css: [] };
  const document = { createElement: () => ({}), head: { appendChild: el => window.css.push(el.textContent) } };
  for (const f of course.files) new Function('window', 'document', fs.readFileSync(path.join(ROOT, course.dir, f), 'utf8'))(window, document);
  return window;
}

// Reuse the course page's own stylesheet so lesson pages look like the course.
function styles(course, extra) {
  const html = fs.readFileSync(path.join(ROOT, course.dir, 'index.html'), 'utf8');
  return html.match(/<style>[\s\S]*?<\/style>/)[0].replace('</style>', `
.static-q{border-top:1px solid var(--line);padding-top:16px}
.static-q ol{margin:10px 0;padding-left:0;list-style:none;display:grid;gap:6px}
.static-q h3{font-family:var(--f-body);font-size:18px;font-weight:700;margin-bottom:10px;line-height:1.4}
.static-q li{white-space:pre-line;background:var(--panel-2);border:1px solid var(--line);border-radius:10px;padding:8px 12px}
.static-q details{margin-top:8px}
.static-q summary{cursor:pointer;font-weight:700;color:var(--accent)}
.lesson-list{display:grid;gap:4px;margin:8px 0 0;padding-left:0;list-style:none}
${extra.join('\n')}
</style>`);
}

function page({ course, css, title, desc, url, depth, body, data }) {
  const up = '../'.repeat(depth), lessons = '../'.repeat(depth - 1) || './';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="CyberTeaches">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}yt-banner.jpg">
<meta name="twitter:card" content="summary_large_image">
${data.map(ld).join('\n')}
<link rel="icon" type="image/png" href="${up}../favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap">
${styles(course, css)}
</head><body>
<div class="wrap">
  <header class="topbar">
    <a class="brand" href="${up}">
      <img class="logo" src="${up}../logo.png" alt="" width="36" height="36">
      ${esc(course.short)}
    </a>
    <span class="spacer"></span>
    <nav class="nav" aria-label="Main">
      <a href="${up}">Interactive course</a>
      <a href="${lessons}">All lessons</a>
      <a href="${up}../">All courses</a>
    </nav>
  </header>
  <main>
${body}
  </main>
</div>
</body></html>
`;
}

function breadcrumbs(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) };
}

const sitemap = ['', 'apcybersecurity/', 'apcsp/', 'apcsp/exam/', 'securityplus/', 'networking/', 'networking/exam-1/', 'networking/exam-2/', 'networking/lab-1/', 'networking/lab-2/', 'networking/lab-3/', 'networking/lab-4/', 'networking/syllabus/', 'networking/updates/', 'academy/'];

for (const course of COURSES) {
  const w = load(course);
  const units = w.AP_UNITS;
  const all = units.flatMap(u => u.topics.map(t => Object.assign({ unit: u }, t)));
  const videos = (w.AP_VIDEOS && w.AP_VIDEOS.topics) || {};
  const skills = w.AP_SKILLS || {};
  const courseUrl = SITE + course.dir + '/';
  const indexUrl = courseUrl + 'lessons/';
  const outDir = path.join(ROOT, course.dir, 'lessons');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  all.forEach((t, i) => {
    const u = t.unit, prev = all[i - 1], next = all[i + 1];
    const url = indexUrl + slug(t) + '/';
    const quiz = t.quiz || [];
    const vid = ytId(videos[t.id]);
    const unitLabel = `${course.unit} ${u.num}${course.unit === 'Domain' ? '.0' : ''}: ${u.title}`;
    const title = `${course.short} ${t.id} ${t.title}: Notes, Vocabulary and Practice | CyberTeaches`;
    const desc = clip(`${course.short} ${t.id} ${t.title}. ${t.summary}`, 158);
    const body = `
    <div class="crumbs"><a href="../../">${esc(course.name)}</a> / <a href="../">All lessons</a> / ${esc(unitLabel)}</div>
    <div class="lesson u-scope" style="--u:var(--u${u.num})">
      <article>
        <span class="u-band"><i>${u.num}</i>${esc(unitLabel)}</span><br><span class="label u" style="display:inline-block;margin-top:12px">${esc(course.short)} topic ${t.id}</span><br>
        <h1>${esc(t.title)}</h1>
        ${w.AP_IMAGE ? w.AP_IMAGE(t.id, t.title) : ''}
        <p class="summary">${esc(t.summary)}</p>
        ${w.AP_FIGURE ? w.AP_FIGURE(t.id) : ''}
        ${vid ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="CyberTeaches video: ${esc(t.title)}" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : ''}
        <section class="card" style="margin-top:20px">
          <h2 style="font-size:22px;margin-bottom:12px">${esc(t.title)} vocabulary</h2>
          <ul class="terms">${(t.terms || []).map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join('')}</ul>
        </section>
        ${quiz.length ? `<section class="card quiz">
          <div><h2 style="font-size:22px">${esc(course.practice)}</h2>
          <p class="muted" style="margin:4px 0 0">Try each one, then open the answer. To save your progress, <a href="../../#/topic/${t.id}">take this quiz in the interactive course</a>.</p></div>
          ${quiz.map((q, qi) => `<div class="static-q">
            ${q.s && skills[q.s] ? `<span class="skill">Skill: ${esc(skills[q.s])}</span>` : ''}
            ${q.st ? `<pre class="stim">${esc(q.st)}</pre>` : ''}
            <h3>${qi + 1}. ${esc(q.q)}</h3>
            <ol>${q.a.map((a, k) => `<li><b>(${'ABCD'[k]})</b> ${esc(a)}</li>`).join('')}</ol>
            <details><summary>Show answer</summary><p><b>(${'ABCD'[q.c]}) ${esc(q.a[q.c])}</b>${q.why ? ` ${esc(q.why)}` : ''}</p></details>
          </div>`).join('')}
        </section>` : ''}
        <p style="margin-top:20px"><a class="btn primary" href="../../#/topic/${t.id}">Open ${t.id} in the interactive course</a></p>
        <nav class="pager">
          ${prev ? `<a class="btn" href="../${slug(prev)}/">← ${prev.id} ${esc(prev.title)}</a>` : '<span></span>'}
          ${next ? `<a class="btn" href="../${slug(next)}/">${next.id} ${esc(next.title)} →</a>` : '<a class="btn" href="../">All lessons</a>'}
        </nav>
      </article>
      <aside class="side">
        <div class="card unitbox"><span class="label">${esc(course.unit)} ${u.num}</span><h3 style="margin:6px 0 10px">${esc(u.title)}</h3>
          <ul class="lesson-list">${u.topics.map(x => `<li><a href="../${slug(x)}/" style="text-decoration:none;color:var(--ink);${x.id === t.id ? 'font-weight:700' : ''}">${x.id} ${esc(x.title)}</a></li>`).join('')}</ul>
        </div>
      </aside>
    </div>`;
    const data = [
      { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${course.short} ${t.id} ${t.title}`,
        description: t.summary, url, inLanguage: 'en', isAccessibleForFree: true, learningResourceType: 'Lesson',
        teaches: t.title, keywords: (t.terms || []).map(x => x[0]).join(', '),
        isPartOf: { '@type': 'Course', name: course.name, url: courseUrl },
        provider: { '@type': 'Organization', name: 'CyberTeaches', url: SITE } },
      breadcrumbs([['CyberTeaches', SITE], [course.name, courseUrl], ['Lessons', indexUrl], [`${t.id} ${t.title}`, url]]),
    ];
    const dir = path.join(outDir, slug(t));
    fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir, 'index.html'), page({ course, css: w.css, title, desc, url, depth: 2, body, data }));
    sitemap.push(course.dir + '/lessons/' + slug(t) + '/');
  });

  const qCount = all.reduce((n, t) => n + (t.quiz || []).length, 0);
  const title = `${course.name} Lessons and Practice Questions | CyberTeaches`;
  const desc = `All ${all.length} free ${course.short} lessons with notes, vocabulary, and ${qCount} ${course.practice.toLowerCase()} with answers, organized by ${course.units.toLowerCase()}.`;
  const body = `
    <section style="margin:12px 0 24px">
      <span class="label">CyberTeaches · Free online course</span>
      <h1 style="margin-top:8px">${esc(course.name)} lessons</h1>
      <p class="muted" style="max-width:62ch">${esc(desc)} Want to track progress? Use the <a href="../">interactive course</a>.</p>
    </section>
    <div class="units">
      ${units.map(u => `<section class="card unit" style="--u:var(--u${u.num})">
        <div class="unit-num" style="background:var(--u)">${u.num}</div>
        <div>
          <h2>${course.unit} ${u.num}: ${esc(u.title)}</h2>
          <p class="blurb">${esc(u.blurb)}</p>
          <ul class="lesson-list">${u.topics.map(t => `<li><a href="${slug(t)}/">${t.id} ${esc(t.title)}</a></li>`).join('')}</ul>
        </div>
      </section>`).join('\n      ')}
    </div>`;
  const data = [breadcrumbs([['CyberTeaches', SITE], [course.name, courseUrl], ['Lessons', indexUrl]])];
  fs.writeFileSync(path.join(outDir, 'index.html'), page({ course, css: w.css, title, desc, url: indexUrl, depth: 1, body, data }));
  sitemap.splice(sitemap.indexOf(course.dir + '/') + 1, 0, course.dir + '/lessons/');
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(p => `  <url><loc>${SITE}${p}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`);
console.log(`Wrote ${sitemap.length} sitemap URLs.`);
