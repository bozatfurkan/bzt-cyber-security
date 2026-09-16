/**
 * BZT Cyber Security - Hacker Hats & Personas Engine (v3.5 PRO)
 * White, Black, Grey, Blue, Red, Green, and Purple Hat Alignments
 */

const BZT_HACKER_HATS = [
  {
    id: "white-hat",
    name: { tr: "Beyaz Şapkalı Hacker (White Hat)", en: "White Hat Hacker (Ethical Defender)" },
    badge: "⚪ Beyaz Şapka",
    icon: "🛡️",
    themeClass: "border-cyan-500 text-cyan-400 bg-cyan-950/40",
    tagline: { tr: "Yasal, etik ve sistemleri koruma odaklı güvenlik kahramanı.", en: "Authorized, lawful, and dedicated to defending systems from exploitation." },
    description: {
      tr: "Kurumların izniyle çalışan, sistem açıklarını kötü niyetli kişiler bulmadan önce tespit edip yamayan, gizlilik ve etik kurallara tam bağlı güvenlik uzmanlarıdır.",
      en: "Security professionals working with full legal authorization to identify vulnerabilities, responsibly disclose them, and reinforce digital perimeters."
    },
    mindset: { tr: "İzin Al, Zafiyeti Belgele, Yamayı Doğrula, Sistemi Koru.", en: "Get Authorized, Document Impact, Verify Patches, Defend Infrastructure." }
  },
  {
    id: "black-hat",
    name: { tr: "Siyah Şapkalı Hacker (Black Hat - Analiz)", en: "Black Hat Adversary (Threat Analysis)" },
    badge: "⚫ Siyah Şapka",
    icon: "🥷",
    themeClass: "border-red-500 text-red-400 bg-red-950/40",
    tagline: { tr: "Yasa dışı siber saldırganların motivasyonlarını savunma amacıyla analiz edin.", en: "Deconstruct malicious adversary tactics, ransomware, and crime architectures for defense." },
    description: {
      tr: "Siyah şapkalı saldırganlar kişisel çıkar, fidye veya casusluk için yetkisiz sızmalar yaparlar. Bir savunmacı olarak onların taktiklerini (TTP - Tactics, Techniques & Procedures) bilmek en etkili savunmayı kurmayı sağlar.",
      en: "Malicious actors exploit systems without authorization for financial gain, espionage, or destruction. We study their TTPs strictly to predict and counter their moves."
    },
    mindset: { tr: "Saldırgan gibi düşün, savunmayı buna göre inşa et.", en: "Think like the adversary to architect impenetrable defense." }
  },
  {
    id: "grey-hat",
    name: { tr: "Gri Şapkalı Hacker (Grey Hat)", en: "Grey Hat Hacker (Independent Researcher)" },
    badge: "🔘 Gri Şapka",
    icon: "⚖️",
    themeClass: "border-gray-500 text-gray-300 bg-gray-900/60",
    tagline: { tr: "Kötü niyeti olmayan ancak izinsiz araştırma yapabilen bağımsız uzman.", en: "Independent researcher finding flaws without malicious intent or prior clearance." },
    description: {
      tr: "Açık bulduklarında sistemi çökertmez veya veri çalmazlar; genelde firmaya bildirip ödül (Bug Bounty) veya onur listesi (Hall of Fame) talep ederler. Yasal riskler barındırır.",
      en: "Operating in regulatory grey zones, these researchers discover vulnerabilities without prior contracts and seek responsible disclosure or bug bounty rewards."
    },
    mindset: { tr: "Zarar verme, ama merakından da vazgeçme.", en: "Do no harm, but relentlessly pursue technical curiosity." }
  },
  {
    id: "red-hat",
    name: { tr: "Kırmızı Şapkalı Hacker (Red Hat - Vigilante)", en: "Red Hat Hacker (Aggressive Counter-Attacker)" },
    badge: "🔴 Kırmızı Şapka",
    icon: "⚡",
    themeClass: "border-amber-500 text-amber-400 bg-amber-950/40",
    tagline: { tr: "Siyah şapkalı saldırganları doğrudan hedef alan agresif siber adalet sağlayıcı.", en: "Vigilante defenders who launch proactive counter-strikes against black hats." },
    description: {
      tr: "Saldırganları sadece engellemekle kalmaz; saldırganın kendi altyapısını, botnet ağını veya C2 sunucusunu çökertmeyi hedeflerler.",
      en: "Unlike passive defenders, Red Hats actively pursue malicious threat actors, dismantling botnets, seizing C2 nodes, and destroying malware infrastructure."
    },
    mindset: { tr: "En iyi savunma, saldırganın cephanesini yok etmektir.", en: "The ultimate defense is the destruction of the adversary's attack arsenal." }
  },
  {
    id: "blue-hat",
    name: { tr: "Mavi Şapkalı Hacker (Blue Hat)", en: "Blue Hat Security (Corporate Auditor)" },
    badge: "🔵 Mavi Şapka",
    icon: "🏛️",
    themeClass: "border-blue-500 text-blue-400 bg-blue-950/40",
    tagline: { tr: "Yazılımlar piyasaya çıkmadan önce güvenlik açıklarını avlayan kurumsal uzman.", en: "External or specialized corporate auditors invited to battle-test products pre-release." },
    description: {
      tr: "Microsoft veya büyük teknoloji devlerinin düzenlediği BlueHat konferanslarından adını alır. Ürün yayınlanmadan önce dış göz olarak sızma testi yapan uzmanlardır.",
      en: "Invited security specialists contracted by enterprises to probe new systems, operating systems, or software suites for critical flaws prior to commercial launch."
    },
    mindset: { tr: "Hata yayına çıkmadan önce kapıyı kilitle.", en: "Seal vulnerabilities before the application reaches production." }
  },
  {
    id: "green-hat",
    name: { tr: "Yeşil Şapkalı Hacker (Green Hat - Çırak)", en: "Green Hat Hacker (Security Apprentice)" },
    badge: "🟢 Yeşil Şapka",
    icon: "🌱",
    themeClass: "border-emerald-500 text-emerald-400 bg-emerald-950/40",
    tagline: { tr: "Siber güvenlik yolculuğunun başında, öğrenme azmiyle dolu hacker çırağı.", en: "Eager student beginning the cyber journey with deep curiosity and drive to master the craft." },
    description: {
      tr: "Script kiddie'lerden farklı olarak hazır araçları körü körüne çalıştırmazlar; aracın arka planda nasıl çalıştığını, paketlerin mantığını ve exploitlerin iç yapısını öğrenmek isterler.",
      en: "Unlike script kiddies, green hats study how tools operate under the hood, dissecting packet flows, assembly instructions, and vulnerability roots to grow into true pros."
    },
    mindset: { tr: "Her gün yeni bir protokol, araç ve açık öğren!", en: "Learn a new protocol, command, and vulnerability every single day!" }
  },
  {
    id: "purple-team",
    name: { tr: "Mor Şapkalı / Mor Takım (Purple Team)", en: "Purple Team (Offensive + Defensive Synergy)" },
    badge: "🟣 Mor Şapka",
    icon: "🔮",
    themeClass: "border-purple-500 text-purple-400 bg-purple-950/40",
    tagline: { tr: "Kırmızı (Saldırı) ve Mavi (Savunma) ekiplerini tek vücut yapan modern siber strateji.", en: "Fusing offensive Red Team and defensive Blue Team into a unified, lethal synergy." },
    description: {
      tr: "Saldıran ekibin bulduğu zafiyeti derhal savunma ekibinin SIEM kurallarına ve EDR imzalarına dönüştürdüğü, kurumun güvenlik direncini en hızlı artıran hibrit yöntemdir.",
      en: "Real-time collaborative simulation where offensive operators trigger realistic exploits alongside defensive analysts to calibrate detection rules within minutes."
    },
    mindset: { tr: "Birlikte saldır, anında tespit et, kusursuz savun.", en: "Simulate attacks together, detect instantly, defend flawlessly." }
  }
];

