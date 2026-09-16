/**
 * BZT Cyber Security - Main Application Controller (v3.5 PRO with Full i18n)
 * Coordinates Curriculum, Labs, CTF Engine, Terminal, Tools, Gamification, and Certificates
 */

const BZTApp = {
  // Rank Levels
  ranks: [
    { min: 0, max: 200, titleTr: "Script Kiddie", titleEn: "Script Kiddie", color: "text-emerald-400" },
    { min: 201, max: 500, titleTr: "Cyber Apprentice", titleEn: "Cyber Apprentice", color: "text-cyan-400" },
    { min: 501, max: 1000, titleTr: "Junior Pentester", titleEn: "Junior Pentester", color: "text-purple-400" },
    { min: 1001, max: 1800, titleTr: "Elite Red Teamer", titleEn: "Elite Red Teamer", color: "text-red-400" },
    { min: 1801, max: 99999, titleTr: "BZT Grand Master Hacker", titleEn: "BZT Grand Master Hacker", color: "text-yellow-400" }
  ],

  getXp() {
    return parseInt(localStorage.getItem("bzt_user_xp") || "0");
  },

  addXp(amount) {
    const current = this.getXp();
    const next = current + amount;
    localStorage.setItem("bzt_user_xp", next.toString());
    this.updateUserStats();
  },

  getRank(xp) {
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const match = this.ranks.find(r => xp >= r.min && xp <= r.max) || this.ranks[0];
    return {
      title: lang === "tr" ? match.titleTr : match.titleEn,
      color: match.color
    };
  },

  openDrawer() {
    const drawer = document.getElementById("cyber-nav-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (drawer) drawer.classList.remove("translate-x-full");
    if (backdrop) backdrop.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  },

  closeDrawer() {
    const drawer = document.getElementById("cyber-nav-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (drawer) drawer.classList.add("translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  },

  toggleDrawer() {
    const drawer = document.getElementById("cyber-nav-drawer");
    if (drawer && drawer.classList.contains("translate-x-full")) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  },

  switchDrawerSection(section) {
    const secCareers = document.getElementById("drawer-section-careers");
    const secNav = document.getElementById("drawer-section-nav");
    const btnCareers = document.getElementById("drawer-tab-btn-careers");
    const btnNav = document.getElementById("drawer-tab-btn-nav");

    if (section === "careers") {
      if (secCareers) secCareers.classList.remove("hidden");
      if (secNav) secNav.classList.add("hidden");
      if (btnCareers) {
        btnCareers.className = "flex-1 py-2 rounded-xl font-bold text-center transition-all bg-[#f37021] text-white shadow-xs text-xs font-mono";
      }
      if (btnNav) {
        btnNav.className = "flex-1 py-2 rounded-xl font-semibold text-center text-gray-400 hover:text-white transition-all text-xs font-mono";
      }
    } else {
      if (secCareers) secCareers.classList.add("hidden");
      if (secNav) secNav.classList.remove("hidden");
      if (btnNav) {
        btnNav.className = "flex-1 py-2 rounded-xl font-bold text-center transition-all bg-[#f37021] text-white shadow-xs text-xs font-mono";
      }
      if (btnCareers) {
        btnCareers.className = "flex-1 py-2 rounded-xl font-semibold text-center text-gray-400 hover:text-white transition-all text-xs font-mono";
      }
    }
  },

  switchTab(targetTab) {
    if (!targetTab) return;
    const tabButtons = document.querySelectorAll(".nav-tab");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(b => {
      const bTab = b.getAttribute("data-tab");
      if (bTab === targetTab) {
        b.classList.add("active", "bg-orange-950/60", "text-orange-400", "border-orange-800/80");
        b.classList.remove("text-gray-400");
      } else {
        b.classList.remove("active", "bg-orange-950/60", "text-orange-400", "border-orange-800/80");
        b.classList.add("text-gray-400");
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === `tab-${targetTab}`) {
        pane.classList.remove("hidden");
      } else {
        pane.classList.add("hidden");
      }
    });

    this.closeDrawer();

    if (targetTab === "terminal" && window.bztTerminalInstance) {
      setTimeout(() => {
        document.getElementById("terminal-input")?.focus();
      }, 100);
    } else if (targetTab === "ctf" && window.BZT_CTF) {
      BZT_CTF.renderChallenges("ctf-challenges-container");
    } else if (targetTab === "certificate" && window.BZTCertificate) {
      if (typeof window.updateCertPreview === "function") window.updateCertPreview();
    }
  },

  resetProgress() {
    const msg = window.BZTI18n ? window.BZTI18n.get("reset_confirm") : "Tüm ilerlemeniz sıfırlanacak. Emin misiniz?";
    if (confirm(msg)) {
      localStorage.removeItem("bzt_user_xp");
      localStorage.removeItem("bzt_completed_lessons");
      localStorage.removeItem("bzt_ctf_score");
      localStorage.removeItem("bzt_ctf_solved");
      this.updateUserStats();
      location.reload();
    }
  },

  updateUserStats() {
    const xp = this.getXp();
    const rank = this.getRank(xp);

    const xpDisplays = document.querySelectorAll(".user-xp-display");
    const rankDisplays = document.querySelectorAll(".user-rank-display");

    xpDisplays.forEach(el => el.innerText = `${xp} XP`);
    rankDisplays.forEach(el => {
      el.className = `user-rank-display font-bold ${rank.color}`;
      el.innerText = rank.title;
    });

    // Update progress bar
    const totalLessons = CURRICULUM_DATA.length;
    const completed = JSON.parse(localStorage.getItem("bzt_completed_lessons") || "[]");
    const pct = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;

    const progBar = document.getElementById("global-progress-bar");
    const progText = document.getElementById("global-progress-text");
    if (progBar) progBar.style.width = `${pct}%`;
    if (progText) progText.innerText = `%${pct}`;

    const drawerProgBar = document.getElementById("drawer-progress-bar");
    const drawerProgText = document.getElementById("drawer-progress-text");
    if (drawerProgBar) drawerProgBar.style.width = `${pct}%`;
    if (drawerProgText) drawerProgText.innerText = `%${pct}`;
  }
};

window.BZTApp = BZTApp;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Terminal
  if (document.getElementById("terminal-output")) {
    window.bztTerminalInstance = new BZTerminal("terminal-output", "terminal-input", "terminal-prompt");
  }

  // Hamburger Drawer & System Events
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const drawerResetBtn = document.getElementById("drawer-reset-btn");

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", () => BZTApp.toggleDrawer());
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", () => BZTApp.closeDrawer());
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", () => BZTApp.closeDrawer());
  if (drawerResetBtn) drawerResetBtn.addEventListener("click", () => BZTApp.resetProgress());

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      BZTApp.closeDrawer();
    }
  });

  // State
  let currentFilterPhase = "all";
  let searchQuery = "";
  let completedLessons = JSON.parse(localStorage.getItem("bzt_completed_lessons") || "[]");

  // DOM Elements
  const tabButtons = document.querySelectorAll(".nav-tab");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const curriculumGrid = document.getElementById("curriculum-grid");
  const searchInput = document.getElementById("search-curriculum");
  const phaseFilters = document.querySelectorAll(".phase-filter-btn");

  // Helper to fetch localized lesson content
  function getLessonData(item) {
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    if (lang === "en" && window.CURRICULUM_EN && window.CURRICULUM_EN[item.id]) {
      const en = window.CURRICULUM_EN[item.id];
      return {
        ...item,
        phaseTitle: en.phaseTitle || item.phaseTitle,
        title: en.title || item.title,
        difficulty: en.difficulty || item.difficulty,
        duration: en.duration || item.duration,
        summary: en.summary || item.summary,
        sections: en.sections || item.sections,
        quiz: en.quiz || item.quiz
      };
    }
    return item;
  }

  // 1. TAB NAVIGATION
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      BZTApp.switchTab(targetTab);
    });
  });

  // 2. RENDER CURRICULUM
  function renderCurriculum() {
    if (!curriculumGrid) return;
    curriculumGrid.innerHTML = "";

    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

    const activeCareer = window.BZTCareers ? window.BZTCareers.getActiveCareer() : null;
    const activeHat = window.BZTHats && window.BZTHats.activeHatFilter ? window.BZTHats.getHat(window.BZTHats.activeHatFilter) : null;

    const filtered = CURRICULUM_DATA.map(getLessonData).filter(item => {
      if (activeHat && activeHat.recommendedLessons && !activeHat.recommendedLessons.includes(item.id)) {
        return false;
      }
      if (activeCareer && activeCareer.recommendedLessons && !activeCareer.recommendedLessons.includes(item.id)) {
        return false;
      }
      const matchesPhase = currentFilterPhase === "all" || item.phase.toString() === currentFilterPhase;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.summary.toLowerCase().includes(q) || 
        item.tags.some(t => t.toLowerCase().includes(q));
      return matchesPhase && matchesSearch;
    });

    if (filtered.length === 0) {
      curriculumGrid.innerHTML = `
        <div class="col-span-full text-center py-12 text-gray-400">
          <div class="text-xs font-mono text-gray-500 mb-2">[SONUÇ BULUNAMADI]</div>
          <div class="font-bold text-lg text-gray-200">
            ${lang === 'tr' ? 'Aramanıza uygun ders veya modül bulunamadı.' : 'No lessons or modules found matching your query.'}
          </div>
          <div class="text-sm">
            ${lang === 'tr' ? 'Farklı bir arama terimi veya filtre seçmeyi deneyin.' : 'Try a different search term or filter category.'}
          </div>
        </div>`;
      return;
    }

    filtered.forEach(item => {
      const isDone = completedLessons.includes(item.id);
      const card = document.createElement("div");
      card.className = "clean-card p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#f37021] hover:shadow-xl hover:shadow-orange-950/30 group cursor-pointer bg-[#0b0f19] border border-gray-800";
      
      let badgeColor = "bg-emerald-950/80 text-emerald-400 border-emerald-800";
      if (item.difficulty.includes("Orta") || item.difficulty.includes("Intermediate")) badgeColor = "bg-blue-950/80 text-blue-400 border-blue-800";
      if (item.difficulty.includes("İleri") || item.difficulty.includes("Advanced")) badgeColor = "bg-purple-950/80 text-purple-400 border-purple-800";
      if (item.difficulty.includes("Uzman") || item.difficulty.includes("Expert")) badgeColor = "bg-red-950/80 text-red-400 border-red-800";

      const startText = lang === 'tr' ? 'Eğitimi Başlat' : 'Start Lesson';
      const doneText = isDone ? (lang === 'tr' ? 'Tamamlandı' : 'Completed') : (lang === 'tr' ? '○ Bitir' : '○ Mark Done');

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border ${badgeColor}">
              ${item.difficulty}
            </span>
            <div class="flex items-center gap-2 text-[11px] font-mono text-gray-400">
              <span class="text-[#f37021] font-bold">+${item.xp} XP</span>
              <span>•</span>
              <span>${item.duration}</span>
            </div>
          </div>

          <div class="text-[11px] font-mono text-[#f37021] font-semibold mb-1">
            ${item.phaseTitle}
          </div>

          <h3 class="text-base font-bold text-white group-hover:text-[#f37021] transition-colors mb-2 leading-snug">
            ${item.title}
          </h3>

          <p class="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            ${item.summary}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${item.tags.slice(0, 3).map(t => `<span class="text-[10px] font-mono bg-black/60 border border-gray-800 text-gray-400 px-2 py-0.5 rounded-md">${t}</span>`).join("")}
          </div>

          <div class="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <button class="open-lesson-btn text-xs font-bold bg-[#f37021] hover:bg-[#e05d0e] text-white px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1" data-id="${item.id}">
                <span>${startText}</span>
                <span>→</span>
              </button>
              <button class="open-slide-btn text-xs font-semibold bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 px-2.5 py-2 rounded-xl transition-all" data-id="${item.id}" title="${lang === 'tr' ? 'Ders Slaytını Aç' : 'Open Slide Deck'}">
                <span>${lang === 'tr' ? 'Slayt' : 'Slide'}</span>
              </button>
            </div>

            <button class="toggle-done-btn text-xs px-2 py-1 rounded transition-colors ${isDone ? 'text-emerald-400 font-bold font-mono' : 'text-gray-500 hover:text-gray-300 font-mono'}" data-id="${item.id}">
              ${doneText}
            </button>
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".open-slide-btn") || e.target.closest(".toggle-done-btn") || e.target.closest(".copy-code-btn")) {
          return;
        }
        openLessonModal(item.id);
      });

      curriculumGrid.appendChild(card);
    });

    BZTApp.updateUserStats();
    attachCardListeners();
  }
  window.renderCurriculum = renderCurriculum;

  // 3. ATTACH CARD LISTENERS
  function attachCardListeners() {
    document.querySelectorAll(".open-lesson-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        openLessonModal(id);
      });
    });

    document.querySelectorAll(".open-slide-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (window.BZTSlides) {
          window.BZTSlides.open(id);
        }
      });
    });

    document.querySelectorAll(".toggle-done-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const raw = CURRICULUM_DATA.find(x => x.id === id);

        if (completedLessons.includes(id)) {
          completedLessons = completedLessons.filter(x => x !== id);
        } else {
          completedLessons.push(id);
          if (raw && raw.xp) BZTApp.addXp(raw.xp);
        }
        localStorage.setItem("bzt_completed_lessons", JSON.stringify(completedLessons));
        renderCurriculum();
      });
    });
  }

  // 4. LESSON MODAL
  const modal = document.getElementById("lesson-modal");
  const modalContent = document.getElementById("lesson-modal-content");
  const closeModalBtn = document.getElementById("close-modal-btn");

  function openLessonModal(id) {
    const raw = CURRICULUM_DATA.find(x => x.id === id);
    if (!raw || !modal || !modalContent) return;

    const lesson = getLessonData(raw);
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

    modalContent.innerHTML = `
      <div class="border-b border-gray-800 pb-5 mb-6">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2 text-xs font-mono text-[#f37021] font-semibold">
            <span>${lesson.phaseTitle}</span> • <span>${lesson.difficulty}</span> • <span>${lesson.duration}</span> • <span class="text-orange-400 font-bold">+${lesson.xp} XP</span>
          </div>
          <button onclick="BZTSlides.start('${lesson.id}')" class="px-3.5 py-2 bg-[#f37021] hover:bg-[#e05d0e] text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs">
             <span>${lang === 'tr' ? 'Slayt Modu (Slide Deck)' : 'Slide Presentation'}</span>
          </button>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">${lesson.title}</h2>
        <p class="text-sm text-gray-300 leading-relaxed">${lesson.summary}</p>
      </div>

      <div class="space-y-8">
        ${lesson.sections.map((sec) => `
          <div class="space-y-3">
            <h4 class="text-lg font-bold text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
              ${sec.heading}
            </h4>
            <div class="text-sm text-gray-300 leading-relaxed whitespace-pre-line">${sec.content}</div>

            ${sec.codeSnippet ? `
              <div class="code-block p-4 my-3 font-mono text-xs text-emerald-400 overflow-x-auto rounded-xl border border-gray-800 bg-[#050811]">
                <div class="flex justify-between items-center text-gray-400 pb-2 mb-2 border-b border-gray-800 text-[11px]">
                  <span>${lang === 'tr' ? 'KOD ÖRNEĞİ / EXPLOIT' : 'CODE SNIPPET / EXPLOIT'}</span>
                  <button class="copy-code-btn hover:text-[#f37021] text-gray-300 transition-colors font-bold" data-code="${encodeURIComponent(sec.codeSnippet)}">
                    ${lang === 'tr' ? 'Kopyala' : 'Copy'}
                  </button>
                </div>
                <pre>${escapeHtml(sec.codeSnippet)}</pre>
              </div>
            ` : ""}

            ${sec.tip ? `
              <div class="p-3.5 bg-orange-950/40 border-l-4 border-[#f37021] rounded-r-xl text-xs text-orange-200">
                <b class="text-[#f37021]">${lang === 'tr' ? 'Hacker Notu & İpucu:' : 'Hacker Note & Tip:'}</b> ${sec.tip}
              </div>
            ` : ""}

            ${sec.terminalCommand ? `
              <div class="flex items-center justify-between p-3 bg-black/80 border border-gray-800 rounded-xl text-xs font-mono text-gray-300">
                <span class="text-gray-400">$ <span class="text-yellow-300">${sec.terminalCommand}</span></span>
                <button class="run-in-term-btn bg-[#f37021] hover:bg-[#e05d0e] text-white px-2.5 py-1 rounded-lg transition-colors text-[11px] font-bold" data-cmd="${sec.terminalCommand}">
                  ${lang === 'tr' ? "BZT-Shell'de Çalıştır" : 'Run in BZT-Shell'}
                </button>
              </div>
            ` : ""}
          </div>
        `).join("")}

        <!-- Mini Quiz Section -->
        ${lesson.quiz ? `
          <div class="mt-8 p-6 bg-black/60 border border-gray-800 rounded-2xl space-y-4">
            <div class="text-sm font-bold text-[#f37021] flex items-center gap-2">
              <span class="font-mono">[TEST]</span> ${lang === 'tr' ? 'Modül Pekiştirme Sorusu (+50 XP)' : 'Module Knowledge Check (+50 XP)'}
            </div>
            <div class="text-sm font-semibold text-white">${lesson.quiz.question}</div>
            <div class="space-y-2">
              ${lesson.quiz.options.map((opt, oIdx) => `
                <button class="quiz-opt-btn w-full text-left p-3.5 rounded-xl border border-gray-800 hover:border-[#f37021] bg-black/40 hover:bg-orange-950/20 text-xs text-gray-300 font-medium transition-all" data-qidx="${oIdx}" data-correct="${lesson.quiz.correct}">
                  ${String.fromCharCode(65 + oIdx)}) ${opt}
                </button>
              `).join("")}
            </div>
            <div id="quiz-feedback" class="hidden text-xs p-3.5 rounded-xl"></div>
          </div>
        ` : ""}
      </div>
    `;

    modalContent.querySelectorAll(".copy-code-btn").forEach(b => {
      b.addEventListener("click", () => {
        const code = decodeURIComponent(b.getAttribute("data-code"));
        navigator.clipboard.writeText(code);
        b.innerText = lang === 'tr' ? "Kopyalandı" : "Copied";
        setTimeout(() => b.innerText = lang === 'tr' ? "Kopyala" : "Copy", 1500);
      });
    });

    modalContent.querySelectorAll(".run-in-term-btn").forEach(b => {
      b.addEventListener("click", () => {
        const cmd = b.getAttribute("data-cmd");
        modal.classList.add("hidden");
        const termTabBtn = document.querySelector('.nav-tab[data-tab="terminal"]');
        if (termTabBtn) termTabBtn.click();
        if (window.bztTerminalInstance) {
          const input = document.getElementById("terminal-input");
          if (input) {
            input.value = cmd;
            input.focus();
          }
        }
      });
    });

    modalContent.querySelectorAll(".quiz-opt-btn").forEach(b => {
      b.addEventListener("click", () => {
        const selected = parseInt(b.getAttribute("data-qidx"));
        const correct = parseInt(b.getAttribute("data-correct"));
        const feedback = document.getElementById("quiz-feedback");
        if (!feedback) return;

        feedback.classList.remove("hidden", "bg-emerald-950/70", "border-emerald-500", "text-emerald-300", "bg-red-950/70", "border-red-500", "text-red-300");

        if (selected === correct) {
          feedback.classList.add("bg-emerald-950/70", "border", "border-emerald-500", "text-emerald-300");
          feedback.innerHTML = `<b>[+] ${lang === 'tr' ? 'Doğru Cevap!' : 'Correct Answer!'}</b> (+50 XP) ${lesson.quiz.explanation}`;
          BZTApp.addXp(50);
        } else {
          feedback.classList.add("bg-red-950/70", "border", "border-red-500", "text-red-300");
          feedback.innerHTML = `<b>[-] ${lang === 'tr' ? 'Yanlış Seçenek.' : 'Incorrect Choice.'}</b> ${lang === 'tr' ? 'Doğru cevap:' : 'Correct:'} <b>${String.fromCharCode(65 + correct)}</b>. ${lesson.quiz.explanation}`;
        }
      });
    });

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeLessonModal() {
    if (modal) {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  window.openLessonModal = openLessonModal;
  window.closeLessonModal = closeLessonModal;
  if (window.BZTApp) {
    window.BZTApp.openLesson = openLessonModal;
    window.BZTApp.closeLesson = closeLessonModal;
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeLessonModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeLessonModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal && !modal.classList.contains("hidden")) {
        closeLessonModal();
      }
    }
  });

  // 5. PHASE FILTER & SEARCH
  phaseFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      phaseFilters.forEach(b => b.classList.remove("bg-cyan-500", "text-black", "font-bold"));
      phaseFilters.forEach(b => b.classList.add("bg-gray-900", "text-gray-400"));
      btn.classList.add("bg-cyan-500", "text-black", "font-bold");
      btn.classList.remove("bg-gray-900", "text-gray-400");
      currentFilterPhase = btn.getAttribute("data-phase");
      renderCurriculum();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCurriculum();
    });
  }

  // 6. LABS EVENT LISTENERS
  const sqliInput = document.getElementById("sqli-payload-input");
  const sqliBtn = document.getElementById("sqli-run-btn");
  if (sqliBtn && sqliInput) {
    sqliBtn.addEventListener("click", () => BZTLabs.runSqlLab(sqliInput.value));
    sqliInput.addEventListener("keydown", (e) => { if (e.key === "Enter") BZTLabs.runSqlLab(sqliInput.value); });
  }
  document.querySelectorAll(".sqli-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      if (sqliInput) {
        sqliInput.value = chip.getAttribute("data-payload");
        BZTLabs.runSqlLab(sqliInput.value);
      }
    });
  });

  const xssInput = document.getElementById("xss-payload-input");
  const xssFilter = document.getElementById("xss-filter-select");
  const xssBtn = document.getElementById("xss-run-btn");
  if (xssBtn && xssInput && xssFilter) {
    xssBtn.addEventListener("click", () => BZTLabs.runXssLab(xssInput.value, xssFilter.value));
    xssInput.addEventListener("keydown", (e) => { if (e.key === "Enter") BZTLabs.runXssLab(xssInput.value, xssFilter.value); });
  }
  document.querySelectorAll(".xss-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      if (xssInput) {
        xssInput.value = chip.getAttribute("data-payload");
        BZTLabs.runXssLab(xssInput.value, xssFilter ? xssFilter.value : "no-filter");
      }
    });
  });

  const cmdInput = document.getElementById("cmd-input");
  const cmdBtn = document.getElementById("cmd-run-btn");
  if (cmdBtn && cmdInput) {
    cmdBtn.addEventListener("click", () => BZTLabs.runCmdLab(cmdInput.value));
    cmdInput.addEventListener("keydown", (e) => { if (e.key === "Enter") BZTLabs.runCmdLab(cmdInput.value); });
  }
  document.querySelectorAll(".cmd-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      if (cmdInput) {
        cmdInput.value = chip.getAttribute("data-payload");
        BZTLabs.runCmdLab(cmdInput.value);
      }
    });
  });

  const lfiInput = document.getElementById("lfi-input");
  const lfiBtn = document.getElementById("lfi-run-btn");
  if (lfiBtn && lfiInput) {
    lfiBtn.addEventListener("click", () => BZTLabs.runLfiLab(lfiInput.value));
    lfiInput.addEventListener("keydown", (e) => { if (e.key === "Enter") BZTLabs.runLfiLab(lfiInput.value); });
  }
  document.querySelectorAll(".lfi-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      if (lfiInput) {
        lfiInput.value = chip.getAttribute("data-payload");
        BZTLabs.runLfiLab(lfiInput.value);
      }
    });
  });

  const jwtInput = document.getElementById("jwt-token-input");
  const jwtBtn = document.getElementById("jwt-tamper-btn");
  if (jwtBtn && jwtInput) {
    jwtBtn.addEventListener("click", () => {
      const makeAdmin = document.getElementById("jwt-check-admin")?.checked;
      const setNone = document.getElementById("jwt-check-none")?.checked;
      BZTLabs.tamperJwt(jwtInput.value, makeAdmin, setNone);
    });
  }

  // 7. TOOLS: REVERSE SHELLS
  const revIp = document.getElementById("rev-ip");
  const revPort = document.getElementById("rev-port");
  const revContainer = document.getElementById("rev-shells-container");

  function updateRevShells() {
    if (!revContainer) return;
    const ip = revIp ? revIp.value : "10.10.14.5";
    const port = revPort ? revPort.value : "4444";
    const shells = BZTTools.generateShells(ip, port);
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

    revContainer.innerHTML = shells.map(s => `
      <div class="p-3.5 bg-[#0b0f19] border border-gray-800 rounded-xl space-y-1.5">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-white font-mono">${s.name}</span>
          <button class="copy-shell-btn text-[11px] bg-black/60 hover:bg-orange-950/40 border border-gray-800 text-gray-300 hover:text-orange-300 px-2.5 py-1 rounded-lg transition-colors font-mono font-bold" data-shell="${encodeURIComponent(s.code)}">
            ${lang === 'tr' ? 'Kopyala' : 'Copy'}
          </button>
        </div>
        <div class="text-[11px] text-gray-400">${s.desc}</div>
        <pre class="font-mono text-xs text-emerald-400 bg-black/80 p-3 rounded-lg border border-gray-800 overflow-x-auto whitespace-pre-wrap select-all">${escapeHtml(s.code)}</pre>
      </div>
    `).join("");

    revContainer.querySelectorAll(".copy-shell-btn").forEach(b => {
      b.addEventListener("click", () => {
        const code = decodeURIComponent(b.getAttribute("data-shell"));
        navigator.clipboard.writeText(code);
        b.innerText = lang === 'tr' ? "Kopyalandı" : "Copied";
        setTimeout(() => b.innerText = lang === 'tr' ? "Kopyala" : "Copy", 1500);
      });
    });
  }

  if (revIp && revPort) {
    revIp.addEventListener("input", updateRevShells);
    revPort.addEventListener("input", updateRevShells);
    updateRevShells();
  }

  // 8. TOOLS: ENCODER / DECODER
  const encInput = document.getElementById("encoder-input");
  const encOutput = document.getElementById("encoder-output");

  document.querySelectorAll(".encoder-action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-action");
      const val = encInput ? encInput.value : "";
      if (!encOutput) return;

      switch(act) {
        case "b64-encode": encOutput.value = BZTTools.encodeBase64(val); break;
        case "b64-decode": encOutput.value = BZTTools.decodeBase64(val); break;
        case "url-encode": encOutput.value = BZTTools.encodeUrl(val); break;
        case "url-decode": encOutput.value = BZTTools.decodeUrl(val); break;
        case "hex-encode": encOutput.value = BZTTools.encodeHex(val); break;
        case "hex-decode": encOutput.value = BZTTools.decodeHex(val); break;
        case "rot13": encOutput.value = BZTTools.rot13(val); break;
        case "to-bin": encOutput.value = BZTTools.toBinary(val); break;
        case "from-bin": encOutput.value = BZTTools.fromBinary(val); break;
      }
    });
  });

  // 9. TOOLS: HASH IDENTIFIER
  const hashInput = document.getElementById("hash-input");
  const hashBtn = document.getElementById("hash-id-btn");
  const hashResult = document.getElementById("hash-result");

  if (hashBtn && hashInput && hashResult) {
    hashBtn.addEventListener("click", () => {
      const res = BZTTools.identifyHash(hashInput.value);
      const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

      hashResult.innerHTML = `
        <div class="p-3 bg-gray-950 border border-gray-800 rounded-lg text-xs space-y-1 font-mono">
          <div><span class="text-gray-400">${lang === 'tr' ? 'Muhtemel Algoritma:' : 'Detected Algorithm:'}</span> <b class="text-cyan-400 text-sm">${res.type}</b></div>
          <div><span class="text-gray-400">${lang === 'tr' ? 'Doğruluk Güveni:' : 'Confidence Level:'}</span> <span class="text-emerald-400">${res.confidence}</span></div>
          <div><span class="text-gray-400">${lang === 'tr' ? 'Hashcat Önerisi:' : 'Recommended Mode:'}</span> <span class="text-yellow-300">${res.sampleMode}</span></div>
        </div>
      `;
    });
  }

  // 10. CERTIFICATE PREVIEW & DOWNLOAD
  const certNameInput = document.getElementById("cert-student-name");
  const certPreviewImg = document.getElementById("cert-preview-img");
  const certDownloadBtn = document.getElementById("cert-download-btn");

  window.updateCertPreview = function() {
    if (!certPreviewImg) return;
    const name = certNameInput ? certNameInput.value : "Furkan Bozat";
    certPreviewImg.src = BZTCertificate.generate(name);
  };

  if (certNameInput) {
    certNameInput.addEventListener("input", window.updateCertPreview);
  }
  if (certDownloadBtn) {
    certDownloadBtn.addEventListener("click", () => {
      const name = certNameInput ? certNameInput.value : "Furkan Bozat";
      BZTCertificate.download(name);
    });
  }

  // 11. CHEATSHEET INTERACTIVE CLICK-TO-COPY
  document.querySelectorAll("#tab-cheatsheet .select-all").forEach(elem => {
    elem.style.cursor = "pointer";
    elem.setAttribute("title", "Kopyalamak için tıklayın");
    elem.addEventListener("click", () => {
      const text = elem.innerText.trim();
      navigator.clipboard.writeText(text);
      const parent = elem.parentElement;
      let badge = parent.querySelector(".copy-feedback-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "copy-feedback-badge ml-2 text-[10px] text-emerald-400 font-mono font-bold animate-fade-in";
        badge.innerText = "Kopyalandı";
        parent.appendChild(badge);
        setTimeout(() => badge.remove(), 1600);
      }
    });
  });

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

  // Initial Hats & Careers
  if (window.BZTHats) BZTHats.updateHatUI();
  if (window.BZTCareers) BZTCareers.renderDrawer();

  // Initial Curriculum, Stats & i18n Render
  if (window.BZTI18n) {
    BZTI18n.applyTranslations();
  } else {
    renderCurriculum();
    BZTApp.updateUserStats();
  }
});
