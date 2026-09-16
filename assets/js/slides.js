/**
 * BZT Cyber Security - Interactive Slide Deck Presentation Mode (v4.0 PRO)
 * Fullscreen visual slide presenter for curriculum modules
 * Deep black cyber theme with Kodluyoruz orange accents and zero emojis
 */

const BZTSlides = {
  currentLesson: null,
  currentSlideIndex: 0,
  slides: [],
  wasLessonModalOpen: false,

  init() {
    window.addEventListener("keydown", (e) => {
      const modal = document.getElementById("slides-modal");
      if (!modal || modal.classList.contains("hidden")) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        BZTSlides.nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        BZTSlides.prevSlide();
      } else if (e.key === "Escape") {
        BZTSlides.close();
      }
    });
  },

  formatContent(text) {
    if (!text) return "";
    const lines = text.split("\n");
    return lines.map(line => {
      let l = line.trim();
      if (!l) return '<div class="h-2"></div>';

      // Bold text: **text** -> strong
      l = l.replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-semibold">$1</b>');

      // Inline code: `code` -> code badge
      l = l.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-black/80 border border-gray-800 text-orange-300 font-mono text-xs">$1</code>');

      // Bullet items: - or *
      if (l.startsWith("- ") || l.startsWith("* ")) {
        const rest = l.substring(2);
        return `<div class="flex items-start gap-2.5 my-1.5 text-gray-300 text-xs sm:text-sm md:text-base"><span class="text-[#f37021] font-mono mt-0.5 text-sm shrink-0 font-bold">›</span><span class="leading-relaxed">${rest}</span></div>`;
      }

      // Numbered items: 1. 2.
      const numMatch = l.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        const num = numMatch[1];
        const rest = numMatch[2];
        return `<div class="flex items-start gap-3 my-2 text-gray-200 text-xs sm:text-sm md:text-base"><span class="shrink-0 w-5 h-5 rounded-full bg-orange-950/70 border border-orange-500/40 text-[#f37021] text-[11px] font-mono font-bold flex items-center justify-center mt-0.5">${num}</span><span class="leading-relaxed">${rest}</span></div>`;
      }

      return `<p class="leading-relaxed text-gray-300 text-xs sm:text-sm md:text-base my-1">${l}</p>`;
    }).join("");
  },

  start(lessonId) {
    const raw = CURRICULUM_DATA.find(x => x.id === lessonId);
    if (!raw) return;

    const getLessonFunc = window.getLessonData || (typeof getLessonData === "function" ? getLessonData : null);
    const lesson = getLessonFunc ? getLessonFunc(raw) : raw;
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

    this.currentLesson = lesson;
    this.currentSlideIndex = 0;

    // Hide lesson modal so underlying content never bleeds through
    const lessonModal = document.getElementById("lesson-modal");
    if (lessonModal && !lessonModal.classList.contains("hidden")) {
      this.wasLessonModalOpen = true;
      lessonModal.classList.add("hidden");
    } else {
      this.wasLessonModalOpen = false;
    }

    // Build slides array
    this.slides = [
      // Slide 1: Intro Slide
      {
        type: "intro",
        title: lesson.title,
        phase: lesson.phaseTitle,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        xp: lesson.xp,
        summary: lesson.summary,
        tags: lesson.tags || []
      }
    ];

    // Slides 2 to N: Section slides
    (lesson.sections || []).forEach((sec, idx) => {
      this.slides.push({
        type: "section",
        index: idx + 1,
        totalSections: (lesson.sections || []).length,
        heading: sec.heading,
        content: sec.content,
        code: sec.codeSnippet,
        tip: sec.tip,
        command: sec.terminalCommand
      });
    });

    // Final Slide: Quiz checkpoint
    if (lesson.quiz) {
      this.slides.push({
        type: "quiz",
        question: lesson.quiz.question,
        options: lesson.quiz.options,
        correct: lesson.quiz.correct,
        explanation: lesson.quiz.explanation
      });
    }

    const modal = document.getElementById("slides-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      this.renderSlide();
    }
  },

  renderSlide() {
    const container = document.getElementById("slides-content");
    const indicator = document.getElementById("slides-indicator");
    const progressBar = document.getElementById("slides-progress-bar");
    if (!container) return;

    const slide = this.slides[this.currentSlideIndex];
    const total = this.slides.length;
    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";

    if (indicator) indicator.innerText = `${lang === 'tr' ? 'Slayt' : 'Slide'} ${this.currentSlideIndex + 1} / ${total}`;
    if (progressBar) progressBar.style.width = `${((this.currentSlideIndex + 1) / total) * 100}%`;

    if (slide.type === "intro") {
      container.innerHTML = `
        <div class="max-w-4xl w-full mx-auto space-y-6 animate-fade-in p-6 sm:p-10 bg-[#0b0f19] border border-gray-800 rounded-2xl shadow-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-400 text-xs font-mono">
            <span class="w-2 h-2 rounded-full bg-[#f37021] animate-pulse"></span>
            <span>${slide.phase}</span> • <span>${slide.difficulty}</span> • <span>${slide.duration}</span> • <span class="text-yellow-400 font-bold">+${slide.xp} XP</span>
          </div>

          <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            ${slide.title}
          </h1>

          <div class="p-5 bg-[#030712] rounded-xl border border-gray-800 text-sm sm:text-base text-gray-300 leading-relaxed">
            ${slide.summary}
          </div>

          <div class="space-y-2">
            <div class="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider">
              ${lang === 'tr' ? 'KAZANIMLAR & TEKNOLOJİLER:' : 'KEY COMPETENCIES & TAGS:'}
            </div>
            <div class="flex flex-wrap gap-2">
              ${slide.tags.map(t => `<span class="px-2.5 py-1 bg-black border border-gray-800 rounded text-xs font-mono text-orange-300">${t}</span>`).join("")}
            </div>
          </div>

          <div class="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button onclick="BZTSlides.nextSlide()" class="w-full sm:w-auto px-8 py-3.5 bg-[#f37021] hover:bg-[#e05d0e] text-white font-extrabold font-mono rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer">
              <span>${lang === 'tr' ? 'Sunuma Başla →' : 'Start Presentation →'}</span>
            </button>
            <span class="text-xs font-mono text-gray-400">
              ${lang === 'tr' ? 'Klavye: [Boşluk] veya [Sağ Ok] ile ilerleyin' : 'Keyboard: Press [Space] or [Right Arrow]'}
            </span>
          </div>
        </div>
      `;
    } else if (slide.type === "section") {
      container.innerHTML = `
        <div class="max-w-5xl w-full mx-auto space-y-5 animate-fade-in p-5 sm:p-8 bg-[#0b0f19] border border-gray-800 rounded-2xl shadow-2xl">
          <!-- Top Header -->
          <div class="border-b border-gray-800 pb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-[#f37021] font-bold bg-orange-950/60 px-2.5 py-1 rounded border border-orange-500/40">
                ${lang === 'tr' ? `BÖLÜM ${slide.index} / ${slide.totalSections}` : `SECTION ${slide.index} / ${slide.totalSections}`}
              </span>
              <span class="text-xs font-mono text-gray-400 hidden sm:inline">${this.currentLesson ? this.currentLesson.phaseTitle : ''}</span>
            </div>
            <span class="text-xs font-mono text-gray-400 font-semibold">${this.currentLesson ? this.currentLesson.title : ''}</span>
          </div>

          <!-- Section Heading -->
          <h2 class="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-snug flex items-center gap-2.5">
            <span class="w-3 h-3 rounded-full bg-[#f37021] shrink-0"></span>
            ${slide.heading}
          </h2>

          <!-- Formatted Content Body -->
          <div class="bg-[#030712] p-5 sm:p-6 rounded-xl border border-gray-800/80 space-y-2">
            ${this.formatContent(slide.content)}
          </div>

          <!-- Code Snippet -->
          ${slide.code ? `
            <div class="code-block p-4 font-mono text-xs rounded-xl border border-gray-800 overflow-x-auto shadow-xl bg-[#030712]">
              <div class="text-[11px] text-gray-400 mb-2 border-b border-gray-800 pb-2 font-bold flex justify-between items-center">
                <span class="text-orange-400 font-mono">[KOD / EXPLOIT KOMUTU]</span>
                <button class="slide-copy-btn px-2.5 py-1 rounded bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors cursor-pointer" data-code="${encodeURIComponent(slide.code)}">
                  ${lang === 'tr' ? 'Kopyala' : 'Copy'}
                </button>
              </div>
              <pre class="text-emerald-400 select-all font-mono leading-relaxed">${this.escapeHtml(slide.code)}</pre>
            </div>
          ` : ""}

          <!-- Tip Box -->
          ${slide.tip ? `
            <div class="p-4 bg-orange-950/40 border-l-4 border-[#f37021] rounded-r-xl text-xs sm:text-sm text-orange-200">
              <b class="text-[#f37021]">${lang === 'tr' ? '[!] Hacker Notu & İpucu:' : '[!] Pro Hacker Tip:'}</b> ${slide.tip}
            </div>
          ` : ""}

          <!-- Terminal Execution Button (if present) -->
          ${slide.command ? `
            <div class="flex items-center justify-between p-3.5 bg-black/80 border border-gray-800 rounded-xl text-xs font-mono text-gray-300">
              <span class="text-gray-400">$ <span class="text-yellow-300">${slide.command}</span></span>
              <button onclick="BZTSlides.runInTerminal('${slide.command}')" class="bg-[#f37021] hover:bg-[#e05d0e] text-white px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 cursor-pointer">
                <span>[>] ${lang === 'tr' ? "BZT-Shell'de Çalıştır" : 'Run in BZT-Shell'}</span>
              </button>
            </div>
          ` : ""}
        </div>
      `;

      // Attach copy listeners
      container.querySelectorAll(".slide-copy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const code = decodeURIComponent(btn.getAttribute("data-code"));
          navigator.clipboard.writeText(code);
          btn.innerText = lang === 'tr' ? "Kopyalandı!" : "Copied!";
          setTimeout(() => btn.innerText = lang === 'tr' ? "Kopyala" : "Copy", 1500);
        });
      });

    } else if (slide.type === "quiz") {
      container.innerHTML = `
        <div class="max-w-3xl w-full mx-auto space-y-6 animate-fade-in p-6 sm:p-8 bg-[#0b0f19] border border-orange-500/40 rounded-2xl shadow-2xl">
          <div class="text-center space-y-1">
            <span class="text-xs font-mono font-bold text-[#f37021] bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/30">
              ${lang === 'tr' ? '[BÖLÜM PEKİŞTİRME TESTİ]' : '[MODULE KNOWLEDGE CHECK]'}
            </span>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-3">
              ${lang === 'tr' ? 'Modül Bilgi Sınavı' : 'Knowledge Checkpoint'}
            </h2>
            <p class="text-xs text-orange-400 font-mono">+50 XP</p>
          </div>

          <div class="bg-[#030712] p-6 rounded-2xl border border-gray-800 space-y-4">
            <div class="text-sm sm:text-base font-semibold text-white leading-relaxed">
              ${slide.question}
            </div>
            <div class="space-y-2.5">
              ${slide.options.map((opt, idx) => `
                <button onclick="BZTSlides.checkQuiz(${idx}, ${slide.correct})" class="slide-quiz-opt w-full text-left p-3.5 rounded-xl border border-gray-800 hover:border-[#f37021] bg-[#0b0f19] hover:bg-orange-950/20 text-xs sm:text-sm text-gray-200 transition-all font-mono cursor-pointer">
                  <span class="text-[#f37021] font-bold mr-1.5">${String.fromCharCode(65 + idx)})</span> ${opt}
                </button>
              `).join("")}
            </div>
            <div id="slide-quiz-feedback" class="hidden p-4 rounded-xl text-xs sm:text-sm font-mono leading-relaxed"></div>
          </div>
        </div>
      `;
    }
  },

  checkQuiz(selected, correct) {
    const feedback = document.getElementById("slide-quiz-feedback");
    if (!feedback) return;

    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const slide = this.slides[this.currentSlideIndex];

    feedback.classList.remove("hidden", "bg-emerald-950/70", "border-emerald-500", "text-emerald-300", "bg-red-950/70", "border-red-500", "text-red-300");

    if (selected === correct) {
      feedback.classList.add("bg-emerald-950/70", "border", "border-emerald-500", "text-emerald-300");
      feedback.innerHTML = `<b>[+] ${lang === 'tr' ? 'Doğru!' : 'Correct!'} (+50 XP)</b><br><span class="text-gray-300 mt-1 block">${slide.explanation}</span>`;
      if (window.BZTApp && typeof window.BZTApp.addXp === "function") {
        window.BZTApp.addXp(50);
      }
    } else {
      feedback.classList.add("bg-red-950/70", "border", "border-red-500", "text-red-300");
      feedback.innerHTML = `<b>[-] ${lang === 'tr' ? 'Yanlış Seçenek.' : 'Incorrect.'}</b> ${lang === 'tr' ? 'Doğru cevap:' : 'Correct:'} <b>${String.fromCharCode(65 + correct)}</b><br><span class="text-gray-300 mt-1 block">${slide.explanation}</span>`;
    }
  },

  runInTerminal(cmd) {
    this.close();
    const termTabBtn = document.querySelector('.nav-tab[data-tab="terminal"]');
    if (termTabBtn) termTabBtn.click();
    setTimeout(() => {
      const input = document.getElementById("terminal-input");
      if (input) {
        input.value = cmd;
        input.focus();
      }
    }, 200);
  },

  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
      this.renderSlide();
    }
  },

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.renderSlide();
    }
  },

  close() {
    const modal = document.getElementById("slides-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");

    // Cleanly restore lesson modal if opened from it
    if (this.wasLessonModalOpen) {
      const lessonModal = document.getElementById("lesson-modal");
      if (lessonModal) lessonModal.classList.remove("hidden");
      this.wasLessonModalOpen = false;
    }
  },

  escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
};

BZTSlides.init();
window.BZTSlides = BZTSlides;
