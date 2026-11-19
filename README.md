# CyberTeaches

Free lessons from Kevin Wellborn, served at https://cyberteaches.com (GitHub Pages, custom domain in `CNAME`).
The home page (`index.html`) is a hub with a card per course, the AP Cybersecurity book, the YouTube channel,
and small ad spots (edit `CT_ADS` in `index.html`).

| Folder | Course |
| --- | --- |
| `apcybersecurity/` | AP Cybersecurity (high school) |
| `apcsp/` | AP Computer Science Principles (high school) |
| `apcsa/` | AP Computer Science A, Java (high school) |
| `networking/` | AP Networking (companion site for the book: labs, practice exams, syllabus, teacher keys) |
| `academy/` | CyberTeaches Academy block coding (grades 6 to 12) |
| `app-builder/` | App Builder: design and build your own app, with a Congressional App Challenge track (grades 6 to 12) |

Old links keep working: `ap-cyber/` and `teacher.html` redirect, and the hub forwards `?class=CODE` join links
and `#puzzle-N` links to `academy/`.

## AP Cybersecurity (high school)

`apcybersecurity/` covers all five units and 24 topics of the College Board course framework. Each topic has a short
paragraph, vocabulary, a video, and AP-style practice questions (`questions.js`). There are six quick labs and a
pretend-terminal mission for each unit (`missions.js`). Lesson text lives in `apcybersecurity/content.js`.

## AP Computer Science A (high school)

`apcsa/` covers all four units and 53 topics of the College Board AP CSA course framework (2025-26 revision): Using Objects
and Methods, Selection and Iteration, Class Creation, and Data Collections. Each topic has a short paragraph, vocabulary and four
original AP-style Java questions (`questions.js`). Seven labs run in the browser (`labs.js`), and some topics have a diagram
(`figures.js`). Lesson text lives in `apcsa/content.js`. The companion book is not published yet: fill in `AP_BOOK` at the
bottom of `content.js` (title, buyUrl, cover) when it is, and add it to the Books section of the home page.

## App Builder (grades 6 to 12)

`app-builder/` is a self-paced project course: students find a problem, design an app, learn programming logic, build,
test, and share a web app. It works for a student alone or for a class. Six modules plus an optional track for entering the
Congressional App Challenge (lessons `C.1` to `C.6` and a plain-words rules page). All lesson text is in
`app-builder/content.js`; the comment at the top of that file explains each field.

- All modules are open. `AB_OPEN` at the bottom of `content.js` lists the open modules; take an id out to show that
  module as "Coming soon", then run `node tools/build-lesson-pages.js`.
- Class activities and box lengths for Modules 2 to 6 and the track are kept in one table, `CLASSWORK`, near the bottom
  of `content.js` (Module 1 has them inside each lesson). A box with `paste: true` allows pasting, for links.
- Lessons can have Try it boxes (`tries`). `mode: 'js'` runs the student's JavaScript in a Web Worker and stops it after
  3 seconds, so an endless loop cannot freeze the page. `mode: 'html'` shows the student's page in a sandboxed frame.
- Fill-in boxes (`fields`) are saved in the browser and collected on the My plan page (`#plan`).
- Main lessons do not depend on the contest. Contest facts go in a lesson's `cac` note or in the track.
- The track is based on the official 2026 rules. When the 2027 rules and dates are published, update `CAC_INFO`,
  `CAC_RULES` and the `C.` lessons.
- Routes are plain names (`#lesson-3-5`, `#challenge`, `#rules`, `#plan`, `#class`, `#teachers`); `#/topic/3.5` also works.
- Classes: App Builder uses the Academy's sign-in, classes and roster (`academy/cloud.js`), with no change to
  `firestore.rules`. Students sign in and join on the My class page (`#class`, or the join link
  `app-builder/?class=CODE`). A signed-in student's writing is saved to `users/{uid}.courses['ctcac-work-v1']`.
  For a student in a class, finished lessons, step counts, first-try quick check scores and writing are also copied to
  `classes/{code}/students/{uid}.appBuilder`, which only that student and the class's teacher can read.
