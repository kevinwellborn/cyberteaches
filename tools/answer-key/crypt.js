// Encrypts or decrypts the teacher answer key. The plain key (answer-key.json, git-ignored) is encrypted with a secret
// into academy/answer-key.js, which the site serves. The same secret is stored in Firestore (config/answerKey.secret),
// where only approved teachers can read it, and the Teacher Dashboard decrypts the key in the browser.
//   ANSWER_KEY_SECRET=... node tools/answer-key/crypt.js encrypt   (answer-key.json -> academy/answer-key.js)
//   ANSWER_KEY_SECRET=... node tools/answer-key/crypt.js decrypt   (academy/answer-key.js -> answer-key.json)
// The secret is also read from tools/answer-key/.secret (git-ignored) when the variable is not set.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '../..');
const PLAIN = path.join(__dirname, 'answer-key.json'), SITE = path.join(ROOT, 'academy/answer-key.js');
const secret = process.env.ANSWER_KEY_SECRET || (fs.existsSync(path.join(__dirname, '.secret')) ? fs.readFileSync(path.join(__dirname, '.secret'), 'utf8').trim() : '');
if (!secret) { console.error('Set ANSWER_KEY_SECRET or write tools/answer-key/.secret'); process.exit(1) }
const keyFor = salt => crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha256');
function encrypt(text) {
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', keyFor(salt), iv);
  const data = Buffer.concat([c.update(text, 'utf8'), c.final(), c.getAuthTag()]);
  return { salt: salt.toString('base64'), iv: iv.toString('base64'), data: data.toString('base64') };
}
function decrypt(enc) {
  const salt = Buffer.from(enc.salt, 'base64'), iv = Buffer.from(enc.iv, 'base64'), buf = Buffer.from(enc.data, 'base64');
  const d = crypto.createDecipheriv('aes-256-gcm', keyFor(salt), iv); d.setAuthTag(buf.slice(-16));
  return Buffer.concat([d.update(buf.slice(0, -16)), d.final()]).toString('utf8');
}
function readSite() {
  const src = fs.readFileSync(SITE, 'utf8'), m = src.match(/window\.ANSWER_KEY_ENC\s*=\s*(\{.*?\});/s);
  if (!m) throw new Error('academy/answer-key.js has no ANSWER_KEY_ENC');
  return JSON.parse(m[1]);
}
module.exports = { load: () => JSON.parse(decrypt(readSite())) };   // used by tools/teacher-resources/build.js
const cmd = require.main === module ? process.argv[2] : null;
if (!cmd) {} else if (cmd === 'encrypt') {
  const key = JSON.parse(fs.readFileSync(PLAIN, 'utf8'));
  fs.writeFileSync(SITE, `// Teacher answer key for the academy puzzles, encrypted (AES-256-GCM). The Teacher Dashboard decrypts it with a secret
// that only approved teachers can read from Firestore. To edit it, see tools/answer-key/crypt.js.
window.ANSWER_KEY_ENC=${JSON.stringify(encrypt(JSON.stringify(key)))};
`);
  console.log('academy/answer-key.js written,', Object.keys(key).length, 'solutions');
} else if (cmd === 'decrypt') {
  fs.writeFileSync(PLAIN, JSON.stringify(JSON.parse(decrypt(readSite())), null, 0) + '\n'); console.log('answer-key.json written');
} else { console.error('usage: crypt.js encrypt|decrypt'); process.exit(1) }
