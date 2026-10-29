// Shared sign-in for the course pages (AP Cybersecurity, AP CSP, Security+).
// Uses the same Firebase project and Google sign-in as the Academy (academy/cloud.js).
// Progress for each course is stored in the student's own record: users/{uid}.courses[<storage key>].
// Until academy/firebase-config.js has a config, this does nothing and progress stays in the browser.
(function () {
  const Account = window.Account = {
    // attach(key, getProgress, onRemote): call once per page. onRemote(merged) runs after sign-in.
    attach(key, get, onRemote) { this.key = key; this.get = get; this.onRemote = onRemote; },
    push() {}
  };
  const Cloud = window.Cloud;
  if (!Cloud || !Cloud.enabled) return;

  const css = `.acct{display:flex;align-items:center;gap:8px;margin-left:8px;font-size:14px}
  .acct button{border:2px solid var(--line);background:var(--panel);color:var(--ink);border-radius:10px;padding:6px 12px;font:inherit;font-weight:700;cursor:pointer}
  .acct button.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
  .acct .who{color:var(--muted);max-width:16ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .acct-note{margin:8px 0 0;padding:8px 14px;border-radius:10px;background:var(--accent-soft);font-size:14px}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const box = document.createElement('div'); box.className = 'acct';
  const bar = document.querySelector('.topbar'); if (bar) bar.appendChild(box);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let timer = null, lastUid = null;
  // Keep each topic's best result from both copies, so nothing a student finished is lost.
  const merge = (a, b) => { const out = { ...(a || {}) }; for (const [k, v] of Object.entries(b || {})) if (v && v.passed && !(out[k] && out[k].passed)) out[k] = v; return out; };
  const write = () => {
    if (!Cloud.user || !Account.key) return;
    const data = Account.get();
    Cloud.db.collection('users').doc(Cloud.user.uid).set({
      name: Cloud.user.displayName || Cloud.user.email || 'Student',
      email: Cloud.user.email || '',
      courses: { [Account.key]: data },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(e => console.error('Could not save progress', e));
  };
  Account.push = () => { clearTimeout(timer); timer = setTimeout(write, 600); };

  function render() {
    if (!Cloud.ready) { box.innerHTML = ''; return; }
    if (Cloud.user) {
      box.innerHTML = `<span class="who" title="${esc(Cloud.user.email || '')}">${esc(Cloud.user.displayName || Cloud.user.email || 'Signed in')}</span><button type="button" id="acctOut">Sign out</button>`;
      box.querySelector('#acctOut').onclick = () => Cloud.signOut();
    } else {
      box.innerHTML = `<button type="button" class="primary" id="acctIn">Sign in to save progress</button>`;
      box.querySelector('#acctIn').onclick = () => Cloud.signIn().catch(e => { console.error(e); alertBox('Sign-in did not work. If you use a school account, your school may block it; try again or ask your teacher.'); });
    }
  }
  function alertBox(msg) {
    let n = document.querySelector('.acct-note');
    if (!n) { n = document.createElement('p'); n.className = 'acct-note'; n.setAttribute('role', 'status'); bar.insertAdjacentElement('afterend', n); }
    n.textContent = msg;
  }

  Cloud.onChange(() => {
    render();
    const uid = Cloud.user ? Cloud.user.uid : null;
    if (uid === lastUid) return;
    const wasSignedIn = !!lastUid;
    lastUid = uid;
    // Signing out clears this browser's copy, so the next person on a shared computer starts fresh.
    if (!uid) { if (wasSignedIn && Account.onRemote) Account.onRemote({}); return; }
    if (!Account.key) return;
    const remote = Cloud.profile && Cloud.profile.courses && Cloud.profile.courses[Account.key];
    const merged = merge(Account.get(), remote);
    if (Account.onRemote) Account.onRemote(merged);
    write();
  });
})();
