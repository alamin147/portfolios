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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-sm p-4 dark:bg-black/80">
      <div className="bg-white border border-red-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-gray-900 dark:border-red-400">
        {/* Header */}
        <div className="border-b border-slate-200 p-6 flex items-center justify-between gap-4 flex-wrap dark:border-gray-700">
          <div className="flex items-center flex-wrap gap-2">
            <Terminal className="text-red-600 mr-3 shrink-0 dark:text-red-400" size={24} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
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
            <span className="ml-2 bg-slate-200 text-emerald-800 px-3 py-1 text-xs font-bold rounded dark:bg-gray-700 dark:text-green-400">
              {showcaseDetails.showcaseType}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-transparent"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-3 flex items-center dark:text-red-400">
              <Code className="mr-2" size={18} />
              Elite Overview
            </h3>
            <p className="text-emerald-900 leading-relaxed dark:text-green-300">
              {showcaseDetails.fullDescription}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {showcaseDetails.githubUrl == "#" ? (
              <span
                className="flex items-center bg-slate-100 border border-slate-300 text-slate-600 px-4 py-2 rounded cursor-not-allowed dark:bg-black dark:border-green-400 dark:text-green-500"
              >
                <Github className="mr-2" size={18} />
                Coming Soon
              </span>
            ) : (
              <a
                href={showcaseDetails.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-emerald-50 border border-emerald-600 text-emerald-900 px-4 py-2 rounded hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-black dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black"
              >
                <Github className="mr-2" size={18} />
                View Source Code
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
            <h3 className="text-lg font-bold text-red-600 mb-3 dark:text-red-400">
              ⚡ Elite Features
            </h3>
            <div className="space-y-2">
              {showcaseDetails.features.map(
                (feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1 dark:text-red-400">▸</span>
                    <span className="text-emerald-900 flex-1 dark:text-green-300">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-3 dark:text-red-400">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {showcaseDetails.techStack.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-emerald-50 border border-emerald-600 text-emerald-900 px-3 py-1 rounded text-sm hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-black dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 text-center dark:border-gray-700">
          <p className="text-slate-600 text-sm font-mono dark:text-gray-400">
            ./elite_showcase_explored.sh - Status: '{project.status}'
          </p>
        </div>
      </div>
    </div>
  );
}
