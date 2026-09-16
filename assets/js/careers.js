/**
 * BZT Cyber Security - 10+ Career Tracks & Specialization Engine
 * Interactive Slide-Over Drawer, Skill Matrices & Career Roadmaps
 */

const BZT_CAREERS = [
  // 1. HACKER (PENTESTER)
  {
    id: "pentester",
    icon: "⚔️",
    title: { tr: "1. Etik Hacker & Sızma Testi Uzmanı", en: "1. Ethical Hacker & Penetration Tester" },
    tagline: { tr: "Web, ağ ve sistemlerdeki açıkları saldırganlardan önce keşfedin ve sömürün.", en: "Discover and exploit vulnerabilities in web, networks, and systems before malicious actors." },
    level: { tr: "Orta - İleri", en: "Intermediate - Advanced" },
    salary: "$85,000 - $160,000 / yıl",
    certs: ["OSCP", "eJPT", "CEH", "PNPT"],
    skills: ["Web Pentesting (OWASP Top 10)", "Nmap & Network Recon", "Privilege Escalation", "Metasploit & Exploit Dev", "Active Directory"],
    tools: ["Burp Suite", "Nmap", "Metasploit", "LinPEAS", "BloodHound", "SQLMap"],
    recommendedLessons: ["net-foundations", "active-recon-nmap", "sqli-exploitation", "xss-csrf-dom", "metasploit-exploitation", "linux-privesc", "active-directory-attacks"],
    overview: {
      tr: "Sızma testi uzmanı (Pentester), şirketlerin dijital varlıklarına izinli ve kontrollü saldırılar düzenleyerek zafiyetleri tespit eden, sömüren ve çözüm önerileri sunan profesyoneldir.",
      en: "A penetration tester assesses corporate digital assets through authorized simulated attacks, discovering flaws, demonstrating exploitation impact, and providing mitigation strategies."
    }
  },

  // 2. SQL & VERİTABANI GÜVENLİĞİ UZMANI
  {
    id: "db-sec-expert",
    icon: "🗄️",
    title: { tr: "2. Veritabanı Güvenliği & SQL Uzmanı", en: "2. Database Security & SQL Specialist" },
    tagline: { tr: "Kurumsal veritabanlarını SQL enjeksiyonlarına, veri sızıntılarına ve yetkisiz erişime karşı koruyun.", en: "Defend enterprise databases against SQL injections, data leakage, and privilege abuse." },
    level: { tr: "Orta - Uzman", en: "Intermediate - Expert" },
    salary: "$90,000 - $155,000 / yıl",
    certs: ["Oracle Certified Security", "AWS Database Specialty", "CISSP"],
    skills: ["SQL Injection Analizi & Sömürü", "Veritabanı Sıkılaştırma (Hardening)", "Şifrelenmiş Depolama (TDE)", "NoSQL & Redis Güvenliği", "Veri Maskeleme"],
    tools: ["SQLMap", "DBeaver", "DBMS Audit Tools", "Wireshark (TDS/MySQL parsers)"],
    recommendedLessons: ["sqli-exploitation", "cryptography-hashing", "rce-ssrf-deserialization", "burpsuite-masterclass"],
    overview: {
      tr: "Dünyanın en değerli varlığı veridir. Bu uzmanlar SQL/NoSQL sistemlerinin mimarisini güvenceye alır, parametreli sorguları denetler ve hassas müşteri verilerinin çalınmasını önler.",
      en: "Data is the world's most valuable asset. Database security specialists harden storage engines, audit stored procedures, enforce encryption at rest, and eliminate injection vulnerabilities."
    }
  },

  // 3. BULUT GÜVENLİĞİ UZMANI (CLOUD SECURITY)
  {
    id: "cloud-sec-expert",
    icon: "☁️",
    title: { tr: "3. Bulut Güvenliği Uzmanı (Cloud Security)", en: "3. Cloud Security Specialist (AWS/Azure/GCP)" },
    tagline: { tr: "AWS, Azure ve GCP bulut altyapılarını, Kubernetes ve konteyner ortamlarını koruyun.", en: "Protect AWS, Azure, GCP cloud infrastructure, Kubernetes, and container clusters." },
    level: { tr: "İleri - Uzman", en: "Advanced - Expert" },
    salary: "$110,000 - $185,000 / yıl",
    certs: ["AWS Certified Security", "CCSP", "Azure Security Engineer (AZ-500)"],
    skills: ["IAM Rol & Politika Analizi", "S3 Bucket Yetkilendirmeleri", "Kubernetes & Docker Güvenliği", "SSRF Bulut İstismarları", "CloudTrail & GuardDuty"],
    tools: ["ScoutSuite", "Prowler", "Pacu", "Trivy", "Kube-bench"],
    recommendedLessons: ["rce-ssrf-deserialization", "net-foundations", "linux-bash-mastery", "active-recon-nmap"],
    overview: {
      tr: "Şirketler sunucularını buluta taşırken yapılan hatalı IAM konfigürasyonları ve açık depolama alanları devasa veri sızıntılarına neden olur. Bulut güvenlik uzmanı bu zafiyetleri önler.",
      en: "As organizations migrate to the cloud, misconfigured IAM roles and exposed buckets create catastrophic leaks. Cloud security engineers enforce least privilege and automated guardrails."
    }
  },

  // 4. SOC ANALİSTİ & TEHDİT AVCISI
  {
    id: "soc-analyst",
    icon: "🛡️",
    title: { tr: "4. SOC Analisti & Tehdit Avcısı", en: "4. SOC Analyst & Threat Hunter" },
    tagline: { tr: "Ağ trafiğini, güvenlik loglarını izleyin ve siber saldırıları gerçek zamanlı engelleyin.", en: "Monitor network traffic, security logs, and neutralize cyber attacks in real-time." },
    level: { tr: "Başlangıç - Orta", en: "Beginner - Intermediate" },
    salary: "$70,000 - $125,000 / yıl",
    certs: ["CompTIA CySA+", "BTL1", "SC-200", "GCIA"],
    skills: ["SIEM Log Korelasyonu", "Wireshark PCAP Analizi", "Tehdit İstihbaratı (CTI)", "YARA Kuralları", "Olay Müdahale (IR)"],
    tools: ["Splunk", "Elastic ELK", "Wireshark", "Suricata", "TheHive", "Snort"],
    recommendedLessons: ["net-foundations", "active-recon-nmap", "blue-team-career", "linux-bash-mastery"],
    overview: {
      tr: "SOC (Güvenlik Operasyon Merkezi) analistleri, 7/24 kurum altyapısını dinleyerek şüpheli bağlantıları, parola saldırılarını ve sızma girişimlerini alarmlar üzerinden tespit edip durdururlar.",
      en: "SOC analysts monitor organizational infrastructure 24/7, triaging alerts, dissecting suspicious network connections, and stopping breach attempts."
    }
  },

  // 5. ZARARLI YAZILIM ANALİSTİ & TERSİNE MÜHENDİS
  {
    id: "malware-analyst",
    icon: "🔬",
    title: { tr: "5. Zararlı Yazılım Analisti & Tersine Mühendis", en: "5. Malware Analyst & Reverse Engineer" },
    tagline: { tr: "Tersine mühendislik ile fidye yazılımları, trojanlar ve APT casus kodlarını parçalarına ayırın.", en: "Dissect ransomware, trojans, and APT nation-state malware through reverse engineering." },
    level: { tr: "Uzman", en: "Expert" },
    salary: "$115,000 - $190,000 / yıl",
    certs: ["GREM", "OSMR", "CREA"],
    skills: ["x86/x64 Assembly Dili", "Statik & Dinamik Kod Analizi", "Ghidra / IDA Pro Decompilation", "Anti-Debugging & Unpacking", "C2 Beacon Dekodlama"],
    tools: ["Ghidra", "IDA Pro", "x64dbg", "Process Hacker", "Cuckoo Sandbox", "PE-bear"],
    recommendedLessons: ["red-team-evasion", "cryptography-hashing", "python-for-hackers", "linux-privesc"],
    overview: {
      tr: "Bilinmeyen bir virüs veya ransomware geldiğinde bu uzmanlar kodu kaynak seviyesine indirger, şifreleme anahtarlarını bulur ve saldırganın komuta kontrol sunucusunu deşifre eder.",
      en: "When novel ransomware or APT implants emerge, reverse engineers dissect compiled binaries, uncover C2 protocols, defeat packing/obfuscation, and extract decryption keys."
    }
  },

  // 6. UYGULAMA GÜVENLİĞİ & DEVSECOPS
  {
    id: "appsec-devsecops",
    icon: "🚀",
    title: { tr: "6. Uygulama Güvenliği & DevSecOps", en: "6. Application Security & DevSecOps Engineer" },
    tagline: { tr: "Yazılım geliştirme döngüsüne (CI/CD) güvenliği entegre edin, güvenli kod mimarisi kurun.", en: "Embed security into CI/CD pipelines and design secure software architectures from line 1." },
    level: { tr: "Orta - İleri", en: "Intermediate - Advanced" },
    salary: "$100,000 - $175,000 / yıl",
    certs: ["CASE", "CSSLP", "Certified DevSecOps Professional (CDP)"],
    skills: ["Statik Kod Analizi (SAST)", "Dinamik Tarama (DAST)", "Yazılım Tedarik Zinciri Güvenliği", "Güvenli Kodlama (Secure Coding)", "CI/CD Pipeline Hardening"],
    tools: ["SonarQube", "Snyk", "Semgrep", "OWASP ZAP", "GitLab CI/CD", "Docker"],
    recommendedLessons: ["sqli-exploitation", "xss-csrf-dom", "rce-ssrf-deserialization", "burpsuite-masterclass", "python-for-hackers"],
    overview: {
      tr: "Geliştiricilerle omuz omuza çalışan AppSec uzmanları, uygulamalar yayına çıkmadan önce kaynak kodlardaki güvenlik açıklarını otomatik araçlar ve kod incelemeleriyle kapatır.",
      en: "AppSec engineers bridge development and security, implementing automated SAST/DAST gating in CI/CD pipelines and eliminating vulnerabilities during development sprints."
    }
  },

  // 7. ADLİ BİLİŞİM & OLAY MÜDAHALE (DFIR)
  {
    id: "dfir-expert",
    icon: "🔍",
    title: { tr: "7. Adli Bilişim & Olay Müdahale (DFIR)", en: "7. Digital Forensics & Incident Response (DFIR)" },
    tagline: { tr: "Siber suç mahallerini inceleyin, RAM bellek dökümlerinden saldırganın parmak izlerini bulun.", en: "Investigate digital crime scenes, uncover intruder artifacts from volatile RAM and disk images." },
    level: { tr: "İleri", en: "Advanced" },
    salary: "$95,000 - $165,000 / yıl",
    certs: ["GCFA", "GNFA", "CHFI"],
    skills: ["RAM Bellek Analizi (Memory Forensics)", "Disk İmajı İnceleme", "Timeline (Zaman Çizelgesi) Analizi", "Windows Registry & Event Logs", "Antiadli Bilişim Tespiti"],
    tools: ["Volatility 3", "Autopsy", "FTK Imager", "KAPE", "Plaso", "Eric Zimmerman Tools"],
    recommendedLessons: ["linux-bash-mastery", "active-directory-attacks", "blue-team-career", "net-foundations"],
    overview: {
      tr: "Bir şirket hacklendiğinde ilk çağrılan ekip DFIR'dır. Saldırganın içeriye ne zaman, hangi açıktan girdiğini ve hangi verileri çaldığını kanıtlarıyla ortaya çıkarırlar.",
      en: "When a breach occurs, DFIR teams reconstruct the adversary's timeline, analyze volatile memory, determine entry vectors, and quantify data exfiltration for legal prosecution."
    }
  },

  // 8. KRİPTOGRAFİ & GÜVENLİK MİMARİSİ
  {
    id: "crypto-architect",
    icon: "🔐",
    title: { tr: "8. Kriptografi & Güvenlik Mimarisi", en: "8. Cryptography & Security Architect" },
    tagline: { tr: "Sıfır Güven (Zero Trust), kuantum sonrası şifreleme ve kurumsal savunma mimarileri tasarlayın.", en: "Architect Zero Trust perimeters, post-quantum crypto schemes, and resilient enterprise defenses." },
    level: { tr: "Uzman", en: "Expert" },
    salary: "$130,000 - $210,000 / yıl",
    certs: ["CISSP", "CISM", "SABSA"],
    skills: ["PKI Altyapısı & Sertifika Yönetimi", "Zero Trust Mimarisi", "Kuantum Sonrası Kriptografi (PQC)", "TLS 1.3 & Şifreleme Protokolleri", "HSM (Hardware Security Modules)"],
    tools: ["OpenSSL", "Keycloak", "Vault by HashiCorp", "Cryptool"],
    recommendedLessons: ["cryptography-hashing", "net-foundations", "python-for-hackers"],
    overview: {
      tr: "Kurumun en üst düzey güvenlik planlamasını yapan mimarlar, ağ segmentasyonundan uçtan uca şifrelemeye kadar devasa altyapıların güvenlik tasarımını çizerler.",
      en: "Chief architects establish institutional cybersecurity doctrine, designing multi-cloud Zero Trust architectures, cryptographic governance, and long-term cyber resilience."
    }
  },

  // 9. SOSYAL MÜHENDİSLİK & OSINT İSTİHBARATÇISI
  {
    id: "osint-soceng",
    icon: "🕵️",
    title: { tr: "9. Sosyal Mühendislik & OSINT İstihbaratçısı", en: "9. OSINT & Social Engineering Specialist" },
    tagline: { tr: "İnsan faktörünü, açık kaynak istihbaratını (OSINT) ve hedef profilleme tekniklerini ustalıkla kullanın.", en: "Master the human operating system, advanced OSINT profiling, and deception operations." },
    level: { tr: "Başlangıç - İleri", en: "Beginner - Advanced" },
    salary: "$75,000 - $140,000 / yıl",
    certs: ["OSINT Certified", "CEH", "Social Engineering Professional (SEPP)"],
    skills: ["İleri Düzey Google Dorking", "Şirket & Personel Haritalama", "Phishing / Vishing Simülasyonları", "OPSEC & Kimlik Gizleme", "Sızdırılmış Veri Analitiği"],
    tools: ["Maltego", "theHarvester", "Sherlock", "SpiderFoot", "GoPhish", "Recon-ng"],
    recommendedLessons: ["osint-recon-deep", "wireless-social-eng", "active-recon-nmap"],
    overview: {
      tr: "En güçlü güvenlik duvarı bile şifresini telefonda söyleyen bir çalışan karşısında çaresizdir. Sosyal mühendisler kurumsal eğitimler ve yetkili testlerle insan zafiyetlerini ölçer.",
      en: "The most impenetrable firewall cannot prevent an employee from surrendering credentials to a targeted phishing lure. Social engineers test human defenses and OPSEC hygiene."
    }
  },

  // 10. IOT, DONANIM & ENDÜSTRİYEL SİBER GÜVENLİK (OT/SCADA)
  {
    id: "iot-scada-expert",
    icon: "⚡",
    title: { tr: "10. IoT & Endüstriyel Siber Güvenlik (OT/SCADA)", en: "10. IoT & Industrial Cyber Security (OT/SCADA)" },
    tagline: { tr: "Akıllı cihazlar, enerji santralleri, fabrikalar ve SCADA altyapılarını siber sabotajdan koruyun.", en: "Defend smart devices, power grids, robotics, and industrial SCADA networks from sabotage." },
    level: { tr: "Uzman", en: "Expert" },
    salary: "$105,000 - $180,000 / yıl",
    certs: ["GICSP", "GRID", "Certified IoT Security Specialist"],
    skills: ["Firmware Çıkarma & Analizi", "Donanım Protokolleri (UART, JTAG, SPI)", "Modbus / DNP3 Endüstriyel Protokoller", "PLC Güvenliği", "Air-Gapped Ağ Sızmaları"],
    tools: ["Binwalk", "Ghidra", "Wireshark (Modbus plugin)", "Bus Pirate", "Logic Analyzer"],
    recommendedLessons: ["net-foundations", "python-for-hackers", "wireless-social-eng", "active-recon-nmap"],
    overview: {
      tr: "Barajlar, elektrik şebekeleri ve nükleer santraller gibi kritik altyapıların siber savunması bu uzmanlara emanettir. Donanım seviyesinde tersine mühendislik ve protokol analizi yaparlar.",
      en: "Critical national infrastructure—water treatment, energy grids, manufacturing—relies on OT specialists to secure legacy protocols (Modbus, BACnet) and hardware firmware."
    }
  }
];

