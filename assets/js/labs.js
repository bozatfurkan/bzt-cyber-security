/**
 * BZT Cyber Security - Interactive Vulnerability Labs
 * Safe client-side simulations for SQLi, XSS, and Command Injection
 */

const BZTLabs = {
  // Mock Database for SQLi Lab
  mockDB: [
    { id: 1, username: "admin", role: "Super Administrator", secret: "FLAG{bzt_sql_injection_mastered_2026}", email: "admin@bzt-corp.internal" },
    { id: 2, username: "bozatfurkan", role: "Lead Security Researcher", secret: "SECRET_KEY_BZT_9942", email: "furkan@bzt-security.org" },
    { id: 3, username: "john_doe", role: "Auditor", secret: "audit_pass_443", email: "john@bzt-corp.internal" }
  ],

  // 1. SQL INJECTION LAB
  runSqlLab(payload) {
    const rawInput = payload.trim();
    const resultBox = document.getElementById("sqli-result");
    const queryDisplay = document.getElementById("sqli-query-display");

    if (!rawInput) {
      resultBox.innerHTML = `<span class="text-gray-500">Lütfen bir kullanıcı adı veya SQL payload'ı girin.</span>`;
      return;
    }

    // Simulated SQL Query construction
    const simulatedQuery = `SELECT id, username, role, email, secret FROM users WHERE username = '${rawInput}' AND is_active = 1;`;
    if (queryDisplay) {
      queryDisplay.innerHTML = `<span class="text-cyan-400 font-bold">SQL Sorgusu: </span><span class="text-yellow-300 font-mono">${this.escapeHtml(simulatedQuery)}</span>`;
    }

    // Check for SQLi Bypass patterns
    const isAlwaysTrue = /(?:'|\s)+or(?:'|\s)+['\d\w]+=['\d\w]+/i.test(rawInput) || /'--/i.test(rawInput) || /'#/i.test(rawInput) || /'\s*or\s+1=1/i.test(rawInput);
    const isUnion = /union\s+select/i.test(rawInput);
    const isAdminComment = /^admin'\s*(?:--|#|\/\*)/i.test(rawInput);

    if (isAdminComment) {
      const admin = this.mockDB[0];
      resultBox.innerHTML = `
        <div class="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-sm animate-fade-in">
          <div class="font-bold text-base flex items-center gap-2 mb-1 text-red-400">
            <span>🚨</span> TEBRİKLER! Kimlik Doğrulama Atlatıldı (Auth Bypass)
          </div>
          <p class="mb-2">Admin şifre kontrolü SQL yorum satırı (<code class="bg-black/50 px-1 text-yellow-300 font-mono">--</code>) ile etkisiz kılındı. Sisteme Admin olarak sızıldı!</p>
          <div class="bg-black/70 p-2 rounded font-mono text-xs text-emerald-400 space-y-1">
            <div>Kullanıcı: <b>${admin.username}</b> (Rol: ${admin.role})</div>
            <div>E-Posta: ${admin.email}</div>
            <div class="text-yellow-400 font-bold">Sızdırılan Gizli Bayrak: ${admin.secret}</div>
          </div>
        </div>`;
    } else if (isAlwaysTrue || isUnion) {
      resultBox.innerHTML = `
        <div class="p-3 bg-amber-950/60 border border-amber-500/50 rounded-lg text-amber-200 text-sm animate-fade-in">
          <div class="font-bold text-base flex items-center gap-2 mb-1 text-yellow-400">
            <span>⚠️</span> TÜM VERİTABANI SIZDIRILDI (Tautology / 1=1 Injection)
          </div>
          <p class="mb-2"><code class="bg-black/50 px-1 text-yellow-300 font-mono">' OR 1=1 --</code> koşulu her zaman DOĞRU (True) döndüğü için WHERE kısıtı kalktı ve tablodaki tüm kayıtlar döküldü:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-xs font-mono bg-black/80 rounded border border-gray-800">
              <thead class="text-cyan-400 border-b border-gray-800">
                <tr><th class="p-1 text-left">ID</th><th class="p-1 text-left">Username</th><th class="p-1 text-left">Role</th><th class="p-1 text-left">Secret</th></tr>
              </thead>
              <tbody class="divide-y divide-gray-800 text-gray-300">
                ${this.mockDB.map(u => `<tr><td class="p-1">${u.id}</td><td class="p-1 text-emerald-400">${u.username}</td><td class="p-1">${u.role}</td><td class="p-1 text-yellow-300">${u.secret}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>`;
    } else {
      const match = this.mockDB.find(u => u.username.toLowerCase() === rawInput.toLowerCase());
      if (match) {
        resultBox.innerHTML = `
          <div class="p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 text-sm">
            <span class="text-emerald-400 font-bold">Normal Giriş Başarılı:</span> Kullanıcı bulundu (${match.username}), ancak şifre kontrolü tamamlanmadan yetki verilmedi.
          </div>`;
      } else {
        resultBox.innerHTML = `
          <div class="p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm">
            <span class="text-red-400 font-bold">0 Kayıt Döndü:</span> Kullanıcı bulunamadı ve SQL enjeksiyon koşulu tetiklenmedi.
          </div>`;
      }
    }
  },

  // 2. XSS PLAYGROUND LAB
  runXssLab(payload, filterType) {
    const raw = payload.trim();
    const preview = document.getElementById("xss-preview");
    const status = document.getElementById("xss-status");

    if (!raw) {
      status.innerHTML = `<span class="text-gray-500">Lütfen test için bir XSS payload'ı girin.</span>`;
      preview.innerHTML = "";
      return;
    }

    let filtered = raw;
    let bypassed = false;
    let firedType = "";

    if (filterType === "waf-strict") {
      // Strips <script> tags only
      filtered = raw.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "[BLOCKED_BY_WAF]");
      if (/<img|<svg|<iframe|<body|<input/i.test(filtered) && /onerror=|onload=|onfocus=/i.test(filtered)) {
        bypassed = true;
        firedType = "WAF Bypass Etkinlik Tabanlı XSS (Event Handler Bypass)";
      }
    } else if (filterType === "no-filter") {
      if (/<script|onerror=|onload=|javascript:/i.test(raw)) {
        bypassed = true;
        firedType = "Klasik Script / DOM Enjeksiyonu";
      }
    }

    if (bypassed) {
      status.innerHTML = `
        <div class="p-3 bg-red-950/70 border border-red-500/60 rounded-lg text-red-200 text-sm animate-fade-in">
          <div class="font-bold text-red-400 flex items-center gap-2 mb-1">
            <span>🔥</span> XSS BAŞARIYLA TETİKLENDİ! (${firedType})
          </div>
          <p class="text-xs text-gray-300 mb-2">Tarayıcı payload'ı parse etti ve kod yürütüldü. Simüle edilen Alert penceresi aşağıda:</p>
          <div class="p-2 bg-yellow-500/20 border border-yellow-500 rounded text-yellow-300 font-mono text-xs flex items-center justify-between">
            <span>🔔 [Simulated Window Alert]: document.cookie = "session_id=BZT_ADMIN_TOKEN_99182"</span>
            <span class="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">PWNED</span>
          </div>
        </div>`;
    } else {
      status.innerHTML = `
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm">
          <span class="font-bold">🛡️ Engellendi:</span> Payload etkisiz hale getirildi veya filtreye takıldı. Farklı bir bypass (örneğin &lt;svg onload=...&gt;) deneyin.
        </div>`;
    }

    preview.innerText = filtered;
  },

  // 3. COMMAND INJECTION LAB
  runCmdLab(input) {
    const raw = input.trim();
    const resultBox = document.getElementById("cmd-result");

    if (!raw) {
      resultBox.innerHTML = `<span class="text-gray-500">Lütfen ping atılacak bir IP girin.</span>`;
      return;
    }

    // Check for Command Chaining operators: ; && | ` $()
    const hasInjection = /[;&|`]|(?:\$\()/.test(raw);

    if (hasInjection) {
      resultBox.innerHTML = `
        <div class="font-mono text-xs bg-black/90 p-3 rounded-lg border border-red-500/50 text-gray-300 space-y-1 animate-fade-in">
          <div class="text-gray-500 font-bold">$ ping -c 1 ${this.escapeHtml(raw)}</div>
          <div class="text-gray-400">PING ${this.escapeHtml(raw.split(/[;&|]/)[0].trim())} (127.0.0.1) 56(84) bytes of data.</div>
          <div class="text-gray-400">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.035 ms</div>
          <div class="my-1 border-t border-gray-800"></div>
          <div class="text-red-400 font-bold">[!] KOMUT ENJEKSİYONU ÇIKTISI (RCE TETİKLENDİ):</div>
          <div class="text-emerald-400 font-bold">uid=0(root) gid=0(root) groups=0(root)</div>
          <div class="text-yellow-300 font-bold">/etc/passwd:</div>
          <div class="text-gray-400">root:x:0:0:root:/root:/bin/bash</div>
          <div class="text-gray-400">daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin</div>
          <div class="text-cyan-400">bzt_admin:x:1001:1001:BZT Hacker:/home/bzt:/bin/bash</div>
        </div>`;
    } else {
      resultBox.innerHTML = `
        <div class="font-mono text-xs bg-black/90 p-3 rounded-lg border border-gray-800 text-gray-400 space-y-1">
          <div class="text-gray-500 font-bold">$ ping -c 2 ${this.escapeHtml(raw)}</div>
          <div>PING ${this.escapeHtml(raw)} (127.0.0.1) 56(84) bytes of data.</div>
          <div>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.041 ms</div>
          <div>64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.038 ms</div>
          <div class="text-emerald-400 mt-2 font-sans font-medium">İpucu: Komut zincirleme operatörlerini (<code>; whoami</code>, <code>&& id</code> veya <code>| cat /etc/passwd</code>) ekleyerek RCE açıklarını test edin.</div>
        </div>`;
    }
  },

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }
};

window.BZTLabs = BZTLabs;
