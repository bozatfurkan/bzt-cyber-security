#!/usr/bin/env python3
"""
AI Security Scanner & Secret Auditor
Automated static and LLM-assisted vulnerability audit tool for source repositories.
Author: Furkan Bozat (https://github.com/bozatfurkan)
"""

import os
import sys
import re
import argparse
from pathlib import Path
from typing import List, Dict, Optional

# ANSI Color Codes
CLR_RESET = "\033[0m"
CLR_RED = "\033[91m"
CLR_GREEN = "\033[92m"
CLR_YELLOW = "\033[93m"
CLR_CYAN = "\033[96m"
CLR_BOLD = "\033[1m"
CLR_DIM = "\033[2m"

# Common Secret Patterns (Static Scan)
SECRET_PATTERNS = [
    (r"(?i)aws[_\-]?(?:access[_\-]?)?key[_\-]?(?:id)?\s*[:=]\s*['\"]?(AKIA[0-9A-Z]{16})['\"]?", "AWS Access Key ID"),
    (r"(?i)aws[_\-]?(?:secret[_\-]?)?(?:access[_\-]?)?key\s*[:=]\s*['\"]?([0-9a-zA-Z/+]{40})['\"]?", "AWS Secret Access Key"),
    (r"(ghp_[0-9a-zA-Z]{36}|github_pat_[0-9a-zA-Z_]{82})", "GitHub Personal Access Token"),
    (r"-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----", "Private Encryption Key"),
    (r"(?i)(?:api[_\-]?key|secret[_\-]?token|auth[_\-]?token)\s*[:=]\s*['\"]([a-zA-Z0-9_\-\.]{20,})['\"]", "Generic API Key / Secret Token"),
    (r"(?i)(?:password|passwd|pwd)\s*[:=]\s*['\"]([^'\"\s]{8,})['\"]", "Hardcoded Plaintext Password"),
]

IGNORED_DIRS = {".git", ".venv", "venv", "__pycache__", "node_modules", ".idea", ".vscode"}
SCANNABLE_EXTENSIONS = {".py", ".js", ".ts", ".html", ".css", ".md", ".sh", ".yml", ".yaml", ".json", ".env.example", ".txt"}


def print_banner():
    print(f"{CLR_CYAN}{CLR_BOLD}")
    print("  =======================================================")
    print("  🛡️  AI SECURITY SCANNER & SECRET AUDITOR (v2.0)")
    print("  Advanced Static Pattern Matching & Gemini LLM Engine")
    print("  =======================================================")
    print(f"{CLR_RESET}")


def static_regex_scan(file_path: Path) -> List[Dict]:
    findings = []
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
        lines = content.splitlines()
        for idx, line in enumerate(lines, start=1):
            for pattern, desc in SECRET_PATTERNS:
                matches = re.finditer(pattern, line)
                for match in matches:
                    snippet = line.strip()
                    if len(snippet) > 100:
                        snippet = snippet[:100] + "..."
                    findings.append({
                        "file": str(file_path),
                        "line": idx,
                        "type": desc,
                        "snippet": snippet
                    })
    except Exception as e:
        findings.append({
            "file": str(file_path),
            "line": 0,
            "type": "File Read Error",
            "snippet": str(e)
        })
    return findings


def collect_files(target_path: Path, recursive: bool = True) -> List[Path]:
    files = []
    if target_path.is_file():
        return [target_path]
    elif target_path.is_dir():
        for root, dirs, filenames in os.walk(target_path):
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
            for filename in filenames:
                file_p = Path(root) / filename
                if file_p.suffix in SCANNABLE_EXTENSIONS or file_p.name in ["Dockerfile", "Makefile"]:
                    files.append(file_p)
            if not recursive:
                break
    return sorted(files)


def run_gemini_audit(content: str, filename: str, api_key: str, model_name: str = "gemini-1.5-flash") -> Optional[str]:
    try:
        import google.generativeai as genai
    except ImportError:
        return "[!] 'google-generativeai' package is not installed. Install via: pip install -r requirements.txt"

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(model_name)
        prompt = (
            f"You are a senior cybersecurity auditor. Perform a security review of the file '{filename}'.\n"
            f"Identify any:\n"
            f"1. Accidental leaks of secrets, API keys, credentials, or internal IPs.\n"
            f"2. Security vulnerabilities, injection risks, command injections, or unsafe configurations.\n"
            f"3. Remediation recommendations.\n\n"
            f"Be concise, actionable, and formatted in Markdown bullet points.\n\n"
            f"--- File Content Begin ---\n{content}\n--- File Content End ---"
        )
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"[!] Gemini API audit error for {filename}: {e}"


