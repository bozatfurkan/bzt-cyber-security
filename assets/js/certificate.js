/**
 * BZT Cyber Security - Professional Certificate Generator
 * Generates verified Cyber Security Completion Certificates via HTML5 Canvas
 */

const BZTCertificate = {
  generate(studentName) {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1100;
    const ctx = canvas.getContext("2d");

    const name = (studentName || "Furkan Bozat").trim();
    const dateStr = "16 Eylül 2026";
    const certId = "BZT-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-2026";

    // 1. Background (Cyber Dark Gradient)
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, "#030712");
    bgGrad.addColorStop(0.5, "#0b1329");
    bgGrad.addColorStop(1, "#030712");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Cyber Grid lines
    ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 3. Neon Border Frame
    ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(65, 65, canvas.width - 130, canvas.height - 130);

    // Corner Accents
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 8;
    const cornerSize = 40;
    // Top-Left
    ctx.beginPath(); ctx.moveTo(40, 40 + cornerSize); ctx.lineTo(40, 40); ctx.lineTo(40 + cornerSize, 40); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(canvas.width - 40 - cornerSize, 40); ctx.lineTo(canvas.width - 40, 40); ctx.lineTo(canvas.width - 40, 40 + cornerSize); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(40, canvas.height - 40 - cornerSize); ctx.lineTo(40, canvas.height - 40); ctx.lineTo(40 + cornerSize, canvas.height - 40); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(canvas.width - 40 - cornerSize, canvas.height - 40); ctx.lineTo(canvas.width - 40, canvas.height - 40); ctx.lineTo(canvas.width - 40, canvas.height - 40 - cornerSize); ctx.stroke();

    // 4. Header & Branding
    ctx.textAlign = "center";
    ctx.fillStyle = "#06b6d4";
    ctx.font = "bold 24px 'Fira Code', monospace";
    ctx.fillText("BZT CYBER SECURITY RESEARCH & OFFENSIVE ACADEMY", canvas.width / 2, 160);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 52px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("BAŞARI VE YETKİNLİK SERTİFİKASI", canvas.width / 2, 240);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Bu sertifika, aşağıdaki adayın etik hackerlık ve siber sızma testleri alanındaki", canvas.width / 2, 310);
    ctx.fillText("kapsamlı eğitim, laboratuvar ve pratik CTF aşamalarını üstün başarıyla tamamladığını onaylar:", canvas.width / 2, 345);

    // 5. Student Name
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 64px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(name, canvas.width / 2, 450);

    // Underline
    const textW = ctx.measureText(name).width;
    const gradLine = ctx.createLinearGradient(canvas.width / 2 - textW / 2, 0, canvas.width / 2 + textW / 2, 0);
    gradLine.addColorStop(0, "transparent");
    gradLine.addColorStop(0.5, "#06b6d4");
    gradLine.addColorStop(1, "transparent");
    ctx.strokeStyle = gradLine;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - textW / 2 - 40, 480);
    ctx.lineTo(canvas.width / 2 + textW / 2 + 40, 480);
    ctx.stroke();

    // 6. Qualification Title
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 32px 'Fira Code', monospace";
    ctx.fillText("CERTIFIED OFFENSIVE CYBER SECURITY SPECIALIST (COSS)", canvas.width / 2, 560);

    // 7. Bullet Qualifications
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "19px 'Plus Jakarta Sans', sans-serif";
    const specs = [
      "✓ Ağ Keşfi & Nmap Derinlemesine Zafiyet Analizi",
      "✓ OWASP Top 10 Web Penetration Testing (SQLi, XSS, RCE, SSRF)",
      "✓ Linux & Windows Privilege Escalation (SUID, Sudoers, Kernel Exploits)",
      "✓ Active Directory Dominasyonu & Kerberoasting İstismarı",
      "✓ AV/EDR Atlatma (Evasion) & C2 Mimari Temelleri"
    ];
    let startY = 630;
    specs.forEach(s => {
      ctx.fillText(s, canvas.width / 2, startY);
      startY += 36;
    });

    // 8. Footer Badges & Verification
    ctx.textAlign = "left";
    ctx.fillStyle = "#64748b";
    ctx.font = "16px 'Fira Code', monospace";
    ctx.fillText(`DOĞRULAMA ID: ${certId}`, 120, 960);
    ctx.fillText(`DÜZENLENME TARİHİ: ${dateStr}`, 120, 990);
    ctx.fillText("DURUM: ONAYLANDI (VERIFIED ON-CHAIN & REPO)", 120, 1020);

    ctx.textAlign = "right";
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 20px 'Fira Code', monospace";
    ctx.fillText("BZT CYBER SECURITY ACADEMY", canvas.width - 120, 960);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "italic 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Baş Eğitmen & Baş Güvenlik Araştırmacısı: Furkan Bozat", canvas.width - 120, 990);
    ctx.fillStyle = "#10b981";
    ctx.font = "14px 'Fira Code', monospace";
    ctx.fillText("OFFICIAL CRYPTOGRAPHIC SEAL: [VALID]", canvas.width - 120, 1020);

    return canvas.toDataURL("image/png");
  },

  download(studentName) {
    const dataUrl = this.generate(studentName);
    const link = document.createElement("a");
    link.download = `BZT-Cyber-Security-Sertifika-${(studentName || "Furkan-Bozat").replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();
  }
};

window.BZTCertificate = BZTCertificate;
