import { useState, useEffect, useRef } from "react";
import { Terminal, Code, BookOpen, Star } from "lucide-react";
import { DiLinux } from "react-icons/di";
import LinuxNavbar from "./linux-navbar";
import LinuxContactModal from "./linux-contact-modal";
import BlogDetailsModal from "./blog-details-modal";
import LinuxProjectModal from "./linux-project-modal";
import { hackingProjects, linuxDistros, showcaseProjects, techBlogs, techSkills } from "./linux-data";

export default function LinuxPortfolio() {
  const [terminalText, setTerminalText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
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
      }
    }, 500);

    return () => clearInterval(timer);
  }, [currentIndex, isIntroComplete]);

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
              <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400">Terminal - alamin</span>
                </div>
              </div>
              <div ref={terminalRef} className="p-4 h-80 overflow-y-auto cursor-text" onClick={() => inputRef.current?.focus()}>
                <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {terminalText}
                  {isIntroComplete && (
                    <span className="inline-flex items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="bg-transparent border-none outline-none text-green-400 font-mono text-sm caret-transparent p-0 m-0"
                        style={{ width: `${Math.max(currentCommand.length, 0)}ch` }}
                        autoFocus
                        spellCheck={false}
                      />
                      <span className="animate-pulse text-green-400">█</span>
                    </span>
                  )}
                  {!isIntroComplete && <span className="animate-pulse">█</span>}
                </pre>
              </div>
              {isIntroComplete && (
                <div className="px-4 py-2 bg-gray-900 border-t border-gray-700 text-xs text-gray-400 font-mono">
                  💡 Tip: Type 'ls' or 'help' to explore the terminal
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Terminal className="inline mr-3" />
            Tools & Techniques
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
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                    skill.status === "Expert" ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25" :
                    skill.status === "Advanced" ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25" :
                    skill.status === "Intermediate" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25" :
                    "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  }`}>
                    {skill.status}
                  </span>
                  <span className="text-green-400 text-xs font-mono opacity-70">./check.sh</span>
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

          <div className={`grid gap-8 ${hackingProjects.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
            {hackingProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                onClick={() => handleProjectClick(project)}
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

                {/* Click indicator */}
                <div className="absolute bottom-4 right-4 text-green-500 font-mono text-sm opacity-70 group-hover:opacity-100 transition-opacity">
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


        {/* Quote Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center">
            <blockquote className="text-2xl italic text-green-300 mb-4">
              "In the world of zeros and ones, I am the exception that proves the rule."
            </blockquote>
            <p className="text-red-400 font-bold">- Al Amin</p>
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
                <a href="https://github.com/alamin147"
                  target="_blank" className="text-green-400 hover:text-red-400 transition-colors">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/alamin27"
                  target="_blank" className="text-green-400 hover:text-red-400 transition-colors">
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
    </div>
  );
}
