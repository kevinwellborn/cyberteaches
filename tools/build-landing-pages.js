// Builds the audience landing pages and the vocabulary hub:
//   /teachers/  /homeschool/  /learn-to-code/  /learn-cybersecurity/  /vocabulary/
// They exist so people find CyberTeaches when they search in their own words
// ("free cybersecurity curriculum for high school", "homeschool coding curriculum", "coding games for students").
// Called by tools/build-lesson-pages.js (run: node tools/build-lesson-pages.js), which passes the lesson list
// so links to lesson pages always match the generated slugs. Edit the copy here, then rerun that script.
const fs = require('fs');
const path = require('path');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

module.exports = function build({ ROOT, SITE, vocabHub, lessonIndex }) {
  // Link to a lesson page by course and topic id, e.g. L('apcybersecurity', '1.1').
  const L = (dir, id, text) => {
    const t = (lessonIndex[dir] || []).find(x => x.id === id);
    if (!t) throw new Error(`No lesson ${dir} ${id}`);
    return `<a href="../${t.href}">${esc(text || t.title)}</a>`;
  };
  const navItems = [['teachers/', 'Teachers'], ['homeschool/', 'Homeschool'], ['learn-to-code/', 'Learn to code'], ['learn-cybersecurity/', 'Cybersecurity'], ['vocabulary/', 'Vocabulary']];

  function layout({ slug, title, desc, h1, eyebrow, lead, ctas, shot, body, faq, crumb }) {
    const url = SITE + slug;
    const data = [
      { '@context': 'https://schema.org', '@type': 'WebPage', name: strip(h1), description: desc, url, inLanguage: 'en',
        isAccessibleForFree: true, isPartOf: { '@type': 'WebSite', name: 'CyberTeaches', url: SITE },
        publisher: { '@type': 'EducationalOrganization', name: 'CyberTeaches', url: SITE, founder: { '@type': 'Person', name: 'Kevin Wellborn' } } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'CyberTeaches', item: SITE },
        { '@type': 'ListItem', position: 2, name: crumb, item: url }] },
    ];
    if (faq) data.push({ '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CyberTeaches">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}${shot ? shot.src : 'img/home/academy-puzzle.png'}">
<meta name="twitter:card" content="summary_large_image">
${data.map(ld).join('\n')}
<link rel="icon" type="image/png" href="../favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="../assets/landing.css">
<script async src="/analytics.js?v=1"></script>
</head><body>
<header class="site"><div class="wrap bar">
  <a class="brand" href="../"><img src="../logo.png" alt="" width="32" height="32">CyberTeaches</a>
  <nav class="nav" aria-label="Main">
    ${navItems.map(([href, name]) => `<a href="../${href}"${href === slug ? ' aria-current="page"' : ''}>${name}</a>`).join('\n    ')}
    <a href="../#courses">All courses</a>
  </nav>
</div></header>
<main>
<section class="hero${shot ? '' : ' solo'}"><div class="wrap">
  <div>
    <span class="eyebrow">${eyebrow}</span>
    <h1>${h1}</h1>
    <p>${lead}</p>
    <div class="ctas">${ctas}</div>
  </div>
  ${shot ? `<a class="shot" href="${shot.href}"><img src="../${shot.src}" alt="${esc(shot.alt)}" width="1200" height="${shot.h}"></a>` : ''}
</div></section>
${body}
${faq ? `<section class="block faq"><div class="wrap">
  <div class="head"><span class="eyebrow">Questions</span><h2>Frequently asked questions</h2></div>
  ${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('\n  ')}
</div></section>` : ''}
</main>
<footer class="site"><div class="wrap">
  <div class="cols">
    <div><a class="brand" href="../"><img src="../logo.png" alt="" width="32" height="32">CyberTeaches</a><p style="margin:14px 0 0;max-width:32ch">Free computer science and cybersecurity courses for grades 6 to 12 from teacher Kevin Wellborn.</p></div>
    <div><h2>Courses</h2><ul><li><a href="../academy/">Rover Coding</a></li><li><a href="../academy/python/">Python Quest</a></li><li><a href="../app-builder/">App Builder</a></li><li><a href="../apcsp/">AP CSP</a></li><li><a href="../apcsa/">AP CSA (Java)</a></li><li><a href="../apcybersecurity/">AP Cybersecurity</a></li><li><a href="../networking/">AP Networking</a></li><li><a href="../securityplus/">Security+</a></li></ul></div>
    <div><h2>Who it's for</h2><ul><li><a href="../teachers/">Teachers</a></li><li><a href="../homeschool/">Homeschool families</a></li><li><a href="../learn-to-code/">Students learning to code</a></li><li><a href="../learn-cybersecurity/">Cybersecurity learners</a></li></ul></div>
    <div><h2>Study</h2><ul><li><a href="../vocabulary/">Vocabulary lists</a></li><li><a href="../apcsp/exam/">AP CSP practice exam</a></li><li><a href="../apcsa/exam/">AP CSA practice exams</a></li><li><a href="../academy/resources/">Teacher resources</a></li><li><a href="https://www.youtube.com/@cyberteaches" target="_blank" rel="noopener">YouTube lessons</a></li></ul></div>
  </div>
  <div class="legal"><span>© CyberTeaches · Kevin Wellborn</span><span>AP® is a trademark of the College Board, which does not endorse this site. CompTIA and Security+ are trademarks of CompTIA.</span></div>
</div></footer>
</body></html>
`;
    fs.mkdirSync(path.join(ROOT, slug), { recursive: true });
    fs.writeFileSync(path.join(ROOT, slug, 'index.html'), html);
  }

  const card = (c, href, tag, h, p, go) => `<a class="card" style="--c:var(${c})" href="${href}"><span class="tag">${tag}</span><h3>${h}</h3><p>${p}</p><span class="go">${go} →</span></a>`;
  const courseCards = {
    rover: card('--c-acad', '../academy/', 'Block coding · 16 lessons · 480 puzzles', 'Rover Coding', 'Snap blocks together to drive a rover: sequences, repeat loops, repeat until, if / else and variables, then code tank battles. Easy, Medium and Hard levels.', 'Start coding'),
    python: card('--c-py', '../academy/python/', 'Text coding · Python', 'Python Quest', 'Write real Python to guide an explorer through a jungle temple. Commands, for loops and more, with hints and friendly error messages.', 'Play Python Quest'),
    app: card('--c-csp', '../app-builder/', 'Project course · 37 lessons', 'App Builder', 'Find a real problem, design an app, learn variables, if / else, loops and lists, and publish it. Includes a Congressional App Challenge track.', 'Build an app'),
    csp: card('--c-csp', '../apcsp/', 'AP course · 35 lessons', 'AP Computer Science Principles', 'All five Big Ideas with pseudocode, labs, AP-style questions and a free full-length practice exam.', 'Start AP CSP'),
    cyber: card('--c-cyber', '../apcybersecurity/', 'AP course · 24 lessons · 11 labs', 'AP Cybersecurity', 'Social engineering, physical security, networks, devices, cryptography and AI in security, unit by unit, with videos.', 'Start AP Cybersecurity'),
    net: card('--c-net', '../networking/', 'AP course · 4 labs · 2 exams', 'AP Networking', 'How devices connect and move data, from Wi-Fi to IP addresses and routing, with two full practice exams.', 'Start AP Networking'),
    sec: card('--c-sec', '../securityplus/', 'Certification · SY0-801 · 27 lessons', 'CompTIA Security+', 'Prepare for the SY0-801 exam domain by domain, with labs and exam-style practice questions.', 'Start Security+'),
  };

  // ---------- Teachers ----------
  layout({
    slug: 'teachers/', crumb: 'For teachers',
    title: 'Free Computer Science and Cybersecurity Curriculum for Teachers (Grades 6-12) | CyberTeaches',
    desc: 'Free CS and cybersecurity curriculum for middle and high school: block coding, Python, AP CSP, AP Cybersecurity and Security+ with lesson plans, slides, a teacher dashboard and student logins.',
    eyebrow: 'For teachers',
    h1: 'Free computer science and cybersecurity curriculum for middle and high school',
    lead: 'Ready-to-teach coding and cybersecurity courses with lesson plans, slides, classwork, auto-graded puzzles and a live Teacher Dashboard. Written by a computer science teacher, free for every classroom.',
    ctas: '<a class="btn primary" href="../academy/teacher.html">Open the Teacher Dashboard</a><a class="btn" href="../academy/resources/">Browse teacher resources</a>',
    shot: { src: 'img/home/teacher-dashboard.png', h: 544, href: '../academy/teacher.html', alt: 'CyberTeaches Teacher Dashboard with a class leaderboard and progress' },
    body: `
<section class="block"><div class="wrap">
  <div class="head"><span class="eyebrow">Courses</span><h2>A course for every class you teach</h2><p>Start middle schoolers with block coding, move to Python and app design, then teach AP Computer Science Principles, AP Cybersecurity, AP Networking or CompTIA Security+.</p></div>
  <div class="grid">${[courseCards.rover, courseCards.python, courseCards.app, courseCards.csp, courseCards.cyber, courseCards.sec].join('')}</div>
</div></section>

<section class="block alt"><div class="wrap split">
  <div>
    <span class="eyebrow">Teacher materials</span>
    <h2 style="font-size:clamp(26px,3.2vw,34px);margin-top:6px">Every coding lesson comes ready to teach</h2>
    <ul class="checks">
      <li><b>Lesson plans</b> with objectives, timing, vocabulary, CSTA computer science standards and WIDA ELL standards.</li>
      <li><b>Slides</b> to project before students start the puzzles.</li>
      <li><b>Printable classwork</b> with an answer key, plus ELL supports: word banks, sentence frames and pictures.</li>
      <li><b>Digital classwork</b> as Word files you can post in Google Classroom.</li>
      <li><b>Three levels</b> (Easy, Medium, Hard) for different grades, ages or experience. Set one per class or per student.</li>
      <li><b>Unit reviews</b> with a study guide and a quiz that reports scores to you.</li>
    </ul>
    <p style="margin-top:22px"><a class="btn" href="../academy/resources/">See the lesson plans and slides</a></p>
  </div>
  <a class="shot" href="../academy/resources/"><img src="../img/landing/teacher-resources.webp" alt="Teacher resources page with a lesson plan, slides and classwork for each lesson" width="1200" height="982" loading="lazy"></a>
</div></section>

<section class="block"><div class="wrap split">
  <a class="shot" href="../academy/quiz/host.html"><img src="../img/landing/quiz-battle.webp" alt="Quiz Battle scoreboard on the projector" width="1200" height="726" loading="lazy"></a>
  <div>
    <span class="eyebrow">Engagement</span>
    <h2 style="font-size:clamp(26px,3.2vw,34px);margin-top:6px">Games your students ask for</h2>
    <ul class="checks">
      <li><b>Quiz Battle:</b> a live quiz game on the projector. Students join with a PIN from any device.</li>
      <li><b>Duels and Flag Race:</b> head-to-head coding races. Fewest blocks wins. You turn them on per class.</li>
      <li><b>Leaderboards and ranks:</b> all-time and daily class leaderboards with army-style rank badges.</li>
    </ul>
  </div>
</div></section>

<section class="block alt"><div class="wrap">
  <div class="head"><span class="eyebrow">Getting started</span><h2>Set up your class in four steps</h2></div>
  <ol class="steps">
    <li><b>Sign in to the Teacher Dashboard</b>Use your Google account or an email and password, and request a free teacher account.</li>
    <li><b>Create a class</b>You get a class code. Students join with it, or you make usernames and passwords for students who do not have email.</li>
    <li><b>Choose a level and unlock lessons</b>Pick Easy, Medium or Hard for the class or for one student, and lock lessons until you are ready.</li>
    <li><b>Watch progress live</b>See stars, scores out of 100 and quiz results for every student and every lesson.</li>
  </ol>
</div></section>

<section class="block"><div class="wrap">
  <div class="head"><span class="eyebrow">Study tools</span><h2>Free AP and certification practice</h2><p>Every AP course has lesson pages with notes, vocabulary and practice questions with answers that students can use on their own.</p></div>
  <div class="chips">
    <a href="../apcsp/exam/">AP CSP full-length practice exam</a>
    <a href="../apcsa/exam/">AP CSA practice exams (Java)</a>
    <a href="../networking/exam-1/">AP Networking practice exams</a>
    <a href="../apcybersecurity/lessons/">AP Cybersecurity lessons</a>
    <a href="../apcsp/lessons/">AP CSP lessons</a>
    <a href="../apcsa/lessons/">AP CSA lessons</a>
    <a href="../securityplus/lessons/">Security+ lessons</a>
    <a href="../vocabulary/">Vocabulary lists for every course</a>
  </div>
</div></section>`,
    faq: [
      ['Is CyberTeaches really free for teachers?', 'Yes. The courses, lesson plans, slides, classwork, Teacher Dashboard and games are free. Optional companion books are sold on Amazon.'],
      ['Which grades is it for?', 'Middle and high school, grades 6 to 12. Rover Coding and Python Quest work for beginners, and the AP courses and Security+ are for high school.'],
      ['Do my students need an email address?', 'No. Students can sign in with Google, or you can create a username and password for each student in the Teacher Dashboard.'],
      ['Does it work on Chromebooks and with Google Classroom?', 'Yes. Everything runs in the web browser, so Chromebooks, laptops and tablets work. Digital classwork comes as Word files you can post in Google Classroom, and you can share course links in any LMS.'],
      ['Are the lessons aligned to standards?', 'The coding lesson plans list CSTA K-12 Computer Science Standards and WIDA English Language Development Standards. The AP courses follow the College Board course units.'],
      ['Can I use it with Clever?', 'Yes, your school can add CyberTeaches as a link in the Clever Portal.'],
    ],
  });

  // ---------- Homeschool ----------
  layout({
    slug: 'homeschool/', crumb: 'Homeschool',
    title: 'Free Homeschool Coding and Cybersecurity Curriculum (Middle and High School) | CyberTeaches',
    desc: 'Free homeschool computer science curriculum: block coding and Python games, app design, AP CSP and AP Cybersecurity. Self-paced, auto-graded, with a parent progress dashboard. No coding experience needed.',
    eyebrow: 'For homeschool families',
    h1: 'Free homeschool coding and cybersecurity curriculum, from first program to AP',
    lead: 'Self-paced computer science for middle and high school. Your student plays, codes and checks their own work, and you can follow every lesson in a free progress dashboard. You do not need to know how to code.',
    ctas: '<a class="btn primary" href="../academy/">Try the first lesson free</a><a class="btn" href="#path">See a suggested path</a>',
    shot: { src: 'img/landing/python-quest.webp', h: 750, href: '../academy/python/', alt: 'Python Quest: a student writes Python to move an explorer through a jungle temple' },
    body: `
<section class="block"><div class="wrap">
  <div class="head"><span class="eyebrow">Why it works at home</span><h2>Built so a parent does not have to be the expert</h2></div>
  <div class="grid">
    <div class="card"><h3>Teaches itself</h3><p>Each lesson explains one idea with pictures and examples, then gives practice. Hints appear when a student is stuck.</p></div>
    <div class="card"><h3>Grades itself</h3><p>Puzzles check the code, quizzes score themselves, and you see stars and scores out of 100 for every lesson.</p></div>
    <div class="card"><h3>Grows with your student</h3><p>Three levels (Easy, Medium, Hard) for different ages or experience. Siblings can work at different levels.</p></div>
  </div>
</div></section>

<section class="block alt" id="path"><div class="wrap">
  <div class="head"><span class="eyebrow">Suggested path</span><h2>A homeschool computer science sequence</h2><p>Start where your student is. Younger or brand-new coders begin with blocks, and high schoolers with some experience can jump to Python, App Builder or an AP course.</p></div>
  <table class="path">
    <thead><tr><th>Step</th><th>Course</th><th>What your student learns</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><a href="../academy/">Rover Coding</a></td><td>Block coding: sequences, loops, if / else and variables, in 16 lessons of puzzles.</td></tr>
      <tr><td>2</td><td><a href="../academy/python/">Python Quest</a></td><td>Typing real Python: commands, loops and more, in an adventure game.</td></tr>
      <tr><td>3</td><td><a href="../app-builder/">App Builder</a></td><td>Designing and building an app for a real problem. Good for a project-based semester.</td></tr>
      <tr><td>4</td><td><a href="../apcsp/">AP Computer Science Principles</a></td><td>A full AP course: data, algorithms, the internet and the impact of computing, with a practice exam.</td></tr>
      <tr><td>5</td><td><a href="../apcsa/">AP Computer Science A</a></td><td>Java programming the AP way: objects, loops, classes, arrays and ArrayLists, with two full practice exams.</td></tr>
      <tr><td>6</td><td><a href="../apcybersecurity/">AP Cybersecurity</a></td><td>How attacks work and how to defend people, networks, devices and data.</td></tr>
      <tr><td>7</td><td><a href="../securityplus/">CompTIA Security+</a></td><td>An industry certification for older students who want an IT or cyber career head start.</td></tr>
    </tbody>
  </table>
</div></section>

<section class="block"><div class="wrap split">
  <div>
    <span class="eyebrow">Parent dashboard</span>
    <h2 style="font-size:clamp(26px,3.2vw,34px);margin-top:6px">See progress without looking over their shoulder</h2>
    <ul class="checks">
      <li>Request a free teacher account and create a class for your family.</li>
      <li>Students join with your class code, or you make a username and password for them.</li>
      <li>See stars, scores and quiz results for every lesson, and unlock lessons when you are ready.</li>
      <li>Print lesson plans, slides and classwork from <a href="../academy/resources/">teacher resources</a> if you like paper too.</li>
    </ul>
    <p style="margin-top:22px"><a class="btn" href="../academy/teacher.html">Open the dashboard</a></p>
  </div>
  <a class="shot" href="../academy/teacher.html"><img src="../img/home/teacher-dashboard.png" alt="Progress dashboard with scores for each lesson" width="1280" height="580" loading="lazy"></a>
</div></section>

<section class="block alt"><div class="wrap">
  <div class="head"><span class="eyebrow">Courses</span><h2>Every course is free</h2></div>
  <div class="grid">${[courseCards.rover, courseCards.python, courseCards.app, courseCards.csp, courseCards.cyber, courseCards.sec].join('')}</div>
</div></section>`,
    faq: [
      ['Is this a complete homeschool computer science curriculum?', 'Yes. Together the courses cover middle school coding through two full AP courses, and each one has lessons, practice, labs or puzzles, and scored checks.'],
      ['Do I need to know how to code to teach it?', 'No. The lessons explain each idea to your student directly, the puzzles and quizzes check the answers, and teacher resources include answer keys.'],
      ['What ages is it for?', 'Middle and high school students, roughly ages 11 to 18. Beginners of any age can start with Rover Coding on the Easy level.'],
      ['Can it count as a high school credit?', 'Many families count a full course, such as AP Computer Science Principles or AP Cybersecurity, as one computer science credit. Check the homeschool rules in your state.'],
      ['Can homeschool students take the AP exam?', 'Yes. Homeschool students can take AP Exams at a school that offers them. Contact a local school\'s AP coordinator early in the school year to arrange it.'],
      ['Does my child need an email address?', 'No. They can sign in with Google, or you can create a username and password for them in the dashboard.'],
    ],
  });

  // ---------- Students: learn to code ----------
  layout({
    slug: 'learn-to-code/', crumb: 'Learn to code',
    title: 'Learn to Code Free: Coding Games for Middle and High School Students | CyberTeaches',
    desc: 'Free coding games for students: block coding puzzles with a rover, Python Quest adventure, app building and AP CSP. Runs in your browser and on Chromebooks. No download needed.',
    eyebrow: 'For students',
    h1: 'Learn to code free with games',
    lead: 'Drive a rover with code blocks, write real Python in a jungle temple, build your own app, and race your classmates. Everything runs in your browser, even on a Chromebook.',
    ctas: '<a class="btn primary" href="../academy/">Start Rover Coding</a><a class="btn" href="../academy/python/">Play Python Quest</a>',
    shot: { src: 'img/home/academy-puzzle.png', h: 459, href: '../academy/', alt: 'A Rover Coding puzzle: drag blocks like move forward and repeat to collect crystals' },
    body: `
<section class="block"><div class="wrap">
  <div class="head"><span class="eyebrow">Pick a game</span><h2>Block coding, Python and real apps</h2></div>
  <div class="grid">${[courseCards.rover, courseCards.python, courseCards.app].join('')}</div>
</div></section>

<section class="block alt"><div class="wrap split">
  <div>
    <span class="eyebrow">What you will learn</span>
    <h2 style="font-size:clamp(26px,3.2vw,34px);margin-top:6px">The big ideas of programming, one level at a time</h2>
    <ul class="checks">
      <li><b>Sequences:</b> computers follow your commands in order.</li>
      <li><b>Loops:</b> <code>repeat</code>, <code>repeat until</code> and Python <code>for</code> loops do the boring parts for you.</li>
      <li><b>Conditionals:</b> <code>if / else</code> lets your program make decisions.</li>
      <li><b>Variables:</b> store a number and change it as your program runs.</li>
      <li><b>Debugging:</b> find the bug, fix it, try again. Fewer blocks earns more stars.</li>
    </ul>
  </div>
  <a class="shot" href="../academy/python/"><img src="../img/landing/python-quest.webp" alt="Python Quest level with Python code on the right" width="1200" height="750" loading="lazy"></a>
</div></section>

<section class="block"><div class="wrap">
  <div class="head"><span class="eyebrow">Play with your class</span><h2>Compete, climb the leaderboard, earn ranks</h2><p>If your teacher turns them on: coding Duels, 4-player Flag Races, Quiz Battle with a game PIN, and daily leaderboards.</p></div>
  <div class="chips"><a href="../academy/quiz/">Join a Quiz Battle</a><a href="../academy/#duel">Duels</a><a href="../apcsp/">AP CSP</a><a href="../apcsp/exam/">AP CSP practice exam</a><a href="../apcsa/">AP CSA (Java)</a><a href="../apcsp/vocabulary/">AP CSP vocabulary</a></div>
</div></section>`,
    faq: [
      ['Is it free?', 'Yes. Every game and course on CyberTeaches is free.'],
      ['Do I need to download anything?', 'No. It runs in a web browser on Chromebooks, Windows, Mac, iPad and phones. Python Quest runs real Python right in the browser.'],
      ['Can I play without an account?', 'You can try the first Rover Coding lesson without signing in. Sign in with Google or with the login your teacher gave you to unlock every lesson and save your stars.'],
      ['I have never coded. Where do I start?', 'Start with Rover Coding on the Easy level. When loops and if / else feel easy, try Python Quest.'],
    ],
  });

  // ---------- Cybersecurity learners ----------
  const topics = [
    ['apcybersecurity', '1.1', 'Social engineering and phishing'], ['apcybersecurity', '1.3', 'Public Wi-Fi safety'],
    ['apcybersecurity', '1.4', 'AI-based attacks'], ['apcybersecurity', '3.4', 'Firewalls'], ['apcybersecurity', '4.2', 'Authentication and MFA'],
    ['apcybersecurity', '5.3', 'Encryption'], ['apcybersecurity', '5.4', 'Public key cryptography'],
    ['securityplus', '1.1', 'CIA triad and security controls'], ['securityplus', '1.3', 'Cryptography and PKI'], ['securityplus', '2.2', 'Threat actors'],
    ['securityplus', '3.1', 'Zero trust and architecture'], ['securityplus', '4.7', 'Incident response'], ['securityplus', '4.8', 'Digital forensics'],
    ['securityplus', '5.2', 'Risk management'], ['securityplus', '5.5', 'Penetration testing'], ['apcsp', '5.6', 'Safe computing'],
  ];
  layout({
    slug: 'learn-cybersecurity/', crumb: 'Learn cybersecurity',
    title: 'Learn Cybersecurity Free: Beginner Course to AP Cybersecurity and Security+ | CyberTeaches',
    desc: 'Free cybersecurity courses for beginners: AP Cybersecurity, AP Networking and CompTIA Security+ SY0-801 with lessons, labs, vocabulary and practice questions. For high school students and career changers.',
    eyebrow: 'For cybersecurity learners',
    h1: 'Learn cybersecurity free, from your first phishing email to Security+',
    lead: 'A clear path for beginners: learn how attacks work and how to stop them in AP Cybersecurity, understand networks in AP Networking, then prepare for the CompTIA Security+ SY0-801 certification.',
    ctas: '<a class="btn primary" href="../apcybersecurity/">Start with AP Cybersecurity</a><a class="btn" href="../securityplus/">Go to Security+</a>',
    body: `
<section class="block"><div class="wrap">
  <div class="head"><span class="eyebrow">The path</span><h2>Three free courses, beginner to certified</h2><p>No experience needed. Each lesson has notes, a video, key vocabulary and practice questions with explanations.</p></div>
  <div class="grid">${[courseCards.cyber, courseCards.net, courseCards.sec].join('')}</div>
</div></section>

<section class="block alt"><div class="wrap">
  <div class="head"><span class="eyebrow">Popular topics</span><h2>Start with a topic</h2><p>Each topic page explains the idea in plain English and ends with practice questions and answers.</p></div>
  <div class="chips">${topics.map(([d, id, text]) => L(d, id, text)).join('')}</div>
</div></section>

<section class="block"><div class="wrap split">
  <div>
    <span class="eyebrow">Hands-on</span>
    <h2 style="font-size:clamp(26px,3.2vw,34px);margin-top:6px">Labs, not just reading</h2>
    <ul class="checks">
      <li><b>11 AP Cybersecurity labs</b> and <b>11 Security+ labs</b> where you investigate logs, spot phishing and choose controls.</li>
      <li><b>4 AP Networking labs</b> built on real troubleshooting stories, plus two full practice exams.</li>
      <li><b>Vocabulary lists</b> for <a href="../apcybersecurity/vocabulary/">AP Cybersecurity</a> and <a href="../securityplus/vocabulary/">Security+</a> to review key terms fast.</li>
      <li><b>Video lessons</b> on the <a href="https://www.youtube.com/@cyberteaches" target="_blank" rel="noopener">CyberTeaches YouTube channel</a>.</li>
    </ul>
  </div>
  <div class="card" style="--c:var(--c-sec)"><span class="tag">Study guide on Amazon</span><h3>CompTIA Security+ SY0-801 Study Guide</h3><p>The companion book by Kevin Wellborn, with 136 figures, realistic scenarios and a 90-question practice exam.</p><a class="go" href="https://www.amazon.com/dp/B0HNDS8HNL" target="_blank" rel="noopener">See the book →</a></div>
</div></section>`,
    faq: [
      ['Can I learn cybersecurity with no experience?', 'Yes. AP Cybersecurity starts from zero with everyday attacks like phishing and weak passwords, and builds up to networks, devices and cryptography.'],
      ['Is the Security+ course up to date?', 'Yes. It follows the CompTIA Security+ SY0-801 exam objectives across all five domains, including the AI and zero trust topics.'],
      ['Is it free?', 'The courses, labs and practice questions are free. The CompTIA Security+ exam itself is paid and booked through CompTIA.'],
      ['Who is it for?', 'High school students, college students, career changers and anyone who wants to understand how to stay safe online or start an IT or cybersecurity career.'],
    ],
  });

  // ---------- Vocabulary hub ----------
  layout({
    slug: 'vocabulary/', crumb: 'Vocabulary',
    title: 'Computer Science and Cybersecurity Vocabulary Lists with Definitions | CyberTeaches',
    desc: `Free vocabulary lists with plain-English definitions: ${vocabHub.map(v => `${v.termCount} ${v.course.short}`).join(', ')} terms. Word walls and study lists for students and teachers.`,
    eyebrow: 'Study lists',
    h1: 'Computer science and cybersecurity vocabulary',
    lead: 'Every key term from every CyberTeaches course, with a short definition and a link to the lesson that teaches it. Use them for word walls, flashcards or test review.',
    ctas: vocabHub.map((v, i) => `<a class="btn${i ? '' : ' primary'}" href="../${v.url}">${esc(v.course.short)}</a>`).join(''),
    body: `
<section class="block"><div class="wrap">
  <div class="grid two">${vocabHub.map(v => `<a class="card" href="../${v.url}"><span class="tag">${v.termCount} terms</span><h3>${esc(v.course.short)} vocabulary</h3><p>${v.sample.map(esc).join(', ')} and more.</p><span class="go">See all ${v.termCount} terms →</span></a>`).join('')}</div>
  <p class="note" style="margin-top:20px">Teaching block coding? Each Rover Coding lesson plan in <a href="../academy/resources/">teacher resources</a> has its own vocabulary list in English and Spanish.</p>
</div></section>`,
  });

  console.log('Wrote 5 landing pages.');
};
