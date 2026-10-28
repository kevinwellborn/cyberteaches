// Optional Google sign-in and cloud progress (Firebase).
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
      Cloud.db = db;
      auth.onAuthStateChanged(async u => {
        Cloud.user = u; Cloud.profile = null;
        if(u){
          try { const snap = await db.collection('users').doc(u.uid).get(); Cloud.profile = snap.exists ? snap.data() : {} }
          catch(e){ console.error(e); Cloud.profile = {} }
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

  const who = () => ({
    name: Cloud.user.displayName || Cloud.user.email || 'Student',
    email: Cloud.user.email || '',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Saves to the student's own record, and copies stars to their class roster for the teacher.
  Cloud.save = async ({progress, bonus, programs}) => {
    if(!Cloud.user) return;
    const base = who();
    await db.collection('users').doc(Cloud.user.uid).set({...base, progress, bonus, programs}, {merge: true});
    const code = Cloud.profile && Cloud.profile.classCode;
    if(code) await db.collection('classes').doc(code).collection('students').doc(Cloud.user.uid).set({...base, progress, bonus}, {merge: true});
    Cloud.profile = {...Cloud.profile, progress, bonus, programs};
  };

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
    .onSnapshot(s => cb(s.docs.map(d => ({code: d.id, ...d.data()}))), e => { console.error(e); cb([], e) });
  Cloud.watchRoster = (code, cb) => db.collection('classes').doc(code).collection('students')
    .onSnapshot(s => cb(s.docs.map(d => ({uid: d.id, ...d.data()}))), e => { console.error(e); cb([], e) });
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
