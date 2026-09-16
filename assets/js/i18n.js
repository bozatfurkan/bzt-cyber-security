/**
 * BZT Cyber Security - Internationalization (i18n) Engine
 * Turkish (tr) & English (en) Language Support
 */

const BZT_TRANSLATIONS = {
  tr: {
    // Header & Brand
    brand_sub: "Sıfırdan İleri Seviyeye Etik Hacker Akademisi",
    nav_curriculum: "Müfredat",
    nav_platform: "Platform & Müfredat",
    nav_hats: "Hacker Şapkaları",
    nav_careers: "Kariyer Yolları",
    nav_labs_menu: "Laboratuvar & CTF",
    nav_terminal: "BZT-Shell",
    nav_labs: "Laboratuvar",
    nav_ctf: "CTF Arena",
    nav_tools: "Araçlar",
    nav_cheatsheet: "Referans",
    nav_certificate: "Sertifika",
    progress_label: "İlerleme",

    // Hero Banner
    hero_badge: "KAPSAMLI SİBER GÜVENLİK YOL HARİTASI",
    hero_title_prefix: "Sıfırdan İleri Seviyeye ",
    hero_title_highlight: "Etik Hacker",
    hero_title_suffix: " Olun",
    hero_desc: "Teoriden pratik istismara (exploitation), siber istihbarattan Active Directory dominasyonuna ve EDR atlatmaya kadar 7 aşamalı eksiksiz hacker eğitim yolculuğu.",
    stat_phase: "Eğitim Fazı",
    stat_phase_val: "7 Seviye",
    stat_module: "Etkileşimli Modül",
    stat_module_val: "15+ Kapsamlı Ders",
    stat_tool: "Simüle Edilen Araç",
    stat_tool_val: "BZT-Shell Kali",
    stat_cert: "Sertifika Hedefi",
    stat_cert_val: "OSCP & eJPT",

    // Filters
    filter_all: "Tümü",
    filter_p1: "Faz 1: Temeller",
    filter_p2: "Faz 2: Keşif",
    filter_p3: "Faz 3: Web",
    filter_p4: "Faz 4: Sistem",
    filter_p5: "Faz 5: Kablosuz",
    filter_p6: "Faz 6: Red Team",
    filter_p7: "Faz 7: Mavi Takım",
    search_placeholder: "Ders, zafiyet veya araç ara (örn: SQLi)...",

    // Terminal
    term_title: "BZT-Shell v3.5 PRO Terminal Simülatörü",
    term_desc: "Nmap, Sqlmap, Gobuster, Ffuf, Hydra, Metasploit ve LinPEAS komutlarını canlı simüle edin.",
    term_root_active: "Root Erişimi: Aktif",
    term_quick_label: " Hızlı Test Komutları:",

    // Labs
    labs_title: "İnteraktif Güvenlik Laboratuvarları",
    labs_desc: "Zafiyetlerin mekanizmasını güvenli, tarayıcı tabanlı izole simülatörlerde deneyerek keşfedin.",
    lab1_title: "Lab 1: SQL Injection (Kimlik Doğrulama Bypass)",
    lab1_desc: "Arka planda çalışan sorgu: SELECT * FROM users WHERE username = '{GİRDİ}' AND is_active = 1. Geliştirici parametreyi doğrudan sorguya eklediği için SQL tırnağı ve yorum satırı ile yetki kazanılabilir.",
    lab1_quick: "Hızlı Payloadlar:",
    lab1_placeholder: "Giriş / SQL Payload girin (örn: admin' --)...",
    lab1_btn: "Sorguyu Çalıştır ",
    lab2_title: "Lab 2: Cross-Site Scripting (XSS & WAF Evasion)",
    lab2_desc: "WAF filtresini seçin ve payload'ınızın filtreyi aşıp aşmadığını test edin. Klasik <script> etiketleri engellendiğinde HTML5 etkinlik işleyicileri (onerror, onload) devreye girer.",
    lab2_filter_strict: "WAF Koruması: <script> Etiketlerini Sil",
    lab2_filter_none: "Korumasız (Raw Reflection)",
    lab2_placeholder: "XSS payload girin...",
    lab2_btn: "Enjekte Et ",
    lab3_title: "Lab 3: Command Injection & RCE Simülatörü",
    lab3_desc: "Uygulama arka planda sistem komutunu çağırıyor: ping -c 1 {IP}. Noktalı virgül (;), çift ve (&&) veya pipe (|) ile sunucuda ek komutlar çalıştırın.",
    lab3_placeholder: "IP Adresi veya Komut Enjeksiyonu (örn: 127.0.0.1; id)...",
    lab3_btn: "Komutu İlet ",
    lab4_title: "Lab 4: Dizin Atlama (Path Traversal / LFI)",
    lab4_desc: "Sunucu tarafında 'include($_GET[\"file\"])' çalıştırılıyor. '../' ile dizinleri aşarak /etc/passwd dosyasını okuyun veya 'php://filter' ile kaynak kod çekin.",
    lab4_placeholder: "Dosya adı (örn: about.php, ../../../../etc/passwd)...",
    lab4_btn: "Dosyayı Dahil Et ",
    lab5_title: "Lab 5: JSON Web Token (JWT) Manipülasyonu",
    lab5_desc: "Zayıf doğrulamalı JWT tokenlarını inceleyin. Algoritmayı 'none' yaparak ve rolü 'admin'e çevirerek yetki yükseltin (Privilege Escalation).",
    lab5_btn: "Token'ı Modifiye Et & Test Et ",

    // CTF
    ctf_title: "BZT-CTF Meydan Okuma Arenası (OverTheWire & HTB Stili)",
    ctf_desc: "İpuçlarını takip edin, BZT-Shell ve zafiyet lablarını kullanarak gizli bayrakları (BZT{...}) bulun ve XP kazanın.",
    ctf_total: "Toplam CTF Skoru:",

    // Tools
    tools_title: "Siber Güvenlik Araç Çantası (Hacker Arsenal)",
    tools_desc: "Pentest operasyonlarında en sık ihtiyaç duyulan payload üreticileri, şifreleme ve hash araçları.",
    tool1_title: "Ters Bağlantı Kabuğu Üretici (Reverse Shell Generator)",
    tool1_lhost: "Saldırgan IP (LHOST)",
    tool1_lport: "Dinleyici Port (LPORT)",
    tool2_title: "Çoklu Kodlayıcı / Çözücü (Base64, URL, Hex, ROT13)",
    tool3_title: "Parola Hash Tanımlayıcı (Hash Identifier)",
    tool3_desc: "Ele geçirilen şifreli hash'i (MD5, SHA-256, NTLM, bcrypt, Argon2) analiz ederek türünü ve Hashcat modunu öğrenin.",
    tool3_btn: "Türü Belirle ",

    // Cheatsheet
    cs_title: "Hızlı Başvuru Kartları (Hacker Cheat Sheets)",
    cs_desc: "Sınavlarda (OSCP, eJPT) ve operasyonlarda hayat kurtaran kritik komut özetleri.",

    // Certificate
    cert_title: "Resmi BZT Siber Güvenlik Başarı Sertifikası",
    cert_desc: "Eğitimi, laboratuvarları ve CTF bayraklarını tamamladığınızda adınıza özel oluşturulan yüksek çözünürlüklü onaylı sertifikanızı indirin.",
    cert_label_name: "Sertifika Üzerindeki İsim & Soyisim:",
    cert_btn_download: " Sertifikayı İndir (PNG)",

    // Games & Careers
    nav_games: "Oyunlar",
    nav_careers: "Kariyerler",
    nav_hats: "Şapka",
    games_title: "Siber Güvenlik Mini Oyunları",
    games_desc: "Reflekslerinizi ve siber bilginizi eğlenceli simülasyonlarla test edin, XP kazanın.",
    game1_title: "Güvenlik Duvarı Savunucusu (Firewall Defender)",
    game1_desc: "Ağınıza gelen veri paketlerini derinlemesine inceleyin (DPI). Zararlı saldırı paketlerini Engelleyin (DROP), meşru trafiğe İzin Verin (ALLOW).",
    game1_btn_allow: "İzin Ver (ALLOW) ",
    game1_btn_drop: "Engelle (DROP) ",
    game2_title: "Terminal Hız Testi (Command Rush)",
    game2_desc: "Zamana karşı yarışın! Verilen siber güvenlik senaryosu için en doğru komutu 15 saniye içinde seçip çalıştırın.",
    career_drawer_title: "Siber Güvenlik Kariyer Yolları (10+ Meslek)",
    career_drawer_desc: "Hedeflediğiniz uzmanlığı seçin; platform sizin için en uygun dersleri ve araçları otomatik filtrelesin.",
    career_btn_open: " Kariyer Seçici",
    hat_btn_open: " Şapkanı Seç",

    // Hamburger Menu & Control Panel Drawer
    menu_btn: "Profil & Ekstralar",
    drawer_title: "BZT KONTROL PANELİ",
    drawer_desc: "Kullanıcı Profili, Özel Modüller ve Ayarlar",
    drawer_user_header: "Kullanıcı Profili & İlerleme",
    drawer_progress_label: "Genel Eğitim İlerlemesi",
    drawer_extra_header: "Özel Modüller & Ekstralar",
    drawer_settings_header: "Sistem & Ayarlar",
    drawer_games_title: "Siber Mini Oyunlar",
    drawer_games_desc: "Port Eşleştirme & Hash Kırma Bulmacaları",
    drawer_cheatsheet_title: "Hızlı Başvuru Kartları",
    drawer_cheatsheet_desc: "Linux, Nmap, SQLi & Bash Komutları",
    drawer_certificate_title: "Resmi Başarı Sertifikası",
    drawer_certificate_desc: "Doğrulanabilir Dijital Mezuniyet Belgesi",
    btn_reset_progress: "Tüm İlerlemeyi Sıfırla",
    reset_confirm: "Tüm tamamlanan dersleriniz ve kazandığınız XP puanı sıfırlanacak. Onaylıyor musunuz?",
    nav_careers_sub: "10+ Uzmanlık Alanı",
    nav_hats_sub: "7 Hacker Şapkası",

    // Footer
    footer_platform: "BZT Cyber Security Platformu",
    footer_dev: "Geliştirici:",
    footer_disclaimer: " Yalnızca eğitim ve etik sızma testi amaçlıdır."
  },

  en: {
    // Header & Brand
    brand_sub: "Zero-to-Hero Ethical Hacking Academy",
    nav_curriculum: "Curriculum",
    nav_platform: "Platform & Curriculum",
    nav_hats: "Hacker Personas",
    nav_careers: "Career Tracks",
    nav_labs_menu: "Labs & CTF",
    nav_terminal: "BZT-Shell",
    nav_labs: "Labs",
    nav_ctf: "CTF Arena",
    nav_tools: "Arsenal",
    nav_cheatsheet: "Cheat Sheet",
    nav_certificate: "Certificate",
    progress_label: "Progress",

    // Hero Banner
    hero_badge: "COMPREHENSIVE CYBER SECURITY ROADMAP",
    hero_title_prefix: "Become an ",
    hero_title_highlight: "Ethical Hacker",
    hero_title_suffix: " From Scratch to Hero",
    hero_desc: "A complete 7-stage hacker journey from fundamentals to practical exploitation, cyber intelligence, Active Directory dominance, and EDR evasion.",
    stat_phase: "Training Phases",
    stat_phase_val: "7 Levels",
    stat_module: "Interactive Modules",
    stat_module_val: "15+ Deep Lessons",
    stat_tool: "Simulated Engine",
    stat_tool_val: "BZT-Shell Kali",
    stat_cert: "Target Certifications",
    stat_cert_val: "OSCP & eJPT",

    // Filters
    filter_all: "All",
    filter_p1: "Phase 1: Foundations",
    filter_p2: "Phase 2: Recon",
    filter_p3: "Phase 3: Web",
    filter_p4: "Phase 4: System",
    filter_p5: "Phase 5: Wireless",
    filter_p6: "Phase 6: Red Team",
    filter_p7: "Phase 7: Blue Team",
    search_placeholder: "Search lessons, vulnerabilities or tools (e.g. SQLi)...",

    // Terminal
    term_title: "BZT-Shell v3.5 PRO Terminal Simulator",
    term_desc: "Simulate live Nmap, Sqlmap, Gobuster, Ffuf, Hydra, Metasploit, and LinPEAS commands in-browser.",
    term_root_active: "Root Privilege: Active",
    term_quick_label: " Quick Test Commands:",

    // Labs
    labs_title: "Interactive Security Laboratories",
    labs_desc: "Explore vulnerability mechanisms hands-on inside secure, browser-based sandboxes.",
    lab1_title: "Lab 1: SQL Injection (Authentication Bypass)",
    lab1_desc: "Underlying query: SELECT * FROM users WHERE username = '{INPUT}' AND is_active = 1. Since input is concatenated directly, bypass auth via single quote and comment operators.",
    lab1_quick: "Quick Payloads:",
    lab1_placeholder: "Enter login or SQL payload (e.g. admin' --)...",
    lab1_btn: "Execute Query ",
    lab2_title: "Lab 2: Cross-Site Scripting (XSS & WAF Evasion)",
    lab2_desc: "Select WAF filter and test if your payload evades filters. When classic <script> tags are stripped, HTML5 event handlers (onerror, onload) take over.",
    lab2_filter_strict: "WAF Protection: Strip <script> Tags",
    lab2_filter_none: "Unprotected (Raw Reflection)",
    lab2_placeholder: "Enter XSS payload...",
    lab2_btn: "Inject ",
    lab3_title: "Lab 3: Command Injection & RCE Simulator",
    lab3_desc: "Backend executes: ping -c 1 {IP}. Use semicolons (;), double ampersands (&&) or pipes (|) to execute arbitrary commands.",
    lab3_placeholder: "IP Address or Command Injection (e.g. 127.0.0.1; id)...",
    lab3_btn: "Send Command ",
    lab4_title: "Lab 4: Path Traversal & Local File Inclusion (LFI)",
    lab4_desc: "Backend runs 'include($_GET[\"file\"])'. Traverse directories with '../' to read /etc/passwd or use 'php://filter' to extract source code.",
    lab4_placeholder: "Filename (e.g. about.php, ../../../../etc/passwd)...",
    lab4_btn: "Include File ",
    lab5_title: "Lab 5: JSON Web Token (JWT) Manipulation",
    lab5_desc: "Inspect weakly validated JWT tokens. Change algorithm to 'none' and tamper payload role to 'admin' to escalate privileges.",
    lab5_btn: "Modify & Test Token ",

    // CTF
    ctf_title: "BZT-CTF Challenge Arena (OverTheWire & HTB Style)",
    ctf_desc: "Follow the clues, use BZT-Shell and vulnerability labs to capture hidden flags (BZT{...}) and earn XP.",
    ctf_total: "Total CTF Score:",

    // Tools
    tools_title: "Cyber Security Arsenal & Utilities",
    tools_desc: "Essential payload generators, encoders, and hash analyzers needed in penetration testing operations.",
    tool1_title: "Polyglot Reverse Shell Generator",
    tool1_lhost: "Attacker IP (LHOST)",
    tool1_lport: "Listening Port (LPORT)",
    tool2_title: "Multi-Format Encoder / Decoder (Base64, URL, Hex, ROT13)",
    tool3_title: "Password Hash Identifier",
    tool3_desc: "Analyze stolen hashes (MD5, SHA-256, NTLM, bcrypt, Argon2) to detect algorithm and recommended Hashcat mode.",
    tool3_btn: "Identify Hash ",

    // Cheatsheet
    cs_title: "Quick Reference Cards (Hacker Cheat Sheets)",
    cs_desc: "Critical command cheat sheets essential for certification exams (OSCP, eJPT) and live engagements.",

    // Certificate
    cert_title: "Official BZT Cyber Security Certificate of Achievement",
    cert_desc: "Upon completing the curriculum, laboratories, and CTF challenges, download your verified, high-resolution digital certificate.",
    cert_label_name: "Student Full Name on Certificate:",
    cert_btn_download: " Download Certificate (PNG)",

    // Games & Careers
    nav_games: "Games",
    nav_careers: "Careers",
    nav_hats: "Hats",
    games_title: "Interactive Cyber Security Games",
    games_desc: "Test your defensive reflexes and cyber knowledge in gamified challenges to earn XP.",
    game1_title: "Firewall Packet Defender",
    game1_desc: "Inspect incoming network packets (DPI). DROP malicious attack traffic, ALLOW legitimate user connections.",
    game1_btn_allow: "Allow Traffic ",
    game1_btn_drop: "Drop Packet ",
    game2_title: "Terminal Command Rush",
    game2_desc: "Race against the clock! Select and deploy the optimal cybersecurity command within 15 seconds.",
    career_drawer_title: "Cyber Security Career Tracks (10+ Specializations)",
    career_drawer_desc: "Select your target career to automatically filter custom roadmaps, tools, and certifications.",
    career_btn_open: " Career Tracks",
    hat_btn_open: " Choose Hat",

    // Hamburger Menu & Control Panel Drawer
    menu_btn: "Profile & Extras",
    drawer_title: "BZT CONTROL PANEL",
    drawer_desc: "User Profile, Special Modules & Settings",
    drawer_user_header: "User Profile & Progress",
    drawer_progress_label: "Overall Training Progress",
    drawer_extra_header: "Special Modules & Extras",
    drawer_settings_header: "System & Settings",
    drawer_games_title: "Cyber Mini-Games",
    drawer_games_desc: "Port Matching & Hash Decryption Puzzles",
    drawer_cheatsheet_title: "Cheat Sheets",
    drawer_cheatsheet_desc: "Linux, Nmap, SQLi & Bash Quick Reference",
    drawer_certificate_title: "Official Certificate",
    drawer_certificate_desc: "Verifiable Digital Completion Certificate",
    btn_reset_progress: "Reset Progress",
    reset_confirm: "All your completed modules and earned XP will be reset. Are you sure?",
    nav_careers_sub: "10+ Specializations",
    nav_hats_sub: "7 Hacker Personas",

    // Footer
    footer_platform: "BZT Cyber Security Platform",
    footer_dev: "Developer:",
    footer_disclaimer: " Strictly for educational and authorized penetration testing purposes only."
  }
};

