/**
 * BZT Cyber Security - Hacker Hats & Personas Engine (v3.5 PRO)
 * White, Black, Grey, Blue, Red, Green, and Purple Hat Alignments
 */

const BZT_HACKER_HATS = [
  {
    id: "white-hat",
    name: { tr: "Beyaz Şapkalı Hacker (White Hat)", en: "White Hat Hacker (Ethical Defender)" },
    badge: "White Hat",
    icon: "[WH]",
    themeClass: "border-cyan-500 text-cyan-400 bg-cyan-950/40",
    tagline: { tr: "Yasal, etik ve sistemleri koruma odaklı güvenlik kahramanı.", en: "Authorized, lawful, and dedicated to defending systems from exploitation." },
    description: {
      tr: "Kurumların izniyle çalışan, sistem açıklarını kötü niyetli kişiler bulmadan önce tespit edip yamayan, gizlilik ve etik kurallara tam bağlı güvenlik uzmanlarıdır.",
      en: "Security professionals working with full legal authorization to identify vulnerabilities, responsibly disclose them, and reinforce digital perimeters."
    },
    mindset: { tr: "İzin Al, Zafiyeti Belgele, Yamayı Doğrula, Sistemi Koru.", en: "Get Authorized, Document Impact, Verify Patches, Defend Infrastructure." },
    recommendedLessons: ["net-foundations", "active-recon-nmap", "burpsuite-masterclass", "blue-team-career", "linux-bash-mastery"]
  },
  {
    id: "black-hat",
    name: { tr: "Siyah Şapkalı Hacker (Black Hat - Analiz)", en: "Black Hat Adversary (Threat Analysis)" },
    badge: "Black Hat",
    icon: "[BH]",
    themeClass: "border-red-500 text-red-400 bg-red-950/40",
    tagline: { tr: "Yasa dışı siber saldırganların motivasyonlarını savunma amacıyla analiz edin.", en: "Deconstruct malicious adversary tactics, ransomware, and crime architectures for defense." },
    description: {
      tr: "Siyah şapkalı saldırganlar kişisel çıkar, fidye veya casusluk için yetkisiz sızmalar yaparlar. Bir savunmacı olarak onların taktiklerini (TTP - Tactics, Techniques & Procedures) bilmek en etkili savunmayı kurmayı sağlar.",
      en: "Malicious actors exploit systems without authorization for financial gain, espionage, or destruction. We study their TTPs strictly to predict and counter their moves."
    },
    mindset: { tr: "Saldırgan gibi düşün, savunmayı buna göre inşa et.", en: "Think like the adversary to architect impenetrable defense." },
    recommendedLessons: ["metasploit-exploitation", "red-team-evasion", "sqli-exploitation", "active-directory-attacks", "linux-privesc"]
  },
  {
    id: "grey-hat",
    name: { tr: "Gri Şapkalı Hacker (Grey Hat)", en: "Grey Hat Hacker (Independent Researcher)" },
    badge: "Grey Hat",
    icon: "[GH]",
    themeClass: "border-gray-500 text-gray-300 bg-gray-900/60",
    tagline: { tr: "Kötü niyeti olmayan ancak izinsiz araştırma yapabilen bağımsız uzman.", en: "Independent researcher finding flaws without malicious intent or prior clearance." },
    description: {
      tr: "Açık bulduklarında sistemi çökertmez veya veri çalmazlar; genelde firmaya bildirip ödül (Bug Bounty) veya onur listesi (Hall of Fame) talep ederler. Yasal riskler barındırır.",
      en: "Operating in regulatory grey zones, these researchers discover vulnerabilities without prior contracts and seek responsible disclosure or bug bounty rewards."
    },
    mindset: { tr: "Zarar verme, ama merakından da vazgeçme.", en: "Do no harm, but relentlessly pursue technical curiosity." },
    recommendedLessons: ["osint-recon-deep", "sqli-exploitation", "xss-csrf-dom", "rce-ssrf-deserialization", "burpsuite-masterclass"]
  },
  {
    id: "red-hat",
    name: { tr: "Kırmızı Şapkalı Hacker (Red Hat - Vigilante)", en: "Red Hat Hacker (Aggressive Counter-Attacker)" },
    badge: "Red Hat",
    icon: "[RH]",
    themeClass: "border-amber-500 text-amber-400 bg-amber-950/40",
    tagline: { tr: "Siyah şapkalı saldırganları doğrudan hedef alan agresif siber adalet sağlayıcı.", en: "Vigilante defenders who launch proactive counter-strikes against black hats." },
    description: {
      tr: "Saldırganları sadece engellemekle kalmaz; saldırganın kendi altyapısını, botnet ağını veya C2 sunucusunu çökertmeyi hedeflerler.",
      en: "Unlike passive defenders, Red Hats actively pursue malicious threat actors, dismantling botnets, seizing C2 nodes, and destroying malware infrastructure."
    },
    mindset: { tr: "En iyi savunma, saldırganın cephanesini yok etmektir.", en: "The ultimate defense is the destruction of the adversary's attack arsenal." },
    recommendedLessons: ["red-team-evasion", "linux-privesc", "python-for-hackers", "wireless-social-eng", "metasploit-exploitation"]
  },
  {
    id: "blue-hat",
    name: { tr: "Mavi Şapkalı Hacker (Blue Hat)", en: "Blue Hat Security (Corporate Auditor)" },
    badge: "Blue Hat",
    icon: "[BL]",
    themeClass: "border-blue-500 text-blue-400 bg-blue-950/40",
    tagline: { tr: "Yazılımlar piyasaya çıkmadan önce güvenlik açıklarını avlayan kurumsal uzman.", en: "External or specialized corporate auditors invited to battle-test products pre-release." },
    description: {
      tr: "Microsoft veya büyük teknoloji devlerinin düzenlediği BlueHat konferanslarından adını alır. Ürün yayınlanmadan önce dış göz olarak sızma testi yapan uzmanlardır.",
      en: "Invited security specialists contracted by enterprises to probe new systems, operating systems, or software suites for critical flaws prior to commercial launch."
    },
    mindset: { tr: "Hata yayına çıkmadan önce kapıyı kilitle.", en: "Seal vulnerabilities before the application reaches production." },
    recommendedLessons: ["burpsuite-masterclass", "sqli-exploitation", "xss-csrf-dom", "cryptography-hashing", "net-foundations"]
  },
  {
    id: "green-hat",
    name: { tr: "Yeşil Şapkalı Hacker (Green Hat - Çırak)", en: "Green Hat Hacker (Security Apprentice)" },
    badge: "Green Hat",
    icon: "[GR]",
    themeClass: "border-emerald-500 text-emerald-400 bg-emerald-950/40",
    tagline: { tr: "Siber güvenlik yolculuğunun başında, öğrenme azmiyle dolu hacker çırağı.", en: "Eager student beginning the cyber journey with deep curiosity and drive to master the craft." },
    description: {
      tr: "Script kiddie'lerden farklı olarak hazır araçları körü körüne çalıştırmazlar; aracın arka planda nasıl çalıştığını, paketlerin mantığını ve exploitlerin iç yapısını öğrenmek isterler.",
      en: "Unlike script kiddies, green hats study how tools operate under the hood, dissecting packet flows, assembly instructions, and vulnerability roots to grow into true pros."
    },
    mindset: { tr: "Her gün yeni bir protokol, araç ve açık öğren!", en: "Learn a new protocol, command, and vulnerability every single day!" },
    recommendedLessons: ["net-foundations", "linux-bash-mastery", "python-for-hackers", "active-recon-nmap", "osint-recon-deep"]
  },
  {
    id: "purple-team",
    name: { tr: "Mor Şapkalı / Mor Takım (Purple Team)", en: "Purple Team (Offensive + Defensive Synergy)" },
    badge: "Purple Team",
    icon: "[PT]",
    themeClass: "border-purple-500 text-purple-400 bg-purple-950/40",
    tagline: { tr: "Kırmızı (Saldırı) ve Mavi (Savunma) ekiplerini tek vücut yapan modern siber strateji.", en: "Fusing offensive Red Team and defensive Blue Team into a unified, lethal synergy." },
    description: {
      tr: "Saldıran ekibin bulduğu zafiyeti derhal savunma ekibinin SIEM kurallarına ve EDR imzalarına dönüştürdüğü, kurumun güvenlik direncini en hızlı artıran hibrit yöntemdir.",
      en: "Real-time collaborative simulation where offensive operators trigger realistic exploits alongside defensive analysts to calibrate detection rules within minutes."
    },
    mindset: { tr: "Birlikte saldır, anında tespit et, kusursuz savun.", en: "Simulate attacks together, detect instantly, defend flawlessly." },
    recommendedLessons: ["metasploit-exploitation", "active-directory-attacks", "red-team-evasion", "blue-team-career", "linux-privesc"]
  }
];

