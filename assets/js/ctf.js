/**
 * BZT Cyber Security - CTF Challenge & Wargame Engine (v3.5 PRO)
 * Interactive Capture-The-Flag Challenges in Turkish & English
 */

const BZT_CTF_CHALLENGES = [
  {
    id: "ctf-1",
    level: 1,
    title: { tr: "Level 1: Gizli Kaynak & Robots.txt", en: "Level 1: Hidden Source & Robots.txt" },
    category: { tr: "Keşif & Web", en: "Recon & Web" },
    points: 100,
    difficulty: { tr: "Kolay", en: "Easy" },
    description: {
      tr: "Web sitelerindeki arama motoru indeksleme dosyaları (robots.txt) veya kaynak kodları geliştiricilerin unuttuğu gizli dizinleri ve bayrakları barındırabilir.",
      en: "Search engine crawler directives (robots.txt) or source comments often expose hidden endpoints, backup paths, or sensitive test flags."
    },
    hint: {
      tr: "BZT-Shell terminaline gidin ve 'cat robots.txt' komutunu çalıştırın!",
      en: "Go to the BZT-Shell terminal and execute 'cat robots.txt'!"
    },
    flag: "BZT{robots_txt_recon_master_2026}"
  },
  {
    id: "ctf-2",
    level: 2,
    title: { tr: "Level 2: İkili Şifreli Ajan Mesajı", en: "Level 2: Encoded Spy Transmission" },
    category: { tr: "Kriptografi", en: "Cryptography" },
    points: 150,
    difficulty: { tr: "Orta", en: "Medium" },
    description: {
      tr: "Yakalanan casus mesajı Base64 ile kodlanmıştır: <code class='bg-black/60 px-1 py-0.5 rounded text-cyan-300 font-mono'>QlpUe2Jhc2U2NF9jcnlwdG9fYnJlYWtlcl85OX0=</code>. Bu şifreyi Araçlar sekmesindeki Base64 çözücü ile açın ve bayrağı bulun.",
      en: "An intercepted transmission was encoded in Base64: <code class='bg-black/60 px-1 py-0.5 rounded text-cyan-300 font-mono'>QlpUe2Jhc2U2NF9jcnlwdG9fYnJlYWtlcl85OX0=</code>. Use the Base64 Decoder in the Arsenal tab to uncover the flag."
    },
    hint: {
      tr: "Araçlar (Arsenal) sekmesindeki 'Base64 Decode' fonksiyonunu kullanın.",
      en: "Use the 'Base64 Decode' button under the Arsenal tab."
    },
    flag: "BZT{base64_crypto_breaker_99}"
  },
  {
    id: "ctf-3",
    level: 3,
    title: { tr: "Level 3: Veritabanı Sızıntısı (SQLi)", en: "Level 3: Database Data Leak (SQLi)" },
    category: { tr: "Web Sızma", en: "Web Exploitation" },
    points: 200,
    difficulty: { tr: "Orta", en: "Medium" },
    description: {
      tr: "Laboratuvar sekmesindeki SQL Injection Lab'ında kimlik doğrulama bypass (Auth Bypass) payload'ı kullanarak Admin hesabına sızın ve ekrana dökülen gizli bayrağı buraya girin.",
      en: "Navigate to the SQL Injection Lab, trigger an Authentication Bypass payload against the admin user, and capture the revealed secret flag."
    },
    hint: {
      tr: "SQLi Lab'da 'admin\\' --' payload'ını çalıştırın.",
      en: "Run 'admin\\' --' in the SQL Injection Lab."
    },
    flag: "BZT{sqli_auth_bypass_godmode}"
  },
  {
    id: "ctf-4",
    level: 4,
    title: { tr: "Level 4: Root Bayrağı (Privilege Escalation)", en: "Level 4: Root Flag (Privilege Escalation)" },
    category: { tr: "Linux & Sistem", en: "Linux & System" },
    points: 250,
    difficulty: { tr: "İleri", en: "Advanced" },
    description: {
      tr: "BZT-Shell Kali simülatöründe root dizinindeki 'flag.txt' dosyasının içeriğini okuyun.",
      en: "Read the secret 'flag.txt' file inside the root workspace of the BZT-Shell Kali simulator."
    },
    hint: {
      tr: "BZT-Shell terminalinde 'cat flag.txt' komutunu çalıştırın.",
      en: "Execute 'cat flag.txt' in BZT-Shell."
    },
    flag: "BZT{3l1t3_h4ck3r_m4st3rm1nd_2026}"
  },
  {
    id: "ctf-5",
    level: 5,
    title: { tr: "Level 5: Hash Kırma Ustası (Hashcat)", en: "Level 5: Hash Cracking Master (Hashcat)" },
    category: { tr: "Parola Kırma", en: "Password Cracking" },
    points: 300,
    difficulty: { tr: "İleri", en: "Advanced" },
    description: {
      tr: "Sızdırılan MD5 parolası: <code class='bg-black/60 px-1 py-0.5 rounded text-yellow-300 font-mono'>5f4dcc3b5aa765d61d8327deb882cf99</code>. BZT-Shell'de 'hashcat' komutu ile bu hash'i kırın. Bayrak formatı: <b>BZT{kirilan_parola}</b>.",
      en: "Leaked MD5 hash: <code class='bg-black/60 px-1 py-0.5 rounded text-yellow-300 font-mono'>5f4dcc3b5aa765d61d8327deb882cf99</code>. Crack this hash in BZT-Shell using 'hashcat'. Flag format: <b>BZT{cracked_password}</b>."
    },
    hint: {
      tr: "BZT-Shell terminalinde 'hashcat 5f4dcc3b5aa765d61d8327deb882cf99' komutunu çalıştırarak şifreyi görebilirsiniz.",
      en: "Execute 'hashcat 5f4dcc3b5aa765d61d8327deb882cf99' in BZT-Shell."
    },
    flag: "BZT{password}"
  }
];

