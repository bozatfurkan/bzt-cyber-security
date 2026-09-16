/**
 * BZT Cyber Security - English Curriculum Translations
 */

const CURRICULUM_EN = {
  "net-foundations": {
    phaseTitle: "Phase 1: Foundations & Infrastructure",
    title: "Network Architecture, TCP/IP, OSI & Packet Anatomy",
    difficulty: "Beginner",
    duration: "45 min",
    summary: "A hacker without networking knowledge is blind. Master TCP 3-Way Handshake, OSI 7 Layers, DNS queries, ARP poisoning, and packet headers in depth.",
    sections: [
      {
        heading: "1. OSI Model & Layer Exploitation",
        content: "In cyber security, every attack targets a specific layer of the OSI model:\n- Layer 2 (Data Link): MAC Addresses, ARP. Attacks: ARP Spoofing/Poisoning, MAC Flooding.\n- Layer 3 (Network): IP Addresses, Routing. Attacks: IP Spoofing, Smurf Attack, ICMP Floods.\n- Layer 4 (Transport): TCP & UDP. Attacks: SYN Flood, Stealth Port Scans (SYN Scan, FIN Scan).\n- Layer 7 (Application): HTTP/S, DNS, SSH. Attacks: Web Injections (SQLi, XSS), DNS Poisoning, MiTM.",
        tip: "Nmap SYN Scan (-sS) determines open ports by completing only SYN -> SYN/ACK -> RST, leaving no full connection log on the target."
      },
      {
        heading: "2. TCP 3-Way Handshake & Attack Vectors",
        content: "Secure TCP communication starts with a 3-step handshake:\n1. SYN: Client sends connection request with initial Sequence Number (ISN).\n2. SYN-ACK: Server accepts and returns its own ISN + client ISN+1.\n3. ACK: Client confirms and connection becomes ESTABLISHED.\n\nHacker Tactics:\n- SYN Flood: Sending massive SYN packets from spoofed IPs to exhaust target memory backlog.\n- RST Injection: Injecting forged RST packets to terminate active user connections.",
        tip: "Scapy in Python allows arbitrary manipulation of TCP flags and sequence numbers."
      }
    ],
    quiz: {
      question: "In an Nmap SYN Stealth Scan (-sS), what flag combination returned from the target indicates the port is open?",
      options: ["SYN / ACK", "RST / ACK", "FIN / PSH", "ACK Only"],
      explanation: "An open port replies with 'SYN/ACK'. Nmap immediately sends an RST packet to tear down the connection without finishing the handshake."
    }
  },
  "linux-bash-mastery": {
    phaseTitle: "Phase 1: Foundations & Infrastructure",
    title: "Linux Kernel, Special Permissions (SUID/SGID) & Bash Warfare",
    difficulty: "Beginner",
    duration: "60 min",
    summary: "Linux is the native language of hackers. Master file permissions (rwx, SUID, SGID), pipelines, grep/awk filtering, and automation one-liners.",
    sections: [
      {
        heading: "1. Special Permissions: The Power of SUID & SGID",
        content: "Beyond standard rwx permissions, SUID (Set User ID - 4000) is the most critical permission leading to privilege escalation.\nWhen a binary has the SUID bit set (-rwsr-xr-x), it executes with the privileges of the file OWNER (typically root) rather than the executing user!\n\nIf /bin/bash, /usr/bin/find, /usr/bin/vim, or a misconfigured binary has SUID, any low-privileged user can escalate to Root in seconds!",
        tip: "GTFOBins is the authoritative repository detailing how system binaries with SUID or Sudo permissions can be exploited to bypass local security restrictions."
      },
      {
        heading: "2. Essential Linux Discovery One-Liners",
        content: "When gaining initial shell access, situational awareness is key:\n- Active user & groups: id, whoami, cat /etc/passwd\n- Running processes: ps aux | grep root\n- Listening internal ports: ss -antup | grep LISTEN\n- Sudo privileges: sudo -l",
        tip: "Always check for writable files owned by root or scheduled cronjobs."
      }
    ],
    quiz: {
      question: "Which special Linux permission bit causes a binary to execute with the rights of the file owner rather than the running user?",
      options: ["SUID (Set User ID - 4000)", "Sticky Bit (1000)", "SGID (2000)", "Chown Bit"],
      explanation: "SUID executes the binary under the security context of the file owner (e.g. root), making it a prime privilege escalation vector."
    }
  },
  "python-for-hackers": {
    phaseTitle: "Phase 1: Foundations & Infrastructure",
    title: "Python for Hackers: Socket Programming & Exploit Development",
    difficulty: "Intermediate",
    duration: "65 min",
    summary: "Never rely solely on third-party tools. Build your own multithreaded port scanner, banner grabber, and HTTP exploit scripts in Python from scratch.",
    sections: [
      {
        heading: "1. Multithreaded Port Scanner Architecture",
        content: "Python's socket module provides low-level network communication. The connect_ex() method attempts TCP connections, returning 0 if the destination port is open.",
        tip: "Setting socket timeouts is vital so scanning doesn't hang on filtered ports."
      }
    ],
    quiz: {
      question: "In Python's socket library, what return code from 'connect_ex((ip, port))' indicates the port is open?",
      options: ["0", "1", "True", "200"],
      explanation: "connect_ex() returns 0 on successful connection (port is open) and an errno code on failure."
    }
  },
  "cryptography-hashing": {
    phaseTitle: "Phase 1: Foundations & Infrastructure",
    title: "Cryptography Fundamentals: Encryption, Hash Functions & Salting",
    difficulty: "Beginner",
    duration: "50 min",
    summary: "Symmetric vs Asymmetric encryption (AES vs RSA), one-way cryptographic hash functions, rainbow tables, and password cracking foundations.",
    sections: [
      {
        heading: "1. Encryption vs Hashing",
        content: "- Encryption (Two-way): Reversible using secret keys (AES-256, RSA).\n- Hashing (One-way): Generates a fixed-length fingerprint; mathematically irreversible (MD5, SHA-256).\n- Salting: Appending random bytes prior to hashing to defeat Rainbow Table attacks.",
        tip: "MD5 and SHA-1 have proven collisions. For passwords, memory-hard algorithms like Argon2 or bcrypt must be used."
      }
    ],
    quiz: {
      question: "Which security practice prevents precomputed Rainbow Table attacks against stored passwords?",
      options: ["Salting", "Base64 Encoding", "Data Compression", "Symmetric Key Derivation"],
      explanation: "A unique salt ensures that identical passwords yield distinct hash outputs, neutralizing rainbow tables."
    }
  },
  "osint-recon-deep": {
    phaseTitle: "Phase 2: Recon & OSINT",
    title: "OSINT (Open Source Intelligence) & Attack Surface Mapping",
    difficulty: "Intermediate",
    duration: "50 min",
    summary: "Map the target without transmitting a single packet to their network. Shodan, Google Dorking, Subdomain Brute-Forcing, and credential leaks.",
    sections: [
      {
        heading: "1. Advanced Google Dorking",
        content: "Search operators unveil accidentally exposed files:\n- site:target.com filetype:env -> Exposed API keys and database credentials\n- site:target.com filetype:sql -> Database backup dumps\n- site:target.com inurl:admin -> Hidden administrative portals\n- site:target.com ext:log -> Debug logs and system secrets",
        tip: "Shodan search filters like 'org:Target port:3389' uncover internet-exposed remote desktop services."
      }
    ],
    quiz: {
      question: "Which Google Dork operator targets exposed environment configuration files containing credentials?",
      options: ["site:target.com filetype:env DB_PASSWORD", "find .env in target.com", "search:target.com -type:database", "site:target.com show pass"],
      explanation: "filetype:env specifies the file extension, while DB_PASSWORD narrows matches to configuration secrets."
    }
  },
  "active-recon-nmap": {
    phaseTitle: "Phase 2: Recon & OSINT",
    title: "Active Network Recon: Nmap, Masscan & NSE Vulnerability Scripts",
    difficulty: "Intermediate",
    duration: "60 min",
    summary: "Unravel Nmap's full capabilities: IDS evasion timing (-T0 to -T5), NSE scripting engine, UDP port scanning, and scanning millions of ports with Masscan.",
    sections: [
      {
        heading: "1. Core Nmap Flag Combinations",
        content: "- -sS: TCP SYN Stealth Scan (Half-open, minimizes logging)\n- -sV: Service version detection (Apache, OpenSSH versions)\n- -sC: Runs default safe NSE vulnerability scripts\n- -p-: Scans all 65,535 ports\n- -Pn: Skips ping check (essential when firewalls block ICMP)",
        tip: "Combine -sV --version-intensity 9 with --script vuln for comprehensive vulnerability assessment."
      }
    ],
    quiz: {
      question: "Which Nmap parameter instructs the scanner to bypass ping probes and assume the target is online?",
      options: ["-Pn", "-sS", "-sP", "-n"],
      explanation: "-Pn skips ICMP ping requests and proceeds immediately to port scanning."
    }
  },
  "sqli-exploitation": {
    phaseTitle: "Phase 3: Web Penetration Testing",
    title: "SQL Injection: Union, Error, Blind & Time-Based Exploitation",
    difficulty: "Advanced",
    duration: "75 min",
    summary: "Seize database control. Authentication bypass, Union-based data extraction, Error-based leakage, and automated auditing with SQLMap.",
    sections: [
      {
        heading: "1. Authentication Bypass Mechanics",
        content: "When unsanitized user input is concatenated into SQL queries:\nSELECT * FROM users WHERE username = 'INPUT' AND password = 'PASSWORD'\n\nSubmitting 'admin\\' --' transforms the query into:\nSELECT * FROM users WHERE username = 'admin' --' ...\nThe password check is commented out, granting immediate administrator access!",
        tip: "Parameterized queries (Prepared Statements) prevent SQL injection completely by separating SQL code from user data."
      }
    ],
    quiz: {
      question: "In a Union-Based SQL injection, which SQL clause is most commonly used to determine the exact column count?",
      options: ["ORDER BY n --", "GROUP BY id --", "COUNT(columns) --", "DESCRIBE table --"],
      explanation: "Incrementing 'ORDER BY 1', 'ORDER BY 2'... until an error is triggered reveals the number of columns in the original query."
    }
  },
  "xss-csrf-dom": {
    phaseTitle: "Phase 3: Web Penetration Testing",
    title: "Cross-Site Scripting (XSS) & Session Hijacking",
    difficulty: "Intermediate",
    duration: "55 min",
    summary: "Execute malicious JavaScript in victim browsers. Reflected, Stored, and DOM-based XSS vectors, WAF filter evasion, and session cookie stealing.",
    sections: [
      {
        heading: "1. XSS Types & Execution Flow",
        content: "- Reflected XSS: Payload in request parameters reflects in the immediate response (requires tricking victim into clicking a link).\n- Stored XSS: Payload is saved in the database (comments, profile fields); triggers automatically for EVERY user who views the page.\n- DOM XSS: The client-side JavaScript execution environment modifies the DOM insecurely without server involvement.",
        tip: "Setting the 'HttpOnly' cookie flag prevents JavaScript document.cookie access, neutralizing session theft via XSS."
      }
    ],
    quiz: {
      question: "Which cookie security flag prevents JavaScript from reading cookies via document.cookie, mitigating XSS session theft?",
      options: ["HttpOnly", "Secure", "SameSite=Strict", "Domain-Restricted"],
      explanation: "The HttpOnly flag ensures cookies are only transmitted in HTTP headers and remain inaccessible to client-side scripts."
    }
  },
  "rce-ssrf-deserialization": {
    phaseTitle: "Phase 3: Web Penetration Testing",
    title: "RCE, SSRF, LFI & File Upload Vulnerabilities",
    difficulty: "Advanced",
    duration: "70 min",
    summary: "Critical web vulnerabilities: Remote Code Execution (RCE), Server-Side Request Forgery (SSRF), and bypassing upload filters to deploy Web Shells.",
    sections: [
      {
        heading: "1. File Upload Bypasses & Web Shell Deployment",
        content: "If file extension validation is flawed, uploading a PHP/ASP web shell grants arbitrary command execution on the web server.\nBypass Techniques:\n- Alternative extensions: .phtml, .php5, .phar\n- Double extensions / Null bytes: shell.php.jpg\n- Content-Type tampering: sending image/jpeg with PHP payload\n- Magic bytes: Prefixing file with 'GIF89a;' header.",
        tip: "Use '<?php system($_GET[\"cmd\"]); ?>' for a minimal web shell."
      }
    ],
    quiz: {
      question: "What local link-local IP address provides Instance Metadata containing temporary IAM security credentials in AWS cloud servers?",
      options: ["169.254.169.254", "127.0.0.1", "10.0.0.1", "192.168.0.254"],
      explanation: "169.254.169.254 is the standard link-local IP address used by cloud providers to serve instance metadata."
    }
  },
  "burpsuite-masterclass": {
    phaseTitle: "Phase 3: Web Penetration Testing",
    title: "Burp Suite Masterclass: Proxy, Repeater, Intruder & Fuzzing",
    difficulty: "Intermediate",
    duration: "60 min",
    summary: "The definitive tool of the web pentester. Intercept HTTP/S traffic, tamper with requests on the fly, session tokens, and automate fuzzing with Intruder.",
    sections: [
      {
        heading: "1. Proxy, Repeater & Intruder Workflow",
        content: "- Proxy Intercept: Pauses outgoing requests to inspect and modify headers and payloads.\n- Repeater (Ctrl+R): Manually replay and tweak individual requests with real-time response view.\n- Intruder (Ctrl+I): Automates customized fuzzing, brute-forcing, and parameter tampering.",
        tip: "Sniper attack type tests one position at a time; Cluster Bomb iterates combinations across multiple positions."
      }
    ],
    quiz: {
      question: "In Burp Suite, which tab is dedicated to manually modifying and replaying single HTTP requests?",
      options: ["Repeater (Ctrl+R)", "Intruder (Ctrl+I)", "Decoder (Ctrl+D)", "Comparer"],
      explanation: "Repeater allows you to repeatedly send modified requests and analyze server responses in real time."
    }
  },
  "metasploit-exploitation": {
    phaseTitle: "Phase 4: System & Network Exploitation",
    title: "Metasploit Framework, Shellcoding & Meterpreter",
    difficulty: "Intermediate",
    duration: "65 min",
    summary: "The world's premier penetration testing framework. Matching exploits, crafting payloads with msfvenom, and post-exploitation with Meterpreter.",
    sections: [
      {
        heading: "1. Metasploit Architecture & Workflow",
        content: "- Exploit: Code module that triggers a software vulnerability.\n- Payload: Code that executes on target once the vulnerability is leveraged (e.g. Reverse Shell, Meterpreter).\n- Auxiliary: Port scanning, discovery, and denial-of-service modules.\n- Post: Post-exploitation modules (dumping hashes, credentials, token impersonation).",
        tip: "Meterpreter executes purely in-memory via dynamic library injection without touching disk."
      }
    ],
    quiz: {
      question: "Which advanced Metasploit payload operates entirely in memory to evade antivirus disk detection?",
      options: ["Meterpreter", "Command Shell", "Stager Raw", "Inline Bash"],
      explanation: "Meterpreter injects into running memory spaces, avoiding disk writes and providing rich post-exploitation commands."
    }
  },
  "linux-privesc": {
    phaseTitle: "Phase 4: System & Network Exploitation",
    title: "Linux Privilege Escalation: SUID, Sudo, Cronjobs & LinPEAS",
    difficulty: "Expert",
    duration: "80 min",
    summary: "Ascend from low-privilege shell to ROOT. Sudo NOPASSWD misconfigurations, SUID binary exploitation, cronjob poisoning, and LinPEAS automation.",
    sections: [
      {
        heading: "1. Sudo NOPASSWD Exploitation",
        content: "If 'sudo -l' reveals binaries executable without password:\n- sudo find . -exec /bin/sh \\; -quit\n- sudo vim -c ':!/bin/sh'\n- sudo less /etc/hosts -> enter '!/bin/sh'",
        tip: "LinPEAS automates scanning hundreds of privilege escalation checks, highlighting red/yellow vectors."
      }
    ],
    quiz: {
      question: "If 'sudo -l' shows that '/usr/bin/find' can be executed without a password, which command spawns a Root shell?",
      options: ["sudo find . -exec /bin/sh \\; -quit", "sudo find --root", "find -u root", "sudo find /bin/bash"],
      explanation: "find's -exec flag executes the specified binary (/bin/sh) with root privileges."
    }
  },
  "active-directory-attacks": {
    phaseTitle: "Phase 4: System & Network Exploitation",
    title: "Active Directory Penetration Testing & Domain Dominance",
    difficulty: "Expert",
    duration: "90 min",
    summary: "The heartbeat of enterprise networks: Active Directory. Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound attack path graph analysis, and Golden Ticket generation.",
    sections: [
      {
        heading: "1. Kerberoasting Attack Mechanism",
        content: "Any domain user can request Kerberos TGS tickets for accounts with configured Service Principal Names (SPN). These tickets are encrypted with the service account's NTLM hash, allowing offline cracking with Hashcat!",
        tip: "BloodHound uses graph theory (Neo4j) to automatically map the shortest attack path to Domain Admin."
      }
    ],
    quiz: {
      question: "What is the name of the attack where domain users request TGS tickets for SPN accounts to crack passwords offline?",
      options: ["Kerberoasting", "AS-REP Roasting", "Pass-the-Ticket", "Silver Ticket"],
      explanation: "Kerberoasting extracts TGS service tickets for offline brute-forcing without triggering account lockouts."
    }
  },
  "wireless-social-eng": {
    phaseTitle: "Phase 5: Wireless & Social Engineering",
    title: "Wireless Security (WiFi) & Advanced Social Engineering",
    difficulty: "Intermediate",
    duration: "55 min",
    summary: "Airborne penetration testing: Capturing WPA2/3 4-Way Handshakes, Deauth attacks, Evil Twin access points, and phishing infrastructure.",
    sections: [
      {
        heading: "1. WPA2 Handshake Capture with Aircrack-ng",
        content: "1. Start monitor mode: airmon-ng start wlan0\n2. Locate target BSSID: airodump-ng wlan0mon\n3. Deauthenticate client: aireplay-ng -0 5 -a BSSID -c CLIENT wlan0mon\n4. Capture reconnecting 4-Way handshake and crack with wordlists.",
        tip: "WPA3 Dragonfly handshakes protect against traditional offline dictionary attacks."
      }
    ],
    quiz: {
      question: "Which Aircrack-ng suite command is used to send deauthentication frames to force clients to reconnect?",
      options: ["aireplay-ng --deauth", "airodump-ng --kick", "aircrack-ng --disconnect", "airmon-ng --drop"],
      explanation: "aireplay-ng -0 (or --deauth) injects deauthentication frames, disconnecting targets to capture the reconnect handshake."
    }
  },
  "red-team-evasion": {
    phaseTitle: "Phase 6: Red Teaming & Evasion",
    title: "AV/EDR Evasion, AMSI Bypass & Command & Control (C2)",
    difficulty: "Expert",
    duration: "85 min",
    summary: "Bypass modern defenses (Windows Defender, CrowdStrike, SentinelOne). In-Memory Injection, AMSI patching, shellcode obfuscation, and C2 servers (Sliver, Havoc).",
    sections: [
      {
        heading: "1. Evading EDR API Hooks",
        content: "EDRs hook critical APIs in ntdll.dll to inspect behaviors. Red Team operators bypass hooks using Direct Syscalls (invoking system calls directly in assembly) or unhooking ntdll.",
        tip: "Sliver and Havoc provide modern open-source C2 capabilities rivaling Cobalt Strike."
      }
    ],
    quiz: {
      question: "Which Windows interface scans scripts in-memory before execution to pass them to installed antivirus engines?",
      options: ["AMSI (Antimalware Scan Interface)", "UAC (User Account Control)", "AppLocker", "DEP (Data Execution Prevention)"],
      explanation: "AMSI (Antimalware Scan Interface) allows applications like PowerShell to send script buffers directly to antivirus for real-time analysis."
    }
  },
  "blue-team-career": {
    phaseTitle: "Phase 7: Blue Team & Career",
    title: "SOC Analyst Foundations, Packet Analysis & Certification Roadmap",
    difficulty: "Intermediate",
    duration: "60 min",
    summary: "The best offense is rooted in deep defensive understanding. Traffic hunting with Wireshark, SIEM log analysis, and OSCP/eJPT certification roadmaps.",
    sections: [
      {
        heading: "1. Industry Certifications & Career Strategy",
        content: "- eJPT: Best hands-on beginner certification (48h mini penetration test).\n- OSCP: The industry gold standard (24h live exam + 24h professional report).\n- PNPT: Practical real-world OSINT and Active Directory pentest exam.\n- CompTIA Security+: Vendor-neutral foundational certification.",
        tip: "Publishing writeups on TryHackMe/HackTheBox and GitHub attracts direct recruiter attention."
      }
    ],
    quiz: {
      question: "Which hands-on ethical hacking certification requires 24 hours of live system exploitation followed by a professional pentest report?",
      options: ["OSCP (Offensive Security)", "CEH (Theoretical Exam)", "ITIL Foundation", "CCNA Routing"],
      explanation: "OSCP is widely recognized for its rigorous 24-hour practical penetration testing examination format."
    }
  }
};

window.CURRICULUM_EN = CURRICULUM_EN;
