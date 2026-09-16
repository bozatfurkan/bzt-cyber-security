/**
 * BZT Cyber Security - Interactive Web Terminal (BZT-Shell)
 * Browser-based Kali Linux & Ethical Hacking Simulator
 */

class BZTerminal {
  constructor(containerId, inputId, promptId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.prompt = document.getElementById(promptId);
    this.history = [];
    this.historyIndex = -1;
    this.inMsf = false;

    this.fileSystem = {
      "targets.txt": "192.168.1.100 - Web Server (Ubuntu 22.04)\n192.168.1.105 - Windows Server 2022 (Domain Controller)\n10.10.10.25 - Internal Database",
      "notes.txt": "TODO Pentest Checklist:\n[x] Passive Recon (Whois, Shodan)\n[x] Subdomain Enum (gobuster)\n[ ] Port Scan (nmap -sV -sC)\n[ ] Web Vuln Assessment (SQLi, XSS)\n[ ] PrivEsc to Root",
      "flag.txt": "BZT{3l1t3_h4ck3r_m4st3rm1nd_2026}",
      "hashes.txt": "admin:5f4dcc3b5aa765d61d8327deb882cf99 (MD5: password)\nroot:e80b5017098950fc58aad83c8c14978e (MD5: encrypted)"
    };

    if (this.input) {
      this.initEvents();
      this.printWelcome();
    }
  }

