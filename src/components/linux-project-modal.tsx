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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-green-400 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Terminal className="text-red-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <span className="ml-4 bg-red-500 text-black px-3 py-1 text-xs font-bold rounded">
              {project.status}
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
              Project Overview
            </h3>
            <p className="text-green-300 leading-relaxed">
              {projectDetails.fullDescription}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={projectDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-black border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300"
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
              <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center">
                <Database className="mr-2" size={18} />
                Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(projectDetails.architecture).map(([key, value]) => (
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
              Key Features
            </h3>
            <div className="space-y-2">
              {projectDetails.features.map((feature, index) => (
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
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectDetails.techStack.map((tech: string, index: number) => (
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
        <div className="border-t border-gray-700 p-4 text-center">
          <p className="text-gray-400 text-sm font-mono">
            ./project_explored.sh - Status: '{project.status}'
          </p>
        </div>
      </div>
    </div>
  );
}
