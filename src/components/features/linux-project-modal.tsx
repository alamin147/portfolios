import { X, Github, ExternalLink, Code, Database, Terminal } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function LinuxProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  const getProjectDetails = (title: string) => {
    switch (title) {
      case "Visual File System Explorer":
        return {
          githubUrl: "https://github.com/alamin147/visual-file-system-explorer",
          liveUrl: "https://visual-file-explorer.vercel.app",
          fullDescription: `A modern, interactive project management and file system visualization tool built with React, Node.js, and MongoDB. This application allows you to create multiple projects, each with its own visual canvas where you can organize files and folders in an intuitive drag-and-drop interface.`,
          features: [
            "Multi-Project Support: Create, edit, and manage multiple isolated projects",
            "Interactive Canvas: Drag-and-drop file and folder nodes on a visual canvas",
            "In-line Editing: Built-in Monaco code editor with syntax highlighting",
            "MongoDB Integration: Full database persistence with transaction support",
            "RESTful API: Comprehensive REST API for all operations",
            "TypeScript: Full type safety throughout the application",
            "Responsive Design: Works on desktop and mobile devices"
          ],
          techStack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "React Flow", "Monaco Editor", "Tailwind CSS"],
          architecture: {
            frontend: "React + TypeScript",
            backend: "Node.js + Express + MongoDB",
            editor: "Monaco Code Editor"
          }
        };
      default:
        return {
          githubUrl: "#",
          liveUrl: "#",
          fullDescription: project.description,
          features: ["Feature details coming soon..."],
          techStack: project.tech || [],
          architecture: {}
        };
    }
  };

  const projectDetails = getProjectDetails(project.title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-sm p-4 dark:bg-black/80">
      <div className="bg-white border border-emerald-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-gray-900 dark:border-green-400">
        {/* Header */}
        <div className="border-b border-slate-200 p-6 flex items-center justify-between gap-4 flex-wrap dark:border-gray-700">
          <div className="flex items-center flex-wrap gap-2">
            <Terminal className="text-red-600 mr-3 shrink-0 dark:text-red-400" size={24} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
            <span className="ml-0 sm:ml-2 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded dark:text-black">
              {project.status}
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
              Project Overview
            </h3>
            <p className="text-emerald-900 leading-relaxed dark:text-green-300">
              {projectDetails.fullDescription}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={projectDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-emerald-50 border border-emerald-600 text-emerald-900 px-4 py-2 rounded hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-black dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black"
            >
              <Github className="mr-2" size={18} />
              View Source Code
            </a>
            {projectDetails.liveUrl == "*" && (
              <a
                href={projectDetails.liveUrl}
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
          {Object.keys(projectDetails.architecture).length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-3 flex items-center dark:text-red-400">
                <Database className="mr-2" size={18} />
                Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(projectDetails.architecture).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 border border-slate-200 rounded p-3 dark:bg-black dark:border-gray-700">
                    <span className="text-red-600 font-semibold capitalize dark:text-red-400">{key}:</span>
                    <span className="text-emerald-800 ml-2 dark:text-green-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-3 dark:text-red-400">
              Key Features
            </h3>
            <div className="space-y-2">
              {projectDetails.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1 dark:text-red-400">▸</span>
                  <span className="text-emerald-900 flex-1 dark:text-green-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-3 dark:text-red-400">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectDetails.techStack.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-emerald-50 border border-emerald-600 text-emerald-900 px-3 py-1 rounded text-sm hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-black dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal-style command */}
          {/* <div className="bg-black border border-green-400 rounded p-4 font-mono">
            <div className="text-green-400 text-sm">
              <span className="text-red-400">root@alamin:~#</span> git clone {projectDetails.githubUrl}
              <br />
              <span className="text-gray-400"># Clone and explore the project</span>
              <br />
              <span className="text-red-400">root@alamin:~#</span> cd {project.title.toLowerCase().replace(/\s+/g, '-')}
              <br />
              <span className="text-red-400">root@alamin:~#</span> npm install && npm start
              <br />
              <span className="text-gray-400"># Ready to hack! 🚀</span>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 text-center dark:border-gray-700">
          <p className="text-slate-600 text-sm font-mono dark:text-gray-400">
            ./project_explored.sh - Status: '{project.status}'
          </p>
        </div>
      </div>
    </div>
  );
}
