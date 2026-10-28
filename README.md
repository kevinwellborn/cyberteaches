# CyberTeaches

Free lessons from Kevin Wellborn, served at https://cyberteaches.com (GitHub Pages, custom domain in `CNAME`).
The home page (`index.html`) is a hub with a card per course, the AP Cybersecurity book, the YouTube channel,
and small ad spots (edit `CT_ADS` in `index.html`).

| Folder | Course |
| --- | --- |
| `apcybersecurity/` | AP Cybersecurity (high school) |
| `academy/` | CyberTeaches Academy block coding (grades 6 to 8) |

Old links keep working: `ap-cyber/` and `teacher.html` redirect, and the hub forwards `?class=CODE` join links
and `#puzzle-N` links to `academy/`.

## AP Cybersecurity (high school)

`apcybersecurity/` covers all five units and 24 topics of the College Board course framework. Each topic has a short
paragraph, vocabulary, a video, and AP-style practice questions (`questions.js`). There are six quick labs and a
pretend-terminal mission for each unit (`missions.js`). Lesson text lives in `apcybersecurity/content.js`.

## CyberTeaches Academy (grades 6 to 8)

A self-paced, block-based coding course. Students guide a rover through lessons that each unlock one new block:

- Lesson 1: Repeat and collect (6 puzzles)
- Lesson 2: Repeat until (5 puzzles)
- Coming soon: If, If / else, Destroy walls

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
