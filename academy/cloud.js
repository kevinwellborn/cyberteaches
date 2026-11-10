// Optional sign-in (Google, or a student login made by the teacher) and cloud progress (Firebase).
// Does nothing until firebase-config.js provides a config, so the site still works offline.
(function(){
  const cfg = window.FIREBASE_CONFIG;
  const listeners = [];
  const Cloud = window.Cloud = {
    enabled: !!cfg, ready: false, user: null, profile: null, error: null,
    onChange(fn){ listeners.push(fn); fn(Cloud) }
  };
  if(!cfg) return;

  const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s) });
  const emit = () => listeners.forEach(fn => { try { fn(Cloud) } catch(e){ console.error(e) } });
  let auth, db;

  load(SDK + 'firebase-app-compat.js')
    .then(() => Promise.all([load(SDK + 'firebase-auth-compat.js'), load(SDK + 'firebase-firestore-compat.js')]))
    .then(() => {
      firebase.initializeApp(cfg);
      auth = firebase.auth(); db = firebase.firestore();
      // School web filters (e.g. Cisco Umbrella) can hold back Firestore's streaming connection, so logins hang,
      // the class can't be read (students get asked to join again) and live lock changes never arrive.
      // Plain long polling gets through those filters.
      db.settings({experimentalForceLongPolling: true, experimentalAutoDetectLongPolling: false, merge: true});
      Cloud.db = db;
      auth.onAuthStateChanged(async u => {
        Cloud.user = u; Cloud.profile = null;
        if(u){
          // Retry a slow or dropped network before treating the student as not in a class.
          for(let i = 0; i < 3 && !Cloud.profile; i++){
            try { const snap = await db.collection('users').doc(u.uid).get(); Cloud.profile = snap.exists ? snap.data() : {} }
            catch(e){ console.error(e); if(i < 2) await new Promise(r => setTimeout(r, 1500 * (i + 1))) }
          }
          if(!Cloud.profile) Cloud.profile = {};
        }
        Cloud.ready = true; emit();
      });
    })
    .catch(e => { console.error('Sign-in is unavailable', e); Cloud.enabled = false; Cloud.ready = true; emit() });

  Cloud.signIn = async () => {
    const p = new firebase.auth.GoogleAuthProvider();
    p.setCustomParameters({prompt: 'select_account'});
    try { await auth.signInWithPopup(p) }
    catch(e){
      if(e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') return auth.signInWithRedirect(p);
      if(e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') return;
      throw e;
    }
  };
  Cloud.signOut = () => auth.signOut();

  // Student logins: teachers make a username and password for each student, so no email or Google account is needed.
  // Behind the scenes each login is a Firebase email/password account with a made-up address that never receives mail.
  const STUDENT_DOMAIN = '@students.cyberteaches.com';
  const loginEmail = (code, username) => (username + '.' + code + STUDENT_DOMAIN).toLowerCase();
  Cloud.isStudentLogin = u => !!(u && u.email && u.email.endsWith(STUDENT_DOMAIN));
  Cloud.signInStudent = (code, username, password) =>
    auth.signInWithEmailAndPassword(loginEmail(code, username.trim()), password);

  // Teacher accounts with an email and password, for teachers who don't use Google.
  Cloud.signInTeacher = (email, password) => auth.signInWithEmailAndPassword(email.trim(), password);
  Cloud.createTeacher = async (name, email, password) => {
    const cred = await auth.createUserWithEmailAndPassword(email.trim(), password);
    await cred.user.updateProfile({displayName: name});
    Cloud.user = auth.currentUser; emit();
  };
  Cloud.resetTeacherPassword = email => auth.sendPasswordResetEmail(email.trim());

  // Teacher access: Kevin (the admin) approves each teacher. teachers/{uid} holds the request and its status.
  const ADMIN_EMAIL = 'kevinwellborn714@gmail.com';
  Cloud.isAdmin = u => !!(u && u.email && u.email.toLowerCase() === ADMIN_EMAIL);
  Cloud.watchTeacherStatus = cb => db.collection('teachers').doc(Cloud.user.uid)
    .onSnapshot(s => cb(s.exists ? s.data() : null), e => { console.error(e); cb(null, e) });
  Cloud.requestTeacher = (name, school) => db.collection('teachers').doc(Cloud.user.uid).set({
    name: String(name).trim().slice(0, 60), school: String(school).trim().slice(0, 80), email: Cloud.user.email || '',
    status: 'pending', requestedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  Cloud.watchTeachers = cb => db.collection('teachers')
    .onSnapshot(s => cb(s.docs.map(d => ({uid: d.id, ...d.data()}))), e => { console.error(e); cb([], e) });
  Cloud.setTeacherStatus = (uid, status) => db.collection('teachers').doc(uid).update({status, decidedAt: firebase.firestore.FieldValue.serverTimestamp()});
  Cloud.removeTeacher = uid => db.collection('teachers').doc(uid).delete();
  Cloud.getConfig = doc => db.collection('config').doc(doc).get().then(s => s.exists ? s.data() : null);
  Cloud.setConfig = (doc, data) => db.collection('config').doc(doc).set(data, {merge: true});

  const who = () => ({
    name: Cloud.user.displayName || (Cloud.isStudentLogin(Cloud.user) ? 'Student' : Cloud.user.email) || 'Student',
    email: Cloud.isStudentLogin(Cloud.user) ? '' : (Cloud.user.email || ''),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Saves to the student's own record, and copies stars to their class roster for the teacher.
  Cloud.save = async ({progress, bonus, programs}) => {
    if(!Cloud.user) return;
    const base = who();
    await db.collection('users').doc(Cloud.user.uid).set({...base, progress, bonus, programs}, {merge: true});
    const code = Cloud.profile && Cloud.profile.classCode;
    if(code){
      await db.collection('classes').doc(code).collection('students').doc(Cloud.user.uid).set({...base, progress, bonus}, {merge: true});
      await Cloud.saveBoard(code, progress).catch(e => console.error('Could not update the leaderboard', e));
    }
    Cloud.profile = {...Cloud.profile, progress, bonus, programs};
  };

  // Class leaderboard: classmates can read each other's first name, last initial, stars and puzzles solved, nothing else.
  const shortName = n => { const w = String(n || 'Student').trim().split(/\s+/); return (w.length > 1 ? w[0] + ' ' + w[w.length-1][0] + '.' : w[0]).slice(0, 40) };
  Cloud.saveBoard = (code, progress) => {
    const vals = Object.values(progress || {}).map(Number).filter(v => v > 0);
    return db.collection('classes').doc(code).collection('board').doc(Cloud.user.uid).set({
      name: shortName(who().name), stars: vals.reduce((a, b) => a + b, 0), solved: vals.length,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  };
  Cloud.watchBoard = (code, cb) => db.collection('classes').doc(code).collection('board')
    .onSnapshot(s => cb(s.docs.map(d => ({uid: d.id, ...d.data()}))), e => { console.error(e); cb(null, e) });

  Cloud.findClass = async code => {
    const s = await db.collection('classes').doc(code).get();
    return s.exists ? {code, ...s.data()} : null;
  };
  Cloud.joinClass = async (cls, data) => {
    await db.collection('users').doc(Cloud.user.uid).set({classCode: cls.code, className: cls.name || cls.code}, {merge: true});
    Cloud.profile = {...Cloud.profile, classCode: cls.code, className: cls.name || cls.code};
    await Cloud.save(data);
    emit();
  };

  // Teacher helpers
  Cloud.watchClasses = cb => db.collection('classes').where('teacherUid', '==', Cloud.user.uid)
    .onSnapshot(s => cb(s.docs.map(d => ({code: d.id, ...d.data(), pending: d.metadata.hasPendingWrites}))), e => { console.error(e); cb([], e) });
  Cloud.watchRoster = (code, cb) => db.collection('classes').doc(code).collection('students')
    .onSnapshot(s => cb(s.docs.map(d => ({uid: d.id, ...d.data()}))), e => { console.error(e); cb([], e) });
  // A second Firebase app signs in as a student to set up or change their account,
  // so the teacher stays signed in on the main one.
  let side = null;
  const sideApp = () => {
    if(!side){
      const app = firebase.initializeApp(cfg, 'student-setup');
      side = {auth: app.auth(), db: app.firestore()}; side.db.settings({experimentalForceLongPolling: true, experimentalAutoDetectLongPolling: false, merge: true});
      side.ready = side.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
    return side.ready.then(() => side);
  };
  const asStudent = async (email, password, fn, create) => {
    const s = await sideApp();
    const cred = create ? await s.auth.createUserWithEmailAndPassword(email, password) : await s.auth.signInWithEmailAndPassword(email, password);
    try { return await fn(cred.user, s.db) } finally { await s.auth.signOut() }
  };
  Cloud.watchLogins = (code, cb) => db.collection('classes').doc(code).collection('logins')
    .onSnapshot(s => cb(s.docs.map(d => ({uid: d.id, ...d.data()}))), e => { console.error(e); cb([], e) });
  Cloud.createStudentLogin = async (cls, {name, username, password}) => {
    const uid = await asStudent(loginEmail(cls.code, username), password, async (u, sdb) => {
      await u.updateProfile({displayName: name});
      const at = firebase.firestore.FieldValue.serverTimestamp();
      await sdb.collection('users').doc(u.uid).set({name, email: '', username, classCode: cls.code, className: cls.name || cls.code, updatedAt: at});
      await sdb.collection('classes').doc(cls.code).collection('students').doc(u.uid).set({name, email: '', username, progress: {}, bonus: {}, updatedAt: at});
      return u.uid;
    }, true);
    await db.collection('classes').doc(cls.code).collection('logins').doc(uid).set({
      name, username, password, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return uid;
  };
  Cloud.resetStudentPassword = async (code, login, password) => {
    await asStudent(loginEmail(code, login.username), login.password, u => u.updatePassword(password));
    await db.collection('classes').doc(code).collection('logins').doc(login.uid).update({password});
  };
  Cloud.removeStudentLogin = async (code, login) => {
    await asStudent(loginEmail(code, login.username), login.password, async (u, sdb) => {
      await sdb.collection('users').doc(u.uid).delete();
      await u.delete();
    });
    await db.collection('classes').doc(code).collection('students').doc(login.uid).delete();
    await db.collection('classes').doc(code).collection('board').doc(login.uid).delete().catch(() => {});
    await db.collection('classes').doc(code).collection('logins').doc(login.uid).delete();
  };

  Cloud.archiveClass = (code, archived) => db.collection('classes').doc(code).update({archived: !!archived});
  // Deletes a class for good: its student logins (and their accounts), roster, leaderboard, then the class itself.
  Cloud.deleteClass = async (code, onStep) => {
    const ref = db.collection('classes').doc(code);
    const logins = await ref.collection('logins').get();
    let i = 0;
    for(const d of logins.docs){
      if(onStep) onStep(`Removing student login ${++i} of ${logins.size}…`);
      try { await Cloud.removeStudentLogin(code, {uid: d.id, ...d.data()}) }
      catch(e){ console.error(e); await d.ref.delete() }
    }
    if(onStep) onStep('Removing the roster…');
    for(const sub of ['students', 'board']){
      const s = await ref.collection(sub).get();
      await Promise.all(s.docs.map(d => d.ref.delete()));
    }
    await ref.delete();
  };

  Cloud.createClass = async name => {
    const ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    for(let attempt = 0; attempt < 3; attempt++){
      let code = ''; for(let i = 0; i < 6; i++) code += ABC[Math.floor(Math.random() * ABC.length)];
      try {
        await db.collection('classes').doc(code).set({
          name, teacherUid: Cloud.user.uid, teacherName: Cloud.user.displayName || '',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return code;
      } catch(e){ if(e.code !== 'permission-denied' || attempt === 2) throw e }  // code taken: try another
    }
  };
})();
