import { X, Github, ExternalLink, Code, Database, Terminal } from "lucide-react";

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function LinuxShowcaseModal({ isOpen, onClose, project }: ShowcaseModalProps) {
  if (!isOpen || !project) return null;

  const getShowcaseDetails = (title: string) => {
    switch (title) {
      case "My custom Dotfiles":
        return {
          githubUrl: "https://github.com/alamin147/dotfiles",
          liveUrl: "#",
          fullDescription: `A comprehensive collection of my personal dotfiles and system configurations for Linux environments. This repository contains meticulously crafted configurations for Hyprland window manager, Neovim editor, Zsh shell, and various productivity scripts that enhance the Linux workflow experience.`,
          features: [
            "Hyprland Window Manager: Modern tiling window manager configuration with custom keybindings and animations",
            "Neovim Setup: Fully configured Neovim with LSP support, plugins, and custom themes",
            "Zsh Configuration: Enhanced shell experience with Oh My Zsh, custom aliases, and productivity functions",
            "Productivity Scripts: Collection of automation scripts for common development tasks",
            "Automated Installation: One-command setup script for easy deployment across systems",
            "Cross-distro Compatibility: Works seamlessly across different Linux distributions",
            "Modular Design: Organized configuration files for easy customization and maintenance",
            "Documentation: Comprehensive setup guides and usage instructions"
          ],
          techStack: (project as any).tags || ["Hyprland", "Neovim", "Zsh", "Dotfiles", "Scripts", "Linux Customization"],
          architecture: {
            "Window Manager": "Hyprland (Wayland compositor)",
            "Editor": "Neovim with LSP and Treesitter",
            "Shell": "Zsh with Oh My Zsh framework",
            "Automation": "Bash/Shell scripting"
          },
          dangerLevel: project.danger || "Low",
          showcaseType: "Configuration Repository"
        };
      default:
        return {
          githubUrl: "#",
          liveUrl: "#",
          fullDescription: project.description,
          features: (project as any).features || ["Feature details coming soon..."],
          techStack: (project as any).tags || [],
          architecture: {},
          dangerLevel: project.danger || "Unknown",
          showcaseType: "Elite Project"
        };
    }
  };

  const showcaseDetails = getShowcaseDetails(project.title);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-red-400 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Terminal className="text-red-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <span className={`ml-4 px-3 py-1 text-xs font-bold rounded ${
              showcaseDetails.dangerLevel === "High" ? "bg-red-600 text-white" :
              showcaseDetails.dangerLevel === "Medium" ? "bg-yellow-600 text-black" :
              "bg-purple-600 text-white"
            }`}>
              {showcaseDetails.dangerLevel}
            </span>
            <span className="ml-2 bg-gray-700 text-green-400 px-3 py-1 text-xs font-bold rounded">
              {showcaseDetails.showcaseType}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center">
              <Code className="mr-2" size={18} />
              Elite Overview
            </h3>
            <p className="text-green-300 leading-relaxed">
              {showcaseDetails.fullDescription}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={showcaseDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-black border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300"
            >
              <Github className="mr-2" size={18} />
              Access Repository
            </a>
            {showcaseDetails.liveUrl !== "#" && (
              <a
                href={showcaseDetails.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
              >
                <ExternalLink className="mr-2" size={18} />
                Live Demo
              </a>
            )}
          </div>

          {/* Architecture */}
          {Object.keys(showcaseDetails.architecture).length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center">
                <Database className="mr-2" size={18} />
                System Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(showcaseDetails.architecture).map(([key, value]) => (
                  <div key={key} className="bg-black border border-gray-700 rounded p-3">
                    <span className="text-red-400 font-semibold capitalize">{key}:</span>
                    <span className="text-green-300 ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3">
              ⚡ Elite Features
            </h3>
            <div className="space-y-2">
              {showcaseDetails.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">▸</span>
                  <span className="text-green-300 flex-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3">
              🛠️ Technology Arsenal
            </h3>
            <div className="flex flex-wrap gap-2">
              {showcaseDetails.techStack.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded text-sm hover:bg-green-400 hover:text-black transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal-style command */}
          <div className="bg-black border border-green-400 rounded p-4 font-mono">
            <div className="text-green-400 text-sm">
              <span className="text-red-400">root@elite:~#</span> git clone {showcaseDetails.githubUrl}
              <br />
              <span className="text-gray-400"># Access the elite configurations</span>
              <br />
              <span className="text-red-400">root@elite:~#</span> cd {project.title.toLowerCase().replace(/\s+/g, '-')}
              <br />
              <span className="text-red-400">root@elite:~#</span> ./install.sh
              <br />
              <span className="text-gray-400"># Elite setup complete! 🚀</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="text-center">
            <span className="bg-black border border-green-400 text-green-400 px-6 py-3 rounded font-mono text-sm">
              Status: {project.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 text-center">
          <p className="text-gray-400 text-sm font-mono">
            ./elite_showcase_accessed.sh - Classification: {showcaseDetails.dangerLevel}
          </p>
        </div>
      </div>
    </div>
  );
}
