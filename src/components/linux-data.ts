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
    title: "My custom Dotfiles",
    description:
      "I will be sharing my personal dotfiles repository that includes configurations for Hyprland, Neovim, Zsh and various scripts to enhance productivity and workflow on Linux systems.",
    features: [
      "Hyprland Window Manager Config",
      "Custom Neovim Setup",
      "Zsh Shell Configuration",
      "Productivity Scripts",
      "Automated Installation Scripts",
    ],
    status: "Coming Soon",
    danger: "Low",
  },
];

export const hackingProjects = [
  {
    title: "Visual File System Explorer",
    description:
      "Modern project management and file system visualization tool with drag-and-drop canvas interface. Features real-time collaboration, MongoDB persistence, and integrated Monaco code editor.",
    tech: ["React", "Node.js", "MongoDB", "TypeScript", "React Flow"],
    status: "Under development",
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
