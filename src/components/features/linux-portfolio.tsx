import { useState, useEffect, useRef } from "react";
import { Terminal, Code, BookOpen, Star } from "lucide-react";
import { DiLinux } from "react-icons/di";
// import { motion } from "framer-motion";
import { LinuxNavbar, LinuxContactModal, LinuxProjectModal, LinuxShowcaseModal } from "@/components/features";
import BlogDetailsModal from "@/components/sections/blog-details-modal";
import { hackingProjects, linuxDistros, showcaseProjects, techBlogs, techSkills } from "./linux-data";

export default function LinuxPortfolio() {
  const [terminalText, setTerminalText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isShowcaseModalOpen, setIsShowcaseModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedShowcase, setSelectedShowcase] = useState(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showCat, setShowCat] = useState(false);
//   const [catAnimationPhase, setCatAnimationPhase] = useState("walking"); // "walking" or "sitting"
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const terminalCommands = [
    "root@alamin:~# whoami",
    "Al Amin - Fullstack Engineer & Linux Enthusiast ",
    "root@alamin:~# ls -la /skills",
    "drwxr-xr-x  2 root root 4096 Aug 31 2025 .",
    "drwxr-x--- 15 root root 4096 Aug 31 2025 ..",
    "-rwxr-xr-x  1 root root  666 Aug 31 2025 Linux Command Line",
    "-rwxr-xr-x  1 root root  6636 Aug 31 2025 Shell Scripting",
    "-rwxr-xr-x  1 root root  2336 Aug 31 2025 Git-Github",
    "-rwxr-xr-x  1 root root  777 Aug 31 2025 system_admin",
    "-rwxr-xr-x  1 root root  888 Aug 31 2025 System Configuration/Customization",
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
      } else if (!isIntroComplete) {
        setIsIntroComplete(true);
        setTerminalText(prev => prev + "root@alamin:~# ");
        // Show cat after terminal intro is complete
        setTimeout(() => setShowCat(true), 2000);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [currentIndex, isIntroComplete, showCat]);

  // Focus input when intro is complete
  useEffect(() => {
    if (isIntroComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isIntroComplete]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalText]);

  const processCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    let response = "";

    switch (trimmedCommand) {
      case "ls":
        response = "about.sh  image.sh  contact.sh  skills.sh   blog/  projects/ ";
        break;
      case "whoami":
        response = "Al Amin - Linux Enthusiast & Code Assassin\nUID: 1337\nSpecialty: Fullstack Engineer";
        break;
      case "skills.sh":
      case "skills":
      case "./skills.sh":
        response = `#!/bin/bash
echo "=== Technical Arsenal ==="
echo "• Linux Command Line: Expert"
echo "• Git & Version Control: Advanced";
echo "• Shell Scripting: Advanced"
echo "• Neovim Configuration: Expert"
echo "• Python Automation: Intermediate"
echo "• Web Scraping: Advanced"`
        break;
      case "about":
        case "about.sh":
        case "./about.sh":
        response = `# Al Amin

A passionate Linux enthusiast who thrives in the command line environment.
Specializing in system administration, automation.
echo "=== Contact Information ==="
echo "Name: Al Amin"
echo "Email: alamin.14780@gmail.com"
echo "Phone: (+880) 1322332323"
echo "Location: Dhaka, Bangladesh"

## Current Focus:
- Advanced Linux system administration
- Automation and scripting
- Open source contributions`;
        break;
      case "projects":
      case "ls projects/":
        response = `- visual-file-management-system`;
        break;
      case "ls blog/":
      case "blog":
        response = `No blog articles available at the moment.`;
        break;
      case "help":
        response = `Available commands:
ls              - List directory contents
whoami          - Display user information
image.sh        - Display user profile image
about.sh        - Display about information
skills.sh       - Show technical skills
contact.sh      - Open secure communication (Email)
projects        - List project directories
blog            - List blog articles
clear           - Clear terminal screen
date            - Show current date
uptime          - Show system uptime
ps              - Show running processes
help            - Show this help message`;
        break;
      case "contact.sh":
      case "./contact.sh":
      case "contact":
        response = `#!/bin/bash

echo "Opening secure communication channel..."`
        setTimeout(() => setIsContactModalOpen(true), 1000);
        break;
      case "date":
        response = new Date().toString();
        break;
      case "uptime":
        response = `System uptime: ${Math.floor(Date.now() / 1000 / 60)} minutes
Load average: 0.42, 0.38, 0.33
Users logged in: 1 (alamin)`;
        break;
      case "ps":
        response = `PID  COMMAND
1337 portfolio-daemon
2048 skill-monitor
4096 project-scanner
8192 security-audit`;
        break;
      case "image.sh":
      case "./image.sh":
      case "image":
        response = `#!/bin/bash
echo "Loading user profile image..."




                                 %%#%######
                              @%%%%@@@@%%##**
                             @@@@@@@@@@@@@%%#*+
                           @@@@@@%#**##%%@@@@%#*
                          %@@@%*+++==++++++*%@%*
                          @@@@#*++===========#%#
                          @@@@*****+======---=#%
                          @@@%%****###**#%#*==*#
                          #@@######**#***#*+=+**
                         %###+++***##=-*=+*+=+##
                          *%#++++++++==-=====-=*
                          *#@*****+#%%##====-==+
                           %@##*#%@@%%##***=-+*
                            @@%%##*#%##+=+*==**
                            %@@@%%#*##**++**##
                         %%@%%@@@@@@@@@%%%%%
                        =+@@###@@@@@@@@@@%*
                    =-====+*#**##%%@@@%*=+*=::-=
                +=-----=++=+*********++=+#*=::-=+------
            ------=+===-=++-=++**++*+++*%%*+-:-=*-=--=:-
        =------------=---=+=---====+***#+++-#%--*==-==--::
     ====--------=--==----=+++=-==-==+**+*++##==*=--====---
   ====-----==-=---===**##%%#%%#+++**##+=*==++--+=--==+=-==::
  ====--===----===-:-==-==+++++++++*+*+-+*-=+=-=*--==+*===+-::
 +===++--=++::----==-:-=-::----------*--*+--+=-=+--+=++++++---:
++===+++--+*+::-==--==-:-----::::::-=*--*+--==++--===+*#**=---:-
+=====+**==+*=-:-==--==-:------::---*+:-++--=++---+-=*%#*-==---::
==+++++++*==*#=-:-=+=-==-:-:-----:::==--++==+++=----+*@%*===+==-::
*--=++****+++%*=-:-=+====------:::::-=--++=+++=-----+#@%%*++=-===--::
***+--=*****+%%*=::-=+===-----:::::::=--=++**+=--:-=+%@@@%#*++=--==--=+
****++==---=+#@%*-:::-===-=---:::::--+-=++**+=-----=+%@%%%%%%%*=+==+=--=
+++*+========+#@#+-:::--==-=---::---=*==+++++=------+@@@%@@@%%***++**+=--
****+=-==--=+=%@@#+--:::-=----------=*+++++=++=----=* %%@@@@%####+==+=-=+-
+++++========*@@@%*=---::---------==+++=++-=+-+=---=*   %%%###*+=----------
+++++=======-%@@@%#+==------------=+++++++-==-:==-==#    %%%%#*+=-----:::::-
+***+++===--+@@@%%#*+=----------===+++++++=+-----=++       %%#*+**++**#*=:::
=========---+#@@%###*-----::::---=+++*++++++=-==++++       %%##%+===---#@@*-
+++++=----==+#@@@@%%#+---::::::--+++***++++*+======+     =*@@@%+====---*@@@*
##**+==-----=*@@@@@%%%%#*=::::::-=*****=--=========    ++====---------+@@@@*
*+++==---::--*%@%%%%%%%%%#+--==+++*****+--========+   *+++++====------#@@@%#
*#%%%##*+=---+#%%#%%#####*+=+***#***+++*=========+    ++==++==++-===--*@@@@*
####*====+#*#@%%%%#******++*##**++++=+#*=====++==+    ++==+==+*+=*+=--*@@@@%
+*##+--===+#%%@%***###%%%%##***++++++*%==========   *+*+==++-++=-*=-=#%%@@@%
#*++*++=-=*%@@#**************+++++++*##===+=====    #+*%%#*+-*+=-++=%%%@@@%
**--===+=+*+===++++++++++*+++++++++++*+=++*#%#*+    +=+@@@@@@#*=+%*@@%%@
==+++====-+=----=++++++++++++++++++*@%%%%%%%%%*=    @%@@@@@@@@@@@@@@@%#

echo "Profile loaded successfully - Al Amin"
echo "Image format: ASCII Art"`;
        break;
      case "clear":
        setTerminalText("root@alamin:~# ");
        setCommandHistory([]);
        return;
      case "":
        response = "";
        break;
      default:
        response = `bash: ${trimmedCommand}: command not found
Try 'help' to see available commands`;
    }

    setCommandHistory(prev => [...prev, command]);
    setTerminalText(prev => prev + command + "\n" + (response ? response + "\n" : "") + "root@alamin:~# ");
    setCurrentCommand("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(currentCommand);
    } else if (e.key === "ArrowUp" && commandHistory.length > 0) {
      // Navigate command history with up arrow
      e.preventDefault();
      const lastCommand = commandHistory[commandHistory.length - 1];
      setCurrentCommand(lastCommand);
    } else if (e.key === "Tab") {
      // Basic tab completion for common commands
      e.preventDefault();
      const availableCommands = ["ls", "whoami", "skills.sh", "about", "projects", "contact.sh", "image.sh", "help", "history", "clear", "date", "uptime", "ps"];
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentCommand.toLowerCase()));
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  const handleBlogClick = (blog: any) => {
    setSelectedBlog(blog);
    setIsBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlog(null);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleShowcaseClick = (project: any) => {
    setSelectedShowcase(project);
    setIsShowcaseModalOpen(true);
  };

  const closeShowcaseModal = () => {
    setIsShowcaseModalOpen(false);
    setSelectedShowcase(null);
  };

  return (
    <div
      id="linux-portfolio-page"
      className="linux-portfolio-page min-h-screen font-mono relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 text-emerald-900 dark:bg-black dark:text-green-400"
    >
      <LinuxNavbar />

      {/* Matrix-like background effect */}
      <div className="fixed inset-0 bg-slate-100 dark:bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(5,150,105,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.07)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)]"></div>

        {/* Animated accent blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-400/20 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400/20 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-400/15 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-25 dark:opacity-5 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section - Terminal Only */}
        <section className="container mx-auto px-6 py-20">
          {/* Terminal */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-950 border-2 border-emerald-600 rounded-lg overflow-hidden shadow-2xl shadow-emerald-900/20 hover:shadow-emerald-600/30 transition-all duration-300 hover:border-red-500 dark:bg-black dark:border-green-400 dark:shadow-green-500/20 dark:hover:shadow-green-400/50 dark:hover:border-red-400 relative group terminal-interactive-glow">
              <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-600 dark:bg-gray-900 dark:border-gray-700">
                <div className="flex items-center">
                  <span className="text-slate-300 font-mono dark:text-gray-400">Terminal - alamin</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400 animate-pulse dark:text-green-400" />
                  <span className="text-emerald-400 text-xs font-mono dark:text-green-400">LIVE</span>
                </div>
              </div>
              <div
                ref={terminalRef}
                className="p-6 h-[600px] overflow-y-auto cursor-text bg-slate-950/80 hover:bg-slate-950 transition-colors dark:hover:bg-gray-950/50"
                onClick={() => inputRef.current?.focus()}
              >
                <pre className="text-emerald-400 text-sm whitespace-pre-wrap font-mono leading-relaxed dark:text-green-400">
                  {terminalText}
                  {isIntroComplete && (
                    <span className="inline-flex items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="bg-transparent border-none outline-none text-emerald-400 font-mono text-sm caret-transparent p-0 m-0 dark:text-green-400"
                        style={{ width: `${Math.max(currentCommand.length, 0)}ch` }}
                        autoFocus
                        spellCheck={false}
                      />
                      <span className="animate-pulse text-emerald-400 dark:text-green-400">█</span>
                    </span>
                  )}
                  {!isIntroComplete && <span className="animate-pulse text-emerald-400 dark:text-green-400">█</span>}
                </pre>
              </div>
              {isIntroComplete && (
                <div className="px-6 py-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t-2 border-emerald-500/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-green-400/30">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 text-lg animate-pulse dark:text-yellow-400">💡</span>
                      <span className="text-emerald-200 text-sm font-mono font-bold dark:text-green-300">
                        TRY: <span className="text-slate-900 bg-emerald-100/90 px-2 py-1 rounded dark:text-white dark:bg-gray-800">ls</span> or <span className="text-slate-900 bg-emerald-100/90 px-2 py-1 rounded dark:text-white dark:bg-gray-800">help</span> to explore
                      </span>
                    </div>
                    <span className="text-red-600 text-xs font-mono animate-pulse dark:text-red-400">← Click & Type!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Intro Content Below Terminal */}
          <div className="mt-12 max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <DiLinux className="text-6xl text-red-600 mr-4 dark:text-red-400" />
              <div>
                <h1 className="text-4xl font-bold text-red-600 mb-2 dark:text-red-400">
                  root@alamin:~#
                </h1>
                <p className="text-xl text-emerald-700 dark:text-green-300">
                  ./execute_recreate_world.sh
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 dark:text-white">
                Linux Command Center
              </h2>
              <p className="text-emerald-800 text-lg leading-relaxed max-w-3xl mx-auto dark:text-green-300">
                Where code meets chaos, and systems obey my command. Each command is a strike, each script a strategy, as I dive deeper into the void, bending digital realms to my will. One day Cat will take the world with the power of sudo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {linuxDistros.map((distro, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/90 border border-slate-200 rounded-lg px-4 py-3 hover:border-red-500 hover:scale-105 transition-all duration-300 relative group shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:hover:border-red-400"
                >
                  <distro.icon className={`text-2xl ${distro.color} mr-2`} />
                  <span className="text-slate-800 font-mono dark:text-white">{distro.name}</span>

                  {/* Custom tooltip */}
                  {distro.tooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 border border-red-500 text-red-300 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 dark:bg-black dark:border-red-400 dark:text-red-400">
                      {distro.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-400"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Skills Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-600 dark:text-red-400 mb-12">
            <Terminal className="inline mr-3" />
            Tools & Techniques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/95 border border-slate-200 rounded-lg p-6 hover:border-red-500 shadow-sm transition-all duration-300 group dark:bg-gray-900 dark:border-gray-700 dark:hover:border-red-400"
              >
                <div className="flex items-center mb-4">
                  <skill.icon className="text-3xl text-red-600 mr-3 group-hover:text-emerald-600 transition-colors dark:text-red-400 dark:group-hover:text-green-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{skill.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                    skill.status === "Expert" ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25" :
                    skill.status === "Advanced" ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25" :
                    skill.status === "Intermediate" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25" :
                    "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  }`}>
                    {skill.status}
                  </span>
                  <span className="text-emerald-700 text-xs font-mono opacity-80 dark:text-green-400 dark:opacity-70">./check.sh</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-600 dark:text-red-400 mb-12">
            <Code className="inline mr-3" />
            Underground Projects
          </h2>

          <div className={`grid gap-8 ${hackingProjects.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
            {hackingProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white/95 border border-slate-200 rounded-lg p-6 hover:border-red-500 shadow-sm transition-all duration-300 group relative overflow-hidden cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:hover:border-red-400"
                onClick={() => handleProjectClick(project)}
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold dark:text-black">
                  {project.status}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-400">
                  {project.title}
                </h3>

                <p className="text-emerald-800 mb-4 leading-relaxed dark:text-green-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-emerald-50 border border-emerald-600 text-emerald-800 px-3 py-1 rounded text-sm hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-black dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Click indicator */}
                <div className="absolute bottom-4 right-4 text-emerald-700 font-mono text-sm opacity-80 group-hover:opacity-100 transition-opacity dark:text-green-500 dark:opacity-70">
                  ./explore.sh →
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Blog Section */}
        <section className=" hidden container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <BookOpen className="inline mr-3" />
            Technical Archives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group cursor-pointer"
                onClick={() => handleBlogClick(blog)}
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
          <h2 className="text-3xl font-bold text-center text-red-600 dark:text-red-400 mb-12">
            <Star className="inline mr-3" />
            Elite Showcase
          </h2>

          <div className={`grid gap-8 ${showcaseProjects.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {showcaseProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white/95 border border-slate-200 rounded-lg p-6 hover:border-red-500 shadow-sm transition-all duration-300 group relative overflow-hidden cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:hover:border-red-400"
                onClick={() => handleShowcaseClick(project)}
              >
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold ${
                  project.danger === "High" ? "bg-red-600 text-black" :
                  project.danger === "Medium" ? "bg-green-600 text-black" :
                  "bg-purple-600 text-black"
                }`}>
                  {project.status}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-400">
                  {project.title}
                </h3>

                <p className="text-emerald-800 mb-4 leading-relaxed dark:text-green-300">
                  {project.description}
                </p>

                {/* Tags Section */}
                {project.tags && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="bg-emerald-50 border border-emerald-600 text-emerald-800 px-3 py-1 rounded text-sm hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-black dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="px-4 py-2">
                    {/* {project.status} */}
                  </span>

                  {/* Click indicator */}
                  <span className="text-emerald-700 font-mono text-sm opacity-80 group-hover:opacity-100 transition-opacity dark:text-green-400 dark:opacity-70">
                    ./explore.sh →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Quote Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center">
            <blockquote className="text-2xl italic text-emerald-800 mb-4 dark:text-green-300">
              "In the world of zeros and ones, I am the exception that proves the rule."
            </blockquote>
            <p className="text-red-600 font-bold dark:text-red-400">- Al Amin</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8 dark:border-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-slate-600 mb-4 dark:text-gray-400">
                root@alamin:~# echo "Contact the shadows..."
              </p>
              <div className="flex justify-center space-x-6">
                <a href="https://github.com/alamin147"
                  target="_blank" className="text-emerald-700 hover:text-red-600 transition-colors dark:text-green-400 dark:hover:text-red-400">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/alamin27"
                  target="_blank" className="text-emerald-700 hover:text-red-600 transition-colors dark:text-green-400 dark:hover:text-red-400">
                  LinkedIn
                </a>
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

      {/* Blog Details Modal */}
      <BlogDetailsModal
        isOpen={isBlogModalOpen}
        onClose={closeBlogModal}
        blog={selectedBlog}
      />

      {/* Project Details Modal */}
      <LinuxProjectModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
        project={selectedProject}
      />

      {/* Showcase Details Modal */}
      <LinuxShowcaseModal
        isOpen={isShowcaseModalOpen}
        onClose={closeShowcaseModal}
        project={selectedShowcase}
      />
    </div>
  );
}
