/**
 * BZT Cyber Security - HackTheBox Style Mega Menu Navigation Engine
 * Opens smoothly on mouse hover without requiring clicks
 * Deep Black Cyber theme (#030712 / #0b0f19) with Kodluyoruz Orange (#f37021)
 * Zero Emojis strictly enforced
 */

const BZTMegaMenu = {
  activeMenu: null,
  closeTimer: null,

  init() {
    const wrapper = document.getElementById("mega-menu-wrapper");
    const backdrop = document.getElementById("mega-menu-backdrop");
    const navItems = document.querySelectorAll(".nav-dropdown-item");

    if (!wrapper) return;

    navItems.forEach(item => {
      const menuKey = item.getAttribute("data-menu");
      
      // Open on hover (without clicking)
      item.addEventListener("mouseenter", () => {
        BZTMegaMenu.openMenu(menuKey);
      });

      item.addEventListener("mouseleave", () => {
        BZTMegaMenu.scheduleClose();
      });

      // Also support direct click for touchscreen or quick toggle
      const btn = item.querySelector(".nav-dropdown-btn");
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          if (BZTMegaMenu.activeMenu === menuKey) {
            BZTMegaMenu.closeMenu();
          } else {
            BZTMegaMenu.openMenu(menuKey);
          }
        });
      }
    });

    wrapper.addEventListener("mouseenter", () => {
      clearTimeout(BZTMegaMenu.closeTimer);
    });

    wrapper.addEventListener("mouseleave", () => {
      BZTMegaMenu.scheduleClose();
    });

    if (backdrop) {
      backdrop.addEventListener("mouseenter", () => {
        BZTMegaMenu.closeMenu();
      });
      backdrop.addEventListener("click", () => {
        BZTMegaMenu.closeMenu();
      });
    }

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        BZTMegaMenu.closeMenu();
      }
    });
  },

  openMenu(menuKey) {
    clearTimeout(this.closeTimer);
    this.activeMenu = menuKey;

    const wrapper = document.getElementById("mega-menu-wrapper");
    const card = document.getElementById("mega-menu-card");
    const backdrop = document.getElementById("mega-menu-backdrop");
    const navItems = document.querySelectorAll(".nav-dropdown-item");

    if (!wrapper || !card) return;

    card.innerHTML = this.renderMenuHTML(menuKey);

    wrapper.classList.remove("opacity-0", "-translate-y-2", "pointer-events-none");
    wrapper.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");

    if (backdrop) {
      backdrop.classList.remove("hidden");
      setTimeout(() => {
        backdrop.classList.remove("opacity-0");
        backdrop.classList.add("opacity-100");
      }, 10);
    }

    // Highlight active nav trigger & rotate arrow
    navItems.forEach(item => {
      const key = item.getAttribute("data-menu");
      const btn = item.querySelector(".nav-dropdown-btn");
      const arrow = item.querySelector(".dropdown-arrow");
      if (key === menuKey) {
        btn?.classList.add("bg-orange-950/60", "text-orange-400", "border-orange-500/60");
        btn?.classList.remove("text-gray-300");
        arrow?.classList.add("rotate-180", "text-[#f37021]");
      } else {
        btn?.classList.remove("bg-orange-950/60", "text-orange-400", "border-orange-500/60");
        btn?.classList.add("text-gray-300");
        arrow?.classList.remove("rotate-180", "text-[#f37021]");
      }
    });

    this.attachCardActions(card);
  },

  scheduleClose() {
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.closeMenu();
    }, 200);
  },

  closeMenu() {
    clearTimeout(this.closeTimer);
    this.activeMenu = null;

    const wrapper = document.getElementById("mega-menu-wrapper");
    const backdrop = document.getElementById("mega-menu-backdrop");
    const navItems = document.querySelectorAll(".nav-dropdown-item");

    if (wrapper) {
      wrapper.classList.add("opacity-0", "-translate-y-2", "pointer-events-none");
      wrapper.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
    }

    if (backdrop) {
      backdrop.classList.remove("opacity-100");
      backdrop.classList.add("opacity-0");
      setTimeout(() => backdrop.classList.add("hidden"), 200);
    }

    navItems.forEach(item => {
      const btn = item.querySelector(".nav-dropdown-btn");
      const arrow = item.querySelector(".dropdown-arrow");
      btn?.classList.remove("bg-orange-950/60", "text-orange-400", "border-orange-500/60");
      btn?.classList.add("text-gray-300");
      arrow?.classList.remove("rotate-180", "text-[#f37021]");
    });
  },

  renderMenuHTML(menuKey) {
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

    if (menuKey === "platform") {
      return `
        <div class="space-y-6">
          <!-- Top Header -->
          <div class="flex items-center justify-between border-b border-gray-800/80 pb-4">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
              <span class="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                ${lang === 'tr' ? 'BZT AKADEMİ PLATFORMU • EĞİTİM & MÜFREDAT' : 'BZT ACADEMY PLATFORM • CURRICULUM'}
              </span>
            </div>
            <span class="text-xs font-mono text-gray-500">16 Modül • 64 Bölüm • Sıfır-İleri Seviye</span>
          </div>

          <!-- 3-Column HackTheBox Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Col 1: Temeller & Keşif -->
            <div class="space-y-3">
              <div class="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-1.5 flex justify-between">
                <span>${lang === 'tr' ? 'ALTYAPI & KEŞİF' : 'FOUNDATIONS & RECON'}</span>
                <span class="text-[#f37021]">FAZ 1 - 2</span>
              </div>
              <div class="space-y-2">
                ${this.renderCardItem("phase-1", "[01]", "Faz 1: Altyapı & Ağ Temelleri", "TCP 3-Way Handshake, OSI 7 Katmanı, Linux SUID, Kriptografi", "filter-phase", "1")}
                ${this.renderCardItem("phase-2", "[02]", "Faz 2: Keşif & OSINT", "Shodan, crt.sh SSL, Google Dorking, Nmap & NSE Motoru", "filter-phase", "2")}
                ${this.renderCardItem("lesson-net", "[NET]", "Ağ Mimarisi & Paketler", "Wireshark, ham soketler, ARP poisoning analizi", "open-lesson", "net-foundations")}
                ${this.renderCardItem("lesson-nmap", "[MAP]", "Nmap ile Ağ Keşfi", "SYN Stealth scan, OS parmak izi, IDS atlatma", "open-lesson", "active-recon-nmap")}
              </div>
            </div>

            <!-- Col 2: Web & Sistem Sızma -->
            <div class="space-y-3">
              <div class="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-1.5 flex justify-between">
                <span>${lang === 'tr' ? 'SIZMA & İLERİ SEVİYE' : 'PENTESTING & ADVANCED'}</span>
                <span class="text-[#f37021]">FAZ 3 - 6</span>
              </div>
              <div class="space-y-2">
                ${this.renderCardItem("phase-3", "[03]", "Faz 3: Web Sızma Testleri", "SQLi, XSS, CSRF, RCE, SSRF, Burp Suite Masterclass", "filter-phase", "3")}
                ${this.renderCardItem("phase-4", "[04]", "Faz 4: Sistem & Ağ Sızma", "Metasploit, Linux PrivEsc, Active Directory Kerberos", "filter-phase", "4")}
                ${this.renderCardItem("phase-6", "[06]", "Faz 6: Red Team & Evasion", "Direct Syscalls, NTDLL Unhooking, AMSI Bypass", "filter-phase", "6")}
                ${this.renderCardItem("lesson-sqli", "[SQL]", "SQL Enjeksiyonu (SQLi)", "Union-based, blind, time-based & prepared statements", "open-lesson", "sqli-exploitation")}
              </div>
            </div>

            <!-- Col 3: Hızlı Erişim & Savunma -->
            <div class="space-y-3">
              <div class="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-1.5 flex justify-between">
                <span>${lang === 'tr' ? 'SAVUNMA & KARİYER' : 'DEFENSE & CAREER'}</span>
                <span class="text-[#f37021]">FAZ 7</span>
              </div>
              <div class="space-y-2">
                ${this.renderCardItem("phase-7", "[07]", "Faz 7: Mavi Takım & SOC", "SIEM analizi, Windows Event ID, Incident Response", "filter-phase", "7")}
                ${this.renderCardItem("lesson-ad", "[AD]", "Active Directory & Kerberos", "Kerberoasting, AS-REP roasting, BloodHound analizi", "open-lesson", "active-directory-attacks")}
                ${this.renderCardItem("lesson-evasion", "[RED]", "Red Team & AV/EDR Evasion", "Bellek içi enjeksiyon, Process Hollowing, EDR kancaları", "open-lesson", "red-team-evasion")}
                ${this.renderCardItem("lesson-soc", "[SOC]", "SOC Operasyonları & Kariyer", "Splunk, Elastic SIEM, NIST SP 800-61 olay müdahalesi", "open-lesson", "blue-team-career")}
              </div>
            </div>

          </div>

          <!-- Bottom Full-Width Spanning Banner (HTB Style) -->
          <div class="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-orange-950/40 via-[#070b14] to-[#070b14] border border-orange-500/40 hover:border-orange-500 flex items-center justify-between gap-4 cursor-pointer transition-all group shadow-lg" onclick="BZTMegaMenu.actionNavigate('switch-tab', 'terminal')">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-[#f37021] text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md">
                &gt;_
              </div>
              <div>
                <div class="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>BZT-Shell Kali Terminali &amp; CTF Savaş Arenası</span>
                  <span class="text-[10px] font-mono bg-orange-950/80 text-orange-300 border border-orange-800 px-2 py-0.5 rounded">CANLI SİMÜLATÖR</span>
                </div>
                <div class="text-[11px] text-gray-400 mt-0.5">
                  15+ yerleşik siber güvenlik aracı (nmap, sqlmap, gobuster, hashcat, msfconsole) ve 12 gerçekçi zaafiyetli makine ile uygulamalı pratik yapın.
                </div>
              </div>
            </div>
            <div class="text-xs font-mono font-bold text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
              <span>${lang === 'tr' ? 'Simülatöre Git' : 'Launch Terminal'}</span>
              <span>→</span>
            </div>
          </div>
        </div>
      `;
    }

    if (menuKey === "hats") {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-gray-800/80 pb-4">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
              <span class="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                ${lang === 'tr' ? '7 HACKER ŞAPKASI & UZMANLIK ALANLARI' : '7 HACKER HATS & PERSONAS'}
              </span>
            </div>
            <span class="text-xs font-mono text-gray-500">Şapkanızı Seçin • Müfredat Özelleşsin</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${this.renderCardItem("hat-wh", "[WH]", "Beyaz Şapkalı (White Hat)", "Yasal, etik ve sistemleri koruma odaklı güvenlik kahramanı", "filter-hat", "white-hat")}
            ${this.renderCardItem("hat-bh", "[BH]", "Siyah Şapkalı (Black Hat)", "Saldırgan taktiklerini ve motivasyonlarını savunma amacıyla analiz edin", "filter-hat", "black-hat")}
            ${this.renderCardItem("hat-gh", "[GH]", "Gri Şapkalı (Grey Hat)", "İzin almadan araştıran ancak kötü niyeti olmayan bağımsız uzman", "filter-hat", "grey-hat")}
            ${this.renderCardItem("hat-rh", "[RH]", "Kırmızı Şapkalı (Red Hat)", "Tehdit aktörlerine agresif karşı taarruz yürüten siber adalet sağlayıcı", "filter-hat", "red-hat")}
            ${this.renderCardItem("hat-bl", "[BL]", "Mavi Şapkalı (Blue Hat)", "Yazılımlar çıkmadan açıkları avlayan kurumsal denetçi", "filter-hat", "blue-hat")}
            ${this.renderCardItem("hat-pt", "[PT]", "Mor Takım (Purple Team)", "Kırmızı (Saldırı) ve Mavi (Savunma) ekiplerini tek vücut yapan modern güç", "filter-hat", "purple-team")}
            ${this.renderCardItem("hat-gr", "[GR]", "Yeşil Şapkalı (Green Hat)", "Siber güvenlik yolculuğunun başında öğrenme azmiyle dolu çırak", "filter-hat", "green-hat")}
            
            <div class="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 flex flex-col justify-center text-xs font-mono space-y-1">
              <span class="text-orange-400 font-bold">[!] OTOMATİK HİZALAMA:</span>
              <span class="text-gray-300">Bir şapkaya tıkladığınızda müfredat o profile göre anında filtrelenir.</span>
            </div>
          </div>
        </div>
      `;
    }

    if (menuKey === "careers") {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-gray-800/80 pb-4">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
              <span class="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                ${lang === 'tr' ? '10 SİBER GÜVENLİK KARİYER ROTASI & MAAŞ SKALASI' : '10 CYBERSECURITY CAREER PATHS'}
              </span>
            </div>
            <span class="text-xs font-mono text-gray-500">Sektör Standartları • OSCP / eJPT / CISSP</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${this.renderCardItem("car-pentest", "[01]", "Etik Hacker & Pentester", "Web, ağ ve sistem açıklarını sömürün ($85k - $160k)", "filter-career", "pentester")}
            ${this.renderCardItem("car-db", "[02]", "Veritabanı Güvenlik Uzmanı", "SQL enjeksiyonu ve veri sızıntılarını önleyin ($90k - $155k)", "filter-career", "db-sec-expert")}
            ${this.renderCardItem("car-cloud", "[03]", "Bulut Güvenliği Uzmanı", "AWS, Azure, GCP ve Kubernetes güvenliği ($110k - $185k)", "filter-career", "cloud-sec-expert")}
            ${this.renderCardItem("car-soc", "[04]", "SOC Analisti (L1/L2/L3)", "7/24 tehdit izleme ve SIEM log analizi ($70k - $130k)", "filter-career", "soc-analyst")}
            ${this.renderCardItem("car-red", "[05]", "Kırmızı Takım Operatörü", "Kurumlara yönelik gerçekçi saldırı simülasyonları ($100k - $190k)", "filter-career", "red-team-operator")}
            ${this.renderCardItem("car-blue", "[06]", "Mavi Takım Savunucusu", "Sistem sertleştirme, IDS ve ağ savunması ($80k - $150k)", "filter-career", "blue-team-defender")}
            ${this.renderCardItem("car-malware", "[07]", "Zararlı Yazılım Analisti", "Tersine mühendislik ve dinamik analiz ($95k - $170k)", "filter-career", "malware-analyst")}
            ${this.renderCardItem("car-threat", "[08]", "Tehdit Avcısı (Threat Hunter)", "Ağda gizlenen gelişmiş tehditleri (APT) avlayın ($105k - $180k)", "filter-career", "threat-hunter")}
            ${this.renderCardItem("car-appsec", "[09]", "AppSec & DevSecOps", "Güvenli yazılım yaşam döngüsü ve SAST/DAST ($95k - $165k)", "filter-career", "appsec-engineer")}
          </div>

          <div class="p-3.5 rounded-xl bg-[#030712] border border-gray-800 text-xs font-mono text-gray-400 flex items-center justify-between">
            <div>İpucu: Seçtiğiniz kariyer hedefine göre müfredat otomatik olarak sertifikasyonlara hizalanır.</div>
            <button onclick="BZTMegaMenu.actionNavigate('switch-tab', 'curriculum')" class="text-orange-400 hover:text-white font-bold underline cursor-pointer">
              Tüm Müfredatı Gör →
            </button>
          </div>
        </div>
      `;
    }

    if (menuKey === "labs") {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-gray-800/80 pb-4">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
              <span class="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                ${lang === 'tr' ? 'İNTERAKTİF LABORATUVARLAR & SİBER CEPHANELİK' : 'INTERACTIVE LABS & TOOLS'}
              </span>
            </div>
            <span class="text-xs font-mono text-gray-500">Tarayıcı İçi Simülasyon • Sıfır Kurulum</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${this.renderCardItem("lab-sqli", "[SQL]", "SQL Injection Laboratuvarı", "Kimlik doğrulama bypass (' OR 1=1 --) ve canlı sorgu görselleştirme", "switch-tab-scroll", "labs", "sql-lab")}
            ${this.renderCardItem("lab-xss", "[XSS]", "XSS Playground Laboratuvarı", "WAF filtre atlatma ve sanal alert tetikleme laboratuvarı", "switch-tab-scroll", "labs", "xss-lab")}
            ${this.renderCardItem("lab-rce", "[RCE]", "Command Injection Laboratuvarı", "Ping arayüzü arkasında komut zincirleme simülasyonu", "switch-tab-scroll", "labs", "rce-lab")}
            ${this.renderCardItem("tool-shell", "[SH]", "BZT-Shell Kali Terminali", "Nmap, sqlmap, gobuster, hashcat canlı Linux komut satırı", "switch-tab", "terminal")}
            ${this.renderCardItem("tool-rev", "[REV]", "Reverse Shell Üretici", "Bash, Python, NC, PowerShell tek tıkla ters bağlantı kodları", "switch-tab", "tools")}
            ${this.renderCardItem("tool-ctf", "[CTF]", "CTF Savaş Arenası", "12 kademeli zaafiyetli makine ve +1500 XP ödül havuzu", "switch-tab", "ctf")}
          </div>

          <!-- Bottom Card -->
          <div class="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 flex items-center justify-between text-xs font-mono">
            <div class="text-gray-300">
              <b class="text-orange-400">[GÜVENLİ KUM HAVUZU]</b> Tüm laboratuvarlar tarayıcı içinde sanal olarak çalışır, harici sistemlere zarar vermez.
            </div>
            <button onclick="BZTMegaMenu.actionNavigate('switch-tab', 'labs')" class="px-4 py-2 bg-[#f37021] hover:bg-[#e05d0e] text-white font-bold rounded-lg transition-colors cursor-pointer">
              Laboratuvara Gir →
            </button>
          </div>
        </div>
      `;
    }

    return "";
  },

  renderCardItem(id, badge, title, desc, actionType, actionVal1, actionVal2) {
    return `
      <div class="mega-menu-item group flex items-start gap-3 p-3 rounded-xl bg-[#070b14] hover:bg-[#0f172a] border border-gray-800/80 hover:border-[#f37021]/60 transition-all cursor-pointer select-none"
           data-action-type="${actionType}" data-val1="${actionVal1 || ''}" data-val2="${actionVal2 || ''}">
        <div class="w-8 h-8 rounded-lg bg-orange-950/40 border border-orange-800/60 flex items-center justify-center text-[#f37021] shrink-0 font-mono text-xs font-bold group-hover:scale-105 group-hover:bg-[#f37021] group-hover:text-white transition-all shadow-xs">
          ${badge}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1">
            <h4 class="text-xs sm:text-sm font-bold text-white group-hover:text-[#f37021] transition-colors truncate">
              ${title}
            </h4>
            <span class="text-gray-500 group-hover:text-[#f37021] group-hover:translate-x-0.5 transition-all text-xs font-mono font-bold">›</span>
          </div>
          <p class="text-[11px] text-gray-400 line-clamp-1 mt-0.5 leading-relaxed">
            ${desc}
          </p>
        </div>
      </div>
    `;
  },

  attachCardActions(container) {
    container.querySelectorAll(".mega-menu-item").forEach(item => {
      item.addEventListener("click", () => {
        const actionType = item.getAttribute("data-action-type");
        const val1 = item.getAttribute("data-val1");
        const val2 = item.getAttribute("data-val2");
        BZTMegaMenu.actionNavigate(actionType, val1, val2);
      });
    });
  },

  actionNavigate(type, val1, val2) {
    this.closeMenu();

    if (type === "open-lesson") {
      if (typeof window.openLessonModal === "function") {
        window.openLessonModal(val1);
      }
    } else if (type === "filter-phase") {
      if (window.BZTApp) window.BZTApp.switchTab("curriculum");
      const phaseBtn = document.querySelector(`.phase-filter-btn[data-phase="${val1}"]`);
      if (phaseBtn) {
        phaseBtn.click();
      }
      setTimeout(() => {
        const grid = document.getElementById("curriculum-grid");
        if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } else if (type === "filter-hat") {
      if (window.BZTHats && typeof window.BZTHats.selectHatFromDrawer === "function") {
        window.BZTHats.selectHatFromDrawer(val1);
      }
      setTimeout(() => {
        const target = document.getElementById("active-career-indicator") || document.getElementById("curriculum-grid");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } else if (type === "filter-career") {
      if (window.BZTCareers && typeof window.BZTCareers.selectCareerFromDrawer === "function") {
        window.BZTCareers.selectCareerFromDrawer(val1);
      }
    } else if (type === "switch-tab") {
      if (window.BZTApp) window.BZTApp.switchTab(val1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (type === "switch-tab-scroll") {
      if (window.BZTApp) window.BZTApp.switchTab(val1);
      if (val2) {
        setTimeout(() => {
          const el = document.getElementById(val2);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    } else if (type === "open-drawer") {
      if (window.BZTApp) {
        window.BZTApp.openDrawer();
        if (val1 && typeof window.BZTApp.switchDrawerSection === "function") {
          window.BZTApp.switchDrawerSection(val1);
        }
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  BZTMegaMenu.init();
});

window.BZTMegaMenu = BZTMegaMenu;
