// CyberPatriot High School course: unit data for tools/build-cyberpatriot.js.
// The full materials live in Kevin's Google Drive folder "CyberPatriot High School Course".
// Each `files` id is a Google Drive file id. Student files appear on the unit page; teacher files
// (lesson plan, quiz, keys, setup scripts) appear only in the teacher area.
// After editing, run:  node tools/build-cyberpatriot.js

module.exports = [
  {
    n: 1,
    title: 'Welcome to CyberPatriot and Cyber Ethics',
    short: 'Welcome to CyberPatriot',
    weeks: 2,
    sessions: '4 lessons (50 min) and 2 practice sessions (90 min)',
    standards: 'CSTA 3A-NI-05, 3A-NI-06, 3A-IC-24 · NICE: Cyber Defense Analysis',
    os: 'Windows',
    lead: 'Learn how a CyberPatriot round works, the CIA triad, and the legal and ethical limits of security work. Then open your first practice image and fix your first vulnerabilities.',
    goals: [
      'Describe how a CyberPatriot round works: teams, images, the README, scoring, and penalties.',
      'Explain the CIA triad (confidentiality, integrity, availability) and give an example of each.',
      'Tell the difference between a threat, a vulnerability, and a risk.',
      'Explain the legal and ethical limits of security work and the competition code of conduct.',
      'Find and fix at least 3 basic vulnerabilities on a practice Windows virtual machine.'
    ],
    schedule: [
      ['Lesson 1', 'What is CyberPatriot?', 'Team expectations card'],
      ['Lesson 2', 'Security foundations: CIA triad, threats, vulnerabilities, risk', 'CIA triad sorting activity'],
      ['Practice 1', 'Lab: first look at a practice image', '3 or more fixes'],
      ['Lesson 3', 'Cyber ethics and the law', 'Signed code of conduct'],
      ['Lesson 4', 'Round-day workflow and the checklist habit', 'Starter checklist filled in'],
      ['Practice 2', 'Quiz, timed lab redo, team debrief', 'Quiz score, faster lab time']
    ],
    lab: {
      title: 'Lab 1: First Look at a Practice Image',
      text: 'In pairs, students read the README for a front-office Windows computer, answer the forensics question first, then check users, passwords, the firewall, and banned media files. The goal is at least 3 of the 8 planted problems in 60 minutes, then a 45-minute timed redo.'
    },
    checklist: [
      ['Read the whole README before changing anything', 'Note authorized users, admins, and required services'],
      ['Answer forensics questions first', 'Desktop files; type the answer on the ANSWER line and save'],
      ['Remove users the README does not list', 'Settings, Accounts, Other users, or net user'],
      ['Turn off the Guest account', 'net user guest /active:no'],
      ['Turn the firewall on', 'Windows Security, Firewall and network protection']
    ],
    vocab: ['image', 'README', 'scoring report', 'forensics question', 'penalty', 'round', 'CIA triad', 'threat', 'vulnerability', 'risk'],
    ethics: 'You find your friend\'s password on a sticky note. Is it okay to log in just to prove a point?',
    files: {
      slides: '1xbJ-_5JSCxzn573hHG8so26TWgf5o7QzXbItGEYq3Z0',
      lab: '1UBx3fylwNQ2clahyHNS2gYFi6s-AbRVeYSR4XnR5MjA',
      checklist: '116PthXe49srkfVkYvTHqCuwFmKM--EMg3QwcI3rAVR8',
      handouts: '17wIKjpOGLZDTDzKvh5lMvprawGrXVDwAwtL7iYF4vAs',
      plan: '1V5Iv_ik81xHLf34yn6NL5L7WLlwLFEvDIgD9cUbMrdg',
      labkey: '1RbxMVRQ2yC6daEnldfpJh3P6dl-GIS0g9HgCe2PueJs',
      quiz: '1gofbzYB1ls0l0FUziHgMpu2PrnL68yRHpqxsS62lh8E',
      quizkey: '1DynkROHKWJJoNLF9Zxm8E5_GDqE2RDTAMjWbYIbRo3U'
    }
  },
  {
    n: 2,
    title: 'Computer and Security Foundations',
    short: 'Computer and security foundations',
    weeks: 1,
    sessions: '2 lessons (50 min) and 1 practice session (90 min)',
    standards: 'CSTA 3A-CS-02, 3A-CS-03, 3A-NI-05 · NICE: Systems Administration',
    os: 'Windows or Ubuntu',
    lead: 'Learn the vocabulary every later unit uses: hardware, operating systems, users, permissions, least privilege, and common threats. Then build the virtual machine you will practice on all year.',
    goals: [
      'Name the main parts of a computer and explain what an operating system does.',
      'Explain user accounts, administrator rights, and file permissions, and why least privilege matters.',
      'Describe common threats: malware, phishing, weak passwords, and unpatched software.',
      'Create, start, snapshot, and restore a virtual machine in VirtualBox or VMware.'
    ],
    schedule: [
      ['Lesson 1', 'Hardware, operating systems, users, and permissions', 'Least-privilege exit ticket'],
      ['Lesson 2', 'Common threats and how defenders respond', 'Threat match-up'],
      ['Practice', 'Lab: build your own virtual machine', 'A working VM with a snapshot']
    ],
    lab: {
      title: 'Lab 2: Build Your Own Virtual Machine',
      text: 'Each student or pair creates a VM, installs Windows or Ubuntu, takes a snapshot, breaks something on purpose, and restores the snapshot. If installs are slow, import a ready-made .ova and focus on snapshots.'
    },
    checklist: [
      ['Take a snapshot before you start practicing', 'VirtualBox: Machine, Take Snapshot'],
      ['Check who has administrator rights', 'Only the people the README names'],
      ['Make sure antivirus is on', 'Windows Security, Virus and threat protection']
    ],
    vocab: ['CPU', 'RAM', 'operating system', 'virtual machine', 'hypervisor', 'snapshot', 'administrator', 'permission', 'least privilege', 'malware', 'ransomware', 'phishing', 'patch'],
    ethics: 'You find a USB stick in the parking lot labeled Teacher Grades. Do you plug it in?',
    files: {
      slides: '15HqV4VBiAV347mmDojr-iNu20F_LsEKwXeCAZkVPtO4',
      lab: '1Hhs4kwH1CjLv4ICnDXkChkyzDR6D8tcZZJpSNaznxWY',
      plan: '1geaVnZUfxqZUSklTFn4M4NSFsIA-8scLxHD9s2GAP7I',
      labkey: '1PeuEdZvB6FS3CBG1zAx90ZKDOYPEERQbmO9SRUpKmA4',
      quiz: '1lvsnyDHveAXh3OMdF_tWc-i57bXGDoyWN6zsacMwBzw',
      quizkey: '1BDZKdVsJRbQ2RVZhhcHP3qS2k71C_JY2G3uNUvUr0fQ'
    }
  },
  {
    n: 3,
    title: 'Windows Hardening, Part 1: Users, Passwords, and Updates',
    short: 'Windows hardening, part 1',
    weeks: 2,
    sessions: '4 lessons (50 min) and 2 practice sessions (90 min)',
    standards: 'CSTA 3A-NI-06, 3B-NI-04 · NICE: Systems Administration, Cyber Defense Infrastructure Support',
    os: 'Windows 10/11',
    lead: 'User accounts and password policy are the most reliable points in every Windows round. Learn the Windows admin tools, audit users and groups against a README, set password and lockout policy, and keep Windows Update working.',
    goals: [
      'Find and use the main Windows admin tools: Settings, Computer Management, Command Prompt, and PowerShell as administrator.',
      'Audit user accounts and groups against a README, and fix unauthorized users and administrators.',
      'Set a secure password policy and account lockout policy.',
      'Check that Windows Update is turned on and working.'
    ],
    schedule: [
      ['Lesson 1', 'Tour of Windows admin tools', 'Tool scavenger hunt'],
      ['Lesson 2', 'Auditing users and groups', 'README user audit'],
      ['Practice 1', 'Lab part A: users and groups', 'Users fixed on the VM'],
      ['Lesson 3', 'Password and lockout policies', 'Policy settings table'],
      ['Lesson 4', 'Windows Update and patching', 'Update check'],
      ['Practice 2', 'Lab part B: full timed run, then quiz', 'Full lab score, quiz']
    ],
    lab: {
      title: 'Lab 3: Secure User Accounts and Local Security Policy',
      text: 'On a Windows 10/11 Pro or Enterprise VM, students answer the forensics question, fix users and groups against the README, set the password and lockout policy, and check Windows Update. The last run is timed at 50 minutes.'
    },
    checklist: [
      ['Delete users not in the README; remove extra admins', 'net user, net localgroup Administrators'],
      ['Check custom groups match the README', 'net localgroup, then net localgroup NAME'],
      ['No "password never expires" on users', 'Set-LocalUser -Name NAME -PasswordNeverExpires $false'],
      ['Password policy: length 10+, max age 90, min age 1, history 5+, complexity on', 'secpol.msc, Account Policies, Password Policy'],
      ['Lockout policy: threshold 5 to 10, duration 30, reset 30', 'secpol.msc, Account Lockout Policy'],
      ['Windows Update service is not disabled', 'services.msc, Windows Update']
    ],
    vocab: ['Computer Management', 'Local Users and Groups', 'Local Security Policy', 'account policy', 'password history', 'complexity', 'lockout threshold', 'Windows Update', 'service'],
    ethics: 'As an IT helper, you can see that a teacher\'s password is Password1. Do you tell other students as a joke, tell the teacher privately, or say nothing?',
    files: {
      slides: '1RT4SJBPgpiwvMcWpj8eXClVyT7UmhoeqrI-8l-rzPDA',
      lab: '1pucmpcc2gjo4Rx6I6U4ndx_AQIMVbk9OeFCFzRC6iKs',
      plan: '14ZKnigdrtx_cn3xWFuuthGxpV50VYEU3pM8oGDhRevg',
      labkey: '1_VSb13nw7yvhSL9o7ohjvJFDQ_DBX1TfHUY14msrDKg',
      quiz: '1mTnuVWIPICFL7e0oDNbn176mOB2_V0y_Q74JGhqhi1w',
      quizkey: '1hehqWrNl8hflCRmjhfUvrwRP_PpTOZlzXhK5EWa4dKE'
    }
  },
  {
    n: 4,
    title: 'Windows Hardening, Part 2: Services, Firewall, Sharing, Software, and Auditing',
    short: 'Windows hardening, part 2',
    weeks: 2,
    sessions: '4 lessons (50 min) and 2 practice sessions (90 min)',
    standards: 'CSTA 3A-NI-06, 3B-NI-04 · NICE: Systems Administration, Cyber Defense Infrastructure Support',
    os: 'Windows 10/11',
    lead: 'Finish the Windows core: decide which services to stop, turn on the firewall, close remote access, remove unsafe shares and prohibited software, and turn on auditing. After this unit, students can work a full Windows practice image on their own.',
    goals: [
      'Explain what a service is and safely disable risky services the README does not require.',
      'Turn on Windows Defender Firewall and turn off Remote Desktop when it is not needed.',
      'Find and remove unsafe network shares, and set User Account Control and Microsoft Defender correctly.',
      'Remove prohibited software and turn on security auditing.'
    ],
    schedule: [
      ['Lesson 1', 'Services: what to keep and what to stop', 'Service decision sheet'],
      ['Lesson 2', 'Firewall and remote access', 'Firewall check'],
      ['Practice 1', 'Lab part A: services, firewall, Remote Desktop, sharing', 'Fixes on the VM'],
      ['Lesson 3', 'File sharing, UAC, and Microsoft Defender', 'Settings check'],
      ['Lesson 4', 'Prohibited software and auditing', 'Audit policy set'],
      ['Practice 2', 'Lab part B: full timed run, then quiz', 'Full lab score, quiz']
    ],
    lab: {
      title: 'Lab 4: Full Windows Practice Image',
      text: 'A complete Windows image: forensics question, services, firewall and Remote Desktop, shares, UAC and Defender, prohibited software, and auditing. Students finish with a 50-minute timed run.'
    },
    checklist: [
      ['Disable risky services the README does not require', 'services.msc: Remote Registry, FTP, Telnet, SNMP, Remote Desktop'],
      ['Never disable a service the README requires', 'Read the README first'],
      ['Firewall on for all profiles', 'netsh advfirewall set allprofiles state on'],
      ['Remote Desktop off unless required', 'Settings, System, Remote Desktop'],
      ['Remove unsafe shares (keep ADMIN$, C$, IPC$)', 'net share, then net share NAME /delete'],
      ['UAC at default or higher; Defender real-time protection on', 'Control Panel, User Accounts; Windows Security'],
      ['Uninstall prohibited software', 'Settings, Apps, Installed apps'],
      ['Audit success and failure', 'auditpol /set /category:* /success:enable /failure:enable']
    ],
    vocab: ['service', 'startup type', 'Remote Registry', 'Remote Desktop', 'firewall profile', 'inbound rule', 'network share', 'UAC', 'real-time protection', 'prohibited software', 'audit policy', 'Event Viewer'],
    ethics: 'A friend asks you to turn on Remote Desktop on their school laptop so they can play games from home.',
    files: {
      slides: '1kWQxSZw6DCaWyb5VdAjQq_Zn7CfTlpMg6wr-d-Av0tc',
      lab: '1hNeGfsvBgBe9z5u8oBy8O9i6pH9D8x7LHS9I7fUvrsU',
      plan: '1qSIoBrf29CrWz40YAVGqS1NUGouD35McjqD9h7M6qUU',
      labkey: '1W8TkN0r-7ilnG6kZPZsDilkNb8Dpi8U9vySubRCMlwg',
      quiz: '1AvDB18LTCv-VTzsfbiNijjmVAJLRrZSHhIYeY4JlSN8',
      quizkey: '1Y51a4FVx3eMT8nAT7TxY5otf0SscXc8k77ksmd9twno'
    }
  },
  {
    n: 5,
    title: 'Linux Fundamentals',
    short: 'Linux fundamentals',
    weeks: 2,
    sessions: '4 lessons (50 min) and 2 practice sessions (90 min)',
    standards: 'CSTA 3A-CS-03, 3B-NI-04 · NICE: Systems Administration',
    os: 'Ubuntu or Linux Mint',
    lead: 'Many students have never used a terminal. Learn to move around the Linux file system, work with files, read and change permissions, use sudo responsibly, and manage packages and services on Ubuntu.',
    goals: [
      'Move around the Linux file system with the terminal and explain what lives in /etc, /home, /var, and /opt.',
      'Create, read, copy, move, search, and delete files from the terminal.',
      'Read and change file permissions, and use sudo responsibly.',
      'Install and remove software with apt, and check services and listening ports.'
    ],
    schedule: [
      ['Lesson 1', 'The terminal and the file system', 'Navigation practice'],
      ['Lesson 2', 'Working with files and searching', 'File practice'],
      ['Practice 1', 'Lab part A: scavenger hunt, items 1 to 5', 'Flags found'],
      ['Lesson 3', 'Users, groups, permissions, and sudo', 'Permissions practice'],
      ['Lesson 4', 'Packages, services, and ports', 'Package and service practice'],
      ['Practice 2', 'Lab part B: items 6 to 10, then quiz', 'All flags, quiz']
    ],
    lab: {
      title: 'Lab 5: Command-Line Scavenger Hunt',
      text: 'Ten terminal challenges on an Ubuntu VM. Each item leads to a flag or an answer: hidden files, searching with find and grep, reading permissions, users and sudo, packages, and listening ports.'
    },
    checklist: [
      ['Update package lists and install updates', 'sudo apt update && sudo apt upgrade -y'],
      ['List human users (UID 1000 or more)', "awk -F: '$3>=1000 && $3<65534 {print $1}' /etc/passwd"],
      ['List who can use sudo', 'getent group sudo'],
      ['List listening ports and programs', 'sudo ss -tlnp'],
      ['List installed packages', 'apt list --installed']
    ],
    vocab: ['terminal', 'shell', 'root directory (/)', 'home directory (~)', 'absolute path', 'relative path', 'hidden file', 'chmod', 'sudo', 'root', 'apt', 'systemctl', 'port'],
    ethics: 'Your account has sudo on a shared lab computer. A friend asks you to use it to read another student\'s files.',
    files: {
      slides: '157Z0RoxEoDZEqe-udIYBkSP1_OG13JfC2JPeaiYspVE',
      lab: '1CjGodfUW1nUjC2GSAnOcK0KH9KQlxlOkzIDUr_IOMIY',
      plan: '1E0pbWMCci5jxpIbJffKj4F5rx9HqHoH3IBqJ6VJAqhs',
      labkey: '18B0e-2P6rCZXGWsKa0WKwdj8ryab50eDMoShDAjzPKo',
      quiz: '1SU_vLGPrXP4D8BIJ1cT-OHvBPyI_VQOCFGYqF_SaIrU',
      quizkey: '1hrvCHemz6ZbeP0x7VDrvYjFCR4cW_r9EyQMHvK7e1ks'
    }
  },
  {
    n: 6,
    title: 'Linux Hardening',
    short: 'Linux hardening',
    weeks: 2,
    sessions: '4 lessons (50 min) and 2 practice sessions (90 min)',
    standards: 'CSTA 3A-NI-06, 3B-NI-04 · NICE: Systems Administration, Cyber Defense Infrastructure Support',
    os: 'Ubuntu',
    lead: 'Apply the same audit method from Windows to Ubuntu: users and sudo, hidden root accounts, password aging, the ufw firewall, SSH, services, prohibited software, file permissions, and updates.',
    goals: [
      'Audit Linux users, sudo rights, and hidden root (UID 0) accounts against a README.',
      'Set password aging and minimum length rules.',
      'Turn on the ufw firewall and secure the SSH server.',
      'Remove unneeded services and prohibited software, fix risky file permissions, and install updates.'
    ],
    schedule: [
      ['Lesson 1', 'Auditing Linux users and sudo', 'User audit practice'],
      ['Lesson 2', 'Password policy on Linux', 'Policy edits'],
      ['Practice 1', 'Lab part A: forensics, users, passwords', 'Fixes on the VM'],
      ['Lesson 3', 'The ufw firewall and SSH', 'Firewall and SSH set'],
      ['Lesson 4', 'Services, software, file permissions, updates', 'Service audit'],
      ['Practice 2', 'Lab part B: full timed run, then quiz', 'Full lab score, quiz']
    ],
    lab: {
      title: 'Lab 6: Full Linux Practice Image',
      text: 'A fresh Ubuntu image with planted problems: forensics question, users and sudo, a hidden UID 0 account, password policy, ufw, SSH settings, unneeded services, prohibited tools, /etc/shadow permissions, and updates. The last run is timed at 55 minutes.'
    },
    checklist: [
      ['Delete unauthorized users; remove extra sudo members', 'sudo deluser NAME, sudo gpasswd -d NAME sudo'],
      ['No UID 0 accounts except root', "awk -F: '$3==0' /etc/passwd"],
      ['Strong passwords for all users', 'sudo passwd NAME'],
      ['Password aging 90/1/7 and minlen 10', '/etc/login.defs, chage, /etc/security/pwquality.conf'],
      ['Firewall on', 'sudo ufw enable'],
      ['SSH root login off (if SSH is required)', 'PermitRootLogin no in /etc/ssh/sshd_config, then restart ssh'],
      ['Purge unneeded services and prohibited tools', 'sudo apt purge NAME'],
      ['/etc/shadow is 640', 'sudo chmod 640 /etc/shadow'],
      ['Install updates', 'sudo apt update && sudo apt upgrade -y']
    ],
    vocab: ['/etc/passwd', '/etc/shadow', '/etc/group', 'UID 0', 'sudo group', 'chage', 'login.defs', 'pwquality', 'ufw', 'SSH', 'sshd_config', 'PermitRootLogin', 'purge'],
    ethics: 'You find john (a password cracker) on a school computer. A classmate says it is fine because you are learning security.',
    files: {
      slides: '13HO3ekjBe74NWWEv-cZzvdTI1RFSHQehIDkBDuPhvHI',
      lab: '1fOwyDkV-3CqBG4tuxFVb6JRIcwEb4oOqoHyOw4g-bt0',
      plan: '1kh2UlvWXxJ_c2DjT6MRzyDBUE3MrpbL6S-NiNLLnNs4',
      labkey: '11R9UWNRjr53llX8_oS4JV3SlOuTE4QJUMIFVgCwMSKA',
      quiz: '1QaFtV8TJ7h2pirY7SnwDaIK8R05KppxG3LonRBRw938',
      quizkey: '1gH-EFKfTFJb6TZ1yBJ02kva4eDck7zUbO2HfsH_iRWs'
    }
  },
  {
    n: 7,
    title: 'Networking and Cisco Basics',
    short: 'Networking and Cisco basics',
    weeks: 3,
    sessions: '6 lessons (50 min) and 3 practice sessions (90 min)',
    standards: 'CSTA 3A-NI-04, 3A-NI-05, 3B-NI-03 · NICE: Network Operations',
    os: 'Cisco Packet Tracer',
    lead: 'Most rounds include a Cisco networking part. Learn how switches and routers move data, IPv4 addressing, the OSI model and common ports, then configure and secure a small network in Cisco Packet Tracer.',
    goals: [
      'Explain what switches and routers do, and how devices find each other on a network.',
      'Read and assign IPv4 addresses, subnet masks, and default gateways, and test with ping.',
      'Name the layers of the OSI model and common ports (21, 22, 23, 53, 80, 443, 3389).',
      'Use Cisco IOS modes in Packet Tracer to configure a router and switch.',
      'Secure Cisco devices: passwords, encryption, SSH instead of Telnet, banners, and unused ports.'
    ],
    schedule: [
      ['Lesson 1', 'How networks work: devices and addresses', 'Network drawing'],
      ['Lesson 2', 'IPv4 addresses, subnet masks, gateways', 'Addressing worksheet'],
      ['Practice 1', 'Lab part A: build and connect the network', 'Working pings'],
      ['Lesson 3', 'The OSI model and common ports', 'Port match-up'],
      ['Lesson 4', 'Cisco IOS modes in Packet Tracer', 'Basic router setup'],
      ['Practice 2', 'Lab part B: secure the router and switch', 'Secured devices'],
      ['Lesson 5', 'Securing Cisco devices and SSH', 'Security commands'],
      ['Lesson 6', 'Cisco in CyberPatriot: quiz strategy and review', 'Practice quiz'],
      ['Practice 3', 'Timed Packet Tracer challenge and unit quiz', 'Challenge score, quiz']
    ],
    lab: {
      title: 'Lab 7: Configure and Secure a Small Network',
      text: 'In Packet Tracer, students place a router, a switch, and two PCs, cable them, set IP addresses, and test with ping. Then they secure both devices: hostnames, enable secret, line passwords, encryption, a banner, SSH, and shut unused ports. It ends with a 45-minute build from a blank file.'
    },
    checklist: [
      ['Hostname and enable secret', 'hostname R1, enable secret STRONGPASS'],
      ['Console and VTY passwords; encryption', 'line con 0, password, login; service password-encryption'],
      ['SSH only, no Telnet', 'ip domain-name, crypto key generate rsa, username, transport input ssh, login local'],
      ['Warning banner', 'banner motd #Authorized access only#'],
      ['Shut down unused switch ports', 'interface range fa0/3-24, shutdown'],
      ['Save the config', 'copy running-config startup-config']
    ],
    vocab: ['LAN', 'WAN', 'switch', 'router', 'MAC address', 'IP address', 'subnet mask', 'default gateway', 'OSI model', 'port', 'Packet Tracer', 'IOS', 'enable secret', 'SSH', 'Telnet'],
    ethics: 'Your school Wi-Fi password is posted in a classroom. Is it okay to use network scanning tools on the school network to see what is connected?',
    files: {
      slides: '1BkYgTyI09uZRVio9UQ9j1d0vtTy81Ee1iJJcpzHjWjQ',
      lab: '1CXROXseh-o5kqFPs3mQBZCYktaMfSUxvjsmI8ekDH7Q',
      plan: '1jBN9XXQHYeFtGnrZlfEqoKi3TaBgpNq2F68CCqoM_7E',
      labkey: '1pI9evDxDEfnzIy-bSirhyTmWIL8JJR9rLMIWn3JqyT4',
      quiz: '16CwPjgAHjNNsyrNqfp1pcpkS99Bq7d_87-nO6M9vQac',
      quizkey: '1yNsUIdOYXqKKwEwkYLn_c7MyOpjmwSCk0vtSyXtMaXs'
    }
  },
  {
    n: 8,
    title: 'Windows Server and Active Directory',
    short: 'Windows Server and Active Directory',
    weeks: 3,
    sessions: '6 lessons (50 min) and 3 practice sessions (90 min)',
    standards: 'CSTA 3B-NI-03, 3B-NI-04 · NICE: Systems Administration, Network Operations',
    os: 'Windows Server 2022',
    lead: 'Server images usually run Active Directory, so students work at the domain level. Learn Server Manager, audit domain users and privileged groups, set the domain password policy with Group Policy, and secure DNS, SMB, and server roles.',
    goals: [
      'Explain what a server, a domain, and a domain controller are, and use Server Manager.',
      'Use Active Directory Users and Computers and PowerShell to audit domain users, groups, and OUs.',
      'Find and fix dangerous account settings and members of privileged groups.',
      'Set the domain password and lockout policy with Group Policy or PowerShell.',
      'Secure server roles: DNS zone transfers, SMBv1, the firewall, and unneeded features.'
    ],
    schedule: [
      ['Lesson 1', 'What servers do: Server Manager, roles, features', 'Server Manager tour'],
      ['Lesson 2', 'Active Directory: domains, users, groups, OUs', 'AD diagram'],
      ['Practice 1', 'Lab part A: forensics and domain accounts', 'Account fixes'],
      ['Lesson 3', 'Privileged groups and risky account settings', 'Privileged group audit'],
      ['Lesson 4', 'Group Policy and the domain password policy', 'Policy set'],
      ['Practice 2', 'Lab part B: policy and server roles', 'Policy and role fixes'],
      ['Lesson 5', 'Securing server roles: DNS, SMB, firewall', 'Role checklist'],
      ['Lesson 6', 'The full server workflow', 'Server checklist'],
      ['Practice 3', 'Full timed lab and quiz', 'Lab score, quiz']
    ],
    lab: {
      title: 'Lab 8: Full Windows Server Practice Image',
      text: 'On a Windows Server 2022 domain controller, students answer the forensics question, audit domain users and privileged groups, clear risky account flags, set the domain password and lockout policy, lock down DNS zone transfers, remove SMBv1, and check the firewall. The last run is timed at 55 minutes.'
    },
    checklist: [
      ['Audit domain users against the README', 'Get-ADUser -Filter * | Select Name,Enabled'],
      ['Privileged groups contain only README admins', 'Get-ADGroupMember "Domain Admins" (also Enterprise, Schema, Administrators)'],
      ['No risky account flags', 'Get-ADUser -Filter * -Properties PasswordNotRequired,DoesNotRequirePreAuth,PasswordNeverExpires'],
      ['Domain password and lockout policy', 'Set-ADDefaultDomainPasswordPolicy, or Default Domain Policy in gpmc.msc'],
      ['DNS zone transfers off or to listed servers only', 'DNS Manager, zone Properties, Zone Transfers'],
      ['Remove SMBv1', 'Uninstall-WindowsFeature FS-SMB1'],
      ['Never remove AD DS or DNS on a domain controller', 'Read the README']
    ],
    vocab: ['server', 'role', 'feature', 'Server Manager', 'Active Directory', 'domain', 'domain controller', 'OU', 'Domain Admins', 'Group Policy', 'GPO', 'Kerberos preauthentication', 'DNS zone transfer', 'SMBv1'],
    ethics: 'As a student helper, you have Domain Admin rights to fix printers. A teacher asks you to reset another teacher\'s password so they can read their email.',
    files: {
      slides: '123a2dnUrKFLJ-ic9L2S1dcca8iZrxmCAWdAEVGDH1t8',
      lab: '1Ce8FNTUsy0ddDV_LkJR0MOA-0wWbUBYRudK9J8nTGpc',
      plan: '1p3XCgLVm2IH-nCfKYOWE89hCO_QFaux8L-A33tiQpNc',
      labkey: '1aBE1OmlWnqDefCF-gfPTb_gnjO9H73J_20Hk8xPS3Vw',
      setup: '1iBUaf7yRPMZT49W4UjeEo63gCJ5B5GwG',
      quiz: '1vH8inA9sVPer_mZz5TPFlJ6eTpv8b2-JW2aMnSVPPwg',
      quizkey: '1T-a_fodKzZYqksFXq0PMDT8Dm8uAbCqMS0ym9c7sFCU'
    }
  },
  {
    n: 9,
    title: 'Advanced Hardening and Forensics Questions',
    short: 'Advanced hardening and forensics',
    weeks: 3,
    sessions: '6 lessons (50 min) and 3 practice sessions (90 min)',
    standards: 'CSTA 3B-NI-04, 3B-IC-26 · NICE: Digital Forensics, Cyber Defense Analysis',
    os: 'Ubuntu and Windows',
    lead: 'Forensics questions are often worth more than single fixes, and later rounds hide backdoors and scheduled tasks. Learn hashing and decoding, finding hidden files, removing persistence, tracing listening ports, reading logs, and spotting dangerous SUID files.',
    goals: [
      'Answer forensics questions without destroying evidence, including hashing and decoding questions.',
      'Find hidden, large, recently changed, and oddly owned files on Linux and Windows.',
      'Find and remove persistence: cron jobs, systemd services, scheduled tasks, and Run keys.',
      'Trace a listening port back to its program and file, and check the hosts file.',
      'Read sign-in logs and find dangerous SUID files.'
    ],
    schedule: [
      ['Lesson 1', 'Forensics questions, hashing, and encoding', 'Hash and decode practice'],
      ['Lesson 2', 'Finding files that hide', 'Find challenges'],
      ['Practice 1', 'Lab part A: evidence questions 1 to 5', 'Answers 1 to 5'],
      ['Lesson 3', 'Persistence: how attackers stay', 'Persistence hunt'],
      ['Lesson 4', 'Network backdoors and the hosts file', 'Port tracing'],
      ['Practice 2', 'Lab part B: items 6 to 10', 'Backdoors removed'],
      ['Lesson 5', 'Logs and SUID files', 'Log questions'],
      ['Lesson 6', 'Windows forensics drill', 'Windows answers'],
      ['Practice 3', 'Full timed lab and quiz', 'Lab score, quiz']
    ],
    lab: {
      title: 'Lab 9: Forensics Question Challenge Set',
      text: 'Ten items on an Ubuntu VM: five evidence questions (hashes, decoding, hidden files), then a cron job, a listening service, the hosts file, a log question, and a SUID file. Everything planted is harmless, but treat the VM as a lab machine only. The last run is timed at 55 minutes.'
    },
    checklist: [
      ['Answer forensics questions before changing anything', 'Desktop files; exact format'],
      ['Hashes and decoding', 'sha256sum, Get-FileHash, base64 -d, certutil -decode'],
      ['Linux persistence', '/etc/crontab, /etc/cron.d/, crontab -l -u USER, systemctl list-unit-files --state=enabled'],
      ['Windows persistence', 'Get-ScheduledTask, Run keys, Startup folders'],
      ['Trace listening ports to programs', 'sudo ss -tlnp, netstat -ano'],
      ['Check the hosts file', '/etc/hosts, C:\\Windows\\System32\\drivers\\etc\\hosts'],
      ['Find SUID files', 'find / -perm -4000 -type f 2>/dev/null']
    ],
    vocab: ['forensics question', 'evidence', 'hash', 'SHA-256', 'encoding', 'base64', 'persistence', 'cron', 'scheduled task', 'Run key', 'backdoor', 'PID', 'hosts file', 'event ID', 'SUID'],
    ethics: 'While answering a forensics question, you find a file of another student\'s private messages on a school computer.',
    files: {
      slides: '1fudF25G0q0Sr3_uadFqJp0YszXiSpJO3mWWW38x4EuM',
      lab: '1zUT660_wWKBXfXKUd2xbAabWecealdI12TwOwZXiY0U',
      plan: '1Dsa5kX_G5HAS0y17JhOw_luxpcV_ibb4mH9eJ0apeUc',
      labkey: '1t-vGAmasw8bNC4rDAZy-Qr2e63t2DwIuKTKSMqV7PKk',
      setup: '1v9c_dDeh5dMGNrqX4L66cjP2_ebhlypi',
      quiz: '1NL7vFVZ4DXMkAujRMGNBNDX3oSfhXbc5nonybsez8no',
      quizkey: '15xAIKzl2OvJCplRPDSkmz5J-uU6muXozZf4SZ0kJb3Q'
    }
  },
  {
    n: 10,
    title: 'Competition Strategy and Team Play',
    short: 'Competition strategy and team play',
    weeks: '3, then weekly',
    sessions: '6 lessons (50 min) and 3 practice sessions (90 min), then a mock round every week',
    standards: 'CSTA 3B-IC-27, 3A-AP-23 · NICE: Cyber Defense Analysis, Systems Administration',
    os: 'All images and Cisco',
    lead: 'Strong teams are not the ones who know the most commands. They read carefully, split the work, and avoid penalties. Learn team roles, round-day logistics, prioritizing by points and time, using the scoring report, and building one team master checklist.',
    goals: [
      'Work in defined roles and communicate progress during a round.',
      'Prepare for round day: equipment, image setup, rules, and timing.',
      'Prioritize the work by points and time, and know when to move on.',
      'Use the scoring report to confirm fixes and catch penalties fast.',
      'Build and maintain a team master checklist from Units 1 to 9.'
    ],
    schedule: [
      ['Lesson 1', 'Team roles and communication', 'Role cards'],
      ['Lesson 2', 'Round-day logistics and rules', 'Round-day checklist'],
      ['Practice 1', 'Half mock round (2 images)', 'Mock score'],
      ['Lesson 3', 'Prioritizing by points and time', 'Priority plan'],
      ['Lesson 4', 'Using the scoring report', 'Penalty drill'],
      ['Practice 2', 'Full mock round (all images and Cisco)', 'Mock score'],
      ['Lesson 5', 'Building the team master checklist', 'Master checklist'],
      ['Lesson 6', 'Staying calm and the debrief habit', 'Debrief template'],
      ['Practice 3', 'Mock round debrief and unit quiz', 'Action list, quiz']
    ],
    lab: {
      title: 'Lab 10: Full Mock Rounds as a Team',
      text: 'Teams run mock rounds on the Unit 4, 6, and 8 lab VMs and the Unit 7 Packet Tracer challenge, with assigned roles and a projector timer. The run sheet keeps the round on schedule, and every round ends with a debrief. No new setup is needed.'
    },
    checklist: [
      ['Round workflow at the top of the master checklist', 'README, forensics, users, policy, firewall, updates'],
      ['Keep a change log during rounds', 'Time, change, points before and after'],
      ['10-minute rule', 'Stuck? Write it down, move on, come back'],
      ['Check the scoring report often', 'Points drop? Undo the last change']
    ],
    vocab: ['role', 'captain', 'scoring report', 'penalty', 'change log', 'prioritization', 'master checklist', 'mock round', 'debrief'],
    ethics: 'During a round, a student on another team texts your captain asking how you fixed a problem.',
    files: {
      slides: '1-zZqlt7myifQ2Dgvv4WCPt7KFOFioAhLDmYXp4qYPE0',
      runsheet: '1y-uAEerkizUQSJiY8dihMvQ2JTmycUagg0dsxjiRVvw',
      plan: '1AjwePE1z_EaTbQRV5wUdI5Hcpv8whUn2KfeaAsrrtJM',
      mockguide: '1CYFWUQvp1piEPQzqGgiX0ea8os2RNYvP17dGzEGK3lQ',
      quiz: '1yiwrv_0cMh1sGhn5eFzDkloLUFKxR2VJHGcYZ1YHgc0',
      quizkey: '1bqyC9To-UiGdlRwkFqB4aOnvi0Mq8bcqunyZfKItVs8'
    }
  }
];