def main():
    parser = argparse.ArgumentParser(description="AI Security Scanner & Secret Auditor")
    parser.add_argument("-t", "--target", default=".", help="Target file or directory to scan (default: current directory)")
    parser.add_argument("-f", "--file", default=None, help="Target specific file (shorthand for --target <file>)")
    parser.add_argument("-m", "--model", default="gemini-1.5-flash", help="Gemini model to use (default: gemini-1.5-flash)")
    parser.add_argument("-k", "--api-key", default=None, help="Gemini API Key (or set GEMINI_API_KEY environment variable)")
    parser.add_argument("-o", "--output", default=None, help="Save scan report to a file (Markdown format)")
    parser.add_argument("--skip-ai", action="store_true", help="Perform only static regex secret scan without AI call")
    args = parser.parse_args()

    print_banner()

    target = Path(args.file if args.file else args.target)
    if not target.exists():
        print(f"{CLR_RED}[X] Target path does not exist: {target}{CLR_RESET}")
        sys.exit(1)

    api_key = args.api_key or os.environ.get("GEMINI_API_KEY")

    files = collect_files(target)
    print(f"[*] Target: {CLR_BOLD}{target}{CLR_RESET} ({len(files)} file(s) identified for scanning)")
    print(f"[*] AI Audit Mode: {'Enabled' if api_key and not args.skip_ai else 'Static Regex Only (Set GEMINI_API_KEY for AI analysis)'}")
    print("-" * 55)

    all_static_findings = []
    ai_reports = []

    for fpath in files:
        # 1. Static Scan
        findings = static_regex_scan(fpath)
        if findings:
            all_static_findings.extend(findings)
            for item in findings:
                print(f"{CLR_RED}[ALERT] Secret found in {item['file']}:{item['line']} -> {item['type']}{CLR_RESET}")
                print(f"        {CLR_DIM}{item['snippet']}{CLR_RESET}")

        # 2. AI Scan (if enabled)
        if api_key and not args.skip_ai:
            try:
                content = fpath.read_text(encoding="utf-8", errors="ignore")
                # Limit content size to avoid excessive token consumption per file
                if len(content) > 50000:
                    content = content[:50000] + "\n... [Content Truncated For Token Limit]"
                print(f"{CLR_CYAN}[AI] Analyzing {fpath.name} with {args.model}...{CLR_RESET}")
                ai_result = run_gemini_audit(content, fpath.name, api_key, args.model)
                ai_reports.append({"file": str(fpath), "report": ai_result})
            except Exception as e:
                print(f"{CLR_YELLOW}[!] Could not process {fpath}: {e}{CLR_RESET}")

    # Summary
    print("\n" + "=" * 55)
    print(f"{CLR_BOLD}📊 SCAN AUDIT SUMMARY{CLR_RESET}")
    print("=" * 55)
    print(f"Total Files Scanned       : {len(files)}")
    print(f"Static Secret Findings    : {len(all_static_findings)}")
    if all_static_findings:
        print(f"{CLR_RED}⚠️  High Priority Secrets Detected! Immediate rotation recommended.{CLR_RESET}")
    else:
        print(f"{CLR_GREEN}✅ No obvious static hardcoded secrets or API tokens found.{CLR_RESET}")

    if ai_reports:
        print("\n" + "=" * 55)
        print(f"{CLR_BOLD}🤖 GEMINI AI DEEP ANALYSIS REPORTS{CLR_RESET}")
        print("=" * 55)
        for rep in ai_reports:
            print(f"\n{CLR_CYAN}--- Audit for {rep['file']} ---{CLR_RESET}")
            print(rep["report"])

    # Output Report
    if args.output:
        out_path = Path(args.output)
        md_lines = [
            f"# Security Audit & AI Vulnerability Report",
            f"- **Date**: {os.popen('date').read().strip()}",
            f"- **Target**: `{target}`",
            f"- **Files Scanned**: {len(files)}",
            f"- **Static Findings Count**: {len(all_static_findings)}\n",
            "## 1. Static Secret Findings",
        ]
        if all_static_findings:
            for item in all_static_findings:
                md_lines.append(f"- **{item['type']}** at `{item['file']}:{item['line']}`: `{item['snippet']}`")
        else:
            md_lines.append("No hardcoded secrets detected by regex heuristics.\n")

        if ai_reports:
            md_lines.append("## 2. Gemini AI Deep Security Analysis\n")
            for rep in ai_reports:
                md_lines.append(f"### {rep['file']}\n")
                md_lines.append(rep["report"] or "")
                md_lines.append("\n---\n")

        out_path.write_text("\n".join(md_lines), encoding="utf-8")
        print(f"\n{CLR_GREEN}[+] Detailed Markdown report written to: {out_path}{CLR_RESET}")


if __name__ == "__main__":
    main()
