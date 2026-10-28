// AP Cybersecurity course content. Units and topic names follow the College Board
// AP Cybersecurity course at a glance; summaries, terms and questions are original.
// Each question: q (prompt), a (choices), c (index of the correct choice), why (feedback).
window.AP_UNITS = [
  {
    id: 'u1', num: 1, title: 'Introduction to Security', periods: 10, color: '#2F6FDE',
    blurb: 'How attackers trick people, why public Wi-Fi is risky, and how AI is changing both attack and defense.',
    topics: [
      { id: '1.1', title: 'Understanding Social Engineering',
        summary: 'Social engineering attacks target people instead of technology. Attackers use urgency, fear, authority, curiosity, or helpfulness to get someone to click a link, share a password, or hold a door open. The best defense is slowing down and verifying requests through a separate, trusted channel.',
        terms: [['Phishing', 'A message that pretends to come from a trusted source to steal information or install malware.'], ['Pretexting', 'Inventing a believable story (a pretext) to get someone to share information.'], ['Tailgating', 'Following an authorized person through a secure door without badging in.'], ['Spear phishing', 'Phishing aimed at one specific person or group, using details about them.']],
        lab: 'phish',
        quiz: [
          { q: 'An email says "Your account will be deleted in 1 hour unless you log in now." Which social engineering lever is this?', a: ['Authority', 'Urgency', 'Reciprocity', 'Curiosity'], c: 1, why: 'A short deadline pushes you to act before you think. That is urgency.' },
          { q: 'Someone calls claiming to be from IT and asks for your password to "fix your account." What should you do?', a: ['Give it, since IT needs it', 'Give only half of it', 'Hang up and contact IT through a known number', 'Email it instead of saying it'], c: 2, why: 'Verify through a separate trusted channel. Real IT staff never need your password.' }
        ] },
      { id: '1.2', title: 'Suspicious Website Logins',
        summary: 'Fake login pages copy the look of real sites to harvest usernames and passwords. Check the full domain name, not just the logo. Look-alike domains swap letters (rn for m, 0 for o) or add extra words. HTTPS only means the connection is encrypted, not that the site is honest.',
        terms: [['Credential harvesting', 'Collecting usernames and passwords through a fake login page.'], ['Typosquatting', 'Registering a domain that is a common misspelling of a real one.'], ['Domain', 'The name of a site, read right to left from the top-level domain (for example, .com).'], ['HTTPS', 'An encrypted web connection. It protects data in transit but does not prove a site is legitimate.']],
        lab: 'url',
        quiz: [
          { q: 'Which URL most likely belongs to the real PayPal?', a: ['paypal.com.account-verify.net', 'paypa1.com', 'www.paypal.com/signin', 'paypal-security.co'], c: 2, why: 'The real domain is the part just before the top-level domain: paypal.com. The others end in a different domain.' },
          { q: 'A page shows a padlock icon (HTTPS). What does that guarantee?', a: ['The site is safe', 'The site is owned by who it claims', 'Data between you and the site is encrypted', 'The site has no malware'], c: 2, why: 'HTTPS encrypts the connection. Attackers can and do get HTTPS certificates for fake sites.' }
        ] },
      { id: '1.3', title: 'Best Practices for Public Networks',
        summary: 'Public Wi-Fi at cafes, airports, and hotels is shared with strangers. An attacker can run a fake hotspot with a trusted-sounding name (an evil twin) and watch traffic. Use HTTPS sites, a VPN or your phone hotspot, turn off auto-join, and avoid sensitive tasks like banking on open networks.',
        terms: [['Evil twin', 'A rogue Wi-Fi access point that copies the name of a real one.'], ['VPN', 'A virtual private network that encrypts all your traffic to a trusted server.'], ['Eavesdropping', 'Secretly capturing data sent over a network.'], ['Auto-join', 'A device setting that connects to known network names automatically, which evil twins exploit.']],
        quiz: [
          { q: 'Two networks appear at a cafe: "Cafe_WiFi" and "Cafe_WiFi_Free". What is the safest move?', a: ['Pick the one with the stronger signal', 'Ask staff for the exact network name', 'Pick the "Free" one', 'Connect to both'], c: 1, why: 'Confirm the real network name with staff. Either could be an evil twin.' },
          { q: 'What does a VPN do on public Wi-Fi?', a: ['Makes your device immune to malware', 'Encrypts your traffic so others on the network cannot read it', 'Speeds up the connection', 'Hides your screen from people nearby'], c: 1, why: 'A VPN creates an encrypted tunnel, so eavesdroppers on the local network see only scrambled data.' }
        ] },
      { id: '1.4', title: 'AI-Based Cybersecurity Attacks',
        summary: 'Attackers use AI to write convincing phishing messages with no spelling mistakes, clone voices from short audio clips, and create deepfake videos. AI also helps attackers find vulnerabilities and write malware faster. Old warning signs like bad grammar are no longer reliable, so verification habits matter more.',
        terms: [['Deepfake', 'AI-generated audio, image, or video that imitates a real person.'], ['Voice cloning', 'Using AI to copy a person\'s voice from a recording.'], ['Prompt injection', 'Hiding instructions in content so an AI system does something its owner did not intend.'], ['Automation', 'Using software to run attacks at large scale with little human effort.']],
        quiz: [
          { q: 'A parent gets a call in their child\'s voice asking for money urgently. What is the best defense?', a: ['Send the money quickly', 'Hang up and call the child back on their known number', 'Ask the caller to repeat themselves', 'Trust it because the voice matches'], c: 1, why: 'Voice cloning means a familiar voice is not proof. Call back on a number you already know.' },
          { q: 'Why is "look for spelling mistakes" a weaker phishing tip than it used to be?', a: ['Email filters fix spelling', 'AI tools write fluent, error-free messages', 'Phishing is no longer common', 'Spell check is built into browsers'], c: 1, why: 'Generative AI produces polished text, so focus on the request itself and verify it.' }
        ] },
      { id: '1.5', title: 'Leveraging AI in Cyber Defense',
        summary: 'Defenders use AI to spot unusual behavior in huge amounts of log data, filter spam and phishing, and help analysts respond faster. AI can make mistakes: false positives waste time and false negatives let attacks through. Humans still review alerts and make final decisions.',
        terms: [['Anomaly detection', 'Flagging activity that differs from normal patterns.'], ['False positive', 'An alert for something that is actually harmless.'], ['False negative', 'A real attack that the system misses.'], ['Human in the loop', 'Keeping a person responsible for reviewing and approving AI decisions.']],
        quiz: [
          { q: 'An AI tool flags a teacher\'s normal login as an attack. This is a:', a: ['False negative', 'True positive', 'False positive', 'True negative'], c: 2, why: 'The alert fired (positive) but nothing bad happened (false).' },
          { q: 'Which is the most dangerous failure for a defender?', a: ['False positive', 'False negative', 'True negative', 'Too many logs'], c: 1, why: 'A false negative is an attack that goes unnoticed.' }
        ] }
    ]
  },
  {
    id: 'u2', num: 2, title: 'Securing Spaces', periods: 21, color: '#2E9363',
    blurb: 'The core ideas of cybersecurity, then how to attack, protect, and monitor physical spaces like buildings and server rooms.',
    topics: [
      { id: '2.1', title: 'Cyber Foundations',
        summary: 'Security protects three things, the CIA triad: confidentiality (only the right people see data), integrity (data is not changed without permission), and availability (systems work when needed). Risk depends on threats, vulnerabilities, and impact. Defense in depth layers many controls so one failure does not expose everything.',
        terms: [['CIA triad', 'Confidentiality, integrity, and availability: the three goals of security.'], ['Vulnerability', 'A weakness that could be exploited.'], ['Threat', 'Anyone or anything that could exploit a vulnerability.'], ['Defense in depth', 'Using several layers of protection.']],
        quiz: [
          { q: 'A ransomware attack locks a hospital\'s records so no one can open them. Which part of the CIA triad is most affected?', a: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'], c: 2, why: 'The data still exists but cannot be used. That is a loss of availability.' },
          { q: 'Someone changes a student\'s grade in the gradebook. Which CIA goal was violated?', a: ['Confidentiality', 'Integrity', 'Availability', 'None'], c: 1, why: 'Unauthorized changes to data break integrity.' }
        ] },
      { id: '2.2', title: 'Physical Vulnerabilities and Attacks',
        summary: 'If an attacker can touch a device, many digital protections stop mattering. Physical attacks include tailgating, stealing laptops, plugging in malicious USB drives, shoulder surfing, and dumpster diving for printed passwords or documents.',
        terms: [['Shoulder surfing', 'Watching someone type a password or PIN.'], ['Dumpster diving', 'Searching trash for useful information.'], ['Baiting', 'Leaving infected USB drives where victims will find and plug them in.'], ['Badge cloning', 'Copying the signal from an access card.']],
        quiz: [
          { q: 'A USB drive labeled "Salary Info" is found in the parking lot. What should an employee do?', a: ['Plug it in to find the owner', 'Give it to IT or security without plugging it in', 'Throw it in the trash', 'Plug it into a home computer instead'], c: 1, why: 'Baiting relies on curiosity. Hand unknown drives to IT.' },
          { q: 'Which control best prevents shoulder surfing?', a: ['Privacy screen filters', 'A firewall', 'Antivirus', 'Longer Wi-Fi passwords'], c: 0, why: 'Privacy filters make screens hard to read from the side.' }
        ] },
      { id: '2.3', title: 'Protecting Physical Spaces',
        summary: 'Physical controls include locks, badge readers, fences, security guards, mantraps, and cable locks. Controls are often grouped by purpose: deterrent (discourage), preventive (stop), detective (notice), and corrective (fix). Good design restricts the most sensitive areas to the fewest people.',
        terms: [['Access control vestibule (mantrap)', 'Two doors where the second opens only after the first closes, stopping tailgating.'], ['Preventive control', 'A control that stops an attack from happening.'], ['Deterrent control', 'A control that discourages attackers, such as warning signs.'], ['Least privilege', 'Giving people only the access they need.']],
        quiz: [
          { q: 'A sign reading "This area is under video surveillance" is mainly a:', a: ['Preventive control', 'Deterrent control', 'Corrective control', 'Technical control'], c: 1, why: 'The sign discourages attempts but does not physically stop them.' },
          { q: 'Which best stops tailgating into a server room?', a: ['Warning sign', 'Access control vestibule', 'Motion-sensor lights', 'Visitor log book'], c: 1, why: 'A vestibule only lets one person through at a time.' }
        ] },
      { id: '2.4', title: 'Detecting Physical Attacks',
        summary: 'Detection tells you an attack happened or is happening. Cameras, motion sensors, door alarms, badge logs, and tamper-evident seals all create evidence. Logs only help if someone reviews them, so organizations set alerts for unusual events like a badge used at 3 a.m.',
        terms: [['Detective control', 'A control that identifies an attack, like a camera or alarm.'], ['Tamper-evident seal', 'A seal that shows visible damage if opened.'], ['Access log', 'A record of who entered which door and when.'], ['Alert', 'A notification sent when a rule detects suspicious activity.']],
        quiz: [
          { q: 'Badge logs show an employee entering the server room at 2:47 a.m. on a Sunday. What kind of control produced this evidence?', a: ['Preventive', 'Detective', 'Deterrent', 'Corrective'], c: 1, why: 'Logs detect and record activity after it happens.' },
          { q: 'Why use tamper-evident tape on a computer case?', a: ['To stop the case opening', 'To show if someone opened it', 'To cool the computer', 'To encrypt the drive'], c: 1, why: 'It does not prevent access but reveals it.' }
        ] }
    ]
  },
  {
    id: 'u3', num: 3, title: 'Securing Networks', periods: 26, color: '#D97E16',
    blurb: 'How networks are attacked, and how wireless security, segmentation, firewalls, and monitoring protect them.',
    topics: [
      { id: '3.1', title: 'Network Vulnerabilities and Attacks',
        summary: 'Networks carry data in packets between devices identified by IP and MAC addresses. Attacks include denial of service (flooding a target), on-path attacks (intercepting traffic), ARP and DNS spoofing (sending traffic to the wrong place), and scanning for open ports to find weak services.',
        terms: [['DoS / DDoS', 'Overwhelming a system with traffic, from one source or many.'], ['On-path attack', 'An attacker secretly relays and possibly changes traffic between two parties.'], ['DNS spoofing', 'Giving out false DNS answers so a name leads to the attacker\'s server.'], ['Port scan', 'Probing a device to see which network services are listening.']],
        quiz: [
          { q: 'Thousands of hacked devices flood a school website until it crashes. This is a:', a: ['Phishing attack', 'DDoS attack', 'SQL injection', 'Brute-force attack'], c: 1, why: 'Many sources overwhelming one target is distributed denial of service. It attacks availability.' },
          { q: 'Typing "bank.com" takes you to an attacker\'s copy of the site, though you typed it correctly. Which attack is likely?', a: ['DNS spoofing', 'Shoulder surfing', 'Tailgating', 'Port scanning'], c: 0, why: 'DNS turns names into IP addresses. A false answer sends you to the wrong server.' }
        ] },
      { id: '3.2', title: 'Protecting Networks: Managerial Controls and Wireless Security',
        summary: 'Managerial controls are policies and procedures: acceptable use policies, security training, and change management. For Wi-Fi, use WPA3 (or at least WPA2) with strong passphrases, change default router passwords, and use enterprise authentication so each user has their own login.',
        terms: [['Managerial control', 'A policy or procedure that guides people\'s behavior.'], ['Acceptable use policy (AUP)', 'Rules for how people may use an organization\'s systems.'], ['WPA3', 'The current Wi-Fi security standard.'], ['Default credentials', 'Factory-set usernames and passwords that attackers already know.']],
        quiz: [
          { q: 'Which is a managerial control?', a: ['A firewall rule', 'An annual security awareness training requirement', 'A door lock', 'Disk encryption'], c: 1, why: 'Policies and training are managerial. Firewalls and encryption are technical; locks are physical.' },
          { q: 'What is the first thing to change on a new home router?', a: ['The antenna position', 'The default admin password', 'The color of the lights', 'The channel'], c: 1, why: 'Default admin passwords are published online.' }
        ] },
      { id: '3.3', title: 'Protecting Networks: Segmentation',
        summary: 'Segmentation splits a network into zones so an attacker who gets into one part cannot easily reach the rest. Schools might separate student devices, staff devices, guest Wi-Fi, and servers using VLANs and subnets. A DMZ holds public-facing servers away from the internal network.',
        terms: [['Segmentation', 'Dividing a network into separate zones.'], ['VLAN', 'A virtual LAN that groups devices logically, regardless of physical location.'], ['DMZ', 'A buffer zone for public-facing servers.'], ['Lateral movement', 'An attacker moving from one compromised system to others.']],
        quiz: [
          { q: 'Why put guest Wi-Fi on its own segment?', a: ['It makes Wi-Fi faster', 'Guests cannot reach internal school systems', 'It saves electricity', 'It removes the need for passwords'], c: 1, why: 'Separation limits what an untrusted device can reach.' },
          { q: 'Segmentation mainly makes which attacker activity harder?', a: ['Phishing', 'Lateral movement', 'Shoulder surfing', 'Password guessing'], c: 1, why: 'Walls between zones slow attackers moving across the network.' }
        ] },
      { id: '3.4', title: 'Protecting Networks: Firewalls',
        summary: 'A firewall checks traffic against an ordered list of rules and allows or blocks it based on source, destination, port, and protocol. Rules are usually checked top to bottom and the first match wins. Good firewalls end with "deny everything else" (implicit deny) and only open the ports a service truly needs.',
        terms: [['Firewall rule', 'A condition and an action (allow or deny) for matching traffic.'], ['Port', 'A number that identifies a service, such as 443 for HTTPS or 22 for SSH.'], ['Implicit deny', 'Blocking any traffic not explicitly allowed.'], ['Stateful firewall', 'A firewall that tracks connections and allows replies to approved traffic.']],
        lab: 'firewall',
        quiz: [
          { q: 'Rules: 1) Allow port 443 from any. 2) Deny all. A packet arrives on port 22. What happens?', a: ['Allowed by rule 1', 'Denied by rule 2', 'Allowed because no rule matches', 'Sent to a person to decide'], c: 1, why: 'Port 22 does not match rule 1, so rule 2 (deny all) applies.' },
          { q: 'Which port does HTTPS use by default?', a: ['21', '22', '80', '443'], c: 3, why: 'HTTP is 80 and HTTPS is 443.' }
        ] },
      { id: '3.5', title: 'Detecting Network Attacks',
        summary: 'Intrusion detection systems (IDS) watch traffic and alert on known attack signatures or unusual behavior. Intrusion prevention systems (IPS) can also block it. Analysts read logs and packet captures, look for patterns like many failed connections, and use a SIEM to collect events from many sources in one place.',
        terms: [['IDS', 'Intrusion detection system: alerts on suspicious traffic.'], ['IPS', 'Intrusion prevention system: detects and blocks suspicious traffic.'], ['Signature-based detection', 'Matching traffic against patterns of known attacks.'], ['SIEM', 'A system that gathers and correlates security logs from many devices.']],
        lab: 'logs',
        quiz: [
          { q: 'What is the main difference between an IDS and an IPS?', a: ['An IPS can block traffic, an IDS only alerts', 'An IDS is hardware, an IPS is software', 'An IDS is for Wi-Fi only', 'There is no difference'], c: 0, why: 'Detection alerts. Prevention also takes action.' },
          { q: 'A brand-new attack with no known pattern is most likely caught by:', a: ['Signature-based detection', 'Anomaly-based detection', 'A door lock', 'A privacy screen'], c: 1, why: 'Signatures only match known attacks. Anomaly detection notices unusual behavior.' }
        ] }
    ]
  },
  {
    id: 'u4', num: 4, title: 'Securing Devices', periods: 23, color: '#C2417A',
    blurb: 'Malware and device weaknesses, strong authentication, hardening laptops and phones, and spotting a compromised device.',
    topics: [
      { id: '4.1', title: 'Device Vulnerabilities and Attacks',
        summary: 'Devices are attacked through unpatched software, weak or default passwords, and malware. Malware types include viruses (attach to files), worms (spread by themselves), trojans (pretend to be useful), ransomware (encrypt files for payment), and spyware or keyloggers (watch what you do).',
        terms: [['Malware', 'Software designed to harm or take control of a system.'], ['Ransomware', 'Malware that encrypts files and demands payment.'], ['Worm', 'Malware that spreads across networks on its own.'], ['Zero-day', 'A vulnerability unknown to the vendor, so no patch exists yet.']],
        quiz: [
          { q: 'A free "game" download secretly gives an attacker remote control of the computer. This is a:', a: ['Worm', 'Trojan', 'Firewall', 'Patch'], c: 1, why: 'A trojan hides harmful code inside something that looks useful.' },
          { q: 'Which malware spreads to other computers without anyone clicking anything?', a: ['Trojan', 'Worm', 'Adware', 'Keylogger'], c: 1, why: 'Worms self-replicate across networks.' }
        ] },
      { id: '4.2', title: 'Authentication',
        summary: 'Authentication proves who you are. Factors are something you know (password), something you have (phone or security key), and something you are (fingerprint). Multifactor authentication (MFA) combines different factors. Long passphrases resist brute-force attacks, and passwords should be stored as salted hashes, never as plain text.',
        terms: [['MFA', 'Multifactor authentication: using two or more different kinds of factors.'], ['Brute force', 'Trying every possible password until one works.'], ['Hash', 'A one-way fingerprint of data used to check passwords without storing them.'], ['Password manager', 'An app that creates and stores unique strong passwords.']],
        lab: 'password',
        quiz: [
          { q: 'Which combination is true multifactor authentication?', a: ['Password and PIN', 'Password and a code from your phone', 'Two different passwords', 'Security question and password'], c: 1, why: 'A password is something you know and the phone is something you have. The others are all "know" factors.' },
          { q: 'Which password best resists brute force?', a: ['P@ssw0rd!', 'Tiger2009', 'purple-otter-ladder-sunrise', 'qwerty123'], c: 2, why: 'Length adds far more possibilities than swapping a few symbols.' }
        ] },
      { id: '4.3', title: 'Protecting Devices',
        summary: 'Hardening reduces a device\'s attack surface. Keep the OS and apps updated, remove software you do not need, turn on full-disk encryption, use antivirus or endpoint protection, enable host firewalls, set screen locks, and use standard accounts instead of administrator accounts for daily work.',
        terms: [['Hardening', 'Reducing vulnerabilities by changing settings and removing extras.'], ['Patch', 'An update that fixes a vulnerability.'], ['Full-disk encryption', 'Encrypting the whole drive so a stolen device\'s data stays unreadable.'], ['Attack surface', 'All the points where an attacker could try to get in.']],
        quiz: [
          { q: 'A laptop with full-disk encryption is stolen while powered off. What does encryption protect?', a: ['The laptop from being sold', 'The data on the drive from being read', 'The Wi-Fi password at school', 'Nothing'], c: 1, why: 'Without the key, the thief sees only scrambled data.' },
          { q: 'Why use a standard account instead of an admin account for daily work?', a: ['It is faster', 'Malware gets fewer permissions if it runs', 'It uses less storage', 'It blocks phishing emails'], c: 1, why: 'Least privilege limits the damage malware can do.' }
        ] },
      { id: '4.4', title: 'Detecting Attacks on Devices',
        summary: 'Signs of compromise include unexpected pop-ups, slow performance, unknown programs, disabled security tools, odd network connections, and unfamiliar login alerts. Endpoint detection and response (EDR) tools and system logs help analysts confirm an infection and contain it, for example by disconnecting the device.',
        terms: [['Indicator of compromise (IoC)', 'Evidence that a system may have been breached.'], ['EDR', 'Endpoint detection and response: tools that monitor and respond on devices.'], ['Containment', 'Isolating a system to stop an attack from spreading.'], ['Event log', 'A record of actions on a device, like logins and installs.']],
        quiz: [
          { q: 'Antivirus was turned off on its own and a strange program runs at startup. These are best described as:', a: ['Patches', 'Indicators of compromise', 'Firewall rules', 'Managerial controls'], c: 1, why: 'They are evidence the device may be infected.' },
          { q: 'Ransomware is spreading from one lab computer. What is the first response step?', a: ['Pay the ransom', 'Disconnect the infected computer from the network', 'Restart every computer', 'Delete the logs'], c: 1, why: 'Containment stops it from reaching other machines.' }
        ] }
    ]
  },
  {
    id: 'u5', num: 5, title: 'Securing Applications and Data', periods: 30, color: '#7A4FD0',
    blurb: 'Web app attacks, access control, symmetric and asymmetric cryptography, secure coding, and detecting data breaches.',
    topics: [
      { id: '5.1', title: 'Application and Data Vulnerabilities and Attacks',
        summary: 'Applications fail when they trust user input. SQL injection slips database commands into a form field. Cross-site scripting (XSS) injects scripts into pages other users view. Other risks include broken access control, exposed data, and outdated libraries.',
        terms: [['SQL injection', 'Inserting database commands into input to read or change data.'], ['XSS', 'Cross-site scripting: injecting script into a web page that runs in other users\' browsers.'], ['Input validation', 'Checking that input matches what is expected before using it.'], ['Data breach', 'Unauthorized access to sensitive data.']],
        quiz: [
          { q: 'Typing  \' OR 1=1 --  into a login box logs an attacker in. This is:', a: ['XSS', 'SQL injection', 'Phishing', 'DDoS'], c: 1, why: 'The input changes the database query so it is always true.' },
          { q: 'What is the main root cause of injection attacks?', a: ['Weak Wi-Fi', 'Trusting user input without checking it', 'Old monitors', 'Missing door locks'], c: 1, why: 'Validate input and use parameterized queries.' }
        ] },
      { id: '5.2', title: 'Protecting Applications and Data: Managerial Controls and Access Controls',
        summary: 'Organizations classify data (public, internal, confidential) and set rules for each level. Access control decides who can do what. Role-based access control (RBAC) gives permissions to roles like "teacher" or "student" instead of to each person. Least privilege and separation of duties limit the damage any one account can do.',
        terms: [['Data classification', 'Labeling data by how sensitive it is.'], ['RBAC', 'Role-based access control: permissions tied to job roles.'], ['Separation of duties', 'Splitting critical tasks so no one person can complete them alone.'], ['Authorization', 'Deciding what an authenticated user is allowed to do.']],
        quiz: [
          { q: 'In a gradebook, students can view their own grades and teachers can edit grades for their classes. This is an example of:', a: ['RBAC', 'Encryption', 'Segmentation', 'Hashing'], c: 0, why: 'Permissions are assigned by role.' },
          { q: 'Authentication answers "who are you?" Authorization answers:', a: ['"Where are you?"', '"What are you allowed to do?"', '"How old are you?"', '"What device are you on?"'], c: 1, why: 'Authorization decides permissions after identity is confirmed.' }
        ] },
      { id: '5.3', title: 'Protecting Stored Data with Cryptography',
        summary: 'Encryption turns readable plaintext into ciphertext using a key. Symmetric encryption uses the same key to encrypt and decrypt; it is fast and used for files and disks (AES is the modern standard). Classic ciphers like Caesar show the idea but are easy to break by trying all keys or analyzing letter frequency.',
        terms: [['Plaintext / ciphertext', 'Readable data before encryption / scrambled data after.'], ['Symmetric encryption', 'One shared secret key for both encrypting and decrypting.'], ['AES', 'Advanced Encryption Standard: the widely used symmetric cipher.'], ['Key space', 'The number of possible keys. Larger is harder to brute force.']],
        lab: 'caesar',
        quiz: [
          { q: 'A Caesar cipher has only 25 useful keys. Why is that a problem?', a: ['It is too slow', 'An attacker can try every key quickly', 'It needs internet access', 'It only works on numbers'], c: 1, why: 'A tiny key space falls to brute force in seconds.' },
          { q: 'In symmetric encryption, the sender and receiver:', a: ['Use different keys', 'Use the same secret key', 'Need no key', 'Share a public key only'], c: 1, why: 'Symmetric means one shared key.' }
        ] },
      { id: '5.4', title: 'Asymmetric Cryptography',
        summary: 'Asymmetric (public key) cryptography uses a key pair. Anyone can encrypt with your public key, but only your private key can decrypt. Signing works the other way: you sign with your private key and others verify with your public key. HTTPS uses this to agree on a symmetric key and to prove a site\'s identity with certificates.',
        terms: [['Public key', 'A key you share freely so others can encrypt to you or verify your signature.'], ['Private key', 'A key only you hold, used to decrypt and sign.'], ['Digital signature', 'Proof a message came from the key owner and was not changed.'], ['Certificate', 'A file, vouched for by a trusted authority, that links a public key to an identity.']],
        quiz: [
          { q: 'Alice wants to send Bob a secret message. Which key should she encrypt with?', a: ['Alice\'s private key', 'Alice\'s public key', 'Bob\'s public key', 'Bob\'s private key'], c: 2, why: 'Only Bob\'s private key can decrypt it, so only Bob can read it.' },
          { q: 'A digital signature mainly provides:', a: ['Availability', 'Proof of who sent it and that it was not changed', 'Faster downloads', 'Anonymous sending'], c: 1, why: 'Signatures provide authenticity and integrity.' }
        ] },
      { id: '5.5', title: 'Protecting Applications',
        summary: 'Secure applications validate input, use parameterized queries, encode output, keep libraries updated, and store secrets safely. Security is built in from the start (secure by design), tested with code review and scanning, and backed up so data can be restored after an attack.',
        terms: [['Parameterized query', 'A database query that treats user input strictly as data, blocking SQL injection.'], ['Output encoding', 'Converting special characters so input displays as text instead of running as code.'], ['Patch management', 'Tracking and applying software updates.'], ['Backup', 'A copy of data kept separately so it can be restored.']],
        quiz: [
          { q: 'Which defense best stops SQL injection?', a: ['A longer password', 'Parameterized queries', 'A screen lock', 'A VPN'], c: 1, why: 'The database never treats the input as part of the command.' },
          { q: 'The 3-2-1 backup rule means 3 copies, on 2 types of media, with 1 copy:', a: ['On the same computer', 'Offsite', 'Printed', 'Deleted'], c: 1, why: 'An offsite copy survives fire, theft, or ransomware.' }
        ] },
      { id: '5.6', title: 'Detecting Attacks on Data and Applications',
        summary: 'Application logs, database audit logs, and file integrity monitoring reveal attacks. Warning signs include many failed logins, unusual database queries, large data transfers at odd hours, and changed files. Hashes let analysts check whether a file has been altered.',
        terms: [['Audit log', 'A record of who accessed or changed data.'], ['File integrity monitoring', 'Alerting when important files change unexpectedly.'], ['Data exfiltration', 'Unauthorized copying of data out of an organization.'], ['Baseline', 'A picture of normal activity used to spot differences.']],
        lab: 'logs',
        quiz: [
          { q: 'A file\'s hash today is different from its hash last week. What does that tell you?', a: ['The file was changed', 'The file was opened', 'The file is encrypted', 'Nothing'], c: 0, why: 'Any change to a file changes its hash.' },
          { q: 'A user account downloads 40 GB from the student database at 3 a.m. This could indicate:', a: ['A patch', 'Data exfiltration', 'A deterrent control', 'Normal backups only'], c: 1, why: 'Large, unusual transfers are a classic sign of data theft. Compare to the baseline.' }
        ] }
    ]
  }
];

window.AP_LABS = {
  phish: { title: 'Phishing Spotter', blurb: 'Decide which messages are phishing and which are safe.' },
  url: { title: 'Real or Fake URL?', blurb: 'Find the true domain in tricky web addresses.' },
  firewall: { title: 'Firewall Rule Builder', blurb: 'Order rules so the right packets get through.' },
  logs: { title: 'Log Detective', blurb: 'Read a login log and find the attack.' },
  password: { title: 'Password Strength Lab', blurb: 'See how long a password would take to crack.' },
  caesar: { title: 'Caesar Cipher Lab', blurb: 'Encrypt, decrypt, and brute-force a secret message.' }
};

// The companion book shown across the site. Leave title empty to hide every book section.
// cover: an image path (for example 'book-cover.jpg' in this folder) or empty.
// chapters: optional map from topic id to the matching chapter, for example { '1.1': 'Chapter 1' }.
window.AP_BOOK = {
  title: '',
  author: '',
  tagline: '',
  description: '',
  buyUrl: '',
  cover: '',
  chapters: {}
};
