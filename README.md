# CyberTeaches

Free lessons from Kevin Wellborn, served at https://cyberteaches.com (GitHub Pages, custom domain in `CNAME`).
The home page (`index.html`) is a hub with a card per course, the AP Cybersecurity book, the YouTube channel,
and small ad spots (edit `CT_ADS` in `index.html`).

| Folder | Course |
| --- | --- |
| `apcybersecurity/` | AP Cybersecurity (high school) |
| `apcsp/` | AP Computer Science Principles (high school) |
| `networking/` | AP Networking (companion site for the book: labs, practice exams, syllabus, teacher keys) |
| `academy/` | CyberTeaches Academy block coding (grades 6 to 8) |

Old links keep working: `ap-cyber/` and `teacher.html` redirect, and the hub forwards `?class=CODE` join links
and `#puzzle-N` links to `academy/`.

## AP Cybersecurity (high school)

`apcybersecurity/` covers all five units and 24 topics of the College Board course framework. Each topic has a short
paragraph, vocabulary, a video, and AP-style practice questions (`questions.js`). There are six quick labs and a
pretend-terminal mission for each unit (`missions.js`). Lesson text lives in `apcybersecurity/content.js`.

## AP Networking (high school)

`networking/` is the companion site for the AP Networking Course Text and Study Guide, at the URLs the book prints
(`/networking/lab-1` to `lab-4`, `exam-1`, `exam-2`, `syllabus`, `teachers`, `updates`). It has two full practice exams
(60 MCQ and 1 FRQ each, timed or by unit, with a score report), four labs with starter files and Word templates, an
editable sample syllabus, and a teacher area with lab keys, exam keys, and printable booklets. The teacher area is
noindex and blocked in `robots.txt`. `apnetworking/` redirects to it. The pages are built from source files kept with the
book project (exam JSON and page fragments), so edit there and copy the built folder in.

## CyberTeaches Academy (grades 6 to 8)

A self-paced, block-based coding course. Students guide a rover through lessons that each unlock one new block:

- Lesson 1: Repeat and collect (10 puzzles)
- Lesson 2: Repeat until (10 puzzles)
- Lesson 3: Tank battle (10 puzzles). Puzzle 1 is drive mode: students steer with the arrow keys or on-screen buttons and press
  Space to fire, and each move is recorded as a block. Puzzles 2 to 10 add `fire cannon`, `if tank ahead` and
  `repeat until no tanks left`, ending with a patrol program that clears every tank by itself. Enemy tanks (`^ > v <` in a
  map) fire if the rover stays in front of their cannon for a second move, and shells are limited.
- Lesson 4: If / else (10 puzzles). The `if … else` block checks path ahead, to the left or right, crystal here, or tank
  ahead (when the puzzle has the cannon). Puzzles go from a snake path to a maze runner with nested if / else.
- Coming soon: Destroy walls

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
