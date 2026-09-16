# 🛡️ BZT Cyber Security - Sıfırdan İleri Seviyeye Etik Hacker Akademisi & Laboratuvarı

<div align="center">
  <h3>⚡ Zero-to-Hero Interactive Cyber Security Academy & Penetration Testing Suite ⚡</h3>
  <p><strong>Kapsamlı Ağ Protokolleri, Web Zafiyetleri (OWASP Top 10), Sistem Sızma Testleri, Active Directory Dominasyonu, EDR/AV Atlatma ve Canlı BZT-Shell Kali Simülatörü</strong></p>

  [![Platform: GitHub Pages](https://img.shields.io/badge/Platform-GitHub_Pages-2563eb?style=for-the-badge&logo=githubpages&logoColor=white)](https://bozatfurkan.github.io/bzt-cyber-security/)
  [![Security: Offensive & Defensive](https://img.shields.io/badge/Focus-Cybersecurity_&_Red_Team-red.svg?style=for-the-badge)](https://github.com/bozatfurkan/bzt-cyber-security)
  [![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)
  [![UI: Tailwind CSS Dark](https://img.shields.io/badge/UI-Cyber_Dark_&_Neon-0f172a?style=for-the-badge)](https://bozatfurkan.github.io/bzt-cyber-security/)
  [![Status: Production Ready](https://img.shields.io/badge/Status-Live_v3.0_PRO-cyan?style=for-the-badge)](#)

  <br><br>
  <strong>🌐 Canlı Web Uygulaması & Akademi:</strong><br>
  <a href="https://bozatfurkan.github.io/bzt-cyber-security/">https://bozatfurkan.github.io/bzt-cyber-security/</a>
</div>

---

## 📑 İçindekiler

- [Proje Genel Bakış](#-proje-genel-bakış)
- [Öne Çıkan Yetenekler & Modüller](#-öne-çıkan-yetenekler--modüller)
- [7 Aşamalı Hacker Eğitim Müfredatı](#-7-aşamalı-hacker-eğitim-müfredatı)
- [İnteraktif Laboratuvarlar (Labs)](#-i̇nteraktif-laboratuvarlar-labs)
- [BZT-Shell Kali Terminal Simülatörü](#-bzt-shell-kali-terminal-simülatörü)
- [Hacker Araç Çantası (Arsenal)](#-hacker-araç-çantası-arsenal)
- [Yerel Kurulum & Çalıştırma](#-yerel-kurulum--çalıştırma)
- [GitHub Pages Dağıtımı](#-github-pages-dağıtımı)
- [Yasal & Etik Uyarı](#-yasal--etik-uyarı)

---

## 🎯 Proje Genel Bakış

**BZT Cyber Security**, siber güvenliğe yeni başlayanlardan ileri düzey sızma testi uzmanlarına (Red Teamer / Pentester) kadar herkes için tasarlanmış, **eksiksiz ve interaktif bir siber güvenlik akademisidir**.

Platform, yalnızca kuru teorik metinler sunmak yerine:
- **Tarayıcıda Çalışan BZT-Shell:** Nmap, Sqlmap, Gobuster, Hashcat, Metasploit ve LinPEAS çalıştıran canlı bir Linux simülasyonu.
- **İnteraktif Zafiyet Laboratuvarları:** Gerçek SQL Injection, XSS ve Command Injection açıklıklarının istemci tarafında simüle edilip test edilebildiği güvenli ortamlar.
- **Canlı Araçlar:** Otomatik Ters Bağlantı (Reverse Shell) üretici, Base64/Hex/URL kodlayıcı/çözücü ve Parola Hash Tanımlayıcı.
- **İlerleme Takibi (Progress Tracker):** Öğrencinin tamamladığı modülleri kaydeden ve başarı durumunu gösteren sistem sunar.

---

## 🚀 7 Aşamalı Hacker Eğitim Müfredatı

Platform, sektörün altın standartları olan **OSCP**, **eJPT**, **CEH** ve **PNPT** sınavlarının kapsamını birebir kapsayan 7 aşamalı bir yol haritası sunar:

| Aşama | Başlık | Kapsam & Konular | Seviye |
|---|---|---|---|
| **Faz 1** | **Altyapı & Temeller** | TCP/IP, OSI 7 Katmanı, 3-Way Handshake, Linux Çekirdeği, SUID İzinleri, Bash One-Liner | Başlangıç |
| **Faz 2** | **Keşif & OSINT** | Açık Kaynak İstihbaratı, Shodan, Google Dorking, Subdomain Brute-Force, Nmap Taramaları | Orta |
| **Faz 3** | **Web Sızma Testleri** | SQL Injection (Union, Blind, Error), XSS & Cookie Stealing, RCE, SSRF, File Upload Bypasses | İleri |
| **Faz 4** | **Sistem & Ağ Sızma** | Metasploit, Meterpreter, Linux PrivEsc (Sudo, SUID), Windows PrivEsc, Active Directory | Uzman |
| **Faz 5** | **Kablosuz & Sosyal Müh.** | WPA2/3 Handshake Yakalama (Aircrack-ng), Deauth Saldırıları, Phishing Taktikleri | Orta |
| **Faz 6** | **Red Team & Evasion** | Antivirüs/EDR Mantığı, AMSI Bypass, Direct Syscalls, C2 Komuta Kontrol (Sliver/Havoc) | Uzman |
| **Faz 7** | **Mavi Takım & Kariyer** | SOC Analistliği, Wireshark ile Paket Analizi, SIEM Kurulumu, OSCP/eJPT Hazırlık | Orta |

---

## 🧪 İnteraktif Laboratuvarlar (Labs)

1. **SQL Injection Lab:**
   - Kimlik doğrulama atlatma (`admin' --`) ve Tautology (`' OR 1=1 --`) simülasyonu.
   - Oluşturulan dinamik SQL sorgusunun anlık görselleştirilmesi ve veritabanı sızıntısının tablo halinde gösterimi.
2. **XSS Playground Lab:**
   - WAF filtresi seçimi (script tag temizleme vs filtre yok).
   - Event-handler (`<img src=x onerror=...>`, `<svg onload=...>`) bypass testleri ve güvenli sanal alert simülasyonu.
3. **Command Injection (RCE) Lab:**
   - Ping arayüzü arkasında komut zincirleme (`127.0.0.1; whoami`, `&& cat /etc/passwd`).

---

## ⚡ BZT-Shell Kali Terminal Simülatörü

Tarayıcı içi JavaScript terminal motoru aşağıdaki komutları eksiksiz simüle eder:
- `nmap <IP>`: Port, servis ve zafiyetli sürüm tespit taraması.
- `sqlmap -u <URL>`: Otomatik SQL enjeksiyon ve veritabanı dökümü.
- `gobuster dir -u <URL>`: Gizli dizin ve hassas `.bak` dosyası keşfi.
- `hashcat <HASH>`: RockYou kelime listesi ile MD5/SHA kırma.
- `msfconsole`: Metasploit interaktif konsolu ve Meterpreter ters bağlantısı.
- `linpeas`: Linux yetki yükseltme ve SUID/Sudo zafiyet tarayıcısı.
- `cat <dosya>`, `ls`, `whoami`, `id`, `pwd`, `clear`, `help`

---

## 🛠️ Hacker Araç Çantası (Arsenal)

- **Reverse Shell Generator:** Tek tıkla Bash, Netcat FIFO, Python3 PTY, PowerShell, PHP ve Socat ters bağlantı kodları üretir.
- **Encoder & Decoder:** Base64, URL ve Hex formatlarında çift yönlü hızlı dönüştürücü.
- **Hash Identifier:** Verilen şifrelenmiş metnin MD5, SHA-1, SHA-256, NTLM, bcrypt veya Argon2 olup olmadığını saptar ve Hashcat parametresini önerir.

---

## 💻 Yerel Kurulum & Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için herhangi bir derleme (build), Node.js veya veritabanı kurulumuna gerek yoktur:

```bash
# Depoyu klonlayın
git clone https://github.com/bozatfurkan/bzt-cyber-security.git

# Proje dizinine geçin
cd bzt-cyber-security

# Yerel test sunucusunu başlatın (Python 3 ile)
python3 -m http.server 8000
```

Tarayıcınızda `http://localhost:8000` adresine gidin.

---

## 🚀 GitHub Pages Dağıtımı

Deponuzu GitHub'a push ettikten sonra:
1. GitHub deponuzda **Settings** > **Pages** sekmesine gidin.
2. **Source** kısmını **Deploy from a branch** olarak seçin.
3. **Branch** kısmını `master` (veya `main`) / `root` olarak belirleyip kaydedin.
4. Birkaç saniye içinde projeniz `https://bozatfurkan.github.io/bzt-cyber-security/` adresinde canlıya geçecektir!

---

## ⚖️ Yasal & Etik Uyarı

Bu platformda yer alan bilgiler, araçlar ve teknikler **yalnızca eğitim, meşru güvenlik araştırmaları ve izinli sızma testleri (etik hackerlık)** amacıyla paylaşılmıştır. İzin alınmamış sistemlere yönelik saldırı ve testler yasa dışıdır ve cezai sorumluluk doğurur.

---

<div align="center">
  Geliştirici: <strong>Furkan Bozat</strong> (<strong><a href="https://github.com/bozatfurkan">@bozatfurkan</a></strong>)
</div>
