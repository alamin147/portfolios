import {
  SiKalilinux,
  SiUbuntu,
  SiLinuxmint,
  SiDebian,
  SiFedora,
} from "react-icons/si";
import { Terminal, Code, Database, Server, Shield, Eye } from "lucide-react";
export const techBlogs = [
  {
    title: "The Art of Digital Forensics",
    excerpt:
      "Deep dive into memory analysis and digital evidence collection techniques",
    category: "Forensics",
    readTime: "8 min",
    status: "Latest",
  },
  {
    title: "Zero-Day Hunting Methodology",
    excerpt:
      "My systematic approach to discovering unknown vulnerabilities in the wild",
    category: "Security Research",
    readTime: "12 min",
    status: "Popular",
  },
  {
    title: "Linux Kernel Exploitation 101",
    excerpt:
      "Understanding privilege escalation techniques and kernel-level attacks",
    category: "Exploitation",
    readTime: "15 min",
    status: "Technical",
  },
  {
    title: "Building Undetectable Backdoors",
    excerpt:
      "Educational analysis of persistence mechanisms and stealth techniques",
    category: "Red Team",
    readTime: "10 min",
    status: "Advanced",
  },
];

export const showcaseProjects = [
  {
    title: "Ghost Shell Framework",
    description:
      "Advanced post-exploitation framework with anti-forensics capabilities",
    features: ["Encrypted C2", "Memory-only execution", "OPSEC-safe"],
    status: "Active Development",
    danger: "High",
  },
  {
    title: "Neural Network IDS",
    description:
      "AI-powered intrusion detection system trained on custom attack patterns",
    features: ["ML Detection", "Real-time Analysis", "Custom Rules"],
    status: "Production Ready",
    danger: "Medium",
  },
  {
    title: "Cryptographic Vault",
    description:
      "Military-grade encrypted storage system with zero-knowledge architecture",
    features: ["AES-256", "Perfect Forward Secrecy", "Quantum Resistant"],
    status: "Classified",
    danger: "Top Secret",
  },
];

export const hackingProjects = [
  {
    title: "Network Scanner Pro",
    description:
      "Advanced network reconnaissance tool with stealth capabilities",
    tech: ["Python", "Nmap", "Scapy"],
    status: "Active",
  },
  {
    title: "System Hardening Suite",
    description: "Automated Linux system security hardening framework",
    tech: ["Bash", "Ansible", "Security"],
    status: "Deployed",
  },
  {
    title: "Log Analysis Engine",
    description: "Real-time log monitoring and threat detection system",
    tech: ["Python", "ELK Stack", "ML"],
    status: "Monitoring",
  },
  {
    title: "Container Security Audit",
    description: "Docker and Kubernetes security assessment toolkit",
    tech: ["Docker", "K8s", "Security"],
    status: "Scanning",
  },
];

export const linuxDistros = [
  { name: "Fedora", icon: SiFedora, color: "text-blue-400" },
  { name: "Ubuntu", icon: SiUbuntu, color: "text-orange-400" },
  { name: "Debian", icon: SiDebian, color: "text-red-500" },
  { name: "Mint", icon: SiLinuxmint, color: "text-green-300" },
  { name: "Kali Linux", icon: SiKalilinux, color: "text-red-400" },
];

export const techSkills = [
  { name: "Neovim", icon: Terminal, status: "Expert" },
  { name: "Shell Scripting", icon: Code, status: "Advanced" },
  { name: "Web Scraping", icon: Eye, status: "Advanced" },
  { name: "Linux Command Line", icon: Server, status: "Expert" },
  { name: "Python Automation", icon: Database, status: "Intermediate" },
  { name: "Git & Version Control", icon: Shield, status: "Advanced" },
];
