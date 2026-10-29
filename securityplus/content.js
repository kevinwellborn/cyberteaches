// CompTIA Security+ SY0-801 course content. Domains and weights follow the SY0-801 exam;
// lesson titles, summaries, terms and questions are original.
// Each topic: summary (one paragraph), terms ([word, meaning] pairs). Questions live in questions.js.
window.AP_UNITS = [
  {
    id: 'u1', num: 1, title: 'General Security Concepts', weight: '16%',
    blurb: 'The vocabulary of security: the CIA triad, zero trust, control types, change management, and cryptography.',
    topics: [
      { id: '1.1', title: 'Security Concepts and Controls',
        summary: "Every security decision protects confidentiality (only authorized people can read data), integrity (data is not changed without permission), or availability (systems are there when needed). AAA describes access: authentication proves who you are, authorization decides what you may do, and accounting records what you did, which also supports non-repudiation. Good designs use defense in depth (many imperfect layers instead of one wall), least privilege, and zero trust, where no user or device is trusted just for being inside the network. Controls are sorted two ways. By category: technical, managerial, operational, and physical. By type, meaning what the control does to a threat: preventive, deterrent, detective, corrective, compensating, and directive. On the exam, read what the control is doing in the scenario.",
        terms: [["CIA triad", "Confidentiality, integrity, and availability: the three goals of security."], ["Non-repudiation", "Proof that a specific person took an action, so they cannot deny it later."], ["Defense in depth", "Layering many controls so that when one fails, another still stops the attacker."], ["Zero trust", "A model where no user or device is trusted by default, and every request is verified."], ["Compensating control", "An alternative used when the normal control cannot be put in place."], ["Detective control", "Finds an incident while or after it happens, such as an IDS alert or a log review."]] },
      { id: '1.2', title: 'Change Management and Security',
        summary: "Many outages and security holes come from changes made without a plan. Change management makes changes safe: someone requests the change, owners and stakeholders review its impact, a change advisory board approves it, it is tested, and it is scheduled in a maintenance window with a backout plan in case it fails. Technical details matter too, such as allow and deny lists, restricted activities, required restarts, legacy applications, and dependencies between services. Afterward, documentation, network diagrams, and version control are updated so the next person knows what changed.",
        terms: [["Change advisory board (CAB)", "The group that reviews and approves proposed changes."], ["Backout plan", "Steps to undo a change and return to the last working state if it fails."], ["Maintenance window", "A scheduled time for changes when the impact on users is lowest."], ["Impact analysis", "Studying what a change could affect before approving it."]] },
      { id: '1.3', title: 'Cryptography and PKI',
        summary: "Symmetric encryption, such as AES, uses one shared key and is fast, so it protects bulk data. Asymmetric encryption, such as RSA or ECC, uses a public key and a private key, which solves key sharing. Public key infrastructure (PKI) ties public keys to identities through certificates signed by a certificate authority, and certificates can be revoked through a CRL or checked with OCSP. Hashing turns data into a fixed-length value to check integrity; a salt makes identical passwords hash differently, and key stretching makes guessing slower. A digital signature is a hash signed with a private key. Obfuscation hides data instead: steganography, tokenization, and data masking. Keys are stored in a TPM, HSM, or secure enclave.",
        terms: [["Symmetric encryption", "Encryption that uses the same key to encrypt and decrypt."], ["Asymmetric encryption", "Encryption that uses a public key and a matching private key."], ["Certificate authority (CA)", "A trusted organization that issues and signs digital certificates."], ["Salt", "A random value added to a password before hashing so identical passwords get different hashes."], ["Digital signature", "A hash signed with a private key that proves who sent data and that it was not changed."], ["Hardware security module (HSM)", "A dedicated device that stores and uses cryptographic keys securely."]],
        lab: 'caesar' }
    ]
  },
  {
    id: 'u2', num: 2, title: 'Threats, Vulnerabilities, and Attacks', weight: '24%',
    blurb: 'What threats are, who attacks, how they get in, the weaknesses they use, the signs they leave, and the new threats that come with AI.',
    topics: [
      { id: '2.1', title: 'Threat and Vulnerability Characteristics',
        summary: "A threat is anything that could cause harm, a vulnerability is a weakness it could use, and risk is the chance and cost of that happening, so teams judge each threat by its likelihood and impact. Threat intelligence is knowledge about threats organized so it can be acted on. It comes from open-source reports (OSINT), paid vendor feeds, government advisories, industry sharing groups (ISACs), dark web monitoring, and your own logs, which are the only source that shows what is happening to you. Known vulnerabilities get a CVE identifier and a CVSS score from 0 to 10, but the score alone does not set priority: how exposed and how important the system is matter too.",
        terms: [["Threat", "Anything that could exploit a vulnerability and cause harm."], ["Threat intelligence", "Information about threats and attackers, organized so a team can act on it."], ["ISAC", "Information Sharing and Analysis Center: a group where organizations in one sector share threat information."], ["CVSS", "Common Vulnerability Scoring System: a 0 to 10 score of how severe a vulnerability is."]] },
      { id: '2.2', title: 'Threat Actors and Motivations',
        summary: "A threat actor is whoever is behind an attack. Nation-state actors are well funded and patient, often running advanced persistent threats (APTs) for espionage or disruption. Organized crime wants money, often through ransomware. Hacktivists attack to make a political or social point. Insider threats already have access, either by malice or by mistake. Unskilled attackers use tools other people wrote. Shadow IT is employees using unapproved apps or devices, which creates risk without any bad intent. Describe each actor by its attributes: internal or external, resources and funding, and level of sophistication, and ask what motivates it, such as data theft, money, revenge, or disruption.",
        terms: [["Nation-state actor", "An attacker working for a government, with large resources and long-term goals."], ["Advanced persistent threat (APT)", "A skilled attacker who stays hidden inside a network for a long time."], ["Hacktivist", "An attacker motivated by a political or social cause."], ["Shadow IT", "Technology used inside an organization without the IT department's approval."]] },
      { id: '2.3', title: 'Threat Vectors and Sources',
        summary: "A threat vector is the path an attacker uses to get in. Common vectors include email, text messages (smishing), voice calls (vishing), QR codes that lead to fake sites (quishing), files and images, removable media, vulnerable or unsupported software, unsecured Wi-Fi and Bluetooth, open ports, default credentials, and the supply chain of vendors and service providers. Human vectors use social engineering: phishing, pretexting with a made-up story, impersonation, watering hole attacks on sites the victims visit, typosquatting on look-alike domains, and business email compromise, where an attacker uses a real or spoofed executive account to request payments.",
        terms: [["Threat vector", "The path or method an attacker uses to get into a system."], ["Quishing", "Phishing that uses a QR code to send victims to a malicious site."], ["Business email compromise (BEC)", "An attack that uses a hijacked or spoofed business email account to trick staff into sending money or data."], ["Watering hole attack", "Infecting a website that the target group is known to visit."]],
        labs: ['phish', 'url'] },
      { id: '2.4', title: 'Vulnerabilities and Attack Surfaces',
        summary: "The attack surface is every place a system could be attacked, and each kind of system has its own weaknesses. Applications suffer buffer overflows, memory injection, and race conditions such as time-of-check to time-of-use (TOCTOU). Web apps face injection and cross-site scripting. Operating systems and firmware need patches, and end-of-life hardware stops getting them. Virtual machines can face VM escape, cloud systems are often exposed by misconfiguration such as public storage, and weak or outdated cryptography can be broken. Mobile devices face sideloading and jailbreaking. A zero-day is a flaw attackers use before the vendor has a fix, so layered defenses matter even when everything is patched.",
        terms: [["Attack surface", "All the points where an attacker could try to get into a system."], ["Zero-day", "A vulnerability that is exploited before the vendor has released a fix."], ["Race condition", "A flaw where the result depends on the timing of events, such as TOCTOU."], ["VM escape", "Breaking out of a virtual machine to reach the host or other virtual machines."]] },
      { id: '2.5', title: 'Indicators of Malicious Activity',
        summary: "This objective asks you to read a scenario and name the attack. Malware includes ransomware, trojans, worms, spyware, rootkits, logic bombs, and fileless malware that runs in memory with built-in tools. Physical attacks include brute-forcing doors, RFID cloning, and tailgating. Network attacks include DDoS, on-path, DNS attacks, and credential replay. Application attacks include SQL injection, cross-site scripting, directory traversal, and privilege escalation. Password attacks include brute force, password spraying, and credential stuffing. Look for the indicators: account lockouts, impossible travel, concurrent sessions, blocked content, unusual resource use, out-of-cycle logging, and missing logs.",
        terms: [["Fileless malware", "Malware that runs in memory with legitimate system tools instead of a file on disk."], ["Password spraying", "Trying a few common passwords against many accounts to avoid lockouts."], ["SQL injection", "Putting database commands into an input field so the database runs them."], ["Impossible travel", "Logins from places too far apart to reach in the time between them, a sign of a stolen account."]],
        lab: 'password' },
      { id: '2.6', title: 'AI Threats and Vulnerabilities',
        summary: "New in SY0-801. AI systems can be attacked: data poisoning corrupts training data, model manipulation and evasion make a model give the wrong answer, prompt injection hides instructions in input or in content the model reads, and jailbreaking tricks a model into breaking its safety rules. AI also creates data problems: models can leak sensitive data from their training, context, or connected documents, and raise privacy concerns. Models can hallucinate, show bias, and be hard to explain. Attackers also use AI as a tool for deepfakes and convincing phishing. Defenses include limiting what a model can reach, treating its output as untrusted, protecting training data, and human review of important decisions.",
        terms: [["Prompt injection", "Hiding instructions in input so an AI model ignores its intended rules."], ["Data poisoning", "Corrupting a model's training data so it learns incorrect or harmful behavior."], ["Jailbreaking (AI)", "Tricking an AI model into ignoring its safety rules."], ["Hallucination", "An AI output that sounds confident but is false or made up."], ["Deepfake", "AI-generated audio, image, or video that convincingly imitates a real person."], ["Explainability", "How well people can understand why an AI model produced a result."]] }
    ]
  },
  {
    id: 'u3', num: 3, title: 'Security Architecture', weight: '19%',
    blurb: 'Designing secure systems: architecture models, secure infrastructure, data protection, and resilience.',
    topics: [
      { id: '3.1', title: 'Architecture Models',
        summary: "Where a system runs changes how it is secured. In the cloud, the shared responsibility model splits duties: the provider secures the physical data center, and the customer secures more as they move from SaaS to PaaS to IaaS. Infrastructure as code (IaC) builds systems from templates so they are consistent. Serverless and microservices break apps into small pieces, and containers package apps with what they need. Networks can be on-premises, hybrid, or air-gapped. Operational technology, such as industrial control systems (ICS/SCADA), IoT, and embedded or real-time systems, is hard to patch, so it is often isolated.",
        terms: [["Shared responsibility model", "How security duties are split between a cloud provider and its customer."], ["Infrastructure as code (IaC)", "Building and configuring systems from code templates instead of by hand."], ["Air-gapped", "Physically separated from other networks, including the internet."], ["Operational technology (OT)", "Systems that monitor and control physical equipment, such as industrial control systems."]] },
      { id: '3.2', title: 'Infrastructure Security Architecture',
        summary: "Networks are divided into security zones, such as a screened subnet (DMZ) for public servers, so a breach in one zone does not reach everything. Device placement and failure modes matter: a device that fails open keeps traffic flowing, while one that fails closed blocks it. Firewalls filter traffic, from packet filters to next-generation firewalls (NGFW) and web application firewalls (WAF). Intrusion detection systems (IDS) alert, while intrusion prevention systems (IPS) sit inline and block. VPNs and IPsec protect traffic over untrusted networks, 802.1X checks devices before they join, and jump servers and proxies control admin and web access. Security Service Edge (SSE) delivers these protections from the cloud for remote users.",
        terms: [["Screened subnet", "A network zone between the internet and the internal network for public-facing servers, also called a DMZ."], ["Fail closed", "When a security device fails, it blocks traffic instead of letting it through."], ["IPS", "An intrusion prevention system that sits inline and blocks detected attacks."], ["Jump server", "A hardened server that admins connect to first before reaching sensitive systems."]],
        lab: 'firewall' },
      { id: '3.3', title: 'Data Protection',
        summary: "Data needs protection in all three states: at rest (stored on a disk), in transit (moving over a network), and in use (being processed in memory). Organizations classify data, such as public, confidential, or restricted, so they know how carefully to handle it. Data types include regulated data, trade secrets, and intellectual property, and data sovereignty laws can require data to stay in a certain country. Protection methods include encryption, hashing, masking, tokenization, permission restrictions, and segmentation. Data loss prevention (DLP) watches for sensitive data leaving where it should not.",
        terms: [["Data at rest", "Data stored on a drive, database, or backup."], ["Data in transit", "Data moving across a network."], ["Data sovereignty", "The rule that data is subject to the laws of the country where it is stored."], ["Data loss prevention (DLP)", "Tools that detect and block sensitive data from leaving the organization."]] },
      { id: '3.4', title: 'Resilience and Recovery',
        summary: "Resilience means staying available when something fails. High availability uses clustering and load balancing so one failed server does not take down a service. Redundant power uses a UPS for short outages and generators for long ones. Recovery sites range from hot (ready to run right away) to warm (some equipment) to cold (just space and power). Backups can be full, incremental, or differential, and copies should be kept offsite and tested. Snapshots, replication, and journaling help restore data quickly. Plans are tested with tabletop exercises, failover tests, and simulations.",
        terms: [["Hot site", "A fully equipped backup location that can take over almost immediately."], ["Load balancing", "Spreading work across several servers so none is overloaded and one can fail safely."], ["UPS", "An uninterruptible power supply: a battery that keeps equipment running during short outages."], ["Tabletop exercise", "A discussion-based walk-through of how a team would respond to a scenario."]] }
    ]
  },
  {
    id: 'u4', num: 4, title: 'Security Operations', weight: '27%',
    blurb: 'The day-to-day work: hardening and mitigation, assets, vulnerabilities, monitoring, identity, automation, incident response, and investigations.',
    topics: [
      { id: '4.1', title: 'Mitigating Controls and Hardening',
        summary: "In SY0-801, mitigation moves into security operations. Hardening reduces the attack surface: change default passwords, remove unneeded software, disable unused ports and services, and apply secure baselines. Segmentation and isolation keep problems contained, and an application allow list lets only approved programs run. Patching fixes known vulnerabilities. Endpoint detection and response (EDR) and host-based firewalls protect devices, and mobile device management (MDM) enforces settings on phones and tablets. Least privilege gives every account only the access it needs, and decommissioning shuts down old systems safely.",
        terms: [["Hardening", "Reducing a system's attack surface by removing or disabling what it does not need."], ["Secure baseline", "A standard, approved configuration that systems are built and checked against."], ["Application allow list", "A list of approved programs; anything not on it is blocked."], ["Least privilege", "Giving users and systems only the access they need to do their job."]] },
      { id: '4.2', title: 'Asset Management',
        summary: "You cannot protect what you do not know you have. Asset management tracks hardware, software and data from purchase to disposal. Every asset gets an owner and a classification, and an inventory is kept up to date with automated discovery. When equipment is retired, data must be destroyed properly through sanitization (overwriting or wiping), destruction (shredding, degaussing, or incineration), and a certificate of destruction for proof. Data retention rules say how long records must be kept before they can be destroyed.",
        terms: [["Asset inventory", "An up-to-date list of the organization's hardware, software, and data."], ["Sanitization", "Removing data from media so it cannot be recovered, such as by overwriting."], ["Degaussing", "Using a strong magnet to erase data on magnetic media."], ["Certificate of destruction", "A document from a vendor proving that media was destroyed."]] },
      { id: '4.3', title: 'Vulnerability Management',
        summary: "Vulnerability management is a cycle: identify, analyze, respond, and verify. Teams find weaknesses with vulnerability scans, application testing, threat feeds, penetration tests, and bug bounty programs. Each finding is checked for false positives, then prioritized using the CVSS score, the CVE identifier, how exposed the system is, and how important it is to the business. Responses include patching, compensating controls, segmentation, insurance, or formally accepting the risk with an exception. A rescan confirms the fix worked, and results are reported to leadership.",
        terms: [["CVE", "Common Vulnerabilities and Exposures: a public ID number for a known vulnerability."], ["CVSS", "Common Vulnerability Scoring System: a 0 to 10 score of how severe a vulnerability is."], ["False positive", "A scan result that reports a vulnerability that is not really there."], ["Bug bounty", "A program that pays outside researchers for responsibly reporting vulnerabilities."]] },
      { id: '4.4', title: 'Monitoring and Alerting',
        summary: "Security teams watch systems, applications and networks for signs of trouble. A SIEM (security information and event management) system collects logs from many sources, correlates events, and raises alerts. Agents on endpoints send data to the SIEM, while NetFlow shows who talked to whom on the network. Alerts are tuned to reduce false positives, and important ones are escalated. Other tools include antivirus, DLP, SNMP traps, vulnerability scanners, and SCAP for checking configurations against benchmarks. Logs should be archived so they are available for investigations.",
        terms: [["SIEM", "A system that collects and correlates logs from many sources and raises security alerts."], ["Alert tuning", "Adjusting rules so alerts catch real problems without too many false positives."], ["NetFlow", "Network data that records which systems communicated, when, and how much."], ["SCAP", "Security Content Automation Protocol: standards for automatically checking system configurations."]],
        lab: 'logs' },
      { id: '4.5', title: 'Identity and Access Management',
        summary: "Identity and access management (IAM) controls who gets in and what they can do. Accounts are provisioned when people join and deprovisioned when they leave. Multifactor authentication (MFA) combines something you know, have, are, or somewhere you are. Single sign-on (SSO) and federation with SAML or OpenID Connect let one login reach many apps, even across organizations. Access control models include role-based (RBAC), attribute-based (ABAC), mandatory (MAC) and discretionary (DAC). Privileged access management (PAM) adds just-in-time access and password vaulting for admins. Watch for privilege creep, where users collect access they no longer need, and use group managed service accounts (gMSA) so service account passwords rotate automatically.",
        terms: [["Multifactor authentication (MFA)", "Logging in with two or more different kinds of factors, such as a password and a phone."], ["Single sign-on (SSO)", "One login that gives access to many applications."], ["Privilege creep", "A user slowly collecting more access than their current job needs."], ["Privileged access management (PAM)", "Tools that tightly control and monitor admin accounts, such as just-in-time access."]],
        lab: 'password' },
      { id: '4.6', title: 'Automation, Orchestration, and Defensive AI',
        summary: "Automation lets a security team handle more with less effort and fewer mistakes. Scripts and playbooks can create accounts, enforce guardrails, open tickets, and respond to common alerts the same way every time. SOAR (security orchestration, automation and response) ties tools together so one alert can trigger many steps. New in SY0-801, AI helps defenders: chatbots answer staff questions, predictive analytics and behavioral baselines spot unusual activity, and agentic AI can take response steps on its own. Automation has risks too, such as complexity, cost, a single point of failure, and technical debt, so people still need to oversee it.",
        terms: [["SOAR", "Security orchestration, automation and response: tools that connect security systems and automate responses."], ["Playbook", "A step-by-step response plan, often automated, for a type of incident."], ["Agentic AI", "AI that can plan and take actions on its own to reach a goal."], ["Behavioral baseline", "A record of normal activity used to spot unusual behavior."]] },
      { id: '4.7', title: 'Incident Response',
        summary: "An incident response plan tells everyone what to do when an attack happens. The process runs through preparation, detection, analysis, containment, eradication, recovery, and lessons learned. Containment stops the damage from spreading, for example by isolating a host. Eradication removes the cause, recovery returns systems to normal, and lessons learned improves the plan. Teams practice with tabletop exercises and simulations, and use threat hunting to look for attackers before an alert fires. Root cause analysis finds the real reason an incident happened so it does not happen again.",
        terms: [["Containment", "Limiting an incident so it cannot spread, for example by isolating an infected host."], ["Eradication", "Removing the cause of an incident, such as malware or a compromised account."], ["Lessons learned", "The final review after an incident that improves future response."], ["Threat hunting", "Actively searching for hidden attackers instead of waiting for an alert."]] },
      { id: '4.8', title: 'Investigations and Digital Forensics',
        summary: "Investigations depend on data sources: firewall, application, endpoint, operating system and network logs, packet captures, vulnerability scans, and dashboards. Digital forensics collects evidence so it can be trusted. Collect the most volatile data first, starting with memory before the disk, because it disappears when power is lost. Make a bit-for-bit image and hash it to prove it has not changed. Keep a chain of custody that records everyone who handled the evidence. A legal hold stops data from being deleted when it may be needed for a lawsuit, and e-discovery finds relevant electronic records.",
        terms: [["Chain of custody", "A record of everyone who handled evidence, proving it was not tampered with."], ["Order of volatility", "Collecting the evidence that disappears fastest, such as memory, first."], ["Legal hold", "An instruction to preserve data that may be needed for legal action."], ["Packet capture", "A recording of network traffic that can be analyzed later."]],
        lab: 'logs' }
    ]
  },
  {
    id: 'u5', num: 5, title: 'Security Program Management and Oversight', weight: '14%',
    blurb: 'Running security as a program: governance, risk, vendors, compliance, audits, and security awareness.',
    topics: [
      { id: '5.1', title: 'Security Governance',
        summary: "Governance is how an organization sets direction and holds people accountable for security. Policies state high-level rules, such as an acceptable use policy. Standards set specific required settings, such as password length, and procedures give step-by-step instructions, such as onboarding or incident response playbooks. Guidelines are recommendations. Governance can be run by boards and committees, and roles matter: the data owner is accountable for data, the data controller decides how it is used, the data processor handles it for the controller, and the data custodian manages it day to day.",
        terms: [["Acceptable use policy (AUP)", "Rules for how employees may use the organization's systems and network."], ["Standard", "A specific, required rule or setting that supports a policy."], ["Data owner", "The senior person accountable for a set of data and how it is classified."], ["Data custodian", "The person or team that manages and protects data day to day."]] },
      { id: '5.2', title: 'Risk Management',
        summary: "Risk management finds, measures, and treats risk. Risk assessments can be qualitative (high, medium, low) or quantitative (in dollars). The quantitative formulas are: single loss expectancy (SLE) equals asset value times exposure factor, and annualized loss expectancy (ALE) equals SLE times the annualized rate of occurrence (ARO). A risk register lists risks, owners and key risk indicators. Risk is treated four ways: transfer it (insurance), accept it, avoid it (stop the activity), or mitigate it (add controls). Risk appetite and tolerance describe how much risk leaders will take. A business impact analysis sets the recovery time objective (RTO) and recovery point objective (RPO).",
        terms: [["Annualized loss expectancy (ALE)", "Expected yearly loss from a risk: SLE multiplied by ARO."], ["Risk register", "A list of identified risks with their owners, ratings, and responses."], ["Risk transference", "Shifting the cost of a risk to someone else, such as an insurer."], ["Recovery time objective (RTO)", "The longest a system can be down before the impact is unacceptable."]] },
      { id: '5.3', title: 'Third-Party Risk and Procurement',
        summary: "Vendors and suppliers can bring risk into an organization, as supply chain attacks have shown. Before buying, organizations assess vendors with questionnaires, due diligence, and the right-to-audit clause. SY0-801 adds procurement vocabulary for evaluating vendors and products. Agreements set expectations: a service-level agreement (SLA) defines performance, a memorandum of understanding (MOU) and memorandum of agreement (MOA) describe how parties will work together, a master service agreement (MSA) sets general terms, a statement of work (SOW) defines a specific job, and a non-disclosure agreement (NDA) protects confidential information. Vendors are monitored for as long as the relationship lasts.",
        terms: [["Supply chain attack", "Compromising a target by attacking a vendor, product, or update it relies on."], ["Service-level agreement (SLA)", "A contract that defines the level of service a vendor must provide, such as uptime."], ["Right-to-audit clause", "A contract term that lets a customer audit the vendor's security."], ["Non-disclosure agreement (NDA)", "A contract that requires parties to keep shared information confidential."]] },
      { id: '5.4', title: 'Compliance and Privacy',
        summary: "Compliance means following laws, regulations, contracts and internal policies. Organizations monitor their own compliance and report it internally and externally. Failing can mean fines, sanctions, loss of a license, or reputational damage. Privacy laws such as the GDPR protect personal data. Key ideas include the data subject (the person the data is about), the right to be forgotten, data inventory and retention, and attestations from leaders that controls are in place. Payment card data must follow PCI DSS, and health data in the United States follows HIPAA.",
        terms: [["Compliance", "Meeting the requirements of laws, regulations, contracts, and policies."], ["Data subject", "The person whom personal data is about."], ["Right to be forgotten", "A person's right under laws such as the GDPR to have their personal data deleted."], ["Attestation", "A formal statement that controls are in place and working."]] },
      { id: '5.5', title: 'Audits, Assessments, and Penetration Testing',
        summary: "Audits and assessments check whether security works. They can be internal (self-assessments, internal audit) or external (regulators, independent third parties). A penetration test is an authorized simulated attack. Testers may know everything about the environment (known environment), something (partially known), or nothing (unknown environment). Rules of engagement set the scope, timing and limits. Red teams attack, blue teams defend, and purple teams work together. Testers gather information through passive and active reconnaissance, and frameworks such as MITRE ATT&CK, the Cyber Kill Chain and the Diamond Model describe how attackers operate.",
        terms: [["Penetration test", "An authorized, simulated attack to find weaknesses before real attackers do."], ["Rules of engagement", "The agreed scope, timing, and limits of a penetration test."], ["Unknown environment test", "A penetration test where the testers start with no inside information."], ["MITRE ATT&CK", "A public knowledge base of attacker tactics and techniques."]] },
      { id: '5.6', title: 'Security Awareness',
        summary: "People are often the easiest way in, so training matters. Security awareness programs teach staff to spot phishing, report suspicious activity, handle passwords and data correctly, and work securely from home. Phishing campaigns send safe, simulated phishing emails to measure who clicks and to give extra training. Training should cover insider threats, social engineering, removable media, and operational security. Good programs are ongoing, include everyone, and measure results, such as fewer clicks and more reports over time.",
        terms: [["Security awareness training", "Teaching staff to recognize and report threats and follow security practices."], ["Phishing simulation", "A safe, fake phishing email sent to staff to measure and improve awareness."], ["Operational security (OPSEC)", "Protecting small pieces of information that attackers could combine."], ["Reporting culture", "An environment where people feel safe reporting mistakes and suspicious activity."]],
        lab: 'phish' }
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

// Leave title empty to hide every book section.
window.AP_BOOK = {
  title: "CompTIA Security+ SY0-801 Study Guide",
  author: 'Kevin Wellborn',
  tagline: 'Understand the concepts. Practice the decisions. Includes the new SY0-801 topics.',
  description: 'Every SY0-801 exam objective explained in 21 chapters, with scenarios, case studies, and practice questions. 136 explanatory figures, detailed answer explanations, and a 90-question practice exam. Each chapter links to the matching CyberTeaches video lessons.',
  buyUrl: 'https://www.amazon.com/dp/B0HNDS8HNL',
  cover: 'book-cover.jpg',
  chapters: {
    '1.1': 'Chapter 1, Security Concepts and Controls',
    '1.2': 'Chapter 2, Change Management and Security',
    '1.3': 'Chapter 3, Cryptography and PKI',
    '2.1': 'Chapter 4, Threats, Threat Actors, and Motivations',
    '2.2': 'Chapter 4, Threats, Threat Actors, and Motivations',
    '2.3': 'Chapter 5, Threat Vectors and Sources',
    '2.4': 'Chapter 6, Vulnerabilities and Attack Surfaces',
    '2.5': 'Chapter 7, Indicators of Malicious Activity',
    '2.6': 'Chapter 8, AI Threats and Vulnerabilities',
    '3.1': 'Chapter 9, Architecture Models',
    '3.2': 'Chapter 10, Securing Enterprise Infrastructure',
    '3.3': 'Chapter 11, Protecting Data',
    '3.4': 'Chapter 12, Resilience and Recovery',
    '4.1': 'Chapter 13, Mitigation and Hardening Techniques',
    '4.2': 'Chapter 14, Asset and Vulnerability Management',
    '4.3': 'Chapter 14, Asset and Vulnerability Management',
    '4.4': 'Chapter 15, Security Alerting and Monitoring',
    '4.5': 'Chapter 16, Identity and Access Management',
    '4.6': 'Chapter 17, Automation and Orchestration',
    '4.7': 'Chapter 18, Incident Response and Investigations',
    '4.8': 'Chapter 18, Incident Response and Investigations',
    '5.1': 'Chapter 19, Governance and Compliance',
    '5.2': 'Chapter 20, Risk Management and Third-Party Risk',
    '5.3': 'Chapter 20, Risk Management and Third-Party Risk',
    '5.4': 'Chapter 19, Governance and Compliance',
    '5.5': 'Chapter 21, Audits, Assessments, and Security Awareness',
    '5.6': 'Chapter 21, Audits, Assessments, and Security Awareness'
  }
};

// CyberTeaches YouTube videos: map from topic id to a YouTube link or video id.
// CyberTeaches Security+ videos, from the Security+ Full Course playlist on YouTube.
// Each lesson lists [video id, title, length]; the first one plays in the lesson.
window.AP_VIDEOS = {
  channelUrl: 'https://www.youtube.com/playlist?list=PLQGjMvGO2D8uOGT3RuDNPXPuziXNm3Zh9',
  note: 'These videos were recorded for SY0-701. Where they differ from SY0-801, the lesson and the book are correct.',
  topics: {
    '1.1': [
      ["yWyOercgA4g", "CIA Triad and AAA", "7:59"],
      ["gX0kG0Vl7TI", "Security Controls", "3:16"],
      ["6LKw5ejcjQE", "Gap Analysis and Zero Trust", "3:26"],
      ["iOJC9gQFFZ4", "Deception and Disruption Technology", "2:35"]
    ],
    '1.2': [
      ["NgK-X95aD-E", "Change Management: Business Processes", "3:48"],
      ["97sjVsKWaT4", "Change Management: Technical Implications", "3:32"],
      ["NDyu5LEhHIo", "Change Management: Documentation and Version Control", "3:43"]
    ],
    '1.3': [
      ["7aQ7ERnO7_U", "Encryption", "3:07"],
      ["mSoIsAkXTWw", "Public Key Infrastructure (PKI)", "2:24"],
      ["A9Om3-949t4", "Digital Certificates", "4:34"],
      ["LR-V_Mf9cPE", "Hashing, Digital Signatures, and Blockchain", "4:01"],
      ["vR686JLhLpo", "Obfuscation and Steganography", "3:02"],
      ["PxkSHAF-bRs", "Cryptographic Tools", "2:43"]
    ],
    '2.1': [
      ["lTyuVPyVCiA", "Identifying Vulnerabilities", "3:49"]
    ],
    '2.2': [
      ["Hygr8N8bKF4", "Threat Actors", "3:27"]
    ],
    '2.3': [
      ["ZVmJat4ldUU", "Common Attack Surfaces", "5:38"],
      ["kfeXZ8OJ704", "Principles of Social Engineering", "3:37"],
      ["mBRYLSNipns", "Phishing and Spam", "3:40"],
      ["nIKGaZdCWqQ", "Misinformation and Impersonation", "2:49"],
      ["qiBjJIDsx9U", "Watering Hole Attacks and Typosquatting", "3:18"],
      ["6R-tO8arNpg", "Wireless Devices", "3:40"]
    ],
    '2.4': [
      ["VqKPlZcVOIo", "Application Vulnerabilities", "3:05"],
      ["HYft3sHrENs", "OS and Web-Based Vulnerabilities", "4:44"],
      ["jXqLwalnS7U", "Hardware and Virtualization Vulnerabilities", "3:30"],
      ["aiboO2ywGMk", "Supply Chain, Zero-Day, and Cryptographic Vulnerabilities", "4:40"],
      ["Bosj4GCISBs", "Mobile Solutions", "3:08"]
    ],
    '2.5': [
      ["224FtzbpOv4", "Indicators of Malicious Activity", "3:37"],
      ["0ODbcHnHOf8", "Malware", "4:10"],
      ["eZzvmyv9NVo", "Ransomware", "3:26"],
      ["xTA2mIAw67M", "Trojans, Backdoors, and RATs", "3:19"],
      ["SKtvuoAiGz0", "Viruses, Worms, Spyware & Adware", "3:32"],
      ["m3mJgSlxek8", "Keyloggers", "3:04"],
      ["ifeTvbB4tQQ", "Logic Bombs & Rootkits", "3:12"],
      ["s5i8u075Y8Y", "Physical Attacks", "3:11"],
      ["VkSV6gF3VzE", "DoS and DDoS Attacks", "3:23"],
      ["GFHEsOA5mFE", "DNS Attacks", "3:48"],
      ["O9UVOB5vnZ8", "Wireless, On-Path, and Replay Attacks", "3:05"],
      ["CG0eJ7hr2g4", "Password Attacks", "2:33"],
      ["DVOpjbOiRjY", "Cryptographic Attacks", "2:30"],
      ["BA9_AK_LNiY", "WannaCry Ransomware Attack Explained", "5:01"]
    ],
    '3.1': [
      ["gR2rHvk6nVA", "Architecture Considerations", "3:15"],
      ["DX_9-nEZR_s", "Architecture and Infrastructure Concepts", "4:17"]
    ],
    '3.2': [
      ["fyZIUe16qW0", "Infrastructure Considerations", "4:31"],
      ["ilp2tdo7lFU", "Firewalls, IDS/IPS & Web Filters", "4:14"],
      ["2q7XiEIen8I", "Network Appliances", "3:16"],
      ["S64TwhDJJ2g", "Secure Communication, Access & Effective Controls", "3:19"]
    ],
    '3.3': [
      ["35COFv1PKj0", "Data Classification and Types", "3:53"],
      ["Cucv4F_2ES0", "Data Sovereignty and Protection", "3:50"]
    ],
    '3.4': [
      ["IU35IYNslOc", "Resilience and Recovery (Part 1)", "4:31"],
      ["rrJK798ylL0", "Resilience and Recovery (Part 2)", "4:04"]
    ],
    '4.1': [
      ["hRlnxfC3ff8", "Mitigation Techniques", "3:22"],
      ["yVebvae2f50", "Hardening Techniques", "2:39"],
      ["q1xmSydXavY", "Hardening Targets and Secure Baselines", "8:42"],
      ["mCVcXxu5MIM", "Endpoint Security: OS & Monitoring", "3:14"],
      ["oyQJdP_Jzjg", "Endpoint Security: Protocol & Email Security", "3:50"],
      ["QHbYVm4yDaM", "Application Security", "3:22"]
    ],
    '4.2': [
      ["WLayI4WNVcc", "Data Asset Management", "7:00"]
    ],
    '4.3': [
      ["n5mQaGQq1XQ", "Vulnerability Management", "5:55"],
      ["lTyuVPyVCiA", "Identifying Vulnerabilities", "3:49"]
    ],
    '4.4': [
      ["-ux051X3H1g", "Monitoring Resources", "3:36"],
      ["tDx9LvoEQXo", "Monitoring Tools", "2:35"]
    ],
    '4.5': [
      ["cf6aqYKBN8M", "Access Management", "4:36"],
      ["PQTRo16aeKc", "Multifactor Authentication (MFA)", "4:02"],
      ["sTF5B-Du1o0", "Passwords", "2:47"]
    ],
    '4.6': [
      ["rFaEw8vySLA", "Scripting and Automation", "3:46"]
    ],
    '4.7': [
      ["1lsoe2nVTmo", "Incident Response", "5:03"]
    ],
    '4.8': [
      ["BgcPBqs8hpo", "Security Logs", "4:38"]
    ],
    '5.1': [
      ["itMvg2V4puU", "Security Governance", "5:27"]
    ],
    '5.2': [
      ["K9b_O-sjSkk", "Risk Management", "5:27"]
    ],
    '5.3': [
      ["e1SYHjjndTs", "Third-Party Vendor Risk", "3:46"]
    ],
    '5.4': [
      ["HukYFSgOjdI", "Security Compliance", "4:41"]
    ],
    '5.5': [
      ["PGmsn4sI_lw", "Audits and Attestation", "3:54"],
      ["rryQtocirCU", "Penetration Testing (Pentesting)", "3:22"]
    ],
    '5.6': [
      ["safQq6DYdT0", "Security Awareness", "3:34"],
      ["91aDKN1HcvA", "Phishing Awareness", "3:14"]
    ]
  }
};
