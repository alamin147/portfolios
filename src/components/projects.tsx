
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import SectionTitle from "./section-title"
import { useEffect, useState } from "react"

export default function Projects() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation()
//   const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation()
  const [allProject, setAllProject] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/project`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setAllProject(result);
      });
  }, []);
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "API Integration", "Chart.js", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Social Media App",
      description: "Full-featured social platform with real-time messaging",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["MERN Stack", "Socket.io", "Cloudinary", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Responsive portfolio with modern design and animations",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "Learning Platform",
      description: "Online learning platform with video streaming and quizzes",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Express", "MongoDB", "Video.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-4/5">

         <div
          ref={headerRef as any}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
         <SectionTitle  title="Projects" desc="Explore projects that highlight my skills, passion, and dedication to delivering innovative solutions." />
        </div>
        <div
          ref={projectsRef as any}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass-card hover:glass-card-hover rounded-2xl overflow-hidden transition-all 0 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 relative"
              style={{
                transitionDelay: projectsVisible ? `${100}ms` : "0ms",
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Enhanced Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="sm"
                    className="glass-button text-white hover:scale-105 rounded-full transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-card text-white hover:glass-card-hover rounded-full transition-all duration-300"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Enhanced Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs glass-button text-sky-300 rounded-full hover:scale-105 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div
          ref={buttonRef as any}
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button className="bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white border-0 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-sky-500/25 hover:scale-105 transition-all duration-300 glass-button">
            View All Projects
          </Button>
        </div> */}
      </div>
    </section>
  )
}
