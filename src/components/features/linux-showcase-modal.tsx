import { X, Github, ExternalLink, Code, Terminal } from "lucide-react";

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function LinuxShowcaseModal({
  isOpen,
  onClose,
  project,
}: ShowcaseModalProps) {
  if (!isOpen || !project) return null;

  // Use the actual project data instead of hardcoding
  const showcaseDetails = {
    githubUrl: project.githubUrl || "#",
    liveUrl: project.liveUrl || "#",
    fullDescription: project.description,
    features: project.features || ["Feature details coming soon..."],
    techStack: project.tags || [],
    dangerLevel: project.danger || "Unknown",
    showcaseType: "Elite Project",
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-red-400 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Terminal className="text-red-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            {/* <span
              className={`ml-4 px-3 py-1 text-xs font-bold rounded ${
                showcaseDetails.dangerLevel === "High"
                  ? "bg-red-600 text-white"
                  : showcaseDetails.dangerLevel === "Medium"
                  ? "bg-yellow-600 text-black"
                  : "bg-purple-600 text-white"
              }`}
            >
              {showcaseDetails.dangerLevel}
            </span> */}
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
            {showcaseDetails.githubUrl == "#" ? (
              <a
                href={"#"}
                rel="noopener noreferrer"
                className="flex items-center bg-black border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300"
              >
                <Github className="mr-2" size={18} />
                {showcaseDetails.githubUrl === "#"
                  ? "Coming Soon"
                  : "View Source Code"}
              </a>
            ) : (
              <a
                href={showcaseDetails.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-black border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300"
              >
                <Github className="mr-2" size={18} />
                   "View Source Code"
              </a>
            )}
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

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3">
              ⚡ Elite Features
            </h3>
            <div className="space-y-2">
              {showcaseDetails.features.map(
                (feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">▸</span>
                    <span className="text-green-300 flex-1">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3">
              Tags
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
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 text-center">
          <p className="text-gray-400 text-sm font-mono">
            ./elite_showcase_explored.sh - Status: '{project.status}'
          </p>
        </div>
      </div>
    </div>
  );
}