  initEvents() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
        }
        this.executeCommand(cmd);
        this.input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex] || "";
        } else {
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autoComplete();
      }
    });

    // Keep focus when clicking on container
    this.container.addEventListener("click", () => {
      this.input.focus();
    });
  }

  printWelcome() {
    this.writeLine(`<span class="text-cyan-400 font-bold">┌──(root@bzt-security)-[~]</span>`);
    this.writeLine(`<span class="text-gray-400">⚡ BZT-Shell v2.0 - Kali Linux Sanal Simülatörü Başlatıldı.</span>`);
    this.writeLine(`<span class="text-gray-500">Mevcut komutları görmek için <span class="text-emerald-400 font-bold font-mono">'help'</span> yazın.</span>`);
    this.writeLine(``);
  }

  writeLine(htmlContent) {
    const line = document.createElement("div");
    line.className = "terminal-line leading-relaxed break-words";
    line.innerHTML = htmlContent;
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  autoComplete() {
    const val = this.input.value.trim();
    const common = ["help", "clear", "ls", "cat", "whoami", "id", "pwd", "nmap", "sqlmap", "gobuster", "hashcat", "msfconsole", "linpeas", "uname"];
    const files = Object.keys(this.fileSystem);
    const tokens = val.split(" ");
    
    if (tokens.length === 1) {
      const match = common.find(c => c.startsWith(tokens[0]));
      if (match) this.input.value = match;
    } else if (tokens[0] === "cat" && tokens.length === 2) {
      const match = files.find(f => f.startsWith(tokens[1]));
      if (match) this.input.value = `cat ${match}`;
    }
  }

  executeCommand(rawCmd) {
    // Echo the prompt + command
    const promptText = this.inMsf 
      ? `<span class="text-red-500 font-bold">msf6</span> > ` 
      : `<span class="text-cyan-400 font-bold">root@bzt-security:~#</span> `;
    
    this.writeLine(`${promptText}<span class="text-white font-mono">${this.escapeHtml(rawCmd)}</span>`);

    if (!rawCmd) return;

    // Handle MSF Console mode
    if (this.inMsf) {
      this.handleMsf(rawCmd);
      return;
    }

    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
      case "?":
        this.writeLine(`
<div class="text-gray-300 py-1 space-y-1">
  <div class="text-emerald-400 font-bold mb-1">🛠️ Kullanılabilir BZT-Shell Komutları:</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">nmap &lt;target&gt;</span> : Akıllı ağ ve port taraması simülasyonu</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">sqlmap -u &lt;url&gt;</span> : Web veritabanı enjeksiyon testi simülasyonu</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">gobuster dir</span> : Dizin ve dosya keşif taraması</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">hashcat &lt;hash&gt;</span> : Parola kırma motoru</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">msfconsole</span> : Metasploit Framework konsoluna geçiş</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">linpeas</span> : Otomatik Linux yetki yükseltme tarayıcısı</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">ls / dir</span> : Dizin içeriklerini listele</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">cat &lt;dosya&gt;</span> : Dosya içeriğini oku</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">whoami / id</span> : Aktif oturum ve yetki durumu</div>
  <div><span class="text-cyan-300 font-mono w-28 inline-block font-bold">clear</span> : Ekranı temizle</div>
</div>`);
        break;

      case "clear":
        this.container.innerHTML = "";
        this.printWelcome();
        break;

      case "whoami":
        this.writeLine(`<span class="text-emerald-400 font-bold">root</span>`);
        break;

      case "id":
        this.writeLine(`uid=0(root) gid=0(root) groups=0(root),27(sudo),100(users)`);
        break;

      case "pwd":
        this.writeLine(`/root/bzt-workspace`);
        break;

      case "uname":
      case "uname -a":
        this.writeLine(`Linux bzt-security-engine 6.8.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`);
        break;

      case "ls":
      case "dir":
        const fileList = Object.keys(this.fileSystem).map(f => {
          if (f.endsWith(".txt")) return `<span class="text-yellow-300">${f}</span>`;
          return `<span class="text-cyan-300 font-bold">${f}</span>`;
        }).join("    ");
        this.writeLine(fileList);
        break;

      case "cat":
        if (args.length === 0) {
          this.writeLine(`<span class="text-red-400">Kullanım: cat &lt;dosya_adı&gt;</span>`);
        } else {
          const fname = args[0];
          if (this.fileSystem[fname]) {
            this.writeLine(`<pre class="text-gray-300 font-mono whitespace-pre-wrap">${this.escapeHtml(this.fileSystem[fname])}</pre>`);
          } else {
            this.writeLine(`<span class="text-red-400">cat: ${this.escapeHtml(fname)}: Dosya bulunamadı.</span>`);
          }
        }
        break;

      case "nmap":
        const target = args[0] || "192.168.1.100";
        this.writeLine(`<span class="text-cyan-400">[*] Nmap 7.94 başlatılıyor - Hedef: ${this.escapeHtml(target)}</span>`);
        this.writeLine(`<span class="text-gray-400">Initiating SYN Stealth Scan... Discovered open ports!</span>`);
        setTimeout(() => {
          this.writeLine(`
<div class="font-mono text-xs md:text-sm text-gray-300 my-2 p-2 bg-gray-950 border border-gray-800 rounded">
<span class="text-emerald-400 font-bold">PORT      STATE SERVICE     VERSION</span>
21/tcp    <span class="text-emerald-400">open</span>  ftp         vsftpd 2.3.4 <span class="text-red-400 font-bold">(VULNERABLE: Backdoor Command Exec)</span>
22/tcp    <span class="text-emerald-400">open</span>  ssh         OpenSSH 8.9p1 Ubuntu
80/tcp    <span class="text-emerald-400">open</span>  http        Apache httpd 2.4.52 ((Ubuntu))
445/tcp   <span class="text-emerald-400">open</span>  netbios-ssn Samba smbd 4.6.2
3306/tcp  <span class="text-emerald-400">open</span>  mysql       MySQL 8.0.32
8080/tcp  <span class="text-emerald-400">open</span>  http-proxy  Apache Tomcat/9.0.58

<span class="text-cyan-400">Service Info:</span> OS: Linux; CPE: cpe:/o:linux:linux_kernel
<span class="text-yellow-400">Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds</span>
</div>`);
          this.writeLine(`<span class="text-emerald-400">💡 İpucu: Port 21'deki vsftpd 2.3.4 sürümü bilinen arka kapı (CVE-2011-2523) zafiyetine sahiptir!</span>`);
        }, 300);
        break;

      case "sqlmap":
        this.writeLine(`<span class="text-cyan-400">[*] sqlmap/1.7#stable - otomatik SQL enjeksiyon dedektörü</span>`);
        setTimeout(() => {
          this.writeLine(`
<div class="font-mono text-xs md:text-sm text-gray-300 my-2 p-2 bg-gray-950 border border-gray-800 rounded">
[INFO] testing connection to the target URL
[INFO] testing if the target URL content is stable
[INFO] heuristic (basic) test shows that GET parameter 'id' might be injectable
[+] <span class="text-red-400 font-bold">GET parameter 'id' is vulnerable!</span>
Type: boolean-based blind
Title: AND boolean-based blind - WHERE or HAVING clause
Payload: id=1 AND 8829=8829

Type: error-based
Title: MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause
Payload: id=1 AND (SELECT 9918 FROM(SELECT COUNT(*),CONCAT(0x71707a7071,(SELECT (ELT(9918=9918,1))),0x7176717a71,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)

[INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: PHP 8.1.2, Apache 2.4.52
back-end DBMS: <span class="text-emerald-400 font-bold">MySQL >= 5.0.12</span>
available databases [2]:
[*] information_schema
[*] <span class="text-yellow-400 font-bold">bzt_corp_db</span>
</div>`);
        }, 400);
        break;

      case "gobuster":
        this.writeLine(`<span class="text-cyan-400">[*] Gobuster v3.6 - Hızlı Dizin Keşif Motoru</span>`);
        setTimeout(() => {
          this.writeLine(`
<div class="font-mono text-xs md:text-sm text-gray-300 my-2 p-2 bg-gray-950 border border-gray-800 rounded">
===============================================================
[+] Url:                     http://hedef.local
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                common.txt
===============================================================
/admin                (Status: <span class="text-yellow-400">301</span>) [Size: 178] [--> http://hedef.local/admin/]
/login.php            (Status: <span class="text-emerald-400">200</span>) [Size: 3412]
/robots.txt           (Status: <span class="text-emerald-400">200</span>) [Size: 154]
/uploads              (Status: <span class="text-yellow-400">301</span>) [Size: 178]
/config.php.bak       (Status: <span class="text-red-400 font-bold">200</span>) [Size: 842] <span class="text-red-400 font-bold">&lt;-- HASSAS YEDEK!</span>
/api/v1/users         (Status: <span class="text-emerald-400">200</span>) [Size: 1208]
===============================================================
</div>`);
        }, 300);
        break;

      case "hashcat":
        const hash = args[0] || "5f4dcc3b5aa765d61d8327deb882cf99";
        this.writeLine(`<span class="text-cyan-400">[*] Hashcat v6.2.6 başlatıldı - Hash Modu: 0 (MD5)</span>`);
        setTimeout(() => {
          this.writeLine(`
<div class="font-mono text-xs md:text-sm text-gray-300 my-2 p-2 bg-gray-950 border border-gray-800 rounded">
Dictionary cache hit: /usr/share/wordlists/rockyou.txt (14,344,392 words)
Speed.#1.........: 1245.8 MH/s (38.41ms) @ Accel:1024 Loops:1024 Thr:1 Vec:8

<span class="text-emerald-400 font-bold">${this.escapeHtml(hash)}:password</span>

Session..........: hashcat
Status...........: <span class="text-emerald-400 font-bold">Cracked</span>
Hash.Name........: MD5
Time.Started.....: Wed Sep 16 17:50:02 2026 (0.01 secs)
</div>`);
        }, 300);
        break;

      case "msfconsole":
        this.inMsf = true;
        this.prompt.innerHTML = `<span class="text-red-500 font-bold">msf6</span> > `;
        this.writeLine(`
<pre class="text-red-400 text-xs font-mono">
       =[ metasploit v6.3.45-dev                          ]
+ -- --=[ 2390 exploits - 1235 auxiliary - 418 post       ]
+ -- --=[ 1391 payloads - 46 encoders - 11 nops           ]
+ -- --=[ Free & Open Source Penetration Testing Suite    ]
</pre>
<span class="text-gray-400">Metasploit modundan çıkmak için <span class="text-yellow-400">'exit'</span> yazın.</span>`);
        break;

      case "linpeas":
        this.writeLine(`<span class="text-cyan-400 font-bold">[*] LinPEAS - Linux Privilege Escalation Awesome Script</span>`);
        setTimeout(() => {
          this.writeLine(`
<div class="font-mono text-xs md:text-sm text-gray-300 my-2 p-2 bg-gray-950 border border-gray-800 rounded">
<span class="text-red-500 font-bold font-mono">╔══════════╣ Sudo version & Sudoers permissions</span>
<span class="text-yellow-400 font-bold">User may run the following commands on this host:</span>
    (ALL : ALL) <span class="text-red-500 font-bold bg-yellow-900/40 px-1">NOPASSWD: /usr/bin/find</span>

<span class="text-red-500 font-bold font-mono">╔══════════╣ SUID Files with Root Perms</span>
-rwsr-xr-x 1 root root 64K Feb 2026 <span class="text-red-400 font-bold">/usr/bin/pkexec</span> (CVE-2021-4034 PwnKit)
-rwsr-xr-x 1 root root 48K Jan 2026 /usr/bin/passwd

<span class="text-emerald-400 font-bold">[*] Root yetkisi elde etme komutu:</span>
sudo find . -exec /bin/sh \\; -quit
</div>`);
        }, 300);
        break;

      default:
        this.writeLine(`<span class="text-red-400">BZT-Shell: komut bulunamadı: '${this.escapeHtml(cmd)}'. Komut listesi için 'help' yazın.</span>`);
    }
  }

  handleMsf(cmd) {
    const parts = cmd.split(/\s+/);
    const op = parts[0].toLowerCase();

    if (op === "exit" || op === "quit") {
      this.inMsf = false;
      this.prompt.innerHTML = `<span class="text-cyan-400 font-bold">root@bzt-security:~#</span> `;
      this.writeLine(`<span class="text-gray-400">Metasploit kapatıldı. BZT-Shell standart moduna dönüldü.</span>`);
    } else if (op === "use") {
      const mod = parts[1] || "exploit/multi/handler";
      this.writeLine(`<span class="text-emerald-400">[*] Using module: ${this.escapeHtml(mod)}</span>`);
    } else if (op === "exploit" || op === "run") {
      this.writeLine(`<span class="text-cyan-400">[*] Started reverse TCP handler on 10.10.14.5:4444</span>`);
      setTimeout(() => {
        this.writeLine(`<span class="text-emerald-400 font-bold">[+] Meterpreter session 1 opened (10.10.14.5:4444 -> 192.168.1.100:49152)!</span>`);
        this.writeLine(`<span class="text-yellow-400">meterpreter > getuid</span>`);
        this.writeLine(`Server username: <span class="text-red-500 font-bold">NT AUTHORITY\\SYSTEM</span>`);
      }, 300);
    } else {
      this.writeLine(`<span class="text-gray-400">msf: komut işlendi ('${this.escapeHtml(cmd)}'). Çıkmak için 'exit' yazın.</span>`);
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }
}

window.BZTerminal = BZTerminal;
