/**
 * BZT Cyber Security - Main Application Controller
 * Manages tabs, search, curriculum rendering, quizzes, and tool interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Terminal
  if (document.getElementById("terminal-output")) {
    window.bztTerminalInstance = new BZTerminal("terminal-output", "terminal-input", "terminal-prompt");
  }

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
  const progressBar = document.getElementById("global-progress-bar");
  const progressPercentText = document.getElementById("global-progress-text");

  // 1. TAB NAVIGATION
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      
      tabButtons.forEach(b => b.classList.remove("active", "border-cyan-500", "text-cyan-400", "bg-cyan-950/20"));
      btn.classList.add("active", "border-cyan-500", "text-cyan-400", "bg-cyan-950/20");

      tabPanes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.remove("hidden");
        } else {
          pane.classList.add("hidden");
        }
      });

      // If terminal tab opened, focus input
      if (targetTab === "terminal" && window.bztTerminalInstance) {
        setTimeout(() => {
          document.getElementById("terminal-input")?.focus();
        }, 100);
      }
    });
  });

  // 2. RENDER CURRICULUM
  function renderCurriculum() {
    if (!curriculumGrid) return;
    curriculumGrid.innerHTML = "";

    const filtered = CURRICULUM_DATA.filter(item => {
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
          <div class="text-3xl mb-2">🔍</div>
          <div class="font-bold text-lg text-gray-200">Aramanıza uygun ders veya modül bulunamadı.</div>
          <div class="text-sm">Farklı bir anahtar kelime veya filtre seçmeyi deneyin.</div>
        </div>`;
      return;
    }

    filtered.forEach(item => {
      const isDone = completedLessons.includes(item.id);
      const card = document.createElement("div");
      card.className = "glass-panel p-5 rounded-xl border border-gray-800 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/30 group";
      
      let badgeColor = "bg-emerald-950/80 text-emerald-400 border-emerald-800";
      if (item.difficulty === "Orta") badgeColor = "bg-cyan-950/80 text-cyan-400 border-cyan-800";
      if (item.difficulty === "İleri") badgeColor = "bg-purple-950/80 text-purple-400 border-purple-800";
      if (item.difficulty === "Uzman") badgeColor = "bg-red-950/80 text-red-400 border-red-800";

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded border ${badgeColor}">
              ${item.difficulty}
            </span>
            <span class="text-xs text-gray-400 font-mono flex items-center gap-1">
              ⏱️ ${item.duration}
            </span>
          </div>

          <div class="text-xs font-mono text-cyan-400/90 font-medium mb-1">
            ${item.phaseTitle}
          </div>

          <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
            ${item.title}
          </h3>

          <p class="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">
            ${item.summary}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${item.tags.map(t => `<span class="text-[10px] font-mono bg-gray-900 border border-gray-800 text-gray-300 px-2 py-0.5 rounded">${t}</span>`).join("")}
          </div>

          <div class="pt-3 border-t border-gray-800/80 flex items-center justify-between">
            <button class="open-lesson-btn text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/40 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5" data-id="${item.id}">
              <span>Eğitimi Başlat</span>
              <span>→</span>
            </button>

            <button class="toggle-done-btn text-xs px-2 py-1 rounded transition-colors ${isDone ? 'text-emerald-400 font-bold' : 'text-gray-500 hover:text-gray-300'}" data-id="${item.id}">
              ${isDone ? '✓ Tamamlandı' : '○ Bitir'}
            </button>
          </div>
        </div>
      `;

      curriculumGrid.appendChild(card);
    });

    updateProgress();
    attachCardListeners();
  }

  // 3. ATTACH CARD LISTENERS
  function attachCardListeners() {
    document.querySelectorAll(".open-lesson-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        openLessonModal(id);
      });
    });

    document.querySelectorAll(".toggle-done-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (completedLessons.includes(id)) {
          completedLessons = completedLessons.filter(x => x !== id);
        } else {
          completedLessons.push(id);
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
    const lesson = CURRICULUM_DATA.find(x => x.id === id);
    if (!lesson || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="border-b border-gray-800 pb-4 mb-6">
        <div class="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <span>${lesson.phaseTitle}</span> • <span>${lesson.difficulty} Seviye</span> • <span>${lesson.duration}</span>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">${lesson.title}</h2>
        <p class="text-sm text-gray-400 leading-relaxed">${lesson.summary}</p>
      </div>

      <div class="space-y-8">
        ${lesson.sections.map((sec, idx) => `
          <div class="space-y-3">
            <h4 class="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              ${sec.heading}
            </h4>
            <div class="text-sm text-gray-300 leading-relaxed whitespace-pre-line">${sec.content}</div>

            ${sec.codeSnippet ? `
              <div class="code-block p-4 my-3 font-mono text-xs text-emerald-400 overflow-x-auto rounded-lg border border-gray-800">
                <div class="flex justify-between items-center text-gray-500 pb-2 mb-2 border-b border-gray-800/60 text-[11px]">
                  <span>KOD ÖRNEĞİ / EXPLOIT</span>
                  <button class="copy-code-btn hover:text-cyan-400 transition-colors" data-code="${encodeURIComponent(sec.codeSnippet)}">📋 Kopyala</button>
                </div>
                <pre>${escapeHtml(sec.codeSnippet)}</pre>
              </div>
            ` : ""}

            ${sec.tip ? `
              <div class="p-3 bg-cyan-950/40 border-l-4 border-cyan-500 rounded-r-lg text-xs text-cyan-200">
                <b>💡 Hacker Notu & İpucu:</b> ${sec.tip}
              </div>
            ` : ""}

            ${sec.terminalCommand ? `
              <div class="flex items-center justify-between p-2.5 bg-black/60 border border-gray-800 rounded-lg text-xs font-mono">
                <span class="text-gray-400">$ <span class="text-yellow-300">${sec.terminalCommand}</span></span>
                <button class="run-in-term-btn bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-black px-2 py-1 rounded transition-colors text-[11px]" data-cmd="${sec.terminalCommand}">
                  BZT-Shell'de Çalıştır ⚡
                </button>
              </div>
            ` : ""}
          </div>
        `).join("")}

        <!-- Mini Quiz Section -->
        ${lesson.quiz ? `
          <div class="mt-8 p-5 bg-gray-900/90 border border-gray-800 rounded-xl space-y-4">
            <div class="text-sm font-bold text-yellow-400 flex items-center gap-2">
              <span>🧠</span> Modül Pekiştirme Sorusu
            </div>
            <div class="text-sm font-medium text-gray-200">${lesson.quiz.question}</div>
            <div class="space-y-2">
              ${lesson.quiz.options.map((opt, oIdx) => `
                <button class="quiz-opt-btn w-full text-left p-3 rounded-lg border border-gray-800 hover:border-cyan-500/50 bg-black/40 hover:bg-cyan-950/20 text-xs text-gray-300 transition-all" data-qidx="${oIdx}" data-correct="${lesson.quiz.correct}">
                  ${String.fromCharCode(65 + oIdx)}) ${opt}
                </button>
              `).join("")}
            </div>
            <div id="quiz-feedback" class="hidden text-xs p-3 rounded-lg"></div>
          </div>
        ` : ""}
      </div>
    `;

    // Copy code button listeners
    modalContent.querySelectorAll(".copy-code-btn").forEach(b => {
      b.addEventListener("click", () => {
        const code = decodeURIComponent(b.getAttribute("data-code"));
        navigator.clipboard.writeText(code);
        b.innerText = "✓ Kopyalandı!";
        setTimeout(() => b.innerText = "📋 Kopyala", 1500);
      });
    });

    // Run in terminal button
    modalContent.querySelectorAll(".run-in-term-btn").forEach(b => {
      b.addEventListener("click", () => {
        const cmd = b.getAttribute("data-cmd");
        modal.classList.add("hidden");
        // Switch to terminal tab
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

    // Quiz options listener
    modalContent.querySelectorAll(".quiz-opt-btn").forEach(b => {
      b.addEventListener("click", () => {
        const selected = parseInt(b.getAttribute("data-qidx"));
        const correct = parseInt(b.getAttribute("data-correct"));
        const feedback = document.getElementById("quiz-feedback");
        if (!feedback) return;

        feedback.classList.remove("hidden", "bg-emerald-950/70", "border-emerald-500", "text-emerald-300", "bg-red-950/70", "border-red-500", "text-red-300");

        if (selected === correct) {
          feedback.classList.add("bg-emerald-950/70", "border", "border-emerald-500", "text-emerald-300");
          feedback.innerHTML = `<b>🎉 Doğru Cevap!</b> ${lesson.quiz.explanation}`;
        } else {
          feedback.classList.add("bg-red-950/70", "border", "border-red-500", "text-red-300");
          feedback.innerHTML = `<b>❌ Yanlış Seçenek.</b> Doğru cevap: <b>${String.fromCharCode(65 + correct)}</b>. Açıklama: ${lesson.quiz.explanation}`;
        }
      });
    });

    modal.classList.remove("hidden");
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  // 5. UPDATE PROGRESS
  function updateProgress() {
    const total = CURRICULUM_DATA.length;
    const done = completedLessons.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressPercentText) progressPercentText.innerText = `%${pct}`;
  }

  // 6. PHASE FILTER & SEARCH
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

  // 7. LABS INTERACTION
  // SQLi Lab
  const sqliInput = document.getElementById("sqli-payload-input");
  const sqliBtn = document.getElementById("sqli-run-btn");
  const sqliQuickChips = document.querySelectorAll(".sqli-chip");

  if (sqliBtn && sqliInput) {
    sqliBtn.addEventListener("click", () => {
      BZTLabs.runSqlLab(sqliInput.value);
    });
    sqliInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") BZTLabs.runSqlLab(sqliInput.value);
    });
  }

  sqliQuickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      if (sqliInput) {
        sqliInput.value = chip.getAttribute("data-payload");
        BZTLabs.runSqlLab(sqliInput.value);
      }
    });
  });

  // XSS Lab
  const xssInput = document.getElementById("xss-payload-input");
  const xssFilter = document.getElementById("xss-filter-select");
  const xssBtn = document.getElementById("xss-run-btn");
  const xssQuickChips = document.querySelectorAll(".xss-chip");

  if (xssBtn && xssInput && xssFilter) {
    xssBtn.addEventListener("click", () => {
      BZTLabs.runXssLab(xssInput.value, xssFilter.value);
    });
    xssInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") BZTLabs.runXssLab(xssInput.value, xssFilter.value);
    });
  }

  xssQuickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      if (xssInput) {
        xssInput.value = chip.getAttribute("data-payload");
        BZTLabs.runXssLab(xssInput.value, xssFilter ? xssFilter.value : "no-filter");
      }
    });
  });

  // Command Injection Lab
  const cmdInput = document.getElementById("cmd-input");
  const cmdBtn = document.getElementById("cmd-run-btn");
  const cmdChips = document.querySelectorAll(".cmd-chip");

  if (cmdBtn && cmdInput) {
    cmdBtn.addEventListener("click", () => {
      BZTLabs.runCmdLab(cmdInput.value);
    });
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") BZTLabs.runCmdLab(cmdInput.value);
    });
  }

  cmdChips.forEach(chip => {
    chip.addEventListener("click", () => {
      if (cmdInput) {
        cmdInput.value = chip.getAttribute("data-payload");
        BZTLabs.runCmdLab(cmdInput.value);
      }
    });
  });

  // 8. TOOLS: REVERSE SHELL GENERATOR
  const revIp = document.getElementById("rev-ip");
  const revPort = document.getElementById("rev-port");
  const revContainer = document.getElementById("rev-shells-container");

  function updateRevShells() {
    if (!revContainer) return;
    const ip = revIp ? revIp.value : "10.10.14.5";
    const port = revPort ? revPort.value : "4444";
    const shells = BZTTools.generateShells(ip, port);

    revContainer.innerHTML = shells.map(s => `
      <div class="p-3 bg-gray-950 border border-gray-800 rounded-lg space-y-1">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-cyan-400">${s.name}</span>
          <button class="copy-shell-btn text-[11px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-0.5 rounded transition-colors" data-shell="${encodeURIComponent(s.code)}">
            📋 Kopyala
          </button>
        </div>
        <div class="text-[11px] text-gray-400">${s.desc}</div>
        <pre class="font-mono text-xs text-emerald-400 bg-black/60 p-2 rounded overflow-x-auto whitespace-pre-wrap select-all">${escapeHtml(s.code)}</pre>
      </div>
    `).join("");

    revContainer.querySelectorAll(".copy-shell-btn").forEach(b => {
      b.addEventListener("click", () => {
        const code = decodeURIComponent(b.getAttribute("data-shell"));
        navigator.clipboard.writeText(code);
        b.innerText = "✓ Kopyalandı!";
        setTimeout(() => b.innerText = "📋 Kopyala", 1500);
      });
    });
  }

  if (revIp && revPort) {
    revIp.addEventListener("input", updateRevShells);
    revPort.addEventListener("input", updateRevShells);
    updateRevShells();
  }

  // 9. TOOLS: ENCODER / DECODER
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
      }
    });
  });

  // 10. TOOLS: HASH IDENTIFIER
  const hashInput = document.getElementById("hash-input");
  const hashBtn = document.getElementById("hash-id-btn");
  const hashResult = document.getElementById("hash-result");

  if (hashBtn && hashInput && hashResult) {
    hashBtn.addEventListener("click", () => {
      const res = BZTTools.identifyHash(hashInput.value);
      hashResult.innerHTML = `
        <div class="p-3 bg-gray-950 border border-gray-800 rounded-lg text-xs space-y-1 font-mono">
          <div><span class="text-gray-400">Muhtemel Tür:</span> <b class="text-cyan-400 text-sm">${res.type}</b></div>
          <div><span class="text-gray-400">Doğruluk Güveni:</span> <span class="text-emerald-400">${res.confidence}</span></div>
          <div><span class="text-gray-400">Örnek Kırma Komutu:</span> <span class="text-yellow-300">${res.sampleMode}</span></div>
        </div>
      `;
    });
  }

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

  // Initial Curriculum Render
  renderCurriculum();
});