- Class lessons can have a `together` activity (`{ title, time, steps }`), shown as "With your class": partner and
  whole-class steps that a student working alone can do with a friend.
- Lessons are scored automatically by `AB_GRADE` at the bottom of `content.js`, used by both the course page and the
  teacher page. A lesson is worth 10 points: quick check 4 (first try only), steps checked off 2, written work 4.
  A box earns credit when it is long enough: `lines` (lines) or `min` (words) on the field; with neither, any writing counts. The score
  checks that work is complete, not how good it is.
- Locks: a teacher can lock lessons or whole modules for a class on `app-builder/teacher.html`. The list is saved as
  `classes/{code}.abLocked` (lesson ids like `1.3`, module ids like `m1`), next to the Academy's own `locked` field.
  Students in that class see a lock and cannot open those lessons. Students not in a class are never locked out.
- Pasting and dropping text into the fill-in boxes is turned off so answers are typed. Try it code boxes still allow it.
- Pictures are inline SVG in `app-builder/figures.js`. `AB_ART(lessonId, slot)` returns the picture for the `hero`,
  `example` or `together` slot of a lesson. Module 1 lessons have all three. The other lessons have a hero made of
  three icon cards, listed in `SCENES`.
- `app-builder/teacher.html` shows a teacher each class's gradebook (scores by lesson, with everyone's writing for one
  lesson on one page), progress by module, each student's lessons and written work, and a CSV download. It only reads. Classes and student logins are still made on `academy/teacher.html`, which links to it.

## AP Networking (high school)

`networking/` is the companion site for the AP Networking Course Text and Study Guide, at the URLs the book prints
(`/networking/lab-1` to `lab-4`, `exam-1`, `exam-2`, `syllabus`, `teachers`, `updates`). It has two full practice exams
(60 MCQ and 1 FRQ each, timed or by unit, with a score report), four labs with starter files and Word templates, an
editable sample syllabus, and a teacher area with lab keys, exam keys, and printable booklets. The teacher area is
noindex and blocked in `robots.txt`. `apnetworking/` redirects to it. The pages are built from source files kept with the
book project (exam JSON and page fragments), so edit there and copy the built folder in.

## CyberTeaches Academy (grades 6 to 12)

A self-paced, block-based coding course. Students guide a rover through lessons that each unlock one new block:

- Lesson 1: Repeat and collect (10 puzzles)
- Lesson 2: Repeat practice (10 easy puzzles, no new blocks, one repeat at a time)
- Lesson 3: Repeat patterns (10 puzzles, no new blocks: find a pattern and repeat it, including a repeat inside a repeat)
- Lesson 4: Repeat until (10 puzzles)
- Lesson 5: Repeat until practice (10 easy puzzles, no new blocks)
- Lesson 6: Repeat until patterns (10 puzzles, no new blocks: counting repeats and repeat until together)
- Lesson 7: Tank battle (10 puzzles). Puzzle 1 is drive mode: students steer with the arrow keys or on-screen buttons and press
  Space to fire, and each move is recorded as a block. Puzzles 2 to 10 add `fire cannon`, `if tank ahead` and
  `repeat until no tanks left`, ending with a patrol program that clears every tank by itself. Enemy tanks (`^ > v <` in a
  map) fire if the rover stays in front of their cannon for a second move, and shells are limited.
- Lesson 8: Tank practice (10 easy puzzles: turn and fire, no new blocks)
- Lesson 9: Tank patrols (10 puzzles: practice with `if tank ahead` and `repeat until no tanks left`)
- Lesson 10: Tank missions (10 puzzles with limited shells and a block limit, `maxBlocks` in `course.js`). There are too
  many tanks for one block each, so students must use repeat. The limit is the goal plus 4: 3 stars at the goal, 2 stars
  within 2 of it, 1 star for any other program inside the limit.