const BZTHats = {
  activeHatId: localStorage.getItem("bzt_hacker_hat") || "white-hat",
  activeHatFilter: null,

  getHat(id) {
    const targetId = id || this.activeHatFilter || this.activeHatId;
    return BZT_HACKER_HATS.find(h => h.id === targetId) || BZT_HACKER_HATS[0];
  },

  setHat(id) {
    if (BZT_HACKER_HATS.some(h => h.id === id)) {
      this.activeHatId = id;
      localStorage.setItem("bzt_hacker_hat", id);
      this.updateHatUI();
      this.closeModal();
    }
  },

  selectHatFromDrawer(id) {
    this.activeHatFilter = id;
    this.setHat(id);
    if (window.BZTCareers) {
      window.BZTCareers.activeCareerId = null;
    }

    const hat = this.getHat(id);
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const getT = (obj) => typeof obj === "object" && obj !== null ? (obj[lang] || obj.tr || obj.en || "") : obj;

    const indicator = document.getElementById("active-career-indicator");
    if (indicator) {
      indicator.classList.remove("hidden");
      const firstLesson = (hat.recommendedLessons && hat.recommendedLessons.length > 0) ? hat.recommendedLessons[0] : null;
      indicator.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl bg-white border border-orange-200 text-[#f37021] shadow-xs">${hat.icon}</span>
          <div>
            <div class="text-slate-900 font-bold font-mono text-sm">
              ${lang === 'tr' ? 'Aktif Hacker Şapkası & Eğitim Programı:' : 'Active Hacker Persona & Curriculum:'} <span class="text-[#f37021]">${getT(hat.name)}</span>
            </div>
            <div class="text-xs text-slate-600 font-mono mt-0.5">
              ${lang === 'tr' ? `Bu hacker profili için özel ${hat.recommendedLessons.length} eğitim modülü açıldı.` : `${hat.recommendedLessons.length} curated training modules opened for this persona.`}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${firstLesson ? `
            <button onclick="window.openLessonModal('${firstLesson}')" class="px-3.5 py-2 rounded-xl bg-[#f37021] hover:bg-[#e05d0e] text-white text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1">
              <span>${lang === 'tr' ? 'İlk Eğitime Başla' : 'Start First Lesson'}</span>
              <span>→</span>
            </button>
          ` : ''}
          <button onclick="BZTHats.clearFilter()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-mono transition-all">
            [X] ${lang === 'tr' ? 'Tümünü Göster' : 'Show All'}
          </button>
        </div>
      `;
    }

    if (window.BZTApp) {
      window.BZTApp.closeDrawer();
      window.BZTApp.switchTab("curriculum");
    }

    if (typeof window.renderCurriculum === "function") {
      window.renderCurriculum();
    }

    setTimeout(() => {
      const target = document.getElementById("active-career-indicator") || document.getElementById("curriculum-grid");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  },

  clearFilter() {
    this.activeHatFilter = null;
    if (window.BZTCareers) window.BZTCareers.activeCareerId = null;
    const indicator = document.getElementById("active-career-indicator");
    if (indicator) indicator.classList.add("hidden");
    if (typeof window.renderCurriculum === "function") {
      window.renderCurriculum();
    }
  },

  updateHatUI() {
    const hat = this.getHat();
    const navBadge = document.getElementById("active-hat-nav-badge");
    if (navBadge) {
      navBadge.innerHTML = `<span>${hat.icon}</span> <span>${hat.badge}</span>`;
    }
  },

  openModal() {
    const modal = document.getElementById("hat-modal");
    if (modal) {
      modal.classList.remove("hidden");
      this.updateHatUI();
    }
  },

  closeModal() {
    const modal = document.getElementById("hat-modal");
    if (modal) modal.classList.add("hidden");
  }
};

window.BZTHats = BZTHats;
