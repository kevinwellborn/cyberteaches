// Terminal missions: one pretend command-line investigation per unit.
// Every mission runs in the same engine (see runMission in index.html), which already
// provides help, ls, cd, cat, pwd, whoami, grep, hint, clear and report.
// files: path -> text (folders are worked out from the paths).
// reads: path -> step key, marked when the student opens that file (cat or grep).
// commands(api): extra commands; api has mark(step), resolve(path), readFile(path).
// report(arg, api): returns { ok, text } for "report <arg>".
window.AP_MISSIONS = [
  {
    key: 'term1', unit: 1, topic: '1.1', title: 'Phishing Investigation',
    blurb: 'Dig through a teacher\'s inbox and trace a fake login email to its source.',
    intro: 'You work on the Lincoln High help desk. A teacher, Ms. Rivera, thinks one of her emails is a scam. Her inbox is copied into your <b class="mono">inbox</b> folder. Find the phishing email and report the fake website it points to.',
    user: 'helpdesk', home: '/home/helpdesk',
    files: {
      '/home/helpdesk/mission.txt': 'MISSION BRIEFING\n\nMs. Rivera got several emails this morning. One asked her to "verify\nher account". Find it, figure out where its link really goes, and\ncheck who owns that website.\nWhen you know the fake domain, run:  report <domain>',
      '/home/helpdesk/inbox/1-classroom.eml': 'From: Google Classroom <no-reply@classroom.google.com>\nTo: rivera@lincoln.edu\nSubject: New submission: Lab 3\n\nJordan K. turned in "Lab 3 Firewall Rules".\nOpen: https://classroom.google.com/c/MTIz',
      '/home/helpdesk/inbox/2-principal.eml': 'From: Principal Johnson <johnson@lincoln.edu>\nTo: all-staff@lincoln.edu\nSubject: Staff meeting moved\n\nThe Thursday staff meeting is moved to room 204.',
      '/home/helpdesk/inbox/3-it-alert.eml': 'From: Lincoln IT Help Desk <helpdesk@lincoln.edu>\nReply-To: support@lincoln-edu-help.com\nTo: rivera@lincoln.edu\nSubject: URGENT: Your account will be locked in 1 hour\n\nWe detected unusual activity. Verify your password within 1 hour\nor your account will be locked.\n\nVerify now: https://lincoln.edu.account-verify.net/login\n\nLincoln IT',
      '/home/helpdesk/inbox/4-library.eml': 'From: Library <library@lincoln.edu>\nTo: rivera@lincoln.edu\nSubject: Books due Friday\n\nReminder: 3 books are due back on Friday.',
      '/home/helpdesk/notes.txt': 'How to read a link:\n  Find the part right before the first single "/" after https://\n  Read it right to left. The real domain is the last two pieces.\n  https://mail.google.com/x      -> google.com\n  https://google.com.evil.io/x   -> evil.io   (!)\nA Reply-To that differs from From is a red flag.'
    },
    reads: { '/home/helpdesk/mission.txt': 'read', '/home/helpdesk/inbox/3-it-alert.eml': 'open' },
    steps: [
      { k: 'read', t: 'Read the mission briefing', hint: 'Try: cat mission.txt' },
      { k: 'list', t: 'List the emails in the inbox', hint: 'Try: ls inbox' },
      { k: 'open', t: 'Open the suspicious email', hint: 'Which subject sounds urgent and scary? Try: cat inbox/<file name>' },
      { k: 'links', t: 'Pull out every link in the inbox', hint: 'Try: grep https inbox' },
      { k: 'whois', t: 'Check who owns the link\'s real domain', hint: 'The real domain is the last two pieces before the first "/". Try: whois <domain>' },
      { k: 'report', t: 'Report the fake domain', hint: 'Try: report <domain>' }
    ],
    help: ['whois <domain>    look up who registered a domain'],
    commands: api => ({
      ls: null, // use the built-in ls, but mark the step when the inbox is listed
      whois: a => {
        const d = (a[0] || '').toLowerCase();
        if (!d) return 'whois: which domain? Example: whois google.com';
        const db = {
          'account-verify.net': 'Domain: account-verify.net\nCreated: 2026-10-27 (yesterday)\nRegistrant: REDACTED FOR PRIVACY\nCountry: (hidden)\nNote: brand-new domain with hidden owner. Not owned by Lincoln.',
          'lincoln.edu': 'Domain: lincoln.edu\nCreated: 1998-04-02\nRegistrant: Lincoln Unified School District',
          'google.com': 'Domain: google.com\nCreated: 1997-09-15\nRegistrant: Google LLC',
          'lincoln-edu-help.com': 'Domain: lincoln-edu-help.com\nCreated: 2026-10-27 (yesterday)\nRegistrant: REDACTED FOR PRIVACY\nNote: this is the Reply-To address, so replies go to the attacker.'
        };
        if (d === 'lincoln.edu.account-verify.net') return 'whois works on the real domain only. Read the address right to left: which two pieces are at the end?';
        if (db[d]) { if (d === 'account-verify.net') api.mark('whois'); return db[d]; }
        return `whois: no record for ${d}`;
      }
    }),
    onLs: (dir, api) => { if (dir.endsWith('/inbox')) api.mark('list'); },
    onGrep: (word, target, api) => { if (/^https?/i.test(word) && /inbox/.test(target)) api.mark('links'); },
    report: a => {
      const d = (a || '').toLowerCase();
      if (d === 'account-verify.net' || d === 'lincoln.edu.account-verify.net') return { ok: true, text: 'REPORT ACCEPTED\nFake site: account-verify.net (registered yesterday, hidden owner)\n- Urgent deadline to rush the reader\n- From says lincoln.edu, but Reply-To goes to lincoln-edu-help.com\n- Link starts with "lincoln.edu." to look real, but the domain is account-verify.net\n\nNext steps: block the domain on the school filter, warn staff, and\ncheck whether anyone already entered a password.\n\nFLAG: CTF{read-links-right-to-left}' };
      if (d.endsWith('lincoln.edu') || d.endsWith('google.com')) return { ok: false, text: `${d} is a real, trusted domain. Look at the link in the urgent email again.` };
      return { ok: false, text: `Not quite. Find the link in the urgent email and read its domain right to left.` };
    }
  },
  {
    key: 'term2', unit: 2, topic: '2.4', title: 'Server Room Break-In',
    blurb: 'Compare badge logs, cameras and staff schedules to catch a tailgater.',
    intro: 'Someone got into the Lincoln High server room on Saturday night. You are the facilities security officer. Use the badge logs, camera logs and staff schedule to work out whose badge was used and what went wrong.',
    user: 'security', home: '/home/security',
    files: {
      '/home/security/mission.txt': 'MISSION BRIEFING\n\nOn Monday the server room door was found unlocked and one rack had\nan unknown USB drive plugged in. Find out:\n  1. When the server room was entered\n  2. Whose badge was used, and whether that person was really there\n  3. How many people went in\nWhen you know the badge ID that was misused, run:  report <badge id>',
      '/var/log/badge.log': [
        'Sat 08:02  MAIN-ENTRANCE  badge B-1001  (J. Ortiz, custodian)  GRANTED',
        'Sat 11:47  GYM-DOOR       badge B-2088  (Coach Reyes)          GRANTED',
        'Sat 16:30  MAIN-ENTRANCE  badge B-1001  (J. Ortiz, custodian)  GRANTED',
        'Sat 22:10  SERVER-ROOM    badge B-3317  (M. Lopez, IT staff)   GRANTED',
        'Sat 22:41  SERVER-ROOM    door held open 31 minutes            ALARM',
        'Sun 09:15  MAIN-ENTRANCE  badge B-2088  (Coach Reyes)          GRANTED'
      ].join('\n'),
      '/var/log/camera.log': [
        'Sat 16:31  CAM-02 hallway        1 person (custodian cart)',
        'Sat 22:09  CAM-07 server hall    2 people approaching server room',
        'Sat 22:10  CAM-07 server hall    2 people enter on one badge swipe',
        'Sat 22:52  CAM-07 server hall    2 people leave, door left ajar'
      ].join('\n'),
      '/home/security/staff-schedule.txt': 'IT STAFF SCHEDULE\n  M. Lopez   on vacation Oct 24 - Oct 31 (out of state)\n  T. Garcia  Mon-Fri 7:30 - 4:00\nLost badge reports:\n  Oct 23  M. Lopez reported badge B-3317 missing. NOT YET DEACTIVATED.',
      '/home/security/notes.txt': 'Tailgating = an extra person walking in behind someone who badged.\nAn access control vestibule (two doors) stops it.\nAlways deactivate lost badges right away.'
    },
    reads: { '/home/security/mission.txt': 'read', '/var/log/badge.log': 'badge', '/var/log/camera.log': 'camera', '/home/security/staff-schedule.txt': 'sched' },
    steps: [
      { k: 'read', t: 'Read the mission briefing', hint: 'Try: cat mission.txt' },
      { k: 'badge', t: 'Find the server room entry in the badge log', hint: 'Try: grep SERVER /var/log/badge.log' },
      { k: 'camera', t: 'Check the cameras at that time', hint: 'Try: cat /var/log/camera.log' },
      { k: 'sched', t: 'Check if the badge owner was really there', hint: 'Try: cat staff-schedule.txt' },
      { k: 'report', t: 'Report the misused badge', hint: 'Try: report B-xxxx' }
    ],
    help: [],
    commands: () => ({}),
    report: a => {
      const b = (a || '').toUpperCase();
      if (b === 'B-3317' || b === '3317') return { ok: true, text: 'REPORT ACCEPTED\nMisused badge: B-3317 (M. Lopez)\n- Lopez was on vacation and reported the badge lost on Oct 23\n- The badge was never deactivated\n- Two people entered on one swipe (tailgating) and held the door 31 minutes\n\nFixes: deactivate lost badges the same day, add an access control\nvestibule to the server room, and alert on after-hours entries.\n\nFLAG: CTF{deactivate-lost-badges}' };
      return { ok: false, text: `${b || 'That'} was not used at the server room. Look for the SERVER-ROOM line in the badge log.` };
    }
  },
  {
    key: 'term3', unit: 3, topic: '3.1', title: 'Network Intruder',
    blurb: 'Use a pretend command line to scan a school network and catch an attacker.',
    intro: 'You are the security analyst for Lincoln High School. Something strange is happening on the school network. Use the terminal to find out what.',
    user: 'analyst', home: '/home/analyst',
    files: {
      '/home/analyst/mission.txt': 'MISSION BRIEFING\n\nStudents say the gradebook was slow last night, and a teacher got an\nalert about a new login. Find out:\n  1. What devices are on the network (10.20.0.0/24)\n  2. Which device does not belong\n  3. What it did\nWhen you know the intruder\'s IP address, run:  report <ip>',
      '/home/analyst/notes.txt': 'Useful ports to remember:\n  22   ssh    remote login\n  53   dns    name lookups\n  80   http   web\n  443  https  secure web\n  4444 often used by attack tools for a backdoor connection',
      '/var/log/auth.log': [
        'Oct 27 23:58:02 gradebook sshd: Accepted password for mlopez from 10.20.0.15',
        'Oct 28 02:14:03 gradebook sshd: FAILED password for admin from 10.20.0.66',
        'Oct 28 02:14:04 gradebook sshd: FAILED password for admin from 10.20.0.66',
        'Oct 28 02:14:05 gradebook sshd: FAILED password for admin from 10.20.0.66',
        'Oct 28 02:14:06 gradebook sshd: FAILED password for admin from 10.20.0.66',
        'Oct 28 02:14:07 gradebook sshd: FAILED password for admin from 10.20.0.66',
        'Oct 28 02:14:09 gradebook sshd: Accepted password for admin from 10.20.0.66',
        'Oct 28 02:16:30 gradebook sshd: admin ran: export grades.csv (41,200 rows)',
        'Oct 28 07:45:11 gradebook sshd: FAILED password for tgarcia from 10.20.0.31',
        'Oct 28 07:45:20 gradebook sshd: Accepted password for tgarcia from 10.20.0.31'
      ].join('\n'),
      '/var/log/dhcp.log': 'Oct 27 08:01 lease 10.20.0.15 -> analyst-laptop\nOct 27 08:03 lease 10.20.0.30 -> printer-lib\nOct 28 01:52 lease 10.20.0.66 -> (no hostname given)'
    },
    reads: { '/home/analyst/mission.txt': 'read', '/var/log/auth.log': 'log' },
    steps: [
      { k: 'read', t: 'Read the mission briefing', hint: 'Try: cat mission.txt' },
      { k: 'ip', t: 'Find your own IP address', hint: 'Try: ifconfig' },
      { k: 'scan', t: 'Scan the whole network for devices', hint: 'Try: nmap 10.20.0.0/24' },
      { k: 'host', t: 'Take a closer look at the device that does not belong', hint: 'Which device has no name and an odd port? Try: nmap <its ip>' },
      { k: 'log', t: 'Check the login log for failed logins', hint: 'Try: grep FAILED /var/log/auth.log' },
      { k: 'report', t: 'Report the intruder', hint: 'Try: report <ip address>' }
    ],
    help: ['ifconfig          show your network address', 'ping <ip>         check if a device answers', 'nmap <ip|range>   scan for devices and open ports'],
    commands: api => {
      const HOSTS = {
        '10.20.0.1':  { name: 'gateway.lincoln.local', role: 'Router', ports: [[53, 'dns'], [80, 'http']] },
        '10.20.0.10': { name: 'www.lincoln.local', role: 'School website', ports: [[80, 'http'], [443, 'https']] },
        '10.20.0.12': { name: 'gradebook.lincoln.local', role: 'Gradebook server', ports: [[22, 'ssh'], [443, 'https']] },
        '10.20.0.15': { name: 'analyst-laptop', role: 'Your laptop', ports: [] },
        '10.20.0.30': { name: 'printer-lib.lincoln.local', role: 'Library printer', ports: [[80, 'http'], [9100, 'jetdirect']] },
        '10.20.0.66': { name: '(no name)', role: 'Unknown device', ports: [[22, 'ssh'], [4444, 'unknown']] }
      };
      return {
        ifconfig: () => { api.mark('ip'); return 'eth0: inet 10.20.0.15  netmask 255.255.255.0  network 10.20.0.0/24\n      ether 3c:22:fb:8a:10:15'; },
        ping: a => { if (!a[0]) return 'ping: which address?'; return HOSTS[a[0]] ? `PING ${a[0]}: 4 packets sent, 4 received, 0% loss (time 2ms)` : `PING ${a[0]}: 4 packets sent, 0 received, 100% loss (no device answered)`; },
        nmap: a => {
          const t = a.filter(x => !x.startsWith('-'))[0];
          if (!t) return 'nmap: which address or range? Example: nmap 10.20.0.0/24';
          if (t === '10.20.0.0/24' || t === '10.20.0.*') {
            api.mark('scan');
            return 'Scanning 256 addresses...\n' + Object.entries(HOSTS).map(([ip, h]) => `${ip.padEnd(12)} ${h.name.padEnd(26)} open: ${h.ports.map(p => p[0]).join(', ') || 'none'}`).join('\n') + '\n6 devices found. Tip: nmap <ip> shows one device in detail.';
          }
          const h = HOSTS[t];
          if (!h) return `nmap: ${t}: no device answered`;
          if (t === '10.20.0.66') api.mark('host');
          return `Report for ${t} (${h.name})\nType: ${h.role}\nPORT    STATE  SERVICE\n` + (h.ports.length ? h.ports.map(p => `${String(p[0]).padEnd(7)} open   ${p[1]}`).join('\n') : '(no open ports)') + (t === '10.20.0.66' ? '\nNote: this device joined the network at 01:52 and gave no hostname.' : '');
        }
      };
    },
    report: a => {
      if (a === '10.20.0.66') return { ok: true, text: 'REPORT ACCEPTED\nIntruder: 10.20.0.66\n- Joined the network at 01:52 with no hostname\n- Has port 4444 open (common backdoor)\n- Brute-forced the gradebook admin password, then exported 41,200 rows\n\nNext steps a real team would take: disconnect 10.20.0.66, reset the admin\npassword, turn on MFA, and segment the gradebook from student Wi-Fi.\n\nFLAG: CTF{segment-monitor-respond}' };
      return { ok: false, text: `Report rejected: ${a} looks like a normal school device. Look again for the device with no name and an odd open port.` };
    }
  },
  {
    key: 'term4', unit: 4, topic: '4.4', title: 'Infected Laptop',
    blurb: 'Hunt down malware on a student laptop using processes, connections and file hashes.',
    intro: 'A student\'s laptop has been slow and the fan never stops. You are the school\'s endpoint analyst. Find the malware, prove it with a file hash, and stop it.',
    user: 'analyst', home: '/home/student',
    files: {
      '/home/student/mission.txt': 'MISSION BRIEFING\n\nJordan\'s laptop is slow and shows pop-ups. Find out:\n  1. Which program is using the computer\n  2. Where it is connecting to\n  3. Which downloaded file it came from (check its hash)\nWhen you know the bad process number (PID), stop it with:  kill <pid>\nThen run:  report <file name>',
      '/home/student/Downloads/essay-draft.docx': '(document)',
      '/home/student/Downloads/free_game_installer.exe': '(program)',
      '/home/student/Downloads/chrome_setup.exe': '(program)',
      '/etc/threat-hashes.txt': 'KNOWN MALWARE HASHES (from the district antivirus feed)\n9f2c1a77e0b4  CoinMiner.Trojan   steals CPU to mine cryptocurrency\n41aa09cc5d13  RAT.Backdoor       remote access tool\n7b7e3d0f9a21  Adware.Popper      shows pop-up ads',
      '/home/student/notes.txt': 'A hash is a fingerprint of a file. If two files have the same hash,\nthey are the same file. Antivirus feeds list hashes of known malware.'
    },
    reads: { '/home/student/mission.txt': 'read', '/etc/threat-hashes.txt': 'feed' },
    steps: [
      { k: 'read', t: 'Read the mission briefing', hint: 'Try: cat mission.txt' },
      { k: 'ps', t: 'List running programs and find the one hogging the CPU', hint: 'Try: ps' },
      { k: 'net', t: 'See where that program is connecting', hint: 'Try: netstat' },
      { k: 'hash', t: 'Fingerprint the files in Downloads', hint: 'Try: sha256sum Downloads/free_game_installer.exe (and the others)' },
      { k: 'feed', t: 'Compare against the known malware list', hint: 'Try: cat /etc/threat-hashes.txt' },
      { k: 'kill', t: 'Stop the bad program', hint: 'Use the PID from ps. Try: kill <pid>' },
      { k: 'report', t: 'Report the file it came from', hint: 'Try: report <file name>' }
    ],
    help: ['ps                list running programs', 'netstat           list network connections', 'sha256sum <file>  fingerprint a file', 'kill <pid>        stop a program'],
    commands: api => {
      let killed = false;
      const HASH = { 'essay-draft.docx': 'c03e55b1d2a8', 'free_game_installer.exe': '9f2c1a77e0b4', 'chrome_setup.exe': '5d61e2f08c3b' };
      return {
        ps: () => { api.mark('ps'); return ' PID  CPU%  PROGRAM\n 101   0.4  system\n 233   2.1  chrome\n 340   0.8  docs-editor\n' + (killed ? '' : ' 666  97.3  svch0st-updater   (started from Downloads)\n') + ' 702   0.2  antivirus (disabled)'; },
        netstat: () => { api.mark('net'); return 'PID  PROGRAM            REMOTE ADDRESS          STATE\n233  chrome             142.250.72.14:443       ESTABLISHED\n' + (killed ? '' : '666  svch0st-updater    203.0.113.50:4444       ESTABLISHED\n') + '340  docs-editor        142.250.72.14:443       ESTABLISHED'; },
        sha256sum: a => {
          const f = (a[0] || '').split('/').pop();
          if (!f) return 'sha256sum: which file? Example: sha256sum Downloads/chrome_setup.exe';
          if (!HASH[f]) return `sha256sum: ${a[0]}: No such file`;
          if (f === 'free_game_installer.exe') api.mark('hash');
          return `${HASH[f]}…  ${a[0]}   (shortened)`;
        },
        kill: a => {
          if (a[0] === '666') { killed = true; api.mark('kill'); return 'Stopped process 666 (svch0st-updater). CPU use dropped to 3%.'; }
          if (!a[0]) return 'kill: which PID? Example: kill 233';
          return `Process ${a[0]} is a normal program. Look for the one using almost all the CPU.`;
        }
      };
    },
    report: a => {
      const f = (a || '').split('/').pop().toLowerCase();
      if (f === 'free_game_installer.exe') return { ok: true, text: 'REPORT ACCEPTED\nMalware: free_game_installer.exe = CoinMiner.Trojan (hash 9f2c1a77e0b4)\n- Ran as "svch0st-updater" (a zero, not an o) to look like Windows\n- Used 97% of the CPU and connected to 203.0.113.50 on port 4444\n- Turned off antivirus\n\nNext steps: disconnect the laptop, delete the file, turn antivirus back\non, run a full scan, and teach Jordan to download only from trusted stores.\n\nFLAG: CTF{hashes-dont-lie}' };
      return { ok: false, text: `${a || 'That file'} does not match any known malware hash. Fingerprint each file in Downloads and compare.` };
    }
  },
  {
    key: 'term5', unit: 5, topic: '5.6', title: 'Website Attack',
    blurb: 'Read web server logs and code to find a SQL injection attack and its fix.',
    intro: 'The Lincoln High lunch-order website was hacked overnight. You are the web security analyst. Read the server logs and the login code to find the attack and the bug that allowed it.',
    user: 'webadmin', home: '/home/webadmin',
    files: {
      '/home/webadmin/mission.txt': 'MISSION BRIEFING\n\nThe lunch site shows a message: "hacked lol". Find out:\n  1. How the attacker got in (look at the access log)\n  2. Which line of code was the weakness\n  3. The attacker\'s IP address\nWhen you know the attacker\'s IP address, run:  report <ip>',
      '/var/log/web/access.log': [
        '10.20.4.17   GET  /menu                                   200   2 KB',
        '10.20.4.22   POST /login  user=jchen&pass=********           200   1 KB',
        '198.51.100.23 POST /login user=admin&pass=letmein            401   1 KB',
        "198.51.100.23 POST /login user=admin'--&pass=x               500   1 KB",
        "198.51.100.23 POST /login user=' OR 1=1 --&pass=x            200  48 KB",
        '198.51.100.23 GET  /admin/orders/export                     200 912 KB',
        '198.51.100.23 POST /admin/banner  text=hacked lol           200   1 KB',
        '10.20.4.31   GET  /menu                                   200   2 KB'
      ].join('\n'),
      '/var/www/lunch/login.js': "// login check\nfunction login(user, pass) {\n  // BUG? builds the query by gluing text together\n  const sql = \"SELECT * FROM users WHERE name = '\" + user +\n              \"' AND password = '\" + pass + \"'\";\n  return db.query(sql);\n}",
      '/var/www/lunch/login-fixed.js': "// safer version: parameterized query\nfunction login(user, pass) {\n  return db.query('SELECT * FROM users WHERE name = ? AND password = ?',\n                  [user, pass]);\n}",
      '/home/webadmin/notes.txt': "SQL injection: input like  ' OR 1=1 --  ends the text early, adds a\ncondition that is always true, and comments out the rest of the query.\nFix: parameterized queries, so input is always treated as data."
    },
    reads: { '/home/webadmin/mission.txt': 'read', '/var/www/lunch/login.js': 'code', '/var/www/lunch/login-fixed.js': 'fix' },
    steps: [
      { k: 'read', t: 'Read the mission briefing', hint: 'Try: cat mission.txt' },
      { k: 'logins', t: 'Find all the login attempts in the access log', hint: 'Try: grep login /var/log/web/access.log' },
      { k: 'code', t: 'Read the login code', hint: 'Try: cat /var/www/lunch/login.js' },
      { k: 'fix', t: 'Read the fixed version', hint: 'Try: cat /var/www/lunch/login-fixed.js' },
      { k: 'report', t: 'Report the attacker', hint: 'Which IP sent the strange user names? Try: report <ip>' }
    ],
    help: [],
    commands: () => ({}),
    onGrep: (word, target, api) => { if (/login/i.test(word) && /access\.log/.test(target)) api.mark('logins'); },
    report: a => {
      if (a === '198.51.100.23') return { ok: true, text: "REPORT ACCEPTED\nAttacker: 198.51.100.23\n- Guessed a password, then tested a quote (') which crashed the query (500)\n- Sent  ' OR 1=1 --  which made the WHERE clause always true and logged in\n- Exported every lunch order (912 KB) and changed the site banner\n\nFix: replace the glued-together SQL with a parameterized query,\nreset admin passwords, and restore the site from backup.\n\nFLAG: CTF{never-trust-input}" };
      return { ok: false, text: `${a || 'That IP'} looks like a normal student or teacher. Look for the IP that sent quotes and OR 1=1.` };
    }
  }
];

// Register each mission as a lab and link it from its topic.
(function(){
  window.AP_MISSIONS.forEach(m => {
    window.AP_LABS[m.key] = { title: m.title, blurb: m.blurb, mission: true };
    window.AP_UNITS.forEach(u => u.topics.forEach(t => {
      if (t.id !== m.topic) return;
      t.labs = (t.labs || (t.lab ? [t.lab] : [])).concat(m.key);
    }));
  });
})();