- Lesson 11: If / else (10 puzzles). The `if … else` block checks path ahead, to the left or right, crystal here, or tank
  ahead (when the puzzle has the cannon). Puzzles go from a snake path to a maze runner with nested if / else.
- Lesson 12: If / else practice (10 easy puzzles, no new blocks)
- Lesson 13: If / else challenges (10 puzzles: longer mazes, right-hand rule, tanks and crystals together)
- Coming soon: Destroy walls

Ranks and leaderboard: students are promoted (Recruit to General, `RANKS` in `course.js`) as their total stars grow.
Signed-in students in a class see a class leaderboard (first name, last initial, stars, puzzles solved), stored in
`classes/{code}/board/{uid}`. The teacher dashboard shows a score out of 100 for each lesson: every puzzle counts
3 stars = 100, 2 stars = 90, 1 star = 80, unsolved = 0, averaged over the lesson.

## Lesson pages for search engines

The courses route topics with `#/topic/1.1`, which Google treats as one page. `tools/build-lesson-pages.js` writes a
plain page for every topic (notes, vocabulary, practice questions with answers) to `<course>/lessons/<topic>/`, a
lessons index per course, and `sitemap.xml`. These files are generated: after editing any `content.js` or
`questions.js`, run `node tools/build-lesson-pages.js` and commit the result.

New puzzles always go at the end of `LEVELS` in `academy/course.js`, even for an earlier lesson, because each puzzle's
saved progress is stored by its position in that list. `ORDER` gives the play order by lesson.

## Run it

Open `index.html` in any modern browser. No build step or server is needed.

## Hosting on GitHub Pages

1. In the repository, go to Settings → Pages.
2. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
3. Set the custom domain to `cyberteaches.com` and turn on Enforce HTTPS once DNS points at GitHub.

## Student sign-in and teacher dashboard (optional)

Students can sign in with their school Google accounts so progress follows them and shows on `academy/teacher.html`.
Until `academy/firebase-config.js` has a config, the site works without sign-in and saves progress in the browser.

1. Create a free Firebase project at https://console.firebase.google.com (Spark plan, no billing).
2. Authentication → Sign-in method → enable Google. Under Settings → Authorized domains, add `cyberteaches.com`, `www.cyberteaches.com` and `kevinwellborn.github.io`.
3. Firestore Database → Create database (production mode). Open the Rules tab, paste `firestore.rules`, and Publish.
4. Project settings → Your apps → add a Web app, then copy its `firebaseConfig` into `academy/firebase-config.js`.

Teachers open `academy/teacher.html`, create a class, and share the class code or join link (for example in Google Classroom).

The dashboard also has an **Answer key** with a 3-star solution for every puzzle. It stays hidden until the teacher presses
Show answers, and `academy/answer-key.js` is only loaded after a teacher signs in. The data is encoded so it is not readable at a
glance, but it is not truly secret: a student who signs in on the teacher page or decodes the file could read it. When you add or
change puzzles, update the answer key too (decode and re-encode instructions are at the top of `academy/answer-key.js`).

### Teacher accounts

Teachers sign in on `academy/teacher.html` with Google, or create an account with their email and a password
(uses the same Email/Password provider as student logins). "Forgot password?" emails them a reset link from Firebase.

### Student logins (no email or Google account)

Teachers can also make a username and password for each student on `academy/teacher.html` (Student logins: type one name per line,
then print login cards). Students choose Sign in, then Student login, and type the class code, username and password.

1. Firebase console → Authentication → Sign-in method → Add new provider → Email/Password → Enable (leave "Email link" off).
2. Publish the updated `firestore.rules` (it adds the teacher-only `logins` list).

Each login is a Firebase email/password account with a made-up address (`username.classcode@students.cyberteaches.com`) that never
receives mail, so a forgotten password is reset by the teacher with "New password".
