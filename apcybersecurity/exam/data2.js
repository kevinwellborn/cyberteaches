/* AP Cybersecurity Practice Exam 2 (cyberteaches.com/apcybersecurity/exam/2/)
   Every question, scenario, log and policy here is original CyberTeaches material.
   People, schools and companies are fictional; IP addresses use private or documentation ranges.
   Question fields: id, topic (course topic id, links to /apcybersecurity/#/topic/<id>), set (optional shared
   stimulus in sets), stem (HTML), opts (4 strings), ans ("A"-"D"), expl.
   frq: one Device Security Analysis question: intro, sources [{title, html}], parts [{label, name, prompt, pts:[1 point each], sample}] */
window.CYB_EXAM = {
 "id": "exam-2",
 "num": 2,
 "name": "AP Cybersecurity Practice Exam 2",
 "sets": {
  "SMS": {
   "html": "<p>An employee receives the following text message on a personal phone.</p>\n<div class=\"email\"><div><b>From:</b> +1 (555) 014-2290</div><hr>\n<p>PostQuick Delivery: Your package #88213 could not be delivered because the address is incomplete. Reschedule within 12 HOURS or the package will be returned to the sender. A $1.99 redelivery fee applies.</p>\n<p>Reschedule now: postquick-redeliver.info/88213</p></div>\n<p>The employee is not expecting a package. The real PostQuick company uses the website <code>postquick.com</code>.</p>"
  },
  "NEWS": {
   "html": "<p>Consider the following news article.</p>\n<div class=\"email\"><p><b>Riverside Water Authority Website Taken Offline, Defaced</b></p>\n<p>The Riverside Water Authority's public website was unreachable for most of Monday after it was flooded with traffic from thousands of computers around the world. When the site briefly came back online, its home page had been replaced with a message criticizing the authority's plan to build a new dam.</p>\n<p>A group calling itself \"Free River\" claimed responsibility on social media, saying the attack was a protest and that it would continue \"until the dam project is cancelled.\" The group did not ask for money.</p>\n<p>A spokesperson said the water supply and treatment systems are on a separate network and were not affected. Customer billing data stored on the website's server is still being reviewed.</p></div>"
  },
  "RISK": {
   "html": "<p>A shipping warehouse uses the following matrix to assign a risk level to each risk it documents.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th></th><th>Low impact</th><th>Medium impact</th><th>High impact</th></tr><tr><td><b>High likelihood</b></td><td>Moderate</td><td>High</td><td>High</td></tr><tr><td><b>Medium likelihood</b></td><td>Low</td><td>Moderate</td><td>High</td></tr><tr><td><b>Low likelihood</b></td><td>Low</td><td>Low</td><td>Moderate</td></tr></table></div><p>The warehouse's risk register includes the following entries.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th>ID</th><th>Risk</th><th>Likelihood</th><th>Impact</th></tr><tr><td>W1</td><td>The loading dock door is often propped open, but the dock area holds only empty pallets and no computers.</td><td>High</td><td>Low</td></tr><tr><td>W2</td><td>The inventory server is in an unlocked closet next to the break room.</td><td>High</td><td>High</td></tr><tr><td>W3</td><td>A flood could damage the backup generator, which is used only during power outages.</td><td>Low</td><td>Medium</td></tr><tr><td>W4</td><td>A ransomware attack on the shipping system would stop all deliveries for days.</td><td>Medium</td><td>High</td></tr></table></div>"
  },
  "FW": {
   "html": "<p>A company's server has the IP address <code>10.5.0.20</code>. Its firewall applies the first rule that matches each packet, checking the rules in order from rule 1 to rule 8. The IT staff subnet is <code>10.5.1.0</code> to <code>10.5.1.255</code>, and the company's DNS server is <code>10.5.0.2</code>.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th>Rule</th><th>Allow/Deny</th><th>Direction</th><th>Protocol</th><th>Port</th><th>Source</th></tr><tr><td>1</td><td>Allow</td><td>Inbound</td><td>TCP</td><td>25</td><td>ALL</td></tr><tr><td>2</td><td>Deny</td><td>Inbound</td><td>TCP</td><td>22</td><td>ALL</td></tr><tr><td>3</td><td>Allow</td><td>Inbound</td><td>TCP</td><td>22</td><td>10.5.1.0 - 10.5.1.255</td></tr><tr><td>4</td><td>Allow</td><td>Inbound</td><td>TCP</td><td>443</td><td>ALL</td></tr><tr><td>5</td><td>Deny</td><td>Inbound</td><td>TCP</td><td>3306</td><td>ALL</td></tr><tr><td>6</td><td>Allow</td><td>Inbound</td><td>TCP</td><td>3389</td><td>ALL</td></tr><tr><td>7</td><td>Allow</td><td>Inbound</td><td>UDP</td><td>53</td><td>10.5.0.2</td></tr><tr><td>8</td><td>Deny</td><td>Inbound</td><td>ALL</td><td>ALL</td><td>ALL</td></tr></table></div><p class=\"small muted\">Port 22 = SSH, 25 = SMTP (email), 53 = DNS, 443 = HTTPS, 3306 = MySQL database, 3389 = RDP (Remote Desktop).</p>"
  },
  "SEG": {
   "html": "<p>A high school divides its network into the following VLANs.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th>VLAN</th><th>Devices</th></tr><tr><td>10</td><td>Staff laptops</td></tr><tr><td>20</td><td>Student devices</td></tr><tr><td>30</td><td>Guest Wi-Fi</td></tr><tr><td>40</td><td>Servers (learning management system, file shares)</td></tr><tr><td>50</td><td>Security cameras</td></tr></table></div><p>Traffic between VLANs is controlled by these rules, applied in order.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th>Rule</th><th>From</th><th>To</th><th>Ports</th><th>Action</th></tr><tr><td>1</td><td>VLAN 20</td><td>VLAN 40, learning management server only</td><td>TCP 443</td><td>Allow</td></tr><tr><td>2</td><td>VLAN 10</td><td>VLAN 40</td><td>TCP 443, TCP 445</td><td>Allow</td></tr><tr><td>3</td><td>VLAN 50</td><td>Internet</td><td>ALL</td><td>Allow</td></tr><tr><td>4</td><td>VLAN 30</td><td>Any internal VLAN</td><td>ALL</td><td>Deny</td></tr><tr><td>5</td><td>ALL</td><td>ALL</td><td>ALL</td><td>Deny</td></tr></table></div><p class=\"small muted\">TCP 445 = Windows file sharing (SMB).</p>"
  },
  "SPRAY": {
   "html": "<p>A school district's single sign-on system produced the following authentication log. The district locks an account after 5 failed sign-ins within 15 minutes.</p><pre class=\"code log\"> 1 - 08:00:02 login FAILED user=akhan     src=192.0.2.61\n 2 - 08:01:05 login FAILED user=bsmith    src=192.0.2.61\n 3 - 08:02:07 login FAILED user=cwong     src=192.0.2.61\n 4 - 08:03:04 login FAILED user=dlopez    src=192.0.2.61\n 5 - 08:04:06 login FAILED user=ejohnson  src=192.0.2.61\n 6 - 08:05:03 login FAILED user=fgarcia   src=192.0.2.61\n 7 - 08:06:05 login SUCCESS user=tnguyen  src=192.0.2.61\n 8 - 08:06:40 login SUCCESS user=mreed    src=10.20.4.17\n 9 - 08:07:02 login FAILED user=gpatel    src=192.0.2.61</pre><p>A later review shows that every failed attempt from 192.0.2.61 used the same password, <code>Fall2026!</code>.</p>"
  },
  "PERMS": {
   "html": "<p>A science teacher runs the following command on a shared school server.</p><pre class=\"code log\">$ ls -l /srv/science\n-rw-rw-r--  1 apatel  science  4200  Oct 12 09:14  lab_grades.xlsx\n-rwxr-x--x  1 root    admins    812  Oct 02 17:40  cleanup\n-rw-------  1 apatel  apatel   1675  Sep 30 08:02  id_rsa\n-rw-r--r--  1 apatel  science  9100  Aug 21 13:55  syllabus.pdf</pre><p class=\"small muted\">In a permission string, after the first character come three groups of r (read), w (write), and x (execute) for the owner, the group, and all other users. In a chmod number, read = 4, write = 2, and execute = 1, added together for the owner, the group, and others (for example, 7 = rwx and 5 = r-x).</p>"
  },
  "WEB": {
   "html": "<p>A school's document portal lets users download files with a <code>file</code> parameter. The administrator reviews the following access log entries. Each entry shows the row number, the client address, the request, the status code, and the number of bytes returned.</p><pre class=\"code log\"> 1 - 10.8.2.44     GET  /index.html                              200  3812\n 2 - 10.8.2.44     GET  /download?file=handbook_2026.pdf         200  48211\n 3 - 203.0.113.9   GET  /download?file=../../../etc/passwd       200  1904\n 4 - 203.0.113.9   GET  /download?file=../../../etc/shadow       403  288\n 5 - 203.0.113.9   POST /feedback  name=AAAAAAAAAAAAAAAAAAAA...  (4,096 characters)  500  0\n 6 - 10.8.3.120    GET  /download?file=bus_schedule.pdf          200  15530</pre>"
  },
  "HASH": {
   "html": "<p>A system administrator downloads the same installer from two mirror websites and computes each file's SHA-256 hash. The software vendor publishes the correct hash on its official website. Only the first 16 hexadecimal characters of each hash are shown.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th>Source</th><th>SHA-256 hash (first 16 characters)</th></tr><tr><td>Vendor's published hash</td><td>4e07408562bedb8b</td></tr><tr><td>Installer from Mirror A</td><td>4e07408562bedb8b</td></tr><tr><td>Installer from Mirror B</td><td>b9f1c2d0aa71e3c5</td></tr></table></div>"
  }
 },
 "questions": [
  {
   "id": 1,
   "topic": "1.1",
   "set": "SMS",
   "stem": "Which term best describes this type of attack?",
   "opts": [
    "Smishing",
    "Tailgating",
    "Vishing",
    "Typosquatting only"
   ],
   "ans": "A",
   "expl": "Smishing is phishing delivered by SMS text message. Vishing uses voice calls. The look-alike link is part of the attack, but the delivery method makes it smishing."
  },
  {
   "id": 2,
   "topic": "1.2",
   "set": "SMS",
   "stem": "The message asks for a $1.99 redelivery fee. What is the adversary most likely trying to obtain?",
   "opts": [
    "Control of the employee's phone through the SMS message itself",
    "The $1.99 fee itself, which is the attacker's main profit",
    "The employee's payment card details, which can be used for much larger charges",
    "The employee's home address so the package can be delivered"
   ],
   "ans": "C",
   "expl": "A tiny fee lowers suspicion. The real goal is to collect the card number, expiration date, and security code on the fake site and then misuse them."
  },
  {
   "id": 3,
   "topic": "1.1",
   "set": "SMS",
   "stem": "Which response is safest for the employee?",
   "opts": [
    "Pay the fee quickly, since it is small, before the 12-hour deadline passes.",
    "Do not tap the link; check for deliveries by typing postquick.com directly or using the official app, then report and delete the message.",
    "Tap the link to see whether the website looks real before entering anything.",
    "Reply STOP to the message so the sender removes the number from the list."
   ],
   "ans": "B",
   "expl": "Verifying through a separate, trusted channel avoids the attacker's link entirely. Visiting the link or replying confirms that the number is active and can expose the device or the employee to more attacks."
  },
  {
   "id": 4,
   "topic": "1.1",
   "stem": "A caller tells a new office assistant, \"Everyone else in your department already gave me their login so I could move their files to the new server. You're the last one.\" Which social engineering principle is the caller mainly using?",
   "opts": [
    "Consensus (social proof)",
    "Scarcity",
    "Familiarity",
    "Intimidation"
   ],
   "ans": "A",
   "expl": "Claiming that everyone else has already complied uses consensus: people tend to follow what they believe others are doing."
  },
  {
   "id": 5,
   "topic": "1.4",
   "stem": "An accounts payable clerk receives a phone call that sounds exactly like the company's chief financial officer asking for an urgent wire transfer to a new vendor. The company suspects that AI voice cloning was used. Which control would best prevent this kind of attack from succeeding?",
   "opts": [
    "A policy requiring that all calls from executives be answered within one minute",
    "Installing antivirus software on the clerk's computer",
    "A policy requiring that payment requests be verified by calling the requester back at a known phone number",
    "Encrypting the company's payment records"
   ],
   "ans": "C",
   "expl": "A cloned voice can sound real, so the voice itself cannot be trusted. Out-of-band verification, such as a callback to a number already on file, defeats impersonation."
  },
  {
   "id": 6,
   "topic": "1.5",
   "stem": "An email security team adjusts its AI phishing filter so that it flags messages even when it is only slightly suspicious of them. Which outcome is most likely?",
   "opts": [
    "Fewer legitimate emails will be flagged, and more phishing emails will be missed.",
    "Both false positives and false negatives will drop to zero.",
    "The filter will no longer need any human review.",
    "More legitimate emails will be flagged (false positives), and fewer phishing emails will be missed (false negatives)."
   ],
   "ans": "D",
   "expl": "Making a detector more sensitive catches more real attacks but also flags more harmless items. Tuning a detector usually trades one kind of error for the other."
  },
  {
   "id": 7,
   "topic": "1.3",
   "stem": "A traveler connects to a hotel's open Wi-Fi and visits a banking website that uses HTTPS. Another guest on the same network is capturing traffic. Which information can the other guest most likely still learn?",
   "opts": [
    "That the traveler's device connected to the bank's server, but not the pages viewed or the password entered",
    "Nothing at all, because HTTPS hides every part of the connection",
    "The traveler's banking password, because the Wi-Fi network is open",
    "The full contents of every page the traveler viewed on the banking site"
   ],
   "ans": "A",
   "expl": "HTTPS encrypts the contents of the connection, so passwords and pages stay private. Connection details, such as which server the device connected to, can still be seen, which is one reason a VPN adds protection on public networks."
  },
  {
   "id": 8,
   "topic": "2.1",
   "set": "NEWS",
   "stem": "Which of the following best describes the adversary in this article?",
   "opts": [
    "Script kiddie testing tools for fun",
    "Insider threat",
    "Organized crime group seeking payment",
    "Hacktivist"
   ],
   "ans": "D",
   "expl": "The group attacked to promote a political or social cause (opposing the dam) and did not ask for money. That is a hacktivist."
  },
  {
   "id": 9,
   "topic": "2.1",
   "set": "NEWS",
   "stem": "Replacing the home page with the group's message most directly violated which security goal?",
   "opts": [
    "Non-repudiation",
    "Confidentiality",
    "Availability",
    "Integrity"
   ],
   "ans": "D",
   "expl": "Defacement changes content without authorization, which is a loss of integrity. The flood of traffic that made the site unreachable affected availability."
  },
  {
   "id": 10,
   "topic": "2.1",
   "stem": "A school's risk assessment lists the following items. Which item is a <b>vulnerability</b> rather than a threat?",
   "opts": [
    "Severe storms are common in the area during the spring.",
    "A former employee is angry about being fired.",
    "Classroom printers run firmware that has not been updated in three years.",
    "A hacktivist group has announced attacks on school districts."
   ],
   "ans": "C",
   "expl": "A vulnerability is a weakness that could be exploited, such as outdated firmware. Hacktivists, storms, and an angry former employee are threats: sources of potential harm."
  },
  {
   "id": 11,
   "topic": "2.1",
   "stem": "An employee who has just resigned copies the company's customer list to a personal USB drive on the last day of work. Which type of threat does this represent?",
   "opts": [
    "Nation-state actor",
    "Script kiddie",
    "Insider threat",
    "Hacktivist"
   ],
   "ans": "C",
   "expl": "An insider is someone who already has authorized access, such as a current or recently departed employee, and misuses it."
  },
  {
   "id": 12,
   "topic": "2.1",
   "set": "RISK",
   "stem": "Using the matrix, which risk would be classified as <b>moderate</b>?",
   "opts": [
    "W1",
    "W2",
    "W3",
    "W4"
   ],
   "ans": "A",
   "expl": "W1 is High likelihood and Low impact, which the matrix rates Moderate. W2 (High, High) and W4 (Medium, High) are High, and W3 (Low, Medium) is Low."
  },
  {
   "id": 13,
   "topic": "2.1",
   "set": "RISK",
   "stem": "The warehouse cannot afford to fix risk W4 right away, so it buys a cyber insurance policy that would pay for recovery costs after a ransomware attack. Which risk response is this?",
   "opts": [
    "Avoiding the risk",
    "Accepting the risk",
    "Transferring the risk",
    "Mitigating the risk by lowering its likelihood"
   ],
   "ans": "C",
   "expl": "Insurance shifts the financial impact to another party, which is risk transfer. The likelihood of an attack is unchanged."
  },
  {
   "id": 14,
   "topic": "2.2",
   "stem": "An adversary carries a hidden card reader in a backpack and walks close to employees in a crowded elevator. Later, the adversary uses copies of their ID badges to enter the building. Which attack is this, and which control best reduces it?",
   "opts": [
    "Dumpster diving; a document shredding policy",
    "Tailgating; a sign asking employees not to hold doors",
    "Shoulder surfing; privacy screens on employee laptops",
    "Badge cloning; badges that use encrypted smart-card technology, kept in shielded sleeves"
   ],
   "ans": "D",
   "expl": "Reading badge data from a distance to make copies is badge cloning. Encrypted smart cards are much harder to copy, and shielded sleeves block nearby readers."
  },
  {
   "id": 15,
   "topic": "2.2",
   "stem": "During a security review, an auditor finds printed network diagrams and a list of server passwords in an office recycling bin. Which attack does this information make easier, and which control best addresses it?",
   "opts": [
    "Evil twin; turning off auto-join on laptops",
    "Baiting; removing USB ports from computers",
    "Dumpster diving; a policy requiring sensitive documents to be shredded",
    "Tailgating; installing a mantrap at the entrance"
   ],
   "ans": "C",
   "expl": "Searching trash for useful information is dumpster diving. Shredding sensitive papers removes what an adversary could find."
  },
  {
   "id": 16,
   "topic": "2.3",
   "stem": "A data center installs steel posts (bollards) in front of its main entrance so that vehicles cannot be driven into the building. What type of control are the bollards?",
   "opts": [
    "Preventive physical control",
    "Deterrent technical control",
    "Corrective managerial control",
    "Detective technical control"
   ],
   "ans": "A",
   "expl": "Bollards physically stop an action from happening, so they are a preventive physical control."
  },
  {
   "id": 17,
   "topic": "2.3",
   "stem": "A school's night custodians need to enter classrooms between 6 p.m. and 11 p.m. but have no reason to enter the server room. Which badge configuration best follows the principle of least privilege?",
   "opts": [
    "Allow custodian badges to open classroom doors only from 6 p.m. to 11 p.m., with no access to the server room.",
    "Give custodians a master key that opens every door at any time.",
    "Leave classroom doors unlocked at night so custodians do not need badges.",
    "Give custodians the same badge access as the IT staff so they never get locked out."
   ],
   "ans": "A",
   "expl": "Least privilege grants only the access needed, only when it is needed. Restricting both the doors and the hours limits what a lost or misused badge could open."
  },
  {
   "id": 18,
   "topic": "2.4",
   "stem": "Each server in a company's branch office has a tamper-evident seal over its case. During a weekly check, a technician finds that the seal on one server is torn. What does this most likely indicate, and what should happen next?",
   "opts": [
    "Someone may have opened the case; the server should be inspected for added hardware and the access logs and camera footage reviewed.",
    "The server is overheating; its fans should be cleaned.",
    "The server's software is out of date; it should be patched.",
    "The seal stopped an attack, so no further action is needed."
   ],
   "ans": "A",
   "expl": "Tamper-evident seals are detective controls: they do not stop entry, but they show that it happened. A torn seal calls for an investigation using other evidence such as badge logs and cameras."
  },
  {
   "id": 19,
   "topic": "3.1",
   "set": "NEWS",
   "stem": "Which type of attack most likely made the website unreachable?",
   "opts": [
    "Brute-force password attack",
    "ARP poisoning attack",
    "Distributed denial-of-service (DDoS) attack",
    "SQL injection attack"
   ],
   "ans": "C",
   "expl": "Traffic from thousands of computers that overwhelms a site so legitimate users cannot reach it is a DDoS attack."
  },
  {
   "id": 20,
   "topic": "3.5",
   "set": "NEWS",
   "stem": "Which control would most likely reduce the impact of a similar traffic flood in the future?",
   "opts": [
    "Requiring employees to use longer passwords",
    "A DDoS protection service that filters malicious traffic before it reaches the web server",
    "Adding a second administrator account to the web server",
    "Encrypting the customer billing data on the server"
   ],
   "ans": "B",
   "expl": "DDoS protection services absorb and filter huge volumes of traffic upstream, so legitimate visitors can still reach the site. Password and encryption controls do not address availability attacks."
  },
  {
   "id": 21,
   "topic": "3.4",
   "set": "FW",
   "stem": "A network technician at <code>10.5.1.14</code> is unable to connect to the server using SSH on port 22. Which change to the firewall would allow the technician to connect?",
   "opts": [
    "Swap rule 7 with rule 8",
    "Swap rule 1 with rule 2",
    "Swap rule 3 with rule 4",
    "Swap rule 2 with rule 3"
   ],
   "ans": "D",
   "expl": "Rule 2 denies SSH from all sources and is checked before rule 3, so rule 3 is never reached. Putting rule 3 first allows SSH from the IT subnet, and rule 2 still denies everyone else."
  },
  {
   "id": 22,
   "topic": "3.4",
   "set": "FW",
   "stem": "Which rule creates the greatest risk of remote attacks against the server, and should most likely be restricted?",
   "opts": [
    "Rule 4, because it allows HTTPS connections from any source",
    "Rule 7, because it allows DNS from one server",
    "Rule 5, because it denies database connections",
    "Rule 6, because it allows Remote Desktop connections from any source"
   ],
   "ans": "D",
   "expl": "Remote Desktop gives full control of a machine and is a frequent target for password attacks. Allowing it from ALL sources exposes it to the internet. It should be limited to the IT subnet or reached through a VPN."
  },
  {
   "id": 23,
   "topic": "3.4",
   "set": "FW",
   "stem": "A packet arrives from <code>192.0.2.53</code> on UDP port 53. Which rule is applied to it?",
   "opts": [
    "Rule 1, which allows it",
    "Rule 8, which denies it",
    "No rule, so it is allowed by default",
    "Rule 7, which allows it"
   ],
   "ans": "B",
   "expl": "Rule 7 allows UDP 53 only from 10.5.0.2. A packet from 192.0.2.53 matches none of rules 1 through 7, so it reaches rule 8 and is denied."
  },
  {
   "id": 24,
   "topic": "3.4",
   "set": "FW",
   "stem": "If rule 5 were deleted, what would happen to inbound MySQL traffic on TCP port 3306?",
   "opts": [
    "It would still be denied, by rule 8.",
    "It would be allowed by rule 4.",
    "It would be denied by rule 2.",
    "It would be allowed, because no rule would deny it."
   ],
   "ans": "A",
   "expl": "With rule 5 gone, 3306 traffic does not match rules 1 through 7 and falls through to rule 8, which denies all remaining traffic. Rule 5 is redundant, but it documents the intent clearly."
  },
  {
   "id": 25,
   "topic": "3.3",
   "set": "SEG",
   "stem": "A student laptop on VLAN 20 is infected with malware that tries to connect to the server file shares on TCP port 445. What happens?",
   "opts": [
    "The connection is allowed by rule 3.",
    "The connection is allowed, because VLAN 20 and VLAN 40 are both internal.",
    "The connection is denied, because rule 1 allows students only HTTPS to the learning management server.",
    "The connection is allowed by rule 2."
   ],
   "ans": "C",
   "expl": "Rule 2 applies only to staff (VLAN 10). Student traffic to file shares matches no allow rule, so rule 5 denies it. This segmentation limits how far malware on a student device can spread."
  },
  {
   "id": 26,
   "topic": "3.3",
   "set": "SEG",
   "stem": "Which rule most increases the school's risk and should be reviewed first?",
   "opts": [
    "Rule 4, because guests are blocked from internal VLANs",
    "Rule 1, because students need to reach the learning management system",
    "Rule 5, because it denies all other traffic",
    "Rule 3, because the cameras can reach any internet address even though they only need to send video to an internal recorder"
   ],
   "ans": "D",
   "expl": "IoT devices such as cameras are often poorly secured. Letting them reach the whole internet makes it easier for an adversary to control them remotely or use them in a botnet. They should only reach the systems they need."
  },
  {
   "id": 27,
   "topic": "3.1",
   "stem": "A network switch suddenly starts sending every frame out of all its ports. An analyst finds that one device sent frames with thousands of different made-up source MAC addresses in a few seconds. Which attack is most likely occurring?",
   "opts": [
    "DNS poisoning",
    "MAC flooding",
    "Directory traversal",
    "Evil twin"
   ],
   "ans": "B",
   "expl": "MAC flooding fills the switch's address table with fake entries. When the table is full, the switch broadcasts frames to all ports, which lets the adversary capture traffic meant for other devices."
  },
  {
   "id": 28,
   "topic": "3.1",
   "stem": "An employee plugs a personal wireless router into a network jack under a desk so the employee can use a phone more easily. The router is not managed by the IT department. Which term best describes this device?",
   "opts": [
    "Honeypot",
    "Proxy server",
    "Rogue access point",
    "Intrusion prevention system"
   ],
   "ans": "C",
   "expl": "An unauthorized wireless access point connected to the internal network is a rogue access point. It can let anyone within range bypass the network's security controls."
  },
  {
   "id": 29,
   "topic": "3.2",
   "stem": "A school currently uses one shared Wi-Fi passphrase for all staff. It plans to switch to WPA3-Enterprise, where each staff member signs in with an individual account. What is the main security benefit?",
   "opts": [
    "Guests will be able to use staff credentials more easily.",
    "Access can be removed for one person, such as an employee who leaves, without changing the password for everyone.",
    "Staff will no longer need any password to connect.",
    "The wireless signal will no longer reach outside the building."
   ],
   "ans": "B",
   "expl": "Enterprise authentication gives each user unique credentials, so access can be revoked individually and activity can be traced to a specific account."
  },
  {
   "id": 30,
   "topic": "3.4",
   "stem": "A firewall automatically allows reply traffic for connections that internal users start, but blocks unrequested connections that start from the internet. Which type of firewall behavior does this describe?",
   "opts": [
    "Stateful inspection",
    "Port scanning",
    "Implicit allow",
    "Network address translation only"
   ],
   "ans": "A",
   "expl": "A stateful firewall keeps track of active connections. It recognizes replies to connections that started inside the network and lets them in, while denying new inbound connections that no rule allows."
  },
  {
   "id": 31,
   "topic": "3.5",
   "stem": "A security team wants one tool that collects events from its firewalls, VPN, badge readers, and servers, and alerts when related events occur together, such as a VPN login from overseas a few minutes after the same user badged into the office. Which tool best meets this need?",
   "opts": [
    "Password manager",
    "Stateful firewall",
    "Security information and event management (SIEM) system",
    "Data loss prevention (DLP) system"
   ],
   "ans": "C",
   "expl": "A SIEM gathers logs from many sources in one place and correlates them to find patterns that no single log would reveal."
  },
  {
   "id": 32,
   "topic": "3.5",
   "stem": "An intrusion detection system does not generate an alert while an adversary copies files from a server. Which term describes this result?",
   "opts": [
    "True positive",
    "True negative",
    "False positive",
    "False negative"
   ],
   "ans": "D",
   "expl": "A false negative is a real attack that the detection system misses. A false positive is an alert on harmless activity."
  },
  {
   "id": 33,
   "topic": "4.4",
   "set": "SPRAY",
   "stem": "Which type of attack is shown in rows 1 through 7 and row 9?",
   "opts": [
    "Denial of service against the sign-on system",
    "Brute force: many passwords tried against one account",
    "Credential stuffing with passwords from another site's breach",
    "Password spraying: one common password tried against many accounts"
   ],
   "ans": "D",
   "expl": "A single password, Fall2026!, was tried once against many different accounts from the same address. That is password spraying."
  },
  {
   "id": 34,
   "topic": "4.2",
   "set": "SPRAY",
   "stem": "Why did the account lockout policy fail to stop this attack?",
   "opts": [
    "Each account received only one failed attempt, so no account reached 5 failures in 15 minutes.",
    "The attacker used a different IP address for every attempt.",
    "The attacker guessed the correct password on the first try for every account.",
    "Lockout policies apply only to administrator accounts."
   ],
   "ans": "A",
   "expl": "Spraying stays under per-account lockout limits by trying each account once and spacing attempts about a minute apart. The log shows one source address throughout."
  },
  {
   "id": 35,
   "topic": "4.4",
   "set": "SPRAY",
   "stem": "Which detection rule would best alert on this attack the next time it starts?",
   "opts": [
    "Alert only when an administrator account is locked out.",
    "Alert when any single account has more than 20 failed sign-ins in one day.",
    "Alert when one source address has failed sign-ins for many different accounts within a short period.",
    "Alert whenever a user signs in successfully before 9:00 a.m."
   ],
   "ans": "C",
   "expl": "The pattern that stands out is one source failing against many accounts. A per-account threshold misses spraying, and alerting on every early successful login would flood analysts with false positives."
  },
  {
   "id": 36,
   "topic": "4.1",
   "stem": "A technician finds a small device plugged in between a library computer's keyboard cable and the computer's USB port. Which threat does this device most likely pose?",
   "opts": [
    "It is a firewall that blocks unwanted traffic.",
    "It is a hardware keylogger that records everything typed, including passwords.",
    "It is ransomware that encrypts the computer's files.",
    "It is a worm that spreads to other computers over the network."
   ],
   "ans": "B",
   "expl": "A device placed between the keyboard and the computer can capture every keystroke. Shared public computers are common targets, which is why physical inspection matters."
  },
  {
   "id": 37,
   "topic": "4.1",
   "stem": "A student downloads a free \"PDF converter\" from an unofficial website. The converter works, but it also secretly gives an adversary remote access to the computer. Which type of malware is this?",
   "opts": [
    "Worm",
    "Adware only",
    "Trojan",
    "Logic bomb"
   ],
   "ans": "C",
   "expl": "A trojan pretends to be useful software while hiding a malicious function. It depends on the user choosing to install it."
  },
  {
   "id": 38,
   "topic": "4.2",
   "stem": "An adversary steals a database of password hashes from a website and tries to crack them on the adversary's own computers. Which defense most slows this offline attack?",
   "opts": [
    "Locking an account after 5 failed sign-in attempts",
    "Requiring users to solve a CAPTCHA when signing in",
    "Storing each password with a unique salt and a deliberately slow hashing algorithm",
    "Showing a warning banner on the sign-in page"
   ],
   "ans": "C",
   "expl": "An offline attack never touches the sign-in page, so lockouts and CAPTCHAs do not apply. Salts stop precomputed tables, and a slow hash makes each guess expensive."
  },
  {
   "id": 39,
   "topic": "4.2",
   "stem": "Adversaries take username and password pairs leaked from a breached gaming website and automatically try them on a bank's sign-in page. Which attack is this, and which defense is most effective?",
   "opts": [
    "SQL injection; encrypting the bank's database",
    "Phishing; blocking all emails from the gaming website",
    "Password spraying; changing the bank's website design",
    "Credential stuffing; using a unique password for every site and enabling MFA"
   ],
   "ans": "D",
   "expl": "Reusing leaked credentials on other sites is credential stuffing. It succeeds only when people reuse passwords, and MFA blocks it even when a password matches."
  },
  {
   "id": 40,
   "topic": "4.2",
   "stem": "A district's sign-in system asks for a password and then a six-digit code from an authenticator app on the user's registered phone. Which authentication factor does the code represent?",
   "opts": [
    "Something you have (possession factor)",
    "Something you are (biometric factor)",
    "Somewhere you are (location factor)",
    "Something you know (knowledge factor)"
   ],
   "ans": "A",
   "expl": "The code proves that the user holds the registered phone, so it is a possession factor. Combined with the password, a knowledge factor, it makes MFA."
  },
  {
   "id": 41,
   "topic": "4.3",
   "stem": "A school wants its testing laptops to run only the approved testing app and a web browser, and to block any other program from starting, including new malware. Which control best meets this goal?",
   "opts": [
    "A larger hard drive",
    "A stronger screen-lock password",
    "Full-disk encryption",
    "Application allow listing"
   ],
   "ans": "D",
   "expl": "Allow listing permits only approved programs to run and blocks everything else by default, which also stops malware that antivirus has never seen."
  },
  {
   "id": 42,
   "topic": "4.3",
   "stem": "Why do security guidelines recommend that employees use a standard (non-administrator) account for everyday work on their computers?",
   "opts": [
    "Malware that runs while the user is signed in gets only that user's limited permissions, so it cannot easily change the whole system.",
    "Standard accounts cannot connect to the internet.",
    "Standard accounts make the computer run faster.",
    "Standard accounts do not need passwords."
   ],
   "ans": "A",
   "expl": "Programs run with the permissions of the signed-in user. With a standard account, malicious software cannot easily install drivers, turn off security tools, or change system settings."
  },
  {
   "id": 43,
   "topic": "4.3",
   "stem": "A teacher's school-issued phone, which has access to student records, is lost on a field trip. Which capability would best protect the data on the phone?",
   "opts": [
    "A brighter screen so the phone is easier to find",
    "Mobile device management (MDM) that can lock and remotely wipe the phone",
    "A host-based firewall on the teacher's laptop",
    "A phone case with the school's name printed on it"
   ],
   "ans": "B",
   "expl": "MDM lets administrators enforce encryption and passcodes and remotely lock or erase a lost device, so a finder cannot read the data."
  },
  {
   "id": 44,
   "topic": "4.4",
   "stem": "An endpoint detection and response (EDR) tool reports four events on an office computer. Which event is the strongest indicator of compromise?",
   "opts": [
    "The web browser was opened and closed several times.",
    "The word processor started PowerShell, which then downloaded a file from an unfamiliar website.",
    "The antivirus program updated its signature list.",
    "The operating system installed scheduled updates at 3:00 a.m."
   ],
   "ans": "B",
   "expl": "A document program launching a command shell that downloads a file is a classic sign of a malicious macro. The other events are routine."
  },
  {
   "id": 45,
   "topic": "4.4",
   "stem": "While investigating a server, an analyst sees that the security event log was cleared at 2:13 a.m. by an account that does not normally manage the server. What does this most likely indicate?",
   "opts": [
    "An adversary may be trying to cover their tracks by erasing evidence.",
    "The log was full of false positives, so clearing it was appropriate.",
    "The server ran out of disk space and cleared the log automatically.",
    "The server received a routine software update."
   ],
   "ans": "A",
   "expl": "Clearing security logs, especially at an odd hour from an unusual account, is a common way for adversaries to hide what they did. It is itself an indicator of compromise. Sending logs to a central SIEM protects a copy."
  },
  {
   "id": 46,
   "topic": "5.6",
   "set": "WEB",
   "stem": "Which type of attack is shown in rows 3 and 4?",
   "opts": [
    "Cross-site scripting attack",
    "Directory traversal attack",
    "SQL injection attack",
    "Password spraying attack"
   ],
   "ans": "B",
   "expl": "The sequence ../ moves up through folders on the server, trying to read files outside the folder of downloadable documents, such as /etc/passwd and /etc/shadow."
  },
  {
   "id": 47,
   "topic": "5.6",
   "set": "WEB",
   "stem": "Which conclusion about row 3 is best supported by the log?",
   "opts": [
    "The attack failed, because the server returned an error code.",
    "Row 3 is a normal download by a school employee.",
    "The attack most likely succeeded, because the server returned status 200 and 1,904 bytes for a system file.",
    "Row 3 shows the server blocking the request with a firewall."
   ],
   "ans": "C",
   "expl": "Status 200 means the request was fulfilled. Returning 1,904 bytes for /etc/passwd suggests that the server sent the file's contents. Row 4 (status 403) shows that one file was protected, but row 3 was not."
  },
  {
   "id": 48,
   "topic": "5.1",
   "set": "WEB",
   "stem": "Row 5 submits a name that is 4,096 characters long, and the server responds with status 500 (internal error). Which attack is most likely being attempted?",
   "opts": [
    "Directory traversal attack",
    "Denial of service by DNS poisoning",
    "Credential stuffing attack",
    "Buffer overflow attack"
   ],
   "ans": "D",
   "expl": "Sending input much larger than a field expects tries to overflow the memory set aside for it. A server error suggests that the input was not checked for length."
  },
  {
   "id": 49,
   "topic": "5.2",
   "set": "PERMS",
   "stem": "Which file can be read by every user on the server but changed only by its owner?",
   "opts": [
    "lab_grades.xlsx",
    "syllabus.pdf",
    "cleanup",
    "id_rsa"
   ],
   "ans": "B",
   "expl": "syllabus.pdf is rw-r--r--: the owner can read and write, and the group and others can only read. lab_grades.xlsx also lets the group write, and id_rsa is unreadable by anyone but the owner."
  },
  {
   "id": 50,
   "topic": "5.2",
   "set": "PERMS",
   "stem": "The teacher wants lab_grades.xlsx to be readable and writable by the owner, readable by the science group, and not accessible to anyone else. Which command does this?",
   "opts": [
    "chmod 640 lab_grades.xlsx",
    "chmod 444 lab_grades.xlsx",
    "chmod 664 lab_grades.xlsx",
    "chmod 660 lab_grades.xlsx"
   ],
   "ans": "A",
   "expl": "Owner rw- = 4 + 2 = 6, group r-- = 4, others --- = 0, so the number is 640. 664 would let everyone read the file, and 660 would let the group write to it."
  },
  {
   "id": 51,
   "topic": "5.2",
   "set": "PERMS",
   "stem": "What can a user who is not root and not in the admins group do with the program <code>cleanup</code>?",
   "opts": [
    "Read, change, and run it",
    "Run it, but not read or change it",
    "Read it and change it, but not run it",
    "Nothing at all"
   ],
   "ans": "B",
   "expl": "The last group of the string -rwxr-x--x is --x, so other users have execute permission only."
  },
  {
   "id": 52,
   "topic": "5.6",
   "set": "HASH",
   "stem": "Which conclusion is best supported by the hashes?",
   "opts": [
    "The hashes cannot be compared, because only 16 characters are shown.",
    "The installer from Mirror A has been altered, because its hash matches the vendor's.",
    "Both installers are safe, because they have the same file name.",
    "The installer from Mirror B is different from the vendor's file and should not be run."
   ],
   "ans": "D",
   "expl": "Matching hashes show that Mirror A's file is identical to the vendor's. Mirror B's hash is completely different, so its file has been changed, possibly with malware added."
  },
  {
   "id": 53,
   "topic": "5.3",
   "set": "HASH",
   "stem": "The installer is about 80 MB, but each SHA-256 hash is the same length as a hash of a 1 KB text file. Which property of hash functions explains this?",
   "opts": [
    "A hash function produces an output of fixed length, no matter how long the input is.",
    "A hash function encrypts only the first part of a file.",
    "A hash function's output gets longer as the input gets longer.",
    "A hash function compresses files so they can be restored later."
   ],
   "ans": "A",
   "expl": "Cryptographic hash functions always produce a fixed-size digest (256 bits for SHA-256). The hash cannot be reversed or used to rebuild the file."
  },
  {
   "id": 54,
   "topic": "5.1",
   "stem": "A school website's search page shows \"Results for:\" followed by exactly what the user typed. A student finds that searching for <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> makes a pop-up window appear. Which vulnerability exists, and which fix best addresses it?",
   "opts": [
    "Buffer overflow; shorten the page title",
    "Directory traversal; rename the search page",
    "SQL injection; use a larger database server",
    "Cross-site scripting; encode user input before displaying it on the page"
   ],
   "ans": "D",
   "expl": "The page runs script code that came from user input, which is cross-site scripting. Encoding output turns characters such as &lt; into harmless text so the browser displays them instead of running them."
  },
  {
   "id": 55,
   "topic": "5.2",
   "stem": "A military agency labels each document Confidential, Secret, or Top Secret, and gives each person a clearance level. The system, not the document's owner, decides who can open each document by comparing the two labels. Which access control model is this?",
   "opts": [
    "Role-based access control (RBAC)",
    "Mandatory access control (MAC)",
    "Rule-based access control (RuBAC)",
    "Discretionary access control (DAC)"
   ],
   "ans": "B",
   "expl": "In MAC, a central authority sets labels and clearances, and users cannot change them. In DAC, the owner of a resource decides who may access it."
  },
  {
   "id": 56,
   "topic": "5.3",
   "stem": "Two companies want to use symmetric encryption to protect messages sent to each other over the internet. What is the main challenge of using symmetric encryption alone?",
   "opts": [
    "Symmetric encryption cannot protect large files.",
    "Symmetric encryption is much slower than asymmetric encryption.",
    "Each company must publish its secret key on its website.",
    "Both companies need the same secret key, and sharing it safely over the internet is difficult."
   ],
   "ans": "D",
   "expl": "Symmetric encryption is fast, but the same key encrypts and decrypts, so it must be exchanged without being intercepted. This key distribution problem is why asymmetric cryptography is used to set up the shared key."
  },
  {
   "id": 57,
   "topic": "5.3",
   "stem": "Why do websites store users' passwords as hashes instead of encrypting them?",
   "opts": [
    "Hashing makes passwords shorter so users can type them faster.",
    "Hashing is one-way, so even someone who steals the stored values and the system's keys cannot directly recover the passwords.",
    "Hashes can be decrypted when a user forgets the password.",
    "Encryption cannot be used on text."
   ],
   "ans": "B",
   "expl": "Encrypted passwords can be decrypted by anyone who obtains the key. A website only needs to check whether a typed password produces the same hash, so it never needs to store something reversible."
  },
  {
   "id": 58,
   "topic": "5.4",
   "stem": "When a browser connects to a website over HTTPS, asymmetric cryptography is used at the start of the connection, and then symmetric encryption protects the rest. Why is the connection designed this way?",
   "opts": [
    "Using two kinds of encryption doubles the length of the password.",
    "Asymmetric cryptography is faster, so it is used only for large files.",
    "Asymmetric cryptography safely establishes a shared key, and symmetric encryption is much faster for the large amount of data that follows.",
    "Symmetric encryption is used first because it proves the website's identity."
   ],
   "ans": "C",
   "expl": "Public key methods solve the key exchange problem and, with certificates, verify the server's identity. They are slow, so the session switches to a fast symmetric key for the actual data."
  },
  {
   "id": 59,
   "topic": "5.5",
   "stem": "Which change to the document portal's code would best prevent directory traversal attacks?",
   "opts": [
    "Require users to sign in with longer passwords",
    "Accept only file names from an approved list and reject any input containing path characters such as ../",
    "Return status code 404 instead of 403 for blocked requests",
    "Move the portal to a faster web server"
   ],
   "ans": "B",
   "expl": "Input validation with an allow list keeps users from naming files outside the intended folder. Changing error codes or passwords does not stop the request from reading other files."
  },
  {
   "id": 60,
   "topic": "5.6",
   "stem": "A school's database audit log shows that at 3:12 a.m. a staff account that normally views about 30 student records a day exported 48,000 records and sent them to an external file-sharing site. Which conclusion is best supported?",
   "opts": [
    "The activity is normal, because staff accounts are allowed to view student records.",
    "The activity is a likely sign of data exfiltration and should be investigated immediately.",
    "The activity shows a denial-of-service attack against the database.",
    "The activity cannot be suspicious, because the account used a valid password."
   ],
   "ans": "B",
   "expl": "An unusual volume, an unusual time, and an external destination together break the account's baseline. A valid login does not make the activity legitimate, since the account may be compromised or misused."
  }
 ],
 "frq": {
  "title": "Device Security Analysis",
  "device": "ROBO-SRV",
  "intro": "<p>The following sources all come from <b>ROBO-SRV</b>, a Linux server at Lakeview High School with the IP address <code>10.40.8.25</code>. The school's robotics team uses it to run a parts inventory website. The team's coach, <code>mlopez</code>, is the server's administrator. The district's monitoring server, <code>10.40.1.12</code>, checks the health of every school server by connecting to TCP port 9100.</p>\n<p>Use the sources to answer parts A, B, C, D, and E. Label each subpart (i, ii, iii, iv) in your responses.</p>",
  "sources": [
   {
    "title": "Source 1: Firewall rules for ROBO-SRV",
    "html": "<p>Rules are checked in order, and the first matching rule is applied.</p><div class=\"tablewrap\"><table class=\"stim\"><tr><th>Rule</th><th>Action</th><th>Source</th><th>Destination</th><th>Direction</th><th>Port</th><th>Protocol</th></tr><tr><td>1</td><td>Allow</td><td>ALL</td><td>10.40.8.25</td><td>Inbound</td><td>443</td><td>HTTPS</td></tr><tr><td>2</td><td>Allow</td><td>ALL</td><td>10.40.8.25</td><td>Inbound</td><td>80</td><td>HTTP</td></tr><tr><td>3</td><td>Allow</td><td>10.40.2.0/24</td><td>10.40.8.25</td><td>Inbound</td><td>22</td><td>SSH</td></tr><tr><td>4</td><td>Allow</td><td>ALL</td><td>10.40.8.25</td><td>Inbound</td><td>22</td><td>SSH</td></tr><tr><td>5</td><td>Allow</td><td>ALL</td><td>10.40.8.25</td><td>Inbound</td><td>23</td><td>Telnet</td></tr><tr><td>6</td><td>Deny</td><td>10.40.1.0/24</td><td>10.40.8.25</td><td>Inbound</td><td>ALL</td><td>ALL</td></tr><tr><td>7</td><td>Allow</td><td>10.40.1.12</td><td>10.40.8.25</td><td>Inbound</td><td>9100</td><td>Metrics</td></tr><tr><td>8</td><td>Allow</td><td>10.40.2.0/24</td><td>10.40.8.25</td><td>Inbound</td><td>3306</td><td>MySQL</td></tr><tr><td>9</td><td>Deny</td><td>ALL</td><td>ALL</td><td>Inbound</td><td>ALL</td><td>ALL</td></tr></table></div><p class=\"small muted\">10.40.2.0/24 is the staff network (10.40.2.0 to 10.40.2.255). 10.40.1.0/24 is the district data center network.</p>"
   },
   {
    "title": "Source 2: Administrator activity log (excerpt)",
    "html": "<pre class=\"code log\"> 1 - Nov 18 07:30:02 ROBO-SRV sshd: Accepted publickey for mlopez from 10.40.2.31\n 2 - Nov 18 07:30:15 ROBO-SRV sudo: mlopez : COMMAND=/usr/bin/apt update\n 3 - Nov 18 07:31:40 ROBO-SRV sudo: mlopez : COMMAND=/usr/bin/apt upgrade -y\n 4 - Nov 18 07:34:02 ROBO-SRV mlopez: executed command: systemctl restart nginx\n 5 - Nov 18 07:34:09 ROBO-SRV mlopez: executed command: curl -I https://localhost\n 6 - Nov 18 07:36:21 ROBO-SRV mlopez: executed command: ls -l /srv/robotics\n 7 - Nov 18 07:37:00 ROBO-SRV CRON[2210]: (root) CMD (/srv/robotics/backup.sh)\n 8 - Nov 18 07:37:44 ROBO-SRV mlopez: executed command: exit</pre>"
   },
   {
    "title": "Source 3: Authentication and firewall log (excerpt)",
    "html": "<pre class=\"code log\"> 1 - Nov 18 13:02:10 ROBO-SRV sshd: Server listening on 0.0.0.0 port 22\n 2 - Nov 18 13:15:01 ROBO-SRV kernel: [FW BLOCK] SRC=10.40.1.12 DST=10.40.8.25 PROTO=TCP DPT=9100\n 3 - Nov 18 13:15:31 ROBO-SRV kernel: [FW BLOCK] SRC=10.40.1.12 DST=10.40.8.25 PROTO=TCP DPT=9100\n 4 - Nov 18 13:20:04 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50112\n 5 - Nov 18 13:20:05 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50114\n 6 - Nov 18 13:20:05 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50116\n 7 - Nov 18 13:20:06 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50118\n 8 - Nov 18 13:20:07 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50120\n 9 - Nov 18 13:20:07 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50122\n10 - Nov 18 13:20:08 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50124\n11 - Nov 18 13:20:09 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50126\n12 - Nov 18 13:20:10 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50128\n13 - Nov 18 13:20:10 ROBO-SRV sshd: Failed password for mlopez from 198.51.100.77 port 50130\n14 - Nov 18 13:20:31 ROBO-SRV sshd: Connection closed by 198.51.100.77 [preauth]\n15 - Nov 18 13:45:01 ROBO-SRV kernel: [FW BLOCK] SRC=10.40.1.12 DST=10.40.8.25 PROTO=TCP DPT=9100\n16 - Nov 18 14:02:55 ROBO-SRV sshd: Accepted publickey for mlopez from 10.40.2.31</pre>"
   },
   {
    "title": "Source 4: Web server access log (excerpt)",
    "html": "<pre class=\"code log\"> 1 - 10.40.3.77    \"GET /parts?id=12 HTTP/1.1\"                                200  2140\n 2 - 10.40.3.77    \"GET /parts?id=15 HTTP/1.1\"                                200  2088\n 3 - 10.40.2.31    \"GET /admin/orders HTTP/1.1\"                               200  6610\n 4 - 203.0.113.80  \"GET /parts?id=15' HTTP/1.1\"                               500  412\n 5 - 203.0.113.80  \"GET /parts?id=15 OR 1=1-- HTTP/1.1\"                       200  97115\n 6 - 203.0.113.80  \"GET /parts?id=15 UNION SELECT username,password FROM users-- HTTP/1.1\"  200  3307\n 7 - 10.40.3.90    \"GET /parts?id=21 HTTP/1.1\"                                200  2301\n 8 - 10.40.3.90    \"GET /images/motor.png HTTP/1.1\"                           200  18822</pre>"
   },
   {
    "title": "Source 5: File listing",
    "html": "<pre class=\"code log\">$ ls -l /srv/robotics\n-rw-rw-rw-  1 mlopez  robotics   5480  Nov 17 16:20  team_roster.csv\n-rwxr-xr-x  1 mlopez  mlopez      932  Nov 02 08:10  backup.sh\n-rw-r-----  1 mlopez  robotics  22016  Nov 18 07:36  parts_inventory.db\n-rw-------  1 mlopez  mlopez      411  Oct 30 12:05  db_password.txt\n-rw-r--r--  1 mlopez  robotics   1290  Nov 10 10:44  competition_dates.txt</pre><p class=\"small muted\">team_roster.csv contains students' names, grades, and parent phone numbers.</p>"
   },
   {
    "title": "Source 6: Acceptable use policy for school servers",
    "html": "<p><b>Required activities</b></p><ul>\n<li>Administrators must install operating system and software updates at least once a month.</li>\n<li>Administrators must sign in to servers with SSH keys rather than passwords.</li>\n<li>Files containing student information must be readable only by authorized staff.</li></ul>\n<p><b>Permitted activities</b></p><ul>\n<li>Team members may upload photos and parts data through the inventory website.</li>\n<li>Administrators may connect remotely from the staff network.</li></ul>\n<p><b>Prohibited activities</b></p><ul>\n<li>Installing software that is not needed for the server's purpose.</li>\n<li>Sharing administrator passwords or SSH keys.</li>\n<li>Using unencrypted remote access services.</li></ul>"
   }
  ],
  "parts": [
   {
    "label": "A",
    "name": "Policy",
    "prompt": "Consider the acceptable use policy in Source 6.<ol type=\"i\"><li>Explain how one part of the policy helps protect ROBO-SRV.</li><li>Explain how one rule in the current policy could be changed to make ROBO-SRV more secure. Include a specific example in your response.</li></ol>",
    "pts": [
     "(i) Explains how one specific policy item protects the device, connecting the rule to the risk it reduces. Example: requiring SSH keys instead of passwords means password-guessing attacks such as the one in Source 3 cannot sign in. Simply restating a rule (\"updates are required\") does not earn the point.",
     "(ii) Explains a specific change to an existing rule (not a brand-new rule) and how it improves security. Example: change \"updates at least once a month\" to \"security updates within 48 hours, installed automatically,\" which shortens the time known vulnerabilities can be exploited. A change that weakens security does not earn the point."
    ],
    "sample": "(i) The policy requires administrators to sign in with SSH keys rather than passwords. This protects ROBO-SRV because an adversary who guesses or steals a password still cannot sign in without the private key, so password attacks like the one in Source 3 cannot give access.\n(ii) The rule \"install updates at least once a month\" could be changed to \"install critical security updates within 48 hours using automatic updates.\" A vulnerability that is announced the day after an update could otherwise stay open for almost a month, so applying security patches faster reduces the window in which an adversary can exploit known vulnerabilities."
   },
   {
    "label": "B",
    "name": "Password attack",
    "prompt": "Source 3 contains evidence of a password attack in rows 4 through 13.<ol type=\"i\"><li>Describe the evidence in the log that indicates a password attack. Include specific entries from the log in your response.</li><li>Identify the IP address of the adversary.</li></ol>",
    "pts": [
     "(i) Describes repeated failed passwords for the same account (mlopez) from one address within seconds, citing specific rows, for example rows 4 through 13 (10 failures between 13:20:04 and 13:20:10). Pointing to the successful logins in rows 1 or 16 does not earn the point.",
     "(ii) Identifies 198.51.100.77 as the adversary's IP address (one address only, not a port)."
    ],
    "sample": "(i) Rows 4 through 13 show ten \"Failed password for mlopez\" entries from the same address in about six seconds, from 13:20:04 to 13:20:10, each on a new source port. A person typing would not try that many passwords that quickly, so this is an automated attack guessing many passwords for one account (brute force).\n(ii) 198.51.100.77"
   },
   {
    "label": "C",
    "name": "File permissions",
    "prompt": "Consider all of the sources.<ol type=\"i\"><li>Explain how the permission settings for one file in <code>/srv/robotics</code> determine the level of access for the owner, the group, and all other users. Include the name of the file in your response.</li><li>Other than removing all permissions from all users, describe one way the permission settings for one file could be changed to restrict access for some users. Include the name of the file in your response.</li><li>Using your description from part C (ii), write one or more <code>chmod</code> commands that set those permissions.</li></ol>",
    "pts": [
     "(i) Names a file and correctly explains the access of all three classes. Example: parts_inventory.db (-rw-r-----): the owner mlopez can read and write, members of robotics can read only, and all other users have no access.",
     "(ii) Names a file and describes a change that restricts some users while keeping needed access. Example: team_roster.csv should stay readable and writable by mlopez and readable by robotics, with no access for other users, which also meets the policy on student information.",
     "(iii) Writes a correct chmod command that matches the description in (ii), in numeric or symbolic form. Example: chmod 640 /srv/robotics/team_roster.csv (or chmod o-rw,g-w team_roster.csv)."
    ],
    "sample": "(i) parts_inventory.db has the permissions -rw-r-----. The owner, mlopez, can read and write the file (rw-). Members of the robotics group can read it but cannot change it (r--). All other users on the server have no access at all (---).\n(ii) team_roster.csv is currently -rw-rw-rw-, so any user on the server can read or change student names, grades, and parent phone numbers. I would let the owner read and write it, let the robotics group read it only, and remove all access for other users.\n(iii) chmod 640 /srv/robotics/team_roster.csv"
   },
   {
    "label": "D",
    "name": "Firewall",
    "prompt": "Consider all of the sources.<ol type=\"i\"><li>Explain how one connection attempt to ROBO-SRV was blocked by the firewall. Include evidence from a log in your response.</li><li>Other than allowing all traffic for all services, describe a change to one firewall rule that would allow the connection attempt you identified in part D (i).</li><li>Other than allowing that connection attempt, describe one effect of your change from part D (ii) on network traffic to or from ROBO-SRV.</li></ol>",
    "pts": [
     "(i) Explains a blocked connection with log evidence and how the rules caused it. Example: rows 2, 3, and 15 of Source 3 show [FW BLOCK] for the monitoring server 10.40.1.12 on port 9100; rule 6 denies all traffic from 10.40.1.0/24 and is checked before rule 7, so rule 7 is never reached.",
     "(ii) Describes a specific change to one rule that allows this connection without allowing everything. Example: move rule 7 above rule 6, or change rule 6 so it does not include 10.40.1.12.",
     "(iii) Describes a reasonable effect of the change beyond allowing the attempt. Example: the district can now monitor ROBO-SRV's health and alert on problems; port 9100 is reachable only from 10.40.1.12, and the rest of the data center network is still denied by rule 6; or, if rule 6 were deleted instead, other data center devices could reach services like SSH through rule 4."
    ],
    "sample": "(i) Source 3, rows 2, 3, and 15, show \"[FW BLOCK] SRC=10.40.1.12 ... DPT=9100.\" The monitoring server is supposed to connect on port 9100, and rule 7 allows it, but rule 6 denies all traffic from 10.40.1.0/24, which includes 10.40.1.12. Because the first matching rule is applied, rule 6 blocks the connection before rule 7 is ever checked.\n(ii) Swap rule 6 and rule 7 so that the rule allowing 10.40.1.12 on port 9100 comes first.\n(iii) After the change, the district monitoring server can collect ROBO-SRV's health data, so staff are alerted if the server goes down. All other devices in the data center network are still denied by rule 6, so only port 9100 from that one address is opened."
   },
   {
    "label": "E",
    "name": "Another attack",
    "prompt": "Apart from the password attack in part B, there is evidence of another attack on ROBO-SRV.<ol type=\"i\"><li>Determine the type of attack shown in a log.</li><li>Describe specific information in the log that indicates the attack you named in part E (i).</li><li>Describe one way an automated system could stop this type of attack in real time.</li><li>Identify a countermeasure, other than an automated system such as a firewall, IDS, IPS, or AI, that could mitigate, prevent, or deter this attack.</li></ol>",
    "pts": [
     "(i) Determines that the attack is SQL injection.",
     "(ii) Describes specific evidence from Source 4, such as 203.0.113.80 adding a quote that causes a 500 error (row 4), \"OR 1=1--\" returning 97,115 bytes instead of about 2,100 (row 5), or \"UNION SELECT username,password FROM users\" (row 6).",
     "(iii) Describes how an automated system could stop it in real time, for example a web application firewall or IPS that recognizes SQL syntax in request parameters, drops those requests, and blocks the source address.",
     "(iv) Identifies a non-automated countermeasure, such as parameterized queries (prepared statements), server-side input validation that accepts only numbers for id, or giving the website's database account least privilege so it cannot read the users table."
    ],
    "sample": "(i) SQL injection.\n(ii) In Source 4, 203.0.113.80 sends id=15' (row 4), which causes a 500 error, a sign that the quote broke the database query. In row 5, id=15 OR 1=1-- returns 97,115 bytes, about 45 times the size of a normal parts page, which suggests every row of the table was returned. In row 6, the request adds UNION SELECT username,password FROM users to try to read account passwords.\n(iii) A web application firewall could inspect each request and block any parameter containing SQL keywords or characters such as ' OR 1=1 or UNION SELECT, and then block 203.0.113.80 automatically after the first malicious request.\n(iv) The developers could rewrite the parts page to use parameterized queries, so the id value is always treated as data and never as part of the SQL command."
   }
  ]
 }
};