const BZTI18n = {
  currentLang: localStorage.getItem("bzt_lang") || "tr",

  setLanguage(lang) {
    if (lang !== "tr" && lang !== "en") lang = "tr";
    this.currentLang = lang;
    localStorage.setItem("bzt_lang", lang);
    this.applyTranslations();
  },

  get(key) {
    const dict = BZT_TRANSLATIONS[this.currentLang] || BZT_TRANSLATIONS.tr;
    return dict[key] || key;
  },

  applyTranslations() {
    // 1. Text elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = this.get(key);
      if (val) el.innerHTML = val;
    });

    // 2. Placeholders with data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = this.get(key);
      if (val) el.placeholder = val;
    });

    // 3. Update active button indicators
    const btnTr = document.getElementById("lang-btn-tr");
    const btnEn = document.getElementById("lang-btn-en");
    if (btnTr && btnEn) {
      if (this.currentLang === "tr") {
        btnTr.className = "px-2 py-1 rounded font-bold bg-cyan-500 text-black";
        btnEn.className = "px-2 py-1 rounded text-gray-400 hover:text-white";
      } else {
        btnEn.className = "px-2 py-1 rounded font-bold bg-cyan-500 text-black";
        btnTr.className = "px-2 py-1 rounded text-gray-400 hover:text-white";
      }
    }

    // 4. Trigger components to re-render in new language
    if (typeof window.renderCurriculum === "function") {
      window.renderCurriculum();
    }
    if (window.BZT_CTF && typeof window.BZT_CTF.renderChallenges === "function") {
      window.BZT_CTF.renderChallenges("ctf-challenges-container");
    }
    if (typeof window.updateCertPreview === "function") {
      window.updateCertPreview();
    }
    if (window.BZTApp && typeof window.BZTApp.updateUserStats === "function") {
      window.BZTApp.updateUserStats();
    }
  }
};

window.BZTI18n = BZTI18n;
