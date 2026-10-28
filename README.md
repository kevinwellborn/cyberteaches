# CyberTeaches Academy

A self-paced, block-based coding course for middle school students (grades 6 to 8).
Students guide a rover through lessons that each unlock one new block:

- Lesson 1: Repeat and collect (6 puzzles)
- Lesson 2: Repeat until (5 puzzles)
- Coming soon: If, If / else, Destroy walls

## AP Cybersecurity (high school)

`ap-cyber/` is a separate course for AP Cybersecurity students, live at https://kevinwellborn.github.io/cyberteaches/ap-cyber/.
It covers all five units and 24 topics of the College Board course framework. Each topic has a short reading, key terms,
and a check for understanding, and there are six hands-on labs (phishing spotter, real or fake URL, firewall rules,
log detective, password strength, Caesar cipher). Lesson text and questions live in `ap-cyber/content.js`.

## Run it

Open `index.html` in any modern browser. No build step or server is needed.

## Hosting on GitHub Pages

1. Put `index.html` at the root of the repository's `main` branch.
2. In the repository, go to Settings → Pages.
3. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute the site is live at https://kevinwellborn.github.io/cyberteaches/.

## Student sign-in and teacher dashboard (optional)

Students can sign in with their school Google accounts so progress follows them and shows on `teacher.html`.
Until `firebase-config.js` has a config, the site works without sign-in and saves progress in the browser.

1. Create a free Firebase project at https://console.firebase.google.com (Spark plan, no billing).
2. Authentication → Sign-in method → enable Google. Under Settings → Authorized domains, add `kevinwellborn.github.io`.
3. Firestore Database → Create database (production mode). Open the Rules tab, paste `firestore.rules`, and Publish.
4. Project settings → Your apps → add a Web app, then copy its `firebaseConfig` into `firebase-config.js`.

Teachers open `teacher.html`, create a class, and share the class code or join link (for example in Google Classroom).
