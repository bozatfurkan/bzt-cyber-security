/**
 * BZT Cyber Security - Interactive Vulnerability Labs (v3.5 PRO)
 * Safe client-side simulations for SQLi, XSS, Command Injection, LFI, and JWT Tampering
 */

const BZTLabs = {
  // Mock Database for SQLi Lab
  mockDB: [
    { id: 1, username: "admin", role: "Super Administrator", secret: "BZT{sqli_auth_bypass_godmode}", email: "admin@bzt-corp.internal" },
    { id: 2, username: "bozatfurkan", role: "Lead Security Researcher", secret: "BZT{lead_researcher_token_99}", email: "furkan@bzt-security.org" },
    { id: 3, username: "john_doe", role: "Auditor", secret: "audit_pass_443", email: "john@bzt-corp.internal" },
    { id: 4, username: "db_backup_service", role: "Service Account", secret: "BZT{db_service_credential_dump}", email: "backup@bzt-corp.internal" }
  ],

  // Mock File System for LFI Lab
  mockFiles: {
    "about.php": "<h1>Hakkımızda</h1><p>BZT Cyber Security Ar-Ge Laboratuvarı.</p>",
    "contact.php": "<h1>İletişim</h1><p>E-posta: contact@bzt-security.org</p>",
    "../../../../etc/passwd": `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nfurkan:x:1000:1000:Furkan Bozat:/home/furkan:/bin/bash\nflag_user:x:1001:1001:CTF Flag User:/home/flag:BZT{lfi_path_traversal_mastered}`,
    "secret.php": "<?php\n// Gizli API Anahtarları\n$FLAG = 'BZT{lfi_php_filter_source_code_leak}';\n$DB_PASS = 'P@ssw0rd2026!#';\n?>"
  },

  // 1. SQL INJECTION LAB
  runSqlLab(payload) {
    const rawInput = payload.trim();
    const resultBox = document.getElementById("sqli-result");
    const queryDisplay = document.getElementById("sqli-query-display");

    if (!rawInput) {
      resultBox.innerHTML = `<span class="text-gray-500">Lütfen bir kullanıcı adı veya SQL payload'ı girin.</span>`;
      return;
    }

    const simulatedQuery = `SELECT id, username, role, email, secret FROM users WHERE username = '${rawInput}' AND is_active = 1;`;
    if (queryDisplay) {
      queryDisplay.innerHTML = `<span class="text-cyan-400 font-bold">Oluşturulan SQL: </span><span class="text-yellow-300 font-mono">${this.escapeHtml(simulatedQuery)}</span>`;
    }

    const isAlwaysTrue = /(?:'|\s)+or(?:'|\s)+['\d\w]+=['\d\w]+/i.test(rawInput) || /'--/i.test(rawInput) || /'#/i.test(rawInput) || /'\s*or\s+1=1/i.test(rawInput);
    const isUnion = /union\s+select/i.test(rawInput);
    const isAdminComment = /^admin'\s*(?:--|#|\/\*)/i.test(rawInput);

    if (isAdminComment) {
      const admin = this.mockDB[0];
      resultBox.innerHTML = `
        <div class="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-sm animate-fade-in">
          <div class="font-bold text-base flex items-center gap-2 mb-1 text-red-400">
            <span class="font-mono font-bold">[BAŞARILI]</span> Kimlik Doğrulama Atlatıldı (Auth Bypass)
          </div>
          <p class="mb-2">Admin şifre kontrolü SQL yorum satırı (<code class="bg-black/50 px-1 text-yellow-300 font-mono">--</code>) ile etkisiz kılındı. Sisteme Admin olarak sızıldı!</p>
          <div class="bg-black/70 p-2.5 rounded font-mono text-xs text-emerald-400 space-y-1">
            <div>Kullanıcı: <b>${admin.username}</b> (${admin.role})</div>
            <div>E-Posta: ${admin.email}</div>
            <div class="text-yellow-400 font-bold">Bayrak (Flag): ${admin.secret}</div>
          </div>
        </div>`;
      this.awardLabXp(50);
    } else if (isAlwaysTrue || isUnion) {
      resultBox.innerHTML = `
        <div class="p-3 bg-amber-950/60 border border-amber-500/50 rounded-lg text-amber-200 text-sm animate-fade-in">
          <div class="font-bold text-base flex items-center gap-2 mb-1 text-yellow-400">
            <span class="font-mono font-bold">[UYARI]</span> TÜM VERİTABANI SIZDIRILDI (Tautology / 1=1 Injection)
          </div>
          <p class="mb-2"><code class="bg-black/50 px-1 text-yellow-300 font-mono">' OR 1=1 --</code> koşulu her zaman DOĞRU (True) döndüğü için tüm kayıtlar listelendi:</p>
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
      this.awardLabXp(50);
    } else {
      const match = this.mockDB.find(u => u.username.toLowerCase() === rawInput.toLowerCase());
      if (match) {
        resultBox.innerHTML = `
          <div class="p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 text-sm">
            <span class="text-emerald-400 font-bold">Normal Kullanıcı Bulundu:</span> ${match.username}, ancak şifre doğrulanmadığı için giriş reddedildi.
          </div>`;
      } else {
        resultBox.innerHTML = `
          <div class="p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm">
            <span class="text-red-400 font-bold">0 Kayıt Döndü:</span> Kullanıcı bulunamadı ve SQL enjeksiyon koşulu oluşmadı.
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
      if (preview) preview.innerHTML = "";
      return;
    }

    let filtered = raw;
    let bypassed = false;
    let firedType = "";

    if (filterType === "waf-strict") {
      filtered = raw.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "[WAF:SCRIPT_TAG_BLOCKED]");
      if (/<img|<svg|<iframe|<body|<input|<a/i.test(filtered) && /onerror=|onload=|onfocus=|onclick=/i.test(filtered)) {
        bypassed = true;
        firedType = "WAF Bypass: HTML5 Event Handler (onerror/onload) Enjeksiyonu";
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
            <span class="font-mono font-bold">[TETİKLENDİ]</span> XSS BAŞARIYLA TETİKLENDİ! (${firedType})
          </div>
          <p class="text-xs text-gray-300 mb-2">Tarayıcı payload'ı çalıştırdı. Sahte oturum çerezi çalındı:</p>
          <div class="p-2 bg-yellow-500/20 border border-yellow-500 rounded text-yellow-300 font-mono text-xs flex items-center justify-between">
            <span>[Simüle Bildirim]: document.cookie = "BZT_SESSION_PWNED_2026; flag=BZT{xss_reflected_waf_bypass}"</span>
            <span class="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">PWNED</span>
          </div>
        </div>`;
      this.awardLabXp(50);
    } else {
      status.innerHTML = `
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm">
          <span class="font-bold">Güvenli:</span> Girdi başarıyla filtrelendi veya çalıştırılabilir JS bulunamadı.
        </div>`;
    }

    if (preview) preview.innerText = filtered;
  },

  // 3. COMMAND INJECTION LAB
  runCmdLab(input) {
    const raw = input.trim();
    const resultBox = document.getElementById("cmd-result");

    if (!raw) {
      resultBox.innerHTML = `<span class="text-gray-500">Lütfen ping atılacak bir IP girin.</span>`;
      return;
    }

    const hasInjection = /[;&|`]|(?:\$\()/.test(raw);

    if (hasInjection) {
      resultBox.innerHTML = `
        <div class="font-mono text-xs bg-black/90 p-3 rounded-lg border border-red-500/50 text-gray-300 space-y-1 animate-fade-in">
          <div class="text-gray-500 font-bold">$ ping -c 1 ${this.escapeHtml(raw)}</div>
          <div class="text-gray-400">PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.</div>
          <div class="my-1 border-t border-gray-800"></div>
          <div class="text-red-400 font-bold">[!] KOMUT ENJEKSİYONU ÇIKTISI (RCE BAŞARILI):</div>
          <div class="text-emerald-400 font-bold">uid=0(root) gid=0(root) groups=0(root)</div>
          <div class="text-yellow-300 font-bold">/etc/passwd:</div>
          <div class="text-gray-400">root:x:0:0:root:/root:/bin/bash</div>
          <div class="text-cyan-400 font-bold">flag: BZT{remote_code_execution_rce_unlocked}</div>
        </div>`;
      this.awardLabXp(50);
    } else {
      resultBox.innerHTML = `
        <div class="font-mono text-xs bg-black/90 p-3 rounded-lg border border-gray-800 text-gray-400 space-y-1">
          <div class="text-gray-500 font-bold">$ ping -c 2 ${this.escapeHtml(raw)}</div>
          <div>PING ${this.escapeHtml(raw)} (127.0.0.1) 56(84) bytes of data.</div>
          <div>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms</div>
          <div class="text-emerald-400 mt-2 font-sans">İpucu: '; whoami' veya '&& cat /etc/passwd' deneyin.</div>
        </div>`;
    }
  },

  // 4. DIRECTORY TRAVERSAL / LFI LAB
  runLfiLab(filename) {
    const raw = (filename || "").trim();
    const resultBox = document.getElementById("lfi-result");
    if (!resultBox) return;

    if (!raw) {
      resultBox.innerHTML = `<span class="text-gray-500">Lütfen dahil edilecek bir dosya adı girin (örn: about.php).</span>`;
      return;
    }

    if (raw.includes("..") && (raw.includes("passwd") || raw.includes("/etc"))) {
      resultBox.innerHTML = `
        <div class="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs font-mono space-y-2 animate-fade-in">
          <div class="text-red-400 font-bold flex items-center gap-2">
            <span class="font-mono font-bold">[BAŞARILI]</span> Dizin Atlama (Path Traversal) Başarılı! /etc/passwd Sızdırıldı:
          </div>
          <pre class="bg-black/80 p-3 rounded text-emerald-400 overflow-x-auto whitespace-pre-wrap">${this.escapeHtml(this.mockFiles["../../../../etc/passwd"])}</pre>
        </div>
      `;
      this.awardLabXp(50);
    } else if (raw.toLowerCase().includes("php://filter") && raw.toLowerCase().includes("secret.php")) {
      const b64 = btoa(this.mockFiles["secret.php"]);
      resultBox.innerHTML = `
        <div class="p-3 bg-amber-950/60 border border-amber-500/50 rounded-lg text-xs font-mono space-y-2 animate-fade-in">
          <div class="text-yellow-400 font-bold flex items-center gap-2">
            <span class="font-mono font-bold">[BAŞARILI]</span> PHP Wrapper Bypass: Kaynak Kod Base64 Olarak Çekildi!
          </div>
          <div class="text-gray-300">Base64 Çıktı: <code class="bg-black/60 p-1 text-cyan-300 rounded">${b64}</code></div>
          <div class="text-emerald-400 font-bold mt-1">Çözülmüş PHP Kaynak Kodu:</div>
          <pre class="bg-black/80 p-2 rounded text-emerald-300">${this.escapeHtml(this.mockFiles["secret.php"])}</pre>
        </div>
      `;
      this.awardLabXp(50);
    } else if (this.mockFiles[raw]) {
      resultBox.innerHTML = `
        <div class="p-3 bg-gray-900 border border-gray-800 rounded-lg text-xs font-mono text-gray-300">
          <div class="text-gray-500 mb-1">Standart Dahil Edilen Dosya (${this.escapeHtml(raw)}):</div>
          <div class="p-2 bg-black/60 rounded text-cyan-300">${this.escapeHtml(this.mockFiles[raw])}</div>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="p-3 bg-red-950/40 border border-red-900/50 rounded-lg text-xs font-mono text-red-400">
          Warning: include(${this.escapeHtml(raw)}): Failed to open stream: No such file or directory.
        </div>
      `;
    }
  },

  // 5. JWT INSPECTOR & TAMPER LAB
  tamperJwt(token, makeAdmin, setAlgNone) {
    const resultBox = document.getElementById("jwt-result");
    if (!resultBox) return;

    try {
      const parts = token.trim().split(".");
      if (parts.length < 2) {
        resultBox.innerHTML = `<span class="text-red-400 text-xs font-mono">Geçersiz JWT formatı. 3 parçadan oluşmalıdır (Header.Payload.Signature).</span>`;
        return;
      }

      let header = JSON.parse(atob(parts[0]));
      let payload = JSON.parse(atob(parts[1]));

      if (setAlgNone) {
        header.alg = "none";
      }
      if (makeAdmin) {
        payload.role = "admin";
        payload.is_admin = true;
      }

      const newHeaderB64 = btoa(JSON.stringify(header)).replace(/=/g, "");
      const newPayloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, "");
      const newSig = setAlgNone ? "" : parts[2];
      const tamperedToken = `${newHeaderB64}.${newPayloadB64}.${newSig}`;

      const isPrivEsc = payload.role === "admin" && (header.alg === "none" || setAlgNone);

      resultBox.innerHTML = `
        <div class="p-3 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono space-y-2 animate-fade-in">
          <div class="flex justify-between items-center">
            <span class="text-cyan-400 font-bold">Modifiye Edilmiş JWT:</span>
            ${isPrivEsc ? '<span class="bg-red-950 border border-red-500 text-red-400 px-1.5 py-0.5 rounded text-[10px] font-bold">CRITICAL: ADMIN BYPASS!</span>' : ''}
          </div>
          <div class="p-2 bg-black/80 rounded text-yellow-300 break-all select-all">${tamperedToken}</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
            <div class="bg-cyber-900 p-2 rounded border border-gray-800">
              <span class="text-red-400 font-bold block mb-1">Header:</span>
              <pre class="text-gray-300">${JSON.stringify(header, null, 2)}</pre>
            </div>
            <div class="bg-cyber-900 p-2 rounded border border-gray-800">
              <span class="text-purple-400 font-bold block mb-1">Payload:</span>
              <pre class="text-gray-300">${JSON.stringify(payload, null, 2)}</pre>
            </div>
          </div>
          ${isPrivEsc ? '<div class="p-2 bg-emerald-950/80 border border-emerald-500 rounded text-emerald-300 font-bold">Bayrak Açıldı: BZT{jwt_none_algorithm_privilege_escalation} (+50 XP)</div>' : ''}
        </div>
      `;

      if (isPrivEsc) this.awardLabXp(50);
    } catch (e) {
      resultBox.innerHTML = `<span class="text-red-400 text-xs font-mono">JWT ayrıştırma hatası: ${e.message}</span>`;
    }
  },

  awardLabXp(amount) {
    if (window.BZTApp && typeof window.BZTApp.addXp === "function") {
      window.BZTApp.addXp(amount);
    }
  },

  escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }
};

window.BZTLabs = BZTLabs;
