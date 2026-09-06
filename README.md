<div align="center">
  <h1>🛡️ Advanced Nmap Network Scanning & Vulnerability Analysis Guide</h1>
  <p><strong>Comprehensive Network Discovery, NSE Vulnerability Hunting & AI-Assisted Security Auditing Platform</strong></p>

  [![Tool: Nmap](https://img.shields.io/badge/Tool-Nmap_v7.9x-blue.svg?style=for-the-badge&logo=nmap)](https://nmap.org/)
  [![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
  [![Security](https://img.shields.io/badge/Focus-Cybersecurity-red.svg?style=for-the-badge)](https://github.com/bozatfurkan/nmap-guide)
  [![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)
  [![Web App](https://img.shields.io/badge/Interactive_App-nmap--commands-cyan.svg?style=for-the-badge)](https://bozatfurkan.github.io/nmap-commands/)
</div>

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [AI Security Scanner CLI (`ai_scanner.py`)](#-ai-security-scanner-cli-ai_scannerpy)
  - [Features](#features)
  - [Installation & Quick Start](#installation--quick-start)
  - [CLI Flags & Options](#cli-flags--options)
- [1. Network Discovery & Scanning Strategies](#1-network-discovery--scanning-strategies)
- [2. Deep Enumeration: OS & Service Detection](#2-deep-enumeration-os--service-detection)
- [3. Nmap Scripting Engine (NSE) for Vulnerability Hunting](#3-nmap-scripting-engine-nse-for-vulnerability-hunting)
- [4. Firewall & IDS/IPS Evasion Techniques](#4-firewall--idsips-evasion-techniques)
- [5. Output & Reporting Formats](#5-output--reporting-formats)
- [🔗 Related Projects](#-related-projects)
- [📚 References & Appendix](#-references--appendix)
- [⚖️ Legal & Ethical Disclaimer](#️-legal--ethical-disclaimer)

---

## 🎯 Project Overview

This repository provides an in-depth reference guide and automated auditing toolkit for **Nmap (Network Mapper)**. It covers the full lifecycle of network reconnaissance: from silent host discovery and stealth TCP scanning, to operating system fingerprinting, advanced IDS/IPS firewall evasion, and automated code/secret auditing powered by Google Gemini AI.

---

## 🤖 AI Security Scanner CLI (`ai_scanner.py`)

A built-in command-line auditing tool that combines **fast static regex heuristics** with **Google Gemini LLM semantic analysis** to inspect files and repositories for leaked credentials, exposed API keys, and insecure code configurations.

### Features
- 🔍 **Static Pattern Matching**: Detects AWS keys, GitHub PATs, private encryption keys, hardcoded passwords, and generic tokens instantly.
- 🧠 **Gemini LLM Semantic Audit**: Performs deep contextual analysis to identify security architecture flaws, command injection risks, and sensitive data leakage.
- 📄 **Automated Markdown Reporting**: Exports detailed audit findings directly into `audit_report.md`.
- ⚡ **Graceful Offline Mode**: Runs static regex checks even when no Gemini API key is configured.

### Installation & Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. (Optional) Set your Gemini API key for AI-powered semantic analysis
export GEMINI_API_KEY="your-gemini-api-key"

# 3. Run scan on current repository
python ai_scanner.py --target .

# 4. Export detailed report
python ai_scanner.py --target . --output audit_report.md
```

### CLI Flags & Options

| Option | Shorthand | Default | Description |
| :--- | :--- | :--- | :--- |
| `--target` | `-t` | `.` | Target directory or file to scan |
| `--file` | `-f` | None | Scan a single specific file |
| `--model` | `-m` | `gemini-1.5-flash` | Gemini model for deep reasoning |
| `--api-key` | `-k` | `None` | Pass Gemini API key explicitly |
| `--output` | `-o` | `None` | Export findings as a Markdown report |
| `--skip-ai` | | `False` | Perform static regex scan only |

---

## 1. Network Discovery & Scanning Strategies

Fundamental scanning techniques used to map target hosts and assess attack surfaces:

| Command | Scan Type | Description | Stealth Rating |
| :--- | :--- | :--- | :--- |
| `nmap -sS [IP]` | **TCP SYN (Stealth)** | Half-open scan; does not complete 3-way handshake. Fast and stealthy. | High |
| `nmap -sT [IP]` | **TCP Connect** | Completes full TCP 3-way handshake. Logged easily by target systems. | Low |
| `nmap -sU [IP]` | **UDP Scan** | Probes UDP services (DNS :53, SNMP :161, DHCP :67/68). | Medium |
| `nmap -sn [IP/24]` | **Ping Sweep** | Discovers alive hosts across the subnet without probing port states. | High |
| `nmap -sN [IP]` | **TCP Null Scan** | Sets no flags in TCP header. Bypasses naive stateless firewalls. | Very High |
| `nmap -sF [IP]` | **TCP FIN Scan** | Sets only FIN bit in TCP header. Sneaky closed-port probe. | Very High |
| `nmap -sX [IP]` | **Xmas Scan** | Sets FIN, PSH, and URG flags (lit like a Christmas tree). | Very High |

---

## 2. Deep Enumeration: OS & Service Detection

Identifying running daemon versions and host operating systems:

* **`nmap -sV --version-intensity 5 [IP]`**  
  Aggressively probes banners and protocol headers to identify exact service software versions.
* **`nmap -O --osscan-guess [IP]`**  
  Analyzes TCP/IP stack implementation nuances (TTL, window sizes, TCP options) to guess host OS.
* **`nmap -A [IP]`**  
  **Aggressive Scan**: Orchestrates OS detection (`-O`), version scanning (`-sV`), default script scanning (`-sC`), and traceroute in a unified run.
* **`nmap -p- --min-rate 1000 [IP]`**  
  Scans all 65,535 TCP ports at a high packet transmission rate.

---

## 3. Nmap Scripting Engine (NSE) for Vulnerability Hunting

Harnessing NSE categories to locate security weaknesses and verify CVEs:

```bash
# Run default safe enumeration scripts
nmap -sC [IP]

# Scan targets for known CVE vulnerabilities
nmap --script vuln [IP]

# Enumerate Windows/Samba users and shares
nmap --script smb-enum-users,smb-enum-shares -p 445 [IP]

# Audit TLS/SSL cipher suites and certificate validity
nmap --script ssl-enum-ciphers,ssl-cert -p 443 [IP]

# Detect EternalBlue (MS17-010) vulnerability
nmap -p 445 --script smb-vuln-ms17-010 [IP]
```

---

## 4. Firewall & IDS/IPS Evasion Techniques

Techniques designed to bypass packet filters, stateless firewalls, and intrusion detection systems:

* **`nmap -f [IP]`**  
  **Packet Fragmentation:** Splitting TCP headers into 8-byte fragments to evade signature-based pattern matchers.
* **`nmap --mtu 24 [IP]`**  
  Custom maximum transmission unit (MTU) packet splitting (must be a multiple of 8).
* **`nmap -D RND:10 [IP]`**  
  **Decoy Scan:** Obscures scanner identity by interspersing scan packets with 10 random IP addresses in target logs.
* **`nmap --source-port 53 [IP]`**  
  Sends probes originating from port 53 (DNS) or 88 (Kerberos) to bypass misconfigured firewall rules.
* **`nmap --spoof-mac 0 [IP]`**  
  Spoofs the Ethernet hardware MAC address to an anonymous randomized address.
* **`nmap --data-length 25 [IP]`**  
  Appends 25 random bytes of arbitrary payload data to circumvent payload-length anomaly detection.

---

## 5. Output & Reporting Formats

Structure and archive scan results for post-engagement forensics:

* **`nmap -oN scan_report.txt [IP]`**: Human-readable standard text output.
* **`nmap -oX scan_report.xml [IP]`**: XML format compatible with tools like Metasploit, Nessus, and custom parsers.
* **`nmap -oG scan_report.gnmap [IP]`**: Greppable format ideal for pipeline processing (`grep`, `awk`, `cut`).
* **`nmap -oA audit_result [IP]`**: Exports all three formats (`.nmap`, `.xml`, `.gnmap`) simultaneously.

---

## 🔗 Related Projects

- **[Nmap Intelligence & Interactive Scan Builder](https://github.com/bozatfurkan/nmap-commands)**  
  Zero-dependency interactive web application featuring fuzzy search, 1000+ commands, live parameter customizer, 5-language translation, terminal simulator, and scenario wizard.  
  👉 **Live Demo:** [bozatfurkan.github.io/nmap-commands](https://bozatfurkan.github.io/nmap-commands/)

---

## 📚 References & Appendix

1. **Gordon "Fyodor" Lyon**: *Nmap Network Scanning: The Official Nmap Project Guide to Network Discovery and Vulnerability Scanning* ([nmap.org/book](https://nmap.org/book/man.html))
2. **Nmap Scripting Engine Documentation**: NSE library reference ([nmap.org/nsedoc](https://nmap.org/nsedoc/))
3. **SANS Institute**: *Network Penetration Testing and Ethical Hacking Cheat Sheets*
4. **MITRE CVE & CWE**: Security vulnerability dictionaries and classification schemes.

---

## ⚖️ Legal & Ethical Disclaimer

This documentation and accompanying scripts are created strictly for **authorized educational research, security testing, and defensive infrastructure auditing**. 

Executing port scans against systems or networks without explicit, documented permission from the owner is strictly prohibited and may violate computer crime statutes in your jurisdiction. The author assumes no liability for damages or legal consequences arising from the misuse of these materials.

---

<div align="center">
  <sub>Maintained with 🛡️ by <a href="https://github.com/bozatfurkan">Furkan Bozat</a></sub>
</div>