const BZTCareers = {
  activeCareerId: null,

  toggleHackerAccordion() {
    const menu = document.getElementById("hacker-hats-submenu");
    const arrow = document.getElementById("hacker-accordion-arrow");
    if (!menu) return;
    const isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden");
      if (arrow) arrow.style.transform = "rotate(180deg)";
    } else {
      menu.classList.add("hidden");
      if (arrow) arrow.style.transform = "rotate(0deg)";
    }
  },

  selectCareerFromDrawer(id) {
    this.selectCareer(id);
    if (window.BZTApp) {
      window.BZTApp.closeDrawer();
      window.BZTApp.switchTab("curriculum");
      const indicator = document.getElementById("active-career-indicator");
      if (indicator) {
        indicator.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  },

  renderDrawer() {
    const container = document.getElementById("career-tracks-list");
    if (!container) return;

    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const getT = (obj) => typeof obj === "object" && obj !== null ? (obj[lang] || obj.tr || obj.en || "") : obj;

    container.innerHTML = BZT_CAREERS.map(c => {
      const isSelected = this.activeCareerId === c.id;

      return `
        <div class="glass-panel p-4 rounded-xl border transition-all duration-200 cursor-pointer ${isSelected ? 'border-cyan-500 bg-cyan-950/30 shadow-lg shadow-cyan-950/40' : 'border-gray-800 hover:border-gray-700'}" onclick="BZTCareers.selectCareer('${c.id}')">
          <div class="flex items-start justify-between gap-3 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-2xl">${c.icon}</span>
              <div>
                <h4 class="font-bold text-white text-sm hover:text-cyan-400 transition-colors">${getT(c.title)}</h4>
                <div class="text-[11px] font-mono text-cyan-400">${getT(c.level)} • <span class="text-emerald-400">${c.salary}</span></div>
              </div>
            </div>
            <button class="text-xs px-2.5 py-1 rounded font-mono font-bold transition-all ${isSelected ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}">
              ${isSelected ? (lang === 'tr' ? '✓ Seçildi' : '✓ Active') : (lang === 'tr' ? 'Seç' : 'Select')}
            </button>
          </div>

          <p class="text-xs text-gray-400 mb-3 leading-relaxed">${getT(c.tagline)}</p>

          <div class="space-y-1.5 text-xs font-mono pt-2 border-t border-gray-800/80">
            <div><span class="text-gray-500">${lang === 'tr' ? 'Popüler Sertifikalar:' : 'Certifications:'}</span> <span class="text-yellow-300">${c.certs.join(", ")}</span></div>
            <div><span class="text-gray-500">${lang === 'tr' ? 'Kritik Araçlar:' : 'Core Tools:'}</span> <span class="text-emerald-400">${c.tools.slice(0, 4).join(", ")}</span></div>
          </div>
        </div>
      `;
    }).join("");
  },

  selectCareer(id) {
    if (this.activeCareerId === id) {
      this.activeCareerId = null; // Toggle off
    } else {
      this.activeCareerId = id;
    }

    const career = BZT_CAREERS.find(c => c.id === this.activeCareerId);
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const indicator = document.getElementById("active-career-indicator");

    if (indicator) {
      if (career) {
        indicator.classList.remove("hidden");
        indicator.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-lg">${career.icon}</span>
            <div>
              <div class="text-cyan-300 font-bold font-mono">
                ${lang === 'tr' ? 'Aktif Kariyer Yolu:' : 'Active Career Track:'} <span class="text-white">${career.title[lang] || career.title.tr}</span>
              </div>
              <div class="text-[11px] text-gray-400 font-mono">
                ${lang === 'tr' ? 'Bu uzmanlık için önerilen dersler filtrelendi.' : 'Curriculum filtered for this specialization.'}
              </div>
            </div>
          </div>
          <button onclick="BZTCareers.clearFilter()" class="px-3 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white text-xs font-mono transition-all">
            ✕ ${lang === 'tr' ? 'Filtreyi Temizle' : 'Clear Filter'}
          </button>
        `;
      } else {
        indicator.classList.add("hidden");
      }
    }

    const topBadge = document.getElementById("top-active-role-text");
    if (topBadge) {
      topBadge.innerText = career ? (career.title[lang] || career.title.tr) : (lang === 'tr' ? 'Kariyerler' : 'Careers');
    }

    // Highlight active career in drawer items
    document.querySelectorAll(".drawer-career-item").forEach(item => {
      item.classList.remove("border-cyan-500", "bg-cyan-950/40");
    });

    this.renderDrawer();
    if (typeof window.renderCurriculum === "function") {
      window.renderCurriculum();
    }
  },

  clearFilter() {
    this.activeCareerId = null;
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const indicator = document.getElementById("active-career-indicator");
    if (indicator) indicator.classList.add("hidden");
    const topBadge = document.getElementById("top-active-role-text");
    if (topBadge) topBadge.innerText = lang === 'tr' ? 'Kariyerler' : 'Careers';
    this.renderDrawer();
    if (typeof window.renderCurriculum === "function") {
      window.renderCurriculum();
    }
  },

  openDrawer() {
    const drawer = document.getElementById("career-drawer");
    if (drawer) {
      drawer.classList.remove("translate-x-full");
      this.renderDrawer();
    }
  },

  closeDrawer() {
    const drawer = document.getElementById("career-drawer");
    if (drawer) drawer.classList.add("translate-x-full");
  }
};

window.BZTCareers = BZTCareers;
