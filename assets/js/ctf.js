/**
 * BZT Cyber Security - CTF Challenge & Wargame Engine (OverTheWire / HTB Style)
 * Interactive Capture-The-Flag Challenges
 */

const BZT_CTF_CHALLENGES = [
  {
    id: "ctf-1",
    level: 1,
    title: "Level 1: Gizli Kaynak & Robots.txt",
    category: "Recon & Web",
    points: 100,
    difficulty: "Kolay",
    description: "Web sitelerindeki arama motoru indeksleme dosyaları (robots.txt) veya HTML kaynak kodları geliştiricilerin unuttuğu gizli dizinleri ve bayrakları barındırabilir.",
    hint: "BZT-Shell terminaline gidin ve 'cat robots.txt' komutunu çalıştırın veya terminalde 'ls' yapın!",
    flag: "BZT{robots_txt_recon_master_2026}",
    completed: false
  },
  {
    id: "ctf-2",
    level: 2,
    title: "Level 2: İkili Şifreli Ajan Mesajı",
    category: "Kriptografi",
    points: 150,
    difficulty: "Orta",
    description: "Yakalanan casus mesajı Base64 ile kodlanmıştır: <code class='bg-black/60 px-1 py-0.5 rounded text-cyan-300 font-mono'>QlpUe2Jhc2U2NF9jcnlwdG9fYnJlYWtlcl85OX0=</code>. Bu şifreyi Araçlar sekmesindeki Base64 çözücü ile açın ve bayrağı bulun.",
    hint: "Araç Çantası (Tools) sekmesindeki 'Base64 Decode' fonksiyonunu kullanın.",
    flag: "BZT{base64_crypto_breaker_99}",
    completed: false
  },
  {
    id: "ctf-3",
    level: 3,
    title: "Level 3: Veritabanı Sızıntısı (SQLi)",
    category: "Web Exploitation",
    points: 200,
    difficulty: "Orta",
    description: "Laboratuvar sekmesindeki SQL Injection Lab'ında kimlik doğrulama bypass (Auth Bypass) payload'ı kullanarak Admin hesabına sızın ve ekrana dökülen gizli bayrağı buraya girin.",
    hint: "SQLi Lab'da 'admin\\' --' payload'ını çalıştırın.",
    flag: "BZT{sqli_auth_bypass_godmode}",
    completed: false
  },
  {
    id: "ctf-4",
    level: 4,
    title: "Level 4: Root Bayrağı (Privilege Escalation)",
    category: "Linux & Sistem",
    points: 250,
    difficulty: "İleri",
    description: "BZT-Shell Kali simülatöründe root dizinindeki 'flag.txt' dosyasının içeriğini okuyun.",
    hint: "BZT-Shell'e 'cat flag.txt' yazın.",
    flag: "BZT{3l1t3_h4ck3r_m4st3rm1nd_2026}",
    completed: false
  },
  {
    id: "ctf-5",
    level: 5,
    title: "Level 5: Hash Kırma Ustası (Hashcat)",
    category: "Password Cracking",
    points: 300,
    difficulty: "İleri",
    description: "Sızdırılan MD5 parolası: <code class='bg-black/60 px-1 py-0.5 rounded text-yellow-300 font-mono'>5f4dcc3b5aa765d61d8327deb882cf99</code>. BZT-Shell'de 'hashcat' komutu ile veya parola sözlükleri ile bu hash'i kırın. Bayrak formatı: <b>BZT{kirilan_parola}</b>.",
    hint: "BZT-Shell terminalinde 'hashcat 5f4dcc3b5aa765d61d8327deb882cf99' komutunu çalıştırarak şifreyi görebilirsiniz (Örn: parola 'password' ise bayrak: BZT{password}).",
    flag: "BZT{password}",
    completed: false
  }
];

const BZT_CTF = {
  getSolvedFlags() {
    return JSON.parse(localStorage.getItem("bzt_solved_flags") || "[]");
  },

  renderChallenges(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const solved = this.getSolvedFlags();
    let totalScore = 0;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${BZT_CTF_CHALLENGES.map(ch => {
          const isSolved = solved.includes(ch.id);
          if (isSolved) totalScore += ch.points;

          return `
            <div class="glass-panel p-5 rounded-xl border flex flex-col justify-between transition-all ${isSolved ? 'border-emerald-500/50 bg-emerald-950/20 shadow-lg shadow-emerald-950/30' : 'border-gray-800'}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-mono px-2 py-0.5 rounded border ${isSolved ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' : 'bg-gray-900 border-gray-700 text-gray-400'}">
                    ${ch.category}
                  </span>
                  <span class="text-xs font-mono font-bold ${isSolved ? 'text-emerald-400' : 'text-yellow-400'}">
                    +${ch.points} XP
                  </span>
                </div>

                <h4 class="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span>${isSolved ? '🚩' : '🎯'}</span>
                  ${ch.title}
                </h4>

                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                  ${ch.description}
                </p>

                <div class="p-2.5 bg-black/50 border border-gray-800 rounded-lg text-xs text-cyan-300/80 mb-4">
                  <b>💡 İpucu:</b> ${ch.hint}
                </div>
              </div>

              <div>
                ${isSolved ? `
                  <div class="p-2.5 bg-emerald-950/80 border border-emerald-500/60 rounded-lg text-xs font-mono text-emerald-300 font-bold flex items-center justify-between">
                    <span>✓ ÇÖZÜLDÜ (SOLVED)</span>
                    <span>+${ch.points} XP</span>
                  </div>
                ` : `
                  <div class="space-y-2">
                    <div class="flex gap-2">
                      <input type="text" id="flag-input-${ch.id}" placeholder="BZT{...} bayrağını girin" class="flex-1 bg-cyber-900 border border-gray-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500">
                      <button onclick="BZT_CTF.submitFlag('${ch.id}')" class="bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs px-3 py-1.5 rounded-lg transition-colors">
                        Gönder
                      </button>
                    </div>
                    <div id="flag-feedback-${ch.id}" class="text-[11px] font-mono min-h-[18px]"></div>
                  </div>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    const scoreBadge = document.getElementById("ctf-total-score");
    if (scoreBadge) scoreBadge.innerText = `${totalScore} / 1000 XP`;
  },

  submitFlag(chId) {
    const ch = BZT_CTF_CHALLENGES.find(x => x.id === chId);
    if (!ch) return;

    const input = document.getElementById(`flag-input-${chId}`);
    const feedback = document.getElementById(`flag-feedback-${chId}`);
    if (!input || !feedback) return;

    const submitted = input.value.trim();

    if (submitted === ch.flag) {
      feedback.innerHTML = `<span class="text-emerald-400 font-bold">🎉 Doğru Bayrak! +${ch.points} XP Kazanıldı!</span>`;
      const solved = this.getSolvedFlags();
      if (!solved.includes(chId)) {
        solved.push(chId);
        localStorage.setItem("bzt_solved_flags", JSON.stringify(solved));
      }
      if (window.BZTApp && typeof window.BZTApp.addXp === "function") {
        window.BZTApp.addXp(ch.points);
      }
      setTimeout(() => {
        this.renderChallenges("ctf-challenges-container");
      }, 800);
    } else {
      feedback.innerHTML = `<span class="text-red-400">❌ Yanlış bayrak formatı veya değeri. İpucunu kontrol edin.</span>`;
    }
  }
};

window.BZT_CTF = BZT_CTF;