const BZTHats = {
  activeHatId: localStorage.getItem("bzt_hacker_hat") || "white-hat",

  getHat() {
    return BZT_HACKER_HATS.find(h => h.id === this.activeHatId) || BZT_HACKER_HATS[0];
  },

  setHat(id) {
    if (BZT_HACKER_HATS.some(h => h.id === id)) {
      this.activeHatId = id;
      localStorage.setItem("bzt_hacker_hat", id);
      this.updateHatUI();
      this.closeModal();
    }
  },

  updateHatUI() {
    const hat = this.getHat();
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const getT = (obj) => typeof obj === "object" && obj !== null ? (obj[lang] || obj.tr || obj.en || "") : obj;

    const navBadge = document.getElementById("active-hat-nav-badge");
    if (navBadge) {
      navBadge.innerHTML = `<span>${hat.icon}</span> <span>${hat.badge}</span>`;
    }

    const modalList = document.getElementById("hat-selector-list");
    if (modalList) {
      modalList.innerHTML = BZT_HACKER_HATS.map(h => {
        const isSelected = h.id === this.activeHatId;
        return `
          <div class="glass-panel p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? h.themeClass + ' shadow-lg' : 'border-gray-800 hover:border-gray-700'}" onclick="BZTHats.setHat('${h.id}')">
            <div class="flex items-center justify-between gap-3 mb-2">
              <div class="flex items-center gap-2">
                <span class="text-2xl">${h.icon}</span>
                <div>
                  <h4 class="font-bold text-white text-sm">${getT(h.name)}</h4>
                  <div class="text-[11px] font-mono text-gray-400">${getT(h.tagline)}</div>
                </div>
              </div>
              <span class="text-xs px-2 py-0.5 rounded font-mono font-bold ${isSelected ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}">
                ${isSelected ? (lang === 'tr' ? '✓ Aktif' : '✓ Active') : (lang === 'tr' ? 'Seç' : 'Select')}
              </span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed mb-2">${getT(h.description)}</p>
            <div class="text-[11px] font-mono text-cyan-300"><b>Zihniyet:</b> "${getT(h.mindset)}"</div>
          </div>
        `;
      }).join("");
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
