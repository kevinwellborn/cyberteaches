// Opt-in email list: "Get free AP exam tips, new practice tests and study plans by email".
//
// Put <div data-ct-signup="SOURCE"></div> where the box should go (SOURCE says where the person signed up, for example
// "apcybersecurity-course"), then load this file. Optional: data-ct-heading="..." changes the heading.
// On pages that load academy/cloud.js, signed-in users also see a one-time banner under the top bar.
//
// Rules this file keeps:
// - Nobody is added without ticking the consent box themselves (it starts unchecked) and confirming they are 13 or older.
// - Existing accounts are never added automatically.
// - Never shown on Academy pages (grades 6 to 8), or to Academy users: student logins, anyone in a class, or anyone
//   with Academy puzzle progress.
// Sign-ups go to Firestore emailOptIns/{auto id} with the time, the source, and the exact consent text.
// Only the admin can read them (see firestore.rules). Every email sent later needs an unsubscribe link and a mailing address.
(function () {
  if (/\/academy(\/|$)/.test(location.pathname)) return;

  const ROOT = (document.currentScript && document.currentScript.src || '/signup.js').replace(/signup\.js(\?.*)?$/, '');
  const PRIVACY = ROOT + 'privacy/';
  const DONE_KEY = 'ct-email-optin';          // this browser already signed up
  const BANNER_KEY = 'ct-email-banner-closed'; // the signed-in banner was closed
  const HEADING = 'Get free AP exam tips, new practice tests and study plans by email';
  const CONSENT = 'Yes, email me AP exam tips, new practice tests, study plans, and news about Kevin Wellborn\'s study guides. I can unsubscribe anytime.';
  const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';

  const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });

  const css = `
  .ct-signup{--su-accent:var(--accent,var(--blue,#0F7B78));--su-ink:var(--accent-ink,#fff);--su-line:var(--line,#D5DCD4);--su-panel:var(--panel,var(--card,#fff));--su-muted:var(--muted,var(--mute,#5C6B6B));
    background:var(--su-panel);border:2px solid var(--su-accent);border-radius:16px;padding:20px 22px;margin:28px 0;color:inherit}
  .ct-signup h2{font-size:22px;margin:0 0 6px;padding:0;border:0;line-height:1.2}
  .ct-signup p{margin:0 0 12px;color:var(--su-muted);font-size:15px}
  .ct-signup form{display:grid;gap:10px;max-width:560px}
  .ct-signup .su-row{display:flex;gap:8px;flex-wrap:wrap}
  .ct-signup input[type=email]{flex:1 1 220px;min-width:0;padding:10px 12px;border:2px solid var(--su-line);border-radius:10px;background:transparent;color:inherit;font:inherit}
  .ct-signup input[type=email]:focus{outline:none;border-color:var(--su-accent)}
  .ct-signup button{border:2px solid var(--su-accent);background:var(--su-accent);color:var(--su-ink);border-radius:10px;padding:10px 16px;font:inherit;font-weight:700;cursor:pointer}
  .ct-signup button[disabled]{opacity:.6;cursor:default}
  .ct-signup label{display:flex;gap:8px;align-items:flex-start;font-size:15px;line-height:1.4;cursor:pointer}
  .ct-signup label input{margin-top:3px;flex:none;width:18px;height:18px;accent-color:var(--su-accent)}
  .ct-signup .su-fine{font-size:13px;margin:0}
  .ct-signup .su-msg{font-size:15px;font-weight:700;margin:0}
  .ct-signup .su-msg.bad{color:var(--bad,var(--red,#C8402F))}
  .ct-signup.su-banner{position:relative;margin:4px 0 16px;padding-right:48px}
  .ct-signup .su-close{position:absolute;top:10px;right:10px;background:transparent;border:0;color:var(--su-muted);font-size:22px;line-height:1;padding:4px 8px}
  @media print{.ct-signup{display:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // Firestore: reuse the page's Firebase (cloud.js) if it has one, otherwise load it only when someone submits.
  let dbPromise = null;
  function getDb() {
    if (window.Cloud && window.Cloud.db) return Promise.resolve(window.Cloud.db);
    if (!dbPromise) dbPromise = (window.FIREBASE_CONFIG ? Promise.resolve() : load(ROOT + 'academy/firebase-config.js'))
      .then(() => window.firebase ? null : load(SDK + 'firebase-app-compat.js'))
      .then(() => window.firebase.firestore ? null : load(SDK + 'firebase-firestore-compat.js'))
      .then(() => { if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG); return firebase.firestore(); });
    return dbPromise;
  }

  const Cloud = window.Cloud;
  const signedInUser = () => (Cloud && Cloud.user) || null;
  const isAcademyUser = () => {
    const u = signedInUser(); if (!u) return false;
    const p = Cloud.profile || {};
    return (Cloud.isStudentLogin && Cloud.isStudentLogin(u)) || !!p.classCode || !!p.progress;
  };

  function markProfile(fields) {
    const u = signedInUser(); if (!u || !Cloud.db) return;
    Cloud.db.collection('users').doc(u.uid).set(fields, { merge: true }).catch(e => console.error(e));
    Cloud.profile = Object.assign({}, Cloud.profile, fields);
  }

  function formHTML(heading) {
    const u = signedInUser();
    const email = u && !isAcademyUser() ? (u.email || '') : '';
    return `<h2>${esc(heading)}</h2>
      <p>A few short emails a month, written by Kevin Wellborn. Lessons on this site stay free either way.</p>
      <form novalidate>
        <div class="su-row"><input type="email" name="email" autocomplete="email" placeholder="you@example.com" aria-label="Email address" value="${esc(email)}" required><button type="submit">Sign me up</button></div>
        <label><input type="checkbox" name="consent"> ${esc(CONSENT)}</label>
        <label><input type="checkbox" name="age"> I'm 13 or older.</label>
        <p class="su-msg" role="status" aria-live="polite"></p>
        <p class="su-fine">We only use your email for these messages and never sell it. <a href="${PRIVACY}">Privacy policy</a></p>
      </form>`;
  }
  const thanksHTML = '<p class="su-msg">You\'re on the list. Watch your inbox for AP exam tips. <a href="' + PRIVACY + '">Privacy policy</a></p>';

  function wire(box, source, onDone) {
    const f = box.querySelector('form');
    const msg = f.querySelector('.su-msg');
    const say = (t, bad) => { msg.textContent = t; msg.classList.toggle('bad', !!bad); };
    f.addEventListener('submit', async ev => {
      ev.preventDefault();
      const email = f.email.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return say('Please enter a valid email address.', true);
      if (!f.consent.checked) return say('Tick the "Yes, email me" box to sign up.', true);
      if (!f.age.checked) return say('Sorry, you need to be 13 or older to join the email list. Every lesson on this site is still free for you.', true);
      const btn = f.querySelector('button'); btn.disabled = true; say('Signing you up…');
      try {
        const db = await getDb();
        const u = signedInUser();
        await db.collection('emailOptIns').add({
          email, source, page: location.pathname.slice(0, 200), consent: true, age13: true, consentText: CONSENT,
          uid: u ? u.uid : null, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        ls.set(DONE_KEY, '1');
        markProfile({ emailOptIn: { source, at: firebase.firestore.FieldValue.serverTimestamp() } });
        box.innerHTML = (box.querySelector('h2') ? box.querySelector('h2').outerHTML : '') + thanksHTML;
        document.querySelectorAll('.ct-signup').forEach(b => { if (b !== box) b.remove(); });
        if (onDone) onDone();
      } catch (e) {
        console.error('Email sign-up failed', e);
        btn.disabled = false; say('That didn\'t go through. Please try again in a minute.', true);
      }
    });
  }

  function mountSlots() {
    const hide = ls.get(DONE_KEY) || isAcademyUser();
    document.querySelectorAll('[data-ct-signup]').forEach(slot => {
      if (slot.dataset.ctMounted) return;
      slot.dataset.ctMounted = '1';
      if (hide) { slot.hidden = true; return; }
      slot.className = (slot.className + ' ct-signup').trim();
      slot.innerHTML = formHTML(slot.dataset.ctHeading || HEADING);
      wire(slot, slot.dataset.ctSignup || 'site');
    });
  }

  // One-time banner for signed-in users who haven't signed up or closed it before.
  function maybeBanner() {
    const u = signedInUser();
    const old = document.querySelector('.su-banner');
    const p = (Cloud && Cloud.profile) || {};
    const show = u && Cloud.ready && !isAcademyUser() && !ls.get(DONE_KEY) && !ls.get(BANNER_KEY) && !p.emailOptIn && !p.emailPrompt;
    if (!show) { if (old) old.remove(); return; }
    if (old) return;
    const bar = document.querySelector('.topbar, header.site'); if (!bar) return;
    const box = document.createElement('section');
    box.className = 'ct-signup su-banner';
    box.setAttribute('aria-label', 'Email sign-up');
    box.innerHTML = '<button type="button" class="su-close" aria-label="No thanks, close">×</button>' + formHTML(HEADING);
    bar.insertAdjacentElement('afterend', box);
    box.querySelector('.su-close').onclick = () => { ls.set(BANNER_KEY, '1'); markProfile({ emailPrompt: 'dismissed' }); box.remove(); };
    wire(box, 'signed-in-banner', () => setTimeout(() => box.remove(), 4000));
  }

  function refresh() {
    if (isAcademyUser()) document.querySelectorAll('[data-ct-signup], .su-banner').forEach(el => { if (el.classList.contains('su-banner')) el.remove(); else el.hidden = true; });
    mountSlots();
    maybeBanner();
  }

  window.CTSignup = { mount: refresh };
  // With sign-in on the page, wait until we know who is signed in so Academy users never see the box.
  if (Cloud && Cloud.enabled) Cloud.onChange(() => { if (Cloud.ready) refresh(); });
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh);
  else refresh();
})();