const BZT_CTF = {
  getSolvedFlags() {
    return JSON.parse(localStorage.getItem("bzt_solved_flags") || "[]");
  },

  renderChallenges(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const getT = (obj) => typeof obj === "object" && obj !== null ? (obj[lang] || obj.tr || obj.en || "") : obj;

    const solved = this.getSolvedFlags();
    let totalScore = 0;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${BZT_CTF_CHALLENGES.map(ch => {
          const isSolved = solved.includes(ch.id);
          if (isSolved) totalScore += ch.points;

          return `
            <div class="clean-card p-6 flex flex-col justify-between transition-all ${isSolved ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-200 bg-white'}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-mono px-2.5 py-1 rounded-lg border ${isSolved ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold' : 'bg-slate-100 border-slate-200 text-slate-700 font-medium'}">
                    ${getT(ch.category)}
                  </span>
                  <span class="text-xs font-mono font-bold ${isSolved ? 'text-emerald-600' : 'text-[#f37021]'}">
                    +${ch.points} XP
                  </span>
                </div>

                <h4 class="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span class='font-mono text-xs font-bold ${isSolved ? 'text-emerald-600' : 'text-[#f37021]'}'>${isSolved ? '[TAMAMLANDI]' : '[HEDEF]'}</span>
                  ${getT(ch.title)}
                </h4>

                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  ${getT(ch.description)}
                </p>

                <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mb-4 font-mono">
                  <b class="text-[#f37021]">${lang === 'tr' ? 'İpucu:' : 'Hint:'}</b> ${getT(ch.hint)}
                </div>
              </div>

              <div>
                ${isSolved ? `
                  <div class="p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl text-xs font-mono text-emerald-800 font-bold flex items-center justify-between">
                    <span>${lang === 'tr' ? 'ÇÖZÜLDÜ (SOLVED)' : 'SOLVED'}</span>
                    <span>+${ch.points} XP</span>
                  </div>
                ` : `
                  <div class="space-y-2">
                    <div class="flex gap-2">
                      <input type="text" id="flag-input-${ch.id}" onkeydown="if(event.key==='Enter') BZT_CTF.submitFlag('${ch.id}')" placeholder="${lang === 'tr' ? 'BZT{...} bayrağını girin' : 'Enter BZT{...} flag'}" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#f37021]">
                      <button onclick="BZT_CTF.submitFlag('${ch.id}')" class="bg-[#f37021] hover:bg-[#e05d0e] text-white font-bold font-mono text-xs px-4 py-2 rounded-xl transition-all shadow-xs">
                        ${lang === 'tr' ? 'Gönder' : 'Submit'}
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

    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const input = document.getElementById(`flag-input-${chId}`);
    const feedback = document.getElementById(`flag-feedback-${chId}`);
    if (!input || !feedback) return;

    const submitted = input.value.trim();

    if (submitted === ch.flag) {
      feedback.innerHTML = `<span class="text-emerald-400 font-bold">${lang === 'tr' ? 'Doğru Bayrak!' : 'Correct Flag!'} +${ch.points} XP!</span>`;
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
      feedback.innerHTML = `<span class="text-red-400">${lang === 'tr' ? 'Yanlış bayrak değeri. İpucunu kontrol edin.' : 'Incorrect flag. Check the hint.'}</span>`;
    }
  }
};

window.BZT_CTF = BZT_CTF;
