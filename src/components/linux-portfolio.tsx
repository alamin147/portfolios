import { useState, useEffect } from "react";
import { Terminal, Code, Database, Server, Shield, Eye, Trophy, BookOpen, Star, Activity } from "lucide-react";
import { DiLinux } from "react-icons/di";
import { SiKalilinux, SiUbuntu, SiLinuxmint, SiDebian, SiDocker, SiFedora } from "react-icons/si";
import LinuxNavbar from "./linux-navbar";
import LinuxContactModal from "./linux-contact-modal";

export default function LinuxPortfolio() {
  const [terminalText, setTerminalText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const terminalCommands = [
    "root@alamin:~# whoami",
    "Al Amin - Linux Enth & Code Assassin",
    "root@alamin:~# ls -la /skills",
    "drwxr-xr-x  2 root root 4096 Aug 31 2025 .",
    "drwxr-x--- 15 root root 4096 Aug 31 2025 ..",
    "-rwxr-xr-x  1 root root  666 Aug 31 2025 pentesting",
    "-rwxr-xr-x  1 root root  777 Aug 31 2025 system_admin",
    "-rwxr-xr-x  1 root root  888 Aug 31 2025 automation",
    "root@alamin:~# cat /etc/passwd | grep hacker",
    "hacker:x:1337:1337:Elite Hacker:/home/hacker:/bin/bash",
    "root@alamin:~# echo 'Welcome to the terminal...'",
    "Welcome to the terminal...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < terminalCommands.length) {
        setTerminalText(prev => prev + terminalCommands[currentIndex] + "\n");
        setCurrentIndex(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const linuxDistros = [
      { name: "Fedora", icon: SiFedora, color: "text-blue-400" },
      { name: "Ubuntu", icon: SiUbuntu, color: "text-orange-400" },
      { name: "Debian", icon: SiDebian, color: "text-red-500" },
      { name: "Mint", icon: SiLinuxmint, color: "text-red-500" },
    { name: "Kali Linux", icon: SiKalilinux, color: "text-red-400" },
  ];

  const techSkills = [
    { name: "Shell Scripting", icon: Terminal, status: "Expert" },
    { name: "Docker & Containers", icon: SiDocker, status: "Learning" },
    { name: "Database Management", icon: Database, status: "Intermediate" },
  ];

  const hackingProjects = [
    {
      title: "Network Scanner Pro",
      description: "Advanced network reconnaissance tool with stealth capabilities",
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

  const achievements = [
    {
      title: "Linux Server Whisperer",
      description: "Successfully managed 500+ production servers without a single critical outage",
      icon: Trophy,
      year: "2024",
    },
    {
      title: "Security Vulnerability Hunter",
      description: "Discovered and responsibly disclosed 15+ critical security vulnerabilities",
      icon: Shield,
      year: "2023-2024",
    },
    {
      title: "Automation Architect",
      description: "Reduced manual deployment time by 95% through custom automation scripts",
      icon: Terminal,
      year: "2024",
    },
    {
      title: "Open Source Contributor",
      description: "Contributed to 20+ Linux and security-focused open source projects",
      icon: Code,
      year: "2022-2024",
    },
  ];

  const techBlogs = [
    {
      title: "The Art of Digital Forensics",
      excerpt: "Deep dive into memory analysis and digital evidence collection techniques",
      category: "Forensics",
      readTime: "8 min",
      status: "Latest",
    },
    {
      title: "Zero-Day Hunting Methodology",
      excerpt: "My systematic approach to discovering unknown vulnerabilities in the wild",
      category: "Security Research",
      readTime: "12 min",
      status: "Popular",
    },
    {
      title: "Linux Kernel Exploitation 101",
      excerpt: "Understanding privilege escalation techniques and kernel-level attacks",
      category: "Exploitation",
      readTime: "15 min",
      status: "Technical",
    },
    {
      title: "Building Undetectable Backdoors",
      excerpt: "Educational analysis of persistence mechanisms and stealth techniques",
      category: "Red Team",
      readTime: "10 min",
      status: "Advanced",
    },
  ];

  const showcaseProjects = [
    {
      title: "Ghost Shell Framework",
      description: "Advanced post-exploitation framework with anti-forensics capabilities",
      features: ["Encrypted C2", "Memory-only execution", "OPSEC-safe"],
      status: "Active Development",
      danger: "High",
    },
    {
      title: "Neural Network IDS",
      description: "AI-powered intrusion detection system trained on custom attack patterns",
      features: ["ML Detection", "Real-time Analysis", "Custom Rules"],
      status: "Production Ready",
      danger: "Medium",
    },
    {
      title: "Cryptographic Vault",
      description: "Military-grade encrypted storage system with zero-knowledge architecture",
      features: ["AES-256", "Perfect Forward Secrecy", "Quantum Resistant"],
      status: "Classified",
      danger: "Top Secret",
    },
  ];

  const currentActivities = [
    {
      activity: "Reverse Engineering Advanced Malware",
      status: "In Progress",
      completion: 75,
      timeframe: "2 weeks",
    },
    {
      activity: "Building Custom Linux Distro",
      status: "Active",
      completion: 60,
      timeframe: "1 month",
    },
    {
      activity: "Red Team Assessment Campaign",
      status: "Classified",
      completion: 90,
      timeframe: "3 days",
    },
    {
      activity: "Zero-Day Research Project",
      status: "Confidential",
      completion: 45,
      timeframe: "6 weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <LinuxNavbar />

      {/* Matrix-like background effect */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Animated dark elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <DiLinux className="text-6xl text-red-400 mr-4" />
                <div>
                  <h1 className="text-4xl font-bold text-red-400 mb-2">
                    root@alamin:~#
                  </h1>
                  <p className="text-xl text-green-300">
                    ./execute_recreate_world.sh
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Linux Command Center
                </h2>
                <p className="text-green-300 text-lg leading-relaxed">
                  Where code meets chaos, and systems obey my command. Linux isn't just an operating system, it's the battlefield where I sharpen my skills. Each command is a strike, each script a strategy, as I dive deeper into the void, bending digital realms to my will.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {linuxDistros.map((distro, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 hover:border-red-400 transition-all duration-300"
                  >
                    <distro.icon className={`text-2xl ${distro.color} mr-2`} />
                    <span className="text-white">{distro.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-black border border-green-400 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-gray-900 px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-400">Terminal - alamin</span>
              </div>
              <div className="p-4 h-80 overflow-y-auto">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">
                  {terminalText}
                  <span className="animate-pulse">█</span>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Terminal className="inline mr-3" />
            Technical Mastery & Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <skill.icon className="text-3xl text-red-400 mr-3 group-hover:text-green-400 transition-colors" />
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded text-sm font-mono ${
                    skill.status === "Expert" ? "bg-red-600 text-white border border-red-400" :
                    skill.status === "Advanced" ? "bg-green-600 text-black border border-green-400" :
                    skill.status === "Intermediate" ? "bg-orange-600 text-white border border-orange-400" :
                    "bg-purple-600 text-white border border-purple-400"
                  }`}>
                    {skill.status}
                  </span>
                  <span className="text-green-400 text-sm font-mono">./skill_level.sh</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Code className="inline mr-3" />
            Underground Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hackingProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-black px-3 py-1 text-xs font-bold">
                  {project.status}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-green-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded text-sm hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Trophy className="inline mr-3" />
            Achievements & Milestones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group relative"
              >
                <div className="absolute top-4 right-4 text-xs text-green-400 font-mono">
                  {achievement.year}
                </div>

                <div className="flex items-start mb-4">
                  <achievement.icon className="text-3xl text-red-400 mr-4 mt-1 group-hover:text-green-400 transition-colors" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-green-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <BookOpen className="inline mr-3" />
            Technical Archives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-red-500 text-black px-3 py-1 text-xs font-bold rounded">
                    {blog.status}
                  </span>
                  <span className="text-green-400 text-sm font-mono">
                    {blog.readTime} read
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-green-300 mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex justify-between items-center">
                  <span className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded text-sm">
                    {blog.category}
                  </span>
                  <span className="text-red-400 font-mono text-sm">
                    ./read_more.sh →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Showcase Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Star className="inline mr-3" />
            Elite Showcase
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {showcaseProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold ${
                  project.danger === "High" ? "bg-red-600 text-white" :
                  project.danger === "Medium" ? "bg-yellow-600 text-black" :
                  "bg-purple-600 text-white"
                }`}>
                  {project.danger}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-green-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-red-400 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-green-300 text-sm">
                        <span className="text-red-400 mr-2">▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <span className="bg-black border border-green-400 text-green-400 px-4 py-2 rounded font-mono text-sm">
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Activities Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Activity className="inline mr-3" />
            Active Operations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {activity.activity}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded ${
                    activity.status === "In Progress" ? "bg-yellow-600 text-black" :
                    activity.status === "Active" ? "bg-green-600 text-white" :
                    activity.status === "Classified" ? "bg-red-600 text-white" :
                    "bg-purple-600 text-white"
                  }`}>
                    {activity.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 text-sm">Progress</span>
                    <span className="text-red-400 font-mono text-sm">{activity.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-green-400 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${activity.completion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-green-400 font-mono text-sm">
                    ETA: {activity.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center">
            <blockquote className="text-2xl italic text-green-300 mb-4">
              "In the world of zeros and ones, I am the exception that proves the rule."
            </blockquote>
            <p className="text-red-400 font-bold">- Al Amin, Linux Specialist</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                root@alamin:~# echo "Contact the shadows..."
              </p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-green-400 hover:text-red-400 transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-green-400 hover:text-red-400 transition-colors">
                  LinkedIn
                </a>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-green-400 hover:text-red-400 transition-colors"
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Contact Modal */}
      <LinuxContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
