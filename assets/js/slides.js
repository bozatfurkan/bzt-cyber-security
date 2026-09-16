/**
 * BZT Cyber Security - Interactive Slide Deck Presentation Mode
 * Fullscreen visual slide presenter for curriculum modules
 * Fixed layering, solid non-transparent background and clean transitions
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

  start(lessonId) {
    const raw = CURRICULUM_DATA.find(x => x.id === lessonId);
    if (!raw) return;

    const lang = (window.BZTI18n && window.BZTI18n.currentLang) || "tr";
    const lesson = (typeof getLessonData === "function") ? getLessonData(raw) : raw;

    this.currentLesson = lesson;
    this.currentSlideIndex = 0;

    // IMPORTANT: Hide lesson modal so underlying content NEVER bleeds through
    const lessonModal = document.getElementById("lesson-modal");
    if (lessonModal && !lessonModal.classList.contains("hidden")) {
      this.wasLessonModalOpen = true;
      lessonModal.classList.add("hidden");
    } else {
      this.wasLessonModalOpen = false;
    }

    // Build slides array
    this.slides = [
      // Title Slide
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

    // Section slides
    (lesson.sections || []).forEach((sec, idx) => {
      this.slides.push({
        type: "section",
        index: idx + 1,
        heading: sec.heading,
        content: sec.content,
        code: sec.codeSnippet,
        tip: sec.tip,
        command: sec.terminalCommand
      });
    });

    // Quiz slide (if available)
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

    if (indicator) indicator.innerText = `${this.currentSlideIndex + 1} / ${total}`;
    if (progressBar) progressBar.style.width = `${((this.currentSlideIndex + 1) / total) * 100}%`;

    if (slide.type === "intro") {
      container.innerHTML = `
        <div class="max-w-3xl mx-auto text-center space-y-6 animate-fade-in py-8 px-4 bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl shadow-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-400 text-xs font-mono">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>${slide.phase}</span> • <span>${slide.difficulty}</span> • <span>${slide.duration}</span> • <span class="text-yellow-400 font-bold">+${slide.xp} XP</span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            ${slide.title}
          </h1>

          <p class="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            ${slide.summary}
          </p>

          <div class="flex flex-wrap justify-center gap-2 pt-2">
            ${slide.tags.map(t => `<span class="px-2.5 py-1 bg-cyber-900 border border-gray-800 rounded text-xs font-mono text-cyan-300">${t}</span>`).join("")}
          </div>

          <div class="pt-6">
            <button onclick="BZTSlides.nextSlide()" class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-extrabold font-mono rounded-xl shadow-lg shadow-cyan-950/60 transition-all text-sm">
              ${lang === 'tr' ? 'Sunuma Başla →' : 'Start Presentation →'}
            </button>
          </div>
        </div>
      `;
    } else if (slide.type === "section") {
      container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-5 animate-fade-in py-4 px-6 bg-[#0a0f1d] border border-gray-800 rounded-2xl shadow-2xl">
          <div class="border-b border-gray-800 pb-3 flex items-center justify-between">
            <span class="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">SLIDE ${slide.index}</span>
            <span class="text-xs font-mono text-gray-400">${this.currentLesson ? this.currentLesson.title : ''}</span>
          </div>

          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1">${slide.heading}</h2>

          <div class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed whitespace-pre-line bg-[#030712] p-5 rounded-xl border border-gray-800">
            ${slide.content}
          </div>

          ${slide.code ? `
            <div class="code-block p-4 font-mono text-xs text-emerald-400 rounded-xl border border-gray-800 overflow-x-auto shadow-2xl bg-[#030712]">
              <div class="text-[11px] text-gray-400 mb-2 border-b border-gray-800 pb-1 font-bold flex justify-between items-center">
                <span>CODE / EXPLOIT COMMAND:</span>
                <span class="text-gray-500">Terminal Ready</span>
              </div>
              <pre class="select-all font-mono">${this.escapeHtml(slide.code)}</pre>
            </div>
          ` : ""}

          ${slide.tip ? `
            <div class="p-4 bg-cyan-950/70 border-l-4 border-cyan-400 rounded-r-xl text-xs sm:text-sm text-cyan-100">
              <b>${lang === 'tr' ? 'Hacker Notu:' : 'Pro Hacker Tip:'}</b> ${slide.tip}
            </div>
          ` : ""}
        </div>
      `;
    } else if (slide.type === "quiz") {
      container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-6 animate-fade-in py-6 px-6 bg-[#0a0f1d] border border-yellow-500/30 rounded-2xl shadow-2xl">
          <div class="text-center">
            <span class="text-xs font-mono font-bold text-cyan-400">[KONTROL TESTİ]</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-yellow-400 mt-2">
              ${lang === 'tr' ? 'Bölüm Bilgi Sınavı' : 'Knowledge Checkpoint'}
            </h2>
            <p class="text-xs text-gray-400 font-mono mt-1">+50 XP</p>
          </div>

          <div class="bg-[#030712] p-6 rounded-2xl border border-gray-800 space-y-4">
            <div class="text-sm sm:text-base font-semibold text-white">${slide.question}</div>
            <div class="space-y-2.5">
              ${slide.options.map((opt, idx) => `
                <button onclick="BZTSlides.checkQuiz(${idx}, ${slide.correct})" class="slide-quiz-opt w-full text-left p-3.5 rounded-xl border border-gray-800 hover:border-cyan-500 bg-cyber-900 hover:bg-cyan-950/40 text-xs sm:text-sm text-gray-200 transition-all font-mono">
                  <span class="text-cyan-400 font-bold">${String.fromCharCode(65 + idx)})</span> ${opt}
                </button>
              `).join("")}
            </div>
            <div id="slide-quiz-feedback" class="hidden p-3 rounded-xl text-xs font-mono"></div>
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

    feedback.classList.remove("hidden", "bg-emerald-950", "border-emerald-500", "text-emerald-300", "bg-red-950", "border-red-500", "text-red-300");

    if (selected === correct) {
      feedback.classList.add("bg-emerald-950", "border", "border-emerald-500", "text-emerald-300");
      feedback.innerHTML = `<b>[+] ${lang === 'tr' ? 'Doğru!' : 'Correct!'} (+50 XP)</b> ${slide.explanation}`;
      if (window.BZTApp) window.BZTApp.addXp(50);
    } else {
      feedback.classList.add("bg-red-950", "border", "border-red-500", "text-red-300");
      feedback.innerHTML = `<b>[-] ${lang === 'tr' ? 'Yanlış.' : 'Incorrect.'}</b> ${lang === 'tr' ? 'Doğru cevap:' : 'Correct:'} <b>${String.fromCharCode(65 + correct)}</b>. ${slide.explanation}`;
    }
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
